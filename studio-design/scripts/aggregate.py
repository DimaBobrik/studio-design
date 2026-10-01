#!/usr/bin/env python3
"""aggregate.py - digest + cross-site statistics for studio-design reference scans.

Reads a scan output dir laid out as <out>/<slug>/data.json (home + inner pages,
produced by the scanner: fonts, fontSizes, typography, bigText, colors, radii,
shadows, libs, media, header, sections, layout, rootVars, fontFaces, mobile).

Usage
  python3 aggregate.py <out_dir>                 # markdown stats report (stdout)
  python3 aggregate.py <out_dir> --json          # same stats as JSON
  python3 aggregate.py <out_dir> --site <slug>   # compact digest of one site (for writing a case study)
  python3 aggregate.py <out_dir> --sites a,b,c   # restrict the aggregate to these slugs
  python3 aggregate.py <out_dir> --overrides my_overrides.json   # optional, your own file: {slug: {"canvas": "dark|light|field|mixed", "type": ".."}}
      (screenshots beat heuristics: record the canvas you SEE; the script's canvas guess is only a fallback)
  python3 aggregate.py <out_dir> --exclude-display a,b   # drop display stats for sites whose big type is image/SVG/WebGL
  python3 aggregate.py <dir1> <dir2> ... [--meta a.json,b.json] [--overrides o1.json,o2.json]
      # several scan dirs in one run (later dirs win on slug clashes); --meta/--overrides take comma lists
  python3 aggregate.py <dirs> --exclude-broken   # drop rows with no type data or override {"broken": true}
  python3 aggregate.py <dirs> --by-type          # markdown: add a per-type table of every metric

Optional: a scan.mjs input file (list of {url,type,...}) passed with --meta <path> is used to split stats by site type (ecommerce|landing|info).

Heuristics (documented so numbers can be interpreted):
- display size  = largest bigText size on the home page (px at 1440 wide).
- canvas        = dark if the most-used opaque *text* colour is light (L>0.6), else light;
                  "field" if the most-used opaque bg colour is saturated (S>.35) and mid L.
- accent count  = distinct chromatic colours (HSL S>=.35, 0.12<L<0.9) used >=3 times in text+bg,
                  merged when within 30deg hue and 0.15 L.
- radius system = dominant non-circle radius: 0 (<=2px) / soft (3-40px) / pill (>=99px).
- max-width     = widest container <=1440px that appears >=2 times (or the widest seen).
Everything is a heuristic from computed styles; verify against screenshots.
"""
import json, os, re, sys, statistics as st, colorsys
from collections import Counter

LIBS = ["gsap", "ScrollTrigger", "SplitText", "lenis", "locomotive", "three", "swiper", "barba",
        "swup", "lottie", "framerMotion", "splide", "wordpress", "woocommerce", "shopify", "webflow", "next"]
# scan.mjs sets framerMotion from Framer-site markers ([data-framer-component-type]) -> reported as "framer".
# gsap/three are window globals: bundled builds (Next/Vite) hide them, so their share is a floor.
TYPE_ALIAS = {"info": "company", "informational": "company", "store": "ecommerce"}
PLATFORMS = ["shopify", "wordpress", "webflow", "framerMotion", "next"]


def px(v):
    try:
        return float(str(v).replace("px", "").split()[0])
    except Exception:
        return None


def parse_rgb(s):
    m = re.match(r"rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)", s or "")
    if not m:
        return None
    r, g, b = (int(float(m.group(i))) for i in (1, 2, 3))
    a = float(m.group(4)) if m.group(4) is not None else 1.0
    return r, g, b, a


def hexc(s):
    c = parse_rgb(s)
    if not c:
        return s
    h = "#%02x%02x%02x" % c[:3]
    return h if c[3] >= 0.999 else f"{h}/{c[3]:.2f}"


def hls(c):
    return colorsys.rgb_to_hls(c[0] / 255, c[1] / 255, c[2] / 255)


def pages(d):
    out = [("home", d.get("home") or {})]
    for i, p in enumerate(d.get("inner") or []):
        out.append((f"page{i+1}", p or {}))
    return out


