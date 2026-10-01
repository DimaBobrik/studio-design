# Backgrounds catalog (48)

Load when choosing the ambient layer of a hero, band, CTA card or whole page. Every item maps to a runtime module (`bg-kit`, `shader-bg`, `map`, `globe`, `scrub-video`, `sphere`; params in `runtime/README.md` §4) or a short recipe marked "Recipe" (no module: write it in project CSS/JS). Ids are stable (`A-xx`); cite them in the plan card.

**Quick index**
- Tier 0: CSS / SVG static (use freely, 0 JS): A-01…A-sp (20): A-01, A-02, A-03, A-04, A-05, A-06, A-07, A-08, A-09, A-10, A-11, A-12, A-13, A-14, A-48, A-sc, A-ht, A-tp, A-al, A-sp
- Tier 1: Canvas2D / SVG animated / DOM-heavy (IO pause, freeze on reduced motion): A-15…A-sph (14): A-15, A-16, A-17, A-18, A-19, A-20, A-21, A-22, A-23, A-24, A-25, A-26, A-46, A-sph
- Tier 2: WebGL fragment shaders (one per page; `shader-bg` or a custom quad): A-27…A-47 (20): A-27, A-28, A-29, A-30, A-31, A-32, A-33, A-34, A-35, A-36, A-37, A-38, A-39, A-40, A-41, A-42, A-43, A-44, A-45, A-47

## 0. Rules before picking

**Cost tiers.** `0` = CSS/SVG, no JS, free to use anywhere. `1` = Canvas2D/SVG animated or DOM-heavy; needs IO pause and reduced-motion freeze. `2` = WebGL fragment shader; one per page by default, two only in immersive directions (motion budget >= 8).

