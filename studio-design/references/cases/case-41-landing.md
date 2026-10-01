---
case: case-41-landing
descriptor: athlete personal brand site
region: Europe (UK)
site_type: landing / personal brand (athlete)
industry: athlete personal site + merch link
platform: Webflow (+ WebGL canvases, GSAP bundled)
libs_detected: [lenis, webflow]   # 21 canvas elements; GSAP not exposed as global
direction_match: [film-title-bands, campaign-commerce, billboard-type]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: desktop home captured only first frame (preloader/WebGL); mobile home + 3 inner pages captured
---
> A racing notebook: signature scrawled in neon across a topographic track map, a serif-and-grotesk voice that switches mid-sentence like a gearbox.

## DNA summary
- Macrostructure: sticky-track scenes (`.sticky-track`, 1,800px each) alternating with content groups; horizontal pinned track of career photos; helmet "hall of fame" grid; lime-accent pins; ends on a cream footer statement.
- Hero archetype: bespoke - off-white #f4f4ed topographic contour map (light grey blobs + hairline contours) with the athlete's signature drawn on in neon lime #d2ff00 (SVG draw), a WebGL 3D helmet on scroll (canvas); bottom-start next-race card (track outline, race name, laurel badge).
- Nav: N10 corner-only: 2-line wordmark top-start (first name serif / surname grotesk), monogram centre, lime "store" pill with bag icon + square menu button top-end. No bar, no links.
- Footer: cream section with a 70px caps fighting-spirit sign-off + socials + large imagery (FT-01 feel), on inner pages identical.
- Home sections (DOM): hero (sticky, WebGL) -> intro statement (caps grotesk with lime serif words mixed in, about limits, wins and legacy) -> horizontal track: scattered photo cards with place/year captions + handwritten-signature quotes in serif -> on-track sticky scene -> helmets hall of fame (4-col grid of dark cards with notched corner, helmet PNG, season caption with lime year) -> championship title section -> partners -> socials -> footer.

## Signature moves
- Mixed-voice headlines: the same line switches between a condensed caps grotesk (Mona Sans 700) and a didone-ish serif (Brier) per word, serif words in olive-lime #b2c73a or grey. The rhythm of two fonts carries personality without images.
- Signature as a UI element: the neon scribble is drawn on load, re-used crossing through page titles (e.g. the season calendar title), and as a small sign-off under quotes.
- Topographic contour field as the brand texture (track = terrain).

## Tokens observed
- Fonts: Mona Sans Variable (grotesk, 400-700, width axis), Brier (high-contrast serif display). Free: Mona Sans is free (OFL); serif sub "Instrument Serif" / "Gloock" / "Bodoni Moda". Hebrew: grotesk "Rubik" 700 or "Heebo" 800 + serif "Frank Ruhl Libre" 400/700 (mixed-voice works in Hebrew by alternating these).
- Scale (1440): home display 93-106px/0.85 -0.035em caps; inner mega words 233px (lh 0.8), 297-309px (serif + grotesk compound word), 110px serif calendar title; statements 70/0.86; body 16.7/20.8; captions 8.3-13.3px caps.
- Palette: cream #f4f4ed (light canvas + ink on dark), olive-black #282c20 (dark canvas + ink on light), black #111112, neon lime #d2ff00 (store pill, signature, active chips), olive-lime #b2c73a (serif accent words), greys #535450 / #b4b8a5 / #b9bbad / #dde1d2, stat bg #3b3c38.
- Radii: 7.2px buttons, 2.7px chips, 44px (helmet card?), notched-corner cards via clip-path. No shadows.

## Motion inventory
- Lenis; WebGL 3D helmet (gl-wrap canvas fixed behind content); SVG signature draw-on; sticky-track scenes 1,800px; horizontal pinned photo track (3,143px); lime radial glow gradient behind pins (`radial-gradient(circle at 50% -190%, ...)`); marquee flag true (partners); 4 sticky elements. Preloader implied (first frame only).

## Layout notes
- Horizontal track: photos of varying sizes at staggered heights, captions 8px caps top-end of each photo, serif quotes interleaved - scrapbook, not grid.
- Calendar: data board - big date range in lime, stats (track length, laps), schedule table (practice / sprint / qualifying + times), vertical rotated race name on the left edge.

## Imagery
- Documentary/candid sports photography, some desaturated, helmet cut-outs on dark; logos of partners in a row.

## Page set observed
- On-track page: 233px podium counter word, career group (13,462px pinned), stats boards.
- Off-track page: cream page, giant compound word (serif first half + grotesk second half) behind a photo that overlaps it, intro with signature, partner logo strip, centred mixed-voice statement, horizontal personal-projects track.
- Calendar: dark, season title crossed by signature, standing/round counters, per-race cards with lime hairline border.

## Mobile notes
- Hero becomes a static cream topo panel with centred monogram + wordmark and a lime tap icon; helmets 2-col; statements 38/44 caps; horizontal track becomes vertical scattered photos.

## Steal / Don't steal
- Steal: mixed-voice headline system (two families alternating per word with colour shift); personal mark (signature/stamp) reused as UI; data-board pages for schedules/results; notched card corners; store pill as the only saturated element in the header.
- Don't steal: WebGL-only first screen (blank without JS); 8px captions; the neon lime + black is an attractor unless the brand owns it.

## ACF mapping hints
- `mixed_headline` (repeater of words: text, font role display|serif, colour token) - renders one H1/H2.
- `signature_draw` (SVG upload, colour, trigger).
- `scrapbook_track` (repeater: image, caption, size s/m/l, offset y, optional quote).
- `collection_grid` (helmets/products: image, name, year).
- `event_board` (CPT events: date range, stats repeater, schedule repeater).
