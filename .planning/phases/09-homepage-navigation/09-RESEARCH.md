# Phase 9: Homepage & Navigation - Research

**Researched:** 2026-02-09
**Domain:** Neobrutalist homepage design, navigation patterns, accessible forms
**Confidence:** MEDIUM

## Summary

Phase 9 transforms the homepage into a narrative journey while applying neobrutalist design principles to navigation components. The research reveals that neobrutalism in 2026 has matured into a balanced approach where bold aesthetics must be grounded in usability fundamentals.

Key findings indicate that successful neobrutalist homepages follow a clear narrative structure (hook → problem → solution → evidence → action), use 2-3 bold accent colors with strict WCAG contrast compliance, and maintain generous whitespace despite bold borders and shadows. The primitive components built in Phase 8 (Button, Card) provide the foundation, but homepage sections require asymmetric layout patterns and section-specific accent color assignments.

For navigation, the sticky header pattern is well-established but requires careful space management (avoid consuming more than 13% of viewport height on mobile). Contact forms in Astro leverage server-side rendering with HTML5 validation attributes and ARIA live regions for accessible error handling.

**Primary recommendation:** Build homepage sections as distinct narrative blocks with one dominant accent color each, use CSS Grid asymmetric layouts for visual interest, implement Astro's server-rendered form pattern with proper ARIA attributes, and relocate FAQ to footer as an accordion component to maintain homepage focus.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro SSR | 5.x | Server-side form handling | Native to Astro, zero client JS for forms |
| Tailwind CSS 4 | 4.x | Layout and styling | Already established in project via @tailwindcss/vite |
| CSS Grid | Native | Asymmetric layouts | No library needed, native browser support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| HTML5 Validation | Native | Client-side form validation | All form inputs (required, minlength, type="email") |
| ARIA Live Regions | Native | Accessible error announcements | Form validation feedback |
| CSS scroll-behavior | Native | Smooth section navigation | Anchor links to homepage sections |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro SSR forms | Third-party form service (Web3Forms, Basin) | External service = easier backend but external dependency and potential cost |
| CSS Grid | Flexbox | Grid superior for 2D asymmetric layouts, Flexbox better for 1D flows |
| Native validation | JavaScript validation library | Library adds bundle size, HTML5 sufficient for this use case |

**Installation:**
No additional packages required. All capabilities are native to Astro 5 + Tailwind CSS 4 stack.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── homepage/           # New: narrative section components
│   │   ├── SolutionsSection.astro
│   │   ├── ProcessSection.astro
│   │   ├── TechSection.astro
│   │   ├── AboutSection.astro
│   │   └── ContactSection.astro
│   ├── layout/
│   │   ├── Header.astro    # Update: neobrutalist styling
│   │   ├── Footer.astro    # Update: neobrutalist styling, add FAQ
│   │   └── MobileNav.astro # Update: neobrutalist styling
│   └── ui/
│       ├── Button.astro    # Existing from Phase 8
│       ├── Card.astro      # Existing from Phase 8
│       └── Input.astro     # New: form input primitive
└── pages/
    └── index.astro         # Update: narrative structure
```

### Pattern 1: Narrative Section Flow
**What:** Homepage structured as sequential storytelling sections with distinct visual identities
**When to use:** Portfolio/business sites converting visitors through education and trust-building

**Structure:**
1. **Solutions** (yellow accent, density 7/10) - Hook with value proposition
2. **Process** (turquoise accent, density 5/10) - How you work
3. **Tech** (magenta accent, density 4/10) - What you use
4. **About** (yellow accent, density 3/10) - Who you are
5. **Contact** (turquoise accent, density 5/10) - Call to action

**Example section component:**
```astro
---
// SolutionsSection.astro
import Card from '../ui/Card.astro';
---

<section
  id="solutions"
  class="py-24 md:py-32 bg-bg-light dark:bg-bg-dark"
  aria-labelledby="solutions-heading"
