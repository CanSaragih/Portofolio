"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  /** Callback function when loading completes */
  onComplete?: () => void;
  /** Loading duration in milliseconds (default: 5000ms) */
  duration?: number;
  /** Custom loader text (default: "Welcome to Can Saragih's Portfolio Website") */
  loaderText?: string;
  /** Enable/disable auto completion (default: true) */
  autoComplete?: boolean;
}

export function Preloader({
  onComplete,
  duration = 3500,
  loaderText = "Welcome to Can Saragih's Portfolio Website",
  autoComplete = true,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle loading progress with consistent timing
  useEffect(() => {
    if (!autoComplete || !mounted) return;

    let startTime: number;
    let animationId: number;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 800);
      } else {
        animationId = requestAnimationFrame(updateProgress);
      }
    };

    animationId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [duration, onComplete, autoComplete, mounted]);

  // Animation variants for preloader container
  const preloaderVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Wireframe Globe component
  const WireframeGlobe = () => (
    <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div className="w-full h-full border-2 border-white/40 rounded-full"></div>
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2 translate-y-1"></div>
        <div className="absolute left-0 top-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1 -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-2 h-2 bg-white/60 rounded-full transform translate-x-1 -translate-y-1/2"></div>
      </motion.div>

      {/* Main globe sphere */}
      <motion.div
        animate={{
          rotateY: 360,
          rotateX: [0, 15, 0, -15, 0],
        }}
        transition={{
          rotateY: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          },
          rotateX: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative w-32 h-32 md:w-40 md:h-40"
        style={{ perspective: "1000px" }}
      >
        {/* Sphere wireframe structure */}
        <div className="absolute inset-0">
          {/* Main sphere outline */}
          <div className="w-full h-full border-2 border-white/60 rounded-full"></div>

          {/* Vertical longitude lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40 transform -translate-x-1/2"></div>
          <div className="absolute left-1/4 top-2 bottom-2 w-px bg-white/30 rounded-full transform rotate-12"></div>
          <div className="absolute right-1/4 top-2 bottom-2 w-px bg-white/30 rounded-full transform -rotate-12"></div>

          {/* Horizontal latitude lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40 transform -translate-y-1/2"></div>
          <div className="absolute top-1/3 left-1 right-1 h-px bg-white/30 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1 right-1 h-px bg-white/30 rounded-full"></div>

          {/* Grid pattern - vertical curves */}
          <div className="absolute left-1/2 top-0 bottom-0 w-16 border-l border-r border-white/20 rounded-full transform -translate-x-1/2"></div>

          {/* Grid pattern - horizontal curves */}
          <div className="absolute top-1/2 left-0 right-0 h-16 border-t border-b border-white/20 rounded-full transform -translate-y-1/2"></div>

          {/* Inner cross sections */}
          <div className="absolute inset-4 border border-white/25 rounded-full"></div>
          <div className="absolute inset-6 border border-white/20 rounded-full"></div>

          {/* Center core with pulse */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Floating sparkle effects */}
      {mounted &&
        [...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              top: "20%",
              right: "15%",
            }}
            animate={{
              x: [0, Math.cos(i * 60) * 30, 0],
              y: [0, Math.sin(i * 60) * 30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            {/* 4-pointed star sparkle */}
            <div className="relative w-3 h-3">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white transform -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white transform -translate-x-1/2"></div>
            </div>
          </motion.div>
        ))}

      {/* Orbital ring indicator */}
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-8"
      >
        <div className="w-full h-full border border-white/30 rounded-full border-dashed"></div>
      </motion.div>
    </div>
  );

  // Don't render anything until mounted to avoid hydration error
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={preloaderVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
          </div>

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center space-y-16">
            {/* Enhanced Globe */}
            <WireframeGlobe />

            {/* Loading content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center space-y-8 max-w-2xl px-4"
            >
              {/* Welcome text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-wide leading-relaxed"
              >
                {loaderText}
              </motion.h1>

              {/* Progress percentage with gradient */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-200 via-gray-300 to-white bg-clip-text text-transparent"
              >
                {Math.round(progress)}%
              </motion.div>

              {/* Enhanced progress bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="w-80 md:w-96 h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    duration: 0.1,
                    ease: "easeOut",
                  }}
                >
                  {/* Glow effect on progress bar */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-full blur-sm opacity-40"></div>
                </motion.div>
              </motion.div>

              {/* Loading status text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-gray-400 text-sm md:text-base tracking-widest uppercase font-medium"
              >
                Loading Experience...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
