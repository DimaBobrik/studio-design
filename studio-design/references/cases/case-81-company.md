---
case: case-81-company
descriptor: "APAC freight forwarding & logistics operator (B2B corporate)"
region: Asia-Pacific (Australia)
site_type: company (info) - B2B corporate
industry: freight forwarding & logistics
platform: Webflow (+ WebGL globe, GSAP bundled)
libs_detected: [lenis, swiper, webflow]   # 6 canvases, 16 sticky, marquee, custom cursor
direction_match: [atmospheric-sky, film-title-bands, swiss-signal-grid]
captured: 2026-09-30
source: "award gallery scan 2026-09 (site of the day)"
---
> A cargo flight at dawn: a night globe rimmed in orange-to-blue light, wide heavy capitals flying through it, trucks and containers cut out and driving across white space.

## DNA summary
- Macrostructure: one pinned `.main` (28,225px) choreographing a journey: globe hero -> statement + stats -> cut-out vehicles moving across the page (reach stacker, truck driving over a black road band) -> giant ghost word "SERVICES" behind a truck -> 4 services on black -> a reliability claim with a top-down truck on a vertical road -> aerial container ship on deep ocean with 5 benefit points orbiting it -> long testimonials -> blue horizon glow news section -> footer.
- Hero archetype: H-17 variant - WebGL night globe (dotted continents, orange arcs with European country chips, orange-to-blue atmospheric rim) filling the end half; H1 start (4-word end-to-end journey claim) 80px/1.05 wide heavy caps white; 2-word eyebrow 11px mono caps; lede 13px; 2 pills (white solid "talk with us" + ghost "our services").
- Nav: top utility strip (NEWS ticker in mono caps start; carbon calculator | live tracking portal end) + bar: one-word caps wordmark start, "••• MENU" (or vertical link list on home: About / Services / Industries / Insights / Careers / Contact), outlined "work with us" pill end. 99px sticky, difference blend on some elements.
- Footer: white, small: one-line tagline, socials, 3 link columns, secure payments note + card icons, industries marquee in huge light grey (fashion & footwear · medical & healthcare · retail · technology & electronics), office image, address/phone/hours, dotted world map, grain noise strip at the bottom.

## Signature moves
- Cut-out vehicles as scroll actors: PNG trucks/containers/cranes move horizontally/vertically with scroll across white and black bands - the service is literally transported through the page.
- Two-tone statement: first sentence in grey outline/light grey (we move freight) then solid black (we own the outcome) - (also a grey adjective + white noun phrase on inner heroes).
- Atmospheric glow gradients: orange rim light on the globe, deep blue horizon glow for the news section (`inset` blue shadows `rgb(1,47,255) 0 59px 60px -20px inset`).

## Tokens observed
- Fonts: BT Steinhart 700 (wide heavy display caps, 60-133px), BT Steinhart Mono (labels 7.5-11.7px caps), Helvetica Neue (body 13.3-26.7px). Free subs: display "Unbounded" 700 / "Syne" 800 / "Krona One"; mono "Space Mono"/"JetBrains Mono"; body "Inter"/"Arimo". Hebrew: display "Rubik" 800 (wide feel via scale 1.1) or "Secular One"; mono "IBM Plex Mono"; body "Heebo".
- Scale: stat 133.3/1.05 ("2,500+", "8+", "98.2%"), H1 80/1.05, H2 60/1.05, body-lg 26.7, 20, 13.3 body, labels 8.3-11.7px mono caps (too small).
- Palette: ink #111111 (and at 72% / 16% / 10% alphas for text tiers and rules), white, black #0c0c0c bands, electric blue #0016cb (gradient text fills, glow; `linear-gradient(90deg, #fff 30%, #0016cb 40%...)` sweeping text fill), deep ocean blues in imagery, orange rim #ff834a / #ffbc75 (glow shadows).
- Radii: pill (99%/1440px buttons), 25px cards on services page, 50% icon circles. No card shadows except glow effects.

## Motion inventory
- Lenis; WebGL globe (rotating, arcs animating); pinned master scroll with cut-out vehicles translating; text fill sweep (gradient background-clip moving 30%->40% white->blue); ghost mega word parallax; marquees (news ticker, industries in footer, inner hero tagline strip); stat counters; custom cursor; Swiper testimonials/news.

## Layout notes
- Statement + stats split: statement start 5/12, stats end column with hairline rules between (98.2% on-time delivery rate, 8+ years...).
- Services on black: 4 columns with line icons, caps title 20px, 11px text, ghost "our services" pill centred below.
- Benefit points around the ship: 2x2 + 1 radial arrangement centred on the aerial image.

## Imagery
- Aerial/top-down logistics photography (ships, roads through forest), cut-out vehicles on white, port/crane photography with blue-grey grade, team at desks in hi-vis vests (real staff).

## Page set observed
- Services: photo hero with grey+white two-tone H1 and marquee strip at the bottom (specialist cargo categories in caps), tech/visibility section, pinned services grid (5,976px), black CTA band (a "ready to move smarter?" question), footer.
- About: aerial hero, pinned intro with 28 images, "our difference", pinned vision, values, team grid with bio popups (T-01 + C-43), FAQ, CTA.
- Careers: team photo hero, values, pinned "what to expect", onboarding process, jobs list, testimonials, CTA.

## Mobile notes
- Globe hero kept (country chips, rim light), H1 47.6/50; utility strip stays; award ribbon appears on the edge.

## Steal / Don't steal
- Steal: cut-out product/vehicle as scroll actor for physical-service companies; two-tone statement; utility strip with real tools (tracking portal, calculator) above the nav; industries marquee in footer; black CTA band repeated on every page; staff photography in B2B.
- Don't steal: 7.5-8.3px labels; one 28,000px pinned container (fragile, hurts CLS/SEO); award ribbon.

## ACF mapping hints
- `hero_globe` (h1, eyebrow, lede, ctas, points repeater: label, lat, lng).
- `statement_two_tone` (part_muted, part_ink) + `stats_rail` (repeater value, suffix, label).
- `scroll_actor_band` (cut-out image, direction x|y, band colour, ghost word).
- `services_grid_dark` (repeater icon, title, text, link). `benefits_radial` (image, items x5).
- Options: utility strip links, news ticker source (latest posts), CTA band text.
