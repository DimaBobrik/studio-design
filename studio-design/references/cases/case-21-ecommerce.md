---
case: case-21-ecommerce
descriptor: US single-product vegan multivitamin gummy DTC store (WooCommerce)
region: US
site_type: ecommerce (single hero product)
industry: vegan multivitamin gummies (DTC wellness)
platform: WordPress + WooCommerce (Bootstrap-based theme)
libs_detected: [gsap, ScrollTrigger, SplitText, lenis, barba, wordpress, woocommerce]
direction_match: [inflatable-pop, machined-soft, organic-colour-block]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: every desktop frame blurred by an email-capture modal shown on load; layout read from mobile + unblurred edges
---
> A pharmacy shelf repainted in highlighter: one lime bottle, candy stars tumbling out of it, everything else white and blue-violet.

## DNA summary
- Macrostructure: single-product funnel. Home = SEO long-read (benefits, ingredients, gummies vs pills, FAQ) that funnels into one PDP; PDP = the real landing page (scroll-scrubbed hero, subscription buybox, ingredient band, FAQ, reviews); About = pinned kinetic statement.
- Hero archetype (home): H-13 split - lime-to-white vertical gradient canvas (`linear-gradient(#dcf344, #fbfbfd)`), keyword H1 (product category) start (Sora 600, 67px), paragraphs + bullet list + two stacked lime pill CTAs (own shop / marketplace); right column = 3D bottle render with gummy stars.
- Nav: N1-style small pill groups: white pill with ABOUT / SHOP / BLOG top-start, centred logo in a lime tab that hangs from the top edge (radius `0 0 8px 8px`), white pill with account + cart top-end. No bar.
- Footer: pale blue #f0f4fc, giant white outlined/ghost wordmark across the top (FT-01), one-line brand statement, contact email, legal row. On About, footer is pinned and scrubbed.
- Home sections (mobile-verified order): hero -> why-choose text + bottle photo -> expert-formulated claim -> clean ingredients (bullet list) + resource-hub CTA -> benefits centred + 3 lime cards (energy / immune / hair-skin) -> gummies vs pills + photo -> compassion/results lime cards -> FAQ -> closing routine CTA + sea photo -> footer.

## Signature moves
- One acid lime #dcf343 used as *surface* (cards, pills, gradient top, logo tab), not as text; the "second" colour blue-violet #4949e9 appears only on the PDP (price, subscription card border, buttons, headings) - two-accent handoff between content pages and the buying page.
- Tumbling 3D gummy stars (PNG sprites) as parallax confetti in every hero, and blurred in foreground on About for depth.
- PDP active-ingredients band: 168px Sora 800 caps count + label on full lime + ingredient chips (white pills with hairline) - facts as a poster.

## Tokens observed
- Fonts: Sora (display 600/700/800), Inter (body 400-600, 18/27 and 20px). Both free on Google Fonts. Hebrew: "Rubik" 600/800 for Sora, "Assistant"/"Heebo" for Inter.
- Scale: H1 67.2/1.0 (home), 168.6/0.87 uppercase w800 (PDP band, About), H2 46/1.0, H3 34/1.0, promo 30/34.5 w800 caps -0.03em, body 18/27, UI 16-20px.
- Palette: lime #dcf343 (surface), pale lime #f2ff98 (gradient end), ink #2d2d2d (never pure black), violet-blue #4949e9 (PDP accent, focus shadow `0 10px 24px -12px rgba(74,71,232,.6)`), lavender #dedcfb / #e0e8ff, off-white #fbfbfd, footer #f0f4fc, olive text on lime #4f590b.
- Radii: 999px pills (all buttons), 10px cards/inputs, 16px review cards, 4px chips, `0 0 8px 8px` logo tab.
- Containers: 1368/1260 content, 750-760 text column (guides), 560-570 PDP columns.

## Motion inventory
- GSAP + ScrollTrigger + SplitText + Lenis + Barba (page transitions). `.scrubContainer` on PDP hero and About: pinned scrub sections (About: 12,600px page with 4,500px pinned caps statement and floating gummies passing in front with blur). Testimonial cards animate in on About. Sticky elements 1.
- Newsletter modal on first paint with page blur behind (NL-02 misuse - see Don't).

## Layout notes
- Bootstrap 12-col; home content column ~50/50 text/image zigzag; PDP 2-col (gallery 7 / buybox 5) with the gallery breaking into a grassy-hill render at the bottom.

## Imagery
- 3D bottle + gummy renders on lime/white gradients; lifestyle product photos (fruit, tea, desk) with shallow depth of field; UGC-style customer portraits in review cards.

## Page set observed
- PDP: hero with giant ghost caps text behind the bottle; buybox in a white card: title in violet 46px, subscription options as bordered radio cards (3-month plan with struck compare price / monthly / buy once), qty stepper + lime ADD TO CART, accordions (supplement facts / how to use); benefit icon list with portrait; trust chips (vegan, non-GMO, third-party tested, made in country, eco packaging); ingredients poster band; top-questions accordion; testimonial rail (quote cards alternating lime/white + video card); review count summary + 2-col review cards (S-08/SM-03).
- Guide page (per-nutrient long-read): 760px column, H2/H3 per vitamin - SEO hub.
- About: pinned kinetic statement -> founder story -> scattered team photos floating in white space -> pinned footer.

## Mobile notes
- H1 46.8/40.7; everything single column; lime cards full-bleed; two full-width pill CTAs stacked.

## Steal / Don't steal
- Steal: surface-accent (lime as plates, not text); content-page accent vs buy-page accent handoff; subscription radio cards with struck compare price; ingredients as chip poster; ghost giant text behind a product render.
- Don't steal: modal on first paint blurring the whole page (kills LCP/first impression; NL-02 rule = after 30s or 50% scroll); lime at L≈90% with white text (contrast fails - keep ink #2d2d2d on lime); Bootstrap default vars leaking.

## ACF mapping hints
- `hero_product_gradient` (gradient stops, h1, body, cta repeater, render image, sprites repeater with depth).
- `benefit_cards` (repeater title/text, surface token). `poster_band` (big text, chips repeater, link).
- Woo: subscription options via plugin; ACF on product: `ghost_text`, `trust_chips`, `ingredients` repeater.
- `kinetic_statement_pinned` (text, sprites, scroll length) for About.
