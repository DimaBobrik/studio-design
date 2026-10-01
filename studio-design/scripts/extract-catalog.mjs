#!/usr/bin/env node
/* studio-design · scripts/extract-catalog.mjs — pull a client's REAL product catalogue into data/catalog.json,
   so PLP/PDP pages are built from real names, prices, variations and photos instead of samples.

   Usage:
     node scripts/extract-catalog.mjs https://store.example.co.il                 # auto: Woo → Shopify → HTML (JSON-LD/microdata/og)
     node scripts/extract-catalog.mjs https://store.example.co.il --out site/data/catalog.json --max 150
     node scripts/extract-catalog.mjs https://shop.example.com --mode html --seed /category/cameras,/category/alarms
   Options: --out <file> (default data/catalog.json) · --mode auto|woo|shopify|html · --max <products> (default 200)
            --pages <n> listing pages to crawl in html mode (default 40) · --seed <paths> extra start pages (comma list)
            --variations (Woo: also fetch each variation's price/sku/stock, 1 request per variation, capped by --max)
            --delay <ms> between HTML page loads (default 350; be polite) · --lang he|en (Accept-Language, default he)

   Sources, tried in order in auto mode:
     1. WooCommerce Store API  /wp-json/wc/store/v1/products?per_page=100&page=N  (public, no key; paged until empty)
     2. Shopify                /products.json?limit=250&page=N
     3. HTML crawl in Chromium (Playwright): sitemap(s) + start page + categories → product pages; reads JSON-LD Product /
        ItemList / @graph, then schema.org microdata (itemtype …/Product), then og:/product: meta. A real browser gets
        through most WAF/Cloudflare checks that block curl, and decodes legacy charsets (windows-1255, iso-8859-8)
        from the page's own meta, so Hebrew text arrives as proper UTF-8.
   Output (UTF-8 JSON): { source, method, extracted_at, currency, count, products: [ { id, name, url, sku, type, price,
     regular_price, sale_price, on_sale, currency, in_stock, categories[], attributes[{name, slug, values[]}],
     variations[{id, sku, price, regular_price, in_stock, stock, attributes{}, image}], images[], description } ] }
   Prices are numbers in major units (290 = ₪290). `variations` maps 1:1 to fx/pdp `data-variations`.
   Respect the client's site: run it for the client's own store, keep --max modest, never republish other shops' data.
   Only dependency: playwright (same as verify.mjs). */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf('--' + n); if (i < 0) return d; const v = argv[i + 1]; return v && !v.startsWith('--') ? v : true; };
