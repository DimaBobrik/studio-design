/* studio-design · fx/device.js — box-shaped products built in code: a CSS 3D box (front / back / sides / top / bottom) or a
   flat front elevation with dimension lines. For power stations, speakers, routers, appliances, packaging, boxes, cases.
   Own code, no WebGL (works everywhere, crisp at any DPR, text stays selectable in the caption, not in the object).
   Markup:
     <figure class="sd-device" data-fx="device" data-size="340,250,290" data-details="screen,ports,grille,power,handle"
             data-view="three-quarter" data-drag="true" data-label="Turn the power station">
       <svg data-face="front" viewBox="0 0 340 250">…optional own artwork…</svg>      (optional, per face)
       <img data-face="side" src="side.webp" alt="">                                    (optional)
       <figcaption>VOLTA 2000 · 2 kWh</figcaption>
     </figure>
   Faces without own artwork are token-coloured panels; the front gets generated details from data-details.
   Params (data-* on the element)                 type    default            ACF
     data-size      "width,height,depth" in any unit (mm) — proportions        text  "300,200,200"   text / 3 numbers
     data-dims      labels for the elevation dimension lines "34 cm,25 cm,29 cm"   text  from data-size + data-unit   text
     data-unit      unit appended when data-dims is empty   text   "mm"   text
     data-view      three-quarter|iso|perspective|front|side|top|elevation   select three-quarter   select
     data-rx / data-ry   explicit tilt / turn in deg (override the view)   number  view   number
     data-details   comma list for the generated front: screen, ports, grille, power, handle, feet, sockets, knob, led
                                                       text  "screen,ports,grille,power"   checkbox
     data-body      body colour (--token / --img-* / CSS colour)   text  --c-surface-2   text
     data-panel     front panel / screen colour        text  --c-ink    text
     data-detail    line / detail colour              text  --c-accent  text
     data-radius    corner radius as share of the smallest side (0–0.2)  number 0.06  number
     data-drag      drag / arrow keys turn it (role=slider)   bool  false   true_false
     data-label     accessible name of the slider       text  "Turn the product"   text
     data-auto      auto-turn deg/s (paused offscreen, off with reduced motion)   number  0   number
     data-scroll    turn with scroll while the element crosses the viewport (ScrollTrigger scrub; else SD.onScroll)   bool false   true_false
     data-degrees   scroll turn amount (deg)            number  90     number
     data-part      (on .sd-device) initial highlighted part name        text  ""   text
   API: el.sdDevice = { setAngle(ry, rx?), highlight(part|null), angle }. Parts of the generated front carry data-part
   (screen, ports, grille, power, handle, sockets, knob, led) so page glue can light the part a text block talks about.
   Behaviour: 3D transforms only (compositor), faces shaded by fixed brightness per side, contact shadow; the object never
   mirrors in RTL (physical product) and generated SVG text uses direction="ltr". Reduced motion: static at the view angle,
   no auto/scroll turn; drag still works. The whole object is aria-hidden except the drag slider role; describe it in the
   <figcaption> or alt text. */
