import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer & Legal Notice — LearnForRise',
  description: 'Mandatory government disclaimer, educational purpose notice, and legal terms for LearnForRise.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-color)] pb-6">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-main)]">
          Disclaimer & Legal Notice
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Important Notice for All Aspirants and Portal Visitors
        </p>
      </div>

      <div className="space-y-6 text-sm text-[var(--text-main)] leading-relaxed">
        {/* Prominent Alert Box */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-3 shadow-sm">
          <h2 className="font-heading font-bold text-xl">
            Mandatory Non-Government Disclaimer
          </h2>
          <p className="font-medium text-xs sm:text-sm leading-relaxed">
            This website (<strong className="underline">learnforrise.com</strong>) is <strong>NOT an official government website</strong> and is not associated, affiliated, authorized, endorsed by, or in any way officially connected with the Government of India, any State Government, Union Territory administration, or any government department/commission (such as UPSC, SSC, RRB, NTA, or BPSC).
          </p>
        </div>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">1. Educational & Informational Purpose Only</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            All notifications, job vacancies, result lists, admit card updates, syllabus outlines, and exam schedules published on LearnForRise are strictly for general information and educational convenience of job aspirants.
          </p>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">2. Mandatory Cross-Verification</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            While the LearnForRise team makes every effort to ensure the accuracy, completeness, and timeliness of all information, errors or inadvertent delays can occasionally occur.
          </p>
          <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] font-medium">
            <strong>Action Required:</strong> All candidates must cross-verify eligibility criteria, fee amounts, and last dates on official government portals (e.g. upsc.gov.in, ssc.gov.in, rrbapply.gov.in) before submitting online applications or paying examination fees.
          </div>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">3. Limitation of Liability</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            LearnForRise disclaims any liability for any loss, damage, expense, or inconvenience caused to any candidate resulting from reliance on information provided on this platform. In the event of any discrepancies between information on this website and official gazette notifications, the official government publication shall prevail.
          </p>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">4. Trademark & Content Integrity</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            All brand names, logos, official seals, and exam names mentioned on this site are trademarks or registered trademarks of their respective government authorities and institutions. Their usage on LearnForRise does not imply any ownership or official endorsement.
          </p>
        </section>

        <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-lg text-[var(--text-main)]">5. Contact for Corrections</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            If you notice any inaccuracy, missing detail, or dead official link in any post, please notify us immediately via our <a href="/contact" className="text-[#0F9D6E] underline">Contact Us page</a> so we can update the notification promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
