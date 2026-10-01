---
case: case-11-company
descriptor: Israeli branding and web studio's own site (English)
region: Israel
site_type: company (branding & web studio)
industry: branding, web design, production
platform: Webflow
libs_detected: [webflow]   # 11 iframes (Vimeo cases), 2 sticky
direction_match: [darkroom-object, index-mono-gallery, architect-calm]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A white animal standing on a grey studio sweep, flanked by laurel wreaths: the whole homepage whispers in 14px condensed caps.

## DNA summary
- Macrostructure: object hero (animal photo on #ebecf0, laurel counters for rating / repeated best-studio title / 25+ awards, one line of caps, a full-width outlined button to discuss a project) -> featured projects as a sticky index (name, description, tags) beside large black video frames with a thumbnail strip -> process 01-03 (discovery / shaping / delivery) -> black heart object -> client logo marquee -> numbered services -> recognition table (award name ↗ links).
- Hero: H-24 (object on plinth). No headline at all; the animal is the brand metaphor (raw insight becoming brand).
- Nav: 4 tiny centred links, studio wordmark top-left; no CTA pill.

## Signature moves
- One condensed serif-ish face (LT Amber Condensed) at 14-16px for everything; scale contrast comes from the photograph.
- Awards as laurel counters and a full table of links: proof as a ledger.
- Full-width outlined rectangle buttons as section closers.

## Tokens observed
- Font: LT Amber Condensed (commercial) 13.97px w600 caps +0.04em, 15.98px w300. Free sub: "Barlow Condensed" 300/600 or "Saira Condensed"; Hebrew: Noto Sans Hebrew wdth 75 400/600.
- Palette: grey #ebecf0, black, white, pink #ee3ea0 (rare).
- Radii 2px (buttons), 100px (one pill). No shadows. Gaps 4-16px.

## Steal / Don't steal
- Steal: object-only hero for a studio with a strong metaphor; laurel counters with real figures; award table with links; outlined full-width section buttons.
- Don't steal: body at 14-16px w300 condensed (legibility), videos that need a third-party player to show anything (captured as black frames).

## ACF mapping hints
- `object_hero` (image, counters repeater: value, label, laurel bool, tagline, button). `sticky_case_index` (relationship + video). `award_table` (repeater: category, count, items with url).