(function () {
  'use strict';
  var NAME = 'device';
  var store = new WeakMap();
  var VIEWS = { 'three-quarter': [-12, -32], iso: [-30, -45], perspective: [-8, -24], front: [0, 0], side: [0, -90], top: [-90, 0], elevation: [0, 0] };
  var SVGNS = 'http://www.w3.org/2000/svg';

  function frontSVG(w, h, details) {
    var d = function (k) { return details.indexOf(k) > -1; }, u = Math.min(w, h), s = [];
    var pad = u * 0.07, r = u * 0.03;
    s.push('<rect class="sd-device__plate" x="' + pad + '" y="' + pad + '" width="' + (w - pad * 2) + '" height="' + (h - pad * 2) + '" rx="' + r + '"/>');
    if (d('screen')) s.push('<g data-part="screen"><rect class="sd-device__screen" x="' + pad * 1.8 + '" y="' + pad * 1.8 + '" width="' + w * 0.34 + '" height="' + h * 0.28 + '" rx="' + r * 0.6 + '"/><path class="sd-device__line" d="M' + pad * 2.4 + ' ' + (pad * 1.8 + h * 0.21) + 'h' + w * 0.2 + '"/></g>');
    if (d('sockets')) for (var i = 0; i < 2; i++) { var cx = w * (0.6 + i * 0.19), cy = h * 0.32, rr = u * 0.075;
      s.push('<g data-part="sockets"><circle class="sd-device__line" cx="' + cx + '" cy="' + cy + '" r="' + rr + '"/><path class="sd-device__line" d="M' + (cx - rr * 0.35) + ' ' + (cy - rr * 0.3) + 'v' + rr * 0.6 + 'M' + (cx + rr * 0.35) + ' ' + (cy - rr * 0.3) + 'v' + rr * 0.6 + '"/></g>'); }
    if (d('ports')) { var px = pad * 1.8, py = h * 0.62; s.push('<g data-part="ports">'); for (var p = 0; p < 4; p++) s.push('<rect class="sd-device__line" x="' + (px + p * u * 0.1) + '" y="' + py + '" width="' + u * 0.07 + '" height="' + u * 0.035 + '" rx="' + u * 0.012 + '"/>'); s.push('</g>'); }
    if (d('grille')) { s.push('<g data-part="grille">'); var gx = w * 0.52, gw = w * 0.3; for (var g = 0; g <= 8; g++) s.push('<path class="sd-device__line" d="M' + (gx + g * gw / 8) + ' ' + h * 0.58 + 'v' + h * 0.2 + '"/>'); s.push('</g>'); }
    if (d('knob')) s.push('<g data-part="knob"><circle class="sd-device__line" cx="' + w * 0.72 + '" cy="' + h * 0.4 + '" r="' + u * 0.12 + '"/><path class="sd-device__line" d="M' + w * 0.72 + ' ' + (h * 0.4 - u * 0.12) + 'v' + u * 0.06 + '"/></g>');
    if (d('led')) s.push('<circle data-part="led" class="sd-device__led" cx="' + (w - pad * 2) + '" cy="' + pad * 2 + '" r="' + u * 0.012 + '"/>');
    if (d('power')) { var bx = w - pad * 2.6, by = h - pad * 2.8, br = u * 0.045; s.push('<g data-part="power"><circle class="sd-device__line" cx="' + bx + '" cy="' + by + '" r="' + br + '"/><path class="sd-device__line" d="M' + bx + ' ' + (by - br * 0.55) + 'v' + br * 0.45 + '"/></g>'); }
    if (d('feet')) s.push('<path class="sd-device__line" d="M' + w * 0.1 + ' ' + (h - 1) + 'h' + w * 0.14 + 'M' + w * 0.76 + ' ' + (h - 1) + 'h' + w * 0.14 + '"/>');
    return '<svg class="sd-device__art" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" direction="ltr" aria-hidden="true">' + s.join('') + '</svg>';
  }
  function handleSVG(w, h) {
    return '<svg class="sd-device__art" viewBox="0 0 ' + w + ' ' + h + '" direction="ltr" aria-hidden="true" data-part="handle"><path class="sd-device__handle" d="M' + w * 0.12 + ' ' + h + 'V' + h * 0.35 + 'a' + h * 0.3 + ' ' + h * 0.3 + ' 0 0 1 ' + h * 0.3 + ' -' + h * 0.3 + 'H' + (w * 0.88 - h * 0.3) + 'a' + h * 0.3 + ' ' + h * 0.3 + ' 0 0 1 ' + h * 0.3 + ' ' + h * 0.3 + 'V' + h + '"/></svg>';
  }
  function elevationSVG(w, h, dd, details, dims) {
    var m = Math.max(w, h) * 0.14, W = w + dd * 0.9 + m * 3, H = h + m * 2.4, off = w + m * 1.2;
    var front = frontSVG(w, h, details).replace(/<svg[^>]*>|<\/svg>/g, '');
    var t = function (x, y, s, rot) { return '<text class="sd-device__dim-t" x="' + x + '" y="' + y + '" text-anchor="middle"' + (rot ? ' transform="rotate(-90 ' + x + ' ' + y + ')"' : '') + '>' + s + '</text>'; };
    var arrow = function (x1, y1, x2, y2) { return '<path class="sd-device__dim" d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + '"/><path class="sd-device__dim" d="M' + x1 + ' ' + (y1 - 5) + 'v10M' + x2 + ' ' + (y2 - 5) + 'v10"/>'; };
    var varrow = function (x, y1, y2) { return '<path class="sd-device__dim" d="M' + x + ' ' + y1 + 'V' + y2 + 'M' + (x - 5) + ' ' + y1 + 'h10M' + (x - 5) + ' ' + y2 + 'h10"/>'; };
    return '<svg class="sd-device__elev" viewBox="' + (-m) + ' ' + (-m) + ' ' + W + ' ' + H + '" direction="ltr" aria-hidden="true">' +
      '<rect class="sd-device__outline" x="0" y="0" width="' + w + '" height="' + h + '" rx="' + Math.min(w, h) * 0.05 + '"/>' + front +
      (details.indexOf('handle') > -1 ? '<g transform="translate(0 ' + (-h * 0.16) + ')">' + handleSVG(w, h * 0.16).replace(/<svg[^>]*>|<\/svg>/g, '') + '</g>' : '') +
      '<rect class="sd-device__outline" x="' + off + '" y="0" width="' + dd * 0.9 + '" height="' + h + '" rx="' + Math.min(dd, h) * 0.05 + '"/>' +
      arrow(0, h + m * 0.6, w, h + m * 0.6) + t(w / 2, h + m * 0.6 + 22, dims[0]) +
      varrow(-m * 0.5, 0, h) + t(-m * 0.5 - 12, h / 2, dims[1], true) +
      arrow(off, h + m * 0.6, off + dd * 0.9, h + m * 0.6) + t(off + dd * 0.45, h + m * 0.6 + 22, dims[2]) + '</svg>';
  }

  function colour(el, v, def) { v = v || def; return v.indexOf('--') === 0 ? 'var(' + v + ')' : v; }

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], html: el.innerHTML }; store.set(el, st);
    if (!el.classList.contains('sd-device')) { el.classList.add('sd-device'); st.addedClass = true; }
    var size = String(SD.data(el, 'size', '300,200,200')).split(',').map(parseFloat);
    var w = size[0] || 300, h = size[1] || 200, dd = size[2] || 200;
    var details = String(SD.data(el, 'details', 'screen,ports,grille,power')).split(',').map(function (s) { return s.trim(); });
    var unit = SD.data(el, 'unit', 'mm');
    var dims = String(SD.data(el, 'dims', '')).split(',').filter(Boolean); if (dims.length < 3) dims = [w + ' ' + unit, h + ' ' + unit, dd + ' ' + unit];
    var view = SD.data(el, 'view', 'three-quarter');
    el.style.setProperty('--dv-body', colour(el, SD.data(el, 'body', ''), '--c-surface-2'));
    el.style.setProperty('--dv-panel', colour(el, SD.data(el, 'panel', ''), '--c-ink'));
    el.style.setProperty('--dv-detail', colour(el, SD.data(el, 'detail', ''), '--c-accent'));
    var own = {}; Array.prototype.forEach.call(el.querySelectorAll(':scope > [data-face]'), function (n) { own[n.getAttribute('data-face')] = n; });
    var stage = document.createElement('div'); stage.className = 'sd-device__stage'; stage.setAttribute('aria-hidden', 'true');
    st.stage = stage;
    var cap = el.querySelector(':scope > figcaption');

    if (view === 'elevation') {
      stage.classList.add('is-elevation');
      stage.innerHTML = own.front ? '' : elevationSVG(w, h, dd, details, dims);
      if (own.front) stage.appendChild(own.front);
      el.insertBefore(stage, cap || null);
    } else {
      // unit box: longest side = 1 (CSS scales with --dv-s = element inline size)
      var mx = Math.max(w, h, dd), bw = w / mx, bh = h / mx, bd = dd / mx;
      el.style.setProperty('--dv-w', bw); el.style.setProperty('--dv-h', bh); el.style.setProperty('--dv-d', bd);
      el.style.setProperty('--dv-r', SD.data(el, 'radius', 0.06));
      var box = document.createElement('div'); box.className = 'sd-device__box';
      var faces = { front: [bw, bh], back: [bw, bh], right: [bd, bh], left: [bd, bh], top: [bw, bd], bottom: [bw, bd] };
      Object.keys(faces).forEach(function (f) {
        var face = document.createElement('div'); face.className = 'sd-device__face sd-device__face--' + f;
        var src = own[f] || (f === 'right' || f === 'left' ? own.side : null) || (f === 'back' ? null : null);
        if (src) face.appendChild(f === 'left' && own.side && !own.left ? src.cloneNode(true) : src);
        else if (f === 'front') face.innerHTML = frontSVG(w, h, details);
        box.appendChild(face);
      });
      if (details.indexOf('handle') > -1) { var hd = document.createElement('div'); hd.className = 'sd-device__handle-plane'; hd.innerHTML = handleSVG(w, h * 0.18); box.appendChild(hd); }
      var shadow = document.createElement('div'); shadow.className = 'sd-device__shadow';
      stage.appendChild(shadow); stage.appendChild(box);
      el.insertBefore(stage, cap || null);
      st.box = box;
    }
    Object.keys(own).forEach(function (k) { if (own[k].parentNode === el) own[k].remove(); });

    var v0 = VIEWS[view] || VIEWS['three-quarter'];
    st.rx = SD.data(el, 'rx', v0[0]); st.ry = SD.data(el, 'ry', v0[1]);
    function apply() { el.style.setProperty('--dv-rx', st.rx + 'deg'); el.style.setProperty('--dv-ry', st.ry + 'deg'); }
    apply();
    el.sdDevice = {
      setAngle: function (ry, rx) { st.ry = ry; if (rx != null) st.rx = rx; apply(); },
      highlight: function (part) { Array.prototype.forEach.call(el.querySelectorAll('[data-part]'), function (p) { p.classList.toggle('is-lit', !!part && p.getAttribute('data-part') === part); }); el.classList.toggle('has-lit', !!part); },
      get angle() { return st.ry; }
    };
    var initial = SD.data(el, 'part', ''); if (initial) el.sdDevice.highlight(initial);
    if (view === 'elevation') return;
    var reduced = SD.reduced();

    if (SD.data(el, 'drag', false)) {
      el.setAttribute('tabindex', '0'); el.setAttribute('role', 'slider'); el.setAttribute('aria-label', SD.data(el, 'label', 'Turn the product'));
      el.setAttribute('aria-valuemin', '-180'); el.setAttribute('aria-valuemax', '180');
      var aria = function () { var v = Math.round(((st.ry + 540) % 360) - 180); el.setAttribute('aria-valuenow', String(v)); el.setAttribute('aria-valuetext', v + '°'); };
      aria();
      var down = null;
      var pd = function (e) { down = { x: e.clientX, y: e.clientY, ry: st.ry, rx: st.rx }; st.dragging = true; el.setPointerCapture(e.pointerId); el.classList.add('is-dragging'); };
      var pm = function (e) { if (!down) return; st.ry = down.ry + (e.clientX - down.x) * 0.5; st.rx = Math.max(-60, Math.min(20, down.rx - (e.clientY - down.y) * 0.3)); apply(); aria(); };
      var pu = function () { down = null; st.dragging = false; el.classList.remove('is-dragging'); };
      var kd = function (e) { var k = e.key, step = e.shiftKey ? 45 : 15;
        if (k === 'ArrowLeft' || k === 'ArrowRight') { e.preventDefault(); st.ry += k === 'ArrowRight' ? step : -step; }
        else if (k === 'ArrowUp' || k === 'ArrowDown') { e.preventDefault(); st.rx = Math.max(-60, Math.min(20, st.rx + (k === 'ArrowUp' ? -10 : 10))); }
        else if (k === 'Home') { e.preventDefault(); st.rx = v0[0]; st.ry = v0[1]; } else return;
        apply(); aria(); };
      el.addEventListener('pointerdown', pd); el.addEventListener('pointermove', pm); el.addEventListener('pointerup', pu); el.addEventListener('pointercancel', pu); el.addEventListener('keydown', kd);
      st.off.push(function () { el.removeEventListener('pointerdown', pd); el.removeEventListener('pointermove', pm); el.removeEventListener('pointerup', pu); el.removeEventListener('pointercancel', pu); el.removeEventListener('keydown', kd);
        ['tabindex', 'role', 'aria-label', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-valuetext'].forEach(function (a) { el.removeAttribute(a); }); });
    }
    var auto = SD.data(el, 'auto', 0);
    if (auto && !reduced) {
      var vis = false, last = 0, loop = 0;
      var tick = function (ts) { loop = 0; if (!vis || document.hidden) return; if (last && !st.dragging) { st.ry += auto * Math.min(0.05, (ts - last) / 1000); apply(); } last = ts; loop = requestAnimationFrame(tick); };
      var offV = SD.onVisible(el, function (v) { vis = !!v; last = 0; if (vis && !loop) loop = requestAnimationFrame(tick); }, { threshold: 0 });
      st.off.push(function () { offV(); cancelAnimationFrame(loop); });
    }
    if (SD.data(el, 'scroll', false) && !reduced) {
      var degs = SD.data(el, 'degrees', 90), ry0 = st.ry;
      if (window.ScrollTrigger) {
        st.trig = window.ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.4, onUpdate: function (s) { if (!st.dragging) { st.ry = ry0 + degs * s.progress; apply(); } } });
        st.off.push(function () { st.trig.kill(); });
      } else {
        st.off.push(SD.onScroll(function () { var r = el.getBoundingClientRect(), vh = window.innerHeight; var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))); if (!st.dragging) { st.ry = ry0 + degs * p; apply(); } }));
      }
    }
  }
  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    el.innerHTML = st.html;
    ['--dv-body', '--dv-panel', '--dv-detail', '--dv-w', '--dv-h', '--dv-d', '--dv-r', '--dv-rx', '--dv-ry'].forEach(function (p) { el.style.removeProperty(p); });
    if (!el.getAttribute('style')) el.removeAttribute('style');
    el.classList.remove('is-dragging', 'has-lit'); if (st.addedClass) el.classList.remove('sd-device');
    delete el.sdDevice; store.delete(el);
  }
  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
