---
phase: 35-ui-primitives
reviewed: 2026-07-16T05:44:00Z
depth: deep
files_reviewed: 11
files_reviewed_list:
  - scripts/check-contrast.mjs
  - src/components/layout/SiteHeader.astro
  - src/components/wl/Breadcrumb.astro
  - src/components/wl/CTAButton.astro
  - src/components/wl/Callout.astro
  - src/components/wl/Eyebrow.astro
  - src/components/wl/LinkCard.astro
  - src/components/wl/ServiceCard.astro
  - src/components/wl/Step.astro
  - src/components/wl/Tag.astro
  - src/styles/global.css
findings:
  critical: 2
  warning: 9
  info: 5
  total: 16
status: issues_found
---

# Phase 35: Code Review Report

**Reviewed:** 2026-07-16T05:44:00Z
**Depth:** deep
**Files Reviewed:** 11
**Status:** issues_found

## Summary

Deep review of the 8 `wl/` primitives, the SiteHeader retrofit, the Phase 35 token additions in `global.css`, and `check-contrast.mjs`. Cross-checked against `35-FIGMA-EXTRACTION.md` and `35-UI-SPEC.md`; all designer-specified magic values (13px/10px radii, `#4C6A70` breadcrumb, rgba white fills, local card tokens) were verified against the extraction artifact and are consistent — they are NOT flagged. The contrast gate was executed (exit 0, all text-use pairs pass) and every documented ratio claim in component comments was independently recomputed.

Two Critical findings: (1) the ghost-on-dark focus ring uses the **flippable** accent token on the always-dark ink surface, producing a live 2.31:1 focus indicator in light mode — a direct violation of the D-10 invariant the component's own docblock enforces for text and border; (2) a systemic dead-code pattern where Tailwind `hover:` utilities target a property that is also set via inline `style` on the same element — inline styles always win, so the CTAButton ghost/ghost-on-dark hover states never render, and the hard-coded hover literal contains a latent 2.22:1 dark-mode AA failure that will go live the moment the specificity bug is fixed naively. The same inline-style-beats-hover-class defect kills the Breadcrumb and LinkCard hover states (Warnings).

Additional Warnings: Callout's asymmetric padding is applied to the wrong sides; the solid CTA shadow uses an invalid 4-length `drop-shadow()` and silently never renders; the LinkCard go-link hides visible text from AT/voice control; Breadcrumb can emit multiple `aria-current="page"`; the contrast gate rounds ratios before comparing to threshold; and several compliance-justification comments carry wrong contrast numbers.

SVG safety (T-01) verified clean across CTAButton and WaveMark: paths/circle only, `stroke="currentColor"` or fixed literals, no scripts, handlers, hrefs, or foreignObject. Icon set matches the D-06 closed set (calendar 39:4, mail 39:7, viewBox 0 0 17 17). No old-token references in any wl/ component (D-03 verified). No `<script>` tags. The `--wl-card-*` / `--wl-breadcrumb-color` / `--wl-cta-ghost-bg` local-token flips in `global.css` are correctly wired and consumed.

## Critical Issues

### CR-01: Ghost-on-dark focus ring uses flippable accent token — 2.31:1 focus indicator in light mode (D-10 violation)

