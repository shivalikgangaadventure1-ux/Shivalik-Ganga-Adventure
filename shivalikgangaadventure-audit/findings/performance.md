# Performance / Core Web Vitals Audit — Shivalik Ganga Adventure

**Target:** https://shivalik-ganga-adventure.vercel.app/ (Vercel preview, pre-launch)
**Date:** 2026-08-15
**Method:** Lighthouse 13.4.1 CLI, mobile emulation + simulated throttling (default Lighthouse mobile config), single run per page.

## IMPORTANT — Data source disclaimer

**No Google API key is configured in this environment**, so PageSpeed Insights API and CrUX field data (`pagespeed_check.py`, `lcp_subparts.py`) were unavailable (both require `GOOGLE_API_KEY`). This report is built entirely from **local Lighthouse lab data** (single-run, simulated mobile throttling). CrUX real-user field data is also structurally unavailable pre-launch regardless of API key, since the domain needs 28 days of Chrome UX Report traffic — this preview URL has none.

**Implications:**
- Lab data reflects one synthetic run under CPU/network throttling, not the real 75th-percentile distribution Google uses to grade Core Web Vitals.
- **INP has no lab equivalent.** Total Blocking Time (TBT) is used below as the standard proxy — it correlates with INP but is not the same metric. Real INP can only be measured from field data (CrUX) or RUM after launch.
- Treat all ratings below as **directional pre-launch estimates**, not pass/fail against Google's actual CWV assessment. Re-run this audit against the production domain with `pagespeed_check.py` once a Google API key is configured and the site has real traffic.

## Lab scores summary (mobile, Lighthouse 13)

| Page | Perf Score | LCP | CLS | TBT (INP proxy) | FCP | TTFB | Total Weight |
|---|---|---|---|---|---|---|---|
| Home `/` | 90/100 | 3.12s (Needs Improvement) | 0 (Good) | 113ms (Good) | 2.09s | 44ms | 658 KB |
| Packages `/packages` | 99/100 | 1.81s (Good) | 0 (Good) | 45ms (Good) | 1.16s | 39ms | 786 KB |
| Package Detail `/packages/brahmpuri-to-rishikesh` | 92/100 | 3.09s (Needs Improvement) | 0 (Good) | 55ms (Good) | 1.77s | 59ms | 624 KB |
| Gallery `/gallery` | 87/100 | 3.56s (Needs Improvement) | 0 (Good) | 138ms (Good) | 1.39s | 43ms | 658 KB |
| Blog `/blog` | 91/100 | 3.44s (Needs Improvement) | 0 (Good) | 59ms (Good) | 1.19s | 44ms | 652 KB |

All five reports generated successfully; no pages failed to render.

**Bottom line:** 4 of 5 pages land in the LCP "Needs Improvement" band (2.5–4.0s) under simulated mobile throttling; only `/packages` scores "Good". CLS is clean everywhere. TBT/INP-proxy is comfortably "Good" on every page. TTFB is excellent site-wide (Vercel edge, 39–59ms).

## Resource weight breakdown (image / JS / font / CSS)

| Page | Image | Script | Font | Stylesheet | Other |
|---|---|---|---|---|---|
| Home | 260 KB | 192 KB | 155 KB | 10 KB | 41 KB |
| Packages | 374 KB | 195 KB | 155 KB | 10 KB | 52 KB |
| Package Detail | 205 KB | 195 KB | 170 KB | 10 KB | 43 KB |
| Gallery | 352 KB | 192 KB | 72 KB | 10 KB | 33 KB |
| Blog | 334 KB | 190 KB | 72 KB | 10 KB | 46 KB |

Images dominate on Packages/Gallery/Blog as expected for an image-heavy adventure-tourism site. Fonts are a surprisingly large share on Home/Packages/Package Detail (155–170 KB across 3 separate woff2 files — self-hosted via next/font, good for TTFB/privacy, but heavy).

---

## Findings

### Critical
None identified.

### High

