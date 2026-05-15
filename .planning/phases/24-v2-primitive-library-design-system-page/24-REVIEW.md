---
phase: 24-v2-primitive-library-design-system-page
reviewed: 2026-05-15T00:00:00Z
depth: standard
files_reviewed: 6
files_reviewed_list:
  - src/styles/v2/global.css
  - src/components/v2/ui/Card.astro
  - src/components/v2/ui/Input.astro
  - src/pages/design-system.astro
  - src/pages/design-system.json.ts
  - tests/accessibility/v2-primitives.spec.ts
findings:
  critical: 0
  warning: 4
  info: 3
  total: 7
status: issues_found
---

# Phase 24: Code Review Report (Gap Closure 24-05 / 24-06 / 24-07)

**Reviewed:** 2026-05-15
**Depth:** standard
**Files Reviewed:** 6
**Status:** issues_found

## Summary

The gap-closure changes are small, surgical, and largely well-executed. Token additions
(`--color-danger`, `--max-width-{sm..2xl}`) are correctly placed in the `@theme` block,
the `--spacing-*` sweep in the JSON endpoint matches the CSS source, the Card hover
lift bump is a one-character utility change, and the Input error-state class is now
`text-danger`. Test 7's hover-magnitude assertion is thoughtfully written, with strong
defensive comments around the Tailwind v4 `translate` individual-property quirk; Tests
9 and 10 each include layout-independent literal guards in addition to the threshold/
dominance checks.

The defects below are concentrated in **comment/documentation drift inside the test
file** (Test 9 description contradicts what the production code actually does), one
**JSON contract drift** (`spacing` lost the `2xl` ordering convention in writing but
not in fact — false alarm; ignore) and one **missing test artifact** (the new `danger`
color swatch is not asserted anywhere). No correctness regressions, no security issues,
no data-loss risk.

## Warnings

### WR-01: Test 9 inline comment contradicts the actual fix it is guarding

**File:** `tests/accessibility/v2-primitives.spec.ts:399-410`
**Issue:** The Test 9 docblock asserts that the gap closure for the "select too thin"
bug works because "adding `--container-sm:24rem` and `--container-md:28rem` restores
384px / 448px behavior." It then says "Tailwind v4 `max-w-{size}` prefers
`--container-{size}` over `--spacing-{size}` when both exist."

But the production code does the opposite — `src/styles/v2/global.css:54-58` adds
`--max-width-sm` / `--max-width-md` / `...-lg` / `...-xl` / `...-2xl`, NOT
`--container-*`. The header comment in `global.css:46-52` correctly explains that
Tailwind v4 resolves `max-w-{name}` by checking `--max-width-{name}` **first**.

This is misleading documentation in a regression-guard test — a future maintainer
reading Test 9 and trying to make a parallel fix (say, for `min-w`) will copy the
wrong namespace and end up debugging the same bug a second time. The assertion
itself (`>= 300px`) still passes because it only measures the rendered width, but
the comment teaches the wrong lesson.

**Fix:** Replace the contradictory section of the Test 9 comment with:
```ts
  // ... container widths, not the
  // namespace-collision class of bug fixed in plan 24-05 — Tailwind v4
  // max-w-{name} prefers --max-width-{name} (highest-priority namespace) over
  // --spacing-{name}, so adding --max-width-sm:24rem and --max-width-md:28rem
  // (matching Tailwind v4 defaults) restores 384px / 448px behavior at both sites.
  // The Footer assertion catches a hypothetical future regression where only
  // --max-width-md is removed (single-token regression would otherwise ship silently).
```
Also adjust the trailing single-token-regression line from "removes only
`--container-md`" to "removes only `--max-width-md`".

### WR-02: Test 9 hard-codes `>= 300px` minimum that under-asserts the actual fix

**File:** `tests/accessibility/v2-primitives.spec.ts:422, 433, 446`
**Issue:** Test 9 asserts `wrapperWidthPx >= 300`, `selectWidthPx >= 300`, and
`footerTaglineWidthPx >= 300`. The actual contract is much stronger: `max-w-sm`
should resolve to exactly `24rem` (384px) and `max-w-md` to exactly `28rem`
(448px), per Tailwind v4 defaults and per the inline comments in `global.css:54-58`.

