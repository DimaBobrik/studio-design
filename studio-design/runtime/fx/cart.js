/* studio-design · fx/cart.js — WooCommerce-style side cart: fly-to-cart, <dialog> drawer, free-shipping meter, qty steppers,
   Intl currency subtotal, mini-cart count bump. One cart per page (data-fx="cart" on the <dialog>).
   Markup: see demo/cart.html. Hooks (attributes, not classes, so any theme markup works):
     [data-add-to-cart]  data-id data-name data-price data-img data-variant data-qty  -> adds (fly animation from the closest [data-product] img)
     [data-cart-open]    opens the drawer (the visible one is the fly target)      [data-cart-count] badge text
     inside the dialog:  [data-cart-lines] <ul>, <template data-cart-line>, [data-cart-subtotal], [data-cart-ship-text], [data-cart-meter],
                         [data-cart-checkout], [data-cart-live] (aria-live), [data-cart-close], [data-cart-empty], [data-cart-items-count]
     line template:      [data-line-img] [data-line-name] [data-line-variant] [data-line-price] [data-line-qty] [data-line-dec] [data-line-inc] [data-line-remove]
   Params (data-* on the dialog):
     data-currency       string "ILS"    ACF text (ISO 4217)      data-locale string <html lang> ACF text (e.g. he-IL)
     data-free-shipping  number 0        ACF number — threshold in major units; 0 hides the meter
     data-open-on-add    bool   true     ACF true_false — open the drawer after the fly lands (false: badge bump only)
     data-persist        bool   false    ACF true_false — keep the cart in localStorage. Set data-persist="true" on every multi-page static
                                        preview (the cart survives shop → product → cart); REMOVE it in WooCommerce (Woo cart fragments /
                                        Store API are the source of truth)
     data-label-away     string "{amount} away from free shipping"   ACF text
     data-label-free     string "Free shipping unlocked"             ACF text
     data-label-added    string "{name} added to cart"               ACF text (aria-live)
     data-label-dec / data-label-inc / data-label-qty   ACF text (aria-labels for steppers)
   Events (document):
     listen  "sd:cart:add"    detail {id, name, price, img, variant, qty, from?: Element}  -> adds + flies from `from`
     listen  "sd:cart:open" / "sd:cart:close"
     emit    "sd:cart:change" detail {items, count, subtotal}   (also after qty/remove)
     emit    "sd:cart:added"  detail {item}
   API: SD.cart = { add(item, fromEl), setQty(id, q), remove(id), set(items), items(), open(), close(), fly(img), syncFromStore() }
   ── WooCommerce wiring (pick one) ──────────────────────────────────────────────────────────────────────────────
   A) Classic AJAX add-to-cart buttons (archive loops). Woo fires a jQuery event after its own AJAX call:
        jQuery(document.body).on('added_to_cart', function (e, fragments, hash, $btn) {
          var b = $btn && $btn[0], card = b && b.closest('.product');
          SD.cart.syncFromStore().then(function () { SD.cart.fly(card && card.querySelector('img')); SD.cart.open(); });
        });
      Keep Woo's own fragments for the header count if you like; this drawer re-reads the Store API instead.
   B) Store API (blocks-era, no jQuery). GET cart / POST add-item / POST update-item / POST remove-item:
        fetch('/wp-json/wc/store/v1/cart', {credentials:'same-origin'}) -> json.items[i]: {key, id, name, quantity,
          images[0].thumbnail, variation[{attribute,value}], prices:{price, currency_minor_unit}}  (prices are strings in minor units)
        Writes need the nonce: read response header 'Nonce' (or wcSettings.storeApiNonce) and send it back as header 'Nonce'.
        POST /wp-json/wc/store/v1/cart/add-item   {id, quantity, variation?}
        POST /wp-json/wc/store/v1/cart/update-item {key, quantity}        POST /wp-json/wc/store/v1/cart/remove-item {key}
      Set window.SD_CART_ADAPTER = { add(item), update(key, qty), remove(key), load() } — each returns a Promise of the cart as
      this module's item array [{id, key, name, price (major units), img, variant, qty}] (map json.items yourself; example in
      runtime/README.md §4 cart). The module then renders what the server returns (server is the source of truth).
   Reduced motion: no fly, no slide (instant), badge updates without bounce. */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();

  function init(dlg) {
    if (store.has(dlg)) return;
    if (dlg.tagName !== 'DIALOG') { console.warn('[SD cart] data-fx="cart" must be on a <dialog>'); return; }
    var st = { off: [], items: [] };
    store.set(dlg, st);
    var $ = function (s) { return dlg.querySelector(s); };
    var locale = SD.data(dlg, 'locale', document.documentElement.lang || 'en'), currency = SD.data(dlg, 'currency', 'ILS');
    var fmt; try { fmt = new Intl.NumberFormat(locale, { style: 'currency', currency: currency, maximumFractionDigits: 2, minimumFractionDigits: 0 }); } catch (e) { fmt = { format: function (n) { return n.toFixed(2); } }; }
    var money = function (n) { return fmt.format(n); };
    var free = SD.data(dlg, 'free-shipping', 0), openOnAdd = SD.data(dlg, 'open-on-add', true), persist = SD.data(dlg, 'persist', false);
    var L = function (k, d) { return SD.data(dlg, 'label-' + k, d); };
    var adapter = window.SD_CART_ADAPTER || null;
    var linesEl = $('[data-cart-lines]'), tpl = $('template[data-cart-line]'), live = $('[data-cart-live]');
    var nodes = {}; // id -> li
    var g = window.gsap, reduced = SD.reduced();

    if (persist) { try { st.items = JSON.parse(localStorage.getItem('sd-cart') || '[]') || []; } catch (e) {} }

    function totals() {
      var c = 0, s = 0; st.items.forEach(function (i) { c += i.qty; s += i.qty * i.price; });
      return { count: c, subtotal: Math.round(s * 100) / 100 };
    }
    function save() { if (persist) { try { localStorage.setItem('sd-cart', JSON.stringify(st.items)); } catch (e) {} } }

    function lineFor(it) {
      var li = tpl.content.firstElementChild.cloneNode(true);
      li.setAttribute('data-id', it.id);
      var img = li.querySelector('[data-line-img]'); if (img) { img.src = it.img || ''; img.alt = ''; }
      var q = li.querySelector('[data-line-qty]');
      if (q) q.setAttribute('aria-label', L('qty', 'Quantity') + ' — ' + it.name);
      var d = li.querySelector('[data-line-dec]'); if (d) d.setAttribute('aria-label', L('dec', 'Decrease quantity') + ' — ' + it.name);
      var n = li.querySelector('[data-line-inc]'); if (n) n.setAttribute('aria-label', L('inc', 'Increase quantity') + ' — ' + it.name);
      return li;
    }
    function fill(li, it) {
      var set = function (s, v) { var n = li.querySelector(s); if (n) n.textContent = v; };
      set('[data-line-name]', it.name); set('[data-line-variant]', it.variant || ''); set('[data-line-price]', money(it.price * it.qty));
      var q = li.querySelector('[data-line-qty]'); if (q && document.activeElement !== q) q.value = it.qty;
      var v = li.querySelector('[data-line-variant]'); if (v) v.hidden = !it.variant;
    }

    function render(changedId) {
      var t = totals();
      // lines (keyed; animated enter/leave)
      var keep = {};
      st.items.forEach(function (it) {
        keep[it.id] = 1;
        var li = nodes[it.id];
        if (!li) {
          li = nodes[it.id] = lineFor(it); linesEl.appendChild(li);
          if (g && !reduced && dlg.open) g.from(li, { autoAlpha: 0, x: 24 * SD.dir(dlg), duration: 0.5, ease: 'expo.out', clearProps: 'all' });
        }
        fill(li, it);
        if (changedId === it.id && g && !reduced && dlg.open) { var pr = li.querySelector('[data-line-price]'); if (pr) g.fromTo(pr, { y: -6, autoAlpha: 0.2 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out' }); }
      });
      Object.keys(nodes).forEach(function (id) {
        if (keep[id]) return;
        var li = nodes[id]; delete nodes[id];
        if (g && !reduced && dlg.open) g.to(li, { autoAlpha: 0, x: -24 * SD.dir(dlg), duration: 0.3, ease: 'power2.in', onComplete: function () { li.remove(); } });
        else li.remove();
      });
      dlg.classList.toggle('is-empty', !st.items.length);
      var sub = $('[data-cart-subtotal]'); if (sub) sub.textContent = money(t.subtotal);
      var ic = $('[data-cart-items-count]'); if (ic) ic.textContent = t.count ? '(' + t.count + ')' : '';
      var co = $('[data-cart-checkout]'); if (co) co.setAttribute('aria-disabled', String(!st.items.length));
      // free shipping meter
      var ship = $('[data-cart-ship]');
      if (ship) {
        ship.hidden = !free || !st.items.length;
        if (free) {
          var p = Math.min(1, t.subtotal / free), left = Math.max(0, free - t.subtotal);
          ship.classList.toggle('is-free', left <= 0);
          var tx = $('[data-cart-ship-text]');
          if (tx) tx.textContent = left > 0 ? L('away', '{amount} away from free shipping').replace('{amount}', money(left)) : L('free', 'Free shipping unlocked');
          var m = $('[data-cart-meter]'); if (m) { m.style.setProperty('--p', p.toFixed(3)); var bar = m.parentElement; if (bar && bar.getAttribute('role') === 'progressbar') bar.setAttribute('aria-valuenow', Math.round(p * 100)); }
        }
      }
      // badges
      document.querySelectorAll('[data-cart-count]').forEach(function (b) {
        b.textContent = t.count || '';
        if (t.count) b.removeAttribute('data-zero'); else b.setAttribute('data-zero', '');
      });
      save();
      document.dispatchEvent(new CustomEvent('sd:cart:change', { detail: { items: st.items.slice(), count: t.count, subtotal: t.subtotal } }));
    }

    function bump() {
      if (!g || reduced) return;
      document.querySelectorAll('[data-cart-count]').forEach(function (b) { g.fromTo(b, { scale: 1.6 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.35)', overwrite: true }); });
      var btn = target(); if (btn) g.fromTo(btn, { rotate: -10 }, { rotate: 0, duration: 0.7, ease: 'elastic.out(1.2, 0.3)', overwrite: true });
    }
    function target() {
      var list = document.querySelectorAll('[data-cart-open]');
      for (var i = 0; i < list.length; i++) { var r = list[i].getBoundingClientRect(); if (r.width && r.bottom > 0 && r.top < innerHeight) return list[i]; }
      return list[0] || null;
    }
    // fly: clone of the source image travels on an arc to the cart icon (RTL-aware because it measures the real target rect)
    function fly(img) {
      return new Promise(function (resolve) {
        var tgt = target();
        if (!img || !tgt || !g || reduced) { resolve(); return; }
        var a = img.getBoundingClientRect(), b = tgt.getBoundingClientRect();
        if (!a.width) { resolve(); return; }
        var c = document.createElement('img'); c.className = 'sd-cart-fly'; c.src = img.currentSrc || img.src; c.alt = ''; c.setAttribute('aria-hidden', 'true');
        c.style.width = a.width + 'px'; c.style.height = a.height + 'px';
        document.body.appendChild(c);
        var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
        var s = Math.max(0.08, 36 / Math.max(a.width, a.height));
        g.set(c, { x: a.left, y: a.top, transformOrigin: '50% 50%' });
        var tl = g.timeline({ onComplete: function () { c.remove(); resolve(); } });
        tl.to(c, { x: a.left + dx, duration: 0.85, ease: 'power1.inOut' }, 0)
          .to(c, { y: a.top + dy, duration: 0.85, ease: 'back.in(1.6)' }, 0)       // y lags then accelerates -> arc
          .to(c, { scale: s, borderRadius: '50%', duration: 0.85, ease: 'power2.in' }, 0)
          .to(c, { autoAlpha: 0, duration: 0.2, ease: 'power1.in' }, 0.7);
        st.fly = tl;
      });
    }

    function announce(msg) { if (live) { live.textContent = ''; setTimeout(function () { live.textContent = msg; }, 50); } }
    function norm(d) { return { id: String(d.id || d.name), name: d.name || '', price: +d.price || 0, img: d.img || '', variant: d.variant || '', qty: Math.max(1, +d.qty || 1), key: d.key }; }

    function add(data, from) {
      var it = norm(data);
      var ex = st.items.filter(function (i) { return i.id === it.id; })[0];
      var srcImg = from ? (from.tagName === 'IMG' ? from : (from.closest('[data-product]') || from).querySelector('img')) : null;
      var apply = function () {
        if (ex) ex.qty += it.qty; else st.items.push(it);
        render(it.id); bump(); announce(L('added', '{name} added to cart').replace('{name}', it.name));
        document.dispatchEvent(new CustomEvent('sd:cart:added', { detail: { item: it } }));
        if (openOnAdd) open();
      };
      var p = adapter && adapter.add ? adapter.add(it).then(function (cart) { if (cart) setAll(cart, true); }) : Promise.resolve();
      return Promise.all([fly(srcImg), p]).then(function () { if (!adapter) apply(); else { bump(); announce(L('added', '{name} added to cart').replace('{name}', it.name)); if (openOnAdd) open(); } });
    }
    function setQty(id, q) {
      q = Math.max(0, Math.min(99, parseInt(q, 10) || 0));
      var it = st.items.filter(function (i) { return i.id === String(id); })[0]; if (!it) return;
      if (adapter && adapter.update) { adapter.update(it.key || it.id, q).then(function (cart) { if (cart) setAll(cart, true); }); }
      if (!q) { remove(id); return; }
      it.qty = q; render(it.id);
    }
    function remove(id) {
      if (adapter && adapter.remove) { var it = st.items.filter(function (i) { return i.id === String(id); })[0]; if (it) adapter.remove(it.key || it.id).then(function (cart) { if (cart) setAll(cart, true); }); }
      st.items = st.items.filter(function (i) { return i.id !== String(id); }); render();
    }
    function setAll(items, quiet) { st.items = (items || []).map(norm); render(); if (!quiet) bump(); }

    function open() { if (dlg.open) return; if (SD.lenis) SD.lenis.stop(); dlg.showModal(); var x = $('[data-cart-close]'); if (x) x.focus(); }
    function close() { if (dlg.open) dlg.close(); }

    // ---- wiring
    var onDocClick = function (e) {
      var a = e.target.closest('[data-add-to-cart]');
      if (a) {
        e.preventDefault();
        if (a.getAttribute('aria-disabled') === 'true') return;
        document.dispatchEvent(new CustomEvent('sd:cart:add', { detail: { id: a.getAttribute('data-id'), name: a.getAttribute('data-name'), price: a.getAttribute('data-price'),
          img: a.getAttribute('data-img'), variant: a.getAttribute('data-variant'), qty: a.getAttribute('data-qty'), from: a } }));
        return;
      }
      if (e.target.closest('[data-cart-open]')) { e.preventDefault(); open(); }
    };
    var onAdd = function (e) { var d = e.detail || {}; add(d, d.from || null); };
    var onOpen = function () { open(); }, onCloseEv = function () { close(); };
    var onDlgClick = function (e) {
      if (e.target === dlg || e.target.closest('[data-cart-close]')) { close(); return; }
      var li = e.target.closest('[data-id]'); if (!li) return;
      var id = li.getAttribute('data-id'), it = st.items.filter(function (i) { return i.id === id; })[0]; if (!it) return;
      if (e.target.closest('[data-line-inc]')) setQty(id, it.qty + 1);
      else if (e.target.closest('[data-line-dec]')) setQty(id, it.qty - 1);
      else if (e.target.closest('[data-line-remove]')) remove(id);
    };
    var onChange = function (e) { var q = e.target.closest('[data-line-qty]'); if (!q) return; var li = q.closest('[data-id]'); setQty(li.getAttribute('data-id'), q.value); };
    var onClose = function () { if (SD.lenis) SD.lenis.start(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('sd:cart:add', onAdd);
    document.addEventListener('sd:cart:open', onOpen); document.addEventListener('sd:cart:close', onCloseEv);
    dlg.addEventListener('click', onDlgClick); dlg.addEventListener('change', onChange); dlg.addEventListener('close', onClose);
    st.off.push(function () {
      document.removeEventListener('click', onDocClick); document.removeEventListener('sd:cart:add', onAdd);
      document.removeEventListener('sd:cart:open', onOpen); document.removeEventListener('sd:cart:close', onCloseEv);
      dlg.removeEventListener('click', onDlgClick); dlg.removeEventListener('change', onChange); dlg.removeEventListener('close', onClose);
      if (st.fly) st.fly.progress(1);
      if (dlg.open) dlg.close();
      Object.keys(nodes).forEach(function (id) { nodes[id].remove(); });
    });

    SD.cart = {
      add: function (item, from) { return add(item, from); }, setQty: setQty, remove: remove, set: setAll, open: open, close: close, fly: fly,
      items: function () { return st.items.slice(); }, totals: totals,
      syncFromStore: function () { return adapter && adapter.load ? adapter.load().then(function (c) { setAll(c, true); }) : Promise.resolve(); }
    };
    render();
    if (adapter && adapter.load) SD.cart.syncFromStore();
  }

  function destroy(dlg) {
    var st = store.get(dlg); if (!st) return;
    st.off.forEach(function (f) { f(); });
    store.delete(dlg);
    if (SD.cart) delete SD.cart;
  }
  SD.fx.cart = { init: init, destroy: destroy };
})();
