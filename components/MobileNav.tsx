import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Navigation Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const TemplatesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const ResumesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Hamburger menu icon with animation
const MenuIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <div className="w-6 h-5 relative flex flex-col justify-center items-center">
    <span
      className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 absolute ${
        isOpen ? 'rotate-45 top-2' : 'top-0'
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 absolute ${
        isOpen ? '-rotate-45 top-2' : 'top-4'
      }`}
    />
  </div>
);

export type NavPage = 'dashboard' | 'templates' | 'my-resumes' | 'settings' | 'homepage';

interface MobileNavProps {
  currentPage?: NavPage;
  onNavigate: (page: NavPage) => void;
  onCreateNew?: () => void;
  showCreateButton?: boolean;
}

interface NavItem {
  id: NavPage;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  onCreateNew,
  showCreateButton = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'templates', label: 'Templates', icon: <TemplatesIcon /> },
    { id: 'my-resumes', label: 'My Resumes', icon: <ResumesIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

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

  const handleNavClick = (page: NavPage) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  const handleCreateNew = () => {
    setIsMenuOpen(false);
    onCreateNew?.();
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 glass">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side - Hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-action-manipulation"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>

          {/* Center - Logo */}
          <button
            onClick={() => handleNavClick('homepage')}
            className="flex items-center gap-2 touch-action-manipulation"
          >
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
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
          </button>

          {/* Right side - Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-action-manipulation"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel - Slide from left */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw]
          bg-white z-50 shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Menu Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Welcome!</p>
              <p className="text-sm text-gray-500">Build your perfect resume</p>
            </div>
          </div>
        </div>

        {/* Create New Button */}
        {showCreateButton && onCreateNew && (
          <div className="p-4">
            <button
              onClick={handleCreateNew}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors touch-action-manipulation"
            >
              <PlusIcon />
              Create New Resume
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex items-center justify-between w-full px-4 py-3 min-h-[52px] rounded-xl
                  text-left font-medium transition-colors touch-action-manipulation
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRightIcon />
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-200" />

        {/* Theme Toggle in Menu */}
        <div className="p-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-4 py-3 min-h-[52px] rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-action-manipulation"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-500">
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </span>
              <span className="font-medium">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
            {/* Toggle Switch */}
            <div
              className={`w-11 h-6 rounded-full transition-colors relative ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Home Link */}
        <div className="p-2">
          <button
            onClick={() => handleNavClick('homepage')}
            className="flex items-center gap-3 w-full px-4 py-3 min-h-[52px] rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-action-manipulation"
          >
            <span className="text-gray-500"><HomeIcon /></span>
            <span className="font-medium">Back to Home</span>
          </button>
        </div>

        {/* Footer in menu */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            AI Resume Maker v1.0
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
