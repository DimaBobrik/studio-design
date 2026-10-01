---
case: case-06-ecommerce
descriptor: Canadian kitchen-and-bath faucet brand catalogue
region: Canada
site_type: ecommerce-adjacent brand catalogue (product lines, dealer locator)
industry: kitchen/bath faucets
platform: Webflow + GSAP (ScrollTrigger, SplitText) + Lenis + Swiper
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, swiper, webflow]
direction_match: [architect-calm, estate-didone, organic-colour-block]
captured: 2026-10-01
source: "world agency client scan 2026-10"
scan_quality: good (desktop full + 6 scroll frames + mobile); home only
---
> A tap brand told in tone chapters: every section is a new muted sheet (sage, bone, slate, plum, powder blue) and every headline speaks in two voices, a thin condensed serif line over tracked caps.

## DNA summary
- Macrostructure (9,155px, 7 sections): sage hero with a two-voice headline (120px condensed serif 300 + caps key word on the second line) with product photos scattered in a loose grid -> bone sheet: a 230px pale word with a single black faucet cut-out standing in front of it (canvas sequence) -> PINNED 2,700px chapter run: slate, plum, powder chapters (home / professionals / everyday moments), each a two-voice headline over one kitchen photo -> sage statement band -> light design-quality section with abstract curve tiles -> products: line drawings of faucet silhouettes (Kitchen / Bathroom) -> slate CTA photo grid.
- Hero: H-23-ish loose product grid + H-01 two-voice type. Nav: fixed transparent bar, small "find a product" pill.
- Footer: dark, not captured in detail.

## Signature moves
- **Two-voice headline**: line 1 thin condensed serif sentence case (Queens Condensed 300, 90-120px, -0.03em), line 2 the key word in caps of the same family. Cheap, ownable, works in any section.
- **Tone chapters** (C-71 `tone-shift`): sage #bdc1b6 -> bone #e9e8e4 -> slate #3c4254 -> plum #442c35 -> powder #c0cbd9, all low-chroma; text flips to bone on the dark tones.
- **Object in front of a ghost word**: a 230px pale word (#bdc1b6 on #e9e8e4, deliberately low contrast, decorative) with the product cut-out crossing it.
- **Line-drawn product silhouettes** as category entry (Kitchen / Bathroom) instead of photos.

## Tokens observed
- Fonts: Queens Condensed 300/500 (display), PP Mori 400/500 (body 15px, nav). Free subs: Fontshare "Gambetta" 300 or Google "Newsreader" 300 set at -0.03em (no free condensed serif matches exactly); body "Hanken Grotesk" 500. Hebrew: "Frank Ruhl Libre" 300 for line 1, the caps word becomes "Frank Ruhl Libre" 700 (weight contrast instead of caps).
- Palette (5 sheet tones, no accent): #bdc1b6 sage, #e9e8e4 bone, #3c4254 slate, #442c35 plum, #c0cbd9 powder; ink #302f2c; one oxblood text #712321. Radius 4px, pill 60px buttons. No shadows.

## Motion inventory
Lenis; SplitText line reveals; pinned 2,700px chapter run; canvas image sequence behind the ghost word; swiper product rail.

## Imagery
Clean product cut-outs in matte black/chrome, styled kitchens with the tone of the chapter echoed in the room.

## Steal / Don't steal
- Steal: two-voice headline; one muted tone per chapter (5 tones, all <=0.04 chroma); product silhouettes as category links.
- Don't steal: 230px ghost word in 1.3:1 contrast as the only statement (keep it decorative, `aria-hidden`, and say it again in real text).

## ACF mapping hints
- Layout `chapter` (tone select, headline line 1, headline caps word, image) under a `tone-shift` wrapper.
- `ghost_word` (word, cut-out image).
