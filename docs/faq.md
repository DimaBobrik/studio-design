# FAQ

### Is it free?
Yes. The skill is MIT-licensed, and every runtime dependency is free:

- **GSAP** has been free since 3.13, including every plugin (ScrollTrigger, SplitText, Flip, ScrambleText, MorphSVG, DrawSVG, Draggable/Inertia …), under GreenSock's standard no-charge license. It loads from jsDelivr.
- **Lenis** (MIT), **cobe** (MIT) and **Paper Shaders** (Apache-2.0) load from CDNs.
- **Playwright** (Apache-2.0) is a dev tool for QA only.

See [NOTICE.md](../NOTICE.md).

### Are fonts bundled?
No. Directions name Google Fonts (SIL Open Font License) loaded via `<link>`, or Fontshare families (ITF Free Font License) that you self-host in `fonts/` for production. Check each family's license before shipping. Commercial Hebrew faces are never shipped: the skill maps them to the closest free Google face unless you supply a licence.

### Does it copy the sites it studied?
No. It extracted rules, never pixels: sizes, ratios, section orders, motion budgets and shares across ~880 sites. The repository contains no screenshots, scan data, names or URLs of scanned sites, only distilled rules and anonymized study notes. Copy, images and code of studied sites are never reused in output.

### Why does it show me three designs first?
Because the first idea is usually the average one. Three concepts that differ on paper, display type and accent (and on hero, nav, card and motion archetypes) let you choose a direction instead of correcting a default. If you want a single design, say "just one, go".

### Why did it not pick the direction I used last time?
Rotation logs exclude directions chosen in the project's last 3 runs and penalize recently shown ones, so consecutive projects don't converge. To get it back, name it in the brief ("use cell-ledger" or "the one I liked last time"): a stated preference always goes into the trio. You can also delete `.studio-design/log.json` / `~/.studio-design/global-log.json` to reset rotation.

### Can I override a rule?
Yes. The precedence is **the brief's explicit words > the direction's signature moves > catalog defaults > general rules.** Bans are defaults too: ask for cream, Inter, a bento or a gradient and you'll get it, done well, with the override noted in `pages.md`.

### Does it work in Hebrew / RTL?
Yes, from the first line: per-direction Hebrew stacks, logical CSS, `SD.dir()` for motion, bidi isolation, Hebrew placeholders, `he-IL` ₪ formatting, SI 5568 accessibility and an accessibility statement page. `verify.mjs` checks every page in RTL and which Hebrew face actually rendered. See [hebrew-rtl.md](hebrew-rtl.md). Other RTL languages benefit from the same mechanics, but the font guidance is Hebrew-specific.

### Do I need WordPress?
No. The default output is a static multi-page site with relative links: open it locally, deploy it anywhere, or publish it as an artifact. It's structured so it can become a WordPress/ACF/WooCommerce theme 1:1. See [wordpress.md](wordpress.md).

### Can it output React / Next.js?
If you ask. Tokens, structure and design rules stay the same, and effects are ported as components. Vanilla is the default because it ports to WordPress and needs no build step.

### Where do images come from?
In order: your photos and brand assets → generated images (if your session has an image tool) → subject objects built in code (WebGL turned objects, CSS 3D box products, SVG drawings, maps, diagrams) → labelled slots that say exactly which photo to shoot. Random stock that doesn't match the subject is never used.

### Will it invent testimonials, stats or client logos?
No. Missing facts show up as visible placeholders (`[TODO: confirm]` / `[להשלמה: …]`), which `verify.mjs` counts, and every delivery includes a placeholder list. Store previews with few real products use clearly marked `[Sample]` items.

### What if Node or Playwright isn't available?
The skill still designs and builds. Rotation logs can be appended by hand (the format is in `scripts/new-project.md`). Without Playwright, Claude has to take screenshots another way or say explicitly that visual QA was not done.

### How heavy is the output?
Only the runtime modules a project uses are copied. On stores, transactional pages (cart, checkout, account) run without smooth scrolling and with static backgrounds, against a budget of LCP ≤ 2.5 s, CLS ≤ 0.05 and INP ≤ 200 ms. Canvases and WebGL pause offscreen, with DPR capped at 1.5.

### Which Claude surfaces does it work on?
Claude Code (user or project skills folder), and the Claude app (claude.ai / desktop) as an uploaded custom skill. It also works with any agent that can read `SKILL.md` and the files next to it. See [getting-started.md](getting-started.md).

### How do I contribute?
See [CONTRIBUTING.md](../CONTRIBUTING.md). The one hard rule: never commit names, URLs or screenshots of scanned sites.
