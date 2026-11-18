# SEO plan for shaaditemplate.com

Last reviewed 17 November 2026. Two independent audits (a manual one and one following the claude-seo skill, health score 58/100 before this work) were merged into this plan. The site launched this week and is not indexed yet.

## Goals

The site wins when a family searching for a card in their own language finds a ShaadiTemplate page, opens a design and downloads it. Targets, with no baseline yet:

| Metric | Source | Week 2 | Week 4 | Month 3 | Month 6 |
|---|---|---|---|---|---|
| Indexed / submitted URLs | Search Console, Page indexing | over 40% | all hubs and guides | new pages indexed within 3 weeks | same |
| Impressions per month | Search Console | first impressions | 500+ | 10k+ | 50k+ |
| Non-brand clicks per month | Search Console | 0 | 10+ | 300+ | 2,000+ |
| Organic sessions with an `export` event (a downloaded card) | GA4 | none | first | 100+/month | 1,000+/month |
| Homepage CLS | lab, then CrUX | under 0.1 | under 0.1 | CrUX "good" | same |
| Referring domains | Search Console, Links | 0 | 3+ | 15+ | 40+ |

Leading indicators to watch between reviews: "Crawled, currently not indexed" (should trend to 0), impressions on the kankotri and Hindi card matter guides, Image search impressions, Pinterest outbound clicks.

## Verdict: start now

Submit to Search Console now. Nothing blocks indexing (every sitemap URL returns 200 with a self-canonical, robots.txt allows all, http and www redirect to https in one 301, the 404 page returns 404). The domain is days old, so time is the main constraint, and every remaining change only adds pages. Indian wedding season runs November to February. Keep every existing URL; build on the `.html` pattern.

## Findings and status

"Done" means fixed in the PR that added this file. IDs match the independent audit.

| ID | Finding | Status |
|---|---|---|
| (pre) | Homepage was an empty SPA shell; templates lived behind `#` routes and buttons, so Google saw one page | Done in PR #19: static homepage text, 7 ceremony hubs, 3 guides, 404, canonicals |
| H1 | Homepage CLS 1.007 on throttled mobile: static text sat under an empty `#root` and was pushed down when React mounted | Done: a static copy of the header and hero sits inside `#root` (index.html). Measured CLS 0; shell and app line up to the pixel on desktop |
| H2 | Gallery rendered 46 live cards: about 25,000 DOM nodes, 35 font files, 1.8 MB | Done: hero and grid use the WebP previews. Now about 550 DOM nodes and 5 font files on `/`. A template without a preview falls back to live rendering |
| H3 | No Open Graph or Twitter tags, so WhatsApp previews were blank | Done: OG (with `og:locale`), Twitter card and a 1200x630 share image per page in `public/og/` |
| H4 | All content English while high-intent searches are in Indian scripts and Hinglish | Done: 6 wording guides, 3 written in Gujarati, Hindi and Marathi script. Needs native-speaker review |
| M1 | No structured data | Done: Organization, WebSite, WebApplication, CollectionPage with ItemList, CreativeWork, Article with author, BreadcrumbList, AboutPage, ContactPage |
| M2 | No favicon or touch icon | Done: favicon.ico (16/32/48), icon-192, apple-touch-icon, icon-512 (Organization logo) |
| M3 | Guides had no author; About says who but not why | Partly done: bylines on every guide link to an author section on About, and Article JSON-LD names the author. Owner: add a true sentence or two about your own background with wedding cards (do not invent credentials) |
| M4 | Homepage H1 was JS-only with no keyword | Done: static H1 "Free Indian wedding invitation maker" |
| M5 | Hub titles lacked search words | Done: per-page titles with card, free, templates, WhatsApp |
| M6 | Designs had no URLs of their own | Partly done: 10 design pages (every page of the card at 1080px, sample wording, details) and 5 language hubs. The other 36 follow in batches (Phase 3) |
| M7 | Images not set up for Google Images | Done: descriptive alt text, image sitemap entries for every preview a page shows, 1080px page images on design pages |
| M8 | Sitemap had no lastmod | Done: generated sitemap with lastmod from git (date of last real change) |
| M9 | `/guides/` and `/templates/` index pages were thin | Done: both list and describe their child pages, including the new guides, language hubs and design pages |
| L1 | Extensionless duplicates (`/about`) return 200 on GitHub Pages | No change needed: canonicals point at `.html`, and every link and sitemap entry uses `.html` |
| L2 | Short titles and descriptions on utility pages | Done |
| L3 | No HSTS or CSP headers | Not possible on GitHub Pages without a proxy such as Cloudflare. Not a ranking factor. Revisit if hosting changes |
| L4 | No IndexNow | Done: key file in `public/` and a ping step in `deploy.yml` that submits the sitemap URLs on every deploy |
| L5 | AdSense on every page | Owner: once ads show, keep auto-ads density low on mobile and check CLS again, since injected ads add their own shift |
| L6 | No llms.txt | Done: `public/llms.txt` (optional, no proven effect) |
| Info | Indian-script words inside English pages had no `lang` attribute | Done |
| (new) | Static pages overflowed sideways on phones: footer links had no wrap point | Done: footer and nav wrap |

Not measured: Lighthouse and CrUX (PageSpeed API was rate-limited, no field data yet), keyword volumes and backlinks (no paid tools). Re-run PageSpeed with an API key once the site has traffic.

### Content issues found while writing pages

All fixed in the same PR:

