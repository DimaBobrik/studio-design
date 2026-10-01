/* studio-design · fx/nav.js — header behaviours (use any subset):
   (a) hide on scroll down / show on scroll up + "is-scrolled" solid state after the hero
   (b) full-screen overlay menu in a <dialog>: layered panels + staggered masked link reveal, focus trap (modal dialog), Escape
   (c) mega-menu: hover intent on fine pointers (open 120 ms / close 260 ms), click on touch + keyboard, Escape returns focus
   Markup: see demo/nav.html.
     <header class="sd-nav" data-fx="nav" data-variant="pill" data-hide="true" data-hero="#hero"> … <div class="sd-nav__inner"> …
       <li class="sd-mega"><button type="button" aria-expanded="false" aria-controls="p1">Shop</button><div class="sd-mega__panel" id="p1">…</div></li>
       <button class="sd-menu-btn" aria-controls="menu" aria-expanded="false" data-nav-toggle>Menu<i></i></button>
     </header>
     <dialog class="sd-menu" id="menu" aria-label="Menu"> <div class="sd-menu__layer"></div><div class="sd-menu__layer"></div>
       <div class="sd-menu__body"> … <button data-nav-close>…</button> … <a class="sd-menu__link"><span>Work</span></a> … </div></dialog>
   Params (data-* on .sd-nav):
     data-variant  string  "bar"   ACF select (bar|pill) — CSS
     data-hide     bool    true    ACF true_false — hide on scroll down
     data-hero     string  ""      ACF text (CSS selector) — solid state starts after this element; default: after 80 px
     data-offset   number  80      ACF number — px scrolled before the solid state when no hero is given
     data-tolerance number 6       ACF number — px of upward scroll needed to reveal
   Events: "sd:nav:menu" {detail:{open}} on the header.
   Reduced motion: overlay opens/closes instantly (no stagger); hide/show still works (CSS transition clamps to 1 ms). */
