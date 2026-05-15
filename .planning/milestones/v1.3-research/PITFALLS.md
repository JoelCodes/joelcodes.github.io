# Pitfalls Research

**Domain:** Design System Documentation & Navigation Cleanup for Existing Static Sites
**Researched:** 2026-02-10
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Design System Documentation Becomes Stale Immediately After Creation

**What goes wrong:**
Design system documentation is created as a snapshot, but component implementations continue to evolve in production pages. Within weeks, the documentation shows outdated props, missing variants, or incorrect usage examples. Teams stop trusting the documentation and revert to reading component source code directly.

**Why it happens:**
Documentation is treated as a one-time deliverable rather than a living artifact. There's no clear owner responsible for keeping it synchronized with component changes. Developers update components without updating the reference page. In 2026, design systems still struggle with "design drift" - the biggest cost is detecting and preventing drift before it spreads, not creating the components themselves.

**How to avoid:**
- Place documentation file at `/design-system` (not `/docs` or `/styleguide`) so it's discoverable but clearly internal
- Use `<meta name="robots" content="noindex,nofollow">` to prevent search engine indexing while keeping it accessible to team
- Include "Last Updated" timestamp with Git commit hash in documentation header
- Create checklist in CLAUDE.md: "When updating a component in `/src/components/ui/`, verify `/design-system` examples match"
- Document ALL component variants, props, and usage patterns discovered during audit phase
- Include both correct usage examples AND common misuse examples with explanations
- Add component version tracking (even informally: "Button v1.0 - initial", "Button v1.1 - added size variants")

**Warning signs:**
- Documentation examples throw TypeScript errors when copy-pasted
- Props listed in documentation don't match component interface definitions
- Production pages use component patterns not documented
- Developers ask questions about components instead of checking documentation
- Multiple "versions" of same component exist across pages with different implementations

**Phase to address:**
Phase 1 (Design System Reference Page) — Establish documentation structure with built-in maintenance reminders
Phase 2 (Component Consistency Audit) — Verify documentation matches reality before relying on it

---

### Pitfall 2: Component Audit Discovers Inconsistencies But Creates "Fix Everything" Paralysis

**What goes wrong:**
The audit reveals 15+ component usage inconsistencies: `BlogCard` and `ProjectCard` have duplicate shadow implementations, buttons use mix of `btn-` classes and inline Tailwind, spacing varies between pages. Team attempts to "fix everything at once" and creates massive, risky PRs that break existing functionality or introduce subtle visual regressions.

**Why it happens:**
Audit findings are treated as a to-do list requiring 100% completion rather than a prioritized backlog. Fear of "leaving technical debt" drives over-correction. No clear definition of "acceptable inconsistency" vs "critical standardization." Teams should "audit each component and leave the garbage out" rather than transferring all existing patterns to the new system.

**How to avoid:**
- **Tier findings into severity levels:**
  - **CRITICAL:** Component implementations that differ in accessibility (e.g., focus states, ARIA attributes) — Must fix
  - **HIGH:** Visual inconsistencies users would notice (shadow offsets, border widths, color variants) — Should standardize
  - **MEDIUM:** Code organization issues (inline styles vs utility classes) — Nice to have
  - **LOW:** Naming convention variations that don't affect output — Defer
- **One component type per PR:** Standardize all Button usage in PR #1, all Card usage in PR #2
- **Visual regression testing:** Take screenshots before/after for each page affected by component changes
- **Accept "80% consistent is shipping":** Perfect consistency is less valuable than consistent, documented patterns going forward
- **Create tiered task list:** Organize audit findings by status (ready to fix, awaiting discussion) to aid prioritization

**Warning signs:**
- PR touches more than 3 component files simultaneously
- Team debates "the right way" for >30 minutes without documenting options
- Audit findings doc grows to >20 items without prioritization
- Discussion of "rewriting everything to be cleaner"
- Beta components accumulate long version histories without migration to newer versions

**Phase to address:**
Phase 2 (Component Consistency Audit) — Establish severity tiers BEFORE audit begins
Phase 3 (Component Migration) — Apply tiered approach, ship incrementally

---

### Pitfall 3: Astro Static Redirects Are Client-Side Meta Refresh, Not True 301s

