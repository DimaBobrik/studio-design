---
case: case-54-ecommerce
descriptor: "Sustainable-materials furniture DTC brand (2 chairs + stories)"
region: Oceania (New Zealand)
site_type: ecommerce (furniture, 2 chairs + stories)
industry: furniture, sustainable materials
platform: Webflow, GSAP + ScrollTrigger + SplitText, Lenis
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, webflow]   # 7 sticky, custom cursor
direction_match: [organic-colour-block, machined-soft, whisper-studio]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only)"
---
> A cheerful catalogue of people sitting wrong: models perched on chairs on flat pastel plates, stepping down the page like a staircase, and small material icons dropped inside the sentences.

## DNA summary
- Macrostructure (14,965px): split hero — 60px grotesk one-sentence statement (flexible, playful furniture for modern life) top-start on warm grey #f1eee9; right half = 9 square photos on flat colour plates (mustard, orange, lilac, sage, yellow) arranged in a descending diagonal staircase -> statement with inline icons: a 60px sentence about the furniture's recycled ingredients (beans, old carpets, fishing nets) with an icon after each noun (~0.7em) -> two chair cards (yellow + black chair on beige, "from" price, colour swatches, "learn more" + "buy") -> 3 claim cells (99% recycled nylon · 82% renewable electricity · 5-year warranty) -> a photo row of people on chairs on plates -> customer review cards (stars, handle) -> quiz / ask-a-question tabbed form -> founder quotes -> awards table (year column) -> stories cards -> dark footer with chair drawings.
- Hero archetype: H-13 split, with a stepped plate grid.
- Nav: fixed 36px: lowercase wordmark + a live energy-usage chip + menu.

## Signature moves
- **Stepped plate grid**: square product/person photos on flat colour plates, offset down one cell each column (staircase), 5px gaps.
- **Inline material icons inside a 60px sentence** (H-21 applied to a statement, not a hero).
- Claim cells with real numbers (not icons), awards as a ruled year table.

## Tokens observed
- Font: Switzer 400/600 only (60px -0.04em, 30, 18.7, 13.5). Free: Switzer (Fontshare). Hebrew: "Rubik" 500 or "Heebo" 600.
- Palette: #f1eee9 / #e7e2da / #cdc0b0 warm greys, ink #3c3c3c (never black), orange #f6825d chip; plate colours from photography. Radius 30px cards, 50px pills, circles for swatches. No shadows.

## Steal / Don't steal
- Steal: staircase plate grid; icons inside the statement; claim cells with measured numbers; quiz tab next to "ask a question".
- Don't steal: #3c3c3c at 40% opacity for secondary text (fails contrast).

## ACF mapping hints
- `stepped_plates` (items: image, plate colour token), `inline_icon_statement` (text with [icon:x] tokens), `claims` (value, label).
