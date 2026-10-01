# Hebrew and RTL

studio-design treats Hebrew and RTL as part of the design. On a Hebrew site the **Hebrew face is what users see**, so the design is judged by it, and the trio's distance is measured on the Hebrew display class that actually renders. Every direction ships a Hebrew stack, every runtime module mirrors correctly, and `verify.mjs` runs every page in LTR and RTL. It fails the page if Hebrew text falls back to a system font while a Hebrew web font is declared.

Sources: `directions/_index.md` (Hebrew display axis), `references/israel.md` (Israeli market study), `runtime/README.md` §8 (bidi), `antipatterns.md` #20–#21, #24, #66, A14–A17.

## Setup

- Hebrew sites ship `<html lang="he" dir="rtl">` on the root, never just `body { direction: rtl }`. In the Israeli scan, 14 of 122 Hebrew pages set `dir="ltr"` on `<html>` and switched lower down, which breaks screen readers and `:dir()`.
- `?rtl=1` is only a **mirroring test** for bilingual previews. `core.js` flips `dir` as it executes, and an optional `<head>` one-liner avoids the LTR flash.
- Bilingual: text labels "EN / עב" (no flags), `hreflang` alternates, and the English page is built from the same system rather than a thinner template.

## Type

- **Fonts per direction.** Each direction's `tokens.css` ends with a `:root:where([lang="he"])` block that puts its Hebrew display and body faces first in `--f-display` / `--f-body`. A Hebrew page then renders 2 families (+ mono/outlier), not Latin display + Latin body + two Hebrew faces.
- **≤ 3 families rendered** on a Hebrew page. 15% of Hebrew pages in the scan render 4+, mostly because of widget fonts (reviews, chat, accessibility plugins, icon fonts). Check that widgets don't add families.
- **Hebrew display classes**: sans-neutral (Heebo, Assistant, Noto Sans Hebrew, IBM Plex Sans Hebrew, Miriam Libre), sans-round (Rubik, Fredoka, Varela Round), sans-condensed, serif (Frank Ruhl Libre, David Libre, Noto Serif Hebrew, Bona Nova, Bellefair), display-heavy (Suez One, Secular One), display-condensed (Karantina), display-pixel (Rubik Pixels), hand (Playpen Sans Hebrew, Amatic SC, Gveret Levin). A Hebrew trio differs in Hebrew display class across all three picks, using each direction's listed swap face when two would collide.
- **Size**: ≥ 80px for the main statement on an award-level hero at 1440. Tier-A Hebrew pages have a median of 88px; the local template median is 58px. Use 120–200px for a single scale-shock line, and 40–64px on mobile.
- **Line-height**: 0.85–1.0 for heavy weights, 1.0–1.1 for light. Never go below 0.85 without checking final-letter descenders (ך ן ף ץ ק). Body text is 16–18px at weight 400 (never 300), lh 1.6–1.7, 50–70 characters per line.
- **Tracking**: 0 to −0.02em at ≥ 64px, 0 below 24px, never positive.
- **No italics or faux italics, no uppercase transforms.** Emphasis comes from weight or a colour block.
- **Pick one voice**: a heavy statement (800–900) *or* light-and-large (200–400 at ≥ 80px). A neutral 700 at 48–60px is the template look.
- **Only use weights the face ships.** Suez One, Secular One, Bellefair, Rubik Pixels, Varela Round and Gveret Levin are single-weight.
- **Commercial Hebrew faces.** If the brief names one and no licence is supplied, `israel.md` §2b maps the common commercial faces to the closest free Google face (verified via the Google Fonts CSS API Hebrew subset), and distance uses the substitute's class. Never ship font files you weren't given.
- **No Latin-only faces on Hebrew words.** Script and ornament faces are Latin-only outliers.

## Layout and motion

- **Logical CSS only**: `margin-inline`, `padding-inline-start`, `inset-inline-start`, `text-align: start`. `verify.mjs` warns on physical properties in project CSS.
- **Horizontal motion is multiplied by `SD.dir()`.** That covers marquees, horizontal tracks, carousels, drag bounds, fly-to-cart arcs (the arc measures the real cart icon instead of assuming a side) and stack-card tilts.
- **Drawers** open from the inline-end (left in RTL), and the logo sits at the inline-start (right).
- **Arrows**: in RTL "next" points left. Every directional icon gets `.flip-x`. Star ratings do **not** mirror.
- **Start alignment = right.** Centre at most one statement per page; long Hebrew copy is never centred.
- **SplitText**: Hebrew is never char-split (it breaks shaping). Mixed-script headings split by words, and the direction is set on the split element itself.
- **Latin wordmarks** may keep a left placement while the Hebrew menu still starts at the right. State this in DESIGN.md so nobody "fixes" it.

