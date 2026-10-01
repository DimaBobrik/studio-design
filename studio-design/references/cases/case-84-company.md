---
case: case-84-company
descriptor: "New Zealand multi-office architecture practice"
region: Oceania (New Zealand)
site_type: company (architecture, multi-office)
industry: architecture
platform: custom, Lenis
libs_detected: [lenis]   # custom cursor, 1 sticky, 3 videos
direction_match: [swiss-signal-grid, architect-calm, organic-colour-block]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only)"
---
> An elevation drawn in paint chips: the practice's mark is a wall of eight flat colour bars, and pieces of that wall frame every photo further down.

## DNA summary
- Macrostructure (13,397px, one pinned 12,317px sequence): hero = the logo mark built from 8-10 flat colour bars (sage, green, teal, red, maroon, orange, yellow, pink, blue) filling ~65% of the viewport height, a 3-word optimistic claim 48px light sans below -> the bars break apart and reappear as partial frames: bar fragments sit above/beside a stadium photo, beside a short positioning text, around project photos -> news items (interview-style titles) -> "Follow" footer.
- Hero archetype: H-01 variant (mark as hero) — new knob "brand mark as architecture".
- Nav: 64px white fixed bar: small mark + name start; search + menu end.

## Signature moves
- **Brand mark as the layout system**: the multicolour bar mark is deconstructed on scroll into section dividers and image frames (colour bars touching photo edges), so colour appears only as the mark's bars.
- **Light regular sans (55-92px) with grey second line** (two-tone text: black + #bebebe "Read more").
- Photos are unframed rectangles; bars supply the rhythm.

## Tokens observed
- Fonts: Die Grotesk A/B 400 (display 55-92px, text 30px, labels 12px). Free subs: "Inter Tight" 400 / "Schibsted Grotesk" 400. Hebrew: "Noto Sans Hebrew" 400.
- Palette: canvas #ececec/#ffffff, black text, grey #bebebe; bars: teal #00abbe, yellow #fcd12e, pink #d47182, maroon #652d30, orange #d36d27 (+ greens, red, blue). Radius 2px. No shadows.

## Motion
One long pinned scroll where bars translate/scale into frames (transform only), Lenis, cursor.

## Steal / Don't steal
- Steal: derive dividers/frames from the logo's geometry; many colours are fine when they are one object (the mark), never UI.
- Don't steal: 12,000px single pin (splits into chapters for a11y and QA).

## ACF mapping hints
- `mark_bars` (bars repeater: colour token, x, y, w, h in a 12×8 grid; per-section fragment presets).
