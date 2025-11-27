import React from 'react';
import { BackIcon, NewFileIcon } from './icons';

interface HeaderProps {
  onHomeClick?: () => void;
  onResetResume?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onResetResume }) => {
  const TitleContent = () => (
    <div className="flex items-center space-x-3">
       <svg
        className="w-8 h-8 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h1 className="text-2xl font-bold gradient-text">
        AI Resume Maker
      </h1>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          {onHomeClick && (
            <button
              onClick={onHomeClick}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Back to Homepage"
            >
              <BackIcon />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}
        </div>
        
        <div className="flex-1 flex justify-center">
           <TitleContent />
        </div>

        <div className="flex-1 flex justify-end">
          {onResetResume && (
            <button
              onClick={onResetResume}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Start New Resume"
            >
              <NewFileIcon />
              <span className="hidden sm:inline">Start New</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
