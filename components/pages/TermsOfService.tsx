import React from 'react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 min-h-[44px] text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
          <p className="text-base leading-relaxed">
            <strong>Last updated:</strong> January 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Agreement to Terms</h2>
            <p className="text-base leading-relaxed">
              By accessing and using AI Resume Maker, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Description of Service</h2>
            <p className="text-base leading-relaxed">
              AI Resume Maker is a free, browser-based tool that allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Create professional resumes using various templates</li>
              <li>Customize and edit your resume content</li>
              <li>Download your resume as a PDF document</li>
              <li>Save your work locally in your browser</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Free Service</h2>
            <p className="text-base leading-relaxed">
              This service is provided completely free of charge. There are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>No hidden fees or charges</li>
              <li>No premium tiers or locked features</li>
              <li>No watermarks on your downloaded resumes</li>
              <li>No limits on the number of resumes you can create</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">User Responsibilities</h2>
            <p className="text-base leading-relaxed">
              When using this service, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Provide accurate information about yourself in your resume</li>
              <li>Not use the service for any unlawful purposes</li>
              <li>Not attempt to compromise the security or integrity of the application</li>
              <li>Understand that you are responsible for backing up your data</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Intellectual Property</h2>
            <p className="text-base leading-relaxed">
              <strong>Your Content:</strong> You retain all rights to the content you create using this
              service. Your resume content, including text and personal information, belongs entirely to you.
            </p>
            <p className="text-base leading-relaxed">
              <strong>Our Templates:</strong> The resume templates and application design are provided
              for your use within this service. You may use the templates to create and distribute
              your own resumes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Data and Storage</h2>
            <p className="text-base leading-relaxed">
              All data is stored locally in your browser using localStorage. Please note:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Data is specific to your browser and device</li>
              <li>Clearing browser data will delete your saved resume</li>
              <li>We recommend downloading your resume as PDF for backup</li>
              <li>We are not responsible for data loss due to browser clearing or device changes</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Disclaimer of Warranties</h2>
            <p className="text-base leading-relaxed">
              This service is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>That the service will be uninterrupted or error-free</li>
              <li>That resumes created will result in job offers or interviews</li>
              <li>Compatibility with all browsers or devices</li>
              <li>That the PDF output will be identical across all viewers</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
            <p className="text-base leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of
              this service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Changes to Terms</h2>
            <p className="text-base leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be indicated
              by updating the "Last updated" date. Your continued use of the service after
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Contact</h2>
            <p className="text-base leading-relaxed">
              For questions about these Terms of Service, please reach out through our
              GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
