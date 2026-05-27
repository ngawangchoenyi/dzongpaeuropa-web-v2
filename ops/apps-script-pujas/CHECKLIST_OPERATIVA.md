# Checklist operativa semanal - Pujas Dzongpa Europa

Objetivo: publicar, verificar y operar la puja semanal con el minimo trabajo manual y sin exponer datos privados.

## Regla principal

- La web solo publica informacion publica: nombre, fecha, horario, formulario y enlaces de donativo.
- Zoom no se publica en la web.
- Tokens, enlaces privados, contrasenas y datos sensibles no se suben a GitHub.
- Los cambios de codigo se guardan con backup antes o despues de tocar Apps Script.

## 1. Preparar la puja activa

En Google Sheets:

1. Abrir la hoja de respuestas de pujas.
2. Si la nueva puja ya esta en `Catalogo_Pujas`, ejecutar `Dzongpa Pujas > Crear proxima puja desde catalogo`.
3. Escribir el `puja_key` o parte del nombre, la fecha `YYYY-MM-DD` y la hora de Espana.
4. Revisar la fila borrador creada en `Pujas_Eventos`.
5. Completar Zoom y cualquier campo especifico que falte.
6. Cambiar `estado` a `activa` solo cuando este confirmada.
7. Confirmar que solo hay una fila con estado `activa`.
8. Revisar estos campos de la fila activa:
   - `puja_id`
   - `puja_key`
   - `fecha`
   - `hora_es`
   - `hora_tw`
   - `start_iso`
   - `formulario_url`
   - `zoom_url`
   - `zoom_id`
   - `zoom_passcode`
   - `stripe_individual_url`
   - `stripe_familia_url`
   - `stripe_libre_url`
9. Revisar `Catalogo_Pujas` si cambia el nombre, descripcion o textos base.
10. Revisar o completar en `Catalogo_Pujas` los campos `practicas_whatsapp_es`, `descripcion_whatsapp_es` y `donativo_whatsapp_es` si se quiere controlar el mensaje de WhatsApp con texto propio.
11. Revisar `Plantillas_Mensajes` si cambia algun texto de email. La plantilla publica de WhatsApp se actualiza automaticamente desde Apps Script al publicar la semana.

Criterio de OK:

- La puja activa corresponde a la semana correcta.
- La fecha no esta en el pasado.
- Los tres enlaces Stripe son distintos.
- El enlace del formulario abre el formulario correcto.
- Zoom existe en Sheets, pero no aparece en la web.

## 2. Control de calidad antes de publicar

En Google Sheets, menu `Dzongpa Pujas`:

1. Ejecutar `Actualizar panel operativo`.
2. Ejecutar `Control de calidad puja activa`.
3. Revisar el popup o email de resultado.

No continuar si aparece algun aviso critico.

Avisos criticos habituales:

- Falta `GITHUB_TOKEN`: revisar Propiedades de script.
- Falta Zoom: revisar `Pujas_Eventos`.
- Stripe repetido: corregir enlaces.
- Web URL incorrecta: debe apuntar a `https://www.dzongpaeuropa.org`.
- Formulario incorrecto: revisar `formulario_url`.

## 3. Publicar semana completa

En Google Sheets, menu `Dzongpa Pujas`:

1. Ejecutar `Publicar semana completa`.
2. Esperar el email interno de resultado.
3. Comprobar que todos los pasos aparecen como `OK`:
   - Sincronizar configuracion
   - Control de calidad
   - Validar puja activa
   - Preparar puja activa
   - Programar recordatorio 2h exacto
   - Verificar activadores
   - Publicar puja en web
   - Preparar campos WhatsApp catalogo
   - Actualizar plantilla WhatsApp
   - Generar mensaje WhatsApp
   - Enviar panel de control
   - Actualizar panel operativo

Despues:

1. Abrir GitHub Actions.
2. Confirmar que el workflow de build termina en verde.
3. Abrir `https://www.dzongpaeuropa.org/pujas-semanales`.
4. Verificar en escritorio y movil:
   - Nombre de la puja.
   - Fecha.
   - Horario.
   - Boton `Registrarse`.
   - Botones de donativo.
   - No aparece Zoom.

## 4. Prueba real de formulario

Tras publicar:

1. Abrir la pagina publica de pujas.
2. Pulsar `Registrarse`.
3. Enviar una inscripcion de prueba identificable, por ejemplo nombre `TEST Dzongpa`.
4. Confirmar en Gmail:
   - El usuario recibe confirmacion.
   - Secretaria recibe aviso interno.
5. Confirmar en Google Sheets:
   - La fila aparece.
   - `puja_id` coincide con la puja activa.
   - `Estado email confirmacion` queda en `Enviado`.
   - `Fecha email confirmacion` queda rellenada.

Si la prueba fue solo tecnica, marcarla claramente como test o eliminarla manualmente solo despues de confirmar que no afecta a datos reales.

## 5. Seguimiento diario

Cada dia mientras la puja esta abierta:

1. Revisar `Panel_Operativo`.
2. Revisar `Logs_Automatizacion`.
3. Revisar Gmail por avisos de:
   - Google Apps Script failures.
   - Control diario pujas - REVISION.
   - Errores GitHub.
   - Errores de permisos.
4. Revisar numero de inscripciones.

Si llega aviso de permisos Gmail:

