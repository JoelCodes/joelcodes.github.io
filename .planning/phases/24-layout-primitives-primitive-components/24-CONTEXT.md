# Phase 24: Layout Primitives + Primitive Components - Context

**Gathered:** 2026-05-31
**Status:** Ready for planning

<domain>
## Phase Boundary

The `.pen` carries a small library of primitive components — `Primitive / Button`, `Primitive / Input`, `Primitive / Badge`, `Primitive / Icon` — sitting inside `_Components / Primitives` at the top of canvas, alongside sibling stubs `_Components / Compounds` and `_Components / Sections` (populated in Phase 25). Every primitive uses Pencil auto-layout (flex/grid) with token-driven padding and gap — no raw px, no raw hex, no absolute positioning at the component level. Variant matrices are bounded by Crito source evidence (per Phase 23 D-09 + this CONTEXT D-21) plus a compositional minimum set of forward-needed states for Phase 25 / Phase 27 consumers.

**Out of scope (already decided):**
- Compound and Section components (Phase 25)
- Page-frame reconstruction (Phases 26–31)
- Token sync to code / CSS (next code milestone)
- Mobile breakpoint (PAGE-09 — desktop only for v2.0)
- Dark mode (TOKEN-07 + Phase 23 D-01)

</domain>

<decisions>
## Implementation Decisions

### Variant Matrix Scope Policy
- **D-21:** Phase 24 ships **pragmatic** variant matrices — depicted Crito source variants PLUS a minimum forward-needed state set for downstream phase consumers. Every forward-added variant carries an `OPEN-24-XX` flag declaring its consumer phase + provenance.
- **D-22:** **Compositional minimum forward set** = Input `:focus` + `:error` (Phase 27 contact form will instance these); Button `:focus` + `:hover` (Phase 25 header CTA needs hover for desktop pointer state + focus for nav). `:disabled` is **not** shipped at the primitive layer — Phase 27 "submitted state" is a Compound-layer concern.
- **D-23:** **Audit trail lives in `.planning/research/PEN-INVENTORY.md` § "Variant Evidence (Phase 24)"** as a new markdown table per primitive. Each row: `variant_cell | source_citation (frame_id + node_id + section, OR OPEN-24-XX) | rationale`. Greppable; matches Phase 23 D-18 (plain markdown, no JSON).
- **D-24:** **Source wins over the COMP-01 requirement list.** If Crito frames depict only one button purpose (likely — Home page CTA + maybe one About variant), Button ships exactly the depicted purposes. COMP-01's "primary, secondary, ghost" becomes a partial-satisfaction record: Phase 24 SUMMARY explicitly labels which COMP-01 purposes shipped vs. became forward OPEN flags. Inventing variants Crito doesn't show is exactly how v1.4 failed (per PROJECT.md "Lesson from v1.4 abandonment").

