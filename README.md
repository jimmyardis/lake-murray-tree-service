# Lake Murray Tree Service — rank-and-rent lead-gen site

A fast, static, multi-page site engineered to rank in Google's local results **and** to be
quoted by AI answer engines (AEO). Built as clean HTML/CSS with a Python generator so pages
stay consistent and new towns/services are easy to add.

**Live-visible pages (12):** Home, Tree Removal, Tree Trimming & Pruning, Stump Grinding,
Emergency/Storm Damage, Chapin, Irmo, Lexington, Ballentine, Contact, About, 404.

---

## ⚠️ Do these 3 things before you publish

1. **Phone number.** Everything points at a placeholder `(803) 339-3059`. Replace it with your
   real number — ideally a **call-tracking number** (CallRail, etc.) so you can prove call
   volume when you rent the site to a tree company. Edit `SITE["phone_display"]` and
   `SITE["phone_tel"]` in `build.py`, then rerun `python3 build.py`.

2. **Verify every claim is true.** The copy states "licensed & insured," "24/7," "free
   estimates," etc. These must be true for whoever operates the leads. If the renting company
   isn't licensed/insured, change the wording. Misleading local pages can get a Google Business
   Profile suspended and expose you to liability.

3. **Never invent reviews.** The homepage "Reviews" section and the testimonial cards are
   **placeholders**. Fake review schema / fake testimonials violate Google policy and FTC rules
   and can trigger manual penalties. Add real reviews only once you (or your renter) have them —
   pull them from the Google Business Profile. Review/AggregateRating schema is intentionally
   left OUT of the code until then.

Other quick customizations in `build.py` → `SITE`: email, service-area town list, hours,
lat/long, price range.

---

## What's built in for SEO

- **Real multi-page architecture** — separate crawlable URLs per service and per town (far
  better than a single-page site or JS app for local SEO).
- **Unique `<title>` + meta description on every page** (verified: 12 unique titles, 12 unique
  descriptions, no duplicates).
- **One `<h1>` per page**, logical heading hierarchy, keyword-plus-geo targeting
  (e.g. "Tree Service in Chapin, SC").
- **Canonical tags** on every page; **Open Graph + Twitter** cards with a generated 1200×630
  share image (`assets/og-image.png`).
- **Dedicated location pages** with genuinely unique copy per town (not thin/duplicate
  "doorway" pages, which Google penalizes).
- **`sitemap.xml`** (prioritized) and **`robots.txt`** with sitemap reference.
- **Internal linking** — services ↔ locations ↔ home, plus breadcrumbs.
- **Speed & Core Web Vitals**: one web font (headings only) with preconnect, system-font body,
  inline SVG icons (no icon-font requests), minimal deferred JS, no framework.
- **Mobile-first, accessible**: sticky click-to-call bar on phones, keyboard focus states,
  `prefers-reduced-motion` respected, semantic landmarks, skip link.
- **Structured data (48 JSON-LD blocks, all validated):**
  - `LocalBusiness` / `HomeAndConstructionBusiness` with NAP, geo, hours, `areaServed`
  - `WebSite`
  - `Service` schema on each service page
  - `BreadcrumbList` on interior pages

## What's built in for AEO (Answer Engine Optimization)

AEO = getting pulled into Google's featured snippets, the "AI Overview," and assistants like
ChatGPT/Perplexity/Gemini. The site is structured so answer engines can lift clean, quotable
answers:

- **`FAQPage` schema** on the home, every service, and every location page.
- **Question-phrased headings** matching how people actually ask ("How much does tree removal
  cost in the Lake Murray area?").
- **Concise, direct answers** — the first sentence answers the question outright, then adds
  detail. This is the format answer engines extract.
- **`speakable` schema** on key pages for voice assistants.
- **Cost/《how it works》 content** written in the plain, factual, scannable style AI answers favor.
- **Semantic HTML** (`<details>`/`<summary>` FAQs) that works even without JavaScript, so the
  Q&A is always in the crawlable DOM.

---

## Deploy with GitHub Pages

Links are **relative**, so the site works anywhere — the `username.github.io/repo/` subpath,
your custom domain, or opened locally. Just upload the site files to a repo with `index.html`
at the **top level**.

1. Create a new GitHub repo (public).
2. Upload **all the files in this folder** (the `index.html`, the other `.html` files, and the
   `assets/` folder) to the repo root. `index.html` must sit at the top level — not inside a
   subfolder.
3. Repo **Settings → Pages** → Source: "Deploy from a branch" → Branch: `main` / folder `/root`
   → Save. Your site goes live at `https://<username>.github.io/<repo>/` within a minute.
4. When your domain is ready, add `lakemurraytreeservice.com` under Settings → Pages →
   Custom domain, and point your DNS at GitHub (their setup page walks you through the records).

That's the whole flow — same as any GitHub Pages site you've done before.

*(Netlify and Cloudflare Pages are just alternative free hosts that do the same job with
drag-and-drop deploys and built-in form handling. You don't need them — GitHub Pages is fine.)*

**Wire up the quote form** (currently a front-end stub): the fastest options are
**Netlify Forms** (add `netlify` attribute to the `<form>` in `render_contact()` and redeploy),
**Formspree**, or **Web3Forms** — set the form `action` to their endpoint. See the note in
`assets/main.js`.

### Local preview
Open `dist/` with a server (not `file://`, which won't resolve root paths):
```
cd dist && python3 -m http.server 8000   # then visit http://localhost:8000
```

---

## The part that actually earns the ranking (do this after launch)

The site is the foundation; these off-page moves are what push a low-competition local term to
page one and the map pack:

1. **Google Business Profile** — this is the single biggest lever for local + map-pack ranking.
   Set one up for the business, verify it, choose "Tree Service" category, add photos, and point
   it at this site. GBP + a handful of genuine reviews can rank fast in low-competition areas.
2. **Real reviews** — steadily gather authentic Google reviews. They drive both ranking and
   conversion. Then (and only then) add them to the site.
3. **Local citations / NAP consistency** — list the exact same Name/Address/Phone on
   Bing Places, Apple Maps, Yelp, Angi, and local directories.
4. **A few quality local backlinks** — Chamber of Commerce, local sponsorships, supplier pages.
5. **Keep adding useful content** — seasonal posts ("prepping Lake Murray trees for hurricane
   season," "spotting a hazardous leaner") deepen topical authority and create more AEO surface.
6. **Track calls/forms** so you have real lead numbers when you pitch the site to a renter.

---

## Adding pages later

Everything is data-driven in `build.py`:
- **New town:** add a dict to `TOWNS` (slug, name, label, meta, h1, intro, highlights, faqs) →
  `python3 build.py`. It auto-generates the page, nav/footer links, sitemap entry, and schema.
- **New service:** add a dict to `SERVICES` the same way.

## Project structure
```
lake-murray-tree-service/
├── build.py          # generator: content + templates + schema  (edit here)
├── make_og.py        # regenerates the social share image
├── assets/           # styles.css, main.js, favicon.svg, og-image.png
└── dist/             # ← generated static site. THIS is what you deploy.
```
