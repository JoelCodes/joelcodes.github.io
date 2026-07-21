# Phase 28: Blog Reconstruction (Index + Post + Tag Page) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-08
**Phase:** 28-blog-reconstruction-index-post-tag-page
**Areas discussed:** Prose token surface, Blog card composition, Tag-filter + related-posts strips, Tag chip primitive

---

## Prose token surface

### Q1 — Which heading levels does Phase 28 ship into the token surface?

| Option | Description | Selected |
|--------|-------------|----------|
| Heading-3 only (Recommended) | Strict Pitfall 1 + Phase 26 D-72 precedent. heading-4/-5/-6 stay open. | |
| Heading-3 + heading-4 | Heading-4 future-proofs deeper post hierarchy. | ✓ |
| Full heading-3 through heading-6 | Completes the heading family in one shot. | |

**User's choice:** Heading-3 + heading-4
**Notes:** Future-proofing the typography hierarchy without going all the way to H6. Heading-5/-6 stay deferred per Pitfall 1.

### Q2 — How should the prose-link semantic token render?

| Option | Description | Selected |
|--------|-------------|----------|
| accent color + underline-on-hover (Recommended) | Crito agency-template convention. | ✓ |
| accent color + always underlined | Stronger affordance; heavier visual rhythm. | |
| primary text color + always underlined | Calmest; plays down link prominence. | |
| Probe .fig first, then ask | Don't commit; have Plan 28-00 attempt `.fig` consult and surface findings. | |

**User's choice:** accent color + underline-on-hover (Recommended)
**Notes:** Matches Crito agency-template register; keeps body prose calm.

### Q3 — How rich does Phase 28 go on code typography?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline code + code block + mono primitive (Recommended) | Full code prose surface. New type-primitive-family-mono + two composite tokens. | ✓ |
| Inline code only — code block deferred | Defer code-block; inline code is universal. | |
| Both, but no new mono primitive — reuse Inter for both | Pragmatic; loses code-like visual register. | |
| Probe .fig first, then ask | Plan 28-00 consults .fig; escalates via mid-plan gate if needed. | |

**User's choice:** Inline code + code block + mono primitive (Recommended)
**Notes:** Real MDX consumer (JavaScript fenced code block); full surface added.

### Q4 — How granular for lists?

| Option | Description | Selected |
|--------|-------------|----------|
| Single prose-list token covering both (Recommended) | One token for unordered + ordered; only difference is marker character. | ✓ |
| Separate prose-list-unordered + prose-list-ordered tokens | More granular; two tokens for marginal flexibility. | |
| No new token — lists render via prose-paragraph + literal markers | Zero new tokens; couples list structure to plan-execution detail. | |

**User's choice:** Single prose-list token covering both (Recommended)
**Notes:** Minimal token surface; if heavy ordered-list customization emerges later, split.

---

## Blog card composition

### Q1 — How do date + reading-time metadata render in the Blog Card instance?

| Option | Description | Selected |
|--------|-------------|----------|
| Compose into title-slot via descendants override (Recommended) | Zero schema changes to Compound/Card. Sibling caption-tier text below title. | ✓ |
| Extend Card with metadata-slot (new optional slot) | Adds 5th slot; schema migration on t40xct. | |
| New Compound/BlogCard sibling compound | Violates Phase 25 D-49 single-Card principle. | |
| Body-slot composite (metadata prepended into body) | Ergonomically poor; restyle metadata independently impossible. | |

**User's choice:** Compose into title-slot via descendants override (Recommended)
**Notes:** Validates Phase 25 D-49 single-component-multiple-uses claim; matches Phase 27 D-93 belt-and-suspenders convention.

### Q2 — Where do the tag pills live in the Card instance?

| Option | Description | Selected |
|--------|-------------|----------|
| footer-actions-slot (Recommended) | Card stays 4-slot; slot content varies (Badge instances vs Button instances). | ✓ |
| Body-slot composite (tags appended after excerpt) | Couples tags to body content. | |
| New tags-slot extension to Card | 6-slot compound; schema migration cost. | |
| Outside Card — sibling row beneath the Card frame | Card stays 4-slot but row lives outside. | |

**User's choice:** footer-actions-slot (Recommended)
**Notes:** Footer-actions-slot signature stays multi-purpose; Blog cards put pills, Project cards put Button.

### Q3 — How does the Blog Card image-slot get filled?

| Option | Description | Selected |
|--------|-------------|----------|
| Phase 25 default placeholder rectangle stays (Recommended) | 180h light-gray placeholder + sibling Pencil wiring note. | ✓ |
| Embed one sample image-import-NN.jpg from Crito as image-slot fill | Cleaner spot-check; couples raster fragment. | |
| Embed Joel's actual featuredImage SVG placeholders | Couples Pencil to v1.3 content asset paths. | |

**User's choice:** Phase 25 default placeholder rectangle stays (Recommended)
**Notes:** v2.0 boundary preserved (no asset extraction); code milestone wires per-post imagery.

### Q4 — How many Card instances populate the Blog index grid frame?

