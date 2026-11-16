"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StaggerCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metaLeft?: string;
  metaRight?: string;
  badge?: string;
  href?: string;
  hrefLabel?: string;
}

export interface StaggerTestimonialsProps {
  items: StaggerCardItem[];
  initialIndex?: number;
  className?: string;
  ariaLabel?: string;
}

interface ViewportConfig {
  cardSize: number;
  spread: number;
  containerHeight: number;
  cutSize: number;
  centerLift: number;
}

function getViewportConfig(width: number): ViewportConfig {
  if (width >= 1024) {
    return {
      cardSize: 370,
      spread: 252,
      containerHeight: 540,
      cutSize: 50,
      centerLift: 46,
    };
  }
  if (width >= 640) {
    return {
      cardSize: 330,
      spread: 200,
      containerHeight: 500,
      cutSize: 44,
      centerLift: 40,
    };
  }
  return {
    cardSize: 268,
    spread: 112,
    containerHeight: 445,
    cutSize: 36,
    centerLift: 32,
  };
}

function getCircularOffset(
  index: number,
  activeIndex: number,
  length: number,
): number {
  let diff = index - activeIndex;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  if (diff === half) return -half;
  return diff;
}

interface StaggerCardProps {
  item: StaggerCardItem;
  index: number;
  position: number;
  config: ViewportConfig;
  reducedMotion: boolean;
  onSelect: () => void;
}

