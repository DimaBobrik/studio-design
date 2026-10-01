---
case: case-04-company
descriptor: US executive-search firm for quant finance and AI talent
region: US
site_type: company (executive search, quant finance + AI)
industry: recruiting / professional services
platform: Next.js (Tailwind), Lenis
libs_detected: [lenis, next]   # 5 canvas elements (dithered art), custom cursor, 12 sticky
direction_match: [cell-ledger, index-mono-gallery, swiss-signal-grid]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: good (home desktop + mobile, 10 scroll frames); no inner pages
---
> A trading-floor ledger printed on a dot-matrix: the page is a wall of bordered cells, half of them filled with 1-bit dithered art, one mint cell glowing like a live quote.

## DNA summary
- Macrostructure (10,886px): cell-grid hero (wordmark cell + dithered artwork cells + two text cells + mint client-logo cell) -> short caps claim in a black cell -> long About text column beside a dithered field -> stat cells (compensation range on mint, placements count, years) -> split: grey claim cell + black service list with rotating wireframe spheres -> Clients: giant word cell + dithered photo cells + a client table (firm · role) -> testimonial cells with portrait + long quote -> Team -> 3-word "let's talk" footer cell row.
- Hero archetype: H-27 cell-grid hero (catalog) - 4×2 cells at 1440, 1px #232323 rules, no gutters.
- Nav: sticky 61px bar that is itself cells: logo cell · live city clock with rolling digits · About/Clients/Testimonials/Team · theme toggle · black "Contact →" cell.
- Footer: the CTA is a row of word cells set in white-on-black boxes over a dithered field with a mint arrow cell.

## Signature moves
- **Dithered 1-bit artwork as the only imagery**: Bayer/Atkinson-dithered monochrome renders (a rising letterform shape, clouds, portraits) drawn to `<canvas>`, animating slowly. Replaces stock photography for an abstract service.
- **Page = ledger of cells**: every block is a cell with 1px ink borders; type sizes jump inside neighbouring cells (180px wordmark next to 16px paragraph). Colour exists only as whole-cell fills: ink #232323, white, mint #a1ffcb, grey #e0e0e0.
- **Stats as cells, not a strip**: each number owns a cell of a different size and fill; label sits bottom-start in 12px mono caps.
- Live clock digits roll (odometer) in the header cell.

## Tokens observed
- Fonts: Suisse Int'l 450 for everything (display 80-180px, lh 0.8-1.0, tracking normal; caps for claims), Suisse Int'l Mono 12px caps labels. Free subs: "Inter Tight" 500 / "Geist" 500 + "Geist Mono"/"JetBrains Mono". Hebrew: "Rubik" 500 (display) is too round - use "IBM Plex Sans Hebrew" 500 + mono labels stay Latin or "Heebo" 400.
- Scale: 180.7 (wordmark/H1) · 140.8 · 132 · 124 · 114.8 · 80 · 38 · 31 · 24 · 16 · 14 · 12.
- Palette: #ffffff canvas, #232323 ink + rules, mint #a1ffcb (the only chroma, as fills), #e0e0e0/#d9d9d9 grey cells. Radii none. Shadows: 1px inset rules only. Gaps 8/20/60px inside cells; no gaps between cells.

## Motion inventory
Canvas dither animations (slow drift), odometer clock, cursor follower, Lenis. No reveal choreography on text - cells are just there.

## Layout notes
12-col cells collapsing to 2-col; cells heights set by the tallest content; long text lives in a narrow white cell beside a tall art cell (keeps measure ~60ch).

## Imagery
Dithered renders only, plus real headshots in testimonials (also dithered on hover-off). No stock.

## Mobile notes
Cells stack 1-2 across; wordmark 54px; stats become a 2×2 cell block; clock stays.

## Steal / Don't steal
- Steal: cells as the whole grid for a B2B/professional service; dithering to make any photo on-brand; stat cells with different fills; clock in the nav cell.
- Don't steal: 12px mono caps for body-length copy; canvas-only imagery without a static fallback.

## ACF mapping hints
- `cell_grid` layout (repeater of cells: span_cols, span_rows, fill token, content type text/stat/image/dither-canvas).
- `dither_image` field group (source image, algorithm bayer/atkinson, colour token, animate yes/no).
- Options: `nav_clock_tz` (IANA zone).
