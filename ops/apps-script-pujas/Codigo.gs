const CONFIG = {
  ORG_NAME: 'Dzongpa Europa',
  ADMIN_EMAIL: 'secretaria@dzongpaeuropa.org',
  WEB_URL: 'https://www.dzongpaeuropa.org',
  REPLY_TO: 'secretaria@dzongpaeuropa.org',
  SHEET_ID: 'PEGA_AQUI_SHEET_ID',
  PUJA_ID: '2026-05-23',
  PUJA_NOMBRE: 'Ganapati Blanco Dzongpa no común',
  PUJA_FECHA: 'sábado 23 de mayo',
  PUJA_HORA: '09:00 España - 15:00 Taiwán',
  ZOOM_URL: 'PEGA_AQUI_ZOOM_URL',
  ZOOM_ID: 'PEGA_AQUI_ZOOM_ID',
  ZOOM_PASSCODE: 'PEGA_AQUI_ZOOM_PASSCODE',
  BIZUM_CODIGO: '06845',
  BANCO: 'Caixa Popular',
  IBAN: 'ES69 3159 0049 8128 4488 3229',
  TITULAR: 'Asociación Cultural Dzongpa',
  STRIPE_INDIVIDUAL_URL: 'https://donate.stripe.com/00wdR8eMl2xn6Qaa1Za3u06?locale=es',
  STRIPE_FAMILIA_URL: 'https://donate.stripe.com/3cIaEW0Vvc7Xcaub63a3u07?locale=es',
  STRIPE_LIBRE_URL: 'https://buy.stripe.com/fZuaEW1Zzc7X2zU5LJa3u00?locale=es',
  PUJA_START_ISO: '2026-05-23T09:00:00+02:00'
};

const LOG_SHEET_NAME = 'Logs_Automatizacion';
const PANEL_SHEET_NAME = 'Panel_Operativo';
const README_SHEET_NAME = 'README_OPERATIVO';

function onOpen(e) {
  try {
    crearMenuDzongpaPujas_();
  } catch (err) {
    Logger.log('No se pudo crear el menu Dzongpa Pujas: ' + String(err));
  }
}

function crearMenuDzongpaPujas() {
  crearMenuDzongpaPujas_();
}

function crearMenuDzongpaPujas_() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Dzongpa Pujas')
    .addItem('Publicar semana completa', 'menuPublicarSemanaCompleta')
    .addSeparator()
    .addItem('Actualizar panel operativo', 'menuActualizarPanelOperativo')
    .addItem('Control de calidad', 'menuControlCalidadPujaActiva')
    .addItem('Panel de control', 'menuPanelControlPuja')
    .addItem('Validar puja activa', 'menuValidarPujaActiva')
    .addItem('Preparar puja activa', 'menuPrepararPujaActiva')
    .addItem('Publicar puja en web', 'menuPublicarPujaWeb')
    .addItem('Publicar sin proxima puja', 'menuPublicarSinProximaPuja')
    .addItem('Generar mensaje WhatsApp', 'menuGenerarMensajeWhatsAppPuja')
    .addSeparator()
    .addItem('Enviar resumen diario ahora', 'menuEnviarResumenDiarioInscripciones')
    .addItem('Ejecutar automatizacion ahora', 'menuEjecutarAutomatizacionPuja')
    .addItem('Programar recordatorio 2h exacto', 'menuProgramarRecordatorio2hExacto')
    .addItem('Verificar activadores', 'menuVerificarActivadoresAutomatizacion')
    .addSeparator()
    .addItem('Instalar automatizacion completa', 'menuInstalarAutomatizacionCompleta')
    .addItem('Configurar GitHub', 'menuConfigurarPublicacionGitHubDzongpa')
    .addItem('Crear hoja de logs', 'menuCrearHojaLogsAutomatizacion')
    .addItem('Actualizar README operativo', 'menuActualizarReadmeOperativo')
    .addToUi();
}

function menuPublicarSemanaCompleta() {
  return ejecutarAccionMenu_('Publicar semana completa', publicarSemanaCompleta, 'Semana publicada correctamente.');
}

function menuActualizarPanelOperativo() {
  return ejecutarAccionMenu_('Actualizar panel operativo', actualizarPanelOperativo, 'Panel_Operativo actualizado.');
}

function menuControlCalidadPujaActiva() {
  return ejecutarAccionMenu_('Control de calidad', controlCalidadPujaActiva, 'Control de calidad OK.');
}

function menuPanelControlPuja() {
  return ejecutarAccionMenu_('Panel de control', panelControlPuja, 'Panel enviado por email.');
}

function menuValidarPujaActiva() {
  return ejecutarAccionMenu_('Validar puja activa', validarPujaActiva, 'Validacion enviada por email.');
}

function menuPrepararPujaActiva() {
  return ejecutarAccionMenu_('Preparar puja activa', prepararPujaActiva, 'Puja activa preparada.');
}

function menuPublicarPujaWeb() {
  return ejecutarAccionMenu_('Publicar puja en web', publicarYamlPujaActivaEnGitHub, 'Publicacion enviada a GitHub.');
}

function menuPublicarSinProximaPuja() {
  return ejecutarAccionMenu_('Publicar sin proxima puja', publicarSinProximaPujaEnGitHub, 'Estado sin proxima puja publicado.');
}

function menuGenerarMensajeWhatsAppPuja() {
  return ejecutarAccionMenu_('Generar mensaje WhatsApp', generarMensajeWhatsAppPuja, 'Mensaje WhatsApp enviado por email.');
}

function menuEnviarResumenDiarioInscripciones() {
  return ejecutarAccionMenu_('Enviar resumen diario', enviarResumenDiarioInscripciones, 'Resumen diario enviado por email.');
}

function menuEjecutarAutomatizacionPuja() {
  return ejecutarAccionMenu_('Ejecutar automatizacion puja', ejecutarAutomatizacionPuja, 'Automatizacion ejecutada.');
}

function menuProgramarRecordatorio2hExacto() {
  return ejecutarAccionMenu_('Programar recordatorio 2h exacto', programarRecordatorio2hExacto, 'Recordatorio 2h programado.');
}

function menuVerificarActivadoresAutomatizacion() {
  return ejecutarAccionMenu_('Verificar activadores', verificarActivadoresAutomatizacion, 'Activadores verificados.');
}

function menuInstalarAutomatizacionCompleta() {
  return ejecutarAccionMenu_('Instalar automatizacion completa', instalarAutomatizacionCompleta, 'Automatizacion completa instalada.');
}

function menuConfigurarPublicacionGitHubDzongpa() {
  return ejecutarAccionMenu_('Configurar GitHub', configurarPublicacionGitHubDzongpa, 'Configuracion GitHub guardada.');
}

function menuCrearHojaLogsAutomatizacion() {
  return ejecutarAccionMenu_('Crear hoja de logs', crearHojaLogsAutomatizacion, 'Hoja Logs_Automatizacion preparada.');
}

function menuActualizarReadmeOperativo() {
  return ejecutarAccionMenu_('Actualizar README operativo', actualizarReadmeOperativo, 'README_OPERATIVO actualizado.');
}

function onFormSubmit(e) {
  const v = e.namedValues || {};

  const email = pick(v, [
    'Dirección de correo electrónico',
    'Dirección de correo electrónico',
    'Correo',
    'Correo electrónico',
    'Correo electrónico',
    'Email',
    'Email Address',
    'Dirección de email',
    'Direccion de email'
  ]);

  const nombre = pick(v, ['Nombre completo', 'Nombre']);
  const idioma = pick(v, ['Idioma preferido', 'Idioma']) || 'Español';
  const participacion = pick(v, ['¿Participas como...?', '¿Participas como...?', 'Participas como', 'Tipo de inscripción', 'Tipo de inscripción']);
  const puja = pick(v, ['Puja a la que te inscribes', 'Puja']);
  const observaciones = pick(v, ['Observaciones o preguntas', 'Observaciones']);

  if (!email) {
    markRow(e, 'ERROR: sin email', '', 'No se encontró dirección de email.');
    notifyAdminError('Registro sin email', v);
    registrarLogAutomatizacion_('Nueva inscripcion', 'ERROR', 'Registro sin email.', 'form');
    return;
  }

  try {
    sincronizarConfigDesdeSheets_();

    const message = buildConfirmationEmail({
      email,
      nombre,
      idioma,
      participacion,
      puja
    });

   GmailApp.sendEmail(
  email,
  message.subject,
  message.textBody,
  {
    htmlBody: message.htmlBody,
    name: CONFIG.ORG_NAME,
    replyTo: CONFIG.REPLY_TO
  }
);

  GmailApp.sendEmail(
  CONFIG.ADMIN_EMAIL,
  'Nueva inscripción a las pujas - ' + (nombre || email),
  'Nueva inscripción recibida.\n\n' +
  'Nombre: ' + (nombre || '') + '\n' +
  'Email: ' + email + '\n' +
  'Idioma: ' + (idioma || '') + '\n' +
  'Participación: ' + (participacion || '') + '\n' +
  'Puja: ' + (puja || '') + '\n' +
  'Observaciones: ' + (observaciones || '-'),
  {
    htmlBody:
      '<p><strong>Nueva inscripción recibida.</strong></p>' +
      '<p><strong>Nombre:</strong> ' + escapeHtml(nombre) + '<br>' +
      '<strong>Email:</strong> ' + escapeHtml(email) + '<br>' +
      '<strong>Idioma:</strong> ' + escapeHtml(idioma) + '<br>' +
      '<strong>Participación:</strong> ' + escapeHtml(participacion) + '<br>' +
      '<strong>Puja:</strong> ' + escapeHtml(puja) + '<br>' +
      '<strong>Observaciones:</strong> ' + escapeHtml(observaciones || '-') + '</p>',
    name: CONFIG.ORG_NAME,
    replyTo: CONFIG.REPLY_TO
  }
);

    setCellByHeader(e.range.getSheet(), e.range.getRow(), 'puja_id', CONFIG.PUJA_ID);
    markRow(e, 'Enviado', new Date(), '');
    const zoomTardio = enviarZoom2hSiCorresponde_(e, email, nombre);
    registrarLogAutomatizacion_('Nueva inscripcion', 'OK', 'Confirmacion enviada a ' + email + '. ' + zoomTardio, 'form');

  } catch (err) {
    markRow(e, 'ERROR', '', String(err));
    notifyAdminError('Error enviando confirmación', err);
    registrarLogAutomatizacion_('Nueva inscripcion', 'ERROR', err && err.stack ? err.stack : String(err), 'form');
  }
}

function pick(values, names) {
  const normalizedMap = {};
  const keys = Object.keys(values || {});

  for (let k = 0; k < keys.length; k++) {
    normalizedMap[normalizeHeaderKey_(keys[k])] = keys[k];
  }

  for (let i = 0; i < names.length; i++) {
    const exactKey = names[i];
    if (values[exactKey] && values[exactKey][0]) {
      return String(values[exactKey][0]).trim();
    }

    const normalizedKey = normalizedMap[normalizeHeaderKey_(exactKey)];
    if (normalizedKey && values[normalizedKey] && values[normalizedKey][0]) {
      return String(values[normalizedKey][0]).trim();
    }
  }

  return '';
}

function buildConfirmationEmail(data) {
  const lang = normalizeLang(data.idioma);

  const texts = {
    es: {
      subject: 'Registro recibido - Pujas semanales Dzongpa Europa',
      title: 'Registro recibido',
      hello: 'Hola',
      p1: 'Hemos recibido tu inscripción para las pujas semanales de Dzongpa Europa.',
      p2: 'Cuando la práctica esté confirmada, recibirás la información de acceso correspondiente por correo electrónico.',
      donation: 'El donativo es voluntario y ayuda a sostener las actividades de Rinpoche y del linaje.',
      thanks: 'Gracias por participar.'
    },
    en: {
      subject: 'Registration received - Dzongpa Europa weekly pujas',
      title: 'Registration received',
      hello: 'Hello',
      p1: 'We have received your registration for the Dzongpa Europa weekly pujas.',
      p2: 'When the practice is confirmed, you will receive the corresponding access information by email.',
      donation: "The donation is voluntary and helps support Rinpoche's activities and the lineage.",
      thanks: 'Thank you for participating.'
    }
  };

  const t = texts[lang] || texts.en;
  const nombre = data.nombre || '';
  const pujaLine = data.puja ? '<p><strong>Puja:</strong> ' + escapeHtml(data.puja) + '</p>' : '';

  const htmlBody =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#2b2b2b;line-height:1.6">' +
    '<h1 style="font-family:Georgia,serif;color:#1f3f68;font-weight:400">' + t.title + '</h1>' +
    '<p>' + t.hello + ' ' + escapeHtml(nombre) + ',</p>' +
    '<p>' + t.p1 + '</p>' +
    pujaLine +
    '<p>' + t.p2 + '</p>' +
    '<p>' + t.donation + '</p>' +
    '<p>' + t.thanks + '</p>' +
    '<hr style="border:none;border-top:1px solid #ddd;margin:28px 0">' +
    '<p style="font-size:13px;color:#666">Dzongpa Europa<br>' +
    '<a href="' + CONFIG.WEB_URL + '">' + CONFIG.WEB_URL + '</a></p>' +
    '</div>';

  const textBody =
    t.title + '\n\n' +
    t.hello + ' ' + nombre + ',\n\n' +
    t.p1 + '\n\n' +
    (data.puja ? 'Puja: ' + data.puja + '\n\n' : '') +
    t.p2 + '\n\n' +
    t.donation + '\n\n' +
    t.thanks + '\n\n' +
    CONFIG.WEB_URL;

  return { subject: t.subject, htmlBody, textBody };
}

function normalizeLang(value) {
  const s = normalizeHeaderKey_(value);
  if (s.includes('espanol') || s.includes('spanish') || s === 'es') return 'es';
  if (s.includes('english') || s === 'en') return 'en';
  if (s.includes('francais') || s.includes('francés') || s.includes('french') || s === 'fr') return 'en';
  if (s.includes('deutsch') || s.includes('german') || s === 'de') return 'en';
  if (s.includes('中文') || s.includes('chinese') || s === 'zh') return 'en';
  return 'en';
}

function markRow(e, estado, fecha, notas) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  const row = e.range.getRow();

  setCellByHeader(sheet, row, 'Estado email confirmación', estado);
  if (fecha) setCellByHeader(sheet, row, 'Fecha email confirmación', fecha);
  if (notas) setCellByHeader(sheet, row, 'Notas internas', notas);
}

function setCellByHeader(sheet, row, headerName, value) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let col = headers.indexOf(headerName) + 1;

  if (col === 0) {
    const normalizedHeaderName = normalizeHeaderKey_(headerName);
    for (let i = 0; i < headers.length; i++) {
      if (normalizeHeaderKey_(headers[i]) === normalizedHeaderName) {
        col = i + 1;
        break;
      }
    }
  }

  if (col === 0) {
    col = sheet.getLastColumn() + 1;
    sheet.getRange(1, col).setValue(headerName);
  }

  sheet.getRange(row, col).setValue(value);
}

function notifyAdminError(subject, detail) {
  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    '[Pujas] ' + subject,
    typeof detail === 'string' ? detail : JSON.stringify(detail, null, 2),
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}

function autorizarPermisosPujas() {
  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Autorizacion permisos Dzongpa Pujas',
    'Permisos de GmailApp autorizados para la automatizacion de pujas.',
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  Logger.log('Autorizacion de permisos completada.');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function installTrigger() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);

  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();

  Logger.log('Activador instalado correctamente para la hoja: ' + ss.getName());
}

