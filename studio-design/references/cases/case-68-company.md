---
case: case-68-company
descriptor: "Global network creative-innovation agency, New York (own site)"
region: North America (US) / global
site_type: company (agency own site)
industry: creative innovation / brand systems agency
platform: Next.js, HubSpot forms
libs_detected: [next]   # 11 videos on home
direction_match: [work-wall-neutral, billboard-type, swiss-signal-grid, film-title-bands]
captured: 2026-10-01
source: "agency own site scan 2026-10 (home + 2 case studies: a sportswear campaign, a fashion-label commerce build)"
---
> Black slab, white heavy Helvetica caps at 100px: a four-line positioning statement about creative innovation for the AI age, and every case opens the same way, its name stacked word by word.

## DNA summary
- Macrostructure (home): hero `[ 100px caps 4 lines start-aligned on black / 18px 3-line note bottom-end ]` → WORK 2×2 grid of case media with 2-line captions → WHAT WE DO accordion (7 disciplines: brand, product & experience, campaign & content, CRM, ventures, AI, commerce design) → NEWS 4 cards → join-us + open roles count → footer black: office country codes (AE AR AU BR DE ID JP SG UK US) at 50px + caps statement with founding year, a future-themed abbreviation and a one-line mission (red square bullet).
- Nav: 7 text links, fixed black 60px bar, red square logo mark.
- Case: client name + headline as **stacked caps words 100px** (client name / "reimagining the future of [category]") on black + "play" box → OVERVIEW (100-150 words, 2-col label | text) → OUR ROLE (list of 3-5 disciplines) → FROM CLIENTS (quote + name, role) or SUCCESS → DIGITAL CRAFT / PRODUCT DESIGN (70-140 words) → 8-12 media blocks (video/image, almost no text) → MORE WORK.

## Signature moves
- **One heavy caps voice** (Helvetica variable 900, -0.03em) for hero, case titles and footer statement.
- **Labels in caps as the case skeleton** (OVERVIEW / OUR ROLE / FROM CLIENTS / SUCCESS) with a 25% label column.
- Office country codes at 50px as the footer's display element.

## Tokens observed
- Fonts: a custom Helvetica Variable cut + Helvetica Neue. Free subs: "Inter Tight" 900 caps (-0.03em), "Archivo" 800. Hebrew: Heebo 900 / Rubik 800 (caps lost: rely on weight + size).
- Palette: black #000000, white, greys #999999 / #3C3B3B, red #FF0000 (logo square only).
- Sizes 14 / 16 / 18 / 27 / 50 / 56 / 100px. Radii 0. Gaps 4-45px.

## Motion inventory
- Videos autoplay muted in work tiles and cases; accordion; minimal scroll effects.

## Layout notes
- Case 8,300-16,200px, 410-580 words, media 43-59%.

## Steal / Don't steal
- Steal: caps-headline case hero with the client name as the first words; caps label skeleton; capabilities accordion with 7 rows; office-code footer.
- Don't steal: caps paragraphs; for Hebrew studios replace the caps voice with a heavy Hebrew display (Karantina/Secular One).

## ACF mapping hints
- Home: `statement_caps`, `work_grid` (relationship 4), `capabilities` (repeater: name, text, link), `news` query, `offices` (repeater: code, city).
- Case: `case_headline` (text, video), `overview`, `our_role` (repeater), `client_quote`, `craft_text`, `media_blocks` (flex), `more_work`.
