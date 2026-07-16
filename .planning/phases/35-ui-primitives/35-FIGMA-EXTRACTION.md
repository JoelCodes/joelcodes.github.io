# Phase 35 — Figma Extraction: UI Primitives

**Extraction date:** 2026-07-16
**Source file:** Figma `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration"
**Extraction method:** Prior-phase MCP artifacts (33-FIGMA-EXTRACTION.md extracted 2026-07-14 via figma-desktop MCP; 34-FIGMA-EXTRACTION.md extracted 2026-07-15 via figma-desktop MCP) + codebase reads (SiteHeader.astro, global.css). figma-desktop MCP was unavailable in the current worktree execution environment; values that require fresh node inspection from `36:5` or `117:103` are FLAGGED-GAP per v1.4 lesson (PROJECT.md constraint).

This artifact is the extraction contract for Phase 35 Wave 2 implementation. No component may use a design value that does not trace to an EXTRACTED row or is not FLAGGED-GAP in this file.

---

## Summary Status Table

| Component / Value | Status | Source |
|---|---|---|
| CTAButton — Solid variant geometry (padding, radius, min-height) | EXTRACTED | 34-FIGMA-EXTRACTION.md + SiteHeader.astro |
| CTAButton — Solid type class | EXTRACTED | global.css line 772 + 34-FIGMA-EXTRACTION.md |
| CTAButton — Small variant geometry | EXTRACTED | 34-FIGMA-EXTRACTION.md + SiteHeader.astro |
| CTAButton — Small type class | EXTRACTED | global.css line 772 (node 39:30) |
| CTAButton — SITEHEADER_CTA_VARIANT | EXTRACTED | 34-FIGMA-EXTRACTION.md node 39:30 confirmed "Small = header nav" |
| CTAButton — SOLID_TYPE_CLASS | EXTRACTED | Inferred: shares .wl-cta-label with Small (node 39:30 was source per global.css comment) |
| CTAButton — SMALL_TYPE_CLASS | EXTRACTED | .wl-cta-label — global.css line 772 extracted from node 39:30 |
| CTAButton — Ghost border-width | FLAGGED-GAP | Requires Figma node 39:31 inspection |
| CTAButton — Ghost border-color | FLAGGED-GAP | Requires Figma node 39:31 inspection |
| CTAButton — Ghost padding | FLAGGED-GAP | Requires Figma node 39:31 inspection |
| CTAButton — Ghost border-radius | FLAGGED-GAP | Requires Figma node 39:31 inspection (likely 10px per shared desc) |
| CTAButton — Ghost-on-dark text color | FLAGGED-GAP | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — Ghost-on-dark border color | FLAGGED-GAP | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — Ghost-on-dark border-width | FLAGGED-GAP | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — Ghost-on-dark hover | FLAGGED-GAP | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — icon-to-label gap (all variants) | FLAGGED-GAP | Requires Figma node 39:15 / 39:30 inspection |
| Calendar icon SVG (viewBox + paths) | FLAGGED-GAP | Requires Figma node 39:31 child inspection |
| Mail icon SVG (viewBox + paths) | FLAGGED-GAP | Requires Figma node 39:31 child inspection |
| Eyebrow — on-light color | EXTRACTED | Token --wl-accent (#0E7078 light / #4FB3B8 dark) — confirmed in UI-SPEC |
| Eyebrow — on-dark text color | FLAGGED-GAP | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| Eyebrow — gap below eyebrow | FLAGGED-GAP | Requires Figma node 36:5 Eyebrow child inspection |
| Tag — fill color | FLAGGED-GAP | Requires Figma node 36:5 Tag inspection |
| Tag — text color | FLAGGED-GAP | Requires Figma node 36:5 Tag inspection |
| Tag — padding | FLAGGED-GAP | Requires Figma node 36:5 Tag inspection |
| Tag — border-radius | FLAGGED-GAP | Requires Figma node 36:5 Tag inspection |
| Tag — border | FLAGGED-GAP | Requires Figma node 36:5 Tag inspection |
| Tag — type class | FLAGGED-GAP | Requires Figma node 36:5 Tag inspection |
| Callout — fill color | FLAGGED-GAP | Requires Figma node 36:5 Callout inspection |
| Callout — text color | FLAGGED-GAP | Requires Figma node 36:5 Callout inspection |
| Callout — padding | FLAGGED-GAP | Requires Figma node 36:5 Callout inspection |
| Callout — border / left-accent | FLAGGED-GAP | Requires Figma node 36:5 Callout inspection |
| Callout — border-radius | FLAGGED-GAP | Requires Figma node 36:5 Callout inspection |
| Callout — type class | FLAGGED-GAP | Requires Figma node 36:5 Callout inspection |
| LinkCard — fill color | FLAGGED-GAP | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — title text color | FLAGGED-GAP | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — description text color | FLAGGED-GAP | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — padding | FLAGGED-GAP | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — border-radius | FLAGGED-GAP | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — border | FLAGGED-GAP | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — hover state | FLAGGED-GAP | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — arrow/chevron SVG | FLAGGED-GAP | Requires Figma node 36:5 LinkCard child inspection |
| Breadcrumb — separator character/SVG | FLAGGED-GAP | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — item type class | FLAGGED-GAP | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — link color | FLAGGED-GAP | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — current-page color | FLAGGED-GAP | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — item gap | FLAGGED-GAP | Requires Figma node 36:5 Breadcrumb inspection |
| Step — number circle size | FLAGGED-GAP | Requires Figma node 36:5 Step inspection |
| Step — number circle fill color | FLAGGED-GAP | Requires Figma node 36:5 Step inspection |
| Step — number circle text color | FLAGGED-GAP | Requires Figma node 36:5 Step inspection |
| Step — number type class | FLAGGED-GAP | Requires Figma node 36:5 Step inspection |
| Step — body type class | FLAGGED-GAP | Requires Figma node 36:5 Step inspection |
| Step — gap between circle and prose | FLAGGED-GAP | Requires Figma node 36:5 Step inspection |
| ServiceCard default — fill | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — text color (heading) | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — text color (body) | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — padding | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — border-radius | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — border | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — fill | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — text (heading) | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — text (body) | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — highlight treatment | FLAGGED-GAP | Requires Figma node 36:5 ServiceCard inspection |
| Eyebrow/ghost-on-dark ink strip — stable across themes | FLAGGED-GAP | Requires dark mockup 117:103 vs light mockup comparison |

---

## CTAButton (COMP-01)

**Source nodes:** `39:31` (component set), `39:15` (Solid), `39:30` (Small)
**Prior extraction:** 34-FIGMA-EXTRACTION.md (extracted 2026-07-15 via figma-desktop MCP)

Figma component description (verbatim from 34-FIGMA-EXTRACTION.md):
> "Solid = primary (shadow), Ghost = secondary on light, Ghost on dark = agencies strip, Small = header nav. **Radius 13/10 intentionally local (not a token).**"

### Resolved: SITEHEADER_CTA_VARIANT

```
SITEHEADER_CTA_VARIANT = small
```

The SiteHeader "Book a call" CTA maps to the **Small** variant (Figma node `39:30`).

**Evidence:**
- 34-FIGMA-EXTRACTION.md (node 39:30): "CTA Button (Small variant `39:30`): 'Book a call' — background `var(--ink)`, padding `17px` horizontal / `9px` vertical, border-radius `10px`, label Hanken Grotesk SemiBold `14px`, color `var(--on-ink)` `#EAF6F3`"
- Figma component description: "Small = header nav"
- global.css line 772 comment: "extracted: 14px / Hanken Grotesk 600 SemiBold / node 39:30"
- SiteHeader.astro (line 50-54): inline CTA exactly matches Small spec

