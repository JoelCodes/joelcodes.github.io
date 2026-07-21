# Phase 37: Landing Page - Context

**Gathered:** 2026-07-16
**Status:** Ready for planning

<domain>
## Phase Boundary

The primary conversion surface ships: `/` rebuilt with all nine Figma landing sections (Hero, Who, Three-ways `#services`, How-it-works, Automations, Proof, About `#about`, Agencies, Final CTA), copy sourced verbatim from Figma frame `12:2` (light canonical) and dark treatment from `117:103`, at all four breakpoints (390/768/1440/1920) in both themes (PAGE-01, CONT-02). All Book-a-call CTAs resolve to a single `BOOKING_URL` constant — now the **real Calendly URL** (see D-05) — and email CTAs use `mailto:contact@joelshinness.com` (IA-03, amended from `me@` per Phase 34 D-08). Anchor nav gets scroll-spy active states, smooth scroll with the existing 64px header offset, and working cross-page `/#services`/`/#about` links (IA-04). The inline FrequencyWave SVG renders theme-adaptively. Gated by Figma-frame vs. rendered screenshot comparison for Landing light + dark at all four breakpoints.

**Scope amendment from this discussion:** FUT-01 (real Calendly URL) is resolved IN this phase — Joel supplied `https://calendly.com/discovery-joelshinness/discovery-call` during discussion. No placeholder mechanics needed; SiteHeader/SiteFooter TODO constants are replaced with the real, centralized value.

</domain>

<decisions>
## Implementation Decisions

### Anchor nav active states (amends the zero-client-JS precedent)
- **D-01:** **Tiny vanilla IntersectionObserver scroll-spy ships in the chrome** (~15 lines, no framework, no library). This is the first deliberate client JS of v3.0 — the zero-JS precedent was a constraint of the chrome/component phases, not a site-wide law. Progressive enhancement: without JS, nav simply shows no active state.
- **D-02:** **Active link treatment = `text-wl-accent`, matching the existing hover treatment.** Figma's static frames don't spec an active nav state; this is a derived (not extracted) style and must be flagged as such at the fidelity gate.
- **D-03:** **No link highlighted when neither anchor section is in view.** Active state appears only while `#services` or `#about` is actually on screen (Hero, How-it-works, Proof, Final CTA, etc. show a neutral nav). The nav only claims what's true.
- **D-04:** **Expose state to AT:** the scroll-spy sets `aria-current="location"` on the active anchor link (styling hooks off the attribute, not a class); the Showcase nav link gets build-time `aria-current="page"` on `/showcase` with the same accent styling — no JS needed for that one.

### Book-a-call CTA (IA-03)
- **D-05:** **Real Calendly URL ships now:** `BOOKING_URL = "https://calendly.com/discovery-joelshinness/discovery-call"`. Resolves FUT-01. A single shared constant replaces the duplicated `/#book` TODOs in `SiteHeader.astro` and `SiteFooter.astro`; every landing Book-a-call CTA imports it.
- **D-06:** **Opens in a new tab:** `target="_blank" rel="noopener"` on all Calendly CTAs — visitor keeps the site open while booking (link-out over embed also protects Lighthouse, per milestone research).
- **D-07:** **Email stays the secondary conversion path** wherever Figma shows it: `mailto:contact@joelshinness.com`, also routed through a single shared constant alongside `BOOKING_URL`.