The 300px floor is wide enough that a future bug could silently shrink the wrapper
to ~320px and still pass — for example, if someone re-introduced a partial namespace
collision that resolved `max-w-sm` to a smaller fallback. The diagnosis doc
(`select-too-thin-no-text.md`, referenced in the comment) presumably documents the
exact target width, and Test 8 sets a precedent of asserting exact pixel values
(`'12px'`, `'16px'`, etc.) rather than thresholds.

**Fix:** Tighten the assertions to match Tailwind v4 default container widths exactly:
```ts
expect(wrapperWidthPx).toBe(384);              // max-w-sm = 24rem = 384px
// select is w-full inside max-w-sm wrapper
expect(selectWidthPx).toBe(384);
// Footer tagline uses max-w-md = 28rem = 448px — BUT it is also constrained by
// its parent, so use toBeGreaterThanOrEqual on a tighter bound (e.g. 400) or
// assert the computed max-width property directly:
const footerMaxWidth = await footerTagline.evaluate(
  (el) => window.getComputedStyle(el as Element).maxWidth
);
expect(footerMaxWidth).toBe('448px');
```
At minimum, raise the floor to ~380 for `max-w-sm` and ~440 for `max-w-md` so a
half-broken state cannot slip through.

### WR-03: The new `danger` color swatch on `/design-system` is not asserted by any test

