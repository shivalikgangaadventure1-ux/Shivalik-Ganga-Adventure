# Visual / Mobile UX Audit — Shivalik Ganga Adventure

Target: https://shivalik-ganga-adventure.vercel.app/ (Vercel preview, pre-launch)
Pages audited: `/` (home), `/packages`, `/packages/brahmpuri-to-rishikesh`, `/gallery`, `/contact`
Viewports: Desktop (1920×1080), Mobile (375×812, iPhone-class)

Screenshots saved to `c:\Shivalik-Ganga-Adventure\shivalikgangaadventure-audit\screenshots\`:
- `home-desktop.png`, `home-mobile.png`, `home-desktop-full.png`, `home-mobile-full.png`
- `packages-desktop.png`, `packages-mobile.png`, `packages-desktop-full.png`, `packages-mobile-full.png`
- `package-detail-desktop.png`, `package-detail-mobile.png`, `package-detail-desktop-full.png`, `package-detail-mobile-full.png`
- `gallery-desktop.png`, `gallery-mobile.png`, `gallery-desktop-full.png`, `gallery-mobile-full.png`
- `contact-desktop.png`, `contact-mobile.png`, `contact-desktop-full.png`, `contact-mobile-full.png`
- Raw automated-check data: `screenshots\_capture_results.json`, `screenshots\_deep_check_results.json`

All 20 screenshots captured successfully (no timeouts/errors). Automated checks run via Playwright: `analyze_visual.py` (per-page, above-fold/font/scroll) and a custom deep-check script (tap-target geometry, mobile nav, CLS-risk proxy, image payload weight).

---

## Critical

None identified. No broken layouts, horizontal scroll, or blocking rendering failures were found on any of the 5 pages/2 viewports.

## High

1. **Package-card "Book Now" micro-links have a ~16px-tall tap target — well under the 48×48px minimum.** On `/` and `/packages`, each rafting package card has a small inline "Book Now" text link (e.g. home: top 3375/height 16/width 92; packages: top 839/height 16/width 92) sitting right next to a route title. This is far below Google's 48×48px / WCAG 2.5.5's 44×44px touch-target guidance and will cause mis-taps on a mobile-first booking flow, directly hurting conversion for the primary revenue action on the site. See `packages-mobile-full.png` and `home-mobile-full.png` for the repeated card pattern. Recommend enlarging the tap area (padding) or converting to a full-width button matching the larger "View Packages"/"Reserve Your Raft" CTAs elsewhere on the page (which are correctly sized at 48–60px tall).

2. **Elevated CLS risk from images without explicit dimensions/aspect-ratio.** Deep-check counted `<img>` elements lacking both width/height attributes and a CSS `aspect-ratio`:
   - Home: 20 of 25 images
   - Packages: 14 of 16
   - Package detail: 8 of 10
   - Gallery: 8 of 25
   - Contact: 8 of 13
   This is a proxy check (not a live Cumulative Layout Shift measurement — that was not completed before this report was written, see Info section), but the pattern is consistent enough across every page that it warrants engineering review of the image components (likely `next/image` used with `fill` inside containers that don't reserve height via CSS on all breakpoints, or plain `<img>` tags for some gallery/unsplash assets). On a photo-heavy tourism site this is a meaningful risk for jumpy scrolling on mobile as hero/package/gallery images pop in.

## Medium

3. **Logo image appears to be serving an oversized asset.** `analyze_visual.py`'s hero-image selector (`header img` / `[class*='hero'] img`) matched the site logo (`logo-shivalik-adv.webp`) on every single page rather than a true content hero photo — this itself suggests the header logo `<img>` is structurally the first/most prominent image in the DOM. The logo request alone is ~85KB and is fetched at `w=2048` (via `_next/image?...&w=2048&q=75`) on mobile, which is very unlikely to match its actual rendered size in a header (typically <300px wide). This inflates mobile payload for no visual benefit — recommend setting a correct `sizes` attribute on the logo `<Image>` so Next.js requests an appropriately small variant. (Not fully confirmed against the logo's rendered CSS size — see Info.)

4. **Mobile total image payload is currently moderate but worth monitoring**, especially as more package/gallery photos are added:
   - Home: 258 KB across 5 image requests (mobile viewport)
   - Packages: 372 KB / 9 images
   - Package detail: 203 KB / 9 images
   - Gallery: 348 KB / 18 images
   - Contact: 124 KB / 4 images
   These are within a reasonable budget for a mobile connection today, but several of the largest individual images are stock Unsplash photos served at 33–53KB each — confirm these are being requested at a resolution appropriate to their mobile display size (not desktop-sized crops downscaled by CSS), since `_next/image` should already be doing this correctly if `sizes` is configured per breakpoint.

5. **Footer link list and secondary nav items have small (~16-17px tall) tap targets.** Footer navigation links (Home, Packages, Destinations, Gallery, About, Blog, Contact, About Us, Safety Guidelines, Privacy Policy, Terms of Use) consistently render at only 16-17px height across all 5 pages. This is standard for text-link footers and lower risk than the in-card "Book Now" issue above (footer links are secondary navigation, not primary conversion actions), but still below WCAG 2.5.5 touch-target guidance. Low priority to fix relative to Finding #1.

## Low

6. **Mobile nav uses a hamburger menu (1 detected) with a duplicated link set** — desktop/expanded nav links (Home, Packages, Destinations, Gallery, About, Blog, Contact) exist in the DOM alongside a separate footer link block with the same labels, roughly doubling the total anchor count (17-19 total `nav a`/`header a` elements per page vs. ~7-8 unique primary nav items). This is not a functional bug (the hamburger menu correctly gates the primary nav from view on mobile — `horizontal_scroll: false` and `touch_targets_ok: true` on every page per `analyze_visual.py`), but it does mean screen-reader/keyboard users encounter the same link text multiple times per page (header nav + footer nav). Worth a quick audit for `aria-label`/landmark distinction (`<nav aria-label="Footer">` etc.) to keep it unambiguous for assistive tech.

## Info / Positive Findings

- **Above-the-fold value proposition and CTA are both visible without scrolling on mobile**, confirmed on every page:
  - Home: H1 "Find Your Perfect Rafting Adventure Today" is fully in-viewport (top 236px / bottom 372px of 812px viewport), white text over hero image, 36px font size. Primary CTAs "Book Your Adventure" (283×56px, top 532) and "View Packages" (198×60px, top 604) both render above the fold and both exceed the 48×48 minimum tap-target size.
  - Packages, Package Detail, Gallery, Contact: H1 renders above fold at 30px font size in each case; a sticky/floating "Book Now" bar (303×48px) is present above the fold on every page (top ~756px, which is within/near the 812px mobile viewport), giving a persistent, correctly-sized booking CTA throughout the site — this is a strong pattern for a tourism-booking site where mobile traffic dominates.
  - Contact page in particular surfaces "Call Now" and "WhatsApp Booking" buttons (343×48px each) above the fold, which is ideal for a business where a large share of bookings likely originate from a phone-tap or WhatsApp message rather than a form.
- `analyze_visual.py` reported, for all 5 pages: `h1_visible: true`, `cta_visible: true`, viewport meta tag present, **no horizontal scroll**, and a 16px base body font size (meets the ≥16px legibility threshold).
- No overlapping-element or text-overflow issues were flagged by the automated layout check on any page, and no page load timed out.

## Not Fully Verified (flagged per task instruction rather than further investigated)

- **Live Cumulative Layout Shift (CLS) score** was not measured with a PerformanceObserver before this report was finalized — Finding #2 above is based on a structural proxy (missing width/height/aspect-ratio on `<img>` elements), not an actual measured shift value. Recommend a follow-up Lighthouse/CrUX or `web-vitals` pass to convert this into a numeric CLS score per page.
- **Text/background color contrast ratios** (WCAG AA 4.5:1 for body text, 3:1 for large text) were not computed against actual rendered colors — this needs a dedicated contrast-checker pass (e.g. axe-core or a script sampling `getComputedStyle` color pairs against WCAG formulas) rather than visual inspection alone.
- **Exact rendered vs. natural size of the header logo image** (to confirm the oversized-asset finding in #3) was queued but not completed before this report was written.
- **Desktop screenshots** (`*-desktop.png`, `*-desktop-full.png`) were captured for all 5 pages but not individually walked through in this pass beyond confirming successful capture; desktop layout review was out of scope for the mobile-focused findings above and should be spot-checked separately if desktop conversion is also a priority.
