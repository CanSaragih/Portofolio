"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Palette } from "lucide-react";
import TimeLine_01, {
  type TimeLine_01Entry,
} from "@/components/ui/release-time-line";
import { workExperience } from "@/data/WorkExperience";
import { fadeInUp } from "@/lib/animations";

const EXPERIENCE_ICONS = [Database, Code2, Palette];

export function Experience() {
  const entries: TimeLine_01Entry[] = useMemo(
    () =>
      workExperience.map((exp, index) => ({
        id: exp.id,
        icon: EXPERIENCE_ICONS[index] ?? Code2,
        title: exp.position,
        subtitle: `${exp.company} • ${exp.title}`,
        meta: exp.client
          ? `${exp.client}${exp.location ? ` (${exp.location})` : ""}`
          : exp.location,
        badge: exp.badge,
        description: exp.description,
        items: exp.responsibilities,
        tags: exp.tech,
        button: exp.url
          ? {
              url: exp.url,
              text: exp.urlLabel ?? "Visit Live Site",
            }
          : undefined,
      })),
    [],
  );

  return (
    <section
      id="experience"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#171717]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl text-zinc-100 sm:text-4xl lg:text-7xl font-extrabold mb-3 sm:mb-4">
            Experience
          </h2>
          <p className="text-sm sm:text-[1.0625rem] leading-[1.6] text-pretty text-zinc-400 max-w-xl mx-auto px-2">
            Over a year building fullstack web systems and data pipelines for
            government institutions, backed by 5+ years of visual design.
          </p>
        </motion.div>

        <TimeLine_01 entries={entries} />
      </div>
    </section>
  );
}
