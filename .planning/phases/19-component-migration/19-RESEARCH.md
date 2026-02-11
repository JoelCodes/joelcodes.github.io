# Phase 19: Component Migration (Tiered) - Research

**Researched:** 2026-02-10
**Domain:** Astro component refactoring, design system migration, accessibility compliance
**Confidence:** HIGH

## Summary

This phase involves migrating raw HTML elements (buttons, inputs, textareas, selects) to design system components (Button, Input, Card, Badge) across 11 production pages. The audit identified 16 findings categorized as HIGH (7), MEDIUM (6), and LOW (3) severity.

The standard approach for component migration in Astro is incremental refactoring: replace raw HTML with components one page at a time, using atomic commits for easy rollback. Astro's HTML-first philosophy makes this straightforward since components are TypeScript-typed templates that render to static HTML.

Key technical constraints discovered:
- Astro components cannot accept onclick as a prop (gets stringified)
- Event handlers must use `<script>` tags with addEventListener
- HTMLAttributes type spreading works for native HTML props only
- WCAG 2.4.13 requires minimum 2px focus indicator with 3:1 contrast ratio

**Primary recommendation:** Use page-by-page migration with component prop expansion strategy. Add missing props (onclick forwarding via data attributes, loading state support) to components before migrating pages. Test both light and dark modes after each page to catch shadow/glow transformation issues.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x | Static site generator | HTML-first components, zero-JS by default, TypeScript support |
| TypeScript | Latest | Type safety | HTMLAttributes types for prop spreading, interface validation |
| Tailwind CSS | 4.x | Utility styling | Data attribute variants, design token integration |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @lucide/astro | Latest | Icon components (Loader2) | Loading spinners in button states |
| Zod | Latest | Runtime validation | Form validation (already in use for content) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro components | Web Components | More complex, requires JS runtime, but better for client-side interactions |
| Data attributes | Class toggling | Harder to track state, multiple classes can conflict |
| addEventListener | React/Vue components | Requires framework overhead, violates Astro zero-JS philosophy |

**Installation:**
```bash
# Already installed - no new dependencies needed
```

## Architecture Patterns

### Recommended Migration Structure
```
Migration order (per CONTEXT.md):
1. Contact page (/src/pages/contact.astro)
   - 4 inputs → Input component
   - 1 submit button → Button component with loading state
2. Filter buttons (batch commit)
   - Portfolio index (/src/pages/projects/index.astro)
   - Blog index (/src/pages/blog/index.astro)
3. Portfolio detail (/src/pages/projects/[slug].astro)
   - Category/tech badges → Badge component
4. Homepage sections (LOW priority, time permitting)
```

### Pattern 1: Component Prop Expansion (Add Missing Props)
**What:** Components need new props to match raw HTML capabilities
**When to use:** Before migrating pages that need features components don't support

**Example - Button with onclick forwarding:**
```typescript
// Source: Official Astro docs + user decisions in CONTEXT.md
// Button.astro - extend interface
interface Props extends Omit<HTMLAttributes<'button'>, 'class'> {
  variant?: 'yellow' | 'turquoise' | 'magenta' | 'outline'; // Add outline
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
  loading?: boolean;  // Add loading state
  // Note: onclick comes through ...rest via HTMLAttributes
}

// Use data-variant for JavaScript state toggling
<Tag
  class:list={[`btn btn-${variant}`, className]}
  data-variant={variant}  // JS can toggle this
  {...rest}  // Spreads onclick and other HTML attributes
>
```

**Why this works:** HTMLAttributes type includes onclick as string, but Astro stringifies functions. Solution: Pass onclick as string (`onclick="functionName(this)"`) and define function in `<script>` tag.

### Pattern 2: Data Attribute State Management
**What:** Use data-variant attribute for JavaScript-driven state changes
**When to use:** Filter buttons that toggle between active/inactive states

