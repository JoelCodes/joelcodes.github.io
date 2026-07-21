# Phase 40: URL Strategy + IA Cleanup - Research

**Researched:** 2026-07-20
**Domain:** Astro 5 static redirects config + dead-file deletion
**Confidence:** HIGH — all claims verified against installed Astro 5.16.15 source + existing dist/ build artifacts + live file reads

---

## Summary

Phase 40 has two distinct jobs: (1) update the `redirects:` block in `astro.config.mjs` to land correct redirect targets for `/portfolio`, `/projects`, `/contact`, and `/thank-you`; (2) delete the three dead files containing n8n/form code so `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` returns zero. No new code is written; no new dependencies are added.

The project already has a working `redirects:` block (lines 73–79 in `astro.config.mjs`). This phase edits existing entries and adds two new ones. The mechanism is fully understood from the existing `dist/` artifacts (see §Redirect HTML Format below). The installed Astro version (5.16.15) supports all required syntax including external HTTPS URLs.

The three files to be deleted (ContactSection.astro, Services.astro, thank-you.astro) are confirmed orphaned: `grep -rn "ContactSection\|Services\.astro\|thank-you" src/` returns only the `/thank-you` string inside ContactSection.astro itself — no live importer in any page or layout.

The `PUBLIC_N8N_WEBHOOK_URL` environment variable lives in three locations: (a) `.env` (gitignored, local only), (b) `.github/workflows/deploy.yml` line 36 (tracked source — needs cleanup), and (c) `src/components/homepage/ContactSection.astro` (to be deleted). After deleting ContactSection.astro and removing the env line from deploy.yml, the variable is fully purged from source.

**Primary recommendation:** Edit `astro.config.mjs` redirects first, run `npm run build`, verify with the grep patterns below against `dist/`, then delete the three orphan files, then remove the deploy.yml env line, then re-run `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` to confirm zero.

---

## Standard Stack

No new libraries. All work is pure config edits and file deletions.

### Existing mechanism (already in repo)

| Item | Version/Location | Purpose |
|------|-----------------|---------|
| `astro.config.mjs` `redirects:` block | Astro 5.16.15 built-in | Maps old routes to new destinations |
| `build.redirects` default | `true` (Astro default) | Outputs HTML meta-refresh files during `astro build` |
| `@astrojs/sitemap` | 3.7.0 | Sitemap generation with `filter()` already excluding redirect stubs |

---

## Architecture Patterns

### How Astro Static Redirects Work (verified against dist/)

Astro's `redirects:` config (with `output: 'static'` and no adapter) generates HTML files at build time. Each redirect entry produces a file at `dist/{route}/index.html` containing:

```html
<!doctype html><title>Redirecting to: {destination}</title><meta http-equiv="refresh" content="0;url={destination}"><meta name="robots" content="noindex"><link rel="canonical" href="{site}{destination}"><body>	<a href="{destination}">Redirecting from <code>/{route}/</code> to <code>{destination}</code></a></body>
```

**Verified from actual dist/ artifacts:**
- `dist/portfolio/index.html` — `url=/` (current entry, redirects to `/`)
- `dist/contact/index.html` — `url=/#contact` (current entry, redirects to `/#contact`)
- `dist/faq/index.html` — `url=/` (current entry, correct)

**Key properties of the generated page:**
- `meta name="robots" content="noindex"` — redirect stubs are self-noindexed, search engines ignore them
- `link rel="canonical"` points at `site.url + destination`
- The `<meta http-equiv="refresh" content="0;url=...">` triggers immediate browser redirect
- HTTP status code is NOT emitted (this is a static HTML file, no server)
- The `status:` field in object form is silently ignored for static builds — Astro docs confirm: "does not support status codes" for static mode

### Redirect Config Syntax (Astro 5)

**String form (internal path):**
```js
redirects: {
  '/portfolio': '/showcase',    // string → internal path
}
```

**String form (external URL — requires Astro ≥ 5.2.0):**
```js
redirects: {
  '/contact': 'https://calendly.com/discovery-joelshinness/discovery-call',
}
```

Astro 5.16.15 is installed — well above the 5.2.0 threshold. External https:// URLs are supported.

**Object form (status code — ignored in static mode):**
```js
redirects: {
  '/old': { status: 301, destination: '/new' },
}
```

