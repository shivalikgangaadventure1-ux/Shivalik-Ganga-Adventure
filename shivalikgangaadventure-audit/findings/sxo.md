# Search Experience Optimization (SXO) Audit
**Site:** Shivalik Ganga Adventure — local production build, `http://localhost:4100` (canonical tags correctly point to production domain `https://www.shivalikgangaadventure.com`)
**Business type:** Local Service — river rafting / adventure tourism, Rishikesh, Uttarakhand
**Pages audited:** `/` (home), `/packages` (index), `/packages/brahmpuri-to-nim-beach` (package detail, new slug pattern `-to-nim-beach`), `/blog/best-time-for-rafting-rishikesh` (blog post)
**Method:** Raw HTML fetch of the four target pages (Next.js SSR — full markup present pre-hydration, confirmed by comparing rendered word counts against source) + `parse_html.py --json` for structured extraction (title/meta/headings/schema/images/links), plus targeted DOM section extraction for copy verification, plus WebSearch SERP sampling for 3 representative queries. This is a **fresh, independent pass** run after an earlier audit today; every "previously flagged" claim below was re-verified against the live local build, not assumed from the prior report.

---

## Fix Verification (from the prior audit's HIGH findings)

| # | Prior finding | Status | Evidence |
|---|---|---|---|
| 1 | Package detail pages missing `TouristTrip`/`Offer` schema | **FIXED** | `/packages/brahmpuri-to-nim-beach` now carries a full `TouristTrip` node (`@id .../brahmpuri-to-nim-beach#trip`) with `itinerary` (4-step `ItemList`), `provider` link to the business entity, and `offers` (`Offer`, price 599, `INR`, `InStock`, `priceValidUntil: 2026-12-31`, `validFrom: 2026-08-15`). |
| 2 | `/packages` missing `ItemList`/`Offer` for the catalog | **FIXED** | `/packages` now carries an `ItemList` with all 5 `TouristTrip` items (Brahmpuri ₹599, Club House ₹699, Shivpuri ₹799, Marine Drive ₹1199, Kaudiyala ₹2499), each with correctly nested `Offer` schema matching the visible price on the page. |
| 3 | Blog `BlogPosting.image` double-prefixed the domain onto an absolute Unsplash URL | **FIXED** | `image` now reads `"https://images.unsplash.com/photo-1606349779646-b6ca5df78bdf?q=80&w=2000&auto=format&fit=crop"` — a single valid absolute URL, matching `og:image`/`twitter:image`. No malformation. |
| 4 | `/packages` had no decision-support copy | **FIXED — and stronger than the minimum bar** | New H2 "Which Package Is Right for You?" includes: a plain-language grade explainer ("Grade I (flat, easy water) to Grade VI... Our 5 routes span Grade I-II, gentle and forgiving... through Grade III... up to Grade IV..."), explicit persona routing ("New to rafting or bringing kids? Start with Brahmpuri... Want real rapids? Shivpuri or Marine Drive... Chasing the biggest water? Kaudiyala..."), **plus** a full 5-row comparison table (Distance / Duration / Grade / Price / **Best For**) that goes beyond what was asked for. |

**Bonus items also verified fixed, not on the original tracked list:**
- The blog now has a named author with credentials: `"author": {"@type": "Person", "name": "Arjun Rawat", "jobTitle": "Lead Rafting Guide, 12 years on the Ganga"}` — directly resolves the prior audit's E-E-A-T gap (generic `Organization` byline).
- Blog word count is now **867 words** (parsed `word_count`), up from the prior ~307 — confirmed genuinely deeper (month-by-month water temperature in °C, named rapids like "Roller Coaster" and "Golf Course," monsoon-closure logic, an "Our Recommendation" synthesis section, and mid-content persona-to-package cross-links, e.g. the Sept–Nov section now names and links `Kaudiyala to Nim Beach` for thrill-seekers, and the Mar–May section links `Brahmpuri to Nim Beach` and `Club House to Nim Beach` for families).
- Package detail FAQ expanded from 3 to 5 questions, now including "What happens if it rains?" and hotel pickup — both explicitly called out as gaps in the prior audit's L2.
- `Review`/`AggregateRating` schema remains **deliberately absent** across all four pages, as instructed — confirmed correctly withheld, not flagged as missing.

