# E-commerce page set (WooCommerce)

Read `pages/_shared.md` first, then `catalog/ecommerce-plp-pdp.md` + `catalog/ecommerce-cart-account.md` for component ids. Ids here: `EC-xx`. Core = always build; extended = on request. Home and collection landing carry the signature moments; everything transactional is calm (motion budget <= 2 regardless of direction).

Page map (core in bold): **Home** · **Shop (all products)** · **Category/PLP** · Collection landing · Sale / New / Bestsellers · Brands index + brand · **PDP** · **Search results** · **Cart page + drawer** · **Checkout** · **Thank-you** · **Account: login/register, dashboard, orders, view order, addresses, details** · **Wishlist** · Compare · Track order · Gift card · Lookbook · **About** · **Contact** · **FAQ** · **Shipping & returns** · Size guide · Store locator · **Blog index** · **Blog post** · **404** · **Legal set** · Coming soon/password.

---

### EC-01 Home  [core]
Purpose: route visitors into categories/hero products and express the brand in the first viewport. Primary CTA: shop the main collection.
Sections (default order, adapt by niche):
1. HD-01 announcement (only real promo) + header archetype
2. Hero (pick by direction): H-14 product-on-colour (single hero product), H-25 dual split (2 collections), H-15 shaped slideshow (fashion/hotel-like), H-22 film-title band (campaign), H-24 object on plinth (luxury), H-04 tilted rows (big catalogue), H-21 inline-image type (lifestyle)
3. Category entry: E-07 bento categories or F-11 accordion strips (<= 6 categories)
4. Featured rail: E-06 "New in" / bestsellers (real `total_sales`)
5. Brand story or signature moment (SIG): G-01 horizontal lookbook, SM-10/G-09 shop-the-look hotspots, F-05 stack of collections, or S-06 scroll-lit statement
6. Proof: S-08 rating summary (real) or S-11 press, or S-05 review cards
7. Value props: 3-4 honest promises (TR-01..03) as a `list`-family row, not icon cards
8. Journal teaser (G-08, 2-3 posts) [optional]
9. NL-01 newsletter (if not in footer) + FT-04 footer
Optional: E-05 draggable collection, C-35 before/after (beauty/cleaning), UGC grid, store locator teaser, SM-01 bundle promo.
Single-product store variant: H-14 or H-02 hero -> F-02 sticky feature walkthrough -> spec `list`-family table -> SM-03 reviews -> FAQ Q-01 -> sticky ATC SA-01 on the home page itself.
States: no bestsellers yet -> hide rail (not "Coming soon"); promo expired -> announcement auto-hides by date field.
Mobile: hero text fits in 390x844 with CTA visible; category bento becomes 2-col grid; rails = native scroll-snap; HD-06 bottom bar optional.
SEO/schema: `Organization` (logo, sameAs, contactPoint), `WebSite` + `SearchAction`; H1 = brand promise (not "Welcome"); title "Brand | category keyword".
WP: `front-page.php` with ACF Flexible Content (`sections`); rails via relationship or product query fields (category, orderby).

### EC-02 Shop / Category (PLP)  [core]
Purpose: find the right product fast. Primary action: open PDP / quick add.
Sections: breadcrumb · PL-07 or compact header (category name H1, 1-2 line description, optional subcategory chips) · toolbar on `woocommerce_before_shop_loop` (SO-02 count, PL-02 view switch, FL-02 chips/"Filters" button, SO-01 sort) · grid PL-01/PL-03/PL-04 with the site's one card PC-xx · PG-01 pagination (or PG-02 load more enhancing real page links) · category SEO text below grid (collapsible after 3 lines) · recently viewed SM-05 [optional].
Filters: desktop FL-01 sticky sidebar when > 3 filter groups, else FL-02 top chips; mobile always FL-02 drawer.
Optional: PL-05 category landing variant for parents with children; editorial tiles (PL-03); promo tile.
States: loading = LD-01 skeleton; zero results = EM-02; filter applied = removable pills + "Clear all"; out-of-stock products last (`woocommerce_product_query` meta ordering) or hidden via setting.
Mobile: 2-up grid (1-up for PC-11/PC-14), sticky toolbar with Filters + Sort buttons (48px), filter drawer full-height with "Show N results" button.
SEO/schema: `BreadcrumbList`, optional `ItemList`; H1 = category name; canonical to unfiltered URL for filter combinations, `noindex,follow` for multi-filter URLs; paginated pages self-canonical.
WP: `archive-product.php` (+ `taxonomy-product_cat.php` if category needs a distinct header); ACF on `product_cat`: hero image, intro, SEO text, size-guide, editorial tiles repeater.