def libs_union(d):
    u = {k: False for k in LIBS}
    for _, p in pages(d):
        for k, v in (p.get("libs") or {}).items():
            if v:
                u[k] = True
    return u


def display(h):
    bt = h.get("bigText") or []
    if not bt:
        return None
    b = max(bt, key=lambda x: x.get("size") or 0)
    size = b.get("size") or 0
    lh = px(b.get("lh"))
    ls = px(b.get("ls")) if b.get("ls") not in (None, "normal") else 0.0
    return {"text": (b.get("text") or "")[:60], "size": size, "family": b.get("family"),
            "weight": b.get("weight"), "lh_ratio": round(lh / size, 2) if lh and size else None,
            "tracking_em": round(ls / size, 3) if size and ls is not None else None,
            "transform": b.get("transform"), "color": hexc(b.get("color"))}


def body_size(h):
    ps = (h.get("typography") or {}).get("p") or []
    if not ps:
        return None
    best = max(ps, key=lambda x: x[1])[0]
    parts = [s.strip() for s in best.split("|")]
    return px(parts[1]) if len(parts) > 1 else None


def canvas(h):
    cols = h.get("colors") or {}
    text = [(parse_rgb(c), n) for c, n in cols.get("text") or []]
    text = [(c, n) for c, n in text if c and c[3] > 0.5]
    bgs = [(parse_rgb(c), n) for c, n in cols.get("bg") or []]
    bgs = [(c, n) for c, n in bgs if c and c[3] > 0.9]
    if bgs:
        c = bgs[0][0]
        hh, l, s = hls(c)
        if s > 0.35 and 0.2 < l < 0.8:
            return "field"
    if text:
        l = hls(text[0][0])[1]
        return "dark" if l > 0.6 else "light"
    return "unknown"


def accents(h):
    cols = h.get("colors") or {}
    found = []
    for key in ("text", "bg"):
        for c, n in cols.get(key) or []:
            rgb = parse_rgb(c)
            if not rgb or rgb[3] < 0.5 or n < 3:
                continue
            hh, l, s = hls(rgb)
            if s >= 0.35 and 0.12 < l < 0.9:
                if not any(abs(hh - f[0]) * 360 < 30 and abs(l - f[1]) < 0.15 for f in found):
                    found.append((hh, l, hexc(c)))
    return [f[2] for f in found]


def radius_system(h):
    rs = [(r, n) for r, n in h.get("radii") or [] if r not in ("50%", "100%")]
    if not rs:
        return "0"
    r = px(rs[0][0])
    if r is None:
        return "other"
    return "0" if r <= 2 else ("pill" if r >= 99 else "soft")


def maxw(h):
    cs = [(px(w), n) for w, n in (h.get("layout") or {}).get("containers") or []]
    cs = [(w, n) for w, n in cs if w and 600 <= w <= 1440]
    rep = [w for w, n in cs if n >= 2]
    if rep:
        return max(rep)
    return max([w for w, _ in cs], default=None)


def paddings(h):
    out = []
    for v, n in (h.get("layout") or {}).get("sectionPaddings") or []:
        a, _, b = v.partition("/")
        pa, pb = px(a), px(b)
        if pa or pb:
            out.append(max(pa or 0, pb or 0))
    return out


def families(h, min_count=5):
    return [f for f, n in h.get("families") or [] if n >= min_count] or [f for f, _ in (h.get("families") or [])[:1]]


SYSTEM_FACES = {"arial", "helvetica", "-apple-system", "blinkmacsystemfont", "system-ui", "math", "sans-serif", "serif",
                "monospace", "times new roman", "segoe ui", "roboto", "tahoma", "verdana", "georgia"}
STYLE_WORDS = r"(regular|bold|semibold|semi|demibold|medium|light|extralight|ultralight|thin|hairline|book|black|heavy|extrabold|" \
              r"ultrabold|italic|oblique|variable|var|text|display|headline|caption|micro|deck|breit|wide|extended|condensed|" \
              r"compressed|narrow|std|pro|test|trial|vf|web|webfont|\d+)"


