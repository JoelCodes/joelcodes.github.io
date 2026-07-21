# Architecture Research

**Domain:** Static portfolio site — parallel component library migration (Astro 5 + Tailwind CSS 4)
**Researched:** 2026-05-14
**Confidence:** HIGH (based on direct codebase inspection, no speculative claims)

---

## Standard Architecture

### Current System Overview (v1.3 baseline)

```
┌─────────────────────────────────────────────────────────────────┐
│                        Pages (file-based routing)                │
│  index.astro  projects/  blog/  faq.astro  thank-you.astro       │
│  design-system.astro     design-system.json.ts (GET endpoint)    │
├──────────────────────┬──────────────────────────────────────────┤
│   Layout Shell        │         Feature Components               │
│  BaseLayout.astro     │  Hero  Services  Process  About          │
│    ↳ Header           │  ContactSection  ProjectCard  BlogCard   │
│    ↳ Footer           │  FAQ  TableOfContents  illustrations/    │
│    ↳ SEO              │  homepage/  (page-scoped sections)        │
├──────────────────────┴──────────────────────────────────────────┤
│                    Design System Primitives                       │
│         src/components/ui/                                        │
│   Button   Card   Input   Badge   CheckboxGroup                   │
├─────────────────────────────────────────────────────────────────┤
│                    Style Foundation                               │
│   src/styles/global.css — @theme block (Tailwind v4 tokens)      │
│   OKLCH palette  |  neo-spacing tokens  |  font families          │
│   @layer utilities — shadow-neo-*  iso-shadow-*  iso-glow-*       │
├─────────────────────────────────────────────────────────────────┤
│                  Content / Data                                   │
│   src/content/blog/*.mdx  (Zod content collections)              │
│   src/data/projects.json  (static JSON, imported directly)       │
└─────────────────────────────────────────────────────────────────┘
```

### v1.4 Target State

