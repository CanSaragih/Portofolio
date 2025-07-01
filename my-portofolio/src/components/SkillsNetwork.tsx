"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SkillsNetworkProps {
  skills: Skill[];
}

export default function SkillsNetwork({ skills }: SkillsNetworkProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [skills.length]);

  // Mobile Grid Layout
  if (isMobile) {
    return (
      <div className="w-full px-4">
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {skills.map((skill, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={`mobile-${skill.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  scale: { duration: 0.3 },
                }}
                className="cursor-pointer group"
                onTouchStart={() => setActiveIndex(index)}
              >
                <div
                  className={`
                    w-full aspect-square
                    bg-gradient-to-br ${skill.color}
                    backdrop-blur-lg rounded-xl
                    border-2 transition-all duration-300
                    flex flex-col items-center justify-center 
                    shadow-lg p-2
                    ${
                      isActive
                        ? "border-white/40 shadow-white/10 shadow-xl ring-1 ring-white/20"
                        : "border-white/20"
                    }
                  `}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain mb-1.5"
                  />
                  <span className="text-white text-[11px] font-medium text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Network Layout
  const leftSkills = skills.filter((_, index) => index % 2 === 0);
  const rightSkills = skills.filter((_, index) => index % 2 === 1);

  const getVerticalSpacing = (itemCount: number) => {
    if (itemCount <= 3) return "gap-8";
    if (itemCount <= 5) return "gap-6";
    return "gap-4";
  };

  const generatePath = (side: "left" | "right", yPosition: number) => {
    const centerX = 400;
    const centerY = 300;
    const startX = side === "left" ? 40 : 800;
    const startY = yPosition;

    const controlX = side === "left" ? 220 : 700;
    const controlY = (startY + centerY) / 2 + (side === "left" ? -30 : 30);

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${centerX} ${centerY}`;
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Center Skills Title */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#1b1b1b] px-8 sm:px-13 py-4 sm:py-6 rounded-[20px] sm:rounded-[28px] border border-[#2d2d2d] shadow-[0_0_40px_rgba(128,128,255,0.2)]"
        >
          <h3 className="text-[32px] sm:text-[52px] lg:text-[64px] font-extrabold text-center bg-gradient-to-b from-gray-100 to-gray-500 bg-clip-text text-transparent tracking-wide drop-shadow-[0_2px_1px_rgba(255,255,255,0.1)]">
            Skills
          </h3>
        </motion.div>
      </div>

      {/* SVG Connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(129, 140, 248, 0)" />{" "}
            {/* indigo-400 transparan */}
            <stop offset="50%" stopColor="rgba(129, 140, 248, 0.52)" />{" "}
            {/* indigo-400 lembut */}
            <stop offset="100%" stopColor="rgba(129, 140, 248, 0)" />
          </linearGradient>

          <linearGradient
            id="inactiveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(75, 85, 99, 0.1)" />
            <stop offset="50%" stopColor="rgba(75, 85, 99, 0.4)" />
            <stop offset="100%" stopColor="rgba(75, 85, 99, 0.1)" />
          </linearGradient>
        </defs>

        {skills.map((skill, index) => {
          const isLeft = index % 2 === 0;
          const sideIndex = isLeft
            ? Math.floor(index / 2)
            : Math.floor((index - 1) / 2);
          const skillsOnSide = isLeft ? leftSkills : rightSkills;
          const spacing = Math.max(400 / (skillsOnSide.length + 1), 60);
          const yPosition = 100 + (sideIndex + 1) * spacing;
          const path = generatePath(isLeft ? "left" : "right", yPosition);

          return (
            <motion.path
              key={`base-${skill.name}-${index}`}
              d={path}
              stroke="url(#inactiveGradient)"
              strokeWidth="2.3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0"
              initial={{ opacity: 2 }}
              animate={{ opacity: 2 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          );
        })}

        {skills.map((skill, index) => {
          const isActive = index === activeIndex;
          if (!isActive) return null;

          const isLeft = index % 2 === 0;
          const sideIndex = isLeft
            ? Math.floor(index / 2)
            : Math.floor((index - 1) / 2);
          const skillsOnSide = isLeft ? leftSkills : rightSkills;
          const spacing = Math.max(400 / (skillsOnSide.length + 1), 60);
          const yPosition = 100 + (sideIndex + 1) * spacing;
          const path = generatePath(isLeft ? "left" : "right", yPosition);

          return (
            <motion.path
              key={`active-${skill.name}-${index}`}
              d={path}
              stroke="url(#flowGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}

        {skills.map((skill, index) => {
          const isActive = index === activeIndex;
          if (!isActive) return null;

          const isLeft = index % 2 === 0;
          const sideIndex = isLeft
            ? Math.floor(index / 2)
            : Math.floor((index - 1) / 2);
          const skillsOnSide = isLeft ? leftSkills : rightSkills;
          const spacing = Math.max(400 / (skillsOnSide.length + 1), 60);
          const yPosition = 100 + (sideIndex + 1) * spacing;
          const path = generatePath(isLeft ? "left" : "right", yPosition);

          return (
            <motion.path
              key={`glow-${skill.name}-${index}`}
              d={path}
              stroke="rgba(168, 85, 247, 0.3)"
              fill="none"
              strokeLinecap="round"
              filter="blur(4px)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}
      </svg>

      {/* Left Skills */}
      <div className="absolute left-8 sm:left-16 top-1/2 transform -translate-y-1/2 z-30 overflow-y-visible">
        <div
          className={`flex flex-col justify-center items-start ${getVerticalSpacing(
            leftSkills.length
          )} py-8`}
        >
          {leftSkills.map((skill, sideIndex) => {
            const originalIndex = sideIndex * 2;
            const isActive = originalIndex === activeIndex;

            return (
              <motion.div
                key={`left-${skill.name}-${sideIndex}`}
                initial={{ opacity: 0, scale: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.15 : 1,
                  x: 0,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  duration: 0.6,
                  delay: sideIndex * 0.1,
                  type: "spring",
                  stiffness: 300,
                  scale: { duration: 0.3 },
                }}
                className="cursor-pointer group flex items-center transform-gpu"
                onMouseEnter={() => setActiveIndex(originalIndex)}
              >
                <div
                  className={`
                    w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 
                    bg-gradient-to-br ${skill.color}
                    backdrop-blur-lg rounded-xl sm:rounded-2xl 
                    border-2 transition-all duration-300
                    flex items-center justify-center 
                    shadow-lg hover:shadow-xl
                    
                    ${
                      isActive
                        ? "border-white/50 shadow-white/30 shadow-2xl ring-1 ring-white/10"
                        : "border-white/20 hover:border-white/50"
                    }
                  `}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain transition-all duration-300"
                  />
                </div>

                <motion.div
                  className="ml-2 sm:ml-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -10,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-black/90 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg whitespace-nowrap border border-gray-800 backdrop-blur-sm">
                    {skill.name}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Skills */}
      <div className="absolute right-8 sm:right-16 top-1/2 transform -translate-y-1/2 z-30 overflow-y-visible">
        <div
          className={`flex flex-col justify-center items-end ${getVerticalSpacing(
            rightSkills.length
          )} py-8`}
        >
          {rightSkills.map((skill, sideIndex) => {
            const originalIndex = sideIndex * 2 + 1;
            const isActive = originalIndex === activeIndex;

            return (
              <motion.div
                key={`right-${skill.name}-${sideIndex}`}
                initial={{ opacity: 0, scale: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.15 : 1,
                  x: 0,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  duration: 0.6,
                  delay: sideIndex * 0.1,
                  type: "spring",
                  stiffness: 300,
                  scale: { duration: 0.3 },
                }}
                className="cursor-pointer group flex items-center justify-end transform-gpu"
                onMouseEnter={() => setActiveIndex(originalIndex)}
              >
                <motion.div
                  className="mr-2 sm:mr-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 10,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-black/90 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg whitespace-nowrap border border-purple-500/30 backdrop-blur-sm">
                    {skill.name}
                  </div>
                </motion.div>

                <div
                  className={`
                    w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 
                    bg-gradient-to-br ${skill.color}
                    backdrop-blur-lg rounded-xl sm:rounded-2xl 
                    border-2 transition-all duration-300
                    flex items-center justify-center 
                    shadow-lg hover:shadow-xl
                    ${
                      isActive
                        ? "border-white/50 shadow-white/30 shadow-2xl ring-1 ring-white/10"
                        : "border-white/20 hover:border-white/50"
                    }
                  `}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain transition-all duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Central pulse effect */}
      <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-purple-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
