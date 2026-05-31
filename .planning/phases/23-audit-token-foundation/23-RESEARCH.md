# Phase 23: Audit + Token Foundation - Research

**Researched:** 2026-05-31
**Domain:** Pencil MCP audit workflow + two-tier token authoring in `design/Crito.pen`
**Confidence:** HIGH on workflow ordering, source-of-truth discipline, and validation shape (corroborated by Pencil docs + the four v2.0 milestone research files). MEDIUM on exact `set_variables` / `search_all_unique_properties` / `batch_design` argument shapes (Pencil docs name the tools but do not publish wire-level shapes — the first plan resolves this via `get_editor_state(include_schema: true)`). LOW on the *current* contents of `design/Crito.pen` (no Pencil MCP access in this research session — same gap every v2.0 researcher flagged; resolution is the audit itself).

---

## Summary

Phase 23 is the first phase of v2.0 and is `.pen`-only — zero code, zero visual mutation to existing Crito page frames. It runs a **read-only audit** against `design/Crito.pen` using the Pencil MCP server (`get_editor_state` → `get_guidelines` → `batch_get` → `search_all_unique_properties` → `get_variables`), commits the findings as `.planning/research/PEN-INVENTORY.md`, then **writes** a two-tier token surface (primitives + semantic aliases, flat-dash naming) via `set_variables`, and finally builds a single `_Tokens & Foundations` reference frame at the top of canvas via `batch_design`. A `get_screenshot` of that frame archives to `.planning/research/exports/v2.0/tokens-foundations-23.png`.

The whole phase is sequenced behind one disciplinary gate: **the coverage checkpoint at the end of plan 23-01**. If `search_all_unique_properties` returns fewer than ~5 unique colors, ~3 unique font sizes, or no visible spacing-scale pattern, the executor pauses and surfaces findings to the user **before** plans 23-03 / 23-04 write any token. This prevents the v1.4 failure mode (inventing values to fill a sparse audit) from repeating one layer earlier in the design tool.

**Primary recommendation:** Treat plans 23-01 → (checkpoint) → 23-03 → 23-04 → 23-05 as a strict serial chain with hard gates between them. Plan 23-02 was already resolved in CONTEXT.md (D-01: omit dark slots entirely), so it collapses into a documentation note in PEN-INVENTORY.md rather than a discrete user-interaction plan. Every token value must trace to a `search_all_unique_properties` finding or to the Crito `.fig` at `design/images/Consulting & Agency Website Template I Crito (Community).fig` — never to JPG eyedropping (PITFALLS F3).

---

## Standard Stack

This is a `.pen`-only phase. No npm packages, no code-side deps. The "stack" is the Pencil MCP toolchain plus markdown.

### Core (Pencil MCP tools the executor must call)

| Tool | Purpose | Plan(s) | Confidence |
|------|---------|---------|------------|
| `get_editor_state({ include_schema: true })` | First call of every session; returns active file + JSON schema for nodes/variables; hard precondition for every other call | 23-01 | HIGH |
| `get_guidelines({ topic: "design-system" })` | Loads Pencil-authored guidance for token/design-system work | 23-01 | HIGH |
| `get_guidelines({ topic: "landing-page" })` | Loads Pencil-authored guidance for page-reconstruction work (downstream-phase prep) | 23-01 | HIGH |
| `batch_get` | Read top-level frames + their children in as few calls as possible | 23-01 | HIGH |
| `search_all_unique_properties` | Enumerate every distinct fill color, font family, font size, weight, line-height, radius, padding, gap already in the .pen | 23-01 (audit + coverage checkpoint), 23-03 (token derivation) | HIGH |
| `get_variables({})` | Read the (likely-empty) current variable surface | 23-01 (pre-write read), 23-03 + 23-04 (post-write verify) | HIGH |
| `set_variables` | Write primitives (23-03) and semantic aliases (23-04); writes only — never deletes via this call | 23-03, 23-04 | MEDIUM (shape per audit) |
| `find_empty_space_on_canvas` | Place `_Tokens & Foundations` frame without colliding with the existing page frames | 23-05 | HIGH |
| `batch_design` | Insert the reference-frame tree (swatches + type specimens + spacing visualization) | 23-05 | HIGH |
| `snapshot_layout({ rootId, problemsOnly: true })` | Structural QA on the reference frame (no clipping, no overlap) | 23-05 | HIGH |
| `get_screenshot({ nodeId })` | Visual archive of the reference frame for `.planning/research/exports/v2.0/` | 23-05 | HIGH |

### Alternatives Considered

