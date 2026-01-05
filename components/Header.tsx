import React, { useState, useEffect } from 'react';
import { BackIcon, NewFileIcon } from './icons';

interface HeaderProps {
  onHomeClick?: () => void;
  onResetResume?: () => void;
}

// Hamburger menu icon
const MenuIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <div className="w-6 h-5 relative flex flex-col justify-center items-center">
    <span
      className={`w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300 absolute ${
        isOpen ? 'rotate-45 top-2' : 'top-0'
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300 absolute ${
        isOpen ? '-rotate-45 top-2' : 'top-4'
      }`}
    />
  </div>
);

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onResetResume }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleHomeClick = () => {
    setIsMenuOpen(false);
    onHomeClick?.();
  };

  const handleResetClick = () => {
    setIsMenuOpen(false);
    onResetResume?.();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side - Home button (desktop) */}
          <div className="flex-1 flex justify-start">
            {onHomeClick && (
              <button
                onClick={onHomeClick}
                className="hidden md:flex items-center gap-2 px-3 py-2 min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back to Homepage"
              >
                <BackIcon />
                <span className="text-base font-medium">Home</span>
              </button>
            )}

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">AI Resume</span>
            </div>
          </div>

          {/* Right side - Reset button (desktop) */}
          <div className="flex-1 flex justify-end">
            {onResetResume && (
              <button
                onClick={onResetResume}
                className="hidden md:flex items-center gap-2 px-3 py-2 min-h-[44px] text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Start New Resume"
              >
                <NewFileIcon />
                <span className="text-base font-medium">New</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-[61px] left-0 right-0 bg-white z-50 md:hidden
          border-b border-gray-200 shadow-lg
          transform transition-all duration-300 ease-out
          ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {onHomeClick && (
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-3 w-full px-4 py-3 min-h-[48px] text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-base font-medium"
            >
              <BackIcon />
              <span>Back to Home</span>
            </button>
          )}
          {onResetResume && (
            <button
              onClick={handleResetClick}
              className="flex items-center gap-3 w-full px-4 py-3 min-h-[48px] text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-base font-medium"
            >
              <NewFileIcon />
              <span>Start New Resume</span>
            </button>
          )}
        </nav>
      </div>
    </>
  );
};
