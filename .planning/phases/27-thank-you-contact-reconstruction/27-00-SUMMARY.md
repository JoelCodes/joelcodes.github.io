---
phase: 27-thank-you-contact-reconstruction
plan: 00
status: complete
date: 2026-06-07
---

# Plan 27-00 Summary: Crito.pen Library Foundations

Plan 27-00 is **autonomous** (no user-calibration gate per D-102 — Phase 26 D-86 carry-forward for foundation plans). Ships 5 new library entries inside `design/Crito.pen` so Plans 27-01 (Thank-you) and 27-02 (Contact 8-field form) can compose them without inline markup or new tokens.

## Pencil MCP Subagent-Tool-Inheritance Caveat

This plan was executed INLINE by the main orchestrator due to v2.0 Hard Block #1 (Pencil MCP tools unavailable to spawned subagents — documented in Plans 26-00, 26-01, 26-02 SUMMARY files). Mirrors the Phase 26 inline-execution pattern. Pre-flight discipline D-103 ensured the halt-at-pre-flight from the initial spawn attempt left zero mutations on disk before switching modes.

## Task 0: Pre-flight (read-only) — D-103 habit

- `mcp__pencil__get_editor_state({ include_schema: false })` confirmed active editor `design/Crito.pen` ✓
- `mcp__pencil__get_variables({})` returned exactly **100 tokens** (Phase 26 baseline preserved) ✓
- `mcp__pencil__get_editor_state({ include_schema: true })` loaded Pencil 2.13 schema into context
- `mcp__pencil__get_guidelines({ topic: "design-system" })` SKIPPED — Plan called outdated API signature (current API uses `category`/`name`, not `topic`). Established Phase 23-26 patterns provide sufficient guidance. Logged as plan deviation; no consumer impact.
- `mcp__pencil__batch_get` on 39 baseline IDs (Crito source frames + library parents + Phase 24/25/26 primitives + Phase 26 page frames) confirmed all intact
- `mcp__pencil__batch_get(['nwJk7'], readDepth: 3)` captured `oCeJP` baseline structure: `type: "text", content: "Label", fontFamily: "Inter", fontSize: 14, fontWeight: "normal", fill: "#141f39ff", lineHeight: 1.5`. Note plan-assumed values were slightly off (`fontWeight: "400"` / `lineHeight: 1.4`) — actual baseline is `"normal"`/1.5 — preserved for fidelity in Task 1 reconstruction.

No mutations issued during Task 0.

## Task 1: Primitive/Input label-slot extension (in-place mutation of `nwJk7` descendant per D-91)

**Schema findings forcing deviation from plan:**
1. `mcp__pencil__batch_design.Update` cannot change a node's `type` (schema: "This function CANNOT change the id, type or ref properties of any node"). The plan's in-place text→frame conversion probe was impossible — skipped probe and went directly to fallback per RESEARCH Open Question 2.
2. `alignItems: "baseline"` is NOT in the Pencil 2.13 schema (allowed values: `start` / `center` / `end`). Plan-specified `baseline` swapped to `center`. Tracked as OPEN-27-02.

**Mutations executed:**
- `Delete("oCeJP")` — removed original leaf text node
- `Insert("nwJk7", { type: "frame", name: "label-slot", layout: "horizontal", gap: 4, alignItems: "center", padding: 0 })` → returned new ID `rpdc0`
- `Move(rpdc0, "nwJk7", 0)` — moved new frame to index 0 (before control/helper/errorSlot)
- 3 text children inserted into rpdc0:
  - `label-text` (A4z2RM): Inter 14/normal #141f39ff lineHeight 1.5 (preserves oCeJP baseline)
  - `required-mark` (oOKQF): enabled:false, content "*", Inter 14/normal #eb5757ff lineHeight 1.5
  - `optional-text` (iBbbW): enabled:false, content "(optional)", Inter 14/normal #52525bff lineHeight 1.5

**Defensive verification:** `batch_get(['nwJk7'], readDepth: 1)` confirmed parent properties (reusable, width 400, layout vertical, gap 16) unchanged per Pitfall 2.

**OPEN flags raised:** OPEN-27-01 (oCeJP ID drift → rpdc0; Plan 27-02 instance authors must use rpdc0), OPEN-27-02 (alignItems baseline schema fallback), OPEN-27-03 (typography baseline preserved vs plan-specified).

## Task 2: Primitive/Input/Textarea variant (`vegJw` — D-89 + D-90 single variant)

