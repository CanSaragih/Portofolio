"use client";

import { motion } from "framer-motion";
import React from "react";

export const WaveBackground = React.memo(function WaveBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="wave-gradient-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(75, 85, 99, 0.08)" />
            <stop offset="50%" stopColor="rgba(107, 114, 128, 0.12)" />
            <stop offset="100%" stopColor="rgba(55, 65, 81, 0.06)" />
          </linearGradient>

          <linearGradient
            id="wave-gradient-2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(55, 65, 81, 0.10)" />
            <stop offset="50%" stopColor="rgba(75, 85, 99, 0.15)" />
            <stop offset="100%" stopColor="rgba(31, 41, 55, 0.08)" />
          </linearGradient>

          <linearGradient
            id="wave-gradient-3"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(31, 41, 55, 0.12)" />
            <stop offset="50%" stopColor="rgba(55, 65, 81, 0.18)" />
            <stop offset="100%" stopColor="rgba(17, 24, 39, 0.10)" />
          </linearGradient>

          <linearGradient
            id="stroke-gradient-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(156, 163, 175, 0.0)" />
            <stop offset="30%" stopColor="rgba(156, 163, 175, 0.15)" />
            <stop offset="70%" stopColor="rgba(156, 163, 175, 0.15)" />
            <stop offset="100%" stopColor="rgba(156, 163, 175, 0.0)" />
          </linearGradient>

          <linearGradient
            id="stroke-gradient-2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(107, 114, 128, 0.0)" />
            <stop offset="25%" stopColor="rgba(107, 114, 128, 0.18)" />
            <stop offset="75%" stopColor="rgba(107, 114, 128, 0.18)" />
            <stop offset="100%" stopColor="rgba(107, 114, 128, 0.0)" />
          </linearGradient>
        </defs>

        {/* Elegant topographic contour lines */}
        <motion.path
          d="M-100,150 Q200,120 500,160 T1100,140 Q1200,135 1300,140"
          stroke="url(#stroke-gradient-1)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M-100,150 Q200,120 500,160 T1100,140 Q1200,135 1300,140",
              "M-100,160 Q200,130 500,170 T1100,150 Q1200,145 1300,150",
              "M-100,150 Q200,120 500,160 T1100,140 Q1200,135 1300,140",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M-150,200 Q250,170 550,210 T1150,190 Q1250,185 1350,190"
          stroke="url(#stroke-gradient-2)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M-150,200 Q250,170 550,210 T1150,190 Q1250,185 1350,190",
              "M-150,210 Q250,180 550,220 T1150,200 Q1250,195 1350,200",
              "M-150,200 Q250,170 550,210 T1150,190 Q1250,185 1350,190",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.path
          d="M-200,250 Q300,220 600,260 T1200,240 Q1300,235 1400,240"
          stroke="rgba(156, 163, 175, 0.12)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M-200,250 Q300,220 600,260 T1200,240 Q1300,235 1400,240",
              "M-200,260 Q300,230 600,270 T1200,250 Q1300,245 1400,250",
              "M-200,250 Q300,220 600,260 T1200,240 Q1300,235 1400,240",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.path
          d="M-100,300 Q350,270 700,310 T1300,290"
          stroke="rgba(107, 114, 128, 0.10)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M-100,300 Q350,270 700,310 T1300,290",
              "M-100,310 Q350,280 700,320 T1300,300",
              "M-100,300 Q350,270 700,310 T1300,290",
            ],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        <motion.path
          d="M-250,350 Q400,320 800,360 T1450,340"
          stroke="rgba(75, 85, 99, 0.08)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M-250,350 Q400,320 800,360 T1450,340",
              "M-250,360 Q400,330 800,370 T1450,350",
              "M-250,350 Q400,320 800,360 T1450,340",
            ],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        <motion.path
          d="M-50,80 Q150,60 350,90 T750,70 Q950,65 1150,70"
          stroke="rgba(156, 163, 175, 0.06)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M-50,80 Q150,60 350,90 T750,70 Q950,65 1150,70",
              "M-50,85 Q150,65 350,95 T750,75 Q950,70 1150,75",
              "M-50,80 Q150,60 350,90 T750,70 Q950,65 1150,70",
            ],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.path
          d="M-120,120 Q180,100 380,130 T780,110 Q980,105 1180,110"
          stroke="rgba(107, 114, 128, 0.05)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M-120,120 Q180,100 380,130 T780,110 Q980,105 1180,110",
              "M-120,125 Q180,105 380,135 T780,115 Q980,110 1180,115",
              "M-120,120 Q180,100 380,130 T780,110 Q980,105 1180,110",
            ],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </svg>
    </div>
  );
});

