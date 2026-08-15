# Schema.org Structured Data Audit — Shivalik Ganga Adventure

**Audited:** 2026-08-15
**Target:** https://shivalik-ganga-adventure.vercel.app/ (pre-launch Vercel preview; production domain `https://www.shivalikgangaadventure.com` not yet live)
**Method:** Source review (`lib/schema.ts`, `app/**/page.tsx`, `constants/*.ts`) + raw HTML fetch (`render_page.py --mode never`) confirming server-rendered JSON-LD matches source (site is fully SSR/SSG via Next.js App Router — no client-injected schema, `is_spa: false` on all sampled pages).

**Score: 74/100** — a genuinely above-average implementation for a pre-launch site (site-wide LocalBusiness + breadcrumbs on every page, per-package FAQPage, per-post BlogPosting). Points lost mainly to a missing `publisher`/`logo` on Article/Organization markup, no Offer/TouristTrip markup on the pages that actually sell each package, an ItemList that doesn't match on-page content, and zero Review/AggregateRating markup despite a visible testimonials section.

---

## 1. Detection Results — what exists today, by page type

All JSON-LD is generated in `lib/schema.ts` and injected via inline `<script type="application/ld+json">` in Server Components. Confirmed present in raw (unrendered) HTML on every sampled URL, so no rendering-related risk.

| Page type | Sample URL | Schema present |
|---|---|---|
| Every page (via `app/layout.tsx`) | all | `SportsActivityLocation` (LocalBusiness), `TouristAttraction` |
| Home | `/` | + `ItemList` (all 6 packages as `TouristTrip`), `BreadcrumbList` |
| Packages index | `/packages` | + `BreadcrumbList` |
| Package detail | `/packages/brahmpuri-to-rishikesh` (and other 5) | + `BreadcrumbList`, `FAQPage` (where `faqs.length > 0` — all 6 packages have FAQs) |
| Destinations | `/destinations` | + `BreadcrumbList` |
| Gallery | `/gallery` | + `BreadcrumbList` |
| About | `/about` | + `BreadcrumbList` |
| Contact | `/contact` | + `BreadcrumbList` |
| Blog index | `/blog` | + `BreadcrumbList` |
| Blog post | `/blog/best-time-for-rafting-rishikesh` (and other 2) | + `BreadcrumbList`, `BlogPosting` |
| Privacy / Terms | `/privacy`, `/terms` | **No schema at all** (not even `BreadcrumbList`) |

No Microdata or RDFa found anywhere — JSON-LD only, `@context: "https://schema.org"` (https, correct) throughout. No deprecated types found (no `HowTo`, no `SpecialAnnouncement`, no `CourseInfo`/`EstimatedSalary`/`LearningVideo`).

---

## 2. Validation Results

### ✅ SportsActivityLocation (site-wide LocalBusiness) — `app/layout.tsx`
Pass on required fields: `name`, `address` (full `PostalAddress`), `telephone`, `geo`. `@id` is stable (`.../#business`). `addressCountry: "IN"` is correctly the ISO code, not the country name — good.

