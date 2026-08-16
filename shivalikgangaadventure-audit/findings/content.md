# Content Quality / E-E-A-T Audit — Shivalik Ganga Adventure

**Target:** http://localhost:4100 (local production build; production domain shivalikgangaadventure.com not yet live)
**Date:** 2026-08-15
**Method:** Direct HTTP fetch + trafilatura text extraction of all 17 URLs listed in `/sitemap.xml`, plus manual inspection of raw server-rendered HTML and JSON-LD for stat counters, testimonials, FAQ schema, author bylines, and licensing content. Word counts below are trafilatura-extracted main-content word counts (boilerplate/nav/footer stripped). This is a **fresh independent pass** against the post-rewrite content (5-package catalog, expanded blog posts, rewritten testimonials, licensing section) — not a diff against the earlier same-day report.

**Overall Content Quality Score: 70/100**

---

## Scope note: crawler blocking (not scored)

`robots.txt` returns `Disallow: /` and every page carries `<meta name="robots" content="noindex, nofollow"/>`. Confirmed present sitewide. Per project instructions this is a deliberate, correct pre-launch state and is **excluded from scoring** — noted here only because it means none of the structured data/content quality documented below is currently reachable by search or AI crawlers until the block is lifted at launch.

---

## Word Counts by Page Type

| Page | Word Count | Page-Type Floor | Status |
|---|---:|---:|---|
| Homepage (`/`) | 280 | 500 | Below floor |
| About (`/about`) | 305 | 500 (informational) | Below floor, thin |
| Packages hub (`/packages`) | 415 | 800 (service hub) | Below floor, but see coverage note |
| Destinations (`/destinations`) | 212 | 500–600 (location-style) | Below floor |
| Gallery (`/gallery`) | 39 | n/a (image-led) | Appropriate for page type, not flagged |
| Contact (`/contact`) | 79 | n/a (task-focused) | Appropriate for page type, not flagged |
| Privacy (`/privacy`) | 179 | n/a (legal) | Appropriate |
| Terms (`/terms`) | 198 | n/a (legal) | Appropriate |
| Blog hub (`/blog`) | 113 | n/a (index) | Appropriate |
| Package: Brahmpuri (₹599) | 317 | 300+ (product) | Meets floor |
| Package: Club House (₹699) | 315 | 300+ (product) | Meets floor (marginal) |
| Package: Shivpuri (₹799) | 324 | 300+ (product) | Meets floor |
| Package: Marine Drive (₹1199) | 318 | 300+ (product) | Meets floor (marginal) |
| Package: Kaudiyala (₹2499) | 335 | 300+ (product) | Meets floor |
| Blog: Best Time for Rafting | 782 | 1,500 | Below floor (~52%) |
| Blog: Grade II vs Grade IV | 799 | 1,500 | Below floor (~53%) |
| Blog: What to Pack | 684 | 1,500 | Below floor (~46%) |

**Reading note:** the 5 package pages are scored against the 300+ product-page floor (each is a single bookable route/product with price, itinerary, inclusions/exclusions, FAQ) rather than the 800-word generic service-page floor, since their actual topical coverage (itinerary steps, inclusions, exclusions, 5-question FAQ, comparison table on the hub) is comprehensive despite the leaner prose word count. Per QRG, word count is a coverage floor, not a target — the packages pass on coverage; the homepage and blog posts do not (see Priority Issues).

---

## E-E-A-T Breakdown

