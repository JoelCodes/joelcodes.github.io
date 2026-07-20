# Phase 40: URL Strategy + IA Cleanup - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-20
**Phase:** 40-url-strategy-ia-cleanup
**Areas discussed:** Redirect targets, /contact destination, /thank-you handling, Dead-file cleanup scope

**Pre-discussion event:** `ROADMAP.md` was found truncated to a 23-line fragment (only Phase 39's plan list) — accidentally overwritten during Phase-39 planning (commit `7108150`). Restored the full v3.0 roadmap (phases 33–41) from the last intact version (`8daa216`), preserving Phase 39's completed-plan status, and committed as `2399dfc` before the discussion. This restored `phase_found` for Phase 40.

---

## Redirect targets

| Option | Description | Selected |
|--------|-------------|----------|
| Both → /showcase | Repoint /portfolio → /showcase, add /projects → /showcase; [slug] variants 404 (Astro limitation). Matches roadmap intent. | ✓ |
| Both → / (home) | Keep /portfolio → /, add /projects → /. All legacy project traffic to homepage. | |
| /projects→/showcase, /portfolio stays →/ | Only add /projects → /showcase; leave /portfolio → / untouched. | |

**User's choice:** Both → /showcase
**Notes:** `/showcase` is the successor surface (single `showcase.astro`, no `[slug]`). Dynamic `/projects/[slug]` + `/portfolio/[slug]` must be omitted (they 404) — Astro static mode cannot redirect a dynamic segment to a fixed URL (documented at `astro.config.mjs` line ~75, Phase 36-02 learning). `/faq`→`/` already present and correct.

---

## /contact destination

| Option | Description | Selected |
|--------|-------------|----------|
| → / home | Simplest; homepage carries Book-a-call CTAs. | |
| → Calendly BOOKING_URL | External redirect straight to booking — most direct for contact intent. | ✓ |
| → /#services | Land on services section of homepage. | |

**User's choice:** → Calendly BOOKING_URL
**Notes:** Current `/contact` → `/#contact` is a dead anchor (no `#contact` section on v3.0 homepage). `/contact` should route to the actual booking action. Destination must equal / stay in sync with `BOOKING_URL` in `src/lib/constants.ts` (currently a Calendly placeholder).

---

## /thank-you handling

| Option | Description | Selected |
|--------|-------------|----------|
| Hard-remove / 404 | Delete thank-you.astro; route 404s. Matches roadmap SC-1 literal ("removed"). | |
| Redirect → / (safety) | Delete page but add /thank-you → / for old bookmarks. | ✓ |

**User's choice:** Redirect → / (safety)
**Notes:** The only referrer (the form's success handler) is being deleted. A safety redirect is one config line and protects stale inbound links.

---

## Dead-file cleanup scope

| Option | Description | Selected |
|--------|-------------|----------|
| Delete n8n-bearing orphans | Delete ContactSection.astro, thank-you.astro, Services.astro so `grep n8n src/` = 0; defer broad sweep to Phase 41. | ✓ |
| Minimal n8n scrub only | Strip only webhook/form code, keep files. Risk: Services.astro prose keeps grep non-zero. | |
| Sweep all orphaned dead files now | Delete whole orphaned old-homepage set + other dead surfaces — overlaps Phase 41. | |

**User's choice:** Delete n8n-bearing orphans (Recommended)
**Notes:** The three files are confirmed orphaned (imported nowhere) as of this discussion; re-verify at execution. Broad legacy sweep (`ui/`, `design-system`, `test-isometric`, `component-demo`, illustrations, old-token purge, CLAUDE.md rewrite) stays in Phase 41 (CLEAN-01). Delete the dead `Services.astro` rather than carry a documented SC-4 grep exception — zero means zero.

---

## Claude's Discretion

- Redirect wiring mechanics — import `BOOKING_URL` from `src/lib/constants.ts` into `astro.config.mjs` vs hardcode-and-flag (must equal `BOOKING_URL`).
- Build-output verification method — grep `dist/` for redirect pages vs inspect `dist/` HTML.
- Orphan re-verification — `grep -rn import` confirming each deleted file is unreferenced before removal.

## Deferred Ideas

- Phase 41 legacy sweep — `src/components/ui/`, `design-system*`, `component-demo.astro`, `test-isometric.astro`, `illustrations/`; old-token purge; CLAUDE.md rewrite; root-level `design/image-import-*` cleanup.
- Real Calendly URL replacing the `BOOKING_URL` placeholder — global content task, not this phase.
- STATE.md phase-index staleness — Phases 38/39 still listed "Pending" in the STATE.md index table; housekeeping outside this phase.