(function () {
  'use strict';
  var SD = window.SD = window.SD || {}; SD.fx = SD.fx || {};
  var store = new WeakMap();

  function init(el) {
    if (store.has(el)) return;
    var st = { off: [] };
    store.set(el, st);
    var g = window.gsap;

    // ---------- (a) scroll states
    var hideOn = SD.data(el, 'hide', true), tol = SD.data(el, 'tolerance', 6);
    var heroSel = SD.data(el, 'hero', ''), hero = heroSel ? document.querySelector(heroSel) : null;
    var lastY = window.scrollY, raf = 0, acc = 0;
    var threshold = function () { return hero ? Math.max(0, hero.getBoundingClientRect().bottom + window.scrollY - el.offsetHeight) : SD.data(el, 'offset', 80); };
    var th = threshold();
    var update = function () {
      raf = 0;
      var y = Math.max(0, window.scrollY), dy = y - lastY; lastY = y;
      el.classList.toggle('is-scrolled', y > th);
      if (!hideOn) return;
      var menuOpen = el.classList.contains('is-menu-open') || el.querySelector('.sd-mega.is-open');
      if (menuOpen || el.contains(document.activeElement) && el.matches(':focus-within') && document.activeElement !== document.body) { el.classList.remove('is-hidden'); return; }
      if (y < el.offsetHeight * 2) { el.classList.remove('is-hidden'); acc = 0; return; }
      if (dy > 0) { acc = 0; if (y > th * 0.5 + el.offsetHeight) el.classList.add('is-hidden'); }
      else { acc -= dy; if (acc > tol) el.classList.remove('is-hidden'); }
    };
    var onScroll = function () { if (!raf) raf = requestAnimationFrame(update); };
    var onResize = function () { th = threshold(); onScroll(); };
    var onFocusIn = function () { el.classList.remove('is-hidden'); };
    var offScroll = SD.onScroll(update);
    window.addEventListener('resize', onResize);
    el.addEventListener('focusin', onFocusIn);
    update();
    st.off.push(function () { cancelAnimationFrame(raf); offScroll(); window.removeEventListener('resize', onResize); el.removeEventListener('focusin', onFocusIn); el.classList.remove('is-scrolled', 'is-hidden'); });

    // ---------- (b) overlay menu
    var toggles = Array.prototype.slice.call(el.querySelectorAll('[data-nav-toggle]'));
    var menu = toggles[0] && document.getElementById(toggles[0].getAttribute('aria-controls'));
    if (menu && menu.tagName === 'DIALOG') {
      var tl = null, closing = false;
      var build = function () {
        if (!g || SD.reduced()) return null;
        var layers = menu.querySelectorAll('.sd-menu__layer'), links = menu.querySelectorAll('.sd-menu__link > span'),
            fades = menu.querySelectorAll('.sd-menu__top, .sd-menu__meta');
        var t = g.timeline({ paused: true });
        t.fromTo(layers, { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'expo.inOut', stagger: 0.09 }, 0)
         .fromTo(links, { yPercent: 115, rotate: 3 * SD.dir(menu) }, { yPercent: 0, rotate: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.45)
         .fromTo(fades, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.6); // opacity (not autoAlpha): the close button must stay focusable
        return t;
      };
      var setExpanded = function (v) { toggles.forEach(function (t) { t.setAttribute('aria-expanded', String(v)); }); el.classList.toggle('is-menu-open', v); el.dispatchEvent(new CustomEvent('sd:nav:menu', { bubbles: true, detail: { open: v } })); };
      var open = function () {
        if (menu.open) return;
        closing = false;
        if (SD.lenis) SD.lenis.stop();
        menu.showModal(); setExpanded(true);
        var cb = menu.querySelector('[data-nav-close]'); if (cb) cb.focus();
        if (!tl) tl = build();
        if (tl) tl.timeScale(1).play(0);
      };
      var close = function () {
        if (!menu.open || closing) return;
        closing = true;
        var done = function () { closing = false; menu.close(); };
        if (tl) { tl.timeScale(1.8).reverse(); tl.eventCallback('onReverseComplete', function () { tl.eventCallback('onReverseComplete', null); done(); }); }
        else done();
      };
      var onToggle = function (e) { var t = e.target.closest('[data-nav-toggle]'); if (t && el.contains(t)) { e.preventDefault(); open(); } };
      var onMenuClick = function (e) {
        if (e.target.closest('[data-nav-close]')) { close(); return; }
        var a = e.target.closest('a[href]'); if (a) { closing = false; if (tl) tl.progress(0).pause(); menu.close(); } // navigate; close immediately
      };
      var onCancel = function (e) { e.preventDefault(); close(); }; // Escape -> animated close
      var onClosed = function () { setExpanded(false); if (SD.lenis) SD.lenis.start(); if (toggles[0]) toggles[0].focus({ preventScroll: true }); };
      el.addEventListener('click', onToggle); menu.addEventListener('click', onMenuClick);
      menu.addEventListener('cancel', onCancel); menu.addEventListener('close', onClosed);
      st.off.push(function () {
        el.removeEventListener('click', onToggle); menu.removeEventListener('click', onMenuClick);
        menu.removeEventListener('cancel', onCancel); menu.removeEventListener('close', onClosed);
        if (tl) { tl.progress(0).kill(); g.set(menu.querySelectorAll('.sd-menu__layer, .sd-menu__link > span, .sd-menu__top, .sd-menu__meta'), { clearProps: 'all' }); }
        if (menu.open) menu.close();
      });
    }

    // ---------- (c) mega menus
    Array.prototype.forEach.call(el.querySelectorAll('.sd-mega'), function (m) {
      var btn = m.querySelector(':scope > button'), panel = m.querySelector('.sd-mega__panel'); if (!btn || !panel) return;
      var tOpen = 0, tClose = 0, hoverAt = 0;
      var set = function (v) {
        clearTimeout(tOpen); clearTimeout(tClose);
        if (v) Array.prototype.forEach.call(el.querySelectorAll('.sd-mega.is-open'), function (o) { if (o !== m) { o.classList.remove('is-open'); o.querySelector(':scope > button').setAttribute('aria-expanded', 'false'); } });
        m.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', String(v));
        if (v) el.classList.remove('is-hidden');
      };
      // a mouse click right after hover-intent opened the panel must not immediately close it
      var onClick = function (e) { e.preventDefault(); var isOpen = btn.getAttribute('aria-expanded') === 'true'; if (isOpen && Date.now() - hoverAt < 700) return; set(!isOpen); };
      var enter = function (e) { if (e.pointerType !== 'mouse') return; clearTimeout(tClose); tOpen = setTimeout(function () { set(true); hoverAt = Date.now(); }, 120); };
      var leave = function (e) { if (e.pointerType !== 'mouse') return; clearTimeout(tOpen); tClose = setTimeout(function () { set(false); }, 260); };
      var onKey = function (e) { if (e.key === 'Escape' && m.classList.contains('is-open')) { set(false); btn.focus(); } };
      var onDoc = function (e) { if (m.classList.contains('is-open') && !m.contains(e.target)) set(false); };
      var onFocusOut = function (e) { if (!m.contains(e.relatedTarget)) set(false); };
      btn.addEventListener('click', onClick); m.addEventListener('pointerenter', enter); m.addEventListener('pointerleave', leave);
      m.addEventListener('keydown', onKey); m.addEventListener('focusout', onFocusOut); document.addEventListener('click', onDoc);
      st.off.push(function () {
        clearTimeout(tOpen); clearTimeout(tClose); set(false);
        btn.removeEventListener('click', onClick); m.removeEventListener('pointerenter', enter); m.removeEventListener('pointerleave', leave);
        m.removeEventListener('keydown', onKey); m.removeEventListener('focusout', onFocusOut); document.removeEventListener('click', onDoc);
      });
    });
  }

  function destroy(el) {
    var st = store.get(el); if (!st) return;
    st.off.forEach(function (f) { f(); });
    store.delete(el);
  }
  SD.fx.nav = { init: init, destroy: destroy };
})();
