# Phase 18: Component Consistency Audit - Research

**Researched:** 2026-02-10
**Domain:** Design system audit, component inventory, accessibility compliance
**Confidence:** HIGH

## Summary

Component consistency audits are systematic investigations of how UI components are used across a codebase to identify inconsistencies, accessibility violations, and opportunities to migrate to standardized design system components. The research reveals that successful audits combine manual code inspection with automated accessibility testing, organize findings by severity (CRITICAL/HIGH/MEDIUM/LOW), and produce actionable documentation that guides remediation.

For this Astro-based static site, the audit will inventory Button, Card, Input, and Badge component usage across 11 pages, checking both component adoption and prop consistency. The standard approach combines grep-based code search for component patterns with manual WCAG compliance verification (contrast, focus states, touch targets, ARIA attributes). Findings are classified by user impact and documented with fix suggestions.

**Primary recommendation:** Use manual code inspection via grep/ripgrep to find component usage patterns, then perform page-by-page manual verification of visual consistency and WCAG compliance. Document findings in `.planning/AUDIT.md` grouped by page with severity tiers and actionable fix suggestions.

## Standard Stack

The established tools/approaches for component audits:

### Core
| Tool/Approach | Version/Type | Purpose | Why Standard |
|---------------|--------------|---------|--------------|
| Manual Code Inspection | Native | Find component usage patterns | Static analysis can't evaluate visual consistency or prop correctness |
| grep/ripgrep | CLI tool | Search for component imports and usage | Fast, reliable pattern matching across codebase |
| Browser DevTools | Built-in | Visual inspection and accessibility checks | Direct verification of rendered output and computed styles |
| Lighthouse | Chrome built-in | Automated accessibility baseline | Free, integrated, catches common WCAG violations |

### Supporting
| Tool | Version/Type | Purpose | When to Use |
|------|--------------|---------|-------------|
| axe DevTools | Browser extension | Detailed WCAG violation reports | When automated accessibility checks needed |
| WAVE | Web tool | Visual accessibility feedback | For educational accessibility insights |
| ast-grep | CLI tool | AST-based component pattern search | For complex TypeScript/JSX pattern matching |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual inspection | Automated visual regression | Automation catches visual changes but can't evaluate "should this be a component" decisions |
| grep | Custom AST parser | AST parsing is more accurate but overkill for simple import/usage search |
| Manual WCAG checks | Fully automated scans | Automation finds 30-40% of issues; manual review required for comprehensive audit |

**Installation:**
```bash
# ripgrep (faster grep alternative)
brew install ripgrep  # macOS
# or
sudo apt install ripgrep  # Linux

# Browser extensions (optional but helpful)
# - Chrome: axe DevTools, WAVE
# - Firefox: WAVE
```

## Architecture Patterns

### Recommended Audit Workflow

```
Phase 18 Audit Process:
├── 1. Component Inventory (grep-based search)
│   ├── Find all Button/Card/Input/Badge imports
│   ├── Find raw HTML equivalents (<button>, <div class="card">, etc.)
│   └── Document current vs. desired state
├── 2. Page-by-Page Verification (manual inspection)
│   ├── Visual consistency check (does it match design system?)
│   ├── Prop consistency check (correct variant/size?)
│   ├── WCAG compliance check (contrast, focus, touch targets, ARIA)
│   └── Dark mode check (colors, shadows, glows)
├── 3. Severity Classification
│   ├── CRITICAL: Blocks users (missing focus states, WCAG violations)
│   ├── HIGH: Brand impact (looks unprofessional, obvious breaks)
│   ├── MEDIUM: Minor styling differences
│   └── LOW: Minor visual/UX differences only
└── 4. Documentation (.planning/AUDIT.md)
    ├── Summary (counts by severity + key themes)
    ├── Findings by page (Homepage, Portfolio, Blog, etc.)
    └── Migration plan (priority order + effort estimates)
```

### Pattern 1: Grep-Based Component Search
**What:** Use ripgrep to find component imports and usage patterns
**When to use:** Initial inventory phase to locate all component usage
**Example:**
```bash
# Source: Ripgrep GUIDE.md (https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md)

# Find all Button component imports
rg "import.*Button" --type ts src/

# Find Button component usage in templates
rg "<Button" src/pages/

# Find raw button elements that should be Button components
rg "<button" src/pages/ -A 2 -B 1

# Find all Card component usage with variants
rg 'variant="(yellow|turquoise|magenta)"' src/pages/

# Find inline Tailwind classes that duplicate component styles
rg 'class=".*border-3.*shadow' src/pages/
```

