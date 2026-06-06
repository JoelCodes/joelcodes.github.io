# Phase 26: FAQ + 404 Reconstruction (Calibration Workflow Established) - Context

**Gathered:** 2026-06-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Two new top-level page frames — `FAQ` and `404` — are added to `design/Crito.pen` as fresh-designed compositions of Phase 23–25 tokens / primitives / compounds / sections. Both pages are **joel-only-no-crito-ref** per Phase 23 PEN-INVENTORY — no Crito source raster exists to be faithful to. Phase 26 simultaneously codifies `.planning/research/CALIBRATION-PROTOCOL.md` — a unified workflow with two branches (crito-source-present vs joel-only) that every later per-page phase (27 Thank-you+Contact, 28 Blog, 29 Projects, 30 Design system, 31 Homepage) inherits as its definition-of-done.

This phase also ships two new Section components (`Section / CTA`, `Section / NavBack`) and one new semantic typography token (`type-semantic-heading-2`) — additions to the Phase 23–25 foundation, justified by the FAQ + 404 sections that consume them.

**Out of scope (already decided):**
- Per-page reconstruction for any other page (Phases 27–31)
- Mobile breakpoint reconstruction (PAGE-09 — desktop only for v2.0)
- Dark mode (TOKEN-07 + Phase 23 D-01)
- Inline-code prose token (OPEN-23-11 re-pointed to Phase 28 — Blog)
- prose-link + prose-list semantic aliases (no Phase 26 consumer — re-pointed to Phase 28 per D-70)
- Real microcopy for the 404 page + the FAQ CTA section (STUB-labeled, deferred per D-81 + D-82)
- Joel's v1.3 4-link Header override (per Phase 25 D-38, this happens at Phase 31 Homepage instance time, not Phase 26)
- Joel's v1.3 src code (v2.0 milestone scope — `.pen` file only)

</domain>

<decisions>
## Implementation Decisions

### Source-of-Truth for Joel-Only Pages

