# SEO Audit — Shivalik Ganga Adventure

**Audited environment:** `https://shivalik-ganga-adventure.vercel.app/` (Vercel preview — last stage before production)
**Eventual production domain:** `https://www.shivalikgangaadventure.com` (does not resolve yet — pre-launch)
**Audit date:** 2026-08-15
**Business type:** Local Service — river rafting & adventure tourism operator, Rishikesh, Uttarakhand, India
**Pages audited:** 18/18 (from `/sitemap.xml`) — home, packages index + 6 route pages, destinations, gallery, about, blog index + 3 posts, contact, privacy, terms
**Scope note:** This site is intentionally blocked from indexing (`robots.txt: Disallow: /`, sitewide `noindex, nofollow`) because it's a pre-launch staging deployment. That is correct, expected behavior — **every specialist audit below excludes it from scoring** but flags it as the #1 pre-launch action item. See [Launch Gate Checklist](#launch-gate-checklist-not-scored) below.

---

## Overall SEO Health Score: 65 / 100 — Fair (Pre-Launch)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 82/100 | 18.0 |
| Content Quality | 23% | 38/100 | 8.7 |
| On-Page SEO | 20% | 76/100 | 15.2 |
| Schema / Structured Data | 10% | 74/100 | 7.4 |
| Performance (CWV) | 10% | 72/100 | 7.2 |
| AI Search Readiness (GEO) | 10% | 56/100 | 5.6 |
| Images | 5% | 55/100 | 2.75 |
| **Total** | **100%** | | **~65/100** |