### Pattern 2: WCAG Severity Classification
**What:** Industry-standard four-tier severity system for accessibility findings
**When to use:** When categorizing audit findings by user impact
**Example:**
```markdown
# Source: WebAIM Severity Ratings (https://webaim.org/blog/severity-ratings/)
# Level Access Severity Levels (https://client.levelaccess.com/hc/en-us/articles/4420160747415)

CRITICAL:
- Blocks users from accessing content or completing tasks
- Missing focus states on interactive elements
- Color contrast below 3:1 (WCAG 1.4.3 failure)
- Broken keyboard navigation

HIGH:
- Significantly hampers usability or denies access to critical features
- Inconsistent component usage creating brand confusion
- Touch targets below 24x24px (WCAG 2.5.8 failure)
- Missing ARIA labels on form inputs

MEDIUM:
- Limits access to non-critical features
- Minor styling differences (wrong shadow color, inconsistent spacing)
- Suboptimal but not blocking (e.g., touch target 26px vs. recommended 44px)

LOW:
- Minimal impact on usability
- Minor visual inconsistencies only
- Affects non-essential features
```

### Pattern 3: Page-by-Page Audit Structure
**What:** Organize findings by page with consolidated duplicates
**When to use:** Final documentation phase to make findings actionable
**Example:**
```markdown
# Source: Design System Audit methodology (https://thedesignsystem.guide/design-audit)

## Homepage (/index.astro)

**Component Usage:**
- ✅ Button: 3 instances (all using component)
- ❌ Card: 0 instances (should use for project showcase)
- ⚠️ Badge: 2 instances (missing on stats section)

**Findings:**

### [CRITICAL] Focus states missing on custom navigation links
**Location:** Header navigation
**Impact:** Keyboard users cannot see which link has focus
**Fix:** Migrate to Button component or add focus-visible styles
**WCAG:** 2.4.13 Focus Appearance (AAA), 2.4.7 Focus Visible (AA)

### [HIGH] Project cards use raw divs instead of Card component
**Location:** Projects showcase section
**Impact:** Inconsistent shadows, missing dark mode glow transformation
**Fix:** Wrap each project in <Card variant="turquoise">
**Pages affected:** Homepage, Portfolio index (2 pages)
```

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Color contrast checking | Manual eyeball test | Browser DevTools Accessibility panel | Computes exact contrast ratios; manual checks miss edge cases |
| Component usage search | Manual file-by-file review | grep/ripgrep with regex | Searches entire codebase in <1 second; manual review takes hours |
| Focus state verification | Visual inspection only | Keyboard navigation testing | Must verify Tab key behavior, not just visual appearance |
| Touch target measurement | Estimate by eye | DevTools + Inspect Element | Accurate pixel measurements; visual estimates often wrong |
| Dark mode verification | Toggle and look | Browser DevTools forced colors | Catches computed style issues invisible to human eye |

**Key insight:** Accessibility audits require both automated tooling and manual verification. Automated tools (Lighthouse, axe) catch 30-40% of WCAG issues; the remaining 60-70% require human judgment about semantic correctness, usability, and edge cases. Never rely solely on automated scans.

## Common Pitfalls

### Pitfall 1: Automated Tools Report False Confidence
**What goes wrong:** Running Lighthouse and seeing "100% accessibility" leads to belief the site is fully accessible
**Why it happens:** Automated tools can only check ~30-40% of WCAG criteria; remainder requires manual testing
**How to avoid:** Always combine automated scans (Lighthouse, axe) with manual checks for keyboard navigation, screen reader compatibility, focus management, and semantic HTML
**Warning signs:** Audit relies only on tool output without manual verification of interactive elements

### Pitfall 2: Severity Inflation or Deflation
**What goes wrong:** Every finding marked CRITICAL (inflation) or everything marked LOW (deflation)
**Why it happens:** Lack of clear severity criteria or pressure to prioritize/deprioritize certain issues
**How to avoid:** Use industry-standard definitions (CRITICAL = blocks users, HIGH = significant barriers, MEDIUM = limits non-critical features, LOW = minimal impact). Apply consistently across all findings
**Warning signs:** All findings in one severity tier, or severity doesn't match WCAG conformance level (A/AA/AAA)

### Pitfall 3: Component vs. Visual Confusion
**What goes wrong:** Flagging visually correct elements that don't use design system components as LOW severity
**Why it happens:** Assuming "looks right = is right" instead of prioritizing long-term maintainability
**How to avoid:** Per user decision in CONTEXT.md, "Flag raw HTML/Tailwind even if it visually matches — component usage is the goal." Non-component usage is at least MEDIUM severity even if visually perfect
**Warning signs:** Audit accepts raw HTML buttons that "look like Button component" as acceptable

