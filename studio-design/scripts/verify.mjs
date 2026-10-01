#!/usr/bin/env node
/* studio-design · scripts/verify.mjs — Playwright QA for a generated project (screenshots + lint checks).

   Usage
     node verify.mjs <folder-or-url> [options]

     node verify.mjs ./site                                  # serves ./site, checks every *.html in its root
     node verify.mjs ./site --pages index.html,shop.html     # only these pages (paths relative to the folder)
     node verify.mjs https://staging.example.co.il/ --pages /,/shop/,/about/
     node verify.mjs ./runtime --pages demo/marquee.html --out qa-marquee

   Options
     --pages a.html,b.html   pages to check (folder: relative paths; URL: resolved against the URL). Default: folder = all
                             root *.html (except files starting with "_"); URL = the URL itself.
     --out <dir>             output folder (default: qa/). Writes report.md, report.json and <page>/<mode>-<w>-{top,full}.jpg
     --widths 320,390,768,1280,1440   viewport widths (heights: 320→640, 390→844, 768→1024, 1280→800, other→900); 320 = reflow
     --quick                 widths 390,1440 only, no full-page screenshots, no pin frames (use while iterating)
     --concurrency N         check N pages in parallel (default 1; 2-3 on a laptop). Full run ≈ 100 s/page with WebGL
     --no-pins               skip scroll-frame shots of pinned / sticky sections
     --frames                keep pin/sticky scroll frames in --quick mode
     Concepts: run from the project root: node verify.mjs ./site --pages concepts/a.html,concepts/b.html,concepts/c.html
       (a 404 on ../runtime or ../assets is reported as a console FAIL naming the path)
     --no-rtl                skip the ?rtl=1 pass            --no-full   skip full-page screenshots
     --no-axe                skip axe-core                    --settle <ms>   wait after load (default 1200)
     --lint-runtime          also lint physical CSS in runtime/ core.css + fx/*.css (skipped by default: they are vetted)
     --timeout <ms>          navigation timeout (default 45000)

   What it does, per page
     • LTR and ?rtl=1 (dir is checked after load; if the page never switched, it is re-loaded with dir="rtl" forced before
       DOMContentLoaded and a warning is noted)
       at every width: first-viewport + full-page JPEG, horizontal overflow, wrapped button/nav labels.
     • 1280×800: hero H1 fits the first viewport; H1 line count (also reported at 390).
     • 1440 (LTR and RTL): console errors, rendered font families, `transition: all`, pure #000/#fff large backgrounds and
       ink, gradient text, z-index > 1000, <img> without width/height (authored HTML), LCP image lazy-loaded, autoplay video
       without muted/playsinline, physical CSS properties in the project's own CSS, banned copy (antipatterns.md #23, #38,
       #39, #43), eyebrows vs sections (#17), distinct accent hues (#5), same-archetype section repetition (#30),
       axe-core WCAG 2 A/AA (contrast summarised).
     • 1440 LTR: 5 scroll frames through every ScrollTrigger pin and tall sticky wrapper (pin<k>-<i>.jpg).
     • Fonts per script via CDP CSS.getPlatformFontsForNode (e.g. "Hebrew: Noto Sans Hebrew; Latin: Instrument Sans");
       FAIL when Hebrew text renders in a system fallback while the page declares a Hebrew web font.
     • 1440 LTR with prefers-reduced-motion: reduce: screenshots + no console errors.
     Labels that are stacked on purpose opt out of the wrap check with data-qa-allow-wrap (on the element or an ancestor).
     Exit code 1 if any check FAILs (warnings don't fail).

   Install (once, on the machine that runs it):  npm i playwright  &&  npx playwright install chromium
   Only dependency: playwright. axe-core is injected from jsDelivr at run time (skipped with a note when offline).
   Sandbox note: when HTTPS_PROXY is set, Chromium is launched with --proxy-server=$HTTPS_PROXY and a loopback bypass. */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