const START = argv.find(a => /^https?:\/\//.test(a));
if (!START) { console.error('usage: node extract-catalog.mjs <store-url> [--out data/catalog.json] [--mode auto|woo|shopify|html] [--max 200]'); process.exit(2); }
const OUT = resolve(flag('out', 'data/catalog.json'));
const MODE = flag('mode', 'auto');
const MAX = +flag('max', 200);
const MAX_PAGES = +flag('pages', 40);
const DELAY = +flag('delay', 350);
const LANG = flag('lang', 'he');
const WANT_VAR = !!flag('variations', false);
const SEEDS = String(flag('seed', '') || '').split(',').filter(Boolean);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

const origin = new URL(START).origin;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const strip = h => String(h || '').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&#8217;/g, '’').replace(/&#8211;/g, '–')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/\s+/g, ' ').trim();
const excerpt = (h, n = 280) => { const t = strip(h); return t.length > n ? t.slice(0, n).replace(/\s\S*$/, '') + '…' : t; };
const num = v => { if (v == null || v === '') return null; const n = parseFloat(String(v).replace(/[^\d.,-]/g, '').replace(/,(?=\d{3}\b)/g, '').replace(',', '.')); return isFinite(n) ? n : null; };

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const args = proxy ? [`--proxy-server=${proxy}`] : [];
const browser = await chromium.launch({ args });
const ctx = await browser.newContext({ userAgent: UA, locale: LANG === 'he' ? 'he-IL' : 'en-US', ignoreHTTPSErrors: true,
  extraHTTPHeaders: { 'Accept-Language': LANG === 'he' ? 'he-IL,he;q=0.9,en;q=0.8' : 'en-US,en;q=0.9' } });
const page = await ctx.newPage();

// warm up: one real page load gives WAF/Cloudflare cookies to the shared request context
let warm = null;
try { warm = await page.goto(START, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) { console.warn('start page failed:', String(e).slice(0, 120)); }
const startUrl = page.url() || START;
const base = new URL(startUrl).origin;

async function getJSON(url) {
  try {
    const r = await ctx.request.get(url, { timeout: 30000, headers: { Accept: 'application/json' } });
    if (!r.ok()) return { status: r.status() };
    const ct = r.headers()['content-type'] || '';
    const txt = (await r.body()).toString('utf8');
    if (!/json/.test(ct) && !/^\s*[[{]/.test(txt)) return { status: r.status(), notJson: true };
    return { status: r.status(), json: JSON.parse(txt), headers: r.headers() };
  } catch (e) { return { error: String(e).slice(0, 160) }; }
}

// ── 1. WooCommerce Store API ──
async function viaWoo() {
  const out = []; let currency = null;
  for (let p = 1; p < 100 && out.length < MAX; p++) {
    const r = await getJSON(`${base}/wp-json/wc/store/v1/products?per_page=100&page=${p}`);
    if (!r.json || !Array.isArray(r.json)) { if (p === 1) return null; break; }
    if (!r.json.length) break;
    for (const x of r.json) {
      const pr = x.prices || {}, div = Math.pow(10, pr.currency_minor_unit || 0);
      const m = v => (v == null || v === '' ? null : +v / div);
      currency = currency || pr.currency_code;
      out.push({
        id: x.id, name: strip(x.name), url: x.permalink, slug: x.slug, sku: x.sku || null, type: x.type,
        price: m(pr.price), regular_price: m(pr.regular_price), sale_price: x.on_sale ? m(pr.sale_price) : null, on_sale: !!x.on_sale,
        price_range: pr.price_range ? { min: m(pr.price_range.min_amount), max: m(pr.price_range.max_amount) } : null,
        currency: pr.currency_code || null, in_stock: x.is_in_stock, low_stock: x.low_stock_remaining ?? null,
        categories: (x.categories || []).map(c => strip(c.name)),
        attributes: (x.attributes || []).map(a => ({ name: strip(a.name), slug: a.taxonomy || null, variation: !!a.has_variations,
          values: (a.terms || []).map(t => ({ name: strip(t.name), slug: t.slug })) })),
        variations: (x.variations || []).map(v => ({ id: v.id, attributes: Object.fromEntries((v.attributes || []).map(a => {
          const at = (x.attributes || []).find(q => strip(q.name) === strip(a.name));
          return ['attribute_' + (at && at.taxonomy ? at.taxonomy : strip(a.name)), a.value];
        })) })),
        images: (x.images || []).map(i => ({ src: i.src, alt: i.alt || '' })),
        description: excerpt(x.short_description || x.description)
      });
      if (out.length >= MAX) break;
    }
    const tp = r.headers && +r.headers['x-wp-totalpages']; if (tp && p >= tp) break;
  }
  if (WANT_VAR) {
    let n = 0;
    for (const prod of out) for (const v of prod.variations) {
      if (n++ >= MAX) break;
      const r = await getJSON(`${base}/wp-json/wc/store/v1/products/${v.id}`);
      if (!r.json) continue;
      const pr = r.json.prices || {}, div = Math.pow(10, pr.currency_minor_unit || 0);
      Object.assign(v, { sku: r.json.sku || null, price: pr.price != null ? +pr.price / div : null, regular_price: pr.regular_price != null ? +pr.regular_price / div : null,
        in_stock: r.json.is_in_stock, stock: r.json.low_stock_remaining ?? null, image: r.json.images && r.json.images[0] ? r.json.images[0].src : null });
    }
  }
  return { method: 'woocommerce-store-api', currency, products: out };
}

// ── 2. Shopify ──
async function viaShopify() {
  const out = [];
  for (let p = 1; p < 40 && out.length < MAX; p++) {
    const r = await getJSON(`${base}/products.json?limit=250&page=${p}`);
    if (!r.json || !Array.isArray(r.json.products)) { if (p === 1) return null; break; }
    if (!r.json.products.length) break;
    for (const x of r.json.products) {
      const vs = x.variants || [], v0 = vs[0] || {};
      out.push({
        id: x.id, name: x.title, url: `${base}/products/${x.handle}`, slug: x.handle, sku: v0.sku || null, type: vs.length > 1 ? 'variable' : 'simple',
        price: num(v0.price), regular_price: num(v0.compare_at_price) || num(v0.price), sale_price: v0.compare_at_price && num(v0.compare_at_price) > num(v0.price) ? num(v0.price) : null,
        on_sale: !!(v0.compare_at_price && num(v0.compare_at_price) > num(v0.price)), currency: null, in_stock: vs.some(v => v.available),
        categories: [x.product_type, ...(Array.isArray(x.tags) ? x.tags : String(x.tags || '').split(','))].map(s => String(s || '').trim()).filter(Boolean),
        attributes: (x.options || []).map(o => ({ name: o.name, slug: o.name.toLowerCase(), variation: vs.length > 1, values: (o.values || []).map(v => ({ name: v, slug: v })) })),
        variations: vs.length > 1 ? vs.map(v => ({ id: v.id, sku: v.sku || null, price: num(v.price), regular_price: num(v.compare_at_price) || num(v.price), in_stock: !!v.available, stock: null,
          attributes: Object.fromEntries((x.options || []).map((o, i) => ['attribute_' + o.name.toLowerCase(), v['option' + (i + 1)]])), image: v.featured_image ? v.featured_image.src : null })) : [],
        images: (x.images || []).map(i => ({ src: i.src, alt: i.alt || '' })), description: excerpt(x.body_html)
      });
      if (out.length >= MAX) break;
    }
  }
  return { method: 'shopify-products-json', currency: null, products: out };
}

// ── 3. HTML crawl: JSON-LD → microdata → og meta ──
const EXTRACT = () => {
  const res = { products: [], listUrls: [], links: [] };
  const push = (o, how) => { if (o && o.name) res.products.push(Object.assign({ how }, o)); };
  const T = s => (s == null ? null : String(s).replace(/\s+/g, ' ').trim());
  const walk = (n, how) => {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(x => walk(x, how));
    const t = [].concat(n['@type'] || []).map(String);
    if (t.includes('Product') || t.includes('ProductGroup')) {
      const offers = [].concat(n.offers || []).flatMap(o => o && o['@type'] === 'AggregateOffer' ? [o, ...[].concat(o.offers || [])] : [o]).filter(Boolean);
      const o0 = offers[0] || {};
      push({ name: T(n.name), sku: T(n.sku || n.mpn), url: n.url || n['@id'] || null, brand: T(n.brand && (n.brand.name || n.brand)),
        price: o0.price ?? o0.lowPrice ?? null, high: o0.highPrice ?? null, currency: o0.priceCurrency || null,
        availability: o0.availability || null, image: [].concat(n.image || []).map(i => (typeof i === 'string' ? i : i && (i.url || i.contentUrl))).filter(Boolean),
        description: T(n.description), category: T(n.category),
        variants: [].concat(n.hasVariant || []).map(v => ({ name: T(v.name), sku: T(v.sku), price: v.offers && (v.offers.price ?? (v.offers[0] && v.offers[0].price)) })) }, how);
    }
    if (t.includes('ItemList')) [].concat(n.itemListElement || []).forEach(li => { const it = li.item || li; if (it && typeof it === 'object' && [].concat(it['@type'] || []).includes('Product')) walk(it, how); else if (li.url || (typeof it === 'string')) res.listUrls.push(li.url || it); });
    if (n['@graph']) walk(n['@graph'], how);
    for (const k of ['mainEntity', 'itemListElement']) if (n[k] && !t.includes('ItemList')) walk(n[k], how);
  };
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => { try { walk(JSON.parse(s.textContent), 'json-ld'); } catch (e) {} });
  if (!res.products.length) document.querySelectorAll('[itemtype*="schema.org/Product" i]').forEach(el => {
    const g = p => { const n = [...el.querySelectorAll('[itemprop="' + p + '"]')].find(x => x.closest('[itemscope]') === el || p === 'price' || p === 'priceCurrency' || p === 'availability'); if (!n) return null; return T(n.getAttribute('content') || n.getAttribute('href') || n.getAttribute('src') || n.textContent); };
    push({ name: g('name'), sku: g('sku') || g('mpn') || g('productID'), url: g('url') || location.href, brand: g('brand'), price: g('price') || g('lowPrice'), currency: g('priceCurrency'),
      availability: g('availability'), image: [...el.querySelectorAll('[itemprop="image"]')].map(i => i.getAttribute('content') || i.getAttribute('src') || i.getAttribute('href')).filter(Boolean),
      description: g('description'), category: g('category') }, 'microdata');
  });
  const meta = p => { const m = document.querySelector('meta[property="' + p + '"], meta[name="' + p + '"]'); return m ? T(m.getAttribute('content')) : null; };
  if (!res.products.length && /product/i.test(meta('og:type') || '')) {
    const title = meta('og:title') || document.title;
    const priceMeta = meta('product:price:amount') || meta('og:price:amount') || (title.match(/[₪$€£]\s?[\d,.]+|[\d,.]+\s?[₪$€£]/) || [])[0];
    push({ name: T(title.replace(/\s*[-–|]\s*[₪$€£]?\s?[\d,.]+\s?[₪$€£]?\s*$/, '')), url: meta('og:url') || location.href, price: priceMeta,
      currency: meta('product:price:currency') || (/₪/.test(priceMeta || '') ? 'ILS' : null), image: [meta('og:image')].filter(Boolean), description: meta('og:description') }, 'og-meta');
  }
  const crumbs = [...document.querySelectorAll('[itemtype*="BreadcrumbList"] [itemprop="name"], nav[aria-label*="bread" i] a, .breadcrumb a, .breadcrumbs a')].map(a => T(a.textContent)).filter(Boolean);
  res.crumbs = crumbs;
  // analytics fallback (GA4 view_item / Meta pixel ViewContent / enhanced-ecommerce attrs): common on custom platforms
  const js = [...document.querySelectorAll('script:not([src])')].map(s => s.textContent).join('\n');
  const g = re => { const m = js.match(re); return m ? T(m[1]) : null; };
  res.gaCategory = g(/item_category["']?\s*:\s*["']([^"']+)/) || g(/content_category["']?\s*:\s*["']([^"']+)/) ||
    (document.querySelector('[ee_product_category]') || { getAttribute: () => null }).getAttribute('ee_product_category');
  res.gaBrand = g(/item_brand["']?\s*:\s*["']([^"']+)/);
  res.links = [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h.startsWith(location.origin));
  res.charset = document.characterSet; res.lang = document.documentElement.lang;
  return res;
};