### Pitfall 4: Same Issue, Multiple Findings
**What goes wrong:** Reporting "missing focus state on button" separately for each page, inflating finding count
**Why it happens:** Page-by-page audit creates redundant entries for systemic issues
**How to avoid:** Per user decision: "Same inconsistency on multiple pages = one finding with pages listed." Consolidate systemic issues
**Warning signs:** Findings count >50 with many duplicates; migration plan becomes overwhelming

### Pitfall 5: Missing Dark Mode Verification
**What goes wrong:** Audit only checks light mode, misses dark mode contrast failures
**Why it happens:** Dark mode treated as separate concern instead of bundled with visual consistency
**How to avoid:** Per user decision: "Dark mode issues are bundled with visual inconsistencies." Every visual check must verify both modes
**Warning signs:** No dark mode findings in audit despite shadow-to-glow transformations and color variants

### Pitfall 6: Ignoring Touch Target Requirements
**What goes wrong:** Buttons/links smaller than 24x24px go unreported because they "look fine on desktop"
**Why it happens:** Desktop-first thinking ignores mobile/touch users
**How to avoid:** Check WCAG 2.5.8 (Level AA: 24x24px minimum) for all interactive elements. Measure with DevTools, not visual estimation
**Warning signs:** No touch target findings despite small icon buttons or inline links

## Code Examples

Verified patterns from official sources:

### Grep Patterns for Component Inventory
```bash
# Source: ripgrep documentation (https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md)

# Find all component imports
rg "import.*from.*components/ui" src/ -t ts

# Find Button usage (component vs. raw HTML)
rg "<Button" src/pages/ --count  # Component usage count
rg "<button" src/pages/ --count  # Raw button count

# Find specific prop patterns
rg 'variant="(yellow|turquoise|magenta)"' src/pages/ -o

# Find potential Card candidates (divs with shadow classes)
rg '<div.*class=".*shadow-neo' src/pages/

# Find Input usage with accessibility context
rg '<Input' src/pages/ -A 5 -B 2

# Context flags:
# -A N: Show N lines after match
# -B N: Show N lines before match
# -C N: Show N lines before and after
```

### WCAG 2.4.13 Focus Appearance Check
```javascript
// Source: W3C WCAG 2.2 Understanding Doc (https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

// Manual check procedure:
// 1. Tab to element
// 2. Inspect computed styles in DevTools
// 3. Verify:
//    - Contrast ratio ≥3:1 between focused/unfocused states
//    - Focus indicator ≥2px thick or equivalent area
//    - Indicator visible on all sides or significant area

// Example verification in console:
const button = document.querySelector('button');
const unfocused = window.getComputedStyle(button);
button.focus();
const focused = window.getComputedStyle(button);

console.log('Unfocused outline:', unfocused.outline);
console.log('Focused outline:', focused.outline);
console.log('Unfocused box-shadow:', unfocused.boxShadow);
console.log('Focused box-shadow:', focused.boxShadow);
// Manually verify 3:1 contrast between states
```

### Color Contrast Verification
```bash
# Source: Chrome DevTools Accessibility Documentation

# Manual steps:
# 1. Inspect element in Chrome DevTools
# 2. Click color swatch next to color value
# 3. View "Contrast ratio" section
# 4. Verify:
#    - Normal text: 4.5:1 (AA), 7:1 (AAA)
#    - Large text (18pt+/14pt+ bold): 3:1 (AA), 4.5:1 (AAA)
#    - UI components/graphics: 3:1 (AA per WCAG 1.4.11)

# Example: Check if yellow badge text meets contrast
# - Badge background: var(--color-yellow) = oklch(0.85 0.18 95)
# - Badge text: var(--color-text-light) = oklch(0.2 0 0)
# - Expected: High contrast (>7:1)
```

