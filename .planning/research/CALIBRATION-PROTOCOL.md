---
version: 1.0
established: Phase 26 (2026-06-07)
established_by: Plan 26-03 (codify-what-worked per D-67)
inherited_by:
  - Phase 27 (Thank-you + Contact)
  - Phase 28 (Blog index + Blog post + Blog tag-page)
  - Phase 29 (Projects index + Project detail)
  - Phase 30 (Design system)
  - Phase 31 (Homepage)
status: active
location_truth: ".planning/research/CALIBRATION-PROTOCOL.md (this file)"
anchor_in: ".planning/research/PEN-INVENTORY.md § Calibration Protocol (1-2 sentence cross-reference per D-69)"
---

# CALIBRATION-PROTOCOL.md — Per-Section Calibration Workflow for v2.0 Per-Page Phases

## 1. Purpose + Scope

Codifies the per-section calibration workflow established in Phase 26 (FAQ + 404 reconstructions, both `joel-only-no-crito-ref`). Every per-page phase from 26 onward inherits this protocol as its **definition-of-done framework**. The protocol has two branches because Crito source coverage is non-uniform across Joel's pages — some pages have an editable Crito reference (`crito-source-present`), others are fresh-design with no Crito source (`joel-only-no-crito-ref`). Both branches deliver the same outcome — **VALID-01** per-section fidelity label + **VALID-02** calibration artifact + **VALID-03** gap declaration — via branch-appropriate mechanisms.

This document is the durable record of what Plans 26-01 (FAQ) and 26-02 (404) **actually ran** in production, not theoretical guidance. Codify-what-worked per D-67. Reflects practice over speculation.

## 2. Branch Decision Tree

Look up the per-page reconstruction target in `.planning/research/PEN-INVENTORY.md § Frames Inventory`:

```
┌─ Page name found in Frames Inventory?
│
├── YES, scope == "joel-only-no-crito-ref"  ──→  JOEL-ONLY BRANCH
│
├── YES, scope == "IN-SCOPE"  ──→  is there a non-flat Crito frame OR raster
│                                  in design/images/?
│       ├── YES → CRITO-SOURCE-PRESENT BRANCH
│       └── NO  → CRITO-SOURCE-PRESENT BRANCH (raster-only sub-case;
│                 PAGE-11 evaluated case-by-case for flat-raster pages)
│
├── YES, scope == "IN-SCOPE token-mining-only"  ──→  NOT a reconstruction target
│       (only tokens are mined; no Joel page maps here per D-07)
│
├── YES, scope == "OUT-OF-SCOPE"  ──→  NOT a reconstruction target
│
└── NO (page name not in Frames Inventory)  ──→  ADD a row before reconstruction
        (treat as joel-only-no-crito-ref if no Crito frame can be located)
```

**Frame scope as authoritative branch driver.** PEN-INVENTORY's `scope` column is the single source of truth for the branch decision. Adding a new page (e.g., Phase 27 Thank-you, Phase 29 Projects index) starts with adding a row before any Pencil mutation.

## 3. crito-source-present branch protocol

Used by: Phase 27 (Contact `cl8tt`) + Phase 28 (Blog index `DzqTm` / Blog post `w1m3x`) + Phase 31 (Homepage `ujMLJ`). Also applies to flat-raster sub-cases — see PAGE-11 case-by-case rule below.

### 3.1 VALID-02 redefinition (crito-source)

The calibration artifact for `crito-source-present` is a **side-by-side comparison** of the reconstructed section against the matching Crito source. Either:
- `mcp__pencil__get_screenshot(<reconstructed-section-id>)` + Crito frame rendering at the same node level (where the source is editable, e.g., `ujMLJ` Hero), OR
- `mcp__pencil__get_screenshot(<reconstructed-section-id>)` + raster image from `design/images/image-import-NN.{jpg,png}` (where the source is flat-raster, e.g., `cl8tt`).

The calibration question framed at the AskUserQuestion gate becomes: *"Does the reconstructed section match the Crito source, with declared deviations documented?"*

### 3.2 VALID-01 fidelity definitions (crito-source — per D-63)

