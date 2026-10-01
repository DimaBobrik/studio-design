---
case: case-42-landing
descriptor: Issue-tracking / product-development SaaS (the dark-minimal SaaS archetype)
region: global (US)
site_type: landing (SaaS)
industry: product-development / issue tracking software
platform: Next.js
libs_detected: [next]   # no GSAP/Lenis; CSS + React; custom cursor flag, marquee flag
direction_match: [telemetry-terminal, whisper-studio]
captured: 2026-09-30
source: "award gallery scan 2026-09"
note: "This is THE dark-minimal SaaS attractor. Study it to recognise and avoid the default, or to execute it precisely when a brief truly demands it."
---
> A dimmed control room where the product UI itself is the only light: grey text that brightens only where you should read.

## DNA summary
- Macrostructure: hero (H1 + real app screenshot) -> logo row -> statement -> 3 principles (wireframe isometrics) -> 4 identical feature chapters (title start / lede end / "Learn more →" / large UI composite / sub-feature links row) -> changelog timeline -> 2 testimonial cards -> prefooter CTA -> sitemap footer.
- Hero archetype: H-05 without tilt - start-aligned 64px H1 (2 lines), 1-line grey lede, a "New · [feature] →" link end-aligned on the same baseline, then a full-width dark app screenshot (issue view + agent panel) fading into the page.
- Nav: N2 - logo start, 6 links 13px grey (product / resources / customers / pricing / now / contact), Log in, white pill "Sign up". 73px fixed transparent with blur.
- Footer: Ft4-like 5-column sitemap (product / features / company / resources / connect) 13px, tiny legal row; preceded by a 72px prefooter tagline + Get started (white pill) + Contact sales (dark pill).

## Signature moves
- Grey-scale hierarchy only: 4 text greys (#f7f8f8 / #d0d6e0 / #8a8f98 / #62666d) do all emphasis; a sentence starts white and finishes grey (first clause = the claim in ink, the rest = qualifier in muted).
- Product UI as illustration, rendered at 1:1 fidelity with real content, fading at the edges (mask gradients) instead of device frames.
- Thin-line isometric wireframes (3 small drawings) as the only illustration style.

## Tokens observed
- Fonts: Inter Variable at weight 510 (display) and 400/590; Berkeley Mono (code/meta); Tiempos Headline 400 serif only on the method/manifesto page (128px). Free subs: Inter (Google, variable - use 500 as 510 approximation), mono "JetBrains Mono"/"Geist Mono", serif "Newsreader"/"Source Serif 4". Hebrew: "Heebo" 500 or "Noto Sans Hebrew" 500; mono "IBM Plex Mono"; serif "Frank Ruhl Libre".
- Scale: 72/1.0 -0.022em (prefooter), 64/1.0 -0.022em (H1), 48/1.0 -0.022em (H2/statement), 24/1.33 (quote), 15/1.6 body, 13/1.5 UI, 12/10px meta.
- Palette: canvas #08090a / #0f1011, surfaces white at 2-8% alpha, borders #2e2e32 and inset `0 0 0 1px rgba(255,255,255,.05)`, text greys above, brand indigo #5e6ad2 (toggles only), status hues in UI only (pink #f79ce0, peach #f7bf8b, teal #83dcdc, blue #4ea7fc, green 10% fills). One testimonial card breaks out in lime #e6f22a-ish and a lavender gradient card.
- Radii: 9999px buttons (72 uses), 8/12px cards, 4-6px chips. Section paddings 128px. Container 1436/1416 (near-full width!) with 532-540px text columns.

## Motion inventory
- Minimal: hover states, subtle fade/translate on in-view, marquee flag (logo/changelog), custom-cursor flag on UI demos; UI composites animate state changes (agent working). No smooth scroll.

## Layout notes
- Feature chapter anatomy: row 1 `[H2 5/12 | lede 5/12 end]`, row 2 composite UI 12/12 (~700px tall), row 3 `[label "Features" | link list with + icons in 3 columns]`. Identical rhythm x4 - repetition is the design.
- Density: small type (13-15px) inside large dark voids.

## Imagery
- Real UI only; 1 video portrait on About; investor/team photos on About in greyscale-ish.

## Page set observed
- Method page: centred serif 128px title, mono "1.1" numbering, thin-line circle diagram - editorial mode in the same shell.
- Pricing: 4 columns separated by hairlines (free / basic / business / enterprise), billed-yearly toggle, check lists, pinned comparison table (4,602px).
- About: 64px H1 + lede start, rounded video, positioning statement, team grid (pinned), investors, prefooter.

## Mobile notes
- H1 38/41.8; screenshots crop to a part of the UI; sections hide some UI composites (`hide-mobile` / `hide-laptop` variants).

## Steal / Don't steal
- Steal: sentence-level grey emphasis (first clause ink, rest muted); repeated chapter template for 3-5 capabilities; real UI with edge masks instead of mockups; serif editorial mode for manifesto pages inside a sans system.
- Don't steal: the whole look for non-software clients; near-black + Inter 510 + grey gradient text is the #1 "AI SaaS template" tell (see antipatterns) - if chosen, add a signature the brand owns.

## ACF mapping hints
- `chapter_feature` (h2, lede, link, media composite image/video, sub-links repeater) - one layout reused x N.
- `statement_split_tone` (ink part, muted part).
- `changelog_timeline` (CPT query: date, title, excerpt).
- `testimonial_cards` (repeater: quote, name, role, logo, surface token).
- Prefooter CTA global (options page).
