---
phase: 25
slug: section-compound-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-01
---

# Phase 25 — Validation Strategy

> Per-phase validation contract for `.pen`-only structural completeness. No runtime tests — validation is artifact presence + structural completeness + token-binding integrity via Pencil MCP read tools. Mirrors Phase 24's VAL-24-* pattern.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Pencil MCP read tools (`batch_get`, `snapshot_layout`, `get_variables`, `get_editor_state`) + Claude-side property walker (OPEN-23-02 workaround) + grep over PEN-INVENTORY.md |
| **Config file** | none — Pencil MCP is the runtime; no install step |
| **Quick run command** | `mcp__pencil__snapshot_layout({ rootId: "<section-or-compound-id>", problemsOnly: true })` per-component |
| **Full suite command** | Recursive `batch_get(readDepth: 4)` over `_Components / Sections` (g9oRa5) + `_Components / Compounds` (t67DU6) + Phase 25 Button Secondary additions; property-walker → cross-ref PEN-INVENTORY.md; covered by Phase 25 close sweep |
| **Estimated runtime** | ~30 seconds per component (`snapshot_layout` is the dominant cost); ~2 min for full sweep |

---

## Sampling Rate

- **After every plan completes (25-01 / 25-02 / 25-03):** Run `snapshot_layout({ rootId, problemsOnly: true })` on the component(s) that plan created/touched + `batch_get` validation of structural assertions for that plan.
- **After plan 25-03 close (Phase 25 sweep):** Run the full Claude-side property walker over `_Components / Sections` + `_Components / Compounds` + any Phase 24 primitive nodes mutated by D-43 Secondary-variant addition; cross-ref against PEN-INVENTORY.md `## Tokens Written` + `## Variant Evidence (Phase 24)` (extended) + new `## Compound Source Inference (Phase 25)` section.
- **Before `/gsd:verify-work`:** All 23 VAL-25-* assertions must pass; reference set archived; `id-inventory.json` written for `end-of-phase-25/`.
- **Max feedback latency:** ~30 seconds per component (`snapshot_layout`); ~2 min for full sweep.

---

## Per-Task Verification Map

