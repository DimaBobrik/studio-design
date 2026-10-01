#!/usr/bin/env node
/* studio-design · scripts/scan.mjs — mass-scan reference sites: screenshots + extracted design data (JSON).

   Usage
     node scan.mjs <sites.json> [--out out/] [--concurrency 2] [--no-inner] [--force] [--only slug1,slug2]
                   [--limit N] [--delay 4000] [--settle 9000] [--ignore-robots]

   Input: a JSON array of sites:
     [{ "url": "https://example.com/", "type": "ecommerce|landing|company", "style": "one-line look", "why": "why it is a reference",
        "platform": "WordPress + WooCommerce + GSAP", "pages": ["https://example.com/shop/", "…"] }]     (up to 3 inner pages are scanned)

   Output per site: <out>/<slug>/
     data.json          { site, home, inner[], scannedAt } — typography by role, big text, families, colours, gradients, radii,
                        shadows, root CSS vars, libraries (gsap, lenis, three, swiper…), section outline, header, layout metrics
     d_hero.jpg         1440×900 first viewport          d_full.jpg   full page (capped 14000px)
     d_scroll_NN.jpg    up to 10 scroll frames (motion states)          m_full.jpg   390×844 mobile full page
     pageN/             same for inner pages (hero + capped full page only)
   Then: python3 aggregate.py <out>  (see scripts/README.md for the pipeline).

   Politeness: one site per worker, sequential pages inside a site with a jittered --delay between them; robots.txt of each
   origin is honoured for the "*" and "studio-design-scan" agents (pages it disallows are skipped and logged);
   sites with an existing data.json are skipped (resume) unless --force. Keep --concurrency ≤ 3.
   Launch: Chromium with SwiftShader WebGL (so canvases/shaders render headless); proxy via HTTPS_PROXY when set. */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// ───────── CLI ─────────
const argv = process.argv.slice(2);
if (!argv.length || argv.includes('-h') || argv.includes('--help')) {
  const s = fs.readFileSync(new URL(import.meta.url), 'utf8'); console.log(s.slice(s.indexOf('Usage'), s.indexOf('Output per site')));
  process.exit(argv.length ? 0 : 2);
}
const opt = { sites: null, out: 'out', conc: 2, inner: true, force: false, only: null, limit: 0, delay: 4000, settle: 9000, robots: true };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--out') opt.out = argv[++i];
  else if (a === '--concurrency' || a === '-c') opt.conc = Math.max(1, +argv[++i] || 1);
  else if (a === '--no-inner') opt.inner = false;
  else if (a === '--force') opt.force = true;
  else if (a === '--only') opt.only = argv[++i].split(',').map(s => s.trim());
  else if (a === '--limit') opt.limit = +argv[++i];
  else if (a === '--delay') opt.delay = +argv[++i];
  else if (a === '--settle') opt.settle = +argv[++i];
  else if (a === '--ignore-robots') opt.robots = false;
  else if (!a.startsWith('--') && !opt.sites) opt.sites = a;
  else if (/^\d+$/.test(a)) opt.conc = +a;                                   // legacy: scan.mjs sites.json outDir [conc]
  else if (!a.startsWith('--') && opt.out === 'out') opt.out = a;
  else { console.error('Unknown argument: ' + a); process.exit(2); }
}
let sites = JSON.parse(fs.readFileSync(opt.sites, 'utf8'));
fs.mkdirSync(opt.out, { recursive: true });

const slug = u => u.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').replace(/_+$/, '').slice(0, 80);
if (opt.only) sites = sites.filter(s => opt.only.includes(slug(s.url)));
if (opt.limit) sites = sites.slice(0, opt.limit);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const polite = () => sleep(opt.delay * (0.75 + Math.random() * 0.5));
const log = (...a) => { const line = `[${new Date().toISOString().slice(11, 19)}] ` + a.join(' '); console.log(line); fs.appendFileSync(path.join(opt.out, 'scan.log'), line + '\n'); };
const UA_DESKTOP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 studio-design-scan/1.1';
const UA_MOBILE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1 studio-design-scan/1.1';

