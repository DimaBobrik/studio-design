/* studio-design · fx/globe.js — WebGL dotted globe using `cobe` (MIT, github.com/shuding/cobe) loaded as ESM from jsdelivr
   (dynamic import() works from this classic script — no bundler). Markers + arcs come from the same route list as fx/map.
   Markup:
     <div class="sd-globe" data-fx="globe">
       <ul class="sd-map__routes"><li data-from="32.08,34.78" data-to="40.71,-74.0" data-label-from="Tel Aviv" data-label-to="New York">…</li></ul>
     </div>
   Params (data-* on .sd-globe):
     data-src      string  https://cdn.jsdelivr.net/npm/cobe@2.0.1/+esm   ACF text — module URL (self-host for production)
     data-speed    number  0.12   ACF number — auto-rotation, radians per second
     data-theta    number  0.28   ACF number — tilt (radians)
     data-dark     number  0      ACF number 0–1 (1 = dark globe)
     data-samples  number  16000  ACF number — dot count (cost!)
     data-base / data-marker / data-glow / data-arc   string CSS colours; default from tokens (--c-surface-2, --c-accent, --c-canvas)
     data-arcs     bool    true   ACF true_false — draw routes as arcs
     data-center   string  ""     ACF text "lat,lng" — rotate so this point faces the viewer at start (e.g. Israel "31.5,34.9")
   Drag (pointer) rotates with a little momentum; loop paused offscreen / hidden tab; DPR capped at 1.5; canvas aria-hidden
   (the route list stays as the accessible alternative). Reduced motion: one static frame (no auto-rotate).
   WebGL unavailable -> the module leaves the route list visible and adds .is-fallback. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();
  var modPromise = {};

  function rgb(color, ctxEl) {
    // resolve any CSS colour (oklch, color-mix, var()) to [r,g,b] 0..1 via a 1px canvas
    var probe = document.createElement('span'); probe.style.color = color; ctxEl.appendChild(probe);
    var cs = getComputedStyle(probe).color; probe.remove();
    var c = document.createElement('canvas'); c.width = c.height = 1; var x = c.getContext('2d');
    x.fillStyle = cs; x.fillRect(0, 0, 1, 1); var d = x.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255];
  }
  function ll(s) { var p = String(s || '').split(','); return [parseFloat(p[0]), parseFloat(p[1])]; }

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], alive: true, raf: 0 };
    store.set(el, st);
    var src = SD.data(el, 'src', 'https://cdn.jsdelivr.net/npm/cobe@2.0.1/+esm');
    var canvas = document.createElement('canvas'); canvas.setAttribute('aria-hidden', 'true');
    el.insertBefore(canvas, el.firstChild);
    st.off.push(function () { canvas.remove(); });

    var routes = Array.prototype.slice.call(el.querySelectorAll('[data-from][data-to]'));
    var markers = [], arcs = [], seen = {};
    routes.forEach(function (li) {
      var a = ll(li.getAttribute('data-from')), b = ll(li.getAttribute('data-to'));
      [a, b].forEach(function (p) { var k = p.join(); if (!seen[k]) { seen[k] = 1; markers.push({ location: p, size: 0.045 }); } });
      arcs.push({ from: a, to: b });
    });

    (modPromise[src] = modPromise[src] || import(src)).then(function (mod) {
      if (!st.alive) return;
      var createGlobe = mod.default || mod.createGlobe;
      var reduced = SD.reduced(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      var size = function () { return Math.max(1, Math.round(el.getBoundingClientRect().width)); };
      var w = size();
      var center = SD.data(el, 'center', '');
      var phi = 0, theta = SD.data(el, 'theta', 0.28), speed = SD.data(el, 'speed', 0.12);
      if (center) { var c = ll(center); phi = -(c[1] * Math.PI / 180) - Math.PI / 2; theta = c[0] * Math.PI / 180 * 0.6; }
      var cs = function (k, d) { return rgb(SD.data(el, k, d), el); };
      var opts = {
        devicePixelRatio: dpr, width: w, height: w, phi: phi, theta: theta,
        dark: SD.data(el, 'dark', 0), diffuse: 1.2, mapSamples: SD.data(el, 'samples', 16000), mapBrightness: 6,
        baseColor: cs('base', 'var(--c-surface-2)'), markerColor: cs('marker', 'var(--c-accent)'), glowColor: cs('glow', 'var(--c-canvas)'),
        arcColor: cs('arc', 'var(--c-accent)'), arcWidth: 0.6, arcHeight: 0.3, markerElevation: 0.02,
        markers: markers, arcs: SD.data(el, 'arcs', true) ? arcs : []
      };
      var globe, headBefore = Array.prototype.slice.call(document.head.children);
      try { globe = createGlobe(canvas, opts); } catch (e) { el.classList.add('is-fallback'); return; }
      // cobe v2 wraps the canvas in a positioning <div> and appends a <style> to <head> (CSS anchor markers) — undo both on destroy
      var wrap = canvas.parentElement !== el ? canvas.parentElement : null;
      var headAdded = Array.prototype.filter.call(document.head.children, function (n) { return headBefore.indexOf(n) < 0; });
      st.off.push(function () { if (wrap) wrap.remove(); headAdded.forEach(function (n) { n.remove(); }); });
      el.classList.add('is-ready');
      st.off.push(function () { globe.destroy(); });

      var visible = true, drag = null, vel = 0, last = 0;
      var frame = function (t) {
        st.raf = 0;
        var dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60; last = t;
        if (!drag) { phi += (reduced ? 0 : speed * SD.dir(el)) * dt + vel; vel *= 0.92; }
        globe.update({ phi: phi, theta: theta });
        if (visible && !document.hidden && (!reduced || drag || Math.abs(vel) > 0.0005)) st.raf = requestAnimationFrame(frame);
        else last = 0;
      };
      var kick = function () { if (!st.raf && visible) st.raf = requestAnimationFrame(frame); };
      globe.update({ phi: phi, theta: theta });
      kick();

      var down = function (e) { drag = { x: e.clientX, y: e.clientY, phi: phi, theta: theta, lx: e.clientX }; el.classList.add('is-dragging'); try { canvas.setPointerCapture(e.pointerId); } catch (x) {} kick(); };
      var move = function (e) {
        if (!drag) return;
        var k = Math.PI / w;
        phi = drag.phi + (e.clientX - drag.x) * k; theta = Math.max(-0.9, Math.min(0.9, drag.theta + (e.clientY - drag.y) * k * 0.6));
        vel = reduced ? 0 : (e.clientX - drag.lx) * k * 0.5; drag.lx = e.clientX;
      };
      var up = function () { if (!drag) return; drag = null; el.classList.remove('is-dragging'); kick(); };
      canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
      canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
      var ro = new ResizeObserver(function () { var nw = size(); if (Math.abs(nw - w) > 2) { w = nw; globe.update({ width: w, height: w }); canvas.width = w * dpr; canvas.height = w * dpr; kick(); } });
      ro.observe(el);
      var stopIO = SD.onVisible(el, function (v) { visible = v; if (v) kick(); else { cancelAnimationFrame(st.raf); st.raf = 0; last = 0; } });
      var onVis = function () { if (!document.hidden) kick(); };
      document.addEventListener('visibilitychange', onVis);
      st.off.push(function () {
        cancelAnimationFrame(st.raf); ro.disconnect(); stopIO(); document.removeEventListener('visibilitychange', onVis);
        canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
        canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up);
      });
    }).catch(function (err) { el.classList.add('is-fallback'); if (window.console) console.warn('[SD globe] could not load cobe:', err && err.message); });
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.alive = false;
    st.off.forEach(function (f) { f(); });
    el.classList.remove('is-ready', 'is-dragging', 'is-fallback');
    store.delete(el);
  }
  SD.fx.globe = { init: init, destroy: destroy };
})();
