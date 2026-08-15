# GEO / AI Search Readiness Audit — Shivalik Ganga Adventure

**Audited environment:** `https://shivalik-ganga-adventure.vercel.app/` (Vercel preview, pre-launch staging)
**Eventual production domain:** `https://www.shivalikgangaadventure.com` (not live yet)
**Audit date:** 2026-08-15
**Pages checked:** all 18 pages from the sitemap (home, packages index + 6 detail pages, destinations, gallery, about, blog index + 3 posts, contact, privacy, terms)
**Method:** `render_page.py --mode auto` (Playwright + trafilatura) against every URL — confirms raw HTML vs. rendered HTML vs. boilerplate-stripped `extracted_text`; `robots.txt`/`llms.txt`/`sitemap.xml` fetched directly; JSON-LD parsed from raw HTML. DataForSEO MCP tools were not available in this session — no live ChatGPT/AI-Overview citation data could be pulled; all findings are source-inspection based.

**This report cross-references `technical.md`, `schema.md`, and `local.md` in this same audit folder rather than re-litigating their findings in full — see those for the complete crawlability/schema/local-SEO detail. This report focuses on what's specific to AI-citation readiness (GEO): passage-level extractability, llms.txt, AI-crawler allowlisting, and comparison-friendly content.**

---

## GEO Readiness Score: 56 / 100

