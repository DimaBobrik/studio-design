---
name: media-bento-night
title: Media Bento Night
status: attractor-guarded   # dark + one neon cluster; see Guard
tagline: "A late-night video wall: a dense graphite bento of real clips, sticker promo tiles slapped on at an angle, and one hot-pink signal for 'make it now'."
axes: { paper_band: dark, display_style: wide-geometric, accent_hue: magenta, radius_system: soft, density: 9, variance: 6, motion: 6 }
fits: [landing, ecommerce]
subjects_good: [AI video/image tools, creator platforms, streaming, game studios, VFX, music video production, social apps, template marketplaces]
subjects_bad: [law, clinics, heritage crafts, luxury jewellery, NGOs with little media]
neighbours: [dev-playground, telemetry-terminal, film-title-bands, void-stage]
fonts: { display: "Unbounded 700 (Google)", body: "Onest 400/500 (Google)", hebrew: ["Heebo"] }
---
# Media Bento Night
Specimen: _specimens/media-bento-night.html

## Guard
Dark + one neon is the 2026 AI default (acid lime/green). This direction is kept because media-dense product pages genuinely need a dark wall. Rules: accent is NEVER acid green/lime or vermilion; media, not colour, must fill ≥60% of the first two viewports; every tile shows real product output (with source/credit), never placeholder gradients.

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Onest:wght@400;500;600&family=Heebo:wght@400;500;700;800&display=swap">
*/
:root {
  --c-canvas: oklch(16% 0.008 285); --c-surface: oklch(21% 0.010 285); --c-surface-2: oklch(26% 0.012 285);
  --c-ink: oklch(96% 0.005 285); --c-ink-2: oklch(84% 0.008 285); --c-muted: oklch(66% 0.010 285);
  --c-rule: oklch(31% 0.012 285); --c-accent: oklch(68% 0.26 355); --c-accent-ink: oklch(16% 0.008 285);
  --c-focus: oklch(75% 0.2 355);
  --c-sticker: oklch(89% 0.17 100); /* promo stickers only */
  --f-display: "Unbounded", "Heebo", system-ui, sans-serif; --f-body: "Onest", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Unbounded", sans-serif;
  --fs-xs: 0.75rem; --fs-sm: 0.8125rem; --fs-base: 0.9375rem; --fs-lg: 1.125rem; --fs-xl: 1.5rem;
  --fs-2xl: clamp(1.9rem, 1.4rem + 1.8vw, 2.8rem); --fs-3xl: clamp(2.4rem, 1.6rem + 3vw, 4rem);
  --fs-display: clamp(2.6rem, 1.4rem + 4.2vw, 5.25rem); /* modest: media dominates */
  --lh-tight: 1.02; --lh-body: 1.5; --tr-display: -0.02em; --tr-label: 0.01em;
  --sp-1: 4px; --sp-2: 6px; --sp-3: 8px; --sp-4: 12px; --sp-5: 16px; --sp-6: 24px; --sp-7: 32px; --sp-8: 48px; --sp-9: 72px; --sp-10: 112px;
  --section-y: clamp(40px, 4vw + 16px, 96px); --gutter: clamp(10px, 1.4vw, 20px); --maxw: 1760px;
  --r-sm: 8px; --r-md: 14px; --r-lg: 20px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --ease-in: cubic-bezier(0.64, 0, 0.78, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 140ms; --d-med: 260ms; --d-slow: 520ms;
  --shadow-1: 0 0 0 1px var(--c-rule); --shadow-2: 0 20px 50px -20px oklch(0% 0 0 / 0.7);
}
:root[dir="rtl"] { --tr-display: 0; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Unbounded", system-ui, sans-serif; --f-body: "Heebo", "Onest", system-ui, sans-serif; }
```

## Essence
A graphite wall packed with real media: a dense bento of autoplaying (muted, in-view only) clips and stills, tight 10–20px gaps, 14–20px tile radius. Promo moments are "stickers": small yellow or pink tiles rotated −4° overlapping tile corners. Display type is wide geometric and modest; the media is the headline. One hot-pink accent for create/generate actions. Absent: acid green, gradient text, orbs, empty tiles, fake UI chrome.

## Signature moves
1. Dense media bento (`bento` module): 9–14 tiles, mixed spans (2×2, 2×1, 1×1), each tile = one real output with a 12px caption (model/effect name).
2. Hover-to-play: tiles show poster, play on hover/in-view (≤3 videos playing at once), scale 1.02.
3. Sticker promo tiles rotated −4°/+3° with Unbounded 800 12px caps (real offer/new feature).
4. Mega nav: product menu opens as a media grid (thumbnails of each tool), not text lists.
5. Pill filter rail (sticky) above galleries: category pills scroll horizontally.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| graphite | oklch(16% .008 285) | canvas | pure #000 or #0B0B0B |
| tile | oklch(21–26% .01 285) | tile backgrounds, pills | gradients |
| ink | oklch(96% .005 285) | text | coloured headings |
| hot pink | oklch(68% .26 355) | create/generate CTA, active pill | glow shadows, text runs |
| sticker yellow | oklch(89% .17 100) | promo stickers only | buttons |

## Typography
Display Unbounded 700, -0.02em, max 5.25rem; H2 Unbounded 700 `--fs-2xl`. Body/UI Onest 400/500 15px. Captions Onest 500 12px muted. Ratio 1.25 (UI-dense). Hebrew: Heebo 800 display / 400 UI; Unbounded's width is not matched, so Hebrew display goes 10% larger.

## Layout
Fluid to 1760px, gutters 10–20px. Hero: one-line display + prompt-like input or 2 CTAs on the inline-start third, bento wall filling the rest and continuing below the fold. Sections: tool grid (media tiles), pricing (pills + 3 plan tiles), creator gallery (masonry), FAQ. Affinity: Bento, Portfolio Grid, Catalogue (templates). Rejects: Long Document, Manifesto, Letter.

## Components
- Nav: mega-menu bar (N11) 56px: wordmark, 5 product menus (media dropdowns), pricing, sign in, pink "Create".
- Footer: index columns inside tiles + language switch; no social icon wall unless real accounts.
- Buttons: pill 44px, pink fill graphite text 600; secondary tile-coloured pill; hover +5% L.
- Cards: tiles, radius 14–20px, 0 border, media fills tile; caption overlay bottom-inline-start on a 60% graphite pill.
- Product card (templates/assets): 16:9 or 9:16 media tile, name 14px 500, price/credits pill.

## Backgrounds
Flat graphite. `.bg-glow` NOT used. `.bg-grain` 3% to unify mixed media; shader-bg none (media is the background).

## Motion (budget 6)
House ease `cubic-bezier(.22,1,.36,1)` 260ms. Signature: bento tiles fill in from the hero like a contact sheet (scale 0.96 → 1, opacity, stagger by grid position 25ms, once). Allowed: `bento`, `marquee` (one row of creator clips), `flip-grid` (filter), `quickview`, `testimonials`, `nav`, `stack-cards` (feature steps). Not: split-reveal chars, cursor followers, shader-bg, magnetic.

## Imagery
Real generated or produced outputs, varied ratios (16:9, 9:16, 1:1), credits on every tile; video ≤4MB loops, posters mandatory. Never: purple nebula stock, AI brains, placeholders, gradient-only tiles.

## RTL notes
Bento grid mirrors (grid-auto-flow respects direction); captions anchor inline-start; filter rail scroll starts at inline-start; sticker rotations multiply by `SD.dir()`.

## Do / Don't
- Do real media in every tile; Don't leave a gradient tile.
- Do pink for create only; Don't pink links, headings or glows.
- Do ≤3 playing videos; Don't autoplay the whole wall.
- Do captions with source; Don't show uncredited outputs.
- Do modest display; Don't put a 10rem headline over the wall.
- Do tight gaps 10–20px; Don't space tiles 40px (wall dies).

## Palette drops
- Graphite + hot pink (default). = `tokens.css` above (AA: ink/canvas 17.3 · ink-2/canvas 11.9 · muted/canvas 6.2 · muted/surface 5.7 · accent-ink/accent 5.6 · ink/surface 15.8)
- Ink blue night: canvas oklch(17% .03 260), accent oklch(78% .15 60) tangerine, stickers oklch(85% .12 320).
  Override: `--c-canvas: oklch(17% 0.03 260); --c-surface: oklch(22% 0.03 260); --c-surface-2: oklch(27% 0.03 260); --c-ink: oklch(96% 0.005 285); --c-ink-2: oklch(84.2% 0.005 285); --c-muted: oklch(61.2% 0.005 285); --c-rule: oklch(96% 0.005 285 / 0.16); --c-accent: oklch(78% 0.15 60); --c-accent-ink: oklch(17% 0.03 260); --c-focus: oklch(78% 0.15 60);`
  AA: ink/canvas 17.0 · ink-2/canvas 11.8 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 9.2 · ink/surface 15.4
- Warm studio: canvas oklch(18% .01 40), accent oklch(80% .14 200) cyan, stickers oklch(90% .15 100).
  Override: `--c-canvas: oklch(18% 0.01 40); --c-surface: oklch(23% 0.01 40); --c-surface-2: oklch(28% 0.01 40); --c-ink: oklch(96% 0.005 285); --c-ink-2: oklch(84.3% 0.005 285); --c-muted: oklch(61.8% 0.005 285); --c-rule: oklch(96% 0.005 285 / 0.16); --c-accent: oklch(80% 0.14 200); --c-accent-ink: oklch(18% 0.01 40); --c-focus: oklch(80% 0.14 200);`
  AA: ink/canvas 16.8 · ink-2/canvas 11.6 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 10.7 · ink/surface 15.1

## Knobs
Tile count 9/12/14; tile radius 8/14/20; hero input vs CTAs; sticker count 0–3; masonry vs strict bento; mega-nav thumbnails on/off.
