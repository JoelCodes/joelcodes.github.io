# Phase 16: FAQ Page - Research

**Researched:** 2026-02-10
**Domain:** Astro static site generation, FAQ structured data, web accessibility
**Confidence:** HIGH

## Summary

This phase moves existing FAQ content from the footer to a dedicated /faq page, implements FAQPage JSON-LD structured data for SEO, and maintains WCAG 2.2 AA accessibility compliance. The site already has accessible FAQ accordion implementation using native HTML `<details>` and `<summary>` elements that passed Phase 11 accessibility validation.

**Key findings:**
- Astro's file-based routing makes creating /faq page trivial (create src/pages/faq.astro)
- FAQPage JSON-LD schema is well-documented by Google and schema.org with specific structure requirements
- Native HTML `<details>`/`<summary>` elements provide built-in keyboard accessibility (Enter/Space toggle)
- Existing FAQ component already implements accessible patterns validated in Phase 11
- Site uses component-based JSON-LD pattern in SEO.astro that can be extended for FAQPage schema

**Primary recommendation:** Create dedicated faq.astro page reusing existing FAQ component structure, add FAQPage JSON-LD schema via SEO component enhancement, update navigation to include FAQ link, and extend Playwright accessibility tests to cover the new page.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x | Static site generator with file-based routing | Project's core framework, already in use |
| @axe-core/playwright | 4.x | WCAG 2.2 AA automated accessibility testing | Already used in Phase 11, catches 57% of issues |
| @playwright/test | 1.x | E2E testing framework | Project's existing test infrastructure |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | Latest | TypeScript definitions for schema.org | Optional - for type-safe JSON-LD generation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `<details>` | ARIA accordion with JS | More control but more code, already validated native approach |
| Manual JSON-LD | astro-seo-schema package | Package adds dependency for simple task, manual approach already used |
| Separate FAQ component | Inline FAQ on page | Component reuse maintains consistency, easier to update |

**Installation:**
No new dependencies required. All necessary tools already installed in project.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   └── faq.astro              # New dedicated FAQ page
├── components/
│   ├── SEO.astro              # Extend to support FAQPage schema
│   └── FAQ.astro              # Existing component, reuse as-is
└── layouts/
    └── BaseLayout.astro       # Existing layout, no changes needed
```

### Pattern 1: File-Based Routing for FAQ Page
**What:** Create src/pages/faq.astro to automatically generate /faq route
**When to use:** Astro's standard approach for all static pages
**Example:**
```typescript
// src/pages/faq.astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import FAQ from '../components/FAQ.astro';
---

<BaseLayout
  title="Frequently Asked Questions"
  description="Common questions about working with Joel Shinness on custom software projects"
>
  <FAQ />
</BaseLayout>
```

**Source:** [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/)

### Pattern 2: FAQPage JSON-LD Structured Data
**What:** Add schema.org FAQPage structured data for SEO via JSON-LD script in head
**When to use:** All dedicated FAQ pages to enable rich results in Google Search
**Example:**
```typescript
// In SEO.astro or FAQ page frontmatter
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does a typical project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every project is different. Discovery and prototyping usually take 1-2 weeks, then we'll outline a timeline in the proposal based on scope."
      }
    }
    // ... more questions
  ]
};
```

**Source:** [Google FAQ Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage), [Schema.org FAQPage](https://schema.org/FAQPage)

### Pattern 3: Native HTML Accordion with Details/Summary
**What:** Use browser-native `<details>` and `<summary>` elements for FAQ accordion
**When to use:** When keyboard accessibility and progressive enhancement are priorities
**Example:**
```html
<details class="group border-[3px] border-text-light dark:border-text-dark rounded p-4">
  <summary class="font-heading font-bold cursor-pointer list-none flex items-center justify-between">
    <span>Question text</span>
    <span class="text-2xl transition-transform group-open:rotate-45">+</span>
  </summary>
  <div class="mt-4 pt-4 border-t-[3px]">
    Answer text
  </div>
</details>
```

**Source:** [Hassell Inclusion: Accessible Accordions with Details/Summary](https://www.hassellinclusion.com/blog/accessible-accordions-part-2-using-details-summary/)

### Pattern 4: Component-Based JSON-LD Injection
**What:** Extend SEO.astro component to accept optional JSON-LD schema objects
**When to use:** When different pages need different structured data types
**Example:**
```typescript
// Enhanced SEO.astro interface
interface Props {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  structuredData?: object; // Optional custom JSON-LD
}

