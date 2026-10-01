# Sections catalog · footer and WordPress mapping

Sections catalog is split in three files: `sections-hero-nav.md` (§0 composition rules, §1 hero, §2 nav), `sections-content.md` (§3 features … §7 CTA, §9 gallery, §10 team/about/contact, §11 stats/newsletter, §13 case study), `sections-footer-wp.md` (§8 footer, §12 WordPress mapping). E-commerce patterns: `ecommerce-plp-pdp.md` / `ecommerce-cart-account.md`; widgets: `widgets.md`; backgrounds: `backgrounds.md`.

**Quick index**
- §8. Footer (Hallmark Ft1-Ft8 + effects): Ft1…FT-05 (13)
- §12. Section -> WordPress mapping convention: rules

Row format and wireframe notation: `sections-hero-nav.md` (top); composition rules §0 there apply to every section.

## 8. Footer (Hallmark Ft1-Ft8 + effects)

Default AWAY from the 4-column Product/Company/Resources/Legal + socials footer except FT-04 on stores (needed there). Legal links, accessibility statement (Israel: "הצהרת נגישות" mandatory), and © always present.

| id | name | wireframe | use when | module / recipe | knobs | ACF (Options) |
|---|---|---|---|---|---|---|
| Ft1 | Mast-headed | `[BIG WORDMARK / small link row / legal]` | Brands, studios | `split-reveal` on wordmark | wordmark crop none/half/bleed · rows 1/2 · colour inverse/canvas | wordmark, links |
| Ft2 | Single inline line | `[© Name · Privacy · Accessibility · Instagram]` | Minimal, letter-like | plain | alignment · separators · size | links |
| Ft3 | Four-column link footer | `[logo + line | Product | Company | Resources | Legal] / [© · socials]` | **Avoid by default** (attractor, antipatterns #33); allowed when the IA truly needs it (> 15 footer links, corporate with several audiences); stores use FT-04 | plain; `accordion` columns on mobile | columns 3/4 · logo column yes/no · bottom row legal/socials | menus (footer-1..4), socials |
| Ft4 | Dense colophon | `list[fonts used, credits, stack, address, legal] small mono` | Editorial, Swiss | plain | columns 2/3 · mono/body · credits yes/no | colophon fields |
| Ft5 | Statement sentence | `text[One sentence with inline links: "Write to us at x or visit y."]` | Agencies, personal | plain | size 2xl/3xl · link style underline/colour | sentence (WYSIWYG) |
| Ft6 | Letter close | `[Signature SVG draws / name / contact]` | Personal brands, lawyers, founders | `split-reveal` + DrawSVG | signature svg/typed · alignment | signature, contact |
| Ft7 | Newsletter-first | `[H2 + email input huge] / [small links]` | Media, DTC | form | input style underline/boxed · incentive text · links row | form id |
| Ft8 | Marquee footer | `loop[~ CONTACT ✳ CONTACT ~] / links` | Neo-brutal, events (counts as marquee) | `marquee` | speed · stroke/fill · direction | text |
| FT-01 | Giant cropped wordmark | `[links rows] / [WORDMARK 22vw, cut by viewport bottom]` | Agencies, fashion, DTC | `footer-reveal` `[data-fit-text]` (fits the wordmark to the container width; `data-crop` 0-.4, `data-rise`) or plain CSS `font-size:22vw; line-height:.8; overflow:clip`; decorative copy `aria-hidden` | crop 30/50% · colour accent/ink/outline · letters rise on enter yes/no | wordmark |
| FT-02 | Curtain reveal | page slides away revealing fixed footer below | Premium brands, portfolios | `footer-reveal` | height 60/80/100dvh · `data-parallax` 0/30/50 (%) · combine with FT-01 (`data-fit-text` wordmark) | — |
| FT-03 | Cursor-lit outline wordmark | outline SVG text, light follows cursor | SaaS, dev tools | Recipe: SVG `<text>` stroke with `radialGradient` cx/cy from pointer | stroke width · light colour · draw on enter | wordmark |
| FT-04 | Mega footer (store) | `[newsletter | 4 cols links | payments + trust | lang/currency]` accordions on mobile | E-commerce, large corporate | `accordion` for mobile columns | columns 3/4/5 · newsletter top/side · payment icons row | menus, payments, socials |
| FT-05 | Live info footer | `[Open now · 10:00-19:00 | map pin | address marquee]` | Restaurants, studios, local | Recipe: `Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Jerusalem'})` from real opening hours (never a decorative clock) | info set · map static/dotted · marquee on/off | hours (repeater), address |

---

## 12. Section -> WordPress mapping convention

- One ACF Flexible Content field `sections` on pages/CPTs; each row layout name = section id in snake case (`h_13_split`, `f_05_stack_cards`). Template part: `template-parts/sections/<id>.php`.
- Every layout has common fields: `anchor_id`, `theme` (canvas/surface/inverse), `padding_top`/`padding_bottom` (select s/m/l), `bg` group (backgrounds.md), `fx_enabled` (true/false to switch motion off per section).
- Output `data-fx` and `data-*` from fields; call `SD.initAll(block)` in ACF preview `render_block_preview` JS hook and `SD.destroyAll` before re-render.
- Repeaters feed lists; relationships feed CPT-driven sections (team, projects, posts, products).
