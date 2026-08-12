const mongoose = require('mongoose');
const slugify = require('slugify');

const importantDateSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

const importantLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'latest-jobs',
        'result',
        'admit-card',
        'syllabus',
        'answer-key',
        'admission',
      ],
      index: true,
    },
    department: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    qualification: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      maxlength: 500,
    },
    fullDescription: {
      type: String, // Rich text / HTML content
    },
    importantDates: [importantDateSchema],
    importantLinks: [importantLinkSchema],
    eligibility: {
      type: String,
    },
    ageLimit: {
      type: String,
    },
    applicationFee: {
      type: String,
    },
    totalPosts: {
      type: String, // e.g. "1500+ vacancies"
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Compound indexes for common queries
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ category: 1, status: 1, publishedAt: -1 });
postSchema.index({ isTrending: 1, status: 1 });

// Text index for search
postSchema.index(
  { title: 'text', department: 'text', shortDescription: 'text', tags: 'text' },
  { weights: { title: 10, department: 5, tags: 3, shortDescription: 1 } }
);

// Auto-generate slug from title before saving
postSchema.pre('save', async function (next) {
  if (this.isModified('title') || !this.slug) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await mongoose.models.Post.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }

  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

module.exports = mongoose.model('Post', postSchema);
