# scripts

Tooling that runs on the user's machine (Node 18+ / Python 3.9+). Nothing here ships inside a client project.

| script | does | deps |
|---|---|---|
| `verify.mjs` | QA a generated project: screenshots (5 widths × LTR/RTL + reduced motion) and automated checks, report in markdown + JSON | `playwright` |
| `log-run.mjs` | rotation logs + seed: `seed`, `shown` (right after the trio is shown), `chosen`, `show` (directions/_index.md steps 4–8) | none |
| `render-stills.mjs` | render still images (WebP/PNG, any angle) of an `fx/lathe` object for fallbacks, thumbnails, OG images | `playwright` |
| `extract-catalog.mjs` | the client's real catalogue → `data/catalog.json` (Woo Store API → Shopify → JSON-LD/microdata crawl; handles WAF and windows-1255) | `playwright` |
| `scan.mjs` | mass-scan reference sites: screenshots + extracted design data per site | `playwright` |
| `aggregate.py` | digest one scan (for writing a reference case study) or cross-site statistics over one or several scan dirs (for `references/patterns.md`) | Python stdlib |

Install once (in the folder you run from, or any parent):
```bash
npm i playwright
npx playwright install chromium
```
`verify`, `scan` and `render-stills` launch Chromium with `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`, so WebGL
(shader-bg, globe) renders headless. When `HTTPS_PROXY` is set they add `--proxy-server=$HTTPS_PROXY
--proxy-bypass-list=127.0.0.1;localhost` (sandboxes); otherwise no proxy flags.

## verify.mjs — project QA

```bash
node scripts/verify.mjs ./site                                   # serve ./site, check every root *.html (not _*.html)
node scripts/verify.mjs ./site --pages index.html,shop.html,product.html --out qa/
node scripts/verify.mjs https://staging.example.co.il/ --pages /,/shop/,/cart/
node scripts/verify.mjs ./site --quick                           # 390 + 1440 only, no full-page shots, no pin frames (~20 s/page): use while iterating
node scripts/verify.mjs ./site --concurrency 3                   # full run, 3 pages in parallel (~100 s/page with WebGL, divided by 3)
node scripts/verify.mjs ./runtime --pages demo/marquee.html      # a runtime demo (serve runtime/, demos use ../core.js)
node scripts/verify.mjs ./site --pages concepts/a.html,concepts/b.html,concepts/c.html --quick --frames   # concepts: always from the project root
```
Options: `--widths 320,390,768,1280,1440` (default; 320 = reflow) · `--concurrency N` · `--no-pins` · `--frames` (pin frames in `--quick`) · `--no-rtl` · `--no-full` · `--no-axe` · `--settle 1200` (ms after load) ·
`--timeout 45000` · `--lint-runtime` (also lint `core.css` / `fx/*.css`, skipped by default).

A folder is served by a built-in static server with HTTP Range support (needed for `scrub-video` seeking; `python -m
http.server` has no Range). The RTL pass appends `?rtl=1` and checks `dir` after load (the runtime flips it when
`core.js` executes, or earlier with the `<head>` one-liner); only if the page never switched does the script re-load it
with `dir="rtl" lang="he"` forced before `DOMContentLoaded` and report `rtl-query` as a warning.

Output (`--out`, default `qa/`): `report.md`, `report.json`, and per page `<page>/<ltr|rtl>-<width>-top.jpg`,
`-full.jpg` (capped 14000 px), `ltr-1440-reduced-top.jpg/-full.jpg`. Exit code 1 if any check fails. Full run ≈ 50 s/page.

