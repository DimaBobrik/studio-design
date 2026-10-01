---
name: cosmic-retrofuture
title: Cosmic Retrofuture
tagline: "A 1974 synth brochure found in orbit: aubergine space, a fat soft serif, a sunset stripe, and a CRT channel you can tune."
axes: { paper_band: dark, display_style: soft-serif-70s, accent_hue: yellow, radius_system: soft, density: 4, variance: 8, motion: 6 }
fits: [ecommerce, landing]
subjects_good: [synthesizers, audio hardware, record labels, observatories/planetariums, psychedelic-leaning drinks, sci-fi books/games, concept stores, film festivals]
subjects_bad: [law, accounting, hospitals, enterprise SaaS, kids' education]
neighbours: [apparatus-night, desktop-y2k, darkroom-object]
fonts: { display: "Caprasimo (Google)", body: "Sora 300/400 (Google)", mono: "VT323 (CRT only)", hebrew: ["Suez One", "Rubik"] }
---
# Cosmic Retrofuture
Specimen: _specimens/cosmic-retrofuture.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Sora:wght@300..600&family=VT323&family=Suez+One&family=Rubik:wght@300..500&display=swap">
*/
:root {
  --c-canvas: oklch(18% 0.050 320); --c-surface: oklch(23% 0.055 320); --c-surface-2: oklch(29% 0.060 320);
  --c-ink: oklch(92% 0.040 80); --c-ink-2: oklch(84% 0.045 75); --c-muted: oklch(70% 0.040 330);
  --c-rule: oklch(36% 0.060 320); --c-accent: oklch(83% 0.15 85); --c-accent-ink: oklch(18% 0.050 320);
  --c-focus: oklch(83% 0.15 85);
  --sunset: linear-gradient(180deg, oklch(83% 0.15 85), oklch(68% 0.19 45)); /* two-stop stripe, used as bands of 4 stripes */
  --f-display: "Caprasimo", "Suez One", Georgia, serif; --f-body: "Sora", "Rubik", system-ui, sans-serif;
  --f-mono: "VT323", "Rubik", monospace; --f-outlier: "VT323", monospace;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.7rem, 1.4rem + 1.2vw, 2.4rem);
  --fs-2xl: clamp(2.5rem, 1.7rem + 3vw, 4.25rem); --fs-3xl: clamp(3.2rem, 2rem + 5vw, 6.5rem);
  --fs-display: clamp(3.5rem, 1.5rem + 6.6vw, 7.75rem);
  --lh-tight: 1.0; --lh-body: 1.6; --tr-display: -0.01em; --tr-label: 0.02em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 36px; --sp-7: 56px; --sp-8: 88px; --sp-9: 136px; --sp-10: 200px;
  --section-y: clamp(80px, 7vw + 32px, 184px); --gutter: clamp(18px, 3vw, 48px); --maxw: 1360px;
  --r-sm: 10px; --r-md: 24px; --r-lg: 40px; /* CRT screen */ --r-pill: 999px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --ease-in: cubic-bezier(0.64, 0, 0.78, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 160ms; --d-med: 500ms; --d-slow: 1200ms;
  --shadow-1: 0 0 0 1px var(--c-rule); --shadow-2: 0 0 0 1px var(--c-rule), 0 40px 90px -40px oklch(68% 0.19 45 / 0.35);
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.1; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Suez One", "Caprasimo", Georgia, serif; --f-body: "Rubik", "Sora", system-ui, sans-serif; }
```

## Essence
Retro-futurism from the analogue synth era: deep aubergine space with a sparse static starfield, cream type, a fat soft 70s serif (Caprasimo) for display, and a four-stripe mustard→orange sunset band as the recurring emblem. The product appears inside a CRT "channel" module (rounded screen, scanlines, channel knob) that users can tune between views/demos. Absent: neon cyberpunk, purple→blue gradients, chrome text, particle storms, glassmorphism.

## Signature moves
1. Sunset stripes: 4 horizontal stripes (heights 12/9/6/3px, gaps equal) filled with `--sunset`, used as dividers and behind the hero word.
2. CRT channel: a 4:3 rounded screen (radius 40px, bezel surface-2) with `.bg-scanlines`, VT323 channel number, click/drag knob to switch between 3–5 real demos/videos with a 200ms noise burst.
3. Static starfield: CSS radial-gradient dots (≤120, three sizes) on canvas, slow drift 0.02 parallax only; paused offscreen.
4. Fat serif display in cream with mustard shadow offset 0 4px (letterpress-like), sentence case.
5. Orbit diagrams: product specs/features on concentric SVG rings, 1px rule, items as dots with labels.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| aubergine space | oklch(18% .05 320) | canvas | pure black, violet-blue |
| cream | oklch(92% .04 80) | text | pure white |
| mustard | oklch(83% .15 85) | CTA fill, knob, top stripe | body text |
| sunset | mustard→orange two-stop | stripes only | text, buttons, backgrounds |
| rule | oklch(36% .06 320) | rings, borders | shadows |

## Typography
Display Caprasimo 400, -0.01em, lh 1.0; H2 Caprasimo `--fs-2xl`. Body Sora 300/400 17px (light, spacey). VT323 only in CRT (channel, timecode) at ≥20px. Ratio 1.414. Hebrew: Suez One display (lh 1.1), Rubik 300/400 body; VT323 has no Hebrew, keep CRT labels numeric.
Weight-contrast exception (antipatterns #14): Caprasimo (single-weight chunky display) against light Sora; classification contrast.
Hebrew weights: Suez One ships one weight (400) — use it at 400 (`font-synthesis: none` in core.css blocks faux bold); never ask for 700 in Hebrew.

## Layout
12-col, max 1360px. Hero: stripes behind a two-line display (cols 1–8), CRT at inline-end showing the product; mustard CTA. Sections: product line as orbit diagram, "channels" (CRT with demos), story band with large photo framed in a rounded 40px screen, shop grid 3-up, dealers/events list. Affinity: Specimen, Component Playground (CRT), Catalogue (small), Narrative Workflow. Rejects: Stat-Led, Workbench, Bento with 9 tiles, Long Document.

## Components
- Nav: tuner strip (not the AI nav #33): links sit on a horizontal tuner scale with tick marks; a needle (accent, 2px) slides to the current page (transform only); wordmark in Caprasimo + 4-stripe mark at inline-start, cart as "Cart · 2" at the scale's end.
- Footer: statement sentence in Caprasimo + stripes + index row + newsletter "Join the transmission" (only if the brand's voice fits; else plain).
- Buttons: pill 52px, mustard fill aubergine text Sora 600; secondary cream 1.5px ring; hover = stripes slide in underneath (4 bars).
- Cards: surface panels, radius 24px, 1px rule ring.
- Product card: product on surface-2 in a rounded screen frame 4:3, name Caprasimo 1.5rem, price Sora 500, colourway dots.

## Backgrounds
CSS starfield (static), `.bg-grain` 5%, `.bg-scanlines` only inside CRT; shader-bg `grain-gradient` aubergine→plum or `dithering` in mustard/aubergine for one band.

## Motion (budget 6)
House ease `cubic-bezier(.22,1,.36,1)` 500ms. Signature: channel switch (noise burst + VT323 number roll) triggered by knob drag or scroll steps in a pinned section. Allowed: `text-fx` (channel/timecode), `scrub-video` (inside CRT), `split-reveal` (display words), `sphere` (planet products only), `hscroll`, `pdp`, `cart`, `quickview`. Not: marquee, cursor trails, magnetic, bento, particle backgrounds beyond the static starfield.

## Imagery
Product photography with warm key light and deep purple shadows, 70s film grade (lifted blacks, warm highlights), NASA-era public-domain space imagery (credited). Never: neon cyberpunk cities, AI nebula renders, chrome text.

## RTL notes
Stripes and CRT unaffected; orbit labels anchor per direction; knob rotation stays physical; timecodes `dir="ltr"`.

## Do / Don't
- Do aubergine space; Don't go black-and-neon.
- Do static starfield; Don't run particle systems (perf + cliché).
- Do stripes as the emblem; Don't gradient-fill headlines.
- Do real demos in the CRT; Don't loop fake UI.
- Do VT323 only in the CRT; Don't set body in pixel type.
- Do Caprasimo for display only; Don't use it below 1.5rem.

## Palette drops
- Aubergine + sunset (default). = `tokens.css` above (AA: ink/canvas 15.0 · ink-2/canvas 11.6 · muted/canvas 7.0 · muted/surface 6.3 · accent-ink/accent 11.2 · ink/surface 13.5)
- Burnt orange space: canvas oklch(20% .05 40), ink oklch(93% .03 90), accent oklch(82% .12 200) sky-cyan, stripes cyan→teal.
  Override: `--c-canvas: oklch(20% 0.05 40); --c-surface: oklch(25% 0.05 40); --c-surface-2: oklch(31% 0.05 40); --c-ink: oklch(93% 0.03 90); --c-ink-2: oklch(85.1% 0.03 90); --c-muted: oklch(62.8% 0.03 90); --c-rule: oklch(93% 0.03 90 / 0.16); --c-accent: oklch(82% 0.12 200); --c-accent-ink: oklch(20% 0.05 40); --c-focus: oklch(82% 0.12 200);`
  AA: ink/canvas 14.9 · ink-2/canvas 11.6 · muted/canvas 5.2 · muted/surface 4.6 · accent-ink/accent 11.0 · ink/surface 13.2
- Avocado lab: canvas oklch(22% .04 120), ink oklch(93% .04 90), accent oklch(78% .15 65), stripes orange→brown.
  Override: `--c-canvas: oklch(22% 0.04 120); --c-surface: oklch(27% 0.04 120); --c-surface-2: oklch(33% 0.04 120); --c-ink: oklch(93% 0.04 90); --c-ink-2: oklch(85.3% 0.04 90); --c-muted: oklch(64.9% 0.04 90); --c-rule: oklch(93% 0.04 90 / 0.16); --c-accent: oklch(78% 0.15 65); --c-accent-ink: oklch(22% 0.04 120); --c-focus: oklch(78% 0.15 65);`
  AA: ink/canvas 14.0 · ink-2/canvas 11.0 · muted/canvas 5.3 · muted/surface 4.6 · accent-ink/accent 8.3 · ink/surface 12.2

## Knobs
CRT on/off and channel count; stripe usage (hero only / dividers); starfield density; orbit diagram vs grid; display size; photo frames rounded screen vs arch.