>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-center">
      <div>
        <h2
          id="solutions-heading"
          class="font-heading font-bold text-4xl md:text-5xl uppercase mb-6"
        >
          What I Build
        </h2>
        <p class="text-lg mb-8">
          Custom software that solves real problems...
        </p>
      </div>
      <Card variant="yellow" stacked>
        <!-- Solution highlights -->
      </Card>
    </div>
  </div>
</section>
```

### Pattern 2: Asymmetric Grid Layouts
**What:** CSS Grid with unequal column/row sizing for visual dynamism
**When to use:** Homepage sections to break monotony and create focal points

**Example:**
```astro
<!-- Asymmetric 2-column with 2:1 ratio -->
<div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
  <div><!-- Dominant content --></div>
  <div><!-- Supporting content --></div>
</div>

<!-- Asymmetric 3-column with varying sizes -->
<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6">
  <div><!-- Left accent --></div>
  <div><!-- Center focus --></div>
  <div><!-- Right accent --></div>
</div>

<!-- Staggered vertical rhythm -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-6">
  <div class="row-span-2"><!-- Tall --></div>
  <div><!-- Standard --></div>
  <div><!-- Standard --></div>
  <div class="col-span-2"><!-- Wide --></div>
</div>
```

### Pattern 3: Server-Rendered Contact Form
**What:** Astro SSR form with HTML5 validation and ARIA error handling
**When to use:** Contact forms requiring zero client JavaScript

**Example:**
```astro
---
// ContactSection.astro
export const prerender = false; // Enable SSR

let errors = {};
let success = false;

if (Astro.request.method === "POST") {
  try {
    const data = await Astro.request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    // Server-side validation
    if (!name || name.toString().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!email || !email.toString().includes("@")) {
      errors.email = "Please enter a valid email address";
    }
    if (!message || message.toString().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errors).length === 0) {
      // Process form (send email, save to DB, etc.)
      success = true;
    }
  } catch (error) {
    console.error("Form submission error:", error);
  }
}
---

<section id="contact" aria-labelledby="contact-heading">
  <div class="container mx-auto px-4 py-24">
    <h2 id="contact-heading" class="font-heading text-4xl font-bold uppercase mb-8">
      Get In Touch
    </h2>

    {success && (
      <div
        role="alert"
        class="mb-6 p-4 border-[3px] border-text-light bg-yellow rounded"
      >
        <p class="font-heading font-bold">Message sent successfully!</p>
      </div>
    )}

    {Object.keys(errors).length > 0 && (
      <div
        role="alert"
        class="mb-6 p-4 border-[3px] border-text-light bg-magenta/20 rounded"
      >
        <h3 class="font-heading font-bold mb-2">Please fix the following errors:</h3>
        <ul class="list-disc pl-5">
          {errors.name && <li><a href="#name">{errors.name}</a></li>}
          {errors.email && <li><a href="#email">{errors.email}</a></li>}
          {errors.message && <li><a href="#message">{errors.message}</a></li>}
        </ul>
      </div>
    )}

    <form method="POST" class="max-w-2xl">
      <div class="mb-6">
        <label
          for="name"
          class="block font-heading font-bold mb-2"
        >
          Name <span aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          class="w-full px-4 py-3 border-[3px] border-text-light dark:border-text-dark rounded bg-bg-light dark:bg-bg-dark focus:outline-none focus:shadow-[0_0_0_2px_var(--color-bg-light),0_0_0_4px_var(--color-text-light)]"
        />
        {errors.name && (
          <p id="name-error" class="mt-2 text-sm text-magenta" aria-live="polite">
            {errors.name}
          </p>
        )}
      </div>

      <!-- Email and Message fields follow same pattern -->

      <button type="submit" class="btn btn-turquoise">
        <span class="btn-front px-6 py-3">Send Message</span>
      </button>
    </form>
  </div>