Inserted reusable component inside `avgor`:
- Outer: name "Primitive / Input / Textarea", reusable:true, width 320, vertical, gap 16, padding 0
- 4 slots:
  - label-slot (NFFiR) + 3 children (label-text hWwXP / required-mark FmHxX / optional-text qzrSZ) — mirrors Task 1 pattern exactly
  - control (It539): vertical layout, padding [12, 16], width fill_container, height 120, fill #ffffffff, stroke #d4d4d8ff 1px, cornerRadius 10 — contains placeholder text (RMLUN) Inter 16/normal #52525bff lineHeight 1.625
  - helper-slot (MsJJX): Inter 14/normal #52525bff lineHeight 1.5
  - errorSlot (gGlD6): enabled:false, Inter 14/normal #eb5757ff lineHeight 1.5

## Task 3: Primitive/Select Default/Focus/Error trinity (D-89 + D-90 + D-92)

3 reusable variants inside `avgor` — used `batch_design` helper function (`insertLabelSlotChildren` + `buildSelectVariant`) to minimize payload. Split into 2 batches (Default+Focus = 20 ops, Error = 10 ops) to stay under Pitfall 9 25-op limit.

**Variant IDs:**
- Default (Rinmg): control vwza5 stroke #d4d4d8ff 1px, chevron-icon KjpDh, errorSlot KL1Py enabled:false
- Focus (kkH3X): control n15hIX stroke #15bee3ff 2px (cyan-500), chevron-icon cpjQs, errorSlot YzYsE enabled:false
- Error (F2JXQl): control D3aeC stroke #eb5757ff 2px (red-400), chevron-icon cR9xD, errorSlot u7S9BR enabled:true content "This field is required"

All 3 share 4-slot signature (label-slot + control + helper-slot + errorSlot). Control: horizontal layout, justifyContent space_between, padding [8, 16]. Chevron-icon: `library: "lucide", icon: "chevron-down", 16×16, fill: "#52525bff"` per D-92 Pattern A native.

NO Disabled variant (D-90 carry-forward — out of scope). NO Open-dropdown popover (D-92 explicit — code-side runtime concern).

## Task 4: Primitive/Checkbox Default/Focus/Error trinity (D-89 + D-90 + 2-slot signature)

3 reusable variants inside `avgor` — single batch (9 ops, well under Pitfall 9 limit).

**Variant IDs:**
- Default (gimNt): box-slot kSdMS stroke #d4d4d8ff 1px, label-slot pBv3p
- Focus (Q70a7): box-slot ADCuK stroke #15bee3ff 2px, label-slot h9c26
- Error (YTbYo): box-slot NATiQ stroke #eb5757ff 2px, label-slot V2fXBD

