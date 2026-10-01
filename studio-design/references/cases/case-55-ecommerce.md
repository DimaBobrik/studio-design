---
case: case-55-ecommerce
descriptor: "Health-tracking smart-ring wearable brand (hardware + membership DTC)"
region: Europe / North America (Finland / US)
site_type: ecommerce (hardware + membership)
industry: health-tracking smart ring
platform: Next.js front end on headless WordPress
libs_detected: [wordpress, next]   # custom cursor flag; backdrop blur 24px
direction_match: [machined-soft, whisper-studio, cold-chrome-luxury]
captured: 2026-09-30
source: "award gallery scan 2026-09 (reference for a full hardware-DTC page set; cookie bar covers bottom 15% of desktop frames)"
---
> A quiet wellness magazine printed on sand-coloured paper: one condensed-light serif headline per screen, the product always touching skin or stone.

## DNA summary
- Macrostructure: hero -> positioning statement + 3 category image cards -> proof stat + app screens -> testimonials -> new-feature split (a named health-monitoring feature) -> "in the news" dark editorial cards -> footnotes -> footer. Serif statement every screen, UI screenshots as evidence, press as trust.
- Hero archetype: H-22 variant centred - full-bleed macro photo (ring on dark volcanic rock next to a ladybird, grey sky), centred stack: product name 24px + generation-number circle badge, two-word H1 ("adjective. noun." pattern) 110px Editorial New Light, 20px subline, single blue pill "explore" (#2a72de), tax-benefit-eligible micro-badge under it.
- Nav: N2 centred links with chevrons (shop ▾ / your health ▾ / why-us ▾ / for organizations), wordmark start, round cart button end; 90px sticky, transparent over hero, blur 24px when scrolled.
- Footer: dark #1c1b1a rounded-top panel: wordmark + newsletter (serif 40px invitation + pill email input with arrow) start; 4 link columns; payment badges row top-end (HSA/FSA, PayPal, Apple Pay, G Pay, Visa, MC, Amex); legal + language pill. Preceded by a footnotes block (¹ ² disclaimers) - regulated-claims hygiene.
- Home sections (DOM, one pinned wrapper 5,636px): hero -> two-sentence body-insight claim 68px serif + 2 dark pill buttons (why us / how it works) -> 3 rounded image cards with glass label chips + round "+" expanders (sleep / longevity / fitness) -> member-outcome percentage stat with a footnote marker in serif + fanned phone screens -> app screen rail -> 3 testimonial cards (serif quotes, avatar + name) -> dark rounded new-feature block (NEW FEATURES eyebrow, serif H2, explore pill, 3 phones with blurred photo wallpapers) -> "IN THE NEWS" (featured article photo card + stacked press cards with round arrow buttons) -> footnotes -> footer.

## Signature moves
- Editorial New Light (serif, weight 300) at 68-128px with -0.05em tracking (-5.5px at 110px) - tight light serif = calm luxury for a tech product; sans (Akkurat) never exceeds 56px except numbers.
- "+" expander on image cards (card = collapsed story, press + to open) - progressive disclosure without accordions.
- Footnote discipline: every claim gets a superscript and a footnote block before the footer.

## Tokens observed
- Fonts: Editorial New 300/400 (display), AkkuratLL 300-700 (UI/body 16/24). Free subs: display "Instrument Serif" / "Newsreader" 300 (opsz display) / "Fraunces" 300 soft 0; body "Inter"/"Hanken Grotesk". Hebrew: "Frank Ruhl Libre" 300/400 (display) + "Assistant"/"Heebo" (body).
- Scale: 128/1.5(!) PDP H1, 110/1.1 -0.05em, 98/1.1, 96/1.1 -0.03em, 80/1.1, 68/1.1 -0.03em, 56/1.1; numbers 192px Akkurat -0.05em (duration figure), stats 80px serif ("99%").
- Palette: sand #f7f1e8 (canvas; also ink on dark), warm taupe ink #4a4741, muted #a8a5a0, parchment #efe6db, near-black #1c1b1a / #19191c, grey #f3f1f0 / #e2e1da (PDP), action blue #2a72de (primary CTA only), link blue #3860be.
- Radii: pill (9999px, 27 uses), 24px cards and footer top, 12px, 8px, 90px round buttons, `0 0 12px 12px` sticky header dropdown.
- Container 1312/1440; PDP 1024 text / 1656 media.

## Motion inventory
- Pinned home wrapper (sticky 2), fanned phone screens rise on scroll, card "+" expand, video on hero (1). Custom cursor on media. Smooth fades; no Lenis.

## Layout notes
- Home centred-statement rhythm: statement block (~40% viewport) then media row; cards 3-up at 1/3 width each with 24px radius and 24px gaps.
- New-feature block: dark rounded panel inset 24px from viewport edges, split 5/7 text/phones.

## Imagery
- Macro product on natural textures (rock, skin, fabric), warm skin-tone photography, app UI on phones with blurred photo wallpapers; no stock-office imagery.

## Page set observed
- PDP: grey gradient canvas, ring renders cropping the viewport edges, centred 128px white serif claim (built to blend in), intro copy start, finger/hand shots, "watch the film" card, 98px accuracy claim + portrait + sensor copy, 3 stat icons with 99% / 95% / 90% serif numbers, then (not captured) buy flow.
- How it works: sand canvas, a two-sentence 96px claim (the ring measures, the membership explains), morning-time chips ("6:00 AM"), UI overlays on lifestyle photos, blue "shop all" pill.
- Sizing: split hero with hand photo, per-model rows (current + previous generation) with dark sizing-guide pill + "watch the video", cream "confirm your size" band with rounded bottom corners over the dark footer.

## Mobile notes
- H1 48/52.8; hero stack keeps centred type; cards become horizontal swipe; footer columns 2-up.

## Steal / Don't steal
- Steal: light serif at display sizes with negative tracking + neutral sans UI; one functional blue for primary CTAs on a warm neutral site; "+" cards; footnote block; product macro on natural texture; rounded-bottom last band sliding over dark footer.
- Don't steal: sand #f7f1e8 + taupe ink sits on the premium-consumer palette ban (cream + espresso) - use grey/stone or tint shift; -0.05em tracking breaks Hebrew (use 0).

## ACF mapping hints
- `hero_macro_centered` (image/video, eyebrow product + badge, h1, subline, cta, micro-badge).
- `statement_buttons` (h2 serif, lede, buttons repeater). `expand_cards` (repeater: image, chip label, expanded text).
- `stat_claim` (value, text, footnote ref) + global `footnotes` repeater printed before footer.
- `press_cards` (featured + list: outlet, title, link).
- Woo: size guide via ACF on product_cat; `sizing_models` repeater.