</section>
```

### Pattern 4: Sticky Neobrutalist Header
**What:** Sticky header with neobrutalist styling, minimal height, opaque background
**When to use:** Multi-section homepages where navigation needs persistent access

**Example:**
```astro
<header
  class="sticky top-0 z-30 bg-bg-light dark:bg-bg-dark border-b-[3px] border-text-light dark:border-text-dark"
>
  <div class="container mx-auto px-4 py-3 flex items-center justify-between">
    <a
      href="/"
      class="font-heading text-2xl font-bold"
    >
      Joel Shinness
    </a>

    <nav class="hidden md:flex items-center gap-6">
      <a
        href="#solutions"
        class="font-heading font-bold hover:text-yellow transition-colors"
      >
        Solutions
      </a>
      <!-- More nav links -->
    </nav>
  </div>
</header>
```

**Key requirements:**
- Opaque background (not translucent) for contrast
- Max 60px height on mobile (13:1 content-to-chrome ratio)
- Border instead of shadow for neobrutalist feel
- Minimal animation (if any, 300-400ms max)

### Pattern 5: FAQ Footer Accordion
**What:** FAQ relocated from homepage to footer as collapsible accordion
**When to use:** Secondary information that shouldn't distract from primary conversion flow

**Example:**
```astro
<footer class="border-t-[3px] border-text-light dark:border-text-dark py-12">
  <div class="container mx-auto px-4">
    <!-- Primary footer content -->

    <div class="mt-12 pt-8 border-t-[3px] border-text-light/20">
      <h2 class="font-heading text-2xl font-bold mb-6">FAQ</h2>
      <details class="mb-4 border-[3px] border-text-light dark:border-text-dark rounded p-4">
        <summary class="font-heading font-bold cursor-pointer">
          What technologies do you work with?
        </summary>
        <p class="mt-4 pl-4">
          <!-- Answer content -->
        </p>
      </details>
      <!-- More FAQ items -->
    </div>
  </div>