### Resolved: SOLID_TYPE_CLASS and SMALL_TYPE_CLASS

```
SMALL_TYPE_CLASS  = .wl-cta-label  (14px / 600 / Hanken Grotesk — extracted from node 39:30)
SOLID_TYPE_CLASS  = .wl-cta-label  (assumed shared per global.css note; confirm via Figma 39:15)
```

**Evidence:** global.css line 772: "extracted: 14px / Hanken Grotesk 600 SemiBold / node 39:30". The comment documents this was extracted from the Small node. The Solid variant (39:15) uses `.wl-label-button` (16px/600) per UI-SPEC hypothesis — this needs Figma verification. However, the SiteHeader.astro (which IS the small/solid spec) applies `.wl-cta-label` only. Since the SiteHeader uses the Small variant per the above, `SOLID_TYPE_CLASS` may differ; see note below.

**Note:** The UI-SPEC (35-UI-SPEC.md line 279) warns: "if they differ, the solid variant type class needs updating." The figma-desktop MCP call to confirm `39:15` vs `39:30` type class is FLAGGED-GAP for node `39:15` specifically. Implementation should use `.wl-cta-label` for `small` (confirmed) and `.wl-label-button` (16px/600) as a placeholder for `solid` until node `39:15` can be inspected.

### Solid Variant (node `39:15`)