**H1. LCP misses the "Good" threshold on 4 of 5 pages (lab estimate)**
Home (3.12s), Package Detail (3.09s), Gallery (3.56s), Blog (3.44s) all fall in the 2.5–4.0s "Needs Improvement" band under simulated mobile throttling. Only `/packages` (1.81s) passes. This is a lab/single-run estimate, not CrUX field data — but the consistency across 4 independent pages indicates a systemic issue, not noise. See H2/H3 below for the two concrete root causes found in the Lighthouse traces.
*Recommendation:* Fix H2 and H3 first (both are code-level, low-effort, high-impact), then re-measure.

**H2. Hero/LCP images are not marked `fetchpriority="high"`**
Lighthouse's `lcp-discovery-insight` audit flags `priorityHinted: false` on Packages, Package Detail, Gallery, and Blog — the hero `<img>` (Next/Image `fill` background, class `object-cover`) is eagerly loaded (good) but not prioritized, so the browser doesn't learn it's the LCP candidate until later in the load sequence.
*Recommendation:* Add the Next.js `priority` prop to the hero/cover `<Image>` component on each page template (this auto-sets `fetchpriority="high"` and removes `loading="lazy"`). Also confirmed via `preload_check.py`: 0 elements with `fetchpriority=high` site-wide, no `<link rel="preload">` for the LCP image.

**H3. Site header logo is served ~40x larger than needed, on every single page**
The nav logo (`logo-shivalik-adv.webp`) is requested via `/_next/image?...&w=2048` at native 1006×1024px but displayed at only 55×56px in the header. Lighthouse's `image-delivery-insight` audit flags **86.8 KB wasted on this one image, on every page** (Home, Packages, Package Detail, Gallery, Blog all show the identical finding) — roughly 13% of total page weight on the lightest pages. It is also marked `loading="lazy"` despite being an always-visible, above-the-fold header element.
*Recommendation:* Constrain the Next/Image `sizes` prop for the logo to its actual rendered box (e.g. `sizes="56px"`) so the image optimizer generates a correctly-scaled variant instead of defaulting to the largest breakpoint. Remove `loading="lazy"` from the header logo. Expected savings: ~85 KB per page load, every page, every visit.

### Medium

**M1. Card/grid images oversized relative to display size (Next/Image `sizes` misconfiguration)**
Beyond the logo, `image-delivery-insight` flags multiple package/blog card images downloaded far larger than their rendered box — e.g. a 750×469 source displayed at 380×253 (Home, Blog cards), wasting 23–51 KB per image. Blog page alone has an estimated 187 KB of wasted image bytes (LCP metric-savings estimate: ~400ms), Package Detail ~109 KB (~150ms LCP savings), Home ~173 KB. This is a systemic `sizes` attribute issue on the grid/card `<Image>` components, not an isolated one-off.
*Recommendation:* Audit every `<Image>` usage in card/grid layouts and set `sizes` to match actual rendered width at each breakpoint (e.g. `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"`) instead of relying on defaults.

