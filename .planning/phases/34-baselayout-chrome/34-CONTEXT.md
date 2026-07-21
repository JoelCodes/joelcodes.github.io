# Phase 34: BaseLayout + Chrome - Context

**Gathered:** 2026-07-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Every page in the site gets the Wavelength chrome: a Site Header per Figma (waveform mark + wordmark, nav Services `/#services` / Showcase / About `/#about` / Book-a-call CTA), a Site Footer per Figma (mark + wordmark, italic tagline, supporting line, nav, contact email, copyright), and FOUC-safe dark-mode infrastructure (CHROME-01–04). Chrome ships site-wide immediately — old neobrutalist page bodies temporarily render inside the new chrome until their own phases restyle or remove them. The phase also absorbs two small adjacent changes decided in discussion: minimal redirects for the orphaned `/projects` and `/faq` pages, and gating the blog (link AND pages) out of production builds. Gated by Figma-vs-rendered screenshot comparison for SiteHeader (desktop + mobile) and SiteFooter before the phase is marked done.

**Roadmap amendments from this discussion** (planner must treat these as superseding the original success criteria):
- Success criterion 3 (mobile nav "opens/closes correctly") is amended — there is NO mobile menu; the Figma mobile bar is literal (see D-01).
- Success criteria 1–2's theme-toggle requirement is amended — NO visible toggle ships this phase (see D-05/D-06); CHROME-01's "theme toggle usable in both header states" is deferred.
- Success criterion 4's "present in DOM, not in the mobile nav overlay" is amended — the Blog link is gated to dev builds only (see D-11), and there is no mobile overlay.
- Phase 37's `mailto:me@joelshinness.com` criterion is amended to `contact@joelshinness.com` (see D-08).
- The milestone-level "blog URLs stable / sitemap intact" constraint is REVERSED (see D-13) — PROJECT.md and Phase 38/40 criteria need updating at the next evolution point.

</domain>

<decisions>
## Implementation Decisions

