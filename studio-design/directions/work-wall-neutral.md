---
name: work-wall-neutral
title: Work Wall Neutral
tagline: "A studio's grey pin-up wall: one grotesk at one weight, a 17px caption beside a 270px client name, no colour of its own, and every project arriving in its client's colour."
axes: { paper_band: light, display_style: neo-grotesk, accent_hue: neutral, radius_system: sharp, density: 5, variance: 7, motion: 5 }
fits: [company, landing]
subjects_good: [web and digital agencies, branding studios, product design studios, architecture and interior studios with strong photography, photographers and directors, production companies, freelancers with 6+ real projects, publishers of client work (case-study libraries), design-led consultancies]
subjects_bad: [e-commerce catalogues, clinics, kids, restaurants, NGOs without visual work, single-product brands, anything with fewer than 4 real projects to show]
neighbours: [architect-calm, swiss-signal-grid, whisper-studio, cell-ledger]
fonts: { display: "Schibsted Grotesk 500 (Google)", body: "Schibsted Grotesk 500", hebrew: ["Heebo 500"] }
---
# Work Wall Neutral
Specimen: _specimens/work-wall-neutral.html

Evidence (2026-10 agency own-site scan, `../references/agency-sites.md` §2, §5, §8; ~12 of 64 A/B studios): a Portuguese digital studio (one commercial grotesk at 400 only, 15→270px, white/black, `../references/cases/case-10-company.md`), a New York product agency (white + client-colour case fields in the clients' brand blues, 112px outcomes, `case-87-company.md`), an Amsterdam brand agency (cream column, one caps voice, portrait campaign wall, `case-09-company.md`), a New York brand consultancy (no accent, programme rows, impact numbers, `case-13-company.md`), a large global agency (one Helvetica voice, case = stacked name, `case-68-company.md`), a New York independent studio (184px client names, `case-32-company.md`), a large international design partnership (one face, captions as the only ornament, `case-60-company.md`).

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500&family=Heebo:wght@500&display=swap">
*/
:root {
  --c-canvas: oklch(93.4% 0.0015 90); --c-surface: oklch(97.6% 0.001 90); --c-surface-2: oklch(89% 0.002 90); /* #e9e9e8 studio wall */
  --c-ink: oklch(19% 0.002 90); --c-ink-2: oklch(33% 0.002 90); --c-muted: oklch(48% 0.002 90);
  --c-rule: oklch(19% 0.002 90 / 0.14); --c-accent: oklch(19% 0.002 90); --c-accent-ink: oklch(93.4% 0.0015 90); /* zero accent: the "accent" is ink */
  --c-focus: oklch(19% 0.002 90);
  --f-display: "Schibsted Grotesk", "Heebo", system-ui, sans-serif; --f-body: "Schibsted Grotesk", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; /* not used: years and counts are tabular-nums in the one face */
  --fs-xs: 0.8125rem; --fs-sm: 0.9375rem; --fs-base: 1.0625rem; /* 17px: captions, nav, body — the floor of the jump */
  --fs-lg: clamp(1.25rem, 1.1rem + 0.45vw, 1.4375rem);  /* 23px */
  --fs-xl: clamp(1.75rem, 1.3rem + 1.2vw, 2.3125rem);   /* 37px */
  --fs-2xl: clamp(2.25rem, 1.4rem + 2.4vw, 3.6rem);     /* 57.6px */
  --fs-3xl: clamp(2.5rem, 1.2rem + 3.9vw, 4.6875rem);   /* 75px statement */
  --fs-display: clamp(5.5rem, 1rem + 17.6vw, 16.875rem); /* 88 → 270px: client names, years, counts — never sentences */
  --lh-tight: 0.88; --lh-body: 1.4; --tr-display: -0.055em; --tr-label: 0;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 72px; --sp-9: 120px; --sp-10: 200px;
  --section-y: clamp(72px, 7vw + 24px, 168px); --gutter: clamp(12px, 1.2vw, 18px); --maxw: 1920px; /* tight gutters, edge-to-edge wall */
  --r-sm: 2px; --r-md: 4px; --r-lg: 4px; --r-pill: 999px; /* sharp; the pill exists only for the floating mobile nav */
  --ease-out: cubic-bezier(0.25, 1, 0.5, 1); --ease-in: cubic-bezier(0.5, 0, 0.75, 0); --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --d-fast: 150ms; --d-med: 400ms; --d-slow: 900ms;
  --shadow-1: none; --shadow-2: none;
  /* direction extras: project tones are CONTENT (ACF colour fields per project), not theme. Defaults = ink field. */
  --c-project: var(--c-ink); --c-project-ink: var(--c-canvas);
}
:root[dir="rtl"] { --tr-display: -0.01em; --fs-display: clamp(5.5rem, 1rem + 17vw, 16.25rem); --lh-tight: 0.95; } /* Heebo display: tracking at ≥64px only, see Typography */
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Schibsted Grotesk", system-ui, sans-serif; --f-body: "Heebo", "Schibsted Grotesk", system-ui, sans-serif; }
/* a project field (case hero, home work row, tone chapter): set the two project tokens from the CMS on the element */
[data-project] { --c-canvas: var(--c-project); --c-ink: var(--c-project-ink); --c-ink-2: var(--c-project-ink); --c-muted: var(--c-project-ink); --c-rule: color-mix(in oklab, var(--c-project-ink) 30%, transparent); --c-focus: var(--c-project-ink); background: var(--c-project); color: var(--c-project-ink); }
```

## Essence
The studio has no colour; the work has all of it. A neutral grey (or white) wall, ONE neo-grotesk at ONE weight (500) from the 17px caption to the 270px client name, no accent token at all, no ornaments but captions. Hierarchy comes only from a violent scale jump (17 → 75 → 270px, ratio ≈ 16) and from position. When a project appears, its **client's colour takes over a full field** (the home work row, the case hero, the next-project block); the studio's grey returns between them. Absent: accent colour, second weight, second family, mono labels, drawn grids, cards, shadows, device mockups (A24), cursor blobs, preloaders, logo marquees (A23).

## Signature moves
1. **Client-colour takeover** (CS-01 field variant, G-15): each project block sets `data-project` with `--c-project` / `--c-project-ink` from the CMS; on the home the first project field starts inside the first viewport; further projects run as `tone-shift` chapters (C-71) with one custom tone per project (`[data-tone="kelim"] { --tone-bg: var(--p-kelim); --tone-ink: … }` in site.css), so the whole canvas turns into the client's colour while its project is in view.
2. **The 17→270 jump** (ST-02 / CS-11): the client name, a year or a real count at `--fs-display` sits next to 17px captions with no intermediate size between them on the same block. Display is for names and numbers only, never sentences.
3. **Caption discipline**: every image carries a 17px two-part caption (`Client — what we did, year`) in ink, start-aligned, 12px under the image; captions are the only ornament (as on a large international design partnership's site).
4. **Colour index**: the home's project index is a 17px list where each client name has an 0.6em square of its own colour; hover/focus on a row recolours the visible field (`tone-shift` preview or a 400ms crossfade of `--c-project`).
5. **Case page skeleton** (CS-01 → CS-02 → CS-04 → CS-05 ×n → CS-08 → CS-10 → CS-11): field hero with the client name 270px + one-line outcome, meta as an end column of 17px label/value pairs, media ≥70% of the area, outcomes at 112px only when real, next project as a full field link.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| wall | oklch(93.4% .0015 90) #e9e9e8 | canvas | tinted warm (A1) or cool blue; any texture |
| plate | oklch(97.6% .001 90) | screens on plate (CS-06), forms | cards |
| ink | oklch(19% .002 90) | all text, buttons, focus, "accent" | pure #000 |
| project | per case, from the CMS | full fields only (hero, chapter, next case, index square) | text on the wall, buttons, links, hover tints |

## Typography
Schibsted Grotesk 500 only (one family, one weight; antipatterns #14 exception: hierarchy by size ratio ≥3, the face is single-weight by rule). Scale 17 · 23 · 37 · 57.6 · 75 · 270 (the Portuguese studio's exact ladder), tracking -0.055em at 270, -0.03em at 75, -0.01em at 37, 0 at ≤23. Body 17/1.4, measure 45-60ch, never longer than 90 words per block (case rule). Numbers `tabular-nums`. Hebrew: Heebo 500 one weight (same rule); tracking -0.01em only at ≥64px (declared exception to antipatterns #20, `israel.md` §1a), 0 below; lh 0.95 at display.
Why Schibsted: a neutral news grotesk closest among free, non-banned faces to the commercial neo-grotesks at medium; Inter Tight (the usual free sub) is banned (antipatterns "Banned as default fonts").

## Layout
Edge-to-edge 12-col, max 1920, tight 12-18px gutters (5px median grid gap in the scans). Home: N1a text nav → statement 75px cols 1-9 + 17px project index cols 10-12 → first project field (full-bleed, 55-100svh, client name 270px bottom-start, image overlapping the field edge at the end side) → 2-4 more project fields as tone chapters → a work wall (2-up / 3-up portrait grid, mixed spans 4/8, captions) → "Since 2014" year at 270px + team names list → capabilities as 17px ruled rows (≤7) → contact line at 75px (`mailto:`) → footer 17px. Home ≤350 words. Affinity: Work-first, Index-First, Case study. Rejects: centred manifesto + reel card (A9/A23), bento, feature triplets, sales brochure (A25).

## Components
- Nav: N1a in 17px: studio name start · `Work 24` (real count) · Studio · Journal · email at end; no pill CTA (A23). Mobile: N3 floating bottom pill (`Plenum · Menu +`) in ink with wall text — the only pill.
- Buttons: none filled by default; links are 17px with a 1px underline at 0.2em offset; the one primary action (send brief) is an ink rectangle 52px, radius 2px.
- Work tile: image at its own ratio (4:5 portrait default), radius 0, caption 17px under; hover = image scale 1.02 inside `overflow: clip` (400ms) and the caption's year swaps to `View case →` (`text-fx` roll, once per element).
- Case meta: `<dl>` end column, label in `--c-muted`, value in ink, both 17px; live link `client.com ↗` with year.
- Footer: 17px rows (offices with real local time via `Intl.DateTimeFormat` only if multi-office, socials, legal + accessibility statement), the 75px contact line above it; no giant wordmark (the 270px is spent on clients).

## Backgrounds
None. The wall is flat; project fields are flat client colours; photography carries texture.

## Motion (budget 5)
House ease `cubic-bezier(.25,1,.5,1)`, 400ms. Signature scroll moment: `tone-shift` project chapters (data-line 0.5, data-blend 0.25, `data-root` so the fixed nav inks follow the client colour). Entrance (once): the first field slides up 8% with the client name's letters settling (`split-reveal` chars, 900ms) — hero only. Allowed: `clip-reveal` (first full-bleed case image per case), `counter` (real years/counts), `text-fx` roll on captions, `flip-grid` (work filters by service/industry with counts), `scatter` only for a "many projects" chapter (G-12, H-29 variant: 6-9 project images around a 270px count). Banned: custom cursor, marquee, preloader, scroll-lit sentence (A19), page-wide parallax.

## Imagery
Real client work only: campaign photography, brand applications, flat screens on plates (CS-06), scrolling captures; portrait 4:5 and 16:10 crops, no radius. Every project gets its colour from the client's own brand (ask for HEX; check `--c-project-ink` contrast ≥4.5 at 17px, otherwise switch ink to near-black/near-white). Never stock, never device frames, never AI people.

## RTL notes
Heebo 500 carries both scripts (Latin client names in Heebo too, so one family renders). Statement and index right-aligned; images overlap the field edge at the physical left. Client names stay in their own script (`Kelim` inside a Hebrew page stays Latin, wrapped in `<bdi>`); years and counts LTR. `tone-shift` is vertical (nothing to mirror); `text-fx` roll direction follows `SD.dir()`.

## Do / Don't
- Do one weight everywhere; Don't add 700 for "emphasis" (emphasis = size or position).
- Do give the colour to the work; Don't introduce a studio accent "for links" (links are underlined ink).
- Do 270px names and numbers; Don't set a sentence at 270px.
- Do caption every image; Don't add eyebrow labels, numbering (`01 / Work`) or mono meta (A6, A13).
- Do let a project field take the whole width; Don't frame it as an inset rounded card (A10).
- Do keep the home ≤350 words with work in sections 1-2; Don't put services before work (A25).

## How it differs from its neighbours (and from index-mono-gallery)
- `swiss-signal-grid`: no drawn 12-col grid, no signal ink, no heavy lowercase display; weight is 500 everywhere and the only colour is the client's.
- `whisper-studio`: not whisper-weight (500, not 200-300), no violet-tinted paper, no colour inside artwork frames; the display is a 270px name, not a calm sentence.
- `architect-calm`: the voice is not calm: a 16× scale jump and full client fields; architect-calm keeps a cool accent, 400 weight and pinned-print photo staggering.
- `cell-ledger`: no ruled cells, no dither, no mint live cell; images are full colour client work.
- `index-mono-gallery`: no mono, no scattered object wall at human scale, no catalogue numbers; mid-grey wall vs. light wall, archival-blue accent vs. none.

## Palette drops
- Studio grey (default). = `tokens.css` above (AA: ink/canvas 15.2 · ink-2/canvas 10.1 · muted/canvas 5.4 · muted/surface 6.1 · accent-ink/accent 15.2 · ink/surface 17.2; accent = ink, no chromatic accent)
- Paper white (as on 3 of the evidence studios): near-white wall, grey plates.
  Override: `--c-canvas: oklch(98.3% 0.001 90); --c-surface: oklch(95.5% 0.0015 90); --c-surface-2: oklch(91% 0.002 90); --c-ink: oklch(19% 0.002 90); --c-ink-2: oklch(33% 0.002 90); --c-muted: oklch(50% 0.002 90); --c-rule: oklch(19% 0.002 90 / 0.14); --c-accent: oklch(19% 0.002 90); --c-accent-ink: oklch(98.3% 0.001 90); --c-focus: oklch(19% 0.002 90);`
  AA: ink/canvas 17.6 · ink-2/canvas 11.6 · muted/canvas 5.7 · muted/surface 5.3 · accent-ink/accent 17.6 · ink/surface 16.2
- Black room (as on 2 of the evidence studios' case pages): warm near-black wall, pale ink; client fields glow by contrast.
  Override: `--c-canvas: oklch(16% 0.006 60); --c-surface: oklch(20.5% 0.006 60); --c-surface-2: oklch(25.5% 0.006 60); --c-ink: oklch(94% 0.002 90); --c-ink-2: oklch(80% 0.002 90); --c-muted: oklch(66% 0.002 90); --c-rule: oklch(94% 0.002 90 / 0.16); --c-accent: oklch(94% 0.002 90); --c-accent-ink: oklch(16% 0.006 60); --c-focus: oklch(94% 0.002 90);`
  AA: ink/canvas 16.3 · ink-2/canvas 10.4 · muted/canvas 6.2 · muted/surface 5.8 · accent-ink/accent 16.3 · ink/surface 15.0 (paper band becomes dark: log `paper=dark`)

## Knobs
Wall drop; first viewport (statement + first field / field-only work-first / statement-only with index); project fields per home (1 / 3 / 5); jump top size (184 / 220 / 270px); index squares on/off; mobile nav (floating pill / top text); scatter chapter on/off; Hebrew swap `knobs.he_display=IBM Plex Sans Hebrew 500` (when the trio has another Heebo direction).
