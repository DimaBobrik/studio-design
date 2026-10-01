---
case: case-72-company
descriptor: "Tel Aviv branding, UX/UI & motion studio (own site, Framer)"
region: Israel
site_type: company (agency own site; branding, UX/UI & motion studio)
industry: branding, UX/UI, motion
platform: Framer
libs_detected: [framerMotion]   # custom cursor, marquee, 4 sticky, 6 videos, 2 canvas
direction_match: [billboard-type, riso-two-ink, inflatable-pop]
captured: 2026-10-01
source: "agency own site scan 2026-10 (home + 2 case studies; desktop hero is a 900px header-stage; mobile full page captured)"
---
> An electric-blue field from edge to edge with white caps, a four-line story-to-brand statement, where the two key phrases switch to a 215px glossy italic.

## DNA summary
- Macrostructure: field hero (#0B43ED) with a 4-line 92px caps statement (Saans Medium) + italic outlier words (PP Fragment Glare Italic), corner nav as letter-spaced words (Careers top-start, Projects top-end, Contact bottom-start, Studio bottom-end), "scroll to proceed" → showreel serif-italic title + a giant year-in-review type block (G-13) → selected projects rail (italic names) + "All Projects →" → About with **live local clock "00:40:41 TLV"** and a rotating circular about-us badge → Careers welcome block → blue footer with a 215px hello-to-new-projects line.
- Case: project name 72px + one 2-word sentence 40px + website link, then mostly media (72-76% of area) with ~110-160 words, ending on a 348px "& more & more"-style marquee of the studio's ampersand.

## Signature moves
- **Field colour + caps + one glossy italic outlier word** (the studio's "&" voice) — a type move that does not need WebGL.
- Corner nav made of spaced words; live Tel Aviv clock as a second read.
- Case pages are 90% visual, text ≤160 words.

## Tokens observed
- Fonts: Saans (Regular/Medium) + PP Fragment Glare Italic. Free subs: "Inter Tight" 500 caps + "Playfair Display" Italic 400 or "Gloock" (not Instrument Serif: A8). Hebrew: Heebo 700 caps-equivalent + Frank Ruhl Libre 400 (no italics in Hebrew: use the serif as the outlier voice).
- Palette: electric blue #0B43ED / #1B3BF5, off-white #F7F9FC, navy ink #06112F, black.
- Sizes 12 / 20 / 24 / 40 / 72 / 92 / 215 / 348px. Radii 8px, 16px bottom corners on panels, 30px badge.

## Motion inventory
- Framer motion: sticky panels, marquee, custom cursor, rotating badge, video showreel; page transitions.

## Steal / Don't steal
- Steal: field-colour caps statement with an italic/serif outlier word (Hebrew: serif outlier); spaced-word corner nav; live local clock; image-led short cases.
- Don't steal: corner nav that hides the menu on mobile; italic emphasis in Hebrew.

## ACF mapping hints
- `field_statement` (text with marked outlier words, field colour token) · `showreel` (title, video, poster) · `selected_projects` (relationship) · `about` (text, timezone for clock) · case: `case_hero` (name, line, live_url), `media_blocks`.
