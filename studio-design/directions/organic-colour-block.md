---
name: organic-colour-block
title: Organic Colour Block
tagline: "Cut-paper blobs on a lilac table: chartreuse, butter and vermilion shapes that swell into sections, and a chunky soft serif that sounds warm, not precious."
axes: { paper_band: light, display_style: chunky-serif, accent_hue: warm, radius_system: organic, density: 4, variance: 8, motion: 5 }
fits: [company, landing, ecommerce]
subjects_good: [creative studios, food brands, regenerative agriculture, NGOs, community programs, bakeries, plant-based products, cultural centres]
subjects_bad: [banks, cybersecurity, luxury watches, law (formal), heavy industry]
neighbours: [inflatable-pop, herbarium, riso-two-ink, pantry-label, kikar-heavy]
fonts: { display: "Young Serif (Google)", body: "Rethink Sans 400/500 (Google)", hebrew: ["Frank Ruhl Libre", "Rubik"] }
---
# Organic Colour Block
Specimen: _specimens/organic-colour-block.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Rethink+Sans:wght@400..800&family=Frank+Ruhl+Libre:wght@500..900&family=Rubik:wght@400;500&display=swap">
*/
:root {
  --c-canvas: oklch(96% 0.020 300); --c-surface: oklch(98.5% 0.008 300); --c-surface-2: oklch(90% 0.045 300);
  --c-ink: oklch(23% 0.045 290); --c-ink-2: oklch(34% 0.045 290); --c-muted: oklch(48% 0.035 290);
  --c-rule: oklch(23% 0.045 290 / 0.18); --c-accent: oklch(64% 0.21 35); --c-accent-ink: oklch(23% 0.045 290);
  --c-focus: oklch(50% 0.2 35);
  --blk-chartreuse: oklch(88% 0.16 118); --blk-butter: oklch(93% 0.08 95); --blk-vermilion: oklch(63% 0.21 35); --blk-lavender: oklch(83% 0.07 300);
  --f-display: "Young Serif", "Frank Ruhl Libre", Georgia, serif; --f-body: "Rethink Sans", "Rubik", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Young Serif", serif;
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.0625rem; --fs-lg: 1.3125rem; --fs-xl: clamp(1.7rem, 1.4rem + 1.2vw, 2.4rem);
  --fs-2xl: clamp(2.5rem, 1.7rem + 3vw, 4.2rem); --fs-3xl: clamp(3.2rem, 2rem + 5vw, 6.5rem);
  --fs-display: clamp(3.25rem, 1.3rem + 6.4vw, 7.5rem);
  --lh-tight: 1.0; --lh-body: 1.6; --tr-display: -0.02em; --tr-label: 0.01em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 36px; --sp-7: 56px; --sp-8: 88px; --sp-9: 132px; --sp-10: 196px;
  --section-y: clamp(72px, 7vw + 32px, 184px); --gutter: clamp(16px, 3vw, 48px); --maxw: 1400px;
  --r-sm: 14px; --r-md: 40px; --r-lg: 64px; --r-pill: 999px;
  --shape-blob: 64% 36% 58% 42% / 44% 56% 44% 56%; /* extra token: blob mask for photos; never assign it to --r-* */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --ease-in: cubic-bezier(0.64, 0, 0.78, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 180ms; --d-med: 520ms; --d-slow: 1200ms;
  --shadow-1: none; --shadow-2: none;
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.1; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Frank Ruhl Libre", "Young Serif", Georgia, serif; --f-body: "Rubik", "Rethink Sans", system-ui, sans-serif; }
```

## Essence
Pale lilac paper with big cut-paper colour blocks in a fixed set (chartreuse, butter, vermilion, lavender) whose edges are organic curves, not rectangles. Each chapter is a colour block (a deliberate colour-block story, the one sanctioned exception to Page Theme Lock). Display is a chunky soft serif (Young Serif) that reads friendly; body is a clean grotesk. Photos are masked into blobs or pebbles. Absent: gradients, shadows, sharp rectangles for images, cream + terracotta, thin elegant serifs.

## Signature moves
1. Blob section edges: each colour section's top edge is an SVG wave/blob path (`clip-path: path()` generated per section), height 80–140px.
2. Blob-masked photos (`border-radius: var(--shape-blob)` or SVG mask), 2–3 shape variants rotated between images.
3. Morph on scroll: one hero blob morphs between 2 shapes (GSAP MorphSVG, free in 3.15) scrubbed by scroll.
4. Chunky serif headlines in ink on colour blocks, never on photos.
5. Real-facts marquee (services, crops, partners) as a butter band with a wavy edge; the only marquee.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| lilac paper | oklch(96% .02 300) | canvas | cream |
| aubergine ink | oklch(23% .045 290) | all text, outlines | black |
| chartreuse / butter / lavender | block tokens | chapter backgrounds (1 per chapter) | two in one chapter |
| vermilion | oklch(63% .21 35) | CTA fill, one blob per page | text, body backgrounds |

## Typography
Display Young Serif 400 (single weight), -0.02em, lh 1.0, sentence case. H2 Young Serif `--fs-2xl`. Body Rethink Sans 400 17px; labels 600 13px. Ratio 1.414. Hebrew: Frank Ruhl Libre 800 display (chunky serif Hebrew), Rubik 400 body.
Weight-contrast exception (antipatterns #14): Young Serif (single weight) against Rethink Sans; classification contrast.

## Layout
12-col, max 1400px, sections as colour chapters (canvas → chartreuse → canvas → butter → vermilion finale). Hero: display cols 1–8 on lilac, a large blob photo at inline-end overlapping into the next chapter. Sections: services as 3 blobs of different sizes with text beside (not cards), a story chapter with one big quote, project/product grid with pebble masks, contact chapter in vermilion with ink text. Affinity: Narrative Workflow, Portfolio Grid, Quote-Led, Photographic. Rejects: Workbench, Stat-Led, Index-First.

## Components
- Nav: blob tabs (not the AI nav #33): each link is a colour-block tab hanging from the top edge in the chapter colours (organic top edge via `--shape-blob`), the current page's tab hangs 12px longer; "Get in touch" is the vermilion tab at inline-end. Wordmark in Young Serif sits on the canvas at inline-start.
- Footer: statement sentence in Young Serif on vermilion + contact + blob wordmark.
- Buttons: pill 52px, vermilion fill ink text 600; secondary = ink 1.5px ring pill; hover = blob-shaped radius morph (border-radius transition 520ms).
- Cards: avoid; if needed, `--r-md` 40px tiles on the chapter colour.
- Product card: pebble-masked photo 1:1, name Young Serif 1.4rem, price Rethink Sans 500.

## Backgrounds
Flat colour chapters with blob edges; `.bg-grain` 4% (paper cut). No shaders.

## Motion (budget 5)
House ease `cubic-bezier(.22,1,.36,1)` 520ms. Signature: hero blob morph scrubbed across the first 100vh. Allowed: `marquee` (one), `clip-reveal` (`data-direction="center"`; blob masks are `--shape-blob` on the frame, the radius morph is a recipe), `split-reveal` (display words), `testimonials` (real quotes), `accordion`, `cart`, `pdp`. Not: cursor, shader-bg, bento, stack-cards.

## Imagery
Warm natural photography (fields, hands, food, people working), saturated but real; masked in blobs/pebbles. Paper-cut illustrations in the block colours. Never: stock office teams, 3D blobs with gloss, gradient backgrounds.

## RTL notes
Blob paths are asymmetric: mirror them with `transform: scaleX(-1)` on the SVG wrapper in RTL; marquee direction flips; hero blob sits at inline-end.

## Do / Don't
- Do one chapter colour per section; Don't mix two block colours in one section.
- Do blob edges; Don't use straight section dividers.
- Do ink text on blocks; Don't put white text on chartreuse/butter.
- Do vermilion sparingly (CTA + finale); Don't make three vermilion chapters.
- Do real marquee items; Don't fill it with adjectives.
- Do Young Serif ≤7.5rem; Don't pair it with a second serif.

## Palette drops
- Lilac + chartreuse/butter/vermilion (default). = `tokens.css` above (AA: ink/canvas 15.1 · ink-2/canvas 10.5 · muted/canvas 5.8 · muted/surface 6.3 · accent-ink/accent 4.6 · ink/surface 16.3)
- Vermilion field: canvas oklch(63% .21 35), blocks oklch(95% .02 90) + oklch(80% .1 230); ink oklch(20% .03 30).
  Override: `--c-canvas: oklch(63% 0.21 35); --c-surface: oklch(95% 0.02 90); --c-surface-2: oklch(80% 0.1 230); --c-ink: oklch(14% 0.03 30); --c-ink-2: oklch(18% 0.03 30); --c-muted: oklch(20% 0.03 30); --c-rule: oklch(14% 0.03 30 / 0.2); --c-accent: oklch(95% 0.02 90); --c-accent-ink: oklch(14% 0.03 30); --c-focus: oklch(14% 0.03 30);`
  AA: ink/canvas 5.2 · ink-2/canvas 4.9 · muted/canvas 4.7 · muted/surface 16 · accent-ink/accent 15.8 · ink/surface 16. On the vermilion field the accent becomes the cream block (CTA = cream fill + ink text); body copy longer than 2 lines sits on `--c-surface` blocks.
- Sea glass: canvas oklch(95% .02 180), blocks oklch(85% .09 150) + oklch(90% .08 60) + oklch(60% .15 260) cobalt; accent cobalt.
  Override: `--c-canvas: oklch(95% 0.02 180); --c-surface: oklch(97.5% 0.02 180); --c-surface-2: oklch(85% 0.09 150); --c-ink: oklch(20% 0.02 180); --c-ink-2: oklch(31% 0.02 180); --c-muted: oklch(52.7% 0.02 180); --c-rule: oklch(20% 0.02 180 / 0.16); --c-accent: oklch(52% 0.15 260); --c-accent-ink: oklch(97% 0.01 180); --c-focus: oklch(52% 0.15 260);`
  AA: ink/canvas 15.7 · ink-2/canvas 11.2 · muted/canvas 4.6 · muted/surface 5.0 · accent-ink/accent 5.2 · ink/surface 16.9; accent/canvas 4.9 (cobalt darkened from 60% to 52% for white text)

## Knobs
Blob edge amplitude (subtle/wavy/bold); chapter order; morph on/off; mask shapes set; marquee on/off; photo vs paper-cut illustration ratio.
