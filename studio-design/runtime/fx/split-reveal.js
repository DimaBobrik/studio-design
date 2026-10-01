/* studio-design fx · split-reveal
   Line-mask / word / char reveal of headings on scroll (GSAP SplitText 3.13+ with autoSplit + mask).
   Markup: <h2 data-fx="split-reveal">…</h2>
       or  <section data-fx="split-reveal"> … <h2 data-split>…</h2> <p data-split>…</p> </section>
           (section-level: splits [data-split] children, else every h1–h3 inside)
   Params (data-*)                     type      default          ACF field
     data-type     lines|words|chars     select    lines            Select
                   chars is Latin-only: forced to words when RTL, lang he/ar/fa, or non-Latin text.
     data-variant  slide|blur|fade|colour select   slide            Select
                   colour = scroll-lit text: words go from a colour floor (mix toward the background that still passes
                   3:1 at ≥24px / 4.5:1 below) to full ink; use with data-scrub="true". Never opacity-dimmed text.
     data-floor    colour: share mixed toward the background (0–0.8)   number  0.45   Number
     data-stagger  seconds between parts number    auto (.09/.035/.018)  Number
     data-duration seconds               number    1.1              Number
     data-delay    seconds               number    0                Number
     data-start    ScrollTrigger start   text      "top 86%"        Text
     data-scrub    tie to scroll         boolean   false            True/False
     data-once     play once only        boolean   true             True/False
   Reduced motion: no split, text static. No SplitText: whole element fades up (still accessible).
   A11y: headings/li/blockquote/links get SplitText aria:"auto" (aria-label + aria-hidden parts); on <p>/<span>/<div>, where
   aria-label is prohibited, parts are aria-hidden and the text is kept in an .sr-only span (removed on revert). */
