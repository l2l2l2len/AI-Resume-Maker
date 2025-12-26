import React from 'react';
import { BackIcon, NewFileIcon } from './icons';

interface HeaderProps {
  onHomeClick?: () => void;
  onResetResume?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onResetResume }) => {
  const TitleContent = () => (
    <div className="flex items-center space-x-3">
      {/* 3D Logo with gradient */}
      <div
        className="relative w-10 h-10 rounded-xl flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <svg
          className="w-5 h-5 text-white"
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
      </div>
      <h1
        className="text-xl font-bold"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Resume Maker
      </h1>
    </div>
  );

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'rgba(15, 15, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          {onHomeClick && (
            <button
              onClick={onHomeClick}
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10"
              style={{
                background: 'rgba(255,255,255,0.05)',
              }}
              aria-label="Back to Homepage"
            >
              <BackIcon />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Home</span>
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
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500/20"
              style={{
                background: 'rgba(255,255,255,0.05)',
              }}
              aria-label="Start New Resume"
            >
              <NewFileIcon />
              <span className="text-sm font-medium text-slate-300 group-hover:text-red-400">Start New</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
