---
phase: 25-leaf-page-migrations-faq-thank-you-404
plan: 02
subsystem: leaf-page-migration

tags: [astro, tailwind-v4, base-layout-v2, lucide-mailcheck, slot-head-meta, robots-noindex, github-pages-404, axe-core, playwright]

# Dependency graph
requires:
  - phase: 23-design-system-foundation
    provides: BaseLayoutV2 (slot=\"head\" mechanism, light-mode invariant, Plus Jakarta Sans preload, light-mode-only invariant)
  - phase: 24-v2-primitive-library-design-system-page
    provides: Button + Card + CardBody primitives, --max-width-* tokens, --shadow-md token, focus-ring scoped style on every interactive primitive
  - plan: 25-01
    provides: tests/accessibility/v2-leaf-pages.spec.ts (regression-guard contract for /thank-you and /404), centered elevated CTA Card composition (visual family for both Phase 25 leaf pages this plan ships)

provides:
  - "v2 /thank-you page on BaseLayoutV2 with elevated Card + MailCheck (text-accent, size 64) + verbatim Calendly placeholder URL"
  - "v2 /404 page on BaseLayoutV2 with single Return home Button + noindex meta head injection"
  - "dist/404.html auto-emitted by Astro static build for GitHub Pages serving (no astro.config.mjs change)"
  - "All 4 tests in tests/accessibility/v2-leaf-pages.spec.ts GREEN — Plan 25-01 contract gate fully closed"
  - "Phase 25 (leaf-page-migrations) COMPLETE — all 3 leaf pages (LEAF-01, LEAF-02, LEAF-03) on v2 layout"

affects:
  - 26-blog-migration (centered-Card composition family + slot=\"head\" injection pattern reusable for blog post end-of-article CTA + canonical link injection)
  - 27-services-projects-migration (Lucide icon at text-accent on light surface + elevated Card composition reusable for service/project tiles)
  - 28-contact-reskin (thank-you migration removes the v1 Card variant=\"turquoise\" reference — contact form's success-redirect target is now fully on v2)
  - 30-v1-primitive-deletion (with /faq + /thank-you migrated, the v1 BaseLayout + v1 Card + v1 Button are now used by fewer pages — clearer deletion path)

# Tech tracking
tech-stack:
  added: []  # zero new packages — every dependency was already shipped in Phase 23/24
  patterns:
    - "Astro 5 static-build 404 auto-emission: src/pages/404.astro auto-detects and emits dist/404.html (10KB, contains 'Page not found' marker) — no astro.config.mjs change, no SSR adapter, no 404-specific routing config (D-09 verified empirically)"
    - "<meta slot=\"head\" name=\"robots\" content=\"noindex, follow\" /> for hidden-page indexing exclusion via BaseLayoutV2's <slot name=\"head\" /> mechanism — verbatim from /design-system precedent (D-13)"
    - "v2 success-state visual cue via Lucide icon at text-accent + elevated Card — replaces v1 Card variant=\"turquoise\" pattern; the icon (non-text per WCAG 1.4.3) carries the accent color, not the surface (D-14, D-15)"
    - "Calendly placeholder URL preservation pattern: verbatim verbatim retention of placeholder external URLs across migrations when the real-URL swap is a separately tracked todo (D-16)"
    - "@astrojs/sitemap auto-excludes /404 from sitemap-0.xml by default — no manual filter needed; the noindex meta is the primary defense and the sitemap exclusion is automatic belt-and-suspenders"

key-files:
  created:
    - "src/pages/404.astro"
    - ".planning/phases/25-leaf-page-migrations-faq-thank-you-404/25-02-SUMMARY.md"
  modified:
    - "src/pages/thank-you.astro (full from-scratch rewrite — replaces 58-line v1 file with 31-line v2 file; 20 insertions, 46 deletions per git)"

key-decisions:
  - "Calendly URL preserved verbatim per D-16 (https://calendly.com/joelshinness, exactly 1 grep match) — real-URL swap remains a separately tracked v1.3 STATE.md todo, NOT folded into this phase"
  - "404 navigation uses single 'Return home' Button per D-11 — NOT a key-pages link list despite roadmap success-criterion 3 wording; HeaderV2 carries the rest of the recoverable nav"
  - "Em-dash (U+2014) used in 'Skip the wait — book a call' label per UI-SPEC Copywriting Contract — corrects the v1 hyphen-minus to the locked typographic spec"
  - "Astro 5 static-build empirically confirmed to auto-emit dist/404.html for GitHub Pages — no astro.config.mjs change required (D-09)"
  - "@astrojs/sitemap empirically confirmed to auto-exclude /404 from sitemap-0.xml — no manual filter needed; the optional belt-and-suspenders check from VALIDATION.md returned OK without intervention"

patterns-established:
  - "Pattern 1: Astro 5 file-based 404 — drop src/pages/404.astro, build emits dist/404.html, GitHub Pages serves it for unmatched routes. Zero config beyond the file itself"
  - "Pattern 2: head-slot meta injection for per-page <head> directives — <meta slot=\"head\" name=\"robots\" content=\"noindex, follow\" /> via BaseLayoutV2 <slot name=\"head\" />. Reusable for canonical, og:image overrides, custom meta on any v2 page"
  - "Pattern 3: v2 success/error-state visual cues via Lucide icon at text-accent in elevated Card — non-text accent application (icon stroke only), text stays at text-text for WCAG AA contrast. Replaces the v1 colored-Card-variant pattern"
  - "Pattern 4: Centered elevated Card visual family fully validated across 3 surfaces — FAQ CTA (Plan 25-01), thank-you (this plan), 404 (this plan). Locked composition: <Card elevated={true} class=\"max-w-2xl ... text-center\"><CardBody><div class=\"flex flex-col items-center gap-md\">...</div></CardBody></Card>"

requirements-completed: [LEAF-02, LEAF-03]

# Metrics
duration: 6min
completed: 2026-05-16
---

# Phase 25 Plan 02: Thank-You + 404 Migrations Summary

**Closed out the leaf-page migration phase by rewriting /thank-you on BaseLayoutV2 with an elevated Card + Lucide MailCheck icon (Calendly placeholder preserved verbatim), creating /404 from scratch with a single Return home Button + noindex meta head injection, and turning the last 2 of 4 axe-core regression-guard tests in v2-leaf-pages.spec.ts from yellow-flag-on-v1-baseline to green-on-v2-migration.**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-05-16T06:11:07Z
- **Completed:** 2026-05-16T06:17:37Z
- **Tasks:** 2
- **Files modified:** 2 (1 created, 1 rewritten)

## Accomplishments

- **`src/pages/thank-you.astro` rewritten from scratch on BaseLayoutV2.** The 58-line v1 file (v1 BaseLayout import, v1 Card with `variant="turquoise"`, v1 Button, CheckCircle2 icon, all `dark:` utilities, the inline `<style>` block with the redundant `.container { max-width: 1280px }` override) is fully replaced by a 31-line v2 file with zero v1 imports, zero `dark:` utilities, zero inline `<style>`, zero `is:global`, zero `<script>` blocks. The Calendly placeholder URL `https://calendly.com/joelshinness` is preserved verbatim — exactly 1 grep match per VALIDATION D8 gate (D-16).
- **`src/pages/404.astro` created from scratch on BaseLayoutV2.** New 27-line file: BaseLayout invocation with locked SEO props, `<meta slot="head" name="robots" content="noindex, follow" />` head injection (D-13, verbatim from /design-system precedent), centered elevated Card with H1 + body paragraph + single primary "Return home" Button. **No icon (D-12), no secondary link (D-11), no key-pages list (D-11 deliberate scope tightening of roadmap success-criterion 3).** Astro static build auto-detects the file and emits `dist/404.html` (10006 bytes, contains "Page not found" marker) — no `astro.config.mjs` change needed (D-09 verified empirically).
- **All 4 tests in `tests/accessibility/v2-leaf-pages.spec.ts` green.** The /thank-you and /404 axe-core regression-guards from Plan 25-01 (which passed on v1 baseline as documented in 25-01 SUMMARY) stay green through the migration. The /faq axe + /faq JSON-LD tests stay green. Plan 25-01's contract gate is now fully closed.
- **Phase 25 COMPLETE.** All 3 leaf-page requirements (LEAF-01 from Plan 25-01, LEAF-02 and LEAF-03 from this plan) shipped. The centered-Card visual family is now empirically validated across 3 surfaces (FAQ CTA, /thank-you, /404) — ready as the canonical composition pattern for any future "centered moment" page in v1.4.
- **MailCheck icon (size 64, text-accent stroke) replaces v1 CheckCircle2** as the success-state visual cue on /thank-you (D-15). The accent color sits on the icon (non-text per WCAG 1.4.3) rather than on a Card surface — light-mode + WCAG AA compliant; the v2 Card stays surface-white with token border + shadow-md.

## Task Commits

1. **Task 1: Rewrite src/pages/thank-you.astro on BaseLayoutV2 with elevated Card + MailCheck icon** — `b48286b` (feat)
2. **Task 2: Create src/pages/404.astro on BaseLayoutV2 with centered Card + Return home Button + noindex meta** — `46b5e78` (feat)

**Plan metadata commit:** to follow this SUMMARY commit (docs: complete plan)

## Files Created/Modified

- **`src/pages/thank-you.astro`** (rewritten — 20 insertions, 46 deletions) — 31-line v2 page; imports `BaseLayout` from v2 layout, `Button`/`Card`/`CardBody` from v2 primitives, `MailCheck` from `@lucide/astro`; preserves Calendly placeholder URL verbatim per D-16
- **`src/pages/404.astro`** (created — 27 lines) — new file; imports `BaseLayout` + `Button` + `Card` + `CardBody` from v2 paths; head-slot noindex meta; centered elevated Card with H1, body, single primary Button to `/`

## Decisions Made

- **Calendly URL preserved verbatim** (`https://calendly.com/joelshinness`) per D-16. The real-URL swap is a separately tracked v1.3 STATE.md todo and is explicitly OUT OF SCOPE for this phase. VALIDATION D8 gate confirmed: exactly 1 grep match in `src/pages/thank-you.astro`.
- **404 navigation tightened to single Return home Button** per D-11. Despite roadmap success-criterion 3 wording ("navigation links back to the homepage and key pages"), the HeaderV2 carries Blog / Projects / FAQ / Contact navigation on every page including /404 — a redundant secondary link list would add visual noise without adding wayfinding. Locked per D-11 + UI-SPEC Component Composition `/404` block.
- **Em-dash (U+2014) used in primary Button label** "Skip the wait — book a call" per UI-SPEC Copywriting Contract (line 138). The v1 file used a hyphen-minus; the UI-SPEC em-dash is the authoritative typographic spec.
- **Astro static-build 404 auto-emission verified empirically** (D-09). `npm run build` emitted `dist/404.html` at 10006 bytes containing "Page not found" without any `astro.config.mjs` change. Pattern: drop `src/pages/404.astro`, build, ship — Astro 5 + GitHub Pages handle the rest.
- **@astrojs/sitemap auto-excludes /404** from `dist/sitemap-0.xml` by default. The optional belt-and-suspenders check from VALIDATION.md / RESEARCH Pitfall 4 returned `OK: /404 not in sitemap` without intervention. The noindex meta (D-13) is the primary defense; sitemap exclusion is automatic and belt-and-suspenders.

## Deviations from Plan

None - plan executed exactly as written.

The plan was extraordinarily well-specified (locked composition blocks in UI-SPEC + 5 grep gates + per-task verify lists) and the prerequisite Plan 25-01 had already established every pattern this plan reuses (centered-Card composition, slot="head" injection mechanism, axe-core spec scaffolding). Both tasks ran clean on first attempt: every grep gate passed first try, `npm run astro check` showed no new errors in the 2 modified files, `npm run build` succeeded with 18 pages emitted (was 17 before /404), and the full Playwright spec passed 4/4 on first run. Zero auto-fixes needed.

## Issues Encountered

None.

The pre-existing 6 errors from `npm run astro check` (5 in `src/components/design-system/CodeBlock.astro` for ts(2322)/ts(2339), 1 in `src/pages/blog/tags/[tag].astro` for ts(2559)) are unchanged from the Plan 25-01 baseline and are out of scope for Phase 25 (CodeBlock is the v1 design-system-page CodeBlock, blog tags is Phase 26 territory). Their existence does NOT block this plan — both `npm run astro check` and `npm run build` exit 0 (errors are diagnostic, not blocking on Astro 5).

## User Setup Required

None - no external service configuration required.

The Calendly placeholder URL preservation per D-16 means the live `/thank-you` page will continue to point at the placeholder URL until the separately tracked v1.3 STATE.md todo "Update Calendly booking link on /thank-you page with real URL" is executed. That work is intentionally NOT folded into this phase.

## Next Phase Readiness

**Phase 25 COMPLETE — all 3 leaf-page migrations shipped.**

- LEAF-01 (Plan 25-01): /faq on BaseLayoutV2 with bordered native-details rows + ChevronDown + FAQPage JSON-LD via slot="head" + centered elevated CTA Card — DONE
- LEAF-02 (this plan): /thank-you on BaseLayoutV2 with elevated Card + MailCheck icon — DONE
- LEAF-03 (this plan): /404 on BaseLayoutV2 with centered Card + Return home Button + noindex meta — DONE

**Build state:**

- `npm run astro check` — 6 pre-existing errors unchanged from Plan 25-01 baseline (CodeBlock.astro × 5, blog/tags/[tag].astro × 1); zero NEW errors in `src/pages/thank-you.astro` or `src/pages/404.astro` (the 5 errors that previously existed in the v1 thank-you file are eliminated by this plan's migration)
- `npm run build` — succeeds; 18 pages emitted (up from 17 — /404 added); `dist/404.html` exists at 10006 bytes containing "Page not found"; `dist/sitemap-0.xml` correctly excludes /404
- `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts` — 4/4 tests pass (8.7s)

**Carry-forward todos:**

- v1.3 STATE.md "Update Calendly booking link on /thank-you page with real URL" — REMAINS PENDING. Plan 25-02 preserved the placeholder URL verbatim per D-16. The real-URL swap is a single-line edit when the user is ready to provision the actual Calendly link. Confirmed in v1.4 carry-forward in the "Decisions Made" section above.
- v1.3 STATE.md "Configure n8n webhook — set PUBLIC_N8N_WEBHOOK_URL environment variable" — UNRELATED to layout migration; remains pending.

**Optional follow-up (not needed):**

- The optional sitemap exclusion follow-up from VALIDATION.md ("if /404 IS in sitemap, document recommendation to add a sitemap filter in astro.config.mjs as a 2-line follow-up") is moot — `@astrojs/sitemap` auto-excludes /404 by default. No follow-up action required.

**Phase 25 ready for:**

- `/gsd:verify-work` cross-cuts (axe-core spec already green; build already succeeds; grep gates already validated)
- Lighthouse CI sign-off via existing `.github/workflows/deploy.yml` workflow (no new config needed per D-19)
- PR merge to `main` once verify-work signs off
- Phase 26 (Blog migration) is unblocked — the centered-Card composition family + slot="head" injection mechanism + axe-core spec scaffolding pattern are all ready for content-heavy migration work

**No blockers, no concerns.**

---
*Phase: 25-leaf-page-migrations-faq-thank-you-404*
*Completed: 2026-05-16*
