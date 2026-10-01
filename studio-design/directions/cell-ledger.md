---
name: cell-ledger
title: Cell Ledger
tagline: "A trading ledger printed on a dot-matrix: the page is a wall of 1px-ruled cells, type jumps from 16 to 180px between neighbours, art is 1-bit dithered, and one mint cell glows like a live quote."
axes: { paper_band: light, display_style: neo-grotesk, accent_hue: green, radius_system: "0", density: 7, variance: 6, motion: 4 }
fits: [company, landing, ecommerce]
subjects_good: [executive search, finance boutiques, research firms, data and AI consultancies, architecture practices, type foundries, design studios, B2B SaaS with real numbers, conferences, fintech, logistics dashboards, recruitment]
subjects_bad: [kids, spa and wellness, bridal, comfort food, luxury fashion campaigns, funeral services]
neighbours: [industrial-catalogue, swiss-signal-grid, index-mono-gallery, work-wall-neutral]
fonts: { display: "Chivo 500 (Google)", body: "Chivo 400", mono: "Chivo Mono 400 (Google)", hebrew: ["IBM Plex Sans Hebrew", "Heebo"] }
---
# Cell Ledger
Specimen: _specimens/cell-ledger.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;500;600&family=Chivo+Mono:wght@400;500&family=IBM+Plex+Sans+Hebrew:wght@400;500;600&display=swap">
*/
:root {
  --c-canvas: oklch(98.4% 0.002 250); --c-surface: oklch(99.6% 0.001 250); --c-surface-2: oklch(91.5% 0.003 250);
  --c-ink: oklch(24.5% 0.005 250); --c-ink-2: oklch(38% 0.005 250); --c-muted: oklch(52% 0.005 250);
  --c-rule: oklch(24.5% 0.005 250); --c-accent: oklch(92.5% 0.105 162); --c-accent-ink: oklch(24.5% 0.005 250);
  --c-focus: oklch(52% 0.2 262);
  --f-display: "Chivo", "IBM Plex Sans Hebrew", system-ui, sans-serif; --f-body: "Chivo", "IBM Plex Sans Hebrew", system-ui, sans-serif;
  --f-mono: "Chivo Mono", "IBM Plex Sans Hebrew", ui-monospace, monospace; --f-outlier: "Chivo Mono", ui-monospace, monospace;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  --fs-2xl: clamp(2rem, 1.3rem + 2.4vw, 3.25rem); --fs-3xl: clamp(3rem, 1.6rem + 5vw, 6rem);
  --fs-display: clamp(3.5rem, 1rem + 9.5vw, 11.25rem); /* 56 → 180px: the wordmark/number cell */
  --lh-tight: 0.92; --lh-body: 1.45; --tr-display: -0.03em; --tr-label: 0.06em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 20px; --sp-6: 24px; --sp-7: 32px; --sp-8: 48px; --sp-9: 72px; --sp-10: 120px;
  --section-y: 0px; /* sections are rows of cells; air lives INSIDE cells (--cell-pad) */
  --gutter: clamp(16px, 1.6vw, 24px); --maxw: 1920px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px;
  --ease-out: cubic-bezier(0.2, 0, 0, 1); --ease-in: cubic-bezier(0.6, 0, 1, 1); --ease-in-out: cubic-bezier(0.6, 0, 0.2, 1);
  --d-fast: 90ms; --d-med: 200ms; --d-slow: 420ms;
  --shadow-1: none; --shadow-2: inset 0 0 0 1px var(--c-rule);
  /* direction extras */
  --cell-pad: clamp(16px, 1.6vw, 24px); --cell-min: clamp(160px, 18vw, 280px); --rule-w: 1px;
  --img-dither-ink: oklch(24.5% 0.005 250); --img-dither-paper: oklch(91.5% 0.003 250);
}
:root[dir="rtl"] { --f-display: "IBM Plex Sans Hebrew", "Chivo", sans-serif; --f-body: "IBM Plex Sans Hebrew", "Chivo", sans-serif; --tr-display: 0; --tr-label: 0; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "IBM Plex Sans Hebrew", "Chivo", system-ui, sans-serif; --f-body: "Heebo", "Chivo", "IBM Plex Sans Hebrew", system-ui, sans-serif; }
```

## Essence
The page is a ledger: every block is a cell bounded by 1px ink rules (grid `gap:1px` on an ink background, cells filled canvas). Neighbouring cells hold wildly different scales — a 180px wordmark next to a 16px paragraph, a stat number next to a dithered picture — and colour arrives only as whole-cell fills (ink, grey, one mint). Imagery is 1-bit dithered (Bayer 4×4 or Atkinson) in ink on grey, so any source photo becomes on-brand. Absent: radius, shadows, gradients, section padding between rows, floating cards, stock colour photography. Seen in: a US executive-search firm `../references/cases/case-04-company.md`, a designer-developer portfolio `case-39-company.md`, a B2B waste-analytics SaaS landing `case-85-landing.md` (+ 2 more catalogued sites, see `../references/_index.md`).

## Signature moves
1. **Cell grid as the whole layout**: 12-col grid, `gap: var(--rule-w); background: var(--c-rule)`, cells `background: var(--c-canvas); padding: var(--cell-pad)`; rows are sections, no vertical margins.
2. **Scale jump between neighbours**: the display cell (wordmark, number, one word) at `--fs-display` sits beside a body cell at 16px; never two display cells side by side.
3. **Dithered artwork cells**: images rendered 1-bit in `--img-dither-ink` on `--img-dither-paper` (canvas or pre-rendered PNG), optional slow drift; the real photo appears on hover/focus in portraits only.
4. **Stat cells**: each real number owns a cell of a different span and fill (ink, grey, mint); label bottom-start in 12px mono caps.
5. **Live cell in the nav**: a local clock/rate/status in mono with an odometer roll, only when the subject has a real live value.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| canvas | oklch(98.4% .002 250) | default cell fill | page-wide tints |
| ink | oklch(24.5% .005 250) | text, rules, inverse cells | pure #000 |
| grey cell | oklch(91.5% .003 250) | secondary cells, dither paper | text below 4.5:1 |
| mint | oklch(92.5% .105 162) | ONE live/highlight cell per viewport (stat, CTA, client list) | text colour, borders, hover washes |
| focus | oklch(52% .2 262) | focus ring only | decoration |

## Typography
Display Chivo 500, sentence case or caps, `--tr-display` -0.03em, line-height 0.92; body Chivo 400 16/1.45 (never below 15); labels Chivo Mono 400 12px caps +0.06em (labels only, ≤2 lines). Scale by cell: 180 / 96 / 52 / 32 / 20 / 16 / 12. Hebrew: IBM Plex Sans Hebrew 500 display, 400 body; Hebrew labels in Plex Sans Hebrew 500 13px without tracking (mono stays for digits, codes and times, `dir="ltr"`).

## Layout
Full-bleed (max 1920) cell rows. Row recipes: `[display 7 | text 5]`, `[art 4 | stat 2 | stat 2 | text 4]`, `[list 8 | mint 4]`. Cells never shorter than `--cell-min`. Text cells keep 45-65ch by span, not by max-width. Mobile: cells stack 1-up, stats 2-up; the rule grid stays visible. Affinity: Index-First, Catalogue, Spec sheet. Rejects: Photographic full-bleed, centred hero, floating cards.

## Components
- Nav: a row of cells (N8 slab, but 1px): wordmark cell, live cell, 3-5 link cells, inverse "Contact →" cell. 56-64px.
- Buttons: whole-cell buttons (ink fill, canvas text, 0 radius); secondary = cell with text + `→` in mono; hover inverts (instant, 90ms).
- Cards: cells; physics flat; a hover state shifts the dither threshold (image "develops").
- Tables: client/role/year tables as ruled cells, mono numbers right-aligned.
- Footer: a row of word cells (one word per cell, display size) + small legal cells.

## Backgrounds
None but the rule grid. Dithered art is content, not background. Optional `.bg-dots` only inside empty cells.

## Motion (budget 4)
Instant, precise. House ease `cubic-bezier(.2,0,0,1)` 200ms. Signature moment: dither cells "develop" (threshold animates from 0 to target over 600ms on enter) and the nav clock rolls. Allowed fx: `counter` (stats), `text-fx` scramble on mono labels (once), `flip-grid` for filters, `accordion`. Banned: fade-up per cell, parallax, cursor trails, marquee (the grid already scrolls).

## Imagery
Source photos (portraits, buildings, products, abstract renders) converted to 1-bit dither at 2-3px dot size in `--img-dither-*`; one subject per cell, generous negative space; logos as plain ink marks in cells. Never colour stock, gradients, 3D blobs.

## RTL notes
Grid mirrors automatically; display cells swap sides; mono times/numbers stay `dir="ltr"` inside `<bdi>`; dither canvases need no flip (drawn content) but directional arrows in cell buttons flip via `.flip-x`.

## Do / Don't
- Do let rules be ink (full contrast); Don't use grey hairlines (that is industrial-catalogue).
- Do keep one mint cell per viewport; Don't tint rows mint.
- Do put air inside cells; Don't add margins between rows.
- Do make numbers real (placements, years, sizes); Don't invent stats to fill stat cells.
- Do keep it a grid of cells (rules on both axes, full ink); Don't slide into antipatterns A4 (hairline under every row + tracked caps kickers) or A13 (mono on everything: mono is for times, codes and labels only).
- Do dither every photo the same way; Don't mix dithered and colour photos in one row.

## Palette drops
- Mint quote (default). = `tokens.css` above (AA: ink/canvas 15.5 · ink-2/canvas 9.6 · muted/canvas 5.3 · muted/surface 5.4 · accent-ink/accent 13.5 · ink/surface 16.0; accent/canvas 1.1 (<3: mint is a cell fill, never text or a line))
- Signal orange cell: same paper and ink, the live cell turns orange.
  Override: `--c-canvas: oklch(98.4% 0.002 250); --c-surface: oklch(99.6% 0.001 250); --c-surface-2: oklch(91.5% 0.003 250); --c-ink: oklch(24.5% 0.005 250); --c-ink-2: oklch(38% 0.005 250); --c-muted: oklch(52% 0.005 250); --c-rule: oklch(24.5% 0.005 250); --c-accent: oklch(70% 0.19 45); --c-accent-ink: oklch(20% 0.005 250); --c-focus: oklch(52% 0.2 262);`
  AA: ink/canvas 15.5 · ink-2/canvas 9.6 · muted/canvas 5.3 · muted/surface 5.4 · accent-ink/accent 6.3 · ink/surface 16.0; accent/canvas 2.7 (<3: fill only)
- Night ledger: ink canvas, light rules at 22%, mint cells.
  Override: `--c-canvas: oklch(17% 0.006 250); --c-surface: oklch(21% 0.006 250); --c-surface-2: oklch(27% 0.006 250); --c-ink: oklch(95% 0.004 250); --c-ink-2: oklch(80% 0.004 250); --c-muted: oklch(66% 0.004 250); --c-rule: oklch(95% 0.004 250 / 0.22); --c-accent: oklch(88% 0.13 162); --c-accent-ink: oklch(17% 0.006 250); --c-focus: oklch(88% 0.13 162);`
  AA: ink/canvas 16.5 · ink-2/canvas 10.2 · muted/canvas 6.1 · muted/surface 5.7 · accent-ink/accent 14.0 · ink/surface 15.3 (dither paper becomes `--c-surface-2`, dots `--c-ink`)

## Knobs
Rule weight (1px / 2px); dither algorithm (Bayer 4×4 / Atkinson / halftone dots); display voice (wordmark / number / one word); live cell (clock / rate / status / none); caps vs sentence display; mint cell position (hero / stats / footer CTA).
