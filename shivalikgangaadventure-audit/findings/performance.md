# Performance / Core Web Vitals Audit — Shivalik Ganga Adventure

**Target:** http://localhost:4100 (local production build — `npm run start`, not dev mode)
**Date:** 2026-08-15 (fresh independent pass, run after the fixes applied earlier today)
**Method:** Lighthouse 13.4.1 CLI, mobile emulation + simulated throttling (default Lighthouse mobile config), single run per page, `--only-categories=performance`.

## IMPORTANT — Data source disclaimer

**No Google API key is configured in this environment**, so PageSpeed Insights API and CrUX field data (`pagespeed_check.py`, `crux_history.py`) were unavailable. This report is built entirely from **local Lighthouse lab data** (single-run, simulated mobile throttling) — the same limitation noted in the prior audit.

**Implications (unchanged from prior audit):**
- Lab data reflects one synthetic run under CPU/network throttling, not the real 75th-percentile distribution Google uses to grade Core Web Vitals.
- **INP has no lab equivalent.** Total Blocking Time (TBT) is used below as the standard proxy — it correlates with INP but is not the same metric.
- Treat all ratings below as **directional lab estimates**, not pass/fail against Google's actual CWV assessment.
- **TTFB caveat (new for this pass):** since the target is `localhost:4100` (loopback, no real network hop), TTFB readings below (3–6ms) are artificially near-zero and are **not representative of real-world server/edge latency**. Do not use these TTFB numbers for production capacity planning — re-measure against the real deployed domain once available.

## Lab scores summary (mobile, Lighthouse 13.4.1)

| Page | Perf Score | LCP | CLS | TBT (INP proxy) | FCP | TTFB (loopback, not representative) | Total Weight |
|---|---|---|---|---|---|---|---|
| Home `/` | 83/100 | 4.35s (**Poor**) | 0.000 (Good) | 30ms (Good) | 2.12s | ~6ms | 643 KB |
| Packages `/packages` | 83/100 | 3.77s (Needs Improvement) | 0.109 (Needs Improvement) | 90ms (Good) | 2.12s | ~5ms | 678 KB |
| Package Detail `/packages/brahmpuri-to-nim-beach` | 88/100 | 3.54s (Needs Improvement) | 0.000 (Good) | 76ms (Good) | 2.26s | ~5ms | 503 KB |
| Gallery `/gallery` | 96/100 | 2.70s (Needs Improvement) | 0.000 (Good) | 38ms (Good) | 1.36s | ~4ms | 702 KB |
| Blog `/blog` | 90/100 | 3.59s (Needs Improvement) | 0.000 (Good) | 82ms (Good) | 1.36s | ~3ms | 771 KB |

All five reports generated successfully; no pages failed to render.

**Bottom line:** LCP still misses "Good" (≤2.5s) on **all 5 pages** — and the Home page has now moved into the **"Poor" band (>4.0s)**, a regression from the prior audit's 3.12s "Needs Improvement" reading. `/packages` now also shows a CLS regression (0.109, "Needs Improvement") that was not present before. TBT/INP-proxy remains comfortably "Good" everywhere. Some fixes from the prior audit landed cleanly (see below); others were implemented in source but did not translate into the compiled output, and one previously-flagged issue (Unsplash hotlinking) is only partially resolved.

## Resource weight breakdown (image / JS / font / CSS / other)

| Page | Image | Script | Font | Stylesheet | Other + Doc |
|---|---|---|---|---|---|
| Home | 236 KB | 196 KB | 157 KB | 10 KB | 46 KB |
| Packages | 255 KB | 198 KB | 157 KB | 10 KB | 59 KB |
| Package Detail | 74 KB | 198 KB | 173 KB | 10 KB | 48 KB |
| Gallery | 389 KB | 195 KB | 73 KB | 10 KB | 35 KB |
| Blog | 443 KB | 194 KB | 73 KB | 10 KB | 52 KB |

Images still dominate on Gallery/Blog. Package Detail's image weight dropped sharply (previously 205 KB → now 74 KB) because that single package hero photo is smaller/better-compressed than the old placeholder. Script and font weight are essentially unchanged from the prior audit — neither the CSP/security-header change nor the photography swap touched the JS/font bundles, as expected.

