# Guardrisk Embedded Insurance — Page Rebuild
### Technical Specification for Claude Code (React Implementation)

---

## 0. Read this first (instructions for the build agent)

This spec was drafted while `https://guardrisk.co.za/embedded-insurance/` was returning a
**520 error** (Cloudflare could not reach the origin). The content below was reconstructed
from search-engine cache, so copy is directionally accurate but not guaranteed verbatim, and
**no exact design tokens (hex colors, font families, spacing scale) could be extracted.**

Before writing any component code:

1. **Attempt to fetch the live page** at `https://guardrisk.co.za/embedded-insurance/` and
   `https://guardrisk.co.za/` (homepage, for global nav/footer/brand system). If reachable,
   extract via computed styles / view-source:
   - Primary, secondary, and accent brand colors (hex)
   - Font families (display + body), including any custom `@font-face` / Google Fonts / Adobe
     Fonts references
   - Logo asset (SVG preferred) and favicon
   - Header/nav structure, footer structure, legal/compliance boilerplate text
   - Exact current copy per section (replace the placeholder copy in §9 with the real text)
2. **If the site is still unreachable**, use the placeholder token system in §5 as a
   starting point, flag every guessed value clearly in code comments (`/* PLACEHOLDER —
   confirm against live brand */`), and ask Marco for the brand guideline doc or a few
   screenshots before finalizing colors.