</footer>
```

### Anti-Patterns to Avoid
- **Translucent sticky headers:** Reduces contrast, fails WCAG, looks unfinished in neobrutalism
- **Oversized sticky headers:** >60px mobile height wastes screen real estate (common mistake per NN/G)
- **Mixed accent colors in single section:** Violates "one accent per section" rule from Phase 7
- **Client-side-only form validation:** Bypassed by malicious users, fails on legacy browsers
- **Disabled submit buttons:** Prevents form submission, use validation messages instead
- **FAQ on homepage:** Distracts from narrative flow, better in footer or separate page

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom JavaScript validation | HTML5 attributes + Astro SSR | HTML5 required/minlength/type="email" works with screen readers, Astro handles server-side automatically |
| Smooth scroll to anchors | Custom scroll animation | CSS scroll-behavior: smooth | Native browser support, respects prefers-reduced-motion, hardware-accelerated |
| Accordion/disclosure | Custom toggle JavaScript | HTML details/summary | Semantic HTML, built-in keyboard support, no JavaScript needed |
| Focus management | Custom focus trap | Browser-native focus-visible | Modern browsers handle focus rings automatically with WCAG compliance |
| Error announcements | Custom notification system | ARIA live regions (aria-live, role="alert") | Screen readers support natively, no library needed |

**Key insight:** Astro's SSR capabilities and modern HTML5/CSS features eliminate the need for client-side libraries. This aligns perfectly with neobrutalism's "back to basics" philosophy while maintaining accessibility.

## Common Pitfalls

### Pitfall 1: Neobrutalism Over Usability
**What goes wrong:** Bold borders, shadows, and colors reduce readability and violate WCAG contrast ratios
**Why it happens:** Designers prioritize aesthetic impact without testing contrast or considering color blindness
**How to avoid:**
- Test all text/background combinations with contrast checker (minimum 4.5:1 for body text, 3:1 for large text)
- Limit palette to 2-3 bold colors maximum per NN/G recommendation
- Use generous whitespace (24-32px margins) to offset visual density
**Warning signs:** Yellow text on white background, thin fonts on bold backgrounds, insufficient padding around bordered elements

### Pitfall 2: Sticky Header Scope Creep
**What goes wrong:** Sticky header grows to include logo, full navigation, search, CTA, dark mode toggle, consuming 30-40% of mobile viewport
**Why it happens:** Stakeholders want "everything accessible" without considering space tradeoff
**How to avoid:**
- Calculate content-to-chrome ratio (should be >7:1, ideally 13:1 on mobile)
- Prioritize: logo, 3-4 primary nav links maximum, one utility (dark mode or menu)
- Hide secondary navigation in mobile menu
- Test on iPhone SE (375px width) to enforce constraints
**Warning signs:** Header taller than 60px on mobile, multiple rows of navigation, duplicate CTAs

### Pitfall 3: Form Validation Timing Mismatch
**What goes wrong:** Error messages appear while user is still typing, or don't appear until full form submission
**Why it happens:** Misunderstanding of when to validate (blur vs. input vs. submit events)
**How to avoid:**
- Use HTML5 validation (required, minlength) for immediate feedback on blur
- Use Astro SSR validation for comprehensive server-side checks on submit
- Never show "field is required" error until user leaves the field
- Use aria-live="polite" for real-time feedback, "assertive" for post-blur errors
**Warning signs:** Error messages flickering during typing, no feedback until submit, form submitting with invalid data

### Pitfall 4: Asymmetric Layout Becomes Chaotic
**What goes wrong:** Asymmetric grid layouts create confusion rather than visual interest, users can't find content
**Why it happens:** Randomizing grid structure without considering visual hierarchy or reading flow
**How to avoid:**
- Start with F-pattern or Z-pattern reading flow, then introduce asymmetry
- Ensure largest grid items contain most important content
- Maintain consistent gap spacing across all grid layouts
- Test responsive behavior (asymmetry should simplify to single column on mobile)
**Warning signs:** Important content buried in small grid cells, no clear visual entry point, inconsistent spacing

### Pitfall 5: ARIA Over-Engineering
**What goes wrong:** Every element has aria-label, aria-describedby, role attributes even when semantic HTML suffices
**Why it happens:** Misunderstanding that more ARIA = more accessible
**How to avoid:**
- Use semantic HTML first (<label>, <button>, <nav>, <footer>, <section>)
- Only add ARIA when HTML semantics are insufficient
- For forms: required/aria-required, aria-invalid, aria-describedby for errors
- For live regions: role="alert" or aria-live="polite"/"assertive"
- Test with screen reader (macOS VoiceOver) to verify announcements
**Warning signs:** Every div has a role, duplicate labels (HTML label + aria-label), conflicting ARIA and HTML semantics

### Pitfall 6: Missing Focus State Customization
**What goes wrong:** Neobrutalist borders/shadows obscure browser default focus rings, keyboard users can't track focus
**Why it happens:** Designers style interactive elements without considering :focus-visible state
**How to avoid:**
- Use box-shadow focus rings from Phase 8 pattern (respects border-radius)
- Ensure 2px gap + 4px ring for WCAG 2.4.13 compliance (21:1 contrast)
- Test keyboard navigation through entire homepage
- Never use outline: none without replacement focus indicator
**Warning signs:** Invisible focus on form inputs, tab key navigation unclear, focus ring clipped by overflow

## Code Examples

Verified patterns from official sources and prior phases:

### Astro SSR Form Submission Handler
```astro
---
// Source: https://docs.astro.build/en/recipes/build-forms/
export const prerender = false;

let formData = { name: '', email: '', message: '' };
let errors = {};
let submitted = false;

