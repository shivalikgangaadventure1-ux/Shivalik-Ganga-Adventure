# Content Quality / E-E-A-T Audit — Shivalik Ganga Adventure

**Target:** https://shivalik-ganga-adventure.vercel.app/ (pre-launch staging; production domain shivalikgangaadventure.com not yet live)
**Date:** 2026-08-15
**Method:** Full render + trafilatura text extraction (`render_page.py`) of all 18 listed URLs, plus manual inspection of raw HTML/JSON-LD for testimonials, stat counters, and structured data. Automated readability/content_quality.py scoring was **not completed** for all pages before this write-up (see Info/gaps section) — findings below are based on manual QRG-aligned review of extracted text and raw HTML.

**Overall Content Quality Score: 38/100**

## E-E-A-T Breakdown

| Factor | Weight | Score | Notes |
|---|---|---|---|
| Experience | 20% | 45/100 | Specific rapid names (Roller Coaster, Golf Course, Sweet Sixteen, Terminator), km/time/grade per route, and itinerary timings read as real operational knowledge, not generic filler. No first-hand narrative content (trip reports, photos attributed to real trips, guide bios). |
| Expertise | 25% | 50/100 | Route-specific safety detail (grade-appropriate briefings, kayak escort, senior crew on Grade IV) is a positive signal. No named/credentialed authors on blog posts, no certifying body named for "certified guides." |
| Authoritativeness | 25% | 35/100 | No third-party citations, press mentions, awards, or verifiable licensing/registration numbers anywhere on the site. `sameAs` social links present in schema but not verified as real/active accounts. |
| Trustworthiness | 30% | 40/100 | Real NAP (address, phone, email, hours) and specific, non-boilerplate Privacy/Terms pages are good. Severely undercut by fabricated-looking testimonials and non-functional/zero-value stat counters (see Critical items). |

## AI Citation Readiness: ~55/100
Positive: solid JSON-LD coverage (`SportsActivityLocation`, `TouristAttraction`, `ItemList`/`TouristTrip` with real INR prices, `BreadcrumbList`). Package pages have clean, quotable factual passages (distance/duration/grade, itinerary steps, inclusions/exclusions). Negative: no `Review`/`AggregateRating` schema despite a testimonials section; no `Article`/`BlogPosting` schema verified for blog posts; prose depth per page is too thin to give an LLM much to extract beyond the structured facts.

---

## Critical

1. **Testimonials use a shared stock/template demo image, not real customer photos.** All three homepage testimonials ("Rohan Malhotra," "Ananya Kapoor," "Vikram Sethi") point to the exact same avatar file: `https://html.physcode.com/travel/images/avata.jpeg` — this is a demo asset from the "Physcode Travel" HTML template this site's design is likely based on, not a real customer. Combined with generic-sounding names and 5-star ratings on every quote, this reads as fabricated/placeholder review content presented as genuine social proof. **Per memory note on placeholder content: this must be explicitly verified with the client before launch** — if these are not real reviews from real guests, they should not ship as-is; presenting invented testimonials as genuine customer feedback is a trust/compliance risk (misleading advertising / fake-review concerns), not just an SEO nit. Recommend replacing with real reviews (with consent) or removing the ratings/photos until real ones exist.

2. **"Numbers That Speak for Themselves" stat counters render as 0.** Server-rendered HTML shows `0+` (Happy Rafters), `0` (Rafting Routes), and presumably `0` for Successful Trips / Expert Guides, with JS-driven count-up animation. No underlying non-zero target value was found in the static HTML. If these are meant to animate from 0 up to a real number client-side, verify the real numbers are wired in before launch (currently indistinguishable from an unfinished placeholder). If no real numbers exist yet, this entire section is fabricated authority signaling and should not go live as-is.

3. **Pervasive thin content across every page type, well below QRG topical-coverage floors.** Word counts (via extracted body text):
   - Homepage: **~200 words** (guideline floor: 500)
   - About: **~221 words**
   - All 6 package/service pages: **199–236 words each** (floor: 800) — roughly 25–30% of the expected floor
   - All 3 blog posts: **227–268 words each** (floor: 1,500) — roughly 15–18% of the expected floor
   - Packages hub: 111 words; Destinations hub: 199 words covering 6 distinct put-in points (~33 words each); Blog hub: 113 words
   This isn't a "hit a word count" problem per se, but the actual topical coverage is genuinely shallow: no FAQ depth beyond one Q&A per package page, no gear-detail depth, no local logistics depth (hotel pickup zones, road conditions to Kaudiyala, permit/forest-area rules), no season-specific safety notes beyond the one blog post. This is the single biggest content-quality gap on the site.

## High