| check | where | status | source rule |
|---|---|---|---|
| console / page errors, failed same-origin requests | every load | fail | — |
| third-party font host failures (Fontshare/Google Fonts CORS or network) | every load | warn (self-host in `fonts/`) | — |
| horizontal overflow (document scroll, or element past the edge not clipped by an in-view ancestor; when only the document scrolls, pseudo-elements are bisected and the culprit `el::before/::after` is named) | every width × dir, incl. 320 (reflow 1.4.10) | fail | antipatterns #62 |
| missing same-origin script/stylesheet/font/image (404), or `core.js` referenced but `window.SD` absent (wrong relative path, e.g. a concept without `../runtime/`) | every load | fail | — |
| content clipped by `html/body { overflow-x: clip }` | every width × dir | warn | #62 |
| button / nav / CTA label wraps to 2+ lines (text-node line rects; icons ignored; opt out with `data-qa-allow-wrap` on intentionally stacked labels) | every width × dir | fail | #44 |
| H1 count counts only rendered H1s (not inside `[hidden]`, `display:none`, a closed `<dialog>` or `<template>`); hero H1 inside 1280×800 first viewport; H1 lines at 1280 (>2 warn) and 390 (>5 warn), measured on split lines when `split-reveal` hid the text nodes | 1280, 390 | fail / warn | #19, #36 |
| `loading="lazy"` image in the first viewport; LCP element lazy (PerformanceObserver, read right after load, before any scrolling) | all widths / 1440 | warn / fail | #63 |
| rendered font families vs the families declared in the page's `--f-display/-body/-mono/-outlier/-num/-brand` tokens (Hebrew fallbacks included); per-role breakdown (headings, body, UI, mono); default-banned fonts | 1440 LTR + RTL | warn only for undeclared families (or > 3 when no tokens) | #13, font ban list |
| `fonts-rendered`: face Chromium actually used per script (CDP `CSS.getPlatformFontsForNode` on Hebrew and Latin samples) | 1440 LTR + RTL | fail if Hebrew falls back to a system face while a Hebrew web font is declared | — |
| text dimmed by opacity at rest | 1440 | warn | motion.md §2b, WCAG 1.4.3 |
| visible placeholders `[TODO: …]`, `[להשלמה: …]`, `.todo` | 1440 | warn | pages/_shared.md §5.4 |
| pin frames: 5 shots through every ScrollTrigger pin / tall sticky wrapper (`ltr-1440-pin<k>-<i>.jpg`) | 1440 LTR | info | look at them |
| `transition: all` with non-zero duration | 1440 | fail | #53 |
| pure `#000`/`#fff` canvas, ink or ≥25%-viewport background | 1440 | warn | #3 |
| gradient text (`background-clip: text`) | 1440 | fail | #2 |
| `z-index` > 1000 | 1440 | warn | #64 |
| `<img>` without width+height in the authored HTML | 1440 | warn | #63 |
| autoplay `<video>` without `muted` + `playsinline` | 1440 | fail | #61 |
| physical CSS (`margin/padding/border-left/right`, `left:`/`right:`, `text-align/float: left/right`) in project CSS | inline `<style>` + same-origin sheets | warn | #66 |
| banned copy (lorem, Acme, Jane Doe, John Smith, Elevate, Seamless, Unleash, Supercharge, Empower, Revolutionize, Next-gen, Reimagine, Delve, Tapestry, "Where X meets Y", scroll cues) | body text | fail | #38, #39, #43 |
| em-dashes (any in headings/buttons/nav = fail; >3 in text = warn), `...` | body text | fail / warn | #23 |
| eyebrows (small tracked caps right above H1/H2) > ceil(sections/3) or consecutive; kickers above ≥75% of H3s | 1440 | warn | #17, A6 |
| accent hue clusters ≥5% of chromatic weight > 2 (images ignored) | 1440 | warn | #5 |
| sections with identical structural signature (same archetype twice) | 1440 | warn | #30 |
| axe-core WCAG 2 A/AA (colour-contrast samples with ratios); serious/critical = fail. Contrast nodes inside `[aria-hidden="true"]` or `role="presentation"/"none"` are dropped as incidental decorative text (WCAG 1.4.3) and counted in the message: keep decorative words (marquee duplicates, ghost numerals, outlined background words) `aria-hidden`, never `color: transparent` | 1440 LTR + RTL | fail / warn | #8 |
| reduced-motion load: console errors | 1440 LTR, `prefers-reduced-motion: reduce` | fail | #59 |

