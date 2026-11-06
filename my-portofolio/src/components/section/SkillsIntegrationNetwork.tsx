"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PathBeam } from "@/components/ui/path-beam";
import { NETWORK_VIEWBOX, getNodePresets } from "./skillsNetworkPresets";

export interface SkillItem {
  name: string;
  icon: string;
  color?: string;
}

interface SkillsIntegrationNetworkProps {
  skills: SkillItem[];
  className?: string;
}

interface PositionedSkill {
  id: string;
  skill: SkillItem;
  x: number;
  y: number;
  path: string;
  delay: number;
}

const BEAM_COLOR_FROM = "#ffaa40";
const BEAM_COLOR_TO = "#9c40ff";
/** Travel speed in SVG units/second (lower = slower). */
const BEAM_SPEED = 90;
/** Pause between runs, in seconds. */
const BEAM_REPEAT_DELAY = 1.2;
const BEAM_WIDTH = 1.2;
const BEAM_WIDTH_HOVER = 1.6;

const toPercent = (value: number, total: number) => `${(value / total) * 100}%`;

/* ------------------------------------------------------------------ */
/* Circuit line: static trace + BorderBeam-style moving comet          */
/* ------------------------------------------------------------------ */

interface CircuitLineProps {
  d: string;
  delay: number;
  isHovered: boolean;
}

const CircuitLine = ({ d, delay, isHovered }: CircuitLineProps) => (
  <g>
    <path
      d={d}
      fill="none"
      stroke="rgba(255, 255, 255, 0.1)"
      strokeWidth={isHovered ? 1.8 : 1.2}
      strokeLinecap="round"
    />
    <PathBeam
      d={d}
      delay={delay}
      speed={BEAM_SPEED}
      repeatDelay={BEAM_REPEAT_DELAY}
      colorFrom={BEAM_COLOR_FROM}
      colorTo={BEAM_COLOR_TO}
      strokeWidth={isHovered ? BEAM_WIDTH_HOVER : BEAM_WIDTH}
    />
  </g>
);

/* ------------------------------------------------------------------ */
/* Central hub                                                         */
/* ------------------------------------------------------------------ */

const NetworkHub = () => (
  <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
    <div className="relative flex items-center justify-center rounded-2xl sm:rounded-3xl border border-white/20 bg-[#171717] p-2 sm:p-4 shadow-2xl">
      <div className="flex h-9 w-9 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-zinc-800/80 border border-white/10">
        <Code2 className="h-4 w-4 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#ffaa40]" />
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[#ffaa40]/30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[#9c40ff]/25"
        animate={{ scale: [1, 1.4, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Skill node                                                          */
/* ------------------------------------------------------------------ */

interface SkillNodeProps {
  item: PositionedSkill;
  isHovered: boolean;
  onHoverChange: (name: string | null) => void;
}

const SkillNode = ({ item, isHovered, onHoverChange }: SkillNodeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: item.delay * 0.2 }}
    style={{
      left: toPercent(item.x, NETWORK_VIEWBOX.width),
      top: toPercent(item.y, NETWORK_VIEWBOX.height),
    }}
    onMouseEnter={() => onHoverChange(item.skill.name)}
    onMouseLeave={() => onHoverChange(null)}
    className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer"
  >
    {/* Icon card — static, no transform / border change on hover */}
    <div className="relative flex h-8 w-8 sm:h-13 sm:w-13 md:h-15 md:w-15 lg:h-16 lg:w-16 items-center justify-center rounded-lg sm:rounded-2xl border border-white/10 bg-[#1e1e24] p-1.5 sm:p-3 shadow-lg">
      <Image
        src={item.skill.icon}
        alt={item.skill.name}
        width={64}
        height={64}
        className="h-full w-full object-contain drop-shadow select-none pointer-events-none"
        unoptimized
      />
    </div>

    {/* Name tooltip — hidden by default, fades in on hover */}
    <div
      className={cn(
        "absolute z-30 pointer-events-none px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-medium whitespace-nowrap bg-[#18181b] text-zinc-200 border border-white/10 shadow-xl transition-opacity duration-200",
        item.y > NETWORK_VIEWBOX.height * 0.66 ? "bottom-full mb-2" : "top-full mt-2",
        isHovered ? "opacity-100" : "opacity-0",
      )}
    >
      {item.skill.name}
    </div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Network                                                             */
/* ------------------------------------------------------------------ */

export default function SkillsIntegrationNetwork({
  skills,
  className,
}: SkillsIntegrationNetworkProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const positionedSkills: PositionedSkill[] = useMemo(() => {
    const presets = getNodePresets(skills.length);

    return skills.map((skill, index) => {
      const preset = presets[index % presets.length];
      return {
        id: `${skill.name}-${index}`,
        skill,
        x: preset.x,
        y: preset.y,
        path: preset.path,
        // Deterministic stagger so beams don't fire all at once.
        delay: (index * 0.37) % 1.8,
      };
    });
  }, [skills]);

  return (
    <div
      className={cn(
        // Same aspect ratio as the SVG viewBox so nodes and lines always line up.
        "relative w-full aspect-[5/3] select-none",
        className,
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${NETWORK_VIEWBOX.width} ${NETWORK_VIEWBOX.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {positionedSkills.map((item) => (
          <CircuitLine
            key={item.id}
            d={item.path}
            delay={item.delay}
            isHovered={hoveredSkill === item.skill.name}
          />
        ))}
      </svg>

      <NetworkHub />

      {positionedSkills.map((item) => (
        <SkillNode
          key={item.id}
          item={item}
          isHovered={hoveredSkill === item.skill.name}
          onHoverChange={setHoveredSkill}
        />
      ))}
    </div>
  );
}
