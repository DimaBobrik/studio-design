---
case: case-37-landing
descriptor: Web-based motion-design SaaS tool (light-mode landing)
region: Europe (France)
site_type: landing (SaaS)
industry: web motion-design tool
platform: custom (CSS modules, Lottie hero)
libs_detected: []   # no GSAP/Lenis globals; CSS/JS scroll-appear, Lottie, 9 videos
direction_match: [machined-soft, whisper-studio, inflatable-pop]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: hero Lottie and many template videos show as blank grey cards in captures
---
> A light, tidy animation desk: soft grey cards like trays, heavy black type with a highlighter label on each, one purple slab with a giant "5x".

## DNA summary
- Macrostructure: centred-header sections (pill eyebrow chip -> 72px H2 -> 1-2 line lede with the first clause bold -> CTA) alternating with card grids; two big pull quotes break the rhythm.
- Hero archetype: centred H1 + Lottie product animation (captured blank), announcement chip above (new AI-agents feature · purple "learn more" link). On the product page: a 3-verb H1 at 80px/0.95 -0.03em + lavender "try it free" pill.
- Nav: N2 minimal - wordmark start, 4 links (product / customers / templates / pricing) + Log in + black pill "Sign up" end; morphs on scroll into two floating chips top-end ("Sign up" pill + round menu button) (N11-like). Header 129px incl. padding, fixed.
- Footer: black #000 block with newsletter (monthly updates line, email input + yellow #f5ff63 Subscribe) then link columns; preceded by grey panel with an 80px "try it today" CTA and a rounded `0 0 80px 80px` bottom edge.
- Home sections (DOM): hero (Lottie) -> template rail (cards with author avatar) -> scroll-appear statement (40px, grey #d7d7db words turn ink one by one, S-06) -> video block -> speed-claim pinned card stack (3 cards: agents / full control on cyan #01b2fd / scale on purple #a981ff with giant "5x" 200px) (F-05) -> creative-range feature grid (grey cards, highlighter-labelled titles, "new" yellow tags) -> quote 1 (one word set as a sticker glyph inline) -> teams section -> quote 2 -> collaboration card carousel -> templates rail + "browse templates" -> logo bento -> small promo cards (weekly updates / start free) -> CTA -> footer.

## Signature moves
- Highlighter labels: every card title is a black-on-white (or white-on-black) *text box* hugging the words (`display:inline; background` box-decoration) sitting on a grey/colour card.
- One colour per card in a stacked sequence (grey -> cyan -> purple) - colour marks progression, not brand.
- Grey-to-ink scroll reveal of a 40px paragraph (the product pitch) as its own section.

## Tokens observed
- Fonts: TWK Lausanne 750-800 (display), Inter 400-600 (body/UI). Free sub: "Inter Tight" 800 / "Manrope" 800 / "Figtree" 800. Hebrew: "Heebo" 800 + "Heebo" 400 body (or "Rubik" 700).
- Scale: 200/1.5 (stat "5x", -0.032em), 80/0.95 -0.03em, 72/0.95 -0.044em (very tight), 60/1.0, 48/1.0 -0.04em, 40/1.0 -0.04em; body 18/27 -0.022em, cards 14-16px; titles 20-21px.
- Palette: canvas #ffffff, card grey #f2f1f3 (250 uses) and #e5e4e7, ink #19171c, muted #6e6e73 / #97979b, accents as card fills: cyan #01b2fd, purple #a981ff / lavender #cab3f8 / #b593ff, deep purple ink #17082c / #7a40ed, yellow #f5ff63 (tags, subscribe, "new"), dark gradient `#140726 -> #711de2`.
- Radii: 40px and 50px cards (131/126 uses), 20px small cards, 50% avatars, pill buttons, 80px footer-panel bottom corners. Ultra-soft layered shadows (`0 237px 66px rgba(25,23,28,0)` stack - "floating" cards).
- Containers: 480px card columns, 740-860px text, section spacing 200px top.

## Motion inventory
- Lottie hero; word-by-word colour reveal; pinned card-stack section (2,375px, pin); marquee flag (template rail autoscroll with pause button); card carousels with arrow buttons; header animate-in then morph to chips. Likely CSS + IntersectionObserver; no Lenis.

## Layout notes
- Everything centred on a ~960px axis; cards 480px wide in 2-col grids with 12px gaps; big vertical air (160-240px between sections).
- Quote sections: centred 48-72px quote, author chip (avatar + name + role) in a hairline box.

## Imagery
- Product UI and template renders only; no photography; quotes use small avatars.

## Page set observed
- Product: centred hero -> design-file import icon list -> 3 card-stack sections (design / animate / team) -> export icon list -> logo bento.
- Pricing: grey canvas; monthly/annual segmented toggle with a save-percent chip; plan cards white 20px radius, plan-name tag chips (blue free, yellow pro), price 42px; buttons coloured per plan (sky blue / yellow); compare-plans pinned table (4,144px); quotes; FAQ; dark footer.
- Templates: 72px centred H1, search pill, pinned canvas gallery, categories, SEO text.

## Mobile notes
- H1 64/53.8; cards full width, stack order preserved; header = wordmark + Log in + round menu.

## Steal / Don't steal
- Steal: highlighter-box card titles; colour-per-step stacked cards; statement reveal section; plan-coloured buttons + tag chips; footer panel with big bottom radius sitting on a black footer.
- Don't steal: -0.044em tracking at 72px (too tight for Hebrew - Hebrew tracking 0); product-only imagery that renders blank without JS (always ship posters).

## ACF mapping hints
- `centered_header` (chip, h2, lede with bold lead, cta) - reused above most grids.
- `card_stack_pinned` (cards repeater: label, text, colour token, media).
- `feature_grid_labels` (repeater: label, new flag, text, media).
- `statement_reveal` (text). `quote_big` (quote with inline sticker word, author, role, avatar).
- Pricing: plans repeater with colour token + tag.
