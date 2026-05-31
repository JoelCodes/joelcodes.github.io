# v2.0 STACK Research — Pencil-Centric Design Reconstruction

**Milestone:** v2.0 Prep Crito Design File
**Researched:** 2026-05-31
**Confidence:** HIGH for Pencil MCP tool catalogue and recommended workflow (multiple authoritative sources agree: Pencil docs, official skill file, community usage articles). MEDIUM for exact argument shapes (assembled from skill files, npm CLI docs, and forum examples — verify by running `get_editor_state(include_schema: true)` once at the start of Phase 23). LOW for any claim about the specific contents of `design/Crito.pen` — researcher could not call Pencil MCP tools from this session; first phase MUST verify by calling `get_editor_state` and `get_guidelines` before acting on these recommendations.

---

## Context

This milestone is `.pen`-file-only. No npm packages get installed, no code stack changes are made, no fonts get added. The "stack" here is the **Pencil MCP toolchain** and the **lightweight image-inspection helpers** that pair with it. v1.4's STACK research (`@fontsource-variable/*`, dual `@theme` namespace, etc.) is parked until a future code milestone consumes the rebuilt `.pen`.

Critical disclosure: this research session did NOT have direct access to the Pencil MCP tools (only `Read`, `Write`, `Bash`, `WebFetch`, `WebSearch` were available). Recommendations below are drawn from authoritative public sources for the Pencil MCP surface (official docs at docs.pencil.dev, the canonical `pencil-dev` skill file, the npm CLI docs, and community walkthroughs). **Before executing any phase, the first action of that phase must be a real `get_editor_state(include_schema: true)` call to confirm the current schema version, followed by `get_guidelines` with the relevant tag (likely `design-system` and `landing-page`).** If the schema, tool names, or argument shapes differ from what is documented here, the workflow holds but the exact invocations should be adjusted.

---

## Pencil MCP Tooling

The Pencil MCP server exposes more tools than the eight named in the milestone brief. The canonical Pencil-dev skill (the authoritative agent guidance bundled with Pencil) names these as the routing table; I include the extras because two of them — `replace_all_matching_properties` and `find_empty_space_on_canvas` — are likely useful for this specific reconstruction job.

### Core tools (the brief named these)

| Tool | Use it for | When to call (in v2.0) | Sample argument shape |
|------|------------|------------------------|------------------------|
| `get_editor_state` | First context check on every fresh session — returns active file, selection, and (if requested) the JSON schema for nodes | First call of every phase, with `include_schema: true` once per session | `get_editor_state({ include_schema: true })` |
| `get_guidelines` | Loads task-specific Pencil-authored guidance (e.g. `design-system`, `landing-page`, `web-app`, `tailwind`, `code`) | Immediately after `get_editor_state`; load `design-system` for token phases, `landing-page` for page-reconstruction phases | `get_guidelines({ topic: "design-system" })` and `get_guidelines({ topic: "landing-page" })` |
| `batch_get` | Read nodes by ID or by filter pattern — the inspection workhorse. Use it to inventory pages, find reusable components, and read structured node trees | Phase 23 inventory pass (single batched call across all 15 page frames). Every later phase to read the source-of-truth structure before editing | `batch_get({ queries: [{ pattern: "page:*" }, { pattern: "component:*" }, { id: "<node-id>" }] })` |
| `batch_design` | Insert / update / move / copy / delete / replace nodes. The mutation workhorse | All component-creation and page-recomposition phases. Cap of ~25 ops per call — chunk larger work | `batch_design({ operations: 'tokenFrame=I(document,{type:"frame",name:"Tokens",x:0,y:0,width:1440,height:900})' })` — supports shorthand `I(parent,{...})` insert, `U(id,{...})` update, `C(srcId,parentId,{...})` copy |
| `snapshot_layout` | Returns computed bounds for all nodes — used for structural QA (clipping, overlap detection) | Validation pass at the end of every component and every page reconstruction phase | `snapshot_layout({ rootId: "<page-id>", problemsOnly: true })` |
| `get_screenshot` | Renders a node to PNG — for visual review ONLY, never to recover structure | Side-by-side spot-check against the original Figma rasters (`design/images/*`); also for the final-fidelity check at phase end | `get_screenshot({ nodeId: "<page-id>" })` |
| `get_variables` | Reads the current variable/token model (typography, color, spacing, radius, shadow) | Beginning of token phase; again at the start of any component phase to confirm the token surface | `get_variables({})` |
| `set_variables` | Writes or updates variables. Supports per-theme syntax: `'color.bg=color:#FFFFFF@light,#0F172A@dark'` | The variables phase (creates the token foundation). Use sparingly thereafter — only when a genuinely new system-level value is needed | `set_variables({ variables: { 'color.primary': 'color:#FFEF6A', 'font.heading': 'font:Bricolage Grotesque' }, replace: false })` — Note: even though dark mode is out of scope for v2.0, the skill guidance is to encode both themes at the variable layer from the start. Use `@light,@dark` syntax even if dark values mirror light initially, to avoid a structural retrofit later. |
| `export_nodes` | Exports nodes to PNG/JPEG/WEBP/PDF | End of milestone — produce side-by-side proof images for the spot-check validation deliverable | `export_nodes({ nodeIds: ["<page-id-1>", "<page-id-2>"], format: "png", outDir: ".planning/research/exports/" })` |

