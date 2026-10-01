---
case: case-05-company
descriptor: US digital and branding studio's own site
region: US
site_type: company (digital studio)
industry: web / branding studio
platform: Next.js, WebGL (3 canvases)
libs_detected: [next]   # custom cursor, 4 sticky
direction_match: [void-stage, apparatus-night, telemetry-terminal]
captured: 2026-09-30
source: "agency own site scan 2026-10"
scan_quality: good (full + frames + mobile); home only
---
> A pitch-black showroom drawn in white wireframe: the studio's own building as a live 3D line model, a logo wall of 36 cells, and the name stamped 200px across the bottom.

## DNA summary
- Macrostructure (6,714px): hero = real-time white wireframe 3D interior (stairs, balconies) filling the viewport, studio logo painted on a wall, a two-state mode toggle bottom-centre (orange active) -> 87px statement sentence about the studio (Geist 600, -0.04em) -> client logo section: 6×6 wall of client logos in dark grey cells, 2px gaps -> featured projects: rows = large thumbnail start + title end + 13px description + tags -> capabilities 4 columns of text lists -> contact line + email -> giant short-form wordmark with year -> footer: link list end, newsletter start.
- Hero archetype: H-24 (scene) - as in direction `void-stage`.
- Nav: 36px fixed transparent bar, tiny links with counts in superscript (e.g. showcase ^26, blog ^29), orange active dot.

## Signature moves
- **Wireframe 3D of the studio itself** (white lines on #000), interactive camera; the logo is a texture inside the scene.
- **Logo wall as dense cells** (#2e2e2e on #000, 2-4px gaps) instead of a marquee.
- **Counts as superscripts** in the nav.
- Greys as hierarchy (#e6e6e6 / #c4c4c4 / #757575) + one orange #ff4d00 for state.

## Tokens observed
- Fonts: Geist 600 (display 76-87px, -0.04em, lh 0.9), Geist 12-20px, Geist Mono 13px caps labels. Free (Google Fonts). Hebrew: "Heebo" 700 display, 400 body.
- Palette: #000 canvas, #1a1a1a/#2e2e2e cells, #e6e6e6 ink, #757575 muted, #ff4d00 state. Radius: pills only. No shadows.

## Steal / Don't steal
- Steal: model the client's real place/object as a line drawing in 3D; logo wall as cells; superscript counts.
- Don't steal: #000 canvas (tint it), WebGL hero without a static poster frame.

## ACF mapping hints
- `scene_hero` (glb url, poster image, toggle labels), `logo_wall` (gallery, columns).
