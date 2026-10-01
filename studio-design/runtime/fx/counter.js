/* studio-design fx · counter
   Count-up (tween + Intl.NumberFormat) or odometer digit-roll. The final formatted value is rendered into the DOM
   from the start (no-JS / SEO / screen readers read the real number); motion only runs when scrolled into view.
   Markup: <span data-fx="counter" data-to="1250" data-suffix="+">1,250+</span>
   Params (data-*)                               type     default        ACF field
     data-to          target value                   number   (text value)   Number
     data-from        start value                    number   0              Number
     data-decimals    fraction digits                number   0              Number
     data-format      standard|compact|percent|currency|currency-compact   select standard   Select
                      percent: data-to="42" shows 42 %; currency uses data-currency
     data-currency    ISO code                       text     ILS            Text
     data-locale      BCP-47 or "auto" (nearest lang, he -> he-IL)  text auto   Text
     data-prefix / data-suffix   extra text around the number   text  ""     Text
     data-variant     count|roll                     select   count          Select
     data-duration    seconds                        number   2 (roll 2.2)   Number
     data-start       ScrollTrigger start            text     "top 88%"      Text
     data-grouping    thousands separators           boolean  true           True/False
   A11y: while animating, the real final value sits in an .sr-only span and the counting/rolling copy is aria-hidden.
   Reduced motion: final value, no animation. Digits are always laid out LTR (unicode-bidi: isolate) so RTL pages
   never reverse them; the formatter's own RTL marks and currency placement are preserved. */
(function () {
  'use strict';
  var NAME = 'counter';
  var store = new WeakMap();
  function tidy(n) { if (!n || !n.getAttribute) return; if (n.getAttribute('class') === '') n.removeAttribute('class'); if (n.getAttribute('style') === '') n.removeAttribute('style'); }

  function locale(el) {
    var l = SD.data(el, 'locale', 'auto');
    if (l && l !== 'auto') return l;
    var n = el.closest('[lang]');
    var lang = (n && n.getAttribute('lang')) || document.documentElement.lang || 'en';
    if (/^he|^iw/i.test(lang) && lang.indexOf('-') < 0) return 'he-IL';
    return lang;
  }
  function formatter(el) {
    var dec = SD.data(el, 'decimals', 0);
    var fmt = SD.data(el, 'format', 'standard');
    var o = { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: SD.data(el, 'grouping', true) };
    if (fmt === 'compact') { o.notation = 'compact'; o.compactDisplay = 'short'; delete o.minimumFractionDigits; o.maximumFractionDigits = Math.max(dec, 1); }
    if (fmt === 'percent') o.style = 'percent';
    if (fmt === 'currency' || fmt === 'currency-compact') { o.style = 'currency'; o.currency = SD.data(el, 'currency', 'ILS'); }
    if (fmt === 'currency-compact') { o.notation = 'compact'; o.compactDisplay = 'short'; delete o.minimumFractionDigits; o.maximumFractionDigits = Math.max(dec, 1); }
    var nf;
    try { nf = new Intl.NumberFormat(locale(el), o); } catch (e) { nf = new Intl.NumberFormat('en', o); }
    var pre = SD.data(el, 'prefix', ''), suf = SD.data(el, 'suffix', '');
    return function (v) { return pre + nf.format(fmt === 'percent' ? v / 100 : v) + suf; };
  }
  function parseTarget(el) {
    var t = SD.data(el, 'to', null);
    if (typeof t === 'number') return t;
    var n = parseFloat(String(el.textContent).replace(/[^\d.\-]/g, ''));
    return isNaN(n) ? 0 : n;
  }

  function init(el) {
    if (store.has(el)) destroy(el);
    var st = { html: el.innerHTML, mm: null, label: el.getAttribute('aria-label') };
    store.set(el, st);
    var fmt = formatter(el);
    var to = parseTarget(el), from = SD.data(el, 'from', 0);
    var finalText = fmt(to);
    el.classList.add('sd-counter');
    el.textContent = finalText; // canonical final value
    var g = window.gsap;
    if (!g) return;
    var variant = SD.data(el, 'variant', 'count');
    var duration = SD.data(el, 'duration', variant === 'roll' ? 2.2 : 2);
    var start = SD.data(el, 'start', 'top 88%');
    var hasST = !!window.ScrollTrigger;

    st.mm = g.matchMedia();
    st.mm.add('(prefers-reduced-motion: no-preference)', function () {
      if (variant === 'roll') {
        // visual odometer (aria-hidden) + real value for AT
        el.textContent = '';
        var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = finalText;
        var vis = document.createElement('span'); vis.className = 'sd-roll'; vis.setAttribute('aria-hidden', 'true');
        var cols = [];
        Array.prototype.forEach.call(finalText, function (ch) {
          if (/\d/.test(ch)) {
            var col = document.createElement('span'); col.className = 'sd-roll__col';
            var reel = document.createElement('span'); reel.className = 'sd-roll__reel';
            var html = '';
            for (var r = 0; r < 2; r++) for (var d = 0; d < 10; d++) html += '<span>' + d + '</span>';
            reel.innerHTML = html;
            col.appendChild(reel);
            vis.appendChild(col);
            cols.push({ reel: reel, d: +ch });
          } else {
            var s = document.createElement('span'); s.className = 'sd-roll__sym'; s.textContent = ch; vis.appendChild(s);
          }
        });
        el.appendChild(vis); el.appendChild(sr);
        var tl = g.timeline({ scrollTrigger: hasST ? { trigger: el, start: start, once: true } : undefined });
        cols.forEach(function (c, i) {
          // each reel is 20 rows tall; land on the second cycle so every digit spins
          tl.fromTo(c.reel, { yPercent: 0 }, { yPercent: -((10 + c.d) / 20) * 100, duration: duration + i * 0.08, ease: 'expo.out' }, i * 0.04);
        });
        return function () { el.textContent = finalText; };
      }
      var obj = { v: from };
      // lock the final width so the layout never jitters while digits change
      el.style.minInlineSize = Math.ceil(el.getBoundingClientRect().width) + 'px';
      // a11y: screen readers get the final value only (sr-only); the counting copy is aria-hidden
      el.textContent = '';
      var srC = document.createElement('span'); srC.className = 'sr-only'; srC.textContent = finalText;
      var visC = document.createElement('span'); visC.setAttribute('aria-hidden', 'true'); visC.textContent = fmt(from);
      el.appendChild(srC); el.appendChild(visC);
      g.to(obj, {
        v: to, duration: duration, ease: 'power3.out',
        scrollTrigger: hasST ? { trigger: el, start: start, once: true } : undefined,
        onUpdate: function () { visC.textContent = fmt(obj.v); },
        onComplete: function () { visC.textContent = finalText; }
      });
      return function () { el.textContent = finalText; el.style.minInlineSize = ''; };
    });
  }

  function destroy(el) {
    var st = store.get(el);
    if (!st) return;
    if (st.mm) st.mm.revert();
    el.innerHTML = st.html;
    el.classList.remove('sd-counter');
    el.style.minInlineSize = '';
    tidy(el);
    store.delete(el);
  }

  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
