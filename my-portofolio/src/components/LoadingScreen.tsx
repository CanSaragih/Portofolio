"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4 text-white">
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-t-transparent border-indigo-500 mb-8"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />

      {/* Animated Text */}
      <motion.h1
        className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-center text-white/90"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Preparing your experience...
      </motion.h1>

      {/* Sub Text */}
      <motion.p
        className="mt-3 text-sm sm:text-base text-gray-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Please wait a moment.
      </motion.p>
    </div>
  );
}