| Validation ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| VAL-25-01 | 25-01 | 1 | COMP-05, COMP-08 | — | `Section/Header` present under `_Components / Sections` (g9oRa5) | structural | `batch_get(g9oRa5, readDepth: 2)` → assert `Section / Header` child node present, marked `reusable: true` | ❌ W0 | ⬜ pending |
| VAL-25-02 | 25-02 | 1 | COMP-06, COMP-08 | — | `Section/Footer` present under `_Components / Sections` (g9oRa5) | structural | `batch_get(g9oRa5, readDepth: 2)` → assert `Section / Footer` child node present | ❌ W0 | ⬜ pending |
| VAL-25-03 | 25-03 | 1 | COMP-07, COMP-08 | — | `Compound/Card` present under `_Components / Compounds` (t67DU6); single component (NOT multi-variant matrix) | structural | `batch_get(t67DU6, readDepth: 2)` → assert single `Compound / Card` child, no parallel `Compound / Card / Project`, `Compound / Card / Blog`, etc. variants | ❌ W0 | ⬜ pending |
| VAL-25-04 | 25-03 | 1 | COMP-07 (slot-not-variant) | — | Card has exactly 4 slots: image, title, body, footer-actions (per D-51) | structural | `batch_get(<cardId>, readDepth: 3)` → enumerate `slot` properties, assert count == 4 with expected names | ❌ W0 | ⬜ pending |
| VAL-25-05 | 25-03 | 1 | D-53 (library discoverability) | — | All 4 Card slots default `enabled: true` with placeholder content (image rect, "Card title" text, body filler, Button instance in footer-actions) | structural | Same batch_get → assert `enabled: true` on each slot + non-empty child node for each | ❌ W0 | ⬜ pending |
| VAL-25-06 | 25-03 | 1 | D-52 (slot documentation belt-and-suspenders) | — | Pencil-native typed slot props on Card slots (where probe succeeds) AND sibling Pencil note documenting slot signature | structural | Verify `slot: [...]` array on 1+ Card slots; verify sibling note exists under t67DU6 with slot-signature text | ❌ W0 | ⬜ pending |
| VAL-25-07 | 25-01 | 1 | D-42, COMP-05 | — | Section/Header instances Primitive/Button at least TWICE (dual CTA: Default green + Secondary outline) | structural | `batch_get(<headerCtaRow>, readDepth: 2)` → confirm 2 Button `ref` instances | ❌ W0 | ⬜ pending |
| VAL-25-08 | 25-01 | 1 | D-44, OPEN-24-06 resolution | — | Both Header CTA Button instances have `iconTrailing` slot ENABLED + populated with `Primitive/Icon` ref containing lucide `arrow-right` | structural | Walk each header-CTA → assert `V4Dx4i`-bound descendant has `enabled: true` AND contains `type: icon, library: lucide, icon: arrow-right` | ❌ W0 | ⬜ pending |
| VAL-25-09 | 25-02 | 1 | D-45, D-46, OPEN-24-13 resolution | — | Footer instances Icon for Instagram (lucide-native Pattern A OR Pattern B fallback per probe) AND Substack (Pattern B atomic-glyph per D-46) | structural | Walk footer social-row → assert 2 icon nodes; verify Instagram is `type: icon, library: lucide, icon: instagram` OR `ref` to Pattern B atomic; verify Substack is `ref` to Pattern B atomic glyph at `_Components / Primitives / Icon / glyphs / substack` | ❌ W0 | ⬜ pending |
| VAL-25-10 | 25-02 | 1 | D-46 (source-citation discipline) | — | Pattern B Substack atomic-glyph SVG path matches simpleicons canonical (provenance attestation) | structural | `batch_get(<substackGlyphId>, readDepth: 2)` → extract `path` attribute, confirm match against simpleicons.org Substack canonical (verified 2026-06-01 per RESEARCH.md) | ❌ W0 | ⬜ pending |
| VAL-25-11 | 25-01 | 1 | D-42, D-43, OPEN-24-11 resolution | — | Secondary Button variant present — either as new variant cell inside `Primitive/Button` (D-43 preferred) OR as sibling `Primitive/Button/Secondary` (D-43 fallback) — with source-evidenced values (fill: none, stroke literal, strokeWidth: 0.5, source citation `mkw8g`) | structural | Walk `M7eUr` OR `avgor` → assert Secondary cell/component present + source-evidenced property values | ❌ W0 | ⬜ pending |
| VAL-25-12 | 25-01, 25-02, 25-03 | 1 | COMP-09, LAYOUT-01 carry-forward | — | Sections + Compound + Substack glyph use Pencil auto-layout (no absolute-positioned children) | structural | Per-component `layout` property check + `snapshot_layout` structural pass | ❌ W0 | ⬜ pending |
| VAL-25-13 | 25-03 (close sweep) | 2 | COMP-09 (zero-raw-values) | — | Zero raw color hex + zero raw px spacing inside any Phase 25 node, beyond accepted Phase 23 + Phase 24 + Phase 25 Variant Evidence set | structural | Claude-side recursive property walker over `_Components / Sections` + `_Components / Compounds` + new Substack glyph + Secondary Button addition → cross-ref every literal against PEN-INVENTORY accepted literals + new Phase 25 Variant Evidence rows | ❌ W0 | ⬜ pending |
| VAL-25-14 | 25-01, 25-02, 25-03 | 1 | D-54 (active-editor pre-flight) | T-23-T4 carry-forward | Every `batch_design` / `set_variables` call across Phase 25 preceded by `get_editor_state` assertion that active editor == `design/Crito.pen` | boundary | Grep each `25-NN-SUMMARY.md` for `get_editor_state` pre-flight result before any mutation batch; assert zero recorded mismatches across ~6-10 calls | ❌ W0 | ⬜ pending |
| VAL-25-15 | 25-01, 25-02, 25-03 | 1 | Phase 24 quirk carry-forward (24-05-SUMMARY) | — | `snapshot_layout(maxDepth: 0, problemsOnly: true)` at document root returns `"No layout problems."`; per-frame text-clipping false-positives documented per Phase 24 quirk | structural | Document-level snapshot + per-frame snapshot in each `25-NN-SUMMARY.md` with text-clipping-quirk caveat documented | ❌ W0 | ⬜ pending |
| VAL-25-16 | 25-01, 25-02, 25-03 | 1 | D-23 (Variant Evidence audit-trail) | — | PEN-INVENTORY § "Variant Evidence (Phase 24)" EXTENDED with Phase 25 rows per D-56 (Secondary Button cell + each Section variant cell + Card slot bindings); OR new sibling section per Claude's Discretion | structural | Diff PEN-INVENTORY before/after Phase 25 — verify N new rows with proper schema (component_path, location, property, value, semantic_ref, source_evidence, rationale) | ❌ W0 | ⬜ pending |
| VAL-25-17 | 25-03 | 1 | D-49 (raster-probe provenance) | — | PEN-INVENTORY adds new section `## Compound Source Inference (Phase 25)` per D-49 + D-56 with per-slot raster citations for Card | structural | Verify section header exists; verify rows reference `image-import-12.jpg`, `image-import-14.jpg`, `image-import.jpg`, `image-import-22.jpg`, `image-import-8.jpg` (or whichever subset Plan 25-03 cites) | ❌ W0 | ⬜ pending |
| VAL-25-18 | 25-01, 25-02, 25-03 | 1 | D-50, Phase 23 D-09 carry-forward | — | OPEN-25-XX flag rows added (Card source-coverage at minimum per D-50; any other discovered flags) | structural | Verify `### Open Flags — Phase 25 (OPEN-25-NN)` section in PEN-INVENTORY with at least 1 row (Card source-coverage) | ❌ W0 | ⬜ pending |
| VAL-25-19 | 25-01 | 1 | D-44, OPEN-24-06 resolution | — | OPEN-24-06 marked RESOLVED with citation to Plan 25-01 Header CTA `iconTrailing` wire-up | audit | PEN-INVENTORY § Open Flags — Phase 24 → OPEN-24-06 row Resolution column updated with "Resolved 25-01: Header CTAs wired Primitive/Icon arrow-right via iconTrailing slot, empty-slot collapse [behaviors observed]" | ❌ W0 | ⬜ pending |
| VAL-25-20 | 25-01 | 1 | D-42, D-43, OPEN-24-11 resolution | — | OPEN-24-11 marked RESOLVED with citation to Plan 25-01 Task 0 (Secondary Button variant addition) | audit | PEN-INVENTORY § Open Flags — Phase 24 → OPEN-24-11 row Resolution column updated | ❌ W0 | ⬜ pending |
| VAL-25-21 | 25-02 | 1 | D-45, D-46, OPEN-24-13 resolution | — | OPEN-24-13 marked RESOLVED with citation to Plan 25-02 Instagram + Substack glyph ships | audit | PEN-INVENTORY § Open Flags — Phase 24 → OPEN-24-13 row Resolution column updated; PEN-INVENTORY § Glyphs Shipped extended with Instagram (Pattern A) + Substack (Pattern B) rows | ❌ W0 | ⬜ pending |
| VAL-25-22 | 25-03 (close sweep) | 2 | OPEN-23-01 substitution pattern carry-forward | — | `end-of-phase-25/id-inventory.json` exists with library_parents, sections (Header + Footer + IDs), compounds (Card + slot IDs), substack_glyph, secondary_button (if D-43 path used), validation_outcomes (VAL-25-01..23 all PASS or N/A) | structural | `test -f .planning/research/exports/v2.0/end-of-phase-25/id-inventory.json` + JSON schema check | ❌ W0 | ⬜ pending |
| VAL-25-23 | 25-01, 25-02, 25-03 (close gates) | 1 | Plan-close discipline carry-forward | — | User visual checkpoint approved at each plan close + final Phase 25 close gate | manual | Reference screenshot review log entries recorded inline in each 25-NN-SUMMARY.md `## Reference Screenshot Set (VAL-25-23)` block | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/research/PEN-INVENTORY.md § "Variant Evidence (Phase 24)"` — extended row scaffolding for Phase 25 Secondary Button cell + Section + Card rows; Phase 24's schema (component_path | location | property | value | semantic_ref | source_evidence | rationale) reused per D-23.
- [ ] `.planning/research/PEN-INVENTORY.md § "Compound Source Inference (Phase 25)"` — NEW section header scaffolded by Plan 25-03 first task (D-49); empty table header per D-18 plain-markdown discipline.
- [ ] `.planning/research/PEN-INVENTORY.md § "Open Flags — Phase 25 (OPEN-25-NN)"` — NEW section header scaffolded by Plan 25-03 first task; OPEN-25-01 (Card source-coverage per D-50) is the seed row.
- [ ] `.planning/research/PEN-INVENTORY.md § "Glyphs Shipped"` — extended with Pattern A Instagram + Pattern B Substack rows scaffolded by Plan 25-02.
- [ ] No framework install — Pencil MCP is the runtime; STACK.md confirms tool surface available.

*If none: "Existing infrastructure covers all phase requirements."* — N/A: Phase 25 introduces two new audit-trail sub-sections that must be scaffolded before plan 25-03 runs (Compound Source Inference; Open Flags Phase 25).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual fidelity of `Section/Header` against Crito Home Page Menu bar `ujMLJ` source | COMP-05 + Success Criterion 1 | No pixel-diff baseline yet (calibration starts Phase 26); structural tests cover wire-level correctness, but a human eye is the second-look reviewer for "does this look like Crito Menu bar" | Plan 25-01 close captures `get_screenshot` of Section/Header; user opens it in Pencil editor (or reviews inline) and confirms it matches Crito source cited in Variant Evidence rows |
| Visual fidelity of `Section/Footer` against Crito Home Page Footer source | COMP-06 + Success Criterion 1 | Same as Header — pre-calibration phase | Plan 25-02 close captures `get_screenshot` of Section/Footer; user confirms match against Crito source |
| Visual fidelity of `Compound/Card` against `design/images/image-import-{12,14,8,22}.jpg` raster set | COMP-07 + D-49 | Raster-derived inference — D-50 OPEN flag declares source-coverage gap. Human-eye check validates that the 4-slot signature visually maps to Project/Blog/Service patterns | Plan 25-03 close captures `get_screenshot` of Card preview (each slot populated) + opens raster files alongside; user spot-checks visual plausibility before accepting OPEN-25-XX flag |
| Empty-slot auto-collapse behavior verification (OPEN-24-06 ACTUAL-use resolution per D-44) | COMP-05 + D-44 | Plan 25-01's `iconTrailing` wire-up exercises empty-slot collapse implicitly when a Button instance has the slot enabled but unpopulated (vs the dual-CTA scenario where both are populated). User verifies the visual reads correctly | Plan 25-01 captures `get_screenshot` of a label-only Button next to a Button with arrow-right wired; user confirms slot collapse behaves as expected |
| Pencil typed-slot probe result (D-52 Q1: typed slot prop accepts non-matching components OR errors) | COMP-07 + D-52 | Pencil docs say slot arrays are "suggestion-only" but precise non-matching-insert behavior needs empirical probe | Plan 25-03 Task 4 probe documents result in 25-03-SUMMARY.md `## Slot Mechanics Probe Results` before propagating to all 4 Card slots |
| Pattern B Substack atomic-glyph visual match against simpleicons reference | D-46 source-citation | SVG path correctness can't be auto-verified beyond string match; human-eye confirms the rendered glyph reads as Substack | Plan 25-02 Task 4 captures `get_screenshot` of rendered Substack glyph next to simpleicons reference image; user confirms match |

