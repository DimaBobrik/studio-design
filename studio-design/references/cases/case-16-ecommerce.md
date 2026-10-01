---
case: case-16-ecommerce
descriptor: Israeli luxury wig maker (English site, consultation booking)
region: Israel
site_type: ecommerce-adjacent (luxury wigs, consultation booking)
industry: premium European-hair wigs
platform: Webflow
libs_detected: [lenis, webflow]   # custom cursor, WhatsApp + tel links
direction_match: [couture-condensed, billboard-type, estate-didone]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A cream fashion magazine whose masthead is a red signature so large it falls off the page, with a model's portrait pinned on top of it.

## DNA summary
- Macrostructure (16,153px): hero (giant red script wordmark cropped, portrait card, scattered red caps words forming a 4-word phrase around it) -> process section (numbered small caps steps: starting with the hair -> what the piece will become) -> caps statement with an eye-strip image chip between two words -> **red field with a self-deprecating one-line brand joke** with photo pair -> closing.
- Hero: H-21 + H-25 combination. Script wordmark ~400px red #ff3227, cropped top and sides; portrait card 300×400 centred over it; words placed around the card like a poster.
- Nav: 13px caps HOME left, small script logo centre, "book consultation +" right.

## Signature moves
- Inline image chips inside caps lines (an eye-strip crop between two words).
- Two-colour system: cream #fff9ec and red #ff3227 only; photos bring every other colour.
- The red field statement as a brand joke (self-aware copy as the signature).

## Tokens observed
- Font: Mabry Pro only (caps display 130.8px w500 lh 1.0 -0.03em; body 16.8px w300; UI 11-13px w700 caps). Free subs: "Archivo" 500 / "Familjen Grotesk" 500; Hebrew: Heebo 500 (no caps: use size + red field).
- Palette: cream #fff9ec, red #ff3227, beige text #ebdcd1 (used as light text on red), photos.
- Radii: none. No shadows. Gaps ~30px.

## Motion inventory
- Lenis; parallax on scattered portraits; custom cursor.

## Steal / Don't steal
- Steal: script wordmark cropped as the hero field; image chips inside headlines; one hot colour + cream with photos doing the rest; booking CTA as a tiny caps link.
- Don't steal: 16.8px w300 body on cream (thin), beige-on-red small text (check contrast).
- Hebrew note: caps and script are Latin-only moves; in Hebrew transpose to a hand/marker face (Gveret Levin) for the wordmark and heavy Hebrew for the statement.

## ACF mapping hints
- `script_hero` (wordmark svg, portrait, scattered words repeater: text, x, y). `inline_image_title` (parts repeater: text|image). `field_statement` (bg token, text, images).
