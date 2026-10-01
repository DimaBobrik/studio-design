# studio-design runtime

Copy-into-project vanilla runtime: `core.css` + `core.js` + one file per effect in `fx/`. No bundler, no framework.
Every effect is a self-initialising block: `data-fx="name"` plus `data-*` params that map 1:1 to ACF fields.
Every module ships a demo in `demo/<name>.html` (open with `?rtl=1` to flip to Hebrew/RTL).

## 1. Project layout and include order

Canonical project layout (same as SKILL.md §5; all paths relative, no leading slash, so pages open from any folder or sub-path):
```
index.html  shop.html  product.html  …   one file per page at the root (index.html = Home)
_gallery.html                            page gallery linking every page (+ concepts/)
assets/tokens.css  assets/site.css  assets/site.js  [assets/fx-<name>.js]   project code (§9)
runtime/core.css  runtime/core.js  runtime/fx/<only the modules used>.js|.css
fonts/                                   self-hosted font files (§10)
```

CSS order (fixed): `runtime/core.css` → `assets/tokens.css` (direction tokens override core defaults) → `runtime/fx/*.css`
(fx files read the tokens) → `assets/site.css` (project styles win). JS order: GSAP + plugins → Lenis → `runtime/core.js` →
`runtime/fx/*.js` → `assets/fx-*.js` (custom modules) → `assets/site.js`.

```html
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- optional, bilingual previews only: flip before first paint (no LTR flash). Hebrew sites ship <html lang="he" dir="rtl"> instead -->
  <script>if(/[?&]rtl=1/.test(location.search)){document.documentElement.dir='rtl';document.documentElement.lang='he'}</script>
  <!-- fonts: Google Fonts <link> or self-hosted @font-face in assets/tokens.css (§10) -->
  <link rel="stylesheet" href="runtime/core.css">
  <link rel="stylesheet" href="assets/tokens.css">
  <link rel="stylesheet" href="runtime/fx/marquee.css">      <!-- only the fx css you use -->
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  …content…
  <!-- 1. GSAP core + the plugins your modules need (all free since 3.13) -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js"></script>          <!-- split-reveal, footer-reveal rise -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrambleTextPlugin.min.js"></script> <!-- text-fx scramble -->
  <!-- optional, used by other fx: Flip, Observer, Draggable, InertiaPlugin, CustomEase, DrawSVGPlugin,
       MorphSVGPlugin, MotionPathPlugin, ScrollToPlugin — same URL pattern: …/gsap@3.15.0/dist/<Name>.min.js -->
  <!-- 2. Lenis smooth scroll (optional; opt out with <html data-smooth="off">) -->
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
  <!-- 3. core, then fx modules, then project code -->
  <script src="runtime/core.js"></script>
  <script src="runtime/fx/marquee.js"></script>
  <script src="assets/site.js"></script>
</body>
```

- core.js flips `dir` for `?rtl=1` as soon as it executes, registers every loaded GSAP plugin, wires Lenis to ScrollTrigger (one ticker), then runs `SD.initAll()` on DOMContentLoaded.
- Scripts may also be `defer`red (same order). A module registered after boot still initialises its elements.
- `shader-bg` needs no script tag for its dependency: it `import()`s Paper Shaders (`@paper-design/shaders@0.0.81`, Apache-2.0)
  from jsDelivr on demand (override the base with `SD.paperBase = 'vendor/paper/dist/'` for self-hosting).
- Modules degrade when a dependency is missing: no GSAP = content static; no SplitText = whole-element fade; no ScrambleText = fade.
- Optional contract tokens (core.css defaults): `--header-h` (72px; sticky header height, used by `pdp` and Lenis anchor offsets), `--lenis-lerp` (0.1), `--c-on-media` / `--c-media-bg` / `--c-media-scrim` (text, stage and scrim on photos/video: bento media tiles, before-after labels, mega-menu feature card, scrub-video), `--c-success` (added-to-cart states), `--f-num` (numerals, specs, prices, dimension labels; defaults to `--f-mono`) and `--f-brand` (wordmark/logotype; defaults to `--f-display`). `verify.mjs` counts every family declared in `--f-*` tokens as allowed.

## 2. Core API (`window.SD`)

