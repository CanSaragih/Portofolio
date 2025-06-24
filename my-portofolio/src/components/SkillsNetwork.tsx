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

  // Auto-cycle through skills
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 2000); // Increased duration to 2 seconds

    return () => clearInterval(interval);
  }, [skills.length]);

  // Split skills into left and right sides
  const leftSkills = skills.filter((_, index) => index % 2 === 0);
  const rightSkills = skills.filter((_, index) => index % 2 === 1);

  // Dynamic spacing calculation based on number of items
  const getVerticalSpacing = (itemCount: number) => {
    if (itemCount <= 3) return "gap-8";
    if (itemCount <= 5) return "gap-6";
    return "gap-4";
  };

  // Generate curved path for connection
  const generatePath = (side: "left" | "right", yPosition: number) => {
    const centerX = 400; // Center of the 800px viewBox
    const centerY = 300; // Center of the 600px viewBox
    const startX = side === "left" ? 100 : 700;
    const startY = yPosition;

    // Create a more pronounced curved path
    const controlX = side === "left" ? 180 : 620;
    const controlY = (startY + centerY) / 2 + (side === "left" ? -50 : 50);

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${centerX} ${centerY}`;
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Central Skills Text - Using flexbox for perfect centering */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#1b1b1b] px-13 py-6 rounded-[28px] border border-[#2d2d2d] shadow-[0_0_40px_rgba(128,128,255,0.2)]"
        >
          <h3 className="text-[52px] sm:text-[64px] font-extrabold text-center bg-gradient-to-b from-gray-100 to-gray-500 bg-clip-text text-transparent tracking-wide drop-shadow-[0_2px_1px_rgba(255,255,255,0.1)]">
            Skills
          </h3>
        </motion.div>
      </div>

      {/* SVG Container for Connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for active stroke animation */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
            <stop offset="30%" stopColor="rgba(168, 85, 247, 0.8)" />
            <stop offset="60%" stopColor="rgba(59, 130, 246, 1)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
          </linearGradient>

          {/* Gradient for inactive lines */}
          <linearGradient
            id="inactiveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(75, 85, 99, 0.1)" />
            <stop offset="50%" stopColor="rgba(75, 85, 99, 0.3)" />
            <stop offset="100%" stopColor="rgba(75, 85, 99, 0.1)" />
          </linearGradient>
        </defs>

        {/* Base inactive connection lines */}
        {skills.map((skill, index) => {
          const isLeft = index % 2 === 0;
          const sideIndex = isLeft
            ? Math.floor(index / 2)
            : Math.floor((index - 1) / 2);
          const skillsOnSide = isLeft ? leftSkills : rightSkills;
          const spacing = Math.max(400 / (skillsOnSide.length + 1), 60); // Minimum 60px spacing
          const yPosition = 100 + (sideIndex + 1) * spacing;
          const path = generatePath(isLeft ? "left" : "right", yPosition);

          return (
            <motion.path
              key={`base-${skill.name}-${index}`}
              d={path}
              stroke="url(#inactiveGradient)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3,3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          );
        })}

        {/* Animated flowing stroke for active line */}
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
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                pathLength: {
                  duration: 1.5,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.3,
                },
              }}
            />
          );
        })}

        {/* Glowing effect for active line */}
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
              stroke="rgba(168, 85, 247, 0.4)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              filter="blur(2px)"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                pathLength: {
                  duration: 1.5,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.3,
                },
              }}
            />
          );
        })}
      </svg>

      {/* Left Side Tech Icons */}
      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-30 overflow-y-visible">
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
                whileHover={{
                  scale: 1.1,
                }}
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
                    w-16 h-16 sm:w-20 sm:h-20 
                    bg-gradient-to-br ${skill.color}
                    backdrop-blur-lg rounded-2xl 
                    border-2 transition-all duration-300
                    flex items-center justify-center 
                    shadow-lg hover:shadow-xl
                    ${
                      isActive
                        ? "border-purple-400 shadow-purple-400/50 shadow-2xl ring-2 ring-purple-400/30"
                        : "border-white/20 hover:border-purple-400/50"
                    }
                  `}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all duration-300"
                  />
                </div>

                {/* Tooltip */}
                <motion.div
                  className="ml-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -10,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap border border-purple-500/30 backdrop-blur-sm">
                    {skill.name}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Side Tech Icons */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 z-30 overflow-y-visible">
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
                whileHover={{
                  scale: 1.1,
                }}
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
                {/* Tooltip */}
                <motion.div
                  className="mr-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 10,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap border border-purple-500/30 backdrop-blur-sm">
                    {skill.name}
                  </div>
                </motion.div>

                <div
                  className={`
                    w-16 h-16 sm:w-20 sm:h-20 
                    bg-gradient-to-br ${skill.color}
                    backdrop-blur-lg rounded-2xl 
                    border-2 transition-all duration-300
                    flex items-center justify-center 
                    shadow-lg hover:shadow-xl
                    ${
                      isActive
                        ? "border-purple-400 shadow-purple-400/50 shadow-2xl ring-2 ring-purple-400/30"
                        : "border-white/20 hover:border-purple-400/50"
                    }
                  `}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Central pulse effect when active */}
      <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
        <motion.div
          className="w-32 h-32 rounded-full border-2 border-purple-400/30"
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
