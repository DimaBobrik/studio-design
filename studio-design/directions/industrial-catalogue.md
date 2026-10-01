---
name: industrial-catalogue
title: Industrial Catalogue
tagline: "A factory parts catalogue under even studio light: the product is the only rich object, everything else is a thin grey whisper in 1px cells."
axes: { paper_band: light, display_style: thin-grotesk, accent_hue: yellow, radius_system: "0", density: 7, variance: 4, motion: 2 }
fits: [ecommerce, company]
subjects_good: [audio hardware, tools, furniture objects, design electronics, bikes and parts, B2B catalogues, packaging suppliers]
subjects_bad: [fashion campaigns, restaurants, wellness, kids, events]
neighbours: [swiss-signal-grid, index-mono-gallery, machined-soft, cell-ledger]
fonts: { display: "Switzer 200/300 (Fontshare)", body: "Switzer 400", mono: "Azeret Mono (Google)", hebrew: ["Assistant"] }
fallback: { display: "Public Sans 200/300 (Google)", body: "Public Sans 400" }  # nearest free Google face if Fontshare is not self-hosted
---
# Industrial Catalogue
Specimen: _specimens/industrial-catalogue.html

## tokens.css
```css
/* fonts (Fontshare: one family per link):
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@200,300,400,500&display=swap">
<!-- Google fallback (used when Fontshare is not self-hosted; self-host Fontshare in fonts/ for production, see _index.md): -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@200..500&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500&family=Assistant:wght@200..800&display=swap">
*/
:root {
  --c-canvas: oklch(96.6% 0.003 160); --c-surface: oklch(99% 0.002 160); --c-surface-2: oklch(93% 0.004 160);
  --c-ink: oklch(19% 0.006 160); --c-ink-2: oklch(38% 0.006 160); --c-muted: oklch(53.8% 0.005 160);
  --c-rule: oklch(88% 0.004 160); --c-accent: oklch(79% 0.165 72); --c-accent-ink: oklch(19% 0.006 160);
  --c-focus: oklch(62% 0.17 60);
  --f-display: "Switzer", "Public Sans", "Assistant", system-ui, sans-serif; --f-body: "Switzer", "Public Sans", "Assistant", system-ui, sans-serif;
  --f-mono: "Azeret Mono", "Assistant", ui-monospace, monospace; --f-outlier: "Azeret Mono", monospace;
  --fs-xs: 0.75rem; /* ≥12px */ --fs-sm: 0.8125rem; --fs-base: 0.9375rem; --fs-lg: 1.125rem; --fs-xl: 1.5rem;
  --fs-2xl: clamp(1.9rem, 1.5rem + 1.6vw, 2.75rem); --fs-3xl: clamp(2.5rem, 1.6rem + 3.2vw, 4.25rem);
  --fs-display: clamp(2.75rem, 1.4rem + 5vw, 5.75rem);
  --lh-tight: 1.0; --lh-body: 1.5; --tr-display: -0.03em; --tr-label: 0.02em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 20px; --sp-6: 24px; --sp-7: 32px; --sp-8: 48px; --sp-9: 72px; --sp-10: 112px;
  --section-y: clamp(48px, 4vw + 24px, 104px); --gutter: clamp(16px, 2vw, 28px); --maxw: 1680px; /* cell gaps are 1px via grid gap, not --gutter */
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px; /* square "pills"; modules that need a true circle (cursor, swatches, avatars, close/toggle buttons) use 50% literals */
  --ease-out: cubic-bezier(0.25, 0, 0, 1); --ease-in: cubic-bezier(0.5, 0, 1, 1); --ease-in-out: cubic-bezier(0.5, 0, 0.5, 1);
  --d-fast: 80ms; --d-med: 160ms; --d-slow: 280ms;
  --shadow-1: none; --shadow-2: 0 0 0 1px var(--c-rule);
}
:root[dir="rtl"] { --f-display: "Assistant", "Switzer", "Public Sans", sans-serif; --tr-display: 0; }
/* dark band for one spec section: [data-band="dark"]{--c-canvas:oklch(15% .02 295);--c-ink:oklch(94% .004 295);--c-rule:oklch(28% .02 295)} */
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Assistant", "Switzer", "Public Sans", system-ui, sans-serif; --f-body: "Assistant", "Switzer", "Public Sans", system-ui, sans-serif; }
```

## Essence
A catalogue, not a campaign. Light grey canvas, white cells separated by 1px rules (grid `gap:1px` on the rule colour), product photographed edge-to-edge in each cell. Type is thin (200–300) and small; the product carries all visual weight. One amber state colour (in stock, selected, added). Absent: shadows, gradients, radius, big headlines over photos, lifestyle copy.

## Signature moves
1. Pictogram navigation tiles: the category nav is a row/grid of 1:1 cells with 1.5px line icons + 12px label, not a text menu.
2. Product fills its cell with zero padding; name and price sit in a 40px strip under it separated by a 1px rule.
3. Specs as a two-column mono sheet (Azeret Mono 12px) with SKU codes that come from real data.
4. Hover = instant image swap (second angle), no scale, no fade longer than 80ms.
5. Line-comic illustration (1.5px ink strokes, no fills) for how-to / empty states.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| canvas | oklch(96.6% .003 160) | grid background = rule gaps | coloured sections |
| cell | oklch(99% .002 160) | every cell/product plate | gradients |
| ink | oklch(19% .006 160) | text, icons | large display floods |
| amber | oklch(79% .165 72) | state: in stock dot, selected, cart count | decoration, CTA wash |
| dark band | oklch(15% .02 295) | max one spec/feature band per page | whole page |