### EC-03 Collection landing  [extended]
Purpose: seasonal/campaign story that sells a curated set. Sections: H-22/H-10/H-11 hero (SIG allowed) · S-06 statement · G-09 hotspots · PL-03 editorial grid of the collection · SM-04 related collections rail. WP: `product_collection` taxonomy or `product_tag` with ACF layout, or a page with product relationship.

### EC-04 Sale / New / Bestsellers  [extended]
PLP clones with filtered queries (`on_sale`, date, `total_sales`); banner uses BD colour; honest end date if the sale has one. WP: page templates using `wc_get_products()` or shortcode `[products on_sale="true"]` wrapped in the PLP markup.

### EC-05 Brands index + brand page  [extended]
Index: A-Z `list`-family list with logos (G-06 hover logo) + letter jump bar. Brand page: header (logo, story) + PLP grid. WP: `product_brand` taxonomy (WooCommerce Brands, core since 9.6) templates.

### EC-06 Product (PDP)  [core]
Purpose: decide and add to cart with confidence. Primary CTA: Add to cart.
Sections: breadcrumb · PD-xx gallery (PD-01 default premium, PD-02 electronics, PD-08 mobile) + buy box anatomy 1-12 (`catalog/ecommerce-plp-pdp.md` §6) · SA-01 sticky ATC · SM-08 story/ingredients (ACF flexible, calm) · SM-03 reviews · SM-01 bundle (if configured) · SM-04 cross-sell / "complete the look" · SM-05 recently viewed.
Optional: SM-09 video, SM-10 hotspots, PD-06 360, C-35 before/after, SM-06 waitlist, SM-07 pre-order, SM-02 size guide dialog, spec table (real `<table>`) for technical products, FAQ Q-01 (product-specific).
States: variant not selected -> ATC disabled with hint "Choose a size"; OOS variant -> ER-01 + SM-06; whole product OOS -> price muted, waitlist; ATC loading LD-02; ATC success -> CT-01 drawer opens (or toast + badge when sticky bar used); ATC error -> inline error above button (`role="alert"`); no reviews -> "Be the first to review" (no zero stars).
Mobile: gallery PD-08 full-width, buy box below; sticky ATC bottom bar always after scroll past main ATC; accordions collapsed; swatches 44px targets.
SEO/schema: `Product` + `Offer` (price, `priceCurrency:"ILS"`, availability, `priceValidUntil` if sale end) + `AggregateRating`/`Review` only if real + `BreadcrumbList`; H1 = product name; title "Product name – category | Brand"; image alt = product + variant.
WP: `single-product.php` -> `content-single-product.php` override; hooks per `catalog/ecommerce-plp-pdp.md` §6; ACF on product: story flexible content, loop video, hotspots, key specs, pre-order date, card tint.

### EC-07 Search results  [core]
Purpose: recover intent from a query. Sections: query echo H1 ("Results for 'linen'"), tabs Products / Articles (if blog), result count, PLP grid with same card, filters as FL-02 chips (category, price), pagination; EM-03 zero state with suggestions + popular categories.
SEO: `noindex,follow`. WP: `search.php` branching on `post_type=product` (or WooCommerce product search renders `archive-product.php`); overlay SR-01 uses Store API.