async function viaHtml() {
  const productRe = /\/(product|products|item|items|p|shop\/[^/]+)\/[^/?#]+|[?&](item|product|id)=\d+|\/\d{3,}[^/]*\.html?$/i;
  const listRe = /\/(category|categories|product-category|collections|cat|shop|catalog|store)(\/|$|\?)|[?&](cat|category|catid)=/i;
  const skipRe = /\.(jpe?g|png|gif|webp|svg|pdf|zip|mp4)(\?|$)|\/(cart|checkout|account|login|my-account|wp-admin|feed)\b|#/i;
  const productUrls = new Set(), listQueue = [], seen = new Set(), products = new Map();
  const add = u => { try { const x = new URL(u, base); x.hash = ''; return x.href; } catch { return null; } };
  // sitemaps (robots.txt + common names)
  const smQueue = [`${base}/sitemap.xml`, `${base}/sitemap_index.xml`, `${base}/product-sitemap.xml`, `${base}/sitemap_products_1.xml`];
  try { const r = await ctx.request.get(`${base}/robots.txt`, { timeout: 15000 }); if (r.ok()) (await r.text()).split('\n').forEach(l => { const m = l.match(/^sitemap:\s*(\S+)/i); if (m) smQueue.unshift(m[1]); }); } catch {}
  const smSeen = new Set();
  while (smQueue.length && smSeen.size < 12) {
    const sm = smQueue.shift(); if (smSeen.has(sm)) continue; smSeen.add(sm);
    try {
      const r = await ctx.request.get(sm, { timeout: 20000 }); if (!r.ok()) continue;
      const xml = (await r.body()).toString('utf8'); if (!/<(urlset|sitemapindex)/.test(xml)) continue;
      const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1].replace(/&amp;/g, '&'));
      if (/<sitemapindex/.test(xml)) locs.filter(l => /product|item|sitemap(-|_)?\d*\.xml/i.test(l)).forEach(l => smQueue.push(l));
      else locs.forEach(l => { if (productRe.test(decodeURI(l))) productUrls.add(l); else if (listRe.test(decodeURI(l))) listQueue.push(l); });
    } catch {}
  }
  console.log(`  sitemaps: ${smSeen.size} read, ${productUrls.size} product URL(s), ${listQueue.length} listing URL(s)`);
  listQueue.unshift(startUrl, ...SEEDS.map(s => add(s)).filter(Boolean));
  let charset = null, pagesDone = 0;
  const visit = async url => {
    if (seen.has(url)) return null; seen.add(url);
    try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); await page.waitForTimeout(500); }
    catch (e) { console.warn('  skip', url.slice(0, 90), String(e).slice(0, 80)); return null; }
    const r = await page.evaluate(EXTRACT).catch(() => null); if (!r) return null;
    charset = charset || r.charset;
    if (/firewall|access denied|attention required|just a moment/i.test(await page.title().catch(() => ''))) console.warn('  WAF page at', url.slice(0, 90), '(try --delay 1500 or a headed run)');
    await sleep(DELAY);
    return r;
  };
  // listing pages: collect product links (and inline JSON-LD products)
  while (listQueue.length && pagesDone < MAX_PAGES && productUrls.size < MAX * 1.5) {
    const u = add(listQueue.shift()); if (!u || seen.has(u) || skipRe.test(u)) continue;
    const r = await visit(u); pagesDone++; if (!r) continue;
    r.listUrls.forEach(l => { const a = add(l); if (a) productUrls.add(a); });
    for (const l of r.links) { if (skipRe.test(l)) continue; const d = (() => { try { return decodeURI(l); } catch { return l; } })();
      if (productRe.test(d)) productUrls.add(add(l)); else if (listRe.test(d) && !seen.has(add(l))) listQueue.push(l); }
    if (r.products.length > 1) r.products.forEach(p => p.url && products.set(add(p.url), Object.assign({ from: u }, p)));
  }
  console.log(`  crawled ${pagesDone} listing page(s), ${productUrls.size} product URL(s)`);
  // product pages
  for (const u of productUrls) {
    if ([...products.values()].filter(p => p.full).length >= MAX) break;
    if (products.has(u) && products.get(u).full) continue;
    const r = await visit(u); if (!r || !r.products.length) continue;
    const p = r.products[0]; p.full = true; p.crumbs = r.crumbs; p.url = u; p.category = p.category || r.gaCategory; p.brand = p.brand || r.gaBrand; products.set(u, p);
    if (products.size % 20 === 0) console.log(`  ${products.size} product(s)…`);
  }
  const list = [...products.values()].slice(0, MAX).map((p, i) => {
    const price = num(p.price), cats = p.category ? String(p.category).split(/\s*[>/|›]\s*/).filter(Boolean) : (p.crumbs || []).slice(1, -1);
    return { id: p.sku || i + 1, name: p.name, url: p.url, sku: p.sku || null, type: p.variants && p.variants.length ? 'variable' : 'simple',
      price, regular_price: price, sale_price: null, on_sale: false, currency: p.currency || null,
      in_stock: p.availability ? /InStock|LimitedAvailability|PreOrder/i.test(p.availability) : null, brand: p.brand || null,
      categories: cats, attributes: [], variations: (p.variants || []).map(v => ({ id: v.sku || v.name, sku: v.sku || null, price: num(v.price), attributes: { name: v.name } })),
      images: (p.image || []).map(s => ({ src: add(s) || s, alt: p.name })), description: excerpt(p.description), extracted_by: p.how };
  });
  return { method: 'html-crawl (' + [...new Set(list.map(p => p.extracted_by))].join(', ') + ')', currency: (list.find(p => p.currency) || {}).currency || null, charset, products: list };
}

