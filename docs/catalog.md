# Catalog

The catalog is the skill's design vocabulary: **417 identified entries** across 8 files in `studio-design/catalog/`, plus the motion system. Every entry follows the same shape: *name · looks like · use when (site types, directions) · how (runtime module or CSS recipe) · knobs · perf/a11y/RTL notes*. Section rows also carry an **ACF sketch**, so each section becomes one ACF Flexible Content layout.

Page plans reference entries by id (for example "H-24 hero → F-05 stack → S-06 scroll-lit statement → CTA-03 → FT-02"). That keeps plans short and checkable, and it's how the "no archetype twice on a page" rule gets enforced.

## Overview

| File | Contents | Ids | Count |
|---|---|---|---|
| [`sections-hero-nav.md`](../studio-design/catalog/sections-hero-nav.md) | §0 page composition rules · §1 heroes · §2 navigation archetypes and effects | `H-01…H-29` · `N1a…N17`, `NV-FS…NV-DK` | 29 + 22 = **51** |
| [`sections-content.md`](../studio-design/catalog/sections-content.md) | Features/process, social proof, pricing, FAQ, CTA, gallery/portfolio, team/about/contact, stats, newsletter, case study | `F-` `S-` `P-` `Q-` `CTA-` `G-` `T-` `ST-` `NL-` `CS-` | **88** |
| [`sections-footer-wp.md`](../studio-design/catalog/sections-footer-wp.md) | §8 footers · §12 section → WordPress mapping convention | `Ft1…Ft8` archetypes, `FT-01…FT-05` effects | **13** |
| [`backgrounds.md`](../studio-design/catalog/backgrounds.md) | Background treatments in 3 cost tiers + section-level usage + an SVG elevation recipe | `A-01…A-48` + named ids (`A-sp`, `A-sph`, …) | **56** |
| [`widgets.md`](../studio-design/catalog/widgets.md) | Widgets and micro-interactions | `C-01…C-74` | **74** |
| [`ecommerce-plp-pdp.md`](../studio-design/catalog/ecommerce-plp-pdp.md) | Store rules, header, PLP grids, product cards, filters, quick view/search, PDP, commerce widgets | `HD-` `PL-` `PC-` `FL-` `SO-` `PG-` `QV-` `SR-` `WL-` `CP-` `PD-` `SA-` `SM-` `E-` | **94** |
| [`ecommerce-cart-account.md`](../studio-design/catalog/ecommerce-cart-account.md) | Cart, mini-cart, checkout, thank-you, account, states, badges, prices, trust, schema | `CT-` `CO-` `TY-` `AC-` `EM-` `LD-` `ER-` `BD-` `PR-` `TR-` | **41** |
| [`motion.md`](../studio-design/catalog/motion.md) | Principles, duration/easing tokens, motion a11y, never-animate list, reduced motion, RTL, Lenis boot, cleanup, GSAP pattern sheet, load choreography, page transitions, preloaders | `L1…L4`, `PL-A…PL-E` | 21 patterns · 4 + 5 |

## Sections: hero and navigation

**§0 composition rules** (checked on every page):

- no two sections of the same archetype on a page,
- every section is tagged with one of 11 layout families (`text`, `split`, `grid`, `bento`, `stack`, `track`, `list`, `media`, `loop`, `rail`, `disclosure`), and a page of n sections uses ≥ ceil(n/2) of them,
- zig-zag ≤ 2, marquee ≤ 1,
- one signature scroll moment per page, marked `SIG` in the plan.

**Heroes (29).** H-01…H-29 range from giant editorial type, scroll-scrubbed video and shader fields to an image sphere, mask expand (word → video), product-on-colour, shaped slideshow, infinite drag canvas, inline-image typography, film-title band, index/catalogue hero, object on plinth, dual split screen, cell-grid hero and a collage around a word. H-26/H-27 came from the 200-site mass scan and H-28/H-29 from the world-agency scan. Wireframe notation: `split[IMG | txt]`, `^` pinned, `<>` horizontal travel, `~` moving.

**Navigation (22).** Seventeen archetypes (N1a wordmark + 2 links, N3 floating chip, N4 side rail, N7 newspaper masthead, N10 edge-aligned minimal, N12 mega menu, N15 superscript index nav, N16 four-corner HUD, N17 edge-rotated wordmark …) plus 5 effect ids (NV-FS staggered full-screen menu, NV-IP image-preview menu, NV-CN card nav, NV-PI sliding pill indicator, NV-DK dock). The default steers **away** from N1a-style "wordmark + 4 links + CTA hairline bar".

## Sections: content (88)

| Group | Ids | Count |
|---|---|---|
| Features / benefits / process | F-01…F-17 | 17 |
| Social proof | S-01…S-12 | 12 |
| Pricing | P-01…P-07 | 7 |
| FAQ | Q-01…Q-04 | 4 |
| CTA | CTA-01…CTA-07 | 7 |
| Gallery / portfolio / content | G-01…G-15 | 15 |
| Team / about / contact | T-01…T-08 | 8 |
| Stats | ST-01…ST-04 | 4 |
| Newsletter | NL-01…NL-03 | 3 |
| Case study (agency pages) | CS-01…CS-11 | 11 |

