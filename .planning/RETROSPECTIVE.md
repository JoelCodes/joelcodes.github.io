# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v3.0 — Wavelength Rebrand

**Shipped:** 2026-07-21
**Phases:** 9 (33-41) | **Plans:** 45 | **Duration:** 7 days (Jul 14-21)

### What Was Built
- Sea-cool `--wl-*` token foundation + self-hosted Fraunces/Hanken Grotesk (CLS=0), 13-style ramp, contrast gate script
- Full Wavelength chrome + a 13-component `src/components/wl/` library matching the Figma Components page
- Rebuilt landing (9 sections, 4 breakpoints, light+dark, scroll-spy), dev-gated Showcase, dev-only restyled blog
- Dev-hidden Service Web + Area Abbotsford pages (noindex + PROD redirect guards + JSON-LD), branded 404
- Legacy neobrutalist purge (components/pages/tokens/redirects/form removed), CLAUDE.md rewritten
- Quality gate: axe 20/20, Lighthouse scoped to `/`+`/404`, Joel-approved visual fidelity

### What Worked
- **Per-phase fidelity gate** (Figma-frame vs. rendered screenshot, Joel-approved) at every visible-UI phase — the exact discipline absent in the abandoned v1.4. Caught deltas early (e.g. Phase 39 empty ServiceCard icons) instead of at milestone close.
- **Extraction-artifact-first phases** (a dedicated plan that pulls Figma values before any build plan) kept components token-accurate and made "extraction supersedes UI-SPEC" an explicit, clean precedence rule.
- **`--wl-*` namespace coexisting with old tokens until the final cleanup phase** — zero multi-page visual regressions during the migration; the purge became a single verifiable grep gate at Phase 41.
- **Native-platform-first interaction budget** — `<details>`/`<summary>` + CSS `::details-content` + tiny vanilla scroll-spy covered every interaction with zero JS framework.

### What Was Inefficient
- **Verification artifact drift**: Phases 39 & 41 recorded verification in gate SUMMARY files instead of `NN-VERIFICATION.md`, and the live `REQUIREMENTS.md` traceability table went stale (P39/P41 still read "Pending" at milestone close). The milestone audit had to reconcile three sources to confirm 33/33. Cheap to avoid: update the traceability checkbox in the phase's closing commit.
- **Blog frame re-baseline** (Phase 38): blog was drafted against a mistakenly-authored design, then re-based on Joel's canonical Figma pages — a mid-phase redo that a frame-approval checkpoint *before* build would have prevented (and did, once added as 38-04).
- **QUAL-02 can't be fully closed pre-merge**: Lighthouse only scores in CI on push to main, so "≥90" stayed configured-but-unobserved at close. Structural, not a mistake — but worth stating the milestone can't self-certify that gate.

### Patterns Established
- PROD dev-gating: `if (import.meta.env.PROD) return Astro.redirect('/')` **after** imports (esbuild ESM hoisting breaks if it precedes them).
- Interior page template: Breadcrumb → Eyebrow → h1 → lead → CTAs with FrequencyWave absolutely positioned behind the hero.
- WaveMark dual-variant: render both mark forms in HTML, toggle via CSS `dark:hidden` — zero client JS for theme-aware branding.
- "Extraction supersedes UI-SPEC" — when Figma-extracted values conflict with the design contract, extraction is authoritative and the deviation is logged at the gate.

### Key Lessons
1. **Validate design *direction* before tooling investment** (carried from v2.0) — v3.0 succeeded because the Figma brand was confirmed first; v2.0 built a whole `.pen` reconstruction for a direction that was then dropped.
2. **Flag gaps, never invent** (carried from v1.4) — the 4 Service Web FAQ answers stayed as visible COPY GAP markers rather than fabricated copy. Correct call; became a tracked FUT item.
3. **Close the traceability loop in the phase, not the audit** — stale checkboxes cost reconciliation effort at milestone close.

### Cost Observations
- Model mix: predominantly Opus (planning + fidelity judgment); mechanical execution phases well-suited to cheaper tiers.
- Notable: the fidelity-gate discipline front-loaded human review into small per-phase checks, avoiding a costly big-bang review at the end.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Key Change |
|-----------|--------|------------|
| v1.0-v1.3 | 1-22 | Shipped neobrutalist site + design system + n8n contact flow |
| v1.4 | (23-30) | **Abandoned** — code from best-guess raster interpretation came out generic; no fidelity gate |
| v2.0 | 23-32 | **Abandoned** — succeeded at reconstructing Crito `.pen`, but the direction itself was dropped |
| v3.0 | 33-41 | Per-phase Figma fidelity gate + extraction-first + namespace-coexistence migration → shipped clean |

### Top Lessons (Verified Across Milestones)

1. A Figma-frame vs. rendered fidelity gate at every UI phase is the single highest-leverage practice — its absence sank v1.4, its presence carried v3.0.
2. Validate the design *direction* with the user before investing a milestone in it (v2.0 → v3.0).
3. Never fill design gaps with invented style — flag and ask (v1.4 → v3.0).

---
*Started: 2026-07-21 at v3.0 milestone close.*
