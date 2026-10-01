---
case: case-73-company
descriptor: "US brand + digital studio with a work-index constellation home (own site)"
region: North America (US)
site_type: company (agency own site)
industry: brand + digital studio
platform: Nuxt + Storyblok
libs_detected: [lenis]
direction_match: [index-mono-gallery, whisper-studio, cell-ledger]
captured: 2026-10-01
source: "agency own site scan 2026-10 (home + 2 case studies; home is a single 900px scroll-jacked stage)"
---
> Forty small project thumbnails scattered over warm white like contact prints around one 42px serif line: the home page IS the work index.

## DNA summary
- Macrostructure (home): one viewport. Mono corner nav ("Home" top-start · Work, Info, News + a side-project link centre · "Contact" top-end · two location codes bottom-start · "©2026 / Terms" bottom-end) around a loose constellation of ~40 project thumbnails (varied sizes, 12px gaps) with a 3-word mission line (42px jjannon serif) centred.
- Hero: H-16 / G-12 family (work-first constellation). No H1 above 42px on home.
- Case: project name in 210px mono caps (one short word), media wall of 5+ images and 9 videos, one 440-word text block, then other projects as 42px serif names as the "next" list.

## Signature moves
- **Home = index**: the first screen is the archive, nothing to read except one line.
- **Mono UI + one serif display**: Publico Text Mono 14px for every label, jjannon 42px for the only sentence; the 210px case name is the single scale shock.
- Corners-only chrome (N16-like): the four corners carry nav, location and legal.

## Tokens observed
- Fonts: Publico Text Mono (commercial) + jJannon (commercial serif). Free subs: "IBM Plex Mono" 400 + "Cormorant Garamond" 500 / "Newsreader" 400. Hebrew: IBM Plex Sans Hebrew (UI) + Frank Ruhl Libre (display).
- Palette: warm white #FEFDFC, ink near-black; no accent, thumbnails carry the colour.
- Sizes 14 / 16 / 18 / 42 / 210px. Radii 0. Gaps 12px. Container 1416px.

## Motion inventory
- Lenis; thumbnails react to pointer/scroll on home (constellation drift); page transitions between cases (SPA).

## Layout notes
- Constellation positions are authored (not random): clusters near the corners, empty band around the line. Case pages 11,200-14,200px.

## Page set observed
- /work/<case>; Info; News; a side-project page.

## Mobile notes
- 390px: H1 26px, thumbnails reflow into a short grid; corners collapse into a top bar.

## Steal / Don't steal
- Steal: archive-as-hero for studios with many projects (G-12 scatter); corners-only chrome; mono labels + one serif line; case "next" as a list of other project names.
- Don't steal: mono-only body for long text; a single-screen home for an SMB agency that needs SEO text (add an index list below the fold).

## ACF mapping hints
- `constellation` (relationship projects; per item x, y, w, depth) + `line` (text). Case: `case_name`, `media_wall` (gallery + videos), `text`, `other_projects` (relationship).
