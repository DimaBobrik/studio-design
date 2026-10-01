---
name: telemetry-terminal
title: Telemetry Terminal
tagline: "An abyssal instrument panel: teal-black glass, phosphor numerals that are real, and one sodium-amber signal for what needs your hand."
axes: { paper_band: dark, display_style: grotesk-medium+mono, accent_hue: yellow, radius_system: sharp, density: 8, variance: 5, motion: 5 }
fits: [landing, company]
subjects_good: [fintech infra, security, dev tools, observability, energy grids, trading, data products, logistics tracking]
subjects_bad: [fashion, food, kids, wellness, weddings, crafts]
neighbours: [index-mono-gallery, apparatus-night, media-bento-night]
fonts: { display: "Geist 700 (Google)", body: "Geist 400", mono: "Geist Mono", hebrew: ["Noto Sans Hebrew", "Cousine"] }
---
# Telemetry Terminal
Specimen: _specimens/telemetry-terminal.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&family=Noto+Sans+Hebrew:wght@300..700&family=Cousine:wght@400;700&display=swap">
*/
:root {
  --c-canvas: oklch(15% 0.020 200); --c-surface: oklch(19% 0.022 200); --c-surface-2: oklch(23% 0.025 200);
  --c-ink: oklch(93% 0.010 190); --c-ink-2: oklch(80% 0.012 190); --c-muted: oklch(62% 0.020 200);
  --c-rule: oklch(30% 0.025 200); --c-accent: oklch(80% 0.16 75); --c-accent-ink: oklch(15% 0.020 200);
  --c-focus: oklch(80% 0.16 75);
  --c-ok: oklch(78% 0.12 170); --c-alert: oklch(66% 0.19 28); /* state only, next to real data */
  --f-display: "Geist", "Noto Sans Hebrew", system-ui, sans-serif; --f-body: "Geist", "Noto Sans Hebrew", system-ui, sans-serif;
  --f-mono: "Geist Mono", "Cousine", ui-monospace, monospace; --f-outlier: "Geist Mono", monospace;
  --fs-xs: 0.75rem; /* ≥12px */ --fs-sm: 0.8125rem; --fs-base: 0.9375rem; --fs-lg: 1.125rem; --fs-xl: 1.5rem;
  --fs-2xl: clamp(2rem, 1.5rem + 1.8vw, 3rem); --fs-3xl: clamp(2.6rem, 1.8rem + 3.2vw, 4.5rem);
  --fs-display: clamp(2.8rem, 1.4rem + 4.8vw, 5.75rem);
  --lh-tight: 1.0; --lh-body: 1.55; --tr-display: -0.04em; --tr-label: 0.02em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 20px; --sp-6: 24px; --sp-7: 32px; --sp-8: 48px; --sp-9: 80px; --sp-10: 128px;
  --section-y: clamp(56px, 5vw + 24px, 120px); --gutter: clamp(16px, 2.2vw, 32px); --maxw: 1440px;
  --r-sm: 2px; --r-md: 4px; --r-lg: 8px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1); --ease-in: cubic-bezier(0.6, 0, 1, 1); --ease-in-out: cubic-bezier(0.6, 0, 0.4, 1);
  --d-fast: 90ms; --d-med: 200ms; --d-slow: 420ms;
  --shadow-1: inset 0 1px 0 oklch(100% 0 0 / 0.05); --shadow-2: 0 0 0 1px var(--c-rule), 0 24px 48px -24px oklch(5% 0.02 200 / 0.9);
}
:root[dir="rtl"] { --tr-display: 0; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Noto Sans Hebrew", "Geist", system-ui, sans-serif; --f-body: "Noto Sans Hebrew", "Geist", system-ui, sans-serif; }
```

## Essence
A deep teal-black instrument panel: surfaces step up by lightness (+4% L per level), never by shadow. Display is a medium-weight grotesk with aggressive negative tracking; every number is monospaced and REAL (pulled from the product, an API or the brief). One sodium-amber accent marks action and live signal. Absent: acid green, purple glows, fake dashboards built from divs, decorative status dots, gradients on text.

## Signature moves
1. Readout blocks: mono numerals at `--fs-3xl` with unit + source line under (e.g. "p95 latency, last 24h, status page").
2. Scramble-decode on the hero headline once on load (`text-fx` scramble, 600ms), then static.
3. Panel grid: 1px rule lines between panels (`gap:1px` on `--c-rule`), 2px radius at the outer corners only.
4. Real live element: a ticker/log that streams actual data (or a recorded real sample, labelled as such).
5. Amber is reserved for the primary action and the "live" indicator; all other state uses `--c-ok` / `--c-alert` beside data.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| abyss | oklch(15% .02 200) | canvas | neutral #0A0A0A |
| panel steps | 19/23% L hue 200 | elevation | box-shadow elevation |
| phosphor | oklch(93% .01 190) | text | pure white |
| sodium amber | oklch(80% .16 75) | primary CTA, live dot | headings, large areas |
| ok / alert | oklch(78% .12 170) / oklch(66% .19 28) | data state only | decoration |

## Typography
Display Geist 700 -0.04em lh 1.0 (weight contrast 700/400, antipatterns #14). H2 Geist 700 `--fs-2xl` -0.03em. Body Geist 400 15px (UI-dense default); prose-heavy briefs switch on the "prose mode" knob: `--fs-base: 1.0625rem` (17px), `--lh-body: 1.65`. Mono Geist Mono 400 for numbers, code, units only; labels in Geist 500 12px sentence case (not mono caps). Ratio 1.333. Hebrew: Noto Sans Hebrew 700/400 (variable 100–900, weights available), Cousine for Hebrew-inclusive mono strings; tracking 0.

## Layout
12-col, max 1440px, dense. Hero: headline cols 1–7 + a real readout/console panel cols 8–12 (live or recorded). Sections: panel grids (2×2, 1+3), a sticky-left feature stack with a code sample, a pricing table with mono numbers. Affinity: Workbench, Stat-Led (real data only), Feature Stack, Component Playground. Rejects: Photographic, Manifesto, Portfolio Grid.

## Components
- Nav: status line (not the AI nav #33): a 36px mono status bar: wordmark · real system state (only if it is real) · links as function-key hints (`F1 Docs  F2 Pricing  F3 Customers`), ⌘K search, one amber keycap "Start"; "Sign in" is plain text at the very end.
- Footer: dense colophon: status link (real), docs, changelog, security; mono version only if real.
- Buttons: 40px, radius 4px, amber fill abyss text 500; secondary = 1px rule outline; hover = +6% L.
- Cards: panels (hairline-flat), padding 20–24px.
- Product card (plans): panel with mono price, feature list with real limits, amber outline on the recommended plan.

## Backgrounds
`.bg-grid` 24px at 5% phosphor on hero; `.bg-scanlines` at 3% optional; shader-bg `dithering` (teal/amber, low contrast) for one band.

## Motion (budget 5)
House ease `cubic-bezier(.2,.8,.2,1)` 200ms. Signature: readouts count up from 0 with `counter` (tabular-nums) when first visible, then tick live (live ticking = recipe; `counter` only counts once on view). Allowed: `text-fx` (scramble once), `counter`, `accordion`, `bento` (panels), `nav`, `shader-bg` (dithering, paused offscreen). Not: marquee, magnetic, cursor, split-reveal on every heading.

## Imagery
Real product UI screenshots in panels (no fake chrome), topology diagrams in 1px phosphor lines, maps with real points. Never: stock servers, padlocks/shields, hooded hackers, glowing globes.

## RTL notes
Panels mirror; code, numbers, logs, CLI stay `dir="ltr"` with `unicode-bidi: isolate`. Charts keep time left→right.

## Do / Don't
- Do real numbers with sources; Don't invent "99.99%" or "10× faster".
- Do elevation by lightness; Don't add drop shadows to panels.
- Do amber for one action; Don't colour headings amber.
- Do mono for numbers/code; Don't set nav or labels in mono caps.
- Do 2–4px radius; Don't round panels 16px+.
- Do scramble once; Don't loop text effects.

## Palette drops
- Abyss + sodium (default). = `tokens.css` above (AA: ink/canvas 16.0 · ink-2/canvas 10.6 · muted/canvas 5.4 · muted/surface 5.1 · accent-ink/accent 10.3 · ink/surface 15.0)
- Graphite + signal red: canvas oklch(16% .006 260), accent oklch(64% .2 27), ok oklch(80% .1 160).
  Override: `--c-canvas: oklch(16% 0.006 260); --c-surface: oklch(20% 0.006 260); --c-surface-2: oklch(24% 0.006 260); --c-ink: oklch(94% 0.006 260); --c-ink-2: oklch(81% 0.006 260); --c-muted: oklch(60.1% 0.006 260); --c-rule: oklch(94% 0.006 260 / 0.16); --c-accent: oklch(64% 0.2 27); --c-accent-ink: oklch(16% 0.006 260); --c-focus: oklch(64% 0.2 27);`
  AA: ink/canvas 16.3 · ink-2/canvas 10.7 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 5.3 · ink/surface 15.2
- Deep navy + ice: canvas oklch(17% .04 255), accent oklch(86% .1 210), ink oklch(95% .01 240).
  Override: `--c-canvas: oklch(17% 0.04 255); --c-surface: oklch(21% 0.04 255); --c-surface-2: oklch(25% 0.04 255); --c-ink: oklch(95% 0.01 240); --c-ink-2: oklch(82% 0.01 240); --c-muted: oklch(60.6% 0.01 240); --c-rule: oklch(95% 0.01 240 / 0.16); --c-accent: oklch(86% 0.1 210); --c-accent-ink: oklch(17% 0.04 255); --c-focus: oklch(86% 0.1 210);`
  AA: ink/canvas 16.6 · ink-2/canvas 11.0 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 12.9 · ink/surface 15.3

## Knobs
Density (panel count); live element type (log / ticker / map / chart); scramble on/off; grid bg on/off; hero readout vs console; accent drop. Prose mode (base 17px / lh 1.65) for text-heavy briefs (law, policy, docs).
