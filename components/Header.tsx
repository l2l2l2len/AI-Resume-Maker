import React from 'react';
import { BackIcon, NewFileIcon } from './icons';

interface HeaderProps {
  onHomeClick?: () => void;
  onResetResume?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onResetResume }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Home button */}
        <div className="flex-1 flex justify-start">
          {onHomeClick && (
            <button
              onClick={onHomeClick}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Back to Homepage"
            >
              <BackIcon />
              <span className="text-sm font-medium hidden sm:inline">Home</span>
            </button>
          )}
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">
              AI Resume
            </span>
          </div>
        </div>

        {/* Right side - Reset button */}
        <div className="flex-1 flex justify-end items-center gap-2">
          {onResetResume && (
            <button
              onClick={onResetResume}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Start New Resume"
            >
              <NewFileIcon />
              <span className="text-sm font-medium hidden sm:inline">New</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
