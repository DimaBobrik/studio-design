---
case: case-39-company
descriptor: Multidisciplinary designer-developer's one-screen portfolio
region: Europe
site_type: company (personal portfolio, one screen)
industry: design + development
platform: Next.js (1 canvas)
libs_detected: [next]   # custom cursor, marquee
direction_match: [cell-ledger, index-mono-gallery]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: single-screen captured (hero + mobile)
---
> A contact sheet on a dark light-table: bordered cells hold a portrait, one bold sentence, and project images cut into circles, triangles and pills.

## DNA summary
- One screen (dark #343131 page, 1px lighter rules): top row = portrait cell (inline-start, 1:1 b/w) + statement cell (a third-person sentence naming the practice as multidisciplinary design + development with a playful rule-breaking idea; 58px Neue Haas 700, -0.03em, 4 lines); middle row = meta cells (services / social / availability month / scroll) in 13px; bottom row = left cell with a white circle + triangle (the mark), then a horizontal marquee of project images each masked into a different geometric shape (rectangle, blob, pill, square) with a "01/05" counter.
- Hero archetype: H-27 cell-grid hero.
- Nav: 16px top bar (monogram · work / about / lab · contact).

## Signature moves
- **Shape masks as identity**: circle/triangle mark + project images clipped to shapes (CSS `clip-path` / `border-radius` variety) - the statement's rule-breaking idea made literal.
- **Cells on dark**: rules at ~15% white, text #f9fafb, muted #979595.

## Tokens observed
- Font: Neue Haas Grotesk Display 600/700 only (58 / 16.7 / 13.3px). Free subs: "Inter Display" 700 / "Schibsted Grotesk" 700. Hebrew: "Heebo" 700.
- Palette: #343131/#000, #f9fafb ink, #979595 muted; colour from images only (pink sticker art, turquoise sea). Radius per shape.

## Steal / Don't steal
- Steal: cell grid on a dark canvas; one statement cell as the hero; shape-masked thumbnails in a marquee (pick <=3 shapes from the brand mark).
- Don't steal: one-screen site with no inner scroll content for crawlers.

## ACF mapping hints
- `cell_grid` (same as [the executive-search cell ledger](case-04-company.md)), `shape_marquee` (images repeater with shape select: circle/pill/triangle/rect).
