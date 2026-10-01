---
case: case-28-landing
descriptor: Israeli-run guided northern-lights photo tours (Hebrew-first)
region: Israel (tours in northern Scandinavia)
site_type: landing (guided northern-lights tours for Israelis)
industry: adventure travel / photography tours
platform: Webflow
libs_detected: [gsap, ScrollTrigger, lenis, swiper, webflow]   # marquee, YouTube embed
direction_match: [atmospheric-sky, film-title-bands, void-stage]
captured: 2026-09-30
source: "Israeli scan 2026-10"
---
> Night over a frozen lake in the Arctic north: a green aurora fills the whole screen, and a light Hebrew line floats in it like breath.

## DNA summary
- Macrostructure (14,034px): aurora photo hero -> manifesto line over an aurora-green radial gradient field -> YouTube film band (snowy forest) -> a classic nature-and-patience quote on a teal-green gradient with a 3-word Hebrew counter-line -> "your journey starts here" Hebrew line with the last two words in mint -> photo marquee of the trips (fjords, whales, aurora) -> Latin word roll (journey is healing / inspiring / powerful) -> guide portrait over a fjord village with a script Hebrew signature -> contact form.
- Hero: H-22. IBM Plex Sans Hebrew 88px w400 lh 1.0 -0.011em centred, 2 lines; small grey subline; ghost pill CTA.
- Nav: Hebrew logo with a mountain-aurora mark at the right, 5 small links at the left, static 42px over the photo.

## Signature moves
- Light large Hebrew on photography: 88px w400 headline, 72px w300 section lines (tracked -5.5px = -0.076em, too tight to copy; use -0.01…-0.02em).
- The aurora as a colour system: radial green->teal gradients (#3ee6a0-ish into black) as section backgrounds, not decoration blobs.
- Mixed-script second voice: Montserrat 80px w300 Latin word roll inside a Hebrew site.

## Tokens observed
- Fonts: IBM Plex Sans Hebrew (free) 88/1.0 w400, 72/1.2 w300, body 16-19.2px w300 (too light for body; use 400). Latin outlier Montserrat 300 (banned as default; use a light grotesk such as "Albert Sans" 300).
- Palette: black, white #f5f5f5, aurora green / mint, teal gradient stops.
- Radii: 1000px pills, 55px media frames, 50% round; arch frame (50% 50% 0 0).

## Motion inventory
- GSAP ScrollTrigger + Lenis; photo marquee; word roll; star-field box-shadow particles; YouTube embed.

## Steal / Don't steal
- Steal: free Hebrew face at 88px light weight carrying the hero; a natural-phenomenon colour used as gradient fields; guide portrait with script signature as trust.
- Don't steal: -0.076em tracking on Hebrew, w300 body, Montserrat.

## ACF mapping hints
- `photo_hero` (image/video, title, sub, cta). `gradient_quote` (quote, author, he_line, gradient token). `trip_marquee` (gallery). `guide_card` (portrait, signature svg, bio).
