# Local SEO Audit — Shivalik Ganga Adventure

**Audited URL:** https://shivalik-ganga-adventure.vercel.app/ (Vercel preview, pre-launch)
**Eventual production domain:** https://www.shivalikgangaadventure.com (not live)
**Audit date:** 2026-08-15
**Pages reviewed:** `/`, `/about`, `/contact`, `/destinations`, `/packages/brahmpuri-to-rishikesh`, `/packages/shivpuri-to-rishikesh`, `/packages/marine-drive-to-rishikesh`, `/packages/kaudiyala-to-rishikesh`, `/packages/camping-rafting-combo`, `/packages/kaudiyala-to-shivpuri-extreme`
**Method:** Full HTML fetch of each page (`fetch_page.py`) + source review of `constants/config.ts`, `lib/schema.ts`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `components/Footer.tsx`, `app/contact/page.tsx`, `app/about/page.tsx`, `sections/Testimonials.tsx`, `sections/Achievements.tsx`

---

## Business Type & Vertical

- **Business type:** Hybrid, leaning brick-and-mortar. Fixed physical base address is shown site-wide ("Shivpuri, Rishikesh - Badrinath Highway, Rishikesh, Uttarakhand 249192, India"), with a Google Maps embed on `/contact`. No "we come to you" / service-area-only language — customers travel to the put-in point, which is standard for rafting operators. Correctly modeled as a fixed-location Local Service business, not a pure SAB.
- **Industry vertical:** Adventure tourism / outdoor recreation (river rafting). Closest match in Google/Schema.org's supported LocalBusiness vocabulary is `SportsActivityLocation` (no dedicated "RaftingCompany" type exists) — this is the correct choice, paired with `TouristAttraction` for the activity/experience itself. This is a defensible, non-generic schema decision.
- **Multi-location note:** This is **not** a true multi-location business (no separate branches with independent NAP/GBP listings). The 6 package pages represent different put-in/take-out **routes** on the same river, operated from one base. Traditional "doorway page swap test" / per-location NAP consistency does not apply here — instead these pages were evaluated as dedicated service/route pages, which is the #1 local organic ranking factor per Whitespark 2026.

---

## Local SEO Score: 46 / 100

**This score reflects pre-launch technical readiness, not live local search performance.** Since the site is unindexed and pre-launch, GBP existence, citations, and real reviews cannot exist yet — those dimensions score low by definition, not due to a site defect. On-page foundations (NAP structure, schema, dedicated route pages) are comparatively strong.

| Dimension | Weight | Score | Weighted | Notes |
|---|---|---|---|---|
| GBP Signals | 25% | 40/100 | 10.0 | No live GBP possible pre-launch; on-page Maps embed exists but only on `/contact`, not tied to a verified Place ID |
| Reviews & Reputation | 20% | 25/100 | 5.0 | Testimonials are placeholder content, no `aggregateRating` in schema, no link-out to a real review platform |
| Local On-Page SEO | 20% | 80/100 | 16.0 | Strong: dedicated, uniquely-written pages per route; consistent NAP block on every page |
| NAP Consistency & Citations | 15% | 35/100 | 5.25 | Perfect internal consistency (single source of truth), but zero external citations exist yet (expected pre-launch) |
| Local Schema Markup | 10% | 75/100 | 7.5 | Solid `SportsActivityLocation` + `TouristAttraction` implementation; geo precision and entity linkage gaps |
| Local Link & Authority Signals | 10% | 20/100 | 2.0 | Cannot be assessed — no backlinks/citations possible pre-launch |
| **Total** | | | **~46** | |

---

## NAP Consistency Audit

Sourced from `constants/config.ts` (`COMPANY` object), which is used as the single source of truth by the footer, `/contact`, `/about`, and `lib/schema.ts`. Because every surface pulls from this one object, **on-site NAP is internally 100% consistent** — this is a genuine strength and low future-maintenance risk.

| Source | Name | Address | Phone | Email |
|---|---|---|---|---|
| Visible HTML — Footer (all pages) | Shivalik Ganga Adventure | Shivpuri, Rishikesh - Badrinath Highway, Rishikesh, Uttarakhand 249192, India | +91 95688 68493 | info@shivalikgangaadventure.com |
| Visible HTML — `/contact` | Shivalik Ganga Adventure | (same) | (same) | (same) |
| Visible HTML — `/about` | Shivalik Ganga Adventure | (address not repeated in body copy; only in footer) | tel: link present | mailto: link present |
| JSON-LD `SportsActivityLocation` (all pages, via `app/layout.tsx`) | Shivalik Ganga Adventure | streetAddress "Shivpuri, Rishikesh - Badrinath Highway" / locality Rishikesh / region Uttarakhand / postalCode 249192 / country IN | +919568868493 | info@shivalikgangaadventure.com |
| JSON-LD `TouristAttraction` | "Ganga River Rafting, Rishikesh" (entity name, not business name — expected, different entity) | locality/region/country only, no street | — | — |
| Meta tags (`og:site_name`, title) | Shivalik Ganga Adventure | — | — | — |
| Social profiles (facebook/instagram/twitter/youtube — referenced in `sameAs`) | Not independently verifiable — accounts likely not publicly populated pre-launch | N/A | N/A | N/A |

