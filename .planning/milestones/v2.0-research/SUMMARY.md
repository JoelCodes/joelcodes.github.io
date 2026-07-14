# v2.0 Research Synthesis — Prep Crito Design File

**Milestone:** v2.0 Prep Crito Design File
**Synthesized:** 2026-05-31
**Inputs:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md
**Overall confidence:** MEDIUM-HIGH on workflow and discipline; LOW on the specific contents of `design/Crito.pen` (see Confidence + Grounding section)

---

## Executive Summary

v2.0 is a `.pen`-file-only milestone whose entire purpose is to undo the failure mode that abandoned v1.4: code phases 23 + 24 + 25 were reverted today because they were authored from best-guesses of mostly-flat raster sections in `design/Crito.pen`, and the output drifted generic. The fix is to reconstruct the `.pen` itself — define a token foundation, factor a small shared component library, and rebuild the 15 page frames from those tokens and components — so the next code milestone has structured ground truth to compile against instead of pixels to interpret.

All four researchers converge on the same workflow: **inventory first (read-only), tokens second, components third, page sections fourth, fidelity sweep last**. This ordering is not a judgment call — the official Pencil-dev skill names it as the first principle ("Start with variables, not literals"), and reversing it is precisely how v1.4 failed (components built before tokens are derived become hardcoded, then resist retokenization). All four also independently flagged that the Pencil MCP tool surface (`get_editor_state`, `get_guidelines`, `batch_get`, `set_variables`, etc.) was NOT available to the research subagents — so every recommendation here is grounded in PROJECT.md, prior v1.4 artifacts, public Pencil docs, and design-system practice rather than a live read of the actual `.pen`. **The single hardest constraint on this milestone is that Phase 23's first concrete task must be a real Pencil MCP audit (`get_editor_state(include_schema: true)` then `get_guidelines` then `batch_get` across all frames), and the audit output may invalidate specific recommendations below — the workflow holds; the exact invocations may need adjustment.**

The biggest risks are not technical, they are disciplinary: filling source gaps with personal style (the v1.4 root cause repeating one layer earlier), inventing variant matrices the source doesn't demand, eyeballing values from compressed rasters, and declaring fidelity without side-by-side calibration. The roadmap should treat the Pencil MCP audit, ground-truth calibration against `design/images/` (and the `.fig` if usable), and per-section fidelity labels as non-optional process gates, not nice-to-haves.

---

## Cross-Cutting Themes

### T1. Variables-First Is Non-Negotiable
Every research file independently arrives at the same order: audit → tokens → components → pages → fidelity sweep. STACK quotes the Pencil skill verbatim ("Start with variables, not literals"); FEATURES makes it the TS-1 table-stakes item; ARCHITECTURE encodes it as the primitive→semantic→component→page integration chain; PITFALLS names "components before tokens" as the structural repeat of the v1.4 failure mode. **Roadmap consequence:** Phase 23 must produce tokens before Phase 24 builds a single component.

### T2. The Pencil MCP Audit Is a Hard Block on Everything Else
All four files explicitly disclose that they could not call Pencil MCP tools. Every recommendation about the current `.pen` (variable surface, component presence, frame editability, schema shape) is inference, not observation. STACK says "first action of every phase"; ARCHITECTURE makes it Phase 23 step 1; PITFALLS makes it prevention strategy P0; FEATURES names it under Open Questions. **Roadmap consequence:** Phase 23 cannot start with reconstruction work — it must start with a `get_editor_state(include_schema: true)` + `get_guidelines` + `batch_get` + `get_variables` audit, and the audit output is a versioned deliverable (likely `.planning/research/PEN-INVENTORY.md`) that subsequent phases reference.

### T3. Ground Truth Lives Outside the .pen
The `.pen` is the work surface but not the source of truth. STACK identifies `design/images/` (27+ raster exports) and the original Crito `.fig` (if accessible) as primary references; FEATURES names side-by-side validation against the original as table-stakes deliverable TS-6; ARCHITECTURE positions `design/images/` as unchanged reference material; PITFALLS makes ground-truth calibration prevention strategy P1 and warns explicitly against treating the current `.pen` as canonical (J5). **Roadmap consequence:** Every per-section plan must end with a side-by-side calibration step using `get_screenshot` of the reconstructed frame against the matching raster in `design/images/`. The output goes to `.planning/ui-reviews/v2.0/` for user spot-check.

