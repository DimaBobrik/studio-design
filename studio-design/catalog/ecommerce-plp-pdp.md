# E-commerce catalog (WooCommerce) · store rules, PLP, PDP

E-commerce catalog is split in two files: `ecommerce-plp-pdp.md` (§0 store-wide rules, §1 header, §2 PLP, §3 cards, §4 filters, §5 quick view/search, §6 PDP, §13 E-widgets) and `ecommerce-cart-account.md` (§7 cart/checkout/thank-you, §8 account, §9 states, §10 badges/prices, §11 trust, §12 schema).

**Quick index**
- §1. Header, announcement, mega menu: HD-01…HD-07 (7)
- §2. Product listing (PLP): grids: PL-01…PL-08 (8)
- §3. Product card physics (15): PC-01…PC-15 (15)
- §4. Filters, sorting, pagination: FL-01…PG-03 (9)
- §5. Quick view, search, wishlist, compare: QV-01…CP-01 (7)
- §6. Product page (PDP): PD-01…SM-10 (19)
- §13. Commerce widgets E-01…E-29 (single source of truth): E-01…E-29 (29)

Load for any store. Patterns are designed to be implemented as a WooCommerce theme: each row names the template file (`woocommerce/…` override in the theme) and/or hooks. Runtime modules: `cart` (fly-to-cart + drawer), `pdp` (stacked gallery / `data-cols="2"` mosaic, sticky buybox, mobile swipe gallery, sticky ATC bar, variant radios), `flip-grid` (grid/list switch + filter chips), `quickview`, `nav` (hide-on-scroll, overlay, mega-menu), `marquee`, `counter`, `accordion`, `before-after`. Params: `runtime/README.md` §4; Woo wiring: §5. Anything else in this file marked "recipe" has no module.

## 0. Store-wide rules

1. **Transactional pages are calm.** Cart, checkout and account pages ship `<html data-smooth="off">` (native scroll, no Lenis: form fields, autofill and payment iframes scroll natively); PDP too when the direction's motion budget ≤ 4 or it says so. PLP, PDP, cart, checkout, account: tier-0 backgrounds only, no pinned scroll, no marquee except the header announcement, no preloader, no page-transition longer than 250 ms. The signature moment lives on Home, collection landing, lookbook or About.
2. **Speed budget** (PDP/PLP on 4G mid phone): LCP <= 2.5 s, CLS <= 0.05, INP <= 200 ms, JS <= 150 KB gz before GSAP. Product images: AVIF/WebP via `wp_get_attachment_image` with `sizes`; first PLP row + PDP first image `fetchpriority="high"`, never lazy.
3. **Honest commerce.** No fake countdowns, fake "x people viewing", fake "only 2 left", fake review counts, fake "secure" seals. Stock and urgency only from real data (`$product->get_stock_quantity()`, real sale end date `date_on_sale_to`). Trust = policies, real reviews, real payment options.
4. **Prices** always through `wc_price()` / `get_price_html()`; never hand-format. ILS: currency position `right_space` for he-IL (`290 ₪`), `left` for en (`₪290`); thousands `,`, decimals `.`; hide `.00` via `woocommerce_price_trim_zeros` filter when the catalogue has no agorot. Show "כולל מע״מ" (incl. VAT) near totals. Installments line ("עד 12 תשלומים") only if the gateway offers it.
5. **RTL**: drawers open from inline-end (left in RTL), fly-to-cart arc targets the cart icon wherever it is (read its rect, do not assume a side), sliders swipe direction flips, `<del>` price sits inline-start of `<ins>` automatically with logical flow, arrows mirror, star ratings do NOT mirror (fill from inline-start is fine).
6. **Israeli legal musts**: cancellation policy page (per Consumer Protection Law, "מדיניות ביטולים"), accessibility statement (IS 5568), business details (name, ח.פ./עוסק number, address, phone) in footer or contact, terms, privacy. Marketing consent checkbox unchecked by default.
7. **Classic templates vs blocks.** For full design control use classic shortcode pages (`[woocommerce_cart]`, `[woocommerce_checkout]`, `[woocommerce_my_account]`) + template overrides. If the site uses Cart/Checkout Blocks (default on new installs since WC 8.3), style via block CSS and extend with the Store API; note it in the plan. Never mix both on one site.
8. Every add-to-cart path must be AJAX with a visible confirmation (drawer opens or toast + badge bump) and an `aria-live="polite"` announcement.
9. **Sample catalogue, honestly marked.** When the brief gives one product (or none), build the PLP/PDP with a sample set: names `[Sample] <plausible generic name>`, prices `₪[TODO]` or a number with a visible `sample price` chip, stock/reviews/ratings omitted (never invented), images as labelled slots. The real product(s) from the brief stay unmarked. List samples in `pages.md`; see `pages/_shared.md` §5.4.
10. **Real catalogue first.** When the client already has a store, pull the real catalogue with `scripts/extract-catalog.mjs <store-url>` (Woo Store API, Shopify, or JSON-LD crawl) into `data/catalog.json` and build PLP/PDP from it; sample items only fill gaps.
11. **Palette-fixed client.** When the brief fixes the palette (brand colours, "keep our colours"), the palette is not a variety lever: map the client colours onto the token roles (canvas/surface/ink/accent/focus), check AA for ink/muted/accent-ink, and move the distinctiveness to type, card physics, layout, radius and motion (`directions/_index.md` step 2). Metallic brand colours (gold, silver) become fills and rules with ink text on them, never small text on canvas. Client photos on white inside a dark direction → PC-15.
12. **Precedence** for every row here: the brief's words > the direction's signature moves > these catalog defaults > general rules.

