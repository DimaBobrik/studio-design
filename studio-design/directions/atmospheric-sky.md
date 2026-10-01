---
name: atmospheric-sky
title: Atmospheric Sky
tagline: "A cargo flight at dawn: deep-blue sky dissolving to horizon light, massive white capitals flying through it, and small photo cards like windows passing by."
axes: { paper_band: dark, display_style: grotesk-caps-heavy, accent_hue: cool, radius_system: soft, density: 3, variance: 6, motion: 7 }
fits: [company, landing]
subjects_good: [logistics, shipping, aviation, energy, B2B infrastructure, insurance, telecom, climate tech, large corporates]
subjects_bad: [kids, fashion boutiques, cafés, crafts, zines]
neighbours: [film-title-bands, machined-soft, apparatus-night]
fonts: { display: "Host Grotesk 800 (Google)", body: "Host Grotesk 400", hebrew: ["Heebo"] }
---
# Atmospheric Sky
Specimen: _specimens/atmospheric-sky.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&family=Heebo:wght@300..900&display=swap">
*/
:root {
  --c-canvas: oklch(24% 0.09 258); --c-surface: oklch(30% 0.09 255); --c-surface-2: oklch(97% 0.008 240);
  --c-ink: oklch(97% 0.008 240); --c-ink-2: oklch(88% 0.020 240); --c-muted: oklch(78% 0.040 240);
  --c-rule: oklch(97% 0.008 240 / 0.22); --c-accent: oklch(85% 0.10 62); --c-accent-ink: oklch(24% 0.09 258);
  --c-focus: oklch(85% 0.10 62);
  --sky: linear-gradient(180deg, oklch(24% 0.09 258) 0%, oklch(38% 0.11 250) 55%, oklch(66% 0.09 230) 85%, oklch(84% 0.06 70) 100%); /* hero sky, one per page */
  --f-display: "Host Grotesk", "Heebo", system-ui, sans-serif; --f-body: "Host Grotesk", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Host Grotesk", sans-serif;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.25rem; --fs-xl: clamp(1.6rem, 1.3rem + 1vw, 2.2rem);
  --fs-2xl: clamp(2.5rem, 1.6rem + 3.4vw, 4.4rem); --fs-3xl: clamp(3.4rem, 2rem + 6vw, 8rem);
  --fs-display: clamp(3.5rem, 0.8rem + 9.4vw, 10.5rem);
  --lh-tight: 0.92; --lh-body: 1.6; --tr-display: -0.03em; --tr-label: 0.04em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 36px; --sp-7: 56px; --sp-8: 96px; --sp-9: 144px; --sp-10: 216px;
  --section-y: clamp(88px, 8vw + 36px, 200px); --gutter: clamp(18px, 3.5vw, 56px); --maxw: 1480px;
  --r-sm: 8px; --r-md: 16px; --r-lg: 28px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.83, 0, 0.17, 1);
  --d-fast: 180ms; --d-med: 600ms; --d-slow: 1400ms;
  --shadow-1: 0 10px 30px -12px oklch(15% 0.08 258 / 0.5); --shadow-2: 0 40px 80px -30px oklch(12% 0.08 258 / 0.7);
}
[data-surface="sheet"] { --c-canvas: var(--c-surface-2); --c-ink: oklch(22% .06 258); --c-ink-2: oklch(34% .05 258); --c-muted: oklch(48% .04 258); --c-rule: oklch(22% .06 258 / .14); --c-accent: oklch(45% .15 258); --c-accent-ink: var(--c-surface-2); }
:root[dir="rtl"] { --tr-display: 0; --lh-tight: 1.0; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Host Grotesk", system-ui, sans-serif; --f-body: "Heebo", "Host Grotesk", system-ui, sans-serif; }
```

## Essence
B2B at award level: the hero is an atmosphere (deep-blue sky to warm horizon, WebGL or CSS gradient with slow cloud drift), huge white capitals fly through it, and small rounded photo cards pass like aircraft windows. After the sky, a white sheet slides up over the dark (dark→light sheet transition) for the dense corporate content. One apricot "horizon" accent for primary actions. Absent: stock handshakes, globe icons, blue gradients on buttons, 3-column icon features.

## Signature moves
1. Sky hero: `shader-bg` `mesh-gradient` (colours = sky stops) or `--sky` CSS gradient + `.bg-grain`; clouds as 2 blurred PNG layers parallaxing at 0.2/0.5.
2. Flying capitals: display words at 10.5rem translate on x (±15vw) with scroll, in opposite directions per line.
3. Window cards: 3–5 small photo cards (radius 16px, 4:5, 180–260px wide) floating at different depths over the sky with their own parallax.
4. White sheet transition: content sheet (`data-surface="sheet"`, radius 28px top corners) scrolls over the pinned sky.
5. Route/number band: real operational figures (routes, tonnage, countries) with `counter`, set in 800 on the sheet.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| sky deep | oklch(24% .09 258) | canvas, hero top | purple→blue gradients on UI |
| sky gradient | `--sky` | hero only (one per page) | buttons, text |
| cloud white | oklch(97% .008 240) | type on sky, sheet canvas | pure #fff |
| horizon apricot | oklch(85% .10 62) | primary CTA, highlights on sky | body text |
| sheet accent | oklch(45% .15 258) | links on white sheet | backgrounds |

## Typography
Display Host Grotesk 800 caps, -0.03em, lh 0.92. H2 Host Grotesk 700 `--fs-2xl` sentence case on sheet. Body Host Grotesk 400 17px. Labels 500 13px +0.04em (sentence case). Ratio 1.5. Hebrew: Heebo 800 display (lh 1.0), Heebo 400 body.

## Layout
12-col, max 1480px. Hero: sky 120–160vh pinned, 2–3 lines of flying caps, window cards, CTA at bottom-inline-start. Then the sheet: services as large alternating image/text rows (≤2 in a row, third breaks full-width), numbers band, case studies `hscroll`, careers teaser, contact. Affinity: Photographic, Narrative Workflow, Stat-Led (real figures), Map/Diagram. Rejects: Bento with 9 tiles, Index-First, Manifesto.

## Components
- Nav: horizon line (not the AI nav, #33): links sit on a 1px horizon rule that spans the sky, the wordmark rides above the rule at inline-start, and "Get a quote" is a text link whose arrow is drawn along the rule to the inline-end (no pill). On the sheet it becomes N6 hide-on-scroll: the same rule + labels on paper at 92%.
- Footer: sky returns: mast-headed with a small sky gradient band, giant caps wordmark, offices and links.
- Buttons: pill 52px, apricot fill deep-blue text 600; on sheet: deep-blue fill white text. Hover: arrow icon well slides.
- Cards: window cards (photo, 16px radius, `--shadow-2`); on sheet: 28px radius surface-2 panels, no borders.
- Product card (services): image 4:3 radius 16px, title 700, 2-line text, link.

## Backgrounds
shader-bg `mesh-gradient` (preferred) or `god-rays` from the horizon; `.bg-grain` 3%; `.bg-aurora-lite` NOT used (aurora cliché).

## Motion (budget 7)
House ease `cubic-bezier(.16,1,.3,1)` 600ms; Lenis lerp 0.08. Signature: sheet slides over the pinned sky while the caps continue flying behind it. Allowed: `shader-bg`, `split-reveal` (caps lines), `counter` (real figures), `hscroll` (cases), `map` (routes), `footer-reveal`, `nav`, `stack-cards`. Not: marquee, cursor, magnetic, bento.

## Imagery
Aircraft, ships, cranes, operators at work, dawn/dusk light, cool shadows with warm highlights; cards show real operations. Never: glowing globes, network-line stock, handshake, generic skyscraper stock.

## RTL notes
Flying caps directions multiply by `SD.dir()`; window card parallax offsets mirror; numbers `dir="ltr"`; Hebrew display in Heebo 800 without caps (increase size 5%).

## Do / Don't
- Do one sky per page; Don't repeat sky gradients in every section.
- Do white sheet for dense content; Don't set long text on the sky.
- Do real operational numbers; Don't write "10,000+ happy clients".
- Do apricot for the CTA; Don't use blue gradient buttons.
- Do pause the shader offscreen; Don't run WebGL under the sheet.
- Do ≤5 window cards; Don't scatter 12 floating images.

## Palette drops
- Dawn blue + apricot (default). = `tokens.css` above (AA: ink/canvas 15.2 · ink-2/canvas 11.6 · muted/canvas 8.3 · muted/surface 6.9 · accent-ink/accent 10.3 · ink/surface 12.6)
- Dusk violet-free: canvas oklch(22% .06 230) teal-blue, horizon oklch(80% .12 45), accent oklch(80% .12 45).
  Override: `--c-canvas: oklch(22% 0.06 230); --c-surface: oklch(28% 0.06 230); --c-surface-2: oklch(95% 0.008 230); --c-ink: oklch(97% 0.008 240); --c-ink-2: oklch(87.8% 0.008 240); --c-muted: oklch(65.9% 0.008 240); --c-rule: oklch(97% 0.008 240 / 0.16); --c-accent: oklch(80% 0.12 45); --c-accent-ink: oklch(22% 0.06 230); --c-focus: oklch(80% 0.12 45);`
  AA: ink/canvas 15.6 · ink-2/canvas 11.8 · muted/canvas 5.4 · muted/surface 4.6 · accent-ink/accent 8.8 · ink/surface 13.2
- Storm grey: canvas oklch(28% .02 240), horizon oklch(90% .02 90), accent oklch(78% .15 85) signal yellow.
  Override: `--c-canvas: oklch(28% 0.02 240); --c-surface: oklch(34% 0.02 240); --c-surface-2: oklch(99.5% 0.008 240); --c-ink: oklch(97% 0.008 240); --c-ink-2: oklch(88.5% 0.008 240); --c-muted: oklch(71.3% 0.008 240); --c-rule: oklch(97% 0.008 240 / 0.16); --c-accent: oklch(78% 0.15 85); --c-accent-ink: oklch(28% 0.02 240); --c-focus: oklch(78% 0.15 85);`
  AA: ink/canvas 13.4 · ink-2/canvas 10.3 · muted/canvas 5.7 · muted/surface 4.6 · accent-ink/accent 7.2 · ink/surface 10.8

## Knobs
Sky tech (shader / CSS gradient / video); flying caps on/off; window card count 0–5; sheet radius 0/28px; numbers band on/off; nav island vs solid.
