// screen functions

import { useEffect, useState } from 'react';

export function getScreenBreakpoint(needsXS) {
  if (typeof window === 'undefined' || !window.matchMedia) return 'sm';
  if (window.matchMedia('(max-width: 575.98px)').matches) {
    return needsXS ? 'xs' : 'sm'; // xs/default
  }
  if (
    window.matchMedia('(min-width: 576px)').matches &&
    window.matchMedia('(max-width: 767.98px)').matches
  ) {
    return 'sm';
  }
  if (
    window.matchMedia('(min-width: 768px)').matches &&
    window.matchMedia('(max-width: 991.98px)').matches
  ) {
    return 'md';
  }
  if (
    window.matchMedia('(min-width: 992px)').matches &&
    window.matchMedia('(max-width: 1199.98px)').matches
  ) {
    return 'lg';
  }
  if (window.matchMedia('(min-width: 1200px)').matches) {
    return 'xl';
  }
  return 'sm';
}

/** window resize listener */
export function useScreenBreakpoint(needsXS) {
  const [breakpoint, setBreakpoint] = useState(() => getScreenBreakpoint());

  useEffect(() => {
    const listener = () => {
      setBreakpoint(getScreenBreakpoint(needsXS));
    };
    setBreakpoint(getScreenBreakpoint(needsXS));
    window.addEventListener('resize', listener, { passive: true });
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [needsXS]);

  return breakpoint;
}
