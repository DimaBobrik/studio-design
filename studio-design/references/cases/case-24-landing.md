---
case: case-24-landing
descriptor: Museum research-institute data story about art provenance
region: US
site_type: landing (data story)
industry: museum research / art provenance
platform: custom; Lenis + ScrollTrigger; 1 canvas (network graph)
libs_detected: [ScrollTrigger, lenis]
direction_match: [index-mono-gallery, architect-calm, whisper-studio]
captured: 2026-10-01
source: "world agency client scan 2026-10"
scan_quality: partial (81,000px story; scroll frames + full page)
---
> A research database made tangible: paintings float at different depths around one serif sentence, the camera dives into a single painting, and the records finally collapse into a provenance network graph.

## DNA summary
- Opening: white field, 2-word title 72px Bardford serif, one sentence about how a provenance database transforms research on the social life of art (54px) centred; ~15 painting thumbnails float around it at different sizes and depths, some blurred grey placeholders (depth-of-field); "Scroll down" pill.
- Story: thumbnails drift; one painting scales to fill the screen (zoom-through) with a caption about ongoing research at another museum and where the painting is now, plus a timeline scrubber; later a clustered network graph of ~300 nodes (artworks/owners) with labelled hubs.
- Chrome: blurred glass pills (backdrop 18px), Graphik 12.6px labels, nothing else.

## Signature moves
- **Scatter field around one sentence** (catalog G-12 / H-29, `scatter` module): artworks as depth-sorted satellites of the claim.
- **Zoom into one item** from the field (H-18 layered zoom-through) to start a chapter.
- **Data as a picture**: the provenance network graph replaces stat blocks.

## Tokens observed
- Fonts: Bardford (serif display 54-72px, -0.02em), Graphik 500/600 12.6px. Free subs: display "Newsreader" 400; labels "Hanken Grotesk" 500. Hebrew: "David Libre" / "Noto Sans Hebrew".
- Palette: white, black, grey glass #bababa/20. Accent-less; colour comes only from the paintings.

## Steal / Don't steal
- Steal for archives, galleries, collections, research institutes, real-estate portfolios: scatter-around-sentence opener, zoom-into-one transition, graph as proof.
- Don't steal: 81,000px with no skip link; grey placeholder tiles that look like broken images.

## ACF mapping hints
- `scatter_opener` (sentence, items repeater with depth), `story_zoom` (image, caption, year range), `graph_data` (JSON file field).
