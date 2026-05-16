---
gsd_state_version: 1.0
milestone: v1.4
milestone_name: Design Overhaul
status: executing
stopped_at: Plan 25-01 complete; Plan 25-02 ready to execute
last_updated: "2026-05-16T06:05:27Z"
last_activity: 2026-05-16 -- Plan 25-01 complete (FAQ migrated to BaseLayoutV2)
progress:
  total_phases: 8
  completed_phases: 2
  total_plans: 13
  completed_plans: 12
  percent: 33
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-14)

**Core value:** Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.
**Current focus:** Phase 25 — leaf-page-migrations-faq-thank-you-404

## Current Position

Phase: 25 (leaf-page-migrations-faq-thank-you-404) — EXECUTING
Plan: 2 of 2 (ready to execute; Plan 25-01 complete)
Status: Executing Phase 25
Last activity: 2026-05-16 -- Plan 25-01 complete (FAQ migrated to BaseLayoutV2; v2-leaf-pages spec created)

Progress: [█████░░░░░] 45% (v1.4)

## Milestone History

| Version | Name | Phases | Shipped |
|---------|------|--------|---------|
| v1.0 | MVP | 1-6 | 2026-01-27 |
| v1.1 | Design Updates | 7-11 | 2026-02-10 |
| v1.2 | Homepage Refinement | 12-16 | 2026-02-10 |
| v1.3 | Design System & Nav Cleanup | 17-22 | 2026-02-11 |
| v1.4 | Design Overhaul | 23-30 | — |

See `.planning/MILESTONES.md` for full milestone details.

## Performance Metrics

**Velocity:**

- Total plans completed: 78 (v1.0: 23, v1.1: 14, v1.2: 10, v1.3: 20)
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

### Key Decisions (v1.4)

