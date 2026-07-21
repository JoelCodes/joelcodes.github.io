# Phase 38: Showcase Page + Blog Restyle - Context

**Gathered:** 2026-07-18
**Status:** Ready for planning

<domain>
## Phase Boundary

The Showcase page (`/showcase`) ships the full project-card experience — Client Work and Craft & Experiments sections rendering `ProjectCard.astro` closed/expanded per Figma frame `12:3` at all four breakpoints — and the blog (index `/blog`, post `/blog/[slug]`, tag `/blog/tags/[tag]`) is restyled to the Wavelength brand (PAGE-02, PAGE-06). Both surfaces remain **dev-gated** (excluded from prod builds, per the Phase 34 blog-gate pattern and the Phase 36 D-10 lock): the showcase carries placeholder project data and the blog is already prod-excluded, so nothing in this phase changes what production visitors see except the removal of the dead `/showcase` nav link. The featured-image `loading="lazy"` LCP bug is fixed (`loading="eager"` at LCP position). Blog URLs are unchanged in dev; roadmap criterion 4 (prod HTTP 200 / sitemap) remains superseded by the Phase 34 D-13 reversal — the blog is out of prod entirely until it relaunches.

**Scope addition from this discussion:** Because Figma has NO blog frames and Joel wants Figma to stay the literal single source of truth, this phase includes **drafting blog frames in the brand Figma file** (Claude drafts via Figma MCP, Joel approves) before any blog build work. See D-05–D-08.

</domain>

<decisions>
## Implementation Decisions

### Showcase publish state & data
- **D-01:** **Showcase stays dev-gated.** `/showcase` uses the blog-gate pattern (Phase 34 D-11–13): page renders in dev builds only, excluded from prod build + sitemap, honoring the Phase 36 D-10 lock (placeholder data must not ship publicly). Launch later = flip the gate.
- **D-02:** **Nav link gated too.** The SiteHeader `/showcase` link renders dev-only (same `import.meta.env.DEV` pattern as the footer Blog link). Prod nav shows Services / About / Book-a-call only until launch. This removes the current dead link in prod.
- **D-03:** **Placeholder entries match Figma count.** Duplicate placeholder entries in `projects.json` until each section (Client Work, Craft & Experiments) matches the frame `12:3` card count, so the fidelity gate compares like-for-like. All placeholder, all dev-only.
- **D-04:** **Dark mode mirrors the landing dark recipe.** No dark Showcase frame exists; apply the section-level dark treatments Phase 37 extracted from `117:103` (backgrounds, gradients) to showcase sections explicitly. The landing dark frame is the dark authority; flag as derived at the gate.

### Blog design authority (frames-first)
- **D-05:** **Blog frames get designed in Figma before the blog is built.** Figma remains the literal single source of truth — no "derived from patterns" shortcut for a whole page surface. The PROJECT.md "gaps get flagged, not filled" constraint is honored by closing the gap in Figma, not in code.
- **D-06:** **Claude drafts, Joel approves.** Claude generates the blog frames in brand file `1tg8wIPcvOVC5tPZ8pkGO2` via the Figma MCP, composing from the existing Components page (`36:5`) components/variables and brand system. Joel reviews/edits in Figma; the approved frames become canonical refs for the build.
- **D-07:** **Frame scope: blog index + blog post at 1440 and 390.** Tag pages reuse the index layout with a filtered heading — derived, no separate frame. Intermediate breakpoints (768/1920) are built responsively as the site already does.
- **D-08:** **Sequencing: Showcase first, frames in parallel.** Execution starts with the Showcase page (frame `12:3` already exists). An early task drafts the blog frames; execution hits an **approval checkpoint before any blog build work starts** — Joel reviews frames while showcase work proceeds. The `--chain` auto-advance is preserved; only the blog build waits on approval.
- **D-09:** **Blog fidelity gate = same rigor as other pages.** Once approved, frames are canonical: Figma-vs-rendered screenshot comparison for index + post at 1440 and 390, light + dark. Tag pages reviewed as derived surfaces without frame comparison.

