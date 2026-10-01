---
case: case-50-ecommerce
descriptor: "Ukrainian charity merch shop selling T-shirts printed with children's drawings"
region: Europe (Ukraine)
site_type: ecommerce
industry: charity merch (T-shirts printed with children's drawings)
platform: WordPress + WooCommerce
libs_detected: [gsap, lenis, swiper, wordpress, woocommerce]
direction_match: [storybook-sketch, inflatable-pop, organic-colour-block]
captured: 2026-09-30
source: "award gallery scan 2026-09"
---
> A children's picture book that turns into a shop on the last page: every spread is a scrubbed illustration, the merch is the ending.

## DNA summary
- Macrostructure: one pinned `.wrapper` (35,143px of scroll on desktop) that plays a scroll-scrubbed illustrated story in ~8 scenes, then lands on merch, about-the-foundation, projects and footer. Story first, shop last.
- Hero archetype: H-01 giant word on a field: a verb that swaps to a noun as you scroll (two short words from the brand's two-word imperative slogan) in wide geometric caps, white on cobalt #2423ad, drawn clouds + sun sprites, tiny lede bottom-start, pill "shop T-shirts" CTA bottom-end with a T-shirt thumbnail above it.
- Nav: N2-lite - flag + 4 text links start (story / foundation / store / contacts), centred wordmark, bag + count bubble (yellow) + pill "submit image" end. Transparent over the field.
- Footer: Ft1/Ft7 mix - torn-paper edge, giant contact email (98px caps, underline rule, COPY chip = C-62), three 64px-radius social tiles, slogan with the logo's "=" glyph inside the word, payment-card logos row.
- Section list (DOM/scroll order): field hero -> "story" label -> scene 1 (child by the sea, paper-white) -> scene 2 (ballet class room) -> scene 3 (night, red scribble explosions, highlighted word naming the invasion) -> scene 4 (evacuation) -> scene 5 (torn paper, displaced) -> merch reveal (3 T-shirts, then 3D shirt rotating over giant outline "our merch") -> about-the-foundation giant 2-line wide caps -> video band -> projects cards on torn-mountain silhouette -> footer.

## Signature moves
- The whole story is illustration scenes that transition by paper tearing / wiping, text centred in 16-39px with hand-drawn marker highlights (C-33) on key words (yellow for hope, red for the war, blue for "drawings/merch").
- The product *is* the story's art: children's drawings reused as sprites in the scenes and printed on the shirts - narrative and catalogue share one asset set.
- Wide-extended caps with letters (E, B) replaced by the logo's triple-bar glyph (☰).

## Tokens observed
- Fonts: Benzin (Medium/Regular/Semibold - wide geometric grotesk, display + UI), Gilroy (body, prices). Free subs: "Unbounded" 500-700 or "Syne" 700 (wide), "Krona One"; body "Manrope"/"Outfit". Hebrew: "Rubik" 500/700 (wide-ish) + "Heebo"; for the wide feel use Rubik with `letter-spacing:0` and scale 1.1x.
- Sizes: display ~98-160px (hero word, rendered via SVG/scaled; biggest text node 98px email), H1 on inner pages 46px/55px +0.015em, story paragraphs 39/50.7 and 28/36.4, product name 22/26.4, body 16/25.6, nav 12-13.6.
- Palette: cobalt field #2423ad, bright cobalt #3a39e3, periwinkle button #5857ff, midnight #03035d / #02022f (ink + night canvas), pale blue #d9e8ff, paper grey #e4e4e4 (scenes), sun yellow (sprites/count bubble, ~#ffd21f), red scribble (scenes only). Ink on light = #02022f, never #000.
- Radii: 16px product image plates, 30px cards, 40px top corners on inner-page white sheet (`40px 40px 0 0`), 64-75px social tiles, pill buttons/size chips (100%).
- Shadows: none. Multiply blend on paper textures.

## Motion inventory
- GSAP (ScrollTrigger inferred from pin) + Lenis; single pinned master timeline scrubbing ~35 viewports: scene crossfades, paper-tear wipes, sprite parallax (clouds, birds, stars drift), word swap in hero, merch shirt 3D rotation (video/sequence) over outline type, about-title bar-letter morph.
- Swiper on shop page: each product is a full-height pinned slide (~2,944px each) - PLP is also a scroll story.
- 5 sticky elements. No custom cursor, no marquee.

## Layout notes
- Story scenes: full viewport, text block centred ~560px wide at 30-40% height, illustration fills the lower 60%.
- Inner pages: navy canvas with a white sheet (radius 40px top) inset 8px from the viewport edges - "page on a desk" frame.
- PDP grid: image plate 50% / buybox 50%, container ~890px buybox column.

## Imagery
- Flat hand-painted illustration (gouache-like texture, crayon scribbles), paper-grey backgrounds with crumpled texture, real children's drawings, one documentary video band, 3D rendered T-shirt.

## Page set observed
- PLP /shop: dark navy, each product a pinned full-screen slide with the child creator's first name and age + NEW + type pills (Adult/Kids) + price range - no grid at all. (Screenshot shows the Woo default sorting select leaking at top-start: unstyled Woo remnants.)
- PDP: white sheet; breadcrumb; image plate 16px radius; title 46px; price range; Type pills + Size circles (XS-XXL) + size guide link; full-width disabled pill "Buy"; creator card (child's first name + age) with portrait + story (product = person); accordions Details / Payment / Shipping / Return.
- Submit image (UGC form): 2 cards (who can apply / how to apply) with torn-paper photo, then long form with underline fields, 2 dashed drag-drop zones, 2 consent checkboxes.

## Mobile notes
- Story becomes stacked rounded scene cards (radius ~16px) each with text above illustration; no pin. Hero word ~60px. Burger + flag + wordmark + bag.

## Steal / Don't steal
- Steal: story-before-shop macrostructure for cause/craft brands; creator card on PDP (who made it); marker highlights on 3-5 keywords per paragraph; inner pages as an inset sheet with top radius on a brand-colour canvas; giant contact email as footer hero with copy button.
- Don't steal: 35-viewport pinned home (too long for most clients; cap at 8-12 viewports); PLP without a grid (fine for 7 products, fails >15); unstyled Woo notices/sorting leaking.

## ACF mapping hints
- `story_scrub` (repeater scenes: bg colour token, illustration layers repeater with depth, text WYSIWYG with highlight spans, transition type tear/wipe/fade) - render as one pinned timeline.
- `hero_word_field` (word(s) repeater, lede, cta, thumbnail).
- Product ACF: `creator_name`, `creator_age`, `creator_photo`, `creator_story` -> PDP creator card.
- `ugc_submit_form` (form id, info cards repeater).
- Footer options: contact email (giant), social tiles repeater, slogan.
