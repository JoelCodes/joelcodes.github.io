# Phase 25: Section + Compound Components - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-01
**Phase:** 25-section-compound-components
**Areas discussed:** Header content & affordances, Header CTA variant choice, Footer brand glyph strategy, Compound/Card source-coverage & slot signature

---

## Gray Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Header content & affordances | Crito vs Joel nav labels; ship/strip search+chevron+hamburger; mobile-menu policy under PAGE-09 | ✓ |
| Header CTA variant choice | Default green vs add Secondary outline (OPEN-24-11) | ✓ |
| Footer brand glyph strategy | Joel-brand (Instagram + Substack) via lucide probe vs Crito-literal LinkedIn + Twitter | ✓ |
| Compound/Card source-coverage & slot signature | Fully-inferred Card with OPEN-25 flag, raster-probe inference, or defer to Phase 28 | ✓ |

**User's choice:** All 4 selected.

---

## Header content & affordances

### Header nav links

| Option | Description | Selected |
|--------|-------------|----------|
| Joel's v1.3 links (fixed text) | Hardcode 'Blog', 'Projects', 'FAQ', 'Contact' as Pencil text nodes. Breaks source-wins. | |
| Crito-source labels (fixed text) | Read Home Page Menu bar `ujMLJ` source via batch_get; ship literal labels. Strict source-wins. | ✓ |
| Repeating slot for nav items | Header exposes nav-items container slot; consumers populate. Most flexible. | |
| You decide | Pick during plan 25-01 audit | |

**User's choice:** Crito-source labels (fixed text).
**Notes:** Establishes strict source-wins for component-level content; Joel's link override happens at Phase 31 Homepage instance time.

### Crito Menu bar affordances (search / chevron-down / hamburger)

| Option | Description | Selected |
|--------|-------------|----------|
| Ship all three (strict source-wins) | All three affordances ship as Primitive/Icon instances. | ✓ |
| Strip all three (Joel-aligned) | Drop affordances with no Joel-side analog; OPEN-25 source-deviation flag. | |
| Ship search + chevron, strip hamburger | Hybrid — desktop-aligned, drops hamburger per PAGE-09. | |
| You decide | Pick during batch_get audit | |

**User's choice:** Ship all three (strict source-wins).
**Notes:** Hamburger ships even under PAGE-09 (desktop-only) because v2.0 is visual-fidelity scoped, not behavior-scoped. Initial multi-select answer was contradictory ('all four selected' including 'Strip all three'); clarified via single-select follow-up.

### Logo treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Crito-source 'Crito' logo (literal text/SVG node) | Strict source-wins; Joel swap at Phase 31. | |
| Slot for logo (consumer fills) | Header carries a logo-shaped slot; consumers populate at instance time. Requires slot-mechanics probe. | ✓ |
| Joel-brand logo (text 'Joel Shinness') | Drop Crito brand at component level; breaks source-wins. | |
| You decide | Pick during plan 25-01 source audit | |

**User's choice:** Slot for logo (consumer fills).
**Notes:** Establishes slot-mechanics pattern that Section/Footer link columns and Compound/Card will reuse later.

### Header width strategy

| Option | Description | Selected |
|--------|-------------|----------|
| fill_container with internal max-width content frame | Full-bleed background, content capped at max-width. Pencil Pattern B. | |
| Fixed-width matching Crito source (1440 or whatever ujMLJ depicts) | Easiest to audit against source. | ✓ |
| You decide based on source audit | Plan 25-01's batch_get reveals layout properties | |

**User's choice:** Fixed-width matching Crito source.
**Notes:** Source-audit-driven; matches per-page-frame instance pattern.

---

## Header CTA variant choice

### CTA placement and Secondary Button addition

| Option | Description | Selected |
|--------|-------------|----------|
| Single Default green CTA | Phase 24's Primitive/Button/Default only; OPEN-24-11 carries forward. | |
| Two CTAs: Default + Secondary outline (resolves OPEN-24-11 this phase) | Plan 25-01 adds Secondary from `mkw8g` source. Matches Crito Hero pairing. | ✓ |
| Audit Crito Menu bar source first; let source dictate | Source-wins via batch_get count | |
| You decide | Pick during audit | |

**User's choice:** Two CTAs: Default + Secondary outline (resolves OPEN-24-11 this phase).
**Notes:** Resolves OPEN-24-11 inside Phase 25 rather than deferring to a later phase.

### Where Secondary Button lives