// ───────────────────────── CLI ─────────────────────────
const argv = process.argv.slice(2);
if (!argv.length || argv.includes('-h') || argv.includes('--help')) {
  const src = fs.readFileSync(new URL(import.meta.url), 'utf8');
  console.log(src.slice(src.indexOf('Usage'), src.indexOf('Install')).replace(/^ {0,3}/gm, ''));
  process.exit(argv.length ? 0 : 2);
}
const opt = { target: null, pages: null, out: 'qa', widths: [320, 390, 768, 1280, 1440], rtl: true, full: true, axe: true, settle: 1200, lintRuntime: false, timeout: 45000, conc: 1, pins: true };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--pages') opt.pages = argv[++i].split(',').map(s => s.trim()).filter(Boolean);
  else if (a === '--out') opt.out = argv[++i];
  else if (a === '--widths') opt.widths = argv[++i].split(',').map(Number).filter(Boolean);
  else if (a === '--quick') { opt.widths = [390, 1440]; opt.full = false; opt.pins = false; }
  else if (a === '--no-rtl') opt.rtl = false;
  else if (a === '--no-full') opt.full = false;
  else if (a === '--no-axe') opt.axe = false;
  else if (a === '--lint-runtime') opt.lintRuntime = true;
  else if (a === '--settle') opt.settle = +argv[++i];
  else if (a === '--timeout') opt.timeout = +argv[++i];
  else if (a === '--concurrency' || a === '-c') opt.conc = Math.max(1, +argv[++i] || 1);
  else if (a === '--no-pins') opt.pins = false;
  else if (a === '--frames') opt.framesForced = true;
  else if (!a.startsWith('--') && !opt.target) opt.target = a;
  else { console.error('Unknown argument: ' + a); process.exit(2); }
}
if (opt.framesForced) opt.pins = true;
const H_FOR = w => ({ 320: 640, 390: 844, 768: 1024, 1280: 800 })[w] || 900;
const AXE_URL = 'https://cdn.jsdelivr.net/npm/axe-core@4/axe.min.js';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const slug = s => s.replace(/^https?:\/\//, '').replace(/[?#].*$/, '').replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '').slice(0, 60) || 'index';

// ───────────────────────── static server (Range-capable) ─────────────────────────
const MIME = { '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.pdf': 'application/pdf' };
function serve(root) {
  root = path.resolve(root);
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p === '/favicon.ico' && !fs.existsSync(path.join(root, 'favicon.ico'))) { res.writeHead(204); return res.end(); }
    let file = path.normalize(path.join(root, p));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    try { if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html'); } catch {}
    let st; try { st = fs.statSync(file); } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('404 ' + p); }
    const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const head = { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' };
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (range) {
      let start = range[1] === '' ? st.size - +range[2] : +range[1];
      let end = range[1] !== '' && range[2] !== '' ? +range[2] : st.size - 1;
      if (isNaN(start) || start < 0 || start >= st.size || end < start) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
      end = Math.min(end, st.size - 1);
      res.writeHead(206, { ...head, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Content-Length': end - start + 1 });
      if (req.method === 'HEAD') return res.end();
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { ...head, 'Content-Length': st.size });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r({ srv, base: `http://127.0.0.1:${srv.address().port}/` })));
}

// ───────────────────────── in-page probes (run in the browser) ─────────────────────────
/* All probes are plain functions serialised by page.evaluate; keep them self-contained. */
const HELPERS = `
  window.__qa = window.__qa || {};
  __qa.vis = function (el) { var r = el.getBoundingClientRect(), s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.02; };
  __qa.sel = function (el) { var out = [], n = el, i = 0;
    while (n && n.nodeType === 1 && i < 3) { var s = n.tagName.toLowerCase(); if (n.id) { s += '#' + n.id; out.unshift(s); break; }
      var c = (typeof n.className === 'string' ? n.className : '').trim().split(/\\s+/).filter(Boolean).slice(0, 2); if (c.length) s += '.' + c.join('.');
      out.unshift(s); n = n.parentElement; i++; }
    return out.join(' > '); };
  __qa.lines = function (el) { /* text lines only: rects of text nodes (icons/svg/pseudo boxes don't count) */
    var tops = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n, r = document.createRange();
    while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; var p = n.parentElement; if (p && (p.closest('[aria-hidden="true"], .sr-only') || getComputedStyle(p).display === 'none')) continue;
      r.selectNodeContents(n);
      Array.prototype.forEach.call(r.getClientRects(), function (q) { if (q.width < 1 || q.height < 1) return;
        if (!tops.some(function (t) { return Math.abs(t - q.top) < Math.max(4, q.height * 0.5); })) tops.push(q.top); }); }
    return tops.length; };
  __qa._c = document.createElement('canvas').getContext('2d', { willReadFrequently: true }); __qa._rgb = {};
  __qa.rgb = function (c) { /* any CSS colour (oklch, color-mix, …) -> [r,g,b,a 0-1] via a 1px canvas; null if transparent */
    if (!c || c === 'transparent' || c === 'rgba(0, 0, 0, 0)') return null; if (c in __qa._rgb) return __qa._rgb[c];
    var x = __qa._c; x.clearRect(0, 0, 1, 1); x.fillStyle = '#010203'; x.fillStyle = c; x.fillRect(0, 0, 1, 1);
    var d = x.getImageData(0, 0, 1, 1).data; return (__qa._rgb[c] = d[3] === 0 ? null : [d[0], d[1], d[2], d[3] / 255]); };
  __qa.splitLines = function (el) { /* split-reveal/SplitText: count distinct tops of line wrappers, else of any text incl. aria-hidden copies */
    var ls = el.querySelectorAll('.sd-split-line, [class*="split-line"], .line'); var tops = [];
    var src = ls.length ? Array.prototype.map.call(ls, function (x) { return x.getBoundingClientRect(); }) : (function () { var out = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n, r = document.createRange();
      while ((n = w.nextNode())) { var p = n.parentElement; if (!n.textContent.trim() || (p && p.closest('.sr-only'))) continue; r.selectNodeContents(n); out.push.apply(out, r.getClientRects()); } return out; })();
    Array.prototype.forEach.call(src, function (q) { if (q.width < 1 || q.height < 1) return; if (!tops.some(function (t) { return Math.abs(t - q.top) < Math.max(4, q.height * 0.5); })) tops.push(q.top); });
    return tops.length; };
  __qa.text = function (el) { return (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').trim(); };
`;

function probeTop(args) { // at scroll 0, before any scrolling
  const vh = innerHeight, vw = innerWidth, out = {};
  const h1s = [...document.querySelectorAll('h1')].filter(__qa.vis);
  const h1 = h1s[0];
  // count only rendered H1s: not inside [hidden], display:none, or a closed <dialog>/<template>
  out.h1Count = [...document.querySelectorAll('h1')].filter(h => !h.closest('[hidden], template, dialog:not([open])') && h.getClientRects().length > 0).length;
  out.h1DomCount = document.querySelectorAll('h1').length;
  if (h1) { const r = h1.getBoundingClientRect(); out.h1 = { text: __qa.text(h1).slice(0, 90), top: Math.round(r.top), bottom: Math.round(r.bottom), fits: r.top >= -1 && r.bottom <= vh + 1, lines: __qa.lines(h1) || __qa.splitLines(h1), fontSize: getComputedStyle(h1).fontSize }; }
  out.dir = document.documentElement.dir || getComputedStyle(document.documentElement).direction;
  out.forcedRtl = !!window.__qaForcedRtl;
  out.lcp = window.__qaLCP || null;   // read before any scrolling (programmatic scroll does not stop the LCP observer)
  // lazy images in the first viewport
  out.lazyAboveFold = [...document.images].filter(i => { const r = i.getBoundingClientRect(); return i.loading === 'lazy' && __qa.vis(i) && r.top < vh && r.bottom > 0 && r.left < vw && r.right > 0; }).map(i => __qa.sel(i) + ' ' + (i.currentSrc || i.src).split('/').pop().slice(0, 40)).slice(0, 5);
  return out;
}

function probeWidth() { // per width: overflow + wrapped labels
  const vw = document.documentElement.clientWidth, out = { overflow: [], clipped: [], wraps: [] };
  out.scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth); out.viewport = vw;
  out.docOverflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > vw + 1;
  const all = document.body.querySelectorAll('*');
  const clipsX = el => { const s = getComputedStyle(el); return /hidden|clip|auto|scroll/.test(s.overflowX) || s.contain.includes('paint') || s.clipPath !== 'none'; };
  for (const el of all) {
    if (el.closest('[hidden], dialog:not([open]), template, script, style, noscript, svg *')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (r.right <= vw + 1 && r.left >= -1) continue;
    const s = getComputedStyle(el);
    if (s.position === 'fixed' || s.visibility === 'hidden' || s.display === 'none') continue;
    // clipped by a (non-root) ancestor inside the viewport? then it is intentional (marquee track, slider, pinned track)
    let a = el.parentElement, clippedByAncestor = false, rootClip = false;
    while (a && a !== document.documentElement) {
      if (a === document.body) { rootClip = clipsX(a) || clipsX(document.documentElement); break; }
      if (clipsX(a)) { const ar = a.getBoundingClientRect(); if (ar.right <= vw + 1 && ar.left >= -1) { clippedByAncestor = true; break; } }
      if (getComputedStyle(a).position === 'fixed') { clippedByAncestor = true; break; }
      a = a.parentElement;
    }
    if (clippedByAncestor) continue;
    // report only the outermost offender
    const p = el.parentElement, pr = p && p.getBoundingClientRect();
    if (pr && (pr.right > vw + 1 || pr.left < -1) && p !== document.body) continue;
    const item = __qa.sel(el) + ` [${Math.round(r.left)}…${Math.round(r.right)}]`;
    (rootClip ? out.clipped : out.overflow).push(item);
  }
  if (out.docOverflow && !out.overflow.length) {   // culprit may be a pseudo-element or a clipped descendant: bisect by hiding pseudos one element at a time
    const sw = () => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const st = document.createElement('style'); st.textContent = '[data-qa-ps="b"]::before,[data-qa-ps="a"]::after{display:none!important}'; document.head.appendChild(st);
    const base = sw(), found = [];
    for (const el of [...document.body.querySelectorAll('*')].slice(0, 4000)) {
      for (const [k, ps] of [['b', '::before'], ['a', '::after']]) {
        const c = getComputedStyle(el, ps).content; if (!c || c === 'none' || c === 'normal') continue;
        el.setAttribute('data-qa-ps', k); const w = sw(); el.removeAttribute('data-qa-ps');
        if (w < base) found.push(`${__qa.sel(el)}${ps} (removing it: ${base}px → ${w}px)`);
      }
      if (found.length >= 4) break;
    }
    st.remove();
    if (found.length) out.overflow.push(...found);
    else { const wide = [...document.body.querySelectorAll('*')].map(e => [e, e.scrollWidth]).filter(([e, w]) => w > vw + 1 && e !== document.body).sort((a, b) => a[1] - b[1]).slice(0, 3); out.overflow.push(...wide.map(([e, w]) => `${__qa.sel(e)} scrollWidth ${w}px (content inside overflows)`)); }
  }
  out.overflow = out.overflow.slice(0, 6); out.clipped = out.clipped.slice(0, 6);
  // wrapped labels: buttons, CTA-like links, nav links
  // leaf interactive elements only (containers like .ctas are ignored): buttons, button-like links, nav/header links
  const labels = [...document.querySelectorAll('button, [role=button], input[type=submit], input[type=button], a')].filter(el =>
    el.tagName !== 'A' || el.closest('nav, header') || /\b(btn|button|cta)\b/i.test(el.className && el.className.baseVal === undefined ? el.className : ''));
  for (const el of labels) {
    if (!__qa.vis(el) || el.closest('[aria-hidden="true"], .sr-only, dialog:not([open]), [data-qa-allow-wrap]')) continue;
    const t = __qa.text(el); if (!t || t.length > 40) continue;
    if (el.querySelector('p, h1, h2, h3, h4, img, picture, video, svg + span + span')) continue;
    const n = __qa.lines(el);
    if (n > 1) out.wraps.push(`${__qa.sel(el)} "${t.slice(0, 30)}" (${n} lines)`);
  }
  out.wraps = out.wraps.slice(0, 8);
  return out;
}

function probePage() { // page-level checks at 1440 (after pre-scroll)
  const out = {};
  const els = [...document.body.querySelectorAll('*')].filter(e => !e.closest('script,style,template,noscript,svg'));
  const visEls = els.filter(__qa.vis);
  const vwA = innerWidth * innerHeight;
  // fonts actually rendered: first available family in each text element's stack
  const loaded = new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '').trim().toLowerCase()));
  const generic = /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-serif|ui-sans-serif|ui-monospace|ui-rounded|math|emoji|fangsong|-apple-system|blinkmacsystemfont)$/i;
  const cvs = document.createElement('canvas').getContext('2d'); const cache = {};
  const localAvail = fam => { if (fam in cache) return cache[fam]; const t = 'mmmmmmmmmwwwwwlliI10אבגד';
    const m = f => { cvs.font = '72px ' + f; return cvs.measureText(t).width; };
    return (cache[fam] = ['monospace', 'serif', 'sans-serif'].some(b => m(`"${fam}", ${b}`) !== m(b))); };
  const fam = {};
  for (const el of visEls) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const stack = getComputedStyle(el).fontFamily.split(',').map(s => s.replace(/["']/g, '').trim());
    let used = stack[stack.length - 1];
    for (const f of stack) { if (loaded.has(f.toLowerCase()) || generic.test(f) || localAvail(f)) { used = f; break; } }
    fam[used] = (fam[used] || 0) + 1;
  }
  out.fonts = Object.entries(fam).sort((a, b) => b[1] - a[1]);
  out.webfontsLoaded = [...loaded];
  // families declared by the direction's font tokens (display, body, mono, outlier, num, brand incl. Hebrew fallbacks): allowed
  const rs = getComputedStyle(document.documentElement), roles = {};
  ['display', 'body', 'mono', 'outlier', 'num', 'brand'].forEach(r => { const v = rs.getPropertyValue('--f-' + r).trim(); if (v) roles[r] = v.split(',').map(s => s.replace(/["']/g, '').trim()).filter(s => s && !generic.test(s)); });
  out.fontRoles = roles; out.allowedFonts = [...new Set(Object.values(roles).flat().map(s => s.toLowerCase()))];
  // per-role rendering (what headings, body text, UI and code actually use)
  const roleSel = { headings: 'h1,h2,h3', body: 'p,li,blockquote,dd', ui: 'button,a,label,input,select,nav', mono: 'code,kbd,pre,samp' }, perRole = {};
  for (const [r, sel] of Object.entries(roleSel)) { const c = {}; document.querySelectorAll(sel).forEach(el => { if (!__qa.vis(el)) return; const f = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim(); c[f] = (c[f] || 0) + 1; }); perRole[r] = Object.keys(c); }
  out.fontsPerRole = perRole;
  // transition: all (non-zero duration)
  const tAll = [];
  for (const el of visEls) { const s = getComputedStyle(el); const props = s.transitionProperty.split(','), durs = s.transitionDuration.split(',');
    if (props.some((p, i) => p.trim() === 'all' && parseFloat(durs[i % durs.length]) > 0)) tAll.push(__qa.sel(el)); }
  out.transitionAll = { count: tAll.length, samples: [...new Set(tAll)].slice(0, 5) };
  // pure black/white large backgrounds + ink
  const pure = [];
  const isPure = c => { const v = __qa.rgb(c); return !!v && v[3] > 0.99 && ((v[0] === 0 && v[1] === 0 && v[2] === 0) || (v[0] === 255 && v[1] === 255 && v[2] === 255)); };
  for (const el of [document.documentElement, document.body, ...visEls]) { const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (isPure(s.backgroundColor) && (el === document.body || el === document.documentElement || r.width * r.height > vwA * 0.25)) pure.push(`${__qa.sel(el)} bg ${s.backgroundColor}`); }
  const bodyInk = getComputedStyle(document.body).color; if (isPure(bodyInk)) pure.push(`body ink ${bodyInk}`);
  out.pureBW = pure.slice(0, 6);
  // gradient text
  out.gradientText = visEls.filter(el => { const s = getComputedStyle(el); return (s.backgroundClip === 'text' || s.webkitBackgroundClip === 'text') && s.backgroundImage.includes('gradient'); }).map(__qa.sel).slice(0, 5);
  // z-index > 1000
  out.zIndex = els.map(el => [el, parseInt(getComputedStyle(el).zIndex, 10)]).filter(([, z]) => z > 1000).map(([el, z]) => `${__qa.sel(el)} z=${z}`).slice(0, 8);
  // autoplay video
  out.video = [...document.querySelectorAll('video')].filter(v => v.autoplay || v.hasAttribute('autoplay')).filter(v => !v.hasAttribute('muted') && !v.muted || !v.hasAttribute('playsinline')).map(v => __qa.sel(v) + (v.hasAttribute('muted') ? '' : ' no-muted') + (v.hasAttribute('playsinline') ? '' : ' no-playsinline'));
  // copy
  out.text = document.body.innerText;
  out.headingText = [...document.querySelectorAll('h1,h2,h3,button,.btn,[class*=button],nav a')].filter(__qa.vis).map(__qa.text).join('\n');
  // sections
  let secs = [...document.querySelectorAll('section')].filter(s => !s.parentElement.closest('section') && __qa.vis(s));
  if (!secs.length) { const m = document.querySelector('main') || document.body; secs = [...m.children].filter(e => __qa.vis(e) && !/^(SCRIPT|STYLE|TEMPLATE|DIALOG)$/.test(e.tagName)); }
  out.sectionCount = secs.length;
  // eyebrows: small, tracked (uppercase) text right above a heading
  const eyebrows = [], kickers = [];
  for (const h of document.querySelectorAll('h1,h2,h3')) {
    if (!__qa.vis(h)) continue;
    let prev = h.previousElementSibling; if (!prev && h.parentElement) prev = h.parentElement.previousElementSibling;
    if (!prev || !__qa.vis(prev)) continue;
    const t = __qa.text(prev); if (t.length < 2 || t.length > 60) continue;
    const s = getComputedStyle(prev), fs = parseFloat(s.fontSize), hs = parseFloat(getComputedStyle(h).fontSize);
    const ls = parseFloat(s.letterSpacing) || 0;
    const upper = s.textTransform === 'uppercase' || (/[A-Za-z]/.test(t) && t === t.toUpperCase());
    const small = fs <= 15 || fs < hs * 0.45;
    if (small && ((upper && ls >= fs * 0.04) || ls >= fs * 0.1)) {
      const si = secs.findIndex(sec => sec.contains(h));
      (h.tagName === 'H3' ? kickers : eyebrows).push({ text: t.slice(0, 40), section: si, sel: __qa.sel(prev) });
    }
  }
  out.eyebrows = eyebrows; out.kickers = kickers; out.h3Count = [...document.querySelectorAll('h3')].filter(__qa.vis).length;
  // accent hues (chromatic colours by area / text weight)
  const hsl = c => { const v = __qa.rgb(c); if (!v || v[3] < 0.5) return null; const m = [null, v[0], v[1], v[2]];
    const [r, g, b] = [m[1], m[2], m[3]].map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    if (d < 0.16) return null; const s = d / (1 - Math.abs(2 * l - 1)); if (s < 0.35 || l < 0.12 || l > 0.92) return null;
    let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360;
    return { h, hex: '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('') }; };
  const bins = {};
  const add = (c, w) => { const x = hsl(c); if (!x) return; const k = Math.round(x.h / 20) % 18; bins[k] = bins[k] || { w: 0, hex: x.hex }; bins[k].w += w; };
  for (const el of visEls) { const s = getComputedStyle(el), r = el.getBoundingClientRect();
    add(s.backgroundColor, Math.min(r.width * r.height, vwA) / 400);
    if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) add(s.color, __qa.text(el).length * parseFloat(s.fontSize) / 16);
    if (parseFloat(s.borderTopWidth) > 0) add(s.borderTopColor, r.width / 20); }
  // merge neighbouring bins
  const keys = Object.keys(bins).map(Number).sort((a, b) => a - b), clusters = [];
  for (const k of keys) { const last = clusters[clusters.length - 1]; if (last && k - last.k1 <= 1) { last.w += bins[k].w; last.k1 = k; if (bins[k].w > last.top) { last.top = bins[k].w; last.hex = bins[k].hex; } } else clusters.push({ k0: k, k1: k, w: bins[k].w, top: bins[k].w, hex: bins[k].hex }); }
  if (clusters.length > 1 && clusters[0].k0 === 0 && clusters[clusters.length - 1].k1 === 17) { const l = clusters.pop(); clusters[0].w += l.w; }
  const tot = clusters.reduce((a, c) => a + c.w, 0) || 1;
  out.accents = clusters.map(c => ({ hue: c.k0 * 20 + '–' + (c.k1 * 20 + 19) + '°', sample: c.hex, share: Math.round(c.w / tot * 100) })).filter(c => c.share >= 5).sort((a, b) => b.share - a.share);
  // same-archetype repetition: structural signature of each section
  const sig = (el, d) => { const kids = [...el.children].filter(k => !/^(SCRIPT|STYLE|TEMPLATE|BR)$/.test(k.tagName) && !k.hasAttribute('aria-hidden'));
    if (!d || !kids.length) return el.tagName.toLowerCase();
    const parts = []; for (const k of kids) { const s = sig(k, d - 1); if (parts.length && parts[parts.length - 1].replace(/\*$/, '') === s) parts[parts.length - 1] = s + '*'; else parts.push(s); }
    return el.tagName.toLowerCase() + '(' + parts.join(',') + ')'; };
  const sigs = secs.map((s, i) => ({ i, s: sig(s, 3), heading: __qa.text(s.querySelector('h1,h2,h3') || s).slice(0, 40) }));
  const groups = {}; sigs.forEach(x => { if ((x.s.match(/\(/g) || []).length >= 3) (groups[x.s] = groups[x.s] || []).push(x); });
  out.repeats = Object.values(groups).filter(g => g.length > 1).map(g => g.map(x => `#${x.i + 1} "${x.heading}"`).join(' ≈ '));
  out.todoCount = document.querySelectorAll('.todo').length;
  // text dimmed by opacity at rest (WCAG 1.4.3: recede by colour instead)
  const dim = [];
  for (const el of visEls) {
    if (!(el.childNodes && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 2))) continue;
    if (el.closest('[aria-hidden="true"], [disabled], [aria-disabled="true"]')) continue;
    let o = 1; for (let n = el; n && n !== document.documentElement; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
    if (o < 0.95 && o > 0.02) dim.push(`${__qa.sel(el)} opacity ${o.toFixed(2)} "${__qa.text(el).slice(0, 24)}"`);
  }
  out.dimText = dim.slice(0, 8); out.dimCount = dim.length;
  // LCP
  return out;
}

// ───────────────────────── runner ─────────────────────────
const results = { target: null, startedAt: new Date().toISOString(), options: { ...opt }, pages: [] };
let server = null, base;
const isUrl = /^https?:\/\//i.test(opt.target || '');
if (!opt.target) { console.error('Missing <folder-or-url>'); process.exit(2); }
let pages = opt.pages;
if (isUrl) { base = opt.target; pages = (pages || ['']).map(p => new URL(p, base).href); }
else {
  const root = path.resolve(opt.target);
  if (!fs.existsSync(root)) { console.error('No such folder: ' + root); process.exit(2); }
  ({ srv: server, base } = await serve(root));
  if (!pages) pages = fs.readdirSync(root).filter(f => /\.html?$/i.test(f) && !f.startsWith('_')).sort();
  if (!pages.length) { console.error('No *.html pages in ' + root + ' (use --pages)'); process.exit(2); }
  results.root = root;
  pages = pages.map(p => new URL(p.replace(/^\/+/, ''), base).href);
}
results.target = opt.target;
fs.mkdirSync(opt.out, { recursive: true });

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const launchArgs = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'];
if (proxy) launchArgs.push(`--proxy-server=${proxy}`, '--proxy-bypass-list=127.0.0.1;localhost');
const browser = await chromium.launch({ args: launchArgs });

const INIT = `
  (function () {
    try { new PerformanceObserver(function (l) { var e = l.getEntries().pop(); if (!e) return; var el = e.element;
      window.__qaLCP = { size: Math.round(e.size), tag: el ? el.tagName.toLowerCase() : null, lazy: !!(el && el.tagName === 'IMG' && (el.loading === 'lazy' || el.getAttribute('loading') === 'lazy')),
        src: el && el.tagName === 'IMG' ? (el.currentSrc || el.src).split('/').pop().slice(0, 60) : (e.url || '').split('/').pop().slice(0, 60) };
    }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch (e) {}
  })();`;
/* Only used when a page did NOT switch itself for ?rtl=1 (checked after load): force dir before DOMContentLoaded and re-load. */
const FORCE_RTL = `document.addEventListener('DOMContentLoaded', function () {
    var h = document.documentElement; if ((h.getAttribute('dir') || '').toLowerCase() !== 'rtl') { h.setAttribute('dir', 'rtl'); h.setAttribute('lang', 'he'); window.__qaForcedRtl = true; }
  }, { once: true, capture: true });`;
const FONT_HOST = /fontshare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net|\.woff2?(\?|$)|\.ttf(\?|$)|\.otf(\?|$)/i;

async function openPage(url, { width, reduced = false, forceRtl = false }) {
  const ctx = await browser.newContext({ viewport: { width, height: H_FOR(width) }, deviceScaleFactor: 1, reducedMotion: reduced ? 'reduce' : 'no-preference',
    ignoreHTTPSErrors: true, isMobile: false, hasTouch: width < 800 });
  await ctx.addInitScript(INIT + (forceRtl ? FORCE_RTL : ''));
  const page = await ctx.newPage();
  const errors = [], fontIssues = [];
  const same = u => { try { return new URL(u).origin === new URL(url).origin; } catch { return false; } };
  page.on('console', m => { if (m.type() !== 'error') return; const txt = m.text(), src = (m.location() && m.location().url) || '';
    if (FONT_HOST.test(src) || (/font|fontshare/i.test(txt) && /CORS|Failed to load|net::|blocked/i.test(txt))) fontIssues.push(txt.slice(0, 200)); else errors.push(txt.slice(0, 240)); });
  page.on('pageerror', e => errors.push('pageerror: ' + String(e.message || e).slice(0, 240)));
  page.on('response', r => { const tp = r.request().resourceType(); if (r.status() >= 400 && same(r.url()) && /script|stylesheet|font|image|media/.test(tp))
    errors.push(`missing ${tp}: ${new URL(r.url()).pathname} (HTTP ${r.status()}) — check relative paths (concepts/ pages use ../runtime/ and ../assets/; serve the project root)`); });
  page.on('requestfailed', r => { const f = r.failure(); if (!same(r.url()) && (r.resourceType() === 'font' || FONT_HOST.test(r.url()))) { fontIssues.push(`${r.url().slice(0, 90)} ${f && f.errorText}`); return; }
    if (same(r.url()) && !/ERR_ABORTED/.test(f && f.errorText || '')) errors.push(`requestfailed: ${r.url().replace(/^https?:\/\/[^/]+/, '')} ${f && f.errorText}`); });
  let html = '';
  let resp = null;
  try { resp = await page.goto(url, { waitUntil: 'load', timeout: opt.timeout }); } catch (e) { errors.push('navigation: ' + String(e.message).split('\n')[0]); }
  try { html = resp ? await resp.text() : ''; } catch {}
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await sleep(opt.settle);
  await page.evaluate(HELPERS);
  const rt = await page.evaluate(() => ({ core: [...document.scripts].some(s => /core\.js(\?|$)/.test(s.src)), sd: !!(window.SD && window.SD.initAll) })).catch(() => ({}));
  if (rt.core && !rt.sd) errors.push('runtime/core.js is referenced but window.SD is missing: the script did not load (wrong relative path?)');
  return { ctx, page, errors, fontIssues, html, status: resp ? resp.status() : 0 };
}
async function preScroll(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.6); let y = 0, n = 0;
    while (y < document.documentElement.scrollHeight - innerHeight && n++ < 90) { y += step; window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); }
    await new Promise(r => setTimeout(r, 500)); window.scrollTo(0, 0);
    if (window.SD && SD.lenis) SD.lenis.scrollTo(0, { immediate: true });
  }).catch(() => {});
  await sleep(900);
}
async function shots(page, dir, name, full) {
  await page.screenshot({ path: path.join(dir, name + '-top.jpg'), type: 'jpeg', quality: 70 }).catch(() => {});
  if (!full) return;
  const h = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => 0);
  const w = page.viewportSize().width;
  await page.screenshot({ path: path.join(dir, name + '-full.jpg'), type: 'jpeg', quality: 60, fullPage: true, clip: { x: 0, y: 0, width: w, height: Math.max(1, Math.min(h, 14000)) } }).catch(() => {});
}
async function injectAxe(page) {
  try { await page.addScriptTag({ url: AXE_URL }); return true; } catch {}
  try { const { createRequire } = await import('node:module'); const req = createRequire(import.meta.url); await page.addScriptTag({ path: req.resolve('axe-core/axe.min.js') }); return true; } catch {}
  return false;
}
function cssLint(sources) {
  const re = /(?<![\w-])(margin-(?:left|right)|padding-(?:left|right)|border-(?:left|right)(?:-[a-z]+)?|left|right)\s*:|text-align\s*:\s*(left|right)\b|float\s*:\s*(left|right)\b|clear\s*:\s*(left|right)\b/g;
  const out = [];
  for (const { name, css } of sources) {
    const clean = css.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '));
    const lines = clean.split('\n'), hits = [];
    lines.forEach((ln, i) => { let m; re.lastIndex = 0; while ((m = re.exec(ln))) { hits.push({ line: i + 1, prop: m[0].replace(/\s+/g, ' ').trim(), text: ln.trim().slice(0, 100) }); } });
    if (hits.length) out.push({ file: name, count: hits.length, samples: hits.slice(0, 3) });
  }
  return out;
}
async function collectCss(page, html) {
  const origin = new URL(page.url()).origin, sources = [];
  const inline = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m, i) => ({ name: `inline <style> #${i + 1}`, css: m[1] }));
  sources.push(...inline);
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('link[rel~="stylesheet"]')].map(l => l.href)).catch(() => []);
  for (const h of hrefs) {
    if (!h.startsWith(origin)) continue;
    const p = new URL(h).pathname;
    if (!opt.lintRuntime && (/(^|\/)(runtime\/|fx\/)/.test(p) || /(^|\/)core\.css$/.test(p) || /\.\.\/(core|fx)/.test(p))) continue;
    try { const r = await page.request.get(h); if (r.ok()) sources.push({ name: p, css: await r.text() }); } catch {}
  }
  return sources;
}

