# Roadmap: Joel Shinness Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-6 (shipped 2026-01-27)
- ✅ **v1.1 Design Updates** — Phases 7-11 (shipped 2026-02-10)
- ✅ **v1.2 Homepage Refinement** — Phases 12-16 (shipped 2026-02-10)
- ✅ **v1.3 Design System & Navigation Cleanup** — Phases 17-22 (shipped 2026-02-11)
- ❌ **v1.4 Design Overhaul** — Abandoned 2026-05-31 (no code shipped; phase numbers 23-30 returned to pool)
- ❌ **v2.0 Prep Crito Design File** — Phases 23-32, all executed; Abandoned 2026-07-14 (direction pivot — output never consumed)
- 🚧 **v3.0 Wavelength Rebrand** — Phases 33-41 (active)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-6) — SHIPPED 2026-01-27</summary>

Complete lead-generation focused portfolio website with responsive design, blog platform, portfolio showcase, contact form, and Lighthouse 90+ performance.

See: `.planning/milestones/v1.0-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.1 Design Updates (Phases 7-11) — SHIPPED 2026-02-10</summary>

Distinctive neobrutalist design transformation with narrative homepage, WCAG 2.2 AA accessibility compliance.

See: `.planning/milestones/v1.1-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.2 Homepage Refinement (Phases 12-16) — SHIPPED 2026-02-10</summary>

Enhanced homepage sections with outcome-focused messaging, isometric illustrations, and improved FAQ discoverability.

