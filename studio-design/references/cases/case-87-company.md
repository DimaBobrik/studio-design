---
case: case-87-company
descriptor: "US digital product design & engineering agency, part of a global consultancy (own site)"
region: North America (US) / global
site_type: company (agency own site; digital product agency)
industry: digital product design and engineering
platform: headless WordPress + custom JS front end
libs_detected: [wordpress]   # 0 canvas, 0 video on home, 2 iframes
direction_match: [work-wall-neutral, swiss-signal-grid, broadsheet-duet, architect-calm]
captured: 2026-10-01
source: "agency own site scan 2026-10 (home + 2 case studies: a furniture retailer, a consumer-tech giant)"
---
> A white page with one 56px sentence and a business-press quote; the case studies open on a full field of the client's own colour.

## DNA summary
- Macrostructure (home): red square logo tile top-start · 56px one-sentence positioning (solving complex problems through design & technology) · press quote in a serif (a business magazine naming the big-tech clients that trust them) · "Latest" list · sections Select Clients / Expertise & Practice Areas / Outcomes / Process (36px heads). Home ≈170 words, 3,300px.
- Hero: centred-sentence family (A9) saved by the press quote and a red logo tile; no image.
- Case hero (CS-01 client-colour field): client brand blue (#0056A5 for the furniture retailer, #2D51BE for the tech company) field, client name 30px + 32px serif sentence, photo overlapping the field's lower edge.
- Footer: mailto + offices; no giant type.

## Signature moves
- **Client colour as the case hero field**, the studio's own palette is white/grey/red only.
- **Outcomes as 112px numbers** (e.g. 4x · 60% · 4.8 and 495 · 18 · 70) with one-line labels, placed right after "What we did".
- **Recognition & Awards list** in each case: outlet logo-as-text + one quote + "Read more".
- A "big takeaways" section of 4 numbered chapters (01-04) with long body text: the case doubles as a thought piece.

## Tokens observed
- Fonts: Helvetica Now Display 500 (heads, -0.02em) + Adobe Garamond Pro (sentences, quotes). Free subs: "Inter Tight" 500 + "EB Garamond" 400. Hebrew: Heebo 500 + Frank Ruhl Libre 400.
- Palette: #FFFFFF, #EDEDED / #DDDDDD panels, #000000 ink, red #FF3029 / #DB2223 (logo, links). Case fields per client.
- Sizes 16 / 20-24 / 30 / 36 / 56 / 112px. Radii 0 (one 50px pill). No shadows.

## Motion inventory
- Essentially none: static pages, image loads. Proof that a top agency can win on content discipline.

## Layout notes
- Case: field hero (~520px) → `split[ "What we did" label | bullet list ]` → `split[ "Outcomes" | 3 numbers ]` → `split[ "Overview" | 300-word serif body ]` → centred serif quote → Recognition list → takeaways index → numbered chapters 01-04 (label column 25%, body 50ch). 730-1,240 words, 14,000-21,000px, media only ≈25% (the text-heavy end of A).

## Page set observed
- /clients/<client>/ case pages; home lists Select Clients as text.

## Mobile notes
- H1 32/38px; numbers stack 1-col; field hero keeps the overlap.

## Steal / Don't steal
- Steal: client-colour field hero; outcomes block placed early; recognition list; label column 25% + body.
- Don't steal: 1,200-word cases for visual studios (works for product/strategy agencies only).

## ACF mapping hints
- Case: `client_color` (token), `what_we_did` (repeater), `outcomes` (repeater: value, label, source), `overview` (WYSIWYG), `quote`, `recognition` (repeater: outlet, quote, link), `chapters` (repeater: number, title, text, media).
