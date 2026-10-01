---
name: void-stage
title: Void Stage
status: attractor-guarded   # dark + 3D sits next to A7 (dark AI hero + floating 3D); see Guard
tagline: "A black exhibition hall after hours: the work hangs in real 3D space — a ring of panels, a wireframe room, a spine of slivers — the interface shrinks to four corner labels, and nothing else competes."
axes: { paper_band: dark, display_style: wide-grotesk, accent_hue: warm, radius_system: soft, density: 3, variance: 8, motion: 9 }
fits: [company, landing]
subjects_good: [design and motion studios, creative directors, architecture visualisation, virtual exhibitions, galleries and museums online, car and product launches, game studios, music releases, fashion archives, photographers with large archives]
subjects_bad: [e-commerce catalogues, law, clinics, NGOs, text-heavy services, public sector, low-bandwidth audiences, anything needing SEO body copy on the home page]
neighbours: [apparatus-night, darkroom-object, media-bento-night]
fonts: { display: "Mona Sans 600 wdth 112 (Google)", body: "Mona Sans 400", mono: "Fragment Mono 400 (Google)", hebrew: ["Noto Sans Hebrew", "Rubik"] }
---
# Void Stage
Specimen: _specimens/void-stage.html

## Guard
Dark + 3D is the AI-hero cliché (antipatterns A7). This direction is kept because 6 A/B award sites in the 2026-09 mass scan use a black void as a *gallery*, not as mood. Rules: the 3D content is the client's real work or a real place/object (projects, a building, a product), never an abstract sphere/blob; no purple-blue glow, no glass cards, no gradient text; every 3D scene ships a static poster frame and an HTML index of the same items (`FEATURED / FULL` toggle or a visible list link); the interface is ≤4 corner labels + one CTA.

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,400..800&family=Fragment+Mono&family=Noto+Sans+Hebrew:wght@400;500;600;700&display=swap">
*/
:root {
  --c-canvas: oklch(13% 0.004 270); --c-surface: oklch(18% 0.005 270); --c-surface-2: oklch(23% 0.005 270);
  --c-ink: oklch(94% 0.003 270); --c-ink-2: oklch(79% 0.003 270); --c-muted: oklch(66% 0.004 270);
  --c-rule: oklch(94% 0.003 270 / 0.14); --c-accent: oklch(68% 0.19 42); --c-accent-ink: oklch(13% 0.004 270);
  --c-focus: oklch(68% 0.19 42);
  --f-display: "Mona Sans", "Noto Sans Hebrew", system-ui, sans-serif; --f-body: "Mona Sans", "Noto Sans Hebrew", system-ui, sans-serif;
  --f-mono: "Fragment Mono", "Noto Sans Hebrew", ui-monospace, monospace; --f-outlier: "Fragment Mono", ui-monospace, monospace;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1rem; --fs-lg: 1.1875rem; --fs-xl: clamp(1.4rem, 1.15rem + 0.9vw, 1.9rem);
  --fs-2xl: clamp(2rem, 1.3rem + 2.4vw, 3.25rem); --fs-3xl: clamp(2.6rem, 1.4rem + 4vw, 5rem);
  --fs-display: clamp(3rem, 1rem + 7.4vw, 8.5rem); /* statement after the stage; the stage itself has no big type */
  --lh-tight: 0.95; --lh-body: 1.55; --tr-display: -0.035em; --tr-label: 0.08em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 20px; --sp-6: 24px; --sp-7: 32px; --sp-8: 48px; --sp-9: 80px; --sp-10: 140px;
  --section-y: clamp(80px, 7vw + 32px, 160px); --gutter: clamp(16px, 2vw, 32px); --maxw: 1600px;
  --r-sm: 6px; --r-md: 14px; --r-lg: 20px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
  --d-fast: 160ms; --d-med: 420ms; --d-slow: 1100ms;
  --shadow-1: none; --shadow-2: 0 0 0 1px var(--c-rule);
  /* direction extras */
  --stage-h: 100dvh; --hud-inset: clamp(12px, 1.4vw, 20px); --panel-w: clamp(220px, 26vw, 420px);
  --img-floor: oklch(94% 0.003 270 / 0.07); /* floor grid lines inside the stage only */
}
:root[dir="rtl"] { --f-display: "Noto Sans Hebrew", "Mona Sans", sans-serif; --f-body: "Noto Sans Hebrew", "Mona Sans", sans-serif; --tr-display: 0; --tr-label: 0; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Noto Sans Hebrew", "Mona Sans", system-ui, sans-serif; --f-body: "Rubik", "Mona Sans", "Noto Sans Hebrew", system-ui, sans-serif; }
```

## Essence
The first viewport is a stage, not a hero: a black void with a faint floor grid where the actual work stands in space (a ring of project panels, a wireframe model of the studio, a spine of image slivers, a product on a turntable). Chrome is reduced to HUD labels in the four corners (name, index/profile, view toggle, contact) in 12px mono caps. Below the stage the site turns into calm dark editorial: one wide-grotesk statement, a project index, a logo wall of cells, a footer word. Warmth comes from the work's own images and one orange state colour. Absent: abstract spheres, aurora glows, glass cards, neon lime, gradient text, scroll-jacked story chapters. Seen in: a US digital and branding studio `../references/cases/case-05-company.md`, a design-engineer portfolio `case-36-company.md`, a creative-director portfolio `case-38-company.md` (+ 3 more catalogued studio/portfolio sites, see `../references/_index.md`).

## Signature moves
1. **The stage**: `min-height: var(--stage-h)`, content arranged in 3D (CSS `preserve-3d` ring or WebGL), drag/scroll to rotate with inertia; hover/focus lifts one panel and prints its title + year in a corner label.
2. **HUD corners**: 4 fixed labels at `--hud-inset` (Fragment Mono 12px caps +0.08em): top-start name, top-end index/profile, bottom-start `FEATURED / FULL` toggle, bottom-end contact; nothing else overlays the stage.
3. **Two views of the same list**: FEATURED = stage, FULL = HTML index (rows: year · title · client · discipline) — the index is the accessible, crawlable version.
4. **Wide statement after the stage**: Mona Sans 600 at wdth 112, `--fs-display`, -0.035em, grey second line (two-tone).
5. **Logo/cell wall**: clients as a dense grid of `--c-surface` cells, 2-4px gaps, marks at 60% ink.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| void | oklch(13% .004 270) | stage + page | pure #000 |
| ink | oklch(94% .003 270) | text, active HUD | pure #fff |
| greys | ink-2 79% / muted 66% | two-tone statements, secondary HUD | opacity-dimmed text |
| orange | oklch(68% .19 42) | active toggle, focus, one CTA | glows, gradients, large fills |

## Typography
Display Mona Sans 600, `font-stretch: 112%`, -0.035em, lh 0.95, sentence case; body Mona Sans 400 16-17/1.55 (≥16); HUD + meta Fragment Mono 400 12px caps (never below 12). Hebrew: Noto Sans Hebrew 600 display, 400 body; HUD labels in Noto Sans Hebrew 500 13px (no caps/tracking), digits stay Fragment Mono in `<bdi>`.

## Layout
Stage (100dvh) → statement (8/12 cols, start) → index table or project rows (thumbnail start, title end) → logo cell wall → capabilities in 3-4 text columns → contact line → footer with the studio word at 16-20vw in `--c-surface-2` ink. Max 1600. Mobile: stage becomes a horizontal snap carousel of the same panels (no 3D), HUD collapses to top bar + bottom toggle.

## Components
- Nav: HUD corners (N10) + menu dialog (NV-FS) on mobile.
- Buttons: pill, 1px `--c-rule` outline, ink text; active/primary = orange fill with void text.
- Panels: `--r-lg` 20px media cards with a 1px rule ring; caption in mono under.
- Index rows: 1px rules, year in mono, title 24-32px, hover shows the thumbnail in the row (no cursor-follow).

## Backgrounds
The void + a perspective floor grid (`--img-floor` lines, `repeating-linear-gradient` on a rotated plane) inside the stage only. No noise, no glows.

## Motion (budget 9)
Cinematic but controlled. House ease `cubic-bezier(.16,1,.3,1)`. Signature moment: the stage (ring rotation with inertia, or a scroll-driven camera path in WebGL, 1 per site). Load: panels fly in from depth once (`z: -800 → 0`, 1.1s, stagger .04). Allowed fx: `sphere` (as a ring/cylinder), `lathe` (product on turntable), `hscroll` (mobile fallback), `counter`, `cursor` (dot only, stage only), `nav`. Banned: fade-up on every section, marquee, shader backgrounds behind text, custom scrollbars. `prefers-reduced-motion`: static ring at rest + index visible.

## Imagery
The client's real work (stills, video loops, renders) at consistent aspect (4:5 or 16:10) and grade; or a wireframe/line model of a real building/product. Never abstract 3D blobs, AI orbs, stock "tech" imagery.

## RTL notes
HUD corners swap sides via logical insets; ring rotation direction multiplies by `SD.dir()`; index rows mirror; mono years/codes stay LTR in `<bdi>`; the 3D stage itself is not mirrored (spatial content), only its labels.

## Do / Don't
- Do ship the HTML index and a poster frame; Don't make the stage the only way to reach the work.
- Do keep chrome to 4 corner labels; Don't add a nav bar, badges or a hero headline on the stage.
- Do tint the void (L 13%, chroma ≥0.004); Don't use #000 and #fff.
- Do keep orange for state; Don't let it glow.

## Palette drops
- Gallery black (default). = `tokens.css` above (AA: ink/canvas 16.9 · ink-2/canvas 10.4 · muted/canvas 6.5 · muted/surface 6.0 · accent-ink/accent 6.5 · ink/surface 15.8; accent/canvas 6.5)
- Blueprint: deep drafting blue, ice ink, cyan state (architecture/engineering viz).
  Override: `--c-canvas: oklch(21% 0.07 262); --c-surface: oklch(25.5% 0.07 262); --c-surface-2: oklch(30% 0.07 262); --c-ink: oklch(95% 0.012 250); --c-ink-2: oklch(82% 0.02 250); --c-muted: oklch(72% 0.03 250); --c-rule: oklch(95% 0.012 250 / 0.2); --c-accent: oklch(86% 0.13 190); --c-accent-ink: oklch(21% 0.07 262); --c-focus: oklch(86% 0.13 190);`
  AA: ink/canvas 15.4 · ink-2/canvas 10.2 · muted/canvas 7.2 · muted/surface 6.4 · accent-ink/accent 12.3 · ink/surface 13.7 (no blue→cyan gradients: flat fills only)
- Oxblood room: very dark red-brown void, bone ink, ice-blue state (fashion archives, music releases).
  Override: `--c-canvas: oklch(16% 0.03 20); --c-surface: oklch(20.5% 0.03 20); --c-surface-2: oklch(25% 0.03 20); --c-ink: oklch(94% 0.008 60); --c-ink-2: oklch(80% 0.01 60); --c-muted: oklch(68% 0.015 40); --c-rule: oklch(94% 0.008 60 / 0.16); --c-accent: oklch(82% 0.09 230); --c-accent-ink: oklch(16% 0.03 20); --c-focus: oklch(82% 0.09 230);`
  AA: ink/canvas 16.3 · ink-2/canvas 10.4 · muted/canvas 6.7 · muted/surface 6.2 · accent-ink/accent 11.4 · ink/surface 15.1

## Knobs
Stage type (ring / cylinder wall / wireframe room / spine slivers / turntable object); interaction (drag / scroll / auto-rotate); floor grid on/off; statement voice (two-tone / single); logo wall vs client table; footer word on/off.