// In component template
{structuredData && (
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
)}
```

**Source:** [Adding JSON-LD to Astro](https://johndalesandro.com/blog/astro-add-json-ld-structured-data-to-your-website-for-rich-search-results/)

### Anti-Patterns to Avoid
- **Don't duplicate FAQ content across pages** - Mark only one instance per site with FAQPage schema to avoid confusion
- **Don't hide FAQ answers completely** - Google requires answer text to be visible on page (can be behind expandable accordion)
- **Don't add tabindex to `<summary>`** - Native elements already keyboard accessible, adding tabindex="0" is redundant
- **Don't use FAQPage schema for user-generated Q&A** - That's QAPage schema (like StackOverflow)

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accordion keyboard support | Custom JS toggle logic | Native `<details>` element | Built-in Enter/Space support, focus management, state announcements |
| JSON-LD validation | Manual string building | Object → JSON.stringify() | Type safety, proper escaping, easier maintenance |
| FAQ schema generation | Template literals with JSON | Structured object with mainEntity array | Prevents syntax errors, easier to iterate over FAQ data |
| Focus indicators | Custom CSS rings | CSS custom properties + Tailwind | Consistent with existing design system |

**Key insight:** The site already has all the building blocks. This phase is assembly and placement, not new functionality.

## Common Pitfalls

### Pitfall 1: Safari Keyboard Navigation Gap
**What goes wrong:** Safari doesn't include `<details>` in keyboard focus order by default
**Why it happens:** Webkit bug/limitation in Safari implementation
**How to avoid:** Test with Safari specifically, consider polyfill if needed (though project passed Phase 11 validation)
**Warning signs:** Tab key skips FAQ accordions in Safari

**Confidence:** MEDIUM - Issue documented in accessibility articles but project already validated in Phase 11

### Pitfall 2: NVDA State Announcement Gap
**What goes wrong:** NVDA screen reader doesn't announce expanded/collapsed state changes when toggling
**Why it happens:** NVDA doesn't fully support native `<details>` element state announcements
**How to avoid:** Accept limitation (JAWS and VoiceOver work correctly), or add ARIA attributes for full compatibility
**Warning signs:** NVDA users report not hearing state changes

**Confidence:** HIGH - Documented in [Hassell Inclusion article](https://www.hassellinclusion.com/blog/accessible-accordions-part-2-using-details-summary/)

### Pitfall 3: Multiple FAQPage Schemas
**What goes wrong:** Marking duplicate FAQ content on multiple pages confuses search engines
**Why it happens:** Copying FAQ section to multiple pages "just in case"
**How to avoid:** Only add FAQPage schema to the dedicated /faq page, link to it from footer instead
**Warning signs:** Google Search Console warnings about duplicate structured data

**Confidence:** HIGH - Explicitly stated in [Google FAQ structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/faqpage)

### Pitfall 4: Forgetting Mobile Navigation
**What goes wrong:** Desktop navigation gets FAQ link but mobile hamburger menu doesn't
**Why it happens:** Two separate navigation components (Header.astro and MobileNav.astro)
**How to avoid:** Update both components, test on mobile viewport
**Warning signs:** FAQ link visible on desktop but missing on mobile

**Confidence:** HIGH - Code inspection confirms separate nav implementations

### Pitfall 5: JSON-LD HTML Entity Encoding
**What goes wrong:** Special characters in FAQ answers break JSON-LD or display incorrectly
**Why it happens:** Manual string concatenation or improper escaping
**How to avoid:** Use JavaScript objects with JSON.stringify(), let browser handle encoding
**Warning signs:** Syntax errors in JSON-LD, validation failures

**Confidence:** HIGH - Standard JSON-LD implementation practice

## Code Examples

Verified patterns from official sources:

### Complete FAQ Page Implementation
```typescript
// src/pages/faq.astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Every project is different. Discovery and prototyping usually take 1-2 weeks, then we'll outline a timeline in the proposal based on scope."
  },
  // ... more FAQs
];

// Generate FAQPage JSON-LD schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
---

<BaseLayout
  title="Frequently Asked Questions"
  description="Common questions about working with Joel Shinness on custom software projects"
