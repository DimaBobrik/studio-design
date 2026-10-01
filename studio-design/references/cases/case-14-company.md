---
case: case-14-company
descriptor: Mexican underground-mining contractor (heavy-industry B2B)
region: Latin America (Mexico)
site_type: company (info) - heavy-industry B2B
industry: underground mining contractor
platform: Webflow
libs_detected: [lenis, swiper, webflow]   # 2 canvases (3D machinery / WebGL), 2 videos, `is-lenis-sticky`
direction_match: [film-title-bands, telemetry-terminal, atmospheric-sky]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: page height reports 900 (scroll inside a Lenis wrapper) - only hero frames captured on every page; section list and tokens come from data
---
> A mine shaft lit by one headlamp: blue-black rock, a haul truck emerging from fog, and a mono readout counting metres dug.

## DNA summary
- Hero archetype (observed on 3 pages): H-22 film band - full-bleed dark cinematic image/3D render (haul truck in a fog-lit tunnel; miner with headlamp; close-up of a respirator), 48-56px bold sans H1 start-aligned at 45% height (a trusted-partner positioning line), a live-style mono stat floating in the image near the subject (cumulative linear metres dug, ~1M), and two small thumbnail link cards bottom-end (image + mono caption bar: services / technology / safety / careers ▸) - the hero ends with its own next-page teasers.
- Nav: N10 - logo in a bordered pill top-start (icon + wordmark), "Menu" text + round outlined burger button top-end (48px, fixed). Blog page: burger filled black on white.
- Footer: white, 447px (not observed visually). A dark `.section_next` (900px) precedes the footer on every page = full-screen "next page" teaser band.
- Home sections (data, DOM): hero -> ABOUT US (white) -> OUR SERVICES (mint-grey #ebf0ed) -> minerals extracted (pinned 2,430px, canvas: minerals list 48px + 3D) -> SAFETY POLICY (lenis-sticky) -> TECHNOLOGY (pinned 3,112px, mint-grey) -> OUR TEAM -> OUR PARTNERS (pinned 2,917px) -> next-page band (dark) -> footer.
- Section labels: PP Supply Mono 11.2px uppercase (ABOUT US, OUR SERVICES...).

## Signature moves
- Mono telemetry inside photography: counters and captions placed like HUD overlays next to the subject (metres dug) - industry data as part of the image.
- Hero exit cards: two thumbnail links in the hero's bottom-end corner that preview the next pages.
- Massive stat statements: machine-fleet count 112px/0.8, a two-word story heading 188px/0.8 on About, "1M" 40px data cells - numbers treated as headlines.

## Tokens observed
- Fonts: Helvetica Now Display 400/700 (all headings + body; 969 nodes at 48px = large data tables/lists), PP Supply Mono 300 (labels 10.8-13px caps). Free subs: "Inter Display" 700 / "Hanken Grotesk" 700 / "Archivo" 700; mono -> "Space Mono" 400 / "DM Mono" 300. Hebrew: "Heebo" 700 / "Rubik" 600; mono "IBM Plex Mono".
- Scale: 188/0.8 -0.025em, 112/0.8 -0.025em, 56/1.1, 48/1.0 -0.01em, 40/1.0, 32/0.9, 20, 16, 12, 11.2 mono.
- Palette: near-black #151515 (ink and dark bands), white, mint-grey #ebf0ed (alternate sections), light grey #e0e0e0, safety orange #f47920 (single accent - one use per page), photography in cold blue with orange PPE highlights.
- Radii: 4px and 8px (cards, thumbnail links), 1000px pill logo border, 100% burger. Blend multiply on images (10).
- Section padding 32px/256px (top/bottom) - very generous bottom space; container 1376px.

## Motion inventory
- Lenis (virtual scroll wrapper), pinned sections (minerals, technology, partners, about story 5,185px, environment 3,404px), 3D canvas (minerals / machinery), videos (2), Swiper sliders, sticky safety block. Not observed visually beyond hero.

## Layout notes
- Hero: text column 0-45% start, stat overlay at ~65%, exit cards 2 x 108x72px at bottom-end with 16px gap.
- Blog: split - large portrait image start (50%), date mono + 48px title + excerpt + small "READ ▸" button end, title top-aligned and excerpt bottom-aligned (tension split).

## Imagery
- Dark underground cinematography, workers in orange PPE, 3D renders of machinery in fog; high contrast, cold grade with warm light sources.

## Page set observed
- Services: miner hero with a linear-metres overlay; services (mint), minerals (pinned), projects on dark (7 images), process (pinned 4,403px, 2 videos), next band, footer.
- About: respirator close-up hero with a years-of-experience line; story pinned (9 images, 4 videos); a dark pinned timeline chapter; values (one value word at 112px); environment (pinned mint).
- Blog: white split featured post.

## Mobile notes
- Hero keeps full-bleed image, H1 ~28px (2 lines), stat overlay moves above the two exit cards (side by side).

## Steal / Don't steal
- Steal: HUD-style mono stat overlaid near the photo subject; hero exit cards to 2 key pages; "next page" full-screen band before every footer; one safety-orange accent for heavy industry; mint-grey alternate sections instead of pure grey.
- Don't steal: content inside a virtual-scroll wrapper (document height = viewport; breaks crawlers/screenshot tools and native find).

## ACF mapping hints
- `hero_film_hud` (media, h1, hud_label, hud_value, exit links repeater x2: image, label, url).
- `stat_headline` (value/text, size token). `minerals_list` (repeater name, symbol, 3D/model image).
- `next_page_band` (auto: next menu item; image, title).
- Blog: `featured_split` (post relationship).
