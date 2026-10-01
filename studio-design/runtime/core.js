/* studio-design runtime · core.js
   Boots Lenis + GSAP (if present), exposes window.SD:
     SD.dir()            -> 1 (LTR) or -1 (RTL) for horizontal motion
     SD.reduced()        -> true if prefers-reduced-motion
     SD.fine()           -> true if a fine pointer (mouse) is available
     SD.fx               -> registry of modules { name: { init(el, opts), destroy(el) } }
     SD.register(name, m)
     SD.initAll(root?) / SD.destroyAll(root?)   (ACF preview re-init)
     SD.data(el, key, def) -> typed data-* reader (numbers/booleans parsed)
     SD.lenis            -> Lenis instance (or null)
     SD.onVisible(el, cb, opts) -> IntersectionObserver helper returning disconnect fn
     SD.onScroll(cb)     -> shared rAF-throttled scroll subscription (cb(scrollY)); returns unsubscribe fn
     SD.toRGB(c, el?)    -> "rgba(r, g, b, a)" for any CSS colour/token (oklch, color-mix); use before colour tweens
   Load order: gsap (+ plugins) -> lenis -> core.js -> fx/*.js ; init runs on DOMContentLoaded.
   Opt out of smooth scroll with <html data-smooth="off">. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {};
  SD.fx = SD.fx || {};
  // ?rtl=1 flips direction immediately (mirroring test / bilingual preview). For no LTR flash, also put the one-liner
  // from runtime/README.md §1 in <head>. Real Hebrew pages ship <html lang="he" dir="rtl"> instead.
  if (/[?&]rtl=1/.test(location.search)) { document.documentElement.setAttribute('dir', 'rtl'); document.documentElement.setAttribute('lang', 'he'); }
  var mq = function (q) { return window.matchMedia ? window.matchMedia(q).matches : false; };

  SD.dir = function (el) {
    var n = el && el.closest ? el.closest('[dir]') : null;
    var d = (n && n.getAttribute('dir')) || document.documentElement.getAttribute('dir') || getComputedStyle(document.documentElement).direction;
    return d === 'rtl' ? -1 : 1;
  };
  /* SD.onScroll(cb) -> unsubscribe fn. cb(scrollY) runs at most once per frame. The ONLY scroll listener in the runtime
     (antipatterns #58 exception): Lenis 'scroll' when Lenis runs, else one passive rAF-throttled window listener. */
  var scrollSubs = [], scrollHooked = false, scrollRaf = 0;
  function scrollFlush() { scrollRaf = 0; var y = window.scrollY; scrollSubs.slice().forEach(function (f) { f(y); }); }
  function scrollKick() { if (!scrollRaf) scrollRaf = requestAnimationFrame(scrollFlush); }
  SD.onScroll = function (cb) {
    scrollSubs.push(cb);
    if (!scrollHooked) { scrollHooked = true; window.addEventListener('scroll', scrollKick, { passive: true }); if (SD.lenis && SD.lenis.on) SD.lenis.on('scroll', scrollKick); }
    return function () { var i = scrollSubs.indexOf(cb); if (i > -1) scrollSubs.splice(i, 1); };
  };
  /* SD.toRGB(color, ctxEl?) -> "rgba(r, g, b, a)" for any CSS colour: oklch(), color-mix(), var(--token), "--token".
     Use it before tweening colours (GSAP interpolates rgb/hex only; oklch strings snap or end near-transparent).
     SD.toRGBArray(color, ctxEl?) -> [r, g, b, a] with r,g,b 0-255 and a 0-255. */
  var rgbCtx = null, rgbCache = {};
  SD.toRGBArray = function (color, ctxEl) {
    var c = String(color == null ? '' : color).trim();
    if (c.indexOf('--') === 0) c = 'var(' + c + ')';
    if (/var\(|currentcolor|inherit/i.test(c)) { var probe = document.createElement('i'); probe.style.cssText = 'position:absolute;visibility:hidden;'; probe.style.color = c;
      (ctxEl && ctxEl.nodeType === 1 ? ctxEl : document.documentElement).appendChild(probe); c = getComputedStyle(probe).color; probe.remove(); }
    if (rgbCache[c]) return rgbCache[c].slice();
    if (!rgbCtx) { var cv = document.createElement('canvas'); cv.width = cv.height = 1; rgbCtx = cv.getContext('2d', { willReadFrequently: true }); }
    rgbCtx.clearRect(0, 0, 1, 1); rgbCtx.fillStyle = 'rgba(0,0,0,0)'; rgbCtx.fillStyle = c; rgbCtx.fillRect(0, 0, 1, 1);
    var d = rgbCtx.getImageData(0, 0, 1, 1).data, out = [d[0], d[1], d[2], d[3]];
    rgbCache[c] = out; return out.slice();
  };
  SD.toRGB = function (color, ctxEl) { var a = SD.toRGBArray(color, ctxEl); return 'rgba(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + +(a[3] / 255).toFixed(3) + ')'; };
  SD.reduced = function () { return mq('(prefers-reduced-motion: reduce)'); };
  SD.fine = function () { return mq('(hover: hover) and (pointer: fine)'); };

  SD.data = function (el, key, def) {
    var v = el.getAttribute('data-' + key);
    if (v === null || v === '') return def;
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (!isNaN(v) && v.trim() !== '') return parseFloat(v);
    return v;
  };

  SD.onVisible = function (el, cb, opts) {
    if (!('IntersectionObserver' in window)) { cb(true); return function () {}; }
    var io = new IntersectionObserver(function (entries) { entries.forEach(function (e) { cb(e.isIntersecting, e); }); }, opts || { rootMargin: '100px' });
    io.observe(el);
    return function () { io.disconnect(); };
  };

  // Late registration (e.g. fx scripts loaded with defer/async after boot) still initialises matching elements.
  SD.register = function (name, mod) { SD.fx[name] = mod; if (SD._booted) SD.initAll(document); };
  // include root itself when it carries data-fx (ACF preview passes the block element)
  function fxEls(root) {
    var list = Array.prototype.slice.call(root.querySelectorAll('[data-fx]'));
    if (root.matches && root.matches('[data-fx]')) list.unshift(root);
    return list;
  }

  var live = new WeakMap(); // el -> [names]
  SD.initAll = function (root) {
    root = root || document;
    fxEls(root).forEach(function (el) {
      var names = el.getAttribute('data-fx').split(/\s+/).filter(Boolean);
      var done = live.get(el) || [];
      names.forEach(function (n) {
        if (done.indexOf(n) > -1) return;
        var m = SD.fx[n];
        if (!m) { if (window.console) console.warn('[SD] missing fx module:', n); return; }
        try { m.init(el, {}); done.push(n); } catch (err) { console.error('[SD] init failed', n, err); }
      });
      live.set(el, done);
    });
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  };
  SD.destroyAll = function (root) {
    root = root || document;
    fxEls(root).forEach(function (el) {
      (live.get(el) || []).forEach(function (n) { var m = SD.fx[n]; if (m && m.destroy) try { m.destroy(el); } catch (e) {} });
      live.delete(el);
    });
  };

  function bootMotion() {
    var g = window.gsap;
    if (g) {
      var plugins = ['ScrollTrigger', 'SplitText', 'Flip', 'Observer', 'Draggable', 'InertiaPlugin', 'DrawSVGPlugin', 'MorphSVGPlugin', 'MotionPathPlugin', 'ScrambleTextPlugin', 'CustomEase', 'ScrollToPlugin'];
      plugins.forEach(function (p) { if (window[p]) g.registerPlugin(window[p]); });
      g.defaults({ ease: 'expo.out', duration: 0.9 });
    }
    var smoothOff = document.documentElement.getAttribute('data-smooth') === 'off';
    SD.lenis = null;
    if (window.Lenis && !smoothOff && !SD.reduced()) {
      SD.lenis = new window.Lenis({ lerp: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--lenis-lerp')) || 0.1, wheelMultiplier: 1, smoothWheel: true });
      if (g && window.ScrollTrigger) {
        SD.lenis.on('scroll', window.ScrollTrigger.update);
        g.ticker.add(function (t) { SD.lenis.raf(t * 1000); });
        g.ticker.lagSmoothing(0);
      } else {
        var raf = function (t) { SD.lenis.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }
      // anchor links through Lenis
      document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute('href').length < 2) return;
        var t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); SD.lenis.scrollTo(t, { offset: -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80) }); }
      });
    }
  }

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    bootMotion();
    SD._booted = true;
    SD.initAll(document);
    // refresh after fonts/images load so ScrollTrigger measurements are right
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
    window.addEventListener('load', function () { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
  });
})();