>
  <!-- FAQ Schema -->
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} slot="head" />

  <section class="py-16 px-4">
    <div class="container mx-auto max-w-3xl">
      <h1 class="font-heading text-4xl font-bold text-text-light dark:text-text-dark mb-12 text-center">
        Frequently Asked Questions
      </h1>

      <div class="flex flex-col gap-4">
        {faqs.map(faq => (
          <details class="group border-[3px] border-text-light dark:border-text-dark rounded p-4">
            <summary class="font-heading font-bold cursor-pointer list-none flex items-center justify-between text-text-light dark:text-text-dark">
              <span>{faq.question}</span>
              <span class="text-2xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <div class="mt-4 pt-4 border-t-[3px] border-text-light/20 dark:border-text-dark/20 text-text-muted-light dark:text-text-muted-dark leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

**Source:** Pattern combines [Astro Pages documentation](https://docs.astro.build/en/basics/astro-pages/), [Google FAQPage schema](https://developers.google.com/search/docs/appearance/structured-data/faqpage), and existing codebase patterns

### Playwright Keyboard Accessibility Test
```typescript
// tests/accessibility/faq-keyboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('FAQ Page Keyboard Accessibility', () => {
  test('FAQ accordion should toggle with Enter key', async ({ page }) => {
    await page.goto('/faq');

    // Focus first FAQ accordion
    const firstDetail = page.locator('details').first();
    const firstSummary = firstDetail.locator('summary');

    await firstSummary.focus();

    // Verify closed initially
    const isOpenBefore = await firstDetail.evaluate(el => el.hasAttribute('open'));
    expect(isOpenBefore).toBe(false);

    // Toggle with Enter
    await firstSummary.press('Enter');

    // Verify opened
    const isOpenAfter = await firstDetail.evaluate(el => el.hasAttribute('open'));
    expect(isOpenAfter).toBe(true);
  });

  test('FAQ accordion should toggle with Space key', async ({ page }) => {
    await page.goto('/faq');

    const firstDetail = page.locator('details').first();
    const firstSummary = firstDetail.locator('summary');

    await firstSummary.focus();
    await firstSummary.press('Space');

    const isOpen = await firstDetail.evaluate(el => el.hasAttribute('open'));
    expect(isOpen).toBe(true);
  });

  test('Can tab through all FAQ items', async ({ page }) => {
    await page.goto('/faq');

    const summaries = page.locator('summary');
    const count = await summaries.count();

    // Focus first item
    await summaries.first().focus();

    // Tab through all items
    for (let i = 1; i < count; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator('summary:focus');
      await expect(focused).toBeVisible();
    }
  });
});
```

**Source:** Pattern follows existing test structure in tests/accessibility/dark-mode.spec.ts

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| ARIA accordions with role="button" | Native `<details>` element | 2024-2026 trend | Less JS, better progressive enhancement |
| Footer-embedded FAQs | Dedicated FAQ pages | Ongoing best practice | Better SEO, easier discovery |
| Multiple scattered FAQs | Single canonical FAQ page | Google recommendation | Cleaner structured data |
| Manual ARIA state management | Native element state handling | HTML5 Living Standard | Reduced accessibility bugs |

**Deprecated/outdated:**
- **Polyfills for `<details>` support:** IE11 out of support, modern browsers fully compatible
- **jQuery accordion plugins:** Unnecessary with native HTML elements
- **Generic FAQ markup without schema:** SEO disadvantage, rich results unavailable

## Open Questions

1. **Should FAQ content be extracted to a data file?**
   - What we know: Currently hardcoded in Footer.astro, will need duplication prevention
   - What's unclear: Whether to extract to JSON or keep in component
   - Recommendation: Extract to src/data/faqs.json for single source of truth, import in both FAQ page and Footer link

2. **How to handle Footer FAQ section removal?**
   - What we know: Requirement FAQ-04 says "removed or replaced with link"
   - What's unclear: User preference for complete removal vs. prominent link
   - Recommendation: Replace with single-line text link "View all frequently asked questions →" to maintain discoverability

3. **Should navigation placement be before or after Contact?**
   - What we know: Current nav order: Home, Solutions, Process, Tech, About, Projects, Blog, Contact
   - What's unclear: FAQ logical placement in information architecture
   - Recommendation: After Blog, before Contact (Blog → FAQ → Contact) as pre-contact resource

## Sources

### Primary (HIGH confidence)
- [Google FAQ Structured Data Documentation](https://developers.google.com/search/docs/appearance/structured-data/faqpage) - Official requirements
- [Schema.org FAQPage Specification](https://schema.org/FAQPage) - Authoritative schema definition
- [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/) - Official file-based routing guide
- [Astro Pages Documentation](https://docs.astro.build/en/basics/astro-pages/) - Page creation patterns
- Existing codebase: src/components/FAQ.astro, src/components/SEO.astro, Phase 11 validation results

### Secondary (MEDIUM confidence)
- [Hassell Inclusion: Accessible Accordions with Details/Summary](https://www.hassellinclusion.com/blog/accessible-accordions-part-2-using-details-summary/) - Accessibility requirements and known issues
- [Adding JSON-LD to Astro](https://johndalesandro.com/blog/astro-add-json-ld-structured-data-to-your-website-for-rich-search-results/) - Implementation patterns
- [Penn State Accessibility: Details/Summary Tag](https://accessibility.psu.edu/webpagetools/htmlguide/detailstag/) - WCAG compliance guidance

### Tertiary (LOW confidence)
- Various SEO blog posts about FAQ schema benefits (3-8% organic traffic uplift cited)
- Community discussions about internal linking best practices for FAQ pages

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All tools already in project, no new dependencies
- Architecture: HIGH - File-based routing well-documented, existing patterns validated
- Pitfalls: HIGH - Multiple authoritative sources confirm details/summary limitations
- JSON-LD implementation: HIGH - Google official documentation provides exact requirements
- Keyboard accessibility: HIGH - Phase 11 validation confirms approach works

**Research date:** 2026-02-10
**Valid until:** 2026-04-10 (60 days - stable domain, Astro 5.x mature)

**Phase 11 validation note:** Existing FAQ accordion in Footer.astro already passed comprehensive keyboard navigation and screen reader testing. Implementation pattern is proven and validated for WCAG 2.2 AA compliance.
