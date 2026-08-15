# Search Experience Optimization (SXO) Audit
**Site:** Shivalik Ganga Adventure — https://shivalik-ganga-adventure.vercel.app/ (pre-launch Vercel preview; production domain will be https://www.shivalikgangaadventure.com)
**Business type:** Local Service — river rafting / adventure tourism, Rishikesh, Uttarakhand
**Pages audited:** `/` (home), `/packages` (index), `/packages/brahmpuri-to-rishikesh` (package detail), `/blog/best-time-for-rafting-rishikesh` (blog post)
**Method:** `render_page.py --mode auto --output` (full HTML capture, raw/SSR content — `is_spa=False` on every page, no JS render needed) + `parse_html.py --json` for structured extraction, plus WebSearch SERP sampling for 3 representative queries.

---

## Top-Line Finding

**No severe page-type mismatch was found.** All four pages are structurally the *right kind of page* for their target query (Local/Hybrid service page for home, Product-comparison hub for `/packages`, transactional Product/Service page for the package detail, and a Blog Post for the seasonal-guide article). The package detail page in particular is a genuinely strong template — price, duration, distance, grade, group size, minimum age, itinerary, inclusions/exclusions, and an FAQ all sit in the first two screens, which is exactly what the "Rishikesh rafting packages price"-style SERP rewards (competitor titles literally lead with price, e.g. "₹399", "₹499", "₹599").

The real risks are (1) a sitewide indexing blocker, (2) structured-data (schema) misallocation between the home page and `/packages`/package pages, and (3) informational content depth on the blog that falls short of what ranks for seasonal-guide queries.

---

## CRITICAL

### C1. Sitewide `noindex, nofollow` will block indexing entirely
Every audited page returns `meta_robots: "noindex, nofollow"`. This is expected/appropriate for a Vercel preview deployment (prevents the preview domain from competing with the future production domain — the `canonical` tags already correctly point to `https://www.shivalikgangaadventure.com`, which is good hygiene). **Flagging as Critical because it must be explicitly removed as part of the production cutover checklist** — every other finding in this report is moot until this directive is lifted on the live domain. Recommend a pre-launch QA gate that greps for `noindex` across the deployed production build before DNS cutover.

---

## HIGH

### H1. Package detail pages show price but carry no price/offer schema — a mismatch with a price-led SERP
The Brahmpuri package page displays `₹599 (was ₹799)`, `2 Hours · 9 KM · Grade II`, `Group size: 2–30`, `Minimum age: 8+` in the DOM, but its JSON-LD only contains `SportsActivityLocation`, `TouristAttraction`, `BreadcrumbList`, and `FAQPage` — **no `Offer`, `Product`, or `TouristTrip` schema**. SERP sampling for "Rishikesh rafting packages price" shows competitor titles leading with price (`₹399`, `₹499`, `₹599`) — a strong signal Google is surfacing/rewarding price-carrying structured data for this query cluster. The price data already exists correctly formatted in JSON-LD — just on the wrong page (see H2). Every package detail page should carry its own `TouristTrip`/`Offer` schema mirroring the price actually shown on that page.

### H2. Package pricing schema lives on the homepage, not on `/packages` (the natural comparison-query landing page)
The homepage carries a full `ItemList` of six `TouristTrip` items with `Offer`/price/`priceCurrency`/`availability` for every package. `/packages` — the page that structurally matches the "Rishikesh rafting packages price" comparison-query SERP type — has **no `ItemList` or `Offer` schema at all** (only `SportsActivityLocation`, `TouristAttraction`, `BreadcrumbList`). This is backwards: the comparison/pricing structured data should live on (or be duplicated to) `/packages`, which is the page most likely to earn a price-comparison rich result.

