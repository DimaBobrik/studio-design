---
case: case-58-ecommerce
descriptor: "athlete merch store (staging build)"
region: North America (US)
site_type: ecommerce (athlete merch, small catalogue)
industry: sports / merchandise
platform: Next.js (agency staging domain), Locomotive-style smooth scroll, custom cursor, marquee
libs_detected: [locomotive, next]
direction_match: [campaign-commerce, billboard-type, film-title-bands]
captured: 2026-10-01
source: "world agency client scan 2026-10 (home only; staging build)"
---
> A merch store with the energy of a game broadcast: a 248px condensed name over a black-and-white portrait, a ticker strip, merch on clean white plates, and yellow hand-drawn play diagrams scrawled over action photos.

## DNA summary
- Macrostructure (5,882px pinned-scroll container): black hero, portrait in shadow with the athlete's full name set in F37 Judge 248px (lh 0.85), first name thin outline/ghost, surname solid white → ticker (official-merch-store line + nickname, 28px caps, marquee) → white merch tiles on black gutters (tees, mask, cap, each centred on #fff with name + price under) → "SHOP ALL" giant caps with a red arrow → action photo of the athlete with **yellow (#fcee21) hand-drawn X / O / route lines** over it → product rail with round arrow buttons → charity-foundation block (ghost + solid caps again) with a crowd photo → nickname footer with portrait.
- Nav: SHOP / ABOUT / FAQ top-start, CART [0] top-end, tiny.

## Signature moves
- **Ghost + solid caps split** on one name (outline first word, solid second).
- **Play-diagram annotation** (C-74): the sport's own notation drawn over photography as the decoration system.
- **Merch on white plates inside a black page** (PC-15 inspection plate logic): product shots stay neutral, the page carries the drama.
- **Ticker strip** in condensed caps as the only marquee.

## Tokens observed
- Fonts: F37 Judge 400 (display 89-248px, lh 0.85, -0.01em), GT Pressura 400 (labels 24-28px caps). Free subs: display "Big Shoulders Display" 800 or "Oswald" 600 at lh 0.85; labels "Archivo" 500 caps (wdth 75). Hebrew: "Karantina" 700 (condensed) + "Rubik" 500.
- Palette: black, white, yellow #fcee21, red #e90000, grey #424242. Radius 50% on arrow buttons only.

## Steal / Don't steal
- Steal for sports clubs, athletes, events, gyms (Hebrew: Karantina works): ghost+solid name, sport-notation annotation layer, white plates in a dark store.
- Don't steal: whole home inside one pinned container (breaks native scroll restoration and Woo fragments).

## ACF mapping hints
- `hero_name` (line 1 ghost, line 2 solid, portrait), `ticker` (text), `annotated_photo` (image + SVG upload or drawn-paths repeater).
