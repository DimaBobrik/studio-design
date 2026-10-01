# Sections catalog · content sections

Sections catalog is split in three files: `sections-hero-nav.md` (§0 composition rules, §1 hero, §2 nav), `sections-content.md` (§3 features … §7 CTA, §9 gallery, §10 team/about/contact, §11 stats/newsletter, §13 case study), `sections-footer-wp.md` (§8 footer, §12 WordPress mapping). E-commerce patterns: `ecommerce-plp-pdp.md` / `ecommerce-cart-account.md`; widgets: `widgets.md`; backgrounds: `backgrounds.md`.

**Quick index**
- §3. Features / benefits / process (17): F-01…F-17 (17)
- §4. Social proof (12): S-01…S-12 (12)
- §5. Pricing (7): P-01…P-07 (7)
- §6. FAQ (4): Q-01…Q-04 (4)
- §7. CTA (7): CTA-01…CTA-07 (7)
- §9. Gallery / portfolio / content (15): G-01…G-15 (15)
- §13. Case study (11): CS-01…CS-11 (11; agency own-site scan 2026-10, `references/agency-sites.md`)
- §10. Team / about / contact (8): T-01…T-08 (8)
- §11. Stats (4) and newsletter (3): ST-01…NL-03 (7)

Row format and wireframe notation: `sections-hero-nav.md` (top); composition rules §0 there apply to every section.