### T4. Joel's Page Set ≠ Crito's Page Set
Crito has 15 page frames including agency-template pages (View More, Information, Free Design Sample, possibly Team) that PROJECT.md explicitly excludes. FEATURES calls this out in AF-3 and AF-4; PITFALLS makes it J3 and prevention strategy P7; ARCHITECTURE notes existing 15 frames should stay in place but doesn't address the scope filter; STACK doesn't address it directly. **Roadmap consequence:** The inventory deliverable from T2's audit must classify each frame as IN-SCOPE (maps to a Joel page: Homepage / Projects / Blog / FAQ / Contact / Thank-you / Design system / 404) or OUT-OF-SCOPE (Crito-only). Only IN-SCOPE frames get reconstructed. Component candidates that serve only OUT-OF-SCOPE pages don't get factored.

### T5. The v1.4 Failure Mode Has a Design-Tool Analogue (Don't Repeat It)
Three of four files (PITFALLS most explicitly, then STACK and FEATURES) warn that the v1.4 "best-guess from flat images" failure can repeat *inside Pencil* if reconstructors fill source gaps with personal/training-data conventions. Examples: eyeballing spacing as "looks like 24px" (F2), eyedropping color from JPG (F3), inferring layout structure from one viewport's appearance (F5), inventing variant matrices the source never depicts (O1). **Roadmap consequence:** Gaps get *declared* (flagged Pencil notes, OPEN tags), not *filled*. Adopt PITFALLS prevention strategies P2, P4, P10, and P13 as section-level definition-of-done criteria.

### T6. Single-File Strategy (Reverses v1.4's Per-Page Split Decision)
ARCHITECTURE explicitly overrides v1.4's Decision 4 (split into `design/design-system.pen`) and recommends keeping everything in `design/Crito.pen` with library frames at the top of the canvas (`_Inventory`, `_Tokens & Foundations`, `_Components/*`). Rationale: Pencil MCP `batch_get` and `snapshot_layout` operate on a single file's node tree; splitting mid-reconstruction adds migration overhead. STACK and FEATURES do not contradict this — both assume a single `.pen` worksurface. PITFALLS doesn't address file structure. **No conflict — single-file strategy is the unified recommendation.** A "split into per-page files" contingency can be reserved for Phase 27+ if the file becomes unwieldy.

### T7. Dark-Mode Token Slots — Encode Now or Defer? (CONFLICT)
STACK recommends emitting `@light,@dark` variable syntax with dark values stubbed to mirror light (per Pencil skill guidance — retrofitting later is more expensive than writing `@dark,#FFFFFF` once at definition time). PITFALLS O3 takes the opposite position — "Premature Dark Mode Tokens" — and warns against pre-naming `--color-surface-dark` slots. FEATURES AF-1 says skip "full multi-theme token system." ARCHITECTURE Open Question 8 says "Do NOT pre-declare dark slots in Pencil variables for v2.0."

**Resolution:** This is a real conflict. Defer to the Pencil-skill guidance (encode `@light,@dark` at definition time with dark stubbed to mirror light) **only if** the Phase 23 audit confirms Pencil's per-theme variable syntax is genuinely cheap to write and trivially editable later. If audit shows the syntax is awkward or carries non-trivial structural commitment, defer dark slots entirely. **Flag for user decision in Phase 23 after audit.**

