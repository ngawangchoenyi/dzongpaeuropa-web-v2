# Apps Script de pujas - Dzongpa Europa

Esta carpeta guarda una copia versionada y saneada del Apps Script usado para automatizar las pujas semanales.

## Que contiene

- `Codigo.gs`: codigo principal preparado para GitHub, sin valores privados reales.
- `appsscript.json`: manifest del proyecto Apps Script.
- `.clasp.json.example`: plantilla local para conectar esta carpeta con el proyecto real.

## Que NO debe subirse a GitHub

- `.clasp.json` real.
- Tokens de GitHub.
- Contrasenas de Zoom.
- Enlaces privados de Zoom.
- IDs privados de hojas de calculo si no son necesarios para restauracion.
- Archivos descargados directamente por `clasp pull` que contengan configuracion real.

Los valores sensibles deben vivir en Apps Script como Propiedades de script o en hojas privadas de Google Sheets.

## Flujo de backup recomendado

1. Conectar la carpeta local con `.clasp.json` usando el `scriptId` real. Ese archivo esta ignorado por Git.
2. Ejecutar `clasp pull` para traer la version actual desde Google.
3. Si `clasp pull` crea un archivo como `Codigo.js` o `Codigo.gs` con valores reales, no subirlo directamente.
4. Copiar solo los cambios de logica a `Codigo.gs` y mantener placeholders para datos sensibles.
5. Eliminar el archivo descargado con datos reales.
6. Ejecutar las comprobaciones rapidas.
7. Guardar el backup con `git add`, `git commit` y `git push`.

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
