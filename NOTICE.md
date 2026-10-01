# Third-party notices

studio-design itself is released under the [MIT License](LICENSE). It **does not bundle** any of the third-party libraries or fonts below. Generated pages load them from public CDNs at run time, or the user installs them as development tools. Each remains under its own license.

| Component | Used for | How it's used | License |
|---|---|---|---|
| **GSAP** (core + plugins: ScrollTrigger, SplitText, Flip, ScrambleText, Draggable, Inertia, CustomEase, DrawSVG, MorphSVG, MotionPath, Observer, ScrollTo) | Animation in the runtime modules | Loaded from the jsDelivr CDN (`gsap@3.15.0`); not bundled | GreenSock "Standard No Charge" license; free for commercial use, including all plugins, since 3.13. See https://gsap.com/standard-license |
| **Lenis** | Smooth scrolling (optional) | Loaded from jsDelivr (`lenis@1.3.26`); not bundled | MIT |
| **Paper Shaders** (`@paper-design/shaders`) | WebGL backgrounds in `fx/shader-bg` | Dynamically imported from jsDelivr (`0.0.81`); not bundled; attribution kept in the module header. Our code only maps tokens to its uniforms. | Apache-2.0 |
| **cobe** | WebGL dotted globe in `fx/globe` | Dynamically imported from jsDelivr (`cobe@2.0.1`); not bundled | MIT |
| **Playwright** | `verify.mjs`, `scan.mjs`, `render-stills.mjs`, `extract-catalog.mjs` (development tools only) | Installed by the user (`npm i playwright`); not bundled | Apache-2.0 |
| **axe-core** | Accessibility checks in `verify.mjs` | Injected from jsDelivr at QA time (`axe-core@4.13.0`); not bundled | MPL-2.0 |
| **Fonts** | Typography of the art directions | Not bundled. Loaded from Google Fonts or self-hosted by the user from Fontshare. Check each family's license before shipping. | Google Fonts: SIL Open Font License 1.1 (most families) · Fontshare: ITF Free Font License |

## Demo media

The images and video in `studio-design/runtime/demo/assets/` (the skyline frames, cut-out, poster and video used by the scroll-scrub demo) were generated procedurally for this project and are dedicated to the public domain under **CC0 1.0**.

The specimen pages and screenshots in `studio-design/directions/_specimens/` were made for this project. Brand names, products and copy shown in them are fictional.

## Research material

No screenshots, scan data, copy, images or code of any scanned website are included in this repository. The reference case studies are anonymized notes of measurable design decisions.

## Inspiration, not code

Runtime modules are original code. Some effects are inspired by patterns seen in public component galleries and on award sites; no third-party component code has been copied.

Product names mentioned in the docs (WordPress, WooCommerce, ACF, Shopify, Claude, Claude Code, etc.) are trademarks of their respective owners. Their use is descriptive and implies no endorsement.
