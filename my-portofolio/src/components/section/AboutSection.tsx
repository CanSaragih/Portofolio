"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/magicui/text-reveal";
import {
  StaggerTestimonials,
  type StaggerCardItem,
} from "@/components/ui/stagger-testimonials";
import { schoolExperience } from "@/data/Schools";
import { fadeInUp } from "@/lib/animations";

export function AboutSection() {
  const educationItems: StaggerCardItem[] = useMemo(
    () =>
      schoolExperience.map((school, index) => ({
        id: `${school.institution}-${index}`,
        title: school.institution,
        subtitle: school.program,
        description: school.description,
        metaLeft: school.duration,
        metaRight: school.totalDuration,
        badge: index === schoolExperience.length - 1 ? "Bootcamp" : "Academic",
        href: school.url,
        hrefLabel: "Transcript",
      })),
    [],
  );

  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#171717]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl text-zinc-100 sm:text-4xl lg:text-7xl font-extrabold mb-6">
            About me
          </h2>
        </motion.div>

        {/* About Bio with TextReveal */}
        <div className="w-full max-w-7xl px-2 sm:px-4 mx-auto text-center mb-16 sm:mb-20 font-raleway">
          <div className="space-y-4 sm:space-y-6">
            <TextReveal>
              Hi there! 👋 I&apos;m Can Saragih, a dedicated Fullstack Developer with a
              strong foundation in both frontend and backend technologies. I specialize
              in building modern, performant, and user-centric web applications using
              React, Next.js, TypeScript, and Tailwind CSS on the frontend, and Node.js,
              Express, and PostgreSQL on the backend. I thrive on turning complex
              problems into elegant solutions through clean code, intuitive interfaces,
              and seamless user experiences. I&apos;m passionate about crafting systems
              that not only look good but are robust, scalable, and maintainable. With a
              background from Hacktiv8 Bootcamp and hands-on experience in collaborative,
              agile environments, I&apos;ve built multiple full-featured applications from
              authentication systems to dynamic dashboards. I&apos;m always
              experimenting with tools like Framer Motion and Lottie to bring subtle,
              meaningful interactions to life. Outside of coding, I enjoy exploring new
              technologies, contributing to open-source projects, and continuously
              improving my skills through side projects and learning platforms. My
              long-term goal is to be part of impactful, large-scale products that create
              real value and push the boundaries of what&apos;s possible on the web.
            </TextReveal>
          </div>
        </div>

        {/* Education Staggered Showcase */}
        <div className="relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-4 sm:mb-6"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-100">
              Education
            </h3>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
          >
            <StaggerTestimonials
              items={educationItems}
              ariaLabel="Education timeline"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
