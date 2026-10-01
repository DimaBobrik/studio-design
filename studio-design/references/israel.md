# Israel / Hebrew web design: what the top tier actually does (scan 2026-10)

Load for any Hebrew or Israeli-market site, after `../directions/_index.md` (Hebrew display axis) and before planning pages. Evidence-based: numbers come from the scan below; rules marked **(judgement)** go beyond it. Site and studio names are withheld; carded examples are cited by case id (`cases/case-NN-*.md`).

## 0. Sample and method
- 58 Israeli web/design agencies (discovered via Clutch/Awwwards/local directories; 57 scanned: home + 2 case pages) and 264 live client sites they built (home only). 1440×900 + 390 captures, 2026-09-30. Per-site rows are not published.
- ~320 sites, 256 usable hero captures, **122 Hebrew-first home pages** (≥30% of display/heading letters Hebrew), ~170 Latin pages (Israeli studios selling to US/EU tech).
- Every capture looked at (contact sheets of all heroes + agency case pages; scroll frames / full pages for ~40). Tiers: **A 11 · B 46 · C 264** (incl. 65 failed captures). Hebrew-first: **A 7 · B 11 · C 104**.
- Feature shares come from raw HTML (curl, n=106 Hebrew / 168 Latin with ≥20 KB HTML) + Playwright computed-style extraction. Regex heuristics: floors, not exact.
- Reading of the sample: the Israeli market is **overwhelmingly template-grade** (86% C). The award signal lives in ~10 studios (Tel Aviv branding and digital studios, a global consultancy's local office, two product/dev shops) plus ~3 more for Latin work. Their Latin work looks like any Webflow/Framer award site; their **Hebrew** work is the scarce evidence this file is about.

The seven Hebrew A-tier home pages, used as examples below: a Tel Aviv branding studio (case-31), a digital bank (case-61), a content agency (case-15), an investment firm on custom WordPress (case-74), a credit-card company (case-33), a design studio on Webflow (case-53), a Lapland travel guide (case-28). Other Hebrew sites mentioned are described by type only.

## 1. Numbers

### 1a. Hebrew display type (largest Hebrew text on the home page, n=122)
| metric | all Hebrew | A+B (17) | A (7) | C (105) |
|---|---|---|---|---|
| size p25 / **median** / p75 (px @1440) | 45 / **60** / 79 | 65 / **88** / 101 | 64 / **88** / 90 | 44 / **58** / 72 |
| max | 200 | 200 (digital bank) | 200 | 137 |
| line-height ratio p25 / median / p75 | 1.0 / 1.0 / 1.14 | 0.98 / 1.0 / 1.2 | **0.9 / 1.0 / 1.0** | 1.0 / 1.0 / 1.13 |
| weights (top) | 700 ×35, 400 ×26, 600, 800 | 700 ×5, 400 ×5, 300 ×2 | 300-900 spread | 700/800/900 = 48% |
| negative tracking | 22% | 35% | 3/7 | 20% |
- A-tier Hebrew display is **~1.5× the template size** (88 vs 58px), sits at lh 0.9-1.0 (bank 0.76 at 200px w900; investment firm 0.9 at 62px w300) and, when tightened, uses **-0.01…-0.02em** (-0.02em @100px, -0.01em @200px, -0.015em @121px, -0.011em @88px). Nobody tracks Hebrew positive.
- Two A-tier voices only: **heavy sans statement** (6 sites: 100/700, 200/900, 64/700, 90, 105/700, 80/600) and **light large sans** (5 sites: 62/300, 88/400, 121/400, 88/400, 190/300). **Zero of 122 Hebrew pages use a Hebrew serif display** (Frank Ruhl/David/Noto Serif Hebrew appear nowhere): a serif Hebrew site is unproven locally and also instantly distinctive (judgement: use it on purpose, not by default).
- Hebrew body: median 17px (Latin IL 16), A/B 16; one A site runs 18px w300 body (too light, don't copy).
- Mobile H1 median on Hebrew A sites ≈ 42-64px.

### 1b. Families
- Superfamilies per Hebrew page: 1 = 37%, 2 = 37%, 3 = 11%, **4+ = 15%** (award scan: 3%). Cause: Latin display + Latin body + Hebrew face + widget fonts (Trustindex, Google Sans from review badges, Poppins/Montserrat for Latin words, Font Awesome). Every A-tier Hebrew site renders 1-2 families + at most one outlier.
- Typical A pairing: one Hebrew display face (often commercial) + one free Hebrew text face (Rubik under Kedem Sans; Assistant under Anomalia/Migdal; IBM Plex Sans Hebrew only).

### 1c. Layout / chrome (Hebrew pages)
| metric | Hebrew all | Hebrew A+B | Latin IL |
|---|---|---|---|
| header height median (px) | 80 | 101 (two-tier banks, 188 incl. open menu) | 69 |
| section padding median (max of top/bottom) | 100 | **144** | 120 |
| home page height median | 6,090 | 7,683 | 6,463 |
| canvas light / dark (first bg) | 69% / 19% | 10 / 4 of 17 | 52% / 21% |
| header position static / fixed / sticky | 63 / 20 / ~5% | 7 / 4 / 3 of 17 | |
- 14 of 122 Hebrew pages ship `<html dir="ltr">` and set RTL lower down (Webflow/Wix builds, incl. two A-tier sites): fine visually, but screen readers and `:dir()` break; always set `dir="rtl" lang="he"` on `<html>`.

### 1d. Platforms
| | Hebrew (106) | Hebrew A+B (15) | Latin IL (168) |
|---|---|---|---|
| WordPress / of which Elementor | **71% / 51%** | 4 / 2 | 42% / 25% |
| WooCommerce | 23% | 1 | 8% |
| Shopify | 6% | 2 | 4% |
| Webflow | 5% | **3** | **25%** |
| Wix (incl. its studio editor) | 4% | 3 | 3% |
| Framer / Next | 1% / 1% | 0 | 8% / 9% |
| GSAP / Lenis | 17% / 8% | 4 / 4 | 17% / 11% |
| Swiper | 59% (C 64%) | 5 | 38% |
- Local market = WordPress + Elementor (+ Woo for stores); Israeli award work = Webflow + GSAP + Lenis or custom WP + GSAP. For a WordPress client the A-tier proof is the investment firm and the branding studio (case-74, case-31): custom theme, not Elementor kits.

### 1e. The Israeli feature layer (Hebrew pages, HTML n=106)
| feature | all | A+B (15) | C (91) |
|---|---|---|---|
| WhatsApp referenced / explicit `wa.me` link (floating button) | 80% / **55%** | 40% / **20%** | 87% / 60% |
| `tel:` link (phone in header/float) | 73% | 47% | 77% |
| accessibility statement link (הצהרת נגישות) | **70%** | 47% | 74% |
| accessibility widget plugin (floating icon) | **57%** | **20%** | 63% |
| lead-form wording or `type=tel` input on home (השאירו פרטים, ייעוץ ללא עלות…) | 61% | 53% | 63% |
| cookie banner | 71% | 60% | 74% |
| agency credit in footer (עיצוב ופיתוח / בניית אתרים) | 45% | 27% | 48% |
| English switch (EN link / hreflang) | ~19% | 4 | 18% |
- Widget plugins found: Ally (Elementor) 19, Pojo One Click Accessibility 15, UserWay 14, Nagish 7, WP Accessibility Helper 6, Enable 3, EqualWeb 3. An overlay is not compliance (SI 5568 / IS 5568 + reg. 35 require the site itself to conform + a statement page); A-tier sites keep the **statement link in the footer** and skip the floating overlay.
- **Local template look** = ≥3 of {WhatsApp float, accessibility overlay icon, neutral Google Hebrew sans display (Assistant/Heebo/Open Sans/Rubik/Noto at ≤72px), lead form/phone in hero}: **53% of Hebrew pages, 58% of C, 20% of A+B; all four at once: 21% (24% of C, 0 of A+B).**
- Dark-purple "AI agency" template (night gradient, glowing pill CTA, stat strip 5.0★/98%/+120, WA + accessibility floats, Google-reviews badge): 8 of 20 Hebrew agency home pages.

### 1f. Israeli e-commerce (30 Hebrew pages with Woo/Shopify signals, home only)
- ₪ on home 21/30; **"משלוח חינם" (free shipping) 10**, free-shipping threshold in a top utility bar ("משלוח חינם מעל X ש"ח", "משלוחים עד הבית"); Israeli gateways named (Tranzila, PayPlus, Meshulam/Grow, iCredit, Pelecard and others) 7; Apple/Google Pay 4; **Bit** 2; installments (תשלומים) 1 on home (it lives on PDP/checkout: "עד 12 תשלומים ללא ריבית").
- Store home anatomy (7 stores: furniture, shoes, optics, coffee, cosmetics, farm produce, home goods): 1-2 utility bars (shipping threshold / club / phone) → header with search + category dropdown → **category icon strip** (cut-out products) → sale banner carousel ("הנחה 40%", "SALE 60%") → product rails of 5 with ₪ price, struck price, % flag → brand-logo strip → club/newsletter signup with phone field (SMS marketing consent) → mega footer + a11y statement + "פותח ע"י". Popups on first view: club signup with 5-10% code (2 fashion stores), age gate for alcohol (2 drinks stores).
- Bilingual product names are a local habit: Hebrew model name + Latin caps model name, "NEW COLLECTION" Latin caps on Hebrew stores (3 stores; the furniture store is case-07): Latin caps are used as the "premium" layer because Hebrew has no caps.
- Holiday-season merchandising is the norm: Rosh Hashana / Sukkot / Hanukkah banners ("חג סוכות שמח").

## 2. Hebrew type: what is used and the free substitute

### 2a. Frequency (home pages, n=122 Hebrew; a site can count twice)
Assistant 35 (29%) · Heebo 17 · Open Sans Hebrew (legacy) 15 · Rubik 13 · Noto Sans Hebrew 13 · Open Sans 12 · **Almoni 11** · **Ploni 7** · IBM Plex Sans Hebrew 6 · **Simpler 4** · Secular One 3 · Absolutik 3 · Leon 2 · Anomalia 2 · Narkiss Block 2 · Polin 2 · Fedra Sans Hebrew 2 · 1 each: Migdal, Kedem Sans, FB Practical, FB Parking, FB Extaza, Tamlil, Balata, Ping Hebrew, Greta, Tel Aviv (+Brutalist cut), Koteretot, Mikhmoret, Sunday, Diplomet, Fomo, OS Luizi Round, doar/ayala, a custom bank face, Wix-hashed customs ×3, Karantina, Varela Round.
- Display face of the largest Hebrew text: free neutral Google sans (Assistant/Heebo/Open Sans/Rubik/Noto/Arimo) **49%** of all Hebrew pages, **2 of 17** A+B. **6 of 7 Hebrew A sites set the display in a commercial or custom face** (Leon, Anomalia+Migdal, Kedem Sans, doar, a custom bank face, a Wix custom); the 7th (case-28) wins with IBM Plex Sans Hebrew at 88px/400 + -0.011em.
- Foundries are confirmed only where the font file says so: AAA = AlefAlefAlef (`*-aaa.woff2`: Almoni, Almoni Neue DL, Almoni Tzar, Ploni, Anomalia, Kedem Sans), FB = Fontbit (Practical, Parking, Extaza, Tamlil, Balata), Typotheque (Fedra Sans Hebrew; Greta, Ping have Hebrew cuts). Others: commercial, foundry not verified.

### 2b. Commercial face → closest free Google face (all verified Hebrew via the CSS API `/* hebrew */` subset, 2026-10-01; compared on a rendered specimen against the live captures)
| commercial face (seen on) | look | closest free face (weights/axes) | second choice |
|---|---|---|---|
| Almoni / Almoni Neue DL (11 sites; one at 190px w300, agency templates) | neutral Hebrew grotesk, wide weight range | **Heebo** 100-900 (straight, closest skeleton) | Noto Sans Hebrew 300-800 |
| Almoni Tzar, FB Practical, FB Parking, Tamlil Condensed (narrow cuts, tier C mostly) | condensed heavy grotesk | **Noto Sans Hebrew** `font-stretch: 75%` 700-800 (wdth 62.5-100) | Open Sans `wdth 75` 700-800; Karantina 700 for poster-narrow |
| Ploni (7; three studios, a shoe store, an events site) | round-shouldered geometric sans | **Rubik** 400-700 | Heebo 500-700 |
| Simpler Pro / Simpler Alte (4; mostly commerce) | compact heavy grotesk for commerce | **Heebo** 800 | Assistant 800 |
| Leon (a branding studio, a digital agency) | wide heavy grotesk, flat terminals | **Noto Sans Hebrew** 800 | IBM Plex Sans Hebrew 700 |
| custom bank face (digital bank) | ultra-heavy wide sans, lh 0.76 | **Heebo 900** at lh 0.82, -0.01em | Noto Sans Hebrew 900 |
| Kedem Sans (content agency, 64px 500/700) | firm humanist-grotesk | **Heebo** 600/800 | Assistant 700 |
| Polin (a B2B site at 105px 700, a cultural institution) | heavy geometric | **Heebo** 900 | Secular One 400 (single weight) |
| Absolutik (3 clients of one studio; one at 121px 400) | light round geometric | **Assistant** 300 | M PLUS 1p 300 (has Hebrew) |
| doar / ayala (investment firm 62px 300 / body 300) | light, slightly mechanical | **IBM Plex Sans Hebrew** 300 | Heebo 300 (body at 400, never 300) |
| Tel Aviv (two real-estate sites, 88px 400) | thin display sans | **IBM Plex Sans Hebrew** 200-300 | Heebo 200 |
| Fedra Sans Hebrew (a university, a nonprofit) | humanist sans | **IBM Plex Sans Hebrew** 400-600 | Assistant |
| Greta, Ping Hebrew (two food/drink brands) | contemporary text sans | **Noto Sans Hebrew** 400-500 | Heebo 400 |
| Narkiss Block (a TV channel, an event site) | heavy blocky headline | **Secular One** | Noto Sans Hebrew 900 wdth 75 |
| Anomalia, Migdal (a design studio, a cultural centre) | experimental cut/stencil display | **no free equivalent**: Secular One or Suez One for weight, or letter the 1-3 display words as SVG | Rubik display variants (Rubik Iso, Rubik Glitch, Rubik Maze) only for playful briefs |
| Gveret Levin (AAA hand, now free on Google Fonts) | marker handwriting | use as is (free) | Playpen Sans Hebrew |
- Full verified Google Hebrew pool: Alef, Amatic SC, Arimo, Assistant, Bellefair, Bona Nova (+SC), Cousine, David Libre, Frank Ruhl Libre, Fredoka (wdth 75-125), **Gveret Levin**, Heebo, IBM Plex Sans Hebrew, Karantina, **M PLUS 1p**, Miriam Libre, Noto Rashi Hebrew, Noto Sans Hebrew (wdth 62.5-100, wght 100-900), Noto Serif Hebrew (wdth 62.5-100), Open Sans (wdth 75-100, wght 300-800), Playpen Sans Hebrew, Rubik + 27 Rubik display variants (Dirt, Iso, Glitch, Maze, Bubbles, Doodle Shadow, Spray Paint, Wet Paint, Marker Hatch, Pixels …), Secular One, Solitreo, Suez One, Tinos, Varela Round. **No Hebrew**: Inter, Montserrat, Poppins, Libre Franklin, Ubuntu (Sans), Rubik Mono One, SUSE, Readex Pro and most Latin-only grotesks.
- If the client owns a commercial licence (common: Almoni/Ploni/Simpler are standard agency kit), use it; the substitutes above are for prototypes and unlicensed builds. Never ship commercial font files you were not given.

## 3. What A-tier Israeli sites do vs the local template

| axis | local template (C, 58-87% of Hebrew pages) | A-tier Hebrew sites (the 7 in §0) |
|---|---|---|
| hero | stock photo or device mockups + centred 44-72px Assistant/Heebo bold + 2 pills, often a lead form or icon strip inside the hero | one 88-200px Hebrew statement, start-aligned (right) or centred, on a flat pale sheet (#e4e7ea, #ebeae8, #e7e7e7) or one graded photo; at most one CTA |
| floats | WhatsApp bubble bottom-left/right + accessibility icon + chat/AI widget + Google reviews badge + cookie bar (up to 5 fixed objects) | statement link in the footer; WhatsApp only where the business is phone-led (the investment firm has a `wa.me` link, no bubble); 0-1 fixed object |
| type | 1 neutral Google sans in 5-6 weights, or 4+ families | 1 commercial/custom display + 1 text face; weight contrast 300 vs 700+ or 900 vs 400 |
| colour | navy/gold or purple gradient + WhatsApp green + orange CTA | achromatic grey/charcoal + one field colour (magenta #fb48c4, orange #e05f3c, red #fe0d18, lavender) |
| proof | stat strip (+120 לקוחות, 98%, 5.0★) + Google reviews widget + logo strip | built proof: topographic project map and social-model diagram (investment firm), live FX-rate cards (bank), card product plates (credit-card company), awards list (two studios) |
| imagery | stock handshake/doctor/laptop, device mockups of the site itself | 3D isometric objects (content agency), cut-paper shapes (credit-card company), grain photography + animal-print texture (bank), drawn grid/topography (investment firm), aurora gradients (travel guide) |
| sections | hero → icon services ×4-6 → about → stats → portfolio slider → testimonials slider → lead form → mega footer | 5-8 sections, each a different device; colour-block section swaps instead of cards |
| footer | 4-5 link columns + logos + "בניית אתרים: <agency>" | giant contact word ("צרו קשר" on a grey semicircle), field footer with cropped wordmark (bank), 80px statement CTA question (branding studio) |
| platform | Elementor kit + Swiper + plugin widgets | custom WP + GSAP, Webflow + Lenis, Wix studio-editor custom |

## 4. RTL craft details (observed)
- **Nav order:** Hebrew logo at the right (start) and CTA/hamburger at the left on nearly every Hebrew capture (visual pass, not measured). Exception worth copying: **Latin wordmarks keep their Latin position** (two sites top-left, one centred), the Hebrew menu still flows from the right. The `צור קשר` pill sits at the far left (end).
- **Arrows:** in RTL "next/forward" points left (←). Template sites mix → and ← in one page (CTA "← לקבלת הצעת מחיר" correct, slider arrows not flipped); A sites flip consistently. Use `.flip-x` on every directional icon and test sliders: in RTL the first slide is at the right and "next" moves content to the right.
- **Carousels:** Swiper on 59% of Hebrew pages; RTL mode (`dir="rtl"` on the container) is frequently missing → reversed swipe and arrows. A-tier pages mostly avoid carousels or use drag rails (studio portfolio rails).
- **Numbers:** western digits, comma thousands (100,000 · 4,500 · ₪12,900); percentages render "%40" in RTL when not isolated (several sites show "%98", "+120" broken): wrap numbers + sign in `<bdi>` or `dir="ltr"` spans; place ₪ after the number in Hebrew copy ("12,900 ₪") as most stores do; phone numbers `dir="ltr"` (03-XXX-XXXX, *XXXX star-codes for call centres).
- **Mixed Latin/Hebrew:** brand names stay Latin inside Hebrew sentences; A sites keep one face that ships both scripts or let the Hebrew face carry Latin. Latin caps act as a premium/collection layer on stores; Latin outlier words appear as a separate voice (a Montserrat English word roll on the travel guide).
- **Bilingual sites:** he/en switch is a text "EN"/"English" link or round "En" pill at the left (end) of the header (3 A sites), sometimes a flag dropdown (template). English versions are usually a separate, thinner site (/en/, en. subdomain).
- **Final letters descend** (ך ן ף ץ ק): at lh <0.9 they collide with the next line; the bank's 0.76 works only because the statement is two short lines with the second cropped. Keep heavy Hebrew ≥0.85 unless you check every line pair.
- No faux-italic, no uppercase transforms: emphasis by weight or colour block (bolding one word; a sentence set in orange on charcoal).

## 5. Common Israeli section patterns (what to keep, what to reshape)
| pattern | share | keep / reshape |
|---|---|---|
| WhatsApp floating bubble | 55% explicit link (C 60%, A+B 20%) | keep the channel for phone-led SMBs (clinics, trades, restaurants, real estate) but design it: a labelled "וואטסאפ" pill in the header or contact section, not a third-party green bubble over content; never cover the a11y icon or the cart |
| accessibility overlay icon | 57% (C 63%) | replace by a built accessibility panel only if the client insists; always ship the **statement page** link in footer (70% do) and build to SI 5568 (see `checklist.md` D2) |
| phone CTA in header | 73% `tel:` | keep for services; set as text with `dir="ltr"`, not a second pill |
| lead form in the hero (name/phone/email + "השאירו פרטים") | 61% have lead wording/tel input on home | move it to its own designed section or a sticky "תיאום פגישה" bar on mobile; one form per page |
| "צור קשר" (contact) | 82% wording | the standard label; A sites use it as a big closing word |
| icon-tile services row (4-6 icons) | most C pages | replace with a list of named services as large rows (e.g. פיתוח / עיצוב ואסטרטגיה / UX/UI / שיווק דיגיטלי, 44px rows with hairlines) |
| stat strip (+500, 15+, $30M) | most C agency/real-estate pages | only with sources; one A site makes numbers a designed hero cell with icons and red emphasis |
| agency credit footer line | 45% | allowed, small, end of legal row ("עיצוב ופיתוח <studio>") |
| cookie banner | 71% | design it in the system (a black/white bar), Hebrew copy, bottom, not a modal |

## 6. Rules for Hebrew sites (actionable)
1. Set `<html lang="he" dir="rtl">` on the root (14/122 don't); never rely on `body{direction:rtl}`.
2. Choose the Hebrew display face first, then the Latin. If no commercial licence: use §2b substitutes; the Hebrew face decides the class in the trio (directions `_index.md`).
3. Hebrew display at 1440: **≥80px for the main statement** (A median 88; C median 58), 120-200px for a single scale shock word/line; mobile 40-64px.
4. Hebrew display lh 0.85-1.0 for heavy weights, 1.0-1.1 for light; never below 0.85 without checking final-letter descenders.
5. Tracking on Hebrew display: 0 to -0.02em at ≥64px (observed on all tightened A sites); 0 for text below 24px; never positive.
6. Pick one voice: heavy statement (Heebo/Noto Sans Hebrew 800-900, Secular One) **or** light large (IBM Plex Sans Hebrew 200-300, Assistant 200-300, Heebo 100-300 at ≥80px). Never a neutral 700 at 48-60px: that is the template.
7. ≤2 families rendered on a Hebrew page (+1 Latin outlier or mono). Audit widget/plugin fonts (Trustindex, Google reviews, chat) that add Poppins/Google Sans.
8. Body 16-18px at weight 400 (never 300 for Hebrew body; 18/300 is thin on Windows), lh 1.6-1.7, measure 50-70 characters.
9. Canvas: pale cool grey (#e4e7ea–#ebeae8 band), white or charcoal; one saturated field colour used as a whole section/footer, not as button confetti.
10. Start alignment = right. Centre only one statement per page; long Hebrew copy is never centred.
11. Mirror every directional icon and slider; test drag direction in RTL (`SD.dir()`).
12. Isolate numbers, %, ₪, phone numbers, Latin brand names with `<bdi>` / `dir="ltr"`; ₪ after the amount; `Intl.NumberFormat('he-IL')`.
13. No floating overlay stack: at most one fixed object besides the header (cart drawer button on stores, or a contact pill on services). WhatsApp as a designed link; accessibility statement in footer; cookie bar in-system.
14. No lead form in the hero unless the brief is a pure lead-gen landing page; then the form is the hero's designed object (labels, error summary, consent checkbox text in Hebrew).
15. Proof is built, not counted: maps, diagrams, real lists (awards, certifications, projects), live data. No "+120 לקוחות מרוצים" strips without a source.
16. Latin wordmarks may keep left placement; the Hebrew menu still starts at the right. State it in DESIGN.md so nobody "fixes" it.
17. Bilingual: EN switch as a short text link at the header end; build the English page from the same system (not a thinner template).
18. Stores: utility bar with the real free-shipping threshold ("משלוח חינם מעל ₪X"), category strip as the first content (cut-outs on the canvas, not icons), ₪ prices with struck price + % flag, installments + Bit/Apple Pay/Google Pay badges on PDP and checkout (not on home), club signup with SMS consent, age gate only when legally required.
19. Holidays: plan a swappable seasonal banner slot (ACF) rather than a carousel of promos.
20. Accessibility statement page (הצהרת נגישות) and privacy/terms are part of the core page set for every Israeli site (pages/_shared.md legal pages).
21. Imagery: avoid stock with Israeli-business clichés (handshake, gavel, doctor with stethoscope, laptop mockups of the site). Built objects (isometric 3D, cut paper, drawn maps/grids) are what A-tier Hebrew sites use.
22. Footer: one designed closing move (giant contact word, field footer with cropped wordmark, statement CTA), legal row with statement link + agency credit small.

## 7. Award-level Israeli skeletons (start points, then apply a direction)

**Store (WooCommerce/Shopify, Hebrew)**
1. Utility bar 32-36px: real free-shipping threshold · club · phone (`dir=ltr`).
2. Header 72-80px: logo right · category menu (mega with images) · search field visible on desktop · account/wishlist/cart left; EN link if bilingual.
3. Hero: category words or one campaign image + 88-120px Hebrew line (or a Latin collection word as outlier), one CTA "לקולקציה".
4. Category strip: 6-10 cut-out products on the canvas with Hebrew labels (the local habit, done well).
5. Product rail / editorial grid (gap 2-12px): Hebrew name + optional Latin model name, ₪ price after, struck price, one flag style.
6. One story section (maker, materials, showroom video) in a colour-block band.
7. Service proof row as text, not icons: delivery time, installments "עד 12 תשלומים", returns, showroom address.
8. Club signup (email + phone, SMS consent) as a designed band, not a modal on load.
9. Footer: columns + accessibility statement + payment badges (Bit, Apple Pay, Google Pay, cards) + credit.

**Landing (lead-gen / single offer)**
1. Header 64-72px: logo right · 2-3 anchors · phone text + one CTA left.
2. Hero: 88-140px Hebrew statement start-aligned, one sentence of copy, one CTA; built visual (diagram, object, map) to the left.
3. Problem → method as a drawn sequence (a pill/node diagram, a model diagram).
4. Proof built from real material (projects, map, client logos with permission, testimonials with names and video).
5. Offer / pricing as a comparison table ("us vs others" table, seen on one studio site) if the market is comparison-driven.
6. FAQ as + rows.
7. Lead form section: labels, error summary, Hebrew consent copy, `type=tel` with `dir=ltr`; sticky mobile CTA bar "תיאום שיחה" instead of a WhatsApp bubble.
8. Footer: statement CTA + statement page link.

**Company (agency, real estate, finance, institution)**
1. Header: Latin or Hebrew wordmark, minimal menu ("צרו קשר" + hamburger), EN link.
2. Hero: one heavy or light Hebrew statement 90-200px on a flat sheet, or a graded photo/film band with light Hebrew 88px.
3. Work/projects: drag rail or map (a pinned topographic map with project pins) instead of a slider.
4. Services as large text rows with hairlines, or colour-block chapters.
5. Model/method diagram or data cell (three sourced numbers in one cell).
6. People/careers as a short imperative statement + open roles link.
7. Media/articles as a 3-up list with dates.
8. Closing: 80px contact statement → footer with statement link.

## 8. Directions that fit Israeli briefs best (from this scan)
- Heavy Hebrew statement on a pale sheet (5 sites: branding studio, bank, content agency, credit-card company, a B2B site): now its own direction `kikar-heavy` (Noto Sans Hebrew 900 at 166-200px on #e4e7ea, built objects, one field colour; specimen `directions/_specimens/kikar-heavy.html`); cooler alternatives `swiss-signal-grid` (heavy lowercase grotesk, Heebo) and `billboard-type` (field, condensed).
- Light large Hebrew over graded photography (travel guide + 2 real-estate sites): `atmospheric-sky`, `film-title-bands` (use the light Hebrew voice, not tracked caps).
- Drawn grid / data / map (investment firm, a museum report case-45): `cell-ledger`, `swiss-signal-grid`.
- Colour-block + built objects (content agency, credit-card company): `organic-colour-block`, `inflatable-pop`.
- Hebrew serif: untested locally (0/122): `herbarium`, `broadsheet-duet`, `organic-colour-block`, `apparatus-night` with Frank Ruhl Libre are a real differentiator for law, publishing, food heritage and culture briefs (judgement).
