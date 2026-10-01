# Build conventions for the `studio-design` skill (for all contributors)

Skill root: this folder.

Goal of the skill: make Claude produce radically varied, award-level (Awwwards SOTD-grade) website designs and FULL page sets (e-commerce store / landing / informational-company site) as vanilla HTML + CSS + JS with GSAP 3.15 (all plugins free) and Lenis. No React, no build step. Output must later port into WordPress ACF Flexible Content sections (one section = one self-contained block). RTL (Hebrew) ready from day one.

## Folder layout
```
studio-design/
  SKILL.md                      core process (short), links to everything
  directions/<slug>.md          style directions (tokens + rules), 33
  directions/_index.md          table: slug | tagline | axes | fits | neighbours
  catalog/backgrounds.md        background treatments -> runtime module or CSS recipe
  catalog/sections-hero-nav.md  §0 composition rules, hero, nav
  catalog/sections-content.md   features, proof, pricing, faq, cta, gallery, team, stats
  catalog/sections-footer-wp.md footer + WordPress mapping
  catalog/ecommerce-plp-pdp.md  store rules, PLP, cards, filters, PDP, E-widgets
  catalog/ecommerce-cart-account.md  cart, checkout, account, states, badges, trust, schema
  catalog/widgets.md            widgets / micro-interactions
  catalog/motion.md             motion principles + GSAP pattern sheet
  pages/ecommerce.md            full page set + per-page anatomy
  pages/landing.md
  pages/company.md
  references/_index.md          scanned sites table
  references/cases/<id>.md      anonymized reference case studies (case-NN-<site type>)
  references/patterns.md        aggregated statistics/patterns from scans
  checklist.md                  anti-slop gates + QA checklist
  antipatterns.md               the ban list (versioned; "current attractors")
  runtime/                      COPY-INTO-PROJECT code
    core.css                    reset, tokens contract, utilities, RTL-safe base
    core.js                     Lenis+GSAP boot, reduced-motion, dir helper, data-fx registry (init/destroy)
    fx/<name>.js                one module per effect (+ optional <name>.css)
    demo/<name>.html            minimal demo page per module (used for render tests)
  scripts/
    verify.mjs                  Playwright QA: screenshots at widths, LTR+RTL, lint checks
    new-project.md              how to scaffold a project folder
```

## Token contract (CSS custom properties every direction defines; every module consumes ONLY these)
```
--c-canvas --c-surface --c-surface-2 --c-ink --c-ink-2 --c-muted --c-rule --c-accent --c-accent-ink --c-focus
--f-display --f-body --f-mono (optional) --f-outlier (optional)
--fs-xs --fs-sm --fs-base --fs-lg --fs-xl --fs-2xl --fs-3xl --fs-display  (clamp() values)
--lh-tight --lh-body  --tr-display --tr-label
--sp-1 .. --sp-10 (4pt-based scale) --section-y --gutter --maxw
--r-sm --r-md --r-lg --r-pill
--ease-out --ease-in --ease-in-out --d-fast --d-med --d-slow
--shadow-1 --shadow-2
optional (core.css defaults): --header-h (72px, sticky header height) --lenis-lerp (0.1) --f-num (= --f-mono: numerals/specs) --f-brand (= --f-display: wordmark)
media/status (core.css defaults): --c-on-media (text on photos/video) --c-media-bg (dark media stage) --c-media-scrim (gradient scrim under text on media) --c-success
imagery-only: --img-* (colours used only inside renders, illustrations, shaders, e.g. --img-glaze; never for text/UI)
```
Rules: every `--r-*` is ONE plain length (`0px`, `12px`, `999px`; never slash radii, never unitless 0); special shapes live in
direction-only extra tokens (`--shape-blob`, `--shape-arch`, `--shape-wobble-*`). `--r-pill` may be `0px`; modules that need a
true circle use `50%`. Every `--ease-*` is a `cubic-bezier()`; stepped house eases live in extra tokens (`--ease-step`).

## Runtime module API (fx/*.js)
- No bundler. Plain ES5/ES2017 script, attaches to `window.SD.fx.<name> = { init(el, opts), destroy(el) }`.
- Activated declaratively: `<section data-fx="marquee" data-speed="40" data-direction="auto">`. `core.js` scans `[data-fx]` (space-separated list allowed) and calls init; exposes `SD.initAll(root)` and `SD.destroyAll(root)` (for ACF preview re-init).
- Params are `data-*` attributes (map 1:1 to ACF fields). Document every param in a header comment: name, type, default, ACF field type.
- Dependencies: GSAP + plugins and Lenis from CDN (jsdelivr: `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js`, `.../ScrollTrigger.min.js`, `.../SplitText.min.js`, etc.; Lenis `https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js`). Modules must feature-detect and degrade if a plugin is missing.
- Must: `gsap.matchMedia()` reduced-motion branch (final static state), `SD.dir()` returns 1 or -1 for RTL and horizontal motion multiplies by it, logical CSS properties only, pause offscreen (IntersectionObserver) for loops/canvas/WebGL, DPR cap 1.5 for canvas/WebGL, `aria-hidden` on decorative canvas, cleanup in destroy (ctx.revert()).
- Only animate transform/opacity/filter/clip-path.
- Each module ships `runtime/demo/<name>.html` that loads core.css/core.js + the module with a neutral token set, and renders in LTR; a `?rtl=1` query flips `dir`.
- Write our own code, inspired by catalog sources; never paste third-party code verbatim (licenses: Aceternity/Skiper inspiration-only; React Bits commons-clause). Paper Shaders (Apache-2.0) may be loaded from CDN as a dependency (`@paper-design/shaders`), keep attribution comment.

## Writing style for .md files in the skill
- English (the model reads it; user-facing output will be in the user's language).
- Dense, concrete, value-anchored rules (numbers, tokens, hex/oklch, px). No vague adjectives without a threshold.
- Every catalog item: name | looks like | use when (site types, directions) | how (runtime module name or CSS recipe) | perf/a11y/RTL notes.
- Keep each file < ~600 lines; Claude loads files on demand.

## Research inputs
The catalogs, directions and reference case studies were distilled from the maintainers' own research notes and scan data (~880 scanned sites). The maintainers' raw scan data is not included in this repository; to add evidence, run your own scan with `scripts/scan.mjs` → `scripts/aggregate.py` (see `scripts/README.md`) and write the result up as an anonymized case study in `references/cases/`.
