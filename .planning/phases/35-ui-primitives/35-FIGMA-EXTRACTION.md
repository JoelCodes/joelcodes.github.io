# Phase 35 — Figma Extraction: UI Primitives

**Extraction date:** 2026-07-16
**Source file:** Figma `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration"
**Extraction method:** Prior-phase MCP artifacts (33-FIGMA-EXTRACTION.md extracted 2026-07-14 via figma-desktop MCP; 34-FIGMA-EXTRACTION.md extracted 2026-07-15 via figma-desktop MCP) + codebase reads (SiteHeader.astro, global.css). figma-desktop MCP was unavailable in the current worktree execution environment; values that require fresh node inspection from `36:5` or `117:103` are EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
This artifact is the extraction contract for Phase 35 Wave 2 implementation. No component may use a design value that does not trace to an EXTRACTED row or is not EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
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
| CTAButton — Ghost border-width | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 39:31 inspection |
| CTAButton — Ghost border-color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 39:31 inspection |
| CTAButton — Ghost padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 39:31 inspection |
| CTAButton — Ghost border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 39:31 inspection (likely 10px per shared desc) |
| CTAButton — Ghost-on-dark text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — Ghost-on-dark border color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — Ghost-on-dark border-width | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — Ghost-on-dark hover | NO HOVER STATES IN FIGMA — Claude discretion per UI-SPEC, flag at fidelity gate | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| CTAButton — icon-to-label gap (all variants) | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 39:15 / 39:30 inspection |
| Calendar icon SVG (viewBox + paths) | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 39:31 child inspection |
| Mail icon SVG (viewBox + paths) | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 39:31 child inspection |
| Eyebrow — on-light color | EXTRACTED | Token --wl-accent (#0E7078 light / #4FB3B8 dark) — confirmed in UI-SPEC |
| Eyebrow — on-dark text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma dark mockup 117:103 inspection (D-10 non-flippable) |
| Eyebrow — gap below eyebrow | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Eyebrow child inspection |
| Tag — fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Tag inspection |
| Tag — text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Tag inspection |
| Tag — padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Tag inspection |
| Tag — border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Tag inspection |
| Tag — border | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Tag inspection |
| Tag — type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Tag inspection |
| Callout — fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Callout inspection |
| Callout — text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Callout inspection |
| Callout — padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Callout inspection |
| Callout — border / left-accent | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Callout inspection |
| Callout — border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Callout inspection |
| Callout — type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Callout inspection |
| LinkCard — fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — title text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — description text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — border | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — hover state | NO HOVER STATES IN FIGMA — Claude discretion per UI-SPEC, flag at fidelity gate | Requires Figma node 36:5 LinkCard inspection |
| LinkCard — arrow/chevron SVG | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 LinkCard child inspection |
| Breadcrumb — separator character/SVG | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — item type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — link color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — current-page color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Breadcrumb inspection |
| Breadcrumb — item gap | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Breadcrumb inspection |
| Step — number circle size | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Step inspection |
| Step — number circle fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Step inspection |
| Step — number circle text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Step inspection |
| Step — number type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Step inspection |
| Step — body type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Step inspection |
| Step — gap between circle and prose | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 Step inspection |
| ServiceCard default — fill | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — text color (heading) | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — text color (body) | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard default — border | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — fill | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — text (heading) | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — text (body) | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| ServiceCard highlight — highlight treatment | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires Figma node 36:5 ServiceCard inspection |
| Eyebrow/ghost-on-dark ink strip — stable across themes | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires dark mockup 117:103 vs light mockup comparison |

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

**Note:** The UI-SPEC (35-UI-SPEC.md line 279) warns: "if they differ, the solid variant type class needs updating." The figma-desktop MCP call to confirm `39:15` vs `39:30` type class is EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
### Solid Variant (node `39:15`)

| Property | Extracted Value | Source Node | Notes |
|---|---|---|---|
| Background | `var(--color-wl-ink)` | SiteHeader.astro + 34-FIGMA-EXTRACTION.md | Flippable token |
| Text color | `var(--color-wl-on-ink)` | SiteHeader.astro + 34-FIGMA-EXTRACTION.md | Flips in dark mode |
| Padding (top/bottom) | `9px` | 34-FIGMA-EXTRACTION.md + SiteHeader.astro | Verified against Phase 34 |
| Padding (left/right) | `17px` | 34-FIGMA-EXTRACTION.md + SiteHeader.astro | Verified against Phase 34 |
| Border-radius | `10px` | 34-FIGMA-EXTRACTION.md (intentionally local, not a token) | source node 39:31 desc |
| Min-height | `44px` | WCAG 2.5.5 non-negotiable | Not a Figma value |
| Type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:15 inspection | See SMALL_TYPE_CLASS note |
| Icon-to-label gap | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:15 inspection | |
| Hover treatment | NO HOVER STATES IN FIGMA — Claude discretion per UI-SPEC, flag at fidelity gate | Requires Figma 39:15 hover state inspection | |
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
| Icon-to-label gap | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:30 inspection | |
| Hover treatment | NO HOVER STATES IN FIGMA — Claude discretion per UI-SPEC, flag at fidelity gate | Requires Figma 39:30 hover state | |

### Ghost Variant (node `39:31` or sibling of `39:15`)

| Property | Extracted Value | Source Node | Notes |
|---|---|---|---|
| Background | transparent | Inferred from "ghost" variant naming | |
| Text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:31 inspection | Likely `var(--color-wl-ink)` |
| Border-width | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:31 inspection | |
| Border-color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:31 inspection | |
| Border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:31 inspection | Likely 10px per shared desc |
| Padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:31 inspection | |
| Type class | `.wl-cta-label` (assumed shared) | Assumption from global.css; verify 39:31 | |
| Min-height | `44px` | WCAG 2.5.5 non-negotiable | |
| Icon-to-label gap | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Requires 39:31 inspection | |

### Ghost-on-Dark Variant (source node `117:103` dark mockup — D-10 non-flippable)

All values below are EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
| Property | Extracted Value | Source Node | Notes |
|---|---|---|---|
| Background | transparent | Assumed | |
| Text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 117:103 dark mockup — non-flippable literal | D-10 |
| Border-width | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 117:103 dark mockup — non-flippable literal | D-10 |
| Border-color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 117:103 dark mockup — non-flippable literal | D-10 |
| Border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 117:103 or 39:31 inspection | |
| Hover treatment | NO HOVER STATES IN FIGMA — Claude discretion per UI-SPEC, flag at fidelity gate | 117:103 dark mockup — non-flippable | D-10 |
| Type class | `.wl-cta-label` (assumed shared) | Assumption | |
| Min-height | `44px` | WCAG 2.5.5 non-negotiable | |

**Ink strip stability check:** Whether the ink-strip sections visibly change between light and dark views of mockup `117:103` — EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
---

## Icons (D-06 Closed Set — calendar + mail)

**Source:** Figma icon child nodes within CTA Button set node `39:31`
**Threat T-01 rule:** Record ONLY `viewBox` + `<path>`, `<circle>`, `<rect>` geometry with `stroke`/`fill`/`stroke-width` attributes. No `<script>`, event handlers, or external `href`/`xlink:href`.

### Calendar Icon

| Property | Value | Source Node | Notes |
|---|---|---|---|
| viewBox | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 — requires `get_design_context` | |
| Path geometry | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 — requires `get_design_context` | |
| stroke/fill | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 | |
| stroke-width | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 | |

Threat T-01 check: Cannot perform check without extraction. When extracted, verify no `<script>`, `on*=`, `<foreignObject>`, or external `href`. If present, FLAG the node.

### Mail Icon

| Property | Value | Source Node | Notes |
|---|---|---|---|
| viewBox | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 — requires `get_design_context` | |
| Path geometry | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 — requires `get_design_context` | |
| stroke/fill | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 | |
| stroke-width | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | Child of 39:31 | |

---

## Eyebrow (COMP-02, node: find on `36:5`)

| Property | On-Light Value | On-Dark Value | Source Node | Notes |
|---|---|---|---|---|
| Type class | `.wl-label-eyebrow` (13px / 600 / 0.22em tracking) | Same | global.css line 693 | EXTRACTED |
| Text color (on-light) | `var(--color-wl-accent)` (`#0E7078` light / `#4FB3B8` dark) | — | 35-UI-SPEC.md + global.css | EXTRACTED — flippable token |
| Text color (on-dark) | — | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 117:103 dark mockup — D-10 non-flippable | |
| Background | transparent | transparent | Inferred | |
| Gap below eyebrow | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | — | Requires 36:5 Eyebrow node inspection | |
| Contrast (on-light, light mode) | `#0E7078` on `#F6FBFA` = 4.78:1 — AA PASS | — | scripts/check-contrast.mjs existing pair | EXTRACTED |
| Contrast (on-dark) | — | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | — | |

