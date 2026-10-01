---
case: case-67-company
descriptor: "Swedish public-art commission programme (artists index + seminar)"
region: Europe (Sweden)
site_type: company / programme (public art commission, seminar)
industry: culture, public art, research
platform: WordPress
libs_detected: [wordpress]
direction_match: [broadsheet-duet, index-mono-gallery, architect-calm]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only; single page ~3,100px)"
---
> A programme printed as a ruled table: every row an artist's name in a 120px display serif running off the edge, one artwork image, one line of tiny metadata.

## DNA summary
- Macrostructure (3,108px): fixed 48px bar (programme title in caps with a question mark · "watch the seminar" · SV/EN) -> the index: 6 rows, each a bordered table row = [name + project in 12px cell] [artwork image cell ~240×160] [120px display-serif "Name –" + project title running past the viewport edge] [meta cell] -> collapsible about panel (caps serif summary of the collaboration and long text) -> footer.
- Hero archetype: H-23 index hero, with the type at poster scale.
- Nav: one fixed rule-separated bar; mobile shows the index as name + project pairs.

## Signature moves
- **Names at 120px in a table**: the list row is the headline; the name + "–" + title continues off-canvas (overflow clip), so each row is a moving marquee on hover.
- **Cells alternate position**: image cell switches start/end between rows, so the image column zigzags inside a strict ruled table.
- Only black on #fafafa; images carry all colour.

## Tokens observed
- Fonts: a custom display serif ("font", high-contrast, 120px lh 1.0, ls +0.08px) + system sans-serif 12-16px. Free subs: "Gloock" or "Bodoni Moda" 400 (display), "Inter" 12-16. Hebrew: "Frank Ruhl Libre" 400 at display, "Assistant" 400 small.
- Palette: #fafafa canvas, #000 text and 1px rules. Radius 0 (40px once on a button). No shadows.

## Motion
Row hover slides the long title; accordion about panel. Motion budget ~2.

## Steal / Don't steal
- Steal: programme/event/speaker lists as giant-type table rows with one image each; image column zigzag inside rules.
- Don't steal: pure #000/#fff; 12px meta as the only info on mobile.

## ACF mapping hints
- `index_rows` (repeater: name, title, image, meta, link, image side auto).
