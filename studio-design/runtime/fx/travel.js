/* studio-design fx · travel
   One protagonist object travels through the page: it docks in a slot in each section and flies to the next slot as you
   scroll, changing size, rotation and (optionally) view on the way (seen: a fintech's payment card drifting and flipping across
   sections, an AI product's 3D string, a drinks brand's can, a mobility brand's card; studio-design patterns §"recurring protagonist").
   Markup (slots can live in different sections; DOM order = flight order):
     <main data-fx="travel" data-line="0.5" data-hold="0.18">
       <section> … <div data-travel-slot data-rotate="-8"><img src="can-front.webp" alt="…" width="600" height="900"></div> … </section>
       <section> … <div data-travel-slot data-rotate="12"><img src="can-side.webp" alt="" width="600" height="900"></div> … </section>
       <section> … <div data-travel-slot data-rotate="0"><img src="can-top.webp" alt="" width="600" height="900"></div> … </section>
     </main>
   Each slot holds its own static view, so the page is complete without JS and under reduced motion (no flight). With JS
   the slot contents are hidden visually (opacity 0, still in the accessibility tree) and one aria-hidden traveller carries
   a clone of every slot's view, crossfading view i -> i+1 during the flight. Give slots a fixed box (aspect-ratio or
   width/height) so the layout never depends on the image.
   Params (data-*) on the host                                                     type     default   ACF field
     data-line    viewport line (0 top … 1 bottom) where a slot's centre docks the object  number   0.5      Number (0.2–0.8)
     data-hold    part of each leg the object stays docked at either end (0–0.4)          number   0.18     Number
     data-ease    flight easing: smooth | linear                                         select   smooth   Select
     data-arc     sideways lift at mid-flight, px (mirrored in RTL)                        number   0        Number
     data-spin    extra rotation at mid-flight, deg (mirrored in RTL)                      number   0        Number
     data-swap    view change: fade (whole flight) | mid (quick swap at mid-flight)       select   fade     Select
     data-min     minimum viewport width (px) for the flight; below it slots stay static number   0        Number
   Params on each slot
     data-rotate  docked rotation, deg (mirrored in RTL)                                 number   0        Number
   Motion: transform + opacity only; position comes from SD.onScroll (no pins, no window listeners); paused offscreen.
   RTL: slot positions mirror with the layout; rotate/arc/spin multiply by SD.dir(). */
