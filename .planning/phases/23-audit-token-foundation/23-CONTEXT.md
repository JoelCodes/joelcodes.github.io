# Phase 23: Audit + Token Foundation - Context

**Gathered:** 2026-05-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Live Pencil MCP audit of `design/Crito.pen` produces a versioned `PEN-INVENTORY.md` that classifies every top-level frame (IN-SCOPE for a Joel page, IN-SCOPE for token-mining only, OUT-OF-SCOPE, or Joel-only with no Crito reference) and catalogues every IN-SCOPE child section by status. A two-tier token foundation (primitives + semantic aliases) covering color, typography (display through caption + prose), spacing, and radii is written into the `.pen` via `set_variables`. A `_Tokens & Foundations` reference frame at the top of canvas renders every token as a live swatch / type specimen / spacing visualization. Page frames are untouched — zero visual mutation to any Crito frame in this phase.

</domain>

<decisions>
## Implementation Decisions

### Dark-Mode Token Encoding (T7 conflict resolved)
- **D-01:** Omit dark slots entirely. No `@light,@dark` Pencil variable syntax. Tokens are single-theme for v2.0 (per TOKEN-07). When dark mode is designed in a future milestone, dark values get added then — no pre-named slots.
- **D-02:** Document the omission explicitly in the `_Tokens & Foundations` reference frame so future-Joel and downstream code agents understand the absence is intentional, not an oversight.

