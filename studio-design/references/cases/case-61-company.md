---
case: case-61-company
descriptor: "Israeli consumer digital bank, Hebrew"
region: Israel
site_type: company / landing (consumer digital bank, Hebrew)
industry: retail banking app
platform: custom (no CMS fingerprint)
libs_detected: []   # 1 video, 3 iframes, 2 sticky elements
direction_match: [billboard-type, inflatable-pop, kikar-heavy]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A grey bank lobby where the sign is 200px tall and black, and the only colour is a hot magenta door at the end.

## DNA summary
- Macrostructure (7,406px): sticky header → **200px w900 Hebrew one-line statement (everything you need from a bank, only simpler)** over a grainy photo → app pitch with a magenta QR tile and app-download pill → product cards (current account / credit cards …) → refer-a-friend → texture/photo band (leopard print, blurred life photos) → about paragraph → FAQ (96px title + "+" rows) → live FX and index cards (official FX rates, market indices) with a chart → magenta field footer with a giant cropped Latin wordmark.
- Hero: H-01. Custom bank-commissioned heavy grotesk (Black) 200px w900, lh 0.76, -2px; two lines, the second cropped by the fold; start-aligned (right).
- Nav: 3 Hebrew links stacked small at the top-right, magenta wordmark centred, grey open-an-account pill at the left (end).
- Footer: magenta #fb48c4 field, link columns, short service phone number and numbers in LTR, cropped 300px+ caps wordmark in pale pink at the bottom.

## Signature moves
- Scale shock in Hebrew: 200px w900 at lh 0.76 (the tightest Hebrew line-height in the scan) with short lines so final letters don't collide.
- Achromatic grey (#ebeae8) page + one field colour reserved for the app QR tile, a few labels and the footer.
- Real data as proof: FX rates and stock indices with a small line chart.

## Tokens observed
- Fonts: custom brand grotesk (Black/Regular). Free sub: Heebo 900 (display, lh 0.82, -0.01em) + Heebo 400 (24px body).
- Scale: 200/0.76 w900 · 96/0.8 w500 (FAQ title) · 42/1.05 · 36/1.1 · 24/1.17 body · 20 nav/buttons.
- Palette: grey #ebeae8 / #f4f8f7, ink #303030, magenta #fb48c4, white.
- Radii: 100px pills, 40px cards, 10px small. Shadow 0 4px 19-24px rgba(0,0,0,.07-.12) on floating cards.
- Gaps 24px between product cards; 128px / 190px big layout gaps.

## Motion inventory
- Sticky header; reveal of the statement; no library globals.

## Imagery
- Grainy, warm, candid photos of young people; leopard texture; app QR code; no device mockups.

## Mobile notes
- H1 64px lh 52 (0.81); page 5,745px.

## Steal / Don't steal
- Steal: one heavy Hebrew statement at 140-200px; grey + one field colour; FAQ as large title + "+" rows; data cards as proof; field footer with cropped wordmark (once per site).
- Don't steal: lh 0.76 unless every line pair is checked for descenders (ך ן ף ץ ק); cookie notice repeated over the whole scroll.

## ACF mapping hints
- `statement_hero` (text, bg image, crop). `app_cta` (title, QR image, store links). `product_cards` (repeater). `faq_plus` (title, rows). `market_data` (API source, items). `field_footer` (wordmark, columns).