/* Fonts actually rendered per script (CDP CSS.getPlatformFontsForNode on sample Hebrew and Latin text elements). */
async function platformFonts(page) {
  const declared = await page.evaluate(() => {
    const letters = s => ({ he: (s.match(/[֐-׿]/g) || []).length, la: (s.match(/[A-Za-z]/g) || []).length });
    const picked = { he: 0, la: 0 };
    const els = [...document.querySelectorAll('h1,h2,h3,h4,p,li,a,button,label,span,td,figcaption,blockquote,div')];
    for (const el of els) {
      if (picked.he >= 10 && picked.la >= 10) break;
      if (!__qa.vis(el) || el.closest('[aria-hidden="true"], .sr-only, script, style, svg')) continue;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ');
      const c = letters(own), tot = c.he + c.la; if (tot < 5) continue;
      const s = c.he / tot >= 0.7 ? 'he' : c.la / tot >= 0.7 ? 'la' : null;
      if (s && picked[s] < 10) { el.setAttribute('data-qa-fs', s); picked[s]++; }
    }
    const heb = /hebrew|heebo|assistant|rubik|frank ruhl|david libre|bellefair|suez|secular|karantina|miriam|alef|varela|bona nova|cousine|amatic|fredoka|playpen|arimo|tinos/i;
    return [...document.fonts].some(f => heb.test(f.family) || /U\+0?5[89A-F]/i.test(f.unicodeRange || ''));
  }).catch(() => false);
  const res = { declaredHebrew: declared, he: {}, la: {} };
  let cdp;
  try {
    cdp = await page.context().newCDPSession(page);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: false });
    for (const s of ['he', 'la']) {
      const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: `[data-qa-fs="${s}"]` });
      for (const id of nodeIds) {
        const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId: id }).catch(() => ({ fonts: [] }));
        for (const f of fonts) { const k = f.familyName; res[s][k] = res[s][k] || { glyphs: 0, custom: f.isCustomFont }; res[s][k].glyphs += f.glyphCount; }
      }
    }
  } catch (e) { res.error = String(e.message || e).slice(0, 120); }
  if (cdp) await cdp.detach().catch(() => {});
  const top = o => Object.entries(o).sort((a, b) => b[1].glyphs - a[1].glyphs);
  res.heTop = top(res.he); res.laTop = top(res.la);
  return res;
}
/* Scroll frames through pinned (ScrollTrigger) and tall sticky sections. */
async function pinFrames(page, dir, name) {
  const regions = await page.evaluate(() => {
    const out = [], vh = innerHeight;
    if (window.ScrollTrigger && ScrollTrigger.getAll) ScrollTrigger.getAll().forEach(st => { if (st.pin && st.end - st.start > 50) out.push({ s: st.start, e: st.end, label: 'pin ' + __qa.sel(st.pin) }); });
    document.querySelectorAll('body *').forEach(el => {
      if (getComputedStyle(el).position !== 'sticky' || el.matches('header, nav, .sd-nav, [class*="header"], [class*="nav"]')) return;
      const p = el.parentElement; if (!p || p === document.body || p.tagName === 'MAIN') return;
      const r = p.getBoundingClientRect(); if (r.height < vh * 1.6) return;
      const top = r.top + scrollY; out.push({ s: Math.max(0, top - 1), e: top + r.height - vh, label: 'sticky ' + __qa.sel(el) });
    });
    out.sort((a, b) => a.s - b.s);
    return out.filter((r, i) => !i || Math.abs(r.s - out[i - 1].s) > 100).slice(0, 4);
  }).catch(() => []);
  for (const [k, r] of regions.entries()) {
    for (let i = 0; i <= 4; i++) {
      const y = Math.round(r.s + (r.e - r.s) * i / 4);
      await page.evaluate(y => { if (window.SD && SD.lenis) SD.lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y); }, y).catch(() => {});
      await sleep(650);
      await page.screenshot({ path: path.join(dir, `${name}-pin${k + 1}-${i + 1}.jpg`), type: 'jpeg', quality: 65 }).catch(() => {});
    }
  }
  return regions.map(r => r.label);
}