function getResponsesSheet_() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = pujasFindSheet_(ss, [
    'Respuestas de formulario 1',
    'Form Responses 1',
    'Form_Responses'
  ]);

  if (!sheet) {
    throw new Error('No encuentro la hoja de respuestas. Hojas disponibles: ' + pujasListSheetNames_(ss).join(', '));
  }

  return sheet;
}

function instalarMenuGoogleSheets() {
  instalarMenuGoogleSheets_();
}

function instalarMenuGoogleSheets_() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);

  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'onOpen') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('onOpen')
    .forSpreadsheet(ss)
    .onOpen()
    .create();

  registrarLogAutomatizacion_(
    'Instalar menu Google Sheets',
    'OK',
    'Activador onOpen instalado para la hoja: ' + ss.getName(),
    'setup'
  );

  Logger.log('Menu Google Sheets instalado para la hoja: ' + ss.getName());
}

function crearHojaLogsAutomatizacion() {
  const sheet = ensureLogSheet_();
  registrarLogAutomatizacion_(
    'Crear hoja de logs',
    'OK',
    'Hoja preparada: ' + LOG_SHEET_NAME,
    'setup'
  );
  Logger.log('Hoja preparada: ' + sheet.getName());
}

function ejecutarAccionMenu_(accion, handler, successMessage) {
  try {
    const result = handler();
    const detail = successMessage || 'OK';
    registrarLogAutomatizacion_(accion, 'OK', detail, 'menu');
    mostrarAlertaMenu_(accion, detail);
    return result;
  } catch (err) {
    const detail = err && err.stack ? err.stack : String(err);
    registrarLogAutomatizacion_(accion, 'ERROR', detail, 'menu');
    mostrarAlertaMenu_(accion + ' - ERROR', detail);
    return null;
  }
}

function registrarLogAutomatizacion_(accion, estado, detalle, origen) {
  try {
    const sheet = ensureLogSheet_();
    const user = Session.getEffectiveUser().getEmail();
    sheet.appendRow([
      new Date(),
      accion || '',
      estado || '',
      pujasLogText_(detalle),
      CONFIG.PUJA_ID || '',
      CONFIG.PUJA_NOMBRE || '',
      user || '',
      origen || 'script'
    ]);
  } catch (err) {
    Logger.log('No se pudo registrar log de automatizacion: ' + String(err));
  }
}

function ensureLogSheet_() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = ss.getSheetByName(LOG_SHEET_NAME);
  const headers = [
    'Marca temporal',
    'Accion',
    'Estado',
    'Detalle',
    'Puja ID',
    'Puja',
    'Usuario',
    'Origen'
  ];

  if (!sheet) {
    sheet = ss.insertSheet(LOG_SHEET_NAME);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#1f3f68')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
    return sheet;
  }

  const current = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0];
  for (let i = 0; i < headers.length; i++) {
    if (!current[i]) {
      sheet.getRange(1, i + 1).setValue(headers[i]);
    }
  }

  return sheet;
}

function mostrarAlertaMenu_(title, message) {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.alert(title, pujasLogText_(message).slice(0, 1800), ui.ButtonSet.OK);
  } catch (err) {
    Logger.log(title + ': ' + pujasLogText_(message));
  }
}

function pujasLogText_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch (err) {
    return String(value);
  }
}

function enviarRecordatorio24h() {
  sincronizarConfigDesdeSheets_();

  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    Logger.log('No hay registros.');
    return;
  }

  const headers = data[0];

  const colEmail = findEmailColumn_(headers, data);
  const colNombre = findColumn(headers, ['Nombre completo', 'Nombre']);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colEstado24h = ensureColumn(sheet, headers, 'Estado recordatorio 24h');

  if (colEmail === -1) throw new Error('No encuentro la columna de email.');
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  let enviados = 0;
  let omitidos = 0;
  let listaEnviados = [];
  let listaOmitidos = [];
  let emailsYaEnviados = {};

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const email = String(row[colEmail] || '').trim();
    const nombre = String(row[colNombre] || '').trim();
    const pujaId = normalizeSheetValue(row[colPujaId]);
    const configPujaId = normalizeSheetValue(CONFIG.PUJA_ID);
    const estadoActual = String(row[colEstado24h] || '').trim();

  if (!email || pujaId !== configPujaId || estadoActual === 'Enviado' || emailsYaEnviados[email.toLowerCase()]) {
    omitidos++;
    listaOmitidos.push(
      'Fila ' + (i + 1) +
      ' | email: ' + (email || 'sin email') +
      ' | puja_id: ' + (pujaId || 'vacío') +
      ' | estado: ' + (estadoActual || 'vacío')
  );
  continue;
}

    const message = buildReminder24hEmail(nombre);

   GmailApp.sendEmail(
  email,
  message.subject,
  message.textBody,
  {
    htmlBody: message.htmlBody,
    name: CONFIG.ORG_NAME,
    replyTo: CONFIG.REPLY_TO
  }
);

    sheet.getRange(i + 1, colEstado24h + 1).setValue('Enviado');
enviados++;
emailsYaEnviados[email.toLowerCase()] = true;
listaEnviados.push('Fila ' + (i + 1) + ' | ' + email);
    Utilities.sleep(300);
  }

GmailApp.sendEmail(
  CONFIG.ADMIN_EMAIL,
  'Recordatorio 24h enviado - ' + CONFIG.PUJA_NOMBRE,
  'Resultado del envío:\n\n' +
  'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
  'puja_id: ' + CONFIG.PUJA_ID + '\n' +
  'Enviados: ' + enviados + '\n' +
  'Omitidos: ' + omitidos + '\n\n' +
  'ENVIADOS:\n' +
  (listaEnviados.length ? listaEnviados.join('\n') : 'Ninguno') +
  '\n\nOMITIDOS:\n' +
  (listaOmitidos.length ? listaOmitidos.join('\n') : 'Ninguno'),
  {
    name: CONFIG.ORG_NAME,
    replyTo: CONFIG.REPLY_TO
  }
);
  Logger.log('Recordatorio 24h completado. Enviados: ' + enviados + ', omitidos: ' + omitidos);
}

function buildReminder24hEmail(nombre) {
  const subject = 'Recordatorio - Puja de mañana con Dzongpa Europa';

  const htmlBody =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#2b2b2b;line-height:1.6">' +
    '<h1 style="font-family:Georgia,serif;color:#1f3f68;font-weight:400">Recordatorio de la puja</h1>' +
    '<p>Hola ' + escapeHtml(nombre || '') + ',</p>' +
    '<p>Te recordamos que mañana tendrá lugar la puja semanal de Dzongpa Europa.</p>' +
    '<p><strong>Práctica:</strong> ' + escapeHtml(CONFIG.PUJA_NOMBRE) + '<br>' +
    '<strong>Fecha:</strong> ' + escapeHtml(CONFIG.PUJA_FECHA) + '<br>' +
    '<strong>Hora:</strong> ' + escapeHtml(CONFIG.PUJA_HORA) + '</p>' +
    '<p>El enlace de acceso se enviará antes del inicio de la práctica.</p>' +
    '<p>Gracias por participar.</p>' +
    '<hr style="border:none;border-top:1px solid #ddd;margin:28px 0">' +
    '<p style="font-size:13px;color:#666">Dzongpa Europa<br>' +
    '<a href="' + CONFIG.WEB_URL + '">' + CONFIG.WEB_URL + '</a></p>' +
    '</div>';

  const textBody =
    'Recordatorio de la puja\n\n' +
    'Hola ' + (nombre || '') + ',\n\n' +
    'Te recordamos que mañana tendrá lugar la puja semanal de Dzongpa Europa.\n\n' +
    'Práctica: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n' +
    'Hora: ' + CONFIG.PUJA_HORA + '\n\n' +
    'El enlace de acceso se enviará antes del inicio de la práctica.\n\n' +
    'Gracias por participar.\n\n' +
    CONFIG.WEB_URL;

  return { subject, htmlBody, textBody };
}

function findColumn(headers, names) {
  for (let i = 0; i < names.length; i++) {
    const index = headers.indexOf(names[i]);
    if (index !== -1) return index;
  }

  const normalizedHeaders = headers.map(function(header) {
    return normalizeHeaderKey_(header);
  });

  for (let n = 0; n < names.length; n++) {
    const normalizedName = normalizeHeaderKey_(names[n]);
    const normalizedIndex = normalizedHeaders.indexOf(normalizedName);
    if (normalizedIndex !== -1) return normalizedIndex;
  }

  return -1;
}

function findEmailColumn_(headers, data) {
  const index = findColumn(headers, [
    'Dirección de correo electrónico',
    'Dirección de correo electrónico',
    'Correo electrónico',
    'Correo electrónico',
    'Correo',
    'Email',
    'Email Address',
    'Dirección de email',
    'Direccion de email'
  ]);

  if (index !== -1) return index;

  let bestIndex = -1;
  let bestScore = 0;
  const rows = data || [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (let col = 0; col < headers.length; col++) {
    let score = 0;
    for (let row = 1; row < rows.length; row++) {
      const value = String((rows[row] && rows[row][col]) || '').trim();
      if (emailPattern.test(value)) score++;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIndex = col;
    }
  }

  return bestScore > 0 ? bestIndex : -1;
}

function ensureColumn(sheet, headers, headerName) {
  let index = headers.indexOf(headerName);
  if (index !== -1) return index;

  const normalizedHeaderName = normalizeHeaderKey_(headerName);
  for (let i = 0; i < headers.length; i++) {
    if (normalizeHeaderKey_(headers[i]) === normalizedHeaderName) {
      return i;
    }
  }

  const newCol = headers.length + 1;
  sheet.getRange(1, newCol).setValue(headerName);
  return newCol - 1;
}

function normalizeHeaderKey_(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/á|à/g, 'a')
    .replace(/é|è/g, 'e')
    .replace(/í|ì/g, 'i')
    .replace(/ó|ò/g, 'o')
    .replace(/ú|ù/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/¿/g, '')
    .replace(/-|·/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function normalizeSheetValue(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }

  return String(value || '').trim();
}

function enviarZoom2hSiCorresponde_(e, email, nombre) {
  if (!e || !e.range || !email) return 'Zoom 2h: no aplica.';

  const diffHours = horasHastaPuja_();
  if (diffHours > 2 || diffHours <= 0) {
    return 'Zoom 2h: fuera de ventana.';
  }

  if (!zoomConfigCompleta_()) {
    throw new Error('No se puede enviar Zoom 2h: Zoom incompleto.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = e.range.getSheet();
    const row = e.range.getRow();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const colPujaId = findColumn(headers, ['puja_id']);
    const colEstado2h = findColumn(headers, ['Estado recordatorio 2h']);

    const rowPujaId = colPujaId >= 0 ? normalizeSheetValue(sheet.getRange(row, colPujaId + 1).getValue()) : normalizeSheetValue(CONFIG.PUJA_ID);
    const estadoActual = colEstado2h >= 0 ? String(sheet.getRange(row, colEstado2h + 1).getValue() || '').trim() : '';

    if (rowPujaId !== normalizeSheetValue(CONFIG.PUJA_ID)) {
      return 'Zoom 2h: puja_id distinto.';
    }

    if (estadoActual === 'Enviado') {
      return 'Zoom 2h: ya enviado.';
    }

    const message = buildReminder2hEmail(nombre);
    GmailApp.sendEmail(
      email,
      message.subject,
      message.textBody,
      {
        htmlBody: message.htmlBody,
        name: CONFIG.ORG_NAME,
        replyTo: CONFIG.REPLY_TO
      }
    );

    setCellByHeader(sheet, row, 'Estado recordatorio 2h', 'Enviado');
    registrarLogAutomatizacion_('Zoom 2h inscripcion tardia', 'OK', 'Zoom enviado a ' + email, 'form');
    return 'Zoom 2h: enviado al inscribirse dentro de la ventana.';
  } finally {
    lock.releaseLock();
  }
}

function enviarRecordatorio2h() {
  sincronizarConfigDesdeSheets_();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {

  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    Logger.log('No hay registros.');
    return;
  }

  const headers = data[0];

  const colEmail = findEmailColumn_(headers, data);
  const colNombre = findColumn(headers, ['Nombre completo', 'Nombre']);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colEstado2h = ensureColumn(sheet, headers, 'Estado recordatorio 2h');

  if (colEmail === -1) throw new Error('No encuentro la columna de email.');
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  const configPujaId = normalizeSheetValue(CONFIG.PUJA_ID);

  let enviados = 0;
  let omitidos = 0;
  let listaEnviados = [];
  let listaOmitidos = [];
  let emailsYaEnviados = {};

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const email = String(row[colEmail] || '').trim();
    const nombre = String(row[colNombre] || '').trim();
    const pujaId = normalizeSheetValue(row[colPujaId]);
    const estadoActual = String(row[colEstado2h] || '').trim();

    if (!email || pujaId !== configPujaId || estadoActual === 'Enviado' || emailsYaEnviados[email.toLowerCase()]) {
      omitidos++;
      listaOmitidos.push(
        'Fila ' + (i + 1) +
        ' | email: ' + (email || 'sin email') +
        ' | puja_id: ' + (pujaId || 'vacío') +
        ' | estado: ' + (estadoActual || 'vacío') +
        ' | motivo: ' + (
          !email ? 'sin email' :
          pujaId !== configPujaId ? 'puja_id no coincide' :
          estadoActual === 'Enviado' ? 'ya enviado' :
          emailsYaEnviados[email.toLowerCase()] ? 'email duplicado en esta ejecución' :
          'omitido'
        )
      );
      continue;
    }

    const message = buildReminder2hEmail(nombre);

    GmailApp.sendEmail(
      email,
      message.subject,
      message.textBody,
      {
        htmlBody: message.htmlBody,
        name: CONFIG.ORG_NAME,
        replyTo: CONFIG.REPLY_TO
      }
    );

    sheet.getRange(i + 1, colEstado2h + 1).setValue('Enviado');
    enviados++;
    emailsYaEnviados[email.toLowerCase()] = true;
    listaEnviados.push('Fila ' + (i + 1) + ' | ' + email);
  }

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Recordatorio 2h enviado - ' + CONFIG.PUJA_NOMBRE,
    'Resultado del envío:\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Enviados: ' + enviados + '\n' +
    'Omitidos: ' + omitidos + '\n\n' +
    'ENVIADOS:\n' +
    (listaEnviados.length ? listaEnviados.join('\n') : 'Ninguno') +
    '\n\nOMITIDOS:\n' +
    (listaOmitidos.length ? listaOmitidos.join('\n') : 'Ninguno'),
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  Logger.log('Recordatorio 2h completado. Enviados: ' + enviados + ', omitidos: ' + omitidos);
  } finally {
    lock.releaseLock();
  }
}

