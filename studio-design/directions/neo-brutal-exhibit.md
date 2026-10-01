---
name: neo-brutal-exhibit
title: Neo-Brutal Exhibit
tagline: "A science-museum exhibit hall painted one deep green: white placards with thick black borders, hard block shadows that lift when you touch them."
axes: { paper_band: field, display_style: condensed-caps, accent_hue: green, radius_system: "0", density: 6, variance: 7, motion: 6 }
fits: [landing, company, ecommerce]
subjects_good: [museums, edtech, kids' science, gamified campaigns, hackathons, coding schools, board-game shops, makerspaces]
subjects_bad: [luxury, wellness, law, fine dining, real estate]
neighbours: [billboard-type, inflatable-pop, desktop-y2k]
fonts: { display: "Oswald 700 (Google)", body: "Rubik 400 (Google, native Hebrew)", hebrew: ["Heebo", "Rubik"] }
---
# Neo-Brutal Exhibit
Specimen: _specimens/neo-brutal-exhibit.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500..700&family=Rubik:wght@400..800&family=Heebo:wght@800;900&display=swap">
*/
:root {
  --c-canvas: oklch(41% 0.12 152); --c-surface: oklch(98% 0.010 150); --c-surface-2: oklch(38% 0.22 265);
  --c-ink: oklch(97% 0.012 150); /* text directly on the green field */
  --c-ink-2: oklch(90% 0.030 150); --c-muted: oklch(82% 0.050 150);
  --c-rule: oklch(15% 0.020 150); --c-accent: oklch(68% 0.25 355); --c-accent-ink: oklch(15% 0.020 150);
  --c-focus: oklch(90% 0.18 100);
  --f-display: "Oswald", "Heebo", Impact, sans-serif; --f-body: "Rubik", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Oswald", sans-serif;
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.0625rem; --fs-lg: 1.3rem; --fs-xl: clamp(1.7rem, 1.4rem + 1.2vw, 2.4rem);
  --fs-2xl: clamp(2.4rem, 1.6rem + 3vw, 4.25rem); --fs-3xl: clamp(3.25rem, 2rem + 5vw, 7rem);
  --fs-display: clamp(3.5rem, 1rem + 8vw, 8.5rem);
  --lh-tight: 1.0; --lh-body: 1.5; --tr-display: 0; --tr-label: 0.04em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 72px; --sp-9: 104px; --sp-10: 152px;
  --section-y: clamp(56px, 5vw + 28px, 128px); --gutter: clamp(16px, 3vw, 40px); --maxw: 1360px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px; /* square "pills"; modules that need a true circle (cursor, swatches, avatars, close/toggle buttons) use 50% literals */
  --ease-out: cubic-bezier(0.3, 1.5, 0.6, 1); --ease-in: cubic-bezier(0.5, 0, 0.75, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 120ms; --d-med: 220ms; --d-slow: 500ms;
  --shadow-1: 6px 6px 0 oklch(15% 0.02 150); --shadow-2: 10px 10px 0 oklch(15% 0.02 150);
}
/* placards invert the local ink */
[data-surface="card"], .card { --c-ink: oklch(15% 0.02 150); --c-ink-2: oklch(30% 0.02 150); --c-muted: oklch(42% 0.02 150);
  background: var(--c-surface); border: 3px solid var(--c-rule); box-shadow: var(--shadow-1); }
:root[dir="rtl"] { --shadow-1: -6px 6px 0 oklch(15% .02 150); --shadow-2: -10px 10px 0 oklch(15% .02 150); }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Oswald", Impact, sans-serif; --f-body: "Rubik", system-ui, sans-serif; }
```

## Essence
One continuous saturated canvas (deep exhibit green) with no alternating section backgrounds. Content lives on white placards with 3px black borders and hard offset block shadows that grow on hover. Cobalt and hot-pink geometric blocks sit behind placards like gallery plinths. Buttons are skewed poster slabs. Absent: soft shadows, gradients, rounded corners, thin type, grey.

## Signature moves
1. Single continuous field colour for the whole page (Page Theme Lock); sections separated by placard placement, not colour.
2. Placard physics: 3px border + 6px hard shadow; hover translates (−4px,−4px) and shadow grows to 10px.
3. Skewed slab buttons: `transform: skewX(-8deg)` with inner label unskewed, pink fill.
4. Plinth blocks: cobalt/pink rectangles offset behind 1 in 3 placards (absolute, z −1).
5. Progress as game: steps/levels shown as a filled segmented bar of real stages (not decorative).

## Colour roles
| name | value | role | never |
|---|---|---|---|
| field green | oklch(41% .12 152) | page canvas, continuous | alternating with white sections |
| placard | oklch(98% .01 150) | cards, forms, text blocks | canvas |
| block ink | oklch(15% .02 150) | borders, shadows, placard text | soft shadows |
| cobalt | oklch(38% .22 265) | plinths, one band | text colour |
| hot pink | oklch(68% .25 355) | CTA slabs, highlights | large text runs |

## Typography
Display Oswald 700 uppercase lh 1.0 (floor, no cap collision), white on field. H2 Oswald 600 uppercase `--fs-2xl`. Body Rubik 400 17px on placards. Labels Rubik 600 13px. Ratio 1.414. Hebrew: Heebo 900 display (Oswald has no Hebrew), Rubik body (native Hebrew, same family in both scripts).

## Layout
12-col, max 1360px. Placards in a staggered grid (spans 5/7, 4/4/4 with vertical offsets 0/48/24px). Hero: huge white caps on field (cols 1–9) + a tilted (−3°) placard with the offer and the slab CTA. Affinity: Bento (irregular placards), Workbench, Narrative Workflow, Component Playground. Rejects: Photographic, Long Document, Specimen.

## Components
- Nav: hung wall labels (not the AI nav #33): the logo placard at inline-start and each link its own small white placard hung at a different drop (0 / 12 / 6 / 18px) with 3px border and hard shadow; the pink CTA placard is the largest and lowest; placards swing 2° on hover (overshoot allowed here).
- Footer: marquee scroll footer is not allowed here; use a big placard "exit" with contact + index columns.
- Buttons: skewed slab 56px, pink fill, 3px ink border, `--shadow-1`; hover lift; active = shadow 2px (pressed).
- Cards: placard physics (hard offset).
- Product card: placard with 1:1 image inside a 3px frame, name Oswald 600, price Rubik 700 in a pink tag.

## Backgrounds
Flat field. Optional `.bg-grid` in field-dark lines at 10% for one "lab" section; `.bg-halftone` on plinth blocks.

## Motion (budget 6)
Hover physics are the signature (120ms, overshoot ease). Signature scroll moment: `stack-cards` placards pile with `data-rotate="3"` (alternating ± per card = recipe on top). Allowed: `stack-cards`, `magnetic` (CTA only), `flip-grid`, `counter` (real scores), `accordion`, `cart`, `quickview`. Not: shader-bg, marquee, cursor, clip-reveal.

## Imagery
Bright flash photography of objects/kids' hands/experiments, framed inside 3px borders; flat vector pictograms in ink. Never: soft stock photos, glossy 3D, gradients.

## RTL notes
Shadow offsets flip (token override); skew angle multiplies by `SD.dir()`; plinth offsets use logical inset.

## Do / Don't
- Do keep the field continuous; Don't insert white sections.
- Do 3px borders + hard shadow; Don't blur any shadow.
- Do white display on field; Don't place body text directly on green (contrast/texture).
- Do skew slabs 6–10°; Don't skew text blocks.
- Do lh ≥1.0 on caps; Don't crush Oswald.
- Do stagger placards; Don't use equal 3-card rows.

## Palette drops
- Exhibit green (default): pink + cobalt. = `tokens.css` above (AA: ink/canvas 7.6 · ink-2/canvas 6.2 · muted/canvas 4.8 · muted/surface 1.6 · accent-ink/accent 5.9 · ink/surface 1.0)
- Cobalt hall: field oklch(40% .2 265), plinths yellow oklch(88% .17 95) + pink.
  Override: `--c-canvas: oklch(40% 0.2 265); --c-surface: oklch(97% 0.01 265); --c-surface-2: oklch(37% 0.2 265); --c-ink: oklch(97% 0.012 150); --c-ink-2: oklch(89.9% 0.012 150); --c-muted: oklch(76.1% 0.012 150); --c-rule: oklch(97% 0.012 150 / 0.16); --c-accent: oklch(56.3% 0.25 355); --c-accent-ink: oklch(97% 0.012 150); --c-focus: oklch(97% 0.012 150);`
  AA: ink/canvas 9.0 · ink-2/canvas 7.3 · muted/canvas 4.6 · muted/surface 7.7 · accent-ink/accent 4.6 · ink/surface 18.0 (surface pairs use the [data-surface="card"] local ink); accent L 68->56% for AA; accent/canvas 2.0 (<3: accent is a fill/surface colour, not text or UI line)
- Arcade purple: field oklch(35% .18 300), plinths oklch(85% .17 130) + orange oklch(70% .2 45).
  Override: `--c-canvas: oklch(35% 0.18 300); --c-surface: oklch(92% 0.01 300); --c-surface-2: oklch(32% 0.18 300); --c-ink: oklch(97% 0.012 150); --c-ink-2: oklch(89.2% 0.012 150); --c-muted: oklch(69.7% 0.012 150); --c-rule: oklch(97% 0.012 150 / 0.16); --c-accent: oklch(79.2% 0.25 355); --c-accent-ink: oklch(35% 0.18 300); --c-focus: oklch(79.2% 0.25 355);`
  AA: ink/canvas 11.4 · ink-2/canvas 9.0 · muted/canvas 4.6 · muted/surface 6.6 · accent-ink/accent 4.6 · ink/surface 15.4 (surface pairs use the [data-surface="card"] local ink); accent L 68->79% for AA

## Knobs
Field drop; shadow distance 4/6/10px; skew on/off; placard tilt (0/±3°); plinth frequency; nav slab vs floating.
