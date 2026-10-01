---
case: case-32-company
descriptor: US brand, product and marketing agency's own site (Pacific Northwest)
region: US
site_type: company (agency own site)
industry: brand, product and marketing agency
platform: Nuxt + Craft CMS / Storyblok
libs_detected: [swiper]   # marquee yes, 3 iframes (reels), 1 sticky
direction_match: [work-wall-neutral, billboard-type, whisper-studio, void-stage]
captured: 2026-10-01
source: "agency own site scan 2026-10"
tags: [agency, WORLD]
scan_quality: reel iframe shows "player error" headlessly; layout and cases good
---
> The studio name in 352px black caps across the top of a dark page, a rounded reel card tucked under it, and serif sentences whispering in between.

## DNA summary
- Macrostructure: announcement line (agency-of-the-year award) -> wordmark masthead 352px (H-26) + inset rounded reel card (G-13 inset variant, A10 frame) -> 64px serif positioning sentence (digital-first design agency) + "View all work" pill -> services split (text start | floating UI collage card end) -> press logos row -> values block with giant mixed-voice type (3 short lines in serif + italic, ~150px) -> latest-news cards (4) -> mission sentence -> light grey footer with a named newsletter.
- Nav: small chip links top (work / services / about) and (careers / latest / contact) split to both ends, sticky dark bar 50px.
- Case hero: giant client name 184px (sans) centred on cream #F7F1E8 or black, one-line 15-18px under it, breadcrumb, then a 64px client quote.

## Signature moves
- **Wordmark masthead + reel card** as the whole first screen (A12: they do it once, the footer is small).
- **Own type family** (a self-published free sans + serif pair on Google Fonts): serif for sentences and values, sans for UI and case names.
- Case rhythm alternates **labelled text blocks (<=120 words)** with long horizontal rails of 6-21 product/brand images.

## Tokens observed
- Fonts: the studio's own sans + serif (+ italic), both free on Google Fonts. Hebrew: IBM Plex Sans Hebrew + Frank Ruhl Libre.
- Palette: near-black #070708, light #E8E8E9, cream #F7F1E8 (case), 50% alpha inks for secondary text (use solid greys in our builds).
- Sizes 12 / 15 / 19 / 64 / 184 / 352px. Radii pill 999px + 24-32px cards. Gaps 6-8px.

## Motion inventory
- Marquee of press logos; Swiper rails in cases; reel card plays muted; values type scrolls in. Moderate budget.

## Layout notes
- Case (a specialty coffee brand): title 184px -> intro 36 words -> video -> challenge 58 words -> 21-image rail -> sprint chapter 95 words -> photo -> text -> image pairs -> typographic brand assets -> video. 750-860 words, 13,400-15,100px, media 58-69%. Live client link in the intro.

## Page set observed
- Work grid filterable by brand / marketing / product with autoplay video thumbnails; case pages.

## Mobile notes
- Wordmark scales to width; reel card full-width; rails swipe.

## Steal / Don't steal
- Steal: name masthead + reel card first screen; serif-sentence/sans-UI split; client name 184px case hero; labelled short text between image rails.
- Don't steal: the inset rounded reel frame on a 0-radius direction (A10); alpha-ink text (contrast).

## ACF mapping hints
- Home: `masthead_reel` (wordmark SVG, reel teaser, reel full, poster) · `statement` · `values_type` (lines repeater with style serif/italic/sans).
- Case: `case_title` (name, line, live_url) · `labelled_text` · `image_rail` (gallery) · `brand_assets`.
