# Page sets

Most generators stop at a homepage. studio-design builds the **complete core page set** for the site type, so a store has a PLP, PDP, cart, checkout, account, legal pages and a 404, each with real empty and error states.

Files: `studio-design/pages/_shared.md` (load first), `pages/ecommerce.md`, `pages/landing.md`, `pages/company.md`.

| Set | Ids | Pages | Core |
|---|---|---|---|
| E-commerce (WooCommerce) | `EC-01…EC-27` | 27 | 17 |
| Landing / product / SaaS | `LP-01…LP-18` | 18 | 12 |
| Company / informational / agency | `CM-01…CM-20` | 20 | 9 always + 6 depending on the vertical |
| Shared utility pages | `SH-404`, `SH-LEGAL`, `SH-TY`, `SH-SOON` | 4 | 3 (coming soon is extended) |

**Core** pages are always built. **Extended** pages are built on request, and the plan lists them so the client can see what exists.

## Page record format

Every page in every set is described the same way:

```
### <ID> <Page name>  [core|extended]
Purpose: one job, one primary CTA.
Sections: ordered catalog ids with notes; SIG = the signature moment.
Optional: ids that can be added.
States: empty / loading / error / edge cases.
Mobile: what changes below 768px.
SEO/schema: title pattern, H1 rule, JSON-LD types, indexation.
WP: template file, ACF Flexible Content usage, CPT/taxonomy, hooks.
```

## E-commerce (27)

| Core (17) | Extended (10) |
|---|---|
| EC-01 Home · EC-02 Shop / Category (PLP) · EC-06 Product (PDP) · EC-07 Search results · EC-08 Cart page + drawer · EC-09 Checkout · EC-10 Thank-you / order received · EC-11 Account · EC-12 Wishlist · EC-17 About / Our story · EC-18 Contact · EC-19 FAQ · EC-20 Shipping & returns · EC-23 Blog index · EC-24 Blog post · EC-25 404 · EC-26 Legal set | EC-03 Collection landing · EC-04 Sale / New / Bestsellers · EC-05 Brands index + brand · EC-13 Compare · EC-14 Track order · EC-15 Gift card · EC-16 Lookbook · EC-21 Size guide · EC-22 Store locator · EC-27 Coming soon / password |

Home and collection landings carry the signature moments. Everything transactional stays calm, at motion budget ≤ 2 whatever the direction. There's a single-product-store variant of Home (sticky feature walkthrough → spec table → reviews → FAQ → sticky add-to-cart).

## Landing / product / SaaS (18)

| Core (12) | Extended (6) |
|---|---|
| LP-01 Home · LP-02 Features / product tour · LP-04 Pricing · LP-05 Use cases / Solutions · LP-06 Customers + case study · LP-09 About · LP-11 Contact / Book a demo · LP-12 Waitlist / signup · LP-13 Thank-you · LP-14 Blog index + post · LP-17 Legal set · LP-18 404 | LP-03 Feature detail · LP-07 Integrations · LP-08 Changelog · LP-10 Careers + role · LP-15 Glossary · LP-16 Compare (vs competitor) |

Marketing pages follow the narrative problem → product → proof → price → objection handling → action. Each page has one primary CTA intent.

## Company / informational / agency (20)

| Core (9) | Core for some verticals (6) | Extended (5) |
|---|---|---|
| CM-01 Home · CM-02 About · CM-03 Services index · CM-04 Service detail · CM-10 News / insights index · CM-11 Article · CM-12 Contact · CM-19 Legal set · CM-20 404 | CM-05 Industries (B2B) · CM-06 Work / projects index (agencies, architects, contractors) · CM-07 Case study (where CM-06 exists) · CM-08 Team (firms > 3 people) · CM-09 Careers (if hiring) · CM-17 FAQ (law, clinics) | CM-13 Locations · CM-14 Process / approach · CM-15 Awards & press · CM-16 Resources / downloads · CM-18 Vertical add-ons |

Vertical defaults set the motion budget and the key pages:

- **Law / clinic / service SMB**: budget 3–5, trust and clarity.
- **Agency / studio**: budget 6–9, work-first; Work and Case study carry the brand. Home shows the work in section 1–2 and keeps the words under ~250.
- **Industrial / corporate**: budget 4–6, capabilities, certifications, sourced stats.
- **Real-estate project**: budget 6–8, units, location, gallery.

## Shared rules (`pages/_shared.md`)

**The system lock.** After the direction is chosen, every page uses only `var(--token)` values: the same fonts, accent, radius system, card physics, button voice, header and footer. Within one page no two sections share an archetype. Across pages, repeated archetypes are expected, but a section reused on two marketing pages changes at least one knob. Inner pages are quieter than Home.

**Global elements** each have a spec and a WordPress home:

- skip link,
- header (one archetype site-wide),
- mobile menu (focus trap, `inert`),
- footer (always: legal links, accessibility statement link, business identity),
- cookie bar (a slim bottom bar that never covers the hero CTA at 390×844, with an equal-weight reject),
- newsletter (one pattern site-wide),
- **no accessibility overlay widget**: the site itself meets WCAG 2.2 AA / SI 5568,
- breadcrumbs, back to top, search, toasts, language switch (text labels, no flags),
- forms with a full **error summary** pattern.

**Utility pages**:

- **SH-404** returns a real HTTP 404 and recovers the visitor in one click.
- **SH-LEGAL** covers privacy, terms, accessibility statement and cookies, plus returns and shipping for stores. It's a long-form text page with a sticky table of contents at motion budget 0.
- **SH-TY** is the form thank-you page, and conversion events fire there.
- **SH-SOON** is coming soon or maintenance (503 + `Retry-After`).

**Deliverable rules**:

1. The full core set is always delivered.
2. One static HTML file per page, with a shared include order, `_gallery.html` and `index.html` = Home.
3. Content is honest. Missing facts become visible placeholders (`[TODO: …]` on LTR pages, `[להשלמה: …]` on Hebrew pages, always inside `<span class="todo" dir="auto">`). If the brief names few or no products, a clearly marked `[Sample]` catalogue is generated so PLP/PDP layouts can be judged. Invented products, prices, reviews or stock are never presented as real.
4. Links to core pages outside the delivery point to `#todo-<page>`. The `todo-links` module opens a small "This page is not part of this delivery" dialog (in English or Hebrew), so there are no dead `#` links and no links to 404s.
5. Every core page is reachable from the header, the footer or a contextual link. The header menu has at most 6 top-level items.
6. A cross-page consistency check runs before delivery.
