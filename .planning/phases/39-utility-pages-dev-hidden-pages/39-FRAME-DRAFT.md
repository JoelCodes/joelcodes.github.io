# 39 — Frame Draft Note

**Figma file:** `1tg8wIPcvOVC5tPZ8pkGO2` (brand file)
**Drafted:** Wave 1 (plan 39-01). For Joel's Wave 2 (39-03) approval.

## Key finding (surfaced to Joel, confirmed "draft both 390 mobiles")

The two page authorities were described as "not yet designed," but on inspection **both `1440` desktop frames were already fully composed with real, polished copy** (Joel-authored). The genuine remaining gap vs. the plan's "1440 + 390" scope (CONTEXT D-09) was the **390 mobile variant** for each page — neither page had one (only the desktop frame). Joel selected **"Draft both 390 mobiles."**

Method: cloned each finished desktop frame, resized to 390, and reflowed to the brand's mobile convention (mirrors `Landing / Mobile · 390` = `22:524`). This satisfies D-07 "compose only from existing brand components" — the mobiles inherit the desktop's real component instances (Site Header, Site Footer, ServiceCard, Eyebrow, Breadcrumb, CTA Button, FrequencyWave field) and real copy; no new primitives were created.

## Mobile convention applied (from Landing 22:524)

- Frame 390 wide, VERTICAL auto-layout.
- Section horizontal gutter **24px** (header/footer 20px); vertical section padding **112px** retained.
- Content wraps to the ~342px column: all lead/heading text set `layoutSizingHorizontal = FILL`.
- Type scale reduced: hero h1 **61 → 40**, section h2 **50 → 30**, lead **21 → 18** (Fraunces Regular / Hanken Grotesk Regular). Card titles (21) and eyebrows (13) unchanged.
- Multi-column card/content rows collapse to vertical stacks (children FILL).
- Sections hug their height so reflowed content is not clipped.
- Header condensed to **Brand + "Book a call" CTA** (desktop nav links Services/Showcase/About removed — detached instance). Footer columns stacked vertically; copyright row wraps.
- Hero FrequencyWave "field" vector kept oversized/clipped behind content (same as desktop + Landing mobile).

---

## Frame 1 — Service Web (page `85:103` "Site · Service Web")

| Variant | Node ID | Size | Status |
|---------|---------|------|--------|
| Desktop · 1440 | `85:105` | 1440 × 4137 | Pre-existing, complete (real copy) |
| Mobile · 390 | `248:102` | 390 × 4781 | **Drafted this session** |

**Sections (both variants):**
1. **Site Header** — Brand monogram + "Joel Shinness Solutions"; nav (Services/Showcase/About/Book-a-call on desktop; condensed to Book-a-call on mobile). Component: Site Header.
2. **Hero** — Breadcrumb (Home / Services / Web), Eyebrow "WIN MORE CUSTOMERS", h1 "Web development that wins you customers — and tools that run your day", lead, CTA pair (Book a call solid / Email me ghost). FrequencyWave field bg.
3. **Kinds** — Eyebrow "WHAT THIS COVERS", h2 "Two kinds of web work.", 2× ServiceCard (Websites / Custom web apps).
4. **Proper** — Eyebrow, h2 "What "built properly" means.", 4-item list + inline note row.
5. **FAQ** — Eyebrow, h2 "Straight answers first.", 4× FAQItem accordion.
6. **Paired** — Eyebrow "OFTEN PAIRED WITH", h2 "A site gets more valuable when the work around it moves itself.", 2× mini LinkCard (Automations / AI).
7. **Final** — Eyebrow, h2 "Tell me what your website should be doing for you.", lead, CTA pair, serving-area line.
8. **Site Footer** — Brand + "On your wavelength." + blurb, links, © row.

**Copy:** real/final (Service Web is not gated by FUT-03). One `<h1>`, section `<h2>`s, card `<h3>`s — heading hierarchy preserved.

---

## Frame 2 — Area Abbotsford (page `85:104` "Site · Area Abbotsford")

| Variant | Node ID | Size | Status |
|---------|---------|------|--------|
| Desktop · 1440 | `85:281` | 1440 × 3835 | Pre-existing, complete |
| Mobile · 390 | `255:95` | 390 × 4614 | **Drafted this session** |

**Sections (both variants):**
1. **Site Header** — same as Service Web.
2. **Hero** — Breadcrumb (Home / Abbotsford, BC), Eyebrow "SERVICE AREA · ABBOTSFORD", h1 "A software developer based right here in Abbotsford", lead, CTA pair, "Serving Abbotsford, Vancouver, and the Fraser Valley — in person and remote."
3. **Local** — Eyebrow, h2 "Most consultants serve Abbotsford from somewhere else.", 2 prose paragraphs.
4. **Ops** — about-text column (deep-operations prose).
5. **Promise** — Eyebrow, h2 "The same promise, closer to home.", 4-item list.
6. **Make** — Eyebrow "WHAT I BUILD", h2 "Three ways I help, right here.", 3× ServiceCard (Web / Automations / AI).
7. **Final** — Eyebrow, h2 "Got a business in Abbotsford and a problem that…", lead, CTA pair.
8. **Site Footer** — same as Service Web.

**Copy status (D-03):** the Abbotsford copy is present and polished, but **designated SCAFFOLD — not final for publish**. FUT-03 gates the locally-unique rewrite + GBP-consistent NAP before the page comes out of noindex. **No real NAP (no address, no telephone) is composed into the frame (D-04)** — the ProfessionalService JSON-LD stays minimal (name, url, areaServed "Abbotsford, BC", serviceType, provider) at build time.

---

## What was NOT done (compose-only guarantee, D-07)

- No new component definitions created in the file.
- No new colors/tokens/type styles invented — mobile reflow reused the existing type ramp (just smaller sizes from the ramp) and brand components.
- 768/1920 breakpoints intentionally not drafted — built responsively in code (D-09).

## Verification for the Wave 2 checkpoint

- Both mobile frames render as complete page compositions (screenshots reviewed section-by-section: header, hero, cards, footer all clean, no clipped text or overflow after reflow).
- **Manual save required:** Joel to ⌘S in the Figma editor to persist (per MEMORY.md Pencil/Figma-MCP constraint) before the frames are treated as canonical extraction authority for Wave 3.
