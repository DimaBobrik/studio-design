/* studio-design fx · text-fx — three small text behaviours, picked with data-mode
   1) rotate  — one word in a sentence cycles (H-20 / C-27)
        <h1>We build <span data-fx="text-fx" data-mode="rotate" data-words="storefronts|booking flows|brand sites">storefronts</span></h1>
   2) scramble — text resolves from random glyphs (ScrambleTextPlugin; Hebrew glyph set in RTL)
        <p data-fx="text-fx" data-mode="scramble" data-trigger="view">System status: all services operational</p>
        data-trigger="hover" on links/buttons re-scrambles on hover/focus.
   3) roll — hover label roll for links/buttons: a duplicate label slides in (CSS transitions, no JS per frame)
        <a href="#" data-fx="text-fx" data-mode="roll">Start a project</a>   (or put it on a <nav>: applies to its a/button children)
   Params (data-*)                                  type     default        ACF field
     data-mode        rotate|scramble|roll              select   rotate         Select
     rotate:
     data-words       words separated by "|"            text     —              Text / Repeater
     data-interval    seconds each word stays           number   2.2            Number
     data-effect      slide|blur|flip                   select   slide          Select
     data-cycles      full cycles before stopping (0 = endless; WCAG 2.2.2 → default stops)  number 3  Number
     scramble:
     data-trigger     view|load|hover                   select   view           Select
     data-chars       glyph set, or "auto"              text     auto           Text
     data-duration    seconds                           number   1.2            Number
     roll:
     data-stagger     none|chars (chars = Latin only; words in RTL)  select  chars   Select
   A11y: rotate keeps all words in an .sr-only span (stack aria-hidden); scramble keeps the real text in .sr-only and scrambles
   an aria-hidden copy; roll duplicates are aria-hidden. No aria-label is added (prohibited on p/span/div).
   Reduced motion: rotate shows the first word, scramble shows final text, roll becomes a plain colour/underline hover. */
