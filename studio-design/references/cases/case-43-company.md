---
case: case-43-company
descriptor: New Zealand/Australian brand, product and ventures consultancy's own site
region: Oceania (New Zealand / Australia)
site_type: company (info) - brand/product consultancy
industry: brand, product & digital design consultancy
platform: Next.js + Sanity
libs_detected: [next]   # custom cursor, 25 videos, sticky playbook
direction_match: [billboard-type, swiss-signal-grid, riso-two-ink]
captured: 2026-09-30
source: "agency own site scan 2026-10"
scan_quality: one case study returned an app error; others fine
---
> A wheat-pasted poster in signal red: three black letters fill the wall, then the page turns into a quiet grey studio notebook of numbered principles.

## DNA summary
- Macrostructure: poster hero -> manifesto sentence -> numbered 6-step playbook (sticky, 5,528px) -> sector sentence -> work mosaic -> footer. Every text block is a single all-caps sentence centred or a numbered principle; no paragraphs over 40 words.
- Hero archetype: H-01 extreme - 3-letter acronym wordmark with ™ in black at full viewport width (~370px cap height) cropped at the top edge, on a flat red field (~#e5260c visual), with one centred caps line at the bottom (a short contrarian tease). 35vh bottom padding.
- Nav: N10 corners only: small scribbled signature-monogram top-start, "WORK" top-end (on the work index: brand / digital / ventures / work with underline for current). Fixed, 118px zone, transparent.
- Footer: 3 columns (brand studio / digital studio / ventures), then small acronym wordmark bottom-start with a row of city codes underneath (6 cities) and CONTACT block (email, social) - Ft1 small.
- Section list (DOM): hero -> video strip (150px) -> caps statement about building products, brands and businesses around one creative vision, centred 28px -> playbook: sticky 3-col `[photo collage start | numbered principle (e.g. "01" + a 3-word imperative) 56px + 13px caps text + "← e.g. research…" example line | vertical thumbnail strip end]` x6 -> "our work spans…" sentence -> asymmetric work tiles (large + small, caption = project name / disciplines) -> footer.

## Signature moves
- One typeface, one weight, all caps: ABC Diatype Bold used for every size from 13px to the wordmark - hierarchy by size and space only.
- Colour switch after the hero: red poster on the first screen, then pale grey #eaebe5 working canvas for the rest (on mobile the red continues the whole page) - the brand colour is a cover, not a theme.
- Playbook as a sticky triptych: collage, principle, thumbnail rail - three scroll speeds in one pinned section; a small ringed "orbit" glyph marks the active item.

## Tokens observed
- Font: ABC Diatype Bold (display + body). Free subs: "Inter Tight" 700, "Archivo" 700, "Schibsted Grotesk" 700; wordmark scale: "Archivo Black". Hebrew: "Heebo" 800 / "Rubik" 700 (caps effect lost - use size + weight contrast instead).
- Scale: principles 96/0.9 and 56/0.9 caps, statements 28px caps lh ~1.0, body 16-18px caps, meta 13px caps. Tracking 0 throughout.
- Palette: hero red (not in computed data; visual approx #e5260c), ink #000000, canvas grey #eaebe5, white #ffffff for case studies; project tiles bring their own colours (#590f0a, #d5c5b8, #e4840c, #fcf41c, #fc5413).
- Radii 0, shadows none. Paddings 72/108 per block, 16px gaps, 128px row gap. Container 1600px (edge to edge with 8-16px gutter).

## Motion inventory
- Sticky playbook with image crossfades and thumbnail strip scroll; custom cursor; autoplay muted videos (25); hero likely scales/crops the wordmark on scroll (inferred from crop at top). No GSAP/Lenis detected.

## Layout notes
- 12-col with tiny gutters; statements centred at 45-55% width; principle blocks start at column 4; thumbnail strip 1 column wide at the end edge.
- Work index: flat colour tiles of mixed spans (2 small stacked + 1 tall + 2 small), project name top-start in white 13px caps.

## Imagery
- Process photography (workshops, moodboards, people laughing), product shots on olive/khaki grounds, brand application flat-lays; saturated but natural.

## Page set observed
- Work index: mosaic of colour tiles, one per project, colour pulled from the project.
- Case (an instant-camera brand): white canvas, 96px caps name, a 4-column meta table (proposition / year / brand disciplines / digital disciplines) in 13px caps, full-bleed campaign image, 56px caps statement, results sentence with numbers (sales uplift figures), image pairs.

## Mobile notes
- Red canvas throughout, wordmark fills width at top; principles 28-40px caps; strips become horizontal thumbnails.

## Steal / Don't steal
- Steal: poster-cover hero that hands off to a neutral working canvas; single-family single-weight caps system; numbered principles as sticky triptych; case-study meta table in small caps; city-code line under the footer wordmark.
- Don't steal: all-caps paragraphs longer than 2 lines (readability); caps-dependent identity for Hebrew clients without a substitute signature.

## ACF mapping hints
- `poster_hero` (wordmark SVG, field colour token, bottom line, crop %).
- `statement_centered` (text caps). `playbook_sticky` (items repeater: number, title, text, example line, collage image, thumbnails gallery).
- `work_mosaic` (relationship projects; per project: tile colour token, span).
- Case study: `meta_table` (repeater: label, values list).
