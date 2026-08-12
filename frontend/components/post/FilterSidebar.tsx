'use client';

import React from 'react';

interface FilterSidebarProps {
  selectedState: string;
  setSelectedState: (val: string) => void;
  selectedQualification: string;
  setSelectedQualification: (val: string) => void;
  onReset: () => void;
  className?: string;
}

const STATES = [
  'All India',
  'Uttar Pradesh',
  'Bihar',
  'Delhi',
  'Rajasthan',
  'Madhya Pradesh',
  'Maharashtra',
  'Haryana',
  'Punjab',
];

const QUALIFICATIONS = [
  'All Qualifications',
  '10th Pass',
  '12th Pass',
  'Graduate',
  'Post Graduate',
  'Engineering / B.Tech',
  'Medical / Nursing',
  'Diploma / ITI',
];

export function FilterSidebar({
  selectedState,
  setSelectedState,
  selectedQualification,
  setSelectedQualification,
  onReset,
  className,
}: FilterSidebarProps) {
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm space-y-6 ${
        className || ''
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-base text-[var(--text-main)]">
          Filter Posts
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-[#0F9D6E] dark:text-[#10B981] hover:underline font-medium"
        >
          Reset All
        </button>
      </div>

      {/* State Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
          State / Region
        </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2 focus:outline-none focus:border-[#0F9D6E]"
        >
          <option value="">All States / Regions</option>
          {STATES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Qualification Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
          Qualification
        </label>
        <select
          value={selectedQualification}
          onChange={(e) => setSelectedQualification(e.target.value)}
          className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] rounded-xl px-3 py-2 focus:outline-none focus:border-[#0F9D6E]"
        >
          <option value="">All Qualifications</option>
          {QUALIFICATIONS.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
