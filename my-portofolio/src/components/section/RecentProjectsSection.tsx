"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import MagneticEffect from "@/components/providers/MagneticEffect";
import { projects } from "@/data/Projects";
import { ProjectCard } from "./ProjectCard";
import { fadeInUp } from "@/lib/animations";

export function RecentProjectsSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#171717]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-zinc-100 mb-8">
            Recent Projects
          </h2>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-10">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              variant="featured"
            />
          ))}
        </div>

        {/* See Other Projects Button */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mt-20"
        >
          <h3 className="text-zinc-100 sm:text-2xl lg:text-3xl font-extrabold mb-5 tracking-widest">
            See other project
          </h3>
          <MagneticEffect>
            <NextLink
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#242424] text-white px-8 py-4 rounded-lg hover:bg-[#3D3D3D] transition-all duration-300 font-medium cursor-pointer"
            >
              <span>View All Projects</span>
              <svg
                className="w-5 h-5 -rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </NextLink>
          </MagneticEffect>
        </motion.div>
      </div>
    </section>
  );
}
