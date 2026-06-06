# Phase 26: FAQ + 404 Reconstruction (Calibration Workflow Established) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-06
**Phase:** 26-faq-404-reconstruction-calibration-workflow-established
**Areas discussed:** Source-of-truth for joel-only pages, Calibration artifact when there's no Crito raster, Calibration protocol scope (Plan 26-03), Prose token surface (OPEN-23-11), Page-frame creation mechanics, Header/Footer/inline-CTA factoring, 404 microcopy approval gate, Plan task structure

---

## Source-of-truth for joel-only pages

### Q1 — Reference strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Crito vocabulary, fresh design | Design FAQ + 404 fresh using only Phase 23–25 vocab. v1.3 informs CONTENT not visual style. Stays consistent with rest of reconstructed .pen. | ✓ |
| Mirror v1.3 visual style | Port v1.3 neobrutalist look (yellow shadows, Bricolage Grotesque, hard borders) into Crito-vocab tokens. Risk: two visual languages in one file. | |
| Hybrid — v1.3 structure, Crito surfacing | Keep v1.3 content structure but render visuals using Crito tokens. Fallback option. | |

### Q2 — FAQ visual shape

| Option | Description | Selected |
|--------|-------------|----------|
| Stacked Q+A pairs, no accordion | Visible Q+A pairs, no collapse. Static design tool aligns with static reading. Code milestone chooses interaction. | ✓ |
| Accordion with mixed states (1 open, rest closed) | Shows both states in one frame; implies a default-open item (runtime bleeding into design). | |
| Reuse Compound/Card as accordion row | Maximum reuse but Card was designed with image slot Q+A doesn't need. | |

### Q3 — 404 design intent

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal + helpful nav | Big '404' headline + short message + nav-back. Easy. Forgettable. | |
| Brand-voice 404 with microcopy moment | Conversational headline. Microcopy is new content. | ✓ |
| Stub-only with OPEN flag for content | Layout placeholders + STUB label. Defer all content. | |

### Q4 — FAQ CTA section inclusion

| Option | Description | Selected |
|--------|-------------|----------|
| Include CTA section | "Still have questions?" at bottom. New microcopy nuance. | ✓ |
| Skip — stay minimal like v1.3 | FAQ stays as H1 + Q+A list. Diverges from ROADMAP. | |
| Stub the CTA section, defer content | Include layout, placeholder text, STUB label. | |

**Notes:** Q3 picked "brand-voice" but Q's in later area (Microcopy approval gate) re-routed the actual microcopy to STUB treatment per D-81. Layout intent honored; wording deferred.

---

## Calibration artifact when there's no Crito raster

### Q1 — Pen-frame paired against what?

| Option | Description | Selected |
|--------|-------------|----------|
| Token-usage check vs `_Tokens & Foundations` | Pairs pen-frame screenshot with token-frame slice. Single artifact, reusable script. | ✓ |
| Design-intent note instead of visual pair | Written intent + rendered pen-frame, no image pair. | |
| Use Crito Home Page Hero as vocab reference | Indirect proxy via the only editable Crito source. | |

### Q2 — Fidelity label semantics for joel-only sections

| Option | Description | Selected |
|--------|-------------|----------|
| Redefine semantics, keep same labels | EXACT/APPROXIMATE/STUB redefined for token-usage axis. Both interpretations documented in protocol. | ✓ |
| Add 4th label — FRESH | Explicit but introduces new concept just for two pages. | |
| Drop the labels for joel-only pages | Use token-count assertion. VALID-01 still expects labels. | |

### Q3 — Artifact location + naming

| Option | Description | Selected |
|--------|-------------|----------|
| Same directory, type-prefixed filename | `--token-usage` vs `--side-by-side` suffix. One discovery surface. | ✓ |
| Separate subdirectory for joel-only | Crisp partition. More structure for small file count. | |
| Single directory, no naming convention | Lowest friction. Hard to scan visually. | |

### Q4 — Spot-check scope

| Option | Description | Selected |
|--------|-------------|----------|
| User reviews rendered pen-frame + reads token list | Lightweight. Single AskUserQuestion per phase-close. | ✓ |
| User reviews rendered pen-frame + design-intent note | Adds written paragraph; more reading. | |
| User reviews the rendered pen-frame only | Trusts agent token discipline. Risk: rubber-stamp. | |

