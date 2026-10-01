---
name: swiss-signal-grid
title: Swiss Signal Grid
tagline: "A transit-authority poster system: cool white sheet, the 12-column grid drawn in public, one heavy lowercase grotesk and a single signal ink spent on geometry."
axes: { paper_band: light, display_style: grotesk-heavy, accent_hue: cool, radius_system: "0", density: 6, variance: 6, motion: 3 }
fits: [company, landing, ecommerce]
subjects_good: [architecture, museums, logistics, public-sector, B2B industrial, engineering consultancies, design-tool retail, transport]
subjects_bad: [kids, spa-wellness, bridal, food-comfort, luxury-fashion]
neighbours: [industrial-catalogue, index-mono-gallery, billboard-type, cell-ledger, kikar-heavy, work-wall-neutral]
fonts: { display: "Archivo 800 (Google)", body: "Archivo 400 (Google)", hebrew: ["Heebo"] }
---
# Swiss Signal Grid
Specimen: _specimens/swiss-signal-grid.html

## tokens.css
```css
/* fonts:
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Heebo:wght@300..900&display=swap">
*/
:root {
  --c-canvas: oklch(98.6% 0.004 255); --c-surface: oklch(96.4% 0.005 255); --c-surface-2: oklch(92.5% 0.006 255);
  --c-ink: oklch(17% 0.012 255); --c-ink-2: oklch(33% 0.012 255); --c-muted: oklch(52% 0.010 255);
  --c-rule: oklch(84% 0.008 255); --c-accent: oklch(45% 0.20 264); --c-accent-ink: oklch(98.6% 0.004 255);
  --c-focus: oklch(50% 0.22 264);
  --f-display: "Archivo", "Heebo", system-ui, sans-serif; --f-body: "Archivo", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, "SFMono-Regular", Menlo, monospace; --f-outlier: "Archivo", "Heebo", sans-serif; /* used at font-stretch 62% for labels */
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: clamp(1rem, 0.96rem + 0.15vw, 1.0625rem);
  --fs-lg: clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem); --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.25rem);
  --fs-2xl: clamp(2.25rem, 1.6rem + 2.4vw, 3.75rem); --fs-3xl: clamp(3rem, 1.8rem + 4.8vw, 6rem);
  --fs-display: clamp(3.25rem, 1rem + 9.5vw, 8.5rem);
  --lh-tight: 0.9; --lh-body: 1.55; --tr-display: -0.045em; --tr-label: 0.06em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 72px; --sp-9: 112px; --sp-10: 168px;
  --section-y: clamp(72px, 7vw + 32px, 168px); --gutter: clamp(16px, 2.2vw, 32px); --maxw: 1520px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px; /* radius_system 0: square "pills"; dot marks use 50% */
  --ease-out: cubic-bezier(0.2, 0, 0, 1); --ease-in: cubic-bezier(0.6, 0, 1, 1); --ease-in-out: cubic-bezier(0.7, 0, 0.3, 1);
  --d-fast: 120ms; --d-med: 240ms; --d-slow: 480ms;
  --shadow-1: 0 0 0 1px var(--c-rule); --shadow-2: 0 0 0 2px var(--c-ink);
}
:root[dir="rtl"] { --lh-tight: 1.0; --fs-display: clamp(2.75rem, 1rem + 8vw, 7rem); }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Archivo", system-ui, sans-serif; --f-body: "Heebo", "Archivo", system-ui, sans-serif; }
```

## Essence
A cool, almost clinical white sheet on which the 12-column grid is visible: 1px column rules, baseline ticks and a "marks kit" of constructed geometry. One heavy grotesk in lowercase carries all display text, slammed to the inline-start edge. Colour is rationed to ONE signal ink (ultramarine by default) that appears only as geometry and state, never as a wash. Absent: shadows, gradients, photos with rounded corners, decorative serif, centred compositions.

## Signature moves
1. Exposed grid: `.bg-grid` tuned to the real 12 columns (`background-size: calc((100% - 11*var(--gutter))/12 + var(--gutter)) 100%`), rule colour at 55% opacity; content snaps to it.
2. Display in lowercase Archivo 800, `--tr-display` -0.045em, lh 0.9, bleeding to the inline-start margin (padding-inline-start 0 inside the column).
3. Marks kit (max 3 per page): signal square (0.6em), 3px bar, quarter-disc (`border-radius: 100% 0 0 0`), 45deg diagonal, all in `--c-accent`.
4. Cropped giant numeral ONLY when content is a real sequence (steps, years): 40vw, ink at 7% opacity, clipped by the section edge.
5. Captions set in Archivo at `font-stretch: 62%` 600, 12px, sentence case (no tracked caps eyebrow).

## Colour roles
| name | value | role | never |
|---|---|---|---|
| sheet | oklch(98.6% .004 255) | canvas everywhere | tinted warm |
| ink | oklch(17% .012 255) | all text, 2px rules | replaced by pure #000 |
| rule | oklch(84% .008 255) | 1px grid lines, table rules | text colour |
| signal | oklch(45% .20 264) | marks, active state, primary CTA fill | backgrounds > 1 block per page |
| surface-2 | oklch(92.5% .006 255) | spec panels, product plates | cards with shadow |

