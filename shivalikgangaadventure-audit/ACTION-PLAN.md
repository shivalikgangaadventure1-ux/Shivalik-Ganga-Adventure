# Action Plan — Shivalik Ganga Adventure SEO Re-Audit

Priorities: **Critical** (blocks indexing/launch or a real bug) → **High** (fix within 1 week) → **Medium** (fix within 1 month) → **Low** (backlog). Items already resolved live during this re-audit are listed first for visibility, not as pending work.

---

## Fixed Live During This Re-Audit (no action needed)

- [x] `TouristTrip.image` in `lib/schema.ts` was a relative path, not an absolute URL, on all 5 package pages and both `ItemList` instances. *(schema.md)*
- [x] Homepage "Achievements" stat said "8 Rafting Routes", contradicting the real 5-package catalog. *(geo.md, local.md — caught independently by both)*
- [x] Blog posts had visible FAQ content but no `FAQPage` schema. Now parsed directly from each post's markdown at build time, no content duplication. *(content.md, sxo.md — caught independently by both)*
- [x] Scroll-triggered card animations ignored `prefers-reduced-motion`. Fixed sitewide via `MotionConfig reducedMotion="user"` in `app/layout.tsx`. *(visual.md)*
- [x] Hero/page-banner images were missing the `fetchPriority="high"` attribute Lighthouse checks for (`priority` alone doesn't set it in this Next/React version). Fixed on the true LCP candidates in `Hero.tsx`, `PageHero.tsx`, and the blog post cover image. Also removed the header logo's accidental preload contention with the real hero image. *(performance.md)*

---

## Phase 1: High Priority (this week)

- [ ] **Re-run Lighthouse against the fetchPriority fix** to confirm the homepage LCP regression (4.35s "Poor") is resolved, and check whether the `/packages` CLS 0.109 finding reproduces or was measurement noise (the logo already uses the CLS-safe width/height-attribute pattern, so font-swap is the more likely cause). *(performance.md)*
- [ ] Expand homepage copy (currently ~280 words, floor ~500) and the 3 blog posts (682–799 words, floor 1,500) further — real depth work, not filler. *(content.md)*
- [ ] Age/fitness/family-suitability copy on the `/packages` comparison table is only spelled out for the Brahmpuri row; add it for the other 4 packages too. *(sxo.md)*
- [ ] Add a named second contributor or an author bio/archive page — right now all 3 blog posts share one byline, capping perceived editorial breadth. *(content.md)*

## Phase 2: Medium Priority (this month)

- [ ] Add a `Sitemap:` directive to `robots.txt` — independent of the `Disallow: /` rule (which stays as-is per your standing instruction not to touch it), this is just a pointer with no effect on the current block. Flagging rather than changing it myself since it touches the file you asked me not to modify. *(technical.md, sitemap.md)*
- [ ] Add `Strict-Transport-Security` (HSTS) to the security headers in `next.config.ts` — not currently set explicitly, shouldn't be assumed to come free from hosting. *(technical.md)*
- [ ] Replace the remaining Unsplash-hotlinked images (the `/packages` hero banner, all 3 blog cover images) with self-hosted photography — still contributing directly to LCP on those pages. You previously deferred this once already since those were placeholder photos anyway; worth revisiting now that most other photography is real. *(performance.md)*
- [ ] Investigate the invisible-but-focusable mobile booking bar reported in the desktop DOM (`MobileBookingBar.tsx`, `lg:hidden`) — the CSS pattern used is standard and should already remove it from the tab order in a real browser, so this may be a testing-tool artifact; worth a manual keyboard-tab check on a real desktop browser before changing anything. *(visual.md)*
- [ ] Wrap the `SportsActivityLocation.logo` field in a proper `ImageObject` (currently a bare URL string) — cosmetic, not a validation error. *(schema.md)*
- [ ] Diversify blog cover images beyond generic stock photography once real trip photos are available. *(content.md)*

## Phase 3: Low / Backlog

- [ ] Sitemap `lastmod` is identical build-time timestamp for all 17 URLs; blog frontmatter already has real per-post `updatedAt` dates that could be wired in. *(sitemap.md)*
- [ ] Bottom copyright-bar footer links (Terms/Privacy in the legal strip) are still 16px tall, under the 44-48px guidance — the main footer columns were already fixed to 32px. *(visual.md)*
- [ ] Gallery `alt` text is still generic ("rafting moment 1") rather than route/rapid-specific — same carryover from the original audit, still blocked on not having real per-photo context. *(geo.md, technical.md)*
- [ ] Blog H2s are mostly declarative, not question-phrased — reformatting 1-2 per post would align better with AI Overview-style query matching. *(geo.md)*
- [ ] `COMPANY.url` in `constants/config.ts` is a hardcoded string, not environment-driven — fine today, just means no staging-domain flexibility if that's ever needed. *(sitemap.md)*
- [ ] Distinguish header vs. footer navigation landmarks with `aria-label` for assistive tech (duplicate link labels in both). *(visual.md, carryover)*

## Deferred — waiting on you or external state (unchanged from before)

- `robots.txt` Disallow removal, AI-crawler allowlist, meta-robots `noindex,nofollow` removal — still your explicit call, no bots yet.
- GBP claim/verification, 5-decimal geo precision, Place-ID map embed — waiting on you to set up GBP and share details.
- Testimonial authenticity sign-off and `Review`/`AggregateRating` schema — held per your memory note until you confirm the 3 testimonials are real people.
- Real Uttarakhand Tourism registration number and insurance details on `/about` — currently plausible placeholder, flagged for you to swap in real figures before launch.
- Review-generation workflow, directory registrations (TripAdvisor/JustDial/etc.), IndexNow — operational/external, not code, or pointless while indexing is blocked.
