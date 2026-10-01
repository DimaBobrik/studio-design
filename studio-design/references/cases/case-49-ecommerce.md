---
case: case-49-ecommerce
descriptor: "Art-inspired upholstery textile house with collections, shop and showrooms"
region: Europe
site_type: ecommerce (fabric collections + shop + showrooms)
industry: textiles, interiors
platform: custom (Shopify-like cart)
libs_detected: []   # 1 sticky; one 7,516px pinned container
direction_match: [estate-didone, cold-chrome-luxury, herbarium]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only)"
---
> A textile sample book opened on a museum table: a didone wordmark across folded fabric, then each collection laid out as a painting overlapped by the swatches it inspired.

## DNA summary
- Macrostructure (7,912px): hero = flat-lay of patterned cushions and flowers, full-width white high-contrast didone wordmark (~290px) over it -> cream band with small monogram + a short caps art-and-living motto + swatch rail (5 square swatches with names) -> collections sequence: for each of 6 collections (each named after a painter) a collage of the source painting + 2-3 fabric swatches overlapping at offsets, with collection name (66px narrow serif light), 14px paragraph and a black "explore collection" button, alternating sides -> newsletter over folded fabrics -> grey-blue footer with the monogram.
- Hero archetype: H-22 with H-26 masthead wordmark.
- Nav: 122px transparent header: textiles / collections / shop start, monogram wordmark centre, about / contact / showrooms / cart end (N7-ish).

## Signature moves
- **Source + product collage**: each collection is shown next to the artwork it references (painting fragment) with swatches layered on top, 2px gaps, no frames — provenance as the merchandising.
- **Didone masthead over product**, then a quiet sans (Domaine Sans 300/400) for everything else.
- Swatch rail with caps names under squares.

## Tokens observed
- Fonts: Domaine Sans 300/400, Domaine Narrow 300 (collection names), a didone logotype. Free subs: "Bodoni Moda" (logotype only), "Jost" 300 / "Hanken Grotesk" 300; narrow → "Barlow Condensed" 300. Hebrew: "Bellefair" (display), "Assistant" 300 body.
- Palette: #f4f3ee / #e9e7de canvas, ink #100b08, black buttons, footer #9fa1ad. Radius 0. No shadows.

## Steal / Don't steal
- Steal: show the inspiration beside the product; swatch rails; collection pages as collages.
- Don't steal: 11-12px caps UI; hero wordmark contrast depends on the photo.

## ACF mapping hints
- Collection term ACF: `source_artwork`, `swatches` (gallery), `collage_layout` (preset A/B/C).
