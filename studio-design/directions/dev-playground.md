---
name: dev-playground
title: Dev Playground
status: attractor-guarded   # source look is near-black + lime; re-coloured, see Guard
tagline: "A toy box on a warm charcoal workbench: giant cream letters that swap and wobble, chunky candy shapes you can fling, and real code that runs."
axes: { paper_band: dark, display_style: grotesk-giant, accent_hue: multi, radius_system: soft, density: 5, variance: 8, motion: 9 }
fits: [landing, company]
subjects_good: [developer libraries, animation tools, creative coding, no-code builders, hackathons, design-engineering studios, API products with personality]
subjects_bad: [law, medical, luxury, funeral, government forms]
neighbours: [media-bento-night, inflatable-pop, billboard-type]
fonts: { display: "Cabinet Grotesk 800 (Fontshare)", body: "Figtree 400 (Google)", mono: "JetBrains Mono", hebrew: ["Heebo", "Cousine"] }
fallback: { display: "Epilogue 800 (Google)" }  # nearest free Google face if Fontshare is not self-hosted
---
# Dev Playground
Specimen: _specimens/dev-playground.html

## Guard
gsap.com's own look uses near-black + lime (a current attractor). Here the canvas is WARM charcoal (hue 60) and the accent set is tangerine/lilac/sky; lime and acid green are banned. Every kinetic effect must be demonstrable as the product's capability or be removed.

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,800,900&display=swap">
<!-- Google fallback (used when Fontshare is not self-hosted; self-host Fontshare in fonts/ for production, see _index.md): -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500;800;900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Heebo:wght@400;800;900&family=Cousine:wght@400&display=swap">
*/
:root {
  --c-canvas: oklch(19% 0.010 60); --c-surface: oklch(24% 0.012 60); --c-surface-2: oklch(30% 0.014 60);
  --c-ink: oklch(93% 0.030 90); --c-ink-2: oklch(82% 0.030 85); --c-muted: oklch(66% 0.020 70);
  --c-rule: oklch(34% 0.014 60); --c-accent: oklch(75% 0.16 55); --c-accent-ink: oklch(19% 0.010 60);
  --c-focus: oklch(80% 0.10 300);
  --c-lilac: oklch(80% 0.10 300); --c-sky: oklch(80% 0.10 230); --c-candy: oklch(78% 0.14 350); /* shapes only */
  --f-display: "Cabinet Grotesk", "Epilogue", "Heebo", system-ui, sans-serif; --f-body: "Figtree", "Heebo", system-ui, sans-serif;
  --f-mono: "JetBrains Mono", "Cousine", ui-monospace, monospace; --f-outlier: "JetBrains Mono", monospace;
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1.0625rem; --fs-lg: 1.3125rem; --fs-xl: clamp(1.7rem, 1.4rem + 1.2vw, 2.4rem);
  --fs-2xl: clamp(2.6rem, 1.7rem + 3.4vw, 4.75rem); --fs-3xl: clamp(3.6rem, 2rem + 7vw, 9rem);
  --fs-display: clamp(4.5rem, 0.8rem + 13vw, 14rem);
  --lh-tight: 0.86; --lh-body: 1.55; --tr-display: -0.045em; --tr-label: 0.01em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 52px; --sp-8: 84px; --sp-9: 128px; --sp-10: 184px;
  --section-y: clamp(72px, 7vw + 28px, 176px); --gutter: clamp(16px, 3vw, 44px); --maxw: 1440px;
  --r-sm: 10px; --r-md: 20px; --r-lg: 32px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.34, 1.3, 0.64, 1); --ease-in: cubic-bezier(0.55, 0, 1, 0.45); --ease-in-out: cubic-bezier(0.68, -0.2, 0.32, 1.2);
  --d-fast: 150ms; --d-med: 420ms; --d-slow: 900ms;
  --shadow-1: 0 0 0 1px var(--c-rule); --shadow-2: 0 30px 60px -30px oklch(8% 0.01 60 / 0.9);
}
:root[dir="rtl"] { --lh-tight: 0.98; --tr-display: -0.01em; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Cabinet Grotesk", "Epilogue", system-ui, sans-serif; --f-body: "Heebo", "Figtree", system-ui, sans-serif; }
```

## Essence
Warm charcoal workbench, cream giant letters (13vw+) that behave: letters swap, stretch and bounce on hover and scroll. Chunky candy shapes (pill, star, torus, squiggle) in tangerine/lilac/sky/candy float around and can be dragged/flung. Real code snippets sit beside the effects they produce. Playful overshoot is the house physics. Absent: acid lime, neon glows, gradient text, generic dark SaaS cards.

## Signature moves
1. Kinetic hero word: `text-fx` letter swap (each char cycles alt glyphs/weights on hover), plus scroll-scrubbed letter-spacing expansion.
2. Flingable shapes: SVG/CSS shapes with GSAP Draggable + inertia (free in 3.15), bounce off section bounds; keyboard alternative: buttons to shuffle.
3. Code + result pairs: a mono snippet (real, copyable) next to a live demo tile executing that exact code.
4. Sticker-colour section tabs: showcase categories as rounded 32px tiles in the four shape colours.
5. Cursor as a tool: `cursor` module shows a small label ("drag", "play") over interactive zones only.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| charcoal | oklch(19% .01 60) | canvas | cool black / neutral #111 |
| workbench steps | 24/30% L hue 60 | tiles, code blocks | glass |
| cream | oklch(93% .03 90) | display + text | pure white |
| tangerine | oklch(75% .16 55) | primary CTA, links hover | lime replacement tricks |
| lilac / sky / candy | tokens | shapes, category tiles | text |

## Typography
Display Cabinet Grotesk 800, -0.045em, lh 0.86, lowercase. H2 Cabinet Grotesk 800 `--fs-2xl`. Body Figtree 400 17px. Code JetBrains Mono 14px/1.6 on surface with 20px radius. Ratio 1.5+. Hebrew: Heebo 900 display (lh 0.98), Heebo 400 body, Cousine for Hebrew in code comments.

## Layout
12-col, max 1440px. Hero: giant word spanning full width, one sentence + 2 CTAs (Get started / Docs) under it, shapes scattered. Sections: code+demo pairs (alternating but ≤2 zigzags in a row; third is a full-width demo), showcase tiles, plugins index, pricing in 3 rounded tiles. Affinity: Component Playground, Marquee Hero, Bento, Workbench. Rejects: Long Document, Letter, Specimen.

## Components
- Nav: command bar (N9, not the AI nav #33): the wordmark as a sticker at inline-start, then one mono input-like strip `> docs  examples  pricing  changelog` where each word is a link and ⌘K opens search; "Get started" is a keycap button (`⏎ Get started`, tangerine face, 2px bottom edge). GitHub stars only if real. 56px.
- Footer: giant cream wordmark that reacts to cursor + index columns + a real changelog link.
- Buttons: pill 50px, tangerine fill charcoal text 600; hover = squash with overshoot; secondary = cream 1.5px ring.
- Cards: tiles radius 20–32px, surface fill, no border; demo tiles with 1px rule ring.
- Product card (plans/plugins): tile with shape icon in its colour, name 700, price/licence line.

## Backgrounds
Flat charcoal; `.bg-dots` 24px at 6% cream in code sections; `.bg-grain` 3%. shader-bg `grain-gradient` in charcoal→surface only behind the footer.

## Motion (budget 9)
House ease overshoot `cubic-bezier(.34,1.3,.64,1)` 420ms for toys, `--ease-in-out` for UI. Signature: hero letters explode/reassemble with scroll (SplitText chars, scrub, rotation ±20°, y ±40px), settling at section end. Allowed: `text-fx`, `split-reveal`, `magnetic`, `cursor`, `hscroll` (showcase), `stack-cards`, `marquee` (one: showcase logos, real), `counter` (real downloads), `accordion`, `footer-reveal`. Must: reduced-motion shows static word and shapes.

## Imagery
Real showcase screenshots/videos from users (credited), 3D-ish candy shapes (CSS/SVG), code. Never: stock developers at laptops, glowing circuit art, fake terminal windows.

## RTL notes
Code blocks `dir="ltr"`; shapes' physics use `SD.dir()` for initial fling; hero word in Hebrew uses Heebo 900 and letter swap cycles through weights (no alternate glyphs).

## Do / Don't
- Do real, runnable snippets; Don't show pseudo-code.
- Do warm charcoal; Don't slip to #0B0B0B + lime.
- Do overshoot on toys; Don't overshoot the cart or forms.
- Do provide a static fallback; Don't trap reduced-motion users in animation.
- Do ≤4 shape colours; Don't add gradients to shapes.
- Do one marquee; Don't add tickers to every section.

## Palette drops
- Charcoal + tangerine (default). = `tokens.css` above (AA: ink/canvas 15.1 · ink-2/canvas 10.6 · muted/canvas 5.9 · muted/surface 5.3 · accent-ink/accent 7.9 · ink/surface 13.4)
- Plum bench: canvas oklch(19% .03 330), ink oklch(94% .02 90), accent oklch(82% .14 95) butter, shapes sky/mint/tangerine.
  Override: `--c-canvas: oklch(19% 0.03 330); --c-surface: oklch(24% 0.03 330); --c-surface-2: oklch(30% 0.03 330); --c-ink: oklch(94% 0.02 90); --c-ink-2: oklch(82.9% 0.02 90); --c-muted: oklch(62.2% 0.02 90); --c-rule: oklch(94% 0.02 90 / 0.16); --c-accent: oklch(82% 0.14 95); --c-accent-ink: oklch(19% 0.03 330); --c-focus: oklch(82% 0.14 95);`
  AA: ink/canvas 15.6 · ink-2/canvas 11.0 · muted/canvas 5.2 · muted/surface 4.6 · accent-ink/accent 10.7 · ink/surface 13.9
- Daylight playground: canvas oklch(96% .01 90), ink oklch(20% .01 60), accent oklch(62% .2 30), shapes lilac/sky/candy.
  Override: `--c-canvas: oklch(96% 0.01 90); --c-surface: oklch(93% 0.01 90); --c-surface-2: oklch(90% 0.01 90); --c-ink: oklch(20% 0.01 60); --c-ink-2: oklch(33.7% 0.01 60); --c-muted: oklch(51.4% 0.01 60); --c-rule: oklch(20% 0.01 60 / 0.16); --c-accent: oklch(62% 0.2 30); --c-accent-ink: oklch(20% 0.01 60); --c-focus: oklch(62% 0.2 30);`
  AA: ink/canvas 16.1 · ink-2/canvas 10.6 · muted/canvas 5.0 · muted/surface 4.6 · accent-ink/accent 4.5 · ink/surface 14.8

## Knobs
Hero word (brand / verb / "hello"); shape count 3–9; flingable vs parallax-only; code+demo pairs count; display case; cursor labels on/off.
