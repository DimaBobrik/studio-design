---
case: case-02-company
descriptor: US cultural museum and visitor centre
region: US
site_type: company (museum + cultural centre)
industry: museum / non-profit
platform: WordPress (block-style modules) + GSAP ScrollTrigger + SplitText
libs_detected: [gsap, ScrollTrigger, SplitText, wordpress]
direction_match: [billboard-type, film-title-bands, organic-colour-block]
captured: 2026-10-01
source: "world agency client scan 2026-10"
scan_quality: good (desktop full + scroll + mobile); home only
---
> A museum home that hits like a fight poster: orange field, 145px condensed caps, a black-and-white archival portrait, and a hand-lettered script word and butterfly drawn in the margin.

## DNA summary
- Macrostructure (~7,800px, 11 WordPress modules): split hero, orange (#ffa215) half with the institution name at 145px Founders Grotesk 600 caps (lh 0.76) + a small script word and a line-drawn butterfly, b/w portrait half -> "must-see museum" 2-up photo cards (museum, education programme) -> one-up video band (archive videos) -> one-up feature story -> "what's happening" event record cards -> one-up index/archive feature -> quote slider on orange with the quote hand-lettered (Rocksalt) -> one-up legacy feature -> support/donate list -> news -> website awards -> black footer.
- Module names in the DOM (`--hero`, `--2-up`, `--one-up`, `--record`, `--quote-slider`, `--list`, `--logos`) are a textbook ACF/Gutenberg flexible-section system.

## Signature moves
- **Fight-poster split** (H-25): flat colour field + giant condensed caps vs. archival b/w portrait.
- **Hand-lettered layer** (Rocksalt script + line butterfly echoing the subject's famous phrase): the subject's own vernacular as the second voice (antipatterns #15 exception done right: once per view).
- **One-up modules repeated with `flip-consecutive-sibling`**: consecutive one-ups alternate image side automatically.

## Tokens observed
- Fonts: Founders Grotesk 600/700 caps (60-145px, lh 0.76-0.83, -0.01em), Guillon (UI 16px caps), Rocksalt (script accents), Antonia (serif, rare). 4 families (script is an outlier). Free subs: display "Oswald" 600 / "Big Shoulders Display" 700; UI "Archivo" 600; script "Rock Salt" (Google, same face). Hebrew: "Karantina" 700 + "Rubik" + hand-lettered SVG (no script font).
- Palette: orange #ffa215, black, white, greys #f1f1f1/#d8d7d7, gold #c6aa80, green #4cbf6b, red-orange #fb5c2a. Radii 50px pills.

## Steal / Don't steal
- Steal for museums, sports, foundations, venues on WordPress: the module set names, alternating one-ups, poster split hero, subject's hand-lettering as a once-per-view second voice.
- Don't steal: 7 colours across the page; pick 2 fields.

## ACF mapping hints
- Exactly the observed modules: `hero_split`, `two_up`, `one_up` (auto-flip), `record` (CPT query), `quote_slider`, `list`, `logos`.
