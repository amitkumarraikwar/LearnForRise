'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories, createCategory, deleteCategory } from '@/lib/api';
import { Category } from '@/types/post';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('briefcase');

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      if (res.success && res.data) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }

    setCreating(true);
    try {
      const res = await createCategory({
        name: name.trim(),
        description: description.trim(),
        icon,
      });

      if (res.success) {
        alert(`Category "${name}" created successfully!`);
        setName('');
        setDescription('');
        setShowModal(false);
        fetchCategoryData();
      } else {
        alert(res.message || 'Failed to create category.');
      }
    } catch (err: any) {
      alert('Error creating category: ' + (err?.message || 'Unknown error'));
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCategory = async (id: string, catName: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${catName}"?`)) return;

    setDeletingId(id);
    try {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(res.message || 'Failed to delete category');
      }
    } catch (err) {
      alert('Failed to delete category');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-main)]">
            Category Management
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            View, create, and manage portal taxonomies & category routes
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0F9D6E] text-white text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span>+ Add New Category</span>
        </button>
      </div>

      {/* Modal for Creating Category */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <h2 className="font-heading font-bold text-xl text-[var(--text-main)]">
                Create New Category
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Scholarship / Answer Sheet / Scholarship 2026"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of what notifications belong in this category..."
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Category Icon Identifier
                </label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
                >
                  <option value="briefcase">Briefcase (Jobs)</option>
                  <option value="trophy">Trophy (Result)</option>
                  <option value="id-card">ID Card (Admit Card)</option>
                  <option value="book">Book (Syllabus)</option>
                  <option value="key">Key (Answer Key)</option>
                  <option value="graduation-cap">Graduation Cap (Admission)</option>
                  <option value="award">Award (Scholarship / Merit)</option>
                  <option value="folder">Folder (General)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2.5 rounded-xl bg-[#0F9D6E] text-white text-xs font-semibold shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid of categories */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[var(--text-muted)]">
          Loading categories...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id || cat.slug}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    /{cat.slug}
                  </span>
                  {(cat as any).isBuiltIn ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      Built-in
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDeleteCategory(cat._id, cat.name)}
                      disabled={deletingId === cat._id}
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                    >
                      {deletingId === cat._id ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                </div>
                <h2 className="font-heading font-bold text-xl text-[var(--text-main)] pt-1">
                  {cat.name}
                </h2>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {cat.description || `Notifications for ${cat.name}`}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                <Link
                  href={`/admin/posts?category=${cat.slug}`}
                  className="text-xs font-bold text-[#0F9D6E] hover:underline"
                >
                  Manage Notifications →
                </Link>

                <Link
                  href={`/${cat.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  View Public Category ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
