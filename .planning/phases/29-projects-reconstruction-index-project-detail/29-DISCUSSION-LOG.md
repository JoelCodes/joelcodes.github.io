# Phase 29: Projects Reconstruction (Index + Project Detail) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 29-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-09
**Phase:** 29-projects-reconstruction-index-project-detail
**Areas discussed:** Source-of-truth branch, ProjectCard strategy, Detail page sections, Filter strip + categories

---

## Source-of-Truth Branch

### Q1: Which branch should Phase 29 use?

| Option | Description | Selected |
|--------|-------------|----------|
| Crito-source-flat-raster proxy | Y2isa (Service) + cYlRH (Service Details) flat-rasters as visual proxies for Projects index + Project detail; PAGE-11 ACTIVE on both; image-import-NN.jpg side-by-side calibration per § 3.4; closes OPEN-23-05 for both | ✓ |
| Joel-only-no-crito-ref | Fresh design in Crito vocab per D-58; calibration vs _Tokens & Foundations RpGbe per § 4; PAGE-11 INERT; Y2isa + cYlRH stay token-mining-only | |
| Hybrid: Index crito-proxy, Detail joel-only | Index uses Y2isa raster; detail joel-only since v1.3 section structure is richer/bespoke | |

**User's choice:** Crito-source-flat-raster proxy
**Notes:** Locked branch for both frames; PAGE-11 ACTIVE on Y2isa + cYlRH after APPROVE.

### Q2: PEN-INVENTORY reclassification policy?

| Option | Description | Selected |
|--------|-------------|----------|
| Reclassify in-place | Mutate Y2isa + cYlRH rows: joel_page_map 'none' → 'Projects'/'Project detail'; drop token-mining-only qualifier; status moves from flat:1 to reconstructed-PHASE-29 after APPROVE | ✓ |
| Keep token-mining + add joel rows | Y2isa + cYlRH stay token-mining-only; add NEW joel-only-no-crito-ref-but-visual-proxy rows for Projects + Project; PAGE-11 INERT | |

**User's choice:** Reclassify in-place
**Notes:** Cleanest single source of truth; OPEN-23-05 closes for both frames; only 04_About remains in long-tail.

### Q3: Project detail page section authority?

| Option | Description | Selected |
|--------|-------------|----------|
| Joel-shape, Crito-visual | Joel's v1.3 section SHAPE is authority (full Challenge/Solution/Screenshots/Results/Testimonial/Built With); cYlRH raster is visual calibration target only; sections Crito doesn't depict get fresh-Crito-vocab treatment | |
| Crito-shape, Joel-content | cYlRH raster is STRUCTURAL authority; Joel's v1.3 sections not in cYlRH get OPEN-29-NN flags for future content phase; tighter crito-source fidelity but loses richer case-study structure | ✓ |
| Probe cYlRH at Plan 29-NN | Defer decision to Plan 29-NN Task 0 cYlRH probe; plan-execution decides Joel-shape vs Crito-shape based on raster | |

**User's choice:** Crito-shape, Joel-content
**Notes:** Significant reversal from Phase 27 D-97 pattern. Will get later softened via D-134 + D-135 hybrid carve-outs for Joel-content essentials (Results + Related Projects ship regardless of cYlRH evidence).

### Q4: Calibration pairing pattern at Plan 29-01?

| Option | Description | Selected |
|--------|-------------|----------|
| Dual pairing in Plan 29-01 | Plan 29-01 calibration carries TWO pairing targets (Y2isa page-layout + image-import-12.jpg project-card visual); both raised at single calibration AskUserQuestion; reduces REVISE-loop risk | ✓ |
| Single pairing, Plan 28-01 inheritance | Plan 29-01 inherits Phase 28 single-pairing pattern; if divergence surfaces at calibration, REVISE-loop spins up ProjectCard sibling | |

**User's choice:** Dual pairing in Plan 29-01
**Notes:** Cited Plan 28-01 lesson — pre-pair both Y2isa and image-import-12.jpg to avoid v1 → v2 REVISE-loop birth of BlogCard.

---

## ProjectCard Strategy

### Q5: ProjectCard component approach?

| Option | Description | Selected |
|--------|-------------|----------|
| Probe + REVISE fallback | Plan 29-00 starts with t40xct as default; REVISE-loop ships Compound/ProjectCard sibling if calibration shows divergence; matches Plan 28-01 lesson but accepts v1 → v2 risk | |
| Compound/ProjectCard upfront | Plan 29-00 ships Compound/ProjectCard as NEW narrow-scoped sibling alongside t40xct + BlogCard inside t67DU6; slot signature derived from v1.3 + image-import-12.jpg cross-reference; pre-commits to sibling pattern | ✓ |
| Reuse t40xct, lock current shape | Plan 29-01 instances t40xct directly with descendants overrides; FIRST concrete consumer of t40xct general-purpose claim | |