**File:** `src/pages/design-system.astro:30` (and `tests/accessibility/v2-primitives.spec.ts` overall)
**Issue:** Phase 24 added a 9th color swatch (`danger`) to the colorTokens array.
There is no test that:
1. Verifies the swatch actually renders (e.g., `await expect(page.locator('section#tokens [aria-label="danger"]')).toBeVisible()` or the equivalent locator);
2. Verifies its background-color is red-dominant (parallel to Test 10's red-channel/hue guard for the Input error text); or
3. Verifies the swatch count grew from 8 to 9.

Test 10 only validates the *Input error <p>* color. If a future commit removes the
9th array entry by accident (a rebase conflict, a "8 colors" assumption, etc.), the
swatch row disappears from `/design-system` and the regression ships silently.

**Fix:** Add a short assertion in Test 10 (or as a separate Test 11) that the
swatch count under section#tokens > Colors equals 9 AND the danger swatch's
computed `background-color` passes the same red-dominance / red-hue check that the
error text uses. Concrete sketch:
```ts
const swatches = page.locator('section#tokens > .grid > div');
await expect(swatches).toHaveCount(9);
const dangerSwatch = swatches.locator(':has-text("danger")').locator('div').first();
const bg = await dangerSwatch.evaluate(
  (el) => window.getComputedStyle(el as Element).backgroundColor
);
// reuse the rgb/oklch parser from Test 10
```

### WR-04: `design-system.json.ts` `spacing.2xl` JSON key is a numeric-leading string requiring quotes

**File:** `src/pages/design-system.json.ts:59`
**Issue:** The key `'2xl'` is quoted (correct), but consumers parsing this JSON in
strongly-typed contexts (TypeScript codegen, Rust serde with `#[serde(rename)]`,
etc.) will hit friction because `2xl` is not a valid JS/TS identifier. The CSS
custom-property name `--spacing-2xl` is fine (CSS identifiers permit it after the
leading `--`), but the JSON-endpoint convention chosen here propagates the awkward
key into anyone consuming `/design-system.json`. This is consistent with the
existing schema (other size scales also use `2xl`), so it is not new in this phase
— but the gap-closure work is a good opportunity to flag that the contract has
locked this in.

This is a contract-shape concern, not a bug. Flagging at warning rather than info
because the file's docblock advertises this as the "machine-readable v2 design
token endpoint" — making this a public contract that downstream tools depend on.

**Fix:** No change required for this phase. Document in the JSON endpoint's
docblock that keys with leading digits are quoted strings (`'2xl'`) and consumers
generating code from this schema must handle them as bracket-access (`tokens.spacing['2xl']`).
Optional alternative: rename `2xl` to `xxl` (or `xl2`) consistently across CSS
tokens, JSON schema, and class generators — but that is a Phase 25+ refactor,
not in scope here.

## Info

### IN-01: Card hover lift uses Tailwind utility instead of token-driven value

**File:** `src/components/v2/ui/Card.astro:22`
**Issue:** The hover lift bumped from `hover:-translate-y-0.5` to `hover:-translate-y-1`.
This is a literal Tailwind spacing utility (`-translate-y-1` = 4px), not a token-driven
value (`hover:-translate-y-xs` would map to 8px via `--spacing-xs`). The system has
a token contract (`--spacing-*`) but this lift is one of the few places that bypasses
it. The diagnosis doc (`interactive-card-no-hover-lift.md`) explains the -2px →
-4px choice as a perception-threshold call, but the magic literal `1` is not tied
to any documented token.

**Fix:** Either accept this as an intentional micro-interaction value outside the
spacing scale (and add a one-line comment in Card.astro explaining "4px is below
the smallest --spacing-xs of 8px on purpose — micro-interaction is sub-token"), or
promote a dedicated `--motion-lift` / `--space-2xs` token. The comment-only path is
fine — but the current state has no in-source explanation for the magic number.

### IN-02: `--color-danger` diagnosis comment is excellent but references a debug file not committed

**File:** `src/styles/v2/global.css:27-28`
**Issue:** The comment block points readers to
`.planning/debug/input-error-not-red.md`. The file exists locally, but should be
verified as committed (the file appears under `.planning/debug/` and is presumed
tracked, but a `.gitignore` rule could exclude it — there's no way to confirm from
the diff alone).

**Fix:** Verify `.planning/debug/input-error-not-red.md` is committed (`git ls-files
.planning/debug/`). If excluded, either commit it or replace the in-source reference
with the actual diagnosis summary so future debuggers don't chase a phantom file.

### IN-03: Test 10 OKLCH parser silently coerces malformed input to `NaN`

**File:** `tests/accessibility/v2-primitives.spec.ts:501-503`
**Issue:** The OKLCH parser does:
```ts
const parts = inner.trim().split(/[\s,]+/);
const hue = parseFloat(parts[2]);
```
If Chromium ever emits the value in a different shape (e.g., a future spec change,
or a 4-tuple including alpha), `parts[2]` could be missing or shifted, and
`parseFloat(undefined)` returns `NaN`. The downstream assertions
(`expect(hue).toBeGreaterThanOrEqual(0)` and `expect(hue).toBeLessThan(60)`) would
both fail (`NaN >= 0` is false), which is correct behavior — but the failure
message would be confusing ("Expected NaN to be ≥ 0") rather than diagnostic.

**Fix:** Add a length guard before parsing:
```ts
expect(parts.length).toBeGreaterThanOrEqual(3);
const hue = parseFloat(parts[2]);
expect(Number.isFinite(hue)).toBe(true);
```
This converts a confusing `NaN` failure into a clear "OKLCH output shape changed"
diagnostic.

---

## Notes on what was reviewed and considered NOT defective

- **`Card.astro:22` hover lift bump** — Functionally correct. Tailwind v4 maps
  `-translate-y-1` to the `translate` individual property, which Test 7's
  `parseTranslateTy` correctly reads. Verified via the test's documented Chromium
  output ("0px -4px").
- **`Input.astro:56` `text-danger` class** — Correctly references the new
  `--color-danger` token (Tailwind v4 generates `text-danger` from any
  `--color-{name}` in `@theme`). No cross-utility collision.
- **`design-system.json.ts:47-50`** — New `danger` entry matches the CSS token
  shape exactly: cssVar/oklch values are verbatim copies. Internal consistency
  preserved.
- **`design-system.json.ts:53-59`** — `spacing.*` cssVar values correctly use
  `--spacing-*` (not the old `--space-*`), matching the JSON-endpoint docblock's
  "values copied verbatim from src/styles/v2/global.css @theme block" promise.
  The CSS source uses `--spacing-*` (global.css:38-43), so this is internally
  consistent. This was the specific sweep called out in the scope_context.
- **`design-system.astro:30`** — 9th color swatch correctly added in alphabetical/
  semantic order (after `accent`, which is appropriate as the "destructive accent").
  No visual or markup defect.
- **`global.css:30` `--color-danger`** — OKLCH value `0.50 0.22 27` is in the red
  hue range (~27°). The in-source comment correctly documents the WCAG AA contrast
  baseline and the darkening-ladder fallback strategy. This is exemplary token
  documentation.
- **Tests 9 and 10** — The assertion strategies (red-channel dominance, literal
  comparison against the deterministic broken state, oklch fallback path, layout-
  independent comparisons) are well-designed. WR-01 and WR-02 above are about
  *comment accuracy* and *threshold tightness*, not assertion correctness.

---

_Reviewed: 2026-05-15_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
