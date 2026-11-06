"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SkillsIntegrationNetwork from "./SkillsIntegrationNetwork";
import { CategoryFilter, type CategoryOption } from "@/components/ui/category-filter";
import { skillCategories } from "@/data/Skills";
import { fadeInUp } from "@/lib/animations";

type SkillCategory = keyof typeof skillCategories;

const DEFAULT_CATEGORY: SkillCategory = "Frontend";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(DEFAULT_CATEGORY);

  const categoryOptions: CategoryOption<SkillCategory>[] = useMemo(
    () =>
      (Object.keys(skillCategories) as SkillCategory[]).map((category) => ({
        value: category,
        label: category,
        count: skillCategories[category].length,
      })),
    [],
  );

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-[#171717]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl text-zinc-100 sm:text-4xl lg:text-7xl font-extrabold mb-4">
            My Skills
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Technologies and tools I use to build scalable, interactive, and
            high-performance applications.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="flex justify-center mb-10 sm:mb-14"
        >
          <CategoryFilter
            options={categoryOptions}
            value={activeCategory}
            onChange={setActiveCategory}
            ariaLabel="Filter skills by category"
            layoutId="skills-category-indicator"
            className="w-full sm:w-auto"
          />
        </motion.div>

        {/* Skills Integration Network */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="w-full"
        >
          <SkillsIntegrationNetwork
            key={activeCategory}
            skills={skillCategories[activeCategory]}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
