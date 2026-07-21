# Project Milestones: Joel Shinness Website

## v1.0 MVP (Shipped: 2026-01-27)

**Delivered:** Complete lead-generation focused portfolio website for freelance/consulting work, targeting small business clients with clear positioning, portfolio showcase, and contact system.

**Phases completed:** 1-6 (23 plans total)

**Key accomplishments:**

- Built responsive Astro/Tailwind foundation with dark mode, mobile navigation, and B&W photography design system
- Created homepage with clear value proposition, services, 5-step process, FAQ, and about section
- Implemented portfolio with filterable case study grid and detailed project pages
- Added contact form with validation, Formspree integration, and social links
- Built blog platform with MDX, syntax highlighting, sticky TOC, and tag filtering
- Achieved Lighthouse 92/90/100/100 with SEO meta tags, JSON-LD, and CI/CD pipeline

**Stats:**

- 24 source files created
- 2,052 lines of Astro/TypeScript/CSS/MDX
- 6 phases, 23 plans, 90 commits
- 2 days from init to ship (Jan 26-27, 2026)

**Git range:** `c9a394b` → `817b766`

**What's next:** Configure Formspree, add real content, deploy to GitHub Pages

---

*Milestone log started: 2026-01-27*

## v1.1 Design Updates (Shipped: 2026-02-10)

**Delivered:** Transformed site from generic minimalist to distinctive neobrutalist design with narrative homepage structure, targeting small business owners with competence, confidence, personality, and approachability while maintaining WCAG 2.2 AA accessibility compliance.

**Phases completed:** 7-11 (14 plans total)

**Key accomplishments:**

- Built OKLCH neobrutalist design system with yellow/turquoise/magenta palette and shadow-to-glow dark mode transformation
- Created Button, Card, and Input primitives with WCAG 2.4.13 focus states and hardware-accelerated animations
- Transformed homepage with narrative flow structure (Solutions → Process → Tech → About → Contact) and asymmetric layouts
- Redesigned Projects and Blog sections with neobrutalist card grids, case study format, and two-tier typography
- Achieved WCAG 2.2 AA accessibility with Playwright/axe-core test suite and 98.7% manual audit pass rate
- Relocated FAQ to footer with native HTML accordion for zero-JS accessibility

**Stats:**

- 37 source files modified
- 3,139 lines of Astro/TypeScript/CSS
- 5 phases, 14 plans, ~100 commits
- 2 days from init to ship (Feb 9-10, 2026)

**Git range:** feat(07-01) → feat(11-03)

**What's next:** Configure Formspree, add real project screenshots, v1.2 Enhancements

---


## v1.2 Homepage Refinement (Shipped: 2026-02-10)

**Delivered:** Enhanced homepage sections to better communicate outcomes and working style through outcome-focused messaging, isometric illustrations, and improved FAQ discoverability for small business clients.

**Phases completed:** 12-16 (10 plans total)

**Key accomplishments:**

- Migrated icon library to @lucide/astro with tree-shaking (200KB+ bundle reduction)
- Hero section reframed with outcome-focused messaging and 3 visual trust badges
- Process section enhanced with 5 isometric illustrations and user-focused descriptions
- Technology section restructured into 3 categories (AI, Automations, Web Apps) with illustrations
- Dedicated FAQ page created with FAQPage JSON-LD schema for SEO rich results
- Established isometric CSS utilities (iso-shadow, iso-glow, iso-rotate) with dark mode glow transformation

**Stats:**

- 34 source files modified
- 3,649 lines of Astro/TypeScript/CSS
- 5 phases, 10 plans
- 1 day build (Feb 10, 2026)

**Git range:** feat(12-01) → feat(16-01)

**What's next:** Configure Formspree, add real project screenshots, v1.3 Enhancements

---


## v1.3 Design System & Navigation Cleanup (Shipped: 2026-02-11)

**Delivered:** Consolidated design system into a reference page, achieved 100% component consistency across all pages, streamlined navigation to 4 links, and enhanced the contact form into an 8-field lead qualification flow with n8n webhook integration.

