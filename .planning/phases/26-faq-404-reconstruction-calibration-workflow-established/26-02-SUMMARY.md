---
phase: 26-faq-404-reconstruction-calibration-workflow-established
plan: 02
status: complete
date: 2026-06-07
---

# Plan 26-02 Summary: 404 Page Frame (Joel-Only Branch)

404 page frame built in `design/Crito.pen` as a fresh-design composition (D-58) — Header ref + message-section (with STUB headline + STUB body per D-81) + Section/NavBack instance (with EXACT structural labels per D-79 + CONTEXT.md Claude's Discretion) + Footer ref. Plan-close calibration spot-check user gate per D-65; PAGE-11 INERT carve-out documented for joel-only-no-crito-ref branch (no Crito 404 raster exists to remove — fed forward to Plan 26-03 CALIBRATION-PROTOCOL.md branch matrix).

## Pencil MCP Subagent-Tool-Inheritance Caveat

This plan was executed INLINE by the main orchestrator, same as Plans 26-00 + 26-01, due to v2.0 Hard Block #1 (Pencil MCP tools unavailable to spawned subagents).

## Task 0: Pre-flight + Verify Prior Plan Outputs Intact (D-87)

- **Active editor:** `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/design/Crito.pen` ✓
- **Top-level nodes:** 20 ✓ (was 19 pre-FAQ; FAQ frame `b7Hgy` confirmed present)
- **Reusable components:** 14 ✓ (Plan 26-00 close state — Section/Header, Footer, CTA, NavBack all listed)
- **Token count:** Implicit pass — no `set_variables` call since Plan 26-01 close (which itself did not modify the token surface). Token surface stays at **100**.
- **Section/NavBack (`N1jo3i`):** structurally intact — heading-slot `gIXNO` (default "Find what you need" Plus Jakarta Sans 32/700/lh 1.4 navy in `GTpO3`); links-slot `xCp6W` with 4 plain text children `ISpPb` Home / `cz8Dm` Blog / `L8pGWB` Projects / `XH2fs` Contact (Inter 16/normal/lh 1.625 navy) ✓
- **FAQ page frame (`b7Hgy`):** intact at (16327.27, −4111.55), 5 direct children in expected order (MpVz3 ref → G0wNOc, I4QJas page-intro, FswuE qa-list, NQNB3 ref → Hs5rc, MmDy2 ref → Xs0Hs) ✓
- **Section/Header (`G0wNOc`)**, **Section/Footer (`Xs0Hs`)**, **`g9oRa5`** all unchanged ✓

**Critical observation for Task 3:** Section/NavBack's Plan 26-00 default placeholder labels (heading "Find what you need" + links Home / Blog / Projects / Contact) ALREADY match the EXACT structural labels the 404 page wants per CONTEXT D-79 + Claude's Discretion. The 404 NavBack instance therefore needs **NO descendants override** — pure ref-without-overrides ships the desired outcome. Documented per the plan's Task 3 explicit "if Plan 26-00 placeholders are already the desired labels, this ref needs no descendants override at all" branch.

No mutations issued in Task 0 — pure verification.

## Task 1: 404 Top-Level Page Frame (D-74 + D-75 + D-76 + Pitfall 3 + Pitfall 5)

`FindEmptySpace({width:1440, height:1000, direction:"right", padding:80, nodeId:"b7Hgy"})` returned `{x: 17847.27, y: −4111.55}`. **The `nodeId: "b7Hgy"` anchor parameter applied the Plan 26-01 Task 1 CALIBRATION-PROTOCOL.md feedback — by passing the FAQ frame's id as the anchor, `FindEmptySpace` placed the 404 frame in the same row** (y = −4111.55, the page-frame row), to the right of FAQ. The 200px lateral padding (1440 FAQ width + 80 padding ≈ 17847) and the row alignment make the FAQ + 404 reconstruction cluster a tight visual neighbor of the Crito-source page frames.

`batch_design` Insert placed `404` (id **`csXky`**) as a direct child of the document root (NOT inside library parents — Pitfall 3 compliance).

| Property | Value |
|---|---|
| id | `csXky` |
| name | "404" (plain per D-76) |
| type | frame |
| width × height | 1440 × 1000 (Pitfall 5: outer 1440 + inner 1200 centered) |
| layout / gap / padding / alignItems | vertical / 0 / 0 / center |
| fill | `#ffffffff` (color-semantic-bg-page) |
| placeholder | `true` (will be cleared in Task 4 after structural validation) |
| coords | x = 17847.27, y = −4111.55 (page-frame row, ~80px right of FAQ's right edge) |

**Page-frame-row anchor pattern confirmed:** Plan 26-01 noted the row-mismatch when `FindEmptySpace` was called without an anchor and chose the library row. Plan 26-02 used `nodeId: <previous-reconstructed-page-id>` and the function correctly placed the new page in the page-frame row. **This is the pattern Plan 26-03 CALIBRATION-PROTOCOL.md should codify as the default placement protocol** for subsequent per-page phases (27 Thank-you+Contact, 28 Blog, 29 Projects, 30 Design-system, 31 Homepage).

## Task 2: Section/Header ref + message section (D-60 + D-77 + D-81)

Inserted as the first 2 children of 404 frame `csXky`.

| Element | ID | Notes |
|---|---|---|
| Section/Header ref → `G0wNOc` | `pZReo` | NO descendants override (D-77 — Crito-source nav labels stay through Phase 30) |
| message-section frame | `SruDH` | width 1200, vertical, gap 24 (`space-semantic-stack-md`), padding `[96, 0]` (= `space-semantic-section-y` × ~1.5; generous 404 visual breathing per D-60), alignItems center |
| message-section / headline text | `t9wUlR` | content "Headline placeholder" — Plus Jakarta Sans 48 / 700 / lh 1.4 / `#141f39ff` (heading-1 typography). **STUB content per D-81** — fidelity TEXT=STUB / LAYOUT=EXACT per D-83. |
| message-section / body text | `WWABs` | content "Body placeholder — this page does not exist. Try the navigation below." — Inter 16 / 400 / lh 1.625 / `#52525bff` (prose-paragraph typography). `textAlign: center`, `textGrowth: fixed-width`, `width: 720`. **STUB content per D-81** — explicitly labeled STUB even though the placeholder line gives a structural hint; user may revise brand-voice copy at calibration gate or in a future content phase. |

## Task 3: Section/NavBack ref + Section/Footer ref (D-79 + D-77)

Inserted as the 3rd and 4th children of 404 frame `csXky`.

| Element | ID | ref | Descendants override |
|---|---|---|---|
| Section/NavBack (404 instance) | `XJtoN` | `N1jo3i` | **NONE** — Plan 26-00 default placeholder ("Find what you need" heading + 4 plain text links Home / Blog / Projects / Contact) already matches the 404's desired EXACT structural labels per CONTEXT.md Claude's Discretion + D-79. Per the plan's Task 3 documented branch: "If 26-00 placeholders are already the desired labels, this ref needs no descendants override at all." |
| Section/Footer (404 instance) | `UPHLK` | `Xs0Hs` | **NONE** per D-77 (Crito-source labels stay; Joel-brand override deferred to Phase 31). |

`batch_get(["csXky"])` confirms 4 direct children in order: `pZReo` (Header) → `SruDH` (message-section) → `XJtoN` (NavBack) → `UPHLK` (Footer). 404 page frame structurally complete.

## Task 4: snapshot_layout + fit_content + screenshot

### Pre-flight + placeholder clear + height switch

`Update("csXky", {placeholder: false, height: "fit_content"})` applied. Top-level node count grew 20 → 21 (404 frame confirmed visible at document root).

### snapshot_layout outcomes

| Call | Result |
|---|---|
| `snapshot_layout({maxDepth:0, problemsOnly:true})` (document level) | `"No layout problems."` ✓ |
| `snapshot_layout({parentId:"csXky", maxDepth:3})` (full 404 structural trace) | All 4 children positioned correctly; fit_content height = **824** (Header 60 + message-section 309 + NavBack 151 + Footer 304 + small inter-section spacing). Footer instance `UPHLK` flagged `"partially clipped"` — see false-positive note below. |

### Text-clipping false-positive carry-forward (Phase 24/25, Pitfall 6)

`UPHLK` (Section/Footer instance) reports `"problems": "partially clipped"` at the instance level. This is the Phase 24/25 layout-engine false-positive: the same `Xs0Hs` Footer renders correctly in `g9oRa5` (library cluster source) and in FAQ frame `b7Hgy` (Plan 26-01 calibration screenshot showed Footer pixels). The flag is NOT a real clipping in this instance — `UPHLK`'s computed height (304) matches the source `Xs0Hs` Footer computed height in other contexts. Per Plan 26-00 + 26-01 pattern: NO mitigation applied; quirk documented.

### OPEN-26-02 (refined — Pencil MCP screenshot stale-cache for newly-created subtree)

`get_screenshot({nodeId: "csXky"})` returned blank-white for the 404 page frame and ALL its sub-frames (`SruDH` message-section, `XJtoN` NavBack instance, `pZReo` Header instance, `UPHLK` Footer instance) and even leaf text nodes (`t9wUlR` headline). Plan 26-01 had the same blank-render quirk for FAQ frame `b7Hgy`, which cleared after a single `Update(b7Hgy, {x, y})` no-op position assignment. Plan 26-02's `csXky` did NOT clear with the same workaround — tried:

1. `Update(csXky, {x:<current>, y:<current>})` — no effect
2. `Update(SruDH, {gap:24})` — no effect (touching a child)
3. `Update(t9wUlR, {content:<same>})` — no effect (touching a leaf text)
4. `Update(csXky, {x:0, y:0})` then `Update(csXky, {x:17847, y:-4111})` — round-trip move, no effect
5. `get_editor_state` after each — no effect on render cache

**FAQ frame `b7Hgy` continues to render correctly** in this same session (re-confirmed during the workaround attempts), so the stale-cache quirk is per-subtree, not per-session. **Working theory revised:** the cache clears when the right kind of Update touches the subtree; for FAQ that was a Y-position change between two distinct rows (library row → page-frame row); for 404 the position changes were within the same row, which did not invalidate the cache. Plan 26-03 CALIBRATION-PROTOCOL.md will codify the more reliable workaround: **fall back to user-side verification in Pencil's actual editor at the calibration gate when `get_screenshot` returns blank for a newly-created frame after a same-row Update.** The structural verification via `batch_get` + `snapshot_layout` remains authoritative — only the visual-aid layer of the calibration is affected.

Task 4 done — snapshot_layout clean, fit_content active, `get_screenshot` blank-but-known-quirk; proceed to Task 5 calibration gate with structural-description-only presentation.

## Task 5: Calibration Spot-Check User Gate (D-65 + D-83 + D-86)

`get_screenshot(csXky)` stayed blank through all OPEN-26-02 workaround attempts. Calibration gate surfaced WITHOUT inline screenshots — structural-only presentation with explicit pointer to canvas coordinates (17847.27, −4111.55) for the user to inspect frame `csXky` in Pencil's actual editor.

### AskUserQuestion presented

Structural description of all 4 sections + per-section fidelity proposals per D-83 + semantic-token bindings (heading-1, heading-2, prose-paragraph, bg-page, text-primary, text-secondary, section-y, stack-md) + PAGE-11 INERT note + calibration target (`RpGbe`) + pointer to Pencil editor for visual verification.

### User response: **APPROVE** (visual check confirmed in Pencil's editor)

Per-section fidelity labels per D-83 recorded:
- Section/Header instance — **EXACT** (Phase 25 shipped; D-77 Crito-source nav labels stay)
- message-section — **LAYOUT = EXACT / TEXT = STUB** per D-83
- Section/NavBack instance — **EXACT** (Plan 26-00 defaults match; structural labels Home / Blog / Projects / Contact per D-79 + Claude's Discretion)
- Section/Footer instance — **EXACT** (Phase 25 shipped; D-77)

No new OPEN-26-NN raised at the gate beyond the refined OPEN-26-02 already documented at Task 4.

### VALID-01 / VALID-02 / VALID-03 satisfied at Task 5

- VALID-01 (per-section fidelity labels) — recorded above per D-83 ✓
- VALID-02 (joel-only-branch calibration via D-62 token-usage check) — structural description + token-usage description + user editor-side verification ✓ (visual-aid screenshot unavailable per OPEN-26-02 Tier-2 fallback; structural verification remains authoritative)
- VALID-03 (gap declaration) — OPEN-26-02 refined with per-subtree behavior documented; no further gaps surfaced ✓

## Task 6: PEN-INVENTORY Extensions + 26-02-SUMMARY Close + PAGE-11 INERT (D-88 + RESEARCH § Focus 5)

### PEN-INVENTORY edits applied

1. **Frames Inventory** — Replaced the `(joel-only: 404)` placeholder row with a proper `404` row:
   - `name: 404` / `frame_id: csXky` / `scope: joel-only-no-crito-ref` / `joel_page_map: /404 (per Plan 26-02)` / `child_section_count: 4` / `status_counts: flat:0, partial:0, factored:4` / `reconstruction_priority: n/a (Phase 26 plan 26-02 — reconstructed)` / `open_flag_ids: OPEN-26-02 (Plan 26-02 instance — stuck; user verified in Pencil editor)`
   - Inserted **above** the FAQ row in placement order (matching the 404-first → FAQ-second ordering in the original v2.0 page-frame placeholder list).
   - FAQ row note refined to clarify that the 26-01 OPEN-26-02 instance cleared after the cross-row position move.

2. **PAGE-11 status note** — Added a block right below the Frames Inventory table:
   - "INERT for both reconstructed rows above (FAQ + 404). Joel-only-no-crito-ref scope — no Crito FAQ or 404 raster exists to remove. PAGE-11 applies only to the crito-source branch (Phases 27 Thank-you+Contact / 28 Blog / 29 Projects / 30 Design-system / 31 Homepage). Plan 26-03 CALIBRATION-PROTOCOL.md documents this carve-out in the branch matrix."

3. **Open Flags — Phase 26** — Refined OPEN-26-02 description with Plan 26-02 finding:
   - Per-subtree (not per-session) stale-cache.
   - Plan 26-01 cross-row Update cleared FAQ subtree; Plan 26-02 same-row Updates did NOT clear 404 subtree.
   - Workaround codification updated to Tier-1 (cross-row Update) + Tier-2 (user-side editor verification).

4. **Variant Evidence (Phase 26)** — Appended 8 new rows for Plan 26-02 bindings:
   - 404 page frame structural (fill, layout, width, position via FindEmptySpace nodeId-anchor pattern)
   - Section/Header instance (D-77 carry-forward)
   - message-section + headline + body (3 rows)
   - Section/NavBack instance (no-override note — defaults match)
   - Section/Footer instance (D-77 carry-forward)
   - Updated `Phase 26 Variant Evidence outcome` summary line to **37 rows total** (17 from 26-00 + 12 from 26-01 + 8 from 26-02).
   - Updated `Page-frame count` line to **2 reconstructed top-level page frames** (FAQ b7Hgy + 404 csXky).

## Files Modified

- `design/Crito.pen` — Pencil-MCP-side, no git diff
  - Inserted: `csXky` (404 page frame) + 4 direct children (`pZReo`, `SruDH`, `XJtoN`, `UPHLK`) + message-section sub-children (`t9wUlR` headline, `WWABs` body).
  - Total new IDs: 1 page frame + 1 message-section + 3 component refs (Header, NavBack, Footer) + 2 message-section text-node children = **7 new IDs**.
- `.planning/research/PEN-INVENTORY.md` — 4 logical edits (Frames Inventory 404 row + PAGE-11 INERT block + OPEN-26-02 refinement + Phase 26 Variant Evidence 8-row append).
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-02-SUMMARY.md` (this file).

## Success Criteria Status

- [x] A top-level frame named `404` exists with 4 vertical children: Section/Header ref (pZReo), message-section frame (SruDH), Section/NavBack ref (XJtoN), Section/Footer ref (UPHLK)
- [x] Message section contains headline + body text nodes with STUB content (per D-81) and EXACT typography bindings (heading-1 + prose-paragraph)
- [x] Section/NavBack instance renders with 4 structural labels (Home / Blog / Projects / Contact) and "Find what you need" heading — pure ref instance with no descendants override (Plan 26-00 defaults match)
- [x] Plan-close calibration AskUserQuestion was presented with structural-description + token-usage description + PAGE-11 INERT note (visual screenshot unavailable per OPEN-26-02 Tier-2 fallback; user verified directly in Pencil's editor); user APPROVED
- [x] PEN-INVENTORY.md Frames Inventory row for 404 + Variant Evidence Phase 26 rows + PAGE-11 INERT note exist
- [x] VALID-01 satisfied (per-section labels per D-83); VALID-02 satisfied (joel-only-branch calibration via D-62 — user editor-verified); VALID-03 satisfied (OPEN-26-02 refined)
- [x] PAGE-08 satisfied (404 frame reconstructed)
- [x] PAGE-09 satisfied (desktop-only, 1440 width; no mobile breakpoint)
- [x] PAGE-11 documented as INERT (joel-only branch — no Crito raster to remove)

## Explicit PAGE-11 INERT note for Plan 26-03 CALIBRATION-PROTOCOL.md branch matrix

Plan 26-03 is responsible for codifying the **joel-only-no-crito-ref vs crito-source-present** branch matrix. From Plan 26-02:

- **joel-only-no-crito-ref branch:** PAGE-11 is INERT. No source raster exists; the per-page calibration spot-check is solely a token-usage check against `_Tokens & Foundations` (`RpGbe`). This is the branch that Plans 26-01 (FAQ) and 26-02 (404) operated on. The structural calibration is sufficient; visual calibration uses either `get_screenshot` (FAQ) or user-side Pencil editor verification (404, Tier-2 OPEN-26-02 fallback).
- **crito-source-present branch:** PAGE-11 is ACTIVE. Phases 27-31 will reconstruct pages that DO have a Crito source raster (Contact `cl8tt`, Blog `DzqTm` / `w1m3x`, Homepage `ujMLJ`, etc.). PAGE-11 requires removing the source raster ONLY AFTER the per-page calibration spot-check PASSES — the visual diff between Crito-source raster and the reconstructed composition becomes part of the calibration evidence.

Plan 26-03 should formalize this in the CALIBRATION-PROTOCOL.md branch matrix with explicit Tier-1 / Tier-2 workarounds for OPEN-26-02 (get_screenshot stale-cache) carried forward.

Plan 26-02 complete. Plan 26-03 (CALIBRATION-PROTOCOL.md) may proceed with the codify-what-worked step.


