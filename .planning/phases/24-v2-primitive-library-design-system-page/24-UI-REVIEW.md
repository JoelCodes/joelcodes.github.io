# Phase 24 — UI Review

**Audited:** 2026-05-15
**Baseline:** UI-SPEC.md (24-UI-SPEC.md — approved design contract)
**Screenshots:** Not captured (no dev server on ports 3000, 4321, or 5173 at audit time — code-only review)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Multiple contract strings deviate: wrong H1, wrong subtitle, missing Usage section, button demo labels are technical ("Primary sm") not spec copy ("Let's Talk"), badge demos use different text, card body copy is implementation notes not explanatory prose |
| 2. Visuals | 2/4 | Missing "Primitives" H2 group, missing "Usage" section entirely, missing Spacing and Radii token sub-sections, no alternating section backgrounds (surface / surface-muted) as specified |
| 3. Color | 3/4 | Accent usage is correctly restricted; all five declared uses present; no forbidden uses found; minor: hover:text-accent on footer nav links in v2 Footer not in the Phase 24 accent-reserved list (pre-existing from Phase 23, no v2 primitive violation) |
| 4. Typography | 2/4 | font-semibold (600) used 11 times in design-system.astro — a third weight outside the spec's 3-token system (400/500/700); primitive sub-headings use text-h4 (20px) where spec prescribes text-h3 (24px); h3 token sections use font-semibold not font-bold |
| 5. Spacing | 3/4 | All token-scale values correctly applied; documented exceptions (py-3 Button sm, px-3 Badge, py-3 Input) present and spec-justified; one minor: Button md uses Tailwind numeric px-5 (20px) rather than a token, though the value is correct per Crito [16, 20] |
| 6. Experience Design | 4/4 | All interactive states implemented (hover, focus-visible, error, disabled, required, helper); no outline:none anywhere; no is:global; Playwright + axe-core 10/10 tests pass; WCAG 2.2 AA confirmed; color-contrast violations caught and fixed in plan 24-03 |

**Overall: 16/24**

---

## Top 3 Priority Fixes

1. **Missing "Primitives" + "Usage" H2 sections with correct content** — A user landing on /design-system cannot find code snippets to copy (Usage section absent), and the page structure diverges from the spec contract that agents use to understand what sections exist. Fix: add a `<section id="usage">` with `<h2>Usage</h2>` and four `<pre>` code snippets (one per primitive), and optionally wrap Button/Card/Input/Badge under a `<section id="primitives">` with `<h2>Primitives</h2>`. Per plan 24-04 this was intentionally omitted; the spec explicitly required it at D-15.

2. **Button demo labels and card/badge copy do not match spec** — The demo buttons read "Primary sm", "Ghost md", "Link sm" instead of "Let's Talk" / "Learn more" / "Read the case study". Card bodies say "bg-surface, border-border, rounded-lg" (implementation tokens, not usage guidance). Badge demos use "New", "Beta", "Draft" instead of "Featured", "AI", "Astro". This turns a usage-documentation page into a code-archaeology exercise. Fix: replace demo strings in `src/pages/design-system.astro` with the exact copy from the Copywriting Contract table in 24-UI-SPEC.md.

3. **font-semibold (600) is a non-spec weight used on 11 heading/card elements** — The v2 token system declares only three weights: 400 (font-normal/font-text), 500 (font-medium), and 700 (font-bold). Using font-semibold (600) on every h3 and primitive card heading introduces an undeclared fourth weight that does not map to any `--font-weight-*` token. This is a typography contract violation. Fix: change `font-semibold` to `font-bold` on all h3 and primitive sub-heading elements in `src/pages/design-system.astro`; also change primitive variant sub-headings from `text-h4` to `text-h3` (spec: "Primitive sub-headings — Button, Card, Input, Badge" use `--text-h3` 24px).

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**WARNING** — Multiple required strings from the Copywriting Contract table are not implemented. The page reads like an internal dev reference (which it is) but fails the spec's stated copy for each element.

**H1 text mismatch**
- Spec: `"Design System"`
- Actual (`design-system.astro:56`): `"Design System (v2)"`
- Impact: Minor for end users; breaking for any agent or tool that matches the exact heading text to determine page intent.

