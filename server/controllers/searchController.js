const Post = require('../models/Post');

// @desc    Search posts across all categories
// @route   GET /api/search?q=keyword
exports.searchPosts = async (req, res) => {
  try {
    const { q, category, page = 1, limit = 12 } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const filter = {
      status: 'published',
      $text: { $search: q },
    };

    if (category) filter.category = category;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      Post.find(filter, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limitNum)
        .select('-fullDescription'),
      Post.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: posts,
      query: q,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
