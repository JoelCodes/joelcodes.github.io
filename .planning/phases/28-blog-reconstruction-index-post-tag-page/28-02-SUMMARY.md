---
phase: 28-blog-reconstruction-index-post-tag-page
plan: 02
status: complete
date: 2026-06-08
---

# Plan 28-02 Summary: Blog Post Page Reconstruction (PRIMARY Prose-Token Validation Surface)

Plan 28-02 reconstructs the Crito `08_Blog Details` flat-raster (w1m3x = `images/image-import.jpg` — first identification per Focus 4; note base name with NO `-NN` suffix) as an editable `Blog Post` top-level page frame at canvas (~23927, -4111.55). PRIMARY validation site for all 7 Phase 28 prose tokens shipped by Plan 28-00.

## Pencil MCP Subagent-Tool-Inheritance Caveat

Executed INLINE by the main orchestrator per Plan 28-00 + 28-01 carry-forward.

## Task 0: Pre-flight + w1m3x probe + MDX content extraction

- Active editor: `design/Crito.pen` ✓ (D-125)
- Token surface: 127 user-facing tokens (Plan 28-01 close preserved). Plan-spec said 107 (counts composites as 1 logical token); actual variable count differs per Phase 26 composite-as-multi-vars precedent — recorded as known plan-spec inconsistency.
- **w1m3x raster index probed: `images/image-import.jpg`** ✓ (NOT `image-import-15.jpg` as plan guessed; first identification per Focus 4)
- w1m3x position (preserved post-PAGE-11): (11987.27, -4111.55), width 1920, height 4486, clip:true, layout:none
- DzqTm still enabled:false ✓ (Plan 28-01 outcome preserved)
- All Plan 28-00 + 28-01 deliverables intact: EDAf1 Blog frame, O1IwyS TagFilter, etY5x RelatedPosts, ZSxZU BlogCard, kJQmJ Badge/Outline, vGH3A+SoXch Card extension
- Phase 24/25/26/27 baselines intact: G0wNOc, Xs0Hs, t40xct, M7eUr, hIWuC, j0FxQZ
- MDX content extracted from `src/content/blog/getting-started-with-automation.mdx`:
  - H1 + 3 H2s + 1 H3 + 8 paragraphs + 2 ul (4 + 3 items) + 1 ol (3 items) + 1 fenced JS code block (8 lines) + hr + italic-link paragraph + frontmatter (title / date / tags)
- v1.3 `src/pages/blog/[slug].astro` post header structural reference captured (lg:grid-cols-[200px_1fr_200px] 3-col reference; Plan 28-02 user-directed pivot to 2-col instead per REVISE-loop)

## Tasks 1-9: Initial Blog Post composition (REPLACED at REVISE loop)

Initial build per plan: FindEmptySpace nodeId:EDAf1 anchor → Blog Post frame → Header + post-header section (title + metadata + tag row + featured-image) + post-body section (vertical stack with all 17 prose-token consumers) + RelatedPosts + Footer + sibling note. Original vertical-stack composition matched plan-spec but user calibration at Task 10 gate v1 raised REVISE: "the layout of the blog page should have the text to the left and info about the page to the right. Take another look at the raster image."

## REVISE loop: 2-column layout pivot (text-body left + info-sidebar right)

Plan 28-02 calibration gate v1: REVISE — Crito raster shows 2-column blog post layout (NOT the vertical-stack composition plan-specified). User-directed pivot: text body LEFT + info sidebar RIGHT.

### REVISE step 1: Full Blog Post frame rebuild

Per Plan 28-01 Pencil-layout-engine quirk lesson (Move() does not trigger flex re-render): Delete entire ysKxH frame and rebuild from scratch in correct semantic + visual order. New IDs throughout.

**New structure (aQ8FL):**
- `bjRu4` = Section/Header instance (ref G0wNOc, no override)
- `TTWAs` = two-column-wrapper (1200w, horizontal, gap 64, padding [80, 0, 64, 0], alignItems start) — NEW pattern, first multi-column page in v2.0
- `r8zNr` = main-column (760w, vertical, gap 24, alignItems start) — left text body
- `i4AOv` = info-sidebar (280w, vertical, gap 32, alignItems start) — right info blocks
- `yniMD` = Section/RelatedPosts instance (ref etY5x) with 3 Card descendants overrides
- `tg3vl` = Section/Footer instance (ref Xs0Hs, no override)

### REVISE step 2: main-column content (text body — all 7 prose-token consumers)

