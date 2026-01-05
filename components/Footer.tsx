import React from 'react';

export type FooterPage = 'about' | 'faq' | 'privacy' | 'terms';

interface FooterProps {
  onNavigate: (page: FooterPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">AI Resume Maker</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Free, professional resume builder. No sign-up required.
              Your data stays in your browser.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors min-h-[44px] flex items-center"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors min-h-[44px] flex items-center"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors min-h-[44px] flex items-center"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors min-h-[44px] flex items-center"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} AI Resume Maker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
