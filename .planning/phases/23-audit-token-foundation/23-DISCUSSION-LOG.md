# Phase 23: Audit + Token Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-31
**Phase:** 23-audit-token-foundation
**Areas discussed:** Dark-mode token encoding, Ground-truth source for token values, IN-SCOPE Crito frame mapping, OPEN-flag close policy, Token semantic naming convention, TOKEN-06 prose typography source, PEN-INVENTORY.md per-frame schema, Reference-frame archival location

---

## Dark-Mode Token Encoding

| Option | Description | Selected |
|--------|-------------|----------|
| Omit dark slots entirely | Single-theme tokens only. No `@light,@dark` syntax. When dark mode lands in a future milestone, dark values get designed-then-added. Matches PITFALLS O3 and TOKEN-07's spirit. | ✓ |
| Encode `@light,@dark` with dark mirroring light | Per Pencil-skill guidance, write tokens with both theme slots from day one; dark just mirrors light. Cheap retrofit later — only safe if Pencil's per-theme syntax is trivial. | |
| Decide after audit confirms cost | Defer the call until plan 23-02 after `get_variables` reveals what Pencil's per-theme syntax looks like. | |

**User's choice:** Omit dark slots entirely
**Notes:** Resolves T7 cross-research conflict in favor of PITFALLS O3 / ARCHITECTURE OQ8 over STACK / Pencil-skill guidance. Aligned with TOKEN-07 deferred status.

---

## Ground-Truth Source for Token Values

| Option | Description | Selected |
|--------|-------------|----------|
| Open Crito `.fig` in Figma desktop first | Plan 23-01 step 0: open the `.fig`, screenshot Variables panel, use those exact values. Highest fidelity. Requires Figma desktop step before audit. | |
| Pencil MCP `search_all_unique_properties` first, `.fig` as fallback | Run audit's `search_all_unique_properties` over editable `.pen` nodes first. Use `.fig` only to fill gaps. Lower friction. | ✓ |
| Both — `.fig` for color/typography, `.pen` editable nodes for spacing | Split sources by what each preserves best. | |

**User's choice:** Pencil MCP `search_all_unique_properties` first, `.fig` as fallback
**Notes:** Discovered during this discussion that the Crito `.fig` lives at `design/images/Consulting & Agency Website Template I Crito (Community).fig` (the Alliatus `.fig` at `design/` root is unrelated). Followed up with thin-coverage checkpoint policy.

### Follow-up: Thin-coverage checkpoint

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — pause and surface findings | Plan 23-01 ends with explicit checkpoint. If `search_all_unique_properties` returns thin coverage, pause before plan 23-03 writes tokens. | ✓ |
| No — proceed and flag every gap as OPEN | Whatever Pencil surfaces becomes the primitives; everything else is OPEN. Faster but risks thin foundation. | |
| Set a specific threshold | Pause only if structural coverage is below a defined bar (e.g., <5 unique colors, <3 unique font sizes). | |

**User's choice:** Yes — pause and surface findings
**Notes:** Highest-discipline option — prevents the v1.4 best-guess failure mode at the token level.

---

## IN-SCOPE Crito Frame Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| IN-SCOPE for token-mining only | Audit reads from Crito About + Service frames for token values; they are NOT reconstructed as Joel pages. Section structure feeds Phase 31 Homepage rebuild as candidates. | ✓ |
| OUT-OF-SCOPE entirely | Skip Crito About + Service at audit time. Cleanest scope but loses ground-truth source for Joel's homepage About/Services sections. | |
| IN-SCOPE + their best sections become Homepage building blocks | Treat Crito About + Service as equivalent to their analogous Crito-Homepage sections. | |

**User's choice:** IN-SCOPE for token-mining only
**Notes:** Their sections may inform Phase 31 but no commitment is made in Phase 23.

### Follow-up: `/design-system` and `/404` Joel-pages with no Crito source

| Option | Description | Selected |
|--------|-------------|----------|
| Add as Joel-specific in inventory | Tag as `joel-only — no Crito reference`. Phase 30 (design-system) and Phase 26 (404) design from Joel's needs + tokens. | ✓ |
| Find closest Crito analog | Best-effort match even if loose. Risk: forces a Crito source where none truly exists. | |
| Defer mapping decision to those phases | Phase 23 just notes "no obvious Crito frame"; Phases 26 and 30 decide later. | |

**User's choice:** Add as Joel-specific in inventory
**Notes:** Explicit absence beats forced-fit mapping.

---

## OPEN-Flag Close Policy

| Option | Description | Selected |
|--------|-------------|----------|
| OPENs don't block Phase 23 close | OPEN flags accumulate as a tracked list. Phase closes when success criteria are met. Later phases resolve OPENs; milestone close (Phase 32) gates only on critical OPENs. | ✓ |
| Token-category OPENs block; audit-category OPENs don't | Stricter on the token foundation, looser on inventory. | |
| Any OPEN blocks Phase 23 close | Highest discipline but risks stalling on minor gaps. | |

**User's choice:** OPENs don't block Phase 23 close
**Notes:** Matches PITFALLS P13 ("declare gaps") philosophy.

### Follow-up: Where OPEN flags physically live