See: `.planning/milestones/v1.2-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.3 Design System & Navigation Cleanup (Phases 17-22) — SHIPPED 2026-02-11</summary>

Consolidated design system into reference page, achieved 100% component consistency, streamlined navigation, enhanced contact form for lead generation.

See: `.planning/milestones/v1.3-ROADMAP.md` for full details.

</details>

<details>
<summary>❌ v1.4 Design Overhaul — ABANDONED 2026-05-31 (no code shipped)</summary>

**Status:** Abandoned. Both attempted foundation phases reverted. Root cause: code authored from best-guess interpretations of mostly-flat raster sections in the Crito `.pen` file came out generic.

See `.planning/MILESTONES.md` "v1.4 Design Overhaul (Abandoned)" for the full post-mortem.

</details>

<details>
<summary>❌ v2.0 Prep Crito Design File (Phases 23-32) — ABANDONED 2026-07-14 (executed, unconsumed)</summary>

**Status:** Abandoned after completion. All 10 phases (23-32) executed and verified — `design/Crito.pen` fully reconstructed (107 tokens, 32 components, 10 page frames, zero raw values) with milestone audit at 39/39 deliverables. The design *direction* was then dropped: Joel chose the new "Joel Shinness Solutions" Figma brand before any code milestone consumed the Crito work.

**Archive:** Unmerged branch `feature/phase-32-fidelity-sweep-handoff` holds the complete record (phases 26-32 execution, exports, `v2.0-HANDOFF.md`). Main carries the record through Phase 31 planning. Planning artifacts archived to `.planning/milestones/v2.0-*` and `.planning/milestones/v2.0-research/`.

**Phase numbers 23-32 stay consumed** — v3.0 starts at Phase 33.

See `.planning/MILESTONES.md` "v2.0 Prep Crito Design File (Abandoned)" for details.

</details>

### 🚧 v3.0 Wavelength Rebrand (Phases 33-41, Active)

**Milestone goal:** Rebuild the site in place to the "Joel Shinness Solutions" Figma brand — sea-cool palette, Fraunces + Hanken Grotesk, waveform mark, new Landing/Showcase IA with light + dark themes — replacing the neobrutalist design entirely while keeping the Astro/Tailwind infrastructure, CI, SEO plumbing, and blog content.

**Design source of truth:** Figma `1tg8wIPcvOVC5tPZ8pkGO2` (see PROJECT.md for node map).

**Design-fidelity discipline:** Every phase that produces visible UI ends with a Figma-frame vs. rendered-page screenshot comparison before the phase is marked done. This is the checkpoint that was absent in v1.4 and contributed to its abandonment. The comparison is not optional review — it is a required phase gate.

**Cross-cutting quality gates (QUAL-01 / QUAL-02 / QUAL-03):** These three requirements are owned by Phase 41 as the final milestone gate. However, they are enforced throughout: every component phase verifies axe-core zero violations in isolation; every page phase verifies Lighthouse CI does not regress; the visual fidelity screenshot comparison (QUAL-03) is performed at Phases 37 and 38 as in-phase checkpoints, then formally approved at Phase 41 close.

---

#### Phase 33: Token Foundation + Fonts

**Goal:** Every downstream component has correct, Figma-extracted token values and self-hosted variable fonts to build against — with zero fidelity gaps and zero Lighthouse CLS regression.

**Dependencies:** None (first phase).

**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05

**Success Criteria:**

1. `src/styles/global.css` contains a `@theme` block with all eight `--wl-*` palette tokens (Ink / Sub / Accent / Accent-soft / Sea-glass / Sea-glass-deep / Paper / Line) in both light and dark variants, every value traceable to a Figma variable — no invented values.
2. Fraunces (upright + italic, `opsz`/`wght` variable axes) and Hanken Grotesk (weight variable) load from self-hosted `@fontsource-variable` packages; Lighthouse CLS = 0 on the homepage after the font phase.
3. A WCAG AA contrast check passes for every text-use token pair in both themes before any component is authored.
4. `lighthouserc.json` tests landing, showcase, and one blog post URL (mobile + desktop); `lcp-lazy-loaded` and `prioritize-lcp-image` audits are re-enabled.
5. Waveform mark, favicon, and OG-image assets are exported from Figma and wired into `BaseLayout.astro` / `SEO.astro`; existing v1/v2 tokens remain in `@theme` untouched (namespace isolation via `--wl-` prefix).

**Plans:** 6/6 plans complete

Plans:
**Wave 1**

- [x] 33-01-PLAN.md — Figma extraction artifact (palette, type ramp, waveform SVG, OG tagline) [manual/Figma]
- [x] 33-02-PLAN.md — Lighthouse CI expansion (landing + blog, mobile + desktop, re-enable LCP audits)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 33-03-PLAN.md — WCAG AA contrast gate script + accent-soft-text companion (TDD)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 33-04-PLAN.md — --wl-* @theme tokens (light + dark) + body base default

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 33-05-PLAN.md — Self-hosted fonts (fontsource + Fontaine CLS=0) + 13-style type ramp

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 33-06-PLAN.md — Brand assets: WaveMark, favicon, OG image (approval-gated) [manual/approval]

---

#### Phase 34: BaseLayout + Chrome

**Goal:** Every page in the site has the correct Wavelength header, footer, and dark-mode infrastructure — without FOUC or transition flash on load.

**Dependencies:** Phase 33 (tokens must exist before chrome can use them).

**Requirements:** CHROME-01, CHROME-02, CHROME-03, CHROME-04

**Plans:** 6/6 plans complete

Plans:
**Wave 1**

- [x] 34-01-PLAN.md — Rewrite dark-mode a11y spec to colorScheme contexts (Wave 0 prerequisite)
- [x] 34-02-PLAN.md — global.css chrome tokens (--wl-on-ink, footer locals) + six .wl-* utilities + 64px scroll offset
- [x] 34-03-PLAN.md — Blog prod-exclusion (D-13) + /faq → / redirect (D-03 subset) + delete faq.astro

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 34-04-PLAN.md — SiteHeader.astro + SiteFooter.astro (Figma chrome, zero JS)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 34-05-PLAN.md — BaseLayout wiring + system-only FOUC script + full a11y suite

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 34-06-PLAN.md — Figma-vs-rendered fidelity gate (non-autonomous, Joel approval)

**Success Criteria** (amended per 34-CONTEXT.md — amendments supersede original wording):

1. Opening any page in a dark-OS browser produces no flash of light-theme content; the FOUC-prevention `<script is:inline>` remains in `<head>` before `<body>`. (System-only via `prefers-color-scheme` — D-05/D-06.)
2. The site header displays the waveform mark, wordmark, and nav links (Services / Showcase / About / Book a call) on desktop. ~~theme toggle functional in both header states~~ — AMENDED: no visible theme toggle ships this phase (D-05; CHROME-01 toggle deferred).
3. ~~Mobile navigation opens/closes correctly~~ — AMENDED: no mobile menu; the Figma mobile bar is literal (mark + Showcase + CTA, D-01). All chrome links keyboard-reachable and screen-reader correct — zero axe-core violations at 390px (CHROME-04).
4. The site footer displays tagline, nav links, contact email, and copyright at all breakpoints. ~~/blog link present in DOM, not in mobile overlay~~ — AMENDED: Blog link gated to dev builds only (D-11); blog pages excluded from prod builds entirely (D-13); there is no mobile overlay.
5. Figma-frame vs. rendered screenshot comparison for SiteHeader (desktop + mobile) and SiteFooter approved before phase is marked done.

**Adjacent changes absorbed this phase:** `/faq` → `/` redirect ships now; `/projects` → `/showcase` deferred to Phase 38 and `/projects/[slug]` to Phase 40 (D-03 sequencing, files still exist). Blog gated out of prod builds + sitemap (D-13).

---

#### Phase 35: UI Primitives

**Goal:** All atomic UI components from the Figma Components page (`36:5`) are built, token-correct, accessible in isolation, and ready for content components to import.

**Dependencies:** Phase 33 (tokens), Phase 34 (BaseLayout for dev isolation page).

**Requirements:** COMP-01, COMP-02

**Success Criteria:**

1. `CTAButton.astro` renders all four Figma variants (Solid / Ghost / Ghost-on-dark / Small) including calendar and mail icon slots; all variants pass axe-core with zero violations and meet WCAG AA contrast in both themes.
2. Each supporting primitive (Eyebrow, Tag, Callout, LinkCard, Breadcrumb, Step) exists as an individual Astro component using only `--wl-*` tokens; zero references to old neobrutalist token names appear in new component files.
3. All primitives are exercised on a temporary dev isolation page that is deleted before the phase branch is merged; the dev page is not reachable in production.
4. Figma-frame vs. rendered screenshot comparison for the Components page primitives block approved before phase is marked done.

**Plans:** 4/4 plans complete

Plans:
**Wave 1**

- [x] 35-01-PLAN.md — Figma extraction artifact (all FIDELITY-GAP values) + contrast-script pairs [figma-desktop MCP]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 35-02-PLAN.md — CTAButton (4 variants + calendar/mail icons) + Eyebrow + SiteHeader CTA retrofit
- [x] 35-03-PLAN.md — Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard primitives

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 35-04-PLAN.md — Dev isolation page + axe spec + Figma fidelity gate (Joel approval) + deletion

---

#### Phase 36: Content Components + Expandable Cards

**Goal:** All domain-specific components (project cards, service cards, FAQ, wave background) are built and verified — including expand/collapse interactions — so page assembly phases have a complete component library to draw from.

**Dependencies:** Phase 35 (primitives must exist before content components import them).

**Requirements:** COMP-03, COMP-04, COMP-05, CONT-01

**Success Criteria:**

1. `ProjectCard.astro` renders closed and expanded states using native `<details>`/`<summary>`; the expanded story content (problem / built / result) is in the DOM when collapsed (for SEO indexing) and animated open/close via CSS `::details-content`; zero axe-core violations.
2. `FAQItem.astro` uses native `<details>` with exclusive-open behavior; keyboard navigation cycles through all FAQ items without a mouse; zero axe-core violations.
3. The five-line frequency-field wave SVG renders correctly in both light and dark themes using `var(--wl-*)` stroke tokens; the SVG is inline (not `<img src>`), so CSS variables resolve at render time.
4. `projects.json` is promoted to v2 schema carrying eyebrow, title, outcome line, summary, tags, and expanded problem/built/result story — populated verbatim from the Figma Showcase frames, not invented.
5. Figma-frame vs. rendered screenshot comparison for ProjectCard (closed + expanded) and FAQItem approved before phase is marked done.

---

#### Phase 37: Landing Page

**Goal:** The primary conversion surface — the landing page — matches all four Figma breakpoints in both light and dark themes, with verbatim Figma copy and all anchor sections wired for nav.

**Dependencies:** Phase 36 (all components available); Phase 34 (chrome wrapping page).

**Requirements:** PAGE-01, CONT-02, IA-03, IA-04

**Success Criteria:**

1. `/` renders all nine Figma sections (Hero, Who, Three-ways `#services`, How-it-works, Automations, Proof, About `#about`, Agencies, Final CTA) with copy sourced verbatim from Figma frames `12:2` (light) and `117:103` (dark); any Figma copy gap is flagged to Joel, not filled with invented text.
2. All Book-a-call CTAs resolve to a single `BOOKING_URL` constant (Calendly placeholder); email CTAs use `mailto:me@joelshinness.com`.
3. Anchor nav active states update correctly as the user scrolls through `#services` and `#about`; the cross-page link `/showcase` → `/#services` lands on the correct section with header offset applied.
4. The inline waveform SVG renders correctly in both themes (stroke color adapts via `var(--wl-*)` token); no contrast violations in either theme.
5. Figma-frame vs. rendered screenshot comparison for Landing light (`12:2`) and Landing dark (`117:103`) at all four breakpoints (390 / 768 / 1440 / 1920) approved before phase is marked done.

