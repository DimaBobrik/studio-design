---
case: case-38-company
descriptor: Los Angeles creative director and designer's one-screen portfolio
region: US
site_type: company (personal portfolio, one screen)
industry: creative direction
platform: custom + GSAP (200 canvases)
libs_detected: [gsap]
direction_match: [void-stage, index-mono-gallery]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: single-screen captured (hero state)
---
> Two hundred projects compressed into slivers: a black screen with a column of 8px-wide image slices, like a record shelf seen from the spine side.

## DNA summary
- One screen: black canvas; a block of ~200 vertical slices (8px wide, 10px gaps, each its own `<canvas>` painting one project image) forms a ~500px-wide column at inline-start; hovering a slice expands it (accordion) to reveal the image; emblem logo centred; 9px caps line top (name / role / city) and bottom (rights reserved / contact).
- Hero archetype: widget - **slit-scan shelf** (catalog W-row).
- Nav: text line top-centre only.

## Signature moves
- **Spine view of an archive**: every project is visible at once as a colour sliver; the whole body of work is the texture.
- Hover-expand one slice at a time (flex-grow), neighbours compress.

## Tokens observed
- One custom sans 600, 9px caps (too small). Palette: #000 + white. Radius: one quarter-round shape on the emblem.

## Steal / Don't steal
- Steal: slit/spine gallery for large archives (photographers, record labels, bookshops, fabric libraries).
- Don't steal: 200 canvases (use one canvas or CSS `object-position` crops on `<img>`), 9px text.

## ACF mapping hints
- `spine_gallery` (gallery field, slice width 6/8/12, expand width, link per item).
