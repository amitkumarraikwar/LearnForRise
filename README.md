# LearnForRise

**LearnForRise** is India's premier minimal, clean, and fast government job & result information portal. It provides real-time notifications for **Latest Jobs**, **Exam Results**, **Admit Cards**, **Syllabus**, **Answer Keys**, and **College Admissions** across India without popup ads, slow loading, or cluttered interfaces.

---

## 🚀 Key Features

- **Minimal & Premium UI**: Built with Next.js App Router, Tailwind CSS, Framer Motion, and Lucide Icons.
- **Zero Popup Ads**: 100% focused on candidate preparation and fast information delivery.
- **Dynamic Next.js Admin Panel**: Full-featured `/admin` portal for managing notifications, categories, important dates, and official links.
- **Verified Official Links**: Direct access to verified government portal links (.gov.in, .nic.in).
- **Dark Mode Support**: Seamless toggle between light and dark themes.
- **SEO & Structured Data**: Built-in JobPosting schema markup, meta tags, and sitemaps.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB (with fallback offline storage)
- **Scraper Utility**: Automated scraper for fetching & sanitizing notifications

---

## 📦 Project Structure

```
LearnForRise/
├── frontend/             # Next.js App Router Application
│   ├── app/              # Main site routes & /admin portal
│   ├── components/       # UI components (Header, Footer, PostCard, Admin)
│   ├── lib/              # API Client & utilities
│   └── types/            # TypeScript type definitions
├── server/               # Node.js + Express REST API
│   ├── config/           # Database configuration
│   ├── controllers/      # Posts & Categories controllers
│   ├── data/             # Fallback JSON datasets
│   ├── models/           # Mongoose schemas
│   ├── routes/           # REST API routes
│   └── scripts/          # Scraping scripts
└── README.md
```

---

## ⚡ Quick Start

### 1. Backend Server
```bash
cd server
npm install
npm run dev
```

### 2. Frontend Application
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.
Visit `http://localhost:3000/admin` to access the Admin Panel.

---

## 📜 License

Distributed under the MIT License.
