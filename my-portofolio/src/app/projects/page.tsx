"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import MagneticEffect from "@/components/providers/MagneticEffect";
import { easeInOut } from "framer-motion";
import { DockBtn } from "@/components/magicui/dockBtn";
import { projects } from "@/data/Projects";
import { ProjectCard } from "@/components/section/ProjectCard";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#171717] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-[#171717]" />

      <DockBtn className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50" />

      {/* Header */}
      <section className="pt-16 sm:pt-20 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[1440px] mx-auto text-center">
          <motion.h1
            {...fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            All Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto"
          >
            A collection of web and mobile applications I have designed, built, and shipped.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={`${project.name}-${index}`}
                project={project}
                index={index}
                variant="grid"
              />
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <MagneticEffect>
            <NextLink
              href="/"
              className="inline-flex items-center gap-2 bg-[#242424] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#3D3D3D] transition-all duration-300 font-medium cursor-pointer text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Home</span>
            </NextLink>
          </MagneticEffect>
        </motion.div>
      </section>
    </main>
  );
}