**Page subtitle/lede mismatch**
- Spec: `"The v2 component library powering joelshinness.com — tokens, primitives, and usage examples."`
- Actual (`design-system.astro:59-60`): `"Internal reference for Joel and AI coding agents. Live demos of all four v2 primitives built on the Crito-anchored token foundation (Plans 24-01 and 24-02). Zero v1 token references, zero is:global, zero dark-mode utilities."`
- Impact: The actual subtitle leaks implementation details ("Plans 24-01 and 24-02") and noisy dev notes that are not copy-contract prose.

**Section H2 structure absent**
- Spec requires exactly three H2s: `"Tokens"`, `"Primitives"`, `"Usage"`
- Actual H2s: `"Tokens"`, `"Button"`, `"Card"`, `"Input"`, `"Badge"`
- The `"Primitives"` grouping H2 and the `"Usage"` H2 are missing entirely. The four primitive H2s exist individually but are not nested under a `"Primitives"` parent, and no `"Usage"` section exists at all.

**Button demo labels (WARNING)**
- Spec: `"Let's Talk"` (primary, mirrors global CTA), `"Learn more"` (ghost, dual-CTA demo), `"Read the case study"` (link variant with ArrowRight)
- Actual (`design-system.astro:115-133`): `"Primary sm"`, `"Primary md"`, `"Primary lg"`, `"Ghost sm"`, `"Ghost md"`, etc.
- The spec's specific demo strings exist to show the button in its real-world context. Using variant×size technical labels removes all contextual value from the demo.

**Card demo body copy (WARNING)**
- Spec:
  - Default: `"1px border, no shadow. Used for content surfaces that should sit flat on the page."`
  - Elevated: `"Adds shadow on top of the base treatment. Used for service cards that should lift off the section."`
  - Interactive: `"Hover or tab to focus. Used as a wrapper for clickable cards like ProjectCard."`
- Actual (`design-system.astro:158, 166, 174`): `"bg-surface, border-border, rounded-lg"`, `"elevated=true adds shadow-md token"`, `"interactive=true: tabindex=0, hover lift, focus ring"`
- The actual text is Tailwind class enumeration, not usage guidance prose. A reader trying to understand when to use each variant is left without guidance.

**Badge demo text (WARNING)**
- Spec: `"Featured"` (accent), `"AI"` (muted), `"Astro"` (outline)
- Actual (`design-system.astro:282-287`): `"New"`, `"Beta"`, `"Draft"`, `"Inbox"`, `"AI-assisted"`, `"In progress"`
- Spec copy reflects actual planned use-cases (PROJ-05 "Featured" flag, blog tag); actual copy is generic and disconnected from real use.

**Input error message copy (WARNING)**
- Spec: `"Enter a valid email address (e.g. you@example.com)."` — imperative + concrete example per tone rules
- Actual (`design-system.astro:217`): `"Please enter a valid email address"` — missing the concrete example, uses "Please" (polite form not spec tone), missing trailing period
- Spec tone rule: "imperative + concrete example — never bare 'Invalid input'"

**Input default demo: wrong label and placeholder**
- Spec: first Input demo uses `label="Email"`, `placeholder="you@example.com"`
- Actual (`design-system.astro:205-208`): `label="Name"`, `placeholder="Jane Smith"`
- This is a direct contract violation against the Copywriting Contract table.

**Input disabled demo: wrong label and value**
- Spec: `label="Account email"`, `value="Locked field for demonstration"`
- Actual (`design-system.astro:240-244`): `label="Submitted"`, `value="Locked"`

**Missing Usage section (BLOCKER for spec completeness)**
- Spec: `"4 <pre> code snippets, one per primitive, with copy-able JSX-style example"` in the Usage section
- Actual: zero `<pre>` blocks on the page (confirmed via grep). No Usage section exists at all.
- The plan 24-04 explicitly noted this was omitted; the spec explicitly requires it at D-15.

**Token subsections missing from Tokens**
- Spec: `"4 sub-blocks: Color (8 swatches), Typography (8-size scale demo), Spacing (6-step demo), Radii (4-step demo)"`
- Actual: 2 sub-blocks (Colors + Typography). Spacing and Radii visual demos are absent. Plan 24-04 intentionally deferred these to machine-readable JSON; the spec did not authorize this deviation.

---

### Pillar 2: Visuals (2/4)

**WARNING** — The spec prescribes a specific page structure with alternating section backgrounds and a Usage section. The implemented page collapses all content into a single white container without the intended visual rhythm.