| Call | Returns / does |
|---|---|
| `SD.initAll(root?)` / `SD.destroyAll(root?)` | init / tear down every `[data-fx]` in root (root itself included). Idempotent: calling initAll twice never double-inits. |
| `SD.fx.<name>.init(el)` / `.destroy(el)` | per element; destroy restores the original DOM (verified: markup after destroy == markup before init). |
| `SD.dir(el?)` | `1` LTR, `-1` RTL (nearest `[dir]`). Every horizontal motion is multiplied by it. |
| `SD.reduced()` / `SD.fine()` | prefers-reduced-motion / (hover:hover and pointer:fine) |
| `SD.data(el, key, def)` | typed `data-*` reader (numbers, booleans parsed) |
| `SD.onVisible(el, cb, opts)` | IntersectionObserver helper, returns a disconnect fn |
| `SD.onScroll(cb)` | shared scroll subscription, `cb(scrollY)` at most once per frame (Lenis `scroll` or one passive window listener); returns unsubscribe. Modules never add their own `window` scroll listeners (antipatterns #58). |
| `SD.toRGB(color, el?)` / `SD.toRGBArray(color, el?)` | any CSS colour or token (oklch, color-mix, `var(--c-ink)`, `--c-ink`) → `"rgba(r, g, b, a)"` / `[r,g,b,a]` 0–255. Always resolve colours with it before tweening them: GSAP cannot interpolate oklch()/color-mix() strings. |
| `SD.register(name, {init, destroy})` | registers a module; after boot it initialises matching elements immediately |
| `SD.lenis` | Lenis instance or null |
| `SD.hscroll(el)` | live horizontal tween of an `hscroll` section (for `containerAnimation`) |

ACF block preview re-init (WordPress admin):
```js
if (window.acf) acf.addAction('render_block_preview', function ($el) { SD.destroyAll($el[0]); SD.initAll($el[0]); });
```

Multiple effects on one element: `data-fx="shader-bg split-reveal"` (space-separated).

## 3. Module index (30 modules + globe)

| module | what | JS deps (all optional unless noted) | CSS | markup root | events |
|---|---|---|---|---|---|
| split-reveal | heading line/word/char reveal | gsap + ScrollTrigger + SplitText (no SplitText → fade) | — | h1–h3 or section with `[data-split]` | — |
| clip-reveal | clip-path image reveal + de-zoom | gsap + ScrollTrigger | clip-reveal.css | `figure` / group with `[data-clip]` | — |
| shader-bg | WebGL background, 5 presets | Paper Shaders via `import()` (auto) | — (inline) | any section | — |
| bg-kit | CSS background classes + `.bg-spotlight` | none | bg-kit.css | `.bg-host` / `.bg-spotlight` | — |
| marquee | seamless loop | gsap (ScrollTrigger for `data-velocity`) | marquee.css | wrapper, first child = track | — |
| counter | count-up / odometer | gsap + ScrollTrigger | counter.css | `span` | — |
| text-fx | rotate / scramble / roll | gsap (ScrambleTextPlugin for scramble) | text-fx.css | span / p / a / nav | — |
| magnetic | magnetic buttons | gsap (quickTo) | — | a / button / nav | — |
| cursor | follower cursor / image trail | gsap | cursor.css | `body` / section | — |
| hscroll | pinned horizontal scroll | gsap + ScrollTrigger | hscroll.css | section > `[data-hscroll-track]` | `sd:hscroll {tween}` |
| stack-cards | sticky stacking cards | CSS alone; gsap + ScrollTrigger add scale/shade | stack-cards.css | section > `[data-stack-card]` | — |
| footer-reveal | curtain footer + fit-text wordmark | gsap + ScrollTrigger (SplitText for rise) | footer-reveal.css | `footer` | — |
| bento | bento grid + spotlight/glow | gsap + ScrollTrigger (reveal) | bento.css | `.sd-bento` | — |
| testimonials | 1–4 row capsule marquee + dialog | gsap (else static rows) | testimonials.css | `section.sd-testi` | `sd:testimonials:open {index}` |
| sphere | draggable 3D image sphere | none | sphere.css | `.sd-sphere` | `sd:sphere:open {index}` |
| scrub-video | pinned scroll-scrubbed video/frames hero | gsap + ScrollTrigger (else static final frame) | scrub-video.css | `section.sd-scrub` | — (read `el._sdProgress`) |
| accordion | native `<details>` accordion + FAQ JSON-LD | none (gsap/WAAPI fallback) | accordion.css | `.sd-acc` | `sd:accordion:toggle {item, open}` |
| cart | side cart drawer + fly-to-cart | gsap (fly/bump) | cart.css | `dialog` (one per page) | listens `sd:cart:add/open/close`; emits `sd:cart:change`, `sd:cart:added` |
| pdp | product gallery + variants + sticky ATC | gsap + Flip | pdp.css | `.sd-pdp` | listens `sd:pdp:variant`; emits `sd:pdp:change {name, value, variation_id, variation, in_stock}` |
| flip-grid | product grid filter/density | gsap + Flip (else instant) | flip-grid.css | `section.sd-fgrid` | `sd:fgrid:change {filters, groups, view, count}` |
| before-after | comparison slider (native range) | gsap (intro sweep) | before-after.css | `figure.sd-ba` | — |
| nav | hide-on-scroll header, overlay menu, mega-menu | gsap (overlay stagger) | nav.css | `header.sd-nav` + `dialog.sd-menu` | `sd:nav:menu {open}` |
| map | dotted SVG world map + arcs | gsap (draw-in) | map.css | `figure.sd-map` | — |
| globe | WebGL dotted globe (cobe) | `cobe@2.0.1` ESM via `import()` | map.css | `.sd-globe` | — |
| lathe | code-built object: WebGL2 surface of revolution (vase, bowl, mug, bottle, jar, glass, candle, custom profile) in 5 materials; drag/keys, auto-turn, scroll-turn stage, still fallback | none (gsap for intro; ScrollTrigger for pinned scroll-turn) | lathe.css | `.sd-lathe` (+ `<img>` fallback) | `sd:lathe:turn {progress, angle}` |
| device | code-built box product: CSS 3D box (views three-quarter/iso/perspective/front/side/top) or front+side elevation with dimension lines; generated front details (screen, sockets, ports, grille, power, handle, knob, led) with part highlighting; drag/keys, auto, scroll turn | none (ScrollTrigger for scroll turn) | device.css | `figure.sd-device` | — (API `el.sdDevice.highlight(part)`) |
| todo-links | `#todo-<page>` links open a "not in this delivery" dialog (he/en) | none | todo-links.css | `body[data-fx="todo-links"]` (handles every `a[href^="#todo-"]`) | — |
| quickview | card image morphs into a dialog | gsap (else CSS fade) | quickview.css | `dialog.sd-qv` (one per page) | `sd:qv:open` / `sd:qv:close {id, trigger}` |
| tone-shift | scroll colour chapters: page canvas crossfades between section tones (opacity of fixed layers, no colour tweening) | none (SD.onScroll) | tone-shift.css | wrapper whose direct children carry `data-tone` | `sd:tone {index, tone, section}` |
| travel | one protagonist object flies between slots in different sections (position, scale, rotation, view crossfade) | none (SD.onScroll) | travel.css | wrapper containing ≥2 `[data-travel-slot]` | — |
| scatter | editorial scatter field: authored image positions around an anchor word, depth parallax, optional fly-in assembly | none (SD.onScroll) | scatter.css | `section` with `[data-scatter-anchor]` + `[data-scatter-item]` | — |

Every `data-*` param of every module is listed in §4 (name | type | default | ACF field type). The header comment of each
`fx/<name>.js` is the source of truth; this file mirrors it.

Common rules: transform / opacity / filter / clip-path only; `gsap.matchMedia()` reduced-motion branch shows the final static state;
loops and canvases pause offscreen; decorative layers are `aria-hidden`; logical CSS properties; Hebrew never gets char-splits.
Every module is idempotent (WeakMap guard) and `destroy` removes listeners, observers, tweens and injected DOM.
Modules that need a perfect circle (cursor dot/ring, swatches, carousel dots, toggles, markers) use `50%` / `999px` literals,
never `--r-pill`, because some directions set `--r-pill: 0`.

## 4. Module reference

### Group A — text, media, background, scroll


#### split-reveal — heading line-mask / word / char reveal on scroll  (needs ScrollTrigger + SplitText)
`<h2 data-fx="split-reveal">…</h2>` or on a section (splits `[data-split]` children, else h1–h3).
| param | type | default | ACF |
|---|---|---|---|
| data-type | lines \| words \| chars (chars → words in RTL/he/non-Latin) | lines | Select |
| data-variant | slide \| blur \| fade \| colour (scroll-lit: colour floor → ink, contrast-safe; use with data-scrub) | slide | Select |
| data-floor | colour variant: share mixed toward the background (auto-limited to 3:1 ≥24px / 4.5:1) | .45 | Number |
| data-stagger | number (s) | .09 / .035 / .018 | Number |
| data-duration | number (s) | 1.1 | Number |
| data-delay | number (s) | 0 | Number |
| data-start | ScrollTrigger start | "top 86%" | Text |
| data-scrub | boolean | false | True/False |
| data-once | boolean | true | True/False |

#### clip-reveal — clip-path image reveal + inner de-zoom  (needs ScrollTrigger; css: fx/clip-reveal.css)
`<figure data-fx="clip-reveal"><img …></figure>` or a group with `[data-clip]` frames (staggered).
| param | type | default | ACF |
|---|---|---|---|
| data-direction | up \| down \| inline-start \| inline-end \| center (inline-* mirror in RTL) | up | Select |
| data-zoom | number (inner start scale) | 1.25 | Number |
| data-duration | number (s) | 1.4 | Number |
| data-delay / data-stagger | number (s) | 0 / .12 | Number |
| data-ease | GSAP ease | "expo.inOut" | Text |
| data-start | ScrollTrigger start | "top 82%" | Text |
| data-scrub | boolean | false | True/False |
| data-parallax | number (% inner drift, 0 = off) | 0 | Number |

#### shader-bg — WebGL background (Paper Shaders ShaderMount)
`<section data-fx="shader-bg" data-preset="mesh-gradient">…</section>` → injected `.sd-shader` layer (z-index −1, aria-hidden).
| param | type | default | ACF |
|---|---|---|---|
| data-preset | mesh-gradient \| grain-gradient \| god-rays \| dithering \| fluted-glass | mesh-gradient | Select |
| data-colors | list: `--token`, `--token/40` (alpha %), or any CSS color; `\|` or `,` separated | per preset, from tokens | Text |
| data-color-back / -front / -bloom / -shadow / -highlight | color (same syntax) | per preset | Text |
| data-speed | number (0 = still) | .3–.45 (fluted 0) | Number |
| data-frame | ms (start + reduced-motion still frame) | 12000 | Number |
| data-scale / data-rotation / data-offset-x / data-offset-y | number (offset-x mirrored in RTL for god-rays) | preset | Number |
| data-shape | grain: wave\|dots\|truchet\|corners\|ripple\|blob\|sphere · dithering: simplex\|warp\|dots\|wave\|ripple\|swirl\|sphere · fluted: lines\|linesIrregular\|wave\|zigzag\|pattern | corners / warp / lines | Select |
| data-type | dithering: random \| 2x2 \| 4x4 \| 8x8 | 4x4 | Select |
| data-px-size | dithering pixel (px) | 3 | Number |
| mesh: data-distortion / data-swirl / data-grain | number | .8 / .2 / .12 | Number |
| grain: data-softness / data-intensity / data-noise | number | .7 / .25 / .35 | Number |
| god-rays: data-density / data-spotty / data-bloom / data-intensity / data-mid-size / data-mid-intensity | number | .3 / .3 / .4 / .75 / .2 / .4 | Number |
| fluted: data-image (CORS URL; empty = token gradient) / data-size / data-distortion / data-shadows / data-highlights / data-edges / data-blur / data-angle / data-distortion-shape (prism\|lens\|contour\|cascade\|flat) | mixed | "" / .4 / .5 / .25 / .1 / .25 / 0 / 0 / prism | Image / Number / Select |
| data-scroll-shift | fluted flutes shift with scroll | true | True/False |
| data-mobile | live \| static \| fallback (coarse pointer or < 768px) | live | Select |
| data-pause-button | boolean (WCAG 2.2.2 toggle) | false | True/False |
DPR capped at 1.5; pauses offscreen and on hidden tabs; CSS radial-gradient fallback (same colors) without WebGL2. Check text contrast against the brightest frame.

#### bg-kit — zero-cost background utilities (css: fx/bg-kit.css; js only for .bg-spotlight)
Classes: `.bg-glow` (+ `--bottom`, `--corner`), `.bg-grid`, `.bg-dots`, `.bg-topo`, `.bg-halftone` (+ `.is-dark`), `.bg-scanlines`,
`.bg-aurora-lite`, `.bg-conic-sheen`, `.bg-grain`, masks `.bg-mask-none|top|bottom|start|end|edges`. Stack via children
`<div class="bg-layer bg-grid"></div>` inside a `.bg-host`. Knobs: `--bg-line --bg-size --bg-mask --bg-opacity --grain-opacity --glow-1 --glow-2 --aurora-1..3 --aurora-speed --sheen-color --sheen-speed`.
`.bg-spotlight` + `data-fx="bg-kit"` (on the surface or on a grid of cards; `.bg-spotlight--rim` lights the border):
| param | type | default | ACF |
|---|---|---|---|
| data-smooth | number 0–1 (1 = instant) | .18 | Number |
| data-reach | px outside a card that still lights it | 120 | Number |

#### marquee — seamless loop  (css: fx/marquee.css; ScrollTrigger only for velocity)
`<div data-fx="marquee" aria-label="Clients"><ul role="list"><li>…</li></ul></div>` (first child = track).
| param | type | default | ACF |
|---|---|---|---|
| data-speed | px/s | 60 | Number |
| data-direction | auto \| reverse (auto = toward inline-start; flips in RTL) | auto | Select |
| data-gap | CSS length | var(--sp-6) | Text |
| data-pause-hover | boolean (also pauses on focus) | true | True/False |
| data-controls | boolean pause/play button (WCAG 2.2.2) | true | True/False |
| data-draggable | boolean drag + inertia | false | True/False |
| data-velocity | boolean scroll-speed boost + direction | false | True/False |
| data-skew | max deg with velocity | 0 | Number |
| data-fade | boolean edge fade | true | True/False |
| data-label-pause / data-label-play | text | en/he auto | Text |
Reduced motion: native keyboard-scrollable snap row, no clones.

#### counter — count-up / odometer roll  (needs ScrollTrigger; css: fx/counter.css)
`<span data-fx="counter" data-to="1250" data-suffix="+">1,250+</span>` (final value stays in the HTML).
| param | type | default | ACF |
|---|---|---|---|
| data-to / data-from | number | text value / 0 | Number |
| data-decimals | number | 0 | Number |
| data-format | standard \| compact \| percent \| currency \| currency-compact | standard | Select |
| data-currency | ISO code | ILS | Text |
| data-locale | BCP-47 or auto (nearest lang; he → he-IL) | auto | Text |
| data-prefix / data-suffix | text | "" | Text |
| data-variant | count \| roll | count | Select |
| data-duration | s | 2 (roll 2.2) | Number |
| data-start | ScrollTrigger start | "top 88%" | Text |
| data-grouping | boolean | true | True/False |

#### text-fx — rotate words / scramble / roll hover  (css: fx/text-fx.css; ScrambleTextPlugin for scramble)
| param | type | default | ACF |
|---|---|---|---|
| data-mode | rotate \| scramble \| roll | rotate | Select |
| rotate: data-words | "a\|b\|c" | — | Text / Repeater |
| rotate: data-interval | s | 2.2 | Number |
| rotate: data-effect | slide \| blur \| flip | slide | Select |
| rotate: data-cycles | cycles then stop on first word (0 = endless) | 3 | Number |
| scramble: data-trigger | view \| load \| hover | view | Select |
| scramble: data-chars | glyph set or auto (Hebrew set in RTL) | auto | Text |
| scramble: data-duration | s | 1.2 | Number |
| roll: data-stagger | chars \| none (chars = Latin only) | chars | Select |
Roll works on a link/button or on a container (applies to its a/button/[data-roll]); keep icons outside `[data-roll-label]`.

#### magnetic — magnetic buttons  (gsap.quickTo; pointer:fine only)
`<a data-fx="magnetic"><span data-magnetic-label>…</span></a>` or on a nav (applies to a/button/[data-magnetic]).
| param | type | default | ACF |
|---|---|---|---|
| data-strength | 0–1 | .35 | Number |
| data-label | extra label pull 0–1 | .6 | Number |
| data-radius | px beyond the edge | 60 | Number |
| data-return | ease | "elastic.out(1, 0.35)" | Text |

#### cursor — follower cursor / image trail  (css: fx/cursor.css; opt-in, pointer:fine, off with reduced motion)
Follower: `<body data-fx="cursor">`; hot targets a/button/[data-cursor]; `data-cursor="View"` shows a label.
Trail: `<section data-fx="cursor" data-variant="trail" data-images="a.jpg|b.jpg">`.
| param | type | default | ACF |
|---|---|---|---|
| data-variant | follower \| trail | follower | Select |
| data-hide-native | boolean (never on input/textarea/select/contenteditable) | false | True/False |
| data-blend | boolean difference blend | false | True/False |
| data-lag | ring follow s | .45 | Number |
| trail: data-images | URLs "\|" separated (or `<img data-trail-src>` / `<template>`) | — | Gallery |
| trail: data-threshold | px between images | 90 | Number |
| trail: data-size | CSS length | "min(22vw, 260px)" | Text |
| trail: data-pool | max images | 8 | Number |

#### hscroll — pinned horizontal scroll  (needs ScrollTrigger; css: fx/hscroll.css)
`<section data-fx="hscroll"><div data-hscroll-track><article data-hscroll-panel>…</article>…</div></section>`;
images with `data-hs-parallax` drift inside their frame (containerAnimation). RTL travels rightwards.
| param | type | default | ACF |
|---|---|---|---|
| data-min-width | px; below = native scroll-snap row | 900 | Number |
| data-scrub | true \| seconds | 1 | Number |
| data-speed | scroll length multiplier | 1 | Number |
| data-parallax | % (0 = off) | 12 | Number |
| data-progress | boolean progress bar (currentColor) | true | True/False |
| data-snap | boolean snap to panels | false | True/False |
Other code: `el.addEventListener('sd:hscroll', e => ScrollTrigger.create({ containerAnimation: e.detail.tween, trigger, start: SD.dir(el) === 1 ? 'left right' : 'right left' }))`.

#### stack-cards — sticky stacking cards  (css: fx/stack-cards.css works alone; ScrollTrigger adds scale + shade)
`<section data-fx="stack-cards"><article data-stack-card>…</article>…</section>`
| param | type | default | ACF |
|---|---|---|---|
| data-top | CSS length (sticky top of card 1) | 12svh | Text |
| data-offset | px peek per card | 18 | Number |
| data-scale | covered card scale | .9 | Number |
| data-dim | shade opacity 0–1 | .45 | Number |
| data-rotate | covered card tilt deg (mirrored RTL) | 0 | Number |

#### footer-reveal — curtain footer + fit-to-width wordmark  (css: fx/footer-reveal.css; SplitText for the rise)
`<footer data-fx="footer-reveal"><div data-footer-inner>…<div data-fit-text aria-hidden="true">Brand</div></div></footer>`
(the footer's previous sibling becomes the cover: relative, z-index 1, canvas background, rounded bottom via `--cover-radius`).
| param | type | default | ACF |
|---|---|---|---|
| data-curtain | boolean | true | True/False |
| data-parallax | % footer drift while revealing | 30 | Number |
| data-max-height | disable curtain if footer > share of viewport | .9 | Number |
| data-fit-max | px cap for the wordmark (0 = none) | 0 | Number |
| data-crop | crop wordmark bottom 0–.4 | 0 | Number |
| data-rise | boolean letters (Latin) / words (Hebrew) rise | true | True/False |

### Group B — layout, commerce, media, navigation

Demo assets live in `demo/assets/`: a procedural skyline video (webm + mp4), 48 WebP frames, a cutout and a poster, all
rendered by the maintainers from a seeded procedural scene (Python + Pillow, encoded with ffmpeg; CC0).

#### bento — `fx/bento.js` + `fx/bento.css`
This is a bento grid built with CSS grid and `grid-auto-flow: dense`. On fine pointers it adds a surface spotlight and a proximity border glow. The glow lights the edges of *neighbouring* tiles near the cursor.

Markup: `.sd-bento[data-fx=bento] > .sd-bento__tile[data-size]`. Optional children are `.sd-bento__media` (a full-bleed image), `.sd-bento__kicker`, `.sd-bento__title`, `.sd-bento__text` and `.sd-bento__push` (pushes content to the bottom). Use `.sd-bento__tile--media` for image tiles with a scrim.

| param | type | default | ACF |
|---|---|---|---|
| data-layout | string | auto | select: auto / feature (tile 1 = 2×2) / mosaic (7-tile rhythm) / rail (tile 1 tall) |
| data-spotlight | bool | true | true_false |
| data-glow | bool | true | true_false |
| data-reveal | bool | true | true_false |
| data-stagger | number | 0.08 | number |
| tile `data-size` | string | "" | select: "" / wide / tall / large / hero / full |

The grid has 4 columns, drops to 2 at ≤1024px and to 1 at ≤600px. The column count can be overridden with `--bento-cols`, and the row height with `--bento-row`.

ACF: use a repeater with a "tile" layout that has a size select, a kicker, a title, text and an optional image. Keep the DOM order logical for screen readers, because `dense` only reorders the tiles visually.

#### testimonials — `fx/testimonials.js` + `.css`
This is the common "Testimonial Marquee" effect prompt: 3 rows of capsules moving in alternating directions over a hatch band with edge fades. Clicking a capsule opens the quote in a `<dialog>`.

The source list (`ul.sd-testi__list > li.sd-testi__item` with `img`, `.sd-testi__name`, `.sd-testi__role` and `blockquote`) renders as a readable grid when JS is off. The module builds the rows itself.

| param | type | default | ACF |
|---|---|---|---|
| data-rows | number | 3 | number (1–4) |
| data-speed | number | 40 | number (px/s) |
| data-pause-hover | bool | true | true_false |
| data-label-pause / -play / -close / -open | string | Pause / Play / Close / "Read testimonial from" | text |

Event: `sd:testimonials:open {index}`.

Accessibility:
- The first copy of each row is made of real buttons. Clones are `aria-hidden` with `tabindex=-1`.
- A Pause button covers WCAG 2.2.2.
- The dialog returns focus to the capsule that opened it.

Reduced motion shows static rows that scroll natively. The loop pauses offscreen.

#### sphere — `fx/sphere.js` + `.css`
This is the common "Img Sphere" effect prompt: a Fibonacci distribution with a pole bonus and deterministic jitter, Y-then-X rotation, drag with momentum (decay 0.95, max 5°/frame) and auto-rotate. Depth drives scale and opacity: the back hemisphere stays faint so it reads as a ball. The item size adapts to density. Everything runs in one rAF loop that writes `translate3d`, and CSS perspective does the depth.

Markup: `.sd-sphere > ul.sd-sphere__list > li > button.sd-sphere__item[data-title][data-text][data-full] > img[alt]`

| param | type | default | ACF |
|---|---|---|---|
| data-radius | number | 0 (auto = 40% of box) | number |
| data-item-size | number | 0 (auto, density-based) | number |
| data-auto-rotate | bool | true | true_false |
| data-speed | number | 18 (deg/s) | number |
| data-sensitivity | number | 0.5 | number |
| data-decay | number | 0.95 | number |
| data-max-speed | number | 5 | number |
| data-modal | bool | true | true_false (false → `<a>` items navigate) |
| data-hint | string | "" | text |
| data-label-close | string | Close | text |

Keyboard:
- The sphere is focusable; arrow keys rotate it (hold Shift for 45° steps).
- Tabbing to an item rotates that item to the front, and Enter opens it.

Event: `sd:sphere:open {index}`. The loop pauses offscreen, while the dialog is open, and in a hidden tab. Reduced motion turns off auto-rotate and momentum. Aim for 30–60 images; they are loaded eagerly, so keep the thumbnails small (240px).

#### scrub-video — `fx/scrub-video.js` + `.css`
This is the common "TOKYO SKYLINE HERO" effect prompt rebuilt on ScrollTrigger `pin` + `scrub`. There is no wheel hijack and no body lock.

What the scroll drives:
- The media runs to the `video-end` point.
- The title blurs out.
- The brand text composes: opacity, y, blur and tracking.
- A **transparent foreground cutout, pixel-aligned with the last frame, fades in above the brand text**, so the foreground occludes it.
- A progress bar fills along the bottom.

There are two media modes:
- `<video>`: encode it all-keyframe (`-g 1`) or with a short GOP, and ship webm + mp4 `<source>`s. The server must support HTTP Range.
- `<canvas data-frames>`: a frame sequence, recommended on iOS. It loads coarse-to-fine, first and last frame first, and is DPR-capped at 1.5.

| param | type | default | ACF |
|---|---|---|---|
| data-length | number | 300 (% vh pinned) | number |
| data-scrub | number | 0.5 | number |
| data-mode | string | auto | select: auto (frames on touch if a canvas exists) / video / frames |
| data-video-end | number | 0.78 | number |
| data-title-out | number | 0.30 | number |
| data-brand-start / -end | number | 0.80 / 0.93 | number |
| data-cutout-start / -end | number | 0.85 / 0.96 | number |
| data-brand-track | bool | true | true_false |
| canvas: data-frames / data-count / data-pad / data-start | string / number | — | text / number / number / number |

CSS knobs: `--scrub-brand-lift` sets the brand's vertical position (16vh on desktop, 20vh on mobile). `--scrub-focus` sets the object-position.

Reduced motion (or no ScrollTrigger): nothing is pinned, and the final composition is shown statically. `el._sdProgress` exposes the current progress.

ACF fields: video file (webm + mp4), frames folder URL plus count, cutout PNG/WebP (it must share the last frame's crop), poster, title and brand text.

#### accordion — `fx/accordion.js` + `.css`
This is a native `<details>` accordion. On engines that support `interpolate-size` and `::details-content` (Chromium 131+), the height animates in pure CSS. On older engines, the JS fallback animates height with GSAP, or with WAAPI if GSAP is absent. Exclusive mode uses the native `name=""` group.

| param | type | default | ACF |
|---|---|---|---|
| data-exclusive | bool | false | true_false |
| data-icon | string | plus | select: plus / cross |
| data-jsonld | bool | false | true_false |
| data-duration | number | 0.38 | number |

Event: `sd:accordion:toggle {item, open}`.

For FAQPage JSON-LD, rendering it server-side is preferred. `data-jsonld` is the JS fallback: it builds the JSON-LD from the DOM.
```php
<?php $faq = get_sub_field('items'); // repeater: question (text), answer (wysiwyg)
$ld = ['@context'=>'https://schema.org','@type'=>'FAQPage','mainEntity'=>array_map(fn($r)=>[
  '@type'=>'Question','name'=>wp_strip_all_tags($r['question']),
  'acceptedAnswer'=>['@type'=>'Answer','text'=>wp_kses_post($r['answer'])]], $faq ?: [])]; ?>
<script type="application/ld+json"><?= wp_json_encode($ld, JSON_UNESCAPED_UNICODE) ?></script>
```

#### cart — `fx/cart.js` + `.css`
This is a WooCommerce-style side cart:
- A fly-to-cart clone travels on an arc to the visible `[data-cart-open]` icon. The target is measured, so it lands correctly in RTL, where the cart sits on the left.
- A badge bump plays on the cart icon.
- The drawer is a `<dialog>`, which gives a focus trap and focus return. It slides in from the inline-end via `@starting-style`.
- A free-shipping meter.
- Qty steppers, plus a number input.
- The subtotal is formatted with `Intl.NumberFormat` (e.g. `he-IL` / ILS).
- An `aria-live` region announces "added" messages.

`data-fx="cart"` goes on the `<dialog>`. There is one cart per page.

| param | type | default | ACF |
|---|---|---|---|
| data-currency | string | ILS | text |
| data-locale | string | `<html lang>` | text |
| data-free-shipping | number | 0 (hidden) | number |
| data-open-on-add | bool | true | true_false |
| data-persist | bool | false | true_false — set `data-persist="true"` on every **multi-page static preview** (the cart survives page changes via localStorage, so shop → product → cart reads as one store); **remove it in WooCommerce** (Woo cart fragments / Store API are the source of truth) |
| data-label-away / -free / -added / -qty / -dec / -inc | string | English defaults (`{amount}`, `{name}` tokens) | text |

Hooks:
- Buttons: `[data-add-to-cart]` with `data-id`, `data-name`, `data-price`, `data-img`, `data-variant`, `data-qty`. The fly source is the `img` inside the closest `[data-product]`.
- `[data-cart-open]` opens the drawer, and `[data-cart-count]` holds the badge count.
- Inside the drawer, lines render from `<template data-cart-line>`.

Events:
- Listened for on `document`: `sd:cart:add {id,name,price,img,variant,qty,from}`, `sd:cart:open`, `sd:cart:close`.
- Emitted: `sd:cart:change {items,count,subtotal}` and `sd:cart:added {item}`.

API: `SD.cart.add(item, fromEl)`, `.setQty(id,q)`, `.remove(id)`, `.set(items)`, `.open()`, `.close()`, `.fly(img)`, `.syncFromStore()`.

**WooCommerce wiring.** The server is the source of truth. Set an adapter before `cart.js` initialises:
```js
window.SD_CART_ADAPTER = (function () {
  var nonce = (window.wcSettings && wcSettings.storeApiNonce) || '';
  var api = function (path, body) {
    return fetch('/wp-json/wc/store/v1/cart' + path, { method: body ? 'POST' : 'GET', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'Nonce': nonce }, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { nonce = r.headers.get('Nonce') || nonce; return r.json(); })
      .then(function (c) { var mu = Math.pow(10, (c.totals && c.totals.currency_minor_unit) || 2);
        return (c.items || []).map(function (i) { return { id: String(i.id), key: i.key, name: i.name, qty: i.quantity,
          price: +i.prices.price / mu, img: i.images[0] && i.images[0].thumbnail,
          variant: (i.variation || []).map(function (v) { return v.value; }).join(' · ') }; }); });
  };
  return { load: function () { return api(''); },
    add: function (it) { return api('/add-item', { id: +it.id, quantity: it.qty }); },
    update: function (key, q) { return api('/update-item', { key: key, quantity: q }); },
    remove: function (key) { return api('/remove-item', { key: key }); } };
})();
```
Classic archive AJAX buttons: `jQuery(document.body).on('added_to_cart', function(e, frags, hash, $btn){ SD.cart.syncFromStore().then(function(){ SD.cart.fly($btn.closest('.product').find('img')[0]); SD.cart.open(); }); });`

#### pdp — `fx/pdp.js` + `.css`
The product page has four parts:
- **Stacked gallery with a sticky buy box.** This is pure CSS: 1.35fr / 1fr, the buy box sticks at `--header-h + 24px`, and `data-cols="2"` makes a 1+2+2 mosaic.
- **Mobile swipe gallery.** It uses scroll-snap, and the module adds dots plus a `1 / n` counter.
- **Variant radios.** They move the matching slide to the top of the stack with a **Flip** reorder on desktop, or scroll to it on mobile. They also update the price (`Intl`), the variant label, and the ATC's `data-*`.
- **Sticky add-to-cart bar.** It appears once the main ATC is above the viewport, or hidden under the sticky header. An IntersectionObserver is backed by a rAF scroll check, so jumps are caught too.

| param | type | default | ACF |
|---|---|---|---|
| data-currency / data-locale | string | ILS / `<html lang>` | text |
| data-bar | bool | true | true_false |
| data-flip | bool | true | true_false |
| data-label-slide | string | "Image {n} of {total}" | text |
| data-label-added | string | Added | text |

Hooks: `.sd-pdp__slide[data-key]`, radios with `data-slide`, `data-img`, `data-price`, `data-id` and `data-label`, plus `[data-pdp-price]`, `[data-pdp-variant-label]`, `[data-pdp-atc]`, `.sd-pdp__bar [data-pdp-bar-atc]` and `[data-pdp-bar-img]`.

Variation matrix (several attributes, Woo variable products): put `data-variations='[{"id":201,"attributes":{"attribute_pa_metal":"gold","attribute_pa_size":"52"},"price":4200,"sku":"R-201","in_stock":true,"stock":2,"image":"…"}]'` on `.sd-pdp` (the output of `$product->get_available_variations()`, trimmed; `"any"` or `""` = any value). Radios use `name` = attribute key and `value` = term slug. `data-swap-attribute` names the attribute that swaps the slide/image. Options with no matching variation become `disabled`; options whose variations are all out of stock get `[data-oos]` (struck, still selectable, so the shopper can see it exists). The ATC is disabled until the selection is complete and in stock; its text follows `data-label-choose` / `-unavailable` / `-oos` / `-low` (`{n}`, threshold `data-low-stock`, default 3). `[data-pdp-stock]` (aria-live) and `[data-pdp-sku]` are filled when present.

| param | type | default | ACF |
|---|---|---|---|
| data-variations | JSON | — | (generated from Woo, not an ACF field) |
| data-swap-attribute | string | first attribute | select |
| data-low-stock | number | 3 | number |
| data-label-choose / -unavailable / -oos / -low | string | English defaults | text |

Mosaic: with `data-cols="2"`, an odd last image spans both columns (no orphan). Fieldsets (`.sd-pdp__opt`) are separated by a 1px `--c-rule` line drawn as a background, never a fieldset border (which breaks the legend).

Events: it listens for `sd:pdp:variant {img, price, id, key}` and emits `sd:pdp:change {name, value, variation_id, variation, in_stock}`.

Woo variable products: forward the `found_variation` event like this:
`jQuery('form.variations_form').on('found_variation', function(e, v){ pdpEl.dispatchEvent(new CustomEvent('sd:pdp:variant', {detail:{img:v.image.src, price:v.display_price, id:v.variation_id}})); });`

Out-of-stock sizes are rendered as `disabled` radios, which get a CSS strike.

#### flip-grid — `fx/flip-grid.js` + `.css`
This is a product grid:
- A view/density switch offers 2, 3 or 4 columns, or a list. It uses radios and is remembered per viewer in localStorage.
- Filter chips are buttons with `aria-pressed` and show per-chip counts.
- A results count sits in an `aria-live` region, and there is an empty state.

All layout changes animate with GSAP **Flip** (`absolute`, `nested`, fades on enter and leave).

| param | type | default | ACF |
|---|---|---|---|
| data-multi | bool | false | true_false (OR-combine chips; also per group) |
| data-duration | number | 0.6 | number |
| data-stagger | number | 0.02 | number |
| data-counts | bool | true | true_false |
| data-remember | bool | true | true_false |

Items: `li.sd-fgrid__item[data-tags="rings gold"]`. Map the tags from product_cat / attribute slugs.

Several filter groups (category + metal + price band): wrap each group's chips in `<div class="sd-fgrid__chips" data-filter-group="metal" role="group" aria-label="Metal">` (optional `data-multi` per group). OR within a group, AND across groups; each group may have its own `data-filter="*"` chip. Chip rows wrap by default; `data-chips="scroll"` keeps one row that scrolls inside itself, so the page never widens at 320/390. All rules sit in `:where()`, so project CSS overrides them without specificity fights; counts (`<sup>`) recede by `--c-muted`, never opacity.

For server-side filtering (Store API or URL params), wrap your DOM swap as `el.sdFlipSwap(function(){ /* replace items */ })`.

Event: `sd:fgrid:change {filters, view, count}`. Reduced motion makes changes instant.

#### before-after — `fx/before-after.js` + `.css`
The real control is a full-size native `<input type=range>` layered over the images and made invisible. That gives keyboard support, screen-reader values (via `aria-valuetext`) and touch for free. It has a 2px thumb, so the divider tracks the finger exactly.

In RTL, the before layer sits at the inline-start (right) edge and the native RTL range runs right→left, so dragging, the arrow keys and the clip all agree. In the tests, a drag to 25% of the physical width gave value 75 and put the handle at 24.9%.

`data-orientation="vertical"` uses `writing-mode: vertical-lr`.

| param | type | default | ACF |
|---|---|---|---|
| data-start | number | 50 | range |
| data-orientation | string | horizontal | select |
| data-hover | bool | false | true_false |
| data-intro | bool | true | true_false |
| data-label-before / -after | string | Before / After | text |

Tip: when you only have one photo, render "before" as the same image with a filter. The demo uses picsum `?grayscale&blur=2`.

#### nav — `fx/nav.js` + `.css`
Use any subset of the three patterns on the same `<header class="sd-nav" data-fx="nav">`.

**(a) Hide on scroll.** The header hides on scroll-down and shows on scroll-up once you pass the tolerance. It also shows on focus and while a menu is open. It switches to `is-scrolled` (a solid or glass background) after `data-hero`. `data-variant` is `bar` or `pill`, where pill is a floating glass capsule. Use `--nav-ink-top` for the text colour over the hero.

**(b) Full-screen overlay menu.** It is a `<dialog class="sd-menu">`, so the focus trap is native.
- The open sequence is: 2 colour layers `scaleY`, then big links rising from masks (`yPercent 115→0`, stagger 0.06), then the meta row fading in.
- Escape (the `cancel` event) plays the reverse at 1.8× speed.
- Focus goes to the close button and returns to the toggle.
- Clicking a link closes the menu instantly so navigation happens.

**(c) Mega-menu.** `.sd-mega > button[aria-expanded][aria-controls] + .sd-mega__panel`.
- Hover intent applies to mouse pointers only: 120 ms to open, 260 ms to close.
- A click right after a hover-open doesn't close the panel.
- Click toggles on touch and keyboard.
- Escape closes the panel and focuses the button; outside clicks and focus-out also close it.
- The panel reveals via `clip-path`, and its columns stagger.

| param | type | default | ACF |
|---|---|---|---|
| data-variant | string | bar | select: bar / pill |
| data-hide | bool | true | true_false |
| data-hero | string | "" | text (selector) |
| data-offset | number | 80 | number |
| data-tolerance | number | 6 | number |

Event: `sd:nav:menu {open}`.

WordPress: render `wp_nav_menu` items into `.sd-nav__links`. Top-level items with a "mega" CSS class become `.sd-mega`; use a custom walker, or an ACF options page for the columns and the feature card.

#### map — `fx/map.js` (+ `globe`: `fx/globe.js`), CSS `fx/map.css`
**Dotted world map.** This is the common "Animated Map" effect prompt. The land grid was pre-computed from `dotted-map` (MIT) and is embedded as 3 KB of hex rows, so there is no runtime dependency. Dots render as **one SVG path**. Arcs use the *same* Mercator projection, so markers land exactly on their cities. The Aceternity original had a projection mismatch. The map:
- draws its arcs in once visible (`pathLength=1` dashoffset)
- sends light pulses travelling along the arcs (a CSS dash loop, paused offscreen)
- shows pulsing markers and city label chips.

The route list (`li[data-from="lat,lng"][data-to][data-label-from][data-label-to]`) stays in the DOM, visually hidden, as the accessible alternative. The map is never mirrored in RTL.

| param | type | default | ACF |
|---|---|---|---|
| data-dot | number | 0.44 | number |
| data-arc-height | number | 0.28 | number |
| data-stagger | number | 0.5 | number |
| data-duration | number | 1.2 | number |
| data-pulse | bool | true | true_false |
| data-labels | bool | true | true_false |
| data-fade | bool | true | true_false |

Colours: `--map-dot` and `--map-accent`. `SD.fx.map.project(lat,lng)` is exposed for custom overlays.

**Globe.** `cobe@2.0.1` (MIT) is loaded with `import()` from jsdelivr `+esm`, and this works from a classic script. It uses the same route list for markers and arcs:
- Drag rotates it, with momentum.
- It auto-rotates.
- `data-center="lat,lng"` sets the starting face.
- Colours come from any CSS colour, including tokens and oklch; they are resolved through a 1px canvas.
- DPR is capped at 1.5.
- The loop is paused offscreen and in a hidden tab.

Destroy also removes the wrapper `<div>` that cobe injects and the `<style>` it adds to `<head>`.

| param | type | default | ACF |
|---|---|---|---|
| data-src | string | jsdelivr cobe@2.0.1/+esm | text (self-host for prod) |
| data-speed | number | 0.12 (rad/s) | number |
| data-theta | number | 0.28 | number |
| data-dark | number | 0 | number 0–1 |
| data-samples | number | 16000 | number |
| data-base / -marker / -glow / -arc | string (CSS colour) | tokens | color_picker / text |
| data-arcs | bool | true | true_false |
| data-center | string | "" | text "lat,lng" |

#### todo-links — `fx/todo-links.js` + `.css`
Static previews only. Every `<a href="#todo-<page>">` (a page that is not part of this delivery, see `pages/_shared.md` §5 rule 4) opens one small native `<dialog>`: "This page is not part of this delivery" / "העמוד הזה עוד לא חלק מהמסירה", with the link text as the page name. Language follows the nearest `[lang]` of the link. Native dialog = focus trap, Esc, focus return; Lenis is paused while open. Put `data-fx="todo-links"` on `<body>`; list every `#todo-*` target in `pages.md` under "not built". In WordPress these links become real pages or are removed, so the module is not enqueued.

| param | type | default | ACF |
|---|---|---|---|
| data-title | string | he/en "not in this delivery" | — |
| data-text | string | he/en, `{page}` = link text | — |
| data-close | string | "סגירה" / "Close" | — |

#### quickview — `fx/quickview.js` + `.css`
Clicking `[data-quickview]` on a card morphs the card's image into the dialog's image using a manual FLIP (translate + scale). The source image is hidden during the morph, so it reads as a shared element. The panel (`.sd-qv__bg`) fades and scales separately, and the content staggers in. Close (Escape, the backdrop, or ×) reverses the morph back into the card if the card is still on screen, and otherwise fades. Focus goes to × and returns to the trigger.

The thumbnail shows instantly and is upgraded to `data-img` once that image has loaded.

On mobile the dialog becomes a bottom sheet.

The ATC button inherits the product's `data-*`, so `fx/cart` (fly + drawer) takes over when it is present.

| param | type | default | ACF |
|---|---|---|---|
| data-currency / data-locale | string | ILS / `<html lang>` | text |
| data-duration | number | 0.7 | number |
| data-label-added | string | Added | text |

Trigger attributes: `data-id`, `data-title`, `data-price`, `data-text`, `data-img` (large), `data-url`.

Events: `sd:qv:open` / `sd:qv:close {id, trigger}`. For variable products, fetch `/wp-json/wc/store/v1/products/{id}` on `sd:qv:open`.

#### lathe — `fx/lathe.js` + `fx/lathe.css`
A subject object built in code, for briefs whose product is a turned object: ceramics, glassware, candles, cosmetics
bottles and jars, drinks, lamps. A WebGL2 ray-marched surface of revolution, rendered on demand (no loop unless auto-turn),
DPR ≤ 1.5, canvas `aria-hidden`, IO/hidden-tab pause, `<img>` fallback when WebGL2 is missing. Own code, license-clean.

```html
<figure class="sd-lathe" data-fx="lathe" data-preset="vase" data-material="glazed-ceramic"
        data-colors="--img-glaze-ash,--img-glaze-pool" data-base="--img-clay" data-seed="14" data-drag="true" data-label="Turn the vase">
  <img class="sd-lathe__fallback" src="img/vase-000.webp" alt="Ash-glazed vase, front view" width="1000" height="1300" fetchpriority="high">
</figure>
```
| param | type | default | ACF |
|---|---|---|---|
| data-preset | vase \| bowl \| mug \| cup \| bottle \| jar \| glass \| candle | vase | Select |
| data-profile | radii foot→rim, height = 1 (e.g. `0.12,0.2,0.3,0.22,0.1`); overrides preset | "" | Text / Repeater |
| data-handle | mug handle | preset | True/False |
| data-material | glazed-ceramic \| matte-clay \| glass \| metal \| plastic | glazed-ceramic | Select |
| data-colors | body, pool/secondary: `--token`, `--img-*` token or CSS colour | --c-accent | Text |
| data-base / data-liner / data-light | foot or contents / inside / key light colour | --c-surface-2 / body / oklch(97% .01 80) | Text |
| data-dip | glaze dip line (ceramic) or fill level (glass contents); −1 = none | .16 ceramic, −1 others | Number |
| data-tide / data-body / data-seed | pooling 0–1 / coat thickness / surface variation | 0 / .3 / 1 | Number |
| data-elev / data-angle / data-zoom / data-focus | camera elevation deg / start turn / macro zoom / "x,y" macro centre | preset / 0 / 1 / auto | Number / Text |
| data-shadow | contact shadow 0–1 | .55 | Number |
| data-drag / data-label | drag + arrow keys (Shift = 45°, Home = 0), role=slider / its name | false / "Turn the object" | True/False / Text |
| data-auto | auto-turn deg/s (paused offscreen; off with reduced motion) | 0 | Number |
| data-intro | one settle turn on first view (deg) | 0 | Number |
| data-scroll / data-stage / data-length / data-degrees | scroll-turn through a pinned stage (ScrollTrigger pin + scrub; without it SD.onScroll, no pin) | false / "section" / 3 / 180 | True/False / Text / Number |
| data-capture | keep drawing buffer (stills) | false | — |

Colours used only inside the render are `--img-*` tokens (antipatterns #65 exception). `data-material="metal"` bands in headless SwiftShader (QA screenshots) but is smooth on GPUs. `render-stills.mjs --bg` composites onto a colour; the default keeps transparency. Stills for the fallback `<img>`,
thumbnails and OG images: `node scripts/render-stills.mjs --runtime runtime --tokens assets/tokens.css --out img --name vase
--attrs '<same data-* as the element>' --angles 0,90,180 --size 1000x1300`. Reduced motion: one frame, no intro/auto/scroll
turn, no pin; drag stays (user-driven). The drag direction is not mirrored in RTL (a physical object turns the same way).
Page glue for chapter captions: listen to `sd:lathe:turn` (`detail.progress` 0–1).

#### device — `fx/device.js` + `fx/device.css`
Box-shaped products built in code: power stations, speakers, routers, appliances, consoles, packaging, cases. CSS 3D (no
WebGL), crisp at any DPR; or `data-view="elevation"`: a technical front + side elevation with dimension lines (the
"engineering drawing" hero/spec device). Own code.

```html
<figure class="sd-device" data-fx="device" data-size="340,250,290" data-details="screen,sockets,ports,grille,power,handle"
        data-body="--img-shell" data-detail="--img-orange" data-view="three-quarter" data-drag="true" data-label="Turn the power station">
  <figcaption>VOLTA 2000 · 34 × 25 × 29 cm</figcaption>
</figure>
```
| param | type | default | ACF |
|---|---|---|---|
| data-size | "width,height,depth" (any unit, proportions) | 300,200,200 | Text / 3 Numbers |
| data-view | three-quarter \| iso \| perspective \| front \| side \| top \| elevation | three-quarter | Select |
| data-rx / data-ry | explicit tilt / turn (deg) | view | Number |
| data-details | screen, sockets, ports, grille, power, handle, feet, knob, led (generated front) | screen,ports,grille,power | Checkbox |
| data-body / data-panel / data-detail | shell / screen / line colours (`--token`, `--img-*`, CSS colour) | --c-surface-2 / --c-ink / --c-accent | Text |
| data-radius | corner radius share of the side | .06 | Number |
| data-dims / data-unit | elevation labels "34 cm,25 cm,29 cm" / unit when labels are derived | from size / mm | Text |
| data-drag / data-label | drag + arrow keys (↑↓ tilt, Shift = 45°, Home = reset), role=slider / its name | false / "Turn the product" | True/False / Text |
| data-auto | auto-turn deg/s (paused offscreen; off with reduced motion) | 0 | Number |
| data-scroll / data-degrees | turn while crossing the viewport (ScrollTrigger scrub, else SD.onScroll) | false / 90 | True/False / Number |
| data-part | initially highlighted part | "" | Text |

Own artwork per face: children `[data-face="front|back|left|right|top|bottom|side"]` (`<svg>` or `<img>`) replace the
generated panels (`side` fills both sides). Parts: every generated detail carries `data-part`; `el.sdDevice.highlight('ports')`
lights one and recedes the others by colour (page glue: an IntersectionObserver on the text blocks, see `demo/device.html`).
The object is physical: 3D axes never mirror in RTL and generated SVG uses `direction="ltr"`. The stage is `aria-hidden`;
describe the product in `<figcaption>`/text. Reduced motion: static at the view angle, drag still works.

#### tone-shift — `fx/tone-shift.js` + `fx/tone-shift.css`
Colour chapters (seen on world-agency work: a museum exhibition microsite, a fintech brokerage and a space-tourism brand;
catalog C-71). Each direct child of the host declares a tone; the canvas behind them crossfades as each section top crosses
`data-line`. Implementation: a `clip-path: inset(0)` stage of `position: fixed` layers (one per tone) whose **opacity** is
scrubbed from `SD.onScroll`, so nothing tweens `background-color`. Without JS / reduced motion every section paints its own
tone (hard edges, still complete).
```html
<main data-fx="tone-shift" data-line="0.55" data-blend="0.3" data-root="true">
  <section data-tone="accent">…</section> <section data-tone="ink">…</section> <section data-tone="clay">…</section>
</main>
<!-- site.css, custom tone (tokens only): [data-tone="clay"] { --tone-bg: var(--c-surface-2); --tone-ink: var(--c-ink); } -->
```
| param | type | default | ACF |
|---|---|---|---|
| data-line | viewport line 0–1 a section top crosses to take over | 0.55 | Number |
| data-blend | crossfade length, share of viewport height | 0.3 | Number |
| data-root | mirror the active tone on `<html data-tone-active>` (style the fixed header: `html[data-tone-active="ink"] .sd-nav {…}`) | false | True/False |
| data-tone (section) | canvas \| surface \| ink \| accent \| media \| project tone | canvas | Select |

Built-in tones map to contract tokens (`ink` = `--c-ink` bg + `--c-canvas` text, `media` = `--c-media-bg` + `--c-on-media`).
Each section keeps its own ink, so check contrast per tone pair (≥4.5:1 body), not per blend frame; keep `data-blend` ≤ 0.4.
`.muted` inside a tone mixes from the tone's ink. Forced colours: stage hidden, system colours. ACF: one "Tone" select per
layout + the host as the page wrapper (template), not a block.

#### travel — `fx/travel.js` + `fx/travel.css`
The product as recurring protagonist (patterns.md §"recurring protagonist"; seen on a card-issuing fintech, an AI product,
a drinks DTC and a mobility brand; catalog C-70). Each `[data-travel-slot]` is a fixed-size box holding that section's **static view**
(img/svg/picture); with JS one aria-hidden traveller clones every view and flies slot → slot as the page scrolls: docked
for `data-hold` at both ends of a leg, then a screen-space flight with scale, rotation, optional arc/spin and a view
crossfade. Position comes from `SD.onScroll` + cached rects (ResizeObserver), so there are no pins and the page height is
unchanged.
```html
<main data-fx="travel" data-line="0.5" data-hold="0.2" data-spin="8" data-min="860">
  <section>… <div class="slot" data-travel-slot data-rotate="-10"><img src="card-front.webp" alt="Business card" width="856" height="540"></div></section>
  <section>… <div class="slot" data-travel-slot data-rotate="14"><img src="card-angle.webp" alt="" width="856" height="540"></div></section>
</main>
```
| param | type | default | ACF |
|---|---|---|---|
| data-line | viewport line 0–1 where a slot centre docks the object | 0.5 | Number |
| data-hold | docked share at each end of a leg (0–0.4) | 0.18 | Number |
| data-ease | smooth \| linear | smooth | Select |
| data-arc | sideways lift at mid-flight, px (× SD.dir) | 0 | Number |
| data-spin | extra rotation at mid-flight, deg (× SD.dir) | 0 | Number |
| data-swap | fade (whole flight) \| mid (quick swap) | fade | Select |
| data-min | min viewport width for the flight (below: static slots) | 0 | Number |
| data-rotate (slot) | docked rotation, deg (× SD.dir) | 0 | Number |

Authoring: put each slot in the column **opposite the copy** (or below it) so the flight corridor never crosses text; when
copy and slot stack on mobile set `data-min="860"` (the demo does). Same aspect ratio in every slot (the traveller scales
uniformly, views are `object-fit: contain`). Slot contents stay in the accessibility tree (opacity 0, alt kept); the
traveller is `aria-hidden` and has `alt=""` clones. Reduced motion / no JS / forced colours: static slot views. ACF: slot
image per layout + rotate number; the host is the page template wrapper.

#### scatter — `fx/scatter.js` + `fx/scatter.css`
Editorial scatter field (seen on ~7 fashion, photography, gym, architecture and museum sites by top independent
studios; catalog G-12). Images at authored % positions around a real-text
anchor; each item drifts by its `data-depth` while the section crosses the viewport; `data-assemble` flies items in from
outside the clipped stage along the centre→item vector (transform only, no opacity, so captions keep full contrast).
Below `data-min` (and without JS) the items fall back to a 2-3 column staggered grid under the anchor.
```html
<section data-fx="scatter" data-assemble="true" data-height="125" data-pointer="14">
  <div data-scatter-anchor><h2>Twelve rooms, one archive</h2></div>
  <figure data-scatter-item data-x="3" data-y="5" data-w="17" data-depth="0.9"><img …><figcaption>Wool coat</figcaption></figure> …
</section>
```
| param | type | default | ACF |
|---|---|---|---|
| data-height | stage height, svh | 110 | Number |
| data-range | parallax travel at depth 1, px | 140 | Number |
| data-assemble | fly-in assembly while the section enters | false | True/False |
| data-spread | fly-in start distance × item offset from centre | 0.8 | Number |
| data-pointer | pointer parallax at depth 1, px (fine pointers; 0 = off) | 0 | Number |
| data-min | min viewport width for the scattered layout | 720 | Number |
| data-x / data-y / data-w (item) | % position from inline-start/top, % width | 0 / 0 / 20 | Number ×3 (ACF repeater) |
| data-depth (item) | 0 far/behind … 1 near/in front (≥ .6 above the anchor) | 0.5 | Number |

Authoring: keep depth ≥ .6 items clear of the anchor box (they sit above it); 5-9 items; one size ratio ≤ 2:1 between the
largest and smallest item reads as editorial, more reads as clutter. RTL: x is inline-start based, so the layout mirrors.

## 5. WooCommerce / ACF integration (summary)

- **One section = one ACF Flexible Content layout.** Every `data-*` param is one sub-field of the type in the ACF column;
  print it with `esc_attr()`. Repeaters map to list items (`li`, `[data-stack-card]`, `[data-hscroll-panel]`, testimonial items, FAQ items).
- **Block preview re-init** (ACF blocks / Flexible Content preview): see §2 (`acf.addAction('render_block_preview', …)`).
- **Cart** (`fx/cart.js`): Woo is the source of truth. Either keep classic AJAX buttons and call `SD.cart.syncFromStore()`
  on `added_to_cart`, or set `window.SD_CART_ADAPTER` (Store API adapter above). Never enable `data-persist` on Woo.
- **PDP** (`fx/pdp.js`): forward Woo `found_variation` → `sd:pdp:variant`; out-of-stock variations as `disabled` radios.
- **Product grid** (`fx/flip-grid.js`): `data-tags` from `product_cat` / attribute slugs; server-side filtering through `el.sdFlipSwap(fn)`.
- **Quick view** (`fx/quickview.js`): triggers rendered in `woocommerce_after_shop_loop_item`; variable products fetch
  `/wp-json/wc/store/v1/products/{id}` on `sd:qv:open`, or link to the PDP.
- **FAQ** (`fx/accordion.js`): print FAQPage JSON-LD server-side (PHP above); `data-jsonld` is the no-PHP fallback.
- **Nav** (`fx/nav.js`): `wp_nav_menu` into `.sd-nav__links`; items with CSS class `mega` → `.sd-mega` via a custom walker or ACF options page.
- **Prices**: every price formatter uses `Intl.NumberFormat(data-locale || <html lang>, {currency: data-currency})` — set `he-IL` / `ILS` from `get_woocommerce_currency()`.
- **Media**: scrub-video needs a Range-capable server (WP media is fine); self-host `cobe` and Paper Shaders for production (`data-src`, `SD.paperBase`).

## 6. Minimal page template

`index.html` (Hebrew-first; the direction's tokens live in `assets/tokens.css`, never inline):
```html
<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page title</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300..700&family=Frank+Ruhl+Libre:wght@300..700&family=Heebo:wght@400..700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="runtime/core.css">
  <link rel="stylesheet" href="assets/tokens.css">
  <link rel="stylesheet" href="runtime/fx/clip-reveal.css">
  <link rel="stylesheet" href="runtime/fx/marquee.css">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <a class="skip-link" href="#main">דלג לתוכן</a>
  <main id="main">
    <section class="section container">
      <h1 data-fx="split-reveal" class="hero-title">כותרת שנחשפת שורה אחר שורה</h1>
      <figure data-fx="clip-reveal" data-direction="inline-start" class="hero-media">
        <img src="img/hero.webp" alt="תיאור התמונה" width="1600" height="900" fetchpriority="high">
      </figure>
    </section>
    <div data-fx="marquee" data-speed="50" aria-label="לקוחות">
      <ul role="list"><li>לקוח אחד</li><li>לקוח שני</li><li>לקוח שלישי</li></ul>
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
  <script src="runtime/core.js"></script>
  <script src="runtime/fx/split-reveal.js"></script>
  <script src="runtime/fx/clip-reveal.js"></script>
  <script src="runtime/fx/marquee.js"></script>
  <script src="assets/site.js"></script>
</body>
</html>
```
`assets/tokens.css` = the direction's `tokens.css` block (+ palette drop), e.g. `:root { --c-canvas: oklch(96.5% 0.012 80); … --f-display: "Newsreader", "Frank Ruhl Libre", serif; }`.

## 7. Testing

Demos: serve `runtime/` over HTTP (`python3 -m http.server`) — module scripts, CDN and Paper's `import()` need http(s).
`demo/_demo.js` (demo-only, one helper for all demos) swaps copy to Hebrew with `?rtl=1` via `data-he`, `data-he-html`,
`data-he-aria`, `data-he-ph`, `data-he-attr-<name>` and `data-he-<name>` (see its header).
Checks used: LTR/RTL × 1440×900 / 390×844, mid-scroll frames, console clean, `destroyAll → initAll ×2 → destroyAll` idempotent
and restoring the pristine DOM, reduced-motion pass.

### Test notes (Playwright, Chromium 141 / SwiftShader)
All 12 demos were screenshotted in LTR and `?rtl=1`, at 1440×900 and 390×844, plus the reduced-motion variant and the interaction states: hover, drag, open dialog/drawer/menu, mid-animation, after close, and keyboard. There were no console errors.

The lifecycle test ran `initAll` ×2, then `destroyAll`, then `initAll`, then `destroyAll` on every demo. Every module is idempotent and DOM-clean.

Playwright's Chromium has no H.264, so the scrub demo ships a webm source first. `python -m http.server` doesn't answer Range requests, so test video scrubbing with a Range-capable server such as `npx http-server`.

Automated project QA (screenshots LTR/RTL at 4 widths + lint checks): `scripts/verify.mjs` (see `scripts/README.md`).

## 8. Bidi, Hebrew and `?rtl=1`

- `?rtl=1` is a **mirroring test** (layout, motion direction, logical properties). A real Hebrew site ships Hebrew copy with
  `<html lang="he" dir="rtl">`; English copy under `?rtl=1` will show punctuation at the "wrong" end, which is expected.
- Mixed-direction blocks (a Hebrew paragraph quoting an English product name, user-generated reviews, CMS text of unknown
  language): `unicode-bidi: plaintext` on the block (or `dir="auto"` on the element) so each paragraph takes its own direction.
- Numbers, prices, SKUs, dimensions, emails, phones and URLs inside Hebrew: isolate **only the Latin/numeral run** with
  `<bdi>` or `<span dir="ltr">` (`ת״י <bdi>5568</bdi>`, `<span dir="ltr">03-000-0000</span>`, `SKU-<bdi>0045</bdi>`,
  `<bdi>30×40</bdi> ס״מ`), never the whole Hebrew+number phrase: `<span dir="ltr">ת״י 5568</span>` renders "5568 ת״י".
  Keep `font-variant-numeric: tabular-nums` on prices.
- SVG in RTL: `text-anchor="start|end"` and default text direction follow the inherited `direction`, so labels in charts,
  diagrams, maps and logos shift or flip under `dir="rtl"`. On drawing SVGs put `direction="ltr"` (or `style="direction:ltr"`)
  on the `<svg>` and set `text-anchor` explicitly; mirror a drawing only deliberately (`transform: scaleX(-1)` on a wrapper
  for arrows/flows that should follow reading direction, never on text).
- Punctuation: in RTL the trailing period/question mark belongs at the inline-end of the Hebrew sentence; never type it at
  the visual left by hand. Brackets mirror automatically (`(` renders as `)`), don't swap them.
- SplitText: `split-reveal` never char-splits Hebrew. Line divs (`.sd-split-line`) inherit `direction` from the split
  element, so set the direction on that element (`dir="rtl"`, or `dir="auto"` when the language is unknown), never
  `unicode-bidi: plaintext` on individual line divs: each line would become its own bidi paragraph and a Hebrew line that
  starts with an English word would flip to LTR. Mixed-script headings: split by `words`, not `chars`.
- Bilingual previews in a project: copy `demo/_demo.js` to `assets/i18n-preview.js` (load it before `runtime/core.js`) and add
  `data-he="…"` / `data-he-html` / `data-he-<attr>` to the English source; `?rtl=1` then swaps to real Hebrew copy. Preview
  only: the production Hebrew site renders Hebrew server-side (WPML/Polylang), not by attribute swapping.

## 9. Project-specific (custom) modules

- File: `assets/fx-<name>.js` (+ `assets/fx-<name>.css` after the runtime fx css), loaded after `runtime/fx/*.js` and before
  `assets/site.js`. Same shape as runtime modules: header comment with every `data-*` param (name | type | default | ACF field).
- Register only: `SD.register('<name>', { init: function (el) {…}, destroy: function (el) {…} })`. Never call `SD.initAll()` or
  `init()` yourself before boot: core initialises every `[data-fx~="<name>"]` on DOMContentLoaded, and `register` after boot
  initialises immediately. Use `SD.dir`, `SD.reduced`, `SD.onVisible`, `SD.onScroll`, `gsap.context` + `ctx.revert()` in destroy.
- `assets/site.js` is for page glue only (menus of the static build, form demo handlers); anything reusable across pages or
  portable to an ACF layout becomes a module.

## 10. Fonts: Google Fonts, Fontshare, self-hosting

- Google Fonts `<link>` is fine for previews and production.
- Fontshare (`api.fontshare.com`) CSS/files fail intermittently with CORS in headless browsers, which makes `verify.mjs` report
  console errors. For production and for QA runs, self-host: download the family (woff2) into `fonts/`, declare `@font-face`
  at the top of `assets/tokens.css` (`src: url("../fonts/<file>.woff2") format("woff2"); font-display: swap;`) and drop the
  Fontshare `<link>`. Fontshare fonts are free for commercial use under the ITF Free Font License (FFL), but check each
  family's license page before shipping. Same for any other third-party host: self-hosted woff2 + `preload` for the one
  display face used above the fold.
- `verify.mjs` classifies failures from third-party font hosts as WARN (network/CORS), not FAIL.


## 11. Accessibility contract of the runtime

- **Static accessible names.** Modules that rewrite text keep the real text available to assistive tech and never flash
  intermediate values:
  - `split-reveal`: headings / `li` / `blockquote` / links get SplitText `aria: "auto"` (aria-label + aria-hidden parts). On
    `p`, `span`, `div` (where `aria-label` is prohibited, axe `aria-prohibited-attr`) the parts are aria-hidden and the text
    sits in an `.sr-only` span, re-created on every re-split and removed on revert.
  - `text-fx` rotate: all words in `.sr-only`, the visual stack aria-hidden. Scramble: real text in `.sr-only`, an aria-hidden
    copy is scrambled. Roll: the duplicate label is aria-hidden.
  - `counter`: the final value is in the DOM from the start; while counting, an `.sr-only` final value + aria-hidden counting copy.
  - `footer-reveal` wordmark: decorative (`aria-hidden="true"` in markup), split with `aria: "hidden"`.
- **Contrast at every frame.** Scroll-lit text uses `split-reveal` `data-variant="colour"` (colour floor ≥ 3:1 at ≥24px,
  ≥ 4.5:1 below), never opacity. Check backgrounds' brightest frame (catalog/backgrounds.md rule 3).
- **Focus.** `core.css` sets `scroll-padding-block-start: calc(var(--header-h) + 16px)` (WCAG 2.4.11); `nav` reveals the
  hidden header on focus-within and while menus are open; dialogs (cart, quickview, sphere, testimonials, menu) trap and
  return focus natively (`<dialog>`).
- **User preferences.** `prefers-reduced-motion` → final states (every module); `prefers-contrast: more` → muted = ink-2,
  solid rules, bordered controls; `forced-colors: active` → system colours, visible borders/focus, decorative layers hidden.
- **Text spacing / reflow.** No module sets fixed heights on text; labels may wrap only where marked
  `data-qa-allow-wrap`; everything reflows at 320 px (verify.mjs checks 320).
