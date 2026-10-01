---
case: case-20-company
descriptor: Boutique residential development on the Spanish Mediterranean coast (sales site)
region: Europe (Spain)
site_type: company / landing (real-estate development sales)
industry: boutique residential development
platform: Webflow
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, barba, lottie, webflow]
direction_match: [estate-didone, cold-chrome-luxury, herbarium]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: a large script cookie card sits bottom-end in every desktop frame
---
> An engraved invitation on sea-blue and burgundy card: condensed didone capitals, one signed script word, bougainvillea spilling over the margins.

## DNA summary
- Macrostructure: 17 sections alternating three "themes" (`theme_on-color` burgundy #340c24, `theme_on-brand` sky-blue #b5cedb, cream #f3f3ec) with clip/arch transitions; several pinned chapters (concept 4,514px, amenities scroll, a lifestyle-phrase chapter 2,979px, architecture 3,379px). Ends with sea views + sales office (phone number as a giant headline).
- Hero archetype: H-22 centred film band - rendered pool + white villas under deep blue sky; project name in condensed didone caps 173px/0.87 white centred at top with the town name in script crossing under it; a short homecoming phrase split to both sides of the name; circular rotating seal logo top-start (name around a flower mark); "SCROLL" vertical label + counter "00".
- Nav: corners only (N10): seal logo top-start; top-end stacked: select-an-apartment (didone, underlined), book a call, contact (tiny tracked caps). Vertical progress line with counters (00 -> 100) on the start edge, "SCROLL" rotated.
- Footer: burgundy: flower mark, phone number in 70px didone with digits fading in, sales office address, legal, maker credit.
- Home sections (DOM): hero (pinned) -> arch transition to sky-blue -> real-life location (image slider 1/2) -> community-over-complex statement -> concept (cream, 57px didone caps paragraph cropped at the edges, bougainvillea cut-outs) -> neighbourhood chapter (burgundy, aerial) -> coast statement with one script word + hand-drawn coastline with drive times to 4 nearby landmarks (5-50 min) -> unit type block (bedrooms, area range in m², explore pill) -> residence range statement -> gated-community amenities list (active item white, others faded) over night render -> "the space to…" -> architecture (349px word) -> licence/permit statement with asterisks -> sea views -> sales office.

## Signature moves
- Didone-condensed caps + one script word per headline (the project name + script town name; a coast statement with one script possessive) - the script is the emotional signature, used once per block.
- Cut-out bougainvillea branches entering from page corners as a recurring ornament (real photo cut-outs, magenta against cream/blue).
- Arch-shaped section tops (`border-radius: 720px 720px 0 0`) and an arch "three reasons" block with text on the curve (mobile).
- Drive-time coastline: a hand-drawn line with points and minutes - location proof as illustration.

## Tokens observed
- Fonts: Ambroise Francois (condensed didone caps display; 22.5-349px; tracking -0.024em, or +0.8em for small tracked lines), Sloop Script Three (script accents 108-173px), Maison Neue Extended (UI 8.1-11.7px caps +0.32em, body 25px). Free subs: didone "Bodoni Moda" 400 (no free condensed didone; use "Italiana"/"Bodoni Moda" with tighter tracking, or "Playfair Display SC" sparingly); script "Pinyon Script" / "Great Vibes"; extended UI "Syne"/"Unbounded" 400 at small sizes or "Archivo Expanded". Hebrew: didone -> "Frank Ruhl Libre" 300/400 or "Suez One" (no Hebrew script with the same feel - drop the script in Hebrew and use a colour/size shift instead); UI "Heebo".
- Scale: 349 (architecture word), 173/0.87 (H1s on home, apartments, contact), 122/0.88, 108 (script), 86/0.91, 56.7/0.88 (caps paragraphs), 36, 25.2 body, 11.7 / 9.9 / 8.1 UI caps (too small).
- Palette: navy ink #17233b, burgundy #340c24, sky-blue #b5cedb, cream #f3f3ec, white; magenta only via flower photography.
- Radii: 50% (seal, round view-apartments circle button), 720px arch tops, 36px, 2-3.6px chips. Ultra-soft layered shadow on cards.

## Motion inventory
- GSAP ScrollTrigger + SplitText + Lenis + Barba + Lottie (seal/flower). Pinned hero and chapters, arch clip reveals, rotating seal, progress counter 00->100 on the side rail, amenities list active-state scroll, digit-by-digit phone reveal, marquee flag, floating tips (CMS tooltips), drag slider ("drag to see more").

## Layout notes
- Symmetric, centred compositions with a vertical hairline + scroll counter on the start edge and nav on the end edge; body text columns ~340px; headlines often cropped by viewport edges.

## Imagery
- Architectural renders (sunny pool, twilight), aerial coast photos, cut-out bougainvillea, floor plans on the apartments page.

## Page set observed
- Apartments: cream, 173px title + unit count end-aligned; filter bar (typology / bedrooms / sort / reset) in a rounded hairline frame; unit cards with floor + completion quarter + floor-plan drawings (unit selector = PLP).
- Contact: sky-blue, 173px title, 3 columns (write us / sales office + location / talk to us + WhatsApp), illustrated line map with a navy sales-office pin label with daily hours.

## Mobile notes
- H1 90/81.9 (still dominant); cookie bar full width; sections become stacked cards with arches; drive-time line crops.

## Steal / Don't steal
- Steal: script-word signature (Latin); seal logo that rotates; drive-time line map; unit selector with plan drawings as cards + filter bar; phone number as the closing headline; theme-switching sections with a fixed palette of 3 fields.
- Don't steal: 8-10px tracked UI caps; giant cookie card over content; script words in Hebrew (no equivalent - replace with colour).

## ACF mapping hints
- `hero_estate` (image/video, name, script word, left/right phrase, seal SVG).
- Wrapper option: `theme` (color|brand|cream), `top_shape` (straight|arch).
- `statement_script` (caps text with an inline script-word span).
- `drive_times` (repeater: place, minutes, x/y on SVG line).
- CPT `unit`: typology, bedrooms, area range, completion, plan images; archive filter bar.
- `sales_office` (phone, address, hours, map).