- **Sandhya labels.** Its painted inner pages show ॥ જય ગેલ માતાજી ॥ with a goddess image (page 3) and ॥ જય શ્રી સ્વામિનારાયણ ॥ with a Swaminarayan figure (page 4). Added Gel Mataji and Swaminarayan as symbol options (ids, labels, invocations in every sample, emblems) and tagged Sandhya with both.
- **Printer watermark.** Removed the printer's mark and phone number from `public/templates/sandhya/6.jpg`.
- **White Chapel and Pelli Patrika wording.** Each now opens with its own English sample: a church wedding (Holy Matrimony, nuptial mass, roce, reception) and a Telugu wedding (Shubha Vivaham, pellikuthuru, muhurtham with jeelakarra bellam, talambralu). Template `override` can now replace the time, venue, address and the five inner pages.
- **Hindi and English times.** The cover now matches the ceremonies page (baraat 6 pm, hast melap 7:30 pm).
- **Tamil Haldi title.** Changed மஞ்சள் நீராட்டு to மங்கள ஸ்நானம்.

## Information architecture

```
/                                   app, static hero, how it works, FAQ
/templates/                         designs by ceremony, by language, and designs with a full page
  <ceremony>-invitations.html       7 ceremony hubs
  <language>-invitations.html       gujarati, hindi, marathi, punjabi, tamil
  <design-id>.html                  one page per design (10 so far)
/guides/                            wording, layout and printing guides (9)
/about.html /contact.html /privacy.html /terms.html /refund.html
```

Every page is reachable in two clicks from `/`. Hubs link to their design pages; design pages link to their ceremony hub, language hub, guide and siblings; guides link to the designs that fit them.

Not built on purpose: symbol hubs (Sikh, Muslim, Jain, Christian have 1 to 4 designs each, which would be thin; the wording guides cover them), `hreflang` (each page exists in one language only), FAQPage and HowTo schema (Google retired those rich results).

## Plan

### Phase 0: today (owner)
- [ ] Search Console: add a Domain property for shaaditemplate.com, verified by DNS TXT record at the registrar.
- [ ] Submit `https://shaaditemplate.com/sitemap.xml`.
- [ ] URL Inspection, "Request indexing" for `/`, `/templates/`, `/templates/wedding-invitations.html`, `/guides/gujarati-kankotri-lakhan.html`. Never submit `#` URLs.
- [ ] Bing Webmaster Tools: import the site from Search Console (Bing also feeds ChatGPT search and Copilot).
- [ ] Link GA4 to Search Console, and mark the `export` event as a key event in GA4.
- [ ] Rich Results Test on `/`, one hub, one design page and one guide.

### Phase 1: technical fixes (done in this PR)
H1 to H3, M1, M2, M4, M5, M7, M8, L2, L4, L6 and the `lang` fix above.

### Phase 2: content and off-site (weeks 2 to 6)
- [x] Wording guides: Gujarati kankotri lakhan, Hindi shadi card matter, Marathi lagna patrika, Nikah and Walima, Anand Karaj, Tamil.
- [x] First 10 design pages and 5 language hubs.
- [ ] Native speakers review the Gujarati, Hindi, Marathi, Punjabi, Tamil, Urdu and Arabic text, especially religious verses and the lines flagged in the PR.
- [ ] Owner background on About (M3).
- [ ] Pinterest business account: a board per ceremony and per language, one pin per design linking to its hub or design page.
- [ ] YouTube Shorts and Instagram Reels: 30-second screen recordings, for example "Gujarati kankotri in 2 minutes, typed in English letters".
- [ ] Ask 5 printers in Surat to link to the site (they get clean PDFs instead of retyping names).
- [ ] One-off listings: Product Hunt, AlternativeTo (as a free Canva alternative for Indian invites), Indie Hackers.
- [ ] Answer kankotri, lagna patrika and card wording questions on Quora and r/indianweddings in full, linking only where the tool genuinely helps.
- [ ] Optional: an opt-out "Made on shaaditemplate.com" line on downloaded cards, so forwarded invites carry the address.

### Phase 3: months 2 to 4
Gate: start only when over 80% of the Phase 1 and 2 pages are indexed.
- [ ] Remaining 36 design pages in batches of 5 to 10, each batch after the previous one is mostly indexed. Next candidates with distinct demand: parsi-lagan, kerala-kasavu, shubho-bibaho, mangalashtak, nischayathartham, garba-raas-night, gol-dhana, misri-roka, qawwali-mehfil, kashmiri-chinar.
- [ ] Refresh guides with questions seen in Search Console queries; split the general wording guide only if data says so.
- [ ] A data piece once GA4 has a season of data (for example "share of cards made in each script"), pitched to Indian wedding blogs.

### Phase 4: ongoing
- Monthly: Search Console indexing and queries, a lab CLS check on `/`, and 10 fixed questions asked in ChatGPT, Perplexity, Gemini and Google AI Mode ("free tool to make kankotri online", "nikah card wording in English") to log whether the site is cited.
- Quarterly: re-audit with a PageSpeed API key, re-check the SERPs for the six wording clusters, refresh content before each wedding season.

## Maintenance

- New or edited static page: run `python3 scripts/seo.py` (needs Pillow). It rewrites each page's `<!-- seo -->` head block (favicons, OG, Twitter, JSON-LD), draws its share image into `public/og/`, and regenerates `public/sitemap.xml`. Pages titled in an Indian script need an English share-image headline in `HEADLINES` in the script.
- New design page or new template: with `npm run dev` running, `python3 scripts/previews.py <id>` renders its 540x960 cover preview and every page at 1080x1920 into `public/templates/previews/`. The gallery renders a card live until its preview exists. Re-render when the artwork changes.
- The hero in `index.html` is a static copy of the one in `src/App.tsx`; change both together.
- Content rules: written by a fluent speaker, answer first, copyable wording, links to 2 to 5 fitting designs, byline and date. One page per real search intent. No machine translation, no padding, no invented facts.
- Avoid: paid links, link exchanges, mass directory submissions.
