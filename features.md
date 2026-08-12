# LearnForRise — Features

## Phase 1 (Abhi build karna hai)

### Core Content Sections
1. **Latest Jobs** — Government job vacancy listings (title, department, post count, qualification, last date)
2. **Result** — Exam results with direct check-result links
3. **Admit Card** — Admit card download links, exam date info
4. **Syllabus** — Exam-wise syllabus and pattern
5. **Answer Key** — Official/unofficial answer key links, objection window info
6. **Admission** — College/university admission notifications, counselling updates

### Homepage
- Hero section with search bar (search jobs/results by keyword)
- "Trending Now" section — top 5-6 most-clicked/urgent posts
- Category-wise preview blocks (latest 5 items per category with "View All")
- Deadline countdown badges on urgent posts ("3 days left")

### Individual Post Page
- Full details: eligibility, age limit, fee, important dates, how to apply
- "Important Links" block (Apply Online, Download Notification, Official Website)
- Related posts section
- Share buttons (WhatsApp, Telegram, social)

### Search & Filter
- Global search bar (searches across all categories)
- Filter by: category, state, qualification, department

### Admin Panel (backend)
- CRUD for posts (add/edit/delete job, result, admit card, etc.)
- Category and tag management
- Draft/Publish workflow
- Simple analytics (views per post)

### Static/Utility Pages
- Contact Us
- Privacy Policy
- Disclaimer
- About Us

### SEO Essentials
- Dynamic meta tags per post (Next.js metadata API)
- Sitemap.xml auto-generation
- Structured data (JobPosting schema for job listings — helps Google Jobs indexing)
- Fast loading (Core Web Vitals optimized — important since Three.js/GSAP can hurt performance if not lazy-loaded)

## Phase 2 (Future — architecture flexible rakhni hai, abhi build nahi karna)

- User accounts (save jobs, personalized dashboard)
- Push notifications (new job alerts via browser/app)
- Email/WhatsApp job alert subscription
- AI-based job recommendation based on user qualification
- Mock test / quiz module for exam prep
- Community discussion forum per exam/post
- Mobile app (React Native, sharing backend)
- Multi-language support (Hindi/English toggle, more regional languages later)
- Bookmark/favorite posts

## Non-Functional Requirements
- Mobile-first responsive (majority traffic mobile se aayega)
- Fast page load (<2s on 4G) despite animation libraries — lazy load Three.js/GSAP where not immediately needed
- SEO-first architecture (SSR/ISR via Next.js for all content pages)
- Scalable MongoDB schema (categories, posts, tags as separate collections for easy Phase 2 expansion)