/* studio-design fx · shader-bg
   WebGL background engine on top of Paper Shaders (@paper-design/shaders 0.0.81, Apache-2.0,
   https://github.com/paper-design/shaders — loaded from jsDelivr as native ES modules via dynamic import();
   keep this attribution). Our code only maps tokens/data-* to Paper uniforms; no shader code is copied here.
   Markup: <section data-fx="shader-bg" data-preset="mesh-gradient"> …content… </section>
   The canvas lives in an injected .sd-shader layer (absolute, z-index -1, aria-hidden) and the host gets isolation.
   Presets: mesh-gradient | grain-gradient | god-rays | dithering | fluted-glass

   Params (data-*)                              type    default               ACF field
     data-preset        see above                 select  mesh-gradient         Select
     data-colors        list of colors: tokens (--c-accent), token with alpha (--c-accent/40),
                        or any CSS color; separated by "|" or ","    text  preset token set   Text
     data-color-back    background color (grain/god-rays/dithering/fluted)  text  preset   Text
     data-color-front   dithering ink color       text    --c-accent            Text
     data-color-bloom   god-rays bloom color      text    --c-accent            Text
     data-speed         animation speed (0 = still) number preset (.2–.5)       Number
     data-frame         start frame in ms (also the still frame for reduced motion) number 12000  Number
     data-scale / data-rotation / data-offset-x / data-offset-y   sizing        number  preset  Number
     data-shape         grain: wave|dots|truchet|corners|ripple|blob|sphere · dithering: simplex|warp|dots|wave|ripple|swirl|sphere
                        · fluted: lines|linesIrregular|wave|zigzag|pattern     select  preset  Select
     data-type          dithering matrix: random|2x2|4x4|8x8  select 4x4           Select
     data-px-size       dithering pixel size (CSS px)   number 3                 Number
     data-distortion / data-swirl / data-grain (mesh) · data-softness / data-intensity / data-noise (grain)
     · data-density / data-spotty / data-bloom / data-mid-size / data-mid-intensity (god-rays)
     · data-size (0.4) / data-shadows / data-highlights / data-edges / data-blur / data-angle / data-distortion-shape (fluted)
                                                    number  preset              Number / Select
     data-image         fluted-glass source image URL (CORS-enabled). Empty = token gradient generated on a 2D canvas.  Image (URL)
     data-scroll-shift  fluted-glass: flutes shift with scroll   boolean true   True/False
     data-mobile        live|static|fallback  (coarse pointer or < 768px)   select  live   Select
     data-pause-button  show a pause/play toggle (WCAG 2.2.2)   boolean false  True/False
   Behaviour: DPR capped at 1.5 (Paper minPixelRatio=1 + maxPixelCount), Paper pauses offscreen (IO) and on hidden tabs,
   reduced motion = single still frame, no WebGL2 / import failure = CSS gradient fallback built from the same colors. */
