---
case: case-66-landing
descriptor: "Retro desktop-metaphor internet radio / playlist / membership club"
region: Europe (UK)
site_type: landing (app / radio / membership front door)
industry: internet radio, playlists, membership club
platform: custom + Contentful
libs_detected: []   # custom cursor; 125 images (pixel icons); single-viewport app
direction_match: [desktop-y2k, cosmic-retrofuture, inflatable-pop]
captured: 2026-09-30
source: "award gallery scan 2026-09 (desktop screenshots missing: only mobile full + data; single-screen app)"
---
> A bubblegum-pink 1998 desktop you can actually use: a media-player window playing TV noise, a pixel dock of apps, a one-line status bar.

## DNA summary
- Macrostructure: not a scrolling page - one 100vh "desktop" (`.h-screen`, pageHeight = viewport) with draggable windows and a dock; each "app" opens as a window (Player / Newsroom / Mixtapes / Members / Events).
- Hero archetype: the media-player window IS the hero: title bar (close ×, camera icon, pixel wordmark), video area showing TV static / retro clips captioned by their filenames (e.g. "Clip_1990.mp4", "beach93.wmv", resolution "323x253" in the status strip), "ON AIR •" red live dot, now-playing artist - track line, transport buttons (play highlighted in pale aqua #afe2e5, stop, prev/next), channel select dropdown ("Channel: ... · LIVE ▾").
- Nav: top system bar (32px): "become a member" boxed button start (with palm icon), "get the app" end; desktop also has "/ LOG IN" in pixel caps.
- Footer/dock: bottom dock bar with pixel-art icons + labels (Player, Newsroom, Mixtapes, Members, Events) and scroll arrows at both ends.
- Section list: n/a (window manager).

## Signature moves
- The OS metaphor carried completely: window chrome, file names with extensions as captions, dock, live status - the brand is an environment, not a page.
- Multiple retro typefaces each with one job: pixel serif wordmark, pixel UI, "Everyday" 10px labels, garamond + "Pixelated Times New" + "Perfect DOS VGA" loaded for apps.

## Tokens observed
- Fonts: Ishmeria (pixel display wordmark, 16px caps -1px), Pixolde (pixel UI 16px caps), ChiKareGo2 (Chicago-like 16px), Everyday (10px), faces ITC Garamond, Perfect DOS VGA, Pixelated Times New. Free subs: "VT323", "Silkscreen", "Pixelify Sans", "Press Start 2P" (display only), "ChicagoFLF"-like -> "Pixelify Sans"; garamond "EB Garamond". Hebrew: pixel Hebrew is scarce - use "Rubik Mono One"-feel via "Rubik" 700 inside pixel frames, or bitmap SVG wordmark; body "Heebo".
- Scale: nothing above 16px; hierarchy through window chrome, not type size.
- Palette: desktop pink (visual, approx #f6d5d5 from data), window cream #f9f0e9, ink #000000, aqua #afe2e5 (active button), grey #d1d1d1 (chrome), red #ef4444 (live dot), taupe translucent #c7c0ba at 90%.
- Radii: 2-4px (window corners, buttons), mixed per-corner (`4px 0 0 4px` segmented controls), 1 pill. Hard 1px black borders + offset drop shadow on windows (visual).

## Motion inventory
- TV-noise video loop, draggable windows (inferred), live audio player, custom cursor (pixel hand). No scroll motion.

## Layout notes
- Mobile: single window centred at ~62% width of a 390 screen, 12px margins, dock fixed bottom (72px); desktop (not captured) scatters multiple windows.

## Imagery
- Pixel icons (cocktail, newspaper, CD, notebook, calendar), VHS/TV noise, lo-fi 90s vacation footage.

## Page set observed
- Single screen; apps open as windows. No inner pages scanned.

## Mobile notes
- Keeps the full metaphor: system bar, one window, dock with horizontal scroll.

## Steal / Don't steal
- Steal: environment-as-brand for radio, music, games, events; filenames/resolutions as captions; dock as primary nav (maps to a real menu underneath); one live status element (ON AIR dot).
- Don't steal: 8-10px text for anything important; content only reachable through windows (provide a plain HTML fallback / sitemap for SEO and screen readers).

## ACF mapping hints
- `desktop_shell` (wallpaper colour/image, dock items repeater: icon, label, target window id).
- `window` layouts (type: player/list/text/gallery; title; initial x/y; open by default).
- Player: stream URL, channel list repeater, now-playing endpoint.
