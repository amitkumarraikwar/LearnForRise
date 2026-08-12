# LearnForRise

LearnForRise is a web platform for accessing Indian government job updates, exam results, admit cards, syllabus details, answer keys, and university admissions. It provides a clean, fast interface without third-party popups or ad clutter.

---

## Core Capabilities

- Public Job Portal: Browse notifications sorted by categories including Latest Jobs, Result, Admit Card, Syllabus, Answer Key, and Admission.
- Search and Filtering: Filter updates by qualification, region, and department.
- Protected Admin Dashboard: A dedicated dashboard at /admin to create, edit, delete, and organize notifications and categories.
- Data Security and Authentication: Admin routes require authentication to prevent unauthorized modifications.
- Dark and Light Themes: Integrated theme switcher for comfortable reading in any environment.
- Automated Scraper and Local Fallback: Scrapes public domain updates and maintains local fallback JSON storage when database connections are unavailable.

---

## Technical Stack

- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB (with JSON fallback storage)
- Authentication: Session token authentication for admin operations

---

## Repository Organization

```
LearnForRise/
├── frontend/             # Next.js frontend application
│   ├── app/              # Main site pages and /admin dashboard
│   ├── components/       # Reusable layout and post components
│   ├── lib/              # API helpers and utils
│   └── types/            # TypeScript type definitions
├── server/               # Express REST API backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers for posts and categories
│   ├── data/             # Local fallback data storage
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express API endpoints
│   └── scripts/          # Scraping scripts
└── README.md
```

---

## Local Development Setup

### 1. Start the API Server

```bash
cd server
npm install
npm run dev
```

The Express API will run on http://localhost:5000.

### 2. Start the Frontend Application

```bash
cd frontend
npm install
npm run dev
```

The Next.js application will run on http://localhost:3000.

---

## Admin Access

To manage job listings and portal categories:

1. Open http://localhost:3000/admin in your web browser.
2. Log in using your administrator credentials.
   - Default Username: admin
   - Default Password: admin12345

---

## License

Distributed under the MIT License.
