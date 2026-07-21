# Phase 39: Utility Pages + Dev-Hidden Pages - Context

**Gathered:** 2026-07-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Three page surfaces are delivered this phase:

1. **`/404`** — a branded not-found page (does not exist in the repo yet), composed from Wavelength tokens/chrome. Must stay publicly reachable (no dev-hide).
2. **`/services/web`** — the full Service Web page, built from Figma frame `85:103`, dev-hidden from production indexing.
3. **`/areas/abbotsford`** — the full Area Abbotsford page, built from Figma frame `85:104`, dev-hidden, carrying `ProfessionalService` JSON-LD (`areaServed: "Abbotsford, BC"`).

The dev-hide mechanism (IA-02) extends `SEO.astro` (a `noindex` prop) and `astro.config.mjs` (a sitemap `filter()`). All design decisions are locked by `39-UI-SPEC.md`; this discussion resolves how the pages are hidden, how "real" the area/404 content is now, and the frame-drafting sequence. No new capabilities, no new components, no new npm deps.

</domain>

<decisions>
## Implementation Decisions

### Dev-Hide Mechanism (IA-02) — the resolved conflict
- **D-01:** **Strategy A — ship to prod + noindex.** Both `/services/web` and `/areas/abbotsford` are built INTO the production output. They are reachable by direct URL, **unlinked in nav**, carry `<meta name="robots" content="noindex, nofollow">`, and are excluded from the sitemap via `filter()` in `astro.config.mjs`. JSON-LD (area page) is present and valid in the build output. This matches ROADMAP PAGE-03/04 ("unlinked in prod", not redirected) and SC-2/SC-3 ("reachable by direct URL", "JSON-LD present in build output") literally. The `<link rel="canonical">` stays valid (unchanged) even when noindexed.
- **D-02:** **NO `import.meta.env.PROD` redirect.** The Phase 38 dev-gate redirect (D-01 there) existed to keep *placeholder project data* out of prod (Phase 36 D-10 lock) — that constraint does NOT apply here; the ROADMAP explicitly WANTS these pages in the build output. **`39-UI-SPEC.md` must be corrected before/during build:** remove the `if (import.meta.env.PROD) return Astro.redirect('/')` dev-gate from both the `/services/web` and `/areas/abbotsford` page contracts AND from the Interaction Contracts table ("Dev gate redirect" row). The complete hiding mechanism is: unlinked + noindex meta + sitemap filter. Nothing redirects.

### Area Abbotsford Content
- **D-03:** **Frame `85:104` copy = placeholder scaffold, not final.** Extract verbatim to build the structure, but the words are scaffold. The page stays noindexed *precisely because* the copy is not yet confirmed locally-unique — FUT-03 gates the real rewrite + full publish (flip noindex off, add to sitemap, GBP-consistent NAP). Build the structure now, refine wording later.
- **D-04:** **JSON-LD stays minimal.** Ship exactly the UI-SPEC minimal schema: `name`, `url`, `areaServed: "Abbotsford, BC"`, `serviceType`, `provider` (Person: Joel Shinness). **No `address`/`telephone`** until real GBP-consistent NAP exists (FUT-03) — mismatched/placeholder NAP would hurt local SEO. Valid and safe while noindexed.

### 404 Page
- **D-05:** **Copy locked verbatim (not derived/placeholder).** `<h1>` = "Page not found"; lead = "This page has moved or doesn't exist. Head back to the homepage to find what you're looking for."; CTA = "Back to home". This is a final decision — do NOT flag it as DERIVED at the fidelity gate; it's approved now.
- **D-06:** **FrequencyWave on 404 = Claude's discretion at render.** Build the page, then judge visually: add `<FrequencyWave>` in the background layer if the small page feels barren, omit if it feels complete. No new decoration invented either way.

