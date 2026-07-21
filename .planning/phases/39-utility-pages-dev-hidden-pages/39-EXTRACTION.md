# 39 — Frame Extraction (Service Web + Area Abbotsford)

Verbatim copy + section structure extracted from the **Joel-approved** desktop frames
(`85:105` Service Web, `85:281` Area Abbotsford). Authority for the Wave 3 code build.
Mobile frames (`248:102`, `255:95`) confirm the responsive reflow (24px gutters, 342 column,
hero h1 40 / h2 30 / lead 18, card rows stacked). 768/1920 responsive in code (D-09).

## Build rules (from CONTEXT + UI-SPEC — LOCKED)

- **NO `import.meta.env.PROD` redirect** on either page (D-01/D-02, Strategy A). Pages ship to prod, reachable by URL, unlinked in nav.
- **noindex via head slot:** `<meta slot="head" name="robots" content="noindex, nofollow" />` into BaseLayout `<slot name="head" />`. Do NOT alter `<link rel="canonical">`.
- **Abbotsford JSON-LD (minimal, D-04):** `<script slot="head" type="application/ld+json" set:html={...} />` — `{ "@context":"https://schema.org", "@type":"ProfessionalService", "name":"Joel Shinness Solutions", "url":"https://joelshinness.com", "areaServed":"Abbotsford, BC", "serviceType":"Web Development", "provider":{"@type":"Person","name":"Joel Shinness"} }`. NO address/telephone.
- **Compose only** from `src/components/wl/` (Eyebrow, ServiceCard, FAQItem, LinkCard/Callout, CTAButton, Breadcrumb, FrequencyWave). No new components.
- **Page shell** (Phase 37 index.astro / Phase 38 showcase.astro precedent): gutters `px-[24px] sm:px-[32px] lg:px-[160px] min-[1920px]:px-[400px]`, section vertical padding 112px, content max-width 1120px.
- **Headings:** one `<h1>`, section `<h2>`, card titles `<h3>` (ServiceCard `headingLevel={3}`).
- **CTAs:** `CTAButton variant="solid" icon="calendar" href={BOOKING_URL} target="_blank" rel="noopener"` (Book a call); Email = `mailto:` to Joel. Breadcrumb back-link.
- **Dark:** derived (Phase 38 D-04 landing recipe), no dedicated dark frame.

---

## PAGE A — `/services/web` (`src/pages/services/web.astro`)

**Breadcrumb:** Home / Services / Web

### 1. Hero
- Eyebrow: `WIN MORE CUSTOMERS`
- h1: `Web development that wins you customers — and tools that run your day`
- Lead: `Your website is the first employee a customer ever meets. I build sites that earn trust the moment they load — and the custom tools behind them: booking systems, customer portals, job trackers, dashboards. Fast, modern, perfect on a phone, and shaped around how your business actually works.`
- CTAs: `Book a call` (solid, BOOKING_URL) · `Email me` (ghost, mailto)
- FrequencyWave field background.

### 2. Kinds — Eyebrow `WHAT THIS COVERS`, h2 `Two kinds of web work.`  (2× ServiceCard, headingLevel=3)
- Card 1 — eyebrow `The site that brings customers in`, title `Websites`, body: `Design, copy structure, and build — a site that looks like you take your work seriously, loads instantly, and makes "get in touch" the easy next step. No page-builder bloat, no monthly platform ransom. You own it.`
- Card 2 — eyebrow `The tools that run the day`, title `Custom web apps`, body: `When spreadsheets and sticky notes stop scaling: a booking system that fills your calendar, a portal that cuts the customer back-and-forth, a dashboard that shows you this week's numbers without asking anyone. Purpose-built, which means it fits — nothing to work around.`

### 3. Proper — Eyebrow `THE STANDARD`, h2 `What "built properly" means.`  (4-item list)
1. `Fast on a phone, because that's where your customers are.`
2. `You'll understand what you're getting and why it's worth it — plain words, no jargon tax.`
3. `Tested and solid — a five-page site gets the same rigor as software people rely on every day.`
4. `You'll know what it costs before I start building. That promise holds the whole way through.`
- Footnote row: `Previously built software at ` + `EA · Unity · lululemon · thatgamecompany.`

### 4. FAQ — Eyebrow `QUESTIONS PEOPLE ASK`, h2 `Straight answers first.`  (4× FAQItem)
- Q1: `What does a small-business website cost?` — **[COPY GAP] answer**
- Q2: `Can you fix or extend my existing site?` — **[COPY GAP] answer**
- Q3: `Do you do e-commerce?` — **[COPY GAP] answer**
- Q4: `Where do you work?` — **[COPY GAP] answer**
- ⚠ The 4 FAQ answers are NOT in the Figma frame (questions only). Render `[COPY GAP]` markers (yellow bg + red outline), log to `39-COPY-GAPS.md`, resolve at fidelity gate.

