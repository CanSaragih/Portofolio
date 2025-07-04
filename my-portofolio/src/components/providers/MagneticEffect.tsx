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
  disabled = false,
}: MagneticEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    isMountedRef.current = true;

    if (disabled) return;

    const calculateDistance = (e: MouseEvent) => {
      if (!isMountedRef.current || !ref.current) return;

      try {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic effect with strength multiplier
        if (isMountedRef.current) {
          x.set(distanceX * strength);
          y.set(distanceY * strength);
        }
      } catch (error) {
        // Ignore errors during cleanup
        console.log(error);
      }
    };

    const resetPosition = () => {
      if (!isMountedRef.current) return;

      try {
        if (isMountedRef.current) {
          x.set(0);
          y.set(0);
        }
      } catch (error) {
        console.log(error);

        // Ignore errors during cleanup
      }
    };

    const element = ref.current;
    if (element && isMountedRef.current) {
      element.addEventListener("mousemove", calculateDistance, {
        passive: true,
      });
      element.addEventListener("mouseleave", resetPosition, { passive: true });

      return () => {
        isMountedRef.current = false;
        try {
          if (element) {
            element.removeEventListener("mousemove", calculateDistance);
            element.removeEventListener("mouseleave", resetPosition);
          }
        } catch (error) {
          console.log(error);

          // Ignore cleanup errors
        }
      };
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [x, y, strength, disabled]);

  // Early return for disabled state
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

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
