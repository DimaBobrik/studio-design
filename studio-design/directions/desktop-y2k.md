---
name: desktop-y2k
title: Desktop Y2K
tagline: "A bubblegum-pink 1998 desktop you can actually use: draggable windows, a pixel dock, TV noise between channels, and a highlight blue that means 'selected'."
axes: { paper_band: light, display_style: pixel, accent_hue: cool, radius_system: "0", density: 6, variance: 9, motion: 6 }
fits: [landing, ecommerce]
subjects_good: [music apps, radio/playlists, indie games, retro merch, gaming cafés, creative communities, event microsites, youth brands]
subjects_bad: [law, clinics, banks, luxury, B2B procurement, real estate]
neighbours: [neo-brutal-exhibit, cosmic-retrofuture, inflatable-pop]
fonts: { display: "Pixelify Sans (Google)", body: "Space Mono (Google)", hebrew: ["Rubik Pixels", "Rubik"] }
---
# Desktop Y2K
Specimen: _specimens/desktop-y2k.html

## Guard
This direction deliberately draws OS chrome. Allowed only because the windows are REAL interactive containers (draggable, closable, focusable, keyboard-operable) holding the site's content. Never use window chrome to frame a fake screenshot, and always provide a linear, non-draggable reading order on mobile (<768px windows stack as full-width panels).

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Space+Mono:wght@400;700&family=Rubik+Pixels&family=Rubik:wght@400;500;700&display=swap">
*/
:root {
  --c-canvas: oklch(86% 0.075 350); --c-surface: oklch(98% 0.004 300); --c-surface-2: oklch(90% 0.006 280);
  --c-ink: oklch(16% 0.010 300); --c-ink-2: oklch(30% 0.010 300); --c-muted: oklch(45% 0.010 300);
  --c-rule: oklch(16% 0.010 300); --c-accent: oklch(50% 0.21 262); --c-accent-ink: oklch(98% 0.004 300);
  --c-focus: oklch(50% 0.21 262);
  --f-display: "Pixelify Sans", "Rubik Pixels", monospace; --f-body: "Space Mono", "Rubik", ui-monospace, monospace;
  --f-mono: "Space Mono", "Rubik", monospace; --f-outlier: "Pixelify Sans", monospace;
  --fs-xs: 0.75rem; --fs-sm: 0.8125rem; --fs-base: 0.9375rem; --fs-lg: 1.125rem; --fs-xl: 1.5rem;
  --fs-2xl: 2rem; --fs-3xl: clamp(2.5rem, 1.5rem + 3vw, 4rem); --fs-display: clamp(3rem, 1rem + 6vw, 6rem); /* snap to 16px multiples at desktop */
  --lh-tight: 1.0; --lh-body: 1.55; --tr-display: 0; --tr-label: 0;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 20px; --sp-6: 24px; --sp-7: 32px; --sp-8: 48px; --sp-9: 72px; --sp-10: 112px;
  --section-y: clamp(40px, 4vw + 16px, 96px); --gutter: clamp(12px, 2vw, 24px); --maxw: 1440px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 6px; /* dock icons only */ --r-pill: 0px;
  --ease-out: cubic-bezier(0.2, 0.9, 0.3, 1); --ease-in: cubic-bezier(0.5, 0, 1, 0.5); --ease-in-out: cubic-bezier(0.6, 0, 0.4, 1);
  --d-fast: 80ms; --d-med: 180ms; --d-slow: 360ms;
  --shadow-1: 2px 2px 0 var(--c-ink); --shadow-2: 4px 4px 0 var(--c-ink);
  --titlebar: repeating-linear-gradient(to bottom, var(--c-ink) 0 1px, transparent 1px 3px); /* pinstripes in title bars */
}
.pixel { image-rendering: pixelated; font-smooth: never; -webkit-font-smoothing: none; }
:root[dir="rtl"] { --shadow-1: -2px 2px 0 var(--c-ink); --shadow-2: -4px 4px 0 var(--c-ink); }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Rubik Pixels", "Pixelify Sans", monospace; --f-body: "Rubik", "Space Mono", ui-monospace, monospace; }
```

## Essence
The page is a desktop: bubblegum wallpaper canvas, windows with 1px ink borders and pinstriped title bars holding the real content (player, shop, about, FAQ), a pixel dock at the bottom, and classic highlight blue for selection and the primary action. Pixel type for display only, typewriter mono for reading. Absent: soft shadows, gradients (except the pinstripe), rounded cards, blur, modern pill UI.

## Signature moves
1. Real windows: `[data-window]` panels with title bar (pinstripes + close/zoom boxes that work), draggable via GSAP Draggable on ≥1024px, `z-index` raised on focus.
2. Pixel dock: 48px icons (pixel art, 2× scale, `image-rendering: pixelated`) that open windows; bounce 1 step on open.
3. TV-noise transition between "channels" (sections/pages): 240ms `.bg-scanlines` + grain burst.
4. Selection blue: selected items, active menu, primary button use highlight blue with white text, exactly like an OS.
5. Menubar at top: wordmark + real menus (Shop, Radio, About) + a clock only if the product is time-based (radio schedule).

## Colour roles
| name | value | role | never |
|---|---|---|---|
| wallpaper pink | oklch(86% .075 350) | canvas | inside windows |
| window white | oklch(98% .004 300) | window bodies | canvas |
| platinum | oklch(90% .006 280) | title bars, inactive buttons | text |
| ink | oklch(16% .01 300) | borders, text, hard shadows | soft shadow |
| highlight blue | oklch(50% .21 262) | selection, primary button | wallpaper |

## Typography
Display Pixelify Sans 600 at pixel-friendly sizes (48/64/96px); H2 Pixelify 500 32px. Body Space Mono 400 15px/1.55 (≥15px for legibility). Hebrew: Rubik Pixels for display (renders pixel Hebrew), Rubik 400 body (Space Mono has no Hebrew). Ratio fixed steps.
Weight-contrast exception (antipatterns #14): pixel display against a mono body; classification contrast.
Hebrew weights: Rubik Pixels ships one weight (400) — use it at 400 (`font-synthesis: none` in core.css blocks faux bold); never ask for 700 in Hebrew.

## Layout
Desktop ≥1024px: absolute-positioned windows on a 12-col invisible grid, initial layout curated (not random), max 3 open. Mobile: windows become stacked full-width panels with title bars as section headers. Affinity: Workbench, Component Playground, Portfolio Grid (as icons). Rejects: Long Document, Photographic, Stat-Led.

## Components
- Nav: menubar (28px) + dock (N-dock); mobile = bottom dock as tab bar.
- Footer: a "Trash"/"About this site" window with credits, legal, newsletter field.
- Buttons: 32px, platinum fill, 1px ink border, `--shadow-1`; pressed = shadow 0 + translate(2px,2px); primary = highlight blue.
- Cards: windows; list items = file rows with pixel icons.
- Product card: window with product image (pixel border), name, price, "Add" button; cart = a window with a counter in the menubar.

## Backgrounds
Canvas: `.bg-dots` 8px ink 12% (dithered wallpaper) or a tiled pixel pattern; `.bg-scanlines` for transitions; shader-bg `dithering` (pink/blue) as an optional wallpaper.

## Motion (budget 6)
Fast, stepped: window open = scale from dock icon (180ms, `steps(4)`), drag with inertia off. Signature: channel switch TV-noise between views. Allowed: `text-fx` (scramble; typewriter = recipe, no mode), `marquee` (one, in a "ticker" window), `cart`, `quickview`, `accordion`, `flip-grid` (icon view ↔ list view). Not: split-reveal, clip-reveal, Lenis smoothing (native scroll), cursor followers.

## Imagery
Pixel art icons, dithered photos (1-bit or 16-colour), album covers in square windows. Never: glossy 3D, gradients, stock photos full-colour on the wallpaper.

## RTL notes
Title-bar controls move to inline-end/inline-start per OS convention: keep close box at inline-start; menubar and dock order mirror; typewriter effect types in reading direction; Rubik Pixels for Hebrew display.

## Do / Don't
- Do make every window functional; Don't draw windows around screenshots.
- Do hard 2px shadows; Don't blur shadows.
- Do Space Mono ≥15px; Don't set 12px paragraphs.
- Do stack windows on mobile; Don't make users drag on phones.
- Do stepped motion; Don't use smooth long easing.
- Do selection blue for primary; Don't add a second accent.

## Palette drops
- Bubblegum desktop (default). = `tokens.css` above (AA: ink/canvas 12.3 · ink-2/canvas 8.7 · muted/canvas 4.7 · muted/surface 7.0 · accent-ink/accent 5.9 · ink/surface 18.3)
- Platinum 9: canvas oklch(66% .08 190) teal wallpaper (lifted from 55% for AA), windows platinum oklch(85% .004 250), highlight oklch(35% .15 265).
  Override: `--c-canvas: oklch(66% 0.08 190); --c-surface: oklch(85% 0.004 250); --c-surface-2: oklch(90% 0.004 250); --c-ink: oklch(16% 0.01 300); --c-ink-2: oklch(28% 0.01 300); --c-muted: oklch(28% 0.01 300); --c-rule: oklch(16% 0.01 300); --c-accent: oklch(35% 0.15 265); --c-accent-ink: oklch(98% 0.004 300); --c-focus: oklch(35% 0.15 265);`
  AA: ink/canvas 6.5 · ink-2/canvas 4.9 · muted/canvas 4.9 · muted/surface 9.3 · accent-ink/accent 11.1 · ink/surface 12.3; accent/canvas 3.9
- Arcade night: canvas oklch(25% .18 285) indigo, windows oklch(96% .01 95), highlight oklch(88% .17 95) yellow with ink text.
  Override: `--c-canvas: oklch(25% 0.18 285); --c-surface: oklch(96% 0.01 95); --c-surface-2: oklch(90% 0.01 95); --c-ink: oklch(16% 0.01 300); --c-ink-2: oklch(30% 0.01 300); --c-muted: oklch(42% 0.01 300); --c-rule: oklch(16% 0.01 300); --c-accent: oklch(88% 0.17 95); --c-accent-ink: oklch(16% 0.01 300); --c-focus: oklch(88% 0.17 95);`
  AA: ink/surface 17.3 · ink-2/surface 12.2 · muted/surface 7.6 · accent-ink/accent 13.6 · accent/canvas 11.1. All copy lives in windows (`--c-surface`); the indigo wallpaper carries only icon labels, which set `color: var(--c-surface)` (14.2:1) instead of `--c-ink`.

## Knobs
Wallpaper drop; draggable on/off; number of initial windows (1–3); dock position (bottom / inline-end); pixel vs photo imagery; TV-noise transitions on/off.
