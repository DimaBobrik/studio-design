# Anti-patterns (ban list) · Version 2026-09 (attractors A9-A13 added 2026-09-30 from the 203-site mass scan; A14-A17 added 2026-10-01 from the 321-site Israeli scan; A18-A22 added 2026-10-01 from the 256-site world-agency client scan; A23-A25 added 2026-10-01 from the 97-studio agency own-site scan)

Scope: defaults the model must NOT fall into. **Bans are defaults, not absolutes: the brief's explicit words win.** If a client names cream, Inter, a bento or a gradient, do it well and note the override in the plan. Guarded directions (`broadsheet-duet`, `media-bento-night`, `dev-playground`) may use a banned look only inside their guard rules. Re-check the "Current attractors" block every quarter (next review: 2026-12): yesterday's anti-slop becomes today's slop.

Sources: consolidated from earlier research notes on public design skills and prompts (not included) and the 2026 gallery scans summarised in `references/patterns.md`.

## Current attractors (rotate out, re-check quarterly)
These are the looks AI builds converge on in 2026. Never pick them as the default answer to a free axis.
- A1. Warm cream canvas `#F4F1EA / #F5F1EA / #F7F5F1 / #FBF8F1 / #EFEAE0 / #ECE6DB` + high-contrast serif + terracotta/clay accent `#D97757 / #C56A3C / #B6553A`.
- A2. Premium-consumer kit: bone/cream + brass/ochre/oxblood accents `#B08947 #9C6E2A #BC7C3A #7D5621 #9A2436` + espresso text `#1A1714 / #1B1814`.
- A3. Near-black `#0B0B0B / #0A0A0A / #111` + a single acid green/lime `#C6FF00 / #B8FF3C / #4AF626` or vermilion `#FF3B00`.
- A4. Broadsheet cosplay: hairline under every row, 0 radius, dense newspaper columns, tracked caps kickers.
- A5. SaaS card kit: identical rounded cards, one radius everywhere, `box-shadow: 0 4px 12px rgba(0,0,0,.1)` on all, gradient washes behind.
- A6. Template chrome: mono 10–11px caps eyebrow (+0.18–0.22em) above every heading, "A · B · C" meta strings, `→` appended to every link.
- A7. Dark "AI product" hero: purple/blue aurora blobs, glass cards, gradient headline text, floating 3D sphere.
- A8. Fraunces / Instrument Serif as the "tasteful" display; Space Grotesk as the "techy" display.
- A9–A13 below were measured in the 2026-09 mass scan (203 sites, `references/patterns.md` §M4-M6; shares are of tier A/B sites unless noted). They are common among award sites too, which is exactly why they now read as template: use them only when the stated condition holds.
- A9. **Centred single sentence on an empty light/grey sheet** (28-48px sentence, micro nav, one pill or one floating UI window; studio, SaaS and app sites). ~10% of A/B heroes, 21% of A/B heroes are centred. Fine when the sentence is the brand's real positioning line AND the next viewport delivers a built object (product UI, work, data). Attractor when the sheet is empty because nothing was designed: choose a start-aligned hero with an exit element instead.
- A10. **Rounded inset media sheet** (hero photo/video as a card inset 12-24px from the viewport edges, radius 16-32px, headline over or above it). ~8% of A/B heroes, concentrated in agencies, SaaS and DTC (6 such sites in the scan). Fine when the direction's radius system is soft and the inset frame repeats as the section-sheet device (dark/light sheets). Attractor as a reflex "premium" frame on a 0-radius or pill direction.
- A11. **Lifestyle film + one small light line** (full-bleed soft-focus product/lifestyle film, 40-72px light serif or sans line bottom-start, one text link; the default premium Shopify look). 42% of A/B ecommerce heroes (23/55) are film bands. Fine when the photography is genuinely art-directed for the brand (a shoot, not stock) and the band carries an exit (product card, category words). Attractor when the film is interchangeable: switch to a product-led hero (H-14, H-24, H-26) or category words.
- A12. **Giant full-width wordmark** (brand name fit-to-width as masthead or as the footer). ~13% of A/B mass-scan heroes use a masthead wordmark; ~14% of visible mass-scan footers and 9/30 deep-scanned sites end on one. Fine ONCE per site and when the name is short and ownable (≤10 chars) or the object sits inside it (H-26). Attractor when it is both the hero and the footer, or when the footer wordmark is the only designed idea of the page.
- A13. **Mono as a second voice everywhere** (a mono face for labels, captions, prices, buttons and meta on every section). A mono family ships on 25% of all 181 usable sites (13/52 tier A). Fine when the subject has real codes, dimensions, times or data (SKU, batch, coordinates) and mono is reserved for them. Attractor as decorative "techy" seasoning on lifestyle, food or services (A6 is its eyebrow form).
- A14–A17 were measured in the 2026-10 Israeli scan (321 sites, 122 Hebrew-first pages; `references/israel.md` §1e, §3). They are the local defaults that Hebrew briefs pull toward.
- A14. **The Israeli local template** (Hebrew SMB / agency site): stock photo or device-mockup hero + centred 44-72px Assistant/Heebo/Open Sans bold + two pills, lead form or icon strip in the hero, WhatsApp bubble + accessibility-overlay icon + chat/Google-reviews badge floating, icon-tile services, stat strip, testimonial slider, mega footer with agency credit. ≥3 of {WhatsApp float, overlay icon, neutral Google sans display ≤72px, hero lead form} on **53% of Hebrew pages (58% of tier C, 20% of tier A+B); all four on 21% (0 of A+B)**. Never the default. Keep the channels the business needs (phone, WhatsApp, accessibility statement) as designed elements: a labelled contact link, a footer statement link, one form section.
- A15. **Floating object stack**: 3-5 fixed objects over content (WhatsApp, accessibility icon, chat/AI widget, cookie bar, reviews badge, back-to-top). Explicit `wa.me` link on 55% of Hebrew pages (A+B 20%), overlay plugin on 57% (A+B 20%). Rule: header + at most one fixed object (cart/contact pill), cookie bar in the design system.
- A16. **Dark-purple "AI agency" template in Hebrew**: night gradient with glow, purple pill CTAs, "5.0★ / 98% / +120" stat strip, device mockups, WhatsApp + accessibility floats (8 of 20 Hebrew agency home pages). Same family as A7; never for Israeli services, studios or SaaS.
- A17. **Hebrew stack inflation**: Latin display + Latin body + Hebrew face + widget fonts (Trustindex, Google Sans, Poppins/Montserrat for Latin words, icon fonts) = 4+ superfamilies on 15% of Hebrew pages (3% in the award scan, 0 of 7 Hebrew tier A). Audit rendered families per script (`verify.mjs fonts-rendered`) and kill plugin fonts.
- A18–A22 were measured in the 2026-10 world-agency client scan (256 live client sites of 41 top studios, `references/agency-world.md` §6). They are what the best studios now ship by reflex for clients; shares are of the usable captures unless noted.
- A18. **Immersive gate**: a WebGL-only or preloader-first home (black/colour field + spinner or "click to enter", "turn your sound on", "browser unsupported" redirect, content inside one canvas). 28 of 51 client sites by the 7 WebGL-first studios in the scan never rendered a usable page in headless Chromium with SwiftShader WebGL, even after a re-shoot with real wheel scrolling: that is what search bots, slow phones and screen readers get. Fine for a time-boxed campaign that ships a DOM fallback (H1, copy, links) under the canvas. Never for a company, store or service home (antipatterns #50, #60, #67).
- A19. **Scroll-lit grey sentence as the default statement** (a 40-60px paragraph that brightens word by word from grey to ink as you scroll, C-08) on every dark SaaS/AI/fintech home. Seen on ~6% of A/B world sites (6 SaaS/AI/fintech homes), up from a signature to a template. Use it at most once per site, only for a real positioning sentence, and with `split-reveal data-variant="colour"` (recede by colour, never opacity).
- A20. **Entry layer stack on store homes**: cookie banner + country/geo modal + "10-20% off your first order" email modal all on the first viewport. 10 of 18 homes by two Shopify-specialist agencies showed at least one blocking layer in the first viewport, 5 a discount/email modal (plus 3 DTC stores by other studios). Design the consent bar as a non-modal strip, defer the offer to exit intent or the second page view, and never stack two modals (WooCommerce: one consent plugin, one popup rule).
- A21. **Corporate photo band + 2-line sentence bottom-start + chip CTA** (aerial/landscape/factory photo or film, 40-56px light sans two-liner in the bottom-start corner, a small lime/white pill). ~8% of world A/B heroes (8 sites in energy, industry, mobility and logistics). It is A11 (lifestyle film) for B2B. Fine when the photo is the company's own site/plant/product shot; reflex when the image is stock "landscape = sustainability".
- A22. **Pastel UI-collage SaaS hero** (centred sentence, real product screenshots fanned or stacked with soft shadows on a pastel gradient wash, logo strip under). ~10% of world A/B and most C landings (9 SaaS/fintech landings in the scan). Real UI is good (antipatterns #45 is about fake UI); the attractor is the identical composition. Alternatives seen in the same scan: painterly landscape plates behind UI (A-48, one enterprise-software site), line-drawn isometric scenes (two SaaS sites), one object explaining the product (two fintech/AI sites: C-70).
- A23–A25 were measured in the 2026-10 agency own-site scan (97 studio homes, 162 case pages; `references/agency-sites.md` §2, §5). They are what every studio site now does by reflex; shares are of valid homes unless noted.
- A23. **The studio-site kit stacked**: four or more of: fullscreen preloader (23%; WORLD 33%), custom cursor blob/follower (29%; tier A 35%), "Let's talk" pill in the nav (51%), centred manifesto sentence + reel card (11% of A/B heroes), award laurel row under the hero, logo marquee (14%; IL 20%), "Let's talk / get in touch" footer (30%) with a giant footer wordmark or line ≥60px (24%), live office clocks, "enter with sound". Each item is fine when it carries information; the stack is the template. Keep at most two, choose ONE signature hero device (`agency-sites.md` §3.1) and let the work carry the rest.
- A24. **Device-mockup case hero**: client work shown in laptop/iMac/phone frames or a fake browser bar (div-built chrome, purple "visit site" button under it): case heroes of ~21 of ~50 studios with visible case media, 18 of them Israeli and mostly tier C; WORLD tier A shows flat real screens on tinted plates, scrolling page captures, brand applications and campaign photography (case media share A 72% vs C 34%). Use CS-06 screens on plate; a real photographed device in context is fine.
- A25. **Agency home as a sales brochure**: lead form + KPI strip ("N,NNN projects · NNN clients · NN+ years") + icon-card service triplet + long SEO paragraph on the home page (home words median C 912 vs A 190; home form C 68% vs A 29%; KPI strip C 35% vs A 19%). Work comes after services or not at all (42% of homes link no case page). Fix: work in section 1-2, home ≤350 words, capabilities as a list, contact as one display line.
- Not added (measured low): floating pill nav (~5% of A/B heroes) and % preloaders (1 capture in 203; captures wait 9 s, so preloaders are under-counted — re-measure with a load-time scan before banning).

## Colour
1. No purple→blue, blue→cyan, purple→pink, orange→pink gradients on backgrounds, buttons or text.
2. No `background-clip: text` gradient headlines.
3. No pure `#000000` or `#FFFFFF` as canvas/ink; also no reflex `#0B0B0B/#111` stand-in (tint L 12–18% with chroma ≥0.005 toward the direction's hue).
4. No zero-chroma flat greys (`#888`, `#EAEAEA`) mixed with tinted neutrals; one neutral hue per page.
5. One accent (a direction may declare a fixed set, e.g. sticker colours); accent ≤5% of any viewport unless the direction is a `field` canvas.
6. Accent never changes hue between sections; dark mode keeps the same hue (L +5–10%, C −0.02).
7. No neon outer glows or coloured box-shadow halos (`0 0 40px #7c3aed`).
8. No grey body text on coloured backgrounds; text on colour uses the direction's ink (contrast ≥4.5:1 body, ≥3:1 display ≥24px).
9. No random light section inside a dark page (or reverse) without a declared device (sheet slide, colour-block story, `data-surface` inversion).
10. No glassmorphism on scrolling content; `backdrop-filter` only on fixed/sticky nav or modal.
11. Gradients: two stops max, and only where the direction declares one (sky, sunset stripe, chrome object).

## Typography
12. No banned default fonts (list below) as display or body.
13. ≤2 families + 1 outlier in ≤2 slots; 4 families = slop.
14. Weight contrast ≥300 units (400 vs 700, 300 vs 800); never 500 vs 600 "hierarchy". Exception, stated in the direction file: display and body of different classification (serif vs sans, single-weight display face, script, pixel, compressed caps, mono body) with a size ratio ≥2.5×. Hebrew faces: use only weights the face ships (check Google Fonts), never synthesized bold.
15. No accenting one word of a headline with italic/bold/colour/second font (declared exceptions, once per view: `apparatus-night` verb landmark, `estate-didone` script word).
16. No `<br>` split headlines ending in an italic word.
17. Tracked ALL-CAPS eyebrows: ≤ ceil(sections/3), never in consecutive sections, never mono caps by default.
18. No decorative section numbering (`01 / Features`, `001 · Capabilities`, "Phase 01") unless the content is a real sequence.
19. Display lines: ≤2 lines on desktop for heroes (≤7 words self-written); container wide enough (`max-width` ≥ 14ch at display size).
20. All-caps display line-height ≥1.0 (Latin); Hebrew display line-height ≥0.95, body ≥1.6; no negative tracking on Hebrew. Declared exceptions (Hebrew A-tier evidence, `references/israel.md` §1a): `kikar-heavy` lh 0.92 and -0.01em, `work-wall-neutral` -0.01em, both only at ≥64px on ≤3 short lines with final letters checked.
21. No faux italics or italic emphasis in Hebrew; no uppercase transforms expected to work in Hebrew.
22. Prose body ≥16px; UI-dense directions (industrial-catalogue, telemetry-terminal, media-bento-night) may set UI copy at 15px; mono UI ≥13px (`desktop-y2k` mono ≥15px); measure 45–75ch.
23. No em-dash as a separator in UI labels or headlines; ≤1 per paragraph in prose; use curly quotes and `…`.
24. Numbers in tables/prices: `font-variant-numeric: tabular-nums`; prices and measurements in RTL wrapped `dir="ltr"`.

## Layout & structure
25. No template spine: hero → 3 features → testimonials ×3 → 3-tier pricing → 4-column footer.
26. No 100vh centred hero with badge pill → centred H1 → 2-line sub → filled + ghost CTA.
27. No "✨ New" badge / version label (v2.0, BETA) above the H1; no trust strip or pricing teaser inside the hero.
28. No three equal cards (icon tile, 2-line title, 3-line text, "Learn more →").
29. No card-in-card nesting; no single radius on everything; no side-stripe cards (4–6px coloured border-left).
30. Zig-zag image/text rows ≤2 consecutive; each section layout family used once per page (8 sections ⇒ ≥4 families).
31. No split section header filler (big headline left + small paragraph floating right) unless the right column holds a real visual.
32. Bento: cell count = content count, no empty or text-only filler tiles, ≥2 cells with real visual variation.
33. No AI nav (wordmark left, 5 links, CTA right, hairline) and AI footer (4 columns Product/Company/Resources/Legal + social icon row + ©) as defaults: use the direction's nav/footer archetypes.
34. Marquee ≤1 per page; no duplicate CTA intents with different labels across nav/hero/footer.
35. Section padding varies (top ≥1.3× bottom somewhere); never identical `padding: 96px 0` on every section.
36. Hero must fit eyebrow + H1 + lede + CTA at 1280×800 (except full-bleed band directions, where the band IS the hero).

## Content & copy
37. No invented metrics ("99.9% uptime", "10× faster", "10,000+ clients"), fake-precise specs, "BY THE NUMBERS" blocks without sources.
38. No placeholder people/brands: Jane Doe, John Smith, Sarah Chen, Acme, Nexus, NovaCore, Flowbit, lorem ipsum in delivered pages; use labelled slots ("[client quote to confirm]").
39. Banned openers/words: Elevate, Seamless, Unleash, Supercharge, Empower, Revolutionize, Next-gen, Reimagine, Delve, Tapestry, "Where X meets Y", "Built for the modern team", "In today's digital landscape".
40. No performative-craft labels: "Field notes", "On the bench", "Quietly trusted by", fake photo credits ("Plate 03 · House archive"), decoration strips ("BRAND. MOTION. SPATIAL.").
41. No live clock / coordinates / weather strip unless the business is time- or place-based and the data is real (opening hours, radio schedule).
42. No logo walls of fake text wordmarks or with category captions; real SVG logos only, with permission.
43. No scroll cues ("Scroll to explore", bouncing chevron, mouse icon).
44. CTA labels ≤3 words, verb-first, say exactly what happens; never wrap to 2 lines.

## Imagery
45. No div-built fake dashboards/screenshots/terminals; no re-drawn browser bars, traffic-light dots, phone frames (exception: `desktop-y2k` functional windows).
46. No emoji as icons; one icon family per site, one stroke width.
47. No corporate doodle people, unmodified library illustrations, Midjourney-symmetric heroes, AI-generated people presented as real staff/clients.
48. No purely text "minimalism" on commerce/brand pages: real photos or labelled image slots with target ratio.
49. No broken hotlinks (Unsplash direct); use provided assets or `picsum.photos/seed/<descriptive>/<w>/<h>` placeholders marked TODO.
50. No generic 3D blob/sphere/orb "for depth" and no Three.js object the user cannot interact with or that says nothing about the subject.
51. Stock clichés banned by default: handshake, gavel, stethoscope close-up, glowing globe with network lines, rocket for "launch", shield for "security".

## Motion
52. No fade-up-on-scroll on every section; one orchestrated entrance + one signature scroll moment per page.
53. No `transition: all`; animate transform/opacity/filter/clip-path only.
54. No uniform `hover: scale(1.05)` on every card; ≤1 hover effect per element.
55. No bounce/elastic/overshoot on UI state (menus, forms, cart); overshoot only where a direction declares it (stickers, toys, characters).
56. No perpetual loops (pulse/float/shimmer) on non-live content; loops, canvases and videos pause offscreen.
57. No cursor followers / custom cursors without a job (allowed: image preview in indexes, "drag" labels over draggable zones).
58. Pins start at `top top` (never `top center`); every ScrollTrigger cleaned up in `destroy()`; no `window` scroll listeners in modules or site code (use ScrollTrigger, or `SD.onScroll(cb)`). Only exception: the single passive, rAF-throttled listener inside `runtime/core.js` that backs `SD.onScroll`.
59. Every animation has a one-sentence reason (hierarchy, storytelling, feedback, state change); `prefers-reduced-motion` renders the final state.
60. Preloaders only with real progress, first visit only, ≤2s.
61. Autoplay video: muted + playsinline + poster + pause control if >5s; ≤3 videos playing at once.

## Technical
62. No `100vh` heroes (use `100svh/100dvh`), no `100vw` widths, no horizontal scroll at 320–1440px; `overflow-x: clip` (not hidden) on html/body.
63. No lazy-loaded LCP image; `fetchpriority="high"` on it; width/height on every img.
64. No `z-index: 9999`; use the named z-scale from core.css.
65. No hex/font literals outside `tokens.css` (token drift); modules consume only contract tokens. Exception: `--img-*` tokens (colours used only inside renders, illustrations, shaders, e.g. `--img-glaze`, `--img-clay-shadow`) are declared in `tokens.css` and may be any colour; they never style text, UI or backgrounds of text.
66. No physical properties (`margin-left`, `left:`, `text-align: left`) in components; logical properties only; horizontal motion multiplies by `SD.dir()`.
67. Canvas/WebGL: DPR cap 1.5, `aria-hidden="true"`, static fallback image, paused offscreen.

## Banned as default fonts
Display or body, unless the brief names them: **Inter, Inter Tight, Roboto, Open Sans, Lato, Poppins, Montserrat, Raleway, Nunito, Work Sans, DM Sans, Source Sans 3, Plus Jakarta Sans, Manrope, Outfit, Space Grotesk, system-ui/Arial/Helvetica as the chosen face, Fraunces, Instrument Serif, Playfair Display (as body or reflex display), Merriweather, Lora, Source Serif, Georgia/Times as the chosen face, Courier New, Consolas, Bebas Neue (reflex condensed).**
Hebrew note: the Google Hebrew pool is small, so Heebo, Assistant and Rubik are allowed as Hebrew fallbacks in any direction; for Hebrew-first sites prefer the direction's specific Hebrew pairing and rotate across projects (Frank Ruhl Libre, David Libre, Noto Serif Hebrew, Bona Nova, Bellefair, Suez One, Secular One, Karantina, IBM Plex Sans Hebrew, Noto Sans Hebrew, Miriam Libre, Fredoka, Playpen Sans Hebrew, Rubik Pixels, Cousine) instead of Heebo everywhere.
