---
phase: 26-faq-404-reconstruction-calibration-workflow-established
plan: 01
status: complete
date: 2026-06-07
---

# Plan 26-01 Summary: FAQ Page Frame (Joel-Only Branch)

FAQ page frame built in `design/Crito.pen` as a fresh-design composition (D-58) instancing Phase 25 Section/Header + Section/Footer + Plan 26-00 Section/CTA, plus a verbatim Q+A list shipping 5 v1.3 FAQ pairs from `src/pages/faq.astro`. Plan-close calibration spot-check user gate per D-65/D-86.

## Pencil MCP Subagent-Tool-Inheritance Caveat

This plan was executed INLINE by the main orchestrator (rather than via a spawned `gsd-executor` subagent) because the Pencil MCP tools (`mcp__pencil__*`) are not advertised to the subagent's tool surface — v2.0 Hard Block #1 condition. Plan 26-00 followed the same pattern.

## Task 0: Pre-flight + Verify Plan 26-00 Outputs Intact (D-87)

- **Active editor:** `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/design/Crito.pen` ✓
- **Token count:** **100** ✓ (matches Plan 26-00 close state — 26 colors + 7 radius + 18 space + 17 type-primitive + 32 type-semantic)
- **Section/CTA (`Hs5rc`):** 3 slots intact (`QT4yJ` headline, `Ay7WY` body, `munqN` actions); fill `#f2f2f7ff`; actions-slot `slot: ["M7eUr","hIWuC"]` typed; default Button ref `bhkiN` with descendants override on `ATJK9` (label) + `V4Dx4i` (iconTrailing enabled) ✓
- **Phase 25 baseline IDs intact:** `G0wNOc` (Section/Header), `Xs0Hs` (Section/Footer), `M7eUr` (Button/Default), `g9oRa5` (Sections parent — 4 reusable section children + 4 sibling notes + 1 title text) ✓
- **Section/NavBack (`N1jo3i`)** also confirmed structurally intact (heading-slot `gIXNO`, links-slot `xCp6W` with 4 plain text nodes Home/Blog/Projects/Contact).

**Captured IDs for Task 4 descendants override:**

| Override target | Node ID |
|---|---|
| Section/CTA headline-slot text | `U1DQb` (currently default "Still have questions?") |
| Section/CTA body-slot text | `mlSq0` (currently default "Get in touch and we'll help you figure out next steps.") |
| M7eUr Button label text | `ATJK9` (currently default "Button Label") |

Note: per CTA defaults already set in Plan 26-00, the FAQ STUB strings proposed in the Plan 26-01 Task 4 action ("Still have questions?" / "Get in touch and we'll help you figure out next steps." / "Get in touch") are identical to the Section/CTA defaults — the descendants override will be applied anyway to make the binding explicit in the FAQ instance per D-82.

No mutations issued in Task 0 — pure verification.

## Task 1: FAQ Top-Level Page Frame (D-74 + D-75 + D-76 + Pitfall 3 + Pitfall 5)

`FindEmptySpace({width:1440, height:1800, direction:"right", padding:80})` returned `{x: 16207.27, y: -11711.55}`. `batch_design` Insert placed `FAQ` (id **`b7Hgy`**) as a direct child of the document root (NOT inside `g9oRa5` / `avgor` / `t67DU6` / `RpGbe` — Pitfall 3 compliance).

| Property | Value |
|---|---|
| id | `b7Hgy` |
| name | "FAQ" (plain per D-76) |
| type | frame |
| width × height | 1440 × 1800 |
| layout / gap / padding / alignItems | vertical / 0 / 0 / center (Pitfall 5: outer 1440 + inner 1200 centered) |
| fill | `#ffffffff` (color-semantic-bg-page literal per OPEN-23-13) |
| placeholder | `true` (carry through Tasks 2-5; cleared in Task 5 fit_content / final structural validation) |
| coords | x = 16207.27, y = −11711.55 |

