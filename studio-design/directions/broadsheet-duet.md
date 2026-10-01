---
name: broadsheet-duet
title: Broadsheet Duet
status: attractor-guarded   # sits on current AI attractor A4 (broadsheet hairlines, 0 radius). Use only when the brief demands it.
tagline: "A serious weekly on bright stock: a didone headline, a text serif that reads for 20 minutes, and one blue that means 'link'."
axes: { paper_band: light, display_style: high-contrast-serif, accent_hue: cool, radius_system: "0", density: 7, variance: 4, motion: 1 }
fits: [company, landing]
subjects_good: [publications, journalism, think-tanks, law/finance thought leadership WITH ≥6 real articles, universities, literary festivals, archives]
subjects_bad: [anything without real long-form content, e-commerce, apps, kids, nightlife]
neighbours: [architect-calm, riso-two-ink, swiss-signal-grid]
fonts: { display: "Bodoni Moda 700 (Google)", body: "Literata 400", labels: "Libre Franklin 600", hebrew: ["Frank Ruhl Libre", "David Libre", "Heebo"] }
---
# Broadsheet Duet (use only when brief demands)
Specimen: _specimens/broadsheet-duet.html

## Guard (read first)
Pick this ONLY if (a) the brief says newspaper/magazine/journal/publication, or (b) the site's primary content is ≥6 real long-form articles. Even then, break the attractor: no cream paper (canvas is bright cool white), no hairline under every row (use whitespace + a 3px masthead rule), no dense 5-column text walls, no ALL-CAPS tracked kickers over every headline.

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400..900&family=Literata:opsz,wght@7..72,400;7..72,600&family=Libre+Franklin:wght@400;600;800&family=Frank+Ruhl+Libre:wght@400..900&family=David+Libre:wght@400;500;700&family=Heebo:wght@400;600&display=swap">
*/
:root {
  --c-canvas: oklch(99% 0.002 240); --c-surface: oklch(97% 0.003 240); --c-surface-2: oklch(93.5% 0.004 240);
  --c-ink: oklch(14% 0.006 250); --c-ink-2: oklch(30% 0.006 250); --c-muted: oklch(50% 0.006 250);
  --c-rule: oklch(14% 0.006 250); --c-accent: oklch(52% 0.15 245); --c-accent-ink: oklch(99% 0.002 240);
  --c-focus: oklch(52% 0.15 245);
  --f-display: "Bodoni Moda", "Frank Ruhl Libre", Didot, serif; --f-body: "Literata", "David Libre", Georgia, serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Libre Franklin", "Heebo", system-ui, sans-serif; /* labels, bylines */
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.125rem; --fs-lg: 1.3125rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.1rem);
  --fs-2xl: clamp(2.2rem, 1.6rem + 2.2vw, 3.3rem); --fs-3xl: clamp(3rem, 1.8rem + 4.4vw, 5.5rem);
  --fs-display: clamp(3.25rem, 1.4rem + 6.4vw, 7.5rem);
  --lh-tight: 1.02; --lh-body: 1.62; --tr-display: -0.012em; --tr-label: 0.02em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 64px; --sp-9: 96px; --sp-10: 144px;
  --section-y: clamp(48px, 4vw + 24px, 112px); --gutter: clamp(16px, 2.4vw, 36px); --maxw: 1360px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px; /* square "pills"; modules that need a true circle (cursor, swatches, avatars, close/toggle buttons) use 50% literals */
  --ease-out: cubic-bezier(0.25, 0.1, 0.25, 1); --ease-in: cubic-bezier(0.42, 0, 1, 1); --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
  --d-fast: 120ms; --d-med: 200ms; --d-slow: 360ms;
  --shadow-1: none; --shadow-2: none;
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.1; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Frank Ruhl Libre", "Bodoni Moda", Didot, serif; --f-body: "David Libre", "Literata", Georgia, serif; }
```

## Essence
Three faces in strict roles: didone display (Bodoni Moda 700, opsz 96), text serif for reading (Literata 18px/1.62, 66ch), grotesk for bylines/labels (Libre Franklin 600). Bright cool white, black ink, one link blue. Hierarchy comes from a story grid: 1 lead + 2-up + bylined rows. Absent: cream, rounded anything, shadows, icons, motion beyond hover underlines.

## Signature moves
1. Masthead: publication name in Bodoni Moda 900 at `--fs-3xl` centred over a 3px rule, date line in Libre Franklin (real date).
2. Story grid: lead story 8 cols with image 3:2, two stories 4 cols, then a row of 3 bylined text-only items; separated by whitespace, not hairlines.
3. Drop cap on article openings: Bodoni Moda 700, 3 lines.
4. Pull quote at `--fs-2xl` in Bodoni Moda 400 with a 3px ink rule above only.
5. Link blue underlines 1px offset 0.18em, thicken to 2px on hover.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| stock | oklch(99% .002 240) | canvas | cream/ivory |
| ink | oklch(14% .006 250) | text, masthead rule | grey body text |
| link blue | oklch(52% .15 245) | inline links, focus | buttons fills everywhere |
| surface-2 | oklch(93.5% .004 240) | newsletter box, sidebar | card shadows |

## Typography
Scale ratio 1.25 from 18px. Headline lengths: lead ≤12 words; deck (standfirst) Literata 400 `--fs-lg`. Bylines Libre Franklin 600 13px sentence case. Hebrew: Frank Ruhl Libre 900 display, David Libre 400 body (18px, lh 1.7), Heebo 600 labels; no italics, drop cap disabled for Hebrew.

## Layout
12-col, max 1360px, article column 66ch centred with notes in the margin at ≥1200px. Affinity: Long Document, Index-First, Quote-Led. Rejects: Bento, Marquee Hero, Photographic, Stat-Led.

## Components
- Nav: newspaper masthead (N6): masthead + one line of 5–7 sections + search icon.
- Footer: dense colophon: sections, about, ethics/corrections policy, contact, newsletter.
- Buttons: rectangular, ink fill, stock text, Libre Franklin 600 15px, 44px; only for subscribe/submit.
- Cards: none; stories are text blocks with optional images.
- Product card (subscriptions): 2 plans side by side in surface-2 blocks, price in Bodoni Moda.

## Backgrounds
None.

## Motion (budget 1)
Hover underline thickness only (120ms). Allowed: `accordion` (FAQ/corrections), `nav` (mobile). Nothing else.

## Imagery
Reportage photography with captions and credits (real), 3:2; charts in ink + link blue. Never: stock, illustrations of people, AI images presented as news photos.

## RTL notes
Story grid mirrors; masthead centred stays; bylines/dates use Intl for Hebrew calendar if required. Drop caps off in Hebrew.

## Do / Don't
- Do bright white; Don't use cream (#F4F1EA family).
- Do whitespace separators; Don't hairline every row.
- Do three faces in fixed roles; Don't add a fourth.
- Do real dates/bylines; Don't invent authors.
- Do 66ch measure; Don't set 100ch text.
- Do sentence-case labels; Don't tracked caps kickers above every headline.

## Palette drops
- Stock + link blue (default). = `tokens.css` above (AA: ink/canvas 19.3 · ink-2/canvas 13.2 · muted/canvas 5.8 · muted/surface 5.5 · accent-ink/accent 5.2 · ink/surface 18.3)
- Salmon weekly: canvas oklch(93% .03 45) (financial-paper pink), link oklch(45% .12 250).
  Override: `--c-canvas: oklch(93% 0.03 45); --c-surface: oklch(91% 0.03 45); --c-surface-2: oklch(87.5% 0.03 45); --c-ink: oklch(14% 0.006 250); --c-ink-2: oklch(28.9% 0.006 250); --c-muted: oklch(49.7% 0.006 250); --c-rule: oklch(14% 0.006 250 / 0.16); --c-accent: oklch(45% 0.12 250); --c-accent-ink: oklch(93% 0.03 45); --c-focus: oklch(45% 0.12 250);`
  AA: ink/canvas 16.1 · ink-2/canvas 11.4 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 6.0 · ink/surface 15.1
- Night edition: canvas oklch(15% .006 250), ink oklch(94% .004 240), link oklch(75% .12 240).
  Override: `--c-canvas: oklch(15% 0.006 250); --c-surface: oklch(19.5% 0.006 250); --c-surface-2: oklch(24% 0.006 250); --c-ink: oklch(94% 0.004 240); --c-ink-2: oklch(79.8% 0.004 240); --c-muted: oklch(59.9% 0.004 240); --c-rule: oklch(94% 0.004 240 / 0.16); --c-accent: oklch(75% 0.12 240); --c-accent-ink: oklch(15% 0.006 250); --c-focus: oklch(75% 0.12 240);`
  AA: ink/canvas 16.5 · ink-2/canvas 10.5 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 9.0 · ink/surface 15.3

## Knobs
Masthead size; story grid (1+2+3 / 1+4 / 2+2); drop caps on/off; margin notes on/off; image ratio 3:2 / 4:5.
