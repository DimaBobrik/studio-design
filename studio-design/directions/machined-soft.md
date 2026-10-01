---
name: machined-soft
title: Machined Soft
tagline: "A precision-milled aluminium device on a silver bench: double-bezel shells, pill controls with nested icon wells, and one international-orange switch."
axes: { paper_band: light, display_style: grotesk-bold, accent_hue: warm, radius_system: soft, density: 4, variance: 6, motion: 5 }
fits: [landing, ecommerce, company]
subjects_good: [consumer tech, health devices, premium apps, e-bikes, smart home, audio gear, fintech cards, clinics with devices]
subjects_bad: [zines, festivals, heritage crafts, restaurants, activist campaigns]
neighbours: [whisper-studio, industrial-catalogue, atmospheric-sky]
fonts: { display: "Satoshi 700 (Fontshare)", body: "Satoshi 400/500", hebrew: ["Rubik"] }
fallback: { display: "Urbanist 700 (Google)", body: "Urbanist 400/500" }  # nearest free Google face if Fontshare is not self-hosted
---
# Machined Soft
Specimen: _specimens/machined-soft.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap">
<!-- Google fallback (used when Fontshare is not self-hosted; self-host Fontshare in fonts/ for production, see _index.md): -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400..900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400..800&display=swap">
*/
:root {
  --c-canvas: oklch(95% 0.004 250); --c-surface: oklch(98.5% 0.003 250); --c-surface-2: oklch(91% 0.006 250);
  --c-ink: oklch(20% 0.012 260); --c-ink-2: oklch(36% 0.012 260); --c-muted: oklch(52.8% 0.01 260);
  --c-rule: oklch(20% 0.012 260 / 0.08); --c-accent: oklch(57% 0.21 38); /* white text AA 4.7 */ --c-accent-ink: oklch(99% 0.003 250);
  --c-focus: oklch(57% 0.21 38);
  --f-display: "Satoshi", "Urbanist", "Rubik", system-ui, sans-serif; --f-body: "Satoshi", "Urbanist", "Rubik", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Satoshi", "Urbanist", sans-serif;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.1rem);
  --fs-2xl: clamp(2.3rem, 1.6rem + 2.6vw, 3.6rem); --fs-3xl: clamp(3rem, 1.8rem + 4.5vw, 5.5rem);
  --fs-display: clamp(3rem, 1.2rem + 5.6vw, 6.5rem);
  --lh-tight: 0.98; --lh-body: 1.55; --tr-display: -0.035em; --tr-label: 0.01em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 56px; --sp-8: 96px; --sp-9: 128px; --sp-10: 176px;
  --section-y: clamp(96px, 8vw + 40px, 176px); --gutter: clamp(16px, 3vw, 48px); --maxw: 1280px;
  --r-sm: 12px; --r-md: 20px; --r-lg: 32px; --r-pill: 999px;
  --bezel: 6px; /* double-bezel shell padding; inner radius = calc(var(--r-lg) - var(--bezel)) */
  --ease-out: cubic-bezier(0.32, 0.72, 0, 1); --ease-in: cubic-bezier(0.55, 0, 1, 0.45); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 180ms; --d-med: 450ms; --d-slow: 800ms;
  --shadow-1: 0 1px 1px oklch(20% .012 260 / 0.04), 0 8px 24px -12px oklch(20% .012 260 / 0.10);
  --shadow-2: 0 2px 2px oklch(20% .012 260 / 0.04), 0 40px 80px -32px oklch(20% .012 260 / 0.22);
}
:root[dir="rtl"] { --tr-display: -0.005em; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Rubik", "Satoshi", "Urbanist", system-ui, sans-serif; --f-body: "Rubik", "Satoshi", "Urbanist", system-ui, sans-serif; }
```

## Essence
Silver-white bench, cold neutrals, a massive tight grotesk, and components that feel machined: double-bezel cards (outer shell ring + inner core with its own radius and a 1px top highlight), pill buttons with a nested circular icon well, layered contact + ambient shadows. One saturated international-orange "switch" colour for the primary action and the device's own highlight. Absent: glass on scrolling content, gradients on text, warm beige, hairline-every-row tables.

## Signature moves
1. Double-bezel card: shell `padding: var(--bezel); border-radius: var(--r-lg); background: var(--c-surface-2); box-shadow: 0 0 0 1px var(--c-rule)`; core `border-radius: calc(var(--r-lg) - var(--bezel)); background: var(--c-surface); box-shadow: inset 0 1px 0 oklch(100% 0 0 / .8), var(--shadow-1)`.
2. Button-in-button: pill CTA with a 36px circular icon well at inline-end that slides 4px on hover.
3. Floating island nav (pill, 56px) that expands into a full-screen menu with staggered mask reveal.
4. Blur-to-sharp entrance on hero only (filter blur 12px→0, 800ms).
5. Device macro: one product render/photograph at 1.2× viewport width cropped, with a single orange highlight element.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| silver bench | oklch(95% .004 250) | canvas | warm beige |
| core white | oklch(98.5% .003 250) | card cores, inputs | page canvas |
| shell | oklch(91% .006 250) | bezel shells, secondary buttons | text |
| graphite | oklch(20% .012 260) | text, primary pill | pure black |
| intl orange | oklch(64% .21 38) | primary action OR device highlight | both in the same viewport, backgrounds |

## Typography
Display Satoshi 700 -0.035em lh 0.98; H2 Satoshi 700 `--fs-2xl`; body Satoshi 400 17px; labels 500 13px. Weight contrast 700/400. Ratio 1.333. Hebrew: Rubik 700/400 (its softened corners match the machined radius); tracking ~0.

## Layout
12-col, max 1280px, generous. Hero: display cols 1–7, device macro bleeding inline-end, CTA pair below display. Sections: asymmetric bento of double-bezel cards (7/5, 4/8), a sticky scroll product tour (`hscroll` or pinned image swap), a spec comparison as 2-col grouped cards (not a hairline table). Affinity: Bento, Feature Stack, Split Studio. Rejects: Manifesto, Long Document, Index-First.

## Components
- Nav: device segmented control (not the AI nav #33): the wordmark etched (ink-2, letterpress) at inline-start; the 4 links form one hardware segmented switch whose thumb slides to the current page (Flip/translate, 300ms); the CTA is a physical orange key with a 2px bottom edge. Fixed as a floating instrument (surface 85% + blur, fixed only).
- Footer: newsletter-first in a large double-bezel card, then inline links.
- Buttons: pill 52px, graphite fill, white 500 label + 36px icon well (surface at 12%); primary action pill in orange; hover: well slides, 180ms.
- Cards: double-bezel (see move 1), inner padding 28–40px.
- Product card: double-bezel, image on core 4:3, name 500, price 700, colour swatches as 16px circles with 2px shell ring.

## Backgrounds
Flat canvas. `.bg-conic-sheen` at 6% inside one showcase card (brushed-metal hint); `.bg-grain` 2% optional.

## Motion (budget 5)
House ease `cubic-bezier(.32,.72,0,1)` 450ms. Signature: pinned product tour: the device image stays, callouts slide in from inline-end per scroll step. Allowed: `magnetic` (CTA), `hscroll`, `bento`, `stack-cards`, `nav`, `pdp`, `cart`, `quickview`, `accordion`. Not: marquee, shader-bg, cursor, text scramble.

## Imagery
Studio renders or photos of devices on silver seamless, soft top light, subtle reflections; UI screenshots inside core cards (12px radius). Never: gradient blobs, neon, human stock smiling at phones.

## RTL notes
Icon well moves to inline-end (left in RTL) and slides with `SD.dir()`; device macro bleeds to inline-end; do not mirror product renders with text/logos.

## Do / Don't
- Do inner radius = outer − bezel; Don't give nested elements the same radius.
- Do shadows layered (contact + ambient, ≤0.22 alpha); Don't use a single rgba(0,0,0,.1) shadow.
- Do blur only on fixed nav; Don't put backdrop-filter on scrolling cards.
- Do orange for one role per viewport; Don't use it as section fill.
- Do grouped comparison cards; Don't draw 10-row hairline tables.
- Do blur-to-sharp on hero only; Don't blur-in every section.

## Palette drops
- Silver + intl orange (default). = `tokens.css` above (AA: ink/canvas 15.6 · ink-2/canvas 9.4 · muted/canvas 4.6 · muted/surface 5.1 · accent-ink/accent 4.8 · ink/surface 17.3)
- Graphite night: canvas oklch(17% .008 260), core oklch(22% .008 260), shell oklch(27% .008 260), ink oklch(95% .004 250), accent oklch(70% .19 38).
  Override: `--c-canvas: oklch(17% 0.008 260); --c-surface: oklch(22% 0.008 260); --c-surface-2: oklch(26% 0.008 260); --c-ink: oklch(95% 0.004 250); --c-ink-2: oklch(81% 0.004 250); --c-muted: oklch(61.2% 0.004 250); --c-rule: oklch(95% 0.004 250 / 0.16); --c-accent: oklch(70% 0.19 38); --c-accent-ink: oklch(17% 0.008 260); --c-focus: oklch(70% 0.19 38);`
  AA: ink/canvas 16.5 · ink-2/canvas 10.6 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 6.6 · ink/surface 15.0
- Sage device: canvas oklch(94% .012 160), accent oklch(58% .16 250) cobalt.
  Override: `--c-canvas: oklch(94% 0.012 160); --c-surface: oklch(97.5% 0.012 160); --c-surface-2: oklch(90% 0.012 160); --c-ink: oklch(20% 0.012 260); --c-ink-2: oklch(35.8% 0.012 260); --c-muted: oklch(52.1% 0.012 260); --c-rule: oklch(20% 0.012 260 / 0.16); --c-accent: oklch(60.1% 0.16 250); --c-accent-ink: oklch(20% 0.012 260); --c-focus: oklch(60.1% 0.16 250);`
  AA: ink/canvas 15.2 · ink-2/canvas 9.2 · muted/canvas 4.6 · muted/surface 5.1 · accent-ink/accent 4.6 · ink/surface 16.9; accent L 58->60% for AA

## Knobs
Bezel 4/6/8px; outer radius 24/32/40; bento tile count (4/5/7); tour type (pinned swap / hscroll); nav island vs full bar; accent role (CTA vs device).
