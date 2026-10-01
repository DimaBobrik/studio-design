---
case: case-60-company
descriptor: "Large international multidisciplinary design partnership (portfolio archive)"
region: global (UK / US)
site_type: company (info) - design consultancy portfolio
industry: multidisciplinary design studio
platform: custom
libs_detected: [gsap]   # 21 videos, custom cursor, sticky filter pill
direction_match: [work-wall-neutral, swiss-signal-grid, architect-calm, index-mono-gallery]
captured: 2026-09-30
source: "agency own site scan 2026-10 (design-consultancy archetype; many project images captured as dominant-colour LQIP placeholders - flat colour blocks in frames are placeholders, not design)"
---
> A calm archive room: one neutral grotesk, white walls, hundreds of projects hung edge to edge with a two-line caption each, and a sentence you can edit to filter the wall.

## DNA summary
- Macrostructure: the homepage is a curated feed - project grids (3-up, 2-up asymmetric, 1 large + 1 small) interleaved with dark editorial "collections" (themed sets, e.g. everyday objects / a TV-show retrospective / history-as-prologue) that hold a paragraph, a horizontal rail of projects and a partner quote; periodic "8 latest [discipline] projects ↓" category heads. Footer with news, contacts per city, open positions.
- Hero archetype: none - the first screen is empty white with a centred sentence control "We [verb] [discipline ▾] for [audience ▾]" (a fill-in-the-blank filter; also sticky at the bottom centre of the viewport while scrolling), then the first dark collection band (52px title) starts at 70% of the first viewport.
- Nav: N1a - serif wordmark start, text links end (Work / About / News / Contact / search icon / Archive), 45px static.
- Footer: black: News list (event chips + dates), new-business contacts per city (4 offices, emails), open positions, about paragraph, giant serif wordmark cropped at the bottom (FT-01).

## Signature moves
- Sentence filter: "We [verb] ___ for ___" with two dropdown chips - the filter UI is written copy and stays floating (sticky, blur 7.5px pill at bottom centre).
- Collections as editorial interludes: dark #222 bands with a 52px title, a 13-16px essay paragraph (start column), a counter "(8)" end, a horizontal project rail, then a pull quote from the partner.
- Caption discipline: every project = image + bold 16px name + 16px grey one-line description; no hover gimmicks.

## Tokens observed
- Font: Plain (single family, 400/500) for everything; wordmark is a separate serif logotype. Free subs: "Inter" 400/500 / "Hanken Grotesk" / "Public Sans". Hebrew: "Heebo" 400/500 / "Assistant".
- Scale: 52/1.05 -0.02em (page titles, collection titles), 41/1.2 (about), 32/1.2 (quotes, collection intros), 19/1.3 (nav, wordmark), 16/1.25 (captions, body), 13 (meta, category chips). Ratio ~1.25-1.6, very few sizes.
- Palette: white, ink #1a1a1a, greys #767676 / #8c8c8c / black 56%, chip bg black 7% (138 uses), dark band #222222, footer #000, case page grey #e3e4e5. No accent - colour comes only from the work.
- Radii: images 0; chips/buttons 4px, 9999px sticky filter pill, 8px. Gaps 8px / 12px columns, row gaps 48px / 96px. Container 1728px (almost full width with 12px gutters).

## Motion inventory
- Minimal: videos autoplay in grid cells, horizontal rails with arrows ("Set 1/2 ← →"), "Show more +" expanders, sticky filter pill, custom cursor on media; GSAP for small transitions.

## Layout notes
- Home grid modes rotate: 3 equal columns; 1 large (8/12) + 1 small (4/12) top-aligned; 2 medium; each caption under image, 12px column gap, 48-96px row gap.
- Case study: 52px title start, 16px description, tag chips (Brand Identity / Campaigns / Fashion & Beauty), "About the project +" chip end (expands long text), then full-width media stack.

## Imagery
- Client work only: identities, posters, product photography, environmental graphics, video loops; partner portraits in black and white.

## Page set observed
- /work: "Work" 52px, "Showing the latest 40 projects", mixed grid (text-only essay cards allowed).
- Case study: see above; long media stack (10,535px).
- /about: split - 52px about title start / 16px paragraphs end + "working here →" chip; partner portrait grid (4-up, B&W).

## Mobile notes
- Filter sentence becomes a full-width chip block at top; collections full width; single-column captions; wordmark + burger.

## Steal / Don't steal
- Steal: sentence-as-filter (works beautifully for services: "We build [websites] for [clinics]" - RTL fine); collections interludes with essay + rail + quote; strict caption format; per-city contacts in footer; "About the project +" collapsible on case pages.
- Don't steal: empty first viewport for a firm without world-famous recognition (clients need a claim above the fold).

## ACF mapping hints
- `sentence_filter` (template text with two slots; options from taxonomies `service`, `audience`).
- `project_grid` (mode: 3up|8-4|2up; relationship to projects).
- `collection_band` (title, essay, count auto, projects relationship, quote, quote author).
- Case study CPT: description, tags (taxonomy), about_project (WYSIWYG, collapsible), media repeater.
- Footer options: cities repeater (city, email), news query, jobs query.
