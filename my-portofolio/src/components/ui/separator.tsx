"use client";

import React from "react";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  className = "",
}) => {
  const baseClasses = "bg-zinc-400/80 ";
  const orientationClasses =
    orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full";

  return (
    <div
      className={`${baseClasses} ${orientationClasses} ${className}`}
      role="separator"
    />
  );
};
