---
case: case-76-ecommerce
descriptor: "Chord-generating synthesizer maker (single hero hardware product + plugin + accessories)"
region: Oceania (Australia)
site_type: ecommerce (single hero hardware product + plugin + accessories)
industry: chord-generating synthesizer + software plugin
platform: Shopify (custom theme)
libs_detected: [swiper, shopify]   # custom cursor, backdrop blur 80px, 6 videos, 3 sticky
direction_match: [cosmic-retrofuture, darkroom-object, desktop-y2k]
captured: 2026-09-30
source: "award gallery scan 2026-09 (built by the studio in case-43-company)"
---
> A 1974 synth brochure found in orbit: a starfield, a glowing keyboard floating above a face, and a TV channel you can tune to.

## DNA summary
- Macrostructure: world-building home (hero -> brand TV channel -> featured products -> mission + story cards -> community garden -> studio video series -> products -> testimonial -> community -> SIGN UP) and long pinned PDPs (hero product PDP 15,312px) that walk through every control.
- Hero archetype: H-24 variant on a starfield - product render floating top-centre with a soft halo, a film-grain close-up face below it, warm-glow serif headline (a 5-word introspective line as image/lettering, ~70px) across the middle, ghost "shop [product]" pill end, sticky orange "join the mailing list ×" tab bottom-start.
- Nav: N3 floating dark pill centred top (wordmark + product ▾ / plugin / shop all / support / globe / BAG 0), 12px mono caps, blur. Store pages add an orange free-shipping marquee bar (HD-01 marquee).
- Footer: black: giant pixel-condensed "SIGN UP" (half-width, pixel/bitmap outline font) + newsletter sign-off line with region radios (North America / International), mono link columns, region select, logo lockup, payment icons, agency credit chip.
- Home sections (DOM): hero -> TV wall (blurred video tiles with a centred CRT-style channel card: channel number + channel name + "click to watch") -> Featured Products (2 big orange gradient cards: product on orange with "explore product" ghost pill) -> black mission band (one sentence: the company mission) + card rail -> community block (beige, Discord/Patreon pills, UGC video cards with @handles) -> studio video series (giant beige pixel word "STUDIOS" behind, logo lockup, watch-on-YouTube) -> Featured Products 3-up -> green testimonial band -> Community (green) -> SIGN UP footer.

## Signature moves
- Owned media inside the store: a "TV channel" module and a studio video series make the brand a broadcaster, not a shop.
- Pixel/bitmap mega-words ("STUDIOS", "SIGN UP") in beige or white as section backdrops - a single retro texture against clean Suisse UI.
- Product always on a hot orange gradient plate (#f0602a-ish -> peach) - a colour that means "this is for sale".
- PDP floating buy module: bottom-end glass card (product name + model code · ☐ add plugin · BUY NOW $649 USD) in neon green #37fa16 that follows the long story (SA-01 variant with bundle checkbox).

## Tokens observed
- Fonts: Suisse Intl 400/500/700 (UI, headings 20-40px), Suisse Intl Mono 12-16px uppercase (nav, buttons, prices "$649 USD"); lettering/pixel words are images/SVG. Free subs: "Inter"/"Hanken Grotesk"; mono "Geist Mono"/"IBM Plex Mono"; glow serif lettering "Instrument Serif"/"Gloock"; pixel mega words "Pixelify Sans" / "Silkscreen" or custom SVG. Hebrew: "Heebo" + "IBM Plex Mono"; pixel Hebrew via SVG lettering.
- Scale: UI is small (12-24px, H1 on PDP 20px!); drama comes from images and mega-words. Shop All H1 40/1.5.
- Palette: black #000000 / #151515 / #191919, white, beige #efede6 (community/studios), grey #dddee2 / muted #a3a3a3, orange (mailing tab, plates; not in computed text - visual ~#f26b2a), neon green #37fa16 / #22d504 (buy now, active nav), forest green band (testimonial/community), purple CRT card.
- Radii: 24px and 32px cards, 64px pills, 2-4px chips, `0 0 24px 24px` sheets; backdrop blur 80px (glass modules).

## Motion inventory
- Video loops (6) with blur; Swiper rails with round arrow buttons; sticky buy module; pinned PDP sections (keyboard walkthrough 5,400px pinned with hotspot text blocks naming the patented dials and rotary encoders); marquee announcement; custom cursor; `ani-section-fade` fade-ins.

## Layout notes
- PDP walkthrough: product render fixed start (~55%), feature copy blocks stacked end column at 25-75% height, advancing with scroll (F-02).
- Shop All: 4-up cards, image square on per-product plate (orange / peach / brown / sky), name 16px + mono price; filter pills (SHOP ALL / APPAREL) top-end; "SOLD OUT" in mono instead of price.

## Imagery
- 70s film grain portraits, starfield, product renders on warm gradients, UGC musician videos, lush green outdoor shots.

## Page set observed
- Hero product PDP: hero -> pinned keyboard walkthrough -> polyphonic chord generation (videos) -> a "more features" section with a parenthetical joke subtitle -> firmware updates (canvas) -> sound sampler -> plugin cross-sell -> Specifications -> FAQ -> closing claim -> Explore More.
- Plugin PDP: black hero with floating glass buybox (price, Afterpay line, neon BUY NOW + outlined ADD TO CART), story sections, specs, FAQ.
- Shop All: 4-up grid.

## Mobile notes
- Dark pill nav (burger / logo / bag); hero keeps product-over-face stack; orange mailing tab full width; cards 1.1-up with arrow buttons.

## Steal / Don't steal
- Steal: owned-media module (channel/series) inside a store; floating buy module with bundle checkbox; sold-for-sale colour plate; pixel mega-word backdrops; region radios on newsletter; pinned hardware walkthrough with feature blocks.
- Don't steal: H1s at 20px on PDP (weak hierarchy/SEO); relying on lettering images for headlines (translate/RTL impossible) - use live text.

## ACF mapping hints
- `hero_float_product` (render PNG, portrait image, headline text or SVG, cta).
- `channel_module` (videos gallery, channel number, label, link).
- `product_plate_cards` (relationship + plate gradient token).
- `walkthrough_pinned` (render image, features repeater: title, text, hotspot x/y).
- `sticky_buy_module` (product, bundle product checkbox).
- Footer: mega word (text/SVG), newsletter with region radios.
