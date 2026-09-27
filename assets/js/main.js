(function () {
  'use strict';

  /* ---- theme toggle ---- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var themeColor = document.getElementById('themeColor');
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  function hasSavedTheme() {
    try {
      var t = localStorage.getItem('theme');
      return t === 'dark' || t === 'light';
    } catch (e) {
      return false;
    }
  }

  function setTheme(isDark, persist) {
    var theme = isDark ? 'dark' : 'light';
    var next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    if (themeColor) themeColor.setAttribute('content', isDark ? '#1b1518' : '#fefbfc');
    themeToggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    themeToggle.setAttribute('title', 'Switch to ' + next + ' theme');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
  }

  setTheme(root.getAttribute('data-theme') === 'dark', false);
  themeToggle.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') !== 'dark', true);
  });
  function followSystem(e) { if (!hasSavedTheme()) setTheme(e.matches, false); }
  if (systemTheme.addEventListener) systemTheme.addEventListener('change', followSystem);
  else if (systemTheme.addListener) systemTheme.addListener(followSystem);

  /* ---- visitor counter readiness ---- */
  var container = document.getElementById('busuanzi_container_site');
  var pv = document.getElementById('busuanzi_value_site_pv');
  if (container && pv) {
    var card = container.closest('.visitor-card');
    var tries = 0;
    var timer = setInterval(function () {
      if (pv.textContent && pv.textContent !== '0' && pv.textContent !== '—') {
        if (card) card.classList.add('is-ready');
        clearInterval(timer);
      } else if (++tries > 20) {
        if (card) card.classList.add('is-unavailable');
        clearInterval(timer);
      }
    }, 300);
  }

  /* ---- gallery lightbox ---- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  if (lb && lbImg) {
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        lbImg.src = img ? img.src : '';
        lbCaption.textContent = item.getAttribute('data-cap') || '';
        lb.classList.add('open');
      });
    });
    lbClose.addEventListener('click', function () { lb.classList.remove('open'); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  /* ---- sidebar typewriter ---- */
  var twEl = document.getElementById('twText');
  if (twEl) {
    var twPhrases = [
      'Welcome to my page.',
      'Incoming Master\u2019s @ UCAS',
      'Computer Vision & LLM',
      'Code \u00b7 Dance \u00b7 Serve'
    ];
    var twPi = 0, twCi = 0, twDeleting = false;
    (function twLoop() {
      var p = twPhrases[twPi];
      if (twDeleting) {
        twCi--;
        twEl.textContent = p.slice(0, twCi);
        if (twCi === 0) { twDeleting = false; twPi = (twPi + 1) % twPhrases.length; setTimeout(twLoop, 420); return; }
      } else {
        twCi++;
        twEl.textContent = p.slice(0, twCi);
        if (twCi === p.length) { setTimeout(function () { twDeleting = true; twLoop(); }, 2200); return; }
      }
      setTimeout(twLoop, twDeleting ? 24 : 72);
    })();
  }

  /* ---- video poster click-to-play ---- */
  document.querySelectorAll('.video-poster').forEach(function (poster) {
    poster.addEventListener('click', function () {
      var bvid = poster.getAttribute('data-bvid');
      if (!bvid) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://player.bilibili.com/player.html?bvid=' + bvid + '&page=1&autoplay=1';
      iframe.allowFullscreen = true;
      iframe.scrolling = 'no';
      iframe.style.cssText = 'width:100%;display:block;aspect-ratio:16/9;border:none;';
      poster.parentNode.insertBefore(iframe, poster);
      poster.remove();
    });
  });
})();
