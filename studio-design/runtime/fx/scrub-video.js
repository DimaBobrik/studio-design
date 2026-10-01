/* studio-design · fx/scrub-video.js — pinned scroll-scrubbed video hero with "brand text behind a cutout" reveal.
   Ported idea: a common effect prompt "TOKYO SKYLINE HERO" — rebuilt on ScrollTrigger pin + scrub (NO wheel/touch hijack, no body lock):
   video/frames advance to data-video-end, title blurs out over the first 30%, brand text composes (opacity, y, blur, tracking),
   then a transparent cutout of the foreground (pixel-aligned with the last frame) fades in ABOVE the brand text so the
   foreground occludes it. Progress bar at the bottom.
   Markup:
     <section class="sd-scrub" data-fx="scrub-video" data-length="300">
       <div class="sd-scrub__stage">
         <video class="sd-scrub__media" src="hero.mp4" muted playsinline preload="auto" poster="last-frame.webp"></video>
         <!-- and/or frame-sequence mode (recommended on iOS): -->
         <canvas class="sd-scrub__media" data-frames="frames/f_{i}.webp" data-count="48" data-pad="2" aria-hidden="true"></canvas>
         <div class="sd-scrub__brand" aria-hidden="true"><span>Brand</span></div>
         <img class="sd-scrub__cutout" src="foreground.webp" alt="">
         <div class="sd-scrub__scrim"></div>
         <div class="sd-scrub__title"><h1>Headline</h1></div>
         <div class="sd-scrub__hint">Scroll</div>
         <div class="sd-scrub__progress"><span></span></div>
       </div>
     </section>
   Encode video all-keyframe for smooth seeking:  ffmpeg -i in.mov -c:v libx264 -g 1 -crf 28 -pix_fmt yuv420p -movflags +faststart -an out.mp4
   Params (data-* on section):
     data-length        number 300   ACF number — pinned scroll distance in % of viewport height
     data-scrub         number 0.5   ACF number — scrub smoothing (s); 0 = locked to scrollbar
     data-mode          string auto  ACF select (auto|video|frames) — auto: frames on touch devices if a canvas exists, else video
     data-video-end     number 0.78  ACF number — progress at which media reaches its last frame
     data-title-out     number 0.30  ACF number — progress by which the title has blurred out
     data-brand-start / data-brand-end    number 0.80 / 0.93   ACF number
     data-cutout-start / data-cutout-end  number 0.85 / 0.96   ACF number
     data-brand-track   bool   true  ACF true_false — brand tracks in (letter-spacing .25em→0; single abs-positioned element, no page reflow)
   Canvas params: data-frames (url pattern with {i}) ACF text · data-count ACF number · data-pad (zero padding) ACF number · data-start (first index) ACF number
   Events: "sd:scrub:progress" {detail:{progress}} is NOT dispatched per frame (perf); read el._sdProgress if needed.
   Reduced motion / no ScrollTrigger: no pin, final composition (last frame + brand + cutout) shown statically. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function init(el) {
    if (store.has(el)) return;
    var stage = el.querySelector('.sd-scrub__stage') || el;
    var video = stage.querySelector('video.sd-scrub__media');
    var canvas = stage.querySelector('canvas.sd-scrub__media');
    var mode = SD.data(el, 'mode', 'auto');
    if (mode === 'auto') mode = canvas && (!video || window.matchMedia('(pointer: coarse)').matches) ? 'frames' : (video ? 'video' : 'frames');
    if (mode === 'frames' && !canvas) mode = 'video';
    if (mode === 'video' && !video) return;
    // hide the unused medium
    if (mode === 'frames' && video) { video.hidden = true; video.preload = 'none'; }
    if (mode === 'video' && canvas) canvas.hidden = true;

    var P = {
      vEnd: SD.data(el, 'video-end', 0.78), tOut: SD.data(el, 'title-out', 0.3),
      bS: SD.data(el, 'brand-start', 0.8), bE: SD.data(el, 'brand-end', 0.93),
      cS: SD.data(el, 'cutout-start', 0.85), cE: SD.data(el, 'cutout-end', 0.96),
      track: SD.data(el, 'brand-track', true)
    };
    var title = stage.querySelector('.sd-scrub__title'), brand = stage.querySelector('.sd-scrub__brand'),
        cut = stage.querySelector('.sd-scrub__cutout'), bar = stage.querySelector('.sd-scrub__progress > span');
    var st = { off: [], ctx: null, imgs: [] };
    store.set(el, st);

    // ---------- media drivers
    var setMedia;
    if (mode === 'video') {
      var duration = 0, seeking = false, pending = null, lastT = -1, wanted = 0;
      var seek = function (t) {
        if (Math.abs(t - lastT) < 1 / 90) return;
        if (seeking) { pending = t; return; }
        seeking = true; lastT = t;
        try { video.currentTime = t; } catch (e) { seeking = false; }
      };
      var onSeeked = function () { seeking = false; if (pending !== null) { var t = pending; pending = null; seek(t); } };
      var onMeta = function () { duration = video.duration || 0; el.classList.add('is-loaded'); lastT = -1; setMedia(wanted); };
      setMedia = function (m) { wanted = m; if (duration) seek(Math.min(duration - 0.04, m * duration)); };
      video.muted = true; video.playsInline = true; video.setAttribute('playsinline', ''); video.pause();
      video.addEventListener('seeked', onSeeked);
      video.addEventListener('loadeddata', onMeta);
      if (video.readyState >= 2) onMeta();
      // iOS/Safari only decodes after a play(); prime it muted, then pause.
      var prime = video.play && video.play(); if (prime && prime.then) prime.then(function () { video.pause(); setMedia(wanted); }).catch(function () {});
      st.off.push(function () { video.removeEventListener('seeked', onSeeked); video.removeEventListener('loadeddata', onMeta); });
    } else {
      var pattern = canvas.getAttribute('data-frames') || '', count = +canvas.getAttribute('data-count') || 0,
          pad = +canvas.getAttribute('data-pad') || 0, start = +canvas.getAttribute('data-start') || 0;
      var ctx2d = canvas.getContext('2d'), frames = new Array(count), cur = -1, want = 0;
      var url = function (i) { var s = String(i + start); while (s.length < pad) s = '0' + s; return pattern.replace('{i}', s); };
      var size = function () {
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5), r = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr)); cur = -1; draw();
      };
      var nearest = function (i) { for (var d = 0; d < count; d++) { if (frames[i - d] && frames[i - d].ok) return i - d; if (frames[i + d] && frames[i + d].ok) return i + d; } return -1; };
      var draw = function () {
        var i = nearest(want); if (i < 0 || i === cur) return; cur = i;
        var im = frames[i].img, cw = canvas.width, ch = canvas.height, s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
        var w = im.naturalWidth * s, h = im.naturalHeight * s;
        ctx2d.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
      };
      // load order: first, last, then every 4th, then the rest (coarse-to-fine so scrubbing works early)
      var order = [0, count - 1], seen = {}; order.forEach(function (i) { seen[i] = 1; });
      [8, 4, 2, 1].forEach(function (step) { for (var i = 0; i < count; i += step) if (!seen[i]) { seen[i] = 1; order.push(i); } });
      var q = 0, active = 0, dead = false;
      var next = function () {
        while (active < 4 && q < order.length && !dead) {
          (function (i) {
            var im = new Image(); im.decoding = 'async'; active++;
            frames[i] = { img: im, ok: false }; st.imgs.push(im);
            im.onload = function () { active--; frames[i].ok = true; if (i === 0 || i === count - 1) el.classList.add('is-loaded'); cur = -1; draw(); next(); };
            im.onerror = function () { active--; next(); };
            im.src = url(i);
          })(order[q++]);
        }
      };
      next();
      var ro = new ResizeObserver(size); ro.observe(canvas);
      setMedia = function (m) { want = Math.round(m * (count - 1)); draw(); };
      st.off.push(function () { dead = true; ro.disconnect(); st.imgs.forEach(function (im) { im.onload = im.onerror = null; im.src = ''; }); });
    }

    // ---------- composition
    function render(p) {
      el._sdProgress = p;
      setMedia(clamp(p / P.vEnd));
      if (title) {
        var t = 1 - clamp(p / P.tOut);
        title.style.opacity = t.toFixed(3);
        title.style.transform = 'translateY(' + ((1 - t) * -24).toFixed(1) + 'px) scale(' + (0.96 + t * 0.04).toFixed(4) + ')';
        title.style.filter = t < 1 ? 'blur(' + ((1 - t) * 10).toFixed(2) + 'px)' : '';
      }
      if (brand) {
        var b = clamp((p - P.bS) / (P.bE - P.bS));
        brand.style.opacity = b.toFixed(3);
        brand.style.transform = 'translateY(' + ((1 - b) * 16).toFixed(1) + 'px) scale(' + (0.98 + b * 0.02).toFixed(4) + ')';
        brand.style.filter = b < 1 ? 'blur(' + ((1 - b) * 6).toFixed(2) + 'px)' : '';
        if (P.track) brand.style.letterSpacing = b < 1 ? ((1 - b) * 0.25).toFixed(3) + 'em' : '';
      }
      if (cut) cut.style.opacity = clamp((p - P.cS) / (P.cE - P.cS)).toFixed(3);
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      el.classList.toggle('is-scrolled', p > 0.005);
    }

    var g = window.gsap, STr = window.ScrollTrigger;
    var staticMode = function () { el.classList.add('is-static'); render(1); };
    if (!g || !STr) staticMode();
    else {
      st.ctx = g.context(function () {
        var mm = g.matchMedia();
        mm.add({ motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' }, function (c) {
          if (c.conditions.reduce) { staticMode(); return function () { el.classList.remove('is-static'); }; }
          var state = { p: 0 };
          render(0);
          g.to(state, {
            p: 1, ease: 'none',
            onUpdate: function () { render(state.p); },
            scrollTrigger: {
              trigger: el, start: 'top top', end: function () { return '+=' + (window.innerHeight * SD.data(el, 'length', 300) / 100); },
              pin: stage, scrub: SD.data(el, 'scrub', 0.5), invalidateOnRefresh: true, anticipatePin: 1
            }
          });
        });
      }, el);
    }

    st.off.push(function () {
      [title, brand, cut, bar].forEach(function (n) { if (n) { n.style.opacity = ''; n.style.transform = ''; n.style.filter = ''; n.style.letterSpacing = ''; } });
      el.classList.remove('is-static', 'is-loaded', 'is-scrolled');
      if (video) video.hidden = false; if (canvas) canvas.hidden = false;
    });
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    if (st.ctx) st.ctx.revert();
    st.off.forEach(function (f) { f(); });
    store.delete(el);
  }
  SD.fx['scrub-video'] = { init: init, destroy: destroy };
})();