**M2. Hotlinked Unsplash images for package/blog cover art**
Package and blog card images are fetched live from `images.unsplash.com` per content frontmatter (proxied through Next/Image, which does convert them to AVIF — good). This is a production risk independent of pure performance: no `preconnect` hint exists for the Unsplash origin (confirmed via Lighthouse's dependency-tree insight — "no origins were preconnected" on every page), external hotlinking is subject to Unsplash rate limits/hotlink policy changes, and it adds an extra DNS+TLS negotiation on the image-load critical path for LCP-adjacent content.
*Recommendation:* Before launch, replace Unsplash-hotlinked hero/cover images with self-hosted, pre-optimized assets (already the pattern used for `/images/gallery/*` and `/images/logo/*`). If Unsplash images must stay short-term, add `<link rel="preconnect" href="https://images.unsplash.com">`.

**M3. Render-blocking CSS → font chain adds ~590-600ms to the critical path**
On Home, Packages, and Package Detail, Lighthouse's network-dependency-tree shows a chain of: document → single bundled stylesheet (`58fc406dceb862f2.css`, ~10 KB) → a woff2 font file (85 KB) that only starts downloading after the CSS resolves, totaling ~590-600ms before the chain completes. No preconnect hints are present anywhere on the site.
*Recommendation:* Preload the critical woff2 font directly (Next.js `next/font` normally does this automatically — verify it's not being bypassed) so it doesn't wait on the full CSS chain, and confirm `font-display: swap` is active (no `font-display` audit failure was seen, suggesting this is likely already correct — but the 85 KB single-file size is still worth investigating, see L2).

### Low

**L1. Gallery page has more long tasks than other pages (8 vs. 2)**
Total Blocking Time on Gallery (138ms) is the highest of the five pages tested, driven by 8 long tasks vs. 2 elsewhere — plausibly from decoding/laying out the larger number of gallery thumbnails. Still comfortably under the 200ms "Good" INP-proxy threshold in this lab run, but it's the page most likely to regress into "Needs Improvement" INP territory under real-world CPU conditions (mid-range Android) or with more gallery items added later.
*Recommendation:* Watch this page specifically once real INP field data is available; consider virtualizing/paginating the gallery grid if the image count grows.

**L2. Self-hosted font is unusually large (single 85 KB woff2 file)**
Three separate woff2 files total 155–170 KB on Home/Packages/Package Detail (72 KB on Gallery/Blog, which appear to use a lighter subset). One file alone is 85 KB, appearing to be a full/unsubsetted Latin+Extended character set with multiple weights bundled.
*Recommendation:* Confirm font subsetting (Latin-only if the site doesn't need Devanagari/other scripts) and check whether all loaded weights are actually used in the design system; trim unused weights.

**L3. Legacy JavaScript polyfills bundled unnecessarily (~11.7 KB)**
`legacy-javascript-insight` flags polyfills for `Array.prototype.at/flat/flatMap`, `Object.fromEntries/hasOwn`, `String.prototype.trimStart/trimEnd` — all natively supported in every evergreen browser Chrome/Safari/Firefox/Edge has shipped for years. Consistent across all 5 pages.
*Recommendation:* Update `browserslist`/Next.js target config to drop pre-2021 browser support and let the bundler skip these polyfills.

**L4. Consistent ~22 KB of unused JavaScript in one vendor chunk**
The same chunk (`287-42510d25adc46e56.js`) shows 22–23 KB of unused code on every page tested (`unused-javascript` audit).
*Recommendation:* Identify what's in this chunk and whether it can be code-split/dynamically imported so it only loads on the pages that need it.

### Info

**I1. CLS is clean — 0.000 measured on all 5 pages.** Next/Image's automatic `width`/`height` attributes are working correctly; no unsized-image or late-injected-content layout shift was detected in this lab run.

**I2. TTFB is excellent — 39–59ms on every page**, consistent with Vercel's edge network. Server response time is not a bottleneck anywhere on this site.

**I3. bfcache-eligible, no Speculation Rules configured.** `preload_check.py` confirms no `Cache-Control: no-store`, no `unload`/`beforeunload` listeners (good — page qualifies for back/forward cache). No `<script type="speculationrules">` block or header is present; adding one for prefetch/prerender of top nav paths (Packages, Gallery, package detail pages) would make in-site navigation feel near-instant, though this is an enhancement rather than a CWV compliance issue.

**I4. Next/Image AVIF conversion is already working correctly.** All sampled images (logo, Unsplash covers, local gallery images) are served as `image/avif` via the Vercel Image Optimizer — modern-format delivery is not an issue; the problem is exclusively oversized *dimensions* relative to display size (see H3/M1), not format or compression settings (one exception: one blog card image was also flagged for insufficient compression, see M1 detail).

---

## Priority order for remediation

1. H3 — fix oversized logo (single code change, ~85 KB/page savings, site-wide)
2. H2 — add `priority` prop to hero images (single code change per template)
3. M1 — fix `sizes` attributes on card/grid images (systemic but mechanical fix)
4. M2 — replace Unsplash hotlinks with self-hosted assets before real launch
5. M3 — verify font preload/chain
6. L1–L4 — lower-effort cleanup, address opportunistically

## Files referenced
- Lighthouse JSON reports (all 5 pages, generated successfully): `home.json`, `packages.json`, `packagedetail.json`, `gallery.json`, `blog.json` in local scratchpad (not part of repo).
