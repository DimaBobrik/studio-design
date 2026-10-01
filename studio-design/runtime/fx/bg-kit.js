/* studio-design fx · bg-kit (JS part: .bg-spotlight) — requires fx/bg-kit.css
   Cursor-following radial highlight. Pointer:fine only; nothing happens on touch or with reduced motion.
   Markup: <section class="bg-spotlight" data-fx="bg-kit">…</section>                 (one surface)
       or  <div data-fx="bg-kit"> <article class="bg-spotlight bg-spotlight--rim">…</article> ×N </div>
           (card grid: ONE listener on the container drives every card, so neighbouring cards glow by proximity)
   Params (data-*)                     type     default   ACF field
     data-smooth   follow smoothing 0–1 number   0.18      Number   (1 = instant)
     data-reach    px outside a card that still lights it (grid mode)  number  120  Number
   CSS knobs: --spot-size (520px), --spot-color, --spot-rim (see bg-kit.css). Add .bg-spotlight--rim for a lit border. */
(function () {
  'use strict';
  var NAME = 'bg-kit';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  function init(el) {
    if (store.has(el)) destroy(el);
    var st = { layers: [], off: [] };
    store.set(el, st);
    var targets = el.classList.contains('bg-spotlight') ? [el] : Array.prototype.slice.call(el.querySelectorAll('.bg-spotlight'));
    if (!targets.length || !SD.fine() || SD.reduced()) return;
    var smooth = Math.min(1, Math.max(0.02, SD.data(el, 'smooth', 0.18)));
    var reach = SD.data(el, 'reach', 120);

    var items = targets.map(function (t) {
      var spot = document.createElement('span');
      spot.className = 'sd-spotlight';
      spot.setAttribute('aria-hidden', 'true');
      t.insertBefore(spot, t.firstChild);
      st.layers.push(spot);
      var rim = null;
      if (t.classList.contains('bg-spotlight--rim')) {
        rim = document.createElement('span');
        rim.className = 'sd-spotlight__rim';
        rim.setAttribute('aria-hidden', 'true');
        t.appendChild(rim);
        st.layers.push(rim);
      }
      return { t: t, spot: spot, rim: rim, x: 0, y: 0, tx: 0, ty: 0, on: false, rect: null };
    });

    var raf = null, px = 0, py = 0, inside = false;
    function measure() { items.forEach(function (it) { it.rect = it.t.getBoundingClientRect(); }); }
    function tick() {
      raf = null;
      var moving = false;
      items.forEach(function (it) {
        var r = it.rect;
        it.tx = px - r.left; it.ty = py - r.top;
        var near = inside && px > r.left - reach && px < r.right + reach && py > r.top - reach && py < r.bottom + reach;
        if (near !== it.on) {
          it.on = near;
          it.spot.classList.toggle('is-on', near);
          if (it.rim) it.rim.classList.toggle('is-on', near);
          if (near && !it.seeded) { it.x = it.tx; it.y = it.ty; it.seeded = true; }
        }
        it.x += (it.tx - it.x) * smooth; it.y += (it.ty - it.y) * smooth;
        if (Math.abs(it.tx - it.x) > 0.3 || Math.abs(it.ty - it.y) > 0.3) moving = true;
        it.t.style.setProperty('--sx', it.x.toFixed(1) + 'px');
        it.t.style.setProperty('--sy', it.y.toFixed(1) + 'px');
      });
      if (moving) raf = requestAnimationFrame(tick);
    }
    function request() { if (!raf) raf = requestAnimationFrame(tick); }
    function onMove(e) { if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return; px = e.clientX; py = e.clientY; inside = true; request(); }
    function onEnter(e) { measure(); onMove(e); }
    function onLeave() { inside = false; items.forEach(function (it) { it.seeded = false; }); request(); }
    function onScroll() { if (inside) { measure(); request(); } }
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    var offScroll = SD.onScroll(onScroll);
    window.addEventListener('resize', measure);
    measure();
    st.off.push(function () {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      offScroll();
      window.removeEventListener('resize', measure);
      items.forEach(function (it) { it.t.style.removeProperty('--sx'); it.t.style.removeProperty('--sy'); tidy(it.t); });
    });
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.layers.forEach(function (l) { l.remove(); });
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