## Typography
Display Archivo 800 wdth 100, lowercase, 3–7 words. H2 Archivo 700 `--fs-2xl`, sentence case. Body Archivo 400 wdth 100, 17px/1.55, measure 60ch. Labels Archivo 600 wdth 62 12px +0.06em. Scale ratio 1.333. Weight contrast 800 vs 400 only. Hebrew: Heebo 800 display / 400 body, tracking 0, line-height ≥1.0 (Heebo ascenders taller than Archivo), no lowercase concept, so emphasis comes from size.

## Layout
12-col grid, gutter 24–32px, max 1520px. Hero 70–80dvh: display occupies cols 1–10, a 4-line lede in cols 9–12 aligned to the display baseline. Section rhythm alternates wide (cols 1–12) and offset (cols 4–12) blocks; padding top 1.4× bottom. Affinity: Index-First, Stat-Led (real numbers only), Map/Diagram, Catalogue. Rejects: Photographic full-bleed hero, Bento with rounded tiles, centred Manifesto.

## Components
- Nav: edge-aligned minimal (wordmark at col 1, 3–4 links at cols 9–12, no CTA pill); 64px; hairline bottom only after scroll.
- Footer: dense colophon on the grid (address, contacts, sitemap in 4 grid columns aligned to the same 12-col lines), giant lowercase wordmark cropped at bottom.
- Buttons: rectangular, 0 radius, 48px tall, signal fill with sheet text; secondary = 2px ink underline link. Hover: fill slides in from inline-start (clip-path inset).
- Cards: no cards. Content sits in grid cells separated by 1px rules (`gap:1px` on rule-coloured grid).
- Product card: image on surface-2 plate 4:5, 0 padding; name 15px 600, price tabular-nums; add-to-cart appears as a 3px signal bar on hover.

## Backgrounds
`.bg-grid` (column-true), `.bg-dots` at 24px for spec sections. No shader-bg; no glow.

## Motion (budget 3)
House ease `cubic-bezier(.2,0,0,1)`, 240ms. Signature scroll moment: grid rules draw in (scaleY 0→1, stagger 30ms) as the hero enters, once. Allowed fx: `clip-reveal` (images, horizontal wipe), `counter` (real figures), `split-reveal` (lines, H1 only), `nav`, `accordion`, `map`. No marquee, no cursor, no magnetic.

## Imagery
Architectural or product photography, straight verticals, cool neutral grade, cropped hard to 4:5 or 16:9, 0 radius. Diagrams in 2px ink lines. Never: lifestyle smiles, drop shadows, duotone.

## RTL notes
Grid mirrors via logical properties; marks kit quarter-disc must flip (`border-start-start-radius`). Numerals stay LTR (`dir="ltr"` on spec values). Hebrew display cannot be lowercase: raise weight contrast (Heebo 900 vs 300 body lede).

## Do / Don't
- Do align every block edge to a column line; Don't let an element start between lines.
- Do keep signal ≤3% of viewport; Don't fill a whole section with signal (breaks the rationing that makes it read Swiss).
- Do use 1px rules via grid gap; Don't use box-shadow cards.
- Do set numbers in tabular-nums; Don't use mono for labels (template-chrome tell).
- Do use lowercase display; Don't track display positive.
- Do crop numerals only for real sequences; Don't add `01 / Services` decoration.

## Palette drops
- Ultramarine (default): signal oklch(45% .20 264). = `tokens.css` above (AA: ink/canvas 18.4 · ink-2/canvas 11.7 · muted/canvas 5.3 · muted/surface 5.0 · accent-ink/accent 7.5 · ink/surface 17.2)
- Signal red: signal oklch(57% .215 28), focus same.
  Override: `--c-canvas: oklch(98.6% 0.004 255); --c-surface: oklch(96.4% 0.004 255); --c-surface-2: oklch(92.5% 0.004 255); --c-ink: oklch(17% 0.012 255); --c-ink-2: oklch(33% 0.012 255); --c-muted: oklch(53.7% 0.012 255); --c-rule: oklch(17% 0.012 255 / 0.16); --c-accent: oklch(57% 0.215 28); --c-accent-ink: oklch(98.6% 0.004 255); --c-focus: oklch(57% 0.215 28);`
  AA: ink/canvas 18.4 · ink-2/canvas 11.7 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 4.8 · ink/surface 17.2
- Safety yellow: signal as surface only oklch(88% .17 98) blocks with ink text; focus oklch(45% .2 264).
  Override: `--c-canvas: oklch(98.6% 0.004 255); --c-surface: oklch(96.4% 0.004 255); --c-surface-2: oklch(92.5% 0.004 255); --c-ink: oklch(17% 0.012 255); --c-ink-2: oklch(33% 0.012 255); --c-muted: oklch(53.7% 0.012 255); --c-rule: oklch(17% 0.012 255 / 0.16); --c-accent: oklch(88% 0.17 98); --c-accent-ink: oklch(17% 0.012 255); --c-focus: oklch(45% 0.2 264);`
  AA: ink/canvas 18.4 · ink-2/canvas 11.7 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 13.4 · ink/surface 17.2; accent/canvas 1.4 (<3: accent is a fill/surface colour, not text or UI line)

## Knobs
Signal drop; grid visibility (full lines / ticks only / hidden on body sections); display case (lowercase / sentence); hero anchor (inline-start slam / bottom-left over rule); numeral device on/off; label width (wdth 62 / 75).
