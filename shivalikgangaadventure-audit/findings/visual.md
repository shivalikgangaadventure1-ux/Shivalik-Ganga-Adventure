# Visual / Mobile UX Audit — Shivalik Ganga Adventure (Follow-Up Pass)

Target: http://localhost:4100 (local production build)
Pages audited: `/` (home), `/packages`, `/packages/brahmpuri-to-nim-beach`, `/gallery`, `/contact`
Viewports: Desktop (1920×1080), Mobile (375×812, iPhone-class, DPR 2)
Audit date: 2026-08-15 (follow-up to an earlier-today pass; verifies fixes + photo swap + new logo lockup)

Screenshots saved to `c:\Shivalik-Ganga-Adventure\shivalikgangaadventure-audit\screenshots\` (all overwritten):
- `home-desktop.png`, `home-mobile.png`, `home-desktop-full.png`, `home-mobile-full.png`
- `packages-desktop.png`, `packages-mobile.png`, `packages-desktop-full.png`, `packages-mobile-full.png`
- `package-detail-desktop.png`, `package-detail-mobile.png`, `package-detail-desktop-full.png`, `package-detail-mobile-full.png`
- `gallery-desktop.png`, `gallery-mobile.png`, `gallery-desktop-full.png`, `gallery-mobile-full.png`
- `contact-desktop.png`, `contact-mobile.png`, `contact-desktop-full.png`, `contact-mobile-full.png`
- `header-desktop-top.png` / `header-desktop-scrolled.png` / `header-mobile-top.png` / `header-mobile-scrolled.png` / `header-mobile-menu-open.png` — logo/nav variant checks
- `home-desktop-full-noscroll-artifact.png`, `home-mobile-full-noscroll-artifact.png`, `packages-desktop-full-noscroll-artifact.png`, `packages-mobile-full-noscroll-artifact.png` — evidence copies of the naive (no pre-scroll) full-page capture that shows the blank-section screenshot artifact investigated below; the canonical `*-full.png` files were replaced with post-scroll captures that reflect what a real user sees
- Raw automated-check data: `screenshots\_deep_check_results_v2.json`, `screenshots\_header_check.json`

All 10 page/viewport captures succeeded (no timeouts, no console errors on any page).

---

## Verified: The "Blank Sections" Question (raised mid-audit)

Initial naive full-page screenshots (`*-full-noscroll-artifact.png`) showed large blank white/dark gaps where the package cards, destination cards, achievement stats copy, and testimonial cards should be, on both `/` and `/packages`. This was investigated fully before finalizing findings:

- **Raw server-rendered HTML** (`curl` of `/`, view-source, not the rendered DOM) **contains all the missing content** — "Brahmpuri to Nim Beach" and other card text appear multiple times, all 5 package cards render, testimonial text is present. This is **not a content or hydration bug**; nothing is missing from the SSR output.
- The raw HTML **does** contain 32 inline `opacity:0` styles on the affected elements — consistent with a scroll-triggered entrance-animation library (framer-motion `whileInView` or equivalent) that sets `opacity:0` until an element's IntersectionObserver fires.
- **Re-captured full-page screenshots after programmatically scrolling through the entire page first** (`home-desktop-full.png`, `home-mobile-full.png`, `packages-desktop-full.png`, `packages-mobile-full.png` — now the canonical files) show **all content fully visible and correctly laid out**: package cards, destination cards, achievements stats, testimonials, CTA banner all render with real client photography, no missing content, no broken layout.
- **Verdict: this is a screenshot-methodology artifact, not a real-user-facing bug.** A person scrolling the page at a normal pace will trigger each section's entrance animation as it nears the viewport, exactly as designed. It only produces a "blank" render when a tool captures the full page height in one shot (via CDP) without ever scrolling — which is what the plugin's own screenshot tooling did on the first pass, and would similarly affect Playwright's `full_page=True` screenshots, PDF/print output, and potentially search-engine renderers that don't scroll before rasterizing.
- **One related finding did surface from this investigation** (see Medium #1 below): the animation does **not** respect `prefers-reduced-motion` — tested by emulating `reduced_motion='reduce'` and confirming the package cards were still stuck at `opacity:0` on initial load without scrolling.

---

## Critical

None identified. No broken layouts, horizontal scroll, missing content, or blocking rendering failures on any of the 5 pages × 2 viewports.

## High

None identified in this pass. Both previously-flagged High items from the earlier-today audit are confirmed fixed (see Verified Fixes below).

## Medium

1. **Scroll-triggered entrance animations do not respect `prefers-reduced-motion`.** With reduced motion emulated, the "Most Popular Rafting Packages" cards on `/` still load at `opacity:0` and stay invisible until the user scrolls near them — the same visual result a motion-sensitive user would get regardless of their OS/browser accessibility preference. Real scrolling users are unaffected (see verified section above), but this affects: (a) users with `prefers-reduced-motion: reduce` set, who should see content immediately with no animation-gated visibility per WCAG 2.3.3 best practice, (b) deep-links / anchor-jumps that land mid-page without a scroll gesture, (c) print/"Save as PDF" output, and (d) automated tooling (QA screenshot scripts, some crawler renderers) that don't simulate scrolling. Recommend either checking `prefers-reduced-motion` and skipping the opacity gate, or using a more conservative viewport-margin/threshold so elements resolve to visible well before they's needed.

2. **Footer link tap targets improved but a residual sub-44px row remains.** The main footer link columns (Home, Packages, Destinations, Gallery, About, Blog, Contact, About Us, Safety Guidelines, Privacy Policy, Terms of Use) now render at **32px tall** (up from ~16-17px in the prior audit) — a real improvement, though still under the 44×44px WCAG 2.5.5 / 48×48px Google guidance. The very bottom copyright-bar links ("Terms of Use", "Privacy Policy" duplicated in the legal strip) remain at **16px tall**, unchanged from before. Low risk (secondary/legal links) but worth a final pass if footer tap targets are being revisited.

3. **A zero-size but focusable "Book Now" element exists in the desktop DOM on `/packages`, the package-detail page, `/gallery`, and `/contact`.** This is the mobile sticky bottom CTA bar (`class` includes `fixed inset-x-0 bottom-0 ...`, `min-h-[48px]`), which is correctly sized and visible at 303×48px on mobile, but on desktop its container collapses to 0×0 rather than being removed from the tab order (`display` still resolves to `flex`, `tabIndex: 0`, `visibility: visible`). A sighted keyboard user tabbing through the page will land on an invisible focus target with no visible focus ring — a minor WCAG 2.4.7 (Focus Visible) gap. Recommend `hidden md:hidden` (removing from the accessibility tree) rather than a width/layout-only collapse, or `tabindex="-1"` at desktop breakpoints.

## Low

4. **Footer link list duplicates header nav labels for assistive tech**, same pattern noted in the prior audit (Home, Packages, Destinations, Gallery, About, Blog, Contact appear in both header and footer `<nav>`-equivalents). Not a functional bug; recommend distinguishing landmarks via `aria-label` if not already present.

## Verified Fixes (from the prior audit's High-severity findings)

- ✅ **"Book Now" package-card tap target fix confirmed landed.** Every in-card "Book Now" link on `/` and `/packages` now measures **100×48px** (was ~92×16px previously) — clears the 48×48px minimum. Confirmed across all 3 home cards, all 5 packages-page cards, at both viewports.
- ✅ **Footer link tap targets padded up**, from ~16-17px to **32px** for the main link columns (partial fix — see Medium #2 for the residual 16px copyright-bar row).
- ✅ **CLS-risk proxy is now 0 images on every page** (structural check: `<img>` missing both width/height and aspect-ratio, with no fixed-height parent container). This is a major improvement over the prior audit, which found 8–20 at-risk images per page. Consistent with the site now using `next/image` with proper sizing across the recently-swapped client photography.

## Real Client Photography Swap — No Regressions Found

- **No broken images** on any of the 5 pages × 2 viewports. A `naturalWidth === 0` heuristic initially flagged several images per page as "broken" (e.g. `achievements-bg.webp`, `cta-bg.webp`, 6× `gallery/rafting-img-*.webp`, several `/images/destinations/*.webp`) — **this was a false positive**, confirmed by (a) direct `curl` requests to the same `_next/image` URLs all returning **HTTP 200**, and (b) each flagged `<img>` having `loading="lazy"` — these are simply below-the-fold images that hadn't entered the viewport yet at the moment of the DOM check. Real client photos (hero, package cards, destination cards, gallery grid) all render correctly with no visual artifacts, no aspect-ratio distortion, no missing assets.
- **No layout-shift regression** from the photo swap — CLS-risk proxy is 0/page as noted above.

## New Horizontal Logo Lockup — No Overflow or Collision

Checked at both viewports, in both header states (transparent-over-hero at scroll-top, and white-scrolled):

- **Aspect ratio measured at 4.83:1 (desktop) and 4.86:1 (mobile)** — matches the ~4.8:1 spec. Rendered natural size (209×43 desktop request, 175×36 mobile) is close to display size, no visible stretching or squashing.
- **Light→color variant swap confirmed working correctly on scroll.** At scroll-top the header is transparent (`rgba(0,0,0,0)`) with `logo-transparent.webp` (white/light logo readable over the hero photo). Past ~900px scroll, the header background switches to `rgba(255,255,255,0.95)` and the logo swaps to `logo-white.webp`, which — despite the filename — renders as the **full-color** navy/orange/green lockup, clearly legible on the white bar. (Note: the asset filename `logo-white.webp` is misleading relative to its actual rendered appearance — cosmetic naming issue only, not a bug.)
- **No overflow detected at either viewport** (`overflowLeft`/`overflowRight` both false) and **no bounding-box collisions** between the logo and nav items — checked programmatically across all header `<a>/<button>/<img>` elements (11 items desktop, 0 overlaps; 3 items mobile — logo + hamburger button, 0 overlaps).
- **Mobile hamburger menu opens cleanly** (`header-mobile-menu-open.png`): full-color logo at top of the slide-out panel, 7 nav links (Home/Packages/Destinations/Gallery/About/Blog/Contact) each with generous vertical spacing, Call Now / WhatsApp Booking buttons pinned to the bottom of the panel at full width — no wrapping, no cramped spacing, no overlap with the close (×) icon.

## Above-the-Fold / Primary CTA

Confirmed on all 5 pages, both viewports:
- H1 visible without scrolling in every case (mobile font size 30-36px, desktop 48-60px).
- Home mobile: H1 top 237px/bottom 372px of 812px viewport; primary CTAs "Book Your Adventure" (283×56) and "View Packages" (198×60) both above the fold and both exceed the 48px tap-target minimum.
- Packages / package-detail / gallery / contact: a persistent sticky "Book Now" bar (303×48px, mobile) renders above/near the fold on every page — a strong pattern for a mobile-first booking flow.
- No horizontal scroll on any page/viewport (`document.documentElement.scrollWidth` matched `window.innerWidth` exactly in all 10 checks).
- No console errors / page errors captured on any page load.

## Slug Change Note

`/packages/brahmpuri-to-rishikesh` (old pattern) has been replaced by **`/packages/brahmpuri-to-nim-beach`** — confirmed reachable (HTTP 200), H1 "Brahmpuri to Nim Beach" renders correctly, hero image and package detail content all present with real client photography. If the old slug is still linked anywhere externally (backlinks, previously-shared URLs, search index), it should 301-redirect to the new slug — not verified in this pass (out of scope for a visual audit; flag for the technical/SEO audit).

## Not Fully Verified / Recommended Follow-Up

- **Live Cumulative Layout Shift (CLS) score** — the 0-risk result above is still a structural proxy (missing width/height/aspect-ratio check), not a measured `web-vitals` CLS number. Recommend a Lighthouse pass to convert this into a real metric.
- **Contrast ratios** — not computed against actual rendered colors in this pass.
- **`prefers-reduced-motion` fix verification** — flagged in Medium #1 but not re-tested after a fix; recommend a follow-up check once addressed.
- **Old slug redirect** (`/packages/brahmpuri-to-rishikesh` → new slug) — not tested; flagged above for the technical/SEO audit to confirm a 301 exists if the old URL was ever public.
