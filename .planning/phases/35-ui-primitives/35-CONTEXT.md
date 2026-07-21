# Phase 35: UI Primitives - Context

**Gathered:** 2026-07-15
**Status:** Ready for planning

<domain>
## Phase Boundary

All atomic UI components from the Figma Components page (`36:5`) are built as individual Astro components, token-correct (`--wl-*` only), axe-clean, and ready for content components to import (COMP-01, COMP-02). Concretely: `CTAButton` with the four Figma variants (Solid / Ghost / Ghost-on-dark / Small) including calendar + mail icon slots, plus Eyebrow (on-light/on-dark), Tag, Callout, LinkCard, Breadcrumb, Step, **and ServiceCard (default/highlight)**. All primitives are exercised on a temporary DEV-gated isolation page that is deleted before the phase branch merges. The phase also retrofits `SiteHeader.astro`'s inline-styled Book-a-call link with the new `CTAButton` (pixel-neutral swap). Gated by Figma-frame vs. rendered screenshot comparison of the Components-page primitives block.

**Roadmap amendment from this discussion:** Success criterion 2's primitive list omitted ServiceCard even though COMP-02 (mapped to this phase) includes it — ServiceCard IS built in Phase 35. Phase 36's scope note ("Service Card" if listed there) should be read as already satisfied by this phase.

</domain>

<decisions>
## Implementation Decisions

### Scope edges
- **D-01:** **ServiceCard builds in Phase 35.** COMP-02 traceability wins over the success-criteria wording; ServiceCard (default/highlight variants) joins the primitive roster and the amended success criteria.
- **D-02:** **SiteHeader CTA retrofit in this phase.** The inline-styled Book-a-call `<a>` in `src/components/layout/SiteHeader.astro` is replaced with `<CTAButton>` once it exists. The swap must be pixel-neutral against the Phase 34-approved rendering (same 44px touch target, padding 9px/17px, radius 10px, ink background / on-ink text).
- **D-03:** **New primitives live in `src/components/wl/`** (e.g., `src/components/wl/CTAButton.astro`). Mirrors the `--wl-*` token namespace isolation; old `src/components/ui/` neobrutalist components stay untouched and die wholesale in Phase 41.
- **D-04:** **Flag, don't build.** If research on Components page `36:5` finds primitives beyond the COMP-01/02 roster (icon sets, dividers, unlisted variants), they are flagged in the phase output for roadmap triage — not built. (Calendar/mail icons are IN scope — COMP-01 names them.)

### Component APIs
- **D-05:** **Single `variant` prop, 1:1 Figma names:** `'solid' | 'ghost' | 'ghost-on-dark' | 'small'`. Small is a variant, not a separate size axis — zero translation between mockups and code (same principle as Phase 33 D-02 token naming).
- **D-06:** **Icons via `icon` name prop:** `icon="calendar" | "mail" | undefined`. The two SVGs are baked into the component as inline SVG with geometry extracted from Figma (MCP first, manual "Copy as SVG" fallback — Phase 33 D-16 discipline, never re-authored by eye). Closed set; consumers cannot inject off-brand icons.
- **D-07:** **CTAButton renders `<a>` only, `href` required.** All known uses are navigational (BOOKING_URL, mailto:, internal). No polymorphic button mode — extend only when a real `<button>` need appears.
- **D-08:** **Content convention: props for data, default slot for prose.** Structured fields are props (Step number, Breadcrumb items array, LinkCard href/title, ServiceCard variant); free-flowing copy and inline Fraunces-italic emphasis go through the default slot.

### On-dark variants (dark SURFACES, distinct from dark mode)
- **D-09:** **Explicit variant props, matching Figma 1:1** (`variant="ghost-on-dark"`, `onDark` on Eyebrow). No context auto-adaptation, no parent-class CSS detection — the page author declares which section is dark, keeping call sites greppable and Figma-traceable.
- **D-10:** **Footer precedent for colors.** On-dark variants use non-flippable values (literals or local custom properties, like `--wl-footer-*` from Phase 34) sourced from Figma — their appearance is stable across light AND dark mode. Research must verify against the dark Landing mockup `117:103` that dark-surface sections genuinely don't change in dark mode; deviations get flagged, not invented.
- **D-11:** **Extend `scripts/check-contrast.mjs`.** Every new text-on-background pair the primitives introduce (ghost-on-dark on ink, eyebrow on-dark, footer-precedent local values, tag/callout fills…) joins the pair matrix so the Phase 33 D-10 "re-run whenever values change" guarantee covers components too.