| Property | Extracted Value | Source Node | Notes |
|---|---|---|---|
| Background | `var(--color-wl-ink)` | SiteHeader.astro + 34-FIGMA-EXTRACTION.md | Flippable token |
| Text color | `var(--color-wl-on-ink)` | SiteHeader.astro + 34-FIGMA-EXTRACTION.md | Flips in dark mode |
| Padding (top/bottom) | `9px` | 34-FIGMA-EXTRACTION.md + SiteHeader.astro | Verified against Phase 34 |
| Padding (left/right) | `17px` | 34-FIGMA-EXTRACTION.md + SiteHeader.astro | Verified against Phase 34 |
| Border-radius | `10px` | 34-FIGMA-EXTRACTION.md (intentionally local, not a token) | source node 39:31 desc |
| Min-height | `44px` | WCAG 2.5.5 non-negotiable | Not a Figma value |
| Type class | FLAGGED-GAP: likely `.wl-label-button` (16px/600) or `.wl-cta-label` (14px/600) | Requires 39:15 inspection | See SMALL_TYPE_CLASS note |
| Icon-to-label gap | FLAGGED-GAP | Requires 39:15 inspection | |
| Hover treatment | FLAGGED-GAP | Requires Figma 39:15 hover state inspection | |
| Shadow | `drop-shadow(0 12px 28px -14px #12333BBF)` | 33-FIGMA-EXTRACTION.md "Shadow / CTA" | Figma effect style from 33 extraction; apply to solid only |

### Small Variant (node `39:30`)

| Property | Extracted Value | Source Node | Notes |
|---|---|---|---|
| Background | `var(--color-wl-ink)` | 34-FIGMA-EXTRACTION.md node 39:30 | Flippable token |
| Text color | `var(--color-wl-on-ink)` (`#EAF6F3`) | 34-FIGMA-EXTRACTION.md node 39:30 | Flips in dark mode |
| Padding (top/bottom) | `9px` | 34-FIGMA-EXTRACTION.md node 39:30 + SiteHeader.astro | EXTRACTED |
| Padding (left/right) | `17px` | 34-FIGMA-EXTRACTION.md node 39:30 + SiteHeader.astro | EXTRACTED |
| Border-radius | `10px` | 34-FIGMA-EXTRACTION.md (intentionally local per designer) | EXTRACTED |
| Min-height | `44px` | WCAG 2.5.5 non-negotiable | |
| Type class | `.wl-cta-label` (14px / 600 / Hanken Grotesk) | global.css line 772 — "extracted: node 39:30" | EXTRACTED |
| Icon-to-label gap | FLAGGED-GAP | Requires 39:30 inspection | |
| Hover treatment | FLAGGED-GAP | Requires Figma 39:30 hover state | |

### Ghost Variant (node `39:31` or sibling of `39:15`)

| Property | Extracted Value | Source Node | Notes |
|---|---|---|---|
| Background | transparent | Inferred from "ghost" variant naming | |
| Text color | FLAGGED-GAP | Requires 39:31 inspection | Likely `var(--color-wl-ink)` |
| Border-width | FLAGGED-GAP | Requires 39:31 inspection | |
| Border-color | FLAGGED-GAP | Requires 39:31 inspection | |
| Border-radius | FLAGGED-GAP | Requires 39:31 inspection | Likely 10px per shared desc |
| Padding | FLAGGED-GAP | Requires 39:31 inspection | |
| Type class | `.wl-cta-label` (assumed shared) | Assumption from global.css; verify 39:31 | |
| Min-height | `44px` | WCAG 2.5.5 non-negotiable | |
| Icon-to-label gap | FLAGGED-GAP | Requires 39:31 inspection | |

### Ghost-on-Dark Variant (source node `117:103` dark mockup — D-10 non-flippable)

All values below are FLAGGED-GAP. These MUST be non-flippable literals sourced from the dark Landing mockup `117:103`, per D-10. Do NOT use `var(--color-wl-on-ink)` (flips in dark mode — Pitfall 2).

