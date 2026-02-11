# Phase 21: Navigation Cleanup - Research

**Researched:** 2026-02-10
**Domain:** Astro navigation, redirects, anchor links, CSS scroll behavior
**Confidence:** HIGH

## Summary

This phase simplifies site navigation by removing redundant homepage section links from the header, implementing a permanent redirect from /contact to /#contact, and removing the FAQ accordion from the footer. The research confirms all required functionality is natively supported by Astro and modern CSS.

**Key findings:**
- Astro's redirect configuration supports hash anchors/fragments in static builds using meta refresh
- CSS `scroll-behavior: smooth` and `scroll-margin-top` provide accessible anchor navigation
- Header height is fixed at 60px (h-[60px] in Header.astro)
- User decisions locked: keep only Blog, Projects, FAQ, Contact; delete /contact.astro entirely

**Primary recommendation:** Use CSS-first approach for smooth scrolling with scroll-margin-top offset, respecting prefers-reduced-motion for accessibility. Implement redirect as meta refresh to /#contact.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro redirects | Built-in | Static site redirects via meta refresh | Native Astro feature for SSG sites |
| CSS scroll-behavior | Native CSS | Smooth scrolling for anchor links | Browser-native, zero JavaScript |
| CSS scroll-margin-top | Native CSS | Sticky header offset compensation | Modern CSS property with excellent support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| prefers-reduced-motion | Native CSS | Accessibility for motion-sensitive users | Always for smooth scroll implementations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS scroll-behavior | JavaScript scrollIntoView() | JS offers more control but requires code; CSS is simpler and progressive enhancement |
| Meta refresh redirect | JavaScript redirect | JS redirect executes faster but fails without JS; meta refresh is universal |
| scroll-margin-top | JavaScript scroll offset calculation | JS complex to maintain; CSS declarative and automatic |

**Installation:**
No installation needed - all features are native browser/Astro capabilities.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/layout/
│   ├── Header.astro        # Update navigation links
│   ├── MobileNav.astro     # Mirror desktop nav changes
│   └── Footer.astro        # Remove FAQ accordion
├── pages/
│   ├── contact.astro       # DELETE THIS FILE
│   └── index.astro         # Contact section already has id="contact"
└── styles/
    └── global.css          # Already has scroll-behavior and scroll-margin-top
```

### Pattern 1: Astro Static Redirect to Hash Anchor
**What:** Redirect /contact to /#contact using Astro's redirects config
**When to use:** Static site builds (SSG mode) redirecting to same-site hash anchors
**How it works:** In static mode, Astro creates HTML redirect pages with `<meta http-equiv="refresh">` tag

**Example:**
```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/portfolio': '/projects',
    '/portfolio/[slug]': '/projects/[slug]',
    '/contact': '/#contact'  // Add this
  }
});
```

**Source:** [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/), [Server-side Redirects in Astro SSG Mode](https://randomgeekery.org/post/2025/01/server-side-redirects-in-astro-ssg-mode/)

**Key details:**
- Static builds use `<meta http-equiv="refresh" content="0; url=/#contact">`
- Status code is always 301 for static builds (not configurable)
- Hash fragments work because redirect happens client-side in browser
- SEO-friendly: includes fallback link text for crawlers

### Pattern 2: CSS Smooth Scroll with Sticky Header Offset
**What:** Use `scroll-behavior: smooth` with `scroll-margin-top` to handle anchor links
**When to use:** Any site with anchor navigation and sticky/fixed headers
**How it works:** CSS handles scroll behavior; browser automatically accounts for scroll-margin offset

**Example:**
```css
/* Already in global.css lines 74-86 */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