### Dev isolation page
- **D-12:** **One page, Figma order.** A single route (e.g., `/dev/primitives`) renders every primitive and variant grouped and ordered like the Figma Components page `36:5`, making the fidelity-gate screenshot comparison near-mechanical.
- **D-13:** **Theme verification: OS-level flip + ink strips.** Dark MODE is checked by emulating `prefers-color-scheme: dark` (Playwright/devtools — matches the site's system-only behavior; no toggle exists). On-dark VARIANTS sit on ink-background strips within the page so both light and dark screenshots capture them. No forced `.dark` wrapper panels (would misrepresent the global token flip).
- **D-14:** **DEV-gate + delete.** While it lives, the page only builds in dev (`import.meta.env.DEV` guard / empty `getStaticPaths` in prod — same pattern as the Phase 34 blog gate) so an accidental early merge can't ship it. The phase's final commit deletes the file; verify by grepping the prod build output.
- **D-15:** **Temporary axe spec, dies with the page.** A Playwright+axe test targets the isolation page during the phase and is deleted along with it. Durable axe coverage of the primitives arrives via the per-page tests in Phases 37–39 and the QUAL-01 final sweep.

### Claude's Discretion
- Hover/focus/active state styling where Figma's static frames don't spec them — derive minimally from existing chrome conventions (e.g., `hover:text-wl-accent`, `focus-visible:outline-wl-accent`), flag anything invented.
- Breadcrumb aria pattern (`nav` + `aria-current="page"`), Step semantics (`ol` vs standalone), and other a11y structure — standard WAI-ARIA practice, verified by the axe spec.
- Exact dev-page route name and internal layout details.
- How the ServiceCard highlight variant maps to props (`variant="highlight"` vs boolean) — follow whichever mirrors the Figma variant structure.
- Plan sizing/split across COMP-01 vs COMP-02 work.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design source of truth (Figma, via figma-desktop MCP — file must be open in Figma desktop)
- Figma file `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration":
  - Components page `36:5` — the primitives block: CTA Button set `39:31` (Solid `39:15`, Small `39:30`), Eyebrow (on-light/on-dark), Tag, Callout, Link Card, Breadcrumb, Step, Service Card (default/highlight)
  - Dark Landing mockup `117:103` — evidence for D-10 (dark-surface sections in dark mode)
  - Landing `12:2` / Showcase `12:3` — primitives in page context (hover/spacing sanity checks)
- `.planning/PROJECT.md` — palette, constraints (gaps flagged never invented, verbatim copy)

### Requirements & prior decisions
- `.planning/REQUIREMENTS.md` — COMP-01, COMP-02 exact wording (note ServiceCard amendment in `<domain>`)
- `.planning/phases/33-token-foundation-fonts/33-CONTEXT.md` — token naming (D-02), semantic dark flip (D-01), type ramp utilities (D-05–08), contrast script policy (D-09–12), SVG extraction discipline (D-16)
- `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — footer local-value precedent, WaveMark badge pattern, zero-client-JS chrome, `contact@joelshinness.com` (D-08), BOOKING_URL placeholder
- `.planning/research/SUMMARY.md` + `.planning/research/PITFALLS.md` — fidelity-drift discipline, sea-glass contrast failures

### Files this phase touches
- `src/components/wl/` — NEW directory for all Phase 35 primitives
- `src/components/layout/SiteHeader.astro` — inline CTA (with `min-h-[44px]`, padding 9px/17px, radius 10px) replaced by `<CTAButton>` (D-02)
- `src/styles/global.css` — `--wl-*` tokens incl. `--wl-on-ink` + `--wl-accent-soft-text` (PAPER-ONLY AA caveat at lines ~25-29); `.wl-label-button`, `.wl-cta-label`, `.wl-label-eyebrow` type-ramp classes already exist
- `scripts/check-contrast.mjs` — pair matrix extended with new component pairs (D-11)
- `src/pages/dev/` (or equivalent) — temporary isolation page, DEV-gated, deleted at phase end

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.wl-*` composite type classes (19 shipped in Phase 33/34): `.wl-label-button`, `.wl-cta-label`, `.wl-label-eyebrow`, `.wl-text-*`, `.wl-heading-*` — primitives compose these rather than re-declaring type styles
- `--wl-on-ink` token (light `#EAF6F3` / dark `#12333B`) — text-on-ink color for Solid CTA; note it FLIPS in dark mode, while always-dark surfaces need the non-flippable footer-precedent values (D-10)
- `--wl-accent-soft-text` — AA-safe companion, PAPER-ONLY caveat documented in global.css
- `WaveMark.astro` badge-prop pattern — precedent for structural variants toggled via props + CSS visibility
- Phase 34 blog DEV-gate mechanics — reuse for the isolation page (D-14)

### Established Patterns
- Semantic dark flip: components use each token once (`bg-wl-paper`), no `dark:` color pairs — EXCEPT on-dark variants which use non-flippable local values (D-10, footer precedent)
- Zero client JS: all Phase 35 primitives are static presentational components; interactivity (details/accordion) belongs to Phase 36
- Namespace isolation: old neobrutalist components/tokens untouched until Phase 41; new components must contain zero references to old token names (success criterion 2)
- Focus treatment from chrome: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent`

### Integration Points
- `SiteHeader.astro` desktop nav + mobile bar — both render the Book-a-call CTA to retrofit
- Phase 36 imports these primitives for ProjectCard/FAQ composition; Phases 37-39 import them for pages — API decisions (D-05–08) are the contract
- `playwright` config / existing a11y test setup — temporary axe spec hangs off the same harness

</code_context>

<specifics>
## Specific Ideas

- The SiteHeader retrofit must not change rendered output: the Phase 34 fidelity gate already approved that header, so `<CTAButton variant="small">` (or whichever variant matches) must reproduce the inline styles exactly — treat any pixel delta as a failure
- Figma models Small as a fourth variant alongside Solid/Ghost/Ghost-on-dark — the API mirrors that verbatim rather than normalizing into a size axis
- The isolation page doubles as the fidelity-gate artifact: its layout mirrors the Components page frame so the side-by-side comparison is direct

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 35-ui-primitives*
*Context gathered: 2026-07-15*