- **D-58:** **Fresh design in Crito vocab, NOT v1.3 visual mirror.** FAQ + 404 are designed inside `design/Crito.pen` using only the Phase 23 token surface + Phase 24 primitives + Phase 25 compounds/sections. Joel's v1.3 `/faq` page informs **content** (the 5 existing Q+A pairs ship verbatim per D-82) but NOT visual style (no Bricolage Grotesque, no yellow hard-shadows, no neobrutalist borders — those values aren't in the Crito token surface). Keeps the whole reconstructed `.pen` aesthetically coherent. Reverses what "Reconstruction" in the phase name implied when ROADMAP wrote it (the audit didn't yet show that no Crito source exists for either page).
- **D-59:** **FAQ visual shape — stacked Q+A pairs, no accordion mechanic in the design.** Each question + answer renders as a visible pair (Q heading on top, A paragraph below, both visible). The static design tool represents READING state, not interaction state. The code milestone may choose to wrap the rendered shape in a `<details>` element for collapse behavior — that's a code concern, not a `.pen` concern. Avoids the "design two states (open + closed)" complexity that an accordion-in-design would force.
- **D-60:** **404 visual shape — brand-voice intent (BIG headline + body + nav-back row), but microcopy STUB'd per D-81.** The 404 page frame ships a real layout (large headline area, body-text area, nav-back row of 3–4 links to key pages). The actual headline + body text are placeholder strings ("Headline placeholder", "Body placeholder") with STUB fidelity label per D-81. Brand-voice expression is deferred to a later content phase or code milestone.
- **D-61:** **FAQ CTA section ('Still have questions? — Get in touch') is included as a layout section, microcopy STUB'd per D-82.** ROADMAP Plan 26-01 named a CTA section that doesn't exist in v1.3 — Phase 26 ships it as a NEW layout-only section (headline placeholder + body placeholder + Button instance pointing to /contact). Layout = EXACT; microcopy text = STUB. Matches the 404 treatment (D-60 + D-81).

### Calibration Artifact (When There's No Crito Raster)

- **D-62:** **Calibration pairing for joel-only sections — token-usage check vs `_Tokens & Foundations`.** VALID-02's literal text ("matching raster from design/images/") has no counterpart for FAQ + 404 — there's no raster. Joel-only sections pair the reconstructed pen-frame screenshot with the relevant slice of Phase 23's `_Tokens & Foundations` reference frame. The calibration question becomes: "does this composition use the declared tokens correctly?" — the right question when there's no visual source. Single artifact per section, reusable script across joel-only consumers.
- **D-63:** **Fidelity label semantics — redefined, same vocabulary (EXACT / APPROXIMATE / STUB).** Same labels across all v2.0 per-page phases, with branch-specific definitions documented in CALIBRATION-PROTOCOL.md (D-66):
  - **Crito-source branch:** EXACT = pixel-faithful to the matching raster; APPROXIMATE = visually close, declared gaps; STUB = placeholder.
  - **Joel-only branch:** EXACT = every property references a semantic token + you've spot-checked; APPROXIMATE = uses primitives directly OR has inferred values flagged OPEN; STUB = layout placeholder, token-binding or content deferred.
- **D-64:** **Artifact location — `.planning/ui-reviews/v2.0/` (matches ROADMAP), single directory, type-prefixed filename.** Filenames encode the calibration type: `26-faq-qa-section--token-usage.png`, `26-404-message--token-usage.png` for joel-only; `27-contact-form--side-by-side.png` for crito-source. The `--token-usage` vs `--side-by-side` suffix is the type marker. One discovery surface across all per-page phases.
- **D-65:** **Spot-check format — user reviews rendered pen-frame screenshot + reads the semantic-token list it consumes.** Plan's calibration gate presents both: "here's the pen-frame screenshot, and here are the N semantic tokens it consumes (font-family, sizes, spacing, fill, stroke, radius). Does this match your intent?" Single AskUserQuestion per per-page plan close. Lightweight. Matches ROADMAP success criterion 3 ("user has spot-checked at least one section per page before phase close").

### Calibration Protocol Scope (Plan 26-03)

- **D-66:** **One unified `.planning/research/CALIBRATION-PROTOCOL.md` with a branch matrix.** Single doc, single entry point for every per-page phase. Top section: branch decision tree ("is this page crito-source or joel-only?"). Below: two parallel mini-protocols — one for each branch. Inherited by phases 27 (Thank-you joel-only + Contact crito-source — uses BOTH branches in one phase), 28 (Blog crito-source), 29 (Projects crito-source), 30 (Design system joel-only), 31 (Homepage crito-source + already-editable).
- **D-67:** **Protocol gets written AFTER FAQ + 404 — codify-what-worked.** Plan order: 26-00 (foundation) → 26-01 (FAQ) → 26-02 (404) → 26-03 (protocol). 26-01 + 26-02 use the decisions in THIS CONTEXT.md directly as their workflow; 26-03 then writes the protocol from the ACTUAL workflow that worked. Matches ROADMAP plan-order intent (the roadmap listed 26-03 last). Protocol reflects practice, not theory.
- **D-68:** **Required protocol contents — branch matrix + per-step script + label definitions + OPEN-flag template + PAGE-11 rule + desktop-only constraint.** Concrete, action-oriented sections. Per-step script per branch lists which Pencil MCP calls to make, which raster/token-frame to pair against, filename naming convention, and where the user spot-check happens. OPEN-flag template is reusable across consumers per D-09 (Phase 23). PAGE-11 raster-removal rule applies only to the crito-source branch (no raster exists to remove on the joel-only branch); the protocol calls this out explicitly. Desktop-only constraint (PAGE-09) repeated for clarity.
- **D-69:** **Protocol lives at `.planning/research/CALIBRATION-PROTOCOL.md` (matches ROADMAP), separate from PEN-INVENTORY.md, cross-referenced.** PEN-INVENTORY.md gets a short `## Calibration Protocol` anchor (a 1–2 sentence reference) pointing to CALIBRATION-PROTOCOL.md. Two surfaces, single source of truth, easy to evolve. Matches the "plain-markdown audit trail" precedent set by Phase 23 D-18 / Phase 24 D-23.

### Prose Token Surface (OPEN-23-11 Resolution)

- **D-70:** **Phase 26 ships only the prose tokens FAQ actually consumes — `type-semantic-prose-paragraph-*` is the only existing prose token used; no new prose-link / prose-list tokens added.** FAQ answers are plain prose paragraphs (no embedded links, no bullet lists). The CTA section button uses Button primitive (not a prose-link). 404 message is plain text. Strict Pitfall 1 — no tokens without source-or-use evidence. OPEN-23-11 is RE-POINTED to Phase 28 (Blog) — agency-blog prose actually depicts links and lists; that's the right consumer to derive prose-link + prose-list values from. PEN-INVENTORY's OPEN-23-11 row gets an update note: "Phase 26 declined to add prose-link / prose-list (no consumer); re-pointed to Phase 28."
- **D-71:** **`type-semantic-prose-paragraph-*` consumed as-is by FAQ, no Crito .fig consultation, calibration spot-check IS the verification.** The Phase 23-shipped prose-paragraph token is flagged "provisional" (Home Page body proxy). FAQ is the first real consumer. If the rendered FAQ Q+A answers look visibly wrong at calibration spot-check, raise an OPEN-26-NN with rendering evidence. Otherwise the tokens are confirmed-load-bearing and the "provisional" flag gets removed in PEN-INVENTORY. Avoids unnecessary token churn beneath Phase 24/25 components that already reference these tokens.
- **D-72:** **Phase 26 ships `type-semantic-heading-2` — ONE new semantic alias, source-derived from Crito .fig consult per D-04.** FAQ Q items need a heading style between H1 (48px) and body (16px); 404 message body needs the same tier. Plan 26-00 first task consults `design/images/Consulting & Agency Website Template I Crito (Community).fig` to derive heading-2 values (size + family + weight + line-height). If the .fig doesn't depict a clear heading-2 tier, Plan 26-00 raises OPEN-26-NN with a proposed value (e.g., Plus Jakarta Sans 32/700/line-height 1.4 — interpolated between existing H1 48 and body 16) and surfaces to user before writing. Resolves PART of OPEN-23-10 (heading-2 only; heading-3/4/5/6 still open for later phases). Pitfall 1 satisfied — real consumers (FAQ Q + 404 body), real source consult.
- **D-73:** **Inline-code (`prose-inline-code`) stays open, defer to Phase 28.** Phase 26 has no inline-code consumer. Phase 28 (Blog) has real code blocks in posts — the natural decision surface. OPEN-23-11 narrows in PEN-INVENTORY to "prose-link + prose-list + inline-code remain open for Phase 28" (per D-70 + this).

### Page-Frame Creation Mechanics

- **D-74:** **FAQ + 404 page frames created to the RIGHT of existing Crito page-frame cluster, via `find_empty_space_on_canvas`.** Carries forward Phase 24 D-37 pattern (used for `_Components` library stub placement). Keeps the Crito page-frame cluster (15 baseline frames) visually intact for zero-mutation diffing. Same approach Phase 30 (Design system reference) + Phase 31 (Homepage) will use when they create joel-only-frames or modify Crito frames.
- **D-75:** **Frame dimensions: 1440px width, fixed pixel heights matched to Crito Home Page section-rhythm.** Width matches Crito's standard desktop page-frame width (1440px from Home Page `ujMLJ`). Heights are derived from Crito Home Page sectioning during Plan 26-01 / 26-02 — likely FAQ ≈ 1600–2000px tall (Header + page-intro + Q+A list + CTA section + Footer), 404 ≈ 900–1100px tall (Header + headline + body + nav-back row + Footer). Plan tasks derive exact values from Crito Home Page's section-height observations rather than inventing pixels (so this is not raster eyedropping — it's vocabulary inheritance).
- **D-76:** **Plain frame names: `FAQ` and `404`, no prefix.** Sit alongside Crito's `01_`–`09_` page frames in the cluster. PEN-INVENTORY's `scope` column (`joel-only-no-crito-ref` vs `IN-SCOPE`) already classifies them — the frame name doesn't need to encode type. Simplest. Phase 30 (Design system) and Phase 31 (Homepage) will follow the same plain-name convention.

### Header / Footer Instancing + CTA / NavBack Factoring

- **D-77:** **Both FAQ + 404 page frames instance `Section / Header` (top) and `Section / Footer` (bottom) — Crito-source labels stay, no Joel override yet.** First real exercise of Phase 25's Section/Header (`G0wNOc`) + Section/Footer (`Xs0Hs`) outside their library frames. Proves cross-page consistency the moment per-page work begins. Section/Header's Crito-source nav labels (Phase 25 D-38) stay literal; Joel's v1.3 4-link override (Blog / Projects / FAQ / Contact) is deferred to Phase 31 Homepage instance time per Phase 25 D-38 carry-forward. Same for Section/Footer link columns (Phase 25 D-48).
- **D-78:** **Build `Section / CTA` as a NEW reusable component in `_Components / Sections` — 3 slots: headline / body / actions.** Slot signature: `headline-slot` (Text node, accepts heading-1 or heading-2 typography), `body-slot` (Text node, prose-paragraph typography, optional / `enabled:true` with placeholder per Phase 25 D-53), `actions-slot` (Frame, accepts Primitive/Button instances — 1 or 2 buttons). FAQ instances it as "Still have questions?" CTA (with STUB-labeled microcopy per D-82). Phase 31 Homepage may instance it for hero-CTA / footer-CTA / mid-page CTAs. Mirrors Phase 25 D-52 belt-and-suspenders documentation (Pencil-native slot props + sibling Pencil note). Same `enabled:true` placeholder default as Card per Phase 25 D-53.
- **D-79:** **Build `Section / NavBack` as a NEW reusable component in `_Components / Sections` — 404-only purpose, single signature.** Slot signature: `heading-slot` (Text node, accepts heading-2 typography) + `links-slot` (Frame containing 3–4 navigation links — text nodes styled with body typography, each pointing to a key page: Home, Blog, Projects, Contact). Built narrowly: NOT generalized for Blog "related posts" / Projects "related projects" — those are card-grid shapes, not link-list shapes. Phase 28 / 29 will build their own component if needed when they actually surface the requirement (Pitfall O5/O6 prevention).
- **D-80:** **Section/CTA + Section/NavBack are additions to Phase 25's `_Components / Sections` library — Phase 25 closed with only Header + Footer.** Both new components go into `g9oRa5` (the Phase 25 `_Components / Sections` parent frame). PEN-INVENTORY's `## Variant Evidence (Phase 24)` table gets two new rows for Phase 26 Section additions per Phase 25 D-56 audit-trail discipline. `_Components / Sections` library count goes from 2 (Header + Footer) to 4 (Header + Footer + CTA + NavBack).

### Microcopy + Fidelity Labels

- **D-81:** **404 message text is STUB'd — Plan 26-02 ships placeholder strings.** Plan 26-02 ships the 404 page frame with layout in place (big headline area + body area + nav-back row of links) but the actual headline + body text are placeholders: "Headline placeholder" + "Body placeholder". Fidelity label = STUB for the text nodes; the layout and nav-back row are EXACT (real Section/NavBack instance with real link labels). Real brand-voice microcopy deferred to a future content phase or the code milestone. Aligns with v2.0 milestone "Editing copy or projects.json content — content untouched in v2.0" guardrail (PROJECT.md Out of Scope) — though 404 doesn't have v1.3 content, the discipline applies symmetrically to NEW content too.
- **D-82:** **FAQ CTA microcopy STUB'd; FAQ Q+A content shipped verbatim from v1.3.** FAQ Q+A items are EXISTING content from `src/pages/faq.astro` lines 11–32 (5 Q+A pairs) — shipped as literal Pencil text nodes. Q items use the new `type-semantic-heading-2` token (D-72); A items use `type-semantic-prose-paragraph-*` (D-71). The CTA section ("Still have questions?" + "Get in touch" + button) is NEW content — STUB'd (placeholder strings + STUB fidelity label) like 404 (D-81). Mixed-fidelity treatment.
- **D-83:** **Per-section fidelity labels, not page-level (VALID-01 reading).** VALID-01 attaches labels to sections, not whole pages. FAQ page carries: Q+A list section = EXACT; CTA section = STUB; Header instance = EXACT (already shipped Phase 25); Footer instance = EXACT (already shipped Phase 25). 404 page carries: message section = STUB (text only — layout EXACT); NavBack section = EXACT; Header / Footer instances = EXACT. CALIBRATION-PROTOCOL.md (Plan 26-03) documents this per-section reading of VALID-01.

### Plan Task Structure

- **D-84:** **Phase 26 ships 4 plans, not the ROADMAP-listed 3.** Plans: 26-00 (foundation — `type-semantic-heading-2` token + Section/CTA + Section/NavBack components) → 26-01 (FAQ page frame reconstruction) → 26-02 (404 page frame reconstruction) → 26-03 (`CALIBRATION-PROTOCOL.md`). Phase 26 owns more than ROADMAP wrote when it didn't yet know two new Section components + one new token were needed. Plan-phase will reflect this in the plan inventory; ROADMAP's "Plans" entry for Phase 26 will be updated in-place by the planner.
- **D-85:** **Sequential plan ordering — 26-00 → 26-01 → 26-02 → 26-03, no waves.** FAQ before 404 because FAQ is richer (Q+A list + CTA section + new Section components instanced) and reveals more calibration-protocol shape; 404 simpler and applies what FAQ taught. Protocol codifies last. Mirrors Phase 25 D-57 reasoning ("plans run sequentially even though some could be parallel, because each plan's pattern informs the next").
- **D-86:** **User gate per per-page plan: calibration spot-check at plan close.** Plans 26-01 + 26-02 each end with an AskUserQuestion calibration gate per D-65 ("here's the pen-frame + token list, approve?"). Plans 26-00 (foundation) and 26-03 (protocol) close without user gates — they're agent-deterministic deliverables (token + 2 sections; markdown doc). Matches ROADMAP success criterion 3.

### Cross-Cutting / Carry-Forward

- **D-87:** **Pre-flight `mcp__pencil__get_editor_state` enforcement carries forward** from Phase 25 D-54 / Phase 24 D-35. Every Phase 26 plan that calls `set_variables`, `batch_design`, `find_empty_space_on_canvas`, or any Pencil-mutating tool first calls `mcp__pencil__get_editor_state({ include_schema: false })` and asserts active editor == `design/Crito.pen`. Halt and surface to user on mismatch. No exceptions.
- **D-88:** **PEN-INVENTORY extension pattern carries forward** from Phase 23 D-18 + Phase 24 D-23 + Phase 25 D-56. Phase 26 adds:
  - New rows for `FAQ` and `404` to the Frames Inventory table (scope: `joel-only-no-crito-ref`, joel_page_map: FAQ/404, frame_id: tbd after creation, status moving from joel-only-stub to `reconstructed-PHASE-26`)
  - New rows to `## Variant Evidence (Phase 24)` for `Section / CTA` + `Section / NavBack` per-property entries (D-80)
  - New row to `## Token Extensions (Phase 24)` for `type-semantic-heading-2` with source-evidence cite (D-72)
  - New section `## Open Flags — Phase 26 (OPEN-26-NN)` populated by any plan-surfaced flags
  - Updates to OPEN-23-10 (heading-2 part resolved by D-72; heading-3/4/5/6 still open) and OPEN-23-11 (re-pointed to Phase 28 per D-70 / D-73)

### Claude's Discretion

- **Auto-layout vs absolute positioning at the page-frame level** — Pencil guidelines say auto-layout for component internals; the page frame itself can be auto-layout vertical-stack (Section/Header → content sections → Section/Footer) OR fixed positioning. Plan 26-01 / 26-02 decide based on what makes the page frame easiest to navigate in Pencil's tree view; default lean toward auto-layout vertical stack at page level for consistency with how Crito Home Page (`ujMLJ`) likely structures.
- **Exact `type-semantic-heading-2` value** — Plan 26-00 first task consults the Crito .fig per D-72. If the .fig clearly depicts heading-2, use that. If not, Plan 26-00 raises OPEN-26-NN with proposed interpolation (e.g., Plus Jakarta Sans 32/700/lh 1.4) and surfaces to user via AskUserQuestion. This is the only mid-plan user gate carry-forward case (D-86 says foundation plan closes without user gate ONLY IF the .fig consult resolves cleanly).
- **Whether to include a `_Tokens & Foundations` slice screenshot inside the calibration artifact image, or just reference it by name** — Plan 26-01 / 26-02 calibration gate format detail. Default: just reference by name (filename `26-faq-qa-section--token-usage.png` is sufficient — separate artifact, single image per artifact). Up-merging the tokens-frame slice into the same image is possible if it improves spot-check ergonomics.
- **404 nav-back link content** — D-79 says 3–4 links to key pages. The actual link labels (e.g., "Home" / "Blog" / "Projects" / "Contact") are content-shaped but they're STRUCTURAL labels not microcopy. Default: ship the 4 link labels matching Joel's v1.3 Header nav (Blog / Projects / FAQ / Contact + Home). Same EXACT treatment as nav-back layout; STUB applies only to headline/body text.
- **Section/CTA + Section/NavBack token usage breadth** — both new sections compose Phase 24 primitives (Button, text nodes) and reference semantic tokens. Specific token-set used per component is plan-execution-level detail; same source-wins+inference discipline as Phase 25 D-55 applies.
- **Whether to publish a per-plan `snapshot_layout({ problemsOnly: true })` after each Plan 26-NN close** — matches Phase 24/25 plan-close discipline. Default: yes, runs at every plan-close, documented in 26-NN-SUMMARY.md with the Phase 24 text-clipping-quirk caveat documented in 24-05-SUMMARY.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment context, single-file strategy, desktop-only scope, "content untouched" boundary (informs D-81 / D-82 STUB treatment of NEW microcopy).
- `.planning/REQUIREMENTS.md` — Phase 26 requirements: PAGE-04 (FAQ), PAGE-08 (404), PAGE-09 (desktop-only), PAGE-11 (raster-removal-only-after-verify — applies only to crito-source branch per D-68), VALID-01 (fidelity labels — semantics redefined per D-63), VALID-02 (calibration artifact — redefined per D-62), VALID-03 (gap declaration).
- `.planning/ROADMAP.md` § "Phase 26" — Goal, Depends on (Phase 25), Success Criteria. **Important nuance:** ROADMAP success criteria 1, 3, 4 were written assuming Crito FAQ + 404 frames existed; Phase 23 audit surfaced that they don't. D-58 through D-83 interpret these criteria for the joel-only case.
- `.planning/STATE.md` — current position: Phase 25 COMPLETE, Phase 26 ready to plan.

### Phase 25 carry-forward (Phase 26 inherits these decisions directly)
- `.planning/phases/25-section-compound-components/25-CONTEXT.md` — Phase 25 decisions D-38 through D-57. Especially **D-38** (Crito-source nav labels stay literal — informs D-77), **D-40** (logo slot — informs Section/Header instancing on FAQ/404), **D-48** (Crito-source footer labels stay literal — informs D-77), **D-52** (belt-and-suspenders slot documentation — informs D-78 for Section/CTA), **D-53** (`enabled:true` slots with placeholders — applied to Section/CTA per D-78), **D-54** (pre-flight active-editor — carry-forward as D-87), **D-55** (source-wins + raster-probe-inference parallel disciplines — informs D-58 fresh-design-in-Crito-vocab choice), **D-56** (PEN-INVENTORY extension pattern — carry-forward as D-88), **D-57** (sequential plan ordering — informs D-85).
- `.planning/phases/25-section-compound-components/25-01-SUMMARY.md` — Section/Header structural details: G0wNOc inside g9oRa5; logo-slot id; 6 Crito-source nav labels with their text-node ids; CTA pairing (Default green + Secondary outline `hIWuC`); arrow-right icon slot pattern.
- `.planning/phases/25-section-compound-components/25-02-SUMMARY.md` — Section/Footer structural details: Xs0Hs inside g9oRa5; 3 link columns (not 4); Instagram lucide-native + Substack atomic-glyph `AzmgQ`; Chivo typography in footer.
- `.planning/phases/25-section-compound-components/25-03-SUMMARY.md` — Compound/Card structural details: t40xct inside t67DU6; 4-slot signature (image, title, body, footer-actions); Pencil 2.13 typed-slot quirk (suggestion-only); `enabled:true` placeholder defaults pattern Section/CTA carries forward.

### Phase 24 foundation (transitively referenced)
- `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md` — Phase 24 decisions D-21 through D-37. Especially D-22 (compositional minimum forward states), D-24 (source-wins discipline), D-29 (Button iconLeading/iconTrailing slot pattern — Section/CTA `actions-slot` may use Button instances with trailing arrow icons), D-33 (open token-extension policy — informs D-72 heading-2 addition), D-35 (pre-flight active-editor — carry-forward chain), D-37 (sibling library frame stubs — informs the `g9oRa5` Sections parent that hosts new Section/CTA + Section/NavBack).
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — primitive ids for Phase 26 instances: `Button / Default` (M7eUr), `Button / Secondary` (hIWuC — added Phase 25-01), `Input / Default` (nwJk7), `Icon / 24` (u7NmaS).

### Phase 23 token foundation (transitively referenced)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — token-naming convention (D-12 flat-dash), components-reference-semantic-only (D-14), OPEN-flag policy (D-09 — informs all OPEN-26-NN additions), PEN-INVENTORY plain-markdown discipline (D-18), Crito .fig consult fallback (D-04 — informs D-72 heading-2 source derivation).
- Phase 23 OPEN flags Phase 26 partially resolves:
  - **OPEN-23-04** — typography surface mostly from Home Page; FAQ + 404 are first joel-only consumers (informs scope reading)
  - **OPEN-23-06** — no Crito FAQ frame exists (Phase 26 confirms + ships fresh per D-58)
  - **OPEN-23-10** — heading-2 through heading-6 NOT shipped (Phase 26 ships heading-2 only per D-72; -3/-4/-5/-6 remain open for Phase 28+)
  - **OPEN-23-11** — prose-link / prose-list / inline-code NOT shipped (Phase 26 re-points all three to Phase 28 per D-70 / D-73)

### Audit / inventory source (read for every plan in Phase 26)
- `.planning/research/PEN-INVENTORY.md` — single source of truth. Phase 26 plans read:
  - Frame classifications (`joel-only-no-crito-ref` rows for FAQ + 404; Phase 26 updates these rows with `reconstructed-PHASE-26` markers per D-88)
  - Token surface (95 tokens shipped Phase 23, 0 extensions Phase 24, 0 extensions Phase 25, +1 extension Phase 26 = 96 tokens after D-72)
  - Phase 24/25 Open Flags Phase 26 may resolve depending on audit: none specific (FAQ + 404 don't carry forward Phase 24/25-shaped flags); Phase 26 adds OPEN-26-NN rows per D-88.
- `.planning/research/exports/v2.0/end-of-phase-25/id-inventory.json` — structural snapshot of `Crito.pen` after Phase 25. Plan 26-00 reads this to know primitive + section ids to instance + baseline ids that must not be mutated.

### Ground-truth source files (Phase 26 reads these via Pencil MCP, not direct file I/O)
- `design/Crito.pen` — the work surface. Phase 26 mutates:
  - NEW: `FAQ` page frame (D-74 + D-75 + D-76)
  - NEW: `404` page frame (same)
  - NEW: Section/CTA inside `_Components / Sections` (g9oRa5) (D-78 + D-80)
  - NEW: Section/NavBack inside `_Components / Sections` (g9oRa5) (D-79 + D-80)
  - NEW: `type-semantic-heading-2` variable (D-72)
  - Existing 17 frames (15 Crito baseline + Section/Header G0wNOc + Section/Footer Xs0Hs + Compound/Card t40xct + library parents avgor / t67DU6 / g9oRa5 + `_Tokens & Foundations` RpGbe) are read-only inputs.
- `design/images/Consulting & Agency Website Template I Crito (Community).fig` — fallback ground-truth per Phase 23 D-04. Plan 26-00 consults for `type-semantic-heading-2` derivation (D-72). Plan 26-01 may consult if FAQ heading-2 visual rendering needs tuning.
- `src/pages/faq.astro` (lines 11–32) — Joel's v1.3 FAQ content source. The 5 Q+A pairs ship verbatim into the FAQ page frame per D-82. Read for content extraction only; NOT a visual style reference (D-58).

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — themes T1 (variables-first — Phase 26 adds heading-2 per real consumer demand, not pre-emptively), T5 (don't repeat v1.4 — gaps get declared not filled — informs D-81 / D-82 STUB treatment), T6 (single-file strategy — FAQ + 404 frames in same `Crito.pen` per D-74), T8 (component variants on-demand only — informs D-79 NavBack narrow signature).
- `.planning/research/STACK.md` — Pencil MCP tool catalogue. `find_empty_space_on_canvas` (D-74) and `get_screenshot` (calibration artifacts per D-62 / D-64) are the key tools for this phase.
- `.planning/research/PITFALLS.md` — O5 / O6 (premature token hierarchies + component-library bloat — informs D-79 NavBack narrow scope), F3 (no eyedropping from raster — informs D-58 fresh-in-Crito-vocab vs mirror-v1.3 choice), 1 (no inventing primitives without source — informs D-70 / D-71 / D-72 prose tokens).

### Pencil MCP guidance (consulted during execution, not pre-read at planning)
- `mcp__pencil__get_editor_state({ include_schema: false })` — call FIRST in every 26-NN plan per D-87.
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call at start of plan 26-00 (Section/CTA + Section/NavBack authoring guidance, slot mechanics).
- `mcp__pencil__get_variables({})` — call to read the 95-token surface before Plan 26-00's `type-semantic-heading-2` extension; re-call after to verify 96-token surface.
- `mcp__pencil__set_variables` — Plan 26-00 task adding `type-semantic-heading-2`.
- `mcp__pencil__batch_design` — Plan 26-00 (Section/CTA + Section/NavBack), Plan 26-01 (FAQ page frame), Plan 26-02 (404 page frame).
- `mcp__pencil__find_empty_space_on_canvas` — Plan 26-01 + 26-02 page-frame placement per D-74.
- `mcp__pencil__get_screenshot` — calibration artifacts per D-62 / D-64.
- `mcp__pencil__snapshot_layout({ problemsOnly: true })` — per-plan close (text-clipping false positive from Phase 24 carries forward; document in 26-NN-SUMMARY.md per Phase 24 / 25 precedent).

### Outputs this phase produces (referenced by Phase 27+)
- `.planning/research/CALIBRATION-PROTOCOL.md` — NEW per D-66 + D-69. Inherited by Phase 27 / 28 / 29 / 30 / 31 as definition-of-done framework.
- `.planning/research/PEN-INVENTORY.md` extensions per D-88:
  - Frames Inventory: FAQ + 404 rows added (status `reconstructed-PHASE-26`)
  - Variant Evidence: Section/CTA + Section/NavBack rows
  - Token Extensions: `type-semantic-heading-2` row
  - Open Flags: `## Open Flags — Phase 26 (OPEN-26-NN)` section
  - OPEN-23-10 + OPEN-23-11 rows updated with Phase 26 status
- `.planning/ui-reviews/v2.0/` — calibration artifacts per D-64 naming convention. Phase 26 produces `26-faq-qa-section--token-usage.png`, `26-faq-cta-section--token-usage.png`, `26-404-message--token-usage.png`, `26-404-navback-section--token-usage.png` (or similar — exact count per per-section spot-check structure).
- 2 new page frames in `design/Crito.pen` (`FAQ`, `404`) + 2 new section components (`Section / CTA`, `Section / NavBack`) inside `_Components / Sections` + 1 new semantic token (`type-semantic-heading-2`).
- `.planning/research/exports/v2.0/end-of-phase-26/id-inventory.json` — structural snapshot per OPEN-23-01 substitution pattern (matches Phase 23 / 24 / 25 precedent).

</canonical_refs>

<code_context>
## Existing Code Insights

**Phase 26 makes NO `src/` code changes.** v2.0 is `.pen`-file-only (per PROJECT.md + REQUIREMENTS.md Out of Scope). The code-side observations below are content-extraction context only — they do NOT shape Phase 26 visual decisions (D-58 says fresh-design-in-Crito-vocab, not mirror-v1.3).

### Reusable Assets (content-only references, not visual references)
- `src/pages/faq.astro` (lines 11–32) — 5 v1.3 FAQ Q+A pairs. Content ships verbatim into the FAQ page frame per D-82. Visual style (native HTML accordion with neobrutalist borders + yellow shadows) explicitly NOT inherited per D-58.
- v1.3 has NO `src/pages/404.astro` — Astro auto-generates the default 404 at build time (only `dist/404.html` exists). No v1.3 content reference exists for 404 — supports the STUB microcopy treatment per D-81.
- `src/components/FAQ.astro` — v1.3 homepage FAQ component (different from `/faq` page). Same content overlap (4 of 5 Q+A pairs match `src/pages/faq.astro`). Not used by Phase 26 (Phase 26 maps to the `/faq` route family, not the homepage FAQ section).

### Established Patterns (Pencil-side, ARE Phase 26 inputs)
- **Variables-first → primitives → compounds → sections → page frames** — Phase 23 established tokens, Phase 24 built primitives, Phase 25 built compounds + sections, Phase 26 is the FIRST per-page reconstruction phase. Each layer references the next-lower layer's exports via semantic tokens per Phase 23 D-14 carry-forward. Phase 26 page frames instance Phase 25 Sections that instance Phase 24 Primitives that reference Phase 23 Tokens.
- **Single-file strategy** — everything in `design/Crito.pen`. Page frames live at the canvas level next to Crito's baseline page-frame cluster (D-74). Library frames at top of canvas with `_` prefix (Phase 24 D-37 carry-forward).
- **OPEN-flag system** — Phase 26 extends with `OPEN-26-NN` rows per D-88; partially resolves OPEN-23-10 (heading-2 only) and re-points OPEN-23-11 to Phase 28.
- **Pre-flight active-editor assertion** — D-87 carries forward from Phase 25 D-54 / Phase 24 D-35 / Phase 23 OPEN-23-14.
- **Plain-markdown audit trails** — Phase 23 D-18 + Phase 24 D-23 + Phase 25 D-56 set the pattern. Phase 26 D-88 extends with new tables / rows / OPEN section.
- **Probe-first within plans** — Phase 24/25 established this pattern. Phase 26 Plan 26-00 first probes Crito .fig for heading-2 values (D-72); Plan 26-01 first probes FAQ page-frame slot mechanics if needed.

### Integration Points
- **CALIBRATION-PROTOCOL.md is the bridge** to Phases 27–31 (per D-66). Every subsequent per-page phase reads it at plan-time to know which branch (crito-source vs joel-only) applies and which calibration script to run.
- **`type-semantic-heading-2` token is the bridge** to Phase 28 (Blog post titles), Phase 29 (Project detail page headlines), Phase 31 (Homepage sub-section headings — if Crito Home Page surfaces them). Phase 26 ships the token; downstream phases consume it. OPEN-23-10's heading-3/4/5/6 remain open for those phases to add if needed.
- **`Section / CTA` is the bridge** to Phase 31 Homepage (hero CTA / footer CTA / mid-page CTAs likely instance it).
- **`Section / NavBack` is intentionally narrow** — built for 404 only, not bridged forward to other phases per D-79 / O5 / O6 prevention.

</code_context>

<specifics>
## Specific Ideas

- **"Fresh design in Crito vocab" is the strongest single decision (D-58)** — it cascades into D-62 (token-usage calibration not raster pairing), D-63 (fidelity label re-definition), D-66 (unified protocol with branch), D-70 (no pre-emptive prose tokens). The whole calibration-workflow shape exists because v1.3 visuals are NOT the fidelity target — Crito vocabulary is. Anyone reading CONTEXT.md should treat D-58 as the anchor.
- **STUB-as-policy for NEW microcopy (D-81 + D-82)** is a coherent extension of PROJECT.md's "Editing copy or projects.json content — content untouched in v2.0" boundary. The boundary was written for EXISTING content; D-81 + D-82 extend it symmetrically to NEW content (404 brand-voice, FAQ CTA "Still have questions?"). v2.0 ships the LAYOUT for these surfaces; a future content-phase or code milestone ships the WORDS.
- **Per-section fidelity labels (D-83)** matter because FAQ has mixed fidelity (real Q+A content = EXACT, new CTA microcopy = STUB). Reading VALID-01 at the section level (not page level) lets the calibration artifact honestly communicate which slots are locked vs deferred.
- **Section/CTA is broadly useful; Section/NavBack is narrowly useful (D-78 vs D-79)** — same phase, opposite scoping policies, deliberate. Section/CTA built for cross-page reuse (FAQ + Homepage at least). Section/NavBack built for one consumer only (404), explicitly not generalized for Blog/Projects related-content shapes (those need card grids, different signature, different phase ownership).
- **`type-semantic-heading-2` ships as ONE token, not a heading-2-through-heading-6 family (D-72)** — strict Pitfall 1. FAQ Q items + 404 message body are the only real consumers; only heading-2 is added. heading-3 / -4 / -5 / -6 stay open as part of OPEN-23-10 for Phase 28 (Blog post hierarchy) or wherever a real consumer surfaces them.
- **Plan ordering FAQ before 404 (D-85)** is deliberate — FAQ is the richer test case (3 sections: Header + Q+A list + CTA + Footer; new Section/CTA component instanced; mixed-fidelity treatment). 404 is the simpler application of what FAQ taught. Protocol codifies what worked across both.
- **Crito-source labels stay in Section/Header + Section/Footer instances on FAQ + 404 (D-77)** — Joel's v1.3 4-link override is deferred to Phase 31 Homepage instance time per Phase 25 D-38 carry-forward. Phase 26 does NOT override labels; just instances the components as-built.

</specifics>

<deferred>
## Deferred Ideas

- **404 brand-voice microcopy** — Layout shipped Phase 26 (D-60), microcopy STUB'd (D-81). Real headline + body to be written in a future content phase or by the code milestone before /404 ships in code. Reserves the slot without committing to wording now.
- **FAQ CTA microcopy** — Same treatment (D-82). "Still have questions?" + "Get in touch" + button label all STUB until content phase or code milestone.
- **Joel's v1.3 4-link Header nav override** — Phase 25 D-38 already deferred to Phase 31 Homepage instance time; D-77 confirms Phase 26 inherits the deferral.
- **Joel-brand logo / wordmark in the Header logo slot** — Phase 25 D-40 deferred; Phase 26 does not address. Section/Header on FAQ + 404 instances the Header with the Crito-source logo placeholder.
- **prose-link semantic alias** — OPEN-23-11. Re-pointed from Phase 26 to Phase 28 (Blog) per D-70. Phase 28 will derive value from Crito .fig consult per D-04, or escalate to Joel design decision if .fig doesn't depict.
- **prose-list semantic alias** — Same as prose-link, re-pointed to Phase 28 per D-70.
- **prose-inline-code semantic alias** — OPEN-23-11. Stays deferred to Phase 28 per D-73, with the caveat that it may escalate to Joel design decision (agency-template prose rarely depicts inline code).
- **`type-semantic-heading-3` / -4 / -5 / -6** — OPEN-23-10. Phase 26 ships heading-2 only (D-72); remaining levels stay open for Phase 28 / 29 / 31 if real consumers surface.
- **Generalized `Section / RelatedNav`** — Phase 26 considered + rejected generalizing NavBack for Blog/Projects related-content shapes (D-79). Stays deferred; Phase 28 (Blog) or Phase 29 (Projects) may build a card-grid-shaped related-content section when their consumers actually surface the need.
- **Joel-brand fonts (Bricolage Grotesque, DM Sans) in Crito.pen** — PROJECT.md says these "still planned to be replaced when code milestones run on top of v2.0" (Out of Scope). Phase 26 explicitly NOT introducing them per D-58 (fresh-design-in-Crito-vocab, not v1.3-mirror).
- **Code-milestone `/faq` and `/404` route rewrites** — out of v2.0 scope. v1.3 `/faq` keeps rendering on v1.3 code throughout v2.0. v1.3 has no custom `/404` (Astro auto-generates); code milestone will need to build one consuming Phase 26's FAQ/404 frames.
- **Verifying the "provisional" flag on `type-semantic-prose-paragraph-*`** — Phase 26 consumes as-is per D-71. Phase 28 (Blog) is the higher-confidence verifier with real agency-prose surface area.

</deferred>

---

*Phase: 26-faq-404-reconstruction-calibration-workflow-established*
*Context gathered: 2026-06-06*
