# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate `/faq` and `/thank-you` from v1 to `BaseLayoutV2` and **create a new `/404` page** on `BaseLayoutV2`. All three pages render light-mode only, consume v2 primitives, and pass axe-core (0 violations) + Lighthouse 90+.

Concretely, by end of Phase 25:

1. **`/faq` rebuilt on `BaseLayoutV2`** — Phase 26 page-header banner (breadcrumbs + centered title on `--color-surface-muted`); native `<details>/<summary>` accordion in divider-list visual treatment with `ChevronDown` rotation; `FAQPage` JSON-LD schema preserved; bottom CTA banner pivoting to `/#contact`.
2. **`/thank-you` rebuilt on `BaseLayoutV2`** — centered v2 Card (`elevated`), `CheckCircle2` icon in `--color-accent`, headline + body, primary Button → Calendly URL, secondary text link → home. Calendly URL moves to `PUBLIC_CALENDLY_URL` env var with placeholder fallback.
3. **`/404` created at `src/pages/404.astro`** — big "404" numeral, short copy, 2×2 grid of `interactive` v2 Cards linking Home / Projects / Blog / FAQ, plus a contact CTA below.
4. **All three pages** — no FOUC script, no `dark:` utilities, no Google Fonts CDN, no v1 token references; self-hosted variable fonts via `BaseLayoutV2` preload chain.

**Not in this phase:**
- v1 page deletion (`src/pages/faq.astro` / `thank-you.astro` are rewritten in place — there are no remaining v1 leaf-page files to delete after this phase). The v1 `Header.astro` / `Footer.astro` / `BaseLayout.astro` deletions still belong to Phase 30 (QUAL-01..02).
- Migrating any other page (homepage, projects, blog, contact) — handled in Phases 26-29.
- Adding new FAQ entries or editing FAQ copy — content carried over unchanged (Out of Scope per `REQUIREMENTS.md`).
- A search bar / "did you mean" suggestion / autocomplete on `/404` — out of scope; no Pagefind index ships in v1.4.
- A 404 graphic / illustration — typographic only, consistent with Crito aesthetic.
- Real Calendly URL value — that's a deployment task (set `PUBLIC_CALENDLY_URL` in CI env); this phase only changes the source code to consume the env var.

</domain>

<decisions>
## Implementation Decisions

