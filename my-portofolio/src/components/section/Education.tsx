"use client";

import { schoolExperience } from "@/data/Schools";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-md flex flex-col antialiased bg-[#171717] bg-grid-white/[0.05] items-center justify-center relative overflow-hidden py-8">
      <InfiniteMovingCards
        items={schoolExperience}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