- **Roadmap 2026-05-14**: Phase 23 is gating dependency — tokens, BaseLayoutV2, HeaderV2, FooterV2 all ship together before any page migrates
- **Roadmap 2026-05-14**: Exact Crito font/palette values are MEDIUM confidence — Phase 23 must begin with Pencil MCP inspection; no @fontsource-variable/* packages named until inspection confirms them
- **Roadmap 2026-05-14**: Services page (SERV-01..04) bundled into Phase 27 with Projects — card component from Phase 24 makes the new page low-effort; risk isolation preserved by ordering after Blog
- **Roadmap 2026-05-14**: Contact reskin (Phase 28) isolated from homepage — e2e form test is a mandatory merge gate; isolating prevents form regression from homepage scope creep
- **24-01 2026-05-15**: font-medium (Tailwind built-in 500) used for Button labels over custom font-text-bold token utility — Header.astro precedent confirms built-in weight utilities are reliable; custom --font-weight-text-bold utility name unverified
- **24-01 2026-05-15**: :global(svg) inside scoped style accepted for link-variant arrow-nudge — anchored to .link-variant marker class, not a top-level is:global directive
- **24-01 2026-05-15**: No unit test written for Button.astro — presentational primitive; Wave 3 Playwright + axe-core (Plan 24-03) covers polymorphic tag and focus ring behavior
- **24-02 2026-05-15**: --shadow-md token promoted to v2/global.css @theme block (no v1 collision) — enables shadow-md Tailwind utility for elevated Card and downstream reuse in Phase 27 service cards
- **24-02 2026-05-15**: aria-describedby uses error-priority single-ref (errorId ?? helperId) — only ONE id referenced at a time; avoids orphan aria-describedby when referenced element doesn't exist (RESEARCH Pitfall 3)
- **24-02 2026-05-15**: No unit tests written for Card/Input/Badge — Wave 3 Playwright + axe-core (Plan 24-03) covers polymorphic rendering and aria wiring on /design-system page
- **24-04 2026-05-15**: Flat token endpoint shape (5 top-level keys) — no nested per-palette, no dark variants; consistent with D-16 and RESEARCH flat-semantic conclusion
- **24-04 2026-05-15**: /design-system page uses single-column layout, no sidebar nav — D-21 Claude's Discretion; sidebar deferred; simple anchor sections sufficient for reference use
- **24-04 2026-05-15**: TDD: static parse test (CJS Node script, 19 assertions) written for JSON endpoint before implementation — RED confirmed, GREEN after implementation
- **24-03 2026-05-15**: All 4 v2 primitive components were WCAG 2.2 AA compliant — color-contrast violations were in design-system.astro page markup (text-accent link at 1.8:1; opacity-70 caption at 4.1:1), not primitive components
- **24-03 2026-05-15**: text-accent (#53da74 green) must NEVER be used as text color — fails 4.5:1 WCAG AA for normal text; only valid for non-text (focus rings, button backgrounds, decorative fills)
- **24-03 2026-05-15**: opacity-* utilities must not be applied to text-text-muted at caption/small sizes — text-text-muted at 12px is at the WCAG AA contrast boundary; opacity reduces it below 4.5:1
  - **24-05 2026-05-15**: Use --max-width-* tokens (not --container-*) for max-w-{size} fix — Tailwind v4.1.18 lookup order is [--max-width, --spacing, --container]; --spacing wins over --container so container tokens alone cannot override the spacing fallback
  - **24-05 2026-05-15**: --max-width-sm/md/lg/xl/2xl declared in v2 @theme at Tailwind v4 defaults (24/28/32/36/42 rem) — no v1 collision; fixes select wrapper (max-w-sm: 16px to 384px) and Footer tagline (max-w-md: 24px to 448px)
  - **24-06 2026-05-15**: hover:-translate-y-1 (-4px) chosen over -1.5 (-6px) — smallest perceptible step above -2px threshold; stays subtle; v1 uses -8px for comparison
  - **24-06 2026-05-15**: Tailwind v4 translate utility sets CSS `translate` individual property (not `transform` matrix) — `getComputedStyle.transform` returns "none" always; must read `getComputedStyle.translate` and whitespace-split for Playwright hover assertions
  - **24-06 2026-05-15**: page.waitForTimeout(300) required after interactiveCard.hover() — CSS duration-200 transition runs async; immediate getComputedStyle read captures ~0 mid-animation; 300ms ensures full settlement
  - **24-07 2026-05-15**: --color-danger: oklch(0.50 0.22 27) baseline passes axe-core WCAG AA without ladder escalation (≈5.5:1 on white at 14px) — promotes 9th v2 color token; text-danger Tailwind utility auto-generated
  - **24-07 2026-05-15**: Modern Chromium (v105+) returns oklch(...) from getComputedStyle.color — does NOT convert to rgb(); Playwright tests asserting color values must handle both OKLCH and RGB formats with an if-branch
  - **24-07 2026-05-15**: Phase 24 is now COMPLETE — all 7 plans done, all 3 UAT gaps closed (Gap 1: max-width tokens 24-05, Gap 2: card hover 24-06, Gap 3: input error color 24-07)
  - **25-01 2026-05-16**: FAQ row padding p-md (24px) chosen over p-sm (16px) — UI-SPEC discretion confirmed; reads cleaner with 24px H3 question text
  - **25-01 2026-05-16**: ChevronDown rotation duration-200 ease-out — matches v2 Card hover transition (Card.astro line 22) for single motion vocabulary across v2 system
  - **25-01 2026-05-16**: SEO.astro globally emits a Person JSON-LD on every page — pages emitting page-specific schema (e.g. /faq emits FAQPage) produce 2 JSON-LD scripts in <head>; tests asserting on schema content MUST filter by @type, never assert global JSON-LD count
  - **25-01 2026-05-16**: Empirical finding — /thank-you and /404 axe tests pass on the v1 baseline (originally documented as expected-RED contract gate). Contract gate for Plan 25-02 is now "no regression", not "turn red into green"
  - **25-01 2026-05-16**: Centered elevated CTA Card composition LOCKED — `<Card elevated={true} class="max-w-2xl mx-auto text-center"><CardBody>...<Button variant="primary" size="md" href="/#contact">...</Button></CardBody></Card>` is the visual family for the three Phase 25 leaf pages; /thank-you and /404 reuse exactly in Plan 25-02

### Pending Todos

**Before deployment (carried from v1.3):**

1. Configure n8n webhook — set PUBLIC_N8N_WEBHOOK_URL environment variable
2. Update Calendly booking link on /thank-you page with real URL
3. Add real social links (Instagram, Substack URLs)

### Blockers/Concerns

**Phase 23 pre-condition:**

- Pencil MCP inspection of `design/Consulting & Agency Website Template I Crito (Community).pen` is required as the FIRST task of Phase 23 — do not write v2.css or install font packages before inspection completes

## Session Continuity

Last session: 2026-05-16T06:05:27Z
Stopped at: Plan 25-01 complete
Resume file: .planning/phases/25-leaf-page-migrations-faq-thank-you-404/25-02-PLAN.md
Next action: Execute Plan 25-02 (migrate /thank-you to BaseLayoutV2 + create src/pages/404.astro)
