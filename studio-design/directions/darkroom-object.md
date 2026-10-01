---
name: darkroom-object
title: Darkroom Object
tagline: "A single object floating in warm walnut darkness, lit from one side; cream type is the only other thing in the room."
axes: { paper_band: dark, display_style: geometric-caps, accent_hue: warm, radius_system: soft, density: 3, variance: 6, motion: 6 }
fits: [ecommerce, landing]
subjects_good: [single-product brands, furniture, spirits, fragrance, watches, jewellery, coffee machines, cars, speakers]
subjects_bad: [SaaS dashboards, NGOs, kids, catalogues with 200+ SKUs, clinics]
neighbours: [film-title-bands, cold-chrome-luxury, estate-didone, void-stage]
fonts: { display: "Clash Grotesk 500 (Fontshare)", body: "General Sans 400 (Fontshare)", hebrew: ["Miriam Libre"] }
fallback: { display: "Familjen Grotesk 500/700 (Google)", body: "Albert Sans 400 (Google)" }  # nearest free Google faces if Fontshare is not self-hosted
---
# Darkroom Object
Specimen: _specimens/darkroom-object.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600&display=swap">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap">
<!-- Google fallback (used when Fontshare is not self-hosted; self-host Fontshare in fonts/ for production, see _index.md): -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;700&family=Albert+Sans:wght@400;500&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Miriam+Libre:wght@400..700&display=swap">
*/
:root {
  --c-canvas: oklch(14% 0.018 55); --c-surface: oklch(19% 0.024 55); --c-surface-2: oklch(26% 0.030 55);
  --c-ink: oklch(92% 0.030 80); --c-ink-2: oklch(81% 0.030 75); --c-muted: oklch(63% 0.030 70);
  --c-rule: oklch(34% 0.030 60); --c-accent: oklch(63% 0.19 45); --c-accent-ink: oklch(14% 0.018 55);
  --c-focus: oklch(82% 0.13 70);
  --f-display: "Clash Grotesk", "Familjen Grotesk", "Miriam Libre", system-ui, sans-serif; --f-body: "General Sans", "Albert Sans", "Miriam Libre", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Clash Grotesk", "Familjen Grotesk", sans-serif;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);
  --fs-lg: clamp(1.4rem, 1.1rem + 1vw, 1.8rem); /* large mixed-case lede, ~29px */
  --fs-xl: clamp(1.75rem, 1.4rem + 1.2vw, 2.4rem); --fs-2xl: clamp(2.25rem, 1.6rem + 2.4vw, 3.5rem);
  --fs-3xl: clamp(3rem, 1.8rem + 4.5vw, 5.5rem); --fs-display: clamp(3rem, 1rem + 6.5vw, 7.25rem);
  --lh-tight: 0.95; --lh-body: 1.55; --tr-display: 0.005em; --tr-label: 0.04em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 40px; --sp-7: 64px; --sp-8: 104px; --sp-9: 160px; --sp-10: 240px;
  --section-y: clamp(96px, 9vw + 40px, 240px); --gutter: clamp(20px, 4vw, 64px); --maxw: 1360px;
  --r-sm: 8px; --r-md: 14px; --r-lg: 28px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --ease-in: cubic-bezier(0.64, 0, 0.78, 0); --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --d-fast: 200ms; --d-med: 520ms; --d-slow: 1200ms;
  --shadow-1: 0 1px 0 oklch(100% 0 0 / 0.04) inset; --shadow-2: 0 40px 80px -30px oklch(5% 0.02 55 / 0.8);
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.05; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Miriam Libre", "Clash Grotesk", "Familjen Grotesk", system-ui, sans-serif; --f-body: "Miriam Libre", "General Sans", "Albert Sans", system-ui, sans-serif; }
```

## Essence
Warm walnut-black canvas that steps up in brown (never grey) for surfaces; one object lit by a single soft spotlight; cream uppercase display type and a large, calm mixed-case lede. The only colour besides cream is an editorial orange used for credits, numbers and small annotations, never for CTAs. Absent: grids of cards, icons, bright white, blue anything, busy navigation.

## Signature moves
1. Spotlight: `.bg-spotlight` centred on the object (radial, ink at 8%, 60vmax) plus `.bg-grain` at 5%.
2. Scroll-driven object turn: `scrub-video` (image sequence or muted video) rotates the product 0→180° across a 300vh pinned stage.
3. Uppercase Clash Grotesk 500 display, tracking ~0, paired with a 29px mixed-case lede in General Sans 400.
4. Dashed 1px dividers (`border-block-start: 1px dashed var(--c-rule)`) between spec rows.
5. Pill controls (variant, quantity) in surface-2 with 1px cream-at-20% ring.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| walnut | oklch(14% .018 55) | canvas | neutral grey #111 |
| umber step | oklch(19–26% .024–.03 55) | surfaces, pills | cool/blue-grey |
| cream | oklch(92% .03 80) | all type | pure white |
| editorial orange | oklch(63% .19 45) | credits, figures, 1 annotation per view | CTA fill, links |

## Typography
Display Clash Grotesk 500 uppercase, lh 0.95, 2–5 words. Lede General Sans 400 at `--fs-lg`, max 32ch. Body General Sans 400 18px, 60ch. Labels General Sans 500 12px +0.04em sentence case. Ratio 1.414 (few sizes, big jumps). Hebrew: Miriam Libre 700 for display (no uppercase in Hebrew, so rely on size 1.1× Latin) and 400 for body; lh ≥1.05.
Weight-contrast exception (antipatterns #14): Clash Grotesk 500 display at ≥4× body size and in caps/tight tracking; Hebrew display Miriam Libre 700 (its max).

## Layout
12-col, max 1360px, very generous section spacing (`--section-y` up to 240px). Hero: object centred-low at 60% viewport height, display above it aligned to inline-start, lede at inline-end bottom. Composition alternates: object stage (pinned) → one-line statement → spec rows → detail macro crops in 2-up. Affinity: Photographic, Specimen, Long Document, Narrative Workflow. Rejects: Bento, Catalogue grids >6 items, Stat-Led.

## Components
- Nav: floating chip (wordmark + menu + cart pill) centred top, 56px, surface at 80% with no blur.
- Footer: statement sentence (one cream line, 3xl) + small inline links row.
- Buttons: pill, cream fill with walnut text, 56px, 0 32px; hover = fill darkens to ink-2 over 200ms; secondary = cream 1px ring.
- Cards: soft single: surface, radius 14px, no border, no shadow; content padding 32px.
- Product card: object on surface-2 plate radius 28px 4:5, name uppercase 15px, price in editorial orange tabular-nums.

## Backgrounds
`.bg-spotlight`, `.bg-grain`. shader-bg `god-rays` in warm cream at ≤0.18 intensity, hero only; or `grain-gradient` walnut→umber.

## Motion (budget 6)
House ease `cubic-bezier(.22,1,.36,1)`, 520ms; Lenis lerp 0.08 (heavy inertia). Signature: pinned object turn via `scrub-video`. Allowed: `clip-reveal` (macro crops, vertical), `split-reveal` (display lines, once), `scrub-video`, `footer-reveal`, `pdp`, `cart`. Not allowed: marquee, bento, magnetic, counters.

## Imagery
One object, single key light from 45°, warm grade, background graded to exactly the canvas hue so edges vanish; macro crops of material (grain, stitching, brushed metal) 1:1 and 3:2. Never: people smiling, white-seamless packshots, flat lay.

## RTL notes
Object stage is symmetric; mirror only text anchors. Rotation direction of the scrub stays the same (physical object). Prices `dir="ltr"`.

## Do / Don't
- Do step surfaces in brown hue 55; Don't use neutral grey surfaces (kills the warmth).
- Do keep orange under 1% of viewport; Don't put it on buttons.
- Do give the object 60%+ of hero area; Don't add a second hero image.
- Do use 1 lede sentence ≤ 22 words; Don't stack eyebrow + badge + subtext.
- Do dashed dividers only in specs; Don't dash every section border.
- Do grain at ≤5%; Don't animate grain.

## Palette drops
- Walnut (default). = `tokens.css` above (AA: ink/canvas 15.7 · ink-2/canvas 11.0 · muted/canvas 5.7 · muted/surface 5.3 · accent-ink/accent 5.3 · ink/surface 14.6)
- Tobacco green: canvas oklch(16% .02 120), surfaces hue 120, ink oklch(91% .03 95), annotation oklch(72% .14 80).
  Override: `--c-canvas: oklch(16% 0.02 120); --c-surface: oklch(21% 0.02 120); --c-surface-2: oklch(28% 0.02 120); --c-ink: oklch(91% 0.03 95); --c-ink-2: oklch(80.4% 0.03 95); --c-muted: oklch(60.7% 0.03 95); --c-rule: oklch(91% 0.03 95 / 0.16); --c-accent: oklch(72% 0.14 80); --c-accent-ink: oklch(16% 0.02 120); --c-focus: oklch(72% 0.14 80);`
  AA: ink/canvas 14.9 · ink-2/canvas 10.5 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 7.7 · ink/surface 13.5
- Oxblood room: canvas oklch(15% .03 20), surfaces hue 20, ink oklch(93% .02 70), annotation oklch(78% .12 75).
  Override: `--c-canvas: oklch(15% 0.03 20); --c-surface: oklch(20% 0.03 20); --c-surface-2: oklch(27% 0.03 20); --c-ink: oklch(93% 0.02 70); --c-ink-2: oklch(82% 0.02 70); --c-muted: oklch(60% 0.02 70); --c-rule: oklch(93% 0.02 70 / 0.16); --c-accent: oklch(78% 0.12 75); --c-accent-ink: oklch(15% 0.03 20); --c-focus: oklch(78% 0.12 75);`
  AA: ink/canvas 16.0 · ink-2/canvas 11.3 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 9.7 · ink/surface 14.8

## Knobs
Hero object position (centre-low / inline-end bleed); scrub stage length (200/300/400vh); lede size; pill vs square controls; spotlight vs god-rays; dashed vs solid spec rules.