**User's choice:** Compound/ProjectCard upfront
**Notes:** Skips REVISE-loop risk; commits based on dual evidence (Crito raster + v1.3 ProjectCard.astro). Pitfall 1 tension acknowledged but mitigated.

### Q6: Compound/ProjectCard slot signature?

| Option | Description | Selected |
|--------|-------------|----------|
| v1.3-shape, Crito-visual | Slot signature: image-slot + category-badge-slot + title-slot + body-slot (problem excerpt); drops image-import-12.jpg's date + 'Read More' CTA slots | ✓ |
| Crito-shape, Joel-content | Mirror image-import-12.jpg literally: image-slot + title-slot + date-row + footer-actions-slot (Read More Button + arrow-right); v1.3 category badge + problem-excerpt become OPEN-29-NN gaps | |
| Hybrid: 4-slot superset | Combine both: image-slot + category-badge-slot + title-slot + body-slot + footer-actions-slot; all enabled:true defaults; instance-time descendants can disable | |

**User's choice:** v1.3-shape, Crito-visual
**Notes:** Not strictly consistent with Q3's Crito-shape choice — user is deliberately separating card slot-signature decision from detail-page authority decision. ProjectCard ships Joel's actual structure with Crito visual register.

---

## Detail Page Sections

### Q7: Which sections to pre-commit shipping vs OPEN-29-NN deferring?

| Option | Description | Selected |
|--------|-------------|----------|
| Ship Crito-likely sections only | Pre-commit shipping: back-nav (Section/NavBack reuse) + title-header + body-prose (Challenge + Solution); OPEN-29-NN defer: Screenshots, Results, Testimonial, Built With; cYlRH probe may pull some back in | ✓ |
| Ship core + probe to expand | Pre-commit: back-nav + title-header + Challenge + Solution + ONE other; OPEN-29-NN defer the rest | |
| Plan 29-NN probe decides everything | Defer ALL section pre-commits to Plan 29-NN Task 0 cYlRH probe with mid-plan AskUserQuestion sub-gate | |

**User's choice:** Ship Crito-likely sections only (but Results + Related Projects later RECLAIMED via Q9 + Q10)
**Notes:** Initial conservative selection later softened by user's Q9 + Q10 selections that build Section/RelatedProjects + Section/ResultsMetrics anyway.

### Q8: Back-nav shape?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline single text-link (Phase 27 pattern) | Top of Project frame: plain text-link 'Back to Projects' + Primitive/Icon/16 instance (arrow-left or chevron-left); matches Phase 27 D-99 secondary-link convention; no D-79 violation | ✓ |
| Reuse Section/NavBack with 1-link override | Instance N1jo3i; descendants override hides 3 of 4 links + heading; stretches D-79 narrow-scoping | |
| Skip back-nav entirely | cYlRH probably doesn't depict; defer to OPEN-29-NN; v1.3 back-nav becomes code-milestone concern | |

**User's choice:** Inline single text-link (Phase 27 pattern)
**Notes:** Preserves D-79 narrow-scoping intent; renders as text + Icon sibling refs, no Section component.

### Q9: Related Projects?

| Option | Description | Selected |
|--------|-------------|----------|
| Confirm OUT (defer) | Related Projects fully out of Phase 29 scope; no Section/RelatedProjects built; footnote ROADMAP success criterion 3 reference | |
| Build Section/RelatedProjects narrowly | Ship Section/RelatedProjects in Plan 29-00 as narrow-scoped sibling of Section/RelatedPosts (D-116 precedent); slot signature: heading-slot + cards-row (3 ProjectCard instances) | ✓ |
| Plan 29-NN probe decides | Defer to cYlRH probe; if raster depicts strip, build; otherwise defer | |

**User's choice:** Build Section/RelatedProjects narrowly
**Notes:** Reversal from Q7 pre-commit. Ships per ROADMAP success criterion 3 literally even though Joel's v1.3 doesn't have it.

### Q10: Results metric box?

| Option | Description | Selected |
|--------|-------------|----------|
| Confirm OUT (deferred) | Results metric box NOT shipped; OPEN-29-NN flag documents v1.3 case-study Results as known-divergence from cYlRH | |
| Build Section/ResultsMetrics anyway | Ship Section/ResultsMetrics in Plan 29-00 as narrow-scoped Section; resolves Joel's case-study payoff; stretches Crito-shape authority | ✓ |
| Ship as inline STUB with sibling note | Layout-only frame with STUB content + sibling Pencil note; reserves slot without committing shape | |

**User's choice:** Build Section/ResultsMetrics anyway
**Notes:** Reversal from Q7 pre-commit. Joel's case-study payoff valued enough to override strict Crito-shape fidelity; ships per Joel-content essential authority (D-135 hybrid carve-out from D-129).

### Q11: Section/ResultsMetrics shape?

