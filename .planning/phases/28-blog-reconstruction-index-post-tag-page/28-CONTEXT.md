# Phase 28: Blog Reconstruction (Index + Post + Tag Page) - Context

**Gathered:** 2026-06-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Three new top-level page frames — `Blog`, `Blog Post`, `Tag` — are added to `design/Crito.pen` as editable compositions of Phase 23–27 tokens / primitives / compounds / sections, **plus** a foundation layer of (a) prose tokens that the post body requires (Phase 28 is the long-promised consumer of OPEN-23-10 + OPEN-23-11), (b) two new Section components (`Section / TagFilter`, `Section / RelatedPosts`), and (c) the first concrete `Compound / Card` consumer (resolving OPEN-25-07).

Branch assignments per CALIBRATION-PROTOCOL.md § 2 branch decision tree:
- **Blog index = `crito-source-present`, flat-raster sub-case** — `DzqTm` (07_Blog) is a single image-import-*.jpg rectangle per OPEN-23-05; PAGE-11 ACTIVE — hide `DzqTm` via `enabled: false` after APPROVE per § 3.3. Calibration pairing uses the image-import-*.jpg per § 3.1.
- **Blog post detail = `crito-source-present`, flat-raster sub-case** — `w1m3x` (08_Blog Details) is a single image-import-*.jpg rectangle per OPEN-23-05; PAGE-11 ACTIVE — hide `w1m3x` via `enabled: false` after APPROVE per § 3.3. Calibration pairing uses the image-import-*.jpg per § 3.1.
- **Tag page = `joel-only-no-crito-ref`** — no Crito source frame exists (Phase 23 audit catalogued no Tag page frame; Crito's blog architecture has Blog index + Blog detail only); calibration is token-usage check vs `_Tokens & Foundations` (`RpGbe`) per § 4.

Phase 28 also ships **7 new prose tokens** (heading-3, heading-4, mono-primitive, inline-code, code-block, prose-link, prose-list) and **two new PEN-INVENTORY sections** (Variant Evidence Phase 28 + Token Extensions Phase 28). Resolves OPEN-23-05 partial (Blog index DzqTm + Blog Details w1m3x reconstructed), OPEN-23-10 further (heading-3 + heading-4 added; heading-5/-6 remain open), OPEN-23-11 entirely (prose-link + prose-list + prose-inline-code all shipped), OPEN-25-07 (first concrete Card consumer).

**Out of scope (already decided):**
- Per-page reconstruction for any other page (Phases 29–31)
- Mobile breakpoint reconstruction (PAGE-09 — desktop only for v2.0)
- Dark mode (TOKEN-07 + Phase 23 D-01)
- A new CALIBRATION-PROTOCOL revision — Phase 26 D-66 shipped the unified protocol; Phase 28 inherits it
- Joel's v1.3 4-link Header override (Phase 25 D-38 + Phase 26 D-77 + Phase 27 carry-forward: defers to Phase 31 Homepage instance time)
- Joel-brand logo / wordmark in Section/Header logo slot (Phase 25 D-40 deferred)
- A new `Section / RelatedProjects` or generalized `Section / RelatedContent` component (D-79 Phase 26 narrow-scoping; Phase 29 builds its own if needed)
- `radius-semantic-pill` token addition — deferred to plan-execution detail per D-114 default-position (instance-time radius override; only add token if 9999 reads hacky during execution)
- Heading-5 + heading-6 semantic tokens — no current MDX consumer per D-108 (heading-3 + heading-4 ship; -5/-6 stay open)
- Syntax-highlighting colors for code blocks — runtime concern (astro-expressive-code library), code milestone wires
- Embedded Calendly iframe representation (D-93 Phase 27 carry-forward — not relevant to Phase 28)
- Load-more interaction, filter active-state click handling — runtime, code milestone wires
- Joel's v1.3 src code (v2.0 milestone scope — `.pen` file only)
- Actual featuredImage extraction into Pencil — code milestone wires image-slot to `post.data.featuredImage` (sibling note pattern)
- Real microcopy for post-body content beyond the sample MDX text (the milestone-close handoff covers the wiring point)

</domain>

<decisions>
## Implementation Decisions

### Prose Token Surface (the foundation deliverable)

- **D-105:** **Phase 28 ships 7 new tokens — the long-promised prose surface.** OPEN-23-10 + OPEN-23-11 land here. New additions: `type-semantic-heading-3-*` (4-part composite), `type-semantic-heading-4-*` (4-part composite), `type-primitive-family-mono` (mono font primitive), `type-semantic-prose-inline-code-*` (composite: mono family + size + neutral-100 bg + border + radius + horizontal padding), `type-semantic-prose-code-block-*` (composite: mono family + size + neutral-100 bg + 16px padding + radius + line-height 1.6), `type-semantic-prose-link-*` (composite: accent color + underline-on-hover behavior — `font-decoration` rendered as static descriptor since static design tools don't depict :hover state per D-92/D-59 carry-forward), `type-semantic-prose-list-*` (composite: indent 24, item-gap 8, bullet-style disc, ordered-style decimal). All 7 are real-consumer-justified by the sample MDX (`src/content/blog/getting-started-with-automation.mdx`) per Pitfall 1 strict reading.

- **D-106:** **Heading-3 + heading-4 ship; heading-5 + heading-6 remain open.** Joel's MDX has explicit `### Example: Invoice Follow-ups` (H3 consumer) and uses an implicit H4-ish tier in the structure. Heading-4 future-proofs the deeper post hierarchy; heading-5/-6 have no current consumer and stay deferred to a future MDX that exercises them. Partially resolves OPEN-23-10. Source-evidence per token: plan-probes Crito .fig per Phase 23 D-04 first; if .fig still unreadable (RESEARCH § Focus 3 — zipped binary per Plan 26-00 OPEN-26-01 outcome), interpolate between heading-2 (32) and body (16): heading-3 = 24, heading-4 = 20 (or similar interpolation). Plan 28-00 raises OPEN-28-NN with proposed values and surfaces user gate before writing if interpolation needed (Phase 26 D-72 + Phase 26 OPEN-26-01 precedent).

- **D-107:** **`type-semantic-prose-link` = accent fill + hover-underline behavior.** Renders in `color-semantic-text-accent` with no always-on underline. Static Pencil depicts the color shift; the underline-on-hover behavior is documented via the prose-link semantic token's component-property descriptor (similar to how Phase 24 D-22 documented Default/Focus/Error forward states). Code milestone wires the actual `:hover` interaction. Avoids always-on underline weight in dense prose paragraphs while preserving link affordance. Plan 28-00 probes Crito .fig first; falls back to this default. Resolves the prose-link portion of OPEN-23-11.

- **D-108:** **Mono primitive + inline-code + code-block tokens — full code prose surface.** `type-primitive-family-mono` ships as a new primitive (plan-probes Crito .fig for mono family choice; if .fig silent, defaults to system mono stack `'SF Mono', Menlo, Monaco, Consolas, monospace` per Pitfall 1 minimalism — system stack is honest about not committing to a specific font face). Two composite semantic tokens consume it: `type-semantic-prose-inline-code-*` (mono family + body-sm size + `color-semantic-bg-surface-elevated` fill + 1px border + `radius-semantic-card` 4px or similar + 4px horizontal padding) and `type-semantic-prose-code-block-*` (mono family + body-sm size + `color-semantic-bg-surface-elevated` fill + 16px padding + radius + line-height 1.6). Static Pencil ships the chrome; astro-expressive-code wires syntax-highlight colors at runtime (deferred per D-92 carry-forward: static design = READING state, not runtime visual). Resolves prose-inline-code + adds prose-code-block (new) — going beyond OPEN-23-11's original scope per Joel's actual MDX consumer evidence.

- **D-109:** **Single `type-semantic-prose-list-*` token covering both unordered + ordered lists.** Composite: indent 24px, item-gap 8px, bullet-style disc, ordered-style decimal. Pencil renders both bullet (•) and numbered (1.) lists with the same item-spacing rhythm; the only difference between instances is the literal marker character. Minimal token surface. Resolves the prose-list portion of OPEN-23-11. Future need for prose-list-unordered vs prose-list-ordered split only if blog moves toward heavily-numbered content (raise OPEN-28-NN if needed).

- **D-110:** **Prose-paragraph 'provisional' flag verification — Phase 28 is the higher-confidence verifier per Phase 26 D-71 carry-forward.** The Phase 23-shipped `type-semantic-prose-paragraph-*` was flagged provisional (Home Page body proxy). Phase 26 FAQ consumed it as-is and APPROVED (Plan 26-01 calibration gate). Phase 28 is the agency-prose-volume consumer (real MDX post bodies, multi-paragraph rendering). If rendered post body looks visibly wrong at Plan 28-02 calibration gate, raise OPEN-28-NN with rendering evidence and propose token revision; otherwise the `provisional` flag is removed in PEN-INVENTORY per Phase 26 D-71 mechanic.

### Card Composition (Resolves OPEN-25-07)

- **D-111:** **Card metadata composed into title-slot via descendants override at instance time — no schema migration.** v1.3 BlogCard ships 'JAN 27, 2026 • 5 MIN READ' as a small caption-tier row immediately under the title. Phase 28 BlogCard instances override `Compound / Card` (t40xct) title-slot (vGH3A) via descendants to insert a sibling caption-tier text node below the title text. Title text uses Phase 24 Card title-slot default (Plus Jakarta Sans 18/700 per Phase 25 D-49); metadata caption uses `type-semantic-caption-*` or `type-semantic-body-sm-*` (plan-execution picks the most appropriate token; default body-sm) + `color-semantic-text-secondary`. Zero changes to Compound/Card signature. Matches Phase 27 D-93 belt-and-suspenders convention. Tags go in footer-actions-slot per D-112. Sets the precedent for Phase 29 Project Card metadata.

- **D-112:** **Tag pills live in footer-actions-slot — Phase 25's slot-content-driven variation pattern.** Phase 25 footer-actions-slot (eNqxd) has typed-slot suggestion `slot:['M7eUr','hIWuC']` (Button defaults) per D-52. Blog Card instances override to a horizontal row of N Primitive/Badge instances (D-115 covers the primitive choice). Card stays at 4 slots. Footer-actions-slot signature stays multi-purpose: Blog cards put tag pills; Project cards (Phase 29) put 'Read More' Button + arrow icon; Service cards (deferred / out-of-scope) put icon Button. Validates Phase 25 D-49 single-component-multiple-uses claim. PEN-INVENTORY Variant Evidence row added with `## footer-actions-slot Override (Phase 28)` annotation.

- **D-113:** **Card image-slot ships Phase 25 default placeholder + sibling Pencil note.** Per Phase 27 D-93 + Phase 25 D-49: image-slot keeps the 180h light-gray placeholder rectangle (default fill `color-semantic-bg-surface-elevated`). Sibling Pencil text node at the Card frame's canvas-y position documents wiring: 'Code milestone wires image-slot to `post.data.featuredImage` (frontmatter image path).' No actual MDX-post image extracted into Pencil. v2.0 boundary preserved (no asset extraction). Crito raster image-import-NN.jpg (for DzqTm + w1m3x; plan-execution probes which index per Phase 27 § 3.4 step 0 precedent) is the calibration target for image-slot proportions and layout fidelity only, not for individual blog post imagery. Applied to all Card instances in Phase 28 (Blog index grid + Tag page grid + Section/RelatedPosts strip).

- **D-114:** **Blog index grid ships 6 Card instances in 3-col × 2-row layout.** Matches Crito agency-template register; calibration pairing against image-import-NN.jpg is faithful. Avoids implying a load-more affordance in static design (D-92 carry-forward: static design = READING state). Same composition applied to Tag page grid (joel-only branch) — 6 Card instances (or fewer if a tag has limited posts; representative density either way; plan-execution defaults to 6 for visual consistency). Section/RelatedPosts ships 3 Card instances (1 row, horizontal). Total Phase 28 Card instances: 6 (Blog index) + 6 (Tag page) + 3 (post-detail RelatedPosts) = 15 Card instances across 3 frames.

### Tag-Filter + Related-Posts Strips (Resolves Phase 26 D-79 narrow-scoping decision point)

- **D-115:** **Build `Section / TagFilter` as a NEW reusable component in `_Components / Sections` (g9oRa5) — broad-scoping per Phase 26 D-78 Section/CTA precedent.** Slot signature: `heading-slot` (optional, `enabled: false` default — Blog index + Tag page both have page-intro headings above the strip, so the strip itself doesn't need its own heading), `pills-row` (horizontal row of N tag-chip instances; one marked active via descendants override at instance time per D-117). Two consumers from day one (Blog index + Tag page) justifies factoring. Sets the family pattern for future filterable surfaces. PEN-INVENTORY Variant Evidence row per Phase 25 D-56 audit-trail discipline.

- **D-116:** **Build `Section / RelatedPosts` narrowly-scoped to blog as a NEW reusable component in `_Components / Sections` (g9oRa5).** Strict Pitfall O5/O6 prevention + Phase 26 D-79 narrow-scoping precedent. Slot signature: `heading-slot` (default text 'Related posts', `enabled: true` per Phase 25 D-53 placeholder pattern), `cards-row` (horizontal row of 3 Card instances). Single consumer in Phase 28 (Blog post detail frame). Phase 29 builds its own `Section / RelatedProjects` if needed — different component, different name, honest vocabulary per content domain ('posts' vs 'projects' differ in card content). Two named components > one generalized one because downstream agents discover by domain vocab.

- **D-117:** **Active vs inactive pill state — single TagFilter shape + descendants override at instance time.** TagFilter component has N pill children; each pill child renders the inactive variant by default (outline). Instance override via descendants at instance time changes one pill to the active variant (solid fill). Blog index instance marks the 'All Posts' pill active (first child); Tag page instances mark the current-tag pill active. Avoids variant-axis proliferation on the Section per Phase 24 D-22 caution. Matches v1.3 visual mapping (turquoise solid Button = active; outline Button = inactive). Pairs cleanly with the mix-per-consumer primitive strategy in D-118.

- **D-118:** **`Section / RelatedPosts` ships 3 full-shape Card instances — not a Compact variant, not title-only.** Second concrete Card consumer in Phase 28 (after Blog index grid + Tag page grid). Visual consistency across blog surfaces. Post-content rhythm gives the strip natural visual separation via Phase 23 section-y spacing. Calibration uses the same Card-instance pattern (metadata in title-slot + tags in footer-actions-slot + default image placeholder per D-111/D-112/D-113). Validates Phase 25 D-49 single-component-multiple-uses claim at the third concrete consumer (Blog index + Tag page + RelatedPosts strip). No Compact variant added per Phase 24 D-22 forward-state-only-on-real-consumer caution.

### Tag Chip Primitive (Hybrid Library Strategy Applied)

- **D-119:** **Mix per consumer: `Primitive / Button` (rounded-full via instance override) for TagFilter pills; `Primitive / Badge` for Card tags + post-detail tag row.** Hybrid strategy per Phase 27 D-89:
  - **TagFilter pills (interactive, active/inactive states):** instances `Primitive / Button / Default` for active pill (green/accent fill) and `Primitive / Button / Secondary` for inactive pills (outline). Descendants override sets cornerRadius to 9999 (or `radius-semantic-pill` token if D-120 plan-execution chooses to add it). Honors v1.3 mapping (`Button variant="turquoise|outline"` rounded-full).
  - **Card tags (decorative, no interaction):** instances `Primitive / Badge` (Phase 24 shipped). Likely needs a Badge variant for outline-with-subtle-bg style if Phase 24 only shipped solid-fill — plan-execution evaluates at Plan 28-00 Task probe (similar to how Phase 27 D-91 evaluated Input label-slot). If a variant is needed, ship Badge/Outline as a justified addition (real consumer is Card tags-in-footer-actions-slot per D-112).
  - **Post-detail tag row (weak-navigation affordance):** instances `Primitive / Badge` per D-121 (inline row of Badge instances in post header section).

  Zero new sibling primitives. Two existing primitives, possibly one variant addition (Badge/Outline). Resolves OPEN-25-07 Card consumer via Badge instances in footer-actions-slot.

- **D-120:** **Button rounded-full via instance-time radius override at TagFilter pill consumers — no new Button variant.** TagFilter instances Phase 24 `Button/Default` (active) and `Button/Secondary` (inactive) with descendants override setting cornerRadius. Default value: 9999 (effectively pill). If plan-execution finds 9999 hacky during Plan 28-00, raise OPEN-28-NN and propose `radius-semantic-pill` token addition (OPEN-23-12 resolution candidate). Default position: descendants override only, no new token. Matches Phase 24 D-22 forward-state-only caution + Hybrid library minimalism.

- **D-121:** **Post-detail tag row = inline horizontal row of `Primitive / Badge` instances inside the post header section, NOT another TagFilter instance.** Post detail tag chips are decorative/navigation affordances (categorization → tag page), distinct from TagFilter's filter-strip interactivity. Honest separation: TagFilter pills look Button-shaped (interactive affordance); post-detail tag chips look Badge-shaped (smaller, decorative). Matches v1.3 anchor-link styling (border + light bg, smaller than the filter strip). Tag row sits in the post header section between metadata row and featured image, per v1.3 [slug].astro lines 64-73 structural reference.

### Plan Structure

- **D-122:** **Phase 28 ships 4 plans, foundation-first.** Mirrors Phase 26 4-plan pattern + Phase 27 foundation-first ordering. Plans:
  - **28-00 — Foundation:** ships 7 new prose tokens (heading-3, heading-4, mono-primitive, inline-code, code-block, prose-link, prose-list) + Section/TagFilter + Section/RelatedPosts components + Badge variant if needed (per D-119 plan-execution evaluation). NO user-calibration gate at close per D-86 + D-102 (agent-deterministic foundation work; possible mid-plan user gate if .fig consult for heading values escalates per D-106 + Phase 26 D-72 precedent).
  - **28-01 — Blog index page frame:** crito-source-flat-raster branch (DzqTm); top-level `Blog` frame at 1440 width via `find_empty_space_on_canvas` with nodeId anchor (Phase 27 frame n0QqTd as latest); instances Section/Header + page-intro section + Section/TagFilter instance + 6-Card grid (3-col × 2-row) + Section/Footer; plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 3.4 (crito-source-flat-raster side-by-side); on APPROVE → `Update(DzqTm, { enabled: false })` per PAGE-11 ACTIVE (NEVER before APPROVE per Pitfall 4).
  - **28-02 — Blog post detail page frame:** crito-source-flat-raster branch (w1m3x); top-level `Blog Post` frame at 1440 width via `find_empty_space_on_canvas` with nodeId anchor (Blog index frame from 28-01); instances Section/Header + post header section (title heading-1 + metadata row + post-detail tag row of Badge instances per D-121 + featured-image placeholder) + post body section (exercises ALL 7 new prose tokens + carry-forward prose-paragraph from Phase 23; sample MDX content from `src/content/blog/getting-started-with-automation.mdx` per D-123) + Section/RelatedPosts instance + Section/Footer; plan-close single calibration gate per § 3.4; on APPROVE → `Update(w1m3x, { enabled: false })` per PAGE-11 ACTIVE.
  - **28-03 — Tag page frame:** joel-only-no-crito-ref branch; top-level `Tag` frame at 1440 width via `find_empty_space_on_canvas` with nodeId anchor (Blog post detail frame from 28-02); instances Section/Header + page-intro section ('Posts tagged "<tag>"' + post count subhead, content STUB per D-82 since v1.3 has no Tag page page-intro beyond a generated string) + Section/TagFilter instance (current-tag pill marked active per D-117) + 6-Card grid + Section/Footer; plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 4.5 (joel-only token-usage format); PAGE-11 INERT per § 4.3 (no Crito source to remove).

  Sequential, no waves. Foundation-first because per-page plans have deep dependencies on prose tokens + Section components. Index before detail because detail's post body section is the heaviest prose-token validation surface (saving the highest-stakes plan for last gives the protocol the most adaptive room). Tag page last as joel-only contrast — validates that Phase 28's tools work across both branches in one phase (Phase 27 dual-branch precedent).

- **D-123:** **Plan 28-02 post body section ships verbatim from `src/content/blog/getting-started-with-automation.mdx`.** Per D-82 + D-98 precedent (Phase 26 + Phase 27 content-verbatim discipline extended). The sample MDX is the prose-token validation consumer per ROADMAP success criterion 2 ('A blog post body in the reconstructed post frame uses prose semantic tokens — verified by populating sample prose content that exercises every prose token'). The MDX exercises: H1 (title), H2 (## Why Automate? / ## Start Simple / ## What's Next?), H3 (### Example: Invoice Follow-ups), unordered list (4-item bullet list), numbered list (3-item numbered list), inline code (`Backticks within sentence`), code block (JavaScript fenced code block), italic (*one closing sentence*), link (`[Get in touch](/contact)`), and horizontal rule (`---`). Every Phase 28 prose token has a direct consumer in this sample. Fidelity label per D-83: post body section = EXACT (every property token-bound + content verbatim from MDX). Out of scope: extracting both MDX files (`im-pivoting.mdx` too) — single sample sufficient for validation per D-86 foundation-plan minimalism.

- **D-124:** **Per-plan calibration gates — single AskUserQuestion at plan close per CALIBRATION-PROTOCOL § 3.4 / § 4.5.**
  - **Plan 28-00 closes WITHOUT a user gate** at default — pure foundation work (7 tokens + 2 components); no per-page content to spot-check. Mid-plan gate ONLY IF `.fig` consult for heading-3/-4 values escalates per D-106 (Phase 26 D-72 mechanic carry-forward).
  - **Plan 28-01 closes WITH a single calibration gate** per § 3.4 (crito-source-flat-raster format) — covers page-intro + TagFilter strip + 6-Card grid fidelity proposals + DzqTm raster pairing.
  - **Plan 28-02 closes WITH a single calibration gate** per § 3.4 (crito-source-flat-raster format) — covers post header + post body (PRIMARY prose-token validation) + Section/RelatedPosts strip fidelity proposals + w1m3x raster pairing.
  - **Plan 28-03 closes WITH a single calibration gate** per § 4.5 (joel-only token-usage format) — covers page-intro + TagFilter (active state) + 6-Card grid fidelity proposals + token-usage check vs RpGbe.

### Cross-Cutting / Carry-Forward

- **D-125:** **Pre-flight `mcp__pencil__get_editor_state` enforcement carries forward** from Phase 23 OPEN-23-14 → Phase 24 D-35 → Phase 25 D-54 → Phase 26 D-87 → Phase 27 D-103. Every Phase 28 plan that calls `set_variables`, `batch_design`, `find_empty_space_on_canvas`, or any Pencil-mutating tool first calls `mcp__pencil__get_editor_state({ include_schema: false })` and asserts active editor == `design/Crito.pen`. Halt and surface to user on mismatch. No exceptions.

- **D-126:** **PEN-INVENTORY extension pattern carries forward** from Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 / Phase 27 D-104. Phase 28 adds:
  - New rows for `Blog`, `Blog Post`, and `Tag` to the Frames Inventory table (Blog index: scope `IN-SCOPE`, joel_page_map `/blog`, status moves from `flat:1` to `reconstructed-PHASE-28` after Plan 28-01 PAGE-11 ACTIVE branch hides DzqTm raster; Blog post detail: same pattern with w1m3x; Tag page: scope `joel-only-no-crito-ref`, joel_page_map `/blog/tags/[tag]`, status `reconstructed-PHASE-28`)
  - Variant Evidence rows for: 7 new prose tokens (Token Extensions section); Section/TagFilter slot signature; Section/RelatedPosts slot signature; Card title-slot descendants-override metadata pattern; Card footer-actions-slot Badge instances pattern; Badge/Outline variant if added (per D-119 plan-execution decision)
  - New section `## Open Flags — Phase 28 (OPEN-28-NN)` populated by any plan-surfaced flags (likely candidates: heading-3/-4 .fig escalation if needed, mono-family choice if .fig silent, image-import-NN.jpg index identification for DzqTm + w1m3x at plan execution, prose-paragraph 'provisional' flag verification outcome per D-110)
  - Updates to OPEN-23-05 (Blog index DzqTm + Blog Details w1m3x partial-resolution post-APPROVE), OPEN-23-10 (heading-3 + heading-4 partial-resolution; heading-5/-6 remain), OPEN-23-11 (RESOLVED — prose-link + prose-list + prose-inline-code all shipped; prose-code-block added as bonus per D-108), OPEN-25-07 (Card consumer-resolution at three Phase 28 consumer sites)
  - PAGE-11 status updates: `DzqTm` moves from flat to hidden-via-enabled:false in `status_counts` post-28-01 APPROVE; `w1m3x` same post-28-02 APPROVE
  - New `## Calendly Wiring Map (Phase 27)` reference — no Phase 28 surface adds to this map; only OPEN-23-05 remaining flat-raster rows (06_Service Details, 05_Service, 04_About) carry forward to Phase 29 token-mining-only

### Claude's Discretion

- **Auto-layout vs absolute positioning at the page-frame level** — Phase 26/27 plan-execution lean was auto-layout vertical-stack at page level. Phase 28 carries forward.
- **Exact `type-semantic-heading-3` + heading-4 values** — D-106 says interpolation default (24 and 20) if .fig unreadable. If visual rendering at Plan 28-02 calibration looks wrong (e.g., heading-3 visually identical to heading-2), plan-execution may revisit via OPEN-28-NN.
- **Exact `type-primitive-family-mono` value** — D-108 default system mono stack if .fig silent. If Joel has a preference (e.g., JetBrains Mono, Fira Code, Cascadia Code), surface at Plan 28-00 mid-plan gate; otherwise system stack ships.
- **inline-code + code-block padding/border specifics** — D-108 provides defaults (4px h-padding + 1px border for inline; 16px padding for block). Plan-execution may refine if Crito raster shows different convention.
- **Whether Badge needs an Outline variant or descendants-override at Card consumer** — D-119 plan-execution-evaluates at Plan 28-00 Task probe. Default: descendants override if Phase 24 Badge surface already covers the visual; new Badge/Outline variant if not.
- **Tag-filter pill count shipped in Pencil instance** — v1.3 has 3 tags (automation, small-business, productivity) plus "ai" candidate in `im-pivoting.mdx`. Plan-execution ships representative N (default 5 pills including 'All Posts'); calibration target is the agency-template density (image-import-NN.jpg likely shows 4–6 pills).
- **post-detail tag row placement** — D-121 default is in the post header section between metadata row and featured image (matches v1.3 [slug].astro structural pattern). If Crito w1m3x raster shows tags below post body OR in a sidebar, plan-execution may reposition.
- **OPEN-26-02 stale-cache get_screenshot quirk on 3 new page frames** — CALIBRATION-PROTOCOL § 6.4 Tier-1 (cross-row Update) + § 6.4 Tier-2 (user editor verification fallback) workarounds available; Phase 28 plans inherit. Likely stale-cache surfaces on all 3 new frames per Plan 26-02 + 27-01 + 27-02 precedent — Tier-2 fallback at calibration gates is the production-proven path.
- **Per-plan `snapshot_layout({ problemsOnly: true })` discipline at plan close** — matches Phase 24/25/26/27 plan-close discipline. Default: yes, runs at every plan-close, documented in 28-NN-SUMMARY.md with text-clipping false-positive caveat per Phase 24/25/26/27 precedent (likely exceeds prior counts due to multi-paragraph post body prose).
- **Tag page page-intro composition** — v1.3 [tag].astro renders 'Posts tagged "X"' heading + post count subhead generated dynamically. Plan 28-03 ships representative content (e.g., 'Posts tagged "automation"' + '3 posts about automation') with sibling note per D-93 belt-and-suspenders documenting the dynamic generation pattern for code-milestone wiring.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment context, single-file strategy, desktop-only scope, "content untouched" boundary (informs D-123 sample MDX verbatim treatment).
- `.planning/REQUIREMENTS.md` — Phase 28 requirements: PAGE-03 (Blog index + post + tag page), PAGE-09 (desktop-only), PAGE-11 (raster-removal-only-after-verify — ACTIVE for Blog index + Blog post detail; INERT for Tag page per CALIBRATION-PROTOCOL § 3.3 / § 4.3), TOKEN-06 (prose typography tokens — Phase 28 ships heading-3/-4 + prose-link + prose-list + prose-inline-code + prose-code-block + mono-primitive), VALID-01 (per-section fidelity labels — D-83 carry-forward), VALID-02 (calibration artifact — branch-redefined per § 3.1 / § 4.1), VALID-03 (gap declaration).
- `.planning/ROADMAP.md` § "Phase 28" — Goal, Depends on (Phase 27), Success Criteria. **Important nuance:** Success criterion 2 ('A blog post body in the reconstructed post frame uses prose semantic tokens — verified by populating sample prose content that exercises every prose token') drives D-123 sample MDX verbatim treatment. Success criterion 3 ('related-posts strip and tag-filter strip exist as factored section-level components or compound instances') drives D-115 + D-116 component-factoring decisions.
- `.planning/STATE.md` — current position: Phase 27 COMPLETE, Phase 28 ready to plan.

### CALIBRATION-PROTOCOL.md (definition-of-done framework — must-read at every per-page plan)
- `.planning/research/CALIBRATION-PROTOCOL.md` — Phase 26 Plan 26-03 codify-what-worked.
  - **§ 2 Branch Decision Tree** — Blog index + Blog post detail = crito-source-present flat-raster sub-case; Tag page = joel-only-no-crito-ref.
  - **§ 3 crito-source-present branch protocol** — § 3.1 VALID-02 (side-by-side with image-import-*.jpg raster); § 3.3 PAGE-11 ACTIVE (hide `DzqTm` after 28-01 APPROVE; hide `w1m3x` after 28-02 APPROVE); § 3.4 per-step script for both crito-source plans.
  - **§ 4 joel-only-no-crito-ref branch protocol** — § 4.1 VALID-02 (token-usage check vs `RpGbe` `_Tokens & Foundations`); § 4.3 PAGE-11 INERT for Tag page; § 4.4 per-step script; § 4.5 AskUserQuestion format for calibration gate.
  - **§ 6.4 OPEN-26-02 stale-cache workaround tiering** — Tier-1 (cross-row Update) + Tier-2 (user editor verification fallback) — likely needed on all 3 new page frames per Plan 27 precedent.
  - **§ 10.4 FindEmptySpace `nodeId` anchor pattern** — Phase 28 plans use nodeId anchors: Plan 28-01 uses Phase 27 Contact frame n0QqTd; Plan 28-02 uses Blog index frame from 28-01; Plan 28-03 uses Blog post detail frame from 28-02.

### Phase 27 carry-forward (Phase 28 inherits these decisions directly)
- `.planning/phases/27-thank-you-contact-reconstruction/27-CONTEXT.md` — Phase 27 decisions D-89 through D-104. Especially **D-89** (Hybrid library strategy — D-119 mix-per-consumer extends this), **D-93** (Calendly sibling-note belt-and-suspenders convention — D-113 image-slot-wiring note extends), **D-97** (v1.3 content extraction discipline — D-123 sample MDX verbatim extends), **D-98** (v1.3 verbatim across text-bearing surfaces — extended to post body), **D-100** (lucide-native Pattern A glyph swap — usable for code-block decoration if needed), **D-101** (foundation-first plan ordering — D-122 mirrors), **D-102** (per-plan calibration gates with foundation-no-gate exception — D-124 mirrors), **D-103** (pre-flight active-editor — D-125 carry-forward), **D-104** (PEN-INVENTORY extension pattern — D-126 extends).
- `.planning/phases/27-thank-you-contact-reconstruction/27-00-SUMMARY.md` (when published post-Phase 27 execution) — primitive additions: Primitive/Input/Textarea variant + Primitive/Select Default/Focus/Error + Primitive/Checkbox Default/Focus/Error + Compound/CheckboxGroup. Phase 28 does NOT consume these (no form surface in blog frames).
- `.planning/phases/27-thank-you-contact-reconstruction/27-01-SUMMARY.md` — Thank-you joel-only execution; calibration spot-check format Phase 28 Tag page inherits per § 4.5.
- `.planning/phases/27-thank-you-contact-reconstruction/27-02-SUMMARY.md` — Contact crito-source-flat-raster execution + PAGE-11 ACTIVE first production use (cl8tt = image-import-18.jpg). Phase 28 Plans 28-01 + 28-02 are second + third production uses of PAGE-11 ACTIVE.

### Phase 26 carry-forward (Phase 28 inherits via Phase 27 chain)
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-CONTEXT.md` — Phase 26 decisions D-58 through D-88. Especially **D-58** (fresh-in-Crito-vocab — extends to Tag page joel-only; crito-source pages already use raster as visual target), **D-65** (single calibration gate per plan — D-124 carry-forward), **D-66** (CALIBRATION-PROTOCOL branch matrix — Phase 28 second phase to use BOTH branches in one phase after Phase 27), **D-71** (prose-paragraph 'provisional' flag verification — D-110 Phase 28 is higher-confidence verifier), **D-72** (type-semantic-heading-2 source-derivation pattern — D-106 mirrors for heading-3/-4), **D-78** (Section/CTA broad-scoping — D-115 Section/TagFilter mirrors broad-scoping rationale; two consumers from day one), **D-79** (Section/NavBack narrow-scoping — D-116 Section/RelatedPosts mirrors narrow-scoping rationale; one consumer), **D-82** (v1.3 content verbatim where v1.3 has truth — D-123 sample MDX extends), **D-83** (per-section fidelity labels — D-118 + D-122 inherit), **D-86** (foundation plans close without user gate — D-124 carry-forward), **D-87** (pre-flight active-editor — D-125 carry-forward), **D-88** (PEN-INVENTORY extension pattern — D-126 extends).

### Phase 25 component library (Phase 28 instances + extends these)
- `.planning/phases/25-section-compound-components/25-CONTEXT.md` — Phase 25 decisions D-38 through D-57. Especially **D-38** (Crito-source nav labels stay literal — informs Header instances on all 3 Phase 28 frames), **D-49** (single Card serves all card types via slot content — D-111 + D-112 + D-118 inherit; first concrete validation), **D-52** (Pencil 2.13 typed-slot suggestion-only + sibling note belt-and-suspenders — D-115 Section/TagFilter slot signature + D-116 Section/RelatedPosts slot signature inherit), **D-53** (`enabled: true` placeholder slots — D-115 heading-slot enabled:false + D-116 heading-slot enabled:true with 'Related posts' default).
- `.planning/phases/25-section-compound-components/25-01-SUMMARY.md` — Section/Header structural details: G0wNOc inside g9oRa5; 6 Crito-source nav labels (Phase 28 Header instances inherit as-is per D-77 carry-forward); Primitive/Button/Secondary `hIWuC` available — used by D-119 TagFilter inactive pills.
- `.planning/phases/25-section-compound-components/25-02-SUMMARY.md` — Section/Footer structural details: Xs0Hs inside g9oRa5; Phase 28 Footer instances inherit as-is per D-77 carry-forward.
- `.planning/phases/25-section-compound-components/25-03-SUMMARY.md` — Compound/Card structural details: t40xct inside t67DU6; 4-slot signature (image / title / body / footer-actions); FGdti image-slot id + vGH3A title-slot id + oTSwn body-slot id + eNqxd footer-actions-slot id; Phase 28 Card instances per D-111 (title-slot descendants override) + D-112 (footer-actions-slot Badge instances) + D-113 (image-slot default placeholder + sibling note).

### Phase 24 primitive library (Phase 28 instances + extends these)
- `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md` — Phase 24 decisions D-21 through D-37. Especially **D-22** (Default/Focus/Error compositional minimum forward states — D-119 informed for Badge variant evaluation), **D-26** (source-driven glyph enumeration — relevant if Plan 28-02 post body needs lucide-native glyphs for code-block decoration), **D-33** (open token-extension policy — D-105 + D-106 + D-107 + D-108 + D-109 cite open-extension for prose tokens with real consumers), **D-35** (pre-flight active-editor — D-125 carry-forward).
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — primitive ids: Button/Default (M7eUr), Button/Secondary (hIWuC, Phase 25-01 addition), Badge (xxx — TBD from Phase 24), Icon/24 (u7NmaS — plus 16/20/32 variants). Phase 28 instances: Button/Default + Button/Secondary for TagFilter pills per D-119/D-120; Badge for Card tags + post-detail tags per D-119/D-121.

### Phase 23 token foundation (Phase 28 extends prose token surface)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — token-naming convention (D-12 flat-dash), components-reference-semantic-only (D-14 — D-105 new prose tokens follow), OPEN-flag policy (D-09 — informs all OPEN-28-NN additions), PEN-INVENTORY plain-markdown discipline (D-18 — carry-forward chain), Crito .fig fallback (D-04 — informs D-106 + D-107 + D-108 plan-probes).
- Phase 23 OPEN flags Phase 28 resolves or partially resolves:
  - **OPEN-23-05** — Phase 28 reconstructs `DzqTm` (07_Blog) + `w1m3x` (08_Blog Details); PAGE-11 ACTIVE — hide both rasters after APPROVE. Partially resolves the remaining flat-raster surface (still leaves 04_About, 05_Service, 06_Service Details for Phase 29 token-mining-only).
  - **OPEN-23-10** — heading-3 + heading-4 ship per D-106 (partial resolution; heading-5/-6 remain).
  - **OPEN-23-11** — prose-link + prose-list + prose-inline-code all ship per D-107 + D-108 + D-109; bonus prose-code-block added per D-108 (FULL RESOLUTION).
  - **OPEN-23-12** — `radius-semantic-pill` deferred to Plan 28-00 plan-execution evaluation per D-120 default-position (no new token unless 9999 reads hacky during execution).

### Phase 25 + 26 + 27 OPEN flags Phase 28 partially resolves
- **OPEN-25-07** — Phase 28 is the FIRST concrete Card consumer per Phase 25 D-50. Three concrete consumer sites: Blog index grid (6 instances) + Tag page grid (6 instances) + Section/RelatedPosts strip (3 instances) = 15 Card instances across 3 frames. Locks Card values via instance overrides per D-111 + D-112 + D-113.
- **OPEN-26-01** — heading-2 interpolation default holds for FAQ + Phase 27 surfaces; Phase 28 D-106 extends interpolation pattern to heading-3 + heading-4 with possible .fig escalation per Phase 26 mechanic.
- **OPEN-26-02** — stale-cache get_screenshot quirk; CALIBRATION-PROTOCOL § 6.4 Tier-1/Tier-2 workarounds available; Phase 28 plans inherit fallback path (likely triggers on all 3 new frames per Phase 27 + Phase 26 precedent).

### Audit / inventory source (read for every plan in Phase 28)
- `.planning/research/PEN-INVENTORY.md` — single source of truth. Phase 28 plans read:
  - Frame classifications: `DzqTm` (07_Blog) IN-SCOPE flat:1 → status moves to `reconstructed-PHASE-28` after Plan 28-01 PAGE-11 ACTIVE branch; `w1m3x` (08_Blog Details) IN-SCOPE flat:1 → status moves to `reconstructed-PHASE-28` after Plan 28-02 PAGE-11 ACTIVE branch
  - Token surface (100 tokens after Phase 27 per D-91 zero-new-tokens; Phase 28 adds 7 new tokens per D-105 → 107 tokens after Plan 28-00)
  - Phase 23/24/25 Open Flags Phase 28 may resolve at calibration gates (listed above)
  - Phase 28 adds OPEN-28-NN rows per D-126
- `.planning/research/exports/v2.0/end-of-phase-27/id-inventory.json` (when published post-Phase 27 execution) — structural snapshot of `Crito.pen` after Phase 27. Plan 28-00 reads this to know primitive + section + compound ids to instance + baseline ids that must not be mutated. Includes n0QqTd (Contact frame for D-122 + § 10.4 FindEmptySpace anchor on Plan 28-01).

### Ground-truth source files (Phase 28 reads these via Pencil MCP, not direct file I/O)
- `design/Crito.pen` — the work surface. Phase 28 mutates:
  - NEW: 7 prose tokens via `set_variables` (D-105 — heading-3, heading-4, mono-primitive, inline-code, code-block, prose-link, prose-list)
  - NEW: `Section / TagFilter` inside `_Components / Sections` (g9oRa5) per D-115
  - NEW: `Section / RelatedPosts` inside `_Components / Sections` (g9oRa5) per D-116
  - POSSIBLE NEW: Badge/Outline variant inside `_Components / Primitives` (avgor) per D-119 plan-execution evaluation
  - NEW: `Blog` page frame per D-122 Plan 28-01
  - NEW: `Blog Post` page frame per D-122 Plan 28-02
  - NEW: `Tag` page frame per D-122 Plan 28-03
  - MUTATE: `DzqTm` raster — `enabled: false` after Plan 28-01 APPROVE (PAGE-11 ACTIVE per § 3.3)
  - MUTATE: `w1m3x` raster — `enabled: false` after Plan 28-02 APPROVE (PAGE-11 ACTIVE per § 3.3)
  - Existing frames (Phase 23–27 components + page frames + library parents) are read-only inputs.
- `design/images/image-import-*.jpg` — Phase 28 Plans 28-01 + 28-02 probe-first identifies which image-import-NN.jpg matches `DzqTm` and `w1m3x` (Phase 27 § 3.4 step 0 precedent identified cl8tt = image-import-18.jpg); each ships as `--side-by-side.png` calibration artifact identifier per § 3.5.
- `design/images/Consulting & Agency Website Template I Crito (Community).fig` — fallback ground-truth per Phase 23 D-04. Plan 28-00 attempts consultation for heading-3/-4 values (D-106), prose-link styling (D-107), and mono-primitive family (D-108). RESEARCH § Focus 3 + Plan 26-00 OPEN-26-01 outcome: .fig is zipped Figma binary unreadable by executing agent — expect to fall back to interpolation defaults + Joel preference gates.
- `src/content/blog/getting-started-with-automation.mdx` (lines 1–62 — full file) — Joel's v1.3 sample MDX. Content extraction per D-123: full post body (title, 3 H2 sections + 1 H3 section, unordered list, numbered list, inline code, JavaScript code block, italic, link, horizontal rule) ships verbatim into Plan 28-02 post body section. Visual style (Bricolage Grotesque + neobrutalist accent) explicitly NOT inherited per D-58 carry-forward.
- `src/content/blog/im-pivoting.mdx` — second MDX file (not used by Phase 28 per D-123 single-sample-sufficient discipline). Available as supplementary reference if Plan 28-02 needs additional prose surface variety.
- `src/pages/blog/index.astro` (lines 1–185) — Joel's v1.3 Blog index page source. Content extraction per D-98 carry-forward: page intro heading ('Blog') + body ('Practical insights on automation, AI, and custom software for small businesses. Learn how to work smarter, not harder.') + 'All Posts' filter pill label + 'Load More Posts' button label (Load More deferred to runtime per D-92 carry-forward). Visual style (neobrutalist filter buttons) explicitly NOT inherited per D-58 carry-forward.
- `src/pages/blog/[slug].astro` (lines 1–113) — Joel's v1.3 Blog post detail page source. Content extraction per D-121 + D-123: 'Back to Blog' link label (deferred to runtime) + three-column TOC layout pattern (deferred to code-milestone per static-design = READING-state convention; Plan 28-02 ships single-column with possible left-aligned TOC stub) + post header structure (title → metadata row → tag row → featured image → body) ships as structural reference. Visual style (3-col grid + neobrutalist border) explicitly NOT inherited per D-58 carry-forward.
- `src/pages/blog/tags/[tag].astro` (lines 1–95) — Joel's v1.3 Tag page source. Content extraction per D-122 Plan 28-03: page header structure (back link → 'Posts tagged "X"' heading → post count subhead) ships as structural reference; visual style not inherited per D-58.
- `src/components/BlogCard.astro` (lines 1–79) — Joel's v1.3 BlogCard component. Content extraction: 4-slot composition pattern (image → title → metadata-row → excerpt → tags) ships as structural reference; informs D-111 (metadata in title-slot descendants) + D-112 (tags in footer-actions-slot) decisions. Visual style (neobrutalist border + turquoise shadow) explicitly NOT inherited per D-58.

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — themes T1 (variables-first — Phase 28 adds 7 prose tokens as foundation per real consumer demand; not pre-emptively), T5 (don't repeat v1.4 — calibration gates enforce per-section labels), T6 (single-file strategy — 3 new Phase 28 frames inside `Crito.pen`), T8 (component variants on-demand only — D-119 Hybrid library minimalism; D-122 4-plan structure adds new components only where evidence supports).
- `.planning/research/STACK.md` — Pencil MCP tool catalogue. `find_empty_space_on_canvas` with `nodeId` anchor (§ 10.4 + D-122), `get_screenshot` (calibration artifacts — inline-only per OPEN-23-01 substitution), `set_variables` (Plan 28-00 — 7 new tokens), `batch_design` (3 new page frames + 2 new Section components + possible Badge variant).
- `.planning/research/PITFALLS.md` — O5/O6 (premature token hierarchies + component-library bloat — D-105 ships only the 7 prose tokens Joel's sample MDX exercises; D-116 RelatedPosts narrow-scoping; D-119 mix-per-consumer instead of new Tag primitive), F3 (no eyedropping from raster — image-import-NN.jpg for DzqTm/w1m3x is visual calibration target, NOT a token-mining source; tokens come from Crito .fig consult or interpolation), Pitfall 1 (no inventing primitives/tokens without source — D-106 + D-107 + D-108 + D-109 all source-evidence-justified by sample MDX).

### Pencil MCP guidance (consulted during execution, not pre-read at planning)
- `mcp__pencil__get_editor_state({ include_schema: false })` — call FIRST in every 28-NN plan per D-125.
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call at start of Plan 28-00 (new prose token authoring guidance, Section component slot mechanics).
- `mcp__pencil__get_variables({})` — call to verify 100-token surface intact at Plan 28-00 start; re-call after each `set_variables` batch to verify token additions resolve correctly per D-126.
- `mcp__pencil__batch_get` — verify baseline IDs intact (Phase 23–27 components + page frames + library parents); read DzqTm + w1m3x structural state pre-PAGE-11 ACTIVE.
- `mcp__pencil__batch_design` — Plan 28-00 (7 token writes + Section/TagFilter + Section/RelatedPosts + possible Badge variant), Plan 28-01 (Blog index frame + content), Plan 28-02 (Blog post detail frame + post body content + RelatedPosts instance), Plan 28-03 (Tag page frame + content).
- `mcp__pencil__find_empty_space_on_canvas` — Plan 28-01 + 28-02 + 28-03 page-frame placement per § 10.4 (nodeId anchor pattern: 28-01 anchors on n0QqTd; 28-02 anchors on Blog index frame from 28-01; 28-03 anchors on Blog post detail frame from 28-02).
- `mcp__pencil__set_variables` — Plan 28-00 (7 new prose tokens — heading-3 composite, heading-4 composite, mono-primitive, inline-code composite, code-block composite, prose-link composite, prose-list composite).
- `mcp__pencil__get_screenshot` — calibration artifacts per § 3.4 step 4 + § 4.4 step 9 (inline-only, NOT disk-written).
- `mcp__pencil__snapshot_layout({ problemsOnly: true })` — per-plan close per Phase 24/25/26/27 precedent.

### Outputs this phase produces (referenced by Phase 29+)
- 3 new page frames in `design/Crito.pen`: `Blog` (IN-SCOPE, PAGE-11 ACTIVE applied) + `Blog Post` (IN-SCOPE, PAGE-11 ACTIVE applied) + `Tag` (joel-only-no-crito-ref, PAGE-11 INERT).
- 7 new prose tokens: type-semantic-heading-3-*, type-semantic-heading-4-*, type-primitive-family-mono, type-semantic-prose-inline-code-*, type-semantic-prose-code-block-*, type-semantic-prose-link-*, type-semantic-prose-list-*.
- 2 new Section components: `Section / TagFilter` (broad-scoping per D-115) + `Section / RelatedPosts` (narrow-scoping per D-116) inside g9oRa5.
- Possible Badge/Outline variant inside avgor (per D-119 plan-execution evaluation).
- `.planning/research/PEN-INVENTORY.md` extensions per D-126.
- `.planning/research/exports/v2.0/end-of-phase-28/id-inventory.json` — structural snapshot per OPEN-23-01 substitution pattern (matches Phase 23 / 24 / 25 / 26 / 27 precedent).

</canonical_refs>

<code_context>
## Existing Code Insights

**Phase 28 makes NO `src/` code changes.** v2.0 is `.pen`-file-only (per PROJECT.md + REQUIREMENTS.md Out of Scope). The code-side observations below are content-extraction context only — they do NOT shape Phase 28 visual decisions (D-58 carry-forward: Crito visual register, not v1.3 neobrutalist mirror).

### Reusable Assets (content-only references, not visual references)
- `src/content/blog/getting-started-with-automation.mdx` (lines 1–62) — Joel's v1.3 sample MDX post (currently `draft: true`). Full post body ships verbatim into Plan 28-02 post body section per D-123. Exercises every Phase 28 prose token: H1 (title from frontmatter), H2 ('## Why Automate?' / '## Start Simple' / '## What's Next?'), H3 ('### Example: Invoice Follow-ups'), bulleted list (4 items: Email responses / Invoice reminders / Data entry / Social media), numbered list (3 items: Happens frequently / Follows same steps / Doesn't require human judgment), inline code (`Backticks within sentences`), JavaScript code block (8-line fenced), italic (`*Have a process...*`), link (`[Get in touch](/contact)`), horizontal rule (`---`). Single sample sufficient for prose-token validation per D-123.
- `src/content/blog/im-pivoting.mdx` — second MDX file. Not used by Phase 28 per D-123 minimalism (sample sufficient); available as supplementary if Plan 28-02 needs additional prose variety.
- `src/pages/blog/index.astro` (lines 1–185) — v1.3 Blog index. Content extraction: 'Blog' page heading + 'Practical insights...' body (lines 32–37) + 'All Posts' filter pill label (line 53). 9-card initial render + load-more pattern (lines 87–96, 175–182) is RUNTIME behavior — static design ships 6-card representative density per D-114. Visual style (neobrutalist Button-based filter pills) explicitly NOT inherited per D-58.
- `src/pages/blog/[slug].astro` (lines 1–113) — v1.3 Blog post detail. Content extraction: post header structure (title → metadata row → tag row → featured image → body) drives D-121 structural reference. 3-col TOC layout (lines 44–82) deferred per D-122 (single-column ships in Plan 28-02; TOC affordance is runtime concern). Tag-chip styling on lines 64–73 (border + bg + hover effects) informs D-119 + D-121 visual mapping. Visual style (3-col grid + neobrutalist) explicitly NOT inherited per D-58.
- `src/pages/blog/tags/[tag].astro` (lines 1–95) — v1.3 Tag page. Content extraction: 'Back to all posts' link + 'Posts tagged "X"' heading + N posts count subhead (lines 47–62) drives D-122 Plan 28-03 page-intro composition. v1.3 Tag page has NO filter strip (just a back-link); Phase 28 D-117 INTRODUCES the filter strip on Tag page (active pill = current tag) for cross-page consistency with Blog index. Visual style not inherited per D-58.
- `src/components/BlogCard.astro` (lines 1–79) — v1.3 BlogCard. 4-section composition (image / title-and-metadata / excerpt / tags) drives D-111 + D-112 Card-instance overrides. v1.3's 16:9 image aspect ratio (line 27) informs default Card image-slot 180h sizing per Phase 25 D-49 (which already 180h via raster-probe). Visual style (`shadow-neo-turquoise` + `border-[4px]`) NOT inherited per D-58.

### Established Patterns (Pencil-side, ARE Phase 28 inputs)
- **Variables-first → primitives → compounds → sections → page frames** — Phase 23 tokens, Phase 24 primitives, Phase 25 compounds + sections, Phase 26 first per-page reconstruction phase + foundation extension, Phase 27 second per-page phase + foundation extension (form primitives), Phase 28 third per-page phase + biggest foundation extension yet (7 prose tokens + 2 Section components).
- **Single-file strategy** — everything in `design/Crito.pen`. 3 new page frames placed at the page-frame row (y ≈ −4111) via FindEmptySpace nodeId anchor pattern from CALIBRATION-PROTOCOL § 10.4.
- **OPEN-flag system** — Phase 28 resolves OPEN-23-11 fully + OPEN-25-07 + partials of OPEN-23-05 / OPEN-23-10; introduces OPEN-28-NN per D-126.
- **Pre-flight active-editor assertion** — D-125 carries forward from Phase 23 OPEN-23-14 onward.
- **Plain-markdown audit trails** — Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 / Phase 27 D-104 / Phase 28 D-126 chain.
- **Probe-first within plans** — Phase 24/25/26/27 established. Phase 28 Plan 28-00 probes Crito .fig for prose-token values + existing Badge variant surface; Plans 28-01 + 28-02 probe which image-import-*.jpg corresponds to DzqTm + w1m3x.
- **Belt-and-suspenders sibling-note documentation** — Phase 25 D-52 / Phase 26 D-78 / Phase 27 D-93 pattern. D-113 inherits for image-slot wiring notes; the Calendly Wiring Map pattern from D-93 may inform future image-wiring-map sections if Phase 31 needs them.
- **Per-section fidelity labels with LAYOUT/TEXT split** — D-83 (Phase 26) precedent. Phase 28: post body section is EXACT (token-bound + verbatim from MDX); page-intro sections EXACT (verbatim from v1.3 source); Section component instances EXACT (Phase 25 shipped); Tag page page-intro STUB (placeholder string until code-milestone generates dynamic content per D-122 Claude's Discretion).
- **CALIBRATION-PROTOCOL branch matrix** — Phase 28 is the second phase to use BOTH branches in one phase (after Phase 27). Blog index + Blog post detail crito-source-flat-raster; Tag page joel-only-no-crito-ref. PAGE-11 ACTIVE twice in one phase (DzqTm + w1m3x) — first phase to apply PAGE-11 ACTIVE multiply.

### Integration Points
- **Phase 28 prose token surface bridges code-milestone MDX rendering** — astro-expressive-code syntax-highlight colors wire into D-108's prose-code-block token at code-milestone time. Joel's prose tokens become the CSS variable surface the code milestone exports via `--type-semantic-prose-*` CSS vars.
- **Section/TagFilter is the bridge** to future filterable surfaces — if Phase 31 Homepage adds a category-filtered project strip, Section/TagFilter (or a sibling Section/CategoryFilter) is the precedent.
- **Compound/Card consumer-resolution** — Phase 28 is the first consumer per OPEN-25-07. Phase 29 (Projects) is the second consumer; D-111 + D-112 patterns inform Phase 29 Project Card composition.
- **Phase 25 Section/Header + Footer** — fourth + fifth pages instance them (FAQ, 404, Thank-you, Contact, Blog index, Blog post detail, Tag = 7 total page-frame instances by end of Phase 28). Cross-page consistency validated across 7 surfaces.
- **Phase 26 Section/CTA** — NOT consumed in Phase 28 (blog frames don't have CTA sections per ROADMAP analysis); next consumer is likely Phase 31 Homepage.
- **prose-paragraph 'provisional' flag verification** — Phase 28 Plan 28-02 calibration gate is the higher-confidence verifier per Phase 26 D-71 carry-forward. APPROVE → flag removed in PEN-INVENTORY.

</code_context>

<specifics>
## Specific Ideas

- **The prose token surface (D-105 through D-110) is Phase 28's headline deliverable** — 7 new tokens, each source-evidence-justified by Joel's sample MDX. Resolves OPEN-23-11 entirely + partially resolves OPEN-23-10. This is the largest token addition since Phase 23 itself (Phase 24 + 25 = 0 new tokens; Phase 26 = 1 token; Phase 27 = 0 tokens; Phase 28 = 7 tokens). Sets up code-milestone's MDX rendering pipeline.
- **The single-MDX-sample validation (D-123) is the most efficient prose-token verification** — one post body exercises all 7 new prose tokens + carry-forward prose-paragraph (Phase 23) + heading-1 (Phase 23) + heading-2 (Phase 26). Single source of truth for the calibration gate; no need to populate multiple post bodies.
- **The mix-per-consumer tag-chip strategy (D-119) honors v1.3's actual mapping** — TagFilter pills ARE interactive Buttons (active/inactive); Card + post-detail tag chips ARE decorative/weak-navigation Badges. Two different shapes, two different primitives, no new primitive needed. Hybrid library strategy (Phase 27 D-89) extended.
- **Section/TagFilter broad-scoping (D-115) vs Section/RelatedPosts narrow-scoping (D-116) is deliberate** — same phase, opposite scoping policies, justified by consumer count: TagFilter has 2+ consumers from day one (Blog index + Tag page); RelatedPosts has 1 consumer (Blog post detail). Phase 26 D-78 + D-79 precedent extended.
- **The Card consumer resolution (D-111 through D-114) is Phase 28's biggest validation of Phase 25 D-49** — 15 Card instances across 3 frames, all using slot-content variation rather than variant-axis proliferation. Title-slot descendants override for metadata; footer-actions-slot for tags (instead of Button); default image-slot placeholder + sibling wiring note. Phase 29 Projects inherits the same pattern for Project cards.
- **PAGE-11 ACTIVE applied TWICE in one phase (D-122 Plans 28-01 + 28-02) is a Phase 28 first** — Phase 27 applied PAGE-11 ACTIVE once (cl8tt = image-import-18.jpg). Phase 28 raises the multiplicity: DzqTm + w1m3x both hidden post-APPROVE. Tests CALIBRATION-PROTOCOL § 3.3 at scale; the production-proven pattern from Phase 27 carries forward.
- **4-plan structure with foundation-first ordering (D-122)** is the right shape — Phase 26 4-plan (foundation + 2 per-page + protocol) and Phase 27 3-plan (foundation + 2 per-page) precedents both worked; Phase 28's 3 frames + heaviest foundation justify 4 plans. Index → detail → tag ordering: detail saved for second-to-last because post body section is the prose-token validation surface (most scrutiny needs the most adaptive room).
- **Heading-5 + heading-6 stay open (D-106)** — strict Pitfall 1. Current MDX uses H1/H2/H3 only; heading-4 added as future-proofing per user direction. Heading-5/-6 wait for a real consumer (e.g., a tutorial-style post with deep hierarchy or design-system reference page typography surface).
- **Crito .fig consult attempted FIRST for all 7 prose tokens (D-106 + D-107 + D-108)** — Phase 23 D-04 fallback + Phase 26 OPEN-26-01 outcome guide expectations. If .fig is still unreadable, interpolation defaults ship + OPEN-28-NN flags potential revision. User-gate escalation per Phase 26 D-72 mechanic carry-forward if interpolation is ambiguous.

</specifics>

<deferred>
## Deferred Ideas

- **Heading-5 + heading-6 semantic tokens** — OPEN-23-10 remains partial. Phase 28 ships heading-3 + heading-4; -5/-6 stay open until a real consumer surfaces (e.g., a design-system reference page typography table needs full-scale heading hierarchy at Phase 30, or a tutorial-style MDX post with deeper structure).
- **Separate `prose-list-unordered` + `prose-list-ordered` tokens** — D-109 ships single `prose-list` covering both. If future blog content moves toward heavily-numbered ordered lists with custom right-aligned numeral styling, split into two tokens then.
- **`radius-semantic-pill` token addition** — D-120 default-position defers to plan-execution evaluation. If 9999 reads hacky during Plan 28-00, raise as Phase 28-NN proposal. Otherwise OPEN-23-12 remains open for Phase 29+ surface that surfaces real pill-radius need.
- **astro-expressive-code syntax-highlighting color tokens** — code-block syntax colors (token-keyword, token-comment, token-string, etc.) are runtime concern (library handles); code milestone wires astro-expressive-code's theme to Joel's brand-color tokens at integration time. Phase 28 ships the chrome only.
- **Embedded code-block copy-to-clipboard button** — runtime interaction, code-milestone-wired. Static Pencil represents READING state per D-92 carry-forward.
- **3-column TOC + sidebar layout for Blog post detail** — v1.3 [slug].astro uses `lg:grid-cols-[200px_1fr_200px]` with sticky TOC left. Phase 28 Plan 28-02 ships single-column post body composition (matches Crito agency-template register w1m3x raster). TOC affordance is code-milestone concern (sticky position + scroll-spy + heading anchor extraction). Sibling note on Plan 28-02 post header documents the wiring for code milestone.
- **Tag page filter-strip interactivity** — D-117 ships static active/inactive pill state via descendants override. Click-to-filter URL navigation is runtime, code-milestone wires `/blog/tags/[tag]` route navigation on pill click.
- **Load-more interaction on Blog index** — runtime, code-milestone wires; static design ships 6 representative cards per D-114.
- **Featured-image SVG extraction into Pencil for individual posts** — D-113 ships default placeholder + sibling note pointing code milestone to `post.data.featuredImage`. Out of v2.0 scope; code milestone wires per-post imagery.
- **Section/RelatedPosts related-content selection algorithm** — runtime (likely tag-based or pubDate-based proximity); static Pencil ships 3 representative Card instances. Code milestone implements selection at integration time.
- **Joel-brand fonts (Bricolage Grotesque, DM Sans, system mono replacement) in Blog frames** — PROJECT.md Out of Scope ("still planned to be replaced when code milestones run on top of v2.0"). Phase 28 explicitly NOT introducing them per D-58 carry-forward.
- **Joel's v1.3 4-link Header nav override (Blog / Projects / FAQ / Contact)** — Phase 25 D-38 + Phase 26 D-77 + Phase 27 + Phase 28 inherit Phase 31 Homepage instance-time deferral.
- **Joel-brand logo / wordmark in Header logo slot** — Phase 25 D-40 deferred; Phase 26 + 27 + 28 do not address. Phase 28 page-frame Header instances inherit Crito-source logo placeholder.
- **prose-blockquote semantic token** — sample MDX doesn't use blockquote (`>` syntax). If a future post does, add prose-blockquote then. Same pattern for prose-figure / prose-caption / prose-strong / prose-em (if italic/bold need beyond inline-token styling — sample MDX uses italic via `*word*` which renders via existing prose-paragraph italic style).
- **prose-horizontal-rule semantic token** — sample MDX uses `---` (horizontal rule). D-105 doesn't explicitly tokenize this; default plan-execution ships as a 1px line styled with `color-semantic-border-divider` (existing token) + 24px vertical margin. If visual rendering looks wrong, raise OPEN-28-NN.
- **prose-inline-code outline vs solid-fill variant** — D-108 ships single style; if future content needs distinct emphasis styles (e.g., subtle inline code vs alert-style command-line code), split tokens then.
- **OPEN-26-02 stale-cache get_screenshot quirk** — CALIBRATION-PROTOCOL § 6.4 Tier-1/Tier-2 workarounds available; Phase 28 plans inherit fallback path. Likely triggers on all 3 new frames per Phase 26 + 27 precedent — Tier-2 user-side editor verification is the production-proven path.
- **Code-milestone `/blog` + `/blog/[slug]` + `/blog/tags/[tag]` route adoption** — out of v2.0 scope. v1.3 routes keep rendering on v1.3 code throughout v2.0. Code milestone refactors to consume Phase 28's frames.
- **Verifying the 'provisional' flag on `type-semantic-prose-paragraph-*`** — Phase 26 D-71 carry-forward continues into Phase 28 Plan 28-02 (D-110). If post-body rendering APPROVES at calibration, the provisional flag is removed in PEN-INVENTORY. If problematic, raise OPEN-28-NN.
- **Backwards-compat for v1.3 BlogCard's `shadow-neo-turquoise` hover effect** — out of scope per D-58 (Crito visual register).
- **Generalized `Section / RelatedContent`** — Phase 28 considered + rejected per D-116 narrow-scoping. Phase 29 Projects builds its own `Section / RelatedProjects` if needed. Stays deferred.

</deferred>

---

*Phase: 28-blog-reconstruction-index-post-tag-page*
*Context gathered: 2026-06-08*
