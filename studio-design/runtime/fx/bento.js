/* studio-design · fx/bento.js — bento grid: spotlight + border glow following the pointer, batch reveal on scroll.
   Layout is pure CSS (fx/bento.css); this module only adds the pointer light and the entrance.
   Params (data-* on the .sd-bento element):
     data-layout     string  "auto"   ACF select (auto|feature|mosaic|rail) — CSS only
     data-spotlight  bool    true     ACF true_false — surface spotlight on the hovered tile
     data-glow       bool    true     ACF true_false — border glow on every tile near the pointer (proximity)
     data-reveal     bool    true     ACF true_false — tiles rise/fade in with ScrollTrigger.batch
     data-stagger    number  0.08     ACF number — reveal stagger (s)
   Per tile: data-size = "" | wide | tall | large | hero | full  (ACF select)
   Pointer effects only on (hover:hover) and (pointer:fine). Reduced motion: no reveal, glow still static-safe. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], ctx: null, glows: [] };
    store.set(el, st);
    var tiles = Array.prototype.slice.call(el.querySelectorAll(':scope > .sd-bento__tile'));
    var useGlow = SD.data(el, 'glow', true), useSpot = SD.data(el, 'spotlight', true);
    if (!useSpot) el.style.setProperty('--bento-spot', 'transparent');

    if (useGlow) tiles.forEach(function (t) {
      var g = document.createElement('span'); g.className = 'sd-bento__glow'; g.setAttribute('aria-hidden', 'true');
      t.appendChild(g); st.glows.push(g);
    });

    if (SD.fine() && (useGlow || useSpot)) {
      var raf = 0, px = 0, py = 0;
      var paint = function () {
        raf = 0;
        for (var i = 0; i < tiles.length; i++) {
          var r = tiles[i].getBoundingClientRect();
          tiles[i].style.setProperty('--mx', (px - r.left).toFixed(1) + 'px');
          tiles[i].style.setProperty('--my', (py - r.top).toFixed(1) + 'px');
        }
      };
      var move = function (e) { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
      var enter = function () { el.classList.add('is-pointer'); };
      var leave = function () { el.classList.remove('is-pointer'); };
      el.addEventListener('pointermove', move, { passive: true });
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
      st.off.push(function () {
        cancelAnimationFrame(raf);
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave);
        el.classList.remove('is-pointer');
        tiles.forEach(function (t) { t.style.removeProperty('--mx'); t.style.removeProperty('--my'); });
      });
    }

    var g = window.gsap;
    if (g && window.ScrollTrigger && SD.data(el, 'reveal', true)) {
      st.ctx = g.context(function () {
        var mm = g.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          g.set(tiles, { autoAlpha: 0, y: 40, scale: 0.98 });
          window.ScrollTrigger.batch(tiles, {
            start: 'top 97%', once: true,
            onEnter: function (batch) {
              g.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out', stagger: SD.data(el, 'stagger', 0.08), overwrite: true, clearProps: 'transform,opacity,visibility' });
            }
          });
        });
      }, el);
    }
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.glows.forEach(function (g) { g.remove(); });
    if (st.ctx) st.ctx.revert();
    store.delete(el);
  }

  SD.fx.bento = { init: init, destroy: destroy };
})();