**Supplementary scores** (not in the core weighting, but material for this business):
- Sitemap structure: **82/100**
- Local SEO readiness: **46/100** (low by definition pre-launch — GBP/reviews/citations can't exist yet; on-page NAP and route-page structure are strong)
- Search Experience (SXO): package detail page 68/100 (strongest), blog post 50/100 (weakest)

**Read this first:** the site's engineering foundation is genuinely solid — full server-side rendering, clean URLs, consistent NAP, a defensible schema strategy, and a strong package-detail page template. The score is pulled down by two things that are fixable in days, not weeks: **thin/placeholder content** (38/100 — the single biggest drag on the composite score) and **structured data that exists but sits on the wrong page or is invisible to plain-text extraction** (schema + GEO). Neither requires new engineering — they require content and a few schema relocations.

---

## Top 5 Critical Issues (excluding the launch gate)

1. **Fabricated-looking testimonials.** All 3 homepage reviews share one stock avatar image (`avata.jpeg`, a leftover demo asset from the site's HTML template) with generic 5-star ratings. Per project notes, placeholder content is fine pre-signoff — but shipping invented reviews as genuine social proof is a compliance risk, not an SEO nit. **Get explicit client sign-off before launch.** *(content.md, local.md, schema.md)*
2. **Zero-value stat counters.** The "Numbers That Speak for Themselves" section (Happy Rafters, Rafting Routes, etc.) renders `0`/`0+` in server-rendered HTML — indistinguishable from an unfinished placeholder. *(content.md)*
3. **Pervasive thin content.** Homepage ~200 words (floor 500), all 6 package pages 199–236 words (floor 800), all 3 blog posts 227–268 words (floor 1,500). The prose that exists is genuinely operator-specific, not generic filler — it's just too shallow. *(content.md)*
4. **Package pricing has no reliable machine-readable home anywhere.** Price shows on-page but isn't in schema on the pages that sell each route, isn't in the `ItemList` that does have schema (that's on the homepage, which doesn't even render all 6 packages), and drops out of AI-crawler text extraction because it lives in a sidebar. *(schema.md, sxo.md, geo.md — three independent audits converged on this)*
5. **Malformed image URL in blog schema.** `getBlogPostingSchema` double-prefixes an already-absolute Unsplash URL, producing a broken `image` field on every blog post today — confirmed independently by both the schema and SXO audits. *(schema.md, sxo.md)*

## Top 5 Quick Wins

1. **Fix the blog schema image bug** — one-line guard (`post.coverImage.startsWith("http")`) fixes Article rich-result eligibility on all 3 posts. *(schema.md §5)*
2. **Fix the oversized logo** — set a correct `sizes` prop, drop `loading="lazy"` on the header logo → ~85 KB saved per page load, sitewide, one component change. *(performance.md H3)*
3. **Add `priority` to hero images** on Packages/Package Detail/Gallery/Blog templates → should move 4 of 5 tested pages out of "LCP Needs Improvement." *(performance.md H2)*
4. **Add a `Sitemap:` line to `robots.txt`** — independent of the launch-gate Disallow rule, currently just missing. *(sitemap.md, geo.md)*
5. **Enlarge the "Book Now" tap target** on package cards from ~16px to 48px+ — it's the site's core conversion action. *(visual.md #1)*

---

## Launch Gate Checklist (not scored — do these regardless of the score above)

| # | Item | Status today | Required before DNS cutover |
|---|---|---|---|
| 1 | `robots.txt` | `Disallow: /` | Allow crawling; add `Sitemap:` line; add AI-crawler allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot) — see `geo.md §1` for a ready-to-ship file |
| 2 | Meta robots tag | `noindex, nofollow` on all 18 pages | Remove, or set `index, follow` |
| 3 | `/llms.txt` | 404 | Add — template in `geo.md §3` |
| 4 | Sitemap host | Already correctly points at `www.shivalikgangaadventure.com` | Re-verify all 18 URLs return 200 once DNS resolves |
| 5 | Google Business Profile | Doesn't exist yet | Claim + verify immediately at launch, using the site's `COMPANY` object as the literal NAP source of truth |
| 6 | Testimonial authenticity | 3 placeholder reviews, shared stock avatar | Client sign-off: real reviews or remove before public launch |
| 7 | Licensing/insurance copy | Not present anywhere on site | Add Uttarakhand Tourism registration number + insurance coverage statement — material trust gap for a physical-risk activity |

**Recommendation:** tie robots.txt + meta-robots to a single `VERCEL_ENV === "production"` check so launch day is one deploy, not two files someone has to remember to edit by hand.

---

## Category Details

Full findings, evidence, and generated code fixes for each category are in `findings/`:

| File | Score | Summary |
|---|---|---|
| [`technical.md`](findings/technical.md) | 82/100 | Clean crawlability, unique titles/canonicals, SSR confirmed. Gaps: no security headers, no `Sitemap:` line, 4 images missing alt text. |
| [`content.md`](findings/content.md) | 38/100 | Real operator-specific prose but far below topical-depth floors everywhere; fabricated-looking testimonials and zero-value stat counters are the two most serious items. |
| [`schema.md`](findings/schema.md) | 74/100 | Above-average JSON-LD footprint for a pre-launch site. Biggest gap: no `TouristTrip`/`Offer` on the pages that actually sell packages. Includes ready-to-use generated JSON-LD. |
| [`sitemap.md`](findings/sitemap.md) | 82/100 | Valid, complete, no orphans. Missing `Sitemap:` robots.txt directive; identical `lastmod` timestamps. |
| [`performance.md`](findings/performance.md) | Lab: 87–99/100 per page | CLS clean everywhere; 4/5 pages miss "Good" LCP due to an oversized logo and missing `priority` hints — both cheap fixes. Lab data only, no CrUX field data possible pre-launch. |
| [`visual.md`](findings/visual.md) | — | Strong above-the-fold CTA/value-prop presence on every page. Undersized "Book Now" tap targets and widespread missing image dimensions (CLS risk) are the main issues. 20 screenshots in `screenshots/`. |
| [`geo.md`](findings/geo.md) | 56/100 | Fully SSR (best possible technical foundation for AI crawlers), but FAQ answers, price, and 5-of-6 package comparisons all drop out of plain-text extraction that AI browsing tools rely on. |
| [`local.md`](findings/local.md) | 46/100 | Internally perfect NAP consistency and genuinely differentiated route pages. Score is low mainly because GBP/reviews/citations structurally can't exist pre-launch — plus a real trust gap: no licensing/insurance signals for a physical-risk activity. |
| [`sxo.md`](findings/sxo.md) | 68/59/68/50 per page | No severe page-type mismatches — the package detail page is a genuinely strong template. Schema is misallocated (lives on the wrong page) more often than missing outright. |

---

## Methodology

- All 18 pages fetched directly against the Vercel preview URL; `robots.txt`'s `Disallow: /` was overridden for this audit per explicit user authorization (staging site, last stage before launch).
- No Google API credentials configured → no CrUX/PSI/GSC/GA4 field data; performance findings are Lighthouse lab-only.
- No DataForSEO MCP available → no live SERP/backlink data; SXO competitor comparison used WebSearch-summarized results, not raw SERP capture.
- Domain has zero backlink/citation history (pre-launch) — backlink analysis was not run; nothing to measure yet.
- FAQ schema retirement (Google, 2026-05-07) and HowTo deprecation rules were applied throughout — no agent recommended new FAQPage for SERP benefit or any HowTo markup.
