# Agency / studio OWN websites: anatomy, stats, rules (agency own-site scan, 2026-10)

Load when the brief is a **web/design agency, studio, production company or freelancer portfolio** (Home, Work index, Case study), or when any company site needs a case-study / project page. Companion files: `agency-world.md` (what the same studios ship for *clients*), `israel.md` (Hebrew craft), cards in `cases/` with type `company` that are studio sites (see `_index.md`). Section ids: `catalog/sections-content.md` §9 (G-13…G-15) and §13 (CS-01…CS-11). Page anatomies: `pages/company.md` CM-01 (agency vertical), CM-06, CM-07. Studio names are withheld; carded studios are cited by case id.

## 1. Sample and method

- **104 agency domains** (57 IL, 47 WORLD) found via award galleries, Clutch and local directories; home + up to 2 case-study pages each (173 case captures). Per page: computed-style extraction, hero/full/scroll screenshots desktop + mobile, and a DOM probe (live-link texts and positions, words, media share, KPI numbers, footer/nav features, preloader at 0.7 s); visual classification by hand.
- **Unusable:** 7 (4 bot walls, 1 not an agency, 1 TLS failure, 1 stuck loader) → **valid n = 97** (IL 51, WORLD 46). 162 case pages with >40 words.
- **Tiers (visual, own site as a showcase):** A 31 (WORLD 27, IL 4) · B 33 (WORLD 15, IL 18) · C 40 (WORLD 5, IL 35). WORLD = curated award studios + 6 enterprise-WordPress/Shopify shops; IL = the whole market from boutique studios to SMB web houses. **Compare IL A/B (n=22) with WORLD A/B, not IL-all with WORLD-all.**
- **Caveats:** headless SwiftShader: 13 WebGL/video homes render black or as a loader (classified from scroll frames, agency meta and known behaviour). Library flags are window globals at load (floors: Lenis, GSAP inside bundles are missed). "Live link" counts only links whose text/aria says visit/live/website/לאתר/צפייה; icon-only arrows are missed, so treat it as a floor. Full-page captures of scroll-jacked sites repeat the first screen.

## 2. Top findings (the 10 that change what we build)

1. **The work is the hero or the second screen, never the fourth.** In 19/23 A/B homes viewed end-to-end, projects appear in section 1-2; services come after work in 17/23. Hero types (A/B n=62): giant type/wordmark 27% · WebGL/3D scene 21% · work-first (project as hero, slices, grid, list) 21% · centred sentence 11% · reel stage 8% · media+headline 8% · corporate 3%. Tier A alone: WebGL 29%, type 29%, work-first 19%, reel 16%, sentence 6%, corporate 0%.
2. **Fewer words is the tier signal.** Home word count median: A **190** · B 378 · C **912** (IL all 606, WORLD 292). Home lead form: A 29% · C 68%. KPI stat strips on home: A 19% · C 35% (IL 34%).
3. **Case pages are media-first and short on text.** Case median 454 words (p25 264, p75 741), 7,450px tall (WORLD 9,600), 11 images, video on 41%. **Media share of the page area: A 72% · B 54% · C 34%.** The best case page is a film with captions, not an article.
4. **Case hero = client name, not a slogan.** The case H1 is the client/project name in 60-75% of A/B cases (median H1 60px, largest text 72px; giant variants 135-220px on 4 tier-A studios, one at 100px caps). A one-line outcome sentence sits under it (shape: "Reinventing <thing> into <measurable outcome>").
5. **Meta strip is near-universal; its fields are fixed.** Year 71%, services/deliverables 59%, tech/stack 57%, client 40%, awards 10% (WORLD 16%). Layout: a right/end column of label-value pairs (4 studios) or a 3-5 cell row (Israeli dev shops: Industry/Services/Technology; Features/Platform/Technologies/Scope/Release; Client/Industry/Services/Tech stack/Year).
6. **Live link is shown on a minority and placed early when shown.** A labelled live link on ≥36% of case pages (IL 41%, WORLD 32%), in the first viewport on 23%. Texts: "Visit website" (most common), "View the website", "Open Website" (top-end corner), "Launch project" (top-start), "View live" pill; Hebrew "לאתר", "לצפייה באתר", "בקרו באתר". Discovery found a client URL for 71% of 900 listed cases, so most studios *could* link and choose a small, early, secondary link.
7. **Results are rare and big when present.** Challenge/solution/results vocabulary on 38/53/38% of case pages; ≥2 KPI numbers ≥28px on only 15% (A 24%). When present they are 3 numbers at 96-112px with a one-line label (shapes seen: 4x · 60% · 4.8; +100% · 2x · +91%; +37% · +59% · 6.6x; 30%+ · 30%+ · 100+).
8. **Device mockups are the IL/C-tier tell.** Laptop/phone/iMac/browser-frame mockups dominate the case heroes of 21 of ~50 agencies with visible case media, 18 of them IL (mostly C). WORLD A shows **flat real screens** on tinted plates, scrolling page captures, brand applications and campaign photography (~7 studios, incl. one Israeli).
9. **One third of WORLD homes are a single fixed stage.** 15/46 WORLD homes are exactly one viewport tall (scroll-jacked app or WebGL stage: independent developers, interactive designers, creative-dev and WebGL studios, production companies); IL 3/50. Fullscreen preloader at 0.7 s: WORLD 33%, IL 14%, A 35%, C 6%. Award studios accept the gate; it is not a pattern for client sites (attractor A18).
10. **The studio "kit" is common but not universal.** Custom cursor 29% (A 35%), nav CTA pill "Let's talk/Contact" 51%, menu button instead of links 40%, footer "Let's talk / get in touch" 30%, footer text ≥60px 24% (≥100px 8%), reel mention 17% (video element on 49% of homes), marquee 14% (IL 20%, WORLD 7%), live clocks 3-7%. Each item alone is fine; stacking 4+ is attractor A23.

