# Local SEO Audit — Shivalik Ganga Adventure

**Audited URL:** http://localhost:4100 (local production build)
**Eventual production domain:** https://www.shivalikgangaadventure.com (not live)
**Audit date:** 2026-08-15
**Pages reviewed:** `/`, `/about`, `/contact`, `/destinations`, `/packages/brahmpuri-to-nim-beach`, `/packages/club-house-to-nim-beach`, `/packages/shivpuri-to-nim-beach`, `/packages/marine-drive-to-nim-beach`, `/packages/kaudiyala-to-nim-beach`, plus `robots.txt` and `sitemap.xml` for crawl/index-state verification.
**Method:** Direct HTTP fetch of rendered HTML (`curl`) for each page; JSON-LD, meta tags, and visible copy extracted and diffed page-to-page.
**Context:** Fresh pass following a same-day round of local-SEO fixes. This audit specifically re-verifies: (1) Maps embed added to `/about`, (2) new "Licensing & Insurance" section on `/about`, (3) `logo` added to the `SportsActivityLocation` schema — in addition to a full re-check of NAP, GBP proxy signals, reviews, schema, and the (now 5-package) route catalog.

---

## Business Type & Vertical

- **Business type:** Hybrid, leaning brick-and-mortar. A fixed physical base address ("Shivpuri, Rishikesh - Badrinath Highway, Rishikesh, Uttarakhand 249192, India") is shown site-wide, now with **two** Maps embeds (`/about` and `/contact`). No SAB-style "we come to you" language — correctly modeled as a fixed-location Local Service business.
- **Industry vertical:** Adventure tourism / outdoor recreation (river rafting). `SportsActivityLocation` (no dedicated "RaftingCompany" schema type exists) paired with `TouristAttraction` remains the correct, defensible schema choice.
- **Catalog structure:** Not a multi-location business. **5 packages**, confirmed live: Brahmpuri (₹599), Club House (₹699, new), Shivpuri (₹799), Marine Drive (₹1,199), Kaudiyala (₹2,499) — all routed "to Nim Beach." Each has genuinely distinct copy, grade, distance, and price (verified via `TouristTrip` schema diff across all 5 pages). This replaces the prior 6-package set; sitemap.xml confirms no stale package URLs remain.

---

## Local SEO Score: 48 / 100

**Same caveat as the prior pass applies: this reflects pre-launch technical readiness, not live local search performance.** GBP, citations, and real reviews structurally cannot exist yet — those dimensions score low by definition, not as a site defect. The three targeted fixes (About page Maps embed, Licensing & Insurance section, schema `logo`) landed correctly and move the score up modestly from the prior 46.

| Dimension | Weight | Score | Weighted | Notes |
|---|---|---|---|---|
| GBP Signals | 25% | 45/100 | 11.25 | Maps embed now present on **both** `/about` and `/contact` (was `/contact`-only); still lat/long-based, not Place ID-based — expected, no verified GBP yet |
| Reviews & Reputation | 20% | 28/100 | 5.6 | Testimonials still placeholder but now show varied ratings (5★, 4★, 5★) instead of uniform 5★, and use a generic icon rather than a fake stock photo — a small authenticity improvement. Still unconfirmed real customers; no `aggregateRating` (correctly omitted pre-launch) |
| Local On-Page SEO | 20% | 78/100 | 15.6 | Still strong: dedicated per-route pages with `TouristTrip` schema (itinerary + offer), consistent NAP, FAQ content. Docked slightly for a stale "8 Rafting Routes" stat that no longer matches the 5-package/6-destination catalog |
| NAP Consistency & Citations | 15% | 35/100 | 5.25 | Perfect internal consistency; zero external citations possible yet (expected pre-launch, unchanged from prior pass) |
| Local Schema Markup | 10% | 85/100 | 8.5 | `logo` now present on `SportsActivityLocation` (confirmed fixed); `TouristTrip` schema per package links to business via `provider.@id`; `TouristAttraction` links via `subjectOf` — entity graph is more joined-up than the prior pass found |
| Local Link & Authority Signals | 10% | 20/100 | 2.0 | Unchanged — cannot be assessed pre-launch |
| **Total** | | | **~48** | |

---

## NAP Consistency Audit

