---
name: pantry-label
title: Pantry Label
tagline: "A pantry shelf blown up to a website: the product's own label is the design system — a fat retro serif, typewriter small print, a line-drawn mascot, and flat plates in the packaging colours."
axes: { paper_band: light, display_style: fat-face-serif, accent_hue: green, radius_system: soft, density: 6, variance: 7, motion: 5 }
fits: [ecommerce, landing]
subjects_good: [olive oil, coffee roasters, hot sauce and condiments, snacks and candy, craft drinks and sodas, bakeries with retail, spice brands, delis and farm shops, pet food, eco cleaning products, tinned fish, honey and preserves]
subjects_bad: [law, finance, clinics, luxury jewellery, architecture, B2B SaaS, funerals]
neighbours: [organic-colour-block, inflatable-pop, herbarium]
fonts: { display: "Ultra 400 (Google)", body: "Figtree 400/500 (Google)", mono: "Courier Prime 400/700 (Google)", hebrew: ["Suez One", "Heebo"] }
---
# Pantry Label
Specimen: _specimens/pantry-label.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ultra&family=Figtree:wght@400;500;600&family=Courier+Prime:wght@400;700&family=Suez+One&family=Heebo:wght@400;500;700&display=swap">
*/
:root {
  --c-canvas: oklch(95.2% 0.04 108); --c-surface: oklch(98.6% 0.018 108); --c-surface-2: oklch(89% 0.14 98);
  --c-ink: oklch(32% 0.045 125); --c-ink-2: oklch(41% 0.045 125); --c-muted: oklch(49.5% 0.04 125);
  --c-rule: oklch(32% 0.045 125 / 0.28); --c-accent: oklch(87% 0.19 118); --c-accent-ink: oklch(32% 0.045 125);
  --c-focus: oklch(32% 0.045 125);
  --f-display: "Ultra", "Suez One", Georgia, serif; --f-body: "Figtree", "Heebo", system-ui, sans-serif;
  --f-mono: "Courier Prime", "Heebo", ui-monospace, monospace; --f-outlier: "Courier Prime", ui-monospace, monospace;
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.0625rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.5rem, 1.25rem + 0.9vw, 2rem);
  --fs-2xl: clamp(2.1rem, 1.4rem + 2.6vw, 3.4rem); --fs-3xl: clamp(2.8rem, 1.6rem + 4.4vw, 5.25rem);
  --fs-display: clamp(3.25rem, 1.2rem + 7.2vw, 8.5rem); /* 52 → 136px; the logotype moment may go to 20vw */
  --lh-tight: 0.95; --lh-body: 1.55; --tr-display: -0.01em; --tr-label: 0.04em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 20px; --sp-6: 24px; --sp-7: 32px; --sp-8: 48px; --sp-9: 80px; --sp-10: 128px;
  --section-y: clamp(64px, 5vw + 32px, 128px); --gutter: clamp(16px, 2.2vw, 32px); --maxw: 1440px;
  --r-sm: 10px; --r-md: 20px; --r-lg: 28px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.34, 1.3, 0.64, 1); --ease-in: cubic-bezier(0.5, 0, 0.75, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 140ms; --d-med: 320ms; --d-slow: 640ms;
  --shadow-1: none; --shadow-2: 0 0 0 2px var(--c-ink);
  /* direction extras: packaging plates (fills only; ink text on all three) and the mascot stroke */
  --plate-yellow: oklch(88% 0.15 95); --plate-lime: oklch(88% 0.17 135); --plate-tomato: oklch(73% 0.17 34);
  --img-line: oklch(32% 0.045 125); --stroke-w: 2.25px;
}
:root[dir="rtl"] { --f-display: "Suez One", "Ultra", serif; --f-body: "Heebo", "Figtree", sans-serif; --f-mono: "Courier Prime", "Heebo", monospace; --tr-display: 0; --tr-label: 0; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Suez One", "Ultra", Georgia, serif; --f-body: "Heebo", "Figtree", system-ui, sans-serif; }
```

## Essence
Start from the jar, bag or bottle: its display face, its small print, its mascot and its two or three ink colours become the site. Big words are set in a fat retro serif like a label headline; everything factual (origin, harvest date, net weight, batch) is typewriter small print; a line-drawn mascot (2-2.5px strokes, no fills) walks through the story; sections are flat colour plates in the packaging colours. The product photo always sits on the same plate/texture. Absent: warm-cream-plus-terracotta (antipatterns A1), gradients, glossy 3D, stock kitchens, feature icon grids. Seen in: a US DTC olive-oil brand `../references/cases/case-26-ecommerce.md` (+ 5 more catalogued food/drink DTC sites: coffee roasters, sodas, snacks, candy; see `../references/_index.md`).

## Signature moves
1. **Label headline**: one or two lines of fat serif at `--fs-display`, sentence case, lh 0.95, often split with the second line indented (offset baseline like a sticker label).
2. **Typewriter facts**: origin, dates, weights, batch and prices in Courier Prime 15-17px; product names in quotes ("House Pour").
3. **Line mascot**: one character drawn in `--img-line` strokes (SVG, 2.25px, round caps) that reappears 3-5 times (hero corner, story, empty cart, 404, footer), with one tiny motion each (blink, walk, wave).
4. **Plates**: sections alternate canvas and one plate colour (`--plate-*`), full-bleed, 0 radius on the band, 20px on product cards inside.
5. **Verb cloud**: uses/recipes as scattered serif verbs (Sear · Grill · Bake · Dip) around one photo instead of a feature grid.
6. **Logotype moment**: once per page the brand word at 18-24vw on a plate (mid-page, not the hero).

## Colour roles
| name | value | role | never |
|---|---|---|---|
| canvas | oklch(95.2% .04 108) pale olive-paper | page | warm cream #F4F1EA-family |
| ink | oklch(32% .045 125) olive ink | all text, mascot lines, rules | pure black |
| chartreuse | oklch(87% .19 118) | primary CTA fill (pill), active chips | text, thin lines |
| plates | yellow / lime / tomato | full sections, product plates | two plates adjacent; tomato under small text |

## Typography
Display Ultra 400 (single weight) at 52-136px, -0.01em, lh 0.95, sentence case (caps only for ≤3-word stickers). Body Figtree 400/500 17/1.55. Small print Courier Prime 400/700 15px, +0.04em in caps labels. Ratio ~1.33. Hebrew: Suez One for display (single weight; set one step smaller than Latin because it runs wider), Heebo 400/500 body; the typewriter voice stays on Latin/numerals (no Hebrew typewriter face), Hebrew small print in Heebo 500 14-15px.

## Layout
12-col, 1440 max, generous plates. Hero: product film/photo band with a label headline bottom-start + one chartreuse pill (H-22) OR product-on-plate with the headline split around it (H-14). Product rows 3-up on identical plates, 16-24px gaps. One pinned story with the mascot. Affinity: Story commerce, Shelf, Recipe. Rejects: dark hero, bento, logo walls.

## Components
- Nav: small logotype start, typewriter links, round icon buttons, "Cart [0]" pill with count in Courier.
- Buttons: chartreuse pill with ink text 52px, hover = bounce ease + 2px ink ring (`--shadow-2`); secondary = ink underline typewriter link with →.
- Product card: 20px radius plate (same texture every card), quoted name in Ultra 28px, price + size in Courier, round "+" add button.
- Badges: circular sticker (ink ring, typewriter text on a circle path) for real claims only (harvest date, organic cert no.).
- Footer: canvas, 3-4 typewriter link columns, mascot sitting on the newsletter field.

## Backgrounds
Flat plates; optional speckle/stone texture ONLY on product plates (`.bg-grain` at 6%). No gradients.

## Motion (budget 5)
Friendly, springy. House ease `cubic-bezier(.34,1.3,.64,1)` 320ms. Signature moment: pinned story where the mascot walks across 2-3 plates while the label headline swaps lines (`split-reveal` words). Allowed fx: `split-reveal`, `marquee` (one harvest/ticker strip), `stack-cards` (recipes), `cart`, `quickview`, `magnetic` on the main pill. Banned: WebGL, parallax photo stacks, cursor followers.

## Imagery
Product on a consistent plate (stone, speckled paper, painted board) in soft daylight; hands using the product; the source (grove, farm, roastery) documentary; recipe close-ups top-down. Mascot and small spot illustrations in the line style. Never: glossy renders, lifestyle stock, dark moody food photography.

## RTL notes
Split headline offset mirrors (indent from inline-start); mascot SVG gets `direction="ltr"` and is mirrored with `.flip-x` only if it walks toward the reading direction; circular sticker text path stays LTR for Latin, Hebrew uses a straight label instead.

## Do / Don't
- Do take fonts/colours from the real packaging when it exists; Don't invent a mascot the brand doesn't own (draw an object instead: bottle, bean, chilli).
- Do print real facts in typewriter; Don't fill stickers with fake awards.
- Do alternate canvas and ONE plate; Don't stack three colours in a row.
- Do keep Ultra for ≥28px; Don't set body or buttons in it.

## Palette drops
- Olive tin (default). = `tokens.css` above (AA: ink/canvas 11.0 · ink-2/canvas 7.6 · muted/canvas 5.3 · muted/surface 5.8 · accent-ink/accent 8.7 · ink/surface 12.1; accent/canvas 1.3 (<3: chartreuse is a fill only). Plates with ink text: yellow 8.8 · lime 9.2 · tomato 4.9.)
- Tomato tin: blush paper, maroon ink, tomato CTA with dark text.
  Override: `--c-canvas: oklch(95% 0.025 25); --c-surface: oklch(98.6% 0.01 25); --c-surface-2: oklch(88% 0.06 25); --c-ink: oklch(28% 0.07 22); --c-ink-2: oklch(38% 0.07 22); --c-muted: oklch(48% 0.06 22); --c-rule: oklch(28% 0.07 22 / 0.28); --c-accent: oklch(66% 0.19 33); --c-accent-ink: oklch(22% 0.06 22); --c-focus: oklch(28% 0.07 22);`
  AA: ink/canvas 12.8 · ink-2/canvas 8.9 · muted/canvas 5.8 · muted/surface 6.4 · accent-ink/accent 5.2 · ink/surface 14.3; accent/canvas 2.9 (<3: fill only)
- Blue enamel: enamelware blue-white, navy ink, sunflower CTA.
  Override: `--c-canvas: oklch(95% 0.018 240); --c-surface: oklch(98.8% 0.008 240); --c-surface-2: oklch(88% 0.04 240); --c-ink: oklch(28% 0.09 262); --c-ink-2: oklch(38% 0.08 262); --c-muted: oklch(49% 0.07 262); --c-rule: oklch(28% 0.09 262 / 0.28); --c-accent: oklch(86% 0.17 92); --c-accent-ink: oklch(28% 0.09 262); --c-focus: oklch(28% 0.09 262);`
  AA: ink/canvas 12.8 · ink-2/canvas 8.7 · muted/canvas 5.4 · muted/surface 6.1 · accent-ink/accent 9.6 · ink/surface 14.3; accent/canvas 1.3 (<3: fill only)

## Knobs
Hero (film band / product-on-plate); plate colour set (from the packaging); mascot (character / object / none); display (Ultra / packaging's own face when licensed); verb cloud vs recipe stack; logotype moment position (mid-page / pre-footer).
