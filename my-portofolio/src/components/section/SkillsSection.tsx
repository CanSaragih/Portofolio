"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SkillsNetwork from "@/components/SkillsNetwork";
import { skillCategories } from "@/data/Skills";
import { fadeInUp } from "@/lib/animations";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");
  const categories = Object.keys(skillCategories);

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-[#171717]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl text-zinc-100 sm:text-4xl lg:text-7xl font-extrabold mb-8">
            My Skills
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="flex justify-center mb-12 px-2"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-3 bg-[#1f1f21] backdrop-blur-lg rounded-xl sm:rounded-2xl max-w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeCategory === category
                    ? "bg-[#525bce]/60 text-white font-bold shadow-md shadow-[#525bce]/20"
                    : "text-gray-300 hover:text-white hover:bg-[#2b2b2f]"
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Network */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="px-2 sm:px-0"
        >
          <SkillsNetwork
            skills={
              skillCategories[activeCategory as keyof typeof skillCategories] || []
            }
            key={activeCategory}
          />
        </motion.div>
      </div>
    </section>
  );
}