This is a genuinely strong remediation pass. The rest of this report covers what's left.

---

## Top-Line Finding

**No page-type mismatch.** All four pages remain the right *kind* of page for their target query, and the fixes above have measurably closed the structured-data and content-depth gaps the prior audit's HIGH findings were built on. `/packages` in particular has moved from a thin, schema-less listing page to a genuine Comparison-Page-type asset (grade explainer + persona routing + full spec table), which is now one of the stronger pages on the site rather than one of the weakest.

The remaining risks are smaller and more surgical: (1) the sitewide indexing blocker (known, tracked, not new), (2) one missed schema-parity opportunity (blog FAQ content isn't marked up as `FAQPage`, even though the same pattern is already implemented correctly on the package detail page), (3) the persona-routing win on `/packages` is uneven — only the Brahmpuri row's "Best For" column states minimum age, and (4) a couple of small content-accuracy/UX items (a stat inconsistency, no map embed, WhatsApp-only booking).

---

## CRITICAL

### C1. Sitewide `noindex, nofollow` + `Disallow: /` will block indexing entirely
Every audited page returns `meta_robots: "noindex, nofollow"`, and `robots.txt` is `User-Agent: * / Disallow: /`. This is expected for a pre-launch build — canonical tags already correctly point to `https://www.shivalikgangaadventure.com` — but it must be explicitly removed as part of the production cutover checklist; every other finding in this report is moot until that directive is lifted on the live domain. **This is a known, already-tracked, deliberate pre-launch state, not a new discovery** — carried forward unchanged from the prior audit. Recommend a pre-launch QA gate that greps for `noindex`/`Disallow` across the deployed production build before DNS cutover.

---

## HIGH

### H1. Blog post's visible FAQ has no `FAQPage` schema — a missed parity win against the site's own pattern
The blog post's rendered HTML includes an H2 "Frequently Asked Questions" with 3 genuinely useful Q&As ("Is rafting available every day of the year except the monsoon closure?", "Which season has the biggest rapids?", "What if I can only travel during the monsoon closure?"). But the page's `schema` array contains only `SportsActivityLocation`, `TouristAttraction`, `BreadcrumbList`, and `BlogPosting` — **no `FAQPage`**. The package detail page already implements this exact pattern correctly (5-question `FAQPage` block). Since Blog Post is the page type in the taxonomy where PAA/featured-snippet-style rich results are most rewarded, and the content and copy already exist, wrapping the existing 3 Q&As in `FAQPage` schema is a low-effort, direct-upside fix — recommend `/seo schema`.

---

## MEDIUM

### M1. `/packages` persona-routing/age-suitability copy is uneven across the comparison table
The new "Best For" column is a strong addition, but only the Brahmpuri row spells out family/age suitability explicitly ("First-timers, families, children (8+)"). The other four rows ("Beginners wanting a bit more current," "Signature run, most popular," "Rapids plus calm pools to swim," "Experienced, fit thrill-seekers") don't restate the minimum age or explicitly flag family-friendliness, so a parent comparing Club House or Marine Drive against Brahmpuri still has to open the individual package page to confirm the 8+ minimum applies (or doesn't) there too. This is a partial fix of the prior audit's user story 3 ("parent blocked by having to click into each package to find age/group-size") — worth a one-line addition to each "Best For" cell (e.g., "Beginners wanting a bit more current, children 8+" for Club House) rather than a structural change.

### M2. No visible map embed despite full NAP + geo-coordinates in schema
`SportsActivityLocation` schema on every page carries a complete address and lat/long, but no Google Maps embed or "get directions" module appears in the rendered HTML of any audited page (confirmed: zero `<iframe>` or `maps.google` references site-wide). Unchanged from the prior audit. A first-time visitor unfamiliar with Rishikesh still has no visual way to confirm how to reach the base point beyond a street-address string.

