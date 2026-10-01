---
case: case-70-ecommerce
descriptor: "Avant-garde EU womenswear label (glam-grunge fashion e-commerce)"
region: Europe (Ukraine / Germany)
site_type: ecommerce
industry: avant-garde womenswear
platform: WordPress (custom commerce theme)
libs_detected: [lenis, swiper, wordpress]   # GSAP not exposed as a global; pinning via .pin-spacer => ScrollTrigger bundled
direction_match: [couture-condensed, billboard-type, campaign-commerce]
captured: 2026-09-30
source: "award gallery scan 2026-09 (site of the day + e-commerce + developer awards)"
---
> A torn fashion zine pasted over a white studio wall: ultra-condensed black capitals, cut-out models, paint-brush buttons, one red pen.

## DNA summary
- Macrostructure: numbered editorial chapters on one long scroll ("02. NEW ARRIVALS", "03. CAMPAIGN", "04. CATEGORIES", "05. CATEGORIES", "07. [BRAND] FILM"). Chapter labels in red condensed caps 20px, always top-start.
- Hero archetype: H-01 variant with a split-portrait photo (one model, half colour half grey, seam = torn paper) + stacked 4-word slogan at top-end (glam-meets-grunge positioning) + a hand-set two-word outline/red collection title bottom-start (118px) and bracketed CTA `[ SEE COLLECTION ]`. Hero section is pinned (.pin-spacer).
- Nav: N10-style 3-column text header, no bar: stacked mono links top-start (MENU + / SHOP ALL / CATEGORIES +), wordmark centred (Thunder), stacked BAG.0 / SEARCH / FAVORITES.0 top-end. `mix-blend-mode: difference` (24 elements) so it survives photos. Header height 0 (all absolutely placed).
- Footer: giant cropped wordmark over torn-paper edge above a grey photo (FT-01 variant), small mono link columns.
- Home sections (DOM order): hero (pinned) -> New arrivals rail with "BEST SELLER" brush badges (E-06 rail) -> full-bleed dark campaign video band ("NEW (dresses)") with giant wordmark rising out of it -> category strips (vertical rotated labels NEW DROP / SALE / ACCESSORIES / BODYS / BOTTOMS with counts in brackets, F-11-like) -> 2 large category cards on torn-paper plates (DRESSES / CORSETS) -> manifesto split "SPACE (transformation)" / "FREEDOM (creative)" with a cut-out model and graffiti-red spray word -> short film teaser masked in a lips-shaped SVG (H-10 style mask) -> footer.

## Signature moves
- Torn-paper edges as the universal divider (hero seam, category plates, footer edge). One texture, used everywhere, instead of rules or radius.
- Brush-stroke black buttons (ADD TO BAG, ACCEPT COOKIES, badges) - the button IS a paint swipe with white caps on top.
- Giant parenthetical pairing: `SPACE (TRANSFORMATION)` - a 118px condensed word + a 20px bracketed modifier on the same baseline.
- Red used only for: chapter numbers, price, keyword highlights inside paragraphs, the first half of the hero title.

## Tokens observed
- Fonts: Thunder (condensed display, weights 100-900; used for display AND most UI caps), PP Fraktion Mono (nav, prices `411,00_€`, tracking -1.2 to -1.4px), Inter (11-12px uppercase micro labels). Free subs: Anton / Bebas Neue / "Big Shoulders Display" 800 for Thunder; Space Mono / JetBrains Mono for Fraktion. Hebrew: "Karantina" 700 or "Secular One" for condensed display; "IBM Plex Mono"+"Heebo" for mono/UI.
- Display: 118px / lh 0.8 (94.4px) / tracking 0 / uppercase / w800; H1 wordmark 80/64; category 64/51; PDP title 42/33.6. Chapter labels 20/20. Body copy is 11-13px uppercase (very small, fashion-typical).
- Palette: canvas #fff9f7 (warm off-white, section plates), #ffffff (product plates), ink #000000, accent red #ed3833 (text only), campaign bands #000000. Blend: difference on header.
- Radii: none (0). Shadows: none. Gaps 2-6px (tight product grids).
- Section paddings: 180px/180px, 220/160, 90/90 (PDP related). Container 1440 (full-bleed).

## Motion inventory
- Lenis smooth scroll; pinned hero + pinned footer wordmark (pin-spacer).
- Custom cursor (flag true), marquee flag true (chapter strips).
- Inferred from frames: wordmark rises and is cropped by the next section (scroll_03/04); category plates slide in with torn edges; lips-mask video scales on scroll ("TIP: SCROLL TO DIVE" = H-10 mask expand).
- 31 videos on home: campaign loops. 2 canvases on PDP (WebGL image effect).
- Not observed: preloader in captures (style note mentions % preloader).

## Layout notes
- 12-col full-bleed, no container; product rail starts at column 3 with the chapter label + "SEE ALL" in columns 1-2 (label-column pattern).
- Density rhythm: airy white plates (180px paddings) alternate with full-bleed black campaign bands; every third band is black.
- Category strips: 5 equal columns, label rotated -90deg reading bottom-up, count `[7]` bottom-end.

## Imagery
- Cut-out models on pure white or light grey seamless; half-and-half colour/greyscale split; campaign stills dark, teal-tiled, cinematic grade. Graffiti spray red word over photo.

## Page set observed
- PLP (all-products): header -> red bracket title `[ ALL PRODUCTS ]` + `[57 - ITEMS]` + SIZE / SORT BY brush-pill filters + grid-density toggle (3 icons) -> 4-up grid, 6px gap, portrait 3:4 on white, name + price in 12px caps under image (PC-02). Mid-page giant wordmark band interrupts the grid.
- PDP: PD-01 variant - left margin column with bracketed country/city tags as vertical tags, centre tall image stack, sticky buybox right: 42px title, red bracketed price, size pill (brush), colour as struck-through text, stock dot, brush ADD TO BAG full width, text link ADD TO FAVORITES, accordions "01. DETAILS / 02. CARE". Then "02. YOU MAY ALSO LIKE" 3-up and "03. RECENTLY VIEWED ITEMS" (SM-05).

## Mobile notes
- Hero photo full width, slogan dropped; wordmark 66.5px/53px. Rail becomes 1.2-up swipe; category strips become 2-up with rotated labels kept; manifesto sections stack text above cut-out.

## Steal / Don't steal
- Steal: one material divider (torn edge) used consistently; numbered chapter labels in accent; bracket CTAs `[ SEE ALL ]`; rotated category labels; PDP margin tags column; brush-texture primary button (any custom SVG texture) as the brand's single "hand" element.
- Don't steal: the 11px uppercase body (fails readability, never for Hebrew); cookie modal covering buybox; brand photography; the lips mask shape.

## ACF mapping hints
- `hero_split_portrait` (image, slogan lines repeater, title_a/title_b, cta, pin toggle).
- `chapter_rail` (chapter number, label, product relationship, badge rules) - reusable for New/Best/Related.
- `category_strips` (repeater: term, image, rotated label, count auto).
- `manifesto_cutout` (word, modifier, paragraph with highlighted words, cut-out PNG, spray word SVG).
- `mask_film` (SVG mask shape, video, tip text). Global option: divider style = torn | none.