Heuristics, read with judgment: eyebrow/kicker detection, accent clustering, structural repetition and font detection
(per-glyph fallback such as Hebrew rendered by a Latin-only face is NOT detected: look at the `rtl-*` screenshots).
A direction may legitimately exceed a threshold (e.g. `inflatable-pop` sticker colour set, a declared outlier face):
note it in the plan and ignore the warning. Always look at the screenshots; the report is a floor, not the review.

**Reading full-page shots (`-full.jpg`)**: they are stitched by the browser at one scroll position, so (1) a `position: fixed`
header, sticky ATC bar, cookie bar or floating button appears once at the spot where it sat when the shot was taken, which
can be mid-page over unrelated content, and sticky elements may be drawn at their resting place; (2) every ScrollTrigger pin
leaves its spacer as an empty band of the pin's scroll length (a 300vh pin = a blank band 3 viewports tall); (3) scroll-
triggered reveals below the fold show their final state only because the script pre-scrolls. None of these is a layout bug:
judge headers, sticky bars and pinned scenes from the `-top.jpg` shots and the pin frames (`ltr-1440-pin<k>-<i>.jpg`), and
report a problem only when it is visible there.

## extract-catalog.mjs — the client's real catalogue

```bash
node scripts/extract-catalog.mjs https://store.example.co.il --out site/data/catalog.json --variations   # Woo Store API (+ each variation's price/stock)
node scripts/extract-catalog.mjs https://www.example.co.il --out site/data/catalog.json --max 120         # custom platform → sitemap + product pages
node scripts/extract-catalog.mjs https://shop.example.com --mode html --seed /category/cameras --max 40
```
Auto mode tries (1) the WooCommerce Store API `/wp-json/wc/store/v1/products?per_page=100&page=N`, (2) Shopify
`/products.json`, (3) an HTML crawl in Chromium: robots.txt/sitemaps + start page + category pages → product pages, read
from JSON-LD `Product`/`ItemList`/`@graph`, else schema.org microdata, else `og:type=product` meta; categories/brand fall
back to breadcrumbs, then GA4/Meta-pixel `item_category`/`item_brand`. A real browser (desktop Chrome UA, he-IL) passes most
WAF/Cloudflare checks that block curl, and decodes legacy charsets (windows-1255) from the page, so JSON is always UTF-8.
Output `data/catalog.json`: `{source, method, extracted_at, currency, count, products[]}` with `name, url, sku, type, price,
regular_price, sale_price, on_sale, currency, in_stock, categories[], attributes[], variations[], images[{src, alt}],
description` (≤ 280-char excerpt); prices are numbers in major units. A Woo product's `variations` (with `--variations`)
drop straight into `fx/pdp` `data-variations`. Tested on two real client stores: a WooCommerce shop (40 products, all with variations) and
a custom ASP shop (windows-1255, microdata + GA categories). Only for the client's own store; keep `--max`
modest; images are hot-link URLs: copy the ones you use into `site/img/` with permission. Re-run before delivery (prices move).

## scan.mjs — mass-scan reference sites

```bash
node scripts/scan.mjs sites.json --out scan-out/                 # 2 sites in parallel, home + up to 3 inner pages
node scripts/scan.mjs sites.json --out scan-out/ --concurrency 3 --no-inner
node scripts/scan.mjs sites.json --out scan-out/ --only example_com,example_org --force   # re-scan two sites
```
Options: `--concurrency N` (≤3, default 2) · `--no-inner` · `--force` (re-scan; default resumes by skipping sites with
`data.json`) · `--only slug,slug` · `--limit N` · `--delay 4000` (ms, jittered ±25%, between page loads of one site) ·
`--settle 9000` (ms after DOMContentLoaded, preloaders need it) · `--ignore-robots`.

Input JSON:
```json
[
  { "url": "https://www.example.com/", "type": "ecommerce", "style": "one-line description of the look",
    "why": "why it is a reference", "platform": "WordPress + WooCommerce + GSAP + Lenis",
    "pages": ["https://www.example.com/shop/", "https://www.example.com/product/x/", "https://www.example.com/about/"] }
]
```
`type` is `ecommerce | landing | company` (aggregate.py splits stats by it with `--meta`). Only `url` is required.

