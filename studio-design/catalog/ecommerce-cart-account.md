# E-commerce catalog (WooCommerce) · cart, checkout, account, trust

E-commerce catalog is split in two files: `ecommerce-plp-pdp.md` (§0 store-wide rules, §1 header, §2 PLP, §3 cards, §4 filters, §5 quick view/search, §6 PDP, §13 E-widgets) and `ecommerce-cart-account.md` (§7 cart/checkout/thank-you, §8 account, §9 states, §10 badges/prices, §11 trust, §12 schema).

**Quick index**
- §7. Cart, mini-cart, checkout, thank-you: CT-01…TY-01 (10)
- §8. Account: AC-01…AC-07 (7)
- §9. Empty, loading, error states: EM-01…ER-03 (9)
- §10. Badges, labels, price display: BD-01…PR-04 (9)
- §11. Trust elements (honest only): TR-01…TR-06 (6)
- §12. Schema per store page: rules

Smooth scroll: every page in this file ships `<html data-smooth="off">` (cart, checkout, thank-you, account). Store-wide rules (§0: calm transactional pages, honest commerce, ILS prices, RTL, Israeli legal musts, precedence) live in `ecommerce-plp-pdp.md` and apply here.

## 7. Cart, mini-cart, checkout, thank-you

| id | name | looks like | module / recipe | Woo mapping |
|---|---|---|---|---|
| CT-01 | Cart drawer (E-23) | `<dialog>` from inline-end, 420px desktop / full mobile: line items (thumb, name, variant, qty stepper, remove), free-shipping meter, 1 upsell rail, subtotal, "Checkout" primary + "View cart" link | `cart` (`<dialog data-fx="cart">`, `data-free-shipping`, `data-open-on-add`); opens after add (or toast on PDP if sticky ATC used); focus trap; `aria-live` totals | `cart/mini-cart.php` override; refresh via `woocommerce_add_to_cart_fragments`; qty update via Store API `POST /wc/store/v1/cart/update-item` (nonce header) or `wc-ajax` custom |
| CT-02 | Fly-to-cart (E-22) | image clone arcs to header cart, badge bumps | `cart` (fly is built in; `data-open-on-add="false"` = badge bump only); reduced motion: no fly | listen to body `added_to_cart` jQuery event (fragments, hash, $button) |
| CT-03 | Mini-cart dropdown (E-24) | compact popover under cart icon + meter | Popover API; catalog stores | same fragments |
| CT-04 | Free-shipping meter | `<progress>` "Add 80 ₪ for free shipping"; success state text | `cart` built-in meter (`data-free-shipping` threshold, `[data-cart-meter]`, `data-label-away/-free`); outside the drawer: recipe bar `scaleX` | threshold from free-shipping method `min_amount`; subtotal `WC()->cart->get_displayed_subtotal()` |
| CT-05 | Cart page | 2 cols: items table (real `<table>` on desktop, cards on mobile) + sticky summary (subtotal, shipping estimate, coupon collapsible, total incl. VAT, checkout CTA, payment icons); cross-sells below | calm; no motion except qty updates | `cart/cart.php`: `woocommerce_before_cart`, `woocommerce_before_cart_table`, `woocommerce_cart_contents`, `woocommerce_cart_coupon`, `woocommerce_after_cart_table`, `woocommerce_cart_collaterals` (`woocommerce_cross_sell_display`, `woocommerce_cart_totals` -> `cart/cart-totals.php`) |
| CT-06 | Empty cart | illustration or typographic statement, 2-4 category links, bestsellers rail | EM-01 | `cart/cart-empty.php`, `woocommerce_cart_is_empty` |
| CO-01 | One-page checkout (default) | 2 cols: form (contact, delivery, payment) + sticky order summary (collapsible on mobile at top); express pay on top if available | minimal chrome: logo + "secure checkout" text only if TLS + reputable gateway, no nav, no footer links except policies | `checkout/form-checkout.php`: `woocommerce_before_checkout_form` (login + coupon toggles), `woocommerce_checkout_before_customer_details`, `woocommerce_checkout_billing`, `woocommerce_checkout_shipping`, `woocommerce_checkout_after_customer_details`, `woocommerce_checkout_before_order_review`, `woocommerce_checkout_order_review` (`woocommerce_order_review` 10, `woocommerce_checkout_payment` 20) |
| CO-02 | Stepped checkout (E-26) | Info -> Delivery -> Payment with `<ol>` stepper, completed steps collapse to summaries with "Edit" | For long forms (B2B, loyalty-club flows) | client-side steps over the same single form (no page loads); validation per step; error summary at top with links | same template; fields via `woocommerce_checkout_fields` filter (reorder, Israeli phone pattern, city select) |
| CO-03 | Field UX rules | labels always visible (no placeholder-only), `autocomplete` tokens, `inputmode="tel"`, errors inline + summary, 44px targets, RTL: phone/email fields `dir="ltr"` inside RTL form | — | `woocommerce_form_field_args` filter |
| TY-01 | Thank-you / order received | check draws (DrawSVG), order number large with copy button, summary, delivery estimate, what happens next (3 steps), account creation offer for guests; confetti only in playful directions, never reduced motion | `split-reveal` minimal; `widgets` C-61 optional | `checkout/thankyou.php`, hooks `woocommerce_thankyou_{gateway}`, `woocommerce_thankyou`; `is_wc_endpoint_url('order-received')`; failed state `$order->has_status('failed')` with retry pay link |

