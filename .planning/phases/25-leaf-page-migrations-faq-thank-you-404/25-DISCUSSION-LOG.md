# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-21
**Phase:** 25-leaf-page-migrations-faq-thank-you-404
**Areas discussed:** FAQ chrome + CTA block, FAQ accordion v2 treatment, /thank-you visual + Calendly link, /404 content + layout

---

## FAQ CTA block — copy + link target + treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Soft pivot → #contact | "Still have questions? Let's talk." + single primary Button → `/#contact`. Surface-muted banner background. | ✓ |
| Outcome-framed pivot | "Ready to figure out what you actually need? Book a 30-min discovery call." + primary Button → `/#contact`. | |
| Dual CTA (form + call) | "Two ways to start: fill out the contact form or grab time on the calendar." + primary Button → `/#contact` AND ghost Button → Calendly URL. | |

**User's choice:** Soft pivot → #contact.
**Notes:** Low-pressure framing fits the post-FAQ read; visitor just consumed objections, soft ask converts better. Single CTA — no Calendly link here (Calendly lives on /thank-you).

---

## FAQ page header

| Option | Description | Selected |
|--------|-------------|----------|
| Full Phase 26 banner | Surface-muted band, breadcrumbs ("Home › FAQ") + centered title in --font-display. Matches /blog precedent exactly. | ✓ |
| Banner without breadcrumbs | Same band + centered title, no breadcrumbs. Slightly lighter. | |
| Plain centered title (no banner) | Skip the banner entirely; just centered h1 on white. Lets the bottom CTA banner do all chrome work. | |

**User's choice:** Full Phase 26 banner.
**Notes:** Cohesive site chrome — same banner pattern on /blog and /faq, will repeat on /projects index in Phase 27. Two banded sections (top header + bottom CTA) sandwiching the accordion accepted as visually balanced.

---

## FAQ accordion visual

| Option | Description | Selected |
|--------|-------------|----------|
| Card-wrapped, chevron rotate | Each `<details>` wrapped in v2 Card (default). ChevronDown right, rotates 180° on open. Reuses primitive. | |
| Card-wrapped, plus rotate to × | Same Card wrap. Plus glyph rotating 45° to × (echoes v1 behavior). | |
| Divider-list (no Card) | No Card per row. --color-border 1px horizontal dividers between rows; question + chevron full-width. Lighter; closer to Crito-style accordions. | ✓ |

**User's choice:** Divider-list (no Card).
**Notes:** Lighter visual weight; preserves native `<details>/<summary>` markup. Chevron rotation kept (not the v1 plus-rotate).

---

## /thank-you visual treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Elevated Card + accent icon | Centered v2 Card with elevated=true. CheckCircle2 in --color-accent green. Primary Button → Calendly, secondary text link → home. | ✓ |
| Default Card + accent icon | Same layout, flat (non-elevated) Card with 1px border. Quieter. | |
| No Card, centered hero | Strip the Card; centered icon, headline, body, button stacked on the page. Most minimal. | |

**User's choice:** Elevated Card + accent icon.
**Notes:** Depth fits the confirmation moment — the "your form went through" beat justifies pulling visual weight. Icon color stays --color-accent green for the success semantic.

---

## /thank-you Calendly placeholder URL

| Option | Description | Selected |
|--------|-------------|----------|
| Keep placeholder; deployment task | Carry existing placeholder URL through migration unchanged. STATE.md already tracks updating it as a deployment task. | |
| Update to real Calendly URL now | Replace with actual booking URL during this phase. | |
| Move to env var (PUBLIC_CALENDLY_URL) | Read from `import.meta.env.PUBLIC_CALENDLY_URL` with placeholder fallback. Mirrors PUBLIC_N8N_WEBHOOK_URL pattern. | ✓ |

**User's choice:** Move to env var (PUBLIC_CALENDLY_URL).
**Notes:** Mirrors the existing PUBLIC_N8N_WEBHOOK_URL deployment pattern. Adds a deployment-time CI variable to set; closes one of the pending STATE.md todos by moving the action from "edit code" to "set env var." Code pattern: `import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness'`.

---

## /404 page concept

| Option | Description | Selected |
|--------|-------------|----------|
| Big numeral + nav cards | Big "404" numeral, short copy, 2×2 grid of v2 Cards (interactive) linking Home / Projects / Blog / FAQ, plus a contact CTA below. | ✓ |
| Centered message + inline links | Smaller numeral, friendly headline, primary Button → home + inline text links to Projects / Blog / FAQ / Contact below. | |
| Banner header + dest list | Phase 26 page-header banner ("Home › 404", "Page not found"), then short message + vertical list of destinations with arrows. | |

**User's choice:** Big numeral + nav cards.
**Notes:** Typographic-only chrome (no banner) — signals "system state, not destination." 4-cell grid as recovery interaction; contact CTA below as soft fifth option. Reuses the `interactive` Card pattern from Phase 24 / Phase 26 BlogCard.

---

## Claude's Discretion

- Exact font scale on `/404` numeral (text-8xl baseline; planner picks final scale step that reads "BIG" but doesn't break mobile)
- Exact card grid gap on `/404` (gap-md vs gap-lg)
- Open-state animation on `<details>` (CSS-only transform on chevron baseline; height transition allowed if planner has a clean CSS-only pattern)
- Whether the `/faq` CTA banner uses a Card or a bare `<section>` with `bg-surface-muted` (bare section preferred)
- Order of nav cards on `/404` (Home / Projects / Blog / FAQ vs alternative orderings)
- Whether to drop the `<style>` block on `/thank-you` (likely redundant under v2 container utilities)
- Whether to wire `PUBLIC_CALENDLY_URL` into the GitHub Actions build env as a 25-02 sub-task or treat it as a deployment-action only

## Deferred Ideas

- Search bar / "did you mean" on /404 (needs Pagefind; defer to v1.5+)
- A 404 illustration / SVG graphic (v1.4 is illustration-free; revisit if a v2-style line illustration emerges later)
- A v2 accordion primitive (defer until a second consumer emerges; same rule as Phase 24 CheckboxGroup deferral)
- Pagination / search / category filter on /faq (defer until 15+ entries)
- Setting the actual PUBLIC_CALENDLY_URL value in CI (Joel-action, not code deliverable)
- Animated open/close on `<details>` content (defer until `interpolate-size: allow-keywords` has cross-browser support)
- v1 `/faq` and `/thank-you` files — rewritten in place; nothing to delete after Phase 25