```
┌─────────────────────────────────────────────────────────────────┐
│                        Pages (unchanged routing)                 │
│  (same URLs — migration is component-swap, not route change)      │
├──────────────────────┬──────────────────────────────────────────┤
│   v2 Layout Shell     │       v2 Feature Components              │
│  BaseLayoutV2.astro   │   (new sections factored from Crito)     │
│    ↳ HeaderV2         │   (old section components replaced 1:1)  │
│    ↳ FooterV2         │                                          │
├──────────────────────┴──────────────────────────────────────────┤
│              v2 Design System Primitives                         │
│         src/components/v2/                                        │
│  (new components — named for function, not versioned internally)  │
├──────────────────────┬──────────────────────────────────────────┤
│  v1 primitives (ui/) │   v2 tokens (styles/v2.css @theme block) │
│  REMAIN INTACT until │   loaded via BaseLayoutV2 import          │
│  each page migrates  │                                           │
├──────────────────────┴──────────────────────────────────────────┤
│                  Content / Data (unchanged)                      │
│   src/content/blog/*.mdx  |  src/data/projects.json             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Decision 1: v2 Component Library Structure

**Recommendation: `src/components/v2/` as a flat namespace**

The four options evaluated:

| Option | Assessment |
|--------|------------|
| `src/components/v2/ui/*` (mirror v1) | Carries v1 naming assumptions into v2. The new library should not be constrained to Button/Card/Input/Badge as its primitive set — Crito may call for different component shapes. |
| `src/components/ui/` + `src/components/agency/*` | Splits by concept but requires agreeing upfront on what's "agency" vs generic. Creates ambiguity and forces premature classification. |
| `src/design-system/v2/*` | Separates design from feature components cleanly but adds a new root-level source tree. Astro has no special behavior for this path — it's just indirection. |
| Module aliasing in tsconfig.json (`@v2/*`) | Useful supplement, not a structure strategy. Aliases help imports but don't decide where files live. |

**Chosen: `src/components/v2/`** with internal subdirectories matching function, not v1 structure:

```
src/components/v2/
├── layout/              # HeaderV2.astro, FooterV2.astro, BaseLayoutV2.astro
├── ui/                  # New primitives (Button, Card, etc. — but new API shapes)
├── sections/            # Full-page sections (Hero, Services, Process, etc.)
└── (no deeper nesting)  # Flat within each subdir — solo dev does not need hierarchy
```

**Rationale:**
- The `v2/` prefix is a temporary namespace signal that disappears when v1 is deleted — nothing about v2's internal organization needs to say "v2". `layout/`, `ui/`, `sections/` are stable functional names that survive the deletion of the v1 tree.
- Mirroring v1's structure is safe because the functional grouping (layout vs ui vs feature sections) maps naturally regardless of visual style. If v2's primitives have different names, that's fine — the folder says "these are primitives", not "these are Button/Card/Input/Badge."
- Flat within each subdirectory matters for a solo developer. `src/components/v2/ui/buttons/interactive/Button.astro` is not better than `src/components/v2/ui/Button.astro`.
- tsconfig path aliases (`@v2/ui/Button`) are a nice addition once the directory exists but are optional — Astro resolves relative imports reliably and the site is small enough that relative paths are legible.

**What to name v2 components internally:** Use functional names, not `*V2` suffix names. `Header.astro` inside `v2/layout/` is unambiguous by path. Reserve `*V2` suffix only for the `BaseLayout` case (see Decision 7).

---

## Decision 2: Design Token Coexistence

**Recommendation: Separate `src/styles/v2.css` file with its own `@theme` block, imported in `BaseLayoutV2.astro`**

The four options evaluated:

| Option | Assessment |
|--------|------------|
| Separate `/styles/v2.css` with `@theme` block, imported in `BaseLayoutV2` | Clean isolation. v1 and v2 tokens never share a file. v1 pages keep loading `global.css` only. v2 pages load `v2.css` only (via `BaseLayoutV2`). No collision risk. |
| Prefixed tokens (`--v2-color-*`) in `global.css` | Works but pollutes global.css permanently. The "v2" prefix has no meaning after migration — you'd need a cleanup pass to rename every token after deletion. Creates search-and-replace debt. |
| CSS layer ordering (`@layer v1, v2` with v2 winning) | The existing `global.css` does not use `@layer` for tokens (they're in `@theme`). Tailwind v4's `@theme` is not a cascade layer — it generates CSS custom properties on `:root`. Layer ordering does not solve token naming conflicts. |
| Single global.css with theme switching at `:root` | Forces both token sets to coexist in the same file during the entire transition. The risk of accidental cross-pollination is high (a stray `var(--color-yellow)` in a v2 component would silently resolve to v1's yellow). |

**Chosen: Separate `src/styles/v2.css`** with this structure:

```css
/* src/styles/v2.css */
@import "tailwindcss";

@theme {
  /* New brand tokens — no --v2- prefix needed, scoped by file */
  --color-primary: ...;
  --color-surface: ...;
  --font-sans: ...;
  /* etc. */
}
```

`BaseLayoutV2.astro` imports `v2.css` instead of `global.css`. v1 pages continue using `BaseLayout.astro` which imports `global.css`. The two CSS files never load on the same page during transition.

**The key constraint this solves:** v1 components (`src/components/ui/Button.astro`) use `var(--color-yellow)`, `var(--color-turquoise)` etc. in their scoped `<style>` blocks. If a v2 page accidentally imports both CSS files, those vars would still resolve from `global.css` tokens and v1 components would look right — but v2 components expecting new token names would also find their tokens. The separation by `BaseLayout` variant ensures each page has exactly one token set loaded.

**Consequence:** `global.css` is NOT modified during v1.4. All v2 tokens go into `v2.css`. v1.3 tokens are deleted when `global.css` is removed after full migration.

---

## Decision 3: Page Migration Order

**Recommendation: Design tokens → v2 primitives → leaf pages → layout shell last**

The critical insight from the current codebase: Header and Footer are imported by every page through `BaseLayout.astro`. Migrating them first would require either (a) all pages to use v2 layout simultaneously (big-bang) or (b) maintaining two layouts anyway. The dual-layout strategy already handles this — so the seam is `BaseLayout`, not `Header`/`Footer` individually.

**Recommended sequence:**

```
Phase A — Foundation (no visible pages change)
  1. Pencil design system .pen file authored
  2. v2.css token file created (colors, type, spacing)
  3. src/components/v2/ skeleton created
  4. BaseLayoutV2.astro created (imports v2.css, uses v2 Header/Footer)
  5. v2 Header, Footer, primitives built

