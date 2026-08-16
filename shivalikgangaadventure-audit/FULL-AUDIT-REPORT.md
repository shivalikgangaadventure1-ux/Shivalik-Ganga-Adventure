# SEO Audit — Shivalik Ganga Adventure (Re-Audit)

**Audited environment:** `http://localhost:4100` (local Next.js production build, `npm run start`)
**Eventual production domain:** `https://www.shivalikgangaadventure.com` (does not resolve yet — pre-launch, no domain yet)
**Audit date:** 2026-08-15 (re-audit, same day as the original audit, after a major round of fixes and a full package-catalog restructure)
**Business type:** Local Service — river rafting & adventure tourism operator, Rishikesh, Uttarakhand, India
**Pages audited:** 17/17 (from `/sitemap.xml`) — home, packages index + 5 route pages, destinations, gallery, about, blog index + 3 posts, contact, privacy, terms
**Scope note:** The site is still intentionally blocked from indexing (`robots.txt: Disallow: /`, sitewide `noindex, nofollow`) — an explicit, ongoing client decision (no production domain yet, doesn't want bots on the site yet). Every specialist audit below excludes this from scoring, the same way the original audit did.

---

## Overall SEO Health Score: 81 / 100 — Good (Pre-Launch)

**Up from 65/100 in the original audit**, 18 points higher.

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 91/100 | 20.0 |
| Content Quality | 23% | 70/100 | 16.1 |
| On-Page SEO | 20% | 82/100 | 16.4 |
| Schema / Structured Data | 10% | 91/100 | 9.1 |
| Performance (CWV) | 10% | 88/100 | 8.8 |
| AI Search Readiness (GEO) | 10% | 68/100 | 6.8 |
| Images | 5% | 78/100 | 3.9 |
| **Total** | **100%** | | **~81/100** |

**Supplementary scores** (not in the core weighting):
- Sitemap structure: **85/100** (up from 82)
- Local SEO readiness: **48/100** (up from 46 — still structurally capped pre-launch by no GBP/reviews/citations)
- Search Experience (SXO): `/packages` 77/100 (up from 59, now the strongest page), blog 75/100 (up from 50), package detail 75/100 (up from 68), home 68/100 (unchanged)

**Read this first:** every category improved, several substantially. Technical (82→91) and Schema (74→91) are now genuinely strong. The two biggest remaining drags are the same two the original audit called out — **Content Quality** (still below its QRG floors on the homepage and blog posts despite real expansion work) and **AI Search Readiness/GEO** (structurally capped by the deliberate crawl block, plus a few residual extraction gaps). Local SEO remains low by definition pre-launch (GBP/reviews/citations can't exist yet) — that's expected, not a defect.

---

## What Changed Since the Original Audit

This re-audit ran after a large round of work: the entire package catalog was replaced with 5 real client-supplied routes (Brahmpuri, Club House, Shivpuri, Marine Drive, Kaudiyala, all "to Nim Beach", replacing 6 placeholder routes "to Rishikesh"); all real client photography was wired in (hero, packages, destinations, new logo); `TouristTrip`/`Offer` schema was added to every package page; the homepage/`/packages` `ItemList` split was fixed; the blog's malformed image field was fixed; FAQ answers were made permanently visible in the DOM; a `/packages` comparison table and decision-support copy were added; security headers, `/llms.txt`, and a licensing/insurance section on `/about` were added; and testimonials were rewritten to sound genuinely human with a neutral icon avatar.

**5 additional issues were found and fixed live during this re-audit**, on top of everything above:
1. `TouristTrip.image` (schema.ts) used a relative path instead of an absolute URL, on all 5 package pages and both `ItemList` instances — fixed.
2. The homepage "Achievements" stat still said **"8 Rafting Routes"**, contradicting the actual 5-package catalog (caught independently by both the `geo` and `local` audits) — fixed.
3. Blog posts have visible FAQ content but no `FAQPage` schema, unlike package pages which already do this correctly (caught independently by both the `content` and `sxo` audits) — fixed by parsing the FAQ section directly out of each post's markdown at build time (single source of truth, no content duplication).
4. Scroll-triggered entrance animations (package/destination/testimonial cards) didn't respect the OS-level `prefers-reduced-motion` setting — fixed sitewide via `MotionConfig reducedMotion="user"`.
5. Hero and page-banner images had the `priority` prop but were missing the `fetchPriority="high"` attribute Lighthouse actually checks for (this Next.js/React version doesn't auto-derive one from the other) — fixed on the true LCP candidates; also removed accidental preload contention where the header logo's own `priority` flag was competing with the real hero image.

---

## Category Details

Full findings, evidence, and generated code fixes for each category are in `findings/` (all freshly regenerated this pass):

| File | Score | Summary |
|---|---|---|
| [`technical.md`](findings/technical.md) | 91/100 | All 5 security headers confirmed live via curl. Previously-flagged missing alt text resolved. Remaining gaps: CSP still needs `unsafe-inline`/`unsafe-eval` for Next.js hydration (documented tradeoff), no HSTS in `next.config.ts`, `robots.txt` still has no `Sitemap:` line. |
| [`content.md`](findings/content.md) | 70/100 | Up from 38. Stat counters, pricing, and comparison table all verified working. Homepage (280 words) and all 3 blog posts (682–799 words) still sit below QRG floors (500/1,500) despite real expansion. No `AggregateRating`/`Review` schema (correctly withheld pending real testimonials). |
| [`schema.md`](findings/schema.md) | 91/100 | Up from 74. All 8 previously-recommended fixes individually re-verified as genuinely live. One real defect found and fixed (relative-path `TouristTrip.image`). |
| [`sitemap.md`](findings/sitemap.md) | 85/100 | Up from 82. Exactly 17 URLs, no stale slugs, all 200. `robots.txt` still missing a `Sitemap:` directive (independent of the `Disallow:` gate). `COMPANY.url` is a hardcoded string, not env-driven — works today, no staging flexibility if that's ever needed. |
| [`performance.md`](findings/performance.md) | Lab: 83–96/100 per page | Logo fix confirmed: 86.8KB → 8.8KB. **New regression found:** homepage LCP dropped into "Poor" (4.35s) — root-caused to the header logo's own `priority` flag competing with the real hero image for preload priority; fixed live (see above), worth re-measuring. `/packages` CLS 0.109 flagged, likely font-swap-related rather than a real logo-layout defect (the logo already uses the CLS-safe width/height-attribute pattern) — worth a fresh measurement to confirm. |
| [`visual.md`](findings/visual.md) | — | Both prior High-severity issues (tap targets, footer links) confirmed fixed. New logo lockup renders correctly at both viewports with no overflow. Investigated and resolved a suspected "blank sections" bug as a screenshot-methodology artifact (scroll-triggered animations, not a real content/rendering defect) — but surfaced a genuine `prefers-reduced-motion` gap, fixed live. |
| [`geo.md`](findings/geo.md) | 68/100 | Up from 56. All 3 previously-fixed GEO issues (FAQ DOM visibility, price-in-prose, comparison table) individually re-verified via raw HTML + trafilatura re-extraction. |
| [`local.md`](findings/local.md) | 48/100 | Up from 46. Maps embed on `/about` confirmed, licensing section confirmed (still placeholder figures, flagged once). Still capped pre-launch by no GBP/reviews/citations, as expected. |
| [`sxo.md`](findings/sxo.md) | 77/59/75/68 → up from 59/68/50/68 | All 4 previously-recommended schema/copy fixes confirmed landed. `/packages` moved from the weakest page in the original audit to the strongest this pass. New finding: blog's FAQ content lacked schema (now fixed, see above). |

---

## Methodology

- All 17 pages fetched directly against a local `npm run start` production build; `robots.txt`'s `Disallow: /` was bypassed per the same standing authorization as the original audit (staging/local build, pre-launch).
- No Google API credentials or paid backlink API keys configured — same limitation as the original audit; performance findings are Lighthouse lab-only, backlink analysis was not run (zero backlink history pre-launch, nothing to measure).
- No DataForSEO or Firecrawl MCP available this session.
- 9 specialist sub-audits ran in parallel (technical, content, schema, sitemap, performance, visual, geo, local, sxo); several needed a follow-up nudge mid-run before writing their final report — all 9 are confirmed genuinely completed and current as of this document.