### Ground-Truth Source for Token Values
- **D-03:** **Primary source:** `search_all_unique_properties` over already-editable nodes in `design/Crito.pen`. Whatever Pencil retained from the Figma import becomes the primitive set.
- **D-04:** **Fallback source:** the Crito `.fig` at `design/images/Consulting & Agency Website Template I Crito (Community).fig`, opened in Figma desktop, used to fill gaps where Pencil's coverage is thin. (Note: the Alliatus `.fig` at `design/` root is an unrelated leftover — do not consult.)
- **D-05:** **Coverage checkpoint:** plan 23-01 ends with an explicit checkpoint. If `search_all_unique_properties` returns thin coverage (Claude's judgement — e.g., fewer than ~5 unique color values, fewer than ~3 unique font sizes, or no visible spacing-scale pattern), the phase PAUSES and surfaces findings to the user before plans 23-03 / 23-04 write any token. Prevents inventing values to fill a sparse audit.

### IN-SCOPE Crito Frame Mapping
- **D-06:** Joel's page set: Homepage, Projects, Blog, FAQ, Contact, Thank-you, Design system, 404. Each Crito frame is classified against this set.
- **D-07:** **Crito About + Service standalone frames are IN-SCOPE for token-mining only.** Their typography / colors / spacing values feed the token foundation. They are NOT reconstructed as Joel pages — Joel's About and Services live inside Homepage. Their section structures become CANDIDATES (not commitments) for Phase 31 Homepage rebuild (About section, Services section).
- **D-08:** **`/design-system` and `/404` are tagged "joel-only — no Crito reference"** in PEN-INVENTORY.md. Phases 30 (design-system) and 26 (404 + FAQ) design these from Joel's needs + the token system, not from Crito source. Explicit absence beats forced-fit mapping.

### OPEN-Flag Close Policy
- **D-09:** OPEN flags do NOT block Phase 23 close. The phase ships when its five Success Criteria (per ROADMAP.md) are met, regardless of how many OPEN flags accumulate.
- **D-10:** OPEN flags live in PEN-INVENTORY.md `## Open Flags` section as a structured list. Per-entry schema: `id` (e.g., `OPEN-23-01`), `category` (audit / token / page), `severity` (critical / notable / minor), `description`, `blocker-for-phase` (Phase N or `none`).
- **D-11:** Later phases resolve OPENs as their need surfaces. Milestone close (Phase 32) gates ONLY on `critical`-severity OPENs that remain.

### Token Semantic Naming Convention
- **D-12:** **Flat-dash naming** for all tokens — both primitives and semantic aliases. Examples:
  - Primitives: `color-primitive-orange-500`, `space-primitive-24`, `type-primitive-size-24`, `radius-primitive-md`
  - Semantic aliases: `color-semantic-bg-accent`, `space-semantic-section-y`, `type-semantic-heading-1`, `radius-semantic-card`
- **D-13:** **REQUIREMENTS.md TOKEN-01 example syntax is being overridden by this decision.** The patch lands in the same commit as CONTEXT.md so the requirement and the context stay aligned.
- **D-14:** Components reference semantic only, never primitives (per TOKEN-01) — naming convention does not change this rule.

### TOKEN-06 Prose Typography Source
- **D-15:** Derive prose tokens (paragraph spacing, link color + underline behavior, inline code styling, list bullet styles) from **Crito Blog frame + Crito FAQ frame only**. No fallback to Joel's v1.3 prose conventions (v1.3 is neobrutalist-era vocabulary; v2.0 needs Crito-faithful prose).
- **D-16:** Values not depicted in Crito's Blog/FAQ frames become OPEN flags with `blocker-for-phase: 28` (Blog reconstruction). Inline code styling specifically is likely to fall here — agency marketing prose rarely shows code.

### PEN-INVENTORY.md Per-Frame Schema
- **D-17:** Each Crito frame entry uses a structured schema (markdown table per frame OR a single sortable table with one row per frame — Claude picks the more readable form once frame count is known). Required fields:
  - `frame_name` — Pencil-displayed name
  - `frame_id` — Pencil internal ID (for `batch_get` / `get_screenshot` later)
  - `scope` — `IN-SCOPE` / `IN-SCOPE token-mining-only` / `OUT-OF-SCOPE` / `joel-only-no-crito-ref`
  - `joel_page_map` — e.g., `Homepage > Services section` / `Blog post` / `no Crito ref` / `none (token mining only)`
  - `child_section_count` — integer
  - `status_counts` — object `{flat: N, partial: N, factored: N}`
  - `reconstruction_priority` — `high` / `medium` / `low` / `n/a (out of scope)`
  - `open_flag_ids` — list of `OPEN-XX-NN` IDs that reference this frame
- **D-18:** PEN-INVENTORY.md is greppable plain markdown — no JSON blocks. Plan-phase and researcher agents read it directly without parsing.

### Reference-Frame Archival
- **D-19:** `_Tokens & Foundations` reference frame `get_screenshot` archived to `.planning/research/exports/v2.0/tokens-foundations-23.png`. Matches VALID-05's destination for all milestone visual artifacts.
- **D-20:** Re-snaps (if tokens evolve in later phases) use date-suffixed names: `tokens-foundations-23-{YYYYMMDD}.png`. The undated file always points to the latest.

### Claude's Discretion
- PEN-INVENTORY.md formatting (one table for all frames vs. one table per frame): Claude picks once frame count is known.
- Token primitive ramp depth (e.g., orange-100 through orange-900 vs. just the values Pencil's audit surfaces): driven by what `search_all_unique_properties` returns; if the source shows only 2 orange values, the primitive ramp has 2 entries — no inventing intermediate steps.
- Order of `_Tokens & Foundations` reference frame contents (color → typography → spacing → radii, or another order): Claude picks for readability.
- Whether to use `batch_design` or `replace_all_matching_properties` for the reference-frame build: Claude picks based on Pencil-skill guidance during execution.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, abandonment context, scope guardrails
- `.planning/REQUIREMENTS.md` — Phase 23 requirements: AUDIT-01, AUDIT-02, AUDIT-03, TOKEN-01 through TOKEN-08 (note: TOKEN-01 naming examples updated in same commit as this CONTEXT.md to match D-12 flat-dash convention)
- `.planning/ROADMAP.md` — Phase 23 entry: Goal, Depends on, Success Criteria, Plans list
- `.planning/STATE.md` — pending todos including the dark-mode decision (now resolved per D-01), `.fig` accessibility question (now resolved per D-04), OPEN-flag policy (now resolved per D-09)

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — synthesized themes T1–T8; especially T2 (audit-as-hard-block), T5 (don't repeat v1.4 failure mode), T7 (dark-mode conflict — now resolved per D-01)
- `.planning/research/STACK.md` — Pencil MCP tool catalogue, official skill quotes ("Start with variables, not literals")
- `.planning/research/FEATURES.md` — table-stakes deliverables TS-1 through TS-6 for v2.0
- `.planning/research/ARCHITECTURE.md` — primitive→semantic→component→page integration chain
- `.planning/research/PITFALLS.md` — fidelity-loss / over-engineering pitfalls; prevention strategies P0–P15 referenced by OPEN-flag and gap-declaration policy (D-09 through D-11)

### v1.4 research (carried forward — same Crito file, same workflow concerns)
- `.planning/milestones/v1.4-research/ARCHITECTURE.md` — last successful inventory of the `.pen`: 15 page frames, zero factored components
- `.planning/milestones/v1.4-research/PITFALLS.md` — root cause documentation for the v1.4 abandonment

### Ground-truth source files (Phase 23 reads these)
- `design/Crito.pen` — the work surface; everything happens here
- `design/images/Consulting & Agency Website Template I Crito (Community).fig` — fallback ground-truth source per D-04 (NOT the Alliatus `.fig` at `design/` root — unrelated)
- `design/images/image-import-*.{jpg,png}` — raster exports; useful for visual reference but PITFALLS F3 forbids eyedropping color from these

### Pencil MCP guidance (consulted during execution, not pre-read)
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call during plan 23-01
- `mcp__pencil__get_guidelines({ topic: "landing-page" })` — call during plan 23-01
- `mcp__pencil__get_editor_state({ include_schema: true })` — call FIRST in plan 23-01 (per T2)

### Outputs this phase produces (referenced by later phases)
- `.planning/research/PEN-INVENTORY.md` — every later phase reads this for frame classification and OPEN-flag context
- `.planning/research/exports/v2.0/tokens-foundations-23.png` — visual archive of the token foundation
- The token surface inside `design/Crito.pen` itself (read via `get_variables({})`)

</canonical_refs>

<code_context>
## Existing Code Insights

**This phase makes NO code changes.** v2.0 is `.pen`-file-only (per PROJECT.md "Out of Scope"). The code-side observations below are for downstream code-milestone awareness only — they do NOT shape Phase 23 work.

### Reusable Assets (code-side, not Phase 23 inputs)
- `src/styles/global.css` — current v1.3 token surface (OKLCH neobrutalist palette). v2.0 does NOT modify this; future code milestones will replace it with tokens derived from the v2.0 `.pen` foundation.
- `src/components/ui/{Button,Card,Input,Badge,CheckboxGroup}.astro` — current v1.3 design-system components. Unchanged in v2.0; the next code milestone rebuilds these against the new tokens.

### Established Patterns (Pencil-side, ARE Phase 23 inputs)
- **Variables-first ordering** — non-negotiable per T1. Audit → tokens → reference frame. No component or page work in Phase 23.
- **Single-file strategy** — everything stays in `design/Crito.pen`. Library frames live at the top of canvas with `_` prefix (per T6). Phase 23 creates `_Tokens & Foundations` only; `_Inventory` and `_Components/*` parent frames are stubbed in later phases.
- **Per-section calibration discipline** — formally adopted starting Phase 26. Phase 23 doesn't reconstruct sections, so no calibration step inside this phase — but the OPEN-flag system established here is what later phases use to declare gaps instead of filling them.

### Integration Points
- PEN-INVENTORY.md is the bridge artifact. Every Phase 24+ planning step reads it to know what's IN-SCOPE, what needs rebuilding, and what OPEN flags are already on record.
- The token surface inside `Crito.pen` is the contract Phase 24 (primitive components) consumes — every primitive references semantic aliases by name (per D-14), so plan-phase for Phase 24 will grep PEN-INVENTORY.md for which tokens exist.

</code_context>

<specifics>
## Specific Ideas

- **"Jurassic Park" framing (from PROJECT.md):** reconstruct from incomplete DNA, using whatever Pencil retained plus the original `.fig` as reference. This metaphor informs the bias toward declaring OPEN flags (D-09) rather than inventing values to "complete" the genome.
- **Coverage checkpoint as a real pause (D-05):** the user explicitly chose the highest-discipline option for the thin-coverage scenario. If plan 23-01's `search_all_unique_properties` returns thin findings, the executor surfaces specific numbers to the user before plan 23-03 begins — no quiet best-guessing.

</specifics>

<deferred>
## Deferred Ideas

- **Token sync pipeline from `.pen` variables to CSS/Tailwind** — code-side concern, next code milestone after v2.0.
- **Dark-mode token values** — deferred per TOKEN-07 and D-01. Future milestone designs dark values from scratch; no pre-named slots in v2.0.
- **Component variant matrices beyond what Crito source depicts** — per PITFALLS O1 and T8, only build observed variants. Pre-emptive variant work belongs in no phase; build on demand as later phases need them.
- **Reconstructing Crito's About/Service frames as standalone Joel pages** — D-07 mines them for tokens only. If a future milestone ever wants standalone About/Services pages, that's a new milestone scope decision.
- **PEN-INVENTORY.md as an interactive/queryable artifact (JSON schema, sortable table)** — D-18 chose plain markdown. If later phases need querying, a JSON view can be derived from the markdown source without rewriting the source-of-truth file.

</deferred>

---

*Phase: 23-audit-token-foundation*
*Context gathered: 2026-05-31*
