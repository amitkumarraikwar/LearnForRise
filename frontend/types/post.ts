// Post types matching the MongoDB schema
export interface ImportantDate {
  label: string;
  date: string; // ISO date string from API
}

export interface ImportantLink {
  label: string;
  url: string;
}

export type PostCategory =
  | 'latest-jobs'
  | 'result'
  | 'admit-card'
  | 'syllabus'
  | 'answer-key'
  | 'admission';

export type PostStatus = 'draft' | 'published';

export interface Post {
  _id: string;
  title: string;
  slug: string;
  category: PostCategory | string;
  department?: string;
  state?: string;
  qualification?: string;
  shortDescription?: string;
  fullDescription?: string;
  importantDates: ImportantDate[];
  importantLinks: ImportantLink[];
  eligibility?: string;
  ageLimit?: string;
  applicationFee?: string;
  totalPosts?: string;
  status: PostStatus;
  isFeatured: boolean;
  isTrending: boolean;
  views: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PostsResponse {
  success: boolean;
  data: Post[];
  pagination: Pagination;
}

export interface SinglePostResponse {
  success: boolean;
  data: Post;
}

export interface TrendingResponse {
  success: boolean;
  data: Post[];
}

export interface CategoryPostsResponse {
  success: boolean;
  data: { category: PostCategory; posts: Post[] }[];
}

export interface SearchResponse {
  success: boolean;
  data: Post[];
  query: string;
  pagination: Pagination;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

// Category display info for UI
export interface CategoryInfo {
  slug: PostCategory;
  name: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  color: string; // Tailwind class
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: 'latest-jobs', name: 'Latest Jobs', description: 'Government job vacancies', icon: 'briefcase', color: 'text-primary' },
  { slug: 'result', name: 'Result', description: 'Exam results & merit lists', icon: 'trophy', color: 'text-success' },
  { slug: 'admit-card', name: 'Admit Card', description: 'Admit card downloads', icon: 'id-card', color: 'text-secondary' },
  { slug: 'syllabus', name: 'Syllabus', description: 'Exam syllabus & patterns', icon: 'book', color: 'text-blue-500' },
  { slug: 'answer-key', name: 'Answer Key', description: 'Official answer keys', icon: 'key', color: 'text-purple-500' },
  { slug: 'admission', name: 'Admission', description: 'College admissions', icon: 'graduation-cap', color: 'text-pink-500' },
];
