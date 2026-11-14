"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PathBeam } from "@/components/ui/path-beam";
import {
  NETWORK_VIEWBOX,
  MOBILE_VIEWBOX,
  getNodePresets,
  getMobileNodePresets,
} from "./skillsNetworkPresets";

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
const BEAM_SPEED_DESKTOP = 90;
const BEAM_SPEED_MOBILE = 75;
const BEAM_REPEAT_DELAY = 1.2;

const toPercent = (value: number, total: number) => `${(value / total) * 100}%`;

/* ------------------------------------------------------------------ */
/* Circuit line: static trace + BorderBeam-style moving comet          */
/* ------------------------------------------------------------------ */

interface CircuitLineProps {
  d: string;
  delay: number;
  isHovered: boolean;
  speed?: number;
  strokeWidth?: number;
  strokeWidthHover?: number;
}

const CircuitLine = ({
  d,
  delay,
  isHovered,
  speed = BEAM_SPEED_DESKTOP,
  strokeWidth = 1.2,
  strokeWidthHover = 1.6,
}: CircuitLineProps) => (
  <g>
    <path
      d={d}
      fill="none"
      stroke="rgba(255, 255, 255, 0.1)"
      strokeWidth={isHovered ? strokeWidthHover : strokeWidth}
      strokeLinecap="round"
    />
    <PathBeam
      d={d}
      delay={delay}
      speed={speed}
      repeatDelay={BEAM_REPEAT_DELAY}
      colorFrom={BEAM_COLOR_FROM}
      colorTo={BEAM_COLOR_TO}
      strokeWidth={isHovered ? strokeWidthHover : strokeWidth}
    />
  </g>
);

/* ------------------------------------------------------------------ */
/* Central Hub Components                                              */
/* ------------------------------------------------------------------ */

const DesktopNetworkHub = () => (
  <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
    <div className="relative flex items-center justify-center rounded-2xl sm:rounded-3xl border border-white/20 bg-[#171717] p-2.5 sm:p-4 shadow-2xl">
      <div className="flex h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-zinc-800/80 border border-white/10">
        <Code2 className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#ffaa40]" />
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

const MobileNetworkHub = () => (
  <div className="absolute top-[50%] left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
    <div className="relative flex items-center justify-center rounded-xl sm:rounded-2xl border border-white/20 bg-[#171717] p-2 sm:p-3 shadow-xl">
      <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-zinc-800/80 border border-white/10">
        <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffaa40]" />
      </div>

      <motion.div
        className="absolute inset-0 rounded-xl sm:rounded-2xl border border-[#ffaa40]/30"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl sm:rounded-2xl border border-[#9c40ff]/25"
        animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Skill Node Components                                               */
/* ------------------------------------------------------------------ */

interface SkillNodeProps {
  item: PositionedSkill;
  isHovered: boolean;
  onHoverChange: (name: string | null) => void;
}

const DesktopSkillNode = ({ item, isHovered, onHoverChange }: SkillNodeProps) => (
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
    onClick={() => onHoverChange(isHovered ? null : item.skill.name)}
    className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer"
  >
    {/* Icon card — static, no transform / border change on hover */}
    <div className="relative flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#1e1e24] p-3 shadow-lg">
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
        "absolute z-30 pointer-events-none px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap bg-[#18181b] text-zinc-200 border border-white/10 shadow-xl transition-opacity duration-200",
        item.y > NETWORK_VIEWBOX.height * 0.66 ? "bottom-full mb-2" : "top-full mt-2",
        isHovered ? "opacity-100" : "opacity-0",
      )}
    >
      {item.skill.name}
    </div>
  </motion.div>
);

const MobileSkillNode = ({ item, isHovered, onHoverChange }: SkillNodeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35, delay: item.delay * 0.15 }}
    style={{
      left: toPercent(item.x, MOBILE_VIEWBOX.width),
      top: toPercent(item.y, MOBILE_VIEWBOX.height),
    }}
    onClick={() => onHoverChange(isHovered ? null : item.skill.name)}
    className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer active:scale-95 transition-transform"
  >
    {/* Icon card */}
    <div
      className={cn(
        "relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border bg-[#1e1e24] p-2 shadow-lg transition-colors",
        isHovered ? "border-[#ffaa40]/60 shadow-[#ffaa40]/20" : "border-white/10",
      )}
    >
      <Image
        src={item.skill.icon}
        alt={item.skill.name}
        width={48}
        height={48}
        className="h-full w-full object-contain drop-shadow select-none pointer-events-none"
        unoptimized
      />
    </div>

    {/* Skill Name Pill — always visible on mobile & tablet for instant readability */}
    <span
      className={cn(
        "mt-1 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium border whitespace-nowrap max-w-[85px] truncate text-center shadow-sm pointer-events-none transition-colors",
        isHovered
          ? "bg-zinc-800 text-white border-[#ffaa40]/50"
          : "bg-[#18181b]/95 text-zinc-300 border-white/10",
      )}
    >
      {item.skill.name}
    </span>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Desktop Network (>= 1024px, lg)                                     */
/* ------------------------------------------------------------------ */

function DesktopNetwork({ skills }: { skills: SkillItem[] }) {
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
        delay: (index * 0.37) % 1.8,
      };
    });
  }, [skills]);

  return (
    <div className="relative w-full aspect-[5/3] select-none">
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
            speed={BEAM_SPEED_DESKTOP}
            strokeWidth={1.2}
            strokeWidthHover={1.6}
            isHovered={hoveredSkill === item.skill.name}
          />
        ))}
      </svg>

      <DesktopNetworkHub />

      {positionedSkills.map((item) => (
        <DesktopSkillNode
          key={item.id}
          item={item}
          isHovered={hoveredSkill === item.skill.name}
          onHoverChange={setHoveredSkill}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / Tablet Network (< 1024px)                                 */
/* ------------------------------------------------------------------ */

function MobileNetwork({ skills }: { skills: SkillItem[] }) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const positionedSkills: PositionedSkill[] = useMemo(() => {
    const presets = getMobileNodePresets(skills.length);

    return skills.map((skill, index) => {
      const preset = presets[index % presets.length];
      return {
        id: `mobile-${skill.name}-${index}`,
        skill,
        x: preset.x,
        y: preset.y,
        path: preset.path,
        delay: (index * 0.3) % 1.5,
      };
    });
  }, [skills]);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[400/580] mx-auto select-none">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${MOBILE_VIEWBOX.width} ${MOBILE_VIEWBOX.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {positionedSkills.map((item) => (
          <CircuitLine
            key={item.id}
            d={item.path}
            delay={item.delay}
            speed={BEAM_SPEED_MOBILE}
            strokeWidth={1.1}
            strokeWidthHover={1.5}
            isHovered={activeSkill === item.skill.name}
          />
        ))}
      </svg>

      <MobileNetworkHub />

      {positionedSkills.map((item) => (
        <MobileSkillNode
          key={item.id}
          item={item}
          isHovered={activeSkill === item.skill.name}
          onHoverChange={setActiveSkill}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Responsive Root Component                                           */
/* ------------------------------------------------------------------ */

export default function SkillsIntegrationNetwork({
  skills,
  className,
}: SkillsIntegrationNetworkProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop View (>= 1024px) */}
      <div className="hidden lg:block">
        <DesktopNetwork skills={skills} />
      </div>

      {/* Mobile & Tablet View (< 1024px) */}
      <div className="block lg:hidden">
        <MobileNetwork skills={skills} />
      </div>
    </div>
  );
}
