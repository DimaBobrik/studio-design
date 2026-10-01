---
name: film-title-bands
title: Film Title Bands
tagline: "An expedition film's title cards: each band is one graded full-bleed shot, one condensed caps line with open tracking, one ghost pill."
axes: { paper_band: dark, display_style: condensed-caps, accent_hue: neutral, radius_system: pill, density: 2, variance: 5, motion: 7 }
fits: [landing, company, ecommerce]
subjects_good: [expeditions, energy, aerospace, construction, automotive, adventure travel, yachts, defence-civil engineering, outdoor apparel launches]
subjects_bad: [text-heavy services, kids, food delivery, SaaS with UI screenshots, catalogues]
neighbours: [darkroom-object, atmospheric-sky, campaign-commerce]
fonts: { display: "Barlow Condensed 700 (Google)", body: "Barlow 400 (Google)", hebrew: ["Heebo"] }
---
# Film Title Bands
Specimen: _specimens/film-title-bands.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&family=Heebo:wght@300..800&display=swap">
*/
:root {
  --c-canvas: oklch(9% 0.010 250); --c-surface: oklch(14% 0.010 250); --c-surface-2: oklch(20% 0.010 250);
  --c-ink: oklch(96% 0.005 250); --c-ink-2: oklch(84% 0.006 250); --c-muted: oklch(66% 0.008 250);
  --c-rule: oklch(32% 0.010 250); --c-accent: oklch(96% 0.005 250); --c-accent-ink: oklch(9% 0.010 250);
  --c-focus: oklch(80% 0.12 230);
  --f-display: "Barlow Condensed", "Heebo", system-ui, sans-serif; --f-body: "Barlow", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Barlow Condensed", sans-serif;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1rem; --fs-lg: 1.1875rem; --fs-xl: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  --fs-2xl: clamp(2.25rem, 1.5rem + 2.8vw, 3.75rem); --fs-3xl: clamp(3rem, 1.6rem + 5vw, 6rem);
  --fs-display: clamp(3rem, 1rem + 6.8vw, 7.5rem);
  --lh-tight: 0.95; --lh-body: 1.6; --tr-display: 0.02em; --tr-label: 0.14em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 40px; --sp-7: 64px; --sp-8: 96px; --sp-9: 144px; --sp-10: 216px;
  --section-y: 0px; /* bands are full-viewport; inner padding uses --sp-8 */ --gutter: clamp(20px, 4vw, 72px); --maxw: 1600px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.19, 1, 0.22, 1); --ease-in: cubic-bezier(0.55, 0, 1, 0.45); --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
  --d-fast: 180ms; --d-med: 600ms; --d-slow: 1400ms;
  --shadow-1: none; --shadow-2: none;
}
:root[dir="rtl"] { --tr-display: 0; --tr-label: 0.02em; --f-display: "Heebo", "Barlow Condensed", sans-serif; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Barlow Condensed", system-ui, sans-serif; --f-body: "Heebo", "Barlow", system-ui, sans-serif; }
```

## Essence
A monochrome shell (blue-black and white only) that disappears behind cinema. Every band is 100dvh (via `min-height: 100svh`), one graded shot or loop, one uppercase condensed line with slightly positive tracking, and at most one ghost pill CTA. Colour lives entirely in the photography. Absent: cards, icons, gradients, chromatic UI colour, paragraphs longer than 3 lines on photos.

## Signature moves
1. Band grammar: image/video + 1 caps line (≤6 words) + 1 ghost pill; text anchored bottom-inline-start at 12% from edges.
2. Positive display tracking (+0.02em) at huge sizes, lh 0.95 (film title card, the opposite of tight AI headlines).
3. Pinned crossfade: consecutive bands pin and crossfade (opacity + 1.06→1 scale) instead of scrolling past.
4. Ghost pill: 1px white ring, 44px tall, uppercase 13px +0.14em; fills white on hover with dark text.
5. Chapter data rail: a thin row of real facts (altitude, capacity, date) in Barlow 500 at the band's bottom edge.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| void | oklch(9% .01 250) | canvas, letterbox bars | neutral #0B0B0B |
| white | oklch(96% .005 250) | all type, ghost ring, accent | tinted colour UI |
| rule | oklch(32% .01 250) | data rail separators | card borders |
| (photo) | graded | the only colour on the page | overlays of brand colour |

## Typography
Display Barlow Condensed 700 uppercase (700/400, antipatterns #14) +0.02em lh 0.95. H2 Barlow Condensed 500 uppercase `--fs-2xl`. Body Barlow 400 16px/1.6 on dark sections only, never over busy photo. Labels Barlow 500 12px +0.14em uppercase (this direction owns caps labels; still ≤1 per band). Hebrew: Heebo 700 display (no caps; increase size 8%), Heebo 300 body; tracking 0.

## Layout
Stack of full-viewport bands; between bands, optional short dark "interlude" sections (60dvh) with a 2-col text block. Text on photos needs no scrim: grade images so the lower-inline-start third is ≤25% luminance. Affinity: Photographic, Marquee Hero (single line), Narrative Workflow. Rejects: Bento, Catalogue, Stat-Led grids, Split Studio.

## Components
- Nav: edge-aligned minimal, transparent over bands, wordmark + 3 caps links + menu; 72px; becomes void at 90% after first band.
- Footer: mast-headed: one last band with a giant condensed wordmark cropped at bottom + a 1-line link row.
- Buttons: ghost pill only; a filled white pill allowed once (booking/buy).
- Cards: none; use bands and interludes.
- Product card (if commerce): full-bleed image 3:4, caps name over bottom gradient-free shadowed area, price on the data rail.

## Backgrounds
Photos/video only. `.bg-grain` at 4% over video to unify codecs. shader-bg not used.

## Motion (budget 7)
House ease `cubic-bezier(.19,1,.22,1)` 600ms; Lenis lerp 0.09. Signature: pinned band crossfade (ScrollTrigger pin, `start:"top top"`). Allowed: `scrub-video` (one band), `split-reveal` (display line, chars stagger 20ms), `clip-reveal` (vertical letterbox open on first band), `counter` (data rail, real numbers), `hscroll` (one itinerary strip), `footer-reveal`, `nav`. Not: marquee, cursor, magnetic, bento.

## Imagery
Wide cinematic landscapes, machines at scale, people small in frame; 2.39:1 or 16:9 crops; cool-neutral grade with preserved highlights; keep the grade near-monochrome (chroma ≤ 0.04, steel/ash, one warm highlight at most): a saturated blue sky grade collapses into atmospheric-sky at thumbnail size (2026-09 specimen audit); video loops 8–12s, muted, playsinline, poster set. Never: stock handshakes, close-up smiling faces, AI-symmetric renders.

## RTL notes
Text anchor moves to bottom-inline-start (right). Do not mirror photos. Data rail numbers `dir="ltr"`. Hebrew caps don't exist; the positive-tracking signature becomes Heebo 700 at tracking 0 with slightly larger size.

## Do / Don't
- Do one line per band; Don't put paragraphs on photos.
- Do grade photos for legibility; Don't add a 50% black overlay (flattens the cinema).
- Do keep UI monochrome; Don't add a brand accent colour to buttons.
- Do track display +0.02em; Don't tighten display negative.
- Do pin with `start:"top top"`; Don't start pins at centre (half-band tell).
- Do provide poster frames; Don't autoplay without muted/playsinline.

## Palette drops
- Void (default). = `tokens.css` above (AA: ink/canvas 18.4 · ink-2/canvas 12.7 · muted/canvas 6.7 · muted/surface 6.4 · accent-ink/accent 18.4 · ink/surface 17.7)
- Polar: canvas oklch(96% .004 240), ink oklch(12% .01 250) (light bands, white-out landscapes), ghost ring ink.
  Override: `--c-canvas: oklch(96% 0.004 240); --c-surface: oklch(93% 0.004 240); --c-surface-2: oklch(90% 0.004 240); --c-ink: oklch(12% 0.01 250); --c-ink-2: oklch(27.1% 0.01 250); --c-muted: oklch(51.3% 0.01 250); --c-rule: oklch(12% 0.01 250 / 0.16); --c-accent: oklch(96% 0.005 250); --c-accent-ink: oklch(12% 0.01 250); --c-focus: oklch(12% 0.01 250);`
  AA: ink/canvas 18.1 · ink-2/canvas 13.4 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 18.1 · ink/surface 16.5; accent/canvas 1.0 (<3: accent is a fill/surface colour, not text or UI line)
- Night-shift: canvas oklch(10% .02 265), focus oklch(78% .14 70) sodium.
  Override: `--c-canvas: oklch(10% 0.02 265); --c-surface: oklch(15% 0.02 265); --c-surface-2: oklch(21% 0.02 265); --c-ink: oklch(96% 0.005 250); --c-ink-2: oklch(84.1% 0.005 250); --c-muted: oklch(58.1% 0.005 250); --c-rule: oklch(96% 0.005 250 / 0.16); --c-accent: oklch(96% 0.005 250); --c-accent-ink: oklch(10% 0.02 265); --c-focus: oklch(78% 0.14 70);`
  AA: ink/canvas 18.3 · ink-2/canvas 12.7 · muted/canvas 4.8 · muted/surface 4.6 · accent-ink/accent 18.3 · ink/surface 17.5

## Knobs
Band count (4–8); crossfade vs straight scroll; interlude sections on/off; display anchor (bottom-start / centre-left); one filled CTA vs ghost only; video vs stills.