(function () {
  'use strict';
  var NAME = 'shader-bg';
  var VERSION = '0.0.81';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  function base() { return (window.SD && SD.paperBase) || ('https://cdn.jsdelivr.net/npm/@paper-design/shaders@' + VERSION + '/dist/'); }

  // ---------- color resolution: any CSS color / token -> [r,g,b,a] 0..1 ----------
  var cctx = null;
  function ctx2d() {
    if (!cctx) { var c = document.createElement('canvas'); c.width = c.height = 1; cctx = c.getContext('2d', { willReadFrequently: true }); }
    return cctx;
  }
  function splitList(s) {
    var out = [], depth = 0, cur = '';
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if ((ch === '|' || ch === ',') && depth === 0) { if (cur.trim()) out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function toCss(token) {
    var m = /^(--[\w-]+)(?:\/(\d+(?:\.\d+)?))?$/.exec(token);
    if (m) return m[2] ? 'color-mix(in oklab, var(' + m[1] + ') ' + m[2] + '%, transparent)' : 'var(' + m[1] + ')';
    return token;
  }
  function resolveColor(host, token) {
    var probe = document.createElement('i');
    probe.style.cssText = 'position:absolute;inline-size:0;block-size:0;visibility:hidden;';
    probe.style.color = 'rgb(0 0 0 / 0)';
    probe.style.color = toCss(token);
    host.appendChild(probe);
    var css = getComputedStyle(probe).color;
    probe.remove();
    var c = ctx2d();
    c.clearRect(0, 0, 1, 1);
    c.fillStyle = 'rgba(0,0,0,0)';
    c.fillStyle = css;
    c.fillRect(0, 0, 1, 1);
    var d = c.getImageData(0, 0, 1, 1).data;
    return { v: [d[0] / 255, d[1] / 255, d[2] / 255, d[3] / 255], css: 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3] / 255).toFixed(3) + ')' };
  }

  // ---------- presets ----------
  var num = function (el, k, d) { var v = SD.data(el, k, d); return typeof v === 'number' ? v : d; };
  var PRESETS = {
    'mesh-gradient': {
      file: 'shaders/mesh-gradient.js', exp: 'meshGradientFragmentShader', noise: false, speed: 0.3,
      colors: ['--c-canvas', '--c-surface-2', '--c-accent', '--c-accent/55'],
      sizing: { fit: 1, scale: 1 },
      uniforms: function (el, C) {
        var grain = num(el, 'grain', 0.12);
        return { u_colors: C.list, u_colorsCount: C.list.length, u_distortion: num(el, 'distortion', 0.8), u_swirl: num(el, 'swirl', 0.2), u_grainMixer: grain, u_grainOverlay: grain * 0.8 };
      }
    },
    'grain-gradient': {
      file: 'shaders/grain-gradient.js', exp: 'grainGradientFragmentShader', enumExp: 'GrainGradientShapes', noise: true, speed: 0.4,
      colors: ['--c-accent', '--c-surface-2', '--c-accent/60'], back: '--c-ink', shape: 'corners',
      sizing: { fit: 1, scale: 1 },
      uniforms: function (el, C, E) {
        return { u_colorBack: C.back, u_colors: C.list, u_colorsCount: C.list.length, u_softness: num(el, 'softness', 0.7), u_intensity: num(el, 'intensity', 0.25), u_noise: num(el, 'noise', 0.35), u_shape: E[SD.data(el, 'shape', this.shape)] || E[this.shape] };
      }
    },
    'god-rays': {
      file: 'shaders/god-rays.js', exp: 'godRaysFragmentShader', noise: true, speed: 0.35,
      colors: ['--c-accent/55', '--c-surface-2/40', '--c-canvas/30'], back: '--c-ink', bloom: '--c-accent',
      sizing: { fit: 1, scale: 1, offsetY: -0.55 },
      mirrorOffsetX: true,
      uniforms: function (el, C) {
        return { u_colorBack: C.back, u_colorBloom: C.bloom, u_colors: C.list, u_colorsCount: C.list.length, u_density: num(el, 'density', 0.3), u_spotty: num(el, 'spotty', 0.3), u_midSize: num(el, 'mid-size', 0.2), u_midIntensity: num(el, 'mid-intensity', 0.4), u_intensity: num(el, 'intensity', 0.75), u_bloom: num(el, 'bloom', 0.4) };
      }
    },
    'dithering': {
      file: 'shaders/dithering.js', exp: 'ditheringFragmentShader', enumExp: 'DitheringShapes', typesExp: 'DitheringTypes', noise: false, speed: 0.45,
      colors: [], back: '--c-canvas', front: '--c-accent', shape: 'warp', pixelated: true,
      sizing: { fit: 0, scale: 0.8 },
      uniforms: function (el, C, E, T) {
        return { u_colorBack: C.back, u_colorFront: C.front, u_shape: E[SD.data(el, 'shape', this.shape)] || E[this.shape], u_type: T[String(SD.data(el, 'type', '4x4'))] || T['4x4'], u_pxSize: num(el, 'px-size', 3) };
      }
    },
    'fluted-glass': {
      file: 'shaders/fluted-glass.js', exp: 'flutedGlassFragmentShader', enumExp: 'GlassGridShapes', typesExp: 'GlassDistortionShapes', noise: false, speed: 0, image: true,
      colors: ['--c-accent', '--c-surface-2', '--c-ink-2'], back: 'rgb(0 0 0 / 0)', shadowC: '--c-ink', highlightC: '--c-canvas', shape: 'lines',
      sizing: { fit: 2, scale: 1 },
      uniforms: function (el, C, E, T) {
        var grain = num(el, 'grain', 0.08);
        return {
          u_colorBack: C.back, u_colorShadow: C.shadow, u_colorHighlight: C.highlight,
          u_size: num(el, 'size', 0.4), u_shadows: num(el, 'shadows', 0.25), u_angle: num(el, 'angle', 0) * SD.dir(el),
          u_distortion: num(el, 'distortion', 0.5), u_shift: 0, u_blur: num(el, 'blur', 0), u_edges: num(el, 'edges', 0.25),
          u_stretch: 0, u_highlights: num(el, 'highlights', 0.1), u_shape: E[SD.data(el, 'shape', this.shape)] || E[this.shape],
          u_distortionShape: T[SD.data(el, 'distortion-shape', 'prism')] || T.prism,
          u_marginLeft: 0, u_marginRight: 0, u_marginTop: 0, u_marginBottom: 0, u_grainMixer: grain, u_grainOverlay: grain
        };
      }
    }
  };

  function colorsFor(el, P) {
    var raw = SD.data(el, 'colors', '');
    var list = raw ? splitList(String(raw)) : P.colors;
    var res = list.map(function (t) { return resolveColor(el, t); });
    var one = function (key, def) { var v = SD.data(el, key, ''); return def || v ? resolveColor(el, v || def) : null; };
    return {
      list: res.map(function (c) { return c.v; }), css: res.map(function (c) { return c.css; }),
      back: one('color-back', P.back), front: one('color-front', P.front), bloom: one('color-bloom', P.bloom),
      shadow: one('color-shadow', P.shadowC), highlight: one('color-highlight', P.highlightC)
    };
  }
  function unwrap(C) { // {v,css} -> v for the uniform builders
    var o = { list: C.list };
    ['back', 'front', 'bloom', 'shadow', 'highlight'].forEach(function (k) { o[k] = C[k] ? C[k].v : [0, 0, 0, 0]; });
    return o;
  }

  function fallbackCss(C) {
    var c = C.css.length ? C.css : [C.front ? C.front.css : 'transparent'];
    var back = C.back ? C.back.css : (c[0] || 'transparent');
    var pos = ['12% 18%', '85% 22%', '60% 88%', '20% 80%', '50% 45%'];
    var layers = c.slice(0, 5).map(function (col, i) { return 'radial-gradient(60% 70% at ' + pos[i] + ', ' + col + ' 0%, transparent 70%)'; });
    return layers.concat([back]).join(', ');
  }

  function gradientImage(C, w, h) {
    var cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    var x = cv.getContext('2d');
    var c = C.css.length ? C.css : ['#888', '#ccc', '#333'];
    var lg = x.createLinearGradient(0, 0, w, h);
    lg.addColorStop(0, c[1] || c[0]); lg.addColorStop(1, c[2] || c[0]);
    x.fillStyle = lg; x.fillRect(0, 0, w, h);
    var blobs = [[0.28, 0.35, 0.55, c[0]], [0.78, 0.7, 0.5, c[2] || c[0]], [0.62, 0.18, 0.35, c[1] || c[0]]];
    blobs.forEach(function (b) {
      var rg = x.createRadialGradient(b[0] * w, b[1] * h, 0, b[0] * w, b[1] * h, b[2] * w);
      rg.addColorStop(0, b[3]); rg.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = rg; x.fillRect(0, 0, w, h);
    });
    return new Promise(function (res, rej) { var img = new Image(); img.onload = function () { res(img); }; img.onerror = rej; img.src = cv.toDataURL('image/png'); });
  }
  function loadImage(src) {
    return new Promise(function (res, rej) { var img = new Image(); img.crossOrigin = 'anonymous'; img.onload = function () { res(img); }; img.onerror = rej; img.src = src; });
  }
  function hasWebGL2() {
    try { var c = document.createElement('canvas'); var gl = c.getContext('webgl2'); if (gl) { var l = gl.getExtension('WEBGL_lose_context'); if (l) l.loseContext(); return true; } } catch (e) {}
    return false;
  }
  var mqCoarse = function () { return window.matchMedia('(pointer: coarse), (max-width: 767px)').matches; };

  function init(el) {
    if (store.has(el)) destroy(el);
    var key = SD.data(el, 'preset', 'mesh-gradient');
    var P = PRESETS[key] || PRESETS['mesh-gradient'];
    var st = { dead: false, mount: null, ro: null, mq: null, onMq: null, st: null, layer: null, btn: null, prev: { position: el.style.position, isolation: el.style.isolation } };
    store.set(el, st);

    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.isolation = 'isolate';
    var layer = document.createElement('div');
    layer.className = 'sd-shader';
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = 'position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden;border-radius:inherit;';
    el.insertBefore(layer, el.firstChild);
    st.layer = layer;

    var C = colorsFor(el, P);
    layer.style.background = fallbackCss(C);
    var mobileMode = SD.data(el, 'mobile', 'live');
    if (mobileMode === 'fallback' && mqCoarse()) return;
    if (!hasWebGL2()) { el.setAttribute('data-shader-fallback', ''); return; }

    var speed = num(el, 'speed', P.speed);
    var frame = num(el, 'frame', 12000);
    var still = function () { return SD.reduced() || (mobileMode === 'static' && mqCoarse()); };

    var mods = [import(base() + 'shader-mount.js'), import(base() + P.file)];
    if (P.noise) mods.push(import(base() + 'get-shader-noise-texture.js'));
    Promise.all(mods).then(function (m) {
      if (st.dead) return;
      var ShaderMount = m[0].ShaderMount, S = m[1];
      var imgP = P.image
        ? (SD.data(el, 'image', '') ? loadImage(SD.data(el, 'image', '')) : gradientImage(C, 1280, 800))
        : Promise.resolve(null);
      var noiseP = P.noise ? new Promise(function (res) { var n = m[2].getShaderNoiseTexture(); if (n.complete) res(n); else { n.onload = function () { res(n); }; n.onerror = function () { res(null); }; } }) : Promise.resolve(null);
      return Promise.all([imgP, noiseP]).then(function (r) {
        if (st.dead) return;
        var E = S[P.enumExp] || {}, T = S[P.typesExp] || {};
        var u = P.uniforms.call(P, el, unwrap(C), E, T);
        var sz = P.sizing;
        var offX = num(el, 'offset-x', sz.offsetX || 0);
        if (P.mirrorOffsetX) offX *= SD.dir(el);
        Object.assign(u, {
          u_fit: sz.fit, u_scale: num(el, 'scale', sz.scale), u_rotation: num(el, 'rotation', 0),
          u_offsetX: offX, u_offsetY: num(el, 'offset-y', sz.offsetY || 0),
          u_originX: 0.5, u_originY: 0.5, u_worldWidth: 0, u_worldHeight: 0
        });
        if (r[0]) u.u_image = r[0];
        if (r[1]) u.u_noiseTexture = r[1];
        var mount = new ShaderMount(layer, S[P.exp], u, undefined, still() ? 0 : speed, frame, 1, 1920 * 1080);
        st.mount = mount;
        if (P.pixelated) mount.canvasElement.style.imageRendering = 'pixelated';
        mount.canvasElement.setAttribute('aria-hidden', 'true');
        mount.canvasElement.style.opacity = '0';
        mount.canvasElement.style.transition = 'opacity 900ms cubic-bezier(.16,1,.3,1)';
        requestAnimationFrame(function () { requestAnimationFrame(function () { if (!st.dead) mount.canvasElement.style.opacity = '1'; }); });
        // DPR cap 1.5: Paper renders at device pixels; limit the pixel budget to (css px * 1.5)^2
        var cap = function () {
          var r = layer.getBoundingClientRect();
          var d = Math.min(window.devicePixelRatio || 1, 1.5);
          mount.setMaxPixelCount(Math.max(1, Math.round(r.width * r.height * d * d)));
        };
        cap();
        if ('ResizeObserver' in window) { st.ro = new ResizeObserver(cap); st.ro.observe(layer); }
        // reduced-motion changes at runtime
        st.mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        st.onMq = function () { mount.setSpeed(still() ? 0 : speed); };
        if (st.mq.addEventListener) st.mq.addEventListener('change', st.onMq);
        // fluted glass: scroll-linked shift (renders only while scrolling; Paper IO still gates offscreen)
        if (key === 'fluted-glass' && SD.data(el, 'scroll-shift', true) && !still() && window.ScrollTrigger) {
          st.st = window.ScrollTrigger.create({
            trigger: el, start: 'top bottom', end: 'bottom top',
            onUpdate: function (self) { mount.setUniforms({ u_shift: (self.progress - 0.5) * 0.5 }); }
          });
        }
        if (SD.data(el, 'pause-button', false) && speed && !still()) addToggle(el, st, speed);
      });
    }).catch(function (err) {
      if (window.console) console.warn('[SD] shader-bg fell back to CSS gradient:', err && err.message);
    });
  }

  function addToggle(el, st, speed) {
    var he = SD.dir(el) === -1;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'sd-shader-toggle';
    b.setAttribute('aria-pressed', 'false');
    var label = function (p) { return p ? (he ? 'הפעלת רקע מונפש' : 'Play background animation') : (he ? 'השהיית רקע מונפש' : 'Pause background animation'); };
    b.setAttribute('aria-label', label(false));
    b.innerHTML = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M4 3h3v10H4zM9 3h3v10H9z"/></svg>';
    b.style.cssText = 'position:absolute;inset-block-end:16px;inset-inline-end:16px;z-index:2;inline-size:32px;block-size:32px;display:grid;place-items:center;border-radius:999px;color:var(--c-ink);background:color-mix(in oklab,var(--c-canvas) 70%,transparent);backdrop-filter:blur(8px);border:1px solid color-mix(in oklab,var(--c-ink) 15%,transparent);';
    b.addEventListener('click', function () {
      var paused = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(paused));
      b.setAttribute('aria-label', label(paused));
      b.innerHTML = paused ? '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M4 2.5v11l9-5.5z"/></svg>' : '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M4 3h3v10H4zM9 3h3v10H9z"/></svg>';
      if (st.mount) st.mount.setSpeed(paused ? 0 : speed);
    });
    el.appendChild(b);
    st.btn = b;
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    st.dead = true;
    if (st.st) st.st.kill();
    if (st.ro) st.ro.disconnect();
    if (st.mq && st.mq.removeEventListener) st.mq.removeEventListener('change', st.onMq);
    if (st.mount) { try { st.mount.dispose(); } catch (e) {} }
    if (st.layer) st.layer.remove();
    if (st.btn) st.btn.remove();
    el.removeAttribute('data-shader-fallback');
    el.style.position = st.prev.position;
    el.style.isolation = st.prev.isolation;
    el.removeAttribute('data-paper-shader');
    tidy(el);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy, presets: Object.keys(PRESETS) };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
