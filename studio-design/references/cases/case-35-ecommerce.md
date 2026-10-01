---
case: case-35-ecommerce
descriptor: US luxury eyewear brand store (Shopify)
region: US
site_type: ecommerce (luxury eyewear, Shopify)
industry: eyewear
platform: Shopify (custom sections)
libs_detected: [shopify]
direction_match: [darkroom-object, estate-didone, index-mono-gallery]
captured: 2026-10-01
source: "world agency client scan 2026-10"
scan_quality: good (desktop full + scroll + mobile); home only
---
> Eyewear as a catalogue raisonné: one tortoiseshell frame shot huge on grey, collection names in a sharp serif, black-and-white portraits of icons, and long justified copy blocks like a museum label.

## DNA summary
- Macrostructure (5,352px, 9 Shopify sections): full-bleed studio packshot of one frame (785px) -> model name 36px serif caps + centred 4-line copy + "discover the collection" -> 3-up frame rail on white (front views, model names) -> sunglasses image-with-text: b/w portrait of a woman in sunglasses + centred copy -> optical mirrored -> a collection title set like a book cover ("… collection by [brand]") over a pale stone texture with one frame -> justified copy block -> journal feature: b/w portrait of a 19th-century poet + text -> flagship gallery locations multicolumn (3 world cities, named by street) -> footer.
- Nav: sticky 37px, tiny caps links, centred wordmark.

## Signature moves
- **Object-as-hero** at 100% width on neutral grey (no text on it): the product photo is the whole first screen.
- **Book-cover title blocks**: serif caps with a small "by" line, centred, over texture.
- **Black-and-white portrait + label copy** pairs alternating sides (catalogue raisonné tone).
- **Store locations as a gallery list** (flagships named like galleries).

## Tokens observed
- Fonts: SangBleu Republic 400 (+italic) 24-36px (-0.04em), Sweet Sans Pro (caps UI). Free subs: "Bodoni Moda" 400 / Fontshare "Gambetta"; UI "Karla" caps +0.12em. Hebrew: "Frank Ruhl Libre" 400 + "Heebo" 400.
- Palette: white, #121212 ink, #f3f3f3; accent-less. One soft shadow (0 0 44px α.1) on a floating panel only.

## Steal / Don't steal
- Steal for jewellery, watches, eyewear, perfume briefs: packshot hero without text, book-cover collection titles, b/w portrait + label copy, flagship list.
- Don't steal: justified narrow copy blocks in Hebrew (rivers); use start-aligned.

## ACF mapping hints
- `object_hero` (image only + alt), `collection_title` (name, by-line, texture image), `portrait_label` (image, title, copy, side).