section[id] {
  scroll-margin-top: 60px;  /* Current value matches header height */
}
```

**Source:** [CSS-Tricks: Fixed Headers and Jump Links](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/), [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior)

**Key benefits:**
- Zero JavaScript required
- Progressive enhancement (degrades to instant scroll in older browsers)
- Automatic handling of all anchor links site-wide
- Respects user motion preferences via prefers-reduced-motion

### Pattern 3: Navigation Link Array Pattern
**What:** Consistent navigation link structure across desktop and mobile
**When to use:** Maintaining parity between Header.astro and MobileNav.astro
**Current structure:** Both files have identical link sets (Home, Solutions, Process, Tech, About, Projects, Blog, FAQ, Contact)

**Target structure after cleanup:**
```astro
<!-- Desktop nav (Header.astro) -->
<nav class="hidden md:flex items-center space-x-6">
  <a href="/blog">Blog</a>
  <a href="/projects">Projects</a>
  <a href="/faq">FAQ</a>
  <a href="/#contact">Contact</a>
  <!-- Dark mode toggle -->
</nav>

<!-- Mobile nav (MobileNav.astro) -->
<nav class="flex flex-col items-center space-y-6 text-2xl">
  <a href="/blog">Blog</a>
  <a href="/projects">Projects</a>
  <a href="/faq">FAQ</a>
  <a href="/#contact">Contact</a>
  <!-- Dark mode toggle -->
</nav>
```

**Notes:**
- Remove: Home, Solutions, Process, Tech, About links
- Change Contact href from `/contact` to `/#contact`
- Keep all styling classes unchanged
- Maintain same order in both components

### Anti-Patterns to Avoid

- **JavaScript-based redirect in deleted page:** Don't create /contact.astro with JS redirect - use Astro redirects config instead
- **Custom scroll offset calculation:** Don't use JS to calculate header height - use CSS scroll-margin-top
- **Hardcoded pixel values for responsive headers:** Don't use scroll-margin-top if header height changes - current header is fixed 60px so this is safe
- **Removing anchor IDs from target sections:** Don't change `id="contact"` on ContactSection - redirect depends on it existing

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll to anchor | Custom JS scroll animation | CSS `scroll-behavior: smooth` | Native CSS handles animation, timing, accessibility automatically |
| Sticky header anchor offset | JS scroll position calculation | CSS `scroll-margin-top` | Declarative, automatic, no JS needed |
| Static page redirects | Custom HTML redirect pages | Astro `redirects` config | Astro generates proper meta refresh + fallback link |
| Motion sensitivity detection | Custom user preference UI | CSS `prefers-reduced-motion` | OS-level user preference, zero config needed |
| Navigation link updates | Separate desktop/mobile link lists | Mirror exact same structure | Prevents drift and inconsistency |

**Key insight:** Modern CSS and Astro built-ins eliminate need for custom JavaScript for navigation, redirects, and scroll behavior. Trust the platform.

## Common Pitfalls

### Pitfall 1: Assuming Astro Redirects Don't Support Hash Anchors
**What goes wrong:** Developer assumes server-side redirects can't handle hash fragments and builds custom JS redirect
**Why it happens:** Hash fragments are client-side only and don't reach server; official docs don't explicitly mention hash support
**How to avoid:** Understand Astro static builds use `<meta http-equiv="refresh">` which happens in browser where hashes work
**Warning signs:** Planning to create /contact.astro with `<script>window.location.href = "/#contact"</script>`