### Frame Drafting & Sequencing
- **D-07:** **Frames `85:103` / `85:104` need drafting first — they are not yet fully designed.** Claude composes both frames in the brand Figma file (`1tg8wIPcvOVC5tPZ8pkGO2`) via the Figma write MCP (`use_figma` + its mandatory skills), assembling from the existing brand components/variables/tokens. Joel reviews/edits in Figma; the approved frames become the canonical extraction authority. (Phase 38 D-05/D-06 pattern applied to service/area pages.)
- **D-08:** **HARD approval checkpoint before service/area build.** No `/services/web` or `/areas/abbotsford` build work starts until Joel approves the drafted frames. This gates all frame-dependent build; the `--chain` auto-advance is preserved, only the service/area build waits. (Phase 38 D-08 pattern.)
- **D-09:** **Frame scope: 1440 + 390 per page.** Draft each page at 1440 (desktop) and 390 (mobile); 768/1920 are built responsively as the site already does. (Phase 38 D-07 pattern.)
- **D-10:** **404 builds in parallel with frame drafting.** The 404 has no frame dependency (copy locked D-05, layout recipe locked in UI-SPEC) — it proceeds immediately, not blocked by the checkpoint.

### Claude's Discretion
- **noindex wiring pattern** — `SEO.astro` gains a `noindex?: boolean` prop, OR the pages inject `<meta name="robots">` via `BaseLayout`'s `<slot name="head" />`. Planner picks; the contract is only that the rendered `<head>` contains `noindex, nofollow` for both dev-hidden pages.
- **FrequencyWave on 404** (D-06) — include/omit judged at render.
- **Figma MCP drafting mechanics** — frame placement/naming in the file; whether to draft light-only and derive dark (dark treatment follows the Phase 38 D-04 landing-recipe precedent either way).
- **Fidelity-gate screenshot mechanics** — follow the Phase 34–38 gate precedent (manual PNG export; `export_nodes` is broken; extraction via figma-desktop MCP).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### This phase's locked contracts
- `.planning/phases/39-utility-pages-dev-hidden-pages/39-UI-SPEC.md` — **the design contract; read first.** Locks tokens, type ramp, spacing/gutters, component composition, dark recipe, JSON-LD schema, accessibility + fidelity gate. **NOTE the D-02 correction:** the `import.meta.env.PROD` redirect in the two dev-hidden page contracts and the Interaction Contracts table is superseded — Strategy A (ship + noindex, no redirect) governs.
- `.planning/ROADMAP.md` §"Phase 39" — goal + success criteria 1–4 (SC-2/SC-3 confirm Strategy A: reachable by URL, JSON-LD in build output).
- `.planning/REQUIREMENTS.md` — PAGE-03 (service web dev-hidden: noindex, out of sitemap, unlinked in prod), PAGE-04 (area page + ProfessionalService JSON-LD, dev-hidden until locally-unique copy), PAGE-05 (404 rebrand), IA-02 (dev-hide mechanism verified in prod build output). FUT-03 = deferred Abbotsford publish.

### Prior-phase precedent (patterns reused verbatim)
- `.planning/phases/38-showcase-page-blog-restyle/38-CONTEXT.md` — D-05–D-08 Figma frame-drafting + hard-approval-checkpoint pattern (applied here D-07/D-08/D-09); D-04 dark-recipe-for-frames-without-dark-variants; sitemap filter mechanics. **NOTE:** the D-01 prod-*redirect* dev-gate is NOT reused here (see D-02).
- `.planning/phases/37-landing-page/37-CONTEXT.md` / `37-UI-SPEC.md` — gutter pattern, 112px section padding, 1120px max-width, `BOOKING_URL` in `src/lib/constants.ts`, copy-gap protocol, focus-ring convention.

### Code touched / extended
- `src/components/SEO.astro` — add optional `noindex` prop (or head-slot wiring); existing JSON-LD `set:html` pattern is the model for the ProfessionalService block.
- `src/layouts/BaseLayout.astro` — `<slot name="head" />` for per-page meta + JSON-LD injection; FOUC/dark script.
- `astro.config.mjs` — extend the Phase 38 sitemap `filter()` (currently excludes `/blog`, `/showcase`) to also exclude `/services/` and `/areas/`.
- `src/styles/global.css` — all `--wl-*` tokens + 13-style type ramp (shipped, Phases 33–38).
- `src/components/wl/*` — pre-built, gate-approved components (ServiceCard, Step, Eyebrow, CTAButton, Callout, LinkCard, FrequencyWave, Breadcrumb) — compose only.

