/* studio-design · directions/_specimens/_spec.js — specimen helper (NOT runtime, never ship it).
   Load after the page content and after runtime/demo/_demo.js (which swaps data-he copy for ?rtl=1), before core.js.
   Builds the "system strip" into <section data-spec-system data-extra="--c-chord,--img-x" data-display="Sample"
   data-display-he="דוגמה"> from the live tokens: palette chips (token name + authored value + contrast vs canvas),
   type specimen lines (display / body / mono with computed px sizes and families), radius samples, button states
   (clones of the page's [data-spec-btn] elements with .is-hover / .is-focus / [disabled]).
   Exposes window.SPEC.audit() → {fonts, contrast} for the Playwright audit. */
(function () {
  'use strict';
  var he = document.documentElement.getAttribute('dir') === 'rtl';
  var CORE = ['--c-canvas', '--c-surface', '--c-surface-2', '--c-ink', '--c-ink-2', '--c-muted', '--c-rule', '--c-accent', '--c-accent-ink', '--c-focus'];
  var cv = document.createElement('canvas'); cv.width = cv.height = 1;
  var cx = cv.getContext('2d', { willReadFrequently: true });
  function rgb(css) {
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1);
    var d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255];
  }
  function lum(c) {
    var a = c.slice(0, 3).map(function (v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function blend(fg, bg) { var a = fg[3]; return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1]; }
  function ratio(f, b) { var bb = rgb(b), ff = blend(rgb(f), bb); var L1 = lum(ff), L2 = lum(bb); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); }
  function tok(el, name) { return getComputedStyle(el).getPropertyValue(name).trim(); }
  function mk(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function px(el, prop) { return Math.round(parseFloat(getComputedStyle(el)[prop])); }
  function fam(v) { return (v || '').split(',')[0].replace(/["']/g, '').trim(); }

  function build(host) {
    var root = document.documentElement;
    var extra = (host.getAttribute('data-extra') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var box = mk('div', 'spec-sys container');
    var head = mk('div', 'spec-sys__head');
    head.appendChild(mk('h2', 'spec-sys__title', he ? 'מערכת' : 'System'));
    head.appendChild(mk('p', 'spec-sys__note', he ? 'טוקנים חיים מתוך tokens.css של הכיוון; יחס ניגודיות מחושב מול --c-canvas.' : 'Live tokens from the direction\'s tokens.css; contrast measured against --c-canvas.'));
    box.appendChild(head);

    // palette
    var pal = mk('ul', 'spec-sys__pal'); pal.setAttribute('role', 'list');
    CORE.concat(extra).forEach(function (n) {
      var v = tok(root, n); if (!v) return;
      var li = mk('li', 'spec-chip');
      var sw = mk('span', 'spec-chip__sw'); sw.style.background = 'var(' + n + ')'; li.appendChild(sw);
      li.appendChild(mk('code', 'spec-chip__name', n));
      var val = mk('span', 'spec-chip__val', v.length > 40 ? v.slice(0, 38) + '…' : v); val.dir = 'ltr'; li.appendChild(val);
      if (/^--c-(ink|ink-2|muted|accent)$/.test(n) && n.indexOf('gradient') < 0) {
        var r = ratio(v, tok(root, '--c-canvas'));
        li.appendChild(mk('span', 'spec-chip__cr', (he ? 'ניגודיות ' : 'on canvas ') + r.toFixed(1)));
      }
      pal.appendChild(li);
    });
    box.appendChild(pal);

    // type lines
    var type = mk('div', 'spec-sys__type');
    var dispTxt = (he ? host.getAttribute('data-display-he') : host.getAttribute('data-display')) || 'Display';
    var rows = [
      ['display', '--f-display', '--fs-display', dispTxt, 'spec-t--display'],
      ['2xl', '--f-display', '--fs-2xl', dispTxt, 'spec-t--h2'],
      ['body', '--f-body', '--fs-base', he ? 'גוף הטקסט נקרא בנוחות, בשורה של עד שבעים תווים.' : 'Body copy reads comfortably at a measure of about seventy characters.', 'spec-t--body'],
      ['mono', '--f-mono', '--fs-sm', 'SKU-0045 · 30×40 cm · 12:04:36', 'spec-t--mono']
    ];
    rows.forEach(function (r) {
      var line = mk('div', 'spec-tline');
      var s = mk('p', 'spec-tline__sample ' + r[4], r[3]);
      s.style.fontFamily = 'var(' + r[1] + ')'; s.style.fontSize = 'var(' + r[2] + ')';
      if (r[0] === 'mono') s.dir = 'ltr';
      var meta = mk('p', 'spec-tline__meta'); meta.dir = 'ltr';
      line.appendChild(meta); line.appendChild(s); type.appendChild(line);
      requestAnimationFrame(function () { meta.textContent = r[0] + ' · ' + fam(getComputedStyle(s).fontFamily) + ' · ' + px(s, 'fontSize') + 'px · ' + getComputedStyle(s).fontWeight; });
    });
    box.appendChild(type);

    // radius + buttons
    var row = mk('div', 'spec-sys__row');
    var rad = mk('ul', 'spec-sys__rad'); rad.setAttribute('role', 'list');
    ['--r-sm', '--r-md', '--r-lg', '--r-pill'].forEach(function (n) {
      var li = mk('li'); var b = mk('span', 'spec-rad'); b.style.borderRadius = 'var(' + n + ')';
      li.appendChild(b); var c = mk('code', null, n + ' ' + tok(root, n)); c.dir = 'ltr'; li.appendChild(c); rad.appendChild(li);
    });
    row.appendChild(rad);
    var btns = mk('ul', 'spec-sys__btns'); btns.setAttribute('role', 'list');
    Array.prototype.forEach.call(document.querySelectorAll('[data-spec-btn]'), function (src) {
      [['', he ? 'רגיל' : 'default'], ['is-hover', 'hover'], ['is-focus', 'focus'], ['disabled', he ? 'מושבת' : 'disabled']].forEach(function (st) {
        var li = mk('li'); var b = src.cloneNode(true);
        b.removeAttribute('data-spec-btn'); b.removeAttribute('id'); b.removeAttribute('data-fx'); b.setAttribute('tabindex', '-1'); b.setAttribute('aria-hidden', 'true');
        if (st[0] === 'disabled') { b.setAttribute('aria-disabled', 'true'); b.classList.add('is-disabled'); } else if (st[0]) b.classList.add(st[0]);
        if (b.tagName === 'A') b.removeAttribute('href');
        li.appendChild(b); var c = mk('code', null, st[1]); li.appendChild(c); btns.appendChild(li);
      });
    });
    row.appendChild(btns);
    box.appendChild(row);
    host.appendChild(box);
  }

  function audit() {
    var root = document.documentElement, out = { contrast: {}, fonts: [] };
    var c = tok(root, '--c-canvas'), s = tok(root, '--c-surface');
    out.contrast['ink/canvas'] = ratio(tok(root, '--c-ink'), c);
    out.contrast['ink-2/canvas'] = ratio(tok(root, '--c-ink-2'), c);
    out.contrast['muted/canvas'] = ratio(tok(root, '--c-muted'), c);
    out.contrast['muted/surface'] = ratio(tok(root, '--c-muted'), s);
    out.contrast['ink/surface'] = ratio(tok(root, '--c-ink'), s);
    out.contrast['accent-ink/accent'] = ratio(tok(root, '--c-accent-ink'), tok(root, '--c-accent'));
    out.contrast['accent/canvas'] = ratio(tok(root, '--c-accent'), c);
    Object.keys(out.contrast).forEach(function (k) { out.contrast[k] = +out.contrast[k].toFixed(2); });
    document.fonts.forEach(function (f) { if (f.status === 'loaded') out.fonts.push(f.family.replace(/["']/g, '') + ' ' + f.weight + (f.style !== 'normal' ? ' ' + f.style : '')); });
    out.fonts = Array.from(new Set(out.fonts)).sort();
    return out;
  }
  window.SPEC = { audit: audit, ratio: ratio };
  Array.prototype.forEach.call(document.querySelectorAll('[data-spec-system]'), build);
})();