## 1. Header, announcement, mega menu

| id | name | looks like | use when | module / recipe | WooCommerce mapping |
|---|---|---|---|---|---|
| HD-01 | Announcement bar | 32-40px bar: 1-3 messages, vertical ticker or static, dismiss | Real promos: free-shipping threshold, holiday cut-off | `text-fx` `data-mode="rotate" data-effect="slide"` ticker or `marquee` (counts as the page marquee on Home) + pause button; dismiss stored in `localStorage` (try/catch) | `header.php`; content from Options page repeater; free-shipping amount read from the shipping zone method `min_amount` |
| HD-02 | Retracting commerce nav (N13) | Bar + nav; bar retracts on scroll, nav stays compact 56-64px | Default store header | `nav` `data-variant="bar" data-hide="false" data-offset="80"` (bar retract = recipe: announcement bar outside the fixed header scrolls away; compact height via `.is-scrolled` CSS) | `wp_nav_menu('primary')`; icons: search, account (`wc_get_page_permalink('myaccount')`), wishlist, cart count (fragment) |
| HD-03 | Centred wordmark luxury | Logo centred; menu inline-start; search/acct/cart inline-end; thin | Jewelry, fashion, luxury | CSS grid `1fr auto 1fr` | same |
| HD-04 | Mega menu (N12) | Panel: 3-5 link columns + featured collection/product card | > 12 categories | `nav` with `.sd-mega` items; hover intent 120/260 ms; click on touch; Esc closes | Menu items with ACF fields (column heading, image, featured product id); categories via `product_cat` menu items |
| HD-05 | Department card nav (NV-CN) | Header expands into 3 coloured cards | 3-5 departments, playful | recipe in sections-hero-nav.md (NV-CN) | `product_cat` top level |
| HD-06 | Mobile bottom tab bar | Fixed 56px: Home, Shop, Search, Wishlist, Cart | Large catalogues on mobile | CSS fixed + `env(safe-area-inset-bottom)`; hidden on checkout | `footer.php`, conditional `!is_checkout()` |
| HD-07 | Cart icon + live count | Bag icon with count bubble; bumps on add | Always | `cart` module badge `[data-cart-count]`; count via fragment `span.cart-count` | `woocommerce_add_to_cart_fragments` filter returns updated count HTML |

## 2. Product listing (PLP): grids