def superfamily(f):
    """'Founders Grotesk Regular' / 'Test Founders Grotesk' / 'SofiaPro-SemiBold' -> 'founders grotesk' / 'sofia'.
    Weights, optical sizes and widths of one family count once; system fallbacks are dropped (None)."""
    x = re.sub(r"([a-z])([A-Z])", r"\1 \2", f or "").replace("-", " ").replace("_", " ").lower().strip()
    if x in SYSTEM_FACES:
        return None
    words = [w for w in x.split() if not re.fullmatch(STYLE_WORDS, w)]
    return " ".join(words) or x


def superfamilies(h):
    return sorted({sf for sf in (superfamily(f) for f in families(h)) if sf})


def n_sizes(h, min_count=2):
    return len([1 for sz, n in (h.get("fontSizes") or []) if n >= min_count])


def h1_size(h):
    """Largest computed <h1> size on the home page (auto proxy for the hero headline)."""
    best = None
    for spec, _ in (h.get("typography") or {}).get("h1") or []:
        parts = [x.strip() for x in spec.split("|")]
        v = px(parts[1]) if len(parts) > 1 else None
        if v and (best is None or v > best):
            best = v
    return best


def parse_shadow(sh):
    """Split a computed box-shadow list into layers: (inset, x, y, blur, spread, alpha)."""
    out = []
    for layer in re.split(r",(?![^()]*\))", sh or ""):
        layer = layer.strip()
        if not layer or layer == "none":
            continue
        c = parse_rgb(layer)
        nums = [px(n) for n in re.findall(r"-?[\d.]+px", re.sub(r"rgba?\([^)]*\)", "", layer))]
        nums += [0.0] * (4 - len(nums))
        out.append(("inset" in layer, nums[0], nums[1], nums[2], nums[3], c[3] if c else 1.0))
    return out


def shadow_class(h):
    """none | ring (inset / 0-blur rings only) | card (template card shadow: one layer, blur 12-48, y 2-24,
    alpha .05-.2, on >=3 elements, e.g. 0 10px 30px rgba(0,0,0,.1)) | other (glows, modal/stacked lifts, hard offsets)."""
    kinds = set()
    for sh, n in h.get("shadows") or []:
        for ins, x, y, blur, spread, a in parse_shadow(sh):
            if a < 0.02:
                continue
            if ins or (blur <= 1 and abs(y) <= 1):
                kinds.add("ring")
            elif not ins and 12 <= blur <= 48 and 2 <= y <= 24 and 0.05 <= a <= 0.2 and n >= 3:
                kinds.add("card")
            else:
                kinds.add("other")
    if not kinds:
        return "none"
    return "card" if "card" in kinds else ("other" if "other" in kinds else "ring")


def gaps(h):
    return [px(g) for g, n in (h.get("layout") or {}).get("gaps") or [] if px(g) is not None and n >= 2]


def site_row(slug, d, meta=None, override=None):
    h = d.get("home") or {}
    hd = h.get("header") or {}
    mob = (h.get("mobile") or {}).get("h1") or {}
    return {
        "slug": slug,
        "type": TYPE_ALIAS.get(t, t) if (t := (meta or {}).get("type") or (d.get("site") or {}).get("type")) else None,
        "ok": bool(h.get("bigText")),
        "display": display(h),
        "h1_px": h1_size(h),
        "shadow": shadow_class(h),
        "gaps": gaps(h),
        "body_px": body_size(h),
        "families": families(h),
        "n_families": len(families(h)),
        "n_superfamilies": len(superfamilies(h)),
        "canvas": (override or {}).get("canvas") or canvas(h),
        "n_sizes": n_sizes(h),
        "accents": accents(h),
        "radius": radius_system(h),
        "radii_top": [r for r, _ in (h.get("radii") or [])[:4]],
        "maxw": maxw(h),
        "paddings": sorted(set(paddings(h))),
        "header": {"h": hd.get("height"), "pos": hd.get("position"), "links": hd.get("links")} if hd else None,
        "sections": len(h.get("sections") or []),
        "page_h": h.get("pageHeight"),
        "libs": [k for k, v in libs_union(d).items() if v],
        "media": h.get("media"),
        "flags": h.get("flags"),
        "mobile_h1": px(mob.get("size")),
        "font_faces": (h.get("fontFaces") or [])[:8],
        "broken": bool((override or {}).get("broken")),
    }


