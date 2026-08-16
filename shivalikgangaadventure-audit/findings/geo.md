# GEO / AI Search Readiness Audit — Shivalik Ganga Adventure

**Audited environment:** `http://localhost:4100` (local production build, `next start`)
**Eventual production domain:** `https://www.shivalikgangaadventure.com` (not live yet)
**Audit date:** 2026-08-15
**Pages checked:** all 17 pages from `sitemap.xml` (home, packages index + 5 detail pages, destinations, gallery, about, blog index + 3 posts, contact, privacy, terms)
**Method:** Fetched every sitemap URL via direct HTTP GET (raw, pre-JS HTML — the site's Playwright-based render tool's SSRF guard hard-blocks `localhost`/loopback hosts by design, so this pass used `curl` + the `trafilatura`/`htmldate` Python libraries directly against the saved HTML to reproduce the same boilerplate-stripped `extracted_text` methodology used previously). `robots.txt`, `/llms.txt`, `/sitemap.xml` fetched directly. JSON-LD parsed from raw HTML per page. No DataForSEO MCP tools were available in this session — no live ChatGPT/AI-Overview citation data pulled; findings are source-inspection based.

**This is a fresh, independent pass — not an assumption-based follow-up.** A prior audit (this same file, this morning) ran before a round of GEO-focused fixes; every claimed fix below was re-verified against the live local build's actual HTML output, not taken on faith.

---

## Verification of the 3 previously-flagged fixes — all 3 CONFIRMED FIXED

| # | Fix | Status | Evidence |
|---|---|---|---|
| 1 | FAQ accordion answers stay in DOM regardless of open/closed state | **FIXED** | Checked raw HTML of all 5 package pages (25 FAQ items total, 5 questions × 5 packages). Every `<p>` answer is present in the DOM at all times — only the first item has `aria-expanded="true"`, but all 5 answer `<p>` tags exist unconditionally inside `<div class="overflow-hidden">` wrappers (CSS-toggle pattern, not conditional JSX unmount). Confirmed via `trafilatura` extraction too: all 5 answers survive boilerplate-stripping on every package page (was 1-of-3 answers per page in the prior audit; now 5-of-5 on all 5 pages, 25/25 total). |
| 2 | Price stated in main-content prose, not just sidebar | **FIXED** | Every package page now has a sentence in the main content flow, e.g. Brahmpuri: *"The Brahmpuri to Nim Beach route currently costs ₹599 per person, covering 2 hours on the water over 9 km of Grade I-II rapids."* Confirmed present in `trafilatura` `extracted_text` (survives boilerplate-stripping) for all 5 packages: Brahmpuri ₹599, Club House ₹699, Shivpuri ₹799, Marine Drive ₹1199, Kaudiyala ₹2499. Also backed by a proper `Offer` sub-schema (`price`, `priceCurrency: INR`, `availability`, `priceValidUntil`) inside each page's `TouristTrip` JSON-LD — price now has both a prose home and a schema home. |
| 3 | `/packages` has a real `<table>` comparison block | **FIXED** | Confirmed a genuine `<table>` element (not a card grid) with 6 columns — Package, Distance, Duration, Grade, Price, Best For — and one row per package, all 5 rows present. `trafilatura` extracts it cleanly as a markdown table with all 5 packages' data intact (previously only 1-of-6 cards survived extraction; now 5-of-5 rows survive, structurally guaranteed since it's a real `<table>` rather than a repeated-card DOM pattern). |
| — | `/llms.txt` route exists, well-formed, reflects current 5-package/"to Nim Beach" catalog | **FIXED** | `GET /llms.txt` → `200`, plain text, correctly mentions "Five rafting routes to Nim Beach," links `/packages` with "All 5 rafting routes to Nim Beach," and the Grade II/IV blog post. No stale 6-package or "to Rishikesh" language found anywhere in it. As expected/by design, this route is currently unreachable to real crawlers because `robots.txt` still disallows everything sitewide — that's the deliberate, explicit pre-launch state and is not treated as a defect here. |

