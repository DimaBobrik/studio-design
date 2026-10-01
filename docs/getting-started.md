# Getting started

This page covers installing the skill on each surface, what happens on your first run, and how to steer it.

## Install

The skill is the folder `studio-design/` at the root of this repository (the one that contains `SKILL.md`). Install that folder, not the whole repository.

### Claude Code

```bash
git clone https://github.com/DimaBobrik/studio-design.git

# user-level: available in every project
mkdir -p ~/.claude/skills
cp -r studio-design/studio-design ~/.claude/skills/

# or project-level: only in this repository (commit it to share with your team)
mkdir -p .claude/skills
cp -r studio-design/studio-design .claude/skills/
```

Claude Code discovers skills when a session starts, so start a new session after copying. To check, ask "which skills are available?" and look for `studio-design` in the list. The skill triggers on its own whenever you ask to design or build a website, landing page, store, redesign or homepage.

To update, pull the repository and copy the folder again. Your rotation logs live outside the skill folder (see [Rotation logs](#rotation-logs)), so updating never resets them.

### Claude app (claude.ai and Claude desktop)

1. Zip the skill folder so that `studio-design/SKILL.md` is inside the archive:
   ```bash
   cd studio-design && zip -r ../studio-design.zip studio-design -x '*.DS_Store'
   ```
2. Upload it as a custom skill in your Claude app settings, then enable it. Skills have to be available for your account or plan.
3. In a chat, ask for a site. If the app has a code-execution environment, Claude can also run the Node scripts (rotation logs, `verify.mjs`); otherwise it says plainly that visual QA was not run.

### Other agents

`SKILL.md` is plain Markdown with YAML front matter (`name`, `description`) plus relative links, and every other file is loaded on demand. Any agent that can read files next to `SKILL.md` can follow it. Point the agent at `studio-design/SKILL.md` and let it follow the file map.

### Optional tooling

| Tool | Needed for | Install |
|---|---|---|
| Node 18+ | `log-run.mjs` (rotation logs, seed) | your platform's Node installer |
| Playwright + Chromium | `verify.mjs` (QA), `render-stills.mjs`, `extract-catalog.mjs`, `scan.mjs` | `npm i playwright && npx playwright install chromium` |
| Python 3.9+ | `aggregate.py` (only when you grow the research base) | stdlib only |

Without Node, the logs can be appended by hand (the format is in `scripts/new-project.md`). Without Playwright, Claude has to say explicitly that visual QA was not done.

## Your first run

Say you ask:

> Design a WooCommerce store for a small ceramics studio that sells handmade tableware. Full page set.

**1. The brief line.** Claude restates the brief in one line and says what it inferred, for example: *"Reading this as: a WooCommerce ceramics store for home cooks 30-50, tone: quiet craft, English LTR."* It asks at most one question, and only when two readings would produce different sites.

**2. The trio.** Claude runs the selection algorithm in `directions/_index.md` and presents three directions, one line each:

- slug · the concrete link to the subject's world · the signature move the site will be remembered by · the hero device (`hero_object`) · what it differs from (last shown / last chosen).

The trio is logged straight away (`log-run.mjs shown`), even if you stop there.

**3. The concepts.** Unless you asked for a single design, Claude builds all three as real first-screen+ concepts: `concepts/a.html`, `b.html`, `c.html` plus a switcher at `concepts/index.html`. Each one is a hero plus 2-3 following sections, fully styled, with that direction's signature motion. They differ in colour, and also in hero archetype, nav archetype, type voice, background treatment, card physics and motion register.

**4. You pick.** Choose one, or mix ("b's type with a's hero"). If you said "just do it" or are away, Claude takes **the concept with the strongest signature, not the safest one**, and says why.

**5. The build.** The choice becomes `assets/tokens.css` + `DESIGN.md`. Claude plans every core page (sections with catalog ids, one signature moment, a motion table), builds the shared header/footer and Home first, then the remaining pages. Then it runs `verify.mjs`, reads the screenshots, fixes and re-runs.

**6. Delivery.** You get `_gallery.html` linking every page and concept, `DESIGN.md`, `pages.md` (plans + what's placeholder + what's out of scope), and an ACF mapping if the target is WordPress.

## Concepts: the trio explained

The trio guards against sameness. The three picks:

- all fit the site type (`fits`) and score positively on subject affinity,
- differ pairwise on **at least 2 of {paper band, display family, accent band}**. For Hebrew sites, the Hebrew display class counts as the display axis. With a brief-fixed palette, distance is measured on display class, Hebrew display class, hero archetype, radius system and motion budget instead,
- are never declared neighbours of each other,
- ideally differ by 3+ in motion budget for at least one pair.

Every concept has to clear the **ambition floor**: a first viewport that would stop a scroll (display type ≥6vw, full-bleed art-directed media, a live background, or a built signature object), at least one wow moment further down (pinned sequence, horizontal track, stacked cards, kinetic chapter word, scroll-scrubbed media, index↔grid Flip, colour chapters…), and one "second read" detail. Before showing them, Claude ranks the concepts on "would this get Site of the Day?" and fixes the weakest one.

## How to steer it

- **Name what you want.** Your explicit words beat every rule in the skill, bans included. "Cream and a serif", "use Inter" or "a bento grid" will be honoured and done well, with the override noted in `pages.md`.
- **Name the direction.** "Use `swiss-signal-grid`" or "the dark control-room one I liked last time" puts that direction into the trio, and Claude picks the other two for distance from it.
- **Fix the palette.** Give brand colours and they are mapped to token roles with measured contrast. Distinctiveness then moves to type, layout, radius and motion.
- **Ask for one design.** "Just one direction, go" skips the concepts.
- **Ask for more pages.** Core pages are always built; extended pages (lookbook, compare, glossary, locations…) are built on request. See [page-sets.md](page-sets.md).
- **Give real content.** Your photos, logo, products and copy beat everything. For an existing store, Claude can pull the real catalogue with `scripts/extract-catalog.mjs`.

## Rotation logs

The skill remembers what it showed and chose so that consecutive projects don't converge.

| Log | Where | Scope |
|---|---|---|
| Project log | `<project>/.studio-design/log.json` | this project |
| Global log | `~/.studio-design/global-log.json` | the last 20 runs across all projects (skipped silently if the home folder is not writable) |

Rules applied at selection time:

- a direction **chosen** in the project's last 3 runs is excluded,
- a direction **shown** in the project's last 2 runs gets −2; one chosen in the last 3 global runs (other projects) gets −1,
- the new hero must not use the same `hero_object` as the last chosen run,
- a direction that has to repeat changes its palette drop and at least 2 knobs.

Commands:

```bash
node <skill>/scripts/log-run.mjs seed   --project volta --site-type landing
node <skill>/scripts/log-run.mjs shown  --project volta --site-type landing --shown void-stage,swiss-signal-grid,machined-soft --set hero_object=device-render
node <skill>/scripts/log-run.mjs chosen --project volta --chosen void-stage --set drop=B paper=dark display=grotesk accent=warm hero=H-26 nav=N15 footer=FT-01 knobs.hero_scale=giant
node <skill>/scripts/log-run.mjs show   --project volta    # excluded / penalised / last hero_object
```

To reset rotation for a project, delete its `.studio-design/log.json`. To reset it globally, delete `~/.studio-design/global-log.json`.

## Next

- [How it works](how-it-works.md): the process and the selection algorithm in detail
- [Directions](directions.md): all 33 with specimens
- [Quality](quality.md): running `verify.mjs` yourself
