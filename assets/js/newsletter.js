(function() {
  var roots = document.querySelectorAll('.newsletter-form--ml');
  if (!roots.length) return;

  function styleNewsletterForms() {
    var styled = false;

    roots.forEach(function(root) {
      var wrapper = root.querySelector('.ml-form-embedWrapper');
      if (!wrapper) return;

      styled = true;

      var header = root.querySelector('.ml-form-embedContent');
      var body = root.querySelector('.ml-form-embedBody');
      var row = root.querySelector('.ml-form-horizontalRow');
      var input = root.querySelector('input[type="email"]');
      var button = root.querySelector('.ml-form-embedSubmit button');

      wrapper.style.cssText = 'background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important;max-width:450px!important;margin:0 auto!important;';
      if (header) header.style.display = 'none';
      if (body) body.style.cssText = 'padding:0!important;';
      if (row) row.style.cssText = 'display:block!important;';

      if (input) {
        input.placeholder = root.getAttribute('data-placeholder') || input.placeholder;
        input.style.cssText = 'width:100%!important;height:52px!important;font-family:inherit!important;font-size:1rem!important;color:#2B2B2B!important;background:#fff!important;border:1px solid #d6c28f!important;border-radius:6px!important;padding:0 16px!important;box-shadow:none!important;';
      }

      if (button) {
        button.textContent = root.getAttribute('data-button') || button.textContent;
        button.style.cssText = 'width:100%!important;min-height:54px!important;margin-top:14px!important;background:#8B1A1A!important;color:#fff!important;font-family:inherit!important;font-size:1rem!important;font-weight:700!important;border:0!important;border-radius:6px!important;padding:13px 28px!important;cursor:pointer!important;';
      }
    });

    return styled;
  }

  var tries = 0;
  var interval = setInterval(function() {
    if (styleNewsletterForms() || ++tries > 40) clearInterval(interval);
  }, 250);
})();
