---
name: apparatus-night
title: Apparatus Night
tagline: "A research lab after hours: violet-black air, one hand-built brass instrument glowing at the centre, an upright classical serif naming what it measures."
axes: { paper_band: dark, display_style: classical-serif, accent_hue: yellow, radius_system: soft, density: 5, variance: 6, motion: 6 }
fits: [landing, company]
subjects_good: [deep-tech, research labs, AI infrastructure, quantum/photonics, biotech platforms, observatories, premium audio engineering]
subjects_bad: [discount retail, kids, streetwear, cafés, festivals]
neighbours: [cosmic-retrofuture, telemetry-terminal, whisper-studio, void-stage]
fonts: { display: "Gloock 400 (Google)", body: "Schibsted Grotesk 400", mono: "Martian Mono 300", hebrew: ["Frank Ruhl Libre", "Assistant"] }
---
# Apparatus Night
Specimen: _specimens/apparatus-night.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gloock&family=Schibsted+Grotesk:wght@400..700&family=Martian+Mono:wdth,wght@75..112.5,300..500&family=Frank+Ruhl+Libre:wght@400..700&family=Assistant:wght@300..600&display=swap">
*/
:root {
  --c-canvas: oklch(13% 0.014 265); --c-surface: oklch(17% 0.016 265); --c-surface-2: oklch(21% 0.018 265);
  --c-ink: oklch(93% 0.010 265); --c-ink-2: oklch(80% 0.012 265); --c-muted: oklch(64% 0.020 265);
  --c-rule: oklch(30% 0.020 265); --c-accent: oklch(79% 0.13 78); --c-accent-ink: oklch(13% 0.014 265);
  --c-focus: oklch(79% 0.13 78);
  --c-chord: oklch(70% 0.16 25); /* coral: inside the apparatus only */
  --f-display: "Gloock", "Frank Ruhl Libre", Georgia, serif; --f-body: "Schibsted Grotesk", "Assistant", system-ui, sans-serif;
  --f-mono: "Martian Mono", ui-monospace, monospace; --f-outlier: "Martian Mono", monospace;
  --fs-xs: 0.75rem; /* ≥12px */ --fs-sm: 0.8125rem; --fs-base: 1rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.1rem);
  --fs-2xl: clamp(2.3rem, 1.6rem + 2.6vw, 3.6rem); --fs-3xl: clamp(3rem, 1.8rem + 4.5vw, 5.5rem);
  --fs-display: clamp(3rem, 1.4rem + 5.2vw, 6.25rem);
  --lh-tight: 1.02; --lh-body: 1.6; --tr-display: -0.02em; --tr-label: 0.04em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 36px; --sp-7: 56px; --sp-8: 88px; --sp-9: 136px; --sp-10: 200px;
  --section-y: clamp(88px, 8vw + 32px, 200px); --gutter: clamp(20px, 3.5vw, 56px); --maxw: 1320px;
  --r-sm: 6px; --r-md: 12px; --r-lg: 20px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 160ms; --d-med: 480ms; --d-slow: 1100ms;
  --shadow-1: 0 0 0 1px var(--c-rule); --shadow-2: 0 0 0 1px var(--c-rule), 0 30px 80px -30px oklch(79% 0.13 78 / 0.18);
}
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.1; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Frank Ruhl Libre", "Gloock", Georgia, serif; --f-body: "Assistant", "Schibsted Grotesk", system-ui, sans-serif; }
```

## Essence
Violet-tilted night with one hand-built focal artefact (filament chamber, dial, prism, lattice) instead of floating orbs: an SVG/canvas object in brass lines with a coral chord inside. The headline is an upright classical serif; the verb that matters is marked by brass colour + a 2px underline (not italics). Technical labels are mono and rare. A faint blueprint grid (4%) sits under the hero. Absent: purple→blue gradients, blurred orbs, glassmorphism, neon.

## Signature moves
1. The apparatus: one bespoke SVG/canvas instrument (≥40% hero area), 1.25px brass strokes, animated by a physical logic (needle, rotation, filament flicker) tied to scroll.
2. Verb landmark: one word per page in brass with `text-decoration: underline 2px; text-underline-offset: .18em` (this replaces the banned italic-accent word; allowed once).
3. Meter strip under hero: 3–4 real specifications in Martian Mono 300 with units, separated by 1px rules.
4. Blueprint grid `.bg-grid` 32px at 4% ink, masked radially around the apparatus.
5. Chapter plates: sections open with a small brass-line diagram (60px) instead of eyebrows.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| night | oklch(13% .014 265) | canvas | purple glow gradients |
| slate steps | 17/21% L | surfaces | glass panels |
| moon ink | oklch(93% .01 265) | text | pure white |
| brass | oklch(79% .13 78) | apparatus lines, CTA, verb landmark | body text, backgrounds |
| coral chord | oklch(70% .16 25) | inside the apparatus only | UI |

## Typography
Display Gloock 400, -0.02em, lh 1.02, sentence case, upright. H2 Gloock `--fs-2xl`. Body Schibsted Grotesk 400 16px/1.6. Mono Martian Mono 300 wdth 87.5, 12px, only in meter strip/spec tables. Ratio 1.414. Hebrew: Frank Ruhl Libre 500 display (lh 1.1), Assistant 400 body; Hebrew mono falls back to Assistant (numbers stay Latin mono).
Weight-contrast exception (antipatterns #14): serif display (Gloock, single weight) against a grotesk body; hierarchy by classification + size ≥3×.

## Layout
12-col, max 1320px. Hero: apparatus centred-right (cols 6–12), headline cols 1–6 aligned to its axis line, meter strip full width beneath. Sections: long-form explanation with diagrams in the margin (Long Document), a pinned "how it works" where the apparatus changes state per step, papers/partners index. Affinity: Long Document, Narrative Workflow, Map/Diagram, Specimen. Rejects: Bento, Catalogue, Marquee Hero.

## Components
- Nav: instrument bezel (not the AI nav, antipatterns #33): a 1px brass bezel rule across the top with the wordmark engraved at inline-start; links set as small-caps channel labels on the rule, each with an N15 mono superscript of real content counts (Research⁶ · Instruments³ · Lab¹); the one CTA is a toggle-switch link "Request access" with a lit indicator dot at inline-end. After the hero it collapses into a round bezel button at inline-end top that opens the NV-FS overlay; 56px; transparent.
- Footer: letter close: a short signed paragraph from the founders/lab (real) + contact + index row.
- Buttons: pill 48px, brass 1px outline + brass text; primary = brass fill night text; hover glow `--shadow-2`.
- Cards: 1px rule ring, radius 12px, surface; no shadow except hover.
- Product card (plans/modules): ring card with a small line-diagram, name in Gloock, specs in mono.

## Backgrounds
`.bg-grid` (blueprint, 4%), `.bg-grain` 3%; shader-bg `god-rays` in brass at ≤0.15 intensity confined to the apparatus box.

## Motion (budget 6)
House ease `cubic-bezier(.16,1,.3,1)` 480ms. Signature: apparatus state machine scrubbed by scroll through the pinned how-it-works (SVG attributes via GSAP, `scrub: 0.6`). Allowed: `shader-bg` (god-rays), `split-reveal` (headline lines once), `counter` (meter strip, real values), `accordion`, `footer-reveal`, `nav`, `sphere` (only if the subject is spherical: planets, cells). Not: marquee, magnetic, cursor, bento, stack-cards.

## Imagery
Hand-built SVG instruments, real lab photography graded cool with brass highlights, microscope/telescope imagery with sources. Never: stock "AI brain", circuit-board glows, generic 3D spheres.

## RTL notes
Apparatus stays unmirrored (physical object); headline column flips to the right. Units and formulas `dir="ltr"`. No italics in Hebrew; the verb landmark (colour + underline) works identically.

## Do / Don't
- Do build one artefact; Don't use blurred orbs for depth.
- Do upright serif; Don't italicise a headline word.
- Do mono only in the meter strip/specs; Don't mono every label.
- Do brass for lines + CTA; Don't flood a section in brass.
- Do real specs; Don't write "Next-gen" metrics.
- Do mask the grid around the artefact; Don't grid the whole page.

## Palette drops
- Violet night + brass (default). = `tokens.css` above (AA: ink/canvas 16.4 · ink-2/canvas 10.8 · muted/canvas 6.0 · muted/surface 5.7 · accent-ink/accent 10.3 · ink/surface 15.6)
- Ink-green night: canvas oklch(14% .02 170), accent oklch(82% .11 95) pale gold, chord oklch(70% .14 20).
  Override: `--c-canvas: oklch(14% 0.02 170); --c-surface: oklch(18% 0.02 170); --c-surface-2: oklch(22% 0.02 170); --c-ink: oklch(94% 0.015 170); --c-ink-2: oklch(81% 0.015 170); --c-muted: oklch(59.1% 0.015 170); --c-rule: oklch(94% 0.015 170 / 0.16); --c-accent: oklch(82% 0.11 95); --c-accent-ink: oklch(14% 0.02 170); --c-focus: oklch(82% 0.11 95);`
  AA: ink/canvas 16.7 · ink-2/canvas 11.1 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 11.4 · ink/surface 15.8
- Blue-steel night: canvas oklch(14% .02 240), accent oklch(84% .09 60) champagne, chord oklch(72% .14 330).
  Override: `--c-canvas: oklch(14% 0.02 240); --c-surface: oklch(18% 0.02 240); --c-surface-2: oklch(22% 0.02 240); --c-ink: oklch(94% 0.015 240); --c-ink-2: oklch(81% 0.015 240); --c-muted: oklch(59.1% 0.015 240); --c-rule: oklch(94% 0.015 240 / 0.16); --c-accent: oklch(84% 0.09 60); --c-accent-ink: oklch(14% 0.02 240); --c-focus: oklch(84% 0.09 60);`
  AA: ink/canvas 16.7 · ink-2/canvas 11.0 · muted/canvas 4.9 · muted/surface 4.6 · accent-ink/accent 12.0 · ink/surface 15.8

## Knobs
Artefact type (dial / filament / prism / lattice / orbit); apparatus placement (centre / inline-end / full band); meter strip on/off; verb landmark on/off; grid mask radius; display size (mid / large).
