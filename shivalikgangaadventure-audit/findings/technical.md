# Technical SEO Audit — Shivalik Ganga Adventure

**Audited environment:** `https://shivalik-ganga-adventure.vercel.app/` (Vercel preview — pre-launch staging build)
**Eventual production domain:** `https://www.shivalikgangaadventure.com` (not yet resolving)
**Date:** 2026-08-15
**Pages crawled:** 18/18 from `/sitemap.xml`, all returned HTTP 200.
**Stack:** Next.js (App Router, RSC), hosted on Vercel, server-rendered/prerendered (`X-Nextjs-Prerender: 1`).

**Technical SEO Score: 82 / 100**
*(Score reflects the underlying template/build quality. It deliberately does NOT penalize the site for being noindexed/disallowed — that is correct, intentional behavior for a pre-launch preview. See the dedicated "MUST REMOVE BEFORE LAUNCH" section below, which is the single most important action item regardless of this score.)*

---

## ⚠️ MUST REMOVE BEFORE PRODUCTION LAUNCH (pre-launch gate, not a bug)

This is expected, correct, and intentional on the current preview deployment. It becomes catastrophic if it ships to `www.shivalikgangaadventure.com` unchanged.

| # | Item | Current state (preview) | Required state (production) |
|---|------|--------------------------|------------------------------|
| 1 | `robots.txt` | `User-Agent: *` / `Disallow: /` (blocks all crawling) | Allow crawling; add `Sitemap: https://www.shivalikgangaadventure.com/sitemap.xml` line |
| 2 | Meta robots tag | `<meta name="robots" content="noindex, nofollow"/>` present on **all 18 pages** (verified individually) | Remove, or set to `index, follow` |
| 3 | `X-Robots-Tag` HTTP header | Not currently set (noindex is coming only from the meta tag) | Not required if meta tag is removed; if a header-based noindex is ever added as a Vercel env-based safeguard, it must also be removed at launch |

**Recommendation:** Tie both #1 and #2 to the same environment variable (e.g., `NEXT_PUBLIC_ENV=production` / `VERCEL_ENV=production`) so a single deploy-time flag flips both simultaneously, rather than relying on someone remembering to edit two separate files. Confirm this is how it's currently wired before launch day; if it's hardcoded, that's the fix needed now.

This item is excluded from the Critical bugs list below and from the score, per audit scope — but it is the #1 action item for launch day.

---

## 1. Crawlability — PASS (with the launch-gate caveat above)

- `robots.txt` returns HTTP 200, is syntactically valid, currently `Disallow: /` (expected pre-launch).
- **Medium / Low:** `robots.txt` has no `Sitemap:` directive at all (independent of the Disallow rule). Add `Sitemap: https://www.shivalikgangaadventure.com/sitemap.xml` when the file is unblocked for launch.
- `sitemap.xml` returns HTTP 200, well-formed XML, all 18 URLs present, `lastmod`/`changefreq`/`priority` populated consistently. No orphaned or extra URLs found — sitemap matches the page list exactly.
- **Info:** Sitemap `<loc>` values already point to `https://www.shivalikgangaadventure.com/...` (production domain) rather than the preview host. This is intentional (env-var driven) and correct — flagging only as confirmation, not an issue.
- Custom 404 page confirmed: unmapped path (`/nonexistent-page-xyz`) returns real HTTP `404` status (not a soft-404), with `X-Next-Error-Status: 404`. Good — this will hold up correctly post-launch.

## 2. Indexability — PASS