**On-dark note:** All on-dark values are **non-flippable literals** sourced from dark mockup `117:103`. These must NOT use `var(--color-wl-accent)` which flips to `#4FB3B8` in dark mode; on an always-dark ink surface that may or may not pass AA. Extract literal from 117:103.

---

## Tag (COMP-02, node: find on `36:5`)

**Hint from 33-FIGMA-EXTRACTION.md:** "Tag pill (AI card): Hanken Bold ~12px equiv (9.6px at mobile), tracking 9%, `#0E7078`" — observed in mockup `62:154` (Phase 35 scope). This is a landing-page tag observation but likely matches the Tag component on `36:5`.

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Tag node | Hint: may be sea-glass or paper-based surface |
| Text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Tag node | Hint from 33 extraction: `#0E7078` (accent) observed in landing |
| Padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Tag node | |
| Border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Tag node | 33-FIGMA-EXTRACTION.md bonus: `--radius-pill: 999` observed on 36:5 — likely candidate |
| Border | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Tag node | |
| Type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Tag node | Hint from 33: ~12px Hanken Bold; closest is `.wl-text-note` (13px/400) — needs verification |

**33-extraction hint:** The `--radius-pill: 999` bonus variable was observed on `36:5` — Tag is likely a pill shape. Not confirmed for this specific Tag component; EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
---