## 3. Agency homepage anatomy

### 3.1 Hero types (A/B n=62, ids → `catalog/sections-hero-nav.md` / `sections-content.md`)
| type | share A/B | how it looks (measured) | examples | build with |
|---|---|---|---|---|
| Giant type / wordmark | 27% | wordmark fit-to-width (352px) or 2-4 line caps statement 86-100px (a network agency, an Amsterdam commerce studio, a Tel Aviv studio at 92px + a 215px italic outlier word), or one word over a photo | ~8 studios incl. case-32, case-68, case-22, case-72, case-53, case-31 | H-01, H-26 |
| WebGL / 3D scene | 21% | black or grey stage, one object or world, nav in corners, often click/hold to explore | ~7 studios (WebGL/creative-tech studios, two large digital agencies; case-44) | H-24, `void-stage` (guarded); give a poster fallback |
| Work-first | 21% | project is the hero: slices strip (30 slivers, case-03), one project per screen in its colour (case-69), thumbnail constellation (~40 thumbs around a 42px serif line, case-73), project photo full-bleed with name (case-11), small H1 + grid right away (case-60 and 3 others) | | G-14, G-15, H-16, H-23, G-12 |
| Centred sentence | 11% | 40-72px serif or sans sentence on an empty sheet, reel card or case card below (case-13 at 72px, case-87, case-77, two others) | | A9 applies: only with a real line and an exit element |
| Reel stage | 8% | full-screen muted reel, split reel pane + caps statement (case-09), reel behind a sentence, "Watch reel" disc | | G-13 |
| Media + headline | 8% | inset media sheet (a Shopify agency), split panel (two Israeli dev shops), lamp object + light condensed type (an Israeli studio) | | H-13, A10 applies |
| Corporate template | 3% A/B, 59% of IL-all | centred H1 + two pills + mockup/stats/icons, purple night gradient | most IL C | avoid (A14, A16) |

