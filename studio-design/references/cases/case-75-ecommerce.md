---
case: case-75-ecommerce
descriptor: "Swedish design-object synthesizer & audio hardware maker (catalogue + product stories, separate store)"
region: Europe (Sweden)
site_type: ecommerce (catalogue + product storytelling, store separated)
industry: synthesizers, audio hardware, design objects
platform: custom (CSS modules)
libs_detected: []   # no GSAP/Lenis/Swiper; plain scroll, image carousels
direction_match: [industrial-catalogue, swiss-signal-grid, index-mono-gallery]
captured: 2026-09-30
source: "award gallery scan 2026-09 (design-object brand benchmark)"
---
> A factory parts catalogue under even studio light: pictogram drawers across the top, every object lit on black or placed in a 1px white cell, whispering lowercase labels.

## DNA summary
- Macrostructure (home): alternating full-bleed "product moment" bands (object on black, cinematic lighting, tiny lowercase caption bottom-start: a cryptic status line or a product code) and 3-up product cell rows (object on #f6f8f7, name + "buy now" blue link top-start). No headings - captions and product names only. Ends with a dark "explore all products" band.
- Hero archetype: bespoke comic/illustration poster (a firmware-update campaign: heavy black caps title, a desk-calendar sticker, line-art comic of a man buried in paper stacks) - changes per campaign; PDP heroes use archival photo + outline mega title.
- Nav: pictogram tile nav (signature): 5 drawers across the top - 2-line wordmark, then [pinwheel icon | products: instruments, audio, designs], [bag icon | store: visit store, cart & checkout, deals], [square | latest: newsletter, social, now], [pictogram cluster | finder: guides & downloads, support, search], a block of tiny Japanese text, and the logo mark. Each item = big icon + 16px label + 3 tiny sub-links. Inverts to black on store/PDP.
- Footer: 1-line dark bar: region select "united states ⌄" start, links (newsletter, retailers, store, terms, press, contact, returns), ©2026 end (Ft2).

## Signature moves
- Pictogram menu: navigation drawn as a row of icon+label+sublinks tiles - the header is a product spec sheet.
- Two lighting worlds: storytelling on black with dramatic single-source light vs commerce on flat #f5f5f5 cells with even light. The switch tells you whether you're being sold a mood or a SKU.
- Lowercase everywhere, weights 100-300 for UI; loud type only inside product artwork (outline model-name title, orange katakana).

## Tokens observed
- Fonts: a proprietary house grotesk in two cuts (weights 100/300/700), TechnoType (PDP story display 26-53px). Free subs: "Inter" 200-300 / "Manrope" 200 for the house grotesk; "Space Grotesk" for display; techno display "Chakra Petch" or "Orbitron" (sparingly). Hebrew: "Heebo" 200/300, "Assistant" 200; techno labels "IBM Plex Sans Hebrew".
- Scale (1440): tiny and flat - 13.2 / 16 / 19.1 / 26.4 / 39.7 / 52.9px (1.2 ratio from 13.2); nav label 16px w100; product names 13-19px; PDP title 39.7/1.1 w300.
- Palette: canvas #f6f8f7 (home cells), #f5f5f5 (store cells), ink #0f0e12 / #000000, link blue #0071bb ("buy now"), light greys #e5e5e5 / #b2b2b2 / #abb5ba, signal orange #ff5000 (PDP only: badges, banners), story bands black #000.
- Radii: 0 on home; store: 9999px chips; PDP story: 22px/4.4px (UI illustrations). Shadows none. Gaps 7.3px (cells), 14.7px / 22px.

## Motion inventory
- Minimal: image carousels on PDP (dots, arrows), marquee price strip on PDP story (model name + "only $[price] buy now!" repeating under the hero), video loops (feature tiles with play arrows). No smooth scroll.

## Layout notes
- Home cell rows: 3 equal columns, 1px white gutters, cell ~480x600, object centred at ~60% width, label top-start 13px + blue "buy now" under it.
- Store PLP: category text filter row (~11 lowercase product-family and accessory terms) + "131 products" end; 2-up large cells (~640px) with name + price bottom-start and "+" quick add end (PC-01/PC-02 mix).

## Imagery
- Studio product shots (top-down or 3/4) with consistent light, dramatic dark-room hero shots, comic line illustration, archival sports photography for campaign.

## Page set observed
- Product story PDP (a sampler/drum machine): full-bleed archival boxing photo + white outline model name + orange katakana + caps spec line (memory size + "sampler composer"); marquee price strip; product on grey; orange tag headings (sports-slogan phrases as black label bars), a 3-step "① VERB ▸ ② VERB ▸ ③ VERB" video row, macro detail shots, "update now" arrow badge with firmware version.
- Store PDP: split - carousel start (dots) / buybox end: 39.7px title, price, shipping origin line, black full-width "add to cart", description, footnote, bullet specs; then "accessories" 4-up and "related" 4-up rows with "add to cart" links.
- Store PLP: text filters + 2-up cells.

## Mobile notes
- Page height drops to 2,993px (many story bands hidden); nav tiles collapse; cells 1-up.

## Steal / Don't steal
- Steal: separate "story" and "store" PDPs for hero products; pictogram tile nav for catalogue brands; lowercase light UI + product as the only rich object; text-link category filters with count; spec bullets straight after description.
- Don't steal: proprietary type voice + comic art; hidden-on-mobile story bands (keep essentials).

## ACF mapping hints
- `pictogram_nav` (options: items repeater: icon SVG, label, sublinks repeater).
- `moment_band` (image/video on black, caption) and `cell_row` (product relationship x3, link label).
- Product ACF: `story_page` (link to story), `label_bars` repeater (text, colour token), `steps_video` repeater.
- PLP: filter row from product_cat terms with counts.