---

## Verification of fixes claimed since the prior audit

**1. Oversized header logo — CONFIRMED FIXED.** The nav logo now requests a single `w=384` variant of `logo-transparent.webp` at **8.8 KB transferred**, with `sizes="(min-width: 640px) 210px, 175px"` correctly scoped to its rendered box. The prior audit flagged **86.8 KB wasted on this image, on every page**; that waste is now gone. Confirmed real savings: **~78–85 KB per page load, every page** — the single highest-impact fix from the prior list, and it worked exactly as recommended.

**2. Security headers via `next.config.ts` — CONFIRMED LIVE.** `curl -I http://localhost:4100/` returns `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and a `Content-Security-Policy` on every response. Not a Core Web Vitals metric, but confirmed working and not blocking render.

**3. `sizes` attributes on newly-swapped local package/gallery photos — NOT lost, correctly scoped.** Verified via rendered HTML: package cards use `sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"`, gallery thumbnails use `sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"`, blog cards use `sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"`. These are sensible, breakpoint-matched values — the swap from Unsplash to local files did not regress this. See H2 below, though: real photography at high native resolution still produces meaningfully larger bytes-per-breakpoint than the old Unsplash CDN thumbnails did, so some `image-delivery-insight` waste remains (see H2).

**4. New logo variants (navbar/footer horizontal lockups) — introduced a new CLS regression on `/packages`.** See H3 below.

**5. "All package/destination/hero photography replaced with real client images" — ONLY PARTIALLY TRUE.** Package/destination **card** thumbnails on `/`, `/packages`, and `/gallery` are confirmed local WebP now. However, the `/packages` page **hero banner itself** (the `PageHero` component, `w=3840&q=75` request) is still pulling live from `images.unsplash.com/photo-1574116504481-...`, and the **Blog** page still serves 3 Unsplash-hotlinked cover images. `next.config.ts`'s CSP (`img-src 'self' data: https://images.unsplash.com`) and `images.remotePatterns` both still explicitly allow-list `images.unsplash.com`, confirming this is intentional/unfinished rather than a leftover artifact. See H1 below — this directly matters for LCP on `/packages`.

---

## Findings

### Critical

**C1. Home page LCP has regressed into the "Poor" band (4.35s, threshold is >4.0s)**
The homepage — the single most important landing page — now measures 4.35s LCP under simulated mobile throttling, up from 3.12s ("Needs Improvement") in the prior audit. This is worse despite the logo fix, which should have helped. The LCP element is the full-viewport parallax hero image (`hero-home.webp`, rendered via `next/image` with `fill` + `priority`, wrapped in a Framer Motion parallax `<motion.div>`). Framer Motion's JS-driven `useScroll`/`useTransform` wrapper around the hero likely delays paint relative to a plain CSS background, and the `priority` prop is not resulting in `fetchpriority="high"` in the compiled output (see H2) — so the browser has no early signal to prioritize this request.
*Recommendation:* (1) Fix H2 first (cheap, mechanical). (2) Consider rendering the hero `<Image>` outside/before the Framer Motion wrapper (or with `will-change`/CSS-only parallax) so LCP paint isn't gated on client JS hydration of the animation wrapper. (3) Re-measure — this is the top priority for this pass.

### High

**H1. Photography migration is incomplete: Unsplash hotlinks remain on `/packages` hero banner and all 3 `/blog` cover images**
`image-delivery-insight` flags the `/packages` page's Unsplash hero request (`w=3840&q=75`, ~90 KB, **82 KB flagged as wasted**) and three Unsplash-hotlinked blog cover images totaling **~250 KB wasted** (138 KB + 65 KB + 48 KB across the three largest). These are exactly the kind of oversized, unthrottled hero/cover assets LCP is most sensitive to, and `/packages` LCP (3.77s) and `/blog` LCP (3.59s) are two of the three worst-scoring pages in this pass. This was flagged as Medium in the prior audit ("replace Unsplash-hotlinked hero/cover images with self-hosted assets") — given it directly explains two of the four "Needs Improvement" LCP readings, it is elevated to High this pass.
*Recommendation:* Finish the migration already applied to package/gallery cards: replace the `/packages` PageHero banner image and the 3 blog cover images with local, pre-sized WebP assets in the same `/images/packages/` or `/images/blog/` pattern already used elsewhere on the site.

