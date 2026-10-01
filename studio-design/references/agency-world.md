# What the world's top studios ship for clients (world-agency client scan, 2026-10)

Load when: a brief names a reference studio or asks for "award-studio level" work, when choosing between an immersive and a conventional build, when the build is **enterprise WordPress / WooCommerce or Shopify** (§4 platform lens), or when you need a vanilla recipe for a technique you saw on an award site (§5). Studio and client names are withheld: studios appear as anonymous rows (W1…W41), carded client sites by case id (`cases/case-NN-*.md`, 15 cards from this scan, see `_index.md`). New runtime modules from this scan: `travel`, `tone-shift`, `scatter` (`runtime/README.md`).

## 1. Sample and method

- **Agencies (50 listed, 41 with live client sites):** 11 WebGL-first studios (Paris, London, LA, Amsterdam/NZ, independent developers and interactive designers), 14 editorial/brand studios (Europe, North America, Ukraine; incl. a large international design partnership), 8 product/enterprise agencies (US, Canada, network members), **6 WordPress specialists** (enterprise WP / WordPress VIP / Altis shops) and **2 Shopify specialists** (UK Shopify Plus partners). 9 more studios (a brand consultancy, a motion studio, two production/content networks, a Dutch motion-identity studio, a network agency and three others, one behind a bot wall) had no live client URLs, so they appear only in §3 notes from their own sites.
- **Sites:** 256 live client URLs from the agencies' case pages, home only, 1440×900 + 390, Playwright + SwiftShader WebGL, captured 2026-09-30; 74 blank/failed captures re-shot 2026-10-01 with real wheel scrolling and CDP screenshots. Every hero was looked at (14 contact sheets), every site's 5 scroll frames (22 strip sheets), 36 full pages, 60 re-shoots.
- **Tiers (visual):** A 22 · B 117 · C 117. C includes **57 captures that never rendered** (WebGL-only, bot/geo walls, loaders, timeouts); the rest are template-grade corporate, news portals and promo stores. Stats below use the 163 usable captures (broken captures excluded), tier A n = 20.
- **Caveats:** a client site may have been rebuilt since the agency's work (case lists run 2019-2026); `display` and `H1` heuristics as in `patterns.md`; libraries detected as globals are floors. Platform group sizes: WordPress specialists 43 usable (48 total), Shopify specialists 16 (18), everyone else 104 (190).

## 2. Top findings

