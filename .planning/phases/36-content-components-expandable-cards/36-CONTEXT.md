# Phase 36: Content Components + Expandable Cards - Context

**Gathered:** 2026-07-16
**Status:** Ready for planning

<domain>
## Phase Boundary

All domain-specific interactive components are built and verified so page-assembly phases (37–38) have a complete component library: `ProjectCard.astro` (closed/expanded via native `<details>`/`<summary>`, story content in DOM when collapsed for SEO, CSS `::details-content` animation), `FAQItem.astro` (native `<details>` accordion, exclusive-open via `name` attribute, full keyboard operability), `FrequencyWave.astro` (five-line frequency-field inline SVG, theme-adaptive via `var(--color-wl-accent)` stroke), and `projects.json` promoted to the v2 schema (COMP-03, COMP-04, COMP-05, CONT-01). All components land in `src/components/wl/`, import Phase 35 primitives, and are exercised on a DEV-gated isolation page (`/dev/content-components`) that is deleted in the phase's final commit. Gated by Figma-frame vs. rendered screenshot comparison of ProjectCard (closed + expanded) and FAQItem.

**Scope amendment from this discussion:** The old neobrutalist `/projects` pages (`src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`) are deleted in THIS phase (pulled forward from Phase 41 CLEAN-01) because they build from the v1 `projects.json` that this phase rewrites. See D-06.

**Content amendment from this discussion:** `projects.json` v2 ships as explicit **placeholder data** — the Figma expanded card's copy duplicated across all entries. Joel supplies real project data later. See D-09/D-10. The original "verbatim per-card copy from Figma `12:3`" reading of CONT-01 is superseded for the card *stories*; structure and schema still come from Figma.

</domain>

<spec_lock>
## Design Contract (locked via UI-SPEC.md)

**The approved UI design contract is locked.** See `36-UI-SPEC.md` (status: approved, reviewed 2026-07-16) for the complete visual/interaction contract: component roster, token usage, type class assignments, 60/30/10 color allocation, interaction contracts (`::details-content` CSS, exclusive-open `name` attribute, focus rings, toggle indicator rotation), accessibility contract, contrast-script pairs, dev isolation page spec, and fidelity gate checklist.

Downstream agents MUST read `36-UI-SPEC.md` before planning or implementing. Its contracts are not duplicated here.

**FIDELITY-GAP protocol (from UI-SPEC):** all geometry/type/color unknowns are declared FIDELITY-GAPs requiring Wave 1 Figma MCP extraction from nodes `36:5`, `12:3`, `12:2`. Do NOT invent values to fill gaps.

</spec_lock>

<decisions>
## Implementation Decisions

### ProjectCard structure
- **D-01:** **Whole closed card is the `<summary>`.** The entire closed-state content (eyebrow, title, outcome line, summary text, tags, chevron) sits inside `<summary>` — clicking anywhere on the card expands it. Biggest touch target; matches the Figma card reading as one clickable unit.
- **D-02:** **Accept native AT flattening.** Screen readers announce the full card content as one button label. No `aria-labelledby`, no ARIA overrides — consistent with the UI-SPEC "no manual role" contract. The `<h3>` stays a real heading inside the summary (legal HTML; still in the document outline).
- **D-03:** **ProjectCards open independently.** No `name` attribute on ProjectCard `<details>` — visitors can compare two expanded stories side by side. Exclusive-open is FAQ-only behavior.
- **D-04:** **No URL anchors this phase.** Cards are not URL-addressable (`id`/hash deep-linking deferred — can be added in Phase 38 when the showcase page is assembled).

### projects.json data layer
- **D-05:** **Astro Content Collection with Zod schema.** Project data is defined in `src/content.config.ts` as a data collection using the Astro 5 `file()` loader over a single `src/data/projects.json` (array of entries). Build-time schema validation; typed `getCollection()` for Phase 38's showcase page. Matches the blog's collection pattern. CONT-01's "projects.json v2" filename stays literally true.
- **D-06:** **Delete old `/projects` pages now.** `src/pages/projects/index.astro` and `src/pages/projects/[slug].astro` (v1 neobrutalist, both consume v1 fields, both entries draft-hidden so the prod listing is already empty) are deleted in this phase rather than Phase 41. The `astro.config.mjs` redirects `/portfolio → /projects` and `/portfolio/[slug] → /projects/[slug]` are repointed to `/` for now (same treatment as `/faq`), until `/showcase` goes live.