---

## Calibration protocol scope (Plan 26-03)

### Q1 — One protocol or two

| Option | Description | Selected |
|--------|-------------|----------|
| One unified protocol with a branch | Top section: branch matrix. Single entry point. Branch logic explicit. | ✓ |
| Two separate documents | Each is shorter; read both per phase to know which applies. | |
| Unified, no branching — token-usage as universal axis | Apply token-usage to all pages; raster pairing becomes secondary. Changes shape for phases 27–31. | |

### Q2 — When does it get written

| Option | Description | Selected |
|--------|-------------|----------|
| After FAQ + 404 — codify-what-worked | Plans 26-01 → 26-02 → 26-03. Protocol reflects practice. Matches ROADMAP plan order. | ✓ |
| Before FAQ + 404 — top-down | Risk: protocol overfits assumptions and needs rewrites after first use. | |
| Between FAQ and 404 — test-then-codify | FAQ is test case; protocol codifies; 404 applies. | |

### Q3 — Required contents

| Option | Description | Selected |
|--------|-------------|----------|
| Branch matrix + per-step script + label definitions + OPEN-flag template + PAGE-11 rule + desktop-only | Concrete, action-oriented. Strongest minimum. | ✓ |
| Minimal — decision tree + section anchors | Short doc; relies on inventory + summaries. | |
| Full reference — includes worked examples | Most useful; hard to maintain when practice diverges. | |

### Q4 — Doc home

| Option | Description | Selected |
|--------|-------------|----------|
| Separate doc, cross-referenced | `.planning/research/CALIBRATION-PROTOCOL.md` per ROADMAP; PEN-INVENTORY anchors to it. | ✓ |
| Append section inside PEN-INVENTORY.md | One doc to read; protocol gets buried. | |
| Top-of-canvas Pencil note in Crito.pen | Discoverable in .pen; markdown in Pencil notes is awkward. | |

---

## Prose token surface (OPEN-23-11)

### Q1 — Scope of OPEN-23-11 resolution this phase

| Option | Description | Selected |
|--------|-------------|----------|
| Add only what FAQ actually uses | Zero new prose tokens; re-point prose-link + prose-list to Phase 28. Pitfall 1 discipline. | ✓ |
| Pre-emptively add prose-link + prose-list | Honors OPEN-23-11 wording; risk Pitfall 1 violation. | |
| Add prose-link only (defer prose-list + inline-code) | Halfway position; driven by Phase 26 actual use. | |

### Q2 — prose-paragraph verification (existing provisional tokens)

| Option | Description | Selected |
|--------|-------------|----------|
| Consume as-is, flag if visibly wrong | Calibration spot-check is the verification. Avoids unnecessary token churn. | ✓ |
| Consult Crito .fig now, refine values | Resolves provisional flag now; tokens may move under existing consumers. | |
| Leave provisional flag, decide in Phase 28 | Defer verification to higher-confidence consumer. | |

### Q3 — heading-2 token for FAQ Q items / 404 message body

| Option | Description | Selected |
|--------|-------------|----------|
| Add `type-semantic-heading-2` token, source-derived | One alias derived from Crito .fig consult. Real consumers. Pitfall 1 satisfied. | ✓ |
| Reuse heading-1 with override | Overrides are raw values; violates COMP-09. | |
| Use body + weight-700 + larger primitive size | Pitfall 1 violation; introduces Inter-700-large that Crito doesn't depict. | |

### Q4 — inline-code

| Option | Description | Selected |
|--------|-------------|----------|
| Leave inline-code to Phase 28 | No Phase 26 consumer; Blog has real code blocks. | ✓ |
| Decide inline-code style with Joel now | Pre-emptive; risk of revision when Blog actually depicts. | |

---

## Page-frame creation mechanics

### Q1 — Frame placement