let result = null;
console.log(`extract-catalog: ${base} (mode ${MODE}, max ${MAX})${warm ? ' · start ' + warm.status() : ''}`);
if (MODE === 'auto' || MODE === 'woo') { result = await viaWoo(); console.log('  woo store api:', result ? `${result.products.length} product(s)` : 'not available'); }
if ((!result || !result.products.length) && (MODE === 'auto' || MODE === 'shopify')) { result = await viaShopify(); console.log('  shopify products.json:', result ? `${result.products.length} product(s)` : 'not available'); }
if ((!result || !result.products.length) && (MODE === 'auto' || MODE === 'html')) result = await viaHtml();
await browser.close();

const products = (result && result.products) || [];
const doc = { source: base, method: result ? result.method : 'none', extracted_at: new Date().toISOString(), currency: result && result.currency,
  charset: result && result.charset || undefined, count: products.length,
  note: 'Real client data: names, prices and stock change; re-run before delivery. Images are hot-linked URLs: download the ones you use into site/img/ (with the client\'s permission).',
  products };
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(doc, null, 1));
const withPrice = products.filter(p => p.price != null).length, withImg = products.filter(p => p.images && p.images.length).length;
console.log(`→ ${OUT}: ${products.length} product(s) via ${doc.method}; ${withPrice} with price, ${withImg} with images, ${products.filter(p => p.variations && p.variations.length).length} with variations`);
if (!products.length) { console.log('  nothing found: pass --seed with category paths, or --mode html with a product URL as the start'); process.exitCode = 1; }
