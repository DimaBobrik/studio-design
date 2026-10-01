---
case: case-51-ecommerce
descriptor: "New York collectible furniture & objects shop (small catalogue, gallery model)"
region: North America (US)
site_type: ecommerce (small catalogue, gallery model)
industry: collectible furniture & objects
platform: Next.js + Sanity (virtual scroll container)
libs_detected: [next]   # Lenis per metadata; pinned scroll container
direction_match: [index-mono-gallery, architect-calm, industrial-catalogue]
captured: 2026-09-30
source: "award gallery scan 2026-09 (LOW quality: screenshots blank after intro; card built from text/size data, layout claims unverified)"
---
> A catalogue raisonné on a gallery wall: every object numbered like an artwork, small mono labels, huge quiet sans only where you are invited to see more.

## DNA summary (from data)
- Canvas: warm grey #eceae5 (observed visually as the only rendered colour) / #dddad1 on the index; ink #28282a; product plates olive-grey #46463e / #47473c; wood-tone swatches #362414 / #351504 / #5c3d28 / #150e0a (material colours on product cards).
- Home: 6 sections - hero area (2,199px, 4 images) -> "(All_Products)" label -> text block (92 words) -> large empty/visual block -> "more objects" block (59px, 5 images) -> "see all"-type 85px link-as-headline.
- Naming system: products are codes "X_001 ... X_013 Dining_Chair" (brand initial + number), counters "001/004", underscores instead of spaces, parentheses around section labels "(All_Products)" - the catalogue voice.
- Index (/products): header toggle "IMG / TXT VIEW" (PL-02 list/grid switch), 44 images in a pinned grid, row gap 64px, column gap 22px, labels 12-14px only (no display type on the PLP at all).
- PDP: header "X_005 Bench 1/NaN" (image counter bug visible in data), H1 "X_005" 48px + name 16px, "Details" 32px, spec block, "Next product" panel on #0e0e0e at the bottom (450px) - next-object navigation like a gallery.
- Header: absolute, no bar; live local clock mentioned in site metadata (not observed).

## Signature moves
- Object codes as names (X_005) + parenthesised labels: an archive voice that makes a 13-item shop feel curated.
- Index/list view toggle as the main nav of the shop.
- Display type used only for invitations (85px "see all" line), never for product names.

## Tokens observed
- Fonts: Neue Haas Grotesk Display Pro 500 (all text 12-85px), ABC Monument Grotesk Mono 500 uppercase 14px (counters, VIEW). Free subs: "Inter Display"/"Inter Tight" 500, "Hanken Grotesk" 500; mono "Space Mono"/"JetBrains Mono". Hebrew: "Heebo" 500 / "IBM Plex Sans Hebrew" 500; mono "IBM Plex Mono".
- Scale: 85/1.0, 59/0.97, 48/1.0, 32/1.0, 16, 14, 12. Tracking 0.
- Radii: 0 (one 3px). Shadows none. Paddings 100px top blocks, 130px bottom; gap 137/170px.

## Motion inventory
- Intro fade (screens blank at capture = content opacity 0 until animation), pinned scroll container (virtual smooth scroll), next-product panel. Details not observed.

## Layout notes
- Not observed. Metadata describes "scattered asymmetric grid" of objects on neutral ground.

## Imagery
- Not observed. Product-on-plate photography implied by olive plates and wood swatches.

## Page set observed
- Home, index (/products), one PDP from data; second PDP failed (upstream error).

## Mobile notes
- Mobile rendered blank (844px); h1 12px per data (labels only).

## Steal / Don't steal
- Steal: coded object naming + mono counters for small collectible catalogues (furniture, ceramics, art editions); IMG/TXT view toggle; "next object" panel on PDP; display type reserved for calls to see more.
- Don't steal: content hidden until JS animation completes (screenshots/SEO see an empty page); counters that can show "NaN".

## ACF mapping hints
- Product ACF: `object_code` (text, e.g. X_005), `material_swatch` (colour), `edition` (x/y).
- `index_toggle` PLP header (default view img|txt).
- `invite_headline` (text, link) - big link line between sections.
- `next_object` (auto: next product by menu_order).
