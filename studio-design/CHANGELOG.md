# studio-design changelog

## 1.3 — 2026-10-01 (agency study: ~110 agencies, ~880 scanned sites in total)
Overnight study of 108 web/design agencies (58 Israeli, 50 world): their own sites, ~900 listed case studies, 526 live client sites.

### Israel / Hebrew
- New `references/israel.md`: 321 Israeli sites (57 agency + 264 client), 122 Hebrew-first pages; tiers, Hebrew display measures (tier A median 88px vs local 58px, lh 0.9-1.0), Hebrew fonts actually used (Assistant, Heebo, Open Sans Hebrew, Rubik, Almoni, Ploni, Simpler…) with verified free Google substitutes, the local template look, RTL craft, Israeli e-commerce, 22 rules, store/landing/company skeletons. 13 IL case studies.
- `directions/_index.md`: verified free Hebrew pool (Gveret Levin, M PLUS 1p added), swaps. Attractors A14-A17 (Israeli local template, floating object stack, dark-purple Hebrew AI agency, Hebrew stack inflation).

### Agency own sites + case studies
- New `references/agency-sites.md`: 97 studio homes + 162 case pages measured (hero types, work-first order, word counts, media share 72% on tier A cases, meta strip, live links, KPIs, preloaders, IL vs world, 20 rules). 12 agency case studies.
- Catalog: G-13 showreel, G-14 project slices, G-15 colour-per-project slides; new §13 case study CS-01…CS-11. `pages/company.md`: agency Home variant, CM-06 work index variants A-D, CM-07 case study order + ACF meta group. Attractors A23-A25 (studio kit stacked, device-mockup case hero, agency home as sales brochure).

### SKILL.md
- File map: israel.md, agency-sites.md, agency-world.md; 88 case studies distilled from ~880 scanned sites; new modules; case-study planning rule; Israeli build rules; WebGL never a gate; enterprise brand colours; device mockups as fake chrome; theme.json mapping for WordPress.