| Option | Description | Selected |
|--------|-------------|----------|
| Heading + 3-fixed metric-tile cells | heading-slot + metrics-row (3 fixed metric-tile children); each metric-tile: metric-value display number + metric-label small caption; Crito-vocab register | ✓ |
| Heading + flexible metric-row (1-4 metrics) | metrics-row accepts 1-4 metric-tile children; instance-time descendants override adds/disables | |
| Plan 29-NN probe decides metric-tile shape | Build parent + heading-slot + metrics-row in Plan 29-00; defer metric-tile internal structure to Plan 29-02 cYlRH probe | |

**User's choice:** Heading + 3-fixed metric-tile cells
**Notes:** Locks shape upfront; matches v1.3 + projects.json results array (3 metrics each).

---

## Filter Strip + Categories

### Q12: Reuse Section/TagFilter or ship Section/CategoryFilter?

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse Section/TagFilter | Phase 29 instances O1IwyS with descendants override changing pill labels + active-pill-position; validates D-115 broad-scoping with third consumer | ✓ |
| Ship Section/CategoryFilter as sibling | NEW Section/CategoryFilter inside g9oRa5 as sibling of Section/TagFilter; honest vocabulary per content domain (D-116 narrow-scoping mirror) | |
| Reuse Section/TagFilter + plan-time rename note | Reuse + sibling Pencil note documenting semantic stretch; minimal new library surface + honest documentation | |

**User's choice:** Reuse Section/TagFilter
**Notes:** Validates Phase 28 D-115 broad-scoping with 3 consumers (Blog + Tag + Projects). Pill labels override at instance time per v1.3 categoryLabel field.

---

## Claude's Discretion

- Auto-layout vs absolute positioning at page-frame level (Phase 26/27/28 carry-forward lean: auto-layout vertical-stack)
- Exact title typography token for Compound/ProjectCard (D-132 default heading-4; plan-execution may use heading-3)
- Compound/ProjectCard parent dimensions (default 380w like BlogCard; plan-execution may resize)
- Category badge variant for ProjectCard category-badge-slot (Phase 24 Badge/Default solid vs Phase 28 Badge/Outline; plan-execution evaluates)
- Section/ResultsMetrics metric-value typography token (D-135 default reuse heading-1 48px; possible new type-semantic-metric-large primitive — plan-execution evaluates)
- Section/ResultsMetrics chrome treatment (default plain white + 1px border + radius 10; possible decorative-coral fill per Plan 28-01 banner precedent)
- Section/RelatedProjects card density (default 3 per Phase 28 D-118 precedent)
- Back-nav icon glyph (default arrow-left lucide native; plan-execution probes chevron-left alternative)
- Back-nav color (default text-accent; plan-execution may use text-secondary)
- Compound/ProjectCard sample content for Plan 29-01 (2 real projects.json entries + 4 representative agency-template instances per Plan 28-01 BlogCard precedent)
- Plan 29-02 body-prose project selection (default bakery-order-system; plan-execution may use inventory-sync-automation)
- Per-plan snapshot_layout({ problemsOnly: true }) discipline at plan close (carry-forward)
- radius-semantic-pill token addition (D-141 carry-forward; D-120 default instance-time override)
- Plan 29-02 cYlRH raster probe surfacing extra sections (D-129 authority allows plan-execution to pull deferred OPEN-29-NN sections back in IF cYlRH structurally depicts them; default lean conservative)
- Stale-cache get_screenshot quirk on 2 new page frames (CALIBRATION-PROTOCOL § 6.4 Tier-1/Tier-2 workarounds)
- TagFilter rename note at Projects instance (optional, plan-execution decides)

## Deferred Ideas

- Screenshots gallery (v1.3 [slug].astro 73-95 — OPEN-29-NN per D-136)
- Testimonial conditional blockquote (v1.3 118-128 — OPEN-29-NN per D-136)
- Built With technology badges (v1.3 131-145 — OPEN-29-NN per D-136)
- Joel's draft-project filtering + 'Coming soon!' empty state (out of v2.0 scope)
- Section/CategoryFilter as separate component (D-137 declined)
- Generalized Section/RelatedContent unifying RelatedPosts + RelatedProjects (D-116 narrow-scoping precedent declines)
- Section/SecondaryLink consolidation (Phase 27 D-99 + Phase 29 D-133 are 2 consumers; defer until 3rd surfaces)
- type-semantic-metric-large token + radius-semantic-pill token (D-135 + D-120 plan-execution evaluates)
- Compound/ServiceCard for Crito Service grid reconstruction (Y2isa repurposed for Projects)
- Hover/focus states for Compound/ProjectCard (static design = READING state)
- Joel-brand fonts + neobrutalist colors (PROJECT.md Out of Scope for v2.0)
- Joel's v1.3 4-link Header nav override (Phase 31)
- Joel-brand logo / wordmark (Phase 25 D-40 deferred)
- type-semantic-prose-paragraph-* 'provisional' flag verification (Plan 29-02 body-prose SECONDARY validation surface)
- 04_About frame final disposition (Phase 32 sweep + handoff)
- Code-milestone /projects + /projects/[slug] route rewrites (out of v2.0 scope)