Sourced from a single config object used consistently across footer, `/contact`, `/about`, `/destinations`, all 5 package pages, and JSON-LD. Verified directly in fetched HTML (not assumed from source):

| Source | Name | Address | Phone | Email |
|---|---|---|---|---|
| Visible HTML — Footer (all pages) | Shivalik Ganga Adventure | Shivpuri, Rishikesh - Badrinath Highway, Rishikesh, Uttarakhand 249192, India | +91 95688 68493 | info@shivalikgangaadventure.com |
| Visible HTML — `/contact` (main content block) | Shivalik Ganga Adventure | Same, plus hours "Mon - Sun 6:00 AM - 8:00 PM" | Same | Same |
| Visible HTML — `/about` ("Find Our Base Point" section) | Shivalik Ganga Adventure | Same, next to Maps embed | tel: link present | mailto: link present |
| JSON-LD `SportsActivityLocation` (all 9 pages checked) | Shivalik Ganga Adventure | streetAddress / locality / region / postalCode / country, identical on every page | +919568868493 | info@shivalikgangaadventure.com |
| JSON-LD `TouristAttraction` | "Ganga River Rafting, Rishikesh" (distinct entity, expected) | locality/region/country only, no street (unchanged) | — | — |
| JSON-LD `TouristTrip` (5 package pages) | N/A (references business via `provider.@id`) | — | — | — |
| Meta tags (`og:site_name`, `<title>`) | Shivalik Ganga Adventure | — | — | — |

**No discrepancies found.** Address, phone, and email are byte-identical across every visible and structured-data surface checked.

**Persisting minor flag:** the schema `sameAs` array on every page still lists `https://twitter.com/shivalikganga`, but the footer's visible "Follow Us" social icon row only links Facebook, Instagram, and YouTube — Twitter/X is claimed in structured data but not click-through-able anywhere in the UI. Unchanged from the prior audit; still worth a one-line fix (either add the footer icon or drop it from `sameAs`).

---

## GBP Signals (On-Page Proxy Check)

No live Google Business Profile exists yet — confirmed still pending per project context, and correctly out of scope as an action item this pass. Checked what's crawlable/verifiable on-page:

