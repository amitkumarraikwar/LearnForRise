const Post = require('../models/Post');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

let fallbackPosts = [];

function loadFallbackData() {
  try {
    const fallbackFile = path.join(__dirname, '../data/postsFallback.json');
    if (fs.existsSync(fallbackFile)) {
      const data = JSON.parse(fs.readFileSync(fallbackFile, 'utf8'));
      fallbackPosts = data.map((p, idx) => {
        const slug = slugify(p.title || `post-${idx}`, { lower: true, strict: true }) || `post-${idx}`;
        return {
          _id: String(idx + 1),
          slug,
          ...p,
        };
      });
    }
  } catch (err) {
    console.error('Error loading fallback JSON:', err.message);
  }

  // Ensure every category has sufficient posts by creating default fallback items if missing
  const categories = ['latest-jobs', 'result', 'admit-card', 'syllabus', 'answer-key', 'admission'];
  
  categories.forEach((cat) => {
    const count = fallbackPosts.filter((p) => p.category === cat).length;
    if (count < 5) {
      // Add default posts for this category
      const sampleTitles = {
        'latest-jobs': [
          'SSC CGL 2026 Recruitment Notification — 12,000+ Posts',
          'UPSC IAS Civil Services Examination 2026 Online Form',
          'Railway RRB NTPC Under Graduate Recruitment 2026',
          'SBI Probationary Officer PO Online Application Form 2026',
          'UP Police Constable Bharti 2026 — 60,000+ Vacancies',
        ],
        'result': [
          'UPSC IAS Civil Services 2025 Final Result & Scorecard Out',
          'SSC CGL Tier I Exam Sarkari Result 2026',
          'RRB JE Junior Engineer CBT 1 Exam Result 2026',
          'CTET January 2026 Examination Result & Marks',
          'BPSC 70th Combined Competitive Exam Result 2026',
        ],
        'admit-card': [
          'SSC CGL Tier II Examination Admit Card 2026',
          'UPSC NDA & NA Exam I Hall Ticket / Admit Card 2026',
          'RRB Technician CBT Exam City Details & Admit Card 2026',
          'NTA NEET UG Entrance Exam Admit Card 2026',
          'IBPS PO Main Examination Call Letter Download 2026',
        ],
        'syllabus': [
          'SSC CGL 2026 Exam Pattern & Detailed Syllabus PDF',
          'Railway RRB RPF Sub Inspector SI Syllabus 2026',
          'UPSC Civil Services Mains Examination Detailed Syllabus',
          'UPSSSC PET 2026 Exam Pattern & Subject Wise Syllabus',
          'NEET UG 2026 NTA Biology, Physics, Chemistry Syllabus',
        ],
        'answer-key': [
          'SSC CPO SI Paper II Official Answer Key 2026 Out',
          'UPSSSC PET Exam Final Answer Key & Objection Link 2026',
          'CTET 2026 Official Answer Key & OMR Sheet Download',
          'NTA JEE Main Phase I Exam Response Sheet & Key 2026',
          'Bihar BPSC Assistant Director Answer Key 2026',
        ],
        'admission': [
          'IIM CAT MBA 2026 Online Admission Registration Form',
          'Indian Navy 10+2 B.Tech Cadet Entry Scheme Admission 2026',
          'DU Delhi University UG Admission CUET Form 2026',
          'IIT JAM M.Sc Joint Admission Test Online Form 2026',
          'CLAT 2026 National Law University Admission Notification',
        ],
      };

      (sampleTitles[cat] || []).forEach((title, idx) => {
        const slug = slugify(title, { lower: true, strict: true });
        fallbackPosts.push({
          _id: `fallback-${cat}-${idx}`,
          title,
          slug,
          category: cat,
          department: 'Government Department',
          state: 'All India',
          qualification: 'Graduate / 12th Pass',
          shortDescription: title + ' — Get complete details, eligibility, dates, and direct official apply link on LearnForRise.',
          fullDescription: `<h2>${title}</h2><p>Official notification and complete guidelines for ${title}. Candidates can apply online through official government portals via LearnForRise.</p>`,
          importantDates: [{ label: 'Published Date', date: new Date().toISOString() }],
          importantLinks: [{ label: 'Official Portal', url: 'https://learnforrise.com' }],
          status: 'published',
          isTrending: true,
          isFeatured: true,
          views: 1500 + idx * 250,
          publishedAt: new Date().toISOString(),
        });
      });
    }
  });
}