function buildReminder2hEmail(nombre) {
  const subject = 'Enlace de acceso - Puja con Dzongpa Europa';

  const htmlBody =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#2b2b2b;line-height:1.6">' +
    '<h1 style="font-family:Georgia,serif;color:#1f3f68;font-weight:400">Enlace de acceso a la puja</h1>' +
    '<p>Hola ' + escapeHtml(nombre || '') + ',</p>' +
    '<p>La puja semanal de Dzongpa Europa comenzará próximamente.</p>' +
    '<p><strong>Práctica:</strong> ' + escapeHtml(CONFIG.PUJA_NOMBRE) + '<br>' +
    '<strong>Fecha:</strong> ' + escapeHtml(CONFIG.PUJA_FECHA) + '<br>' +
    '<strong>Hora:</strong> ' + escapeHtml(CONFIG.PUJA_HORA) + '</p>' +
    '<div style="background:#f5efe0;border:1px solid #d5aa36;padding:18px;margin:24px 0;border-radius:6px">' +
    '<p style="margin-top:0"><strong>Acceso por Zoom</strong></p>' +
    '<p><a href="' + CONFIG.ZOOM_URL + '" style="display:inline-block;background:#991b1e;color:#fff;text-decoration:none;padding:12px 20px;border-radius:4px;font-weight:bold">Unirme a la puja</a></p>' +
    '<p style="margin-bottom:0">ID de reunión: <strong>' + escapeHtml(CONFIG.ZOOM_ID) + '</strong><br>' +
    'Contraseña: <strong>' + escapeHtml(CONFIG.ZOOM_PASSCODE) + '</strong></p>' +
    '</div>' +
    '<p>Por favor, no compartas este enlace fuera de las personas registradas.</p>' +
    '<p>Gracias por participar.</p>' +
    '<hr style="border:none;border-top:1px solid #ddd;margin:28px 0">' +
    '<p style="font-size:13px;color:#666">Dzongpa Europa<br>' +
    '<a href="' + CONFIG.WEB_URL + '">' + CONFIG.WEB_URL + '</a></p>' +
    '</div>';

  const textBody =
    'Enlace de acceso a la puja\n\n' +
    'Hola ' + (nombre || '') + ',\n\n' +
    'La puja semanal de Dzongpa Europa comenzará próximamente.\n\n' +
    'Práctica: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n' +
    'Hora: ' + CONFIG.PUJA_HORA + '\n\n' +
    'Zoom: ' + CONFIG.ZOOM_URL + '\n' +
    'ID de reunión: ' + CONFIG.ZOOM_ID + '\n' +
    'Contraseña: ' + CONFIG.ZOOM_PASSCODE + '\n\n' +
    'Por favor, no compartas este enlace fuera de las personas registradas.\n\n' +
    'Gracias por participar.\n\n' +
    CONFIG.WEB_URL;

  return { subject, htmlBody, textBody };
}
function enviarEmailPostPuja() {
  sincronizarConfigDesdeSheets_();

  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    Logger.log('No hay registros.');
    return;
  }

  const headers = data[0];

  const colEmail = findEmailColumn_(headers, data);
  const colNombre = findColumn(headers, ['Nombre completo', 'Nombre']);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colEstadoPost = ensureColumn(sheet, headers, 'Estado email post-puja');

  if (colEmail === -1) throw new Error('No encuentro la columna de email.');
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  const configPujaId = normalizeSheetValue(CONFIG.PUJA_ID);

  let enviados = 0;
  let omitidos = 0;
  let listaEnviados = [];
  let listaOmitidos = [];
  let emailsYaEnviados = {};

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const email = String(row[colEmail] || '').trim();
    const nombre = String(row[colNombre] || '').trim();
    const pujaId = normalizeSheetValue(row[colPujaId]);
    const estadoActual = String(row[colEstadoPost] || '').trim();

    if (!email || pujaId !== configPujaId || estadoActual === 'Enviado' || emailsYaEnviados[email.toLowerCase()]) {
      omitidos++;
      listaOmitidos.push(
        'Fila ' + (i + 1) +
        ' | email: ' + (email || 'sin email') +
        ' | puja_id: ' + (pujaId || 'vacío') +
        ' | estado: ' + (estadoActual || 'vacío') +
        ' | motivo: ' + (
          !email ? 'sin email' :
          pujaId !== configPujaId ? 'puja_id no coincide' :
          estadoActual === 'Enviado' ? 'ya enviado' :
          emailsYaEnviados[email.toLowerCase()] ? 'email duplicado en esta ejecución' :
          'omitido'
        )
      );
      continue;
    }

    const message = buildPostPujaEmail(nombre);

    GmailApp.sendEmail(
      email,
      message.subject,
      message.textBody,
      {
        htmlBody: message.htmlBody,
        name: CONFIG.ORG_NAME,
        replyTo: CONFIG.REPLY_TO
      }
    );

    sheet.getRange(i + 1, colEstadoPost + 1).setValue('Enviado');
    enviados++;
    emailsYaEnviados[email.toLowerCase()] = true;
    listaEnviados.push('Fila ' + (i + 1) + ' | ' + email);

    Utilities.sleep(300);
  }

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Email post-puja enviado - ' + CONFIG.PUJA_NOMBRE,
    'Resultado del envío:\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Enviados: ' + enviados + '\n' +
    'Omitidos: ' + omitidos + '\n\n' +
    'ENVIADOS:\n' +
    (listaEnviados.length ? listaEnviados.join('\n') : 'Ninguno') +
    '\n\nOMITIDOS:\n' +
    (listaOmitidos.length ? listaOmitidos.join('\n') : 'Ninguno'),
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  Logger.log('Email post-puja completado. Enviados: ' + enviados + ', omitidos: ' + omitidos);
}

function buildPostPujaEmail(nombre) {
  const subject = 'Gracias por participar - Dzongpa Europa';

  const htmlBody =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#2b2b2b;line-height:1.6">' +
    '<h1 style="font-family:Georgia,serif;color:#1f3f68;font-weight:400">Gracias por participar</h1>' +
    '<p>Hola ' + escapeHtml(nombre || '') + ',</p>' +
    '<p>Gracias por haber participado en la puja semanal de Dzongpa Europa.</p>' +
    '<p><strong>Práctica:</strong> ' + escapeHtml(CONFIG.PUJA_NOMBRE) + '<br>' +
    '<strong>Fecha:</strong> ' + escapeHtml(CONFIG.PUJA_FECHA) + '</p>' +
    '<p>Si lo deseas, puedes realizar un donativo voluntario para sostener las actividades de Rinpoche y la continuidad de las prácticas del linaje.</p>' +
    '<p><strong>Donativo sugerido:</strong> 8 EUR individual - 15 EUR familia.</p>' +

    '<div style="background:#f5efe0;border:1px solid #d5aa36;padding:18px;margin:24px 0;border-radius:6px">' +
    '<p style="margin-top:0"><strong>Bizum solidario</strong></p>' +
    '<p>Código: <strong>' + escapeHtml(CONFIG.BIZUM_CODIGO) + '</strong><br>' +
    'Entidad: <strong>' + escapeHtml(CONFIG.TITULAR) + '</strong></p>' +
    '</div>' +

    '<div style="background:#f8f8f8;border:1px solid #ddd;padding:18px;margin:24px 0;border-radius:6px">' +
    '<p style="margin-top:0"><strong>Transferencia bancaria</strong></p>' +
    '<p>Titular: <strong>' + escapeHtml(CONFIG.TITULAR) + '</strong><br>' +
    'Banco: <strong>' + escapeHtml(CONFIG.BANCO) + '</strong><br>' +
    'IBAN: <strong>' + escapeHtml(CONFIG.IBAN) + '</strong><br>' +
    'Concepto: <strong>Puja + tu nombre</strong></p>' +
    '</div>' +

    '<div style="text-align:center;margin:28px 0">' +
    '<p><strong>Pago con tarjeta</strong></p>' +
    '<p>' +
    '<a href="' + CONFIG.STRIPE_INDIVIDUAL_URL + '" style="display:inline-block;background:#991b1e;color:#fff;text-decoration:none;padding:12px 18px;border-radius:4px;font-weight:bold;margin:4px">8 EUR individual</a>' +
    '<a href="' + CONFIG.STRIPE_FAMILIA_URL + '" style="display:inline-block;background:#991b1e;color:#fff;text-decoration:none;padding:12px 18px;border-radius:4px;font-weight:bold;margin:4px">15 EUR familia</a>' +
    '<a href="' + CONFIG.STRIPE_LIBRE_URL + '" style="display:inline-block;background:#1f3f68;color:#fff;text-decoration:none;padding:12px 18px;border-radius:4px;font-weight:bold;margin:4px">Donativo libre</a>' +
    '</p>' +
    '</div>' +

    '<p>El donativo es completamente voluntario.</p>' +
    '<p>Gracias por tu participación y apoyo.</p>' +
    '<hr style="border:none;border-top:1px solid #ddd;margin:28px 0">' +
    '<p style="font-size:13px;color:#666">Dzongpa Europa<br>' +
    '<a href="' + CONFIG.WEB_URL + '">' + CONFIG.WEB_URL + '</a></p>' +
    '</div>';

  const textBody =
    'Gracias por participar\n\n' +
    'Hola ' + (nombre || '') + ',\n\n' +
    'Gracias por haber participado en la puja semanal de Dzongpa Europa.\n\n' +
    'Práctica: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n\n' +
    'Si lo deseas, puedes realizar un donativo voluntario para sostener las actividades de Rinpoche y la continuidad de las prácticas del linaje.\n\n' +
    'Donativo sugerido: 8 EUR individual - 15 EUR familia.\n\n' +
    'Bizum solidario:\n' +
    'Código: ' + CONFIG.BIZUM_CODIGO + '\n' +
    'Entidad: ' + CONFIG.TITULAR + '\n\n' +
    'Transferencia bancaria:\n' +
    'Titular: ' + CONFIG.TITULAR + '\n' +
    'Banco: ' + CONFIG.BANCO + '\n' +
    'IBAN: ' + CONFIG.IBAN + '\n' +
    'Concepto: Puja + tu nombre\n\n' +
    'Pago con tarjeta:\n' +
    '8 EUR individual: ' + CONFIG.STRIPE_INDIVIDUAL_URL + '\n' +
    '15 EUR familia: ' + CONFIG.STRIPE_FAMILIA_URL + '\n' +
    'Donativo libre: ' + CONFIG.STRIPE_LIBRE_URL + '\n\n' +
    'El donativo es completamente voluntario.\n\n' +
    'Gracias por tu participación y apoyo.\n\n' +
    CONFIG.WEB_URL;

  return { subject, htmlBody, textBody };
}
function verResumenPujaActual() {
  sincronizarConfigDesdeSheets_();

  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    Logger.log('No hay registros.');
    return;
  }

  const headers = data[0];

  const colEmail = findEmailColumn_(headers, data);
  const colNombre = findColumn(headers, ['Nombre completo', 'Nombre']);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colEstadoConfirmacion = findColumn(headers, ['Estado email confirmación']);
  const colEstado24h = findColumn(headers, ['Estado recordatorio 24h']);
  const colEstado2h = findColumn(headers, ['Estado recordatorio 2h']);
  const colEstadoPost = findColumn(headers, ['Estado email post-puja']);

  if (colEmail === -1) throw new Error('No encuentro la columna de email.');
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  const configPujaId = normalizeSheetValue(CONFIG.PUJA_ID);

  let totalFilasPuja = 0;
  let emailsUnicos = {};
  let sinEmail = 0;
  let confirmaciones = 0;
  let recordatorios24h = 0;
  let recordatorios2h = 0;
  let postPuja = 0;
  let detalle = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const email = String(row[colEmail] || '').trim();
    const nombre = colNombre !== -1 ? String(row[colNombre] || '').trim() : '';
    const pujaId = normalizeSheetValue(row[colPujaId]);

    if (pujaId !== configPujaId) continue;

    totalFilasPuja++;

    if (!email) {
      sinEmail++;
    } else {
      emailsUnicos[email.toLowerCase()] = true;
    }

    const estadoConfirmacion = colEstadoConfirmacion !== -1 ? String(row[colEstadoConfirmacion] || '').trim() : '';
    const estado24h = colEstado24h !== -1 ? String(row[colEstado24h] || '').trim() : '';
    const estado2h = colEstado2h !== -1 ? String(row[colEstado2h] || '').trim() : '';
    const estadoPost = colEstadoPost !== -1 ? String(row[colEstadoPost] || '').trim() : '';

    if (estadoConfirmacion === 'Enviado') confirmaciones++;
    if (estado24h === 'Enviado') recordatorios24h++;
    if (estado2h === 'Enviado') recordatorios2h++;
    if (estadoPost === 'Enviado') postPuja++;

    detalle.push(
      'Fila ' + (i + 1) +
      ' | ' + (nombre || 'sin nombre') +
      ' | ' + (email || 'sin email') +
      ' | confirmación: ' + (estadoConfirmacion || 'vacío') +
      ' | 24h: ' + (estado24h || 'vacío') +
      ' | 2h: ' + (estado2h || 'vacío') +
      ' | post: ' + (estadoPost || 'vacío')
    );
  }

  const resumen =
    'RESUMEN PUJA ACTUAL\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n' +
    'Hora: ' + CONFIG.PUJA_HORA + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n\n' +
    'Filas asociadas a esta puja: ' + totalFilasPuja + '\n' +
    'Emails únicos: ' + Object.keys(emailsUnicos).length + '\n' +
    'Filas sin email: ' + sinEmail + '\n\n' +
    'Confirmaciones enviadas: ' + confirmaciones + '\n' +
    'Recordatorios 24h enviados: ' + recordatorios24h + '\n' +
    'Recordatorios 2h enviados: ' + recordatorios2h + '\n' +
    'Emails post-puja enviados: ' + postPuja + '\n\n' +
    'DETALLE:\n' +
    (detalle.length ? detalle.join('\n') : 'No hay registros para esta puja.');

  Logger.log(resumen);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Resumen puja actual - ' + CONFIG.PUJA_NOMBRE,
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}
function ejecutarAutomatizacionPuja() {
  sincronizarConfigDesdeSheets_();
  validarConfigAutomatizacion_();

  const start = new Date(CONFIG.PUJA_START_ISO);
  const now = new Date();
  const diffHours = (start.getTime() - now.getTime()) / (1000 * 60 * 60);

  Logger.log('Automatización puja: faltan ' + diffHours.toFixed(2) + ' horas.');

  if (diffHours <= 24 && diffHours > 18) {
    if (hayPendientesParaPuja_('Estado recordatorio 24h')) {
      enviarRecordatorio24h();
    } else {
      Logger.log('24h: no hay pendientes.');
    }
  }

  if (diffHours <= 2 && diffHours > 1.75) {
    Logger.log('2h: envio principal delegado al activador exacto. Sin envio por rescate todavia.');
  }

  if (diffHours <= 1.75 && diffHours > 0) {
    if (hayPendientesParaPuja_('Estado recordatorio 2h')) {
      Logger.log('2h: envio de rescate para pendientes.');
      enviarRecordatorio2h();
    } else {
      Logger.log('2h: no hay pendientes.');
    }
  }

  if (diffHours <= -2 && diffHours > -30) {
    if (hayPendientesParaPuja_('Estado email post-puja')) {
      enviarEmailPostPuja();
    } else {
      Logger.log('Post-puja: no hay pendientes.');
    }
  }
}

function instalarAutomatizacionCompleta() {
  installTrigger();
  instalarMenuGoogleSheets_();
  instalarActivadorAutomatizacionPuja_();
  programarRecordatorio2hExacto_();
  instalarResumenDiarioInscripciones_();
  instalarPublicacionWebAutomatica_();
  actualizarReadmeOperativo();
  actualizarPanelOperativo();
  Logger.log('Automatización completa instalada.');
}

