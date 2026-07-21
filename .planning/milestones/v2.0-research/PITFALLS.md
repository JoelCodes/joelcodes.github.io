# v2.0 PITFALLS Research — Design-File Reconstruction Risks

**Milestone:** v2.0 Prep Crito Design File
**Domain:** Reconstructing a Figma-exported `.pen` file (mostly flat raster sections) into editable, factored Pencil components with a token system — feeding a downstream code milestone that already burned once on lossy-source-material divergence
**Researched:** 2026-05-31
**Confidence:** HIGH on pitfalls that derive from the documented v1.4 failure mode and from canonical design-system practice; MEDIUM on `.pen`-specific Pencil-tool ergonomics (see "Grounding Note" below)

---

## Grounding Note

The user instructed consulting the Pencil MCP (`get_editor_state`, `get_screenshot`) before writing. **The Pencil MCP tool surface is not exposed to this researcher subagent in the current session — only Read/Write/Bash/WebSearch/WebFetch are available.** This is an honest gap, not a skipped step.

What this research IS grounded in:
- v1.4 research artifacts that did successfully inventory the `.pen`: **15 page frames, zero factored components, Figma → Pen conversion flattened sections to raster** (`.planning/milestones/v1.4-research/ARCHITECTURE.md`)
- The documented v1.4 abandonment root cause: phases 23 + 24 implemented v2 code from best-guesses of flat images → "didn't look like what was in the pencil file" → both phases reverted on 2026-05-31 (`.planning/PROJECT.md`, `.planning/STATE.md`)
- The original Figma source is still present on disk (`design/Consulting & Agency Website Template I Crito (Community).fig`) and the import-time raster exports are in `design/images/image-import-*.{jpg,png}` — both can serve as ground truth during reconstruction

What this research is NOT grounded in:
- The current real-time state of `design/Crito.pen` (frame names, current variable definitions, how flat each section actually is *today* — could have shifted since the v1.4 ARCHITECTURE inventory)
- Pencil's specific component-definition affordances (slot model, variant model, variable scoping rules) at the schema level

**Roadmap consequence:** Phase 23 must begin with `get_editor_state(include_schema: true)` + per-frame `get_screenshot` audit as its **first concrete task**, not as preparation for a later task. The audit output becomes a versioned artifact the roadmap can reference. See Prevention Strategy P0.

---

## Fidelity Loss Pitfalls

How reconstructions drift from the original. The v1.4 abandonment IS this category — it must not repeat.

### F1. Best-Guess Interpretation from Lossy Source (v1.4 root cause)

**What goes wrong:** The flat raster of a section shows you final appearance but not *intent*. A 56px gap could be a deliberate spacing token, a one-off override, or a Figma layout side-effect. Without the original layered source, the reconstructor invents structure that looks plausible in isolation but diverges from the design's actual logic.

**Why it happens:** Reconstructors anchor on the visible artifact (the raster) and unconsciously fill missing information with conventions from their own design vocabulary. The neobrutalist instincts of the v1.3 codebase leaked into the v2 token "guesses" because the raster did not constrain hard enough.

**Concrete v1.4 failure:** Phases 23 + 24 built tokens, BaseLayoutV2, primitives, and a design-system page entirely in code based on best-guesses derived from the flat-image .pen. Final result: "didn't look like what was in the pencil file."

**Prevention:** For every reconstructed section, the original `.fig` (still on disk) and `image-import-*.{jpg,png}` exports are ground truth. Reconstructions must be calibrated against the original raster at the same zoom and viewport size. See Calibration Pitfall C1.

---

### F2. Eyeballed Measurements Become Token Soup

**What goes wrong:** Looking at a raster and saying "that looks like 24px" produces tokens that cluster near round numbers but don't match the original's actual values. Within one reconstruction session a designer can produce a spacing scale of `{12, 16, 24, 32, 48, 64}` from a Crito file that actually used `{8, 16, 24, 40, 64, 96}`. Every component built on the wrong scale looks subtly off but no single measurement is "wrong."

**Why it happens:** Pixel-perfect ruler measurement on a raster is hard; the human eye snaps to multiples of 4 or 8. The Figma source has exact values but the `.pen` import flattened that information out.

