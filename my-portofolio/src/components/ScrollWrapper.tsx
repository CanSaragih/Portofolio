"use client";

import { useEffect, useRef } from "react";

interface ScrollWrapperProps {
  children: React.ReactNode;
}

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable LocomotiveScroll for now to fix scroll issues
    // Just use native smooth scroll
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
    }

    // Clean smooth scroll implementation
    const handleSmoothScroll = () => {
      document.documentElement.style.scrollBehavior = "smooth";
      document.body.style.scrollBehavior = "smooth";
    };

    handleSmoothScroll();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ scrollBehavior: "smooth" }}>
      {children}
    </div>
  );
}