**Phases completed:** 17-22 (20 plans total)

**Key accomplishments:**

- Design system reference page at /design-system with JSON API endpoint, ComponentShowcase wrapper, and live token swatches
- Component consistency audit identified 16 findings; all HIGH and MEDIUM severity issues migrated to design system components (zero raw HTML forms/buttons in interactive UI)
- CheckboxGroup component added for multi-select form fields with 3 color variants and full design system documentation
- Enhanced 8-field contact form (homepage and /contact) with n8n webhook integration, payload filtering, and /thank-you redirect flow
- Simplified header navigation to Blog, Projects, FAQ, Contact; /contact route consolidated as redirect to homepage section
- Footer with social icons (44x44px touch targets, WCAG 2.5.5) and secondary navigation mirroring header
- Zero axe-core accessibility violations across 9 pages and 100% Lighthouse scores in all categories

**Stats:**

- 26 source files modified
- 2,492 insertions / 525 deletions in src/
- 6 phases, 20 plans, ~29 phase commits
- 2-day build (Feb 10-11, 2026)

**Git range:** feat(17-01) → feat(22-01)

**What's next:** Configure PUBLIC_N8N_WEBHOOK_URL, replace placeholder Calendly link on /thank-you, add real social profile URLs, plan v1.4

---


## v1.4 Design Overhaul (Abandoned: 2026-05-31)

**Status:** Abandoned — both attempted foundation phases reverted; no code or design artifacts shipped.

**What was tried:**
- Phase 23 (Design System Foundation): v2 token system in `src/styles/v2/global.css`, self-hosted variable fonts (Plus Jakarta Sans + Inter), BaseLayoutV2, v2 Header/Footer/MobileNav, seed `design/design-system.pen`, token-collision guard. **Reverted** via `revert(23)` on 2026-05-31 (21 commits undone, `5accd46`).
- Phase 24 (v2 Primitive Library + Design System Page): Button/Card/Input/Badge primitives, rebuilt `/design-system` page on BaseLayoutV2. **Reverted** via `revert(24)` on 2026-05-31 (file-restore strategy after reverse-revert hit irreconcilable conflicts, `7f53a1c`).
- Phase 25 (Leaf Page Migrations): `/faq`, `/thank-you`, `/404` migrated to BaseLayoutV2. **Reverted** on 2026-05-31 (`abd140d`).

**Why abandoned:** Implementations drifted from the intended Crito design. Root cause: the Crito `.pen` file is mostly flat raster exports (from Figma → Pencil conversion), so the design system phase had to make best-guess decisions on typography, spacing, and component structure that ended up generic rather than capturing the design's character.

**Resolution:** Replaced by **v2.0 Prep Crito Design File** — a Pencil-MCP-centric milestone that reconstructs the `.pen` file itself (recreating flat sections as editable components with proper tokens) before any code work resumes.

**Phase numbers (23-30) returned to pool** — v2.0 reuses Phase 23 onward since nothing v1.4 actually shipped.

---



## v2.0 Prep Crito Design File (Abandoned: 2026-07-14)

**Status:** Abandoned — all 10 phases (23-32) were completed and verified, but the design direction itself was dropped before any code milestone consumed the output.

**What was delivered (design-only, no code changes):**
- `design/Crito.pen` fully reconstructed: 107-token two-tier variable system, 32 reusable components (primitives / compounds / sections), all 10 IN-SCOPE Joel page frames rebuilt as editable compositions with zero raw hex/px values
- Milestone audit: 39/39 requirement deliverables present and cross-verified (`.planning/milestones/v2.0-MILESTONE-AUDIT.md`)
- Archival PNG exports + `v2.0-HANDOFF.md` code-milestone organization map

**Where the work lives:** The complete v2.0 record (phases 26-32 execution, exports, handoff doc) is on the **unmerged branch `feature/phase-32-fidelity-sweep-handoff`**. Main carries the record through Phase 31 planning. Deliberately left unmerged.

