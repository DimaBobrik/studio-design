---
case: case-57-company
descriptor: "International blue-chip contemporary art gallery (exhibitions + editorial)"
region: North America / global (US)
site_type: company (art gallery, exhibitions + editorial)
industry: contemporary art
platform: custom; 2 videos; LFT Etica + Untitled Sans
libs_detected: []
direction_match: [index-mono-gallery, architect-calm, whisper-studio]
captured: 2026-10-01
source: "world agency client scan 2026-10 (home only)"
---
> The art is the interface: a full-bleed artwork film with a tiny caption block and a slide counter, then a long, calm column of exhibitions and journal entries in two weights of one sans.

## DNA summary
- Macrostructure (9,882px, one long content container): full-bleed hero slideshow (artwork film, e.g. a red-lips still) with a small caption bottom-start: city (13px) / artist name (55px LFT Etica 700) / dates / "learn more"; progress line + "1/6" + arrows along the bottom → short text block about the gallery's artists at a biennale → alternating exhibition rows (image one side, small title/meta block the other, generous white) → "Journal" grid of mixed-size images → more exhibitions (senior Asian painters and sculptors) each a row → footer.
- Hero: H-22 film band with a caption block (no headline) + slideshow progress. Nav: logo centred, menu/search corners, transparent over the film.
- Body: text #000, 16px Untitled Sans lh 2.0 (32px) — unusually open leading.

## Signature moves
- **Caption-not-headline hero**: the largest text is the artist's name at 55px; there is no marketing sentence.
- **Slide progress line + counter** (1/6) as the only chrome on the hero.
- **Exhibition row**: image + a narrow 3-line meta block (title, artist, dates, location) offset to the inline-end, rows alternate side. No cards, no borders, no radius except 50px pills.
- **Body lh 2.0** on 16px: reads like a catalogue.

## Tokens observed
- Fonts: LFT Etica 400/600/700 (headings 28-55px), Untitled Sans 400 (body 16/32). Free subs: "Inter" is banned as default; use "Hanken Grotesk" or Fontshare "General Sans" for both. Hebrew: "Noto Sans Hebrew" 400/700.
- Palette: #fff / #000 / #737373 only. Accent-less. Container 1,680px.

## Steal / Don't steal
- Steal for galleries, architects, photographers, venues: caption-block hero with progress, exhibition rows with offset meta, lh 2.0 body.
- Don't steal: pure #000/#fff (tint them, antipatterns #3).

## ACF mapping hints
- `hero_slides` repeater (media, city, name, dates, link) + `autoplay_seconds`.
- `exhibition_row` (image, title, artist, dates, venue, side auto-alternate).
