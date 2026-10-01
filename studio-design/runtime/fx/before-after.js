/* studio-design · fx/before-after.js — accessible comparison slider driven by a native <input type="range">.
   Markup:
     <figure class="sd-ba" data-fx="before-after">
       <img src="after.jpg" alt="After: …">                               (bottom layer)
       <div class="sd-ba__before"><img src="before.jpg" alt="Before: …"></div> (clipped top layer)
       <span class="sd-ba__label sd-ba__label--before">Before</span><span class="sd-ba__label sd-ba__label--after">After</span>
       <input class="sd-ba__range" type="range" min="0" max="100" value="50" step="0.5" aria-label="Before / after comparison">
       <span class="sd-ba__handle" aria-hidden="true"></span>
     </figure>
     (the module creates the range + handle if missing)
   Params (data-* on figure):
     data-start        number  50            ACF range 0–100
     data-orientation  string  "horizontal"  ACF select (horizontal|vertical)
     data-hover        bool    false         ACF true_false — divider follows the pointer (fine pointers only)
     data-intro        bool    true          ACF true_false — one gentle sweep when first scrolled into view
     data-label-before / data-label-after  string  "Before" / "After"  ACF text — used in aria-valuetext
   RTL: the before layer sits at the inline-start (right) edge, the native RTL range runs right→left, so keyboard arrows,
   drag and the clip all agree without extra math. Reduced motion: no intro sweep. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], built: [] };
    store.set(el, st);
    var vertical = SD.data(el, 'orientation', 'horizontal') === 'vertical';
    if (vertical) el.setAttribute('data-orientation', 'vertical');
    var range = el.querySelector('.sd-ba__range');
    if (!range) {
      range = document.createElement('input'); range.type = 'range'; range.className = 'sd-ba__range';
      range.min = 0; range.max = 100; range.step = 0.5; range.setAttribute('aria-label', SD.data(el, 'label', 'Before / after comparison'));
      el.appendChild(range); st.built.push(range);
    }
    if (!el.querySelector('.sd-ba__handle')) { var h = document.createElement('span'); h.className = 'sd-ba__handle'; h.setAttribute('aria-hidden', 'true'); el.appendChild(h); st.built.push(h); }
    if (vertical) range.setAttribute('aria-orientation', 'vertical');
    var lb = SD.data(el, 'label-before', 'Before'), la = SD.data(el, 'label-after', 'After');
    var start = SD.data(el, 'start', 50);
    range.value = start;

    function set(v) {
      v = Math.max(0, Math.min(100, +v));
      el.style.setProperty('--p', v + '%');
      range.setAttribute('aria-valuetext', lb + ' ' + Math.round(v) + '%, ' + la + ' ' + Math.round(100 - v) + '%');
      el.classList.toggle('is-near-start', v < 14); el.classList.toggle('is-near-end', v > 86);
    }
    var onInput = function () { if (st.intro) { st.intro.kill(); st.intro = null; } set(range.value); };
    range.addEventListener('input', onInput);
    set(start);

    if (SD.data(el, 'hover', false) && SD.fine()) {
      var onMove = function (e) {
        var r = el.getBoundingClientRect(), v;
        if (vertical) v = (e.clientY - r.top) / r.height * 100;
        else v = SD.dir(el) < 0 ? (r.right - e.clientX) / r.width * 100 : (e.clientX - r.left) / r.width * 100;
        range.value = v; onInput();
      };
      el.addEventListener('pointermove', onMove);
      st.off.push(function () { el.removeEventListener('pointermove', onMove); });
    }

    var g = window.gsap;
    if (g && SD.data(el, 'intro', true) && !SD.reduced()) {
      var done = false;
      var stopIO = SD.onVisible(el, function (v) {
        if (!v || done) return; done = true; stopIO();
        var o = { v: start };
        st.intro = g.timeline({ delay: 0.3, onUpdate: function () { range.value = o.v; set(o.v); }, onComplete: function () { st.intro = null; } })
          .to(o, { v: start - 18, duration: 0.7, ease: 'power2.inOut' })
          .to(o, { v: start + 12, duration: 0.8, ease: 'power2.inOut' })
          .to(o, { v: start, duration: 0.6, ease: 'power2.out' });
      }, { threshold: 0.5 });
      st.off.push(function () { stopIO(); if (st.intro) st.intro.kill(); });
    }
    st.off.push(function () { range.removeEventListener('input', onInput); el.style.removeProperty('--p'); el.classList.remove('is-near-start', 'is-near-end'); });
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.built.forEach(function (n) { n.remove(); });
    store.delete(el);
  }
  SD.fx['before-after'] = { init: init, destroy: destroy };
})();