1. **The best studios' client work is far more conventional than their own sites.** Usable client homes: 72% carry a chromatic accent (award gallery: 46%), 67% use a soft radius, 8.6% still ship the template card shadow (gallery 1.7%), display line-height median 1.1 (gallery 0.95), caps display 13% (gallery 23%). Only tier A (n=20) looks like the award sample: accent-less 50%, no shadows 70%, display lh 1.0, display median 76px. The award look is the exception even inside award agencies; clients get a careful, brand-system site.
2. **WebGL-first studios mostly ship gates.** 28 of 51 client sites by 7 WebGL-first studios never produced a usable page in headless Chromium (loaders, "browser unsupported", click-to-enter, empty canvas). New attractor A18. Our runtime's DOM-first, canvas-enhances rule is the right default; the immersive look must sit on top of real HTML.
3. **When studios do something memorable it is one of five moves:** (a) **tone chapters** (whole canvas changes flat colour per chapter: 5 sites, e.g. a museum exhibition microsite case-23, a faucet maker case-06, a law firm case-62, a space-tourism company case-82) → `tone-shift`; (b) **one object travels** through the page (a fintech card, a biotech molecule case-25) → `travel`; (c) **scatter fields** of photos around a word (5 sites, e.g. an art & fashion agency case-19, a photographer case-34, a provenance-research tool case-24) → `scatter`; (d) **annotation layers** drawn over photography (play diagrams on an athlete merch store case-58, scribbles on the museum microsite, HUD callouts on a health-hardware launch) → C-74; (e) **two-voice headlines** (thin condensed serif + caps word: case-06; serif + italic tint: case-62; ghost + solid caps: case-58).
4. **Enterprise WordPress is a different sport.** The six WP specialists ship publishers and institutions: 93% WordPress, 32/43 expose `theme.json` presets (`--wp--preset--*`, i.e. block themes / Gutenberg), section padding median **49px** (half the award median), headers ~115px (multi-row mastheads), 88% have an accent (often 2), 4 iframes and 64 images on a median home, Swiper on 28%. Their craft is IA, performance and editorial systems, not effects (§4.1).
5. **Shopify specialists ship campaign photography + plain grids.** The two Shopify Plus partners: 88% Shopify, body median 13.8px (too small), display median 48px, Swiper 44%, video on half; the A-tier stores (a Scandinavian fashion label case-79, a technical-apparel brand case-83) win by subtraction and by product claims, not by components (§4.2). 10 of 18 homes open behind a cookie/geo/discount layer (attractor A20).
6. **Accent use contradicts "often zero" outside the award tier:** 28% accent-less overall (company 25%, WP 12%), but 50% in tier A. Keep the skill's "one accent max, often zero" rule as an award default; for institutional/enterprise briefs a 2-colour brand system (a human-rights NGO's yellow+black, a museum's 4 chapter colours) is normal and fine when each colour has a job.
7. **Lenis/GSAP are studio markers, not client defaults.** Lenis 18% overall (29% in non-specialist studios, 0% WP specialists), GSAP global 11% (tier A 25%, ScrollTrigger 30%). Next.js 19%, Webflow 7% (3 studios), Nuxt common in the work of 3 European studios.
8. **Hero shapes in world A/B (n=139):** photo/film band ~44%, type-led/giant word ~37%, product/object render ~33% (overlapping), flat colour field ~25%, editorial/news grid ~13%, collage/scatter ~6%, centred sentence ~6%, task widget in hero ~3% (a ride-hailing platform, a transit authority, a yacht broker: new H-28). The film band remains the commercial default (A11/A21 attractors).
9. **Proof is shown, not counted:** magazine covers (case-34), client portraits with roles (case-62), awards as one line (case-83), provenance graph (case-24), live leaderboard (a sports league), ring stats with sources (a cybersecurity firm, ST-04). Stat strips without sources appear almost only on C-tier SaaS.
10. **Typography of the top tier:** one family + one outlier is common (case-25: one grotesk at 15/70/190px; case-79: one face, weight 300, 14-18px), display weight 400 (50% of A), sentence case with -0.01…-0.03em; condensed caps reserved for sport/culture (6 sites: a cultural centre case-02, the athlete store, an NGO, a university, a performing-arts venue, a presidential foundation). Proprietary faces everywhere (Founders Grotesk, Queens Condensed, Ivar, polySans, F37 Judge, Recife, SangBleu): each card lists free and Hebrew substitutes.

## 3. Agency signatures (from their client work, anonymized)

Tech = what the client sites run (detected) + the studio's own stack where known. "Card" = the carded client site, if any.

