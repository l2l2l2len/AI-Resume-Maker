import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// Icons
const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

interface SettingsProps {
  onClearData: () => void;
  onNavigateToAbout: () => void;
  onNavigateToFAQ: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  description,
  onClick,
  rightElement,
  danger = false,
}) => (
  <button
    onClick={onClick}
    disabled={!onClick && !rightElement}
    className={`
      flex items-center justify-between w-full p-4 min-h-[60px] text-left
      transition-colors touch-action-manipulation
      ${onClick ? 'hover:bg-gray-50 active:bg-gray-100' : ''}
      ${danger ? 'text-red-600' : 'text-gray-900'}
    `}
  >
    <div className="flex items-center gap-3">
      <span className={danger ? 'text-red-500' : 'text-gray-500'}>{icon}</span>
      <div>
        <p className="font-medium">{label}</p>
        {description && (
          <p className={`text-sm ${danger ? 'text-red-400' : 'text-gray-500'}`}>
            {description}
          </p>
        )}
      </div>
    </div>
    {rightElement || (onClick && <ChevronRightIcon />)}
  </button>
);

export const Settings: React.FC<SettingsProps> = ({
  onClearData,
  onNavigateToAbout,
  onNavigateToFAQ,
  onNavigateToPrivacy,
  onNavigateToTerms,
}) => {
  const { theme, toggleTheme, setTheme } = useTheme();

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      onClearData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {/* Appearance */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Appearance
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingItem
              icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              label="Dark Mode"
              description={theme === 'dark' ? 'Currently using dark theme' : 'Currently using light theme'}
              rightElement={
                <button
                  onClick={toggleTheme}
                  className={`
                    w-14 h-8 rounded-full transition-colors relative
                    ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}
                  `}
                >
                  <div
                    className={`
                      absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform
                      ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}
                    `}
                  />
                </button>
              }
            />
          </div>
        </div>

        {/* Theme Quick Select */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Theme</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`
                flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <SunIcon />
              <span className="font-medium">Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`
                flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                ${theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <MoonIcon />
              <span className="font-medium">Dark</span>
            </button>
          </div>
        </div>

        {/* Data */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Data & Storage
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingItem
              icon={<TrashIcon />}
              label="Clear All Data"
              description="Delete all saved resumes and preferences"
              onClick={handleClearData}
              danger
            />
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              About
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingItem
              icon={<InfoIcon />}
              label="About AI Resume Maker"
              onClick={onNavigateToAbout}
            />
            <SettingItem
              icon={<QuestionIcon />}
              label="FAQ"
              onClick={onNavigateToFAQ}
            />
          </div>
        </div>

        {/* Legal */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Legal
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingItem
              icon={<ShieldIcon />}
              label="Privacy Policy"
              onClick={onNavigateToPrivacy}
            />
            <SettingItem
              icon={<DocumentIcon />}
              label="Terms of Service"
              onClick={onNavigateToTerms}
            />
          </div>
        </div>

        {/* App Info */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">AI Resume Maker</h3>
          <p className="text-sm text-gray-500">Version 1.0.0</p>
          <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
            Made with <HeartIcon /> for job seekers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