4. **No verifiable certification/licensing authority named anywhere.** Copy repeatedly claims "certified guides," "certified river rescue experts," and safety inspections, but never names *who* certifies them (e.g., Uttarakhand Tourism adventure-tourism registration number, IRF/Indian rafting federation affiliation, Ministry of Tourism recognition, first-aid certification body). For a safety-critical adventure-sport operator, this is the single highest-leverage trust/authoritativeness fix available — a real registration/license number would materially improve Trustworthiness and Authoritativeness scores and is standard practice for legitimate Rishikesh rafting operators.

5. **Blog posts (safety/planning-adjacent content) have no author byline, bio, or credentials.** "Grade II vs Grade IV Rapids Explained" and "Best Time for River Rafting" both touch on safety-relevant judgment calls (when it's unsafe to raft, which grade is appropriate for whom) with zero visible author attribution in the extracted text. For content this close to safety guidance, an attributed, credentialed author (e.g., "Written by [Name], Lead Rafting Guide, X years on the Ganga") would substantially strengthen Expertise.

6. **Manufactured real-time urgency copy on the homepage reads as templated/synthetic.** "Right Now in Rishikesh — Best time to raft today: Any time today looks good for rafting" and "Limited slots per day... hurry and reserve your raft" is generic scarcity-marketing language not tied to any real, verifiable, live data (actual slot availability, actual weather/river conditions). This is a classic Sept-2025-QRG-flaggable pattern (generic phrasing, no specificity, formulaic urgency) and risks reading as manipulative if slots are not actually limited. Recommend tying this to real data or removing it.

## Medium

7. **Package pages show templated duplicate structure (Itinerary / Inclusions / Exclusions / FAQ) across all 6 routes.** This is expected and appropriate for a service-page template, and the actual route-specific content within each section is genuinely differentiated (different times, distances, rapid names, group-size notes) — **not** flagged as duplicate content. However, each page surfaces only a **single FAQ item** despite the plural heading "Frequently Asked Questions." Verify whether this is an extraction artifact (accordion truncation) or an actual content gap — if real, expand each package's FAQ to 3–5 genuinely differentiated questions (age/fitness minimums, weather cancellation specifics, what happens if water levels are low that day, pickup logistics) to add real depth and long-tail AI-citation surface area.

8. **Destinations hub page is under-developed relative to its role.** Six distinct put-in points (Shivpuri, Brahmpuri, Marine Drive, Kaudiyala, an unnamed mid-river gorge section, and the camping ground) are each given ~30 words and 2-3 bullet points, with no individual destination detail pages. Given these are the actual differentiators between package pages, each destination could support its own short profile (access/road notes, best season, which packages launch from there) rather than being folded entirely into the packages content.

9. **No dates/freshness signals on evergreen pages.** Privacy and Terms both carry a "Last updated: 12 August 2026" date (good practice, appropriately recent). Package and destination pages carry no equivalent "last verified/updated" signal, which matters for pricing and safety-condition content that can go stale (e.g., water-level-dependent route availability).

## Low

10. **Contact page is minimal (78 words) but functionally complete** — has real address, phone, email, and hours. Could add a short trust paragraph (booking process, cancellation-policy pointer, response-time expectation) without meaningfully changing its lean, task-focused purpose.

11. **Gallery page (39 words) is appropriately minimal** for an image-led page type — not flagged as thin content given its purpose.

## Info / Gaps in This Pass

- **Automated readability/content_quality.py and content_verify.py scoring was not run to completion** across the 18-page set before this write-up; the score above reflects manual QRG-aligned assessment of extracted text and raw HTML only. Recommend a follow-up pass running `content_quality.py` and `content_verify.py` (claim/citation-gap detector) against each page's `extracted_text` for a quantitative readability/citation-gap score to sit alongside this qualitative review.
- Did not deep-dive `nlp_analyze.py` entity/sentiment analysis, or verify `Review`/`AggregateRating`/`Article` schema presence on the blog templates (only homepage JSON-LD was inspected in detail: `SportsActivityLocation`, `TouristAttraction`, `ItemList`, `BreadcrumbList` — all present and reasonably well-formed).
- Did not verify whether the `sameAs` social profile URLs (Facebook/Instagram/Twitter/YouTube) in JSON-LD resolve to real, active accounts — worth a quick manual check before launch since dead/placeholder social links compound the fake-testimonial trust issue.
- Privacy Policy and Terms of Use read as genuinely business-specific (not generic legal boilerplate) — this is a positive and does **not** need a placeholder-copy flag.
- Package-page prose (itineraries, inclusions/exclusions, route descriptions) reads as legitimate, operator-specific copy — also does **not** need a placeholder-copy flag; it should simply be expanded for depth (see Medium #7, #8).
