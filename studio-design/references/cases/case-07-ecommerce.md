---
case: case-07-ecommerce
descriptor: Israeli furniture retailer e-commerce store (Hebrew)
region: Israel
site_type: ecommerce (furniture, Hebrew)
industry: furniture retailer with showroom, custom-made sofas/beds/tables
platform: Shopify (Swiper + Splide)
libs_detected: [swiper, splide, shopify]   # wa.me link, tel link, accessibility statement, ₪
direction_match: [campaign-commerce, industrial-catalogue, architect-calm]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A showroom catalogue: cut-out sofas lined up on white, interrupted every few rows by a wide room photo stamped with a big grey year and a Latin caps collection title.

## DNA summary
- Macrostructure (10,475px): header (hamburger, logo, search field with an all-categories dropdown, cart) -> **category strip of cut-out products** with Hebrew labels (sofas, armchairs, beds, orthopaedic mattresses, dining tables …) -> collection banner (huge grey year + Latin caps over a room photo, "to the whole collection" chip with a hand icon) -> product rail ×10 (5-up, cut-outs on white) -> bed collection banner -> beds rail with -30% flags and struck prices -> dining-table banner -> tables -> dining chairs -> showroom video (YouTube) -> lifestyle statement -> footer.
- Hero: H-23 (category grid as the first screen) + collection banners as section dividers.

## Signature moves (local, worth doing better)
- Bilingual product names: Hebrew type + Latin model name in one line (model names are how customers remember them in the showroom).
- Note under each name saying full custom design/sizing is available: customisation is the selling point.
- Prices "12,900 ₪" (₪ after), struck original price, red "-30%" flag top corner.
- WhatsApp float bottom-left, accessibility icon at the left edge (the local pattern).

## Tokens observed
- Fonts: Open Sans 300 for names at 32.4px -0.05em (!), Poppins for Latin UI. Better: Heebo 400 names at 18-20px, Latin model name in the same face.
- Palette: white, #f5f5f5 plates, #1a1a1a header, coral #d47070 flags.
- Radii: 50% (round icons), 999px pills, 14px cards. Shadow 0 4px 14px rgba(0,0,0,.18) on chips (template-ish).
- Product grid gaps 3-9px (dense, good).

## Steal / Don't steal
- Steal: category cut-out strip as first content; collection banners as chapter dividers; bilingual model names; custom-order note; dense 5-up rails.
- Don't steal: 32px w300 Open Sans product names (thin, huge), Latin-only collection banners on a Hebrew store (add the Hebrew line), floating WA + a11y icons over products, 10 near-identical rails (vary: editorial insert, room shot, material story).

## ACF / Woo mapping hints
- `category_strip` (product_cat terms with cut-out thumbnail field). `collection_banner` (image, year, title_latin, title_he, link). Product meta: `model_name_latin`, `custom_order` (bool + note). Sale flag from Woo `_sale_price`.