| Option | Description | Selected |
|--------|-------------|----------|
| 6 cards in 3-col × 2-row grid (Recommended) | Matches Crito agency-template register; calibration faithful. | ✓ |
| 9 cards (matches v1.3 INITIAL_POSTS = 9) | Honors v1.3 load-more boundary; extra Card instance maintenance. | |
| 3 cards in 1-row strip | Misleading for index; honest for related-posts strip. | |
| Probe image-import-NN.jpg, match raster card count exactly | Strict source-wins; falls back to 6. | |

**User's choice:** 6 cards in 3-col × 2-row grid (Recommended)
**Notes:** Same 6-card count applied to Tag page; 3-card horizontal strip for Section/RelatedPosts.

---

## Tag-filter + related-posts strips

### Q1 — Build the tag-filter strip as a new Section component, or as inline layout?

| Option | Description | Selected |
|--------|-------------|----------|
| New `Section / TagFilter` component (Recommended) | Two consumers from day one justifies factoring; broad-scoping like Phase 26 D-78. | ✓ |
| Inline layout frame with pill children (no component) | Avoids over-factoring; Phase 26 D-79 narrow-scoping precedent. | |
| Reuse Section/CTA with override (no new component) | Stretches Section/CTA semantics; legibility drift. | |

**User's choice:** New `Section / TagFilter` component (Recommended)
**Notes:** Broad-scoping; sets family pattern for future filterable surfaces.

### Q2 — Build the related-posts strip broadly or narrowly?

| Option | Description | Selected |
|--------|-------------|----------|
| `Section / RelatedPosts` narrowly-scoped to blog (Recommended) | Strict Pitfall O5/O6 prevention + Phase 26 D-79 narrow-scoping precedent. | ✓ |
| `Section / RelatedContent` generalized (broad-scoping) | One component, slot-driven; harder discoverability for downstream agents. | |
| Inline 3-Card row on Blog post frame, no component | Strictest no-library-bloat; loses calibration precedent. | |

**User's choice:** `Section / RelatedPosts` narrowly-scoped to blog (Recommended)
**Notes:** Phase 29 builds its own `Section / RelatedProjects` if needed.

### Q3 — What shape are the 3 related-post entries inside `Section / RelatedPosts`?

| Option | Description | Selected |
|--------|-------------|----------|
| 3 `Compound / Card` instances at full shape (Recommended) | Reuses Card with same Blog-Card overrides; visual consistency. | ✓ |
| 3 `Compound / Card` instances, body-slot disabled (lighter) | Less informative card content. | |
| Inline title-only links (no Card) | Minimalist; doesn't reuse Card. | |
| New `Compound / Card / Compact` variant | Variant proliferation Phase 24 D-22 cautioned against. | |

**User's choice:** 3 `Compound / Card` instances at full shape (Recommended)
**Notes:** Third concrete Card consumer in Phase 28; validates D-49 single-component-multiple-uses.

### Q4 — How does the active pill state on TagFilter render?

| Option | Description | Selected |
|--------|-------------|----------|
| Active = solid fill, inactive = outline — single TagFilter shape with descendants override at instance time (Recommended) | Avoids variant-axis proliferation per Phase 24 D-22 caution. | ✓ |
| Two TagFilter variants: AllActive (Blog index) + TagActive (Tag page) | Variant proliferation; N instances needed for Tag page. | |
| All pills always render as outline; active implied by URL only | Loses calibration evidence; static design no-op. | |

**User's choice:** Active = solid fill, inactive = outline — single TagFilter shape with descendants override at instance time (Recommended)
**Notes:** Pairs cleanly with mix-per-consumer primitive strategy (D-119).

---

## Tag chip primitive

### Q1 — Which primitive backs the tag chips across Phase 28 consumers?

| Option | Description | Selected |
|--------|-------------|----------|
| Mix per consumer: Primitive/Button rounded-full for TagFilter; Primitive/Badge for Card + post-detail tags (Recommended) | Honors v1.3 mapping; zero new primitives. | ✓ |
| New Primitive/Tag sibling primitive covering all three consumers | Pitfall 1 risk; structural identity blurry. | |
| Extend Primitive/Badge with `pill` size + `active` state variants | Badge becomes single tag primitive; variant axis grows. | |
| Extend Primitive/Button with `rounded-full` + `sm` variants; reuse for all tag chips | Decorative tags read as clickable affordances when not. | |

**User's choice:** Mix per consumer: Primitive/Button rounded-full for TagFilter; Primitive/Badge for Card + post-detail tags (Recommended)
**Notes:** Hybrid library strategy (Phase 27 D-89) extended; possible Badge/Outline variant if Phase 24 surface doesn't cover.

### Q2 — How does the Button-rounded-full requirement get handled?

| Option | Description | Selected |
|--------|-------------|----------|
| Instance-time radius override (Recommended) | Descendants override sets cornerRadius to 9999 (or new radius-semantic-pill if hacky). | ✓ |
| Add Button/Pill/Default + Button/Pill/Secondary variants | Two new variants; cleaner instances; variant proliferation. | |
| Add `radius-semantic-pill` token only — instance override uses it | One new token; resolves OPEN-23-12; cleanest tokens-first. | |