## Callout (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Callout node | |
| Text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Callout node | |
| Padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Callout node | |
| Border / left-accent | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Callout node | |
| Border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Callout node | |
| Type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Callout node | Candidate: `.wl-text-body` (16px/400/1.6) |

---

## LinkCard (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 LinkCard node | |
| Title text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 LinkCard node | |
| Description text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 LinkCard node | |
| Padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 LinkCard node | |
| Border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 LinkCard node | 33 bonus: `--radius-card: 18` — may apply |
| Border | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 LinkCard node | |
| Hover state | NO HOVER STATES IN FIGMA — Claude discretion per UI-SPEC, flag at fidelity gate | 36:5 LinkCard node | Fallback: `hover:text-wl-accent` per chrome convention |
| Arrow/chevron SVG | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 LinkCard child node | If present; threat T-01 applies |

---

## Breadcrumb (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Separator character/SVG | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Breadcrumb node | |
| Item type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Breadcrumb node | Candidate: `.wl-text-note` (13px/400) |
| Link color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Breadcrumb node | |
| Current-page color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Breadcrumb node | |
| Item gap | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Breadcrumb node | |

---

## Step (COMP-02, node: find on `36:5`)

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Number circle size | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Step node | |
| Number circle fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Step node | |
| Number circle text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Step node | |
| Number type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Step node | |
| Body type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Step node | Candidate: `.wl-text-body` or `.wl-text-body-large` |
| Gap between circle and prose | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 Step node | |

---

## ServiceCard (COMP-02, node: find on `36:5` — D-01)

### Default Variant

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | |
| Heading text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | |
| Body text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | |
| Heading type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | Candidate: `.wl-heading-h3` (21px/400 Fraunces) |
| Body type class | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | Candidate: `.wl-text-body` (16px/400) |
| Padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | |
| Border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | 33 bonus: `--radius-card: 18` — likely candidate |
| Border | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard node | |

### Highlight Variant

| Property | Value | Source Node | Notes |
|---|---|---|---|
| Fill color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard highlight variant | |
| Heading text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard highlight variant | |
| Body text color | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard highlight variant | |
| Highlight treatment | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard highlight variant | Border? Fill change? Accent icon? |
| Padding | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard highlight variant | |
| Border-radius | EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) | 36:5 ServiceCard highlight variant | |

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

