---
case: case-78-company
descriptor: "US tech news publisher (very high volume, headless WordPress)"
region: North America (US)
site_type: company / publisher (news, very high volume)
industry: tech news
platform: WordPress (headless) + Next.js front end
libs_detected: [wordpress, next]
direction_match: [media-bento-night, broadsheet-duet, dev-playground]
captured: 2026-10-01
source: "world agency client scan 2026-10 (home only; built by an enterprise WordPress engineering agency; consent bar visible)"
---
> A publisher home that still has a face: the masthead wordmark is rotated and set huge down the side of the lede, posts flow as a stream with neon purple labels, and one display face carries the brand at 90px.

## DNA summary
- Macrostructure (~23,000px, 2 main flex regions): top bar 37px → lede block: giant rotated wordmark running vertically at the inline-start edge, lead story image + a short punchy lede headline (manuka 900, 90px, lh 0.8) → quick-posts stream (short posts with avatar, timestamp, comments, mixed with cards) in the main column and a numbered top-stories list in the side column → category shelves (latest by section, a reviews shelf, a lavender promo card for a newsletter) → footer.
- Labels: purple #5200ff text, lavender #eee6ff panels, mint #3cffd0 and lime #d6f31f highlights.

## Signature moves
- **Edge-rotated wordmark** (N17) as the masthead.
- **Stream + numbered list** two-column rhythm: a timeline of posts beside a ranked list.
- **One display outlier** (manuka 900 condensed) only for the lede headline; everything else polySans + fkRoman serif.
- **Inset 1px bottom rules** (box-shadow inset) instead of borders to separate posts.

## Tokens observed
- Fonts: polySans 700 (heads 24-34px), fkRomanStandard 400 (dek serif 24px), polySansMono (labels), manuka 900 (lede 90px). Free subs: "Hanken Grotesk" 700, "Newsreader" 400, "JetBrains Mono", "Big Shoulders Display" 900. Hebrew: "Rubik" 700 / "Frank Ruhl Libre" / "Cousine"; display "Karantina" 700.
- Palette: ink #131313, grey #636363, purple #5200ff, lavender #eee6ff, mint #3cffd0, lime #d6f31f. Radius 2-3px, avatars 50%.

## Steal / Don't steal
- Steal for content-heavy WordPress (magazines, blogs, NGOs with news): rotated masthead, stream + ranked list, a display outlier reserved for the lead story, colour-coded labels.
- Don't steal: 4 colour accents (fine for a news brand with a taxonomy, not for a store).

## ACF / WP mapping hints
- Gutenberg: lead story = Query Loop (1 sticky post) with a custom "lede" block style; stream = Query Loop with post-format variations; ranked list = Query Loop ordered by views (meta).