| id | name | looks like | use when | module / recipe | WooCommerce mapping |
|---|---|---|---|---|---|
| PL-01 | Standard grid 2/3/4-up | Uniform grid, gap 16-32px, 2-up mobile | Default | CSS grid `repeat(var(--cols), minmax(0,1fr))`; `--cols` from ACF/customizer | `archive-product.php`; `woocommerce_product_loop_start/end`; `loop_shop_columns` filter; `loop_shop_per_page` |
| PL-02 | Column switcher + list view | 2/3/4/list toggle, cards morph | Big catalogues, B2B | `flip-grid` (view radio group `value="2|3|4|list"`, `data-remember`) | Toggle rendered on `woocommerce_before_shop_loop` (priority 25, between count and ordering) |
| PL-03 | Editorial asymmetric grid | Products mixed with lifestyle tiles and a pull quote; irregular spans | Premium fashion, jewelry, lookbook brands | CSS grid `grid-auto-flow:dense`, span classes from ACF per product (`span_cols`, `span_rows`) and injected editorial tiles every n items | In the loop: `woocommerce_shop_loop` action, inject editorial tile when `wc_get_loop_prop('loop') % n === 0`; editorial tiles from category ACF repeater |
| PL-04 | Photo-is-the-card grid | 0 gap or 1px gap, edge-to-edge images, text small below | Campaign commerce, industrial catalogue | `gap:1px` over `--c-rule` background for hairlines | `content-product.php` override |
| PL-05 | Category landing | Hero banner + subcategory tiles (bento) + featured rail, then grid | Top-level categories with children | `bento` for subcats; E-06 rail | `archive-product.php` branch on `woocommerce_get_loop_display_mode()`; subcats via `woocommerce_output_product_categories()` or custom `get_terms('product_cat',['parent'=>$id])`; category ACF: hero image, intro |
| PL-06 | Draggable collection canvas | Whole small collection on a 2D draggable plane | Drops of <= 30 products, design-led | H-16 recipe; list view link mandatory | Custom page template querying `wc_get_products()` |
| PL-07 | Collection with story header | Split header: collection name giant + short story + image; grid below | Seasonal collections | `split-reveal` + `clip-reveal` in header only | `woocommerce_archive_description` hook (term description + ACF) |
| PL-08 | Editorial pair interleave (2026-10, world-agency scan) | Product rows broken every 8-12 items by a full-bleed 2-up editorial pair (two portrait campaign photos edge to edge, a 1-line caption + link each) | Fashion and design stores with real campaign photography (seen on 3 fashion stores built by a top commerce studio and others) | CSS grid item spanning all columns (`grid-column: 1 / -1`) inserted by position; images `loading=lazy`, 4:5 | `woocommerce_shop_loop` + a counter in `content-product.php` (or a block pattern between Product Collection blocks); ACF repeater on the term: image pair + link + after-item index |

## 3. Product card physics (15)

Pick one card per site (card physics is a variety lever). All: whole card link on image + title; ATC as a separate button; image ratio fixed via `aspect-ratio` to avoid CLS; second image loaded `loading=lazy`; badges top-inline-start.

