---
case: case-36-company
descriptor: Scandinavian design engineer's one-screen WebGL portfolio
region: Europe (Sweden)
site_type: company (personal portfolio, one screen)
industry: design engineering
platform: custom WebGL (1 canvas)
libs_detected: []
direction_match: [void-stage, apparatus-night]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: single-screen WebGL captured (first frame)
---
> A dark exhibition hall where projects hang on a curved wall: drag and the ring of panels turns around you.

## DNA summary
- One screen: black void with a faint perspective floor grid; project panels (video/image, 19px radius) arranged on a curved cylinder segment, the front panel largest (with a script project title), neighbours foreshortened; labels float at panel corners (project names); corners: name top-start (9.6px caps), PROFILE top-end, FEATURED / FULL toggle bottom-start, NEWSLETTER bottom-end.
- Hero archetype: H-08 dome/cylinder gallery.
- Nav: four corner labels only (N10).

## Signature moves
- **Cylinder gallery** with inertia drag; FEATURED/FULL switches from the curated ring to the full archive grid.
- **HUD corners**: 9.6px caps labels pinned in the 4 corners, nothing else on the screen.
- Pure WebGL; accessible text exists in DOM (h1 27px hidden/visually small).

## Tokens observed
- Font: one sans (700 names, 400 body, 9.6px caps labels). Free sub: "Inter" / "Geist". Hebrew: "Heebo".
- Palette: #000 void, white text; colour only from project media. Radius 19.2px panels.

## Steal / Don't steal
- Steal: curated ring <-> full index toggle; corner-only HUD chrome for a portfolio or product range.
- Don't steal: 9.6px labels; WebGL-only list (always ship the index as HTML).

## ACF mapping hints
- `cylinder_gallery` (items relationship, radius, arc degrees, toggle labels) -> fallback grid template.