**Example:**
```javascript
// Source: Modern CSS data attribute patterns (2026)
// JavaScript toggles data attribute
function setActiveButton(button) {
  // Clear all active states
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.dataset.variant = 'outline';
  });
  // Set clicked button to solid
  button.dataset.variant = 'yellow';  // or 'turquoise' based on page
}
```

```css
/* CSS handles visual appearance based on data-variant */
.btn[data-variant="outline"] {
  background: transparent;
  border: 3px solid var(--color-text);
}
.btn[data-variant="yellow"] {
  background: var(--color-yellow);
  border: 3px solid var(--color-text);
}
```

**Advantages:**
- Single source of truth (one attribute = one state)
- No conflicting class combinations
- JavaScript reads/writes same attribute CSS styles
- Tailwind supports data attribute variants

### Pattern 3: Form Component with Validation
**What:** Replace raw HTML inputs with Input component while preserving validation
**When to use:** Contact page, ContactSection component

**Example:**
```astro
// Source: Existing Input component + WCAG 2.4.13 requirements
<Input
  label="Email"
  type="email"
  name="email"
  variant="turquoise"
  placeholder="you@example.com"
  required
  autocomplete="email"
/>
```

**What gets preserved:**
- Form validation (required, type checking)
- Autocomplete hints
- WCAG 2.4.13 focus states (2px gap + 4px ring)
- Error message handling (via error prop)
- JavaScript validation in `<script>` tag (unchanged)

**What improves:**
- Consistent focus appearance across all inputs
- aria-invalid, aria-describedby for errors
- Dark mode compatibility (shadow → glow transformation)

### Pattern 4: Loading State Implementation
**What:** Button shows spinner during async operations (form submission)
**When to use:** Submit buttons on Contact page

