---
case: case-85-landing
descriptor: "B2B SaaS for industrial waste-cost analytics"
region: Europe (France)
site_type: landing (B2B SaaS: waste-cost analytics)
industry: waste management / industrial finance
platform: Webflow, GSAP + ScrollTrigger + SplitText, Lenis, Swiper
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, swiper, webflow]
direction_match: [swiss-signal-grid, billboard-type, cell-ledger]
captured: 2026-09-30
source: "award gallery scan 2026-09 (home only)"
---
> A trade newspaper about garbage: heavy black caps across the full width, torn strips of scrapyard photos, dotted ledger rules, and one red that means money.

## DNA summary
- Macrostructure (8,835px): hero = a 3-word rhyming waste-equals-money slogan (full-width heavy caps ~115px) above a row of 9 slanted b/w photo strips (scrapyards, skips) cut like newspaper clippings, then free-trial line + mono paragraph + red "book a call" block -> "they trust us" logo row -> red #ff3316 split band (how the product turns waste into savings) with department list (EHS / PURCHASING / FINANCE / SUSTAINABILITY) as big caps and a white card with a 24.05% ring chart + chips (no spreadsheets / flag overcharges) -> pinned 3,200px capability sequence -> an 88px caps statement (builds on existing workflows, doesn't change operations) -> "the effect" numbers (+30 000 $) -> CTA.
- Hero archetype: H-01 giant type + strip collage.
- Nav: static 79px: logo, 3 links, outlined "book a demo call" + red "login".
- Proof: real client logos, a savings figure, a ring chart — no icon features.

## Signature moves
- **Newsprint grammar for SaaS**: dotted 1px rules between rows (border-style dotted), mono caps captions (IBM Plex Mono 14px uppercase), heavy grotesk caps headlines tracked -0.02em, photos in b/w.
- **Slanted clipping strips**: the hero photo is 9 skewed vertical strips with gaps (clip-path parallelograms) — reads as torn paper without a texture.
- **Red as money**: #ff3316 is used for full bands and the main CTA only; the ring chart shows the saving in the same red.

## Tokens observed
- Fonts: Suisse Int'l 700 caps (display 56-115px, lh 0.9-1.0, -0.02em), IBM Plex Mono 400 (H1 sentence 68px!, body/labels 14px caps). 2 families. Free subs: "Inter Tight" 800 / "Archivo" 800 caps; "IBM Plex Mono" is free. Hebrew: "Heebo" 900 caps-equivalent heavy; mono labels "IBM Plex Sans Hebrew" 400 (no Hebrew mono; keep numbers in Plex Mono).
- Palette: white canvas, near-black #1b0401 (warm), red #ff3316 (31 uses: bands, CTA), grey #f1f1f1/#f7f7f7 cards, #111 dark. Radius: pill only on chips/CTA, 0 elsewhere. No shadows.

## Motion inventory
SplitText headline reveals, one pinned capability sequence, Swiper for logos/cards. Budget moderate.

## Imagery
Documentary b/w photos of waste sites cut into strips; product UI cards with real-looking numbers.

## Mobile notes
40px H1; strips reduce to 4; red band stacks list over the chart card.

## Steal / Don't steal
- Steal: newsprint rules + mono captions for a data-heavy B2B; b/w industry photos cut into slanted strips; one colour tied to money/benefit.
- Don't steal: mono as the H1 face (68px mono sentences read clumsy); all-caps paragraphs.

## ACF mapping hints
- `strip_collage` (images repeater, strip count 5/7/9, skew deg).
- `department_split` (list repeater, stat card: value, label, chips).
