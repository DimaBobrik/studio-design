---
name: herbarium
title: Herbarium
tagline: "A pressed-specimen sheet on moss-tinted paper: an old-foundry roman, botanical ink, marginal notes, and stems that draw themselves as you read."
axes: { paper_band: light, display_style: old-style-serif, accent_hue: pink, radius_system: soft, density: 5, variance: 6, motion: 3 }
fits: [ecommerce, company, landing]
subjects_good: [natural cosmetics, herbal remedies, florists, tea, organic farms, perfumers, botanical gardens, ceramics studios]
subjects_bad: [fintech, dev tools, sports, nightlife, automotive]
neighbours: [forest-bone-heritage, organic-colour-block, whisper-studio, pantry-label]
fonts: { display: "IM Fell English (Google)", body: "Karla 400/500 (Google)", hebrew: ["Noto Serif Hebrew", "Assistant"] }
---
# Herbarium
Specimen: _specimens/herbarium.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IM+Fell+English&family=Karla:wght@400;500;700&family=Noto+Serif+Hebrew:wght@400;500&family=Assistant:wght@400;600&display=swap">
*/
:root {
  --c-canvas: oklch(95% 0.018 130); --c-surface: oklch(97.5% 0.012 130); --c-surface-2: oklch(90.5% 0.024 130);
  --c-ink: oklch(25% 0.050 152); --c-ink-2: oklch(36% 0.050 152); --c-muted: oklch(50% 0.035 150);
  --c-rule: oklch(25% 0.050 152 / 0.25); --c-accent: oklch(55% 0.13 355); --c-accent-ink: oklch(97.5% 0.012 130);
  --c-focus: oklch(50% 0.14 355);
  --c-bloom: oklch(80% 0.09 355); /* dusty rose for specimen fills, never text */
  --f-display: "IM Fell English", "Noto Serif Hebrew", Georgia, serif; --f-body: "Karla", "Assistant", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "IM Fell English", serif;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.1rem);
  --fs-2xl: clamp(2.1rem, 1.5rem + 2.2vw, 3.2rem); --fs-3xl: clamp(2.7rem, 1.7rem + 3.8vw, 4.6rem);
  --fs-display: clamp(2.9rem, 1.5rem + 4.6vw, 5.6rem);
  --lh-tight: 1.06; --lh-body: 1.6; --tr-display: -0.01em; --tr-label: 0.06em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 36px; --sp-7: 56px; --sp-8: 84px; --sp-9: 124px; --sp-10: 180px;
  --section-y: clamp(72px, 6vw + 36px, 168px); --gutter: clamp(18px, 3vw, 44px); --maxw: 1280px;
  --r-sm: 3px; --r-md: 6px; --r-lg: 14px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.25, 1, 0.5, 1); --ease-in: cubic-bezier(0.5, 0, 0.75, 0); --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
  --d-fast: 180ms; --d-med: 420ms; --d-slow: 1600ms; /* slow = stroke draw */
  --shadow-1: 0 1px 0 var(--c-rule); --shadow-2: 0 18px 36px -24px oklch(25% 0.05 152 / 0.35);
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.15; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Noto Serif Hebrew", "IM Fell English", Georgia, serif; --f-body: "Assistant", "Karla", system-ui, sans-serif; }
```

## Essence
Moss-tinted paper (green hue, not cream), deep botanical green ink for all text, a dusty-rose bloom used only in specimen illustrations and the primary action. Display is an old-foundry roman with ink spread (IM Fell) used sparingly, at modest sizes; body is a plain humanist grotesk. Pages read like herbarium sheets: specimen centred, labels and marginalia around it. Absent: terracotta, gradients, glossy product shots, heavy display sizes, icons.

## Signature moves
1. Specimen sheet: product/plant photographed flat on paper-matched background, centred in a 5:7 frame with a label block (Latin name, origin, harvest; all real) at the bottom-inline-end.
2. Stroke-draw stems: hand SVG botanical lines (1.25px ink) draw along the margin as the section scrolls (`stroke-dashoffset` scrub).
3. Marginalia column: 3-col side notes in Karla 14px ink-2, aligned to paragraphs (Long Document side rail).
4. Specimen tags: 1px ink border, radius 3px, Karla 500 12px +0.06em, sentence case.
5. Fleuron divider (one per page) instead of hairlines.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| moss paper | oklch(95% .018 130) | canvas | cream #F4F1EA family |
| herb ink | oklch(25% .05 152) | all text, strokes | black |
| rose | oklch(55% .13 355) | CTA fill, links hover | large backgrounds |
| bloom | oklch(80% .09 355) | petals in illustrations, sale badge bg | text |
| pressed | oklch(90.5% .024 130) | specimen frames, product plates | shadows |

## Typography
Display IM Fell English 400 (single weight; never faux-bold), max 5.6rem, sentence case; H2 IM Fell `--fs-2xl`. Body Karla 400 17px/1.6; labels Karla 500. Ratio 1.333. Hebrew: Noto Serif Hebrew 500 for display (lh 1.15), Assistant 400 for body; marginalia in Assistant 14px.
Weight-contrast exception (antipatterns #14): IM Fell English (single weight, old-style) against Karla; classification contrast.

## Layout
12-col, max 1280px. Hero: specimen sheet cols 4–9 centred, display at top-inline-start cols 1–6 overlapping the sheet margin, marginal note at cols 10–12. Sections: ingredient index (Latin name list with hover specimen preview), long-form ritual/how-to with marginalia, product grid 3-up specimen frames. Affinity: Specimen, Long Document, Catalogue. Rejects: Stat-Led, Bento, Marquee Hero, Workbench.

## Components
- Nav: wordmark in IM Fell centred, 3 links each side (split nav), cart as "Basket (2)".
- Footer: letter close: short signed note from the maker + address + newsletter line.
- Buttons: 48px, radius 6px, rose fill paper text Karla 700; secondary = 1px ink outline. Hover = ink fill.
- Cards: specimen frames (pressed surface, radius 14px, padding 28px, no border).
- Product card: 5:7 specimen photo on pressed plate, name IM Fell 1.4rem, Latin/descriptor Karla 14px muted, price Karla 500.

## Backgrounds
`.bg-grain` 5% (paper tooth); `.bg-topo` at 5% only if subject is a farm/landscape. No shader-bg.

## Motion (budget 3)
House ease `cubic-bezier(.25,1,.5,1)`. Signature: margin stems draw with scroll (scrub 0.8, reduced motion = drawn). Allowed: `clip-reveal` (specimen photos, vertical), `accordion` (ingredients), `quickview`, `cart`, `pdp`, `cursor` (`data-variant="trail"` in the Latin index only; single specimen preview = recipe). Not: marquee, magnetic, split-reveal chars, shader-bg.

## Imagery
Flat-lay botanicals on paper, soft daylight, green-grey grade; pressed-flower scans; hand ink illustrations. Never: glossy bottle renders with reflections, spa stock (stones + towels), gradient backgrounds.

## RTL notes
Marginalia column moves to the inline-start side (left) automatically via logical grid areas; botanical SVGs are not mirrored (they are specimens), only their placement. Latin names stay LTR in italic-free Karla.

## Do / Don't
- Do green-tinted paper; Don't slide into cream + terracotta.
- Do IM Fell ≤5.6rem; Don't set it at poster size (ink spread turns muddy).
- Do real Latin names/origins; Don't invent provenance.
- Do stroke-draw in margins; Don't draw across body text.
- Do rose for action; Don't tint whole sections rose.
- Do one fleuron; Don't ornament every section.

## Palette drops
- Moss + rose (default). = `tokens.css` above (AA: ink/canvas 13.7 · ink-2/canvas 9.2 · muted/canvas 5.1 · muted/surface 5.5 · accent-ink/accent 4.9 · ink/surface 14.7)
- Lavender field: canvas oklch(95% .015 300), ink oklch(28% .06 300), accent oklch(52% .12 140) leaf.
  Override: `--c-canvas: oklch(95% 0.015 300); --c-surface: oklch(97.5% 0.015 300); --c-surface-2: oklch(90.5% 0.015 300); --c-ink: oklch(28% 0.06 300); --c-ink-2: oklch(38.5% 0.06 300); --c-muted: oklch(53.2% 0.06 300); --c-rule: oklch(28% 0.06 300 / 0.16); --c-accent: oklch(52% 0.12 140); --c-accent-ink: oklch(95% 0.015 300); --c-focus: oklch(52% 0.12 140);`
  AA: ink/canvas 12.8 · ink-2/canvas 8.6 · muted/canvas 4.6 · muted/surface 5.0 · accent-ink/accent 4.5 · ink/surface 13.8
- Chalk + indigo dye: canvas oklch(96% .006 250), ink oklch(28% .09 262), accent oklch(62% .13 60) saffron.
  Override: `--c-canvas: oklch(96% 0.006 250); --c-surface: oklch(98.5% 0.006 250); --c-surface-2: oklch(91.5% 0.006 250); --c-ink: oklch(28% 0.09 262); --c-ink-2: oklch(38.7% 0.09 262); --c-muted: oklch(53.6% 0.09 262); --c-rule: oklch(28% 0.09 262 / 0.16); --c-accent: oklch(66.2% 0.13 60); --c-accent-ink: oklch(28% 0.09 262); --c-focus: oklch(28% 0.09 262);`
  AA: ink/canvas 13.1 · ink-2/canvas 8.7 · muted/canvas 4.6 · muted/surface 5.0 · accent-ink/accent 4.6 · ink/surface 14.1; accent L 62->66% for AA; accent/canvas 2.8 (<3: accent is a fill/surface colour, not text or UI line)

## Knobs
Specimen framing (sheet / circle / full-bleed flat-lay); marginalia on/off; stroke-draw density; split nav vs edge nav; grid 2/3/4-up; fleuron vs whitespace.
