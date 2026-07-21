# Phase 40: URL Strategy + IA Cleanup - Context

**Gathered:** 2026-07-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Two cleanup jobs, both additive-then-subtractive edits to already-shipped v3.0 infrastructure:

1. **Legacy URL redirects (IA-01)** — land redirects for the old project/contact routes in `astro.config.mjs` so no external/bookmarked link breaks, now that `/showcase` (Phase 38) exists as the successor surface.
2. **n8n contact form removal (IA-05)** — delete the orphaned n8n webhook contact form and its dead-file dependencies so `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` returns zero.

**Reality reconciliation (roadmap SC drift):** The Phase 40 roadmap success criteria were authored before Phases 36–39 landed and describe a state that has partly already happened. This discussion reconciles the roadmap's *intent* with the codebase's *actual* state:
- `src/pages/faq.astro`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro` are **already deleted** (commit `933e2f7`, Phase 36-02). Only `src/pages/thank-you.astro` remains of the SC-2 deletion list.
- The n8n form lives in `src/components/homepage/ContactSection.astro`, which is **imported nowhere** — the v3.0 landing page (`src/pages/index.astro`, Phase 37) uses `wl/` components and has no contact form. So "form removal" is dead-file deletion, not surgery on a live page.
- `astro.config.mjs` already has a `redirects:` block (`/portfolio`→`/`, `/contact`→`/#contact`, `/faq`→`/`). This phase updates targets, it doesn't create the block.

No new capabilities, no new components, no new deps. Deletions and redirect-map edits only.

</domain>

<decisions>
## Implementation Decisions

### Legacy Redirect Targets (IA-01)
- **D-01:** **Both `/portfolio` and `/projects` → `/showcase`.** Repoint the existing `/portfolio` → `/` entry to `/showcase`, and add a new `/projects` → `/showcase` entry. `/showcase` is the successor surface to the old projects/portfolio pages, matching the roadmap's `/projects`→`/showcase` intent. (Historically both route families existed: v1 `/projects` deleted in 36-02, `/portfolio` redirect repointed to `/` at the same time. Now that Showcase exists, both should land there.)
- **D-02:** **Dynamic `[slug]` variants are OMITTED (they 404).** `/projects/[slug]` and `/portfolio/[slug]` cannot redirect to the fixed URL `/showcase` — Astro static mode raises `GetStaticPathsRequired` when a dynamic segment redirects to a non-same-param destination, and `/showcase` has no `[slug]` route (it is a single `showcase.astro` page). This is the exact limitation already documented in the `astro.config.mjs` comment for `/portfolio/[slug]`. Accepted: those deep links 404. The roadmap SC-1 phrase `/projects/[slug]` → `/showcase` is technically impossible as written; omission is the correct resolution.
- **D-03:** **`/faq` → `/` already present** (config line ~78) and correct — no change; `faq.astro` already deleted.

### /contact Redirect (created by form removal)
- **D-04:** **`/contact` → Calendly `BOOKING_URL`** (external redirect). The current `/contact` → `/#contact` points at a dead anchor — there is no `#contact` section on the v3.0 homepage (confirmed: no `id="contact"` in `index.astro`). The v3.0 contact mechanism IS the Book-a-call CTA. `/contact` should therefore land on the same booking destination the site's CTAs use. **Single source of truth:** the redirect destination must reference / stay in sync with `BOOKING_URL` in `src/lib/constants.ts` (currently a Calendly placeholder). When the real Calendly link replaces the placeholder, `/contact` follows automatically if the planner wires it to the constant; if a literal string is required in `astro.config.mjs`, it MUST match `BOOKING_URL` exactly and be flagged to keep in sync.

### /thank-you Handling
- **D-05:** **Delete `thank-you.astro` + add safety redirect `/thank-you` → `/`.** The only referrer to `/thank-you` was the form's success handler (`ContactSection.astro` line ~366), which is being deleted. Rather than a hard 404 (roadmap's literal "removed"), add a cheap `/thank-you` → `/` redirect as insurance for any old bookmarks/search-cached links. Page file is deleted; the route resolves to home.

