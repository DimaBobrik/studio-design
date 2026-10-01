/* studio-design fx · footer-reveal
   Curtain footer (FT-02): the page slides up and uncovers a footer that sits underneath (CSS sticky, no scroll-jacking),
   plus a giant wordmark (FT-01) that is fitted to the container width and rises in on reveal.
   Markup:
     <main>…</main>
     <footer data-fx="footer-reveal">
       …links…
       <div data-fit-text aria-hidden="true">Studio Givah</div>     (decorative duplicate of the brand name)
     </footer>
   The footer's previous sibling becomes the "cover" (gets position:relative, z-index, canvas background) automatically.
   Params (data-*)                               type     default  ACF field
     data-curtain     sticky reveal on/off            boolean  true     True/False
     data-parallax    footer content drift in % while revealing  number 30  Number (0 = off)
     data-max-height  disable the curtain if footer is taller than this share of the viewport  number 0.9  Number
     data-fit-max     max font size for the wordmark, px   number  0 (none)  Number
     data-crop        crop the wordmark bottom (share of its height, 0–0.4)   number  0  Number
     data-rise        wordmark letters rise on reveal    boolean  true     True/False
   Fit-text: [data-fit-text] is measured at a reference size and scaled so its text spans the container's content width
   (ResizeObserver + fonts.ready). Letters rise by chars in Latin, by words in RTL/Hebrew (never breaks shaping).
   Reduced motion: curtain stays (it's plain scrolling), no parallax, no rise. */
(function () {
  'use strict';
  var NAME = 'footer-reveal';
  var store = new WeakMap();
  var NON_LATIN = /[֐-ࣿऀ-෿　-鿿가-힯]/;
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  function fitAll(st) {
    st.fits.forEach(function (f) {
      var box = f.el.parentElement;
      var cs = getComputedStyle(box);
      var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      f.el.style.fontSize = '100px';
      f.el.style.whiteSpace = 'nowrap';
      f.el.style.inlineSize = 'max-content'; // works even when the parent is grid/flex (inline-block would be blockified)
      var w = f.el.getBoundingClientRect().width;
      f.el.style.inlineSize = '';
      if (!w || !avail) return;
      var size = 100 * avail / w * 0.995;
      if (f.max) size = Math.min(size, f.max);
      f.el.style.fontSize = size.toFixed(2) + 'px';
    });
  }

  function init(el) {
    if (store.has(el)) destroy(el);
    var st = { mm: null, cover: null, ro: null, fits: [], split: [], off: [] };
    store.set(el, st);
    var curtain = SD.data(el, 'curtain', true);
    var maxH = SD.data(el, 'max-height', 0.9);
    var crop = Math.min(0.4, Math.max(0, SD.data(el, 'crop', 0)));
    el.classList.add('sd-footer');

    // fit-text
    Array.prototype.forEach.call(el.querySelectorAll('[data-fit-text]'), function (t) {
      t.classList.add('sd-fit');
      if (crop) { t.style.setProperty('--fit-crop', crop); t.classList.add('sd-fit--crop'); }
      st.fits.push({ el: t, max: SD.data(el, 'fit-max', 0) });
    });
    var refit = function () { fitAll(st); };
    refit();
    if ('ResizeObserver' in window && st.fits.length) {
      var lastW = 0;
      st.ro = new ResizeObserver(function () { var w = el.clientWidth; if (w !== lastW) { lastW = w; refit(); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); } });
      st.ro.observe(el);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (store.get(el) === st) refit(); });

    // curtain
    var applyCurtain = function () {
      var on = curtain && el.offsetHeight <= window.innerHeight * maxH;
      el.classList.toggle('sd-footer--curtain', on);
      var prev = el.previousElementSibling;
      if (on && prev && !st.cover) { st.cover = prev; prev.classList.add('sd-footer-cover'); }
      if (!on && st.cover) { st.cover.classList.remove('sd-footer-cover'); tidy(st.cover); st.cover = null; }
      return on;
    };
    applyCurtain();
    var onResize = function () { applyCurtain(); };
    window.addEventListener('resize', onResize);
    st.off.push(function () { window.removeEventListener('resize', onResize); });

    var g = window.gsap;
    if (!g || !window.ScrollTrigger) return;
    var par = SD.data(el, 'parallax', 30);
    var rise = SD.data(el, 'rise', true);
    st.mm = g.matchMedia();
    st.mm.add('(prefers-reduced-motion: no-preference)', function () {
      var inner = el.querySelector('[data-footer-inner]') || el.firstElementChild;
      if (par && inner && el.classList.contains('sd-footer--curtain')) {
        g.fromTo(inner, { yPercent: -par, opacity: 0.4 }, {
          yPercent: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true }
        });
      }
      if (rise) {
        st.fits.forEach(function (f) {
          var rtl = SD.dir(f.el) === -1 || NON_LATIN.test(f.el.textContent);
          var parts;
          if (window.SplitText) {
            var s = window.SplitText.create(f.el, { type: rtl ? 'words' : 'chars', charsClass: 'sd-fit__ch', wordsClass: 'sd-fit__w', aria: 'hidden' });
            st.split.push(s);
            parts = rtl ? s.words : s.chars;
          } else parts = [f.el];
          fitAll(st); // re-fit: split glyph boxes can differ by a hair from the unsplit text
          g.from(parts, {
            yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: { each: rtl ? 0.08 : 0.035, from: rtl ? 'end' : 'start' },
            scrollTrigger: { trigger: f.el, start: 'top 98%', toggleActions: 'play none none reverse' }
          });
        });
      }
      return function () {
        st.split.forEach(function (s) { s.revert(); }); st.split = [];
        if (inner) { g.set(inner, { clearProps: 'transform,translate,rotate,scale,opacity' }); tidy(inner); }
      };
    });
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.mm) st.mm.revert();
    st.off.forEach(function (f) { f(); });
    if (st.ro) st.ro.disconnect();
    if (st.cover) { st.cover.classList.remove('sd-footer-cover'); tidy(st.cover); }
    st.fits.forEach(function (f) { f.el.classList.remove('sd-fit', 'sd-fit--crop'); f.el.style.fontSize = ''; f.el.style.whiteSpace = ''; f.el.style.removeProperty('--fit-crop'); tidy(f.el); });
    el.classList.remove('sd-footer', 'sd-footer--curtain');
    tidy(el);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
