"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnimatedHoverItem {
  id?: string;
  title: string;
  subtitle?: string;
  category?: string;
  description?: string;
  url?: string;
  color?: string;
  image?: string;
  year?: string;
}

export interface ServicesWithAnimatedHoverModalProps<T extends AnimatedHoverItem> {
  items: T[];
  title?: string;
  description?: string;
  badge?: string;
  className?: string;
  onItemClick?: (item: T, index: number) => void;
}

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
  },
};

export function ServicesWithAnimatedHoverModal<T extends AnimatedHoverItem>({
  items,
  title,
  description,
  badge,
  className,
  onItemClick,
}: ServicesWithAnimatedHoverModalProps<T>) {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    // GSAP quickTo animations for smooth 60fps cursor follower
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.7,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.7,
      ease: "power3",
    });

    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFinePointer]);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Header section (if provided) */}
      {(title || description || badge) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            {badge && (
              <span className="inline-block text-xs font-semibold tracking-wider text-[#ffaa40] uppercase mb-2">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100">
                {title}
              </h2>
            )}
          </div>
          {description && (
            <p className="max-w-md text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Interactive List Rows */}
      <div className="w-full flex flex-col">
        {items.map((item, index) => (
          <a
            key={item.id || item.title + index}
            href={item.url || "#"}
            target={
              item.url?.startsWith("http") || item.url?.endsWith(".pdf")
                ? "_blank"
                : undefined
            }
            rel="noopener noreferrer"
            onClick={(e) => {
              if (onItemClick) {
                e.preventDefault();
                onItemClick(item, index);
              }
            }}
            onMouseEnter={() => {
              if (isFinePointer) setModal({ active: true, index });
            }}
            onMouseLeave={() => {
              if (isFinePointer) setModal({ active: false, index });
            }}
            className={cn(
              "group relative flex w-full items-center justify-between",
              "border-t border-zinc-800 last:border-b",
              "py-6 sm:py-8 lg:py-10 px-2 sm:px-6 lg:px-8",
              "transition-colors duration-300 hover:bg-white/[0.02]",
              "cursor-pointer select-none",
            )}
          >
            {/* Left Column: Monospace Index + Title */}
            <div className="flex items-center gap-3 sm:gap-6 min-w-0 pr-4">
              <span className="font-mono text-xs sm:text-sm text-zinc-500 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 text-base sm:text-2xl lg:text-3xl font-medium text-zinc-200 transition-all duration-300 group-hover:translate-x-2 sm:group-hover:translate-x-3 group-hover:text-white line-clamp-2 sm:line-clamp-1">
                {item.title}
              </h3>
            </div>

            {/* Right Column: Category / Issuer / Badge + Arrow */}
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <span className="hidden md:inline-block text-xs sm:text-sm text-zinc-400 font-light transition-all duration-300 group-hover:translate-x-[-4px] group-hover:text-zinc-200">
                {item.subtitle || item.category || "Verified"}
              </span>

              {item.year && (
                <span className="hidden lg:inline-block text-xs font-mono text-zinc-500">
                  {item.year}
                </span>
              )}

              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-[#1e1e24] text-zinc-400 transition-all duration-300 group-hover:border-[#ffaa40]/50 group-hover:bg-[#ffaa40] group-hover:text-zinc-950">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Floating Hover Modal & Cursor Follower (Desktop with mouse) */}
      {isFinePointer && (
        <>
          {/* Image Slider Modal */}
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
            className="pointer-events-none fixed top-0 left-0 z-40 flex h-64 w-80 sm:h-72 sm:w-96 items-center justify-center overflow-hidden rounded-2xl bg-zinc-900 border border-white/15 shadow-2xl shadow-black/80"
          >
            <div
              className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ top: `${modal.index * -100}%` }}
            >
              {items.map((item, idx) => (
                <div
                  key={item.id || item.title + idx}
                  className="flex h-full w-full items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: item.color || "#18181b" }}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 320px, 384px"
                      unoptimized
                    />
                  )}
                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Caption info on the modal */}
                  <div className="absolute bottom-4 left-5 right-5 text-left z-10">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-zinc-200 border border-white/10 backdrop-blur-sm mb-1.5">
                      {item.category || item.subtitle || "Certificate"}
                    </span>
                    <p className="text-sm font-bold text-white line-clamp-1 drop-shadow-md">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5 drop-shadow">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Circle Follower Cursor */}
          <motion.div
            ref={cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
            className="pointer-events-none fixed top-0 left-0 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-[#ffaa40] font-semibold text-xs tracking-wider uppercase text-zinc-950 shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-1 font-bold">
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default ServicesWithAnimatedHoverModal;
