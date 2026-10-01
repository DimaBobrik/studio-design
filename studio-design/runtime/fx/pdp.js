/* studio-design · fx/pdp.js — product page behaviours:
   1) stacked gallery (desktop) / swipe gallery with scroll-snap + dots + counter (mobile) — layout is CSS (fx/pdp.css)
   2) variant radios: swap gallery image — desktop: the matching slide Flips to the top of the stack; mobile: scrolls to it;
      updates price, variant label and the add-to-cart button's data-* (so fx/cart or Woo picks up the right variation)
   3) sticky add-to-cart bar that slides in once the main ATC has scrolled above the viewport (IntersectionObserver)
   Markup: see demo/pdp.html. Hooks:
     .sd-pdp__slides > .sd-pdp__slide[data-key]         gallery slides (key = variant value they belong to)
     input[type=radio][data-slide="key"][data-price][data-id][data-img]   variant radios (data-img: replace slide 1 image instead)
     [data-pdp-price] [data-pdp-variant-label="name"]  text targets     [data-pdp-atc] main add-to-cart button
     .sd-pdp__bar  (optional) sticky bar; its [data-pdp-bar-atc] forwards the click to the main ATC
   Variation matrix (Woo variable products, several attributes): data-variations='[{"id":201,"attributes":{"attribute_pa_metal":"gold",
     "attribute_pa_size":"52"},"price":3900,"sku":"R12-G-52","in_stock":true,"stock":2,"image":"ring-gold.webp"}, …]' (from
     $product->get_available_variations(): variation_id, attributes, display_price, sku, is_in_stock, max_qty, image.src; an empty
     attribute value = "any"). Radios use name = attribute key and value = term slug. data-swap-attribute="attribute_pa_metal" names
     the attribute that swaps the image/slide (a variation "image" wins; else the slide whose data-key = the chosen value); the
     others only change price / stock / SKU / variation_id. Options with no variation are disabled; options whose variations are
     all out of stock get [data-oos] (struck, still selectable). ATC is disabled until the selection is complete and in stock
     (labels data-label-choose / -unavailable / -oos / -low with {n}, data-low-stock 3); [data-pdp-stock] and [data-pdp-sku]
     are updated; sd:pdp:change carries {name, value, variation_id, variation, in_stock}.
   Params (data-* on .sd-pdp):
     data-currency  string "ILS"   ACF text     data-locale string <html lang>   ACF text
     data-bar       bool   true    ACF true_false — enable the sticky ATC bar
     data-flip      bool   true    ACF true_false — Flip-reorder slides on variant change (desktop)
     data-label-slide string "Image {n} of {total}"  ACF text (dot aria-labels)   data-label-added string "Added"  ACF text
   WooCommerce: variable products fire jQuery 'found_variation' on form.variations_form with variation.image.src and
   variation.display_price — call  el.dispatchEvent(new CustomEvent('sd:pdp:variant', {detail:{img, price, id}}))  from that handler;
   this module listens and swaps image/price the same way.  Events: listens "sd:pdp:variant" {img, price, id, key}; emits "sd:pdp:change" {name, value} (after a radio change).
   Reduced motion: no Flip/scroll animation (instant), bar appears without slide. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [], built: [] };
    store.set(el, st);
    var g = window.gsap, reduced = SD.reduced();
    var slidesEl = el.querySelector('.sd-pdp__slides');
    var slides = slidesEl ? Array.prototype.slice.call(slidesEl.children) : [];
    var locale = SD.data(el, 'locale', document.documentElement.lang || 'en'), currency = SD.data(el, 'currency', 'ILS');
    var fmt; try { fmt = new Intl.NumberFormat(locale, { style: 'currency', currency: currency, maximumFractionDigits: 0 }); } catch (e) { fmt = { format: String }; }
    var isSwipe = function () { return slidesEl && slidesEl.scrollWidth > slidesEl.clientWidth + 4; };

    // ---------- dots + counter (mobile swipe gallery)
    if (slidesEl && slides.length > 1) {
      var dots = document.createElement('div'); dots.className = 'sd-pdp__dots';
      var count = document.createElement('span'); count.className = 'sd-pdp__count'; count.setAttribute('aria-hidden', 'true'); count.dir = 'ltr';
      var lab = SD.data(el, 'label-slide', 'Image {n} of {total}');
      slides.forEach(function (s, i) {
        var b = document.createElement('button'); b.type = 'button';
        b.setAttribute('aria-label', lab.replace('{n}', i + 1).replace('{total}', slides.length));
        b.addEventListener('click', function () { goTo(currentOrder()[i]); });
        dots.appendChild(b);
      });
      slidesEl.after(dots); slidesEl.parentNode.appendChild(count); st.built.push(dots, count);
      var setActive = function (i) {
        Array.prototype.forEach.call(dots.children, function (b, k) { b.setAttribute('aria-current', String(k === i)); });
        count.textContent = (i + 1) + ' / ' + slides.length;
      };
      setActive(0);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting && e.intersectionRatio > 0.6) setActive(currentOrder().indexOf(e.target)); });
      }, { root: slidesEl, threshold: [0.6] });
      slides.forEach(function (s) { io.observe(s); });
      st.off.push(function () { io.disconnect(); });
    }
    function currentOrder() { return Array.prototype.slice.call(slidesEl.children); }
    function goTo(slide) {
      if (!slide) return;
      if (isSwipe()) {
        // rect delta works in LTR and RTL (RTL scrollLeft is negative in modern engines)
        var x = slide.getBoundingClientRect().left - slidesEl.getBoundingClientRect().left;
        slidesEl.scrollBy({ left: x, behavior: reduced ? 'auto' : 'smooth' });
      } else {
        slide.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    // ---------- variants
    function setVariant(opts) {
      if (opts.price != null) el.querySelectorAll('[data-pdp-price]').forEach(function (n) { n.textContent = fmt.format(+opts.price); });
      var atc = el.querySelector('[data-pdp-atc]');
      if (atc) {
        if (opts.id) atc.setAttribute('data-id', opts.id);
        if (opts.price != null) atc.setAttribute('data-price', opts.price);
        if (opts.variant) atc.setAttribute('data-variant', opts.variant);
      }
      if (!slidesEl) return;
      if (opts.img) { // replace the first slide's image (Woo variation image) with a crossfade
        var first = slidesEl.firstElementChild, im = first && first.querySelector('img'); if (!im || im.src === opts.img) return;
        if (g && !reduced) {
          var ghost = im.cloneNode(); ghost.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
          first.appendChild(ghost); im.src = opts.img;
          g.to(ghost, { autoAlpha: 0, duration: 0.5, ease: 'power2.out', delay: 0.05, onComplete: function () { ghost.remove(); } });
        } else im.src = opts.img;
        el.querySelectorAll('[data-pdp-bar-img]').forEach(function (b) { b.src = opts.img; });
        return;
      }
      var target = opts.key && slides.filter(function (s) { return s.getAttribute('data-key') === opts.key; })[0];
      if (!target) return;
      el.querySelectorAll('[data-pdp-bar-img]').forEach(function (b) { var ti = target.querySelector('img'); if (ti) b.src = ti.currentSrc || ti.src; });
      if (isSwipe() || !SD.data(el, 'flip', true)) { goTo(target); return; }
      if (slidesEl.firstElementChild === target) { flash(target); scrollGalleryTop(); return; }
      var F = window.Flip;
      if (F && g && !reduced) {
        var state = F.getState(slides);
        slidesEl.prepend(target);
        F.from(state, { duration: 0.8, ease: 'power3.inOut', stagger: 0.02, onComplete: function () { flash(target); } });
      } else { slidesEl.prepend(target); flash(target); }
      scrollGalleryTop();
    }
    function flash(s) { s.classList.add('is-active'); setTimeout(function () { s.classList.remove('is-active'); }, 900); }
    function scrollGalleryTop() {
      var r = slidesEl.getBoundingClientRect(); if (r.top >= 0) return;
      var y = window.scrollY + r.top - 100;
      if (SD.lenis) SD.lenis.scrollTo(y, { duration: reduced ? 0 : 1 }); else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    }
    // ---------- variation matrix (Woo variable products): data-variations='[{"id":…,"attributes":{"attribute_pa_metal":"gold",…},"price":…}]'
    var matrix = null; try { matrix = JSON.parse(el.getAttribute('data-variations') || 'null'); } catch (e) { if (window.console) console.warn('[pdp] data-variations is not valid JSON'); }
    var swapAttr = SD.data(el, 'swap-attribute', '');
    var attrNames = matrix ? Object.keys(matrix.reduce(function (o, v) { Object.keys(v.attributes || {}).forEach(function (k) { o[k] = 1; }); return o; }, {})) : [];
    function selected() { var s = {}; attrNames.forEach(function (n) { var r = el.querySelector('input[type=radio][name="' + n + '"]:checked'); s[n] = r ? r.value : ''; }); return s; }
    function matches(v, sel, skip) { return attrNames.every(function (n) { if (n === skip) return true; var a = (v.attributes || {})[n]; return !a || !sel[n] || a === sel[n]; }); }
    function inStock(v) { return v.in_stock !== false && v.is_in_stock !== false && (v.stock == null || v.stock > 0); }
    var atcLabel = null;
    function applyMatrix(changedName) {
      var sel = selected(), complete = attrNames.every(function (n) { return sel[n]; });
      // mark options that have no variation at all (disabled) or only out-of-stock ones (data-oos, still selectable)
      attrNames.forEach(function (n) {
        el.querySelectorAll('input[type=radio][name="' + n + '"]').forEach(function (r) {
          var trial = Object.assign({}, sel); trial[n] = r.value;
          var cands = matrix.filter(function (v) { return matches(v, trial); });
          r.disabled = !cands.length;
          r.toggleAttribute('data-oos', !!cands.length && !cands.some(inStock));
        });
      });
      var v = complete ? matrix.filter(function (x) { return matches(x, sel); })[0] || null : null;
      var atcB = el.querySelector('[data-pdp-atc]'), stockEl = el.querySelector('[data-pdp-stock]'), skuEl = el.querySelector('[data-pdp-sku]');
      if (atcB && atcLabel === null) { var sp = atcB.querySelector('span') || atcB; atcLabel = sp.textContent; }
      var setAtc = function (on, text) { if (!atcB) return; atcB.disabled = !on; var sp = atcB.querySelector('span') || atcB; sp.textContent = text || atcLabel; };
      if (!v) {
        setAtc(false, complete ? SD.data(el, 'label-unavailable', 'Unavailable') : SD.data(el, 'label-choose', 'Choose options'));
        if (stockEl) stockEl.textContent = complete ? SD.data(el, 'label-unavailable', 'Unavailable') : '';
      } else {
        var ok = inStock(v);
        setAtc(ok, ok ? null : SD.data(el, 'label-oos', 'Out of stock'));
        if (stockEl) stockEl.textContent = ok ? (v.stock != null && v.stock <= SD.data(el, 'low-stock', 3) ? SD.data(el, 'label-low', 'Only {n} left').replace('{n}', v.stock) : '') : SD.data(el, 'label-oos', 'Out of stock');
        if (skuEl && v.sku) skuEl.textContent = v.sku;
        var label = attrNames.map(function (n) { var r = el.querySelector('input[name="' + n + '"]:checked'); return r ? (r.getAttribute('data-label') || r.value) : ''; }).filter(Boolean).join(' · ');
        var o = { price: v.price, id: v.id, variant: label };
        if (changedName && (!swapAttr || changedName === swapAttr)) { if (v.image) o.img = v.image; else if (swapAttr) o.key = sel[swapAttr]; }
        setVariant(o);
      }
      return v;
    }
    var onChange = function (e) {
      var r = e.target; if (r.type !== 'radio' || !el.contains(r)) return;
      var group = r.closest('.sd-pdp__opt'), lbl = group && group.querySelector('[data-pdp-variant-label]');
      var name = r.getAttribute('data-label') || r.value;
      if (lbl) lbl.textContent = name;
      var variation = null;
      if (matrix && attrNames.indexOf(r.name) > -1) variation = applyMatrix(r.name);
      else if (r.hasAttribute('data-slide') || r.hasAttribute('data-img') || r.hasAttribute('data-price')) {
        setVariant({ key: r.getAttribute('data-slide'), img: r.getAttribute('data-img'), price: r.getAttribute('data-price'), id: r.getAttribute('data-id'), variant: name });
      }
      el.dispatchEvent(new CustomEvent('sd:pdp:change', { bubbles: true, detail: { name: r.name, value: r.value,
        variation_id: variation ? variation.id : (r.getAttribute('data-id') || null), variation: variation, in_stock: variation ? inStock(variation) : null } }));
    };
    if (matrix && attrNames.length) {
      var initDis = []; el.querySelectorAll('input[type=radio]').forEach(function (r) { initDis.push([r, r.disabled]); });
      var atc0 = el.querySelector('[data-pdp-atc]'), atc0Dis = atc0 ? atc0.disabled : false;
      applyMatrix(null);
      st.off.push(function () {
        if (atc0) { atc0.disabled = atc0Dis; var sp = atc0.querySelector('span') || atc0; if (atcLabel !== null) sp.textContent = atcLabel; }
        initDis.forEach(function (p) { p[0].disabled = p[1]; p[0].removeAttribute('data-oos'); });
      });
    }
    var onExternal = function (e) { setVariant(e.detail || {}); };
    el.addEventListener('change', onChange);
    el.addEventListener('sd:pdp:variant', onExternal);
    st.off.push(function () { el.removeEventListener('change', onChange); el.removeEventListener('sd:pdp:variant', onExternal); });

    // ---------- ATC feedback (when no cart module handles it) + sticky bar
    var atc = el.querySelector('[data-pdp-atc]');
    var onAtc = function () {
      if (SD.cart) return; // fx/cart shows its own feedback
      var span = atc.querySelector('span') || atc, old = span.textContent;
      atc.classList.add('is-added'); span.textContent = SD.data(el, 'label-added', 'Added');
      setTimeout(function () { atc.classList.remove('is-added'); span.textContent = old; }, 1600);
    };
    if (atc) { atc.addEventListener('click', onAtc); st.off.push(function () { atc.removeEventListener('click', onAtc); }); }
    var bar = el.querySelector('.sd-pdp__bar') || document.querySelector('.sd-pdp__bar[data-for="' + el.id + '"]');
    if (bar && atc && SD.data(el, 'bar', true)) {
      bar.inert = true; bar.setAttribute('aria-hidden', 'true');
      var fwd = function (e) { if (e.target.closest('[data-pdp-bar-atc]')) { e.preventDefault(); atc.click(); } };
      bar.addEventListener('click', fwd);
      var show = function (v) {
        bar.classList.toggle('is-visible', v); bar.inert = !v;
        if (v) bar.removeAttribute('aria-hidden'); else bar.setAttribute('aria-hidden', 'true');
      };
      // visible only when the ATC is ABOVE the viewport (scrolled past), not before the user reaches it.
      // IO gives the cheap trigger; a rAF-throttled scroll check covers jumps (anchors, immediate scrollTo) where IO sees no crossing.
      var shown = null, raf = 0;
      var hdr = parseFloat(getComputedStyle(el).getPropertyValue('--header-h')) || 0; // ATC hidden under a sticky header counts as gone
      var check = function () { raf = 0; var r = atc.getBoundingClientRect(); var v = r.bottom < hdr; if (v !== shown) { shown = v; show(v); } };
      var onScroll = function () { if (!raf) raf = requestAnimationFrame(check); };
      var io2 = new IntersectionObserver(check);
      io2.observe(atc); var offScroll = SD.onScroll(check);
      st.off.push(function () { io2.disconnect(); offScroll(); cancelAnimationFrame(raf); bar.removeEventListener('click', fwd); show(false); bar.inert = false; bar.removeAttribute('aria-hidden'); });
    }
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    st.built.forEach(function (n) { n.remove(); });
    store.delete(el);
  }
  SD.fx.pdp = { init: init, destroy: destroy };
})();
