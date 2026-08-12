import React from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contact Us — LearnForRise',
  description: 'Get in touch with the LearnForRise team for queries, feedback, or corrections.',
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[var(--text-main)] tracking-tight">
          Contact <span className="text-[#0F9D6E] dark:text-[#10B981]">Us</span>
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)]">
          Have a question, feedback, or noticed a typo in a job notification? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form (2 columns) */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-heading font-bold text-xl text-[var(--text-main)]">Send a Message</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">Fill out the form below and our team will get back to you within 24 hours.</p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E] transition-colors"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Subject
              </label>
              <input
                type="text"
                placeholder="Query topic (e.g. Correction request, General Inquiry)"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Message *
              </label>
              <textarea
                rows={5}
                placeholder="Write your message or detailed description here..."
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0F9D6E] transition-colors"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Submit Message
            </Button>
          </form>
        </div>

        {/* Channels Sidebar (1 column) */}
        <div className="space-y-6">
          {/* Direct Email Card */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-base text-[var(--text-main)]">
              Direct Support
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Email our support team for general inquiries or trademark details:
            </p>
            <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] font-mono text-xs text-[#0F9D6E] dark:text-[#10B981] font-semibold break-all">
              support@learnforrise.com
            </div>
          </div>

          {/* Social Channels */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-[var(--text-main)]">
              Official Channels
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Stay updated with instant job alerts via our official social handles:
            </p>
            <div className="space-y-2.5">
              <a
                href="https://www.instagram.com/learnforrise/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[#0F9D6E] transition-colors text-xs"
              >
                <span className="font-semibold text-[var(--text-main)]">Instagram</span>
                <span className="text-[var(--text-muted)]">@learnforrise →</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCN3yxHYTmoiVXJC3UxrlOqQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-red-500 transition-colors text-xs"
              >
                <span className="font-semibold text-[var(--text-main)]">YouTube</span>
                <span className="text-[var(--text-muted)]">LF Rise Channel →</span>
              </a>
              <a
                href="https://www.facebook.com/people/LF-Rise/61590147007558/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-blue-600 transition-colors text-xs"
              >
                <span className="font-semibold text-[var(--text-main)]">Facebook</span>
                <span className="text-[var(--text-muted)]">LF Rise Page →</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 shadow-sm space-y-6">
        <h2 className="font-heading font-bold text-2xl text-[var(--text-main)]">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-1.5 p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <h3 className="font-heading font-semibold text-sm text-[var(--text-main)]">How fast are job alerts updated?</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Notifications are indexed within minutes of official release by government bodies like UPSC, SSC, RRB, and State PSCs.
            </p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <h3 className="font-heading font-semibold text-sm text-[var(--text-main)]">Are all official links verified?</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Yes, our editorial team manually verifies all application links against official government portal domains (.gov.in, .nic.in).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