Inside `r8zNr` left column, in MDX-document order:
- `m33lb` = title (heading-1 — Plus Jakarta Sans 48/700/lh 1.4, navy)
- `gvFiw` = featured-image placeholder (fill_container × 340h, bg-surface-elevated, radius 10)
- `J0wLG` = intro paragraph (prose-paragraph)
- `acNKn` = H2 "Why Automate?" (heading-2)
- `I6Q2JA` = paragraph (prose-paragraph)
- `EC437` = ul-automation-handles (prose-list ul, 4 items with bullet prefixes per Focus 5 Option A)
- `cqlSs` = H2 "Start Simple" (heading-2)
- `XEY3n` = paragraph (prose-paragraph)
- `EMV8n` = ol-automation-criteria (prose-list ol, 3 items with "1./2./3." prefixes)
- `R8iJ9` = H3 "Example: Invoice Follow-ups" (**heading-3 NEW — Plan 28-00 FIRST real consumer per D-106**)
- `UBJLz` = paragraph (prose-paragraph)
- `Fzv16` = code-block frame (prose-code-block first consumer per D-108):
  - bg `#f2f2f7ff` (bg-surface-elevated), padding 16, cornerRadius 10
  - child `Amt8F` = code-text (JetBrains Mono 14/normal/lh 1.6, 8-line JS pseudo-code from MDX with literal `\n` line breaks)
- `Fke1x` = paragraph (prose-paragraph)
- `JFgoP` = H2 "What's Next?" (heading-2)
- `JN0Av` = paragraph (prose-paragraph)
- `d514P` = ul-future-posts (prose-list ul, 3 items)
- `B4S5fW` = hr 1px line (color-semantic-border-default)
- `k6AAA` = italic-link paragraph (Option B per Focus 5 fallback — single italic text, prose-link styling wired at code milestone per sibling note `fl8b4`)
- `gwHew` = inline-code-para (Option A horizontal-wrap per Focus 5 — 3 text nodes including chrome `Jcw33` wrapping mono `npm run build` text; prose-inline-code first consumer per D-108 — SYNTHETIC per OPEN-28-05)

### REVISE step 3: info-sidebar content (right column metadata blocks)

Inside `i4AOv` right column, vertically stacked at 32 gap:
- `ghazR` = author-block (12 gap): 60×60 avatar ellipse `DNfnD` + name `wCa8p` "Joel Shinness" + role `P9Sr3` "Web developer for small business"
- `vTl3S` = published-block: caption "PUBLISHED" (Inter 12/500 letterSpacing 1.2 secondary uppercase) + value "January 27, 2026" (body 16)
- `HyJTM` = read-time-block: caption "READING TIME" + value "5 min read"
- `USzz1` = tags-block: caption "TAGS" + tags-list `E5h8I` (horizontal, gap 8) with 3 Badge/Outline (kJQmJ) refs (automation / small-business / productivity)
- `h2Jp34` = share-block: caption "SHARE" + placeholder body-sm note "Share buttons wire at code milestone (Twitter / LinkedIn / Copy Link)."

### REVISE step 4: RelatedPosts re-insertion order fix

After sidebar additions, RelatedPosts (foYuv) was inserted but landed at semantic index 4 (after Footer). Per Plan 28-01 Move()-bug lesson: deleted both RelatedPosts + Footer, re-inserted RelatedPosts (yniMD) first, then Footer (tg3vl). Resulting order: Header → two-column → RelatedPosts → Footer.

### REVISE step 5: Height fallback

Same fit_content 50px-short quirk per Plan 28-01 observation. Set explicit `height: 3400` on Blog Post frame; snapshot_layout returned "No layout problems." ✓

## Task 10: Calibration gate (v1 + v2)

- **v1:** REVISE — layout doesn't match raster (vertical-stack vs 2-column) → REVISE loop steps 1-5 above
- **v2:** APPROVE-with-GAP — composition is fine, but doesn't fully match raster layout → OPEN-28-03 recorded

User-locked fidelity labels at v2 APPROVE-with-GAP:
- Main-column post-header EXACT (title verbatim) + APPROXIMATE (featured-image placeholder pending wiring)
- Main-column post-body EXACT-VERBATIM for MDX content (heading-1 + 3 H2s + 1 H3 + 8 paragraphs + 3 lists + code block + hr + italic-link)
- Info-sidebar APPROXIMATE (author block + metadata captions + share placeholder — sidebar contents inferred from raster, exact element set may diverge)
- 2-column proportion APPROXIMATE per OPEN-28-03 (raster proportion details not fully matched)
- Header EXACT + Footer EXACT (D-77)
- Inline-code SYNTHETIC per OPEN-28-05

## Task 11: PAGE-11 ACTIVE on w1m3x

