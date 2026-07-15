---
phase: 33
plan: 02
subsystem: ci-quality-gate
tags: [lighthouse-ci, lighthouse, mobile, desktop, github-actions, quality-gate]
requirements: [FOUND-04]

dependency_graph:
  requires: []
  provides:
    - Multi-URL Lighthouse CI net (landing + blog post) on desktop and mobile
    - lcp-lazy-loaded and prioritize-lcp-image audits re-enabled as warnings
    - lighthouserc-mobile.json with Lighthouse default mobile emulation
  affects:
    - Phase 38: Showcase page — add /showcase/ URL to both Lighthouse configs when route is built
    - Phase 41: Remove render-blocking-insight/render-blocking-resources "off" overrides after Google Fonts removed

tech_stack:
  added: []
  patterns:
    - Two sequential treosh/lighthouse-ci-action@v12 steps in deploy.yml (desktop + mobile)
    - Separate lighthouserc-mobile.json with no settings.preset for Lighthouse default mobile emulation

key_files:
  created:
    - lighthouserc-mobile.json
  modified:
    - lighthouserc.json
    - .github/workflows/deploy.yml

decisions:
  - id: D-LH-01
    decision: Blog slug im-pivoting used (only post in dist/blog/)
    rationale: getting-started-with-automation does not exist in current build; im-pivoting is the only real slug
    outcome: Both Lighthouse configs test http://localhost/blog/im-pivoting/
  - id: D-LH-02
    decision: showcase URL deferred to Phase 38 (not added as active URL)
    rationale: /showcase/ route does not exist until Phase 38; plan explicitly excludes it; _comment added to configs noting Phase 38 activation
    outcome: 2-URL list only; no 404 risk in CI
  - id: D-LH-03
    decision: lcp-lazy-loaded and prioritize-lcp-image set to warn (not error)
    rationale: Blog post slug.astro line 89 has loading="lazy" on featured image LCP; these audits will trigger; fix deferred to Phase 38; warn surfaces the issue without blocking CI
    outcome: Warnings visible in CI reports; not blocking

metrics:
  duration: 2m
  completed: 2026-07-15
---

# Phase 33 Plan 02: Lighthouse CI Quality Gate Expansion Summary

**One-liner:** FOUND-04 quality gate — Lighthouse CI now tests landing + blog/im-pivoting/ on both desktop (lighthouserc.json) and mobile (lighthouserc-mobile.json), with lcp-lazy-loaded/prioritize-lcp-image re-enabled as warnings.

## What Was Built

Expanded the Lighthouse CI configuration to cover multiple URLs and both form factors before any page migration begins:

1. **lighthouserc.json (expanded desktop config):**
   - `collect.url` expanded from `["http://localhost/"]` to `["http://localhost/", "http://localhost/blog/im-pivoting/"]`
   - `lcp-lazy-loaded` changed from `"off"` to `"warn"`
   - `prioritize-lcp-image` changed from `"off"` to `"warn"`
   - `_comment` key added noting /showcase/ activates in Phase 38
   - All threshold assertions (`categories:performance` error 0.9, etc.) byte-for-byte unchanged
   - `settings.preset: "desktop"` unchanged
   - `render-blocking-insight` and `render-blocking-resources` remain `"off"` (Google Fonts until Phase 41)

2. **lighthouserc-mobile.json (new mobile config):**
   - Identical to updated `lighthouserc.json` except no `settings` block (Lighthouse defaults to Moto G4 mobile emulation)
   - Same 2-URL list, same assert block with identical thresholds and audit settings
   - Same `upload.target: temporary-public-storage`

3. **.github/workflows/deploy.yml:**
   - Added "Run Lighthouse CI (mobile)" step immediately after the existing desktop step and before "Upload build artifact"
   - Uses `treosh/lighthouse-ci-action@v12` (same pinned version, no new action)
   - `configPath: './lighthouserc-mobile.json'`, matching field order and indentation of desktop step

## Verification Results

| Check | Result |
|-------|--------|
| `lighthouserc.json` parses as valid JSON | PASS |
| `lighthouserc-mobile.json` parses as valid JSON | PASS |
| `lcp-lazy-loaded: "warn"` in both configs | PASS |
| `prioritize-lcp-image: "warn"` in both configs | PASS |
| `render-blocking-insight: "off"` in both configs | PASS |
| `render-blocking-resources: "off"` in both configs | PASS |
| `lighthouserc.json` has exactly 2 URLs (landing + blog) | PASS |
| `lighthouserc-mobile.json` has no `settings` block | PASS |
| `deploy.yml` has exactly 2 `treosh/lighthouse-ci-action@v12` steps | PASS |
| Mobile step references `lighthouserc-mobile.json` | PASS |
| `npm run build` succeeds (16 pages) | PASS |

## Blog Slug Discovery

Built the site with `npm run build` and inspected `dist/blog/`:
- Found: `im-pivoting/`
- Expected `getting-started-with-automation` — does not exist in current content
- Used `im-pivoting` as the real slug in both Lighthouse configs

## Deviations from Plan

None — plan executed exactly as written. The only adaptation was using `im-pivoting` as the blog slug (the plan noted to prefer `getting-started-with-automation` but use "whichever directory actually exists").

## Next Phase Readiness

- Phase 38: When /showcase/ route is built, add `http://localhost/showcase/` to both Lighthouse config URL arrays. The `_comment` in both files marks this.
- Phase 41: When Google Fonts removed, delete `"render-blocking-insight": "off"` and `"render-blocking-resources": "off"` from both configs.

## Commits

| Hash | Task | Description |
|------|------|-------------|
| d3793a4 | Task 1 | feat(33-02): expand lighthouserc.json to 2 URLs with LCP audits re-enabled |
| 329659c | Task 2 | feat(33-02): add lighthouserc-mobile.json and mobile Lighthouse CI step |
