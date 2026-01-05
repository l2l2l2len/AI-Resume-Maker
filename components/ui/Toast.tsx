import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast icons
const SuccessIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        container: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700',
        icon: 'text-green-500 dark:text-green-400',
        text: 'text-green-800 dark:text-green-200',
      };
    case 'error':
      return {
        container: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700',
        icon: 'text-red-500 dark:text-red-400',
        text: 'text-red-800 dark:text-red-200',
      };
    case 'warning':
      return {
        container: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700',
        icon: 'text-yellow-500 dark:text-yellow-400',
        text: 'text-yellow-800 dark:text-yellow-200',
      };
    case 'info':
    default:
      return {
        container: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
        icon: 'text-blue-500 dark:text-blue-400',
        text: 'text-blue-800 dark:text-blue-200',
      };
  }
};

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <SuccessIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
    default:
      return <InfoIcon />;
  }
};

// Individual Toast component
const ToastItem: React.FC<{
  toast: Toast;
  onClose: (id: string) => void;
}> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const styles = getToastStyles(toast.type);

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onClose(toast.id), 300);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(toast.id), 300);
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
        transform transition-all duration-300 ease-out
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        ${styles.container}
      `}
      role="alert"
    >
      <div className={`flex-shrink-0 ${styles.icon}`}>
        {getIcon(toast.type)}
      </div>
      <p className={`flex-1 text-sm font-medium ${styles.text}`}>
        {toast.message}
      </p>
      <button
        onClick={handleClose}
        className={`
          flex-shrink-0 p-1.5 min-w-[32px] min-h-[32px] rounded-lg
          transition-colors ${styles.text}
          hover:bg-black/5 dark:hover:bg-white/10
          touch-action-manipulation
        `}
        aria-label="Close notification"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Container - Fixed at top on mobile, top-right on desktop */}
      <div
        className="
          fixed z-[100] pointer-events-none
          inset-x-0 top-0 p-4
          md:inset-x-auto md:right-0 md:top-0 md:p-6
          flex flex-col gap-2 items-center md:items-end
        "
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
            <ToastItem toast={toast} onClose={hideToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