| studio | type | signature moves in client work | tech | card |
|---|---|---|---|---|
| W1 | LA immersive WebGL studio | full-canvas 3D campaign worlds for festivals, financial media and sportswear; most redirect headless browsers to "unsupported"; corporate work is quiet (black, scroll-lit sentence) | own WebGL engine, Theatre.js; client: custom | — |
| W2 | UK WebGL studio | physics/3D product toys and dark AI landings (line-art archive, toy-train world); heavy loaders | Astro/Next + Three.js | — |
| W3 | Paris luxury WebGL studio | luxury WebGL experiences (watch, fashion house, destination misted renders); 5/5 timed out or rendered dark | Nuxt + Lenis + WebGL | — |
| W4 | interactive studio (NZ/Amsterdam) | interactive documentaries for museums: colour chapters + giant cropped words + scribbles; scatter field → zoom → network graph; food-tech 3D macro | Nuxt, Lenis, ScrollTrigger, Three.js | case-23, case-24 |
| W5 | Paris game-studio-style agency | game-like brand worlds (illustrated scenes); loader-first | custom WebGL app | — |
| W6 | UK 3D brand studio | dark 3D brand worlds mostly unrenderable; Shopify skincare done plainly | WordPress/Three.js; client: mixed | — |
| W7 | Paris luxury studio | luxury maisons in black with light tracked caps, diptych nav hero, stacked vertical wordmark + role ticker, filter bar in hero (yacht broker) | Vue + Three.js; client: custom | — |
| W8 | European editorial/WebGL studio | large serif display + full-bleed aerial/editorial imagery, serif counter index (a photography studio), object still-life tables; many WebGL heroes did not render | Nuxt + Storyblok, WebGL slider | — |
| W9 | independent creative developer (France) | object-as-hero luxury commerce (eyewear), thin sans over landscape | vanilla JS + WebGL; client: Shopify | case-35 |
| W10 | independent interactive designer | scattered single-column photo portfolio with vertical captions, circular text ring wordmark | Next + Prismic + WebGL | case-34 |
| W11 | French interactive studio | typographic preloader as statement (bilingual Hebrew/German memorial project), luxury forms gates | Nuxt + Prismic + GSAP | — |
| W12 | Ukrainian editorial studio | editorial collage on hairline column frames, scribble-glyph names, one object explaining science, warm-grey industrial B2B | custom + GSAP; client: WordPress ×3, Next | case-19, case-25 |
| W13 | Belgian/US studio (network member) | poster split heroes for cultural clients, porthole mask + black/bone alternation, mint-field mobility, magazines | WordPress + WebGL; client: WP, Next | case-02, case-82 |
| W14 | Copenhagen/NY studio | condensed caps over product cut-out on sky (a drone-delivery company); commerce for home-goods brands | Contentful; client: Next, Shopify | — |
| W15 | Portuguese studio | flat electric fields (blue → dark → light, giant letter crop on a fintech), photo cloud around giant condensed word, floating pill nav; many WebGL heroes blank | Nuxt + Sanity + Lenis | — |
| W16 | Eastern-European product studio | macro 3D render heroes (cell field), line-drawn isometric explainer scenes, industrial serif statements | Prismic + WebGL; client: Webflow/WP | — |
| W17 | interactive/app studio | fintech/app landings with 3D card renders, typewriter headline, clouds + building-in-letters real estate | Astro + Lenis, own cursor libs | — |
| W18 | UK brand studio | cream + serif italic + organic shapes, venue type on sky gradient with linocut art, mint statement card on dark | WordPress + Barba + Lenis | — |
| W19 | Montréal studio | two-voice headlines + tone chapters, transit authority with trip planner in hero, merchant-association mosaic, venue caps with inline dot | Craft + Three.js + Barba; client: Webflow, Craft | case-06 |
| W20 | Stockholm studio | dark AI SaaS with planet-arc gradient, light VC with serif italic dash, ring stats | Next + Sanity + Three.js + Lenis | — |
| W21 | NYC creative-dev studio | sports merch with annotation layer, fintech product renders, dark industrial charts, staging builds on its own dev domain | Next/Nuxt + Lenis (authors of Lenis) | case-58 |
| W22 | Amsterdam commerce studio | flagship stores and campaign photography (painted statement for a camera brand, menswear), architecture collage | Next + Storyblok | — |
| W23 | Paris studio | cultural institution editorial (film festival: light serif headline beside still, awards list) | Next + Sanity | — |
| W24 | US product studio | product/platform sites (video platform, CRM, sports league leaderboard); conventional | Nuxt + DatoCMS | — |
| W25 | international design partnership | identity-led institutions: multicolour wordmark, condensed split sentence, vertical wordmark at hero edge, library flag logo | custom + GSAP; client: mixed | — |
| W26 | US brand agency (network member) | brand commerce: flagship product hero (headphones), ingredient tiles (skincare), tabletop serif (ceramics) | Next + Sanity; client: Shopify/SFCC | — |
| W27 | Portland digital agency | tone sheets + real people, caption-block art slideshow (a gallery), product UI, caps sentence + aerial | Nuxt + Craft/Storyblok | case-57, case-62 |
| W28 | US product studio | big-brand utility commerce and apps (footwear, ride-hailing, sports tour, print services); system over spectacle | headless WP + JS | — |
| W29 | Canadian product studio | product brands: task widget in hero, black serif + lime field (brokerage), ASCII dither field (AI image tool), illustrated warmth (meditation app) | Next + Sanity + Lenis | — |
| W30 | US digital agency | corporate dark films, sports/commerce portals | Next + Lenis | — |
| W31 | San Francisco agency | fintech scroll stories with a travelling card, purple 3D tokens | Next | — |
| W32 | SaaS branding agency | SaaS product sites; painterly landscapes behind UI (enterprise browser) | DatoCMS; client: Webflow | — |
| W33 | Ukrainian Webflow studio | health hardware with HUD callouts over portrait, caps grotesk + line illustration, fintech templates | Webflow + GSAP + Lenis | — |
| W34 | enterprise WP agency (US) | publishers, universities, government on WordPress | WordPress (block themes) | — |
| W35 | enterprise WP agency (UK) | university news, banks, consultancies, recipe publisher | WordPress (Altis) | — |
| W36 | enterprise WP agency (India) | news and B2B on WordPress VIP | WordPress | — |
| W37 | enterprise WP agency (global) | high-traffic publishers (headless tech publisher, entertainment trade, news weekly, geography magazine) | WordPress (+Next front ends), Performance Lab | case-78 |
| W38 | enterprise WP agency (UK) | publishers and NGOs (highlight-strip headlines, an Arabic RTL publisher, tech magazine, classifieds) | WordPress | — |
| W39 | enterprise WP agency (US) | museums, universities, food brands, magazines | WordPress | — |
| W40 | UK Shopify Plus partner | Shopify fashion/lifestyle: subtraction, claims on colour fields, campaign photography, record store | Shopify (Plus) | case-79, case-83 |
| W41 | UK Shopify Plus partner | Shopify Plus DTC: outdoor apparel marquee, ergonomic-chair category tiles, pet food; heavy popups | Shopify (Plus) | — |