**What goes wrong:**
Project adds `/contact: "/#contact"` to `astro.config.mjs` redirects, assuming it creates HTTP 301 redirect. In reality, Astro generates HTML file at `/contact/index.html` with `<meta http-equiv="refresh">` tag. Search engines initially see 200 OK response, then parse meta tag. Link juice doesn't transfer cleanly, and some crawlers treat this as soft 404. Users on slow connections see flash of redirect page.

**Why it happens:**
Astro's documentation states "produces a client redirect using `<meta http-equiv='refresh'>`" for static builds, but developers assume "redirect" means HTTP-level redirect. GitHub Pages is purely static hosting with no server-side redirect capability - you give it a directory of files, and it'll serve them with no server-side computation. The redirect works functionally (users end up at destination) but fails SEO/UX expectations.

**How to avoid:**
- **Accept meta refresh limitations for internal navigation cleanup:** For `/contact → /#contact`, SEO impact is minimal (both URLs are on same domain, redirect page exists briefly)
- **Verify redirect implementation:** After adding to config, build site and inspect `/contact/index.html` — it should contain meta refresh tag and JavaScript fallback
- **Set aggressive refresh timing:** Astro uses `content="0;url=..."` (0 seconds) by default, which minimizes flash
- **Alternative for critical SEO pages:** If redirecting URLs with significant backlinks, consider keeping original page with canonical link instead of redirect
- **Monitor in Search Console:** Watch for "Page with redirect" warnings in Google Search Console Coverage report
- **Understand status code limitations:** Astro serves redirected GET requests with status 301 when using SSR, but static builds cannot support status codes

**Warning signs:**
- Redirect destination appears in browser address bar only after delay
- Google Search Console shows "Duplicate content" warnings for redirect source/destination
- Analytics shows multiple pageviews per session (counts both redirect page and destination)
- Users report "page flashed before redirecting"
- Expecting HTTP 301 behavior but getting meta refresh (check Network tab in DevTools)

**Phase to address:**
Phase 4 (Contact Page Redirect) — Document meta refresh behavior, add visual regression test for redirect page
Phase 5 (Navigation Cleanup) — Ensure header/footer don't link to redirect URLs

---

### Pitfall 4: Navigation Cleanup Creates Broken Internal Links and Orphan Pages

**What goes wrong:**
Team removes `/contact` link from header, updates footer links, but forgets to check: contact form success/error messages that link back to "contact page", blog post CTAs with hardcoded `/contact` URLs, sitemap includes `/contact` as standalone page, mobile nav drawer still has old link structure. After deployment, users clicking "contact" links in blog posts get meta refresh redirect, analytics show broken funnel, and page feels inconsistent.

**Why it happens:**
Navigation cleanup focuses on visible navigation components (Header, Footer) without auditing all internal link references across content, components, and configuration files. Grepping for `/contact` misses anchor links like `/#contact` that should be preferred pattern. Orphan pages (pages not linked from main navigation) are common problems - if a page doesn't include links to another page, Google may have trouble finding and indexing it.

**How to avoid:**
- **Audit ALL link references before cleanup:**
  ```bash
  # Find all href references to old URLs
  grep -r 'href="/contact"' src/
  grep -r "href='/contact'" src/
  # Find all anchor tags (catches template string hrefs)
  grep -r '<a ' src/ | grep contact
  ```
- **Check configuration files:**
  - `astro.config.mjs` — sitemap, redirects
  - `src/content/blog/*.mdx` — any hardcoded contact links in posts
  - `src/components/**/*.astro` — all components with navigation
- **Preferred internal link patterns:**
  - Homepage sections: Always `/#section-id` (works from any page)
  - Pages: Always `/page` (no trailing slash for consistency)
  - External: Always full URL with `rel="noopener"`
- **Test from multiple pages:**
  - Click contact links from: homepage, blog post, project page, 404 page
  - Verify all resolve to `/#contact` correctly
- **Prevent orphan pages:** Ensure no page is more than 3 clicks from homepage

**Warning signs:**
- 404 errors in production logs after deployment
- Analytics funnel shows drop-off at "contact" step
- Users report "contact link doesn't work" from specific pages
- Sitemap.xml lists URLs that redirect or don't exist
- Google Search Console reports "Discovered - currently not indexed" for pages you want indexed

