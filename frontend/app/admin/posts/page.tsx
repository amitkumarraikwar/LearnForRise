'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, deletePost } from '@/lib/api';
import { Post, CATEGORIES, PostCategory } from '@/types/post';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getPosts({
        category: (selectedCat as PostCategory) || undefined,
        page,
        limit: 15,
      });
      if (res.success) {
        setPosts(res.data);
        setTotalPages(res.pagination.pages);
      }
    } catch (err) {
      console.error('Failed to fetch posts for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCat, page]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await deletePost(id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert('Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-main)]">
            Manage Notifications
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Search, edit, delete, or create government job notifications
          </p>
        </div>

        <Link
          href="/admin/posts/create"
          className="px-4 py-2.5 rounded-xl bg-[#0F9D6E] text-white text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          + Add New Job / Result
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full sm:max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#0F9D6E]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => {
              setSelectedCat('');
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCat === ''
                ? 'bg-[#0F9D6E] text-white'
                : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelectedCat(cat.slug);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === cat.slug
                  ? 'bg-[#0F9D6E] text-white'
                  : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-main)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-[var(--text-muted)]">
            Loading notifications...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-xs text-[var(--text-muted)] space-y-3">
            <p>No notifications found matching your criteria.</p>
            <Link
              href="/admin/posts/create"
              className="text-xs font-semibold text-[#0F9D6E] underline block"
            >
              Create First Notification
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-3">Title</th>
                  <th className="py-3.5 px-3">Category</th>
                  <th className="py-3.5 px-3">Qualification</th>
                  <th className="py-3.5 px-3">Total Posts</th>
                  <th className="py-3.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-main)]">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                    <td className="py-4 px-3 font-semibold max-w-sm">
                      <div className="line-clamp-2">{post.title}</div>
                      <div className="text-[10px] text-[var(--text-muted)] font-normal mt-0.5">
                        Slug: {post.slug}
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] uppercase">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-[var(--text-muted)] max-w-xs truncate">
                      {post.qualification || 'As per rules'}
                    </td>
                    <td className="py-4 px-3 font-medium">
                      {post.totalPosts || 'Various'}
                    </td>
                    <td className="py-4 px-3 text-right space-x-3">
                      <Link
                        href={`/admin/posts/edit/${post._id}`}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 font-semibold transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        disabled={deletingId === post._id}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 font-semibold transition-colors disabled:opacity-50"
                      >
                        {deletingId === post._id ? 'Deleting...' : 'Delete'}
                      </button>
                      <Link
                        href={`/${post.category}/${post.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-main)] font-semibold"
                      >
                        View ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