| id | name | looks like | fits directions | recipe | Woo hook placement |
|---|---|---|---|---|---|
| PC-01 | Hairline flat | 1px `--c-rule` border, 0 radius, name + price in a row | Swiss, industrial, utilitarian | border on card, `gap:0` grid with shared borders | default hooks, title+price wrapped in a flex row |
| PC-02 | Photo is the card | 0 radius, 0 padding, 0 shadow, image on grey swatch `--c-surface-2`, text below 12-14px | Campaign commerce, fashion | no chrome at all | remove `woocommerce_template_loop_add_to_cart` from after_shop_loop_item; add quick-add on hover |
| PC-03 | Hover swap + quick-add bar | 2nd image crossfades; size/ATC bar slides up from bottom | Fashion, home (E-01) | opacity 250 ms; bar `translateY(100%)->0` 300 ms `--ease-out`; mobile: always-visible "+" | second image from `$product->get_gallery_image_ids()[0]` on `woocommerce_before_shop_loop_item_title` |
| PC-04 | Swatch preview | colour dots under card; hover/focus swaps image | Fashion, furniture (E-02) | swatches are `<button aria-label="Black">`, `data-img`, preload on pointerenter | variation attributes via `$product->get_variation_attributes()`; image per term (ACF on `pa_color` term or variation image) |
| PC-05 | Index caption | number + name + price in mono under image: `005 Bench  4,200 ₪` (two-space gap, no dash) | Gallery/index minimal, catalogue raisonné | mono `--f-mono` 12px, tabular-nums | numbering from `menu_order` or ACF `catalogue_no` (only when real) |
| PC-06 | Hard offset block | 2px ink border, `box-shadow: 6px 6px 0 var(--c-ink)` grows to 10px on hover, press sinks | Neo-brutal, arcade, sticker | transform `translate(-2px,-2px)` + shadow on hover, `translate(4px,4px)` + shadow 2px on active | default |
| PC-07 | Double-bezel soft | outer shell ring 1.5px `oklch(0% 0 0 / .05)`, radius 2rem; inner radius `calc(2rem - .375rem)`; inset highlight | Soft structuralism, consumer tech | two nested boxes; ambient shadow `--shadow-2` | default |
| PC-08 | Tilt + glare | card tilts toward pointer <= 8deg, specular glare | Collectibles, trading cards, premium gadgets | `widgets` C-17 + C-18 (pointer:fine only) | default |
| PC-09 | Video on hover | muted clip plays on hover/focus, poster = product image | Apparel in motion, beauty textures | IO + `play()` on pointerenter/focus; `preload="none"` | ACF `loop_video` on product |
| PC-10 | Image-only + reveal | image only; name/price slide in over a scrim on hover; always visible on touch | Minimal luxury, art prints | overlay `clip-path: inset(100% 0 0 0) -> inset(0)` | title/price moved inside image wrapper via hook priority |
| PC-11 | Horizontal list card | image 120px inline-start, name + SKU + short spec + qty stepper + ATC inline-end | B2B, spare parts, groceries | grid `120px 1fr auto` | list-view template part `content-product-list.php` |
| PC-12 | Tinted sticker card | pastel tint per product (ACF colour token), rotated badge sticker, rounded 24px | Sticker pop, DTC snacks, kids | `--card-tint` from ACF select of palette tokens (never free hex) | ACF `card_tint` |
| PC-13 | Darkroom plinth | product cut-out on warm dark, spotlight radial, cream text | Darkroom product, spirits, watches | `.bg-glow` inside card, PNG/WebP with alpha | requires cut-out images; fallback PC-02 |
| PC-14 | Spec card | image + 3 key specs as rows + price + compare checkbox | Electronics, tools, security/power gear | spec rows from attributes; compare checkbox = real `<input>` | `$product->get_attributes()` filtered by ACF "key specs" list |
| PC-15 | Inspection plate | client photos shot on white sit on a light "inspection plate" inside a dark direction: a quiet tray with radius, the product reads as lifted onto a lit table; name/price stay on the dark card below | Dark control room, darkroom, industrial, any dark direction fed white-background supplier/client photos | plate `background: var(--c-plate, oklch(97% 0.004 90))` (tune it to the photo white; sample the photo corner with `SD.toRGB` in QA or eyedrop), `border-radius: var(--r-md)`, `padding: var(--sp-4)`, `aspect-ratio` fixed, `img { mix-blend-mode: multiply; object-fit: contain }` so off-white JPEG backgrounds melt into the plate (not for photos with real shadows or dark products on dark: then skip multiply and match the plate to the photo white); optional 1px `--c-rule` inset ring; never invert or filter the photo | default; image from `woocommerce_template_loop_product_thumbnail`, wrapper `<div class="plate">` via `woocommerce_before_shop_loop_item_title` priority 9/11 |

## 4. Filters, sorting, pagination