**Phase to address:**
Phase 4 (Contact Page Redirect) — Audit all `/contact` references before adding redirect
Phase 5 (Navigation Cleanup) — Update all navigation components + verify with link crawler

---

### Pitfall 5: Footer Social Icons Fail WCAG Accessibility Without Proper Labels

**What goes wrong:**
Team adds Instagram and Substack icons to footer using SVG `<svg><use>` or Lucide icons, wrapping them in `<a>` tags with `href` but no accessible text label. Screen readers announce "link" or "graphic link" with no indication of destination. Footer fails WCAG 2.4.4 (Link Purpose - In Context) and 1.1.1 (Non-text Content). WCAG 2.2 Level AA is the current accessibility standard applied to websites in the United States in 2026.

**Why it happens:**
Visual designers see icon-only links as cleaner aesthetic. Developers assume icon shape conveys meaning (Instagram logo = Instagram link). Testing with keyboard navigation works (links are focusable), creating false confidence. Screen reader testing is skipped or done after implementation. Social media icons need specific labels like "Follow us on Instagram" instead of generic "Instagram icon."

**How to avoid:**
- **Use visually-hidden span for screen readers:**
  ```astro
  <a href="https://instagram.com/..." class="footer-social-link">
    <Instagram class="w-6 h-6" aria-hidden="true" />
    <span class="sr-only">Follow Joel on Instagram</span>
  </a>
  ```
- **Add `aria-label` to link (alternative):**
  ```astro
  <a href="..." aria-label="Follow Joel on Instagram" class="footer-social-link">
    <Instagram class="w-6 h-6" aria-hidden="true" />
  </a>
  ```
- **Ensure `.sr-only` utility exists in Tailwind:**
  ```css
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border-width: 0;
  }
  ```
- **Test with screen reader before PR:**
  - macOS: VoiceOver (Cmd+F5)
  - Windows: NVDA (free)
  - Verify each social link announces platform name + action
- **Minimum touch target size:** 44x44px for WCAG 2.5.5 Level AAA (use padding to expand clickable area)

**Warning signs:**
- Playwright axe-core tests fail with "Links must have discernible text"
- Manual keyboard navigation doesn't show tooltip on focus
- Screen reader announces "link graphic" without destination
- Lighthouse accessibility score drops below 100
- Social icons too small on mobile (<44x44px touch target)

**Phase to address:**
Phase 6 (Footer Cleanup) — Add social icons with proper accessibility from start, include Playwright test

---

### Pitfall 6: Design System Page Accidentally Indexed by Search Engines

**What goes wrong:**
Internal design system reference page at `/design-system` gets indexed by Google. Search results show design documentation to potential clients who search for Joel's name. Page ranks for keywords like "Joel Shinness button component" instead of actual portfolio content. Looks unprofessional - internal docs exposed publicly.

**Why it happens:**
Team assumes internal pages won't be indexed without explicit linking from navigation. Search engines crawl all pages in sitemap regardless of navigation visibility. No `robots` meta tag prevents indexing. GitHub Pages serves all HTML files by default. In 2026, indexing should be treated like inventory management - if a page is meant to drive demand, it must be indexable; if not, it must be explicitly excluded.

**How to avoid:**
- **Add noindex meta tag to design system page:**
  ```astro
  <head>
    <meta name="robots" content="noindex,nofollow">
  </head>
  ```
- **Exclude from sitemap generation:**
  ```javascript
  // astro.config.mjs
  sitemap({
    filter: (page) => !page.includes('/design-system')
  })
  ```
- **Add to robots.txt (optional additional layer):**
  ```
  Disallow: /design-system
  ```
- **Monitor Search Console:** Check "Coverage" report for unexpected indexed pages
- **Alternative approach:** Use password protection or require login (not feasible for GitHub Pages static hosting)

**Warning signs:**
- Design system page appears in Google search results
- Search Console shows `/design-system` in indexed pages
- Analytics shows organic search traffic to design system page
- Clients/visitors mention seeing internal documentation

