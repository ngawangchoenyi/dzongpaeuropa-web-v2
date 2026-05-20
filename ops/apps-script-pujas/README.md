# Apps Script de pujas - Dzongpa Europa

Esta carpeta guarda una copia versionada del Apps Script usado para automatizar las pujas semanales.

## Qué contiene

- `Codigo.gs`: código principal saneado para GitHub.
- `appsscript.json`: manifest del proyecto Apps Script.
- `.clasp.json.example`: plantilla local para conectar esta carpeta con el proyecto real.

## Qué NO debe subirse a GitHub

- `.clasp.json` real.
- Tokens de GitHub.
- Contraseñas de Zoom.
- Datos privados temporales.

Los valores sensibles se gestionan en Apps Script mediante Propiedades de script o en las hojas privadas de Google Sheets.

## Flujo recomendado

1. Editar el código en `apps-script-pujas` local o en esta carpeta versionada.
2. Validar que no hay caracteres corruptos de codificación en textos operativos.
3. Ejecutar `clasp push` para subir a Apps Script.
4. Probar desde Google Sheets.
5. Guardar commit en GitHub.

## Comprobaciones rápidas

```powershell
rg -n "caracter_raro_a_buscar" ops/apps-script-pujas
git status --short
```

## Restauración

Si algo falla:

1. Abrir GitHub Desktop.
2. Revisar el último commit funcional.
3. Restaurar `ops/apps-script-pujas/Codigo.gs`.
4. Copiar el contenido corregido a la carpeta local de clasp.
5. Ejecutar `clasp push`.
