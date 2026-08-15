# Action Plan — Shivalik Ganga Adventure SEO Audit

Priorities follow: **Critical** (blocks indexing/launch or is a real bug) → **High** (fix within 1 week) → **Medium** (fix within 1 month) → **Low** (backlog). The Launch Gate items are sequenced first regardless of severity label, since nothing else matters until the site is indexable.

---

## Phase 0: Launch Gate (do before/at DNS cutover — not optional, not scored)

- [ ] Remove `Disallow: /` from `robots.txt`; add `Sitemap: https://www.shivalikgangaadventure.com/sitemap.xml`; add AI-crawler allowlist (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) — ready-to-ship file in `findings/geo.md §1`. *(technical.md, geo.md)*
- [ ] Remove sitewide `<meta name="robots" content="noindex, nofollow">` (or set `index, follow`). Tie both this and the robots.txt rule to one `VERCEL_ENV === "production"` check. *(technical.md)*
- [ ] Add `/llms.txt` — template in `findings/geo.md §3`. *(geo.md)*
- [ ] Re-fetch `/sitemap.xml` from the live production host once DNS resolves and confirm all 18 URLs return 200. *(sitemap.md)*
- [ ] Claim + verify Google Business Profile immediately at launch; use the site's `constants/config.ts` `COMPANY` object verbatim as the NAP source of truth; select the correct primary category (e.g. "River Rafting"). *(local.md)*
- [ ] **Client decision required:** confirm whether the 3 homepage testimonials are real, consenting customers. If not, replace with real reviews or remove before public launch — do not ship fabricated reviews as genuine social proof. *(content.md, local.md, schema.md)*
- [ ] **Client decision required:** confirm/populate the "Numbers That Speak for Themselves" stat counters (currently render as `0`/`0+` server-side) with real figures, or remove the section. *(content.md)*
- [ ] Add government/tourism-board registration or license number + insurance coverage statement to `/about`. Material trust gap for a physical-risk adventure activity — competitors in this market commonly display this. *(local.md)*

---

## Phase 1: Critical Fixes (Week 1)

- [ ] Fix `getBlogPostingSchema`'s malformed `image` field — guard against double-prefixing an already-absolute URL: `post.coverImage.startsWith("http") ? post.coverImage : \`${COMPANY.url}${post.coverImage}\``. Confirmed broken today on all 3 blog posts. *(schema.md §5, sxo.md H4)*
- [ ] Add `TouristTrip`/`Offer` schema to all 6 package detail pages (price, duration, grade — currently shown on-page but absent from structured data there entirely). Generated code in `findings/schema.md §4a`. *(schema.md, sxo.md H1)*
- [ ] Move (or duplicate) the 6-item `ItemList`/`Offer` schema from the homepage to `/packages` — the page that actually renders all 6 packages and is the natural landing page for comparison queries. *(schema.md, sxo.md H2)*
- [ ] Render all FAQ accordion answers into the DOM at all times (native `<details>`/CSS-toggle instead of conditional JSX) — currently 18 of 24 FAQ answers across the 6 package pages are invisible to any crawler reading rendered text rather than parsing JSON-LD. *(geo.md §2a)*
- [ ] Add a real `<table>` price/grade/duration comparison block to `/packages` — currently only the first of 6 package cards survives plain-text extraction (boilerplate-stripping drops the rest). Data already compiled in `findings/geo.md §2c`. *(geo.md §2c)*
- [ ] State package price once in main-content prose (not just the sidebar) on each package detail page, so it survives boilerplate extraction independent of the schema fix. *(geo.md §2b)*

## Phase 2: High-Impact Improvements (Weeks 2–3)

- [ ] Enlarge the "Book Now" package-card tap target from ~16px to 48px+ (WCAG 2.5.5) — it's the site's core conversion action. *(visual.md #1)*
- [ ] Fix the oversized header logo: correct `sizes` prop, remove `loading="lazy"` — ~85 KB saved per page load, sitewide. *(performance.md H3, visual.md #3)*
- [ ] Add the Next.js `priority` prop to hero/cover images on Packages, Package Detail, Gallery, and Blog templates. *(performance.md H2)*
- [ ] Add `publisher` (Organization + logo) to `BlogPosting` schema. *(schema.md §4b)*
- [ ] Add a named certifying body/registration number wherever "certified guides" is claimed (About, homepage). *(content.md, local.md)*
- [ ] Add author byline + credentials to blog posts (currently generic "Organization" author on safety-adjacent content). *(content.md, sxo.md M1)*
- [ ] Expand the 3 blog posts from ~230–270 words to 600–900+ words with season-specific/rapid-specific detail. *(content.md, geo.md §2e, sxo.md M1)*
- [ ] Fix `<img>` elements across Home/Packages/Package Detail/Contact lacking explicit width/height or `aspect-ratio` (CLS risk) — 20/25 on Home, 14/16 on Packages. *(visual.md #2)*

## Phase 3: Content, Schema & Authority (Month 2)

- [ ] Expand each package page's FAQ from 1–3 questions to 3–5 (age/fitness minimums, weather cancellation policy, low-water-level contingency, pickup logistics). *(content.md #7, sxo.md L2)*
- [ ] Add decision-support copy to `/packages` ("which package is right for you," a plain-language Grade I–IV explainer, persona routing). *(sxo.md M2)*
- [ ] Add `Review`/`AggregateRating` schema — **only after** testimonial authenticity is confirmed (Phase 0). *(schema.md §4d)*
- [ ] Add `logo` property to the `SportsActivityLocation` entity; link `TouristAttraction` to it via `subjectOf`. *(schema.md §4c, local.md #10)*
- [ ] Increase `geo` coordinate precision from 4 to 5+ decimal places once the exact GBP-verified location is confirmed. *(local.md #6)*
- [ ] Add a Google Maps embed to `/about` and/or `/destinations` (currently only on `/contact`); switch to a Place-ID-based embed once GBP is verified. *(local.md #9, sxo.md M3)*
- [ ] Set up a post-trip review-generation workflow (WhatsApp/SMS) ahead of launch — review velocity matters for local ranking from day one, not after. *(local.md #7)*
- [ ] Register on TripAdvisor, JustDial, GetYourGuide/Viator, and the Uttarakhand Tourism operator directory at launch. *(local.md #8)*
- [ ] Fix `sizes` misconfiguration on package/blog card images (systemic — up to 187 KB wasted per page). *(performance.md M1)*
- [ ] Replace hotlinked Unsplash cover images with self-hosted, pre-optimized assets before real launch. *(performance.md M2)*
- [ ] Add security headers (CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) via `next.config.js`/`vercel.json`. *(technical.md)*

## Phase 4: Monitoring & Iteration (Ongoing)

- [ ] Re-run `pagespeed_check.py`/CrUX against the production domain once live + indexed 28 days, to replace lab-only performance data with real field data.
- [ ] Watch the Gallery page's Total Blocking Time (highest of the 5 tested) as more images are added; consider virtualizing the grid if it grows.
- [ ] Monitor review velocity post-launch (target: new reviews at least every ~18 days, per local search literature) — don't let it go quiet after an initial push.
- [ ] Once real trip photography replaces Unsplash placeholders, add descriptive (route/rapid-specific) alt text — current gallery alt text is generic ("rafting moment 1").
- [ ] Re-audit Local SEO and GEO categories ~4–6 weeks post-launch once GBP, citations, and AI-crawler access have had time to take effect — both scores are structurally capped pre-launch and should be expected to rise independent of any further code changes.
- [ ] Implement IndexNow (Bing/Yandex) once live, particularly useful given the ongoing blog cadence. *(technical.md)*
