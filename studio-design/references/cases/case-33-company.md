---
case: case-33-company
descriptor: Israeli credit-card company (cards, loans; Hebrew)
region: Israel
site_type: company / commerce-adjacent (credit cards, loans; Hebrew)
industry: credit card issuer
platform: Wix (Studio), custom hashed fonts
libs_detected: []   # 9 videos, 326 SVGs, two-tier header
direction_match: [inflatable-pop, organic-colour-block, kikar-heavy]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A white counter scattered with paper cut-outs in orange, violet and pink; the cards themselves stand on pastel pedestals like toys in a shop window.

## DNA summary
- Macrostructure (9,031px, 11 sections): centred hero with paper shapes -> next-day loan offer -> card products on three tall pastel plates (pink / orange / lilac) with silver card renders -> loan slider calculator -> solutions grid -> abroad/travel band -> benefits as a photo mosaic of circles and tall rounded frames -> app intro (violet panel) -> digital credit band (dark) -> news cards on navy (arch-cut photos) -> footer.
- Hero: H-01 centred. 90px w400 custom Hebrew face lh 1.2 two lines (a short campaign slogan with the brand name), 16px subline, black rectangular button; flat orange zig-zag, violet half-disc, pink petals cut shapes at the edges (bleeding off-screen).
- Nav: two tiers: top utility (private / business customer switch, app download pill), main 148px block with categories (loans, cards, info & actions, benefits, abroad, savings & investments, insurance) + "my account"; a quick-actions panel floats at the right edge.

## Signature moves
- Flat paper-cut shapes in a fixed 3-4 colour set as the brand's illustration system (no gradients, no shadows).
- Product plates: each card product gets a tall colour plate with the card render tilted on it and a round arrow button at the bottom corner.
- Loan amount slider as an interactive proof of "fast money".

## Tokens observed
- Fonts: three Wix-hosted custom faces (display 90/40/24px w400; text 16px; nav 15px). Free sub: Rubik 500 display (round, friendly) or Heebo 500; text Assistant 400.
- Palette: white #fff / #fdfdff, ink #101820, greys #b2b2b2 / #e8e8e8, navy #101820 bands, orange, violet #8a7cf0-ish, pink, peach (plates).
- Radii: 4 / 8 / 22 / 30 / 40px (cards 30-40, chips 4-8). Shadows nearly invisible.

## Motion inventory
- Video loops (9), slider, hover on plates; no smooth-scroll library.

## Imagery
- Card renders, lifestyle photos cropped into circles/arches/tall rounded frames, flat cut shapes.

## Steal / Don't steal
- Steal: a fixed cut-shape palette as illustration system; products on colour plates; interactive calculator as proof; arch-cut photos.
- Don't steal: html `dir="ltr"` (RTL set lower), 634 header links (mega menu in DOM), hashed font names (no fallback stack).

## ACF mapping hints
- `shapes_hero` (title, sub, cta, shapes set: select). `product_plates` (repeater: colour token, render, title, link). `loan_slider` (min, max, step, rate copy). `photo_mosaic` (repeater: image, mask circle|arch|tall).
