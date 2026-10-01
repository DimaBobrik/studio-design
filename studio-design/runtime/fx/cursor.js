/* studio-design fx · cursor  (opt-in, pointer:fine only, off with reduced motion)
   Two variants:
   A) follower — dot + lagging ring for the whole page. Put it on <body data-fx="cursor">.
      The ring grows over a / button / [data-cursor]; [data-cursor="View"] shows a text label inside the ring.
      The native cursor stays visible by default; data-hide-native="true" hides it EXCEPT on inputs, textareas,
      selects and [contenteditable] (the custom cursor also hides there, so the caret/I-beam is always the real one).
   B) trail — image trail inside a section: <section data-fx="cursor" data-variant="trail" data-images="a.jpg|b.jpg|c.jpg">
      (or <img data-trail-src> / <template> children as the image source). Images are aria-hidden decoration.
   Params (data-*)                               type     default   ACF field
     data-variant      follower|trail                 select   follower  Select
     data-hide-native  hide the OS cursor (never on form fields)  boolean false  True/False
     data-blend        mix-blend-mode difference for the ring   boolean false  True/False
     data-lag          ring follow duration (s)       number   0.45      Number
     trail:
     data-images       image URLs separated by "|"    text     —         Gallery (URLs)
     data-threshold    px of movement between images  number   90        Number
     data-size         image width (CSS length)       text     "min(22vw, 260px)"  Text
     data-pool         max images on screen           number   8         Number */
(function () {
  'use strict';
  var NAME = 'cursor';
  var store = new WeakMap();
  var FIELD = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';
  var HOT = 'a, button, [role="button"], label, summary, [data-cursor]';

  function follower(el, st, g) {
    var lag = SD.data(el, 'lag', 0.45);
    var root = document.createElement('div');
    root.className = 'sd-cursor' + (SD.data(el, 'blend', false) ? ' sd-cursor--blend' : '');
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = '<div class="sd-cursor__ring"><div class="sd-cursor__shape"><span class="sd-cursor__label"></span></div></div><div class="sd-cursor__dot"><div class="sd-cursor__shape"></div></div>';
    document.body.appendChild(root);
    st.nodes.push(root);
    var ring = root.firstChild, dot = root.lastChild, label = ring.querySelector('.sd-cursor__label');
    var rx = g.quickTo(ring, 'x', { duration: lag, ease: 'power3.out' }), ry = g.quickTo(ring, 'y', { duration: lag, ease: 'power3.out' });
    var dx = g.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' }), dy = g.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
    if (SD.data(el, 'hide-native', false)) { document.documentElement.classList.add('sd-cursor-hide'); st.hid = true; }
    var shown = false;
    function move(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (!shown) { g.set([ring, dot], { x: e.clientX, y: e.clientY }); root.classList.add('is-on'); shown = true; }
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    }
    function over(e) {
      var t = e.target;
      if (t.closest && t.closest(FIELD)) { root.classList.add('is-field'); return; }
      root.classList.remove('is-field');
      var hot = t.closest && t.closest(HOT);
      var txt = hot && hot.getAttribute('data-cursor');
      root.classList.toggle('is-hot', !!hot);
      root.classList.toggle('has-label', !!(txt && txt !== 'true'));
      label.textContent = txt && txt !== 'true' ? txt : '';
    }
    function leave() { root.classList.remove('is-on'); shown = false; }
    function down() { root.classList.add('is-down'); }
    function up() { root.classList.remove('is-down'); }
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down); window.addEventListener('pointerup', up);
    st.off.push(function () {
      window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up);
      g.killTweensOf([ring, dot]);
    });
  }

  function trail(el, st, g) {
    var urls = String(SD.data(el, 'images', '')).split('|').map(function (s) { return s.trim(); }).filter(Boolean);
    Array.prototype.forEach.call(el.querySelectorAll('[data-trail-src]'), function (i) { urls.push(i.getAttribute('data-trail-src') || i.currentSrc || i.src); });
    var tpl = el.querySelector('template');
    if (tpl) Array.prototype.forEach.call(tpl.content.querySelectorAll('img'), function (i) { urls.push(i.getAttribute('src')); });
    if (!urls.length) return;
    var threshold = SD.data(el, 'threshold', 90);
    var poolN = Math.max(3, SD.data(el, 'pool', 8));
    var size = SD.data(el, 'size', 'min(22vw, 260px)');
    if (getComputedStyle(el).position === 'static') { el.style.position = 'relative'; st.pos = true; }
    var layer = document.createElement('div');
    layer.className = 'sd-trail'; layer.setAttribute('aria-hidden', 'true');
    layer.style.setProperty('--trail-size', size);
    el.appendChild(layer);
    st.nodes.push(layer);
    var pool = [];
    for (var i = 0; i < poolN; i++) {
      var im = document.createElement('img');
      im.alt = ''; im.decoding = 'async'; im.draggable = false; im.className = 'sd-trail__img';
      im.src = urls[i % urls.length];
      layer.appendChild(im); pool.push(im);
    }
    g.set(pool, { autoAlpha: 0, xPercent: -50, yPercent: -50 });
    var idx = 0, img = 0, lx = null, ly = null, z = 1;
    function move(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      if (lx === null) { lx = x; ly = y; return; }
      var d = Math.hypot(x - lx, y - ly);
      if (d < threshold) return;
      var el2 = pool[idx % poolN]; idx++;
      el2.src = urls[img % urls.length]; img++;
      el2.style.zIndex = ++z;
      var ang = Math.atan2(y - ly, x - lx);
      g.killTweensOf(el2);
      g.timeline()
        .fromTo(el2, { x: lx, y: ly, autoAlpha: 1, scale: 0.55, rotation: g.utils.random(-8, 8) }, { x: x, y: y, scale: 1, duration: 0.5, ease: 'expo.out' })
        .to(el2, { autoAlpha: 0, scale: 0.35, x: x + Math.cos(ang) * 30, y: y + Math.sin(ang) * 30 + 40, duration: 0.7, ease: 'power3.in' }, 0.45);
      lx = x; ly = y;
    }
    function reset() { lx = ly = null; }
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', reset);
    st.off.push(function () { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); g.killTweensOf(pool); if (st.pos) el.style.position = ''; });
  }

  function init(el) {
    if (store.has(el)) destroy(el);
    var st = { off: [], nodes: [], mm: null, hid: false };
    store.set(el, st);
    var g = window.gsap;
    if (!g) return;
    st.mm = g.matchMedia();
    st.mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', function () {
      if (SD.data(el, 'variant', 'follower') === 'trail') trail(el, st, g); else follower(el, st, g);
      return function () { teardown(st); };
    });
  }
  function teardown(st) {
    st.off.forEach(function (f) { try { f(); } catch (e) {} });
    st.off = [];
    st.nodes.forEach(function (n) { n.remove(); });
    st.nodes = [];
    if (st.hid) { document.documentElement.classList.remove('sd-cursor-hide'); st.hid = false; }
  }
  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.mm) st.mm.revert();
    teardown(st);
    if (el.getAttribute('style') === '') el.removeAttribute('style');
    var h = document.documentElement; if (h.getAttribute('class') === '') h.removeAttribute('class');
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
