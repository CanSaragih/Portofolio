"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

let cachedAnimationPromise: Promise<unknown> | null = null;
let cachedAnimationData: unknown = null;

function loadAiOrbAnimation(): Promise<unknown> {
  if (cachedAnimationData) {
    return Promise.resolve(cachedAnimationData);
  }
  if (!cachedAnimationPromise) {
    cachedAnimationPromise = fetch("/lottie/ai.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Lottie animation");
        return res.json();
      })
      .then((data) => {
        cachedAnimationData = data;
        return data;
      })
      .catch(() => {
        cachedAnimationPromise = null;
        return null;
      });
  }
  return cachedAnimationPromise;
}

interface AiOrbLottieProps {
  className?: string;
}

export function AiOrbLottie({ className = "w-10 h-10" }: AiOrbLottieProps) {
  const [animationData, setAnimationData] = useState<unknown>(
    () => cachedAnimationData,
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let active = true;

    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener("change", onChange);

      if (!cachedAnimationData) {
        void loadAiOrbAnimation().then((data) => {
          if (active && data) setAnimationData(data);
        });
      }

      return () => {
        active = false;
        media.removeEventListener("change", onChange);
      };
    }

    return () => {
      active = false;
    };
  }, []);

  if (!animationData) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block rounded-full border-2 border-[#747cec]/50 bg-gradient-to-tr from-[#747cec]/15 to-indigo-100 ${className}`}
      />
    );
  }

  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <Lottie
        animationData={animationData}
        loop={!reducedMotion}
        autoplay={!reducedMotion}
        className="w-full h-full"
      />
    </div>
  );
}

