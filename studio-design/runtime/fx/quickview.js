/* studio-design · fx/quickview.js — product quick view: the card image morphs (FLIP, shared element) into a <dialog>.
   Markup (dialog, one per page; data-fx goes on it):
     <dialog class="sd-qv" data-fx="quickview" aria-labelledby="qv-title">
       <div class="sd-qv__bg"></div>
       <div class="sd-qv__grid">
         <div class="sd-qv__media"><img data-qv-img alt=""></div>
         <div class="sd-qv__body"><h2 id="qv-title" data-qv-title></h2><p data-qv-price></p><p data-qv-text></p> … sizes …
           <div class="sd-qv__actions"><button class="sd-qv__atc" data-qv-atc data-add-to-cart>Add to cart</button><a data-qv-link>View details</a></div></div>
       </div>
       <button class="sd-qv__close" data-qv-close aria-label="Close">×</button>
     </dialog>
   Triggers (inside a card with an <img>):
     <button class="sd-qv-trigger" data-quickview data-id data-title data-price data-text data-img="large.jpg" data-url="/product/…">Quick view</button>
   Params (data-* on the dialog):
     data-currency / data-locale  ACF text — price formatting (Intl)      data-duration number 0.7 ACF number (s)
     data-label-added string "Added" ACF text
   ATC: [data-qv-atc] receives data-id/name/price/img/variant, so fx/cart (sd:cart:add) or your Woo AJAX picks it up.
   WooCommerce: render triggers in the loop (woocommerce_after_shop_loop_item) with product data attributes; for variable
   products point [data-qv-link] at the PDP or fetch /wp-json/wc/store/v1/products/{id} on open (event "sd:qv:open").
   Events: "sd:qv:open" / "sd:qv:close" {detail:{id, trigger}}.   Reduced motion / no GSAP: CSS fade, no morph. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();

  function init(dlg) {
    if (store.has(dlg) || dlg.tagName !== 'DIALOG') return;
    var st = { off: [], src: null, trigger: null, busy: false };
    store.set(dlg, st);
    var g = window.gsap, dur = SD.data(dlg, 'duration', 0.7);
    var anim = function () { return g && !SD.reduced(); };
    if (anim()) dlg.classList.add('is-js');
    var $ = function (s) { return dlg.querySelector(s); };
    var img = $('[data-qv-img]'), bg = $('.sd-qv__bg'), body = $('.sd-qv__body'), closeBtn = $('[data-qv-close]'), atc = $('[data-qv-atc]');
    var fmt; try { fmt = new Intl.NumberFormat(SD.data(dlg, 'locale', document.documentElement.lang || 'en'), { style: 'currency', currency: SD.data(dlg, 'currency', 'ILS'), maximumFractionDigits: 0 }); } catch (e) { fmt = { format: String }; }

    function fill(t, srcImg) {
      var set = function (s, v) { var n = $(s); if (n) n.textContent = v || ''; };
      set('[data-qv-title]', t.getAttribute('data-title')); set('[data-qv-text]', t.getAttribute('data-text'));
      var pr = t.getAttribute('data-price'); set('[data-qv-price]', pr ? fmt.format(+pr) : '');
      var link = $('[data-qv-link]'); if (link) link.href = t.getAttribute('data-url') || '#';
      var thumb = srcImg ? (srcImg.currentSrc || srcImg.src) : '', large = t.getAttribute('data-img');
      img.src = thumb; img.alt = srcImg ? srcImg.alt : '';
      if (large && large !== thumb) { var pre = new Image(); pre.onload = function () { if (st.trigger === t) img.src = large; }; pre.src = large; }
      if (atc) { ['id', 'price'].forEach(function (k) { var v = t.getAttribute('data-' + k); if (v != null) atc.setAttribute('data-' + k, v); }); atc.setAttribute('data-name', t.getAttribute('data-title') || ''); atc.setAttribute('data-img', thumb); }
      var first = dlg.querySelector('.sd-qv__sizes input'); if (first) first.checked = true;
    }
    function fitFrom(a, b) { return { x: a.left - b.left, y: a.top - b.top, scaleX: a.width / b.width, scaleY: a.height / b.height }; }
    function onScreen(r) { return r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; }

    function open(t) {
      if (dlg.open || st.busy) return;
      var card = t.closest('[data-product]') || t.parentElement, srcImg = card && card.querySelector('img');
      st.trigger = t; st.src = srcImg;
      fill(t, srcImg);
      if (SD.lenis) SD.lenis.stop();
      dlg.showModal();
      if (closeBtn) closeBtn.focus();
      dlg.dispatchEvent(new CustomEvent('sd:qv:open', { bubbles: true, detail: { id: t.getAttribute('data-id'), trigger: t } }));
      if (!anim()) return;
      var kids = body ? Array.prototype.slice.call(body.children) : [];
      var tl = g.timeline({ defaults: { ease: 'expo.out' }, onComplete: function () { st.busy = false; } });
      st.busy = true;
      if (srcImg && onScreen(srcImg.getBoundingClientRect())) {
        var f = fitFrom(srcImg.getBoundingClientRect(), img.getBoundingClientRect());
        srcImg.classList.add('sd-qv-src-hidden');
        tl.fromTo(img, f, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: dur, ease: 'expo.inOut' }, 0);
      } else tl.fromTo(img, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: dur * 0.8 }, 0);
      if (bg) tl.fromTo(bg, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: dur * 0.7, ease: 'power3.out' }, dur * 0.35);
      tl.fromTo(kids, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, dur * 0.45);
      if (closeBtn) tl.fromTo(closeBtn, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, dur * 0.6);
      st.tl = tl;
    }
    function finish() {
      if (st.src) st.src.classList.remove('sd-qv-src-hidden');
      if (g) g.set([img, bg, closeBtn].concat(body ? Array.prototype.slice.call(body.children) : []).filter(Boolean), { clearProps: 'all' });
      if (dlg.open) dlg.close();
      st.busy = false;
    }
    function close() {
      if (!dlg.open) return;
      if (st.tl) st.tl.progress(1);
      if (!anim()) { finish(); return; }
      st.busy = true;
      var kids = body ? Array.prototype.slice.call(body.children) : [];
      var tl = g.timeline({ onComplete: finish });
      tl.to(kids.concat(closeBtn ? [closeBtn] : []), { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, 0);
      if (bg) tl.to(bg, { opacity: 0, scale: 0.97, duration: dur * 0.6, ease: 'power2.inOut' }, 0.05);
      var r = st.src && st.src.getBoundingClientRect();
      if (r && onScreen(r)) tl.to(img, Object.assign(fitFrom(r, img.getBoundingClientRect()), { duration: dur * 0.85, ease: 'expo.inOut' }), 0);
      else tl.to(img, { autoAlpha: 0, duration: 0.3 }, 0);
    }

    var onDoc = function (e) { var t = e.target.closest('[data-quickview]'); if (t) { e.preventDefault(); open(t); } };
    var onDlgClick = function (e) { if (e.target === dlg || e.target.closest('[data-qv-close]')) close(); };
    var onCancel = function (e) { e.preventDefault(); close(); };
    var onClose = function () {
      if (SD.lenis) SD.lenis.start();
      if (st.src) st.src.classList.remove('sd-qv-src-hidden');
      var t = st.trigger; if (t && t.isConnected) t.focus({ preventScroll: true });
      dlg.dispatchEvent(new CustomEvent('sd:qv:close', { bubbles: true, detail: { id: t && t.getAttribute('data-id'), trigger: t } }));
    };
    var onAtc = function () {
      if (SD.cart) { close(); return; } // fx/cart takes over (fly + drawer)
      atc.classList.add('is-added'); var o = atc.textContent; atc.textContent = SD.data(dlg, 'label-added', 'Added');
      setTimeout(function () { atc.classList.remove('is-added'); atc.textContent = o; }, 1500);
    };
    document.addEventListener('click', onDoc); dlg.addEventListener('click', onDlgClick); dlg.addEventListener('cancel', onCancel); dlg.addEventListener('close', onClose);
    if (atc) atc.addEventListener('click', onAtc);
    st.off.push(function () {
      document.removeEventListener('click', onDoc); dlg.removeEventListener('click', onDlgClick); dlg.removeEventListener('cancel', onCancel); dlg.removeEventListener('close', onClose);
      if (atc) atc.removeEventListener('click', onAtc);
      if (st.tl) st.tl.kill(); finish(); dlg.classList.remove('is-js');
    });
    SD.quickview = { open: open, close: close };
  }

  function destroy(dlg) {
    var st = store.get(dlg); if (!st) return;
    st.off.forEach(function (f) { f(); });
    store.delete(dlg);
  }
  SD.fx.quickview = { init: init, destroy: destroy };
})();
