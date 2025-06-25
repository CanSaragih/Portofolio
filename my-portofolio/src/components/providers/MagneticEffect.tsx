"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticEffectProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export default function MagneticEffect({
  children,
  className = "",
  strength = 0.3,
}: MagneticEffectProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic effect with strength multiplier
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      }
    };

    const resetPosition = () => {
      x.set(0);
      y.set(0);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", calculateDistance);
      element.addEventListener("mouseleave", resetPosition);

      return () => {
        element.removeEventListener("mousemove", calculateDistance);
        element.removeEventListener("mouseleave", resetPosition);
      };
    }
  }, [x, y, strength]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}