| id | name | looks like | use when | module / recipe | Woo mapping |
|---|---|---|---|---|---|
| FL-01 | Sticky sidebar filters | sticky panel inline-start; results reflow with Flip; count `aria-live` | Mid/large catalogues desktop | `flip-grid` + `el.sdFlipSwap(fn)` for AJAX (fetch page with params, swap items inside `fn`; Flip state is captured before) | `woocommerce_sidebar` / `sidebar-shop`; filters via WC Product Filters block or custom `pa_*` + price query args; URL params kept (shareable, SEO canonical) |
| FL-02 | Top chips + drawer | horizontal chips (category, size, colour, price) + "All filters" `<dialog>` from inline-end; active filters as removable pills | Mobile-first | `flip-grid` + `<dialog>` | same query args |
| FL-03 | Dual-thumb price range | two overlaid ranges, fill between, live min/max | Price filtering | E-11 (§13) | `min_price`/`max_price` query args (native WC) |
| FL-04 | Swatch filters | colour circles with names, sizes as pills, counts in brackets | Fashion | radios/checkboxes styled | `filter_pa_color=` args (layered nav) |
| SO-01 | Sort select | native `<select>` styled, or segmented pills for 3-4 options | Always | native | `woocommerce_catalog_ordering` (priority 30 on before_shop_loop); `loop/orderby.php` |
| SO-02 | Result count | "Showing 24 of 132" | Always | — | `woocommerce_result_count` (priority 20); `loop/result-count.php` |
| PG-01 | Numbered pagination | prev/next + numbers, current `aria-current="page"` | SEO-heavy catalogues (default) | — | `woocommerce_pagination` on `woocommerce_after_shop_loop`; `loop/pagination.php` |
| PG-02 | Load more button | "Load more (24 of 132)" with progress bar | Browsing catalogues | fetch next page URL, append, `ScrollTrigger.refresh()`; update URL with `history.replaceState` | keep real paginated URLs for crawlers (button is an `<a href="/page/2/">` enhanced) |
| PG-03 | Infinite scroll | auto-load near end | Lookbook-like browsing only; never with a footer users need | IO sentinel + same as PG-02; stop after 3 auto loads then show button | same |

## 5. Quick view, search, wishlist, compare

| id | name | looks like | use when | module / recipe | Woo mapping |
|---|---|---|---|---|---|
| QV-01 | Quick view morph | card image Flip-morphs into a `<dialog>` with gallery, variants, ATC | Large catalogues | `quickview` (trigger `data-id/title/price/text/img/url`; for variable products fetch on `sd:qv:open` — no `data-endpoint` param) | AJAX endpoint (`wc-ajax=sd_quickview` via `wc_ajax_` action) rendering `woocommerce_template_single_title/price/add_to_cart`; enqueue `wc-add-to-cart-variation` for variable products |
| QV-02 | Quick add sheet (mobile) | bottom sheet with size pills + ATC | Mobile PLP | `<dialog>` bottom sheet, swipe-down to close | same endpoint |
| SR-01 | Predictive search overlay | full-screen: input, recent, popular categories, instant product thumbs | Catalogues > 50 products | Recipe, no module (`nav` has no search mode): `<dialog>` overlay; debounce 200 ms; combobox ARIA | Store API `GET /wp-json/wc/store/v1/products?search=q&per_page=6`; results page = `search.php` with `post_type=product` |
| SR-02 | Search results page | query echo, tabs (Products / Articles), PLP grid, zero-result state with suggestions | Always | reuse PL-01 + PC | `woocommerce/product-searchform.php`; `is_search()` + `post_type=product` renders `archive-product.php` |
| WL-01 | Wishlist heart | heart toggle on card and PDP; count in header | Fashion, jewelry, gifts | toggle `aria-pressed`; guests: `localStorage` list (try/catch) synced to user meta on login | plugin (TI WooCommerce Wishlist / YITH) or custom `user_meta` + REST route; page `page-wishlist.php` |
| WL-02 | Wishlist page | grid with "move to cart", share link, empty state | With WL-01 | PC + actions | custom template |
| CP-01 | Compare bar + table | sticky bottom tray with 2-4 selected thumbs -> compare page table (sticky first column) | Electronics, tools, appliances | real `<table>`, `scope`; highlight differences toggle | plugin or custom; attributes from `get_attributes()` |

## 6. Product page (PDP)

### Gallery layouts (8)

