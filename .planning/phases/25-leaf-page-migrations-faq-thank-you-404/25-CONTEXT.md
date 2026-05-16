# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Context

**Gathered:** 2026-05-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate the three simplest pages onto `src/layouts/v2/BaseLayout.astro`, validating dual-layout coexistence on low-risk targets before any content-heavy migration:

1. **`/faq`** — Migrate to `BaseLayoutV2`. Keep the 5 native `<details>/<summary>` FAQ items (no copy changes), restyle with v2 tokens. Add a CTA block at the bottom. Preserve the `FAQPage` JSON-LD schema inline.
2. **`/thank-you`** — Migrate to `BaseLayoutV2`. Re-express the v1 turquoise success Card using v2 primitives (no turquoise variant exists in v2). Preserve the Calendly placeholder Button verbatim — the real URL swap is a separately tracked v1.3 todo.
3. **`/404`** — Create new `src/pages/404.astro` on `BaseLayoutV2`. Astro's static build picks this up automatically for GitHub Pages.

**Not in this phase:**
- Blog migration (Phase 26)
- Projects + Services migration (Phase 27)
- Contact reskin (Phase 28)
- Home / About migration and v1 primitive deletion (Phase 29 / 30)
- FAQ content audit / new questions — keep all 5 FAQs verbatim
- Real Calendly URL provisioning — separate todo from v1.3 STATE.md
- Real n8n webhook configuration — separate todo from v1.3 STATE.md
- Any new v2 primitive (CheckboxGroup ships in Phase 28)

</domain>

<decisions>
## Implementation Decisions

