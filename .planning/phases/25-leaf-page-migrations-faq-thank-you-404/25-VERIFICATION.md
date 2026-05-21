---
phase: 25-leaf-page-migrations-faq-thank-you-404
verified: 2026-05-21T19:30:00Z
status: human_needed
score: 11/12 must-haves verified (1 acknowledged-deferred sub-task)
human_verification:
  - test: "Lighthouse 90+ across Performance / Accessibility / Best Practices / SEO on /faq, /thank-you, /404"
    expected: "All four categories score >=90 on each route in Lighthouse CI"
    why_human: "Lighthouse CI runs on PR/CI, not locally during verification — Success Criterion #4 second-half is intentionally deferred to the CI job (lighthouserc.json thresholds). Final sign-off requires the CI run on PR merge"
  - test: "FAQ JSON-LD validates in https://validator.schema.org/"
    expected: "Zero errors / zero warnings on the FAQPage schema block in dist/faq/index.html"
    why_human: "External validator; not wired into CI. Structural integrity is verified by axe + the A2 test, but schema.org's official validator is the SEO ground truth"
  - test: "Set PUBLIC_CALENDLY_URL secret in GitHub Settings"
    expected: "GitHub Settings -> Secrets and variables -> Actions contains PUBLIC_CALENDLY_URL with Joel's real Calendly booking URL"
    why_human: "Deployment-time configuration (Joel-action). Until set, /thank-you ships with placeholder fallback https://calendly.com/joelshinness. Workflow wiring is correct; only the secret VALUE is pending"
  - test: "Pencil mirror — /404 frame + FAQ accordion-row variant in design/design-system.pen"
    expected: "Opening design/design-system.pen via Pencil app/MCP shows a /404 page frame (numeral + 2x2 grid + link CTA) and an FAQ accordion-row variant (closed + open states with chevron rotation + 1px divider)"
    why_human: "D-25-22 sub-task 3C deferred — Pencil MCP tools were not exposed as callable functions in the executor's tool schema during Plan 25-02 execution. Acknowledged in 25-02-SUMMARY.md 'Pending Manual Completion #2'. Plan's explicit contingency clause permits deferral. The .pen file mtime (May 14) confirms no Phase 25 changes landed; mirror is unambiguously deferred"
  - test: "Visual review of /faq, /thank-you, /404 in dev/preview"
    expected: "/faq: surface-muted banner + centered H1 + 5-row divider-list accordion with ChevronDown that rotates 180deg on open + bottom CTA banner with primary Button. /thank-you: vertical-centered elevated Card with green CheckCircle2 + sentence-case H1 + body + primary Calendly Button + 'Return to homepage' link. /404: huge 404 numeral (text-8xl mobile / text-9xl md+) + 'This page wandered off.' tagline + 2x2 destination grid + 'Or get in touch' link Button"
    why_human: "Visual fidelity (font sizes, spacing, color values rendered correctly, no FOUC, dark mode never appears regardless of OS preference) cannot be programmatically verified — needs human eyes"
  - test: "Playwright a11y suite passes end-to-end in clean environment"
    expected: "npx playwright test tests/accessibility/v2-leaf.spec.ts --reporter=line exits 0 with 14 tests passing across /faq /thank-you /404 (zero axe-core violations under WCAG 2.x AA)"
    why_human: "Plan 25-02 SUMMARY documents an executor environment race condition (stale dev server on port 4321 served v1 markup until resolved with isolated preview on 4322). Tests pass under correct conditions; a clean local or CI run is recommended to confirm before phase sign-off"
---

# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) Verification Report

**Phase Goal:** Migrate `/faq` and `/thank-you` to `BaseLayoutV2` and create a new `/404` page on `BaseLayoutV2`, all rendering light-mode-only with v2 chrome and passing axe-core. Validates the dual-layout coexistence pattern on low-risk targets before content-heavy pages.

**Verified:** 2026-05-21T19:30:00Z
**Status:** human_needed (automated checks fully pass; deferred Pencil mirror + Lighthouse CI / schema.org validation require human confirmation)
**Re-verification:** No — initial verification

---

## Goal Achievement

