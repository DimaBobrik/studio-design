---
case: case-03-company
descriptor: French independent creative developer's WebGL portfolio
region: Europe (France)
site_type: company (freelancer portfolio)
industry: creative development
platform: custom vanilla JS + native WebGL micro-framework
libs_detected: []   # 2 canvases
direction_match: [void-stage, index-mono-gallery]
captured: 2026-10-01
source: "agency own site scan 2026-10"
tags: [agency, WORLD]
scan_quality: one fixed 900px stage per page; the WebGL slices render; case pages are the same stage with the project opened
---
> Thirty black-and-white slivers of projects stand in a row in a charcoal room; touch one and its name spells itself in 340px letters across the screen.

## DNA summary
- Macrostructure: single stage. Letter-spaced first-name wordmark top-start, "ABOUT" top-end, bottom corners role + availability date and email / social links; centre: horizontal strip of ~30 vertical B/W image slices (G-14) with an index "01 / 30" and A/B/C/D meta labels (completed, type, role, client).
- Project view: letters of the project name 257-337px (condensed display face, gold #CC9933) spread across the width with the hero image between them, tiny meta rows at the bottom.
- No scroll page, no footer: the corners are the footer.

## Signature moves
- **Slice strip as the whole portfolio** (30 projects visible at once, each one sliver).
- **Per-letter title** spread full-width with the image interleaved: type and image share the stage.
- 10-12px uppercase metadata vs 337px title: the most extreme scale jump in the sample.

## Tokens observed
- Fonts: a custom mono-ish UI face (10-12px caps) + a custom condensed display. Free subs: "Space Mono"/"IBM Plex Mono" 10-12px caps -> use 12px minimum; display "Big Shoulders Display" 700 or "Antonio" 700. Hebrew: Karantina 700 (display-condensed), Noto Sans Hebrew 400 UI.
- Palette: charcoal #1E1E1E, sage-grey #BAC4B8 text, gold #CC9933 titles, project views on #F0F0F0 / #D6D5D2.
- Radii 0; no shadows.

## Motion inventory
- WebGL slices: hover/drag widens a slice and colours it; per-letter title animation; distortion on transition. Everything is motion; nothing works without JS.

## Steal / Don't steal
- Steal: G-14 slice strip (CSS flex version is enough), per-letter title over image for a portfolio, corner-only chrome.
- Don't steal: 10-11px metadata (use >=12px), JS-only content, no text index for search engines (add a hidden-until-focus list or a /work list page).

## ACF mapping hints
- `slice_strip` (relationship projects: image, name, year, role, client) · project: `title_letters` (auto from name), `hero_image`, `meta` (completed, type, role, client).
