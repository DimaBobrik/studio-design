---
case: case-18-ecommerce
descriptor: New Zealand functional (nootropic) canned-drink DTC launch
region: Oceania (New Zealand)
site_type: ecommerce (3-SKU drink, stockists + direct)
industry: functional beverage (nootropic, no caffeine)
platform: Next.js, Lenis, WebGL canvases (6)
libs_detected: [lenis, next]   # 3 pinned sections, custom cursor, backdrop blur header
direction_match: [swiss-signal-grid, machined-soft, whisper-studio]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: good (desktop full + 10 frames + mobile); home only
---
> A pharmacy label set in a sports-car wordmark: a 330px extended black logotype with the can standing inside one letter, then quiet serif chapters where the can turns like a specimen.

## DNA summary
- Macrostructure (18,794px, 7 blocks, 3 pinned): wordmark hero with the can replacing a letter, pinned 1,980px -> "three formulations" pinned 3,600px on bone #efede6: can rotates centre while formulation copy (serif 58px one-word flavour name, ingredient table in 12px) swaps per flavour; background radial tint changes per flavour (mint #bcd3d8, sand #e8c9a0) -> "inside" pinned 4,500px on ink #1a1b1d: ingredient tabs (4 botanical/amino actives) as pills, can centre, ingredient name 56px condensed-extended at bottom-start, dose data at end -> "built over five years" pinned 5,040px timeline (launch milestones, small photos) -> ink press band -> "find in store or order direct" stockist columns by city -> footer with a get-notified-for-your-city form.
- Hero archetype: H-26 masthead wordmark + object (the product occupies a letter).
- Nav: 72px fixed bar, bone at 78% + blur 17px, wordmark start, 4 links, "Shop →" end; a vertical side tab (waitlist) pinned at inline-end.
- Footer: bone, city-waitlist form + small links.

## Signature moves
- **Product inside the logotype**: the can stands in a letter's position with a circular soft glow; the wordmark is 331px Söhne Breit 800, lh 0.78, -0.03em.
- **One object, three pinned acts**: the same can is re-lit per chapter (bone plate / ink plate / timeline), flavour changes tint the radial light, not the page.
- **Specimen data**: ingredient doses in a 12px table beside a 58px light serif name - pharmacy precision with a serif voice.
- Numbers as ghost display: "01"/"21" at 374-576px behind content at low contrast.

## Tokens observed
- Fonts: Söhne Breit 800/900 (wordmark, ALL-CAPS section titles 56px), Söhne 400-600 (UI 12-16px; caps labels +0.22em), Tiempos Headline 300 (chapter titles 52-68px, -0.01/-0.02em, one italic), Tiempos Text 13px italic captions. 2 superfamilies. Free subs: "Unbounded" 800 or "Archivo" 800 at wdth 125 (extended), "Inter" 400-600; serif "Newsreader" 300. Hebrew: extended display -> "Secular One" (heavy) or "Heebo" 900; serif -> "Frank Ruhl Libre" 300.
- Palette: bone #efede6 canvas, ink #1a1b1d, grey #6a6965 secondary text, mint #bcd3d8 and sand #e8c9a0 flavour lights, deep green #1e423e once. Radii pill + 18px cards. Shadows: two soft big lifts on the can card only.

## Motion inventory
Pinned acts with scrubbed can rotation (WebGL), tab-switch recolour, Lenis, custom cursor, header blur. Everything else static.

## Imagery
3D can renders (studio, soft shadow), a few documentary photos in the timeline. No lifestyle stock.

## Mobile notes
Wordmark 94px still holds the can; pinned acts become stacked cards; tabs scroll horizontally.

## Steal / Don't steal
- Steal: put the product in the wordmark; one protagonist object across 3 pinned acts; dose/spec table next to a serif name; flavour = light colour, page stays bone.
- Don't steal: 18,800px home for 3 SKUs on mobile (cut to 1-2 pins); ghost numerals at <1.5:1 carrying information.

## ACF mapping hints
- `wordmark_object_hero` (wordmark SVG, object image/3D, slot position %).
- `formulation_switcher` (repeater: name, tint token, ingredients table, image).
- `timeline_pinned` (events repeater: date, text, image).
