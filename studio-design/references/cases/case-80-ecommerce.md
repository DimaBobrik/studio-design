---
case: case-80-ecommerce
descriptor: "New York Japanese matcha, tea & bakery brand (retail + wholesale + journal + recipes)"
region: North America (US)
site_type: ecommerce (retail + wholesale + journal + recipes)
industry: Japanese matcha & tea, bakery
platform: headless Shopify + Next.js + Contentful
libs_detected: [next]   # custom cursor, 6 sticky, 5 videos; heavy pinned sections
direction_match: [swiss-signal-grid, couture-condensed, riso-two-ink]
captured: 2026-09-30
source: "award gallery scan 2026-09 (typographic commerce; desktop scroll frames mostly show an olive transition plate; home structure read from mobile + data; inner pages captured well)"
---
> A Japanese sandwich-shop menu set in Swiss type: the logo split in two with the tagline as the filling, word lists stacked like price boards, olive and butter plates between.

## DNA summary
- Macrostructure: home = 4 pinned category chapters (MATCHA & TEA 5,109px / BAKERY 4,801px / MERCHANDISE 3,352px on salmon #fccbbe / WHOLESALE) after an index header (2,700px pinned). Every chapter: condensed caps chapter title + kinetic word list + products + "Learn More ──── Shop X" link pair.
- Hero archetype: bespoke split-logo hero: two images top (blank + dark-green macro of tea leaves), giant black first part of the wordmark bottom-start and its last letter bottom-end (the wordmark split across the viewport), with a short alliterative "sandwiched" tagline literally sandwiched between, and the nav row (SHOP / JOURNAL / RECIPES / ABOUT+ / SERVICES+ / CART + icon) running across the gap.
- Nav: N10/N1 mix - text links at the bottom of the hero between the two logo halves; inner pages: 32px absolute text bar (~10 caps links incl. our matcha, our bread, services, wholesale, work with us, cart) in 14-15px grotesk 600 caps.
- Footer: small link column + newsletter (2 fields + olive "Sign up" button) + giant wordmark bottom-start (FT-01).
- Section list (mobile-verified): split-logo hero -> olive plate transition -> brand statement paragraph (bold 16px) -> kinetic word list: grey condensed caps words stacked (negative food-industry adjectives: processed / adulterated / contaminated / altered ...) with one word turning black and huge (the brand's positive two-word motto) / landing on "MATCHA & TEA" -> product cards on grey -> a tea-ritual editorial teaser (green headline on butter #ddc383) -> BAKERY (butter plate, sandwich illustration, bread photos, lime #c8ff01 text on olive) -> MERCHANDISE (salmon) -> WHOLESALE -> footer.

## Signature moves
- Split wordmark as layout: the two halves of the name at opposite edges with content (tagline, nav) in the middle - the brand story (sandwich) becomes the grid.
- Kinetic word-stack: a column of 12+ condensed caps adjectives in grey, one replaced/struck, resolving into the category name - copywriting as motion.
- Tasting-profile bars: each matcha has horizontal bars (umami / sweetness / bitterness / astringency / body) in navy #071342 - data-viz product cards (a "by character" comparison grid of 10 teas).

## Tokens observed
- Fonts: a custom condensed caps brand face (48-115px, lh 0.8), Neue Haas Grotesk Display 600/900 (headlines 86-230px, lh 0.9, -0.01em), SuisseReg (body 16/24). Free subs: condensed "Anton"/"Oswald" 600/"Big Shoulders Display" 800; grotesk "Inter Display" 600 / "Archivo" 700; body "Inter". Hebrew: condensed "Karantina" 700 / "Secular One"; grotesk "Heebo" 700/900; body "Heebo" 400.
- Scale: 230.4/0.9 (origin / cultivar / character-type statements), 165.6, 158.4 (PLP title), 122.4, 115.2, 100.8 (PDP title condensed), 86.4, 64.8, 57.6, 47.5, 34.6, 16, 11 (labels). Multiplier 1.2 on 14.4 base.
- Palette: white/#fefefe canvas, black ink, forest green #234922 (headline text), olive #878145 (plates, buttons), butter #ddc383, salmon #fccbbe, lime #c8ff01 (text on olive/green), navy #071342 (data bars, about page bg blocks), grey #e4e4e4 product plates.
- Radii 0, shadows 0. Gaps 8px product grid, 32px/57.6px columns, 3% gutters.

## Motion inventory
- Heavily pinned chapters with plate colour transitions (olive plate fills viewport between chapters - what most desktop frames captured), word-stack animation (words swap/strike), custom cursor, videos, Next page transitions.

## Layout notes
- PLP: 158px category title then dense 4-up grid, square images on grey #e4e4e4, name start + "PRE-ORDER / $22.0" end in 11px under each (PC-05-like), coloured plates for bakery (teal, green, yellow) per item.
- PDP: condensed caps title 100px, story section about the tea landscape with aerial tea-field photo, tasting profile bars, editorial cross-link, related products; "For Trade" wholesale sizes (1kg/3kg/5kg) inline.

## Imagery
- Clinical product packshots on grey, macro tea leaves/powder splashes, aerial tea fields, bakery on flat colour, pop-culture illustration cameos.

## Page set observed
- /shop, PDP (one matcha cultivar), about-matcha page (230px statement, navy blocks, character comparison grid with profile bars for 10 cultivars, "For Trade" CTA to wholesale).

## Mobile notes
- Split logo becomes stacked; word-stack remains the centrepiece (big condensed grey words); chapters become colour plates with text + product stacks.

## Steal / Don't steal
- Steal: split-wordmark hero (works with any 2-part name; in Hebrew split a two-word name); kinetic word-stack statement; tasting/profile bars for consumables (coffee, wine, tea, perfume); retail + wholesale side by side with the same product data.
- Don't steal: long olive plate transitions that show nothing (dead screens); 11px product labels.

## ACF mapping hints
- `split_logo_hero` (logo part A SVG, part B SVG, tagline, images x2, nav inline toggle).
- `word_stack` (words repeater, final word, highlight index).
- Product ACF: `profile` repeater (attribute, value 0-10), `aroma_notes`, `best_prepared`, `wholesale_sizes`.
- `chapter_pinned` (title, plate colour token, products relationship, links pair).