**Issues:**
- **[Medium] No `logo` property.** Only `image` is set, pointing at the dynamic `/opengraph-image` route (a 1200×630 OG card, not a square logo). Google's Organization "logo" requirement (for Knowledge Panel / Merchant listing logo eligibility) wants a dedicated `logo` field, ideally ≥112×112px, square-ish. The site has a real logo asset (`constants/images.ts` → `IMAGES.logo`, `/images/logo/logo-shivalik-adv.webp`) that isn't referenced in schema at all.
- **[Info] `image` uses a dynamic route, not a static asset.** `${COMPANY.url}/opengraph-image` works (returns a real image response), but confirm it renders reliably before launch — Rich Results Test / Google's structured-data image-fetcher needs a 200 response with a real image content-type, not an HTML error page.
- **[Info] `openingHoursSpecification` is a single object, not an array.** Valid per schema.org (an array isn't required when `dayOfWeek` itself is an array covering all 7 days), so this is not an error — flagging only because most examples in Google's docs show an array; no action needed.

### ✅ TouristAttraction — `app/layout.tsx`
Structurally valid. Not a Google Search Gallery rich-result type (no SERP feature), so this exists purely for entity/AI clarity — that's a legitimate use.

**Issues:**
- **[Low] No `image` property**, and no relationship back to the business (`isPartOf`/`makesOffer`/`provider` linking to `.../#business`). Both are optional but would strengthen entity disambiguation for LLM citation.

### ⚠️ ItemList (packages) — `app/page.tsx` (home only)
Structurally valid JSON (each `TouristTrip` has `name`, `description`, `offers.price`/`priceCurrency`/`availability`), but two real problems:

- **[High] Content mismatch with the page it's on.** The `ItemList` schema on `/` enumerates **all 6 packages**, but the homepage itself only renders `<PopularTours limit={3}>` (3 packages) plus a separate `<Destinations>` section — it never displays all 6 in one list. Google's structured data policy explicitly requires markup to reflect visible page content; an `ItemList` with items not shown on that page is a mismatch risk (won't earn a manual action for non-carousel types, but it's technically non-compliant and wastes the one clean opportunity for accurate list markup). **Fix:** move the full 6-item `ItemList` to `/packages` (which *does* render all 6), and if you want homepage list markup, scope it to the 3 packages `PopularTours` actually renders.
- **[Medium] `TouristTrip` items are missing `url` and `image`.** Each item only has `name`/`description`/`touristType`/`offers` — no `url` pointing at the package's own detail page (`/packages/{slug}`) and no `image`. Without `url`, the list can't be resolved back to a specific page, which limits its usefulness both for Google and for LLM/AI crawlers trying to cite a specific package.
- **[Medium] `TouristTrip.offers` has no `url`** on the Offer itself (should link to where the offer can be redeemed — `/packages/{slug}`), and no `priceValidUntil`.

### 🔴 Package detail pages — biggest structural gap
`/packages/{slug}` pages carry `BreadcrumbList` + `FAQPage` only. **There is no `TouristTrip`/`Offer`/`Product`-style schema on the actual page selling that package** — the price (`₹599`, `₹899`, etc.), duration, distance, and grade shown prominently on the page are not represented in structured data anywhere except the homepage's generic `ItemList` (which per the issue above shouldn't be the canonical source and doesn't even link back). This is the single highest-value fix in this audit — see generated JSON-LD in Section 4.

### ✅ BreadcrumbList — all pages that have it
Valid structure: `position` sequential from 1, `name` present, `item` is an absolute URL string (Google accepts either a URL string or a full Thing — string is fine and simplest). Absolute URLs confirmed (built from `COMPANY.url`). No errors found on any sampled page.

- **[Low] Missing on `/privacy` and `/terms`.** Not required by Google, but inconsistent with the rest of the site's IA and easy to add for completeness.

### ⚠️ BlogPosting — `/blog/{slug}`
`headline`, `description`, `datePublished`, `dateModified`, `author`, `image`, `mainEntityOfPage` all present. Dates confirmed ISO 8601 (`"2026-03-01"`, valid date-only ISO 8601 form).

**Issues:**
- **[High] No `publisher` property.** Google's Article-family guidance (covers `BlogPosting`) recommends `publisher` (an `Organization` with `name` + `logo` as an `ImageObject`) for full rich-result eligibility and for AI systems to correctly attribute the source organization. Currently absent entirely.
- **[Medium] `author` is `{"@type": "Organization", name: post.author}"` for a person-styled byline ("Shivalik Ganga Adventure Team").** That's internally consistent (it genuinely is a team byline, not a named person), so `Organization` is the *correct* type here — just flagging that if a named individual author is introduced later, switch to `@type: "Person"`.
- **[Medium] Single `image` string, not an array of aspect ratios.** Google recommends supplying the image at multiple aspect ratios (1×1, 4×3, 16×9) for maximum layout eligibility. Current cover images are Unsplash placeholders at one crop — low priority to fix until real photography is supplied, but worth doing when it is.
- **[Info] `mainEntityOfPage` is a bare URL string rather than a `WebPage` object with matching `@id`.** Valid per spec, but the more explicit form is best practice.

### ✅ FAQPage — package detail pages (6 of 6 packages)
Valid structure (`Question` → `acceptedAnswer.Answer.text`). **No validation errors.**

- **[Info] Per hard rule: Google retired FAQ rich results for all sites on 2026-05-07 — already in effect as of today (2026-08-15).** This markup will not produce a SERP FAQ rich result. **Do not remove it** — it remains genuinely useful for AI/LLM citation (ChatGPT, Perplexity, Google AI Overviews, etc. commonly lift Q&A pairs from `FAQPage` markup) and for entity/answer extraction. No action needed beyond awareness.
- **[Info] Do not add `FAQPage` to any additional pages for Google SERP benefit** — there is none anymore. If more FAQ-style content is added elsewhere, it's fine to markup for GEO/AI purposes only, with that expectation set correctly.

### ❌ Review / AggregateRating — missing entirely
The site has a real, populated testimonials section (`constants/testimonials.ts`, rendered via `<Testimonials />` on Home and Contact) — 3 named reviewers, all 5-star, with trip-specific quotes. **None of this is expressed as `Review`/`AggregateRating` structured data anywhere**, despite the business (`SportsActivityLocation`) being an obvious `LocalBusiness` candidate for it.

- **[Info — content/compliance flag, not a schema-syntax issue]** Per project memory, testimonial content is placeholder pending client sign-off. **Before adding `Review`/`AggregateRating` schema, confirm with the client that "Rohan Malhotra," "Ananya Kapoor," and "Vikram Sethi" are real, consenting customers** — Google's review-snippet policy prohibits self-authored or fabricated reviews in structured data, and this carries real spam-action risk (unlike the placeholder-copy allowance for ordinary page text). Treat the JSON-LD below as ready-to-use *once* the underlying testimonials are confirmed genuine; do not ship it against fabricated names.

---

## 3. Missing Opportunities Summary

| Opportunity | Priority | Where |
|---|---|---|
| `TouristTrip`/`Offer` schema on package detail pages | **Critical** | `/packages/*` (6 pages) |
| `publisher` (Organization + logo) on `BlogPosting` | **High** | `/blog/*` (3 posts) |
| Fix `ItemList` scope/content-mismatch (move to `/packages`, add `url`) | **High** | `/`, `/packages` |
| `logo` property on the LocalBusiness entity | Medium | site-wide (`app/layout.tsx`) |
| `Review`/`AggregateRating` on LocalBusiness (pending consent confirmation) | Medium | site-wide |
| `BreadcrumbList` on `/privacy`, `/terms` | Low | 2 pages |
| `image` on `TouristAttraction` | Low | site-wide |

---

## 4. Generated JSON-LD

### 4a. Package detail page — `TouristTrip` + `Offer` (Critical fix)
Add to `lib/schema.ts` and inject on `app/packages/[slug]/page.tsx` alongside the existing breadcrumb/FAQ blocks.

```ts
// lib/schema.ts — add this function
export function getPackageTouristTripSchema(pkg: RaftingPackage) {
  const url = `${COMPANY.url}/packages/${pkg.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: `${pkg.name} Rafting`,
    description: pkg.description,
    url,
    image: pkg.image,
    touristType: ["Adventure travelers", "Families", "Groups", "Solo travelers"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: pkg.itinerary.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.time,
        description: step.activity,
      })),
    },
    provider: { "@id": `${COMPANY.url}/#business` },
    offers: {
      "@type": "Offer",
      url,
      price: pkg.salePrice ?? pkg.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-08-15",
    },
  };
}
```

```tsx
// app/packages/[slug]/page.tsx — add alongside existing breadcrumbSchema/faqSchema
const touristTripSchema = getPackageTouristTripSchema(pkg);

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
/>
```

*(Requires `RaftingPackage` to be exported/imported into `lib/schema.ts` — it already is, from `constants/packages`.)*

### 4b. `publisher` on `BlogPosting` (High fix)
```ts
// lib/schema.ts — update getBlogPostingSchema
export function getBlogPostingSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: COMPANY.url },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY.url}${IMAGES.logo}`,
        width: 512,
        height: 512,
      },
    },
    image: `${COMPANY.url}${post.coverImage}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY.url}/blog/${post.slug}`,
    },
  };
}
```
*(Note: `post.coverImage` is currently a full Unsplash URL already, not a relative path — don't double-prefix with `COMPANY.url`; the existing code has this bug too, see Section 5.)*

### 4c. `logo` on the LocalBusiness entity (Medium fix)
```ts
// lib/schema.ts — add to getLocalBusinessSchema()'s returned object
logo: `${COMPANY.url}${IMAGES.logo}`, // e.g. https://www.shivalikgangaadventure.com/images/logo/logo-shivalik-adv.webp
```

### 4d. `AggregateRating` + `Review` on LocalBusiness — **hold for client sign-off on testimonial authenticity**
```ts
// lib/schema.ts — only ship once testimonials are confirmed genuine/consented
export function getAggregateRatingSchema() {
  const ratings = TESTIMONIALS.map((t) => t.rating);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${COMPANY.url}/#business`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: ratings.length,
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.quote,
      itemReviewed: { "@id": `${COMPANY.url}/#business` },
    })),
  };
}
```
Merge this into the existing `getLocalBusinessSchema()` object (same `@id`) rather than emitting a second competing block — duplicate `@id`s across separate `<script>` blocks are fine per JSON-LD graph merging, but cleaner to combine at generation time.

---

## 5. Bug Flagged in Passing (not strictly schema, but affects the fix above)
`getBlogPostingSchema` currently does `image: \`${COMPANY.url}${post.coverImage}\`` — but every post's `coverImage` in `content/blog/*.md` frontmatter is already a **full absolute Unsplash URL** (e.g. `https://images.unsplash.com/photo-...`), not a relative path. Concatenating `COMPANY.url` in front produces a broken malformed URL (e.g. `https://www.shivalikgangaadventure.comhttps://images.unsplash.com/...`). **This is a live bug today, independent of any recommendation above** — confirmed in the raw HTML fetch of `/blog/best-time-for-rafting-rishikesh`. Fix:
```ts
image: post.coverImage.startsWith("http") ? post.coverImage : `${COMPANY.url}${post.coverImage}`,
```
(Apply the same guard to the `4b` snippet above.)

---

## 6. Hard-Rule Compliance Check
- ✅ No `HowTo` anywhere.
- ✅ No `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`.
- ✅ `FAQPage` present but correctly not relied upon for SERP value; not recommended for removal; not recommended for expansion for SEO reasons.
- ✅ JSON-LD only, `https://schema.org` context, no relative URLs found in existing schema (once the coverImage bug above is fixed, this will also cover `BlogPosting.image`).
