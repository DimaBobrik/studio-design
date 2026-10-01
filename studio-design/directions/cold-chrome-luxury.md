---
name: cold-chrome-luxury
title: Cold Chrome Luxury
tagline: "A vault-grey showroom after closing: hairline didone capitals, smoke and graphite, and one polished chrome object catching the only light."
axes: { paper_band: light, display_style: hairline-didone, accent_hue: neutral, radius_system: "0", density: 2, variance: 7, motion: 5 }
fits: [ecommerce, landing, company]
subjects_good: [watches, jewellery (anti-gold), eyewear, fragrance, premium real estate, architecture-grade furniture, fashion houses, high-end car detailing]
subjects_bad: [kids, food delivery, NGOs, dev tools, budget retail]
neighbours: [darkroom-object, estate-didone, couture-condensed]
fonts: { display: "Italiana (Google)", body: "Tenor Sans (Google)", hebrew: ["Bellefair", "Assistant"] }
---
# Cold Chrome Luxury
Specimen: _specimens/cold-chrome-luxury.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Italiana&family=Tenor+Sans&family=Bellefair&family=Assistant:wght@300;400;600&display=swap">
*/
:root {
  --c-canvas: oklch(92.5% 0.004 250); --c-surface: oklch(96.5% 0.003 250); --c-surface-2: oklch(88% 0.005 250);
  --c-ink: oklch(22% 0.006 250); --c-ink-2: oklch(36% 0.006 250); --c-muted: oklch(51% 0.006 250);
  --c-rule: oklch(78% 0.005 250); --c-accent: oklch(22% 0.006 250); --c-accent-ink: oklch(96.5% 0.003 250);
  --c-focus: oklch(45% 0.06 240);
  --chrome: linear-gradient(135deg, oklch(97% 0 0) 0%, oklch(70% 0.005 250) 38%, oklch(98% 0 0) 52%, oklch(58% 0.006 250) 100%); /* ONE object only */
  --f-display: "Italiana", "Bellefair", Didot, serif; --f-body: "Tenor Sans", "Assistant", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Tenor Sans", sans-serif;
  --fs-xs: 0.75rem; /* ≥12px */ --fs-sm: 0.8125rem; --fs-base: 0.9375rem; --fs-lg: 1.125rem; --fs-xl: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  --fs-2xl: clamp(2.4rem, 1.6rem + 3vw, 4rem); --fs-3xl: clamp(3.4rem, 2rem + 5.5vw, 7rem);
  --fs-display: clamp(3.5rem, 1rem + 8.5vw, 9.5rem);
  --lh-tight: 0.95; --lh-body: 1.7; --tr-display: 0.02em; --tr-label: 0.16em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 28px; --sp-6: 44px; --sp-7: 72px; --sp-8: 120px; --sp-9: 180px; --sp-10: 260px;
  --section-y: clamp(120px, 11vw + 40px, 280px); --gutter: clamp(20px, 5vw, 96px); --maxw: 1500px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px;
  --ease-out: cubic-bezier(0.19, 1, 0.22, 1); --ease-in: cubic-bezier(0.6, 0.04, 0.98, 0.34); --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --d-fast: 240ms; --d-med: 700ms; --d-slow: 1600ms;
  --shadow-1: none; --shadow-2: 0 60px 120px -60px oklch(22% 0.006 250 / 0.45);
}
:root[dir="rtl"] { --tr-display: 0; --tr-label: 0.04em; --fs-display: clamp(3rem, 1rem + 7vw, 8rem); }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Bellefair", "Italiana", Didot, serif; --f-body: "Assistant", "Tenor Sans", system-ui, sans-serif; }
```

## Essence
Anti-beige luxury: smoke-grey canvas, graphite ink, and hairline didone capitals with positive tracking. Enormous negative space (sections up to 280px apart) and macro crops of metal, stone and glass. Colour is replaced by material: one object per page may carry the chrome gradient; everything else is flat grey. Absent: gold, cream, brown, serifs in body, rounded corners, busy grids, sale badges.

## Signature moves
1. Hairline capitals: Italiana uppercase at up to 9.5rem, +0.02em tracking, lh 0.95, in graphite.
2. Chrome object: one hero element (product cut-out or a monogram) filled/overlaid with `--chrome` + `mix-blend-mode: luminosity`.
3. Macro crop gallery: 3–5 extreme close-ups in a slow `hscroll` pan with uneven widths (40/65/30vw).
4. Tenor Sans labels +0.16em caps at 11px (labels are allowed here only as product meta, max 1 per block).
5. Slow clip-path reveals (1.6s) on imagery, inset from top.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| smoke | oklch(92.5% .004 250) | canvas | warm beige/ivory |
| mist | oklch(96.5% .003 250) | product plates, forms | cards with shadows |
| graphite | oklch(22% .006 250) | text, CTA fill, accent | pure black |
| steel focus | oklch(45% .06 240) | focus ring | decoration |
| chrome | gradient token | ONE object per page | text, buttons, backgrounds |

## Typography
Display Italiana 400 caps (+0.02em). H2 Italiana `--fs-2xl`. Body Tenor Sans 400 15px/1.7, measure 52ch (short, airy). Labels Tenor Sans caps +0.16em 11px. Ratio 1.5+. Hebrew: Bellefair 400 display (thin, elegant; no caps: raise size, tracking 0), Assistant 300 body.
Weight-contrast exception (antipatterns #14): Italiana (hairline, single weight) against Tenor Sans; hierarchy by classification + size.
Hebrew weights: Bellefair ships one weight (400) — use it at 400 (`font-synthesis: none` in core.css blocks faux bold); never ask for 700 in Hebrew.

## Layout
12-col, max 1500px, content often confined to 4–6 columns with the rest empty. Hero: product macro or chrome object at 60% width offset to inline-end, display word at inline-start bottom crossing the image edge by 1 letter. Sections: macro hscroll, a single product story (2 columns, text 4 cols), collection grid 3-up with 180px gaps. Affinity: Photographic, Specimen, Split Studio. Rejects: Bento, Stat-Led, Catalogue with filters >6, Marquee Hero.

## Components
- Nav: centred wordmark in Italiana, 2 links each side in Tenor caps 11px, cart as a word; 72px transparent.
- Footer: inline single line (address · client services · legal) + large empty space; newsletter as underline field.
- Buttons: rectangular ghost 1px graphite, 52px, Tenor caps 12px +0.16em; primary filled graphite; hover = fill wipe from inline-start (clip-path) 700ms.
- Cards: none; products float on mist plates.
- Product card: 3:4 on mist, no border, name Tenor caps 12px, price Tenor 13px, hover = second image crossfade 700ms.

## Backgrounds
Flat smoke; `.bg-conic-sheen` at 4% only behind the chrome object; `.bg-grain` 2%. shader-bg `fluted-glass` (grey) as an alternative hero backdrop.

## Motion (budget 5)
House ease `cubic-bezier(.19,1,.22,1)` 700ms; Lenis lerp 0.07. Signature: macro hscroll pan pinned with `scrub: 1`. Allowed: `hscroll`, `clip-reveal`, `split-reveal` (display, lines), `pdp`, `quickview`, `cart`, `footer-reveal`. Not: marquee, magnetic, counters, stack-cards, bento.

## Imagery
Macro photography: brushed steel, sapphire glass, stone veins; cool grade, low saturation, deep graphite shadows; product cut-outs on mist. Never: gold-on-black clichés, lifestyle champagne, warm filters.

## RTL notes
Hero crossing letter moves to inline-start; hscroll direction flips via `SD.dir()`; product images not mirrored.

## Do / Don't
- Do 180px+ gaps; Don't fill the viewport with product grids.
- Do one chrome object; Don't chrome text or buttons.
- Do graphite as the only "accent"; Don't add gold.
- Do caps labels only on product meta; Don't caps-label every section.
- Do slow reveals (≥1.2s) on images; Don't stagger UI text.
- Do 0 radius; Don't round images.

## Palette drops
- Smoke + graphite (default). = `tokens.css` above (AA: ink/canvas 13.9 · ink-2/canvas 8.7 · muted/canvas 4.6 · muted/surface 5.2 · accent-ink/accent 15.6 · ink/surface 15.6)
- Black & tan: canvas oklch(20% .01 60), ink oklch(88% .03 70), accent same as ink, focus oklch(70% .08 60).
  Override: `--c-canvas: oklch(20% 0.01 60); --c-surface: oklch(24.5% 0.01 60); --c-surface-2: oklch(29% 0.01 60); --c-ink: oklch(88% 0.03 70); --c-ink-2: oklch(75.8% 0.03 70); --c-muted: oklch(62.9% 0.03 70); --c-rule: oklch(88% 0.03 70 / 0.16); --c-accent: oklch(88% 0.03 70); --c-accent-ink: oklch(20% 0.01 60); --c-focus: oklch(70% 0.08 60);`
  AA: ink/canvas 12.6 · ink-2/canvas 8.3 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 12.6 · ink/surface 11.3
- Cobalt + frost: canvas oklch(95% .006 250), ink oklch(30% .12 262) cobalt, accent cobalt.
  Override: `--c-canvas: oklch(95% 0.006 250); --c-surface: oklch(99% 0.006 250); --c-surface-2: oklch(90.5% 0.006 250); --c-ink: oklch(30% 0.12 262); --c-ink-2: oklch(42.9% 0.12 262); --c-muted: oklch(53.1% 0.12 262); --c-rule: oklch(30% 0.12 262 / 0.16); --c-accent: oklch(30% 0.12 262); --c-accent-ink: oklch(95% 0.006 250); --c-focus: oklch(30% 0.12 262);`
  AA: ink/canvas 12.0 · ink-2/canvas 7.2 · muted/canvas 4.6 · muted/surface 5.2 · accent-ink/accent 12.0 · ink/surface 13.5

## Knobs
Display case (caps / title); chrome object vs no chrome; hscroll length (3–7 images); nav centred vs split; section gap 160/220/280; hero image side.
