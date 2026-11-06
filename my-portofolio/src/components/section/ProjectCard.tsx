"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
  demo?: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "featured" | "grid";
}

export function ProjectCard({
  project,
  index,
  variant = "featured",
}: ProjectCardProps) {
  if (variant === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1 gap-0 items-stretch bg-[#242426] border-2 border-[#343439] hover:bg-[#29292c] hover:border-[#3f3f46] rounded-2xl sm:rounded-3xl transition-colors duration-300 min-h-[400px] sm:min-h-[450px] lg:min-h-[480px] overflow-hidden"
      >
        <div className="p-4 sm:p-6 lg:p-7 flex flex-col justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {project.name}
            </h3>

            <p className="text-[#A0A0A0] text-xs sm:text-sm font-medium leading-relaxed mt-3 sm:mt-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-x-3 sm:gap-y-1 mt-3 sm:mt-4">
              {project.tech.slice(0, 6).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-[#36363b] rounded-md sm:rounded-lg px-2 py-1 text-[#A0A0A0] text-[10px] sm:text-xs font-medium hover:bg-[#484850] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 6 && (
                <span className="text-[#A0A0A0] text-[10px] sm:text-xs px-2 py-1">
                  +{project.tech.length - 6}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mt-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} source code on GitHub`}
              className="rounded-full flex items-center justify-center transition-colors text-white hover:text-[#aaaaaa]"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} live demo`}
                className="flex items-center justify-center"
              >
                <LinkIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#1f1f21] bg-white rounded-full p-2 hover:bg-[#aaaaaa] transition-colors duration-300" />
              </a>
            )}
          </div>
        </div>

        <div className="w-full relative h-[180px] sm:h-[200px] lg:h-[220px] rounded-b-xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    );
  }

  // Featured variant (for Home page)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true }}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch 
        bg-[#1f1f21] hover:bg-[#232326] 
        rounded-2xl overflow-hidden
        transition-colors duration-300 min-h-[420px]"
    >
      {/* Left Side: Content */}
      <div className="p-8 sm:p-10 flex flex-col justify-between z-10">
        <div>
          {/* GitHub and Demo Icons */}
          <div className="flex items-center gap-4 mb-6">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub`}
              className="text-white hover:text-[#aaaaaa] transition-colors"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} live demo`}
                className="flex items-center justify-center"
              >
                <LinkIcon className="w-10 h-10 text-[#1f1f21] bg-white rounded-full p-2 hover:bg-[#aaaaaa] transition-colors duration-300" />
              </a>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {project.name}
          </h3>

          <p className="text-[#A0A0A0] text-sm sm:text-base font-normal leading-relaxed mt-4">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((tech, techIdx) => (
            <span
              key={techIdx}
              className="bg-[#36363b] rounded-lg px-2.5 py-1 text-[#A0A0A0] text-xs font-medium hover:bg-[#484850] transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative min-h-[240px] lg:min-h-full w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <BorderBeam duration={15} size={100} />
    </motion.div>
  );
}