**Example - Recommended approach (Claude's discretion per CONTEXT.md):**
```astro
// Option 1: Loading prop (cleaner, recommended)
<Button
  type="submit"
  variant="turquoise"
  size="lg"
  class="w-full"
  loading={false}  // JavaScript toggles this
>
  Send Message
</Button>

// Button.astro implementation
{loading ? (
  <Loader2 size={20} class="animate-spin" />
) : (
  <slot />
)}
```

**Accessibility notes:**
- Use aria-busy="true" during loading
- Don't use disabled attribute (breaks keyboard focus)
- Use aria-disabled="true" instead to keep in tab order
- Ensure spinner has 3:1 contrast ratio against button background

### Pattern 5: Textarea/Select Extension
**What:** Input component currently only handles `<input>` elements
**When to use:** Contact page has `<textarea>` and `<select>` elements

**Solution - Create wrapper or extend:**
```astro
// Option 1: Separate components (cleaner)
// Textarea.astro (follows same pattern as Input.astro)
// Select.astro (follows same pattern as Input.astro)

// Option 2: Polymorphic Input component
interface Props {
  as?: 'input' | 'textarea' | 'select';
  // ... rest of props
}

const Tag = as || 'input';
```

**WCAG compliance checklist:**
- Always use `<label>` with for attribute
- Don't auto-submit on select change (disrupts screen readers)
- Placeholder text is visual only (don't rely on it)
- Validation messages only after user interaction

### Anti-Patterns to Avoid

- **Inline onclick functions:** Astro stringifies functions, so `onclick={() => doThing()}` becomes useless string. Use addEventListener in `<script>` tag or pass string like `onclick="doThing(this)"`.
- **Mixing raw HTML and components on same page during migration:** Complete one page fully before moving to next. Partial migration creates inconsistent focus states and dark mode issues.
- **Class-based state toggling:** Using multiple classes (`.active`, `.inactive`) creates conflicts. Use single data-variant attribute instead.
- **Auto-submitting forms on select change:** Breaks screen reader flow (selects each option while reading). Always require explicit submit.
- **Inverting colors naively for dark mode:** Test that borders, shadows, and text maintain contrast. Shadow → glow transformation requires proper component usage.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Focus ring styling | Custom outline CSS per element | Component's built-in focus states | WCAG 2.4.13 requires 2px indicator + 3:1 contrast. Components already calculate this correctly for light/dark modes |
| Loading spinner animation | CSS keyframe + manual DOM manipulation | Lucide Loader2 component | Screen reader compatible, size-aware, consistent across pages |
| Form validation messages | Custom error div positioning | Input component's error prop | Handles aria-invalid, aria-describedby, error ID generation automatically |
| Dark mode shadow → glow | Manual box-shadow swapping | Card/Badge component variants | CSS custom properties + color-mix() for proper glow effect |
| Button state management | Multiple classes (`.active`, `.inactive`, `.hover`) | Data attribute variants | Prevents conflicting states, easier to debug, single source of truth |
| Event delegation | Individual addEventListener per element | querySelectorAll in `<script>` tag | Astro auto-deduplicates scripts, handles multiple instances |

**Key insight:** Astro components are TypeScript-typed HTML templates. They provide type safety, ARIA attributes, and dark mode compatibility out of the box. Raw HTML duplication creates maintenance debt and accessibility gaps that are hard to audit.

## Common Pitfalls

### Pitfall 1: Event Handler Stringification
**What goes wrong:** Adding onclick prop to component like `onclick={() => handleClick()}` results in useless stringified function
**Why it happens:** Astro renders components server-side to static HTML. Functions don't serialize.
**How to avoid:**
```typescript
// DON'T: Pass function as prop
<Button onclick={() => filterSelection('all')}>All</Button>

// DO: Pass string that calls global function
<Button onclick="filterSelection('all'); setActiveButton(this)">All</Button>

// And define function in script tag
<script>
  function filterSelection(category) { /* ... */ }
  function setActiveButton(button) { /* ... */ }
</script>
```
**Warning signs:** Browser console shows "undefined is not a function" or onclick attribute contains "[object Object]"

### Pitfall 2: Dark Mode Testing Blind Spots
**What goes wrong:** Component migration looks correct in light mode but breaks in dark mode (borders invisible, shadows missing glow effect, text unreadable)
**Why it happens:** Raw HTML uses inline Tailwind classes that override component's dark mode CSS custom properties. Migrating to component changes cascade specificity.
**How to avoid:**
- Test BOTH light and dark modes after each page migration
- Use browser DevTools to toggle `.dark` class on `<html>` element
- Check for:
  - Border visibility (should use --color-text-dark)
  - Shadow transformation (shadow-[6px_6px_0] should become glow)
  - Text contrast (run WCAG contrast checker)
- Specific test: Filter buttons in light mode use solid bg, dark mode should glow on active
**Warning signs:** User reports "can't see buttons in dark mode" or accessibility audit fails contrast requirements

### Pitfall 3: Focus State Regression
**What goes wrong:** After migration, keyboard focus indicator is less visible than before, or focus ring appears on mouse clicks
**Why it happens:** Component uses `:focus-visible` (modern), raw HTML used `:focus` (older). Different browser behavior.
**How to avoid:**
- Always test keyboard navigation after migration (Tab key through all interactive elements)
- Verify focus ring appears with 2px gap + 4px ring (WCAG 2.4.13 minimum)
- Ensure focus ring does NOT appear on mouse clicks (`:focus-visible` handles this)
- Check focus order matches visual order (top to bottom, left to right)
**Warning signs:** Keyboard users report "can't see where I am on page" or focus jumps unexpectedly

### Pitfall 4: Form Validation Timing
**What goes wrong:** Migrating to Input component shows error messages before user interacts with field, or errors don't clear when user corrects input
**Why it happens:** Raw HTML uses `:user-invalid` CSS pseudo-class (shows error after interaction), component might validate on render
**How to avoid:**
- Preserve existing JavaScript validation logic (don't rely solely on component)
- Only show error messages after:
  - User blurs field (onblur event)
  - User submits form (onsubmit event)
  - NOT on initial render or while typing
- Example pattern:
```javascript
field.addEventListener('blur', () => {
  if (!field.validity.valid) {
    showFieldError(fieldName);
  }
});
```
**Warning signs:** Form shows "Please enter your name" before user even clicks on field

### Pitfall 5: Loading State Focus Management
**What goes wrong:** After form submission, focus disappears or lands on wrong element, confusing keyboard/screen reader users
**Why it happens:** Button disabled during loading removes it from tab order, and when success message replaces form, focus stays on non-existent element
**How to avoid:**
- Use aria-disabled="true" instead of disabled attribute (keeps in tab order)
- Use aria-busy="true" during loading to announce to screen readers
- After success, move focus to success message heading
```javascript
function showSuccessMessage() {
  const section = form.closest('section');
  const successContent = successTemplate.content.cloneNode(true);
  section.replaceWith(successContent);
  // Move focus to success heading
  document.querySelector('h2').focus();
}
```
**Warning signs:** Screen reader announces nothing after form submission, or keyboard focus is lost

### Pitfall 6: Partial Page Migration
**What goes wrong:** Migrating only some buttons/inputs on a page creates inconsistent focus styles, confusing visual hierarchy
**Why it happens:** Developer migrates one finding at a time instead of completing whole page
**How to avoid:** Complete one page fully before moving to next (per CONTEXT.md decision: page-by-page approach)
- All buttons on page should use Button component
- All inputs on page should use Input component
- Don't mix raw `<button>` with `<Button>` component on same page
**Warning signs:** Some buttons have neobrutalist shadow lift, others don't. Some inputs have double-ring focus, others have single-ring.

### Pitfall 7: Component Prop Type Mismatches
**What goes wrong:** TypeScript errors when spreading props, or autocomplete hints missing for HTML attributes
**Why it happens:** Component interface doesn't extend HTMLAttributes, or Omit excludes needed props
**How to avoid:**
```typescript
// DO: Extend HTMLAttributes for proper prop spreading
interface Props extends Omit<HTMLAttributes<'button'>, 'class'> {
  variant?: 'yellow' | 'turquoise' | 'magenta';
  // ... custom props
}

// Omit 'class' because we use 'class' as custom prop (className pattern)
// This allows {...rest} to include all other HTML attributes
```
**Warning signs:** TypeScript error "Type 'string' is not assignable to type 'never'" or autocomplete doesn't suggest onclick/type/name

## Code Examples

Verified patterns from official sources and existing codebase:

### Contact Page Input Migration
```astro
<!-- BEFORE: Raw HTML (lines 32-42 of contact.astro) -->
<div>
  <label for="name" class="block font-body font-medium mb-2 text-text-light dark:text-text-dark">
    Name <span class="text-red-600">*</span>
  </label>
  <input
    type="text"
    id="name"
    name="name"
    required
    minlength="2"
    autocomplete="name"
    class="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-text-light dark:text-text-dark font-body focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent transition-colors"
    placeholder="Your name"
  />
  <span id="name-error" class="block text-sm text-red-600 mt-1 min-h-5" aria-live="polite"></span>
</div>

<!-- AFTER: Input component -->
<Input
  label="Name *"
  type="text"
  name="name"
  variant="yellow"
  required
  minlength={2}
  autocomplete="name"
  placeholder="Your name"
/>
```

**Notes:**
- Input component handles label, input, and error message container
- variant="yellow" matches Contact page theme (per audit)
- JavaScript validation logic in `<script>` tag unchanged
- Asterisk moved into label text (component doesn't have required indicator prop)

### Filter Button Migration
```astro
<!-- BEFORE: Raw HTML button (portfolio index lines 24-29) -->
<button
  class="filter-btn active px-6 py-2 rounded-full transition-colors duration-200 bg-yellow dark:bg-yellow-dark border-[3px] border-text-light dark:border-text-dark font-bold text-text-light dark:text-text-dark hover:bg-yellow-600 dark:hover:bg-yellow-500"
  onclick="filterSelection('all'); setActiveButton(this)"
>
  All Projects
</button>

<!-- AFTER: Button component with data-variant -->
<Button
  variant="yellow"
  size="md"
  data-variant="yellow"
  onclick="filterSelection('all'); setActiveButton(this)"
>
  All Projects
</Button>

<!-- Inactive button uses outline variant -->
<Button
  variant="outline"
  size="md"
  data-variant="outline"
  onclick="filterSelection('web-apps'); setActiveButton(this)"
>
  Web Apps
</Button>
```

**JavaScript update for state toggling:**
```javascript
// Source: Data attribute state management pattern (2026)
function setActiveButton(clickedButton) {
  // Reset all buttons to outline
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.dataset.variant = 'outline';
  });
  // Set clicked button to solid variant
  clickedButton.dataset.variant = 'yellow'; // Or 'turquoise' for blog page
}
```

### Submit Button with Loading State
```astro
<!-- Component usage -->
<Button
  type="submit"
  variant="turquoise"
  size="lg"
  class="w-full"
  id="submit-button"
>
  <span class="button-text">Send Message</span>
  <span class="loading-icon hidden">
    <Loader2 size={20} />
  </span>
</Button>

<!-- JavaScript loading state management -->
<script>
  import { Loader2 } from '@lucide/astro';

  const submitButton = document.getElementById('submit-button');
  const buttonText = submitButton.querySelector('.button-text');
  const loadingIcon = submitButton.querySelector('.loading-icon');

  function setLoadingState(loading) {
    // Use aria-disabled, not disabled (keeps in tab order)
    submitButton.setAttribute('aria-disabled', loading.toString());
    submitButton.setAttribute('aria-busy', loading.toString());

    if (loading) {
      buttonText.classList.add('hidden');
      loadingIcon.classList.remove('hidden');
    } else {
      buttonText.classList.remove('hidden');
      loadingIcon.classList.add('hidden');
    }
  }
</script>
```

**Notes:**
- Uses aria-disabled instead of disabled to preserve keyboard navigation
- aria-busy announces loading state to screen readers
- Loader2 component handles spinner animation
- Manual DOM manipulation needed because Astro components are static

### Badge Component Migration
```astro
<!-- BEFORE: Raw HTML (portfolio detail line 37) -->
<div class="inline-block px-4 py-2 bg-yellow dark:bg-yellow-dark border-[3px] border-text-light dark:border-text-dark font-bold text-sm">
  {project.categoryLabel}
</div>

<!-- AFTER: Badge component -->
<Badge
  label={`Project category: ${project.categoryLabel}`}
  value={project.categoryLabel}
  variant="yellow"
/>
```

**Notes:**
- label prop is for screen readers (aria-label)
- value prop is the displayed text
- Component adds role="group" for semantic grouping

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| :focus pseudo-class | :focus-visible pseudo-class | WCAG 2.2 (2023) | Focus rings only show for keyboard, not mouse clicks. Better UX. |
| disabled attribute on buttons | aria-disabled="true" + aria-busy | 2024-2025 accessibility updates | Keeps element in tab order during loading, screen readers aware of state |
| Class-based state (.active, .hover) | data-attribute variants | Tailwind 3.4+ (2024) | Single source of truth, no conflicting classes, CSS and JS use same attribute |
| Manual focus ring CSS | WCAG 2.4.13 requirements | WCAG 2.2 AAA (October 2023) | Minimum 2px indicator + 3:1 contrast ratio enforced |
| Inline Tailwind duplication | Design system components | Ongoing 2024-2026 | Centralized styling, dark mode compatibility, accessibility baked in |

**Deprecated/outdated:**
- **onclick in Astro component props (as function):** Never worked correctly - Astro stringifies functions. Always use addEventListener in `<script>` tag or pass string.
- **auto-submit on select change:** Breaks screen readers (WCAG violation). Always require explicit submit button.
- **Placeholder as label replacement:** Screen readers don't read placeholder text. Always use visible `<label>` element.

## Open Questions

Things that couldn't be fully resolved:

1. **Outline button variant styling details**
   - What we know: User decided to create "outline" variant for inactive filter buttons (CONTEXT.md line 24)
   - What's unclear: Exact border treatment, background, hover state preferences
   - Recommendation: Use transparent background, 3px border matching text color, subtle hover bg (10% opacity). Test in both light/dark modes. Claude has discretion per CONTEXT.md line 41.

2. **Textarea/Select component strategy**
   - What we know: Contact page has `<textarea>` and `<select>` elements, Input component only handles `<input>`
   - What's unclear: Create separate components (Textarea.astro, Select.astro) or extend Input to be polymorphic?
   - Recommendation: Create separate components following same pattern as Input.astro. Cleaner, easier to maintain, follows single-responsibility principle.

3. **Loading state prop vs manual implementation**
   - What we know: User gave Claude discretion on loading state implementation (CONTEXT.md line 40)
   - What's unclear: Add loading prop to Button component, or keep manual DOM manipulation in page script?
   - Recommendation: Add loading prop to Button component for reusability. Other pages might need loading buttons (blog comment submission, etc.). If loading prop is true, render Loader2 instead of slot.

## Sources

### Primary (HIGH confidence)
- [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/) - Component structure, props, TypeScript
- [Astro Scripts and Event Handling](https://docs.astro.build/en/guides/client-side-scripts/) - addEventListener patterns, deduplication
- [WCAG 2.4.13 Focus Appearance (W3C)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) - 2px minimum, 3:1 contrast ratio requirements
- Existing codebase components (/src/components/ui/Button.astro, Input.astro, Card.astro, Badge.astro)

### Secondary (MEDIUM confidence)
- [Tailwind CSS Best Practices 2025-2026: Design Tokens](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) - Design system migration patterns
- [Data Attribute Variants | Tailwind](https://stevekinney.com/courses/tailwind/data-attribute-variants) - data-variant implementation
- [WCAG 2.4.13 Focus Appearance Guide (AllAccessible)](https://www.allaccessible.org/blog/wcag-2413-focus-appearance-guide) - Implementation examples
- [Making an Accessible Loading Button (Bekk Christmas)](https://www.bekk.christmas/post/2023/24/accessible-loading-button) - aria-disabled vs disabled
- [Button States Explained (2026) - DesignRush](https://www.designrush.com/best-designs/websites/trends/button-states) - Active/inactive patterns

### Tertiary (LOW confidence)
- [Astro Event Handling Discussion (GitHub)](https://github.com/withastro/roadmap/discussions/1029) - Community discussion on onclick limitations
- [Best Practices for Dark Mode 2026](https://natebal.com/best-practices-for-dark-mode/) - Common pitfalls, testing strategies
- [Conventional Commits Refactoring (Medium)](https://medium.com/@noriller/docs-conventional-commits-feat-fix-refactor-which-is-which-531614fcb65a) - Commit message patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro components are established pattern, existing codebase uses them
- Architecture: HIGH - Patterns verified in official docs + existing component implementation
- Pitfalls: MEDIUM - Based on WebSearch + official docs, not hands-on testing in this codebase
- Component prop expansion: HIGH - HTMLAttributes type usage verified in TypeScript docs + existing components
- Event handling: HIGH - Official Astro docs explicitly state addEventListener approach
- WCAG 2.4.13: HIGH - W3C official specification, not interpretation
- Dark mode testing: MEDIUM - WebSearch patterns, not verified in this specific codebase
- Loading state: MEDIUM - Multiple approaches possible, user gave discretion

**Research date:** 2026-02-10
**Valid until:** 2026-03-10 (30 days - stable domain, Astro 5 is current)

**Key constraints from CONTEXT.md:**
- Page-by-page migration order: Contact → filter buttons → portfolio detail
- Create outline variant for Button component (inactive filter state)
- Keep existing filter logic, modernize integration pattern only
- Manual browser testing + light/dark mode verification after each migration
- FAQ accordion NOT wrapped in Card (deferred to MEDIUM priority)