| Option | Description | Selected |
|--------|-------------|----------|
| Right of existing Crito page frames, via `find_empty_space_on_canvas` | Carries Phase 24 D-37 pattern. Crito cluster intact. | ✓ |
| Top of canvas next to library frames | Mixes pages with library; weakens single-file mental model. | |
| Replace OUT-OF-SCOPE Crito frames in-place | Mutates pre-Phase-24 baseline; violates zero-mutation diff. | |

### Q2 — Dimensions

| Option | Description | Selected |
|--------|-------------|----------|
| 1440 width, content-driven height | Matches Crito; height auto-fits. Simplest. | |
| 1440 width, fixed pixel heights matched to Crito Home Page sectioning | Same width, explicit heights matching Crito rhythm. | ✓ |
| Smaller dimensions (1200 width) with `Joel /` prefix | Matches Joel's container max-width. Diverges from Crito baseline. | |

### Q3 — Naming

| Option | Description | Selected |
|--------|-------------|----------|
| Plain `FAQ` and `404`, no prefix | Sits alongside Crito numbered frames. PEN-INVENTORY scope column classifies type. | ✓ |
| `Joel / FAQ` and `Joel / 404` prefix | Type encoded in name. New naming axis for two frames. | |
| `10_FAQ`, `11_404` continuing Crito numbering | Visual continuity. Implies Crito-source which they aren't. | |

---

## Header/Footer/inline-CTA factoring

### Q1 — H/F instancing on FAQ + 404

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — instance both at top + bottom | First exercise of Phase 25 Sections outside library. Proves cross-page consistency. | ✓ |
| Yes, with Crito labels overridden to v1.3 | Diverges from Phase 25 D-38 deferral-to-Phase-31. | |
| Content sections only — no Header/Footer | Smaller scope; weakens story for first per-page phase. | |

### Q2 — CTA / NavBack factoring

| Option | Description | Selected |
|--------|-------------|----------|
| Inline per page | No new Sections. One consumer each = no duplication yet. | |
| Factor FAQ CTA as `Section / CTA` | Pre-empts duplication; one new Section. | |
| Factor BOTH — `Section / CTA` and `Section / NavBack` | Two new Section components. Maximum reuse. Risk: section-library bloat. | ✓ |

### Q3 — Section/CTA slot signature

| Option | Description | Selected |
|--------|-------------|----------|
| 3 slots: headline / body / actions | Mirrors Card minus image. Generic enough for FAQ + Homepage. | ✓ |
| 2 slots: content / actions | More flexible per consumer; less structured. | |
| 4 slots: headline / body / actions / accent | Speculative; no consumer demands accent yet. | |

### Q4 — Section/NavBack signature scope

| Option | Description | Selected |
|--------|-------------|----------|
| 404-only purpose, single signature | Narrow scope; Blog/Projects build their own when needed. | ✓ |
| Generalize as `Section / RelatedNav` | Wider; likely splits later anyway. | |
| Skip NavBack — use raw layout frame in 404 | Reverses "Factor BOTH" decision. | |

---

## 404 microcopy approval gate

### Q1 — Microcopy timing for 404

| Option | Description | Selected |
|--------|-------------|----------|
| Pre-write in this CONTEXT.md | Lock now; Plan 26-02 has no content decision. | |
| Mid-execution approval gate | User reviews + approves during plan execution. | |
| Stub with `STUB` label, defer content | Layout shipped; real microcopy deferred to future content phase. | ✓ |

### Q2 — FAQ CTA microcopy

| Option | Description | Selected |
|--------|-------------|----------|
| Ship the wording | Standard CTA copy; no brand-voice ambiguity. | |
| Stub like 404 | Consistent treatment of all NEW microcopy. | ✓ |
| Ship FAQ Q+A from v1.3, stub the CTA only | Splits old-content from new-content. | |

**Notes:** Q2 "Stub like 404" was understood as "stub all NEW microcopy" — existing v1.3 Q+A items (not new) are NOT stubbed; they ship verbatim per D-82. CONTEXT.md's D-82 captures this nuance explicitly.

### Q3 — Fidelity label application

| Option | Description | Selected |
|--------|-------------|----------|
| Per-section labels: Q+A list = EXACT, CTA = STUB | VALID-01 read at section level. Reader sees what's locked vs deferred. | ✓ |
| Whole FAQ page = APPROXIMATE | Single page-level label; hides per-section detail. | |
| Whole FAQ page = STUB | Most conservative; under-states real Q+A content. | |

