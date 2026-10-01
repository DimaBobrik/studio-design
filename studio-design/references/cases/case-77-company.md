---
case: case-77-company
descriptor: "Tel Aviv strategic branding studio for tech founders (English/French)"
region: Israel (offices also in Europe and the US)
site_type: company (branding studio for tech founders)
industry: strategic branding
platform: Webflow
libs_detected: [gsap, ScrollTrigger, SplitText, webflow]
direction_match: [architect-calm, whisper-studio, cell-ledger]
captured: 2026-09-30
source: "Israeli scan 2026-10 (home + 2 case pages; tier B: the Tel Aviv startup-branding house style done well)"
---
> A clean pitch deck you can scroll: one short sentence, one strange beautiful render, then numbers in boxes.

## DNA summary
- Macrostructure (8,212px): two-word 54px imperative statement centred-right → location line (3 cities) + one-line positioning (strategic branding for tech founders) + "book a call" → full-width 3D render (iridescent flower in a desert) → stat cards (funds raised in N months, monthly visitors, two more $-figures) with grey decimals and client/category captions → "you're in good hands" logo wall of the founders' prior brands → programme cards (4 fixed-length programmes of 2-10 weeks: raise / launch / rebrand / define + a custom option) with service lists → past projects cards with status chips matching the programmes → news → FAQ → "ask AI if we're a good fit" prompt → footer.
- Hero: H-22 (small statement + wide render band).

## Signature moves
- Programmes as productised cards with durations: services sold as fixed-length packages.
- Stat cards where the unit/decimal is grey and the figure black.
- Status chips on project cards that map to the programmes.

## Tokens observed
- Font: PP Neue Montreal (commercial) 72/1.0 w500, 54/1.0, 18/1.4, 14.4 UI. Free sub: "Schibsted Grotesk" 500 or "Hanken Grotesk" 500; Hebrew: Heebo 500.
- Palette: white, #f7f7f7 panels, black ink, grey #83878e, chip colours sky #55aedb / sand #eecd79.
- Radii 3-5px. No shadows. Gaps 7-14px in grids; 36-65px between blocks.

## Steal / Don't steal
- Steal: productised programme cards with weeks; stat cards with real, attributed numbers; status chips linking work to offers.
- Don't steal: the generic 3D render as the only image (fine once, but it's the Tel Aviv startup-agency attractor); 50% black secondary text.

## ACF mapping hints
- `statement_render` (title, meta line, render). `stat_cards` (repeater: value, unit, caption, client). `programmes` (repeater: name, weeks, tagline, services list). `project_cards` (relationship + programme chip).
