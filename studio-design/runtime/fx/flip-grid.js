/* studio-design · fx/flip-grid.js — product grid: grid/list/density switch + filter chips, animated with GSAP Flip.
   Markup (see demo/flip-grid.html):
     <section class="sd-fgrid" data-fx="flip-grid">
       <div class="sd-fgrid__chips" role="group"> <button type="button" data-filter="*" aria-pressed="true">All</button> <button data-filter="bowls">…</button> </div>
       <p class="sd-fgrid__count" aria-live="polite"><span data-fgrid-count></span> …</p>
       <fieldset class="sd-fgrid__views"> <label><input type="radio" name="view" value="3" checked><span>…icon…</span></label> … value = 2|3|4|list </fieldset>
       <ul class="sd-fgrid__list" data-view="3"> <li class="sd-fgrid__item" data-tags="bowls sale">…card…</li> … </ul>
       <p class="sd-fgrid__empty" hidden>No products match.</p>
     </section>
   Several filter groups (e.g. category + metal + price band): wrap each group's chips in <div class="sd-fgrid__chips"
   data-filter-group="metal" role="group" aria-label="Metal"> (optional data-multi per group). Logic: OR within a group, AND
   across groups; each group may have its own data-filter="*" chip. A chip row wraps by default; data-chips="scroll" makes it a
   single row that scrolls inside itself (never widens the page at 320/390).
   Params (data-* on .sd-fgrid):
     data-multi     bool    false  ACF true_false — chips combine (OR); otherwise single-select
     data-duration  number  0.6    ACF number (s)
     data-stagger   number  0.02   ACF number (s)
     data-counts    bool    true   ACF true_false — append a per-chip count <sup>
     data-remember  bool    true   ACF true_false — remember view choice (localStorage, per-viewer convenience)
   WooCommerce: for server-side filtering (Store API / URL params) call  el.sdFlipSwap(function(){ …replace list items… })  —
   it captures Flip state before your DOM change and animates after.   Events: "sd:fgrid:change" {detail:{filters, view, count}}.
   Reduced motion / no Flip: instant changes (same logic, no animation). */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], sups: [] };
    store.set(el, st);
    var list = el.querySelector('.sd-fgrid__list'); if (!list) return;
    var chips = Array.prototype.slice.call(el.querySelectorAll('[data-filter]'));
    var countEl = el.querySelector('[data-fgrid-count]'), empty = el.querySelector('.sd-fgrid__empty');
    var multi = SD.data(el, 'multi', false), dur = SD.data(el, 'duration', 0.6), stag = SD.data(el, 'stagger', 0.02);
    var items = function () { return Array.prototype.slice.call(list.querySelectorAll('.sd-fgrid__item')); };
    var tags = function (it) { return (it.getAttribute('data-tags') || '').split(/\s+/); };

    if (SD.data(el, 'counts', true)) chips.forEach(function (c) {
      var f = c.getAttribute('data-filter'); var n = f === '*' ? items().length : items().filter(function (i) { return tags(i).indexOf(f) > -1; }).length;
      var s = document.createElement('sup'); s.textContent = n; s.setAttribute('aria-hidden', 'true'); c.appendChild(s); st.sups.push(s);
    });

    function flip(change) {
      var F = window.Flip, g = window.gsap;
      if (!F || !g || SD.reduced()) { change(); return; }
      var its = items();
      var targets = its.concat(its.map(function (i) { return i.querySelector('.sd-fgrid__media'); }).filter(Boolean));
      var state = F.getState(targets, { props: 'opacity' });
      change();
      if (st.tl) st.tl.progress(1);
      st.tl = F.from(state, {
        duration: dur, ease: 'power3.inOut', stagger: stag, absolute: true, nested: true, prune: true,
        onEnter: function (els) { return g.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: dur * 0.9, ease: 'power3.out', stagger: stag }); },
        onLeave: function (els) { return g.to(els, { opacity: 0, scale: 0.85, duration: dur * 0.6, ease: 'power2.in' }); }
      });
    }
    el.sdFlipSwap = flip;

    // chip groups: chips inside [data-filter-group="material"] (or with data-group) form one group; OR within a group, AND across groups
    var groupOf = function (c) { var g = c.closest('[data-filter-group]'); return (g && g.getAttribute('data-filter-group')) || c.getAttribute('data-group') || '_'; };
    var groupMulti = function (c) { var g = c.closest('[data-filter-group]'); var v = g && g.getAttribute('data-multi'); return v == null ? multi : v === 'true'; };
    function active() { return chips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; }).map(function (c) { return c.getAttribute('data-filter'); }); }
    function activeByGroup() { var o = {}; chips.forEach(function (c) { if (c.getAttribute('aria-pressed') !== 'true') return; var f = c.getAttribute('data-filter'); if (f === '*') return; (o[groupOf(c)] = o[groupOf(c)] || []).push(f); }); return o; }
    function apply() {
      var groups = activeByGroup(), n = 0;
      items().forEach(function (it) {
        var t = tags(it), show = Object.keys(groups).every(function (g) { return groups[g].some(function (x) { return t.indexOf(x) > -1; }); });
        it.hidden = !show; if (show) n++;
      });
      if (countEl) countEl.textContent = n;
      if (empty) empty.hidden = n > 0;
      emit(n);
    }
    function emit(n) {
      el.dispatchEvent(new CustomEvent('sd:fgrid:change', { bubbles: true, detail: { filters: active(), groups: activeByGroup(), view: list.getAttribute('data-view'), count: n != null ? n : items().filter(function (i) { return !i.hidden; }).length } }));
    }

    var onChip = function (e) {
      var c = e.target.closest('[data-filter]'); if (!c || !el.contains(c)) return;
      var f = c.getAttribute('data-filter'), on = c.getAttribute('aria-pressed') !== 'true';
      var grp = groupOf(c), mates = chips.filter(function (o) { return groupOf(o) === grp; });
      flip(function () {
        if (f === '*') mates.forEach(function (o) { o.setAttribute('aria-pressed', String(o === c)); });
        else if (!groupMulti(c)) mates.forEach(function (o) { o.setAttribute('aria-pressed', String(o === c ? on : false)); });
        else c.setAttribute('aria-pressed', String(on));
        var anyOn = mates.some(function (o) { return o.getAttribute('data-filter') !== '*' && o.getAttribute('aria-pressed') === 'true'; });
        mates.forEach(function (o) { if (o.getAttribute('data-filter') === '*') o.setAttribute('aria-pressed', String(!anyOn)); });
        apply();
      });
    };
    var remember = SD.data(el, 'remember', true), key = 'sd-fgrid-view:' + (el.id || location.pathname);
    var onView = function (e) {
      var r = e.target; if (r.type !== 'radio' || !r.closest('.sd-fgrid__views')) return;
      flip(function () { list.setAttribute('data-view', r.value); });
      if (remember) { try { localStorage.setItem(key, r.value); } catch (x) {} }
      emit();
    };
    el.addEventListener('click', onChip); el.addEventListener('change', onView);
    st.off.push(function () { el.removeEventListener('click', onChip); el.removeEventListener('change', onView); if (st.tl) st.tl.progress(1); delete el.sdFlipSwap; });

    if (remember) { try { var v = localStorage.getItem(key); var r = v && el.querySelector('.sd-fgrid__views input[value="' + v + '"]'); if (r) { r.checked = true; list.setAttribute('data-view', v); } } catch (x) {} }
    apply();
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.sups.forEach(function (s) { s.remove(); });
    store.delete(el);
  }
  SD.fx['flip-grid'] = { init: init, destroy: destroy };
})();
