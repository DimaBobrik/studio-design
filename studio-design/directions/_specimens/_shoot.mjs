// Specimen screenshots: node _shoot.mjs [slug ...] [--only=ltr|rtl|m]   (needs playwright on NODE_PATH; REPORT=file.json to dump audits)
// Serves the skill folder on 127.0.0.1:8791 (expects it running: python3 -m http.server 8791 -d <skill>),
// writes <slug>.jpg (1440x900), <slug>.rtl.jpg, <slug>.m.jpg (390x844) + prints console errors and SPEC.audit().
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const dir = path.dirname(new URL(import.meta.url).pathname);
let slugs = process.argv.slice(2).filter(a => !a.startsWith('--'));
const only = (process.argv.find(a => a.startsWith('--only=')) || '').slice(7);
if (!slugs.length) slugs = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('_') && f !== 'index.html').map(f => f.slice(0, -5));
const args = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
if (process.env.HTTPS_PROXY) args.push('--proxy-server=' + process.env.HTTPS_PROXY, '--proxy-bypass-list=127.0.0.1;localhost');
const browser = await chromium.launch({ args });
const base = 'http://127.0.0.1:8791/directions/_specimens/';
const shots = [
  { key: 'ltr', suffix: '.jpg', q: '', vp: { width: 1440, height: 900 } },
  { key: 'rtl', suffix: '.rtl.jpg', q: '?rtl=1', vp: { width: 1440, height: 900 } },
  { key: 'm', suffix: '.m.jpg', q: '', vp: { width: 390, height: 844 }, mobile: true },
];
const report = {};
for (const slug of slugs) {
  report[slug] = {};
  for (const s of shots) {
    if (only && only !== s.key) continue;
    const ctx = await browser.newContext({ viewport: s.vp, deviceScaleFactor: 1, isMobile: !!s.mobile, hasTouch: !!s.mobile, ignoreHTTPSErrors: true });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
    page.on('pageerror', e => errs.push('PAGEERR ' + String(e).slice(0, 200)));
    page.on('requestfailed', r => errs.push('REQFAIL ' + r.url().slice(0, 120)));
    try {
      await page.goto(base + slug + '.html' + s.q, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) { errs.push('GOTO ' + e.message.slice(0, 100)); }
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    await page.waitForTimeout(900);
    // settle entrance animations deterministically: finish every finite, non-scroll tween (loops and scrubs untouched)
    await page.evaluate(() => { if (!window.gsap) return; gsap.globalTimeline.getChildren(true, true, true).forEach(t => { if (!t.scrollTrigger && t.repeat() !== -1 && !(t.parent && t.parent.scrollTrigger)) t.progress(1); }); }).catch(() => {});
    await page.waitForTimeout(+(process.env.WAIT || 1500));
    await page.screenshot({ path: path.join(dir, slug + s.suffix), type: 'jpeg', quality: 62 });
    if (s.key !== 'm') {
      const a = await page.evaluate(() => window.SPEC ? window.SPEC.audit() : null).catch(() => null);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      report[slug][s.key] = { errs, audit: a, overflowX: ov };
    } else {
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      report[slug][s.key] = { errs, overflowX: ov };
    }
    await ctx.close();
  }
  const size = shots.map(s => { try { return Math.round(fs.statSync(path.join(dir, slug + s.suffix)).size / 1024) + 'K'; } catch { return '-'; } }).join('/');
  console.log('## ' + slug + ' ' + size);
  for (const k of Object.keys(report[slug])) {
    const r = report[slug][k];
    console.log('  ' + k + ' ovx=' + r.overflowX + (r.errs.length ? ' ERR: ' + r.errs.join(' | ') : ''));
    if (r.audit && k === 'ltr') console.log('  contrast ' + JSON.stringify(r.audit.contrast) + '\n  fonts ' + r.audit.fonts.join(', '));
    if (r.audit && k === 'rtl') console.log('  fonts-rtl ' + r.audit.fonts.join(', '));
  }
}
if (process.env.REPORT) fs.writeFileSync(process.env.REPORT, JSON.stringify(report, null, 1));
await browser.close();