**H2. `priority` prop is present in source but is NOT producing `fetchpriority="high"` in the rendered HTML — LCP images remain unhinted sitewide**
Both `sections/Hero.tsx` (home) and `components/PageHero.tsx` (interior pages) already have `priority` set on their LCP `<Image>` (confirmed by reading source). Despite this, `curl`-inspection of the served HTML on every one of the 5 pages shows **zero `fetchpriority` attributes anywhere** — not on the `<img>` tags and not on the `<link rel="preload">` tags Next.js emits for these images (the preload links for the logo and hero image have no `fetchPriority` attribute, while an unrelated script preload explicitly has `fetchPriority="low"`). Lighthouse's `lcp-discovery-insight` audit confirms `priorityHinted: false` on Packages, Package Detail, Gallery, and Blog. This is not a code-authoring gap (the prop is there) — it appears to be a Next.js 15.0.3 behavior gap where `priority` isn't reliably lowering to a `fetchpriority="high"` hint for `fill`-mode images in this build. This is the same underlying issue flagged last time (then labeled H2 with a fix recommendation of "add priority prop") — the recommended fix was applied but did not resolve the symptom.
*Recommendation:* Manually pass `fetchPriority="high"` as an explicit prop to the hero `<Image>` components (Next 15 supports this as a pass-through prop distinct from `priority`), or add an explicit `<link rel="preload" as="image" fetchpriority="high">` in `<head>` for the hero image on each template. Verify in rendered HTML (not just source) after the change — this pass shows source-level fixes can silently fail to compile through.

