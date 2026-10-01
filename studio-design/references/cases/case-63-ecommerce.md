---
case: case-63-ecommerce
descriptor: "Mexican creative collective: store, office, studio and magazine under one name"
region: Latin America (Mexico)
site_type: ecommerce + company (store, office, studio, magazine under one name)
industry: creative collective
platform: Next.js
libs_detected: [next]
direction_match: [index-mono-gallery, film-title-bands]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only; single-screen site captured fully, 915px)"
---
> A family tree written as one sentence: the entities' names set 60px across a black-and-white photo, each with a tiny superscript saying what it is.

## DNA summary
- One screen (915px): full-bleed b/w photograph (two figures holding hands, silhouettes) -> top row: collective name + 3 sub-entities (store / office / studio) as 60px white grotesk words with 11px mono superscripts before each; a centred 16px serif paragraph under it (founders, city, a multilingual thank-you line) -> bottom row: magazine, creative director and photographer credits in the same style -> cart icon top-end, "Index ↓" top-start.
- Hero archetype: H-21 (words as nav over photo) — new nav idea: **sentence index nav**.

## Signature moves
- **Superscript category labels**: each nav word carries a mono micro-label as a superscript (`<sup>` 11px caps) naming its kind (Retail, Work, Common, Book, Creative, Photography).
- Two voices only: 60px Nimbus Sans for names, Times New Roman 16px for prose — deliberately plain faces.
- The photograph is the only colour (none).

## Tokens observed
- Fonts: Nimbus Sans 400 (display 48-61px, -0.1px), Times New Roman 16px, IBM Plex Mono 11px caps (superscripts). Free subs: "Inter" 400 / "Helvetica"-like "Arimo"; serif "Tinos"/"Libre Caslon Text"; mono "IBM Plex Mono". Hebrew: "Heebo" 400 names; superscripts as small "IBM Plex Sans Hebrew" 400 (keep `vertical-align: super`, works in RTL).
- Palette: photo + white text; orange #ff7e46 appears only in the cart overlay.

## Steal / Don't steal
- Steal: one-line index of sub-brands with superscript roles (group companies, holding pages, restaurant groups); plain faces at scale over a strong photo.
- Don't steal: white text over a busy photo without a scrim check.

## ACF mapping hints
- `sentence_nav` (items repeater: label, superscript, link) + `bg_image`.
