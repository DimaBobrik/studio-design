# Patterns across scanned award / reference sites

Two scans: **Mass scan 2026-09 (n≈200)** below (30 carded sites + 170 gallery sites, home page only) and the original **30-site deep scan** (home + inner pages) after it. The 30-site findings remain the detailed reference; the mass section says which of them hold at scale. Site names are withheld; carded sites are cited by case id (`cases/case-NN-*.md`, see `_index.md`).

## Mass scan 2026-09 (n≈200)

Source: ~170 sites from award-gallery lists (87 ecommerce · 37 landing · 53 company) + the 30 deep-scan sites. Desktop 1440×900 + mobile 390, **home page only**, captured 2026-09-30; 21 desktop captures re-shot the same day. Every site was looked at (contact sheets of hero + 4 scroll frames + mobile; full pages for ~45) and tiered: **A** = SOTD-level (52 incl. 27 of the 30), **B** = good (92), **C** = weak/template or broken capture (60). Per-site rows are not published; only these aggregates and the anonymized cards.

Aggregation: computed-style extraction per site, visual overrides for canvas/hero typing, 21 unusable captures dropped (bot challenge, upstream failure, login wall, unstyled, preloader-only) → **n = 181 with type data**; 3 sites whose display type is an image/SVG are excluded from display metrics. Sample bias: the gallery list is Shopify-heavy (58% of its ecommerce sites), so "all" leans toward DTC commerce; the **A column is the award signal**.

Heuristic caveats (read before quoting): `display` = largest text on the home page (hero OR chapter word OR footer wordmark); `H1` = largest computed `<h1>` ≥24px (smaller H1s are logos/SEO); `families` = superfamilies (weights, optical sizes, widths and system fallbacks merged); `gsap`/`three` are window globals, so bundled builds hide them (floors, not shares); section counts come from DOM landmarks (unreliable on Shopify/Next wrappers, use the visual counts in §5).

### M1. Numbers (all n=181 · tier A n=52 · the 30-site figure for comparison)

| metric | all | tier A | 30-site (2026-09) | verdict |
|---|---|---|---|---|
| H1 ≥24px at 1440, p25 / **median** / p75 | 40 / **64** / 90 | 58 / **76** / 120 | curated hero 64 / 80 / 110 | A confirms ~80; the broad sample sits at 64 (4.4vw) |
| largest text on home, median · share ≥160px · ≥200px | 70 · 13% · 9% | 87 · 18% · 12% | 101 (home+inner) · 30% · 20% | confirms "one scale shock", rarer on home-only |
| display line-height (lh/size) median, caps · sentence ≥48px | 0.95 · 1.00 | 0.92 · 1.00 | 0.80-0.90 caps · 1.0-1.1 | caps lh 0.8-0.9 only on half (range 0.7-1.15) |
| display tracking: caps at 0 · caps negative · sentence ≥48px negative | 51% · 34% · 57% | 52% · — · 58% | caps always 0 | **partly contradicts**: a third of caps displays tighten -0.01…-0.06em |
| all-caps display share | 23% | 41% | 37% | caps is an award marker, not the norm |
| display weight 400 share · 300 or lighter · 700+ | 52% · 10% · 14% | 35% · 15% · 29% | 26% · 22% · 30% | regular weight is the new default |
| superfamilies per site 1 / 2 / 3 / 4+ | 43% / 37% / 17% / **3%** | 38% / 44% / 17% / **0%** | 9 / 12 / 8 / 0 | **confirms ≤3** (all 4+ sites are tier B/C) |
| body size p25 / median / p75 (px) | 14 / 16 / 18 | 13 / 15 / 18 | 14 / 16 / 18 | 24% of all (36% of A) run body <14px, mostly fashion/luxury: still don't copy |
| canvas light / dark / field / mixed | 61% / 25% / 9% / 4% | 50% / 29% / 12% / 10% | 47 / 23 / 13 / 13% | light-first holds; field + mixed = 22% of A |
| accent-less (0 chromatic accents) | **54%** | **48%** | 45% (13/29) | **confirms** "often zero" |
| accents 1 / 2 / 3+ | 25% / 12% / 10% | 31% / 12% / 10% | 28 / 17 / 10% | one accent max holds for ~80% |
| radius system 0 / soft (3-40px) / pill | 29% / 47% / 23% | 37% / 37% / 25% | 31 / 41 / 24% | three systems, all common; mixing is the fault, not the choice |
| template card shadow (one layer, blur 12-48, y 2-24, α .05-.2, ≥3 elements) | **1.7%** (3) | 1.9% (1) | 0/30 | **confirms** (3 SaaS/agency landings) |
| box-shadow: none at all · rings only · other (modal, glow, stacked) | 67% · 6% · 25% | 75% · 4% · 19% | 59% · 3% · 34% | depth by overlap and photography |
| section padding (max of top/bottom), p25 / median / p75 | 56 / **96** / 144 | 56 / **108** / 128 | 67 / 113 / 170 | **lower than the 100-170 rule** at the median: ecommerce 71, landing 120, company 96 |
| smallest grid gap per site p25 / median / p75 | 3 / **5** / 8 | 2 / 5.5 / 10 | 2 / 4 / 8 | **confirms** dense walls 2-12px |
| header height p25 / median / p75 | 48 / **72** / 90 | 44 / 72.5 / 96 | 64 / 80 / 118 | slightly lower; fixed 33% · static 31% · sticky 12% |
| home page height median (px) | 7,763 | 10,298 | 11,301 | A pages are ~1.3× longer |
| mobile H1 median | 32 | 38 | ~48 (curated) | mobile/desktop ≈0.5 |
| max-width container median | 1,224 | 1,280 | 1,100 | wider; many full-bleed |

