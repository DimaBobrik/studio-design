---
case: case-12-landing
descriptor: Serverless GPU / AI-infrastructure SaaS landing site
region: global (US/South Africa)
site_type: landing (SaaS / AI infrastructure)
industry: serverless GPU infrastructure
platform: Astro + Swup page transitions (+ WebGL canvas)
libs_detected: [lenis, swiper, swup]
direction_match: [apparatus-night, telemetry-terminal, machined-soft]
captured: 2026-09-30
source: "award gallery scan 2026-09"
---
> A dark server hall where a magenta ribbon of light spins, and white spec sheets slide up over it like paper out of a printer.

## DNA summary
- Macrostructure: alternating "dark stage / light sheet" layers. Each light block is a rounded sheet (`rounded-4xl` 32px top corners, `-mt-7.5` negative margin) that overlaps the dark block above it, so the page reads as paper sliding over a lit stage.
- Hero archetype: H-03 shader/WebGL field (3D magenta ribbon/sphere, dot grid) + start-aligned H1 bottom-start (86px light 300) with one verb in magenta, lede + 2 buttons bottom-end column (pink solid trial CTA + dark demo CTA, mono caps).
- Nav: N2 split - wordmark start; centre-end dark pill group (use cases ▾ / pricing / docs / blog / company / grid icon) + separate pale login + pink sign-up chips, all mono 11-13px caps. Fixed, 82px, transparent.
- Footer: dark stage with the ribbon again, link columns top-end, closing CTA sentence + 2 buttons bottom (CTA-02 as footer), legal row mono.
- Home sections (DOM order): hero (WebGL) -> logo row (S-01, white wordmarks on dark) -> sheet with two-colour H2 (navy + magenta second line) -> F-02 sticky scroll reveal: left sticky list of 4 claims (cold-start seconds / elastic GPU scaling / bring-your-own code / observability) greyed except the active one; right column real UI cards (benchmark bars seconds vs minutes, dotted world map with region pins, terminal, GPU memory chart) -> dark security block over 3D sphere: 4 compliance items with icons -> tabbed "built with" example cards (voice / LLMs / other) -> case-study rail (Swiper, arrows) -> blog 3-up -> footer CTA.

## Signature moves
- Grey-to-ink list: the section's 4 claims sit in a sticky column at #c6cee0 and turn navy #172b76 one by one as their proof card scrolls by (scroll-linked active index, F-02).
- Negative-margin rounded sheets: `margin-top:-30px; border-radius:32px 32px 0 0` light panels overlapping dark stages - every transition is a "sheet over stage".
- Proof is product UI, not illustration: benchmark bars, region map with mono labels (regions list, capacity chip).

## Tokens observed
- Fonts: ABC Favorit (display, light 300), Suisse Intl (UI/body 400/500), Suisse Intl Mono (labels, buttons, uppercase 13px -0.025em). Free subs: display "Inter Tight" 300 / "Geist" 300; body "Inter"/"Hanken Grotesk"; mono "Geist Mono"/"IBM Plex Mono". Hebrew: "Heebo" 300 for display, "Assistant" body, "IBM Plex Mono" + "IBM Plex Sans Hebrew" for mono labels.
- Scale: display 86.09/1.0/-0.025em w300 (about page 100.4px); H2 72.6/1.05 and 57.4/1.05 at -0.05em(!); sub 43.9/1.15 -0.05em; body-lg 26.5/1.35 -0.025em; body 15-18px; labels 13px mono caps.
- Palette: stage near-black #101421 with magenta light, navy ink #172b76 (text on light), slate muted #586490, disabled/idle #c6cee0, sheet #ffffff, slate panels #eef2f5 / #dbe5ed / #cfd7e7, accent magenta #ff488b (buttons, key word), gradient `linear-gradient(to right in oklab, #ff488b, #e33adb)`.
- Radii: 7px (236 uses - chips, buttons, cards), 10px (cards), 32px (sheets), 100% (dots). Backdrop blur 16/50px on nav pills. No shadows.
- Containers: 1100px content, 2000px outer; section paddings 82px and 128/170px.

## Motion inventory
- WebGL canvas (1) for ribbon/sphere, slowly rotating; Lenis; Swup page transitions (inner pages keep the stage and swap content); sticky scroll-reveal lists (2 sticky elements); Swiper case-study rail; tabs with sliding indicator (C-42); custom cursor flag true; `.is-inview` class reveals (fade-up).

## Layout notes
- 12-col, 1100px container; hero text bottom-start at ~65% viewport height; sheets start 20-40px above the dark block's end.
- Sticky reveal: 4/12 sticky list + 7/12 proof column, proof cards ~480px wide, 120px vertical between cards.

## Imagery
- Only rendered 3D (magenta translucent ribbons, spheres, hexagon grid) + real UI fragments + client logos. No people.

## Page set observed
- Pricing: split hero - light slate half with a pay-per-use headline (magenta first word) + 2 buttons; right half dark stage with a pale compute-costs table (mono column labels, per-second prices) and a per-second / per-hour segmented toggle (P-04-ish). Below: plan sheet and pricing FAQs.
- Use-case (voice): dark hero with a huge concentric-ring render, a hairline rule across, word-by-word H1 animating in, mono label "• VOICE" and CTA pair right; then white features sheet.
- About: 100px H1 on dark, origin-story sheet, investors band on slate.

## Mobile notes
- H1 45px/45px; hero gains a play button (video demo); buttons stay side by side; sticky list collapses into sequential cards; map/benchmark cards full width.

## Steal / Don't steal
- Steal: sheet-over-stage transitions (negative margin + top radius); grey-to-ink active list; two-colour H2 (second line in accent); prices/benchmarks in mono tables; nav as a separate dark pill group + solid chips.
- Don't steal: the magenta-on-black palette + glowing 3D is a current AI-infra attractor (see antipatterns "dark + one neon"); if used, swap the stage hue and replace 3D with real product artefacts.

## ACF mapping hints
- `hero_stage` (bg module: shader preset / video / image, h1 with accent-word markup, lede, cta repeater).
- `sheet` wrapper flag on any layout: `overlap_previous` true/false, `surface` white/slate.
- `sticky_proof_list` (repeater: claim, proof type [image/code/table/chart], proof content).
- `compliance_grid` (repeater icon, title, text). `pricing_table` (rows repeater, unit toggle).
