"use client";

import { useEffect, useRef } from "react";

interface ScrollWrapperProps {
  children: React.ReactNode;
}

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    // Disable LocomotiveScroll for now to fix scroll issues
    // Just use native smooth scroll
    if (scrollRef.current && isMountedRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
    }

    // Clean smooth scroll implementation
    const handleSmoothScroll = () => {
      if (!isMountedRef.current) return;

      try {
        document.documentElement.style.scrollBehavior = "smooth";
        document.body.style.scrollBehavior = "smooth";
      } catch (error) {
        console.log("Scroll setup error:", error);
      }
    };

    handleSmoothScroll();

    return () => {
      isMountedRef.current = false;
      // Cleanup scroll behavior
      try {
        if (document.documentElement) {
          document.documentElement.style.scrollBehavior = "";
        }
        if (document.body) {
          document.body.style.scrollBehavior = "";
        }
      } catch (error) {
        console.log(error);

        // Ignore cleanup errors
      }
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ scrollBehavior: "smooth" }}>
      {children}
    </div>
  );
}
