---
name: kikar-heavy
title: Kikar Heavy
tagline: "A city-square notice board in Tel Aviv: one wide, black Hebrew statement on a pale cool sheet, a built object standing beside it, and one hot field colour saved for the moment you act."
axes: { paper_band: light, display_style: wide-grotesk, accent_hue: magenta, radius_system: pill, density: 4, variance: 7, motion: 5 }
fits: [company, landing, ecommerce]
subjects_good: [Israeli fintech and digital banks, insurance and pension apps, telecom and utilities, consumer apps, startups selling to Israelis, digital and content agencies, municipal and public services, cultural centres, education platforms, credit and loyalty clubs, real estate developers (statement-led), media brands]
subjects_bad: [luxury jewellery, fine dining, spa and wellness, funeral services, heritage crafts, wineries, children's brands (unless the drop is softened)]
neighbours: [swiss-signal-grid, billboard-type, organic-colour-block]
fonts: { display: "Hubot Sans 900 wdth 115 (Google)", body: "Hubot Sans 400", hebrew: ["Noto Sans Hebrew 900 / 400"] }
---
# Kikar Heavy
Specimen: _specimens/kikar-heavy.html

Hebrew-first. Built from the 2026-10 Israeli scan, where the only award-grade Hebrew voice that recurs is a **heavy statement on a flat pale sheet** (`../references/israel.md` §1a, §3; cards: a Tel Aviv branding studio `../references/cases/case-31-company.md` 100px w700 on #e4e7ea, a Tel Aviv digital studio `case-61-company.md` 200px w900 on #ebeae8 + magenta field footer, an Israeli content agency `case-15-company.md` 64px w700 + isometric plinths + grey→charcoal→orange chapters, an Israeli credit-card company `case-33-company.md` 90px + cut-paper shapes on product plates, an experimental Israeli studio `case-53-company.md` experimental display + pastel field + pill CTAs). Designed in Hebrew first; the Latin face is chosen to carry the same width and weight, not the other way round.

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hubot+Sans:wdth,wght@100..125,400..900&family=Noto+Sans+Hebrew:wght@400;900&display=swap">
*/
:root {
  --c-canvas: oklch(92.6% 0.006 250); --c-surface: oklch(96.6% 0.004 250); --c-surface-2: oklch(88% 0.008 250); /* #e4e7ea sheet, #f2f4f6 plate, #d4d8dd */
  --c-ink: oklch(25% 0.008 250); --c-ink-2: oklch(36% 0.008 250); --c-muted: oklch(47.5% 0.008 250);    /* charcoal #1f2225 */
  --c-rule: oklch(25% 0.008 250 / 0.16); --c-accent: oklch(69% 0.235 345); --c-accent-ink: oklch(20% 0.012 345); /* field magenta #f84bbc */
  --c-focus: oklch(25% 0.008 250);
  --f-display: "Hubot Sans", "Noto Sans Hebrew", system-ui, sans-serif; --f-body: "Hubot Sans", "Noto Sans Hebrew", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; /* not used for UI: numbers use --f-body tabular-nums */
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.0625rem; --fs-lg: clamp(1.15rem, 1rem + 0.45vw, 1.375rem);
  --fs-xl: clamp(1.6rem, 1.2rem + 1.2vw, 2.75rem); /* 44px service rows */
  --fs-2xl: clamp(2.25rem, 1.4rem + 2.8vw, 4.25rem); --fs-3xl: clamp(2.75rem, 1rem + 5.6vw, 6.25rem); /* 100px closing statement */
  --fs-display: clamp(3rem, 0.5rem + 9.6vw, 9.75rem); /* 48 → 146px at 1440 → 156px; wide Latin, so smaller than the Hebrew */
  --lh-tight: 0.86; --lh-body: 1.55; --tr-display: -0.025em; --tr-label: 0;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 80px; --sp-9: 128px; --sp-10: 190px;
  --section-y: clamp(80px, 8vw + 24px, 176px); --gutter: clamp(16px, 2.2vw, 40px); --maxw: 1780px;
  --r-sm: 10px; --r-md: 24px; --r-lg: 40px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --ease-in: cubic-bezier(0.64, 0, 0.78, 0); --ease-in-out: cubic-bezier(0.83, 0, 0.17, 1);
  --d-fast: 140ms; --d-med: 320ms; --d-slow: 800ms;
  --shadow-1: none; --shadow-2: none;
  /* direction extras */
  --stmt-w: 13ch;   /* statement measure when lines are not hand-broken (hand-break 2-3 short lines with <span> + nowrap); the end of the hero holds the object */
  --obj-w: clamp(280px, 38vw, 640px);
  --img-ink-side: oklch(19% 0.008 250); --img-paper-side: oklch(84% 0.008 250); --img-field-side: oklch(56% 0.22 345); --img-field-top: oklch(78% 0.17 345); /* object shading only */
}
:root[dir="rtl"] {
  --fs-display: clamp(3.25rem, 0.5rem + 11vw, 12.5rem); /* 52 → 166px at 1440 → 200px (A-tier studios at 200 and 100, A median 88) */
  --lh-tight: 0.92; --tr-display: -0.01em;           /* declared exception to antipatterns #20, see Typography */
  --stmt-w: 12ch;
}
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Noto Sans Hebrew", "Hubot Sans", system-ui, sans-serif; --f-body: "Noto Sans Hebrew", "Hubot Sans", system-ui, sans-serif; }
/* chapters (tone-shift built-in tones): ink = charcoal chapter, accent = the one field. Children re-map the ink tokens so modules
   (accordion, buttons, rules) stay legible; set on children, not on [data-tone] itself (tone-shift reads --c-ink there). */
[data-tone="ink"] > * { --c-canvas: oklch(25% 0.008 250); --c-ink: oklch(92.6% 0.006 250); --c-ink-2: oklch(84% 0.008 250); --c-muted: oklch(74% 0.008 250); --c-rule: oklch(92.6% 0.006 250 / 0.2); --c-focus: oklch(92.6% 0.006 250); } /* 12.9 / 9.8 / 6.9 on charcoal */
[data-tone="accent"] > * { --c-ink: oklch(20% 0.012 345); --c-ink-2: oklch(20% 0.012 345); --c-muted: oklch(20% 0.012 345); --c-rule: oklch(20% 0.012 345 / 0.3); --c-focus: oklch(20% 0.012 345); } /* 5.8 on magenta; pill = near-black with sheet text 16.5 */
```

## Essence
A flat, pale cool-grey sheet (#e4e7ea, the colour of the two Tel Aviv studios' home pages) carrying ONE wide heavy statement at 140-200px, start-aligned (right in Hebrew), two or three short lines, with the end ~40% of the hero left empty or given to a **built object**: isometric plinths with simple geometric pieces, cut paper shapes, or a drawn diagram. Colour is spent as whole fields, never as confetti: grey sheet → charcoal chapter → one saturated field (magenta by default) for the decisive section and the footer. One typeface family per script at two weights (900 for statements, 400 for everything else; one of the studios runs a single 700). Pill CTAs in ink. Absent: stock photography, device mockups, icon-tile service rows, stat strips, WhatsApp/accessibility floats (A14/A15), gradients, shadows, Latin caps used as decoration.

## Signature moves
1. **The statement** (H-01, hero_object `type-only` or `illustration`): Noto Sans Hebrew 900 at `--fs-display` (166-200px Hebrew, ~146px Latin Hubot Sans 900 wdth 115), lh 0.92 / 0.86, `max-inline-size: var(--stmt-w)`, start-aligned, ≤7 words in ≤3 lines. No eyebrow, no badge. Optional inline media chip after the last word (H-21: a rounded-rect video/image chip 0.8em tall, as on the branding studio's home).
2. **Built object as the exit element** (A-13 generated static art, drawn as inline SVG in token colours): 2-4 isometric plinths (charcoal / paper / field) with one primitive each (quarter disc, cube, half-sphere, stepped block), or a cut-shape cluster bleeding off the end edge (the credit-card company), or a drawn diagram of the product's mechanism. Shading comes only from `--img-*` faces, flat, no gradients.
3. **Colour-block chapters** with `tone-shift` (C-71): `data-tone="canvas" → "ink" → "accent" → "canvas"`; one accent chapter per page plus the footer. Hard-edged fallback without JS.
4. **Travelling piece** with `travel` (C-70): one primitive from the hero object (the field disc) docks in the next chapter's slot (the content agency's disc hand-off). Use on landing/company pages only, once.
5. **Lists as big rows**: services/products as 44px rows on 1px rules with a `+` toggle (`accordion`, Q-01), FAQ as a 96px title + `+` rows (the digital studio); never icon cards.
6. **Field footer** (FT-01 variant): the accent field with a 100px contact statement ("רוצים להתחיל?" / "דברו איתנו") and a pill, legal row with the accessibility-statement link; a cropped wordmark only if the hero is not already type at viewport scale (A12).

## Colour roles
| name | value | role | never |
|---|---|---|---|
| sheet | oklch(92.6% .006 250) #e4e7ea | page canvas, plates for products | warm cream (A1), pure white |
| plate | oklch(96.6% .004 250) | product plates, form fields, the paper plinth | cards with shadow |
| charcoal | oklch(25% .008 250) | all text, pill CTA fill, the `ink` chapter | pure #000 |
| field magenta | oklch(69% .235 345) | ONE chapter + the footer + the hero object's field piece | text on the sheet (2.5:1), button confetti, gradients |
| object faces | `--img-*` | side/top faces of built objects | UI, text backgrounds |

## Typography
Hebrew display Noto Sans Hebrew 900, lh 0.92, -0.01em; Hebrew body Noto Sans Hebrew 400 17/1.6 (never 300). Latin display Hubot Sans 900 at `font-stretch: 115%`, lh 0.86, -0.025em, sentence case; Latin body Hubot Sans 400 at 100% width. Mid levels use 900 too (44px rows, 68px section titles, 100px closing statement); everything else 400. Two weights only: 900 vs 400 (antipatterns #14 OK). Scale: 200/166 · 100 · 68 · 44 · 22 · 17 · 13.
Declared exception to antipatterns #20 (Hebrew lh ≥0.95, no negative Hebrew tracking): measured on every tightened Hebrew A-tier site (three studios at -0.02em, -0.01em and -0.015em; A median lh 0.9, `israel.md` §1a). Rules that make it safe: only at ≥64px, statements ≤3 lines, check every line pair for final-letter descenders (ך ן ף ץ ק) against the next line's ascenders (ל), go back to 0.95 if they touch. Below 64px Hebrew tracking is 0.
Latin pairing: Hubot Sans (OFL, Google Fonts, wdth 75-125) is chosen because at wdth 115 it has the width of Noto Sans Hebrew 900; it is not on the banned list and no other direction uses it. Fallback if unavailable: Epilogue 900. Never Inter/Montserrat/Poppins for Latin words on a Hebrew page (they ship no Hebrew and inflate the stack, A17).

## Layout
12-col, max 1780, gutters to 40px. Hero 86-100svh: statement cols 1-8 from the start edge, top third; lede (22px, ≤40ch) + pill CTA + one text link under it; the object in cols 8-12 anchored to the bottom end, overlapping the hero's bottom edge by ≤10% into the next chapter. Chapters: each section one device (statement, rows, object, data, quote), padding top 1.4× bottom, 5-8 sections. Affinity: Manifesto, Statement + Object, Colour-block Story, Q&A rows. Rejects: Bento, card triplets, photo film band (A11/A21), centred hero (only ONE centred statement per site, Israeli A sites centre at most one).

## Components
- Nav (N1a/N10 mix, 80px, static, sheet colour): wordmark at inline-start; 3-4 text links; one charcoal pill (`פתיחת חשבון`, `צרו קשר`). A **Latin wordmark keeps its physical left position on Hebrew pages** (two A-tier Israeli sites, `israel.md` §4); write it in DESIGN.md so nobody "fixes" it. EN switch as a short text link at the end.
- Buttons: pill 52px, charcoal fill, sheet text, 17px 400; hover = fill slides to field magenta with accent-ink text (clip-path from inline-start, 320ms); secondary = underlined text link 2px. On the field chapter the pill stays charcoal.
- Rows: 44px 900 titles, 1px `--c-rule` lines, 17px description revealed by `accordion`; `+` rotates 45°.
- Product plates (store): tall `--c-surface` plates, radius 40px, product render centred, name 22px 900, price after the number (`12,900 ₪`, `<bdi>`), round arrow button 56px in the bottom-end corner (as on the credit-card company's plates).
- Data cards (proof): real live values (rates, opening hours, queue times) in 68px 900 tabular-nums on `--c-surface` plates with a source line; never invented KPIs.
- Footer: field chapter (see move 6), legal row: הצהרת נגישות · פרטיות · תנאי שימוש · credit.

## Backgrounds
Flat sheet. Chapters are flat tones. The only texture allowed: a 3% grain on the field chapter (`.bg-grain`), off by default. No shader-bg, no blobs, no photo backdrops under the statement.

## Motion (budget 5)
House ease `cubic-bezier(.22,1,.36,1)`. Entrance (once): statement lines rise from a mask (`split-reveal` lines, 800ms, 60ms stagger), the object's pieces drop onto their plinths (y -40 → 0, 500ms, stagger 80ms). Signature scroll moment: `tone-shift` chapters (data-line 0.55, data-blend 0.3) with one `travel` hand-off of a field piece. Allowed: `accordion`, `counter` (real data only), `marquee` none, `nav`. Banned: cursor followers, parallax on text, scroll-lit sentence (A19), magnetic buttons, preloader.

## Imagery
Built, not shot: isometric primitives, cut geometric shapes, product renders on plates, drawn mechanism diagrams, maps. If the brand needs people: grainy candid photography in one tall frame per chapter (as the digital studio does), never stock handshake/laptop/doctor (A14), never device mockups (A24).

## RTL notes
Hebrew is the primary script: author copy in Hebrew first, then fit the Latin (it runs ~12% wider per word at the same size, hence the smaller Latin `--fs-display`). Statement and lists right-aligned; object at the physical left. Numbers, %, ₪ and phone numbers in `<bdi>` / `dir="ltr"`; `*1234`-style star codes LTR. Directional arrows `.flip-x`; `travel` arc/spin and the button fill direction multiply by `SD.dir()`. Hebrew has no caps: never use Latin caps as the "premium" layer here.

## Do / Don't
- Do one statement per viewport at ≥140px (Hebrew); Don't set a 48-72px bold Heebo/Assistant centred H1 (that is the local template, A14).
- Do spend the field colour as whole chapters; Don't sprinkle magenta on icons, badges and links.
- Do build the imagery (objects, diagrams); Don't use stock or device mockups.
- Do check final letters at lh 0.92; Don't go below 0.88 without a line-pair check.
- Do keep the pill CTA charcoal; Don't add a second pill style or a floating WhatsApp bubble (design a labelled link instead, A15).
- Do keep two weights (900/400); Don't add 500/600/700 "hierarchy".

## Palette drops
- Kikar magenta (default). = `tokens.css` above (AA: ink/canvas 12.9 · ink-2/canvas 8.7 · muted/canvas 5.4 · muted/surface 6.0 · accent-ink/accent 5.8 · ink/surface 14.5; accent/canvas 2.5 (<3: magenta is a field/fill only, never text or a 1px line on the sheet))
- Lab orange on charcoal (dark sheet, as on the content agency): charcoal canvas, pale-grey ink, orange field.
  Override: `--c-canvas: oklch(27.5% 0.01 235); --c-surface: oklch(32% 0.01 235); --c-surface-2: oklch(37% 0.01 235); --c-ink: oklch(93% 0.004 235); --c-ink-2: oklch(82% 0.006 235); --c-muted: oklch(70% 0.008 235); --c-rule: oklch(93% 0.004 235 / 0.16); --c-accent: oklch(66% 0.17 37); --c-accent-ink: oklch(18% 0.01 235); --c-focus: oklch(93% 0.004 235);`
  AA: ink/canvas 12.1 · ink-2/canvas 8.5 · muted/canvas 5.6 · muted/surface 4.7 · accent-ink/accent 5.6 · ink/surface 10.3; accent/canvas 4.4 (orange may carry ≥24px display words). The `ink` chapter becomes the pale chapter (`[data-tone="ink"]` = sheet colour with charcoal text): swap roles, keep one field.
- Signal red on bone (warm pale, as on an Israeli investment firm): canvas #e9e8e6, near-black ink, red field.
  Override: `--c-canvas: oklch(93.2% 0.003 85); --c-surface: oklch(97% 0.002 85); --c-surface-2: oklch(88.5% 0.004 85); --c-ink: oklch(21% 0.004 60); --c-ink-2: oklch(33% 0.004 60); --c-muted: oklch(47.5% 0.004 60); --c-rule: oklch(21% 0.004 60 / 0.16); --c-accent: oklch(61% 0.235 28); --c-accent-ink: oklch(16% 0.004 60); --c-focus: oklch(21% 0.004 60);`
  AA: ink/canvas 14.5 · ink-2/canvas 10.0 · muted/canvas 5.5 · muted/surface 6.1 · accent-ink/accent 4.6 · ink/surface 16.3; accent/canvas 3.5 (red as display text ≥24px allowed, body never). Object faces: `--img-field-side: oklch(50% 0.2 28); --img-field-top: oklch(72% 0.17 28);`. Keep it away from A1 (no serif, no terracotta): the red is a signal, the sheet stays grey-bone, not cream.

## Knobs
Field drop; statement size (140 / 166 / 200px Hebrew); object (isometric plinths / cut shapes / diagram / none = type-only); inline media chip on/off; chapters (2 / 3 / 4 tones); travel hand-off on/off; Hebrew display swap `knobs.he_display=Heebo 900` (the digital studio's look: lh 0.88, narrower, use when the trio already has Noto Sans Hebrew); Latin wordmark position (physical left / inline-start).

## Fits / neighbours (why)
- vs `swiss-signal-grid`: no drawn grid, no signal ink rationed to ≤3%; the field colour is a whole chapter, radius is pill, the object is built 3D, Hebrew is 166-200px not ~120px.
- vs `billboard-type`: the canvas is a pale sheet, not a saturated field; the statement is wide and heavy, not condensed caps cropped by the screen; it carries objects and products.
- vs `organic-colour-block`: hard geometric primitives and a heavy sans, not soft blobs and a chunky serif; one field colour, not three.
