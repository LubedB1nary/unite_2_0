import { useSyncExternalStore } from 'react';

/**
 * Tiny viewport hook — returns the current width and convenience flags.
 * SSR-safe (assumes desktop on the server).
 *
 * Breakpoints follow common mobile-first device buckets:
 *   sm: <= 480 (small phones, single-column)
 *   md: <= 768 (phones + small tablets)
 *   lg: <= 1024 (tablets, narrow laptops)
 *   xl: > 1024 (desktops)
 */
const SUBSCRIBERS = new Set();
let listenerAttached = false;

function attachListener() {
  if (listenerAttached || typeof window === 'undefined') return;
  listenerAttached = true;
  let raf = 0;
  const onResize = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => SUBSCRIBERS.forEach((fn) => fn()));
  };
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });
}

function subscribe(cb) {
  attachListener();
  SUBSCRIBERS.add(cb);
  return () => SUBSCRIBERS.delete(cb);
}

function getSnapshot() {
  if (typeof window === 'undefined') return 1280;
  return window.innerWidth;
}

function getServerSnapshot() {
  return 1280;
}

export function useViewport() {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isSm = width <= 480;
  const isMd = width <= 768;
  const isLg = width <= 1024;
  return {
    width,
    isSm,
    isMobile: isMd,
    isTablet: !isMd && isLg,
    isDesktop: !isLg,
  };
}

export function useIsMobile() {
  return useViewport().isMobile;
}