Studios without live client captures (own-site notes only, 7 described): a brand consultancy (programme-led navigation, oversized editorial type), a motion studio (filterable motion portfolio), a production company (three-discipline split nav), a content network (solution-led inventory), a Dutch identity studio (full-screen motion identity reels), a network agency (kinetic stacked single-word caps), a smooth-scroll pioneer studio (bot wall).

## 4. Platform lens (for WordPress/WooCommerce builds)

### 4.1 What enterprise WordPress agencies actually ship (W34-W39; 48 sites)
- **Who:** ~9 publishers (tech, entertainment, news weekly, climate, music charts, a Dutch daily, a tech magazine, an Indian daily), ~7 institutions (an economic forum, a university gazette, two universities, a state DMV, a human-rights NGO, an aviation museum), 3 corporates (consultancy, bank, automotive services). Tier: A 1 (a tech publisher, case-78), B 17, C 30. Expect craft in systems, not effects.
- **Block themes are standard:** 32/43 usable homes expose `theme.json` presets (`--wp--preset--color--*`, `--wp--preset--font-size--*`, `--wp--preset--spacing--*`), 21 render `wp-block-*` / `is-layout-*` classes in top-level sections. For our builds: map the token contract onto `theme.json` (`settings.color.palette` ← `--c-*`, `settings.typography.fontSizes` ← `--fs-*` clamps with `fluid`, `settings.spacing.spacingSizes` ← `--sp-*`), keep ACF Flexible Content for designed sections, and register core block styles (not custom blocks) for typographic variants.
- **Editorial layout patterns that recur:** (1) lead story + side rail of 4-6 headlines (4 publishers) = Query Loop with a sticky post + a second Query Loop; (2) **stream + numbered "most read"** two-column (2 publishers); (3) category shelves with "See all" (3 publishers); (4) **sentence of topics** as navigation ("<Publication> reports on topics like *Politics, Energy, Equity, Solutions*…", G-11 variant); (5) **brand masthead colour bar** (green, mint, lime on 3 publishers) carrying the identity in an otherwise neutral grid; (6) Arabic/RTL publisher with the same grid mirrored, magenta labels on dark.
- **Institution patterns:** slanted colour banners with heavy caps over photos (a university) or highlight strips per line (an NGO, C-72); "Visit / Join / Events" photo trio + events list (a museum); fast-facts band with sourced numbers (a university, ST-03).
- **Numbers (usable n=43):** H1 median 52px, display 50px, body 16px, section padding median **49px** (p75 80), header median 114px (masthead + section nav rows), 1-2 accents (88% have one), radius soft 65%, card shadow 12%, 2 superfamilies typical, proprietary fonts licensed per brand (polySans, GT Super, Gotham and custom newspaper faces), 4 iframes (ads/embeds/video) and 64 images per home, Swiper 28%, GSAP 5%, Lenis 0%.
- **Performance habits visible in markup:** no smooth-scroll libraries, almost no canvas (2%), video on 19%, images lazy below the fold, one carousel library at most, ad slots reserved with fixed boxes. One agency's own stack uses the Performance Lab plugins (dominant-color placeholders: `data-dominant-color` on images, WebP/AVIF uploads); another ships block themes on Cloudflare. Copy for WooCommerce: dominant-colour placeholders on product images (`background-color` from the image's mean), one slider library, no Lenis on stores (our `<html data-smooth="off">`).
- **What to take for client WordPress sites:** the editorial grid discipline (lead + rail, stream + ranked, shelves), masthead colour bar, topic sentence, highlight-strip headlines, and theme.json token mapping. **What to leave:** 115px multi-row headers, 49px section padding on brand/landing pages (it is a news density), 4-family stacks, ad-driven iframes.

