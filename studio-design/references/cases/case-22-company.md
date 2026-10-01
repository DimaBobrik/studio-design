---
case: case-22-company
descriptor: Lisbon/Amsterdam digital design studio's own site
region: Europe (Portugal / Netherlands)
site_type: company (agency own site)
industry: digital design studio
platform: Nuxt 2 (static) + Storyblok, WebGL slider
libs_detected: []   # 8 videos on home
direction_match: [film-title-bands, whisper-studio, void-stage]
captured: 2026-10-01
source: "agency own site scan 2026-10"
tags: [agency, WORLD]
scan_quality: home and case intros are fixed 900px stages (scroll-driven); text extracted via DOM probe
---
> A dusk photograph of a historic dome, a 16px sentence floating at the start, and a single word in 250px light grotesk rising out of the bottom edge; later, the reel trigger in 144px is itself the button.

## DNA summary
- Macrostructure (home): full-bleed photo hero (H-22 family) with three discipline words at 250px Lausanne 300 (-0.046em) scrolling up one by one from the bottom edge; small 16px studio sentence mid-start; nav 4 links top-end (Work, Studio, News, Contact) at 14px. Later chapters: work slider (WebGL glass-like distortion, numbered 01/14), "Play Reel" 144px type-as-button (G-13 type trigger), studio, news.
- Case: project title at 144px light (descriptive 3-word titles) word-stacked, then sections with challenge/solution/results vocabulary, credits and awards; ~440-500 words; media ≈100% of the visible stage.

## Signature moves
- **Giant light-weight words over photography**, not heavy caps: 250px at weight 300.
- **"Play Reel" as display type**: the reel trigger is a word, not a disc.
- WebGL fluid distortion between projects in the work slider with a 01/14 index.

## Tokens observed
- Fonts: Lausanne 300/400 (commercial). Free subs: "Inter Tight" 300, "Manrope" 300, "Albert Sans" 300. Hebrew: Assistant 300 / Heebo 300.
- Palette: #0D0E13 near-black, white, warm beige rgba(224,205,189,.8) secondary text over photos (use solid #E0CDBD).
- Sizes 14 / 16 / 24 / 144 / 250px. Radii 0.

## Motion inventory
- Word-by-word rise of the 250px hero words; WebGL distortion slider; videos; page transitions (SPA).

## Steal / Don't steal
- Steal: light-weight giant words over a photo (H-01 + H-22 combination); reel trigger as a display word; numbered work slider.
- Don't steal: the whole site as a fixed stage (no long page for SEO); 80% alpha text on photos without a scrim.

## ACF mapping hints
- `hero_words` (repeater of words, photo/video, sentence) · `reel_word` (label, reel file, poster) · `work_slider` (relationship, index) · case: `title_words`, `chapters`, `credits`, `awards`.