if (Astro.request.method === "POST") {
  try {
    const data = await Astro.request.formData();
    formData.name = data.get("name")?.toString() || '';
    formData.email = data.get("email")?.toString() || '';
    formData.message = data.get("message")?.toString() || '';

    // Server-side validation
    if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email";
    }
    if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errors).length === 0) {
      // Process form submission
      submitted = true;
      // Send email, save to database, etc.
    }
  } catch (error) {
    errors.general = "Submission failed. Please try again.";
  }
}
---
```

### Accessible Form Input with Error Handling
```astro
<!-- Source: W3C WAI Forms Tutorial -->
<div class="mb-6">
  <label
    for="email"
    class="block font-heading font-bold mb-2 text-text-light dark:text-text-dark"
  >
    Email Address <span aria-label="required">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    required
    aria-required="true"
    aria-invalid={errors.email ? "true" : "false"}
    aria-describedby={errors.email ? "email-error" : "email-hint"}
    class="w-full px-4 py-3 border-[3px] border-text-light dark:border-text-dark rounded bg-bg-light dark:bg-bg-dark font-body focus:outline-none focus:shadow-[0_0_0_2px_var(--color-bg-light),0_0_0_6px_var(--color-text-light)] dark:focus:shadow-[0_0_0_2px_var(--color-bg-dark),0_0_0_6px_var(--color-text-dark)]"
    value={formData.email}
  />
  <p id="email-hint" class="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark">
    We'll never share your email.
  </p>
  {errors.email && (
    <p
      id="email-error"
      class="mt-2 text-sm font-bold text-magenta"
      aria-live="assertive"
    >
      {errors.email}
    </p>
  )}
</div>
```

### Neobrutalist Section with Asymmetric Grid
```astro
<!-- Source: NN/G neobrutalism best practices + CSS Grid patterns -->
<section
  id="solutions"
  class="py-24 md:py-32 bg-bg-light dark:bg-bg-dark"
  aria-labelledby="solutions-heading"
>
  <div class="container mx-auto px-4">
    <!-- Asymmetric 2:1 grid on desktop, stacks on mobile -->
    <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12 items-start">
      <!-- Primary content: larger column -->
      <div>
        <h2
          id="solutions-heading"
          class="font-heading font-bold text-4xl md:text-5xl lg:text-6xl uppercase mb-6 leading-tight text-text-light dark:text-text-dark"
        >
          Custom Software That Works
        </h2>
        <p class="text-lg md:text-xl mb-8 leading-relaxed text-text-light dark:text-text-dark">
          I build tools that solve real problems for small businesses...
        </p>
        <div class="flex flex-wrap gap-4">
          <Button variant="yellow" href="#contact">
            Start a Project
          </Button>
          <Button variant="turquoise" href="/portfolio">
            View Portfolio
          </Button>
        </div>
      </div>

      <!-- Supporting content: smaller column -->
      <Card variant="yellow" stacked class="sticky top-24">
        <h3 class="font-heading font-bold text-2xl mb-4">What You Get</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="text-yellow text-2xl" aria-hidden="true">→</span>
            <span>Direct access to your developer</span>
          </li>
          <!-- More list items -->
        </ul>
      </Card>
    </div>
  </div>
</section>
```

### Sticky Header with Neobrutalist Styling
```astro
<!-- Source: NN/G sticky header guidelines -->
<header
  class="sticky top-0 z-30 bg-bg-light dark:bg-bg-dark border-b-[3px] border-text-light dark:border-text-dark"