---

## Plan task structure (26-01 / 26-02 / 26-03)

### Q1 — Plan count and structure

| Option | Description | Selected |
|--------|-------------|----------|
| Add an early prep plan: 26-00 token + sections | 4 plans: foundation → FAQ → 404 → protocol. Foundation-before-consumers. Diverges from ROADMAP's 3-plan layout. | ✓ |
| Keep 3 plans, fold Section + token work into Plan 26-01 | 26-01 grows heavy. ROADMAP wording stays. | |
| Keep 3 plans, fold protocol into 26-01 or 26-02 | Hides cross-phase protocol inside a per-page plan. | |

### Q2 — Plan ordering

| Option | Description | Selected |
|--------|-------------|----------|
| Sequential: 26-00 → 26-01 → 26-02 → 26-03 | FAQ before 404 — richer case informs simpler. Mirrors Phase 25 D-57. | ✓ |
| Wave structure: 26-00 → (26-01 + 26-02 parallel) → 26-03 | Faster; 404 doesn't learn from FAQ. | |
| Sequential, but 404 before FAQ (smallest first) | Hardest case last for protocol codification. | |

### Q3 — User gates within plans

| Option | Description | Selected |
|--------|-------------|----------|
| Calibration spot-check only, end of each plan | Per-page plans end with calibration gate. Foundation + protocol close without gates. | ✓ |
| Add mid-plan gates for token-extension + new sections | More friction; catches errors early. | |
| End-of-phase single gate (Phase 25 style) | Minimum interruption; late discovery of disagreement. | |

### Q4 — Plan-internal task lock-in

| Option | Description | Selected |
|--------|-------------|----------|
| Hand off to planner | CONTEXT.md captures strategic decisions; planner does task breakdown. | ✓ |
| Also lock probe-first within plans | Already a Phase 24/25 carry-forward pattern. | |
| Lock the calibration-spot-check question wording | Pre-write exact AskUserQuestion text per gate. Over-specified. | |

---

## Claude's Discretion

- Auto-layout vs absolute positioning at page-frame level (default: auto-layout vertical stack)
- Exact `type-semantic-heading-2` value (Plan 26-00 derives from Crito .fig consult; mid-plan AskUserQuestion if .fig unclear)
- Whether to embed `_Tokens & Foundations` slice into the calibration artifact image or reference by name (default: reference by name)
- 404 nav-back link labels (default: Joel's v1.3 Header nav labels — Home, Blog, Projects, Contact, FAQ — these are STRUCTURAL not microcopy)
- Section/CTA + Section/NavBack token usage breadth (Phase 25 D-55 source-wins discipline applies)
- Whether to publish per-plan `snapshot_layout({ problemsOnly: true })` at plan close (default: yes, per Phase 24/25 precedent)

## Deferred Ideas

- 404 brand-voice microcopy (layout shipped; words deferred to content phase / code milestone)
- FAQ CTA microcopy (same treatment)
- Joel's v1.3 4-link Header nav override (Phase 25 D-38 — defers to Phase 31)
- Joel-brand logo / wordmark in Header logo slot (Phase 25 D-40 — defers to Phase 31)
- prose-link semantic alias (OPEN-23-11 → re-pointed to Phase 28)
- prose-list semantic alias (OPEN-23-11 → re-pointed to Phase 28)
- prose-inline-code semantic alias (OPEN-23-11 → Phase 28 may escalate to Joel decision)
- type-semantic-heading-3 / -4 / -5 / -6 (OPEN-23-10 — Phase 28+ when real consumers surface)
- Generalized `Section / RelatedNav` (Phase 28 / 29 when Blog / Projects related-content surfaces)
- Joel-brand fonts (Bricolage Grotesque, DM Sans) in Crito.pen (PROJECT.md Out of Scope; future code milestone)
- Code-milestone `/faq` and `/404` route rewrites (out of v2.0 scope)
- Verifying `type-semantic-prose-paragraph-*` "provisional" flag (Phase 28 with real agency-prose surface area)
