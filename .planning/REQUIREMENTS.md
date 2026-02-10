# Requirements: Joel Shinness Website v1.3

**Defined:** 2026-02-10
**Core Value:** Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.

## v1.3 Requirements

Requirements for Design System & Navigation Cleanup milestone. Each maps to roadmap phases.

### Design System Reference Page

- [ ] **DS-01**: Internal design system page exists at /design-system (hidden from nav, noindex)
- [ ] **DS-02**: User can view all Button variants (primary, secondary, turquoise, disabled states)
- [ ] **DS-03**: User can view all Card variants with different content types
- [ ] **DS-04**: User can view all Input variants (text, email, textarea)
- [ ] **DS-05**: User can view Badge component with all color variants
- [ ] **DS-06**: User can view OKLCH color palette with hex/oklch values for light and dark modes
- [ ] **DS-07**: User can view typography scale (Bricolage Grotesque headings, DM Sans body)
- [ ] **DS-08**: User can view isometric utilities documentation (iso-shadow, iso-glow, iso-rotate)
- [ ] **DS-09**: User can view shadow-to-glow dark mode transformation examples

### Navigation Cleanup

- [ ] **NAV-01**: Header contains only Blog, Projects, FAQ, Contact links (homepage section links removed)
- [ ] **NAV-02**: /contact page redirects to /#contact (meta refresh for static hosting)
- [ ] **NAV-03**: Footer FAQ standalone link removed
- [ ] **NAV-04**: Footer contains subtle navigation links mirroring header (Blog, Projects, FAQ, Contact)
- [ ] **NAV-05**: Footer contains Instagram social icon with placeholder URL
- [ ] **NAV-06**: Footer contains Substack social icon with placeholder URL
- [ ] **NAV-07**: All social icons have aria-labels and 44x44px touch targets

### Component Consistency Audit

- [ ] **AUDIT-01**: All pages reviewed for one-off styling inconsistencies
- [ ] **AUDIT-02**: Inconsistent elements migrated to design system components
- [ ] **AUDIT-03**: Audit findings documented with severity tiers (CRITICAL/HIGH/MEDIUM/LOW)

### Contact Form Enhancement

- [ ] **FORM-01**: Contact form best practices researched for freelance developer lead generation
- [ ] **FORM-02**: Contact form fields optimized based on research findings
- [ ] **FORM-03**: Contact form submits to n8n webhook (placeholder URL, configurable)
- [ ] **FORM-04**: Form submission includes success/error feedback to user

## Future Requirements

Deferred to v1.4+. Tracked but not in current roadmap.

### Design System Enhancements

- **DS-10**: Interactive component demos with state changes (hover, focus, active)
- **DS-11**: Component usage guidelines ("when to use" notes)
- **DS-12**: Copy-pasteable code snippets with syntax highlighting

### Content & Polish

- **CONT-01**: Testimonials section with client quotes
- **CONT-02**: Newsletter signup integration
- **CONT-03**: Animated hover states for isometric illustrations
- **CONT-04**: Real project screenshots (replace placeholders)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Storybook integration | 4 components don't justify 50+ dependencies and maintenance overhead |
| Multi-page design system site | Single scrollable page sufficient for 4 components + tokens |
| Public design system documentation | Internal reference only, not building public component library |
| Mega footer with all links | Violates neobrutalist minimalism, too many choices |
| Real-time component editing playground | Requires code editor UI, significant dev time for small benefit |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | TBD | Pending |
| DS-02 | TBD | Pending |
| DS-03 | TBD | Pending |
| DS-04 | TBD | Pending |
| DS-05 | TBD | Pending |
| DS-06 | TBD | Pending |
| DS-07 | TBD | Pending |
| DS-08 | TBD | Pending |
| DS-09 | TBD | Pending |
| NAV-01 | TBD | Pending |
| NAV-02 | TBD | Pending |
| NAV-03 | TBD | Pending |
| NAV-04 | TBD | Pending |
| NAV-05 | TBD | Pending |
| NAV-06 | TBD | Pending |
| NAV-07 | TBD | Pending |
| AUDIT-01 | TBD | Pending |
| AUDIT-02 | TBD | Pending |
| AUDIT-03 | TBD | Pending |
| FORM-01 | TBD | Pending |
| FORM-02 | TBD | Pending |
| FORM-03 | TBD | Pending |
| FORM-04 | TBD | Pending |

**Coverage:**
- v1.3 requirements: 23 total
- Mapped to phases: 0
- Unmapped: 23

---
*Requirements defined: 2026-02-10*
*Last updated: 2026-02-10 after initial definition*