### 4.2 What Shopify specialists ship (W40, W41; 18 stores)
- **Home anatomy (median ~6,900px):** announcement bar → campaign photo/film hero (A11, 9/16) or split photo + claim → 1-2 product rails (Swiper 44%) → category tiles with words over photos (3 stores) → editorial band → UGC/reviews (Trustpilot/Feefo stars) → mega footer with newsletter. Display median 48px, body median **13.8px**, header 66px static, video on 8/16.
- **What the A/B stores do differently:** the Scandinavian fashion label (case-79) starts with one small product photo in white space and alternates viewport-sized 2-up editorial pairs (PL-08); the technical-apparel brand (case-83) gives every product one factual claim on its own colour field; a sustainable-materials brand splits hero into photo + black claim and puts products on colour photo plates; a polar-heritage outdoor brand runs one outlined-caps marquee of the brand line; a record label's store uses its black/yellow as the whole system; an Italian homeware house shoots products as hard-shadow still lifes.
- **PLP/PDP conventions seen on their homes:** swatch dots under cards, price + name 2 lines, quick "Shop" link per campaign tile, colour-plate product photos, packshot rows on a coloured band, shop-by-ingredient/material tiles (a skincare brand, E-28), product line-up chooser (a headphone brand, E-29).
- **WooCommerce translation:** campaign tile = ACF layout with product/category picker; attribute tiles = `pa_*` term links (`/shop/?filter_ingredient=retinol`); editorial pair interleave = `woocommerce_shop_loop` counter; reviews = one plugin (no stars from three widgets); popups: one rule, never on first view (A20).

## 5. Techniques catalogue (seen → how to build it vanilla)

