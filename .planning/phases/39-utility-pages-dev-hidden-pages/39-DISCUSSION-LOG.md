# Phase 39: Utility Pages + Dev-Hidden Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-20
**Phase:** 39-utility-pages-dev-hidden-pages
**Areas discussed:** Dev-hide strategy, Abbotsford copy status, 404 copy + decoration, Frame readiness / sequencing

---

## Dev-hide strategy

| Option | Description | Selected |
|--------|-------------|----------|
| A: Ship + noindex | Pages ship into prod build; reachable by direct URL, unlinked in nav, noindex meta + sitemap filter; JSON-LD in build output. Matches ROADMAP PAGE-03/04 + SC-2/SC-3. No prod redirect. | ✓ |
| B: Redirect out of prod | `import.meta.env.PROD` redirect to `/`; pages not in prod build, JSON-LD does not ship. Matches UI-SPEC dev-gate + Phase 38 D-01 but contradicts SC-3. | |
| Split the two pages | Different treatment per page (e.g. area ships, service redirects). | |

**User's choice:** A — Ship + noindex.
**Notes:** Requirements text resolves the conflict toward A: PAGE-03 says "unlinked in prod" (not redirected); PAGE-04's SEO purpose + SC-3's "JSON-LD present in build output" both require the page to be in the prod build. Consequence: `39-UI-SPEC.md` must be corrected to remove the `import.meta.env.PROD` redirect from the two page contracts and the Interaction Contracts table (CONTEXT D-02).

---

## Abbotsford copy status

| Option | Description | Selected |
|--------|-------------|----------|
| Placeholder scaffold | Extract frame `85:104` copy verbatim but treat as scaffold; page stays noindexed until FUT-03 confirms locally-unique copy. | ✓ |
| Final canonical copy | Frame `85:104` already holds real locally-unique copy; FUT-03 only flips noindex + adds NAP. | |

**User's choice:** Placeholder scaffold.

### ProfessionalService JSON-LD completeness

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal per UI-SPEC | name, url, areaServed "Abbotsford, BC", serviceType, provider. No address/telephone until real GBP NAP (FUT-03). | ✓ |
| Add real NAP now | Full address + telephone now — only if final GBP-consistent NAP is ready. | |

**User's choice:** Minimal per UI-SPEC.
**Notes:** Page ships to prod (Strategy A) so copy is publicly fetchable while noindexed; keeping copy as scaffold + JSON-LD minimal avoids duplicate-content / NAP-mismatch risk until FUT-03.

---

## 404 copy + decoration

| Option | Description | Selected |
|--------|-------------|----------|
| Lock the defaults now | h1 "Page not found" / lead / CTA "Back to home" accepted as final; no gate flagging. | ✓ |
| Keep as placeholder | Build with defaults, flag DERIVED at gate for revision. | |
| I'll rewrite it | User supplies different copy. | |

**User's choice:** Lock the defaults now.

### FrequencyWave on 404

| Option | Description | Selected |
|--------|-------------|----------|
| Your discretion | Build, judge at render; add if barren, omit if complete. | ✓ |
| Yes, include it | Always render FrequencyWave background. | |
| No, keep minimal | Clean single column, no decoration. | |

**User's choice:** Claude's discretion.

---

## Frame readiness / sequencing

| Option | Description | Selected |
|--------|-------------|----------|
| Fully designed, ready to extract | Both frames complete; extract → build → gate, no drafting checkpoint (Phase 37 pattern). | |
| Need drafting first | One/both frames are stubs; add Figma drafting + approval checkpoint before build (Phase 38 D-05–D-08 pattern). | ✓ |
| Not sure — verify them | Inspect frames via figma-desktop MCP during research first. | |

**User's choice:** Need drafting first.

### Draft flow

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts, you approve | Claude composes `85:103`/`85:104` in brand Figma via MCP; Joel reviews/approves; hard checkpoint gates build. | ✓ |
| You draft, then Claude builds | Joel designs both frames; Claude waits, then extracts + builds. | |

**User's choice:** Claude drafts, Joel approves.

### Draft scope

| Option | Description | Selected |
|--------|-------------|----------|
| 1440 + 390, 404 parallel | Dedicated frames at 1440 + 390; 768/1920 responsive; 404 builds in parallel with drafting. | ✓ |
| All four breakpoints | Dedicated frames at 390/768/1440/1920; 404 still parallel. | |
| Everything after approval | Draft 1440+390, hold 404 build too; all building in one post-approval wave. | |

**User's choice:** 1440 + 390, 404 parallel.

---

## Claude's Discretion

- noindex wiring pattern (SEO.astro `noindex` prop vs BaseLayout head-slot meta) — planner decides.
- FrequencyWave inclusion on 404 — judged at render.
- Figma MCP drafting mechanics (frame placement/naming; light-only draft + derived dark).
- Fidelity-gate screenshot mechanics (manual PNG export; `export_nodes` broken; figma-desktop MCP for extraction).

## Deferred Ideas

- FUT-03 — Publish `/areas/abbotsford` (locally-unique copy + GBP-consistent NAP + flip noindex/sitemap/nav).
- FUT-04 — Additional service pages (Automations, AI) on the Service Web template.
- FUT-05 — Blog back into public nav.
- Nav "Services" dropdown / active state on `/services/web` — out of scope; nav unchanged.
