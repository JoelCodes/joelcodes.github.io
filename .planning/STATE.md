---
gsd_state_version: 1.0
milestone: v3.0
milestone_name: Wavelength Rebrand
status: milestone-shipped
stopped_at: v3.0 shipped — QUAL-03 approved by Joel 2026-07-21; all 9 phases complete
last_updated: "2026-07-21T11:15:00Z"
last_activity: 2026-07-21 -- Joel approved QUAL-03 fidelity gate; v3.0 marked shipped, tagged v3.0
progress:
  total_phases: 9
  completed_phases: 9
  total_plans: 45
  completed_plans: 45
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-14)

**Core value:** Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.
**Current focus:** Phase 41 — legacy-cleanup-quality-gate

## Current Position

Phase: 41 (legacy-cleanup-quality-gate) — COMPLETE
Plan: 5 of 5 COMPLETE (41-05 QUAL-03 approved by Joel 2026-07-21)
Status: v3.0 MILESTONE SHIPPED — all 9 phases complete, tagged v3.0
Last activity: 2026-07-21 -- Joel approved QUAL-03; milestone marked shipped

```
v3.0 Progress: [████████████████████████████████████████] 9/9 phases (100%, 45/45 plans)
               33 ██ 34 ██ 35 ██ 36 ██ 37 ██ 38 ██ 39 ██ 40 ██ 41 ██
               SHIPPED — next: /gsd:complete-milestone to archive
```

## Phase Index

| Phase | Name | Requirements | Status |
|-------|------|--------------|--------|
| 33 | Token Foundation + Fonts | FOUND-01–05 | Complete |
| 34 | BaseLayout + Chrome | CHROME-01–04 | Complete |
| 35 | UI Primitives | COMP-01–02 | Complete |
| 36 | Content Components + Expandable Cards | COMP-03–05, CONT-01 | Complete |
| 37 | Landing Page | PAGE-01, CONT-02, IA-03–04 | Complete |
| 38 | Showcase + Blog Restyle | PAGE-02, PAGE-06 | Complete |
| 39 | Utility Pages + Dev-Hidden Pages | PAGE-03–05, IA-02 | Complete |
| 40 | URL Strategy + IA Cleanup | IA-01, IA-05 | Complete |
| 41 | Legacy Cleanup + Quality Gate | CLEAN-01–03, QUAL-01–03 | Complete |

## Milestone History

| Version | Name | Phases | Shipped |
|---------|------|--------|---------|
| v1.0 | MVP | 1-6 | 2026-01-27 |
| v1.1 | Design Updates | 7-11 | 2026-02-10 |
| v1.2 | Homepage Refinement | 12-16 | 2026-02-10 |
| v1.3 | Design System & Nav Cleanup | 17-22 | 2026-02-11 |
| v1.4 | Design Overhaul | (23-30 attempted) | Abandoned 2026-05-31 |
| v2.0 | Prep Crito Design File | 23-32 (all executed) | Abandoned 2026-07-14 |
| v3.0 | Wavelength Rebrand | 33-41 | — |

See `.planning/MILESTONES.md` for full milestone details.

## Performance Metrics

**Velocity:**

- Total plans completed: 147 (v1.0: 23, v1.1: 14, v1.2: 10, v1.3: 20, v2.0: 34)
- Average duration: ~1-5 min/plan (recent trend)

**By Milestone:**

| Milestone | Phases | Plans | Duration |
|-----------|--------|-------|----------|
| v1.0 MVP | 1-6 | 23 | 2 days |
| v1.1 Design Updates | 7-11 | 14 | 2 days |
| v1.2 Homepage Refinement | 12-16 | 10 | 1 day |
| v1.3 Design System & Nav | 17-22 | 20 | 2 days |
| v2.0 Prep Crito (abandoned) | 23-32 | 34 | ~2 weeks elapsed |

## Accumulated Context

### Key Decisions (v3.0)