All ghost-on-dark CTAButton and Eyebrow onDark values are EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
1. Must be non-flippable literals (hex or `:root`-scoped CSS custom property)
2. Must NOT use `var(--color-wl-on-ink)` (flips to `#12333B` in dark mode — Pitfall 2)
3. Must be labelled "non-flippable literal — source 117:103" in code comments
4. Must be recorded in `scripts/check-contrast.mjs` PAIRS matrix (commented out as EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
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

The figma-desktop MCP server (`mcp__figma-desktop__*`) was unavailable in the current worktree execution environment. Prior phases (33, 34) successfully used this server to extract the values marked EXTRACTED above. All values requiring fresh extraction from nodes `36:5` and `117:103` are EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
**Resolution path for EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
**Unblocking for Wave 2:** The EXTRACTED ✓ — see §Fresh MCP Extraction (2026-07-15) 
---

## Fresh MCP Extraction (2026-07-15, claude.ai Figma server, main orchestrator session)

> The figma-desktop MCP had the wrong file active during Wave 1 worktree execution; the orchestrator
> re-ran extraction inline via the claude.ai Figma MCP server against file `1tg8wIPcvOVC5tPZ8pkGO2`.
> **This section is AUTHORITATIVE for every row marked "EXTRACTED ✓ — see §Fresh MCP Extraction" above.**
> All values below are verbatim from Figma nodes; nothing is invented.

### CTA Button set `39:31` — full variant geometry

Designer description (Figma): *"CTA button. Solid = primary (shadow), Ghost = secondary on light, Ghost on dark = agencies strip, Small = header nav. Radius 13/10 intentionally local (not a token)."*

| Property | Solid `39:15` | Ghost `39:22` | Ghost-on-dark `39:27` | Small `39:30` |
|---|---|---|---|---|
| Background | `var(--color-wl-ink)` (#12333B) | `rgba(255,255,255,0.4)` literal | transparent | `var(--color-wl-ink)` |
| Border | none | `1.5px solid var(--color-wl-accent)` (#0E7078) | `1.5px solid rgba(255,255,255,0.35)` literal, non-flippable (D-10) | none |
| Padding | `15px 27px` | `15px 27px` | `15px 27px` | `9px 17px` |
| Border-radius | `13px` (local, not token) | `13px` | `13px` | `10px` |
| Icon-to-label gap | `9px` | `9px` | n/a (no icon child in Figma) | n/a (no icon child in Figma) |
| Label type | HG SemiBold **16px** → `.wl-label-button` | HG SemiBold 16px → `.wl-label-button` | HG SemiBold 16px → `.wl-label-button` | HG SemiBold **14px** → `.wl-cta-label` |
| Label color | `#EAF6F3` via `var(--color-wl-on-ink)` | `var(--color-wl-ink)` (#12333B) | `#EAF6F3` **literal, non-flippable (D-10)** | `#EAF6F3` via `var(--color-wl-on-ink)` |
| Shadow | `0 12px 28px -14px rgba(18,51,59,0.75)` ("Shadow / CTA", solid only) | none | none | none |
| Icon (Figma default) | Calendar 17px, stroke #EAF6F3 → `currentColor` | Calendar 17px, stroke #12333B → `currentColor` | none | none |
| Min-height | 44px (WCAG 2.5.5, ours) | 44px | 44px | 44px |

**SOLID_TYPE_CLASS resolved:** Solid/Ghost/Ghost-on-dark labels are 16px/600 → `.wl-label-button`. Small is 14px/600 → `.wl-cta-label`. (Supersedes the "assumed shared `.wl-cta-label`" placeholder above.)
**Icon slots vs Figma:** Figma only bakes an icon into Solid/Ghost; the `icon` prop remains available on all variants per COMP-01 — rendering an icon on Small/Ghost-on-dark is a consumer choice, gap 9px applies when present.
**SiteHeader retrofit note:** header CTA = Small variant (bg ink, 9px/17px, radius 10, `.wl-cta-label`, no icon) — matches the shipped inline CTA exactly, pixel-neutral swap confirmed feasible.

### Icons (closed set, D-06) — geometry verified clean (T-01: paths only, no scripts/handlers/hrefs)

| Icon | Node | viewBox | stroke-width | path `d` |
|---|---|---|---|---|
| Calendar | `39:4` | `0 0 17 17` | 2 | `M5.66667 1.41667V3.54167M11.3333 1.41667V3.54167M2.125 6.375H14.875M3.54167 3.54167H13.4583C13.6462 3.54167 13.8264 3.61629 13.9592 3.74913C14.092 3.88197 14.1667 4.06214 14.1667 4.25V13.4583C14.1667 13.6462 14.092 13.8264 13.9592 13.9592C13.8264 14.092 13.6462 14.1667 13.4583 14.1667H3.54167C3.3538 14.1667 3.17364 14.092 3.0408 13.9592C2.90796 13.8264 2.83333 13.6462 2.83333 13.4583V4.25C2.83333 4.06214 2.90796 3.88197 3.0408 3.74913C3.17364 3.61629 3.3538 3.54167 3.54167 3.54167Z` |
| Mail | `39:7` | `0 0 17 17` | 2 | `M2.125 4.95833L8.5 9.20833L14.875 4.95833M2.125 4.25H14.875V12.75H2.125V4.25Z` |
| Chevron | `39:10` | `0 0 16 16` | 1.33333 | `M4 6L8 10L12 6` |

All: `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, stroke bound to `currentColor` in our components (Figma uses contextual literals #EAF6F3 / #12333B / #0E7078). Chevron is used by Phase 36 Project Card — extracted now for completeness, not built into a Phase 35 component.

### Eyebrow `39:41`

Designer description: *"Uppercase section label with 34px dash. On dark uses accent-soft (agencies strip). Letter-spacing 22%."*

| Property | On-light `39:36` | On-dark `39:40` |
|---|---|---|
| Layout | flex row, `gap: 13px`, items-center | same |
| Dash | `34px × 1px`, `var(--color-wl-accent)` | `34px × 1px`, `#5AA9A5` **literal, non-flippable (D-10)** |
| Text | HG SemiBold 13px, tracking 2.86px (22%) → `.wl-label-eyebrow` | same class |
| Text color | `var(--color-wl-accent)` (flippable — on-light sits on flipping surfaces) | `#5AA9A5` **literal, non-flippable (D-10)** |

### Tag `39:44`

Designer description: *"Project tag pill. Fill = accent @8%, border = line token, radius bound to radius/pill."*

| Property | Value |
|---|---|
| Fill | accent @8% = `rgba(14,112,120,0.08)` (the React export shows the var ref; the description is authoritative on the 8% opacity) |
| Border | `1px solid var(--color-wl-line)` |
| Padding | `4px 10px` |
| Border-radius | `999px` (radius/pill) |
| Text | HG Regular **12px**, `var(--color-wl-sub)` (12px is Figma-extracted; not part of the 13-style ramp — local size like footer values) |

### Callout `99:26`

Designer description: *"Aside/callout card with a full-height accent left border (CSS border-left equivalent: absolute bar + clipsContent so the radius trims it)."*

| Property | Value |
|---|---|
| Background | `#FFFFFF` literal (cards are white, not paper — matches ServiceCard/LinkCard) |
| Border | `1px solid var(--color-wl-line)` |
| Border-radius | `14px` |
| Padding | `21px 26px` |
| Accent bar | `3px` wide, full height, left edge, `var(--color-wl-accent)` — implement as `border-left: 3px solid` or clipped absolute bar |
| Text | HG Regular 16px / 1.6 → `.wl-text-body`, `var(--color-wl-sub)` |
| Reference width | 700px (fluid in use) |

### LinkCard `99:29`

Designer description: *"Cross-link mini card ('Often paired with' / area service strips): outcome, title, body, and a go-link. No icon by design."*

| Property | Value |
|---|---|
| Background | `#FFFFFF` literal |
| Border | `1px solid var(--color-wl-line)` |
| Border-radius | `16px` |
| Padding | `24px 26px` |
| Shadow | "Shadow / Card" = `0 20px 40px -30px rgba(18,51,59,0.5)` (#12333B80; the React export's drop-shadow is a lossy filter conversion — box-shadow with spread is authoritative) |
| Stack | outcome (Fraunces Italic 16px accent → `.wl-accent-outcome`) · 8px · title (Fraunces 21px ink → `.wl-heading-h3`) · 8px · body (HG 16px/1.6 sub → `.wl-text-body`) · 11px · go-link (HG SemiBold **15px** accent, arrow `→` as text — NO icon/SVG by design) |
| Reference width | 360px |

### Breadcrumb `100:14`

Designer description: *"Interior-page breadcrumb. One text prop; separators use ' / '. Color #4C6A70 (matches the site's crumb/trust tint — not a token in code either)."*

| Property | Value |
|---|---|
| Text | HG Regular **14px**, color `#4C6A70` literal (designer-confirmed non-token) |
| Separator | ` / ` text (with spaces), same color — no SVG |
| A11y structure | `<nav aria-label="Breadcrumb">` + `<ol>` + `aria-current="page"` on last item (our WAI-ARIA layer; Figma is a single text node) |

### ServiceCard `40:32`

Designer description: *"What-I-build card. Highlight = stronger border + kicker (the automations card). Icon tile is baked per instance — detach-free icon swap not needed at this scale."*

| Property | Default `40:15` | Highlight `40:31` |
|---|---|---|
| Background | `#FFFFFF` literal | same |
| Border | `1px solid var(--color-wl-line)` | `1px solid var(--color-wl-accent)` |
| Border-radius | `18px` (radius/card) | same |
| Padding | `32px 27px` | same |
| Shadow | "Shadow / Card" `0 20px 40px -30px rgba(18,51,59,0.5)` | same (React export's drop-shadow is lossy; Shadow/Card authoritative) |
| Kicker pill | — | absolute, `top: -13px; left: 26px`; bg `#FFFFFF`; `1px solid var(--color-wl-accent)`; radius 999px; padding `5px 13px`; HG **Bold 11px**, tracking 1.54px (14%), `var(--color-wl-accent)`, uppercase copy per instance (e.g. "ALL THE HELP, NONE OF THE HYPE") |
| Icon tile | `42×42px`, bg `var(--color-wl-accent)`, radius `12px`, inner icon `22×22` centered (10px offset) — slot/prop per instance | same |
| Stack | icon tile · 18px · benefit (Fraunces Italic 16px accent → `.wl-accent-outcome`) · 10px · title (Fraunces 21px ink → `.wl-heading-h3`) · 8px · body (HG 16px/1.6 sub → `.wl-text-body`) | same |
| Reference width | 359px (fluid in use) | same |

### Step `40:39`

Designer description: *"How-it-works step: big Fraunces numeral in accent-soft, title, body."*

| Property | Value |
|---|---|
| Numeral | Fraunces Regular **38px**, `var(--color-wl-accent-soft)` (#5AA9A5), `line-height: 1` — a bare numeral, **NOT a circle** (supersedes the "number circle" guesses above) |
| Stack | numeral · 11px · title (Fraunces 21px ink → `.wl-heading-h3`) · 8px · body (HG 16px/1.6 sub → `.wl-text-body`) |
| Reference width | 352px |
| ⚠ Contrast note | accent-soft #5AA9A5 on paper = 2.63:1 — below the 3:1 large-text floor. The numeral is decorative order-marking duplicated by `<ol>` semantics (render `aria-hidden="true"` inside `li`); pair recorded as DECORATIVE in check-contrast.mjs with justification. **Surface at the fidelity gate for Joel** — remedy (if wanted) is a Figma decision, not invented here. |

### D-10 dark-mode evidence (`117:103` full-page screenshot, 2026-07-15)

The "FOR AGENCIES" strip ("Need reliable overflow dev?") remains a dark ink surface in the dark mockup; the ghost-on-dark CTA and on-dark eyebrow render with the same near-white/soft-accent treatment as in the light mockup. **Non-flippable literals confirmed correct for all on-dark variants** (footer precedent, D-10). Fidelity gate re-verifies visually.

### New non-token local values introduced (footer-precedent registry)

`#FFFFFF` (card fill) · `#4C6A70` (breadcrumb) · `rgba(255,255,255,0.4)` (ghost fill) · `rgba(255,255,255,0.35)` (ghost-on-dark border) · `#EAF6F3` (on-dark label literal) · `#5AA9A5` (on-dark eyebrow literal) · Shadow/CTA `0 12px 28px -14px rgba(18,51,59,0.75)` · Shadow/Card `0 20px 40px -30px rgba(18,51,59,0.5)` · local radii 13/10 (CTA), 14 (Callout), 16 (LinkCard), 18 (card), 12 (icon tile), 999 (pills) · local text sizes 12px (Tag), 14px (Breadcrumb), 15px (go-link), 11px (kicker), 38px (Step numeral)

### Dark-mode card panel (dark mockup `117:159` "Card / Web")

White-card components flip in dark mode via a **local card token pair** (footer-precedent local values, semantic-flip mechanism per Phase 33 D-01):

| Property | Light | Dark (from 117:159) |
|---|---|---|
| Card fill | `#FFFFFF` | `#12333B` (local panel value — coincidentally the light ink hex; NOT `var(--color-wl-ink)`) |
| Card shadow | Shadow/Card `0 20px 40px -30px rgba(18,51,59,0.5)` | `0 20px 40px -30px rgba(0,0,0,0.8)` |
| ServiceCard icon tile | solid `var(--color-wl-accent)` | `rgba(90,169,165,0.14)` (accent-soft @14%) |
| Text on card | flippable tokens (ink/sub/accent) | same tokens — dark values verified AA on `#12333B` panel (12.14 / 7.59 / 5.42) |

Suggested implementation: `--wl-card-bg`, `--wl-card-shadow`, `--wl-card-icon-tile-bg` local custom properties defined in `:root` + `.dark` (like `--wl-footer-*`).
