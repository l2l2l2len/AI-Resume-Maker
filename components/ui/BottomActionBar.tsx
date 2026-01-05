import React from 'react';

// Icons
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export interface ActionButton {
  id: string;
  label: string;
  icon: 'plus' | 'preview' | 'save' | 'download' | React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface BottomActionBarProps {
  actions: ActionButton[];
  visible?: boolean;
}

const getIcon = (icon: ActionButton['icon']) => {
  if (typeof icon !== 'string') return icon;

  switch (icon) {
    case 'plus':
      return <PlusIcon />;
    case 'preview':
      return <EyeIcon />;
    case 'save':
      return <SaveIcon />;
    case 'download':
      return <DownloadIcon />;
    default:
      return null;
  }
};

const SpinnerIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  actions,
  visible = true,
}) => {
  if (!visible || actions.length === 0) return null;

  const getButtonClasses = (variant: ActionButton['variant'] = 'secondary') => {
    const baseClasses = `
      flex items-center justify-center gap-2 px-4 py-3 min-h-[48px]
      rounded-xl font-medium text-base transition-all
      touch-action-manipulation active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/25`;
      case 'ghost':
        return `${baseClasses} bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200`;
      case 'secondary':
      default:
        return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100`;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Gradient fade */}
      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Action bar */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-area-bottom">
        <div className="container mx-auto px-4 py-3">
          <div className={`grid gap-3 ${actions.length === 1 ? 'grid-cols-1' : actions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
                className={getButtonClasses(action.variant)}
              >
                {action.loading ? (
                  <SpinnerIcon />
                ) : (
                  getIcon(action.icon)
                )}
                <span className={actions.length > 2 ? 'hidden xs:inline' : ''}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomActionBar;