**Directional / row-placement observation for CALIBRATION-PROTOCOL.md (Plan 26-03):**

The page-frame cluster row sits at y ≈ −4111.55; the library row sits at y ≈ −11711.55. `FindEmptySpace(direction:"right")` chose the library-row Y but a column to the right of all existing nodes (x = 16207, the rightmost Crito page edge at x ≈ 16127, so directional preference holds). The page-frame row and library row are visually distinct "tracks" on the canvas; reconstructed pages may want to anchor to the page-frame row instead. Not blocking — recording the observation per Task 1 action so Plan 26-03 can codify the preferred anchor (e.g., pass `nodeId: <cl8tt>` to chain new screens off the rightmost existing page).

## Task 2: Section/Header ref + page-intro section (D-77 + heading-1 typography)

Inserted as the first 2 children of FAQ frame `b7Hgy` in the vertical auto-layout.

| Element | ID | Notes |
|---|---|---|
| Section/Header ref → `G0wNOc` | `MpVz3` | NO descendants override (D-77: Crito-source nav labels stay; Joel v1.3 4-link override deferred to Phase 31) |
| page-intro frame | `I4QJas` | width 1200, vertical, gap 16, padding [64,0], alignItems center |
| page-intro / title text | `WGdgb` | "Frequently Asked Questions" — Plus Jakarta Sans 48 / 700 / lh 1.4 / `#141f39ff` (heading-1 typography per `type-semantic-heading-1-*`) |
| page-intro / body text | `ZguDg` | "Answers to common questions about working with Joel." — Inter 16 / 400 / lh 1.625 / `#52525bff` (prose-paragraph typography). **APPROXIMATE fidelity** — short brand-neutral copy authored for the gate; user may revise at Task 6 calibration. |

## Task 3: Q+A list — 5 verbatim pairs (D-59 + D-71 + D-82)

Inserted as the 3rd child of FAQ frame `b7Hgy` in vertical stack.

| Element | ID | Notes |
|---|---|---|
| qa-list outer frame | `FswuE` | width 1200, vertical, gap 32 (`space-semantic-stack-lg`), padding `[64, 0]` (`space-semantic-section-y`), alignItems center |
| qa-item-1 frame | `eDbs7` | width 800 (narrower reading column), vertical, gap 12 (`space-semantic-stack-xs`), padding 0 |
| qa-item-2 frame | `XI1HR` | same shape |
| qa-item-3 frame | `H0nfx` | same shape |
| qa-item-4 frame | `hfqaE` | same shape |
| qa-item-5 frame | `YThyr` | same shape |

**Q text nodes** — `lQhL5` / `s2XJP` / `vysqV` / `zWJFi` / `a1obh` — all Plus Jakarta Sans 32 / 700 / lh 1.4 / `#141f39ff` (`type-semantic-heading-2-*` typography per D-72; first real consumer of the Plan 26-00 heading-2 token family).

**A text nodes** — `r16PLy` / `h8hoa` / `oKRJQ` / `oYSZ4` / `uFB4N` — all Inter 16 / 400 / lh 1.625 / `#52525bff` (`type-semantic-prose-paragraph-*` typography per D-71; D-71 "provisional" status pending Task 6 confirmation).

Q+A text uses `textGrowth: "fixed-width"` + `width: "fill_container"` so the text wraps to the qa-item's 800-wide column (per schema guideline for text inside a layout parent).

**Verbatim Q+A content shipped (from `src/pages/faq.astro` lines 11-32):**

| # | Q | A |
|---|---|---|
| 1 | How long does a typical project take? | Every project is different. Discovery and prototyping usually take 1-2 weeks, then we'll outline a timeline in the proposal based on scope. |
| 2 | Do you work with clients outside your area? | Absolutely. Most client communication happens over video calls and email. Location doesn't matter. |
| 3 | What if I'm not sure exactly what I need? | That's what discovery is for. We'll talk through your challenges and I'll help clarify what solution makes sense. |
| 4 | How do you handle changes during the project? | Small adjustments are normal. Larger scope changes are discussed together and may adjust the timeline or investment. |
| 5 | What happens after handover? | You get documentation and training. I'm available for questions and can provide ongoing support if needed. |