### Animation fallback policy
- **D-07:** **Progressive enhancement for `::details-content`.** Browsers without support get instant open/close — fully functional, just not animated. No `max-height` hack, no generous-ceiling fallback. This resolves the UI-SPEC's open "verify browser support / fall back" note: the fallback IS no animation.
- **D-08:** **Chevron rotation ships independently.** The `transform: rotate()` transition on `details[open]` works in every browser — it animates even where the panel snaps open. No `@supports` coupling between the two effects. (`prefers-reduced-motion: reduce` disables both, per UI-SPEC.)

### Content: placeholder data
- **D-09:** **Dummy data, Figma-shaped.** Every `projects.json` v2 entry carries the FULL expanded-story field set (eyebrow, title, outcome, summary, tags, problem, built, result) — populated by duplicating the one Figma expanded card's copy (Showcase `12:3` expanded state) across ALL entries. The schema and rendering are fully exercised; the content is explicitly placeholder. Joel replaces it with real project data later.
- **D-10:** **Because the data is placeholder, `/showcase` must not ship publicly with it.** The Showcase page + its nav link get dev-gated (blog-gate pattern from Phase 34) until Joel supplies real data — this is a locked note for Phase 38 (captured in `<deferred>`), not Phase 36 work. Phase 36 ships no prod-visible page either way.

### Claude's Discretion
- Zod schema field optionality/strictness — mirror the UI-SPEC props contract (`title` required; others optional) unless extraction suggests otherwise.
- Exact `content.config.ts` collection name and `file()` loader mechanics.
- Whether the shared `::details-content` animation CSS lives in `global.css` or per-component `<style>` blocks.
- FAQItem question type class, surface fill, indicator SVG — FIDELITY-GAPs resolved by Wave 1 Figma extraction, not by invention.
- Isolation page internal layout (must mirror Figma `36:5` component order per UI-SPEC).
- How the old-pages deletion is sequenced within the phase (before or after the collection lands), as long as the build is green at every commit.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase design contract
- `.planning/phases/36-content-components-expandable-cards/36-UI-SPEC.md` — **Locked, approved UI design contract — MUST read before planning.** Component roster, all visual/interaction/a11y contracts, FIDELITY-GAP list, fidelity gate checklist, contrast pairs.

### Design source of truth (Figma, via figma-desktop MCP — file must be open in Figma desktop)
- Figma file `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration":
  - Components page `36:5` — Project Card (closed/expanded), FAQ Item groups; toggle indicator SVGs; all geometry FIDELITY-GAPs
  - Showcase `12:3` — ProjectCard in page context (closed + expanded); the expanded card copy that seeds ALL placeholder entries (D-09); section labels (client-work / craft-experiments)
  - Landing `12:2` (+ dark `117:103`) — FrequencyWave dimensions and page context
- Note: `export_nodes` is broken in Pencil MCP; PNG exports for fidelity comparison are done manually — use figma-desktop MCP `get_design_context`/`get_screenshot` for extraction.

### Requirements & prior decisions
- `.planning/REQUIREMENTS.md` — COMP-03, COMP-04, COMP-05, CONT-01 exact wording (note D-09 placeholder-content amendment)
- `.planning/ROADMAP.md` Phase 36 — goal + success criteria 1–5
- `.planning/phases/35-ui-primitives/35-CONTEXT.md` — component conventions: `src/components/wl/` home (D-03), props-for-data/slot-for-prose (D-08), Figma-1:1 variant naming (D-05), contrast-script extension (D-11), isolation page mechanics (D-12–15)
- `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — blog DEV-gate pattern (D-11–13, reused for showcase gating note), zero-client-JS chrome precedent, redirect precedent (`/faq → /`)
- `.planning/phases/33-token-foundation-fonts/33-CONTEXT.md` — token naming, semantic dark flip, SVG extraction discipline (D-16: MCP first, manual "Copy as SVG" fallback, never re-author by eye)
- `.planning/PROJECT.md` — palette, constraints, Figma node map