*Note: CONT-02 covers verbatim copy for all pages (landing, service, area). It is owned here because the landing page is the primary copy surface; the same discipline applies when Phase 39 assembles the service and area pages.*

**Plans:** 5/5 plans complete

Plans:
**Wave 1**

- [x] 37-01-PLAN.md — Figma extraction artifact (all landing FIDELITY-GAPs: section geometry, copy, backgrounds, FAQ/dark/FrequencyWave resolutions) [figma-desktop MCP]

**Wave 2** *(no Figma dependency — parallel-eligible with Wave 1)*

- [x] 37-02-PLAN.md — Shared constants module + CTAButton target/rel + SiteHeader scroll-spy/aria-current + SiteFooter constants (IA-03, IA-04)

**Wave 3** *(blocked on 37-01 + 37-02)*

- [x] 37-03-PLAN.md — index.astro sections 1–6 (Hero, Who, Three-ways #services, How-it-works, Automations, Proof) + copy-gap log + contrast script (PAGE-01, CONT-02)

**Wave 4** *(blocked on 37-03 — shares index.astro)*

- [x] 37-04-PLAN.md — index.astro sections 7–9 + FAQ if present (About #about, Agencies, Final CTA) + durable landing axe spec (PAGE-01, CONT-02, IA-04)

**Wave 5** *(blocked on 37-04)*

- [x] 37-05-PLAN.md — Manual gates: anchor-nav functional + copy-gap audit + fidelity gate, 8 screenshots, Joel approval [non-autonomous]

---

#### Phase 38: Showcase Page + Blog Restyle

**Goal:** The Showcase page delivers the full project-card experience and the blog is restyled to the new brand — both without touching blog URLs or breaking existing post SEO.

**Dependencies:** Phase 36 (ProjectCard, BlogCard components); Phase 34 (chrome).

**Requirements:** PAGE-02, PAGE-06

**Success Criteria:**

1. `/showcase` displays Client Work and Craft & Experiments sections; each project renders via `ProjectCard.astro` in closed state and expands to show the full problem/built/result story; all card states match Figma frame `12:3`.
2. Blog index (`/blog`), post (`/blog/[slug]`), and tag (`/blog/tags/[tag]`) pages render in the Wavelength brand at all breakpoints; the blog is removed from the main nav but a `/blog` link is present in the footer.
3. The `loading="lazy"` bug on blog post featured images is fixed (changed to `loading="eager"` at the LCP position); Lighthouse LCP audit passes on blog post URLs.
4. Existing blog post URLs (`/blog/[slug]`) return HTTP 200 with the correct canonical; no post URL changes; all posts remain in the sitemap.
5. Figma-frame vs. rendered screenshot comparison for Showcase (`12:3`, closed and expanded card states) approved before phase is marked done.

---

#### Phase 39: Utility Pages + Dev-Hidden Pages

**Goal:** The 404 page is on brand, and the Service Web and Area Abbotsford pages are fully built but correctly hidden from production indexing.

**Dependencies:** Phase 36 (content components); Phase 34 (chrome); Phase 33 (tokens for noindex mechanism).

**Requirements:** PAGE-03, PAGE-04, PAGE-05, IA-02

**Success Criteria:**

1. `/404` renders a branded not-found page using Wavelength tokens and chrome (this page currently does not exist in the repo).
2. `/services/web` is reachable by direct URL but carries a `noindex` meta tag and is excluded from the `@astrojs/sitemap` output via `filter()` in `astro.config.mjs`; visiting the URL in a browser renders the full page, but the URL does not appear in `dist/sitemap-*.xml` after `npm run build`.
3. `/areas/abbotsford` is likewise dev-hidden (noindex + sitemap filter) and includes `ProfessionalService` JSON-LD with `areaServed: "Abbotsford, BC"` in the page `<head>`; the JSON-LD is present and valid in the build output even while the page is dev-hidden.
4. All dev-hidden pages are verified absent from the production sitemap in a local `npm run build` + `grep` check before the phase branch is merged.

---

#### Phase 40: URL Strategy + IA Cleanup

**Goal:** All old URL routes have working redirects in place before any source files are deleted, and the contact form / n8n webhook is removed without leaving dead code or broken references.

**Dependencies:** Phase 38 (Showcase page must exist before `/projects` is redirected to it); Phase 39 (dev-hidden pages must exist before their corresponding old routes are removed).

**Requirements:** IA-01, IA-05

**Success Criteria:**

1. `astro.config.mjs` contains redirect entries for `/projects` → `/showcase`, `/projects/[slug]` → `/showcase`, `/faq` → `/`, and `/thank-you` is removed; all redirects produce the correct destination in a `npm run build` output check before any source file is deleted.
2. `src/pages/faq.astro`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, and `src/pages/thank-you.astro` are deleted only after the redirect entries are confirmed present in the build output.
3. The n8n webhook contact form is removed: no `<form>` elements pointing to the webhook remain in any page template, no dead JavaScript event listeners reference the form DOM IDs, and `PUBLIC_N8N_WEBHOOK_URL` is removed from documentation (it may remain as a deployment secret but is no longer referenced in source code).
4. A `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` returns zero results after cleanup.

---

#### Phase 41: Legacy Cleanup + Quality Gate

**Goal:** All neobrutalist artifacts are deleted, old tokens are purged, CLAUDE.md is accurate, and the full quality gate (accessibility + Lighthouse + visual fidelity) passes for the complete milestone.

**Dependencies:** All previous phases (cleanup runs only after every page is verified on v3.0 tokens and components).

**Requirements:** CLEAN-01, CLEAN-02, CLEAN-03, QUAL-01, QUAL-02, QUAL-03

**Design-fidelity note:** QUAL-03 (visual fidelity gate) has been enforced as in-phase screenshot comparison checkpoints at Phases 34, 35, 36, 37, 38. Phase 41 is the formal milestone-close approval: Joel reviews Landing (light + dark) and Showcase side-by-side with Figma frames and signs off before the milestone is marked shipped.

**Success Criteria:**

1. All retired surfaces are deleted: `src/components/ui/` (Badge, Button, Card, Input, CheckboxGroup), `src/pages/design-system/`, `src/pages/component-demo.astro`, `src/pages/test-isometric.astro`, and `src/components/illustrations/`; `npm run build` succeeds with zero import errors after deletion.
2. All old neobrutalist token references are purged: `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo\|bg-yellow\|bg-turquoise\|shadow-neo\|iso-shadow" src/` returns zero results; only `--wl-*` tokens remain in `global.css`.
3. `CLAUDE.md` is rewritten to reflect v3.0: correct font names (Fraunces + Hanken Grotesk), correct token prefix (`--wl-*`), correct component names and folder structure, correct IA (no /faq, no /projects, blog out of nav); the `design/image-import-*` root-level duplicates are deleted.
4. axe-core returns zero violations across all pages (landing, showcase, blog index, blog post, 404, services/web, areas/abbotsford) in both light and dark themes.
5. Lighthouse CI passes ≥90 in all categories for the expanded URL set (landing, showcase, one blog post — mobile + desktop); all `lcp-lazy-loaded` and `prioritize-lcp-image` audits pass.
6. Joel approves the final Figma-frame vs. rendered screenshot comparison for Landing (light + dark, `12:2` / `117:103`) and Showcase (`12:3`) — this approval is the milestone-close gate.

---

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1-22 | v1.0-v1.3 | 66/66 | Complete (see milestone archives) | 2026-01-26 → 2026-02-11 |
| 23-32 | v2.0 (abandoned) | 34/34 | Executed, unconsumed (see archive branch) | 2026-05-31 → 2026-06-13 |
| 33 | v3.0 | 6/6 | Complete    | 2026-07-15 |
| 34 | v3.0 | 6/6 | Complete    | 2026-07-15 |
| 35 | v3.0 | 4/4 | Complete    | 2026-07-16 |
| 36 | v3.0 | 6/6 | Complete    | 2026-07-16 |
| 37 | v3.0 | 5/5 | Complete    | 2026-07-18 |
| 38 | v3.0 | — | Pending | — |
| 39 | v3.0 | — | Pending | — |
| 40 | v3.0 | — | Pending | — |
| 41 | v3.0 | — | Pending | — |

---
*Roadmap initialized: 2026-01-26 for v1.0*
*Last updated: 2026-07-15 — Phase 35 planned (4 plans in 3 waves)*
