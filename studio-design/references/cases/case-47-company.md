---
case: case-47-company
descriptor: "Canadian remote-first product design agency (own site)"
region: North America (Canada)
site_type: company (agency own site)
industry: product design agency
platform: Next.js + Sanity + Lenis
libs_detected: [lenis, next]   # custom cursor ("Hover / Drag"), fullscreen preloader
direction_match: [whisper-studio, void-stage, apparatus-night]
captured: 2026-10-01
source: "agency own site scan 2026-10 (home + 2 case studies)"
---
> A violet-black haze, a short three-word what-we-make claim in an 88px hairline serif, and the client names listed down the left edge as the only navigation into the work.

## DNA summary
- Macrostructure (home): one stage. Menu pill top-start, wordmark centred, contact top-end; 88px serif (PP Eiko weight 240) bottom-centre; ~13 client names (fintech, AI, mobility, media, fashion, wellness) stacked as small pills on the left = G-06 text index as hero; one 60-word studio-history paragraph at the top-end.
- Menu: full sheet with live clocks for 8 studio cities (shown as airport codes).
- Case: client name 140px serif + meta row (Project type · Stage · Deliverables) → device render on a gradient plinth → 32px intro (~60 words) → 4 chapters each 10-20 words heading + 40-80 words + video → a wrap-up chapter → contact prompt 88px → **"Next case study" at 220px**.

## Signature moves
- **Client list as the home's navigation** (the logos are words, in pills).
- Hairline serif display (weight 240) against a 16px grotesk: whisper vs UI.
- **Giant "Next case study" (220px)** as the case's last screen.
- Live world clocks in the menu (a true second read).

## Tokens observed
- Fonts: Basis Grotesque Pro (UI 12-16px, 350) + PP Eiko (display 240, -0.02em). Free subs: "Instrument Sans" 400 + "Cormorant Garamond" 300 (not Fraunces: A8). Hebrew: Assistant 300 + Bellefair 400.
- Palette: #000000 / #171717, translucent grey pills rgba(186,186,186,.2), white text; violet haze only as background image.
- Radii 50px pills, 1000px. Sizes 12 / 16 / 20 / 40 / 84-88 / 140 / 220px.

## Motion inventory
- Preloader, Lenis, custom cursor with labels ("Hover / Drag" carousel on the work index), videos in case chapters, fade transitions.

## Layout notes
- Case 11,200-15,900px, 390-570 words, media 75-80% (videos dominate). Chapter = heading 40px + ≤80 words + full-width video.

## Steal / Don't steal
- Steal: client-name index as hero nav; chapter rhythm heading → 60 words → video; 220px next-case link; office clocks with `Intl.DateTimeFormat` per `timeZone`.
- Don't steal: dark haze + hairline serif + glass pills as a reflex for AI clients (A7/A19 neighbourhood); grey-on-black small text.

## ACF mapping hints
- Home: `client_index` (relationship projects, label override). Menu: `offices` (repeater: code, city, timeZone).
- Case: `case_hero` (name, project type, stage, deliverables, render) · `chapter` (heading, text, video) · `next_case` (relationship).
