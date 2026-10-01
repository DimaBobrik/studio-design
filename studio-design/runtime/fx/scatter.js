/* studio-design fx · scatter
   Editorial scatter field: images placed at authored positions and sizes around an anchor word/heading, each on its own
   depth, drifting at different speeds as you scroll and (optionally) assembling inward from outside the frame as the
   section arrives (seen on ~7 award-level fashion, gym, architecture and museum sites).
   Markup:
     <section data-fx="scatter" data-assemble="true" data-height="120">
       <h2 data-scatter-anchor>Twelve rooms, one archive</h2>
       <figure data-scatter-item data-x="4"  data-y="6"  data-w="18" data-depth="0.9"><img src=… alt=… width=… height=…></figure>
       <figure data-scatter-item data-x="70" data-y="12" data-w="14" data-depth="0.3"><img …></figure>
       …   (4-9 items; positions are % of the stage from the inline-start / top edge; w = % of stage width)
     </section>
   Without JS (and below data-min) the items fall back to a 2-3 column staggered grid under the anchor, so nothing
   overlaps text. With JS the stage gets the authored layout; items with depth ≥ 0.6 sit above the anchor, the rest behind.
   Params (data-*) on the host                                                      type     default  ACF field
     data-height    stage height, svh                                                 number   110      Number (70–200)
     data-range     max parallax travel at depth 1, px                                number   140      Number
     data-assemble  items fly in from outside towards their spot while the section enters  boolean false  True/False
     data-spread    assemble start distance as a multiple of each item's offset from centre  number 0.8   Number (0.2–2)
     data-pointer   pointer parallax at depth 1, px (fine pointers only; 0 = off)     number   0        Number
     data-min       minimum viewport width (px) for the scattered layout              number   720      Number
   Params on each item
     data-x / data-y  position, % of stage (x from inline-start: mirrors in RTL)     number   0 / 0    Number
     data-w           width, % of stage width                                         number   20       Number
     data-depth       0 (far, slow, behind the anchor) … 1 (near, fast, in front)     number   0.5      Number
   Motion: transform only (no opacity: captions stay at full contrast); scroll via SD.onScroll; paused offscreen. Reduced motion: authored layout, static.
   RTL: x positions are inline-start based and the fly-in vector is measured from the laid-out item, so both mirror with
   the layout; pointer parallax follows the physical pointer (no SD.dir flip).
   A11y: images keep their alt (decorative ones alt=""); the anchor is real text and never covered by depth ≥ 0.6 items:
   keep near items away from the anchor's box when authoring (the demo shows safe positions). */
(function () {
  'use strict';
  var NAME = 'scatter';
  var store = new WeakMap();
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function init(el) {
    if (store.has(el)) destroy(el);
    var items = Array.prototype.slice.call(el.querySelectorAll('[data-scatter-item]'));
    var st = { items: items, offScroll: null, offVis: null, visible: true, onMove: null, onResize: null, raf: 0, px: 0, py: 0, placed: false };
    store.set(el, st);
    el.classList.add('sd-scatter');
    var minW = SD.data(el, 'min', 720);

    function place() {
      var on = window.innerWidth >= minW;
      if (on === st.placed) return;
      st.placed = on;
      el.classList.toggle('sd-scatter--placed', on);
      if (on) {
        el.style.setProperty('--sc-h', SD.data(el, 'height', 110) + 'svh');
        items.forEach(function (it) {
          it.style.setProperty('--x', SD.data(it, 'x', 0));
          it.style.setProperty('--y', SD.data(it, 'y', 0));
          it.style.setProperty('--w', SD.data(it, 'w', 20));
          it.classList.toggle('sd-scatter__item--near', SD.data(it, 'depth', 0.5) >= 0.6);
        });
      } else {
        el.style.removeProperty('--sc-h');
        items.forEach(function (it) { ['--x', '--y', '--w'].forEach(function (p) { it.style.removeProperty(p); }); it.classList.remove('sd-scatter__item--near'); it.style.transform = ''; });
      }
    }
    place();
    st.onResize = function () { place(); if (st.update) st.update(window.scrollY); };
    window.addEventListener('resize', st.onResize, { passive: true });
    if (SD.reduced()) return;

    var range = SD.data(el, 'range', 140);
    var assemble = SD.data(el, 'assemble', false);
    var spread = SD.data(el, 'spread', 0.8);
    var pointer = SD.fine() ? SD.data(el, 'pointer', 0) : 0;
    var depths = items.map(function (it) { return clamp(SD.data(it, 'depth', 0.5), 0, 1); });

    function update() {
      if (!st.visible) return;
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      // p: +1 section centre at the viewport bottom edge … 0 centred … -1 at the top edge
      var p = clamp(((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
      var a = assemble ? clamp(1 - Math.max(0, p) / 0.75, 0, 1) : 1;
      var ea = 1 - Math.pow(1 - a, 3);
      var cx = r.width / 2, cy = r.height / 2;
      items.forEach(function (it, i) {
        if (!st.placed) return;
        var d = depths[i];
        var ty = -p * d * range + st.py * d * pointer;
        var tx = st.px * d * pointer;
        var sc = 1;
        if (assemble && ea < 1) {
          // fly in along the line from the stage centre through the item's centre (layout-mirrored, so RTL-correct)
          var ox = it.offsetLeft + it.offsetWidth / 2 - cx, oy = it.offsetTop + it.offsetHeight / 2 - cy;
          tx += ox * spread * (1 - ea);
          ty += oy * spread * (1 - ea);
          sc = 0.82 + 0.18 * ea; // no opacity fade: captions must never sit dimmed (axe contrast); the clipped stage hides the start
        }
        it.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) scale(' + sc.toFixed(3) + ')';
      });
    }
    st.update = update;
    update();
    st.offScroll = SD.onScroll(update);
    st.offVis = SD.onVisible(el, function (v) { st.visible = v; if (v) update(); }, { rootMargin: '150px' });
    if (pointer) {
      st.onMove = function (e) {
        var r = el.getBoundingClientRect();
        // physical pointer offset: the image follows the hand, so no SD.dir flip here (dir is only used for authored motion)
        st.px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        st.py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!st.raf) st.raf = requestAnimationFrame(function () { st.raf = 0; update(); });
      };
      el.addEventListener('pointermove', st.onMove, { passive: true });
    }
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.offScroll) st.offScroll();
    if (st.offVis) st.offVis();
    if (st.onMove) el.removeEventListener('pointermove', st.onMove);
    if (st.onResize) window.removeEventListener('resize', st.onResize);
    if (st.raf) cancelAnimationFrame(st.raf);
    st.items.forEach(function (it) {
      ['--x', '--y', '--w', 'transform'].forEach(function (p) { it.style.removeProperty(p); });
      it.classList.remove('sd-scatter__item--near');
      if (it.getAttribute('style') === '') it.removeAttribute('style');
      if (it.getAttribute('class') === '') it.removeAttribute('class');
    });
    el.style.removeProperty('--sc-h');
    if (el.getAttribute('style') === '') el.removeAttribute('style');
    el.classList.remove('sd-scatter', 'sd-scatter--placed');
    if (el.getAttribute('class') === '') el.removeAttribute('class');
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