## 3. Features / benefits / process (17)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| F-01 | Bento grid | `bento[big tile 2x2 | tile / tile | wide tile]` | SaaS features, services, "why us" | `bento` (spotlight + glow built in: `data-spotlight`, `data-glow`) | tiles 4/6/7/9 · spans regular/irregular/mosaic · border hairline/accent corners/none | tiles (flex: text, image, video, stat, quote; size), layout |
| F-02 | Sticky scroll reveal | `split[txt block 1..n scrolls | ^media crossfades per block]` | Product walkthrough, process | Recipe: media `position:sticky; top:20vh`; each block ScrollTrigger `onToggle` sets active index | media side start/end · swap crossfade/clip/slide · progress rail yes/no | steps (repeater: h, txt, media) |
| F-03 | Tabbed showcase | `[tab list with progress lines] / [large media panel]` | SaaS, apps, services | Recipe, no module (`accordion` has no tabs mode): ARIA tabs + 6 s progress `scaleX` auto-advance, pause on hover/focus | tabs vertical/horizontal · autoplay off/6 s/8 s · media screenshot/video/illustration | tabs (repeater) |
| F-04 | Horizontal pinned track | `^track[card] [card] [card] <>` | Process steps, collections, timeline | `hscroll` (`data-speed`, `data-progress`, `data-snap`, `data-min-width="900"` → native scroll-snap row below; RTL-aware) | card width 40/60/80vw · inner parallax on/off · progress bar/counter/none | cards (repeater) |
| F-05 | Sticky stacking cards | `stack[card 1] under [card 2] under [card 3]` | Services, pricing, case studies | `stack-cards` (`data-scale=".92"`, `data-dim=".55"`, `data-offset="20"`, `data-rotate`) | offset 0/20/40px · rotation 0/±2deg · dim .4/.6/none | cards (repeater) |
| F-06 | Zigzag rows | `split[IMG | txt] / split[txt | IMG]` (max 2) | Corporate, clinics, B2B | `clip-reveal` (`data-parallax="10"` inner drift) | rows 2 max · media ratio 4:5/1:1/16:9 · overlap none/offset card/bleed | rows (repeater) |
| F-07 | Orbiting integrations | `[central logo with rings; logos orbit]` | Integrations, partner ecosystem | Recipe: CSS `@keyframes orbit {rotate(0) translateX(r) rotate(0) -> rotate(360deg) translateX(r) rotate(-360deg)}`; freeze reduced | rings 1/2/3 · speed 30/60 s · logo mono/colour | hub_logo, logos (repeater + ring) |
| F-08 | Animated beams hub | `[nodes] ~~beams~~> [hub] ~~> [outputs]` | How it works, pipelines, AI agents | Recipe: bezier paths from node rects (ResizeObserver), SVG gradient pulse | inputs 3/5/7 · pulse speed · direction in/out/both | nodes (repeater) |
| F-09 | Tracing-beam timeline | `list[line fills as you scroll; milestones light up]` | History, roadmap, process | Recipe: line `scaleY` scrub, dots `.is-on` toggle; semantic `<ol>` | side start/centre alternating · marker dot/year/icon · fill solid/gradient | milestones (repeater: year, h, txt, img) |
| F-10 | Pinned numbered steps | `^[big number 01->02->03 flips | content swaps]` | Services "how we work", onboarding | `counter` `data-variant="roll"` + recipe pinned tl with labels (flap/scramble numbers = recipe, no module) | steps 3/4/5 · number roll/flap/scramble · snap on/off | steps (repeater) |
| F-11 | Accordion image strips | `[||| ▮▮▮▮ |||] hovered strip expands` | Services with imagery, destinations, categories | Recipe: flex `1 -> 4` on `:hover,:focus-within`, caption fade | strips 4/5/6 · orientation vertical/horizontal · caption bottom/rotated | items (repeater) |
| F-12 | Stats band | `[ 1,240 | 38 | 12y ] label under each` | Corporate trust (real numbers only) | `counter` (`data-to`, `data-locale="he-IL"`, once) | count 3/4 · style count/roll/static · divider rule/none/colour-block | stats (repeater: value, suffix, label, source) |
| F-13 | Direction-aware hover cards | `grid[card][card][card]` overlay enters from cursor side | Services, portfolio, team | Recipe: entry edge from pointer angle -> overlay from `translate(±100%)`; touch shows overlay | columns 2/3/4 · overlay colour/image/blur · content reveal title/title+txt | cards (repeater) |
| F-14 | Old way vs our way | `split[Before list | After list]` or before-after slider | Consulting, renovation, clinics | `before-after` or `<table>` 2-col | format table/slider/cards · emphasis colour/weight/strike · rows 4/6 | rows (repeater: before, after) or images |
| F-15 | Feature index list | `list[name ........ one-liner ........ tag] rows, hover reveals media` | Dense B2B capabilities, >6 items | Recipe, no module: rows grid `1fr 2fr auto`, single hover preview image (`gsap.quickTo`) | columns · media hover/inline/none · grouping flat/by category | items (repeater) |
| F-16 | Single large demo | `media[looping product video or GIF-free screen capture, caption below]` | Tools where showing beats telling | `<video>` muted loop + pause button; poster | frame none/rounded/bleed · caption below/overlay · controls pause/scrub | video, poster, caption |
| F-17 | Spec-sheet chapter | `split[mono 2-col prose, caps titles | 1px data drawing (rings, trace, dimension lines)] / media[full-bleed documentary photo]`, repeated per case | Hardware, health, engineering, charity campaigns with real data (seen on 3 campaign/product microsites in the award-gallery scan) | Recipe, no module: `<dl>` or 2-col mono text; inline SVG drawn from real data (`stroke: var(--c-ink)`, 1px); photo band between cases; body stays ≥15px even when the source uses 9-11px | drawing rings/trace/exploded · photo between/beside/none · columns 1/2 | cases (repeater: title, text, data array, photo) |

---

