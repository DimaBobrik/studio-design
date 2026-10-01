/* studio-design · fx/map.js — dotted world map (SVG) with animated arcs, travelling light pulses and pulsing markers.
   Ported idea: a common effect prompt "Animated Map" (Aceternity-style world map). Own code, no runtime dependency:
   the land grid below was pre-computed once from `dotted-map` (MIT, github.com/NTag/dotted-map; diagonal grid, height 72,
   Mercator, lat −56…71, lng −168…168) and packed as hex bit-rows (83 rows × 144 bits). Arcs use the SAME projection, so
   markers sit exactly on their cities (fixes the projection mismatch of the original component).
   Markup:
     <figure class="sd-map" data-fx="map" data-color="currentColor">
       <ul class="sd-map__routes">   (kept as the accessible text alternative; visually hidden once the map renders)
         <li data-from="32.08,34.78" data-to="51.51,-0.13" data-label-from="Tel Aviv" data-label-to="London">Tel Aviv to London</li> …
       </ul>
     </figure>
   Params (data-* on figure):
     data-dot        number 0.44     ACF number — dot diameter in grid units (1 = grid spacing)
     data-arc-height number 0.28     ACF number — arc lift as a fraction of the route length
     data-stagger    number 0.5      ACF number — seconds between arcs drawing in
     data-duration   number 1.2      ACF number — seconds per arc draw
     data-pulse      bool   true     ACF true_false — light pulses travel along arcs (loop, paused offscreen)
     data-labels     bool   true     ACF true_false — city labels at markers
     data-fade       bool   true     ACF true_false — top/bottom fade mask
   Colours come from tokens: dots = --map-dot (default color-mix of --c-ink), arcs/markers = --map-accent (default --c-accent).
   The map never mirrors in RTL (geography), but label chips use logical alignment. Reduced motion: arcs drawn, no pulses. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();
  var NS = 'http://www.w3.org/2000/svg';
  var W = 143, H = 72, ROWS = 83, STEP = Math.sqrt(3) / 2, HEXW = 36;
  var LAT0 = 71, LAT1 = -56, LNG0 = -168, LNG1 = 168;
  var LAND = '0c0007e33f807ffc000010030dffffffff001f8040f99fe07ff80000380006fffffffff03ff1f3f511e0bff80001fc004dfffffffff03ffffcc089e03ff80001ff0036fffffffffe7ffffe63d8e07fe00003ff27fffffffffffe3ffffffff9787fc00003ff8ffefffffffffe3ffffffff0f87f800007ffbffdfffffffffe7fffffffe0e87f03c007fe7ffffffffffffe7fffffffd3e07c07c00fbd7ffffffffffffe0fffffffdc703e03800fbffffffffffffffe7fffffff80703c00001e7ffffffffffffffe3fffffff09901c00003e7ffffffffffffffa7fffffff03801800003e7fffffffffffffd63fbfffff01c80400003f2fffffffffffffc61c0ffffe03d00000003e7ffffffffffff8880401ffff01f8000002063ffffffffffff0180801ffff81f8000006143fffffffffffe0381000ffffe1fc000002147fffffffffffc0384000fffff3fe00000a10ffffffffffff803000017ffffbff0000091ffffffffffffff83000017ffffbff00001b7ffffffffffffff02000003ffffffe0000037ffffffffffffff80000005fffffe9000000ffffffffffffffe80000000ffffff1800003fffffffffffffff80000001fffffb0800001fffeffffffffffc80000001ffffffc000001fbfaf1ffffffffc00000001fffffd0000001ebf0f7ffffffff880000001fffffc000000f84f033ffffffff080000001fffff0000000f06ff71fffffffe100000001fffff0000000f005ff9ffffffe4000000001ffffe0000000e045ff3ffffffc4000000000fffff00000004f803ffffffffe2300000000ffffe00000007f005ffffffffc4e000000003fffc0000000ff801ffffffffe18000000003fff80000001ffeebffffffffe00000000000ff400000000ffffff7fffffff00000000001fc080000003ffffdf3ffffffe00000000000fe040000003ffffef8ffffffe00000000000bc020000007ffffeff0fffffc000000000001c020000007fffff7f87fdff0000000000001c410000007ffffe7f03f1f80000000000000fc0d000007fffff3f01f0f810000000000003c0000000ffffff3c01c07810000000000000780000007ffffff800c03c1000000000000010000000ffffffc001c05c0800000000000018b000003ffffffc00c004080000000000000bfc00003ffffff800c0400800000000000001ff00001fbffff80020104000000000000001ffc000001ffff00000b0c000000000000001ffc000000fffe0000021c000000000000007ffc000001fffc0000033a000000000000003fff800000fff80000019d0a0000000000007fffe00000fff000000183078800000000007ffff800007ff00000004001f000000000003ffff800007ff00000001803a000000000001ffff800003ff800000000001000000000001fffe000007ff8000000000c0000000000000fffe000007ff8800000001c8000000000000fffe00000fff980000000fc80000000000003ffe000007ff180000000ffc0000000000003ffc000007fc300000003ffe0000000000003ffe000003fe300000007fff0000000000003ff0000003fe30000000ffff0000000000003fe0000003fc000000007fff8000000000007fe0000003f800000000ffff8000000000003fe0000001f8000000007fff8000000000007fc0000001f0000000007fff8000000000003fc0000000f000000000787f8000000000007f000000000000000000403f0000000000007f000000000000000000001f000000000000fe000000000000000000001e0000000000007c0000000000000000000000000000000000f80000000000000000000006000000000000f80000000000000000000002000000000000f00000000000000000000000000000000000e00000000000000000000000000000000000e00000000000000000000000000000000000f00000000000000000000000000000000001e00000000000000000000000000000000000e00000000000000000000000000000000000c0000000000000000000000000000000000060000000000000000000000000000000000070000000000000000000000000';
  var dotsPath = null;
  function buildDots() {
    if (dotsPath) return dotsPath;
    var d = [];
    for (var r = 0; r < ROWS; r++) {
      var off = r % 2 === 0 ? 0.5 : 0, y = +(r * STEP).toFixed(3);
      for (var c = 0; c < HEXW; c++) {
        var n = parseInt(LAND.charAt(r * HEXW + c), 16);
        if (!n) continue;
        for (var b = 0; b < 4; b++) if (n & (8 >> b)) d.push('M' + (c * 4 + b + off) + ' ' + y + 'h0');
      }
    }
    return (dotsPath = d.join(''));
  }
  function merc(lat) { return Math.log(Math.tan(Math.PI / 4 + Math.max(-85, Math.min(85, lat)) * Math.PI / 360)); }
  function project(lat, lng) {
    return { x: (lng - LNG0) / (LNG1 - LNG0) * W, y: (merc(LAT0) - merc(lat)) / (merc(LAT0) - merc(LAT1)) * H };
  }
  function ll(s) { var p = String(s || '').split(','); return [parseFloat(p[0]), parseFloat(p[1])]; }
  function el(tag, attrs) { var n = document.createElementNS(NS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); return n; }

  function init(fig) {
    if (store.has(fig)) return;
    var st = { off: [], built: [] };
    store.set(fig, st);
    var routes = Array.prototype.slice.call(fig.querySelectorAll('[data-from][data-to]'));
    var svg = el('svg', { viewBox: '-1 -1 ' + (W + 2) + ' ' + (H + 2), class: 'sd-map__svg', 'aria-hidden': 'true', focusable: 'false', preserveAspectRatio: 'xMidYMid meet' });
    svg.appendChild(el('path', { d: buildDots(), class: 'sd-map__dots', 'stroke-width': SD.data(fig, 'dot', 0.44) }));
    var gArcs = el('g', { class: 'sd-map__arcs' }), gPulse = el('g', { class: 'sd-map__pulses' }), gMarks = el('g', { class: 'sd-map__marks' });
    svg.appendChild(gArcs); svg.appendChild(gPulse); svg.appendChild(gMarks);
    var labels = document.createElement('div'); labels.className = 'sd-map__labels'; labels.setAttribute('aria-hidden', 'true');
    var lift = SD.data(fig, 'arc-height', 0.28), seen = {}, arcs = [], pulses = [];
    routes.forEach(function (li, i) {
      var a = ll(li.getAttribute('data-from')), b = ll(li.getAttribute('data-to'));
      var p = project(a[0], a[1]), q = project(b[0], b[1]);
      var len = Math.hypot(q.x - p.x, q.y - p.y), cx = (p.x + q.x) / 2, cy = Math.min(p.y, q.y) - len * lift;
      var d = 'M' + p.x.toFixed(2) + ' ' + p.y.toFixed(2) + 'Q' + cx.toFixed(2) + ' ' + cy.toFixed(2) + ' ' + q.x.toFixed(2) + ' ' + q.y.toFixed(2);
      var arc = el('path', { d: d, class: 'sd-map__arc', pathLength: 1 }); gArcs.appendChild(arc); arcs.push(arc);
      var pl = el('path', { d: d, class: 'sd-map__pulse', pathLength: 1 }); pl.style.animationDelay = (i * 0.7).toFixed(2) + 's'; gPulse.appendChild(pl); pulses.push(pl);
      [[p, li.getAttribute('data-label-from')], [q, li.getAttribute('data-label-to')]].forEach(function (m) {
        var key = m[0].x.toFixed(1) + ',' + m[0].y.toFixed(1); if (seen[key]) return; seen[key] = 1;
        var g = el('g', { class: 'sd-map__mark', transform: 'translate(' + m[0].x.toFixed(2) + ' ' + m[0].y.toFixed(2) + ')' });
        g.appendChild(el('circle', { r: 1.6, class: 'sd-map__ring' })); g.appendChild(el('circle', { r: 0.7, class: 'sd-map__dot' }));
        gMarks.appendChild(g);
        if (m[1] && SD.data(fig, 'labels', true)) {
          var s = document.createElement('span'); s.className = 'sd-map__label'; s.textContent = m[1];
          s.style.left = ((m[0].x + 1) / (W + 2) * 100).toFixed(2) + '%'; s.style.top = ((m[0].y + 1) / (H + 2) * 100).toFixed(2) + '%';
          labels.appendChild(s);
        }
      });
    });
    var stage = document.createElement('div'); stage.className = 'sd-map__stage';
    if (SD.data(fig, 'fade', true)) stage.classList.add('is-faded');
    stage.appendChild(svg); stage.appendChild(labels);
    fig.insertBefore(stage, fig.firstChild); st.built.push(stage);
    fig.classList.add('is-ready');
    if (!SD.data(fig, 'pulse', true) || SD.reduced()) fig.classList.add('no-pulse');

    // draw-in when visible (stroke-dashoffset on pathLength=1 — works without DrawSVG)
    var g = window.gsap, stag = SD.data(fig, 'stagger', 0.5), dur = SD.data(fig, 'duration', 1.2);
    var marks = Array.prototype.slice.call(gMarks.children), labs = Array.prototype.slice.call(labels.children);
    if (g && !SD.reduced()) {
      g.set(arcs, { attr: { 'stroke-dashoffset': 1 } }); g.set(marks.concat(labs), { autoAlpha: 0 });
      var played = false;
      st.off.push(SD.onVisible(fig, function (v) {
        fig.classList.toggle('is-paused', !v);
        if (!v || played) return; played = true;
        var tl = g.timeline();
        tl.to(marks, { autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0)
          .to(labs, { autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0.2);
        arcs.forEach(function (a, i) { tl.to(a, { attr: { 'stroke-dashoffset': 0 }, duration: dur, ease: 'power2.out' }, 0.3 + i * stag); });
        tl.add(function () { fig.classList.add('is-drawn'); });
        st.tl = tl;
      }, { threshold: 0.25 }));
    } else {
      fig.classList.add('is-drawn');
      st.off.push(SD.onVisible(fig, function (v) { fig.classList.toggle('is-paused', !v); }));
    }
    st.off.push(function () { if (st.tl) st.tl.kill(); fig.classList.remove('is-ready', 'is-drawn', 'is-paused', 'no-pulse'); });
  }

  function destroy(fig) {
    var st = store.get(fig); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.built.forEach(function (n) { n.remove(); });
    store.delete(fig);
  }
  SD.fx.map = { init: init, destroy: destroy, project: project };
})();
