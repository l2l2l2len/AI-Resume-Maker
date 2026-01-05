import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
          <p className="text-base leading-relaxed">
            <strong>Last updated:</strong> January 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Your Privacy Matters</h2>
            <p className="text-base leading-relaxed">
              AI Resume Maker is designed with your privacy as a top priority. We believe your personal
              and professional information should remain entirely under your control.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Data Storage</h2>
            <p className="text-base leading-relaxed">
              <strong>All your data stays in your browser.</strong> We use your browser's local storage
              to save your resume information. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Your resume data is stored only on your device</li>
              <li>We do not upload, transmit, or store your information on any servers</li>
              <li>Your data persists between sessions in the same browser</li>
              <li>Clearing your browser data will remove your saved resume</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">No Account Required</h2>
            <p className="text-base leading-relaxed">
              We do not require you to create an account, provide an email address, or share any
              personal information to use this service. You can start building your resume immediately
              without any registration.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">No Tracking</h2>
            <p className="text-base leading-relaxed">
              We do not use cookies for tracking purposes. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Track your browsing activity</li>
              <li>Collect analytics about your usage</li>
              <li>Share data with third parties</li>
              <li>Use advertising trackers</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Third-Party Services</h2>
            <p className="text-base leading-relaxed">
              This application uses the following third-party resources that are loaded from external servers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li><strong>Google Fonts (Inter)</strong> - For typography styling</li>
              <li><strong>Tailwind CSS CDN</strong> - For styling framework</li>
              <li><strong>html2canvas & jsPDF</strong> - For PDF generation (runs entirely in your browser)</li>
            </ul>
            <p className="text-base leading-relaxed">
              These services may have their own privacy policies. The PDF generation happens entirely
              within your browser and no resume data is sent to external servers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Your Rights</h2>
            <p className="text-base leading-relaxed">
              Since all data is stored locally in your browser, you have complete control:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li><strong>Access:</strong> Your data is accessible only to you through this application</li>
              <li><strong>Deletion:</strong> Clear your browser's local storage or use the "New Resume" button to delete your data</li>
              <li><strong>Portability:</strong> Download your resume as a PDF at any time</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Changes to This Policy</h2>
            <p className="text-base leading-relaxed">
              If we make any changes to this privacy policy, we will update the "Last updated" date
              at the top of this page. Continued use of the service after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Contact</h2>
            <p className="text-base leading-relaxed">
              If you have questions about this privacy policy, you can reach out through our
              GitHub repository where this project is hosted.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