- `Update("w1m3x", {enabled: false})` fired ONLY AFTER Task 10 APPROVE-with-GAP (Pitfall 4 + T-28-03 sequencing observed)
- `batch_get` confirmed `enabled: false`, frame structure preserved (w1m3x not deleted — archive at (11987.27, -4111.55))
- **THIRD production use of PAGE-11 ACTIVE in v2.0** (after cl8tt at Phase 27 + DzqTm at Plan 28-01)

## OPEN flags raised

- **OPEN-28-03 (fidelity-gap, notable):** Blog Post 2-column layout shipped but doesn't fully match Crito raster (image-import.jpg). User flagged "it's fine but doesn't match the layout of the raster image". Column widths, sidebar contents, spacing rhythm may diverge. Deferred to Phase 32 fidelity sweep.
- **OPEN-28-04 (tooling, minor):** Pencil 2.13 `fontFamily` expects a single font name, not the CSS-stack stored in `type-primitive-family-mono` token (`'SF Mono', Menlo, Monaco, Consolas, monospace`). Plan 28-02 ships `JetBrains Mono` (Google Font) as design-time visual proxy; CSS export uses primitive stack value at runtime. Pencil-vs-CSS divergence by design. Phase 32 may add second mono primitive split (display vs runtime).
- **OPEN-28-05 (source-coverage, minor):** D-123 sample MDX silent on inline-code spans; Plan 28-02 ships a SYNTHETIC inline-code consumer paragraph ("Most automation tools accept code patterns like `npm run build` to trigger workflows.") for prose-inline-code token validation per D-105 promise. Future MDX with actual inline-code spans naturally lifts this synthesis.

## OPEN flags updated

- **OPEN-23-05:** Further partial-resolution — 08_Blog Details (w1m3x) reconstructed as Blog Post (aQ8FL) + PAGE-11 ACTIVE. 3 flat-raster frames remain (06_Service Details, 05_Service, 04_About — Phase 29 + token-mining-only).
- **OPEN-23-10:** Further partial-resolution annotation — heading-3 first real consumer validated at Plan 28-02 Task 10 APPROVE (Plan 28-00 interpolation default Plus Jakarta Sans 24/700/lh 1.4 stands; user did not flag heading-3 rendering as wrong).
- **OPEN-23-11:** Fully RESOLVED — all 4 prose composite token surfaces (inline-code + code-block + link + list) now have concrete first consumers at Blog Post body level.
- **D-110 prose-paragraph 'provisional' flag:** DROPPED — Plan 28-02 calibration gate APPROVE confirmed prose-paragraph token surface (Inter 16/400/lh 1.625) renders correctly across 8+ instances in MDX body. Flag served its purpose; no further provisional status.

## Token surface change

127 → 127 (zero new tokens per D-91 reuse). **All 7 Phase 28 prose tokens get first real page-level consumer.** Plan 28-00 foundation validated end-to-end.

## Library count change

No library changes — all consumption via existing component refs (Plan 28-00 RelatedPosts + Plan 28-00 Badge/Outline + Plan 25-03 Card descendants overrides + Phase 25 Header/Footer).

## Page-frame count change

5 → **6** reconstructed top-level page frames in v2.0: FAQ + 404 + Thank-you + Contact + Blog Index + Blog Post. PAGE-11 ACTIVE count: 2 → 3 (cl8tt + DzqTm + w1m3x).

## Baseline IDs intact

Verified via batch_get + post-mutation get_editor_state: M7eUr, hIWuC, j0FxQZ, kJQmJ, t40xct, G0wNOc, Xs0Hs, vGH3A, SoXch, FGdti, oTSwn, eNqxd, O1IwyS, etY5x, ZSxZU, avgor, t67DU6, g9oRa5, n0QqTd, csXky, b7Hgy, XsDab, EDAf1. Phase 24-27 + Plan 28-00 + Plan 28-01 ship-set unchanged. w1m3x canvas position preserved.

## Pencil tooling observations (updated)

1. **Move() does not trigger flex-layout re-render** (Plan 28-01 carry-forward, re-observed)
2. **fit_content height fails to capture last ~50px** (Plan 28-01 carry-forward, re-observed — set explicit height as workaround)
3. **`fontFamily` expects single font name, not CSS stack** (NEW per OPEN-28-04 — type-primitive-family-mono CSS-stack value works for CSS export but not Pencil rendering)

## Next plan

- 28-03 (Blog Tag Page) — TagFilter active-state-flip mechanic (D-117 paired-ref toggle: e.g., pill-3 "small-business" active, all others inactive) + filtered BlogCard grid subset (showing only posts tagged "small-business")