| Factor | Weight | Score | Notes |
|---|---:|---:|---|
| Experience | 20% | 68/100 | Named author byline "Arjun Rawat, Lead Rafting Guide, 12 years on the Ganga" with matching `Person`/`jobTitle` schema on all 3 blog posts is a genuine first-hand signal. Content shows real operational specificity (exact water/air temperatures by month, named rapids — Roller Coaster, Golf Course, Sweet Sixteen, Terminator — consistently attributed to the correct routes across destinations/blog/package pages). Undercut by blog hero and body imagery being generic Unsplash stock photos rather than original trip photography, which sits oddly next to a named-guide byline. |
| Expertise | 25% | 74/100 | Technically accurate rafting-grade explanation (Grade I–VI scale), correct seasonal river-dynamics detail, and consistent cross-page facts. Author schema ties a specific credential (guide title, years of experience) to content. Limited by a single named author across all 3 posts (no second contributor/reviewer, no author bio/archive page), which caps perceived breadth of editorial expertise. |
| Authoritativeness | 25% | 52/100 | New licensing/insurance section on `/about` names a specific regulator (Uttarakhand Tourism Development Board) and a guide-certification programme — a real authoritativeness improvement over having nothing. However the registration number is a **placeholder** (see flag below), there are no third-party citations, press mentions, or awards anywhere, and there is no `Review`/`AggregateRating` schema despite a testimonials section existing on the homepage. |
| Trustworthiness | 30% | 80/100 | Strong: consistent NAP sitewide (phone, WhatsApp, email, address, hours) with working `tel:`/`mailto:` links; genuine, business-specific Privacy and Terms pages; transparent, explicit INR pricing stated as a natural-language sentence on every package page plus an accurate comparison table on `/packages`; testimonials now read as authentic reviews rather than ad copy. Reduced by the placeholder licensing registration number and by testimonials still being placeholder content pending real customer sign-off (both flagged once below, not over-weighted). |

**Weighted E-E-A-T score:** 0.20(68) + 0.25(74) + 0.25(52) + 0.30(80) ≈ **69/100**

---

## AI Citation Readiness: ~78/100

**Strengths:**
- All 5 package pages carry correct `FAQPage` schema with exactly 5 `Question`/`Answer` pairs each (25 quotable Q&A units total), matching the client-supplied catalog exactly.
- Every package page states its price as an explicit, quotable natural-language sentence (e.g., "The Brahmpuri to Nim Beach route currently costs ₹599 per person, covering 2 hours on the water over 9 km of Grade I-II rapids").
- `/packages` has an accurate 5-row comparison table (Package / Distance / Duration / Grade / Price / Best For) — a highly extractable format for AI answer engines.
- Blog posts carry `BlogPosting` schema with `Person` author (name + jobTitle), `Organization` publisher, and `mainEntityOfPage`.
- Broad, consistent structured-data coverage sitewide: `SportsActivityLocation`/`TouristAttraction`, `TouristTrip`, `BreadcrumbList`, `GeoCoordinates`, `OpeningHoursSpecification`.
- Clear heading hierarchy and consistent template structure (Itinerary / Inclusions / Exclusions / FAQ) across all package pages aids machine parsing.

**Gaps:**
- All 3 blog posts contain visible, well-formed FAQ Q&A content in the page body but carry **no `FAQPage` JSON-LD** — a missed structured-data opportunity the package-page template already implements correctly.
- No `Review`/`AggregateRating` schema anywhere despite testimonial content on the homepage.
- Currently moot in practice: sitewide `noindex,nofollow` + `robots.txt Disallow: /` means none of this is citable by any engine until launch (expected pre-launch state, not scored as a defect).

---

## Prioritized Issues

### Priority 1 — High
1. **Homepage word count (280) is well below the 500-word floor.** Thin relative to its role as the primary trust/overview page; the Achievements stat block and hero are strong, but there's little supporting narrative body copy. Recommend a route-overview paragraph and an expanded "why choose us" section.
2. **All 3 blog posts (682–799 words) remain at roughly 46–53% of the 1,500-word blog floor**, even after the stated expansion. The existing content is genuinely specific and non-generic (real temperatures, named rapids, correct grading logic) — this is a coverage-depth gap, not a quality problem. Recommend expanding with e.g. a gear/packing table, a guide Q&A sidebar, or deeper route cross-linking rather than padding with filler.
3. **No `AggregateRating`/`Review` schema anywhere**, despite testimonial content existing on the homepage. Add once testimonials are sign-off-approved (see Priority 3 flag below) — this is a straightforward, high-value AI-citation and rich-result improvement.
4. **Blog posts have visible FAQ content but no `FAQPage` schema**, unlike the package-page template which implements this correctly. Extend the existing FAQ-schema pattern to the 3 blog posts.