(function () {
  'use strict';
  var NAME = 'travel';
  var store = new WeakMap();
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { return t * t * (3 - 2 * t); }

  function init(el) {
    if (store.has(el)) destroy(el);
    var slots = Array.prototype.slice.call(el.querySelectorAll('[data-travel-slot]'));
    var st = { slots: slots, obj: null, frames: [], ghosts: [], offScroll: null, offVis: null, ro: null, visible: true, geo: null, onResize: null };
    store.set(el, st);
    el.classList.add('sd-travel');
    var minW = SD.data(el, 'min', 0);
    if (slots.length < 2 || SD.reduced() || window.innerWidth < minW) return;

    var dir = SD.dir(el);
    var line = clamp(SD.data(el, 'line', 0.5), 0, 1);
    var hold = clamp(SD.data(el, 'hold', 0.18), 0, 0.4);
    var ease = SD.data(el, 'ease', 'smooth') === 'linear' ? function (t) { return t; } : smooth;
    var arc = SD.data(el, 'arc', 0) * dir;
    var spin = SD.data(el, 'spin', 0) * dir;
    var mid = SD.data(el, 'swap', 'fade') === 'mid';
    var rots = slots.map(function (s) { return (parseFloat(s.getAttribute('data-rotate')) || 0) * dir; });

    var obj = document.createElement('div');
    obj.className = 'sd-travel__obj';
    obj.setAttribute('aria-hidden', 'true');
    slots.forEach(function (s, i) {
      var f = document.createElement('div');
      f.className = 'sd-travel__frame';
      Array.prototype.forEach.call(s.childNodes, function (n) {
        var c = n.cloneNode(true);
        if (c.nodeType === 1) {
          c.removeAttribute('id');
          Array.prototype.forEach.call(c.querySelectorAll('[id]'), function (x) { x.removeAttribute('id'); });
          if (c.tagName === 'IMG') { c.setAttribute('alt', ''); c.removeAttribute('loading'); }
          Array.prototype.forEach.call(c.querySelectorAll('img'), function (x) { x.setAttribute('alt', ''); x.removeAttribute('loading'); });
        }
        f.appendChild(c);
      });
      f.style.opacity = i === 0 ? '1' : '0';
      obj.appendChild(f);
      st.frames.push(f);
      s.classList.add('sd-travel__slot--ghost');
    });
    el.appendChild(obj);
    st.obj = obj;
    el.classList.add('sd-travel--live');

    function measure() {
      var hr = el.getBoundingClientRect(), y = window.scrollY, vh = window.innerHeight;
      var hostTop = hr.top + y;
      var g = slots.map(function (s) {
        var r = s.getBoundingClientRect();
        return { cx: r.left - hr.left + r.width / 2, cy: r.top - hr.top + r.height / 2, w: r.width, h: r.height };
      });
      var bw = g[0].w || 1, bh = g[0].h || 1;
      obj.style.inlineSize = bw + 'px';
      obj.style.blockSize = bh + 'px';
      g.forEach(function (s) { s.sc = Math.min(s.w / bw, s.h / bh) || 1; s.a = hostTop + s.cy - vh * line; });
      st.geo = { slots: g, bw: bw, bh: bh, hostW: hr.width, hostTop: hostTop, vh: vh };
    }

    function place(cx, cyDoc, sc, rot) {
      var G = st.geo;
      // obj sits at inset-inline-start: 0 — in RTL its physical left edge is hostW - bw
      var tx = cx - G.bw / 2 - (dir < 0 ? G.hostW - G.bw : 0);
      var ty = cyDoc - G.bh / 2;
      obj.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) rotate(' + rot.toFixed(2) + 'deg) scale(' + sc.toFixed(4) + ')';
    }
    function frames(i, e) {
      var k = mid ? clamp((e - 0.4) / 0.2, 0, 1) : e;
      for (var j = 0; j < st.frames.length; j++) {
        var o = j === i ? 1 - k : j === i + 1 ? k : 0;
        st.frames[j].style.opacity = o.toFixed(3);
      }
    }
    function update(y) {
      if (!st.visible || !st.geo) return;
      var G = st.geo, S = G.slots, n = S.length;
      if (y <= S[0].a) { place(S[0].cx, S[0].cy, S[0].sc, rots[0]); frames(0, 0); return; }
      if (y >= S[n - 1].a) { place(S[n - 1].cx, S[n - 1].cy, S[n - 1].sc, rots[n - 1]); frames(n - 2, 1); return; }
      var i = 0;
      while (i < n - 2 && y >= S[i + 1].a) i++;
      var A = S[i], B = S[i + 1], L = B.a - A.a || 1;
      var t = (y - A.a) / L;
      if (t <= hold) { place(A.cx, A.cy, A.sc, rots[i]); frames(i, 0); return; }
      if (t >= 1 - hold) { place(B.cx, B.cy, B.sc, rots[i + 1]); frames(i, 1); return; }
      var e = ease(clamp((t - hold) / (1 - 2 * hold), 0, 1));
      // screen-space flight between the two docked positions at the hold boundaries (continuous, no jump)
      var sA = A.cy - (A.a + hold * L - G.hostTop);          // slot A's y in host coords minus scroll offset at t = hold
      var sB = B.cy - (A.a + (1 - hold) * L - G.hostTop);    // slot B's at t = 1 - hold
      var scrollOff = y - G.hostTop;
      var cyDoc = scrollOff + lerp(sA, sB, e);
      var bump = Math.sin(Math.PI * e);
      place(lerp(A.cx, B.cx, e) + arc * bump, cyDoc, lerp(A.sc, B.sc, e), lerp(rots[i], rots[i + 1], e) + spin * bump);
      frames(i, e);
    }

    measure();
    update(window.scrollY);
    st.offScroll = SD.onScroll(update);
    st.offVis = SD.onVisible(el, function (v) { st.visible = v; if (v) update(window.scrollY); }, { rootMargin: '200px' });
    if ('ResizeObserver' in window) {
      st.ro = new ResizeObserver(function () { measure(); update(window.scrollY); });
      st.ro.observe(el);
      slots.forEach(function (s) { st.ro.observe(s); });
    }
    st.onResize = function () { measure(); update(window.scrollY); };
    window.addEventListener('resize', st.onResize, { passive: true }); // vh changes (mobile URL bar) don't resize the host
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.offScroll) st.offScroll();
    if (st.offVis) st.offVis();
    if (st.ro) st.ro.disconnect();
    if (st.onResize) window.removeEventListener('resize', st.onResize);
    if (st.obj) st.obj.remove();
    st.slots.forEach(function (s) { s.classList.remove('sd-travel__slot--ghost'); if (s.getAttribute('class') === '') s.removeAttribute('class'); });
    el.classList.remove('sd-travel', 'sd-travel--live');
    if (el.getAttribute('class') === '') el.removeAttribute('class');
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
