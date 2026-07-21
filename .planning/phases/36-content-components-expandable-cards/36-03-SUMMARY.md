---
phase: 36
plan: "03"
subsystem: data-schema
tags: [astro-content-collections, json-schema, contrast-gate, projects-data, cont-01]
one-liner: "v2 projects.json with id + D-09 placeholder, file() loader collection, 26 Phase 36 contrast pairs passing"

dependency-graph:
  requires: ["36-01", "36-02"]
  provides: ["getCollection('projects') typed API", "v2 projects.json schema", "Phase 36 contrast gate"]
  affects: ["36-04 (ProjectCard component build)", "Phase 38 (showcase page via getCollection)"]

tech-stack:
  added: []
  patterns:
    - "Astro file() loader for JSON arrays with explicit id field"
    - "Zod schema for build-time data validation (no runtime cost)"
    - "WCAG contrast gate extended per-component-phase discipline"

key-files:
  created: []
  modified:
    - src/data/projects.json
    - src/content.config.ts
    - scripts/check-contrast.mjs

decisions:
  - id: D-thumblabel-schema
    summary: "thumbLabel added to v2 schema — Figma thumb block not in UI-SPEC"
    detail: "36-EXTRACTION.md confirmed a 308px gradient thumb block on ProjectCard with a per-project italic label. thumbLabel (string, optional in Zod, present in JSON) joins the schema as a deviation from the original UI-SPEC which omitted the thumb block entirely."
  - id: D-section-assignment
    summary: "bakery-order-system -> client-work; inventory-sync-automation -> craft-experiments"
    detail: "Section labels from Figma Showcase (12:3): 'CLIENT WORK' and 'CRAFT & EXPERIMENTS'. Bakery (client project) maps to client-work; inventory sync (automation experiment) maps to craft-experiments."
  - id: D-faqitem-surface-confirmed
    summary: "FAQItem surface confirmed white card — all FAQItem contrast pairs added"
    detail: "36-EXTRACTION.md resolved the FAQItem surface FIDELITY-GAP: self-contained white card (#FFFFFF), radius 14px, border 1px wl-line. This allowed full FAQItem contrast pairs to be added (not deferred as comment placeholders)."

metrics:
  duration: "3 min"
  completed: "2026-07-16"
---

# Phase 36 Plan 03: v2 Data Schema + Contrast Gate Summary

## What Was Built

Promoted `projects.json` from v1 neobrutalist fields to the v2 Wavelength schema, registered it as a typed Astro content collection via the `file()` loader, and extended the contrast gate script with all Phase 36 text pairs.

**Files changed:**

- `src/data/projects.json` — v2 rewrite with `id`, `slug`, `section`, `eyebrow`, `title`, `outcome`, `summary`, `tags`, `problem`, `built`, `result`, `thumbLabel`; v1 fields dropped
- `src/content.config.ts` — added `file()` import, `projects` collection with Zod schema, extended export
- `scripts/check-contrast.mjs` — 26 new Phase 36 pairs in PHASE 36 ADDITIONS block

## Task Outcomes

### Task 1: v2 projects.json rewrite

- Two entries: `bakery-order-system` (client-work) and `inventory-sync-automation` (craft-experiments)
- `id` field equals `slug` on every entry (required by Astro `file()` loader — RESEARCH Pitfall 1)
- All 8 copy fields verbatim from Figma D-09 (Chat Safety Pipeline, nodes 41:95 / 32:1026): eyebrow, title, outcome, summary, tags, problem, built, result
- `thumbLabel: "chat-safety pipeline"` added per extraction schema addition
- Zero v1 fields remain (`category`, `categoryLabel`, `thumbnail`, `screenshots`, `testimonial`, `technologies`, `results` array, `solution`, `draft` — all dropped)
- Verification: `node -e "..."` exits 0; JSON.parse exits 0; id===slug for both entries; no v1 fields in grep

### Task 2: content.config.ts projects collection

- `import { file } from 'astro/loaders'` added alongside existing `glob`
- `projects = defineCollection({ loader: file('src/data/projects.json'), schema: z.object({...}) })`
- Schema fields: `slug`, `section` (enum), `eyebrow`, `title`, `outcome`, `summary`, `tags`, `problem`, `built`, `result`, `thumbLabel` — all optional except `title`, `slug`, `section`
- `id` NOT in schema (Astro exposes loader key as `entry.id`, not `entry.data.id` — RESEARCH Pitfall 7)
- Export extended to `{ blog, projects }`
- `npm run build` exits 0 — schema validates v2 JSON with no ContentLoaderInvalidDataError

### Task 3: check-contrast.mjs Phase 36 pairs

26 pairs added in PHASE 36 ADDITIONS block:
- ProjectCard title (22px), hook/outcome (17px italic), kicker (12px bold), toggle label (14px semibold), body/expanded prose (16px), expanded section label (16px italic) — all text pairs at 4.5:1
- FAQItem question (18px), answer (16px) — 4.5:1; toggle `+` (21px large-text) — 3:1
- Thumb label: white on gradient stops `#0E7078` (worst case 5.82:1) and `#14323B` (13.56:1) — 4.5:1
- `node scripts/check-contrast.mjs` exits 0 — Gate: PASS

## Deviations from Plan

### Upstream artifact supersedes plan detail

**thumbLabel field added to v2 schema**

- **Rule:** Upstream artifact supersedes plan detail (36-EXTRACTION.md discovered the thumb block AFTER the plan was written)
- **Found during:** Task 1 (pre-execution reading of 36-EXTRACTION.md per execution_context note)
- **Issue:** The UI-SPEC v2 schema had 9 fields; 36-EXTRACTION.md confirmed a 308px gradient thumb block on ProjectCard with a per-project italic label (`thumbLabel`). The plan referenced 9 fields but did not include `thumbLabel`.
- **Fix:** Added `thumbLabel: "chat-safety pipeline"` to both JSON entries; added `thumbLabel: z.string().optional()` to the Zod schema
- **Files modified:** `src/data/projects.json`, `src/content.config.ts`
- **Commits:** f0ab7ed, fec04f7

### FAQItem FIDELITY-GAP fully resolved — all pairs added

- **Rule:** Deviation auto-resolved from upstream artifact
- **Plan:** Task 3 noted FAQItem pairs might be comment placeholders if the FAQ surface fill was still FLAGGED
- **Resolution:** 36-EXTRACTION.md confirmed FAQItem is a self-contained white card (same `CARD_WHITE`/`CARD_DARK` tokens as ProjectCard). Full FAQItem contrast pairs were added rather than deferred.

## Authentication Gates

None.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | f0ab7ed | feat(36-03): rewrite projects.json to v2 schema with id + D-09 placeholder copy |
| Task 2 | fec04f7 | feat(36-03): register projects collection via file() loader in content.config.ts |
| Task 3 | e18b5a5 | feat(36-03): extend check-contrast.mjs with Phase 36 ProjectCard + FAQItem pairs |

## Next Phase Readiness

- Phase 38 can call `getCollection('projects')` and receive two typed v2 entries
- `entry.data.slug` is available for URL construction; `entry.id` for the loader key
- Phase 36-04 (ProjectCard component) has a passing contrast gate to build against
- `thumbLabel` field is in schema and data — Phase 36-04 can render the thumb block