---

## Validation Sign-Off

- [ ] All VAL-25-* tasks have a documented `automated_command` or are explicitly flagged as Manual-Only
- [ ] Sampling continuity: every plan (25-01 / 25-02 / 25-03) has at least one structural assertion before its summary is written
- [ ] Wave 0 audit-trail sections scaffolded in PEN-INVENTORY.md before plan 25-03 runs
- [ ] No watch-mode flags (N/A — no code tests)
- [ ] Feedback latency < 60s per component (snapshot_layout dominates)
- [ ] `nyquist_compliant: true` set in frontmatter only after all 23 VAL-25-* assertions are green
- [ ] User confirmed visual reference set per VAL-25-23 manual gate

**Approval:** pending

---

## Nyquist Dimension Coverage

| Dimension | Applies | Phase 25 Coverage |
|---|---|---|
| 1. Behavioral / functional | NO | No code runs |
| 2. State transitions | NO | Variant states are static cells, not transitions |
| 3. Data integrity | PARTIAL | 95-token surface integrity carry-forward; D-43 Button Secondary addition without raw-value leakage |
| 4. Concurrency | NO | Single-threaded plan execution |
| 5. Error / boundary | PARTIAL | D-54 active-editor pre-flight (VAL-25-14) + Pencil typed-slot probe failures |
| 6. Performance | NO | No runtime perf concern |
| 7. Accessibility / a11y | NO | Code-milestone concern |
| **8. Structural completeness** | **PRIMARY** | Every Success Criterion 1-4 → VAL-25-01..15 |
| 9. Visual / pixel fidelity | PARTIAL | `get_screenshot` reference set archived (VAL-25-22 + VAL-25-23); raster-probe inference for Card with OPEN-25 source-coverage flag (no pixel-diff baseline until Phase 26) |
| 10. Cross-system integration | NO | No external system |

---

*Derived from `25-RESEARCH.md § Validation Architecture` (lines 441–482) — see RESEARCH.md for rationale per VAL-25-* assertion.*
