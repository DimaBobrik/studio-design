#!/usr/bin/env node
/* studio-design · scripts/render-stills.mjs — render static fallback stills of an fx/lathe object with Playwright.
   The stills are the <img class="sd-lathe__fallback"> (LCP / no-WebGL / SEO image) and PDP thumbnails of a code-built object.

   Usage
     node render-stills.mjs --runtime ./runtime --tokens ./assets/tokens.css --out ./img --name vase \
          --attrs 'data-preset=vase data-material=glazed-ceramic data-colors=--img-glaze-ash,--img-glaze-pool data-seed=14' \
          [--angles 0,45,90,180] [--size 1000x1300] [--format webp|png] [--quality 0.9] [--bg transparent|--c-canvas|#hex]
     node render-stills.mjs --config stills.json      # [{ "name": "vase", "attrs": {"data-preset":"vase", …}, "angles": [0,90], "size": "1000x1300" }, …]
                                                      # (--runtime/--tokens/--out/--format still apply to every entry)
   Output: <out>/<name>-<angle padded to 3>.webp (e.g. vase-000.webp, vase-090.webp) at exactly --size pixels.
   --bg: transparent (default) keeps alpha (WebP/PNG); a --token or CSS colour composites the frame onto that colour
   (use for JPEG-like opaque stills or OG images). Use the same data-* attributes as the live element so the still and the render match; the first frame (angle 0 by
   default) is the fallback <img> with width/height = --size.
   Needs: npm i playwright && npx playwright install chromium. WebGL runs on SwiftShader (no GPU needed). */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
if (!argv.length || argv.includes('-h') || argv.includes('--help')) {
  const s = fs.readFileSync(new URL(import.meta.url), 'utf8'); console.log(s.slice(s.indexOf('Usage'), s.indexOf('Needs:'))); process.exit(argv.length ? 0 : 2);
}
const opt = { runtime: 'runtime', tokens: null, out: 'img', name: 'lathe', attrs: '', angles: '0', size: '1000x1300', format: 'webp', quality: 0.9, bg: 'transparent', config: null };
for (let i = 0; i < argv.length; i++) { const k = argv[i].replace(/^--/, ''); if (k in opt) opt[k] = argv[++i]; else { console.error('Unknown argument: ' + argv[i]); process.exit(2); } }

function parseAttrs(a) {
  if (a && typeof a === 'object') return a;
  const out = {}; String(a || '').trim().split(/\s+(?=data-)/).filter(Boolean).forEach(p => { const i = p.indexOf('='); out[i < 0 ? p : p.slice(0, i)] = i < 0 ? 'true' : p.slice(i + 1).replace(/^["']|["']$/g, ''); });
  return out;
}
const jobs = opt.config ? JSON.parse(fs.readFileSync(opt.config, 'utf8')) : [{ name: opt.name, attrs: opt.attrs, angles: opt.angles, size: opt.size }];
const rt = path.resolve(opt.runtime);
for (const f of ['core.css', 'core.js', 'fx/lathe.js', 'fx/lathe.css']) if (!fs.existsSync(path.join(rt, f))) { console.error('Missing ' + path.join(rt, f)); process.exit(2); }
fs.mkdirSync(opt.out, { recursive: true });

const args = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
const browser = await chromium.launch({ args });
let failed = 0;
for (const job of jobs) {
  const [w, h] = String(job.size || opt.size).split('x').map(Number);
  const angles = (Array.isArray(job.angles) ? job.angles : String(job.angles || '0').split(',')).map(Number);
  const attrs = Object.assign(parseAttrs(job.attrs), { 'data-fx': 'lathe', 'data-capture': 'true' });
  delete attrs['data-scroll']; delete attrs['data-auto']; delete attrs['data-intro']; delete attrs['data-drag'];
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('  [page]', m.text()); });
  const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`).join(' ');
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0">
    <div id="obj" class="sd-lathe" ${attrStr} style="inline-size:${w}px;block-size:${h}px;aspect-ratio:auto"></div></body></html>`);
  await page.addStyleTag({ path: path.join(rt, 'core.css') });
  if (opt.tokens) await page.addStyleTag({ path: path.resolve(opt.tokens) });
  await page.addStyleTag({ path: path.join(rt, 'fx/lathe.css') });
  await page.addScriptTag({ path: path.join(rt, 'fx/lathe.js') });   // registers into SD.fx before core boots
  await page.addScriptTag({ path: path.join(rt, 'core.js') });
  await page.evaluate(() => { SD.initAll(document); });
  const ok = await page.waitForFunction(() => { const e = document.getElementById('obj'); return e.sdLathe || e.classList.contains('is-fallback'); }, null, { timeout: 20000 }).then(() => page.evaluate(() => !!document.getElementById('obj').sdLathe)).catch(() => false);
  if (!ok) { console.error(`✗ ${job.name}: WebGL2 unavailable or shader failed`); failed++; await page.close(); continue; }
  for (const a of angles) {
    const mime = opt.format === 'png' ? 'image/png' : 'image/webp';
    const data = await page.evaluate(([a, mime, q, bg]) => {
      const e = document.getElementById('obj'); e.sdLathe.setAngle(a); e.sdLathe.render();
      const src = e.querySelector('canvas');
      if (!bg || bg === 'transparent') return e.sdLathe.toDataURL(mime, q);
      // composite the (transparent, premultiplied) WebGL frame onto the background colour
      const c = document.createElement('canvas'); c.width = src.width; c.height = src.height; const x = c.getContext('2d');
      const probe = document.createElement('i'); probe.style.color = bg.startsWith('--') ? `var(${bg})` : bg; document.body.appendChild(probe);
      x.fillStyle = getComputedStyle(probe).color; probe.remove(); x.fillRect(0, 0, c.width, c.height); x.drawImage(src, 0, 0);
      return c.toDataURL(mime, q);
    }, [a, mime, Number(opt.quality), opt.bg]);
    const file = path.join(opt.out, `${job.name}-${String(Math.round(((a % 360) + 360) % 360)).padStart(3, '0')}.${opt.format === 'png' ? 'png' : 'webp'}`);
    fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64'));
    console.log(`✓ ${file} (${w}×${h})`);
  }
  await page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
