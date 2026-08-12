# LearnForRise — Design System

## Design Direction
Minimal, premium, simple. Think: fintech app meets news portal. Zero clutter, generous whitespace, strong typography hierarchy. Koi popup ads, koi flashing banners, koi random "live gif" icons nahi — jo reference site me hain, wo avoid karna hai.

## Color Palette
Premium feel ke liye dark-accent + neutral base combo use karo.

- **Base/Background:** Off-white `#FAFAF9` (light mode default) ya deep charcoal `#0B0B0F` (dark mode option)
- **Primary Accent:** Deep Indigo/Blue `#3B4FF0` ya Emerald `#0F9D6E` (trust + growth signal, "Rise" naam ke saath match karta hai)
- **Secondary Accent:** Warm Amber `#F5A623` (CTA buttons, "New" badges, urgency tags — sarkari result category tags ke liye)
- **Text Primary:** `#111114`
- **Text Secondary:** `#6B6B76`
- **Border/Divider:** `#E5E5E8`
- **Success/Result:** `#16A34A`
- **Alert/Deadline:** `#DC2626`

Dark mode toggle rakhna — students raat ko phone pe padhte hain, dark mode usability ke liye important hai.

## Typography
- **Headings:** "Satoshi" ya "Clash Display" (modern, premium geometric sans) — Google Fonts alternative: "Sora" ya "Space Grotesk"
- **Body:** "Inter" ya "General Sans" — clean, highly readable at small sizes
- **Devanagari support:** "Noto Sans Devanagari" fallback (kyunki content Hindi-English mix hoga)

Font weight hierarchy: Headings 600-700, body 400-500. Letter spacing thoda tight headings pe (-0.02em).

## Layout Principles
- Card-based layout for job listings, results, admit cards (not plain WordPress-style lists)
- Sticky top nav with subtle blur/glass effect on scroll
- Category tabs (Latest Jobs / Results / Admit Card / Syllabus / Answer Key / Admission) as pill-style tabs, not sidebar widgets
- Max content width ~1200px, centered, with breathing room on sides
- Grid: 12-column on desktop, single column stacked on mobile
- Section spacing: minimum 80-100px vertical rhythm between major sections

## Animation Guidelines (Framer Motion + GSAP + Anime.js + Three.js)
Purposeful animation, not decorative overload.

- **Framer Motion:** Page transitions, card hover states (subtle lift + shadow), tab switching, modal/drawer entries
- **GSAP:** Scroll-triggered reveals (fade + slide up on scroll for job cards, staggered list reveals), hero section text reveal
- **Anime.js:** Micro-interactions — button press feedback, badge pop-in for "New" tags, number counters (e.g. "10,000+ jobs listed")
- **Three.js:** Sparingly, only on homepage hero — subtle abstract 3D element (floating geometric shapes, particle grid, or gradient mesh background). Keep it lightweight (low poly count) so mobile performance stays smooth. Do NOT use Three.js on listing/content pages — performance over decoration there.

Animation timing: 200-400ms for micro-interactions, 400-700ms for section reveals. Easing: `easeOutExpo` ya custom cubic-bezier, never linear.

## Components to Design
- Header with logo, nav pills, search bar, dark mode toggle, social icons
- Hero section with headline, subtext, search CTA, subtle 3D/particle background
- Category tab bar (Latest Jobs, Result, Admit Card, Syllabus, Answer Key, Admission)
- Job/Result card component (title, organization, post date, deadline badge, "New" tag if <7 days old)
- Filter sidebar/drawer (category, state, qualification)
- Footer with quick links, social icons, disclaimer text
- 404 and loading skeleton states (skeleton loaders, not spinners — feels more premium)

## Accessibility
- Contrast ratio minimum AA for all text
- Focus states visible on all interactive elements
- Reduce-motion media query respect kare (animations off for users who prefer reduced motion)

## Reference Mood
Look and feel: Linear.app / Vercel dashboard / Notion landing page — precision, calm, confident. NOT: typical Indian govt-job-portal aesthetic (cluttered, red/yellow heavy, Comic Sans-ish fonts, banner ads everywhere).