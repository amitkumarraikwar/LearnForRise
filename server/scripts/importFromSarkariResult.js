const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Post = require('../models/Post');
const connectDB = require('../config/db');

const categoryMap = {
  5: 'latest-jobs',   // Latest Job
  7: 'latest-jobs',   // Sarkari Job
  173: 'latest-jobs', // 10th/ITI Jobs
  6: 'result',        // Result
  3: 'admit-card',    // Admit Card
  10: 'syllabus',     // Syllabus
  4: 'answer-key',    // Answer key
  2: 'admission',     // Admission
};

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/sarkariresult\.com\.cm/gi, 'learnforrise.com')
    .replace(/sarkari\s*result/gi, 'LearnForRise')
    .replace(/SarkariResult/g, 'LearnForRise')
    .replace(/Sarkari Result/g, 'LearnForRise')
    .trim();
}

function extractImportantLinks(html) {
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    let label = match[2].replace(/<[^>]+>/g, '').trim();

    if (
      url &&
      !url.includes('sarkariresult.com.cm') &&
      !url.includes('facebook.com') &&
      !url.includes('telegram') &&
      !url.includes('whatsapp') &&
      label.length > 2 &&
      label.length < 100
    ) {
      label = cleanText(label);
      if (!links.some((l) => l.url === url)) {
        links.push({ label, url });
      }
    }
  }

  if (links.length === 0) {
    links.push({ label: 'Official Website', url: 'https://learnforrise.com' });
  }

  return links.slice(0, 8);
}

function determineCategory(categories, title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('syllabus') || lowerTitle.includes('pattern') || lowerTitle.includes('exam city')) return 'syllabus';
  if (lowerTitle.includes('result')) return 'result';
  if (lowerTitle.includes('admit card') || lowerTitle.includes('hall ticket')) return 'admit-card';
  if (lowerTitle.includes('answer key') || lowerTitle.includes('key')) return 'answer-key';
  if (lowerTitle.includes('admission') || lowerTitle.includes('counselling')) return 'admission';

  for (const catId of categories) {
    if (categoryMap[catId]) return categoryMap[catId];
  }

  return 'latest-jobs';
}

async function scrapeAndImport() {
  console.log('🚀 Starting targeted import from sarkariresult.com.cm...');

  let allWpPosts = [];

  // Fetch recent posts + category-specific posts
  const endpoints = [
    'https://sarkariresult.com.cm/wp-json/wp/v2/posts?per_page=100&page=1',
    'https://sarkariresult.com.cm/wp-json/wp/v2/posts?per_page=100&page=2',
    'https://sarkariresult.com.cm/wp-json/wp/v2/posts?per_page=50&categories=10', // Syllabus category
  ];

  for (const url of endpoints) {
    try {
      console.log(`Fetching ${url}...`);
      const res = await fetch(url);
      if (res.ok) {
        const posts = await res.json();
        allWpPosts = allWpPosts.concat(posts);
      }
    } catch (e) {
      console.error(`Fetch failed for ${url}:`, e.message);
    }
  }

  console.log(`📦 Total raw posts fetched: ${allWpPosts.length}`);

  const importedPosts = [];
  const seenTitles = new Set();

  for (const item of allWpPosts) {
    const rawTitle = item.title?.rendered || '';
    const cleanTitle = cleanText(rawTitle)
      .replace(/&#8211;/g, '–')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&');

    if (seenTitles.has(cleanTitle)) continue;
    seenTitles.add(cleanTitle);

    const rawContent = item.content?.rendered || '';
    const cleanContent = cleanText(rawContent);
    const excerpt = cleanText(item.excerpt?.rendered || rawTitle).replace(/<[^>]+>/g, '').trim();

    const category = determineCategory(item.categories || [], cleanTitle);
    const links = extractImportantLinks(rawContent);

    const postObj = {
      title: cleanTitle,
      category,
      department: 'Government Department',
      state: 'All India',
      qualification: 'As per Notification',
      shortDescription: excerpt.slice(0, 300) || cleanTitle,
      fullDescription: cleanContent,
      importantDates: [
        { label: 'Published Date', date: new Date(item.date || Date.now()) },
      ],
      importantLinks: links,
      status: 'published',
      isTrending: Math.random() < 0.3,
      isFeatured: Math.random() < 0.2,
      views: Math.floor(Math.random() * 5000) + 100,
      publishedAt: new Date(item.date || Date.now()),
    };

    importedPosts.push(postObj);
  }

  // Save fallback data to data/postsFallback.json
  const fallbackPath = path.join(__dirname, '../data/postsFallback.json');
  fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
  fs.writeFileSync(fallbackPath, JSON.stringify(importedPosts, null, 2));
  console.log(`💾 Saved ${importedPosts.length} clean posts to data/postsFallback.json`);

  // Save to MongoDB if connected
  try {
    await connectDB();
    if (mongoose.connection.readyState === 1) {
      console.log('Clearing old posts in MongoDB...');
      await Post.deleteMany({});
      for (const p of importedPosts) {
        try {
          await Post.create(p);
        } catch (err) {}
      }
      console.log(`✅ Saved ${importedPosts.length} posts to MongoDB!`);
    }
  } catch (err) {}

  console.log('🎉 Import completed successfully!');
  process.exit(0);
}

scrapeAndImport();
