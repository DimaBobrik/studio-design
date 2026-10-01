---
case: case-83-ecommerce
descriptor: "UK experimental technical-apparel brand (Shopify)"
region: Europe (UK)
site_type: ecommerce (technical apparel, Shopify)
industry: experimental clothing
platform: Shopify, 8 videos, custom cursor
libs_detected: [shopify]
direction_match: [industrial-catalogue, darkroom-object, cosmic-retrofuture]
captured: 2026-10-01
source: "world agency client scan 2026-10 (home only)"
---
> A clothing store that sells like a science journal: each product is a claim (e.g. a jacket whose material origin is told as a cosmic science fact), shot like lab evidence on flat colour fields, with a blackletter-ish display face for drama.

## DNA summary
- Macrostructure (~13,000px, 10 Shopify sections, most exactly 810px): hero film of a model in a reflective jacket in a gallery space with a 28px caption claim bottom-start → product plates, one per viewport: jacket on red field, portrait close-up on grey, jacket flat on grey, model on acid-green field, leather jacket on grey, industrial interior, model on dark… each with a one-sentence claim (Suisse Intl Cond 700 + Fractul) and "Shop" link → product lists (16 thumbs) twice → a one-line band citing two best-inventions awards from a major news magazine → 3D render of a sci-fi object → sign-up block (Fractul 120px, a 3-word sci-fi invitation).
- Nav: sticky 66px, small; product list sections are plain grids.

## Signature moves
- **Claim per product** written as a fact (material, origin, test), not an adjective.
- **Flat colour field per product** (red, acid green, grey) with the garment centred: the colour is the product's, not the brand's.
- **Proof as award line** in one thin band, not a logo wall.
- **Display outlier** (Fractul) used only for the sign-up and big statements.

## Tokens observed
- Fonts: Suisse Intl 400 (body), Suisse Intl Cond 700 (heads 28-56px), Suisse Intl Mono (specs), Fractul 400/500 (display 38-120px). 4 families: over the ≤3 rule (Suisse superfamily counts as one; Fractul is the outlier). Free subs: "Archivo" (wdth 62-100) + "JetBrains Mono" + "Unbounded" as outlier. Hebrew: "Rubik" + "Secular One".
- Palette: white, black, greys #6d6d6d/#d3d3d3, electric blue #0000ff UI, product fields vary. Radius 4-16px. Inset 1px ring buttons.

## Steal / Don't steal
- Steal for technical products (outdoor, tools, materials, B2B hardware): one claim per product, product-coloured field plates, award line.
- Don't steal: pure #0000ff UI blue.

## ACF mapping hints
- Product ACF: `claim` (1 sentence), `field_colour` (token select), `proof_line`; home layout `product_plate` (product picker, override image, field).
