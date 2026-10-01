# Shared page-set rules and global elements

Load before any `pages/*.md`. Applies to all three site types.

**Precedence (when rules disagree):** the brief's explicit words > the chosen direction's signature moves > catalog defaults (section/page anatomies, default orders) > general rules. Example: the PDP buy-box order in `catalog/ecommerce-plp-pdp.md` §6 is the default order; a direction's signature may move one block (e.g. story before variants), and the plan states the move. Bans in `antipatterns.md` are defaults too: only the brief's words override them.

## 1. The system lock

**One locked design system across all pages; variation lives inside the system.**
- After the direction is chosen, write the project `DESIGN.md` + `assets/tokens.css`. From then on every page uses only `var(--token)` values: same fonts (2 + optional outlier), same accent, same radius system, same card physics, same button voice, same divider language, same house ease, same header and footer.
- The anti-repetition rules invert across pages: within ONE page no two sections share an archetype; ACROSS pages of the same site, repeated archetypes are fine (and expected for templates like PLP/PDP), but a section reused on two marketing pages changes >= 1 knob (e.g. F-01 bento with 6 tiles on Home, 4 tiles on Features).
- Variation lives in: section choice per page, knob settings, content, imagery, the one signature moment per page (different on each marketing page), and background mode per section. It never lives in: new colours, new fonts, new radii, a different nav on some pages, per-page "themes".
- Inner pages are quieter than Home: signature moments on Home + 1-2 key pages (About, Features, collection landing); transactional, legal, account and utility pages run at motion budget <= 2 regardless of direction.

## 2. Page record format (used in every pages file)

```
### <ID> <Page name>  [core|extended]
Purpose: one job, one primary CTA.
Sections: ordered list of catalog ids (`catalog/sections-*.md` / `catalog/ecommerce-*.md`) with a note; SIG = signature moment.
Optional: ids that can be added.
States: empty / loading / error / edge cases.
Mobile: what changes below 768px.
SEO/schema: title pattern, H1 rule, JSON-LD types, indexation.
WP: template file, ACF Flexible Content usage, CPT/taxonomy, hooks.
```

## 3. Global elements

| element | spec | WP |
|---|---|---|
| Skip link | first focusable: "Skip to content" / "דלג לתוכן", visible on focus | `header.php` |
| Header | one archetype site-wide (sections-hero-nav.md §2); transparent-over-hero variant allowed only on pages whose hero is `media` family, still same archetype; sticky behaviour same everywhere; current page `aria-current="page"` | `header.php`, menus `primary`, `utility`; Options page (ACF) for CTA, announcement |
| Mobile menu | NV-FS or drawer from inline-end; focus trap; Esc; `inert` on page | same |
| Footer | one archetype site-wide (sections-footer-wp.md §8); always: legal links, accessibility statement link, business identity (name, registration no., address, phone), © year | `footer.php`, menus `footer-*`, Options page |
| Cookie bar | default: **slim bottom bar**, one line of text + "Accept" / "Reject" / "Settings" of equal weight, height <= 64px on desktop and <= 25% of the viewport on mobile (text wraps to 2 lines max, buttons in one row); at 390x844 it never covers the hero's primary CTA or the mobile sticky CTA (it stacks above the sticky bar, and the hero CTA sits above 75% of the viewport). Option: bottom inline-start card (<= 360px wide) when the direction wants it. Equal-weight reject if analytics/marketing cookies are used; no dark patterns; remembers choice (cookie, 12 months) | plugin (Complianz / CookieYes) restyled, or custom |
| Newsletter | one pattern site-wide: NL-01 band on content pages or Ft7/FT-04 embedded; modal NL-02 only for stores, once per 14 days, never on checkout/cart/account; explicit marketing consent checkbox | form plugin (CF7/Gravity/Fluent) + ESP |
| Accessibility widget | NOT an overlay toolbar (overlays are discredited); the site itself meets WCAG 2.2 AA / IS 5568. Link to the statement in footer | page `accessibility-statement` |
| Breadcrumbs | on all inner pages below header, except Home, landing Home, checkout; `BreadcrumbList` schema | Yoast/RankMath breadcrumbs or `woocommerce_breadcrumb()`; one source |
| Back to top | only on pages > 4 viewports; small, inline-end bottom; not with CTA-05 bar | footer |
| Search | stores: SR-01 overlay; company/landing with blog > 20 posts: simple search page; otherwise none | `searchform.php`, `search.php` |
| Notices / toasts | one toast position site-wide (bottom inline-start); `role="status"` / `role="alert"` for errors; no celebratory toasts | — |
| Language switch | if bilingual: text labels "EN / עב" (no flags), preserves page; `hreflang` alternates | WPML/Polylang |
| Consent & forms | labels visible, `autocomplete`, error summary, success message in page (not alert), spam: honeypot + Turnstile, never visible CAPTCHA puzzles | form plugin |

