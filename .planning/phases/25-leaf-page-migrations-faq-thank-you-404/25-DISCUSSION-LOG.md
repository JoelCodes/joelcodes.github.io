# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-15
**Phase:** 25-leaf-page-migrations-faq-thank-you-404
**Areas discussed:** FAQ accordion treatment, FAQ CTA block design, 404 page content & layout, Thank-you v2 translation

---

## Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| FAQ accordion treatment | Native <details> styled with v2 tokens vs Card-wrapped; expand indicator | ✓ |
| FAQ CTA block design | New "CTA block at bottom" visual + wording + Button variant + target | ✓ |
| 404 page content & layout | Brand-new page — tone, key-page links, visual treatment | ✓ |
| Thank-you v2 translation | Translate v1 turquoise Card to v2 (no turquoise variant exists) | ✓ |

**User's choice:** All four areas selected for discussion.

---

## FAQ accordion treatment

### Q1: How should each FAQ item be styled in v2?

| Option | Description | Selected |
|--------|-------------|----------|
| Native <details> in v2 Card | Wrap each item in a v2 Card primitive | |
| Native <details>, bordered row | Bordered row with v2 tokens (border-border, rounded-lg, p-md) | ✓ |
| Native <details>, divider list | Single list with horizontal dividers between rows | |

**User's choice:** Native `<details>`, bordered row.
**Notes:** Keeps the JS-free native accordion (satisfies "accordion behavior unchanged"); lighter visual than a Card wrap; closer to Crito's clean FAQ row pattern.

### Q2: How should the expand indicator look?

| Option | Description | Selected |
|--------|-------------|----------|
| Lucide ChevronDown rotating | Lucide chevron, rotates 180° on group-open | ✓ |
| Keep '+' rotating to '×' | Preserve current behavior — '+' rotates 45° on open | |
| Lucide Plus / Minus toggle | Plus when closed, Minus when open (two icons) | |

**User's choice:** Lucide `ChevronDown` rotating.
**Notes:** Consistent icon vocabulary with v2 (Button uses `ArrowRight`, design-system page uses `Sparkles`/`Mail`).

### Q3: Should there be any intro/lead-in content above the FAQ list?

| Option | Description | Selected |
|--------|-------------|----------|
| Heading only | Just the H1 "Frequently Asked Questions" | |
| Heading + short lede | H1 + 1-2 sentence subheading priming the bottom CTA | ✓ |
| Heading + eyebrow tag | Small uppercase Badge above H1 | |

**User's choice:** Heading + short lede.

### Q4: What FAQ content edits are in scope?

| Option | Description | Selected |
|--------|-------------|----------|
| Keep all 5 FAQs as-is | No copy changes — migration only | ✓ |
| Open to small copy polish | Tone/clarity edits during migration if needed | |
| Audit/expand FAQ content | Significant content work (would expand scope) | |

**User's choice:** Keep all 5 FAQs as-is.

---

## FAQ CTA block design

### Q1: What visual treatment should the FAQ CTA block use?

| Option | Description | Selected |
|--------|-------------|----------|
| Elevated v2 Card, centered | v2 Card with elevated=true, max-w-2xl, centered | ✓ |
| Flat accent-bg panel | Full-width section with bg-accent | |
| Simple centered text + Button | No Card, no panel — just heading + body + Button | |

**User's choice:** Elevated v2 Card, centered.
**Notes:** Creates a coherent "centered Card moment" visual family with thank-you and 404 pages.

### Q2: What's the CTA wording?

| Option | Description | Selected |
|--------|-------------|----------|
| Still have questions? Let's talk | Heading: "Still have questions?" / Button: "Let's talk" | ✓ |
| Don't see your question? Get in touch | Continues the FAQ frame directly | |
| Ready to start? Book a call | More action-forward, pushes toward booking | |

**User's choice:** "Still have questions? Let's talk."

### Q3: Where should the CTA button send the user?

| Option | Description | Selected |
|--------|-------------|----------|
| /#contact anchor | Scrolls to homepage contact form (matches Header CTA) | ✓ |
| /contact (future page) | Anticipates standalone /contact route (not in roadmap) | |
| mailto: link | Direct email — skips form entirely | |

**User's choice:** `/#contact` anchor.

### Q4: Should the FAQ JSON-LD schema be moved into a reusable helper or kept inline?

| Option | Description | Selected |
|--------|-------------|----------|
| Keep inline in faq.astro | JSON-LD <script> stays in head slot inline | ✓ |
| Tiny FAQSchema component | Extract to v2/FAQSchema.astro reusable component | |

**User's choice:** Keep inline.
**Notes:** FAQ is the only page emitting `FAQPage` schema in v1.4; no reuse case yet.

---

## 404 page content & layout

