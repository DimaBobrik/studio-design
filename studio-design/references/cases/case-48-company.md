---
case: case-48-company
descriptor: "UK branding and design studio, one-page site"
region: Europe (UK)
site_type: company (branding / design studio, one-page)
industry: creative services
platform: WordPress
libs_detected: [wordpress]   # 4 videos, 57 images; single 1,292px page
direction_match: [swiss-signal-grid, whisper-studio]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only)"
---
> A business card blown up to a room: the studio's name 160px wide in navy, and a hand of project cards fanned underneath it.

## DNA summary
- Macrostructure (1,292px, one screen + a strip): full-width navy grotesk studio name (two words, ~160px, fills 1,400px) top -> a horizontal row of ~12 project cards (photos, packaging, a laptop, a book) at different heights and slight rotations, sliding sideways on scroll/drag -> bottom-start mini nav (about / testimonials / contact / social as 13.5px caps pills) + bottom-end 24px description + navy contact pill.
- Hero archetype: new H-26 masthead wordmark (+ H-04 tilted rows in miniature).
- Nav: none at the top — the name is the header; links sit at the bottom as small pills.

## Signature moves
- **Name as masthead**: 1 word-pair set to fill the width, one colour (#10286f navy) for everything including pills.
- **Fanned card rail**: cards with 12px radius, heights vary ±20%, small rotations (±3°), overlapping edges; video cards autoplay muted.
- One-screen studio site: no scroll narrative, everything else via modals/links.

## Tokens observed
- Font: General Sans (Fontshare) 400/600 — display ~160px, body 24/36, labels 13.5 caps 600. Free: "General Sans" is free (Fontshare); Google alt "Inter Tight" 500. Hebrew: "Heebo" 500 for the name, 400 body.
- Palette: off-white #f1f1f1 / #edece9, navy #10286f (text + pill fill). Radius 12px cards, 24px pills. No shadows.

## Motion
Horizontal drag/scroll rail, video tiles. Nothing else.

## Mobile notes
Name wraps to 2 lines; rail becomes swipe; pills stack.

## Steal / Don't steal
- Steal: a studio home that is only name + work rail + contact; single ink colour for all UI.
- Don't steal: no H1 and no visible headline text for crawlers (name as SVG): keep a real `<h1>`.

## ACF mapping hints
- `masthead_name` (text or SVG, colour token, fit-to-width yes/no).
- `fan_rail` (items repeater: image/video, rotation, height %).