function publicarSemanaCompleta() {
  const startedAt = new Date();
  const pasos = [];

  registrarPasoPublicacionSemana_(pasos, 'Sincronizar configuracion', function() {
    return sincronizarConfigDesdeSheets_();
  });

  registrarPasoPublicacionSemana_(pasos, 'Control de calidad', function() {
    return controlCalidadPujaActiva();
  });

  registrarPasoPublicacionSemana_(pasos, 'Validar puja activa', function() {
    return validarPujaActiva();
  });

  registrarPasoPublicacionSemana_(pasos, 'Preparar puja activa', function() {
    return prepararPujaActiva();
  });

  registrarPasoPublicacionSemana_(pasos, 'Programar recordatorio 2h exacto', function() {
    return programarRecordatorio2hExacto_();
  });

  registrarPasoPublicacionSemana_(pasos, 'Verificar activadores', function() {
    return verificarActivadoresAutomatizacion_();
  });

  registrarPasoPublicacionSemana_(pasos, 'Publicar puja en web', function() {
    return publicarYamlPujaActivaEnGitHub();
  });

  registrarPasoPublicacionSemana_(pasos, 'Generar mensaje WhatsApp', function() {
    return generarMensajeWhatsAppPuja();
  });

  registrarPasoPublicacionSemana_(pasos, 'Enviar panel de control', function() {
    return panelControlPuja();
  });

  registrarPasoPublicacionSemana_(pasos, 'Actualizar panel operativo', function() {
    return actualizarPanelOperativo();
  });

  const resumen =
    'PUBLICACION SEMANA COMPLETA\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Inicio: ' + startedAt + '\n' +
    'Fin: ' + new Date() + '\n\n' +
    pasos.map(function(paso) {
      return '- ' + paso.nombre + ': ' + paso.estado;
    }).join('\n');

  Logger.log(resumen);
  registrarLogAutomatizacion_('Publicar semana completa', 'OK', resumen, 'workflow');

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Semana puja publicada - ' + CONFIG.PUJA_NOMBRE,
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  return resumen;
}

function registrarPasoPublicacionSemana_(pasos, nombre, handler) {
  try {
    const result = handler();
    pasos.push({
      nombre: nombre,
      estado: 'OK'
    });
    registrarLogAutomatizacion_(nombre, 'OK', 'Paso completado dentro de Publicar semana completa.', 'workflow');
    return result;
  } catch (err) {
    const detail = err && err.stack ? err.stack : String(err);
    pasos.push({
      nombre: nombre,
      estado: 'ERROR',
      detalle: detail
    });
    registrarLogAutomatizacion_(nombre, 'ERROR', detail, 'workflow');
    throw new Error('Fallo en "' + nombre + '": ' + detail);
  }
}

function controlCalidadPujaActiva() {
  const data = sincronizarConfigDesdeSheets_();
  const avisos = pujasValidarDatosActivos_(data);
  const estado = obtenerEstadoPujaActiva_();
  const resumen =
    'CONTROL DE CALIDAD PUJA ACTIVA\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n' +
    'Hora: ' + CONFIG.PUJA_HORA + '\n' +
    'Inicio ISO: ' + CONFIG.PUJA_START_ISO + '\n\n' +
    'Inscripciones: ' + estado.total + '\n' +
    'Sin email: ' + estado.sinEmail + '\n\n' +
    'Resultado: ' + (avisos.length ? 'BLOQUEADO' : 'OK') + '\n\n' +
    'AVISOS CRITICOS\n' +
    (avisos.length ? avisos.map(function(aviso) { return '- ' + aviso; }).join('\n') : 'Sin avisos críticos.');

  Logger.log(resumen);
  registrarLogAutomatizacion_('Control de calidad', avisos.length ? 'ERROR' : 'OK', resumen, 'quality');

  if (avisos.length) {
    GmailApp.sendEmail(
      CONFIG.ADMIN_EMAIL,
      'Control de calidad BLOQUEADO - ' + CONFIG.PUJA_NOMBRE,
      resumen,
      {
        name: CONFIG.ORG_NAME,
        replyTo: CONFIG.REPLY_TO
      }
    );
    throw new Error(resumen);
  }

  return resumen;
}

function actualizarReadmeOperativo() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = ss.getSheetByName(README_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(README_SHEET_NAME);
  }

  const rows = [
    ['README OPERATIVO - DZONGPA PUJAS', ''],
    ['Objetivo', 'Gestionar cada semana la puja activa desde Google Sheets con el menor número posible de pasos manuales.'],
    ['', ''],
    ['FLUJO SEMANAL RECOMENDADO', ''],
    ['1', 'Actualizar la fila activa en Pujas_Eventos. Solo debe haber una puja con estado activo.'],
    ['2', 'Revisar Catalogo_Pujas si la puja, descripción o datos base han cambiado.'],
    ['3', 'Comprobar Configuracion_Pujas: Zoom, Stripe, formulario, web y datos bancarios.'],
    ['4', 'Ejecutar: Dzongpa Pujas > Publicar semana completa.'],
    ['5', 'Revisar Panel_Operativo. Estado general debe ser OK.'],
    ['6', 'Confirmar que el bloque Automatizacion muestra formulario, rescate y recordatorio 2h exacto en OK.'],
    ['7', 'Revisar Logs_Automatizacion. Todos los pasos deben aparecer como OK.'],
    ['8', 'Revisar GitHub Actions. El workflow Build static site debe estar en verde.'],
    ['9', 'Comprobar la web: https://www.dzongpaeuropa.org/pujas-semanales'],
    ['10', 'Usar el email recibido con el mensaje WhatsApp para difusión manual.'],
    ['', ''],
    ['ACCIONES DEL MENU DZONGPA PUJAS', ''],
    ['Publicar semana completa', 'Acción principal semanal. Valida, prepara, publica web, genera WhatsApp, envía panel y actualiza Panel_Operativo.'],
    ['Control de calidad', 'Comprueba que no hay datos peligrosos. Si hay errores críticos, bloquea la publicación.'],
    ['Actualizar panel operativo', 'Regenera la pestaña Panel_Operativo con estado de puja, enlaces y avisos.'],
    ['Panel de control', 'Envía por email el estado de inscripciones y emails.'],
    ['Validar puja activa', 'Envía por email una validación completa de datos activos.'],
    ['Preparar puja activa', 'Limpia estados 24h/2h/post para la puja activa sin borrar confirmaciones ya enviadas.'],
    ['Publicar puja en web', 'Actualiza content/shared/puja-activa.yml en GitHub. GitHub Actions regenera la web.'],
    ['Publicar sin proxima puja', 'Publica estado pendiente en la web y oculta registro/donativos hasta que haya nueva puja activa.'],
    ['Generar mensaje WhatsApp', 'Envía por email el texto listo para copiar/pegar en WhatsApp.'],
    ['Programar recordatorio 2h exacto', 'Crea un activador puntual para enviar el Zoom exactamente 2 horas antes de la puja.'],
    ['Verificar activadores', 'Comprueba que no faltan activadores críticos ni hay duplicados peligrosos.'],
    ['', ''],
    ['CONTROL DE CALIDAD BLOQUEA SI', ''],
    ['Formulario', 'Falta, contiene PEGA_AQUI o no parece Google Forms.'],
    ['Stripe', 'Falta algún enlace, los enlaces son iguales, o no corresponden a individual/familia/libre.'],
    ['Zoom', 'Falta URL, ID o contraseña, o contienen PEGA_AQUI.'],
    ['GitHub', 'Falta GITHUB_TOKEN, owner, repo, branch o path YAML.'],
    ['Fecha', 'PUJA_START_ISO falta, es inválido o ya ha pasado.'],
    ['Web', 'WEB_URL falta o no pertenece a https://www.dzongpaeuropa.org.'],
    ['', ''],
    ['RECUPERACION RAPIDA', ''],
    ['GitHub token caducado', 'Crear nuevo token, pegarlo en Propiedades de script como GITHUB_TOKEN y volver a publicar.'],
    ['GitHub Actions rojo', 'Abrir Actions, revisar error. Si es permiso, activar Settings > Actions > Workflow permissions > Read and write.'],
    ['Formulario incorrecto', 'Actualizar formulario_url en Configuracion_Pujas o Pujas_Eventos y volver a publicar.'],
    ['Stripe incorrecto', 'Actualizar URLs en Configuracion_Pujas y ejecutar Control de calidad.'],
    ['Zoom incompleto', 'Actualizar zoom_url, zoom_id y zoom_passcode antes del recordatorio 2h.'],
    ['Emails no llegan', 'Revisar Logs_Automatizacion y Registro de ejecución en Apps Script.'],
    ['', ''],
    ['REGLA GENERAL', 'Si Panel_Operativo no está en OK, no publicar ni difundir.']
  ];

  sheet.clear();
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.setTabColor('#8b1a1a');
  sheet.setColumnWidth(1, 240);
  sheet.setColumnWidth(2, 760);
  sheet.getRange('A:B')
    .setFontFamily('Arial')
    .setFontSize(10)
    .setVerticalAlignment('top')
    .setWrap(true);

  sheet.getRange('A1:B1').merge()
    .setFontFamily('Georgia')
    .setFontSize(18)
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#1f3f68')
    .setHorizontalAlignment('center');

  const sectionRows = [4, 15, 26, 34, 42];
  sectionRows.forEach(function(row) {
    sheet.getRange(row, 1, 1, 2)
      .setFontWeight('bold')
      .setFontColor('#ffffff')
      .setBackground('#8b1a1a');
  });

  sheet.getRange('A:A').setFontWeight('bold');
  sheet.setFrozenRows(1);

  registrarLogAutomatizacion_('Actualizar README operativo', 'OK', 'README_OPERATIVO actualizado.', 'docs');
  Logger.log('README_OPERATIVO actualizado.');
  return 'README_OPERATIVO actualizado.';
}

function actualizarPanelOperativo() {
  const data = sincronizarConfigDesdeSheets_();
  const estado = obtenerEstadoPujaActiva_();
  const avisos = pujasValidarDatosActivos_(data);
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = ss.getSheetByName(PANEL_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(PANEL_SHEET_NAME, 0);
  }

  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).breakApart();
  sheet.clear();
  sheet.setTabColor('#1f3f68');

  sheet.getRange('A1:F1').merge()
    .setValue('Panel operativo - Dzongpa Pujas')
    .setFontFamily('Georgia')
    .setFontSize(20)
    .setFontColor('#1f3f68')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.getRange('A2:F2').merge()
    .setValue('Última actualización: ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'))
    .setFontColor('#666666')
    .setHorizontalAlignment('center');

  escribirSeccionPanel_(sheet, 4, 'Puja activa', [
    ['Estado general', avisos.length ? 'AVISOS' : 'OK'],
    ['Puja', CONFIG.PUJA_NOMBRE],
    ['Puja ID', CONFIG.PUJA_ID],
    ['Fecha', CONFIG.PUJA_FECHA],
    ['Horario', CONFIG.PUJA_HORA],
    ['Inicio ISO', CONFIG.PUJA_START_ISO]
  ]);

  escribirSeccionPanel_(sheet, 4, 'Inscripciones y emails', [
    ['Inscripciones', estado.total],
    ['Sin email', estado.sinEmail],
    ['Confirmaciones enviadas', estado.confirmacionEnviada],
    ['Confirmaciones pendientes', estado.confirmacionPendiente],
    ['Recordatorio 24h enviado', estado.rec24Enviado],
    ['Recordatorio 24h pendiente', estado.rec24Pendiente],
    ['Recordatorio 2h enviado', estado.rec2Enviado],
    ['Recordatorio 2h pendiente', estado.rec2Pendiente],
    ['Post-puja enviado', estado.postEnviado],
    ['Post-puja pendiente', estado.postPendiente]
  ], 4);

  escribirSeccionPanel_(sheet, 13, 'Enlaces clave', [
    ['Web pujas', pujasWebPujasUrl_()],
    ['Formulario', data.formulario_url || ''],
    ['Zoom URL', CONFIG.ZOOM_URL],
    ['Stripe individual', CONFIG.STRIPE_INDIVIDUAL_URL],
    ['Stripe familia', CONFIG.STRIPE_FAMILIA_URL],
    ['Stripe libre', CONFIG.STRIPE_LIBRE_URL],
    ['GitHub YAML', 'https://github.com/' + pujasScriptProperty_('GITHUB_OWNER') + '/' + pujasScriptProperty_('GITHUB_REPO') + '/blob/' + pujasScriptProperty_('GITHUB_BRANCH') + '/' + pujasGithubPath_()]
  ]);

  escribirSeccionPanel_(sheet, 13, 'Avisos críticos', avisos.length
    ? avisos.map(function(aviso) { return ['Aviso', aviso]; })
    : [['Estado', 'Sin avisos críticos.']], 4);

  const estadoActivadores = obtenerEstadoActivadores_();
  const avisosActivadores = obtenerAvisosCriticosActivadores_(estadoActivadores);
  escribirSeccionPanel_(sheet, 23, 'Automatizacion', [
    ['Formulario', estadoActivadores.counts.onFormSubmit ? 'OK' : 'FALTA'],
    ['Rescate cada 30 min', estadoActivadores.counts.ejecutarAutomatizacionPuja ? 'OK' : 'FALTA'],
    ['Recordatorio 2h exacto', estadoActivadores.exact2hRequired
      ? (estadoActivadores.counts.enviarRecordatorio2hProgramado ? 'PROGRAMADO' : 'FALTA')
      : 'No requerido ahora'],
    ['Envio 2h previsto', estadoActivadores.exact2hAtText],
    ['Resumen diario', estadoActivadores.counts.enviarResumenDiarioInscripciones ? 'OK' : 'FALTA'],
    ['Publicacion web automatica', estadoActivadores.counts.generarYPublicarPujaActivaWeb ? 'OK' : 'FALTA']
  ]);

  escribirSeccionPanel_(sheet, 23, 'Avisos de automatizacion', avisosActivadores.length
    ? avisosActivadores.map(function(aviso) { return ['Aviso', aviso]; })
    : [['Estado', 'Activadores criticos OK.']], 4);

  aplicarFormatoPanel_(sheet, avisos.length || avisosActivadores.length);
  Logger.log('Panel operativo actualizado.');
  return 'Panel_Operativo actualizado.';
}

function escribirSeccionPanel_(sheet, row, title, rows, col) {
  const startCol = col || 1;
  sheet.getRange(row, startCol, 1, 2).merge()
    .setValue(title)
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#1f3f68');

  const values = rows.map(function(item) {
    return [item[0], item[1]];
  });
  sheet.getRange(row + 1, startCol, values.length, 2).setValues(values);
}

