# Widgets & micro-interactions catalog (74 + commerce extras)

Small interactive parts that live inside sections. Ids `C-xx` are stable (from research). Row: `id | name | looks like | use when | module / recipe | a11y / RTL`.
Global: every hover effect needs a focus equivalent and a touch fallback (`SD.fine()` false => static or tap state). One hover effect per element. Loops > 5 s need pause. Horizontal motion x `SD.dir()`. Budget: <= 3 widget types per page besides nav/footer basics (motion.md budget decides the upper bound).

**Quick index**
- C.1 Loops & marquees: C-01, C-02, C-03, C-04
- C.2 Scroll-driven: C-05…C-71 (13): C-05, C-06, C-07, C-08, C-09, C-10, C-11, C-12, C-13, C-14, C-69, C-70, C-71
- C.3 Pointer / hover: C-15…C-25 (11): C-15, C-16, C-17, C-18, C-19, C-20, C-21, C-22, C-23, C-24, C-25
- C.4 Text effects: C-26…C-74 (12): C-26, C-27, C-28, C-29, C-30, C-31, C-32, C-33, C-72, C-73, C-74, C-34
- C.5 Media & comparison: C-35, C-36, C-37, C-38, C-39
- C.6 UI components with motion: C-40…C-54 (15): C-40, C-41, C-42, C-43, C-44, C-45, C-46, C-47, C-48, C-49, C-50, C-51, C-52, C-53, C-54
- C.7 Buttons & micro-feedback: C-55, C-56, C-57, C-58, C-59, C-60, C-61, C-62
- C.8 Transitions & page-level: C-63, C-64, C-65, C-66, C-67, C-68

## C.1 Loops & marquees

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-01 | Seamless marquee | Content scrolls endlessly | Logos, tickers, CTA strip (max 1 per page) | `marquee` (`data-speed` px/s, `data-direction="auto|reverse"`, `data-pause-hover`, `data-controls`, `data-gap`, `data-fade`, `data-draggable`) | Clones `aria-hidden`; pause on hover/focus + button; `auto` direction follows `dir` |
| C-02 | Scroll-velocity marquee | Big text rows speed up/skew with scroll velocity | Agency, fashion, events | `marquee` `data-velocity="true" data-skew="8"` | Skew clamp <= 10deg; reduced: static row |
| C-03 | Circular / curved text | Text on a circle (rotating badge) or along a curve | Stamps, badges | Recipe: SVG `<textPath>`, rotate 20 s linear; Hebrew: `<text direction="rtl">` | Decorative `aria-hidden`; real text elsewhere; no "scroll down" badge (scroll cue ban) |
| C-04 | Vertical ticker | Messages flip vertically in a bar | Announcement bar | `text-fx` `data-mode="rotate" data-effect="slide" data-interval="4" data-cycles="0"` (no dedicated ticker mode; `data-cycles="0"` = endless, so add a pause button, else keep default 3 cycles) | Pause button; `aria-live="off"`, all messages in DOM |

