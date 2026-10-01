---
case: case-13-company
descriptor: US/UK brand-strategy and design consultancy's own site
region: US / UK
site_type: company (agency own site; brand consultancy)
industry: brand strategy and design
platform: Nuxt + Sanity
libs_detected: []   # no GSAP/Lenis globals
direction_match: [work-wall-neutral, broadsheet-duet, whisper-studio, darkroom-object]
captured: 2026-10-01
source: "agency own site scan 2026-10"
tags: [agency, WORLD]
scan_quality: good; home lazy images partly grey
---
> On deep espresso brown, one short serif line, a row of award laurels and a single case card; the rest of the site is menus of programmes and short galleries.

## DNA summary
- Macrostructure (home, 128 words): hero `text[ 4-word serif promise 72px centred / laurels row (8 small awards) ]` + one case image card -> "Programs" (36px serif intro about packaged ways to help brands command a premium + ruled rows: refresh, reposition, expansion, turnaround, each with a one-line description) -> case studies horizontal row -> arts & culture (studio side work) -> footer: the site's three sections set as 72px serif words + chips.
- Nav: wordmark + menu only (74px fixed, transparent).
- Case: "Case Study" label · client name 72px serif centred + one line of positioning -> horizontal image rail (29-75 images) -> 36-41 words -> Impact: three numbers (e.g. +100% · 2x · +91%) at 95px Graphik -> next case card.

## Signature moves
- **Programmes, not services**: packaged offers as ruled rows (CS-like list), a model for agencies selling fixed engagements.
- **Footer = the three doors** of the site in display serif.
- Cases are galleries with ~220-240 words total; impact numbers carry the argument.

## Tokens observed
- Fonts: Graphik (UI, 12-16px) + Portrait Text (serif display 72px, -0.02em). Free subs: "Inter Tight" / "Hanken Grotesk" + "Newsreader" 400 / "Source Serif 4" 400. Hebrew: Heebo + Frank Ruhl Libre 400.
- Palette: espresso #140700 canvas (home), off-white #F8F8F7 (cases), white, grey #D0D0C8 secondary. No accent.
- Radii 16px cards, 96-160px pills, 4px chips. Gaps 4-16px.

## Motion inventory
- Light: horizontal rails, card hovers; no smooth-scroll library detected.

## Steal / Don't steal
- Steal: programmes as ruled rows with outcomes; awards as a quiet laurel row (once); case = rail + 40 words + three impact numbers; footer as the site's three doors.
- Don't steal: laurels + manifesto + reel/card all in the first screen (A23 stack) unless the awards are real and recent.

## ACF mapping hints
- `programs` (repeater: name, one-liner, link) · `laurels` (repeater: award, year) · case: `image_rail`, `impact` (repeater: value, label), `next_case`.
