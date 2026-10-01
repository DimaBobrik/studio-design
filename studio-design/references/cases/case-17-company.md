---
case: case-17-company
descriptor: Design studio's online journal / magazine about running studios
region: Europe
site_type: company (studio magazine / journal)
industry: design publishing
platform: custom
libs_detected: []
direction_match: [broadsheet-duet, swiss-signal-grid]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: single-screen capture (the index scrolls inside a 900px viewport)
---
> Every article is a numbered magazine cover: an issue number, an italic kicker, a 150-320px light grotesk caps title, one line drawing.

## DNA summary
- Macrostructure: the home is a vertical stack of 43 "covers" in a 900px viewport; each cover = issue number "43." (53px light) / italic caps kicker (a theme, e.g. founders) / title in Folio Light caps 114-318px, lh 0.8, tracking -0.06em (each title is an interviewed studio's name in the possessive) / a small line illustration / journal name + 12px caps abstract; next number peeks at the bottom edge.
- Nav: two tiny round buttons at inline-start (logo, INDEX vertical); category filters as a vertical stack of outlined pills at inline-end (references / development / strategy / advice / management); black round "next" dot bottom-end.
- Hero archetype: H-01 (the cover is the hero, repeated as the list).

## Signature moves
- **Cover-as-list-item**: an article index where each item is typeset at poster scale; names are possessives, sized to fill width, so every title has a different size (114-318px).
- **Italic kicker + light caps**: one family (Folio) in Light caps, Book body, Light Italic kicker - hierarchy by size and italic only.
- Vertical pill filters parked on the edge.

## Tokens observed
- Fonts: Folio BT Light / Book / Light Italic. Free subs: "Inter Tight" 300 caps / "Archivo" 300 at wdth 100; italic kicker "Instrument Sans" italic is fine here (not display). Hebrew: "Heebo" 300 for titles (no caps in Hebrew: use size), kicker in "Frank Ruhl Libre" 400 (as italic substitute).
- Palette: white, black, white-on-black blocks for the next/previous items. Radius 19px pills. No shadows.

## Steal / Don't steal
- Steal: journal/news index as numbered covers with fit-to-width titles; possessive naming; edge-parked vertical filters.
- Don't steal: tracking -0.06em on light caps (too tight for Hebrew/Latin mixes; use -0.03).

## ACF mapping hints
- Post ACF: `issue_no`, `kicker`, `cover_title` (fit-to-width), `line_drawing` (SVG).
- `cover_index` layout (query, filters).
