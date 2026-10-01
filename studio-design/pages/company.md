# Informational / company / agency page set

Read `pages/_shared.md` first; section ids from `catalog/sections-hero-nav.md`, `sections-content.md`, `sections-footer-wp.md`. Ids: `CM-xx` (distinct from checkout component ids `CO-01/02` in catalog/ecommerce-cart-account.md). Covers service firms (law, clinics, consultancies, industrial B2B), agencies/studios, institutions. Primary CTA is usually contact/consultation ("Book a consultation", "Start a project") and stays identical site-wide.

Page map (core in bold): **Home** · **About** · **Services index** · **Service detail** · **Industries / sectors (index + detail)** · **Work / projects index** · **Case study** · **Team** (+ person profile) · **Careers + role** · **News / insights index + article** · **Contact** · **Legal set** · **404** · Locations · Process / approach · Awards & press · Resources/downloads · FAQ · Vertical add-ons (unit selector, donate, certifications).

Vertical defaults: **Law/clinic/service SMB** (trust, clarity; direction budget 3-5; key pages Home, Services + detail, Team, FAQ, Contact, Articles). **Agency/studio** (work-first; budget 6-9; Work + case study carry the brand). **Industrial/corporate** (capabilities, certifications, stats; budget 4-6). **Real estate project** (units, location, gallery; budget 6-8).

---

### CM-01 Home  [core]
Purpose: in 5 seconds say who you are, for whom, and why trust you; route to services/work; get the contact action.
Sections:
1. Header (N10 edge minimal / N6 pill / N4 side rail / N7 masthead; law & clinics N6 or N11)
2. Hero: agencies H-01 giant type, H-23 index, H-07 sphere, H-16 drag canvas, H-20 rotating word; services SMB H-13 split, H-22 film-title, H-21 inline-image type; industrial H-22, H-18 zoom-through, H-02 scrub; real estate H-15 slideshow, H-02 scrub, H-25 split
3. Positioning statement: S-06 scroll-lit or T-03 manifesto (short, <= 40 words)
4. Services overview: F-11 accordion strips, F-13 direction-aware cards, F-05 stack (SIG candidate), F-15 index list (>6 services)
5. Selected work / results: S-10 case cards, G-06 hover list (agency), G-01 horizontal (SIG candidate)
6. Proof: S-01 logos (real), S-04 stacked-photo testimonials, F-12 stats (real, sourced), T-08 awards
7. Process: F-10 pinned steps or F-09 timeline (if not SIG elsewhere; else static `list`-family list)
8. Team teaser (T-01 3-4 people) or founder T-05 (small firms)
9. Insights teaser G-08 (2-3 recent)
10. CTA-01 giant type + magnetic (agency) / CTA-06 split form (B2B) / CTA-07 photo band (hospitality, real estate) / CTA-05 sticky Call+WhatsApp bar on mobile (local services)
11. Footer (FT-01/FT-02/Ft5/Ft6/FT-05; FT-04 only for large corporates)
States: no case studies yet -> replace work with approach + founder note; no logos -> skip S-01.
Mobile: hero CTA and phone/WhatsApp visible; CTA-05 bar for local services; strips F-11 become vertical accordion.
SEO/schema: `Organization` or `LegalService`/`MedicalBusiness`/`ProfessionalService`/`LocalBusiness` (address, geo, openingHours, telephone, areaServed), `WebSite`; H1 = service + audience (+ city for local SEO).
WP: `front-page.php` Flexible Content; services/work/team pulled via relationship fields from CPTs.
**Agency / studio Home variant** (evidence `references/agency-sites.md` §2-3; A median 190 words, work in section 1-2 on 19/23 A/B homes): 1. Header (corner labels / menu button + "Let's talk" pill / N15 superscript index) · 2. Hero, ONE of: H-01/H-26 wordmark or caps statement · G-14 slice strip · G-15 colour-per-project slides · H-16/G-12 work constellation · G-13 reel stage (split pane or full screen) · H-24 WebGL object (`void-stage`, poster fallback) · 3. Selected work 4-9 (G-06 list, staggered `bento` grid, S-10 only for B2B) unless the hero already is work · 4. Positioning line S-06 (≤25 words) · 5. Capabilities as a list (Q-01 accordion rows / F-15 index / F-05 numbered stack; ≤7, each links to filtered work) · 6. Proof: S-12 logo cells + T-08 awards count/table or press quote · 7. Studio chapter (T-06 offices with live local time, team, careers) · 8. G-08 journal 3 items (optional) · 9. CTA-01 giant contact line (`mailto:` as the big link) · 10. Footer (offices, socials; giant wordmark only if the hero is not one). No lead form on Home (A 29% vs C 68%), no KPI strip unless sourced, ≤350 words. Hebrew studios: the Hebrew display face is the signature (israel.md §2), not WebGL.

