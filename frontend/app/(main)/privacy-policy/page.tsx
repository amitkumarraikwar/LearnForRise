import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — LearnForRise',
  description: 'Privacy Policy and Data Protection standards for LearnForRise visitors and users.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-color)] pb-6">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-main)]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Last Updated: August 12, 2026 • Compliant with Indian IT Act 2000 & Data Security Standards
        </p>
      </div>

      <div className="space-y-6 text-sm text-[var(--text-main)] leading-relaxed">
        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">1. Introduction</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Welcome to <strong className="text-[var(--text-main)]">LearnForRise</strong> (learnforrise.com). We respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">2. Information Collection</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            LearnForRise does not require user registration or personal account creation to view government job updates, exam results, admit cards, or syllabus information.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[var(--text-muted)] pt-1">
            <li><strong className="text-[var(--text-main)]">Voluntary Data:</strong> Information submitted voluntarily via our contact form (Name, Email address).</li>
            <li><strong className="text-[var(--text-main)]">Log Data & Cookies:</strong> Standard web analytics such as IP address, browser type, device type, pages visited, and time spent to improve site performance.</li>
          </ul>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">3. Use of Information</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Any information collected is used strictly to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[var(--text-muted)] pt-1">
            <li>Provide, maintain, and optimize site speed and security.</li>
            <li>Respond to user inquiries or feedback submitted via contact forms.</li>
            <li>Monitor user traffic trends and prevent malicious attacks or spam.</li>
          </ul>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">4. Third-Party Links</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Our portal contains external hyperlinks to official government websites (e.g., upsc.gov.in, ssc.gov.in). LearnForRise is not responsible for the privacy practices, content, or security of these external third-party portals. We encourage users to read the privacy statements of every website they visit.
          </p>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">5. Cookies Policy</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            We use essential cookies to remember your theme preference (Light / Dark mode). You can choose to disable cookies through your individual browser options, though some site preferences may be reset.
          </p>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">6. Contact for Privacy Concerns</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            If you have any questions or privacy concerns regarding this policy, please reach out to us at <strong className="text-[var(--text-main)]">support@learnforrise.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
