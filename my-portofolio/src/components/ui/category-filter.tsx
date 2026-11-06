"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CategoryOption<T extends string = string> {
  value: T;
  label: string;
  /** Optional item count shown as a badge next to the label. */
  count?: number;
}

interface CategoryFilterProps<T extends string> {
  options: CategoryOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the button group, e.g. "Filter skills by category". */
  ariaLabel: string;
  /** Unique id for the sliding active indicator (must be unique per page). */
  layoutId: string;
  className?: string;
}

/**
 * Portfolio-style segmented filter.
 * Numbered tabs + count badges, solid (gradient-free) active pill that
 * slides between options. Uses native toggle buttons (`aria-pressed`).
 */
export function CategoryFilter<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  layoutId,
  className,
}: CategoryFilterProps<T>) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "grid grid-cols-2 gap-1 rounded-2xl border border-[#2a2a2e] bg-[#1f1f21] p-1.5",
        "sm:inline-flex sm:items-center sm:rounded-full",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "group relative flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 sm:rounded-full sm:px-5",
              "text-sm font-semibold tracking-wide whitespace-nowrap cursor-pointer select-none",
              "transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100",
              isActive ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-100",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className="absolute inset-0 rounded-xl bg-zinc-100 sm:rounded-full"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
              />
            )}

            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