1. Abrir Apps Script.
2. Ejecutar `autorizarPermisosPujas`.
3. Aceptar permisos.
4. Enviar una prueba de formulario.

## 6. Recordatorios automaticos

La funcion `ejecutarAutomatizacionPuja` se ejecuta por trigger temporal como mecanismo de rescate.

Debe enviar:

- Recordatorio 24h cuando falten 24 horas o menos.
- Recordatorio 2h mediante activador exacto `enviarRecordatorio2hProgramado`, programado 2 horas antes.
- Recordatorio 2h de rescate si el activador exacto falla o si alguien se inscribe dentro de la ventana de 2 horas.
- Email post-puja cuando la practica haya terminado.
- Cierre web post-puja: si no quedan emails post-puja pendientes, deja la web en estado pendiente una sola vez por `puja_id`.
- Control diario sistema: una revision diaria a las 09:00 que solo envia email si detecta incidencias.

Comprobacion:

1. Revisar `Panel_Operativo`.
2. Revisar el bloque `Automatizacion`:
   - `Formulario`: OK.
   - `Rescate cada 30 min`: OK.
   - `Recordatorio 2h exacto`: PROGRAMADO si la puja esta a mas de 2 horas.
   - `Control diario sistema`: OK.
   - Si no hay puja activa, `Verificar activadores` debe seguir funcionando y no debe exigir recordatorio 2h exacto.
3. Revisar columnas:
   - `Estado recordatorio 24h`
   - `Estado recordatorio 2h`
   - `Estado email post-puja`
4. Confirmar que no se duplican envios para el mismo email.

Si hace falta forzar una comprobacion:

1. En el menu, ejecutar `Verificar activadores`.
2. Si todo esta OK, ejecutar `Ejecutar automatizacion puja` solo si hace falta comprobar pendientes.
3. Revisar el log.
4. No repetir varias veces si ya aparecen estados `Enviado`.

## 7. Despues de la puja

1. Confirmar que el email post-puja se ha enviado.
2. Revisar si hay respuestas o incidencias en `secretaria@dzongpaeuropa.org`.
3. Actualizar `Pujas_Eventos` para preparar la siguiente semana.
4. Dejar la puja antigua fuera de estado `activo`.
5. Normalmente no hace falta ejecutar nada: la automatizacion deja la web en estado pendiente cuando ya no quedan emails post-puja pendientes.
6. Si todavia no hay datos de la proxima puja y la automatizacion no lo ha hecho, ejecutar `Dzongpa Pujas > Publicar sin proxima puja` como respaldo manual.
7. Comprobar que `https://www.dzongpaeuropa.org/pujas-semanales` muestra el estado pendiente y no muestra botones de registro ni donativo.
8. Ejecutar `Actualizar panel operativo`; debe mostrar el estado sin puja activa sin bloquear.

## 8. Backup despues de cambios

Si solo quieres guardar backup sin desplegar codigo nuevo, ejecutar desde la raiz del repo:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\backup_apps_script_pujas.ps1
```

Despues revisar:

```powershell
git diff -- ops/apps-script-pujas scripts/backup_apps_script_pujas.ps1
git status --short
```

Si todo esta correcto:

```powershell
git add ops/apps-script-pujas scripts/backup_apps_script_pujas.ps1
git commit -m "Backup Apps Script pujas"
git push origin main
```

Si has cambiado codigo de Apps Script y quieres hacer el flujo completo:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\deploy_apps_script_pujas.ps1 -BackupAfter -Commit -Push
```

Ese comando valida, despliega, genera backup saneado, crea commit si hay cambios y sube a GitHub.

## 9. Incidencias rapidas

| Problema | Accion |
| --- | --- |
| No llega email de confirmacion | Revisar triggers, ejecutar `autorizarPermisosPujas`, probar formulario. |
| Llega aviso de permisos de Google | Reautorizar con `autorizarPermisosPujas`. |
| La web no actualiza la puja | Revisar GitHub Actions y `GITHUB_TOKEN`. |
| No hay proxima puja confirmada | La automatizacion debe publicar estado pendiente tras el post-puja. `Verificar activadores` debe funcionar sin puja activa. Si la web no queda pendiente, ejecutar `Publicar sin proxima puja` como respaldo manual. |
| Stripe apunta mal | Corregir URLs en `Pujas_Eventos` y volver a publicar semana completa. |
| No aparece `puja_id` | Ejecutar prueba de formulario y revisar encabezados de Sheets. |
| Recordatorio no sale | Ejecutar `Verificar activadores`, revisar `PUJA_START_ISO`, estados de recordatorio y activador exacto 2h. |
| Hay emails duplicados | Revisar columnas de estado y duplicados de email en la hoja. |
| No llega control diario | Ejecutar `Instalar control diario` y despues `Actualizar panel operativo`. |

## 10. Criterio final de semana lista

La semana esta lista cuando:

- Control de calidad devuelve OK.
- Web publica muestra la puja correcta.
- Formulario publica registra una fila nueva.
- Usuario recibe confirmacion.
- Secretaria recibe aviso interno.
- Stripe individual, familia y libre abren enlaces correctos.
- Panel operativo no muestra avisos criticos.
- `Verificar activadores` devuelve OK.
- `Control diario sistema` aparece como OK en el panel operativo.
- Tras cerrar la puja, la web queda en estado pendiente automaticamente si no hay proxima puja.
- Backup del Apps Script esta guardado si hubo cambios de codigo.