### Q1: What tone/headline for the 404?

| Option | Description | Selected |
|--------|-------------|----------|
| Straightforward | "Page not found" + short body | ✓ |
| Playful but brief | "Lost in the codebase" or similar | |
| Big '404' numeral hero | Display-size 404 numeral as visual anchor | |

**User's choice:** Straightforward.

### Q2: What navigation should appear on the 404?

| Option | Description | Selected |
|--------|-------------|----------|
| Home only (single Button) | Single primary Button to '/' — nothing else | ✓ |
| Home + 3 key pages | Primary Button + link list (Blog, Projects, FAQ) | |
| Home + full key page grid | Card grid of 4-5 key destinations with descriptions | |

**User's choice:** Home only.
**Notes:** Deliberate tightening of the roadmap's success-criterion 3 plural wording. Rationale: Header is always visible and provides the rest of the nav; a second link list adds noise without wayfinding value. Captured as D-11 with a planner note in CONTEXT.md.

### Q3: What's the 404 page's visual layout?

| Option | Description | Selected |
|--------|-------------|----------|
| Centered Card (matches thank-you) | min-h-[70vh] flex centered, elevated v2 Card, max-w-2xl | ✓ |
| Hero-style flat section | Full-width centered section, no Card chrome | |
| Centered text, no Card, with icon | Lucide icon + heading + body + Button, no Card | |

**User's choice:** Centered Card (matches thank-you).

### Q4: Should the 404 page be excluded from search engines?

| Option | Description | Selected |
|--------|-------------|----------|
| Add noindex meta | `<meta name="robots" content="noindex, follow">` via head slot | ✓ |
| Leave default (indexable) | No noindex; crawlers handle 404 as they will | |

**User's choice:** Add noindex meta.
**Notes:** Same pattern as `/design-system` page.

---

## Thank-you v2 translation

### Q1: How should the thank-you Card visual translate to v2?

| Option | Description | Selected |
|--------|-------------|----------|
| Elevated default Card | v2 Card with elevated=true, no color variant | ✓ |
| Default Card with accent border-top | Thicker top border in --color-accent green | |
| Accent-bg banner Card | bg-accent on the Card itself | |

**User's choice:** Elevated default Card.

### Q2: Should the CheckCircle2 icon stay?

| Option | Description | Selected |
|--------|-------------|----------|
| Keep CheckCircle2, text-accent color | Same icon, recolored | |
| Switch to Lucide MailCheck or Send | Either better expresses the form-submission moment | ✓ |
| Drop the icon | Heading + paragraph + Button only | |

**User's choice:** Switch to Lucide `MailCheck`/`Send` (further narrowed in Q3).

### Q3: Which icon — MailCheck or Send?

| Option | Description | Selected |
|--------|-------------|----------|
| Lucide MailCheck | Envelope + checkmark — explicit "message received" | ✓ |
| Lucide Send | Paper-plane — generic "message sent" | |

**User's choice:** Lucide `MailCheck`.

### Q4: How should the Calendly placeholder be handled in this phase?

| Option | Description | Selected |
|--------|-------------|----------|
| Preserve the placeholder button verbatim | Keep "Skip the wait — book a call" Button + placeholder URL | ✓ |
| Hide button behind a feature flag/comment | Comment out until real URL set | |
| Strip the booking button entirely | Drop the Calendly CTA, defer to later | |

**User's choice:** Preserve the placeholder verbatim.
**Notes:** Real URL swap stays on the v1.3 STATE.md pending-todos list, separate from this phase.

---

## Claude's Discretion

- Exact lede wording under the FAQ H1 (D-03) — Claude polishes during implementation; 1–2 sentences priming the bottom CTA.
- Exact 404 body copy (D-10) — Claude writes during implementation; short, no apology, no exposed error code.
- Padding values inside each FAQ row (D-01) — choose from v2 spacing tokens (likely `p-md` 24px or `p-sm`).
- ChevronDown rotation timing/easing (D-02) — Claude picks; constraint is "matches existing v2 transition-* duration".
- Thank-you "Return to homepage" secondary link style — current underline vs v2 `Button variant="link"`.
- 404 Button variant — `primary` (filled green) vs `ghost` (outlined); primary is the safer default.

## Deferred Ideas

- FAQ content audit / new questions (kept verbatim per D-04)
- Dedicated `/contact` route (CTA targets `/#contact` anchor)
- `FAQSchema.astro` reusable component (not needed — only FAQ uses it)
- Eyebrow Badge above FAQ H1
- 404 page with key-page link grid
- Real Calendly URL provisioning (separate v1.3 todo)
- Real `PUBLIC_N8N_WEBHOOK_URL` configuration (separate v1.3 todo)
- v1 primitive deletion (Phase 30)
