---
name: inflatable-pop
title: Inflatable Pop
tagline: "A sticker wall on sky-wash paper: crushed display words become sculptures, six sticker colours as a set, black outlines, no shadows."
axes: { paper_band: light, display_style: crushed-display, accent_hue: multi, radius_system: pill, density: 5, variance: 8, motion: 7 }
fits: [landing, ecommerce, company]
subjects_good: [festivals, youth fintech, consumer apps, snacks and drinks DTC, vitamins/gummies, toy stores, events, student programs]
subjects_bad: [law, funerals, luxury, heavy B2B, medical clinics]
neighbours: [storybook-sketch, dev-playground, organic-colour-block, pantry-label]
fonts: { display: "Bricolage Grotesque 800 wdth 75 (Google)", body: "Bricolage Grotesque 400 opsz 14", hebrew: ["Rubik"] }
---
# Inflatable Pop
Specimen: _specimens/inflatable-pop.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Rubik:wght@400..900&display=swap">
*/
:root {
  --c-canvas: oklch(94% 0.035 240); --c-surface: oklch(99% 0.005 240); --c-surface-2: oklch(86% 0.006 240);
  --c-ink: oklch(16% 0.020 265); --c-ink-2: oklch(30% 0.020 265); --c-muted: oklch(46% 0.020 265);
  --c-rule: oklch(16% 0.020 265); --c-accent: oklch(64% 0.23 35); --c-accent-ink: oklch(16% 0.020 265);
  --c-focus: oklch(52% 0.22 280);
  /* sticker set (use as a set, max 3 per viewport) */
  --st-blue: oklch(70% 0.15 250); --st-mint: oklch(81% 0.14 160); --st-lav: oklch(88% 0.07 310);
  --st-ember: oklch(64% 0.23 35); --st-sun: oklch(89% 0.17 95); --st-violet: oklch(52% 0.22 280);
  --f-display: "Bricolage Grotesque", "Rubik", system-ui, sans-serif; --f-body: "Bricolage Grotesque", "Rubik", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Bricolage Grotesque", sans-serif;
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.0625rem; --fs-lg: 1.375rem; --fs-xl: clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem);
  --fs-2xl: clamp(2.5rem, 1.6rem + 3.4vw, 4.75rem); --fs-3xl: clamp(3.5rem, 1.8rem + 7vw, 9rem);
  --fs-display: clamp(4rem, 0.5rem + 13vw, 14rem);
  --lh-tight: 0.8; --lh-body: 1.5; --tr-display: -0.02em; /* was -0.04em: at wdth 75 stems collided ("mi" merged) in the 2026-09 specimen audit */ --tr-label: 0.03em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 80px; --sp-9: 120px; --sp-10: 176px;
  --section-y: clamp(64px, 6vw + 32px, 160px); --gutter: clamp(16px, 3vw, 44px); --maxw: 1480px;
  --r-sm: 12px; --r-md: 28px; --r-lg: 40px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.34, 1.4, 0.64, 1); /* soft overshoot: stickers only */ --ease-in: cubic-bezier(0.5, 0, 0.75, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 160ms; --d-med: 380ms; --d-slow: 800ms;
  --shadow-1: none; --shadow-2: none;
}
.display { font-variation-settings: "wdth" 75, "opsz" 96; font-weight: 800; }
:root[dir="rtl"] { --lh-tight: 0.95; --tr-display: -0.01em; --fs-display: clamp(3.5rem, 0.5rem + 11vw, 12rem); }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Rubik", "Bricolage Grotesque", system-ui, sans-serif; --f-body: "Rubik", "Bricolage Grotesque", system-ui, sans-serif; }
```

## Essence
Sky-wash paper wall with stickers: words set at 200–640px with crushed leading (0.8) behave like inflatable sculptures, overlapped by rotated sticker shapes in a fixed six-colour set. Everything has a 1px ink outline and zero shadows or gradients; CTAs are black only. Absent: glass, gradients, drop shadows, grey corporate icons, thin type.

## Signature moves
1. Crushed display (wdth 75, lh 0.8, -0.02em; the crush is leading + width, not letter collisions) at 13vw+, with one sticker overlapping a letter.
2. Sticker kit: SVG shapes (star burst, pill, blob, circle with text path) in the six set colours, 1px ink outline, rotated −12…+12°.
3. Pill labels 700 +0.03em on sticker colours (≤3 colours per viewport).
4. Exactly one marquee: a thick ink band with sticker-coloured words.
5. Squash hover on stickers and CTAs: scale(1.06, 0.94) → back with the overshoot ease.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| sky wash | oklch(94% .035 240) | canvas | white page |
| white | oklch(99% .005 240) | cards, forms | canvas |
| ink | oklch(16% .02 265) | text, outlines, CTA fill | grey text |
| sticker set | 6 tokens above | shapes, pills, tile fills | gradients between them |
| ember (accent) | oklch(64% .23 35) | links hover, badges | body text |

## Typography
Display Bricolage 800 wdth 75 opsz 96, tracking -0.02em (never tighter: stems touch), lowercase or sentence. H2 800 wdth 85 `--fs-2xl`, lh 0.9. Body 400 wdth 100 opsz 14, 17px. Pills 700 13px +0.03em. Ratio 1.5+ (big jumps). Hebrew: Rubik 900 display (lh 0.95, no crush below 0.95 or niqqud/ascenders collide), Rubik 400 body.

## Layout
12-col, max 1480px, deliberate overlaps. Hero: two-line crushed word filling width, stickers overlapping, 1 short line + black pill below. Sections: colour tile grid (tiles 28–40px radius, each a sticker colour, max 3 colours per row), a full-bleed marquee, a playful FAQ, pastel concrete bands (`--c-surface-2`). Affinity: Marquee Hero, Bento (irregular), Portfolio Grid. Rejects: Long Document, Specimen, Workbench.

## Components
- Nav: sticker sheet (not the AI nav #33): links are die-cut stickers stuck along the top edge at ±2° with a white 3px border and the direction's shadow, the current page's sticker is peeled up (rotate + shadow); the CTA is the biggest sticker in the accent. No container pill. Mobile: a sticker button opens the menu.
- Footer: giant crushed wordmark + sticker pile + inline links; newsletter pill.
- Buttons: pill 52px, ink fill, white text 700; hover = squash; secondary = white pill with 1px ink outline.
- Cards: flat colour tiles, 1px ink outline, radius 28px, no shadow.
- Product card: product render on a sticker-colour tile (1:1), name 700, price in a white pill at the bottom-inline-end corner, 1px outline.

## Backgrounds
Flat colour; `.bg-dots` 20px at 8% ink on one section max. No shader-bg (gradients break the flat sticker language).

## Motion (budget 7)
House ease (overshoot) for stickers/CTAs only; UI state uses `--ease-in-out`. Signature: stickers drift at different parallax speeds (yPercent −20…+30, scrub) around the hero word. Allowed: `marquee` (one), `magnetic` (stickers), `split-reveal` (`data-type="chars"` Latin / words Hebrew; bounce ease = recipe, module eases are fixed), `stack-cards`, `flip-grid`, `cart`, `quickview`. Not: shader-bg, cursor followers, clip-reveal on everything.

## Imagery
3D renders or cut-out products with flat backgrounds matching sticker colours; photos cropped into pill or circle masks with 1px ink outline. Never: gradient-lit 3D blobs, stock people in offices, dark photos.

## RTL notes
Sticker rotations mirror (multiply angle by `SD.dir()`); marquee direction flips; text paths on stickers need Hebrew copy set separately. Hebrew display cannot use the wdth axis, so the "crush" comes from Rubik 900 + lh 0.95 + larger size.

## Do / Don't
- Do outlines 1px ink everywhere; Don't add drop shadows.
- Do ≤3 sticker colours per viewport; Don't use all six in one row.
- Do black CTAs; Don't colour the CTA ember.
- Do lh 0.8 only for Latin display ≥ 6rem; Don't crush body or Hebrew.
- Do one marquee; Don't add a second ticker.
- Do overshoot on stickers; Don't overshoot on menus, cart, forms.

## Palette drops
- Sky wash (default). = `tokens.css` above (AA: ink/canvas 16.3 · ink-2/canvas 11.5 · muted/canvas 6.0 · muted/surface 6.9 · accent-ink/accent 5.2 · ink/surface 18.9)
- Acid lime DTC: canvas oklch(93% .19 122), tiles white, CTA ink, stickers mint/violet/ember.
  Override: `--c-canvas: oklch(93% 0.19 122); --c-surface: oklch(98% 0.19 122); --c-surface-2: oklch(85% 0.19 122); --c-ink: oklch(16% 0.02 265); --c-ink-2: oklch(29.8% 0.02 265); --c-muted: oklch(52.2% 0.02 265); --c-rule: oklch(16% 0.02 265 / 0.16); --c-accent: oklch(64% 0.23 35); --c-accent-ink: oklch(16% 0.02 265); --c-focus: oklch(64% 0.23 35);`
  AA: ink/canvas 16.4 · ink-2/canvas 11.6 · muted/canvas 4.6 · muted/surface 4.9 · accent-ink/accent 5.2 · ink/surface 17.4
- Bubblegum: canvas oklch(90% .06 355), stickers blue/sun/mint.
  Override: `--c-canvas: oklch(90% 0.06 355); --c-surface: oklch(95% 0.06 355); --c-surface-2: oklch(82% 0.06 355); --c-ink: oklch(16% 0.02 265); --c-ink-2: oklch(29.3% 0.02 265); --c-muted: oklch(48.6% 0.02 265); --c-rule: oklch(16% 0.02 265 / 0.16); --c-accent: oklch(64% 0.23 35); --c-accent-ink: oklch(16% 0.02 265); --c-focus: oklch(16% 0.02 265);`
  AA: ink/canvas 14.0 · ink-2/canvas 10.1 · muted/canvas 4.6 · muted/surface 5.2 · accent-ink/accent 5.2 · ink/surface 15.7; accent/canvas 2.7 (<3: accent is a fill/surface colour, not text or UI line)

## Knobs
Display width (75/85/100); sticker density (2/4/7 per viewport); canvas drop; tile grid irregularity; marquee position (under hero / before footer); product render vs cut-out photo.