## 4. Social proof (12)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| S-01 | Logo marquee | `loop[~ logo logo logo logo ~] edge fades` | Every B2B site with real logos | `marquee` (`data-speed="40" data-direction="auto" data-pause-hover="true" data-controls="true"`) | speed 30/40/60 px/s · logo mono/colour on hover · rows 1/2 | logos (gallery SVG), speed |
| S-02 | 3-row capsule marquee + dialog | `loop[~caps~] / [caps~~] / [~caps~] on hatch band -> click = quote dialog` | Many clients/testimonials | `testimonials` (`data-rows="3" data-speed="40"`) | band hatch/grid/plain · capsule avatar/logo/initials · dialog quote/video | testimonials (repeater: name, role, avatar, quote) |
| S-03 | Vertical wall columns | `[col ^~][col v~][col ^~] fades top/bottom` | SaaS/courses with many reviews | Recipe, no module (`marquee` is horizontal only): per-column CSS `translateY` loop, alternate directions, pause button | columns 2/3/4 · durations 40/55/70 s · card tint/hairline | reviews (repeater) |
| S-04 | Stacked photo testimonial | `split[photo stack shuffles | quote words blur-in] arrows` | Agencies, coaches, clinics | Recipe: z-order cycle, `rotate random(-10,10)`; quote `split-reveal` words blur | rotation 0/6/10 · arrows below/side · autoplay off/8 s | testimonials |
| S-05 | Moving review cards | `loop[~ card card card ~]` | Everyone (if not using another Q) | `marquee` with cards | card width · speed · pause on hover | reviews |
| S-06 | Big scroll-lit quote | `text[one oversized quote; words brighten with scroll] / attribution` | Brand statement, case study pull quote | `split-reveal` `data-type="words" data-variant="colour" data-scrub="true"` (colour floor that still passes contrast; never opacity) | size 2xl/3xl/display · alignment start/centre · attribution photo/none | quote, name, role, photo |
| S-07 | Video testimonials rail | `rail[portrait VID card][..] hover plays muted -> dialog w/ sound` | Coaching, clinics, DTC UGC | Recipe: IO + `video.play()` on hover/focus; `<dialog>` lightbox; captions VTT required | card ratio 9:16/4:5 · rail snap/drag · count 3-8 | videos (repeater: video, poster, vtt, name) |
| S-08 | Ratings summary | `[4.7 ★ | distribution bars] / filters / list` | Services with real reviews (PDP version in ecommerce-plp-pdp.md SM-03) | bars `scaleX` on view | layout inline/sidebar · photos yes/no · sort | source (plugin/import) |
| S-09 | Avatar stack + stat | `(o)(o)(o)(o) Trusted by 1,240 clinics` | Under hero, in CTA | Recipe: negative `margin-inline-start: -12px`; tooltip `widgets` C-40 | avatars 3/5/7 · tooltip yes/no · stat real/omit | avatars, text |
| S-10 | Case cards with KPI | `grid[IMG card + "+32% orders" overlay] x2-3` | Agencies, B2B | `counter` (on view); whole-card `<a>` | columns 2/3 · KPI overlay/under · hover zoom 1.03/none | cases (relationship to CPT) |
| S-11 | Press quotes | `list[Publication logo | short quote] rows` | DTC, restaurants, authors | Recipe: list with logos; no marquee if Q used | layout rows/grid/single rotating · logo size · quote length | press (repeater) |
| S-12 | Logo cell wall | `grid[logo|logo|logo|logo|logo|logo]` 6-8 cols, 2-4px gaps, each logo in its own tinted cell | Studios, agencies, B2B with ≥18 real client logos (seen on 2 studio/recruiter sites with large client tables) | CSS grid `gap: 2px`, cells `--c-surface`, logos SVG at ~60% ink via `--c-ink-2`, hover = full ink + client/year label; replaces S-01 marquee | columns 6/8 · cell fill surface/rule/none · label on hover/always/none | logos (repeater: svg, name, year, link) |

Honesty: every logo, number and quote is real or marked `<!-- TODO: confirm -->` with a visible placeholder `[TODO: confirm]`; no invented clients.

---