| technique | seen at | how to build (vanilla, our runtime) | catalog id |
|---|---|---|---|
| Tone chapters | 5 sites (museum microsite case-23, faucet maker case-06, fintech, law firm case-62, space tourism case-82) | `tone-shift` module: direct children `data-tone`; fixed layers crossfade by opacity; header follows via `html[data-tone-active]` | C-71 |
| Travelling protagonist | 2 client sites (fintech card, biotech molecule case-25) + 2 gallery sites (a drink DTC, a fintech card launch) | `travel` module: slots with static views, one aria-hidden traveller, hold/flight/spin; slots opposite copy | C-70 |
| Scatter field / collage around a word | 6 sites (art agency case-19, photographer case-34, fintech, architecture collage, provenance tool case-24, museum) | `scatter` module: authored x/y/w/depth, depth parallax, fly-in assembly, grid fallback <720px | G-12, H-29 |
| Annotation layer over photo | 3 sites (athlete merch case-58, museum microsite, health hardware) | inline SVG over `<figure>` (viewBox = image ratio), DrawSVG on view, labels as HTML | C-74 |
| Two-voice headline | 3 sites (thin serif + caps word case-06; serif + italic tint case-62; ghost + solid caps case-58) | two spans in one H1/H2; second span changes case/weight/tint, never a second family | (type rule; see cards) |
| Highlight-strip headline | 2 sites (NGO, university) | `box-decoration-break: clone` on inline spans with accent background | C-72 |
| Scribble-glyph wordmark | 2 sites (a creative's portfolio, museum microsite) | sr-only letters + inline SVG glyph paths drawn on load | C-73 |
| Porthole / arch mask reveal | 1 site (space tourism case-82) | `clip-reveal` with circle `clip-path: circle(r at 50% 50%)` scrubbed (recipe: `gsap.fromTo(media,{clipPath:"circle(12% at 50% 50%)"},{clipPath:"circle(75% at 50% 50%)",scrollTrigger:{scrub:true}})`) | H-10 family |
| Task hero | 4 sites (ride-hailing, transit authority, yacht broker, classifieds) | real GET `<form>` in the hero; works without JS | H-28 |
| Edge-rotated wordmark | 3 sites (a health brand, a tech publisher case-78, a design museum) | `writing-mode: vertical-rl` fixed link sized to 100svh | N17 |
| Index counter between category words | 1 site (a photography studio) | `counter` roll on hover of category links (`data-mode="roll"`), numeral in serif between links | N15 variant |
| Ring stats | 1 site (a cybersecurity firm) | CSS circles + `counter`; optional SVG arc for % | ST-04 |
| Word as preloader | 1 site (a memorial light project) | display word filled by real progress via clip-path | PL-E |
| Painterly plate behind UI | 1 site (an enterprise browser) | one commissioned landscape per chapter behind real screenshots | A-48 |
| Line-drawn isometric scene | 2 sites (a mobility app, a fintech) | static SVG drawing (`direction="ltr"`), C-14 draw on scroll, labels in HTML | C-14 + A-13 |
| Editorial pair interleave | 2 stores (case-79, a UK fashion chain) | full-row 2-up portrait pair every 8-12 products | PL-08 |
| Shop-by-attribute tiles | 2 stores (skincare, office chairs) | flat tiles linking to attribute-filtered PLP | E-28 |
| Line-up chooser | 1 store (headphones) | true-scale silhouettes on one baseline + 2 specs + compare link | E-29 |
| ASCII / dither text field | 1 site (an AI image tool) | existing A-33 ordered dithering or A-23 glyph field (canvas) | A-23, A-33 |
| Giant letter crop as transition | 1 site (a fintech: one lowercase letter) | H-10 mask expand with a single glyph SVG mask scaled from 1 to 30 | H-10 |
| Circular text ring | 1 site (an app studio project) | existing C-03 | C-03 |

## 6. Attractors these studios now overuse
Moved to `antipatterns.md` "Current attractors": **A18 immersive gate** (28/51 WebGL-studio client sites unrenderable), **A19 scroll-lit grey sentence** (~6% of A/B), **A20 entry layer stack on store homes** (10/18 Shopify-specialist homes), **A21 corporate photo band + 2-line bottom-start sentence + chip** (~8%), **A22 pastel UI-collage SaaS hero** (~10% of A/B, most C landings).

## 7. Stats vs `patterns.md` (usable world n=163 · world tier A n=20 · mass-scan all n=181 · mass-scan A n=52)

| metric | world all | world A | mass all | mass A | verdict |
|---|---|---|---|---|---|
| display px median (p25-p75) | 64 (48-90) | 76.5 (42-180) | 70 | 87 | **confirms** the 64-80px hero rule; tier A identical |
| H1 ≥24px median | 56 | 70 | 64 | 76 | slightly lower: client H1s are smaller than gallery ones |
| display lh median | 1.10 | 1.00 | 0.95 caps / 1.0 sentence | 0.92 | world sets display looser; A matches |
| caps display share | 13% | 5% | 23% | 41% | **contradicts** "caps is an award marker" for this sample: top studio client work is sentence case |
| display weight 400 share | 35% | 50% | 52% | 35% | regular weight holds for A |
| superfamilies 1/2/3/4+ | 43/39/10/6% | 30/55/10/5% | 43/37/17/3% | 38/44/17/0% | ≤3 holds (4+ = 6%, mostly publishers with ad/widget fonts) |
| canvas light/dark/field | 66/29/5% | 75/20/5% | 61/25/9% | 50/29/12% | light-first confirmed, stronger |
| accent-less | 28% | 50% | 54% | 48% | **contradicts outside tier A**: clients carry 1-2 brand colours |
| accents 1 / 2 / 3+ | 36 / 25 / 12% | 40 / 5 / 5% | 25 / 12 / 10% | 31 / 12 / 10% | one accent max holds for A |
| radius 0 / soft / pill | 18 / 67 / 15% | 30 / 65 / 5% | 29 / 47 / 23% | 37 / 37 / 25% | soft dominates client work; pill rarer |
| template card shadow | 8.6% | 0% | 1.7% | 1.9% | **contradicts** at large (corporate/SaaS clients), **confirms** for A |
| box-shadow none | 42% | 70% | 67% | 75% | A confirms |
| section padding median | 80 (WP 49) | 83 | 96 | 108 | lower; commerce/news 50-70 is real; keep 90-170 for brand pages |
| smallest grid gap median | 5px | 5px | 5px | 5.5px | **confirms** dense grids |
| header height median | 80 | 78 | 72 | 72 | similar (WP mastheads 114) |
| body px median | 16 | 15 | 16 | 15 | same; Shopify specialists 13.8 (don't copy) |
| mobile H1 median | 36 | 40 | 32 | 38 | similar |
| home height median | 8,238 | 9,155 | 7,763 | 10,298 | similar |
| Lenis · GSAP · ScrollTrigger | 18 · 11 · 9% | 20 · 25 · 30% | 26 · 11 · 8% | 37 · 21 · 13% | GSAP/ScrollTrigger concentrate in A again |
| WordPress · Shopify · Next · Webflow | 36 · 15 · 19 · 7% | 30 · 20 · 25 · 5% | 10 · 29 · 20 · 11% | 15 · 13 · 23 · 17% | sample bias: 6 WP agencies |
| custom cursor · marquee · canvas · video | 26 · 13 · 17 · 41% | 40 · 15 · 25 · 45% | 38 · 26 · 25 · 46% | 42 · 21 · 29 · 46% | marquee is rarer in client work (13%) |

Reading for SKILL.md non-negotiables: #3 (≤3 families) and #5 (dense grids) confirmed again; #4 (hero 64-80px) confirmed; #2 ("one accent, often zero") holds for award-level work but should note that institutional/enterprise brands carry 1-2 brand colours; #6 (no card shadow) holds for A but 9% of world client sites still ship it, so it stays a ban.
