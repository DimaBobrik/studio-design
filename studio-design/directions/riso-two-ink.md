---
name: riso-two-ink
title: Riso Two-Ink
tagline: "A risograph zine on cool grey stock: federal-blue ink for everything, fluorescent pink as the second drum, and the misregistration left in on purpose."
axes: { paper_band: light, display_style: grotesk-quirky, accent_hue: magenta, radius_system: "0", density: 6, variance: 7, motion: 2 }
fits: [company, landing, ecommerce]
subjects_good: [bookshops, zines, cultural events, indie publishers, small food brands, record shops, design schools, community spaces]
subjects_bad: [banks, medical, luxury, enterprise SaaS, real estate]
neighbours: [billboard-type, storybook-sketch, organic-colour-block]
fonts: { display: "Darker Grotesque 900 (Google)", body: "Newsreader 400 (Google)", hebrew: ["Secular One", "Frank Ruhl Libre"] }
---
# Riso Two-Ink
Specimen: _specimens/riso-two-ink.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@500;700;900&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Secular+One&family=Frank+Ruhl+Libre:wght@400;500&display=swap">
*/
:root {
  --c-canvas: oklch(92.5% 0.008 230); --c-surface: oklch(95.5% 0.006 230); --c-surface-2: oklch(88% 0.012 230);
  --c-ink: oklch(38% 0.16 268); --c-ink-2: oklch(46% 0.13 268); --c-muted: oklch(51.2% 0.08 268);
  --c-rule: oklch(38% 0.16 268 / 0.5); --c-accent: oklch(66% 0.25 350); --c-accent-ink: oklch(22% 0.10 268);
  --c-focus: oklch(60% 0.26 350);
  --f-display: "Darker Grotesque", "Secular One", system-ui, sans-serif; --f-body: "Newsreader", "Frank Ruhl Libre", Georgia, serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Darker Grotesque", sans-serif;
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.125rem; --fs-lg: 1.375rem; --fs-xl: clamp(1.75rem, 1.4rem + 1.2vw, 2.4rem);
  --fs-2xl: clamp(2.6rem, 1.8rem + 3vw, 4.5rem); --fs-3xl: clamp(3.5rem, 2rem + 6vw, 8rem);
  --fs-display: clamp(4.25rem, 1rem + 12vw, 13rem);
  --lh-tight: 0.82; --lh-body: 1.55; --tr-display: -0.01em; --tr-label: 0.02em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 72px; --sp-9: 112px; --sp-10: 160px;
  --section-y: clamp(56px, 5vw + 28px, 136px); --gutter: clamp(16px, 3vw, 40px); --maxw: 1400px;
  --r-sm: 0px; --r-md: 2px; --r-lg: 4px; --r-pill: 0px;
  --ease-out: cubic-bezier(0.2, 0, 0, 1); --ease-in: cubic-bezier(0.6, 0, 1, 1); --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-step: steps(3, end); /* house ease for CSS transitions; in GSAP use ease: "steps(3)" */
  --d-fast: 120ms; --d-med: 240ms; --d-slow: 480ms;
  --shadow-1: 2px 1px 0 var(--c-accent); /* misregistration */ --shadow-2: 5px 4px 0 var(--c-accent);
}
:root[dir="rtl"] { --lh-tight: 1.0; --shadow-1: -2px 1px 0 var(--c-accent); --shadow-2: -5px 4px 0 var(--c-accent); }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Secular One", "Darker Grotesque", system-ui, sans-serif; --f-body: "Frank Ruhl Libre", "Newsreader", Georgia, serif; }
```

## Essence
Two inks, one paper. All text and linework print in federal blue (not black); fluorescent pink is the second drum used for fills, overprints and the misregistered offset. Overlaps multiply (`mix-blend-mode: multiply`) to create a third colour for free. Photos become duotones. Absent: black, grey UI, gradients, soft shadows, rounded cards, smooth easing.

## Signature moves
1. Blue ink everywhere: body text, rules, icons are `--c-ink`; no black on the page.
2. Misregistration: headings get `text-shadow: 2px 1px 0 pink` and images a pink duplicate offset 4px with multiply.
3. Overprint blocks: pink rectangles behind blue type set to multiply, producing violet overlaps.
4. Duotone photos: grayscale + blue multiply layer + pink screen layer (CSS filter + pseudo-elements).
5. Stepwise motion: every animation uses `steps()` (print-frame jitter), never smooth tweens.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| stock | oklch(92.5% .008 230) | canvas | cream #F4F1EA family |
| federal blue | oklch(38% .16 268) | all ink: text, rules, icons | replaced by black |
| fluoro pink | oklch(66% .25 350) | fills, overprint, offset, CTA fill | text on stock (contrast) |
| overlap violet | multiply result | emergent only | declared as a third token |

## Typography
Display Darker Grotesque 900, lh 0.82, lowercase or title. H2 Darker Grotesque 700. Body Newsreader 400 18px/1.55 (serif body is part of the zine voice). Labels Darker Grotesque 700 15px. Ratio 1.5. Hebrew: Secular One display (single weight; lh 1.0), Frank Ruhl Libre 400 body.
Hebrew weights: Secular One ships one weight (400) — use it at 400 (`font-synthesis: none` in core.css blocks faux bold); never ask for 700 in Hebrew.

## Layout
12-col zine spreads: asymmetric columns (5/7, 3/9), images that break into the gutter, rotated (±2°) stamps. Hero: huge two-word display over a pink overprint block, one duotone image cropped irregularly. Affinity: Long Document, Manifesto, Catalogue (small), Index-First. Rejects: Bento, Workbench, SaaS Feature Stack.

## Components
- Nav: newspaper masthead: centred wordmark in display, a thin blue rule, 5 links under it in one line.
- Footer: dense colophon with "printed by" style credits (real), issue list, blue rules.
- Buttons: rectangular 0–2px radius, pink fill, blue text 700, misregistered shadow `--shadow-1`; hover = shadow jumps to `--shadow-2` in steps(2).
- Cards: borderless tint (pink at 25% multiply) or 1.5px blue outline; never both.
- Product card (books/zines/merch): duotone photo 3:4, title in display 700, price in body serif, "add" as a small pink rectangle button.

## Backgrounds
`.bg-grain` (paper tooth, 6%), `.bg-halftone` on image edges and one section; shader-bg `dithering` in blue/pink as a hero alternative.

## Motion (budget 2)
House ease is `--ease-step` (CSS) / `"steps(3)"` (GSAP); contract eases exist only for modules that require smooth curves (drawer, cart). Signature: on load, the pink layer "prints" 6px off then snaps into its 2px offset in 3 steps. Allowed: `text-fx` (scramble, short `data-duration`), `accordion`, `cart`, `marquee` (one; its loop is linear, a stepped marquee is a recipe), `nav`. Not: split-reveal smooth, shader loops, magnetic, cursor, Lenis inertia (use native scroll).

## Imagery
Duotone photos (blue/pink), halftoned illustrations, hand-cut collage. Never: full-colour stock photos, 3D renders, soft-focus lifestyle.

## RTL notes
Misregistration offset flips horizontally (tokens override); rotated stamps multiply angle by `SD.dir()`; Hebrew body in Frank Ruhl Libre stays upright (no italics).

## Do / Don't
- Do blue text; Don't use black anywhere.
- Do pink as fill; Don't set pink body text on stock (fails contrast).
- Do multiply overlaps; Don't declare new colours for them.
- Do steps() easing; Don't use smooth cubic eases on reveals.
- Do 0–4px radius; Don't round cards 16px+.
- Do grain 6%; Don't animate the grain.

## Palette drops
- Federal + Fluoro (default). = `tokens.css` above (AA: ink/canvas 8.4 · ink-2/canvas 5.9 · muted/canvas 4.6 · muted/surface 5.1 · accent-ink/accent 5.0 · ink/surface 9.2)
- Teal + Sunflower: ink oklch(45% .1 200), second drum oklch(85% .17 95), stock oklch(94% .006 200).
  Override: `--c-canvas: oklch(94% 0.006 200); --c-surface: oklch(97% 0.006 200); --c-surface-2: oklch(89.5% 0.006 200); --c-ink: oklch(45% 0.1 200); --c-ink-2: oklch(50.5% 0.1 200); --c-muted: oklch(50.5% 0.1 200); --c-rule: oklch(45% 0.1 200 / 0.16); --c-accent: oklch(86.9% 0.17 95); --c-accent-ink: oklch(45% 0.1 200); --c-focus: oklch(45% 0.1 200);`
  AA: ink/canvas 5.8 · ink-2/canvas 4.6 · muted/canvas 4.6 · muted/surface 5.0 · accent-ink/accent 4.6 · ink/surface 6.3; accent L 85->87% for AA; accent/canvas 1.2 (<3: accent is a fill/surface colour, not text or UI line)
- Burgundy + Mint: ink oklch(35% .12 15), second drum oklch(82% .12 165), stock oklch(93% .006 20).
  Override: `--c-canvas: oklch(93% 0.006 20); --c-surface: oklch(96% 0.006 20); --c-surface-2: oklch(88.5% 0.006 20); --c-ink: oklch(35% 0.12 15); --c-ink-2: oklch(43.5% 0.12 15); --c-muted: oklch(52.8% 0.12 15); --c-rule: oklch(35% 0.12 15 / 0.16); --c-accent: oklch(82% 0.12 165); --c-accent-ink: oklch(35% 0.12 15); --c-focus: oklch(35% 0.12 15);`
  AA: ink/canvas 9.7 · ink-2/canvas 6.9 · muted/canvas 4.6 · muted/surface 5.0 · accent-ink/accent 7.2 · ink/surface 10.7; accent/canvas 1.3 (<3: accent is a fill/surface colour, not text or UI line)

## Knobs
Drum pair; misregistration distance (1–4px); duotone vs halftone images; masthead nav vs edge nav; stamp count (0–3); display weight 700/900.