**User's choice:** Instance-time radius override (Recommended)
**Notes:** Leaves room for plan-execution to add `radius-semantic-pill` if 9999 reads hacky.

### Q3 — Post-detail tag row: inline Badge row or another TagFilter instance?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline row of Badge instances in the post header section (Recommended) | Honest mapping: post-categorization, not post-filtering. | ✓ |
| Reuse Section/TagFilter with all pills inactive + 'Tagged:' heading | Stretched semantics; Button-shaped over-promises affordance. | |
| Plain text tags separated by commas, no pills | Minimalist; loses pill visual rhythm. | |

**User's choice:** Inline row of Badge instances in the post header section (Recommended)
**Notes:** Matches v1.3 anchor-link styling (border + light bg, smaller than filter strip).

### Q4 — Phase 28 plan structure: how many plans?

| Option | Description | Selected |
|--------|-------------|----------|
| 4 plans: foundation + 3 per-page (Recommended) | Clean separation; 3 distinct calibration gates; mirrors Phase 26 4-plan pattern. | ✓ |
| 3 plans: foundation + Blog index/Tag combined + Blog post detail | Combined plan asymmetric branch handling. | |
| 5 plans: foundation + per-page + per-component validation gates | Heavier plan structure; separate prose-token validation plan. | |

**User's choice:** 4 plans: foundation + 3 per-page (Recommended)
**Notes:** 28-00 foundation + 28-01 Blog index (crito-source) + 28-02 Blog post detail (crito-source) + 28-03 Tag page (joel-only).

---

## Claude's Discretion

- Auto-layout vs absolute positioning at the page-frame level — default lean toward auto-layout vertical-stack at page level (carry-forward from Phase 26/27)
- Exact `type-semantic-heading-3` + heading-4 values — interpolation default (24 and 20) if .fig unreadable; revisit at Plan 28-02 calibration if visually wrong
- Exact `type-primitive-family-mono` value — default system mono stack if .fig silent; user-gate escalation if Joel has preference
- inline-code + code-block padding/border specifics — defaults provided (4px h-padding + 1px border inline; 16px padding for block); plan-execution may refine
- Whether Badge needs Outline variant or descendants-override at Card consumer — Plan 28-00 Task probe decides
- Tag-filter pill count shipped in Pencil instance — default 5 pills (1 'All Posts' + 4 tags) representative density
- post-detail tag row placement — default in post header section between metadata row and featured image (matches v1.3 [slug].astro structure)
- OPEN-26-02 stale-cache get_screenshot quirk on 3 new page frames — Tier-1/Tier-2 workarounds available; Tier-2 fallback likely
- Per-plan `snapshot_layout({ problemsOnly: true })` discipline at plan close — yes, matches Phase 24/25/26/27 precedent
- Tag page page-intro composition — representative content (e.g., 'Posts tagged "automation"' + '3 posts about automation') with sibling note documenting dynamic generation

## Deferred Ideas

- Heading-5 + heading-6 semantic tokens (OPEN-23-10 remains partial; wait for real consumer)
- Separate prose-list-unordered + prose-list-ordered tokens (split if heavily-numbered content emerges)
- `radius-semantic-pill` token addition (defer to Plan 28-00 evaluation; OPEN-23-12 may resolve)
- astro-expressive-code syntax-highlighting color tokens (runtime, code milestone)
- Embedded code-block copy-to-clipboard button (runtime)
- 3-column TOC + sidebar layout for Blog post detail (single-column ships in Pencil; TOC affordance code milestone)
- Tag page filter-strip click-to-filter URL navigation (runtime)
- Load-more interaction on Blog index (runtime)
- Featured-image SVG extraction into Pencil for individual posts (default placeholder + sibling wiring note)
- Section/RelatedPosts related-content selection algorithm (runtime)
- Joel-brand fonts in Blog frames (out of v2.0 scope)
- Joel's v1.3 4-link Header nav override (deferred to Phase 31)
- Joel-brand logo / wordmark in Header logo slot (deferred to future phase)
- prose-blockquote / prose-figure / prose-caption / prose-strong / prose-em semantic tokens (no current MDX consumer; add when surfaced)
- prose-horizontal-rule semantic token (sample MDX uses `---`; default 1px divider line + 24px vertical margin; tokenize if visually wrong)
- prose-inline-code outline vs solid-fill variant (single style ships; split if emphasis variants needed)
- Code-milestone `/blog` + `/blog/[slug]` + `/blog/tags/[tag]` route adoption (out of v2.0 scope)
- prose-paragraph 'provisional' flag verification at Plan 28-02 calibration gate (per D-110 — APPROVE removes flag in PEN-INVENTORY)
- Backwards-compat for v1.3 BlogCard `shadow-neo-turquoise` hover effect (out of scope per D-58)
- Generalized `Section / RelatedContent` component (rejected per D-116 narrow-scoping; Phase 29 builds own)
