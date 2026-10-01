---
name: storybook-sketch
title: Storybook Sketch
tagline: "A school exercise book with blue feint lines: pencil outlines, wobbly hand-cut shapes, one character who lives in the margins."
axes: { paper_band: light, display_style: handwritten, accent_hue: warm, radius_system: organic, density: 5, variance: 7, motion: 5 }
fits: [landing, company, ecommerce]
subjects_good: [kindergartens, children's education, family cafés, bakeries, pet services, craft classes, children's books, community clinics for families]
subjects_bad: [law, finance, luxury, B2B infrastructure, nightlife]
neighbours: [inflatable-pop, riso-two-ink, organic-colour-block]
fonts: { display: "Caveat Brush (Google)", body: "Fredoka 400/600 (Google, native Hebrew)", hebrew: ["Playpen Sans Hebrew", "Fredoka"] }
---
# Storybook Sketch
Specimen: _specimens/storybook-sketch.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Fredoka:wght@400;500;600&family=Playpen+Sans+Hebrew:wght@400..800&display=swap">
*/
:root {
  --c-canvas: oklch(97.5% 0.010 230); --c-surface: oklch(99% 0.005 230); --c-surface-2: oklch(93% 0.025 230);
  --c-ink: oklch(28% 0.012 260); --c-ink-2: oklch(38% 0.012 260); --c-muted: oklch(52% 0.012 260);
  --c-rule: oklch(80% 0.05 235); /* feint lines */ --c-accent: oklch(66% 0.19 32); --c-accent-ink: oklch(22% 0.012 260);
  --c-focus: oklch(55% 0.16 255);
  --c-teal: oklch(70% 0.11 185); --c-pear: oklch(87% 0.15 110); --c-margin: oklch(68% 0.16 20); /* margin line */
  --f-display: "Caveat Brush", "Playpen Sans Hebrew", cursive; --f-body: "Fredoka", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Caveat Brush", cursive;
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.125rem; --fs-lg: 1.375rem; --fs-xl: clamp(1.75rem, 1.4rem + 1.2vw, 2.4rem);
  --fs-2xl: clamp(2.5rem, 1.7rem + 3vw, 4.25rem); --fs-3xl: clamp(3.2rem, 2rem + 5vw, 6.5rem);
  --fs-display: clamp(3.5rem, 1.5rem + 7vw, 8rem);
  --lh-tight: 1.0; --lh-body: 1.6; --tr-display: 0; --tr-label: 0.01em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 80px; --sp-9: 120px; --sp-10: 168px;
  --section-y: clamp(64px, 6vw + 32px, 152px); --gutter: clamp(16px, 3vw, 44px); --maxw: 1240px;
  --r-sm: 12px; --r-md: 24px; --r-lg: 48px; --r-pill: 999px;   /* contract radii stay plain lengths (modules calc/inset them) */
  /* extra shape tokens (direction-only; apply them in project CSS, never feed them to --r-*): */
  --shape-wobble-sm: 255px 12px 225px 12px / 12px 225px 12px 255px; /* hand-cut wobble: buttons, tags */
  --shape-wobble-md: 18px 28px 22px 32px / 30px 18px 26px 20px;     /* cards */
  --shape-wobble-lg: 40px 56px 44px 60px / 58px 40px 52px 44px;     /* photo frames, panels */
  --ease-out: cubic-bezier(0.34, 1.56, 0.64, 1); /* spring: CTA + character only */ --ease-in: cubic-bezier(0.5, 0, 0.75, 0); --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
  --d-fast: 160ms; --d-med: 380ms; --d-slow: 800ms;
  --shadow-1: 3px 4px 0 var(--c-ink); --shadow-2: 6px 7px 0 var(--c-ink);
}
body { background-image: repeating-linear-gradient(to bottom, transparent 0 31px, var(--c-rule) 31px 32px); } /* feint ruling; hide on dense sections */
:root[dir="rtl"] { --shadow-1: -3px 4px 0 var(--c-ink); --shadow-2: -6px 7px 0 var(--c-ink); }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Playpen Sans Hebrew", "Caveat Brush", cursive; --f-body: "Fredoka", system-ui, sans-serif; }
```

## Essence
A blue-ruled exercise book, not cream craft paper: feint lines every 32px, a red margin rule at the inline-start, pencil-graphite ink, and shapes cut by hand (asymmetric border-radius). Handwritten display is used sparingly (≤1 per section), body is a friendly rounded sans that covers Hebrew natively. One character/mascot appears in 2–3 places and reacts to the user. Absent: corporate doodle people, emoji icons, gradients, thin grey type.

## Signature moves
1. Exercise-book ruling on canvas + red margin line (`border-inline-start: 2px solid var(--c-margin)` on the main column, 64px in).
2. Hand-cut shapes: wobbly radii on cards/images, 2px dashed or solid pencil outlines, chunky offset pencil shadow.
3. One character (SVG) with 3 poses: waves in hero, points at CTA, sleeps in footer; blinks on hover.
4. Handwritten annotations: Caveat Brush notes with a hand-drawn arrow pointing to real UI (e.g. "that's the menu"), ≤2 per page.
5. Line boil: SVG doodles jitter between 3 frames with `steps(3)` at 6fps (paused offscreen).

## Colour roles
| name | value | role | never |
|---|---|---|---|
| page | oklch(97.5% .01 230) | canvas + ruling | cream craft paper |
| pencil | oklch(28% .012 260) | text, outlines, shadows | pure black |
| tomato | oklch(66% .19 32) | CTA fill, character accent | body text |
| teal / pear | oklch(70% .11 185) / oklch(87% .15 110) | card fills, highlights | text |
| margin red | oklch(68% .16 20) | margin line only | anything else |

## Typography
Display Caveat Brush 400, sentence case, ≤6 words, lh 1.0; H2 Fredoka 600 `--fs-2xl` (headings mostly in Fredoka, handwriting only for display + notes). Body Fredoka 400 18px/1.6. Ratio 1.333. Hebrew: Playpen Sans Hebrew 700 for display/notes (handwriting feel), Fredoka 400 body (native Hebrew).
Weight-contrast exception (antipatterns #14): Caveat Brush hand-drawn display against rounded Fredoka; classification contrast.

## Layout
12-col, max 1240px, content in the ruled page with the margin line. Hero: display + character + tomato CTA; a polaroid-like photo tilted 3° with wobbly radius. Sections: activities as hand-cut colour cards (teal/pear/white) in a staggered grid, a day schedule drawn as a timeline, parent FAQ, location map. Affinity: Narrative Workflow, Conversational FAQ, Portfolio Grid (small). Rejects: Stat-Led, Workbench, Index-First.

## Components
- Nav: margin index (not the AI nav #33): links are handwritten in the notebook's inline-start margin as a vertical index with a pencil underline under the current page; the wordmark is a stamp at the top of the margin; the CTA is a tomato stamped label. Mobile: bottom tab bar drawn in pencil.
- Footer: letter close: handwritten sign-off + address/hours/map; character sleeping.
- Buttons: 54px, `border-radius: var(--shape-wobble-sm)`, tomato fill pencil text Fredoka 600, 2px outline, `--shadow-1`; hover = shadow grows + 1° tilt with spring.
- Cards: hand-cut, 2px pencil outline, fill teal/pear/white; shadow `--shadow-1`.
- Product card: photo in wobbly frame 1:1, name Fredoka 600, price in a pear circle sticker.

## Backgrounds
Ruled canvas; `.bg-dots` in teal 10% for kids' activity sections. No shader-bg.

## Motion (budget 5)
Spring (overshoot) only on CTA and character; UI uses `--ease-in-out`. Signature: character follows scroll progress along the margin (small, position sticky) and changes pose per section. Allowed: `magnetic` (CTA), `split-reveal` (display words pop), `accordion`, `map`, `testimonials` (real parents' quotes), `cart`. Not: shader-bg, marquee, hscroll, cursor followers.

## Imagery
Real photos of children's work, rooms and teachers (with consent), framed with wobbly radii; hand-drawn SVG doodles. Never: stock "diverse happy kids" cutouts, clip-art, emoji icons, AI children.

## RTL notes
Margin line moves to the right (logical property); annotation arrows mirror via `scaleX(-1)` on inline-direction arrows; character faces the reading direction (mirror SVG).

## Do / Don't
- Do handwriting ≤1 per section; Don't set paragraphs in Caveat Brush.
- Do wobbly radii; Don't mix them with perfect 16px radii.
- Do real photos; Don't use stock kid cutouts.
- Do spring on CTA only; Don't bounce menus/forms.
- Do ruling at 32px and hide it on dense sections; Don't let ruling fight text baselines on forms.
- Do one character; Don't add a cast of mascots.

## Palette drops
- Blue-ruled + tomato (default). = `tokens.css` above (AA: ink/canvas 13.6 · ink-2/canvas 9.3 · muted/canvas 5.1 · muted/surface 5.4 · accent-ink/accent 5.1 · ink/surface 14.2)
- Graph paper: canvas oklch(97% .01 150) with 16px grid ruling, accent oklch(62% .17 255) cobalt, fills oklch(88% .12 90) + oklch(80% .1 350).
  Override: `--c-canvas: oklch(97% 0.01 150); --c-surface: oklch(98.5% 0.01 150); --c-surface-2: oklch(92.5% 0.01 150); --c-ink: oklch(20% 0.01 150); --c-ink-2: oklch(31.1% 0.01 150); --c-muted: oklch(54.1% 0.01 150); --c-rule: oklch(20% 0.01 150 / 0.16); --c-accent: oklch(62% 0.17 255); --c-accent-ink: oklch(20% 0.01 150); --c-focus: oklch(62% 0.17 255);`
  AA: ink/canvas 16.6 · ink-2/canvas 12.0 · muted/canvas 4.6 · muted/surface 4.8 · accent-ink/accent 4.9 · ink/surface 17.4
- Kraft night (evening classes): canvas oklch(30% .03 250), ink oklch(95% .01 90) chalk, accent oklch(82% .15 90).
  Override: `--c-canvas: oklch(30% 0.03 250); --c-surface: oklch(34.5% 0.03 250); --c-surface-2: oklch(39% 0.03 250); --c-ink: oklch(95% 0.01 90); --c-ink-2: oklch(83.3% 0.01 90); --c-muted: oklch(71.8% 0.01 90); --c-rule: oklch(95% 0.01 90 / 0.16); --c-accent: oklch(82% 0.15 90); --c-accent-ink: oklch(30% 0.03 250); --c-focus: oklch(82% 0.15 90);`
  AA: ink/canvas 11.8 · ink-2/canvas 8.1 · muted/canvas 5.4 · muted/surface 4.6 · accent-ink/accent 7.8 · ink/surface 9.9

## Knobs
Ruling (feint lines / graph / none); character on/off and poses; card fills set; annotation count 0–2; wobble intensity; photo frames tilted vs straight.