>
  <div class="container mx-auto px-4 py-3 flex items-center justify-between h-[60px]">
    <!-- Logo -->
    <a
      href="/"
      class="font-heading text-xl md:text-2xl font-bold text-text-light dark:text-text-dark hover:text-yellow dark:hover:text-yellow transition-colors"
    >
      Joel Shinness
    </a>

    <!-- Desktop navigation: limited to essential links -->
    <nav class="hidden md:flex items-center gap-6" aria-label="Primary navigation">
      <a
        href="#solutions"
        class="font-heading font-bold text-text-light dark:text-text-dark hover:text-yellow transition-colors"
      >
        Solutions
      </a>
      <a
        href="#process"
        class="font-heading font-bold text-text-light dark:text-text-dark hover:text-turquoise transition-colors"
      >
        Process
      </a>
      <a
        href="/portfolio"
        class="font-heading font-bold text-text-light dark:text-text-dark hover:text-magenta transition-colors"
      >
        Portfolio
      </a>

      <!-- Dark mode toggle: single utility -->
      <button
        id="theme-toggle"
        type="button"
        aria-label="Toggle dark mode"
        class="w-10 h-10 flex items-center justify-center border-[3px] border-text-light dark:border-text-dark rounded hover:bg-yellow dark:hover:bg-yellow transition-colors focus:outline-none focus:shadow-[0_0_0_2px_var(--color-bg-light),0_0_0_6px_var(--color-text-light)] dark:focus:shadow-[0_0_0_2px_var(--color-bg-dark),0_0_0_6px_var(--color-text-dark)]"
      >
        <!-- SVG icons -->
      </button>
    </nav>

    <!-- Mobile menu button -->
    <button
      id="mobile-menu-toggle"
      type="button"
      aria-label="Open menu"
      aria-expanded="false"
      class="md:hidden w-10 h-10 flex items-center justify-center border-[3px] border-text-light dark:border-text-dark rounded"
    >
      <span class="sr-only">Menu</span>
      <!-- Hamburger icon -->
    </button>
  </div>
</header>
```

### FAQ Footer Accordion with Native HTML
```astro
<!-- Source: Native HTML details/summary element -->
<footer class="border-t-[3px] border-text-light dark:border-text-dark bg-bg-light dark:bg-bg-dark py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <!-- Footer columns -->
    </div>

    <!-- FAQ Section -->
    <div class="pt-8 border-t-[3px] border-text-light/20 dark:border-text-dark/20">
      <h2 class="font-heading text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
        Frequently Asked Questions
      </h2>

      <div class="space-y-4 max-w-3xl">
        <details class="group border-[3px] border-text-light dark:border-text-dark rounded p-4 bg-bg-light dark:bg-bg-dark">
          <summary class="font-heading font-bold cursor-pointer list-none flex items-center justify-between">
            <span>What technologies do you work with?</span>
            <span class="text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <div class="mt-4 pt-4 border-t-[3px] border-text-light/20 dark:border-text-dark/20">
            <p class="text-text-light dark:text-text-dark leading-relaxed">
              I specialize in modern web technologies including Astro, React, Node.js, and Tailwind CSS...
            </p>
          </div>
        </details>

        <details class="group border-[3px] border-text-light dark:border-text-dark rounded p-4 bg-bg-light dark:bg-bg-dark">
          <summary class="font-heading font-bold cursor-pointer list-none flex items-center justify-between">
            <span>How long does a typical project take?</span>
            <span class="text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <div class="mt-4 pt-4 border-t-[3px] border-text-light/20 dark:border-text-dark/20">
            <p class="text-text-light dark:text-text-dark leading-relaxed">
              Most projects range from 4-12 weeks depending on complexity...
            </p>
          </div>
        </details>

        <!-- More FAQ items -->
      </div>
    </div>
  </div>
