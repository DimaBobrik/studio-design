# Motion system

Load when writing any JS/animation. Stack: GSAP 3.15 (ScrollTrigger, SplitText, Flip, Observer, Draggable, InertiaPlugin, DrawSVG, MorphSVG, MotionPath, ScrambleText, CustomEase, TextPlugin, all free) + Lenis 1.3. `runtime/core.js` boots both and exposes `SD.dir() SD.reduced() SD.fine() SD.onVisible() SD.onScroll() SD.lenis SD.initAll/destroyAll`.

**Quick index**: §1 principles (budget table, one signature moment) · §2 duration/ease tokens · §3 never animate · §4 reduced motion · §5 RTL · §6 Lenis · §7 cleanup & ACF preview · §8 GSAP pattern sheet · §9 page-load choreographies L1-L4 · §10 page transitions · §11 preloaders PL-A…PL-E.

## 1. Principles

1. **Motion budget per direction (0-10).** The direction file states it; the budget gates what is allowed:

| budget | allowed | typical directions |
|---|---|---|
| 0-2 | Colour/opacity hover 150 ms, focus, drawer/dialog transitions. No scroll reveals. Lenis off. | Utilitarian document, industrial catalogue, magazine duet |
| 3-4 | + one orchestrated page-load entrance, line reveals on H1/H2 only, image clip reveals, counters (once), Lenis on | Swiss grid, serif analytics, botanical, cold luxury |
| 5-6 | + one signature scroll moment (pin OR horizontal OR stack), one marquee, magnetic CTA, roll-text links, tier-1 or tier-2 bg in one place | Soft structuralism, darkroom product, forest heritage, campaign commerce |
| 7-8 | + page transitions, custom cursor, scrubbed type, animated shader hero, velocity marquee, sphere/dome, frame-sequence | Kinetic poster, sticker pop, cinematic bands, exhibit canvas, apparatus night |
| 9-10 | + WebGL scenes, image trail, Observer section snapping, preloader, experimental items (fluid, hover distortion) | Immersive/experimental portfolios only |

"Motion claimed = motion shown": a budget >= 5 page must visibly move in the first viewport; a budget <= 2 page must not.