function aplicarFormatoPanel_(sheet, hasWarnings) {
  sheet.setColumnWidth(1, 190);
  sheet.setColumnWidth(2, 430);
  sheet.setColumnWidth(3, 28);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 430);
  sheet.setColumnWidth(6, 28);

  sheet.getRange('A:F')
    .setFontFamily('Arial')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet.getRange('A5:A40').setFontWeight('bold').setFontColor('#333333');
  sheet.getRange('D5:D40').setFontWeight('bold').setFontColor('#333333');
  sheet.getRange('B5:B5').setFontWeight('bold').setFontColor(hasWarnings ? '#a11b1b' : '#1b7f3a');

  sheet.getRange('A4:B4').setBorder(true, true, true, true, true, true, '#d4a72c', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('D4:E4').setBorder(true, true, true, true, true, true, '#d4a72c', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('A13:B13').setBorder(true, true, true, true, true, true, '#d4a72c', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('D13:E13').setBorder(true, true, true, true, true, true, '#d4a72c', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('A23:B23').setBorder(true, true, true, true, true, true, '#d4a72c', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('D23:E23').setBorder(true, true, true, true, true, true, '#d4a72c', SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange('B14:B20').setFontColor('#8b1a1a');
  sheet.getRange('E14:E30').setFontColor(hasWarnings ? '#a11b1b' : '#1b7f3a');
  sheet.setFrozenRows(2);
}

function obtenerEstadoPujaActiva_() {
  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];

  const colEmail = findEmailColumn_(headers, data);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colConfirmacion = findColumn(headers, ['Estado email confirmación']);
  const col24h = findColumn(headers, ['Estado recordatorio 24h']);
  const col2h = findColumn(headers, ['Estado recordatorio 2h']);
  const colPost = findColumn(headers, ['Estado email post-puja']);
  const pujaId = normalizeSheetValue(CONFIG.PUJA_ID);

  const estado = {
    total: 0,
    sinEmail: 0,
    confirmacionEnviada: 0,
    confirmacionPendiente: 0,
    rec24Enviado: 0,
    rec24Pendiente: 0,
    rec2Enviado: 0,
    rec2Pendiente: 0,
    postEnviado: 0,
    postPendiente: 0
  };

  if (colPujaId === -1) {
    return estado;
  }

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (normalizeSheetValue(row[colPujaId]) !== pujaId) continue;

    estado.total++;

    const email = colEmail >= 0 ? String(row[colEmail] || '').trim() : '';
    if (!email) estado.sinEmail++;

    if (panelEstadoEnviado_(row, colConfirmacion)) estado.confirmacionEnviada++;
    else estado.confirmacionPendiente++;

    if (panelEstadoEnviado_(row, col24h)) estado.rec24Enviado++;
    else estado.rec24Pendiente++;

    if (panelEstadoEnviado_(row, col2h)) estado.rec2Enviado++;
    else estado.rec2Pendiente++;

    if (panelEstadoEnviado_(row, colPost)) estado.postEnviado++;
    else estado.postPendiente++;
  }

  return estado;
}

function panelEstadoEnviado_(row, col) {
  if (col < 0) return false;
  return String(row[col] || '').trim() === 'Enviado';
}

function instalarActivadorAutomatizacionPuja_() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'ejecutarAutomatizacionPuja') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('ejecutarAutomatizacionPuja')
    .timeBased()
    .everyMinutes(30)
    .create();

  Logger.log('Activador de rescate cada 30 minutos instalado para ejecutarAutomatizacionPuja.');
}

function programarRecordatorio2hExacto() {
  return programarRecordatorio2hExacto_();
}

function programarRecordatorio2hExacto_() {
  sincronizarConfigDesdeSheets_();
  validarConfigAutomatizacion_();
  borrarActivadoresPorFuncion_('enviarRecordatorio2hProgramado');

  const start = new Date(CONFIG.PUJA_START_ISO);
  const now = new Date();
  const runAt = new Date(start.getTime() - 2 * 60 * 60 * 1000);

  let resumen = '';

  if (start.getTime() <= now.getTime()) {
    resumen =
      'No se programa recordatorio 2h: la puja ya ha empezado o ya ha pasado.\n' +
      'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
      'puja_id: ' + CONFIG.PUJA_ID + '\n' +
      'Inicio: ' + formatearFechaHoraOperativa_(start);
    Logger.log(resumen);
    registrarLogAutomatizacion_('Programar recordatorio 2h exacto', 'AVISO', resumen, 'trigger');
    return resumen;
  }

  if (runAt.getTime() <= now.getTime()) {
    resumen =
      'La ventana de 2h ya esta abierta. Se envian pendientes ahora.\n' +
      'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
      'puja_id: ' + CONFIG.PUJA_ID + '\n' +
      'Inicio: ' + formatearFechaHoraOperativa_(start);

    if (hayPendientesParaPuja_('Estado recordatorio 2h')) {
      enviarRecordatorio2h();
    } else {
      resumen += '\nPendientes: 0';
    }

    Logger.log(resumen);
    registrarLogAutomatizacion_('Programar recordatorio 2h exacto', 'OK', resumen, 'trigger');
    return resumen;
  }

  ScriptApp.newTrigger('enviarRecordatorio2hProgramado')
    .timeBased()
    .at(runAt)
    .create();

  resumen =
    'Recordatorio 2h exacto programado.\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Inicio: ' + formatearFechaHoraOperativa_(start) + '\n' +
    'Envio Zoom: ' + formatearFechaHoraOperativa_(runAt);

  Logger.log(resumen);
  registrarLogAutomatizacion_('Programar recordatorio 2h exacto', 'OK', resumen, 'trigger');
  return resumen;
}

function enviarRecordatorio2hProgramado() {
  sincronizarConfigDesdeSheets_();
  validarConfigAutomatizacion_();

  let resumen = 'Recordatorio 2h programado ejecutado.\nPuja: ' + CONFIG.PUJA_NOMBRE + '\npuja_id: ' + CONFIG.PUJA_ID;

  if (hayPendientesParaPuja_('Estado recordatorio 2h')) {
    enviarRecordatorio2h();
    resumen += '\nResultado: pendientes enviados.';
  } else {
    resumen += '\nResultado: no habia pendientes.';
  }

  actualizarPanelOperativo();
  registrarLogAutomatizacion_('Recordatorio 2h programado', 'OK', resumen, 'trigger');
  Logger.log(resumen);
  return resumen;
}

function borrarActivadoresPorFuncion_(handlerName) {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === handlerName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

function horasHastaPuja_() {
  const start = new Date(CONFIG.PUJA_START_ISO);
  if (isNaN(start.getTime())) {
    throw new Error('CONFIG.PUJA_START_ISO no es una fecha valida.');
  }

  return (start.getTime() - new Date().getTime()) / (1000 * 60 * 60);
}

function zoomConfigCompleta_() {
  return Boolean(
    CONFIG.ZOOM_URL &&
    CONFIG.ZOOM_ID &&
    CONFIG.ZOOM_PASSCODE &&
    String(CONFIG.ZOOM_URL).indexOf('PEGA_AQUI') === -1 &&
    String(CONFIG.ZOOM_ID).indexOf('PEGA_AQUI') === -1 &&
    String(CONFIG.ZOOM_PASSCODE).indexOf('PEGA_AQUI') === -1
  );
}

function formatearFechaHoraOperativa_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

function verificarActivadoresAutomatizacion() {
  return verificarActivadoresAutomatizacion_();
}

function verificarActivadoresAutomatizacion_() {
  sincronizarConfigDesdeSheets_();
  const estado = obtenerEstadoActivadores_();
  const avisos = obtenerAvisosCriticosActivadores_(estado);
  const resumen =
    'VERIFICACION ACTIVADORES PUJA\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Inicio puja: ' + estado.pujaStartText + '\n' +
    'Envio 2h previsto: ' + estado.exact2hAtText + '\n\n' +
    'ACTIVADORES\n' +
    '- onFormSubmit: ' + estado.counts.onFormSubmit + '\n' +
    '- ejecutarAutomatizacionPuja: ' + estado.counts.ejecutarAutomatizacionPuja + '\n' +
    '- enviarRecordatorio2hProgramado: ' + estado.counts.enviarRecordatorio2hProgramado + '\n' +
    '- enviarResumenDiarioInscripciones: ' + estado.counts.enviarResumenDiarioInscripciones + '\n' +
    '- generarYPublicarPujaActivaWeb: ' + estado.counts.generarYPublicarPujaActivaWeb + '\n\n' +
    'RESULTADO: ' + (avisos.length ? 'BLOQUEADO' : 'OK') + '\n\n' +
    'AVISOS CRITICOS\n' +
    (avisos.length ? avisos.map(function(aviso) { return '- ' + aviso; }).join('\n') : 'Sin avisos criticos.');

  Logger.log(resumen);
  registrarLogAutomatizacion_('Verificar activadores', avisos.length ? 'ERROR' : 'OK', resumen, 'trigger');

  if (avisos.length) {
    GmailApp.sendEmail(
      CONFIG.ADMIN_EMAIL,
      'Activadores BLOQUEADOS - ' + CONFIG.PUJA_NOMBRE,
      resumen,
      {
        name: CONFIG.ORG_NAME,
        replyTo: CONFIG.REPLY_TO
      }
    );
    throw new Error(resumen);
  }

  return resumen;
}

function obtenerEstadoActivadores_() {
  const triggers = ScriptApp.getProjectTriggers();
  const counts = {
    onFormSubmit: 0,
    ejecutarAutomatizacionPuja: 0,
    enviarRecordatorio2hProgramado: 0,
    enviarResumenDiarioInscripciones: 0,
    generarYPublicarPujaActivaWeb: 0
  };

  triggers.forEach(function(trigger) {
    const handler = trigger.getHandlerFunction();
    if (counts[handler] === undefined) counts[handler] = 0;
    counts[handler]++;
  });

  const now = new Date();
  const start = new Date(CONFIG.PUJA_START_ISO);
  const startValid = !isNaN(start.getTime());
  const exact2hAt = startValid ? new Date(start.getTime() - 2 * 60 * 60 * 1000) : null;
  const exact2hRequired = Boolean(startValid && exact2hAt.getTime() > now.getTime());

  return {
    counts: counts,
    total: triggers.length,
    exact2hRequired: exact2hRequired,
    pujaStartText: startValid ? formatearFechaHoraOperativa_(start) : 'Fecha invalida',
    exact2hAtText: exact2hAt ? formatearFechaHoraOperativa_(exact2hAt) : 'No calculable'
  };
}

function obtenerAvisosCriticosActivadores_(estado) {
  const avisos = [];
  const counts = estado.counts || {};

  if (!counts.onFormSubmit) {
    avisos.push('Falta activador onFormSubmit: las inscripciones no enviaran confirmacion automatica.');
  }
  if (counts.onFormSubmit > 1) {
    avisos.push('Hay mas de un activador onFormSubmit: riesgo de emails duplicados.');
  }
  if (!counts.ejecutarAutomatizacionPuja) {
    avisos.push('Falta activador ejecutarAutomatizacionPuja: no habra rescate 24h/2h/post-puja.');
  }
  if (counts.ejecutarAutomatizacionPuja > 1) {
    avisos.push('Hay mas de un activador ejecutarAutomatizacionPuja: riesgo de ejecuciones duplicadas.');
  }
  if (estado.exact2hRequired && !counts.enviarRecordatorio2hProgramado) {
    avisos.push('Falta activador exacto enviarRecordatorio2hProgramado para el envio Zoom 2h.');
  }
  if (counts.enviarRecordatorio2hProgramado > 1) {
    avisos.push('Hay mas de un activador exacto de 2h: riesgo de doble ejecucion.');
  }

  return avisos;
}

function hayPendientesParaPuja_(estadoHeader) {
  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) return false;

  const headers = data[0];

  const colEmail = findEmailColumn_(headers, data);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colEstado = ensureColumn(sheet, headers, estadoHeader);

  if (colEmail === -1) throw new Error('No encuentro la columna de email.');
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  const configPujaId = normalizeSheetValue(CONFIG.PUJA_ID);

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email = String(row[colEmail] || '').trim();
    const pujaId = normalizeSheetValue(row[colPujaId]);
    const estado = String(row[colEstado] || '').trim();

    if (email && pujaId === configPujaId && estado !== 'Enviado') {
      return true;
    }
  }

  return false;
}

function validarConfigAutomatizacion_() {
  if (!CONFIG.PUJA_START_ISO) {
    throw new Error('Falta CONFIG.PUJA_START_ISO.');
  }

  const start = new Date(CONFIG.PUJA_START_ISO);
  if (isNaN(start.getTime())) {
    throw new Error('CONFIG.PUJA_START_ISO no es una fecha válida.');
  }

  if (!CONFIG.PUJA_ID) {
    throw new Error('Falta CONFIG.PUJA_ID.');
  }

  if (!CONFIG.ZOOM_URL || CONFIG.ZOOM_URL.indexOf('PEGA_AQUI') !== -1) {
    Logger.log('Aviso: ZOOM_URL parece no estar configurado.');
  }
}
function panelControlPuja() {
  sincronizarConfigDesdeSheets_();
  validarConfigAutomatizacion_();

  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    Logger.log('No hay inscripciones registradas.');
    return;
  }

  const headers = data[0];

  const colEmail = findEmailColumn_(headers, data);
  const colNombre = findColumn(headers, ['Nombre completo', 'Nombre']);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colConfirmacion = ensureColumn(sheet, headers, 'Estado email confirmación');
  const col24h = ensureColumn(sheet, headers, 'Estado recordatorio 24h');
  const col2h = ensureColumn(sheet, headers, 'Estado recordatorio 2h');
  const colPost = ensureColumn(sheet, headers, 'Estado email post-puja');

  if (colEmail === -1) throw new Error('No encuentro la columna de email.');
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  const pujaId = normalizeSheetValue(CONFIG.PUJA_ID);
  const start = new Date(CONFIG.PUJA_START_ISO);
  const now = new Date();
  const diffHours = (start.getTime() - now.getTime()) / (1000 * 60 * 60);

  let total = 0;
  let sinEmail = 0;
  let confirmacionEnviada = 0;
  let confirmacionPendiente = 0;
  let rec24Enviado = 0;
  let rec24Pendiente = 0;
  let rec2Enviado = 0;
  let rec2Pendiente = 0;
  let postEnviado = 0;
  let postPendiente = 0;

  const detalle = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const rowPujaId = normalizeSheetValue(row[colPujaId]);
    if (rowPujaId !== pujaId) continue;

    total++;

    const email = String(row[colEmail] || '').trim();
    const nombre = colNombre >= 0 ? String(row[colNombre] || '').trim() : '';

    const estadoConfirmacion = String(row[colConfirmacion] || '').trim();
    const estado24 = String(row[col24h] || '').trim();
    const estado2 = String(row[col2h] || '').trim();
    const estadoPost = String(row[colPost] || '').trim();

    if (!email) sinEmail++;

    if (estadoConfirmacion === 'Enviado') confirmacionEnviada++;
    else confirmacionPendiente++;

    if (estado24 === 'Enviado') rec24Enviado++;
    else rec24Pendiente++;

    if (estado2 === 'Enviado') rec2Enviado++;
    else rec2Pendiente++;

    if (estadoPost === 'Enviado') postEnviado++;
    else postPendiente++;

    detalle.push(
      'Fila ' + (i + 1) +
      ' | ' + (nombre || 'sin nombre') +
      ' | ' + (email || 'sin email') +
      ' | confirmación: ' + (estadoConfirmacion || 'pendiente') +
      ' | 24h: ' + (estado24 || 'pendiente') +
      ' | 2h: ' + (estado2 || 'pendiente') +
      ' | post: ' + (estadoPost || 'pendiente')
    );
  }

  let avisos = [];

  if (!CONFIG.ZOOM_URL || CONFIG.ZOOM_URL.indexOf('PEGA_AQUI') !== -1) {
    avisos.push('Zoom URL no configurado.');
  }

  if (!CONFIG.ZOOM_ID || CONFIG.ZOOM_ID.indexOf('PEGA_AQUI') !== -1) {
    avisos.push('Zoom ID no configurado.');
  }

  if (!CONFIG.ZOOM_PASSCODE || CONFIG.ZOOM_PASSCODE.indexOf('PEGA_AQUI') !== -1) {
    avisos.push('Zoom passcode no configurado.');
  }

  if (!CONFIG.STRIPE_INDIVIDUAL_URL || !CONFIG.STRIPE_FAMILIA_URL || !CONFIG.STRIPE_LIBRE_URL) {
    avisos.push('Faltan enlaces Stripe.');
  }

  const resumen =
    'PANEL DE CONTROL PUJA\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n' +
    'Hora: ' + CONFIG.PUJA_HORA + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'PUJA_START_ISO: ' + CONFIG.PUJA_START_ISO + '\n' +
    'Horas restantes: ' + diffHours.toFixed(2) + '\n\n' +

    'INSCRIPCIONES\n' +
    'Total para esta puja: ' + total + '\n' +
    'Sin email: ' + sinEmail + '\n\n' +

    'ESTADOS\n' +
    'Confirmaciones enviadas: ' + confirmacionEnviada + '\n' +
    'Confirmaciones pendientes: ' + confirmacionPendiente + '\n' +
    'Recordatorio 24h enviado: ' + rec24Enviado + '\n' +
    'Recordatorio 24h pendiente: ' + rec24Pendiente + '\n' +
    'Recordatorio 2h enviado: ' + rec2Enviado + '\n' +
    'Recordatorio 2h pendiente: ' + rec2Pendiente + '\n' +
    'Post-puja enviado: ' + postEnviado + '\n' +
    'Post-puja pendiente: ' + postPendiente + '\n\n' +

    'AVISOS\n' +
    (avisos.length ? avisos.join('\n') : 'Sin avisos críticos.') + '\n\n' +

    'DETALLE\n' +
    (detalle.length ? detalle.join('\n') : 'Sin registros para esta puja.');

  Logger.log(resumen);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Panel de control puja - ' + CONFIG.PUJA_NOMBRE,
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}

