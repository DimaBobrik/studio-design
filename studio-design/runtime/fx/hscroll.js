/* studio-design fx · hscroll
   Pinned horizontal scroll section (F-04 / G-01): the section pins and its track slides along the inline axis
   while the page scrolls vertically. RTL-correct: the track travels toward inline-end-to-start (rightwards in RTL).
   Falls back to a native scroll-snap row below data-min-width and with reduced motion (the no-JS state is the same row).
   Markup:
     <section data-fx="hscroll">
       <div class="…">heading (optional, pins with the track)</div>
       <div data-hscroll-track>
         <article data-hscroll-panel> <div class="media"><img data-hs-parallax …></div> … </article> ×N
       </div>
     </section>
   Params (data-*)                             type     default   ACF field
     data-min-width    px; below it = native row     number   900       Number
     data-scrub        smoothing (true|seconds)      number   1         Number
     data-speed        scroll length multiplier      number   1         Number   (1 = distance equals track overflow)
     data-parallax     inner [data-hs-parallax] drift in %   number 12   Number (0 = off)
     data-progress     show a progress bar           boolean  true      True/False
     data-snap         snap to panels                boolean  false     True/False
   containerAnimation-ready: SD.hscroll(el) returns the live horizontal tween (or null), and the element dispatches
   "sd:hscroll" { detail: { tween } } after it is created, so other code can build
   ScrollTrigger({ containerAnimation: tween, trigger: panel, start: SD.dir(el) === 1 ? "left right" : "right left" }). */
(function () {
  'use strict';
  var NAME = 'hscroll';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  SD.hscroll = function (el) { var s = store.get(el); return (s && s.tween) || null; };

  function init(el) {
    if (store.has(el)) destroy(el);
    var track = el.querySelector('[data-hscroll-track]');
    var st = { mm: null, tween: null, bar: null, track: track };
    store.set(el, st);
    if (!track) return;
    el.classList.add('sd-hs');
    track.classList.add('sd-hs__track');
    var g = window.gsap, ST = window.ScrollTrigger;
    if (!g || !ST) return;
    var minW = SD.data(el, 'min-width', 900);
    var scrub = SD.data(el, 'scrub', 1);
    var speed = SD.data(el, 'speed', 1);
    var par = SD.data(el, 'parallax', 12);
    var snap = SD.data(el, 'snap', false);
    var showBar = SD.data(el, 'progress', true);

    st.mm = g.matchMedia();
    st.mm.add('(min-width: ' + minW + 'px) and (prefers-reduced-motion: no-preference)', function () {
      var dir = SD.dir(el);
      el.classList.add('is-pinned');
      var bar = null;
      if (showBar) {
        bar = document.createElement('div'); bar.className = 'sd-hs__bar'; bar.setAttribute('aria-hidden', 'true');
        bar.innerHTML = '<span></span>';
        el.appendChild(bar); st.bar = bar;
      }
      var dist = function () { return Math.max(0, track.scrollWidth - track.clientWidth); };
      var panels = Array.prototype.slice.call(track.querySelectorAll('[data-hscroll-panel]'));
      if (!panels.length) panels = Array.prototype.slice.call(track.children);
      var tween = g.to(track, {
        x: function () { return -dist() * dir; },
        ease: 'none',
        scrollTrigger: {
          trigger: el, pin: true, scrub: scrub, start: 'top top',
          end: function () { return '+=' + Math.round(dist() * speed); },
          invalidateOnRefresh: true, anticipatePin: 1,
          snap: snap && panels.length > 1 ? { snapTo: 1 / (panels.length - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power2.inOut' } : undefined,
          onUpdate: bar ? function (self) { bar.firstChild.style.transform = 'scaleX(' + self.progress.toFixed(4) + ')'; } : undefined
        }
      });
      st.tween = tween;
      // inner parallax via containerAnimation (direction-aware start/end)
      var imgs = par ? Array.prototype.slice.call(track.querySelectorAll('[data-hs-parallax]')) : [];
      if (par) {
        imgs.forEach(function (img) {
          var panel = img.closest('[data-hscroll-panel]') || img.parentElement;
          g.fromTo(img, { xPercent: -par * dir, scale: 1 + par / 40 }, {
            xPercent: par * dir, scale: 1 + par / 40, ease: 'none',
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: dir === 1 ? 'left right' : 'right left', end: dir === 1 ? 'right left' : 'left right', scrub: true }
          });
        });
      }
      el.dispatchEvent(new CustomEvent('sd:hscroll', { detail: { tween: tween } }));
      return function () {
        g.set([track].concat(imgs), { clearProps: 'transform,translate,rotate,scale' });
        imgs.concat([track]).forEach(tidy);
        el.classList.remove('is-pinned');
        if (bar) bar.remove();
        st.bar = null; st.tween = null;
      };
    });
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.mm) st.mm.revert();
    el.classList.remove('sd-hs', 'is-pinned');
    if (st.track) { st.track.classList.remove('sd-hs__track'); tidy(st.track); }
    tidy(el);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
