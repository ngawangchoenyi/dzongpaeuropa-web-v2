(function () {
  // Crear overlay
  var overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  var img = document.createElement('img');
  var btn = document.createElement('button');
  btn.className = 'lb-close';
  btn.setAttribute('aria-label', 'Cerrar imagen');
  btn.innerHTML = '&times;';
  overlay.appendChild(img);
  overlay.appendChild(btn);
  document.body.appendChild(overlay);

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    img.src = '';
    document.body.style.overflow = '';
  }

  // Cerrar al hacer clic en el fondo o en el botón
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === btn) close();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // Activar en todas las imágenes de galerías
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && !t.closest('.nav') && !t.closest('.site-footer') && !t.closest('.lb-overlay')) {
      open(t.src, t.alt);
    }
  });
})();