function validarPujaActiva() {
  const data = sincronizarConfigDesdeSheets_();
  const sheet = getResponsesSheet_();
  const values = sheet.getDataRange().getValues();
  const headers = values[0] || [];

  const colEmail = findEmailColumn_(headers, data);
  const colPujaId = findColumn(headers, ['puja_id']);

  const pujaId = normalizeSheetValue(CONFIG.PUJA_ID);
  let total = 0;
  let sinEmail = 0;

  if (colPujaId >= 0) {
    for (let i = 1; i < values.length; i++) {
      const rowPujaId = normalizeSheetValue(values[i][colPujaId]);
      if (rowPujaId !== pujaId) continue;

      total++;
      const email = colEmail >= 0 ? String(values[i][colEmail] || '').trim() : '';
      if (!email) sinEmail++;
    }
  }

  const avisos = pujasValidarDatosActivos_(data);
  const resumen =
    'VALIDACIÓN PUJA ACTIVA\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n' +
    'Hora: ' + CONFIG.PUJA_HORA + '\n' +
    'Inicio ISO: ' + CONFIG.PUJA_START_ISO + '\n\n' +
    'Zoom URL: ' + CONFIG.ZOOM_URL + '\n' +
    'Zoom ID: ' + CONFIG.ZOOM_ID + '\n' +
    'Zoom passcode: ' + CONFIG.ZOOM_PASSCODE + '\n\n' +
    'Stripe individual: ' + CONFIG.STRIPE_INDIVIDUAL_URL + '\n' +
    'Stripe familia: ' + CONFIG.STRIPE_FAMILIA_URL + '\n' +
    'Stripe libre: ' + CONFIG.STRIPE_LIBRE_URL + '\n\n' +
    'Formulario: ' + (data.formulario_url || 'Sin formulario') + '\n' +
    'Web: ' + CONFIG.WEB_URL + '\n\n' +
    'Inscripciones para esta puja: ' + total + '\n' +
    'Inscripciones sin email: ' + sinEmail + '\n\n' +
    'AVISOS\n' +
    (avisos.length ? avisos.join('\n') : 'Sin avisos críticos.');

  Logger.log(resumen);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Validación puja activa - ' + CONFIG.PUJA_NOMBRE,
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}

function prepararPujaActiva() {
  const data = sincronizarConfigDesdeSheets_();
  const avisos = pujasValidarDatosActivos_(data);

  if (avisos.length) {
    throw new Error('No se prepara la puja porque hay avisos críticos:\n' + avisos.join('\n'));
  }

  const sheet = getResponsesSheet_();
  const values = sheet.getDataRange().getValues();
  const headers = values[0] || [];

  const colPujaId = findColumn(headers, ['puja_id']);
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  const colConfirmacion = ensureColumn(sheet, headers, 'Estado email confirmación');
  const colFechaConfirmacion = ensureColumn(sheet, headers, 'Fecha email confirmación');
  const colNotas = ensureColumn(sheet, headers, 'Notas internas');
  const col24h = ensureColumn(sheet, headers, 'Estado recordatorio 24h');
  const col2h = ensureColumn(sheet, headers, 'Estado recordatorio 2h');
  const colPost = ensureColumn(sheet, headers, 'Estado email post-puja');

  const pujaId = normalizeSheetValue(CONFIG.PUJA_ID);
  const colsToClear = [
    col24h,
    col2h,
    colPost
  ];

  let filasPreparadas = 0;

  for (let i = 1; i < values.length; i++) {
    const rowPujaId = normalizeSheetValue(values[i][colPujaId]);
    if (rowPujaId !== pujaId) continue;

    colsToClear.forEach(function(col) {
      sheet.getRange(i + 1, col + 1).clearContent();
    });

    if (!values[i][colConfirmacion]) {
      sheet.getRange(i + 1, colConfirmacion + 1).setValue('');
    }

    if (!values[i][colFechaConfirmacion]) {
      sheet.getRange(i + 1, colFechaConfirmacion + 1).setValue('');
    }

    sheet.getRange(i + 1, colNotas + 1).setValue('Preparada el ' + new Date());
    filasPreparadas++;
  }

  const resumen =
    'PUJA ACTIVA PREPARADA\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Filas preparadas: ' + filasPreparadas + '\n\n' +
    'Se han limpiado estos estados para la puja activa:\n' +
    '- Estado recordatorio 24h\n' +
    '- Estado recordatorio 2h\n' +
    '- Estado email post-puja\n\n' +
    'No se han borrado confirmaciones ya enviadas.';

  Logger.log(resumen);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Puja activa preparada - ' + CONFIG.PUJA_NOMBRE,
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}

function enviarResumenDiarioInscripciones() {
  const dataPuja = sincronizarConfigDesdeSheets_();
  const sheet = getResponsesSheet_();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    Logger.log('No hay inscripciones para resumir.');
    return;
  }

  const headers = data[0];
  const colFecha = findColumn(headers, ['Marca temporal', 'Timestamp']);
  const colEmail = findEmailColumn_(headers, data);
  const colNombre = findColumn(headers, ['Nombre completo', 'Nombre']);
  const colPujaId = findColumn(headers, ['puja_id']);
  const colParticipacion = findColumn(headers, ['¿Participas como...?', 'Participas como', 'Tipo de inscripción']);
  const colIdioma = findColumn(headers, ['Idioma preferido', 'Idioma']);
  const colObservaciones = findColumn(headers, [
    'Observaciones o preguntas',
    'Observaciones',
    'Observaciones o preguntas '
  ]);
  const colConfirmacion = findColumn(headers, ['Estado email confirmación']);
  const col24h = findColumn(headers, ['Estado recordatorio 24h']);
  const col2h = findColumn(headers, ['Estado recordatorio 2h']);
  const colPost = findColumn(headers, ['Estado email post-puja']);

  if (colEmail === -1) throw new Error('No encuentro la columna de email.');
  if (colPujaId === -1) throw new Error('No encuentro la columna puja_id.');

  const pujaId = normalizeSheetValue(CONFIG.PUJA_ID);
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  let total = 0;
  let sinEmail = 0;
  let nuevos24h = 0;
  let confirmados = 0;
  let confirmacionPendiente = 0;
  let rec24Enviado = 0;
  let rec2Enviado = 0;
  let postEnviado = 0;

  const porTipo = {};
  const porIdioma = {};
  const emailCounts = {};
  const nuevosDetalle = [];
  const observaciones = [];
  const incidencias = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowPujaId = normalizeSheetValue(row[colPujaId]);
    if (rowPujaId !== pujaId) continue;

    total++;

    const fila = i + 1;
    const email = String(row[colEmail] || '').trim();
    const emailKey = email.toLowerCase();
    const nombre = colNombre >= 0 ? String(row[colNombre] || '').trim() : '';
    const participacion = colParticipacion >= 0 ? String(row[colParticipacion] || '').trim() : '';
    const idioma = colIdioma >= 0 ? String(row[colIdioma] || '').trim() : '';
    const obs = colObservaciones >= 0 ? String(row[colObservaciones] || '').trim() : '';
    const fecha = colFecha >= 0 ? pujasParseDate_(row[colFecha]) : null;
    const estadoConfirmacion = colConfirmacion >= 0 ? String(row[colConfirmacion] || '').trim() : '';
    const estado24 = col24h >= 0 ? String(row[col24h] || '').trim() : '';
    const estado2 = col2h >= 0 ? String(row[col2h] || '').trim() : '';
    const estadoPost = colPost >= 0 ? String(row[colPost] || '').trim() : '';

    if (!email) {
      sinEmail++;
      incidencias.push('Fila ' + fila + ': sin email.');
    } else {
      emailCounts[emailKey] = (emailCounts[emailKey] || 0) + 1;
    }

    if (participacion) porTipo[participacion] = (porTipo[participacion] || 0) + 1;
    if (idioma) porIdioma[idioma] = (porIdioma[idioma] || 0) + 1;

    if (estadoConfirmacion === 'Enviado') confirmados++;
    else confirmacionPendiente++;

    if (estado24 === 'Enviado') rec24Enviado++;
    if (estado2 === 'Enviado') rec2Enviado++;
    if (estadoPost === 'Enviado') postEnviado++;

    if (fecha && fecha.getTime() >= cutoff.getTime()) {
      nuevos24h++;
      nuevosDetalle.push(
        'Fila ' + fila + ' | ' +
        (nombre || 'sin nombre') + ' | ' +
        (email || 'sin email') + ' | ' +
        (participacion || 'sin tipo') + ' | ' +
        (idioma || 'sin idioma')
      );
    }

    if (obs) {
      observaciones.push(
        'Fila ' + fila + ' | ' +
        (nombre || 'sin nombre') + ' | ' +
        (email || 'sin email') + ': ' + obs
      );
    }
  }

  const duplicados = Object.keys(emailCounts).filter(function(email) {
    return emailCounts[email] > 1;
  });

  duplicados.forEach(function(email) {
    incidencias.push('Email duplicado: ' + email + ' (' + emailCounts[email] + ' filas).');
  });

  const resumen =
    'RESUMEN DIARIO DE INSCRIPCIONES\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Fecha: ' + CONFIG.PUJA_FECHA + '\n' +
    'Hora: ' + CONFIG.PUJA_HORA + '\n\n' +

    'INSCRIPCIONES\n' +
    'Total para esta puja: ' + total + '\n' +
    'Nuevas últimas 24h: ' + nuevos24h + '\n' +
    'Sin email: ' + sinEmail + '\n' +
    'Emails duplicados: ' + duplicados.length + '\n\n' +

    'ESTADOS\n' +
    'Confirmaciones enviadas: ' + confirmados + '\n' +
    'Confirmaciones pendientes: ' + confirmacionPendiente + '\n' +
    'Recordatorio 24h enviado: ' + rec24Enviado + '\n' +
    'Recordatorio 2h enviado: ' + rec2Enviado + '\n' +
    'Post-puja enviado: ' + postEnviado + '\n\n' +

    'POR TIPO DE PARTICIPACIÓN\n' +
    pujasFormatCounts_(porTipo) + '\n\n' +

    'POR IDIOMA\n' +
    pujasFormatCounts_(porIdioma) + '\n\n' +

    'NUEVAS ÚLTIMAS 24H\n' +
    (nuevosDetalle.length ? nuevosDetalle.join('\n') : 'Ninguna') + '\n\n' +

    'OBSERVACIONES\n' +
    (observaciones.length ? observaciones.join('\n') : 'Sin observaciones') + '\n\n' +

    'INCIDENCIAS\n' +
    (incidencias.length ? incidencias.join('\n') : 'Sin incidencias detectadas') + '\n\n' +

    'Fuente activa: ' + (dataPuja.puja_key || 'sin puja_key');

  Logger.log(resumen);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Resumen diario inscripciones - ' + CONFIG.PUJA_NOMBRE,
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}

function instalarResumenDiarioInscripciones() {
  instalarResumenDiarioInscripciones_();
}

function instalarResumenDiarioInscripciones_() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'enviarResumenDiarioInscripciones') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('enviarResumenDiarioInscripciones')
    .timeBased()
    .everyDays(1)
    .atHour(20)
    .create();

  Logger.log('Activador diario instalado para enviarResumenDiarioInscripciones a las 20:00 aprox.');
}

function testLecturaPujaActivaDesdeSheets() {
  const data = leerPujaActivaCompleta_();
  Logger.log(JSON.stringify(data, null, 2));

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Test lectura puja activa desde Sheets',
    JSON.stringify(data, null, 2),
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}

function sincronizarConfigDesdeSheets_() {
  const data = leerPujaActivaCompleta_();

  CONFIG.PUJA_ID = data.puja_id || CONFIG.PUJA_ID;
  CONFIG.PUJA_NOMBRE = data.nombre_es || CONFIG.PUJA_NOMBRE;
  CONFIG.PUJA_FECHA = data.fecha_texto_es || pujasFormatFechaSpanish_(data.fecha) || CONFIG.PUJA_FECHA;
  CONFIG.PUJA_HORA = data.horario_completo || [data.hora_es_con_zona, data.hora_tw_con_zona].filter(Boolean).join(' - ') || CONFIG.PUJA_HORA;
  CONFIG.PUJA_START_ISO = data.start_iso || CONFIG.PUJA_START_ISO;

  CONFIG.ZOOM_URL = pujasText_(data.zoom_url) || CONFIG.ZOOM_URL;
  CONFIG.ZOOM_ID = pujasText_(data.zoom_id) || CONFIG.ZOOM_ID;
  CONFIG.ZOOM_PASSCODE = pujasText_(data.zoom_passcode) || CONFIG.ZOOM_PASSCODE;

  CONFIG.STRIPE_INDIVIDUAL_URL = pujasText_(data.stripe_individual_url) || CONFIG.STRIPE_INDIVIDUAL_URL;
  CONFIG.STRIPE_FAMILIA_URL = pujasText_(data.stripe_familia_url) || CONFIG.STRIPE_FAMILIA_URL;
  CONFIG.STRIPE_LIBRE_URL = pujasText_(data.stripe_libre_url) || CONFIG.STRIPE_LIBRE_URL;

  CONFIG.WEB_URL = pujasText_(data.web_url) || CONFIG.WEB_URL;

  CONFIG.PUJA_DESCRIPCION_CORTA = data.descripcion_corta_es || '';
  CONFIG.PUJA_BENEFICIOS = data.beneficios_es || '';
  CONFIG.PUJA_TEXTO_WHATSAPP = data.texto_whatsapp_es || '';
  CONFIG.PUJA_TEXTO_EMAIL = data.texto_email_es || '';

  return data;
}

