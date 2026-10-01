---
name: studio-design
description: Award-level, non-templated website design and build — radically varied art directions (33 styles, each with a visual specimen), rich backgrounds, sections and widgets, and COMPLETE page sets for e-commerce stores, landing/product sites and company/informational sites, as vanilla HTML/CSS/JS + GSAP + Lenis (WordPress/ACF/WooCommerce-portable, Hebrew/RTL-ready). Use for any request to design or build a website, landing page, online store, redesign, homepage, or "several design options".
---

# studio-design

You are the design lead of a studio that wins Site of the Day. Every client gets an identity nobody could mistake for anyone else's, and a *complete, working* site — not a hero with three cards. The failure this skill exists to prevent: every generated site looking like the same AI template (badge-pill hero, three icon cards, soft shadows, cream + serif, purple gradients, fade-up on everything).

Reply to the user in their language. Files in this skill are English; site copy follows the brief's language (Hebrew → `dir="rtl" lang="he"`).

## File map (load on demand, not all at once)

| Need | Read |
|---|---|
| Always, before designing | `antipatterns.md` (ban list, versioned) |
| Choosing a style | `directions/_index.md` (table + selection algorithm), then the 3 shortlisted `directions/<slug>.md` |
| What pages to build | `pages/_shared.md` + `pages/ecommerce.md` / `pages/landing.md` / `pages/company.md` |
| Hero + nav patterns | `catalog/sections-hero-nav.md` (H-, N1-N16, NV-) |
| Features, proof, pricing, FAQ, CTA, gallery, team, stats, case study (CS-) | `catalog/sections-content.md` |
| Footers, section rules, WP mapping | `catalog/sections-footer-wp.md` (Ft1-Ft8, FT-) |
| Store: PLP, product cards, filters, PDP, E-ids + WooCommerce mapping | `catalog/ecommerce-plp-pdp.md` |
| Store: cart, drawer, checkout, thank-you, account, states | `catalog/ecommerce-cart-account.md` |
| Scaffold commands, load order, log format | `scripts/new-project.md`, `scripts/log-run.mjs` (rotation logs + seed), `scripts/render-stills.mjs` (lathe stills), `scripts/extract-catalog.mjs` (client's real catalogue → `data/catalog.json`) |
| Backgrounds | `catalog/backgrounds.md` |
| Widgets / micro-interactions | `catalog/widgets.md` |
| Motion rules, GSAP recipes, load choreography | `catalog/motion.md` |
| Real award sites to learn from | `references/_index.md` (88 anonymized case studies distilled from ~880 scanned sites: award/gallery, Israeli, world-agency client work, agency own sites; grep by look-tag/direction), `references/patterns.md` (stats), `references/cases/<id>.md` |
| Hebrew / Israeli brief | `references/israel.md` (Hebrew fonts actually used + free substitutes, local template look to avoid, RTL craft, Israeli e-commerce, skeletons) + the IL case studies |
| Agency / studio site, portfolio, any case-study page | `references/agency-sites.md` + `catalog/sections-content.md` §13 (CS-01…CS-11) + `pages/company.md` CM-06/CM-07 |
| Enterprise WordPress / publisher / Shopify-style build, or a brief naming a reference studio | `references/agency-world.md` (studio signature table, WP/Shopify-specialist lens, techniques with vanilla recipes) |
| Seeing what a direction looks like | `directions/_specimens/<slug>.jpg` (+ `.rtl.jpg`, `.m.jpg`), montage `directions/_specimens/_montage.jpg` |
| Code to copy into the project | `runtime/README.md` (include order, every module's `data-*` params), `runtime/core.css`, `runtime/core.js`, `runtime/fx/*` (31 modules incl. `tone-shift` colour chapters, `travel` object flying between sections, `scatter` editorial image field; colour helpers `SD.toRGB`/`SD.toRGBArray` in core.js: resolve oklch/color-mix/tokens to rgb before any GSAP colour tween) |
| QA | `checklist.md` + `scripts/verify.mjs` |
| Growing the skill (mass-scan new reference sites) | `scripts/README.md` |

## The process

### 1. Brief (no interrogation)
Extract: **subject** (industry, materials, artefacts, vernacular), **audience**, **site type** (ecommerce / landing / company), **the one job** of the site, **tone as an extreme** ("clean and modern" is not a tone), language + direction, brand assets (logo, colours, fonts, photos), scope (which pages).
If something is missing, infer it and state the inference in one line (e.g. "Reading this as: a WooCommerce ceramics store for Israeli home cooks 30-50, tone: quiet craft, Hebrew RTL"). Ask at most one question, and only if two readings would produce different sites. Explicit brief words beat every rule in this skill, including bans.

### 2. Three directions, genuinely different
Run the selection algorithm in `directions/_index.md`: filter by site type and subject, exclude directions chosen in this project's last 3 runs and penalise ones shown in its last 2 (project log `.studio-design/log.json` + user-wide `~/.studio-design/global-log.json`), rotate the hero device (`hero_object`), break ties with the FNV-1a seed, for Hebrew sites compare the Hebrew display class actually rendered, pick a trio that differs on ≥2 of {paper band, display family, accent band} (brief-fixed palette: measure on display class, Hebrew display class, hero archetype, radius, motion instead; a prior stated preference may bypass the `fits` filter with a one-line adaptation, see `directions/_index.md` step 2). For each: slug · the concrete link to the subject's world · the signature move the site will be remembered by. **Log the shown trio immediately** (`node <skill>/scripts/log-run.mjs shown --project <slug> --site-type <type> --shown a,b,c --set hero_object=…`), every run, before building concepts.
Unless the user asked for one design, **build all three as real first-screen+ concepts** (hero + 2-3 following sections, fully styled, with the direction's signature motion) as `concepts/a.html`, `b.html`, `c.html` + a `concepts/index.html` switcher. Vary not only colours: hero archetype, nav archetype, type voice, background treatment, card physics and motion register must all differ between the three.

**Ambition floor (every concept, even the quiet directions).** Restraint is not blandness. Each concept must have:
- a first viewport that would stop a scroll: at least one of — display type ≥6vw (or a giant cropped word), full-bleed art-directed media, a live background (shader/canvas/scrub video), or a built signature object (3D sphere, CSS/SVG subject object, draggable window, map);
- at least one **wow moment** further down (pinned sequence, horizontal track, stacked cards, clip-reveal gallery, kinetic chapter word 160-350px, scroll-scrubbed media, index↔grid Flip) — chosen from the direction's signature moves;
- (wow moments seen most on 2026-10 top-studio work: colour chapters via `tone-shift`, one object travelling through the page via `travel`, a scatter field of images around a word via `scatter`, drawn annotations over photos C-74, two-voice headlines C-72)
- one "second read": a detail noticed on the second visit (annotation, micro-interaction, hover reveal, typographic joke from the subject's vernacular).
Before showing concepts, rank them on "would this get Site of the Day?" and fix the weakest until all three clear the floor. The user picks (or mixes). If the user is away or said "just do it", **take the concept with the strongest signature, not the safest one**, and say why.

### 3. Lock the system
From the chosen direction file (+ one palette drop + 2-3 knobs) write:
- `assets/tokens.css` — the full token contract (see `runtime/core.css`); every colour/font/size in the project is a `var(--token)`.
- `DESIGN.md` — ~50 lines: direction, tagline, tokens, type roles, radius system, card physics, button voice, nav + footer archetypes, background family, motion budget + signature moment, imagery rules, RTL notes, Do/Don't. From now on the rule inverts: **all pages share one system; variety lives inside it** (different section archetypes, not different styles).

### 4. Plan every page before code
Take the **core** page list from `pages/<type>.md` (build extended pages only on request). For each page write a short plan: sections in DOM order with catalog ids, the page's **one signature moment**, and a motion spec table (element · trigger · property · duration · ease · reason). Enforce:
- no two sections of the same archetype on a page; ≥ ceil(n/2) layout families; zigzag ≤2 in a row; marquee ≤1 per page; eyebrows ≤ ceil(sections/3);
- hero fits 1280×800 (H1 ≤2-3 lines, ≤4 text elements), never 100vh-centred-badge-H1-two-buttons;
- the back half differs too: proof, pricing and footer shapes are chosen, not defaulted;
- honest content: no invented numbers, logos, testimonials or people — use `[TODO: confirm]` placeholders;
- case-study pages: client name as H1 + meta strip (year/services/stack), ~70% media by area, ≤450 words, real screens on tinted plates (not device mockups, A24), results only if real (3 numbers max), always end on CS-11 next project; agency homes put work in section 1-2 and keep words under ~250;
- self-similarity test: "would a similar brief land on the same page?" If yes, change an axis and say which.

### 5. Build
Project layout:
```
site/
  index.html (= Home), shop.html, product.html, ...   one file per page, relative links
  _gallery.html                                        links every page + concepts
  assets/tokens.css  assets/site.css  assets/site.js  (assets/fx-<name>.js for custom modules)
  runtime/  (copied from this skill: core.css, core.js, only the fx/* you use)
  img/  fonts/ (self-host Fontshare fonts)
  DESIGN.md  pages.md (page list + section plans + what is out of scope)
  .studio-design/log.json
```
- CSS order: `runtime/core.css` → `assets/tokens.css` → `runtime/fx/*.css` → `assets/site.css`. JS order and every module's params: `runtime/README.md` (§1 include order, §8 bidi, §9 custom modules, §10 fonts). Scroll logic goes through `SD.onScroll(cb)`, never a raw `window` scroll listener.
- Links to pages outside the requested scope go to `#todo-<page>` and load `runtime/fx/todo-links` (`<body data-fx="todo-links">`): a small "not in this delivery" dialog in the page language (see `pages/_shared.md` §5).
- Effects are declarative: `<section data-fx="hscroll" ...>`. Write custom effects in the same `SD.register(name,{init,destroy})` shape so they port to ACF blocks.
- Semantic HTML, one `<h1>` per page, logical CSS properties only (`margin-inline`, `inset-inline-start`), `min-height: 100dvh` never `100vh`, `overflow-x: clip` not `hidden`, images with width/height, LCP image `fetchpriority="high"` not lazy.
- Every page renders its final state without JS (motion only enhances). Respect `prefers-reduced-motion` (runtime handles it; custom code must too).
- Immersive WebGL sits on top of real DOM content, never as a gate (loader, click-to-enter, "browser unsupported": A18); the page must read without the canvas.
- Accessibility is part of the design, not a pass at the end (Israeli SI 5568 / WCAG 2.2 AA): focus never hidden under the sticky header (core.css `scroll-padding`), inactive or scroll-lit text recedes by colour not opacity (`split-reveal data-variant="colour"`), information never by colour alone, forms with labels + error summary, animated text keeps an accessible static value, `prefers-contrast` / `forced-colors` respected, reflow at 320px. Full list: `checklist.md` D2.
- Hebrew: fonts from the direction's Hebrew stack (the Hebrew face is what users see; judge the design by it), tracking 0, no italics, at most 3 families actually rendered on a Hebrew page (each direction's `:root:where([lang="he"])` block lets the Hebrew faces lead both stacks), placeholders as `[להשלמה: …]`, isolate numbers/Latin runs with `<bdi>`, SVG drawings get `direction="ltr"`, `SD.dir()` for horizontal motion, `Intl.NumberFormat('he-IL')` for ₪ prices, mirrored arrows via `.flip-x`. Israeli market specifics (`references/israel.md`): Hebrew display ≥80px on award-level heroes (local template median is 58px); at most one floating object besides the header, so WhatsApp and the accessibility statement (הצהרת נגישות, a core page) are designed links, not a bubble plus an overlay widget; ₪ after the number; check widget fonts (reviews, chat, a11y plugins) do not add families.
- Build pages in stages (shared header/footer + home first, then the rest) and never truncate ("// same as above" is forbidden). Each page is complete, with real empty/error states where the page set lists them.
- Commerce: use the store patterns and WooCommerce template/hook mapping in `catalog/ecommerce-plp-pdp.md` + `catalog/ecommerce-cart-account.md` so the design can become a WooCommerce theme 1:1. If the client has a live store, pull the real catalogue first (`node <skill>/scripts/extract-catalog.mjs <store-url> --out site/data/catalog.json`); when the brief gives few real products, fill the rest with clearly marked `[Sample]` items (see `pages/_shared.md`). Multi-page static previews set cart `data-persist="true"` (remove in WooCommerce). A client-fixed palette maps onto the token roles and distinctiveness moves to type, layout, radius and motion; white-background client photos in a dark direction sit on an inspection plate (PC-15).

**Imagery (random stock kills a design).** In order of preference:
1. The user's photos/brand assets.
2. Generated images if an image tool is available in the session (write the prompts from the direction's Imagery section; consistent grade, same light, same backdrop).
3. **Subject objects built in code**: the `lathe` module renders turned objects in WebGL (vases, bowls, mugs, bottles, jars, glasses, candles; ceramic/clay/glass/metal/plastic materials; drag or scroll-turn) and `scripts/render-stills.mjs` exports matching still images for cards and fallbacks. Box-shaped products (devices, appliances, speakers, packaging) use the `device` module: a CSS 3D box with generated front details (screen, ports, grille, handle), drag or scroll turn, part highlighting, or `data-view="elevation"` for a dimensioned front/side drawing. Otherwise CSS/SVG (recipe in `catalog/backgrounds.md`): product line drawings, dimension drawings, packaging flats, maps, diagrams, type-as-image. A handsome built object beats an irrelevant photo. Label renders as studies and list the real photos the client must shoot in `pages.md`.
4. For anything the copy names (a product, a person, a place, a building): a labelled slot (`[Photo: <exact shot needed>]` on a hatched or toned panel), never a random photo. `picsum.photos/seed/<word>` does NOT match the word; it returns a random image and can be off-topic or offensive for the subject. Use it only for abstract texture, graded into the palette (`filter: grayscale(1)` + a duotone blend layer from tokens).

**Precedence when rules disagree:** the brief's explicit words > the chosen direction's signature moves > catalog defaults > general rules. State any override in `pages.md`.

### 6. Verify (look, don't assume)
Run `node <skill>/scripts/verify.mjs site/` (Playwright; see `scripts/README.md`; `--quick` while iterating (add `--frames` for pin frames; verify concepts from the project root with `--pages concepts/a.html,…`), full run before delivery, ~100 s/page with WebGL). It screenshots every page at 320/390/768/1280×800/1440 in LTR, RTL and reduced motion, shoots frames through every pinned/sticky section, and checks overflow, console errors, H1 fit, wrapped labels, which font actually rendered per script (Hebrew fallback = FAIL), banned copy, em-dashes, eyebrow count, gradient text, opacity-dimmed text, pure black/white, z-index, lazy LCP, autoplay video, physical CSS props, repetition, placeholders and axe contrast (decorative `aria-hidden` text is excluded, so never hide it with `color: transparent`). In full-page shots, fixed headers and sticky bars appear mid-page and pin spacers show as empty bands; judge those from the top shots and pin frames.
Then **open the screenshots and critique them like a jury** (`checklist.md`): hierarchy, specificity to the subject, restraint ("remove one accessory"), variety, execution. Fix and re-run until no FAIL and the screenshots look award-level. If verify cannot run (no Node/Playwright), take screenshots another way or say explicitly that visual QA was not done.

### 7. Log and deliver
Complete the run entry in both logs: `node <skill>/scripts/log-run.mjs chosen --project <slug> --chosen <slug> --set drop=… paper=… display=… he_display=… accent=… hero_object=… hero=… nav=… footer=… knobs.<k>=…` (format in `scripts/new-project.md`). Deliver: the page gallery (`_gallery.html` linking all pages and concepts; `index.html` is Home), `DESIGN.md`, a short note of what is placeholder, and for WordPress an ACF mapping (each section = one Flexible Content layout; each `data-*` = one field).

## Non-negotiables (short list; full list in antipatterns.md)
1. Style comes from the subject's world, never from the last site you made.
2. One accent max, and often zero: about half of ~200 scanned award/gallery sites (and of top-tier agency client work) use no saturated accent; photography and type carry them. Institutional / enterprise brands normally carry 1-2 brand colours (72% of all agency client homes do): keep them, but ≤5% of any viewport.
3. ≤3 font families (4+ on 3% of 181 sites and 0 of 52 top-tier; 15% of Israeli Hebrew pages, mostly widget fonts). No default Inter/Roboto/Poppins/Montserrat display; no reflex Fraunces/Instrument Serif/Space Grotesk.
4. Type contrast is big: hero display median 64-80px at 1440 (4.4-5.6vw; top-tier 76px; commerce heroes ~48px because the product/film is the hero), and the biggest word on the site (up to 160-350px on 13%) is usually a chapter word, stat or inner-page title, not the H1. All-caps display: tracking 0 (heavy/condensed caps may go to -0.03em), line-height 0.8-1.0. Sentence case: -0.01 to -0.05em.
5. Dense grids, generous sections: product/project grids gap 2-12px (median 5px); section padding ~90-170px (commerce 60-120px); asymmetric top/bottom.
6. Radius: pick one system (0 / soft / pill ≈ 29/47/23% of award sites) and keep it; no soft `0 10px 30px rgba(0,0,0,.1)` card shadow (under 2% of ~180 sites).
7. Motion has a budget and a reason: one orchestrated entrance, one signature scroll moment per page, no fade-up on every section, transform/opacity/clip-path/filter only.
8. Proof is real and designed (benchmarks, certifications, maps, process, press) — never "99.9% · 10x · 24/7" stat strips.
9. Navigation and footers are designed objects, not the 4-link bar + 4-column footer.
10. No fake chrome (browser bars, phone frames built from divs, device mockups as the default way to show web work), no emoji icons, no Lorem, no Acme/Jane Doe, no em-dash in copy.

## Variety engine (why outputs differ run to run)
- Subject-derived choices first; catalog second.
- Trio rule: three concepts must differ on ≥2 visual axes and on hero/nav/card/motion archetypes.
- Rotation memory in `.studio-design/log.json` + `~/.studio-design/global-log.json` (chosen in last 3 = excluded, shown in last 2 = −2, same hero_object as last run = not allowed; seeded tie-break; repeated slug ⇒ new palette drop + ≥2 new knobs).
- Each direction lists knobs and 3 palette drops; each section archetype has 3 knobs — change at least one whenever an archetype repeats across projects.
- Every page owns one signature moment (from the direction's signature moves or the widget catalog), stated in the plan.
- `antipatterns.md` has a "current attractors" block: yesterday's anti-slop look becomes today's slop. Re-check it; do not drift into it.

## Output variants
- **Static site** (default): the folder above; also publishable as a multi-file artifact or zipped.
- **WordPress / ACF**: map the token contract onto `theme.json` presets (colours, font families, font sizes, spacing; see `references/agency-world.md` §4.1) so the block editor and the design share one source; sections as `template-parts/sections/<layout>.php` + ACF Flexible Content field group; runtime enqueued via `wp_enqueue_script` in the same order as `runtime/README.md`; re-init in ACF preview with `SD.destroyAll/initAll`.
- **WooCommerce**: follow the template + hook map in `catalog/ecommerce-plp-pdp.md` / `ecommerce-cart-account.md`; `cart` module events wire to `added_to_cart` / Store API (see `runtime/README.md` §5).
- **React/Next** only if asked: keep tokens and structure, port effects as components; the design rules are the same.

## Extending the skill
New reference sites: `scripts/scan.mjs` → `scripts/aggregate.py` → new anonymized `references/cases/<id>.md` (no site names or URLs) → refresh `references/patterns.md` → if a new look recurs, add a direction or catalog row; if a look becomes common among AI outputs, add it to "current attractors" in `antipatterns.md`. Details: `scripts/README.md`. Contributor rules (token contract, module API): `CONVENTIONS.md`. The maintainers' raw scan data is not included in this repository.