**Missing alternating section backgrounds**
- Spec: Tokens section bg = `--color-surface-muted`, Primitives bg = `--color-surface`, Usage bg = `--color-surface-muted`
- Actual: all sections share a single white container (`div class="container mx-auto px-lg py-2xl max-w-5xl"`). No per-section background switching. The `--color-surface-muted` is only used in narrow code chips and one typography card inner.
- Visual impact: the page lacks the horizontal breathing rhythm the spec intended. All sections blend together without visual anchors.

**Missing "Primitives" umbrella section**
- Spec: a clearly titled H2 "Primitives" groups Button, Card, Input, Badge as a single visual unit.
- Actual: each primitive has its own H2 at the same level as "Tokens". There is no visual hierarchy distinguishing a "token reference" section from a "component demo" section.

**Missing Usage section entirely**
- Spec: "Usage" is the third major visual block with four `<pre>` code snippets.
- Actual: page ends after Badge. No code snippets, no "Usage" heading.
- A developer visiting to copy a usage snippet finds nothing.

**Missing Spacing and Radii visual demos**
- Spec: Tokens subsection includes "6-step spacing demo" and "4-step radii demo".
- Actual: only color swatches and typography ladder. Spacing and radii are deferred to the JSON endpoint.
- Impact: the page token reference is visually incomplete — users cannot scan the spacing scale without opening the JSON.

**Visual hierarchy: primitive variant labels are h3 tags with text-h4 sizing**
- Sub-section headings ("Primary", "Ghost", "Link", "Colors", "Typography") use `<h3>` tags but `text-h4` (20px) utility classes.
- This creates a HTML structural inconsistency: the h3 semantic level is paired with h4 visual size. Spec says primitive sub-headings should use `--text-h3` (24px).

**What works**
- Color swatch grid renders correct token colors (8+1 danger tokens all present)
- Typography ladder is well-constructed with 8 sizes in correct order
- Card, Input, Badge, and Button primitives are all live and interactive on the page
- Focus rings render correctly on all interactive elements

---

### Pillar 3: Color (3/4)

**WARNING** — Accent usage is largely contract-compliant within v2 primitive files. Two edge cases noted.