### Figma (to be drafted this phase, then canonical)
- Brand file `1tg8wIPcvOVC5tPZ8pkGO2`, frame `85:103` (Service Web) and `85:104` (Area Abbotsford) — **not fully designed yet; drafted + approved in Wave 1 (D-07/D-08).** Writing needs the claude.ai Figma MCP (`use_figma`); extraction/screenshots use the figma-desktop MCP.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`src/components/wl/` component set** — ServiceCard (`variant`, `headingLevel`), Step, Eyebrow, CTAButton (renders `<a>`, `icon="calendar"`, `href={BOOKING_URL}`), Callout, LinkCard, FrequencyWave, Breadcrumb. All gate-approved Phases 35–36; compose only, no modification.
- **`BaseLayout.astro`** — chrome shell + `<slot name="head" />`, the injection point for `noindex` meta and the ProfessionalService JSON-LD.
- **`SEO.astro`** — existing `set:html={JSON.stringify(personSchema)}` JSON-LD pattern is the template for the new ProfessionalService block; gets the `noindex` prop.
- **`astro.config.mjs` sitemap `filter()`** — already excludes `/blog` and `/showcase` (Phase 38); this phase appends `/services/` and `/areas/`.
- **`src/lib/constants.ts`** — `BOOKING_URL` for all Book-a-call CTAs.

### Established Patterns
- **Semantic dark flip** — one token per rule, `.dark` block flips; no `dark:` pairs on wl color tokens. Gradient literals use `[background:...] dark:[background:...]` arbitrary-value class syntax (Phase 38 Rule 1), never inline `style`.
- **Figma-extraction discipline (v1.4)** — never invent a value or copy; flag FIDELITY-GAP / `[COPY GAP]` (yellow bg + red outline), batch-resolve at the fidelity gate. Extended here to *frame drafting* for the not-yet-designed service/area frames (D-07).
- **Frame-drafting + hard checkpoint** — Phase 38 D-05–D-08: Claude drafts in Figma, Joel approves, build gated on approval.
- **Focus ring** — `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent` on every interactive element.
- **Heading hierarchy** — one `<h1>` per page, sections `<h2>`, card titles `<h3>` via `headingLevel={3}`; axe-enforced, no skips.

### Integration Points
- New pages: `src/pages/404.astro`, `src/pages/services/web.astro`, `src/pages/areas/abbotsford.astro`.
- Sitemap filter (`astro.config.mjs`) + `SEO.astro` noindex prop are the only shared-file touches — both additive extensions of Phase 38 work.
- axe specs added to `tests/accessibility/` (404, services-web, areas-abbotsford — light + dark); contrast pairs appended to `scripts/check-contrast.mjs` only for net-new bg literals surfaced by frame extraction.

</code_context>

<specifics>
## Specific Ideas

- **The dev-hide is deliberately "soft."** Strategy A keeps the pages live-but-quiet: reachable, JSON-LD indexable-if-crawled, but noindexed + unsitemapped + unlinked. The launch path (FUT-03/FUT-04/FUT-05) is a single flip — drop `noindex`, remove the sitemap filter entry, add a nav link — no rebuild of the hiding mechanism.
- **404 copy is final**, not a gate placeholder (D-05). Warm/competent brand voice, not gimmicky.
- **Frames must be drawn before code** — Joel keeps Figma the literal single source of truth; no "derived from patterns" shortcut for a whole page surface (mirrors the Phase 38 blog-frame stance).

</specifics>

<deferred>
## Deferred Ideas

- **FUT-03** — Publish `/areas/abbotsford`: locally-unique copy rewrite + GBP-consistent NAP in JSON-LD, then flip noindex off / add to sitemap / link in nav. Gated out of this phase (D-03/D-04).
- **FUT-04** — Additional service pages (Automations, AI) on the Service Web template. Not this phase.
- **FUT-05** — Blog back into public nav. Separate future flip.
- **Nav "Services" dropdown / active state on `/services/web`** — out of scope; nav stays unchanged, the "Services" link continues to anchor `/#services`.

</deferred>

---

*Phase: 39-utility-pages-dev-hidden-pages*
*Context gathered: 2026-07-20*
