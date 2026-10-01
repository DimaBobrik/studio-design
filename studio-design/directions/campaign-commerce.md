---
name: campaign-commerce
title: Campaign Commerce
tagline: "A sportswear drop: extended heavy caps punched across the campaign photo, grey-swatch product plates, and a UI that stays silent so the shoot can shout."
axes: { paper_band: light, display_style: extended-heavy, accent_hue: warm, radius_system: pill, density: 6, variance: 6, motion: 4 }
fits: [ecommerce, landing]
subjects_good: [sportswear, sneakers, streetwear, bikes, fitness equipment, running events, team merch, outdoor gear stores]
subjects_bad: [law, clinics, luxury jewellery, spa, fine dining, B2B SaaS]
neighbours: [couture-condensed, film-title-bands, billboard-type]
fonts: { display: "Anybody 900 wdth 125 (Google)", body: "Albert Sans 400/600 (Google)", hebrew: ["Heebo"] }
---
# Campaign Commerce
Specimen: _specimens/campaign-commerce.html

## tokens.css
```css
/* fonts:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@75..150,400..900&family=Albert+Sans:wght@400;500;600;700&family=Heebo:wght@400..900&display=swap">
*/
:root {
  --c-canvas: oklch(98.8% 0.003 240); --c-surface: oklch(95.6% 0.004 240); --c-surface-2: oklch(91% 0.005 240);
  --c-ink: oklch(17% 0.010 250); --c-ink-2: oklch(34% 0.010 250); --c-muted: oklch(53.2% 0.008 250);
  --c-rule: oklch(88% 0.005 240); --c-accent: oklch(58% 0.215 33); --c-accent-ink: oklch(98.8% 0.003 240);
  --c-focus: oklch(55% 0.18 255);
  --f-display: "Anybody", "Heebo", system-ui, sans-serif; --f-body: "Albert Sans", "Heebo", system-ui, sans-serif;
  --f-mono: ui-monospace, Menlo, monospace; --f-outlier: "Anybody", sans-serif; /* outlier slot: price in sale */
  --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1rem; --fs-lg: 1.125rem; --fs-xl: clamp(1.4rem, 1.2rem + 0.8vw, 1.9rem);
  --fs-2xl: clamp(2rem, 1.4rem + 2.4vw, 3.4rem); --fs-3xl: clamp(2.75rem, 1.6rem + 4.6vw, 5.75rem);
  --fs-display: clamp(3rem, 0.8rem + 8.6vw, 9rem);
  --lh-tight: 0.88; --lh-body: 1.5; --tr-display: -0.015em; --tr-label: 0.01em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 20px; --sp-6: 28px; --sp-7: 40px; --sp-8: 64px; --sp-9: 96px; --sp-10: 144px;
  --section-y: clamp(48px, 5vw + 20px, 120px); --gutter: clamp(12px, 2.4vw, 40px); --maxw: 1920px;
  --r-sm: 0px; --r-md: 0px; --r-lg: 0px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1); --ease-in: cubic-bezier(0.32, 0, 0.67, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --d-fast: 150ms; --d-med: 280ms; --d-slow: 600ms;
  --shadow-1: none; --shadow-2: 0 16px 40px -20px oklch(17% 0.01 250 / 0.35);
}
.display { font-variation-settings: "wdth" 125; font-weight: 900; text-transform: uppercase; }
:root[dir="rtl"] { --lh-tight: 1.0; --tr-display: 0; }
/* Hebrew pages: Hebrew faces lead both stacks (they include Latin), so a Hebrew page renders at most the Hebrew display + Hebrew body faces (+ declared mono/outlier). Knob "latin-display": drop this block to keep the Latin display face for Latin words (then it counts as a 3rd family). */
:root:where([lang="he"]) { --f-display: "Heebo", "Anybody", system-ui, sans-serif; --f-body: "Heebo", "Albert Sans", system-ui, sans-serif; }
```

## Essence
Photography does the talking; chrome is white, ink and one grey swatch. Display is extended, black-weight uppercase burned across campaign images (text over photo, not beside it). Product cards have 0 radius, 0 shadow, 0 padding: the photograph on its grey swatch IS the card. The only non-neutral in retail chrome is the sale/drop flame colour. Absent: gradients, decorative icons, rounded product cards, lifestyle copy.

## Signature moves
1. Extended caps (Anybody 900 wdth 125) crossing a full-bleed campaign image at 12–18% of image height.
2. Rhythm: one full-bleed editorial tile, then a 2-up or 4-up product grid, alternating down the page.
3. Grey swatch plates (`--c-surface`) behind every packshot, image fills 100% of the tile.
4. Sticky filter/sort bar (pills) on PLP that condenses to 48px on scroll.
5. Sale flame colour only for price-drop, "new" markers and the cart count.

## Colour roles
| name | value | role | never |
|---|---|---|---|
| white | oklch(98.8% .003 240) | canvas | cream/bone |
| swatch | oklch(95.6% .004 240) | product plates, input fields | section backgrounds everywhere |
| ink | oklch(17% .01 250) | text, primary CTA fill | 2nd accent |
| flame | oklch(58% .215 33) | sale price, drop tag, cart dot | CTA fill, headings |

