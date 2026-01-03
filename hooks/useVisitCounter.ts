import { useState, useEffect } from 'react';

const VISIT_COUNT_KEY = 'visitCount';
const SESSION_VISITED_KEY = 'sessionVisited';

export const useVisitCounter = () => {
  const [visitCount, setVisitCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(VISIT_COUNT_KEY);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    // Check if this session has already been counted
    const hasVisitedThisSession = sessionStorage.getItem(SESSION_VISITED_KEY);

    if (!hasVisitedThisSession) {
      // This is a new session, increment the counter
      const newCount = visitCount + 1;
      setVisitCount(newCount);

      try {
        localStorage.setItem(VISIT_COUNT_KEY, newCount.toString());
        sessionStorage.setItem(SESSION_VISITED_KEY, 'true');
      } catch (error) {
        console.error('Failed to save visit count:', error);
      }
    }
  }, []); // Only run once on mount

  return visitCount;
};