**Prevention:** Extract scale values from the original `.fig` file (open in Figma desktop, read variable definitions / spacing tokens directly) before defining Pencil variables. Do not derive spacing/typography scales from raster measurement.

---

### F3. Color Drift from Screen Capture or Raster Compression

**What goes wrong:** A color picked from a JPG export is not the original color. JPG chroma subsampling shifts hues; PNG is lossless but screen capture / export can apply color profile conversion. Eyedropping `#1A1A1A` from a raster when the source defined `#0F0F0F` produces a palette that "looks dark" but doesn't match.

**Why it happens:** When the original source isn't accessible, the raster export becomes the de-facto source. Designers reach for the eyedropper before reaching for the original file.

**Prevention:** Color tokens must come from the `.fig` source (Figma Variables panel) or from the Crito Figma community page's published token documentation if available — never from JPG eyedropping. PNG exports are safer than JPG but still secondary.

---

### F4. Typography Substitution Without Verifying the Original Stack

**What goes wrong:** The raster shows letterforms but not the font family. Reconstructor recognizes the genre ("looks like a geometric sans") and picks a near-match (Inter, DM Sans, Plus Jakarta) that ships approximately the right vibe but wrong x-height, wrong letter spacing, wrong stylistic alternates. Every text element on every page is now subtly wrong.

**Why it happens:** Font identification by sight is genuinely hard and most sans-serifs look interchangeable at body sizes. The temptation to "just pick a free Google Font that's close" is enormous.

**Prevention:** The Crito Figma community template has a published font list — verify it before defining Pencil typography variables. If verification is impossible, the roadmap must treat font choice as a separate, explicit decision with the user, not an inference task.

---

### F5. Layout Structure Inferred from Visual Appearance

**What goes wrong:** A section that looks like a 12-column grid in the raster might have been built in Figma as an Auto Layout horizontal stack with specific gap rules. Reconstructing as a 12-column grid means responsive breakpoints, gap behavior, and content reflow all diverge from intent.

**Why it happens:** Different layout primitives produce visually identical results at one viewport but diverge at every other viewport. The raster is one viewport.

**Prevention:** Inspect the original `.fig` for Auto Layout vs. absolute positioning vs. constraints. Mirror the structural choice in Pencil, not just the visual result. If unverifiable, flag and ask.

---

## Over-Engineering Pitfalls

The v2.0 milestone is a design-file reconstruction, not a code milestone. Inventing capabilities the source doesn't demand wastes the milestone and re-introduces v1.4-style over-interpretation.

### O1. Premature Variant Systems

**What goes wrong:** Reconstructor builds a Button component with `{variant: primary | secondary | ghost} × {size: sm | md | lg} × {state: default | hover | focus | disabled}` = 36 variant cells, but the Crito source only ever shows 3 button appearances on actual pages. The other 33 cells are invented design decisions presented as "design system completeness."

**Why it happens:** Component-library training data and Storybook conventions imply that a Button "should" have a full variant matrix. The reconstructor mistakes "complete-looking" for "correct."

**Prevention:** Build variants observed in the source, not variants imagined. If a state isn't depicted on any page in the original, do not invent it — flag it as an open question for the downstream code milestone to decide with real use cases.

---

### O2. Premature Responsive Design

**What goes wrong:** Reconstructor adds mobile and tablet frames for sections that the original `.pen` only shows at one (desktop) breakpoint. Each invented mobile variant is a design decision pretending to be a transcription.

**Why it happens:** Responsive coverage feels like table stakes. Skipping it feels incomplete.

**Prevention:** Reconstruct at the breakpoints the original provides. Mobile/tablet adaptation is a downstream code-milestone decision informed by, but not pre-empted by, this milestone. If the Crito `.fig` includes responsive variants, faithfully port them; if not, do not invent them.

---

### O3. Premature Dark Mode Tokens

**What goes wrong:** Reconstructor builds parallel light/dark color tokens because "every modern design system has dark mode." But PROJECT.md explicitly defers dark mode out of v2.0 scope (and v1.4 before it). Every dark-mode token is invented work that will diverge from whatever dark mode looks like when it's actually designed.

**Why it happens:** Token-system tutorials universally show light/dark pairs. The pattern is mistaken for a requirement.

