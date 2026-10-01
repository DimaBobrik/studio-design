---
case: case-15-company
descriptor: Israeli content and storytelling agency (Hebrew-first)
region: Israel
site_type: company (content agency, Hebrew-first, EN switch)
industry: content and storytelling agency
platform: Webflow
libs_detected: [lenis, webflow]
direction_match: [organic-colour-block, swiss-signal-grid, kikar-heavy]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A toy theatre of five coloured plinths on a charcoal stage: each one holds a little 3D glyph, and heavy Hebrew headlines tell the story above them.

## DNA summary
- Macrostructure (4,797px, 7 blocks): hero (grey #e7e7e7, centred 64px statement, isometric plinth row) -> charcoal storytelling statement with an orange circle carrying a 3D asterisk sliding down from the hero -> orange band of stepped squares (pattern divider) -> orange storytelling-expertise statement with a 3D impossible-frame object -> grey positioning statement (a content house for businesses) with concentric circles -> logo row -> footer "צרו קשר" (contact) on a grey semicircle.
- Hero: H-24. Kedem Sans 64px w700 lh 1.1 two lines centred; 20px Rubik lede; five isometric cylinders (teal, charcoal, orange, white, rust) holding 3D symbols (chevron, asterisk, cubes).
- Nav: sticky 80px transparent; logo right, 4 links centre, contact grey pill + round "En" at the left.
- Footer: 64px contact word + social icons on a semicircle, credit row (content / design-and-dev credits), accessibility-statement link.

## Signature moves
- Section transitions by **shared objects**: the orange disc with the asterisk travels from the plinth into the next section; the stepped-squares band morphs charcoal into orange.
- Colour-block chapters (grey -> charcoal -> orange -> grey) instead of cards; no section has a border or a shadow.
- Weight contrast within one Hebrew family: 64px w700 vs 64px w500 between chapters.

## Tokens observed
- Fonts: Kedem Sans (AAA, commercial) display 64px 500/700; Rubik 16-20px UI/body (free). Free sub for Kedem: Heebo 600/800.
- Palette: grey #e7e7e7, charcoal #2c3135, orange #e05f3c, muted inks #56595c / #837977, teal #4aa3a2-ish, rust #a8462c-ish (plinths).
- Radii: 32px (the En pill area), round objects; otherwise flat. Backdrop blur on header.
- Section paddings: 0/160 and 80/80.

## Motion inventory
- Lenis; scroll-linked object hand-off (disc/asterisk), stepped squares growing, circle reveal; no GSAP global (bundled or Webflow IX).

## Imagery
- All imagery is built: isometric 3D primitives in the brand palette. Zero photos.

## Mobile notes
- H1 33.6px/1.1; page 4,011px.

## Steal / Don't steal
- Steal: built isometric objects as the identity for an abstract service; an object that travels between sections; colour-block chapters; giant "צרו קשר" footer word; credit + statement link in the legal row.
- Don't steal: html `dir="ltr"` with RTL applied lower (set it on `<html>`).

## ACF mapping hints
- `plinth_hero` (title, lede, plinths repeater: colour, object image). `colour_chapter` (bg token, title, text, object). `pattern_divider` (style: steps|circles). `contact_footer` (title, socials).