**PASS: Accent-restricted zones correctly implemented**
- `Card.astro`: zero `bg-accent` or `border-accent` — PASS
- `Badge.astro`: `bg-accent` only on `variant="accent"` — PASS (documented use-case #4)
- `Button.astro`: `bg-accent` only on `variant="primary"`, `hover:text-accent` only on `variant="link"` — PASS
- `Header.astro`: `bg-accent` on CTA button, `text-accent` on active nav link indicator — PASS (use-cases #1 and #2)
- No hardcoded hex colors or rgb() in any v2 primitive file — PASS
- `text-accent` on link text was caught and fixed in plan 24-03 (axe-core contrast violation) — PASS

**PASS: 60/30/10 split in primitives**
- Dominant surface (white): Card, Input fields, page background all use `bg-surface` — correctly applied
- Secondary surface-muted: Input disabled state `bg-surface-muted`, code chips — correctly restricted to non-active fills
- Accent green: appears only on Button primary bg, Badge accent bg, focus rings, active nav — within 10% allocation

**FINDING: hover:text-accent in v2 Footer/MobileNav nav links**
- `src/components/v2/layout/Footer.astro:40-43` and `MobileNav.astro:52-53` use `hover:text-accent` on nav link text
- The Phase 24 "Accent reserved for" list includes active nav link indicator (use-case #2) but does not extend to *hover* state on all nav links
- This is a pre-Phase-24 pattern established in Phase 23; no v2 primitive introduced it here. Flagged as a cross-component consistency note, not a Phase 24 failure.

**FINDING: danger color correct**
- `--color-danger: oklch(0.50 0.22 27)` added in plan 24-07
- `text-danger` correctly applied only to Input error `<p>` elements (`Input.astro:56`)
- WCAG AA confirmed by axe-core in plan 24-07 test run

---

### Pillar 4: Typography (2/4)

**WARNING** — A non-spec weight (600/semibold) is used 11 times in the page; primitive sub-headings render at h4 size where the spec requires h3.

**FINDING: font-semibold (600) — undeclared third weight (WARNING)**
- The v2 token system declares: `--font-weight-text: 400`, `--font-weight-text-bold: 500`, `--font-weight-display: 700`
- `design-system.astro` uses `font-semibold` (600) in 11 places:
  - `design-system.astro:76` — h3 "Colors"
  - `design-system.astro:91` — h3 "Typography"
  - `design-system.astro:95` — typography ladder Aa sample
  - `design-system.astro:113,121,129,137` — primitive variant sub-headings (Primary, Ghost, Link, Icons & States)
  - `design-system.astro:157,165,173,181` — card demo inline headings
- The spec's Typography table specifies H3 weight = `--font-weight-display` = 700 (mapped to `font-bold`)
- `font-semibold` is not derived from any v2 token; it is a Tailwind built-in that bypasses the token system
- Fix: replace all `font-semibold` with `font-bold` on heading elements in design-system.astro

**FINDING: Primitive sub-headings at text-h4 (20px) instead of text-h3 (24px) (WARNING)**
- Spec Typography table: `"Heading (H3) 24px — Used in: Primitive sub-headings ('Button', 'Card', 'Input', 'Badge') + CardHeader default heading slot"`
- Actual: `design-system.astro:113,121,129,137,157,165,173,181` all use `text-h4` (20px)
- These headings are 4px smaller than spec'd, reducing the visual hierarchy signal between section H2s and variant sub-labels
- Fix: replace `text-h4` with `text-h3` on these headings, or re-evaluate whether "Primary", "Ghost", "Link" sub-labels warrant h3 semantics (they are h3 tags already)

**PASS: Font family assignments**
- `Button.astro`: `font-display` on label — PASS (spec: button labels use --font-display)
- `Input.astro`: `font-text` on label, field, and error text — PASS
- `Badge.astro`: `font-text` on chip text — PASS
- `design-system.astro`: h1/h2/h3 use `font-display`, body/caption/code use `font-text` — PASS
- No third font family introduced anywhere — PASS

**PASS: Font size distribution**
- Primitives use: `text-caption` (12px), `text-small` (14px), `text-body` (16px) — all within spec's "4–5 distinct primitive-facing sizes"
- Button sizes: `text-small` (sm), `text-body` (md/lg) — PASS

**PASS: Weight in primitives**
- `Button.astro:55`: `font-medium` (500) — PASS (spec: button labels 500 weight)
- `Input.astro:37`: `font-medium` (500) on label — PASS (spec: input label 500 weight)
- `Badge.astro:28`: `font-medium` (500) — PASS (spec: badge 500 weight)
- No primitive uses `font-semibold` — the 600 weight problem is isolated to the page file

---

### Pillar 5: Spacing (3/4)

**Good** — Token-scale values are correctly applied in all primitive files. Documented exceptions are correctly implemented. One minor non-token numeric in Button.

**PASS: Button padding values**
- `sm`: `px-sm py-3` → 16px horizontal, 12px vertical — matches spec exception (12px py "applied as py-3 literal on Button sm")
- `md`: `px-5 py-sm` → 20px horizontal, 16px vertical — matches Crito `[16, 20]` (NOTE: px-5 is Tailwind numeric, not token; value is correct but bypasses `--spacing-*` system)
- `lg`: `px-lg py-5` → 32px horizontal, 20px vertical — matches spec

**FINDING: Button md uses px-5 instead of a named token (minor)**
- `Button.astro:41`: `'px-5 py-sm text-body'` — `px-5` is Tailwind's built-in 5×4px = 20px
- The spec's Spacing table does not have a 20px token (scale goes xs=8, sm=16, md=24)
- 20px is the correct Crito-verified value; there is no `--spacing-` token for it
- The spec acknowledges "Claude's Discretion" on exact padding-per-slot values; this is defensible
- Could add a `--spacing-button-md` or use `px-5` consistently — current approach is pragmatic

**PASS: Badge padding**
- `px-3 py-1` → 12px horizontal, 4px vertical — exactly matches spec: "4px vertical, 12px horizontal" (documented exception)

**PASS: Input padding**
- `px-sm py-3` → 16px horizontal, 12px vertical — `px-sm` uses the spacing token; `py-3` is a pragmatic 12px vertical (consistent with Button sm exception logic)

**PASS: CardHeader, CardBody, CardFooter padding**
- CardHeader: `px-md pt-md pb-sm` → 24px / 24px / 16px — within spec's "Plan 24-02 locks final values" freedom; all values are named tokens
- CardBody: `px-md py-md` → 24px all — matches spec suggestion exactly
- CardFooter: `px-md pt-sm pb-md` → 24px / 16px / 24px — within spec's "mirror-flipped" suggestion; all values are named tokens

**PASS: Section-level spacing**
- `mb-2xl` (80px) between sections — PASS (spec: "2xl top + bottom of each region")
- `px-lg` (32px) container side padding — PASS (spec: "container gutter")

**PASS: No arbitrary spacing values**
- Zero `[*px]` or `[*rem]` patterns in any v2 primitive file or design-system.astro

---

### Pillar 6: Experience Design (4/4)

**Excellent** — All interactive states are fully implemented, validated by automated Playwright + axe-core tests. No gaps in state coverage within scope.

**PASS: Loading states**
- Correctly not implemented — design-system page has no async data (spec: "Nothing is fetched, nothing can be empty")

**PASS: Error states**
- `Input.astro`: `error` prop → `aria-invalid="true"` + `role="alert"` on error `<p>` + `aria-describedby` link
- `text-danger` applied to error message (closed UAT Gap 3 in plan 24-07)
- Warning glyph (`&#9888;`) with `aria-hidden="true"` — correct SR pattern

**PASS: Disabled states**
- `Button.astro`: `disabled && 'opacity-50 cursor-not-allowed pointer-events-none'`; `aria-disabled="true"` on `<a>` polymorphic variant
- `Input.astro`: `disabled={disabled}` on native field; `bg-surface-muted text-text-muted cursor-not-allowed` visual treatment; confirmed excluded from Tab order (Playwright Test 6)

**PASS: Focus rings**
- All three interactive primitives have scoped `<style>` blocks with `:focus-visible` → `outline: 2px solid var(--color-accent); outline-offset: 2px;`
- Zero `outline: none` anywhere in v2 primitive files
- Playwright Test 2 confirms outlineWidth=2px, outlineOffset=2px, non-transparent color on all button elements

**PASS: Hover states**
- Button primary: `hover:opacity-90`
- Button ghost: `hover:bg-surface-muted`
- Button link: `hover:text-accent` + arrow `translateX(2px)`
- Card interactive: `hover:-translate-y-1` (-4px, confirmed by Playwright Test 7 ty <= -3px)
- Input: no hover override (correct — focus ring is the accent moment, not hover)

**PASS: Interactive Card tab-reachability**
- `tabindex={interactive ? 0 : undefined}` — only interactive cards enter tab order (Playwright Test 7)
- Non-interactive Cards: confirmed no tabindex=0 (Test 7 asserts tabIndexableCount=1)

**PASS: WCAG 2.2 AA**
- 10/10 Playwright + axe-core tests pass on /design-system
- Zero axe violations on full-page scan
- Two violations found in plan 24-03 (text-accent on link, opacity-70 on caption text) and fixed before ship

**PASS: Keyboard activation**
- `<button>` elements respond to Enter (Test 3)
- `<a>` polymorphic variant navigates on Enter (Test 4 — slight flakiness under parallel workers, pre-existing)
- Input elements accept typed input via Tab navigation (Test 5)

**Minor observation: Badge is non-interactive (correct)**
- `Badge.astro` has no tabindex, no focus ring, no hover state — matches spec "Non-interactive; static pill"

---

## Registry Safety

Registry audit: No shadcn (`components.json` absent). No third-party registry blocks listed in UI-SPEC.md. Registry audit skipped per gate conditions.

---

## Files Audited

**Primitive components:**
- `src/components/v2/ui/Button.astro` (87 lines)
- `src/components/v2/ui/Card.astro` (36 lines)
- `src/components/v2/ui/CardHeader.astro` (11 lines)
- `src/components/v2/ui/CardBody.astro` (11 lines)
- `src/components/v2/ui/CardFooter.astro` (11 lines)
- `src/components/v2/ui/Input.astro` (75 lines)
- `src/components/v2/ui/Badge.astro` (35 lines)

**Page and token system:**
- `src/pages/design-system.astro` (292 lines)
- `src/styles/v2/global.css` (108 lines)

**Planning documents read:**
- `.planning/phases/24-v2-primitive-library-design-system-page/24-UI-SPEC.md`
- `.planning/phases/24-v2-primitive-library-design-system-page/24-CONTEXT.md`
- `.planning/phases/24-v2-primitive-library-design-system-page/24-01-PLAN.md` through `24-07-PLAN.md`
- `.planning/phases/24-v2-primitive-library-design-system-page/24-01-SUMMARY.md` through `24-07-SUMMARY.md`
