"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    institution: string;
    program: string;
    duration: string;
    totalDuration: string;
    description: string;
    url?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const hasCloned = useRef(false);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (!containerRef.current || !scrollerRef.current) return;
    if (!hasCloned.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      hasCloned.current = true;
    }
    setDirection();
    setSpeed();
    setStart(true);
  }

  function setDirection() {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  }

  function setSpeed() {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className
      )}
      aria-label="Infinite achievements scroller"
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-5 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            tabIndex={0}
            aria-label={`${item.institution} – ${item.program}`}
            className={cn(
              // DO NOT change bg / border / linear gradient colors (kept as requested)
              "group relative w-[340px] md:w-[440px] max-w-full shrink-0 rounded-2xl border border-b-0 px-7 py-6",
              "border-zinc-700 bg-[linear-gradient(180deg,#27272a,#18181b)]",
              // Modern enhancements
              "flex flex-col gap-3 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40",
              "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_18px_-4px_rgba(0,0,0,0.6)]"
            )}
          >
            {/* Decorative subtle overlay */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_70%)]" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col">
                <h3 className="text-base font-semibold tracking-wide text-gray-100 leading-tight">
                  {item.institution}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                  {item.program}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="rounded-md border border-zinc-600/70 bg-zinc-800/40 px-2 py-1 text-[10px] font-medium text-gray-300 tracking-wide backdrop-blur-sm">
                  {item.totalDuration}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[11px] font-medium text-gray-400">
              <div className="flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5 text-gray-500" />
                <span>{item.duration}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-gray-500/50" />
              <span className="truncate">{item.totalDuration}</span>
            </div>

            {/* Description */}
            <p className="mt-1 text-sm leading-relaxed text-gray-200 line-clamp-5">
              {item.description}
            </p>

            {/* Actions */}
            <div className="mt-2 flex items-center justify-between">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-600/70 bg-zinc-800/40 px-3 py-1.5 text-[11px] font-medium text-blue-300/90 transition-colors hover:text-blue-200 hover:border-zinc-500"
                >
                  <ExternalIcon className="h-3.5 w-3.5" />
                  View Transcript
                </a>
              ) : (
                <span className="text-[11px] text-gray-500 italic">
                  No external link
                </span>
              )}

              <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                <span className="rounded-sm bg-zinc-800/60 px-1.5 py-0.5">
                  Verified
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* Icons (lightweight inline) */
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ExternalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path d="M18 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}
