# WordPress, ACF and WooCommerce

The default output is a static site. It's built so it can become a WordPress theme section by section without a redesign:

- **one section = one ACF Flexible Content layout**,
- **one `data-*` param = one ACF field**,
- **the token contract = `theme.json` presets**,
- **every store pattern names its WooCommerce template or hook.**

Ask for it in the brief ("WordPress + ACF", "WooCommerce theme") and the delivery includes the section → layout map and field list.

## Sections → ACF Flexible Content

The convention is in `catalog/sections-footer-wp.md` §12:

- One Flexible Content field, `sections`, on pages and CPTs. Each layout's name is the catalog id in snake case (`h_13_split`, `f_05_stack_cards`), and its template part is `template-parts/sections/<id>.php`.
- Every layout shares these common fields:
  - `anchor_id`,
  - `theme` (canvas / surface / inverse),
  - `padding_top` / `padding_bottom` (s/m/l),
  - a `bg` group (from `catalog/backgrounds.md`),
  - `fx_enabled` (switches motion off per section).
- The template prints `data-fx` and every `data-*` from fields with `esc_attr()`.
- Repeaters feed lists (`li`, `[data-stack-card]`, `[data-hscroll-panel]`, testimonial items, FAQ items). Relationships feed CPT-driven sections (team, projects, posts, products).
- Global elements (header CTA, announcement, footer content, business identity) live on an ACF Options page.

Every catalog row carries an **ACF sketch**, and every runtime param lists its ACF field type (Number, Select, Text, True/False …) in `runtime/README.md`. The field group writes itself from the plan.

```php
<?php // template-parts/sections/f_05_stack_cards.php
$cards = get_sub_field('cards'); ?>
<section id="<?php echo esc_attr(get_sub_field('anchor_id')); ?>"
         class="section" data-fx="<?php echo get_sub_field('fx_enabled') ? 'stack-cards' : ''; ?>"
         data-scale="<?php echo esc_attr(get_sub_field('scale')); ?>">
  <?php foreach ($cards as $c): ?>
    <article data-stack-card>…</article>
  <?php endforeach; ?>
</section>
```

## Tokens → `theme.json`

Map the token contract onto `theme.json` presets, so the block editor and the design share one source:

| Token | `theme.json` |
|---|---|
| `--c-canvas`, `--c-surface`, `--c-ink`, `--c-accent`, … | `settings.color.palette` |
| `--f-display`, `--f-body`, `--f-mono` | `settings.typography.fontFamilies` |
| `--fs-xs … --fs-display` (clamp values) | `settings.typography.fontSizes` (with `fluid`) |
| `--sp-1 … --sp-10` | `settings.spacing.spacingSizes` |

Keep ACF Flexible Content for the designed sections, and register **core block styles** (not custom blocks) for typographic variants. Most enterprise WordPress builds in the research sample expose `theme.json` presets in exactly this way.

## Enqueueing the runtime

Enqueue in the same order as `runtime/README.md` §1, using `wp_enqueue_style` / `wp_enqueue_script` with dependencies:

1. styles: `core.css` → `tokens.css` → `fx/*.css` → `site.css`,
2. scripts: GSAP + plugins → Lenis → `core.js` → `fx/*.js` → custom `assets/fx-*.js` → `site.js`.

Enqueue only the modules a template uses. Self-host `cobe` and Paper Shaders in production (`data-src`, `SD.paperBase = 'vendor/paper/dist/'`).

## Re-init in the ACF preview

ACF block / Flexible Content previews re-render HTML. Tear down before the re-render and initialise after:

```js
if (window.acf) acf.addAction('render_block_preview', function ($el) {
  SD.destroyAll($el[0]);
  SD.initAll($el[0]);
});
```

`initAll` is idempotent and `destroy` restores the pristine DOM, so repeated previews never double-bind. After DOM swaps (filters, load more, AJAX cart), call `ScrollTrigger.refresh()` once, debounced.

## WooCommerce

Every row in `catalog/ecommerce-plp-pdp.md` and `ecommerce-cart-account.md` names its template override and/or hook. Some examples:

| Pattern | WooCommerce |
|---|---|
| PLP grid | `archive-product.php`, `woocommerce_product_loop_start/end` |
| Toolbar | view switch on `woocommerce_before_shop_loop`; `woocommerce_result_count` (20); `woocommerce_catalog_ordering` (30) |
| Pagination | `woocommerce_pagination` on `woocommerce_after_shop_loop` |
| Collection story header | `woocommerce_archive_description` |
| PDP buy box | `woocommerce_template_single_title` (5) → `…_rating` (10) → `…_price` (10) → `…_excerpt` (20) → `…_add_to_cart` (30) |
| PDP gallery | `woocommerce_before_single_product_summary` → `woocommerce_show_product_images` (20) |
| Quick-view triggers | `woocommerce_after_shop_loop_item` |
| Cart count | `woocommerce_add_to_cart_fragments` |
| Checkout field UX | `woocommerce_form_field_args` |
| Login / register | `myaccount/form-login.php`, `woocommerce_before_customer_login_form` |

Runtime wiring:

- **Cart** (`fx/cart.js`). WooCommerce is the source of truth. Either keep classic AJAX buttons and call `SD.cart.syncFromStore()` on the jQuery `added_to_cart` event, or set `window.SD_CART_ADAPTER` to the Store API adapter (`/wp-json/wc/store/v1/cart`, shown in full in `runtime/README.md`). Never use `data-persist` on WooCommerce (it exists only for multi-page static previews).
- **PDP** (`fx/pdp.js`). Forward Woo's `found_variation` to `sd:pdp:variant`. `data-variations` takes the Woo variation matrix, and out-of-stock variations render as disabled radios. `sd:pdp:change` carries `variation_id`.
- **Product grid** (`fx/flip-grid.js`). `data-tags` come from `product_cat` / attribute slugs; server-side filtering goes through `el.sdFlipSwap(fn)`.
- **Quick view.** Variable products fetch `/wp-json/wc/store/v1/products/{id}` on `sd:qv:open`.
- **FAQ.** Print the FAQPage JSON-LD server-side (`data-jsonld` is the no-PHP fallback).
- **Nav.** `wp_nav_menu` into `.sd-nav__links`; items with the CSS class `mega` become mega panels.
- **Prices.** Always `wc_price()` / `get_price_html()`. Runtime formatters use `Intl.NumberFormat` with `he-IL` / `ILS` from `get_woocommerce_currency()`.

Store-wide rules:

- **Transactional pages are calm**: cart, checkout and account ship `<html data-smooth="off">`, with tier-0 backgrounds only.
- **Speed budget**: LCP ≤ 2.5 s, CLS ≤ 0.05, INP ≤ 200 ms.
- **Honest commerce**: no fake countdowns, viewers, stock or seals.
- **Classic templates or blocks**: classic shortcode pages + overrides for full control; block CSS when the site uses Cart/Checkout Blocks.
- **Real catalogue first**: `scripts/extract-catalog.mjs` pulls the client's own store through the Store API, Shopify `products.json`, or a JSON-LD/microdata crawl into `data/catalog.json`, and Woo variations drop straight into `pdp`.

## Page templates

Each page record in `pages/*.md` has a **WP** line: template file, Flexible Content usage, CPT/taxonomy and hooks. Some examples:

- `front-page.php` with a `sections` Flexible Content field,
- `page-legal.php` (auto table of contents from the H2s),
- `page-thank-you.php` (the form plugin redirects with a query flag),
- `404.php` (content from the Options page).
