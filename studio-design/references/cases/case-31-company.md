---
case: case-31-company
descriptor: Tel Aviv digital agency (strategy / tech / design / marketing), Hebrew-first
region: Israel
site_type: company (digital agency, Hebrew-first)
industry: strategy / tech / design / marketing agency
platform: WordPress (custom theme)
libs_detected: [lenis, wordpress]   # custom cursor, 1 sticky element, 5 iframes (video)
direction_match: [swiss-signal-grid, architect-calm, kikar-heavy]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> A pale-grey sheet with one heavy Hebrew sentence on it, like a manifesto pinned to a concrete wall.

## DNA summary
- Macrostructure (home): statement hero -> full-width video reel (black) -> positioning block about a dynamic world -> services as 4 big text rows -> client logo wall -> dark partnership band -> works drag-rail (gradient-tinted cards per client) -> careers statement (a playful imperative) -> articles 3-up -> 80px CTA question about moving a project forward -> footer.
- Hero: H-01. 100.8px w700 Hebrew, lh 1.0, -0.02em, 3 lines, start-aligned (right) at ~40% width; the last word is followed by an **inline black rectangle chip holding a looping video** (inline-image typography inside Hebrew). 22px/1.6 lede below. No CTA in the hero.
- Nav: the **Latin caps wordmark stays top-left** in tracked caps; at the right: "צרו קשר" underlined text + hamburger. Static, 120px, same grey as canvas.
- Footer: the 80px CTA question + an underlined "talk to us" link, then a minimal footer.

## Signature moves
- One weight-700 Hebrew face (Leon) for everything from 24px nav to 100px display; hierarchy by size only (100 / 80 / 48 / 44 / 24 / 22px).
- Services as plain 44px rows with hairlines (development / design & strategy / UX/UI / digital marketing) instead of icon cards.
- Works rail: each card is a vertical gradient from the client's brand colour to grey (pink, slate, green for three different clients) with a 22px Hebrew caption; case pages open on a full brand-colour field with a 30px Hebrew paragraph.
- No WhatsApp bubble, no accessibility overlay, no stat strip.

## Tokens observed
- Fonts: Leon + Leon Product (commercial Hebrew grotesk; both scripts). Free sub: Noto Sans Hebrew 800 (display) + Noto Sans Hebrew 400 (text), or IBM Plex Sans Hebrew 700/400.
- Scale: 100.8/1.0 w700 -0.02em · 80/1.1 · 48/1.2 -0.02em · 44 rows · 24 nav · 22/1.6 lede · 16 buttons.
- Palette: canvas #e4e7ea (cool pale grey), ink #2b2d2c, dark bands #201e20 / #181b1c, white text on dark with 40% white secondary (don't copy the opacity, use a token).
- Radii: 50% (round controls), 20px (one media frame); otherwise 0. No shadows.
- Containers: 560px text column inside a 1780px frame; generous empty space to the left (end) of the statement.

## Motion inventory
- Lenis smooth scroll; custom cursor; video chip in the hero; works rail drag; no GSAP global.

## Layout notes
- The hero leaves ~55% of the viewport empty at the end side: the Hebrew sentence carries it.
- Long page (9,249px) built from ~9 sections, each a different device (statement, video, rows, logos, dark band, rail, statement, list, CTA).

## Imagery
- Client brand colour fields and product video; no stock photography.

## Page set observed
- Case page: full-bleed brand-colour hero (pink #e8336b-ish) with a 30px Hebrew paragraph start-aligned and a service list column at the end; then screenshots.

## Mobile notes
- Page 5,257px; statement stays 3-4 lines.

## Steal / Don't steal
- Steal: one heavy Hebrew face at 100px as the whole hero; Latin wordmark kept at top-left inside an RTL page; services as big text rows; inline video chip as the last "word"; colour-graded work cards.
- Don't steal: 40%-opacity white secondary text on dark (contrast), the empty 5 iframes; `ls -0.02em` only at display sizes.

## ACF mapping hints
- `statement_hero` (text, inline_media: video/image, lede). `service_rows` (repeater: title, link). `work_rail` (relationship to cases; per-case brand colour field). `statement_cta` (question, link label, link).
