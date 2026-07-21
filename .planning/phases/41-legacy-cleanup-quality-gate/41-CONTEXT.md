# Phase 41: Legacy Cleanup + Quality Gate - Context

**Gathered:** 2026-07-20
**Status:** Ready for planning

<domain>
## Phase Boundary

The **milestone-close** phase for v3.0. Four jobs, all subtractive + verification — no new capabilities, no new components, no new deps:

1. **Delete retired neobrutalist artifacts (CLEAN-01)** — remove every orphaned v1/v2 surface: `src/components/ui/` (Badge, Button, Card, Input, CheckboxGroup), `src/components/illustrations/`, the retired demo pages, and the additional orphaned legacy scouting surfaced (see below).
2. **Purge old tokens (CLEAN-02)** — strip the old neobrutalist system out of `src/styles/global.css` so only `--wl-*` (plus necessary base) remains; the CLEAN-02 grep returns zero.
3. **Docs + design/ cleanup (CLEAN-03)** — full v3.0 rewrite of `CLAUDE.md`; delete the 80 root-level `design/image-import-*` duplicates (after a reference check); note the Crito artifacts as archive.
4. **Quality gate (QUAL-01/02/03)** — axe-core zero violations (both themes, all pages), Lighthouse ≥90 on the expanded URL set, and Joel's manual Figma-vs-rendered visual-fidelity sign-off — the milestone-close gate.

**Reality reconciliation (roadmap SC drift):** The roadmap SC delete-list is illustrative, not exhaustive — it was authored before some cleanup already happened and before all legacy accumulated. Scouting the shipped codebase found the actual state:

- **Every live page imports the `wl/` component**, not the old root component. So the old-token-bearing files below are all **orphaned legacy** — this phase is pure deletion, NOT token migration of any live component.
- **Orphaned root components carrying old tokens** (beyond the SC's literal list): `src/components/Header.astro`, `src/components/layout/MobileNav.astro` (only importer is the orphaned `Header.astro`), `src/components/Hero.astro`, `src/components/About.astro`, `src/components/Process.astro`, `src/components/ProjectCard.astro` (superseded by `wl/ProjectCard.astro`), `src/components/BlogCard.astro` (superseded by `wl/BlogCard.astro`).
- **Retired demo/design-system surfaces still present:** `src/pages/component-demo.astro`, `src/pages/test-isometric.astro`, flat `src/pages/design-system.astro` + `src/pages/design-system.json.ts` (the SC names the folder `src/pages/design-system/`, which is **already gone**), and the `src/components/design-system/` folder (`CodeBlock.astro`, `TokenSwatch.astro`, `DesignSystemNav.astro`).
- **The only non-deletable file carrying old tokens is `src/styles/global.css`** — Phase 33 (SC-5) deliberately kept the v1/v2 `@theme` tokens/utilities for coexistence; they now get purged.
- Phases 39–40 already removed `/faq`, `/projects/*`, `/thank-you`, the n8n `ContactSection`, and `Services.astro`. Phase 40 CONTEXT explicitly **deferred this exact sweep** to Phase 41 (its D-07).

</domain>

<decisions>
## Implementation Decisions

### Deletion Scope (CLEAN-01)
- **D-01:** **Sweep ALL verified-orphaned neobrutalist legacy — the roadmap list is illustrative, not exhaustive.** Delete every file that is (a) a v1/v2 neobrutalist artifact AND (b) verified orphaned (no live `import` from a shipped page/layout) at execution time. This is the only interpretation under which CLEAN-02's "zero old-token references" grep can pass. Concretely, in scope for deletion: `src/components/ui/` (Badge/Button/Card/Input/CheckboxGroup), `src/components/illustrations/` (8 SVGs), `src/components/design-system/` (CodeBlock/TokenSwatch/DesignSystemNav), `src/pages/component-demo.astro`, `src/pages/test-isometric.astro`, `src/pages/design-system.astro`, `src/pages/design-system.json.ts`, and the orphaned root components `Header.astro`, `layout/MobileNav.astro`, `Hero.astro`, `About.astro`, `Process.astro`, `ProjectCard.astro`, `BlogCard.astro`. **Orphan-before-delete discipline (Phase 40 pattern):** re-verify each file has zero live importers at execution — do NOT delete any file a shipped page/layout still imports.

### global.css Purge (CLEAN-02)
- **D-02:** **Strip `global.css` to the `--wl-*` system + genuinely-shared base.** Remove every old `@theme` token and utility that no `wl/` component or shipped page references (`--color-yellow/turquoise/magenta` + dark variants, old text-color tokens, `--border-neo*`, `--font-heading`/Bricolage, `.shadow-neo-*`, `.iso-*`, etc.). Preserve only `--wl-*` plus base/reset/typography that v3 genuinely relies on. **Before removing any old token, confirm nothing in `wl/` transitively depends on it.** Verify the cut with `npm run build` (zero errors) + the CLEAN-02 grep returning zero + the visual gate passing.

### Quality Gate (QUAL-01/02/03)
- **D-03:** **Autonomous through axe + Lighthouse, then HALT at QUAL-03 for Joel's manual sign-off.** Execution runs deletions → token purge → axe-core (all pages, both themes) → Lighthouse CI (expanded URL set) autonomously. **axe/Lighthouse failures block-and-report — no silent auto-fix** (auto-edits to pass a gate can mask real regressions). Then execution **stops** and presents rendered screenshots beside the Figma frames for QUAL-03: Landing light + dark (`12:2` / `117:103`) and Showcase (`12:3`). **The milestone is NOT marked shipped until Joel explicitly approves.** This is a hard human gate even under `--chain`.

### Docs + design/ Cleanup (CLEAN-03)
- **D-04:** **Full accurate v3.0 rewrite of `CLAUDE.md`.** The file is currently 100% v1/v2 and gives a fresh Claude session wrong signals. Rewrite every stale section: fonts → Fraunces (headings) + Hanken Grotesk (body); token prefix → `--wl-*`; component section → the `wl/` component set (replacing the old Button/Card/Input/Badge "Design System" block); IA → no `/faq`, no `/projects`, blog is dev-only / out of nav; correct directory structure. Goal: zero v1/v2 leftovers, zero wrong signals.
- **D-05:** **Verify-then-delete the root `design/image-import-*` duplicates; note Crito as archive; delete nothing referenced.** There are ~80 root-level `design/image-import-*.png/.jpg` files. Before deleting, confirm each is genuinely duplicated elsewhere OR truly unreferenced by any `src/` import or content collection. Then delete them and add a short README/note in `design/` marking the Crito artifacts as abandoned-v2 archive (kept, not deleted).

### Claude's Discretion
- **Orphan re-verification method** (D-01) — the exact `grep -rn import` / build-based check confirming each file is unreferenced before deletion. Planner picks; contract is orphan-before-delete.
- **global.css cut line** (D-02) — which specific base/reset/typography rules must survive; determined by the planner/researcher reading `global.css` in full. Contract: CLEAN-02 grep = zero, build + visual gate pass.
- **Screenshot capture + presentation mechanics** (D-03) — how rendered light/dark screenshots are produced and shown beside Figma frames for QUAL-03. (Note the standing Pencil/manual-export constraints in the deferred/reference notes.)
- **Exact axe/Lighthouse URL set + commit granularity** for the deletions — planner's discretion, within the SC-defined page list.
- **Where the Crito archive note lives** (D-05) — README in `design/`, or inline note; planner picks.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### This phase's authority
- `.planning/ROADMAP.md` §"Phase 41: Legacy Cleanup + Quality Gate" — goal + success criteria 1–6. **NOTE the drift reconciled in this CONTEXT.md:** SC-1's delete-list is illustrative — D-01 extends it to all verified-orphaned legacy (root `Header/MobileNav/Hero/About/Process/ProjectCard/BlogCard`, `components/design-system/`, flat `design-system.astro`+`.json.ts`); the SC's `src/pages/design-system/` *folder* is already gone.
- `.planning/REQUIREMENTS.md` — **CLEAN-01** (retired surfaces deleted), **CLEAN-02** (old tokens removed from `global.css`; only `--wl-*` remain; zero references to old tokens/fonts), **CLEAN-03** (CLAUDE.md rewritten; `design/` root `image-import-*` dupes deleted; Crito noted as archive), **QUAL-01** (axe zero violations, both themes), **QUAL-02** (Lighthouse ≥90 expanded URL set), **QUAL-03** (Figma-vs-rendered visual gate approved by Joel — Landing light+dark + Showcase).

### Files edited / deleted this phase
- `src/styles/global.css` — the ONLY non-deletable file carrying old tokens; purge to `--wl-*` + base (D-02). Old system currently spans roughly lines ~183–543 (`--border-neo`, `--font-heading`, `.shadow-neo-*`, `.iso-*`, old color/text tokens).
- `CLAUDE.md` — full v3.0 rewrite (D-04).
- Deletion targets (D-01, re-verify orphan at execution): `src/components/ui/*`, `src/components/illustrations/*`, `src/components/design-system/*`, `src/components/{Header,Hero,About,Process,ProjectCard,BlogCard}.astro`, `src/components/layout/MobileNav.astro`, `src/pages/{component-demo,test-isometric,design-system}.astro`, `src/pages/design-system.json.ts`.
- `design/image-import-*.{png,jpg}` — ~80 root-level dupes to verify-then-delete (D-05).

### Prior-phase precedent
- `.planning/phases/40-url-strategy-ia-cleanup/40-CONTEXT.md` — the "zero means zero" delete-don't-except discipline, orphan-before-delete verification, and reality-reconciliation pattern; its D-07 explicitly defers this sweep to Phase 41.
- `.planning/ROADMAP.md` §"Phase 33" SC-5 — v1/v2 tokens were deliberately KEPT in `@theme` (namespace isolation via `--wl-`) during build-out; Phase 41 is where they get removed (governs D-02).
- `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — blog prod-exclusion (D-13) and system-only dark mode; relevant to which pages the axe/Lighthouse gate must cover in both themes.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`wl/` component set** (`src/components/wl/`: AuthorCard, BlogCard, Breadcrumb, CTAButton, Callout, Eyebrow, FAQItem, FeaturedPostCard, FrequencyWave, LinkCard, ProjectCard, ServiceCard, Step, Tag) — the v3.0 components every live page already imports. These are what CLAUDE.md's rewrite documents; nothing here is touched by the deletion sweep.
- **Existing axe-core + Lighthouse CI harness** — every prior component/page phase ran axe-in-isolation and Lighthouse-no-regression; Phase 41 runs the consolidated gate over the full page set. `lighthouserc.json` already expanded (Phase 33-02).

### Established Patterns
- **Orphan-before-delete** — confirm zero live `import` before removing any file (Phase 40). Governs every D-01 deletion.
- **Every live page imports `wl/*`** — verified: `showcase.astro` → `wl/ProjectCard`, blog pages → `wl/BlogCard`. The root-level same-named components are dead. This is why the phase is deletion, not migration.
- **Namespace isolation via `--wl-` prefix** — old and new token systems coexisted cleanly; removing the old set should not touch any `--wl-*` value.

### Integration Points
- **Verification gate:** `npm run build` (zero import errors post-deletion) + `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo\|bg-yellow\|bg-turquoise\|shadow-neo\|iso-shadow" src/` == 0 (CLEAN-02) + axe (QUAL-01) + Lighthouse (QUAL-02) + manual Figma-vs-rendered approval (QUAL-03).
- **Pages in the a11y/Lighthouse scope:** landing, showcase, blog index, blog post, 404, services/web, areas/abbotsford — both light and dark themes.

</code_context>

<specifics>
## Specific Ideas

- **"Zero means zero"** (inherited from Phase 40) — delete dead files rather than carry any grep exception; the CLEAN-02 grep must return a clean zero, not zero-with-caveats.
- **CLAUDE.md must give a fresh session zero wrong signals** (D-04) — the bar is "a new Claude session reading this file builds correctly on v3.0," not "close enough."
- **The visual-fidelity gate is a real human checkpoint** (D-03) — even under `--chain`, execution halts and waits for Joel; the milestone-shipped marker is downstream of that approval, never auto-set.
- **Safety-first deletion** (D-01, D-05) — re-verify orphan status / duplication at execution time; never delete something a shipped surface references.

</specifics>

<deferred>
## Deferred Ideas

- **Dev-only wl/ preview/reference page** — a prod-excluded showcase of the `wl/` component set was floated (Area-1 option 3) and NOT chosen; the design-system surfaces are being deleted outright. If a living component reference is ever wanted, it's a future phase.
- **Real Calendly `BOOKING_URL`** — still a placeholder (carried from Phase 40); replacing it is a global content task, not this phase.
- **STATE.md phase-index staleness** — housekeeping noted since Phase 40; outside this phase's scope.

</deferred>

---

*Phase: 41-legacy-cleanup-quality-gate*
*Context gathered: 2026-07-20*
