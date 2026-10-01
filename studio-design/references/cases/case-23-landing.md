---
case: case-23-landing
descriptor: Museum interactive documentary microsite about a star architect's archive
region: US
site_type: landing (interactive documentary story, 4 chapters)
industry: museum / architecture archive
platform: custom; Lenis + ScrollTrigger; 19 videos, 256 images, 2 canvases
libs_detected: [ScrollTrigger, lenis]
direction_match: [billboard-type, riso-two-ink, organic-colour-block]
captured: 2026-10-01
source: "world agency client scan 2026-10"
scan_quality: partial (story is ~49,000px; 6 scroll frames + full page; sound prompt at start)
---
> An archive told as a colour-chaptered film: flat orange, black, green and blue fields, giant cropped black caps words and the architect's own scribble line drawn over them, narrated with sound.

## DNA summary
- Opening: orange (#ffa441) field, small "[institution] presents" serif, a single hand-drawn scribble stroke, "INITIALIZING…" mono label, a sound-on prompt explaining the story is narrated by the architect (Reckless serif 24px).
- Story: the canvas switches tone per chapter (orange -> black -> green #16a147 -> blue #4596ff, red #ff6359 for alerts); each chapter shows a giant heavy caps word cropped by the viewport with the architect's scribble drawing animating over it; archive photos/videos (concert-hall models) appear as plates; mono 12-14px caps metadata (Title / Creator / Date / Medium / Dimensions) as an archive HUD; serif 20-30px narration paragraphs.
- Exit: end-of-chapter interstitial with scroll-up option.

## Signature moves
- **Tone chapters** with flat brand colours (C-71 `tone-shift`).
- **Scribble over giant word** (C-73 / C-74): a single-stroke drawing animates over cropped caps.
- **Archive HUD**: object metadata in mono caps, the honest use of mono (antipatterns A13 condition met: real catalogue data).
- **Sound-on narration** as content, with an explicit prompt.

## Tokens observed
- Fonts: Reckless (serif narration 20-30px, -0.03em), Roboto Mono 12/14px caps (HUD). Giant words are images/SVG. Hebrew: "Frank Ruhl Libre" for narration, "Cousine" for the HUD.
- Palette: root tokens `--brand-yellow #ffa441`, `--brand-green #16a147`, `--brand-blue #4596ff`, `--brand-red #ff6359` + black/white. Radii 16-80px on plates. `mix-blend-mode: multiply` on 3 layers.

## Steal / Don't steal
- Steal for museums, anniversaries, architecture practices: chapter tones, scribble-over-word, archive HUD, narration paragraphs in a serif.
- Don't steal: 49,000px single scroll with no chapter index for keyboard users; giant words as images without text equivalents.

## ACF mapping hints
- `story_chapter` (tone, giant word, scribble SVG, narration, media repeater with archive metadata fields).
