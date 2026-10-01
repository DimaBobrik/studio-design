/* studio-design fx · tone-shift
   Scroll colour chapters: the page canvas crossfades from one tone to the next as each section reaches a line in the
   viewport (seen on a museum exhibition story, a fintech brokerage, a space-tourism brand and a Paris cultural venue). One continuous surface
   instead of hard-edged coloured bands; the header can follow the active tone.
   Markup:
     <main data-fx="tone-shift" data-line="0.55">
       <section data-tone="canvas">…</section>
       <section data-tone="ink">…</section>          built-in tones: canvas | surface | ink | accent | media
       <section data-tone="clay">…</section>         custom tone: define [data-tone="clay"] { --tone-bg: …; --tone-ink: …; } in site.css (tokens only)
     </main>
   Without JS (and with reduced motion) every [data-tone] section paints its own background + ink (fx/tone-shift.css), so the
   page is complete and contrast-safe with hard edges. With JS the sections go transparent and a clipped stage of fixed
   layers behind them crossfades by opacity only (no background-color tweening, antipatterns #53).
   Params (data-*) on the host                                  type      default  ACF field
     data-line    viewport line (0 top … 1 bottom) a section top must cross to take over   number  0.55  Number (0.2–0.8)
     data-blend   crossfade length as a fraction of the viewport height                    number  0.3   Number (0.05–0.8)
     data-root    mirror the active tone on <html data-tone-active="…"> (header/nav can restyle)  boolean false  True/False
   Params on each section
     data-tone    tone name (built-in or project-defined)                                  text    canvas   Select
   Events: `sd:tone` on the host, detail { index, tone, section } whenever the dominant tone changes.
   A11y: each section keeps its own ink, so text never sits on a tone it was not designed for once the fade completes;
   keep data-blend ≤ 0.4 so the mixed zone stays short. Layers are aria-hidden. RTL: vertical only, nothing to mirror. */
(function () {
  'use strict';
  var NAME = 'tone-shift';
  var store = new WeakMap();
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function init(el) {
    if (store.has(el)) destroy(el);
    // direct children only (matches the CSS `.sd-tone--live > [data-tone]`); nest a second host for sub-chapters
    var secs = Array.prototype.filter.call(el.children, function (s) { return s.hasAttribute('data-tone'); });
    var st = { secs: secs, layers: [], stage: null, offScroll: null, offVis: null, ro: null, active: -1, tops: [], visible: true };
    store.set(el, st);
    el.classList.add('sd-tone');
    if (secs.length < 2 || SD.reduced()) return; // static: sections paint themselves

    var stage = document.createElement('div');
    stage.className = 'sd-tone__stage';
    stage.setAttribute('aria-hidden', 'true');
    secs.forEach(function (s, i) {
      var l = document.createElement('div');
      l.className = 'sd-tone__layer';
      // computed value of an unregistered custom property has var() substituted -> the token's resolved colour string
      var bg = getComputedStyle(s).getPropertyValue('--tone-bg').trim();
      if (bg) l.style.backgroundColor = bg;
      l.style.opacity = i === 0 ? '1' : '0';
      stage.appendChild(l);
      st.layers.push(l);
    });
    el.insertBefore(stage, el.firstChild);
    st.stage = stage;
    el.classList.add('sd-tone--live');

    var line = clamp(SD.data(el, 'line', 0.55), 0, 1);
    var blend = clamp(SD.data(el, 'blend', 0.3), 0.02, 1);
    var root = SD.data(el, 'root', false);

    function measure() {
      var y = window.scrollY;
      st.tops = secs.map(function (s) { return s.getBoundingClientRect().top + y; });
    }
    function update(y) {
      if (!st.visible) return;
      var vh = window.innerHeight, ln = y + vh * line, bl = vh * blend, dom = 0;
      for (var i = 1; i < secs.length; i++) {
        // t = 0 when the section top is bl/2 below the line, 1 when bl/2 above it
        var t = clamp((ln - st.tops[i] + bl / 2) / bl, 0, 1);
        st.layers[i].style.opacity = t.toFixed(3);
        if (t >= 0.5) dom = i;
      }
      if (dom !== st.active) {
        st.active = dom;
        var tone = secs[dom].getAttribute('data-tone');
        el.setAttribute('data-tone-active', tone);
        if (root) document.documentElement.setAttribute('data-tone-active', tone);
        el.dispatchEvent(new CustomEvent('sd:tone', { bubbles: true, detail: { index: dom, tone: tone, section: secs[dom] } }));
      }
    }
    measure();
    update(window.scrollY);
    st.offScroll = SD.onScroll(update);
    st.offVis = SD.onVisible(el, function (v) { st.visible = v; if (v) update(window.scrollY); }, { rootMargin: '0px' });
    if ('ResizeObserver' in window) {
      st.ro = new ResizeObserver(function () { measure(); update(window.scrollY); });
      st.ro.observe(el);
    }
    st.root = root;
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.offScroll) st.offScroll();
    if (st.offVis) st.offVis();
    if (st.ro) st.ro.disconnect();
    if (st.stage) st.stage.remove();
    if (st.root) document.documentElement.removeAttribute('data-tone-active');
    el.classList.remove('sd-tone', 'sd-tone--live');
    el.removeAttribute('data-tone-active');
    if (el.getAttribute('class') === '') el.removeAttribute('class');
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
