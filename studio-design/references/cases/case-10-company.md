---
case: case-10-company
descriptor: Portuguese branding and digital studio's own site
region: Europe (Portugal)
site_type: company (agency / studio own site)
industry: branding and digital studio
platform: Nuxt (Vue) + Sanity
libs_detected: [lenis]   # 10 canvases, 6 videos, 460 imgs on home; fullscreen preloader at 0.7 s
direction_match: [work-wall-neutral, swiss-signal-grid, whisper-studio, index-mono-gallery]
captured: 2026-10-01
source: "agency own site scan 2026-10"
tags: [agency, WORLD]
scan_quality: home hero canvas renders black headlessly (reel/canvas stage); scroll frames and both case pages are good
---
> One grotesk at one weight runs everything from a 17px caption to a 270px years-in-business line; a floating pill at the bottom of the screen is the whole navigation.

## DNA summary
- Macrostructure (home): canvas/reel stage -> manifesto sentence 75px with an emoji inline -> years-in-business line at 270px (with a mild swear word) + studio timeline (every person who worked there, names list) -> awards count (~300) at display size + numbered award list 1-7 -> work thumbnails -> services list (Branding / Digital / Experience, sub-lists) -> testimonials -> footer two-line sign-off with down arrow.
- Hero: reel/canvas stage (G-13 full-screen variant) with no headline; the statement is screen 2.
- Nav: N3-like floating bottom pill (studio nickname · current page +) (menu opens a full sheet: studios, recognition, work, branding, naming, anniversary, book). Contact link inside the menu.
- Footer: big sentence line + mailto; no giant wordmark.

## Signature moves
- **Single family, single weight (Commercial Gräphik 400)**, hierarchy only by size: 15 / 17.6 / 23 / 37 / 57.6 / 75 / 270px; tracking -0.05em at display.
- **Case meta as a right-hand column** of tiny label/value pairs (Year, Industry, Location, Deliverables list, Recognition list of awards) beside a 57px sentence-led intro; "Open Website" fixed top-end, "Back" top-start.
- Awards and team shown as numbers and lists, not logos: award count at display size, team as a names column.

## Tokens observed
- Font: Commercial Gräphik (commercial). Free subs: "Inter Tight" 400, "Schibsted Grotesk" 400, "Hanken Grotesk" 400. Hebrew: Heebo 400 / IBM Plex Sans Hebrew 400 (one weight kept).
- Palette: white #FFFFFF, black #000000; translucent white chips rgba(255,255,255,.06); no accent (case work brings colour: blue for a fintech case, green for another).
- Radii 2px (chips), 12-20px (pill nav, media); no shadows. Container 1405px, gaps 16.8px.

## Motion inventory
- Fullscreen preloader; Lenis smooth scroll; canvas-driven type/image transitions between work pages; floating pill nav persists across pages; video loops in case media.

## Layout notes
- Case: `split[ sentence 57px, 8 cols | meta column 2 cols ]` -> full-bleed 3D render -> 3 narrow text columns (~120 words each) -> full-bleed black video -> asymmetric text + image -> pull statement 75px -> image pairs. ~920 words, ~11,500-21,300px tall, media ≈50% of area.

## Page set observed
- Case pages: as above, consistent template, every case lists its own awards. Home links work via thumbnails mid-page.

## Mobile notes
- H1 40/42px; pill nav stays at the bottom (thumb zone); meta column drops under the intro.

## Steal / Don't steal
- Steal: one-weight type system with a 17->270px jump; meta column with awards per case; bottom floating pill nav for a studio with few top-level pages; team-as-names timeline.
- Don't steal: emoji inside the H1-scale sentence for a client brand; black canvas stage without a poster (headless/low-power users see nothing).

## ACF mapping hints
- Case: `case_hero` (sentence, meta group: year, industry, location, deliverables repeater, recognition repeater, live_url) · `media_full` · `text_columns` (1-3) · `pull_statement` · `media_pair`.
- Home: `stat_display` (number, label, list repeater) for years / award count.
