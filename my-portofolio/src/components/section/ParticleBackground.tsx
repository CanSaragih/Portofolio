"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  left: string;
  top: string;
  duration: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only once on client mount to avoid hydration mismatch
    const generated: Particle[] = Array.from({ length: 40 }, () => ({
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      duration: Number((Math.random() * 3 + 2).toFixed(2)),
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {particles.map((particle, i) => (
        <motion.div
          key={`bg-particle-${i}`}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
    </div>
  );
}
