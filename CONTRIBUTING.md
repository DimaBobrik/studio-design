# Contributing to studio-design

Thanks for helping. This skill gets better through new art directions, runtime modules, catalog rows and evidence (anonymized case studies, refreshed statistics). Read [`studio-design/CONVENTIONS.md`](studio-design/CONVENTIONS.md) first: it defines the token contract, the module API and the writing style every file follows.

## The one hard rule: anonymization

**Never commit the name, domain, URL, slug, screenshot, copy or asset of any scanned site, brand, client, agency or person.**

- Describe references with a neutral descriptor that keeps the teaching value: "a smart-ring wearable brand", "a Tel Aviv branding studio", "a museum exhibition microsite". Keep the country, industry and type when they help, but never so specific that the site is trivially identifiable (no exact taglines, no unique product names, no quotes).
- Turn lists of names into a count plus a descriptor ("7 tier-A studio sites in Portugal, the US and the Netherlands").
- Numbers are the value: medians, shares and px values are welcome.
- Tools, libraries, platforms, fonts and standards are fine to name (GSAP, Lenis, WordPress, WooCommerce, ACF, Heebo, WCAG, SI 5568 …).
- No personal data, no local paths, no internal notes.
- Raw scans (`scan-out/`, `qa/`) stay on your machine; `.gitignore` excludes them.

PRs that break this rule will be asked to change before review.

## Writing style

- English (the model reads it; user-facing output follows the user's language).
- Dense, concrete, value-anchored rules: numbers, tokens, hex/oklch, px. No vague adjective without a threshold.
- Catalog items follow the format *name | looks like | use when | how (module or recipe) | knobs | perf/a11y/RTL notes*.
- Keep each file under ~600 lines; Claude loads files on demand.
- No em-dashes as separators in UI copy examples (the skill bans them in output).

## Adding a direction

1. Copy an existing `studio-design/directions/<slug>.md` as the template. The front matter needs `name`, `title`, `tagline`, `axes` (paper_band, display_style, accent_hue, radius_system, density, variance, motion), `fits`, `subjects_good`, `subjects_bad`, `neighbours` and `fonts` (with the Hebrew faces).
2. Write a complete `tokens.css` that implements **every** contract token (`--c-*`, `--f-*`, `--fs-*`, `--sp-*`, `--r-*`, `--ease-*`, `--d-*`, `--shadow-*`) and ends with the `:root:where([lang="he"])` block, so the Hebrew faces lead both stacks.
3. Colour: `ink/canvas`, `ink-2/canvas`, `muted/canvas`, `muted/surface`, `ink/surface` and `accent-ink/accent` all ≥ 4.5:1. Add **3 palette drops**, each with a full 10-token `Override:` line and a measured `AA:` line.
4. Sections: essence, signature moves, colour roles, typography, layout, components, backgrounds, motion (budget), imagery, RTL notes, Do/Don't, palette drops, knobs, fits/neighbours (why).
5. Register it in `directions/_index.md`: a table row, a row in the Hebrew display table (face, class, swap), **reciprocal** neighbours in the other files, the coverage recount and routing hints if relevant.
6. Justify it with evidence: a look that 3+ fresh references share and no existing direction covers.
7. Specimen: add `directions/_specimens/<slug>.html`, shoot it with `_specimens/_shoot.mjs` (LTR, RTL and mobile), rebuild the montages with `python3 _montage.py`, and check the specimen in `index.html`.
8. Make sure it isn't a current attractor (`antipatterns.md`). If it sits next to one, mark it guarded and write the guard.

## Adding a runtime module

1. `studio-design/runtime/fx/<name>.js` (+ optional `<name>.css`). Plain ES5/ES2017, no bundler, registered as `SD.fx.<name> = { init(el, opts), destroy(el) }` or through `SD.register`.
2. A header comment documents **every** `data-*` param: name | type | default | ACF field type. Mirror it in `runtime/README.md` (§3 index row, §4 reference).
3. Requirements:
   - a `gsap.matchMedia()` reduced-motion branch that shows the final static state,
   - horizontal motion multiplied by `SD.dir()`, and logical CSS only,
   - animate transform / opacity / filter / clip-path only,
   - loops, canvas and WebGL pause offscreen; DPR cap 1.5; `aria-hidden` on decorative layers,
   - scroll through `SD.onScroll` (never your own `window` scroll listener),
   - colours resolved with `SD.toRGB` before any colour tween,
   - feature-detect dependencies and degrade when they're missing,
   - consume only contract tokens (no hex, font or caps literals),
   - idempotent `init`; `destroy` restores the original DOM (`ctx.revert()`, remove listeners, observers and injected nodes),
   - animated text keeps a static accessible name.
4. Ship `runtime/demo/<name>.html` (loads `core.css`/`core.js` + the module with neutral tokens; `?rtl=1` flips it).
5. Test the demo at 1440×900 and 390×844 in LTR and RTL, with reduced motion and the interaction states. Run the lifecycle test (`initAll` ×2 → `destroyAll` → `initAll` → `destroyAll`, DOM unchanged) and `node studio-design/scripts/verify.mjs studio-design/runtime --pages demo/<name>.html`.
6. Write your own code. Never paste third-party component code (some galleries are inspiration-only or carry commons-clause licenses). CDN dependencies need a compatible license and an attribution comment.

## Adding a catalog row

1. Pick the right file in `studio-design/catalog/` and continue its id scheme (`H-30`, `C-75`, `A-49`, `E-30` …). Update the file's **Quick index** and counts.
2. Fill every column. Section rows also need a wireframe (in the file's notation), 3 knobs and an ACF sketch. Store rows need the WooCommerce template/hook placement.
3. Prefer an existing runtime module or a short "Recipe, no module". Promote it to a module when it's used often.
4. Evidence: an effect seen on 2+ references. Cite anonymized case ids, never names.

## Adding a case study

Follow [docs/research.md](docs/research.md):

1. scan with `scripts/scan.mjs`,
2. digest with `aggregate.py --site`,
3. look at the screenshots,
4. write `references/cases/case-NN-<type>.md` in the existing format with a neutral `descriptor`,
5. add the row to `references/_index.md`.

Screenshots and scan data are not committed.

## Changing a rule or an attractor

Rules are numbers with sources. When you change one, cite the new measurement (sample, tier, date) in `references/patterns.md` and keep the previous figure with its date, so drift stays visible. New attractors go in `antipatterns.md` with a measured share and a bumped version date, plus a `verify.mjs` heuristic if it's checkable.

## Before opening a PR

- [ ] No names, domains, URLs or screenshots of scanned sites, brands, clients, agencies or people (search your diff).
- [ ] Counts and quick indexes updated (`_index.md`, catalog quick index, `SKILL.md` file map if a file was added).
- [ ] `CHANGELOG.md` entry.
- [ ] Demos and specimens render in LTR and RTL with no console errors.
- [ ] Links between files resolve.

By contributing, you agree that your contribution is licensed under the MIT License.