### H3. No Review/AggregateRating schema despite three named testimonials on the homepage
Home page displays three specific, attributed reviews (Rohan Malhotra – Shivpuri; Ananya Kapoor – Camping Combo; Vikram Sethi – Kaudiyala Extreme) but no `Review` or `AggregateRating` schema wraps them. For a commercial local-service query cluster where competitor listings (Thrillophilia, TripAdvisor) commonly carry star ratings, this is a missed CTR/trust rich-result opportunity.

### H4. Malformed `image` URL in the blog post's `BlogPosting` schema
`"image": "https://www.shivalikgangaadventure.comhttps://images.unsplash.com/photo-1606349779646-b6ca5df78bdf?..."` — the production domain and the Unsplash URL are concatenated with no separator (missing `/` and duplicate scheme). This breaks Google Article/BlogPosting rich-result image eligibility outright; it needs to be a single valid absolute URL.

---

## MEDIUM

### M1. Blog post is thin relative to the informational SERP consensus
307 words spread across 5 H2 sections (~60 words/section). SERP sampling for "best time for river rafting in Rishikesh" is dominated by "2025/2026 guide"-style posts that typically add month-by-month water temperature/flow data, rapid-grade shifts by season, and packing/safety notes per season — more granular than SGA's current three-sentence-per-season treatment. Authorship is attributed to a generic `"Organization"` (`Shivalik Ganga Adventure Team`), not a named guide/expert — a real E-E-A-T gap for advice content genre. Recommend `/seo content` for a deeper content-depth pass, and adding a named author (e.g., a lead river guide) with credentials.

### M2. `/packages` index has no decision-support content
187 words total, essentially just the six package cards (which do show price + km + duration + grade — genuinely useful). But there is no "which package is right for you" guidance, no explanation of what Grade I–IV means, and no persona-routing copy (e.g., "New to rafting? Start with Brahmpuri"). For a comparison-stage searcher scanning 6 similar-looking cards, this creates the "comparison fatigue" barrier described in the user-story framework.

### M3. No visible map embed despite full NAP + geo-coordinates in schema
`LocalBusiness`/`SportsActivityLocation` schema carries a complete address and lat/long, but no Google Maps embed or "get directions" module was found in the rendered HTML of any audited page. Local-intent SERPs for this category typically surface a Map Pack; on-page, a first-time visitor unfamiliar with Rishikesh has no visual way to confirm how to reach the base point beyond a street-address string.