const BANNED = [
  [/\blorem\b|\bipsum dolor\b/i, 'lorem ipsum'], [/\bacme\b/i, 'Acme'], [/\bjane doe\b/i, 'Jane Doe'], [/\bjohn smith\b/i, 'John Smith'], [/\bsarah chen\b/i, 'Sarah Chen'],
  [/\b(novacore|flowbit)\b/i, 'placeholder brand'], [/\belevat(e|es|ed|ing)\b/i, 'Elevate'], [/\bseamless(ly)?\b/i, 'Seamless'], [/\bunleash/i, 'Unleash'], [/\bsupercharg/i, 'Supercharge'],
  [/\bempower/i, 'Empower'], [/\brevolutioni[sz]/i, 'Revolutionize'], [/\bnext[- ]gen\b/i, 'Next-gen'], [/\breimagin/i, 'Reimagine'], [/\bdelve\b/i, 'Delve'], [/\btapestry\b/i, 'Tapestry'],
  [/\bwhere [\w-]+ meets [\w-]+/i, '"Where X meets Y"'], [/built for the modern team/i, '"Built for the modern team"'], [/in today'?s digital landscape/i, '"In today\'s digital landscape"'],
  [/scroll to (explore|discover)/i, 'scroll cue'],
];

const BANNED_FONTS = /^(inter|inter tight|roboto|open sans|lato|poppins|montserrat|raleway|nunito|work sans|dm sans|source sans 3|plus jakarta sans|manrope|outfit|space grotesk|arial|helvetica|fraunces|instrument serif|playfair display|merriweather|lora|source serif 4|source serif pro|georgia|times new roman|times|courier new|consolas|bebas neue)$/i;
const SUMMARY = [];
async function checkPage(url) {
  const key = slug(url.replace(base || '', '')) || 'index';
  const dir = path.join(opt.out, key); fs.mkdirSync(dir, { recursive: true });
  const P = { url, key, checks: [], shots: dir, errors: [] };
  const check = (id, status, msg, detail) => P.checks.push({ id, status, msg, ...(detail ? { detail } : {}) });
  console.log(`\n▶ ${url}`);
  const modes = opt.rtl ? ['ltr', 'rtl'] : ['ltr'];
  const perWidth = {}; let forceRtl = false; P.fontIssues = [];
  for (const mode of modes) {
    for (const w of opt.widths) {
      const u = mode === 'rtl' ? url + (url.includes('?') ? '&' : '?') + 'rtl=1' : url;
      let { ctx, page, errors, fontIssues, html, status } = await openPage(u, { width: w, forceRtl: mode === 'rtl' && forceRtl });
      if (mode === 'rtl' && !forceRtl) {   // did the page switch itself (at any point up to now)?
        const d = await page.evaluate(() => document.documentElement.getAttribute('dir') || getComputedStyle(document.documentElement).direction).catch(() => 'ltr');
        if (d !== 'rtl') { await ctx.close(); forceRtl = true; ({ ctx, page, errors, fontIssues, html, status } = await openPage(u, { width: w, forceRtl: true })); }
      }
      P.fontIssues.push(...fontIssues);
      const top = await page.evaluate(probeTop).catch(e => ({ error: String(e) }));
      await shots(page, dir, `${mode}-${w}`, false);
      await preScroll(page);
      const pw = await page.evaluate(probeWidth).catch(e => ({ error: String(e), overflow: [], clipped: [], wraps: [] }));
      if (opt.full) await shots(page, dir, `${mode}-${w}`, true);
      perWidth[`${mode}-${w}`] = { top, ...pw };
      P.errors.push(...errors.map(e => `[${mode} ${w}] ${e}`));
      if (status >= 400) check('http', 'fail', `${mode} ${w}: HTTP ${status}`);
      if (w === 1440 || w === Math.max(...opt.widths)) {
        const pg = await page.evaluate(probePage).catch(e => ({ error: String(e) }));
        pg.html = html;
        pg.platform = await platformFonts(page);
        if (opt.pins && mode === 'ltr') { await page.evaluate(() => window.scrollTo(0, 0)); pg.pins = await pinFrames(page, dir, `${mode}-${w}`); }
        if (mode === 'ltr' || !P.page) {
          const css = await collectCss(page, html);
          pg.cssLint = cssLint(css);
          pg.cssFiles = css.map(c => c.name);
        }
        if (opt.axe) {
          const ok = await injectAxe(page);
          if (ok) {
            pg.axe = await page.evaluate(async () => {
              const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }, resultTypes: ['violations'] });
              // Decorative text (inside aria-hidden="true" or role=presentation/none, e.g. marquee duplicates, ghost numerals,
              // outlined background words) is "incidental" under WCAG 1.4.3: drop those contrast nodes instead of making authors
              // hide the text with color:transparent. The text must really be decorative (its content repeated or meaningless).
              let decorative = 0;
              r.violations.forEach(v => {
                if (v.id !== 'color-contrast' && v.id !== 'color-contrast-enhanced') return;
                v.nodes = v.nodes.filter(n => {
                  let el = null; try { el = document.querySelector(n.target[n.target.length - 1]); } catch (e) {}
                  const deco = el && el.closest('[aria-hidden="true"], [role="presentation"], [role="none"]');
                  if (deco) decorative++;
                  return !deco;
                });
              });
              r.violations = r.violations.filter(v => v.nodes.length);
              if (decorative) window.__qaDecorativeContrast = decorative;
              return r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help,
                samples: v.nodes.slice(0, 4).map(n => n.target.join(' ') + (n.any[0] && n.any[0].data && n.any[0].data.contrastRatio ? ` (${n.any[0].data.contrastRatio}:1, need ${n.any[0].data.expectedContrastRatio})` : '')) }));
            }).catch(e => ({ error: String(e).slice(0, 200) }));
            pg.axeDecorative = await page.evaluate(() => window.__qaDecorativeContrast || 0).catch(() => 0);
          } else pg.axe = { skipped: 'axe-core not reachable (offline?)' };
        }
        P[mode === 'ltr' ? 'page' : 'pageRtl'] = pg;
      }
      await ctx.close();
      process.stdout.write(`  ${mode}-${w} ✓`);
    }
  }
  // reduced motion
  {
    const { ctx, page, errors, fontIssues } = await openPage(url, { width: 1440, reduced: true });
    P.fontIssues.push(...fontIssues);
    await shots(page, dir, 'ltr-1440-reduced', false);
    await preScroll(page);
    if (opt.full) await shots(page, dir, 'ltr-1440-reduced', true);
    await ctx.close();
    check('reduced-motion-console', errors.length ? 'fail' : 'pass', errors.length ? `${errors.length} console error(s) with reduced motion` : 'no console errors with reduced motion', errors.slice(0, 5));
    process.stdout.write('  reduced ✓\n');
  }

  // ── evaluate ──
  const errs = [...new Set(P.errors.map(e => e.replace(/^\[[^\]]+\] /, '')))];
  check('console', errs.length ? 'fail' : 'pass', errs.length ? `${errs.length} distinct console/page error(s)` : 'no console errors', errs.slice(0, 8));
  const fi = [...new Set(P.fontIssues)];
  if (fi.length) check('font-network', 'warn', `${fi.length} third-party font request/CORS failure(s): self-host the fonts in fonts/ (runtime/README.md §10)`, fi.slice(0, 5));
  for (const [k, v] of Object.entries(perWidth)) {
    if (v.error) { check(`probe ${k}`, 'warn', v.error); continue; }
    if (v.docOverflow) check(`overflow ${k}`, 'fail', `horizontal scroll: document ${v.scrollWidth}px > viewport ${v.viewport}px`, v.overflow);
    else if (v.overflow.length) check(`overflow ${k}`, 'fail', `${v.overflow.length} element(s) past the viewport edge`, v.overflow);
    if (v.clipped.length) check(`clipped ${k}`, 'warn', `${v.clipped.length} element(s) extend past the viewport but are clipped by html/body overflow-x: clip (content cut off?)`, v.clipped);
    if (v.wraps.length) check(`label-wrap ${k}`, 'fail', `${v.wraps.length} button/nav label(s) wrap to 2+ lines`, v.wraps);
  }
  for (const mode of modes) {
    const t = perWidth[`${mode}-1280`] && perWidth[`${mode}-1280`].top;
    if (t && !t.error) {
      if (!t.h1) check(`h1 ${mode}`, 'warn', `no visible H1 (${t.h1DomCount} in DOM)`);
      else {
        check(`h1-fit ${mode}-1280x800`, t.h1.fits ? 'pass' : 'fail', `H1 ${t.h1.fits ? 'fits' : 'does NOT fit'} the first viewport (top ${t.h1.top}, bottom ${t.h1.bottom}, ${t.h1.fontSize})`, [t.h1.text]);
        check(`h1-lines ${mode}-1280`, t.h1.lines > 2 ? 'warn' : 'pass', `H1 wraps to ${t.h1.lines} line(s) at 1280 (≤2 for heroes)`);
      }
      if (t.h1Count > 1) check(`h1-count ${mode}`, 'warn', `${t.h1Count} rendered <h1> elements`);
    }
    const m = perWidth[`${mode}-390`] && perWidth[`${mode}-390`].top;
    if (m && m.h1) check(`h1-lines ${mode}-390`, m.h1.lines > 5 ? 'warn' : 'pass', `H1 wraps to ${m.h1.lines} line(s) at 390`);
    if (mode === 'rtl') { const any = Object.entries(perWidth).find(([k]) => k.startsWith('rtl'));
      if (any && any[1].top && any[1].top.forcedRtl) check('rtl-query', 'warn', 'page ignores ?rtl=1: dir="rtl" was forced by the QA script (ship an RTL switch or a real Hebrew twin)');
      if (any && any[1].top && any[1].top.dir !== 'rtl') check('rtl-dir', 'fail', 'RTL pass did not end up with direction: rtl'); }
    const lazy = Object.entries(perWidth).filter(([k, v]) => k.startsWith(mode) && v.top && v.top.lazyAboveFold && v.top.lazyAboveFold.length);
    if (lazy.length) check(`lazy-above-fold ${mode}`, 'warn', `loading="lazy" image(s) inside the first viewport (${lazy.map(([k]) => k).join(', ')})`, lazy[0][1].top.lazyAboveFold);
  }
  for (const [mode, pg] of [['ltr', P.page], ['rtl', P.pageRtl]]) {
    if (!pg) continue;
    if (pg.error) { check(`page-probe ${mode}`, 'warn', pg.error); continue; }
    const fonts = pg.fonts || [];
    const pf = pg.platform;
    if (pf && !pf.error) {
      const fmtTop = a => a.slice(0, 2).map(([f, v]) => `${f}${v.custom ? '' : ' (system)'}`).join(' + ') || 'n/a';
      const heSys = pf.heTop.length && pf.heTop[0][1].custom === false;
      check(`fonts-rendered ${mode}`, heSys && pf.declaredHebrew ? 'fail' : heSys ? 'warn' : 'pass',
        `Hebrew rendered in ${fmtTop(pf.heTop)}; Latin in ${fmtTop(pf.laTop)}` + (heSys ? (pf.declaredHebrew ? ' — a Hebrew web font is declared but Hebrew falls back to a system face (missing subset/weight, or the face lacks Hebrew)' : ' — no Hebrew web font declared') : ''));
    }
    if (pg.pins && pg.pins.length) check('pin-frames', 'pass', `${pg.pins.length} pinned/sticky region(s) shot in 5 frames each (ltr-1440-pin<k>-<i>.jpg)`, pg.pins);
    const allowed = pg.allowedFonts || [], extra = fonts.filter(([f]) => allowed.length && !allowed.includes(f.toLowerCase()) && !/^(system-ui|sans-serif|serif|monospace|ui-monospace)$/i.test(f));
    const tooMany = !allowed.length && fonts.length > 3;
    check(`fonts ${mode}`, extra.length || tooMany ? 'warn' : 'pass', `${fonts.length} font family(ies) rendered: ${fonts.map(([f, n]) => `${f} (${n})`).join(', ')}` + (allowed.length ? `; declared by --f-* tokens: ${Object.entries(pg.fontRoles || {}).map(([r, v]) => `${r}=${v[0]}`).join(', ')}` : '') + (extra.length ? `; NOT declared in tokens: ${extra.map(([f]) => f).join(', ')}` : ''),
      [...Object.entries(pg.fontsPerRole || {}).map(([r, v]) => `${r}: ${v.join(', ') || '—'}`), pg.webfontsLoaded && pg.webfontsLoaded.length ? 'webfonts loaded: ' + pg.webfontsLoaded.join(', ') : 'no webfonts loaded (system/fallback faces only)']);
    if (mode === 'ltr') {
      const bannedFonts = fonts.filter(([f]) => BANNED_FONTS.test(f.trim()));
      check('banned-fonts', bannedFonts.length ? 'warn' : 'pass', bannedFonts.length ? `default-banned font(s) rendered (antipatterns.md; OK only if the brief names them): ${bannedFonts.map(([f]) => f).join(', ')}` : 'no default-banned fonts rendered');
      check('transition-all', pg.transitionAll.count ? 'fail' : 'pass', pg.transitionAll.count ? `${pg.transitionAll.count} element(s) with transition: all` : 'no transition: all', pg.transitionAll.samples);
      check('pure-bw', pg.pureBW.length ? 'warn' : 'pass', pg.pureBW.length ? 'pure #000/#fff canvas, large background or ink' : 'no pure #000/#fff large surfaces', pg.pureBW);
      check('opacity-text', pg.dimCount ? 'warn' : 'pass', pg.dimCount ? `${pg.dimCount} text element(s) dimmed by opacity at rest (recede by colour; motion.md §2b)` : 'no opacity-dimmed text', pg.dimText);
      check('gradient-text', pg.gradientText.length ? 'fail' : 'pass', pg.gradientText.length ? 'background-clip: text gradient' : 'no gradient text', pg.gradientText);
      check('z-index', pg.zIndex.length ? 'warn' : 'pass', pg.zIndex.length ? 'z-index > 1000 (use the --z-* scale)' : 'no z-index > 1000', pg.zIndex);
      check('autoplay-video', pg.video.length ? 'fail' : 'pass', pg.video.length ? 'autoplay video without muted/playsinline' : 'autoplay videos ok', pg.video);
      // images without width/height in authored HTML
      const imgs = [...(pg.html || '').matchAll(/<img\b[^>]*>/gi)].map(m => m[0]).filter(t => !/\swidth\s*=/.test(t) || !/\sheight\s*=/.test(t));
      check('img-dimensions', imgs.length ? 'warn' : 'pass', imgs.length ? `${imgs.length} <img> without width+height in the HTML` : 'all authored <img> have width+height', imgs.slice(0, 4).map(t => t.slice(0, 110)));
      const lcpTop = perWidth['ltr-1440'] || perWidth[`ltr-${Math.max(...opt.widths)}`]; const lcp = lcpTop && lcpTop.top ? lcpTop.top.lcp : null;
      check('lcp', lcp && lcp.lazy ? 'fail' : 'pass', lcp ? `LCP candidate: <${lcp.tag}> ${lcp.src || ''} (${lcp.size}px²)${lcp.lazy ? ' is loading="lazy"' : ''}` : 'no LCP entry');
      const lint = pg.cssLint || [];
      const n = lint.reduce((a, f) => a + f.count, 0);
      check('physical-css', n ? 'warn' : 'pass', n ? `${n} physical property use(s) in project CSS (use logical properties)` : `no physical properties in project CSS (${(pg.cssFiles || []).length} source(s) linted)`,
        lint.flatMap(f => f.samples.map(s => `${f.file}:${s.line} ${s.prop} → ${s.text}`)).slice(0, 8));
      // copy
      const hits = BANNED.filter(([re]) => re.test(pg.text)).map(([re, name]) => { const m = pg.text.match(re); return `${name}: "${pg.text.slice(Math.max(0, m.index - 25), m.index + m[0].length + 25).replace(/\s+/g, ' ')}"`; });
      check('banned-copy', hits.length ? 'fail' : 'pass', hits.length ? `${hits.length} banned word/phrase(s)` : 'no banned copy', hits);
      const todo = [...(pg.text.match(/\[(?:TODO|להשלמה|client quote to confirm)[^\]]*\]|\bTODO\b/gi) || []), ...Array(Math.max(0, (pg.todoCount || 0) - (pg.text.match(/\[(?:TODO|להשלמה)[^\]]*\]/gi) || []).length)).fill('.todo')];
      if (todo.length) check('placeholders', 'warn', `${todo.length} visible placeholder(s) left (fine in a draft, not in delivery)`, [...new Set(todo)].slice(0, 5));
      const em = (pg.text.match(/—/g) || []).length, emH = (pg.headingText.match(/—/g) || []).length, dots = (pg.text.match(/(?<!\.)\.\.\.(?!\.)/g) || []).length;
      check('em-dash', emH ? 'fail' : em > 3 ? 'warn' : 'pass', `em-dashes: ${em} in text, ${emH} in headings/buttons/nav; "...": ${dots}`);
      if (dots) check('ellipsis', 'warn', `${dots} three-dot "..." (use …)`);
      const eb = pg.eyebrows, lim = Math.ceil(pg.sectionCount / 3);
      const consec = eb.some((e, i) => i && e.section >= 0 && e.section - eb[i - 1].section === 1);
      check('eyebrows', eb.length > lim || consec ? 'warn' : 'pass', `${eb.length} eyebrow(s) above H1/H2 for ${pg.sectionCount} section(s) (limit ${lim}${consec ? ', consecutive sections' : ''}); ${pg.kickers.length} card kicker(s) above H3`, eb.map(e => `§${e.section + 1} "${e.text}"`).slice(0, 6));
      if (pg.kickers.length >= 4 && pg.kickers.length / (pg.h3Count || 1) >= 0.75) check('kickers', 'warn', `${pg.kickers.length} of ${pg.h3Count} H3s carry a tracked caps kicker (A6 "eyebrow above every heading")`, pg.kickers.map(e => `"${e.text}"`).slice(0, 6));
      check('accents', pg.accents.length > 2 ? 'warn' : 'pass', `${pg.accents.length} accent hue cluster(s) ≥5%: ${pg.accents.map(a => `${a.sample} ${a.hue} ${a.share}%`).join(', ') || 'none'}`);
      check('repetition', pg.repeats.length ? 'warn' : 'pass', pg.repeats.length ? `${pg.repeats.length} group(s) of sections with the same structure (same archetype?)` : 'no structurally identical sections', pg.repeats);
    }
    if (pg.axe) {
      if (pg.axe.skipped || pg.axe.error) check(`axe ${mode}`, 'warn', 'axe-core: ' + (pg.axe.skipped || pg.axe.error));
      else {
        const serious = pg.axe.filter(v => v.impact === 'serious' || v.impact === 'critical');
        const cc = pg.axe.find(v => v.id === 'color-contrast');
        check(`axe ${mode}`, serious.length ? 'fail' : pg.axe.length ? 'warn' : 'pass', (pg.axe.length ? `${pg.axe.length} WCAG A/AA rule(s) violated: ` + pg.axe.map(v => `${v.id}×${v.nodes} (${v.impact})`).join(', ') : 'no axe violations') + (pg.axeDecorative ? ` (${pg.axeDecorative} decorative aria-hidden/presentation text node(s) excluded from contrast)` : ''),
          cc ? cc.samples.map(s => 'contrast: ' + s) : pg.axe.slice(0, 3).map(v => `${v.id}: ${v.samples[0] || ''}`));
      }
    }
  }
  for (const c of P.checks) delete c.undefined;
  delete (P.page || {}).text; delete (P.page || {}).headingText; delete (P.page || {}).html;
  if (P.pageRtl) { delete P.pageRtl.text; delete P.pageRtl.headingText; delete P.pageRtl.html; }
  P.perWidth = perWidth;
  results.pages.push(P);
}
{ // page pool
  const queue = [...pages];
  await Promise.all(Array.from({ length: Math.min(opt.conc, queue.length) }, async () => { while (queue.length) { const u = queue.shift(); try { await checkPage(u); } catch (e) { console.error('page failed', u, e.message); } } }));
  results.pages.sort((a, b) => pages.indexOf(a.url) - pages.indexOf(b.url));
  for (const P of results.pages) { const f = P.checks.filter(c => c.status === 'fail').length, wn = P.checks.filter(c => c.status === 'warn').length;
    SUMMARY.push(`${f ? 'FAIL' : wn ? 'WARN' : 'PASS'}  ${P.key}  (${f} fail, ${wn} warn)`); }
}
await browser.close();
if (server) server.close();