Each variant: 2-slot horizontal layout (gap 12, alignItems center) — box-slot (16×16 frame, white fill, grey 1px stroke radius 4, empty children) + label-slot (text "Option label" Inter 16/normal #141f39ff lineHeight 1.625).

NO Checked state variant (D-90 — out of scope, deferred to future state-coverage phase). NO Disabled variant (D-90 — out of scope).

## Task 5: Compound/CheckboxGroup + sibling note (`SW4cz` / `TXLkH` — D-89 + D-52)

Compound inserted inside `t67DU6` (sibling of Compound/Card t40xct from Phase 25):
- Outer (SW4cz): reusable, width 320, vertical, gap 12, padding 0
- legend-slot (H2gB5P): text "Choose options" Inter 14/normal #141f39ff lineHeight 1.5 — REQUIRED group-level prompt per D-89
- options-slot (MZPrM): frame, `slot: ["gimNt"]` typed suggestion per D-52 PREFERRED, vertical gap 12, contains 3 placeholder Checkbox/Default refs (Option 1 OAOSX, Option 2 elfPM, Option 3 PojXW) with `descendants: { pBv3p: { content: "Option N" } }` overrides
- helper-slot (akAeF): text "Optional helper text" enabled:false Inter 14/normal #52525bff lineHeight 1.5

Sibling Pencil note (TXLkH) inside t67DU6 (NOT inside CheckboxGroup) per D-52 belt-and-suspenders pattern (Phase 25 precedent). Documents slot signature, Plan 27-02 5-option override per D-97, D-89 hybrid strategy rationale, and per-option-layout decision space (vertical default vs horizontal possible). Font Inter 12, width 1200.

Pitfall O5/O6 prevention: narrow-scope design — composes Checkbox refs specifically, NOT a generalized "form-section" or "fieldset" component.

## Task 6: Plan close — verifications + PEN-INVENTORY + SUMMARY (this file)

**Pre-flight per D-103:** active editor confirmed `design/Crito.pen` ✓

**Token surface re-check:** `get_variables({})` returned exactly **100 tokens** (zero drift since Phase 26 close) ✓

**`snapshot_layout({ maxDepth: 0, problemsOnly: true })`:** returned `"No layout problems."` at document level ✓ Per-frame text-clipping false-positives (Pitfall 5 / Phase 24-26 known benign) NOT mitigated.

**Reusable component count:** 22 total at Phase 27 Plan 27-00 close (was 14 at Phase 26 close + 8 new — Textarea, 3 Select, 3 Checkbox, CheckboxGroup) ✓

**Baseline ID re-check:** 39 of the 40 baseline IDs intact (oCeJP intentionally retired per Task 1 OPEN-27-01; nwJk7 parent properties unchanged per Pitfall 2). All Crito source frames + library parents + Phase 24/25/26 primitives + Phase 26 page frames remain unmodified.

**PEN-INVENTORY.md edits committed:**
- **New `### Open Flags — Phase 27 (OPEN-27-NN)` sub-section** with 3 rows:
  - OPEN-27-01 (notable): oCeJP ID drift — Plan 27-02 instance authors must use rpdc0
  - OPEN-27-02 (minor): alignItems baseline schema fallback to center
  - OPEN-27-03 (minor): typography baseline preserved ("normal"/1.5) vs plan-specified ("400"/1.4)
- **OPEN-24-04, -07, -08, -09 rows** appended with Phase 27 Plan 27-00 update notes (Focus/Error pattern carry-forward, padding [12, 16] for textarea, real consumers for Plan 27-02 form)
- **New `## Variant Evidence (Phase 27)` section** with 29 rows across 5 sub-sections (label-slot extension, Textarea, Select trinity, Checkbox trinity, CheckboxGroup) — full literal-to-semantic bindings per OPEN-23-13 dual-track
- **New `## Calendly Wiring Map (Phase 27)` top-level section** per D-93 with both Calendly URLs: `https://calendly.com/joelshinness` (Thank-you Section/CTA) + `https://calendly.com/me--juoi/discovery-call` (Contact sidebar Card). Implementation guidance for code milestone included.

## Files Modified

- `design/Crito.pen` — 5 commits (one per task; Task 6 doc-only)
- `.planning/research/PEN-INVENTORY.md` — Task 6 (Variant Evidence + Calendly Wiring Map + OPEN updates)
- `.planning/phases/27-thank-you-contact-reconstruction/27-00-SUMMARY.md` — this file

## VAL Outcomes — PAGE-05 Foundation

PAGE-05 foundation requirement **SATISFIED**: form primitives in place for Plan 27-02's 8-field form composition (Name = Input, Email = Input, Company = Input, Challenges = Textarea, Solutions = CheckboxGroup, Budget = Select, Timeline = Select, Message = Textarea). Plus the required-mark + optional-text mechanic (D-91) for any required/optional field indication.

Plan 27-01 (Thank-you joel-only) unblocked transitively — uses existing Section/CTA (Hs5rc) from Phase 26 + inherits the new label-slot mechanic transitively (no immediate consumer).

Plan 27-02 (Contact crito-source-flat-raster reconstruction) unblocked — all 8 form-field primitives + the CheckboxGroup compound are now first-class library entries available for instancing.

## Deviations from Plan — Summary

1. **Task 0 Step 4 SKIPPED** — `get_guidelines({topic:"design-system"})` API signature outdated (current API uses `category`/`name`). No consumer impact.
2. **Task 1 in-place type-conversion probe SKIPPED** — Pencil 2.13 schema explicitly forbids `Update` changing `type`. Went directly to fallback (Delete + Insert) per RESEARCH Open Question 2. Tracked as OPEN-27-01.
3. **alignItems `baseline` → `center`** in all 4 label-slot frames (rpdc0 + Textarea NFFiR + Select × 3 fqDQW/vikbh/poEB1) — Pencil 2.13 schema doesn't support `baseline`. Tracked as OPEN-27-02.
4. **`fontWeight: "400"` → `"normal"`** and **`lineHeight: 1.4` → `1.5`** for all label-text / label-slot text nodes — preserves Phase 24 oCeJP baseline for visual fidelity. Tracked as OPEN-27-03.
5. **Inline execution (main orchestrator)** instead of spawned subagent — Pencil MCP tool inheritance gap (v2.0 Hard Block #1, established pattern from Plans 26-00/26-01/26-02).
6. **`git.branching_strategy=phase` skipped for this run** — local main 114 commits ahead of origin/main; branching off origin would lose Phases 23-26 work. User confirmed skip; future phases will use the configured branching strategy when origin is current.
7. **Per-task user-save-then-commit checkpoint pattern** — Pencil holds mutations in-memory until user Cmd+S. Each task: mutation → user save → git commit. 5 separate user save gates for Plan 27-00 mutations.

## NO User-Calibration Gate at Plan Close

Per D-102 + Phase 26 D-86 carry-forward — foundation plans (no page-frame consumer surface) ship agent-deterministic with no user gate. Plan 27-01 + Plan 27-02 ship user-calibration gates per their respective branch in CALIBRATION-PROTOCOL.md.
