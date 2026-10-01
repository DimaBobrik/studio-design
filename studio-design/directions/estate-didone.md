---
name: estate-didone
title: Estate Didone
tagline: "An engraved invitation on burgundy velvet: didone capitals with a single signed script word, champagne hairlines, and windows cut as arches."
axes: { paper_band: field, display_style: didone+script, accent_hue: warm, radius_system: arch, density: 3, variance: 6, motion: 5 }
fits: [landing, company, ecommerce]
subjects_good: [luxury residential projects, boutique hotels, wineries, wedding venues, private clinics (aesthetic), patisseries, perfume houses, jewellery ateliers]
subjects_bad: [tech startups, kids, sports, budget retail, NGOs]
neighbours: [cold-chrome-luxury, darkroom-object, forest-bone-heritage]
fonts: { display: "Prata (Google)", outlier: "Pinyon Script (Google, 1 word per view)", body: "Jost 300/400 (Google)", hebrew: ["Bona Nova", "Assistant"] }
---
# Estate Didone
Specimen: _specimens/estate-didone.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Prata&family=Pinyon+Script&family=Jost:wght@300;400;500&family=Bona+Nova:wght@400;700&family=Assistant:wght@300;400;600&display=swap">
*/
:root {
  --c-canvas: oklch(30% 0.09 18); --c-surface: oklch(35% 0.10 18); --c-surface-2: oklch(94% 0.018 75);
  --c-ink: oklch(93% 0.025 80); --c-ink-2: oklch(85% 0.030 75); --c-muted: oklch(74% 0.040 40);
  --c-rule: oklch(82% 0.08 85 / 0.45); --c-accent: oklch(82% 0.08 85); --c-accent-ink: oklch(30% 0.09 18);
  --c-focus: oklch(86% 0.09 85);
  --f-display: "Prata", "Bona Nova", Didot, serif; --f-body: "Jost", "Assistant", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Pinyon Script", "Bona Nova", cursive;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1rem; --fs-lg: 1.1875rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.2rem);
  --fs-2xl: clamp(2.3rem, 1.6rem + 2.6vw, 3.8rem); --fs-3xl: clamp(3rem, 1.8rem + 4.6vw, 6rem);
  --fs-display: clamp(3rem, 1.2rem + 6vw, 7.25rem);
  --lh-tight: 1.0; --lh-body: 1.7; --tr-display: 0.04em; --tr-label: 0.18em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 28px; --sp-6: 40px; --sp-7: 64px; --sp-8: 104px; --sp-9: 160px; --sp-10: 232px;
  --section-y: clamp(96px, 9vw + 36px, 232px); --gutter: clamp(20px, 4.5vw, 80px); --maxw: 1400px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 999px;
  --shape-arch: 999px 999px 0 0; /* extra token: arch mask for images (`border-radius: var(--shape-arch)`); never assign it to --r-* */
  --ease-out: cubic-bezier(0.25, 1, 0.5, 1); --ease-in: cubic-bezier(0.5, 0, 0.75, 0); --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --d-fast: 220ms; --d-med: 650ms; --d-slow: 1500ms;
  --shadow-1: none; --shadow-2: 0 50px 100px -50px oklch(12% 0.05 18 / 0.8);
}
[data-surface="cream"] { --c-canvas: var(--c-surface-2); --c-ink: oklch(30% .09 18); --c-ink-2: oklch(40% .08 18); --c-muted: oklch(52% .05 30); --c-rule: oklch(30% .09 18 / .25); --c-accent: oklch(30% .09 18); --c-accent-ink: var(--c-surface-2); }
:root[dir="rtl"] { --tr-display: 0; --tr-label: 0.04em; --lh-tight: 1.1; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Bona Nova", "Prata", Didot, serif; --f-body: "Assistant", "Jost", system-ui, sans-serif; }
```

## Essence
A saturated burgundy field (not cream) with cream type and champagne hairlines, like an engraved invitation. Display is a didone set in spaced capitals; exactly one word per view is signed in script (Pinyon), used as a flourish over or beside the caps. Images are cut as arches. Cream panels invert for forms and floor-plan detail. Absent: gold gradients, black, sans-serif headlines, grids of 6+ tiles, urgency tactics.

## Signature moves
1. Caps + script pair: `PRIVATE RESIDENCES` in Prata +0.04em with a Pinyon script word ("Aurelia", "since", the place name) overlapping the caps baseline by 30%, in champagne.
2. Arch windows: hero and gallery images masked `border-radius: var(--shape-arch)` (= 999px 999px 0 0) (or `clip-path` arch), 3:4.
3. Champagne hairlines: 1px `--c-rule` frames inset 12px inside images and panels (double-line invitation border).
4. Unit selector: floor plans/apartments as a filterable list (`flip-grid`), each row = unit name, rooms, m², floor, status (real).
5. Slow reveals: arches open from the bottom (clip-path inset 100%→0, 1.5s).

## Colour roles
| name | value | role | never |
|---|---|---|---|
| burgundy | oklch(30% .09 18) | canvas | black, brown |
| velvet | oklch(35% .10 18) | panels on field | shadows as elevation |
| cream | oklch(93–94% .02 75–80) | type; inverted panels | page canvas |
| champagne | oklch(82% .08 85) | hairlines, script word, CTA fill | gradients, large fills |

## Typography
Display Prata 400 caps +0.04em lh 1.0; H2 Prata `--fs-2xl` title case. Script Pinyon ≤1 word per viewport (outlier slot 1: hero; slot 2: signature in footer). Body Jost 300 17px/1.7; labels Jost 500 12px caps +0.18em (only for unit meta and nav). Hebrew: Bona Nova 400/700 display (no caps; script flourish replaced by Bona Nova 700 in champagne), Assistant 300 body; lh 1.1.
Weight-contrast exception (antipatterns #14): Prata didone (single weight) + one script word against light Jost; classification contrast.
Hebrew recipe (≤3 families): Bona Nova for display in both scripts (it ships Latin), Assistant 300/400 for body, and Pinyon Script only as an optional Latin ornament (one word per view, counted as the outlier; never on Hebrew words). Prata and Jost do not render on Hebrew pages (the `:root:where([lang="he"])` block in tokens.css).

## Layout
12-col, max 1400px, symmetric and calm (centred compositions allowed here: ≤2 centred elements per view). Hero: arch image centre, caps above, script overlapping, one CTA "Book a private viewing". Sections: arch gallery (3 arches of different heights), residences list/unit selector, location map, amenities in cream panel, contact form in cream. Affinity: Photographic, Specimen, Long Document, Catalogue (units). Rejects: Bento, Marquee Hero, Workbench, Stat-Led grids.

## Components
- Nav: centred wordmark (Prata caps) with 2 links each side, champagne hairline under; 80px.
- Footer: letter close with a script signature + address + sales office hours (real) + legal.
- Buttons: 52px rectangular, champagne 1px outline, cream Jost 500 caps 12px; primary champagne fill burgundy text; hover = fill wipe from bottom 650ms.
- Cards: velvet panels with inset double hairline; no shadow.
- Product card (unit/product): arch image 3:4, name Prata, meta row (rooms · m² · floor) Jost 14px, status tag cream outline.

## Backgrounds
Flat burgundy; `.bg-grain` 3% (velvet). shader-bg `grain-gradient` burgundy→velvet in hero only; `fluted-glass` for amenity images.

## Motion (budget 5)
House ease `cubic-bezier(.25,1,.5,1)` 650ms; Lenis lerp 0.08. Signature: arch reveal + script word draws in via SVG stroke (if outlined) or opacity mask left→right (reading direction). Allowed: `clip-reveal`, `split-reveal` (caps lines), `hscroll` (gallery), `flip-grid` (units), `map`, `accordion`, `footer-reveal`. Not: marquee, magnetic, bento, cursor, counters.

## Imagery
Architectural renders or photos at golden hour, interiors with warm lamps, materials (marble, oak); graded warm with deep reds preserved. Never: stock couples with champagne, drone shots with lens flare, HDR.

## RTL notes
Script flourish is Latin-only; in Hebrew replace with Bona Nova 700 champagne word (no italics). Unit numbers, m², prices `dir="ltr"`. Arches symmetric, no flip needed.

## Do / Don't
- Do burgundy field; Don't swap to cream page with burgundy accents (lands in the cream attractor).
- Do one script word per view; Don't script whole lines.
- Do arches; Don't round rectangle images 16px.
- Do real unit data; Don't invent "only 3 left".
- Do champagne hairlines; Don't use gold gradients.
- Do cream panels for forms; Don't put inputs on burgundy.

## Palette drops
- Burgundy + champagne (default). = `tokens.css` above (AA: ink/canvas 11.5 · ink-2/canvas 8.9 · muted/canvas 6.1 · muted/surface 5.1 · accent-ink/accent 8.1 · ink/surface 9.6)
- Bottle green: canvas oklch(29% .06 160), ink oklch(93% .025 85), accent oklch(82% .09 80).
  Override: `--c-canvas: oklch(29% 0.06 160); --c-surface: oklch(34% 0.06 160); --c-surface-2: oklch(93% 0.018 160); --c-ink: oklch(93% 0.025 85); --c-ink-2: oklch(84.9% 0.025 85); --c-muted: oklch(72% 0.025 85); --c-rule: oklch(93% 0.025 85 / 0.16); --c-accent: oklch(82% 0.09 80); --c-accent-ink: oklch(29% 0.06 160); --c-focus: oklch(82% 0.09 80);`
  AA: ink/canvas 11.2 · ink-2/canvas 8.7 · muted/canvas 5.5 · muted/surface 4.6 · accent-ink/accent 7.8 · ink/surface 9.3
- Midnight navy: canvas oklch(24% .06 262), ink oklch(94% .02 80), accent oklch(80% .07 60) rose-gold-free champagne.
  Override: `--c-canvas: oklch(24% 0.06 262); --c-surface: oklch(29% 0.06 262); --c-surface-2: oklch(88% 0.018 262); --c-ink: oklch(94% 0.02 80); --c-ink-2: oklch(85.1% 0.02 80); --c-muted: oklch(66.3% 0.02 80); --c-rule: oklch(94% 0.02 80 / 0.16); --c-accent: oklch(80% 0.07 60); --c-accent-ink: oklch(24% 0.06 262); --c-focus: oklch(80% 0.07 60);`
  AA: ink/canvas 13.8 · ink-2/canvas 10.5 · muted/canvas 5.4 · muted/surface 4.6 · accent-ink/accent 8.7 · ink/surface 11.9

## Knobs
Arch vs rectangle-with-hairline images; script on/off; unit selector on/off; nav centred vs split; cream panel frequency; hero single arch vs triptych.