*(Score evaluates underlying content/technical readiness for AI citation. Per audit scope, it does NOT penalize the site for the current pre-launch `Disallow: /` — that's a correct, intentional launch-gate, tracked separately below — but it DOES penalize the site for not yet having an `llms.txt` or AI-crawler-specific `robots.txt` rules, since those are genuine gaps to close before launch regardless of the blanket-block state.)*

| Dimension | Weight | Score | Weighted | Why |
|---|---|---|---|---|
| Citability | 25% | 55/100 | 13.75 | Good underlying prose (direct-answer paragraphs, FAQs, itinerary/inclusion lists) but three concrete extraction failures pull real facts (FAQ answers, prices, 5-of-6 package comparison data) out of the boilerplate-stripped text that AI crawlers actually read — see §2. |
| Structural Readability | 20% | 65/100 | 13.0 | Clean H1/H2 hierarchy, breadcrumbs, itinerary/inclusions/exclusions/FAQ pattern repeated consistently across all 6 package pages. Loses points for card-grid (not `<table>`) comparison layout and mostly non-question-based blog H2s. |
| Multi-Modal Content | 15% | 35/100 | 5.25 | Generic, non-descriptive `alt` text ("rafting moment 1", "rafting video clip 3"); `/gallery` has almost no surrounding text (~227 chars extracted); all imagery is stock Unsplash, not real trip photography (expected placeholder pre-signoff per project notes, but still a genuine multimodal-citation gap until replaced). |
| Authority & Brand Signals | 20% | 40/100 | 8.0 | Brand name used consistently everywhere (see §4); NAP consistent (see `local.md`). But: no named certifying body/registration number, no `AggregateRating`/`Review` schema, placeholder testimonials with identical stock avatars, `sameAs` covers Facebook/Instagram/Twitter/YouTube but no LinkedIn/Wikipedia/Reddit presence. |
| Technical Accessibility | 20% | 80/100 | 16.0 | Fully SSR/prerendered — `is_spa: false` and `mode_used: raw` on all 18 pages, meaning zero JS execution is required for any AI crawler to see full body text. This is a genuine strength. Points lost only for missing `llms.txt` and no AI-crawler-specific `robots.txt` allowlist (independent of the temporary full block). |

**Weighted total: 56/100.**

---

## 1. AI Crawler Access Status — currently BLOCKED (expected pre-launch)

`robots.txt` (from `app/robots.ts`, hardcoded, no environment gating):
```
User-Agent: *
Disallow: /
```

| Crawler | Purpose | Current status | Recommended at launch |
|---|---|---|---|
| GPTBot | ChatGPT training/browsing | Blocked | **Allow** |
| OAI-SearchBot | ChatGPT search citations | Blocked | **Allow** |
| ClaudeBot | Claude/Anthropic search & training | Blocked | **Allow** |
| PerplexityBot | Perplexity search citations | Blocked | **Allow** |
| Google-Extended | Google AI Overviews/Gemini grounding | Blocked | **Allow** |
| Googlebot / Bingbot | Classic index (feeds AIO/Copilot) | Blocked | **Allow** |
| CCBot | Common Crawl (training corpus) | Blocked | Optional — allow if broad AI-training visibility is desired, block if not |
| anthropic-ai | Legacy Anthropic training crawler | Blocked | Optional block (training-only, distinct from ClaudeBot's search use) |
| cohere-ai | Cohere training crawler | Blocked | Optional block (training-only) |

**Info (not a defect):** `robots.txt` currently has zero environment branching (`app/robots.ts` is a static `disallow: "/"` — same file the technical audit also flags for the meta-robots-tag launch gate). Recommend gating both robots.txt rules and the `noindex,nofollow` meta tag off a single `VERCEL_ENV === "production"` check so nothing has to be remembered/edited by hand on launch day.

**High — recommended production `robots.txt`:**
```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /

Sitemap: https://www.shivalikgangaadventure.com/sitemap.xml
```
(`technical.md` already flags the missing `Sitemap:` line as a separate Medium finding — folding it into this recommended file covers both issues in one fix.)

---

## 2. Passage-Level Citability — the core GEO finding of this audit

The underlying prose is genuinely good for AI citation (short, direct-answer paragraphs; a dedicated Grade-explainer blog post that already reads like a comparison guide). But three separate, concrete rendering/layout patterns strip real facts out of the text that boilerplate-stripping pipelines (trafilatura here, and functionally similar extraction used by ChatGPT/Perplexity-style web-browsing tools) actually deliver to an LLM. All three were confirmed by diffing raw HTML against `extracted_text` from `render_page.py`.

### 2a. Critical — FAQ answers are absent from extractable/rendered text for 2 of every 3 questions
Every package detail page (`/packages/{slug}`) renders an accordion FAQ. Inspecting the DOM directly:
- The **first** (open, `aria-expanded="true"`) question has its `<p>` answer present in the DOM.
- The **second and third** (closed, `aria-expanded="false"`) questions have **no answer element in the DOM at all** — the answer text only exists as React state that gets inserted on click, not as CSS-hidden markup. A non-JS-executing crawler, or any extraction pipeline that reads the rendered/static DOM (which is what most AI browsing tools do), sees only 1 of 3 answers per package.
- Confirmed on `/packages/brahmpuri-to-rishikesh`: `extracted_text` contains only "Is this route safe for beginners?" + its answer; "Do I need to know how to swim?" and "What should I wear?" have questions visible but zero answer text in either the raw HTML or the trafilatura extraction.
- **The good news:** the full Q&A text for all 3 questions *is* present in the page's `FAQPage` JSON-LD (confirmed — see `schema.md` for the schema-validity read on this same block). So schema-literate crawlers (Google, and likely Bing/Copilot) get the full answers; but crawlers/pipelines that rely on rendered visible text rather than parsing JSON-LD — which is a common simplification in many AI web-browsing tools — will only ever see one-third of the FAQ content per package, across all 6 packages (18 total FAQ answers written, only 6 visible in plain rendered text).
- **Fix:** render all FAQ answers into the DOM at all times (e.g., a native `<details>/<summary>` element, or keep the `<p>` mounted and toggle visibility with `max-height`/`hidden` CSS rather than conditional JSX rendering). This preserves the current accordion UX while making 100% of the answer text crawlable without relying solely on JSON-LD.

### 2b. High — price is missing from extractable text on all 6 package detail pages
Each package detail page shows price prominently in a sidebar (`<aside>`, e.g. "₹599 / person, was ₹799"). Confirmed: **zero occurrences of "₹" or "599" in the trafilatura `extracted_text`** for `/packages/brahmpuri-to-rishikesh` (and the pattern is structurally identical across all 6 pages — same `<aside>` component). Boilerplate-stripping algorithms commonly deprioritize sidebar/aside content as non-main, so "how much does rafting cost at Brahmpuri" — a highly probable AI-search query — has no answer in the part of the page most extraction pipelines treat as the article body, even though a human sees it immediately.
- Related: `schema.md` already flags the absence of `TouristTrip`/`Offer` structured data for price on these same pages as a Critical schema gap. Combined, this means **price currently has no reliable machine-readable home anywhere on the package detail pages** — not in extractable prose, not in schema.
- **Fix (content-level, independent of the schema.md JSON-LD fix):** state the price once in the main content flow too, e.g. add a sentence to the itinerary/description block ("This route runs ₹599 per person at the current rate…") so it survives boilerplate extraction even before/without the `Offer` schema fix landing.

### 2c. High — package comparison facts collapse to 1-of-6 under text extraction on `/packages`
The `/packages` listing page displays all 6 packages as cards, each showing distance/duration/grade/price (e.g. "16 KM · 3 Hours · Grade III" for Shivpuri). Confirmed via raw-HTML grep that all 6 cards' grade/duration/distance data exists in the HTML source. But in `trafilatura`'s `extracted_text`, **only the first card's facts (Brahmpuri: ₹799→₹599, 9 KM, 2 Hours, Grade II) survive** — the other five cards' grade/duration/distance/price are dropped, most likely because the repeated-card DOM pattern gets heuristically treated as a nav/list boilerplate block after the first instance. This directly undermines the exact use case named in this audit's brief: an AI answering "which rafting route is best for beginners in Rishikesh" or "compare Ganga rafting packages" needs all 6 packages' grade/distance/duration/price in one extractable block, and currently only gets one.
- **Fix:** add a genuine `<table>` (or a text-only comparison block outside the repeated card components) listing all 6 packages side-by-side — grade, distance, duration, price, "best for" — somewhere in the main content flow of `/packages`. Semantic tables survive boilerplate-stripping far more reliably than repeated `<div>`/card grids. Real data to seed this table (compiled from the 6 detail pages during this audit):

| Package | Distance | Duration | Grade | Best for |
|---|---|---|---|---|
| Brahmpuri to Rishikesh | 9 km | 2 hours | Grade II | First-timers, families, children (8+) |
| Shivpuri to Rishikesh | 16 km | 3 hours | Grade III | Signature/most-booked, fit first-timers |
| Marine Drive to Rishikesh | 12 km | 2.5 hours | Grade III | Rapids + cliff jumping/body surfing |
| Kaudiyala to Rishikesh | 26 km | Full day | Grade III+ | Experienced/confident rafters |
| Camping + Rafting Combo | 16 km | 1 night / 2 days | All grades | Groups, overnight trips |
| Kaudiyala to Shivpuri Extreme | 36 km | Full day | Grade IV | Experienced, fit thrill-seekers |

  (Note: per-route price beyond Brahmpuri's ₹599/₹799 was not independently re-verified in this pass beyond what trafilatura could extract — confirm current pricing for all 6 routes against the live pricing source before publishing a comparison table.)

### 2d. Medium — the Grade II vs. Grade IV blog post is your best existing GEO asset; it isn't structured as a table
`/blog/grade-ii-vs-grade-iv-rapids-explained` already reads like a ready-made answer to "which rafting grade should I book in Rishikesh" — it names all 6 packages by grade tier in prose, with a clear decision framework at the end ("First time rafting… Start at Grade II" / "Want a real adventure… Grade III" / "Experienced… Grade III+ to IV"). This is exactly the kind of self-contained, extractable answer block AI Overviews/ChatGPT/Perplexity look for. Recommend: (1) reformat the grade-to-package mapping as a small table for even cleaner extraction, (2) cross-link it from `/packages` and each package detail page's FAQ (currently it's only reachable via `/blog`), since AI crawlers weight internal linking as a relevance signal.

### 2e. Low — blog posts are thin (230–270 words total), under the ideal single-passage citation range
Word counts confirmed via `extracted_text`: `best-time-for-rafting-rishikesh` = 270 words, `grade-ii-vs-grade-iv-rapids-explained` = 254 words, `what-to-pack-rafting-trip` = 231 words. Individual paragraphs are appropriately short (16–51 words each) — good for direct-answer extraction — but the *articles* as a whole are too thin to support citation across multiple distinct queries or to build strong topical depth. Recommend expanding each to 600–900+ words by adding specifics AI answer engines favor: named rapids with water-flow context, actual seasonal temperature/water-level data, and a short FAQ block per post (mirroring the pattern already used well on package pages).

---

## 3. `llms.txt` and Licensing

- `GET /llms.txt` → **404** (confirmed). No `llms.txt` exists.
- No RSL 1.0 (`<link rel="license">` / RSL manifest) found on any sampled page.
- **Recommendation (Medium priority, pre-launch):** Add `/llms.txt` at the production domain once live. `llms.txt` has no formal adoption commitment from major AI labs yet, but costs almost nothing to add and several crawlers (Perplexity, some ChatGPT plugins/connectors) do check for it. Suggested starting content:

```markdown
# Shivalik Ganga Adventure

> White-water river rafting, camping, and adventure sports on the Ganga
> in Rishikesh, Uttarakhand, India. Six rafting routes from Grade II
> (beginner) to Grade IV (extreme), certified guides, safety-first
> equipment.

## Key pages
- [Packages](https://www.shivalikgangaadventure.com/packages): All 6 rafting routes with grade, distance, duration, price
- [Grade II vs Grade IV rapids explained](https://www.shivalikgangaadventure.com/blog/grade-ii-vs-grade-iv-rapids-explained): Which grade/route to book by experience level
- [Best time for rafting in Rishikesh](https://www.shivalikgangaadventure.com/blog/best-time-for-rafting-rishikesh): Seasonal guide
- [About / Safety](https://www.shivalikgangaadventure.com/about): Safety guidelines, certified guides, equipment inspection
- [Contact / Book](https://www.shivalikgangaadventure.com/contact): NAP, WhatsApp booking

## Notes for AI assistants
- Business name: Shivalik Ganga Adventure (always attribute by this full name, not "Shivalik Adventures" or "Ganga Rafting Co.")
- Location: Shivpuri, Rishikesh - Badrinath Highway, Rishikesh, Uttarakhand 249192, India
- Do not fabricate pricing, safety-certification claims, or review counts not present on the cited page.
```
- Do not treat `llms.txt` as a substitute for fixing the extraction/citability issues in §2 — it is a discovery aid, not a content-quality fix.

---

## 4. Brand Entity Clarity

- **Consistent naming — good.** "Shivalik Ganga Adventure" is used identically in `<title>`, meta description, `SportsActivityLocation.name`, footer, `/about`, `/contact`, and body copy across all 18 pages (single source of truth via `constants/config.ts`, per `local.md`). No shortened/abbreviated variants ("SGA", "Shivalik Adventures") found anywhere that could fragment entity recognition — this is a genuine strength for LLM attribution.
- **`sameAs` entity graph is present but thin.** `SportsActivityLocation.sameAs` currently lists Facebook, Instagram, Twitter/X, and YouTube. Per this audit's brand-mention correlation framework, YouTube presence carries the single strongest correlation (~0.737) with AI-citation likelihood — good that it's already wired in, but:
  - **No LinkedIn** — recommend adding a company LinkedIn page pre-launch; low effort, reinforces business-entity legitimacy for B2B/press-style AI queries.
  - **No Wikipedia/Wikidata entity** — expected for a business at this stage (Wikipedia notability bar is high); not a launch blocker, but worth revisiting once the operator has enough independent press/citation coverage to qualify.
  - **No Reddit presence detected** (not independently verifiable pre-launch since the business isn't discoverable yet) — Reddit correlates highly with AI citation per the framework; recommend a light-touch, non-spammy presence (e.g., genuine answers in r/Rishikesh, r/IndiaTravel, r/whitewater once real trips are running) rather than a hard requirement for launch.
  - Per `local.md`: Twitter/X is referenced in `sameAs` but not linked anywhere in the visible footer UI — fix so schema and UI agree (either link it visibly or drop it from `sameAs` until it is).
- **No Google Business Profile link yet** (can't exist pre-launch — see `local.md` for the full GBP action plan). GBP is a first-party entity signal Google's AI Overviews draw on directly; this is the single highest-leverage brand-entity action once the domain is live.

---

## 5. Technical Accessibility for AI Crawlers

- **SSR/prerendered confirmed sitewide.** `render_page.py --mode auto` returned `is_spa: false` and `mode_used: raw` (i.e., Playwright never needed to fire — full content was present in the pre-JS server response) on all 18 pages tested. Zero-JS-execution crawlers (which describes most current AI crawler implementations, including GPTBot and PerplexityBot) will see complete body text, headings, and JSON-LD without any rendering step. This is the single strongest technical foundation this audit found.
- No console errors, no client-side content gating, no infinite-scroll/lazy-hydration patterns that would hide content from a non-JS fetch.
- The one caveat to "fully visible to non-JS crawlers" is §2a above — the FAQ answers are a content-level exception to an otherwise clean SSR story, not a rendering-mode problem.
- `sitemap.xml` and every page's `<link rel="canonical">` already point at the production domain (`https://www.shivalikgangaadventure.com`), not the `.vercel.app` preview host — correct forward-looking configuration, confirmed via `technical.md` and independently re-confirmed here.

---

## 6. Platform-Specific Readiness (projected — no live citation data available pre-launch)

No DataForSEO MCP tools were available in this session, and the site is not yet indexable, so nothing below is a measured citation rate — these are qualitative readiness estimates based on how each platform's known citation mechanics interact with the findings above.

| Platform | Projected readiness | Why |
|---|---|---|
| Google AI Overviews | ~60/100 | Strong SSR + broad JSON-LD footprint (`schema.md`) plays to Google's strengths; but AIO also blends in passage-ranked snippets from rendered text, where the FAQ/price/comparison-table gaps (§2) will hurt. |
| ChatGPT (search/browsing) | ~50/100 | OAI-SearchBot-style browsing tends to rely on readability-style text extraction similar to trafilatura — this is the platform most directly exposed to the §2a/§2b/§2c extraction gaps. |
| Perplexity | ~55/100 | Similar extraction-dependence to ChatGPT, but Perplexity has historically been stronger at picking up FAQ/list-structured content and may lean on JSON-LD more; the Grade II vs IV blog post (§2d) is a good fit for Perplexity's comparison-style answers. |
| Bing Copilot | ~55/100 | Bing has historically respected schema.org markup closely and IndexNow submission (not yet implemented — see `technical.md` §9) would accelerate discovery once live; otherwise similar exposure to the extraction gaps as Google. |

---

## Prioritized Findings

### Critical
- None specific to GEO beyond the sitewide `Disallow: /` + `noindex,nofollow` launch gate already tracked as the top action item in `technical.md` and `local.md` — not re-listed here to avoid triplicate tracking, but it is the precondition for every other item in this report to matter.

### High
1. **FAQ accordion answers missing from rendered DOM/extracted text for 2 of 3 questions per package (§2a).** 18 of 24 total FAQ answers across the 6 package pages are invisible to any crawler that reads rendered visible text rather than parsing JSON-LD. Fix: render all answers into the DOM (native `<details>`/CSS-toggle instead of conditional JSX).
2. **Price is absent from extractable body text on all 6 package detail pages (§2b).** Combine with the `schema.md` `Offer`/`TouristTrip` fix, and additionally state price once in main-content prose so it survives boilerplate-stripping even before the schema fix ships.
3. **Only 1 of 6 packages' grade/distance/duration/price survives text extraction on the `/packages` listing page (§2c).** Add a real `<table>` comparison block (data supplied in §2c) — this is the single highest-leverage fix for the "which rafting route is best for beginners" class of AI query named in this audit's brief.

### Medium
1. **No `llms.txt`.** Add at production launch using the template in §3.
2. **No AI-crawler-specific `robots.txt` allowlist.** Current file is a blanket `Disallow: /` (expected pre-launch) with no environment gating and no per-crawler rules queued up for launch day. Ship the recommended file in §1.
3. **Blog posts are thin (230–270 words each) relative to their citation potential (§2e).** Expand to 600–900+ words per post with more specific, sourced detail.
4. **`sameAs` entity graph missing LinkedIn; Twitter/X inconsistency between schema and visible UI (§4)** — also flagged in `local.md`, included here for GEO entity-graph completeness.

### Low
1. **Blog H2s are mostly declarative, not question-based**, except "So Which Grade Should You Book?" — reformatting 1–2 more headings per post as questions (e.g., "When Is the Best Time to Raft in Rishikesh?") would align better with AI Overview-style query matching.
2. **Gallery image `alt` text is generic and non-descriptive** ("rafting moment 1", "rafting video clip 3") rather than naming the specific rapid/route/location shown — a missed multimodal-citability opportunity distinct from the "4 images missing alt entirely" finding already in `technical.md`.
3. **Grade II vs Grade IV blog post is under-linked** — only reachable via `/blog`; cross-link from `/packages` and package-page FAQs.

### Info
- Testimonials/reviews are placeholder content pending client sign-off (per project memory) — already tracked in depth in `local.md`/`schema.md`; noted here only because `AggregateRating`/`Review` schema is also a GEO authority signal, not just a local-SEO one. Do not add review schema until testimonial authenticity is confirmed.
- All stock Unsplash photography is expected placeholder pre-signoff; flagged for real trip photography before launch, which will also improve multimodal citability once descriptive alt text is added against real, location-specific images.
- Not independently checked in this pass: `/privacy` and `/terms` page content for AI-citability (low priority — these pages are unlikely AI-citation targets); live verification of the `sameAs` social profile URLs (can't resolve meaningfully pre-launch); DataForSEO live ChatGPT-visibility/mention-tracking tools (not available in this session).

---

## Methodology Notes

- All 18 pages rendered via `render_page.py --mode auto --json` (Playwright + trafilatura), confirming `is_spa: false` / `mode_used: raw` on every page — no JS execution was required to see full body content on any page tested.
- Passage-extraction findings (§2) were derived by diffing raw HTML (`grep`-level fact-checking, e.g. confirming price/FAQ text exists in source) against `extracted_text` (trafilatura's boilerplate-stripped output) for the same page, per this skill's explicit guidance to score citability against `extracted_text`, not raw HTML.
- JSON-LD parsed directly from raw HTML per page (`application/ld+json` blocks) to cross-check what's machine-readable vs. what's plain-text-extractable — this is the basis for distinguishing "schema has it" (§2a, confirmed FAQPage answers) from "plain text doesn't" (the actual GEO gap).
- `robots.txt`, `/llms.txt`, and `/sitemap.xml` fetched directly via HTTP.
- No DataForSEO MCP tools were available in this session — platform-specific scores in §6 are qualitative projections, not measured citation data.
