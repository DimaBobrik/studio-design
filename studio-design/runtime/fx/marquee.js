/* studio-design fx · marquee
   Seamless loop for logos, testimonials, CTA strips, tickers. Variable item widths, RTL-aware, a11y-safe.
   Markup:
     <div data-fx="marquee" aria-label="Clients">
       <ul class="sd-marquee__track" role="list"> <li>…</li> <li>…</li> … </ul>   (or any single child element)
     </div>
   The first element child is the track; its children are the items. Clones are aria-hidden + inert.
   Params (data-*)                              type     default   ACF field
     data-speed        px per second                 number   60        Number
     data-direction    auto|reverse (reverse = toward inline-end)  select auto   Select
     data-gap          gap between items (CSS length) text     from CSS  Text
     data-pause-hover  slow to a stop on hover/focus  boolean  true      True/False
     data-controls     show pause/play button (WCAG 2.2.2)  boolean true  True/False
     data-draggable    drag / flick with inertia      boolean  false     True/False
     data-velocity     react to scroll speed + direction  boolean false   True/False
     data-skew         max skew (deg) with velocity   number   0         Number (0–10)
     data-fade         fade the inline edges          boolean  true      True/False
     data-label-pause / data-label-play   button labels   text  auto (en/he)  Text
   Reduced motion: no loop; the track becomes a native, keyboard-scrollable row (scroll-snap). Offscreen: paused. */
