import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Placeholder analytics hook; replace with Express/other analytics as needed.
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // No-op without Firebase; integrate analytics here if needed.
    void location;
  }, [location]);
};

/**
 * Placeholder event tracker; replace with real analytics.
 */
export const trackEvent = (_eventName: string, _eventParams?: Record<string, any>) => {
  // No-op
};