**Phase to address:**
Phase 1 (Design System Reference Page) — Add noindex meta tag from initial creation, not as afterthought

---

### Pitfall 7: Navigation Simplification Makes Secondary Content Undiscoverable

**What goes wrong:**
Team removes "About", "Process", "Services" links from header to simplify navigation. These sections still exist on homepage but users from blog posts or project pages can't navigate to them. Direct links to `/#about` from external sources (social media, emails) work, but users browsing the site have no way to discover these sections. Conversion rate drops because users can't find process information that builds trust.

**Why it happens:**
Navigation cleanup focuses on "reducing clutter" without considering information architecture and user journeys. Assumption that "everything is on homepage" means users will find it, forgetting that many users enter via blog posts or direct project links. Following best practice to "limit primary navigation to no more than seven items" is misinterpreted as "remove everything possible."

**How to avoid:**
- **Distinguish primary vs secondary navigation:**
  - **Primary (header):** Pages users navigate to frequently (Blog, Projects, FAQ, Contact)
  - **Secondary (footer):** Homepage sections and utility pages (About, Process, Services, Privacy)
- **Footer as secondary navigation:** Mirror homepage section links subtly in footer
- **Test user journeys from all entry points:**
  - User lands on blog post → wants to learn about services → how do they get there?
  - User lands on project page → wants to contact → is path clear?
  - User lands on homepage → browses → navigates to blog → wants to return to services → how?
- **Breadcrumbs or "Back to..." links:** For blog/project pages, provide clear path back to main sections
- **Avoid "hidden room" syndrome:** Every page should be discoverable within 3 clicks from any other page

**Warning signs:**
- Analytics show users entering on blog post and immediately bouncing
- Conversion rate drops after navigation simplification
- Users ask "How do I see your services?" despite services section existing
- External links to `/#about` work but internal navigation doesn't provide path
- Heat maps show users searching for navigation options that don't exist

**Phase to address:**
Phase 5 (Navigation Cleanup) — Plan both primary (header) and secondary (footer) navigation simultaneously
Phase 6 (Footer Cleanup) — Implement secondary navigation that maintains discoverability

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline component variants in production pages instead of using design system | Faster to ship page-specific tweaks | Documentation becomes unreliable; identical components reimplemented 3+ times | Never — if variant is needed, add to design system component |
| "TODO: standardize later" comments in component files | Acknowledges inconsistency without blocking PR | TODOs never get addressed; becomes archaeological record of intentions | Only if TODO includes ticket number and severity level |
| Copy-pasting component code to "try something out" | Quick prototyping without touching shared components | Duplicate implementations diverge; unclear which is "canonical" | Only in throwaway branches; never merge duplicates |
| Using generic `<div>` instead of semantic HTML in components | Simpler structure, fewer ARIA attributes needed | Accessibility failures; screen reader navigation breaks | Never — use `<nav>`, `<footer>`, `<section>`, `<article>` |
| "Looks good on my screen" without cross-browser testing | Ships faster; dev machine is high-end | Safari/Firefox rendering differences; mobile layout breaks | Never — at minimum test on 1 other browser + mobile viewport |
| Skipping visual regression tests for "minor" component changes | Faster PR reviews | Subtle visual bugs in production; shadow offsets shift by 1px | Only for non-visual changes (accessibility attributes, aria-labels) |
| Hardcoding navigation links in multiple components | Fast to implement, no abstraction needed | Link changes require updating 5+ files; easy to miss one | Never — centralize navigation config or use shared component |
| Excluding pages from sitemap manually vs configuration | Quick fix for one-off exclusion | Configuration sprawl; unclear which pages intentionally excluded | Only during prototyping; formalize in config before production |

---

## Integration Gotchas

