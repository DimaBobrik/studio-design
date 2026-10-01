/* studio-design · fx/testimonials.js — multi-row capsule testimonial marquee; click a capsule -> quote in a <dialog>.
   Ported idea: a common effect prompt "Testimonial Marquee" (rows alternate direction, capsules repeat, hatch band, edge fades, modal).
   Markup (ACF repeater -> <li>):
     <section class="sd-testi" data-fx="testimonials" data-rows="3" data-speed="40">
       <ul class="sd-testi__list">
         <li class="sd-testi__item"><img src alt=""><b class="sd-testi__name">Name</b><small class="sd-testi__role">Role</small><blockquote>Quote</blockquote></li> …
       </ul>
     </section>
   Params (data-* on section):
     data-rows          number  3        ACF number (1–4) — items are split into this many rows in order
     data-speed         number  40       ACF number — px per second
     data-pause-hover   bool    true     ACF true_false — row eases to a stop while hovered/focused
     data-label-pause   string  "Pause"  ACF text ; data-label-play "Play" ; data-label-close "Close" ; data-label-open "Read testimonial from"
   Events: dispatches "sd:testimonials:open" {detail:{index}} on the section.
   A11y: first copy of each row is real <button>s; clones are aria-hidden + tabindex=-1. Pause button satisfies WCAG 2.2.2.
   Reduced motion / no GSAP: static rows that scroll natively (no loop). */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();
  var ICON_PAUSE = '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="2.6" height="9" rx=".6" fill="currentColor"/><rect x="7.4" y="1.5" width="2.6" height="9" rx=".6" fill="currentColor"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.6v8.8L10.4 6z" fill="currentColor"/></svg>';
  var ICON_X = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function txt(n, sel) { var x = n.querySelector(sel); return x ? x.textContent.trim() : ''; }

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], tweens: [], built: [], paused: false, hover: [] };
    store.set(el, st);
    var items = Array.prototype.map.call(el.querySelectorAll('.sd-testi__item'), function (li) {
      var img = li.querySelector('img');
      return { src: img ? (img.currentSrc || img.src) : '', name: txt(li, '.sd-testi__name'), role: txt(li, '.sd-testi__role'), quote: txt(li, 'blockquote') };
    });
    if (!items.length) return;
    var nRows = Math.max(1, Math.min(items.length, SD.data(el, 'rows', 3)));
    var speed = SD.data(el, 'speed', 40);
    var labelOpen = SD.data(el, 'label-open', 'Read testimonial from');

    // ---- dialog
    var dlg = document.createElement('dialog');
    dlg.className = 'sd-testi__dialog';
    dlg.setAttribute('aria-labelledby', '');
    dlg.innerHTML = '<button type="button" class="sd-testi__close" aria-label="' + SD.data(el, 'label-close', 'Close') + '">' + ICON_X + '</button>' +
      '<blockquote></blockquote><div class="sd-testi__who"><img alt="" width="52" height="52"><div><b></b><small></small></div></div>';
    el.appendChild(dlg); st.built.push(dlg);
    var uid = 'sdt' + Math.random().toString(36).slice(2, 8);
    dlg.querySelector('b').id = uid; dlg.setAttribute('aria-labelledby', uid);
    var trigger = null;
    function open(i, btn) {
      var it = items[i]; trigger = btn || null;
      dlg.querySelector('blockquote').textContent = it.quote;
      dlg.querySelector('img').src = it.src;
      dlg.querySelector('b').textContent = it.name;
      dlg.querySelector('small').textContent = it.role;
      if (SD.lenis) SD.lenis.stop();
      dlg.showModal();
      el.dispatchEvent(new CustomEvent('sd:testimonials:open', { bubbles: true, detail: { index: i } }));
    }
    var onClose = function () { if (SD.lenis) SD.lenis.start(); if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true }); trigger = null; };
    var onDlgClick = function (e) { if (e.target === dlg || e.target.closest('.sd-testi__close')) dlg.close(); };
    dlg.addEventListener('close', onClose); dlg.addEventListener('click', onDlgClick);

    // ---- rows
    var band = document.createElement('div'); band.className = 'sd-testi__band';
    el.insertBefore(band, dlg); st.built.push(band);
    var per = Math.ceil(items.length / nRows), rows = [];
    for (var r = 0; r < nRows; r++) {
      var row = document.createElement('div'); row.className = 'sd-testi__row';
      var group = document.createElement('ul'); group.className = 'sd-testi__group'; group.setAttribute('role', 'list');
      items.slice(r * per, r * per + per).forEach(function (it, k) {
        var idx = r * per + k;
        var li = document.createElement('li');
        li.innerHTML = '<button type="button" class="sd-testi__cap" data-i="' + idx + '"><img alt="" loading="lazy" width="56" height="56"><span><b></b><small></small></span></button>';
        var b = li.firstChild; b.querySelector('img').src = it.src; b.querySelector('b').textContent = it.name; b.querySelector('small').textContent = it.role;
        b.setAttribute('aria-label', labelOpen + ' ' + it.name + (it.role ? ', ' + it.role : ''));
        group.appendChild(li);
      });
      row.appendChild(group); band.appendChild(row); rows.push(row);
    }
    var onCapClick = function (e) { var b = e.target.closest('.sd-testi__cap'); if (b) open(+b.getAttribute('data-i'), b); };
    band.addEventListener('click', onCapClick);
    el.classList.add('is-ready');

    var g = window.gsap;
    var animated = g && !SD.reduced();
    if (!animated) { el.classList.add('is-static'); }
    else {
      // pause button (WCAG 2.2.2)
      var pb = document.createElement('button'); pb.type = 'button'; pb.className = 'sd-testi__pause';
      var lp = SD.data(el, 'label-pause', 'Pause'), ll = SD.data(el, 'label-play', 'Play');
      var setPb = function () { pb.innerHTML = (st.paused ? ICON_PLAY : ICON_PAUSE) + '<span>' + (st.paused ? ll : lp) + '</span>'; pb.setAttribute('aria-pressed', String(st.paused)); };
      setPb(); el.appendChild(pb); st.built.push(pb);
      var onPb = function () { st.paused = !st.paused; setPb(); apply(); };
      pb.addEventListener('click', onPb);

      var visible = true, lastW = 0;
      var apply = function () { st.tweens.forEach(function (t, i) { var run = visible && !st.paused; if (!run) t.pause(); else { t.play(); g.to(t, { timeScale: st.hover[i] ? 0 : 1, duration: 0.6, ease: 'power2.out', overwrite: true }); } }); };
      var build = function () {
        var w = band.clientWidth; if (Math.abs(w - lastW) < 2 && st.tweens.length) return; lastW = w;
        st.tweens.forEach(function (t) { t.kill(); }); st.tweens = [];
        var dir = SD.dir(el);
        rows.forEach(function (row, i) {
          // reset clones
          Array.prototype.slice.call(row.children, 1).forEach(function (c) { c.remove(); });
          g.set(row, { x: 0 });
          var gw = row.firstElementChild.getBoundingClientRect().width;
          if (!gw) return;
          var copies = Math.ceil(w / gw) + 2;
          for (var c = 1; c < copies; c++) {
            var cl = row.firstElementChild.cloneNode(true); cl.setAttribute('aria-hidden', 'true');
            cl.querySelectorAll('button').forEach(function (b) { b.tabIndex = -1; });
            row.appendChild(cl);
          }
          var d = gw / speed * (1 + i * 0.08); // slight speed variance per row
          var from = i % 2 === 0 ? 0 : -gw * dir, to = i % 2 === 0 ? -gw * dir : 0;
          st.tweens.push(g.fromTo(row, { x: from }, { x: to, duration: d, ease: 'none', repeat: -1 }));
          st.hover[i] = false;
        });
        apply();
      };
      build();
      if (SD.data(el, 'pause-hover', true)) {
        rows.forEach(function (row, i) {
          var on = function () { st.hover[i] = true; apply(); }, offf = function () { st.hover[i] = false; apply(); };
          row.addEventListener('pointerenter', on); row.addEventListener('pointerleave', offf);
          row.addEventListener('focusin', on); row.addEventListener('focusout', offf);
          st.off.push(function () { row.removeEventListener('pointerenter', on); row.removeEventListener('pointerleave', offf); row.removeEventListener('focusin', on); row.removeEventListener('focusout', offf); });
        });
      }
      st.off.push(SD.onVisible(el, function (v) { visible = v; apply(); }, { rootMargin: '50px' }));
      var ro = new ResizeObserver(function () { build(); });
      ro.observe(band);
      // rebuild once images have their size (capsule widths depend on font load)
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (store.get(el) === st) { lastW = 0; build(); } });
      st.off.push(function () { ro.disconnect(); pb.removeEventListener('click', onPb); st.tweens.forEach(function (t) { t.kill(); }); });
    }
    st.off.push(function () {
      band.removeEventListener('click', onCapClick); dlg.removeEventListener('close', onClose); dlg.removeEventListener('click', onDlgClick);
      if (dlg.open) dlg.close();
      el.classList.remove('is-ready', 'is-static');
    });
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.built.forEach(function (n) { n.remove(); });
    store.delete(el);
  }
  SD.fx.testimonials = { init: init, destroy: destroy };
})();
