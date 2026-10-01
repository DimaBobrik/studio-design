---
name: billboard-type
title: Billboard Type
tagline: "A wheat-pasted billboard: one saturated field, gigantic black caps cropped by the edges of the screen, and statements instead of paragraphs."
axes: { paper_band: field, display_style: display-heavy, accent_hue: warm, radius_system: "0", density: 4, variance: 9, motion: 7 }
fits: [company, landing, ecommerce]
subjects_good: [agencies, campaigns, music labels, bars, festivals, sports clubs, activist NGOs, merch drops, streetwear]
subjects_bad: [clinics, law (unless activist), luxury jewellery, spa, enterprise procurement]
neighbours: [neo-brutal-exhibit, riso-two-ink, couture-condensed, kikar-heavy]
fonts: { display: "Anton (Google)", body: "Public Sans 500 (Google)", hebrew: ["Karantina", "Heebo"] }
---
# Billboard Type
Specimen: _specimens/billboard-type.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Public+Sans:wght@400;500;700;900&family=Karantina:wght@400;700&family=Heebo:wght@400;500;700&display=swap">
*/
:root {
  --c-canvas: oklch(62% 0.22 29); --c-surface: oklch(96% 0.012 60); --c-surface-2: oklch(50% 0.20 29);
  --c-ink: oklch(10% 0.020 29); --c-ink-2: oklch(14% 0.030 29); --c-muted: oklch(18% 0.050 29); /* AA on the field: 5.1 / 4.9 / 4.7 */
  --c-rule: oklch(10% 0.020 29); --c-accent: oklch(96% 0.012 60); --c-accent-ink: oklch(10% 0.020 29);
  --c-focus: oklch(96% 0.012 60);
  --f-display: "Anton", "Karantina", Impact, sans-serif; --f-body: "Public Sans", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Anton", sans-serif;
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.0625rem; --fs-lg: clamp(1.4rem, 1.1rem + 1vw, 1.9rem);
  --fs-xl: clamp(2rem, 1.5rem + 2vw, 3rem); --fs-2xl: clamp(3rem, 2rem + 4.5vw, 6rem); --fs-3xl: clamp(4.5rem, 2rem + 10vw, 12rem);
  --fs-display: clamp(5.5rem, 0.5rem + 21vw, 24rem); /* meant to crop at the viewport edges */
  --lh-tight: 1.0; --lh-body: 1.45; --tr-display: -0.01em; --tr-label: 0.02em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 56px; --sp-8: 88px; --sp-9: 136px; --sp-10: 200px;
  --section-y: clamp(64px, 7vw + 24px, 176px); --gutter: clamp(12px, 2vw, 32px); --maxw: 1680px; /* text blocks only; display ignores it */
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 0px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.85, 0, 0.15, 1);
  --d-fast: 100ms; --d-med: 260ms; --d-slow: 700ms;
  --shadow-1: none; --shadow-2: none;
}
[data-surface="paper"] { --c-canvas: var(--c-surface); --c-ink: oklch(10% .02 29); --c-accent: oklch(55% .22 29); --c-accent-ink: oklch(96% .012 60); } /* paper on red AA 4.8 */
:root[dir="rtl"] { --lh-tight: 0.95; --fs-display: clamp(6rem, 1rem + 24vw, 28rem); } /* Karantina is narrow + short: go bigger */
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Karantina", "Anton", Impact, sans-serif; --f-body: "Heebo", "Public Sans", system-ui, sans-serif; }
```

## Essence
Typography alone carries the brand: one saturated field colour for the whole site, near-black caps at viewport scale cropped by the screen edges, and short uppercase statements. Paper white appears only as inverse slabs (forms, CTA). Pictures, when present, are small and square inside the field, like posters pasted on a wall. Absent: cards, gradients, icons, thin type, multiple colours at once.

## Signature moves
1. Viewport-scale display (≥21vw) that intentionally overflows: `white-space: nowrap; margin-inline: -0.04em;` with `overflow: clip` on the section.
2. Statements: 3–7 word caps lines in `--fs-2xl` stacked with 0 gap, each a sentence.
3. Kinetic scale: the hero word scales 1.0→0.35 and pins as the nav wordmark on scroll (ScrollTrigger scrub).
4. Inverse slab: the primary CTA and forms are paper-white rectangles with ink text on the field.
5. One velocity marquee of real names (clients, lineup, releases) skewing with scroll speed.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| field red | oklch(62% .22 29) | whole-site canvas | mixed with a second field on the same page |
| ink | oklch(10% .02 29) | all type | pure #000 |
| paper | oklch(96% .012 60) | inverse slabs, forms | canvas of a whole section (unless `[data-surface=paper]` finale) |
| field-dark | oklch(50% .2 29) | hover fill, image mats | text |

## Typography
Display Anton uppercase lh 1.0 (floor). Statements Anton `--fs-2xl`. Body Public Sans 500 17px, short (≤3 lines per block). Labels Public Sans 700 13px. Ratio ≥2 between steps (few sizes, violent jumps). Hebrew: Karantina 700 display (narrow, needs +15% size, lh 0.95), Heebo 500 body.
Weight-contrast exception (antipatterns #14): Anton is single-weight compressed caps against a sans body; hierarchy by case + size ≥6×.

## Layout
Edge-to-edge, 12-col only for small text; display ignores the grid. Hero = one word or name at 21vw, bleeding both edges; a single statement and slab CTA at bottom-inline-start. Sections: statement stacks, a work index (big caps list with hover image preview), a square poster grid (1:1 images 3-up on the field). Affinity: Manifesto, Marquee Hero, Index-First, Quote-Led. Rejects: Bento, Workbench, Feature Stack, Catalogue with filters.

## Components
- Nav: edge-aligned minimal caps (wordmark · 3 links · contact), 56px, ink on field; the hero word collapses into it.
- Footer: statement sentence + giant cropped wordmark + one line of links.
- Buttons: inverse slab 60px, paper fill, ink Anton 20px caps, 0 radius; hover = ink fill paper text (100ms).
- Cards: none. Lists are giant caps rows separated by 2px ink rules.
- Product card (merch): 1:1 photo on field-dark mat, caps name, price in Public Sans 700.

## Backgrounds
Flat field only. `.bg-grain` 4% optional for wheat-paste feel. No shaders.

## Motion (budget 7)
Signature: hero word scale-to-nav (scrub). Allowed: `split-reveal` (statements, lines from below with mask), `marquee` (one, `data-velocity="true" data-skew="6"`), `text-fx` (`roll` or `scramble` `data-trigger="hover"` in index), `cursor` `data-variant="trail"` in the work index only (single hover preview = recipe), `footer-reveal`, `hscroll` (poster strip). Not: shader-bg, bento, stack-cards, magnetic.

## Imagery
Posters, record covers, flash photos, all square or 4:5, placed small; never full-bleed photo backgrounds under the type. Never: stock, 3D, gradients, rounded images.

## RTL notes
Overflow cropping must be symmetric (`margin-inline`), marquee direction flips, scale-to-nav anchors to inline-start. Hebrew has no caps: the brute force comes from Karantina's condensed weight and bigger size.

## Do / Don't
- Do one field per page; Don't switch field colours between sections.
- Do crop display at edges; Don't shrink it to fit the container.
- Do lh 1.0 on caps; Don't go below (cap collision).
- Do statements ≤7 words; Don't write paragraphs in caps.
- Do paper slabs for input; Don't place inputs directly on the field.
- Do one marquee; Don't add a second ticker.

## Palette drops
- Poster red (default). = `tokens.css` above (AA: ink/canvas 5.1 · ink-2/canvas 4.9 · muted/canvas 4.7 · muted/surface 16.9 · accent-ink/accent 18.3 · ink/surface 18.3)
- Cold Snap: field oklch(92% .045 50), ink oklch(24% .07 330) aubergine, slab mustard oklch(86% .18 95), hover oxblood oklch(40% .21 25).
  Override: `--c-canvas: oklch(92% 0.045 50); --c-surface: oklch(99.5% 0.012 50); --c-surface-2: oklch(80% 0.045 50); --c-ink: oklch(24% 0.07 330); --c-ink-2: oklch(30.8% 0.07 330); --c-muted: oklch(51.2% 0.07 330); --c-rule: oklch(24% 0.07 330 / 0.16); --c-accent: oklch(86% 0.18 95); --c-accent-ink: oklch(24% 0.07 330); --c-focus: oklch(24% 0.07 330);`
  AA: ink/canvas 13.2 · ink-2/canvas 10.7 · muted/canvas 4.6 · muted/surface 5.8 · accent-ink/accent 11.0 · ink/surface 16.4; accent/canvas 1.2 (<3: accent is a fill/surface colour, not text or UI line)
- Citrus Riot: field oklch(90% .2 122) lime, ink oklch(22% .04 300), slab deep magenta oklch(48% .24 350) with paper text.
  Override: `--c-canvas: oklch(90% 0.2 122); --c-surface: oklch(99.5% 0.012 122); --c-surface-2: oklch(78% 0.2 122); --c-ink: oklch(22% 0.04 300); --c-ink-2: oklch(28.8% 0.04 300); --c-muted: oklch(50.4% 0.04 300); --c-rule: oklch(22% 0.04 300 / 0.16); --c-accent: oklch(48% 0.24 350); --c-accent-ink: oklch(90% 0.2 122); --c-focus: oklch(48% 0.24 350);`
  AA: ink/canvas 13.5 · ink-2/canvas 11.1 · muted/canvas 4.6 · muted/surface 5.9 · accent-ink/accent 5.2 · ink/surface 17.3
- Kinetic night: field oklch(12% .01 60), ink paper oklch(95% .01 80), slab red oklch(58% .22 29).
  Override: `--c-canvas: oklch(12% 0.01 60); --c-surface: oklch(16.5% 0.01 60); --c-surface-2: oklch(21% 0.01 60); --c-ink: oklch(95% 0.01 80); --c-ink-2: oklch(80.1% 0.01 80); --c-muted: oklch(58.6% 0.01 80); --c-rule: oklch(95% 0.01 80 / 0.16); --c-accent: oklch(59.9% 0.22 29); --c-accent-ink: oklch(12% 0.01 60); --c-focus: oklch(59.9% 0.22 29);`
  AA: ink/canvas 17.5 · ink-2/canvas 10.9 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 4.6 · ink/surface 16.7; accent L 58->60% for AA
- Japanese-Swiss B/W: field oklch(97% .003 90), ink oklch(12% .005 90); outline and strike-through word stacks as the only ornament.
  Override: `--c-canvas: oklch(97% 0.003 90); --c-surface: oklch(99.5% 0.012 90); --c-surface-2: oklch(85% 0.003 90); --c-ink: oklch(12% 0.005 90); --c-ink-2: oklch(20.5% 0.005 90); --c-muted: oklch(54.2% 0.005 90); --c-rule: oklch(12% 0.005 90 / 0.16); --c-accent: oklch(12% 0.005 90); --c-accent-ink: oklch(97% 0.003 90); --c-focus: oklch(12% 0.005 90);`
  AA: ink/canvas 18.6 · ink-2/canvas 16.4 · muted/canvas 4.6 · muted/surface 4.9 · accent-ink/accent 18.6 · ink/surface 20.0 (B/W: the slab is ink with paper text)

## Knobs
Field drop; hero content (brand name / verb / number); display size 18–28vw; statement stack vs index list; ornament (none / outline words / stamps); scale-to-nav on/off.
