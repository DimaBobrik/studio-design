# Scaffolding a new project

```bash
SKILL=<path to studio-design>          # e.g. ~/.claude/skills/studio-design
mkdir -p site/{assets,runtime/fx,img,fonts,concepts,.studio-design}
cp $SKILL/runtime/core.css $SKILL/runtime/core.js site/runtime/
# copy only the modules the plan uses (js + css if present):
for m in split-reveal clip-reveal marquee nav; do cp $SKILL/runtime/fx/$m.* site/runtime/fx/ 2>/dev/null; done
[ -f site/.studio-design/log.json ] || echo '[]' > site/.studio-design/log.json          # project log (log-run.mjs writes it when this folder exists)
mkdir -p ~/.studio-design 2>/dev/null && { [ -f ~/.studio-design/global-log.json ] || echo '[]' > ~/.studio-design/global-log.json; } || true   # user-global log (skip silently if unavailable)
```

1. `assets/tokens.css`: paste the `tokens.css` block from the chosen `directions/<slug>.md`, apply the palette drop, keep every contract variable.
2. `<head>` of every page: Google Fonts `<link>`s from the direction file (Fontshare families: self-host in `fonts/` with `@font-face` in `assets/tokens.css`, see `runtime/README.md` §10), then `runtime/core.css` → `assets/tokens.css` → `runtime/fx/*.css` (only those used) → `assets/site.css`. Optional `?rtl=1` preview one-liner: `runtime/README.md` §1.
3. End of `<body>`: GSAP + plugins + Lenis + `runtime/core.js` + `runtime/fx/*.js` + `assets/fx-*.js` (custom modules, `runtime/README.md` §9) + `assets/site.js`, in the order given in `runtime/README.md` §1.
4. Shared header/footer: write them once in `index.html`, then copy verbatim to every page (static site). In WordPress they become `header.php` / `footer.php`.
5. RTL: `<html lang="he" dir="rtl">` for Hebrew sites; for bilingual previews `?rtl=1` works out of the box (core.js flips `dir` when it executes; add the `<head>` one-liner to avoid an LTR flash). Bidi rules: `runtime/README.md` §8.
6. `_gallery.html`: links to every page and `concepts/`; `index.html` is Home.

## Rotation logs (every run, not only scaffolding)

Both logs are written **right after the trio is shown** (process step 2), before any concept is built, and updated after the pick (`directions/_index.md` steps 4–8). Rotation rules read `chosen` for exclusion and hero_object (only runs with `chosen` set count) and `shown` for the −2 penalty. Project identity = the `project` slug; the same slug in another folder is the same project.

```bash
SK=$SKILL/scripts
node $SK/log-run.mjs seed   --project volta --site-type landing                      # → {"n":2,"seed":…} for tie-breaks
node $SK/log-run.mjs shown  --project volta --site-type landing --shown void-stage,swiss-signal-grid,machined-soft --set hero_object=device-render
node $SK/log-run.mjs chosen --project volta --chosen void-stage --set drop=B paper=dark display=grotesk he_display=sans-neutral accent=warm hero=H-26 nav=N15 footer=FT-01 knobs.hero_scale=giant
```
No Node? Append by hand (keep the last 20): the entry shape is
```json
{ "date": "2026-09-30", "project": "volta", "scope": "project", "site_type": "landing", "n": 2, "seed": 2129424669,
  "shown": ["void-stage", "swiss-signal-grid", "machined-soft"], "chosen": "void-stage", "drop": "B",
  "knobs": {"hero_scale": "giant", "he_display": "Rubik"}, "paper": "dark", "display": "grotesk", "he_display": "sans-round",
  "accent": "warm", "hero_object": "device-render", "hero": "H-26", "nav": "N15", "footer": "FT-01",
  "signatures": {"home": "device turns on scroll"} }
```
One-liner append (global log) if the script is not at hand:
```bash
node -e 'const fs=require("fs"),p=require("path"),f=p.join(require("os").homedir(),".studio-design/global-log.json");let a=[];try{a=JSON.parse(fs.readFileSync(f))}catch{};fs.mkdirSync(p.dirname(f),{recursive:true});a.push(JSON.parse(process.argv[1]));fs.writeFileSync(f,JSON.stringify(a.slice(-20),null,1))' '{"date":"2026-09-30","project":"volta","site_type":"landing","shown":["a","b","c"],"chosen":null}'
```
Seed (FNV-1a 32-bit of `project|site_type|N`, N = prior global entries for the project):
```js
const fnv1a = s => { let h = 0x811c9dc5;
  for (const c of new TextEncoder().encode(s)) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0; };
const seed = fnv1a(`${project}|${siteType}|${n}`);
const pick = ties => ties.sort()[seed % ties.length];   // alphabetical, rotated by seed mod k, first
```

## Concepts layout (`concepts/`)
```
concepts/a.html  concepts/b.html  concepts/c.html      one per shortlisted direction (hero + 2-3 sections)
concepts/assets/a.css  b.css  c.css                    each starts with its own full token block (:root { --c-* … }) + concept styles
```
- Concepts share the root runtime: `<link rel="stylesheet" href="../runtime/core.css">`, `../runtime/fx/*.css|js`, `../runtime/core.js`. Never copy the runtime into `concepts/`.
- Order in a concept: `../runtime/core.css` → `assets/<x>.css` (tokens block first, then styles) → `../runtime/fx/*.css`.
- The "no stray hex / every value is a token" rule applies per concept file: hex/oklch literals only inside that file's token block (plus `--img-*` imagery tokens).
- After the pick, the chosen concept's token block becomes `assets/tokens.css`; the other two stay as-is for the record.

