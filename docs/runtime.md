# Runtime

`studio-design/runtime/` is a small, copy-into-project vanilla runtime: `core.css` + `core.js` + one file per effect in `fx/` (31 modules). It has no bundler and no framework. Every effect is a self-initialising block driven by `data-fx="name"`, and its `data-*` params map 1:1 to ACF fields.

The full reference, with every param of every module (name | type | default | ACF field type), is in [`studio-design/runtime/README.md`](../studio-design/runtime/README.md). The header comment of each `fx/<name>.js` is the source of truth.

## Use it without the skill

The runtime is independent of Claude. To use it in any static site or WordPress theme:

```html
<link rel="stylesheet" href="runtime/core.css">
<link rel="stylesheet" href="assets/tokens.css">          <!-- your token contract (or a direction's tokens.css) -->
<link rel="stylesheet" href="runtime/fx/marquee.css">     <!-- only the fx css you use -->
<link rel="stylesheet" href="assets/site.css">

<h1 data-fx="split-reveal">A heading that reveals line by line</h1>
<div data-fx="marquee" data-speed="50" aria-label="Clients">
  <ul role="list"><li>One</li><li>Two</li><li>Three</li></ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
<script src="runtime/core.js"></script>
<script src="runtime/fx/split-reveal.js"></script>
<script src="runtime/fx/marquee.js"></script>
```

- **CSS order** (fixed): `core.css` → `tokens.css` → `fx/*.css` → project CSS.
- **JS order**: GSAP + plugins → Lenis → `core.js` → `fx/*.js` → your custom modules → page glue.
- `core.js` registers loaded GSAP plugins, wires Lenis to ScrollTrigger on one ticker, and runs `SD.initAll()` on DOMContentLoaded. Scripts may be `defer`red in the same order.
- Lenis is optional; opt out with `<html data-smooth="off">`.
- Modules degrade when a dependency is missing: with no GSAP the content is static, with no SplitText it fades whole, with no ScrambleText it fades.
- Modules consume **only** the token contract (`--c-*`, `--f-*`, `--fs-*`, `--sp-*`, `--r-*`, `--ease-*`, `--d-*`; see [`CONVENTIONS.md`](../studio-design/CONVENTIONS.md)). `core.css` ships neutral defaults, so every module renders before you write a single token.

Demos: serve the runtime over HTTP (`python3 -m http.server -d studio-design/runtime`) and open `demo/<name>.html`. Add `?rtl=1` to flip to Hebrew/RTL. There are 29 demo pages: `globe` is shown in the `map` demo, and `todo-links` needs no demo. For the scrub-video demo, use a Range-capable server such as `npx http-server`.

## Core API (`window.SD`)

| Call | Does |
|---|---|
| `SD.initAll(root?)` / `SD.destroyAll(root?)` | Init / tear down every `[data-fx]` in `root`. Idempotent; destroy restores the original DOM. |
| `SD.fx.<name>.init(el)` / `.destroy(el)` | Per element |
| `SD.register(name, {init, destroy})` | Register a module; after boot it initialises matching elements immediately |
| `SD.dir(el?)` | `1` LTR, `-1` RTL (nearest `[dir]`). Every horizontal motion is multiplied by it. |
| `SD.reduced()` / `SD.fine()` | `prefers-reduced-motion` / fine pointer |
| `SD.data(el, key, def)` | Typed `data-*` reader |
| `SD.onVisible(el, cb, opts)` | IntersectionObserver helper; returns a disconnect fn |
| `SD.onScroll(cb)` | Shared scroll subscription, at most once per frame; modules never add their own `window` scroll listeners |
| `SD.toRGB(color, el?)` / `SD.toRGBArray(…)` | Resolve any CSS colour or token (oklch, color-mix, `var(--c-ink)`) to rgba. Use it before tweening colours, because GSAP can't interpolate oklch/color-mix. |
| `SD.lenis` | The Lenis instance or `null` |
| `SD.hscroll(el)` | The live horizontal tween of an `hscroll` section (for `containerAnimation`) |

Several effects can share one element: `data-fx="shader-bg split-reveal"`.

## Modules (31)

**Text, media, background, scroll**

| Module | What it does |
|---|---|
| `split-reveal` | Heading line-mask / word / char reveal on scroll; a `colour` variant recedes by colour, not opacity. It never char-splits Hebrew. |
| `clip-reveal` | Clip-path image reveal with an inner de-zoom |
| `shader-bg` | WebGL background on Paper Shaders with 5 presets (mesh-gradient, grain-gradient, god-rays, dithering, fluted-glass); colours from tokens |
| `bg-kit` | Zero-cost CSS background utilities plus a pointer spotlight |
| `marquee` | Seamless loop with pause control, drag, velocity boost and RTL direction |
| `counter` | Count-up / odometer roll, `Intl.NumberFormat`-formatted, with a static accessible value |
| `text-fx` | Rotating words, scramble, roll-on-hover |
| `magnetic` | Magnetic buttons (fine pointers only) |
| `cursor` | Follower cursor / image trail (opt-in, off under reduced motion) |
| `hscroll` | Pinned horizontal scroll track |
| `stack-cards` | Sticky stacking cards (CSS alone; GSAP adds scale and shade) |
| `footer-reveal` | Curtain footer + fit-to-width wordmark |

