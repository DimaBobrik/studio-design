/* studio-design · fx/todo-links.js — honest "not in this delivery" state for links to pages that were not built.
   Every <a href="#todo-<page>"> in the document opens one small <dialog> instead of jumping to a missing anchor.
   Markup: just the links (no data-fx needed); put data-fx="todo-links" on <body> so the runtime initialises the module:
     <body data-fx="todo-links">  …  <a href="#todo-shipping">Shipping</a>
   Params (data-* on the element that has data-fx="todo-links")        type   default                        ACF
     data-title   dialog heading      text  he: "העמוד הזה עוד לא חלק מהמסירה" · en: "This page is not part of this delivery"   —
     data-text    body, {page} = slug  text  he: "העמוד „{page}” יתווסף בשלב הבא." · en: "The “{page}” page comes in a later phase."   —
     data-close   close button label   text  he: "סגירה" · en: "Close"   —
   Language follows the nearest [lang] of the clicked link (he* → Hebrew texts), or the explicit data-* texts.
   A11y: native <dialog> (focus trap, Esc, focus returns to the link); the link itself keeps its real label. Nothing is
   logged as a console error, so verify.mjs stays clean; pages.md lists every #todo-* target. Static previews only: in
   WordPress these links become real pages or are removed. */
(function () {
  'use strict';
  var NAME = 'todo-links';
  var store = new WeakMap();
  var TXT = {
    he: { title: 'העמוד הזה עוד לא חלק מהמסירה', text: 'העמוד „{page}” יתווסף בשלב הבא.', close: 'סגירה' },
    en: { title: 'This page is not part of this delivery', text: 'The “{page}” page comes in a later phase.', close: 'Close' }
  };
  function init(el) {
    if (store.has(el)) return;
    var st = {}; store.set(el, st);
    var dlg = document.createElement('dialog'); dlg.className = 'sd-todo';
    dlg.innerHTML = '<h2 class="sd-todo__title"></h2><p class="sd-todo__text"></p><form method="dialog"><button class="sd-todo__close" value="close"></button></form>';
    document.body.appendChild(dlg); st.dlg = dlg;
    var onClick = function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#todo-"]'); if (!a) return;
      e.preventDefault();
      var langEl = a.closest('[lang]'), he = /^he|^iw/i.test((langEl && langEl.getAttribute('lang')) || document.documentElement.lang || '');
      var T = he ? TXT.he : TXT.en, page = (a.textContent || '').trim() || a.getAttribute('href').slice(6);
      dlg.dir = he ? 'rtl' : 'ltr'; dlg.lang = he ? 'he' : 'en';
      dlg.querySelector('.sd-todo__title').textContent = SD.data(el, 'title', T.title);
      dlg.querySelector('.sd-todo__text').textContent = SD.data(el, 'text', T.text).replace('{page}', page);
      dlg.querySelector('.sd-todo__close').textContent = SD.data(el, 'close', T.close);
      dlg.setAttribute('aria-labelledby', 'sd-todo-title'); dlg.querySelector('.sd-todo__title').id = 'sd-todo-title';
      if (SD.lenis) SD.lenis.stop();
      dlg.showModal();
    };
    var onClose = function () { if (SD.lenis) SD.lenis.start(); };
    var onBackdrop = function (e) { if (e.target === dlg) dlg.close(); };
    document.addEventListener('click', onClick); dlg.addEventListener('close', onClose); dlg.addEventListener('click', onBackdrop);
    st.off = function () { document.removeEventListener('click', onClick); dlg.removeEventListener('close', onClose); dlg.removeEventListener('click', onBackdrop); dlg.remove(); };
  }
  function destroy(el) { var st = store.get(el); if (!st) return; st.off(); store.delete(el); }
  var mod = { init: init, destroy: destroy };
  if (window.SD && SD.register) SD.register(NAME, mod); else { window.SD = window.SD || {}; SD.fx = SD.fx || {}; SD.fx[NAME] = mod; }
})();
