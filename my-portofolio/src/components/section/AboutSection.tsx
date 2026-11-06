"use client";

import { motion } from "framer-motion";
import { FileText, GraduationCap } from "lucide-react";
import { TextReveal } from "@/components/magicui/text-reveal";
import { schoolExperience } from "@/data/Schools";
import { InfiniteMovingCardsDemo } from "@/components/section/Education";
import { fadeInUp } from "@/lib/animations";

export function AboutSection() {
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

        {/* Education Timeline / Cards */}
        <div className="relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-6"
          >
            <h3 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-zinc-100">
              Education
            </h3>
          </motion.div>

          {/* Mobile: Clean vertical stacked layout */}
          <div className="block md:hidden">
            <div className="space-y-6">
              {schoolExperience.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-[#1f1f21] backdrop-blur-lg rounded-2xl p-4 sm:p-6 border-2 border-[#27272d] shadow-lg shadow-purple-500/10"
                >
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#7278c7] to-[#8e94ef] rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-100" />
                      </div>

                      {school.url && (
                        <a
                          href={school.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 bg-[#27272d] rounded-md hover:bg-[#8b90e0]/20 transition-all duration-300 group border border-[#27272d] hover:border-[#8b90e0]/50"
                          title="View Transcript"
                        >
                          <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8b90e0] group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-xs text-[#8b90e0] font-medium">
                            Transcript
                          </span>
                        </a>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-gray-400 text-xs leading-tight whitespace-nowrap">
                        {school.duration}
                      </p>
                      <p className="text-[#959bf5] text-xs font-medium whitespace-nowrap">
                        {school.totalDuration}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 leading-tight">
                    {school.institution}
                  </h4>
                  <p className="text-[#959bf5] text-sm mb-3">
                    {school.program}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {school.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal moving cards */}
          <div className="hidden md:block">
            <InfiniteMovingCardsDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
