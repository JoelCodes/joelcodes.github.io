4. All dev-hidden pages are verified absent from the production sitemap in a local `npm run build` + `grep` check before the phase branch is merged.

**Plans:** 5 plans

Plans:
**Wave 1** (parallel — frame drafting + 404/config, no file overlap)

- [x] 39-01-PLAN.md — Draft Figma frames 85:103 + 85:104 (@1440/390) via use_figma [manual/Figma] [PAGE-03, PAGE-04]
- [x] 39-02-PLAN.md — 404 page (locked copy) + sitemap filter (/services/, /areas/) + 404 axe spec [PAGE-05, IA-02]

**Wave 2** (hard checkpoint — gates service/area build)

- [x] 39-03-PLAN.md — HARD CHECKPOINT: Joel approves drafted frames [checkpoint] [PAGE-03, PAGE-04]

**Wave 3** (blocked on frame approval)

- [ ] 39-04-PLAN.md — Extract 85:103/85:104 + build /services/web + /areas/abbotsford (noindex head-slot, ProfessionalService JSON-LD, wl/ composition, NO PROD redirect) + axe specs + contrast pairs [PAGE-03, PAGE-04, IA-02]

**Wave 4** (verification + fidelity gate)

- [ ] 39-05-PLAN.md — Verification gate (build + sitemap/JSON-LD/noindex grep + a11y) + fidelity screenshots + Joel approval [checkpoint] [PAGE-03, PAGE-04, PAGE-05, IA-02]

---
