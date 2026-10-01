---
name: index-mono-gallery
title: Index Mono Gallery
tagline: "A catalogue raisonné on gallery-wall grey: every object numbered for real, set in small mono, scattered across the wall at human scale."
axes: { paper_band: mid, display_style: mono+condensed, accent_hue: cool, radius_system: "0", density: 7, variance: 8, motion: 4 }
fits: [ecommerce, company]
subjects_good: [furniture editions, galleries, design objects, photographers, archives, vintage dealers, ceramics, independent publishers, architecture archives]
subjects_bad: [mass retail, kids, fitness, SaaS marketing, restaurants]
neighbours: [industrial-catalogue, architect-calm, swiss-signal-grid, cell-ledger]
fonts: { display: "IBM Plex Sans Condensed 500 (Google)", body: "IBM Plex Mono 400 (Google)", hebrew: ["IBM Plex Sans Hebrew", "Cousine"] }
---
# Index Mono Gallery
Specimen: _specimens/index-mono-gallery.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Hebrew:wght@400;500&family=Cousine:wght@400;700&display=swap">
*/
:root {
  --c-canvas: oklch(84% 0.005 80); --c-surface: oklch(88.5% 0.004 80); --c-surface-2: oklch(79% 0.006 80); /* true mid band (2026-09 specimen audit: 94.5% read as architect-calm white) */
  --c-ink: oklch(17% 0.005 80); --c-ink-2: oklch(29% 0.005 80); --c-muted: oklch(41% 0.005 80);
  --c-rule: oklch(17% 0.005 80 / 0.18); --c-accent: oklch(42% 0.16 255); --c-accent-ink: oklch(97% 0.003 80);
  --c-focus: oklch(42% 0.16 255);
  --f-display: "IBM Plex Sans Condensed", "IBM Plex Sans Hebrew", system-ui, sans-serif; --f-body: "IBM Plex Mono", "Cousine", ui-monospace, monospace;
  --f-mono: "IBM Plex Mono", "Cousine", monospace; --f-outlier: "IBM Plex Sans Condensed", sans-serif;
  --fs-xs: 0.75rem; --fs-sm: 0.8125rem; --fs-base: 0.9375rem; --fs-lg: 1.0625rem; --fs-xl: 1.375rem; /* labels ≥12px, mono body 15px (antipatterns #22) */
  --fs-2xl: clamp(1.75rem, 1.4rem + 1.2vw, 2.4rem); --fs-3xl: clamp(2.2rem, 1.6rem + 2.4vw, 3.4rem);
  --fs-display: clamp(2.4rem, 1.5rem + 3.2vw, 4.25rem); /* small on purpose */
  --lh-tight: 1.0; --lh-body: 1.55; --tr-display: -0.015em; --tr-label: 0;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 56px; --sp-8: 96px; --sp-9: 160px; --sp-10: 240px;
  --section-y: clamp(64px, 6vw + 24px, 160px); --gutter: clamp(12px, 1.6vw, 24px); --maxw: 1800px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px;
  --ease-out: cubic-bezier(0.4, 0, 0, 1); --ease-in: cubic-bezier(0.6, 0, 1, 1); --ease-in-out: cubic-bezier(0.6, 0, 0.2, 1);
  --d-fast: 100ms; --d-med: 300ms; --d-slow: 700ms;
  --shadow-1: none; --shadow-2: none;
}
:root[dir="rtl"] { --tr-display: 0; --fs-base: 1rem; } /* Cousine Hebrew needs +1px */
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "IBM Plex Sans Hebrew", "IBM Plex Sans Condensed", system-ui, sans-serif; --f-body: "Cousine", "IBM Plex Mono", ui-monospace, monospace; }
```

## Essence
A gallery wall, not a store: warm-grey wall colour, objects photographed on the same grey so they sit "on the wall", and a scattered grid where each item occupies a different column span and vertical offset. All UI is small IBM Plex Mono; titles use a condensed sans at modest sizes. Every item carries a real catalogue number (M_013 style only if the client's SKUs are like that) and dimensions. One archival blue marks the active filter and links. Absent: big hero headlines, CTAs everywhere, cards, badges, fake clocks/coordinates.

## Signature moves
1. Scattered grid: 12-col grid with `grid-column` spans 2–5 and `margin-block-start` offsets from a fixed set (0, 48, 120, 200px), defined per item index so it never looks random-broken.
2. Index view toggle: the same collection as (a) wall and (b) numbered list (number · name · designer · year · dimensions · status) via `flip-grid`.
3. Hover preview: in list view, `cursor` module floats the object image near the pointer (desktop only).
4. Counters for collection size and filters use real counts ("Seating 014").
5. PDP as a museum label: small mono block beside a large image; dimensions drawing (SVG, 1px) as the second image.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| wall grey | oklch(84% .005 80) | canvas and photo backdrop (a real mid-grey wall) | pure white, near-white |
| plinth | oklch(79% .006 80) | image plates for objects not shot on grey | cards |
| ink | oklch(19% .005 80) | text | coloured text |
| archival blue | oklch(42% .16 255) | active filter, links, cart count | backgrounds, buttons en masse |

## Typography
Display IBM Plex Sans Condensed 500, max 4.25rem (the objects are the heroes). UI/body IBM Plex Mono 400 15px/1.55 (labels and meta ≥12px, never smaller; descriptions 15px). Numbers tabular. Ratio 1.25 with a small ceiling. Hebrew: IBM Plex Sans Hebrew 500 display (same superfamily), Cousine 400 for mono UI (Plex Mono lacks Hebrew).
Weight-contrast exception (antipatterns #14): condensed sans display against a mono body; classification contrast, deliberately modest sizes.

## Layout
12-col, max 1800px, tight gutters. Hero: small H1, the index is the hero: a one-line H1 (condensed, ≤ `--fs-2xl`) naming the collection, then filters, and the wall starts inside the first viewport (the H1 still fits 1280×800 with the first row of objects). Sections: wall (collection), about as a short mono text + portrait, editions/news index list, contact/visit with real address and opening hours. Affinity: Index-First, Catalogue, Portfolio Grid (scattered). Rejects: Marquee Hero, Manifesto, Stat-Led, Bento.

## Components
- Nav: edge-aligned mono (name · Collection · Index · About · Cart 02), 48px, no background.
- Footer: inline single line (address · hours · email · instagram · legal) in mono.
- Buttons: text buttons in mono with 1px underline; "Add to cart" = 44px ink fill, mono 15px; "Enquire" for unpriced items.
- Cards: none.
- Product card: image on wall grey (object ratio preserved, no crop), below: `014` · name · price or "Enquire"; hover shows dimensions.

## Backgrounds
Flat wall grey. No textures (objects must look photographed on this wall).

## Motion (budget 4)
House ease `cubic-bezier(.4,0,0,1)` 300ms; Lenis lerp 0.12. Signature: wall ↔ index toggle with `flip-grid` (items fly between layouts, 700ms). Allowed: `flip-grid`, `cursor` (`data-variant="trail"`; single index preview = recipe), `flip-grid` `data-counts` (filter counts; `counter` for real stats), `quickview`, `pdp`, `cart`, `clip-reveal` (images fade-wipe once). Not: marquee, split-reveal, shader-bg, magnetic, parallax.

## Imagery
Objects shot on the exact wall grey (or cut out and placed on it), soft top light, consistent camera height; ratio follows the object. Never: lifestyle rooms as primary images, dramatic shadows, colour grading that shifts the grey.

## RTL notes
Scattered offsets mirror through logical placement; numbers, dimensions, prices `dir="ltr"`; list columns reorder with direction; Cousine renders Hebrew mono UI.

## Do / Don't
- Do real catalogue numbers; Don't invent "M_013" codes the client doesn't use.
- Do show opening hours only if real; Don't add a decorative live clock or coordinates.
- Do small display; Don't make a poster headline.
- Do photograph on wall grey; Don't mix white-background packshots.
- Do mono body 15px and labels ≥12px; Don't drop to 10–11px anywhere.
- Do a deterministic offset set; Don't randomise positions per load.

## Palette drops
- Wall grey + archival blue (default). = `tokens.css` above (AA: ink/canvas 11.7 · ink-2/canvas 8.6 · muted/canvas 5.4 · muted/surface 6.3 · accent-ink/accent 7.8 · ink/surface 13.5 · accent/canvas 5.2). Before 2026-09 the canvas was oklch(94.5% .004 80) (light band, not mid); use that value only as a knob ("pale wall") and never next to architect-calm.
- Black gallery: canvas oklch(17% .004 80), ink oklch(93% .004 80), accent oklch(75% .12 85).
  Override: `--c-canvas: oklch(17% 0.004 80); --c-surface: oklch(21.5% 0.004 80); --c-surface-2: oklch(26% 0.004 80); --c-ink: oklch(93% 0.004 80); --c-ink-2: oklch(79.3% 0.004 80); --c-muted: oklch(60.9% 0.004 80); --c-rule: oklch(93% 0.004 80 / 0.16); --c-accent: oklch(75% 0.12 85); --c-accent-ink: oklch(17% 0.004 80); --c-focus: oklch(75% 0.12 85);`
  AA: ink/canvas 15.6 · ink-2/canvas 10.0 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 8.5 · ink/surface 14.3
- Bone archive (use only with strong mono discipline): canvas oklch(93% .012 95), ink oklch(22% .01 60), accent oklch(50% .15 150) green.
  Override: `--c-canvas: oklch(93% 0.012 95); --c-surface: oklch(95.5% 0.012 95); --c-surface-2: oklch(88.5% 0.012 95); --c-ink: oklch(22% 0.01 60); --c-ink-2: oklch(36.1% 0.01 60); --c-muted: oklch(51.4% 0.01 60); --c-rule: oklch(22% 0.01 60 / 0.16); --c-accent: oklch(50% 0.15 150); --c-accent-ink: oklch(93% 0.012 95); --c-focus: oklch(50% 0.15 150);`
  AA: ink/canvas 14.1 · ink-2/canvas 8.8 · muted/canvas 4.6 · muted/surface 5.0 · accent-ink/accent 4.5 · ink/surface 15.2

## Knobs
Default view (wall / index); offset set amplitude; image scale (human-scale / small); counts shown/hidden; enquire vs price; display font condensed vs mono-only.