### Icon Glyph-Swap Mechanism (Plan 24-04)
- **D-25:** `Primitive / Icon` uses **instance-swap** (per-glyph atomic components). Every glyph (chevron-right, mail, arrow-right, etc.) is its own tiny atomic Pencil component living inside `_Components / Primitives / Icon / glyphs/`. `Primitive / Icon` itself is a sized wrapper with a Slot-typed child that consumers replace via Pencil's standard instance-swap mechanism. Maps naturally to Lucide's per-icon SVG model (and matches v1.3's `@lucide/astro` tree-shaking pattern in code).
- **D-26:** Plan 24-04's first task is a **source-driven glyph enumeration**: enumerate every glyph appearing in IN-SCOPE Crito frames (home / contact / blog / FAQ / 404 / Thank-you). The audit result becomes the Phase 24 shipping set (likely 5–10 glyphs). Matches D-24 source-wins policy.
- **D-27:** **Wrapper exposes COMP-04 sizes as variants** — `Primitive / Icon` ships as a 4-variant component (or single component with `size` variant property): `Icon / 16`, `Icon / 20`, `Icon / 24`, `Icon / 32`. Consumers pick the size when instancing, then swap the Slot for their glyph. Discoverable in Pencil's variant picker.
- **D-28:** **Strict source on brand glyphs.** Joel's v1.3 footer uses Instagram + Substack brand icons; Crito's footer uses a different brand set. Phase 24 ships **only Crito-source glyphs.** Phase 25 Section/Footer plan owns the Instagram / Substack gap as a forward `OPEN-25-XX` flag — resolved when Section/Footer is built. Resolves the apparent tension between D-22 (compositional minimum) and D-26 (source-driven) by phase-ownership boundary: variants belong to their primitive's phase; brand-specific glyphs belong to their consuming section's phase.

### Button Icon-Slot Strategy (Plan 24-02)
- **D-29:** `Primitive / Button` **owns optional `iconLeading` + `iconTrailing` slots.** Consumers fill them with `Primitive / Icon` instances. Button's internal auto-layout handles spacing between label and icons via the existing `space-semantic-inline-sm` token. Matches v1.3's `<Button iconLeft={Arrow} />` ergonomics; Phase 25 Section/Header just instances Button with an arrow swapped into the trailing slot.
- **D-30:** **Empty slots auto-collapse.** When neither slot is populated, Pencil's auto-layout hides the empty Slot children and the gap collapses — label-only Buttons look identical to a hypothetical no-slot Button. Plan 24-02's build verifies this Pencil mechanic works as expected; if it doesn't (OPEN-23-13-style limitation), surface to user and revisit the slot strategy.
- **D-31:** **Reuse `space-semantic-inline-sm` for the label-icon gap.** No new token added; Phase 23's closed token surface stays closed for the button-icon-gap case. If Crito source shows a gap that doesn't match `inline-sm` (or any existing `inline-{sm,md,lg}`), plan 24-02 surfaces it as an `OPEN-24-XX` flag rather than adding a new token — matches D-24 source-wins-but-don't-invent discipline.

### Badge Radius + Phase 24 Token-Extension Policy (Plan 24-03)
- **D-32:** **Probe-first for Badge radius (resolves OPEN-23-12).** Plan 24-03 first task: `batch_get` Crito hero badges + project-card metric badges, enumerate their actual `cornerRadius` values. If true pill (height/2), add `radius-primitive-pill` + `radius-semantic-badge` via `set_variables`. If small-radius (e.g., 4–6 px), reuse `radius-semantic-button` or add a badge-specific token sized to source. Decision driven entirely by Crito source — matches D-24.
- **D-33:** **Open token-extension policy for Phase 24, audit-trailed.** Any 24-NN plan can add tokens when source demands. Each addition gets a row in a new `PEN-INVENTORY.md § "Token Extensions (Phase 24)"` table: `token_name | added_by_plan | source_evidence (frame_id + node_id) | rationale`. Phase 23's "closed surface" becomes "closed unless source dictates" — which is exactly what OPEN-23-12 anticipated when it wrote `If Phase 24 component primitives need pill shapes, add a primitive at that time.`
- **D-34:** **Probe-first for badge kind variants.** Plan 24-03 audits Crito hero badges + project-card metric badges and decides single-Badge-component (if structurally identical: same padding/radius/typography) vs. two-variant `kind` axis (if structurally distinct). Same source-first checkpoint pattern as D-32. COMP-03's "pill/metric styles" wording does not pre-commit to a variant axis.

### Cross-cutting / Carry-forward
- **D-35:** **Pre-flight `get_editor_state` enforcement (carry-forward of OPEN-23-14).** Every plan in Phase 24 that calls `set_variables` or `batch_design` must first call `mcp__pencil__get_editor_state({ include_schema: false })` and assert the active editor path matches `design/Crito.pen`. Halt and surface to user on mismatch. This prevents the active-editor-swap incident from Phase 23 plan 23-05 from recurring.
- **D-36:** **Component naming uses slash separation** (`Primitive / Button`, `Primitive / Icon`) — distinct from the token flat-dash convention (`color-primitive-amber-500`). Carries Phase 23 D-12 forward: tokens are flat-dash, components are slash-separated.
- **D-37:** **Sibling library frame stubs (`_Components / Compounds`, `_Components / Sections`)** ship as minimal frames with a title node + a single sibling Pencil note describing what Phase 25 will populate. Not empty (so they're visible top-of-canvas neighbors of `_Tokens & Foundations`), not pre-populated with placeholders (which would invent structure source doesn't yet dictate). Plan 24-01 owns this.

### Claude's Discretion
- **PEN-INVENTORY.md `§ Variant Evidence` and `§ Token Extensions` table layout** — Claude picks the readable form (one combined table vs. one per primitive) once the source audits are run and row counts are known.
- **Order of Primitive builds inside Phase 24** — plan order in ROADMAP (24-01 → 24-02 → 24-03 → 24-04 → 24-05) is the suggested order; Claude may reorder 24-02/03/04 internally if a probe in one informs another (e.g., if Badge probe in 24-03 surfaces an Icon glyph dependency).
- **Pencil slot typing enforcement** — Whether the Button icon Slot is constrained to accept `Primitive / Icon` instances only (typed) or accepts anything (untyped) is a Pencil-mechanics choice; Claude picks based on what Pencil supports cleanly during 24-02. If typed slots have OPEN-23-13-style limitations, fall back to untyped + a sibling note documenting the constraint.
- **Variant Evidence row granularity** — whether each row covers a single variant cell (e.g., `Button: primary × md × default`) or a variant-axis-group (e.g., `Button: size variants`) — Claude picks for readability per primitive.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment context, scope guardrails (especially "Lesson from v1.4 abandonment" — informs D-24)
- `.planning/REQUIREMENTS.md` — Phase 24 requirements: LAYOUT-01, LAYOUT-02, COMP-01, COMP-02, COMP-03, COMP-04, COMP-08, COMP-09
- `.planning/ROADMAP.md` § "Phase 24" (lines 149–170) — Goal, Depends on, Success Criteria, Plans list. **NOTE: line 169 marks `[x] 24-04 ... (completed 2026-05-31)` — this is a stale marker copied from the reverted v1.4 phase 24 plan list. Phase 24 v2.0 has NOT started. Plan/execute should correct this checkbox during 24-04 close.**
- `.planning/STATE.md` — current position: Phase 24, ready to plan; `completed_phases: 0`

### Phase 23 carry-forward (Phase 24 inherits these decisions directly)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — Phase 23 decisions D-01 through D-20. Especially D-09 (OPEN-flag policy), D-12 (token naming convention), D-14 (components reference semantic only), D-18 (PEN-INVENTORY plain markdown).
- `.planning/phases/23-audit-token-foundation/23-VERIFICATION.md` — confirmation of Phase 23 deliverables (95 tokens shipped, `_Tokens & Foundations` frame at top of canvas, zero-mutation diff).
- `.planning/phases/23-audit-token-foundation/23-SECURITY.md` — retroactive STRIDE audit; relevant carry-forward = T-23-T4 + OPEN-23-14 (active-editor-swap prevention) → D-35.

### Audit / inventory source (read for every plan in Phase 24)
- `.planning/research/PEN-INVENTORY.md` — single source of truth for frame classifications, audited unique-property values, existing token surface (95 tokens), and OPEN flags. Phase 24 plans read this to know:
  - which Crito frames are IN-SCOPE (for variant-evidence audits per D-23)
  - which tokens already exist (for COMP-09 zero-raw-values compliance)
  - which OPEN flags forward-block (OPEN-23-10 heading sizes, OPEN-23-11 prose tokens, OPEN-23-12 pill radius, OPEN-23-13 batch_design var-rejection, OPEN-23-14 active-editor)
- `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` — structural snapshot of `Crito.pen` after Phase 23. Plan 24-01 reads this to know which frame IDs are existing (must not be mutated) before adding `_Components / *` siblings.

### Ground-truth source files (Phase 24 reads these via Pencil MCP, not direct file I/O)
- `design/Crito.pen` — the work surface. Phase 24 mutates only the new `_Components / *` parent frames and their children. Existing 15 Crito page frames + the `_Tokens & Foundations` reference frame are read-only inputs.
- `design/images/Consulting & Agency Website Template I Crito (Community).fig` — fallback ground-truth source per Phase 23 D-04. Phase 24 plans consult only if Pencil MCP audit can't resolve a token-extension question.

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — synthesized themes T1–T8; especially T6 (single-file strategy), T8 (component variants on-demand only)
- `.planning/research/STACK.md` — Pencil MCP tool catalogue, official skill quotes (`get_guidelines({ topic: "design-system" })` is required reading before plan 24-02 starts)
- `.planning/research/PITFALLS.md` — fidelity-loss / over-engineering pitfalls; especially F3 (no eyedropping from raster) and O1 (no pre-emptive variants)

### Pencil MCP guidance (consulted during execution, not pre-read at planning)
- `mcp__pencil__get_editor_state({ include_schema: false })` — call FIRST in every 24-NN plan per D-35
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call at start of plan 24-02 (Button), 24-03 (Input/Badge), 24-04 (Icon) for current Pencil component-authoring guidance
- `mcp__pencil__get_variables({})` — call to read the 95-token surface before referencing semantic tokens in any component

### Outputs this phase produces (referenced by Phase 25+)
- `.planning/research/PEN-INVENTORY.md § "Variant Evidence (Phase 24)"` — per-primitive variant audit trail (D-23). Phase 25 reads this to know which Button / Input / Badge variants are available before composing Compounds and Sections.
- `.planning/research/PEN-INVENTORY.md § "Token Extensions (Phase 24)"` — per-token-addition audit trail (D-33). Phase 25+ reads this for the current semantic surface.
- The 4 new primitives + glyph atoms inside `design/Crito.pen` (`_Components / Primitives / { Button, Input, Badge, Icon }` and `_Components / Primitives / Icon / glyphs / *`)
- Sibling library frame stubs (`_Components / Compounds`, `_Components / Sections`) — populated in Phase 25

</canonical_refs>

<code_context>
## Existing Code Insights

**Phase 24 makes NO `src/` code changes.** v2.0 is `.pen`-file-only (per PROJECT.md "Out of Scope" + REQUIREMENTS.md "Out of Scope"). The code-side observations below are downstream-milestone awareness only — they do NOT shape Phase 24 work.

### Reusable Assets (code-side, not Phase 24 inputs)
- `src/components/ui/Button.astro` — v1.3 neobrutalist Button with `variant: 'yellow' | 'turquoise' | 'magenta' | 'outline'`. Informs nothing about Pencil component mechanics; will be replaced by a future code milestone that consumes the Phase 24 primitives.
- `src/components/ui/{Input,Badge,Card,CheckboxGroup}.astro` — same v1.3 design-system components; unchanged in v2.0.
- `src/styles/global.css` — current v1.3 OKLCH token surface. Replaced in a future code milestone, not Phase 24.

### Established Patterns (Pencil-side, ARE Phase 24 inputs)
- **Variables-first → components** — Phase 23 established the 95-token surface. Phase 24 components reference semantic aliases only (per Phase 23 D-14). COMP-09 enforces this: `search_all_unique_properties` over primitive frames returns zero raw hex / zero raw px.
- **Single-file strategy** — everything in `design/Crito.pen`. Library frames at top of canvas with `_` prefix. Phase 23 shipped `_Tokens & Foundations` (id `RpGbe`); Phase 24 adds `_Components / Primitives`, `_Components / Compounds`, `_Components / Sections` as top neighbors.
- **OPEN-flag system** — Phase 23 established `OPEN-XX-NN` syntax in PEN-INVENTORY.md § "Open Flags". Phase 24 extends with `OPEN-24-NN` rows for: source-vs-COMP-01 partial-satisfaction (D-24), token extensions (D-33), forward-needed variant additions (D-22). Per Phase 23 D-09, OPEN flags do NOT block Phase 24 close.
- **Pre-flight active-editor assertion** — every Pencil-driven plan calls `get_editor_state` first (D-35) to prevent the OPEN-23-14 incident.
- **Plain-markdown audit trails** — Phase 23 D-18 sets the pattern (no JSON inside PEN-INVENTORY.md). Phase 24's new "Variant Evidence" and "Token Extensions" sections follow the same convention.

### Integration Points
- **PEN-INVENTORY.md is the bridge** — Phase 25 (Sections + Compounds) reads Phase 24's "Variant Evidence" and "Token Extensions" sections to know which primitives + tokens are available before composing.
- **Token surface inside `Crito.pen`** — Phase 24 may extend it (D-33) but only via `set_variables`. `batch_design` is forbidden for setting `$<var>` references per OPEN-23-13.

</code_context>

<specifics>
## Specific Ideas

- **"Source wins" applied concretely to COMP-01 (D-24):** Phase 23 set the discipline ("don't invent what source doesn't show — that's how v1.4 failed"); Phase 24 applies it to Button purposes. Even if COMP-01 lists primary / secondary / ghost, Phase 24 ships only what Crito IN-SCOPE frames literally depict. The user explicitly endorsed partial-satisfaction over invention.
- **Compositional minimum forward set (D-22) — explicit consumer phase per variant:** Input `:error` is for Phase 27 contact form; Input `:focus` + Button `:focus` are for keyboard nav even though v2.0 doesn't ship code; Button `:hover` is for Phase 25 header CTA. Each variant's OPEN flag must name its consumer phase so audit trail is traceable.
- **Probe-then-decide as a Phase 24 pattern (D-32 + D-34):** Two probe checkpoints land inside plan 24-03 (Badge radius + Badge kind). Phase 23 used the same pattern in plan 23-01 (coverage checkpoint per D-05). It's now an established Phase 24 discipline — when COMP-X requirement wording is ambiguous, audit first, decide from data.
- **Sibling library stubs are intentional (D-37):** Empty-frame-with-title-only would look like a TODO. Pre-populated placeholders would invent structure. The chosen pattern (title node + sibling Pencil note describing Phase 25 contents) signals "designed pause" — same way Phase 23's "Dark Mode — Deferred" section signaled intentional omission.

</specifics>

<deferred>
## Deferred Ideas

- **Instagram + Substack (and any Joel-brand) social glyphs** — D-28 hands the gap to Phase 25 Section/Footer with a forward `OPEN-25-XX` flag. Not Phase 24's decision.
- **Button `:disabled` state** — D-22 explicitly excludes it from the primitive layer. Phase 27 may handle "submitted state" as a Compound concern (Compound/Card wrapping Button with overlay/spinner), OR a follow-up phase introduces `:disabled` at the primitive layer when a concrete consumer needs it.
- **Button `:active` (pressed) state** — not in COMP-01 requirement list and not in D-22 forward set. If a future phase needs it, it gets added then with source / consumer justification (matching D-22 OPEN-24-XX pattern).
- **`radius-semantic-pill` formal addition** — IF D-32 probe finds Crito badges are true pill, D-33's token-extension policy lets plan 24-03 add it. IF probe finds badges are small-radius, this token may never need to exist.
- **Component-property glyph-swap mechanism** — D-25 chose instance-swap, leaving component-property unused for now. Could be reconsidered in a follow-up phase if instance-swap proves unwieldy at Phase 28+ scale (many glyphs across many compound instances).
- **Variant matrix completion for COMP-01 purposes (secondary / ghost) and Button sizes (sm / md / lg)** — depending on D-24's source audit outcome, these become forward OPEN flags consumed by a future Phase-24-followup OR by the code milestone that builds the v2 component library.
- **Token sync pipeline from `.pen` to CSS / Tailwind** — code-side concern (carries forward from Phase 23 deferred).
- **Dark-mode token values** — still deferred per TOKEN-07 + Phase 23 D-01.

</deferred>

---

*Phase: 24-layout-primitives-primitive-components*
*Context gathered: 2026-05-31*
