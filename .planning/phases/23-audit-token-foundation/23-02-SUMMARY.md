---
phase: 23
plan: 02
status: complete
completed: 2026-05-31
---

# Plan 23-02 Summary — Dark-Mode Omission Rationale

## What was built

Documentation-only append to `.planning/research/PEN-INVENTORY.md` recording the dark-mode token deferral as an intentional design decision (per CONTEXT D-01 + D-02; satisfies TOKEN-07).

## Section added

`## Dark-Mode Omission Rationale (TOKEN-07 + D-01)` — appended at the end of PEN-INVENTORY.md, 26 lines.

Contains:
- **Decision** — paraphrase of D-01.
- **Why this is not an oversight** — reverses the STACK.md `@light,@dark`-at-definition recommendation, cites PITFALLS O3 + TOKEN-07.
- **Forbidden token-name patterns** — explicit blacklist for `set_variables` calls in plans 23-03 / 23-04 (no `@dark`, `@light`, `-dark`, `-light` suffixes; no `{value, theme}` arrays).
- **For downstream readers** — guidance for Phase 24+ planners, the Phase 32 handoff writer, and the next code milestone.
- **Cross-reference** — D-01, D-02, TOKEN-07, RESEARCH.md `## State of the Art`, plus forward-reference to the visible note inside `_Tokens & Foundations` built by plan 23-05.

## Files modified

- **modified** `.planning/research/PEN-INVENTORY.md` (+26 lines; all 8 sections written by plan 23-01 preserved unchanged)

## Cross-references confirmed

- `D-01` mentioned 2× (decision marker + cross-reference footer).
- `TOKEN-07` mentioned 3× (heading + STACK reversal + cross-reference footer).
- `D-02` mentioned 2× (forward reference to documentation requirement + cross-reference footer).
- 6 total D-/TOKEN- cross-ref hits in the appended section per grep.

## Pencil MCP tools invoked

None. This plan is documentation-only — no Pencil interaction needed.

## Self-Check: PASSED

- ✓ `## Dark-Mode Omission Rationale (TOKEN-07 + D-01)` heading appears exactly once.
- ✓ All 8 original section headings from Plan 23-01 still present.
- ✓ Section contains all five required clauses (Decision, Why this is not an oversight, Forbidden token-name patterns, For downstream readers, Cross-reference).
- ✓ Cross-references D-01, D-02, TOKEN-07 all explicitly named (greppable).
- ✓ Section count grew from 8 → 9 (Plan 23-01 sections + new Dark-Mode section).
- ✓ File remains plain markdown (D-18) — no JSON blocks introduced.
- ✓ VAL-23-02 condition "Zero tokens carry @light,@dark or any per-theme suffix" is reinforced — Forbidden Patterns list will be the enforceable contract for plans 23-03 / 23-04.
