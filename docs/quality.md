# Quality: verify, checklist, anti-patterns

Quality runs in three layers:

1. an automated QA script, `scripts/verify.mjs`,
2. a human/jury checklist, `checklist.md`, that Claude answers while looking at the screenshots,
3. a versioned ban list, `antipatterns.md`, that Claude reads before designing.

The rule is **look, don't assume.** The report is a floor, not the review.

## verify.mjs

Install once, in the folder you run from or any parent:

```bash
npm i playwright
npx playwright install chromium
```

Run it:

```bash
node studio-design/scripts/verify.mjs ./site                        # every root *.html (not _*.html)
node studio-design/scripts/verify.mjs ./site --quick                # 390 + 1440 only, no full pages, no pin frames: ~20 s/page
node studio-design/scripts/verify.mjs ./site --concurrency 3        # full run, 3 pages in parallel (~100 s/page with WebGL)
node studio-design/scripts/verify.mjs ./site --pages concepts/a.html,concepts/b.html,concepts/c.html --quick --frames
node studio-design/scripts/verify.mjs https://staging.example.com/ --pages /,/shop/,/cart/
```

Options:

- `--widths 320,390,768,1280,1440` (the default; 320 is the reflow check),
- `--quick`, `--frames`, `--no-pins`, `--no-rtl`, `--no-full`, `--no-axe`,
- `--concurrency N`, `--settle 1200`, `--timeout 45000`,
- `--lint-runtime`, `--out qa/`.

A folder is served by a built-in static server with HTTP Range support, which scroll-scrubbed video needs. WebGL renders headless through SwiftShader. axe-core is injected from jsDelivr at run time and skipped with a note when offline.

**Output** (`qa/`):

- `report.md`, `report.json`,
- per page, `<ltr|rtl>-<width>-top.jpg` and `-full.jpg`,
- reduced-motion shots,
- 5 scroll frames through every pinned or sticky section (`ltr-1440-pin<k>-<i>.jpg`).

The exit code is 1 if any check fails.

### The 27 checks

| Check | Status |
|---|---|
| Console / page errors, failed same-origin requests | fail |
| Third-party font host failures (CORS / network) | warn (self-host) |
| Horizontal overflow at every width × direction, incl. 320px; names the `::before/::after` culprit | fail |
| Missing same-origin script/stylesheet/font/image, or `core.js` referenced but `window.SD` absent | fail |
| Content clipped by `overflow-x: clip` | warn |
| Button / nav / CTA label wraps to 2+ lines | fail |
| Rendered H1 count; hero H1 inside the 1280×800 first viewport; H1 line count at 1280 and 390 | fail / warn |
| Lazy image in the first viewport; lazy LCP element | warn / fail |
| Rendered font families vs the families declared in `--f-*` tokens; default-banned fonts | warn |
| `fonts-rendered`: the face Chromium actually used per script (Hebrew falling back to a system face) | fail |
| Text dimmed by opacity at rest | warn |
| Visible placeholders `[TODO: …]`, `[להשלמה: …]`, `.todo` (counted) | warn |
| Pin frames through every ScrollTrigger pin / tall sticky wrapper | info |
| `transition: all` | fail |
| Pure `#000` / `#fff` canvas, ink or large background | warn |
| Gradient text (`background-clip: text`) | fail |
| `z-index` > 1000 | warn |
| `<img>` without width + height | warn |
| Autoplay `<video>` without `muted` + `playsinline` | fail |
| Physical CSS properties in project CSS | warn |
| Banned copy (lorem, placeholder names, "Elevate", "Seamless", "Unleash", "Where X meets Y", scroll cues …) | fail |
| Em-dashes (in headings/buttons/nav: fail; > 3 in text: warn), `...` | fail / warn |
| Eyebrows over budget or consecutive; kickers above ≥ 75% of H3s | warn |
| More than 2 accent hue clusters | warn |
| Sections with an identical structural signature (same archetype twice) | warn |
| axe-core WCAG 2 A/AA (contrast with ratios; decorative `aria-hidden` text excluded) | fail / warn |
| Reduced-motion load: console errors | fail |

**Reading full-page shots.** Full-page shots are stitched at one scroll position. A fixed header or sticky bar can appear once, mid-page; each pin leaves an empty band as long as its scroll length; and reveals below the fold appear in their final state. None of that is a bug. Judge headers, sticky bars and pinned scenes from the `-top.jpg` shots and the pin frames.

The heuristics (eyebrows, accent clustering, repetition, font detection) are read with judgement. A direction may legitimately exceed a threshold (for example a sticker colour set or a declared outlier face); note it in the plan and ignore the warning.