def digest(slug, d):
    """Compact per-site digest used when writing a reference case study."""
    s = d.get("site") or {}
    print(f"# {slug}  {s.get('url')}\n type={s.get('type')} platform={s.get('platform')}\n style={s.get('style')}\n why={s.get('why')}")
    print(" libs(union):", [k for k, v in libs_union(d).items() if v])
    for name, p in pages(d):
        if not p:
            continue
        print(f"\n== {name} {p.get('url')} h={p.get('pageHeight')} title={str(p.get('title'))[:70]!r}")
        inner = name != "home"
        print(" families:", p.get("families"))
        if not inner:
            print(" faces:", sorted(set(" ".join(f.split()[:-3]) for f in (p.get("fontFaces") or [])))[:10])
        print(" sizes:", (p.get("fontSizes") or [])[:14])
        ty = p.get("typography") or {}
        for k in (("h1", "h2") if inner else ("h1", "h2", "h3", "p", "a_nav", "button")):
            if ty.get(k):
                print(f"  {k}:", [x[0] for x in ty[k][:3]])
        seen = set()
        for b in (p.get("bigText") or [])[:12]:
            key = (b.get("size"), b.get("family"))
            if key in seen:
                continue
            seen.add(key)
            print(f"  BIG {b.get('size')}px {b.get('family')} w{b.get('weight')} lh {b.get('lh')} ls {b.get('ls')} {b.get('transform')} {hexc(b.get('color'))} :: {str(b.get('text'))[:50]!r}")
        c = p.get("colors") or {}
        k = 5 if inner else 10
        print(" bg:", [(hexc(x), n) for x, n in (c.get("bg") or [])[:k]])
        print(" text:", [(hexc(x), n) for x, n in (c.get("text") or [])[:k]])
        if c.get("gradients"):
            print(" grad:", [g[:90] for g, _ in c["gradients"][:3]])
        print(" radii:", (p.get("radii") or [])[:8], " shadows:", [x[:60] for x, _ in (p.get("shadows") or [])[:3]])
        if inner:
            print(" header:", p.get("header"))
        else:
            print(" blend:", p.get("blend"), " backdrop:", p.get("backdrop"))
            rv = {k: v for k, v in (p.get("rootVars") or {}).items() if not re.match(r"--(swiper|f-|tw-|wp-|wc-)", k)}
            if rv:
                print(" rootVars:", {k: str(v)[:40] for k, v in list(rv.items())[:25]})
        if not inner:
            print(" media:", p.get("media"), " flags:", p.get("flags"), " header:", p.get("header"))
        L = p.get("layout") or {}
        print(" containers:", (L.get("containers") or [])[:6], " pads:", (L.get("sectionPaddings") or [])[:6], " gaps:", (L.get("gaps") or [])[:5])
        for sct in (p.get("sections") or [])[:20]:
            print(f"  [{sct.get('i')}] {sct.get('tag')} top={sct.get('top')} h={sct.get('height')} bg={hexc(sct.get('bg'))} cols={sct.get('columns')} img={sct.get('imgs')} vid={sct.get('videos')} cv={sct.get('canvas')} w={sct.get('words')} pin={sct.get('pinnedLike')} :: {str(sct.get('heading'))[:60]!r} .{str(sct.get('cls'))[:40]}")
        if p.get("mobile"):
            print(" mobile:", p.get("mobile"))