**Why abandoned:** Joel chose an entirely new brand direction — "Joel Shinness Solutions" (Figma brand exploration: sea-cool palette, Fraunces + Hanken Grotesk, waveform mark, new Landing/Showcase IA). The Crito template look, and all work fitting the site to it, is superseded. Unlike v1.4 (which failed on execution), v2.0 succeeded at its goal; the goal itself became obsolete.

**Resolution:** Replaced by **v3.0 Wavelength Rebrand** — rebuild the site in place to the new Figma design. Phase numbers 23-32 were genuinely executed, so v3.0 phases start at **33**.

**Planning artifacts archived to:** `.planning/milestones/v2.0-{REQUIREMENTS,ROADMAP,MILESTONE-AUDIT}.md`, `.planning/milestones/v2.0-research/`

---

## v3.0 Wavelength Rebrand (Shipped: 2026-07-21)

**Delivered:** Rebuilt the entire site in place to the "Joel Shinness Solutions" Figma brand — sea-cool palette, Fraunces + Hanken Grotesk, waveform mark, new Landing/Showcase IA in light + dark themes — replacing the neobrutalist design wholesale while keeping the Astro 5 / Tailwind 4 infrastructure, CI, SEO plumbing, and blog content. Every visible-UI phase closed with a Figma-frame vs. rendered screenshot fidelity gate (the discipline absent in the abandoned v1.4).

**Phases completed:** 33-41 (45 plans total)

**Key accomplishments:**

- Sea-cool `--wl-*` token foundation (light + dark) and self-hosted Fraunces + Hanken Grotesk (CLS=0 via Fontaine), with a 13-style type ramp and a WCAG AA contrast gate script
- Full Wavelength chrome (SiteHeader/SiteFooter, circle-badge mark on dark, zero client JS, system-only FOUC-safe dark mode) plus a 13-component `src/components/wl/` library matching the Figma Components page
- Rebuilt landing page — all 9 Figma sections at 4 breakpoints, light + dark, scroll-spy anchor nav, real Calendly URL live via `BOOKING_URL` (resolved FUT-01)
- Dev-gated Showcase (expandable ProjectCards from frame 12:3) and a fully restyled dev-only blog (`.wl-prose`, rethemed expressive-code, LCP fixed structurally)
- Dev-hidden Service Web + Area Abbotsford pages (noindex + sitemap filter + PROD redirect guards, ProfessionalService JSON-LD) and a branded 404
- Legacy cleanup: neobrutalist components/pages/tokens purged, redirects wired (`/projects`, `/faq`, `/thank-you`), n8n contact form removed, CLAUDE.md rewritten for v3.0
- Quality gate passed: axe-core 20/20 zero violations across all pages both themes (QUAL-01); Lighthouse URL set scoped to `/` + `/404` (QUAL-02); Joel approved the milestone-close visual fidelity comparison (QUAL-03)

**Milestone audit:** PASSED — 33/33 requirements satisfied, no critical blockers, all 8 cross-phase integration flows verified against a clean build (`.planning/milestones/v3.0-MILESTONE-AUDIT.md`).

**Known deferred items at close (tracked, non-blocking):** QUAL-02 Lighthouse score runs in CI on push to main (auto-resolves on PR merge); `/projects/[slug]` dynamic redirect omitted (static-mode limit, D-02); 4 Service Web FAQ answers = COPY GAP (FUT-08); `BOOKING_URL` literal duplicated in `/contact` config redirect (sync-guarded); untracked `design/image-import.*` root duplicates.

**Stats:**

- ~6,968 lines across `src/` (Astro/TypeScript/CSS/MDX)
- 9 phases, 45 plans, 167 milestone commits
- 7 days from milestone start to ship (Jul 14-21, 2026)
- Git range: `6534b0b` → `cb52ece`

**Git tag:** `v3.0`

**What's next:** Open PR to `main` (triggers GitHub Pages deploy + Lighthouse CI); then plan the next milestone (publishing Service/Area pages, blog back into nav, real case study — FUT-02..07).

---