### M3. WhatsApp remains the only real-time booking path
Every "Book Now"/"WhatsApp Booking" CTA across all four pages routes to a pre-filled `wa.me` message; there is no on-site date/slot selection, instant confirmation, or visible cancellation/refund policy. Unchanged from the prior audit. Viable low-friction channel for the India-based domestic majority, but a friction point for international visitors and offers no proof of real-time availability.

### M4. Homepage "Our Achievements" stat ("8 Rafting Routes") is inconsistent with the site's own 5-package catalog
The homepage counters read "15,000+ Happy Rafters," "**8 Rafting Routes**," "5,000+ Successful Trips," "25+ Expert Guides" — but the title, meta description, `/packages` meta description, and every schema block on the site consistently describe **5** routes to Nim Beach (and the destinations grid shows 6 named spots, not 8 either). This reads as a leftover placeholder number from before the catalog was reduced to 5 real packages, and it's the kind of small inconsistency a careful visitor (or Google, cross-referencing schema against on-page copy) could notice. Per project notes, some copy is still placeholder pending client sign-off — flagging this explicitly before real launch rather than treating it as final.

---

## LOW

### L1. Home page H1 omits the location keyword
H1 is still "Find Your Perfect Rafting Adventure Today" — generic; "Rishikesh"/"Ganga" appear in the title tag and body copy but not the H1 itself. Unchanged from the prior audit.

### L2. A handful of images still carry empty `alt` text
On the package detail page, the main hero/package image itself (`brahmpuri-to-nim-beach.webp`) has `alt=""` (the descriptive alt text is used correctly for the same image when it appears as a card thumbnail on `/` and `/packages`, just not on its own detail-page hero). Background/decorative images (`achievements-bg`, `cta-bg`) also carry `alt=""` sitewide, which is acceptable for purely decorative backgrounds but worth confirming intent. Minor accessibility/image-SEO gap — recommend `/seo page` for a full image-alt audit.

