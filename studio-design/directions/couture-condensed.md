---
name: couture-condensed
title: Couture Condensed
tagline: "An avant-garde lookbook on gallery white: models cut out of their world, ultra-condensed black capitals as tall as the models, mono fine print and one carmine stitch."
axes: { paper_band: light, display_style: ultra-condensed, accent_hue: warm, radius_system: "0", density: 5, variance: 9, motion: 7 }
fits: [ecommerce, landing]
subjects_good: [designer fashion, streetwear labels, eyewear, sneaker drops, beauty launches, photography studios, fashion events]
subjects_bad: [B2B SaaS, clinics, kids, finance, restaurants]
neighbours: [campaign-commerce, billboard-type, cold-chrome-luxury]
fonts: { display: "League Gothic (Google)", body: "Spline Sans Mono 400 (Google)", hebrew: ["Noto Sans Hebrew (wdth 62.5)", "Cousine"] }
---
# Couture Condensed
Specimen: _specimens/couture-condensed.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Gothic:wdth@75..100&family=Spline+Sans+Mono:wght@400;500&family=Noto+Sans+Hebrew:wdth,wght@62.5..100,400..900&family=Cousine:wght@400;700&display=swap">
*/
:root {
  --c-canvas: oklch(98.2% 0.002 30); --c-surface: oklch(95.5% 0.003 30); --c-surface-2: oklch(90% 0.004 30);
  --c-ink: oklch(12% 0.010 30); --c-ink-2: oklch(28% 0.010 30); --c-muted: oklch(50% 0.008 30);
  --c-rule: oklch(12% 0.010 30); --c-accent: oklch(52% 0.22 22); --c-accent-ink: oklch(98.2% 0.002 30);
  --c-focus: oklch(52% 0.22 22);
  --f-display: "League Gothic", "Noto Sans Hebrew", Impact, sans-serif; --f-body: "Spline Sans Mono", "Cousine", ui-monospace, monospace;
  --f-mono: "Spline Sans Mono", "Cousine", monospace; --f-outlier: "League Gothic", sans-serif;
  --fs-xs: 0.75rem; /* ≥12px */ --fs-sm: 0.75rem; --fs-base: 0.9375rem; --fs-lg: 1.0625rem; --fs-xl: clamp(1.75rem, 1.2rem + 2vw, 2.75rem);
  --fs-2xl: clamp(3rem, 1.6rem + 5vw, 6rem); --fs-3xl: clamp(4.5rem, 2rem + 9vw, 11rem);
  --fs-display: clamp(5rem, 0.5rem + 17vw, 20rem);
  --lh-tight: 0.84; --lh-body: 1.5; --tr-display: 0; --tr-label: -0.01em;
  --sp-1: 4px; --sp-2: 6px; --sp-3: 10px; --sp-4: 14px; --sp-5: 20px; --sp-6: 28px; --sp-7: 44px; --sp-8: 72px; --sp-9: 112px; --sp-10: 168px;
  --section-y: clamp(56px, 6vw + 20px, 144px); --gutter: clamp(10px, 1.6vw, 24px); --maxw: 1920px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px;
  --ease-out: cubic-bezier(0.87, 0, 0.13, 1); /* snappy expo */ --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
  --d-fast: 120ms; --d-med: 380ms; --d-slow: 900ms;
  --shadow-1: none; --shadow-2: none;
}
.display { text-transform: uppercase; font-variation-settings: "wdth" 75; }
:root[dir="rtl"] { --f-display: "Noto Sans Hebrew", "League Gothic", sans-serif; --lh-tight: 0.95; }
:where([dir="rtl"]) .display { font-variation-settings: "wdth" 62.5; font-weight: 800; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Noto Sans Hebrew", "League Gothic", Impact, sans-serif; --f-body: "Cousine", "Spline Sans Mono", ui-monospace, monospace; }
```

## Essence
Gallery-white canvas, models and products cut out (transparent PNG/WebP) so they stand on the page itself. Display is ultra-condensed League Gothic caps at 17vw+, crushed leading 0.84, stacked behind or in front of the cut-outs (layering, not side-by-side). All UI and body is small mono (11–14px), uppercase for nav. One carmine accent like a stitch: cart count, active size, sale. A % preloader counts 000→100 on the first visit only. Absent: rounded corners, shadows, cards, lifestyle backgrounds, large body text.

## Signature moves
1. Cut-out layering: model cut-out z-index between two display words (word behind at 100% ink, word in front partially overlapping the model's legs).
2. Percentage preloader (real asset-load progress, first visit, ≤1.8s), mono 13px, then the display word slides up.
3. Split PDP: left = vertical image stack (cut-out + on-body), right = sticky mono info panel, size grid as square buttons.
4. Flip-grid PLP: product grid re-orders on filter with `flip-grid`; hover swaps cut-out to on-body.
5. Mono microcopy: nav, prices, compositions in Spline Sans Mono 12px uppercase; sentences stay sentence case.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| gallery white | oklch(98.2% .002 30) | canvas | cream |
| ink | oklch(12% .01 30) | display, text, rules | grey display |
| carmine | oklch(52% .22 22) | cart count, active size, sale, focus | backgrounds, headings |
| surface | oklch(95.5% .003 30) | size buttons, inputs | cards |

## Typography
Display League Gothic 400 wdth 75 caps lh 0.84; H2 League Gothic `--fs-2xl`. Body/UI Spline Sans Mono 400 14px (PDP copy) / 12px (UI). Ratio extreme (display vs body ≈ 20×). Hebrew: Noto Sans Hebrew 800 at wdth 62.5 (condensed Hebrew), lh 0.95; UI in Cousine 400 (mono with Hebrew).
Weight-contrast exception (antipatterns #14): League Gothic (width axis only) against a mono body; classification + size ≥5×.

## Layout
Fluid to 1920px, tight gutters. Hero: two stacked display words full width, cut-out model centred overlapping, mono nav corners (4-corner nav: logo TL, shop TR, info BL, cart BR). Sections: drop grid 4-up with large gaps between rows, editorial spread (one cut-out + one word), lookbook `hscroll`, stockists index. Affinity: Photographic, Catalogue, Marquee Hero, Index-First. Rejects: Bento, Stat-Led, Workbench, Long Document.

## Components
- Nav: 4-corner mono nav (N-corners), fixed, `mix-blend-mode: difference` over images.
- Footer: giant cropped wordmark + mono index columns (client care, stockists, legal).
- Buttons: rectangular 44px, ink fill white mono 12px caps; secondary text link with 1px underline; size buttons 44px squares, selected = carmine outline 1.5px.
- Cards: none.
- Product card: cut-out on canvas 3:4, name mono 12px caps, price mono; sold-out as strike-through in muted; hover swap to on-body.

## Backgrounds
Flat canvas. No textures. Optional `.bg-grain` 2% on editorial spreads only.

## Motion (budget 7)
House ease expo `cubic-bezier(.87,0,.13,1)` 380–900ms. Signature: cut-out layering parallax: back word moves at 0.6, model at 1.0, front word at 1.3 (scrub). Allowed: `counter` (preloader), `split-reveal` (display lines slide up in masks), `flip-grid`, `hscroll` (lookbook), `pdp`, `cart`, `quickview`, `text-fx` (mono hover scramble on nav only). Not: shader-bg, bento, magnetic, stack-cards, marquee (use the display itself).

## Imagery
Studio shots on seamless, clipped cleanly (hair masks done properly), full-body at consistent scale; on-body detail crops; flash, hard light. Never: lifestyle cafés, soft beige interiors, AI-generated models.

## RTL notes
4-corner nav mirrors (logo top-right); layering order stays; mono numerals (prices, sizes) `dir="ltr"`; Hebrew display via Noto Sans Hebrew wdth 62.5 (tokens switch the stack in RTL).

## Do / Don't
- Do layer type and cut-out; Don't place the headline beside the model.
- Do lh 0.84 on Latin caps only; Don't crush Hebrew below 0.95.
- Do carmine for state; Don't paint CTAs carmine.
- Do real preloader progress once; Don't show a fake 3s loader every page.
- Do mono UI; Don't set PDP descriptions below 14px.
- Do square size buttons; Don't use pills.

## Palette drops
- Gallery white + carmine (default). = `tokens.css` above (AA: ink/canvas 19.3 · ink-2/canvas 13.9 · muted/canvas 5.7 · muted/surface 5.3 · accent-ink/accent 5.7 · ink/surface 17.8)
- Concrete: canvas oklch(88% .004 250), ink oklch(14% .01 250), accent oklch(60% .19 255) cobalt stitch.
  Override: `--c-canvas: oklch(88% 0.004 250); --c-surface: oklch(85.3% 0.004 250); --c-surface-2: oklch(79.8% 0.004 250); --c-ink: oklch(14% 0.01 250); --c-ink-2: oklch(27.7% 0.01 250); --c-muted: oklch(45.7% 0.01 250); --c-rule: oklch(14% 0.01 250 / 0.16); --c-accent: oklch(60% 0.19 255); --c-accent-ink: oklch(14% 0.01 250); --c-focus: oklch(14% 0.01 250);`
  AA: ink/canvas 13.9 · ink-2/canvas 10.3 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 5.0 · ink/surface 12.7; accent/canvas 2.8 (<3: accent is a fill/surface colour, not text or UI line)
- Black box: canvas oklch(13% .006 30), ink oklch(96% .004 30), accent oklch(70% .2 350).
  Override: `--c-canvas: oklch(13% 0.006 30); --c-surface: oklch(17.5% 0.006 30); --c-surface-2: oklch(22% 0.006 30); --c-ink: oklch(96% 0.004 30); --c-ink-2: oklch(81.1% 0.004 30); --c-muted: oklch(59% 0.004 30); --c-rule: oklch(96% 0.004 30 / 0.16); --c-accent: oklch(70% 0.2 350); --c-accent-ink: oklch(13% 0.006 30); --c-focus: oklch(70% 0.2 350);`
  AA: ink/canvas 17.9 · ink-2/canvas 11.2 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 6.8 · ink/surface 16.9

## Knobs
Width axis 75/85/100; preloader on/off; nav 4-corner vs top bar; grid 3/4/5-up; layering depth (1 or 2 words); accent drop.
