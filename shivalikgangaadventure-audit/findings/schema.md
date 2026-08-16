# Schema.org Structured Data Audit — Shivalik Ganga Adventure

**Audited:** 2026-08-15
**Target:** http://localhost:4100 (local production build, Next.js App Router, SSR'd JSON-LD)
**Source of truth:** `lib/schema.ts`, injected via inline `<script type="application/ld+json">` in Server Components across `app/**/page.tsx`
**Sitemap:** http://localhost:4100/sitemap.xml — 15 URLs (9 static/list pages, 5 package detail pages, 3 blog posts; sitemap total counts 17 with all blog posts)
**Audit type:** Fresh independent pass. Not a diff against the prior same-day audit, but the specific fixes the team reported as "applied since this morning" were individually re-verified against live SSR output rather than assumed.

---

## 0. Reachability & Crawl Posture (excluded from score, noted factually)

- `http://localhost:4100` returns `HTTP 200`. Site is live and rendering.
- `robots.txt` → `Disallow: /` (blocks all crawlers).
- Every page carries `<meta name="robots" content="noindex, nofollow">` (also set via `robots: { index: false, follow: false, googleBot: {...} }` in `app/layout.tsx` metadata).
- This is confirmed as a deliberate pre-launch client choice. Not a defect, excluded from scoring. Structured data quality is otherwise fully assessed as if the site were indexable, since JSON-LD is valuable for AI/LLM crawlers (which largely ignore `noindex`) and will matter immediately at launch.

---

## 1. Detection Table by Page Type

| Page type | URL(s) | Schema blocks present (SSR-confirmed) |
|---|---|---|
| Root layout (all pages) | every page | `SportsActivityLocation` (`#business`), `TouristAttraction` (`#attraction`) |
| Homepage | `/` | + `ItemList` (3 items, `TouristTrip`+`Offer` each), `BreadcrumbList` (1 crumb) |
| Packages list | `/packages` | + `BreadcrumbList` (2 crumbs), `ItemList` (5 items, full catalog, `TouristTrip`+`Offer` each) |
| Package detail (×5) | `/packages/brahmpuri-to-nim-beach`, `/club-house-to-nim-beach`, `/shivpuri-to-nim-beach`, `/marine-drive-to-nim-beach`, `/kaudiyala-to-nim-beach` | + `BreadcrumbList` (3 crumbs), `TouristTrip` (with nested `itinerary` ItemList + `Offer` + `provider` @id link), `FAQPage` (5 Q&As each, 25 total) |
| Blog index | `/blog` | + `BreadcrumbList` (2 crumbs). No `Blog`/`CollectionPage`/`ItemList` for the post listing itself. |
| Blog post (×3) | `/blog/best-time-for-rafting-rishikesh`, `/grade-ii-vs-grade-iv-rapids-explained`, `/what-to-pack-rafting-trip` | + `BreadcrumbList` (3 crumbs), `BlogPosting` (with `publisher` Organization+logo, `author`, `image`, `mainEntityOfPage`) |
| About / Contact / Destinations / Gallery | `/about`, `/contact`, `/destinations`, `/gallery` | + `BreadcrumbList` (2 crumbs). No page-type-specific schema (e.g. no `TouristDestination`/`ImageGallery`). |
| Privacy / Terms | `/privacy`, `/terms` | + `BreadcrumbList` (2 crumbs) — **confirmed newly added since last audit** |

`Review` / `AggregateRating`: **not present anywhere**, confirmed intentional (see §5).

All JSON-LD blocks on every page tested parsed as syntactically valid JSON (verified programmatically, not just visually).

---

## 2. Verification of Reported Fixes (each checked against live SSR HTML, not assumed)

