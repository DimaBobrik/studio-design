# Research basis

studio-design's rules aren't taste statements. They're distilled from scans of real award-level and market sites, then measured, tiered and aggregated. This page covers the method, the sample, what is (and isn't) in this repository, and how to grow the skill with your own scans.

## The sample (~880 sites)

| Study | Sites | What was captured |
|---|---|---|
| Award-gallery scan | ~200 | ~170 gallery-listed sites (home only) + a 30-site deep scan (home + inner pages). Tiered A ~50 / B ~90 / C ~60. |
| Israeli market scan | ~320 | ~60 Israeli web/design agencies (home + case pages) and ~260 client sites they built; ~120 Hebrew-first home pages |
| World-agency client work | ~260 | Live client sites from the case pages of ~40 top world studios (WebGL-first, editorial/brand, product/enterprise, WordPress and Shopify specialists) |
| Agency / studio own sites | ~100 | ~100 studio homes + ~160 case-study pages |

The scans were captured in late September and early October 2026, at desktop 1440×900 and mobile 390×844.

## Method

1. **Scan** (`scripts/scan.mjs`, Playwright + Chromium with SwiftShader WebGL). Per page, it records computed-style extraction (typography by role, the biggest text, families, colours, gradients, radii, shadows, root CSS variables, libraries, section outline, header, layout metrics) plus a first-viewport shot, up to 10 scroll frames, a full page and a mobile full page.
2. **Look.** Every capture was viewed by eye on contact sheets of heroes and scroll frames, with full pages for a subset. Screenshots beat heuristics: the canvas you *see* overrides the extracted guess.
3. **Tier.** A = Site-of-the-Day level, B = good, C = template grade. Broken captures (bot walls, loaders, login walls, blank WebGL) are excluded from statistics.
4. **Aggregate** (`scripts/aggregate.py`, Python stdlib). Medians, quartiles and shares, split by site type and tier: display size, line-height, tracking, caps share, weights, families per site, body size, canvas band, accent count, radius system, shadows, section padding, libraries.
5. **Distil.** Numbers become rules (SKILL.md non-negotiables, direction tokens, catalog thresholds, `verify.mjs` checks). Recurring looks become directions. Looks that are everywhere become "current attractors".

Examples of what came out of it:

- Hero display median **64px** across all award sites and **76px** in tier A, at 1440. The largest text on the home page is ≥ 160px on 13% of sites; it's usually a chapter word, not the H1.
- **~54%** of award sites use **no saturated accent**, and about 80% use at most one.
- **4+ font families**: 3% of all award sites and **0 of 52** tier-A sites, against 15% of Israeli Hebrew pages (mostly widget fonts).
- Radius systems: 0 / soft / pill ≈ **29 / 47 / 23%**, so every system is common. Mixing them is the fault.
- The template card shadow appears on **under 2%** of ~180 sites.
- Tier-A Hebrew display median **88px**, against **58px** for the local template.
- Studio case pages: about **72%** media by area on tier A, with work in section 1–2 of the home page.

### Caveats (also stated in the files)

- Libraries detected as window globals (GSAP, three.js) are floors, because bundled builds hide them.
- Heuristics for display size, canvas and accent count come from computed styles and are cross-checked against screenshots.
- A client site may have been rebuilt since the agency's work.
- WebGL-only sites often render black headless; they're classified from scroll frames or dropped.
- The gallery list leans Shopify-heavy for e-commerce.

## What's in this repository and what isn't

**Included:**

- distilled rules and statistics (`references/patterns.md`, `israel.md`, `agency-sites.md`, `agency-world.md`),
- **88 anonymized case studies** (`references/cases/case-NN-<type>.md`: 47 company, 24 e-commerce, 17 landing),
- the scanning and aggregation tools.

**Not included:** screenshots, scan data, per-site rows, site names, domains, URLs, copy or assets of any scanned site.

Each case study names its subject only with a neutral descriptor ("a smart-ring wearable brand", "a Tel Aviv branding studio") and records measurable decisions: hero/nav/footer/section DNA with catalog ids, signature moves, tokens (sizes in px, hexes, radii, paddings, and fonts with free and Hebrew substitutes), motion, layout, imagery, page set, mobile, *steal / don't steal*, and ACF hints. Studios in `agency-world.md` appear as anonymous rows (W1…W41).

**Rules:** extract structure, never pixels. The studied sites' copy, images and code are never reused in client output.

## Ethics of scanning

- `scan.mjs` fetches `robots.txt` per origin and honours it for `User-agent: *` and `studio-design-scan`. Disallowed pages are skipped and logged; `--ignore-robots` exists but isn't the default.
- The user agent identifies itself (`studio-design-scan/1.1`).
- It's polite by default: one site per worker, sequential pages within a site, a jittered delay (4 s) between page loads, and concurrency ≤ 3.
- Scan only public marketing pages, never logged-in areas or checkout flows.
- Only structure is learned. Keep raw scans private; don't redistribute screenshots or assets.
- `extract-catalog.mjs` is only for **the client's own store**.

## Grow the skill with your own scans

```bash
npm i playwright && npx playwright install chromium

# 1. pick 10-30 references for a gap (a site type, a direction with few references, a new trend)
cat > sites.json <<'JSON'
[
  { "url": "https://www.example.com/", "type": "ecommerce", "style": "one-line description of the look",
    "why": "why it is a reference", "pages": ["https://www.example.com/shop/"] }
]
JSON

# 2. scan (re-run the same command to resume)
node studio-design/scripts/scan.mjs sites.json --out scan-out/

# 3. digest one site to write a case study (open its screenshots next to it)
python3 studio-design/scripts/aggregate.py scan-out --site <slug>

# 4. cross-site statistics, by type
python3 studio-design/scripts/aggregate.py scan-out --meta sites.json --by-type > stats.md
```

Then:

1. **Write an anonymized case study** in `references/cases/case-NN-<type>.md` in the existing format, and add its row to `references/_index.md`. Use a neutral descriptor and never the site's name, domain or copy.
2. **Refresh `references/patterns.md`**, keeping the previous numbers' date so drift stays visible.
3. **Promote findings:**
   - a look shared by 3+ fresh references that no direction covers → a new direction,
   - a look that's now everywhere (and in AI output) → a new "current attractor" in `antipatterns.md`, plus a `verify.mjs` heuristic if it's checkable,
   - a new effect seen on 2+ references → a catalog row (a "recipe, no module" until a runtime module exists).

Several scan directories can be aggregated together (`aggregate.py dirA dirB --meta a.json,b.json --overrides o1.json,o2.json --exclude-broken`). Corrections go in your own overrides file (`{slug: {"canvas": "dark", "broken": true}}`).

Contributions of new case studies are welcome under the anonymization rule. See [CONTRIBUTING.md](../CONTRIBUTING.md).
