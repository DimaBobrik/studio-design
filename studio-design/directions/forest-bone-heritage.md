---
name: forest-bone-heritage
title: Forest & Bone Heritage
tagline: "A ranger's field kit at dusk: deep forest canvas, bone-white slab lettering, contour lines and one amber lantern for the way forward."
axes: { paper_band: dark, display_style: slab, accent_hue: yellow, radius_system: soft, density: 5, variance: 5, motion: 5 }
fits: [ecommerce, company, landing]
subjects_good: [outdoor gear, wineries, farms, hunting/fishing, national parks, cabins/glamping, craft breweries, workwear, coffee roasters]
subjects_bad: [fintech, SaaS, fashion runway, kids' toys, nightlife]
neighbours: [herbarium, film-title-bands, estate-didone]
fonts: { display: "Zilla Slab 700 (Google)", body: "Libre Franklin 400", hebrew: ["Suez One", "Heebo"] }
---
# Forest & Bone Heritage
Specimen: _specimens/forest-bone-heritage.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Libre+Franklin:wght@400;500;600;800&family=Suez+One&family=Heebo:wght@400;500;700&display=swap">
*/
:root {
  --c-canvas: oklch(27% 0.050 155); --c-surface: oklch(32% 0.055 155); --c-surface-2: oklch(93% 0.018 95);
  --c-ink: oklch(93% 0.018 95); --c-ink-2: oklch(84% 0.022 95); --c-muted: oklch(72% 0.030 140);
  --c-rule: oklch(41% 0.050 155); --c-accent: oklch(75% 0.15 70); --c-accent-ink: oklch(20% 0.040 155);
  --c-focus: oklch(80% 0.15 75);
  --f-display: "Zilla Slab", "Suez One", Rockwell, serif; --f-body: "Libre Franklin", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Libre Franklin", sans-serif; /* 800 caps for stamps */
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.2rem);
  --fs-2xl: clamp(2.4rem, 1.7rem + 2.6vw, 3.8rem); --fs-3xl: clamp(3.1rem, 1.9rem + 4.6vw, 6rem);
  --fs-display: clamp(3.25rem, 1.3rem + 6vw, 7rem);
  --lh-tight: 1.0; --lh-body: 1.6; --tr-display: -0.015em; --tr-label: 0.1em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 36px; --sp-7: 56px; --sp-8: 88px; --sp-9: 132px; --sp-10: 192px;
  --section-y: clamp(72px, 7vw + 28px, 176px); --gutter: clamp(18px, 3vw, 48px); --maxw: 1400px;
  --r-sm: 4px; --r-md: 8px; --r-lg: 16px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --ease-in: cubic-bezier(0.55, 0, 1, 0.45); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 180ms; --d-med: 460ms; --d-slow: 1000ms;
  --shadow-1: 0 1px 0 oklch(100% 0 0 / 0.05) inset; --shadow-2: 0 28px 56px -28px oklch(10% 0.04 155 / 0.8);
}
[data-surface="bone"] { --c-canvas: var(--c-surface-2); --c-ink: oklch(24% 0.05 155); --c-ink-2: oklch(34% .05 155); --c-muted: oklch(46% .04 150); --c-rule: oklch(24% .05 155 / .2); }
:root[dir="rtl"] { --tr-display: 0; --tr-label: 0.02em; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Suez One", "Zilla Slab", Rockwell, serif; --f-body: "Heebo", "Libre Franklin", system-ui, sans-serif; }
```

## Essence
Deep forest canvas with bone-white type; bone panels invert for dense reading (product details, forms). A sturdy slab carries headlines; contour lines, stamped circular badges and map strokes carry the outdoors. One amber lantern colour for the primary path (CTA, route line, "in season"). Absent: neon, cream-and-terracotta, glossy 3D, thin fashion serifs.

## Signature moves
1. Contour field: `.bg-topo` in bone at 6% across the hero, slowly offset by scroll (parallax 0.1).
2. Stamped badge: circular text (real facts: "Est. 1987 · Galilee" only if true) rotating slowly on hover, Libre Franklin 800 caps 11px.
3. Route line: an SVG path in amber that draws from section to section (map/itinerary/process), `stroke-width: 2`.
4. Bone inversion panels (`data-surface="bone"`) for PDP details and forms, 16px radius.
5. Map hero (default since the 2026-09 specimen audit): the hero is a trail map, not a landscape: `.bg-topo` contour field in bone at 10–12% over forest, the amber route line drawn across it with 3–4 real waypoints (name + altitude), slab headline top-inline-start, one product on a canopy card at inline-end. A layered landscape (sky / ridge / foreground) reads as film-title-bands and atmospheric-sky at thumbnail size: use it only below the fold or in the footer.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| forest | oklch(27% .05 155) | canvas | black-green #0B1A12 |
| canopy | oklch(32% .055 155) | cards on forest | shadows as elevation |
| bone | oklch(93% .018 95) | type on forest, inverted panels | page canvas |
| amber | oklch(75% .15 70) | CTA, route line, seasonal tag | headings, backgrounds |

## Typography
Display Zilla Slab 700, lh 1.0, sentence case; H2 Zilla Slab 600. Body Libre Franklin 400 17px; stamps/labels Libre Franklin 800 caps +0.1em (only inside badges/tags). Ratio 1.414. Hebrew: Suez One display (serif-slab spirit, single weight), Heebo 400 body, labels Heebo 700 without tracking.
Hebrew weights: Suez One ships one weight (400) — use it at 400 (`font-synthesis: none` in core.css blocks faux bold); never ask for 700 in Hebrew.

## Layout
12-col, max 1400px. Hero: map hero 90dvh (topo field + amber route + waypoints), slab headline top-inline-start, stamped badge and one product card at inline-end; landscape photography starts in the second section. Sections: route/process with drawn amber line, product grid on canopy cards, a bone-panel story block, map section. Affinity: Photographic, Narrative Workflow, Map/Diagram, Catalogue. Rejects: Workbench, Stat-Led, Bento with 9 tiles.

## Components
- Nav: superscript index (N15, not the AI nav #33): wordmark slab at inline-start, links as large bone words with mono superscripts of real counts (Gear⁴² · Trails⁸ · Journal¹⁶), the amber route line runs under the current item; "Shop" is the cart word with its count. Transparent over hero, forest after.
- Footer: mast-headed with a contour background, address/hours (real), newsletter, badge.
- Buttons: 50px, radius 8px, amber fill forest text Libre Franklin 600; secondary bone outline 1.5px. Hover darkens amber 6% L.
- Cards: canopy surface radius 16px, padding 24px, 1px rule ring.
- Product card: 4:5 photo radius 8px, name Zilla Slab 600 1.25rem, spec line (weight, material) muted, price bone 600.

## Backgrounds
`.bg-topo` (bone 6%), `.bg-grain` 4%; shader-bg `grain-gradient` forest→canopy for footer.

## Motion (budget 5)
House ease `cubic-bezier(.22,1,.36,1)` 460ms. Signature: amber route line draws through the process section (DrawSVG-like dashoffset scrub). Allowed: `map` (real locations), `clip-reveal`, `hscroll` (trail/collection strip), `accordion`, `pdp`, `cart`, `counter` (real distances/altitudes). Not: marquee, cursor, magnetic, text scramble.

## Imagery
Golden-hour landscapes, gear in use, hands and materials (wax canvas, wood, leather), natural grade with lifted blacks. Never: studio white packshots only, stock hikers pointing at horizons, drone clichés with lens flares.

## RTL notes
Route line direction follows reading direction (draw from inline-start); badge circular text needs Hebrew string and rotation direction multiplied by `SD.dir()`. Coordinates/altitudes `dir="ltr"`.

## Do / Don't
- Do forest canvas with bone type; Don't flip to a bone page with forest accents (turns into generic cream).
- Do amber for the path; Don't use amber for headings.
- Do real stamps/dates; Don't invent "Since 1890".
- Do slab 600–700; Don't use slab for body.
- Do topo at ≤6%; Don't stack topo + grid + dots.
- Do bone panels for dense info; Don't put small text on topo.

## Palette drops
- Forest + amber (default). = `tokens.css` above (AA: ink/canvas 12.1 · ink-2/canvas 9.1 · muted/canvas 6.0 · muted/surface 5.1 · accent-ink/accent 7.8 · ink/surface 10.1)
- Desert night: canvas oklch(26% .04 45) umber, ink oklch(93% .02 85), accent oklch(72% .14 200) turquoise.
  Override: `--c-canvas: oklch(26% 0.04 45); --c-surface: oklch(31% 0.04 45); --c-surface-2: oklch(92% 0.018 45); --c-ink: oklch(93% 0.02 85); --c-ink-2: oklch(83.9% 0.02 85); --c-muted: oklch(67.9% 0.02 85); --c-rule: oklch(93% 0.02 85 / 0.16); --c-accent: oklch(72% 0.14 200); --c-accent-ink: oklch(26% 0.04 45); --c-focus: oklch(72% 0.14 200);`
  AA: ink/canvas 12.8 · ink-2/canvas 9.6 · muted/canvas 5.4 · muted/surface 4.6 · accent-ink/accent 6.9 · ink/surface 10.8
- Fjord: canvas oklch(28% .05 230), ink oklch(94% .012 220), accent oklch(78% .14 85).
  Override: `--c-canvas: oklch(28% 0.05 230); --c-surface: oklch(33% 0.05 230); --c-surface-2: oklch(94% 0.018 230); --c-ink: oklch(94% 0.012 220); --c-ink-2: oklch(85% 0.012 220); --c-muted: oklch(70.4% 0.012 220); --c-rule: oklch(94% 0.012 220 / 0.16); --c-accent: oklch(78% 0.14 85); --c-accent-ink: oklch(28% 0.05 230); --c-focus: oklch(78% 0.14 85);`
  AA: ink/canvas 12.2 · ink-2/canvas 9.2 · muted/canvas 5.5 · muted/surface 4.6 · accent-ink/accent 7.2 · ink/surface 10.2

## Knobs
Hero (map with route [default] / layered landscape below the fold / single still); badge on/off; route line on/off; bone-panel frequency; product grid 3/4-up; topo vs grain.