## Typography
Display Switzer 200 at `--fs-display`, tracking -0.03em, sentence case; H2 Switzer 300; body Switzer 400 15px (small is intentional; never below 14px for paragraphs). Mono Azeret 400 for SKU, dimensions, prices. Ratio 1.25. Hebrew: Assistant 200 display / 400 body; set Hebrew display one step larger than Latin because Assistant 200 reads lighter.
Weight-contrast exception (antipatterns #14): inverted by design: thin 200/300 display against 400 body; hierarchy by size ≥4× and cell structure.

## Layout
Full-bleed 12-col cell grid with 1px gaps, max 1680px. Hero = one product cell spanning 8 cols + 4 stacked info cells (name, price, 3 specs, buy). Sections are cell grids of different spans (3-up, 4-up, 1+2). Affinity: Catalogue, Workbench, Component Playground, Index-First. Rejects: Manifesto, Photographic full-bleed, Marquee Hero.

## Components
- Nav: pictogram tile row (N-tiles) + tiny wordmark; cart as a cell with a mono count.
- Footer: index columns inside cells, 12px; legal line in mono.
- Buttons: full-cell buttons (the whole cell is the button), ink fill, sheet text, 0 radius, 56px; secondary = cell with 1px ink outline.
- Cards: cells; physics = hairline-flat.
- Product card: 1:1 image, name 13px 500, price mono right-aligned, stock amber dot 6px; micro-action "Add" appears as the price strip turning ink.
- PDP: `pdp` module; gallery as vertical cell stack, sticky spec column, exploded-view diagram if available.

## Backgrounds
None beyond the rule-coloured canvas. Optional `.bg-dots` (12px, 6% ink) inside empty cells only.

## Motion (budget 2)
Near-instant. House ease `cubic-bezier(.25,0,0,1)` 160ms. Signature moment: filtering re-flows the cell grid with `flip-grid` (160ms, no stagger). Allowed fx: `flip-grid`, `quickview`, `cart`, `pdp`, `accordion`, `nav`. Banned here: split-reveal, marquee, cursor, shader-bg, smooth-scroll inertia above lerp 0.14.

## Imagery
Studio-lit product on seamless light grey matching the cell colour (#F3F4F3 to #F8F8F8), orthographic front/side/top, 1:1. Hero cell: prefer a rectilinear view (side or 3/4 of a box-shaped product, or a row of parts); a face-on round object (woofer, dial) centred in a white cell reads as machined-soft's device macro at thumbnail size (2026-09 specimen audit). Line-comic illustrations. Never: models, outdoor lifestyle, dramatic shadows.

## RTL notes
Cell order mirrors automatically; pictogram icons with direction (arrows, plugs) flip via `transform: scaleX(var(--dir))`; SKU and dimensions stay `dir="ltr"`.

## Do / Don't
- Do let product photos touch cell edges; Don't pad images inside cards.
- Do use weights 200/400 only; Don't use 600+ anywhere except the cart count.
- Do show real specs in mono; Don't invent SKUs.
- Do keep amber for state; Don't use it for a CTA fill.
- Do keep one dark band max; Don't alternate light/dark sections.
- Do keep type ≤ 5.75rem; Don't make a poster hero.

## Palette drops
- Amber state (default). = `tokens.css` above (AA: ink/canvas 16.7 · ink-2/canvas 9.1 · muted/canvas 4.6 · muted/surface 5.0 · accent-ink/accent 9.3 · ink/surface 17.9)
- Signal orange state oklch(66% .19 42) with canvas oklch(95% .003 250).
  Override: `--c-canvas: oklch(95% 0.003 250); --c-surface: oklch(97.4% 0.003 250); --c-surface-2: oklch(91.4% 0.003 250); --c-ink: oklch(19% 0.006 160); --c-ink-2: oklch(37.6% 0.006 160); --c-muted: oklch(52.7% 0.006 160); --c-rule: oklch(19% 0.006 160 / 0.16); --c-accent: oklch(66% 0.19 42); --c-accent-ink: oklch(19% 0.006 160); --c-focus: oklch(19% 0.006 160);`
  AA: ink/canvas 15.9 · ink-2/canvas 8.8 · muted/canvas 4.6 · muted/surface 4.9 · accent-ink/accent 5.5 · ink/surface 17.1; accent/canvas 2.9 (<3: accent is a fill/surface colour, not text or UI line)
- Night catalogue: canvas oklch(14% .015 295), cell oklch(18% .015 295), ink oklch(94% .004 295), state oklch(82% .15 85).
  Override: `--c-canvas: oklch(14% 0.015 295); --c-surface: oklch(18% 0.015 295); --c-surface-2: oklch(23% 0.015 295); --c-ink: oklch(94% 0.004 295); --c-ink-2: oklch(79.6% 0.004 295); --c-muted: oklch(59.2% 0.004 295); --c-rule: oklch(94% 0.004 295 / 0.16); --c-accent: oklch(82% 0.15 85); --c-accent-ink: oklch(14% 0.015 295); --c-focus: oklch(82% 0.15 85);`
  AA: ink/canvas 16.7 · ink-2/canvas 10.5 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 11.3 · ink/surface 15.8

## Knobs
Grid density (3/4/5-up); dark band on/off; pictogram nav vs text index; image ratio (1:1 / 4:5); mono prices on/off; spec sheet vs exploded diagram.