### CM-02 About  [core]
Sections: H-01 or H-13 hero · T-03 manifesto / T-05 founder letter · F-09 history timeline (real dates) (SIG) · T-04 values (stack or strips) · T-01 leadership · T-08 awards / certifications (real) · T-06 offices (multi-location) · CTA.
SEO: `AboutPage`, `Organization` (foundingDate, founder, numberOfEmployees if public). WP: page + Flexible Content.

### CM-03 Services index  [core]
Purpose: help the visitor find their service. Sections: H1 + intro · services as F-15 index list (grouped by category) or F-01 bento (<= 7) or F-11 strips · "Not sure?" helper: C-45 swipe deck quiz or 3-question selector (optional) · process summary (static) · CTA.
SEO: `CollectionPage` + `ItemList` of services; `BreadcrumbList`. WP: CPT `service` archive (`archive-service.php`) with taxonomy `service_category`.

### CM-04 Service detail  [core]
Purpose: convert a visitor with a specific need. Sections: breadcrumb · H-13 split hero (service name H1, who it's for, CTA) · problem/outcome F-14 · what's included (`list` family or F-01 small bento) · process F-10/F-09 (static if the page already has another SIG) · relevant case study S-10 (1-2) · pricing/fee model P-06 statement if publishable ("Fixed fee from 3,500 ₪ + VAT") · Q-02 service FAQ (5-8) · related services rail · CTA-06 split form with service preselected.
States: no published prices -> "Fees depend on scope" + what affects cost (honest).
Mobile: CTA-05 sticky bar (Call / WhatsApp / Form) for local services.
SEO/schema: `Service` (serviceType, provider, areaServed, offers if price), `FAQPage`, `BreadcrumbList`; H1 = service + (city); one page per service for local SEO.
WP: `single-service.php`; ACF on service: hero media, includes repeater, fee text, FAQ repeater, related cases relationship.

### CM-05 Industries / sectors  [core for B2B, extended otherwise]
Index: grid of sectors (F-13 cards or F-11 strips). Detail: sector hero H-22 · sector challenges (L) · relevant services (links) · sector case studies · certifications relevant to sector · CTA. SEO: `WebPage` + `BreadcrumbList`. WP: taxonomy `industry` shared by services, cases, team; term template with ACF.

### CM-06 Work / projects index  [core for agencies, architects, contractors; extended for services]
Purpose: show range and quality; let visitors filter. Evidence: `references/agency-sites.md` §4 (~45 agency work indexes).
Sections: H1 (small, with total count "Work (48)") · filters by **service and industry** with counts (+ year) + view toggle grid/list · index · load more (PG-02 pattern) · CTA line.
Index variants (pick by project count and direction):
- **A. Filterable grid** (≥12 projects; ~30% of agencies): uniform 2-3 col cards, media 4:3/16:10, title + client + services under, muted video tiles only in view; G-04 + `flip-grid`. Typical of large US/UK design and motion studios.
- **B. Staggered editorial grid** (~20%): 2-col offset or mixed spans (`bento` family), captions 13-15px. Typical of mid-size branding and product studios.
- **C. Text index** (~18%; strongest for 20-200 projects): numbered rows `N° · client · title · services · year`, hover/focus preview image (G-06) or poster-scale rows (G-10). Typical of small award-winning independent studios.
- **D. Slider / slices / per-project slides** (≤12 hero projects; ~17%): G-14 slice strip, G-15 colour slides, G-01 track, H-16 drag canvas (SIG). Typical of freelance developers and small studios with few hero projects.
Rules: every item is a real `<a>` with the client/project name as text; year on every item; filters are `<button aria-pressed>` with counts and update the URL (`?service=web&industry=fintech`) so case meta links can deep-link into them; grid/list toggle remembered per visitor (try/catch storage); no outbound-only portfolio (cards linking straight to client sites, IL C-tier) — link the live site from the case.
States: filter zero results -> clear filters; list view default on mobile; ≤6 projects -> skip filters, use variant D or a 2-col grid.
SEO: `CollectionPage` + `ItemList` of projects, `BreadcrumbList`. WP: CPT `project` + taxonomies `service`, `industry`; `archive-project.php`; ACF on project: card image/video, span, client, year, colour token, short line.

### CM-07 Case study  [core where CM-06 exists]
Purpose: prove capability through one story; the case is a film with captions, not an article. Evidence: `references/agency-sites.md` §5 (162 case pages): A-tier cases are ~72% media by area, median 417 words, 11,000px tall.
Sections (default order, ids in `catalog/sections-content.md` §13):
1. CS-01 case hero: client name H1 60-220px + one-line outcome (variant: giant name · client-colour field · full-bleed photo · sentence-led)
2. CS-02 meta strip: client, year, services, industry, stack, awards, `Website ↗` (live link small and early)
3. CS-03 intro / TL;DR (≤60 words)
4. CS-04 chapters: challenge → approach (2-4 labelled 2-col blocks, ≤90 words each)
5. CS-05 media rhythm ×3-6 (full-bleed → 2-up → caption → video), with CS-06 screens on plate (web work) and CS-07 brand asset sheet (identity work) inside the run; SIG = one of: G-01 horizontal gallery, F-02 sticky media, scroll-in-frame page capture (CS-06)
6. CS-08 results (only real, sourced numbers; else skip)
7. CS-09 client quote + recognition
8. CS-10 credits
9. "Visit the live site ↗" line (if live)
10. CS-11 next project (+ "All work")
Variants: **Showcase** (studio with strong visuals: CS-01 giant name, CS-02 as end column, CS-05 dominates, text ≤300 words; typical of large design partnerships and brand agencies) · **Business case** (B2B/dev agencies: CS-01 sentence-led or caps question, CS-03 TL;DR card, CS-04 Challenge/Solution/Success, CS-08 KPIs, 500-750 words; typical of product/dev agencies incl. Israeli ones) · **Hebrew/IL** (same order, Hebrew labels, real screenshots instead of device mockups, optional Q-04 FAQ for SEO as on some Israeli agency cases).
Rules: no device/browser chrome built from divs (A24); live link shows the launch year; never end on a contact form; motion budget: one entrance on the hero, reveals only on the first full-bleed of each run, videos in view only.
Mobile: galleries become swipe rails; meta strip becomes a 2-col `<dl>`; CS-11 name ≤18vw.
SEO/schema: `CreativeWork` (about: client `Organization`, dateCreated = year, `url` = live site) or `Article`, `BreadcrumbList`, `VideoObject` for films; title "<Client>: <outcome> | <Studio>".
WP: `single-project.php` with its own Flexible Content of CS- layouts (CS-03…CS-10 as layouts; CS-01/CS-02/CS-11 fixed from the project's ACF meta group: client, year, services, industry, stack, live_url, awards repeater, credits repeater, colour token, next_project relationship).

### CM-08 Team (+ person profile)  [core for firms with > 3 people]
Team: H1 + intro · filter by department/role (chips) · T-01 grid (real photos, consistent crop; placeholder silhouettes forbidden, use initials tile if no photo) · join-us CTA to careers.
Profile (law, clinics, consultancies): portrait + name H1 + title + credentials (education, bar/licence numbers where public), areas of practice (links to services), publications, languages, contact button.
SEO: `Person` (jobTitle, worksFor, alumniOf, knowsLanguage) on profiles; `BreadcrumbList`. WP: CPT `team` + taxonomy `department`; `single-team.php`.

### CM-09 Careers + role  [core if hiring, else extended]
Same anatomy as LP-10 (culture, benefits, open roles list, process, role page with apply form). SEO: `JobPosting`. WP: CPT `job`.

### CM-10 News / insights index  [core]
Sections: H1 · featured article (G-08) · category chips (Articles, News, Events, Publications) · list/grid G-08 with dates · pagination · NL-01 subscribe.
SEO: `Blog`/`CollectionPage`, `BreadcrumbList`. WP: posts page `home.php` or CPT `insight`; categories.

### CM-11 Article  [core]
Sections: breadcrumb · H1 + meta (date, author with link to profile, reading time, category) · hero image (optional) · body (70ch; sticky TOC for long legal/guide articles; callout boxes; S-06 pull quote max 1) · author box · related services CTA card (article -> service conversion) · related articles · share.
SEO: `Article`/`NewsArticle`/`BlogPosting` (author as `Person` linked to profile, dateModified), `BreadcrumbList`; `FAQPage` if the article ends with Q&A.
WP: `single.php`; ACF: related service relationship.

### CM-12 Contact  [core]
Sections: H1 + one line · T-07 channels (phone, WhatsApp `wa.me/972…`, email, address with directions link, hours) · T-02 form + map (dotted `map` or static; interactive map lazy on click) · T-06 offices if multiple · parking/accessibility notes for physical visits · FAQ teaser.
States: success -> SH-TY; outside hours -> "We'll reply on Sunday" (Israel week Sun-Thu) computed from hours.
SEO: `ContactPage` + `LocalBusiness` (address, geo, openingHoursSpecification). WP: `page-contact.php`, ACF Options for channels/hours (single source for footer, contact, schema).

### CM-13 Locations  [extended]
Index T-06 + dotted map A-24; location detail: address, hours, photos, services available there, team at location, map, directions. `LocalBusiness` per location. WP: CPT `location`.

### CM-14 Process / approach  [extended]
Signature page for consultancies/agencies: H-01 hero · F-10 pinned numbered steps or F-04 horizontal track (SIG) · deliverables per step (L) · timeline expectations · FAQ · CTA.

### CM-15 Awards & press  [extended]
T-08 awards table by year · press list S-11 with links · media kit download (logos, photos, boilerplate). `noindex` optional.

### CM-16 Resources / downloads  [extended]
Grid of guides/whitepapers (cards with type, pages, date), gated by short form only if the brief requires lead capture; ungated preferred for SEO.

### CM-17 FAQ  [extended; core for law/clinic]
Q-03 categorised searchable accordion + contact CTA. `FAQPage`.

### CM-18 Vertical add-ons  [extended]
- **Real estate unit selector:** building/floor plan SVG with clickable units (buttons with labels), filter by rooms/floor/price/availability, unit detail dialog (plan, area, orientation, price or "on request", download PDF), availability legend with text + colour. Schema `Apartment`/`Offer` only with real data. WP: CPT `unit` with ACF (floor, rooms, area, status, plan image, SVG shape id).
- **Industrial capabilities:** capabilities matrix (L table), certifications (ISO etc., with certificate PDFs), equipment list, stats F-12 (real), safety record.
- **Nonprofit:** donate page (amount pills, recurring toggle, tax-deduction note section 46, secure gateway), impact stats, get involved (volunteer form, events).

### CM-19 Legal set · CM-20 404  [core]
See `_shared.md`. Law firms and clinics add: disclaimer page (no attorney-client relationship via site / medical disclaimer), accessibility statement (mandatory), privacy (patient/client data handling).

## Company build checklist
- [ ] Contact channels, hours and address single-sourced (Options) and identical in footer, contact page, schema.
- [ ] Every service has its own detail page; every case study links back to its services; every article links to one service.
- [ ] Team and work use real people/projects; empty states designed instead of placeholders.
- [ ] Signature moments: Home + (About or Case study or Process); service/detail pages calm and fast.
- [ ] Local SEO: city in H1/title where relevant, `LocalBusiness` schema, Google Business profile link.
- [ ] Mobile: Call/WhatsApp reachable within one tap on every page for local services.