**Layout, commerce, media, navigation**

| Module | What it does |
|---|---|
| `bento` | Bento grid with spotlight/glow and reveal |
| `testimonials` | 1–4 row capsule marquee with a dialog for the full quote |
| `sphere` | Draggable 3D image sphere |
| `scrub-video` | Pinned, scroll-scrubbed video or frame-sequence hero |
| `accordion` | Native `<details>` accordion + FAQ JSON-LD |
| `cart` | Side cart drawer (`<dialog>`), fly-to-cart arc, free-shipping meter, `Intl` prices, persistence for static previews |
| `pdp` | Product gallery + variant matrix (WooCommerce variations, out of stock) + sticky add-to-cart |
| `flip-grid` | Product grid filters (AND across groups, OR within) and density switch, animated with Flip |
| `before-after` | Comparison slider on a native range input |
| `nav` | Hide-on-scroll header, overlay menu, mega menu |
| `map` | Dotted SVG world map with drawn arcs |
| `globe` | WebGL dotted globe (cobe), loaded on demand |
| `quickview` | Product card image morphs into a dialog |
| `todo-links` | `#todo-<page>` links open a "not in this delivery" dialog (English/Hebrew) |

**Code-built objects and 2026 signature moves**

| Module | What it does |
|---|---|
| `lathe` | WebGL2 surface of revolution: vase, bowl, mug, bottle, jar, glass, candle or a custom profile, in 5 materials; drag, auto-turn or scroll-turn; still-image fallback |
| `device` | CSS 3D box product (several views) or a dimensioned front/side elevation; generated screen, ports, grille, handle; part highlighting |
| `tone-shift` | Scroll colour chapters: the page canvas crossfades between section tones (opacity of fixed layers, no colour tweening) |
| `travel` | One protagonist object flies between slots in different sections (position, scale, rotation, view crossfade) |
| `scatter` | Editorial scatter field: authored image positions around an anchor word, depth parallax, optional fly-in assembly |

Events are namespaced `sd:*`. Some examples:

- `sd:cart:add` / `sd:cart:change`,
- `sd:pdp:variant` / `sd:pdp:change {name, value, variation_id, in_stock}`,
- `sd:fgrid:change`,
- `sd:qv:open`,
- `sd:tone`,
- `sd:lathe:turn`.

## The `data-*` API

Each param is a `data-*` attribute on the module's root, and each one maps to one ACF sub-field. For example, `marquee`:

| param | type | default | ACF |
|---|---|---|---|
| `data-speed` | px/s | 60 | Number |
| `data-direction` | `auto` \| `reverse` (auto flips in RTL) | auto | Select |
| `data-gap` | CSS length | `var(--sp-6)` | Text |
| `data-pause-hover` | boolean | true | True/False |
| `data-controls` | pause/play button (WCAG 2.2.2) | true | True/False |
| `data-draggable` | drag + inertia | false | True/False |
| `data-velocity` | scroll-speed boost | false | True/False |

## Guarantees every module keeps

- It animates only transform, opacity, filter and clip-path.
- A `gsap.matchMedia()` reduced-motion branch shows the final static state.
- Horizontal motion is multiplied by `SD.dir()`, and only logical CSS properties are used.
- Loops, canvases and WebGL pause offscreen. Canvas DPR is capped at 1.5, and decorative layers are `aria-hidden`.
- Modules are idempotent (WeakMap guard). `destroy` removes listeners, observers, tweens and injected DOM, and the lifecycle test (`initAll` ×2 → `destroyAll` → `initAll` → `destroyAll`) leaves the DOM pristine.
- Animated text keeps a static accessible name (`.sr-only` copy or `aria-label`), so screen readers never hear intermediate values.
- Text containers never get fixed heights, and everything reflows at 320px.
- `prefers-contrast: more` and `forced-colors: active` are handled in `core.css`.

## Custom modules

Project-specific effects go in `assets/fx-<name>.js` with the same shape and are loaded after the runtime modules:

```js
SD.register('my-effect', {
  init: function (el) {
    var ctx = gsap.context(function () { /* … multiply x by SD.dir(el) … */ }, el);
    el._ctx = ctx;
  },
  destroy: function (el) { el._ctx && el._ctx.revert(); }
});
```

Document every `data-*` param in a header comment (name | type | default | ACF field). Never call `SD.initAll()` yourself before boot.

## Fonts

Google Fonts `<link>`s work for previews and production. Fontshare families should be self-hosted for production and QA: download the woff2 files into `fonts/` and declare `@font-face` at the top of `tokens.css`. Fontshare's CSS fails CORS intermittently in headless browsers, which shows up as console errors in `verify.mjs`.