function leerPujaActivaCompleta_() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);

  const eventosSheet = pujasFindSheet_(ss, [
    'Pujas_Eventos',
    'Pujas Eventos',
    'Eventos_Pujas',
    'Eventos Pujas'
  ]);
  const catalogoSheet = pujasFindSheet_(ss, [
    'Catalogo_Pujas',
    'Catálogo_Pujas',
    'Catalogo Pujas',
    'Catálogo Pujas',
    'Catalogo',
    'Catálogo'
  ]);
  const plantillasSheet = pujasFindSheet_(ss, [
    'Plantillas_Mensajes',
    'Plantillas Mensajes',
    'Plantillas'
  ]);
  const configSheet = pujasFindSheet_(ss, [
    'Configuracion_Pujas',
    'Configuración_Pujas',
    'Configuracion Pujas',
    'Configuración Pujas'
  ]);

  if (!eventosSheet) throw new Error('No existe la hoja Pujas_Eventos. Hojas disponibles: ' + pujasListSheetNames_(ss));
  if (!catalogoSheet) throw new Error('No existe la hoja Catalogo_Pujas. Hojas disponibles: ' + pujasListSheetNames_(ss));

  const eventos = pujasGetSheetObjects_(eventosSheet);
  const catalogo = pujasGetSheetObjects_(catalogoSheet);
  const plantillas = plantillasSheet ? pujasGetSheetObjects_(plantillasSheet) : [];
  const config = configSheet ? pujasGetConfigMap_(configSheet) : {};

  const evento = eventos.find(function(row) {
    return String(row.estado || '').trim().toLowerCase() === 'activa';
  });

  if (!evento) {
    throw new Error('No hay ninguna fila activa en Pujas_Eventos.');
  }

  const pujaKey = String(evento.puja_key || '').trim();
  if (!pujaKey) {
    throw new Error('La fila activa de Pujas_Eventos no tiene puja_key.');
  }

  const ficha = catalogo.find(function(row) {
    return String(row.puja_key || '').trim() === pujaKey;
  });

  if (!ficha) {
    throw new Error('No encuentro puja_key en Catalogo_Pujas: ' + pujaKey);
  }

  const data = Object.assign({}, config, ficha, evento);
  data.plantillas = plantillas;
  pujasEnrichHorario_(data);
  return data;
}

function generarMensajeWhatsAppPuja() {
  const data = sincronizarConfigDesdeSheets_();

  let template = '';
  if (data.plantillas && data.plantillas.length) {
    const row = data.plantillas.find(function(item) {
      return String(item.tipo || '').trim() === 'whatsapp_anuncio' &&
             String(item.idioma || '').trim() === 'es';
    });
    if (row) template = row.plantilla || '';
  }

  if (!template) {
    template =
      'Puja semanal Dzongpa Europa\n\n' +
      'Este sábado, S. Em.ª Gongkar Dorje Dhenpa Rinpoche guiará:\n\n' +
      '{{nombre_es}}\n\n' +
      'Horario:\n' +
      'España: {{hora_es}}\n' +
      'Taiwán: {{hora_tw}}\n\n' +
      'Registro previo:\n{{formulario_url}}\n\n' +
      'Donativo sugerido:\n8 EUR individual - 15 EUR familia - donativo libre\n\n' +
      'Más información:\n{{web_url}}';
  }

  const message = pujasMergeTemplate_(template, data);

  Logger.log(message);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Mensaje WhatsApp listo - ' + (data.nombre_es || CONFIG.PUJA_NOMBRE),
    message,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  return message;
}

function generarYamlPujaActivaWeb() {
  const data = sincronizarConfigDesdeSheets_();
  const yaml = construirYamlPujaActivaWeb_(data);

  Logger.log(yaml);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'YAML web puja activa - ' + CONFIG.PUJA_NOMBRE,
    yaml,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  return yaml;
}

function publicarYamlPujaActivaEnGitHub() {
  const data = sincronizarConfigDesdeSheets_();
  const yaml = construirYamlPujaActivaWeb_(data);
  const result = githubPublicarArchivo_(
    pujasGithubPath_(),
    yaml,
    'Actualiza puja activa web ' + CONFIG.PUJA_ID
  );

  const resumen =
    'PUBLICACION WEB PUJA ACTIVA\n\n' +
    'Puja: ' + CONFIG.PUJA_NOMBRE + '\n' +
    'puja_id: ' + CONFIG.PUJA_ID + '\n' +
    'Archivo: ' + pujasGithubPath_() + '\n' +
    'Estado: ' + result.status + '\n' +
    (result.url ? 'URL commit/archivo: ' + result.url + '\n' : '') +
    (result.message ? 'Detalle: ' + result.message + '\n' : '');

  Logger.log(resumen);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Publicacion web puja activa - ' + CONFIG.PUJA_NOMBRE,
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  return result;
}

function publicarSinProximaPujaEnGitHub() {
  const yaml = construirYamlSinProximaPujaWeb_();
  const result = githubPublicarArchivo_(
    pujasGithubPath_(),
    yaml,
    'Publica estado sin proxima puja'
  );

  const resumen =
    'PUBLICACION WEB SIN PROXIMA PUJA\n\n' +
    'Archivo: ' + pujasGithubPath_() + '\n' +
    'Estado: ' + result.status + '\n' +
    (result.url ? 'URL commit/archivo: ' + result.url + '\n' : '') +
    (result.message ? 'Detalle: ' + result.message + '\n' : '');

  Logger.log(resumen);

  GmailApp.sendEmail(
    CONFIG.ADMIN_EMAIL,
    'Web actualizada: sin proxima puja confirmada',
    resumen,
    {
      name: CONFIG.ORG_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );

  return result;
}

function generarYPublicarPujaActivaWeb() {
  const token = pujasGithubToken_();

  if (!token) {
    const data = sincronizarConfigDesdeSheets_();
    const yaml = construirYamlPujaActivaWeb_(data);
    Logger.log('No hay GITHUB_TOKEN configurado. Publicación web omitida. Ejecuta generarYamlPujaActivaWeb() si quieres recibir el YAML por email.');
    return {
      status: 'omitido',
      message: 'No hay GITHUB_TOKEN configurado. No se publica ni se envía email automático.',
      yaml: yaml
    };
  }

  return publicarYamlPujaActivaEnGitHub();
}

function instalarPublicacionWebAutomatica() {
  instalarPublicacionWebAutomatica_();
}

function configurarPublicacionGitHubDzongpa() {
  PropertiesService.getScriptProperties().setProperties({
    GITHUB_OWNER: 'ngawangchoenyi',
    GITHUB_REPO: 'dzongpaeuropa-web-v2',
    GITHUB_BRANCH: 'main',
    GITHUB_WEB_PUJA_PATH: 'content/shared/puja-activa.yml'
  }, false);

  Logger.log('Configuracion GitHub guardada. Falta añadir GITHUB_TOKEN en Propiedades de secuencia de comandos.');
}

function instalarPublicacionWebAutomatica_() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'generarYPublicarPujaActivaWeb') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('generarYPublicarPujaActivaWeb')
    .timeBased()
    .everyDays(1)
    .atHour(7)
    .create();

  Logger.log('Activador diario instalado para generarYPublicarPujaActivaWeb.');
}

function construirYamlPujaActivaWeb_(data) {
  const formUrl = pujasText_(data.formulario_url) || 'https://docs.google.com/forms/d/e/1FAIpQLSfGSGeSLLvUDO2t9Xb6vNucPppjzrWeug3ObdQ3mJNF7veK4A/viewform';
  const webUrl = pujasText_(data.web_url) || 'https://www.dzongpaeuropa.org/pujas-semanales';
  const stripeIndividual = pujasText_(data.stripe_individual_url) || CONFIG.STRIPE_INDIVIDUAL_URL;
  const stripeFamilia = pujasText_(data.stripe_familia_url) || CONFIG.STRIPE_FAMILIA_URL;
  const stripeLibre = pujasText_(data.stripe_libre_url) || CONFIG.STRIPE_LIBRE_URL;
  const pujaKey = pujasText_(data.puja_key);
  const catalogRefs = pujasCatalogRefs_(data);

  const lines = [
    'active_puja:',
    '  enabled: true',
    '  puja_id: ' + pujasYamlQuote_(CONFIG.PUJA_ID)
  ];

  if (pujaKey) {
    lines.push('  puja_key: ' + pujasYamlQuote_(pujaKey));
  }

  if (catalogRefs.length) {
    lines.push('  catalog_refs:');
    catalogRefs.forEach(function(ref) {
      lines.push('    - ' + pujasYamlQuote_(ref));
    });
  }

  lines.push(
    '  form_url: ' + pujasYamlQuote_(formUrl),
    '  web_url: ' + pujasYamlQuote_(webUrl),
    '  stripe:',
    '    individual:',
    '      es: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeIndividual, 'es')),
    '      en: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeIndividual, 'en')),
    '      fr: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeIndividual, 'fr')),
    '      de: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeIndividual, 'de')),
    '      zh: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeIndividual, 'zh')),
    '    family:',
    '      es: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeFamilia, 'es')),
    '      en: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeFamilia, 'en')),
    '      fr: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeFamilia, 'fr')),
    '      de: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeFamilia, 'de')),
    '      zh: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeFamilia, 'zh')),
    '    free:',
    '      es: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeLibre, 'es')),
    '      en: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeLibre, 'en')),
    '      fr: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeLibre, 'fr')),
    '      de: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeLibre, 'de')),
    '      zh: ' + pujasYamlQuote_(pujasUrlConLocale_(stripeLibre, 'zh')),
    '  name:',
    '    es: ' + pujasYamlQuote_(pujasI18n_(data, 'nombre', 'es', CONFIG.PUJA_NOMBRE)),
    '    en: ' + pujasYamlQuote_(pujasI18n_(data, 'nombre', 'en', CONFIG.PUJA_NOMBRE)),
    '    fr: ' + pujasYamlQuote_(pujasI18n_(data, 'nombre', 'fr', CONFIG.PUJA_NOMBRE)),
    '    de: ' + pujasYamlQuote_(pujasI18n_(data, 'nombre', 'de', CONFIG.PUJA_NOMBRE)),
    '    zh: ' + pujasYamlQuote_(pujasI18n_(data, 'nombre', 'zh', CONFIG.PUJA_NOMBRE)),
    '  date:',
    '    es: ' + pujasYamlQuote_(pujasFormatFechaWeb_(data.fecha, 'es')),
    '    en: ' + pujasYamlQuote_(pujasFormatFechaWeb_(data.fecha, 'en')),
    '    fr: ' + pujasYamlQuote_(pujasFormatFechaWeb_(data.fecha, 'fr')),
    '    de: ' + pujasYamlQuote_(pujasFormatFechaWeb_(data.fecha, 'de')),
    '    zh: ' + pujasYamlQuote_(pujasFormatFechaWeb_(data.fecha, 'zh')),
    '  time:',
    '    es: ' + pujasYamlQuote_(pujasFormatHorarioWeb_(data, 'es')),
    '    en: ' + pujasYamlQuote_(pujasFormatHorarioWeb_(data, 'en')),
    '    fr: ' + pujasYamlQuote_(pujasFormatHorarioWeb_(data, 'fr')),
    '    de: ' + pujasYamlQuote_(pujasFormatHorarioWeb_(data, 'de')),
    '    zh: ' + pujasYamlQuote_(pujasFormatHorarioWeb_(data, 'zh')),
    '  donation_text:',
    '    es: "8 EUR individual - 15 EUR familia - donativo libre"',
    '    en: "EUR 8 individual - EUR 15 family - free donation"',
    '    fr: "8 EUR individuel - 15 EUR famille - don libre"',
    '    de: "8 EUR einzeln - 15 EUR Familie - freie Spende"',
    '    zh: "个人 8 欧元 - 家庭 15 欧元 - 随喜供养"',
    '  text:'
  );

  const texts = pujasWebTexts_();
  ['es', 'en', 'fr', 'de', 'zh'].forEach(function(lang) {
    lines.push('    ' + lang + ':');
    Object.keys(texts[lang]).forEach(function(key) {
      lines.push('      ' + key + ': ' + pujasYamlQuote_(texts[lang][key]));
    });
  });

  return lines.join('\n') + '\n';
}

function construirYamlSinProximaPujaWeb_() {
  const today = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd'
  );

  return [
    'active_puja:',
    '  enabled: false',
    '  status: pending',
    '  web_url: ' + pujasYamlQuote_('https://www.dzongpaeuropa.org/pujas-semanales'),
    '  updated_at: ' + pujasYamlQuote_(today)
  ].join('\n') + '\n';
}

function pujasCatalogRefs_(data) {
  const source =
    pujasText_(data.catalog_refs) ||
    pujasText_(data.deity_ids) ||
    pujasText_(data.deidad_ids) ||
    pujasText_(data.deidades_ids) ||
    pujasText_(data.catalogo_refs) ||
    pujasText_(data.puja_key);

  if (!source) return [];

  const seen = {};
  const refs = [];
  source.split(/[,;|+]+/).forEach(function(part) {
    const ref = String(part || '').trim();
    if (!ref || seen[ref]) return;
    seen[ref] = true;
    refs.push(ref);
  });
  return refs;
}

function pujasWebTexts_() {
  return {
    es: {
      badge: 'Próxima puja confirmada',
      title: 'Puja semanal actual',
      practice_label: 'Práctica',
      date_label: 'Fecha',
      time_label: 'Horario',
      donation_label: 'Donativo',
      description: 'Registro previo necesario. Tras inscribirte recibirás por correo electrónico la información de acceso cuando la práctica esté confirmada.',
      register_btn: 'Registrarse',
      individual_btn: '8 EUR individual',
      family_btn: '15 EUR familia',
      free_btn: 'Donativo libre',
      note: 'El acceso al Zoom no se publica en la web; se envía solo a las personas registradas.'
    },
    en: {
      badge: 'Next confirmed puja',
      title: 'Current weekly puja',
      practice_label: 'Practice',
      date_label: 'Date',
      time_label: 'Time',
      donation_label: 'Donation',
      description: 'Prior registration is required. After registering, you will receive the access information by email when the practice is confirmed.',
      register_btn: 'Register',
      individual_btn: 'EUR 8 individual',
      family_btn: 'EUR 15 family',
      free_btn: 'Free donation',
      note: 'Zoom access is not published on the website; it is sent only to registered participants.'
    },
    fr: {
      badge: 'Prochaine puja confirmée',
      title: 'Puja hebdomadaire actuelle',
      practice_label: 'Pratique',
      date_label: 'Date',
      time_label: 'Horaire',
      donation_label: 'Don',
      description: 'Une inscription préalable est nécessaire. Après inscription, vous recevrez les informations d’accès par email lorsque la pratique sera confirmée.',
      register_btn: 'S’inscrire',
      individual_btn: '8 EUR individuel',
      family_btn: '15 EUR famille',
      free_btn: 'Don libre',
      note: 'L’accès Zoom n’est pas publié sur le site; il est envoyé uniquement aux personnes inscrites.'
    },
    de: {
      badge: 'Nächste bestätigte Puja',
      title: 'Aktuelle wöchentliche Puja',
      practice_label: 'Praxis',
      date_label: 'Datum',
      time_label: 'Zeit',
      donation_label: 'Spende',
      description: 'Eine vorherige Anmeldung ist erforderlich. Nach der Anmeldung erhalten Sie die Zugangsinformationen per E-Mail, sobald die Praxis bestätigt ist.',
      register_btn: 'Anmelden',
      individual_btn: '8 EUR einzeln',
      family_btn: '15 EUR Familie',
      free_btn: 'Freie Spende',
      note: 'Der Zoom-Zugang wird nicht auf der Website veröffentlicht; er wird nur an angemeldete Teilnehmer gesendet.'
    },
    zh: {
      badge: '下一场已确认法事',
      title: '本周法事',
      practice_label: '修法',
      date_label: '日期',
      time_label: '时间',
      donation_label: '供养',
      description: '需要提前登记。登记后，修法确认时将通过电子邮件发送访问资料。',
      register_btn: '立即登记',
      individual_btn: '个人 8 EUR',
      family_btn: '家庭 15 EUR',
      free_btn: '随喜供养',
      note: 'Zoom 信息不会公开在网站上，只发送给已登记的参加者。'
    }
  };
}