3. Do not invent Guardrisk product names, licensing claims, or regulatory statements. Where
   real copy isn't available, use the placeholder copy provided and mark it `[PLACEHOLDER
   COPY]` in a code comment so it's easy to find-and-replace later.

---

## 1. Objective

Rebuild the "Embedded Insurance" page as a standalone React page/route that:

- **Preserves** Guardrisk's existing visual identity (colors, type, logo, voice, footer/legal
  structure) so it feels like a native part of guardrisk.co.za, not a redesign of the brand.
- **Substantially upgrades UI/UX** relative to the current page, specifically by replacing
  dense paragraph explanations with custom SVG diagrams for anything structural, sequential,
  or systemic (how embedded insurance works, the integration architecture, the partner
  ecosystem, the go-live timeline).
- Targets a **B2B buyer persona**: retailers, OEMs, fintechs, and banks evaluating whether to
  embed insurance into their checkout/product flow. The page needs to read as credible,
  technical, and fast to scan — not consumer marketing.

This is Guardrisk's **Embed 2.0** proposition: an API-native embedded insurance platform,
built in partnership with the insurtech Root, wrapped in Guardrisk's licensed cell captive /
binder infrastructure.

---

## 2. Current Page — Content Summary (source: search cache, verify against live site)

Reconstructed sections/messaging from the existing page:

- **Hero premise**: "Imagine buying a smartphone online and adding screen protection at
  checkout, or purchasing a vehicle online and automatically receiving mechanical warranty
  cover — that's the power of embedded insurance."
- **Core pitch**: Guardrisk Embedded Insurance combines advanced technology with decades of
  insurance expertise. A scalable, API-native platform enables seamless, compliant, and
  efficient embedded insurance integrations, backed by a library of pre-configured insurance
  products and end-to-end administration.
- **Product catalogue**: device cover, extended warranties, funeral cover, credit protection
  — described as a "growing catalogue of pre-configured, compliant insurance products...
  ready for digital deployment."
- **Technical architecture claim**: "Built from the ground up as an API-native system, the
  policy administration layer allows real-time policy issuance, premium collection, and
  claims management." Designed for embedding at checkout with "no manual intervention."
- **Operating model**: Delivered "through Guardrisk's network of licensed outsource binders
  and administrators" — full binder, claims, and policy administration capability, ensuring
  operational efficiency and regulatory compliance.
- **Speed-to-market claim**: "Launch embedded insurance products in weeks, not months."
- **Broader context** (from Guardrisk press/thought-leadership, useful for framing but not
  necessarily on-page): Guardrisk's embedded infrastructure is built through a strategic
  partnership with insurtech **Root**, serving retailers, motor manufacturers/OEMs, and
  fintechs; the trend is described internally as a shift from "vehicle owner as customer" to
  "dealers, finance providers and OEMs as customer."

Treat all of the above as the factual backbone. The rebuild should preserve these claims,
not invent new regulatory or capability claims.

---

## 3. Information Architecture — New Page Structure

| # | Section | Purpose | Visual treatment |
|---|---------|---------|-------------------|
| 1 | Hero | State the value prop in one line + the smartphone/vehicle example | Split layout: headline + concise example callout, no diagram |
| 2 | What is embedded insurance | Define the category for a buyer who may not know the term | **SVG diagram A** — "moment of embedding" flow (customer journey with an insurance step inserted) |
| 3 | How it works (architecture) | Show the technical/legal stack: brand's checkout → API → Root policy admin → Guardrisk licence & capital → binder/administrator | **SVG diagram B** — layered architecture diagram |
| 4 | Product catalogue | Browsable set of pre-configured products | Card grid, icon per product, no diagram needed |
| 5 | Ecosystem / who's involved | Clarify roles: Guardrisk, Root, binder holders/administrators, distribution partner | **SVG diagram C** — ecosystem/roles diagram |
| 6 | Speed to market / integration journey | "Weeks, not months" — make this concrete | **SVG diagram D** — horizontal timeline/step diagram |
| 7 | Compliance & trust | Licensing, regulatory backing, capital strength | Trust bar / logo-style credibility strip, no diagram |
| 8 | Case study strip | The smartphone screen-protection / vehicle warranty examples made tangible | Two illustrated example cards |
| 9 | CTA | Talk to the embedded insurance team | Simple, high-contrast closing band |

Sections 2, 3, 5, 6 are the four SVG diagrams — this is the core UX upgrade. Full specs in
§7. Everything else uses restrained motion and typography rather than diagrams, per the
design principle: **a diagram earns its place by showing structure a paragraph can't.**

---

## 4. Design System — Tokens

**These are placeholders.** Replace with real extracted values per §0 before final build.
Keep the token names stable so swapping values doesn't require touching component code.

```css
:root {
  /* --- Brand (PLACEHOLDER — confirm hex against live site) --- */
  --gr-color-primary: #003D5B;      /* likely deep navy/teal — Guardrisk's institutional blue */
  --gr-color-primary-dark: #00293D;
  --gr-color-accent: #00A99D;        /* teal/turquoise accent, common in SA fin-services brands */
  --gr-color-accent-warm: #F5A623;   /* secondary CTA/highlight accent — verify */

  /* --- Neutrals --- */
  --gr-color-ink: #10151A;
  --gr-color-body: #3C444C;
  --gr-color-muted: #6B7280;
  --gr-color-border: #E4E7EB;
  --gr-color-surface: #FFFFFF;
  --gr-color-surface-alt: #F6F8F9;

  /* --- Type --- */
  --gr-font-display: "Inter", "Helvetica Neue", Arial, sans-serif; /* verify vs live @font-face */
  --gr-font-body: "Inter", "Helvetica Neue", Arial, sans-serif;
  --gr-font-mono: "IBM Plex Mono", monospace; /* used only in architecture diagram labels */

  /* --- Scale --- */
  --gr-space-1: 4px;  --gr-space-2: 8px;  --gr-space-3: 12px; --gr-space-4: 16px;
  --gr-space-6: 24px; --gr-space-8: 32px; --gr-space-12: 48px; --gr-space-16: 64px;
  --gr-radius-sm: 6px; --gr-radius-md: 12px; --gr-radius-lg: 20px;

  /* --- Motion --- */
  --gr-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --gr-duration-fast: 150ms;
  --gr-duration-base: 300ms;
  --gr-duration-slow: 600ms;
}
```

**Design direction notes (to avoid a templated feel — see frontend-design guidance):**
- Do not default to a generic SaaS look (rounded gradient blobs, floating 3D shapes, stock
  isometric illustration). Guardrisk sells regulatory trust and infrastructure — the visual
  language should read as **precise, systems-oriented, and licensed**, closer to a fintech
  infrastructure product (think: Stripe's or Plaid's docs-adjacent marketing pages) than a
  consumer insurance brand.
- The four SVG diagrams are the signature element of this rebuild. Everything else (type,
  spacing, card grid) should be quiet and disciplined so the diagrams carry the visual
  interest.
- Use one restrained accent color for "flow" elements (arrows, active states, connecting
  lines) across all four diagrams so they read as one coherent visual system, not four
  unrelated graphics.

---

## 5. Component Architecture (React)

```
src/
  pages/
    EmbeddedInsurancePage.jsx
  components/
    embedded/
      Hero.jsx
      WhatIsEmbedded.jsx
      DiagramMomentOfEmbedding.jsx      # Diagram A (inline SVG component)
      HowItWorks.jsx
      DiagramArchitectureStack.jsx      # Diagram B
      ProductCatalogue.jsx
      ProductCard.jsx
      Ecosystem.jsx
      DiagramEcosystemRoles.jsx         # Diagram C
      IntegrationJourney.jsx
      DiagramIntegrationTimeline.jsx    # Diagram D
      ComplianceTrustBar.jsx
      CaseStudyStrip.jsx
      CaseStudyCard.jsx
      ClosingCTA.jsx
    shared/
      SectionEyebrow.jsx
      Container.jsx
      RevealOnScroll.jsx                # wraps children, IntersectionObserver-based fade/slide-in
  hooks/
    useInView.js                        # underlies RevealOnScroll and diagram step-through
    usePrefersReducedMotion.js
  styles/
    tokens.css                          # §4 tokens
    embedded-insurance.css              # page-scoped styles
