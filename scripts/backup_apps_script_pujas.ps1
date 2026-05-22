param(
  [switch]$Commit,
  [switch]$Push,
  [string]$CommitMessage = "Backup Apps Script pujas"
)

$ErrorActionPreference = "Stop"

function Write-Step($Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Fail($Message) {
  throw "[backup_apps_script_pujas] $Message"
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

function Read-Utf8($Path) {
  return [IO.File]::ReadAllText($Path, [Text.UTF8Encoding]::new($false))
}

function Write-Utf8($Path, $Text) {
  [IO.File]::WriteAllText($Path, $Text, [Text.UTF8Encoding]::new($false))
}

function Sanitize-AppsScriptCode($Text) {
  $replacements = @{
    "SHEET_ID" = "PEGA_AQUI_SHEET_ID"
    "ZOOM_URL" = "PEGA_AQUI_ZOOM_URL"
    "ZOOM_ID" = "PEGA_AQUI_ZOOM_ID"
    "ZOOM_PASSCODE" = "PEGA_AQUI_ZOOM_PASSCODE"
  }

  foreach ($key in $replacements.Keys) {
    $pattern = "$key\s*:\s*'[^']*'"
    $replacement = "$key`: '$($replacements[$key])'"
    $Text = [regex]::Replace($Text, $pattern, $replacement, 1)
  }

  return $Text
}

function Assert-Sanitized($Text) {
  $blockedPatterns = @(
    "github_pat_",
    "ghp_",
    "ZOOM_PASSCODE_REAL",
    "https://zoom\.us/j/",
    "autorizarGmailPujas",
    "SHEET_ID\s*:\s*'(?!PEGA_AQUI_SHEET_ID')[^']+'",
    "ZOOM_URL\s*:\s*'(?!PEGA_AQUI_ZOOM_URL')[^']+'",
    "ZOOM_ID\s*:\s*'(?!PEGA_AQUI_ZOOM_ID')[^']+'",
    "ZOOM_PASSCODE\s*:\s*'(?!PEGA_AQUI_ZOOM_PASSCODE')[^']+'"
  )

  foreach ($pattern in $blockedPatterns) {
    if ($Text -match $pattern) {
      Fail "Sensitive or temporary value detected by pattern: $pattern"
    }
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

$repoRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
$appsScriptDir = Join-Path $repoRoot "ops\apps-script-pujas"
$claspJsonPath = Join-Path $appsScriptDir ".clasp.json"
$safeCodePath = Join-Path $appsScriptDir "Codigo.gs"
$safeManifestPath = Join-Path $appsScriptDir "appsscript.json"

if (-not (Test-Path -LiteralPath $appsScriptDir)) {
  Fail "Missing folder: $appsScriptDir"
}

if (-not (Test-Path -LiteralPath $claspJsonPath)) {
  Fail "Missing ignored local file: $claspJsonPath"
}

$claspConfig = Get-Content -LiteralPath $claspJsonPath -Raw | ConvertFrom-Json
if (-not $claspConfig.scriptId) {
  Fail ".clasp.json does not contain scriptId"
}

$tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("dzongpa-pujas-backup-" + [guid]::NewGuid().ToString("N"))
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

  Write-Step "Pulling current Apps Script from Google"
  $clasp = Find-ClaspCommand
  Run-Clasp $clasp @("pull") $tempRoot

  $pulledCode = Get-ChildItem -LiteralPath $tempRoot -File |
    Where-Object { $_.Extension -in @(".js", ".gs") } |
    Select-Object -First 1

  if (-not $pulledCode) {
    Fail "No Apps Script code file found after clasp pull"
  }

  $pulledManifest = Join-Path $tempRoot "appsscript.json"
  if (-not (Test-Path -LiteralPath $pulledManifest)) {
    Fail "No appsscript.json found after clasp pull"
  }

  Write-Step "Sanitizing pulled code"
  $safeCode = Sanitize-AppsScriptCode (Read-Utf8 $pulledCode.FullName)
  Assert-Sanitized $safeCode
  Write-Utf8 $safeCodePath $safeCode

  Write-Step "Updating manifest"
  Copy-Item -LiteralPath $pulledManifest -Destination $safeManifestPath -Force

  Write-Step "Running syntax and safety checks"
  $syntaxFile = Join-Path $tempRoot "syntax-check.js"
  Write-Utf8 $syntaxFile $safeCode
  $node = Get-Command "node.exe" -ErrorAction SilentlyContinue
  if ($node) {
    Run $node.Source @("--check", $syntaxFile) $repoRoot
  } else {
    Write-Warning "node.exe not found; syntax check skipped"
  }

  if (Get-Command "rg" -ErrorAction SilentlyContinue) {
    & rg -n "github_pat_|ghp_|ZOOM_PASSCODE_REAL|https://zoom\.us/j/|autorizarGmailPujas" "$safeCodePath" "$safeManifestPath"
    if ($LASTEXITCODE -eq 0) {
      Fail "Safety scan found blocked content"
    }
  } else {
    Write-Warning "rg not found; safety scan skipped"
  }

  Write-Step "Git status"
  Run "git" @("diff", "--stat", "--", "ops/apps-script-pujas") $repoRoot
  Run "git" @("status", "--short") $repoRoot

  if ($Commit) {
    Write-Step "Creating git commit"
    Run "git" @("add", "ops/apps-script-pujas/Codigo.gs", "ops/apps-script-pujas/appsscript.json", "ops/apps-script-pujas/README.md", "scripts/backup_apps_script_pujas.ps1") $repoRoot
    & git -C $repoRoot diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
      Write-Host "No staged changes. Commit skipped."
    } else {
      Run "git" @("commit", "-m", $CommitMessage) $repoRoot
    }
  }

  if ($Push) {
    Write-Step "Pushing to GitHub"
    Run "git" @("push", "origin", "main") $repoRoot
  }

  Write-Step "Backup completed"
  Write-Host "Review with:"
  Write-Host "  git diff -- ops/apps-script-pujas scripts/backup_apps_script_pujas.ps1"
  Write-Host "Then commit/push manually, or run again with -Commit -Push."
} finally {
  if ($tempCreated -and (Test-Path -LiteralPath $tempRoot)) {
    $resolvedTemp = (Resolve-Path -LiteralPath $tempRoot).Path
    if ((Split-Path -Leaf $resolvedTemp).StartsWith("dzongpa-pujas-backup-")) {
      Remove-Item -LiteralPath $resolvedTemp -Recurse -Force
    }
  }
}
