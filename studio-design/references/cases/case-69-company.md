---
case: case-69-company
descriptor: "French freelance interactive designer portfolio"
region: Europe (France)
site_type: company (freelancer portfolio)
industry: interactive / product design
platform: Next.js + Prismic, WebGL canvas
libs_detected: [next]
direction_match: [void-stage, film-title-bands, organic-colour-block]
captured: 2026-10-01
source: "agency own site scan 2026-10 (home + 2 case studies; home and case intros are single 900px stages, case bodies reached only partly)"
---
> Each project gets the whole screen and its own colour: a 135px serif name, one sentence, "Open case study →", and tilted image planes that bend as you scroll to the next.

## DNA summary
- Macrostructure: intro (near-black, outlined serif name) → project slides, one per viewport, each with its primary/secondary colour (G-15): project name 135px (Eksell Large serif, short one-word names) start-aligned, 20px one-sentence brief (e.g. designing a video-first dating app), "OPEN CASE STUDY →" 16px caps +2px, a vertical counter of 8 dots at the end edge, and 2-3 WebGL image planes skewed ±10-15deg drifting through.
- Nav: name top-start, ABOUT top-end only.
- Case: same hero with BACK HOME, then long-form case (80px heads, 20-24px body, white/near-black alternating sections).

## Signature moves
- **Colour-per-project slides** with skewed media planes (case-31-company and case-87-company do the colour field on case pages; this portfolio does it on the home index).
- One serif display face at a single size (135px) for every project name.

## Tokens observed
- Fonts: Silka (UI/body) + Eksell Display (serif display). Free subs: "Manrope" / "DM Sans" + "Playfair Display" 600 or "DM Serif Display". Hebrew: Rubik 400 + Frank Ruhl Libre 700.
- Palette: #1C1C1C base, project colours (slate #3D6681, pink, red #F13144, blue #0072FF), white.
- Radii 4px; one speech-bubble shape (31.5px 31.5px 31.5px 0). Sizes 14 / 16 / 20 / 80 / 135px.

## Motion inventory
- Scroll-snapped slide changes with canvas colour tween; WebGL planes skew with scroll velocity; vertical counter updates. Reduced motion would need stacked blocks.

## Steal / Don't steal
- Steal: G-15 for a studio with ≤8 hero projects; one sentence + one CTA per project; counter at the edge.
- Don't steal: WebGL-only planes without image fallbacks; white text on light project colours (check contrast per project token).

## ACF mapping hints
- `project_slides` (relationship: name, sentence, colour primary/secondary tokens, 2-3 images, case link) · counter auto.
