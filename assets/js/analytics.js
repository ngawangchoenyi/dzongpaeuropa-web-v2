(function() {
  var GA_ID = 'G-325HE482K4';
  var CONSENT_KEY = 'dzongpa_analytics_consent';

  var copy = {
    es: {
      title: 'Privacidad',
      text: 'Usamos Google Analytics para medir visitas y mejorar la web. Solo se activa si aceptas.',
      accept: 'Aceptar',
      decline: 'Rechazar'
    },
    en: {
      title: 'Privacy',
      text: 'We use Google Analytics to measure visits and improve the website. It is only activated if you accept.',
      accept: 'Accept',
      decline: 'Decline'
    },
    fr: {
      title: 'Confidentialité',
      text: 'Nous utilisons Google Analytics pour mesurer les visites et améliorer le site. Il ne s\'active que si vous acceptez.',
      accept: 'Accepter',
      decline: 'Refuser'
    },
    de: {
      title: 'Datenschutz',
      text: 'Wir verwenden Google Analytics, um Besuche zu messen und die Website zu verbessern. Es wird nur aktiviert, wenn Sie zustimmen.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen'
    },
    zh: {
      title: '隐私',
      text: '我们使用 Google Analytics 衡量访问量并改进网站。只有在您同意后才会启用。',
      accept: '接受',
      decline: '拒绝'
    }
  };

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  function getLang() {
    var lang = (document.documentElement.getAttribute('lang') || 'es').slice(0, 2);
    return copy[lang] ? lang : 'es';
  }

  function getStoredConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {}
  }

  function loadGoogleAnalytics() {
    if (window.__dzongpaGaLoaded) return;
    window.__dzongpaGaLoaded = true;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function applyConsent(value) {
    var granted = value === 'granted';
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    if (granted) loadGoogleAnalytics();
  }

  function removeBanner() {
    var banner = document.querySelector('.cookie-consent');
    if (banner) banner.remove();
  }

  function saveConsent(value) {
    setStoredConsent(value);
    applyConsent(value);
    removeBanner();
  }

  function showBanner() {
    removeBanner();

    var lang = getLang();
    var labels = copy[lang];
    var banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');

    banner.innerHTML =
      '<div class="cookie-consent__content">' +
        '<h2 id="cookie-consent-title">' + labels.title + '</h2>' +
        '<p>' + labels.text + '</p>' +
      '</div>' +
      '<div class="cookie-consent__actions">' +
        '<button type="button" class="cookie-consent__btn cookie-consent__btn--secondary" data-cookie-decline>' + labels.decline + '</button>' +
        '<button type="button" class="cookie-consent__btn cookie-consent__btn--primary" data-cookie-accept>' + labels.accept + '</button>' +
      '</div>';

    document.body.appendChild(banner);
  }

  document.addEventListener('click', function(event) {
    if (event.target.closest('[data-cookie-accept]')) {
      saveConsent('granted');
      return;
    }

    if (event.target.closest('[data-cookie-decline]')) {
      saveConsent('denied');
      return;
    }

    if (event.target.closest('[data-cookie-preferences]')) {
      event.preventDefault();
      showBanner();
    }
  });

  var saved = getStoredConsent();
  if (saved === 'granted' || saved === 'denied') {
    applyConsent(saved);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