Common mistakes when connecting to external services or updating existing integrations.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages Deployment | Assuming custom redirects in `.htaccess` or `_redirects` work | Use Astro's `redirects` config; generates meta refresh HTML |
| Astro Sitemap Integration | Not excluding redirect pages from sitemap | Add `filter: (page) => !page.includes('/contact')` to sitemap config |
| Astro Sitemap Integration | Not excluding internal documentation pages | Add filter for `/design-system` and any other internal pages |
| Formspree Contact Form | Hardcoding form action URL in component | Store in environment variable; different for dev/prod |
| Lucide Icons (tree-shaking) | Importing all icons at once `import * as icons from '@lucide/astro'` | Import only used icons `import { Mail, Instagram, BookOpen } from '@lucide/astro'` |
| Lighthouse CI | Setting thresholds to 100 for all categories without testing | Start with `assertions: { categories: { performance: 90 } }`, adjust up |
| Dark Mode Persistence | Reading `localStorage` during SSR (causes hydration mismatch) | Use `<script is:inline>` to read theme before hydration |
| Navigation Components | Updating Header but not MobileNav or Footer | Update all navigation components in same PR; verify consistency |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Adding all icon variants to design system reference page | Initial load fine, but page size grows with each icon | Lazy-load icon examples with `<details>` or separate page | >50 icons (page size >500KB) |
| Embedding large example code blocks in design system docs | Documentation page loads slowly | Use syntax highlighting with code folding; limit examples to 20 lines | >10 full component examples |
| Not compressing images in component documentation | Documentation feels sluggish | Use WebP format; max 1200px width; compress with Squoosh | >5 uncompressed screenshots |
| Loading all component variants simultaneously for visual testing | Browser memory spikes during testing | Render one variant type at a time; use pagination | >100 component instances |
| Keeping old redirect pages in build output | Build time increases; deploy size grows | Set `redirects` expiration; remove source pages after redirect stable | >20 redirect pages |
| Not tree-shaking utility CSS classes | Tailwind bundle grows with unused utilities | Use `content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}']` in Tailwind config | Never an issue with proper content paths |
| Social icon SVGs loaded as individual requests | Slower page load, multiple HTTP requests | Use icon library with tree-shaking (@lucide/astro) or SVG sprite | >6 small icon files |

---

## UX Pitfalls

