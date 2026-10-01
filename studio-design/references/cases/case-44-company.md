---
case: case-44-company
descriptor: UK 3D and interactive web studio's own site (WebGL benchmark)
region: Europe (UK)
site_type: company (info) - 3D & interactive web studio
industry: creative technology studio
platform: Astro + three.js (WebGL, virtual scroll)
libs_detected: []   # three.js bundled; 3 canvases; no Lenis/GSAP globals
direction_match: [apparatus-night, dev-playground, cosmic-retrofuture]
captured: 2026-09-30
source: "agency own site scan 2026-10"
scan_quality: LOW - every screenshot (desktop, mobile, inner) shows only the preloader; structure below comes from text/size extraction, not from visuals
---
> A black-box theatre: a counter ticks to 100 in the corner, then the stage turns into a white lab where 3D objects are the headlines.

## DNA summary
- Observed visually: preloader only - black canvas, centred small progress bar (white fill in a #333 track, ~100x20px), and a 3-digit percentage counter bottom-start ("013", "024", "098") with per-digit roll animation (digits mid-flip in captures). C-63 preloader.
- From data (not seen): page is a virtual-scroll container (home content div 50,844px tall inside a fixed 900px viewport - scroll is hijacked and rendered by WebGL + DOM transforms).
- Home text content (sizes from data): 2-word hero statement 144px/1.0 -0.02em black (on white after load), "featured work" 115px/0.9, "PLAY REEL" 108px caps white (over WebGL), process "STEP" 86px caps, 43.2px repeated labels (592 nodes - likely a split-character marquee/scroller), newsletter line 38px + 48.6px "Subscribe".
- Nav (text): BACK / LET'S TALK / MENU / CLOSE + overlay menu HOME / ABOUT US / PROJECTS / CONTACT (each duplicated = roll-text hover C-57); header zone 146px fixed.
- Projects page: "PROJECTS" 244.8px, project count in IBM Plex Mono 57.6px.
- About: 172.8px white caps fragment, 57.6px caps, mono labels (IBM Plex Mono + a custom house mono).
- Case page: 72px title, minimal DOM (canvas-driven).

## Signature moves (from data + known pattern, verify before copying)
- Real-time 3D scenes are the content; text is a thin layer of huge Aeonik lines over them.
- Numeric preloader with rolling digits + minimal bar - the only chrome.
- Pale lavender-grey panels #f0f1fa / #e4e6ef for light sections, black for reels, one lime #c1ff00 accent.

## Tokens observed
- Fonts: Aeonik 400 only (one weight across 11-245px), IBM Plex Mono (counts), a custom house mono. Free subs: "Inter Tight" 400 / "Geist" 400 / "Manrope" 400; mono "IBM Plex Mono" (free). Hebrew: "Heebo" 400 / "Assistant" 400; mono "IBM Plex Mono" + "IBM Plex Sans Hebrew".
- Scale: 244.8 / 172.8 / 144 / 115.2 / 108 / 86.4 / 57.6 / 43.2 / 26 / 18 / 14.4 px (ratio ~1.2-1.25 from 14.4 multiplied: 14.4 x 3 = 43.2, x 10 = 144 - scale built on 14.4px units).
- Palette: #000000, #ffffff, #f0f1fa, #e4e6ef, #2b2e3a, #121416, #34393f, lime #c1ff00.
- Radii: 15px cards, 87.5px / 100px pills, 324px (large pill), 100% circles. Shadows: `0 6px 10px rgba(0,0,0,.04)` stacked.

## Motion inventory
- three.js scenes (3 canvases), virtual scroll (pinned container), digit-roll preloader, roll-text nav, exclusion blend on cursor/labels. Not observed visually.

## Layout notes
- Not observed. Container 486px appears (newsletter/footer form).

## Imagery
- Not observed (3D renders expected).

## Page set observed
- Home, projects, one case page, about - all captured as preloader only.

## Mobile notes
- Mobile also stuck on preloader (844px tall); H1 23.4px/25.7px per data.

## Steal / Don't steal
- Steal: digit-roll percentage preloader (only if real assets are loading, <=2.5s budget, skip on repeat visit); one-weight typography on a 14.4px-unit scale; roll-text hover on nav.
- Don't steal: content that exists only inside WebGL (headless/SEO/screenshot tools see nothing - this scan proves it); virtual scroll hijack (breaks find-in-page, a11y). Always render DOM content first and enhance.

## ACF mapping hints
- `preloader` (global option: on/off, min duration, skip after first visit).
- `reel_band` (video, label). `statement_xl` (text, size token).
- For 3D, map to a `scene` layout with a poster image fallback field (required).
