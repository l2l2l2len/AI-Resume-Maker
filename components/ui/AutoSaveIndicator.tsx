import React, { useState, useEffect } from 'react';

interface AutoSaveIndicatorProps {
  isSaving?: boolean;
  lastSaved?: Date | null;
}

const CloudIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isSaving = false,
  lastSaved = null
}) => {
  const [showSaved, setShowSaved] = useState(false);
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    if (lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000);

      if (seconds < 5) {
        setTimeAgo('just now');
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        setTimeAgo(`${Math.floor(seconds / 60)}m ago`);
      } else {
        setTimeAgo(`${Math.floor(seconds / 3600)}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000);
    return () => clearInterval(interval);
  }, [lastSaved]);

  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
        transition-all duration-300
        ${isSaving
          ? 'bg-blue-500/20 text-blue-300'
          : showSaved
            ? 'bg-green-500/20 text-green-300'
            : 'bg-white/10 text-white/60'
        }
      `}
    >
      {isSaving ? (
        <>
          <SpinnerIcon />
          <span>Saving...</span>
        </>
      ) : showSaved ? (
        <>
          <CheckIcon />
          <span>Saved</span>
        </>
      ) : lastSaved ? (
        <>
          <CloudIcon />
          <span>Saved {timeAgo}</span>
        </>
      ) : (
        <>
          <CloudIcon />
          <span>Auto-save enabled</span>
        </>
      )}
    </div>
  );
};

// Hook for auto-save functionality
export const useAutoSave = <T,>(
  data: T,
  saveKey: string,
  debounceMs: number = 500
): { isSaving: boolean; lastSaved: Date | null } => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    setIsSaving(true);

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(saveKey, JSON.stringify(data));
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [data, saveKey, debounceMs]);

  return { isSaving, lastSaved };
};