### Landing copy authenticity (CONT-02)
- **D-08:** **All copy in Figma frame `12:2` is real and approved — ship verbatim.** Proof stats/testimonials, About bio, Agencies pitch, service claims: everything goes live as designed. No content sign-off needed at the fidelity gate beyond the visual comparison itself. (Contrast with Phase 36's placeholder project data — the landing has no placeholder problem.)

### Copy-gap protocol (CONT-02 mechanics)
- **D-09:** **Gaps batch at the fidelity gate; the chain never blocks on copy.** When Figma copy is missing/illegible, the executor logs it to a COPY-GAPS list, renders a visible `[COPY GAP: description]` marker in the affected spot, and continues. Joel resolves the whole list at the fidelity-gate review. Never invent copy to fill a gap (v1.4 lesson stands).
- **D-10:** **Light frame `12:2` is canonical for copy, structure, and layout.** Dark frame `117:103` is consulted only for dark-theme colors/treatment. Non-color divergences between the frames are built from the light frame and logged in the COPY-GAPS batch for Joel's review.

### Claude's Discretion
- Where the shared constants module lives (`src/lib/`, `src/consts.ts`, etc.) and its exact exports.
- Scroll-spy mechanics: IntersectionObserver thresholds/rootMargin, where the script lives (inline in SiteHeader vs. asset), how it coexists with the existing `scroll-margin-top: 64px` offset.
- Landing page composition: single `index.astro` vs. per-section components — planner's call based on section size and reuse.
- Section `id` placement (`#services`, `#about`) and any additional anchors the Figma frame implies.
- FrequencyWave placement/sizing per the Figma frame; FAQItem usage if frame `12:2` includes an FAQ section (build what the frame shows).
- Fidelity-gate screenshot mechanics (per-breakpoint capture process) — follow the Phase 34–36 gate precedent.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design source of truth (Figma, via figma-desktop MCP — file must be open in Figma desktop)
- Figma file `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration":
  - Landing `12:2` — CANONICAL for all copy, structure, layout, all four breakpoints (D-10)
  - Landing dark `117:103` — dark-theme colors/treatment ONLY (D-10)
  - Components page `36:5` — component geometry already extracted in Phases 35–36; consult for section-level spacing if needed
- Note: Pencil MCP `export_nodes` is broken; fidelity PNG exports are manual. Use figma-desktop MCP `get_design_context`/`get_screenshot` for extraction.

### Requirements & prior decisions
- `.planning/REQUIREMENTS.md` — PAGE-01, CONT-02, IA-03, IA-04 exact wording (note `contact@` amendment and D-05 real-URL resolution of FUT-01)
- `.planning/ROADMAP.md` Phase 37 — goal + success criteria 1–5 (criterion 2's `me@joelshinness.com` superseded by Phase 34 D-08 → `contact@joelshinness.com`)
- `.planning/phases/36-content-components-expandable-cards/36-CONTEXT.md` — ProjectCard/FAQItem/FrequencyWave contracts, `::details-content` animation, placeholder-data caution (showcase-only, not landing)
- `.planning/phases/35-ui-primitives/35-CONTEXT.md` — component APIs (D-05–08: variant names, icon prop, `<a>`-only CTAButton, props-for-data/slot-for-prose), on-dark variant rules (D-09–10), contrast-script policy (D-11)
- `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — chrome decisions: no mobile menu (D-01), system-only dark (D-05/06), `contact@joelshinness.com` (D-07/08), blog dev-gate (D-11–13)
- `.planning/phases/33-token-foundation-fonts/33-CONTEXT.md` — token naming, semantic dark flip, type ramp, SVG extraction discipline (D-16)
- `.planning/PROJECT.md` — palette, constraints (gaps flagged never invented), Figma node map

### Files this phase touches
- `src/pages/index.astro` — rebuilt from old neobrutalist body (Hero/Services/Process/About/ContactSection imports die here; old components become Phase 41 cleanup targets)
- `src/components/layout/SiteHeader.astro` + `SiteFooter.astro` — duplicated `BOOKING_URL = '/#book'` TODOs (line ~4/5) replaced by shared-constant import; header gains scroll-spy + aria-current styling hooks
- `src/components/wl/*` — consumed, not modified: CTAButton, ServiceCard, Step, Eyebrow, Callout, LinkCard, FAQItem, FrequencyWave (+ others as the frame requires)
- `src/styles/global.css` — `scroll-margin-top: 64px` already set (line ~258); smooth-scroll + reduced-motion already handled (lines ~215, 245)
- `scripts/check-contrast.mjs` — extend if landing sections introduce new text-on-background pairs
- `tests/accessibility/` — landing axe spec per the per-page durable coverage plan (Phase 35 D-15)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Complete `src/components/wl/` library (Phases 35–36): CTAButton (4 variants + calendar/mail icons), Eyebrow, Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard (default/highlight), ProjectCard, FAQItem, FrequencyWave — the landing should compose these, not create new primitives
- `.wl-*` type ramp classes in `global.css` — full 13-style ramp for section headings/body/labels
- `WaveMark.astro` — theme-adaptive mark, already in chrome
- Smooth scroll + `scroll-margin-top: 64px` header offset + `prefers-reduced-motion` handling already in `global.css` — IA-04's offset requirement is mostly pre-wired

### Established Patterns
- Semantic dark flip: each token used once, no `dark:` pairs for wl colors; on-dark SECTIONS (if the frame has ink-background sections) use non-flippable footer-precedent values (Phase 35 D-10)
- Figma-extraction discipline: MCP extraction for all values; FIDELITY-GAP flagged, never invented
- Focus treatment: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent`
- Namespace isolation: zero references to old neobrutalist tokens in new code
- First client JS of v3.0 arrives here (D-01) — keep it minimal, vanilla, and progressive

### Integration Points
- `src/pages/index.astro` swap — the old body components (Hero, Services, Process, About, ContactSection) become dead code → Phase 41 cleanup list
- `SiteHeader.astro`/`SiteFooter.astro` — BOOKING_URL centralization touches both; scroll-spy attaches to header nav links
- Phase 38's showcase links back to `/#services` (cross-page anchor, criterion 3) — the `id` placement made here is the contract
- `/faq → /` redirect (Phase 34) — if frame `12:2` includes an FAQ section, that redirect finally lands somewhere meaningful

</code_context>

<specifics>
## Specific Ideas

- The real Calendly URL came from Joel mid-discussion: `https://calendly.com/discovery-joelshinness/discovery-call` — treat as authoritative, wire it everywhere Book-a-call appears (header, footer, landing sections)
- The scroll-spy answer "no link highlighted between sections" was an explicit honesty choice: the nav should only claim a section the visitor is actually in
- `[COPY GAP]` markers must be visually obvious in gate screenshots — they exist to be caught, not to blend in

</specifics>

<deferred>
## Deferred Ideas

- **Old landing-body components cleanup** (`Hero.astro`, `Services.astro`, `Process.astro`, `About.astro`, `homepage/ContactSection.astro`) — dead code after this phase's index.astro swap; deletion stays in Phase 41 (CLEAN-01) unless the executor finds them import-blocking
- **PROJECT.md / REQUIREMENTS.md evolution:** FUT-01 (real Calendly URL) resolved by D-05 — update the Out of Scope "placeholder BOOKING_URL" note and FUT-01 at the next evolution point

</deferred>

---

*Phase: 37-landing-page*
*Context gathered: 2026-07-16*