### L3. Homepage's `ItemList` schema intentionally covers only 3 of 5 packages — correctly scoped, but worth noting
The homepage's "Most Popular Rafting Packages" section shows exactly 3 cards (Brahmpuri, Club House, Shivpuri) and its `ItemList` schema matches that 1:1 — this is **correct**, not a bug (the prior audit's H2 about schema being scoped wrong is resolved now that `/packages` independently carries the full 5-item catalog). The residual effect is that the homepage's primary package-schema surface and its "Most Popular" carousel still don't surface the Grade IV Kaudiyala route (the thrill-seeker persona's page) — consistent with user story 4 below, and mitigated by the fact that both `/packages` and the blog post now actively route thrill-seekers to Kaudiyala.

---

## Page-Type Classification (vs. `page-type-taxonomy.md`)

| Page | Target intent | Classified type | SERP dominant type (sampled) | Mismatch severity |
|---|---|---|---|---|
| `/` (home) | "river rafting Rishikesh booking" | Local Page / Hybrid (Service+Content) | Operator/agency pages (price-led titles, e.g. "River Rafting in Rishikesh — Price ₹399/₹499"), 1 travel-guide/directory site | **ALIGNED** |
| `/packages` | "Rishikesh rafting packages price" | Comparison Page (upgraded from prior "listing hub" classification — now has grade explainer, persona routing, and a full spec/price comparison table) | Price-led operator pages, "5 Best Rishikesh Rafting Packages: Price Start @ ₹499" style listicles | **ALIGNED — stronger fit than prior audit** |
| `/packages/brahmpuri-to-nim-beach` | "book Brahmpuri rafting Rishikesh" (transactional) | Product/Service Page | Same operator cluster, individual route/price pages | **ALIGNED** — strongest-performing page type-wise |
| `/blog/best-time-for-rafting-rishikesh` | "best time for river rafting in Rishikesh" | Blog Post | Informational guide content; consensus answer is "March–May and September–November, avoid June–August monsoon" | **ALIGNED — depth gap from prior audit now closed** (see H1 for remaining schema-parity gap) |

SERP sampling (3 queries): "river rafting Rishikesh booking," "Rishikesh rafting packages price," "best time for river rafting in Rishikesh." Consistent with the prior audit's sampling — dominant competitor pattern is still price-in-title operator pages for commercial queries, and month-range informational guides for the seasonal query. No SERP feature shift observed since the last pass.

---

## User Stories (derived from SERP signals)

1. As a **budget-comparing tourist**, I want to see price per route at a glance, because I'm mentally comparing several operators' listings that all lead with price in the title, but I was previously blocked by price not being reinforced in schema. *(Source: competitor titles "₹399," "₹499," "₹599, "₹499.")* **Now resolved on `/packages`** — full comparison table + `ItemList`/`Offer` schema for all 5 packages.

2. As a **nervous first-time rafter**, I want direct reassurance that a specific route is safe for beginners, because I'm anxious about white-water conditions, but I need that reassurance before I click into a route page. *(Source: package copy targets this — "gentle introduction... perfect for beginners and families.")* **Improved** — `/packages` now pre-answers this at the comparison-table stage with "New to rafting or bringing kids? Start with Brahmpuri," not just after clicking through.

3. As a **parent booking for children**, I want to know the minimum age before committing, because I need to plan for my kids, but I'm still partly blocked by inconsistent "Best For" copy across the comparison table (see M1). *(Source: `/packages` table shows age only for the Brahmpuri row; other rows omit it.)*

4. As an **experienced thrill-seeker**, I want to quickly find the hardest available route, because I've rafted before and want a real challenge, but the homepage's "Most Popular" carousel still only surfaces the 3 gentler routes. *(Source: testimonial "the Grade IV stretch near Kaudiyala is no joke... recommended if you actually want a challenge" is featured on the homepage but not cross-linked to its route card there.)* **Partially resolved elsewhere** — `/packages` ("Chasing the biggest water on the Ganga? Kaudiyala...") and the blog's Sept–Nov section ("peak season for experienced rafters and thrill-seekers... Kaudiyala to Nim Beach route is at its most demanding") both now route this persona correctly; only the homepage carousel itself still doesn't.

5. As a **trip-planning researcher**, I want a genuinely detailed season-by-season breakdown before committing to travel dates, because rafting availability and conditions are weather-dependent. *(Source: SERP sampling shows the consensus answer is "March–May and September–November, avoid monsoon"; PAA-style questions cluster around "when are rapids biggest," "when is it closed.")* **Resolved** — the blog now delivers water-temperature ranges, named rapids, crowding/booking-lead-time advice, monsoon-closure logic, and a synthesis "Our Recommendation" section, authored by a named 12-year lead guide.

Stories span awareness (5), consideration (1, 2, 3), and decision (4) stages.

---

## Persona Scoring

Personas derived from SERP signals (competitor price-in-title pattern, PAA-style safety/timing questions, testimonial content, and the seasonal-guide query consensus). Each scored on Relevance / Clarity / Trust / Action (25 pts each) against its primary decision-point page, per the persona-scoring rubric, followed by a cross-page comparison grid.

### 1. Budget-Comparing Tourist — primary page: `/packages`
- Journey stage: Consideration
- SERP evidence: competitor titles leading with price (₹399/₹499/₹599/₹499)
- **Relevance 24/25** · **Clarity 24/25** · **Trust 22/25** · **Action 22/25** → **92/100 — Excellent**
- Full price/spec table + schema now directly matches the price-led SERP pattern.

### 2. Nervous First-Time Beginner — primary page: package detail (Brahmpuri)
- Journey stage: Consideration
- SERP evidence: "is rafting safe for beginners"-style intent implied by "beginner"/"family" qualifiers common in related searches; site copy already targets this directly
- **Relevance 23/25** · **Clarity 23/25** · **Trust 22/25** · **Action 22/25** → **90/100 — Excellent**
- Itinerary + FAQ ("Is the Brahmpuri to Nim Beach route safe for beginners? Yes...") + min-age disclosure do real work here.

### 3. Parent Booking for Family — primary page: `/packages`
- Journey stage: Consideration
- SERP evidence: "family"/"kids" qualifiers in the same related-search cluster as beginner intent
- **Relevance 20/25** · **Clarity 21/25** · **Trust 18/25** · **Action 19/25** → **78/100 — Good**
- **Top issue:** only the Brahmpuri row states minimum age/family suitability explicitly (see M1); Trust dimension held back because a parent evaluating any of the other 4 routes can't confirm age suitability without clicking through.
- **Recommended fix:** add a one-line age/family qualifier to all 5 "Best For" cells, not just Brahmpuri's.

### 4. Experienced Thrill-Seeker — primary page: `/packages`
- Journey stage: Decision
- SERP evidence: testimonial "I've rafted a couple of rivers before and this one held up... Grade IV stretch near Kaudiyala is no joke"
- **Relevance 22/25** · **Clarity 21/25** · **Trust 20/25** · **Action 22/25** → **85/100 — Excellent**
- Persona-routing line ("Chasing the biggest water on the Ganga? Kaudiyala to Nim Beach...") now serves this persona directly at the comparison stage.

### 5. Trip-Planning Seasonal Researcher — primary page: blog post
- Journey stage: Awareness
- SERP evidence: seasonal-guide SERP consensus ("March–May and September–November, avoid June–August monsoon")
- **Relevance 23/25** · **Clarity 22/25** · **Trust 21/25** · **Action 24/25** → **90/100 — Excellent**
- Month-by-month water temperature, named rapids, monsoon-closure logic, named 12-year-guide author, and a synthesis "Our Recommendation" section resolve the prior audit's thin-content finding directly.

### Cross-Page Comparison Grid (0–100 scale, all 4 pages)

| Persona | Home | `/packages` | Package detail (Brahmpuri) | Blog post |
|---|---|---|---|---|
| Budget-Comparing Tourist | 75 | **92** | 85 | 40 |
| Nervous First-Time Beginner | 78 | 80 | **90** | 70 |
| Parent Booking for Family | 68 | 78 | 88 | 68 |
| Experienced Thrill-Seeker | 72 | 85 | 40* | 78 |
| Trip-Planning Researcher | 55 | 60 | 55 | **90** |
| **Page average** | **69.6** | **79.0** | **71.6** | **69.2** |

\* *Not a defect* — Brahmpuri is the beginner route; a thrill-seeker correctly self-disqualifying on this specific page is expected/desired UX, not a mismatch.

**Weakest persona overall (primary-page score): Parent Booking for Family (78/100, "Good," not "Excellent")** — see M1 for the concrete fix.

**Weakest page overall: Blog post and Home are effectively tied (69.2 vs. 69.6)**, both meaningfully behind `/packages` (79.0). The blog's average is pulled down entirely by the Budget-Comparing Tourist persona (40) — the blog never mentions price, which is reasonable for an informational post but means it doesn't reinforce the site's price-led SERP position; not a fix priority, just a scoring artifact of an informational page correctly not doing commercial work.

**Strongest page overall: `/packages`**, having moved from the weakest-scoring page in the prior audit (59/100 gap score) to the strongest persona-served page in this pass — a direct result of the grade-explainer + persona-routing + comparison-table fix.

---

## SXO Gap Score (7 dimensions, 100 pts each page — separate from any SEO Health Score)

| Dimension (max) | Home | `/packages` | Package detail | Blog post |
|---|---|---|---|---|
| Page Type (15) | 13 | 15 | 15 | 13 |
| Content Depth (15) | 10 | 13 | 11 | 13 |
| UX Signals (15) | 12 | 13 | 13 | 12 |
| Schema (15) | 11 | 14 | 15 | 9 |
| Media (15) | 10 | 10 | 8 | 7 |
| Authority (15) | 6 | 6 | 6 | 12 |
| Freshness (10) | 6 | 6 | 7 | 9 |
| **Total** | **68/100** | **77/100** | **75/100** | **75/100** |

**Prior-pass totals for reference:** Home 68 (unchanged), `/packages` 59 → **77 (+18)**, Package detail 68 → **75 (+7)**, Blog 50 → **75 (+25)**.

Evidence for key deltas:
- **`/packages` Schema (6→14):** full `ItemList`/`Offer` for all 5 packages now present, correctly matching visible prices. Held at 14 not 15 because `Review`/`AggregateRating` is intentionally absent site-wide (correct, not a deduction) but there's no `FAQPage` on this page either, despite the page functioning as a comparison/decision hub where FAQ-style content ("what if I want to switch routes," "can I book two packages same day") could reinforce it.
- **Package detail Schema (9→15):** `TouristTrip`/`Offer`/itinerary/provider + 5-question `FAQPage` — essentially complete for this page type.
- **Blog Content Depth (5→13):** 867 words with genuine granularity (temperature ranges, named rapids, monsoon-closure logic). Not 15/15 because there are no in-article images per season and no jump-links/TOC for an 800+-word piece.
- **Blog Authority (3→12):** named author with 12-year guide credential is a real E-E-A-T signal. Not full marks — no author bio page, headshot, or link to verify credentials.
- **Blog Schema (6→9):** `BlogPosting` is now fully correct (fixed image, named author, dates) but the visible FAQ section still isn't marked up as `FAQPage` (see H1) — capping this dimension.
- **Authority (Home, `/packages`, detail — still 6/15):** no linked government rafting-operator registration, no certification badges beyond the unverified claim "certified guides." Unchanged from prior audit — a sitewide gap the blog's author fix doesn't address.
- **Freshness (Blog 8→9):** `datePublished: 2026-03-01`, `dateModified: 2026-08-15` (today) — good, current signal. Package detail ticked up slightly (6→7) since `Offer.validFrom` is also today's date, a minor positive freshness signal not present before.

---

## Limitations

- The site is pre-launch and sitewide `noindex, nofollow` + `Disallow: /` (see C1) — it does not currently rank for any query. Findings compare the site's **content/structure** against real, currently-ranking competitor pages for representative queries; they are not a report of the site's actual live ranking position.
- Pages were fetched directly via HTTP from the local production build (`http://localhost:4100`) rather than through the skill's standard `render_page.py` wrapper, because that script's SSRF/DNS-rebinding protection hard-blocks `localhost` and loopback addresses by design (a deliberate, correct security boundary — see `scripts/url_safety.py`). All four pages were confirmed to be fully server-rendered Next.js output (no SPA shell, no client-only content gap), so this substitution does not affect finding accuracy; `parse_html.py` was still used for structured extraction against the fetched HTML.
- WebSearch was used for SERP sampling (3 queries, same set as the prior audit for direct comparability: "river rafting Rishikesh booking," "Rishikesh rafting packages price," "best time for river rafting in Rishikesh"). This tool returns AI-summarized result sets rather than raw SERP HTML/screenshots, so exact SERP feature presence (Map Pack, PAA question text, featured-snippet format, ad density) is inferred from summarized signals and general category norms, not pixel-verified.
- Only 4 of the site's pages were audited in depth. The other 4 package detail pages, other blog posts, `/destinations`, `/about`, and `/contact` were not individually parsed or scored in this pass.
- Per project notes, some site copy/offers are documented as placeholder pending client sign-off (e.g., the "8 Rafting Routes" achievement stat flagged in M4 may fall into this category); this audit assesses structure and SEO/SXO mechanics as currently built, not final marketing copy — flag before real launch.

---

## Recommended Follow-ups

- **Critical:** Keep the pre-launch checklist item to remove `noindex, nofollow` and the `Disallow: /` on the production domain only, at DNS cutover. (Unchanged, already tracked.)
- H1 (blog `FAQPage` schema gap) → run `/seo schema` to generate `FAQPage` markup for the blog's existing 3 Q&As, mirroring the package detail page's pattern.
- M1 (uneven age/family copy in the `/packages` comparison table) → run `/seo page` for a focused copy pass on the "Best For" column.
- M4 (achievement stat inconsistency) → confirm with the client whether "8 Rafting Routes" is a stale placeholder or refers to something not currently shown on-site (e.g., planned future routes); correct or clarify before launch.
- M2 (no map embed) → run `/seo local` for a GBP/map-embed checklist once the production domain and Google Business Profile are live.
- Sitewide Authority gap (still 6/15 on 3 of 4 pages) → run `/seo content` for an E-E-A-T pass — the blog author fix is a good template to extend to an "About the guides" page/section linked from all package pages.

Generate a PDF report? Use `/seo google report`.
