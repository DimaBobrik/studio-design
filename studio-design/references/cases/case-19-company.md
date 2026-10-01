---
case: case-19-company
descriptor: Art and fashion production agency
region: Europe
site_type: company (creative/production agency)
industry: fashion production / art direction
platform: WordPress + GSAP, 9 videos, custom cursor
libs_detected: [gsap, wordpress]
direction_match: [index-mono-gallery, couture-condensed, whisper-studio]
captured: 2026-10-01
source: "world agency client scan 2026-10"
scan_quality: partial (preloader frame at top; scroll frames show the collage; 2 pinned sections ~18,000px)
---
> A fashion agency on a ruled paper sheet: hairline column frames, editorial photos scattered across them at different sizes, and a high-contrast display serif that assembles the name letter by letter.

## DNA summary
- First screen: bone (#f2f1ee) sheet with thin vertical hairlines (#cfcfc5) dividing it into columns like a layout pad; a small dot loader; then the agency name split into two parts in Recife Display (70px, ligature-heavy didone) assembles at the bottom-start while 4-6 editorial photos (portraits, fashion stills, car interior) drop into the columns at varied sizes, overlapping.
- PINNED "About:" section (9,845px) with video and 20 images moving through the column frame; "Work:" grid of 14 projects; contact.
- Nav: corner labels in Neue Montreal; pills 9999px.

## Signature moves
- **Hairline column frame** as a visible layout grid on the page (A-02 masked grid's editorial cousin) that photos snap into.
- **Scatter collage assembling** around the name (G-12 / H-29, `scatter` with `data-assemble`).
- **Didone wordmark built from parts** (letters arrive separately).

## Tokens observed
- Fonts: Recife Display 400 (70px, -0.02em), Neue Montreal (UI/body). Free subs: "Bodoni Moda" 400 / Fontshare "Zodiak"; UI "Hanken Grotesk". Hebrew: "Frank Ruhl Libre" 400 + "Noto Sans Hebrew".
- Palette: white, bone #f2f1ee, ink #0e0e0e, rule #cfcfc5. Accent-less. Pills for links.

## Steal / Don't steal
- Steal for fashion production, photographers, galleries, architects: visible hairline column frame + scatter collage + one display serif.
- Don't steal: 9,845px pin for an About section.

## ACF mapping hints
- `scatter_hero` (name, items repeater with column index + size + depth), `columns` (count 4/6/8 -> hairline overlay).
