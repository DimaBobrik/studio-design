---
case: case-46-company
descriptor: "French contemporary arts centre / cultural venue with exhibition agenda"
region: Europe (France)
site_type: company (cultural venue / exhibitions / agenda)
industry: arts centre, events
platform: custom, Lenis
libs_detected: [lenis]
direction_match: [billboard-type, riso-two-ink]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only)"
---
> An exhibition poster that never ends: one steel-blue field, black compressed capitals 200px tall, and the agenda pasted onto it like flyers.

## DNA summary
- Macrostructure (8,334px): 210px header on steel blue #3c6491 with a wide stencil-like wordmark spanning the width + 4 caps links (agenda / the venue / audiences / practical info) + FR/EN -> pinned 2,377px exhibition poster: "upcoming" kicker, two-line exhibition title at 200px compressed caps centred, dates in an outlined pill, then the title re-sets itself glitch-offset as you scroll -> event pair (photo + 30px caps title + meta row + outlined pill) -> upcoming agenda -> pinned 3,549px venue statement (one long caps sentence about the venue's mission) with photos drifting at staggered positions; the field lightens to #96bad4 then white -> audiences block ("you are [a group / a teacher]") with the variable word in a black box -> black footer + the wordmark again full-width.
- Hero archetype: H-01 giant editorial type (exhibition title as hero).
- Nav: masthead wordmark + one caps link row (N7 variant), static.
- Footer: black with addresses, newsletter, and the full-width wordmark (FT-01).

## Signature moves
- **One field colour carries the whole brand**, then fades field → pale → white as the page moves from programme to information.
- **Compressed black caps (ABC Gravity Compressed 900) at 144-200px, lh 0.9, tracking 0** for every title; body in a plain grotesk 16px caps/sentence.
- **Audience switcher as a sentence**: "you are [a group]" with the variable word boxed (white on black), cycling audiences.
- Photos placed off-grid at different widths inside the pinned statement (poster collage, no cards).

## Tokens observed
- Fonts: ABC Gravity Compressed 900 (display), Akkurat LL 400/900 (body 16/24, caps labels), Arial for small UI. Free subs: "Anton" 400 / "Big Shoulders Display" 900 / "Bebas Neue" for display; "Inter" or "Archivo" for body. Hebrew: "Karantina" 700 (compressed) display, "Heebo" 400 body.
- Palette: steel blue #3c6491, pale #96bad4, white, black. Radius 300px (outlined pills) only. No shadows.

## Motion inventory
Two pinned sequences; title glitch/offset on scroll; field colour interpolation; Lenis.

## Imagery
Documentary photos of events and the building (crowds, installations), placed as rectangles without frames.

## Mobile notes
80px titles; wordmark wraps to 2 lines; agenda cards stack.

## Steal / Don't steal
- Steal: field colour that relaxes to white as content turns practical; audience sentence switcher; exhibition title as the hero.
- Don't steal: 210px static header eating the first viewport on laptops.

## ACF mapping hints
- `poster_hero` (kicker, title lines, dates, link, field colour token).
- `audience_sentence` (prefix, words repeater with link).
- Event CPT with ACF: dates, type, price, image.
