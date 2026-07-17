---
phase: 37
slug: landing-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-16
---

# Phase 37 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.x (@axe-core/playwright) + node scripts |
| **Config file** | `playwright.config.ts` |
| **Quick run command** | `npm run build && node scripts/check-contrast.mjs` |
| **Full suite command** | `npm run build && node scripts/check-contrast.mjs && npm run test:a11y` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build && node scripts/check-contrast.mjs`
- **After every plan wave:** Run `npm run build && node scripts/check-contrast.mjs && npm run test:a11y`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| *(filled by planner — one row per task)* | | | PAGE-01, CONT-02, IA-03, IA-04 | — | external Calendly link uses `rel="noopener"` | build/a11y/contrast | see gates below | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Gates (from 37-RESEARCH.md ## Validation Architecture):**

1. **Contrast Gate (automated):** `node scripts/check-contrast.mjs` — PAIRS matrix extended for new landing text-on-background combinations; exit 0.
2. **Accessibility Gate (automated, durable):** `npm run test:a11y` — `tests/accessibility/landing.spec.ts` covers light + dark axe (WCAG 2.2 AA); persists after phase (unlike Phase 35/36 isolation specs).
3. **Build Cleanliness Gate (automated):** `npm run build` exits 0; grep for old neobrutalist tokens and `/#book` placeholder returns zero in `src/pages/index.astro`, `SiteHeader.astro`, `SiteFooter.astro`.
4. **Anchor Nav Functional Gate (manual):** `/#services` and `/#about` land with 64px header offset; `aria-current="location"` toggles per CONTEXT D-03 edge rules; cross-page `/showcase` → `/#services` works.
5. **Copy Gap Audit (manual, blocking):** Joel resolves `37-COPY-GAPS.md` items before fidelity gate.
6. **Fidelity Gate (manual, blocking):** 8 screenshots (390/768/1440/1920 × light/dark) vs Figma `12:2`/`117:103`; Joel approval required; approved deviations logged (derived scroll-spy active style per CONTEXT D-02).

---

## Wave 0 Requirements

- [ ] `tests/accessibility/landing.spec.ts` — durable light+dark axe spec for `/` (PAGE-01, QUAL-01 groundwork)

*Existing infrastructure (Playwright config, axe harness, check-contrast.mjs) covers everything else.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Scroll-spy active states | IA-04 | Visual scroll behavior; IntersectionObserver timing not reliably assertable in static build | Gate 4 steps above |
| Copy verbatim + gaps resolved | CONT-02 | Requires Joel's judgment on flagged gaps | Gate 5: review 37-COPY-GAPS.md |
| Figma fidelity (8 screenshots) | PAGE-01 | Human visual comparison, Joel approval | Gate 6 capture + compare steps |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 90s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