| # | Reported fix | Verified? | Evidence |
|---|---|---|---|
| 1 | `TouristTrip` + `Offer` on all 5 package detail pages | ✅ Confirmed | All 5 slugs return `@type":"TouristTrip"` with nested `offers` (`price`, `priceCurrency: INR`, `availability: InStock`, `priceValidUntil: 2026-12-31`, `validFrom: 2026-08-15`) |
| 2 | `publisher` (Organization+logo) on `BlogPosting` | ✅ Confirmed | All 3 posts: `"publisher":{"@type":"Organization","name":"Shivalik Ganga Adventure","logo":{"@type":"ImageObject","url":"https://www.shivalikgangaadventure.com/images/logo/favicon.png","width":512,"height":512}}` — dimensions match the actual file (verified: `favicon.png` is exactly 512×512 PNG) |
| 3 | `BlogPosting.image` double-prefix bug fixed | ✅ Confirmed | `lib/schema.ts` now guards with `post.coverImage.startsWith("http") ? post.coverImage : \`${COMPANY.url}${post.coverImage}\``; live output is a single clean absolute Unsplash URL, no doubled domain |
| 4 | `ItemList` moved to `/packages` (full 5-item catalog) with 3-item scoped version on homepage | ✅ Confirmed | `/packages` → 5 `ListItem`s (Brahmpuri, Club House, Shivpuri, Marine Drive, Kaudiyala). `/` → exactly the first 3, generated via `getPackagesItemListSchema(PACKAGES.slice(0, 3))` — matches `<PopularTours limit={3}>` which renders `packages.slice(0, limit)` off the same `PACKAGES` array/order. No drift possible between rendered cards and schema since both slice the same source array. |
| 5 | `logo` field added to `SportsActivityLocation`, pointing to square icon (not old wide logo) | ✅ Confirmed | `"logo":"https://www.shivalikgangaadventure.com/images/logo/favicon.png"` — this is `IMAGES.logoIcon`, a 512×512 square PNG, distinct from `IMAGES.logo` (the wide horizontal lockup used in the navbar) |
| 6 | `TouristAttraction` linked to business via `subjectOf` | ✅ Confirmed | `"subjectOf":{"@id":"https://www.shivalikgangaadventure.com/#business"}` correctly resolves to the `SportsActivityLocation` node's `@id` |
| 7 | `BreadcrumbList` added to `/privacy` and `/terms` | ✅ Confirmed | Both pages now emit a 2-crumb `BreadcrumbList` (Home → Privacy/Terms) |
| 8 | Package catalog is 5 packages, not 6 | ✅ Confirmed | `constants/packages.ts` has exactly 5 entries; sitemap has exactly 5 `/packages/*` URLs; both `ItemList` instances and `generateStaticParams()` reflect 5 |

All 8 reported fixes are genuinely live in the SSR output. None were found to be only partially applied or reverted.

---

## 3. Validation Results Per Schema Type