| id | name | wireframe | use when | module / recipe |
|---|---|---|---|---|
| PD-01 | Stacked + sticky buy box (E-13) | `[IMG / IMG / IMG / VID | ^buybox]` 1.4fr/1fr | Fashion, jewelry, premium DTC (default premium) | `pdp` (default stacked layout) |
| PD-02 | Thumb rail + main (E-14) | `[thumbs ^ | main IMG crossfade] | buybox` | Electronics, general retail | Recipe, no module layout (`pdp` has no rail layout): thumbs as variant-like radios + crossfade; reuse `pdp` sticky bar |
| PD-03 | 2-col mosaic | `[IMG IMG / IMG-wide / IMG IMG] | ^buybox` | Apparel with many angles | `pdp` with `.sd-pdp__slides[data-cols="2"]` (1 + 2 + 2 mosaic) |
| PD-04 | Full-width slider | `[<- IMG full width ->] / buybox below in 2 cols` | Furniture, large objects, lifestyle | `pdp` mobile swipe gallery (scroll-snap + dots + counter, ≤860px) or recipe slider on desktop + E-17 progress |
| PD-05 | Horizontal gallery track | `^track[IMG][IMG][IMG] <>` then buybox | Editorial single-product stores | `hscroll` inside PDP (desktop only; mobile swipe) |
| PD-06 | 360 / frame spin | `[drag-to-rotate product] | buybox` | Shoes, bags, watches with shoot | Box products (devices, appliances, packaging): `device` `data-drag="true"` (+ `data-view="elevation"` for the dimensions block). Turned products (ceramics, glass, candles, bottles): `lathe` `data-drag="true"` (code-built, no photo shoot; label it "rendered study" until real photos exist). Photographed objects: recipe E-18 drag spin (§13) |
| PD-07 | Editorial long-scroll | `[IMG] [story txt] [IMG pair] [detail macro]` interleaved, sticky buybox | Storytelling DTC, single hero product | PD-01 + text blocks from ACF |
| PD-08 | Mobile swipe gallery (E-17) | full-width swipe, progress bar or dots, tap = lightbox | All PDPs < 768px | scroll-snap + IO; lightbox PhotoSwipe (MIT) or `<dialog>` with pinch |

Zoom: E-15 hover lens (desktop, jewelry/textiles) or click-to-lightbox (E-16) always. WooCommerce: `woocommerce_before_single_product_summary` -> `woocommerce_show_product_images` (priority 20) override `single-product/product-image.php` + `product-thumbnails.php`; disable default flexslider/zoom/photoswipe via `remove_theme_support('wc-product-gallery-slider')` etc. when `pdp` handles it. Variation images: listen to jQuery `found_variation` on `form.variations_form` and swap/Flip the gallery.

### Buy box anatomy (default order; skip what does not apply)

Precedence: brief words > the direction's signature moves > this default order > general rules. A direction's signature may move ONE block (e.g. story/ingredients above variants, delivery promise above the ATC); state the move in the plan. Everything else keeps this order (it matches shopper scanning and Woo hook priorities).

| # | element | spec | Woo source |
|---|---|---|---|
| 1 | Breadcrumb (small) | above title; `BreadcrumbList` schema | `woocommerce_breadcrumb()` |
| 2 | Title H1 | display or body-large per direction; <= 2 lines | `woocommerce_template_single_title` (5) |
| 3 | Rating summary | "4.7 (38 reviews)" link to reviews; hide if 0 reviews | `woocommerce_template_single_rating` (10) |
| 4 | Price | sale: `<del>` muted + `<ins>` + % badge optional; VAT note; installments line if real | `woocommerce_template_single_price` (10) |
| 5 | Short description | <= 40 words | `woocommerce_template_single_excerpt` (20) |
| 6 | Variant selectors | colour swatches (radio, name label), size pills, out-of-stock crossed + disabled + "notify me" | `woocommerce_template_single_add_to_cart` (30) -> `single-product/add-to-cart/variable.php`; `pdp` variant radios (`.sd-pdp__swatch`, `.sd-pdp__pill`; `data-slide/-price/-id/-img`) replace `<select>` visually but keep it in DOM |
| 7 | Size guide link | opens `<dialog>` (SM-02) | `woocommerce_before_add_to_cart_button` |
| 8 | Qty + ATC + Buy now | ATC full width on mobile; one primary; wishlist icon button beside | `woocommerce_after_add_to_cart_button` for extras |
| 9 | Delivery promise | real estimate ("Ships in 1-2 business days", "Free over 300 ₪") | `woocommerce_after_add_to_cart_form` |
| 10 | Trust row | returns days, warranty, payment icons (real ones) | same |
| 11 | Accordions | Details, Materials & care, Shipping & returns, Specs | `woocommerce_after_single_product_summary` -> replace `woocommerce_output_product_data_tabs` (10) with `accordion` |
| 12 | SKU/meta | small, bottom | `woocommerce_template_single_meta` (40) |