## Bidi

- **Isolate only the Latin or numeral run**, with `<bdi>` or `<span dir="ltr">`: prices, percentages, SKUs, dimensions, phones, emails, URLs. For example `ת״י <bdi>5568</bdi>` or `<bdi>30×40</bdi> ס״מ`. Wrapping the whole Hebrew + number phrase in `dir="ltr"` renders it backwards. A missing isolation is why "%40" and "+120" break on many local sites.
- Mixed or unknown-language blocks (reviews, CMS text) get `dir="auto"` or `unicode-bidi: plaintext` on the block, never on individual split lines.
- **SVG drawings** (charts, maps, diagrams, elevations) get `direction="ltr"` on the `<svg>` plus an explicit `text-anchor`. Mirror a drawing only on purpose.
- Punctuation belongs at the inline-end of the Hebrew sentence. Don't type it at the visual left, and don't swap brackets.
- **Prices**: `Intl.NumberFormat('he-IL', {style: 'currency', currency: 'ILS'})`, with ₪ after the number in Hebrew (`290 ₪`), `tabular-nums`, and western digits with comma thousands. In WooCommerce, use currency position `right_space` for he-IL.
- **Placeholders**: `[להשלמה: …]` inside `<span class="todo" dir="auto">`, so the brackets stay with their text.

## Israeli market notes (from the scan of ~320 Israeli sites)

The Israeli market is overwhelmingly template-grade: 86% tier C, with the award signal concentrated in about 10 studios. The **local template look** shows up on 53% of Hebrew pages and 20% of the A/B tier. It's three or more of:

- a floating WhatsApp button,
- an accessibility overlay icon,
- a neutral Google Hebrew sans display at ≤ 72px,
- a lead form or phone number in the hero.

The skill steers away from it (attractor A14), and also from these:

- **A15, the floating object stack**: 3–5 fixed objects over content. The rule is at most one floating object besides the header. WhatsApp is a designed link, not a bubble.
- **A16, the dark-purple "AI agency" template in Hebrew**: night gradient, glowing pills, stat strip, device mockups.
- **A17, Hebrew stack inflation**: 4+ families caused by widget fonts.

What tier-A Hebrew sites do instead:

- one 88–200px Hebrew statement on a flat pale sheet (cool grey, white or charcoal),
- one saturated field colour used as a whole section or footer, not as button confetti,
- built proof (maps, diagrams, live data, real lists) instead of "+120 satisfied clients" strips,
- built imagery (isometric objects, cut paper, drawn grids) instead of stock handshakes, gavels and device mockups,
- 5–8 sections, each a different device,
- a designed closing footer.

**Accessibility (SI 5568 / WCAG 2.2 AA).** The site itself must conform, and it publishes an **accessibility statement** (הצהרת נגישות: standard, coordinator contact, audit date, known limitations), which is a **core page** for every Israeli site. Overlay toolbars aren't compliance and aren't used. The statement link goes in the footer.

**Stores**:

- a utility bar with the *real* free-shipping threshold,
- a category strip as the first content (cut-outs on the canvas, not icons),
- ₪ prices with a struck price and % flag,
- installments and local wallet/payment badges on the PDP and checkout (not on Home),
- a cancellation policy page (מדיניות ביטולים) and business identity (registration number, address, phone) in the footer,
- an unchecked marketing-consent checkbox,
- a swappable seasonal banner slot (ACF) for the holidays instead of a promo carousel.

**Platforms.** The local market is WordPress + Elementor. Award-level Israeli work is custom WordPress + GSAP or a design-tool site + GSAP + Lenis, which is exactly what the skill outputs.

## Directions that work best in Hebrew

Strongest:

- `kikar-heavy`, designed Hebrew-first: a heavy wide Hebrew statement on a pale cool sheet, a built object and one hot field colour,
- `work-wall-neutral`, `swiss-signal-grid`, `architect-calm`, `telemetry-terminal`, `index-mono-gallery`, `storybook-sketch`, `neo-brutal-exhibit`, `organic-colour-block`, `herbarium`, `forest-bone-heritage`.

Weakest, because part of the signature depends on Latin-only features (caps, width axis, script): `couture-condensed`, `estate-didone`, `cold-chrome-luxury`, `film-title-bands`. Use their RTL notes.

Every specimen is also shot in RTL: see the [RTL montage](../studio-design/directions/_specimens/_montage.rtl.jpg).