function StaggerCard({
  item,
  index,
  position,
  config,
  reducedMotion,
  onSelect,
}: StaggerCardProps) {
  const isCenter = position === 0;
  const absPos = Math.abs(position);
  const { cardSize, spread, cutSize, centerLift } = config;
  const bevelLineWidth = Math.ceil(cutSize * Math.SQRT2) + 2;

  const translateX = spread * position;
  const translateY = isCenter ? -centerLift : position % 2 !== 0 ? 16 : -10;
  const rotate = reducedMotion
    ? 0
    : isCenter
      ? 0
      : position > 0
        ? 2.5
        : -2.5;
  const scale = isCenter ? 1 : Math.max(0.88, 1 - absPos * 0.05);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={isCenter}
      aria-label={`${item.title} — ${item.subtitle}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2 flex flex-col justify-between cursor-pointer select-none border-2 p-6 sm:p-8",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#747cec]",
        isCenter
          ? "z-20 bg-zinc-100 text-zinc-950 border-zinc-100"
          : absPos === 1
            ? "z-10 bg-[#1f1f21] text-zinc-200 border-[#343439] hover:border-zinc-500"
            : "z-0 bg-[#1b1b1e] text-zinc-400 border-[#27272d] opacity-75",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(0% 0%, calc(100% - ${cutSize}px) 0%, 100% ${cutSize}px, 100% 100%, 0% 100%)`,
        transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
        boxShadow: isCenter ? "0px 10px 0px 3px #343439" : "none",
      }}
    >
      {/* Architectural bevel corner line */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute block origin-top-right rotate-45 transition-colors duration-500",
          isCenter ? "bg-zinc-300" : "bg-[#343439]",
        )}
        style={{
          right: -2,
          top: cutSize - 2,
          width: bevelLineWidth,
          height: 2,
        }}
      />

      {/* Top row: Icon + Index & Duration */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-5 pr-8 sm:pr-10">
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center border transition-colors duration-300",
                isCenter
                  ? "bg-zinc-950 text-zinc-100 border-zinc-950"
                  : "bg-[#27272d] text-zinc-300 border-[#343439]",
              )}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <span
              className={cn(
                "font-mono text-xs font-medium tracking-wider tabular-nums",
                isCenter ? "text-zinc-500" : "text-zinc-500",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {(item.metaLeft || item.metaRight) && (
            <div className="text-right shrink-0">
              {item.metaLeft && (
                <p
                  className={cn(
                    "font-mono text-[11px] leading-tight",
                    isCenter ? "text-zinc-600" : "text-zinc-400",
                  )}
                >
                  {item.metaLeft}
                </p>
              )}
              {item.metaRight && (
                <p
                  className={cn(
                    "text-xs font-semibold mt-0.5",
                    isCenter ? "text-[#4f56c9]" : "text-[#8e94ef]",
                  )}
                >
                  {item.metaRight}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <h4
          className={cn(
            "text-lg sm:text-xl font-bold leading-snug mb-1.5 line-clamp-2",
            isCenter ? "text-zinc-950" : "text-zinc-100",
          )}
        >
          {item.title}
        </h4>
        <p
          className={cn(
            "text-xs sm:text-sm font-semibold mb-3",
            isCenter ? "text-[#4f56c9]" : "text-[#959bf5]",
          )}
        >
          {item.subtitle}
        </p>
        <p
          className={cn(
            "text-xs sm:text-sm leading-relaxed line-clamp-4",
            isCenter ? "text-zinc-700" : "text-zinc-400",
          )}
        >
          {item.description}
        </p>
      </div>

      {/* Bottom Footer / Transcript Link */}
      <div
        className={cn(
          "pt-3 border-t flex items-center justify-between gap-2",
          isCenter ? "border-zinc-300/80" : "border-[#2e2e36]",
        )}
      >
        <span
          className={cn(
            "font-mono text-[11px] uppercase tracking-wider",
            isCenter ? "text-zinc-500" : "text-zinc-500",
          )}
        >
          {item.badge || "Education"}
        </span>

        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold transition-colors",
              isCenter
                ? "text-zinc-950 hover:text-[#4f56c9]"
                : "text-zinc-300 hover:text-white",
            )}
          >
            <span>{item.hrefLabel || "Transcript"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export function StaggerTestimonials({
  items,
  initialIndex,
  className,
  ariaLabel = "Education milestones",
}: StaggerTestimonialsProps) {
  const defaultIndex =
    initialIndex !== undefined
      ? Math.max(0, Math.min(initialIndex, Math.max(0, items.length - 1)))
      : items.length > 0
        ? Math.floor(items.length / 2)
        : 0;

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [config, setConfig] = useState<ViewportConfig>(() =>
    getViewportConfig(1024),
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      setConfig(getViewportConfig(window.innerWidth));
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);

    updateLayout();
    window.addEventListener("resize", updateLayout);
    media.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("resize", updateLayout);
      media.removeEventListener("change", onMotionChange);
    };
  }, []);

  const stepBy = useCallback(
    (delta: number) => {
      if (items.length === 0) return;
      setActiveIndex(
        (prev) => (((prev + delta) % items.length) + items.length) % items.length,
      );
    },
    [items.length],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          stepBy(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          stepBy(1);
        }
      }}
      onTouchStart={(e) => {
        touchStartXRef.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartXRef.current === null) return;
        const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
        const deltaX = endX - touchStartXRef.current;
        touchStartXRef.current = null;
        if (Math.abs(deltaX) > 40) {
          stepBy(deltaX < 0 ? 1 : -1);
        }
      }}
      className={cn(
        "relative w-full overflow-hidden select-none",
        className,
      )}
      style={{ height: config.containerHeight }}
    >
      {items.map((item, index) => {
        const position = getCircularOffset(index, activeIndex, items.length);
        return (
          <StaggerCard
            key={item.id}
            item={item}
            index={index}
            position={position}
            config={config}
            reducedMotion={reducedMotion}
            onSelect={() => setActiveIndex(index)}
          />
        );
      })}

      {/* Navigation Controls */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        <button
          type="button"
          onClick={() => stepBy(-1)}
          className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center bg-[#1f1f21] border-2 border-[#343439] text-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#747cec]"
          aria-label="Previous education milestone"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="font-mono text-xs text-zinc-400 tabular-nums px-2">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => stepBy(1)}
          className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center bg-[#1f1f21] border-2 border-[#343439] text-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#747cec]"
          aria-label="Next education milestone"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default StaggerTestimonials;