**No discrepancies found** between visible HTML, JSON-LD, and meta tags. Flag: **Twitter/X profile is referenced in schema `sameAs` (`lib/schema.ts` → `Object.values(COMPANY.social)`) but is not linked anywhere in the visible UI** — `components/Footer.tsx`'s `SOCIAL_LINKS` array only includes Facebook, Instagram, YouTube. Minor inconsistency between what schema claims and what a user/crawler can actually click through to.

---

## GBP Signals (On-Page Proxy Check)

No live Google Business Profile could be found or verified — expected, since the production domain (shivalikgangaadventure.com) is not live and the preview domain is disallowed from indexing (see Critical finding below). Checked what's crawlable/verifiable on-page instead:

| Signal | Status |
|---|---|
| Visible NAP block | Present on every page (footer) |
| Google Maps embed | Present on `/contact` only — **not** on `/`, `/about`, or `/destinations` |
| Maps embed tied to a verified Google Place ID | No — uses a generic `?q={lat},{lng}` embed, not a Place ID-based embed. Will not reflect the actual GBP listing (hours, reviews, photos) once one exists |
| "Get Directions" link | Not present as a distinct CTA (map embed itself is clickable, but no explicit directions link/button) |
| Review widget pulling live Google reviews | Not present — testimonials are static, hardcoded, not sourced from GBP |
| GBP posts / photo evidence indicators | N/A — no live listing yet |
| Click-to-call | Present site-wide (`tel:` links in header/footer/contact/mobile booking bar) |
| Click-to-WhatsApp | Present site-wide, well-implemented (desktop floating button + mobile booking bar + CTAs) |

---

## Review Health Snapshot