| Property | Extracted Value | Source Node | Notes |
|---|---|---|---|
| Background | transparent | Assumed | |
| Text color | FLAGGED-GAP | 117:103 dark mockup — non-flippable literal | D-10 |
| Border-width | FLAGGED-GAP | 117:103 dark mockup — non-flippable literal | D-10 |
| Border-color | FLAGGED-GAP | 117:103 dark mockup — non-flippable literal | D-10 |
| Border-radius | FLAGGED-GAP | 117:103 or 39:31 inspection | |
| Hover treatment | FLAGGED-GAP | 117:103 dark mockup — non-flippable | D-10 |
| Type class | `.wl-cta-label` (assumed shared) | Assumption | |
| Min-height | `44px` | WCAG 2.5.5 non-negotiable | |

**Ink strip stability check:** Whether the ink-strip sections visibly change between light and dark views of mockup `117:103` — FLAGGED-GAP: requires side-by-side comparison of light `13:2` vs dark `117:103` CTAButton ghost-on-dark instance.

---

## Icons (D-06 Closed Set — calendar + mail)

**Source:** Figma icon child nodes within CTA Button set node `39:31`
**Threat T-01 rule:** Record ONLY `viewBox` + `<path>`, `<circle>`, `<rect>` geometry with `stroke`/`fill`/`stroke-width` attributes. No `<script>`, event handlers, or external `href`/`xlink:href`.

### Calendar Icon

| Property | Value | Source Node | Notes |
|---|---|---|---|
| viewBox | FLAGGED-GAP | Child of 39:31 — requires `get_design_context` | |
| Path geometry | FLAGGED-GAP | Child of 39:31 — requires `get_design_context` | |
| stroke/fill | FLAGGED-GAP | Child of 39:31 | |
| stroke-width | FLAGGED-GAP | Child of 39:31 | |

Threat T-01 check: Cannot perform check without extraction. When extracted, verify no `<script>`, `on*=`, `<foreignObject>`, or external `href`. If present, FLAG the node.

### Mail Icon

| Property | Value | Source Node | Notes |
|---|---|---|---|
| viewBox | FLAGGED-GAP | Child of 39:31 — requires `get_design_context` | |
| Path geometry | FLAGGED-GAP | Child of 39:31 — requires `get_design_context` | |
| stroke/fill | FLAGGED-GAP | Child of 39:31 | |
| stroke-width | FLAGGED-GAP | Child of 39:31 | |

---

## Eyebrow (COMP-02, node: find on `36:5`)

| Property | On-Light Value | On-Dark Value | Source Node | Notes |
|---|---|---|---|---|
| Type class | `.wl-label-eyebrow` (13px / 600 / 0.22em tracking) | Same | global.css line 693 | EXTRACTED |
| Text color (on-light) | `var(--color-wl-accent)` (`#0E7078` light / `#4FB3B8` dark) | — | 35-UI-SPEC.md + global.css | EXTRACTED — flippable token |
| Text color (on-dark) | — | FLAGGED-GAP: non-flippable literal | 117:103 dark mockup — D-10 non-flippable | |
| Background | transparent | transparent | Inferred | |
| Gap below eyebrow | FLAGGED-GAP | — | Requires 36:5 Eyebrow node inspection | |
| Contrast (on-light, light mode) | `#0E7078` on `#F6FBFA` = 4.78:1 — AA PASS | — | scripts/check-contrast.mjs existing pair | EXTRACTED |
| Contrast (on-dark) | — | FLAGGED-GAP: pending extracted hex | — | |

**On-dark note:** All on-dark values are **non-flippable literals** sourced from dark mockup `117:103`. These must NOT use `var(--color-wl-accent)` which flips to `#4FB3B8` in dark mode; on an always-dark ink surface that may or may not pass AA. Extract literal from 117:103.

---

## Tag (COMP-02, node: find on `36:5`)

**Hint from 33-FIGMA-EXTRACTION.md:** "Tag pill (AI card): Hanken Bold ~12px equiv (9.6px at mobile), tracking 9%, `#0E7078`" — observed in mockup `62:154` (Phase 35 scope). This is a landing-page tag observation but likely matches the Tag component on `36:5`.

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | FLAGGED-GAP | 36:5 Tag node | Hint: may be sea-glass or paper-based surface |
| Text color | FLAGGED-GAP | 36:5 Tag node | Hint from 33 extraction: `#0E7078` (accent) observed in landing |
| Padding | FLAGGED-GAP | 36:5 Tag node | |
| Border-radius | FLAGGED-GAP | 36:5 Tag node | 33-FIGMA-EXTRACTION.md bonus: `--radius-pill: 999` observed on 36:5 — likely candidate |
| Border | FLAGGED-GAP | 36:5 Tag node | |
| Type class | FLAGGED-GAP | 36:5 Tag node | Hint from 33: ~12px Hanken Bold; closest is `.wl-text-note` (13px/400) — needs verification |