**Prevention:** Light-mode tokens only in v2.0. Document in the design-system frame that dark mode is intentionally deferred. Do not pre-name `--color-surface-dark` to "leave room" — that's premature commitment.

---

### O4. Premature Animation / Interaction Specs

**What goes wrong:** Reconstructor adds hover transition timings, scroll reveal specs, micro-interaction notes to component specs even though the source `.pen` shows only static frames. Each spec is an invented design decision.

**Why it happens:** Pencil supports interaction notes; the impulse is to use the feature.

**Prevention:** Static reconstruction only. Interaction design is a separate phase, not bundled into the reconstruction milestone.

---

### O5. Premature Token Hierarchy Layers

**What goes wrong:** Reconstructor builds a 3-tier token system (`primitive → semantic → component`) when the source has 6 colors used in 8 places. The hierarchy is design-system theater — every primitive has exactly one semantic alias which is used in exactly one component, so the indirection adds maintenance without abstracting anything.

**Why it happens:** "Three tiers of tokens" is a published best practice. Applying it before tokens are stressed by real reuse is premature abstraction.

**Prevention:** Start with primitive tokens only. Promote to semantic tokens when the same primitive is genuinely reused across distinct meanings. Skip the component-tier entirely until v2.5+ if no concrete need.

---

### O6. Inventing a Component Library That's Bigger Than the Pages Demand

**What goes wrong:** Reconstructor factors a `<Avatar>`, `<Breadcrumb>`, `<Tabs>`, `<Tooltip>`, `<Modal>` library from the Crito reference even though Joel's existing page set (Homepage, Projects, Blog, FAQ, Contact, Thank-You, Design system, 404) uses none of them. Every invented primitive is design-system bloat with no downstream consumer.

**Why it happens:** The Crito reference is a full agency template covering pages Joel doesn't have. Reconstructing it wholesale imports the template's surface area, not just the parts Joel needs.

**Prevention:** Cross-reference every component candidate against Joel's actual page set (PROJECT.md "Out of Scope" explicitly excludes adopting the Crito page set wholesale). If a primitive serves only pages Joel doesn't have, don't factor it.

---

## Under-Specification Pitfalls

The opposite failure: components that LOOK complete in the design but ship without the information a downstream code milestone needs to build them correctly.

### U1. Token Semantics Not Named (Just Numbered)

**What goes wrong:** Reconstructor defines tokens as `color-1`, `color-2`, `space-1`, `space-2`. The code milestone has to invent meaning ("which one is the brand color? which is the surface?") and the meanings invented in code drift from the meanings the designer had in mind.

**Why it happens:** Naming is hard; numbering is easy. Pencil makes either possible.

**Prevention:** Every token name must include role (`color-brand-primary`, `color-surface-default`, `color-text-body`, `space-section-y`, not `color-1` / `space-3`). Add a short description per token in Pencil explaining the role.

---

### U2. Component Slot Signatures Missing or Implicit

**What goes wrong:** Reconstructor builds a `<Card>` with placeholder text "Card title" and "Card description" but doesn't mark them as slots. The code milestone doesn't know whether the title is a slot (consumer-provided) or hard text (always says "Card title"). Result: components get rebuilt in code with arbitrary prop shapes that diverge from each other (one card takes `{title, body}`, another takes `{children}`, a third takes `{header, content, footer}`).

**Why it happens:** Pencil's slot model may not be obvious or may require explicit annotation. Static placeholder text "looks done."