**Hard limits**
1. At most **one animated background per viewport**. A static layer (grain, grid) may stack on top of an animated one, but two moving layers never share a screen.
2. At most **one tier-2 background per page** unless the direction's motion budget is >= 8. Never tier 2 behind body copy longer than 40 words.
3. **Contrast over the brightest frame.** For animated backgrounds, sample the lightest possible frame (for dark text) or the darkest (for light text) and keep 4.5:1 body / 3:1 display. If it fails, add a scrim: `linear-gradient(to bottom, oklch(0% 0 0 / .45), transparent 60%)` or a solid text plate, never text-shadow soup.
4. Loops longer than 5 s need a visible pause control (WCAG 2.2.2): `shader-bg` has `data-pause-button="true"`, `marquee`/`testimonials` ship their own; for recipes add `<button class="bg-pause" aria-pressed="false">` in the section corner, inline-end side (recipe, no module).
5. Reduced motion: tier 1 freezes on a representative frame; tier 2 renders a single frame (`speed=0`); video swaps to its `poster`.
6. Decorative canvas/SVG: `aria-hidden="true"`, `pointer-events:none` unless interactive, `z-index:-1` inside a `position:relative; isolation:isolate` section.
7. Performance: DPR cap 1.5, `maxPixelCount 1920*1080*2` on mobile, IO pause offscreen and on `visibilitychange`. Shader falls back to a CSS gradient in the same palette if WebGL context creation fails.
8. Colours come from tokens only: `--c-canvas`, `--c-surface`, `--c-accent`, `--c-ink`. `shader-bg` resolves token names written with their `--` prefix (`data-colors="--c-accent|--c-surface-2|--c-ink-2/40"`, `/40` = 40% alpha), never hard-coded hex in markup.
9. Banned as reflex: purple-to-blue meshes, blurred orbs "for depth", starfields on SaaS, aurora behind a centred H1 (antipatterns.md #1, #50, attractor A7). Allowed only when the subject justifies it (night tourism, astronomy, music) and stated in the plan.
10. Add `.bg-grain` to almost every gradient (kills banding). Exception: dither/halftone/pixel directions, where grain muddies the pattern.

**Pairing rules (direction feel -> background family)**
| Direction feel | Good | Avoid |
|---|---|---|
| Swiss grid / industrial catalogue / utilitarian doc | A-02 grid, A-03 dots, A-15 flicker grid (data), plain canvas | meshes, blobs, auroras |
| Darkroom product / cold luxury / cinematic | A-25 image slider, A-26 video, A-32 god rays, A-35 fluted glass, A-30 silk/chrome (one object) | grids, patterns, stickers |
| Soft structuralism / Bauhaus notebook / serif analytics | A-01 glow, A-07 CSS mesh, A-27 mesh (low distortion), A-06 grain | dither, CRT, hatch |
| Riso / maximal editorial / neo-brutal / kinetic poster | A-04 hatch, A-05 tile, A-28 grain-gradient, A-33 dither, A-34 halftone, A-12 retro grid | glow, glass, silk |
| Tactical telemetry / apparatus night | A-02 grid, A-15 flicker, A-23 glyph field, A-20 beams, A-42 neuro noise, scanlines | pastel mesh, blobs |
| Botanical / forest heritage / organic | A-14 paper, A-40 topo, A-10 waves, A-11 blob, A-24 map | neon, CRT, chrome |
| Sticker pop / sketchbook / arcade | A-05 tile, A-37 metaballs, A-11 blob, A-12 retro grid, A-03 dots | god rays, fluted glass |
| E-commerce PLP/PDP/cart/checkout (any direction) | tier 0 only (canvas colour, grain, subtle dots) | anything animated behind products or forms |

Site-type defaults: **ecommerce** home hero may use tier 2 once; every transactional page (PLP, PDP, cart, checkout, account) is tier 0. **Landing** gets one tier-2 moment (hero or final CTA-02 card, not both). **Company** prefers tier 0/1 plus photography; tier 2 only for tech/AI/immersive briefs.

Column key: `id | name | looks like | fits | how | tier | a11y/perf`.

---

## Tier 0: CSS / SVG static (use freely, 0 JS)

| id | name | looks like | fits | how | tier | a11y/perf |
|---|---|---|---|---|---|---|
| A-01 | Radial edge glow | Soft ellipse of accent bleeding from one edge | Soft structuralism, SaaS, notebook; light or dark | `bg-kit` `.bg-glow` (+ `.bg-glow--bottom`, `.bg-glow--corner`; colours `--glow-1` / `--glow-2`) | 0 | Check contrast at glow centre |
| A-02 | Masked fading grid | 1px square grid fading to edges | Swiss, telemetry, B2B, logistics | `bg-kit` `.bg-grid` (`--bg-size` 48px, `--bg-line`, `--bg-mask`; mask helpers `.bg-mask-top|bottom|start|end|edges|none`) | 0 | `currentColor` 6-10% alpha |
| A-03 | Dot matrix + vignette | Regular dot lattice fading radially | Minimal product, AI, portfolio, PLP header | `bg-kit` `.bg-dots` (`--bg-size` 22px, `--bg-line`) | 0 | none |
| A-04 | Hatch stripes | 45/315deg fine hatch, often in a bordered band | Brutal, riso, construction; behind S-02 marquee | Recipe: `background:repeating-linear-gradient(315deg,currentColor 0 1px,transparent 0 50%) 0 0/10px 10px; opacity:.1` | 0 | none; flip angle is not needed in RTL |
| A-05 | Pattern tile | Repeating geometric SVG motif | Playful, kids, food, craft | Inline SVG data-URI as `background-image`, fill via `%23` token-derived hex at build time; Hero Patterns = CC BY 4.0 (credit in footer/colophon) | 0 | tiny |
| A-06 | Grain overlay | Film grain over gradients/photos | Everything premium; mandatory on gradients | `bg-kit` `.bg-grain` (`::after` feTurbulence data-URI, `--grain-opacity` .5 light / .35 dark). Animated grain = recipe, no module: `steps(8)` background-position, desktop only | 0 | Static free; animated grain repaints, skip on mobile |
| A-07 | CSS mesh gradient | 4-6 soft colour pools | Fintech, wellness, beauty, soft directions | Recipe: 4 stacked `radial-gradient(at X% Y%, var(--m1) 0, transparent 50%)`; animate max 2 `@property --x1 {syntax:'<percentage>'}` vars over 20-30 s | 0 (animated: 1) | Full-screen repaint when animated; prefer A-27 if it must move |
| A-08 | Blurred blob field | 3-4 large blurred colour blobs | Music, creative agency; fallback for shader aurora | Recipe: blobs inside one SVG with a single `feGaussianBlur stdDeviation=80`, GSAP `x/y/scale` yoyo 12-18 s `sine.inOut`; `contain:paint` | 0 static / 1 moving | GPU heavy on low-end if CSS `filter:blur` on moving divs. Antipattern #50 unless subject-driven |
| A-09 | Conic sweep | Rotating conic beam behind a card/CTA | Launch CTA, featured plan | `bg-kit` `.bg-conic-sheen` (`--sheen-color`, `--sheen-speed` 16s) | 0 | Small elements only on mobile; pause >5 s loop if large |
| A-10 | Layered SVG waves | 3-5 wave bands as divider/hero base | Friendly SaaS, travel, NGO, kids | Pre-generated SVG path (Haikei/sssurf); optional ScrollTrigger `yPercent` per layer (-4..-12) | 0 | Flip with `scaleX(-1)` in RTL only if asymmetric composition matters |
| A-11 | Morphing blob | Organic shape slowly morphing | Health, beauty, DTC, sticker pop | Recipe: CSS 8-value `border-radius` keyframes 14 s, or MorphSVG between 3 paths | 0/1 | Stop under reduced motion |
| A-12 | Retro perspective grid | Synthwave floor receding to horizon | Gaming, music, Y2K, arcade | Recipe: A-02 grid on a div `transform:perspective(200px) rotateX(65deg)`; keyframe `background-position-y` 0 -> 40px 1.2 s linear infinite; mask fade to horizon | 0 | Freeze under reduced motion |
| A-13 | Generated static art | Low-poly, isometric, scribble, watercolor, holo | One-off hero art, 404 | Export SVG from Haikei/fffuel, inline, `fill:var(--c-accent)` | 0 | none |
| A-14 | Paper / fabric texture | Subtle paper fibre, folds | Botanical, editorial, wine, stationery | Static JPG/AVIF (<60 KB) with `mix-blend-mode:multiply`; live PS paper-texture is overkill | 0 | none |
| A-48 | Painterly landscape plate (2026-10, world-agency scan) | A calm painted/illustrated landscape (meadow, hills, sky, trees) as the ground behind real product UI screenshots, one plate per chapter (seen on two enterprise-SaaS builds by top digital studios, one in line-drawn form) | Enterprise SaaS, security, finance, infra: replaces the dark-aurora AI attractor (A7) with something human | Commissioned or generated still (AVIF <180 KB), `object-fit: cover` behind a UI shot with a soft `--shadow-2`; one plate per 2-3 sections, never tiled; the UI shot carries alt, the plate is `alt=""` | 0 | Contrast on the text side: put copy on a `--c-canvas` panel or the sky area, never over foliage detail |
| A-sc | Scanlines | CRT horizontal lines | Telemetry, arcade, retro tech | `bg-kit` `.bg-scanlines` | 0 | Never animate flicker (seizure risk) |
| A-ht | CSS halftone | Dot screen gradient, print feel | Riso, poster, streetwear | `bg-kit` `.bg-halftone` (+ `.is-dark` on dark grounds) | 0 | none |
| A-tp | Static topo lines | Contour lines | Outdoor, geo, consultancies | `bg-kit` `.bg-topo` (SVG data-URI) | 0 | none |
| A-al | Aurora lite | Slow two-colour curtain at top edge | Night tourism, calm premium when WebGL too costly | `bg-kit` `.bg-aurora-lite` (`--aurora-1..3`, `--aurora-speed` 26s) | 0/1 | Pause control if >5 s visible loop |
| A-sp | Pointer spotlight | Radial light follows cursor inside a section | Dark heroes, bento tiles, pricing | `bg-kit` `.bg-spotlight` (+ `.bg-spotlight--rim`) with `data-fx="bg-kit"` on the surface or on the card grid (`data-smooth` .18, `data-reach` 120; `--spot-size`, `--spot-color`) | 0 (+tiny JS) | `(pointer:fine)` only; static centred on touch |

## Tier 1: Canvas2D / SVG animated / DOM-heavy (IO pause, freeze on reduced motion)

| id | name | looks like | fits | how | tier | a11y/perf |
|---|---|---|---|---|---|---|
| A-15 | Flickering cell grid | Cells fading in/out like a data wall | AI, security, data, telemetry | Recipe: canvas grid `cell=6px gap=4px`; per tick pick `n=cells*0.02` random cells, tween alpha 0.1->0.6; 15 fps via `gsap.ticker.fps` local throttle | 1 | DPR<=1.5, IO pause |
| A-16 | Interactive dot grid | Dots repel from cursor, spring back; click shockwave | Dev tools, portfolio, playful premium | Recipe: canvas dots (<=3k), pointer distance push `f=(r-d)/r*18px`, return `elastic.out(1,.3)` via per-dot quickTo proxy | 1 | `(pointer:fine)`; static dots on touch |
| A-17 | Hover-lit iso boxes | Skewed grid; box under cursor lights | Web3/tech hero (desktop) | Recipe: CSS grid rotated `skewX(-48deg) skewY(14deg) scale(.675)`, delegated `pointerover` sets `--lit` with 1.2 s transition out | 1 | 1-2k nodes; desktop only; hide <1024px |
| A-18 | Particles / starfield | Drifting points, occasional shooting star | Astronomy, night luxury, celebration | Recipe: pool of <=150 mobile / 400 desktop particles `{x,y,vx,vy,a}`, rAF, shooting star every 2-6 s | 1 | Attractor A7 / antipattern #50 on SaaS; IO pause |
| A-19 | Meteors | Diagonal streaks falling across a card | Dark pricing highlight, launch card | Recipe: 12 `<span>`s `rotate(215deg)`, tail `linear-gradient(90deg,var(--c-accent),transparent)` width 50px, keyframe translate 600px, random delay set once in JS | 1 (CSS) | cheap |
| A-20 | Beams | Luminous curves with light pulses | AI/infra hero, integration hub | Recipe: static SVG paths + animated `linearGradient` (GSAP tween `x1/x2` attr, 3-6 s, stagger) | 1 | cheap |
| A-21 | Flow field | Thousands of strokes following noise | Generative studio, climate, art | Recipe: canvas, `angle=noise(x*.002,y*.002,t)*TAU`, <=2k particles, trail via translucent fill | 1 | mid cost; freeze to one drawn frame |
| A-22 | Line waves / threads | 10-40 undulating parallel lines | Music, audio, voice AI, fintech | Recipe: canvas polylines `y=base+sin(x*f+t+i*phase)*amp`, mouse bends amp within 200px | 1 | cheap |
| A-23 | Glyph field | Grid of glyphs swapping (matrix feel) | Cyber, dev tools; Hebrew glyph sets work | Recipe: canvas `fillText` grid 14px, swap 3% glyphs/frame at 20 fps | 1 | `aria-hidden`; not behind body copy |
| A-24 | Dotted world map + arcs | Dotted map, arcs drawing, pulsing endpoints | Logistics, remote teams, tourism, "we ship" | `map` module (`<figure class="sd-map" data-fx="map">` + route list `li[data-from="lat,lng"][data-to][data-label-from][data-label-to]`; `data-pulse`, `data-labels`, `data-arc-height`) | 1 | Reduced: arcs drawn, no pulses |
| A-25 | Image slider bg (crossfade/Ken Burns) | Full-bleed photos zooming and crossfading | Hotels, real estate, restaurants, events | Recipe: stacked `<img>`, GSAP tl `scale 1->1.12` 7 s + `autoAlpha` crossfade 1.2 s, `repeat:-1`; first img `fetchpriority="high"`, others `loading=lazy` + preload next only | 1 | Pause button required; reduced = first image static |
| A-26 | Video background | Muted ambient loop | Hospitality, fashion, automotive, events | Recipe: `<video autoplay muted loop playsinline preload="metadata" poster>`, WebM+MP4 1-3 MB, 720p mobile source via `media`; swap to poster on reduced motion or `navigator.connection.saveData` | 1 | Pause button; no audio; captions n/a (decorative) |
| A-46 | WebGL globe (cobe) | Dotted 3D globe with markers | Global SaaS, logistics, travel | `globe` module (`<div class="sd-globe" data-fx="globe" data-dark="1" data-center="31.5,34.9">` + the same route list as `map`) | 1-2 | Light (~5 KB); no WebGL = route list stays visible (`.is-fallback`) |
| A-lt | Code-built subject object | A turned product (vase, bottle, glass, candle) rendered live on the section, turning with drag or scroll | Ceramics, glassware, cosmetics, drinks, candles; darkroom/cold-chrome/herbarium directions | `lathe` module (5 materials, `--img-*` colours, contact shadow) + still fallback from `scripts/render-stills.mjs` | 1-2 | Renders on demand; one per viewport; honest label if it stands in for a photo |
| A-dv | Box product in code / elevation drawing | A box-shaped product (power station, speaker, router, appliance) as a CSS 3D object, or a technical front+side elevation with dimension lines and callouts | Hardware, appliances, electronics, packaging; industrial-catalogue, machined-soft, swiss-signal-grid, telemetry-terminal, apparatus-night | `device` module (`data-view="three-quarter|iso|elevation"`); hand-drawn variant: recipe below | 0-1 | CSS only; stage aria-hidden, facts in text; honest label ("drawing, not a photo") |
| A-sph | Image sphere as backdrop | Rotating image sphere behind a statement | Communities, "our clients", agency | `sphere` module (see sections H-07; `data-auto-rotate`, `data-speed` 18 deg/s, `data-modal`) | 1 | <=60 imgs; keyboard rotate |

## Tier 2: WebGL fragment shaders (one per page; `shader-bg` or a custom quad)

`shader-bg` presets available now: `mesh-gradient`, `grain-gradient`, `god-rays`, `dithering`, `fluted-glass` (Paper Shaders, Apache-2.0, keep attribution comment). Markup: `<section data-fx="shader-bg" data-preset="mesh-gradient" data-colors="--c-accent|--c-surface|--c-canvas|--c-ink-2" data-speed="0.3">`; `--token` and `--token/40` (alpha %) are resolved to computed colours. Params are kebab-case `data-*` (full list: `runtime/README.md` §4 shader-bg); other options: `data-mobile="live|static|fallback"`, `data-pause-button`, `data-frame` (reduced-motion still). Items without a preset: write a custom fragment on the same mount pattern (full-screen triangle, `u_time u_resolution u_mouse u_colors[]`) or skip.

| id | name | looks like | fits | how | tier | a11y/perf |
|---|---|---|---|---|---|---|
| A-27 | Animated mesh gradient | Silky 2-10 colour field swirling | Universal premium hero; fintech, beauty, wellness, SaaS | `shader-bg` preset `mesh-gradient`: `data-colors` 3-5, `data-distortion` .6-.9, `data-swirl` .1-.4, `data-speed` .2-.4, `data-grain` .12-.15 | 2 | Light; grain hides banding. Banned palette: purple->blue |
| A-28 | Grain gradient shapes | Grainy gradient formed into wave/dots/truchet/corners/ripple/blob/sphere | Editorial, Gen-Z, music, posters, riso | `shader-bg` preset `grain-gradient`: `data-shape` (wave, dots, truchet, corners, ripple, blob, sphere), `data-softness` .5, `data-intensity` .5, `data-noise` .3 | 2 | Light |
| A-29 | Aurora curtains | Vertical light curtains waving | Night/nature tourism, calm AI | Recipe, no module: custom fragment (layered simplex in x, stretched y); cheap alt: `.bg-aurora-lite` | 2 | Light |
| A-30 | Silk / iridescent / liquid chrome | Satin folds, oil-slick, chrome ripple | Jewelry, fashion, cosmetics, luxury tech | Recipe, no module: custom fragment; or pre-render as 6 s loop video (A-26) for cheaper delivery | 2 | Light-mid |
| A-31 | Liquid metal logo | Logo/shape filled with mercury | Brand reveal, watches, jewelry | Recipe, no module: Paper `liquid-metal` via its own ShaderMount (not a `shader-bg` preset); canvas sized to logo box only | 2 | Mid |
| A-32 | God rays | Volumetric shafts from a point, dust | Cinematic hero, spiritual/wellness, luxury | `shader-bg` preset `god-rays`: `data-color-back`, `data-colors`, `data-color-bloom`, `data-bloom` .4, `data-intensity` .6, `data-density` .3, `data-offset-y` -0.4 (origin top; `data-offset-x` mirrors in RTL) | 2 | Light |
| A-33 | Ordered dithering | 1-bit/2-tone Bayer dither of a moving shape | Brutalist, indie tech, editorial fashion | `shader-bg` preset `dithering`: `data-color-back`, `data-color-front`, `data-shape` (simplex/warp/dots/wave/ripple/swirl/sphere), `data-type` 4x4/8x8, `data-px-size` 2-4 | 2 | `image-rendering:pixelated`; no grain on top |
| A-34 | Halftone photo | Photo as rotated dot screen, CMYK variant | Print-inspired, music posters, streetwear | Recipe, no module: Paper `halftone-dots`/`halftone-cmyk` custom mount; tier-0 alt `.bg-halftone` | 2 | Mid (texture) |
| A-35 | Fluted / reeded glass | Ribbed glass refracting an image or gradient | Architecture, interiors, spa, premium DTC | `shader-bg` preset `fluted-glass`: `data-image` (ACF image URL; empty = token gradient), `data-shape` lines/linesIrregular/wave/zigzag/pattern, `data-size` .4-.5, `data-distortion` .5, `data-angle` 0/90, `data-highlights` .2, `data-scroll-shift` | 2 | Mid; image must be same-origin/CORS |
| A-36 | Warp / smoke | Marbled ink, smoke curls | Fragrance, spirits, creative studio | Recipe, no module: Paper `warp`/`smoke-ring` custom mount | 2 | Light |
| A-37 | Metaballs | Soft merging blobs | Playful DTC, beverages, kids-fintech | Recipe, no module: Paper `metaballs` custom mount (`count 6-10`) | 2 | Light |
| A-38 | Voronoi cells | Glowing cellular crackle | Biotech, skin cosmetics, gaming | Recipe, no module: Paper `voronoi` custom mount | 2 | Light |
| A-39 | Water caustics | Sunlight through water | Pools, spas, beverages, summer | Recipe, no module: Paper `water` custom mount (image optional) | 2 | Mid |
| A-40 | Topographic contours (live) | Shifting contour lines | Outdoor, real estate, geo | Recipe, no module: custom fragment `fract(noise*N)` + `fwidth` AA; tier-0 alt `.bg-topo` | 2 | Light |
| A-41 | Heatmap / thermal | Thermal gradient around a shape | AI/ML, energy, sport tech | Recipe, no module: Paper `heatmap` custom mount | 2 | Mid |
| A-42 | Noise fields | Perlin/simplex/neuro: clouds, neural web | AI/neuro, abstract minimal | Recipe, no module: Paper `perlin-noise`/`simplex-noise`/`neuro-noise` custom mount | 2 | Light |
| A-43 | Colour panels / blinds | Venetian slats, translucent 3D panels | Architecture, fashion, bold SaaS | Recipe, no module: Paper `color-panels` custom mount | 2 | Light |
| A-44 | Hyperspeed tunnel | Streaks rushing at viewer | Automotive, launches, gaming | Recipe, no module: custom 2D polar fragment (never the three.js original) | 2 | Very intense: must freeze on reduced motion; opt-in only |
| A-45 | Fluid ink cursor | Ink following/splashing from cursor | Experimental portfolio | Recipe, no module: stripped WebGL-Fluid-Simulation (MIT) | 2+ | Heavy; desktop only; opt-in "experimental" |
| A-47 | Unicorn Studio embed | Designer-made WebGL scene | When a designer supplies a scene | `<div data-us-project="ID">` + SDK; static poster fallback | 2 | Third-party runtime; free-plan badge |

## Section-level usage patterns

- **SVG art in RTL:** generated SVG (waves, topo, blobs, maps, diagrams) keeps `direction="ltr"` on the `<svg>`; `text-anchor` start/end otherwise flips under `dir="rtl"`. Mirror asymmetric compositions deliberately with a wrapper `scaleX(-1)`, never text (`runtime/README.md` §8).
- **Hero layer stack (max 3 layers):** base (canvas colour or photo) -> one animated layer (tier 1 or 2) -> one static texture (`.bg-grain` or `.bg-dots`). Then content.
- **Band backgrounds between sections:** tier 0 only; change by colour-block (`--c-surface-2`) or divider, not by a new effect. Max 2 distinct background treatments below the hero per page.
- **Dark-to-light sheet:** dark hero with shader; next section is a `--c-canvas` sheet with `border-start-*-radius: var(--r-lg)` sliding up over it (`margin-block-start:-8vh; position:relative; z-index:1`). This is a theme switch device, the only allowed light/dark inversion (Page Theme Lock).
- **CTA card (CTA-02):** shader inside a rounded card, not full-bleed; pause when out of view.
- **ACF fields for any background:** `bg_type` (select: none, css-kit, shader, image-slider, video, map), `bg_kit_class` (checkbox: grain, grid, dots, glow, topo, halftone, scanlines, aurora-lite, conic-sheen, spotlight → `.bg-*` classes), `bg_preset` (select → `data-preset`), `bg_colors` (repeater of token names → `data-colors`, `|`-joined), `bg_speed` (number 0-1 → `data-speed`), `bg_image` (image), `bg_video_webm/mp4` (file) + `bg_poster` (image), `bg_scrim` (range 0-.8), `bg_pause_button` (true/false → `data-pause-button`, forced true for loops >5 s).

## Recipe: box product elevation (hand-drawn SVG)

When a product's front matters (ports, screen, controls) and no photo exists, draw it: one inline `<svg direction="ltr" aria-hidden="true">` in the device's real proportions (1 unit = 1 mm), `vector-effect: non-scaling-stroke` on every stroke, colours from tokens only.
- Layers: body outline (`rx` ≈ 5% of the short side) → inset face plate → parts grouped with `data-part="screen|sockets|ports|grille|power|handle"` → feet.
- Dimension lines: 1px `--c-muted` lines 0.6×margin below/beside the outline with 10px end ticks, labels in `--f-num` (fallback `--f-mono`) 12–14px `tabular-nums`, e.g. `34 cm`; side elevation to the inline-end of the front view (never mirrored).
- Callouts: 1px leader from a part to a label outside the outline; the label text lives in HTML (list next to the drawing), not in SVG, so it stays translatable and readable.
- Motion: parts light (stroke → `--c-accent`, others recede by colour, never opacity on text) as the matching text block enters the centre band (IntersectionObserver `rootMargin: -45% 0px -45% 0px`); reduced motion = all parts lit.
- `fx/device.js` `data-view="elevation"` generates this automatically from `data-size`, `data-dims` and `data-details`.

