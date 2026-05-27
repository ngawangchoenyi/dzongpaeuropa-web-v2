param(
  [switch]$NoPush,
  [switch]$BackupAfter,
  [switch]$Commit,
  [switch]$Push,
  [string]$CommitMessage = "Deploy Apps Script pujas"
)

$ErrorActionPreference = "Stop"

function Write-Step($Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Fail($Message) {
  throw "[deploy_apps_script_pujas] $Message"
}

function Read-Utf8($Path) {
  return [IO.File]::ReadAllText($Path, [Text.UTF8Encoding]::new($false))
}

function Write-Utf8($Path, $Text) {
  [IO.File]::WriteAllText($Path, $Text, [Text.UTF8Encoding]::new($false))
}

function Run($FilePath, $Arguments, $WorkingDirectory) {
  $previous = Get-Location
  try {
    Set-Location -LiteralPath $WorkingDirectory
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
      Fail "Command failed: $FilePath $($Arguments -join ' ')"
    }
  } finally {
    Set-Location $previous
  }
}

function Find-ClaspCommand() {
  $cmd = Get-Command "clasp.cmd" -ErrorAction SilentlyContinue
  if ($cmd) {
    return $cmd.Source
  }

  $node = "C:\Program Files\nodejs\node.exe"
  $clasp = "$env:APPDATA\npm\node_modules\@google\clasp\build\src\index.js"
  if ((Test-Path -LiteralPath $node) -and (Test-Path -LiteralPath $clasp)) {
    return @($node, $clasp)
  }

  Fail "clasp.cmd not found. Install it with: npm.cmd install -g @google/clasp"
}

function Run-Clasp($ClaspCommand, $Arguments, $WorkingDirectory) {
  $previous = Get-Location
  try {
    Set-Location -LiteralPath $WorkingDirectory
    if ($ClaspCommand -is [array]) {
      & $ClaspCommand[0] $ClaspCommand[1] @Arguments
    } else {
      & $ClaspCommand @Arguments
    }

    if ($LASTEXITCODE -ne 0) {
      Fail "clasp failed. If the error is invalid_grant/invalid_rapt, run: clasp.cmd login --no-localhost"
    }
  } finally {
    Set-Location $previous
  }
}

function Extract-ConfigBlock($Text) {
  $match = [regex]::Match($Text, '(?s)^const CONFIG = \{.*?\n\};')
  if (-not $match.Success) {
    Fail "Could not find CONFIG block"
  }
  return $match.Value
}

function Assert-DeployConfigLooksReal($ConfigBlock) {
  $blocked = @(
    "SHEET_ID\s*:\s*'PEGA_AQUI",
    "ZOOM_URL\s*:\s*'PEGA_AQUI",
    "ZOOM_ID\s*:\s*'PEGA_AQUI",
    "ZOOM_PASSCODE\s*:\s*'PEGA_AQUI"
  )

  foreach ($pattern in $blocked) {
    if ($ConfigBlock -match $pattern) {
      Fail "Deployment CONFIG still contains a placeholder: $pattern"
    }
  }
}

function Assert-NoTokenLeak($Text) {
  $blocked = @("github_pat_", "ghp_", "ZOOM_PASSCODE_REAL")
  foreach ($pattern in $blocked) {
    if ($Text -match $pattern) {
      Fail "Sensitive pattern detected before deploy: $pattern"
    }
  }
}

function Run-Git($Arguments, $WorkingDirectory) {
  Run "git" $Arguments $WorkingDirectory
}

$repoRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
$appsScriptDir = Join-Path $repoRoot "ops\apps-script-pujas"
$claspJsonPath = Join-Path $appsScriptDir ".clasp.json"
$safeCodePath = Join-Path $appsScriptDir "Codigo.gs"
$safeManifestPath = Join-Path $appsScriptDir "appsscript.json"

if (-not (Test-Path -LiteralPath $claspJsonPath)) {
  Fail "Missing ignored local file: $claspJsonPath"
}
if (-not (Test-Path -LiteralPath $safeCodePath)) {
  Fail "Missing safe Apps Script backup: $safeCodePath"
}
if (-not (Test-Path -LiteralPath $safeManifestPath)) {
  Fail "Missing manifest: $safeManifestPath"
}