### ROADMAP Success Criteria

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | `/faq` on BaseLayoutV2 with accordion unchanged, FAQPage JSON-LD validates, CTA block at bottom | ✓ VERIFIED | src/pages/faq.astro imports `BaseLayout from '../layouts/v2/BaseLayout.astro'`; 5 faqs preserved verbatim (D-25-21); `faqSchema` injected via `<script slot="head" type="application/ld+json">`; built `dist/faq/index.html` contains 2 JSON-LD blocks (Person + FAQPage), 5 Question/Answer pairs; bottom CTA: `<section class="blog-hero">` + h2 "Still have questions?" + `<Button variant="primary" size="lg" href="/#contact">Get in touch</Button>` (lines 78-84) |
| 2 | `/thank-you` on BaseLayoutV2 with post-submission message and Calendly placeholder link intact | ✓ VERIFIED | src/pages/thank-you.astro lines 12-44: BaseLayoutV2 + `Card elevated={true}` + CheckCircle2 + h1 "Thanks for reaching out!" + body w/ "48 hours" + primary Button to `{calendlyUrl}` with `target="_blank" rel="noopener noreferrer"` + "Return to homepage" link. Calendly URL: `import.meta.env.PUBLIC_CALENDLY_URL \|\| 'https://calendly.com/joelshinness'` (D-25-11). Built `dist/thank-you/index.html` resolves placeholder when secret unset |
| 3 | `/404` on BaseLayoutV2 with navigation links to homepage and key pages | ✓ VERIFIED | src/pages/404.astro (new file, 74 lines): BaseLayoutV2 + `<meta slot="head" name="robots" content="noindex">` + h1 "404" + h2 "This page wandered off." + 4-card grid linking `['/', '/projects', '/blog', '/faq']` + link Button to `/#contact`. Built `dist/404.html` contains 5 noindex tokens and 4 navigation hrefs |
| 4 | All three pages pass axe-core with zero violations and Lighthouse 90+ | ⚠️ PARTIAL | axe-core: tests/accessibility/v2-leaf.spec.ts contains 14 tests (5 /faq + 4 /thank-you + 5 /404) all asserting `results.violations.toEqual([])` with `wcagTags = ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']`. 25-02-SUMMARY documents all 14 passing post-environment-cleanup. **Lighthouse 90+ deferred to CI** (lighthouserc.json gates on PR merge; human verification item) |

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | /faq renders on BaseLayoutV2 with Crito-faithful page-header banner | ✓ VERIFIED | faq.astro:2 imports v2 BaseLayout; lines 52-63 contain `<section class="blog-hero">` with breadcrumbs `Home / FAQ` + centered h1 "Frequently Asked Questions" in --font-display |
| 2 | 5 question/answer pairs preserved verbatim (D-25-21) | ✓ VERIFIED | faq.astro lines 7-28: array length 5, all 5 questions/answers literal-match v1 source |
| 3 | Borderless divider-list accordion with 1px --color-border bottom rule | ✓ VERIFIED | faq.astro:126-131: `.faq-row { border-bottom: 1px solid var(--color-border); }` + `.faq-row:last-child { border-bottom: none; }` |
| 4 | ChevronDown rotates 180deg via CSS when details[open] | ✓ VERIFIED | faq.astro:155-164: `.faq-row[open] > summary .faq-row__chevron { transform: rotate(180deg); color: var(--color-primary); }` |
| 5 | Native disclosure marker suppressed on WebKit + Firefox | ✓ VERIFIED | faq.astro:147-153: both `::-webkit-details-marker { display: none; }` and `::marker { display: none; }` present |
| 6 | FAQPage JSON-LD in head with 5 mainEntity Questions | ✓ VERIFIED | dist/faq/index.html: 2 `application/ld+json` scripts (Person + FAQPage), 1 FAQPage `@type`, 5 Question `@type`, 5 Answer `@type` |
| 7 | Bottom CTA banner with primary "Get in touch" Button to /#contact | ✓ VERIFIED | faq.astro:79-84: second `<section class="blog-hero">` + h2 + `<Button variant="primary" size="lg" href="/#contact">Get in touch</Button>` |
| 8 | Zero v1 imports in /faq, /thank-you, /404 | ✓ VERIFIED | `grep -rn "components/ui/\|components/layout/\|layouts/BaseLayout.astro" src/pages/{faq,thank-you,404}.astro` returns no matches |
| 9 | Zero `dark:` utilities in all three pages | ✓ VERIFIED | `grep -rn "dark:" src/pages/{faq,thank-you,404}.astro` returns no matches |
| 10 | Zero FOUC scripts / Google Fonts CDN in all three pages | ✓ VERIFIED | `grep -c "localStorage\|prefers-color-scheme\|fonts.googleapis" src/pages/{faq,thank-you,404}.astro` returns 0 across all three |
| 11 | No uppercase text-transform on any heading | ✓ VERIFIED | `grep -c "uppercase" src/pages/{faq,thank-you,404}.astro` returns 0 across all three |
| 12 | /thank-you uses elevated Card + env-var Calendly + sentence-case h1 | ✓ VERIFIED | thank-you.astro:17 `<Card elevated={true}>`; line 9 `const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL \|\| 'https://calendly.com/joelshinness';`; h1 "Thanks for reaching out!" has no `uppercase` class |
| 13 | /thank-you Calendly Button has target="_blank" + rel="noopener noreferrer" | ✓ VERIFIED | thank-you.astro:26-32: all three attrs present on `<Button variant="primary" size="lg" href={calendlyUrl} target="_blank" rel="noopener noreferrer">` |
| 14 | /404 has noindex meta in head | ✓ VERIFIED | 404.astro:21 `<meta slot="head" name="robots" content="noindex" />`; built `dist/404.html` confirms `name="robots" content="noindex"` rendered into head |
| 15 | /404 hero numeral text-8xl mobile, md:text-9xl tablet+ | ✓ VERIFIED | 404.astro:26 `<h1 class="font-display font-bold text-8xl md:text-9xl text-primary leading-none">404</h1>` |
| 16 | /404 destination grid is 4 anchor-wrapped Cards in order [/, /projects, /blog, /faq] | ✓ VERIFIED | 404.astro:8-13 `destinations` array in declared order; 4 `a.dest-card` elements; inner Card NOT `interactive={true}` (BlogCard CR-02 precedent per RESEARCH OQ-4) |
| 17 | /404 has link-variant Button "Or get in touch" to /#contact | ✓ VERIFIED | 404.astro:49 `<Button variant="link" href="/#contact">Or get in touch</Button>` |
| 18 | /404 has NO banner chrome (no .blog-hero, .page-hero, breadcrumbs) | ✓ VERIFIED | `grep -c "blog-hero\|page-hero\|breadcrumb" src/pages/404.astro` returns 0 |
| 19 | tests/accessibility/v2-leaf.spec.ts contains 14 tests across 3 describe blocks | ✓ VERIFIED | spec file: 3 describe blocks ('v2 /faq', 'v2 /thank-you', 'v2 /404'); 14 `test(...)` invocations; wcagTags constant with 5 WCAG tag groups |
| 20 | .github/workflows/deploy.yml wires PUBLIC_CALENDLY_URL env | ✓ VERIFIED | deploy.yml:37 `PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}` placed under PUBLIC_N8N_WEBHOOK_URL in Build site step env block |
| 21 | design/design-system.pen mirrored with /404 + FAQ accordion variant (D-25-22) | ✗ DEFERRED | .pen mtime is May 14 2026 (pre-phase). 25-02-SUMMARY explicitly documents Pencil MCP tools were not callable in executor environment; deferral permitted by plan contingency clause; flagged for manual completion |