2. **One signature scroll moment per page** (pin/scrub, horizontal track, stack, zoom-through, sphere, scrub-video). Everything else is a reveal primitive or feedback. Stores: signature only on Home, collection landing, lookbook, About.
3. **One-sentence justification per effect.** Each animation in the plan's motion spec states its job: hierarchy (guide the eye to X), storytelling (reveal Y in sequence), feedback (confirm Z), state change (show where A went). No job, no animation.
4. **No scatter.** Fade-up on every section and stagger on every list is banned (antipattern #52). Max 3 motion primitives per page + the signature moment. The page settles: nothing moves while the user reads body copy unless it is a paused-by-default loop they started.
5. **Motion spec table** ships with every design (in the plan and as a comment block in `assets/site.js`):
   `element | trigger | property | from -> to | duration | ease | reason | reduced-motion`.

## 2. Durations & easings (tokens)

| token | value | use |
|---|---|---|
| `--d-fast` | 120-160 ms | hover colour, icon swap, press |
| `--d-med` | 240-320 ms | dropdowns, drawers, tabs, accordions |
| `--d-slow` | 600-900 ms | reveals, hero entrance lines |
| cinematic | 1.0-1.4 s | page-load hero, preloader curtain, scene transitions (max) |
| exits | 75% of enter | anything leaving |
| stagger | 0.04-0.08 s per item; total stagger <= 0.5 s | lists, lines |

| ease token | curve | GSAP equivalent | use |
|---|---|---|---|
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | `expo.out` / `power4.out` | enters, reveals (default) |
| `--ease-in` | `cubic-bezier(.7,0,.84,0)` | `expo.in` | exits |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | `power3.inOut` / `expo.inOut` | Flip morphs, curtains, slideshows |
| soft (soft structuralism) | `cubic-bezier(.32,.72,0,1)` | `CustomEase.create("soft","M0,0 C.32,.72 0,1 1,1")` | blur-to-sharp entries 700 ms |
| elastic | `elastic.out(1,.3)` | — | magnetic return, cart badge bump ONLY; never on UI state |
| linear | `none` | — | marquees, scrubbed timelines |

Each direction picks one "house ease" for reveals and keeps it site-wide. Browser default `ease` is banned; `transition: all` is banned.

## 2b. Accessibility of motion
- Never dim text with opacity as a resting or scroll-lit state (inactive tabs, scroll-lit words, "upcoming" steps): recede by colour with a token mix that still passes 4.5:1 (3:1 only for text ≥24px). `split-reveal` `data-variant="colour"` computes such a floor; opacity fades are only for entrances that end at full opacity.
- Animated text keeps a static accessible name (`split-reveal`, `text-fx`, `counter` do this; see `runtime/README.md` §11). Never `aria-label` a `<p>`, `<span>` or `<div>` (prohibited): use an `.sr-only` copy + `aria-hidden` animated copy.
- Hide-on-scroll headers reveal on `:focus-within`; `scroll-padding-block-start` keeps focused targets out from under sticky bars (WCAG 2.4.11).

## 3. Never animate

- Layout properties: `width height top left margin padding` (exception: accordion height via `interpolate-size:allow-keywords` or GSAP `height:"auto"` on one element at a time).
- Body text paragraphs (no per-word reveals on copy > 25 words, except the one scroll-lit manifesto).
- Form fields while typing, prices while the user compares (roll once on change only), checkout anything beyond 150 ms state feedback.
- Focus rings (no animated focus), error messages (appear instantly), skeleton shimmer longer than 1.5 s loops.
- LCP element opacity starting at 0 for longer than 100 ms after fonts are ready (hurts LCP and looks broken without JS). Hero reveal uses `clip-path`/`yPercent` inside masks, with `.no-js`/pre-hydration state visible.
- Anything flashing > 3 times/s (WCAG 2.3.1). Glitch only on hover, 300 ms.
- Scroll hijack via `window` wheel listeners (use ScrollTrigger/Observer only); scroll cues (bouncing chevrons).

## 4. Reduced motion

`gsap.matchMedia()` with two branches in every module:
```js
const mm = gsap.matchMedia();
mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
  const { motion } = ctx.conditions;
  if (!motion) { gsap.set(targets, { clearProps: "all" }); return; } // final static state
  // animated branch...
});
```
Reduced branch = final state: no loops, no scrub, no pin (pins become normal flow), no parallax, no cursor/magnetic, shaders one frame, videos show poster, slideshows stop on slide 1 with manual arrows, marquee becomes a static wrapped row. Allowed: <= 150 ms opacity crossfades for state changes. Lenis disabled (native scroll).

## 5. RTL

- `const d = SD.dir(el)` (1 or -1). Multiply every horizontal `x`, `xPercent`, `rotateY` sign, drag bounds, marquee direction, horizontal-scroll distance, swipe direction, fly-to-cart start offsets (targets are measured, not assumed).
- Horizontal scroll: `x: () => -(track.scrollWidth - innerWidth) * d`.
- `scrollLeft` is negative in RTL (Chromium/Firefox/Safari today): use `Math.abs()` for progress.
- CSS: logical properties only (`inset-inline-start`, `margin-inline`, `padding-block`), `transform-origin` via `[dir="rtl"] .x { transform-origin: right }` where needed, `clip-path: inset()` sides swapped by a `--from-start` var.
- SplitText: `type:"lines"` or `"words,lines"` for Hebrew; `chars` only for Latin strings (breaks niqqud; never for Arabic). Put `lang="he"` on Hebrew containers.
- Bidi with SplitText: line divs inherit `direction` from the split element, so set `dir="rtl"` (or `dir="auto"` for text of unknown language) on it; never `unicode-bidi: plaintext` on individual line divs (each line becomes its own bidi paragraph). Numbers/SKUs/emails inside Hebrew: `<span dir="ltr">`. `?rtl=1` is a mirroring test; real Hebrew pages use Hebrew copy. Full rules: `runtime/README.md` §8.
- Vertical motion, scale and opacity do not flip. Icons: arrows/chevrons mirror, play/media controls and logos do not.

## 6. Lenis config & boot

```js
// core.js does this; shown for reference
const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, autoRaf: false });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
- lerp per direction: 0.08 cinematic/luxury (heavier), 0.1 default, 0.14 snappy/utilitarian. Never `syncTouch` true on mobile (fights native).
- Off: `<html data-smooth="off">` on checkout, account, long forms, dashboards, budget <= 2, and under reduced motion.
- Modals/drawers: `lenis.stop()` on open, `lenis.start()` on close; scrollable panels get `data-lenis-prevent`.
- Anchors: `SD.lenis.scrollTo(target, { offset: -headerHeight })`.
- Pick Lenis OR ScrollSmoother, never both. Use ScrollSmoother only when `data-speed/data-lag` parallax is central (then Lenis off).

## 7. Cleanup & ACF preview

- Every module wraps its work in `const ctx = gsap.context(() => {...}, el)` and stores it; `destroy(el)` calls `ctx.revert()`, disconnects observers, kills Draggable/Observer instances, cancels rAF, releases WebGL (`loseContext`).
- ACF block preview re-renders HTML: call `SD.destroyAll(block)` before and `SD.initAll(block)` after (`acf.addAction('render_block_preview', ($el) => SD.initAll($el[0]))`).
- After DOM swaps (filters, load more, AJAX cart), call `ScrollTrigger.refresh()` once, debounced 100 ms. After fonts load: `document.fonts.ready.then(() => ScrollTrigger.refresh())`.
- Pins start at `"top top"` (never `top center`, which shows half a slide); `invalidateOnRefresh:true` with function-based values; `anticipatePin:1` on fast pins.

## 8. GSAP pattern sheet

| pattern | snippet | notes |
|---|---|---|
| Batch reveal | `ScrollTrigger.batch(".card",{start:"top 85%", onEnter:b=>gsap.from(b,{autoAlpha:0,y:24,stagger:.06,duration:.7,ease:"expo.out",overwrite:true}), once:true})` | One trigger for many items; only on the one grid that needs it |
| Pin + scrub story | `gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:"+=200%",pin:true,scrub:1,snap:"labels",invalidateOnRefresh:true}}).addLabel("a")...` | Signature moment; labels double as snap points |
| Horizontal track | `const tw=gsap.to(track,{x:()=>-(track.scrollWidth-innerWidth)*d,ease:"none",scrollTrigger:{trigger:el,pin:true,scrub:1,end:()=>"+="+(track.scrollWidth-innerWidth),invalidateOnRefresh:true}})`; nested: `scrollTrigger:{containerAnimation:tw, trigger:item, start:"left center"}` | Mobile (`max-width:767px`) = native `scroll-snap`, no pin |
| Sticky stack | card i: `pin:true,pinSpacing:false,start:"top top"`; previous card `scale:.92, autoAlpha:.55` scrubbed by next card's trigger | CSS `position:sticky` fallback |
| matchMedia branches | `gsap.matchMedia().add({desk:"(min-width:800px)",mob:"(max-width:799px)",reduce:"(prefers-reduced-motion:reduce)"},ctx=>{...})` | Auto-reverts on change |
| SplitText lines | `SplitText.create(h,{type:"lines",mask:"lines",autoSplit:true,onSplit:s=>gsap.from(s.lines,{yPercent:100,stagger:.08,duration:.9,ease:"expo.out",scrollTrigger:{trigger:h,start:"top 85%",once:true}})})` | Return tween from `onSplit`; aria handled |
| Scroll-lit words | `gsap.fromTo(s.words,{autoAlpha:.15},{autoAlpha:1,stagger:.1,ease:"none",scrollTrigger:{trigger:p,start:"top 80%",end:"bottom 40%",scrub:true}})` | Manifesto/quote only |
| Clip reveal | `gsap.fromTo(fig,{clipPath:"inset(100% 0 0 0)"},{clipPath:"inset(0% 0 0 0)",duration:1.1,ease:"expo.out"}); gsap.from(img,{scale:1.3,duration:1.4,ease:"expo.out"})` | Same ScrollTrigger for both |
| Velocity | `ScrollTrigger.create({onUpdate:s=>{const v=gsap.utils.clamp(-8,8,s.getVelocity()/300); skewTo(v)}})` with `const skewTo=gsap.quickTo(el,"skewX",{duration:.4})` | Clamp skew <= 10deg |
| Pointer follower | `const xTo=gsap.quickTo(el,"x",{duration:.4,ease:"power3"}), yTo=gsap.quickTo(el,"y",{duration:.4,ease:"power3"})` | Never create a tween per pointermove |
| Seamless loop | GSAP `horizontalLoop(items,{repeat:-1,speed:1,draggable:true,reversed:d<0})` helper | Variable widths + drag |
| Flip morph | `const st=Flip.getState(items); changeLayout(); Flip.from(st,{duration:.6,ease:"power2.inOut",stagger:.02,absolute:true,onEnter:e=>gsap.fromTo(e,{autoAlpha:0},{autoAlpha:1}),onLeave:l=>gsap.to(l,{autoAlpha:0})})` | Filters, grid/list, quick view |
| Observer sections | `Observer.create({type:"wheel,touch,pointer",onDown:()=>go(i+1),onUp:()=>go(i-1),tolerance:10,preventDefault:true})` | Opt-in, budget >= 9, keyboard fallback |
| Draggable inertia | `Draggable.create(rail,{type:"x",inertia:true,bounds:{minX:d>0?-max:0,maxX:d>0?0:max},snap:gsap.utils.snap(w)})` | RTL bounds flip |
| SVG draw | `gsap.from(path,{drawSVG:"0%",ease:"none",scrollTrigger:{trigger:path,scrub:true}})` | Timelines, signatures, routes |
| Morph | `gsap.to(a,{morphSVG:{shape:b,type:"rotational"},duration:1.2,ease:"power2.inOut"})` | Blobs, icons |
| Motion path | `gsap.to(clone,{motionPath:{path:[{x:0,y:0},{x:dx/2,y:-120},{x:dx,y:dy}],curviness:1.2},scale:.2,autoAlpha:0,duration:.7,ease:"power2.in"})` | Fly-to-cart |
| Scramble | `gsap.to(el,{duration:.8,scrambleText:{text:el.dataset.text,chars:"upperCase",revealDelay:.2,speed:.4}})` | Hebrew charset string for he |
| Counter | `gsap.to(o,{v:to,duration:1.6,ease:"power2.out",snap:{v:1},onUpdate:()=>el.textContent=fmt.format(o.v)})` with `fmt=new Intl.NumberFormat(lang)` | Final value SSR'd |
| Custom ease | `CustomEase.create("hop","M0,0 C0.3,0 0.2,1 1,1")` | One house ease per direction |
| Context cleanup | `const ctx=gsap.context(()=>{...},scope); /* destroy */ ctx.revert()` | Required by module API |

## 9. Page-load choreography (pick one per site; total <= 1.4 s; runs once)

**L1 Editorial lines (budget 3-6).** 0.0 s nav fades in (`autoAlpha 0->1`, .4 s) · 0.1 s H1 lines rise from masks (`yPercent 100->0`, stagger .08, .9 s expo.out) · 0.45 s lede + CTA `autoAlpha` + `y 12->0` (.6 s) · 0.5 s hero image `clip-path inset(100% 0 0 0)->0` + inner `scale 1.2->1` (1.1 s). Nothing else animates.

**L2 Curtain + wordmark (budget 6-8, luxury/fashion).** Solid `--c-ink` panel covers viewport; wordmark `split-reveal` chars (Latin) or words (Hebrew) in .5 s; at .7 s panel `yPercent 0->-100` (.8 s expo.inOut) revealing hero already at final layout; hero image de-zooms `1.1->1` during the lift. First visit per session only (`sessionStorage`, try/catch); repeat visits run L1.

**L3 Blur-in soft (soft structuralism/AI).** H1 words `filter blur(10px)->0`, `autoAlpha`, `y 10->0`, stagger .04, .7 s soft ease; shader bg fades from `--c-canvas` over 1.2 s; CTA buttons scale .96->1 last. No curtain.

**L4 Grid build (Swiss/telemetry).** Hairline grid lines `scaleX/scaleY 0->1` from inline-start (.6 s, stagger .03) · numerals/labels `scrambleText` .6 s · H1 hard cut in at .5 s (no easing, `duration:0`) · content blocks appear with `steps(1)` timing. Feels mechanical by design.

Rules: the hero is readable without JS (initial CSS state = final; JS sets the `from` state inside `gsap.set` before first paint using a `.js` class on `<html>` added inline in `<head>`); fail-safe timeout removes hidden states after 2.5 s if scripts fail.

## 10. Page transitions (WordPress, no SPA)

Cross-document View Transitions (Chromium 126+, Safari 18.2+; others just navigate normally):
```css
@view-transition { navigation: auto; }
::view-transition-old(root) { animation: 280ms var(--ease-in) both vt-out; }
::view-transition-new(root) { animation: 420ms var(--ease-out) both vt-in; }
@keyframes vt-out { to { opacity: 0; transform: translateY(-12px); } }
@keyframes vt-in  { from { opacity: 0; transform: translateY(16px); } }
.site-header { view-transition-name: header; }          /* stays put */
.product-card img { view-transition-name: var(--vt, none); } /* set inline per card: --vt: p-123 */
.pdp-main-image { view-transition-name: p-123; }         /* shared element PLP -> PDP */
@media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; } }
```
Variants: fade-lift (default), curtain (`::view-transition-new(root)` `clip-path: inset(100% 0 0 0) -> inset(0)`), circle from click point (store coords in `sessionStorage` on `pageswap`, read on `pagereveal`). Budget: <= 450 ms total; never on checkout/account (add `@view-transition { navigation: none; }` via body class there). Barba/Swup only if the brief demands persistent audio/WebGL across pages (then re-init with `SD.destroyAll/initAll` on each swap).

## 11. Preloaders (when allowed)

Allowed only when: budget >= 7, first visit per session, the site has a heavy hero asset (WebGL, frame sequence, video) that genuinely needs loading, and never on e-commerce transactional pages or landing pages with paid traffic (every 100 ms costs conversion).

| id | pattern | recipe | limits |
|---|---|---|---|
| PL-A | % counter | Big tabular-nums counter 000 -> 100 driven by real asset progress (image/frames `onload` count / total, floor at time-based minimum 0.6 s), then curtain lift (L2) | Max 2 s; if assets done early, finish counter in 300 ms |
| PL-B | Logo draw | Logo SVG `drawSVG 0 -> 100%` .8 s, fill in .2 s, fade out | Max 1.2 s |
| PL-C | Image stack flash | 5-8 thumbnails flash in place (80 ms each), last one scales to become the hero image (Flip) | Photography/fashion only; no flashing > 3/s at full contrast (use 120 ms+ for high contrast) |
| PL-D | Split wordmark | Wordmark halves slide apart revealing hero (`xPercent ±50*d`) | Max 1 s |
| PL-E | Word as preloader (2026-10) | The loading state is set type: one huge word ("LOADING", the brand, the venue) in the display face over the poster colour, filling as real progress arrives (`clip-path: inset(0 calc(100% - var(--p)) 0 0)` on a second copy in `--c-ink`) then the word becomes the hero H1 (seen on a light-festival site by a French digital studio) | Max 1.6 s; only with real progress; the word must be the page's own (no "LOADING" on a store) |

All: `aria-busy="true"` on `<main>` during load, content in DOM underneath (SEO), skip under reduced motion and on `navigator.connection.saveData`, `sessionStorage` flag in try/catch, fail-safe removal at 3 s.
