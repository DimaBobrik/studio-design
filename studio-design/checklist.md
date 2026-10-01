# QA checklist (run after every page set, and on each concept)

Automated part: `node scripts/verify.mjs <site-folder>` (details in `scripts/README.md`). This file is the human/jury part: open the screenshots in `qa/` and answer every line. Anything marked ✗ gets fixed, then verify runs again.

## A. Before code (plan gate)
- [ ] Brief read line written (subject · audience · type · one job · tone extreme · language/dir).
- [ ] Direction chosen via `directions/_index.md` algorithm; differs from the last 3 in the project log; palette drop + knobs recorded.
- [ ] Every page has: sections in DOM order with catalog ids, one signature moment, motion spec table with a one-sentence reason per effect.
- [ ] Section rules: no archetype twice on a page · layout families ≥ ceil(n/2) · zigzag ≤2 consecutive · marquee ≤1 · eyebrows ≤ ceil(n/3), never in consecutive sections.
- [ ] Self-similarity test done ("a similar brief would land elsewhere because …").
- [ ] Core page list for the site type is complete (`pages/<type>.md`), including states (empty cart, no results, 404, form errors).

## B. Jury critique (score 1-5 each; any score <3 → revise that axis before delivering)
| Axis | Question | Evidence to look at |
|---|---|---|
| Specificity | Could this site belong to another client in another industry? It must not. Where does the subject's world show (materials, artefacts, vernacular)? | hero, imagery, copy, signature move |
| Hierarchy | In the 1280×800 first viewport: is there one obvious first read, second read, action? | `ltr-1280x800` first-viewport shot |
| Type | Display/body contrast large enough (≥3× size jump, weight contrast ≥300)? Line lengths 45-75ch? Caps tracking 0, lh 0.8-0.9? Hebrew renders in the Hebrew face, not fallback? | full-page shots, `rtl-*` shots |
| Restraint | Remove one accessory: which decoration can go without loss? (If none can go, fine.) Accent ≤5% of viewport; ≤3 families; one radius system. | all shots |
| Variety | Scroll the full page: does the layout change shape section to section (not a list of cards)? Do the three concepts look like three studios made them? | full-page shots side by side |
| Motion | One orchestrated entrance, one signature scroll moment, nothing that moves without a reason; reduced-motion shots show complete final state. | scroll frames, `reduced-*` shots |
| Execution | Alignment to a grid, consistent spacing tokens, no orphan words in headings, no wrapped buttons, crisp images, no layout jump. | 390 / 768 / 1440 shots |
| Commerce (stores) | Price, variant, stock and add-to-cart visible without scrolling on PDP (desktop) and within one scroll (mobile); cart drawer states clear; trust info honest and near the buy button. | product / cart / checkout shots |

## C. Slop sweep (binary; see `antipatterns.md` for the full list)
- [ ] No badge-pill above H1, no "✨ New", no version labels in hero.
- [ ] No 3 equal icon cards with "Learn more →"; no card-in-card; no side-stripe cards.
- [ ] No gradient text, no purple→blue/pink gradients, no floating blurred orbs used as "depth".
- [ ] No soft grey shadow under every card; no glassmorphism panels (glass allowed on fixed nav/modal only).
- [ ] No default AI nav (wordmark + 4 links + CTA hairline bar) unless the direction specifies it; no 4-column Product/Company/Resources/Legal footer by default.
- [ ] No invented stats/logos/testimonials/people; placeholders are visibly `[TODO: confirm]` / `[להשלמה: …]` in `<span class="todo" dir="auto">`.
- [ ] Copy free of: Elevate, Seamless, Unleash, Supercharge, Empower, Revolutionize, Next-gen, "Where X meets Y", "In today's digital landscape"; no em-dashes; CTA labels ≤3 words, verbs that say what happens.
- [ ] No emoji as icons; one icon family; no fake browser/phone chrome made of divs.
- [ ] No scroll cue ("Scroll to explore"), no decorative status dots, no locale/time/weather strips unless real and meaningful.

## D. Technical
- [ ] verify.mjs: 0 FAIL (warnings read and either fixed or justified in `pages.md`).
- [ ] No horizontal overflow at 320/390/768/1280/1440, LTR and RTL.
- [ ] No console errors (normal and reduced motion).
- [ ] axe: no serious/critical violations; focus visible on every interactive element; dialogs trap and return focus; skip link present.
- [ ] LCP image not lazy, has `fetchpriority="high"`; all `<img>` have width/height; videos `muted playsinline` + poster; loops >5 s have pause.
- [ ] Logical properties only in project CSS (physical ones only where direction-independent on purpose).
- [ ] All internal links between pages work; forms have labels, errors, success states.
- [ ] Every colour/font/size in project CSS is a token (grep for stray hex).
- [ ] Hebrew: `dir="rtl" lang="he"` on `<html>`; numbers/prices formatted with `he-IL`; arrows mirrored; marquee/hscroll/carousel direction flips.

## D2. Accessibility (WCAG 2.2 AA / IS 5568; checked on every page)
- [ ] Focus not obscured (2.4.11): `html { scroll-padding-block-start: calc(var(--header-h) + 16px) }` (core.css) and the sticky/hide-on-scroll header reveals on `:focus-within`; cookie bar/sticky ATC never cover the focused element.
- [ ] No text dimmed by opacity for inactive, scroll-lit or "disabled-looking" states: recede by colour (a token mix that passes 4.5:1, or 3:1 only for text ≥24px / ≥18.66px bold). `split-reveal` `data-variant="colour"` does this.
- [ ] `prefers-contrast: more` and `forced-colors: active` checked once (core.css basics: muted → ink-2, solid rules, bordered controls, focus = Highlight); no information by colour alone (status, errors, required fields, stock have text or icon too).
- [ ] Text spacing (1.4.12): no fixed heights / clipped overflow on text containers; buttons and labels grow. Test by applying `* { line-height:1.5!important; letter-spacing:.12em!important; word-spacing:.16em!important } p { margin-block-end: 2em!important }`.
- [ ] Reflow (1.4.10): no horizontal scroll at 320 px (verify.mjs width 320).
- [ ] Forms: error summary pattern (`pages/_shared.md` §3, Consent & forms); errors linked with `aria-describedby`; required marked in text.
- [ ] Animated text keeps a static accessible name: `split-reveal`, `text-fx`, `counter` keep the real text in `.sr-only` / `aria-label` (headings only) with aria-hidden animated copies (`runtime/README.md` §11).

## E. Delivery
- [ ] `_gallery.html` page gallery linking every page (+ concepts if any); `index.html` is the Home page.
- [ ] Links to un-built pages use `#todo-<page>` (handled by `fx/todo-links`: a "not in this delivery" dialog) and are listed in `pages.md`.
- [ ] Cookie bar is the slim bottom bar (<= 64px desktop, <= 25% of the viewport on mobile) and does not cover the hero CTA at 390x844 (`pages/_shared.md` §3).
- [ ] Multi-page static store preview: cart `data-persist="true"` (removed in WooCommerce).
- [ ] `DESIGN.md` matches what was built.
- [ ] Placeholder list (images, copy, numbers) given to the user; every placeholder is a `.todo` span (`[TODO: …]` / `[להשלמה: …]`) so verify.mjs counts them.
- [ ] `.studio-design/log.json` updated.
- [ ] If WordPress target: section → ACF layout map and field list included.
