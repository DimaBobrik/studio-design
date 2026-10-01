---
case: case-40-landing
descriptor: US nonprofit research institute for regenerative agriculture (perennial grains)
region: US
site_type: landing / company (nonprofit research institute)
industry: regenerative agriculture research (perennial grains)
platform: WordPress (ACF blocks - class names `block-acf-hero`, `container-1280`)
libs_detected: [wordpress]
direction_match: [organic-colour-block, herbarium, forest-bone-heritage]
captured: 2026-09-30
source: "award gallery scan 2026-09"
---
> A field station's notebook: chunky soil-brown serif on chartreuse and lavender blocks, research photos pinned over hand-printed ink textures.

## DNA summary
- Macrostructure: a grid of flat colour blocks separated by 1px soil-brown rules (the whole page is ruled like a ledger). Every section = one pastel field + serif heading + sans text; photography always sits inside a textured print panel.
- Hero archetype: H-13 split 50/50 - start: chartreuse #d9d963 panel with 76px serif H1 bottom-start + text link "explore our work •"; end: pink/teal risograph-like contour texture panel with a portrait photo inset (no radius). Inner pages: same split, 65/35 with a texture strip above a photo.
- Nav: HD-01 lavender announcement bar (#e6ddea, dismiss ×) + bar: round logo seal in its own ruled cell start, 6 links (our work + / learn + / visit / events / about / get involved; 17px, active link in lavender pill), search icon, solid amber #ffb403 "Donate •" cell flush end. All cells separated by 1px brown rules (N8-light).
- Footer: not captured in frames (page ends with research carousel + footer below).
- Home sections (DOM): hero -> purpose / vision split (lavender | butter #fdf9d0, 30px serif paragraphs, caps eyebrow) -> interactive map: world map + 3 counters (farmers / carbon / hectares, five-digit figures) + draggable year timeline 2025->2100 on an amber "DRAG" pill -> full-width texture band -> "what we do" (serif H2 start + 6-row link list end with arrows, F-15) -> sky-blue #c1dfdd long-term goals stats grid (3 figures) with text (ST-03) -> latest-research ruled card carousel (date / serif title / read more) with round arrow buttons.

## Signature moves
- Data you can drag: map + counters change as you drag the year from 2025 to 2100 - the mission becomes an instrument (real projections).
- Printed-texture panels (contour lines, cell-like blobs in pink/orange/teal) as the image frame - each section's photo is mounted on a different print.
- Ruled ledger: 1px #4d3016 lines between every cell (nav cells, split panels, cards, sub-nav) instead of radius/shadow.

## Tokens observed
- Fonts: Value Serif Pro 700 (display: 76/1.0 -0.022em, 64/1.0, 46/1.1, 38/1.1, 30px paragraph-serif), Plus Jakarta Sans variable (body 17-19px w475 -0.02em, UI 725 weight, caps eyebrows 14-18px). Free subs: "Young Serif" / "Fraunces" 700 (soft optical) / "Gloock"; Jakarta is free. Hebrew: "Frank Ruhl Libre" 700 (display) + "Heebo"/"Assistant" 400-700.
- Numbers: counters 64-70px Jakarta 725 -0.03em.
- Palette: ink soil brown #4d3016 (all text), canvas #fbf8f0 (cream - on our premium-palette ban list, rotate to a greener/greyer paper), chartreuse #d9d963, lavender #e6ddea, butter #fdf9d0, lemon #fdf388, sky #c1dfdd, olive #637041, amber CTA #ffb403, texture pinks/oranges in imagery only.
- Radii: 100px pills (buttons, DRAG), 50% round arrow buttons and logo seal, else 0. Rules 1px. Section gaps 160px; container 1280 / 1120 / 960.

## Motion inventory
- No GSAP/Lenis. Counters roll (inferred: mobile shows 0 before in-view), draggable timeline, carousel arrows, sticky in-page sub-nav on inner pages (overview / benefits / timeline / goals / impact / collaborators / team / resources). Floating accessibility widget bottom-start.

## Layout notes
- Split panels meet at exactly 50% (or 65/35) with a rule; text blocks start 40px from the rule; H1 anchored bottom-start of its panel (not centred).
- Link-list sections: heading column 5/12, list 6/12 with rows 64px high and rules.

## Imagery
- Documentary field photography (researchers in grass, plants), natural grading; always framed by hand-made texture art; world map in butter/olive tints.

## Page set observed
- Our work: split hero with a global-network select; areas of focus with a horizontal ruled tab bar + amber join-the-network CTA cell; issues grid; butter feature card.
- Topic page (one perennial crop): eyebrow, 76px H1, lede, texture+photo; sticky sub-nav bar with back arrow; long pinned content (5,224px), goals, lemon band, collaborator logos, sky-blue project team grid, related resources.
- About: founding-year headline with video, butter/lemon bands, timeline.

## Mobile notes
- H1 52/52; announcement bar under the logo row; splits stack (text panel then texture); stats single column; research carousel 1.3-up.

## Steal / Don't steal
- Steal: ledger rules as the structural language (works RTL untouched); drag-to-year data instrument for impact organisations; pastel-block sequence with one CTA colour (amber) reserved for Donate; sticky in-page sub-nav for long topic pages; texture-framed photos.
- Don't steal: cream #fbf8f0 canvas + brown ink = premium-consumer attractor; swap canvas (e.g. pale sage or grey paper) while keeping the blocks.

## ACF mapping hints
- Already ACF-block based: `hero_split` (panel colour token, h1, link, texture image, photo, ratio 50/50|65/35).
- `purpose_vision` (2 panels repeater: eyebrow, serif paragraph, colour token).
- `impact_map` (years repeater: year, counters repeater, map state image/svg).
- `link_list` (heading, lede, rows repeater: title, text, link). `goals_stats` (repeater value, unit, label, text).
- `subnav_sticky` (auto from section anchors).