### 3.2 Section order (A/B homes viewed end-to-end, n=23)
Typical: **hero → selected work (4-9 projects) → positioning sentence → capabilities list → proof (clients/awards/press) → news/journal → CTA → footer.**
- Work in section 1-2: 19/23. Work count on home: median 4 case links (WORLD), ≥6 on 39%; 42% of homes link no case page from home at all (work lives in a reel, a canvas or the Work page).
- Capabilities as a **list, not cards**: accordion rows (7 rows at a network agency, 6 numbered rows, another dev shop), ruled programme rows (4 named engagement types at a brand consultancy), stacked numbered cards 01-05, package cards with durations (4 programmes, case-77). Icon-card triplets appear only in C-tier.
- Proof: client logo wall/grid (8 logos in a 4×2 cell grid, a 3×3 cell grid, logo tiles), awards as a count (a 3-digit award count at 270px + a numbered award list, case-10), laurel row under the hero (case-13; case-11 with "N-time best studio · 25+ awards · 5.0 ratings"), press quote under the H1 (case-87).
- Studio-life chapter: timeline/team (years-in-business number at 270px + names list), offices with live local time (5-city clocks, 8 cities in the menu, office country codes, one studio's TLV clock).
- News/journal: 3-4 cards (4 studios).
- Unusual and worth stealing: "Ask AI if we are a good fit" (prefilled links to three AI assistants, case-77), a days-until-the-weekday counter, a time-aware greeting line (late-night visitors get a different line), client names as the hero's side nav.

### 3.3 Navigation
Median 6 visible links. Patterns: 4-6 text links + CTA pill top-end (51% have a contact/talk CTA in the header); **menu button only** 40% (A 29%: 4 studios); corner-only labels (case-03, case-73 with Home/Work/Info/News/Contact in corners, case-69); floating bottom pill nav (case-10); split-word nav as hero (a production company: three discipline words). Clocks in nav 3/46 WORLD.

### 3.4 Footer and contact
Footer "Let's talk / start a project / get in touch" line 30%, `mailto:` 43%, `tel:` 25% (IL 36%, WORLD 13%), footer form 19%, newsletter 20% (WORLD 28%). Giant footer text ≥60px 24%, ≥100px 8% (a caps statement, "LET'S TALK", a two-letter mark, a one-word sign-off). Offices block with cities/time on most WORLD multi-office studios.

### 3.5 Motion, preloaders, transitions, cursor
Fullscreen preloader 23% (WORLD 33%, A 35%, C 6%); % counters only 1. Page transitions: Barba/Swup globals rare (3 studios per meta), SPA frameworks (Next 13%, Nuxt per meta) carry most transitions; Webflow 10% (IL 16%), WordPress 37% (IL 47%, A 10%), Lenis ≥20% (A ≥29%), GSAP ≥15%, Three ≥4%. Custom cursor 29%: blob/label cursor ("play" states), circle follower, drag/hover labels ("Hover / Drag", case-47). Sound toggles on 7% ("Enter with sound" on 3 studios).

## 4. Work index patterns (~45 described indexes, meta + captures)
| pattern | share | examples | id |
|---|---|---|---|
| Uniform grid with filters (service/industry/tag chips, counts) | ~30% (13) | brand/marketing/product filters + autoplay video tiles (case-32), sector filter with endless scroll (case-60), 2D/3D/branding tags, verticals like luxury/watchmaking/e-commerce/WebGL, an enterprise-WP shop with 5 service verbs as filters, + 5 Israeli studios | G-04, CM-06 |
| Staggered / editorial grid (mixed spans, 2-col offset) | ~20% | ~6 studios incl. case-11, case-09 (4-col portrait grid with "Headless Shopify" chips), case-43 colour tiles | `bento` |
| Text index list (numbered, client/title/year, hover image) | ~18% (8) | "N°00x" + year, numbered rows, "Title / Client", serif names with counts, "Client — industry" two-column, an inventory list | G-06, G-10 |
| Slider / carousel / WebGL browser | ~17% (8) | fluid-glass slider "01/14" (case-22), slice strip (case-03), colour slides (case-69), "01 / Client" counter, hover/drag rail (case-47), year-range counter, distortion carousel, an Israeli sticky slider | G-14, G-15, G-01 |
| Colour mosaic | 2 | client colours as blocks; case-43 | — |
| Outbound list (cards link straight to client sites, no case pages) | IL only, ~6 | 5-6 Israeli web houses (one lists ~300 sites; masonry, no pages) | antipattern for an agency that wants to sell craft |
Rules seen in A: a count per filter or total ("(13)"), year on every item, the index works as text first (list/table) with hover media as enhancement, and video tiles autoplay muted only in view.

## 5. Case-study page anatomy (162 pages)

### 5.1 Section order (dominant, A/B)
1. **CS-01 hero**: client name H1 (60-220px) + one-line outcome; variants: giant name on white/black (3 studios), client-colour field with name + 32px serif sentence and the image overlapping the field edge (4 studios, incl. case-87 and case-31), full-bleed photo with giant name, sentence-led 40-75px ("From brand identity to digital experience: building <product>"), caps question ("How to build <deliverable> in just <timeframe>?").
2. **CS-02 meta** (year, client, services/deliverables, industry, stack, awards, live link) beside or under the hero.
3. Intro / TL;DR (a yellow TL;DR card with 4 numbered points; a 32px intro paragraph ~60 words).
4. **CS-04 chapters**: challenge → approach/solution → (results), 2-col label|text (`The Challenge`, `What we did` bullets, `Our role` list) or 3-col (Challenges / Solutions / Deliverables), or numbered takeaways ("4 Big Takeaways" 01-04).
5. **CS-05 media rhythm**: full-bleed → 2-up → caption text → full-bleed video → 3-up detail, repeated 3-6 times; captions 1-2 lines; the network agency and the design partnership run 8-12 media blocks with almost no text.
6. **CS-06/07** screens on plates, brand asset sheet (type specimen "Aa", colour chips, icons, logo construction: 2 Israeli studios).
7. **CS-08 results** (when real): 3 KPIs 96-112px + label (+ source).
8. **CS-09 quote / recognition**: client quote ("From clients" block) or press/awards list ("Recognition & Awards", an award list in the meta column).
9. **CS-10 credits** (45% mention team/credits; WORLD 62%).
10. **CS-11 next project**: giant "Next case study" (220px, case-47), next client name + image (3 studios, incl. a French "Projet suivant"), "More stories" 3 cards, "Next project / All projects / Let's work together" triplet. Explicit next/related label on 25% (WORLD 33%) by text; visually about half end on a next-project block.

### 5.2 Measures
| metric | all | A | B | C | IL | WORLD |
|---|---|---|---|---|---|---|
| words median | 454 | 417 | 450 | 537 | 443 | 491 |
| media share of page area | 48% | **72%** | 54% | 34% | 45% | 50% |
| page height median (px) | 7,450 | 11,180 | 10,340 | 5,840 | 6,950 | 9,600 |
| images median | 11 | 10 | 10 | 13 | 13 | 10 |
| has video | 41% | 59% | 43% | 22% | 34% | 49% |
| labelled live link / in first viewport | 36% / 23% | 39% / 18% | 36% / 28% | 35% / 22% | 41% / 24% | 32% / 21% |
| ≥2 KPI numbers ≥28px | 15% | 24% | 9% | 13% | 10% | 20% |
| results words | 38% | 35% | 45% | 35% | 29% | 49% |
| credits / team | 45% | 47% | 52% | 36% | 30% | 62% |
| quote / testimonial | 43% | 39% | 43% | 45% | 37% | 49% |
Media/text ratio rule of thumb from A: **~70% media by area, ≤450 words, one text block ≤90 words between media runs**.

### 5.3 How live-site links are shown
Best: a small text link in the meta (label "Website" → `client.com ↗`) or a top-end "Open website ↗" that stays while scrolling (case-10), plus a second, larger "Visit the live site" at the end before Next project. Pills "View live" / "Visit website" next to the meta (2 Israeli studios). C-tier: purple buttons under a fake browser frame (2 Israeli web houses) or the whole case replaced by an outbound link. Always `rel="noopener"`, `target="_blank"` with a visible ↗ and an `aria-label` "(opens client site in a new tab)"; show the year so a rebuilt client site does not read as your work.

## 6. Israel vs world (A/B vs A/B unless noted)
| axis | IL | WORLD |
|---|---|---|
| hero, all tiers | corporate template 59% (30/51) | WebGL 28%, giant type 22% |
| hero, A/B | type 33% (Hebrew display: Anomalia/Migdal, Leon, caps + italic), work-first 29% | WebGL 32%, type 24%, work-first 17% |
| home words median (all) | 606 | 292 |
| lead form on home (all) | 60% | 30% |
| `tel:` in footer (all) | 36% | 13% |
| marquee (all) | 20% | 7% |
| single-viewport / preloader (all) | 6% / 14% | 33% / 33% |
| stack (all) | WordPress 47%, Webflow 16%, Elementor common in C | Next 22%, WordPress 26% (enterprise WP shops), Nuxt/Astro/custom per meta |
| case pages | device mockups, Hebrew paragraph 300-640 words, more live links (41%), FAQ blocks for SEO | flat screens, film rhythm, credits 62%, results 49% |
| RTL | 34% of IL homes are `dir=rtl`; many A-tier IL studios run English-only sites for foreign clients | — |
Israeli A/B studios that reach world level do it with **one ownable type move** (Hebrew display face, field colour, condensed serif) and work-first grids, not with WebGL. That is the realistic target for a small Israeli studio's own site.

## 7. Rules for agency / studio sites and case studies (actionable)
1. Show work in the first two viewports: either the hero IS a project (G-14/G-15/H-16) or the section after the hero is 4-9 selected projects. Never put services before work.
2. Home ≤350 words (A median 190). Every paragraph that explains what an agency is gets cut; one positioning line ≤25 words.
3. Pick ONE hero device from §3.1 and make it the studio's signature: wordmark, project slice strip, colour-per-project slides, constellation, reel stage. Not a centred sentence on an empty sheet unless the next screen is work (A9).
4. Capabilities are a list (accordion rows, ruled programme rows, numbered stack), max 7 items, each linking to work tagged with it. No icon-card triplets.
5. Proof is specific: logo cell grid (S-12) of real clients, awards as one count + a table (T-08), press quote under the H1. No "5.0★ · 98% · +120" strips.
6. Reel: muted autoplay teaser loop ≤15 s, `playsinline`, poster; "Play reel" opens a `<dialog>` with sound, controls and captions (G-13). Never start audio, never gate the site behind "enter with sound".
7. If you use a preloader, it must finish ≤1.2 s on cached visits and never block content for no-JS / reduced-motion; no click-to-enter. Prefer an in-page intro (wordmark settles) over a fullscreen gate.
8. Custom cursor only if it carries information (a "Play", "Drag", "View" label over media); keep the native cursor on text and form fields; off on touch and reduced motion.
9. Work index: text-first (list or grid with real `<a>` titles), filters by **service and industry** with counts, view toggle grid/list, year on every item; hover media is enhancement (G-06, G-04). For ≤12 projects use G-14/G-15 instead of filters.
10. Case hero = client name H1 (60-220px) + one-line outcome + meta strip (year, client, services, industry, stack, live link). Never a generic slogan as the case H1.
11. Case body: ~70% media by area, ≤450 words, text in blocks ≤90 words between media runs; challenge → approach → result as labelled 2-col chapters (label column 25%).
12. Show the work as it is: flat real screens on tinted plates, scrolling page captures in a clipped frame, brand applications, campaign photos. No fake device or browser chrome built from divs (NN #10); a real photographed device is fine.
13. Results only when real and sourced: 3 numbers max, 96-112px, label + timeframe ("+37% subscriber growth, 6 months"). Otherwise use a client quote or a deliverables list.
14. Live link: small `Website ↗` in the meta + "Visit the live site ↗" at the end; external, labelled, with the launch year.
15. End every case on CS-11 next project (client name 72-220px + image, whole block is a link) plus "All work"; never a dead end, never a generic contact form as the last block of a case.
16. Credits (team + partners) and awards for the project live in the meta column or the end, small (13-15px).
17. Studio life (offices, clocks, team, careers) is one chapter, not the home's backbone; offices with real local time are a good second read (use `Intl.DateTimeFormat` with each office's `timeZone`).
18. Footer: one contact line in display size (`mailto:` as the big link), offices, socials, newsletter optional; a giant wordmark only if the hero is not already one (A12).
19. Hebrew agency sites: Hebrew display face as the signature (israel.md §2), English case pages for foreign clients get their own `hreflang`, case meta labels in Hebrew (לקוח · שנה · שירותים · טכנולוגיה · לאתר ↗).
20. WordPress build: CPT `project` with ACF meta group (client, year, services taxonomy, industry taxonomy, stack, live_url, awards repeater, credits repeater, next_project relationship) + a Flexible Content of CS- layouts; Work index = `archive-project.php` with taxonomy filters.

## 8. Direction fit for agencies (from this scan)
Covered: `void-stage` (WebGL/reel black stage, guarded: needs real work in the scene), `index-mono-gallery` (numbered index studios), `cell-ledger` (logo/award cells), `billboard-type` (caps poster studios, incl. one with a field-blue canvas), `swiss-signal-grid` (case-60, case-09), `whisper-studio` (light-serif studios, incl. case-47), `broadsheet-duet` (journal-led studios), `film-title-bands` (reel bands), `organic-colour-block` / `riso-two-ink` (playful studios), `dev-playground` (creative-dev studios, guarded).
**Written 2026-10 as `directions/work-wall-neutral.md`** (specimen `_specimens/work-wall-neutral.html`) (recurring in ~12 A/B studios in Portugal, the US, the Netherlands, Denmark, Israel and the UK): neutral grey/white canvas (#EBEBEB, #F2EFE6, #E8E8E9, #FEFDFC), ONE neo-grotesk at one weight (Commercial Gräphik, Neue Haas, Helvetica Now; sizes 17/23/75/270), no accent at all, and **the client's colour takes over the case hero as a full field** (a client's brand blue, a brand pink). Signature: a scale jump from 17px to a 270px number/name, captions as the only ornament, work supplies all colour. Differs from `swiss-signal-grid` (no drawn grid, no signal ink), `whisper-studio` (not whisper-weight, no tinted paper), `index-mono-gallery` (no mono, no scattering). Hebrew: Heebo/IBM Plex Sans Hebrew 400 one weight.