Common user experience mistakes when adding documentation and cleaning navigation.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Design system reference page accessible via main navigation | Internal docs shown to clients; looks unprofessional | Keep URL accessible but hide from nav; add `<meta name="robots" content="noindex">` |
| Footer navigation duplicates header exactly | Redundant; wastes vertical space; unclear hierarchy | Footer: secondary links (Privacy, FAQ, About), header: primary (Projects, Blog, Contact) |
| Social icons without hover states | Unclear which icon is focused when tabbing | Add hover color change + outline on focus (4.5:1 contrast) |
| Removing contact page breaks browser back button flow | User fills form → submits → success → back button → redirect loop | Keep `/contact` page with redirect; redirect happens instantly |
| Navigation cleanup removes links from header but not mobile nav | Desktop/mobile navigation inconsistent | Update Header, MobileNav, Footer in same PR; verify with responsive testing |
| "Contact" CTA buttons link to different anchors across pages | Some go to `/#contact`, others to `/contact#form` | Standardize on `/#contact`; works from any page consistently |
| Footer social icons too small on mobile (<44x44px touch target) | Users with motor impairments struggle to tap | Min 44x44px touch target (WCAG 2.5.5 Level AAA); use padding to expand clickable area |
| Navigation simplification makes sections undiscoverable | Users can't find "Process" or "Services" sections from blog pages | Footer provides secondary navigation to homepage sections |
| Design system docs use jargon ("prop", "variant", "slot") | Non-technical team members can't understand documentation | Use plain language; define technical terms; include visual examples |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Design System Page:** Component examples render correctly, but TypeScript interfaces not documented — verify every prop has description
- [ ] **Design System Page:** Documentation created but no `<meta name="robots" content="noindex">` — verify excluded from search indexing
- [ ] **Design System Page:** Examples shown but no "Last Updated" timestamp — verify maintenance mechanism documented
- [ ] **Component Audit:** Visual inconsistencies documented, but no severity prioritization — verify CRITICAL/HIGH/MEDIUM/LOW tiers assigned
- [ ] **Component Audit:** Findings list created but no plan for addressing — verify tiered action plan with phases
- [ ] **Navigation Cleanup:** Header updated, but mobile nav/footer still have old links — verify all navigation components updated
- [ ] **Navigation Cleanup:** Primary nav simplified but no secondary nav in footer — verify discoverability maintained
- [ ] **Contact Redirect:** `/contact` redirects, but blog posts still link to `/contact` — verify all internal links audited with grep
- [ ] **Contact Redirect:** Redirect added to astro.config.mjs but not verified as meta refresh — verify build output contains `<meta http-equiv="refresh">`
- [ ] **Contact Redirect:** Redirect works but page still in sitemap — verify sitemap filter excludes `/contact`
- [ ] **Footer Social Icons:** Icons added, but no screen reader labels — verify `<span class="sr-only">` or `aria-label` present
- [ ] **Footer Social Icons:** Labels added but no minimum touch target size — verify 44x44px touch area on mobile
- [ ] **Accessibility Testing:** Keyboard navigation works, but not tested with screen reader — verify VoiceOver/NVDA testing completed
- [ ] **Visual Regression:** Components look correct in light mode, but dark mode shadows broken — verify both themes tested
- [ ] **Responsive Design:** Footer looks good on desktop, but icons overlap on mobile 320px — verify min viewport 320px tested
- [ ] **Sitemap:** Redirect pages excluded, but orphan pages not removed — verify `sitemap.xml` has only canonical URLs
- [ ] **Sitemap:** Internal docs excluded from sitemap but not from robots.txt — verify complete exclusion strategy
- [ ] **Documentation Maintenance:** Reference page created, but no update process in CLAUDE.md — verify workflow documented

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Design system docs are stale | MEDIUM | Run component audit again; update docs; add "Last Updated" timestamp; document update workflow in CLAUDE.md |
| Component audit created massive PR that broke prod | HIGH | Revert PR; break into 5 smaller PRs (1 per component type); add visual regression tests; ship incrementally |
| Static redirect causes SEO issues | LOW | Monitor Search Console; if link juice lost, restore original page with canonical tag; redirect becomes secondary |
| Navigation cleanup broke internal links | MEDIUM | Audit all pages for broken links; create redirect map; update all hardcoded URLs; deploy hotfix |
| Footer social icons fail accessibility | LOW | Add `.sr-only` spans with descriptive text; re-run Playwright tests; deploy in same PR |
| Mobile nav not updated with header | LOW | Update MobileNav component; verify consistency; add responsive test to prevent regression |
| Redirect pages included in sitemap | LOW | Update `sitemap` config with filter; rebuild; submit new sitemap to Search Console |
| Design system page indexed by Google | LOW | Add `<meta name="robots" content="noindex">` to page; request removal in Search Console; wait 1-2 weeks |
| Navigation simplification made sections undiscoverable | MEDIUM | Add secondary navigation in footer; test user journeys from all entry points; monitor conversion rate recovery |
| Component inconsistencies overwhelming | MEDIUM | Tier findings by severity; tackle CRITICAL first; accept 80% consistency as shipping; document remaining inconsistencies |
| Footer navigation duplicates header | LOW | Redesign footer to show secondary links; distinguish primary (header) vs secondary (footer) navigation |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Stale documentation | Phase 1 (Design System Reference) | Documentation includes "Last Updated" + Git hash; CLAUDE.md has update workflow |
| "Fix everything" paralysis | Phase 2 (Component Audit) | Findings have severity tiers (CRITICAL/HIGH/MEDIUM/LOW) before migration starts |
| Meta refresh instead of 301 | Phase 4 (Contact Redirect) | Build site; inspect `/contact/index.html`; verify `<meta http-equiv="refresh">` exists |
| Broken internal links | Phase 4-5 (Redirect + Nav Cleanup) | Grep for all `/contact` refs; update before redirect; test from 3+ pages |
| Social icon accessibility | Phase 6 (Footer Cleanup) | Playwright axe-core test passes; VoiceOver announces "Follow Joel on [Platform]" |
| Navigation inconsistency | Phase 5 (Navigation Cleanup) | Header, MobileNav, Footer all updated in same PR; responsive test at 320px/768px/1024px |
| Redirect pages in sitemap | Phase 4 (Contact Redirect) | Update sitemap config with filter; verify `sitemap.xml` excludes `/contact` |
| Design system page indexed | Phase 1 (Design System Reference) | Add noindex meta tag; exclude from sitemap; check Search Console after 1 week |
| Undiscoverable sections | Phase 5-6 (Navigation + Footer Cleanup) | User journey testing from blog/project pages; verify 3-click discoverability rule |
| Component migration risks | Phase 3 (Component Migration) | One component type per PR; visual regression screenshots; 80% consistency acceptable |