</footer>
```

### Smooth Scroll to Sections
```css
/* Source: CSS scroll-behavior property */
/* Add to global.css */
html {
  scroll-behavior: smooth;
}

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Offset for sticky header (60px) */
section[id] {
  scroll-margin-top: 60px;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Client-side form libraries (Formik, React Hook Form) | Astro SSR with HTML5 validation | Astro 4.0+ (2024) | Zero client JS, progressive enhancement, better accessibility |
| Custom JavaScript accordions | Native HTML details/summary | Widespread support 2020+ | No JavaScript needed, built-in keyboard support, semantic HTML |
| JavaScript scroll libraries (GSAP, ScrollMagic) | CSS scroll-behavior: smooth | Broad support 2019+ | Hardware-accelerated, respects prefers-reduced-motion, no library |
| Translucent sticky headers | Opaque headers with borders | Neobrutalism trend 2020+ | Better contrast, clearer visual hierarchy, WCAG compliance |
| Symmetric grid layouts | Asymmetric CSS Grid patterns | CSS Grid maturity 2018+ | More dynamic visual interest, better storytelling hierarchy |

**Deprecated/outdated:**
- **jQuery validation plugins:** HTML5 + native browser validation now sufficient
- **Floating labels:** Poor accessibility, confusing for screen readers, use standard labels above fields
- **Hamburger-only mobile nav without label:** Add visible "Menu" text for clarity
- **"Click here" link text:** Use descriptive link text ("View Portfolio" not "Click here")

## Open Questions

Things that couldn't be fully resolved:

1. **Form submission backend**
   - What we know: Astro handles form processing server-side, validation patterns established
   - What's unclear: Actual email delivery mechanism (SendGrid, Resend, Netlify Forms, etc.)
   - Recommendation: Start with Astro API route that logs to console, add email service in Phase 10 or later

2. **Homepage section scroll spy**
   - What we know: Smooth scrolling works with CSS scroll-behavior: smooth
   - What's unclear: Should navigation links highlight as user scrolls through sections?
   - Recommendation: Defer to Phase 10+ enhancement, not critical for initial narrative experience

3. **Mobile navigation pattern**
   - What we know: Existing MobileNav.astro component, needs neobrutalist styling
   - What's unclear: Full-screen overlay vs. slide-in drawer vs. dropdown menu
   - Recommendation: Review existing MobileNav implementation, maintain current pattern but apply neobrutalist borders/shadows

4. **FAQ content source**
   - What we know: FAQ should relocate from homepage to footer
   - What's unclear: FAQ content currently in FAQ.astro component, how much to migrate vs. condense
   - Recommendation: Extract 3-5 most common questions for footer, defer full FAQ page to future phase if needed

## Sources

### Primary (HIGH confidence)
- [Neobrutalism: Definition and Best Practices - NN/G](https://www.nngroup.com/articles/neobrutalism/)
- [Forms Tutorial | Web Accessibility Initiative (WAI) | W3C](https://www.w3.org/WAI/tutorials/forms/)
- [Form Validation Tutorial | W3C WAI](https://www.w3.org/WAI/tutorials/forms/validation/)
- [User Notifications Tutorial | W3C WAI](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [Build HTML forms in Astro | Astro Docs](https://docs.astro.build/en/recipes/build-forms/)
- [Sticky Headers: 5 Ways to Make Them Better - NN/G](https://www.nngroup.com/articles/sticky-headers/)

### Secondary (MEDIUM confidence)
- [10 modern footer UX patterns for 2026](https://www.eleken.co/blog-posts/footer-ux)
- [Astro Contact Form using free API (with examples) - Web3Forms](https://web3forms.com/platforms/astro-contact-form)
- [The anatomy of accessible forms: Best practices - Deque](https://www.deque.com/blog/anatomy-of-accessible-forms-best-practices/)
- [What Is a Sticky Header? Guide (2026)](https://www.parallelhq.com/blog/what-sticky-header)
- [Stunning hero sections for 2026: Layouts, patterns, and ...](https://lexingtonthemes.com/blog/stunning-hero-sections-2026)

### Tertiary (LOW confidence)
- [Neubrutalism - UI Design Trend That Wins The Web - Bejamas](https://bejamas.com/blog/neubrutalism-web-design-trend)
- [Brutalism vs Neubrutalism in UI Design: Unpacking the Differences](https://www.cccreative.design/blogs/brutalism-vs-neubrutalism-in-ui-design)
- [Form design patterns, the book by Adam Silver](https://formdesignpatterns.com/)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro SSR and HTML5 validation confirmed via official docs
- Architecture: MEDIUM - Patterns verified via W3C/NN/G but specific asymmetric layouts require experimentation
- Pitfalls: MEDIUM - NN/G warnings verified, form validation pitfalls from W3C, but neobrutalist-specific issues based on design trend analysis

**Research date:** 2026-02-09
**Valid until:** ~2026-03-09 (30 days - stable technologies, design principles evolve slowly)
