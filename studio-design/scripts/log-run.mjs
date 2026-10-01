#!/usr/bin/env node
/* studio-design · scripts/log-run.mjs — rotation logs + seed (directions/_index.md steps 4, 6, 8). No dependencies.

   Usage
     node log-run.mjs seed   --project <slug> --site-type <ecommerce|landing|company>
         → prints N (prior global entries for this project) and seed = FNV-1a 32-bit of "project|site_type|N"
     node log-run.mjs shown  --project <slug> --site-type <type> --shown a,b,c [--scope project|brief] [--set k=v …]
         → appends a run entry to ~/.studio-design/global-log.json AND ./.studio-design/log.json (when that folder exists or
           --project-log is given). Run it right after the trio is shown, every run (concept-only runs included).
     node log-run.mjs chosen --project <slug> --chosen <slug> [--set drop=B hero_object=lathe-render knobs.hero_scale=giant …]
         → fills the latest entry of this project in both logs (chosen direction, drop, knobs, axes, hero_object, …).
     node log-run.mjs show   [--project <slug>]      → prints the last entries (project-filtered) and the rotation state:
         excluded (chosen in the last 3 chosen runs), penalised (shown in the last 2 runs), last chosen hero_object.
   Options: --global <path> (default ~/.studio-design/global-log.json) · --project-log <path> (default .studio-design/log.json)
   Both logs keep the last 20 entries. The global log is skipped silently when the home folder is not writable.
   Entry: { date, project, scope, site_type, n, seed, shown:[a,b,c], chosen, drop, knobs:{}, paper, display, he_display,
            accent, hero_object, hero, nav, footer }. Project identity = the `project` slug (same slug in another folder
            counts as the same project). */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [cmd, ...rest] = process.argv.slice(2);
const opt = { set: {} };
for (let i = 0; i < rest.length; i++) {
  const a = rest[i];
  if (a === '--set') { while (rest[i + 1] && !rest[i + 1].startsWith('--')) { const [k, ...v] = rest[++i].split('='); opt.set[k] = v.join('='); } }
  else if (a.startsWith('--')) opt[a.slice(2)] = rest[++i];
}
const fnv1a = s => { let h = 0x811c9dc5; for (const c of new TextEncoder().encode(s)) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; };
const GLOBAL = opt.global || path.join(os.homedir(), '.studio-design', 'global-log.json');
const LOCAL = opt['project-log'] || path.join('.studio-design', 'log.json');
const read = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return []; } };
const write = (f, a, must) => { try { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(a.slice(-20), null, 1)); return true; } catch (e) { if (must) throw e; return false; } };
const localOk = () => !!opt['project-log'] || fs.existsSync(path.dirname(LOCAL));
const setDeep = (o, k, v) => { const ks = k.split('.'); let t = o; ks.slice(0, -1).forEach(x => { t = t[x] = t[x] || {}; }); t[ks.at(-1)] = v; };
const need = k => { if (!opt[k]) { console.error(`--${k} is required`); process.exit(2); } return opt[k]; };

if (cmd === 'seed' || cmd === 'shown') {
  const project = need('project'), type = need('site-type');
  const g = read(GLOBAL), n = (g.length ? g : read(LOCAL)).filter(e => e.project === project).length, seed = fnv1a(`${project}|${type}|${n}`);
  if (cmd === 'seed') { console.log(JSON.stringify({ project, site_type: type, n, seed })); process.exit(0); }
  const e = { date: new Date().toISOString().slice(0, 10), project, scope: opt.scope || 'project', site_type: type, n, seed, shown: need('shown').split(',').map(s => s.trim()), chosen: null };
  Object.entries(opt.set).forEach(([k, v]) => setDeep(e, k, v));
  const okG = write(GLOBAL, [...g, e]);
  const okL = localOk() && write(LOCAL, [...read(LOCAL), e]);
  console.log(JSON.stringify({ logged: e, global: okG ? GLOBAL : 'skipped', project_log: okL ? LOCAL : 'skipped' }));
} else if (cmd === 'chosen') {
  const project = need('project'), chosen = need('chosen');
  for (const [f, isLocal] of [[GLOBAL, false], [LOCAL, true]]) {
    if (isLocal && !localOk()) continue;
    const a = read(f); const i = a.map(e => e.project).lastIndexOf(project);
    if (i < 0) { console.error(`no entry for ${project} in ${f} (run "shown" first)`); continue; }
    a[i].chosen = chosen; Object.entries(opt.set).forEach(([k, v]) => setDeep(a[i], k, v));
    write(f, a); console.log(`updated ${f}`);
  }
} else if (cmd === 'show') {
  const g = read(GLOBAL).filter(e => !opt.project || e.project === opt.project);
  console.log(JSON.stringify(g.slice(-8), null, 1));
  if (opt.project) {
    const chosenRuns = g.filter(e => e.chosen);
    console.log(JSON.stringify({ excluded_chosen_last3: chosenRuns.slice(-3).map(e => e.chosen), penalised_shown_last2: [...new Set(g.slice(-2).flatMap(e => e.shown || []))],
      avoid_hero_object: (chosenRuns.at(-1) || {}).hero_object || null }, null, 1));
  }
} else {
  const s = fs.readFileSync(new URL(import.meta.url), 'utf8'); console.log(s.slice(s.indexOf('Usage'), s.indexOf('*/'))); process.exit(cmd ? 2 : 0);
}
