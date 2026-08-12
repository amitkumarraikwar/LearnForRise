# LearnForRise — Structure & Build Prompt

## Sitemap
```
/                       → Homepage
/latest-jobs            → Latest Jobs listing
/latest-jobs/[slug]     → Job detail page
/result                 → Result listing
/result/[slug]          → Result detail page
/admit-card             → Admit Card listing
/admit-card/[slug]      → Admit Card detail page
/syllabus               → Syllabus listing
/syllabus/[slug]        → Syllabus detail page
/answer-key             → Answer Key listing
/answer-key/[slug]      → Answer Key detail page
/admission               → Admission listing
/admission/[slug]        → Admission detail page
/search?q=              → Search results
/about
/contact
/privacy-policy
/disclaimer
```

## Suggested Folder Structure (Next.js frontend)
```
app/
  (main)/
    page.tsx                  → Homepage
    latest-jobs/
      page.tsx
      [slug]/page.tsx
    result/
    admit-card/
    syllabus/
    answer-key/
    admission/
    search/page.tsx
    about/page.tsx
    contact/page.tsx
  layout.tsx
components/
  ui/                          → buttons, cards, badges (reusable)
  layout/                      → Header, Footer, Nav
  home/                        → Hero, TrendingSection, CategoryPreview
  post/                        → PostCard, PostDetail, ImportantLinks
  animations/                  → shared GSAP/Framer wrappers
lib/
  api.ts                       → API client functions
  utils.ts
types/
  post.ts
```

## Backend Structure (Node + Express + MongoDB)
```
server/
  models/
    Post.js          → title, category, department, description, importantDates, importantLinks, status, publishedAt
    Category.js
  routes/
    posts.js
    categories.js
    search.js
  controllers/
  middleware/
    auth.js           → for admin panel
  config/
    db.js
  server.js
```

### Post Schema (core fields)
```
{
  title, slug, category (enum: latest-jobs, result, admit-card, syllabus, answer-key, admission),
  department, shortDescription, fullDescription,
  importantDates: [{ label, date }],
  importantLinks: [{ label, url }],
  eligibility, applicationFee,
  status: draft | published,
  isFeatured, isTrending,
  views,
  createdAt, updatedAt, publishedAt
}
```

## Prompt to feed your AI coding agent (Antigravity)

Use this as the master prompt when starting the build:

---
Build a website called "LearnForRise" — a government job/result information portal similar in purpose to sarkariresult.com.cm (Latest Jobs, Result, Admit Card, Syllabus, Answer Key, Admission sections) but with a minimal, premium, clean design instead of the cluttered traditional sarkari-result aesthetic.

Frontend: Next.js (App Router), Tailwind CSS.
Backend: Node.js + Express + MongoDB, REST API.
Animation libraries: Framer Motion (page/card transitions), GSAP (scroll reveals), Anime.js (micro-interactions), Three.js (subtle hero background only, lazy-loaded, low-poly for performance).

Follow the color palette, typography, and component guidelines in design.md. Follow the sitemap and schema in structure.md. Build Phase 1 features from features.md only — keep MongoDB schema and folder structure flexible for Phase 2 features listed there, but do not build Phase 2 now.

Site must be mobile-first, SEO-optimized (Next.js metadata API, JobPosting structured data, sitemap.xml), and fast (Core Web Vitals — lazy load heavy animation libraries).

Footer must include social links (Instagram, YouTube, Facebook) and a disclaimer stating this is not an official government website.
---

Isko Antigravity me paste karke start karo, phir page-by-page/component-by-component break karke build karna easier rahega bajaye ek shot me pura site banane ke.