/* studio-design fx · clip-reveal
   Clip-path image reveal with inner de-zoom (+ optional inner parallax).
   Markup: <figure data-fx="clip-reveal" data-direction="up"><img src alt width height></figure>
       or  <div data-fx="clip-reveal"> <figure data-clip>…</figure> <figure data-clip>…</figure> </div>  (staggered group)
   The inner media is the first img/picture/video/[data-clip-inner] inside each frame.
   Params (data-*)                         type     default        ACF field
     data-direction up|down|inline-start|inline-end|center   select  up   Select
                    inline-* are logical: inline-start reveals from the reading-start edge (left in LTR, right in RTL)
     data-zoom      inner start scale        number   1.25           Number (1–1.6)
     data-duration  seconds                  number   1.4            Number
     data-delay     seconds                  number   0              Number
     data-stagger   group stagger seconds    number   0.12           Number
     data-ease      GSAP ease                text     "expo.inOut"   Text
     data-start     ScrollTrigger start      text     "top 82%"      Text
     data-scrub     tie reveal to scroll     boolean  false          True/False
     data-parallax  inner drift in % (0=off) number   0              Number (0–15)
   Reduced motion: no clip, no zoom (image shown statically). Only clip-path + transform are animated. */
(function () {
  'use strict';
  var NAME = 'clip-reveal';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  function framesOf(el) {
    var f = el.querySelectorAll('[data-clip]');
    return f.length ? Array.prototype.slice.call(f) : [el];
  }
  function innerOf(frame) {
    return frame.querySelector('[data-clip-inner]') || frame.querySelector('picture') || frame.querySelector('img, video');
  }
  function fromClip(dir, rtl) {
    switch (dir) {
      case 'down': return 'inset(0% 0% 100% 0%)';
      case 'center': return 'inset(50% 50% 50% 50%)';
      case 'inline-start': return rtl ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
      case 'inline-end': return rtl ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';
      default: return 'inset(100% 0% 0% 0%)';
    }
  }

  function init(el) {
    if (store.has(el)) destroy(el);
    var g = window.gsap;
    var state = { mm: null, frames: framesOf(el) };
    store.set(el, state);
    state.frames.forEach(function (f) { f.classList.add('sd-clip'); });
    if (!g) return;
    var dir = SD.data(el, 'direction', 'up');
    var zoom = SD.data(el, 'zoom', 1.25);
    var duration = SD.data(el, 'duration', 1.4);
    var delay = SD.data(el, 'delay', 0);
    var stagger = SD.data(el, 'stagger', 0.12);
    var ease = SD.data(el, 'ease', 'expo.inOut');
    var start = SD.data(el, 'start', 'top 82%');
    var scrub = SD.data(el, 'scrub', false);
    var parallax = SD.data(el, 'parallax', 0);
    var hasST = !!window.ScrollTrigger;

    state.mm = g.matchMedia();
    state.mm.add('(prefers-reduced-motion: no-preference)', function () {
      var rtl = SD.dir(el) === -1;
      var clip = fromClip(dir, rtl);
      var endScale = parallax ? 1 + parallax / 45 : 1; // cover the drift so edges never show
      var tl = g.timeline({
        delay: delay,
        scrollTrigger: hasST ? (scrub
          ? { trigger: el, start: start, end: 'top 30%', scrub: 0.8 }
          : { trigger: el, start: start, once: true }) : undefined
      });
      state.frames.forEach(function (f, i) {
        var inner = innerOf(f);
        var at = i * stagger;
        var r = parseFloat(getComputedStyle(f).borderTopLeftRadius) || 0;
        var round = r ? ' round ' + r + 'px' : '';
        tl.fromTo(f, { clipPath: clip + round }, { clipPath: 'inset(0% 0% 0% 0%)' + round, duration: duration, ease: ease, clearProps: scrub ? '' : 'clipPath' }, at);
        if (inner) tl.fromTo(inner, { scale: zoom * endScale }, { scale: endScale, duration: duration * 1.25, ease: 'expo.out' }, at + duration * 0.08);
        if (inner && parallax && hasST) {
          // yPercent drift is a separate property so it composes with the de-zoom
          g.fromTo(inner, { yPercent: -parallax }, {
            yPercent: parallax, ease: 'none',
            scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true }
          });
        }
      });
    });
  }

  function destroy(el) {
    var s = store.get(el);
    if (!s) return;
    if (s.mm) s.mm.revert();
    s.frames.forEach(function (f) { f.classList.remove('sd-clip'); tidy(f); var i = innerOf(f); tidy(i); });
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
