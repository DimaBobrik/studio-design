---
case: case-52-landing
descriptor: "Invite-only premium payment card / travel concierge membership (fintech)"
region: North America (US)
site_type: landing (invite-only premium fintech)
industry: premium payment card / travel concierge membership
platform: Webflow (+ three.js)
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, webflow]   # 3 canvases, marquee, 4 sticky
direction_match: [darkroom-object, cold-chrome-luxury, film-title-bands]
captured: 2026-09-30
source: "award gallery scan 2026-09 (site of the day)"
---
> A vault-grey showroom after closing: one steel card on a stone plinth, the Earth turning in the dark with quiet notifications floating over the cities.

## DNA summary
- Macrostructure: 3D storytelling in 4 acts: plinth (card on stone) -> Earth horizon (notifications) -> card spinning inside a floating gallery of interiors -> numbers (light) -> concierge (dark video) -> benefits stack -> partner list (light) -> network (dark photo) -> FAQ (light) -> footer. Strict dark/light alternation from the "numbers" section on (`theme-invert`).
- Hero archetype: H-24 object on plinth - black stone-texture wall, metallic card standing on a glowing glass plinth centred, centred caps H1 (4-word wealth claim) 64px/1.0 top, single light pill "apply for access" bottom-centre.
- Nav: N2 minimal - monogram coin + wordmark start, centred 2 links (membership / partnership), dark pill CTA end; 64px fixed; no bar.
- Footer: black: a 36px caps one-line brand promise start + pill CTA; link columns card / contact (email, phone, 24/7 line) / legal / socials; app store badges bottom-start; legal entity name end.
- Home sections (DOM): hero (pin) -> infrastructure claim + lede + pill, Earth horizon from below with glass notification chips (transaction successful / hotel booked / jet booked) -> card rotating in 3D among floating dark interior photos -> zero-FX-fees claim on pale grey #edefef with two columns of currency amounts (yen, euro, Swiss franc, won...) scrolling in opposite directions -> 24/7 concierge claim (dark video of a tray with the card) + ticker of live world times -> global-coverage claim with a right-aligned stacked caps benefits list (7 short benefit lines) -> numbered list (01 Hotels / 02 Dining / 03 Travel / 04 Experiences / 05 Wellness) with active row ink, others grey -> network section (dark interior photo, centred) -> FAQ grouped (about / costs & benefits / usage) -> footer.

## Signature moves
- One precious object, lit: the card as a 3D hero on a plinth, then orbiting through the story - every act re-frames the same object.
- Glass notification chips over the Earth - product outcomes shown as UI events, not features.
- Currency rain: opposing vertical columns of real currency amounts behind a 2-line claim (numbers as texture, S-06/C-02 mix).
- Live world clocks ticker in the concierge section (real time zones).

## Tokens observed
- Font: Neue Montreal 500 (single family, single weight) - caps headlines 34-64px/1.0 -0.008em, body 16-18/1.3, UI 12-14. Free sub: "Inter Tight" 500 / "Figtree" 500 / "Geist" 500. Hebrew: "Heebo" 500 (caps effect lost - keep the same size, no extra tracking).
- Palette: black #080808, graphite #1c2227 / #12191c at 52%, light grey #e1e5e5 (ink on dark, surface on light) / #edefef, greys #666f76 / #838a8f / #c0c4c6 / #3a3e40, white. Achromatic only (colour arrives through photography).
- Radii: pill (1425px) for all buttons, 4px elsewhere. No shadows; glass chips with translucency.
- Containers 449px text column, 667/650px; gaps 12/24/32/62px.

## Motion inventory
- three.js card + Earth scenes (pinned, pin-spacer), SplitText line reveals, counter-scrolling currency columns, marquee clocks, sticky list active state, Lenis smooth scroll, theme invert transitions between dark/light.

## Layout notes
- Symmetric centred acts for 3D scenes; asymmetric for text-heavy (numbered list: number col 60px | name 25% | description 35% end), benefits stack right-aligned at 60px caps.

## Imagery
- 3D renders (card, plinth, Earth at night), moody dark hospitality interiors with warm single light sources, stone textures.

## Page set observed
- Partnership: same dark shell; 52px centred partnership claim + lede + larger pill; Earth with partner chips (luxury hotel name + city) - map pins as named chips; pinned 2,250px.

## Mobile notes
- H1 37.3/37.3; scenes stack with the object smaller; notifications re-positioned around the Earth; currency section becomes a short light panel.

## Steal / Don't steal
- Steal: single-object 3D (or high-res photo sequence) as the recurring protagonist; outcome notifications as chips; currency/number rain behind claims; live clocks for 24/7 services; numbered services list with active row; strict achromatic palette for premium.
- Don't steal: the exact chrome-card-on-black look for non-luxury clients; "apply for access" exclusivity copy unless it's real.

## ACF mapping hints
- `object_plinth_hero` (h1, object render or frame sequence, plinth style, cta).
- `globe_notifications` (h2, lede, cta, chips repeater: icon, text, lat/lng or x/y).
- `number_rain` (claim lines, values repeater, direction).
- `live_clocks` (repeater: city label, IANA timezone).
- `numbered_list` (repeater: name, description). FAQ grouped by category (taxonomy).