- **EXACT** — pixel-faithful to the matching raster or editable source; no visible deviation at calibration scale.
- **APPROXIMATE** — visually close but with declared deviations; deviations documented inline at the calibration gate AND as OPEN flags if significant (e.g., Joel-brand color substitution at a Crito control surface).
- **STUB** — placeholder; full reconstruction deferred; calibration confirms the layout-frame is in place even if the content isn't.

### 3.3 PAGE-11 status (crito-source)

**ACTIVE.** After the per-section calibration gate APPROVES the reconstruction, the matching Crito source raster (or raster reference) is removed, hidden via `enabled: false`, or locked. The exact action depends on the page-level scope:
- If the raster is the entire page (e.g., flat-raster pages like `cl8tt` Contact), **hide** via `enabled: false` so the structural archive persists at the same canvas coordinates.
- If the raster is one section among many in an editable Crito frame (e.g., a Hero illustration inside `ujMLJ`), **lock** (mark with a sibling Pencil note) and leave in place for cross-reference.

PEN-INVENTORY `status_counts` flat:N decrements when a raster is hidden or locked; documented in the per-plan Variant Evidence row.

### 3.4 Per-step script (crito-source branch)

1. `mcp__pencil__get_editor_state({ include_schema: false })` — pre-flight active-editor assertion per D-87.
2. `mcp__pencil__batch_get({ nodeIds: [...] })` — verify baseline IDs intact (Phase 25 + Phase 26 components + prior reconstructed pages from earlier waves).
3. **Construct reconstructed section** via `mcp__pencil__batch_design` Insert / Copy operations. Place at document root if a new page frame; place inside the page frame's vertical auto-layout if a sub-section.
4. **Capture comparison:**
   - `mcp__pencil__get_screenshot({ nodeId: "<reconstructed-section-id>" })` — inline render of the reconstructed section.
   - Locate matching Crito source: either `batch_get` on the Crito source frame, or note the raster filename in `design/images/`.
5. **AskUserQuestion** presenting both images + structured "matches the source?" question with per-section fidelity proposals + (optional) deviation lists for APPROXIMATE labels.
6. **Options:** APPROVE / REVISE / GAP — REVISE iterates via `batch_design` Update; GAP logs OPEN-{PHASE}-NN with the declared deviation.
7. **On APPROVE** + PAGE-11 ACTIVE → `mcp__pencil__batch_design` Update sets the matching raster `enabled: false` (or moves to an archival sub-frame). PEN-INVENTORY Frames Inventory `status_counts` updated.
8. PEN-INVENTORY extensions per D-88: Frames Inventory row + Variant Evidence rows + any OPEN flags.

### 3.5 Description identifier convention (crito-source)

`<phase>-<page>-<section>--side-by-side.png` — example: `27-contact-hero--side-by-side.png`, `28-blog-card-grid--side-by-side.png`. **IDENTIFIER ONLY**, NOT a writable path. See § 6 below for the inline-screenshot substitution per OPEN-23-01.

## 4. joel-only-no-crito-ref branch protocol

Used by: Phase 26 (FAQ + 404 — Plans 26-01 + 26-02 — both joel-only) + Phase 27 (Thank-you joel-only) + Phase 28 (Blog tag-page joel-only) + Phase 29 (Projects index + Project detail — both joel-only) + Phase 30 (Design system joel-only).

This is the branch Plans 26-01 + 26-02 **actually ran** — protocol is codified from production, not from a theoretical sketch.

### 4.1 VALID-02 redefinition (joel-only — per D-62)

The calibration artifact for `joel-only-no-crito-ref` is a **token-usage check** against `_Tokens & Foundations` (Pencil frame `RpGbe` at top-of-canvas). The reconstructed section's literal hex / px / font / typography values must bind to the semantic-token surface declared in `RpGbe`; deviations must be either (a) documented as APPROXIMATE with a declared deviation, or (b) raised as a GAP OPEN flag if a token-surface extension is implied.

The calibration question framed at the AskUserQuestion gate becomes: *"Does the composition use the declared tokens correctly?"*

### 4.2 VALID-01 fidelity definitions (joel-only — per D-63 + D-83)

