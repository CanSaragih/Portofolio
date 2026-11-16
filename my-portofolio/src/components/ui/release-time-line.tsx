"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimeLine_01Entry = {
  id?: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  meta?: string;
  badge?: string;
  description: string;
  items?: string[];
  tags?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries: TimeLine_01Entry[];
  className?: string;
}

/**
 * Sticky-parallel editorial timeline:
 * - Left meta column pins cleanly via `position: sticky` beside its right-hand details.
 * - Parallel vertical progress rail tracks scroll progress smoothly alongside the entries.
 * - The entry closest to the upper-center focal line expands automatically (or on click).
 */
export default function TimeLine_01({
  title,
  description,
  entries,
  className,
}: TimeLine_01Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const railTrackRef = useRef<HTMLDivElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const [railHeight, setRailHeight] = useState(0);

  const setSentinelRef = (el: HTMLDivElement | null, index: number) => {
    sentinelRefs.current[index] = el;
  };

  useEffect(() => {
    const updateRailHeight = () => {
      if (railTrackRef.current) {
        setRailHeight(railTrackRef.current.getBoundingClientRect().height);
      }
    };

    updateRailHeight();
    const observer = new ResizeObserver(updateRailHeight);
    if (railTrackRef.current) {
      observer.observe(railTrackRef.current);
    }
    window.addEventListener("resize", updateRailHeight, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRailHeight);
    };
  }, [entries.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 45%", "end 60%"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, railHeight]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  useEffect(() => {
    if (entries.length === 0) return;

    const evaluateClosestEntry = () => {
      rafIdRef.current = null;
      const focalY = window.innerHeight * 0.4;
      let bestIndex = 0;
      let bestDist = Infinity;

      sentinelRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - focalY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = index;
        }
      });

      setActiveIndex((prev) => (prev === bestIndex ? prev : bestIndex));
    };

    const scheduleEvaluation = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(evaluateClosestEntry);
    };

    evaluateClosestEntry();
    window.addEventListener("scroll", scheduleEvaluation, { passive: true });
    window.addEventListener("resize", scheduleEvaluation, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleEvaluation);
      window.removeEventListener("resize", scheduleEvaluation);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [entries.length]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {(title || description) && (
        <div className="mb-12 sm:mb-16 text-center md:text-left">
          {title && (
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 mb-3 sm:mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={railTrackRef} className="relative">
        {/* Parallel Vertical Scroll Progress Rail */}
        <div
          aria-hidden="true"
          className="hidden md:block pointer-events-none absolute left-[19px] top-2 bottom-2 w-[2px] bg-zinc-800/80 overflow-hidden"
        >
          <motion.div
            style={{
              height: beamHeight,
              opacity: beamOpacity,
            }}
            className="w-full bg-gradient-to-b from-[#ffaa40] via-[#ffaa40] to-[#ffaa40]/20"
          />
        </div>

        <div className="divide-y divide-zinc-800/90 border-t border-b border-zinc-800/90">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const Icon = entry.icon;

            return (
              <div
                key={entry.id ?? `${entry.title}-${index}`}
                className="relative flex flex-col gap-6 py-10 sm:py-14 md:flex-row md:items-start md:gap-12 lg:gap-16"
                aria-current={isActive ? "true" : "false"}
              >
                {/* Sticky Left Meta Column */}
                <div className="md:sticky md:top-32 self-start w-full md:w-72 lg:w-80 shrink-0 z-10">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="flex items-start gap-4 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffaa40] rounded-lg"
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 shrink-0 bg-[#171717]",
                        isActive
                          ? "bg-[#ffaa40] text-zinc-950 border-[#ffaa40]"
                          : "text-zinc-400 border-zinc-700 group-hover:border-zinc-500 group-hover:text-zinc-200",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span
                        className={cn(
                          "font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                          isActive ? "text-[#ffaa40]" : "text-zinc-500",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                        {entry.badge ? ` / ${entry.badge}` : ""}
                      </span>
                      <span
                        className={cn(
                          "text-base sm:text-[1.125rem] font-bold leading-[1.35] mt-1 transition-colors duration-300",
                          isActive
                            ? "text-zinc-100"
                            : "text-zinc-400 group-hover:text-zinc-200",
                        )}
                      >
                        {entry.title}
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-[1.4]">
                        {entry.subtitle}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Proximity Sentinel */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* Flat Editorial Right Column */}
                <article
                  onClick={() => setActiveIndex(index)}
                  className="flex-1 min-w-0 max-w-[65ch] cursor-pointer"
                >
                  {entry.image && (
                    <div className="relative mb-6 w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-zinc-800">
                      <Image
                        src={entry.image}
                        alt={`${entry.title} visual`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3
                        className={cn(
                          "text-xl sm:text-2xl font-semibold tracking-tight text-balance transition-colors duration-300",
                          isActive ? "text-white" : "text-zinc-400",
                        )}
                      >
                        {entry.meta || entry.title}
                      </h3>
                    </div>

                    <p
                      className={cn(
                        "text-[0.95rem] sm:text-[1.03rem] leading-[1.65] text-pretty transition-colors duration-300",
                        isActive
                          ? "text-zinc-300 line-clamp-none"
                          : "text-zinc-500 line-clamp-2",
                      )}
                    >
                      {entry.description}
                    </p>
                  </div>

                  {/* Expandable Editorial Body */}
                  <div
                    aria-hidden={!isActive}
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "grid-rows-[1fr] opacity-100 mt-6"
                        : "grid-rows-[0fr] opacity-0 mt-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-6 pt-1">
                        {entry.items && entry.items.length > 0 && (
                          <ul className="space-y-3 border-l border-zinc-800 pl-4 sm:pl-5 py-0.5">
                            {entry.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-3 text-[0.9rem] sm:text-[0.97rem] text-zinc-300"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-[#ffaa40] shrink-0"
                                />
                                <span className="leading-[1.6] text-pretty">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          {entry.tags && entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {entry.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono px-3 py-1 rounded-md border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-xs transition-colors hover:border-[#ffaa40]/40"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {entry.button && (
                            <a
                              href={entry.button.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="group/btn inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1e1e24] px-4 py-2 text-xs font-medium text-zinc-200 transition-all duration-300 hover:border-[#ffaa40] hover:bg-[#ffaa40] hover:text-zinc-950"
                            >
                              <span>{entry.button.text}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
