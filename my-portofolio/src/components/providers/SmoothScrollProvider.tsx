"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: ReturnType<typeof useLenis>;
  }
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      window.__lenis = lenis;
    }

    return () => {
      delete window.__lenis;
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        autoResize: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export { useLenis };
export default SmoothScrollProvider;