| Option | Description | Selected |
|--------|-------------|----------|
| Add as a sibling under `_Components / Primitives` (Phase-24-late-addition) | Separate `Primitive / Button / Secondary` component. | |
| Add as a new variant cell inside existing `Primitive / Button` component | Variant axis (`purpose`); discoverable in Pencil's picker. | ✓ |
| Skip Secondary entirely — single CTA in Header | Defers OPEN-24-11 to a later phase. | |
| You decide based on Plan 24-02 schema results + source audit | Pick the cleanest Pencil pattern | |

**User's choice:** Add as a new variant cell inside existing Primitive/Button.
**Notes:** Fallback to sibling component if variant-axis-add restructures Default's existing Hover/Focus cells.

### CTA icon usage (testing OPEN-24-06 by actual use)

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — both CTAs use trailing arrow-right | Real exercise of Primitive/Button's iconTrailing slot. | ✓ |
| No — label-only buttons | Defers OPEN-24-06 verification. | |
| Yes for Default, no for Secondary | Asymmetric — source-derived. | |
| You decide based on source audit | Plan 25-01 batch_get answers | |

**User's choice:** Yes — both CTAs use trailing arrow-right.
**Notes:** Production-shaped use is stronger than synthetic probe for verifying OPEN-24-06.

### Fallback if variant-axis add fails

| Option | Description | Selected |
|--------|-------------|----------|
| Fall back to sibling `Primitive / Button / Secondary` component | Safer path if probe finds restructure required. | ✓ |
| Halt and surface to user before changing structure | Conservative; no auto-restructure. | |
| Probe first, then I'll decide | Plan 25-01 documents probe results, user decides at that point | |

**User's choice:** Fall back to sibling `Primitive / Button / Secondary` component.
**Notes:** Both paths resolve OPEN-24-11; sibling is the safer fallback.

---

## Footer brand glyph strategy

### Brand glyph path

| Option | Description | Selected |
|--------|-------------|----------|
| Joel-brand: Instagram + Substack via lucide (probe-then-decide) | Pattern A test first | ✓ |
| Joel-brand via library swap to simple-icons (or feather) | Mixed-library Pattern A | |
| Joel-brand via Pattern B atomic-glyph fallback (Instagram + Substack as custom atoms) | Pure fallback for both | |
| Crito-literal: LinkedIn + Twitter, defer Joel-brand swap to Phase 31 | Strict source-wins on glyphs | |

**User's choice:** Joel-brand: Instagram + Substack via lucide (probe-then-decide).
**Notes:** Resolves OPEN-24-13 at the Footer-component level rather than deferring brand-glyph work.

### Footer typography

| Option | Description | Selected |
|--------|-------------|----------|
| Use Chivo (Phase 23 shipped Chivo as a primitive) | Strict source-wins; Chivo earns its keep. | ✓ |
| Use Inter (drop Chivo from footer, align with body family) | Slight drift from Crito; consistent with Joel's site-wide Inter. | |
| You decide based on source audit + footer hierarchy needs | Plan 25-02 audits and picks | |

**User's choice:** Use Chivo.
**Notes:** Confirms Chivo primitive token is load-bearing.

### Footer link structure

| Option | Description | Selected |
|--------|-------------|----------|
| Crito-source columns (read Footer source via batch_get and ship literally) | Strict source-wins. | ✓ |
| Joel-aligned columns (mirror v1.3 footer: Blog/Projects/FAQ/Contact) | Cleaner Phase 31 result; breaks source-wins. | |
| Slot for link columns (consumer fills) | Most flexible; matches Header logo-slot precedent. | |
| You decide based on source audit + Header consistency | Match Header pattern | |

**User's choice:** Crito-source columns (read Footer source via batch_get and ship literally).
**Notes:** Consistent with Header decision D-38; Joel-brand label override happens at Phase 31 Homepage instance time.

### Substack fallback when lucide is missing it

| Option | Description | Selected |
|--------|-------------|----------|
| Swap library prop to `simple-icons` for Substack only | Mixed-library Pattern A; tests Pencil per-glyph library values. | |
| Pattern B atomic-glyph fallback for Substack only (hand-authored SVG) | Pure fallback; works regardless of Pencil library support. | ✓ |
| Halt and surface options to user with probe results | Most conservative | |
| You decide based on probe | Pick during plan | |

**User's choice:** Pattern B atomic-glyph fallback for Substack only.
**Notes:** Predictable; matches D-25 Pattern B fallback already established in Phase 24.

---

