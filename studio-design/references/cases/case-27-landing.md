---
case: case-27-landing
descriptor: JavaScript animation library's product site (developer tool)
region: global
site_type: landing (developer product)
industry: JavaScript animation library
platform: Webflow (+ Docusaurus docs)
libs_detected: [gsap]   # plugins bundled, not exposed as globals in scan
direction_match: [dev-playground, media-bento-night, inflatable-pop]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: hero and several scroll frames render empty (animations wait for interaction/scroll); pricing/showcase heroes also blank
---
> A toy box on a warm-black workbench: cream letters that swap places, candy-gradient spheres and squares that fling themselves around each word.

## DNA summary
- Macrostructure: statement -> 4 capability chapters -> showcase -> brands -> footer. Very few words per screen; each chapter is a single demo plus one sentence.
- Hero archetype: kinetic type hero (2-word imperative, 913px) - captured blank (animation-driven). Intro: 44-66px statement paragraph in cream with a hand-drawn squiggle + asterisk sticker overlapping the text (the doodle crosses letters).
- Nav: HD-01 announcement bar (green gradient `linear-gradient(114deg,#0ae448,#abff84)`, 21px tall, megaphone icon, underlined link) + N2 bar: italic brush logotype start, 6 text links (tools / showcase / community / learn / docs / demos) in muted grey, outlined pill "get it" end; hairline rule under the bar. Fixed, 127px total.
- Footer: 2-part - dark sitemap with coloured category heads (core green, scroll pink, SVG orange, UI cyan, text violet, other green) as 6 columns; then cream #fffce1 block with newsletter (underline input + arrow) + 2 link columns + platform mark (Ft7 + FT-04 combination).
- Home sections (DOM): hero -> intro statement -> demo -> tool rows: [demo object start | colour-coded label + 32px sentence + outlined "explore" pill] x4 (scroll pink sphere, SVG orange sphere, text violet square+sphere with the word split in two, UI cyan square) separated by hairlines -> brands -> showcase (giant word bottom-start, then video carousel with project name, plugins used in `{brackets}`, "explore all" pill + round arrow buttons) -> footer.

## Signature moves
- Colour = taxonomy: each plugin family owns one hue (pink scroll, orange SVG, violet text, cyan UI, green core); the colour appears only on its label, its demo object and its footer column head. A 5-hue system that never becomes decoration.
- Letters as objects: a word broken across a grid with geometric shapes taking letter slots.
- Brackets as metadata: `{ScrollTrigger, SplitText, CustomEase}` under each showcase item.

## Tokens observed
- Font: Mori (single family 400/600; docs add Fraktion Mono). Free subs: "Inter Tight" / "Hanken Grotesk" 400/600, mono "JetBrains Mono". Hebrew: "Heebo" 400/600 or "Rubik" 400/500.
- Scale: 76.4/1.0 -0.01em w600 (showcase title), 65.8/1.2 w400 intro statement, 44.4/1.2 chapter sentence, pricing H2 101.3/1.0 w600; body 14-22.8px; nav 18.9px.
- Palette (root vars): near-black #0e100f (canvas), off-black #191919, surface cream #fffce1 (cream ink + light blocks), green #0ae448, pink #fec5fb, hot pink #f100cb, orange #ff8709, lilac #9d95ff, blue #00bae2, muted #7c7c6f; pricing sky #bef3fe / #e1faff.
- Radii: 100px pills (outlined buttons, 1px cream border), 8px cards, 50% spheres. No shadows. Multiply blend on stickers.
- Section paddings ~108/108, 118/118, 220/140; container 1920 outer.

## Motion inventory
- Everything GSAP: kinetic hero letters, draw-on squiggle (DrawSVG), shapes morphing/rotating per chapter on scroll (ScrollTrigger), SplitText swaps, showcase video carousel. No Lenis (native scroll), no custom cursor, no marquee.

## Layout notes
- Chapters: 2-col `[demo 3/12 | text 6/12]` with a hairline between rows, ~200px per row; lots of empty black.
- Docs: 3-col docs layout (sidebar 260 | content 1000 | TOC), gradient-bordered plugin cards (pink->cyan) with "popular" green chips and CDN buttons.

## Imagery
- No photos on home; soft 3D-ish gradient primitives (sphere, rounded square) + doodles; showcase = client videos.

## Page set observed
- Showcase: dark hero video carousel, then cream filter gallery, grid of projects with names in grey.
- Pricing: "now free" announcement hero with 25 images; sky-blue #e1faff intro with a 101px headline, team, testimonials, brands, demos (dark), more-links, FAQs.
- Docs: Docusaurus-like; green gradient INFO callout; gradient-bordered cards.

## Mobile notes
- Menu pill (text "Menu" + burger lines) replaces links; chapters stack object above label; footer sitemap 2 columns.

## Steal / Don't steal
- Steal: colour-as-taxonomy (assign each service/category one hue, use it only for its label/object/footer head); outlined 1px pill buttons on dark; bracketed tech/meta line; doodle sticker overlapping a statement; cream (not white) as ink on near-black.
- Don't steal: blank-until-animated hero (render final state server-side, animate from it); logo/brush italic brand mark.

## ACF mapping hints
- `statement_doodle` (text, doodle SVG, position).
- `capability_rows` (repeater: label, colour token, sentence, cta, demo type [shape/video/lottie]).
- `showcase_carousel` (relationship projects: video, name, meta tags).
- Options: announcement bar (text, link, gradient on/off); footer sitemap columns with colour tokens.