- **Phase 34 fidelity gate 2026-07-15**: WaveMark `badge` prop pattern established — render both mark variants (bare strokes + circle-badge) in HTML, toggle via CSS `dark:hidden`/`hidden dark:block`. Zero client JS.
- **Phase 34 fidelity gate 2026-07-15**: Footer height delta (~249px vs 261px Figma) accepted as-is — browser/Figma font-engine variance, no padding adjustment.
- **Phase 34 fidelity gate 2026-07-15**: Circle-badge mark (#EAF6F3 disc, #12333B ink strokes) applies to all dark surfaces: dark-mode header AND always-dark footer. Bare strokes only on light backgrounds.
- **Milestone start 2026-07-14**: v2.0 abandoned unconsumed — Joel chose the new "Joel Shinness Solutions" Figma brand (sea-cool palette, Fraunces + Hanken Grotesk, waveform mark). The complete v2.0 record lives on unmerged branch `feature/phase-32-fidelity-sweep-handoff`.
- **Milestone start 2026-07-14**: Rebuild in place — keep Astro 5 + Tailwind 4 infra, CI, SEO, blog content; replace tokens, components, layouts, pages wholesale.
- **Milestone start 2026-07-14**: Figma file `1tg8wIPcvOVC5tPZ8pkGO2` is the design source of truth (Components page `36:5`; Landing `12:2` incl. dark `117:103`; Showcase `12:3`; Service Web `85:103`; Area Abbotsford `85:104`). Copy in the mockups is real — use verbatim.
- **Milestone start 2026-07-14**: IA — nav is Services (landing anchor) / Showcase / About (landing anchor) / Book a call (Calendly placeholder). Blog stays reachable by URL but leaves the nav. Service Web + Area Abbotsford built but dev-hidden.
- **Milestone start 2026-07-14**: Phase numbering starts at 33 (v2.0 phases 23-32 were genuinely executed, unlike v1.4).
- **Roadmap 2026-07-14**: `--wl-*` token namespace used throughout migration; old v1/v2 tokens remain alive until Phase 41 cleanup to prevent multi-page visual regressions.
- **Roadmap 2026-07-14**: Design-fidelity screenshot comparison gate enforced at every visible-UI phase (34, 35, 36, 37, 38) and as formal milestone-close approval at Phase 41. This gate was absent in v1.4.
- **Roadmap 2026-07-14**: QUAL-01/02/03 owned by Phase 41 as final gate, but enforced throughout — axe-core per component in isolation phases, Lighthouse per page in page phases, screenshot comparison per phase.
- **Roadmap 2026-07-14**: CONT-02 (verbatim copy) assigned to Phase 37 as primary owner; same discipline applies when Phase 39 builds service/area pages.
- **Roadmap 2026-07-14**: Requirements recount yielded 33 (not 29 as initially estimated in REQUIREMENTS.md); all 33 mapped.
- **Phase 36-02 2026-07-16**: Astro 5 static mode cannot redirect a dynamic segment `[param]` to a fixed URL — `'/portfolio/[slug]': '/'` raises GetStaticPathsRequired; entry must be omitted. Dynamic redirects require same-param destinations (e.g. `'/portfolio/[slug]': '/showcase/[slug]'`).
- **Phase 36-03 2026-07-16**: `thumbLabel` added to v2 projects.json schema — Figma extraction confirmed 308px gradient thumb block with per-project italic label not in UI-SPEC schema; both JSON entries carry `"chat-safety pipeline"` as D-09 placeholder.
- **Phase 36-03 2026-07-16**: Section assignment — `bakery-order-system` → `client-work`; `inventory-sync-automation` → `craft-experiments` (per Figma Showcase 12:3 section labels).
- **Phase 36-03 2026-07-16**: FAQItem is a white card (same CARD_WHITE/CARD_DARK tokens as ProjectCard) — Figma 99:14 confirmed #FFFFFF fill, radius 14px; all FAQItem contrast pairs added to gate script.
- **Phase 36-04 2026-07-16**: ::details-content animation placed in global.css (not per-component) so ProjectCard (COMP-03) and FAQItem (36-05) share one definition. interpolate-size: allow-keywords on :root for Chromium progressive enhancement; FF/Safari snap per D-07.
- **Phase 36-04 2026-07-16**: ProjectCard title: local Fraunces 22px (not .wl-heading-h3 21px). Hook: Fraunces Italic 17px ink (not accent). Both per 36-EXTRACTION.md — extraction supersedes UI-SPEC.
- **Phase 36-04 2026-07-16**: FrequencyWave stroke-linecap: butt (Figma export default, per extraction). WaveMark "round" convention overridden by extraction authority.
- **Phase 36-05 2026-07-16**: FAQItem toggle is a typographic `+` glyph (HG Regular 21px accent) rotating 45° — NOT a chevron SVG. Extraction node 99:17/99:22 is authoritative; plan text mentioning SVG was superseded.
- **Phase 36-05 2026-07-16**: FAQItem question: local Fraunces Regular 18px ink (no .wl-* class match). ::details-content animation reused from global.css (36-04) — not duplicated in component. Scoped CSS overrides global 180° rotation to 45° for the + glyph.
- **Phase 36-06 fidelity gate 2026-07-16**: Joel approved rendered ProjectCard (closed + expanded), FAQItem group, FrequencyWave on paper + sea-glass vs Figma 36:5 at 1440px, light + dark. No fidelity gaps to address. Screenshots stored at .planning/phases/36-content-components-expandable-cards/fidelity/.
- **Phase 36-06 2026-07-16**: Isolation page + axe spec treated as true temporary scaffolding — deleted in final cleanup commit after all gates passed. Fidelity screenshots are permanent gate artifacts (not deleted). Build proven clean: grep -r 'content-components' dist/ returns zero.
- **Phase 38-01 2026-07-19**: Frame 12:3 has 6 DISTINCT project cards (not duplicates) — 4 client-work (Chat Safety Pipeline, Design Systems, Service Apps for Large Teams, Your Project Here) + 2 craft-experiments (Code That Carves, Interactive Sketches). projects.json rebuilt with verbatim per-card copy.
- **Phase 38-01 2026-07-19**: Per-card detail label system — extraction confirmed 3 distinct label sets (The problem/built/result; The idea/How it works/Why I made it; A few ideas/How it starts/Book a call). Added optional problemLabel/builtLabel/resultLabel props to ProjectCard (defaults to original strings) and matching Zod fields in content.config.ts.
- **Phase 38-01 2026-07-19**: Ramp mismatches flagged for gate — h1 64px (no match), section h2 37px (no match), CTA h2 42px (no match). Built as local styles per Phase 36 precedent.
- **Phase 38-01 2026-07-19**: COPY GAP — "Your Project Here" card third detail section ("Book a call" label I52:650;41:92) has no body text in Figma. `result` field omitted; gate decides link treatment.
- **Phase 38-01 2026-07-19**: SiteFooter has ungated /showcase link (footer was not in plan scope for 38-01). Carry to Phase 39/40 IA cleanup.
- **Phase 38-05 2026-07-19**: `.wl-prose` h2 34px/26px@390 and blockquote 22px/19px@390 are LOCAL sizes per approved frames 211:5/211:6 (no ramp match); blockquote left bar is 3px (frame-recorded, supersedes UI-SPEC's 4px placeholder). h3 defaults to ramp 21px, h4 local 18px (no frame authority — flag at gate).
- **Phase 38-05 2026-07-19**: expressive-code `styleOverrides.frameBackground` does not exist in 0.41.6 — frame chrome must use nested `frames.editorTabBarBackground`/`terminalTitlebarBackground`/`terminalBackground`. Chosen chrome: code bg #E6F1F1/#123640, frame bg #D2E7E7/#0C2228 — all pairs measured AA (10.12:1–12.91:1). Syntax token colors kept from base github themes.
- **Phase 38-05 2026-07-19**: BlogCard click target = whole-entry link (article > block a, LinkCard/ProjectCard precedent) — approved frame draws no per-element affordance. featuredImage/readingTime props accepted but NOT rendered (frame 211:3 entries = title + date/tags + description only). Entry hairline dividers are page-level (Plan 06), not in BlogCard.

### Lessons carried forward

- **v1.4 lesson**: Never fill design gaps with invented style — flag gaps and ask. Applies to Figma gaps (e.g. missing About/Services index pages) the same as it did to flat rasters.
- **v2.0 lesson**: Validate the design *direction* with the user before investing a milestone in design-fidelity tooling.
- **v1.4 lesson (fidelity gate)**: Every UI phase must end with a Figma-frame vs. rendered-page screenshot comparison before being marked done. This discipline was absent in v1.4 — do not skip it.

### Pending Todos

**Before deployment (carried from v1.3):**

1. Configure n8n webhook — set PUBLIC_N8N_WEBHOOK_URL environment variable (note: v3.0 removes the form; this env var will be removed from source in Phase 40)
2. Replace `BOOKING_URL` Calendly placeholder with real URL (gates all v3.0 Book-a-call CTAs)
3. Add real social links (Instagram, Substack URLs)

**v3.0 cleanup candidates (addressed in Phase 41):**

1. Delete untracked `design/image-import-*.{png,jpg}` duplicates at `design/` root (Pencil artifacts; originals tracked in `design/images/`)
2. Decide fate of `design/Crito.pen`, `design/*.fig` in the repo (archives — keep or move)

- **Phase 39-02 2026-07-20**: D-06 resolved — FrequencyWave included on 404. Single 640px text column at full viewport height feels sparse without background texture; wave placed absolutely behind content (landing hero pattern). No new SVG invented.
- **Phase 39-02 2026-07-20**: IA-02 sitemap half complete. Filter now excludes /blog, /showcase, /services/, /areas/. Trailing-slash form used per Pitfall 5.
- **Phase 39-04 2026-07-20**: /services/web + /areas/abbotsford built. Strategy A confirmed: no PROD redirect; noindex via BaseLayout head slot only. ProfessionalService JSON-LD minimal per D-04 (no address/telephone). 4 FAQ answers are [COPY GAP] — answer copy not in frame 85:103. Curly quotes in JSX body= prop require template literal syntax (not double-quoted attribute) when copy contains typographic quotes.
- **Phase 39-04 2026-07-20**: Interior page template established — Breadcrumb → Eyebrow (21px gap) → h1 (.wl-heading-h1-interior) → lead (18px gap) → CTAs, FrequencyWave absolutely positioned behind hero section. No net-new contrast pairs for these pages (all bg literals already covered in Phases 37/38).
- **Phase 41-04 2026-07-20**: PROD guard placement: `if (import.meta.env.PROD) return Astro.redirect('/')` MUST come after all import statements (not before) — esbuild ESM hoisting causes "Unterminated string literal" build error if return precedes imports. services/web and areas/abbotsford now redirect in prod (D-06 applied).
- **Phase 41-04 2026-07-20**: QUAL-01 green — axe-core 20/20 tests pass, zero violations, all pages (landing, showcase, blog index+post, 404, services/web, areas/abbotsford) in both light and dark themes. One WR-05 incomplete gradient-bg contrast check logged (not a violation).
- **Phase 41-04 2026-07-20**: QUAL-02 Lighthouse URL set landed: lighthouserc.json + lighthouserc-mobile.json now test exactly / and /404. Stale /blog/im-pivoting/ removed. CI will score these on next push to main.

- **Phase 41-05 QUAL-03 gate 2026-07-21**: Joel approved the milestone-close fidelity comparison (Landing light/dark 12:2/117:103, Showcase 12:3 closed/expanded at 1440px). This is the formal v3.0 ship approval — milestone marked shipped, tagged `v3.0`. Post-approval, the landing hero gained a JS typing rotor (commit 1a8b290), a deliberate Figma deviation logged for any future fidelity pass.

### Blockers/Concerns

None currently.

## Session Continuity

Last session: 2026-07-21T11:15:00Z
Stopped at: v3.0 SHIPPED — Joel approved QUAL-03 fidelity gate 2026-07-21; 41-05 closed, milestone marked shipped in STATE.md + ROADMAP.md, tagged v3.0 in git
Resume file: None
Next action: /gsd:complete-milestone — archive v3.0 phases and prepare for the next milestone cycle
Post-ship note: landing hero gained a JS typing rotor (commit 1a8b290) — a deliberate deviation from Figma (frames showed static "time saved"); QUAL-03 screenshots predate it but capture the identical static first frame.