### Selling modules

| id | name | spec | Woo mapping |
|---|---|---|---|
| SA-01 | Sticky ATC bar (E-19) | slides in when main ATC leaves viewport: thumb, name, selected variant, price, ATC; mobile bottom, desktop top or bottom | `pdp` `data-bar="true"` + `.sd-pdp__bar` (`[data-pdp-bar-atc]` forwards to the main ATC); ATC proxies the real form (`form.cart` submit), never a second form |
| SM-01 | Bundle / frequently bought together | 2-3 items with checkboxes, combined price, one ATC | Linked products (`get_upsell_ids()` or ACF relationship) + AJAX multiple add; or WooCommerce Product Bundles |
| SM-02 | Size guide dialog | table with cm/in toggle, how-to-measure image | ACF on `product_cat` (guide per category) |
| SM-03 | Reviews block (S-08) | average, distribution bars, photos, filter by stars, verified badge | `comments_template()` -> `single-product-reviews.php`; `Product` + `AggregateRating` schema only when reviews exist |
| SM-04 | Complete the look / cross-sell rail | E-06 rail of 4-8 cards | `woocommerce_upsell_display` (15) / `woocommerce_output_related_products` (20); tune via `woocommerce_output_related_products_args` |
| SM-05 | Recently viewed | rail; stored ids in `localStorage` (try/catch) or `woocommerce_recently_viewed` cookie | custom rail |
| SM-06 | Back-in-stock / waitlist | email field on OOS variant | plugin or custom meta; honest copy |
| SM-07 | Pre-order / release date | date + note, ATC label "Pre-order" | ACF date + `woocommerce_product_single_add_to_cart_text` filter |
| SM-08 | Product story / ingredients | image + text blocks, before-after for beauty/cleaning | ACF flexible on product (reuse sections catalog, calm variants) |
| SM-09 | Product video | poster + play -> inline or dialog, captions | ACF file/oEmbed |
| SM-10 | Shop-the-look hotspots (E-08) | lifestyle image with labelled hotspot buttons -> popover mini card with ATC | ACF image + repeater (x%, y%, product) |

## 13. Commerce widgets E-01…E-27 (single source of truth)

`E-xx` ids are the commerce widgets from the maintainers' original research catalogue (not included); other files cite them. Each maps to the pattern row that specifies it (build from that row) and to a module or recipe.