### Priority 2 — Medium
5. **Single named author ("Arjun Rawat") across all 3 blog posts.** The byline itself is a genuine, specific, credentialed signal — but its identical repetition across every post caps the site's perceived expertise breadth. Consider a second contributor/reviewer credit or an author bio page.
6. **Blog hero/body images are generic Unsplash stock photography**, not original trip photography, despite a named-guide byline — this juxtaposition slightly undercuts the "Experience" signal the byline otherwise establishes.
7. **`/about` readability is markedly lower than the rest of the site** (Flesch ≈32, "difficult") vs. mid-50s–60s elsewhere, driven mainly by the dense licensing/insurance paragraph. Consider shorter sentences in that section.
8. **Destinations page (212 words across 6 put-in points) is comparatively thin** relative to its role as the differentiator between the 5 packages; each destination gets ~2–3 bullets. Not a critical gap given the packages hub carries most of the differentiating detail, but a candidate for expansion.

### Priority 3 — Placeholder flags (known, accepted state — flagged once, not over-weighted)
9. **Testimonials are placeholder content** — rewritten to read as genuine, specific human reviews (not ad copy) and now using a generic icon avatar (confirmed: Lucide "user" icon, not a stock photo) rather than a fabricated stock photo. This is consistent with project convention (placeholder content acceptable pre-signoff). **Flag before real launch**: must be replaced with real, consented customer reviews.
10. **`/about` licensing section uses a placeholder Uttarakhand Tourism registration number** (`UK/ADV-TOURISM/2026/00147`) and certifying-body name. Structurally this is a good addition (names a real regulator and a guide-certification programme), but the specific number is a placeholder. **Flag before real launch**: a fabricated-looking registration number is a genuine trust/compliance risk if shipped as-is; do not treat as a fresh fabrication finding, just confirm it gets swapped for the real figure pre-launch.

### Verified / Not Issues
- **Homepage stat counters render real target numbers server-side**, confirmed in raw HTML (not JS-only, not "0"): 15,000+ (Happy Rafters), 8 (Rafting Routes... rendered as "8"), 5,000+ (Successful Trips), 25+ (Expert Guides). This was previously flagged as broken/zero in an earlier pass; **now confirmed fixed.**
- **All 5 package pages** correctly reflect the new client-supplied catalog (Brahmpuri ₹599, Club House ₹699, Shivpuri ₹799, Marine Drive ₹1199, Kaudiyala ₹2499) with accurate distances/durations/grades matching the `/packages` comparison table.
- **Keyword usage is natural, not stuffed**: sampled density for "rafting"/"Rishikesh"/"Ganga" ranges 0–2.3% across home, about, packages, destinations, and blog pages — well within natural usage.
- **Full, consistent NAP sitewide** with working `tel:+919568868493`, `mailto:info@shivalikgangaadventure.com`, address, and hours — a solid Trustworthiness baseline.
- **Privacy Policy and Terms of Use read as genuinely business-specific**, not generic legal boilerplate.
- **"Cliff jumping" absence is intentional** (per client instruction) and is not flagged as a content gap.
- No evidence of low-quality AI-content markers per Sept 2025 QRG (generic phrasing, repetitive structure, no specificity) — sampled content across page types shows consistent, route-specific, factually precise detail rather than templated filler.

---

## Scoring Summary

| Component | Weight | Score |
|---|---:|---:|
| E-E-A-T (weighted) | 60% | 69/100 |
| AI Citation Readiness | 20% | 78/100 |
| Topical Coverage / Word-Count Adequacy | 20% | 65/100 |
| **Overall Content Quality Score** | | **70/100** |

**Read:** structural foundations (schema, pricing transparency, NAP, keyword hygiene, author attribution) are solid and meaningfully improved since the pre-rewrite state. The main drag on the score is genuine topical-depth thinness on the homepage and all 3 blog posts relative to their page-type floors, plus two known placeholder items (testimonials, licensing registration number) that are accepted pre-launch but must be resolved before go-live.