## C.2 Scroll-driven

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-05 | Smooth scroll base | Inertial scroll | Premium marketing pages; off on checkout/account/long forms | `core.js` Lenis (`<html data-smooth="off">` opt-out) | Disabled on reduced motion; anchors via `SD.lenis.scrollTo` |
| C-06 | Line-mask reveal | Heading lines slide up from masks | Primary headings (not every heading) | `split-reveal` `data-type="lines" data-variant="slide" data-stagger=".08"` (lines are always masked) | `aria-label` kept by SplitText; Hebrew lines/words only |
| C-07 | Blur-in words | Words sharpen from blur | Soft/luxury/AI directions | `split-reveal` `data-type="words" data-variant="blur"` | Headings only (blur cost) |
| C-08 | Scroll-lit paragraph | Words brighten with scroll | Manifesto, big quote (S-06, T-03) | `split-reveal` `data-type="words" data-variant="colour" data-scrub="true"` (words go from a colour floor to ink; floor is computed so it still passes 3:1 at ≥24px / 4.5:1 below; `data-floor` .45) | Never dim text with opacity: every scroll position must meet contrast. The alpha-floor recipe is banned |
| C-09 | Scroll float / 3D text | Chars stretch up; lines rotate in 3D | Creative display headlines | Recipe: chars `scaleY 2.3->1, yPercent 120->0` scrub; 3D `rotateX` per line, `perspective:800px` | Latin only for chars; Hebrew use words |
| C-10 | Parallax layers | Elements drift at different rates | Depth on images, decorative shapes | Recipe: ScrollTrigger scrub `yPercent: -10 -> 10` (<= 20%); or `data-speed` if ScrollSmoother chosen instead of Lenis | Off on reduced; keep <= 20% |
| C-11 | Clip image reveal | Image uncovers, inner de-zooms | Editorial/premium images | `clip-reveal` `data-direction="up|down|center|inline-start|inline-end" data-zoom="1.3"` | `inline-start` resolves to the logical side (RTL right) |
| C-12 | Scroll progress bar | Top bar fills with progress | Long articles, case studies | Recipe: CSS `animation-timeline: scroll()` on `scaleX`, `transform-origin: inline-start` (use `left`/`right` via `[dir]`); GSAP scrub fallback | Decorative; `aria-hidden` |
| C-13 | Frame-sequence scrub | Canvas plays frames with scroll | Product storytelling | `scrub-video` with `<canvas class="sd-scrub__media" data-frames="/img/f_{i}.webp" data-count="120" data-pad="3">` (`data-mode="frames"` to force) | Reduced: last frame; 720p frames on mobile |
| C-14 | SVG draw on scroll | Paths/signatures draw | Timelines, routes, signature | Recipe: DrawSVG `drawSVG:"0% 0%" -> "0% 100%"` scrub; fallback `stroke-dashoffset` | Decorative or labelled `<title>` |
| C-69 | Observer section snapping | Wheel/swipe jumps whole sections | Presentations, experimental single-product | Recipe: `Observer.create({type:"wheel,touch", onDown, onUp, tolerance:10, preventDefault:true})` | Opt-in only; keyboard PageUp/Down/arrows; never on stores |
| C-70 | Travelling protagonist (2026-10, world-agency scan) | One product/object docks in a slot in each section and flies to the next as you scroll: size, tilt and view change on the way (seen on 4 sites: a card-issuing fintech, an AI product, a drinks DTC and a mobility brand) | DTC single products, cards/fintech, hardware, any page whose subject is one object; the page's signature moment | `travel` module (`data-fx="travel"` on the wrapper, `[data-travel-slot]` boxes with static views; `data-hold`, `data-spin`, `data-arc`, `data-swap`, `data-min`) | Slots keep their static views + alt (traveller aria-hidden); reduced motion = static slots; slots opposite the copy so the flight never crosses text; RTL: rotate/arc × SD.dir |
| C-71 | Tone chapters (2026-10, world-agency scan) | The whole canvas crossfades from one flat tone to the next as each chapter arrives (orange → black → blue → paper), giant cropped word per chapter (seen on a museum exhibition microsite, a fintech brokerage and a space-tourism brand, each by a top independent studio) | Stories, venues, museums, campaign pages, product launches; colour-block directions; replaces hard-edged colour bands | `tone-shift` module (`data-fx="tone-shift"` on the wrapper, `data-tone` per direct child; built-in canvas/surface/ink/accent/media or project tones; `data-root` lets the fixed header follow) | Each section keeps its own ink (check every tone pair ≥4.5:1); opacity-only layers; no-JS = hard-edged tones; vertical only (no RTL work) |

