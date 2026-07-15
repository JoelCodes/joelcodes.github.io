# Phase 34: BaseLayout + Chrome - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-15
**Phase:** 34-baselayout-chrome
**Areas discussed:** Mobile navigation approach, Theme toggle design & placement, Footer content conflicts, Dev-only Blog link mechanics

---

## Mobile navigation approach

| Option | Description | Selected |
|--------|-------------|----------|
| Follow Figma literally | Mobile header = mark + wordmark + Showcase + Book a call, no menu; Services/About reachable via footer nav | ✓ |
| Add a hamburger menu | Keep Figma bar but add hamburger with full nav (invented UI, would need gap sign-off) | |
| Ask in Figma first | Build literal bar now, note hamburger question in FIDELITY-GAPS | |

**User's choice:** Follow Figma literally
**Notes:** Roadmap success criterion 3 ("mobile navigation opens/closes correctly") amended — there is no mobile menu.

| Option | Description | Selected |
|--------|-------------|----------|
| Mark only on mobile | Drop wordmark text at mobile breakpoint; waveform mark is home link | ✓ |
| Shorten to 'Joel Shinness' | Keep text wordmark, drop 'Solutions' | |
| Keep full wordmark, tighten | Treat Figma overflow as sloppy spacing, squeeze everything | |

**User's choice:** Mark only on mobile
**Notes:** Figma mobile bar (42:47) overflows at 390px — treated as design artifact.

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, acceptable | /projects and /faq stay URL-reachable but unlinked until Phases 39-41 | |
| Keep them in footer temporarily | Temporary non-Figma links in new footer | |
| Redirect them now | Redirect old pages (formally Phase 40 territory) | ✓ |

**User's choice:** Redirect them now → follow-up confirmed pulling minimal redirects into Phase 34 (vs deferring to Phase 40).

| Option | Description | Selected |
|--------|-------------|----------|
| /projects→/showcase, /faq→/ | Projects superseded by Showcase; FAQ lands on homepage | ✓ |
| Both → / | Safest during rebuild; re-point later | |
| Project detail pages too | Also map detail URLs | |

**User's choice:** /projects→/showcase, /faq→/
**Notes:** Accepted the caveat that /showcase ships in Phase 38; dead-redirect sequencing left to planner.

---

## Theme toggle design & placement

| Option | Description | Selected |
|--------|-------------|----------|
| Header, after nav | Icon-only button right of Book a call; smallest invention | |
| Footer only | Header stays pixel-identical to Figma | |
| Design it in Figma first | Add toggle to Figma, then build it | |

**User's choice (free text):** "Let's just follow system for now and add a toggle later."
**Notes:** No toggle this phase — amends CHROME-01 and roadmap criterion 2. Toggle noted as deferred idea.

| Option | Description | Selected |
|--------|-------------|----------|
| System only, keep .dark class | Head script sets .dark purely from prefers-color-scheme; clear stale localStorage.theme | ✓ |
| Honor old saved preference | Keep localStorage-then-system logic without a toggle | |
| Live-follow OS changes | System only + matchMedia listener for instant flips | |

**User's choice:** System only, keep .dark class

---

## Footer content conflicts

| Option | Description | Selected |
|--------|-------------|----------|
| me@joelshinness.com | Treat Figma address as placeholder copy | |
| contact@joelshinness.com | Ship Figma copy verbatim; set up the alias before launch | ✓ |

**User's choice:** contact@joelshinness.com

| Option | Description | Selected |
|--------|-------------|----------|
| Site-wide | One address everywhere; amend Phase 37 criterion | ✓ |
| Footer only | Footer shows contact@, CTAs keep me@ | |

**User's choice:** Site-wide

| Option | Description | Selected |
|--------|-------------|----------|
| Figma verbatim: GitHub only | GitHub text link next to email; LinkedIn/Substack drop | ✓ |
| GitHub + keep LinkedIn/Substack | Old socials as extra text links (approved addition) | |
| GitHub + LinkedIn only | Keep professional network, drop Substack | |

**User's choice:** Figma verbatim: GitHub only

| Option | Description | Selected |
|--------|-------------|----------|
| Dynamic year, Figma text | '© {currentYear} Joel Shinness' computed at build | ✓ |
| Figma fully verbatim | Hardcode '© 2026 Joel Shinness' | |
| Keep 'Built with Astro' too | Dynamic year + Astro credit as approved addition | |

**User's choice:** Dynamic year, Figma text

---

## Dev-only Blog link mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Dev builds only | Render Blog link only when import.meta.env.DEV; prod DOM matches Figma | ✓ |
| In prod DOM, de-emphasized | Quiet footer link in production | |
| No link at all | Skip entirely, amend CHROME-02/03 | |

**User's choice:** Dev builds only

| Option | Description | Selected |
|--------|-------------|----------|
| Header + footer | Per CHROME-02/03; mobile dev builds footer-only | ✓ |
| Footer only | Slightly amends CHROME-02 | |

**User's choice:** Header + footer

**User's free-text addition:** "I also don't want blog pages available in the final prod build while they're marked dev-only."

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — pull blog from prod | Blog pages build only in dev; /blog/* 404s in prod, leaves sitemap; reverses 'blog URLs stable' decision | ✓ |
| Keep URLs live, just unlinked | Original plan — no SEO loss | |
| Redirect /blog/* for now | 301 to homepage, preserve some link equity | |

**User's choice:** Yes — pull blog from prod (explicitly confirmed the SEO trade-off)

| Option | Description | Selected |
|--------|-------------|----------|
| Phase 34 now | One coherent 'blog is dev-only' change: link + pages + sitemap | ✓ |
| Phase 38 later | Phase 34 gates link only | |

**User's choice:** Phase 34 now

---

## Claude's Discretion

- Header scroll behavior (sticky vs static, scrolled-state treatment)
- Component file strategy (rebuild in place vs new SiteHeader/SiteFooter files)
- Exact breakpoint where wordmark drops / mobile bar layout kicks in
- Mechanism for excluding blog pages from prod builds
- Google Fonts removal timing if it interacts with BaseLayout edits (Phase 33 carry-over)

## Deferred Ideas

- Visible theme toggle (design in Figma first, build in a later phase)
- LinkedIn / Substack / Instagram links in chrome (Figma design change first)
- Blog's return to production (restore pages + sitemap, un-gate link)
