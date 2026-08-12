'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, getCategories } from '@/lib/api';
import { CATEGORIES, PostCategory, ImportantDate, ImportantLink, Post } from '@/types/post';

export default function CreateJobPage() {
  const router = useRouter();
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
  const [ageLimit, setAgeLimit] = useState('18 - 35 Years');
  const [applicationFee, setApplicationFee] = useState('General / OBC: ₹100, SC / ST / PH: ₹0');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  // Dynamic Array Builders
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([
    { label: 'Application Start', date: new Date().toISOString().split('T')[0] },
    { label: 'Last Date to Apply', date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] },
  ]);

  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([
    { label: 'Apply Online', url: 'https://learnforrise.com' },
    { label: 'Official Notification', url: 'https://learnforrise.com' },
    { label: 'Official Website', url: 'https://learnforrise.com' },
  ]);

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
      const payload: Partial<Post> = {
        title: title.trim(),
        category,
        department: department.trim() || 'Government Department',
        state: state.trim() || 'All India',
        qualification: qualification.trim() || 'As per official notification',
        totalPosts: totalPosts.trim() || 'Various',
        ageLimit: ageLimit.trim(),
        applicationFee: applicationFee.trim(),
        shortDescription: shortDescription.trim() || title.trim(),
        fullDescription: fullDescription.trim() || `<h2>${title}</h2><p>Official notification and updates for ${title}.</p>`,
        importantDates,
        importantLinks,
        status: 'published',
      };

      const res = await createPost(payload);
      if (res.success) {
        alert('Notification created successfully!');
        router.push('/admin/posts');
      } else {
        alert('Failed to create notification.');
      }
    } catch (err: any) {
      alert('Error creating notification: ' + (err?.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-main)]">
            Create Job / Notification
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Fill in the job details, fee structure, dates, and official links
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
              placeholder="e.g. UPSC Civil Services Examination 2026 Online Form"
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
                onChange={(e) => setCategory(e.target.value)}
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
                placeholder="e.g. UPSC, SSC, Railway, BPSC"
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
                placeholder="e.g. All India, UP, Bihar, Delhi"
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
                placeholder="e.g. 10th Pass / Graduate / Engineering"
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
                placeholder="e.g. 1,050 Posts"
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
                placeholder="e.g. 18 - 32 Years"
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
              placeholder="e.g. General/OBC: ₹100, SC/ST: ₹0"
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
                  placeholder="Date Title (e.g. Last Date to Apply)"
                  className="flex-1 bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                <input
                  type="date"
                  value={typeof item.date === 'string' ? item.date.split('T')[0] : ''}
                  onChange={(e) => updateDateRow(idx, 'date', e.target.value)}
                  className="bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                {importantDates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDateRow(idx)}
                    className="p-2 text-xs text-red-500 hover:bg-red-500/10 rounded-xl"
                  >
                    ✕
                  </button>
                )}
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
                  placeholder="Link Label (e.g. Apply Online)"
                  className="w-1/3 bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => updateLinkRow(idx, 'url', e.target.value)}
                  placeholder="Official URL (e.g. https://upsssc.gov.in)"
                  className="flex-1 bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F9D6E]"
                />
                {importantLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLinkRow(idx)}
                    className="p-2 text-xs text-red-500 hover:bg-red-500/10 rounded-xl"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Descriptions & HTML Body */}
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
              placeholder="Brief summary sentence shown on job cards..."
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Full HTML Overview & Instructions Body
            </label>
            <textarea
              rows={8}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="<h2>Overview</h2><p>Full job overview, eligibility details, and application steps HTML...</p>"
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] font-mono rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E]"
            />
          </div>
        </div>

        {/* Submit Actions */}
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
            {submitting ? 'Publishing...' : 'Publish Job Notification'}
          </button>
        </div>
      </form>
    </div>
  );
}
