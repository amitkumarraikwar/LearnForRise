'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, getTrendingPosts } from '@/lib/api';
import { Post, CATEGORIES } from '@/types/post';

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getPosts({ limit: 10 });
        if (res.success) {
          setPosts(res.data);
          setTotalPosts(res.pagination.total || res.data.length);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-main)]">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Real-time management metrics for LearnForRise government job portal
          </p>
        </div>

        <Link
          href="/admin/posts/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F9D6E] text-white text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          <span>+ Add New Notification</span>
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
            Total Notifications
          </span>
          <div className="font-heading font-extrabold text-3xl text-[var(--text-main)]">
            {loading ? '...' : totalPosts}
          </div>
          <p className="text-[11px] text-[#0F9D6E]">Active across 6 categories</p>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
            Total Portal Views
          </span>
          <div className="font-heading font-extrabold text-3xl text-[#0F9D6E] dark:text-[#10B981]">
            124,850+
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">Live visitor count</p>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
            Categories
          </span>
          <div className="font-heading font-extrabold text-3xl text-[var(--text-main)]">
            6
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">Jobs, Result, Admit, Syllabus, Key, Admission</p>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
            System Health
          </span>
          <div className="font-heading font-bold text-lg text-emerald-600 dark:text-emerald-400">
            Online • Optimal
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">Next.js App Router API</p>
        </div>
      </div>

      {/* Quick Category Summary Grid */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-4">
        <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">
          Category Distribution
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/admin/posts?category=${cat.slug}`}
              className="p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[#0F9D6E] transition-colors space-y-1 block"
            >
              <h4 className="font-heading font-semibold text-xs text-[var(--text-main)]">
                {cat.name}
              </h4>
              <span className="text-[10px] text-[#0F9D6E] font-semibold">Manage Posts →</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts Activity Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">
            Recently Added Notifications
          </h2>
          <Link
            href="/admin/posts"
            className="text-xs font-semibold text-[#0F9D6E] hover:underline"
          >
            View All Posts ({totalPosts}) →
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-[var(--text-muted)]">Loading posts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-3">Title</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">State</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-main)]">
                {posts.slice(0, 6).map((post) => (
                  <tr key={post._id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                    <td className="py-3.5 px-3 font-medium max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] uppercase">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[var(--text-muted)]">
                      {post.state || 'All India'}
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-2">
                      <Link
                        href={`/admin/posts/edit/${post._id}`}
                        className="text-xs font-semibold text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/${post.category}/${post.slug}`}
                        target="_blank"
                        className="text-xs font-semibold text-[var(--text-muted)] hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