**H3. New CLS regression on `/packages`: footer logo + web font swap (0.109, "Needs Improvement")**
This is a new issue — the prior audit measured CLS at 0.000 on every page. In this pass, `/packages` alone measured 0.109. Lighthouse's `layout-shifts` audit attributes it to a paragraph reflowing (`<p class="mt-4 ...">` in the page intro section) at the same moment two events occur: (1) the new footer logo lockup (`img.h-9`, `width="1000" height="207"`, rendered at `sizes="(min-width:640px) 210px, 175px"`) is flagged as "Media element lacking an explicit size" despite having width/height attributes — likely because `h-9 w-auto` CSS overrides the intrinsic aspect-ratio box Next/Image would otherwise reserve; and (2) 3 self-hosted woff2 web fonts finish loading and swap in, triggering text reflow. The other 4 pages did not reproduce this shift in this single run, so it may be timing-sensitive rather than 100% deterministic — but the footer logo is present sitewide, so it's a latent risk on every page, not just Packages.
*Recommendation:* Add explicit `aspect-ratio` CSS (matching the 1000:207 intrinsic ratio) to the footer/nav logo `<Image>` so its box is reserved independent of `h-9 w-auto` Tailwind sizing. Separately, confirm `font-display: swap` (or better, `size-adjust` via `next/font`'s automatic fallback-font metrics) is minimizing the reflow delta when the custom font swaps in.

### Medium

**M1. Residual image-delivery waste on local package/gallery photos (sizes attribute is correct, but source files are large)**
Even with correctly-scoped `sizes` attributes (confirmed above), `image-delivery-insight` still flags real waste on the new local photography: e.g. gallery thumbnails (`rafting-clip-7-poster.webp`, `rafting-clip-2-poster.webp`, etc.) each show 20–28 KB of estimated waste per image across ~15 grid items on `/gallery`; package cards show 13–35 KB each. This is a smaller-magnitude version of the prior audit's M1 finding, not fully resolved — the responsive breakpoints are working, but the underlying source photography appears to be high-resolution originals that `next/image`'s default `quality=75` doesn't compress aggressively enough at the smallest breakpoints actually used on mobile.
*Recommendation:* Pre-resize/compress source images before upload (don't rely solely on `next/image`'s runtime resizing for very large originals), or lower `quality` specifically for small thumbnail breakpoints.

**M2. Package Detail page has the heaviest font payload (173 KB) and still ships 3 separate woff2 files on Home/Packages/Package Detail**
Unchanged from the prior audit's L2 finding — font weight is 157–173 KB on 3 of 5 pages (72–73 KB on Gallery/Blog, which use a lighter subset). No change in this pass; still worth subsetting/trimming unused weights.
*Recommendation:* Same as before — confirm subsetting (Latin-only if applicable) and audit which weights are actually used in the design system.

**M3. Unused JavaScript persists at ~21–23 KB in the same vendor chunk, on every page**
`unused-javascript` flags ~21 KB unused on Home; the same magnitude was seen across all 5 pages, consistent with the prior audit's L4 finding (previously 22–23 KB in chunk `287-...`). Unresolved, same root cause as before.
*Recommendation:* Identify the chunk's contents and code-split/dynamically import what isn't needed on every route.

### Low

**L1. Render-blocking CSS chain shortened but not eliminated (~156ms on Home, down from ~590–600ms previously)**
`render-blocking-insight` now shows a single blocking stylesheet (`db69a5b8f40e6a5c.css`, 10.4 KB) costing ~156ms on the Home page critical path — a meaningful improvement from the prior audit's ~590–600ms document→CSS→font chain. Worth a final pass but no longer a priority item.
*Recommendation:* Consider inlining critical above-the-fold CSS to remove this last render-blocking hop entirely.

**L2. Legacy JavaScript polyfill audit no longer flags issues**
The prior audit's L3 finding (unnecessary `Array.prototype.at/flat`, `Object.fromEntries`, etc. polyfills, ~11.7 KB) did not appear as a failing audit in any of the 5 reports this pass. Likely resolved (browserslist/target update) or reclassified under Lighthouse 13.4.1's restructured audit set — not independently re-verified beyond absence of the flag.

**L3. Gallery page TBT no longer the outlier (38ms, down from 138ms previously); Blog is now the highest at 82ms**
Both are comfortably under the 200ms "Good" INP-proxy threshold. Ranking changed since the prior pass but nothing here is a concern in lab data.

### Info

**I1. CLS is clean on 4 of 5 pages (0.000)** — only `/packages` regressed this pass; see H3.

**I2. TTFB readings (3–6ms) are a lab/loopback artifact, not a real signal.** Localhost has no network round-trip; re-measure against the real deployed domain (ideally with CrUX field data once traffic accumulates) before drawing any TTFB conclusions.

**I3. Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy) confirmed live via `next.config.ts` and verified with `curl -I`.** No render-blocking or CWV side effects observed from the new headers.

**I4. Next/Image AVIF/WebP delivery continues to work correctly** — no format-related findings this pass; all residual image waste (H1, M1) is a *sizing/source-resolution* issue, not a codec issue.

---

## Priority order for remediation

1. **C1** — Home hero LCP regressed into "Poor" (4.35s) — investigate Framer Motion parallax wrapper's effect on LCP paint timing, fix H2 first.
2. **H2** — `fetchpriority="high"` still not reaching compiled output despite `priority` prop in source; verify with an explicit `fetchPriority` prop or manual preload tag, and confirm in rendered HTML (not just source) this time.
3. **H1** — Finish the photography migration: replace remaining Unsplash hotlinks on `/packages` hero banner and all 3 `/blog` cover images with local assets, matching the pattern already used for package/gallery cards.
4. **H3** — Fix footer logo CLS regression on `/packages` (add explicit `aspect-ratio`, re-verify across all pages — this was a single-run measurement).
5. **M1–M3** — Source-image pre-compression, font subsetting, unused-JS trimming — lower effort, address opportunistically.
6. **L1–L3** — Already improved or resolved; low-priority polish only.

## Files referenced
- Lighthouse JSON reports (all 5 pages, generated successfully this pass): `home.json`, `packages.json`, `packagedetail.json`, `gallery.json`, `blog.json` — local scratchpad, not part of the repo.
- Verified via direct source read: `next.config.ts`, `components/PageHero.tsx`, `sections/Hero.tsx`.
- Verified via `curl`: response headers on `/`, rendered `<img>`/`<link rel=preload>` markup on all 5 pages.
