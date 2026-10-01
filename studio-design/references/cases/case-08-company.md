---
case: case-08-company
descriptor: Barcelona brand and campaign studio portfolio
region: Europe (Spain)
site_type: company (info) - brand/creative studio portfolio
industry: branding & campaign studio
platform: Next.js + Sanity (headless)
libs_detected: [lenis, next]   # desktop home failed to load; data from mobile home + 2 case pages
direction_match: [index-mono-gallery, billboard-type, organic-colour-block]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: partial - desktop home + work index not captured; mobile home + 2 case studies captured
---
> A studio's control room: a vermilion status bar with the live clock, graphite walls, and the work hung edge-to-edge like a contact sheet.

## DNA summary
- Macrostructure (mobile home observed): full-screen muted video (dusty mauve blur) -> a vermilion band crossing the screen with coordinates, wordmark with ® and a one-line positioning (horizontally scrolling/marquee band) -> project index: each project = a row of 2-3 edge-to-edge media tiles + name start / "View project" end on graphite #181d21.
- Hero archetype: H-22 variant (video field) + marquee identity band (C-01) instead of a headline. Style notes: vermilion blob shapes on cream + red marquee band with coordinates (desktop not captured).
- Nav (case pages): 38px sticky vermilion bar #ff4421 at 97% opacity: wordmark start, "(+) INFO" centre-start, live clock with timezone + "ONLINE" end (FT-05 live-info idea moved to the header). 13 links incl. hidden index.
- Case-study template: sticky left rail 333-361px (graphite) with breadcrumb (WORK / project), (+) close, title 28px + subtitle 28px in grey, tags row (sector · type · year), accordion index Context / Insight / Idea / Application / Impact (+/- toggles, active in red), short paragraph; right = media column (~1080px) of full-bleed images/videos stacked with 8px gaps, some 2-up. Bottom-start floating "next project" card (thumb + title + red label + arrow). Fixed bottom drawer (`fixed inset-x-0 bottom-0`, 392px) holds the project index.
- Footer: not observed.

## Signature moves
- Live clock + "ONLINE" status in a thin accent bar = studio presence without a hero headline.
- Case study as "sticky narrative rail + media wall": the text never scrolls away, the evidence does.
- Accordion headings are the case-study chapters (Context -> Impact); the Impact item carries real numbers (impressions, interactions, new followers).

## Tokens observed
- Font: PP Mori (single family, 400 only) at 28.26px/1.0 -0.02em for titles, 16/24, 15, 13, 10px caps tags. Free sub: "Inter Tight" 400 / "Hanken Grotesk" 400 / "Geist" 400. Hebrew: "Heebo" 400 / "Noto Sans Hebrew" 400.
- Scale is tiny and flat: display never >28px on case pages; the media carries the scale.
- Palette: accent vermilion #ff4421 (bar, active states), graphite canvas #181d21, surface #202427, ink #f3f3f3, muted #adadad / #afabab, black #111314 on the bar.
- Radii: 9999px (small chips/buttons), 7-10px (next-project card). Gaps 8px (media wall), 15px, 20px.

## Motion inventory
- Lenis. Rail pinned. Accordion open/close; bottom drawer slides up; marquee band on home (mobile). Videos autoplay muted (some failed to decode in headless). No GSAP global detected.

## Layout notes
- Case page: 2 columns `[rail 333px | media 1fr]`, media gaps 8px, images full column width or 2-up split 50/50; typography-heavy client assets (giant condensed posters) supply the drama.
- Mobile home index: 2-3 media tiles per row with horizontal overflow, 1-line caption row below each (name | View project).

## Imagery
- Client work only: posters, identity applications, campaign stills, 3D mascots; no studio stock. Mixed ratios (3:4, 1:1, 16:9) held on a fixed row height.

## Page set observed
- Home (mobile only), work index (failed), case studies (2): identical template, only media differs. About/contact: not observed ("INFO" opens an overlay, inferred).

## Mobile notes
- Hero video fills 100% of the first screen; identity band sits at ~30% height; project rows scroll horizontally.

## Steal / Don't steal
- Steal: accent status bar with live local time (real `Intl.DateTimeFormat`, e.g. Asia/Jerusalem) for a studio/agency; case template "sticky rail with chapter accordion + media wall"; next-project floating card; single-family, single-weight typography when the work is loud.
- Don't steal: relying on video with no poster/fallback (headless showed decode errors); 10px tags.

## ACF mapping hints
- CPT `project`: title, subtitle, tags (taxonomy), chapters repeater (label, WYSIWYG), impact stats repeater, media repeater (image/video, span 1/2, ratio).
- `project_index_rows` (relationship -> projects; media per row 2/3).
- Options: status bar (city, timezone, "online" label).
