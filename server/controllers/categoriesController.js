const Category = require('../models/Category');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const isDbConnected = () => mongoose.connection.readyState === 1;

let fallbackCategories = [
  { _id: 'cat-1', slug: 'latest-jobs', name: 'Latest Jobs', description: 'Government job vacancies & recruitment notifications', icon: 'briefcase', order: 1, isBuiltIn: true },
  { _id: 'cat-2', slug: 'result', name: 'Result', description: 'Exam results, merit lists & cut off marks', icon: 'trophy', order: 2, isBuiltIn: true },
  { _id: 'cat-3', slug: 'admit-card', name: 'Admit Card', description: 'Exam hall tickets & city intimation details', icon: 'id-card', order: 3, isBuiltIn: true },
  { _id: 'cat-4', slug: 'syllabus', name: 'Syllabus', description: 'Detailed exam syllabus & pattern PDFs', icon: 'book', order: 4, isBuiltIn: true },
  { _id: 'cat-5', slug: 'answer-key', name: 'Answer Key', description: 'Official answer keys & objection links', icon: 'key', order: 5, isBuiltIn: true },
  { _id: 'cat-6', slug: 'admission', name: 'Admission', description: 'University, college & entrance exam admissions', icon: 'graduation-cap', order: 6, isBuiltIn: true },
];

function loadFallbackCategories() {
  try {
    const file = path.join(__dirname, '../data/categoriesFallback.json');
    if (fs.existsSync(file)) {
      const stored = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(stored) && stored.length > 0) {
        fallbackCategories = stored;
      }
    } else {
      fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(fallbackCategories, null, 2));
    }
  } catch (err) {
    console.error('Error loading categoriesFallback.json:', err.message);
  }
}

loadFallbackCategories();

function saveFallbackCategories() {
  try {
    const file = path.join(__dirname, '../data/categoriesFallback.json');
    fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(fallbackCategories, null, 2));
  } catch (err) {
    console.error('Error saving categoriesFallback.json:', err.message);
  }
}

// @desc    Get all categories
// @route   GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    if (isDbConnected()) {
      const categories = await Category.find().sort('order');
      if (categories.length > 0) {
        return res.json({ success: true, data: categories });
      }
    }

    res.json({ success: true, data: fallbackCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new category
// @route   POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const slug = req.body.slug || slugify(name, { lower: true, strict: true });

    // Check duplicate
    const exists = fallbackCategories.some((c) => c.slug === slug || c.name.toLowerCase() === name.trim().toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const newCategory = {
      _id: `cat-${Date.now()}`,
      slug,
      name: name.trim(),
      description: description ? description.trim() : `Notifications for ${name.trim()}`,
      icon: icon || 'folder',
      order: fallbackCategories.length + 1,
      isBuiltIn: false,
      createdAt: new Date().toISOString(),
    };

    if (isDbConnected()) {
      const dbCat = await Category.create(newCategory);
      return res.status(201).json({ success: true, data: dbCat });
    }

    fallbackCategories.push(newCategory);
    saveFallbackCategories();

    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete custom category
// @route   DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      await Category.findByIdAndDelete(id);
    }

    fallbackCategories = fallbackCategories.filter((c) => c._id !== id && c.slug !== id);
    saveFallbackCategories();

    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
