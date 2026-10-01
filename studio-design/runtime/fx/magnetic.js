/* studio-design fx · magnetic
   Button (and its label, a bit more) is pulled toward the cursor inside a radius, then springs back.
   Pointer:fine only; no-op on touch and with reduced motion. Transform only (gsap.quickTo).
   Markup: <a class="btn" href="#" data-fx="magnetic"><span data-magnetic-label>Book a call</span></a>
       or  <nav data-fx="magnetic"> … </nav>  (applies to every a / button / [data-magnetic] inside)
   Params (data-*)                               type    default  ACF field
     data-strength    pull of the element (0–1)       number  0.35     Number
     data-label       extra pull of the label (0–1)   number  0.6      Number   (label = [data-magnetic-label] or first child span)
     data-radius      activation distance beyond the element edge, px   number 60   Number
     data-return      spring back ease                 text    "elastic.out(1, 0.35)"  Text */
(function () {
  'use strict';
  var NAME = 'magnetic';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  function init(el) {
    if (store.has(el)) destroy(el);
    var st = { off: [], mm: null, nodes: [] };
    store.set(el, st);
    var g = window.gsap;
    if (!g) return;
    var targets = el.matches('a, button, [data-magnetic]') ? [el] : Array.prototype.slice.call(el.querySelectorAll('a, button, [data-magnetic]'));
    var strength = SD.data(el, 'strength', 0.35);
    var labelK = SD.data(el, 'label', 0.6);
    var radius = SD.data(el, 'radius', 60);
    var ret = SD.data(el, 'return', 'elastic.out(1, 0.35)');

    st.mm = g.matchMedia();
    st.mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', function () {
      var items = targets.map(function (t) {
        var label = t.querySelector('[data-magnetic-label]') || (t.firstElementChild && t.firstElementChild.tagName === 'SPAN' ? t.firstElementChild : null);
        st.nodes.push(t); if (label) st.nodes.push(label);
        return { t: t, label: label, active: false, rect: null, xTo: null, yTo: null, lxTo: null, lyTo: null };
      });
      var raf = null, px = 0, py = 0;
      function arm(it) {
        it.xTo = g.quickTo(it.t, 'x', { duration: 0.5, ease: 'power3.out' });
        it.yTo = g.quickTo(it.t, 'y', { duration: 0.5, ease: 'power3.out' });
        if (it.label) { it.lxTo = g.quickTo(it.label, 'x', { duration: 0.5, ease: 'power3.out' }); it.lyTo = g.quickTo(it.label, 'y', { duration: 0.5, ease: 'power3.out' }); }
      }
      function release(it) {
        it.active = false;
        g.to(it.t, { x: 0, y: 0, duration: 1.1, ease: ret, overwrite: true });
        if (it.label) g.to(it.label, { x: 0, y: 0, duration: 1.1, ease: ret, overwrite: true });
        it.xTo = it.yTo = it.lxTo = it.lyTo = null;
      }
      function tick() {
        raf = null;
        items.forEach(function (it) {
          var r = it.rect || (it.rect = it.t.getBoundingClientRect());
          // rect is measured without our transform (cached at rest), so the hit-zone doesn't chase the button
          var inside = px > r.left - radius && px < r.right + radius && py > r.top - radius && py < r.bottom + radius;
          if (inside) {
            if (!it.active) { it.active = true; arm(it); }
            var dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2);
            it.xTo(dx * strength); it.yTo(dy * strength);
            if (it.label) { it.lxTo(dx * strength * labelK); it.lyTo(dy * strength * labelK); }
          } else if (it.active) release(it);
        });
      }
      function onMove(e) { if (e.pointerType && e.pointerType !== 'mouse') return; px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(tick); }
      function invalidate() { items.forEach(function (it) { if (!it.active) it.rect = null; }); }
      function onLeaveDoc() { items.forEach(function (it) { if (it.active) release(it); }); }
      // listen only while the element is near the viewport
      var listening = false;
      var offVis = SD.onVisible(el, function (v) {
        if (v && !listening) { window.addEventListener('pointermove', onMove, { passive: true }); listening = true; }
        if (!v && listening) { window.removeEventListener('pointermove', onMove); listening = false; onLeaveDoc(); }
      }, { rootMargin: '200px' });
      var offScroll = SD.onScroll(invalidate);
      window.addEventListener('resize', invalidate);
      document.documentElement.addEventListener('pointerleave', onLeaveDoc);
      return function () {
        offVis(); if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        offScroll();
        window.removeEventListener('resize', invalidate);
        document.documentElement.removeEventListener('pointerleave', onLeaveDoc);
        items.forEach(function (it) { g.killTweensOf([it.t, it.label].filter(Boolean)); g.set([it.t, it.label].filter(Boolean), { clearProps: 'transform' }); });
      };
    });
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.mm) st.mm.revert();
    st.nodes.forEach(tidy);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