### M2. By site type (all tiers)

| | ecommerce (90) | landing (42) | company (49) |
|---|---|---|---|
| H1 ≥24 median (p75) | 48 (80) | 65 (90) | 71 (120) |
| largest text median | 64 | 74 | 80 |
| body median | 15 | 16 | 16 |
| section padding median | **71** | **120** | 96 |
| canvas light / dark / field | 72% / 16% / 9% | 52% / 36% / 10% | 49% / 35% / 8% |
| accent-less | 56% | **36%** | **65%** |
| radius 0 / soft / pill | 36 / 46 / 18% | **7** / 57 / **36%** | 37 / 41 / 20% |
| superfamilies 1 / 2 / 3 / 4+ | 36 / 40 / 18 / 6% | 38 / 38 / 24 / 0% | 59 / 31 / 8 / 2% |
| all-caps display | 26% | 19% | 20% |
| Lenis · Swiper · GSAP (global) | 17 · 23 · 7% | 24 · 21 · 14% | **45** · 6 · 16% |
| canvas/WebGL element · video · custom cursor · marquee | 10 · 44 · 34 · 23% | 36 · 48 · 40 · 33% | 45 · 49 · 41 · 24% |
| platform: Shopify · WordPress · Webflow · Framer · Next | **58** · 12 · 1 · 3 · 20% | 0 · 7 · 21 · 0 · 26% | 0 · 8 · 20 · 6 · 14% |

Reading: commerce is lighter, tighter (71px sections, 48px H1s: the product grid is the hero), Shopify-built and accent-less; landings carry the accent (64% have one), the pill radius and the largest share of WebGL; company/studio sites are the most restrained in colour and families (59% one family) and the heaviest users of Lenis and custom cursors.

### M3. Libraries (all · A)
Lenis 26% · 37% · Swiper 18 · 15 · Next 20 · 23 · Webflow 11 · 17 · Shopify 29 · 13 · WordPress 10 · 15 (WooCommerce 3 · 6) · GSAP global 11 · 21 (ScrollTrigger 8 · 13, SplitText 6 · 13) · Framer 3 · 0 · Lottie 3 · 4 · Barba/Swup 4 · 8 · locomotive-scroll 2 · three.js global 1 (but a `<canvas>` is on 25% · 29%, so WebGL ships bundled) · video 46 · 46 · custom cursor 38 · 42 · marquee 26 · 21. **Tier A is where Lenis + GSAP concentrate**; Shopify tier-A sites exist (5 DTC food/drink/apparel brands) but are custom themes.

