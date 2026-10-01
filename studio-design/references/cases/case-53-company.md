---
case: case-53-company
descriptor: "Israeli boutique web design & development studio, Hebrew-first (own site)"
region: Israel
site_type: company (web studio, Hebrew-first)
industry: boutique web design & development studio
platform: Webflow
libs_detected: [gsap, lenis, webflow]   # 63 videos, canvas 1, backdrop blur 13px, accessibility overlay widget
direction_match: [inflatable-pop, riso-two-ink, kikar-heavy]
captured: 2026-09-30
source: "Israeli scan 2026-10 (home + 2 case pages)"
---
> A lavender poster studio where Hebrew letters are cut like stencils and every section is a black rounded tile on a pastel wall.

## DNA summary
- Macrostructure: centred hero on a lavender→pink gradient → black bento of award tiles + work video tiles → reasons-to-choose-us → us-vs-others comparison table → AI section → packages → portfolio with tilted case thumbnails on a lavender field with a giant ghosted logo shape → FAQ → contact.
- Hero: H-01 centred. H1 in **Migdal** (blocky display) 64px w400 lh 1.0, two lines; 18px Assistant lede; two pills (filled black contact + outlined view-projects).
- Section titles: **Anomalia** 80px w600 lh 1.0 (experimental cut-stroke Hebrew display).
- Nav: logo + 2 links + contact; floating.

## Signature moves
- Two experimental Hebrew display faces (Migdal for H1, Anomalia for H2) over a quiet text face (Assistant 18-19px w500): the display carries the brand, body stays neutral.
- Comparison table as sales proof: three columns (feature · others in black · the studio in lavender) with check/cross words.
- Awards shown as a black tile with the award list (4 site-of-the-day / kudos / honorable-mention style entries) next to a photo of the logo sign: proof as an object.
- Case pages open with a big Anomalia title right-aligned and tag pills.

## Tokens observed
- Fonts: Migdal (commercial Hebrew display) · Anomalia (AAA, commercial) · Assistant (free, text) · outliers Changa One / SF Pro / Thunder for Latin bits. Free subs: Secular One (H1 weight), Suez One or SVG-lettered words for Anomalia; keep Assistant.
- Scale: 80/1.0 w600 (H2) · 64/1.0 (H1) · 19.2/1.6 and 18/1.6 body w500 · 12px button labels w600.
- Palette: lavender #b8b6ff-ish → pink gradient hero, ink #1d1d1d, white #f7f7f8, greys #888/#f5f5f5, navy text #170f49.
- Radii: pill 500px (buttons), 24px tiles, 10px / 8px / 4px small. Shadows: 0 2px 20px rgba(0,0,0,.09) on cards (soft, close to the template card shadow; don't copy). Backdrop blur 13px on chips.
- Gaps 16-24px between bento tiles.

## Motion inventory
- GSAP + Lenis; 63 video elements (work loops in tiles); drag portfolio; hover tilt on case thumbs.

## Imagery
- Work screenshots/video loops in black tiles; one photographic sign shot; abstract logo geometry as a ghost layer.

## Page set observed
- Case pages: right-aligned display title, tag pills (UX/UI, Webflow, content), long description, full-bleed case visuals.

## Mobile notes
- H1 45.8px/1.0; page 17,230px (longer than desktop).

## Steal / Don't steal
- Steal: experimental Hebrew display used only for titles; comparison table; awards-as-object tile; pastel field + black tiles contrast.
- Don't steal: the cookie banner covering a third of the viewport, the soft card shadow, accessibility overlay widget, 5+ outlier families for Latin bits.

## ACF mapping hints
- `bento_awards` (tiles repeater: type video|list|image, content). `compare_table` (rows repeater: label, others, us). `packages` (repeater). `portfolio_rail` (relationship).