The `status:` field has no effect in `output: 'static'` mode without an adapter. Do not use the object form here; it adds noise with no benefit.

### The Complete Redirects Block After This Phase

```js
redirects: {
  '/portfolio': '/showcase',
  // Note: '/portfolio/[slug]' redirect omitted — Astro static mode cannot redirect a
  // dynamic segment to a fixed URL; /portfolio/anything 404s.
  '/projects': '/showcase',
  // Note: '/projects/[slug]' redirect omitted — same reason.
  '/contact': 'https://calendly.com/discovery-joelshinness/discovery-call',
  '/faq': '/',
  '/thank-you': '/',
},
```

The `BOOKING_URL` constant (`src/lib/constants.ts` line 14) holds the exact same Calendly URL. `astro.config.mjs` cannot `import` from `src/` at runtime (it is a Vite config, not an Astro page), so the URL must be hardcoded as a string literal. The plan must include a comment flagging it to stay in sync with `BOOKING_URL`.

### Why Dynamic [slug] Redirects Are Omitted (D-02)

Astro 5 static mode raises `GetStaticPathsRequired` when a `redirects:` entry has a dynamic segment (`[slug]`) on the source side but the destination is a fixed path (not a same-param route). This is because static builds need `getStaticPaths()` to enumerate all possible values of `[slug]` at build time — and a fixed destination provides no such enumeration.

**Verified from repo history:** `astro.config.mjs` line ~75 contains the comment documenting this exact failure for `/portfolio/[slug]`, added in Phase 36-02. `STATE.md` line 101 records it verbatim:
> "Astro 5 static mode cannot redirect a dynamic segment `[param]` to a fixed URL — `/portfolio/[slug]`: `/` raises GetStaticPathsRequired; entry must be omitted."

**Correct resolution:** Simply omit the entries for `/portfolio/[slug]` and `/projects/[slug]`. Those URLs 404. This is the accepted behavior per D-02.

### Sitemap Interaction

**Verified from existing `dist/sitemap-0.xml`:** The three current redirect stubs (`/portfolio`, `/contact`, `/faq`) do NOT appear in the sitemap. The `@astrojs/sitemap` integration already excludes them — the redirect stub pages carry `<meta name="robots" content="noindex">` and Astro's sitemap integration does not add redirect-generated pages.

After this phase:
- `/thank-you` will be deleted AND replaced by a redirect stub. The real page currently appears in `sitemap-0.xml` (verified). After deletion and redirect replacement, it will drop out of the sitemap automatically (same behavior as existing redirect stubs).
- `/projects` will produce a new redirect stub — it will not appear in the sitemap.
- No `filter()` changes are needed in `astro.config.mjs`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Client-side redirect for old URLs | Custom middleware or script | `astro.config.mjs` `redirects:` block | Already exists in this repo; produces noindex meta-refresh HTML at build time |
| Status code enforcement | Custom 301 headers file | Accept meta-refresh | GitHub Pages has no server; there is no mechanism to serve HTTP 301s |
| Sitemap exclusion of redirect stubs | Additional `filter()` entry | Nothing needed | Astro already excludes redirect stubs; existing build proves this |

---

## Common Pitfalls

### Pitfall 1: External URL Not Supported Before Astro 5.2.0

**What goes wrong:** Adding an external `https://` URL to `redirects:` on Astro < 5.2.0 silently fails or throws at build time.

