import React from 'react';
import { BackIcon, NewFileIcon } from './icons';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onHomeClick?: () => void;
  onResetResume?: () => void;
}

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onResetResume }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const TitleContent = () => (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* 3D Logo with gradient */}
      <div
        className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
        className="text-base sm:text-xl font-bold hidden xs:block"
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
      className="sticky top-0 z-50 border-b transition-colors duration-300"
      style={{
        background: isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 15, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)',
        background: 'rgba(15, 15, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        {/* Left side - Home button */}
        <div className="flex-1 flex justify-start">
          {onHomeClick && (
            <button
              onClick={onHomeClick}
              className={`group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 ${
                isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'
              }`}
              style={{
                background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10"
              style={{
                background: 'rgba(255,255,255,0.05)',
              }}
              aria-label="Back to Homepage"
            >
              <BackIcon />
              <span
                className={`text-xs sm:text-sm font-medium hidden sm:inline ${
                  isLight
                    ? 'text-slate-600 group-hover:text-slate-900'
                    : 'text-slate-300 group-hover:text-white'
                }`}
              >
                Home
              </span>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Home</span>
            </button>
          )}
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <TitleContent />
        </div>

        {/* Right side - Theme toggle + Reset button */}
        <div className="flex-1 flex justify-end items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 ${
              isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-slate-300'
            }`}
            style={{
              background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
            }}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Reset Resume Button */}
          {onResetResume && (
            <button
              onClick={onResetResume}
              className={`group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 ${
                isLight ? 'hover:bg-red-50' : 'hover:bg-red-500/20'
              }`}
              style={{
                background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500/20"
              style={{
                background: 'rgba(255,255,255,0.05)',
              }}
              aria-label="Start New Resume"
            >
              <NewFileIcon />
              <span
                className={`text-xs sm:text-sm font-medium hidden sm:inline ${
                  isLight
                    ? 'text-slate-600 group-hover:text-red-600'
                    : 'text-slate-300 group-hover:text-red-400'
                }`}
              >
                New
              </span>
              <span className="text-sm font-medium text-slate-300 group-hover:text-red-400">Start New</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