## 5. Pricing (7)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| P-01 | Tiers + billing toggle | `[monthly/yearly switch] / grid[tier][tier*][tier]` | SaaS, memberships, service packages | toggle = radio group + recipe price swap (`gsap.to` a proxy + `Intl.NumberFormat`; `counter` only animates on scroll-in); `aria-live` price | tiers 2/3/4 · highlight scale/border/colour block · toggle segmented/switch | plans (repeater: name, price_m, price_y, features, cta, featured) |
| P-02 | Highlight with moving border | featured card has conic beam + text badge "Recommended" | Any pricing, one card | `bg-kit` `.bg-conic-sheen` on border via mask | beam/glow/static outline · badge text · scale 1/1.03 | featured flag |
| P-03 | Comparison table | `list[sticky plan header / feature rows grouped / ✓]` | Complex SaaS | Recipe: real `<table>`, sticky `thead`, first col sticky mobile, groups as `<tbody>` with `<th scope=rowgroup>` | grouping · check icon/text · highlight column | matrix (repeater of groups/rows) |
| P-04 | Usage slider | `[range: seats 1-500] -> price + recommended plan update` | Usage pricing, "estimate your project" | Recipe: `<input type=range>` + `counter` tween, `Intl.NumberFormat('he-IL',{style:'currency',currency:'ILS'})` | steps linear/tiered · output price/plan/both · extra inputs 0/1/2 | formula params |
| P-05 | Stacked sticky plans | `stack[plan] under [plan] under [plan]` | Mobile-first service packages | `stack-cards` | as F-05 | plans |
| P-06 | Single price statement | `text["One plan. ₪290/month." / what's included list / CTA]` | Simple products, bold directions | Plain; price large display | list 2-col/inline/checks · price size · guarantee line | price, includes |
| P-07 | Hardware / one-time purchase (bundles) | `split[device render or photo | base unit price / "or 12 × ₪[TODO] תשלומים" / bundle radios: Base · Plus (+accessory) · Complete kit / ATC]` + `list[compare table: what's in the box per bundle]` + `[warranty · shipping · returns strip]` | Physical products sold once (devices, tools, appliances, kits, furniture), landing or single-product store | Recipe: bundles are a radio group (one price updates with `Intl.NumberFormat("he-IL",{style:"currency",currency:"ILS"})`, add-ons as checkboxes with their own price lines); compare table = real `<table>` (rows: in the box, specs that differ, warranty, delivery); installments line only if the gateway offers it (placeholder `[להשלמה: מספר תשלומים]` otherwise); price incl. VAT note; ATC hands off to `cart`/Woo. Product visual: `device` (box products) or `lathe` (turned objects) or photos | bundles 2/3/4 · add-ons none/checkbox/stepper · compare table below/in dialog · financing line on/off | bundles (repeater: name, price, items[], badge), add_ons (repeater), box_contents (repeater per bundle), warranty, installments |

Rules: prices from real data; show VAT note (Israel: "כולל מע״מ" / "+VAT"); currency symbol placement follows locale (`₪290` in he-IL renders as `‏290 ₪`; always use Intl, never hand-format).

---

## 6. FAQ (4)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| Q-01 | Smooth accordion | `disclosure[+ question / answer]...` | Everywhere | `accordion` (`<details name="faq">` + `interpolate-size`) | icon plus/cross (`data-icon`) · exclusive yes/no (`data-exclusive`) · dividers hairline/cards | faqs (repeater: q, a WYSIWYG) + FAQPage schema toggle |
| Q-02 | Sticky title + list | `split[^H2 + contact CTA | accordion]` | Services, clinics, law | `accordion` + sticky column | side start/end · CTA card/link · count 6-12 | + cta |
| Q-03 | Searchable / categorised | `[chips + search] / disclosure[filtered items]` | Help centre, shipping & returns | `accordion` + filter (text includes; `aria-live` count) | chips/tabs · search on/off · deep-link `#q-slug` | categories taxonomy |
| Q-04 | Conversational FAQ | `text[Q as big line / A as short paragraph] stacked, no toggles` | <= 5 questions, editorial directions | plain | size · alignment · separators | faqs |

---