// ───────── robots.txt ─────────
const robotsCache = new Map();
function parseRobots(txt) {
  // groups for "*" and our agent; our agent's group wins if present
  const groups = []; let cur = null, lastWasUA = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim(); if (!line) continue;
    const m = /^([a-z-]+)\s*:\s*(.*)$/i.exec(line); if (!m) continue;
    const k = m[1].toLowerCase(), v = m[2].trim();
    if (k === 'user-agent') { if (!lastWasUA) { cur = { agents: [], rules: [] }; groups.push(cur); } cur.agents.push(v.toLowerCase()); lastWasUA = true; continue; }
    lastWasUA = false; if (!cur) continue;
    if (k === 'allow' || k === 'disallow') cur.rules.push({ allow: k === 'allow', path: v });
  }
  const mine = groups.filter(g => g.agents.some(a => a === 'studio-design-scan'));
  const star = groups.filter(g => g.agents.includes('*'));
  return (mine.length ? mine : star).flatMap(g => g.rules);
}
function allowedBy(rules, url) {
  const u = new URL(url), p = u.pathname + u.search; let best = null;
  for (const r of rules) {
    if (!r.path) continue;                                         // "Disallow:" (empty) = allow all
    const re = new RegExp('^' + r.path.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));
    if (re.test(p) && (!best || r.path.length > best.path.length || (r.path.length === best.path.length && r.allow))) best = r;
  }
  return !best || best.allow;
}
async function robotsAllows(browser, url) {
  if (!opt.robots) return true;
  const origin = new URL(url).origin;
  if (!robotsCache.has(origin)) {
    let rules = [];
    const ctx = await browser.newContext({ userAgent: UA_DESKTOP, ignoreHTTPSErrors: true });
    try { const pg = await ctx.newPage(); const r = await pg.goto(origin + '/robots.txt', { timeout: 20000 });
      if (r && r.ok() && /text\/plain/i.test(r.headers()['content-type'] || '')) rules = parseRobots(await r.text()); } catch {}
    await ctx.close();
    robotsCache.set(origin, rules);
  }
  return allowedBy(robotsCache.get(origin), url);
}

const COOKIE_WORDS = ['accept all', 'accept', 'agree', 'allow all', 'got it', 'ok', 'i agree', 'accept cookies', 'close', 'no thanks', 'continue', 'אישור', 'מסכים'];

async function dismissPopups(page) {
  for (let round = 0; round < 2; round++) {
    try {
      await page.evaluate((words) => {
        const els = [...document.querySelectorAll('button, a, [role=button], input[type=button], input[type=submit]')];
        for (const el of els) {
          const t = (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().toLowerCase();
          if (!t || t.length > 30) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (words.includes(t)) { el.click(); }
        }
      }, COOKIE_WORDS);
    } catch {}
    await page.keyboard.press('Escape').catch(() => {});
    await sleep(600);
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight;
    let y = 0;
    const max = Math.min(h(), 30000);
    while (y < max) { y += Math.round(innerHeight * 0.7); window.scrollTo(0, y); await new Promise(r => setTimeout(r, 180)); }
    window.scrollTo(0, 0);
  });
  await sleep(1200);
}

