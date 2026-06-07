---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Prep Crito Design File
status: executing
stopped_at: Phase 27 context gathered
last_updated: "2026-06-07T23:50:47.111Z"
last_activity: 2026-06-07 -- Phase 27 planning complete
progress:
  total_phases: 10
  completed_phases: 4
  total_plans: 20
  completed_plans: 17
  percent: 40
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-31)

**Core value:** Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.
**Current focus:** Phase 26 — faq-404-reconstruction-calibration-workflow-established

## Current Position

Phase: 26 — COMPLETE (4/4 plans shipped)
Plan: 4 of 4 (Plan 26-03 CALIBRATION-PROTOCOL.md closed)
Status: Ready to execute
Last activity: 2026-06-07 -- Phase 27 planning complete

Progress: [████░░░░░░] 40% (v2.0 — 4/10 phases complete)

## Milestone History

| Version | Name | Phases | Shipped |
|---------|------|--------|---------|
| v1.0 | MVP | 1-6 | 2026-01-27 |
| v1.1 | Design Updates | 7-11 | 2026-02-10 |
| v1.2 | Homepage Refinement | 12-16 | 2026-02-10 |
| v1.3 | Design System & Nav Cleanup | 17-22 | 2026-02-11 |
| v1.4 | Design Overhaul | (23-30 attempted) | Abandoned 2026-05-31 |
| v2.0 | Prep Crito Design File | 23-32 | — |

See `.planning/MILESTONES.md` for full milestone details.

## Performance Metrics

**Velocity:**

- Total plans completed: 76 (v1.0: 23, v1.1: 14, v1.2: 10, v1.3: 20)
- Average duration: ~1-5 min/plan (recent trend)
- Total execution time: ~5 days across 4 milestones

**By Milestone:**

| Milestone | Phases | Plans | Duration |
|-----------|--------|-------|----------|
| v1.0 MVP | 1-6 | 23 | 2 days |
| v1.1 Design Updates | 7-11 | 14 | 2 days |
| v1.2 Homepage Refinement | 12-16 | 10 | 1 day |
| v1.3 Design System & Nav | 17-22 | 20 | 2 days |

*Updated after each plan completion*

## Accumulated Context

### Key Decisions (v2.0)

- **Roadmap 2026-05-31**: v2.0 spans Phases 23-32 (10 phases). Phase 23 = Audit + Token Foundation; 24 = Layout Primitives + Primitive Components; 25 = Section + Compound Components; 26-31 = per-page reconstruction (FAQ + 404 first, Homepage last) with per-section calibration as definition-of-done; 32 = Fidelity Sweep + Handoff
- **Roadmap 2026-05-31**: Per-section calibration (VALID-01 + VALID-02) is mandatory definition-of-done inside every per-page phase — NOT deferred to a final QA pass (reversing this discipline is exactly how v1.4 failed)
- **Roadmap 2026-05-31**: Variables-first non-negotiable — Phase 23 audit + token foundation MUST land before any component or page work; Phase 23 first concrete task is a live Pencil MCP audit (`get_editor_state(include_schema: true)` → `get_guidelines` → `batch_get` → `search_all_unique_properties` → `get_variables`); audit output may invalidate inference-only recommendations from the research summary
- **Roadmap 2026-05-31**: Single-file strategy — everything lives in `design/Crito.pen` (reverses v1.4 Decision 4 to split into `design/design-system.pen`); library frames at top of canvas with `_` prefix
- **Roadmap 2026-05-31**: Desktop only for v2.0 — mobile-breakpoint reconstruction explicitly deferred to a later milestone (PAGE-09)
- **Milestone start 2026-05-31**: v2.0 is Pencil-MCP-centric — focus is reconstructing the Crito `.pen` file (recreating flat raster sections as editable components with proper tokens) before any code work resumes
- **Milestone start 2026-05-31**: Phase numbering continues from 23 — v1.4 phase numbers freed up since nothing v1.4 actually shipped
- **Lesson from v1.4 abandonment**: Building code from a flat-image .pen produces generic-looking results because typography, spacing, and component structure get guessed; v2.0 fixes the .pen first so downstream code has high-fidelity ground truth

### Key Decisions (carried from v1.4 lessons)

- **Roadmap 2026-05-14**: Exact Crito font/palette values are MEDIUM confidence — Pencil MCP inspection of the original Crito source is the source of truth; do not name packages or token values before inspection confirms them
- **Roadmap 2026-05-14**: Crito reference `.pen` contains 15 page frames but originally zero reusable components (Figma → Pen conversion flattened them) — recreating them is the entire v2.0 deliverable

### Pending Todos

**Open questions surfaced by the roadmap (resolve during Phase 23):**

1. Dark-mode token slots — encode `@light,@dark` now (with dark mirroring light) or defer entirely? Decision made in Phase 23 plan 23-02 with the user, recorded in PEN-INVENTORY.md
2. Crito `.fig` accessibility — confirm whether the original `.fig` opens cleanly and exposes variables as ground truth for token values (filename ambiguity: design folder contains both an Alliatus-named and a Crito-named `.fig` per PITFALLS research)
3. OPEN-flag policy — does each OPEN block phase close, or does milestone close gate only on critical-category OPENs? Recommendation: OPENs do not block phase close; resolve during Phase 23 with user

**Before deployment (carried from v1.3):**

1. Configure n8n webhook — set PUBLIC_N8N_WEBHOOK_URL environment variable
2. Update Calendly booking link on /thank-you page with real URL
3. Add real social links (Instagram, Substack URLs)

### Blockers/Concerns

None currently. Phase 23 first plan (the live Pencil MCP audit) is the gating dependency for everything that follows; if Pencil MCP tools turn out to be unavailable to the executing agent, the milestone cannot proceed (flagged as Hard Block #1 in research SUMMARY).

## Session Continuity

Last session: 2026-06-07T23:05:26.986Z
Stopped at: Phase 27 context gathered
Resume file: .planning/phases/27-thank-you-contact-reconstruction/27-CONTEXT.md
Next action: `/gsd:plan-phase 27` to plan Phase 27 (Thank-you + Contact Reconstruction)