## 7. CTA (7)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| CTA-01 | Giant type + magnetic | `text[LET'S TALK huge / (round magnetic button)]` | Agencies, freelancers, studios | `magnetic` + `split-reveal` chars (Latin) / words (Hebrew) | size 12/18vw · button round/pill · extra email line/none | h, cta, email |
| CTA-02 | Shader card | `[rounded card w/ shader bg / H2 / CTA]` | SaaS end of page | `shader-bg` inside card | preset · radius · layout centred/start | h, cta, bg group |
| CTA-03 | Marquee link strip | `loop[~ BOOK A CALL ✳ BOOK A CALL ~] outline -> fill on hover` | Agencies, events (counts as the page's marquee) | `marquee` + CSS `-webkit-text-stroke` | stroke/fill · speed · velocity on/off | text, link |
| CTA-04 | Waitlist vanish input | `[input w/ rotating placeholder | submit] -> text vaporises` | Launch, waitlist | Recipe, no module: placeholder rotation + canvas burst; real `<form>` + `aria-live` | burst on/off · placeholder list · success inline/redirect | form (CF7/Gravity id), placeholders |
| CTA-05 | Sticky bottom bar | fixed bar after hero leaves: `[Call] [WhatsApp]` | Local services, clinics, mobile | Recipe: ScrollTrigger on hero `onLeave` toggles `yPercent`; body `padding-bottom` | items 1/2/3 · show mobile only/all · hide near footer | phone, whatsapp, cta |
| CTA-06 | Split contact CTA | `split[H2 + 3 bullets | short form 3 fields]` | B2B lead gen | form + `accordion`-free | fields 2/3/4 · side · reassurance line | form id |
| CTA-07 | Photo band CTA | `media[full-bleed photo / H2 start / CTA]` | Hospitality, real estate | `clip-reveal` | anchor · scrim · parallax on/off | image, h, cta |

---

## 9. Gallery / portfolio / content (15)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| G-01 | Horizontal parallax gallery | `^track[IMG][IMG][IMG] <> inner x parallax` | Portfolio, lookbook, tourism | `hscroll` (`data-parallax="12"` on `img[data-hs-parallax]`) | heights mixed/equal · captions under/overlay · count 5-12 | gallery |
| G-02 | Grid -> fullscreen preview | `grid[thumbs] click -> Flip to full + text lines` | Portfolio, product stories | Recipe: `Flip.getState(img)` -> overlay -> `Flip.from(state,{duration:.8,ease:"expo.inOut"})`; `<dialog>` | grid 3/4/5 · preview full/split · nav arrows yes/no | items |
| G-03 | Curved / coverflow gallery | `rail[ \ | / ] centre flat, sides rotated` | Albums, books, products | `widgets` C-47 coverflow | angle 30/45/60 · drag/arrows · autoplay off | items |
| G-04 | Masonry + filters | `bento[masonry] / chips reflow with Flip` | Photography, interiors, recipes | `flip-grid` (chips `button[data-filter]`, items `li[data-tags]`); masonry = CSS columns recipe, no module mode | columns 2/3/4 · filter chips/select · gap 8/16/32 | items + taxonomy |
| G-05 | Infinite looping list | page list loops seamlessly to top | Portfolio/art only, with footer exit | Recipe: clone first screen at end, `SD.lenis.scrollTo(0,{immediate:true})` | — | projects |
| G-06 | Hover-reveal project list | `list[Project name ..... category ..... year] hover = floating IMG` | Agencies (text-heavy) | Recipe, no module: single hover preview image following the pointer (`gsap.quickTo`) | image follow/fixed/strip · row size · year/category cols | projects |
| G-07 | Layout formations | grid items reform into circle/line/stack on scroll | Experimental portfolio only | Recipe: precomputed positions, scrub Flip states | formations 2/3 · items 12-24 | items |
| G-08 | Editorial journal list | `[featured post large] / list[date · title · category] hover thumb` | Blogs, law firms, agencies | Recipe, no module: grid + hover thumb (`gsap.quickTo`) | featured 1/2/none · list/grid · thumb hover/inline | posts query |
| G-09 | Lookbook with hotspots | `media[lifestyle IMG with (+) hotspots] -> popover product card` | Fashion, interiors (store: see ecommerce E-08) | Popover API buttons at % coords | hotspots 1-6 · popover card/mini/link · pulse on/off | image, hotspots (repeater: x%, y%, product) |
| G-10 | Poster-scale index rows | `list[ meta cell | IMG | NAME 90-130px running off the edge – title ]` ruled rows, image side alternates | Programmes, speakers, artists, journals, collections (seen on a public-art programme site; a design journal uses it as numbered fit-to-width covers) | Recipe, no module: row grid `12rem 16rem 1fr`, name `white-space: nowrap; overflow: clip`; hover slides the name via transform; image side via `:nth-child(even)` order | type size 90/120/160 · image side fixed/alternating/none · row = table row / numbered cover | items (relationship: name, title, image, meta, link) |
| G-11 | Sentence filter / audience switcher | `We design [Everything ▾] for [Everyone ▾]` or `You are [a group ▾]` as a live sentence; the content below filters | Portfolios with many categories; venues and services with several audiences (seen on a large international design partnership's site and a Paris cultural venue) | Recipe: sentence with inline disclosure buttons styled as words (boxed, underlined or inverse); results via `flip-grid` or links to audience pages | slots 1/2 · word style boxed/underlined/inverse · result filter/link | sentence parts, options (repeater: label, filter slug/link) |
| G-12 | Scatter field (2026-10, world-agency scan) | `stage[ ANCHOR H2 centred / IMG×5-9 at authored x,y,w, each on a depth ]` ~110-125svh; near items drift faster, far items sit behind the word | Fashion, galleries, museums, photographers, venues, architecture "many projects" moments (seen on ~7 sites: fashion and photographer portfolios, a gym chain, an architecture firm and two museum microsites, built by top independent studios) | `scatter` module (`data-assemble` fly-in, `data-pointer`, per item `data-x/-y/-w/-depth`); <720px falls back to a staggered 2-3 col grid | items 5/7/9 · assemble on/off · depth spread low/high | anchor heading, items (repeater: image, caption, x, y, w, depth) |
| G-13 | Showreel block (2026-10, agency own-site scan) | `media[muted teaser loop ≤15 s / "Play reel" pill + duration]` -> `<dialog>` full reel with sound; variants: inset reel card under a sentence (2 studios), split reel pane beside caps statement (a Dutch commerce studio), full-screen reel per scroll step with project name in a corner (a Dutch design studio), "Watch reel" disc (a US commerce studio) | Agencies, production, motion studios with a real reel (video on 49% of agency homes, "reel" named on 17%) | Recipe: `<video muted loop playsinline preload="metadata" poster>` started by IO only in view; dialog = `<dialog>` + `<video controls>` + VTT captions, focus returns to the trigger; never autoplay sound, no "enter with sound" gate | layout inset card/split pane/full-screen · trigger pill/disc/whole card · teaser length 6/10/15 s | teaser (mp4/webm), full reel (file or Vimeo id), poster, captions (VTT), label, duration |
| G-14 | Project slice strip (2026-10) | `rail[ ▮▮▮▮▮▮▮▮ ]` 20-40 B/W vertical slivers centred; hover/scroll widens one to full colour + per-letter project name 60-340px + index `01 / 30` | Studios and portfolios with 12-40 strong visuals, home or work index (seen on 2 freelance developer/designer portfolios; 2 studio sites use the counter variant) | Recipe: flex row, items `flex: 1 -> 6` on `:hover,:focus-within` (+ GSAP scrub with wheel for the scroll version); `filter: grayscale(1)` -> 0; WebGL distortion optional; <720px = vertical list of 64px slivers that open on tap; every slice is an `<a>` with the project name as text | slices 12/24/40 · axis vertical/horizontal · name size 60/120/340 | projects (relationship: image, name, year, discipline) |
| G-15 | Colour-per-project slides (2026-10) | `^stage[ PROJECT NAME 120-140px start / one-line + "Open case study →" | tilted media planes ] + vertical counter 1-8` each step recolours the canvas to the project's colour | Freelancers and small studios with ≤10 hero projects (seen on a freelance designer portfolio, a US product studio's numbered slides, and 2 studios' client-colour case fields) | Recipe: pinned section, one step per project (ScrollTrigger `snap: 1/(n-1)`), canvas colour from a per-project `--c-project` swapped via `SD.toRGB` tween; media skew via transform only; reduced motion = stacked project blocks | projects 4/6/8 · media tilt 0/6/12deg · counter dots/numbers/none | projects (relationship + per-project colour token, short line) |

---

## 10. Team / about / contact (8)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| T-01 | Team grid, focusable bio | `grid[portrait / name / role] hover/focus = bio` | Agencies, clinics, law firms | Recipe: card flip or overlay; `widgets` C-17 tilt optional | columns 3/4/5 · reveal flip/overlay/expand dialog · portrait ratio 3:4/1:1 | team (relationship to CPT) |
| T-02 | Contact split + map | `split[form | map + address + hours]` | Local business | `map` dotted or static image; real `<label>`s | map dotted/static/none · form fields 3-6 · side | form id, address, lat/lng, hours |
| T-03 | Manifesto | `text[full-screen statement, words scroll-lit]` | About pages | `split-reveal` `data-variant="colour" data-scrub="true"` (C-08) | size · alignment · background plain/photo dim | text |
| T-04 | Values stack / strips | `stack[value card] stacked` or F-11 strips | About | `stack-cards` or F-11 | as source | values (repeater) |
| T-05 | Founder letter | `split[portrait | letter text + signature]` | Small firms, lawyers, founders | `split-reveal` lines + DrawSVG signature | portrait size · signature on/off · drop cap yes/no | portrait, letter, signature |
| T-06 | Offices / locations | `grid[city card: photo, address, local time, map link]` | Multi-office companies | Plain + `Intl` time per office | cards 2/3/4 · map link/embedded/dotted · photo yes/no | offices (repeater) |
| T-07 | Contact channels | `list[Email ....... Phone ....... WhatsApp ....... Address]` big rows | Minimal directions | Plain, `tel:` `mailto:` `https://wa.me/972...` | row size · icons none/mono · copy button (C-62) yes/no | channels |
| T-08 | Awards / clients index | `list[year · award · project]` table | Studios, architects | Real `<table>` | columns · grouping by year · link rows | awards (repeater) |

---

## 11. Stats (3) and newsletter (3)

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| ST-01 | Stats band | see F-12 | real numbers only | `counter` | — | — |
| ST-02 | Single hero number | `text[huge 38 / "years representing..." ]` | One strong proof | `counter` roll | size · unit position · source line | value, label, source |
| ST-03 | Stat grid with context | `bento[stat + 1-line why + source]` x3-4 | Reports, NGOs, B2B | `counter` + `bento` | tiles · emphasis · sources visible | stats |
| ST-04 | Ring stats (2026-10) | `row[ ○ 3x | ○ 97% | ○ 3hrs ]` thin outline circles (1px rule) with the number inside, a one-line "of what" caption under each, on a dark band (seen on a security-SaaS site by a Nordic studio) | Security/B2B outcomes, health results, sustainability reports: 3-4 sourced results | Recipe: CSS circles (`aspect-ratio:1; border:1px solid var(--c-rule); border-radius:50%`) + `counter`; optional SVG `stroke-dashoffset` arc = the share for % values | rings 3/4 · arc on/off · band dark/light | stats (repeater: value, unit, caption, source) |
| NL-01 | Inline newsletter band | `split[H2 + benefit | email + submit]` | Blogs, DTC | real form, double opt-in note, `aria-live` | layout · incentive · consent checkbox (required for marketing in IL law) | form id, incentive |
| NL-02 | Newsletter modal (delayed) | dialog after 30 s or 50% scroll, once per 14 days | DTC only, never on checkout | `<dialog>`, `localStorage` try/catch | trigger time/scroll/exit · image yes/no · discount code/none | trigger, content |
| NL-03 | Footer-embedded | inside Ft7/FT-04 | default | — | — | — |

---

## 13. Case study (11)

From the agency own-site scan (`references/agency-sites.md` §5; 162 case pages of 97 studios). Order and page anatomy: `pages/company.md` CM-07. Default order CS-01 → CS-02 → CS-03 → CS-04 → CS-05 (×3-6, with CS-06/CS-07 inside the run) → CS-08 → CS-09 → CS-10 → CS-11. Budget: ~70% media by area, ≤450 words.

| id | name | wireframe | use when | module / recipe | knobs | ACF sketch |
|---|---|---|---|---|---|---|
| CS-01 | Case hero | `text[CLIENT NAME 60-220px / one-line outcome]` + (`media` full-bleed) ; variants: giant name on canvas (3 studios: 140-210px, caps) · client-colour field with name + 32px sentence, image overlapping the field edge (3 studios) · full-bleed photo with giant name bottom-start (a large US agency) · sentence-led 40-75px with meta column (2 studios) | Every case page; H1 = client/project name | Plain; client colour as `--c-project` on the section only (check ink contrast per project, fall back to canvas+ink); image overlap via negative `margin-block-start`; `view-transition-name` shared with the work card | variant name/field/photo/sentence · name size 60/120/220 · media none/below/overlap | client, title (H1), outcome line, hero media, project colour, layout |
| CS-02 | Meta strip | `list[ Client · Year · Services · Industry · Stack · Awards · Website ↗ ]` as end column of label/value pairs or a 3-5 cell row | Always (year 71%, services 59%, stack 57% of cases) | Real `<dl>`; values link to filtered Work index (`/work/?service=…`); live link external with ↗ + `aria-label` "(opens client site)"; Hebrew labels לקוח · שנה · שירותים · תעשייה · טכנולוגיה · לאתר ↗ | layout column/row/cells · fields 3-7 · live link here/top corner/both | client, year, services (taxonomy), industry (taxonomy), stack (text), awards (repeater), live_url, live_year |
| CS-03 | TL;DR / intro | `split[label "Intro" 25% | 32-40px paragraph ≤60 words]` or a tinted card with 3-4 numbered outcomes | After the hero, every case | Plain; numbered `<ol>` for the TL;DR card | form paragraph/card · size 24/32/40 · numbered yes/no | intro, tldr items (repeater) |
| CS-04 | Chapter (challenge / approach / result) | `split[ LABEL (The challenge) 25% | text ≤90 words + optional bullets ]`, repeated, or `grid[Challenge | Solution | Deliverables]` 3-col on a band | Body text of a case; 2-4 chapters | Plain; labels as `<h2>`; optional numbered chapters "01 Defining a vision" (a US product studio) | layout 2-col/3-col/numbered · label side start/top · band none/tint | chapters (repeater: label, heading, text, bullets) |
| CS-05 | Media rhythm block | `media[full-bleed IMG/VID] / grid[IMG | IMG] / text[caption 1-2 lines] / grid[IMG|IMG|IMG]` | The core of every case, 3-6 runs | `clip-reveal` on the first full-bleed only; videos muted loop in view, pause button; gaps 4-16px; captions 13-15px; reduced motion = static | pattern full/2-up/3-up/offset · gap 4/8/16 · caption under/side/none | media rows (flex: full, two-up, three-up, offset, video, caption) |
| CS-06 | Screens on plate | `media[tinted plate (--c-surface) with flat real screenshots, 1-3 side by side]` or a tall page capture scrolling inside a clipped frame | Web/app work; replaces device mockups (attractor A24) | Recipe: plate `padding: 6-10%`, screenshots with 1px `--c-rule` border and small radius only; scrolling capture = `overflow: clip` frame + `translateY` scrub of a tall image; mobile screens as plain rounded rectangles, not phone chrome | plate tint surface/project colour/dark · screens 1/2/3 · motion none/scroll-in-frame | screens (gallery), plate colour, mode |
| CS-07 | Brand asset sheet | `bento[ Aa type specimen | colour chips with values | icons | logo construction ]` | Identity / branding work (seen on 2 branding studios) | `bento` cells; colour chips print real values as text | cells 4/6/8 · tone light/dark · values shown yes/no | type specimen, colours (repeater: name, hex), icons gallery, logo files |
| CS-08 | Results strip | `row[ +37% | +59% | 6.6x ]` 96-112px numbers, one-line label + timeframe each, source line under | Only with real, client-approved numbers (15% of cases) | `counter` (once, `data-locale`), number as text in DOM; source in `<small>` | count 2/3/4 · size 72/96/112 · divider rule/cells/none | results (repeater: value, suffix, label, period, source) |
| CS-09 | Quote + recognition | `split[ client quote 28-40px / name, role | list[ press / award · year ] ]` | When a real quote or awards exist | S-06 for the quote (scroll-lit optional); recognition as `<ul>` with links | quote size · list press/awards/both · photo yes/no | quote, name, role, photo, recognition (repeater: outlet/award, year, link) |
| CS-10 | Credits | `list[ Role ........ Name ]` 2-4 columns, 13-15px | Team, partners, photographers (45% of cases; WORLD 62%) | Plain `<dl>`; names link to team profiles where they exist | columns 2/3/4 · grouping studio/partners · position end/meta column | credits (repeater: role, name, link) |
| CS-11 | Next project | `media[ "Next" label / NEXT CLIENT NAME 72-220px / preview IMG ]` whole block one link + small "All work" | End of every case (never end on a contact form) | Whole-block `<a>`; hover = image scale 1.03 / name slide; optional view transition into the next case hero (`view-transition-name` on name + image) | size 72/140/220 · preview image/colour field/none · extra links all work/contact | next_project (relationship; default = next by menu order) |