### /faq — Page Chrome (Plan 25-01)
- **D-25-01:** **Adopt the Phase 26 page-header banner pattern verbatim.** Surface-muted band (`bg-surface-muted`) above the accordion containing: breadcrumbs `Home › FAQ` in `--color-text-muted text-small` on its own row, then centered `<h1>Frequently Asked Questions</h1>` in `--font-display`. Same band height + spacing as the `/blog` index banner (Plan 26-04 implementation). Sets the precedent for the `/projects` index banner in Phase 27.
- **D-25-02:** **Bottom CTA block — full-width surface-muted banner** matching the top banner's bg treatment for visual symmetry. Content: `<h2>Still have questions? Let's talk.</h2>` in `--font-display` + a single v2 primary Button labelled "Get in touch" (no arrow icon — default arrow handled by Button `link` variant only; primary variant stays clean) with `href="/#contact"`. Centered, generous vertical padding. The accordion sits between the two banded sections on white. No secondary Calendly link in this CTA — Calendly is on `/thank-you`, not the FAQ.

### /faq — Accordion Visual (Plan 25-01)
- **D-25-03:** **Keep native `<details>/<summary>` markup** — proven a11y, zero JS, validated in v1. The v2 styling is authored from scratch in this phase (no v2 accordion primitive exists; nothing factored into `src/components/v2/ui/`).
- **D-25-04:** **Divider-list visual — no Card per row.** Each `<details>` is a borderless row separated from siblings by a `--color-border` 1px horizontal divider. No surrounding Card, no per-row border-box. `<summary>` row uses `--font-display` weight (heading-like), `--color-primary` text; padding `~py-md` vertical, `0` horizontal to align with section gutter.
- **D-25-05:** **Expand indicator — Lucide `ChevronDown` on the right of `<summary>`,** rotated 180° on `details[open]` via a scoped `<style>` block (`details[open] > summary .chevron { transform: rotate(180deg); }`). `transition: transform 200ms ease`. Icon color: `--color-text-muted` closed, `--color-primary` open (consistent with summary text). Matches Crito-style chevron accordions, deviates from the v1 plus-rotate.
- **D-25-06:** **Open-state answer text** lives inside a wrapper `<div>` inside `<details>` (not bare prose). Padding `pt-sm pb-md`; `--color-text` body, `--font-text`, comfortable line-height. No internal border-top (the parent row divider already separates rows).

### /thank-you — Visual + Calendly (Plan 25-02)
- **D-25-07:** **Centered v2 Card with `elevated={true}`.** Reuses Phase 24 Card composition (`<Card elevated><CardBody>...</CardBody></Card>`). Outer wrapper: `min-h-[70vh] flex items-center justify-center container mx-auto px-md` (preserves the v1 vertical-center layout). Card max-width ~`max-w-2xl`; CardBody padding `~py-xl px-lg`. Items inside CardBody stack vertically: icon → headline → body paragraph → primary Button → secondary text link.
- **D-25-08:** **Success icon — `CheckCircle2` from `@lucide/astro`, size 64, color `--color-accent` (green).** Replaces the v1 `text-turquoise` reference. The icon is the only place green appears in the body — it carries the "success" semantic, then `--color-primary` (navy) takes over for typography.
- **D-25-09:** **Headline / body copy carried over from v1 unchanged.** Headline: "Thanks for reaching out!" in `--font-display`, weight 700, no uppercase (v1 had `uppercase` — drop it; matches Phase 26 D-26-04 "no uppercase in v2 headings"). Body: "I'll email you within 48 hours with next steps. Looking forward to learning more about your project!" in `--font-text`, `--color-text` (NOT muted — primary body text on a card matters).
- **D-25-10:** **Primary CTA — v2 Button `variant="primary"` `size="lg"`** with `href={calendlyUrl}` (see D-25-11). Label: "Skip the wait — book a call" (v1 copy preserved). No icon. Renders as `<a>` per v2 Button polymorphic API (D-03 from Phase 24).
- **D-25-11:** **Calendly URL — `PUBLIC_CALENDLY_URL` env var with placeholder fallback.** Code pattern: `const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness';`. Mirrors the `PUBLIC_N8N_WEBHOOK_URL` deployment pattern (Phase 28 success criterion #4). This closes one of the three pending deployment tasks tracked in `STATE.md > Pending Todos`. New deployment-time task: set `PUBLIC_CALENDLY_URL` in the GitHub Actions build env alongside `PUBLIC_N8N_WEBHOOK_URL`.
- **D-25-12:** **Secondary "Return to homepage" text link** kept (v1 carry-over). Plain `<a href="/">` styled as inline text link via tokens (`--color-text-muted` → `--color-accent` on hover, underline). Small size (`text-small`). Sits below the Button, separated by `~mt-sm`.

