/* studio-design · fx/sphere.js — "Img Sphere": images on a draggable 3D Fibonacci sphere.
   Ported idea: a common effect prompt "Img Sphere" (Fibonacci distribution + pole bonus, Y-then-X rotation, drag momentum, auto-rotate,
   depth fade/scale, modal). Own vanilla code: one rAF loop writes transform/opacity directly; CSS perspective does the depth.
   Markup:
     <div class="sd-sphere" data-fx="sphere" aria-label="Project gallery">
       <ul class="sd-sphere__list" role="list">
         <li><button type="button" class="sd-sphere__item" data-title="Title" data-text="Caption"><img src alt="…"></button></li> …
       </ul>
     </div>
   Params (data-* on .sd-sphere):
     data-radius        number  0 (auto = 40% of box)   ACF number (px)
     data-item-size     number  0 (auto = density-based) ACF number (px)
     data-auto-rotate   bool    true    ACF true_false
     data-speed         number  18      ACF number — auto-rotate deg/s (prompt: 0.3°/frame)
     data-sensitivity   number  0.5     ACF number — drag deg per px
     data-decay         number  0.95    ACF number — momentum decay per frame (60fps)
     data-max-speed     number  5       ACF number — max momentum deg/frame
     data-modal         bool    true    ACF true_false — click opens <dialog> (otherwise links/buttons behave natively)
     data-label-close   string  "Close" ACF text ; data-hint string "" (small hint under sphere, e.g. "Drag to explore")
   Keyboard: sphere is focusable; ←/→/↑/↓ rotate; Tab through items rotates the focused one to the front; Enter opens.
   Events: "sd:sphere:open" {detail:{index}}.
   Reduced motion: no auto-rotate, no momentum (drag/keys still work, frames rendered on demand). Offscreen: loop paused (IO). */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();
  var D2R = Math.PI / 180;
  var ICON_X = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  // deterministic PRNG so layout is stable between reloads (no layout jump on ACF preview re-init)
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  function positions(n) {
    var out = [], inc = 2 * Math.PI / ((1 + Math.sqrt(5)) / 2), rand = rng(1337);
    for (var i = 0; i < n; i++) {
      var t = (i + 0.5) / n;
      var phi = Math.acos(1 - 2 * t) / D2R;          // 0..180 from the top
      var theta = (inc * i / D2R) % 360;
      var bonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35; // push toward poles for fuller coverage
      phi = phi < 90 ? Math.max(5, phi - bonus) : Math.min(175, phi + bonus);
      phi = 15 + (phi / 180) * 150;
      theta = (theta + (rand() - 0.5) * 20) % 360;
      phi = Math.max(0, Math.min(180, phi + (rand() - 0.5) * 10));
      var p = phi * D2R, th = theta * D2R;
      out.push({ x: Math.sin(p) * Math.cos(th), y: Math.cos(p), z: Math.sin(p) * Math.sin(th) }); // unit vectors, y up
    }
    return out;
  }
  function wrapDeg(a) { a = (a + 180) % 360; if (a < 0) a += 360; return a - 180; }

  function init(el) {
    if (store.has(el)) return;
    var list = el.querySelector('.sd-sphere__list'); if (!list) return;
    var lis = Array.prototype.slice.call(list.children);
    var btns = lis.map(function (li) { return li.querySelector('.sd-sphere__item'); });
    var n = lis.length; if (!n) return;
    var st = { off: [], built: [], raf: 0 };
    store.set(el, st);
    var reduced = SD.reduced();
    var P = positions(n);
    var rot = { x: -8, y: 0 }, vel = { x: 0, y: 0 }, target = null;
    var R = 200, dir = SD.dir(el);
    var auto = SD.data(el, 'auto-rotate', true) && !reduced;
    var speed = SD.data(el, 'speed', 18), sens = SD.data(el, 'sensitivity', 0.5), decay = SD.data(el, 'decay', 0.95), vmax = SD.data(el, 'max-speed', 5);
    var dragging = false, moved = 0, lastX = 0, lastY = 0, hovering = false, visible = true, lastT = 0;

    el.classList.add('is-ready');
    // every item is on screen at once: native lazy-loading misjudges 3D-transformed images, so load them eagerly
    el.querySelectorAll('img[loading="lazy"]').forEach(function (im) { im.loading = 'eager'; });
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    if (!el.getAttribute('role')) el.setAttribute('role', 'group');
    if (SD.data(el, 'hint', '')) { var h = document.createElement('p'); h.className = 'sd-sphere__hint'; h.setAttribute('aria-hidden', 'true'); h.textContent = SD.data(el, 'hint', ''); el.appendChild(h); st.built.push(h); }

    function measure() {
      var box = el.getBoundingClientRect();
      R = SD.data(el, 'radius', 0) || Math.min(box.width, box.height) * 0.4;
      var size = SD.data(el, 'item-size', 0) || Math.round(R * Math.sqrt(4 * Math.PI / n) * 0.8); // density-aware: ~80% of Fibonacci spacing
      el.style.setProperty('--sphere-item', size + 'px');
      el.style.setProperty('--sphere-persp', Math.round(R * 4.5) + 'px');
    }
    measure();

    function render() {
      var ry = rot.y * D2R, rx = rot.x * D2R, cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      for (var i = 0; i < n; i++) {
        var p = P[i];
        // Y rotation (horizontal drag) then X rotation (vertical drag)
        var x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        var y2 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
        var depth = (z2 + 1) / 2;                                  // 0 back .. 1 front
        var alpha = 0.2 + 0.8 * Math.max(0, Math.min(1, (z2 + 0.3) / 0.6)); // back hemisphere stays faintly visible (reads as a ball)
        var s = 0.62 + depth * 0.38;
        var li = lis[i];
        li.style.transform = 'translate3d(' + (x1 * R).toFixed(1) + 'px,' + (-y2 * R).toFixed(1) + 'px,' + (z2 * R).toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
        li.style.opacity = alpha.toFixed(3);
        li.style.zIndex = String(Math.round(depth * 1000));
        var hidden = z2 < -0.15;
        if (hidden !== li._h) { li._h = hidden; li.style.pointerEvents = hidden ? 'none' : ''; }
      }
    }
    function faceTarget(i) {
      var p = P[i];
      var a = Math.atan2(-p.x, p.z) / D2R;           // Y rotation that brings the point to x=0
      var z1 = Math.sqrt(p.x * p.x + p.z * p.z);
      var b = Math.atan2(p.y, z1) / D2R;             // X rotation that brings it to y=0
      // choose the equivalent angle closest to the current rotation
      target = { x: rot.x + wrapDeg(b - rot.x), y: rot.y + wrapDeg(a - rot.y) };
      kick();
    }

    function frame(t) {
      st.raf = 0;
      var dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 1 / 60; lastT = t;
      var f = dt * 60, active = false;
      if (target) {
        var k = reduced ? 1 : 1 - Math.pow(0.86, f);
        rot.x += (target.x - rot.x) * k; rot.y += (target.y - rot.y) * k;
        if (Math.abs(target.x - rot.x) < 0.05 && Math.abs(target.y - rot.y) < 0.05) { rot.x = target.x; rot.y = target.y; target = null; }
        else active = true;
      } else if (!dragging) {
        if (!reduced && (Math.abs(vel.x) > 0.01 || Math.abs(vel.y) > 0.01)) {
          rot.y += vel.y * f; rot.x += vel.x * f;
          var d = Math.pow(decay, f); vel.x *= d; vel.y *= d; active = true;
        }
        if (auto && !hovering && !kbFocus()) { rot.y += speed * dt * dir; active = true; }
      }
      rot.x = Math.max(-80, Math.min(80, rot.x));
      render();
      if ((active || dragging) && visible && !document.hidden && !st.modal) st.raf = requestAnimationFrame(frame);
      else lastT = 0;
    }
    function kbFocus() { try { return el.matches(':focus-visible') || !!el.querySelector(':focus-visible'); } catch (_) { return false; } }
    function kick() { if (!st.raf && visible && !st.modal) st.raf = requestAnimationFrame(frame); }

    // ---- pointer drag with momentum
    var onDown = function (e) {
      if (e.button > 0) return;
      dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; vel.x = vel.y = 0; target = null;
      el.classList.add('is-dragging');
      kick();
    };
    var onMove = function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 6 && !el.hasPointerCapture(e.pointerId)) { try { el.setPointerCapture(e.pointerId); } catch (_) {} }
      rot.y += dx * sens; rot.x += dy * sens;
      vel.y = Math.max(-vmax, Math.min(vmax, dx * sens)); vel.x = Math.max(-vmax, Math.min(vmax, dy * sens));
    };
    var onUp = function () { if (!dragging) return; dragging = false; el.classList.remove('is-dragging'); kick(); };
    var onClickCapture = function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } };
    var onEnter = function () { hovering = true; }, onLeave = function () { hovering = false; kick(); };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp); window.addEventListener('pointercancel', onUp);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('pointerenter', onEnter); el.addEventListener('pointerleave', onLeave);
    // ---- keyboard
    var onKey = function (e) {
      var k = e.key, step = e.shiftKey ? 45 : 15;
      var m = { ArrowLeft: [0, -step * dir], ArrowRight: [0, step * dir], ArrowUp: [-step, 0], ArrowDown: [step, 0] }[k];
      if (!m) return;
      e.preventDefault();
      var base = target || rot;
      target = { x: Math.max(-80, Math.min(80, base.x + m[0])), y: base.y + m[1] };
      kick();
    };
    var onFocusIn = function (e) { var i = btns.indexOf(e.target); if (i > -1) faceTarget(i); kick(); };
    var onFocusOut = function () { kick(); };
    el.addEventListener('keydown', onKey); el.addEventListener('focusin', onFocusIn); el.addEventListener('focusout', onFocusOut);

    // ---- dialog
    if (SD.data(el, 'modal', true)) {
      var dlg = document.createElement('dialog'); dlg.className = 'sd-sphere__dialog';
      dlg.innerHTML = '<div class="sd-sphere__dlg-inner"><img alt=""><div class="sd-sphere__dlg-copy"><h3></h3><p></p></div></div>' +
        '<button type="button" class="sd-sphere__close" aria-label="' + SD.data(el, 'label-close', 'Close') + '">' + ICON_X + '</button>';
      var hid = 'sds' + Math.random().toString(36).slice(2, 8); dlg.querySelector('h3').id = hid; dlg.setAttribute('aria-labelledby', hid);
      el.after(dlg); st.built.push(dlg);
      var trigger = null;
      var onItem = function (e) {
        var b = e.target.closest('.sd-sphere__item'); if (!b || !el.contains(b)) return;
        if (b.tagName === 'A' && !b.hasAttribute('data-modal')) return; // real links navigate
        e.preventDefault();
        var img = b.querySelector('img'), i = btns.indexOf(b);
        trigger = b;
        var di = dlg.querySelector('img'), thumb = img ? (img.currentSrc || img.src) : '', full = b.getAttribute('data-full');
        di.src = thumb; // instant (cached thumb), then upgrade to the full image when it has loaded
        if (full && full !== thumb) { var pre = new Image(); pre.onload = function () { if (trigger === b) di.src = full; }; pre.src = full; }
        dlg.querySelector('img').alt = img ? img.alt : '';
        dlg.querySelector('h3').textContent = b.getAttribute('data-title') || (img && img.alt) || '';
        var tx = b.getAttribute('data-text') || ''; var pp = dlg.querySelector('p'); pp.textContent = tx; pp.hidden = !tx;
        if (SD.lenis) SD.lenis.stop();
        st.modal = true; dlg.showModal();
        el.dispatchEvent(new CustomEvent('sd:sphere:open', { bubbles: true, detail: { index: i } }));
      };
      var onDlgClick = function (e) { if (e.target === dlg || e.target.closest('.sd-sphere__close')) dlg.close(); };
      var onClose = function () { st.modal = false; kick(); if (SD.lenis) SD.lenis.start(); if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true }); trigger = null; };
      el.addEventListener('click', onItem); dlg.addEventListener('click', onDlgClick); dlg.addEventListener('close', onClose);
      st.off.push(function () { el.removeEventListener('click', onItem); dlg.removeEventListener('click', onDlgClick); dlg.removeEventListener('close', onClose); if (dlg.open) dlg.close(); });
    }

    // ---- visibility + resize
    st.off.push(SD.onVisible(el, function (v) { visible = v; if (v) kick(); else { cancelAnimationFrame(st.raf); st.raf = 0; lastT = 0; } }, { rootMargin: '100px' }));
    var onVis = function () { if (!document.hidden) kick(); };
    document.addEventListener('visibilitychange', onVis);
    var ro = new ResizeObserver(function () { measure(); render(); });
    ro.observe(el);
    render(); kick();

    st.off.push(function () {
      cancelAnimationFrame(st.raf); ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onUp);
      el.removeEventListener('click', onClickCapture, true); el.removeEventListener('pointerenter', onEnter); el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('keydown', onKey); el.removeEventListener('focusin', onFocusIn); el.removeEventListener('focusout', onFocusOut);
      el.classList.remove('is-ready', 'is-dragging');
      el.style.removeProperty('--sphere-item'); el.style.removeProperty('--sphere-persp');
      lis.forEach(function (li) { li.removeAttribute('style'); li._h = undefined; });
    });
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.built.forEach(function (n) { n.remove(); });
    store.delete(el);
  }
  SD.fx.sphere = { init: init, destroy: destroy };
})();
