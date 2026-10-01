---
case: case-01-ecommerce
descriptor: North American book-subscription club e-commerce site
region: US/Canada
site_type: ecommerce (subscription box + a-la-carte books + gifting)
industry: book subscription club
platform: Webflow
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, barba, webflow]   # three.js canvas for the 3D book/box
direction_match: [inflatable-pop, organic-colour-block, storybook-sketch]
captured: 2026-09-30
source: "award gallery scan 2026-09"
---
> A sticker wall at a book fair: melted-wax colour blobs, ultra-bold words that nearly touch, 3D hardcovers tumbling out of a patterned box.

## DNA summary
- Macrostructure: every section is a rounded colour "card" (radius 24px, often only bottom corners `0 0 24px 24px`) stacked with outer/inner clip transitions (`is--inner-clip`, `is--outer-clip`); background colour changes per section (yellow -> white -> soft pink -> aqua -> hot pink -> yellow -> white -> purple footer).
- Hero archetype: H-13 split on yellow #ffd24a with organic wave blobs (3 yellows): 4-word H1 at 120px/0.8 Champ Bold start, 15px lede, split pink button (login/sign-up text pill + separate square arrow tile); 3D hardcover books (three.js) tumbling at the end; a rotated handwritten shipping-region note (Organichand font).
- Nav: N2 pill cluster centred: 4 category chips (books / gifting / merch / FAQ) in tinted pills + pink split CTA; end: a regional-store switch pill + round social icons; logo start. 80px fixed; chip colours re-tint to match the current section.
- Footer: purple #32225f block: logo, app store badges, socials, 3D box render, mailing-list field + pink Subscribe split button, legal line.
- Home sections (DOM): hero (yellow) -> this month's books (rail of book cards: cover + genre chips + a playful content-warning tag + title + one-liner, arrows) -> how it works (soft pink; 4 tilted step cards in cyan/pink/yellow/lilac with line illustrations, step numbers handwritten) -> 3D box scene pinned (2,700px: box opens on aqua, short pun label) -> genres (hot pink #fd48f2; centred stacked list of genres in 48-78px bold with the mascot icon) -> "why us" sticker badges (tilted pills: range of genres / free shipping / affordable / hardcover quality / curated, around a logo) -> FAQ (3 questions + show all) -> gifting line (rotated 139px) -> promo double marquee ribbons crossing (first-box discount code) -> members' choice winners (yellow, rail) -> exclusive edition (white, product card in a rounded frame) -> footer.

## Signature moves
- Section-as-card with a new bg colour every time, rounded corners and clip transitions - the scroll feels like flipping coloured cards.
- Split buttons: label pill + separate arrow tile of the same colour, 2px gap - a recognisable CTA shape used everywhere.
- Sticker typography: key benefits as tilted, filled pills with outline shadows; rotated handwritten notes; crossing diagonal marquee ribbons for the promo code.

## Tokens observed
- Fonts: Champ 700 (display, tight -0.01em, lh 0.8), Degular 600/700 (UI and body, 12-30px; one 139.5px rotated line), Hello Organichand (handwritten notes). Free subs: display "Bricolage Grotesque" 800 / "Dela Gothic One" / "Rubik" 800; body "Figtree"/"DM Sans"; hand "Caveat"/"Gochi Hand". Hebrew: "Rubik" 800 / "Secular One" display, "Heebo" body, hand -> "Amatic SC" (Hebrew subset) or "Karantina".
- Scale: 120/0.8 H1, 96/0.8 genre words, 78/0.8 H2, 60/0.8, 41.25, 30, 24/1.2, 18, 15 body, 13.5, 12 nav.
- Palette (multi, fixed set): yellow #ffd24a / #faed8f / #f9a220, hot pink #ff008c (buttons), magenta #fd48f2, soft pink #ffdbfd / #feb6fa, aqua #ddfcfc / #00ecef, periwinkle #c2b4eb, orange #fbbe63 / #fddaa6 / #ff9d00, lime #e6ff2b, indigo ink #3b308f, wine #670a2e, footer purple #32225f, ink #000.
- Radii: 6px buttons/chips (many), 12/18/24px cards, 60px big pills, 50% icons, `0 0 24px 24px` section cards. Shadows none (depth via 3D renders and tilt).
- Container 990px content / 1159px wide rails.

## Motion inventory
- GSAP ScrollTrigger + SplitText + Lenis + Barba page transitions; three.js 3D books and box (pinned scene where the box opens); clip-path section transitions; tilted cards settle on enter; crossing marquees (2); chip colour re-tint per section.

## Layout notes
- Centered compositions for statements/lists; hero split 55/45; rails bleed off the end edge with arrow buttons top-end.
- Step cards overlap slightly with ±3-6deg rotations (C-44/F-13-like fan).

## Imagery
- Real book covers (the product), 3D renders of box and books, black line illustrations with flat fills, emoji in tags.

## Page set observed
- PLP (all books): periwinkle hero + search field with pink square button + horizontal genre chip rail (emoji + colour per genre); month heading with arrows; long pinned book list (10,557px) of cards; exclusive, badge, box, members' choice, FAQ.
- PDP: soft-orange blob hero, author name small, title 120px, genre chip, cover overlapping the hero edge, floating "add to box" split button bottom-end; review quotes; reading excerpt; book notes; similar-titles rail.
- Gifting: pink hero with confetti, 120px headline, split button with down arrow, press logos, subscriptions, pinned features, box, FAQ.

## Mobile notes
- H1 50.4/40.4 (lh 0.8 kept); Menu split button (label + burger tile); cards full width, genres list centred; rails swipe.

## Steal / Don't steal
- Steal: split-button shape as brand element; section-card colour sequence (define the order in tokens); sticker benefit pills; genre chips with colour-per-category; floating "add to box" on PDP; handwritten marginal notes (1 per screen max).
- Don't steal: lh 0.8 with descenders colliding in long headlines (fine for 3 lines, not 5); 10+ saturated colours without a documented order (keep a fixed palette set of 6).

## ACF mapping hints
- Global flexible `section_card` wrapper fields: bg colour token, corner mode (all|bottom), clip transition in/out.
- `hero_blob` (blob colour trio, h1, lede, split cta, 3D/render image, handwritten note).
- `book_rail` (query: month/tag; card shows genre chips from taxonomy with ACF colour + emoji).
- `sticker_benefits` (repeater: text, colour token, rotation). `promo_ribbons` (text, code, 2 colours).
- Woo/subscriptions: product ACF `extras` (content flags), `excerpt_taste`.