## C.3 Pointer / hover

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-15 | Magnetic button | Button pulled toward cursor, springs back | Primary CTA, round nav icons (<= 3 per page) | `magnetic` `data-strength=".35" data-label=".5" data-radius="60"` | pointer:fine only; focus ring unaffected |
| C-16 | Spotlight card | Radial light follows pointer in card/border | Bento, pricing on dark | `bg-kit` `.bg-spotlight` (+ `.bg-spotlight--rim`) + `data-fx="bg-kit"`; inside `bento` use its built-in `data-spotlight` | Static on touch |
| C-17 | 3D tilt card | Card rotates toward pointer, inner layers float | Products (collectibles), team, credit-card mockup | Recipe: quickTo `rotateX=-dy*8, rotateY=dx*8*SD.dir()` <= 12deg, children `translateZ(40px)` | pointer:fine; no gyro by default |
| C-18 | Glare / foil | Specular glare or rainbow foil | Premium cards, jewelry, collectibles | Recipe: overlay gradient pos from pointer, foil `mix-blend-mode:color-dodge` | Decorative |
| C-19 | Border beam / shine border | Light travels around border | Featured plan, one CTA | `bg-kit` `.bg-conic-sheen` masked to border (recipe: the border mask), or `offset-path` dot (recipe, no module) | Loop > 5 s on a small element acceptable; reduced: static border |
| C-20 | Proximity edge glow | Border arc nearest cursor lights | Dark UI grids | Recipe: angle centre->pointer -> conic mask `from` | Decorative |
| C-21 | Custom cursor | Dot + lagging ring; label on media ("View", "Drag") | Portfolio, agency, luxury | `cursor` on `<body>` (`data-variant="follower"`, `data-lag`, `data-blend`; labels via `data-cursor="View"` on targets) | Native cursor kept visible (ring is extra); pointer:fine; never hide focus |
| C-22 | Image trail | Mouse leaves trail of images | Photographers, fashion, agency hero | `cursor` `data-variant="trail" data-images="a.jpg|b.jpg|c.jpg" data-threshold="80" data-pool="8"` | Desktop only; decorative |
| C-23 | Pixel/ink/ghost trail | Pixel squares, ribbons, ink | Experimental, gaming | Recipe: canvas trail with decay; WebGL fluid opt-in | Desktop; off on reduced |
| C-24 | Lens distortion | Magnifier with RGB shift over image | Photography, product detail | Recipe: CSS lens (E-15) or WebGL fragment around `u_mouse` | Desktop only |
| C-25 | WebGL hover distortion | Image ripples/liquefies on hover | Portfolio, fashion (opt-in) | Recipe: one shared canvas, displacement uniform tweened | Heavy; experimental tier |