### Mobile navigation
- **D-01:** **Follow Figma literally — no hamburger menu.** The mobile header (symbol `42:47`) is mark + Showcase link + Book-a-call button. No slide-in panel, no menu toggle. Services/About anchors stay reachable via the footer nav (Figma's mobile footer includes the full nav). The existing `MobileNav.astro` pattern is not carried forward.
- **D-02:** **Mark only at mobile width.** The Figma mobile bar overflows at 390px (wordmark collides with Showcase; CTA clips) — treated as a design artifact. At the mobile breakpoint the wordmark text drops; the waveform mark alone is the home link. Desktop keeps mark + full "Joel Shinness Solutions" wordmark.
- **D-03:** **Redirects pulled into this phase:** `/projects` → `/showcase`, `/faq` → `/`. User accepted that `/showcase` doesn't exist until Phase 38; sequencing to avoid shipping a dead redirect (e.g., pointing `/projects` at `/` until Phase 38, or landing the redirect with Phase 38) is planner's discretion — the locked intent is: no orphaned old pages in nav-less limbo.
- **D-04:** Old Blog/Projects/FAQ header links disappear site-wide when the new chrome lands — accepted; the redirects above are the mitigation.

### Dark mode / theme toggle
- **D-05:** **No theme toggle this phase.** The site follows `prefers-color-scheme` only. A visible toggle is a deferred, later addition. This amends CHROME-01.
- **D-06:** **System-only, class-based flip stays.** The `<head>` `is:inline` script sets `.dark` purely from `prefers-color-scheme` — stale `localStorage.theme` values from the old site are ignored/cleared. The Phase 33 semantic token flip under `.dark` is unchanged, so adding a toggle later is trivial. No matchMedia live-listener required (load-time evaluation is sufficient).

### Footer content
- **D-07:** **Email is `contact@joelshinness.com`** — Figma copy shipped verbatim. Joel sets up this alias before launch.
- **D-08:** **Site-wide address.** `contact@joelshinness.com` is THE contact address everywhere: footer, future mailto CTAs, JSON-LD. Phase 37's `mailto:me@joelshinness.com` criterion is amended accordingly.
- **D-09:** **GitHub text link only** (per Figma: "contact@joelshinness.com · GitHub"). LinkedIn and Substack icons drop out of the chrome entirely. Planner confirms Joel's actual GitHub URL during planning (flag if not discoverable from repo git config/remotes).
- **D-10:** **Copyright: `© {currentYear} Joel Shinness`** — Figma wording with build-time dynamic year. "All rights reserved" and the "Built with Astro" credit drop.

### Blog dev-only mechanics
- **D-11:** **Blog link renders in dev builds only** (`import.meta.env.DEV`). Production DOM contains no Blog link anywhere — chrome matches Figma exactly.
- **D-12:** **Placement in dev builds: header + footer nav** (per CHROME-02/03). On the mobile bar there's no room — footer only at mobile width.
- **D-13:** **Blog pages excluded from production builds entirely** (this phase, not Phase 38). In prod: `/blog/*` returns 404, posts leave the sitemap. User explicitly confirmed reversing the "blog URLs stable / SEO value" milestone decision — SEO value knowingly sacrificed while the blog is dev-only. Dev builds keep the blog fully working so Phase 38 can restyle it.

### Claude's Discretion
- Header scroll behavior (sticky vs static, scrolled-state treatment) — current header is sticky; Figma is a static frame. Planner decides; screenshot gate verifies at-rest appearance only.
- Component file strategy (rebuild `Header.astro`/`Footer.astro` in place vs new `SiteHeader.astro`/`SiteFooter.astro`) — either is fine; old components are dead code for Phase 41 cleanup if replaced.
- Exact breakpoint where the wordmark drops / mobile bar layout kicks in (Figma specs 390 and 1440 header symbols only).
- Mechanism for excluding blog pages from prod (empty `getStaticPaths` in prod, `import.meta.env.PROD` guards, sitemap filter — whatever is cleanest and keeps dev builds intact).
- Google Fonts removal timing if it interacts with this phase's BaseLayout edits (carry-over discretion from Phase 33).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design source of truth (Figma, via figma-desktop MCP — file must be open in Figma desktop)
- Figma file `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration":
  - Site Header frame `42:50` — Desktop symbol `42:29` (1440×64), Mobile symbol `42:47` (390×64)
  - Site Footer frame `42:105` — Desktop symbol `42:77` (1440×261), Mobile symbol `42:104` (390×279)
  - CTA Button `39:31` (Book-a-call uses Solid variant `39:15`; Small `39:30` likely for header)
  - Landing mockups `12:2` (light) and `117:103` (dark) — chrome in page context, dark-mode chrome values
- `.planning/PROJECT.md` — palette, IA decisions, constraints (gaps flagged never invented)

### Requirements & prior decisions
- `.planning/REQUIREMENTS.md` — CHROME-01…04 exact wording (note amendments in `<domain>` above)
- `.planning/phases/33-token-foundation-fonts/33-CONTEXT.md` — token naming (D-02), dark flip mechanism (D-01), type ramp utilities (D-05–08), WaveMark decision (D-13)
- `.planning/research/SUMMARY.md` + `.planning/research/PITFALLS.md` — dark FOUC pitfall, fidelity-drift discipline

### Files this phase touches
- `src/layouts/BaseLayout.astro` — FOUC script (lines 61-69) simplifies to system-only; Google Fonts block (lines 41-59) still present; Header/Footer imports
- `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`, `src/components/layout/MobileNav.astro` — current neobrutalist chrome being replaced (MobileNav has no successor)
- `src/components/WaveMark.astro` — existing inline-SVG mark from Phase 33, reuse in header/footer
- `src/styles/global.css` — `--wl-*` tokens + `.wl-*` type ramp (lines ~9+); `--wl-accent-soft-text` is paper-only (AA caveat)
- `src/pages/blog/` + sitemap config in `astro.config.mjs` — prod exclusion (D-13)
- `src/pages/projects/`, `src/pages/faq.astro` (or equivalent) — redirect targets (D-03)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/WaveMark.astro` — theme-adaptive inline-SVG waveform mark (Phase 33), drops straight into header/footer
- `--wl-*` tokens + `.wl-*` composite type utilities in `global.css` — footer tagline is Accent/Kicker-style Fraunces italic; nav labels are Hanken Grotesk
- FOUC `is:inline` script slot in `BaseLayout.astro` head — edit in place to system-only
- Self-hosted font preloads (Phase 33) already in BaseLayout — untouched

### Established Patterns
- Dark mode = `.dark` class on `<html>` + `@custom-variant dark` + semantic token flip (Phase 33 D-01) — chrome components use each token once, no `dark:` pairs for wl colors
- Namespace isolation: old neobrutalist tokens/components stay alive until Phase 41 — new chrome must not touch old token definitions
- Astro components with `<script>` blocks for interactivity — though with no hamburger and no toggle, the new chrome may need zero client JS

### Integration Points
- `BaseLayout.astro` `<body>` — swap Header/Footer imports; all pages inherit automatically
- `astro.config.mjs` — `redirects` map for `/projects` and `/faq`; sitemap integration filter for blog exclusion
- Old `Header.astro`/`Footer.astro`/`MobileNav.astro` become dead code → Phase 41 cleanup list

</code_context>

<specifics>
## Specific Ideas

- Figma footer bottom row reads "contact@joelshinness.com · GitHub" — replicate that exact composition (email text link, interpunct, GitHub text link), not icon buttons
- Figma footer tagline is the italic Fraunces "On your wavelength." followed by "Solutions for small businesses — web, automations, and AI that save you time and money." — verbatim copy
- The screenshot fidelity gate must account for the two approved deviations: no theme toggle (matches Figma, which never had one) and mark-only mobile wordmark (deviation FROM Figma, user-approved due to overflow)

</specifics>

<deferred>
## Deferred Ideas

- **Visible theme toggle** — deferred from this phase; site follows `prefers-color-scheme` until a toggle is designed (ideally added to the Figma header components first) and built in a later phase
- **LinkedIn / Substack / Instagram links** — dropped from chrome per Figma fidelity; if Joel wants socials back, that's a Figma design change first (relates to the standing "add real social links" todo)
- **Blog's return to production** — when the blog comes back, restore pages + sitemap and un-gate the link; Phase 38 restyles it in dev in the meantime

</deferred>

---

*Phase: 34-baselayout-chrome*
*Context gathered: 2026-07-15*