### Dead-File Cleanup Scope (IA-05)
- **D-06:** **Delete exactly the orphaned n8n-bearing files** so SC-4's grep hits zero cleanly:
  - `src/components/homepage/ContactSection.astro` — the form + n8n webhook + `PUBLIC_N8N_WEBHOOK_URL` + `hp-form-error` id + `/thank-you` redirect.
  - `src/pages/thank-you.astro` — per D-05.
  - `src/components/Services.astro` — old, orphaned; contains "n8n" in body *copy* (would trip the SC-4 grep). Deleting the dead file is cleaner than documenting a grep exception.
- **D-07:** **Broader legacy sweep stays in Phase 41.** Do NOT delete `src/components/ui/`, `src/pages/design-system*`, `src/pages/component-demo.astro`, `src/pages/test-isometric.astro`, or `src/components/illustrations/` here — those are Phase 41's explicit scope (CLEAN-01). Phase 40 removes only what IA-05 requires (n8n/form + its dead-file dependencies). **Before deleting any file, verify it is genuinely orphaned** (no live `import` from a shipped page/layout) — the three D-06 files are confirmed orphaned as of this discussion, but re-verify at execution time.

### Sequencing / Verification
- **D-08:** **Redirects confirmed in build output BEFORE deleting `thank-you.astro`.** Roadmap SC-1/SC-2 ordering: run `npm run build` and confirm the redirect entries resolve (grep `dist/` for the generated redirect/meta-refresh pages) before removing the last source page. The already-deleted pages (faq/projects) make most of this ordering moot, but the thank-you delete + `/thank-you`→`/` redirect must be confirmed together. Exact "confirmed" mechanism (grep `dist/` for redirect HTML) is planner's discretion.

### Claude's Discretion
- **Redirect wiring mechanics** — whether `/contact`'s destination is imported from `src/lib/constants.ts` into `astro.config.mjs` or hardcoded-and-flagged (D-04 constraint: must equal `BOOKING_URL`). Planner picks; contract is that `/contact` resolves to the same booking URL the CTAs use.
- **Build-output verification method** (D-08) — grep `dist/` for redirect pages, or inspect `dist/` HTML; planner picks.
- **Orphan re-verification** — the `grep -rn import` check confirming each D-06 file is unreferenced before deletion.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### This phase's authority
- `.planning/ROADMAP.md` §"Phase 40: URL Strategy + IA Cleanup" — goal + success criteria 1–4. **NOTE the drift reconciled in this CONTEXT.md:** SC-1's `/projects`/`/projects/[slug]`→`/showcase` is superseded by D-01/D-02 (dynamic variants 404); SC-2's faq/projects deletions are already done (36-02). *(ROADMAP.md was restored from truncation in commit `2399dfc` at the start of this phase — it had been clobbered to a 23-line fragment during Phase-39 planning.)*
- `.planning/REQUIREMENTS.md` — **IA-01** (Redirects: `/projects` + `/projects/[slug]` → `/showcase`; `/faq` → `/`; `/thank-you` removed), **IA-05** (Contact form + n8n webhook flow removed; no dead form code remains).

### Files edited / deleted this phase
- `astro.config.mjs` — `redirects:` block (line ~73): repoint `/portfolio`→`/showcase`, add `/projects`→`/showcase`, change `/contact`→BOOKING_URL, add `/thank-you`→`/`, keep `/faq`→`/`. The dynamic-segment limitation comment (line ~75) is the authority for D-02.
- `src/lib/constants.ts` — `BOOKING_URL` (Calendly placeholder) = single source of truth for the `/contact` redirect target (D-04).
- `src/components/homepage/ContactSection.astro` — DELETE (n8n form; the SC-4 grep target).
- `src/pages/thank-you.astro` — DELETE (D-05).
- `src/components/Services.astro` — DELETE (orphaned; "n8n" prose trips SC-4 grep).

