# Landing / product / SaaS page set

Read `pages/_shared.md` first; section ids from `catalog/sections-hero-nav.md`, `sections-content.md`, `sections-footer-wp.md`. Ids: `LP-xx`. Narrative order for marketing pages: problem -> product -> proof -> price -> objection handling -> action. Each page has one primary CTA intent (e.g. "Start free" or "Book a demo", not both as equals).

Page map (core in bold): **Home** · **Features / product tour** · Feature detail · **Pricing** · **Use cases / solutions (index + detail)** · **Customers (index) + case study** · Integrations · Changelog · **About** · Careers + role · **Blog index + post** · **Contact / Book demo** · **Waitlist / signup** · Login (link out) · **Thank-you** · **Legal set** · **404** · Glossary · Compare (vs competitor) · Docs (link out) · Status (link out).

---

### LP-01 Home  [core]
Purpose: explain what it is, for whom, and get one action. Primary CTA: the product's main intent (<= 3 words).
Sections (default; choose archetypes so >= ceil(n/2) families):
1. Header (N2 SaaS three-part, N6 pill or N11 morph)
2. Hero: H-03 shader statement, H-05 device settles (real screenshot), H-19 bento hero, H-20 rotating word, H-17 globe (global products), H-02 scrub (hardware launch), H-12 lamp (dark premium)
3. S-01 logo marquee (real customers only; otherwise skip) directly under hero
4. Problem framing: F-14 old way vs new way, or S-06 scroll-lit statement
5. Product walkthrough (SIG): F-02 sticky scroll reveal, F-03 tabbed showcase, F-04 horizontal track, or H-05 continuation
6. Features: F-01 bento (each tile has a real visual) or F-15 index list
7. How it works: F-10 pinned steps (if not SIG already, else static 3-step `list`-family list) or F-08 beams hub
8. Proof: S-02 capsule marquee / S-03 wall / S-10 case cards / F-12 stats (real)
9. Pricing teaser: P-06 statement or link card to LP-03 (never full table on home unless single plan)
10. FAQ Q-02 (5-6 real objections)
11. CTA-02 shader card or CTA-04 waitlist, then footer (Ft1/Ft5/FT-03, avoid 4-column default)
Optional: F-07 orbiting integrations, S-07 video testimonials, C-51 terminal (dev tools), F-16 single demo video.
States: pre-launch -> CTA becomes waitlist (LP-12), proof sections replaced by founder note T-05; no logos yet -> skip S-01 entirely.
Mobile: hero CTA visible at 390x844; SIG pinned sections degrade to stacked blocks (<768px no pin); bento 1-col in reading order.
SEO/schema: `Organization`, `WebSite`, `SoftwareApplication` (name, applicationCategory, offers with real price, operatingSystem) for software; H1 = what it does for whom; title "Product – short value prop".
WP: `front-page.php` Flexible Content; CTA intent from Options page to keep it consistent.

