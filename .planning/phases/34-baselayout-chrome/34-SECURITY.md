---
phase: 34-baselayout-chrome
asvs_level: L1
audit_date: 2026-07-15
auditor: gsd-security-auditor
threats_total: 6
threats_closed: 6
threats_open: 0
verdict: SECURED
---

# Security Audit — Phase 34: BaseLayout Chrome

**Phase:** 34 — baselayout-chrome
**ASVS Level:** L1
**Threats Closed:** 6/6
**Audit Date:** 2026-07-15

---

## Threat Verification

| Threat ID | Category | Disposition | Status | Evidence |
|-----------|----------|-------------|--------|----------|
| T-01 | Tampering (false-green test) | mitigate | CLOSED | `tests/accessibility/dark-mode.spec.ts:23` — `await expect(html).toHaveClass(/dark/)` present; zero `theme-toggle` references (file confirmed); colorScheme context used throughout |
| T-02 | Information integrity (AA contrast) | mitigate | CLOSED | `scripts/check-contrast.mjs` invoked; ratios recorded in `34-02-SUMMARY.md` Footer Contrast Report: #8FB4B2 on #0D2A31 = 6.71:1 (PASS, not the estimated 3.2:1); all 5 pairs exceed AA 4.5:1; no Figma hex altered |
| T-03 | Open redirect / unintended content exposure | mitigate | CLOSED | `/faq` redirect target is static internal `/` (`astro.config.mjs:77`); blog removed via BOTH gates: `src/pages/blog/[slug].astro:8` (`if (import.meta.env.PROD) return []`), `src/pages/blog/tags/[tag].astro:8` (same), `src/pages/blog/index.astro:8-9` (`Astro.redirect('/')`), AND `astro.config.mjs:99` (`filter: (page) => !page.includes('/blog')`); `dist/sitemap-0.xml` contains zero "blog" matches; `src/pages/faq.astro` deleted |
| T-04 | Reverse-tabnabbing (ASVS V13.2-adjacent) | mitigate | CLOSED | `src/components/layout/SiteFooter.astro:94-96` — `target="_blank" rel="noopener noreferrer"` present on GitHub link; cleartext `mailto:contact@joelshinness.com` is ACCEPTED per D-07/D-08 (documented below) |
| T-05 | XSS sink / FOUC correctness | mitigate | CLOSED | `src/layouts/BaseLayout.astro:63` — `<script is:inline>` at line 63, `</head>` at line 75 (inline before head close, no defer, no type=module); script contains only static literals (`delete localStorage.theme`, `window.matchMedia`, `classList.add('dark')`); zero `${}` interpolation; no untrusted values |
| T-06 | Gate integrity | mitigate | CLOSED | `.planning/phases/34-baselayout-chrome/34-REVIEW.md` exists with `status: APPROVED`; "Approved Deviations" section explicitly lists D-02 (mark-only mobile wordmark) and D-05 (no theme toggle) with D-references; Joel's sign-off present dated 2026-07-15 |

---

## Accepted Risks

| Risk | Reference | Rationale |
|------|-----------|-----------|
| Cleartext `mailto:contact@joelshinness.com` in SiteFooter | D-07 / D-08 (34-04 PLAN threat_model) | Public business contact address; intentional site-wide disclosure. Accepted by Joel as a business decision. Not a vulnerability to mitigate. |

---

## Unregistered Flags

None. No `## Threat Flags` section was found in any of the six SUMMARY files (34-01 through 34-06). No new attack surface was raised by the executor during implementation that lacks a threat mapping.

---

## Verification Notes

### T-01 Detail
The dark-mode spec drives all dark-mode tests via `browser.newContext({ colorScheme: 'dark' })` (line 17, 37). The homepage dark test asserts `await expect(html).toHaveClass(/dark/)` at line 23 — this is the declared false-green guard. The projects dark test omits the class assertion per the executor decision recorded in 34-01-SUMMARY (the homepage is the canonical FOUC verification point). This is an acceptable scope reduction; the homepage assertion is the minimum required to detect a FOUC regression.

### T-02 Detail
The contrast report in 34-02-SUMMARY.md records all five pairs computed via `scripts/check-contrast.mjs`. The borderline pair identified in the threat (#8FB4B2 copyright/muted on #0D2A31) measured 6.71:1 actual — well above the AA 4.5:1 threshold. The UI-SPEC's estimate of ~3.2:1 was wrong; the checker was the authoritative source as required. No Figma hex was altered.

### T-03 Detail
Both mandatory gates are present in code. The redirect target `/faq → /` is a hardcoded string literal (not user-supplied). The dist/sitemap verification confirms zero blog URLs are indexed in the build that was last run. faq.astro deletion confirmed (`ls` returns DELETED).

### T-04 Detail
The GitHub link (`https://github.com/JoelCodes`) is the only `target="_blank"` external link in the new chrome. Grep confirms `rel="noopener noreferrer"` is present at `SiteFooter.astro:96`. The mailto links use `href="mailto:..."` without `target="_blank"` — no opener exposure.

### T-05 Detail
The FOUC script block (BaseLayout.astro lines 63–74) contains: a `try/catch` wrapping the localStorage delete (storage-blocked environments), a `window.matchMedia` check, and `classList.add('dark')`. All values are static string literals. No Astro template expressions (`{}`) appear inside the `<script is:inline>` block. Script position confirmed: line 63 < line 75 (`</head>`).

### T-06 Detail
34-REVIEW.md frontmatter shows `status: APPROVED` and `gate-verdict: APPROVED by Joel (2026-07-15)`. The body contains an "Approved Deviations" section with both D-02 and D-05 explicitly named with their rationale, plus Joel's individual sign-off lines for GC-01, GC-02, GC-03, and a final gate approval statement. The gate is not falsely passed — the deviations are documented, not omitted.