- **Rating shown on-site:** All 3 testimonials hardcoded at 5/5 stars (`constants/testimonials.ts`). This is placeholder content — per project memory, placeholder copy is acceptable pre-signoff but **must be flagged before real launch**.
- **Review count:** None (3 testimonials, not a review count claim)
- **`aggregateRating` in schema:** **Missing.** `getLocalBusinessSchema()` in `lib/schema.ts` does not include an `aggregateRating` or `review` property. Acceptable pre-launch (no real reviews exist to reference — adding a fake `aggregateRating` would violate Google's structured data policy), but this needs to be added once real GBP reviews accumulate post-launch.
- **Review velocity:** N/A pre-launch. Flag for post-launch: Sterling Sky's "18-day rule" — rankings fall off if no new reviews land within 3 weeks, and the "Magic 10" threshold gives a ranking boost at 10 reviews. A review-generation workflow (WhatsApp/SMS follow-up after each trip) should be planned before launch, not after.
- **Response rate to reviews:** N/A, no live listing yet.
- **All 3 testimonial avatars use the same generic stock image** (`IMAGES.avatar`) — a launch-blocking authenticity issue once these are presented as real customer reviews; should use real photos or remove avatars.

---

## Trust & Safety / E-E-A-T Signals (Adventure Tourism-Specific)

Adventure tourism carries elevated E-E-A-T expectations (physical risk to the customer) and, in India specifically, rafting operators are expected to hold registration with the Uttarakhand Tourism Development Board / district administration. Checked all 10 pages for licensing, insurance, and accreditation language.

| Signal | Status |
|---|---|
| "Certified guides" claim | Present (About page, homepage) — but **generic**, no naming of the certifying body (e.g., no mention of a specific rafting/lifeguard certification, IRF, or first-aid certification standard) |
| Government/tourism department license or registration number | **Not found anywhere on the site** |
| Insurance coverage statement (customer accident/liability insurance) | **Not found anywhere on the site** |
| Named safety equipment standards (e.g., ISI-marked life jackets, helmet standard) | Not found — safety copy on `/about` is qualitative ("gear is inspected") but not backed by a standard/certification name |
| Guide bios / individual credentials | Not found — guides referenced only as a collective ("certified guides," "25+ Expert Guides" in Achievements counter) |
| First-aid / medical support claim | Present ("First-aid support on hand at every base point") — good, but not tied to a certification |
| Weather/river-condition contingency policy | Present, briefly (About page safety section) |
| Age/health restrictions, waiver/consent process | Not found on the audited pages (may exist in Terms of Use — not in scope of this fetch, worth checking) |

This is the single biggest **content trust gap** on the site relative to the risk profile of the activity being sold. Competing Rishikesh rafting operators commonly display their Uttarakhand Tourism registration number and named insurance coverage prominently — this site currently has neither.

---

## Local Schema Validation

**Schema type used:** `SportsActivityLocation` (site-wide, injected once in `app/layout.tsx`, present on all 10 pages) + `TouristAttraction` (also site-wide) + `BreadcrumbList` (per-page) + `ItemList` (homepage, package list) + `FAQPage` (package pages only).

### `SportsActivityLocation` (functions as the LocalBusiness entity)

| Property | Required/Recommended | Status |
|---|---|---|
| `name` | Required | Present — "Shivalik Ganga Adventure" |
| `address` (PostalAddress) | Required | Present, complete (streetAddress, locality, region, postalCode, country) |
| `geo` | Recommended, 5 decimal places min | **Present but under-precise** — `30.1667, 78.3667` is only 4 decimal places (~11m accuracy vs. the recommended ~1.1m at 5 decimals). Needs to be replaced with the exact GBP-verified coordinates at launch |
| `telephone` | Recommended | Present, matches on-page NAP |
| `openingHoursSpecification` | Recommended | Present — Mon-Sun 06:00-20:00, matches visible "Mon - Sun 6:00 AM - 8:00 PM" |
| `url` | Recommended | Present, points to `COMPANY.url` (the future production domain, not the current preview URL — correct forward-looking choice, but see Critical launch note below) |
| `priceRange` | Recommended | Present but generic (`"₹₹"`) — not reflective of actual per-person package pricing spread |
| `image` | Recommended | Present (`opengraph-image`) |
| `sameAs` | Recommended for entity linking | Present, links to all 4 social profiles including Twitter/X (which isn't linked in the visible UI — see NAP section) |
| `aggregateRating` / `review` | Recommended | **Missing** — expected pre-launch, add once real reviews exist |
| `@id` | Best practice | Present (`{url}/#business`) |

### `TouristAttraction`

Present with `name`, `description`, `url`, `touristType`, `address` (partial — no street), `geo`, `@id` (`{url}/#attraction`). **Not linked** to the `SportsActivityLocation` entity via `subjectOf`/`mainEntityOfPage`/`about` — the two entities exist independently in the graph rather than being explicitly connected, which is a missed opportunity for entity clarity (low-severity, schema is not a direct ranking factor per Google, but affects entity understanding for AI search).

### Multi-schema footprint per package page

Each of the 6 package pages carries `SportsActivityLocation` + `TouristAttraction` + `BreadcrumbList` + `FAQPage` (the last two injected per-page and route-specific, which is correct). This is a reasonable, non-spammy structured data footprint.

---

## Citation Presence

**Cannot be meaningfully assessed pre-launch.** The production domain is not live, so no directory (Yelp, BBB, JustDial, TripAdvisor, GetYourGuide, Uttarakhand Tourism directory, etc.) can plausibly reference it yet. Note that Yelp/BBB (the skill's default Tier 1 set) are low-relevance for an India-based rafting operator — the higher-value citation targets for this business at launch are:

- Google Business Profile (primary — see Critical actions below)
- TripAdvisor (very high consumer trust for adventure/tour activities)
- JustDial (India's dominant local directory)
- GetYourGuide / Viator (bookable-activity marketplaces with strong SERP presence for "Rishikesh rafting" queries)
- Uttarakhand Tourism Development Board operator directory (also doubles as the registration/licensing signal noted in the Trust & Safety section)
- Instagram/Facebook Business (already have handles reserved per `constants/config.ts`)

This is flagged as a limitation, not a defect — no action is possible until the domain and GBP go live.

---

## Location Page Quality (Route Pages)

Not a traditional multi-location scenario (see note above), but evaluated the 6 package/route pages as the local-intent equivalent:

- Each route page (Brahmpuri, Shivpuri, Marine Drive, Kaudiyala, Kaudiyala-to-Shivpuri Extreme, Camping+Rafting Combo) has **distinct, non-templated content** — different rapid names (Roller Coaster, Golf Course, Sweet Sixteen, Terminator), different grades (II through IV), different framing (beginner-friendly vs. full-day expedition). Confirmed via direct text-length/content comparison across 4 sampled route pages (2,318–2,798 characters of body content each, non-identical).
- Each has its own `FAQPage` schema and `BreadcrumbList` — good internal signal of a dedicated page rather than a thin doorway page.
- This aligns well with the #1 local organic ranking factor identified in Whitespark 2026 (dedicated service pages).
- Gap: none of the route pages state the specific put-in/take-out GPS coordinates or distance/drive-time from the main base address — would strengthen both user trust (pickup logistics) and geo-relevance signaling.

---

## Top 10 Prioritized Actions

**Critical**
1. **Flip `robots.ts` (currently `disallow: "/"`) and `layout.tsx` metadata (`robots: { index: false, follow: false }`) to allow indexing before/at production launch.** Site is currently 100% blocked from crawling — no local (or any) SEO signal can accrue until this changes. Confirm this is intentional for the current pre-launch phase, but track as a hard launch-day gate.
2. **Claim and verify a Google Business Profile** on the production domain the moment it's live. Select the correct primary category (highest-weighted ranking factor in Whitespark 2026, score 193) — likely "River Rafting" or closest available GBP category; wrong category is the #1 negative factor (score 176). Note that GBP's verification **address** (not the on-site copy) becomes the ranking-relevant anchor once claimed.
3. **Add government/tourism-board registration or license info and insurance coverage statement to `/about`.** For an adventure-risk activity, the total absence of licensing/insurance language is a material E-E-A-T and consumer-trust gap, and a common competitor differentiator in this market.
4. **Ensure GBP NAP will match the site's `COMPANY` object exactly** (name, address, phone) at claim time — the site's centralized NAP is launch-ready and should be used as the literal source of truth for GBP setup, not re-typed.

**High**
5. **Replace placeholder testimonials with real customer reviews (or clearly mark as illustrative) before public launch**, and add distinct avatar images. Per project convention this is acceptable as placeholder pending sign-off, but must be resolved before go-live — publishing fabricated-looking 5-star reviews with identical stock avatars is a credibility risk once real traffic arrives.
6. **Increase `geo` coordinate precision from 4 to 5+ decimal places** in `constants/config.ts` once the exact operating/put-in location is confirmed, and align it with the eventual GBP pin.
7. **Set up a post-trip review-generation workflow** (WhatsApp/SMS prompt) ahead of launch — Sterling Sky's 18-day rule means review velocity, not just volume, drives rankings; plan this before day 1 rather than reactively.
8. **Register on TripAdvisor, JustDial, and GetYourGuide/Viator** at launch — higher-relevance citation sources for an India-based adventure/tour operator than the generic Yelp/BBB set.

**Medium**
9. **Add the Google Maps embed to `/about` and/or `/destinations`**, not just `/contact` — reinforces location signal on higher-traffic entry pages, and switch the embed from a generic lat/long query to a Place-ID-based embed once GBP is verified.
10. **Link the `SportsActivityLocation` and `TouristAttraction` schema entities together** (e.g., `TouristAttraction.subjectOf` referencing the business `@id`), add `aggregateRating` once real reviews exist, and either remove the Twitter/X link from schema `sameAs` or add it to the visible footer so schema and UI agree.

**Low**
- Reconcile generic `priceRange: "₹₹"` with actual package pricing tiers for more accurate schema representation.
- Add specific put-in/take-out GPS coordinates or drive-time-from-base info to each route page.
- Confirm `www` vs. apex domain redirect strategy is configured correctly at DNS/hosting cut-over (schema/canonical URLs already point to `https://www.shivalikgangaadventure.com`).

---

## Limitations Disclaimer

- **No live Google Business Profile exists** (production domain not yet launched) — GBP category, verification status, photo count, Q&A, posts, popular times, and live review data could not be assessed. All GBP findings in this report are on-page proxy checks only.
- **DataForSEO MCP tools were not available/used in this session** — `local_business_data` and `google_local_pack_serp` live data were not queried. If available in a later pass, re-run this audit post-launch for real Maps SERP position and live GBP completeness scoring.
- **Social media profiles (Facebook, Instagram, Twitter/X, YouTube) referenced in `constants/config.ts` could not be independently verified for content/activity** — likely not populated pre-launch; only confirmed that the URLs are correctly wired into site schema/footer.
- **Citation presence (TripAdvisor, JustDial, GetYourGuide, Uttarakhand Tourism directory, etc.) could not be checked** since the business isn't discoverable under its production domain yet.
- **Terms of Use / waiver / consent content was not fetched in this pass** (out of the page list provided) — recommend a follow-up check for age restrictions, liability waiver language, and refund/cancellation policy, all of which intersect with E-E-A-T for a physical-risk activity.
- **Proximity** (55.2% of local ranking variance per Search Atlas ML study) is outside on-page control entirely and not scoreable via this audit.
