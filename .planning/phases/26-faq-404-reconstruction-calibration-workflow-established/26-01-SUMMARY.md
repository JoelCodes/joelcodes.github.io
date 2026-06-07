---
phase: 26-faq-404-reconstruction-calibration-workflow-established
plan: 01
status: in-progress
date: 2026-06-06
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

`batch_get(["b7Hgy"])` confirms 5 direct children in order: `MpVz3` (Header), `I4QJas` (page-intro), `FswuE` (qa-list), `NQNB3` (CTA), `MmDy2` (Footer). The CTA `descendants` map as returned by Pencil shows only `U1DQb` + `mlSq0` (no `ATJK9` entry) — Pencil likely omits no-op overrides from output (`ATJK9` value matches the Hs5rc component's nested `bhkiN/ATJK9` default). Rendered Button label still resolves to "Get in touch" — verified visually at Task 5 screenshot.