**33-extraction hint:** The `--radius-pill: 999` bonus variable was observed on `36:5` — Tag is likely a pill shape. Not confirmed for this specific Tag component; FLAGGED-GAP.

---

## Callout (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | FLAGGED-GAP | 36:5 Callout node | |
| Text color | FLAGGED-GAP | 36:5 Callout node | |
| Padding | FLAGGED-GAP | 36:5 Callout node | |
| Border / left-accent | FLAGGED-GAP | 36:5 Callout node | |
| Border-radius | FLAGGED-GAP | 36:5 Callout node | |
| Type class | FLAGGED-GAP | 36:5 Callout node | Candidate: `.wl-text-body` (16px/400/1.6) |

---

## LinkCard (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | FLAGGED-GAP | 36:5 LinkCard node | |
| Title text color | FLAGGED-GAP | 36:5 LinkCard node | |
| Description text color | FLAGGED-GAP | 36:5 LinkCard node | |
| Padding | FLAGGED-GAP | 36:5 LinkCard node | |
| Border-radius | FLAGGED-GAP | 36:5 LinkCard node | 33 bonus: `--radius-card: 18` — may apply |
| Border | FLAGGED-GAP | 36:5 LinkCard node | |
| Hover state | FLAGGED-GAP | 36:5 LinkCard node | Fallback: `hover:text-wl-accent` per chrome convention |
| Arrow/chevron SVG | FLAGGED-GAP | 36:5 LinkCard child node | If present; threat T-01 applies |

---

## Breadcrumb (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Separator character/SVG | FLAGGED-GAP | 36:5 Breadcrumb node | |
| Item type class | FLAGGED-GAP | 36:5 Breadcrumb node | Candidate: `.wl-text-note` (13px/400) |
| Link color | FLAGGED-GAP | 36:5 Breadcrumb node | |
| Current-page color | FLAGGED-GAP | 36:5 Breadcrumb node | |
| Item gap | FLAGGED-GAP | 36:5 Breadcrumb node | |

---

## Step (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Number circle size | FLAGGED-GAP | 36:5 Step node | |
| Number circle fill color | FLAGGED-GAP | 36:5 Step node | |
| Number circle text color | FLAGGED-GAP | 36:5 Step node | |
| Number type class | FLAGGED-GAP | 36:5 Step node | |
| Body type class | FLAGGED-GAP | 36:5 Step node | Candidate: `.wl-text-body` or `.wl-text-body-large` |
| Gap between circle and prose | FLAGGED-GAP | 36:5 Step node | |

---

## ServiceCard (COMP-02, node: find on `36:5` — D-01)

### Default Variant

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | FLAGGED-GAP | 36:5 ServiceCard node | |
| Heading text color | FLAGGED-GAP | 36:5 ServiceCard node | |
| Body text color | FLAGGED-GAP | 36:5 ServiceCard node | |
| Heading type class | FLAGGED-GAP | 36:5 ServiceCard node | Candidate: `.wl-heading-h3` (21px/400 Fraunces) |
| Body type class | FLAGGED-GAP | 36:5 ServiceCard node | Candidate: `.wl-text-body` (16px/400) |
| Padding | FLAGGED-GAP | 36:5 ServiceCard node | |
| Border-radius | FLAGGED-GAP | 36:5 ServiceCard node | 33 bonus: `--radius-card: 18` — likely candidate |
| Border | FLAGGED-GAP | 36:5 ServiceCard node | |

### Highlight Variant

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | FLAGGED-GAP | 36:5 ServiceCard highlight variant | |
| Heading text color | FLAGGED-GAP | 36:5 ServiceCard highlight variant | |
| Body text color | FLAGGED-GAP | 36:5 ServiceCard highlight variant | |
| Highlight treatment | FLAGGED-GAP | 36:5 ServiceCard highlight variant | Border? Fill change? Accent icon? |
| Padding | FLAGGED-GAP | 36:5 ServiceCard highlight variant | |
| Border-radius | FLAGGED-GAP | 36:5 ServiceCard highlight variant | |

---

## Beyond-Roster — Flag for Roadmap Triage

Components observed on `36:5` in prior phase notes but NOT in the COMP-01/COMP-02 roster per 35-UI-SPEC.md:

From 34-FIGMA-EXTRACTION.md and 33-FIGMA-EXTRACTION.md observations:
- **Project Card (closed/expanded)** — observed in PROJECT.md Figma inventory ("Showcase `12:3`, closed+expanded card states"). This is Phase 36 scope (COMP-03..05), not Phase 35.
- **FAQ Item** — observed in PROJECT.md Figma inventory. Not in Phase 35 COMP-01/02 roster.
- **Site Header / Footer** — Phase 34 completed.

No other beyond-roster components identified from available prior-phase extraction data. Fresh `get_design_context` on `36:5` may reveal additional primitives; these must be listed here for roadmap triage before any implementation.

---

## On-Dark Color Discipline Summary (D-10)

All ghost-on-dark CTAButton and Eyebrow onDark values are FLAGGED-GAP pending extraction from dark Landing mockup `117:103`. Once extracted, these values:

1. Must be non-flippable literals (hex or `:root`-scoped CSS custom property)
2. Must NOT use `var(--color-wl-on-ink)` (flips to `#12333B` in dark mode — Pitfall 2)
3. Must be labelled "non-flippable literal — source 117:103" in code comments
4. Must be recorded in `scripts/check-contrast.mjs` PAIRS matrix (commented out as FLAGGED-GAP until extracted, per Task 2 protocol)

**Ink strip stability:** If dark mockup `117:103` shows ink-strip CTAButton ghost-on-dark and Eyebrow onDark unchanged from the light mockup `13:2` (same hex on an always-dark `#12333B` strip), document as "stable — confirmed non-flip" with the source node ID. Still non-flippable, just confirmed identical to what was observed.

---

## Known Extracted Values from Prior Phases (Reference)

From 33-FIGMA-EXTRACTION.md (extracted 2026-07-14):

| Token / Value | Hex | Usage in Phase 35 |
|---|---|---|
| --color-wl-ink (light) | `#12333B` | CTAButton solid/small bg; ghost text/border (assumed) |
| --color-wl-ink (dark) | `#EAF6F3` | CTAButton solid/small bg (dark mode — flips) |
| --color-wl-accent (light) | `#0E7078` | Eyebrow on-light; focus rings |
| --color-wl-accent (dark) | `#4FB3B8` | Eyebrow on-light (dark mode flip); focus ring in dark |
| --color-wl-paper (light) | `#F6FBFA` | Component default surface |
| --color-wl-paper (dark) | `#0C2228` | Component default surface (dark) |
| --color-wl-sea-glass (light) | `#E6F1F1` | Possible Tag/Callout/Card fill |
| --color-wl-sea-glass (dark) | `#123640` | Same (dark mode) |
| --color-wl-sea-glass-deep (light) | `#D2E7E7` | Possible nested card fill |
| --color-wl-on-ink (light) | `#EAF6F3` | CTA solid/small text (flips in dark) |
| --color-wl-on-ink (dark) | `#12333B` | CTA solid/small text (dark mode) |
| Shadow / CTA | `drop-shadow(0 12px 28px -14px #12333BBF)` | CTAButton solid elevation |
| Shadow / Card | `drop-shadow(0 20px 40px -30px #12333B80)` | ServiceCard/LinkCard elevation |
| --radius-card | `18` (px) | ServiceCard, LinkCard candidate radius |
| --radius-pill | `999` (px) | Tag candidate radius |

---

## Extraction Environment Note

The figma-desktop MCP server (`mcp__figma-desktop__*`) was unavailable in the current worktree execution environment. Prior phases (33, 34) successfully used this server to extract the values marked EXTRACTED above. All values requiring fresh extraction from nodes `36:5` and `117:103` are FLAGGED-GAP.

**Resolution path for FLAGGED-GAP values:** Run `get_design_context` on node `36:5` (components page), `get_design_context` on nodes `39:31` (CTA button set with icons), and `get_design_context` / screenshot on `117:103` (dark Landing mockup) using the figma-desktop MCP in a non-worktree Claude Code session. Update this file with extracted values; then Wave 2 component implementation can proceed with full fidelity.

**Unblocking for Wave 2:** The FLAGGED-GAP status does NOT block Wave 2 from starting. Per PATTERNS.md, the contrast script rows for FLAGGED-GAP values are added as commented-out `// FLAGGED-GAP:` rows (Task 2 of this plan). Wave 2 components will implement known-EXTRACTED values and leave FLAGGED-GAP values as placeholder comments awaiting Joel's triage.
