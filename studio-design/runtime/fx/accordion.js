/* studio-design · fx/accordion.js — smooth native <details> accordion (+ optional FAQPage JSON-LD).
   Markup (ACF repeater: question text, answer wysiwyg):
     <div class="sd-acc" data-fx="accordion" data-exclusive="true" data-jsonld="true">
       <details class="sd-acc__item" name="faq-1">
         <summary><span class="sd-acc__q">Question?</span><span class="sd-acc__icon" aria-hidden="true"></span></summary>
         <div class="sd-acc__body"><p>Answer…</p></div>
       </details> …
     </div>
   Params (data-* on .sd-acc):
     data-exclusive  bool    false   ACF true_false — one open at a time (sets a shared name="" on every <details>; native exclusive accordion)
     data-icon       string  "plus"  ACF select (plus|cross) — CSS only
     data-jsonld     bool    false   ACF true_false — injects FAQPage JSON-LD built from the DOM (prefer server-side PHP, see runtime/README.md)
     data-duration   number  0.38    ACF number — JS-fallback animation duration (s)
   Behaviour: engines with `interpolate-size` + ::details-content animate in pure CSS and this module only handles
   exclusivity/JSON-LD. Others: summary click is intercepted and height animated with GSAP (or WAAPI if GSAP is absent).
   Find-in-page (`hidden=until-found` semantics) and keyboard work natively because the element stays a real <details>.
   Events: "sd:accordion:toggle" {detail:{item, open}} on the group. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap(), uid = 0;
  var cssSmooth = !!(window.CSS && CSS.supports && CSS.supports('interpolate-size', 'allow-keywords') && CSS.supports('selector(::details-content)'));

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], ld: null, names: [] };
    store.set(el, st);
    var items = Array.prototype.slice.call(el.querySelectorAll(':scope > details, :scope > .sd-acc__item'));
    if (SD.data(el, 'exclusive', false)) {
      var name = items[0] && items[0].getAttribute('name') || 'sd-acc-' + (++uid);
      items.forEach(function (d) { if (!d.getAttribute('name')) { d.setAttribute('name', name); st.names.push(d); } });
    }
    var onToggle = function (e) {
      var d = e.target; if (items.indexOf(d) < 0) return;
      el.dispatchEvent(new CustomEvent('sd:accordion:toggle', { bubbles: true, detail: { item: d, open: d.open } }));
    };
    el.addEventListener('toggle', onToggle, true);
    st.off.push(function () { el.removeEventListener('toggle', onToggle, true); });

    if (!cssSmooth && !SD.reduced()) {
      el.classList.add('is-js');
      var dur = SD.data(el, 'duration', 0.38), g = window.gsap;
      var anim = function (body, from, to, done) {
        if (g) { g.fromTo(body, { height: from }, { height: to, duration: dur, ease: 'power3.out', overwrite: true, onComplete: function () { body.style.height = ''; done && done(); } }); }
        else if (body.animate) { var a = body.animate([{ height: from + 'px' }, { height: to + 'px' }], { duration: dur * 1000, easing: 'cubic-bezier(.16,1,.3,1)' }); a.onfinish = function () { done && done(); }; }
        else done && done();
      };
      var close = function (d) {
        var body = d.querySelector('.sd-acc__body'); if (!body || !d.open) return;
        anim(body, body.offsetHeight, 0, function () { d.open = false; d.classList.remove('is-closing'); });
        d.classList.add('is-closing');
      };
      var onClick = function (e) {
        var s = e.target.closest('summary'); if (!s) return;
        var d = s.parentElement; if (items.indexOf(d) < 0) return;
        var body = d.querySelector('.sd-acc__body'); if (!body) return;
        e.preventDefault();
        if (d.open && !d.classList.contains('is-closing')) { close(d); return; }
        // exclusive: animate siblings closed ourselves (the native name-group would snap them shut)
        var n = d.getAttribute('name');
        if (n) items.forEach(function (o) { if (o !== d && o.getAttribute('name') === n) close(o); });
        d.classList.remove('is-closing');
        d.open = true;
        anim(body, 0, body.scrollHeight);
      };
      el.addEventListener('click', onClick);
      st.off.push(function () { el.removeEventListener('click', onClick); el.classList.remove('is-js'); });
    }

    if (SD.data(el, 'jsonld', false)) {
      var data = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(function (d) {
        var q = d.querySelector('summary'), a = d.querySelector('.sd-acc__body');
        return { '@type': 'Question', name: (q ? (q.querySelector('.sd-acc__q') || q).textContent : '').trim(),
          acceptedAnswer: { '@type': 'Answer', text: (a ? a.innerHTML : '').trim() } };
      }) };
      var sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(data);
      el.appendChild(sc); st.ld = sc;
    }
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.names.forEach(function (d) { d.removeAttribute('name'); });
    if (st.ld) st.ld.remove();
    store.delete(el);
  }
  SD.fx.accordion = { init: init, destroy: destroy };
})();