| Instead of | Could Use | Why we don't here |
|------------|-----------|-------------------|
| `batch_design` for the reference frame | `replace_all_matching_properties` | Replace operates on existing nodes; the reference frame is being created fresh in 23-05. Reserve `replace_all_matching_properties` for milestone-close fidelity sweeps (Phase 32). |
| Two separate calls to `set_variables` | One bulk call with primitives + semantics | Single call risks failing atomically and leaving partial state mid-write; per-tier sequencing (primitives first, verify, then aliases) matches the audit-as-hard-block discipline and gives a checkpoint between tiers. |
| `get_screenshot` of each frame during audit | Skip screenshots in 23-01 | Screenshots are NOT needed for the audit itself — `batch_get` gives structural truth. Save screenshots for 23-05 (reference frame archival) only. Per STACK: "Screenshots lie about overlap and clipping; bounds data does not." |
| Open the Crito `.fig` first | Pencil-first per D-04 | The `.fig` is fallback. `search_all_unique_properties` over the `.pen` is primary. `.fig` only opens when 23-01's coverage checkpoint fails. |

**Installation:** None. Pencil MCP server is assumed available to the plan-23 executor (Hard Block #1 per research SUMMARY).

---

## Architecture Patterns

### Pencil-canvas layout at end of Phase 23

```
[ _Tokens & Foundations ]   ← NEW: built in 23-05 at top of canvas
[ Crito Homepage frame ]    ← UNCHANGED
[ Crito Service frame ]     ← UNCHANGED (token-mining-only per D-07)
[ Crito About frame ]       ← UNCHANGED (token-mining-only per D-07)
[ Crito Blog frame ]        ← UNCHANGED (mined for prose tokens per D-15)
[ Crito FAQ frame ]         ← UNCHANGED (mined for prose tokens per D-15)
[ ... other 10 frames ... ] ← UNCHANGED
```

Library frames `_Components / Primitives`, `_Components / Compounds`, `_Components / Sections` are NOT created in this phase (Phase 24 stubs them).

### Pattern 1: Variables-first (non-negotiable)

**What:** Audit → tokens → reference frame. No component or page work.
**Why:** The official Pencil-dev skill states it verbatim ("Start with variables, not literals"). Reversing this is exactly how v1.4 failed at the code layer.
**Verification:** `get_variables({})` after each `set_variables` write batch returns the expected named token set.

### Pattern 2: Two-tier token system

**Tier 1 — Primitives (raw values, never referenced by components directly):**
```
color-primitive-{role}-{step}      e.g.  color-primitive-orange-500
space-primitive-{px-value}          e.g.  space-primitive-24
type-primitive-size-{px-value}      e.g.  type-primitive-size-24
type-primitive-weight-{number}      e.g.  type-primitive-weight-600
type-primitive-family-{role}        e.g.  type-primitive-family-display
type-primitive-lh-{role}            e.g.  type-primitive-lh-tight
radius-primitive-{role-or-px}       e.g.  radius-primitive-md  OR  radius-primitive-8
```

**Tier 2 — Semantic aliases (components reference these only):**
```
color-semantic-bg-page              → color-primitive-neutral-0
color-semantic-bg-surface           → color-primitive-neutral-50
color-semantic-bg-accent            → color-primitive-orange-500
color-semantic-text-primary         → color-primitive-navy-900
color-semantic-text-accent          → color-primitive-orange-600
color-semantic-border-default       → color-primitive-neutral-200

space-semantic-section-y            → space-primitive-96
space-semantic-container-x          → space-primitive-24
space-semantic-stack-{sm|md|lg}     → space-primitive-{8|16|32}
space-semantic-inline-{sm|md|lg}    → space-primitive-{4|8|16}

type-semantic-{display|h1..h6|body|body-sm|caption|button}
type-semantic-prose-paragraph
type-semantic-prose-link
type-semantic-prose-list
type-semantic-prose-inline-code     ← likely OPEN per D-16 if not in Crito Blog/FAQ

radius-semantic-{card|button|input|pill}
```

**Rule:** flat-dash naming for both tiers (D-12). The leading category (`color-`, `space-`, `type-`, `radius-`) substitutes for path nesting; the second segment (`primitive-` / `semantic-`) disambiguates tier.

### Pattern 3: Coverage checkpoint as a real pause

Plan 23-01 ends with the executor writing PEN-INVENTORY.md's `## Coverage Checkpoint` section. The checkpoint format:

```markdown
## Coverage Checkpoint (23-01 end)

**Unique color values found via `search_all_unique_properties`:** N
**Unique font sizes found:** N
**Unique font families found:** N
**Spacing scale pattern visible:** YES (multiples of 4/8) / NO / WEAK

**Verdict:** PASS / PAUSE (per D-05 thresholds)

**If PAUSE — findings to surface to user before 23-03/23-04 begin:**
- [specific numbers and frames where coverage is thin]
- [recommended fallback path: open Crito .fig per D-04]
```

**PASS thresholds (D-05):** ≥5 unique colors AND ≥3 unique font sizes AND visible spacing-scale pattern.
**PAUSE action:** Executor surfaces findings and waits for user confirmation before plans 23-03 / 23-04 run. Pause is INSIDE 23-01's exit, not a separate plan.

### Pattern 4: Source-of-evidence rule

Every token value in 23-03 / 23-04 must trace to one of:

1. `search_all_unique_properties` returned this value from an IN-SCOPE Crito frame (PRIMARY)
2. Crito `.fig` opened in Figma desktop showed this value in the Variables panel (FALLBACK per D-04)
3. The value is an OPEN flag with `blocker-for-phase: N` (per D-10)

No fourth option. JPG eyedropping is explicitly forbidden (PITFALLS F3). Token names derived from training-data conventions (e.g., "every system has a `color-error-500`") are also forbidden if no source evidence exists — they become OPEN flags instead.

### Anti-Patterns to Avoid

- **Inventing intermediate ramp steps:** If `search_all_unique_properties` shows only 2 orange values, the primitive ramp has 2 entries. No `orange-300` to "fill in the middle" (CONTEXT Claude's Discretion clause).
- **Naming dark slots `@light,@dark`:** Forbidden per D-01. Single-theme tokens only.
- **Eyedropping color from `design/images/image-import-*.jpg`:** Forbidden per PITFALLS F3 (JPG chroma subsampling shifts hues).
- **Writing tokens before audit completes:** Plan 23-01 must finish (and coverage checkpoint must PASS or user must explicitly approve PAUSE-state proceed) before any `set_variables` call.
- **Building component frames during Phase 23:** Out of scope. `_Tokens & Foundations` only; `_Components/*` are Phase 24 work.
- **Modifying any existing page frame:** Forbidden by Success Criterion 5 ("zero visual mutation").

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Inventory tracking inside Pencil | Custom sticky-note system | Plain markdown `PEN-INVENTORY.md` per D-18 | Greppable, version-controlled, plan-phase + researcher read it without parsing |
| Token write verification | Custom diff script | `get_variables({})` after each `set_variables` batch | Pencil's own read-back is the authoritative source |
| Reference-frame layout calculation | Hand-computing x/y coordinates | `find_empty_space_on_canvas` | Pencil already solves the "where does this fit" problem |
| Token-value derivation from JPG raster | ImageMagick / Digital Color Meter eyedropping | `search_all_unique_properties` over .pen + Crito `.fig` Variables panel | PITFALLS F3: JPG chroma subsampling shifts hues; .pen's structured nodes carry exact source values |
| Coverage-gauge logic | A formal numeric threshold script | Claude judgement per D-05 (~5 colors, ~3 sizes, visible scale) | Threshold is a heuristic; executor's qualitative judgement is part of the design |
| OPEN-flag schema enforcement | A separate JSON file or YAML | PEN-INVENTORY.md `## Open Flags` section per D-10 | Single source of truth; phase-23 plans don't have to coordinate two artifacts |
| Reference-frame "design" | Re-deriving from Crito visual style | Render every token as the simplest possible swatch / type specimen / spacing-stripe | The reference frame is documentation, not a styled page; minimal-style maximizes verifiability in one screenshot |

**Key insight:** Phase 23's outputs are *evidence artifacts* (PEN-INVENTORY.md + token surface + reference-frame screenshot). Treat them like API documentation, not like product UI. Boring is correct.

---

## Common Pitfalls

### Pitfall 1: Inventing values to fill a sparse audit (v1.4 root cause repeating)

**What goes wrong:** `search_all_unique_properties` returns only 3 unique colors and 2 unique font sizes (because most Crito sections are flat raster). Executor "completes" the token set by inferring intermediate ramp steps, picking standard sizes ("a 14px caption sits naturally between 12 and 16"), or pulling from training-data conventions.
**Why it happens:** Token systems "want" to look complete. Sparse coverage feels like a hole to fill.
**How to avoid:** D-05 coverage checkpoint as a real pause. If audit is thin, surface findings to user before writing. OPEN flags fill the gap (D-13: OPEN flags don't block phase close).
**Warning signs:** Token count more than ~2x the unique-property count from the audit. Token names that don't appear anywhere in `search_all_unique_properties` output.

### Pitfall 2: Token names without role / using path syntax against D-12

**What goes wrong:** Executor types `color/semantic/bg/accent` (path-nested) out of muscle memory matching REQUIREMENTS.md's original example syntax.
**Why it happens:** REQUIREMENTS.md TOKEN-01's examples used path syntax until the patch (in same commit as CONTEXT.md) lands. Visual design-systems convention favors paths.
**How to avoid:** D-12 locks flat-dash naming. Every token name in 23-03 / 23-04 must match the pattern `<category>-<tier>-<role-or-step>(-<modifier>)?` with `-` as the only separator. Verify with `get_variables({})` — names containing `/` or `.` are wrong and need rewrite.
**Warning signs:** A `get_variables({})` response with mixed naming conventions.

### Pitfall 3: PEN-INVENTORY.md format drift

**What goes wrong:** Executor writes a wall of prose instead of the structured schema D-17 mandates. Downstream plan-phase agents can't grep for `scope: IN-SCOPE` or `reconstruction_priority: high`.
**Why it happens:** Markdown lets you write anything; the per-frame schema is non-obvious without re-reading D-17.
**How to avoid:** Plan 23-01 task action must include the exact frame-entry schema (all 8 D-17 fields) and pick markdown structure (single table vs per-frame tables) based on frame count.
**Warning signs:** PEN-INVENTORY.md doesn't have predictable headings like `## Frame: <name>` or a column header row matching D-17 fields.

### Pitfall 4: Reference frame too elaborate to verify in one screenshot (Success Criterion 3 violation)

**What goes wrong:** Executor over-designs `_Tokens & Foundations` — multiple panels, decorative spacing, embedded notes — and the resulting frame doesn't fit one viewport screenshot.
**Why it happens:** Visual-design instinct treats reference frames like product UI.
**How to avoid:** Use a single tall column layout. Sections in order (Claude's discretion per CONTEXT): color → typography → spacing → radii. Every token visible as one row (swatch + token name + value text). Frame width matches Crito page widths (≈1440px) so the screenshot is consistent with other archived assets.
**Warning signs:** `snapshot_layout({ problemsOnly: true })` returns clipping warnings. `get_screenshot` produces a file >2MB or >4000px tall.

### Pitfall 5: Mutating Crito page frames during audit

**What goes wrong:** Executor accidentally moves a frame, renames a node, or selects-and-deletes during `batch_get` exploration. Success Criterion 5 ("zero visual mutation to any Crito frame") is violated.
**Why it happens:** Pencil MCP `batch_design` accepts mutation ops; an accidental U(id,{...}) in plan 23-01's tool-call sequence would be silent.
**How to avoid:** Plan 23-01 is read-only — its task actions must call ONLY `get_*` / `batch_get` / `search_*` tools. `batch_design` is forbidden in 23-01. Plan 23-03 / 23-04 use `set_variables` (a separate, variable-scoped tool that does not touch frame nodes). Plan 23-05 uses `batch_design` to *insert* the new reference frame — never to update existing frames.
**Warning signs:** `get_editor_state` after each plan shows a different `lastModified` timestamp on any page frame's children (vs. start-of-phase baseline).

### Pitfall 6: `set_variables` argument-shape mismatch

**What goes wrong:** Executor uses the example shape from STACK.md (`'color.bg=color:#FFFFFF@light,#0F172A@dark'`) verbatim. The actual Pencil schema may differ (different key name, different value-type prefix, dashes vs dots).
**Why it happens:** Pencil docs name `set_variables` but don't publish the wire-level shape; STACK.md's shape was assembled from skill files + community walkthroughs.
**How to avoid:** Plan 23-03 first task action is "inspect schema returned by `get_editor_state(include_schema: true)` in 23-01 for the variable definition shape, then write a single small batch (one color primitive) and verify with `get_variables({})` before writing the full primitive set." Treat the first write as a syntax probe.
**Warning signs:** `get_variables({})` after first write returns nothing, or returns a token with a malformed name. Halt and adjust before writing more.

### Pitfall 7: Treating Crito About / Service frames as page-reconstruction work

**What goes wrong:** Executor sees Crito's About frame in 23-01's audit and starts cataloguing its sections for reconstruction (priority, status, etc.) — implicitly committing to reconstructing them as Joel pages.
**Why it happens:** D-07 is subtle: "IN-SCOPE for token-mining-only" reads close to "IN-SCOPE." Reconstruction-status fields are tempting to fill.
**How to avoid:** In PEN-INVENTORY.md the About + Service frames get `scope: IN-SCOPE token-mining-only` and `joel_page_map: none (token mining only)`. Their `reconstruction_priority` is `n/a (out of scope)`. Their section structures live in a separate "section structure candidates for Phase 31" note (per D-07).
**Warning signs:** PEN-INVENTORY.md has a `reconstruction_priority: high` for the About frame.

---

## Code Examples

These are *call patterns* the executor will use, not literal JS — they show argument shape and sequencing. Exact JSON keys depend on `get_editor_state(include_schema: true)` output in 23-01.

### Audit sequence (plan 23-01)

```text
# Step 1: precondition
get_editor_state({ include_schema: true })
# Capture: schema for nodes + variables, active file = design/Crito.pen

# Step 2: guidelines
get_guidelines({ topic: "design-system" })
get_guidelines({ topic: "landing-page" })
# Capture: Pencil-authored guidance verbatim into PEN-INVENTORY.md

# Step 3: top-level inventory (single batched call when feasible)
batch_get({ queries: [{ pattern: "page:*" }] })   # or whatever schema names top-level frames
# Capture: every top-level frame's id, name, dimensions, child count

# Step 4: per-frame child catalogue (single batched call across all 15 frame IDs)
batch_get({ queries: [{ id: "<frame-id-1>" }, { id: "<frame-id-2>" }, ...] })
# Capture: each frame's children with names + status (FLAT raster / partial / factored)

# Step 5: enumerate unique raw values
search_all_unique_properties({ /* shape per schema */ })
# Capture: all unique fill colors, font families, font sizes, weights, line-heights, radii,
#          paddings, gaps already present in the .pen.
#          THIS IS THE COVERAGE-CHECKPOINT INPUT.

# Step 6: current variable surface (likely empty pre-Phase-23)
get_variables({})
# Capture: any pre-existing variables (Figma → Pen import may have carried some over)

# Step 7: coverage checkpoint (Claude judgement per D-05)
# If thin: write findings to PEN-INVENTORY.md ## Coverage Checkpoint section,
# pause, surface to user before 23-03 / 23-04 run.
# If pass: continue.
```

### PEN-INVENTORY.md per-frame schema (D-17)

```markdown
## Frame: Crito Homepage
- frame_name: Homepage
- frame_id: <pencil-internal-id>
- scope: IN-SCOPE
- joel_page_map: Homepage (Joel's `/` route)
- child_section_count: 8
- status_counts: { flat: 6, partial: 2, factored: 0 }
- reconstruction_priority: high (most-trafficked surface; Phase 31)
- open_flag_ids: [OPEN-23-03, OPEN-23-07]
```

OR (one combined table — Claude picks per Claude's-Discretion clause once frame count is known):

```markdown
| frame_name | frame_id | scope | joel_page_map | child_section_count | status_counts | reconstruction_priority | open_flag_ids |
|------------|----------|-------|---------------|---------------------|---------------|--------------------------|---------------|
| Homepage   | <id>     | IN-SCOPE | Homepage     | 8 | {flat:6,partial:2,factored:0} | high | [OPEN-23-03] |
| FAQ        | <id>     | IN-SCOPE | FAQ          | 2 | {flat:2,partial:0,factored:0} | medium | [] |
| About      | <id>     | IN-SCOPE token-mining-only | none (token mining only) | 5 | {flat:5,partial:0,factored:0} | n/a (out of scope) | [] |
| ...        | ...      | ... | ... | ... | ... | ... | ... |
```

(V1.4's last successful inventory found 15 top-level page frames in the .pen. Expected scale ≈ 15 entries. A single table likely beats per-frame headings at that count.)

### OPEN-flag schema (D-10)

```markdown
## Open Flags

- id: OPEN-23-01
  category: token
  severity: notable
  description: inline-code prose styling not depicted in Crito Blog or FAQ frames
  blocker-for-phase: 28

- id: OPEN-23-02
  category: audit
  severity: minor
  description: Crito View More frame had only 2 unique colors in audit; assumed unused for IN-SCOPE token derivation
  blocker-for-phase: none
```

### Token-write sequence (plan 23-03 + 23-04)

```text
# 23-03 PRIMITIVES — small probe batch first
set_variables({ variables: { "color-primitive-orange-500": "<value-from-audit>" }, replace: false })
get_variables({})   # verify shape + naming correctly accepted

# Then full primitive batch
set_variables({ variables: { 
  "color-primitive-orange-100": "<value>",
  "color-primitive-orange-500": "<value>",
  ...
  "space-primitive-24": "<value>",
  "type-primitive-size-24": "<value>",
  "radius-primitive-md": "<value>",
}, replace: false })
get_variables({})   # verify full primitive surface present

# 23-04 SEMANTIC ALIASES
set_variables({ variables: {
  "color-semantic-bg-accent": "<reference-to-primitive>",
  "space-semantic-section-y": "<reference-to-primitive>",
  "type-semantic-heading-1": "<composite-reference>",
  ...
}, replace: false })
get_variables({})   # verify semantic tier present + references resolve
```

**Note:** Pencil's variable-to-variable aliasing support is not pre-verified (ARCHITECTURE OQ2 in research). If aliasing isn't supported, the fallback per ARCHITECTURE: collapse to single tier with the source primitive documented in the variable description field. This is a MEDIUM-confidence area resolved by 23-03's probe write.

### Reference-frame build sequence (plan 23-05)

```text
find_empty_space_on_canvas({ /* near top of canvas */ })
# Capture: x/y for the new frame; ensure no overlap with the 15 page frames

batch_design({ operations: 'tokenFrame=I(document,{type:"frame",name:"_Tokens & Foundations",x:<from-above>,y:<from-above>,width:1440,...})' })
# Then nested I(tokenFrame, ...) ops to insert:
#   - One row per color token: swatch (square fill) + name text + value text
#   - One row per typography token: type specimen text (using the token) + name + value
#   - Spacing-scale visualization: horizontal stripes at each spacing value, labeled
#   - Radius visualization: small filled rectangles at each radius value, labeled
#   - A note explaining dark-mode omission (per D-02)

snapshot_layout({ rootId: "<token-frame-id>", problemsOnly: true })
# Expect: zero clipping, zero overlap issues

get_screenshot({ nodeId: "<token-frame-id>" })
# Save raw PNG to .planning/research/exports/v2.0/tokens-foundations-23.png  (per D-19)
```

**Layout note:** `batch_design` caps at ~25 ops per call per STACK. The reference frame may need 2-4 calls chunked by section (color section, type section, spacing section, radii section).

---

## Validation Architecture

Phase 23 is `.pen`-only — no code, no behavioral tests. Validation is **artifact presence + structural completeness**, not behavior.

### Nyquist Dimensions That Apply

| Dimension | Applies | Why |
|-----------|---------|-----|
| 1. Behavioral / functional | NO | No code runs. No user-facing behavior changes. |
| 2. State transitions | NO | No state machine in this phase. |
| 3. Data integrity | PARTIAL | The `.pen` is data, but the integrity check ("frames unchanged") is a structural check (Dim 8). |
| 4. Concurrency | NO | Single-threaded plan execution. |
| 5. Error / boundary | PARTIAL | The coverage-checkpoint PAUSE is a boundary condition; tested by verifying the pause logic triggers when thresholds aren't met. |
| 6. Performance | NO | No runtime perf concern. |
| 7. Accessibility / a11y | NO | No code render. |
| **8. Structural completeness** | **PRIMARY** | Every Success Criterion is an artifact-presence + schema-completeness assertion. This is the dimension that matters. |
| 9. Visual / pixel fidelity | PARTIAL | Reference-frame screenshot is archived but not pixel-diffed against any baseline in this phase (calibration starts Phase 26). |
| 10. Cross-system integration | NO | No external system. |

### Validation Tasks (for 23-VALIDATION.md)

These map 1:1 to the five Success Criteria in ROADMAP.md.

#### VAL-23-01: PEN-INVENTORY.md exists with required schema (Success Criterion 1)
- **Test:** File exists at `.planning/research/PEN-INVENTORY.md`.
- **Test:** Every top-level Crito frame has an entry (count matches `get_editor_state` top-level frame count; expected ≈15 per v1.4-research/ARCHITECTURE.md).
- **Test:** Every entry has all 8 D-17 fields populated (no `TBD` / `???` placeholders).
- **Test:** Every entry's `scope` is one of: `IN-SCOPE` / `IN-SCOPE token-mining-only` / `OUT-OF-SCOPE` / `joel-only-no-crito-ref`.
- **Test:** Every IN-SCOPE entry has `child_section_count > 0` and `status_counts` summing to that count.
- **Test:** OPEN flags follow D-10 schema (id, category, severity, description, blocker-for-phase).
- **Test:** `## Coverage Checkpoint` section is present and resolves PASS or documents PAUSE-with-user-approval.

#### VAL-23-02: Two-tier token surface (Success Criterion 2)
- **Test:** `get_variables({})` returns tokens covering all four categories (color, typography, spacing, radii).
- **Test:** Every token name matches flat-dash convention (no `/` or `.`). Regex: `^(color|space|type|radius)-(primitive|semantic)-[a-z0-9-]+$`.
- **Test:** Every component-facing semantic token (Tier 2) is present — at minimum the role names listed in TOKEN-02 through TOKEN-06.
- **Test:** Zero tokens carry `@light,@dark` or any per-theme suffix (D-01 — dark-mode omission).
- **Test:** Primitive count ≤ ~2x unique-property count from 23-01 audit (drift sanity check per Pitfall 1).
- **Test:** Every semantic alias resolves to a primitive value (either via Pencil's aliasing, or via `description` field per ARCHITECTURE fallback).

#### VAL-23-03: `_Tokens & Foundations` reference frame (Success Criterion 3)
- **Test:** `batch_get` returns a frame named `_Tokens & Foundations` near top of canvas.
- **Test:** Frame contains a node per color token (swatch), per typography token (specimen), per spacing token (stripe), per radius token (rectangle).
- **Test:** `snapshot_layout({ problemsOnly: true })` returns zero clipping / overlap issues.
- **Test:** Screenshot archived at `.planning/research/exports/v2.0/tokens-foundations-23.png` (per D-19).
- **Test:** Screenshot is verifiable in one viewport (height ≤ ~4000px; readable at single-page zoom).
- **Test:** Dark-mode omission note is present in the frame (per D-02).

#### VAL-23-04: Source-evidence traceability (Success Criterion 4)
- **Test:** Every token value in PEN-INVENTORY.md's `## Tokens Written` log has a `source` field: `search_all_unique_properties` / `Crito .fig` / `OPEN flag`.
- **Test:** Zero tokens cite raster JPG or any `design/images/image-import-*.jpg` source (PITFALLS F3).
- **Test:** Every OPEN flag has a `blocker-for-phase` value (per D-10) — `none` is acceptable for non-blockers.

#### VAL-23-05: Zero visual mutation to Crito frames (Success Criterion 5)
- **Test:** For each of the 15 Crito top-level frames, `get_screenshot` taken at end of phase visually matches the same frame's appearance at start of phase. (Screenshot diff is the validation method.)
- **Test:** `batch_get` on each Crito frame returns the same child-node id set as at start of phase (no nodes added, removed, or renamed inside existing frames).
- **Test:** The only NEW top-level frame on canvas is `_Tokens & Foundations` (per 23-05).

### Validation Notes

- **No Playwright. No axe-core. No Lighthouse.** Those are code-side validations and don't apply.
- **The user is the second-look reviewer** (per PITFALLS C6) for VAL-23-03 (the reference-frame screenshot) — but only after the structural tests pass.
- **Validation runs after plan 23-05** completes. There is no per-plan validation step in this phase; structural completeness is end-state.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| v1.4: build v2 tokens in CSS from best-guesses of flat-raster .pen | v2.0 Phase 23: build tokens in the .pen from `search_all_unique_properties` of editable nodes | 2026-05-31 v1.4 abandonment | Removes the "best-guess" failure mode by keeping derivation inside the design tool |
| v1.4 ARCHITECTURE Decision 4: split into `design/design-system.pen` per-page | v2.0 single-file strategy: everything in `design/Crito.pen` with `_`-prefix library frames | 2026-05-31 v2.0 milestone start | Matches Pencil MCP `batch_get` / `snapshot_layout` single-file operating model |
| REQUIREMENTS.md TOKEN-01 path-nested example (`color/semantic/bg/accent`) | Flat-dash: `color-semantic-bg-accent` | 2026-05-31 CONTEXT D-12 (REQUIREMENTS.md patched in same commit per D-13) | Closer to final CSS variable names; cleaner to grep |
| Encode `@light,@dark` token syntax with dark stubbed to light (STACK's recommendation) | Omit dark slots entirely (single-theme) | 2026-05-31 CONTEXT D-01 | Avoids premature commitment; future milestone designs dark from scratch |

**Deprecated/outdated:**
- v1.4-research/ARCHITECTURE.md Decision 4 (split per-page .pen files) — reversed by v2.0 single-file strategy
- STACK.md's `set_variables` example syntax with `@light,@dark` (still useful as a syntax reference, but the dark half is unused per D-01)
- ARCHITECTURE.md's `color/primitive/orange-500` path-nested examples (semantically right, naming syntax superseded by D-12)

---

## Per-Plan Files-Modified Summary

For the planner's file-list-mode tasks.

| Plan | What it touches | Files modified / created |
|------|----------------|--------------------------|
| 23-01 (audit + inventory) | Reads `.pen`, writes inventory markdown | CREATE `.planning/research/PEN-INVENTORY.md` |
| (23-02 deferred — resolved in CONTEXT D-01) | Documentation note only | UPDATE `.planning/research/PEN-INVENTORY.md` (dark-mode omission note) |
| 23-03 (primitive tokens) | Pencil `set_variables` (variable surface inside `.pen`); inventory log | MODIFY `design/Crito.pen` (variable surface only); UPDATE `PEN-INVENTORY.md` (`## Tokens Written ` log) |
| 23-04 (semantic aliases) | Pencil `set_variables`; inventory log | MODIFY `design/Crito.pen` (variable surface only); UPDATE `PEN-INVENTORY.md` |
| 23-05 (reference frame) | `batch_design` to insert a new top-level frame; `get_screenshot` archives the result | MODIFY `design/Crito.pen` (new `_Tokens & Foundations` frame); CREATE `.planning/research/exports/v2.0/tokens-foundations-23.png` |

**Files that MUST NOT be modified in Phase 23:**
- Any existing Crito page frame's children (Success Criterion 5)
- `src/**`, `tests/**`, `package.json`, `astro.config.mjs`, `tailwind.config.*` (v2.0 is `.pen`-only)
- `design/images/*` (reference-only)
- `design/Alliatus – Mastermind Landing Page Template (Community).fig` (unrelated leftover per D-04)
- `design/images/Consulting & Agency Website Template I Crito (Community).fig` (consulted in fallback, not modified)
- Any v1.3-shipped `.planning` artifact except this phase's CONTEXT/DISCUSSION-LOG/RESEARCH/PLAN

---

## Open Questions

1. **Exact `set_variables` argument shape (key naming, value-type prefix syntax)**
   - **What we know:** Pencil docs name the tool. STACK.md gives shape `'color.bg=color:#FFFFFF@light,#0F172A@dark'` from skill+community sources.
   - **What's unclear:** Whether the shape works with flat-dash names (e.g., `color-bg=color:...`) — D-12 deviates from common Pencil examples.
   - **Recommendation:** Plan 23-03's first task action is a syntax probe — write ONE primitive, `get_variables({})` verify, then proceed. If shape rejects flat-dash, surface to user.

2. **Pencil variable-to-variable aliasing support**
   - **What we know:** ARCHITECTURE OQ2 flagged this as unverified. Two-tier scheme assumes aliasing works.
   - **What's unclear:** Whether Pencil allows `color-semantic-bg-accent` to reference `color-primitive-orange-500` directly, or only resolves to literal values.
   - **Recommendation:** Plan 23-04's first task action probes aliasing with one semantic alias; if rejected, fall back to single tier with primitive provenance in description field (per ARCHITECTURE).

3. **`search_all_unique_properties` exact output shape**
   - **What we know:** STACK.md describes its purpose; Pencil docs name it but don't publish the wire shape.
   - **What's unclear:** Whether output is `{ colors: [...], fonts: [...], sizes: [...] }` or a flat list of property/value pairs.
   - **Recommendation:** Plan 23-01 captures whatever shape the call returns; downstream catalog work in PEN-INVENTORY.md follows that shape.

4. **Does Pencil's `_` prefix actually sort frames to top of canvas?**
   - **What we know:** ARCHITECTURE assumes it does (Pencil renders frames in alphabetical order). Common convention from Figma carries over.
   - **What's unclear:** Whether the executor needs to also set explicit `y` coordinates to enforce top-of-canvas position.
   - **Recommendation:** Plan 23-05 uses `find_empty_space_on_canvas` with bias toward y=topmost; if the underscore alone sorts correctly, the explicit y reinforces it; if not, the explicit y is the actual mechanism.

5. **Are there any pre-existing variables in `design/Crito.pen` from the Figma import?**
   - **What we know:** v1.4-research/ARCHITECTURE inventoried 15 page frames and zero factored components; variables weren't mentioned, suggesting none.
   - **What's unclear:** Figma → Pen conversion may have carried some style names through.
   - **Recommendation:** Plan 23-01's `get_variables({})` resolves it. If pre-existing variables conflict with planned names, the executor's task action documents the conflict and decides per case (likely: leave pre-existing intact, document them in PEN-INVENTORY.md, add new ones with flat-dash naming alongside).

6. **Crito `.fig` accessibility for fallback (D-04)**
   - **What we know:** File exists at `design/images/Consulting & Agency Website Template I Crito (Community).fig`. Joel's machine has Figma desktop available (assumed — not verified in this research).
   - **What's unclear:** Whether the file opens cleanly and exposes the Variables panel.
   - **Recommendation:** Coverage checkpoint at 23-01 end is the right place to check — only invoke if Pencil audit is thin per D-05.

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — locked decisions D-01 through D-20 (2026-05-31)
- `.planning/REQUIREMENTS.md` — AUDIT-01..03, TOKEN-01..08 (TOKEN-01 patched per D-12 in same commit as CONTEXT.md)
- `.planning/ROADMAP.md` — Phase 23 entry: Goal, Depends on, Success Criteria 1-5, Plans 23-01..05
- `.planning/research/SUMMARY.md` — themes T1 (variables-first), T2 (audit-as-hard-block), T5 (don't repeat v1.4), T6 (single-file `_`-prefix), T7 (dark conflict resolved per D-01)
- `.planning/research/STACK.md` — Pencil MCP tool catalogue with HIGH confidence on names, MEDIUM on argument shapes; verbatim Pencil-dev skill quotes
- `.planning/research/ARCHITECTURE.md` — primitive→semantic→component→page chain; two-tier rationale; single-file strategy
- `.planning/research/PITFALLS.md` — F1-F5, O1-O6, U1-U6, J1-J5, C1-C6 with prevention strategies P0-P16 (esp. P0, P2, P4, P13, P15)
- `.planning/milestones/v1.4-research/ARCHITECTURE.md` — last successful inventory (15 page frames, zero factored components — the expected scale for 23-01's inventory)
- `.planning/PROJECT.md` — v2.0 milestone goal, "Jurassic Park" framing, abandonment context
- Pencil CLI docs (https://docs.pencil.dev/for-developers/pencil-cli) — tool list verified 2026-05-31

### Secondary (MEDIUM confidence)
- Pencil-dev SKILL.md (https://github.com/unliftedq/skills/blob/main/skills/pencil-dev/SKILL.md) — workflow ordering, anti-patterns, "Start with variables, not literals" verbatim
- Pencil core concepts: Variables (https://docs.pencil.dev/core-concepts/variables) — variable concept overview; specific syntax details NOT published

### Tertiary (LOW confidence — flagged for validation during execution)
- `set_variables` argument shape with flat-dash names (D-12) — not published in Pencil docs; resolved by probe write in 23-03
- Pencil variable-to-variable aliasing — assumed-supported in ARCHITECTURE; resolved by probe in 23-04
- `search_all_unique_properties` output shape — resolved by call in 23-01
- Current variable surface inside `design/Crito.pen` — resolved by `get_variables({})` in 23-01

---

## Metadata

**Confidence breakdown:**
- Workflow ordering + plan dependencies: HIGH — all four v2.0 research files converge; CONTEXT decisions lock the constraints
- Standard stack (Pencil MCP tool catalogue): HIGH on tool names + purposes, MEDIUM on exact argument shapes (per LOW-confidence open questions above)
- Architecture patterns (two-tier tokens, flat-dash naming, coverage checkpoint): HIGH — CONTEXT-locked
- Pitfalls: HIGH — derived from PITFALLS.md prevention strategies and v1.4 abandonment evidence
- Validation architecture: HIGH on dimension selection (Dim 8 structural completeness); HIGH on test enumeration (one VAL-23-N per Success Criterion)
- Current `.pen` contents: LOW — no Pencil MCP access in this session; same gap every v2.0 researcher flagged

**Research date:** 2026-05-31
**Valid until:** Until plan 23-01's `get_editor_state(include_schema: true)` returns schema information that contradicts MEDIUM/LOW-confidence assumptions. Treat the audit's first call as the verification gate.

---

## RESEARCH COMPLETE