### Form error summary (every form)
On submit with errors: (1) prevent submit, (2) render a summary box at the top of the form: `<div role="alert" tabindex="-1" class="form-errors"><h2>2 fields need attention</h2><ul><li><a href="#f-email">Email: enter an address like name@example.com</a></li>…</ul></div>` and move focus to it, (3) each invalid field gets `aria-invalid="true"` and `aria-describedby` pointing to its inline message (text + icon, never colour alone), (4) keep typed values, (5) on success show an in-page status (`role="status"`), not an alert. Hebrew: "יש לתקן 2 שדות", messages that say how to fix, not just "שגיאה". Required fields say "(חובה)" / "(required)" in the label text.

## 4. Shared utility pages (every site type)

### SH-404 404  [core]
Purpose: recover the visitor in one click.
Sections: short statement H1 in the direction's display type (may carry the site's one playful moment: C-34 physics text, C-26 scramble, A-13 art) + search field (if site has search) + 3-5 links to top pages/categories + (store) bestsellers rail E-06.
States: n/a. Mobile: same, stacked.
SEO: `noindex` via WP default 404 status (must return HTTP 404, never redirect to home).
WP: `404.php`; content from Options page.

### SH-LEGAL Legal pages  [core]
Pages: Privacy policy, Terms of use, Accessibility statement (הצהרת נגישות: standard, coordinator contact, date of audit, known limitations), Cookie policy; stores add Cancellation/returns policy (מדיניות ביטולים), Shipping policy.
Sections: `text`-family document: H1 + last-updated date + sticky table of contents (desktop inline-start column, mobile `<details>` at top) + long-form body (max 70ch, `--fs-base`, generous `--lh-body`) + contact line.
Motion: none (budget 0). Background: canvas only.
SEO: indexable (except cookie policy optional noindex), `WebPage` schema; H1 = policy name.
WP: `page-legal.php` template (ACF: `updated_date`, auto TOC from H2s via `the_content` filter adding ids).

### SH-TY Generic thank-you (forms)  [core where forms exist]
Purpose: confirm submission, set expectation ("We reply within 1 business day"), offer next step (read case study / WhatsApp).
Sections: `text` statement + 2-3 next steps + one secondary link. `noindex`. Fire conversion events here (not on button click).
WP: `page-thank-you.php`; form plugin redirects here with a query flag (`?form=contact`) for variant copy.

### SH-SOON Coming soon / maintenance  [extended]
One screen: wordmark, one line, email capture (NL-01 compact), social links. Maintenance returns 503 with `Retry-After`. `noindex` for coming soon.

## 5. Page-set deliverable rules

1. Always deliver the full **core** set for the site type; build **extended** pages on request (list them in the plan so the client sees what exists).
2. Each page ships as a static HTML file at the project root (`index.html` = Home, `shop.html`, `product.html`, …; layout in SKILL.md §5 and `runtime/README.md` §1), sharing `runtime/core.css` → `assets/tokens.css` → `runtime/fx/*.css` → `assets/site.css`, and `runtime/core.js` → `runtime/fx/*.js` → `assets/fx-*.js` → `assets/site.js`. `_gallery.html` links every page (+ `concepts/`). Hebrew sites ship `<html lang="he" dir="rtl">`; `?rtl=1` is only a mirroring test.
3. The plan lists per page: sections in DOM order (ids), signature moment (or "none"), motion budget used, schema types, WP template.
4. Content: real copy from the brief; missing facts use visible placeholders `[TODO: confirm]` and never invented numbers, clients, reviews or awards.
   - **Localized placeholder markers**: `[TODO: …]` on LTR pages, `[להשלמה: …]` on Hebrew pages, always wrapped `<span class="todo" dir="auto">[להשלמה: כתובת המשרד]</span>` so the brackets stay with their text in RTL. `verify.mjs` detects both markers and the `.todo` class; style `.todo` visibly (e.g. dashed underline in `--c-accent`).
   - **Sample catalogue** (brief names one product or none): generate a clearly marked sample set so PLP/PDP layouts can be judged. Names `[Sample] <plausible generic name>` (e.g. `[Sample] Stoneware bowl, 18 cm`), prices `₪[TODO]` or a real-looking number only with a visible `sample price` chip, images as labelled slots or `picsum.photos/seed/<descriptive>/…`. Never present invented products, prices, reviews or stock as real; list every sample item in `pages.md` and the delivery note.
   - **Pages not in scope**: links to core pages that were not built point to `#todo-<page>` (e.g. `#todo-shipping`) and keep their real label; load `runtime/fx/todo-links.js` + `.css` and put `data-fx="todo-links"` on `<body>`: every such link opens a small dialog "This page is not part of this delivery" / "העמוד הזה עוד לא חלק מהמסירה" (language by `lang`). List them in `pages.md` under "not built". No dead `href="#"`, no links to 404s. In WordPress they become real pages or are removed.
5. Navigation completeness: every core page is reachable from header, footer or a contextual link; no orphan pages; header menu <= 6 top-level items.
6. Cross-page consistency check before delivery: same header/footer markup, same button classes, same heading scale, same focus style, same breadcrumbs pattern.