## C.4 Text effects

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-26 | Scramble / decrypt | Glyphs cycle then resolve | Tech, security, nav hover, loaders | `text-fx` `data-mode="scramble" data-trigger="view|load|hover" data-chars="auto"` (auto = Hebrew set `אבגדהוזחטיכלמנסעפצקרשת` in RTL, Latin otherwise; or a literal set like `"01"`) | `aria-label` holds final text |
| C-27 | Rotating words | One word cycles (flip/slide/blur) | Heroes (H-20) | `text-fx` `data-mode="rotate" data-words="a|b|c" data-effect="slide|blur|flip" data-cycles="3"` | Full phrase in `aria-label`, rotator `aria-hidden`; pause after 3 cycles if > 5 s |
| C-28 | Typewriter | Types with caret | AI/dev products, chat-like | Recipe: TextPlugin `{text}` tween 0.04 s/char; caret CSS blink `steps(1)` | Full text available to AT from start |
| C-29 | Shimmer text | Light sweep across text | "New" chip, one AI label | Recipe: `background-clip:text` gradient, position keyframes 2.5 s | Contrast of base colour must pass alone |
| C-30 | Gradient flowing text | Multicolour inside letters | Playful/Gen-Z only | Recipe: `background-size:300%` keyframes | Anti-pattern #2 by default; use only if direction allows |
| C-31 | Counters (count / roll / flap) | Numbers count, odometer roll, split-flap | Stats, prices, countdown to real date | `counter` `data-to` `data-variant="count|roll"` `data-locale="he-IL"` `data-format="currency" data-currency="ILS"` (split-flap = recipe, no module) | Final value in DOM (SSR); digits isolated LTR in RTL; tabular-nums |
| C-32 | Glitch text | RGB split jitter on hover | Gaming, music, cyber | Recipe: `::before/::after` clip-path keyframes on hover only, 300 ms | Never looping (seizure risk) |
| C-33 | Marker highlight | Hand-drawn highlight sweeps under words | Law, consulting, education copy | Recipe: `background: linear-gradient(var(--c-accent) 0 0) no-repeat 0 85% / 0% 35%` -> `100% 35%` on view; RTL: `background-position` at `100%` start | Highlight is decorative; meaning stays in text |
| C-72 | Highlight-strip headline (2026-10) | Each line of a heavy condensed caps headline sits on its own flat colour strip (box per line, not a full block) over a photo (seen on an international NGO and a US university athletics site, both by enterprise WordPress agencies) | NGOs, campaigns, news leads, sports; when type must read over busy photography | Recipe: inline `<span>` with `background: var(--c-accent); color: var(--c-accent-ink); box-decoration-break: clone; -webkit-box-decoration-break: clone; padding: .05em .25em; line-height: 1.25`; optional per-line `clip-path` reveal on load | Real contrast on the strip (≥4.5:1, ≥3:1 at ≥24px); RTL: padding is symmetric, works as is; Hebrew: no caps, keep the strip |
| C-73 | Scribble-glyph wordmark (2026-10) | One or two letters of a big name replaced by hand-drawn scribbles/loops that draw on (seen on a photographer portfolio; a museum exhibition microsite draws a scribble over caps) | Portfolios, artists, creative studios, one hero per site | Recipe: name as text with the replaced letters in `<span class="sr-only">` + an inline SVG path per glyph sized `1em` (`aria-hidden`); DrawSVG `0%→100%` 0.9 s on load | The accessible name stays intact (sr-only letters); never on body copy; Hebrew: substitute a final letter (ם ן ף ך ץ) only if the stroke reads |
| C-74 | Annotation layer over photo (2026-10) | Hand-drawn or HUD-style marks (circles, arrows, play diagrams, callout lines with small labels) drawn over a photo/render as it enters (seen on an athlete's site, an earbuds launch and a museum exhibition microsite) | Sport, product anatomy, health devices, architecture, explainers | Recipe: `<figure>` with the image + absolutely positioned inline SVG (`viewBox` = image ratio, `preserveAspectRatio="none"` only for lines), paths drawn with C-14 DrawSVG on view; labels are real HTML positioned with % logical insets | Labels in HTML (not SVG text) so they translate; `direction="ltr"` on the drawing SVG, mirror deliberately only for flows; reduced motion = drawn |
| C-34 | Physics text | Words fall and pile, draggable | 404, playful about | Recipe: matter.js (MIT) bodies per word | One-off; reduced: static pile |

## C.5 Media & comparison

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-35 | Before/after slider | Drag handle reveals second image | Renovation, clinics, cleaning, retouch, beauty PDP | `before-after` (`data-start="50" data-orientation="horizontal|vertical"`, `data-hover`, `data-intro`) | Overlaid `<input type=range>` gives keyboard; RTL inverts direction; labels "Before"/"After" visible |
| C-36 | Video modal thumbnail | Thumb + play -> lightbox video | Demos, testimonials | Recipe: Flip thumb -> `<dialog>`; lite YouTube (iframe on click) | Captions; Esc; focus return |
| C-37 | Image/icon sphere | Small sphere of logos/images | Clients, tech stack | `sphere` `data-radius="200" data-item-size="56"` | Keyboard arrows rotate; reduced: no auto-rotate |
| C-38 | Pixel/dither reveal | Image assembles from pixels | Tech-retro, portfolio | Recipe: canvas draw downscaled 8->1 steps over 600 ms once | Real `<img>` underneath with alt |
| C-39 | Mockup frames | Device/browser frames | Only when showing real screenshots of a real product; never div-drawn fake UI | Pure CSS frame | Antipattern #45 if content is fake |

## C.6 UI components with motion

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-40 | Animated tooltip | Tooltip springs in, slight rotation from pointer dx | Avatars, icon buttons | Recipe: Popover API `popover="hint"` fallback `manual`; quickTo rotation | Shows on focus; `aria-describedby` |
| C-41 | Link preview | Hover link shows screenshot card | Blogs, portfolios, citations | Recipe: popover with pre-generated image | Focus-triggered too |
| C-42 | Sliding tab indicator | Active background slides between tabs | Tabs, segmented controls, billing toggle | Recipe: Flip or `gsap.to(ind,{x,width})` using `offsetLeft` in LTR / computed from `inline-start` in RTL | ARIA tabs / radio group |
| C-43 | Morphing dialog | Card expands in place into modal | Team bios, quick view, blog cards | `quickview` (product dialog; for team bios/blog cards reuse its FLIP pattern as a recipe) or View Transitions `view-transition-name` | `<dialog>`, focus trap/return |
| C-44 | Card swap stack | 3D stack; front card cycles to back | Features, testimonials | Recipe: tl cycling z-order, front `y:+500` then reorder | Pause on hover; arrows alternative |
| C-45 | Swipe deck | Drag cards left/right to dismiss | Quizzes, product finder | Recipe: Draggable `onDragEnd` threshold 120px -> Inertia fly-out | Buttons for yes/no; RTL flips meaning labels not direction |
| C-46 | Draggable inertia rail | Free drag with momentum and snap | Product rails, portfolio | Recipe: Draggable `type:"x", inertia:true, snap: gsap.utils.snap(itemW)`; or native scroll-snap (preferred on mobile) | Arrows + keyboard; RTL bounds negative |
| C-47 | Coverflow | Centre flat, neighbours rotated in 3D | Albums, books, products | Recipe: per item `rotateY = clamp(-45,45, offset*-45)*SD.dir()`, `translateZ(-|offset|*120px)` | Buttons prev/next; `aria-roledescription="carousel"` |
| C-48 | Folder reveal | Folder opens and fans papers | Portfolio teasers, downloads | Recipe: CSS 3D lid `rotateX(-35deg)` + staggered children | Link text real |
| C-49 | 3D pin card | Card lifts with perspective beam | Partner links | Recipe: `rotateX(40deg) scale(.8)` -> flat on hover | Decorative wrapper |
| C-50 | Animated list feed | Items pop in like notifications | Real live activity only | Recipe: prepend + Flip shift | `aria-live="polite"` throttled; real data only |
| C-51 | Terminal typing | Commands type sequentially | Dev tools, APIs | Recipe: sequential C-28 | Real, copyable text |
| C-52 | Morphing toolbar / island | Pill expands into states | App-like UIs, cart status | Recipe: Flip container between states | `aria-live` for status |
| C-53 | Expandable cards row | Active card grows horizontally | Services, destinations | F-11 recipe | `:focus-within` |
| C-54 | Theme toggle circle | Dark mode spreads from button | Sites with a real dark theme | Recipe: `document.startViewTransition` + `::view-transition-new(root)` clip-path circle from button coords | Instant on reduced; `aria-pressed` |

## C.7 Buttons & micro-feedback

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-55 | Shimmer button | Streak sweeps across | One primary CTA on dark | Recipe: `::after` gradient translate keyframes 3 s, pause between | Reduced: static |
| C-56 | Ripple / click spark | Ripple or sparks at click | Playful sites | Recipe: span at click coords `scale 0->4, opacity->0` 500 ms | Decorative |
| C-57 | Roll-text hover | Label rolls up to duplicate | Nav links, CTAs (award staple) | `text-fx` `data-mode="roll" data-stagger="chars|none"` (per char Latin, whole label Hebrew) | Duplicate `aria-hidden` |
| C-58 | Hold-to-confirm | Press and hold fills | Destructive/important actions | Recipe: pointerdown -> fill `scaleX` 1.2 s; release reverses | Keyboard hold + normal confirm fallback |
| C-59 | Stateful submit | Label -> spinner -> check/shake | Forms, ATC | Recipe: class states, width via Flip, icon crossfade | `aria-busy`, result in `aria-live` |
| C-60 | Animated checkbox / switch | Springy check draw, squish switch | Forms, filters | Recipe: real `<input>` + `::before`, SVG check `stroke-dashoffset` 200 ms | Real inputs always |
| C-61 | Confetti | Burst from a point | Order complete, sign-up (playful directions) | Recipe: `canvas-confetti` (ISC) 1 burst 120 particles | Skip on reduced motion |
| C-62 | Copy with feedback | Icon -> check "Copied" | Coupon codes, order numbers, emails, code | Recipe: `navigator.clipboard.writeText` + swap 1.5 s | `aria-live="polite"` "Copied" |

## C.8 Transitions & page-level

| id | name | looks like | use when | module / recipe | a11y / RTL |
|---|---|---|---|---|---|
| C-63 | Preloader | % counter + logo, curtain lifts | See motion.md preloader rules | Recipe in motion.md §7 | <= 2 s, once per session, never on stores' transactional pages |
| C-64 | Page transitions | Curtain/clip/fade between pages | Multi-page marketing sites | CSS `@view-transition {navigation:auto}` (motion.md §6) | Disabled on reduced |
| C-65 | Flip layout transitions | Layout changes animate | Filters, sort, expand, reorder | `flip-grid` or `Flip.getState/from` | Announce count changes |
| C-66 | Motion-path flow | Thumbnail flies along curve | Fly-to-cart, gallery -> detail | `cart` fly-to-cart does an arc internally (no MotionPathPlugin needed); generic recipe `motionPath:{path:[p0,ctrl,p1]}` | Reduced: none |
| C-67 | Progressive blur edge | Content blurs at top/bottom edge | Sticky header over content, captions | Recipe: 4 stacked `backdrop-filter: blur(1,2,4,8px)` layers with stepped masks | Limit area (cost) |
| C-68 | Pulsing gradient border | Glowing animated border | One AI input or featured card | Recipe: conic `@property` border; shader version = Paper pulsing-border | Reduced: static |

## Commerce widgets

`E-01…E-27` are defined once, in `ecommerce-plp-pdp.md` §13 (single source of truth). This file holds only `C-xx` widgets.
