---
case: case-30-landing
descriptor: AI video and image generation suite (app front door / explore feed)
region: global (US)
site_type: landing (app front door / media platform)
industry: AI video & image generation suite
platform: custom React SPA (Tailwind)
libs_detected: []   # no GSAP/Lenis; CSS + React transitions; custom cursor flag
direction_match: [media-bento-night, telemetry-terminal]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: many lazy media grids rendered as empty skeleton tiles in scroll frames; cookie notice overlays bottom-end
---
> A late-night video wall in a streaming office: graphite tiles playing clips, sticker promos slapped at angles, one lime switch that means "create".

## DNA summary
- Macrostructure: the home page IS the app's explore feed: promo tiles row -> signup/discount bento -> feature rails (visual effects, several named video/image models, community, marketing studio...) each = caps label + subline + dense media grid + "View all X ↗" chip -> lime mega footer. 15 top-level blocks, zero long copy.
- Hero archetype: no classic hero - H-19 bento promo row (3 tiles 1:0.5 ratio: a cashback sticker-type tile on lime/white, a skills-bundle collage, photo tile) + second row (big sign-up-discount image card + 6 small model tiles with TOP / NEW badges).
- Nav: N2 dense product bar: 20+ text links in one line (explore / image / video / audio / API / plugins / effects / studios / contests / 3D …) with tiny lime/pink badges; end: Pricing pill with a pink percent-off badge, Enterprise, Login, lime "Sign up". 44-52px sticky.
- Footer: full lime #d1fe17 block: a 3-word category claim in 28-40px caps start + 6 link columns (create / models / studios / platform / company / resources / community) in dark ink; address row (FT-04 on accent field).
- Section list (home DOM): promo row -> discount bento -> VFX grid -> film festival (laurels + poster wall) -> new-model feature -> lime-glow compute card -> model grid -> one-canvas platform statement -> community grids x3 -> footer.

## Signature moves
- Promo tiles typeset like stickers/posters (bracketed words `{ … }`, 3D coins, rotated black labels) - marketing voice lives inside tiles, not in headlines.
- Lime used as *action*: sign-up, generate, accept, "View all" chip text, then a whole lime footer = the only light surface on the site.
- Rails where every tile's caption is its effect name in caps bottom-start over a gradient scrim - the grid is the catalogue.

## Tokens observed
- Fonts: Space Grotesk 700 uppercase (all headings), Inter 400-600 (UI 12-18px). Faces also loaded: Doto, IBM Plex, Instrument (feature pages). Free: all Google. Hebrew: "Rubik" 700 for Space Grotesk caps (no case -> use weight 800 + size +10%), "Heebo" UI.
- Scale: H2 56/64 -0.04em caps; 48/50 -0.02em; 44/44; 40/48 lime; feature H1 64/72; 36/40 -0.04em; labels 16px caps 700; body 12-16px.
- Palette: canvas #1c1e20 / #131517, tiles #23262a / #383e46, hairline white 7-15%, ink #f7f7f8, muted #898a8b, white 30% for idle links, accent lime #d1fe17 (+24% alpha glow), pink badge (sale), gold gradient for premium (`#826835 -> #ecdba6`).
- Radii: 12px (183 uses, tiles), 8px, 16px, 24px, 6px chips, pill 9999px; inset white 5% shadows on pricing cards. Backdrop blur 8px on overlays.
- Container 1536/1280, gaps 4-12px (dense).

## Motion inventory
- Autoplay-on-hover video tiles (6 videos on home, many posters), skeleton shimmer while loading, carousel dots on mobile hero card. No smooth scroll, no pinning. Custom cursor on media.

## Layout notes
- Density 9/10: 4-5-column masonry-ish media grids with 4-8px gaps; rails end with a centered "View all ... ↗" chip overlapping a bottom fade.
- Feature page (AI video): rounded 24px video hero inset in the page, centred 64px caps H1, white pill CTA, and a floating prompt bar (input + model chip + duration + GENERATE lime square) sitting on the video - product UI as hero CTA.

## Imagery
- 100% generated media: film stills, posters, fashion/UGC clips; very saturated, many styles side by side (the variety is the proof).

## Page set observed
- AI video page: video hero with prompt bar -> all-models-in-one statement -> 2-col grid -> cinema studio feature -> script-to-video section -> model logos -> audience (filmmakers & directors) -> blog -> FAQ.
- Pricing: 3 plan columns (skeleton in capture), translucent graphite cards, 4px radius rows.
- Marketing studio: app shell with left icon rail; fanned card stack of product shots over centred caps title; template filter chips.

## Mobile notes
- Search field on top, hero card carousel, a "what would you create?" row of 4 square shortcut icons, 2-col staggered VFX grid, tag cloud of pills, lime footer.

## Steal / Don't steal
- Steal (for media-heavy products only): hero replaced by promo bento; rail = label + grid + "View all" chip; product prompt bar as hero CTA; accent-coloured footer as the only light surface.
- Don't steal: 20-link nav, 3 badge colours, skeleton-heavy lazy grids that show nothing to crawlers/screenshots; this is a guarded attractor (dark + one neon) - only for AI/creator tools.

## ACF mapping hints
- `promo_bento` (tiles repeater: image/video, title, badge, link, span).
- `media_rail` (label, subline, source: CPT/gallery, columns, view-all link).
- `prompt_hero` (video, h1, placeholder, chips repeater, cta).
- Options footer: accent surface toggle, column menus.