// Runs in the page: extracts design data.
function extract() {
  const round = n => Math.round(n * 10) / 10;
  const freq = (arr) => { const m = {}; arr.forEach(v => { if (v != null && v !== '') m[v] = (m[v] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
  const txt = el => (el.innerText || '').replace(/\s+/g, ' ').trim();

  // Typography by role
  const roles = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', p: 'p', a_nav: 'nav a, header a', button: 'button, .button, .btn, [class*=button]', small: 'small, figcaption, [class*=label], [class*=eyebrow], [class*=caption]', li: 'li' };
  const typography = {};
  for (const [role, sel] of Object.entries(roles)) {
    const els = [...document.querySelectorAll(sel)].filter(vis).slice(0, 40);
    typography[role] = freq(els.map(e => { const s = getComputedStyle(e); return `${s.fontFamily.split(',')[0].replace(/["']/g, '').trim()} | ${s.fontSize} | w${s.fontWeight} | lh ${s.lineHeight} | ls ${s.letterSpacing} | ${s.textTransform} | ${s.fontStyle}`; })).slice(0, 4);
  }

  // Largest text on page (display type)
  const textEls = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div,a,li')].filter(e => e.children.length === 0 || e.matches('h1,h2,h3')).filter(vis);
  const bigText = textEls.map(e => ({ size: parseFloat(getComputedStyle(e).fontSize), el: e })).filter(o => txt(o.el).length > 1).sort((a, b) => b.size - a.size).slice(0, 12)
    .map(o => { const s = getComputedStyle(o.el); return { text: txt(o.el).slice(0, 60), size: o.size, family: s.fontFamily.split(',')[0].replace(/["']/g, ''), weight: s.fontWeight, ls: s.letterSpacing, lh: s.lineHeight, transform: s.textTransform, color: s.color }; });

  // Font families used overall
  const all = [...document.querySelectorAll('body *')].filter(vis).slice(0, 4000);
  const families = freq(all.filter(e => e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim())).slice(0, 8);
  const fontSizes = freq(all.filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(e => getComputedStyle(e).fontSize)).slice(0, 20);

  // Colors
  const bgColors = freq(all.map(e => getComputedStyle(e).backgroundColor).filter(c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent')).slice(0, 15);
  const textColors = freq(all.filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(e => getComputedStyle(e).color)).slice(0, 12);
  const gradients = freq(all.map(e => getComputedStyle(e).backgroundImage).filter(b => b && b.includes('gradient')).map(b => b.slice(0, 160))).slice(0, 8);
  const radii = freq(all.map(e => getComputedStyle(e).borderRadius).filter(r => r && r !== '0px')).slice(0, 10);
  const shadows = freq(all.map(e => getComputedStyle(e).boxShadow).filter(s => s && s !== 'none').map(s => s.slice(0, 120))).slice(0, 6);
  const blend = freq(all.map(e => getComputedStyle(e).mixBlendMode).filter(m => m && m !== 'normal')).slice(0, 5);
  const backdrop = freq(all.map(e => getComputedStyle(e).backdropFilter).filter(m => m && m !== 'none')).slice(0, 5);

  // Root CSS custom properties
  const rootVars = {};
  try {
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      for (const r of rules) { if (r.selectorText && /(^|,)\s*(:root|html|body)\s*($|,)/.test(r.selectorText)) { for (const p of r.style) { if (p.startsWith('--') && Object.keys(rootVars).length < 120) rootVars[p] = r.style.getPropertyValue(p).trim().slice(0, 80); } } }
    }
  } catch {}
  const fontFaces = [...new Set([...document.fonts].map(f => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`))].slice(0, 30);

  // Libraries
  const w = window;
  const scripts = [...document.scripts].map(s => s.src).filter(Boolean);
  const has = re => scripts.some(s => re.test(s));
  const libs = {
    gsap: !!w.gsap || has(/gsap/i), ScrollTrigger: !!w.ScrollTrigger || has(/ScrollTrigger/i), SplitText: !!w.SplitText || has(/SplitText/i),
    lenis: !!w.lenis || !!w.Lenis || document.documentElement.classList.contains('lenis') || has(/lenis/i), locomotive: has(/locomotive/i) || !!document.querySelector('[data-scroll-container]'),
    three: !!w.THREE || has(/three/i), swiper: !!w.Swiper || has(/swiper/i) || !!document.querySelector('.swiper'), barba: !!w.barba || has(/barba/i), swup: !!w.swup || has(/swup/i),
    lottie: !!w.lottie || has(/lottie/i), framerMotion: !!document.querySelector('[data-framer-component-type],[data-projection-id]'), splide: has(/splide/i),
    wordpress: /wp-content|wp-includes/.test(document.documentElement.innerHTML.slice(0, 400000)), woocommerce: /woocommerce/i.test(document.documentElement.innerHTML.slice(0, 400000)),
    shopify: !!w.Shopify, webflow: !!document.documentElement.getAttribute('data-wf-site'), next: !!w.__NEXT_DATA__ || !!document.querySelector('#__next') || has(/_next\//),
  };
  const media = { canvas: document.querySelectorAll('canvas').length, video: document.querySelectorAll('video').length, svg: document.querySelectorAll('svg').length, img: document.querySelectorAll('img').length, iframe: document.querySelectorAll('iframe').length };

  // Section outline: walk down to find the list of stacked page sections
  const H = document.documentElement.scrollHeight;
  let container = document.querySelector('main') || document.body;
  for (let i = 0; i < 6; i++) { const kids = [...container.children].filter(vis); if (kids.length === 1 && kids[0].getBoundingClientRect().height > innerHeight * 1.5) container = kids[0]; else break; }
  const sections = [...container.children].filter(vis).filter(e => e.getBoundingClientRect().height > 60).slice(0, 40).map((e, i) => {
    const s = getComputedStyle(e); const r = e.getBoundingClientRect();
    const h = e.querySelector('h1,h2,h3');
    return {
      i, tag: e.tagName.toLowerCase(), cls: (e.className && e.className.baseVal === undefined ? e.className : '').toString().slice(0, 80), id: e.id,
      top: Math.round(r.top + scrollY), height: Math.round(r.height), bg: s.backgroundColor, bgImage: s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 80) : '',
      heading: h ? txt(h).slice(0, 80) : '', words: txt(e).split(' ').length,
      imgs: e.querySelectorAll('img').length, videos: e.querySelectorAll('video').length, canvas: e.querySelectorAll('canvas').length, links: e.querySelectorAll('a').length, buttons: e.querySelectorAll('button,.btn,.button').length,
      position: s.position, pinnedLike: r.height > innerHeight * 2.5,
      columns: s.display.includes('grid') ? s.gridTemplateColumns.split(' ').length : (s.display.includes('flex') ? 'flex' : s.display),
    };
  });

  // Layout metrics
  const containers = freq(all.filter(e => { const s = getComputedStyle(e); return s.maxWidth && s.maxWidth !== 'none' && s.maxWidth.endsWith('px'); }).map(e => getComputedStyle(e).maxWidth)).slice(0, 6);
  const sectionPaddings = freq([...container.children].filter(vis).map(e => { const s = getComputedStyle(e); return `${s.paddingTop}/${s.paddingBottom}`; })).slice(0, 6);
  const gaps = freq(all.map(e => getComputedStyle(e).gap).filter(g => g && g !== 'normal' && g !== '0px')).slice(0, 8);

  const header = document.querySelector('header, [class*=header], nav');
  const headerInfo = header ? { height: Math.round(header.getBoundingClientRect().height), position: getComputedStyle(header).position, bg: getComputedStyle(header).backgroundColor, links: header.querySelectorAll('a').length, text: txt(header).slice(0, 200) } : null;
  const cursorCustom = getComputedStyle(document.body).cursor === 'none' || !!document.querySelector('[class*=cursor]');
  const marquee = !!document.querySelector('[class*=marquee], [class*=ticker], marquee');
  const sticky = [...document.querySelectorAll('*')].slice(0, 5000).filter(e => getComputedStyle(e).position === 'sticky').length;

  return {
    title: document.title, lang: document.documentElement.lang, dir: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
    viewport: { w: innerWidth, h: innerHeight }, pageHeight: H,
    families, fontFaces, fontSizes, typography, bigText, colors: { bg: bgColors, text: textColors, gradients }, radii, shadows, blend, backdrop,
    rootVars, libs, media, header: headerInfo, sections, layout: { containers, sectionPaddings, gaps }, flags: { cursorCustom, marquee, stickyCount: sticky },
    metaDescription: document.querySelector('meta[name=description]')?.content || '',
  };
}

async function scanPage(browser, url, dir, full) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: UA_DESKTOP, locale: 'en-US', ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const res = { url, ok: false };
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(opt.settle);
    await dismissPopups(page);
    await autoScroll(page);
    await dismissPopups(page);
    const data = await page.evaluate(extract);
    Object.assign(res, data, { ok: true });
    await page.screenshot({ path: path.join(dir, 'd_hero.jpg'), type: 'jpeg', quality: 70 });
    const H = Math.min(data.pageHeight, full ? 14000 : 7000);
    await page.screenshot({ path: path.join(dir, 'd_full.jpg'), type: 'jpeg', quality: 55, fullPage: true, clip: { x: 0, y: 0, width: 1440, height: H } }).catch(() => {});
    if (full) {
      const n = Math.min(10, Math.ceil(data.pageHeight / 900));
      for (let i = 1; i <= n; i++) {
        await page.evaluate(y => window.scrollTo(0, y), Math.round((data.pageHeight - 900) * i / n));
        await sleep(700);
        await page.screenshot({ path: path.join(dir, `d_scroll_${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 60 });
      }
    }
  } catch (e) { res.error = String(e).slice(0, 300); }
  await ctx.close();
  if (full && res.ok) {
    await polite();
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA_MOBILE, ignoreHTTPSErrors: true });
    const mp = await m.newPage();
    try {
      await mp.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); await sleep(Math.max(2000, opt.settle - 1000)); await dismissPopups(mp); await autoScroll(mp);
      const mh = await mp.evaluate(() => document.documentElement.scrollHeight);
      await mp.screenshot({ path: path.join(dir, 'm_full.jpg'), type: 'jpeg', quality: 55, fullPage: true, clip: { x: 0, y: 0, width: 390, height: Math.min(mh, 9000) } }).catch(() => {});
      res.mobile = await mp.evaluate(() => ({ pageHeight: document.documentElement.scrollHeight, h1: (() => { const h = document.querySelector('h1'); if (!h) return null; const s = getComputedStyle(h); return { size: s.fontSize, lh: s.lineHeight }; })() }));
    } catch (e) { res.mobileError = String(e).slice(0, 200); }
    await m.close();
  }
  return res;
}

async function scanSite(browser, site) {
  const dir = path.join(opt.out, slug(site.url));
  if (!opt.force && fs.existsSync(path.join(dir, 'data.json'))) { log('skip (exists)', site.url); return 'skipped'; }
  if (!(await robotsAllows(browser, site.url))) { log('skip (robots.txt)', site.url); return 'robots'; }
  fs.mkdirSync(dir, { recursive: true });
  log('scan', site.url);
  const home = await scanPage(browser, site.url, dir, true);
  const inner = [];
  if (opt.inner) {
    for (const [i, p] of (site.pages || []).slice(0, 3).entries()) {
      if (!(await robotsAllows(browser, p))) { log('  skip inner (robots.txt)', p); inner.push({ url: p, ok: false, error: 'disallowed by robots.txt' }); continue; }
      const pd = path.join(dir, `page${i + 1}`); fs.mkdirSync(pd, { recursive: true });
      await polite();
      inner.push(await scanPage(browser, p, pd, false));
    }
  }
  fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify({ site, home, inner, scannedAt: new Date().toISOString() }, null, 1));
  log('done', site.url, home.ok ? 'ok' : home.error);
  return home.ok ? 'ok' : 'error';
}

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const args = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'];
if (proxy) args.push(`--proxy-server=${proxy}`, '--proxy-bypass-list=127.0.0.1;localhost');
const browser = await chromium.launch({ args });
const queue = [...sites], tally = {};
log(`start: ${sites.length} site(s), concurrency ${opt.conc}, inner ${opt.inner}, robots ${opt.robots}, out ${opt.out}`);
await Promise.all(Array.from({ length: Math.min(opt.conc, queue.length || 1) }, async (_, w) => {
  if (w) await sleep(w * 1500);                                   // stagger workers
  while (queue.length) { const s = queue.shift(); let r; try { r = await scanSite(browser, s); } catch (e) { r = 'error'; log('fail', s.url, e.message); } tally[r] = (tally[r] || 0) + 1; }
}));
await browser.close();
log('ALL DONE', JSON.stringify(tally));