### Prior-phase precedent
- `.planning/phases/39-utility-pages-dev-hidden-pages/39-CONTEXT.md` — sitemap `filter()` + additive `astro.config.mjs` edit pattern; `BOOKING_URL` in `src/lib/constants.ts` as the CTA source of truth.
- `.planning/phases/37-landing-page/37-CONTEXT.md` — v3.0 contact mechanism is Book-a-call (`BOOKING_URL`) + `mailto:CONTACT_EMAIL`, no form; confirms there is no `#contact` section to redirect to.

### Deferred to Phase 41 (do NOT touch here)
- `.planning/ROADMAP.md` §"Phase 41" — CLEAN-01 owns deletion of `src/components/ui/`, `src/pages/design-system*`, `component-demo.astro`, `test-isometric.astro`, `src/components/illustrations/`, and old-token purge (D-07 boundary).

</code_context>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`astro.config.mjs` `redirects:` block** — already exists (line ~73) with `/portfolio`, `/contact`, `/faq` entries. This phase edits targets and adds `/projects` + `/thank-you`, no new mechanism.
- **`src/lib/constants.ts` `BOOKING_URL`** — the Calendly placeholder every Book-a-call CTA points at; reuse as the `/contact` redirect destination (D-04).
- **`astro.config.mjs` sitemap `filter()`** — already excludes `/blog`, `/showcase`, `/services/`, `/areas/` (Phases 38/39). Not touched this phase (deleted routes drop out of the build naturally).

### Established Patterns
- **Astro static redirect limitation** — a `[param]` route cannot redirect to a fixed URL (`GetStaticPathsRequired`); it must either be omitted or redirect to a same-param destination. Documented at `astro.config.mjs` line ~75 (Phase 36-02 learning). Governs D-02.
- **Additive-then-subtractive config edits** — extend the shared config block, confirm in build output, then delete source (D-08). Same discipline as Phase 38/39 sitemap work.
- **Orphan-before-delete verification** — confirm no live `import` references a file before deleting it (D-07).

### Integration Points
- All redirect edits are in the single `redirects:` object in `astro.config.mjs`.
- Deletions: `src/components/homepage/ContactSection.astro`, `src/pages/thank-you.astro`, `src/components/Services.astro`. Confirmed orphaned (no importers) as of this discussion; re-verify at execution.
- Verification gate: `npm run build` + grep `dist/` (redirects resolve) + `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` == 0 (SC-4).

</code_context>

<specifics>
## Specific Ideas

- **/contact should feel like "get in touch"** → routes to the actual booking action (Calendly), not a dead anchor or a generic homepage bounce. This is why D-04 chose BOOKING_URL over `/` or `/#services`.
- **Safety-first on /thank-you** (D-05) — a redirect over a hard 404 because the cost is one config line and it protects any stale inbound link.
- **Grep-clean, not grep-excepted** (D-06) — delete the dead `Services.astro` rather than carry a documented SC-4 grep exception. Zero means zero.
- **Respect the 40/41 boundary** (D-07) — resist sweeping all dead files now; Phase 41 owns the broad legacy cleanup and its own quality gate.

</specifics>

<deferred>
## Deferred Ideas

- **Phase 41 legacy sweep** — delete `src/components/ui/` (Badge/Button/Card/Input/CheckboxGroup), `src/pages/design-system*`, `component-demo.astro`, `test-isometric.astro`, `src/components/illustrations/`; purge old neobrutalist tokens; rewrite CLAUDE.md; delete root-level `design/image-import-*` duplicates. Explicitly OUT of Phase 40 (D-07).
- **Real Calendly URL** — `BOOKING_URL` is still a placeholder; replacing it is a global content task, not this phase. `/contact` inherits whatever it becomes (D-04).
- **STATE.md phase-index staleness** — the STATE.md "Phase Index" table still lists Phases 38/39 as "Pending" despite completion; a housekeeping fix outside this phase's scope (noted during roadmap restoration).

</deferred>

---

*Phase: 40-url-strategy-ia-cleanup*
*Context gathered: 2026-07-20*