## Typography
Display Anybody 900 wdth 125 uppercase, lh 0.88, 1–4 words. H2 Anybody 800 wdth 110 uppercase `--fs-2xl`. UI/body Albert Sans 400/600, 16px. Prices Albert Sans 600 tabular-nums. Weight contrast 900/400. Hebrew: Heebo 900 for display (no width axis; compensate with size +10%), Heebo 400/600 UI; lh 1.0.

## Layout
Fluid to 1920px, tight gutters (12–40px). Hero: full-bleed campaign photo 85dvh, caps line at bottom-inline-start overlapping the image, 2 pill CTAs ("Shop men", "Shop women" style: one per intent). Then alternate editorial tile ↔ product grid; one horizontal product rail (`hscroll` or native scroll-snap). Affinity: Photographic, Catalogue, Marquee Hero. Rejects: Long Document, Manifesto, Stat-Led.

## Components
- Nav: banner + retracting nav (N12): 32px promo strip (real offer) + 64px bar with centred category links, search pill, cart; hides on scroll down, returns on up.
- Footer: index columns (help, company, stores) but with a newsletter-first top row; no social icon row as decoration.
- Buttons: pill, ink fill, white 600 label, 48px, padding 0 28px; secondary = pill 1.5px ink ring. Hover = ink-2 fill. Labels ≤2 words.
- Cards: none except product; editorial tiles are images with type.
- Product card: 4:5 image on swatch, 0 radius; below: name 15px 600, category 14px muted, colours count, price; hover swaps to alt image.

## Backgrounds
None. Campaign photography and swatch plates only.

## Motion (budget 4)
House ease `cubic-bezier(.33,1,.68,1)` 280ms. Signature: display line on the hero slides in from inline-start with SplitText words (stagger 40ms) once, then stays. Allowed: `split-reveal` (hero only), `hscroll` (one rail), `quickview`, `cart`, `pdp`, `flip-grid` (PLP filter), `nav`. Not: marquee (except one real-offer ticker in the banner), cursor, shader-bg.

## Imagery
High-energy campaign shots: motion blur, athletes mid-action, hard daylight or flash, saturated but natural. Packshots: side profile on swatch colour, consistent 12% top margin. Never: stock gym selfies, AI-generated athletes, cut-outs on gradients.

## RTL notes
Hero text anchor flips; campaign image focal point stays (`object-position` set per image, not mirrored). Size selectors and prices `dir="ltr"`. Sneaker profiles should not be mirrored (logos).

## Do / Don't
- Do burn type into the photo; Don't place headline in a separate column beside the image.
- Do 0-radius product tiles; Don't round product images.
- Do swatch plates; Don't drop shadows under products.
- Do one flame colour for sales; Don't use flame for CTAs.
- Do alternate editorial/grid; Don't stack 3 product grids in a row.
- Do real promo in the banner; Don't invent "Free shipping over $X".

## Palette drops
- Flame (default). = `tokens.css` above (AA: ink/canvas 18.5 · ink-2/canvas 11.4 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 4.6 · ink/surface 16.8)
- Volt on white: accent oklch(90% .2 120) used as tag background with ink text (never on dark).
  Override: `--c-canvas: oklch(98.8% 0.003 240); --c-surface: oklch(95.6% 0.003 240); --c-surface-2: oklch(91% 0.003 240); --c-ink: oklch(17% 0.01 250); --c-ink-2: oklch(34% 0.01 250); --c-muted: oklch(53.2% 0.01 250); --c-rule: oklch(17% 0.01 250 / 0.16); --c-accent: oklch(90% 0.2 120); --c-accent-ink: oklch(17% 0.01 250); --c-focus: oklch(17% 0.01 250);`
  AA: ink/canvas 18.5 · ink-2/canvas 11.4 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 14.7 · ink/surface 16.8; accent/canvas 1.3 (<3: accent is a fill/surface colour, not text or UI line)
- Team navy: ink oklch(22% .08 262), accent oklch(62% .2 28), swatch oklch(95% .006 262).
  Override: `--c-canvas: oklch(98.8% 0.003 240); --c-surface: oklch(95.6% 0.003 240); --c-surface-2: oklch(91% 0.003 240); --c-ink: oklch(22% 0.08 262); --c-ink-2: oklch(38% 0.08 262); --c-muted: oklch(53.3% 0.08 262); --c-rule: oklch(22% 0.08 262 / 0.16); --c-accent: oklch(63.4% 0.2 28); --c-accent-ink: oklch(22% 0.08 262); --c-focus: oklch(63.4% 0.2 28);`
  AA: ink/canvas 16.9 · ink-2/canvas 9.7 · muted/canvas 5.1 · muted/surface 4.6 · accent-ink/accent 4.6 · ink/surface 15.4; accent L 62->63% for AA

## Knobs
Width axis 110/125/150; grid 2-up/4-up/5-up; banner strip on/off; hero single image vs 2-panel split (men/women); caps line position (bottom / centre crossing subject); hscroll rail vs static.