### `SportsActivityLocation` (sitewide, in `app/layout.tsx`)
- ✅ `@context: https://schema.org`
- ✅ `@type: SportsActivityLocation` — valid, current schema.org type (subtype of `LocalBusiness`/`Place`), not deprecated
- ✅ `@id` present and stable (`#business`), enabling cross-references from other nodes
- ✅ Required/expected properties present: `name`, `description`, `url`, `telephone`, `email`, `priceRange`, `address` (full `PostalAddress`), `geo` (`GeoCoordinates`), `openingHoursSpecification`, `sameAs`
- ✅ `image` (`/opengraph-image`) resolves live to `HTTP 200`, `content-type: image/png` — valid, crawlable absolute URL
- ✅ `logo` is absolute, resolves to a real 512×512 square PNG (Google's Organization-logo guidance requires min. 112×112 and square — comfortably satisfied)
- ✅ No placeholder text
- ⚠️ **Minor/Info**: `logo` is a bare URL string rather than a wrapped `ImageObject` (`{"@type":"ImageObject","url":...,"width":512,"height":512}`) — schema.org and Google both accept either form, so this is not an error, just an inconsistency with how the same logo asset is already wrapped correctly in `BlogPosting.publisher.logo`. Cosmetic only.
- **Result: PASS**

### `TouristAttraction` (sitewide)
- ✅ Valid, current type
- ✅ `subjectOf` correctly links to the business node
- ✅ `touristType`, `geo`, `address`, `isAccessibleForFree` present
- **Result: PASS**

### `ItemList` (homepage, `/packages`)
- ✅ Valid `@type`, correct `ListItem`/`position` structure
- ✅ Item count matches rendered content on both pages (3 on `/`, 5 on `/packages`)
- ⚠️ See §4.1 below — nested `TouristTrip.image` is a relative path
- **Note**: `TouristTrip` is not one of Google's documented rich-result-eligible types (unlike `Product`, `Event`, `Recipe`, etc.), so this `ItemList`/`TouristTrip` combination will not produce a SERP carousel even once indexing is enabled. It remains valid, useful structured data for entity clarity and AI/LLM consumption (e.g. an LLM citing package prices/availability) — correctly categorized as a GEO/AI asset rather than a Google rich-result driver.
- **Result: PASS with one property-level issue (see §4.1)**

### `TouristTrip` (5 package detail pages)
- ✅ Valid `@type`, `@id` present and unique per page
- ✅ `itinerary` correctly modeled as nested `ItemList`
- ✅ `provider` correctly references `#business` by `@id`
- ✅ `offers.priceValidUntil` (`2026-12-31`) is a valid ISO 8601 date and is still in the future relative to today (2026-08-15) — not stale yet, but flagged as a hardcoded value that will go stale on 2027-01-01 across all 5 pages simultaneously unless updated (see §6, Low priority)
- ⚠️ `image` is a **relative URL** (`/images/packages/brahmpuri-to-nim-beach.webp`), not absolute — see §4.1
- **Result: FAIL on one property (`image`), otherwise PASS**

### `BreadcrumbList` (sitewide)
- ✅ Valid structure, `position`/`name`/`item` all present
- ✅ All `item` URLs are absolute (`https://www.shivalikgangaadventure.com/...`)
- ✅ Confirmed present on `/privacy` and `/terms` (previously missing)
- **Result: PASS**

### `BlogPosting` (3 posts)
- ✅ `headline`, `description`, `datePublished`, `dateModified` (ISO 8601) all present and valid
- ✅ `author` correctly branches `Person` (with `jobTitle`) vs `Organization` depending on content frontmatter
- ✅ `publisher` is a fully-formed `Organization` with wrapped `ImageObject` logo (dimensions verified accurate)
- ✅ `image` absolute in all 3 cases (blog covers are Unsplash absolute URLs by default, and the code path also correctly handles a hypothetical local relative cover via prefixing)
- ✅ `mainEntityOfPage` present, correctly typed `WebPage`
- **Result: PASS**

### `FAQPage` (5 package detail pages, 25 Q&As total)
- ✅ Valid structure (`Question`/`acceptedAnswer`/`Answer`)
- ✅ Content parity: the schema pulls from the exact same `pkg.faqs` array rendered visibly in the `<Accordion>` component — no spec/visible mismatch risk
- **Per current Google policy (FAQ rich results retired sitewide from May 2026): this schema will not produce a SERP rich result.** Correctly kept in place — it remains a legitimate signal for AI/LLM answer-engine citation. No action needed. Do not remove; do not expect SERP benefit.
- **Result: PASS (Info — no SERP benefit, retained for AI/GEO value, exactly as directed)**

### `Review` / `AggregateRating`
- **Deliberately absent sitewide.** Confirmed correct: testimonial content is still placeholder copy pending real-customer sign-off (per project notes), and attaching rating schema to non-genuine reviews would be a Google spam-policy and compliance risk (misrepresentation). **Correctly withheld — no recommendation to add.**

---

## 4. Issues Found

### 4.1 `TouristTrip.image` uses a relative URL, not an absolute URL — **High priority**

**Where:** `lib/schema.ts`, `getPackageTouristTripSchema()` (line 115) and `getPackagesItemListSchema()` (line 90), both consuming `pkg.image` directly from `constants/packages.ts` → `constants/images.ts`, which stores package images as root-relative paths (e.g. `/images/packages/brahmpuri-to-nim-beach.webp`).

**Confirmed live** on all 5 package detail pages and both `ItemList` instances (homepage + `/packages`):
```json
"image": "/images/packages/brahmpuri-to-nim-beach.webp"
```
This is the same class of bug that was just fixed on `BlogPosting.image` (double-prefix / relative-URL handling) — but the fix was not applied to the `TouristTrip` path. Google's structured data guidelines call for fully-qualified, crawlable image URLs; a relative path in a `<script type="application/ld+json">` block is not guaranteed to resolve correctly across all structured-data parsers (JSON-LD 1.1 resolves relative IRIs against the document base, which works in-browser but is inconsistent behavior to rely on, and several third-party validators/consumers will flag or silently drop it). This is inconsistent with the rest of the codebase, which otherwise absolutizes every other schema image (`BlogPosting.image`, `SportsActivityLocation.logo`/`image`).

**Impact:** All 5 `TouristTrip` nodes (detail pages) + all 8 `TouristTrip` items across the two `ItemList` instances (3 + 5) — the large majority of the site's product-style structured data — carry a non-absolute `image`.

**Recommended fix** (mirrors the existing `BlogPosting.image` pattern):
```ts
// lib/schema.ts
function absoluteImage(path: string): string {
  return path.startsWith("http") ? path : `${COMPANY.url}${path}`;
}

// in getPackagesItemListSchema():
image: absoluteImage(pkg.image),

// in getPackageTouristTripSchema():
image: absoluteImage(pkg.image),
```

### 4.2 `logo` on `SportsActivityLocation` is a bare string, not a wrapped `ImageObject` — Low priority / optional
Not an error per schema.org or Google docs (both accept a plain URL string for `logo`), but inconsistent with `BlogPosting.publisher.logo`, which is correctly wrapped with `width`/`height`. Wrapping it the same way is a trivial, cheap consistency win and slightly strengthens Knowledge-Panel/logo eligibility signals once indexing is switched on:
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://www.shivalikgangaadventure.com/images/logo/favicon.png",
  "width": 512,
  "height": 512
}
```

### 4.3 Hardcoded `priceValidUntil: "2026-12-31"` across all 5 `TouristTrip.offers` — Low priority / maintenance flag
Valid ISO 8601, valid future date as of this audit (2026-08-15), so no current defect. But it's identical across every package and not derived from a rolling window, so it will go simultaneously stale on 2027-01-01 unless someone remembers to bump it. Consider deriving it (e.g. `${currentYear}-12-31` or a rolling +90-days window) so it self-maintains.

### 4.4 Missing schema opportunities (Info / optional, no urgency)
- **`/blog` index**: no `Blog`/`CollectionPage` or `ItemList` of posts. Low-value addition given FAQ/Article-type rich results aren't the goal here, but would help AI crawlers enumerate posts in one block.
- **`/destinations`**: no `TouristDestination` markup per rafting put-in point (Shivpuri, Brahmpuri, Marine Drive, Kaudiyala, Byasi Rapids, Club House), despite each having name/grade/distance/description data readily available in `constants/destinations.ts`. Not a Google rich-result type, but genuinely useful for AI/LLM entity grounding given the business is explicitly modeled as location-based adventure tourism.
- **`/gallery`**: no `ImageObject`/gallery-level markup. Low priority; Google's Image rich results rely more on on-page `<img>`/file metadata than JSON-LD for this use case.
- **No `WebSite` schema with `SearchAction`**: optional, only relevant if/when the site gets on-site search — not currently applicable, no action needed.

None of §4.4 are required or urgent; listed for completeness only.

---

## 5. Deprecated / Retired Schema Check

- ❌ `HowTo` — not present anywhere (correct, this type's rich results were removed Sept 2023)
- ❌ `SpecialAnnouncement` — not present (correct, deprecated July 2025)
- ❌ `CourseInfo`, `EstimatedSalary`, `LearningVideo` — not applicable to this business, not present
- ✅ `FAQPage` present but explicitly retained per current guidance (AI/GEO value, not SERP value) — correct handling, not flagged as a defect
- ✅ No genuine user Q&A content misusing `FAQPage` where `QAPage` would be more correct — the FAQ content here is genuinely operator-authored FAQ copy, not user-submitted Q&A, so `FAQPage` remains the right type choice

No deprecated types found anywhere in the codebase or live output.

---

## 6. Score: **91 / 100**

*(Crawler-blocking/`noindex` posture excluded from scoring per engagement scope — this is a pre-launch business decision, not a schema defect.)*

**Scoring rationale:**
- Coverage & fix verification (all 8 reported fixes genuinely live, sitewide `BreadcrumbList`/`SportsActivityLocation`/`TouristAttraction` present, correct `ItemList` scoping matching rendered content): **near-perfect**
- Deprecated-type hygiene, deliberate omissions (Review/AggregateRating correctly withheld, FAQPage correctly retained for AI value only): **perfect**
- Property-level correctness: **one real, moderately-impactful defect** — the relative `TouristTrip.image` URL, present across 5 detail pages + 8 `ItemList` entries — is the single largest deduction
- Completeness against optional best-practice extras (logo `ImageObject` wrapping, `/destinations` and `/blog` index markup): a few small, non-urgent opportunities left on the table

| Deduction | Points |
|---|---|
| Relative `TouristTrip.image` URLs (5 detail pages + 2 `ItemList` instances) | −6 |
| `logo` not wrapped as `ImageObject` (cosmetic inconsistency) | −1 |
| Hardcoded, non-rolling `priceValidUntil` (future maintenance risk) | −1 |
| Missing optional `TouristDestination`/`Blog` index/`ImageGallery` opportunities | −1 |
| **Total** | **91/100** |

---

## 7. Prioritized Action List

1. **[High]** Absolutize `TouristTrip.image` in `lib/schema.ts` (`getPackageTouristTripSchema` + `getPackagesItemListSchema`) — one shared helper function, ~4-line fix, affects the majority of the site's structured data.
2. **[Low]** Wrap `SportsActivityLocation.logo` as an `ImageObject` with `width`/`height` for consistency with `BlogPosting.publisher.logo`.
3. **[Low]** Make `priceValidUntil` self-maintaining (rolling window or year-derived) instead of a hardcoded `2026-12-31` repeated 5×.
4. **[Info, optional]** Consider `TouristDestination` markup on `/destinations` for AI/GEO entity grounding — not required, no SERP impact, purely an enhancement.
5. **[Info, optional]** Consider a lightweight `Blog`/`ItemList` on `/blog` index for AI crawlability of the post catalog.
6. **No action**: `Review`/`AggregateRating` correctly withheld; `FAQPage` correctly retained despite no SERP benefit; crawler-blocking correctly left as-is pending launch.