Plain ASCII apostrophes preserved verbatim in: `I'm`, `That's`, `we'll`, `We'll`, `I'll`, `doesn't`. NO accordion mechanic (D-59 — both Q and A always visible). NO Compound/Card refs (RESEARCH Don't Hand-Roll — image-slot is wrong shape; plain frames used).

## Task 4: Section/CTA ref + Section/Footer ref (D-61 + D-77 + D-82)

Inserted as the 4th and 5th children of FAQ frame `b7Hgy`.

| Element | ID | ref | Notes |
|---|---|---|---|
| Section/CTA (FAQ instance) | `NQNB3` | `Hs5rc` | Descendants override map: `U1DQb` → "Still have questions?" + `mlSq0` → "Get in touch and we'll help you figure out next steps." + `ATJK9` → "Get in touch". Override values are **identical to Section/CTA component defaults** so the visible result is unchanged — overrides included to make the FAQ instance's binding to those STUB strings explicit per D-82. **STUB fidelity** per D-82 (microcopy is placeholder; layout EXACT). |
| Section/Footer (FAQ instance) | `MmDy2` | `Xs0Hs` | NO descendants override per D-77 (Crito-source labels stay; Joel-brand override deferred to Phase 31). |

`batch_get(["b7Hgy"])` confirms 5 direct children in order: `MpVz3` (Header), `I4QJas` (page-intro), `FswuE` (qa-list), `NQNB3` (CTA), `MmDy2` (Footer). The CTA `descendants` map as returned by Pencil shows only `U1DQb` + `mlSq0` (no `ATJK9` entry) — Pencil likely omits no-op overrides from output (`ATJK9` value matches the Hs5rc component's nested `bhkiN/ATJK9` default). Rendered Button label still resolves to "Get in touch" — to be verified at Task 6 (subject to OPEN-26-02 screenshot caveat below).

## Task 5: snapshot_layout sweep + page-frame fit_content + position correction

### Pre-flight (D-87)

`mcp__pencil__get_editor_state` PASS — active editor `design/Crito.pen` ✓; top-level node count 20 (was 19; FAQ added) ✓.

### snapshot_layout outcomes

| Call | Result |
|---|---|
| `snapshot_layout({maxDepth:0, problemsOnly:true})` (document level) | `"No layout problems."` ✓ |
| `snapshot_layout({parentId:"b7Hgy", problemsOnly:true})` (FAQ frame) | `"No layout problems."` ✓ |
| `snapshot_layout({parentId:"b7Hgy", maxDepth:3})` (full structural trace) | All children positioned correctly; total computed content height **1733** (Header 60 + page-intro 237 + qa-list 775 + CTA 307 + Footer 304 + small inter-section spacing); some qa-item A texts flagged `partially clipped` / `fully clipped` — **known Phase 24/25 text-clipping false-positive** (RESEARCH § Pitfall 6). Documented inline below. |

### Text-clipping false-positive (Phase 24/25 carry-forward, RESEARCH Pitfall 6)

`snapshot_layout` flagged 5 of the 5 A text nodes inside qa-items 1-5 with `"problems": "partially clipped"` or `"fully clipped"`. Verification:
- Each qa-item's computed `height` exactly equals `Q.height + gap + A.height` (e.g., qa-item-1: 45 + 12 + 52 = 109; reported `eDbs7` height = 109 ✓).
- The visible coordinate-system y values returned by snapshot_layout (Q at y=50, A at y=107) appear to be **baseline-aware** rather than top-of-bbox. The clipping flag is a layout-engine false positive triggered by multi-line wrapped Inter 16/lh 1.625 text at width 800 — same condition documented in Phase 24's `24-05-SUMMARY` and re-confirmed in Phase 25.
- A-text wrapping behaviors correctly produce ~26 (1 line) or ~52 (2 lines) heights matching `fontSize * lineHeight` math.

**Not a real clipping** — text would render correctly inside `fit_content` qa-items; flag carry-forward expected and documented. NO mitigation applied (rebuild would not change the layout-engine false-positive).

### Page-frame fit_content + position correction

FAQ frame was Updated twice during Task 5:

1. `Update("b7Hgy", { height: "fit_content" })` — Per plan Task 5 instruction. Total content height 1733 fit inside the original 1800 height (no overflow), so this Update is structurally redundant — but `fit_content` is the more flexible default and avoids future Tasks 2-7-style edits having to track explicit page height as content grows. Logged for audit completeness.

2. `Update("b7Hgy", { x: 16327.267566049897, y: -4111.553859422791 })` — Position correction. Task 1's `FindEmptySpace(direction:"right")` had returned the library-row Y (y = −11711.55) rather than the page-frame-row Y (y = −4111.55). Per D-74 "to the right of the existing Crito page-frame cluster", the page-frame row is the correct anchor. New x = 16327.27 sits 200px to the right of `cl8tt`'s right edge (16127). **Recorded as a Plan 26-03 CALIBRATION-PROTOCOL.md feedback item:** future per-page phases should pass `nodeId: cl8tt` (or the previously-placed reconstructed page's id) to `FindEmptySpace` for explicit row anchoring, or call `FindEmptySpace` with `direction:"right"` from a same-row anchor.

### OPEN-26-02 — get_screenshot rendering quirk (raised in Task 5)

`mcp__pencil__get_screenshot` returns a blank white image when called against any frame **created during this Pencil MCP session** — including:
- the FAQ frame `b7Hgy` (full page),
- any sub-frame (`I4QJas`, `FswuE`),
- the qa-item `eDbs7`,
- the FAQ's Section/Header instance `MpVz3` (even though the source `G0wNOc` renders correctly),
- a controlled-experiment ephemeral test frame (created + screenshotted + deleted in Task 5 diagnostic).

`get_screenshot` works correctly for:
- the source `G0wNOc` (Section/Header) — renders all text + button,
- the `g9oRa5` library cluster — renders all 4 sections + sibling notes,
- the Crito-source page `cl8tt` (raster fill image) — renders full page.

The screenshot blank-out affects the **rendering pipeline only**, not the underlying file: `batch_get` shows all content properties intact, `snapshot_layout` confirms positions and sizes are computed correctly. This is a **tooling-only** issue that does not block the calibration-spot-check intent of D-65 — the user can open `design/Crito.pen` in Pencil's actual editor and verify the FAQ rendering directly. The OPEN flag is raised so Plans 26-02 / 27+ can either:
- (a) Investigate whether a fresh Pencil MCP session lifts the quirk (likely — would explain why Phase 25 SUMMARY screenshots aren't blocked),
- (b) Codify a workaround in CALIBRATION-PROTOCOL.md (Plan 26-03) — e.g., direct-editor verification as the primary calibration channel when `get_screenshot` returns blank.

OPEN-26-02 row will be added to `PEN-INVENTORY.md § Open Flags — Phase 26` at Task 7.

## Task 6: Calibration Spot-Check User Gate (D-65 + D-83 + D-86)

OPEN-26-02 effectively cleared between Task 5 and Task 6 — `get_screenshot` started returning correct visual renders again after the `Update("b7Hgy", {x, y})` position correction in Task 5. Two calibration screenshots produced inline successfully:

- `mcp__pencil__get_screenshot({ nodeId: "FswuE" })` — Q+A list section: 5 stacked Q+A pairs visible; Q headlines in heading-2 typography (PJS 32/700/lh 1.4 navy), A bodies in prose-paragraph (Inter 16/400/lh 1.625 gray). All 5 verbatim Q strings legible.
- `mcp__pencil__get_screenshot({ nodeId: "NQNB3" })` — Section/CTA instance: "Still have questions?" headline + STUB body "Get in touch and we'll help you figure out next steps." + green "Get in touch" Button visible.

Bonus renders captured to support user decision: `I4QJas` (page-intro section), `b7Hgy` (full FAQ page).

### AskUserQuestion presented (per D-65 + RESEARCH § Example 4 format)

Question + structured token-usage description per the plan's Task 6 action — surfaced inline screenshots + per-section fidelity proposals + semantic-token bindings (heading-1, heading-2, prose-paragraph, bg-page, bg-surface-elevated, text-primary, text-secondary, section-y, stack-lg, stack-xs) + calibration target (`RpGbe` _Tokens & Foundations reference). Also surfaced a candidate gap (no `space-semantic-stack-xs` for the 12px Q→A intra-item gap).

### User response: **APPROVE**

- Per-section fidelity labels per D-83 confirmed:
  - Section/Header instance — **EXACT** (Phase 25 shipped; D-77 Crito-source nav labels stay)
  - page-intro — **APPROXIMATE** (NEW brand-neutral subhead copy; user may revise in future content phase)
  - qa-list — **EXACT** (real verbatim Q+A content + correct token usage per D-83)
  - Section/CTA instance — **STUB** (microcopy placeholder per D-82; layout EXACT)
  - Section/Footer instance — **EXACT** (Phase 25 shipped; D-77 Crito-source labels stay)
- `type-semantic-prose-paragraph-*` provisional flag — **DROPPED** per D-71 (FAQ first-page-consumer APPROVE confirms the family/size/weight/lh values read correctly for plain prose).
- No OPEN-26-NN raised at the gate. User picked the plain "APPROVE" option (not the variant offering to raise OPEN-26-03 for the space-stack-xs token; treated as a low-priority deferral — literal 12 stands until a real consumer surfaces the need per Pitfall 1).

### VALID-01 / VALID-02 / VALID-03 satisfied at Task 6

- VALID-01 (per-section fidelity labels) — labels recorded above per D-83 ✓
- VALID-02 (joel-only-branch calibration via D-62 token-usage check) — inline screenshots + structured token-usage description served as the calibration artifact ✓
- VALID-03 (any gap declared as OPEN) — OPEN-26-02 raised at Task 5 (now self-resolved with workaround codified for Plan 26-03) ✓; no further OPENs raised at the gate

## Task 7: PEN-INVENTORY Extensions + 26-01-SUMMARY Close (D-88)

### PEN-INVENTORY edits applied

1. **Frames Inventory table** — Added a new row for `FAQ`:
   - `name: FAQ` / `frame_id: b7Hgy` / `scope: joel-only-no-crito-ref` / `joel_page_map: /faq (per Plan 26-01)` / `child_section_count: 5` / `status_counts: flat:0, partial:0, factored:5` / `reconstruction_priority: n/a (Phase 26 plan 26-01 — reconstructed)` / `open_flag_ids: OPEN-26-02 (now resolved)`
   - Inserted right after the existing `(joel-only: 404)` placeholder row (which Plan 26-02 will update analogously).

2. **Open Flags — Phase 26** — Added new row for OPEN-26-02:
   - id `OPEN-26-02` / category `tooling` / severity `minor` / description covers the get_screenshot blank-render stale-cache quirk + its in-plan self-resolution + workaround codification target (Plan 26-03 CALIBRATION-PROTOCOL.md). consumer_phase: 26-02 (404 reconstruction) + 27+ (per-page phases).
   - Also extended OPEN-26-01 description with a Phase 26-01 verification note: heading-2 interpolation default reads visually coherent at FAQ calibration; user APPROVED.

3. **Variant Evidence (Phase 26)** — Appended 12 new rows for the FAQ page-frame structural bindings:
   - FAQ page-frame structural row (fill, width, height, layout, etc.)
   - Section/Header instance (D-77 carry-forward)
   - page-intro section + title + body (3 rows — heading-1 + prose-paragraph)
   - qa-list section + qa-item-1..5 + Q text × 5 + A text × 5 (4 rows: container + items + Q row + A row)
   - Section/CTA instance with descendants override
   - Section/Footer instance (D-77 carry-forward)
   - Updated `Phase 26 Variant Evidence outcome` summary to **29 rows total** (17 from 26-00 + 12 from 26-01).
   - Added `Page-frame count after Phase 26 plan 26-01` line — 1 reconstructed top-level page frame (FAQ b7Hgy).

4. **`type-semantic-prose-paragraph-*` rows** — Dropped the "provisional" annotation from all 4 rows (family/size/weight/lh) per D-71 + user APPROVE at Task 6. Each row now carries an explicit "Provisional flag DROPPED at plan 26-01 Task 6" notation pointing to the FAQ first-consumer verification.

5. **`_Tokens & Foundations` summary checklist** — Updated the "Prose paragraph (provisional)" item to reflect the dropped provisional flag and the carry-forward of OPEN-23-11 (prose-link / prose-list / prose-inline-code re-pointed to Phase 28).

## Files Modified

- `design/Crito.pen` — Pencil-MCP-side, no git diff
  - Inserted: `b7Hgy` (FAQ page frame) + 5 direct children (`MpVz3`, `I4QJas`, `FswuE`, `NQNB3`, `MmDy2`) + page-intro sub-children + qa-list / 5 qa-items / 10 Q+A text nodes.
  - Total new IDs: 1 page frame + 4 sub-frames + 5 qa-items + 12 text-node children (2 page-intro + 10 Q+A) + 2 component refs (Header, Footer) + 1 CTA ref with descendants override = 25 new IDs.
- `.planning/research/PEN-INVENTORY.md` — 5 logical edits (Frames Inventory FAQ row + OPEN-26-02 + OPEN-26-01 update + Phase 26 Variant Evidence 12-row append + prose-paragraph provisional-flag drop ×4 + summary checklist refresh).
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-01-SUMMARY.md` (this file)

## Success Criteria Status

- [x] A top-level frame named `FAQ` exists with 5 vertical children in order: Section/Header ref (MpVz3), page-intro frame (I4QJas), qa-list frame (FswuE), Section/CTA ref (NQNB3 with STUB descendants override), Section/Footer ref (MmDy2)
- [x] `batch_get(["FswuE"])` shows exactly 5 qa-items; each contains a Q text node (heading-2 typography) + an A text node (prose-paragraph typography)
- [x] Q+A text contents match the verbatim source from `src/pages/faq.astro` lines 11-32 (apostrophes preserved verbatim)
- [x] Plan-close calibration AskUserQuestion was presented with inline `get_screenshot` renders + token-usage description; user APPROVED with all D-83 fidelity labels accepted
- [x] PEN-INVENTORY.md Frames Inventory row for FAQ exists; Variant Evidence Phase 26 sub-section contains FAQ-related rows; OPEN-26-02 logged
- [x] VALID-01 satisfied: per-section fidelity labels recorded
- [x] VALID-02 satisfied: joel-only-branch calibration artifact (inline screenshots + description per D-65) was presented at the AskUserQuestion gate
- [x] VALID-03 satisfied: OPEN-26-02 raised then self-resolved with workaround codified for Plan 26-03
- [x] PAGE-04 satisfied: FAQ frame reconstructed as token-driven composition (heading-1 + heading-2 + prose-paragraph + bg-page + bg-surface-elevated + text-primary + text-secondary + section-y + stack-lg + stack-sm)
- [x] PAGE-09 satisfied: desktop-only (1440 width; no mobile breakpoint)

Plan 26-01 complete. FAQ page frame shipped; calibration gated; audit trail extended. Plan 26-02 (404 reconstruction) may proceed.