| Option | Description | Selected |
|--------|-------------|----------|
| PEN-INVENTORY.md `## Open Flags` section | Single source of truth: categorized list with ID, category, severity, description, blocker-for-phase. Greppable, version-controlled. | ✓ |
| Both PEN-INVENTORY.md AND Pencil sticky notes in the `.pen` | Markdown for agents + visible-in-Pencil notes for human eyes. Redundant. | |
| Pencil sticky notes only | Live inside the `.pen`. Visible in Pencil but not greppable. | |

**User's choice:** PEN-INVENTORY.md `## Open Flags` section
**Notes:** Per-entry schema: `id`, `category`, `severity`, `description`, `blocker-for-phase`.

---

## Token Semantic Naming Convention

| Option | Description | Selected |
|--------|-------------|----------|
| Path-nested: `color/semantic/bg/accent`, `space/semantic/section-y` | Matches REQUIREMENTS.md TOKEN-01 example syntax. Pencil grouping intact; maps to Tailwind `--color-bg-accent` on code side. | |
| Flat-dash: `color-bg-accent`, `space-section-y`, `type-heading-1` | Simpler, no nesting. Closer to final CSS variable names. Loses Pencil's grouping in the variable picker. | ✓ |
| W3C DTCG with dot syntax | Industry-standard token spec syntax. Future-proofs for DTCG pipelines. Incongruous with rest of codebase. | |

**User's choice:** Flat-dash: `color-bg-accent`, `space-section-y`, `type-heading-1`
**Notes:** Diverges from REQUIREMENTS.md TOKEN-01 example syntax.

### Follow-up: Resolve REQUIREMENTS.md divergence

| Option | Description | Selected |
|--------|-------------|----------|
| Confirm flat-dash + update REQUIREMENTS.md TOKEN-01 | Patch TOKEN-01 examples to flat-dash when committing CONTEXT.md. Requirement stays source of truth. | ✓ |
| Go back to path-nested | Match REQUIREMENTS.md as-written. No doc patch needed. | |
| Use flat-dash but leave REQUIREMENTS.md alone | TOKEN-01 examples become illustrative-only; CONTEXT.md becomes binding spec. Drift risk. | |

**User's choice:** Confirm flat-dash + update REQUIREMENTS.md TOKEN-01
**Notes:** Update lands in same commit as CONTEXT.md.

---

## TOKEN-06 Prose Typography Source

| Option | Description | Selected |
|--------|-------------|----------|
| Crito Blog/FAQ frames only — OPEN-flag gaps | Audit Blog post + FAQ frames for prose values. Non-depicted (e.g., inline code) becomes OPEN flag resolved in Phase 28. Faithful to v2.0 discipline. | ✓ |
| Crito for visible + Joel's v1.3 prose for non-depicted | Hybrid: Crito where depicted, v1.3 prose fallback. Faster but mixes vocabularies. | |
| Defer all of TOKEN-06 to Phase 28 entirely | Phase 23 skips prose tokens. Would need to remap TOKEN-06 to Phase 28. | |

**User's choice:** Crito Blog/FAQ frames only — OPEN-flag gaps
**Notes:** Inline code styling likely OPEN-flagged for Phase 28 resolution.

---

## PEN-INVENTORY.md Per-Frame Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Full schema: name, scope, mapping, section breakdown, priority, OPEN links | Per-frame: `frame_name`, `frame_id`, `scope`, `joel_page_map`, `child_section_count`, `status_counts`, `reconstruction_priority`, `open_flag_ids`. Greppable, plan-phase friendly. | ✓ |
| Minimal: name, scope, mapping only | Faster but later phases re-walk the `.pen`. | |
| Full schema + narrative summary per page-group | Same fields + paragraph summary per group. Most useful for handoff but slowest. | |

**User's choice:** Full schema: name, scope, mapping, section breakdown, priority, OPEN links
**Notes:** Markdown formatting (one table for all frames vs. per-frame) at Claude's discretion once frame count is known.

---

## Reference-Frame Archival Location

| Option | Description | Selected |
|--------|-------------|----------|
| `.planning/research/exports/v2.0/` | Matches VALID-05 destination. Consistent location for all milestone visual artifacts. File: `tokens-foundations-23.png`. | ✓ |
| `.planning/phases/23-audit-token-foundation/artifacts/` | Phase-local. Tighter coupling to phase boundary. Phase 32 handoff walks per-phase folders. | |
| Just commit history — no PNG file | Lightest footprint. Loses ability to diff visual evolution. | |

**User's choice:** `.planning/research/exports/v2.0/`
**Notes:** Re-snaps use date-suffixed names; undated file always points to latest.

---

## Claude's Discretion

- PEN-INVENTORY.md formatting (single combined table vs. per-frame tables)
- Token primitive ramp depth — driven by what `search_all_unique_properties` returns, not invented
- Order of contents within `_Tokens & Foundations` reference frame
- Whether to use `batch_design` or `replace_all_matching_properties` for reference-frame build

## Deferred Ideas

- Token sync pipeline from `.pen` variables to CSS/Tailwind — next code milestone
- Dark-mode token values — future milestone, no pre-named slots in v2.0
- Component variant matrices beyond what Crito depicts — build on demand
- Crito About/Service as standalone Joel pages — new-milestone scope decision if ever wanted
- PEN-INVENTORY.md as queryable JSON — derive from markdown source if/when needed