## The checklist (`checklist.md`)

| Part | What it checks |
|---|---|
| **A. Plan gate** | The brief line is written; the direction was chosen by the algorithm and differs from the last 3; every page has catalog ids, one signature moment and a motion table with reasons; section rules hold; the self-similarity test is done; the core page list (incl. states) is complete |
| **B. Jury critique** (score 1–5; any score < 3 gets revised) | **Specificity** (could this belong to another client?), **Hierarchy** (one obvious first read at 1280×800), **Type** (≥ 3× size jump, weight contrast ≥ 300, Hebrew in the Hebrew face), **Restraint** ("remove one accessory"), **Variety** (does the layout change shape section to section?), **Motion** (one entrance, one signature moment), **Execution**, **Commerce** (price, variant, stock and ATC visible without scrolling on PDP) |
| **C. Slop sweep** | Binary checks: no badge pill, 3 equal icon cards, gradient text, glass panels, AI nav/footer, invented stats, banned copy, emoji icons, fake chrome, scroll cues |
| **D. Technical** | verify.mjs has 0 FAIL; no overflow; no console errors; axe clean; LCP not lazy; logical properties; links and forms work; every colour/font/size is a token; Hebrew setup |
| **D2. Accessibility** (WCAG 2.2 AA / SI 5568) | Focus not obscured (2.4.11); no opacity-dimmed text; `prefers-contrast` / `forced-colors`; text spacing (1.4.12); reflow at 320px (1.4.10); form error summary; animated text keeps a static accessible name |
| **E. Delivery** | `_gallery.html`; `#todo-<page>` links listed; slim cookie bar; `data-persist` on static store previews; `DESIGN.md` matches the build; placeholder list; log updated; ACF map for WordPress |

## Anti-patterns (`antipatterns.md`)

The ban list is versioned, and **bans are defaults, not absolutes**: the brief's explicit words win.

**Current attractors (A1–A25)** are looks that AI output, and increasingly award sites themselves, converge on. They're never chosen as the default answer to a free axis. They're re-checked as new scans arrive, because yesterday's anti-slop look becomes today's slop. They cover:

- the warm cream + serif + terracotta kit,
- near-black + acid lime,
- broadsheet cosplay,
- the SaaS card kit,
- mono-caps eyebrows everywhere,
- the dark "AI product" aurora hero,
- the centred single sentence on an empty sheet,
- the rounded inset media sheet,
- the giant full-width wordmark,
- the Israeli local template and the floating object stack,
- the immersive WebGL gate,
- the scroll-lit grey sentence,
- the pastel UI-collage SaaS hero,
- the stacked studio-site kit,
- device-mockup case heroes,
- and more.

Each attractor comes with measured shares from the scans.

**67 numbered bans** in six groups:

| Group | # | Examples |
|---|---|---|
| Colour | 1–11 | no purple→blue gradients, no gradient text, no pure #000/#fff, one accent ≤ 5% of a viewport, no glassmorphism on scrolling content |
| Typography | 12–24 | no banned default fonts, ≤ 2 families + 1 outlier, weight contrast ≥ 300, eyebrow budget, no em-dash separators, Hebrew line-height/tracking rules |
| Layout & structure | 25–36 | no template spine, no 100vh centred badge hero, no three equal cards, zig-zag ≤ 2, no AI nav/footer, varied section padding, hero fits 1280×800 |
| Content & copy | 37–44 | no invented metrics, no placeholder people/brands, banned words, no fake clocks/coordinates, real logos only, CTA ≤ 3 words |
| Imagery | 45–51 | no div-built fake dashboards or browser chrome, no emoji icons, no generic 3D blobs "for depth", stock clichés banned |
| Motion | 52–61 | no fade-up on every section, no `transition: all`, no uniform hover scale, no perpetual loops, every animation has a reason, preloaders only with real progress |
| Technical | 62–67 | no `100vh`/`100vw`, no lazy LCP, no `z-index: 9999`, no hex/font literals outside tokens, logical properties only, canvas DPR cap 1.5 |

**Banned as default fonts** (display or body, unless the brief names them): Inter, Inter Tight, Roboto, Open Sans, Lato, Poppins, Montserrat, Raleway, Nunito, Work Sans, DM Sans, Source Sans 3, Plus Jakarta Sans, Manrope, Outfit, Space Grotesk, Fraunces, Instrument Serif, Playfair Display (as a reflex), Merriweather, Lora, Source Serif, Courier New, Consolas, Bebas Neue (as a reflex condensed), and system/Georgia/Times as the chosen face. Heebo, Assistant and Rubik remain allowed as Hebrew fallbacks.
