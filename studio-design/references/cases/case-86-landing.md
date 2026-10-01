---
case: case-86-landing
descriptor: "Luxury polar expedition travel operator"
region: Africa (South Africa) / polar
site_type: landing / company (luxury travel operator)
industry: luxury polar expeditions
platform: Next.js + Sanity
libs_detected: [lenis, next]   # backdrop blur on nav chips, 3 sticky, difference blend
direction_match: [film-title-bands, estate-didone, cold-chrome-luxury]
captured: 2026-09-30
source: "award gallery scan 2026-09 (site of the day; mobile home failed; desktop home + 3 inner pages fine)"
---
> An expedition film's title cards on white ice: a long-legged serif naming each place, the flight route as a 320px code, and the continent itself as the map you scroll across.

## DNA summary
- Macrostructure: one pinned page-content (9,728px) that moves between white pages and full-bleed photography: intro (small serif words on white with a pen-stroke flourish) -> mountain panorama -> trips title (serif caps with a hand-drawn loop line) + image strip -> quote -> black band (camps) -> route section: an end-of-the-earth title + coordinates of the departure city and the ice runway at both edges, a 3D-ish continent render scrolling from the departure continent to the ice with a flight line, flight stats card (05:30 HRS / 4,220 KM / -5°C) and a giant route code of two airport codes ("AAA – BBB" pattern) at 320px Oswald -> photo CTA (start planning) -> "how it works" 6-step flyout (sticky) -> footer.
- Hero archetype: understated - white page with visible 12-column hairline grid, an italic serif one-liner (luxury and adventure in the remotest place) + the continent name top-start, a greyed 42px serif caps paragraph that fills in on scroll (S-06), signature-like flourish.
- Nav: N10 chips - 3 translucent grey chips start (Experience / Operation / About), centred logo (mountain icon + spaced caps wordmark), 2 chips end (Rates / Enquire); blur 3-7.5px; turns black bar on dark sections. Floating round chat button bottom-end.
- Footer: light grey #efefef: trade/other enquiries contacts, 3 link columns (trips / camps / about / social), 3 tiles (dates & rates / enquire now / newsletter signup), giant condensed wordmark in navy #1f2a44 full width, partner badges row, a closing quote from a historic polar explorer.

## Signature moves
- Visible grid: faint vertical 12-column rules drawn over the whole site (white and photo sections) - the page looks like a surveyed map sheet.
- Route as typography: departure/arrival airport codes set 320px + distance/time/temperature card - logistics turned into a poster.
- Extreme type contrast: hairline-elegant long serif (Cardinal Classic Long) for place names vs tracked condensed Oswald for labels (letter-spacing 9px at 18px = 0.5em) vs tiny Inter Tight UI.

## Tokens observed
- Fonts: Cardinal Classic Long 400/500 (display serif caps, 42-140px, lh 1.0), Oswald 400/500 (320px route code; labels 18px +0.5em caps), Inter Tight (UI 12-18px). Free subs: serif "Cormorant Garamond" 500 / "Cinzel" (caps) / "Italiana"; Oswald and Inter Tight are free. Hebrew: serif "Frank Ruhl Libre" 300/500 or "David Libre"; condensed labels "Oswald" has no Hebrew -> "Secular One" or "Heebo" 500 with 0.1em (reduce tracking for Hebrew); UI "Heebo".
- Scale: 320/0.9 (route code), 140 (camps title), 118 (inner H1s), 60, 42/1.0 (paragraph caps), 32 italic, 20, 18 (tracked labels), 14 body.
- Palette: white #ffffff canvas, navy ink #1f2a44 (headlines, footer wordmark), grey text #535353, off-greys #f5f5f5 / #efefef / #f3f1ec, near-black #090b10 (highlights section), orange #ff7e15 (one link/accent in how it works), photography carries blues.
- Radii: 2px (chips, cards) and 4-6px; 100% chat button. Shadows: hairline inset highlight on glass chips (`inset 0.35px 0.35px rgba(255,255,255,.2)`).
- Section padding up to 320px (itineraries).

## Motion inventory
- Lenis; pinned master container; text fill-on-scroll for the intro paragraph; hand-drawn flourish lines drawing (SVG); continent/map scroll with flight path draw; image strip reveals; sticky "how it works" flyout; gallery slider on camp pages; video (1). Blend difference on logo over photos.

## Layout notes
- Symmetric centred compositions on a visible grid; small text columns (300px) placed at precise grid lines, often start-aligned inside a centred composition.
- Coordinates as edge labels (start and end of the route line) - degrees/minutes + city name.

## Imagery
- Aerial and wide polar photography (peaks, ice tunnels, blue ice, camp pods), natural cold grade; people tiny in the frame for scale.

## Page set observed
- Itineraries: full-bleed ice-tunnel hero, tracked caps eyebrow + 118px serif trips title bottom-centre; intro; pinned itinerary list (42px serif trip-name cards with seasons); CTA banner.
- Camp page: hero photo of pods with centred camp name 60px + 1-line lede + coordinates bottom-centre + "watch film" thumbnail end; glass-centred banner; editorial text; amenities; "a closer look" gallery slider; dark highlights pinned section; CTA.
- Region page: italic "Regions" kicker over a 118px region name on aerial photo; bottom tab bar of 5 regions - in-hero sub-nav.

## Mobile notes
- Not observed (mobile home returned an error).

## Steal / Don't steal
- Steal: visible grid rules as texture for surveying/architecture/travel; route or coordinate typography as a poster moment; region tab bar inside the hero; small glass chips as nav; giant condensed wordmark footer in the ink colour; "how it works" numbered steps for high-ticket enquiries.
- Don't steal: 0.5em tracked labels in Hebrew; pale grey 42px paragraph at low contrast before it fills in (ensure final state meets contrast).

## ACF mapping hints
- `intro_fill_text` (eyebrow italic, place name, paragraph, flourish SVG).
- `route_poster` (from code, to code, from/to coordinates, stats repeater: label, value), map image/video.
- `region_hero` (image, italic kicker, h1, tabs relationship to regions).
- `steps_flyout` (repeater: number, title, text).
- Options: visible grid on/off, chat button link.