- Every page has a **unique** `<title>` and **unique** meta description — no duplicates detected across all 18 pages.
- `<link rel="canonical">` present on every page, **self-referencing and pointing to the production domain** (e.g., `https://www.shivalikgangaadventure.com/packages/brahmpuri-to-rishikesh`), matching the sitemap `<loc>` exactly. This is the "fine, intentional via env var" case described in the brief, **not** a preview-domain canonical bug — confirmed no page canonicalizes to `shivalik-ganga-adventure.vercel.app`.
- Every page has exactly one `<h1>`.
- **Low:** `/gallery` has only ~19 words of extractable body copy (image-only page). Not unusual for a gallery template, but worth a short intro paragraph + descriptive alt text (see §7) to avoid it reading as thin content once indexed.
- No parameter-based or session-based duplicate URL patterns found; all 18 canonical paths are clean and singular.
- Trailing-slash handling is consistent: `/packages/` 308-redirects to `/packages` (no trailing slash) sitewide — no duplicate-content risk from slash variants.

## 3. Security — PASS with gaps (Medium)

**Present (good):**
- HTTPS enforced; `http://` requests 308-redirect to `https://`.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` present on every response — strong HSTS config, preload-list eligible.

**Missing (Medium — add before/at launch):**
- No `Content-Security-Policy` header.
- No `X-Content-Type-Options: nosniff`.
- No `X-Frame-Options` (or frame-ancestors CSP directive) — clickjacking exposure, low real-world risk for this site type but a trivial fix.
- No `Referrer-Policy`.
- No `Permissions-Policy`.

**Minor (Low):**
- `X-Powered-By: Next.js` is exposed on the homepage response (confirmed present on `/`, absent on `/packages` and `/robots.txt` — inconsistent, likely edge-cache/route variance). Recommend `poweredByHeader: false` in `next.config.js` to suppress sitewide; minor info-disclosure, not urgent.

**Recommendation:** Add these via `next.config.js` `headers()` or a Vercel `vercel.json` headers block — cheap to add now, before launch traffic.

## 4. URL Structure — PASS

- All URLs are lowercase, hyphen-separated, human-readable (`/packages/kaudiyala-to-shivpuri-extreme`, `/blog/what-to-pack-rafting-trip`) — no IDs, query strings, or session parameters.
- No redirect chains longer than 1 hop found on any tested variant (`http→https`, trailing-slash, bare-domain) — all single 308 redirects, no daisy-chaining.
- 308 (permanent, method-preserving) used for both the HTTP→HTTPS and trailing-slash normalization — correct choice over 301/302 for a Next.js/Vercel setup.

## 5. Mobile-Friendliness — PASS

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present and correctly configured on all pages sampled.
- `<html lang="en-IN">` set correctly for the target market.
- Tailwind responsive utility classes (`sm:`, `lg:`) used throughout markup — indicates a responsive (not adaptive/separate-mobile-URL) build, which is the correct pattern; no `m.` subdomain or device-based redirect risk.
- No fixed-width layout containers or viewport-breaking widths detected in the sampled HTML.

## 6. Core Web Vitals Signals (source-inspection only — no CrUX/PSI data available)

- **LCP:** The homepage hero image is correctly **not** lazy-loaded (`loading` attribute absent → eager) and is preloaded via `<link rel="preload" as="image" imageSrcSet=...>` generated by Next's `priority` prop on `next/image`. This is best practice and should help LCP once real network conditions are measured.
- **CLS:** Most images use Next.js `<Image fill>` mode (`data-nimg="fill"`) inside parent containers with explicit sizing (e.g., `min-h-[100dvh]`, `h-[130%]` wrapper on the hero) — this is the correct pattern and should not cause layout shift, despite the `<img>` tags themselves lacking literal `width`/`height` attributes (expected/fine for `fill` mode, not a bug).
- **Medium:** 4 of 25 images sampled on the homepage are missing `alt` text entirely (empty string, not just decorative `alt=""` with `aria-hidden`). Combined with heavy use of `next/image` responsive `srcset` (up to 3840w variants generated per image), this is otherwise a solid image pipeline — the alt gap is the only real fix needed here.
- **INP:** No synchronous long-task patterns or render-blocking third-party scripts detected in source (no chat widgets, no heavy analytics tags found in the fetched HTML). Cannot be fully assessed without a live JS profiling run — recommend a Lighthouse/PSI pass once the site is live and indexable.
- No lab/field metrics available (no CrUX history exists yet for either the preview or unlaunched production domain — expected, not an issue).

## 7. Structured Data — PRESENT (depth review out of scope; see `seo-schema` findings)

Confirmed JSON-LD present sitewide and page-type-appropriate:
- Every page: `SportsActivityLocation`, `TouristAttraction`, `BreadcrumbList`.
- Package detail pages additionally: `FAQPage`.
- Blog posts additionally: `BlogPosting`.

This audit only confirms presence/type per page; validate against schema.org requirements and test in Google's Rich Results Test separately (covered by the `seo-schema` sub-agent).

## 8. JavaScript Rendering — PASS

- Confirmed via response headers: `X-Nextjs-Prerender: 1` on every page tested — content is prerendered at build/request time, not client-rendered.
- Confirmed via raw (non-JS) fetch: full body copy, headings, and word counts were extractable directly from the raw HTTP response for all 18 pages — no headless-browser render was needed to see content (title, meta description, H1–H2 text, and JSON-LD were all present in the raw document). This means Googlebot does not need to execute JavaScript to index page content.
- App Router RSC streaming markers (`self.__next_f`) present but do not gate initial content visibility — hydration payload is additive, not a prerequisite for crawlable text.

## 9. IndexNow Protocol — NOT APPLICABLE (pre-launch)

- No IndexNow key file or submission activity expected/found — correct, since the site is not indexable yet.
- **Recommendation (post-launch):** Once live and unblocked, implement IndexNow (Bing/Yandex/Naver) via a key file at `/{key}.txt` and ping on publish/update, particularly for the blog section which will have an ongoing content cadence.

---

## Prioritized Issues

### Critical
- None found in the current build. (The noindex/Disallow state is intentionally excluded from this list — see the launch-gate checklist at the top of this report, which functions as this audit's top-priority item.)

### High
- None found.

### Medium
1. **Missing security headers** — no CSP, `X-Content-Type-Options`, `X-Frame-Options`/frame-ancestors, `Referrer-Policy`, or `Permissions-Policy` on any response. Add via `next.config.js` `headers()` or `vercel.json`.
2. **4 images missing `alt` text** on the homepage sample (non-decorative images) — accessibility and image-SEO gap. Audit full image set sitewide before launch.
3. **`robots.txt` has no `Sitemap:` directive**, independent of the current `Disallow: /`. Add once the file is unblocked for production.

### Low
1. `X-Powered-By: Next.js` header exposed (inconsistently) — set `poweredByHeader: false` in `next.config.js`.
2. `/gallery` page is thin on extractable text (~19 words) — consider a short intro paragraph and rely on descriptive `alt` text per image.
3. IndexNow not yet implemented — add post-launch, low urgency given manual sitemap submission will also work initially.

### Info
- Sitemap `<loc>` and page `<link rel="canonical">` values both correctly point to the production domain already (env-var driven) — confirmed no canonical points at the `.vercel.app` preview host. No action needed.
- Structured data present and page-type-appropriate sitewide; detailed schema validation deferred to `seo-schema` findings.
- Content across packages/gallery/about pages currently uses Unsplash stock photography (proxied through `next/image`) rather than the operator's own trip photos — expected placeholder content per project notes pending client sign-off; flag for real photography before launch, not a technical defect.

---

## Methodology Notes

- Raw HTTP fetches only (no Google API/CrUX credentials configured, per task scope) — all findings are source-inspection based, not lab or field performance data.
- All 18 sitemap URLs fetched directly (`fetch_page.py`) and parsed (`parse_html.py`); homepage additionally inspected at the raw-HTML level for image/CWV signal detail.
- Header checks performed against: `/`, `http://` root, bare-domain (no trailing slash), `/packages`, `/packages/` (trailing slash), `/robots.txt`, and a deliberate 404 path.
- JS-rendering assessment based on comparing raw (non-rendered) HTTP response content against expected page content — no headless render was required to confirm text visibility, consistent with `X-Nextjs-Prerender: 1`.