## Compound/Card source-coverage & slot signature

### Card source-coverage policy

| Option | Description | Selected |
|--------|-------------|----------|
| Ship fully-inferred Card now with OPEN-25 source-coverage flag | Badge OPEN-24-12 precedent. | |
| Probe Crito raster + `design/images/` for visual structure, then ship best-inference Card | Raster-derived structure; stronger than fully-inferred. | ✓ |
| Defer Card to Phase 28 (first per-page consumer with real source needs) | Conservative; COMP-07 partial-satisfaction. | |
| You decide | Pick during audit | |

**User's choice:** Probe Crito raster + `design/images/` for visual structure, then ship best-inference Card.
**Notes:** Stronger provenance than Badge's fully-inferred path. OPEN-25 flag still applies for source-coverage transparency.

### Slot signature

| Option | Description | Selected |
|--------|-------------|----------|
| 4 slots: image, title, body, footer-actions (per ROADMAP Plan 25-03 wording) | Generic-enough for Project/Blog/Service. | ✓ |
| 5-6 slots: image, eyebrow, title, body, meta-row, actions (finer-grained) | More authoring work; more empty-slot collapse cases. | |
| Source-derived count from raster audit (Plan 25-03 first task) | Raster-driven slot count | |
| You decide based on Pencil slot mechanics + consumer needs | Pick during plan | |

**User's choice:** 4 slots: image, title, body, footer-actions.
**Notes:** Matches ROADMAP literal; resists premature slot subdivision.

### Slot declaration mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| Pencil-native slot prop (typed if Pencil supports, untyped otherwise) | Discoverable in Pencil's picker. | ✓ |
| Sibling Pencil note declaring slot signature (D-37 stub precedent) | Lower-tech, fully reliable. | |
| Both — Pencil-native slot prop + sibling documentation note | Belt-and-suspenders. | (effectively also chosen — see D-52) |
| You decide based on probe | Pick during plan | |

**User's choice:** Pencil-native slot prop (typed if Pencil supports, untyped fallback).
**Notes:** D-52 also includes sibling note for human-readable coverage — effectively both mechanisms ship.

### Empty-slot default behavior

| Option | Description | Selected |
|--------|-------------|----------|
| All slots `enabled: true` with minimal placeholder content | Card preview shows complete-looking structure; consumers replace at instance time. | ✓ |
| All slots `enabled: false` by default, consumer enables what they use | Bare frame; matches Plan 24-02 Button trailing-icon convention. | |
| Image + title `enabled: true`, body + footer-actions `enabled: false` | Hybrid — universal slots visible, optional slots collapsed. | |
| You decide based on OPEN-24-06 resolution + visual library legibility | Defer to outcome of Header CTA icon-slot work | |

**User's choice:** All slots `enabled: true` with minimal placeholder content.
**Notes:** Trade library-clarity over consumer-flexibility because this is a design-tool deliverable.

---

## Claude's Discretion

- **Auto-layout vs absolute positioning at the Section level** — pick per source-audit + LAYOUT-01/02 carry-forward.
- **Variant Evidence row granularity for Section components** — match per-primitive granularity choices Plan 24-02/03 made.
- **Card hover/focus state policy** — default NO Card-level states; OPEN-25 flag if downstream consumer needs.
- **Whether to add `color-semantic-text-on-cta-primary` alias** — Plan 25-01 audits whether the white-on-green CTA label needs the alias.
- **`snapshot_layout({ problemsOnly: true })` per plan-close** — default yes, with Phase 24 text-clipping-quirk caveat documented.

## Deferred Ideas

- **Joel-brand wordmark / logo asset** — slot established at component level; real asset waits for design work.
- **Section/Header sticky/non-sticky positioning intent** — runtime behavior, code-milestone concern.
- **Search affordance behavior, chevron-down dropdown content, hamburger mobile-toggle behavior** — visual fidelity ships now; behavior decisions deferred.
- **Card hover/focus/disabled states beyond primitive-layer button states** — wait for concrete consumer demand (Phase 28+).
- **`color-semantic-text-on-cta-primary` semantic alias** — Plan 25-01 may add; otherwise stays deferred.
- **`type-semantic-footer-*` alias family** — Plan 25-02 picks; may stay deferred.
- **Per-page Section/Footer Joel-brand-vs-Crito-brand swap (label content)** — Phase 31 Homepage owns label overrides.
- **`Compound / Card` as a multi-variant matrix** — explicitly rejected by COMP-07; hard constraint not a deferral.
