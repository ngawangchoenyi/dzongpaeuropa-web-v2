# Apps Script de pujas - Dzongpa Europa

Esta carpeta guarda una copia versionada y saneada del Apps Script usado para automatizar las pujas semanales.

## Que contiene

- `Codigo.gs`: codigo principal preparado para GitHub, sin valores privados reales.
- `appsscript.json`: manifest del proyecto Apps Script.
- `.clasp.json.example`: plantilla local para conectar esta carpeta con el proyecto real.
- `CHECKLIST_OPERATIVA.md`: procedimiento semanal para publicar, probar y supervisar pujas.

## Que NO debe subirse a GitHub

- `.clasp.json` real.
- Tokens de GitHub.
- Contrasenas de Zoom.
- Enlaces privados de Zoom.
- IDs privados de hojas de calculo si no son necesarios para restauracion.
- Archivos descargados directamente por `clasp pull` que contengan configuracion real.

Los valores sensibles deben vivir en Apps Script como Propiedades de script o en hojas privadas de Google Sheets.

## Flujo de backup recomendado

Ejecutar desde la raiz del repo:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\backup_apps_script_pujas.ps1
```

El script:

1. Usa `.clasp.json` local para conectar con el Apps Script real.
2. Hace `clasp pull` en una carpeta temporal fuera del repo.
3. Sanea automaticamente `SHEET_ID`, `ZOOM_URL`, `ZOOM_ID` y `ZOOM_PASSCODE`.
4. Actualiza `Codigo.gs` y `appsscript.json`.
5. Ejecuta comprobaciones de seguridad y sintaxis.
6. Elimina la carpeta temporal con valores reales.

## Despliegue operativo recomendado

Tras modificar codigo:

1. Probar sintaxis localmente.
2. Subir con `clasp push` conservando la configuracion real del Apps Script.
3. En Google Sheets, recargar la hoja.
4. Ejecutar `Dzongpa Pujas > Verificar activadores`.
5. Ejecutar `Dzongpa Pujas > Actualizar panel operativo`.

El recordatorio de Zoom 2h se gestiona con un activador puntual exacto. El activador cada 30 minutos queda como rescate para 24h, post-puja y posibles pendientes.

Despues revisar y guardar:

```powershell
git diff -- ops/apps-script-pujas scripts/backup_apps_script_pujas.ps1
git add ops/apps-script-pujas scripts/backup_apps_script_pujas.ps1
git commit -m "Backup Apps Script pujas"
git push origin main
```

Modo automatico opcional:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\backup_apps_script_pujas.ps1 -Commit -Push
```

## Reautorizar Gmail

Si Google envia errores de permisos en `onFormSubmit` o tras cambiar `appsscript.json`:

1. Abrir el editor de Apps Script.
2. Seleccionar la funcion `autorizarPermisosPujas`.
3. Pulsar `Ejecutar`.
4. Aceptar los permisos solicitados con la cuenta `secretaria@dzongpaeuropa.org`.
5. Confirmar que llega el email `Autorizacion permisos Dzongpa Pujas`.

## Comprobaciones rapidas

```powershell
rg -n "github_pat_|ghp_|ZOOM_PASSCODE_REAL|https://zoom\.us/j/|autorizarGmailPujas" ops/apps-script-pujas/Codigo.gs ops/apps-script-pujas/appsscript.json
git status --short
```

El primer comando no debe devolver resultados. Si devuelve algo, revisar antes de hacer commit.

## Restauracion

Si el Apps Script falla:

1. Abrir GitHub Desktop.
2. Buscar el ultimo commit funcional.
3. Restaurar `ops/apps-script-pujas/Codigo.gs`.
4. Revisar manualmente que los placeholders se sustituyen por valores reales solo dentro de Apps Script o Propiedades de script.
5. Ejecutar `clasp push` desde la carpeta local conectada.
6. Probar desde Google Sheets antes de usarlo en produccion.