- **EXACT** — every property in the reconstructed section binds to a semantic token (via literal-with-Variant-Evidence-row, OR via `$<token>` reference where Pencil allows it) AND the user has spot-checked the binding at the calibration gate. Example: Plan 26-01 Q+A list — heading-2 typography + prose-paragraph typography + bg-page + text-primary + text-secondary + section-y rhythm all bound and APPROVED.
- **APPROXIMATE** — uses primitives directly without an intermediate semantic alias, OR has inferred values flagged as an OPEN flag, OR new brand-neutral content not derived from a stable source (e.g., the FAQ page-intro body "Answers to common questions about working with Joel." — APPROXIMATE because the copy is authored at calibration time, not derived from Joel's existing v1.3 content).
- **STUB** — layout placeholder, token-binding or content deferred. Example: Plan 26-01 Section/CTA — STUB because microcopy is placeholder per D-82; Plan 26-02 message-section — TEXT=STUB / LAYOUT=EXACT split per D-83 (the layout binds tokens correctly even though the copy is placeholder).

**Granularity per D-83:** Fidelity labels attach to **sections**, not whole pages. Mixed-fidelity pages are honest: FAQ shipped Q+A=EXACT + page-intro=APPROXIMATE + CTA=STUB + Header=EXACT + Footer=EXACT. 404 shipped message-LAYOUT=EXACT/TEXT=STUB + NavBack=EXACT + Header=EXACT + Footer=EXACT.

### 4.3 PAGE-11 status (joel-only)

**INERT.** No Crito source raster exists for joel-only pages (no `flat` row in PEN-INVENTORY for the joel-only scope by construction). PAGE-11 requires a raster to remove; the joel-only branch has nothing to remove. Plan 26-02 added the explicit PAGE-11 INERT note to PEN-INVENTORY's Frames Inventory; this protocol cross-references that note.

PAGE-11 is the cleanest single-line rule of the entire protocol: **PAGE-11 applies only to the crito-source branch.**

### 4.4 Per-step script (joel-only branch — codified from Plans 26-01 + 26-02 actuals)

1. `mcp__pencil__get_editor_state({ include_schema: false })` — pre-flight active-editor assertion per D-87.
2. `mcp__pencil__get_variables({})` — token-surface drift verification (must match the count from the predecessor plan's close state; e.g., 100 at end of Plan 26-00 through end of Phase 26).
3. `mcp__pencil__batch_get({ nodeIds: [<prior-plan-IDs>] })` — verify baseline + prior-plan-reconstructed IDs intact.
4. **Find empty space for the new page frame:** Inside `batch_design` JavaScript, call `FindEmptySpace({ width: 1440, height: <estimate>, direction: "right", padding: 80, nodeId: <previous-reconstructed-page-id> })`.
   - **Anchor pattern (Plan 26-02 contribution):** Pass `nodeId: <previous-reconstructed-page-id>` (e.g., FAQ frame `b7Hgy` for the 404 reconstruction). Without the `nodeId` anchor, `FindEmptySpace` may pick the library-row Y (y ≈ −11711) rather than the page-frame row (y ≈ −4111). With the anchor, placement falls on the same row as the anchor.
5. **Construct page frame** via `mcp__pencil__batch_design` Insert at document root (NOT inside library parents — Pitfall 3 compliance). Set `width: 1440`, `height: <estimate>`, `layout: "vertical"`, `gap: 0`, `padding: 0`, `alignItems: "center"`, `fill: "#ffffffff"`, `placeholder: true`.
6. **Insert content children** via additional `batch_design` calls. Layout pattern (FAQ + 404 both follow): Header ref → optional intro/message frame → core content section(s) → optional CTA ref or NavBack ref → Footer ref. All sub-sections width 1200 to center inside the 1440 page-frame.
7. **Layout sweep at plan close:** `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` at document level (expect `"No layout problems."`); then `mcp__pencil__snapshot_layout({ parentId: <page-frame-id>, problemsOnly: true })` per-frame. Document any text-clipping false-positives per Phase 24/25 precedent (Pitfall 6 — known false-positive on multi-line text in auto-layout frames; NOT a real clipping; NO mitigation applied).
8. **Page-frame fit_content + position clear:** `Update(<page-frame-id>, { placeholder: false, height: "fit_content" })` before screenshot. The `fit_content` height is more flexible than a fixed estimate and avoids future structural-edit complications.
9. **Per-section screenshots for calibration gate:** `mcp__pencil__get_screenshot({ nodeId: "<section-id>" })` for each section needing spot-check — INLINE render only, NOT disk-written per § 6 OPEN-23-01 substitution.
   - **OPEN-26-02 workaround applies:** If `get_screenshot` returns blank-white for a newly-created subtree:
     - **Tier-1** — `Update(<page-frame>, { x: <new-x>, y: <different-row-y> })` then move back. Cross-row Update clears the stale render cache (worked for FAQ Plan 26-01 Task 5).
     - **Tier-2** — If Tier-1 fails (same-row Updates didn't clear the 404 subtree cache in Plan 26-02), fall back to user-side verification in Pencil's actual editor at the calibration gate. The structural verification via `batch_get` + `snapshot_layout` remains authoritative; only the visual-aid layer is degraded.
10. **AskUserQuestion** presenting screenshots inline (or pointer-to-editor-coordinates if Tier-2 fallback) + structured token-usage description per § 4.5 format below.
11. **Options:** APPROVE / REVISE / GAP. REVISE iterates via `batch_design` Update + re-gate; GAP logs OPEN-{PHASE}-NN per § 7 template.
12. **PEN-INVENTORY extensions** per D-88: Frames Inventory row (`name`, `frame_id`, `scope: joel-only-no-crito-ref`, `joel_page_map: /<page>`, `child_section_count`, `status_counts`, `reconstruction_priority`, `open_flag_ids`) + Variant Evidence rows for each section's literal-to-semantic bindings + any OPEN flags raised at the gate.

### 4.5 AskUserQuestion format (joel-only — per D-65 + RESEARCH § Example 4)

Question template:
> *"Calibration spot-check — <page> page (joel-only-no-crito-ref branch per D-62). Does this composition use the declared tokens correctly?"*

Description structure (markdown):
```
## Calibration Spot-Check — <page> Page (Joel-Only Branch)

**Inline renders shown above:** <section A>, <section B>, ...

### Section 1: <section A name>
Fidelity label proposal: <EXACT | APPROXIMATE | STUB> per D-83

**Semantic tokens consumed:**
- <property>: <semantic-token-name> (<resolved-value>)
- ...

### Section 2: <section B name>
... same shape ...

### Calibration target (D-62 joel-only branch):
`_Tokens & Foundations` reference frame `RpGbe` shows the canonical visual register for these tokens. Are the section compositions using them correctly?

**Description identifiers (D-64 — inline only per OPEN-23-01, NOT disk-written):**
- <phase>-<page>-<section>--token-usage.png
- ...
```

Options:
- "APPROVE — all sections use tokens correctly; fidelity labels per D-83 as proposed"
- "REVISE — token mismatch (free-text describe)"
- "GAP — composition reveals a missing token (raise OPEN-{PHASE}-NN; specify the gap)"

### 4.6 Description identifier convention (joel-only)

`<phase>-<page>-<section>--token-usage.png` — example: `26-faq-qa-section--token-usage.png`, `26-404-message-section--token-usage.png`. **IDENTIFIER ONLY**, NOT a writable path. See § 6 below for the inline-screenshot substitution per OPEN-23-01.

## 5. VALID-01 Per-Section Labels (D-83 reading)

Fidelity labels attach to **sections**, not whole pages. The calibration AskUserQuestion proposes per-section labels; user confirms or adjusts at the gate.

**Label vocabulary** (D-63 — branch-specific semantics, but the words are shared):
- **EXACT** (semantics depend on branch — see § 3.2 / § 4.2)
- **APPROXIMATE** (semantics depend on branch — see § 3.2 / § 4.2)
- **STUB** (semantics shared across branches — placeholder content; layout-frame in place)

Do not invent new fidelity vocabulary. The 3-tier system is sufficient and was confirmed in production by Plans 26-01 + 26-02 across 9 distinct sections.

**Mixed-fidelity pages are honest.** Plan 26-01 FAQ shipped 5 sections with 3 distinct fidelity labels:
- Section/Header: EXACT (Phase 25 shipped)
- page-intro: APPROXIMATE (new brand-neutral subhead authored at calibration)
- qa-list: EXACT (real verbatim Q+A content + correct token usage)
- Section/CTA: STUB (microcopy placeholder per D-82)
- Section/Footer: EXACT (Phase 25 shipped)

Plan 26-02 404 shipped 4 sections with 2 distinct fidelity labels (one section uses the LAYOUT/TEXT split):
- Section/Header: EXACT
- message-section: LAYOUT=EXACT / TEXT=STUB (the split is recommended when layout binds tokens correctly but the copy is placeholder)
- Section/NavBack: EXACT (Plan 26-00 default labels match the 404's structural targets — pure ref instance with no descendants override)
- Section/Footer: EXACT

The LAYOUT/TEXT split per D-83 is encouraged when a section's structural frame correctly binds tokens but the content strings are placeholder; this is the cleanest way to document a section that ships its layout EXACT and its copy STUB.

## 6. VALID-02 Calibration Artifact Substitution (RESEARCH § Pitfall 1 + § Focus 4 + OPEN-23-01)

### 6.1 Inline-only screenshot pattern

`mcp__pencil__get_screenshot` returns inline image content via the MCP image-content protocol — it does NOT save to disk. This was confirmed across Phase 23, 24, 25, and 26 — and re-confirmed in Plan 26-01 Task 6 + Plan 26-02 Task 5.

**`mcp__pencil__export_nodes` is broken for `.pen` files** (MCP error -32603). OPEN-23-01 substitution mechanism: structural JSON (`id-inventory.json`) for archival in lieu of pixel exports.

### 6.2 D-64 description identifiers

The filename conventions documented at § 3.5 (`<phase>-<page>-<section>--side-by-side.png`) and § 4.6 (`<phase>-<page>-<section>--token-usage.png`) are **DESCRIPTION IDENTIFIERS** for the AskUserQuestion gate, NOT writable paths. They appear in the AskUserQuestion description block to anchor the screenshot in conversation but are never written to the filesystem.

This is the most-misread part of the protocol; document it explicitly per RESEARCH § Pitfall 1.

### 6.3 ui-reviews/ directory carry-forward

`.planning/ui-reviews/v2.0/` directory may exist for milestone-level UI review artifacts. **Phase 26 contributes NO files to it.** Subsequent per-page phases follow the same inline-only convention. Archival path for milestone-close (Phase 32) may attempt `export_nodes` again (test if Pencil's fix lands) OR continue the `id-inventory.json` snapshot substitution per Phase 23 D-19 precedent.

### 6.4 OPEN-26-02 — stale-cache get_screenshot quirk

Newly-created subtrees in the active Pencil MCP session sometimes return blank-white from `get_screenshot`. **Tier-1 workaround:** cross-row position Update on the page frame clears the stale render cache (worked for FAQ Plan 26-01). **Tier-2 workaround:** if Tier-1 fails (same-row Updates didn't clear the 404 subtree in Plan 26-02), fall back to user-side editor verification at the calibration gate. Structural verification via `batch_get` + `snapshot_layout` remains authoritative.

## 7. VALID-03 Gap Declaration Template (D-09 + D-68)

Format per OPEN flag (matches Phase 23 OPEN-23-NN structure):

```
OPEN-{PHASE}-{NN}: {one-line gap description}
- category: {token | source-attribution | tooling | source-coverage | variant | slot | minor | notable | blocking}
- severity: {minor | notable | blocking}
- surfaced by: {plan-id, task-name}
- affected artifact: {file-path or pen-node-id}
- description: {multi-sentence detail — repeat the gap, why it's a gap, how it surfaced, what's blocked, what's not blocked}
- consumer_phase: {phase number(s) where resolution is expected — re-pointing is allowed per D-70 / D-73}
- resolution: {which future phase + why} OR {user decision needed} OR {already-resolved citation}
```

### 7.1 Re-pointing is allowed

OPEN flags can be **re-pointed** to a different consumer phase if the original consumer phase declines them. Example: OPEN-23-11 (prose-link / prose-list / prose-inline-code) was re-pointed from Phase 26 (FAQ + 404) to Phase 28 (Blog) per D-70 + D-73 — because FAQ Q+A items are plain prose paragraphs (no embedded links or lists), the FAQ + 404 reconstruction did not need to resolve prose-link / prose-list / prose-inline-code; Phase 28 Blog reconstruction does.

### 7.2 Examples from Phase 26

- **OPEN-26-01:** heading-2 size interpolation-derived (Plan 26-00 Option A per D-72 — Crito .fig unreadable; interpolated between heading-1 size 48 and body size 16). Plan 26-01 Q+A list APPROVED at calibration; visual rhythm reads coherent. Consumer phase 28 (Blog post hierarchy) is the higher-confidence verifier with agency-prose headline hierarchy.
- **OPEN-26-02:** `get_screenshot` stale-cache for newly-created subtree (Plan 26-01 Task 5; refined Plan 26-02 Task 4). Per-subtree, not per-session. Tier-1/Tier-2 workarounds codified in § 4.4 step 9 + § 6.4 above.

## 8. Cross-Cutting Constraints

- **Desktop-only (PAGE-09):** All v2.0 page-frame reconstruction is at 1440 outer × inner-content-width 1200. Mobile-breakpoint frames deferred to a later milestone. Repeated here for clarity per D-68.
- **PAGE-11 applicability:** ACTIVE on the `crito-source-present` branch ONLY. INERT on the `joel-only-no-crito-ref` branch (no raster exists to remove). Cross-reference PEN-INVENTORY's PAGE-11 INERT note added by Plan 26-02 Task 6.
- **Pre-flight active-editor (D-87):** Every Pencil-mutating call gets a fresh `get_editor_state` assertion. Carry-forward from Phase 23 OPEN-23-14 → Phase 24 D-35 → Phase 25 D-54 → Phase 26 D-87. The pre-flight is a habit, not a one-time check; run it before EVERY `batch_design` mutation.
- **PEN-INVENTORY extension pattern (D-88):** Every plan that mutates `.pen` adds a Frames Inventory row (for new page frames) + Variant Evidence rows (for every literal property bound to a semantic token per OPEN-23-13 dual-track) + any OPEN flags surfaced at the calibration gate.
- **Single-file strategy (PROJECT.md):** Everything in `design/Crito.pen` — page frames at document root; library components inside `_Components / <Primitives | Compounds | Sections>` parent frames; tokens & foundations reference inside `_Tokens & Foundations` (`RpGbe`).

## 9. Per-Page Phase Consumer Map

Source-branch decisions per page (RESEARCH § Source-Branch Decision Tree codified):

| Phase | Page | Branch | Crito source / target | Notes |
|---|---|---|---|---|
| 26-01 | FAQ | joel-only | (none) | First per-page reconstruction in v2.0. Shipped 2026-06-07. |
| 26-02 | 404 | joel-only | (none) | Second per-page reconstruction. Shipped 2026-06-07. |
| 27 | Thank-you | joel-only | (none) | Phase 27 starts here. |
| 27 | Contact | crito-source | `cl8tt` (09_Contact, **flat-raster** sub-case) | Form interaction reconstructed from `Primitive / Input` (Phase 24 nwJk7) + `Primitive / Button / Default` (M7eUr); flat-raster PAGE-11 ACTIVE — hide raster after reconstruction. |
| 28 | Blog index | crito-source | `DzqTm` (07_Blog, flat-raster) | Card-grid composition using `Compound / Card` (t40xct, Phase 25). |
| 28 | Blog post | crito-source | `w1m3x` (08_Blog Details, flat-raster) | Long-form prose layout; first richer-typography consumer of `type-semantic-prose-paragraph-*`; OPEN-23-11 resolution candidate. |
| 28 | Blog tag-page | joel-only | (none) | Optional Phase 28 deliverable; same Card-grid composition narrowed by tag. |
| 29 | Projects index | joel-only | (none) | Card-grid composition; reuses Phase 28 Blog index pattern. |
| 29 | Project detail | joel-only | (none) | Case-study layout; may instance new section components if patterns emerge. |
| 30 | Design system | joel-only | (none) | Self-documentation page; instances every Phase 23-26 component for review. |
| 31 | Homepage | crito-source | `ujMLJ` (Home Page, **editable Crito frame**) | Most complex consumer. May instance multiple Section/CTA + Section/Header overrides. |

**Note on `04_About`, `05_Service`, `06_Service Details`:** These are `IN-SCOPE token-mining-only` per D-07. NOT reconstructed in v2.0 (Joel's About + Services live inside the Homepage reconstruction at Phase 31). Token mining already complete per Phase 23 audit.

## 10. Codify-What-Worked — Phase 26 Retrospective

Brief retrospective on what worked in Plans 26-01 + 26-02 that should be replicated in Phases 27-31:

### 10.1 Section/CTA + Section/NavBack as Phase 26 additions to g9oRa5
Plan 26-00 shipped two new reusable section components to `_Components / Sections` (g9oRa5) — `Section / CTA` (Hs5rc, 3-slot general-purpose) + `Section / NavBack` (N1jo3i, 2-slot narrow-purpose for 404 only). The pattern (identify a section need → add a reusable component to `g9oRa5` → consume in the per-page phase) is a clean model for future per-page phases that surface new section-component needs.

### 10.2 heading-2 source-derivation via AskUserQuestion gate
Plan 26-00 Task 1 used an AskUserQuestion gate to surface the heading-2 source-derivation dilemma (Crito .fig unreadable per RESEARCH § Focus 3 zipped binary). User picked Option A (interpolation default). Pattern: when a token's source-derived value is blocked, surface the dilemma via AskUserQuestion with explicit Option A / Option B framings rather than guess. Same pattern available for Phase 28 heading-3/-4/-5/-6 if Blog post hierarchy surfaces those needs.

### 10.3 Single calibration gate per plan; multiple sections in one description
Plan 26-01 + Plan 26-02 both used a single AskUserQuestion at plan close with a structured description covering all per-section fidelity proposals + token-usage bindings. Phase 25 carry-forward. Cleaner than multiple gates per plan because the user gets the whole page composition in one decision.

### 10.4 FindEmptySpace `nodeId` anchor pattern (Plan 26-02 contribution)
Plan 26-01 noted the row-mismatch when `FindEmptySpace` was called without an anchor (chose library row y = −11711 instead of page-frame row y = −4111). Plan 26-02 used `nodeId: <previous-reconstructed-page-id>` and the function correctly placed the new page in the page-frame row. **Default placement protocol for Phases 27-31:** pass `nodeId: <previous-reconstructed-page-id>` (e.g., 404 frame `csXky` for Phase 27 Thank-you) as the `FindEmptySpace` anchor.

### 10.5 PAGE-11 INERT carve-out for joel-only branch
The cleanest single-line rule of the protocol. PAGE-11 ACTIVE on crito-source branch only. INERT on joel-only branch. Plan 26-02 Task 6 added the explicit PAGE-11 INERT note to PEN-INVENTORY's Frames Inventory — re-read that note for the carve-out wording verbatim.

### 10.6 OPEN-26-02 stale-cache workaround tiering
Plan 26-01 cleared the FAQ-subtree stale cache via a cross-row position Update. Plan 26-02 same-row Update did NOT clear the 404-subtree cache, but `batch_get` + `snapshot_layout` confirmed the design was structurally correct — user verified visually in Pencil's editor at the calibration gate. **Tier-1 / Tier-2 workaround tiering** is codified in § 4.4 step 9 + § 6.4 above. Future per-page phases should follow the same fallback path if the screenshot pipeline misbehaves.

### 10.7 Pure-ref instance pattern (Plan 26-02 contribution)
Plan 26-02 Task 3 inserted Section/NavBack as a **pure ref instance** with NO descendants override because the Plan 26-00 default placeholder labels (heading "Find what you need" + links Home / Blog / Projects / Contact) already matched the 404's desired EXACT structural labels per D-79 + Claude's Discretion. Pattern: when a section component's defaults match a consumer's needs, instance it without overrides. Documents the binding implicitly via the component's default.

### 10.8 fit_content height + clip:false for page frames (Plan 26-02 contribution)
Plan 26-02 Task 4 switched the 404 page frame from a fixed `height: 1000` estimate to `height: "fit_content"` after the structural build was complete. The `fit_content` height is more flexible than a fixed estimate and avoids future structural-edit complications. Pattern: ship the page frame with `placeholder: true` + fixed height during build; clear placeholder + switch to fit_content at Task 4 (the snapshot/screenshot task).

---

*Established: Phase 26 (2026-06-07) — Plan 26-03 codify-what-worked per D-67.*
*Inherited by: Phases 27 / 28 / 29 / 30 / 31.*
*Substitutions: per OPEN-23-01 inline-screenshot pattern; structural JSON archival in lieu of `export_nodes`.*