### Bonus tools worth knowing about (not in the brief)

The authoritative Pencil-dev skill names several additional tools that map well to specific v2.0 subtasks:

| Tool | Why it matters for v2.0 |
|------|--------------------------|
| `open_document` | Use once at start of session to ensure `design/Crito.pen` is the active file. Skip if `get_editor_state` already reports the right file is open. |
| `find_empty_space_on_canvas` | When seeding the new token frame and component-library frames, this avoids overlap with the existing 15 page frames. Pencil files are flat 2D canvases — overlap is the most common "I broke the original" mistake. |
| `search_all_unique_properties` | Quick way to enumerate every distinct fill color, font name, font size, radius, or padding value already present in the .pen — feeds directly into deciding the token set. |
| `replace_all_matching_properties` | After tokens are defined, this is how you retroactively swap raw values for variable references across many nodes in one call. Big productivity multiplier. |
| `get_style_guide_tags` / `get_style_guide` | If you decide to seed the v2 visual aesthetic from a Pencil-provided style guide (matched to Crito's agency template feel), these expose the bundled guides. Likely skipped for v2.0 since the goal is to *match* Crito, not introduce a new style direction. |

### Rationale: why each tool fits its subtask

- **`get_editor_state` first** because — per the Pencil MCP server instructions in this session — you cannot legally call any other tool without the schema in conversation context. It is a hard precondition, not a nice-to-have.
- **`get_guidelines` second** because Pencil ships task-specific guidance (`design-system`, `landing-page`) that materially changes what "correct" looks like. Skipping it forfeits guidance that the editor team explicitly built for this use case.
- **`batch_get` over per-node reads** because the skill explicitly says: *"Use `batch_get` to inspect the current document, especially reusable nodes, in as few calls as possible. Search for reusable components in one batch instead of reading components one by one."* Pen files are not huge but tool-call latency adds up across 15 pages.
- **`search_all_unique_properties` before `set_variables`** because you cannot define a sensible token system from `get_screenshot` alone — even with flat-image sections, the *frame* metadata (page padding, frame fills, the few non-rasterized text nodes) carries truth that pixels do not. Enumerate first, then design the token set, then write the variables.
- **`snapshot_layout` over `get_screenshot` for validation** because the skill is emphatic: *"Inspect node structure, instances, and variables with `batch_get` before relying on screenshots... Use `snapshot_layout` to catch clipping, overlap, and layout issues. Use `get_screenshot` after the structure is in place to verify polish, rhythm, and visual balance."* Screenshots lie about overlap and clipping; bounds data does not.
- **`get_screenshot` for spot-check only**, paired with the original Figma-exported rasters under `design/images/` for side-by-side visual proof. The brief's success criterion is "spot-check validation that recreated sections match original visual fidelity" — that is fundamentally a screenshot comparison, but only at the *final* QA step, never as an inspection source.

---

## Workflow Order (variables-first vs components-first)

**Variables-first is the answer.** This is not a judgment call — it is the explicit first principle of the official Pencil-dev skill:

> *"Start with variables, not literals. Treat typography, color, spacing, radius, shadow, and other repeated style decisions as part of a system. Reuse existing variables first, extend the variable set second, and fall back to raw values only when a variable genuinely cannot express the intent."*

And under "Workflow":
> *"Audit variables and themes first... Audit reusable building blocks before page design... Compose screens from tokens and components."*

### Recommended phase ordering for v2.0

This is the sequence the roadmapper should turn into discrete phases. Each numbered block is a candidate phase boundary.

1. **Audit & inventory (read-only)**
   - `get_editor_state({ include_schema: true })`
   - `get_guidelines({ topic: "design-system" })` and `get_guidelines({ topic: "landing-page" })`
   - `batch_get` across all top-level pages and any pre-existing components — produce the flat-vs-editable catalogue PROJECT.md asks for
   - `search_all_unique_properties` across every page to enumerate raw colors, fonts, sizes, radii, paddings actually present
   - `get_screenshot` of each page for the side-by-side reference set
   - Output: a written audit (likely just a markdown summary in this milestone's planning folder, not a `.pen` change) listing which sections are factorable from existing structured data vs. which need to be re-derived from the rasters under `design/images/`

2. **Token foundation (write-only-to-variables, no node mutations)**
   - `get_variables({})` to read whatever (likely empty) variable surface exists today
   - Define the token system: typography scale, color roles, spacing scale, radius set, shadow set
   - `set_variables({ variables: {...}, replace: false })` — write tokens with `@light` values now and stub `@dark` values to match light (per the skill principle of encoding both themes at the variable layer up front, even though dark mode is deferred). This avoids the retrofit pain documented in v1.4's abandonment.
   - Validation: `get_variables({})` to confirm.

3. **Reusable component extraction (build the library, no page changes yet)**
   - `find_empty_space_on_canvas` to place a "Components" frame off to the side of the 15 page frames
   - Identify the small set of patterns that recur across the 15 pages (buttons, cards, nav shells, form rows, section headers, footer) from the audit
   - For each, build a component in the Components frame using `batch_design` insert ops — referencing tokens via variables, never raw values
   - `snapshot_layout({ problemsOnly: true })` on the component frame after each batch
   - `get_screenshot` of each finished component for the reference set

4. **Page section recomposition (one page or one section group at a time)**
   - Per page: `batch_get` the existing page frame to inventory its structure
   - For each flat raster region: replace with a layout frame composed of token-driven nodes and component instances using `batch_design`
   - Keep the original raster present as a hidden / locked / sibling layer during the phase so side-by-side comparison stays cheap (delete only after the spot-check passes)
   - After each section: `snapshot_layout({ problemsOnly: true })` then `get_screenshot` and visually compare against the original raster
   - Use `replace_all_matching_properties` opportunistically when a raw value escaped into a node and should have been a token

5. **Fidelity sweep**
   - Across the whole file, `search_all_unique_properties` again — anything that is still a raw color/font/spacing not coming from a variable is a leak; fix with `replace_all_matching_properties`
   - `export_nodes({ format: "png" })` for every reconstructed page, write to `.planning/research/exports/` for archival side-by-side proof against `design/images/`

### Why this order and not the reverse

Building components first and inferring variables from them is the standard "extract method, then refactor constants" engineering instinct — and it is the wrong call here for two specific reasons:

1. **The skill file's anti-pattern list explicitly forbids it.** "Hard-coding font sizes, colors, spacing, or radius values across page nodes" and "Mixing token-driven styling with arbitrary literals without a clear reason" are named anti-patterns. Components built before tokens encode literals, then you fight to retrofit.
2. **The v1.4 abandonment was caused by exactly this failure mode at the code layer.** Phase 23 v1.4 tried to define tokens in CSS while simultaneously building components against them, and Phase 24 tried to refactor those components — both reverted because the token surface was guessed from flat images instead of derived. v2.0 explicitly fixes that by doing the derivation first in the design tool. Reversing the order here would re-introduce the same failure mode one layer earlier.

### Why audit happens *before* variables (slight nuance)

The skill says "audit variables first" — meaning *read* the existing variable surface before writing. It does NOT mean variables get defined before you understand what is in the file. The audit phase (step 1 above) is a pure read pass: enumerate what raw values exist, look at the page frames, look at the screenshots, look at the images on disk — *then* in step 2 you actually decide and write the token system. So the high-order rule is "inspect → tokens → components → pages → fidelity sweep."

---

## Supporting Tools / References

Pencil MCP is the entire stack for the editing work. The few supporting tools below help with the inspection side — particularly deriving real values from the flat raster sections that the `.pen` itself does not expose as structured data.

### Already on the machine

- **The original Figma-exported images** at `design/images/` — these are the raster sources that became flattened into the .pen. They are the single highest-value reference asset for this milestone. Always cross-reference reconstructed sections against the matching image.
- **The original Figma file** at `design/Alliatus – Mastermind Landing Page Template (Community).fig` — present in the design folder. Note: this is the *Alliatus* template, not Crito. It may or may not be relevant; flag for the user but do NOT assume it is the Crito source. (LOW confidence the .fig matches Crito — the filename does not match.)
- **macOS Digital Color Meter** (built-in, `/System/Applications/Utilities/`) — point-sample color values from rendered images at exact pixel coordinates. Faster than any extraction script for the "what color is *this* button" question.
- **macOS Preview's selection + Tools → Inspector** — gives image dimensions and DPI, enough to back into approximate type sizes from rendered text at known display scale.

### Worth installing if not already present

- **ImageMagick** — for one-shot dominant-color palette extraction from any raster section: `magick design/images/<section>.png -kmeans 8 -unique-colors -depth 8 txt:` returns the 8 dominant colors with counts. Useful at the start of the token-definition phase to seed the color palette from the actual rendered sections. Already common dev dependency on macOS via Homebrew.

### Used only if needed (not preinstalled)

- **WhatTheFont** (whatfontis.com, mobile app) or **Adobe Fonts visual search** (fonts.adobe.com/fonts/vs/upload) — only useful if there is uncertainty about which fonts the original Crito used. Cross-reference: v1.4 STACK research had MEDIUM-confidence guesses (Plus Jakarta Sans, Inter, DM Sans, DM Serif Display). If the .pen's structured text nodes (not the rasters — those won't have font metadata) name the font, use that. If not, then a visual font matcher pass on one clear text raster is the cheapest disambiguator. Note: results from visual font matchers degrade on small text, anti-aliased text, or stylized headings. Treat any matcher output as MEDIUM confidence at best.

### Explicitly not in the supporting-tools list

These were considered and rejected as over-scope for v2.0:

- Any kind of automated "image-to-design" extractor (e.g. AI-based "convert screenshot to layout" tools). The whole point of v2.0 is human/agent judgment using the structured Pencil tools as authoritative — automated raster-to-layout extractors would re-introduce the exact "best guess" problem that abandoned v1.4.
- Pencil CLI in headless mode (`@pencil.dev/cli`) — useful for batch processing, but unnecessary here since work happens through the MCP server during interactive phases. Mention only if a phase wants to script bulk operations later.
- Figma API access — would only matter if the original Figma source were accessible and identifiably the Crito source. The .fig present is Alliatus, not Crito, so this avenue is currently closed.

---

## What NOT to Add

| Tool / library | Why not |
|----------------|---------|
| Any code-stack change (fonts, CSS libs, Astro integrations) | v2.0 is `.pen`-file-only by milestone definition. v1.4's STACK research (fontsource, dual @theme, etc.) is the right answer for the *future* code milestone — adopting it now violates the milestone scope and re-creates the v1.4 failure mode. |
| Figma API integration / Figma plugins | The original Figma source is not in this repo (the `.fig` present is Alliatus, not Crito). And even if it were, the milestone's value proposition is the *reconstructed Pencil source*, not a Figma round-trip. |
| AI image-to-design layout extractors | Re-introduces "best guess" outputs. The structured-data discipline that the Pencil skill enforces is exactly what v1.4 was missing. |
| Custom Pencil schema validators or static-analyzers | `snapshot_layout({ problemsOnly: true })` is already the project's QA tool. Building parallel validators is over-engineering. |
| A second design tool (Figma, Sketch, Penpot, etc.) for "comparison" | Adds tool-switching cost for no real benefit. The original images under `design/images/` are the only comparison reference needed. |
| Test/CI integration for Pencil work | This is design-tool work, not code; no CI needed. The acceptance gate is human spot-check against `design/images/`. |
| Pencil CLI (`@pencil.dev/cli`) for headless batch runs | The MCP server is the right interface during interactive phases. CLI only makes sense if a phase wanted to script bulk re-tokenization across many files — not applicable here. |
| ImageMagick beyond palette extraction (cropping, OCR, diff) | Single-purpose use is fine; expanding it into a full image-pipeline is scope creep. |
| LQIP / image optimization tooling | That is a code-milestone concern, not a design-file concern. Parked. |

The over-tooling risk on this milestone is genuine. The discipline is: **Pencil MCP for everything that touches the .pen; the raster images on disk plus macOS Digital Color Meter / ImageMagick palette extraction for the few moments you need values that the .pen does not structurally encode; nothing else.**

---

## Open Questions

These should be resolved before or during Phase 23 — most resolve themselves on the first `get_editor_state` and `get_guidelines` calls.

1. **What is the actual current schema?** This research did not have Pencil MCP tool access. The first action of Phase 23 must be `get_editor_state({ include_schema: true })`, and the schema returned might differ in field names from the shorthand argument examples above. The *workflow* is correct; the *exact JSON shapes* may need adjustment.

2. **Are any of the 15 Crito page frames already partially editable?** The PROJECT.md description says "most" sections are flat rasters — meaning some are already structured. The audit pass needs to produce a per-page flat-vs-editable catalogue before deciding the work breakdown.

3. **Does the .pen already have any variables defined?** v1.4 STACK research noted Crito has 15 page frames but originally zero reusable components. Whether it also has zero variables is not confirmed — `get_variables({})` at start of the token phase decides.

4. **What is the right token granularity?** Crito is a third-party agency template; the user's existing v1.x neobrutalist palette (yellow/turquoise/magenta) is explicitly listed in PROJECT.md as something that will be *replaced* by Crito's palette during code-side migration. So the v2.0 token foundation should mirror Crito's tokens, not Joel's current v1.x palette. The roadmapper should confirm with the user: are we building Crito-faithful tokens (recommended, matches the milestone goal) or some hybrid?

5. **Should dark variants be written now even though dark mode is deferred?** The skill says yes — encode both themes at the variable layer up front, even if dark mirrors light initially. The user has dark mode "still deferred for v2.0" in PROJECT.md. The recommendation: still emit `@light,@dark` variable syntax with dark values stubbed to mirror light, because retrofitting later costs more than writing `@dark,#FFFFFF` (or whatever) once at definition time. Confirm with user.

6. **How much of the original .fig file (Alliatus) is relevant?** Filename suggests it is a different template entirely. Worth a single-sentence check with the user: "should we treat `Alliatus – Mastermind Landing Page Template (Community).fig` as irrelevant noise in the design folder, or is it actually the source for one of the sections we'll be reconstructing?" If irrelevant, consider moving it out of `design/` to declutter.

7. **Does the user want exported PNG proofs of each reconstructed page archived in the repo?** The recommended workflow ends with `export_nodes` outputs in `.planning/research/exports/` for spot-check archival. If user prefers ephemeral proofs (just compare and discard), drop step 5's archive write.

---

## Sources

- Pencil CLI documentation (official): https://docs.pencil.dev/for-developers/pencil-cli — tool catalogue, MCP server behavior, .pen file format and encryption (Verified 2026-05-31, HIGH confidence)
- Pencil-dev SKILL.md (authoritative agent skill, GitHub): https://github.com/unliftedq/skills/blob/main/skills/pencil-dev/SKILL.md — workflow ordering, anti-patterns, variables-first principle, full tool routing table (Verified 2026-05-31, HIGH confidence — quoted verbatim above)
- Pencil core concepts: Variables: https://docs.pencil.dev/core-concepts/variables — `@light,@dark` per-theme variable syntax (Verified 2026-05-31, HIGH confidence)
- @pencil.dev/cli npm package: https://www.npmjs.com/package/@pencil.dev/cli — CLI ↔ MCP tool parity, install instructions (Verified 2026-05-31, HIGH confidence)
- Pencil MCP server overview: https://openpencil.dev/programmable/mcp-server — server transport, port, MCP feature parity (Verified 2026-05-31, MEDIUM confidence — likely accurate but source is a third-party mirror; cross-check with docs.pencil.dev)
- Pencil + Claude Code walkthrough: https://dev.classmethod.jp/en/articles/claude-code-pencil-mcp-web-design/ — real-world tool sequence observation (Verified 2026-05-31, MEDIUM confidence — single practitioner account)
- Pencil-design skill (third-party): https://agentskills.so/skills/chiroro-jr-pencil-design-skill-pencil-design — second-source confirmation of variables-first workflow (Verified 2026-05-31, MEDIUM confidence)
- v1.4 STACK research (project-internal): `.planning/milestones/v1.4-research/STACK.md` — prior MEDIUM-confidence font guesses (Plus Jakarta Sans / Inter / DM Sans / DM Serif Display) and the variable-fonts-via-fontsource decision, parked for a future code milestone (Verified 2026-05-31, HIGH confidence as historical record)
- ImageMagick `-kmeans` palette extraction: https://github.com/ImageMagick/ImageMagick/discussions/4857 and https://www.imagemagick.org/discourse-server/viewtopic.php?t=28963 — verified command syntax for dominant-color extraction (Verified 2026-05-31, HIGH confidence)
- Font identification tools landscape: https://www.screensnap.pro/blog/font-identifier and https://fonts.adobe.com/fonts/vs/upload — WhatTheFont and Adobe Fonts visual search as the two industry-leading options; both flagged for MEDIUM-confidence output on stylized or low-res text (Verified 2026-05-31, MEDIUM confidence)

---
*Stack research for: v2.0 Prep Crito Design File — Joel Shinness Website*
*Researched: 2026-05-31*