Phase B — Leaf pages (each independently shippable)
  6. /design-system — lowest public traffic, highest benefit for build reference
     (rebuilding this first gives a live reference for all subsequent pages)
  7. /faq — simplest page structure (accordion + static copy), ideal pattern test
  8. /thank-you — trivially short, zero form behavior to preserve
  9. /blog/[slug] — blog post layout (prose + ToC, no dynamic data)
  10. /blog/index — blog index + tag filtering
  11. /blog/tags/[tag] — shares blog index components, should follow immediately
  12. /projects/[slug] — project detail (static data, heaviest content)
  13. /projects/index — project listing + filters
  14. /404 — isolated, no layout risk

Phase C — Homepage (largest page, most sections, highest risk)
  15. Homepage sections built individually (Hero, Services, Process, etc.)
  16. Homepage assembled and shipped

Phase D — Cleanup
  17. v1 components deleted (src/components/ui/, layout/, etc.)
  18. global.css deleted
  19. BaseLayout.astro deleted (or renamed to point to v2)
  20. CLAUDE.md and design-system.json.ts updated
```

**Rationale for this order:**
- `/design-system` first gives a live artifact for comparison during all subsequent page builds. It's also the safest page to experiment on (noindex, internal-only).
- `/faq` and `/thank-you` are short enough to serve as pattern validation before touching complex pages.
- Blog pages before Projects — blog has more surface area (ToC, prose, tag filtering) but its data pipeline (content collections) is simpler than understanding how v2 Cards render projects.
- Homepage last — it has the most sections and the highest business risk (it's the primary lead-gen page). By the time you reach it, every component pattern is proven.
- Header/Footer migrate as part of `BaseLayoutV2` in Phase A, not as standalone migrations. They never exist in a partially-migrated state visible to users.

---

## Decision 4: Pencil File Architecture

**Recommendation: One `design-system.pen` file + one file per page that imports it**

The Crito reference has 15 page frames and zero factored components. The v1.4 work involves factoring components ourselves from those frames. Two approaches:

| Approach | Assessment |
|----------|------------|
| Single `design-system.pen` with everything | Becomes unwieldy. A single file with tokens, components, AND all 15 page frames is a navigability problem in Pencil's canvas. |
| Per-page `.pen` files importing the design system | Standard component library practice. Each page frame stays in a focused file. The design system file stays small (tokens + reusable components only). |

**Recommended file structure in `design/`:**

```
design/
├── Consulting & Agency Website Template I Crito (Community).pen  # reference (read-only)
├── design-system.pen        # tokens + reusable components ONLY
├── pages/
│   ├── home.pen             # Homepage frames
│   ├── projects.pen         # Projects index + detail
│   ├── blog.pen             # Blog index + post + tag
│   ├── faq.pen              # FAQ
│   ├── contact.pen          # Contact form section (or embedded in home.pen)
│   ├── thank-you.pen        # Thank-you page
│   └── design-system.pen    # Design system reference page design
└── images/                  # Existing — reference images from Crito export
```

**`design-system.pen` contents:**
- Variable definitions: color primitives, semantic aliases, spacing scale, type scale
- Reusable component frames: Button (variants), Card, Input, Badge, Nav, Footer
- No page compositions — those live in `pages/*.pen`

**Dark mode:** Declare the variable structure for light/dark but do not author dark mode variants in v1.4. Use Pencil variables with a "light" mode only. Mark the dark token slots with placeholder values and a comment. This preserves the structure for v1.5 without cluttering the v1.4 deliverable.

---

## Decision 5: Image Asset Organization

**Recommendation: `src/assets/images/` with Astro image optimization**

| Option | Assessment |
|--------|------------|
| `/public/images/` | No optimization. Images served as-is. Fine for small SVGs and favicons, wrong for photography. |
| `src/assets/` | Astro's `<Image />` component and `getImage()` process images at build time: WebP conversion, responsive srcsets, lazy loading. This is the correct path for real photography. |
| CDN | Justified only if build times become unacceptable (unlikely for a portfolio site) or if images need to be updated without rebuilds. Not warranted now. |

**Recommendation: `src/assets/images/` organized by page context:**

```
src/assets/images/
├── hero/           # Hero section photography
├── projects/       # Project screenshots and case study images
├── about/          # Profile photo, etc.
└── blog/           # Blog post featured images (currently in content/blog/)
```

**Astro image implications:**
- Use `import` at the component level or in frontmatter, not `/public/` path strings
- `<Image src={imported} alt="..." />` generates `<picture>` with WebP + fallback
- Blog MDX posts can use `featuredImage` as a relative path to `src/assets/` via the content collection schema — the existing `featuredImage: image()` Zod type handles this if defined correctly
- Build performance: Astro caches image transforms between builds (`.astro/` cache directory). First build with large images is slow; incremental builds are fast.

**Design images from Crito reference:** The `design/images/` directory has JPG/PNG exports from the Crito Pencil file. These are reference images, not production assets. Production photography for v1.4 should go in `src/assets/images/`, not `design/images/`.

---

## Decision 6: /design-system Page Architecture

**Recommendation: Keep JSON API + add direct component imports for v2**

The current architecture has two layers:
1. `design-system.json.ts` — GET endpoint at `/design-system.json` (machine-readable token manifest)
2. `design-system.astro` — Human-readable page with live component renders

This separation is good architecture. The JSON endpoint is used by AI coding agents (referenced in CLAUDE.md). It should persist.

**For v2, the options:**

| Option | Assessment |
|--------|------------|
| Keep JSON API pattern only | The JSON has no live renders — agents get spec but no visual reference. |
| Switch to direct component imports + ComponentShowcase | What `design-system.astro` already does. This pattern is correct and should continue. |
| Hybrid (current + v2 additions) | Best choice — extend what exists rather than replace it. |

**Recommended approach:** When migrating `/design-system` in Phase B:
1. Create `design-system-v2.json.ts` with v2 token schema (or update the existing endpoint to describe v2 tokens post-migration)
2. Rebuild `design-system.astro` as a v2 page that imports and renders v2 components via direct import
3. Keep the JSON endpoint as the canonical machine-readable source — just update its token values to describe v2

The `/design-system.json` URL should continue to work and describe whatever the current design system is. After v1.3 components are deleted, it describes v2 tokens.

---

## Decision 7: v1 / v2 Integration Points During Transition

The seams that require explicit management:

### Seam 1: BaseLayout (critical — touches all pages)

**Who owns what:** `BaseLayout.astro` continues to own v1 pages. `BaseLayoutV2.astro` owns v2 pages. They are separate files. No page uses both simultaneously.

**Conflict risk:** None at file level. The only risk is a developer accidentally importing the wrong layout.

**Management:** Name convention is the guard. `BaseLayout.astro` → v1. `BaseLayoutV2.astro` → v2. After all pages migrate, rename `BaseLayoutV2.astro` to `BaseLayout.astro` (or update all import paths) and delete the old one.

### Seam 2: Header and Footer (shared by all pages via BaseLayout)

**During transition:** v1 Header/Footer live in `src/components/layout/`. v2 versions live in `src/components/v2/layout/`. They do not share any code.

**Conflict risk:** None — the layout file determines which header/footer is loaded. A v1 page gets v1 header; a v2 page gets v2 header.

**Visual concern:** During transition, the site will have pages with mixed visual styles (some v1, some v2). This is acceptable for a personal portfolio where visitors are unlikely to notice incremental changes across sessions.

### Seam 3: Global Styles (Tailwind token sets)

**During transition:** Each page loads exactly one CSS file — `global.css` (for v1 pages via `BaseLayout.astro`) or `v2.css` (for v2 pages via `BaseLayoutV2.astro`). Tailwind v4's `@tailwindcss/vite` plugin processes both files; each generates its own CSS bundle.

**Conflict risk:** Class name collisions if v2 tokens reuse Tailwind utility names that v1 also uses. For example, if v2 defines `--color-yellow` with a new value, any v1 component that uses `text-yellow` on a v2 page would pick up the wrong value. 

**Mitigation:** v2 should use different token names for v2 brand colors (e.g. `--color-brand`, `--color-surface`, semantic names rather than color names). This eliminates the shared-name risk entirely. The neobrutalist palette used names like `--color-yellow`, `--color-turquoise` — a professional agency palette would naturally use names like `--color-primary`, `--color-accent`, `--color-neutral-*` anyway.

### Seam 4: Astro Content Collections (transparent to migration)

Blog MDX posts use frontmatter schema defined in `content.config.ts`. Nothing about the v2 component library changes the content schema — `title`, `description`, `pubDate`, `featuredImage`, `tags` remain valid. Blog post content itself does not reference design system components (standard Markdown prose). No migration required for content files.

### Seam 5: dark mode toggle (v2 removes it)

The current `Header.astro` contains a dark mode toggle button with JavaScript that sets `document.documentElement.classList.toggle("dark", ...)`. `BaseLayout.astro` has an inline `<script is:inline>` that reads `localStorage.theme` and applies the class before render.

v1.4 is light-mode only. `BaseLayoutV2.astro` should omit both the dark mode script and the `.dark` class logic. The `@custom-variant dark` line in `v2.css` can be omitted entirely. This is a clean break — no shared state with v1's dark mode mechanism.

**Risk:** If a v2 page and a v1 page are open simultaneously, localStorage may still carry `theme: "dark"` from a v1 page. v2 pages should be resilient to this by not reacting to the localStorage key at all (simply never read it).

---

## Recommended Project Structure (Post-Migration State)

This is what the project looks like after all pages migrate and v1 is deleted:

```
src/
├── assets/
│   └── images/           # Production photography (src/assets, not public/)
│       ├── hero/
│       ├── projects/
│       └── about/
├── components/
│   ├── v2/               # New component library (name "v2" deleted after cleanup)
│   │   ├── layout/       # HeaderV2, FooterV2 (renamed Header, Footer post-cleanup)
│   │   ├── ui/           # New primitives (Button, Card, etc.)
│   │   └── sections/     # Page sections (Hero, Services, Process, etc.)
│   ├── SEO.astro         # Unchanged — not design-system-dependent
│   └── design-system/    # Internal docs components (TokenSwatch, etc.) — rebuilt for v2
├── content/
│   └── blog/             # MDX posts — UNCHANGED
├── data/
│   └── projects.json     # UNCHANGED
├── layouts/
│   └── BaseLayout.astro  # (was BaseLayoutV2.astro, renamed after v1 deletion)
├── pages/                # UNCHANGED routing
│   ├── design-system.astro
│   ├── design-system.json.ts
│   ├── faq.astro
│   ├── index.astro
│   ├── thank-you.astro
│   ├── blog/
│   └── projects/
└── styles/
    └── v2.css            # (renamed global.css after v1 deletion)
design/
├── design-system.pen     # v2 design system (tokens + components)
└── pages/                # Per-page design files
```

---

## Architectural Patterns

### Pattern 1: Dual Layout Shell

**What:** Two `BaseLayout` variants exist simultaneously. Each page imports exactly one. The CSS file, Header, and Footer are all determined by which layout the page uses.

**When to use:** This is the core migration pattern. Use it for the entire duration of v1.4.

**Trade-offs:** Slight duplication (two layout files), but complete isolation. The alternative (a single layout that conditionally renders v1 or v2 components) would be significantly more complex and fragile.

### Pattern 2: Incremental Page Flip

**What:** Each page migrated becomes a fully v2 page on merge — no half-migrated pages in `main`. Per-page branches are short-lived (one page per PR).

**When to use:** Every page migration. Write the entire page in v2 components, get it to Lighthouse 90+, then merge. Never merge a page that still imports v1 components.

**Trade-offs:** Requires the v2 component library to be feature-complete before migrating each page. Since Phase A builds the library first, this is satisfied.

### Pattern 3: Token-First Development

**What:** Define all v2 CSS custom properties in `v2.css` before building any components. Components reference tokens by semantic name, not raw values.

**When to use:** Always. Do not hard-code OKLCH values in component `<style>` blocks — they must use `var(--color-primary)` etc.

**Trade-offs:** Requires upfront token definition (done in design token phase). Benefit: changing a brand color updates everywhere simultaneously.

---

## Anti-Patterns

### Anti-Pattern 1: Modifying v1 components during v1.4

**What people do:** Notice a bug or inconsistency in a v1 component while building v2, and "fix it while I'm here."

**Why it's wrong:** v1 components are scheduled for deletion. Any work invested in them is wasted. It also muddies the commit history.

**Do this instead:** Log the issue in the roadmap phase notes for context. Fix it in v2 only.

### Anti-Pattern 2: Sharing a BaseLayout during transition

**What people do:** Parameterize `BaseLayout.astro` with a `version` prop that conditionally imports v1 or v2 header/footer.

**Why it's wrong:** Creates a conditional import graph that is hard to reason about and impossible to tree-shake. A page importing `BaseLayout` with `version="v2"` would still have v1 components in the module graph.

**Do this instead:** `BaseLayout.astro` (v1) and `BaseLayoutV2.astro` (v2) are separate files. Pages reference one or the other. Delete `BaseLayout.astro` when the last v1 page migrates.

### Anti-Pattern 3: v2 token names that collide with v1

**What people do:** Reuse token names like `--color-yellow` or `--font-heading` in `v2.css` with new values.

**Why it's wrong:** If a v2 page accidentally imports `global.css` (or vice versa), components will silently pick up the wrong token values. The failure mode is subtle — everything renders, but with wrong colors.

**Do this instead:** v2 uses semantic token names (`--color-primary`, `--color-surface`, `--font-display`) that are distinct from v1's descriptive names (`--color-yellow`, `--font-heading`).

### Anti-Pattern 4: Big-bang Header/Footer migration

**What people do:** Migrate Header and Footer to v2 immediately (they're "simple"), then migrate pages afterwards. Now all v1 pages have v2 header/footer — a mixed visual state everywhere.

**Why it's wrong:** v1 pages were built to match v1 Header. The neobrutalist border style `border-b-[3px] border-text-light` in the current header is tightly coupled to v1's visual language. Swapping the header makes every existing page look broken.

**Do this instead:** v2 Header/Footer only appear on v2 pages, via `BaseLayoutV2`. Build them as part of Phase A but they only become visible as each page migrates.

---

## Data Flow (unchanged by v1.4)

```
Build time:
  content/blog/*.mdx  →  Astro content collections  →  /blog/[slug] pages
  data/projects.json  →  direct import in .astro     →  /projects pages
  src/assets/images/  →  Astro Image pipeline        →  optimized <picture> tags

Request time (static):
  Browser  →  GitHub Pages CDN  →  pre-rendered HTML + inlined CSS
  (no server, no API, no runtime data fetching)

Form submission:
  Contact form  →  n8n webhook (POST)  →  /thank-you redirect
```

---

## Integration Points Summary

| Boundary | Communication | v1.4 Risk | Mitigation |
|----------|---------------|-----------|------------|
| BaseLayout ↔ Pages | Direct import | HIGH — determines token set loaded | Dual layout files; pages explicitly import one |
| global.css ↔ v2.css | Isolated by layout | MEDIUM — token name collision | v2 uses semantic names (no shared token names) |
| v1 ui/ components ↔ v2 pages | Must not cross | HIGH — silent style corruption | Lint rule or PR checklist: v2 pages cannot import from `components/ui/` |
| Header dark mode toggle ↔ v2 pages | localStorage key | LOW — v2 ignores it | BaseLayoutV2 does not read `localStorage.theme` |
| Content collections ↔ components | Blog posts do not import components | NONE | Schema unchanged; MDX is pure prose |
| design-system.json.ts ↔ design-system.astro | JSON endpoint | LOW — internal page | Update endpoint after token migration |

---

## Sources

- Direct inspection of codebase (all files read above)
- Astro 5 documentation pattern: dual layout files for theme switching is standard Astro guidance for A/B layout experiments
- Tailwind CSS v4 `@theme` block: CSS custom properties on `:root`, not cascade layers — isolation via separate import is the correct coexistence strategy

---

*Architecture research for: Joel Shinness Website v1.4 Design Overhaul*
*Researched: 2026-05-14*
