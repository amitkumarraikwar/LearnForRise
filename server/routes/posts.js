const express = require('express');
const router = express.Router();
const {
  getPosts,
  getTrendingPosts,
  getPostsByCategory,
  getPostBySlug,
  getPostById,
  getRelatedPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController');

// Public routes
router.get('/', getPosts);
router.get('/trending', getTrendingPosts);
router.get('/by-category', getPostsByCategory);
router.get('/id/:id', getPostById);
router.get('/:slug', getPostBySlug);
router.get('/:slug/related', getRelatedPosts);

// Admin CRUD routes
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