### FAQ accordion treatment
- **D-01:** FAQ items use native `<details>/<summary>` (JS-free, accessible, satisfies success-criterion "accordion behavior unchanged"), styled as **bordered rows** with v2 tokens — `border border-border rounded-lg p-md` per item, vertical gap between items. NOT wrapped in a v2 Card (lighter visual, closer to Crito's clean FAQ row pattern). NOT a divider-list style.
- **D-02:** Expand indicator is a **Lucide `ChevronDown`** from `@lucide/astro` that rotates 180° on `group-open`. Replaces the current `+` glyph. Consistent icon vocabulary with v2 (Button uses `ArrowRight`, design-system page uses `Sparkles`/`Mail`). `aria-hidden="true"` on the icon; the `<summary>` text carries the accessible name.
- **D-03:** Page introduces the FAQ list with **heading + short lede**: `H1 "Frequently Asked Questions"` followed by a 1–2 sentence subheading (e.g., "Common questions about working together. Don't see yours? Let's talk."). The lede primes the new bottom CTA. No eyebrow Badge, no oversized hero.
- **D-04:** **All 5 existing FAQ questions/answers ship verbatim.** No copy edits, no additions, no restructuring. Migration only — content audits live in their own phase if ever needed.

### FAQ CTA block design
- **D-05:** CTA is an **elevated v2 Card**, centered, `max-w-2xl`, with `<CardBody>` containing heading + lede + Button. Reuses the v2 Card primitive (no new component, no new variant). Same composition family as the thank-you and 404 pages — produces a coherent "centered Card moment" visual identity across the three leaf pages.
- **D-06:** CTA copy is locked:
  - Heading: **"Still have questions?"**
  - Lede: **"Tell me about your project — I usually respond within 48 hours."**
  - Button label: **"Let's talk"** (v2 `Button variant="primary" size="md"`, no icon override — primary variant has no default icon).
- **D-07:** CTA Button `href="/#contact"` — scrolls to the homepage contact form anchor, matching the Header "Let's Talk" button's destination. Single anchor target across the entire site for consistency. (Phase 28 reskins the form in place; no separate `/contact` page exists or is planned.)
- **D-08:** `FAQPage` JSON-LD schema **stays inline** in `src/pages/faq.astro`. Rendered via `<script type="application/ld+json" set:html={...}>` inside the `<slot name="head">` slot exposed by `BaseLayoutV2`. No new `FAQSchema` component — FAQ is the only page that emits this schema in v1.4.

### 404 page content & layout
- **D-09:** File location: **`src/pages/404.astro`**. Astro's static build (`npm run build`) automatically outputs `dist/404.html`, which GitHub Pages serves for any unmatched route. No additional routing or `astro.config.mjs` change needed.
- **D-10:** Tone is **straightforward, not playful**. Headline: `"Page not found"`. Body: `"This page doesn't exist or has moved. Head back home to find what you're looking for."` (final body copy is Claude's discretion during planning — keep it short, no apology, no error-code-as-display).
- **D-11:** **Navigation is a single "Return home" Button to `/`** — NOT a list of key pages. Deliberate tightening of the roadmap's success-criterion 3 wording ("navigation links back to the homepage and key pages") to a single home Button. Rationale: Header is already visible on every page including the 404, providing nav to Blog / Projects / FAQ / Contact; a second redundant link list adds visual noise without adding wayfinding. **Planner: do not interpret success-criterion 3 literally — single Button satisfies the spirit (recoverable nav), and Header carries the rest.**
- **D-12:** Visual layout matches the thank-you pattern — **elevated v2 Card, centered, `max-w-2xl`** in a container with `min-h-[70vh] flex items-center justify-center`. No icon. No background art. Card contains heading + body + Button only.
- **D-13:** 404 page is **excluded from search engines** via `<meta name="robots" content="noindex, follow">` injected through `<slot name="head">`. Same pattern as the `/design-system` page.

### Thank-you v2 translation
- **D-14:** Migrate to **v2 elevated Card** (`elevated` prop = true) inside the existing `min-h-[70vh] flex items-center justify-center` container. Card holds `<CardBody>` with icon + heading + paragraph + primary Button + secondary "Return home" link. v2 has no `turquoise` variant — the visual cue of "this is a success state" comes from the icon + accent-colored elements, not from a colored Card background.
- **D-15:** Replace the current `CheckCircle2` icon with **Lucide `MailCheck`** at size 64, colored `text-accent` (green). Explicit "your message was received" semantic vs the generic checkmark. Lives at the top of the CardBody, centered.
- **D-16:** **Calendly placeholder Button preserved verbatim**: label `"Skip the wait — book a call"`, `href="https://calendly.com/joelshinness"` (the existing placeholder URL). Use v2 `Button variant="primary" size="lg"`. The real Calendly URL swap is tracked separately as a pending todo from v1.3 STATE.md (do not fold into this phase). The secondary "Return to homepage" text link stays as well.

### Cross-cutting (all three pages)
- **D-17:** Every page imports its layout from `src/layouts/v2/BaseLayout.astro` and uses **only v2 primitives** from `src/components/v2/ui/` (`Button`, `Card`, `CardBody`). No v1 primitive imports remain in these three files after migration. Footer (already in v2 BaseLayout) does NOT change in this phase.
- **D-18:** When migrating `/faq` specifically: the current file is the most legacy on the site (inline `<html>` scaffold, inline Google Fonts links, inline dark-mode boot script, direct `Header`/`Footer` v1 imports). All of that is **deleted in the migration** — `BaseLayoutV2` already preloads Plus Jakarta Sans via `@fontsource-variable/plus-jakarta-sans`, already renders v2 Header/Footer, and is light-mode-only (no `prefers-color-scheme` script, no `dark:` utilities, no `.dark` class). Same legacy-cleanup applies to `/thank-you` (currently imports v1 `BaseLayout`).
- **D-19:** Tests live in **`tests/accessibility/v2-leaf-pages.spec.ts`** (new file, mirrors the existing `tests/accessibility/v2-primitives.spec.ts` and `tests/accessibility/v2-layout.spec.ts` patterns). Plan 25-01 covers axe-core 0-violations on `/faq` plus a behavioral check that the JSON-LD `<script>` is present and parses to a valid `FAQPage` schema (`@type === "FAQPage"`, `mainEntity.length === 5`). Plan 25-02 covers axe-core 0-violations on `/thank-you` and `/404`. Lighthouse 90+ on all three is verified by the existing Lighthouse CI workflow on PR (no new config).
- **D-20:** Roadmap-locked plan split is **preserved**: `25-01` = FAQ migration + CTA + JSON-LD verification + axe-core; `25-02` = thank-you migration + new 404 page + axe-core. Plans are independent (no shared file edits between 25-01 and 25-02) — eligible for parallel wave execution.

### Claude's Discretion
- Exact lede wording under the FAQ H1 (D-03) — Claude polishes during implementation; constraint is 1–2 sentences, primes the bottom CTA.
- Exact 404 body copy (D-10) — Claude writes during implementation; constraint is short, no apology, no exposed error code, leads into the "Return home" Button.
- Padding values inside each FAQ row (D-01) — choose from v2 spacing tokens (`p-md` = 24px is the likely fit but `p-sm` may read better given the bordered-row aesthetic).
- ChevronDown rotation timing/easing (D-02) — Claude picks; constraint is "matches existing v2 transition-* utility duration (150ms / 200ms / 300ms range)".
- Whether the "Return to homepage" secondary link on thank-you (D-14) keeps its current underline style or uses v2 `Button variant="link"` — Claude picks during planning. Either is acceptable.
- Whether the 404 Button is `variant="primary"` (filled green) or `variant="ghost"` (outlined) (D-12) — Claude picks during planning; primary is the safer default since it's the only action on the page.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope (locked)
- `.planning/ROADMAP.md` §"Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404)" — Goal, Depends-on (Phase 24), Requirements list (LEAF-01, LEAF-02, LEAF-03), 4 Success Criteria, 2 plan slots. **Note:** Success-criterion 3 wording ("navigation links back to the homepage and key pages") is deliberately tightened to a single home Button in D-11 — planner must apply the spirit of recoverable nav, not the literal plural.
- `.planning/REQUIREMENTS.md` §"Standalone Pages" → LEAF-01, LEAF-02, LEAF-03. (LEAF-04 was completed in Phase 24 and is not in scope.)
- `.planning/PROJECT.md` §"Current Milestone: v1.4 Design Overhaul" — build-alongside-then-swap strategy, light-mode only, Crito reference.

### Phase 23 / 24 decisions (carry-forward — locked, do not re-decide)
- `.planning/phases/23-design-system-foundation/23-CONTEXT.md` — v2 namespace (D-01/02), semantic role tokens (D-04..08), v1-collision rule (D-08), typography token rename `--font-display`/`--font-text` (D-06), light-mode invariant (D-08 carry-forward — no `prefers-color-scheme`, no `localStorage.theme`, no `.dark` selector, no `dark:` utilities).
- `.planning/phases/24-v2-primitive-library-design-system-page/24-CONTEXT.md` — v2 primitive API contracts:
  - Button (D-01..04): variant `primary`/`ghost`/`link` × size `sm`/`md`/`lg`; polymorphic `href` → `<a>`; iconLeft/iconRight; link variant defaults iconRight to ArrowRight.
  - Card composition (D-05..07): `Card.astro` + `CardHeader.astro` + `CardBody.astro` + `CardFooter.astro` imported separately; `elevated` boolean adds `shadow-md`; `interactive` boolean for hover-lift + focus ring.
  - Focus-ring rule (D-18 from Phase 24): every interactive primitive uses `outline: 2px solid var(--color-accent); outline-offset: 2px;` on `:focus-visible`.
  - Utility-first (D-19 from Phase 24): primitives consume tokens via Tailwind v4 auto-generated utilities from the `@theme` block. No `is:global`. Scoped `<style>` only where utilities cannot express the rule.
- `.planning/STATE.md` §"Key Decisions (v1.4)" — Phase 24 24-05 (`--max-width-*` tokens), 24-06 (`hover:-translate-y-1` lift), 24-07 (`--color-danger` baseline). All relevant to v2 primitive defaults already shipped.

### v2 foundation (must build on — Phase 23/24 outputs)
- `src/layouts/v2/BaseLayout.astro` — the layout shell every Phase 25 page imports. Exposes `<slot name="head">` for per-page `<meta>`, JSON-LD, and other head injections.
- `src/components/v2/layout/Header.astro` — sticky header with nav links (`/blog`, `/projects`, `/faq`, `/#contact`) + "Let's Talk" CTA. Rendered automatically by `BaseLayoutV2`.
- `src/components/v2/layout/Footer.astro` — site footer. Rendered automatically by `BaseLayoutV2`.
- `src/components/v2/layout/MobileNav.astro` — mobile nav drawer, included by Header.
- `src/styles/v2/global.css` — v2 token system (`@theme` block) + Tailwind v4 utility generation source. Every utility used by these pages (`bg-surface`, `text-text`, `border-border`, `rounded-lg`, `text-accent`, `shadow-md`, `max-w-2xl`, `p-md`, `gap-md`, `text-display`, etc.) comes from this file.
- `src/components/v2/ui/Button.astro` — `import Button from '../components/v2/ui/Button.astro';` Use for FAQ CTA, 404 home Button, thank-you Calendly Button.
- `src/components/v2/ui/Card.astro` — Card wrapper. Both thank-you and 404 use `<Card elevated>` per D-12/D-14.
- `src/components/v2/ui/CardBody.astro` — content slot for the centered-Card layouts on thank-you, 404, and the FAQ CTA. Imported separately per Phase 24 D-05.

### Existing leaf pages (rewrite in place)
- `src/pages/faq.astro` (122 lines, most legacy file on the site — inline `<html>` scaffold + Google Fonts links + dark-mode boot script + v1 imports). Replaced in place. Pull the `faqs` array and `faqSchema` JSON-LD shape from this file verbatim per D-04.
- `src/pages/thank-you.astro` (58 lines, uses v1 `BaseLayout` + `Card variant="turquoise"` + `CheckCircle2`). Replaced in place. Pull message copy and Calendly placeholder URL from this file per D-16.

### New file
- `src/pages/404.astro` (does not exist yet) — created in Plan 25-02. Astro static build auto-emits `dist/404.html` for GitHub Pages.

### v1 references (DO NOT import — replaced this phase)
- `src/layouts/BaseLayout.astro` — v1 layout. After Phase 25, `/faq` and `/thank-you` no longer import this. Other v1 pages (home, blog, projects, design-system was already migrated in Phase 24) still use it until their migration phases. Do not delete in this phase.
- `src/components/ui/Card.astro` — v1 Card with `variant="turquoise"`. Replaced by v2 Card on thank-you. Do not delete this phase.
- `src/components/ui/Button.astro` — v1 Button. Replaced by v2 Button on thank-you and FAQ. Do not delete this phase.

### Testing
- `tests/accessibility/v2-layout.spec.ts` — Phase 23 deliverable. Pattern reference for how v2 axe-core specs are structured.
- `tests/accessibility/v2-primitives.spec.ts` — Phase 24 deliverable. Pattern reference for axe-core + Playwright assertions on v2 pages.
- New file `tests/accessibility/v2-leaf-pages.spec.ts` — created this phase per D-19.

### External packages (already installed)
- `@lucide/astro` — source of `ChevronDown` (FAQ indicator, D-02) and `MailCheck` (thank-you icon, D-15). Pattern already established in v2 Header / Footer / Button.
- `@fontsource-variable/plus-jakarta-sans` — preloaded by `BaseLayoutV2` already; deletes inline Google Fonts links from `/faq` per D-18.

### Pending todos (referenced by phase but NOT folded — handled separately)
- v1.3 carry-over: "Configure n8n webhook — set `PUBLIC_N8N_WEBHOOK_URL` environment variable" (pre-deployment todo, unrelated to layout migration).
- v1.3 carry-over: "Update Calendly booking link on /thank-you page with real URL" — referenced by D-16 (preserve placeholder verbatim, swap separately).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`src/pages/design-system.astro`** — Phase 24 deliverable; the first v2 page ever. Reference for: how to import `BaseLayout` from `'../layouts/v2/BaseLayout.astro'`, how to inject head-slot meta (`<meta slot="head" name="robots" content="noindex, follow" />`), how to use Card composition + CardBody nesting.
- **`src/pages/thank-you.astro` (current v1)** — pull the message copy, Calendly placeholder URL, and `min-h-[70vh] flex items-center justify-center` container pattern verbatim. Only the Card primitive + icon + Card variant change.
- **`src/pages/faq.astro` (current v1)** — pull the `faqs` array and `faqSchema` JSON-LD object verbatim (D-04). Discard everything else (the inline HTML scaffold, dark-mode boot, Google Fonts links, v1 Header/Footer imports).
- **`@lucide/astro` imports** — already a v2 pattern in `Button.astro` (`ArrowRight`) and `design-system.astro` (`Sparkles`, `Mail`). Add `ChevronDown` (FAQ) and `MailCheck` (thank-you) following the same import pattern.

### Established Patterns
- **`<slot name="head" />` injection** — `BaseLayoutV2` line 29 exposes a head slot. Pages inject `<meta>` (404 noindex), `<script type="application/ld+json">` (FAQ schema) via this slot. Already used by `/design-system.astro` for the noindex meta.
- **Light-mode-only invariant** (Phase 23 D-08 carry-forward) — these three pages MUST NOT contain `prefers-color-scheme`, `localStorage.theme`, `.dark` selectors, or any `dark:` utilities. The current `/faq` page has all of these inline — they're all deleted in Plan 25-01 per D-18.
- **Astro polymorphic Button** — `Button` with `href` renders an `<a class="btn">`; without `href` renders `<button>`. The FAQ CTA, the thank-you Calendly action, and the 404 home action are all `<a>` (href present). No form submits on these three pages.
- **Centered-Card composition** — `<div class="container mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center"><Card elevated class="max-w-2xl text-center"><CardBody>...</CardBody></Card></div>` is the canonical pattern for thank-you and 404 (and is the same family as the FAQ CTA Card sitting at the bottom of `/faq`).
- **Tailwind v4 `max-w-*` utilities from v2 tokens** — `max-w-2xl` (672px), `max-w-md` (448px), `max-w-3xl` (768px) all resolve from `--max-width-*` tokens added in Phase 24 Plan 24-05.

### Integration Points
- **`/faq` route** — `src/pages/faq.astro` already exists; Plan 25-01 overwrites in place. URL unchanged.
- **`/thank-you` route** — `src/pages/thank-you.astro` already exists; Plan 25-02 overwrites in place. URL unchanged. The homepage contact form's success redirect (in v1 ContactSection) still points to `/thank-you` — verify the redirect URL is untouched by this phase.
- **`/404`** — new file `src/pages/404.astro`. Astro auto-detects, no `astro.config.mjs` change. GitHub Pages reads `404.html` from `dist/` automatically.
- **`tests/check-token-collision.cjs`** — Phase 23 Wave-0 guard. This phase adds zero new tokens, so the guard remains green by default.
- **Header nav `/faq` link** — `src/components/v2/layout/Header.astro` line 7 already links to `/faq`. After migration this resolves to the new v2 FAQ page without any Header change.

</code_context>

<specifics>
## Specific Ideas

- **The three pages form a coherent "centered Card moment" visual family.** FAQ CTA, thank-you, and 404 all use the same `<div container … min-h-[70vh] flex items-center justify-center><Card elevated max-w-2xl>` composition. This deliberate consistency makes them feel like one design language across the site — and reuses the Phase 24 Card primitive exactly as it was built (no new variants).
- **`/faq` is the most-legacy file on the entire codebase right now.** Inline `<html>` scaffold, inline Google Fonts link tags, inline `<script is:inline>` dark-mode boot, v1 Header/Footer imports, direct font-body / dark: utility classes. Plan 25-01 is the biggest single legacy-cleanup of the v1.4 milestone — everything that's not the FAQ content array, the JSON-LD object, or the H1 string is replaced.
- **D-11 is a deliberate scope clarification.** Roadmap success-criterion 3 reads "navigation links back to the homepage and key pages" (plural). User chose single "Return home" Button. Planner must NOT add a secondary link list "to satisfy the literal wording" — the recoverable-nav spirit is met by the always-visible Header. This decision is locked.
- **The Calendly placeholder URL on thank-you is intentionally preserved.** v1.3 STATE.md carries a pending todo to swap in the real URL. Phase 25 must not fold or resolve that todo — only carry it forward. The Button label and href are migrated verbatim per D-16.
- **FAQ JSON-LD validation is testable.** Plan 25-01's axe-core spec should additionally fetch `/faq`, parse the inline `<script type="application/ld+json">` content, and assert `@type === "FAQPage"` plus `mainEntity.length === 5`. This is the only Phase 25 page-specific behavioral check beyond axe-core.

</specifics>

<deferred>
## Deferred Ideas

- **FAQ content audit / new questions** — kept all 5 verbatim per D-04. If a content sweep becomes useful later, that's a copy-only phase, not a layout migration.
- **Dedicated `/contact` route** — current CTA targets `/#contact` anchor on home per D-07. A standalone contact page is not in v1.4 roadmap.
- **`FAQSchema.astro` reusable component** — not built per D-08; FAQ is the only page emitting `FAQPage` JSON-LD. Revisit only if a future phase adds another FAQ surface.
- **Eyebrow Badge above FAQ H1** — considered (D-03 alternative) and rejected for now. Could be revisited if/when a broader editorial polish phase happens.
- **404 page with key-page link grid** — considered (D-11 alternative) and rejected. If site analytics later show 404s as a common entry point, a richer wayfinding card grid is its own micro-phase.
- **`/contact` reskin / form changes** — Phase 28 scope.
- **Real Calendly URL provisioning** — separately tracked v1.3 todo. Phase 25 only preserves the placeholder.
- **Real `PUBLIC_N8N_WEBHOOK_URL` environment configuration** — separately tracked v1.3 todo. Not in this phase.
- **Replacing the v1 `BaseLayout.astro`, v1 `Card.astro`, v1 `Button.astro`, v1 dark-mode script** — Phase 30 (v1 primitive deletion) per Phase 24 D-21 / 23-CONTEXT carry-forwards.

### Reviewed Todos (not folded)
None — `gsd-sdk query todo.match-phase 25` was not run; no checkpointed todos surfaced during discussion. The two v1.3 carry-over todos (n8n webhook, real Calendly URL) are explicitly out of scope for this layout migration phase.

</deferred>

---

*Phase: 25-leaf-page-migrations-faq-thank-you-404*
*Context gathered: 2026-05-15*