The case-study group (CS-01…CS-11) encodes the measured anatomy of studio case pages: client name as H1, a meta strip, ~70% media by area, ≤450 words, real screens on tinted plates rather than device mockups, results only if they're real, and a next-project ending.

## Footers (13)

Eight footer archetypes (Ft1…Ft8: mast-headed, single inline line, dense colophon, statement sentence, letter close, newsletter-first, marquee …) and five footer effects (FT-01…FT-05: giant cropped wordmark, curtain reveal, cursor-lit outline wordmark, store mega footer, live info footer). The 4-column Product/Company/Resources/Legal footer is not a default. §12 holds the WordPress mapping convention (see [wordpress.md](wordpress.md)).

## Backgrounds (56)

| Tier | Cost | Count | Examples of what's covered |
|---|---|---|---|
| 0 | CSS / SVG, no JS | 20 | masked grid, dot matrix, hatch stripes, grain, paper texture, halftone, scanlines, topo lines, painterly landscape plate, pointer spotlight |
| 1 | Canvas2D / animated SVG / DOM-heavy; paused offscreen, frozen under reduced motion | 16 | flickering cell grid, particles, flow field, glyph field, dotted world map + arcs, video background, WebGL globe (`cobe`), code-built subject objects, image sphere backdrop |
| 2 | WebGL fragment shaders; one per page by default | 20 | mesh and grain gradients, god rays, ordered dithering, fluted glass (Paper Shaders via `shader-bg`), metaballs, caustics, live contours, designer-supplied scenes |

Hard limits before picking: one animated background per viewport; one tier-2 background per page (unless the motion budget is ≥ 8) and never behind more than 40 words of body copy; contrast is checked on the brightest frame (scrim if it fails); loops over 5 s get a pause control; every transactional store page (PLP, PDP, cart, checkout, account) stays tier 0. A pairing table maps direction feels to background families.

## Widgets (74)

| Group | Ids |
|---|---|
| C.1 Loops & marquees | C-01…C-04 |
| C.2 Scroll-driven | C-05…C-14, C-69…C-71 |
| C.3 Pointer / hover | C-15…C-25 |
| C.4 Text effects | C-26…C-34, C-72…C-74 |
| C.5 Media & comparison | C-35…C-39 |
| C.6 UI components with motion | C-40…C-54 |
| C.7 Buttons & micro-feedback | C-55…C-62 |
| C.8 Transitions & page-level | C-63…C-68 |

Recent additions from the 2026-10 scans include highlight-strip headlines (C-72), scribble-glyph wordmarks (C-73) and annotation layers over photos (C-74).

## E-commerce (135)

Designed to become a WooCommerce theme 1:1: every row names its template override and/or hook placement.

**`ecommerce-plp-pdp.md` (94)**:

- §0 store-wide rules: prices via `wc_price()`, ILS formatting, classic templates vs blocks,
- HD-01…07 header/announcement/mega menu,
- PL-01…08 listing grids,
- PC-01…15 product card physics (hairline flat, photo-is-the-card, hover swap + quick-add, inspection plate …),
- FL/SO/PG filters, sort and pagination (9),
- QV/SR/WL/CP quick view, search, wishlist, compare (7),
- PD/SA/SM: PDP gallery layouts, sticky add-to-cart and selling modules (19),
- the default buy-box order with its hooks,
- **E-01…E-29 commerce widgets** (the single source of truth for store widgets).

**`ecommerce-cart-account.md` (41)**:

- CT-01…06 cart and drawer, CO-01…03 checkout, TY-01 thank-you,
- AC-01…07 account,
- EM/LD/ER empty, loading and error states (9),
- BD/PR badges and price display (9),
- TR-01…06 trust elements (honest only),
- schema per store page.

## Motion

`motion.md` is the motion system rather than a list of effects:

- duration and easing tokens, one house ease per direction,
- motion accessibility and a never-animate list (layout properties, body paragraphs, form fields while typing, focus rings, the LCP element, anything flashing > 3 times/s, wheel hijacking),
- reduced-motion final states, RTL multipliers, Lenis config and boot, cleanup and ACF preview re-init,
- a **GSAP pattern sheet** with 21 snippets (batch reveal, pin + scrub story, horizontal track, sticky stack, SplitText lines, Flip morph, Draggable inertia, SVG draw, motion path, scramble, counter, context cleanup …),
- **4 page-load choreographies** (L1 editorial lines, L2 curtain + wordmark, L3 blur-in soft, L4 grid build; ≤ 1.4 s total, run once),
- cross-document View Transitions for WordPress page changes,
- **5 preloaders** (PL-A…PL-E), allowed only with real progress, on first visit, and with a heavy hero asset.

## Knobs

Every section archetype has **3 knobs** (e.g. N3 floating chip: position start/centre/end · blur solid/glass · shape pill/rounded rect). When an archetype repeats on another page or in another project, at least one knob changes and the plan records the delta. This keeps a reused pattern from looking reused.