Output: `<out>/<slug>/data.json` (`{site, home, inner[], scannedAt}`), `d_hero.jpg`, `d_full.jpg`, `d_scroll_01..10.jpg`,
`m_full.jpg`, `page1..3/` (hero + full), and `<out>/scan.log`. Politeness: robots.txt is fetched per origin and honoured
for `User-agent: *` / `studio-design-scan` (disallowed pages are skipped and logged); the UA string ends in
`studio-design-scan/1.1`; one site per worker; pages of a site are sequential with a jittered delay. Scan only public
marketing pages, never logged-in areas or checkout flows.

## Pipeline: scan → aggregate → case studies → patterns → directions

1. **Pick sites.** 10-30 current award-level references for a gap (a site type, a direction with few references, a
   new trend). Write `sites.json` (above). Check `references/_index.md` first; don't re-scan what is there.
2. **Scan.** `node scripts/scan.mjs sites.json --out scan-out/`. Re-run the same command to resume after failures.
3. **Digest each site.** `python3 scripts/aggregate.py scan-out --site <slug>` prints a compact digest (type roles,
   big text, colours, radii, libraries, section outline). Open `d_hero.jpg`, `d_full.jpg`, `m_full.jpg` and the
   scroll frames next to it: screenshots beat heuristics (record the canvas you SEE; pass corrections with
   `--overrides my_overrides.json`, your own file of `{slug: {"canvas": …, "broken": true}}` corrections; the
   maintainers' raw scan data and override files are not included in this repository).
4. **Write / update a reference case study** `references/cases/<id>.md` in the same format as the existing ones, add the
   row to `references/_index.md`. Case studies are anonymized (a neutral descriptor, never the site's name, domain or
   copy) and describe measurable decisions (sizes, ratios, hexes, section order, motion), not adjectives.
5. **Refresh statistics.** `python3 scripts/aggregate.py scan-out [--meta sites.json] > /tmp/stats.md` (several scans at once: `aggregate.py dirA dirB --meta a.json,b.json --overrides o1.json,o2.json --exclude-broken --by-type [--sites <tier-A slugs>]`; rows with `"broken": true` in an override or no type data are dropped; families are also counted as superfamilies, box-shadows are classed none/ring/card/other) and fold the
   changed numbers (display size, line-height, families, accent count, radius system, section counts, library share)
   into `references/patterns.md`. Keep the previous numbers' date so drift is visible.
6. **Promote findings.**
   - A look that 3+ fresh references share and no direction covers → draft a new `directions/<slug>.md` (tokens + rules,
     same template) and add it to `directions/_index.md` with its neighbours.
   - A look that now appears everywhere (and in AI output) → add it to "Current attractors" in `antipatterns.md`
     (bump the version date) and, if it is checkable, a regex/heuristic in `verify.mjs`.
   - A new effect seen on 2+ references → catalog row (`catalog/*.md`, "recipe, no module" until a runtime module exists).

## render-stills.mjs — stills of code-built objects

```bash
node scripts/render-stills.mjs --runtime ./site/runtime --tokens ./site/assets/tokens.css --out ./site/img --name vase \
  --attrs 'data-preset=vase data-material=glazed-ceramic data-colors=--img-glaze-ash,--img-glaze-pool data-base=--img-clay data-seed=14' \
  --angles 0,90,180 --size 1000x1300            # → img/vase-000.webp, vase-090.webp, vase-180.webp
node scripts/render-stills.mjs --config stills.json --runtime ./site/runtime --tokens ./site/assets/tokens.css --out ./site/img
```
Pass the same `data-*` as the live element so the still matches; `--format png`, `--bg --c-canvas` for an opaque background
(default transparent), `--quality 0.9`. The angle-0 still is the `<img class="sd-lathe__fallback">` (width/height = size).