| id | widget | spec row | module / recipe | a11y / RTL |
|---|---|---|---|---|
| E-01 | Hover image swap + quick-add | PC-03 | recipe: two stacked `<img>`, opacity 250 ms; quick-add bar `translateY(100%)->0` | quick-add has a text label; mobile shows a "+" button |
| E-02 | Swatch-preview card | PC-04 | recipe: `button[data-img]` per swatch, preload on pointerenter | swatches are buttons with colour names |
| E-03 | Editorial asymmetric grid | PL-03 | recipe: CSS grid `grid-auto-flow: dense`, span per item from ACF | DOM order = reading order |
| E-04 | Grid/list density switch | PL-02 | `flip-grid` (view radios) | radio group |
| E-05 | Draggable product canvas | Home optional / small collections | recipe: H-16 infinite drag canvas technique (Draggable + Inertia, `gsap.utils.wrap`); always offer a list view link | keyboard: the list view is the accessible path; `SD.dir()` on drag |
| E-06 | Snap product rail with progress | SM-04, Home rails | recipe: `scroll-snap-type: x mandatory`, arrows `scrollBy({left: w*SD.dir()})`, progress from `Math.abs(scrollLeft)` (RTL scrollLeft is negative) | native scroll; arrows are buttons |
| E-07 | Bento category grid | PL-05 / Home category entry | `bento` (`data-layout="feature|mosaic"`, tile `data-size`), one tile per real category, image + name + count | tiles are links; no text-only filler tiles |
| E-08 | Shop-the-look hotspots | SM-10 | recipe: % positioned `<button>`s (ACF x/y) + Popover API mini card with ATC | buttons labelled with product names |
| E-09 | Sticky sidebar filters + Flip results | FL-01 | `flip-grid` + `el.sdFlipSwap(fn)` | result count `aria-live` |
| E-10 | Chip filter bar + drawer | FL-02 | `flip-grid` chips + `<dialog>` from inline-end | focus trap via `<dialog>` |
| E-11 | Dual-thumb price range | FL-03 | recipe: two overlaid `<input type=range>`, fill via `--min/--max`, `inset-inline-start` | native inputs; values in `<output>` |
| E-12 | Predictive search overlay | SR-01 | recipe: `<dialog>` + debounced Store API fetch | combobox ARIA |
| E-13 | Stacked gallery + sticky buy box | PD-01 | `pdp` | first image never lazy |
| E-14 | Thumb rail + main image | PD-02 | recipe | thumbs are `aria-current` buttons |
| E-15 | Hover zoom lens | §6 Zoom | recipe: lens div `background-size: 250%`, position from pointer | desktop only; lightbox on touch |
| E-16 | Lightbox with pinch | §6 Zoom | recipe: PhotoSwipe 5 (MIT) or `<dialog>` + pointer events | arrows, Esc, focus return; swipe flips in RTL |
| E-17 | Mobile swipe gallery + dots | PD-08 | `pdp` (≤860px swipe, dots, counter) | dots labelled "Image n of N" |
| E-18 | 360 / frame spin | PD-06 | turned objects: `lathe` module; photographed frames: recipe: canvas frames 36-72, Draggable proxy `frame = wrap(0, n, x/10*SD.dir())`, Inertia | arrow keys step frames; `aria-label="Rotate product"` |
| E-19 | Sticky ATC bar | SA-01 | `pdp` `data-bar` | one tab stop; doesn't cover content |
| E-20 | Variant selectors | buy box #6 | `pdp` variant radios | radio groups; OOS `disabled` + strike |
| E-21 | Details accordions + size guide | buy box #7, #11 | `accordion` + `<dialog>` | native `<details>` |
| E-22 | Fly-to-cart + badge bump | CT-02 | `cart` | `aria-live` "added"; reduced motion: badge only |
| E-23 | Cart drawer | CT-01 | `cart` | focus trap; opens from inline-end |
| E-24 | Mini-cart dropdown + meter | CT-03 | recipe: Popover API + `<progress>` | meter labelled |
| E-25 | Quick view morph | QV-01 | `quickview` | Esc/close; focus return |
| E-26 | Checkout stepper | CO-02 | recipe: `<ol>` stepper, `aria-current="step"` | error summary on top |
| E-27 | Order confirmation | TY-01 | recipe: DrawSVG check; confetti only in playful directions | reduced motion: no confetti |
| E-28 | Shop-by-attribute tiles (2026-10) | Home / category entry | recipe: 4-6 flat colour tiles each naming an attribute value in condensed caps (RETINOL, VITAMIN C; OAK, WALNUT; GRAPHITE, CHALK) over a product cut-out; links to the filtered PLP (seen on a skincare store and a home-air brand, both by top commerce studios) | real links (`/shop/?filter_ingredient=retinol` = WooCommerce attribute `pa_ingredient`); text in HTML, never baked into the image; Hebrew: no caps, keep the tile |
| E-29 | Line-up chooser (2026-10) | Home / category end | recipe: "Which one is right for you?" row of 3-5 product silhouettes on one baseline at true relative size, name + 2 key specs + price under each, one "Compare" link to CP-01 (seen on a consumer-audio brand by a top commerce studio) | `<ul>` of product links; specs as `<dl>`; true-scale images from one shoot; WooCommerce: a product tag `lineup` + `wc_get_products()` |