def q(vals):
    vals = [v for v in vals if v is not None]
    if not vals:
        return {}
    vals = sorted(vals)
    return {"n": len(vals), "min": vals[0], "p25": vals[len(vals) // 4], "median": st.median(vals),
            "p75": vals[(3 * len(vals)) // 4], "max": vals[-1]}


def aggregate(rows):
    ok = [r for r in rows if r["ok"]]
    n = len(rows)
    disp = [r["display"] for r in ok if r["display"]]
    libc = Counter(l for r in rows for l in r["libs"])
    out = {
        "sites": n, "sites_with_type_data": len(ok),
        "display_px": q([x["size"] for x in disp]),
        "display_vw_at_1440": q([round(x["size"] / 14.4, 2) for x in disp]),
        "font_sizes_per_home": q([r["n_sizes"] for r in ok]),
        "display_lh_ratio": q([x["lh_ratio"] for x in disp]),
        "display_tracking_em": q([x["tracking_em"] for x in disp]),
        "display_uppercase_share": round(sum(1 for x in disp if x["transform"] == "uppercase") / max(1, len(disp)), 2),
        "display_weights": Counter(str(x["weight"]) for x in disp).most_common(),
        "body_px": q([r["body_px"] for r in ok]),
        "families_per_site": Counter(r["n_families"] for r in ok).most_common(),
        "superfamilies_per_site": Counter(r["n_superfamilies"] for r in ok).most_common(),
        "libs_pct": {k: round(100 * v / n) for k, v in libc.most_common()},
        "canvas": Counter(r["canvas"] for r in ok).most_common(),
        "accent_count": Counter(min(len(r["accents"]), 4) for r in ok).most_common(),
        "radius_system": Counter(r["radius"] for r in ok).most_common(),
        "maxw": q([r["maxw"] for r in ok]),
        "section_padding_px": q([p for r in ok for p in r["paddings"] if 24 <= p <= 400]),
        "header_height": q([r["header"]["h"] for r in ok if r["header"] and r["header"]["h"]]),
        "header_position": Counter((r["header"] or {}).get("pos") for r in ok).most_common(),
        "sections_home": q([r["sections"] for r in ok]),
        "page_height_home": q([r["page_h"] for r in ok if r["page_h"] and r["page_h"] > 1000]),
        "mobile_h1_px": q([r["mobile_h1"] for r in ok]),
        "custom_cursor_pct": round(100 * sum(1 for r in ok if (r["flags"] or {}).get("cursorCustom")) / max(1, len(ok))),
        "marquee_pct": round(100 * sum(1 for r in ok if (r["flags"] or {}).get("marquee")) / max(1, len(ok))),
        "canvas_el_pct": round(100 * sum(1 for r in ok if (r["media"] or {}).get("canvas")) / max(1, len(ok))),
        "video_pct": round(100 * sum(1 for r in ok if (r["media"] or {}).get("video")) / max(1, len(ok))),
        "h1_px": q([r["h1_px"] for r in ok]),
        "h1_px_ge24": q([r["h1_px"] for r in ok if r["h1_px"] and r["h1_px"] >= 24]),
        "accentless_pct": round(100 * sum(1 for r in ok if not r["accents"]) / max(1, len(ok))),
        "shadow_class": Counter(r["shadow"] for r in ok).most_common(),
        "gap_px_median_per_site": q([st.median(r["gaps"]) for r in ok if r["gaps"]]),
        "gap_px_min_per_site": q([min(r["gaps"]) for r in ok if r["gaps"]]),
        "platform_pct": {("framer" if k == "framerMotion" else k): round(100 * libc.get(k, 0) / max(1, n)) for k in PLATFORMS},
    }
    by_type = {}
    for t in sorted(set(r["type"] for r in ok if r["type"])):
        sub = [r for r in ok if r["type"] == t]
        lc = Counter(l for r in sub for l in r["libs"])
        by_type[t] = {"n": len(sub), "display_px": q([r["display"]["size"] for r in sub if r["display"]]),
                      "h1_px_ge24": q([r["h1_px"] for r in sub if r["h1_px"] and r["h1_px"] >= 24]),
                      "display_lh_ratio": q([r["display"]["lh_ratio"] for r in sub if r["display"]]),
                      "display_tracking_em": q([r["display"]["tracking_em"] for r in sub if r["display"]]),
                      "section_padding_px": q([p for r in sub for p in r["paddings"] if 24 <= p <= 400]),
                      "gap_px_min_per_site": q([min(r["gaps"]) for r in sub if r["gaps"]]),
                      "accentless_pct": round(100 * sum(1 for r in sub if not r["accents"]) / len(sub)),
                      "sections_home": q([r["sections"] for r in sub]),
                      "canvas": Counter(r["canvas"] for r in sub).most_common(),
                      "accent_count": Counter(min(len(r["accents"]), 4) for r in sub).most_common(),
                      "radius_system": Counter(r["radius"] for r in sub).most_common(),
                      "superfamilies_per_site": Counter(r["n_superfamilies"] for r in sub).most_common(),
                      "body_px": q([r["body_px"] for r in sub]),
                      "header_height": q([r["header"]["h"] for r in sub if r["header"] and r["header"]["h"]]),
                      "shadow_class": Counter(r["shadow"] for r in sub).most_common(),
                      "libs_pct": {k: round(100 * v / len(sub)) for k, v in lc.most_common()}}
    out["by_type"] = by_type
    return out


def md(stats, rows, by_type=False):
    L = ["# Scan aggregate", ""]
    for k, v in stats.items():
        if k == "by_type" and by_type:
            continue
        L.append(f"- **{k}**: {json.dumps(v, ensure_ascii=False)}")
    if by_type:
        for t, v in stats["by_type"].items():
            L += ["", f"## type: {t} (n={v['n']})"]
            L += [f"- **{k}**: {json.dumps(x, ensure_ascii=False)}" for k, x in v.items() if k != "n"]
    L += ["", "| slug | type | display px (lh, tr em, w) | body | fams | canvas | accents | radius | maxw | header | secs | libs |", "|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for r in rows:
        dsp = r["display"] or {}
        hd = r["header"] or {}
        L.append(f"| {r['slug']} | {r['type']} | {dsp.get('size')} ({dsp.get('lh_ratio')}, {dsp.get('tracking_em')}, {dsp.get('weight')}) | {r['body_px']} | {r['n_families']} | {r['canvas']} | {len(r['accents'])} {' '.join(r['accents'][:3])} | {r['radius']} | {r['maxw']} | {hd.get('h')} {hd.get('pos')} | {r['sections']} | {','.join(r['libs'])} |")
    return "\n".join(L)


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1
    roots = []
    for a in argv[1:]:
        if a.startswith("--"):
            break
        roots += [x for x in a.split(",") if x]
    root = roots[0]
    meta = {}
    if "--meta" in argv:
        for mf in argv[argv.index("--meta") + 1].split(","):
            for m in json.load(open(mf)):
                slug = re.sub(r"[^a-z0-9]+", "_", re.sub(r"^https?://", "", m["url"]).strip("/").lower()).strip("_")
                meta[slug] = m
    if "--site" in argv:
        slug = argv[argv.index("--site") + 1]
        for r in reversed(roots):
            f = os.path.join(r, slug, "data.json")
            if os.path.isfile(f):
                digest(slug, json.load(open(f)))
                return 0
        print("not found:", slug)
        return 1
    only = set(argv[argv.index("--sites") + 1].split(",")) if "--sites" in argv else None
    overrides = {}
    if "--overrides" in argv:
        for of in argv[argv.index("--overrides") + 1].split(","):
            overrides.update({k: v for k, v in json.load(open(of)).items() if not k.startswith("_")})
    exclude = set(argv[argv.index("--exclude-display") + 1].split(",")) if "--exclude-display" in argv else set()
    files = {}
    for r in roots:
        for slug in sorted(os.listdir(r)):
            f = os.path.join(r, slug, "data.json")
            if os.path.isfile(f) and not (only and slug not in only):
                files[slug] = f
    rows = []
    for slug in sorted(files):
        row = site_row(slug, json.load(open(files[slug])), meta.get(slug), overrides.get(slug))
        if slug in exclude:
            row["display"] = None
        if overrides.get(slug, {}).get("type"):
            row["type"] = overrides[slug]["type"]
        if "--exclude-broken" in argv and (row["broken"] or not row["ok"]):
            continue
        rows.append(row)
    stats = aggregate(rows)
    if "--json" in argv:
        print(json.dumps({"stats": stats, "rows": rows}, indent=1, ensure_ascii=False))
    else:
        print(md(stats, rows, by_type="--by-type" in argv))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