(function () {
  'use strict';
  var NAME = 'text-fx';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }
  var LATIN_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var HEB_CHARS = 'אבגדהוזחטיכלמנסעפצקרשת';
  var NON_LATIN = /[֐-ࣿऀ-෿　-鿿가-힯]/;

  function isRtlText(el) { return SD.dir(el) === -1 || NON_LATIN.test(el.textContent); }

  // ---------- rotate ----------
  function rotate(el, st) {
    var words = String(SD.data(el, 'words', '')).split('|').map(function (w) { return w.trim(); }).filter(Boolean);
    var first = el.textContent.trim();
    if (!words.length) words = [first];
    if (words.indexOf(first) < 0 && first) words.unshift(first);
    st.html = el.innerHTML;
    el.classList.add('sd-rotate');
    var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = words.join(', ');
    var vis = document.createElement('span'); vis.className = 'sd-rotate__stack'; vis.setAttribute('aria-hidden', 'true');
    var spans = words.map(function (w, i) { var s = document.createElement('span'); s.className = 'sd-rotate__word'; s.textContent = w; if (i) s.style.visibility = 'hidden'; vis.appendChild(s); return s; });
    el.textContent = ''; el.appendChild(vis); el.appendChild(sr);
    var g = window.gsap;
    if (!g || words.length < 2) return;
    var effect = SD.data(el, 'effect', 'slide');
    var interval = SD.data(el, 'interval', 2.2);
    var cycles = SD.data(el, 'cycles', 3);
    st.mm = g.matchMedia();
    st.mm.add('(prefers-reduced-motion: no-preference)', function () {
      g.set(spans.slice(1), { autoAlpha: 0 });
      spans.forEach(function (s) { s.style.visibility = ''; });
      g.set(spans.slice(1), { autoAlpha: 0 });
      var inV, outV;
      if (effect === 'blur') { inV = { from: { autoAlpha: 0, filter: 'blur(10px)', yPercent: 20 }, to: { autoAlpha: 1, filter: 'blur(0px)', yPercent: 0 } }; outV = { autoAlpha: 0, filter: 'blur(10px)', yPercent: -20 }; }
      else if (effect === 'flip') { inV = { from: { autoAlpha: 0, rotationX: -90, yPercent: 30 }, to: { autoAlpha: 1, rotationX: 0, yPercent: 0 } }; outV = { autoAlpha: 0, rotationX: 90, yPercent: -30 }; }
      else { inV = { from: { autoAlpha: 1, yPercent: 135 }, to: { autoAlpha: 1, yPercent: 0 } }; outV = { yPercent: -135, autoAlpha: 1 }; }
      var tl = g.timeline({ repeat: cycles > 0 ? cycles - 1 : -1, paused: true });
      var dur = 0.75;
      spans.forEach(function (s, i) {
        var next = spans[(i + 1) % spans.length];
        var at = i * interval + interval - dur;
        tl.to(s, Object.assign({ duration: dur, ease: 'power3.in' }, outV), at);
        tl.fromTo(next, inV.from, Object.assign({ duration: dur + 0.2, ease: 'expo.out', immediateRender: false }, inV.to), at + dur * 0.55);
      });
      st.tl = tl;
      st.offVis = SD.onVisible(el, function (v) { if (v) tl.play(); else tl.pause(); }, { rootMargin: '0px' });
      var onHidden = function () { if (document.hidden) tl.pause(); else tl.play(); };
      document.addEventListener('visibilitychange', onHidden);
      return function () { st.offVis && st.offVis(); document.removeEventListener('visibilitychange', onHidden); tl.kill(); };
    });
  }

  // ---------- scramble ----------
  function scramble(el, st) {
    var g = window.gsap;
    st.html = el.innerHTML;
    var text = el.textContent;
    var trigger = SD.data(el, 'trigger', 'view');
    var chars = SD.data(el, 'chars', 'auto');
    if (chars === 'auto') chars = isRtlText(el) ? HEB_CHARS : LATIN_CHARS;
    var duration = SD.data(el, 'duration', 1.2);
    if (!g) return;
    var hasPlugin = !!(window.ScrambleTextPlugin || (g.plugins && g.plugins.scrambleText));
    st.mm = g.matchMedia();
    st.mm.add('(prefers-reduced-motion: no-preference)', function () {
      // keep the box stable while glyphs change
      var r = el.getBoundingClientRect();
      if (getComputedStyle(el).display === 'inline') el.style.display = 'inline-block';
      el.style.minInlineSize = Math.ceil(r.width) + 'px';
      // a11y: the real text stays in a visually-hidden span; only an aria-hidden copy is scrambled
      // (no aria-label, which is prohibited on p/span/div and would fail axe aria-prohibited-attr)
      el.textContent = '';
      var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text;
      var vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true'); vis.textContent = text;
      el.appendChild(sr); el.appendChild(vis);
      var run = function (d) {
        if (!hasPlugin) return g.fromTo(vis, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });
        return g.to(vis, { duration: d, ease: 'none', scrambleText: { text: text, chars: chars, speed: 0.6, revealDelay: d * 0.25 } });
      };
      if (trigger === 'hover') {
        var t = null;
        var h = function () { if (t && t.isActive()) return; t = run(Math.min(duration, 0.7)); };
        el.addEventListener('pointerenter', h); el.addEventListener('focus', h);
        return function () { el.removeEventListener('pointerenter', h); el.removeEventListener('focus', h); if (t) t.kill(); el.textContent = text; el.style.minInlineSize = ''; el.style.display = ''; };
      }
      if (trigger === 'load' || !window.ScrollTrigger) { run(duration); }
      else {
        if (hasPlugin) el.style.visibility = 'hidden';
        window.ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { el.style.visibility = ''; run(duration); } });
      }
      return function () { el.textContent = text; el.style.minInlineSize = ''; el.style.display = ''; el.style.visibility = ''; };
    });
  }

  // ---------- roll ----------
  function rollOne(t, staggerChars, rtl) {
    var label = t.querySelector('[data-roll-label]') || t;
    if (label.querySelector('.sd-roll-text')) return null;
    if (label.children.length && label === t) {
      // element children (icons): wrap only the text nodes
      var txt = Array.prototype.find.call(label.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (!txt) return null;
      var holder = document.createElement('span'); holder.setAttribute('data-roll-label', '');
      label.replaceChild(holder, txt); holder.textContent = txt.textContent.trim();
      label = holder;
      var created = holder;
    }
    var orig = label.innerHTML;
    var text = label.textContent.trim();
    var useChars = staggerChars && !rtl && !NON_LATIN.test(text);
    var build = function (hidden) {
      var w = document.createElement('span'); w.className = 'sd-roll-text__line' + (hidden ? ' is-b' : '');
      if (hidden) w.setAttribute('aria-hidden', 'true');
      if (useChars) {
        Array.prototype.forEach.call(text, function (ch, i) { var s = document.createElement('span'); s.className = 'sd-roll-text__ch'; s.style.setProperty('--i', i); s.textContent = ch === ' ' ? ' ' : ch; w.appendChild(s); });
        if (!hidden) { w.setAttribute('aria-hidden', 'true'); }
      } else w.textContent = text;
      return w;
    };
    var box = document.createElement('span'); box.className = 'sd-roll-text';
    if (useChars) { var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text; box.appendChild(sr); }
    box.appendChild(build(false)); box.appendChild(build(true));
    label.innerHTML = ''; label.appendChild(box);
    t.classList.add('sd-roll-host');
    return function () { label.innerHTML = orig; t.classList.remove('sd-roll-host'); tidy(t); if (created) created.replaceWith(document.createTextNode(created.textContent)); };
  }
  function roll(el, st) {
    var targets = el.matches('a, button, [data-roll]') ? [el] : Array.prototype.slice.call(el.querySelectorAll('a, button, [data-roll]'));
    var chars = SD.data(el, 'stagger', 'chars') === 'chars';
    var rtl = SD.dir(el) === -1;
    st.undo = targets.map(function (t) { return rollOne(t, chars, rtl); }).filter(Boolean);
  }

  function init(el) {
    if (store.has(el)) destroy(el);
    var st = { mm: null, undo: [], html: null };
    store.set(el, st);
    var mode = SD.data(el, 'mode', 'rotate');
    if (mode === 'scramble') scramble(el, st);
    else if (mode === 'roll') roll(el, st);
    else rotate(el, st);
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.mm) st.mm.revert();
    st.undo.forEach(function (f) { f(); });
    if (st.addedLabel) el.removeAttribute('aria-label');
    if (st.html !== null) el.innerHTML = st.html;
    el.classList.remove('sd-rotate');
    tidy(el);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