### M4. WhatsApp is the only real-time booking path
Every "Book Now" CTA on `/packages` and the package detail page routes to a pre-filled WhatsApp message; there is no on-site date/slot selection, instant confirmation, or visible cancellation/refund policy. This is a viable low-friction channel for the India-based domestic tourist majority, but it introduces friction for international visitors unfamiliar with or unable to use WhatsApp for booking, and offers no proof of instant availability (the homepage's "Preferred Date" search field appears to be a package filter, not an actual booking/availability check).

---

## LOW

### L1. Home page H1 omits the location keyword
H1 is "Find Your Perfect Rafting Adventure Today" — generic; "Rishikesh"/"Ganga" appear in the title tag and body copy but not the H1 itself, slightly softening on-page topical relevance versus the dominant SERP pattern where titles consistently pair the activity with the place name.

### L2. Package-detail FAQ is limited to 3 questions
Covers beginner-safety, swimming ability, and what to wear. Likely unaddressed PAA-style questions for this query cluster (based on competitor content patterns): cancellation/refund policy, what happens if it rains, whether photos/videos are included, and monsoon-closure dates — several of which are already answered elsewhere on the site (exclusions list mentions "Photography/videography (available on request)") but not folded into the FAQPage schema itself.

### L3. Several content images have empty `alt` text
On the homepage, packages index, and blog post, a handful of hero/background images have `alt=""` (e.g., the top hero backgrounds on all three page types). Minor accessibility/image-SEO gap — recommend `/seo page` for a full image-alt audit.

---

## Page-Type Classification (vs. `page-type-taxonomy.md`)

| Page | Target intent | Classified type | SERP dominant type (sampled) | Mismatch severity |
|---|---|---|---|---|
| `/` (home) | "river rafting Rishikesh booking" | Local Page / Hybrid (Service+Content) | Mix of Local/Product-Service hybrid operator pages (₹-led titles), 1 review aggregator (TripAdvisor), 1 travel-guide site | **ALIGNED** (schema/trust gaps only, see H3/M3) |
| `/packages` | "Rishikesh rafting packages price" | Comparison/Product listing | Price-comparison / route-listing operator pages, price in title | **ALIGNED** (schema gap, see H2/M2) |
| `/packages/brahmpuri-to-rishikesh` | "book Brahmpuri rafting Rishikesh" (transactional) | Product/Service Page | Same operator cluster as above, individual route/price pages | **ALIGNED** — strongest-performing page type-wise (see H1) |
| `/blog/best-time-for-rafting-rishikesh` | "best time for river rafting in Rishikesh" | Blog Post | Informational "guide" blog posts, month-wise breakdowns | **ALIGNED type, MEDIUM depth gap** (see M1) |

---

## User Stories (derived from SERP signals)

1. As a **budget-comparing tourist**, I want to see price per route at a glance, because I'm mentally comparing 4-5 operators' listings that all lead with price in the title, but I'm blocked by **price sensitivity** if the number isn't immediately visible. *(Source: competitor titles "₹399", "₹499", "₹599"; `/packages` and package-detail pages already satisfy this — the gap is only that this price isn't reinforced in schema, see H1/H2.)*

2. As a **nervous first-time rafter**, I want direct reassurance that a specific route is safe for beginners, because I'm anxious about white-water conditions, but I'm blocked by an **information gap** if that reassurance isn't in the first screen. *(Source: package copy already targets this — "gentle introduction... perfect for beginners and families" — and the FAQ opens with "Is this route safe for beginners? Yes—", which is a genuine strength.)*

3. As a **parent booking for children**, I want to know the minimum age and group-size limits before committing, because I need to plan for my kids, but I'm blocked by having to click into each individual package page to find this (not shown on `/packages` cards). *(Source: `/packages` cards show price/km/duration/grade but not age; only the detail page shows "Minimum age: 8+".)*

4. As an **experienced thrill-seeker**, I want to quickly find the hardest available route, because I've rafted before and want a real challenge, but the "Most Popular" homepage carousel only surfaces the 3 gentler routes (Brahmpuri/Shivpuri/Marine Drive) — the Grade IV "Kaudiyala to Shivpuri Extreme" route requires scrolling past the destinations grid or visiting `/packages`. *(Source: testimonial "As an experienced rafter, I wanted a real challenge" is featured, but the homepage doesn't cross-link that testimonial to its route card.)*

5. As a **trip-planning researcher**, I want a genuinely detailed season-by-season breakdown before I commit to travel dates, because rafting availability is weather-dependent, but I'm blocked by **thin content** (~60 words per season) relative to competing guide posts. *(Source: SERP sampling shows competing "2025/2026 guide" posts with deeper month-wise detail; see M1.)*

---

## Persona Scoring (3 personas × 4 pages, 0–100 scale)

| Persona | Home | `/packages` | Package detail (Brahmpuri) | Blog post |
|---|---|---|---|---|
| **Nervous First-Time Beginner** | 78 — Good | 65 — Good | **88 — Excellent** | 55 — Needs Work |
| **Experienced Thrill-Seeker** | 72 — Good | 80 — Good | 40 — Critical Mismatch* | 60 — Good |
| **Parent Booking for Family** | 68 — Good | 60 — Good | 85 — Excellent | 55 — Needs Work |

\* *Not a defect* — the Brahmpuri page is the beginner route, so a thrill-seeker persona correctly self-disqualifying on this specific page is expected/desired UX; the Grade IV "Kaudiyala to Shivpuri Extreme" page would need to be audited separately to score this persona's decision-stage page fairly.

**Weakest page overall: the blog post** (avg. ~57/100 across personas). It correctly segments seasons by persona ("peak season for experienced rafters," "popular choice for families and first-timers") but never links forward at the moment of persona-match — e.g., the Sept–Nov section mentioning thrill-seekers doesn't CTA to the Kaudiyala package, and the March–May section mentioning families doesn't CTA to Brahmpuri.

**Strongest page overall: the package detail page** — the itinerary + inclusions/exclusions + price + FAQ combination is doing real persona-serving work, especially for the beginner/family personas.

---

## SXO Gap Score (7 dimensions, 100 pts each page — separate from any SEO Health Score)

| Dimension (max) | Home | `/packages` | Package detail | Blog post |
|---|---|---|---|---|
| Page Type (15) | 13 | 13 | 15 | 12 |
| Content Depth (15) | 10 | 6 | 11 | 5 |
| UX Signals (15) | 12 | 12 | 13 | 9 |
| Schema (15) | 11 | 6 | 9 | 6 |
| Media (15) | 10 | 10 | 8 | 7 |
| Authority (15) | 6 | 6 | 6 | 3 |
| Freshness (10) | 6 | 6 | 6 | 8 |
| **Total** | **68/100** | **59/100** | **68/100** | **50/100** |

Evidence for low-scoring dimensions:
- **Authority (all pages, 3-6/15):** no named credentials/certifications beyond the unverified claim "certified guides"; no linked government rafting-operator registration; blog author is a generic Organization, not a named person.
- **Schema (`/packages`, 6/15):** missing `ItemList`/`Offer` entirely (see H2).
- **Content Depth (blog, 5/15):** 307 words across 5 sections (see M1).
- **Freshness (home/packages/detail, 6/10):** `publication_date` reads as a generic build date; homepage "Achievements" counters render as "0+" in the captured HTML (client-side count-up animation not yet triggered in raw HTML) — cosmetically this could read as a broken/placeholder stat to a bot or JS-disabled crawler pass, worth confirming it animates correctly and has a non-zero server-rendered fallback.

---

## Limitations

- The site is pre-launch and sitewide `noindex, nofollow` (see C1) — it does not currently rank for any query. Findings compare the site's **content/structure** against real, currently-ranking competitor pages for representative queries; they are not a report of the site's actual live ranking position.
- WebSearch was used for SERP sampling (3 queries: "river rafting Rishikesh booking", "Rishikesh rafting packages price", "best time for river rafting in Rishikesh"). This tool returns AI-summarized result sets rather than raw SERP HTML/screenshots, so exact SERP feature presence (Map Pack, PAA question text, featured-snippet format, ad density) is inferred from summarized signals and general category norms, not pixel-verified. A `/seo local` GBP-focused pass is recommended once the site is live to confirm actual Local Pack behavior.
- Only 4 of the site's pages were audited in depth (home, `/packages`, one of six package detail pages, one of three blog posts). The other five package pages, two other blog posts, `/destinations`, `/about`, and `/contact` were not individually parsed or scored.
- Per user memory: some site copy/offers are documented as placeholder pending client sign-off; this audit assesses structure and SEO/SXO mechanics as currently built, not final marketing copy — flag before real launch.

---

## Recommended Follow-ups

- **Critical:** Add a pre-launch checklist item to remove `noindex, nofollow` on the production domain only.
- Missing/misallocated schema (H1–H4) → run `/seo schema` to generate correct `TouristTrip`/`Offer` schema for each package page and `/packages`, plus `AggregateRating`/`Review` schema, and fix the blog's malformed `image` field.
- Blog content depth and E-E-A-T (M1) → run `/seo content` for a deeper content-brief pass on the 3 existing posts.
- Local trust signals (M3) → run `/seo local` for a GBP/map-embed checklist once the production domain and Google Business Profile are live.
- Thin `/packages` decision-support content (M2) → run `/seo page` for a page-level content audit and copy recommendations.

Generate a PDF report? Use `/seo google report`.