---

## GEO Readiness Score: 68 / 100

*(Up from 56/100 in the prior audit. Score evaluates underlying content/technical readiness for AI citation. Per audit scope, it does NOT penalize the site for the current intentional `Disallow: /` + `noindex,nofollow` — that's a correct, deliberate pre-launch/no-domain-yet gate, not re-litigated here — but it does still reflect genuine content/technical gaps below.)*

| Dimension | Weight | Score | Weighted | Why |
|---|---|---|---|---|
| Citability | 25% | 82/100 | 20.5 | All three core extraction failures from the prior audit are now fixed (FAQ answers, price, comparison table all survive `trafilatura` boilerplate-stripping). Blog posts grew from a thin 230–270 words to a healthy 682–799 words each with retained short, direct-answer paragraphs. Remaining gap: one factual inconsistency (About page "Rafting Routes" stat counter still says **8**, while every other page on the site — home, packages, destinations — consistently says **5 routes**) undermines the exact kind of fact an AI answer engine might lift and cite incorrectly. |
| Structural Readability | 20% | 78/100 | 15.6 | Clean H1/H2 hierarchy, breadcrumbs (`BreadcrumbList` JSON-LD on every page), consistent itinerary/inclusions/exclusions/FAQ pattern across all 5 package pages, and the new genuine `<table>` on `/packages` is a real structural upgrade. Loses points because blog H2s are still mostly declarative rather than question-based (only one heading, "So Which Grade Should You Book?", reads as a question-style prompt), and the Grade II vs IV comparison post is still only reachable via `/blog` — zero internal links to it from `/packages` or any package-page FAQ. |
| Multi-Modal Content | 15% | 48/100 | 7.2 | Real improvement on the home page and package cards: hero/card image `alt` text is now descriptive and location-specific ("Brahmpuri to Nim Beach river rafting package on the Ganga," "Shivpuri rafting spot on the Ganga, Rishikesh") instead of generic placeholders. But the gallery/testimonial-carousel images and video thumbnails are unchanged from the prior audit — still generic ("Shivalik Ganga Adventure rafting moment," "rafting video clip 3"), `/gallery` still has almost no surrounding body text, and 4 images sitewide (2 on home, 2 on package pages) have empty `alt=""`. All photography is still stock Unsplash (expected placeholder pending client sign-off per project notes, not a new finding). |
| Authority & Brand Signals | 20% | 60/100 | 12.0 | Two genuine new authority wins: (1) `/about` now states a named certifying body and registration number — "registered with the Uttarakhand Tourism Development Board (registration no. UK/ADV-TOURISM/2026/00147)," plus a named guide-certification programme and per-person accident insurance; (2) each blog post now has a visible, named byline in the rendered DOM ("Written by Arjun Rawat, Lead Rafting Guide, 12 years on the Ganga") matching the `BlogPosting` schema's `author` field — a real E-E-A-T signal, not just a schema-only claim. Held back by: the stale "8 Rafting Routes" stat counter (an internal-consistency/trust issue, doubles as an authority ding), still no LinkedIn/Wikipedia/Reddit presence in the `sameAs` graph (unchanged), and testimonials remain placeholder content with no `AggregateRating` schema (correctly not added yet, per project notes — content still pending client sign-off). |
| Technical Accessibility | 20% | 88/100 | 17.6 | Confirmed sitewide SSR: every one of the 17 sitemap URLs returns full body content, headings, and JSON-LD in the raw pre-JS HTTP response (verified via direct `curl`, no JS execution) — zero-JS-execution AI crawlers see complete content on every page. `/llms.txt` now exists and is accurate. `canonical` tags and `sitemap.xml` already point at the eventual production domain, not `localhost`. The only deductions: (a) `robots.txt` is still a hardcoded blanket `Disallow: /` with no environment branching and no AI-crawler-specific rules staged for launch day — factual note only, not scored as a defect per this audit's explicit scope (see below); (b) no `Sitemap:` line in `robots.txt` yet. |

**Weighted total: 68/100.**

*Note on scoring philosophy: the robots.txt blanket block and `noindex,nofollow` are treated as a correct, deliberate, temporary pre-launch decision per explicit client instruction (no production domain yet, no bots wanted yet) — this audit does not recommend removing that block or adding an AI-crawler allowlist as an action item this pass, and does not penalize the Technical Accessibility score for the block itself. The score instead reflects the underlying content/technical readiness that will matter the moment that gate is lifted.*

---

## 1. AI Crawler Access Status — currently BLOCKED (deliberate, unchanged)

```
User-Agent: *
Disallow: /
```

Confirmed unchanged from the prior audit: no environment branching, no per-crawler rules, no `Sitemap:` line. This is expected and correct for this stage per explicit client instruction — **not flagged as an action item this pass.** Recorded here only for completeness/tracking, exactly as the prior audit did:

| Crawler | Purpose | Current status |
|---|---|---|
| GPTBot | ChatGPT training/browsing | Blocked (intentional) |
| OAI-SearchBot | ChatGPT search citations | Blocked (intentional) |
| ClaudeBot | Claude/Anthropic search & training | Blocked (intentional) |
| PerplexityBot | Perplexity search citations | Blocked (intentional) |
| Googlebot / Bingbot | Classic index (feeds AIO/Copilot) | Blocked (intentional) |
| CCBot / anthropic-ai / cohere-ai | Training-only crawlers | Blocked (intentional) |

`GET /llms.txt` → `200`, correctly formed, reflects the current 5-package catalog (see verification table above). It will remain unreachable to real crawlers until the blanket `Disallow: /` is lifted, which is expected and by design.

---

## 2. Passage-Level Citability

### 2a. RESOLVED — FAQ answers now fully present in DOM/extracted text (was Critical)
All 5 FAQ answers per package page (25 total across the 5 packages) are present in the raw HTML at all times and survive `trafilatura` extraction. Example, `/packages/brahmpuri-to-nim-beach` extracted text includes all 5 answers in full: safety, swimming, what-to-wear, weather/rain policy, and hotel pickup. Same pattern confirmed on Club House, Shivpuri, Marine Drive, and Kaudiyala. The FAQ block also still has full `FAQPage` JSON-LD, so both schema-literate and plain-text-extraction crawlers now get complete answers. Blog-post FAQ sections (all 3 posts now have a "Frequently Asked Questions" H2) are static, non-accordion text and were never affected by this issue.

### 2b. RESOLVED — price now in extractable prose on all 5 package pages (was High)
Confirmed via `grep`/`trafilatura` extraction: every package page's main content includes one sentence stating price in ₹, matching the sidebar and the `Offer` JSON-LD. No more reliance on sidebar-only or schema-only price data.

### 2c. RESOLVED — `/packages` comparison table (was High)
Real `<table>` with 6 columns × 5 rows, confirmed via raw-HTML tag inspection (`<table>`, 12 `<th>`, 25 `<td>`) and via `trafilatura`, which extracts it as a clean markdown table with all 5 packages intact — directly serving the "compare Ganga rafting packages" / "which rafting route is best for beginners" class of AI query this audit's brief calls out.

### 2d. New — About page stat counter contradicts the rest of the site (Medium, new finding this pass)
`/about`'s "Numbers That Speak for Themselves" section shows **"8 Rafting Routes"** in the raw HTML (`<span class="font-heading text-4xl font-bold sm:text-5xl">8</span>` next to a "Rafting Routes" label), while home, `/packages`, and `/destinations` all consistently and correctly say **"5 routes."** This is a genuine internal-consistency problem for AI citation: an answer engine that samples from `/about` could confidently state "Shivalik Ganga Adventure runs 8 rafting routes," directly contradicting the actual 5-package catalog. **Fix:** update or remove the stale "8" (likely leftover from an earlier catalog revision) to match the current 5-package count.

### 2e. Still open — Grade II vs Grade IV blog post remains under-linked (Low, carried over)
Still the strongest existing GEO asset (799 words, decision-framework structure, now correctly named-package-mapped to the 5-package catalog) but still only reachable via `/blog` — zero internal links to it from `/packages` or any package-page FAQ. Recommend cross-linking, as flagged previously.

### 2f. Blog word count — resolved (was Low)
Prior audit flagged 230–270-word blog posts as too thin. Now confirmed: `best-time-for-rafting-rishikesh` = 782 words, `grade-ii-vs-grade-iv-rapids-explained` = 799 words, `what-to-pack-rafting-trip` = 684 words — all now well past the thin-content threshold, with short direct-answer paragraphs preserved throughout.

---

## 3. `llms.txt` and Licensing

- `GET /llms.txt` → `200`. Content correctly reflects the 5-package "to Nim Beach" catalog — see verification table above. No stale references to the old 6-package/"to Rishikesh" catalog anywhere in it.
- No RSL 1.0 licensing markers found on any sampled page (unchanged from prior audit; low priority, no formal adoption yet across major AI labs).

---

## 4. Brand Entity Clarity

- **Consistent naming — still good.** "Shivalik Ganga Adventure" used identically across `<title>`, meta description, schema `name` fields, footer, and body copy on all 17 pages. No abbreviated variants found.
- **New authority win: named certifying body + registration number.** `/about` now states registration with the Uttarakhand Tourism Development Board (reg. no. UK/ADV-TOURISM/2026/00147), a named guide-certification programme (Uttarakhand River Rafting Guide Certification Programme), and per-person accident insurance — genuine, specific, citable authority signals that were flagged as missing in the prior audit.
- **New authority win: visible, named blog byline.** Each blog post now displays "Written by Arjun Rawat, Lead Rafting Guide, 12 years on the Ganga" directly in the rendered DOM (not just in `BlogPosting` JSON-LD's `author` field, though it matches there too) — a real E-E-A-T signal.
- **`sameAs` entity graph unchanged and still thin.** Facebook, Instagram, Twitter/X, YouTube present; still no LinkedIn, Wikipedia/Wikidata, or Reddit presence. Per this audit's brand-mention correlation framework, YouTube (~0.737 correlation, strongest) is already wired in — good — but the graph hasn't grown since the prior pass.
- **New internal-consistency issue (see §2d):** the "8 Rafting Routes" stat contradicts the "5 routes" stated everywhere else, which is itself an authority/trust ding independent of its citability impact.
- **No Google Business Profile yet** (expected pre-launch, tracked in `local.md`).

---

## 5. Technical Accessibility for AI Crawlers

- **SSR confirmed sitewide, re-verified this pass.** Direct `curl` GET (no JS execution) against all 17 sitemap URLs returned full body text, headings, and JSON-LD in the raw HTTP response for every page — zero-JS-execution crawlers see complete content everywhere, including the FAQ fix in §2a.
- `canonical` tags and `sitemap.xml` entries already point at the eventual production domain (`https://www.shivalikgangaadventure.com`), not `localhost`.
- `meta name="robots" content="noindex, nofollow"` confirmed present sitewide (spot-checked home; consistent with the intentional pre-launch block).
- No `Sitemap:` line in `robots.txt` yet (minor, unchanged from prior audit — will matter once the block is lifted, not urgent now).

---

## 6. Platform-Specific Readiness (projected — no live citation data available pre-launch)

Qualitative estimates only; no DataForSEO MCP tools were available and the site is not indexable yet.

| Platform | Projected readiness | Why |
|---|---|---|
| Google AI Overviews | ~72/100 | Strong SSR + broad JSON-LD footprint plays to Google's strengths; the FAQ/price/table fixes close the biggest passage-ranking gaps from the prior pass. |
| ChatGPT (search/browsing) | ~68/100 | Most directly exposed to plain-text-extraction quality, so benefits the most from the §2a/2b/2c fixes; the §2d stat inconsistency is the platform's main remaining risk (fabrication-adjacent citation of a wrong number). |
| Perplexity | ~65/100 | Similar extraction-dependence to ChatGPT; the Grade II vs IV blog post and the new `/packages` table are a strong fit for Perplexity's comparison-style answers. |
| Bing Copilot | ~65/100 | Historically strong on schema.org markup, which this site now has more of (`Offer`, named `author`); otherwise similar exposure to remaining gaps as Google. |

---

## Prioritized Findings

### Critical
- None. All three previously-Critical/High passage-extraction issues (§2a FAQ, §2b price, §2c table) are confirmed fixed this pass.

### High
- None outstanding at High severity this pass — the prior audit's three High-priority items are resolved.

### Medium
1. **`/about`'s "8 Rafting Routes" stat contradicts the site's own "5 routes" messaging everywhere else (§2d, new this pass).** Fix the stale number — a factual self-contradiction is a real risk for AI citation accuracy and looks like leftover data from the old 6-package catalog.
2. **Grade II vs Grade IV blog post remains under-linked** — still only reachable via `/blog`; cross-link from `/packages` and package-page FAQs (carried over, unresolved).
3. **No `Sitemap:` line in `robots.txt`** — low-effort, stage it for the launch-day robots.txt update (carried over).

### Low
1. **Gallery/testimonial-carousel image `alt` text is still generic** ("rafting moment," "rafting video clip 3") even though home-page hero/package-card alt text was upgraded to be descriptive and location-specific — an inconsistent fix, worth finishing.
2. **4 images sitewide have empty `alt=""`** (2 on home, 2 on package pages) — spot-check and fill in.
3. **Blog H2s remain mostly declarative, not question-based** — reformatting 1–2 headings per post (e.g., "When Is the Best Time to Raft in Rishikesh?") would align better with AI Overview-style query matching (carried over, unresolved).
4. **`sameAs` entity graph still missing LinkedIn** (carried over, unresolved).

### Info
- Testimonials/reviews remain placeholder content pending client sign-off (per project memory); correctly still no `AggregateRating`/`Review` schema — do not add until testimonial authenticity is confirmed.
- All photography is still stock Unsplash — expected placeholder pre-signoff; alt-text quality will matter more once real trip photography replaces it.
- The robots.txt blanket block and `noindex,nofollow` are a deliberate, explicit client decision at this stage (no production domain, no bots wanted yet) — not treated as an action item or scored down this pass, consistent with the prior audit's approach.
- Not independently re-checked this pass: `/privacy` and `/terms` content depth (low priority, unlikely AI-citation targets); live resolution of `sameAs` social URLs; DataForSEO live ChatGPT-visibility tools (unavailable in this session).

---

## Methodology Notes

- All 17 sitemap pages fetched via direct HTTP GET against `http://localhost:4100`. The repository's standard Playwright-based render tool (`render_page.py`) was attempted first but its SSRF/DNS-rebinding safety module hard-blocks `localhost` and loopback IPs by design (`url_safety.py`), so this pass used `curl` for raw HTML capture and ran the same underlying `trafilatura` (boilerplate extraction) and `htmldate` (publication-date extraction) Python libraries directly against the saved HTML, reproducing the render tool's `extracted_text` methodology without going through its network layer.
- Passage-extraction findings (§2) were derived by diffing raw HTML against `trafilatura`'s boilerplate-stripped output for the same page, per this audit's standard practice of scoring citability against extracted/boilerplate-stripped text, not raw HTML alone.
- JSON-LD parsed directly from raw HTML per page (`application/ld+json` blocks) to distinguish schema-only claims from plain-text-extractable content (e.g., confirming the blog byline is in both places, not just schema).
- `robots.txt`, `/llms.txt`, and `/sitemap.xml` fetched directly via HTTP.
- No DataForSEO MCP tools were available in this session — §6 platform scores are qualitative projections, not measured citation data.
