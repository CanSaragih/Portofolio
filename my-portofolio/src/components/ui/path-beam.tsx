"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * PathBeam — SVG counterpart of the MagicUI `BorderBeam`.
 *
 * `BorderBeam` moves a gradient comet (colorFrom → colorTo → transparent)
 * along the border of a box. `PathBeam` renders the exact same comet look,
 * but travels along any arbitrary SVG path `d` (curves included), so it can
 * be used for circuit / network lines.
 *
 * The comet is drawn as N adjacent dash "bands" that all follow one shared
 * head position. Each band gets its own color/opacity, which produces a
 * gradient that bends perfectly around corners. The head starts at the
 * beginning of the path and the tail fully disappears exactly at the end
 * of the path — regardless of how long the path is.
 *
 * Must be rendered inside an `<svg>` element.
 */
export interface PathBeamProps {
  /** SVG path data the beam travels along. */
  d: string;
  /** Length of the beam (comet) in SVG user units. */
  size?: number;
  /** Travel speed in SVG user units per second (keeps speed uniform for short and long paths). */
  speed?: number;
  /** Delay before the first run, in seconds. */
  delay?: number;
  /** Pause between two consecutive runs, in seconds. */
  repeatDelay?: number;
  /** Head color of the beam. */
  colorFrom?: string;
  /** Body color of the beam (fades to transparent at the tail). */
  colorTo?: string;
  /** Stroke width of the beam. */
  strokeWidth?: number;
  /** Number of gradient bands (higher = smoother gradient). */
  segments?: number;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const mixColor = (from: string, to: string, t: number): string => {
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
};

interface BeamBand {
  color: string;
  opacity: number;
}

/**
 * Same gradient stops as BorderBeam:
 * head (0%) = colorFrom → middle (50%) = colorTo → tail (100%) = transparent.
 */
const buildBands = (
  colorFrom: string,
  colorTo: string,
  segments: number,
): BeamBand[] =>
  Array.from({ length: segments }, (_, index) => {
    const t = segments === 1 ? 0 : index / (segments - 1);
    if (t <= 0.5) {
      return { color: mixColor(colorFrom, colorTo, t / 0.5), opacity: 1 };
    }
    return { color: colorTo, opacity: 1 - (t - 0.5) / 0.5 };
  });

interface BandPathProps {
  d: string;
  head: MotionValue<number>;
  index: number;
  step: number;
  gap: number;
  color: string;
  opacity: number;
  strokeWidth: number;
}

/** A single band of the comet, positioned `index * step` behind the head. */
const BandPath = ({
  d,
  head,
  index,
  step,
  gap,
  color,
  opacity,
  strokeWidth,
}: BandPathProps) => {
  const tailDistance = (index + 1) * step;
  const dashOffset = useTransform(head, (h) => tailDistance - h);

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth={strokeWidth}
      strokeLinecap="butt"
      // Tiny overlap hides anti-aliasing seams between adjacent bands.
      strokeDasharray={`${step + 0.6} ${gap}`}
      style={{ strokeDashoffset: dashOffset }}
    />
  );
};

export const PathBeam = ({
  d,
  size = 90,
  speed = 220,
  delay = 0,
  repeatDelay = 0.6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  strokeWidth = 2,
  segments = 14,
}: PathBeamProps) => {
  const measureRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Head starts hidden "before" the path so the beam emerges from the start.
  const head = useMotionValue(0);

  const bands = useMemo(
    () => buildBands(colorFrom, colorTo, segments),
    [colorFrom, colorTo, segments],
  );

  useEffect(() => {
    if (measureRef.current) {
      setPathLength(measureRef.current.getTotalLength());
    }
  }, [d]);

  useEffect(() => {
    if (!pathLength || prefersReducedMotion) return;

    // Travel until the tail has fully passed the end of the path,
    // so the beam always disappears exactly at its target.
    const distance = pathLength + size;
    head.set(0);

    const controls = animate(head, [0, distance], {
      duration: distance / speed,
      ease: "linear",
      repeat: Infinity,
      repeatDelay,
      delay,
    });

    return () => controls.stop();
  }, [pathLength, size, speed, delay, repeatDelay, prefersReducedMotion, head]);

  const step = size / segments;
  // Gap must exceed path + beam length so the dash pattern never repeats on screen.
  const gap = pathLength + size * 2;

  return (
    <g aria-hidden="true">
      <path ref={measureRef} d={d} fill="none" stroke="none" />
      {pathLength > 0 &&
        !prefersReducedMotion &&
        bands.map((band, index) => (
          <BandPath
            key={index}
            d={d}
            head={head}
            index={index}
            step={step}
            gap={gap}
            color={band.color}
            opacity={band.opacity}
            strokeWidth={strokeWidth}
          />
        ))}
    </g>
  );
};

export default PathBeam;