loadFallbackData();

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all posts
exports.getPosts = async (req, res) => {
  try {
    const { category, state, qualification, department, page = 1, limit = 12 } = req.query;

    if (isDbConnected()) {
      const filter = { status: 'published' };
      if (category) filter.category = category;
      if (state) filter.state = { $regex: state, $options: 'i' };
      if (qualification) filter.qualification = { $regex: qualification, $options: 'i' };
      if (department) filter.department = { $regex: department, $options: 'i' };

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      const [posts, total] = await Promise.all([
        Post.find(filter).sort('-publishedAt').skip(skip).limit(limitNum).select('-fullDescription'),
        Post.countDocuments(filter),
      ]);

      if (posts.length > 0) {
        return res.json({
          success: true,
          data: posts,
          pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
        });
      }
    }

    // Fallback data from scraped dataset + guaranteed category coverage
    let filtered = fallbackPosts;
    if (category) filtered = filtered.filter((p) => p.category === category);
    if (state) filtered = filtered.filter((p) => p.state?.toLowerCase().includes(state.toLowerCase()));
    if (qualification) filtered = filtered.filter((p) => p.qualification?.toLowerCase().includes(qualification.toLowerCase()));

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(skip, skip + limitNum);

    res.json({
      success: true,
      data: paginated,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filtered.length,
        pages: Math.ceil(filtered.length / limitNum) || 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get trending posts
exports.getTrendingPosts = async (req, res) => {
  try {
    if (isDbConnected()) {
      const posts = await Post.find({ status: 'published', isTrending: true })
        .sort('-publishedAt')
        .limit(6)
        .select('-fullDescription');
      if (posts.length > 0) return res.json({ success: true, data: posts });
    }

    const trending = fallbackPosts.filter((p) => p.isTrending).slice(0, 6);
    res.json({ success: true, data: trending });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get posts by category for homepage previews
exports.getPostsByCategory = async (req, res) => {
  try {
    const categories = ['latest-jobs', 'result', 'admit-card', 'syllabus', 'answer-key', 'admission'];

    if (isDbConnected()) {
      const results = await Promise.all(
        categories.map(async (cat) => {
          const posts = await Post.find({ category: cat, status: 'published' })
            .sort('-publishedAt')
            .limit(3)
            .select('title slug category department publishedAt importantDates isTrending createdAt');
          return { category: cat, posts };
        })
      );
      const hasData = results.some((r) => r.posts.length > 0);
      if (hasData) return res.json({ success: true, data: results });
    }

    const fallbackResults = categories.map((cat) => ({
      category: cat,
      posts: fallbackPosts.filter((p) => p.category === cat).slice(0, 3),
    }));

    res.json({ success: true, data: fallbackResults });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const rawSlug = req.params.slug;
    const decodedSlug = decodeURIComponent(rawSlug);

    if (isDbConnected()) {
      const post = await Post.findOne({ $or: [{ slug: rawSlug }, { slug: decodedSlug }] });
      if (post) {
        Post.updateOne({ _id: post._id }, { $inc: { views: 1 } }).exec();
        return res.json({ success: true, data: post });
      }
    }

    let found = fallbackPosts.find((p) => p.slug === rawSlug || p.slug === decodedSlug);
    if (!found) {
      const cleanSlug = rawSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
      found = fallbackPosts.find((p) => (p.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSlug);
    }
    if (!found && fallbackPosts.length > 0) {
      found = fallbackPosts[0];
    }

    if (found) return res.json({ success: true, data: found });

    res.status(404).json({ success: false, message: 'Post not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get related posts
exports.getRelatedPosts = async (req, res) => {
  try {
    const post = fallbackPosts.find((p) => p.slug === req.params.slug);
    const category = post ? post.category : 'latest-jobs';

    if (isDbConnected()) {
      const related = await Post.find({ slug: { $ne: req.params.slug }, category, status: 'published' })
        .limit(4)
        .select('title slug category department publishedAt importantDates createdAt');
      if (related.length > 0) return res.json({ success: true, data: related });
    }

    const fallbackRelated = fallbackPosts.filter((p) => p.slug !== req.params.slug && p.category === category).slice(0, 4);
    res.json({ success: true, data: fallbackRelated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    if (isDbConnected()) {
      const post = await Post.findById(req.params.id);
      if (post) return res.json({ success: true, data: post });
    }

    const found = fallbackPosts.find((p) => p._id === req.params.id || p.slug === req.params.id);
    if (found) return res.json({ success: true, data: found });

    res.status(404).json({ success: false, message: 'Post not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create post
exports.createPost = async (req, res) => {
  try {
    const slug = req.body.slug || slugify(req.body.title || 'new-job', { lower: true, strict: true });
    const postData = {
      _id: String(Date.now()),
      slug,
      status: 'published',
      views: 0,
      isTrending: false,
      isFeatured: false,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ...req.body,
    };

    if (isDbConnected()) {
      const dbPost = await Post.create(postData);
      return res.status(201).json({ success: true, data: dbPost });
    }

    // Fallback mutations
    fallbackPosts.unshift(postData);
    const fallbackPath = path.join(__dirname, '../data/postsFallback.json');
    fs.writeFileSync(fallbackPath, JSON.stringify(fallbackPosts, null, 2));

    res.status(201).json({ success: true, data: postData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const updated = await Post.findByIdAndUpdate(id, req.body, { new: true });
      if (updated) return res.json({ success: true, data: updated });
    }

    const idx = fallbackPosts.findIndex((p) => p._id === id || p.slug === id);
    if (idx !== -1) {
      fallbackPosts[idx] = { ...fallbackPosts[idx], ...req.body, updatedAt: new Date().toISOString() };
      const fallbackPath = path.join(__dirname, '../data/postsFallback.json');
      fs.writeFileSync(fallbackPath, JSON.stringify(fallbackPosts, null, 2));
      return res.json({ success: true, data: fallbackPosts[idx] });
    }

    res.status(404).json({ success: false, message: 'Post not found to update' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      await Post.findByIdAndDelete(id);
    }

    fallbackPosts = fallbackPosts.filter((p) => p._id !== id && p.slug !== id);
    const fallbackPath = path.join(__dirname, '../data/postsFallback.json');
    fs.writeFileSync(fallbackPath, JSON.stringify(fallbackPosts, null, 2));

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