### Touch Target Measurement
```javascript
// Source: WCAG 2.5.8 Target Size (Minimum) - https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

// Measure element size in DevTools:
const element = document.querySelector('button');
const rect = element.getBoundingClientRect();
console.log(`Width: ${rect.width}px, Height: ${rect.height}px`);

// WCAG 2.5.8 (Level AA): Minimum 24x24px
// WCAG 2.5.5 (Level AAA): Recommended 44x44px
// Exceptions: Inline text links, equivalent alternative available
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Automated-only audits | Hybrid automated + manual | 2020-2021 | Industry recognized 30-40% coverage limit of automation |
| Text-based grep | AST-based search (ast-grep) | 2023 | Better TypeScript/JSX pattern matching, but overkill for simple searches |
| WCAG 2.1 | WCAG 2.2 (Level AA standard) | Oct 2023 | New criteria: 2.4.11 Focus Not Obscured, 2.5.8 Target Size (Minimum) |
| Desktop-first audits | Mobile-first accessibility | 2024-2025 | Touch targets, mobile contrast now baseline requirements |
| Focus Visible (2.4.7, AA) | Focus Appearance (2.4.13, AAA) | WCAG 2.2 | Stricter focus indicator requirements (3:1 contrast, 2px thick) |

**Deprecated/outdated:**
- WCAG 2.0: Superseded by WCAG 2.1 (June 2018) and WCAG 2.2 (Oct 2023)
- 44px as AA requirement: Now AAA (2.5.5); AA is 24px (2.5.8)
- Visual-only severity assessment: Must include user impact and WCAG conformance level

## Open Questions

Things that couldn't be fully resolved:

1. **Automated component detection accuracy**
   - What we know: grep/ripgrep can find imports and basic usage patterns
   - What's unclear: How reliably can we detect "should be a component" candidates (e.g., repeated Tailwind patterns)
   - Recommendation: Use grep for obvious cases (<button> tags, import statements); rely on manual judgment for "could this be a Card?" decisions. Accept some findings will only emerge during manual page review.

2. **Dark mode glow intensity verification**
   - What we know: Design system specifies shadow-to-glow transformation (6px offset → 20px glow)
   - What's unclear: Objective criteria for "glow looks correct" vs. "glow too subtle/strong"
   - Recommendation: Verify computed box-shadow values match design system specs. If values match, consider it passing; subjective "looks wrong" requires design review outside audit scope.

3. **INFO severity scope**
   - What we know: User specified "issues outside component usage (content bugs, broken links) marked as INFO severity"
   - What's unclear: Exact boundary (e.g., is "missing alt text" INFO or accessibility CRITICAL?)
   - Recommendation: Accessibility issues (WCAG violations) remain CRITICAL/HIGH/MEDIUM/LOW. INFO is for non-accessibility, non-component issues only (typos, 404 links, outdated content). If in doubt, classify as accessibility finding.

## Sources

### Primary (HIGH confidence)
- [W3C WCAG 2.2 Understanding: Focus Appearance (2.4.13)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) - Focus state requirements
- [W3C WCAG 2.2 Understanding: Target Size (Minimum) (2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) - Touch target sizing
- [W3C WCAG 2.2 Understanding: Contrast (Minimum) (1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) - Color contrast requirements
- [ripgrep GUIDE.md](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md) - Pattern matching and usage

### Secondary (MEDIUM confidence)
- [WebAIM: Using Severity Ratings to Prioritize Web Accessibility Remediation](https://webaim.org/blog/severity-ratings/) - Severity classification methodology
- [Level Access: What do severity levels mean?](https://client.levelaccess.com/hc/en-us/articles/4420160747415) - Industry-standard severity definitions
- [The Design System Guide: Design Audit](https://thedesignsystem.guide/design-audit) - Component audit methodology
- [Deque: Auditing Design Systems for Accessibility](https://www.deque.com/blog/auditing-design-systems-for-accessibility/) - Accessibility-focused design system audits
- [BrowserStack: Automating Accessibility Testing in 2026](https://www.browserstack.com/guide/automate-accessibility-testing) - Automated testing tools overview
- [Smashing Magazine: Accessible Target Sizes Cheatsheet](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/) - Touch target best practices
- [AllAccessible: WCAG 2.4.13 Focus Appearance Guide](https://www.allaccessible.org/blog/wcag-2413-focus-appearance-guide) - Focus appearance implementation

### Tertiary (LOW confidence)
- [Design Systems Collective: Versioning Your Design System](https://www.designsystemscollective.com/versioning-your-design-system-without-breaking-client-sites-93b7c652f960) - Migration strategy context
- [Medium: Pro Tips for Design System Migration](https://medium.com/@houhoucoop/pro-tips-for-ui-library-migration-in-large-projects-d54f0fbcd083) - Large-scale migration approaches
- [ast-grep documentation](https://ast-grep.github.io/guide/quick-start.html) - AST-based search patterns (noted as potential alternative)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - grep/ripgrep and manual inspection are industry-standard; verified through multiple sources
- Architecture patterns: HIGH - WCAG criteria and severity classification from authoritative W3C and accessibility org sources
- Pitfalls: MEDIUM - Based on best practices articles and audit methodologies; not all specific to this exact use case
- Code examples: HIGH - Sourced from official documentation (ripgrep, W3C WCAG 2.2)

**Research date:** 2026-02-10
**Valid until:** 90 days (WCAG standards stable; design system audit practices mature)