### Files this phase touches
- `src/components/wl/ProjectCard.astro`, `FAQItem.astro`, `FrequencyWave.astro` — NEW (this phase's deliverables)
- `src/components/wl/Eyebrow.astro`, `Tag.astro` — Phase 35 primitives imported by ProjectCard
- `src/components/wl/ServiceCard.astro` — card geometry precedent (`--wl-card-bg`/`--wl-card-shadow`, 18px radius, 32px/27px padding — header comment documents extraction values)
- `src/data/projects.json` — rewritten to v2 array (placeholder content per D-09)
- `src/content.config.ts` — new projects collection with Zod schema + `file()` loader (D-05)
- `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro` — DELETED (D-06)
- `astro.config.mjs` — `/portfolio*` redirects repointed to `/` (D-06)
- `src/styles/global.css` — `::details-content` animation CSS if global (Claude's discretion)
- `scripts/check-contrast.mjs` — pair matrix extended per UI-SPEC contrast table
- `src/pages/dev/content-components.astro` + `tests/accessibility/content-components.spec.ts` — temporary, deleted in final commit

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 35 primitives in `src/components/wl/`: `Eyebrow`, `Tag` compose directly into ProjectCard; `ServiceCard.astro` documents the extracted card geometry (18px radius, 32px/27px padding, `--wl-card-*` tokens) as precedent
- `--wl-card-bg` / `--wl-card-shadow` local tokens (Phase 35) — ProjectCard reuses the white-card pattern
- `.wl-*` type ramp classes in `global.css` (lines ~557–865) — `.wl-heading-h3`, `.wl-accent-outcome`, `.wl-text-body`, `.wl-label-eyebrow` cover most ProjectCard roles per UI-SPEC
- Blog DEV-gate mechanics (Phase 34) + Phase 35 isolation-page `import.meta.env.PROD` redirect pattern — reuse for `/dev/content-components`
- Blog content collection in `src/content.config.ts` — pattern for the new projects collection (D-05)
- `scripts/check-contrast.mjs` — extend PAIRS matrix, don't fork

### Established Patterns
- Zero client JS — all interactivity in this phase is native HTML (`<details>`, `name` attribute) + CSS; do not introduce scripts
- Semantic dark flip: use each token once; no `dark:` color pairs for wl colors
- Focus treatment: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent` on `<summary>` and links
- Namespace isolation: zero references to old neobrutalist tokens in any `src/components/wl/` file (fidelity gate greps for this)
- Figma-extraction discipline: MCP extraction for all FIDELITY-GAPs; flag, never invent

### Integration Points
- Phase 37 consumes FAQItem (question/answer copy from Figma `12:2`) and FrequencyWave (landing sections)
- Phase 38 consumes ProjectCard + the projects collection (`getCollection()`) for `/showcase` — the Zod schema is the contract
- `astro.config.mjs` redirects map — `/portfolio*` entries change (D-06)
- Old `/projects` pages are the LAST consumers of v1 projects.json — their deletion unblocks the v2 rewrite

</code_context>

<specifics>
## Specific Ideas

- The Figma expanded-card copy is duplicated verbatim across every placeholder entry — the *copy itself* is still Figma-sourced (not invented), only its repetition across entries is the placeholder mechanism
- ProjectCard reads as one clickable unit: whole-card summary, cursor/hover affordance derived from ServiceCard precedent (FIDELITY-GAP per UI-SPEC)
- The `::details-content` note in UI-SPEC ("fall back to max-height if support insufficient") is resolved by D-07: no max-height fallback, progressive enhancement instead

</specifics>

<deferred>
## Deferred Ideas

- **Phase 38 (locked note): dev-gate `/showcase` + nav link until real project data exists.** Joel's explicit call from this discussion — the placeholder project data (D-09) must not ship publicly. Use the blog-gate pattern (Phase 34 D-11–13): page + nav link render in dev builds only. Keep `/portfolio*` redirects pointed at `/` until the showcase goes live (then repoint to `/showcase`).
- **ProjectCard URL anchors / deep-linking** (`id` from slug, optional auto-expand) — deferred from this phase; revisit in Phase 38 during showcase assembly if wanted.

</deferred>

---

*Phase: 36-content-components-expandable-cards*
*Context gathered: 2026-07-16*
