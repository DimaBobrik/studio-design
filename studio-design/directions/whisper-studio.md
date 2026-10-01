---
name: whisper-studio
title: Whisper Studio
tagline: "A Bauhaus studio notebook on violet-grey paper: whisper-weight display, black ink, and colour that lives only inside the artwork."
axes: { paper_band: light, display_style: light-grotesk, accent_hue: cool, radius_system: soft, density: 3, variance: 5, motion: 4 }
fits: [landing, company]
subjects_good: [AI audio/voice, creative tools, research studios, design SaaS, music tech, architecture software, calm fintech]
subjects_bad: [discount retail, sports, kids, heavy-industry, food]
neighbours: [machined-soft, architect-calm, apparatus-night, work-wall-neutral]
fonts: { display: "Hanken Grotesk 300 (Google)", body: "Hanken Grotesk 400/500", hebrew: ["Rubik"] }
---
# Whisper Studio
Specimen: _specimens/whisper-studio.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@200..700&family=Rubik:wght@300..600&display=swap">
*/
:root {
  --c-canvas: oklch(98.4% 0.004 300); --c-surface: oklch(96% 0.006 300); --c-surface-2: oklch(92.5% 0.008 300);
  --c-ink: oklch(16% 0.010 300); --c-ink-2: oklch(34% 0.010 300); --c-muted: oklch(53.5% 0.01 300);
  --c-rule: oklch(88% 0.008 300); --c-accent: oklch(50% 0.25 268); --c-accent-ink: oklch(98.4% 0.004 300);
  --c-focus: oklch(50% 0.25 268);
  --f-display: "Hanken Grotesk", "Rubik", system-ui, sans-serif; --f-body: "Hanken Grotesk", "Rubik", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Hanken Grotesk", sans-serif;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.3125rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.1rem);
  --fs-2xl: clamp(2.2rem, 1.6rem + 2.2vw, 3.4rem); --fs-3xl: clamp(2.9rem, 1.8rem + 4vw, 5rem);
  --fs-display: clamp(3rem, 1.2rem + 5.8vw, 6.75rem);
  --lh-tight: 1.0; --lh-body: 1.6; --tr-display: -0.035em; --tr-label: 0.01em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 36px; --sp-7: 56px; --sp-8: 96px; --sp-9: 128px; --sp-10: 184px;
  --section-y: clamp(80px, 7vw + 36px, 184px); --gutter: clamp(20px, 3.5vw, 56px); --maxw: 1320px;
  --r-sm: 10px; --r-md: 20px; --r-lg: 24px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 160ms; --d-med: 420ms; --d-slow: 900ms;
  --shadow-1: none; --shadow-2: 0 30px 60px -40px oklch(30% 0.05 300 / 0.35);
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.1; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Rubik", "Hanken Grotesk", system-ui, sans-serif; --f-body: "Rubik", "Hanken Grotesk", system-ui, sans-serif; }
```

## Essence
Pale violet-grey paper, black type at whisper weight (300) for display against 400/500 body: the contrast is in size, not weight. Everything is monochrome except the artwork: a generative object (gradient sphere, waveform, ribbon) holds the two "sparks" (cobalt-violet + orange). Cards are flat, 20–24px radius, separated by space rather than borders. Absent: bold headlines, coloured buttons, icons in tiles, gradients outside the artwork.

## Signature moves
1. Whisper display: Hanken Grotesk 300, -0.035em, at 6.75rem max; never bolded.
2. Artwork is the only colour: a `shader-bg` `mesh-gradient` (colours: accent + oklch(68% .21 40)) clipped to a wide 24px-radius ribbon card (≥ 2.4:1) under the display, not a page background. Not a floating sphere at inline-end: "headline left + round object right" is shared with machined-soft and apparatus-night and sits on the AI-orb attractor (2026-09 specimen audit).
3. Black pill CTA (ink fill) + plain text link; no coloured buttons.
4. Section gap ≥ 96px with a single hairline between major chapters only.
5. Audio/visual demo as a real interactive object (play, scrub), never a fake UI screenshot.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| paper | oklch(98.4% .004 300) | canvas | cream/warm |
| taupe-violet | oklch(96% / 92.5% .006–.008 300) | card surfaces | borders + shadows together |
| ink | oklch(16% .01 300) | text, CTA fill | coloured headings |
| spark cobalt | oklch(50% .25 268) | inside artwork, focus ring | buttons, text |
| spark orange | oklch(68% .21 40) | inside artwork only | anywhere else |

## Typography
Display 300, H2 300 `--fs-2xl`, H3 500 `--fs-lg`, body 400 17px/1.6, labels 500 13px sentence case. Ratio 1.333; weight contrast 300 vs 500 (the whisper is the brand; bolding it destroys it). Hebrew: Rubik 300 display / 400 body; Rubik's rounded corners soften the whisper, keep tracking 0, lh 1.1.
Weight-contrast exception (antipatterns #14): light 300 display at large size against 400/500 body is the direction (the whisper); hierarchy by scale ≥3×.

## Layout
12-col, max 1320px. Hero: display across cols 1–9, the artwork ribbon spanning cols 4–12 and overlapping the display's last line by ~0.4 line (one off-grid moment), lede + black pill at cols 1–4 beside the ribbon. Sections: 2-up cards (7/5 split), a full-width artwork band, a quiet 3-row list. Affinity: Split Studio, Feature Stack (sticky left text + scrolling right artefacts), Long Document. Rejects: Catalogue, Stat-Led, Marquee Hero.

## Components
- Nav: four corners (N16, not the AI nav #33): wordmark top inline-start, links as a small vertical list top inline-end, "Try it" as a quiet underlined link bottom inline-start (appears after the hero), language/contact bottom inline-end; fixed, 13px, no bar, no pill.
- Footer: newsletter-first: one line invitation + email pill field; then an inline single line of links.
- Buttons: pill 48px, ink fill, paper text, 500; hover = ink-2; secondary = text link with 1px underline offset 0.2em.
- Cards: flat surface, radius 20px, padding 32–40px, no border, no shadow.
- Product card (plans): surface-2 card, name 500, price 300 display size, features as a 3-line list; highlighted plan = artwork thumbnail, not colour fill.

## Backgrounds
Canvas flat. Artwork: shader-bg `mesh-gradient` or `grain-gradient` inside a clipped card; `.bg-grain` at 3% on artwork only.

## Motion (budget 4)
House ease `cubic-bezier(.16,1,.3,1)` 420ms. Signature: the artwork morphs slowly with scroll progress (recipe: `shader-bg` has no scroll-driven uniform, so either keep `data-speed` .1-.2 or mount Paper directly and tie a uniform to ScrollTrigger progress; paused offscreen). Allowed: `shader-bg`, `split-reveal` (lines, hero only), `accordion`, `testimonials` (real quotes), `nav`, `footer-reveal`. Not: marquee, cursor, magnetic, counters.

## Imagery
Generative/abstract artwork only in the two sparks; product UI shown as real screenshots inside surface cards with 12px radius; portraits in black and white. Never: stock 3D blobs on page backgrounds, purple glows, isometric illustrations.

## RTL notes
Artwork overlap flips to inline-start; waveform scrubbers keep LTR time direction (`dir="ltr"` on media controls).

## Do / Don't
- Do display at 300; Don't use 600+ for any heading.
- Do keep colour inside artwork; Don't tint section backgrounds with the sparks.
- Do flat cards; Don't add borders AND shadows.
- Do black pill CTA; Don't make the CTA cobalt.
- Do 96px+ section gaps; Don't compress to 48px.
- Do real demo audio/video; Don't draw a fake waveform UI.

## Palette drops
- Violet paper (default): sparks cobalt + orange. = `tokens.css` above (AA: ink/canvas 18.5 · ink-2/canvas 11.3 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 6.3 · ink/surface 17.3)
- Sage paper: canvas oklch(98% .006 150), sparks oklch(58% .16 150) + oklch(75% .14 85).
  Override: `--c-canvas: oklch(98% 0.006 150); --c-surface: oklch(95.6% 0.006 150); --c-surface-2: oklch(92.1% 0.006 150); --c-ink: oklch(16% 0.01 300); --c-ink-2: oklch(33.9% 0.01 300); --c-muted: oklch(53.3% 0.01 300); --c-rule: oklch(16% 0.01 300 / 0.16); --c-accent: oklch(58% 0.16 150); --c-accent-ink: oklch(16% 0.01 300); --c-focus: oklch(58% 0.16 150);`
  AA: ink/canvas 18.4 · ink-2/canvas 11.2 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 4.9 · ink/surface 17.1
- Night notebook: canvas oklch(16% .01 300), ink oklch(95% .005 300), surfaces 20/24% L; sparks unchanged.
  Override: `--c-canvas: oklch(16% 0.01 300); --c-surface: oklch(20.5% 0.01 300); --c-surface-2: oklch(25% 0.01 300); --c-ink: oklch(95% 0.005 300); --c-ink-2: oklch(80.8% 0.005 300); --c-muted: oklch(60.4% 0.005 300); --c-rule: oklch(95% 0.005 300 / 0.16); --c-accent: oklch(50% 0.25 268); --c-accent-ink: oklch(95% 0.005 300); --c-focus: oklch(95% 0.005 300);`
  AA: ink/canvas 16.8 · ink-2/canvas 10.7 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 5.7 · ink/surface 15.5; accent/canvas 3.0 (<3: accent is a fill/surface colour, not text or UI line)

## Knobs
Artwork type (ribbon [default] / waveform / grid of dots; sphere only inline and small); artwork placement (overlap / full band / inline small); hero scale (mid / giant single word); card radius 16/20/24; spark pair.