// ───────────────────────── report ─────────────────────────
const icon = { pass: '✅', warn: '⚠️', fail: '❌' };
let md = `# QA report\n\nTarget: \`${opt.target}\` · ${results.startedAt} · widths ${opt.widths.join(', ')}${opt.rtl ? ' · LTR + RTL' : ''} · reduced-motion pass\n\n`;
md += SUMMARY.map(s => '- ' + s).join('\n') + '\n';
for (const P of results.pages) {
  md += `\n## ${P.key}\n\n${P.url}\n\nScreenshots: \`${P.shots}/\` (\`<mode>-<width>-top.jpg\`, \`-full.jpg\`, \`ltr-1440-reduced-*\`)\n\n| | check | result |\n|---|---|---|\n`;
  const order = { fail: 0, warn: 1, pass: 2 };
  for (const c of [...P.checks].sort((a, b) => order[a.status] - order[b.status])) {
    md += `| ${icon[c.status]} | ${c.id} | ${c.msg.replace(/\|/g, '\\|')}${c.detail && c.detail.length && c.status !== 'pass' ? '<br>' + c.detail.map(d => '`' + String(d).replace(/\|/g, '\\|').replace(/`/g, "'").slice(0, 160) + '`').join('<br>') : ''} |\n`;
  }
}
md += `\nNotes: "clipped" = content past the viewport edge hidden by \`overflow-x: clip\` (not a scrollbar, but maybe cut content). Accent hues ignore images. \`fonts\` = first available family per element's CSS stack; \`fonts-rendered\` = faces Chromium actually used per script (CDP), which does catch Hebrew falling back to a system face. Eyebrows/repetition are heuristics.\n`;
fs.writeFileSync(path.join(opt.out, 'report.md'), md);
fs.writeFileSync(path.join(opt.out, 'report.json'), JSON.stringify(results, null, 1));
console.log('\n' + SUMMARY.join('\n'));
console.log(`\nReport: ${path.join(opt.out, 'report.md')}  (+ report.json, screenshots per page)`);
process.exit(results.pages.some(p => p.checks.some(c => c.status === 'fail')) ? 1 : 0);