(function () {
  'use strict';
  var NAME = 'split-reveal';
  var store = new WeakMap();
  var NON_LATIN = /[֐-ࣿऀ-෿฀-࿿ᄀ-ᇿ　-鿿가-힯]/;

  function targetsOf(el) {
    if (el.matches('h1,h2,h3,h4,h5,h6,p,blockquote,li,[data-split]') && !el.querySelector('[data-split]')) return [el];
    var t = el.querySelectorAll('[data-split]');
    if (!t.length) t = el.querySelectorAll('h1,h2,h3');
    return Array.prototype.slice.call(t);
  }

  var PROHIBITED = /^(caption|code|deletion|emphasis|generic|insertion|mark|paragraph|presentation|none|strong|subscript|superscript|suggestion|term|time)$/;
  function canLabel(t) {
    var role = t.getAttribute('role');
    if (role) return !PROHIBITED.test(role);
    return /^(H[1-6]|LI|BLOCKQUOTE|A|BUTTON|FIGURE|SECTION|ARTICLE|NAV|ASIDE|DT|DD|TD|TH)$/.test(t.tagName);
  }

  // colour floor for the scroll-lit variant: mix text colour toward the background, but never below 3:1 (large text)
  // or 4.5:1 (body) against it. Text is never dimmed with opacity (WCAG 1.4.3 at every scroll position).
  var cvs = null;
  function rgb(c) { if (SD.toRGBArray) return SD.toRGBArray(c);
    cvs = cvs || document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    cvs.clearRect(0, 0, 1, 1); cvs.fillStyle = '#000'; cvs.fillStyle = c; cvs.fillRect(0, 0, 1, 1); var d = cvs.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3]]; }
  function lum(c) { return c.slice(0, 3).map(function (v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce(function (a, v, i) { return a + v * [0.2126, 0.7152, 0.0722][i]; }, 0); }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function bgOf(t) { for (var n = t; n && n.nodeType === 1; n = n.parentElement) { var c = rgb(getComputedStyle(n).backgroundColor); if (c[3] > 200) return c; }
    return rgb(getComputedStyle(document.documentElement).getPropertyValue('--c-canvas') || '#fff'); }
  function floorColour(t) {
    var ink = rgb(getComputedStyle(t).color), bg = bgOf(t), need = parseFloat(getComputedStyle(t).fontSize) >= 24 ? 3 : 4.5;
    var mix = parseFloat(SD.data(t, 'floor', SD.data(t.closest('[data-fx~="split-reveal"]') || t, 'floor', 0.45))), c = ink;
    for (var k = mix; k >= 0; k -= 0.05) { c = ink.map(function (v, i) { return i < 3 ? Math.round(v * (1 - k) + bg[i] * k) : 255; }); if (ratio(c, bg) >= need) break; }
    return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
  }

  function resolveType(el, t) {
    var type = SD.data(el, 'type', 'lines');
    if (type !== 'lines' && type !== 'words' && type !== 'chars') type = 'lines';
    if (type === 'chars') {
      var langEl = t.closest('[lang]');
      var lang = ((langEl && langEl.getAttribute('lang')) || '').toLowerCase();
      if (SD.dir(t) === -1 || /^(he|iw|ar|fa|ur|yi)/.test(lang) || NON_LATIN.test(t.textContent)) type = 'words';
    }
    return type;
  }

  function init(el) {
    if (store.has(el)) destroy(el);
    var g = window.gsap;
    var state = { mm: null };
    store.set(el, state);
    if (!g) return;
    var variant = SD.data(el, 'variant', 'slide');
    var duration = SD.data(el, 'duration', 1.1);
    var delay = SD.data(el, 'delay', 0);
    var start = SD.data(el, 'start', 'top 86%');
    var scrub = SD.data(el, 'scrub', false);
    var once = SD.data(el, 'once', true);
    var hasST = !!window.ScrollTrigger;

    state.mm = g.matchMedia();
    state.mm.add('(prefers-reduced-motion: no-preference)', function () {
      targetsOf(el).forEach(function (t) {
        var type = resolveType(el, t);
        if ((variant === 'colour' || variant === 'color') && type === 'lines') type = 'words';
        var stagger = SD.data(el, 'stagger', type === 'lines' ? 0.09 : type === 'words' ? 0.035 : 0.018);
        var st = hasST ? (scrub
          ? { trigger: t, start: start, end: 'top 45%', scrub: 0.6 }
          : { trigger: t, start: start, once: once, toggleActions: once ? 'play none none none' : 'play none none reverse' }) : null;

        if (!window.SplitText) { // graceful fallback
          g.from(t, { autoAlpha: 0, y: 24, duration: duration, delay: delay, ease: 'expo.out', scrollTrigger: st });
          return;
        }
        var splitType = type === 'lines' ? 'lines' : type === 'words' ? 'lines,words' : 'lines,words,chars';
        // a11y: aria-label is only valid on nameable roles (headings, list items, blockquote, links…). On <p>, <span>, <div>
        // it is prohibited (axe aria-prohibited-attr), so there the parts are aria-hidden and the text lives in an sr-only span.
        var nameable = canLabel(t);
        var useMask = variant === 'slide';
        var srText = t.textContent.replace(/\s+/g, ' ').trim();
        window.SplitText.create(t, {
          type: splitType,
          mask: useMask ? type : undefined,
          autoSplit: true,
          aria: nameable ? 'auto' : 'hidden',
          linesClass: 'sd-split-line',
          wordsClass: 'sd-split-word',
          charsClass: 'sd-split-char',
          onSplit: function (self) {
            if (!nameable) { var old = t.querySelector(':scope > .sd-split-sr'); if (old) old.remove();
              var sr = document.createElement('span'); sr.className = 'sr-only sd-split-sr'; sr.textContent = srText; t.insertBefore(sr, t.firstChild); }
            var parts = type === 'lines' ? self.lines : type === 'words' ? self.words : self.chars;
            var from;
            if (variant === 'colour' || variant === 'color') from = { color: floorColour(t) };
            else if (variant === 'blur') from = { autoAlpha: 0, filter: 'blur(12px)', yPercent: 35 };
            else if (variant === 'fade') from = { autoAlpha: 0, yPercent: 30 };
            else from = { yPercent: 115, rotate: type === 'lines' ? 2.5 * SD.dir(t) : 0 };
            var vars = Object.assign({}, from, {
              duration: variant === 'blur' ? duration * 1.05 : duration,
              delay: delay,
              ease: variant === 'blur' ? 'power3.out' : 'expo.out',
              stagger: stagger,
              transformOrigin: SD.dir(t) === -1 ? '100% 0%' : '0% 0%',
              scrollTrigger: st && Object.assign({}, st)
            });
            if (variant === 'blur') vars.clearProps = 'filter';
            if (variant === 'colour' || variant === 'color') {
              // GSAP cannot interpolate oklch()/color-mix(): tween between two rgb() strings resolved by SD.toRGB, then clear
              var to = Object.assign({}, vars, { color: SD.toRGB ? SD.toRGB(getComputedStyle(t).color, t) : getComputedStyle(t).color, ease: 'none', clearProps: 'color' });
              return g.fromTo(parts, { color: from.color }, to);
            }
            return g.from(parts, vars);
          }
        });
      });
      if (hasST) window.ScrollTrigger.refresh();
    });
  }

  function destroy(el) {
    var s = store.get(el);
    if (!s) return;
    if (s.mm) s.mm.revert();
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
