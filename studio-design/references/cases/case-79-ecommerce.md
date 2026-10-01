---
case: case-79-ecommerce
descriptor: "Scandinavian minimalist fashion label (international Shopify store)"
region: Europe (Sweden)
site_type: ecommerce (fashion, Shopify)
industry: womenswear / menswear
platform: Shopify (custom theme), 13 sticky elements, mega footer
libs_detected: [shopify]
direction_match: [whisper-studio, cold-chrome-luxury, architect-calm]
captured: 2026-10-01
source: "world agency client scan 2026-10 (home only)"
---
> Quiet luxury by subtraction: the home opens on one small product photo centred in white space, then full-bleed 2-up editorial pairs, one 16px light sans for everything, no colour at all.

## DNA summary
- Macrostructure (~4,800px, 4-5 Shopify sections each exactly 900px): white first viewport with ONE small portrait-format product photo (~260px wide) centred, collection caption 18px light under it → 2-up full-bleed editorial pair (two portraits edge to edge, small caption + "shop" link each) → another 2-up pair → mega footer: 4 link columns + newsletter, light 14px.
- Nav: tiny Women / Men / About top-start, caps wordmark centred (HD-03), search/account/cart top-end; transparent.

## Signature moves
- **Small-object hero**: the product at ~18% of viewport width in an empty white field (inverse of the A11 film band attractor).
- **Viewport-sized 2-up pairs** (PL-08 editorial pair interleave): each section is exactly one viewport.
- **One face, one weight (300), one size range 14-18px**: hierarchy only by position and space. H1 is 16px (logo-level), display px 18.

## Tokens observed
- Fonts: a custom brand sans 300 only. Free sub: "Hanken Grotesk" 300 or Fontshare "Satoshi" 300. Hebrew: "Assistant" 300 (allowed fallback) or "Noto Sans Hebrew" 300.
- Palette: #fff, ink #090909, grey #5a5a5a, footer #161616. Accent-less, radius 0, no shadows.

## Steal / Don't steal
- Steal for premium fashion/jewellery/furniture with real photography: small-object hero, viewport 2-up pairs, single light face.
- Don't steal: 16px H1 (keep a real visible H1 ≥ 32px on PLPs for SEO and a11y; it can still be quiet).

## ACF mapping hints
- `object_hero` (image, caption, link), `pair_band` (2 × image/caption/link), both as Flexible Content layouts on the front page; Woo PLP gets PL-08.
