---
case: case-62-company
descriptor: "US mass-tort claims law firm (B2C legal services)"
region: North America (US)
site_type: company (legal services, B2C)
industry: law / mass-tort claims
platform: custom (no CMS markers), 2 videos
libs_detected: []
direction_match: [whisper-studio, organic-colour-block, forest-bone-heritage]
captured: 2026-10-01
source: "world agency client scan 2026-10 (home only)"
---
> A law firm that refuses to look like one: soft serif with a teal italic second line, real clients' faces, and three tone sheets (deep teal, cream, fig) instead of navy-and-gold.

## DNA summary
- Macrostructure (8,238px, 6 blocks): deep-teal hero (1,587px tall incl. video) with a two-line claim ("we do X / *we care for Y*" pattern) 113px Ivar Soft, second line italic in a lighter teal, play button over a documentary film → cream three-beat accountability claim 62px + 2 case cards (a named wildfire, a named chemical contamination) with landscape photos → fig (#4e1821) six-image gallery with a two-line values claim (portraits of clients and staff, captioned) → cream values accordion with a portrait → text-media block announcing a well-known consumer-rights activist as partner, with video → teal footer.
- Hero: H-22-adjacent (type over film poster), centred. Nav: small wordmark + 3 links, absolute.
- Footer: teal, newsletter, link columns.

## Signature moves
- **Italic second line in a lighter tint of the sheet colour** (teal on teal, coral on fig) as the brand's voice: the only emphasis device, once per section.
- **Tone sheet per section with paired accent**: teal #005761 + accent #4ef4ff, fig #4e1821 + accent #ff575a, cream #faf6f0 + #e9e2d8. Declared as root tokens (`--teal`, `--teal-accent`, `--fig`, `--fig-accent`).
- **Real people grid** with role captions instead of stock gavels (antipatterns #51 done right).
- **Case cards named after the actual disaster or contaminant**, not "practice areas".

## Tokens observed
- Fonts: Ivar Soft 400 (display 46-113px, -0.03em), Neue Haas Grotesk Text 400/500/700 (body 17.75px, lh 1.5). Free subs: "Young Serif" 400 or Fontshare "Gambarino"; body "Hanken Grotesk". Hebrew: "Frank Ruhl Libre" 400 (no italic: use the lighter tint alone for the second line), body "Noto Sans Hebrew".
- Palette: above; text #242424 on cream. Radii 10px cards, 1000px pills. No shadows. Section padding 96/176px.

## Motion inventory
Fade-in hero, autoplay muted films, accordion. Restrained.

## Steal / Don't steal
- Steal for legal/medical/insurance clients (relevant: accessibility-law and claims sites): tone sheets with paired accent, italic-tint second line (Latin), real people grid, cases named by event.
- Don't steal: a 1,587px hero (two viewports before the first fact).

## ACF mapping hints
- `section_tone` select (teal/cream/fig) on every layout; `headline` + `headline_soft` (second line) fields.
- `case_card` repeater (event name, place, image, link).
