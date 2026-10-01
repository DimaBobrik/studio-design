---
case: case-34-company
descriptor: Fashion and editorial photographer's portfolio
region: Europe
site_type: company (photographer portfolio)
industry: fashion / editorial photography
platform: custom (smooth-scroll container, custom cursor)
libs_detected: []
direction_match: [index-mono-gallery, whisper-studio, couture-condensed]
captured: 2026-10-01
source: "world agency client scan 2026-10"
scan_quality: good (desktop full + scroll + mobile); home only
---
> A portfolio as a scattered contact sheet: ~50 single photographs on warm paper, each a different size and offset, each with a tiny vertical caption running up its side, and no grid in sight.

## DNA summary
- One continuous column (34,800px) on #fbf8f3-ish paper: images 300-700px wide placed at varied inline offsets and vertical gaps (never two the same size in a row), fashion-magazine covers mixed with editorials; each image has a 9px tracked caps caption rotated 90° along its inline-end edge (publication · story); one serif project title 81px Acta Display Light appears mid-flow; a counter badge on hover; custom cursor.
- Nav: name top-start, ABOUT top-end, 72px bar; no footer to speak of.

## Signature moves
- **Scattered single column** (G-12 scatter, but authored as a scroll, not a stage): rhythm comes from size + offset changes, not a grid.
- **Vertical side captions** (`writing-mode: vertical-rl`) in 9-12px tracked caps.
- **Covers as proof**: the client list is shown as the magazine covers themselves.

## Tokens observed
- Fonts: Sofia Pro Light/Medium 12.6px (+1.8px tracking), Acta Display Light 81px. Free subs: "Karla" 400 caps +0.14em; display "Bodoni Moda" 400. Hebrew: captions in "Heebo" 400 (no tracking), display "Frank Ruhl Libre" 300.
- Palette: warm paper, ink #121212, white captions on images. Body 12.6px (too small; don't copy). No radius, no shadows.

## Steal / Don't steal
- Steal for photographers, stylists, fashion: varied-size offset column, vertical captions, covers-as-proof. Implement with plain CSS grid + `grid-column` offsets per item (ACF: size S/M/L + offset 0-3).
- Don't steal: 12.6px body and 9px captions (min 13px mono/caps UI, 16px prose).

## ACF mapping hints
- `photo_column` repeater (image, caption, size S/M/L, offset 0-3, align start/end).