---

## Sources

**Design System Documentation & Migration:**
- [Design Systems in 2026: Predictions, Pitfalls, and Power Moves](https://medium.com/@rydarashid/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563)
- [Design System Adoption Pitfalls](https://www.netguru.com/blog/design-system-adoption-pitfalls)
- [Design System Documentation Best Practices](https://backlight.dev/blog/design-system-documentation-best-practices)
- [Tips and Tricks for Design System Migrations](https://medium.com/@nonisnilukshi/tips-and-tricks-for-design-system-migrations-5beafb8e58c5)
- [How to Conduct a Design System Audit](https://sparkbox.com/foundry/design_system_audit)
- [Pro Tips for UI Library Migration in Large Projects](https://medium.com/@houhoucoop/pro-tips-for-ui-library-migration-in-large-projects-d54f0fbcd083)

**Navigation & Website Redesign:**
- [8 Common Website Design Mistakes to Avoid in 2026](https://www.zachsean.com/post/8-common-website-design-mistakes-to-avoid-in-2026-for-better-conversions-and-user-experience)
- [Don't Make These Common Website Redesign Mistakes in 2026](https://digitalvolcanoes.com/blogs/dont-make-these-common-website-redesign-mistakes-in-2026)
- [Avoiding Common Pitfalls in Website Redesign](https://www.brightspot.com/cms-resources/content-insights/how-to-avoid-common-pitfalls-in-website-redesign)
- [Footer Navigation Best Practices](https://www.sliderrevolution.com/design/footer-navigation-best-practices/)

**Static Site Redirects:**
- [Static Page Redirects using AstroJS](https://friedrichkurz.me/posts/2025-01-11/)
- [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/)
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/)
- [Astro.redirect Not Available in Static Mode](https://docs.astro.build/en/reference/errors/static-redirect-not-available/)
- [GitHub Pages Client-Side Routing Issues](https://github.com/orgs/community/discussions/64096)
- [Redirecting Static Pages](https://theorangeone.net/posts/redirecting-static-pages/)
- [Static Site Redirects With Astro](https://www.lloydatkinson.net/posts/2022/static-site-redirects-with-astro/)

**SEO & Indexing:**
- [SEO Site Structure Guide 2026](https://www.teamlewis.com/magazine/seo-site-structure/)
- [Ghost SEO Index: Hidden Pages Getting Indexed](https://indexly.ai/blog/understanding-ghost-seo-index/)
- [11 Types of Pages to Hide from Google](https://red-website-design.co.uk/hide-pages-from-google/)
- [Technical SEO Checklist 2026](https://theclaymedia.com/technical-seo-checklist-2026/)
- [SEO Information Architecture in 2026](https://chapters-eg.com/blog/seo-blog/seo-information-architecture-in-2026/)

**Accessibility (WCAG 2.2):**
- [Footer Accessibility Tests - U.S. Web Design System](https://designsystem.digital.gov/components/footer/accessibility-tests/)
- [Footer Component - U.S. Web Design System](https://designsystem.digital.gov/components/footer/)
- [New Digital Accessibility Requirements in 2026](https://bbklaw.com/resources/new-digital-accessibility-requirements-in-2026)
- [2026 WCAG & ADA Website Compliance Requirements](https://www.accessibility.works/blog/wcag-ada-website-compliance-standards-requirements/)
- [Page Regions - W3C WAI](https://www.w3.org/WAI/tutorials/page-structure/regions/)
- [Understanding Success Criterion 2.4.4: Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)

---

*Pitfalls research for: Design System Documentation & Navigation Cleanup*
*Researched: 2026-02-10*
*Context: v1.3 milestone adding design system reference page, component consistency audit, navigation cleanup, and contact redirect to existing portfolio site with neobrutalist design on GitHub Pages*
*Confidence: HIGH (verified with official Astro docs, WCAG 2.2 standards, 2026 industry sources, and analysis of existing codebase)*