**Why it matters here:** D-04 routes `/contact` to the Calendly BOOKING_URL (external https://).

**Avoidance:** Confirmed non-issue. Installed Astro is 5.16.15 (>> 5.2.0). The external URL syntax works.

**Warning signs at build time:** Build error mentioning "not a valid redirect destination" or "cannot parse URL" would indicate a version problem.

### Pitfall 2: astro.config.mjs Cannot Import from src/

**What goes wrong:** Attempting to `import { BOOKING_URL } from './src/lib/constants.ts'` in `astro.config.mjs` fails — `astro.config.mjs` is a Vite-level config file, not a compiled Astro module; TypeScript resolution does not apply the same way.

**Correct approach:** Hardcode the Calendly URL as a string literal in `astro.config.mjs` with a JSDoc comment:
```js
// Keep in sync with BOOKING_URL in src/lib/constants.ts
'/contact': 'https://calendly.com/discovery-joelshinness/discovery-call',
```

**Warning signs:** Build error "Cannot find module './src/lib/constants.ts'" or TypeScript type errors at the config level.

### Pitfall 3: Deleting thank-you.astro Before Adding the Redirect

**What goes wrong:** If `src/pages/thank-you.astro` is deleted before `'/thank-you': '/'` is added to `redirects:`, the route hard 404s during the brief window before the next build.

**D-08 mandate:** Add redirect first, confirm in build output (`dist/thank-you/index.html` exists with meta-refresh to `/`), then delete the source file. Since faq/projects are already deleted (commit 933e2f7), only `thank-you.astro` requires this sequencing discipline.

### Pitfall 4: Status Code Confusion

**What goes wrong:** Adding `{ status: 301, destination: '/showcase' }` to redirect entries expecting HTTP 301 behavior on GitHub Pages.

**Reality:** `output: 'static'` with no adapter → HTML meta-refresh only. Status codes are silently ignored. Astro docs: "does not support status codes" for static builds. The `meta name="robots" content="noindex"` on the stub page serves the same purpose (prevents Google from indexing the old URL).

**Correct approach:** Use the plain string form for all entries.

### Pitfall 5: SC-4 grep Scope is src/ Only

**What goes wrong:** Running `grep -r "n8n\|hp-form\|PUBLIC_N8N" .` instead of `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` — the former hits `.env`, `.planning/`, ROADMAP.md, MILESTONES.md etc. which legitimately mention n8n in historical context.

**Correct grep:** `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` — scoped to `src/` directory only.

**After deletions, this must return zero.** Currently returns:
- `src/components/Services.astro:19` — "n8n" in copy
- `src/components/homepage/ContactSection.astro:165` — `hp-form-error` id
- `src/components/homepage/ContactSection.astro:210` — `hp-form-error` getElementById
- `src/components/homepage/ContactSection.astro:213` — "n8n webhook" comment
- `src/components/homepage/ContactSection.astro:214` — `PUBLIC_N8N_WEBHOOK_URL` env access

All five hits reside in the three D-06 files being deleted. Zero remaining hits after deletion is confirmed achievable.

### Pitfall 6: deploy.yml Still References PUBLIC_N8N_WEBHOOK_URL

**What goes wrong:** SC-3 says `PUBLIC_N8N_WEBHOOK_URL` is "removed from documentation." The ROADMAP's SC-3 text says "it may remain as a deployment secret but is no longer referenced in source code." However, `.github/workflows/deploy.yml` line 36 passes it as an env var to the build step:
```yaml
PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.PUBLIC_N8N_WEBHOOK_URL }}
```

After deleting ContactSection.astro, this env var is no longer used in any source file. The ROADMAP language ("may remain as a deployment secret") arguably permits leaving deploy.yml unchanged. However, leaving a dead `env:` line that references a secret for a deleted feature is confusing and wastes a GitHub Actions secret slot.

**Decision for planner:** Remove the `PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.PUBLIC_N8N_WEBHOOK_URL }}` line from `.github/workflows/deploy.yml`. This is strictly additive to the SC-3 cleanup and keeps the repo consistent. The `.env` file (gitignored, local) does not need to change — it is not tracked source.

### Pitfall 7: Verify Orphan Status Before Deletion (D-07)

**Context says:** "confirmed orphaned as of this discussion, but re-verify at execution time."

**Verification run (performed during research):**
```
grep -rn "ContactSection\|Services\.astro\|from.*Services\b\|from.*ContactSection" src/
```
→ Zero results. No live file imports any of the three D-06 files.

The `/thank-you` string appears only inside `ContactSection.astro:366` (`window.location.href = '/thank-you'`). That file is itself being deleted. No other file references `/thank-you` as a navigation destination.

---

## Code Examples

### Exact Redirect HTML Format (from dist/ artifacts)

`dist/portfolio/index.html` (current):
```html
<!doctype html><title>Redirecting to: /</title><meta http-equiv="refresh" content="0;url=/"><meta name="robots" content="noindex"><link rel="canonical" href="https://joelshinness.com/"><body>	<a href="/">Redirecting from <code>/portfolio/</code> to <code>/</code></a></body>
```

After this phase, `dist/portfolio/index.html` will differ only in the destination (`/showcase` instead of `/`). Same template, different `url=` value.

### Grep to Confirm a Redirect Stub Exists (post-build)

```bash
# Pattern: meta http-equiv="refresh" present AND destination is correct
grep -l 'http-equiv="refresh"' dist/portfolio/index.html
grep -l 'http-equiv="refresh"' dist/projects/index.html
grep -l 'http-equiv="refresh"' dist/contact/index.html
grep -l 'http-equiv="refresh"' dist/thank-you/index.html
grep -l 'http-equiv="refresh"' dist/faq/index.html

# Verify destination values
grep 'url=/showcase' dist/portfolio/index.html
grep 'url=/showcase' dist/projects/index.html
grep 'url=https://calendly.com' dist/contact/index.html
grep 'url=/' dist/thank-you/index.html
grep 'url=/' dist/faq/index.html
```

### SC-4 grep (must return zero after deletions)

```bash
grep -r "n8n\|hp-form\|PUBLIC_N8N" src/
```

---

## State of the Art

| Old State (pre-Phase 40) | New State (post-Phase 40) | Impact |
|--------------------------|--------------------------|--------|
| `/portfolio` → `/` | `/portfolio` → `/showcase` | Correctly routes to the successor surface |
| `/contact` → `/#contact` | `/contact` → Calendly BOOKING_URL | Routes to live booking action; dead anchor eliminated |
| `/projects` not in redirects block | `/projects` → `/showcase` | New entry covering deleted v1 route family |
| `/thank-you` → real page (in sitemap) | `/thank-you` → `/` (redirect stub, not in sitemap) | Safe landing for stale links; form page removed |
| ContactSection.astro imports PUBLIC_N8N_WEBHOOK_URL | File deleted | n8n dependency fully removed from source |
| deploy.yml passes PUBLIC_N8N_WEBHOOK_URL secret | Line removed | Dead secret reference cleaned up |

---

## Validation Architecture

The following table maps each success criterion to a concrete, executable verification step. This is designed for downstream validation (VALIDATION.md).

| Claim | How to Verify | Expected Result |
|-------|--------------|-----------------|
| **SC-1a** `/portfolio` redirect stub exists | `test -f dist/portfolio/index.html` | Exit 0 |
| **SC-1b** `/portfolio` redirects to `/showcase` | `grep -q 'url=/showcase' dist/portfolio/index.html` | Exit 0 |
| **SC-1c** `/projects` redirect stub exists | `test -f dist/projects/index.html` | Exit 0 |
| **SC-1d** `/projects` redirects to `/showcase` | `grep -q 'url=/showcase' dist/projects/index.html` | Exit 0 |
| **SC-1e** `/contact` redirect stub exists | `test -f dist/contact/index.html` | Exit 0 |
| **SC-1f** `/contact` redirects to Calendly | `grep -q 'url=https://calendly.com' dist/contact/index.html` | Exit 0 |
| **SC-1g** `/thank-you` redirect stub exists | `test -f dist/thank-you/index.html` | Exit 0 |
| **SC-1h** `/thank-you` redirects to `/` | `grep -q 'url=/' dist/thank-you/index.html` | Exit 0 |
| **SC-1i** `/faq` stub still redirects to `/` | `grep -q 'url=/' dist/faq/index.html` | Exit 0 |
| **SC-1j** All stubs have noindex | `grep -q 'noindex' dist/projects/index.html` (repeat for each) | Exit 0 |
| **SC-2a** `thank-you.astro` deleted | `test ! -f src/pages/thank-you.astro` | Exit 0 |
| **SC-2b** (already done) faq.astro deleted | `test ! -f src/pages/faq.astro` | Exit 0 |
| **SC-2c** (already done) projects pages deleted | `test ! -d src/pages/projects` | Exit 0 |
| **SC-3a** No `PUBLIC_N8N_WEBHOOK_URL` in deploy.yml | `grep -c 'PUBLIC_N8N_WEBHOOK_URL' .github/workflows/deploy.yml` | Returns `0` |
| **SC-3b** `ContactSection.astro` deleted | `test ! -f src/components/homepage/ContactSection.astro` | Exit 0 |
| **SC-3c** `Services.astro` deleted | `test ! -f src/components/Services.astro` | Exit 0 |
| **SC-4** Zero n8n/hp-form/PUBLIC_N8N in src/ | `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` | Zero output, exit 0 |
| **IA-01** `/projects` not a dynamic entry | `grep '/projects/\[slug\]' astro.config.mjs` | Zero output (omitted) |
| **Sitemap clean** redirect stubs not in sitemap | `grep -E 'portfolio|projects|contact|thank-you|/faq' dist/sitemap-0.xml` | Zero output |

**Build test integration:** The existing `tests/build/ia-01-build-output.test.mjs` script (run via `npm run test:build`) provides a pattern for assertion-based verification. A new set of assertions for Phase 40 can be added to this file or placed in a new `tests/build/ia-01-phase40.test.mjs`. The existing script already tests faq redirect (SC-1i) — those assertions should continue passing.

---

## Open Questions

1. **deploy.yml env line: remove or leave?**
   - What we know: After ContactSection.astro is deleted, `PUBLIC_N8N_WEBHOOK_URL` is unused by the build. SC-3 says "may remain as a deployment secret." The deploy.yml line is in tracked source.
   - What's unclear: Whether SC-3's "removed from documentation" was intended to cover deploy.yml. The line is not "documentation" in the prose sense.
   - Recommendation: Remove it. A dead env var injection referencing a deleted feature confuses future maintainers. The GitHub repo secret can stay; only the workflow reference needs removal.

2. **`/contact` destination string: hardcode or TODO comment?**
   - What we know: `astro.config.mjs` cannot import TypeScript constants at config-evaluation time. The string must be a literal.
   - Recommendation: Use a JSDoc comment `// Keep in sync with BOOKING_URL in src/lib/constants.ts` immediately above the `/contact` entry. This is clear and low-ceremony.

---

## Sources

### Primary (HIGH confidence)

- **Actual `dist/` build artifacts** — `dist/portfolio/index.html`, `dist/contact/index.html`, `dist/faq/index.html` read directly; confirm meta-refresh HTML structure, noindex, and that redirect stubs are absent from `dist/sitemap-0.xml`.
- **`astro.config.mjs`** (lines 73–79) — current redirects block; confirmed syntax and existing entries.
- **`src/lib/constants.ts`** (line 14) — `BOOKING_URL = "https://calendly.com/discovery-joelshinness/discovery-call"` is the exact external URL.
- **Astro 5 docs: Routing → Redirects** — `https://docs.astro.build/en/guides/routing/#redirects` — confirms external URL support from v5.2.0, meta-refresh for static builds, status code ignored in static mode, dynamic routes require same-param destination.
- **Astro 5 docs: Configuration Reference → redirects** — `https://docs.astro.build/en/reference/configuration-reference/#redirects` — confirms object form syntax, `build.redirects` default.
- **`node_modules/astro/package.json`** — installed version 5.16.15, above the 5.2.0 threshold.

### Secondary (MEDIUM confidence)

- **`STATE.md` line 101** — project-internal record of `GetStaticPathsRequired` error for dynamic→fixed redirect in Astro static mode; corroborates `astro.config.mjs` comment.
- **`tests/build/ia-01-build-output.test.mjs`** — existing build test pattern (meta-refresh regex, sitemap grep) directly reusable for Phase 40 validation.

### Tertiary (LOW confidence — not needed, all claims verified above)

None. All material claims are grounded in repo artifacts or official Astro docs.

---

## Metadata

**Confidence breakdown:**
- Redirect config syntax: HIGH — verified against official Astro 5 docs and existing dist/ artifacts
- External URL support: HIGH — Astro docs state v5.2.0+; installed version is 5.16.15
- Static HTML format: HIGH — read directly from `dist/portfolio/index.html` and `dist/contact/index.html`
- Orphan file status: HIGH — grep confirms zero importers of all three D-06 files
- n8n grep surface: HIGH — exhaustive grep across src/ with known results
- deploy.yml cleanup: HIGH — line 36 confirmed by direct file read
- Sitemap redirect exclusion: HIGH — verified from `dist/sitemap-0.xml` contents

**Research date:** 2026-07-20
**Valid until:** 2026-09-20 (Astro 5 stable; low risk of redirect API changes in patch versions)