$claspConfig = Get-Content -LiteralPath $claspJsonPath -Raw | ConvertFrom-Json
if (-not $claspConfig.scriptId) {
  Fail ".clasp.json does not contain scriptId"
}

$tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("dzongpa-pujas-deploy-" + [guid]::NewGuid().ToString("N"))
$tempCreated = $false

try {
  Write-Step "Preparing temporary clasp workspace"
  New-Item -ItemType Directory -Path $tempRoot | Out-Null
  $tempCreated = $true

  $tempClasp = @{
    scriptId = $claspConfig.scriptId
    rootDir = "."
  } | ConvertTo-Json
  Write-Utf8 (Join-Path $tempRoot ".clasp.json") $tempClasp

  Write-Step "Pulling current Apps Script to preserve real CONFIG"
  $clasp = Find-ClaspCommand
  Run-Clasp $clasp @("pull") $tempRoot

  $pulledCode = Get-ChildItem -LiteralPath $tempRoot -File |
    Where-Object { $_.Extension -in @(".js", ".gs") } |
    Select-Object -First 1

  if (-not $pulledCode) {
    Fail "No Apps Script code file found after clasp pull"
  }

  Write-Step "Merging local code with production CONFIG"
  $safeCode = Read-Utf8 $safeCodePath
  $realCode = Read-Utf8 $pulledCode.FullName
  $realConfig = Extract-ConfigBlock $realCode
  Assert-DeployConfigLooksReal $realConfig

  $merged = [regex]::Replace(
    $safeCode,
    '(?s)^const CONFIG = \{.*?\n\};',
    [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $realConfig },
    1
  )
  Assert-NoTokenLeak $merged
  Write-Utf8 $pulledCode.FullName $merged
  Copy-Item -LiteralPath $safeManifestPath -Destination (Join-Path $tempRoot "appsscript.json") -Force

  Write-Step "Running syntax check"
  $node = Get-Command "node.exe" -ErrorAction SilentlyContinue
  if ($node) {
    Run $node.Source @("--check", $pulledCode.FullName) $repoRoot
  } else {
    Write-Warning "node.exe not found; syntax check skipped"
  }

  if ($NoPush) {
    Write-Step "Deploy skipped because -NoPush was used"
    return
  }

  Write-Step "Pushing Apps Script"
  Run-Clasp $clasp @("push", "--force") $tempRoot

  if ($BackupAfter) {
    Write-Step "Running sanitized backup after deploy"
    Run "powershell" @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "scripts\backup_apps_script_pujas.ps1") $repoRoot
  }

  if ($Commit) {
    Write-Step "Creating git commit"
    Run-Git @("add", "ops/apps-script-pujas/Codigo.gs", "ops/apps-script-pujas/appsscript.json", "ops/apps-script-pujas/README.md", "ops/apps-script-pujas/CHECKLIST_OPERATIVA.md", "scripts/backup_apps_script_pujas.ps1", "scripts/deploy_apps_script_pujas.ps1") $repoRoot
    & git -C $repoRoot diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
      Write-Host "No staged changes. Commit skipped."
    } else {
      Run-Git @("commit", "-m", $CommitMessage) $repoRoot
    }
  }

  if ($Push) {
    Write-Step "Pushing git branch"
    Run-Git @("push", "origin", "main") $repoRoot
  }

  Write-Step "Deploy completed"
  Write-Host "Next: reload Google Sheets and run: Dzongpa Pujas > Verificar activadores"
} finally {
  if ($tempCreated -and (Test-Path -LiteralPath $tempRoot)) {
    $resolvedTemp = (Resolve-Path -LiteralPath $tempRoot).Path
    if ((Split-Path -Leaf $resolvedTemp).StartsWith("dzongpa-pujas-deploy-")) {
      Remove-Item -LiteralPath $resolvedTemp -Recurse -Force
    }
  }
}