```

**Conventions:**
- Each diagram is its **own component**, not inlined in the section component, so it can be
  developed/tested/tweaked independently and reused (e.g. architecture diagram might also be
  useful on a partner/investor deck page later).
- Diagrams are **inline `<svg>` JSX**, not imported image files — this is required for
  scroll-triggered step animation, hover states on individual nodes, and responsive
  re-layout (mobile stacks the architecture diagram vertically instead of horizontally).
- `RevealOnScroll` and `usePrefersReducedMotion` are shared utilities — every animated
  element must respect `prefers-reduced-motion: reduce` by disabling motion, not just
  shortening it.
- No external diagram/animation library is required (no Framer Motion dependency assumed —
  if Claude Code's environment already has it available, native CSS transitions +
  IntersectionObserver are still preferred here for a lighter bundle, since these are simple
  enter/exit and path-draw effects).

---

## 6. Page-level layout notes

- Reuse the **existing Guardrisk global header and footer** (nav, legal entity disclosures,
  FSP numbers) rather than rebuilding them — pull the real markup/copy from the live site
  once reachable. This page is one route inside the existing site's IA, not a microsite.
- Max content width: 1200px, generous side padding on mobile (`--gr-space-4` minimum).
- Section vertical rhythm: `--gr-space-16` between major sections on desktop, `--gr-space-8`
  on mobile — keep it consistent so the page doesn't feel like assembled blocks.

---

## 7. SVG Diagram Specifications

General rules for all four diagrams:
- Built as responsive inline SVG with a `viewBox`, not fixed pixel dimensions.
- Use CSS variables for all fill/stroke colors so they inherit the token system and (for
  free) support a future dark-mode pass.
- Each diagram should have **one entry animation** on scroll-into-view (nodes/paths draw in
  sequence, ~600–900ms total, staggered ~100–150ms per element) and, where noted, **hover
  interactivity** on individual nodes. Do not add continuous ambient animation (e.g. looping
  pulses) — it reads as decoration, not information, on a B2B trust-building page.
- Every diagram needs a text-equivalent: either visually-hidden `<title>`/`<desc>` elements
  inside the SVG, or an adjacent plain-language summary paragraph, so the content isn't
  lost to screen readers.

### Diagram A — "The moment of embedding" (in `WhatIsEmbedded`)

**Purpose**: Show a buyer's checkout journey with an insurance step inserted at the moment
of purchase — this is the single clearest way to explain "embedded insurance" to someone
unfamiliar with the term.

**Structure**: Horizontal 4-step flow (stacks vertically on mobile):
`Customer selects product → Adds to cart / checkout → [highlighted] Insurance offer appears
inline → Cover is active immediately`

- Steps 1, 2, 4 rendered as neutral nodes (icon + short label).
- Step 3 ("Insurance offer appears inline") rendered in the accent color, visually distinct
  (e.g. a card lifted slightly with a subtle shadow / outline), since it's the concept being
  taught.
- Connecting arrows between nodes draw in on scroll.
- Optional: a small toggle or two tab-like labels above the flow — "Buying a phone" /
  "Buying a car" — swapping the icon set and micro-copy for step 1 and step 3 to mirror the
  two examples already in the hero copy. This directly ties the diagram to existing brand
  copy rather than inventing a new example.

### Diagram B — Architecture stack (in `HowItWorks`)

**Purpose**: This is the most important diagram on the page for a technical/procurement
buyer — it shows what's actually happening behind "API-native."

**Structure**: Vertical layered stack (or horizontal on wide desktop, vertical stack on
tablet/mobile), top to bottom:

1. **Partner's digital surface** (retailer/OEM/fintech checkout or app) — the layer the
   buyer owns
2. **API integration layer** — labeled with the real-time capabilities: policy issuance,
   premium collection, claims initiation
3. **Root policy administration platform** — the insurtech engine
4. **Guardrisk licence & capital layer** — cell captive structure, regulatory licence,
   reinsurance access
5. **Binder holders / administrators** — the licensed outsource network handling binder,
   claims, and policy admin execution

- Each layer is a distinct horizontal band with its own label, one-line description, and a
  small icon.
- Vertical connecting line or arrow on the left/right showing data/policy flow moving both
  directions (issuance flows down, data/claims flow up) — use two thin arrows rather than
  one bidirectional arrow so the direction is unambiguous.
- **Hover interaction**: hovering (or tapping on mobile) a layer highlights it and dims the
  others slightly, with a short expanded description sliding in (reuse existing copy from
  §2 rather than inventing new claims).
- This diagram is the one place `--gr-font-mono` is appropriate, for small technical labels
  like `POST /policies`, `webhook: claim.created` — only if these are real/illustrative
  Root/Guardrisk API concepts Marco confirms are accurate; otherwise keep labels in plain
  language and skip invented endpoint names entirely.

### Diagram C — Ecosystem / roles (in `Ecosystem`)

**Purpose**: Buyers are often confused about who does what — Guardrisk vs. Root vs. the
binder holder vs. the distribution partner. This diagram disambiguates roles rather than
data flow (contrast with Diagram B, which is about the technical stack).

**Structure**: Radial/hub layout — the **distribution partner's product** in the centre,
with four labeled nodes around it:
- **Guardrisk** — licence, capital, regulatory oversight
- **Root** — technology platform, API, real-time policy admin
- **Binder holders / administrators** — claims handling, policy servicing
- **Distribution partner** (the buyer themselves, e.g. the retailer) — owns the customer
  relationship and checkout surface

- Each node connects back to the centre with a short line labeled with that party's core
  responsibility (2–4 words), not a paragraph.
- This is the one diagram where a simple, calm radial layout is more legible than a flow —
  resist adding directional arrows here since it's about roles, not sequence.

### Diagram D — Integration timeline (in `IntegrationJourney`)

**Purpose**: Make "weeks, not months" concrete and credible rather than a bare marketing
claim.

**Structure**: Horizontal timeline, 4–5 milestones (placeholder milestones below — confirm
real timeline with Marco/Guardrisk team before shipping, since this is a specific claim a
buyer could hold Guardrisk to):

`Kickoff & product selection → API integration (sandbox) → Compliance & binder sign-off →
Go-live` — optionally with an approximate week-range under each step (e.g. "Week 1", "Weeks
2–4") **only if these are real, confirmed figures** — do not fabricate a specific week count
without sign-off, since this reads as a commitment on a public page.

- Rendered as a horizontal line with milestone markers; each marker expands slightly on
  scroll-into-view in left-to-right sequence, reinforcing the "fast, sequential" feeling the
  section is arguing for.
- This is the simplest of the four diagrams by design — it's meant to be scanned in two
  seconds, not studied.

---

## 8. Interaction & Motion Spec

- **Scroll reveals**: every major section fades/slides in (12–16px translate, opacity 0→1)
  on first entry into viewport via `IntersectionObserver`, threshold ~0.2. Runs once, not on
  every scroll back into view.
- **Diagrams**: as specified per-diagram in §7 — draw-in sequence on first view, optional
  hover states, no looping ambient motion.
- **Reduced motion**: `usePrefersReducedMotion` must gate all of the above — reduced-motion
  users get an instant, fully-visible state, no transitions.
- **Product catalogue cards**: subtle lift + border-color shift on hover (`--gr-duration-fast`),
  no scale-transform (avoid layout jitter).
- Avoid parallax, cursor-follow effects, or auto-playing video — none of these suit a
  regulated B2B insurance infrastructure page.

---

## 9. Content / Copy (draft — replace with confirmed live copy per §0)

Use existing verified phrases where we have them (marked ✅ = pulled from cache, high
confidence in wording); everything else is placeholder scaffolding.

**Hero**
- Eyebrow: `Embedded Insurance`
- Headline: `Insurance, exactly where your customers already are.` *(new — verify tone fits
  brand voice; alternative: reuse existing headline once pulled from live page)*
- Subhead ✅ (paraphrase, verify exact wording live): *Buying a smartphone online and adding
  screen protection at checkout. Purchasing a vehicle and automatically receiving mechanical
  warranty cover. That's embedded insurance — and Guardrisk builds the infrastructure behind
  it.*
- Primary CTA: `Talk to our embedded team`
- Secondary CTA: `See how it works` (anchor-scrolls to Diagram B section)

**What is embedded insurance**
- ✅ Core pitch paraphrase: Guardrisk's embedded insurance platform combines an API-native
  technology layer with a licensed insurance and compliance infrastructure, so insurance can
  be issued at the exact moment a customer needs it — inside someone else's product, not a
  separate insurance journey.

**How it works**
- ✅ Real-time issuance claim: policies can be issued, premiums collected, and claims
  initiated in real time through the API layer, with no manual intervention required at
  checkout.

**Product catalogue** (card per product — icon + name + one-line description)
- Device cover — screen and accidental damage protection for phones, laptops, and tablets
- Extended warranty — mechanical and electronic warranty cover beyond the manufacturer term
- Funeral cover — simplified funeral protection distributed through partner channels
- Credit protection — cover linked to loan or credit agreements
*(confirm exact catalogue against live site — there may be more/fewer products)*

**Ecosystem**
- ✅ Operating model: delivered through Guardrisk's network of licensed outsource binder
  holders and administrators, providing full binder, claims, and policy administration
  capability.

**Integration journey**
- ✅ Speed claim: launch embedded insurance products in weeks, not months.

**Compliance & trust strip**
- Licensed non-life and life insurer, authorised Financial Services Provider *(pull exact
  FSP numbers/entity names from site footer — do not guess these)*
- Part of Momentum Group
- Cell captive licence and reinsurance access managed centrally by Guardrisk

**Closing CTA**
- Headline: `Ready to embed insurance into your product?`
- Button: `Get in touch`

---

## 10. Responsive & Accessibility Requirements

- Fully responsive down to 360px width; all four diagrams have an explicit mobile layout
  (vertical stacking), not just a shrunk version of desktop.
- All interactive diagram elements (hover states) must also work via keyboard focus and
  touch tap — no hover-only content.
- Color contrast: body text vs. background must meet WCAG AA (4.5:1) at minimum; verify once
  real brand colors are in place, since the placeholder palette in §4 should already pass
  but hasn't been checked against final values.
- Every SVG diagram ships with `<title>`/`<desc>` and/or an adjacent visible summary
  paragraph — never diagram-only content with no text equivalent.
- Visible focus states on all buttons, cards, and diagram nodes (no `outline: none` without
  a replacement focus style).

---

## 11. Tech Stack & Build Notes

- React (functional components + hooks), no class components.
- Plain CSS with the token system in §4 (CSS custom properties), optionally CSS Modules per
  component if that matches the existing Guardrisk codebase's conventions — confirm the
  target repo's existing styling approach before introducing a new one (e.g. don't add
  Tailwind if the rest of the site doesn't use it, unless Marco confirms this is a
  standalone rebuild not merged into the existing codebase).
  the existing codebase).
- No new heavy dependencies required — inline SVG + IntersectionObserver covers every
  interaction spec'd above.
- If this page will be merged into an existing Guardrisk site codebase (rather than built as
  a standalone prototype), Claude Code should first inspect that repo's structure, routing,
  and existing header/footer components and adapt the file tree in §5 to fit, rather than
  scaffolding a fresh app shell.

---

## 12. Acceptance Criteria

- [ ] All four SVG diagrams render correctly at 360px, 768px, and 1440px+ widths
- [ ] Every diagram has a working text-equivalent for screen readers
- [ ] Reduced-motion users see fully-visible content with no transitions
- [ ] All copy marked `[PLACEHOLDER COPY]` has been reviewed and replaced or explicitly
      approved by Marco before this ships
- [ ] Brand tokens in §4 have been reconciled against the live site (or brand guideline doc)
      — no placeholder hex values remain in shipped CSS
- [ ] No invented regulatory, licensing, or timeline claims remain unconfirmed
- [ ] Page reuses the existing Guardrisk global header/footer rather than a rebuilt one
- [ ] Lighthouse accessibility score ≥ 95, no console errors