### 5. Paired — Eyebrow `OFTEN PAIRED WITH`, h2 `A site gets more valuable when the work around it moves itself.`  (2× LinkCard)
- Card 1 — outcome `Get hours back, every week`, title `Automations`, body `The tools you already use, wired together so data moves itself — no copy-pasting, no forgotten follow-ups.`, link `Automations →` (to `/#services` per anchor contract, or placeholder)
- Card 2 — outcome `The judgment work, handled`, title `AI`, body `Straight answers on where AI pays off — then it works inside your workflow: reading, sorting, drafting, summarizing.`, link `Practical AI →`

### 6. Final CTA — Eyebrow `GET IN TOUCH`, h2 `Tell me what your website should be doing for you.`
- Lead: `If there's a solution that saves you time or money, I'll tell you what it'd take. If there isn't, I'll tell you that too.`
- CTAs: `Book a call` · `Email me`
- Serving line: `Serving Abbotsford, Vancouver, and the Fraser Valley — and remote clients everywhere.`

---

## PAGE B — `/areas/abbotsford` (`src/pages/areas/abbotsford.astro`)

**Breadcrumb:** Home / Abbotsford, BC
**Copy status: SCAFFOLD (D-03)** — present + polished but not final for publish (FUT-03 gates rewrite). No real NAP.

### 1. Hero
- Eyebrow: `SERVICE AREA · ABBOTSFORD`
- h1: `A software developer based right here in Abbotsford`
- Lead: `I live and work in Abbotsford, and I build websites and custom tools, automations, and practical AI for the businesses that run this part of BC — agriculture, trades, manufacturing, and the shops and services on the ground. When it helps, I show up in person: same table, same whiteboard, no discovery call lost in a video-chat lag.`
- CTAs: `Book a call` · `Email me`
- Serving line: `Serving Abbotsford, Vancouver, and the Fraser Valley — in person and remote.`

### 2. Local — Eyebrow `LOCAL BY DEFAULT`, h2 `Most consultants serve Abbotsford from somewhere else.`
- Para 1: `I'm the other way around — based here, serving Vancouver and the rest of the Fraser Valley from here.`
- Para 2: `For you that means real meetings when the problem is easier to show than describe, and someone who understands that a feed schedule, a crew dispatch board, or a farm-gate storefront is not the same problem as a downtown startup's app.`

### 3. Ops — Eyebrow `BUILT FOR HOW BUSINESSES HERE RUN`, h2 `Deep operations, thin IT.`
- Lead: `Abbotsford businesses tend to have decades of process knowledge held together by spreadsheets, whiteboards, and one overloaded office manager.`
- Body: `That's exactly the gap I fill: purpose-built tools that fit the operation you already have, instead of forcing your operation into someone's off-the-shelf software.`
- Body: `I'm currently building operational software for a local feed business — replacing paper-and-spreadsheet workflows with web tools their team uses daily.`

### 4. Promise — Eyebrow `HOW IT WORKS`, h2 `The same promise, closer to home.`  (4-item list)
1. `Discovery call (or coffee) first — you talk, I listen.`
2. `You'll know what it costs before I start building.`
3. `Plain words the whole way. Not fewer details — clearer ones, so every decision is genuinely yours.`
4. `After launch you've got a person ten minutes away, not a ticket queue.`

### 5. Make — Eyebrow `WHAT I BUILD`, h2 `Three ways I help, right here.`  (3× ServiceCard, headingLevel=3)
- Card 1 — eyebrow `Win more customers`, title `Web`, body `The site that earns their trust and the custom tools that run your day — booking, tracking, dashboards, portals.`, link `Web development →`
- Card 2 — eyebrow `Get hours back, every week`, title `Automations`, body `The tools you already use, wired together so data moves itself — no copy-pasting, no forgotten follow-ups.`, link `Automations →`
- Card 3 — eyebrow `The judgment work, handled`, title `AI`, body `Straight answers on where AI pays off — then it works inside your workflow: reading, sorting, drafting, summarizing.`, link `Practical AI →`

### 6. Final CTA — Eyebrow `GET IN TOUCH`, h2 `Got a business in Abbotsford and a problem that smells like software?`
- Lead: `Tell me what you're trying to do. If there's a solution that saves you time or money, I'll tell you what it'd take. If there isn't, I'll tell you that too.`
- CTAs: `Book a call` · `Email me`

---

## Chrome (both pages)
- Header + Footer = existing BaseLayout chrome (SiteHeader/SiteFooter) — already responsive. Nav unchanged (no active state on these pages; "Services" nav link still anchors `/#services`).
- Footer: brand + `On your wavelength.` + blurb + links + `© 2026 Joel Shinness` · `contact@joelshinness.com · GitHub`.