### Blog structure & features
- **D-10:** **Tag pages survive.** `/blog/tags/[tag]` is restyled as a derived surface (index layout + filtered heading). URLs unchanged.
- **D-11:** **Index is a single-column editorial list.** Full-width post entries stacked vertically — title, date, description, tags, possibly a small thumbnail. This directive guides the Figma frame draft; the blog card component that emerges from the approved frame becomes the new `src/components/wl/` component (no BlogCard exists today — the roadmap's "BlogCard" dependency was never built; LinkCard is the nearest primitive).
- **D-12:** **Posts lead title-first, image below.** Title + date/tags, then the featured image, then prose. `featuredImage` stays required in the schema (no content.config.ts change); the image at LCP position gets the `loading="eager"` fix (roadmap criterion 3).
- **D-13:** **Full Wavelength prose treatment + rethemed code blocks.** MDX output gets wl prose styling (Fraunces/Hanken via the `.wl-*` ramp: headings, wl-accent links, blockquotes, lists) and `astro-expressive-code` is rethemed to the brand palette in both light and dark.

### Showcase page behavior
- **D-14:** **No card deep-linking this phase.** Phase 36 D-04's deferred anchors/auto-expand stay deferred until launch — slugs and card order will change when real project data replaces placeholders. Revisit when the showcase goes live.
- **D-15:** **Redirects stay at `/` until launch.** `/projects`, `/portfolio`, `/portfolio/[slug]` keep pointing at the homepage while `/showcase` is prod-excluded. Repoint to `/showcase` in the same change that flips the dev gate (deferred to launch).
- **D-16:** **All cards start closed.** Frame `12:3`'s expanded state is a state spec, not a layout default. Visitors open cards themselves; `<details>` ships closed.

### Claude's Discretion
- Exact dev-gate mechanism for `/showcase` (mirror whatever Phase 34 D-13 used for blog prod-exclusion — empty `getStaticPaths`, `import.meta.env.PROD` guard, sitemap filter).
- Figma MCP mechanics for frame drafting (which write tooling, frame placement/naming in the file, whether to draft light-only and derive dark or draft both — dark blog treatment follows the D-04/landing-recipe precedent either way).
- Blog card component naming and API (props-for-data/slot-for-prose per Phase 35 D-08 conventions).
- expressive-code theming mechanics (theme objects vs CSS variable overrides) and how the wl prose styles are delivered (global.css `.wl-prose` scope vs component styles).
- Showcase section composition beyond the two card sections — build what frame `12:3` shows (intro/heading treatment, section labels, spacing).
- Fidelity-gate screenshot mechanics — follow the Phase 34–37 gate precedent (manual PNG export from Figma; `export_nodes` is broken).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design source of truth (Figma, via figma-desktop MCP — file must be open in Figma desktop)
- Figma file `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration":
  - Showcase `12:3` — CANONICAL for `/showcase`: 4 breakpoints, closed + expanded card states, section structure and labels
  - Components page `36:5` — ProjectCard geometry (already extracted in Phase 36); source components/variables for the blog frame drafts (D-06)
  - Landing dark `117:103` — dark recipe authority for showcase dark treatment (D-04) and blog dark derivation
  - **Blog index + post frames at 1440/390 — DO NOT EXIST YET; drafted by this phase (D-05–D-08) and canonical once Joel approves.** Blog build work MUST NOT start before approval.
- Note: Pencil MCP `export_nodes` is broken; fidelity PNGs are exported manually. Use figma-desktop MCP `get_design_context`/`get_screenshot` for extraction; frame *writing* needs the claude.ai Figma MCP (`use_figma` + its mandatory skills).

### Requirements & prior decisions
- `.planning/REQUIREMENTS.md` — PAGE-02, PAGE-06 exact wording (PAGE-06's "posts stay in sitemap" superseded by Phase 34 D-13 prod exclusion)
- `.planning/ROADMAP.md` Phase 38 — goal + success criteria 1–5 (criterion 4 superseded by Phase 34 D-13; criterion 2's "blog removed from main nav / footer link" already satisfied by Phase 34's dev-gate)
- `.planning/phases/36-content-components-expandable-cards/36-CONTEXT.md` — ProjectCard contracts (whole-card summary D-01, independent open D-03), projects collection schema (D-05), placeholder-data lock (D-09/D-10)
- `.planning/phases/36-content-components-expandable-cards/36-UI-SPEC.md` — locked ProjectCard/FAQItem visual + interaction contracts
- `.planning/phases/37-landing-page/37-CONTEXT.md` — landing dark recipe source (D-04 here), scroll-spy/anchor contract (`/#services`, `/#about` ids placed in Phase 37), BOOKING_URL constants in `src/lib/constants.ts`, copy-gap protocol (D-09/D-10 there — reuse for showcase/blog copy gaps)
- `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — blog dev-gate mechanics (D-11–13, the pattern D-01/D-02 here reuse), redirect precedent
- `.planning/PROJECT.md` — palette, constraints (gaps flagged never invented — closed via Figma per D-05), Figma node map

### Data & content
- `src/data/projects.json` — v2 placeholder entries; extended to match frame card counts (D-03)
- `src/content.config.ts` — projects collection (typed `getCollection()` contract for `/showcase`) + blog collection schema (featuredImage stays required per D-12)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/wl/ProjectCard.astro` — the showcase's core component, built and gate-approved in Phase 36; `/showcase` composes it, doesn't modify it
- `src/components/wl/` primitives — Eyebrow, Tag, Breadcrumb, LinkCard, CTAButton available for blog surfaces; LinkCard is the nearest existing precedent for the new blog list entry component (D-11)
- `.wl-*` type ramp in `src/styles/global.css` — basis for the wl prose treatment (D-13)
- Blog dev-gate mechanics from Phase 34 (prod exclusion + sitemap filter in `astro.config.mjs`) — reuse for `/showcase` (D-01)
- Phase 37 landing sections — extracted dark-recipe values (backgrounds, gradients) to mirror on showcase sections (D-04)

### Established Patterns
- Semantic dark flip: each token used once, no `dark:` pairs for wl colors; on-dark literals per Phase 35 D-10 where sections are always-ink
- Figma-extraction discipline: MCP extraction for all values; FIDELITY-GAP flagged, never invented — extended by this phase to *frame drafting* for surfaces with no mockup
- Copy-gap protocol (Phase 37 D-09): `[COPY GAP]` markers batch at the fidelity gate; never invent copy
- Focus treatment: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent`
- Namespace isolation: zero old neobrutalist tokens in new/restyled surfaces

### Integration Points
- `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/blog/tags/[tag].astro` — restyled in place, URLs untouched (old neobrutalist components they import become Phase 41 cleanup targets)
- `src/components/layout/SiteHeader.astro` — `/showcase` link gains the dev-only gate (D-02); `aria-current="page"` on `/showcase` (Phase 37 D-04) only renders in dev builds now
- `src/pages/showcase.astro` (new) — consumes `getCollection()` projects; links back to `/#services` per the Phase 37 anchor contract
- `astro.config.mjs` — showcase prod-exclusion + sitemap filter; redirects NOT touched (D-15)
- `astro-expressive-code` config — retheme touches its integration config (D-13)

</code_context>

<specifics>
## Specific Ideas

- Joel's core call this discussion: **don't let the blog become the first "derived" page surface** — if a page has no Figma frame, the gap gets closed in Figma first, keeping the file a complete record of the site. The frame draft is part of the phase's work, not a blocker before it.
- The blog index should read like a writing archive — editorial single-column, matching the Fraunces/Hanken brand voice, not an image-led card grid.
- The approval checkpoint for blog frames is a hard stop for blog *build* work only — showcase work proceeds in parallel so the chain never idles.

</specifics>

<deferred>
## Deferred Ideas

- **Showcase launch bundle** (flip when real project data exists): un-gate `/showcase` + nav link, repoint `/projects` + `/portfolio*` redirects to `/showcase` (D-15), add card deep-linking anchors/auto-expand (D-14, deferred from Phase 36 D-04)
- **Blog relaunch bundle** (Phase 34 deferred, still standing): restore blog pages + sitemap in prod, un-gate the Blog link
- **Blog frames at 768/1920** — only if responsive derivation proves insufficient at the gate; not planned

</deferred>

---

*Phase: 38-showcase-page-blog-restyle*
*Context gathered: 2026-07-18*
