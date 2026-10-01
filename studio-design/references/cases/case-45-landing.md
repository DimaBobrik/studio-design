---
case: case-45-landing
descriptor: "Israeli science museum decade-report microsite (English with Hebrew/Arabic masthead)"
region: Israel
site_type: landing (annual/decade report microsite)
industry: science museum (cultural institution)
platform: Webflow
libs_detected: [webflow]
direction_match: [cell-ledger, swiss-signal-grid, index-mono-gallery]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A ring-binder report: a yellow tab column down the side, and each chapter title a fat extended black word on its own ruled line.

## DNA summary
- One-screen index: trilingual masthead (institution name in Hebrew, Arabic and English + the decade span in a yellow stacked numeral block + the logo) → two italic intro paragraphs → a split body: **start column = chapter index as 8 stacked yellow tabs (cream to #ffdc32 gradient over 8 steps: about, memorial, chair's letter, decade in numbers, top-ten list, themes, partners)**, end column = 8 institutional values as ruled rows of 43px extended black type → dark footer with credit.
- Hero: H-23 (index as hero).

## Signature moves
- Index tabs as a colour ramp of one hue (8 tints of yellow) = navigation and decoration at once.
- Trilingual masthead set as equals (Hebrew, Arabic, English), right for a public institution in a mixed city.
- Ruled list rows at 110px pitch with 43px extended heavy type: poster-scale list.

## Tokens observed
- Fonts: nimbus-sans-extended 900 (43.2px, row height 110.9px) + adelle-sans italic 15px (index labels, intro) (both commercial via Adobe Fonts); Heebo for Hebrew bits. Free subs: "Archivo" (variable wdth up to 125) w900 for the extended rows; "Newsreader" italic for the small italic voice; Hebrew: Heebo 800.
- Palette: paper #fbfaf5, yellow ramp #fffdf3 → #fff6cb → #fff2b3 → #ffdc32, ink #303731 / #232724, grey #565755.
- Radius: one 100px round scroll button. No shadows. 0px gaps (rows share hairlines).

## Steal / Don't steal
- Steal: one-hue tint ramp as tabbed index; ruled poster list; trilingual masthead for public bodies (Hebrew + Arabic + English).
- Don't steal: missing `lang` attribute; English-only body on a public Israeli institution (needs Hebrew/Arabic versions).

## ACF mapping hints
- `report_masthead` (names repeater per language, years, logo). `tab_index` (repeater: label, anchor; colour ramp generated from one token). `value_rows` (repeater: text, link).