### EC-08 Cart page + drawer  [core]
Purpose: review and proceed to checkout. Drawer (CT-01) is the default path; page (CT-05) is the fallback, linked from drawer.
Page sections: H1 "Cart" + item count · items table/cards · sticky summary (subtotal, shipping estimate calculator, coupon collapsible, total incl. VAT, primary "Checkout", express pay, TR-03 payment row) · CT-04 free-shipping meter · cross-sells (max 4) · TR-01/02 promises.
States: empty = CT-06/EM-01; qty update = optimistic UI + `aria-live` total; stock conflict = inline notice on the line; coupon error inline; removed item = "Undo" link for 8 s.
Mobile: cards instead of table, summary collapses into a sticky bottom bar with total + Checkout.
SEO: `noindex`. WP: `cart/cart.php`, `cart-totals.php`, `cart-empty.php`, `mini-cart.php`; fragments filter; page with `[woocommerce_cart]` (or Cart block, pick one per site).

### EC-09 Checkout  [core]
Purpose: pay with zero friction. Motion budget 0-1; Lenis off; header reduced to logo + "Back to cart"; no footer menus (policies links only).
Sections: CO-01 one-page (default) or CO-02 stepped (long/B2B/loyalty flows) · contact (email/phone, login link) · delivery (address or pickup point; Israeli city select; delivery method radio cards with real prices/ETAs) · payment (gateway radios; installments select if gateway supports; Bit/Apple Pay express at top) · order notes (collapsible) · terms + marketing consent (unchecked) · place order button with total in label ("Pay 1,240 ₪") · sticky order summary (collapsible on mobile at top).
States: field errors inline + summary at top (links to fields); payment declined -> message at payment step, keep form data; processing -> button stateful, disable double submit; session expired -> friendly reload notice.
Mobile: single column, summary collapsed at top showing total, 16px inputs (no iOS zoom), `inputmode`/`autocomplete`, sticky place-order bar only if the button is below the fold.
SEO: `noindex`. WP: `checkout/form-checkout.php`, `form-billing.php`, `form-shipping.php`, `review-order.php`, `payment.php`; fields via `woocommerce_checkout_fields`; page `[woocommerce_checkout]` or Checkout block (one per site).

### EC-10 Thank-you / order received  [core]
Purpose: reassure and set expectations. Sections: TY-01 (check draw, order number + copy C-62, summary, delivery estimate, 3 next steps, create-account offer for guests, WhatsApp/support link) · 1 soft cross-sell rail (optional, below the fold) · newsletter consent if not given.
States: failed/pending payment -> ER-03 retry; bank transfer -> bank details block prominent.
SEO: `noindex`. WP: `checkout/thankyou.php`, `woocommerce_thankyou` hook; analytics purchase event fired once (order meta flag).

### EC-11 Account  [core]
Sub-pages: login/register AC-01 · dashboard AC-02 · orders + view order AC-03 · addresses + details AC-04 · lost/reset password AC-07 · downloads AC-05 [extended].
Layout: nav list inline-start (desktop) / horizontal scroll tabs (mobile); content panel max 760px; calm.
States: no orders -> EM-04 + shop link; unverified email notice; logout confirmation not needed (instant).
SEO: `noindex`. WP: `myaccount/*.php` overrides; endpoints via `woocommerce_account_menu_items`.

### EC-12 Wishlist  [core]
Sections: H1 + count · grid with same PC card + "Move to cart" / remove · share link (if logged in) · EM-04 empty. Guest wishlist in `localStorage` (try/catch) with prompt to log in to save. SEO: `noindex`. WP: plugin page or `page-wishlist.php`.

### EC-13 Compare  [extended]
CP-01 table, max 4 products, sticky first column, "Highlight differences" toggle, remove buttons. `noindex`.

### EC-14 Track order  [extended]
AC-06 form -> status timeline (F-09 style, calm) with carrier link. `noindex`.

### EC-15 Gift card  [extended]
PDP variant: amount selector pills + custom amount, recipient fields, delivery date, preview card (C-17 tilt allowed). WP: gift card plugin product type.

