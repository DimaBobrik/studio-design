---
case: case-65-ecommerce
descriptor: "Parisian quiet-luxury leather goods / handbag brand (collection-led catalogue)"
region: Europe (France)
site_type: ecommerce (leather goods, collection-led catalogue)
industry: leather goods / handbags
platform: Shopify (custom theme)
libs_detected: [shopify]   # custom cursor, 2 videos in hero, blur 5px
direction_match: [cold-chrome-luxury, darkroom-object, whisper-studio]
captured: 2026-09-30
source: "award gallery scan 2026-09 (quiet-luxury e-commerce benchmark; geo-redirect modal + cookie card in every desktop frame; several scroll frames blank from lazy media)"
---
> A gallery of leather in open landscapes: films of women walking through grass and stone, the bag appearing as a small framed card in the corner, typography almost whispering.

## DNA summary
- Macrostructure: home = hero film -> category word list -> photo mosaic -> product banner (collection launch) -> product carousel (28 images) -> mosaic -> social collage -> footer. Almost no copy; photography and category words do all the work.
- Hero archetype: H-22 variant - full-bleed muted video of a model walking in a moor landscape (grey sky, dry grass), a small product "polaroid" card bottom-start (bag cut-out on light grey plate + one-word model name + price in €) - the product rides on the film like a caption.
- Nav: HD-03 luxury centred wordmark: thin serif-caps wordmark centred; tiny 8px tracked caps links start (bestsellers / bags / jewellery / accessories / craftsmanship) and end (language / stores / account / search / ♡0 / bag 0); hairline under; transparent over hero.
- Footer: one-line newsletter invitation + underline field + submit, 4 link columns in 8px caps, payment icons end, centred copyright.
- Home sections (DOM): hero -> promoted categories as a centred stack of giant light serif caps words (bags / jewellery / small leather goods at 98px w300) on grey -> mosaic (2 images) -> collection-launch product banner (dark, model name 50px + text) -> product carousel -> mosaic of 3 portrait lifestyle images (model holding bags, beige/black/olive) -> follow-us social section as a scattered collage of small photos and a chest of drawers still-life -> footer.

## Signature moves
- Category menu as display type: the only big type on the home is the list of categories (98px light serif caps, centred) - navigation becomes the headline.
- Product card on film: price + name + cut-out in a small plate over the hero video (shop-the-film).
- Scattered collage for the social section (small images at irregular positions/scales on grey) instead of a grid.

## Tokens observed
- Fonts: "Primary" (thin/light serif-ish display 100-300 weights; 38-98px), "Secondary" (text 16-18px), "Tertiary" (8-10px tracked caps UI) - brand fonts renamed. Free subs: display "Cormorant" 300 / "Italiana" / "Marcellus"; text "EB Garamond"/"Newsreader" 400; UI caps "Jost" 500 / "Montserrat" 500 at 10-11px (8px is too small). Hebrew: display "Frank Ruhl Libre" 300 / "Bellefair" (Hebrew serif, thin), text "David Libre", UI "Heebo" 500 at ≥11px.
- Scale: 98/0.92 w300 caps (category words), 50/1.08 (product banner), 38 w100 (PLP titles), 18 w250 (product names), 16, 12, 10, 8 (nav/labels).
- Palette: black #000, white, grey text #757575, near-black #131316, PLP canvas #f9f8f6 (warm off-white - close to the banned cream list; product plates are cool light grey #dcdad7-ish in captures), photography muted (grey skies, camel leather).
- Radii: 2px buttons, 4px, 16px (one card), 50% icons. Shadows only on modals.

## Motion inventory
- Hero video loops (2), carousel, custom cursor, sticky header; lazy-loaded mosaics (blank until in view). No GSAP/Lenis.

## Layout notes
- PLP: title 38px start + "see all" end on a hairline; collection shortcut rail (small bag thumbnails with model names) with arrows; "FILTERS (0)" + grid toggle end; 4-up grid, 2px gaps, product on light plate (square-ish 4:5), caption 3 lines: NAME caps 8px, edition/leather finish, price; editorial banner inserted mid-grid (full-width dark photo card with story text + "see the whole collection").
- PDP: 50/50 split - left: sticky scroll of lifestyle photos (model with bag on rock, snow, dunes); right: breadcrumb, centred name 18px + edition + price, packshot on grey plate, "3D VIEW" pill, colour thumbnail rail (6 + "discover all (24)"), full-width black add-to-bag + heart; tabs Description / Details / Care / Dimensions; 2 accordions (made with care / shipped with care); then split-screen craftsmanship teaser (photo of the Spanish leather-craft town where bags are made + text).

## Imagery
- Muted cinematic landscapes (moor, snow, dunes, sea), women in neutral clothing, bag always carried not posed; packshots on grey; artisan town photography.

## Page set observed
- PLP (handbags, bestsellers), PDP (one bag in camel). Craftsmanship page implied.

## Mobile notes
- Page height 3,851px (much content hidden); header wordmark + icons; categories stack; product grid 2-up.

## Steal / Don't steal
- Steal: category words as the home's headline block; product-card overlay on hero film; PDP left sticky lifestyle column + right packshot/colour rail; editorial banner inside PLP grid; "3D VIEW" chip; artisan-origin split-screen at PDP end.
- Don't steal: 8px nav labels (a11y; minimum 11-12px, Hebrew 13px); geo modal on first visit; warm off-white canvas close to the cream attractor.

## ACF mapping hints
- `hero_film_product` (video, poster, product relationship -> card with name/price).
- `category_words` (repeater: term, link) centred display list.
- `mosaic` (images repeater 2-3, ratio pattern). `collage_social` (images repeater with x/y/scale).
- PLP: `collection_rail` (terms with thumbnail), `editorial_insert` (position index, image, text, link) via ACF on product_cat.
- PDP: `lifestyle_gallery` (images), `origin_teaser` (image, title, text).
