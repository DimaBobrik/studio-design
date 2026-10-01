---
case: case-56-ecommerce
descriptor: "Italian-made sneaker brand (large fashion catalogue, gender x model taxonomy)"
region: Europe (Italy)
site_type: ecommerce (fashion catalogue, gender x model taxonomy)
industry: Italian-made sneakers
platform: Shopify (custom theme)
libs_detected: [shopify]   # 20 sticky elements, backdrop blur 10px, 4 videos
direction_match: [campaign-commerce, industrial-catalogue, swiss-signal-grid]
captured: 2026-09-30
source: "award gallery scan 2026-09 (catalogue navigation reference; shipping + newsletter modals dim every desktop frame)"
---
> A sneaker boutique's sample wall: every shoe on the same mauve-grey shelf, a cobalt block of a logo stuck to the corner like a price gun label.

## DNA summary
- Macrostructure: full-bleed campaign banners (870px each) alternating with product rails; model index as a separate navigational page; UGC grid; cobalt newsletter block; accordion footer.
- Hero archetype: H-22 campaign band - full-bleed product/lifestyle photo (sneaker on teal backdrop), 76px light sans headline bottom-start (a craftsmanship claim), 12px lede, two bullet text links "• shop women's  • shop men's"; rotating circular text badge at the end edge (made-in-Italy, C-03).
- Nav: unusual - N3/N4 mix floating card stack top-start: cobalt #0e3cf6 tile with the logo + 3 links (WOMEN / MEN / EXPLORE, 10px mono caps), under it a translucent grey tile with SEARCH field, ACCOUNT and BAG rows (backdrop blur 10px, radius 5px). Plus a 30px fixed announcement bar (HD-01) with scrolling mono caps messages (free-shipping threshold + new arrivals). On mobile: cobalt bar with logo, search, icons.
- Footer: FT-04 with trust rows (14-day returns / environmental / free shipping threshold), accordion groups (customer services / about & legal / follow us), region + language selectors, and a docked 3-button bar LIVE CHAT / CALL / EMAIL.
- Home sections (DOM): campaign hero -> women's / men's icons split banner -> icons/classics rail (4-up cards, arrows, NEW / BEST-SELLER tags in mono, "shop now" link) -> seasonal campaign band -> brand-handle UGC grid (social, 6-col) -> cobalt newsletter block (first/last/email + consent checkbox) -> footer.

## Signature moves
- Logo-tile navigation: the brand mark lives inside a solid cobalt card that doubles as the main menu - the header is an object, not a bar.
- Model Index page: every silhouette (each model named after a resort town or city) as a 98px light sans word with a line drawing of the shoe to its start, rows separated by rules (H-23 / F-15) - taxonomy as a typographic list.
- Uniform mauve-grey plates #e6e3e6 for every product image, 1px white gutters - the catalogue reads as one wall.

## Tokens observed
- Fonts: Apercu Pro 400 (all sizes), Apercu Mono Pro 10-12px uppercase +0.03em (nav, tags, announcement). Free subs: "Figtree" 400 / "Albert Sans" 400 / "Instrument Sans" 400; mono "DM Mono"/"Space Mono". Hebrew: "Heebo" 300/400 + "IBM Plex Mono".
- Scale: 98/1.1 (model names), 76/1.1 (campaign), 34/1.2 (section), 24 (PDP title), 13-16 body, 10-12 mono.
- Palette: cobalt #0e3cf6 (logo tile, newsletter block, primary "add to bag", links), ink #222222, greys #919191 / #8d8d8d, plate mauve-grey #e6e3e6, white; sale red #d80000.
- Radii: 5px (buttons, tiles, inputs), 3-4px chips. Gaps 5-10px. Shadows none.

## Motion inventory
- Marquee announcement bar; rotating circular badge; rail arrows; 20 sticky elements (sticky filters/PDP buybox); videos in campaign bands. No GSAP/Lenis.

## Layout notes
- Content column starts after the floating nav (~100px inset at start) so nav never covers product; rails 4-up at ~372px cards.
- PLP: collection intro text top-start, "N Products · FILTERS · SORT BY: Featured" row end, 3-up grid with hairline cell borders (PC-01 mix), card = image on grey + gender label + name + struck price + sale price red + "+1 Color".

## Imagery
- Two tiers: studio product on grey plates (3/4 angle, same light) and campaign lifestyle in European streets (older couples, cafés) - age-diverse casting.

## Page set observed
- PLP (women's trainers): 3-up grid with borders, filters drawer trigger, sale pricing.
- PDP: PD-03 mosaic (2-col image grid: side, top-down pair, angle) + sticky buybox card on grey: breadcrumb, title 24px + wishlist icon, gender line, struck €185 + red €148 "tax & import duties included", description + read more, COLORS thumbnails with active underline, SIZE select + cobalt "add to bag", Klarna line, info rows (shipping: free over threshold / estimated delivery as a computed date range / 14-day return policy) in blue values, tabs DETAILS & CARE | SHIPPING & RETURNS | NEED HELP?; then LIVE CHAT section.
- Model index (see Signature).

## Mobile notes
- Cobalt top bar replaces the tile; campaign images full-bleed; rails 1.2-up; footer accordions; sticky bottom contact bar.

## Steal / Don't steal
- Steal: logo-tile nav for a brand with a strong mark; model/collection index as giant typographic rows with line drawings; delivery-date + returns rows in the buybox with computed dates; uniform plate colour for all product shots; gender label above product name.
- Don't steal: two modals on load (shipping + newsletter) stacking over the hero; "Translation missing" strings in nav a11y labels (seen in data) - always localise aria labels (Hebrew!).

## ACF mapping hints
- `campaign_band` (media, h, lede, links repeater, badge text).
- `product_rail` (source: collection/tag, tags logic NEW/BEST-SELLER from data).
- `model_index` (taxonomy `pa_model` or CPT: name, line-drawing SVG, link).
- PDP: delivery estimate (days min/max ACF option), info rows repeater; Woo product_cat ACF `plate_colour`.
- Options: logo tile colour, announcement messages repeater.