### EC-16 Lookbook  [extended]
Signature page: H-16 drag canvas or G-01 horizontal gallery (SIG) + G-09 hotspots per look + "Shop the look" rail. WP: CPT `lookbook` with ACF hotspots.

### EC-17 About / Our story  [core]
Purpose: trust and brand depth. Sections: H-01/H-13 hero · T-03 manifesto or T-05 founder letter · F-09 timeline (real milestones) or F-02 process (how it's made) (SIG) · G-01 or F-11 materials/craft imagery · T-01 team (optional) · S-11 press · CTA-07 back to shop.
SEO: `Organization`/`AboutPage`. WP: page + Flexible Content.

### EC-18 Contact  [core]
Sections: H1 + one line · T-07 channels (phone `tel:`, WhatsApp, email, hours) · T-02 form (name, email, order number optional, topic select, message) + map if physical store · FAQ teaser (3 questions linking to EC-19).
States: form success -> inline confirmation with expected reply time; error summary.
SEO: `ContactPage`, `LocalBusiness`/`Store` if physical address (openingHours real).
WP: page template `page-contact.php`, ACF Options for channels.

### EC-19 FAQ  [core]
Sections: H1 · Q-03 categorised searchable accordion (Orders, Shipping, Returns, Payments, Products, Account) · contact CTA. SEO: `FAQPage` (only visible Q&A). WP: CPT `faq` + taxonomy, or ACF repeater on the page.

### EC-20 Shipping & returns  [core]
Sections: H1 · summary table (zones, methods, prices, ETAs, free threshold) real `<table>` · returns process F-10-like static steps (no pin) · cancellation-law summary + link to full policy · Q-01 FAQ subset. SEO: `FAQPage` for the FAQ part. WP: page, ACF tables.

### EC-21 Size guide  [extended]
Tables per category with cm/in toggle (radio), how-to-measure illustration, fit notes; same content as SM-02 dialog (single source ACF on `product_cat`).

### EC-22 Store locator  [extended]
List + map (T-02/T-06), filter by city, opening hours with "Open now" computed in `Asia/Jerusalem`. `LocalBusiness` per store.

### EC-23 Blog index (Journal)  [core]
Sections: H1 · featured post (G-08 featured) · category chips · list/grid G-08 · pagination · NL-01. SEO: `Blog`/`CollectionPage`, `BreadcrumbList`. WP: `home.php` (posts page) + `category.php`.

### EC-24 Blog post  [core]
Sections: breadcrumb · H1 + meta (date, reading time, author) · hero image · body (70ch, pull quotes S-06 at most 1, inline product cards via shortcode/block "shop this post" rail E-06) · author box · related posts (3) · NL-01. Progress bar C-12 optional.
SEO: `Article`/`BlogPosting` (headline, datePublished, dateModified, author, image), `BreadcrumbList`. WP: `single.php`; ACF: related products relationship.

### EC-25 404 · EC-26 Legal set  [core]
See `_shared.md` SH-404 (with bestsellers rail) and SH-LEGAL (+ cancellation policy, shipping policy, accessibility statement).

### EC-27 Coming soon / password  [extended]
SH-SOON; for WooCommerce "store coming soon" mode (WC 9.1+) restyle the coming-soon template.

## Store build checklist
- [ ] Every core page above exists as HTML + mapped template.
- [ ] One product card (PC-xx) used everywhere products appear (PLP, rails, search, wishlist, cross-sells).
- [ ] Drawer, fly-to-cart, fragments count and `aria-live` all fire on: PLP quick add, PDP ATC, sticky ATC, quick view, bundle.
- [ ] Prices rendered by `wc_price` (PHP) and `Intl.NumberFormat` (JS) match in he-IL and en.
- [ ] Transactional pages: `<html data-smooth="off">` on cart, checkout, thank-you, account (and PDP when the direction says so); no pins, no marquee, no preloader, no view transitions on checkout.
- [ ] Schema validated (Product, BreadcrumbList, Organization, FAQPage, Article); one schema source.
- [ ] RTL screenshots of PLP, PDP, drawer, checkout at 390 and 1280 widths.
