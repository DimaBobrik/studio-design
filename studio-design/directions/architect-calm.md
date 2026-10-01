---
name: architect-calm
title: Architect Calm
tagline: "A large practice's quiet archive on concrete-grey paper: one regular-weight sans, photographs staggered like pinned prints, and nothing that raises its voice."
axes: { paper_band: light, display_style: regular-grotesk, accent_hue: cool, radius_system: "0", density: 4, variance: 7, motion: 3 }
fits: [company, landing]
subjects_good: [architecture firms, law firms, accounting, clinics, engineering consultancies, foundations, universities, accessibility/compliance practices]
subjects_bad: [nightlife, youth brands, flash sales, games, kids]
neighbours: [whisper-studio, index-mono-gallery, broadsheet-duet, work-wall-neutral]
fonts: { display: "Instrument Sans 400 (Google)", body: "Instrument Sans 400/500", hebrew: ["Noto Sans Hebrew", "Assistant"] }
---
# Architect Calm
Specimen: _specimens/architect-calm.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&family=Noto+Sans+Hebrew:wght@300..600&display=swap">
*/
:root {
  --c-canvas: oklch(96.8% 0.004 120); --c-surface: oklch(99% 0.002 120); --c-surface-2: oklch(92.5% 0.006 120);
  --c-ink: oklch(22% 0.008 120); --c-ink-2: oklch(36% 0.008 120); --c-muted: oklch(52% 0.008 120);
  --c-rule: oklch(84% 0.006 120); --c-accent: oklch(46% 0.07 200); --c-accent-ink: oklch(99% 0.002 120);
  --c-focus: oklch(46% 0.09 200);
  --f-display: "Instrument Sans", "Noto Sans Hebrew", system-ui, sans-serif; --f-body: "Instrument Sans", "Noto Sans Hebrew", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Instrument Sans", sans-serif; /* wdth 75 for dates/captions */
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.9rem);
  --fs-2xl: clamp(2rem, 1.5rem + 1.8vw, 2.8rem); --fs-3xl: clamp(2.5rem, 1.8rem + 2.8vw, 3.8rem);
  --fs-display: clamp(2.5rem, 1.4rem + 3.8vw, 4.75rem);
  --lh-tight: 1.08; --lh-body: 1.6; --tr-display: -0.025em; --tr-label: 0;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 40px; --sp-7: 64px; --sp-8: 96px; --sp-9: 144px; --sp-10: 208px;
  --section-y: clamp(80px, 7vw + 36px, 192px); --gutter: clamp(16px, 2.5vw, 40px); --maxw: 1560px;
  --r-sm: 2px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px;
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1); --ease-in: cubic-bezier(0.32, 0, 0.67, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 150ms; --d-med: 450ms; --d-slow: 1000ms;
  --shadow-1: none; --shadow-2: 0 1px 0 var(--c-rule);
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.15; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Noto Sans Hebrew", "Instrument Sans", system-ui, sans-serif; --f-body: "Assistant", "Instrument Sans", "Noto Sans Hebrew", system-ui, sans-serif; }
```

## Essence
Restraint as authority. Concrete-grey paper (green-grey hue 120, not beige), one sans at regular weight for everything (display at 400, never bold), and photography staggered across the grid like prints pinned at different heights. The accent is a quiet fjord teal used only for links and focus. Content is organised as an archive: projects/services/people with real dates and places. Absent: bold headlines, cards, icons, gradients, badges, carousels with arrows, hero CTAs shouting.

## Signature moves
1. Staggered collage: images placed on a 12-col grid with varied spans (3, 4, 5, 7) and vertical offsets (0, 64, 144px), never aligned in rows; captions under each (project, city, year).
2. Regular-weight display: Instrument Sans 400 at 4.75rem max, -0.025em; hierarchy by size and space only.
3. Dated news/insight rail: horizontally scrollable list of real items with date in wdth 75 captions.
4. Filterable index: projects/services as a text list with filters (typology, year, location) and hover image preview.
5. Inline-start text column fixed at 5 cols; imagery owns the rest.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| concrete paper | oklch(96.8% .004 120) | canvas | beige/cream |
| white | oklch(99% .002 120) | image mats, forms | cards with shadow |
| ink | oklch(22% .008 120) | text | pure black |
| fjord teal | oklch(46% .07 200) | links, focus, active filter | buttons fills in bulk, backgrounds |

## Typography
Display/H1 Instrument Sans 400 wdth 100; H2 400 `--fs-2xl`; body 400 17px/1.6 measure 62ch; captions Instrument Sans 400 wdth 75 14px muted. Only weights 400/500. Ratio 1.25. Hebrew: Noto Sans Hebrew 400 (300 for display at large sizes), lh 1.15; tracking 0.
Weight-contrast exception (antipatterns #14): deliberate one-weight system (the essence is "nothing raises its voice"); hierarchy by size ≥2.5× and ink vs muted.

## Layout
12-col, max 1560px. Hero: one sentence (≤14 words) at `--fs-display` cols 1–8, then the staggered collage begins immediately (no full-bleed hero image). Sections: selected work collage, practice/services as long text with side captions, people index (names + roles, portrait on hover), news rail, contact with map and offices. Affinity: Index-First, Portfolio Grid (staggered), Long Document, Map/Diagram. Rejects: Marquee Hero, Bento, Stat-Led, Manifesto.

## Components
- Nav: edge-aligned minimal (wordmark · Work · Practice · People · News · Contact), 64px, no CTA button; language switch as text.
- Footer: dense colophon: offices with addresses, phone, email, social as text, legal, accessibility statement link.
- Buttons: rarely needed; text links with 1px underline; form submit = 48px ink fill, 2px radius, Instrument Sans 500.
- Cards: none; images + captions.
- Product card (if services/publications): title 500, 2-line description, date caption; no image required.

## Backgrounds
Flat canvas. Nothing else.

## Motion (budget 3)
House ease `cubic-bezier(.33,1,.68,1)` 450ms; Lenis lerp 0.1. Signature: collage images reveal with a single clip-path inset from bottom (1s) as they enter, staggered by their vertical offset (natural cascade). Allowed: `clip-reveal`, `cursor` (`data-variant="trail"`; single index preview image = recipe), `hscroll` (news rail; or native scroll-snap), `accordion`, `map`, `flip-grid` (index filters), `nav`. Not: split-reveal chars, marquee, magnetic, shader-bg, counters.

## Imagery
Architectural photography with people small, overcast or soft daylight, true colours, 4:5 and 3:2 mixed; portraits in natural light. For law/clinics: photos of the actual office, city, team; never stock gavels/handshakes/stethoscopes.

## RTL notes
Collage offsets mirror via logical grid placement (`grid-column` computed from inline-start); captions follow; dates via `Intl.DateTimeFormat('he-IL')`; project names in Latin keep `dir="auto"`.

## Do / Don't
- Do weight 400 display; Don't bold headings to "add hierarchy".
- Do stagger images; Don't align them in equal rows of 3.
- Do real captions (project, city, year); Don't caption with slogans.
- Do teal for links only; Don't fill buttons teal everywhere.
- Do text-only nav; Don't add a "Get a quote" pill in nav.
- Do generous section gaps (≥96px); Don't compress to a landing-page rhythm.

## Palette drops
- Concrete + fjord (default). = `tokens.css` above (AA: ink/canvas 15.8 · ink-2/canvas 9.9 · muted/canvas 5.0 · muted/surface 5.3 · accent-ink/accent 6.7 · ink/surface 16.8)
- Ledger (professional services): canvas oklch(98% .003 90), ink oklch(28% .01 230), accent oklch(45% .1 250); spot pastel tags for practice areas: oklch(94% .03 20)/oklch(94% .03 240)/oklch(94% .03 150).
  Override: `--c-canvas: oklch(98% 0.003 90); --c-surface: oklch(99.5% 0.003 90); --c-surface-2: oklch(93.7% 0.003 90); --c-ink: oklch(28% 0.01 230); --c-ink-2: oklch(41.1% 0.01 230); --c-muted: oklch(54.8% 0.01 230); --c-rule: oklch(28% 0.01 230 / 0.16); --c-accent: oklch(45% 0.1 250); --c-accent-ink: oklch(98% 0.003 90); --c-focus: oklch(45% 0.1 250);`
  AA: ink/canvas 13.7 · ink-2/canvas 8.3 · muted/canvas 4.6 · muted/surface 4.8 · accent-ink/accent 7.0 · ink/surface 14.4
- Nordic night: canvas oklch(20% .008 230), ink oklch(93% .005 230), accent oklch(75% .07 200).
  Override: `--c-canvas: oklch(20% 0.008 230); --c-surface: oklch(24.5% 0.008 230); --c-surface-2: oklch(29% 0.008 230); --c-ink: oklch(93% 0.005 230); --c-ink-2: oklch(79.9% 0.005 230); --c-muted: oklch(62.9% 0.005 230); --c-rule: oklch(93% 0.005 230 / 0.16); --c-accent: oklch(75% 0.07 200); --c-accent-ink: oklch(20% 0.008 230); --c-focus: oklch(75% 0.07 200);`
  AA: ink/canvas 14.7 · ink-2/canvas 9.7 · muted/canvas 5.2 · muted/surface 4.6 · accent-ink/accent 8.4 · ink/surface 13.2

## Knobs
Collage density (5/8/12 images); hero sentence vs single project image; index with/without preview; news rail on/off; caption width axis 75/100; section gap scale.