### LP-02 Features / product tour  [core]
Purpose: depth for evaluators. Sections: H-13 or H-01 hero (quieter than home) · sticky in-page sub-nav (NV-PI pill indicator, anchors per feature group) · per group: one of F-02 / F-03 / F-06 (max 2 S in a row) / F-01 (knob changed vs home) · F-16 demo video · comparison with alternatives F-14 · CTA-06 split contact or CTA-01.
SIG: one F-04 horizontal or F-02 sticky (different from home's SIG).
Mobile: sub-nav becomes horizontal scroll chips, sticky under header.
SEO: `WebPage`; H2 per feature group with keyword; `VideoObject` if demo video.
WP: page + Flexible Content; features as CPT `feature` if reused on detail pages.

### LP-03 Feature detail  [extended]
Hero H-13 · problem/solution F-14 · F-16 video · S-06 quote from a real customer · related features rail · CTA. One per major feature for SEO. WP: CPT `feature` single.

### LP-04 Pricing  [core]
Purpose: choose a plan (software/services) or a bundle (physical product). **Physical product (device, kit, appliance) → route to P-07**: H1 + one-line promise · P-07 bundles (base unit + add-ons, what's in the box, compare table, installments line `תשלומים` placeholder unless real, warranty/shipping/returns strip) · Q-01 FAQ (delivery, warranty, returns, installments) · `Product` + `Offer` per bundle schema. Otherwise: H1 + one-line promise + billing toggle · P-01 tiers (P-02 highlight on recommended) or P-04 usage slider or P-06 single price · P-03 comparison table (grouped, sticky header) · Q-01 pricing FAQ (billing, VAT, cancellation, refunds, discounts) · S-09 avatar stack or S-05 short reviews · enterprise CTA-06 split contact.
States: yearly toggle -> prices roll (C-31), savings text real; currency ILS/USD switch only if billing supports it; free plan clearly labelled limits.
Mobile: tiers become F-05/P-05 stacked sticky cards or swipe cards with plan tabs; comparison table first column sticky + horizontal scroll with shadow cue.
SEO/schema: `Product`/`SoftwareApplication` with `offers` (`AggregateOffer` lowPrice/highPrice), `FAQPage`.
WP: page; ACF plans repeater on Options (single source for home teaser + pricing).

### LP-05 Use cases / Solutions  [core]
Index: H1 · grid or F-11 accordion strips of use cases (by role/industry) · proof strip per case. Detail: H-13 hero with role-specific headline · pains list (L) · workflow F-02 · relevant features F-01 (small, 4 tiles) · case study teaser S-10 · CTA.
SEO: detail pages target "product for [industry/role]"; `BreadcrumbList`. WP: CPT `use_case` (+ taxonomy role/industry), `archive-use_case.php`, `single-use_case.php`.

### LP-06 Customers index + case study  [core]
Index: H1 · logo grid (static, not marquee if home has S-01) · filters (industry, size) with G-04/flip-grid · S-10 case cards with real KPIs.
Case study: H-22 or H-13 hero (customer name, one-line result) · KPI band F-12 (real, sourced) · challenge / solution / result as T sections with S-06 pull quote · product screenshots (real) · related cases rail · CTA.
SEO: `Article` (case study) with `about` Organization; `BreadcrumbList`. WP: CPT `case_study`, ACF KPIs repeater (value, label, source).

### LP-07 Integrations  [extended]
H1 · F-07 orbit or F-08 beams as intro (SIG) · searchable/filterable logo grid (Q-03 filter pattern with flip-grid) · integration detail (CPT) with setup steps. WP: CPT `integration` + taxonomy category.

### LP-08 Changelog  [extended]
Dated entries list (F-09 timeline, calm) with tags (New / Improved / Fixed), images/GIF-free videos, RSS link. SEO: `BlogPosting` per entry optional. WP: CPT `changelog` or posts category.

### LP-09 About  [core]
Sections: H-01 statement hero · T-03 manifesto (why we exist) · F-09 timeline (real milestones) (SIG candidate) · T-01 team (optional; real people only) · investors/backers logos (real) · values T-04 · careers teaser (if hiring) · CTA.
SEO: `AboutPage`, `Organization` (foundingDate, founders real). WP: page + Flexible Content; team CPT.

### LP-10 Careers + role  [extended]
Careers: H1 + culture statement · values/benefits L-list (real) · office/team photos G-01 · open roles list (`list`-family rows: title, team, location, type) with filters · process steps. Role: title H1, meta, sections (about role, responsibilities, requirements, benefits), apply form or ATS link, share. SEO: `JobPosting` per role (datePosted, validThrough, employmentType, jobLocation / `jobLocationType: TELECOMMUTE`, hiringOrganization, baseSalary only if disclosed). WP: CPT `job`.

### LP-11 Contact / Book a demo  [core]
Purpose: capture qualified leads. Sections: `split`-family: left = what happens in the demo (3 bullets, duration, who joins) + S-09 proof; right = form (name, work email, company, team size select, message optional) or embedded scheduler (Calendly/Cal.com, lazy-loaded on interaction) · T-07 other channels · small FAQ (3).
States: success -> SH-TY with calendar confirmation; validation inline; business-email check soft (warning, not block).
SEO: `ContactPage`. WP: page, form plugin with redirect to thank-you.

### LP-12 Waitlist / signup  [core]
Purpose: one field conversion. Sections: H-03/H-12 hero with CTA-04 vanish input as the hero form · what you get (3 `list`-family items) · founder note T-05 or S-06 · optional referral position counter (C-31, real).
States: duplicate email -> friendly "You're already on the list"; success inline with share link.
Mobile: input + button stacked, full width, 48px.
SEO: indexable if pre-launch landing; `WebPage`. WP: page; ESP integration.
Signup (if app signup lives on site): minimal auth page, logo only, form + social auth, no nav; `noindex`.

### LP-13 Thank-you  [core]
SH-TY variants per form: demo booked (calendar details, prep materials), waitlist (position, share), download (file link + related resources). `noindex`.

### LP-14 Blog index + post  [core]
Same anatomy as EC-23/EC-24 without product cards; post adds table of contents (sticky desktop) for > 1,500 words, code blocks with C-62 copy, CTA card mid-article (one) and at end. SEO: `BlogPosting`, `BreadcrumbList`; categories as topic hubs. WP: `home.php`, `single.php`, `category.php`.

### LP-15 Glossary  [extended]
A-Z index (`list` family, letter jump bar sticky) · term pages (definition first sentence, example, related terms, CTA). SEO: `DefinedTermSet`/`DefinedTerm`. WP: CPT `glossary`.

### LP-16 Compare (vs competitor)  [extended]
H1 "Product vs X" · honest comparison table P-03 style (real features, dated) · migration steps · quotes from switchers (real) · CTA. SEO: title pattern "Product vs X"; keep claims verifiable.

### LP-17 Legal set · LP-18 404  [core]
See `_shared.md` (privacy, terms, DPA/security page if B2B, accessibility statement, cookie policy).

## Landing build checklist
- [ ] One CTA intent and label everywhere (nav, hero, sections, footer).
- [ ] Each marketing page has a different SIG moment (or none), and within-page archetypes are unique.
- [ ] Proof only real: logos, KPIs (with source field), quotes (name + role + permission).
- [ ] Pricing data single-sourced (Options) and consistent between home, pricing, schema.
- [ ] Forms: labels, autocomplete, error summary, redirect to thank-you, conversion event on thank-you.
- [ ] Pre-launch state tested (waitlist replaces signup CTAs).
