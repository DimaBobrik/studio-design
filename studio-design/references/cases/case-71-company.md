---
case: case-71-company
descriptor: "Large Norwegian transdisciplinary architecture & landscape practice"
region: Europe (Norway)
site_type: company (info) - architecture & design practice
industry: architecture, landscape, interiors, product design
platform: custom (Tailwind-like utility classes)
libs_detected: []   # no GSAP/Lenis; fades, carousels; blur 20px on floating controls
direction_match: [architect-calm, whisper-studio, index-mono-gallery]
captured: 2026-09-30
source: "award gallery scan 2026-09 (large-practice IA benchmark)"
---
> A large practice's quiet archive on white paper: one light sans, photographs staggered like pinned prints, grey text that finishes the black sentence.

## DNA summary
- Macrostructure: statement + staggered photo strip -> Disciplines list -> Latest News carousel -> Upcoming Events table -> 3 about cards (process / sustainability and responsibility / ...) -> Highlighted Projects list -> 2 people photos (get in touch / policies and governance) -> footer sitemap.
- Hero archetype: H-01 quiet - 60px light (w300) one-sentence self-description 2 lines start-aligned (a global transdisciplinary practice working at all scales) above a horizontal strip of 5 photos at staggered heights and sizes, bleeding off both edges (pinned-prints collage).
- Nav: N1a split - wordmark start (22px), "Menu" text at the 4/12 column, mountain pictogram end; static, no bar; a small floating blurred settings button bottom-start.
- Footer: white, mountain pictogram start, 3 small-link columns (General / Disciplines / More), underline search field "+", legal + socials, "Current Openings ↗".
- Section rows use a fixed 2-column system: label column (grey 16-22px "Disciplines", "Latest News", "Upcoming Events", "Highlighted Projects") at start 4/12, content from column 5.

## Signature moves
- Two-tone titles everywhere: black project name + grey subtitle on the same line/paragraph (e.g. a public library name + *its one-line purpose*; the Projects heading + *a one-line grey manifesto*; a café interior + *its idea in a phrase*) - hierarchy by grey value, not size or weight.
- Big-list navigation: Disciplines and Highlighted Projects as 48px light rows with hairline rules, truncated by the viewport edge (text runs off the page).
- One weight (300) for the entire site at every size.

## Tokens observed
- Font: Dovre 300 only (custom grotesk). Free subs: "Inter" 300 / "Hanken Grotesk" 300 / "Public Sans" 300 (check 300 legibility at 16px; use 400 for body if needed). Hebrew: "Heebo" 300 / "Assistant" 300 (Hebrew light at 16px - prefer 400 for body).
- Scale: 96/1.0 (case title), 60/1.03 (home statement), 48/1.3 (list rows, page titles), 32/1.4 (case intro), 22/1.45 (nav, labels, news titles), 18/1.4, 16/1.4. No negative tracking.
- Palette: white, black, greys #757575 (secondary text, 42 uses) and #949494 (labels), #dfdfdf rules, floating control #f2f2f2 at 65% + blur 20px. No accent colour at all.
- Radii: 16px (floating controls/cookie), 9999px one chip; images square-cornered. Gaps 40px columns, 80px rows; wrapper 2640px max (wide screens), text 550px/840px columns.

## Motion inventory
- Opacity fades on filter changes, news carousel arrows, event table static; exclusion blend on pictogram over images. Nothing decorative.

## Layout notes
- Home collage: images 200-430px wide at different vertical offsets, left and right ones cropped by the viewport - a band, not a grid.
- News: carousel of 3 cards (landscape image, date in grey, title black 18px) with ← → at row ends; events as a real table (Event / Location / Date).

## Imagery
- Architectural and landscape photography, natural light; whole-team group photography outdoors on About.

## Page set observed
- /projects: two-tone intro sentence; view switch Grid / List / Map; underline search "+"; filter row (Disciplines / Typology / Location / Status / Sort by: Last updated) as small underline dropdowns; 3-up project grid.
- Case (a small café interior): 96px title black + grey subtitle, meta row (years | 3 disciplines), full-bleed image, long pinned text/image flow (13,549px), "Play Video", related projects.
- /about: full-bleed team photo with caption, "About" 48px, numbered long-read (1 the story in short ...).

## Mobile notes
- H1 24/27 (small); collage keeps 3 visible photos; lists keep 22-24px rows; everything single column with the label above.

## Steal / Don't steal
- Steal: two-tone titles (name ink + descriptor grey) - perfect for law firms, clinics, B2B; label-column section system; big list rows for services/projects; events as a real table; filters as underline dropdowns; single light weight when imagery is strong.
- Don't steal: weight 300 for body in Hebrew; grey #949494 on white for important labels (contrast 3.0:1 - use ≥#767676).

## ACF mapping hints
- `statement_collage` (statement, images repeater with offset y and width token).
- `label_list` (label, rows repeater: title, subtitle grey, link).
- `news_carousel` (query posts), `events_table` (CPT event: title, location, date).
- Project CPT: subtitle, years, disciplines (taxonomy), gallery flex content.
- Projects archive: view switch (grid/list/map) + taxonomy filters.