## 8. Account

| id | name | spec | Woo mapping |
|---|---|---|---|
| AC-01 | Login / register | 2 panels (login | register) or tabs on mobile; password visibility toggle; lost-password link; social login only if configured | `myaccount/form-login.php`, `woocommerce_before_customer_login_form`; register enabled via settings |
| AC-02 | Dashboard | greeting + 3 cards: last order status, addresses, wishlist; nav as vertical list (inline-start) or tabs on mobile | `myaccount/my-account.php`, `navigation.php` (`woocommerce_account_navigation`), `dashboard.php`; menu via `woocommerce_account_menu_items` filter |
| AC-03 | Orders list + view order | table (number, date, status chip, total, actions) -> order detail with timeline of statuses, tracking link, re-order button | `myaccount/orders.php`, `view-order.php`, `order/order-details.php`; statuses as chips (colour + text, never colour only) |
| AC-04 | Addresses / account details | cards with edit; forms same field UX as CO-03 | `form-edit-address.php`, `form-edit-account.php` |
| AC-05 | Downloads / subscriptions | only if the store sells them | `downloads.php` |
| AC-06 | Track order (guest) | order number + email form -> status | `[woocommerce_order_tracking]` shortcode page, `order/form-tracking.php` |
| AC-07 | Lost / reset password | single-column calm forms | `myaccount/form-lost-password.php`, `form-reset-password.php` |

## 9. Empty, loading, error states

| id | state | design |
|---|---|---|
| EM-01 | Empty cart | statement + 2-4 category links + bestsellers rail; never a sad-face emoji |
| EM-02 | No products found (filters) | "No results for Size 38 + Green" + one-click "Clear filters" + nearest suggestions (`wc_no_products_found` hook) |
| EM-03 | Search zero results | echo query, spelling hint, popular categories, contact link |
| EM-04 | Empty wishlist / orders | one line + CTA to shop |
| LD-01 | Loading products | skeleton cards with fixed `aspect-ratio` (no spinner); `aria-busy="true"` on grid |
| LD-02 | ATC in progress | button stateful (C-59): label -> spinner -> check; disabled while busy |
| ER-01 | Out of stock | variant crossed + disabled; OOS product: price muted, "Notify me" instead of ATC |
| ER-02 | Notices | restyle `woocommerce_output_all_notices` (`notices/success.php`, `error.php`, `notice.php`) as inline banners with icon + text, `role="alert"` for errors, never auto-dismiss errors |
| ER-03 | Payment failed | thank-you page failed branch: reason if available, "Try again" pay link, support contact |

## 10. Badges, labels, price display

| id | name | spec |
|---|---|---|
| BD-01 | Sale badge | text "Sale" or "-20%" (computed from real regular/sale), top inline-start, token `--c-accent` bg + `--c-accent-ink`; one badge max per card (priority: Sold out > Sale > New > Bestseller) | `loop/sale-flash.php`, `single-product/sale-flash.php`, filter `woocommerce_sale_flash` |
| BD-02 | New | only if published < N days (ACF option N=30) |
| BD-03 | Bestseller | only from real `total_sales` rank |
| BD-04 | Sold out | overlay text on card, image desaturated 30% |
| BD-05 | Low stock | "Only 3 left" when `get_stock_quantity() <= low_stock_amount` and stock managed; never invented |
| PR-01 | Sale price | `<del aria-label="Original price">` muted + strike, `<ins>` ink/accent, optional % saved in text |
| PR-02 | Range price (variable) | "From 190 ₪" rather than "190 ₪ – 340 ₪" on cards (filter `woocommerce_variable_price_html`); exact after variant pick (`pdp` updates `[data-pdp-price]` via `Intl`; a roll animation is a recipe) |
| PR-03 | Unit/number formatting | `tabular-nums` on prices and qty; `Intl.NumberFormat('he-IL',{style:'currency',currency:'ILS'})` in JS for live totals so JS and PHP match |
| PR-04 | RTL mixed strings | wrap product codes, English names and phone numbers in `<bdi>` inside Hebrew text; currency stays with the number |

## 11. Trust elements (honest only)

| id | element | rule |
|---|---|---|
| TR-01 | Returns promise | exact days from the real policy page, linked |
| TR-02 | Shipping promise | real threshold and delivery window per zone; national post / courier names only if used |
| TR-03 | Payment options | real gateway logos (Visa, Mastercard, Bit, Apple Pay, PayPal, local card brands, installments) in mono or original colour, as a row near checkout CTA |
| TR-04 | Reviews | real reviews only; show count and date; allow photo reviews |
| TR-05 | Business identity | legal name, ח.פ., address, phone, WhatsApp in footer and contact |
| TR-06 | Guarantees / certifications | only certifications the brand holds, linked to proof |
| Banned | Fake timers, fake viewer counts, fake "sold in last hour", generic "100% secure" shields, stock photos of "our team" |

## 12. Schema per store page

Product (+ Offer: price, priceCurrency ILS, availability, url; + AggregateRating/Review only when real) on PDP; BreadcrumbList on PLP/PDP; ItemList on PLP (optional); Organization + WebSite with SearchAction (Store API or `/?s=&post_type=product`) on Home; FAQPage on FAQ and shipping pages. WooCommerce outputs basic Product schema via `WC_Structured_Data`; extend with `woocommerce_structured_data_product` filter, do not duplicate with an SEO plugin (pick one source).