### /404 — Brand-New Page (Plan 25-02)
- **D-25-13:** **File location — `src/pages/404.astro`** (Astro's convention; auto-served on GitHub Pages 404 responses). No additional routing config needed.
- **D-25-14:** **Hero block — big "404" numeral in `--font-display`.** Size: `text-8xl` or larger (planner picks final scale step), weight 700, color `--color-primary` (navy). NOT in a banner. Centered, generous top margin (`~mt-2xl`). Below the numeral: short tagline "This page wandered off." in `--font-display` h2 size (`~text-2xl`), `--color-text` (NOT muted — readable hierarchy). No Crito banner; the 404 numeral itself is the page chrome.
- **D-25-15:** **Destination grid — 2×2 of `interactive` v2 Cards.** Each Card wraps an `<a>` (Card polymorphic per D-05 / D-07 from Phase 24). 4 cells: **Home**, **Projects**, **Blog**, **FAQ**. CardBody contents per cell: short label (e.g. "Home" / "See projects" / "Read the blog" / "FAQ") in `--font-display` + one-line description in `--color-text-muted text-small` (planner writes copy). Grid: `grid grid-cols-1 md:grid-cols-2 gap-md`, max-width container, centered. Hover-lift + focus ring from `interactive=true` (D-07 carry-forward) is the same chrome BlogCard uses on `/blog`.
- **D-25-16:** **Contact CTA below the grid — v2 Button `variant="link"` "Or get in touch →"** with `href="/#contact"`. The `link` variant defaults `iconRight` to `ArrowRight` (D-04 from Phase 24); no custom icon override. Centered. Acts as a soft fifth destination without competing with the 2×2 card grid visually.
- **D-25-17:** **No banner header, no breadcrumbs.** This is a system-state page, not a content page. The numeral + tagline is the chrome. Diverges from `/faq` and `/blog` on purpose — `404` shouldn't be styled "as if you're somewhere".
- **D-25-18:** **`<meta name="robots" content="noindex">`** on the `/404` `<head>` (don't index a system-state page). `BaseLayoutV2` likely already exposes a `head` slot for per-page meta; if not, planner adds one in 25-02. Title: "Page not found · Joel Shinness". No JSON-LD.

### Cross-Cutting (All Three Pages)
- **D-25-19:** **All three pages import `BaseLayout` from `src/layouts/v2/BaseLayout.astro`.** Drop every `<head>`-internal Google Fonts link, the dark-mode FOUC script, and the `body class="dark:..."` modifiers from the v1 `/faq` page. `/thank-you` already used `BaseLayout.astro` (v1) so the import path swap is one line; `/faq` is a wholesale rewrite.
- **D-25-20:** **No v2 accordion primitive ships.** D-25-04 styling lives inline on `/faq` (scoped `<style>` block or Tailwind utilities). Joel has one accordion location in v1.4; abstracting it speculatively violates the "build primitives when more than one consumer exists" rule that drove the Phase 24 CheckboxGroup deferral (D-21).
- **D-25-21:** **Existing FAQ entries in `/faq` are carried over verbatim** — 5 question/answer pairs hardcoded in the page frontmatter. The `FAQPage` JSON-LD schema generation is also preserved verbatim (`@context: schema.org`, `@type: FAQPage`, `mainEntity: faqs.map(...)`). The schema is the SEO-meaningful output; it must validate (success criterion #1).
- **D-25-22:** **Pencil mirror — add factored frames for `404` and the FAQ accordion treatment to `design/design-system.pen`** per Phase 23 D-16 (grow the .pen lockstep with shipped code). At minimum: a `/404` page frame and an FAQ accordion-row variant. `/thank-you` already has Card + Button factored; no new Pencil work needed there. Treat as a 25-02 sub-task or end-of-phase consolidation per planner discretion.

### Claude's Discretion
- **Exact font scale on the `/404` numeral** — `text-8xl` (96px) vs larger custom scale step. Whatever reads "BIG" but doesn't break mobile layout.
- **Exact card grid gap on `/404`** — `gap-md` vs `gap-lg`. Crito-faithful generous gaps preferred over tight.
- **Open-state animation on `/faq` accordion** — `<details>` content height isn't easily transitionable without JS. CSS-only `transition: transform` on the chevron is the documented baseline (D-25-05). If the planner has a clean CSS-only height-transition pattern that doesn't introduce JS, it's allowed; otherwise the open/close is instant (matches v1 behavior).
- **Whether the `/faq` CTA banner uses a Card or a bare `<section>` with `bg-surface-muted`** — bare section preferred (matches the top banner's treatment), but if the planner finds Card composes better with the centered button, either is acceptable.
- **Order of nav cards on `/404`** — Home / Projects / Blog / FAQ vs Home / Blog / Projects / FAQ. Lead-gen logic: Projects directly above FAQ encourages "see work → ask question" path. Planner picks.
- **Whether `/thank-you` keeps the `<style>` block** (v1 had `.container { max-width: 1280px; }`) — likely redundant under v2 container utilities; planner can drop it during migration.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope (locked)
- `.planning/ROADMAP.md` §"Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404)" — Goal, depends-on Phase 24, 3 requirements (LEAF-01..03), 4 Success Criteria, 2 plan slots (25-01, 25-02). Plan numbering and Success Criteria authoritative.
- `.planning/REQUIREMENTS.md` §"Standalone Pages" (LEAF-01..03) — the 3 requirements this phase delivers. Also §"Out of Scope" for what NOT to add (no dark mode, no new content, no `@tailwindcss/typography`).
- `.planning/PROJECT.md` §"Current Milestone: v1.4 Design Overhaul" — strategic context (build-alongside-then-swap, light-mode only, content preserved unchanged in v1.4).

### Phase 23 + 24 + 26 decisions (carry-forward — locked, do not re-decide)
- `.planning/phases/24-v2-primitive-library-design-system-page/24-CONTEXT.md` — D-01..D-21 from Phase 24. Critical carry-forwards:
  - **D-03:** Button polymorphic — `href` renders `<a class="btn">`. Used by `/thank-you` primary CTA, `/faq` CTA, `/404` "Or get in touch" link.
  - **D-04:** `link` variant defaults `iconRight` to `ArrowRight`. Used by `/404` contact CTA.
  - **D-05 / D-06 / D-07:** Card composition with `elevated` + `interactive` props. Used by `/thank-you` (`elevated=true`) and `/404` destination grid (`interactive=true`).
  - **D-09 / D-10:** Badge is **chip/tag only** — NOT used on these leaf pages. `/faq` accordion does NOT use a Badge for the chevron.
  - **D-18:** Focus-ring rule (`outline: 2px solid var(--color-accent); outline-offset: 2px;`) — applies to interactive Cards on `/404`.
  - **D-19:** Primitives consume tokens via Tailwind v4 utility classes from the `@theme` block. Scoped `<style>` only where utilities can't express (e.g., the `details[open] > summary .chevron { transform: rotate(180deg) }` rule).
- `.planning/phases/26-blog-migration-post-layout-index-tag-pages/26-CONTEXT.md` — D-26-01..D-26-14 from Phase 26. Critical carry-forwards:
  - **D-26-04:** Headings in v2 are NOT uppercase. Drop the `uppercase` class on `/thank-you` headline.
  - **D-26-08:** **Crito-faithful page-header banner** = `--color-surface-muted` band + breadcrumbs + centered `--font-display` title. Pattern reused verbatim on `/faq` (D-25-01). The implementation lives in `src/pages/blog/index.astro` and `src/pages/blog/tags/[tag].astro` — copy the markup pattern.
- `.planning/phases/23-design-system-foundation/23-CONTEXT.md` — D-01..D-19 from Phase 23. Critical carry-forwards:
  - **D-01 / D-02:** v2 lives under `src/components/v2/` namespace. No new components are added in this phase (the divider-list accordion is inline styling on `/faq`, not a primitive).
  - **D-06:** Use `--font-display` / `--font-text` (NOT `--font-heading` / `--font-body` which collide with v1).
  - **D-08 (strict-no-collision):** No v1 token names anywhere in this phase's code. `tests/check-token-collision.cjs` continues to gate.
  - **D-22 (light-mode-only invariant):** No `dark:` utilities, no `prefers-color-scheme`, no `.dark` selectors, no FOUC script. All three pages render light-mode regardless of OS preference.

### Visual reference (locked target — Pencil MCP only)
- `design/Consulting & Agency Website Template I Crito (Community).pen` — Crito agency template. Inspect via Pencil MCP `batch_get`, NOT Read/Grep (file is encrypted).
  - **Crito has no FAQ page, no thank-you page, no 404 page** in its 15-frame page set. The accordion chrome (D-25-04..06), thank-you card (D-25-07), and 404 layout (D-25-13..17) are all factored from the broader Crito aesthetic (typography, surface-muted bands, card depth) — not from page-specific frames.
  - The accordion divider-list pattern is justified by Crito's general "horizontal-rule between sections" aesthetic, not a specific accordion artifact.
- `design/design-system.pen` — v2 design source of truth. Already contains tokens + Header + Footer + Button + Card + Input + Badge + (Phase 26) BlogCard + TOC + RelatedPosts + ShareButtons frames. **Phase 25 adds** a `/404` page frame and an FAQ accordion-row variant (D-25-22). `/thank-you` reuses already-factored Card + Button; no new Pencil work needed.

### v2 foundation (must build on — Phase 23 + 24 + 26 outputs)
- `src/styles/v2/global.css` — locked v2 token system. Plan 25-01 and 25-02 add zero new tokens (no `--shadow`, no new color, no new spacing). All visuals derive from existing tokens.
- `src/layouts/v2/BaseLayout.astro` — v2 layout shell. All three pages import this; `/faq` and `/thank-you` swap their existing layout/`<head>` markup for `<BaseLayout title= description=>`. `/404` consumes it for the first time.
- `src/components/v2/ui/Card.astro` + `CardBody.astro` (+ `CardHeader.astro`, `CardFooter.astro` if needed) — used by `/thank-you` (single elevated Card) and `/404` (4 interactive Cards).
- `src/components/v2/ui/Button.astro` — used by `/thank-you` (primary), `/faq` (primary CTA), `/404` (link variant). Polymorphic `href` per D-03.
- `src/components/v2/layout/Header.astro` + `Footer.astro` — included by `BaseLayoutV2`; no per-page changes needed.
- `src/pages/blog/index.astro` (Phase 26 deliverable, lines containing the page-header banner) — **the implementation reference for the D-25-01 page-header banner pattern**. Copy the breadcrumb + title markup verbatim, swap "Blog" → "FAQ" and `Home › Blog` → `Home › FAQ`.

### v1 references (logic only — DO NOT copy styles)
- `src/pages/faq.astro` (121 lines) — v1 FAQ page. **Source for:** the 5 hardcoded FAQ entries (verbatim), the `FAQPage` JSON-LD schema generation logic (verbatim). **Do NOT copy:** the inline `<head>` Google Fonts link, the dark-mode FOUC script, the `font-body bg-bg-light dark:bg-bg-dark` body class, the `border-[3px] border-text-light dark:border-text-dark` neobrutalist accordion chrome, the `+` plus-rotate (replaced by chevron per D-25-05).
- `src/pages/thank-you.astro` (58 lines) — v1 thank-you page. **Source for:** copy ("Thanks for reaching out!" + 48-hour message + "Skip the wait — book a call" + "Return to homepage"), CheckCircle2 icon import, vertical-center min-h-[70vh] layout pattern. **Do NOT copy:** `text-turquoise` (→ `--color-accent`), `font-heading` (→ `--font-display`), `font-body` (→ `--font-text`), `uppercase` class on h1 (drop per D-26-04), `bg-bg-light dark:bg-bg-dark` body styling, v1 Card `variant="turquoise"` and v1 Button `variant="turquoise"` (→ v2 Card `elevated` + v2 Button `variant="primary"`).
- v1 components — `src/components/ui/Card.astro`, `Button.astro` (v1 imports in `/thank-you`) — DROP the imports; swap to `src/components/v2/ui/Card.astro` + `Button.astro`.
- v1 layout components — `src/components/layout/Header.astro`, `Footer.astro` (v1 imports in `/faq`) — DROP. `BaseLayoutV2` includes the v2 Header / Footer / MobileNav automatically.
- v1 `BaseLayout.astro` — used by `/thank-you` v1. Replace with `src/layouts/v2/BaseLayout.astro`.

### External packages
- `@lucide/astro` (installed) — icon source for: `CheckCircle2` (thank-you), `ChevronDown` (FAQ accordion), `ArrowRight` (auto-handled by v2 Button `link` variant on /404).
- No new packages needed.

### Testing reference
- `tests/accessibility/v2-layout.spec.ts` (Phase 23 deliverable) + `tests/accessibility/v2-blog.spec.ts` (Phase 26 deliverable, if shipped) — pattern for v2 axe-core invocation. Plan 25-01 / 25-02 should add `tests/accessibility/v2-leaf.spec.ts` covering `/faq`, `/thank-you`, and `/404` with 0 axe-core violations + keyboard focus-order verification (Roadmap success criterion #4).
- `tests/check-token-collision.cjs` (Phase 23 Wave-0 guard) — must continue to pass. Zero new tokens means zero risk of new collisions.

### CI / Deployment
- `.github/workflows/*.yml` — GitHub Actions build step. **Action item from D-25-11:** add `PUBLIC_CALENDLY_URL` to the build env alongside `PUBLIC_N8N_WEBHOOK_URL`. Phase 28 will gate `PUBLIC_N8N_WEBHOOK_URL` as a required CI variable (CONT-* success criterion); `PUBLIC_CALENDLY_URL` follows the same pattern. (Setting the actual Calendly URL value remains a Joel-action; this phase only adds the source-code wiring.)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **v1 FAQ entries + `FAQPage` JSON-LD schema** (frontmatter of `src/pages/faq.astro`, lines 11–46) — port verbatim. The schema generator works against the `faqs` array; rewriting the layout does not touch the data.
- **v1 thank-you copy + icon import** (frontmatter and body of `src/pages/thank-you.astro`) — port verbatim. Only swap component imports and class names.
- **Phase 26 page-header banner markup** in `src/pages/blog/index.astro` (deliverable from Plan 26-04) — verbatim reference for D-25-01. Pattern proven; no need to re-derive from Crito.
- **Phase 24 elevated Card + primary Button compositions** — `/design-system` page demonstrates the exact `<Card elevated><CardBody>...</CardBody></Card>` and `<Button variant="primary" size="lg" href={...}>` patterns. Reuse without modification.
- **Phase 24 `interactive` Card pattern** — proven on Phase 26's `BlogCard.astro`. The 4 destination Cards on `/404` follow the same pattern (Card wraps an `<a>`, `interactive=true`).

### Established Patterns
- **Page-header banner pattern** — surface-muted band + breadcrumbs + centered display-font title. Established in Phase 26 D-26-08. Reused on `/faq` per D-25-01. Will repeat on `/projects` index in Phase 27 and is the de-facto leaf-page chrome for v1.4.
- **Light-mode-only invariant** (Phase 23 D-22) — `BaseLayoutV2` enforces it at the layout level. Removing v1 FOUC script and `dark:` utilities on `/faq` is a hard requirement for compliance.
- **No-uppercase-headings rule** (Phase 26 D-26-04) — every v2 h1/h2/h3 uses sentence case or title case, never `text-transform: uppercase`. Drop the `uppercase` class on `/thank-you` headline.
- **Env-var with placeholder fallback** — established for `PUBLIC_N8N_WEBHOOK_URL` (Phase 20 / v1.3). `PUBLIC_CALENDLY_URL` follows the same pattern (D-25-11). `import.meta.env.VAR_NAME || 'placeholder'`.
- **Native `<details>/<summary>` accordion** — established in v1 `/faq`. Built-in keyboard a11y, no JS. Phase 25 preserves the markup choice; only the chrome changes.

### Integration Points
- **`src/pages/faq.astro`** — rewritten in place. Strip 80+ lines of `<head>`/`<body>` boilerplate; replace with `<BaseLayout title= description=>...</BaseLayout>` wrapper containing the page-header banner section, the accordion section, and the CTA banner section.
- **`src/pages/thank-you.astro`** — rewritten in place. Single import swap (`BaseLayout`, `Card`, `Button`) + class-name swaps + env-var read + drop `uppercase`. ~50 lines remain after migration.
- **`src/pages/404.astro`** — new file. Astro auto-routes 404 responses to this on GitHub Pages. Standalone implementation.
- **`design/design-system.pen`** — extend with `/404` page frame + FAQ accordion-row variant per D-25-22. End-of-phase consolidation acceptable.
- **`.github/workflows/`** — add `PUBLIC_CALENDLY_URL` to the build env (planner decides whether to ship this as a sub-task in 25-02 or note it as a deployment-action only).

</code_context>

<specifics>
## Specific Ideas

- **The "Still have questions? Let's talk." CTA copy is intentionally low-pressure** — the visitor just read the FAQ page; if they're still here, soft framing converts better than a high-commitment ask. Echoes the lead-gen-without-pressure positioning in `PROJECT.md > Core Value`.
- **"This page wandered off." on `/404` is intentionally personable** — small-business owners (the target audience) are non-technical; clinical "Error 404 — Resource Not Found" reads as cold. Friendly tone is consistent with the rest of Joel's copy.
- **`/404` deliberately does NOT use the page-header banner** (unlike `/faq`). Reason: the banner pattern signals "you're on a content page within the site." A 404 is a system state, not a destination — typographic-only chrome (giant numeral) is the correct affordance.
- **The 2×2 destination grid on `/404` is a recovery interaction, not a sitemap.** 4 destinations max; the contact CTA below is the soft 5th option. Don't add Services (doesn't exist yet — Phase 27), Design System (internal), or Thank-you (state page).
- **The elevated Card on `/thank-you` is the single page where `elevated=true` matters strongly.** Most other pages use flat Cards or `interactive`; the moment of confirmation justifies the depth. This is the visual moment that says "your form went through" — depth = importance.
- **Phase 26 already proved the dual-layout coexistence pattern** (BLOG-01..07 shipped on `BaseLayoutV2` while v1 pages still render). Phase 25's "validating dual-layout on low-risk targets" rationale from the roadmap is moot — the validation is done. The work itself is still required for milestone completion (LEAF-01..03 are unchecked).

</specifics>

<deferred>
## Deferred Ideas

- **Search bar / "did you mean" on `/404`** — would need Pagefind or similar static-site search index; out of scope for v1.4. Revisit in v1.5+ when post/project corpus is larger.
- **A 404 illustration / SVG graphic** — v1.4 is light-mode-only and isometric-illustration-free (`PROJECT.md > Out of Scope`). If a v2-style line illustration emerges in a later phase, the `/404` page is a natural home for it.
- **A v2 accordion primitive** — only one accordion location ships in v1.4 (`/faq`). Build the primitive when a second consumer emerges (e.g., a Why-Choose-Us FAQ block, or per-service accordions on `/services`). Same rule that drove Phase 24 D-21 CheckboxGroup deferral.
- **Pagination / search / category filter on `/faq`** — 5 questions; not needed at this size. If the FAQ grows past 15+ entries, revisit with a faceted layout.
- **Setting the actual `PUBLIC_CALENDLY_URL` value in CI** — code wiring ships in Phase 25; the value itself is a Joel-action (one of the three `STATE.md > Pending Todos`). Not a code deliverable.
- **v1 `/faq` and `/thank-you` file deletion** — they're rewritten in place during this phase, so there's nothing left to delete after Phase 25 completes. The Phase 30 cleanup deletes the v1 `src/components/ui/`, `src/components/layout/`, and v1 `BaseLayout.astro` files; this phase's rewrites remove the last consumers of those v1 components on `/faq` and `/thank-you`.
- **Animated open/close on `<details>`** — pure-CSS height transitions on `<details>` are hacky; JS-based animation conflicts with the zero-JS-on-FAQ posture. If a smooth open animation becomes important, prefer `interpolate-size: allow-keywords` once browser support stabilizes (currently Chromium-only).

### Reviewed Todos (not folded)
None — `gsd-sdk query todo.match-phase 25` was not run as a separate step; no todos surfaced in prior context as phase-25-specific. The three `STATE.md > Pending Todos` (n8n env, Calendly URL value, social URLs) are all deployment-action items, not code-action items — only the Calendly URL has a code-side touchpoint, which is folded into D-25-11.

</deferred>

---

*Phase: 25-leaf-page-migrations-faq-thank-you-404*
*Context gathered: 2026-05-21*
