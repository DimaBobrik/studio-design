---
case: case-59-landing
descriptor: "German electronic-music artist site (music, tour, store)"
region: Europe (Germany)
site_type: landing (musician: music, tour, store)
industry: electronic music
platform: Webflow, GSAP + ScrollTrigger + SplitText, Lenis, Barba
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, barba, webflow]   # marquee, custom cursor, 8 iframes (players)
direction_match: [swiss-signal-grid, billboard-type]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only)"
---
> A record sleeve system: the artist's name at 150px with his portrait inserted between first and last name, a ruled grid where dots and words play the beat, and a lime tour table.

## DNA summary
- Macrostructure (10,636px): white hero with "First [portrait] Last" name (150px Diatype 700, -0.05em) centred; "now playing" + track bottom-start, "sound off" bottom-end -> a one-line genre claim on a visible ruled grid: words sit in cells and black dots (● 60px) punctuate lines -> streaming logos row -> full-bleed photo (studio, portrait) -> RECORDINGS on grey #c5c5c5: rotating vinyl-disc portrait + discography table -> TOUR DATES on lime #a7ff9c: green-tinted car photo + a ruled date/city/venue table with ticket links -> live-show photo band -> VIDEO ARCHIVE on black: "01/08" counter + video cards -> GALLERY on grey -> newsletter band on orange #ff6831 with "2026" at 640px over a b/w photo -> footer.
- Hero archetype: H-21 inline-image typography (portrait between names).
- Nav: 44px fixed transparent bar: logo circle + 8 small links spread across the width.

## Signature moves
- **Inline portrait in the name** at hero scale (image height = cap height, 0 radius).
- **Rhythm grid**: a visible thin-line grid with words and filled dots placed on its cells (a step-sequencer metaphor for a musician).
- **Section = colour plate from the record-sleeve palette**: grey (recordings), lime (tour), black (video), orange (newsletter); each labelled with a tiny ■ + caps label top-start.
- **Year as the newsletter hero**: "2026" at 640px.

## Tokens observed
- Font: ABC Diatype Plus Variable 700 only (150/36/18/13.5/12/10.5px; -0.05em at display). Free subs: "Inter Tight" 700 / "Geist" 700. Hebrew: "Heebo" 800.
- Palette: white, black, grey #c5c5c5, lime #a7ff9c, orange #ff6831 (plates only). Radius 15px cards, pills 1200px. Shadow: one white "cut" shadow.

## Motion
Barba page transitions, SplitText, pinned grid words, marquee, cursor, audio toggle.

## Steal / Don't steal
- Steal: portrait between words; sequencer-grid statement for music/rhythm brands; section plates from a sleeve palette; tour as a ruled table on a colour plate.
- Don't steal: 9-10px labels; sound toggle without clear state.

## ACF mapping hints
- `name_with_image` (before text, image, after text).
- `rhythm_grid` (lines repeater: words + dot positions).
- Tour CPT (date, city, venue, ticket url, status).
