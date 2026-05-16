// src/shared/components/SmoothScroller.tsx
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

interface SmoothScrollerProps {
  children: React.ReactNode;
}

export const SmoothScroller: React.FC<SmoothScrollerProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname, hash } = useLocation();

  // 1. Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      infinite: false,
    });

    lenisRef.current = lenis;

    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // 2. Watch for route changes and force Lenis to the top
  useEffect(() => {
    if (lenisRef.current && !hash) {
      // immediate: true prevents an unwanted scroll animation when switching pages
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return <>{children}</>;
};