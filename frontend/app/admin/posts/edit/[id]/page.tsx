'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPostById, updatePost, getCategories } from '@/lib/api';
import { CATEGORIES, PostCategory, ImportantDate, ImportantLink } from '@/types/post';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categoryList, setCategoryList] = useState<{ slug: string; name: string }[]>(
    CATEGORIES.map((c) => ({ slug: c.slug, name: c.name }))
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await getCategories();
        if (res.success && res.data && res.data.length > 0) {
          setCategoryList(res.data.map((c: any) => ({ slug: c.slug, name: c.name })));
        }
      } catch (err) {}
    }
    loadCategories();
  }, []);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('latest-jobs');
  const [department, setDepartment] = useState('');
  const [state, setState] = useState('All India');
  const [qualification, setQualification] = useState('');
  const [totalPosts, setTotalPosts] = useState('');
  const [ageLimit, setAgeLimit] = useState('');
  const [applicationFee, setApplicationFee] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);
  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([]);

  useEffect(() => {
    if (!id) return;
    async function loadPostData() {
      setLoading(true);
      try {
        const res = await getPostById(id);
        if (res.success && res.data) {
          const p = res.data;
          setTitle(p.title || '');
          setCategory(p.category || 'latest-jobs');
          setDepartment(p.department || '');
          setState(p.state || 'All India');
          setQualification(p.qualification || '');
          setTotalPosts(p.totalPosts || '');
          setAgeLimit(p.ageLimit || '');
          setApplicationFee(p.applicationFee || '');
          setShortDescription(p.shortDescription || '');
          setFullDescription(p.fullDescription || '');
          setImportantDates(p.importantDates || []);
          setImportantLinks(p.importantLinks || []);
        }
      } catch (err) {
        console.error('Failed to load post for edit:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPostData();
  }, [id]);

  const addDateRow = () => {
    setImportantDates([...importantDates, { label: 'Exam Date', date: new Date().toISOString().split('T')[0] }]);
  };

  const removeDateRow = (index: number) => {
    setImportantDates(importantDates.filter((_, i) => i !== index));
  };

  const updateDateRow = (index: number, field: 'label' | 'date', val: string) => {
    const updated = [...importantDates];
    updated[index][field] = val;
    setImportantDates(updated);
  };

  const addLinkRow = () => {
    setImportantLinks([...importantLinks, { label: 'Download Admit Card', url: 'https://learnforrise.com' }]);
  };

  const removeLinkRow = (index: number) => {
    setImportantLinks(importantLinks.filter((_, i) => i !== index));
  };

  const updateLinkRow = (index: number, field: 'label' | 'url', val: string) => {
    const updated = [...importantLinks];
    updated[index][field] = val;
    setImportantLinks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a job title');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        category,
        department: department.trim(),
        state: state.trim(),
        qualification: qualification.trim(),
        totalPosts: totalPosts.trim(),
        ageLimit: ageLimit.trim(),
        applicationFee: applicationFee.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        importantDates,
        importantLinks,
      };

      const res = await updatePost(id, payload);
      if (res.success) {
        alert('Notification updated successfully!');
        router.push('/admin/posts');
      } else {
        alert('Failed to update notification.');
      }
    } catch (err: any) {
      alert('Error updating notification: ' + (err?.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-xs text-[var(--text-muted)]">
        Loading post data for edit...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-main)]">
            Edit Notification
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Update title, dates, links, qualification, or full HTML description
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)]"
        >
          ← Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)] border-b border-[var(--border-color)] pb-3">
            1. Basic Job Information
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Notification Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              >
                {categoryList.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Department / Board
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                State / Region
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Qualification
              </label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Total Vacancies
              </label>
              <input
                type="text"
                value={totalPosts}
                onChange={(e) => setTotalPosts(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Age Limit
              </label>
              <input
                type="text"
                value={ageLimit}
                onChange={(e) => setAgeLimit(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Application Fee
            </label>
            <input
              type="text"
              value={applicationFee}
              onChange={(e) => setApplicationFee(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
            />
          </div>
        </div>

        {/* Dynamic Important Dates Builder */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">
              2. Important Dates
            </h2>
            <button
              type="button"
              onClick={addDateRow}
              className="text-xs font-semibold text-[#0F9D6E] hover:underline"
            >
              + Add Date Field
            </button>
          </div>

          <div className="space-y-3">
            {importantDates.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateDateRow(idx, 'label', e.target.value)}
                  placeholder="Date Label"
                  className="flex-1 bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                <input
                  type="date"
                  value={typeof item.date === 'string' ? item.date.split('T')[0] : ''}
                  onChange={(e) => updateDateRow(idx, 'date', e.target.value)}
                  className="bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                <button
                  type="button"
                  onClick={() => removeDateRow(idx)}
                  className="p-2 text-xs text-red-500 hover:bg-red-500/10 rounded-xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Important Links Builder */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">
              3. Important Official Links
            </h2>
            <button
              type="button"
              onClick={addLinkRow}
              className="text-xs font-semibold text-[#0F9D6E] hover:underline"
            >
              + Add Official Link
            </button>
          </div>

          <div className="space-y-3">
            {importantLinks.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateLinkRow(idx, 'label', e.target.value)}
                  placeholder="Link Label"
                  className="w-1/3 bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => updateLinkRow(idx, 'url', e.target.value)}
                  placeholder="Official URL"
                  className="flex-1 bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                <button
                  type="button"
                  onClick={() => removeLinkRow(idx)}
                  className="p-2 text-xs text-red-500 hover:bg-red-500/10 rounded-xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* HTML Body */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)] border-b border-[var(--border-color)] pb-3">
            4. Job Description & HTML Body
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Short Overview Snippet
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Full HTML Overview Body
            </label>
            <textarea
              rows={10}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] font-mono rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs sm:text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-[#0F9D6E] text-white text-xs sm:text-sm font-semibold shadow-md hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
