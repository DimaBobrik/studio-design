/* Demo helper (not part of the runtime; never ship it). Place it after the page content, BEFORE core.js.
   ?rtl=1 -> <html dir="rtl" lang="he"> and swaps demo copy to Hebrew so RTL screenshots show real Hebrew:
     data-he="..."               replaces textContent (also inside <template> content)
     data-he-html="..."          replaces innerHTML
     data-he-aria="..."          sets aria-label (short alias; also inside <template>)
     data-he-ph="..."            sets placeholder (short alias)
     data-he-attr-<name>="..."   sets attribute <name>  (e.g. data-he-attr-data-label-close)
     data-he-<name>="..."        sets attribute <name>  (e.g. data-he-alt, data-he-aria-label, data-he-data-words)
     <meta name="he-title" content="..."> replaces document.title */
(function () {
  if (!/[?&]rtl=1/.test(location.search)) return;
  var html = document.documentElement;
  html.setAttribute('dir', 'rtl');
  html.setAttribute('lang', 'he');
  var ALIAS = { 'data-he-aria': 'aria-label', 'data-he-ph': 'placeholder' };
  function swapEl(el) {
    Array.prototype.slice.call(el.attributes).forEach(function (a) {
      var n = a.name;
      if (n === 'data-he') el.textContent = a.value;
      else if (n === 'data-he-html') el.innerHTML = a.value;
      else if (ALIAS[n]) el.setAttribute(ALIAS[n], a.value);
      else if (n.indexOf('data-he-attr-') === 0) el.setAttribute(n.slice(13), a.value);
      else if (n.indexOf('data-he-') === 0) el.setAttribute(n.slice(8), a.value);
    });
  }
  function swap(root) {
    Array.prototype.forEach.call(root.querySelectorAll('*'), swapEl);
    Array.prototype.forEach.call(root.querySelectorAll('template'), function (t) { swap(t.content); });
  }
  swap(document.body || document);
  var t = document.querySelector('meta[name="he-title"]');
  if (t) document.title = t.content;
})();
