---
case: case-74-company
descriptor: "Israeli urban-renewal real-estate developer (Hebrew-first + English)"
region: Israel
site_type: company (real-estate developer, urban renewal, Hebrew-first + English)
industry: urban renewal / real estate
platform: WordPress (custom theme)
libs_detected: [gsap, ScrollTrigger, wordpress]   # 2 canvas, custom cursor, wa.me link, hreflang en
direction_match: [cell-ledger, swiss-signal-grid, architect-calm]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> An architect's survey sheet: the layout grid is drawn on the page with pixel rulers, a red letter-mark stands in the corner like a site marker, and the city is a topographic map you scroll through.

## DNA summary
- Macrostructure (12,351px): grid hero with stat cell → video band → **pinned topographic city map (4,500px pin)** under an urban-renewal title, with project markers dropping in → social-model diagram on cream → video testimonials → a resident-empowerment section → press mentions → team photo → contact form.
- Hero: H-27 (cell-grid hero). Thin vertical/horizontal grid lines across the page with tiny px labels; 62px w300 Hebrew H1 (a short real-estate-starts-with-you line) lh 0.9 at the right; below, a cell with the red letter-mark (logo geometry as two red bars) and three big numbers (residents / units / a red-emphasised figure) with line icons and Hebrew captions.
- Nav: fixed 101px white: Latin logo top-left with English link, red contact pill, Hebrew menu to the right.

## Signature moves
- **The grid is visible**: 1280 container lines + rulers drawn on the page; content snaps to it.
- Pinned topographic map of the city (contour line drawing) with project pins and Hebrew place labels appearing as you scroll: the projects index is a map.
- "Social model" as a node diagram (gold lines, round nodes: local authority, developer, residents) with a card explaining the existing model.
- Numbers as a hero cell, with icons and one red emphasis.

## Tokens observed
- Fonts: doar (display, 62px w300 lh 0.9; 77px for "13+") and ayala (text, 18px w300 / 24px w300), IBM Plex Sans Hebrew support. Free subs: IBM Plex Sans Hebrew 300 (display), Assistant 400 (body: don't run body at 300).
- Palette: white #fff, ink #000, grey #ccc lines, cream #f6f3e9 (model section), gold #c8b154 (diagram), red #fe0d18 (logo mark, emphasis, pill).
- Radii: 16px cards, 34px pills, round nodes. Shadow 0 4px 25px rgba(0,0,0,.15) on cards (heavy, don't copy).
- Section paddings 0 (sections carry their own spacing); gaps 50px columns.

## Motion inventory
- GSAP ScrollTrigger: pinned map with marker drops, diagram line drawing, number count-up; custom cursor; video testimonials.

## Imagery
- Line drawings (topography, diagram), red logo geometry, testimonial video stills, team photo on white.

## Mobile notes
- H1 42px lh 35.8 (0.85); page 9,711px.

## Steal / Don't steal
- Steal: draw the grid for a planning/real-estate/engineering client; projects on a topographic map; model diagrams as proof; logo geometry as the hero object.
- Don't steal: body at weight 300 in Hebrew, lh 19.45px on 18px text (cramped), the heavy card shadow.

## ACF mapping hints
- `grid_hero` (h1, lede, stats repeater: value, label, icon, emphasis). `project_map` (map svg, projects repeater: name, x, y, status). `model_diagram` (nodes repeater, explainer card). `video_testimonials` (repeater). `media_mentions` (repeater).