(function () {
  'use strict';
  var NAME = 'marquee';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }
  var ICON_PAUSE = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M4 3h3v10H4zM9 3h3v10H9z"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M4 2.5v11l9-5.5z"/></svg>';

  function init(el) {
    if (store.has(el)) destroy(el);
    var track = el.firstElementChild;
    var st = { off: [], clones: [], track: track, btn: null, cls: [] };
    store.set(el, st);
    if (!track) return;
    var addCls = function (node, c) { node.classList.add(c); st.cls.push([node, c]); };
    addCls(el, 'sd-marquee');
    addCls(track, 'sd-marquee__track');
    var gap = SD.data(el, 'gap', '');
    if (gap) { track.style.setProperty('--marquee-gap', gap); }
    if (SD.data(el, 'fade', true)) addCls(el, 'sd-marquee--fade');

    if (SD.reduced() || !window.requestAnimationFrame) {
      addCls(el, 'sd-marquee--static');
      if (!el.hasAttribute('tabindex')) { el.setAttribute('tabindex', '0'); st.tabindex = true; } // keyboard-scrollable row
      return;
    }

    var dir = SD.dir(el);
    var sign = SD.data(el, 'direction', 'auto') === 'reverse' ? -1 : 1; // 1 = content travels toward inline-start
    var speed = SD.data(el, 'speed', 60);
    var hoverPause = SD.data(el, 'pause-hover', true);
    var draggable = SD.data(el, 'draggable', false);
    var velocity = SD.data(el, 'velocity', false);
    var skewMax = Math.min(10, SD.data(el, 'skew', 0));
    var originals = Array.prototype.slice.call(track.children);
    var setW = 0, offset = 0, scale = 1, targetScale = 1, userPaused = false, visible = true, hover = false;
    var boost = 0, vdir = 1, dragging = false, dragV = 0, lastX = 0, lastT = 0, moved = 0, skew = 0;

    function build() {
      st.clones.forEach(function (c) { c.remove(); });
      st.clones = [];
      track.style.transform = '';
      var w = track.scrollWidth; // originals only (track is max-content wide)
      if (!originals.length || !w) return;
      setW = w;
      var need = Math.ceil(el.clientWidth / w) + 1;
      for (var n = 0; n < need; n++) {
        originals.forEach(function (o) {
          var c = o.cloneNode(true);
          c.setAttribute('aria-hidden', 'true');
          c.setAttribute('inert', '');
          c.setAttribute('data-marquee-clone', '');
          Array.prototype.forEach.call(c.querySelectorAll('[id]'), function (x) { x.removeAttribute('id'); });
          track.appendChild(c);
          st.clones.push(c);
        });
      }
    }
    // exact set width = first clone position - first item position (includes the gap)
    function measure() {
      if (!st.clones.length) return;
      var a = originals[0].getBoundingClientRect(), b = st.clones[0].getBoundingClientRect();
      var w = Math.abs(b.left - a.left);
      if (w) setW = w;
    }
    build(); measure(); if (setW) offset = offset % setW;

    function render() {
      var x = -offset * dir; // LTR: 0 → -setW ; RTL: 0 → +setW (track grows toward the left)
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)' + (skew ? ' skewX(' + skew.toFixed(2) + 'deg)' : '');
    }
    var last = performance.now();
    var raf = null;
    function frame(now) {
      raf = null;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var goal = (userPaused || !visible || (hover && hoverPause)) ? 0 : targetScale;
      scale += (goal - scale) * Math.min(1, dt * 6);
      boost *= Math.pow(0.02, dt); // decays over ~1s
      if (!dragging) {
        if (Math.abs(dragV) > 1) { offset += dragV * dt; dragV *= Math.pow(0.04, dt); } else dragV = 0;
        offset += speed * sign * vdir * (scale + boost) * dt;
      }
      if (setW) offset = ((offset % setW) + setW) % setW;
      if (skewMax) {
        var target = Math.max(-skewMax, Math.min(skewMax, boost * vdir * skewMax * 0.6)) * -dir;
        skew += (target - skew) * Math.min(1, dt * 8);
      }
      render();
      if (visible || Math.abs(dragV) > 1) raf = requestAnimationFrame(frame);
    }
    function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    start();

    st.off.push(SD.onVisible(el, function (v) { visible = v; if (v) start(); }, { rootMargin: '50px' }));
    var onVis = function () { visible = !document.hidden; if (visible) start(); };
    document.addEventListener('visibilitychange', onVis);
    st.off.push(function () { document.removeEventListener('visibilitychange', onVis); if (raf) cancelAnimationFrame(raf); });

    if (hoverPause) {
      var enter = function (e) { if (e.pointerType === 'mouse') hover = true; };
      var leave = function () { hover = false; };
      var fin = function () { hover = true; };
      var fout = function (e) { if (!el.contains(e.relatedTarget)) hover = false; };
      el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave);
      el.addEventListener('focusin', fin); el.addEventListener('focusout', fout);
      st.off.push(function () { el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); el.removeEventListener('focusin', fin); el.removeEventListener('focusout', fout); });
    }

    if (velocity && window.ScrollTrigger) {
      var trig = window.ScrollTrigger.create({
        trigger: el, start: 'top bottom', end: 'bottom top',
        onUpdate: function (self) {
          var v = self.getVelocity();
          vdir = self.direction === -1 ? -1 : 1;
          boost = Math.max(boost, Math.min(6, Math.abs(v) / 400));
        }
      });
      st.off.push(function () { trig.kill(); });
    }

    if (draggable) {
      addCls(el, 'sd-marquee--drag');
      var down = function (e) {
        moved = 0;
        if (e.button > 0 || e.target.closest('.sd-marquee__toggle')) return;
        dragging = true; moved = 0; dragV = 0; lastX = e.clientX; lastT = performance.now(); st.pid = e.pointerId;
      };
      var move = function (e) {
        if (!dragging) return;
        var dx = e.clientX - lastX, now = performance.now();
        moved += Math.abs(dx);
        offset -= dx * dir;
        dragV = -dx * dir / Math.max(0.008, (now - lastT) / 1000) * 0.9;
        lastX = e.clientX; lastT = now;
        if (moved > 4 && !el.classList.contains('is-dragging')) {
          el.classList.add('is-dragging');
          try { el.setPointerCapture(st.pid); } catch (err) {}
        }
        render();
      };
      var up = function () { if (!dragging) return; dragging = false; el.classList.remove('is-dragging'); dragV = Math.max(-4000, Math.min(4000, dragV)); start(); };
      var click = function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
      el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
      el.addEventListener('click', click, true);
      st.off.push(function () { el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.removeEventListener('click', click, true); });
    }

    if (SD.data(el, 'controls', true)) {
      var he = dir === -1 || /^he/i.test((el.closest('[lang]') || document.documentElement).getAttribute('lang') || '');
      var lp = SD.data(el, 'label-pause', he ? 'השהיית תנועה' : 'Pause motion');
      var lpl = SD.data(el, 'label-play', he ? 'הפעלת תנועה' : 'Play motion');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sd-marquee__toggle';
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', lp);
      b.innerHTML = ICON_PAUSE;
      b.addEventListener('click', function () {
        userPaused = !userPaused;
        b.setAttribute('aria-pressed', String(userPaused));
        b.setAttribute('aria-label', userPaused ? lpl : lp);
        b.innerHTML = userPaused ? ICON_PLAY : ICON_PAUSE;
        if (!userPaused) start();
      });
      el.appendChild(b);
      st.btn = b;
    }

    var rw = el.clientWidth;
    var ro = 'ResizeObserver' in window ? new ResizeObserver(function () {
      if (Math.abs(el.clientWidth - rw) < 2) { measure(); return; }
      rw = el.clientWidth; build(); measure(); render();
    }) : null;
    if (ro) { ro.observe(el); st.off.push(function () { ro.disconnect(); }); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (store.get(el) === st) { build(); measure(); render(); } });
    var onLoad = function () { measure(); };
    track.addEventListener('load', onLoad, true); // images inside items
    st.off.push(function () { track.removeEventListener('load', onLoad, true); });
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    st.off.forEach(function (f) { try { f(); } catch (e) {} });
    st.clones.forEach(function (c) { c.remove(); });
    if (st.btn) st.btn.remove();
    if (st.track) { st.track.style.transform = ''; st.track.style.removeProperty('--marquee-gap'); }
    st.cls.forEach(function (p) { p[0].classList.remove(p[1]); });
    el.classList.remove('is-dragging');
    if (st.tabindex) el.removeAttribute('tabindex');
    tidy(el); tidy(st.track);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
