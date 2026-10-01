---
case: case-29-landing
descriptor: Charity campaign microsite built around an interactive music toy
region: Europe
site_type: landing (charity product campaign)
industry: health charity × audio hardware
platform: Webflow
libs_detected: [webflow]   # 8 sticky, 4 iframes (audio/video)
direction_match: [industrial-catalogue, telemetry-terminal, architect-calm]
captured: 2026-09-30
source: "award gallery scan 2026-09"
scan_quality: good (frames + full); hero video errored at capture
---
> A clinical instrument manual for an emotional subject: 9-11px mono spec prose in two columns, circular ECG diagrams, white hardware renders - and between them, the children whose heartbeats became the sounds.

## DNA summary
- Macrostructure (16,798px, one 6,480px pinned sequence): hero film (device) with a short model-code mono caption -> two-column mono caps statement (a drum machine "with" the condition) + long mono paragraphs -> macro render of the device (white body, red keys, green ECG on the screen) -> "a sequencer made from heartbeats" section -> pinned case sequence: per child, a full-bleed hospital photo, then a spec page: first name + medical condition in mono caps, a circular sequencer diagram (concentric rings) + a linear ECG trace drawn in 1px -> product family (hardware + app) -> credits.
- Hero archetype: H-24 object (device render) + H-22 film.
- Nav: logos only (two organisations), no menu.

## Signature moves
- **Spec-sheet voice for a human story**: all text in IBM Plex Mono / DM Mono 300 at 9-18px caps, two columns, generous grey #f2f2f2 fields; the restraint makes the photographs hit harder.
- **Data drawings**: each heartbeat is drawn twice - as a circular 16-step sequence and as an ECG line - 1px ink on grey.
- One accent: device red #b5262f (keys, CTA).

## Tokens observed
- Fonts: IBM Plex Mono 300/400, DM Mono 300 (all text). Free (both Google). Hebrew: "IBM Plex Sans Hebrew" 300 for text, keep mono for numbers/codes.
- Palette: #f2f2f2 / #e1e1e1 canvas, #303030 ink, red #b5262f. Radius 8px on few buttons. No shadows.
- Scale: 18 (title) / 16 / 12 / 11 / 9px - tiny by design (do not copy below 14px body).

## Steal / Don't steal
- Steal: instrument-manual layout for medical/charity/tech storytelling; ECG/ring diagrams as proof; one red from the object.
- Don't steal: 9px text (fails reading); no nav.

## ACF mapping hints
- `case_spec` (repeater: photo, name, condition, bpm, sequence array 16×bool, ecg SVG).
