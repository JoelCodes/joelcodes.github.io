---
phase: 26-faq-404-reconstruction-calibration-workflow-established
plan: 02
status: in-progress
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


