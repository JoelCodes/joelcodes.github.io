# Phase 41: Legacy Cleanup + Quality Gate - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-20
**Phase:** 41-legacy-cleanup-quality-gate
**Areas discussed:** Deletion scope, global.css purge depth, Quality-gate + QUAL-03, CLAUDE.md + design/ cleanup

---

## Deletion scope (CLEAN-01)

| Option | Description | Selected |
|--------|-------------|----------|
| Sweep all orphaned | Delete every neobrutalist artifact that is verified orphaned at execution; roadmap list is illustrative. Only interpretation where CLEAN-02 passes. | ✓ |
| Literal SC list only | Delete strictly the files named in the roadmap SC; leaves orphaned root components → CLEAN-02 grep still fails. | |
| Sweep + keep a scratch page | Sweep legacy but preserve one dev-only design-system/preview page as a wl/ reference. | |

**User's choice:** Sweep all orphaned
**Notes:** Scouting found orphaned legacy beyond the SC list (root Header/MobileNav/Hero/About/Process/ProjectCard/BlogCard, components/design-system/, flat design-system.astro + .json.ts). Orphan-before-delete re-verification required at execution (Phase 40 pattern).

---

## global.css purge depth (CLEAN-02)

| Option | Description | Selected |
|--------|-------------|----------|
| Strip to wl-only + base | Remove every old @theme token/utility no wl/ component references; keep --wl-* + genuinely-shared base; verify with build + CLEAN-02 grep. | ✓ |
| Nuke everything non-wl | Delete all non---wl-* tokens/utilities unconditionally; risks removing a base reset/primitive wl/ quietly depends on. | |
| You decide (planner) | Leave exact cut line to the planner reading global.css in full. | |

**User's choice:** Strip to wl-only + base
**Notes:** Phase 33 SC-5 deliberately kept v1/v2 tokens for coexistence; they get removed now. Confirm nothing in wl/ transitively depends on an old token before removing it.

---

## Quality-gate + QUAL-03

| Option | Description | Selected |
|--------|-------------|----------|
| Stop-and-present at QUAL-03 | Run deletions/purge/axe/Lighthouse autonomously, then HALT and present rendered-vs-Figma screenshots for Joel's sign-off; axe/Lighthouse failures block-and-report. | ✓ |
| Block-report, auto-fix a11y | Same halt, but auto-remediate axe/Lighthouse failures before reporting (risk of masking regressions). | |
| Full autonomous, defer approval | Complete everything, mark done, leave QUAL-03 as an open checklist item to approve later. | |

**User's choice:** Stop-and-present at QUAL-03
**Notes:** Hard human gate even under --chain. Landing light+dark (12:2 / 117:103) + Showcase (12:3). Milestone-shipped marker is downstream of Joel's approval, never auto-set. No silent auto-fix of gate failures.

---

## CLAUDE.md rewrite depth (CLEAN-03)

| Option | Description | Selected |
|--------|-------------|----------|
| Full accurate rewrite | Rewrite every stale section: Fraunces + Hanken Grotesk, --wl-* prefix, wl/ component set, corrected IA + directory structure. Zero wrong signals for a fresh session. | ✓ |
| Targeted section swaps | Replace only clearly-wrong blocks (fonts/tokens/components); risk of subtler stale references left. | |
| You decide (planner) | Capture intent; planner decides section scope after diffing file vs codebase. | |

**User's choice:** Full accurate rewrite
**Notes:** CLAUDE.md is currently 100% v1/v2 (Button/Card/Input/Badge, yellow/turquoise/magenta, Bricolage/DM Sans, /design-system, blog+portfolio in nav).

---

## design/ folder cleanup (CLEAN-03)

| Option | Description | Selected |
|--------|-------------|----------|
| Verify-then-delete + archive note | Confirm the 80 root image-import-* files are dupes/unreferenced, then delete; add a Crito archive note. Nothing referenced removed. | ✓ |
| Delete dupes, leave Crito silent | Delete after reference check but skip the Crito archive note. | |
| You decide (planner) | Capture intent; planner picks reference-check method and archive-note location. | |

**User's choice:** Verify-then-delete + archive note
**Notes:** ~80 root design/image-import-*.png/.jpg files. Crito artifacts kept and marked as abandoned-v2 archive, not deleted.

---

## Claude's Discretion

- Orphan re-verification method for each deletion (grep/build-based).
- The exact global.css cut line (which base/reset/typography rules survive).
- Screenshot capture + presentation mechanics for QUAL-03 (subject to standing Pencil/manual-export constraints).
- Exact axe/Lighthouse URL set + commit granularity for deletions.
- Where the Crito archive note lives (README vs inline).

## Deferred Ideas

- Dev-only wl/ preview/reference page (floated, not chosen — design-system surfaces deleted outright).
- Real Calendly BOOKING_URL (still a placeholder; global content task).
- STATE.md phase-index staleness (housekeeping, out of scope).