**Source:** [Astro Static Redirects](https://friedrichkurz.me/posts/2025-01-11/), [Random Geekery: Server-side Redirects in Astro SSG Mode](https://randomgeekery.org/post/2025/01/server-side-redirects-in-astro-ssg-mode/)

### Pitfall 2: Incorrect scroll-margin-top Value
**What goes wrong:** Anchor links scroll to wrong position because offset doesn't match actual header height
**Why it happens:** Developer guesses offset value without measuring actual header height or uses responsive value when header is fixed
**How to avoid:**
  - Header.astro line 5: `class="sticky top-0 z-30 h-[60px]"` - header is fixed 60px
  - global.css line 85: `scroll-margin-top: 60px;` - already correctly set
  - No change needed unless header height changes
**Warning signs:** Testing anchor links and target content is hidden behind header

**Source:** [CSS-Tricks: Fixed Headers and Jump Links](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/)

### Pitfall 3: Breaking Smooth Scroll Accessibility
**What goes wrong:** Smooth scroll causes motion sickness for users with vestibular disorders
**Why it happens:** Implementing `scroll-behavior: smooth` without `prefers-reduced-motion` override
**How to avoid:**
  - global.css lines 78-82 already implement prefers-reduced-motion correctly
  - No additional work needed - pattern already in place
**Warning signs:** User testing reveals discomfort with page animations

**Source:** [CSS-Tricks: Smooth Scrolling and Accessibility](https://css-tricks.com/smooth-scrolling-accessibility/)

### Pitfall 4: Desktop/Mobile Navigation Drift
**What goes wrong:** Desktop header updated but mobile nav still has old links (or vice versa)
**Why it happens:** Header.astro and MobileNav.astro treated as separate components without coordinated updates
**How to avoid:** Update both files in same commit with identical link structure
**Warning signs:**
  - Testing on mobile shows different navigation than desktop
  - Links appear in one view but not the other
  - Contact link goes to /contact on one but /#contact on other

### Pitfall 5: Forgetting to Delete /contact.astro
**What goes wrong:** Redirect config points to /#contact but /contact.astro still exists, causing file-based route to take precedence
**Why it happens:** User decision says "delete /contact.astro" but developer only adds redirect
**How to avoid:** Understand Astro routing: "file-based routes take precedence over redirects"
**Warning signs:** Testing /contact shows old page instead of redirecting

**Source:** [Astro Routing](https://docs.astro.build/en/guides/routing/)

## Code Examples

Verified patterns from official sources and existing codebase:

### Update Navigation Links (Header.astro)

Current state (lines 13-40):
```astro
<!-- Desktop navigation -->
<nav class="hidden md:flex items-center space-x-6">
  <a href="/">Home</a>
  <a href="/#solutions">Solutions</a>
  <a href="/#process">Process</a>
  <a href="/#tech">Tech</a>
  <a href="/#about">About</a>
  <a href="/projects">Projects</a>
  <a href="/blog">Blog</a>
  <a href="/faq">FAQ</a>
  <a href="/contact">Contact</a>
  <!-- Dark mode toggle -->
</nav>
```

Target state:
```astro
<!-- Desktop navigation -->
<nav class="hidden md:flex items-center space-x-6">
  <a href="/blog" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    Blog
  </a>
  <a href="/projects" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    Projects
  </a>
  <a href="/faq" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    FAQ
  </a>
  <a href="/#contact" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    Contact
  </a>
  <!-- Dark mode toggle -->
</nav>
```

**Changes:**
- Remove 6 links: Home, Solutions, Process, Tech, About, Projects (the last duplicate)
- Change Contact href from `/contact` to `/#contact`
- Reorder to: Blog, Projects, FAQ, Contact
- Keep all styling classes

### Update Mobile Navigation (MobileNav.astro)

Current state (lines 28-55):
```astro
<nav class="flex flex-col items-center space-y-6 text-2xl">
  <a href="/">Home</a>
  <a href="/#solutions">Solutions</a>
  <a href="/#process">Process</a>
  <a href="/#tech">Tech</a>
  <a href="/#about">About</a>
  <a href="/projects">Projects</a>
  <a href="/blog">Blog</a>
  <a href="/faq">FAQ</a>
  <a href="/contact">Contact</a>
  <!-- Dark mode toggle -->
</nav>
```

Target state:
```astro
<nav class="flex flex-col items-center space-y-6 text-2xl">
  <a href="/blog" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    Blog
  </a>
  <a href="/projects" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    Projects
  </a>
  <a href="/faq" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    FAQ
  </a>
  <a href="/#contact" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors">
    Contact
  </a>
  <!-- Dark mode toggle -->
</nav>
```

**Changes:** Identical to Header.astro changes - must maintain parity

### Add Redirect Configuration (astro.config.mjs)

Current state (lines 14-17):
```javascript
redirects: {
  '/portfolio': '/projects',
  '/portfolio/[slug]': '/projects/[slug]',
},
```

Target state:
```javascript
redirects: {
  '/portfolio': '/projects',
  '/portfolio/[slug]': '/projects/[slug]',
  '/contact': '/#contact',
},
```

**Changes:** Add single redirect mapping

### Update Footer (Footer.astro)

Current state (lines 44-52):
```astro
<!-- FAQ Link -->
<div class="mt-8 pt-8 border-t-[3px] border-text-light/20 dark:border-text-dark/20 text-center">
  <a
    href="/faq"
    class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors text-lg"
  >
    Frequently Asked Questions &rarr;
  </a>
</div>
```

Target state:
```astro
<!-- FAQ section removed entirely per user decision -->
```

**Changes:** Delete entire `<div class="mt-8 pt-8...">` section containing FAQ link

**Note:** User decision says "Remove FAQ accordion" but Footer.astro currently has standalone FAQ link, not accordion. The accordion may have been removed in a prior phase or may be in a different component. Based on footer structure, removing the standalone link satisfies the requirement.

### Verify Contact Section Has Anchor ID

Existing code (ContactSection.astro line 8):
```astro
<section
  id="contact"
  aria-labelledby="contact-heading"
  class="py-24 md:py-32 bg-bg-light dark:bg-bg-dark"
>
```

**Verification:** `id="contact"` already exists - no changes needed. Redirect will work correctly.

### Verify Scroll Behavior CSS

Existing code (global.css lines 74-86):
```css
/* Smooth scroll behavior with accessibility consideration */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

section[id] {
  scroll-margin-top: 60px;
}
```

**Verification:** All required CSS already exists - no changes needed. Smooth scroll and sticky header offset work correctly.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript scrollIntoView() | CSS scroll-behavior | ~2019 | Eliminates JS dependency, progressive enhancement |
| Manual scroll offset calculation | CSS scroll-margin-top | ~2020 | Declarative, automatic, responsive-friendly |
| JavaScript window.location redirect | Astro redirects config | Astro 1.0+ (2022) | Configuration-based, SEO-friendly meta refresh |
| Toggle UI for motion preferences | prefers-reduced-motion media query | ~2018 | OS-level preference, zero UI needed |

**Deprecated/outdated:**
- jQuery smooth scroll plugins: Replaced by native CSS `scroll-behavior`
- window.scrollTo() with animation polyfills: Replaced by CSS solution
- Fixed pixel offsets in JavaScript: Replaced by `scroll-margin-top`
- Client-side redirect pages: Replaced by Astro redirect config with meta refresh

**Current best practices (2026):**
- CSS-first approach for scroll behavior
- Respect prefers-reduced-motion for all animations
- Use Astro built-in features over custom solutions
- Progressive enhancement over JavaScript requirements

## Open Questions

No significant open questions. All requirements have clear, well-supported solutions.

## Sources

### Primary (HIGH confidence)
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/) - Redirects configuration
- [Astro Routing](https://docs.astro.build/en/guides/routing/) - File-based routing precedence
- [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior) - CSS smooth scroll
- [CSS-Tricks: Fixed Headers and Jump Links](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/) - scroll-margin-top implementation
- [CSS-Tricks: Smooth Scrolling and Accessibility](https://css-tricks.com/smooth-scrolling-accessibility/) - prefers-reduced-motion best practices

### Secondary (MEDIUM confidence)
- [Static Page Redirects using AstroJS](https://friedrichkurz.me/posts/2025-01-11/) - Hash anchor redirect verification
- [Server-side Redirects in Astro SSG Mode](https://randomgeekery.org/post/2025/01/server-side-redirects-in-astro-ssg-mode/) - Meta refresh implementation details
- [Go Make Things: Prevent anchor links from scrolling behind sticky header](https://gomakethings.com/how-to-prevent-anchor-links-from-scrolling-behind-a-sticky-header-with-one-line-of-css/) - scroll-margin-top best practices
- [BrowserStack: Smooth Scrolling with CSS & JavaScript](https://www.browserstack.com/guide/browser-compatible-smooth-scrolling-in-css-javascript) - Browser compatibility

### Tertiary (LOW confidence)
- None - all findings verified with authoritative sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All native browser/Astro features with official documentation
- Architecture: HIGH - Existing codebase patterns verified, official Astro docs confirm approach
- Pitfalls: HIGH - Common issues documented in multiple authoritative sources
- Redirect hash anchor support: MEDIUM - Not explicitly documented but verified through community posts about meta refresh behavior

**Research date:** 2026-02-10
**Valid until:** 2026-03-10 (30 days - stable web standards and Astro features)
