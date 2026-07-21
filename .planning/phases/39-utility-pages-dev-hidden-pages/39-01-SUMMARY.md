# 39-01 Summary — Draft Figma frames (Service Web + Area Abbotsford)

**Plan:** 39-01 · Wave 1 · non-autonomous (Figma write MCP, inline)
**Requirements:** PAGE-03, PAGE-04

## Outcome

Both page authorities now exist at **1440 + 390** in brand file `1tg8wIPcvOVC5tPZ8pkGO2`, ready as canonical extraction authority for Wave 3.

| Page (Figma page) | Desktop 1440 | Mobile 390 (drafted) |
|-------------------|--------------|----------------------|
| Site · Service Web (`85:103`) | `85:105` (pre-existing) | **`248:102`** 390×4781 |
| Site · Area Abbotsford (`85:104`) | `85:281` (pre-existing) | **`255:95`** 390×4614 |

## What happened (deviation from plan assumption)

The plan/CONTEXT assumed frames `85:103`/`85:104` were undrafted. Inspection found **both `1440` desktop frames already fully composed with real copy** (`85:103`/`85:104` are Figma *pages*, each already holding a complete desktop frame). Surfaced to Joel; he chose **"Draft both 390 mobiles"** — the actual remaining gap vs. the D-09 "1440 + 390" scope.

Mobile frames were produced by **cloning each finished desktop → resize 390 → reflow** to the brand mobile convention (mirrors `Landing / Mobile · 390` `22:524`): 24px gutters, text FILL to 342 column, type scale hero 61→40 / h2 50→30 / lead 21→18, multi-column card rows collapsed to vertical stacks, sections hug height, header condensed to Brand + Book-a-call, footer columns stacked. Compose-only (D-07) — no new components/tokens/type styles; mobiles inherit the desktop component instances + copy.

## Decisions honored

- **D-07** compose-only — verified no new component definitions created.
- **D-03/D-04** Abbotsford copy = SCAFFOLD (FUT-03 gates publish); **no real NAP** composed into the frame.
- **D-09** 1440 + 390 only; 768/1920 responsive in code.
- Heading hierarchy preserved (one h1, section h2, card h3).

## Draft note

`.planning/phases/39-utility-pages-dev-hidden-pages/39-FRAME-DRAFT.md` — per-section component + copy breakdown for both frames.

## Gate

Wave 2 (39-03) HARD CHECKPOINT: Joel reviews both mobiles (+ the pre-existing desktops), **⌘S to persist** (Figma-MCP save constraint), and approves before any `/services/web` or `/areas/abbotsford` code (Wave 3) is written.

## Self-Check: PASSED
- Both frames exist at 1440 + 390 · compose-only · scaffold/NAP rules honored · draft note ≥20 lines · no page code written.