**File:** `src/components/wl/CTAButton.astro:65`
**Issue:** The ghost-on-dark variant sits on an always-dark ink strip (`#12333B`) in **both** themes, which is the entire reason its text (`#EAF6F3`) and border (`rgba(255,255,255,0.35)`) are non-flippable literals (D-10, threat T-02). But the focus ring uses `focus-visible:outline-wl-accent` — a flippable token. The inline comment (lines 63–64) justifies this by checking only the **dark-mode** value: "#4FB3B8 on #12333B = 5.42:1 (AA pass)". In **light mode** the token resolves to `#0E7078`, and `#0E7078` on `#12333B` = **2.31:1** (verified with the project's own `contrastRatio()`), below the 3:1 minimum for focus indicators (WCAG 1.4.11 non-text contrast; 2.4.13). Unlike the hover bug in CR-02, this failure is live: `outline` is not set inline, so the class applies. This is precisely the T-02 threat class the component's docblock warns against — the comment evaluated the wrong theme.
**Fix:**
```astro
{/* non-flippable focus ring — always-dark surface (D-10): #4FB3B8 on #12333B = 5.42:1 in BOTH themes */}
'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FB3B8]',
```
Re-run `check-contrast.mjs` after adding a `['#4FB3B8', ONDARK_SURFACE, 'non-flippable: ghost-on-dark focus ring on ink', 3, true]` pair.

### CR-02: CTAButton ghost/ghost-on-dark hover backgrounds are dead code, and the hover literal is a latent dark-mode AA failure

**File:** `src/components/wl/CTAButton.astro:70` (ghost-on-dark hover), `:81` (inline `background: transparent`), `:192` (ghost hover), `:198` (inline `background: var(--wl-cta-ghost-bg)`)
**Issue:** Two compounding defects:

1. **Dead hover states.** Both ghost variants set `background` via the inline `style` attribute *and* declare a `hover:bg-[...]` utility for the same property. Inline styles beat any class selector (including `:hover` variants) in the cascade, so `hover:bg-[rgba(255,255,255,0.6)]` (ghost) and `hover:bg-[rgba(255,255,255,0.08)]` (ghost-on-dark) **never render**. The documented derived-hover behavior (docblock lines 18–22, flagged for the fidelity gate) does not exist in the shipped output; `transition-colors` is inert.
2. **Latent AA trap.** The ghost hover value `rgba(255,255,255,0.6)` is a non-flipping literal. In dark mode, `0.6 × white` composited over dark paper `#0C2228` yields effective `#9EA7A9`, and the ghost text token (`--color-wl-ink`, dark = `#EAF6F3`) on that background is **2.22:1** (verified) — far below 4.5:1. The `--wl-cta-ghost-bg` token pair in `global.css:84/:112` was created specifically to keep this surface dark for `#EAF6F3` text ("Rule 1 fix"); the hard-coded hover value re-introduces the exact failure that token fixed. Today the specificity bug masks it; any naive fix of defect 1 (e.g., moving `background` to a class) activates the WCAG failure.

**Fix:** Move backgrounds out of inline style so hover classes can win, and give the hover state its own flipping token:
```css
/* global.css */
:root { --wl-cta-ghost-bg-hover: rgba(255, 255, 255, 0.6); }
.dark { --wl-cta-ghost-bg-hover: rgba(255, 255, 255, 0.16); } /* keeps surface dark; re-verify with check-contrast.mjs */
```
```astro
{/* ghost: */}       'bg-[var(--wl-cta-ghost-bg)] hover:bg-[var(--wl-cta-ghost-bg-hover)]',
{/* ghost-on-dark: */} 'bg-transparent hover:bg-[rgba(255,255,255,0.08)]',
```
and remove `background:` from both `style` attributes. Add the dark hover pair to the `check-contrast.mjs` matrix.

## Warnings

### WR-01: Breadcrumb link hover state is dead code (inline color beats hover class)

**File:** `src/components/wl/Breadcrumb.astro:60, 86-87`
**Issue:** Same pattern as CR-02: every item — including anchors — gets `color: var(--wl-breadcrumb-color)` via the inline `style` attribute (`itemStyle`, line 60), while the anchor declares `hover:text-wl-accent` (line 86). The inline declaration wins the cascade, so breadcrumb links show no hover feedback and `transition-colors` is inert.
**Fix:** Apply the color via a class instead of inline style, e.g. add the font/color rules to a small `.wl-breadcrumb-item` utility in `global.css` (or use `text-[color:var(--wl-breadcrumb-color)]` in `class:list`), keeping `hover:text-wl-accent` able to override.

### WR-02: LinkCard hover state is dead code

**File:** `src/components/wl/LinkCard.astro:75, 97`
**Issue:** The card `<a>` declares `hover:text-wl-accent` (line 75, documented as the derived hover affordance for the fidelity gate) but also sets `color: inherit` in the inline `style` (line 97), which overrides the hover class. Even if it didn't, every child (outcome, title, body, go-link) hard-codes its own inline `color:`, so no descendant would reflect the hover change anyway. The card renders with zero hover feedback despite the documented intent, and `transition-colors` is inert.
**Fix:** Decide what the hover should actually affect (e.g., title color or border), then implement it with classes/custom properties rather than inline colors — e.g. drop `color: inherit` from the inline style, put the title color on a class, and use `group`/`group-hover:text-wl-accent` on the title element.

### WR-03: Callout asymmetric padding applied to the wrong sides

**File:** `src/components/wl/Callout.astro:53`
**Issue:** The extraction specifies `padding: 21px 26px` with a 3px accent bar on the **left**; the component's own comment (lines 19–20, 52) says padding-left is reduced to 23px so that bar + padding = 26px visual inset. But the shorthand `padding: 21px 23px 21px 26px;` is top/**right**/bottom/**left** — it puts 26px on the left (26 + 3px border = **29px** visual inset) and 23px on the right (vs 26px spec). Both horizontal insets deviate from the Figma spec, in opposite directions.
**Fix:**
```css
padding: 21px 26px 21px 23px;  /* left: 23px + 3px accent bar = 26px visual */
```

### WR-04: Solid CTA shadow uses invalid 4-length `drop-shadow()` — shadow silently never renders

**File:** `src/components/wl/CTAButton.astro:188`
**Issue:** `[filter:drop-shadow(0_12px_28px_-14px_rgba(18,51,59,0.75))]` generates `filter: drop-shadow(0 12px 28px -14px rgba(...))`. The `drop-shadow()` function accepts at most **three** lengths (offset-x, offset-y, blur) — there is no spread parameter. A fourth length makes the whole declaration invalid, so browsers drop it and the Figma "Shadow / CTA" (`0 12px 28px -14px rgba(18,51,59,0.75)`, spread `-14px`) never renders on the solid variant. The extraction artifact itself warns about this: "the React export's drop-shadow is a lossy filter conversion — box-shadow with spread is authoritative." LinkCard and ServiceCard correctly use `box-shadow`.
**Fix:** Use `box-shadow` (matches sibling components):
```astro
'bg-wl-ink text-wl-on-ink shadow-[0_12px_28px_-14px_rgba(18,51,59,0.75)] hover:opacity-90 transition-opacity'
```

### WR-05: LinkCard go-link hides visible text "Learn more" from assistive tech and voice control

**File:** `src/components/wl/LinkCard.astro:128-141`
**Issue:** The entire go-link span — including the visible label text (`goLabel`, default "Learn more") — carries `aria-hidden="true"` (line 138). Only the decorative arrow `→` should be hidden. Consequences: (a) the visible label is excluded from the link's accessible name, so speech-input users saying "click Learn more" get no match (WCAG 2.5.3 Label in Name); (b) screen-reader users never hear the call-to-action text sighted users see. The docblock (line 41) only justifies the *arrow* as decorative.
**Fix:**
```astro
<span style={...}>
  {goLabel} <span aria-hidden="true">→</span>
</span>
```

### WR-06: Breadcrumb assigns `aria-current="page"` to any href-less middle item

**File:** `src/components/wl/Breadcrumb.astro:70, 74-81`
**Issue:** `const isCurrent = isLast || !item.href;` — a middle item passed without `href` (e.g., a non-navigable trail segment) is rendered as `<span aria-current="page">`, producing multiple `aria-current="page"` elements in one trail. Per the WAI-ARIA breadcrumb pattern (which the docblock cites), `aria-current="page"` belongs on the last item only; non-link middle items should be plain spans.
**Fix:**
```astro
const isLink = !isLast && item.href;
...
{isLink ? (
  <a href={item.href} ...>{item.label}</a>
) : (
  <span aria-current={isLast ? 'page' : undefined} style={itemStyle}>{item.label}</span>
)}
```

### WR-07: Contrast gate rounds ratios before threshold comparison — borderline failures can pass

**File:** `scripts/check-contrast.mjs:73, 283-285`
**Issue:** `contrastRatio()` returns `Math.round(ratio * 100) / 100`, and the gate compares the **rounded** value: `const pass = ratio >= threshold;`. A true ratio of 4.4951 rounds to 4.50 and passes a 4.5 threshold even though the actual contrast is below WCAG AA. For a compliance gate this is non-conservative in exactly the borderline region the gate exists to police (the companion token was tuned to 4.55 — a 0.05 margin).
**Fix:** Compare unrounded, round only for display:
```js
export function contrastRatio(hex1, hex2) { ...; return (lighter + 0.05) / (darker + 0.05); }
// main loop:
const ratio = contrastRatio(fg, bg);
const pass = ratio >= threshold;
console.log(`... ${Math.round(ratio * 100) / 100}:1 ...`);
```
(Update `check-contrast.test.mjs` expectations accordingly.)

### WR-08: Wrong contrast values in a11y compliance-justification comments (4 files)

**File:** `src/components/wl/Eyebrow.astro:15, 41`, `src/components/wl/CTAButton.astro:76`, `src/components/wl/Breadcrumb.astro:17-18`, `scripts/check-contrast.mjs:228`
**Issue:** Several comments that serve as the audit trail for AA decisions state incorrect ratios (all recomputed with the project's own formula):
- `Eyebrow.astro:15,41`: claims `#5AA9A5` on `#12333B` = **5.42:1** "verified in check-contrast.mjs" — the script actually reports **4.9:1**. 5.42 is the ratio for a different pair (`#4FB3B8` on ink), apparently copy-pasted. Also line 9: accent on paper claimed **4.78:1**, actual **5.57:1**.
- `CTAButton.astro:76`: claims `#EAF6F3` on `#12333B` = **13.41:1** — actual **12.14:1** (the script's own line 217 has it right).
- `Breadcrumb.astro:17`: claims `#4C6A70` on paper = **4.57:1** while line 51 of the same file says **5.58:1** (5.58 is correct); line 18 claims `#4C6A70` on white = **4.19:1 "borderline"** — actual **5.83:1** (not borderline at all).
- `check-contrast.mjs:228`: compositing arithmetic error — "R=0.08*255+0.92*12=24" is actually 31 (`#1F3339`, not `#183339`); harmless since D_PAPER is used as the proxy, but the shown derivation is wrong.

All affected pairs still pass AA, so no live violation — but these numbers are load-bearing documentation: a future change relying on "5.42:1 headroom" for the eyebrow (real margin: 4.9 vs 4.5) or avoiding white surfaces because of a phantom "4.19 borderline" would misjudge risk.
**Fix:** Correct each figure to the script's actual output (4.9, 5.57, 12.14, 5.58, 5.83, `#1F3339`), and prefer citing the script label instead of restating numbers by hand.

### WR-09: Inconsistent/hard-coded title semantics across the card primitives

**File:** `src/components/wl/ServiceCard.astro:166`, `src/components/wl/LinkCard.astro:111-116`, `src/components/wl/Step.astro:74-77`
**Issue:** Three sibling primitives render the same visual style (`.wl-heading-h3`) with three different structures: ServiceCard hard-codes `<h3>`, LinkCard uses `<p>`, Step uses `<p>`. LinkCard's `<p>` is defensible (headings inside links are discouraged) and Step's is documented — but ServiceCard's hard-coded `<h3>` will produce heading-order violations (axe `heading-order`) on any page where the card doesn't sit under an `<h2>`, and consumers cannot adjust it. The inconsistency also means a grid mixing ServiceCards and LinkCards exposes some titles in the headings outline and not others, despite identical visual weight.
**Fix:** Either standardize on non-heading elements for all three, or give ServiceCard a `headingLevel?: 2 | 3 | 4` prop (default 3) and document the outline contract in each docblock.

## Info

### IN-01: ServiceCard `body` prop/slot precedence contradicts its docblock; `body` missing from Props docs

**File:** `src/components/wl/ServiceCard.astro:41-50, 60-67, 175-181`
**Issue:** The docblock's Slots section says the default slot "replaces the body text if slotted; otherwise use body prop," but the code gives the `body` **prop** precedence (`body ? <p>{body}</p> : <slot/>`) — slot content is silently dropped when both are supplied. Also, `body?: string` exists in the `Props` interface (line 65) but is absent from the docblock's Props list (lines 41–46).
**Fix:** Align doc and behavior (recommend: slot wins when present, prop as fallback) and add `body` to the Props documentation.

### IN-02: Tag dark-mode comment is inaccurate; dark Tag pair absent from contrast matrix

**File:** `src/components/wl/Tag.astro:20-24, 39`; `scripts/check-contrast.mjs:243`
**Issue:** The comment claims the fill is "naturally lighter in dark mode (accent flips to #4FB3B8 — fill remains subtle tint)", but the fill is the hard-coded literal `rgba(14,112,120,0.08)` (light-accent RGB) — it does not flip and does not reference the accent token. Behavior is fine (computed: sub-dark `#A9C9C7` on the fill composited over the dark card = **7.13:1**, comfortable pass), but the matrix in `check-contrast.mjs` only covers the light Tag pair, so dark-mode Tag text is unverified by the gate.
**Fix:** Correct the comment, and add a dark pair, e.g. `[D_SUB, '#123840', 'dark: tag text (sub) on tag fill (accent 8% over card panel)', 4.5, true]`.

### IN-03: Icon SVG markup duplicated six times in CTAButton

**File:** `src/components/wl/CTAButton.astro:84-119, 140-171, 201-232`
**Issue:** The calendar and mail SVGs (identical attributes and path data) are repeated verbatim in all three render branches — six copies of the D-06 closed set. Any future path correction must be applied in six places; drift between copies would be invisible.
**Fix:** Hoist the paths into a frontmatter map (`const ICON_PATHS = { calendar: 'M5.66…', mail: 'M2.125…' }`) and render one shared `<svg>` fragment per branch (or restructure to a single `<a>` with variant-derived class/style maps).

### IN-04: Stale commented-out placeholder constants and duplicate pairs in contrast script

**File:** `scripts/check-contrast.mjs:141-152, 164-267`
**Issue:** Lines 141–152 are commented-out `FLAGGED-GAP` placeholder constants (Tag/Callout/ServiceCard fills) that were superseded by the fresh 2026-07-15 extraction — the real values now exist a few lines above (`TAG_FILL_LIGHT`, `CARD_WHITE`, etc.), making the block dead commented-out code. Additionally, three pairs appear twice in `PAIRS` with different labels: `[L_INK, L_PAPER]` (lines 167 & 226), `[L_ACCENT, L_PAPER]` (169 & 233), `[D_ACCENT, D_PAPER]` (200 & 234). Duplicates are documented as "confirming Phase 35 pair" but inflate the report and invite label drift.
**Fix:** Delete the superseded FLAGGED-GAP block; merge duplicate pairs by extending the existing labels (e.g., "link text / CTAButton ghost / Eyebrow on-light").

### IN-05: Placeholder booking URL with TODO in SiteHeader

**File:** `src/components/layout/SiteHeader.astro:4`
**Issue:** `const BOOKING_URL = '/#book'; // TODO: replace with real Calendly URL when Phase 37 wires IA-03` — both header CTAs currently point at a fragment that has no corresponding `id="book"` target yet. Known and tracked for Phase 37; recorded here so the review trail shows it.
**Fix:** No action this phase; verify Phase 37 replaces the constant and removes the TODO.

---

_Reviewed: 2026-07-16T05:44:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_
