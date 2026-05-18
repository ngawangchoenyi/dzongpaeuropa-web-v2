(function () {
  var overlay = document.createElement('div');
  overlay.className = 'lb-overlay';

  var img = document.createElement('img');
  var btn = document.createElement('button');
  var lastTouchOpen = 0;

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

  function closeFromOverlay(e) {
    if (e.target === overlay || e.target === btn) close();
  }

  function imageFromTarget(target) {
    if (!target || !target.closest) return null;
    if (target.closest('.nav, .site-footer, .lb-overlay')) return null;

    var item = target.closest('.centros-foto-grid li, .foto-galeria li');
    if (item) return item.querySelector('img');

    if (target.tagName === 'IMG' && target.closest('.section')) return target;
    return null;
  }

  function openFromEvent(e) {
    var source = imageFromTarget(e.target);
    if (!source) return;

    if (e.type === 'click' && Date.now() - lastTouchOpen < 700) return;
    if (e.type === 'pointerup' || e.type === 'touchend') lastTouchOpen = Date.now();

    e.preventDefault();
    open(source.currentSrc || source.src, source.alt);
  }

  overlay.addEventListener('click', closeFromOverlay);
  overlay.addEventListener('pointerup', closeFromOverlay);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  document.addEventListener('click', openFromEvent);

  if (window.PointerEvent) {
    document.addEventListener('pointerup', function (e) {
      if (e.pointerType !== 'mouse') openFromEvent(e);
    });
  } else {
    document.addEventListener('touchend', openFromEvent);
  }
})();
