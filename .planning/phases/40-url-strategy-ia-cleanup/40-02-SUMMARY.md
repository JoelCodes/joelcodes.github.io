# Plan 40-02 Summary — n8n/form Removal + deploy.yml Cleanup

**Phase:** 40 — URL Strategy + IA Cleanup
**Plan:** 40-02 (Wave 2)
**Requirements:** IA-01 (`/thank-you` removed clause), IA-05 (form + webhook removed)
**Status:** Complete
**Executed:** 2026-07-20 (inline sequential — Wave-1 executor stream had stalled; this plan run inline for reliability)

## Self-Check: PASSED

## What Was Built

Deleted the orphaned n8n contact-form surface and scrubbed the dead webhook secret from CI, completing IA-05 and IA-01's `/thank-you removed` clause. Ran AFTER Plan 01 confirmed the `/thank-you`→`/` redirect stub in the build (D-08), so no deletion left a hard 404.

### Task 1 — Delete three orphaned n8n/form files
- **Orphan re-verify (D-07 safety gate):** `grep -rn "ContactSection|Services|thank-you" src/` returned only the self-reference `window.location.href = '/thank-you'` inside `ContactSection.astro` itself — zero live importers. Safe to delete.
- Deleted:
  - `src/pages/thank-you.astro`
  - `src/components/homepage/ContactSection.astro` (the `hp-form` script + n8n webhook POST + `PUBLIC_N8N_WEBHOOK_URL` client read + `/thank-you` success redirect)
  - `src/components/Services.astro` (orphaned; `n8n` in body prose would have tripped SC-4)
- **SC-4 gate:** `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` → zero matches.
- Commit: `792e1e5`

### Task 2 — Remove PUBLIC_N8N_WEBHOOK_URL from deploy.yml + full suite
- Removed the `PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.PUBLIC_N8N_WEBHOOK_URL }}` line from the "Build site" step, and the now-empty `env:` mapping (kept YAML valid — Pitfall 6). GitHub repo secret left untouched (out of scope).
- Full suite green: `npm run build` exits 0 (no dead-import errors from the deletions), `npm run test:build` = 25/25 assertions, SC-4 re-confirmed post-build.
- Commit: `c5209be`

## Key Files
- Deleted: `src/pages/thank-you.astro`, `src/components/homepage/ContactSection.astro`, `src/components/Services.astro`
- Modified: `.github/workflows/deploy.yml`

## Verification
| Check | Command | Result |
|-------|---------|--------|
| thank-you deleted | `test ! -f src/pages/thank-you.astro` | PASS |
| ContactSection deleted | `test ! -f src/components/homepage/ContactSection.astro` | PASS |
| Services deleted | `test ! -f src/components/Services.astro` | PASS |
| SC-4 grep zero | `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` | PASS (0) |
| SC-3 deploy.yml scrubbed | `grep -q 'PUBLIC_N8N_WEBHOOK_URL' .github/workflows/deploy.yml` | PASS (0) |
| deploy.yml valid YAML | js-yaml parse | PASS |
| build not broken | `npm run build` | PASS (9 pages, exit 0) |
| redirect assertions | `npm run test:build` | PASS (25/25) |

## Deviations
- **Inline execution.** The Wave-1 `gsd-executor` subagent stalled on its final tracking step (stream idle watchdog) after completing and committing its substantive work. To avoid a repeat stall on this small, deterministic deletion plan, Wave 2 was executed inline by the orchestrator following the plan's tasks/acceptance criteria verbatim. All commits are atomic per task; branch stayed on `gsd/v3.0-milestone`.
- No scope drift: Phase 41 legacy surfaces (`src/components/ui/`, `design-system*`, `component-demo.astro`, `test-isometric.astro`, `illustrations/`, token purge) untouched (D-07).

## Requirements Satisfied
- **IA-05** — n8n contact form + webhook flow removed; no dead form code remains in `src/`.
- **IA-01** — `/thank-you` source removed; route safely resolves to `/` via the Wave-1 redirect stub.
