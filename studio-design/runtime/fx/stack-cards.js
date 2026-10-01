/* studio-design fx · stack-cards
   Sticky stacking cards (F-05). CSS does the stacking (position: sticky, works without JS); GSAP only scales and
   shades the card underneath while the next card slides over it.
   Markup:
     <section data-fx="stack-cards">
       <article data-stack-card>…</article> ×N      (or the section's direct children if none are marked)
     </section>
   Params (data-*)                               type     default  ACF field
     data-top        sticky top of the first card (CSS length)   text  "12svh"  Text
     data-offset     extra top per card, px (peek of the previous edge)   number 18  Number
     data-scale      scale of a fully covered card     number   0.9      Number (0.8–1)
     data-dim        max shade over a covered card (0–1)   number 0.45   Number
     data-rotate     tilt of a covered card, deg (mirrored in RTL)   number 0   Number
   Reduced motion: pure CSS sticky stack, no scale/shade. Only transform + opacity (of an injected shade layer). */
(function () {
  'use strict';
  var NAME = 'stack-cards';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  function init(el) {
    if (store.has(el)) destroy(el);
    var cards = Array.prototype.slice.call(el.querySelectorAll('[data-stack-card]'));
    if (!cards.length) cards = Array.prototype.slice.call(el.children);
    var st = { mm: null, cards: cards, shades: [] };
    store.set(el, st);
    el.classList.add('sd-stack');
    el.style.setProperty('--stack-top', SD.data(el, 'top', '12svh'));
    el.style.setProperty('--stack-offset', SD.data(el, 'offset', 18) + 'px');
    cards.forEach(function (c, i) {
      c.classList.add('sd-stack__card');
      c.style.setProperty('--i', i);
      var sh = document.createElement('span');
      sh.className = 'sd-stack__shade'; sh.setAttribute('aria-hidden', 'true');
      c.appendChild(sh); st.shades.push(sh);
    });
    var g = window.gsap;
    if (!g || !window.ScrollTrigger || cards.length < 2) return;
    var scale = SD.data(el, 'scale', 0.9);
    var dim = SD.data(el, 'dim', 0.45);
    var rot = SD.data(el, 'rotate', 0);

    st.mm = g.matchMedia();
    st.mm.add('(prefers-reduced-motion: no-preference)', function () {
      var dir = SD.dir(el);
      cards.forEach(function (card, i) {
        var next = cards[i + 1];
        if (!next) return;
        // deeper cards shrink a touch more so the stack reads as depth
        var depth = cards.length - 1 - i;
        var target = Math.max(0.6, scale - (depth - 1) * 0.015);
        var top = function () { return parseFloat(getComputedStyle(next).top) || 0; };
        var tl = g.timeline({
          scrollTrigger: {
            trigger: next, start: 'top bottom',
            end: function () { return 'top ' + top() + 'px'; },
            scrub: true, invalidateOnRefresh: true
          }
        });
        tl.to(card, { scale: target, rotation: rot * dir, ease: 'none', transformOrigin: '50% 0%' }, 0)
          .to(st.shades[i], { opacity: dim, ease: 'none' }, 0);
      });
      return function () {
        g.set(cards.concat(st.shades), { clearProps: 'transform,translate,rotate,scale,opacity,transformOrigin' });
      };
    });
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.mm) st.mm.revert();
    st.shades.forEach(function (s) { s.remove(); });
    st.cards.forEach(function (c) { c.classList.remove('sd-stack__card'); c.style.removeProperty('--i'); tidy(c); });
    el.classList.remove('sd-stack');
    el.style.removeProperty('--stack-top'); el.style.removeProperty('--stack-offset');
    tidy(el);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