| Signal | Status |
|---|---|
| Visible NAP block | Present on every page (footer + page-specific content) |
| Google Maps embed | **Now present on `/about` AND `/contact`** — confirmed fix landed. Not present on `/`, `/destinations`, or package pages (acceptable; a base-location map doesn't need to repeat on every route page) |
| Maps embed tied to a verified Google Place ID | No — still a generic `?q={lat},{lng}&z=14&output=embed` query embed on both instances, not a Place ID embed. Correct interim choice with no verified GBP yet; needs upgrading once GBP exists |
| "Get Directions" link | Still not present as a distinct CTA on `/about` or `/contact` — only the embed itself is interactive |
| Review widget pulling live Google reviews | Not present — testimonials remain static/hardcoded |
| GBP posts / photo evidence indicators | N/A — no live listing yet |
| Click-to-call | Present site-wide (header bar, mobile nav, `/contact`, footer) |
| Click-to-WhatsApp | Present site-wide, well-implemented (header CTA, About/Safety CTAs, footer CTA, `/contact`) |

---

## Review Health Snapshot

- **Rating shown on-site:** 3 testimonials on the homepage, star ratings **5★, 4★, 5★** — an improvement over a uniform 5★/5★/5★ pattern seen previously, which reads more credibly. Each is tied to a named reviewer (e.g., "Rohan Malhotra") and the specific route taken (e.g., "Shivpuri to Nim Beach"), and now uses a generic person icon rather than a stock photo avatar — removes the "identical fake photo" authenticity red flag noted last time, though the reviews themselves remain unconfirmed as real customers.
- **Review count:** None (3 testimonials; not framed as a review-count claim).
- **`aggregateRating` in schema:** Still **absent** from `SportsActivityLocation` on every page checked. This is correct pre-launch behavior (no real review data to reference) and should stay this way until real GBP/on-site reviews exist.
- **Review velocity:** N/A pre-launch. Sterling Sky's 18-day rule (ranking cliff after 3 weeks without a new review) and the "Magic 10" review-count threshold remain relevant for post-launch planning — unchanged recommendation from the prior pass.
- **Package-level `rating: 5` field:** Each of the 5 package cards on the homepage carries a static `rating: 5` value (rendered as filled stars on the package card), separate from the testimonials. Like the testimonials, this is not backed by an `aggregateRating`/`review` schema property, so it's a visual trust cue only, not a structured-data claim — low risk, but worth being aware it exists as another "5-star" visual alongside the testimonials.

---

## Trust & Safety / E-E-A-T Signals (Adventure Tourism-Specific)

This is the section with the most material change since the last pass.

| Signal | Status |
|---|---|
| Government/tourism department license or registration number | **Now present.** `/about` → "Licensing & Insurance" section states: *"Shivalik Ganga Adventure is registered with the Uttarakhand Tourism Development Board (registration no. UK/ADV-TOURISM/2026/00147)."* Confirmed fix landed. |
| Insurance coverage statement | **Now present.** Same section: *"Every rafter is covered by per-person accident insurance for the duration of the trip, arranged through our insurance partner."* |
| Named certifying body for guides | **Now present**, and appears in two places: the Licensing & Insurance section ("all guides carry current certification under the **Uttarakhand River Rafting Guide Certification Programme**") and the Safety Guidelines section higher on the same page, which uses identical wording. |
| Named safety equipment standard | **Now present** — "all rafts operate with **ISI-marked life jackets and helmets**," closing a gap flagged in the prior audit. |
| "Certified guides" claim | Present and now specific (previously flagged as generic/unnamed — now resolved by the two items above). |
| First-aid / medical support claim | Present ("First-aid support is on hand at every base point") — unchanged, good. |
| Weather/river-condition contingency policy | Present, briefly, in both the Safety Guidelines section and package-level FAQs (e.g., "if river or weather conditions become unsafe, we'll reschedule your slot"). |
| Guide bios / individual credentials | Still not present — guides referenced only as a collective ("25+ Expert Guides" in the Achievements counter). Not critical, low priority. |
| Age/health restrictions, waiver/consent process | Partially surfaced — package FAQs mention a "minimum age of 8" for the beginner route; a formal waiver/consent flow was not checked (`/terms` out of scope for this pass, as before). |

**Placeholder flag (per project convention, not a new finding):** the registration number, insurance-partner reference, and certification-programme name in the Licensing & Insurance section are placeholder content pending real figures from the client. This is acceptable pre-signoff per project memory, but **must be swapped for verified figures before real launch** — publishing an invented UTDB registration number or insurance claim to a live, indexable site would be a compliance and consumer-trust risk for a physical-risk activity. Flagging once here; do not treat as a fresh defect.

**Minor accuracy flag (new this pass):** the "Our Achievements" counter on `/about` (and reused elsewhere) still shows **"8 Rafting Routes,"** which no longer matches the current catalog — there are 5 bookable packages and 6 named destinations on `/destinations` (Shivpuri, Brahmpuri, Marine Drive, Kaudiyala, Club House, plus an informational-only "Byasi Rapids" card that links to the general `/packages` hub rather than a dedicated route page). Low severity, but a "we run X routes" number that doesn't reconcile with the visible catalog is exactly the kind of inconsistency that erodes trust once real traffic/GBP scrutiny arrives — worth aligning to a real, defensible number before launch.

---

## Local Schema Validation

**Schema types found:** `SportsActivityLocation` (site-wide, on all 9 pages checked) + `TouristAttraction` (site-wide) + `BreadcrumbList` (per-page) + `TouristTrip` (per package page, new/more fleshed out than "ItemList" noted previously) + `FAQPage` (package pages).

### `SportsActivityLocation` (functions as the LocalBusiness entity)

| Property | Required/Recommended | Status |
|---|---|---|
| `name` | Required | Present — "Shivalik Ganga Adventure" |
| `address` (PostalAddress) | Required | Present, complete |
| `logo` | Recommended (Google entity/Knowledge Panel signal) | **Now present** — `https://www.shivalikgangaadventure.com/images/logo/favicon.png`. Confirmed fix landed on every page checked (home, about, contact, destinations, all 5 package pages). Note: it points at the small favicon-sized asset rather than a larger square logo file — functionally valid, but worth using the higher-resolution logo asset if one exists, since Google's Merchant/Knowledge-Panel guidance recommends ≥112×112px. |
| `geo` | Recommended, 5 decimal places min | **Still under-precise** — `30.1667, 78.3667`, unchanged at 4 decimal places (~11m accuracy). Not addressed this pass; still needs the exact GBP-verified pin once available. |
| `telephone` | Recommended | Present, matches on-page NAP |
| `openingHoursSpecification` | Recommended | Present — Mon–Sun 06:00–20:00 |
| `url` | Recommended | Present, points to the future production domain |
| `priceRange` | Recommended | Still generic (`"₹₹"`) — real per-package prices now range ₹599–₹2,499, which schema doesn't reflect |
| `image` | Recommended | Present (`opengraph-image`) |
| `sameAs` | Recommended | Present, 4 profiles including Twitter/X, which still isn't linked in the visible footer (see NAP section) |
| `aggregateRating` / `review` | Recommended | Still absent — correct pre-launch |
| `@id` | Best practice | Present (`{url}/#business`) |

### `TouristAttraction`

Present with `name`, `description`, `url`, `touristType`, partial `address`, `geo`, `@id`. **Linked** to the business entity via `subjectOf: {"@id": ".../#business"}` — this entity-linkage gap flagged in the prior audit is actually already resolved/present in the current build.

### `TouristTrip` (new, one per package page)

Each of the 5 package pages carries a `TouristTrip` object with `name`, `description`, `image`, `touristType`, a full `itinerary` (`ItemList` of timed stops), `provider: {"@id": ".../#business"}` (explicitly linked to the LocalBusiness entity), and an `offers` block (`price`, `priceCurrency: "INR"`, `availability`, `priceValidUntil`, `validFrom`). This is a strong, non-generic implementation — it's both a rich-result opportunity and a clean example of the "dedicated service page" pattern Whitespark 2026 flags as the #1 local organic ranking factor.

### `FAQPage` (per package page)

Present, 5 route-specific Q&As per page (safety, swimming requirement, packing, weather policy, hotel pickup) — genuinely differentiated content per route, not templated boilerplate.

### `BreadcrumbList`

Present and correct on every page checked, including 3-level breadcrumbs on package pages (Home → Packages → [Route Name]).

---

## Citation Presence

**Still cannot be meaningfully assessed** — the production domain is not live and the site is fully deindexed (see below), so no external directory can plausibly reference it yet. This is unchanged from the prior pass and is not a defect at this stage. Recommended Tier-1 targets for launch remain the same as previously identified:

- Google Business Profile (primary — already tracked as a known pending item, not re-flagged as an action here)
- TripAdvisor (high consumer trust for adventure/tour activities)
- JustDial (India's dominant local directory)
- GetYourGuide / Viator (bookable-activity marketplaces)
- Uttarakhand Tourism Development Board operator directory — doubles as public verification of the registration number now shown in the Licensing & Insurance section
- Instagram/Facebook Business (handles already reserved and wired into schema/footer)

---

## Location / Route Page Quality

Evaluated the 5 package pages plus `/destinations` as the local-intent equivalent of location pages:

- Each of the 5 route pages has **distinct, non-templated content**: different distances (9–32 km), different grades (I–II through IV), different rapid names, different prices, and a distinct `TouristTrip` itinerary and FAQ set per page. Confirmed via direct JSON-LD diff across all 5 pages.
- `/destinations` presents 6 cards (5 tied to bookable packages, 1 informational — "Byasi Rapids," which links to the general `/packages` hub rather than a dedicated page). Not a defect, but if Byasi Rapids is meant to be a real, separately marketable put-in point, a dedicated page for it would extend the "dedicated service page" advantage already earned by the other 5 routes.
- Internal linking is solid: homepage "Most Popular Rafting Packages" section links to all 5 packages, `/destinations` cards link to matching package pages, breadcrumbs reinforce hierarchy on every package page.
- Gap (unchanged from prior pass): none of the route pages state specific put-in/take-out GPS coordinates or drive-time from the base address.

---

## Crawlability State (Factual Note, Not a Defect)

Confirmed via direct fetch of `robots.txt` (`User-Agent: *` / `Disallow: /`) and per-page `<meta name="robots" content="noindex, nofollow">` on every page checked. This is the deliberate, expected pre-launch state per project context — noted for completeness, not flagged as an issue, and scored around consistently with the prior pass (GBP/reviews/citations dimensions already reflect that nothing external can accrue while this is in place).

---

## Top 10 Prioritized Actions

**Critical**
1. **At production launch, flip `robots.txt` and per-page `robots` meta to allow indexing**, and set the real Google Business Profile up on the live domain with the correct primary category (highest-weighted ranking factor in Whitespark 2026; wrong category is the single biggest negative factor). This is already well understood as pending — listed here only as the hard launch-day gate, not a new task.
2. **Replace the placeholder UTDB registration number, insurance-partner reference, and certification-programme name in the `/about` Licensing & Insurance section with real, verifiable figures before public launch.** Per project convention this is acceptable placeholder content pre-signoff, but publishing a fabricated government registration number or insurance claim to a live, indexable page is a compliance and consumer-trust risk for a physical-risk activity — flag once, resolve before go-live.
3. **Confirm testimonials before launch** (real customers vs. clearly-marked illustrative copy). Acceptable as placeholder pre-signoff per project memory; the varied star ratings and generic-icon avatars are a believability improvement over a uniform stock-photo pattern, but the underlying content is still unconfirmed.

**High**
4. **Increase `geo` coordinate precision from 4 to 5+ decimal places** once the exact base/put-in location is confirmed, and align it with the eventual GBP pin. Unaddressed since the prior pass.
5. **Reconcile the "8 Rafting Routes" Achievements stat** with the actual catalog (5 bookable packages / 6 destination cards) — pick a real, defensible number before launch.
6. **Upgrade both Maps embeds (`/about` and `/contact`) from lat/long query embeds to Place-ID-based embeds** once GBP is verified, so the on-page map reflects the same photos/hours/reviews as the live listing.
7. **Register on TripAdvisor, JustDial, and GetYourGuide/Viator** at launch — higher-relevance citation sources for an India-based adventure/tour operator than the generic Yelp/BBB Tier-1 set.

**Medium**
8. **Add a distinct "Get Directions" CTA** near both Maps embeds, not just a clickable iframe — small conversion and usability win, also reinforces the location signal.
9. **Reconcile `priceRange: "₹₹"` in schema with the real ₹599–₹2,499 spread** across the 5 packages — either a numeric `PriceSpecification` or a more representative range indicator.
10. **Either add the Twitter/X icon to the visible footer or remove it from schema `sameAs`** — same unresolved inconsistency flagged in the prior pass; low effort, one-line fix.

**Low**
- Consider a dedicated page for "Byasi Rapids" if it's a real bookable put-in point, to extend the dedicated-service-page advantage the other 5 routes already have.
- Use a higher-resolution square logo asset for schema `logo` rather than the favicon-sized file, per Google's Knowledge Panel image-size guidance.
- Add specific put-in/take-out GPS coordinates or drive-time-from-base info to each route page.

---

## Limitations Disclaimer

- **No live Google Business Profile exists** (by design, pending client setup) — GBP category, verification status, photo count, Q&A, posts, popular times, and live review data could not be assessed. All GBP findings in this report are on-page proxy checks against the local build only.
- **DataForSEO MCP tools were not available/used in this session** — `local_business_data` and `google_local_pack_serp` live data were not queried. Re-run this audit post-launch for real Maps SERP position and live GBP completeness scoring.
- **Citation presence (TripAdvisor, JustDial, GetYourGuide, Uttarakhand Tourism directory, etc.) could not be checked** since the business isn't discoverable under its production domain yet.
- **`/terms` and `/privacy` were not fetched in this pass** (outside the specified page list) — a follow-up check for age restrictions, liability waiver language, and cancellation policy would further round out the E-E-A-T picture for a physical-risk activity.
- **Proximity** (55.2% of local ranking variance per Search Atlas ML study) remains outside on-page control entirely and is not scoreable via this audit.
- This audit was run against `http://localhost:4100` (local production build), not the eventual live domain — all URL, canonical, and schema `url` values correctly point forward to `https://www.shivalikgangaadventure.com`, which was verified but obviously could not be fetched directly.