function githubPublicarArchivo_(path, content, message) {
  const token = pujasGithubToken_();
  if (!token) {
    throw new Error('Falta GITHUB_TOKEN en Propiedades de secuencia de comandos.');
  }

  const owner = pujasScriptProperty_('GITHUB_OWNER') || 'ngawangchoenyi';
  const repo = pujasScriptProperty_('GITHUB_REPO') || 'dzongpaeuropa-web-v2';
  const branch = pujasScriptProperty_('GITHUB_BRANCH') || 'main';
  const apiBase = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + encodeURI(path);
  const getUrl = apiBase + '?ref=' + encodeURIComponent(branch);
  const headers = pujasGithubHeaders_(token);

  const getResponse = UrlFetchApp.fetch(getUrl, {
    method: 'get',
    headers: headers,
    muteHttpExceptions: true
  });

  const getCode = getResponse.getResponseCode();
  let sha = '';
  let currentContent = '';

  if (getCode === 200) {
    const current = JSON.parse(getResponse.getContentText());
    sha = current.sha || '';
    currentContent = Utilities.newBlob(
      Utilities.base64Decode(String(current.content || '').replace(/\s/g, ''))
    ).getDataAsString('UTF-8');

    if (currentContent === content) {
      return {
        status: 'sin cambios',
        message: 'El archivo remoto ya estaba actualizado.',
        url: current.html_url || ''
      };
    }
  } else if (getCode !== 404) {
    throw new Error('GitHub GET ' + getCode + ': ' + getResponse.getContentText());
  }

  const payload = {
    message: message,
    content: Utilities.base64Encode(content, Utilities.Charset.UTF_8),
    branch: branch
  };

  if (sha) payload.sha = sha;

  const putResponse = UrlFetchApp.fetch(apiBase, {
    method: 'put',
    headers: headers,
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const putCode = putResponse.getResponseCode();
  if (putCode < 200 || putCode >= 300) {
    throw new Error('GitHub PUT ' + putCode + ': ' + putResponse.getContentText());
  }

  const result = JSON.parse(putResponse.getContentText());
  return {
    status: sha ? 'actualizado' : 'creado',
    message: 'Archivo publicado en GitHub.',
    url: result.content && result.content.html_url ? result.content.html_url : ''
  };
}

function pujasGithubHeaders_(token) {
  return {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

function pujasGithubToken_() {
  return pujasScriptProperty_('GITHUB_TOKEN');
}

function pujasGithubPath_() {
  return pujasScriptProperty_('GITHUB_WEB_PUJA_PATH') || 'content/shared/puja-activa.yml';
}

function pujasScriptProperty_(key) {
  return String(PropertiesService.getScriptProperties().getProperty(key) || '').trim();
}

function pujasI18n_(data, field, lang, fallback) {
  const exact = pujasText_(data[field + '_' + lang]);
  if (exact) return exact;

  const spanish = pujasText_(data[field + '_es']);
  if (spanish) return spanish;

  return fallback || '';
}

function pujasFormatFechaWeb_(value, lang) {
  const date = pujasParseDate_(value);
  if (!date) return pujasText_(value) || CONFIG.PUJA_FECHA;

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const weekdays = {
    es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    fr: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  };
  const months = {
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  };

  if (lang === 'en') return weekdays.en[date.getDay()] + ', ' + months.en[monthIndex] + ' ' + day;
  if (lang === 'fr') return weekdays.fr[date.getDay()] + ' ' + day + ' ' + months.fr[monthIndex];
  if (lang === 'de') return weekdays.de[date.getDay()] + ', ' + day + '. ' + months.de[monthIndex];
  if (lang === 'zh') return months.zh[monthIndex] + day + '日，' + weekdays.zh[date.getDay()];

  return weekdays.es[date.getDay()] + ' ' + day + ' de ' + months.es[monthIndex];
}

function pujasFormatHorarioWeb_(data, lang) {
  const horaEs = pujasCleanHora_(data.hora_es || '', ['España', 'España', 'Espana']);
  const horaTw = pujasCleanHora_(data.hora_tw || '', ['Taiwán', 'Taiwán', 'Taiwan']);
  const labels = {
    es: ['España', 'Taiwán'],
    en: ['Spain', 'Taiwan'],
    fr: ['Espagne', 'Taïwan'],
    de: ['Spanien', 'Taiwan'],
    zh: ['西班牙', '台湾']
  };
  const current = labels[lang] || labels.es;

  if (lang === 'zh') {
    return current[0] + ' ' + horaEs + ' - ' + current[1] + ' ' + horaTw;
  }

  return horaEs + ' ' + current[0] + ' - ' + horaTw + ' ' + current[1];
}

function pujasUrlConLocale_(url, lang) {
  const locale = lang === 'zh' ? 'zh-CN' : lang;
  let text = pujasText_(url);
  if (!text) return '';

  if (/[?&]locale=/.test(text)) {
    return text.replace(/([?&]locale=)[^&]+/, '$1' + encodeURIComponent(locale));
  }

  return text + (text.indexOf('?') === -1 ? '?' : '&') + 'locale=' + encodeURIComponent(locale);
}

function pujasYamlQuote_(value) {
  return '"' + pujasYamlSafeText_(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, '\\n') + '"';
}

function pujasYamlSafeText_(value) {
  return String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
}

function pujasGetSheetObjects_(sheet) {
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(function(header) {
    return String(header || '').trim();
  });

  const rows = [];

  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const hasData = row.some(function(value) {
      return String(value || '').trim() !== '';
    });

    if (!hasData) continue;

    const obj = {};
    headers.forEach(function(header, i) {
      if (!header) return;
      obj[header] = row[i];
    });
    rows.push(obj);
  }

  return rows;
}

function pujasGetConfigMap_(sheet) {
  const rows = pujasGetSheetObjects_(sheet);
  const config = {};

  rows.forEach(function(row) {
    const key = String(row.clave || '').trim();
    if (!key) return;
    config[key] = row.valor;
  });

  return config;
}

function pujasFindSheet_(ss, names) {
  for (let i = 0; i < names.length; i++) {
    const sheet = ss.getSheetByName(names[i]);
    if (sheet) return sheet;
  }

  const wanted = names.map(function(name) {
    return pujasNormalizeSheetName_(name);
  });

  const sheets = ss.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const normalized = pujasNormalizeSheetName_(sheets[i].getName());
    if (wanted.indexOf(normalized) !== -1) {
      return sheets[i];
    }
  }

  return null;
}

function pujasListSheetNames_(ss) {
  return ss.getSheets().map(function(sheet) {
    return sheet.getName();
  }).join(', ');
}

function pujasNormalizeSheetName_(name) {
  return String(name || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_\-]+/g, '')
    .toLowerCase();
}

function pujasFormatFechaSpanish_(value) {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(String(value) + 'T00:00:00');
  if (isNaN(date.getTime())) return String(value);

  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return dias[date.getDay()] + ' ' + date.getDate() + ' de ' + meses[date.getMonth()];
}

function pujasEnrichHorario_(data) {
  const horaEsSimple = pujasCleanHora_(data.hora_es, ['España', 'España', 'Espana']);
  const horaTwSimple = pujasCleanHora_(data.hora_tw, ['Taiwán', 'Taiwán', 'Taiwan']);

  data.hora_es = horaEsSimple;
  data.hora_tw = horaTwSimple;
  data.hora_es_con_zona = pujasHoraConZona_(horaEsSimple, 'España');
  data.hora_tw_con_zona = pujasHoraConZona_(horaTwSimple, 'Taiwán');
  data.horario_completo = [data.hora_es_con_zona, data.hora_tw_con_zona].filter(Boolean).join(' - ');
}

function pujasCleanHora_(value, labels) {
  let text = String(value || '').trim();
  if (!text) return '';

  labels.forEach(function(label) {
    const pattern = new RegExp('\\s*' + label + '\\s*$', 'i');
    text = text.replace(pattern, '');
  });

  return text.trim();
}

function pujasHoraConZona_(hora, zona) {
  if (!hora) return '';

  const normalizedHora = pujasNormalizeSheetName_(hora);
  const normalizedZona = pujasNormalizeSheetName_(zona);

  if (normalizedHora.indexOf(normalizedZona) !== -1) {
    return hora;
  }

  return hora + ' ' + zona;
}

function pujasText_(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function pujasParseDate_(value) {
  if (!value) return null;
  if (value instanceof Date && !isNaN(value.getTime())) return value;

  const parsed = new Date(value);
  if (!isNaN(parsed.getTime())) return parsed;

  return null;
}

function pujasFormatCounts_(counts) {
  const keys = Object.keys(counts || {}).sort();
  if (!keys.length) return 'Sin datos';

  return keys.map(function(key) {
    return '- ' + key + ': ' + counts[key];
  }).join('\n');
}

function pujasValidarDatosActivos_(data) {
  const avisos = [];
  const start = CONFIG.PUJA_START_ISO ? new Date(CONFIG.PUJA_START_ISO) : null;
  const formUrl = pujasText_(data.formulario_url);
  const webUrl = pujasText_(CONFIG.WEB_URL);
  const stripeIndividual = pujasText_(CONFIG.STRIPE_INDIVIDUAL_URL);
  const stripeFamilia = pujasText_(CONFIG.STRIPE_FAMILIA_URL);
  const stripeLibre = pujasText_(CONFIG.STRIPE_LIBRE_URL);

  if (!CONFIG.PUJA_ID) avisos.push('Falta puja_id.');
  if (!CONFIG.PUJA_NOMBRE) avisos.push('Falta nombre de puja.');
  if (!CONFIG.PUJA_START_ISO || !start || isNaN(start.getTime())) {
    avisos.push('PUJA_START_ISO falta o no es válido.');
  } else {
    if (start.getTime() <= new Date().getTime()) {
      avisos.push('PUJA_START_ISO ya ha pasado. No se debe publicar una puja pasada como próxima puja.');
    }
    if (CONFIG.PUJA_FECHA && String(CONFIG.PUJA_FECHA).indexOf(String(start.getDate())) === -1) {
      avisos.push('La fecha visible no parece coincidir con PUJA_START_ISO.');
    }
  }

  if (!CONFIG.ZOOM_URL || pujasEsPlaceholder_(CONFIG.ZOOM_URL)) {
    avisos.push('Zoom URL no está configurado.');
  }
  if (!CONFIG.ZOOM_ID || pujasEsPlaceholder_(CONFIG.ZOOM_ID)) {
    avisos.push('Zoom ID no está configurado.');
  }
  if (!CONFIG.ZOOM_PASSCODE || pujasEsPlaceholder_(CONFIG.ZOOM_PASSCODE)) {
    avisos.push('Zoom passcode no está configurado.');
  }
  if (CONFIG.ZOOM_URL && !/^https:\/\/zoom\.us\/j\//.test(String(CONFIG.ZOOM_URL))) {
    avisos.push('Zoom URL no parece un enlace válido de Zoom.');
  }

  if (!stripeIndividual || pujasEsPlaceholder_(stripeIndividual)) avisos.push('Falta Stripe individual.');
  if (!stripeFamilia || pujasEsPlaceholder_(stripeFamilia)) avisos.push('Falta Stripe familia.');
  if (!stripeLibre || pujasEsPlaceholder_(stripeLibre)) avisos.push('Falta Stripe libre.');

  if (stripeIndividual && !pujasUrlHttps_(stripeIndividual)) avisos.push('Stripe individual no es una URL https válida.');
  if (stripeFamilia && !pujasUrlHttps_(stripeFamilia)) avisos.push('Stripe familia no es una URL https válida.');
  if (stripeLibre && !pujasUrlHttps_(stripeLibre)) avisos.push('Stripe libre no es una URL https válida.');

  if (!pujasUrlsDistintas_([stripeIndividual, stripeFamilia, stripeLibre])) {
    avisos.push('Los enlaces Stripe individual, familia y libre deben ser distintos.');
  }

  if (stripeIndividual && stripeIndividual.indexOf('00wdR8eMl2xn6Qaa1Za3u06') === -1) {
    avisos.push('Stripe individual no corresponde al enlace de 8 EUR configurado.');
  }
  if (stripeFamilia && stripeFamilia.indexOf('3cIaEW0Vvc7Xcaub63a3u07') === -1) {
    avisos.push('Stripe familia no corresponde al enlace de 15 EUR configurado.');
  }
  if (stripeLibre && stripeLibre.indexOf('fZuaEW1Zzc7X2zU5LJa3u00') === -1) {
    avisos.push('Stripe libre no corresponde al enlace de donativo libre configurado.');
  }

  if (!formUrl || pujasEsPlaceholder_(formUrl)) {
    avisos.push('Falta formulario_url.');
  } else if (!/^https:\/\/docs\.google\.com\/forms\//.test(formUrl) || formUrl.indexOf('viewform') === -1) {
    avisos.push('formulario_url no parece un enlace válido de Google Forms.');
  }

  if (!webUrl) avisos.push('Falta web_url.');
  if (webUrl && !pujasWebDzongpaUrl_(webUrl)) {
    avisos.push('WEB_URL debe pertenecer a https://www.dzongpaeuropa.org.');
  }

  if (!pujasGithubToken_()) avisos.push('Falta GITHUB_TOKEN en Propiedades de script.');
  if (!pujasScriptProperty_('GITHUB_OWNER')) avisos.push('Falta GITHUB_OWNER.');
  if (!pujasScriptProperty_('GITHUB_REPO')) avisos.push('Falta GITHUB_REPO.');
  if (!pujasScriptProperty_('GITHUB_BRANCH')) avisos.push('Falta GITHUB_BRANCH.');
  if (!pujasGithubPath_()) avisos.push('Falta GITHUB_WEB_PUJA_PATH.');

  ['es', 'en', 'fr', 'de', 'zh'].forEach(function(lang) {
    const title = pujasI18n_(data, 'nombre', lang, CONFIG.PUJA_NOMBRE);
    const date = pujasFormatFechaWeb_(data.fecha || CONFIG.PUJA_FECHA, lang);
    const schedule = pujasFormatHorarioWeb_(data, lang);
    if (!title) avisos.push('Falta título web para idioma ' + lang + '.');
    if (!date) avisos.push('Falta fecha web para idioma ' + lang + '.');
    if (!schedule) avisos.push('Falta horario web para idioma ' + lang + '.');
  });

  return avisos;
}

function pujasEsPlaceholder_(value) {
  const text = String(value || '').trim();
  return !text || text.indexOf('PEGA_') !== -1 || text.indexOf('AQUI') !== -1 || text.indexOf('REEMPLAZA') !== -1;
}

function pujasWebDzongpaUrl_(value) {
  return /^https:\/\/www\.dzongpaeuropa\.org(\/|$)/.test(String(value || '').trim());
}

function pujasWebPujasUrl_() {
  const webUrl = pujasText_(CONFIG.WEB_URL);
  if (pujasWebDzongpaUrl_(webUrl) && /\/pujas-semanales\/?$/.test(webUrl)) {
    return webUrl.replace(/\/$/, '');
  }
  return 'https://www.dzongpaeuropa.org/pujas-semanales';
}

function pujasUrlHttps_(value) {
  return /^https:\/\/[^\s]+$/i.test(String(value || '').trim());
}

function pujasUrlsDistintas_(urls) {
  const clean = urls
    .map(function(url) { return String(url || '').trim(); })
    .filter(function(url) { return !!url; });
  const unique = {};
  clean.forEach(function(url) {
    unique[url] = true;
  });
  return clean.length === urls.length && Object.keys(unique).length === clean.length;
}

function pujasMergeTemplate_(template, data) {
  return String(template || '').replace(/\{\{([^}]+)\}\}/g, function(match, key) {
    key = String(key || '').trim();
    const value = data[key];
    if (value instanceof Date) return pujasFormatFechaSpanish_(value);
    return value === undefined || value === null ? '' : String(value);
  });
}
