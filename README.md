# Guardrisk — Embedded Insurance page

React rebuild of `guardrisk.co.za/embedded-insurance/`, built to [SPEC.md](SPEC.md).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## What was resolved against the live site

`guardrisk.co.za` returns **403 to every non-browser client** (Cloudflare), so it could not
be read directly. The brand system and copy below were instead extracted from the Wayback
Machine snapshot of **2026-03-14**, and are real values — not the placeholders in SPEC §4.

**Brand colours** (from the live stylesheet and markup):

| Token | Value | Role |
|---|---|---|
| `--gr-color-primary` | `#1863dc` | Guardrisk blue |
| `--gr-color-primary-dark` | `#0056a7` | pressed/dark states |
| `--gr-color-accent` | `#ffaf00` | Guardrisk gold |
| `--gr-color-ink` | `#212121` | headings |
| `--gr-color-body` | `#4e4b66` | body text |
| `--gr-color-border` | `#ebebeb` | hairlines |
| `--gr-color-surface-alt` | `#f4f4f4` | alternate surface |

Colours in the page source belonging to the WordPress Gutenberg default palette
(`#00d084`, `#0693e3`, `#cf2e2e`, …) were excluded — they are editor defaults, not brand.

One deliberate deviation: `--gr-color-primary-deep` — the ground for the hero, the compliance
band, Diagram C's hub and the footer — is **`#000000`** per Marco, not a brand-derived navy.
Every white/gold overlay on it was re-checked and passes AA (gold on black is 11.4:1).

**Typography is deliberately NOT the live site's.** The live site runs Open Sans inside a
WordPress theme; per Marco's instruction the colours are retained and everything else is
modernised. This page uses **Instrument Sans** (display), **Inter** (body) and **JetBrains
Mono** (technical labels, used sparingly).

**Vendor naming:** the platform layer is named by capability ("API-native policy administration" / "Policy administration system"), not by vendor. SPEC §1 attributes it to the insurtech Root, but Root is not named on the live page and Marco confirmed it stays unnamed.

**Copy** — hero, definition, architecture, product library, binder/ecosystem, speed-to-market,
the four benefit cards and the closing CTA are all verbatim from the live page. The footer
legal notice and the licensed-entity names are reproduced word-for-word.

## Still needs sign-off before this ships

1. **Product descriptions** — the four product *names* are Guardrisk's; the one-line
   descriptions are SPEC §9 scaffolding. Marked `[PLACEHOLDER COPY]` in
   `ProductCatalogue.jsx`.
2. **Integration timeline has no week ranges.** Deliberate — SPEC §7 forbids fabricating them
   since they read as a commitment. Add a `weeks` key per milestone once confirmed.
3. **FSP numbers are absent** — not published on the pages consulted, and SPEC §9 forbids
   guessing them. Compliance to supply.
4. **Footer logo is reversed with a CSS filter.** The supplied asset
   (`/wp-content/uploads/2023/02/guardrisk-logo-1200x209-1.png`) is black-on-transparent and
   vanishes on the black footer, so `.gr-logo--light` renders it solid white via
   `brightness(0) invert(1)` — which drops the gold from the hexagons. Ask the brand team for
   the official reversed/white lockup, and ideally an SVG; the site ships only this raster
   version. The header uses the asset unmodified.
   Note the logo's gold is `#fbb915`, marginally warmer than the site's `#ffaf00` — left as-is,
   but worth confirming which is canonical.
5. **Logo is vendored locally** at `public/guardrisk-logo.png`. It was originally hotlinked
   from `guardrisk.co.za`, but Cloudflare began returning 403 for the image and broke the logo
   in both the header and footer. The local copy is identical (1200×209, transparent, same
   black + `#fcb915`). On merge, point `LOGO_SRC` in `GuardriskLogo.jsx` at the real WordPress
   upload path, which will be same-origin and unaffected.
6. **Hero headline** uses SPEC §9's proposed line. The live H1 is "Guardrisk Embedded
   Insurance — Powering the Future of Embedded Insurance" if marketing prefers it.
7. **Header/footer are stand-ins.** Nav links, footer links and legal text are real, but on
   merge into the Guardrisk codebase drop `SiteHeader`/`SiteFooter` and mount the page inside
   the existing global layout (SPEC §6).

## Deliberate departures from SPEC

- **Hero carries an illustration.** SPEC §3 says "no diagram" in the hero; a checkout
  illustration (`CheckoutIllustration.jsx`) was added at Marco's request. It is styled quieter
  than the four section diagrams so it supports the headline rather than competing with it.
  Prices are neutral bars, never numerals — a figure would read as a real quote.
- **Diagram B's description panel sits beside the stack, not below it.** SPEC §7 asked for an
  expanded description on hover; placing it under the diagram meant the text appeared up to
  600px from the band being pointed at. On ≥900px the panel is now pinned to the vertical
  centre of the active band and glides between bands. Below 768px there is no hover and no
  room for a side panel, so nothing is hidden: every layer's detail is listed in full beneath
  the diagram.

## Verified

- No horizontal overflow at 360 / 500 / 768 / 1440px; all four diagrams have distinct mobile
  layouts (recomputed SVG geometry, not shrunk desktop drawings).
- All four SVGs ship `<title>` + `<desc>`; Diagram C also carries an HTML legend on mobile.
- `prefers-reduced-motion: reduce` → every reveal and diagram renders fully visible with no
  transitions (verified with Chrome's `--force-prefers-reduced-motion`).
- Diagram B layers are keyboard focusable and operable with Enter/Space, not hover-only.
- Body/heading/UI colour pairs pass WCAG AA. Gold (`#ffaf00`) is **fill-only** — it is 1.84:1
  on white and never carries text or acts as a lone hairline.
- No console errors or warnings.