### Directions (→ 33)
- New `kikar-heavy` (Hebrew-first heavy statement on a pale sheet: Noto Sans Hebrew 900 166-200px + Hubot Sans 900 wdth 115 for Latin, #e4e7ea sheet, built isometric objects, one magenta/orange/red field chapter, pill CTA; evidence: 5 Israeli studio and brand sites) and `work-wall-neutral` (accent-less studio wall, Schibsted Grotesk 500 only, 17→270px jump, client colour takes over each project field via `data-project` / `tone-shift`; evidence: 7 tier-A studio sites in Portugal, the US, the UK and the Netherlands).
- Specimens + LTR/RTL/mobile shots for both; `_specimens/_montage.py` rebuilds the montages; specimen index paper filter fixed (cold-chrome-luxury, desktop-y2k are `light` per their files).
- `_index.md`: table rows, reciprocal neighbours (swiss-signal-grid, billboard-type, organic-colour-block, architect-calm, whisper-studio, cell-ledger), Hebrew display rows + swaps, coverage recount, routing hints (agency, Israeli consumer finance, Hebrew-first). antipatterns #20: declared Hebrew lh/tracking exceptions for the two directions.

### World-agency client work
- 256 live client sites of 41 top world studios scanned and tiered (A 22 / B 117 / C 117, 57 never rendered). New `references/agency-world.md` (agency signature table, WordPress/Shopify-specialist lens, techniques with vanilla recipes, stats vs `patterns.md`); 15 new case studies.
- New runtime modules `tone-shift` (scroll colour chapters, opacity-only fixed layers), `travel` (protagonist object flies between slots), `scatter` (editorial scatter field with depth parallax and fly-in assembly); demos + README §3/§4.
- Catalog: C-70…C-74, G-12, ST-04, H-28, H-29, N17, PL-08, E-28, E-29, A-48, motion PL-E.
- Attractors A18-A22 (immersive gate, scroll-lit grey sentence, entry layer stack on store homes, corporate photo band + bottom-start two-liner, pastel UI-collage SaaS hero).

## 1.2 — 2026-09-30
Lessons from two real client builds (Hebrew WooCommerce stores: one with a client-fixed palette, one in a dark control-room direction).
- Fixed (critical): `split-reveal data-variant="colour"` ended words near-transparent with oklch tokens (GSAP cannot interpolate oklch/color-mix). New core helpers `SD.toRGB(color, el?)` / `SD.toRGBArray` (canvas normaliser, resolves `--token`, `var()`, `currentcolor`, color-mix); colour tweens go rgb → rgb and clear to the token. No other fx tweens colours (lathe/globe/shader-bg/device already resolve through a canvas).
- Selection: brief-fixed palette path (distance measured on display class, Hebrew display class, hero archetype, radius, motion instead of paper/accent); a prior stated preference may bypass the `fits` filter with a stated adaptation; hero_object rotation counts chosen runs only (`log-run.mjs show` prints the exclusion/penalty/hero sets).
- Hebrew pages render ≤3 families: every direction now has a `:root:where([lang="he"])` block where the Hebrew faces lead both stacks; estate-didone gets an explicit 3-family Hebrew recipe.
- `pdp`: Woo variation matrix (`data-variations`), unavailable/out-of-stock options, ATC states and low stock, `sd:pdp:change` carries `variation_id`; mosaic orphan fixed; fieldset separators without broken legends.
- `flip-grid`: several filter groups (AND across, OR within), `:where()` specificity, counts recede by colour, chip rows wrap or scroll inside themselves (no page overflow at 320/390).
- fx CSS tokenised: no `#fff`/caps/tracking literals; new optional tokens `--c-on-media`, `--c-media-bg`, `--c-media-scrim`, `--c-success`; mega-menu headings sentence case.
- New module `todo-links` (`#todo-<page>` → "not in this delivery" dialog, he/en). Cart `data-persist="true"` documented as the multi-page static default (removed in Woo).
- Catalog: PC-15 inspection plate (white-background photos in dark directions), palette-fixed client and real-catalogue rules. Cookie bar defaults to a slim bottom bar that never covers the hero CTA at 390x844.
- verify.mjs: decorative `aria-hidden`/presentation text excluded from contrast (counted in the message), H1 count only rendered H1s; README explains fixed headers and pin spacers in full-page shots.
- New `scripts/extract-catalog.mjs`: real catalogue → `data/catalog.json` via Woo Store API, Shopify, or a Chromium crawl of JSON-LD/microdata/og (WAF-tolerant, windows-1255 aware).

## 1.1 — 2026-09-30
- Mass scan: 170 more sites (203 total; tiers A 52 / B 92 / C 59). 18 new case studies (48 total), 200-site statistics at the top of `references/patterns.md`; SKILL.md non-negotiable numbers recalibrated.
- 3 new directions (cell-ledger, pantry-label, void-stage) → 31. Visual specimens for every direction (`directions/_specimens/`, LTR/RTL/mobile, montage).
- Fixed: Hebrew token overrides were silently ignored in all directions (`:where([dir=rtl])` → `:root[dir="rtl"]`); similar-looking direction pairs separated; 11 directions' navs redesigned away from the "AI nav".
- New attractors A9-A13 (centred sentence hero, inset media sheet, lifestyle film hero, giant wordmark, mono everywhere).
- New catalog rows: H-26/27, N15/16, F-17, S-12, G-10/11, P-07 (hardware one-time pricing).
- New runtime modules: `lathe` (turned objects in WebGL), `device` (box products in CSS 3D + dimensioned elevation). New tokens `--f-num`, `--f-brand`, `--img-*`, `--header-h`, `--lenis-lerp`.
- Rotation: logs record the shown trio and hero object; project + global logs; FNV-1a seed; `scripts/log-run.mjs`.
- verify.mjs: rendered-font per script, pin frames, pseudo-element overflow culprit, 320px reflow, placeholders in EN/HE, fewer false positives.
- Accessibility baked in: focus-not-obscured, no opacity-dimmed text, prefers-contrast / forced-colors, accessible names for animated text.

## 1.0 — 2026-09-30
- Initial skill: 28 directions, catalogs (backgrounds, sections, widgets, e-commerce, motion), full page sets (store / landing / company), 24 runtime modules, 30 reference case studies, antipatterns v2026-09, checklist, verify.mjs, scan.mjs, aggregate.py.