### M4. What the 200 confirm / contradict in the 30-site findings and the SKILL.md non-negotiables
Confirmed at scale:
- Achromatic first (#2 NN, finding 14): 54% accent-less, A 48%; one accent max on ~80%.
- ≤3 families (#3 NN): 3% use 4+, none in tier A.
- No template card shadow (#6 NN): 1.7%.
- Dense grids (#5 NN): smallest gap median 5px.
- Radius systems (#6 NN): each site has a dominant one; 0 / soft / pill all common.
- The giant word is not the H1 (finding 2): largest text median 70-87px vs H1 64-76px; 13% set ≥160px on the home page alone.
Contradicted or needing a range:
- **Hero ~80px (#4 NN)**: true for tier A (76 median) but the broad sample is 64px (4.4vw); commerce 48px. Suggested wording: "hero display median 64-80px at 1440 (4.4-5.6vw); commerce heroes are smaller (~48px) because the product carries them".
- **Caps tracking 0 (#4 NN, finding 3)**: 51% of caps displays are at 0, **34% are tightened -0.01…-0.06em** (heavy grotesk/condensed caps: e.g. a B2B SaaS landing, a cultural venue and two DTC brands), 15% opened. Caps lh median 0.95 (half at 0.8-0.92, half 1.0-1.15). Suggested: "caps: tracking 0 (condensed/heavy may go to -0.03em), lh 0.8-1.0".
- **Section padding ~100-170px (#5 NN)**: median 96 (all), 108 (A); ecommerce median 71. Suggested: "section padding ~90-170px (commerce 60-120)".
- **Body ≥16**: 24% of all sites run <14px body; still a failure we don't copy (unchanged guidance).

### M5. Hero archetypes seen (tier A+B, n=144, from the visual pass; catalog ids)
H-22 film/photo band with overlaid type 35 (24%) · H-01 giant editorial type / wordmark 20 · H-23 index/catalogue/grid-as-hero 16 · H-13 split text/media 14 · H-24 object on plinth / 3D scene 14 · H-21 inline-image typography 7 · H-25 diptych 6 · H-05 product UI 6 · H-19 bento/cell grid 6 · H-14 product-on-colour 4 · H-16 drag/scatter canvas 3 · ≤2 each: H-02, H-03, H-04, H-07, H-08, H-09, H-12, H-15, H-17, H-20. New since the 30: **H-26 masthead wordmark + object** (6 sites: a drink DTC, a branding studio, a textile house, three craft/home brands), **H-27 cell-grid hero** (4 sites: a search firm, two designer portfolios, a studio) → `catalog/sections-hero-nav.md`.

### M6. Recurring looks (tier A/B counts; which direction covers them)
| look | A/B sites | covered by |
|---|---|---|
| film band + small light line (lifestyle DTC, beauty, apparel) | ~22 | film-title-bands / none → **attractor A11** |
| near-empty light sheet + one centred/low sentence | ~12 | whisper-studio → **attractor A9** |
| rounded inset media sheet as hero | ~10 | machined-soft → **attractor A10** |
| giant wordmark as masthead or footer | ~15 hero + ~14% of footers | billboard-type, swiss-signal-grid → **attractor A12** |
| page as bordered cells, dithered/halftone art, colour panels | 6 (3 A) | none → new `cell-ledger` |
| pantry/packaging DTC: retro display serif or heavy caps, line mascots, flat plates | 7 (1 A) | organic-colour-block partly → new `pantry-label` |
| black-void 3D showroom with HUD corners | 6 (3 A) | apparatus-night partly → new `void-stage` (guarded) |
| diptych luxury (two photos + name on the seam) | 7 | cold-chrome-luxury, couture-condensed (H-25) |
| saturated single-field venue/brand poster | 6 (2 A) | billboard-type |
| mixed-voice serif caps + italic lowercase | 5 | estate-didone, broadsheet-duet (knob) |
| mono spec-sheet commerce / hardware | 5 (2 A) | industrial-catalogue, telemetry-terminal |

---

# 30-site deep scan (2026-09)

Source: computed-style extraction + screenshots of 30 award/reference sites (captured 2026-09-30, desktop 1440x900, mobile 390), home + inner pages. Canvas classification and hero/nav/footer typing are from looking at the screenshots (heuristics are unreliable for those). Per-site detail: the case cards in `cases/`; table: `_index.md`.

The 30 (case ids in brackets): **ecommerce 12** — a fashion e-store (70), a charity merch store (50), a single-product WooCommerce store (21), a collectible-furniture store (51), a smart-ring wearable brand (55), an Italian sneaker brand (56), a design-object audio-hardware brand (75), a synth hardware launch (76), a tea brand (80), a children's book club (01), a quiet-luxury leather-goods store (65), a packaging manufacturer (88); **landing 10** — an AI-infrastructure SaaS (12), an animation-library site (27), an AI video product (30), a motion-design SaaS (37), an agriculture research nonprofit (40), a racing driver's site (41), an issue-tracking SaaS (42), a retro desktop-metaphor brand (66), a polar luxury-travel operator (86), a fintech card launch (52); **company 8** — a design studio (08), an agency (43), a WebGL studio (44), a logistics company (81), a Mexican industrial group (14), a residential development (20), a large design partnership (60), an architecture practice (71).

Scan gaps: the design studio (desktop home failed), the WebGL studio + the furniture store (preloader/blank only), the desktop-metaphor brand (mobile only), the industrial group (hero only, virtual scroll). Treat their numbers as data-only.

---

## 1. Numbers

### 1.1 Display type at 1440px

Hero headline (H1 or the hero's display line, curated per site; 27 sites, excludes 3 whose hero type is image/SVG):

| stat | px | vw at 1440 |
|---|---|---|
| min | 40 (audio-hardware brand) | 2.8 |
| p25 | 64 | 4.4 |
| **median** | **80** | **5.6** |
| p75 | 110 | 7.6 |
| max | 173 (residential development) | 12.0 |

Sorted: 40, 52, 56, 56, 60, 64, 64, 67, 73, 76, 76, 76, 80, 80, 85, 86, 96, 97.5, 98, 98, 110, 118, 120, 122, 140, 144, 173.

Largest text anywhere on the site (home + inner pages, from `bigText`): median 101px; **9/30 sites set something ≥160px and 6/30 ≥200px** (residential development 349 on a chapter word, polar-travel operator 320 on a route code, racing driver 309, WebGL studio 245 on a section title, tea brand 230 on an inner-page title, motion SaaS 200 on a stat, plus smart-ring brand 192, industrial group 188, single-product store 169). The giant word is almost never the H1 - it is a chapter word, a stat, a route code or an inner-page title.

- Line-height of display (lh / size): p25 0.90, median **1.00**, p75 1.05; range 0.80-1.15. Uppercase display runs 0.80-0.90 (fashion store 0.80, industrial group 0.80, residential 0.87, tea brand 0.90, agency 0.90, leather goods 0.92). Nobody uses >1.15 on a headline.
- Tracking: median -0.008em; p25 -0.024em; min -0.05em (smart-ring brand light serif -5.5px at 110px; AI-infra SaaS -0.05em on 57-73px H2). **All-caps display is tracked 0** (5 sites: fashion, agency, logistics, leather goods, polar travel) - negative tracking is reserved for lowercase/sentence case.
- Case: 37% of display headlines are all caps.
- Display weights: 400 (7), 700 (6), 300 (5), 600 (3), 800 (2), 500 (2), 510 (1), 200 (1). **Light (200-300) display on 6/27** (smart ring, AI-infra SaaS, leather goods, architecture practice, audio hardware, packaging) - a real alternative to bold.

### 1.2 Mobile (390px)
- Hero H1 on mobile: 37-90px, median ~48px (where the H1 is the display element: 45, 46.8, 48, 49.9, 50.4, 52, 64, 66.6, 90).
- Mobile/desktop ratio median **0.58** (range 0.40 architecture practice - 0.83 fashion store). Line-height stays at or below desktop (book club keeps 0.8, single-product store 0.87).
- Mobile page heights shrink vs desktop in 11/24 sites (content hidden on mobile: audio hardware 15,233 -> 2,993; leather goods 5,693 -> 3,851).

### 1.3 Families, sizes, body
- Families per site: **1 family: 9 sites · 2: 11 · 3: 9 · 4+: 0** (the desktop-metaphor brand loads several pixel faces, still one per role). No award site uses 4 families.
- Typical 2-family pairs: grotesk + mono (7 sites: SaaS, hardware, fashion, furniture), serif display + grotesk body (5: nonprofit, smart ring, racing driver, residential, polar travel), condensed display + grotesk (3: fashion, tea, polar travel).
- Distinct font sizes (used ≥2x) on home: median 10 (p25 6, p75 12). Scales are often on a unit grid: 14.4px x {1, 3, 10} (WebGL studio), 14.4 x 1.2^n (tea brand), 13.2 x 1.2^n (audio hardware); two sites use rem-fluid roots (13.33 / 26.67 / 53.33 px).
- Body size: median 16px (p25 14, p75 18); range 11 (fashion caps) to 26.5 (SaaS body-lg). 7/27 run body <14px - all fashion/luxury/data UIs, all fail comfortable reading; do not copy.
- Weight sets: 1 weight only on 4 sites (a 400-bold face, a 300, a 500, a 400). Variable fonts with odd weights appear (510/590, 475/725, 250).

### 1.4 Colour
- Canvas (visual): **light 14 · dark 7 · field (saturated colour canvas) 4 · mixed dark/light bands 4 · unknown 1**. By type: ecommerce light 8/12; landing dark 5/10; company mixed.
- Chromatic accents (distinct saturated colours used ≥3x): 0 accents on 13 sites, 1 on 8, 2 on 5, 3+ on 3 (book club, issue-tracker UI states, tea brand). **Achromatic + photography is the most common award palette**, not "one neon accent".
- Near-black is never #000 for text on light (#1a1a1a, #1d1d1b, #19171c, #151515, #172b76 navy, #4d3016 brown, #17233b navy) - but #000 is used as a canvas for bands (8 sites).
- Recurring off-whites: #f7f1e8, #f9f8f6, #fbf8f0, #fffdf5/#f7f4e9, #f3f3ec, #fff9f7 - the warm off-white is the most common light canvas, which is exactly why it is on the antipattern list; cool alternatives seen: #f6f8f7, #eaebe5, #ebf0ed mint-grey, #edefef, #eef2f5 slate.

### 1.5 Shape
- Radius system (dominant non-circle radius): **soft 4-40px: 12 · 0/≤2px: 9 · pill-dominant: 7**. Radius ≤8px dominates even "soft" sites (5px, 3.3/6.7, 4/8, 4). Large radii (24-50px) appear only as section/sheet corners (32, 24, 40-50, 24, arches 720).
- Box-shadows: none at all on 19/30 home pages; the other 11 use 1px inset rings as borders (4 sites), ultra-soft stacked lifts (3 sites at 1-5% alpha), a glow (1) or modal shadows (2). A classic `0 10px 30px rgba(0,0,0,.1)` card shadow appears on 0/30. Depth comes from overlap, blur, photography and 3D.
- Section corners: 6 sites round only the top or bottom corners of whole sections (`0 0 24px 24px` book club; `32px 32px 0 0` SaaS sheets; `40px 40px 0 0` charity store inner sheet; `0 0 80px 80px` motion SaaS; residential arch `720px 720px 0 0`; smart-ring last band).

### 1.6 Layout metrics
- Content max-width where a container exists: median 1100px, range 640-1440; but **12/30 are effectively full-bleed** (1440/1728/2000/2640 containers with 12-40px gutters: design partnership 1728, architecture practice 2640, issue tracker 1436, tea brand, fashion store, agency 1600).
- Text columns are narrow: 332-560px typical (486, 400-480, 449, 550, 480).
- Section vertical padding (non-zero, from computed styles): p25 67px, median 113px, p75 170px, max 315px. Asymmetric top/bottom paddings are common (220/160, 32/256, 113/33).
- Gaps: grids use tight gaps 2-12px (2-6, 5-10, 8-12, 2) - product and project walls are dense, air goes between sections, not between cards.
- Header: height median 80px (p25 64, p75 118, range 30-146); fixed 13, static 6, sticky 3, absolute/corner-only 3+. Utility strips above nav on 6 sites (logistics tracking/calculator, sneaker + synth + nonprofit + animation-library announcements, AI-video badges).
- Home page height: median 11,300px desktop (p25 6,800; p75 15,200; max 35,143 charity-store story). ≈ 12.5 viewports.

### 1.7 Libraries and runtime
- Lenis 43% (13/30) detected as global; GSAP global 23% but ScrollTrigger pinning (`.pin-spacer`) visible on more (fashion store, fintech card, racing driver) - effectively **~16/30 have visually confirmed pinned scroll sequences**.
- Platforms: Webflow 6, Next.js 7, WordPress 6 (3 with WooCommerce), Shopify 3, custom 8. **WordPress/Woo sites reach SOTD** (5 sites: fashion store, charity store, single-product store, packaging maker, nonprofit) - the platform is not the ceiling.
- Video on 21/30 (70%); canvas/WebGL on 11/30 (37%); custom cursor 41%; marquee 28% (announcement or keyword bands, never logo walls); Barba/Swup page transitions 5/30; Swiper 6/30; Lottie 1.
- Preloader observed on 2 (WebGL studio digits, racing driver), cookie/geo modals obstruct 11/30 captures.

### 1.8 Sections
- Visually counted home blocks: ecommerce 6-11 (median 8), landing 8-15 (median 10), company 6-17 (median 9).
- 17/30 alternate canvas colour between sections (dark/light bands or pastel sequence); 8 keep one canvas throughout (design partnership, architecture practice, issue tracker, leather goods, furniture store, audio-hardware light cells, AI video, animation library).

---

## 2. Hero patterns (frequency)

| pattern (catalog id) | count | sites |
|---|---|---|
| Full-bleed photo/video film band with overlaid type (H-22) | 6 | smart ring, leather goods, sneakers, industrial group, residential, design studio |
| 3D / WebGL object or scene (H-24, H-17) | 6 | fintech (card on plinth), AI-infra SaaS (ribbon), logistics (globe), racing driver (signature + helmet), WebGL studio, synth launch (floating render) |
| Type is the hero (H-01, split wordmark, kinetic word) | 5 | agency, tea brand, fashion store, animation library, charity store |
| Split text / media or text over photo with routing tiles (H-13) | 4 | nonprofit, single-product store, book club, packaging maker |
| Quiet statement + collage / empty sheet | 4 | architecture practice, design partnership, polar travel, furniture store |
| Product UI or promo bento as hero (H-05, H-19) | 3 | issue tracker, motion SaaS, AI video |
| Illustration / campaign poster | 1 | audio hardware |
| OS / environment | 1 | desktop-metaphor brand |

Hero knobs observed: H1 anchored bottom-start (9), centred (9), top-start (7), split around a centre object (3). **Hero CTAs: 0-1 buttons on 17/30**, 2 buttons only on SaaS/B2B (4 sites). 6 heroes have a secondary "exit" element: product card on the film (leather goods), exit thumbnail cards (industrial group), segment tiles (packaging maker), next-race card (racing driver), HUD stat (industrial group), notification chips (fintech card).

## 3. Nav and footer archetypes

Nav: corner-only / no bar (N10) 9 · classic three-part bar (N2) 11 · floating pill/tiles (N3) 4 (synth launch, sneaker logo tile, book-club chips, SaaS pill group) · centred luxury wordmark (HD-03) 2 (leather goods, smart ring-ish) · pictogram tiles 1 (audio hardware) · system bar 1 (desktop-metaphor brand) · Mad-Libs filter sticky 1 (design partnership).

Footer: giant wordmark / mega word (FT-01) 9 · dark sitemap + newsletter (FT-04/Ft7) 10 · minimal line (Ft2) 3 · statement close (Ft5) 4 (fintech, racing driver, logistics, SaaS CTA-footer). A **"next page" or CTA band right before the footer** appears on 12/30.

---

## 4. What award sites do that templates don't (21 findings)

1. **One idea per section, then change the canvas.** 17/30 switch background between sections (dark band, pastel plate, sheet). Templates keep one canvas and separate with padding. Examples: light sheets over a dark stage (AI-infra SaaS); three themes on one site (residential); colour cards (book club).
2. **The giant type is not the H1.** Hero H1s sit at a modest median 80px (5.6vw); the 200-350px moment is saved for a chapter word, stat or code mid-page (349 chapter word, 320 route code, 200 stat). Plan one "scale shock" per page, below the fold.
3. **Caps display = tracking 0 and line-height 0.8-0.9; sentence-case display = -0.01 to -0.05em and lh 1.0-1.1.** Never the template's default 1.2 on headlines.
4. **Two-tone text replaces bold.** Grey continuation of a black sentence (issue tracker, architecture practice place name + grey description, logistics two-line caps claim, SaaS second line in magenta). Hierarchy by value, not weight.
5. **Mixed-voice headlines**: serif and grotesk alternate within one line (racing driver), or script word inside didone caps (residential), or condensed word + small bracket modifier "WORD (MODIFIER)" (fashion store).
6. **The product or subject is a recurring protagonist**, reframed each act: the fintech card (plinth -> gallery -> tray), the tea brand's word stack, the racing driver's signature, the logistics trucks driving across bands. Templates show the product once in the hero.
7. **Proof is the real artefact, not an icon row**: benchmark bars and region maps (SaaS), tasting-profile bars (tea), certification list (packaging), drive-time line (residential), live clocks (fintech), impact numbers inside case accordions (design studio). Icon+3-words feature grids appear on 0/30 award sites except as line-icon service lists on black (logistics).
8. **Navigation is written, drawn or placed**: a Mad-Libs sentence filter with bracketed choices (design partnership), pictogram drawers (audio hardware), a logo tile (sneakers), category words as the home headline (leather goods), segment tiles in hero + footer (packaging).
9. **Hero exits**: the first screen contains the second click (product card over film, exit thumbnails, industry tiles, next-race card). Templates end the hero with a scroll cue.
10. **Dense walls, generous gaps between sections**: product/project grids at 2-12px gaps, sections 110-220px apart. Templates do 24-32px gaps and 80px sections everywhere.
11. **Captions carry the brand voice**: codes and brackets (object codes like `M_013 Chair_Name`, plugin names in braces `{ScrollTrigger, SplitText}`, fake filenames like `place93.wmv`, `[ SEE ALL ]`, coordinates). Metadata is designed, not default grey text.
12. **One material divider used everywhere**: torn paper (2 sites), ledger rules (nonprofit), visible 12-col grid lines (polar travel), arches (residential). Templates use nothing or random shapes.
13. **Colour as taxonomy or as action, never decoration**: 5 hues map to 5 plugin families (animation library); cobalt = brand + buy (sneakers); neon green = BUY NOW only (synth launch); blue = primary CTA only (smart ring); green only on CTA band + logo (packaging).
14. **Achromatic-first palettes**: 13/29 have zero chromatic accent; colour arrives through photography. The "dark + one neon" palette appears on only 3 (AI video, issue-tracker states, racing driver) - it's an attractor, not the award norm.
15. **Radius restraint**: 19/30 use either no radius or a median component radius ≤8px; big radii only on whole sections/sheets. No site mixes pill buttons with 24px cards and 12px inputs randomly.
16. **Owned media modules inside commerce**: a TV channel + studio series (synth launch), book notes (book club), creator stories (charity store), journal/recipes (tea brand), press + science (smart ring). The store feels like a publication.
17. **PDP as a story + a buy module**: long pinned walkthroughs (15k px synth PDP, 5k fashion PDP), floating/sticky buy card with a bundle checkbox (synth), creator card (charity store), delivery date + returns rows computed (sneakers, packaging), separate story and store PDPs (audio hardware).
18. **PLP breaks its own grid**: editorial banners inside the grid (leather goods), promo/info cards as grid cells (packaging delivery + rewards), mid-grid wordmark band (fashion), model index as typography (sneakers), IMG/TXT toggle (furniture).
19. **A pre-footer band on every page** (next page, CTA, sales office) and a footer that is a statement or a giant mark, not a 4-column link dump (9 giant wordmarks, 4 statement footers).
20. **Motion is concentrated**: pinned sequences on ~16/30 but usually 1-3 per page; marquees only for announcements/keywords/CTA strips (never logo walls); page transitions on 5. Hover-everything and fade-up-everything is absent from the strongest sites (the architecture practice, the design partnership and the audio-hardware brand have almost no motion).
21. **Failures to avoid, seen in the sample**: content visible only after JS (4 sites: blank grids/heroes until scripts run) -> always render the final state; 8-11px UI text (4 sites); modals on first paint (3 sites); virtual-scroll wrappers that make the document 900px tall (2 sites) - bad for crawlers, find-in-page and our own QA screenshots.

---

## 5. Typical award page skeletons by site type

### 5.1 E-commerce (12 sites: fashion, charity merch, single-product Woo, furniture, smart ring, sneakers, audio hardware, synth, tea, book club, leather goods, packaging)

Home (8 ± 2 blocks):
1. Header: announcement/utility strip (optional, real message) + corner-only or centred-wordmark nav; cart count visible.
2. Hero: campaign film/photo or product-object with **one** CTA + an exit element (product card, category/segment tiles).
3. Category entry as design (rotated strips, giant category words, segment tiles, genre chips).
4. Product rail "New / Best" (4-up, 2-6px gaps, plate colour shared by all products, badges only from data).
5. Story/campaign band (full-bleed film or illustration, one line of copy).
6. Proof module specific to the category (ingredients poster, tasting profile, certifications, craft origin, reviews summary).
7. Second rail or collection feature (members' choice, collection launch).
8. Owned media / community (journal, UGC, channel, Instagram collage).
9. Newsletter or CTA band -> footer (giant wordmark or accordion mega footer + payments).

PLP: title (38-160px) + count + filter row (chips with counts or sidebar with checkboxes) + density toggle -> dense grid with 1-2 editorial/promo cells -> SEO text. PDP: gallery (stacked/mosaic/lifestyle column) + sticky buybox (title, price with tax note, variants as bordered boxes/swatches, ATC full width, delivery/return rows, accordions) -> story sections -> related + recently viewed -> CTA band.

### 5.2 Landing (10 sites: AI-infra SaaS, animation library, AI video, motion SaaS, nonprofit, racing driver, issue tracker, desktop-metaphor brand, polar travel, fintech card)

1. Minimal nav (logo · 2-6 links · one pill CTA).
2. Hero: statement 56-86px start-aligned or centred + product artefact (real UI, 3D object, or film) + 1 CTA (SaaS: 2).
3. Logo row or single proof line (real clients only).
4. Statement/manifesto section (two-tone or scroll-lit).
5. 3-5 capability chapters with one repeated template (sticky list + proof card, card stack, or chapter rows) - repetition is intentional.
6. Signature moment (pinned 3D act, number rain, route poster, data gauge).
7. Testimonials as 2 large quote cards or one big quote (not a carousel of 9).
8. Secondary proof: changelog/news/case rail.
9. FAQ (grouped) -> pre-footer CTA band (72-80px) -> sitemap footer.

### 5.3 Company / informational (8 sites: design studio, agency, WebGL studio, logistics, industrial group, residential, design partnership, architecture practice)

1. Nav corner-only or quiet bar; utility links (tracking, careers, "work with us").
2. Hero: either cinematic film band with HUD stat + exit cards (industry) or quiet statement + collage (practices) or poster type (studios).
3. Statement + stats rail (real numbers, 2-4).
4. Services/disciplines as big list rows or dark service grid (4 columns, line icons) - not icon cards.
5. Pinned chapter(s): process, vision, technology, location (maps, routes, drive times).
6. Work/projects: grid of captioned images or collections with essay + rail + partner quote.
7. People: team photo / partner portraits (real), careers teaser.
8. News/events (carousel + real table).
9. "Next page" / CTA band -> footer with per-office contacts, giant wordmark or statement.

Inner pages share the hero shell (photo band with two-tone H1) and the pre-footer band; case studies follow "title + subtitle (two-tone) + meta row/table + full-bleed media stack + chapter accordion or sticky rail + next project".
