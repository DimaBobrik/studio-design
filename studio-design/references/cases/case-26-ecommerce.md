---
case: case-26-ecommerce
descriptor: US DTC olive-oil brand (squeeze bottles, Shopify)
region: US
site_type: ecommerce (single-category DTC, 3 SKUs + refills)
industry: olive oil / pantry food
platform: Shopify (Vue sections), Swiper, Lottie
libs_detected: [shopify, swiper, lottie]   # 10 videos, marquee, 3 sticky
direction_match: [pantry-label, organic-colour-block, inflatable-pop]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: good (desktop full + scroll + mobile); home only
---
> A squeeze bottle's label blown up to a website: condensed old-style serif, typewriter small print, a hand-drawn olive mascot, and colour plates that look like the packaging.

## DNA summary
- Macrostructure (8,664px, 8 sections): video hero (hand holding the bottle, 72px condensed serif line bottom-start, chartreuse "Shop now" pill) -> harvest-season ticker bar (typewriter, bordered) -> yellow plate for the glass-bottle line, split with product photo on a speckled plate -> PINNED cream story: freshness statement (120px condensed serif, two-line offset) with line-drawn olive characters walking through -> giant brand logotype + 3 product cards (bottle on grey speckle, playful rhyming nicknames in quotes + price) + full-width chartreuse "Shop All →" -> illustrated fun-fact band -> chartreuse "ways to use" band: a cloud of cooking verbs (sear / grill / fry / roast / garnish / knead) in the serif beside a recipe photo -> field photo band about the growers with a small inset card -> UGC photo row -> cream footer (typewriter link columns, email field).
- Hero archetype: H-22 film band (product in hand), serif line + one pill.
- Nav: tiny wordmark top-start in the serif + typewriter links + round icon buttons + "Cart [0]" pill.
- Footer: cream, 4 typewriter link columns, newsletter; no giant mark (the giant logotype sits mid-page instead).

## Signature moves
- **Packaging as the design system**: the bottle label's typefaces (condensed Garamond + GT Alpina Typewriter), its chartreuse and olive-ink, and its line mascot are the whole site.
- **Line-mascot illustrations** (olive with a face, a farmer carrying olives) animate small through the pinned story, 2px olive-ink strokes, no fills.
- **Verb cloud** instead of a feature grid: uses become scattered serif words around one photo.
- **Quoted product nicknames** in the serif; price in typewriter.

## Tokens observed
- Fonts: ITC Garamond Condensed 400 (display 72/102/120px, lh 0.9-1.0, -0.03em), GT Alpina Typewriter 400/500 16px body + labels, Apercu (tags). Free subs: no free condensed Garamond exists; "Cormorant Garamond" 600 at -0.03em is the closest cadence; typewriter "Courier Prime" 400 (labels, short body). Hebrew: display "Frank Ruhl Libre" 500; there is no Hebrew typewriter face, so Hebrew body runs in "Heebo" 400 and the typewriter stays on Latin/numerals.
- Palette: cream #f6e6d9 / #fff4ec, olive ink #3c422e (all text), chartreuse #d1e030 (CTA + plates), yellow #fbd535, lime #9eef80 plates. Radii 20px cards, 9999px pills, 10px half-rounded tabs. No shadows.

## Motion inventory
Hero video, pinned story with Lottie line characters, product carousel (Swiper), ticker marquee. One pinned section only.

## Imagery
Product on speckled grey stone plates (consistent across cards), lifestyle hands, farm photography, recipe close-ups, UGC.

## Page set observed
Home only (shop, refills subscription, blog in nav).

## Mobile notes
46px H1; verb cloud stacks; product cards 1-up swipe.

## Steal / Don't steal
- Steal: derive the entire UI from the product label; mascot line drawings in the story; verb cloud; quoted product nicknames.
- Don't steal: typewriter as long body copy on mobile (16px ok, but tracking tight); lottie-only characters without static SVG fallback.

## ACF mapping hints
- `story_pinned` (headline, character SVGs repeater, lines).
- `verb_cloud` (words repeater with x/y/rotation knobs, image).
- Product ACF: `nickname` (quoted name), `plate_texture`.