**Score:** 20/21 truths verified, 1 deferred-as-planned (Pencil mirror).

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/pages/faq.astro` | Rewritten on v2; 5 FAQs + JSON-LD + accordion + CTA banner | ✓ VERIFIED | 181 lines; all required imports + markup + scoped CSS present |
| `src/pages/thank-you.astro` | Rewritten on v2; env-var Calendly; elevated Card; no uppercase | ✓ VERIFIED | 44 lines; all v2 imports; placeholder fallback; sentence-case h1 |
| `src/pages/404.astro` | New file on v2; numeral + grid + noindex; no banner chrome | ✓ VERIFIED | 74 lines + scoped style; produces dist/404.html |
| `tests/accessibility/v2-leaf.spec.ts` | Wave 0 spec; /faq + /thank-you + /404 describes; axe-core | ✓ VERIFIED | 165 lines; 3 describes; 14 tests; wcagTags constant matches Phase 26 |
| `.github/workflows/deploy.yml` | PUBLIC_CALENDLY_URL env in build step | ✓ VERIFIED | Single-line addition under PUBLIC_N8N_WEBHOOK_URL; YAML valid; production build passes with env var |
| `design/design-system.pen` | /404 frame + FAQ accordion-row variant added | ✗ DEFERRED | mtime unchanged from May 14; Pencil MCP not invocable in executor; flagged in 25-02-SUMMARY "Pending Manual Completion #2" |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| src/pages/faq.astro | src/layouts/v2/BaseLayout.astro | BaseLayout import + wrapper | ✓ WIRED | Line 2 import; lines 45-85 `<BaseLayout title="FAQ" description="...">` wrapper; 3 BaseLayout refs total |
| src/pages/faq.astro | head JSON-LD | `<script slot="head" type="application/ld+json" set:html={JSON.stringify(faqSchema)} />` | ✓ WIRED | Line 49 exact pattern; built into dist/faq/index.html as inline JSON-LD script |
| src/pages/faq.astro CTA Button | /#contact | `<Button variant="primary" size="lg" href="/#contact">` | ✓ WIRED | Line 82 exact attrs |
| src/pages/thank-you.astro | PUBLIC_CALENDLY_URL env | `import.meta.env.PUBLIC_CALENDLY_URL \|\| 'https://calendly.com/joelshinness'` | ✓ WIRED | Line 9; verified at build that fallback resolves to `calendly.com` URL in dist/thank-you/index.html |
| src/pages/thank-you.astro | Calendly external | `<Button ... href={calendlyUrl} target="_blank" rel="noopener noreferrer">` | ✓ WIRED | Lines 26-32 all three attrs present |
| src/pages/404.astro | head noindex meta | `<meta slot="head" name="robots" content="noindex" />` | ✓ WIRED | Line 21; rendered into dist/404.html head |
| src/pages/404.astro | 4 destination hrefs | destinations array → `<a class="dest-card" href={d.href}>` | ✓ WIRED | Array order: '/', '/projects', '/blog', '/faq' (4 entries, all referenced in built output) |
| src/pages/404.astro contact CTA | /#contact | `<Button variant="link" href="/#contact">` | ✓ WIRED | Line 49; auto-renders ArrowRight per Phase 24 D-04 |
| .github/workflows/deploy.yml | PUBLIC_CALENDLY_URL secret | `PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}` | ✓ WIRED | Line 37 under Build site env block |
| tests/accessibility/v2-leaf.spec.ts | /faq + /thank-you + /404 routes | `page.goto(...)` + `new AxeBuilder({ page }).withTags(wcagTags).analyze()` | ✓ WIRED | wcagTags constant on line 4; 3 describe blocks; 14 tests; all SUMMARY-confirmed passing post-env-fix |

### Requirements Coverage

| Requirement | Status | Evidence |
|-------------|--------|----------|
| **LEAF-01** /faq migrated to BaseLayoutV2; FAQPage JSON-LD schema preserved; CTA block added at bottom | ✓ SATISFIED | All 7 supporting truths (1-7) verified; built output contains FAQPage schema with 5 Q/A pairs; CTA Button → /#contact |
| **LEAF-02** /thank-you migrated to BaseLayoutV2 | ✓ SATISFIED | All supporting truths (8-13) verified; env-var Calendly with fallback; sentence-case h1; double-suffix title bug fixed (dist `<title>Thanks! \| Joel Shinness</title>`) |
| **LEAF-03** /404 migrated to BaseLayoutV2 with helpful navigation back to homepage and key pages | ✓ SATISFIED | All supporting truths (14-18) verified; 4 destination cards in declared order + soft 5th contact CTA + noindex meta + no banner chrome |

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| src/components/design-system/CodeBlock.astro | 5 pre-existing ts(2322)/ts(2339) errors (CodeLanguage narrowing, Element.style property) | ℹ️ Info | Pre-existing per 25-01 and 25-02 SUMMARYs; unrelated to Phase 25 scope; not introduced or modified by this phase |
| src/pages/faq.astro:49 | astro(4000) hint: script with attribute treated as is:inline | ℹ️ Info | Hint only (not error/warning); intentional — JSON-LD must render in head as inline script |
| src/pages/thank-you.astro CheckCircle2 | ts(6385) deprecated lucide icon name | ℹ️ Info | Lucide deprecated CheckCircle2 in favor of CircleCheck; cosmetic, the icon still renders correctly. Not phase-25-introduced; can be addressed in a future maintenance pass |
| tests/accessibility/v2-blog.spec.ts:33 | ts(6133) unused `capturedText` declaration | ℹ️ Info | Pre-existing in Phase 26 spec; unrelated to v2-leaf.spec.ts |

**No blocker anti-patterns found in Phase 25 deliverables.** Zero TODO/FIXME/placeholder/coming-soon comments in any of the four files (`src/pages/{faq,thank-you,404}.astro`, `tests/accessibility/v2-leaf.spec.ts`). No empty handler stubs. No `console.log` placeholders.

### Cross-Cutting Compliance (E1–E6 from VALIDATION)

| Check | Status | Evidence |
|-------|--------|----------|
| E1 No v1 imports in any of the 3 pages | ✓ PASS | grep returns 0 matches for `components/ui/\|components/layout/\|layouts/BaseLayout.astro` |
| E2 No `dark:` utilities | ✓ PASS | grep returns 0 matches |
| E3 No v1 tokens | ✓ PASS | `node tests/check-token-collision.cjs` exits 0 ("checked 45 v1 names, 34 v2 names") |
| E4 No FOUC script | ✓ PASS | grep returns 0 for `localStorage\|prefers-color-scheme\|fonts.googleapis` |
| E5 Production build emits all 3 pages | ✓ PASS | `npm run build` exits 0; dist/faq/index.html, dist/thank-you/index.html, dist/404.html all present |
| E6 Workflow env line added | ✓ PASS | `grep -c "PUBLIC_CALENDLY_URL" .github/workflows/deploy.yml` returns 1 |

### Human Verification Required

See `human_verification` block in frontmatter for full details. Six items flagged:

1. **Lighthouse 90+ on PR merge** — Success Criterion #4 second-half; deferred to CI (lighthouserc.json gates).
2. **schema.org validator for FAQPage** — external tool, not in CI; SUMMARY notes structural validity verified by A2 test.
3. **GitHub Secret PUBLIC_CALENDLY_URL value** — Joel-action; placeholder fallback works correctly until set.
4. **Pencil mirror (D-25-22)** — sub-task 3C deferred per plan's explicit contingency clause; .pen file unchanged from May 14.
5. **Visual review on all 3 routes** — font scale, spacing, no FOUC, light-mode-only enforcement.
6. **Playwright suite re-run** — 25-02 SUMMARY documents an environment-induced race (stale dev server); re-run in clean env or CI recommended for sign-off confidence.

### Gaps Summary

**No blocking gaps.** All 3 LEAF requirements (LEAF-01, LEAF-02, LEAF-03) and all 4 ROADMAP Success Criteria are satisfied at the code level. The phase ships exactly what it promised:

- `/faq` is now a v2 page with Crito banner + native divider-list accordion + FAQPage JSON-LD + CTA banner
- `/thank-you` is now a v2 page with elevated Card + env-var Calendly + sentence-case h1 (fixed double-suffix title bug as a fix-as-you-touch)
- `/404` is a brand-new v2 page with hero numeral + 4-card destination grid + noindex + link-variant contact CTA
- Wave 0 test scaffold (`tests/accessibility/v2-leaf.spec.ts`) covers all 3 routes with axe-core under WCAG 2.x AA, structural JSON-LD assertions, keyboard accordion toggle, chevron rotation, and CTA href verification
- `.github/workflows/deploy.yml` is wired for `PUBLIC_CALENDLY_URL`
- No v1 imports, no dark mode utilities, no FOUC, no Google Fonts CDN, no uppercase headings, no token collisions, no phase-25-introduced astro check errors

**Acknowledged deferral (NOT a gap):** D-25-22 Pencil mirror (sub-task 3C) was deferred because Pencil MCP tools were not invocable in the executor's tool schema during Plan 25-02 execution. The plan's explicit contingency clause permits this ("If Pencil MCP is unavailable in the execution environment, log the omission in the SUMMARY.md and flag for manual completion; do not block the phase"). 25-02-SUMMARY documents this transparently in the "Pending Manual Completion #2" section with detailed instructions for completing the mirror via Pencil app or a properly-tooled MCP environment. This is flagged for human action, not as a re-plan gap.

---

*Verified: 2026-05-21T19:30:00Z*
*Verifier: Claude (gsd-verifier)*
