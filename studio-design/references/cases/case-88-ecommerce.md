---
case: case-88-ecommerce
descriptor: "South African food & produce packaging supplier (B2B catalogue + corporate mix)"
region: Africa (South Africa)
site_type: ecommerce (B2B catalogue + corporate mix)
industry: food & produce packaging supplier
platform: WordPress + WooCommerce (custom theme)
libs_detected: [lenis, wordpress, woocommerce]   # marquees, backdrop blur 25px
direction_match: [machined-soft, forest-bone-heritage, architect-calm]
captured: 2026-09-30
source: "award gallery scan 2026-09 (closest to a typical agency client brief)"
---
> A tidy trade counter in a sunlit warehouse: greige shelves, one thin grotesk speaking softly, frosted glass tiles pointing each industry to its aisle.

## DNA summary
- Macrostructure (home): hero with industry tiles -> keyword marquee band -> shop CTA -> industry solutions (photo with a white card per segment) -> mission/vision rows -> New Products 4-up -> dark-green custom-packaging CTA with marquee strip -> Factory & Product Standards (certification list) -> FAQ -> greige footer.
- Hero archetype: H-13 over a full-bleed product photo (iced coffee in clear cups on warm greige plinths): 73px w200 H1 top-start (two short sentences: packaging that performs, for industry leaders), and 3 frosted-glass tiles bottom-start (Food Service / Food Processing / Agriculture) with backdrop blur 25px - segment routing in the first screen.
- Nav: N2 - logo (arrow mark + 2-line wordmark) start, 5 links (Shop / Packaging Solutions / Company / Resources / Contact Us) with an underline indicator on the active item, end: "Credit Application" (B2B), cart outline square, black "Login ▾" chip; 80px fixed on off-white.
- Footer: greige #dfdac6 block: the tagline sentence 36px + back-to-top square, giant dark-green arrow logo mark, the 3 segment tiles again (outlined), a rounded hairline legal bar with socials; floating WhatsApp button bottom-end.

## Signature moves
- Segment tiles as the primary navigation in hero and footer (frosted glass over photo, outlined in footer) - the B2B visitor chooses an industry immediately.
- Keyword marquee band: two rows of 53px light words drifting in opposite directions (direct B2B ordering / quality / branding / rewards programme / partnerships / custom packaging / sustainable / innovation) over a product render - capabilities without a feature grid.
- Certification list as a proof section: two columns of bullet rows with hairlines (FDA, EU 10/2011, BRCGS, FSC, GRS, BPI, DIN CERTCO, TÜV OK Compost, ISO 9001/14001/22000/45001, FSSC 22000).

## Tokens observed
- Font: Magnetik (single family; display 200-300, UI 300-400). Sizes are fractional (13.33 / 26.67 / 53.33 / 73.33 / 118.33px) = rem-based fluid root scaling. Free subs: "Manrope" 200-300 / "Outfit" 200 / "Plus Jakarta Sans" 300. Hebrew: "Heebo" 200-300 (check legibility; body at 400) / "Assistant" 300.
- Scale: 118/1.1 (segment page H1), 73/1.15 w200 (home H1), 53/1.1 w300, 46.7, 36.7/1.25, 26.7, 20, 16.7, 13.3 body, 10-12.5 meta.
- Palette: ink #1d1d1b, off-white canvas #fffdf5 / #f7f4e9, greige #dfdac6 (bands, footer), taupe #bbae96 (rewards CTA), deep green #12271d (custom CTA band, logo), grey #464646 / #70706e, black; success message #d3eebe.
- Radii: 3.3px (chips, buttons), 6.7px (cards), 13.3px (glass tiles, product plates). Shadows: 1px inset ink ring on outlined buttons; soft taupe glow `0.8px 0.8px 15px rgba(187,174,150,.25)`.
- Section paddings 66.7/66.7px, 113/33px; containers 823/1134/1440.

## Motion inventory
- Lenis; two marquees (keywords band, a "not sure what's possible? get in touch ↗" strip, a "need to restock? order now ↗" strip on segment pages); segment page hero pinned (2,759px); accordion FAQ; glass tile hover. No GSAP.

## Layout notes
- Solutions section: full-bleed food photo with a white card (title, text, "tell me more →" with hairline) at the start and the other 2 segments as translucent tiles - tabs over one image.
- Mission/Vision: rows with a bullet label start and text at column 7, hairline separators (label column as in case-71-company).

## Imagery
- Clean studio product shots on warm greige; styled food scenes with the packaging in use; product renders (clear clamshell) for CTAs.

## Page set observed
- /shop (PLP): "shop all products" 46.7px + search icon; "hide filters" toggle; sidebar FL-01 with checkbox groups (Categories with counts, Material ...); category chip row with counts (Coffee 14, Smoothies 8, Deli 31, Takeout 47, Extras 10, Bags & Pouches 9) + "Sort by: Latest"; 4-up grid on off-white plates, green vertical "NEW" tab on the card edge, "From R2.76 incl. vat" pricing; promo tiles inside the grid (delivery info card on sage, rewards card "get 5% back on every purchase" taupe).
- PDP: breadcrumb, image plate with zoom icon, title 36.7px, Type selector as bordered option boxes with unit price (Small R2.07 / Medium R2.33), Packing type (Sleeve / Box), qty stepper, full-width "Add to cart", delivery info pair (estimated arrival: central hubs 1-3 business days / prefer to collect? with hours), note on same-day dispatch and free delivery threshold, accordions (Description / Additional Information / Details and Dimensions), related products, CTA band, FAQ.
- Segment page (Food Service): 118px title + product render, sub-headline, full-bleed photo with restock marquee, supply section, products, cashback CTA, pinned why-choose-us, Our Process (dark green), standards, FAQ.

## Mobile notes
- H1 49.9/57.4 w200; segment tiles become full-width stacked glass bars; header: logo, cart, Login, burger.

## Steal / Don't steal
- Steal (for B2B Woo): segment tiles in hero + footer; "Credit Application" and Login in the header for trade accounts; delivery/collection info blocks under ATC; promo cards inside the PLP grid; certification list section; per-segment landing pages sharing the same blocks.
- Don't steal: weight 200 for long H1s on photos (contrast); off-white #fffdf5/#f7f4e9 + greige leans to the cream attractor - fine here because the industry is kraft/natural, but rotate for other clients.

## ACF mapping hints
- `hero_segments` (image, h1, segments repeater: title, link, style glass|outline).
- `keyword_marquee` (rows repeater: words, direction).
- `segment_showcase` (image, active segment card: title, text, link; other segments).
- `cert_list` (repeater: name, optional logo/link). `cta_band_marquee` (title, render, marquee text, link).
- Woo: ACF on product `delivery_note`, `collect_note`; PLP promo inserts via ACF on product_cat (position, card type).