**Prevention:** Every reconstructed component must explicitly declare slots: which text is consumer-provided, which is fixed, which is optional. Document slot signatures in a sibling note frame next to each component definition. Reference: [Webflow on component slots](https://webflow.com/blog/component-slots), [Nathan Curtis on slots in design systems](https://nathanacurtis.substack.com/p/slots-in-design-systems).

---

### U3. State Coverage Incomplete

**What goes wrong:** Component is reconstructed in its default state only. Hover, focus, active, disabled, loading, error, empty states are absent. The code milestone has to invent each state, defeating the calibration goal of v2.0.

**Why it happens:** The flat-image `.pen` only shows the default state — that's all the raster captured. Reconstructor stops when "the static look matches."

**Prevention:** For every interactive component, the spec must include: default, hover, focus-visible, active, disabled. For form inputs, also: empty, filled, error, valid. If the source doesn't show a state, the reconstructor must either (a) consult the original `.fig` if it has the state, or (b) flag it as a deliberate design decision for the user. **Not inventing the state is acceptable; not flagging that it's missing is not.**

---

### U4. Responsive Behavior Not Specified Even When Source Has It

**What goes wrong:** Source shows section at 1440px; reconstructor mirrors it at 1440px in Pencil. Code milestone has to invent every breakpoint. If the original `.fig` actually had Auto Layout rules implying behavior down to 320px, that information is lost.

**Why it happens:** Pencil frames default to one viewport. Adding more frames is extra work.

**Prevention:** For every section, document at minimum: max-width, gutter, gap, content reflow rule. Add explicit mobile (375px) frames for any section whose mobile layout is non-obvious. Defer breakpoints that are genuinely undecided to a flagged open question.

---

### U5. Asset Provenance Not Captured

**What goes wrong:** Reconstructed component contains an icon, illustration, or photo placeholder. The spec doesn't say where the asset comes from — is it stock that ships with Crito, is it a Joel-supplied asset, is it Lucide icon library, is it a custom SVG? Code milestone has to chase down each asset, often guesses wrong.

**Why it happens:** Assets feel like content, not design system. They get pasted in without source tracking.

**Prevention:** Every asset placeholder must have a sibling note declaring source: `Source: Lucide / arrow-right` or `Source: Joel-supplied selfie (design/assets/selfie.jpg)` or `Source: Crito stock — REPLACE before code milestone`. Stock placeholders especially need flagging because they cannot ship.

---

### U6. Token-to-Component Bindings Not Visible

**What goes wrong:** Component uses raw hex `#FFEF6A` instead of `var color-brand-primary`. From the outside it looks identical, but the binding to the token system is lost. When the token changes, the component doesn't update. The "token system" is decorative; the components are hardcoded.

**Why it happens:** Pencil may make it easier to type a hex than to reference a variable. The shortcut accumulates.

**Prevention:** Hard rule — zero hex/RGB literals in component frames. Every fill, stroke, text color, font-family, font-size, spacing value must reference a variable. Add this to the per-section verification checklist; do not mark a section "done" until verified.

---

## "Jurassic Park" Reconstruction Pitfalls

PROJECT.md uses the Jurassic Park framing: reconstruct from incomplete DNA. Typical failure modes when filling gaps from fragments.

### J1. Filling Gaps with Personal Style Instead of Source Vocabulary

**What goes wrong:** Where the source is silent (a state not depicted, a section variant not shown, a breakpoint not designed), the reconstructor fills with their own design conventions. The reconstructed system is half-Crito, half-reconstructor. This is the v1.4 root cause expressed in design-tool form.

**Why it happens:** No designer is a blank slate. Filling gaps from "what looks right" pulls from training, not from the source.

**Prevention:** For every gap, the reconstructor must declare it as a gap (flagged note in Pencil) rather than silently filling it. The user resolves gaps as explicit decisions, not as inferences.

---

### J2. Cherry-Picking the Best Parts of the Original

**What goes wrong:** Reconstructor finds some sections of the original visually weak ("the testimonial carousel is dated") and "improves" them during reconstruction. The reconstructed `.pen` now diverges from the original on the reconstructor's aesthetic judgment, not on documented user preference.

**Why it happens:** Reconstruction work involves close looking, which surfaces critique. The instinct to fix while transcribing is strong.

**Prevention:** Reconstruct faithfully first. Variant designs ("improved testimonial section") go in a separate Pencil frame labeled VARIANT, not in the canonical reconstruction. The user decides whether to adopt the variant.

---

### J3. Reconstructing Sections Joel Won't Use

**What goes wrong:** Crito has 15 page frames including agency-specific pages (Team, View More, Free Design Sample, Information). PROJECT.md "Out of Scope" explicitly excludes adopting these wholesale. But if the reconstruction phase blindly walks every frame, time is spent reconstructing sections that have no downstream consumer.

**Why it happens:** "Reconstruct the .pen file" reads as "reconstruct every frame in the .pen file."

**Prevention:** Phase 23 inventory must classify each frame as `IN-SCOPE` (downstream code milestone will use it) or `OUT-OF-SCOPE` (Crito has it; Joel won't). Only IN-SCOPE frames get reconstructed. OUT-OF-SCOPE frames can be left flat or removed.

---

### J4. Hybrid Sections — Half Editable, Half Flat

**What goes wrong:** Reconstructor partially factors a section — text becomes editable, but the background graphic stays as a raster image embedded inside the component. Looks better than before, but the component still can't be tokenized fully. Worse, the hybrid state hides the remaining work because the section looks "done."

**Why it happens:** Some elements (gradients, custom shapes, photography) are genuinely hard to recreate vectorially. Stopping at "mostly editable" is the path of least resistance.

**Prevention:** A section is either flat (deferred) or fully editable (done). Hybrid sections are explicitly marked HYBRID with a note declaring what remains rasterized and why. The inventory tracks this state.

---

### J5. Forgetting That the .fig and Image Exports Are Still Ground Truth

**What goes wrong:** Reconstructor treats the current `.pen` as the source of truth, forgetting that `design/Consulting & Agency Website Template I Crito (Community).fig` and `design/images/image-import-*.{jpg,png}` exist on disk and are the original sources the `.pen` was derived from. Reconstruction errors inside the `.pen` propagate without challenge.

**Why it happens:** The `.pen` is the active file; the `.fig` is "old." The mental model shifts.

**Prevention:** The reconstruction protocol is `original .fig (or image-import-*.{jpg,png}) → reconstructed Pencil component → calibration check`. The `.fig` is always consulted, not just at the start.

---

## Calibration / Honesty Pitfalls

How to stay honest about fidelity gaps as reconstruction proceeds.

### C1. No Side-by-Side Comparison Routine

**What goes wrong:** Reconstructor builds a section, judges it "looks right," moves on. By section 8 of 15, the cumulative drift from the original is significant but invisible because no comparison was done. The v1.4 failure was discovered only at integration time (when code tried to render the pages).

**Why it happens:** Side-by-side comparison is slow and requires switching apps/windows. The pressure to make progress squeezes out the calibration step.

**Prevention:** After every section reconstruction, perform a structured side-by-side: original `.fig` (or `image-import-*` raster) and reconstructed Pencil frame at the same zoom, in the same viewport, screenshotted into the planning notes. The roadmap must define this as a required gate per section, not optional.

---

### C2. No Pixel-Diff or Screenshot Regression

**What goes wrong:** Eyeball comparison ("looks the same to me") fails to catch subtle drift (off-by-2px spacing, slightly wrong color). Without a quantitative diff, fidelity claims are unverifiable.

**Why it happens:** Pixel-diff tooling for design files is less mature than for code. Setting it up feels like infrastructure overhead.

**Prevention:** For each reconstructed section, export both the original raster and a `get_screenshot` of the reconstructed Pencil frame at the same dimensions. Use `compare` (ImageMagick) or any image-diff tool to produce a delta image. Highlight regions over a threshold (e.g., >5% pixel difference) for re-review. This does not need to be CI-grade — local script is enough.

---

### C3. Calibration Done Once at the End, Not Throughout

**What goes wrong:** Reconstructor delays all calibration to a "QA pass" at the end of the milestone. By then, fixes require reworking every component, often invalidating downstream component compositions. This is exactly what v1.4 did — implemented all of phases 23 + 24 before stepping back to ask "does this look like the design?"

**Why it happens:** Calibration feels like a finishing step. Doing it per-section feels redundant.

**Prevention:** Calibration is per-section, not per-milestone. The roadmap must put the calibration step inside the per-section plan, not as a separate phase at the end. "Build section + calibrate section" is one unit of work, not two.

---

### C4. Overstating Fidelity in Status Updates

**What goes wrong:** Phase logs say "Hero section reconstructed" when what actually shipped is "Hero section approximately reconstructed, color is close, spacing is eyeballed." Downstream readers (including future Claude sessions) take "reconstructed" at face value. The v1.4 STATE.md entries did not capture the fidelity gap until the abandonment commit.

**Why it happens:** Optimistic phrasing is the default in status updates. Hedges feel like admitting failure.

**Prevention:** Per-section status uses a fidelity scale: `EXACT (pixel-diff <X%)`, `APPROXIMATE (visible drift, deemed acceptable)`, `STUB (placeholder only)`. No section is marked done without a fidelity label. APPROXIMATE and STUB sections are listed as carry-over risks for the downstream code milestone.

---

### C5. Failing to Capture What the Source Doesn't Show

**What goes wrong:** Calibration confirms what was reconstructed matches the source. It does NOT surface what's missing from the source entirely (no error state for the form, no empty state for the blog index, no 404 page design). Coverage gaps stay invisible.

**Why it happens:** "Did the thing I built match?" is easier than "Is there anything I should have built that I didn't?"

**Prevention:** The per-section verification includes a coverage checklist (every state listed in U3 above, every breakpoint, every interaction). Items not present in the source are flagged OPEN, not silently skipped.

---

### C6. Reconstructor Is Also the Validator (No Second Look)

**What goes wrong:** The same Claude session that reconstructs a section judges its own fidelity. Cognitive bias toward "the thing I made looks right" is strong. v1.4 had no second-look pass; the reconstruction was approved by the same agent that built it.

**Why it happens:** Async, single-agent workflow makes a second reviewer expensive.

**Prevention:** At minimum, the user is the second-look reviewer — but only if shown side-by-side artifacts. The roadmap must include explicit checkpoints where the user is asked to spot-check (not just approve a phase plan). Where possible, a fresh Claude session (no context from the build) does the calibration screenshot pass.

---

## Prevention Strategies (Roadmap Hooks)

Each pitfall above has a prevention strategy. This section consolidates them as concrete checks the roadmap can adopt — one per pitfall, expressed as a step the roadmap author can copy into a phase plan.

### P0. First Task of Phase 23: Inventory via Pencil MCP

**Adopts:** Grounding gap, F1, J3, J4
**Step:** Before any reconstruction work, call `get_editor_state(include_schema: true)`, then `get_screenshot` for every frame in `design/Crito.pen`. Produce a versioned inventory file (e.g., `.planning/research/PEN-INVENTORY.md`) listing each frame with: name, current state (flat raster / partially editable / fully editable / hybrid), in-scope or out-of-scope for Joel's page set, dimensions, screenshot reference. Treat this file as the canonical reconstruction worklist.

### P1. Ground-Truth Calibration Per Section

**Adopts:** F1, C1, C3, C6
**Step:** Every per-section plan ends with: (1) export reconstructed section via `get_screenshot`, (2) place beside original `image-import-*.{jpg,png}` at same dimensions, (3) generate side-by-side image saved to `.planning/ui-reviews/v2.0/section-name.png`, (4) ask the user to spot-check before marking section done.

### P2. Source Values, Not Eyeballed Values

**Adopts:** F2, F3, F4
**Step:** Before defining any token (color, spacing, typography), the phase plan must include a step that extracts the value from `design/Consulting & Agency Website Template I Crito (Community).fig` (open in Figma desktop, read variable panel) or from the Crito Figma community page documentation. The plan explicitly forbids eyedropping from JPG and forbids "looks like a multiple of 8" spacing scales.

### P3. Layout Structure Inspection

**Adopts:** F5
**Step:** For every section, the plan inspects the `.fig` source to determine whether the section uses Auto Layout, absolute positioning, or constraints, and mirrors that structural choice in Pencil. Recorded in the per-section spec.

### P4. Variant Discipline — No Inventing

**Adopts:** O1, O4
**Step:** Component variant matrices must be justified by per-variant evidence from the source ("primary button appears on Hero, Contact"; "secondary button appears on Hero, About"). Variants without source evidence are listed as OPEN questions, not built.

### P5. Light Mode + Source Breakpoints Only

**Adopts:** O2, O3
**Step:** Phase 23 token foundation explicitly omits dark mode tokens. Reconstruction happens at breakpoints present in the source; mobile/tablet reconstruction only if the source has those frames. Out-of-scope items get a one-line note in the design-system frame ("Dark mode deferred to v2.5+").

### P6. Token Hierarchy by Demand, Not by Pattern

**Adopts:** O5
**Step:** Phase 23 defines primitive tokens only. A semantic token tier is introduced only when a primitive is genuinely reused across distinct meanings. Component-tier tokens deferred entirely. The roadmap should not pre-allocate phase work for semantic-tier definitions until reuse is demonstrated.

### P7. Component Library Scoped to Joel's Page Set

**Adopts:** O6, J3
**Step:** Each candidate Pencil component is cross-referenced against Joel's actual pages (Homepage, Projects, Blog, FAQ, Contact, Thank-You, Design system, 404) before factoring. Components serving only out-of-scope pages are skipped. The inventory file from P0 already tags scope; component plans inherit it.

### P8. Token Names with Roles

**Adopts:** U1
**Step:** Phase 23 establishes a naming convention: `color-{role}-{variant}`, `space-{purpose}`, `text-{level}`. Variable names like `color-1` / `space-3` are forbidden. Linting can be a manual grep of variable names against the convention before phase close.

### P9. Slot Signatures Documented Per Component

**Adopts:** U2
**Step:** Every reconstructed component has a sibling Pencil note declaring its slot signature: which children are consumer-provided, which are fixed, which are optional, with type hints. Plan template includes this as a required field; component is not "done" without it.

### P10. State Coverage Checklist Per Interactive Component

**Adopts:** U3, C5
**Step:** For Buttons, Inputs, Cards-with-actions: every reconstruction includes default + hover + focus-visible + active + disabled frames (and empty/error/valid for inputs). States not present in the source are explicitly flagged OPEN in the design-system frame, not silently skipped.

### P11. Asset Provenance Notes

**Adopts:** U5
**Step:** Every image, icon, or illustration placeholder has a sibling note: `Source: [Lucide / Joel-supplied / Crito stock — REPLACE / Custom SVG]`. Stock-placeholder sections cannot be marked done without an action item to replace.

### P12. Zero Hex Literals in Components

**Adopts:** U6
**Step:** Per-section verification step: search component fills/strokes/text for raw hex/RGB values. Zero literals allowed; everything must reference a variable. Manual review against `get_editor_state` output before phase close.

### P13. Gap Declaration, Not Gap Filling

**Adopts:** J1, J2
**Step:** When the reconstructor encounters a missing piece (state not depicted, ambiguous spacing, undefined breakpoint), the response is to add a flagged note in Pencil ("OPEN: hover state for Button not in source — needs decision") rather than fill with personal preference. Aesthetic variants ("improved testimonial") go in separate VARIANT frames, not in the canonical reconstruction.

### P14. Hybrid Section Tracking

**Adopts:** J4
**Step:** The inventory file (P0) has three states: FLAT, HYBRID, FULLY-EDITABLE. HYBRID sections include a note declaring what remains rasterized and why. Hybrid is acceptable but visible; it cannot be silently labeled "done."

### P15. Fidelity Labels in Status Updates

**Adopts:** C4
**Step:** Per-section status uses an explicit fidelity scale: `EXACT` (calibration shows minimal drift), `APPROXIMATE` (visible drift, accepted), `STUB` (placeholder only). All section close-out notes carry one of these labels. STATE.md milestone progress reflects fidelity, not just completion.

### P16. User Spot-Check Cadence

**Adopts:** C6
**Step:** The roadmap defines explicit user checkpoints (every N sections, or every phase close) where the user is asked to review side-by-side calibration screenshots before the next phase starts. Not just plan approval — actual visual verification.

---

## Open Questions

Items the roadmapper or user needs to resolve before Phase 23 can start cleanly.

1. **Does the Crito Figma community page publish token documentation (colors, fonts, spacing scale) externally?** If yes, the roadmap can cite it as ground truth. If no, P2's "read variables from `.fig` source" path is the only ground-truth source — confirm the `.fig` file opens cleanly and exposes variables.

2. **What is Pencil MCP's component / variant / slot model?** P9 and P10 assume Pencil supports per-component slot annotations and state-variant frames. The first call to `get_editor_state(include_schema: true)` will answer this. The roadmap may need to adapt P9/P10 if Pencil's model differs (e.g., uses overrides instead of slots).

3. **Who runs the calibration screenshot diff?** P1 and P16 require a side-by-side artifact at every section close. Options: (a) Claude generates via `get_screenshot` + ImageMagick locally and the user reviews; (b) the user manually does both. (a) is the recommendation, but it requires the Pencil MCP being available to the executor agent at every phase — confirm.

4. **Will the `.pen` file be committed at every section close (snapshot per section), or only at milestone close?** Per-section commits enable revert-on-drift if a section reconstruction is rejected. Milestone-close commits keep the history clean but lose section-level rollback. Recommendation: commit per section (matches v1.3 phase-close discipline).

5. **What's the user's appetite for OPEN-flagged gaps?** P13 will produce many OPEN flags (states not in source, breakpoints not depicted, assets to replace). The roadmap needs a policy: does each OPEN block phase close, or does the milestone close with a list of OPENs for v2.5? Recommendation: OPENs do not block phase close, but the milestone close cannot happen with more than N OPENs in a critical category (state coverage, asset provenance).

6. **Is the original Crito `.fig` file editable in Figma desktop on Joel's machine?** P2, P3, F2, F3, F4 all depend on the `.fig` source being inspectable. If `.fig` opens fine, reconstruction is grounded. If `.fig` is corrupted / requires Figma account / Joel doesn't have Figma installed, the only ground truth is the JPG/PNG raster exports plus the partial `.pen` — which is exactly the lossy situation that broke v1.4.

7. **Should the inventory phase (P0) be its own phase, separate from token foundation?** Recommendation: yes — the inventory is the input to every subsequent phase plan. Make it Phase 23, push token foundation to Phase 24, etc.

---

## Sources

### Primary (HIGH confidence — direct artifacts)
- `.planning/PROJECT.md` (current as of 2026-05-31) — v2.0 milestone scope, v1.4 abandonment root cause statement
- `.planning/STATE.md` (current as of 2026-05-31) — milestone history, v1.4 abandonment commits
- `.planning/milestones/v1.4-research/PITFALLS.md` — prior pitfalls research (code-side; v2.0 pitfalls above are the design-side complement)
- `.planning/milestones/v1.4-research/SUMMARY.md` — confirms "Crito `.pen` contains 15 page frames but originally zero reusable components (Figma → Pen conversion flattened them)"
- `.planning/milestones/v1.4-research/ARCHITECTURE.md` — `.pen` file structure recommendation, per-page file split
- `.planning/milestones/v1.4-research/FEATURES.md` — Crito section-by-section inspection (images 8, 12–15)
- Filesystem inspection: `design/Crito.pen` exists; `design/Consulting & Agency Website Template I Crito (Community).fig` exists; `design/images/image-import-*.{jpg,png}` 27+ exports exist

### Secondary (MEDIUM confidence — design-systems best practice)
- [Webflow — Embracing more composability in your design system with component slots](https://webflow.com/blog/component-slots) — slot model rationale used in U2/P9
- [Nathan Curtis — Slots in Design Systems](https://nathanacurtis.substack.com/p/slots-in-design-systems) — slot specification (name, description, default value) used in U2/P9
- [Figma — How to Supercharge your Design System with Slots](https://www.figma.com/blog/supercharge-your-design-system-with-slots/) — slot conventions reference
- [UX Collective — Prevent component detaching in design system with slots](https://uxdesign.cc/prevent-component-detaching-in-design-system-with-slots-ec4c01aaf360) — slot-vs-detach reasoning
- [zeroheight — Figma Design Systems in 2026: 26 Scalable Features](https://zeroheight.com/blog/building-scalable-design-systems-with-figma-26-tips-for-2026/) — current design-system patterns
- [zeroheight — How to Structure Figma Variables & Design Tokens](https://zeroheight.com/blog/figma-variables-and-design-tokens-part-one-variable-architecture/) — token hierarchy patterns referenced in O5/P6

### NOT consulted (gap to close in Phase 23)
- Pencil MCP `get_editor_state(include_schema: true)` — not available to this researcher subagent in current session; **must run as Phase 23 first task**
- Pencil MCP `get_screenshot` per frame — same as above
- Pencil MCP `get_variables` — Pencil's current variable schema unknown; P8 naming convention may need adaptation once schema is known
- Pencil MCP `get_guidelines` — Pencil's own authoring conventions unread; may add or change pitfalls

---

*Pitfalls research for: v2.0 Prep Crito Design File — design-file reconstruction risks complementing v1.4 code-side pitfalls*
*Researched: 2026-05-31*