### T8. Component Library Stays Tiny (Demand-Driven, Not Pattern-Driven)
FEATURES TS-4 names ~5-8 components (Button, Card, Header/Nav, Footer, Section wrapper, Input, Badge); ARCHITECTURE expands this to a primitives/compounds/sections hierarchy but keeps individual counts modest; PITFALLS O5 / O6 warn against premature token hierarchies and component-library bloat (no Avatar/Breadcrumb/Tabs/Tooltip/Modal unless Joel's pages use them). **Roadmap consequence:** Component candidates must clear two filters before factoring: (a) appears in ≥2 IN-SCOPE page frames per T4, (b) actually used by Joel's existing page set per PROJECT.md.

---

## Recommended Phase Structure

Five phases, ordered by dependency.

### Phase 23 — Audit + Foundation (read-only + token writes)
Resolves T2 (the hard block). Produces the inventory that every later phase plans against. Writes tokens once values are derived from observed/inspected source. No page mutations yet.

Includes: `get_editor_state(include_schema: true)` → `get_guidelines` (design-system + landing-page) → `batch_get` all top-level frames → `search_all_unique_properties` to enumerate raw values → `get_variables` to read existing token surface → per-frame inventory file with IN-SCOPE/OUT-OF-SCOPE classification (T4) → `set_variables` for the token foundation (resolving T7 with the user) → create empty `_Inventory`, `_Tokens & Foundations`, `_Components/*` library frames at the top of the canvas (T6) → verification via `get_variables`.

**Exit criterion:** Tokens defined; inventory written; library frames stubbed; page frames unchanged.

### Phase 24 — Primitive Component Library
Tokens are stable; primitives consume them. Build `Primitive / Button` (variants justified by source evidence per T5/P4), `Primitive / Input`, `Primitive / Badge`, and any other primitives the inventory confirmed appear in ≥2 IN-SCOPE pages (T8). Each primitive references semantic tokens only. `snapshot_layout({ problemsOnly: true })` after each primitive. `get_screenshot` of each finished primitive for the reference set.

**Exit criterion:** Every primitive that IN-SCOPE Crito pages need exists; zero hex/RGB literals in any primitive.

### Phase 25 — Compound Components (Card, FormRow, NavItem, etc.)
Compounds compose primitives. Card variants for project/blog/service cards; FormRow for the contact form's lead-qualification fields; NavItem for the header. Slot-vs-variant policy: state = variant, structure = slot, distinct asset = instance swap.

**Exit criterion:** Every recurring sub-section unit on IN-SCOPE Crito pages has a compound.

### Phase 26+ — Page Section Reconstruction (one IN-SCOPE page or page-group per phase)
Sections instance components. Ordered from lowest-risk / simplest layout to highest-reuse / most-sections. ARCHITECTURE proposes: FAQ → About → Information → Blog → Project → Service → Homepage. After T4's filter likely simplifies to: FAQ → About → Blog → Projects → Contact → Homepage → Design system page → 404.

Per-section discipline: `batch_get` → build via `batch_design` → keep original raster as hidden/locked sibling until parity verified → `snapshot_layout({ problemsOnly: true })` → `get_screenshot` + side-by-side compare against `design/images/` → per-section fidelity label (EXACT / APPROXIMATE / STUB) → user spot-check before phase close.

**Exit criterion (per phase):** Every IN-SCOPE section is a component instance or rule-justified inline; every section carries a fidelity label; OPEN-flagged gaps are listed.

### Phase N (final) — Fidelity Sweep + Handoff
`search_all_unique_properties` across the whole file — anything still raw is a leak; fix with `replace_all_matching_properties`. `export_nodes({ format: "png" })` every reconstructed page to `.planning/research/exports/`. Write a short "how the .pen is organized" handoff note for the next milestone's roadmapper.

**Exit criterion:** Zero raw values in any component or section; archival PNG set written; handoff doc committed.

---

## Hard Blocks (Must Resolve Before Anything Else)

1. **Pencil MCP tool availability in the executing agent's session.** All four researchers flagged that they did not have Pencil MCP tools. Confirm the Phase 23 executor *does* have `get_editor_state`, `get_guidelines`, `batch_get`, `set_variables`, `snapshot_layout`, `get_screenshot`, `get_variables`, `batch_design`, `export_nodes`. If not, the milestone cannot proceed.

2. **Live Pencil MCP audit as Phase 23's first concrete task.** Specifically: `get_editor_state(include_schema: true)` → `get_guidelines({ topic: "design-system" })` and `get_guidelines({ topic: "landing-page" })` → `batch_get` across all top-level frames → `search_all_unique_properties` → `get_variables({})`. The output is a versioned inventory file. Recommendations in STACK / FEATURES / ARCHITECTURE / PITFALLS may need adjustment if the actual schema differs.

3. **Original Crito `.fig` accessibility.** PITFALLS P2/P3 depend on the original `.fig` being openable in Figma desktop and exposing variables. If `.fig` is corrupt / requires unavailable Figma account / Joel doesn't have Figma installed, the only ground truth is the `design/images/` raster set plus the partial `.pen` — exactly the lossy condition that broke v1.4. **Caveat:** STACK noted an Alliatus-named `.fig` is on disk; PITFALLS confirms a Crito-named `.fig` also exists. Confirm which is canonical Crito.

4. **Inventory classification (IN-SCOPE vs OUT-OF-SCOPE per page frame).** Before any reconstruction work begins, every Crito page frame must be classified against Joel's IN-SCOPE page set (Homepage, Projects, Blog, FAQ, Contact, Thank-you, Design system, 404). OUT-OF-SCOPE frames are skipped.

---

## Top Open Questions (Deduplicated)

1. **What is the actual current schema and variable surface of `design/Crito.pen`?** [STACK OQ1+OQ3, FEATURES OQ2, ARCHITECTURE OQ1+OQ2, PITFALLS OQ2] — Resolved by Phase 23 step 1 audit.

2. **Is the original Crito `.fig` (or community page) accessible as ground truth?** [STACK OQ6, FEATURES OQ4, ARCHITECTURE OQ3, PITFALLS OQ1+OQ6] — Resolved by user confirmation + opening the `.fig` once.

3. **Should dark-mode token slots be encoded now via `@light,@dark` syntax or deferred entirely?** [STACK OQ5, FEATURES AF-1, ARCHITECTURE OQ8, PITFALLS O3] — The one cross-file conflict (theme T7). Resolved by user decision after Phase 23 audit confirms actual cost of per-theme syntax.

4. **What slot mechanics does Pencil expose via MCP, and what's the variant-vs-slot-vs-instance-swap policy?** [FEATURES OQ3+OQ6+D-2, ARCHITECTURE OQ1+OQ7, PITFALLS U2+P9] — Resolved by Phase 23 schema audit + a documented policy decision before Phase 25.

5. **Which Crito page frames are IN-SCOPE and which map to which Joel page?** [FEATURES OQ1, ARCHITECTURE Phase 26+ order, PITFALLS J3+P7] — Resolved by user confirmation during Phase 23 inventory.

6. **What's the user's appetite for OPEN-flagged gaps?** [PITFALLS OQ5+P13, FEATURES OQ6] — Whether each OPEN blocks phase close or whether milestone close is gated only on critical-category OPENs. Resolved by user policy decision before Phase 26.

7. **Per-section vs per-milestone `.pen` commit cadence?** [PITFALLS OQ4, STACK OQ7] — Recommendation: per-section commits (matches v1.3 discipline). Resolved by quick user confirmation.

---

## Watch Out For (Top Pitfalls)

1. **Repeating the v1.4 best-guess failure one layer earlier.** [PITFALLS F1; theme T5] Eyeballing values from raster (F2), eyedropping color from JPG (F3), inferring layout from one viewport (F5), inventing variant matrices the source doesn't show (O1). **Mitigation:** P2 (source values), P3 (layout inspection), P4 (variant discipline) as section-level definition-of-done.

2. **Skipping per-section calibration; doing one QA pass at the end.** [PITFALLS C1+C3; FEATURES TS-6] Exactly how v1.4 failed — all of phases 23 + 24 + 25 shipped before "does this look like the design?" was asked. **Mitigation:** Calibration per-section, not per-milestone. Roadmap puts side-by-side inside per-section plan.

3. **Component-library bloat from importing Crito's whole agency-template surface area.** [PITFALLS O6+J3; FEATURES AF-3+AF-4; theme T8] **Mitigation:** Every component candidate cross-references Joel's actual page set before factoring. PITFALLS P7.

4. **Overstating fidelity in status updates ("reconstructed" when it's "approximately reconstructed").** [PITFALLS C4] v1.4 STATE.md entries did not capture the fidelity gap until the abandonment commit. **Mitigation:** Per-section fidelity labels — EXACT / APPROXIMATE / STUB. PITFALLS P15.

5. **Filling source gaps with personal style instead of declaring them as OPEN.** [PITFALLS J1+J2; theme T5] This *is* the v1.4 root cause in design-tool form. **Mitigation:** Gaps get *declared* as flagged Pencil notes; never silently filled. Aesthetic improvements go in separate VARIANT frames, not the canonical reconstruction. PITFALLS P13.

---

## Confidence + Grounding

| Area | Confidence | Notes |
|------|------------|-------|
| Pencil MCP workflow and tool catalogue | HIGH | Pencil docs, official pencil-dev skill, npm CLI docs, community walkthroughs all agree. |
| Variables-first ordering | HIGH | Quoted verbatim from official Pencil-dev skill; reinforced by every other file. |
| Design-system best practices (tokens, slots, variant discipline) | MEDIUM-HIGH | W3C DTCG, Figma practice, Nathan Curtis, Webflow — applies to Pencil by analogy. |
| Current contents of `design/Crito.pen` | LOW | No researcher could call Pencil MCP tools. Claims about frame editability, existing variables, component presence are inferred. |
| Exact MCP tool argument shapes | MEDIUM | Assembled from skill files, npm CLI docs, forum examples. Verify by running `get_editor_state(include_schema: true)`. |
| Crito `.fig` accessibility | LOW | A Crito-named `.fig` is on disk per PITFALLS; STACK noted an Alliatus-named `.fig` also present. Neither verified to open cleanly. |
| Pencil's per-theme variable syntax cost (the T7 conflict) | LOW | Two research files recommend stubbing `@dark` now; two recommend deferring. Cannot resolve without `set_variables` in actual environment. |

**The grounding gap is the single most important caveat.** The Pencil MCP tool surface was not available to any of the four researcher subagents (only Read/Write/Bash/WebFetch/WebSearch). Every recommendation about the `.pen`'s current state is inference. Phase 23's first task must be a real Pencil MCP audit, and that audit may invalidate specific recommendations in any of the source files. The *workflow ordering* and *prevention strategies* are robust to audit findings; the *specific token names, component breakdowns, and phase-26 page order* are subject to revision once the audit lands.
