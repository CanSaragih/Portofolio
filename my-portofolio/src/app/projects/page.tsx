"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import MagneticEffect from "@/components/providers/MagneticEffect";

export default function ProjectsPage() {
  const [isNavigating, setIsNavigating] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Simplified navigation handler using window.location
  const handleBackToHome = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isNavigating) return; // Prevent double clicks

      try {
        setIsNavigating(true);

        // Set mounted to false immediately
        isMountedRef.current = false;

        // Use window.location for more reliable navigation
        window.location.href = "/";
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback: try again with a different method
        setTimeout(() => {
          window.location.assign("/");
        }, 100);
      }
    },
    [isNavigating]
  );

  const projects = [
    {
      image: "/Img-project/ParkGo.png",
      name: "ParkGo",
      url: "https://github.com/Parkir-Cepat",
      description:
        "A real-time mobile app that helps users find and book nearby parking spots with ease. It features live availability, secure payments, and Google Maps integration for accurate navigation.",
      tech: [
        "React Native",
        "Apollo Server",
        "Express JS",
        "GraphQL",
        "MongoDB",
        "Redis",
        "Socket.IO",
        "Midtrans API",
        "Google Places API",
      ],
      category: "Mobile App",
    },
    {
      image: "/Img-project/ShopHub.png",
      name: "Shophub",
      url: "https://github.com/H8-FSJS-P3S5/gc02-CanSaragih",
      description:
        "A responsive e-commerce web app where users can browse products, manage wishlists, and experience smooth shopping. Built with Next.js, TypeScript, and styled using Tailwind CSS.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      category: "Web App",
      demo: "https://shophub-ivory.vercel.app",
    },
    {
      image: "/Img-project/SocialMediaApp.png",
      name: "Social Media App",
      url: "https://github.com/H8-FSJS-P3S5/gc01-CanSaragih",
      description:
        "A fullstack mobile social media app where users can post, follow, and interact in real-time. Powered by React Native, GraphQL, and Redis for fast and dynamic user experience.",
      tech: ["React Native", "Apollo Server", "GraphQL", "MongoDB", "Redis"],
      category: "Mobile App",
      demo: "https://shorturl.at/IAYEp",
    },
    {
      image: "/Img-project/ChatVerse.png",
      name: "ChatVerse",
      url: "https://github.com/GROP-PROJECT-P2",
      description:
        "A fullstack real-time group chat application with AI assistant",
      tech: [
        "React",
        "React Context",
        "Express.js",
        "Sequelize",
        "Tailwind CSS",
        "Socket.io",
        "OpenAI API",
      ],
      category: "Web App",
    },
    {
      image: "/Img-project/Planorama.png",
      name: "Planorama",
      url: "https://github.com/CanSaragih/IP-RMT60",
      description:
        "A fullstack AI-powered travel planner that estimates budget and generates itineraries.",
      tech: [
        "Express.js",
        "Sequelize",
        "PostgreSQL",
        "React",
        "Tailwind CSS",
        "Gemini API",
        "Google Places API",
      ],
      category: "Web App",
    },
    {
      image: "/Img-project/InstaLook.png",
      name: "InstaLook",
      url: "https://github.com/CanSaragih/SocialMedia-Instagram",
      description: "A fullstack web-based Instagram-like social media platform",
      tech: [
        "Express.js",
        "Sequelize",
        "PostgreSQL",
        "EJS",
        "HTML",
        "CSS Bootstrap",
        "JavaScript",
      ],
      category: "Web App",
    },
    {
      image: "/Img-project/quickkick.png",
      name: "QuickKick",
      url: "https://github.com/andikarahmadisaputra/quickkick",
      description:
        "A fullstack web-based football match schedule application with real-time updates.",
      tech: ["HTML", "CSS Bootstrap", "Javascript DOM"],
      category: "Web App",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#171717]" />
      </div>

      {/* Header */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="pt-16 sm:pt-20 lg:pt-23 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-[1440px] mx-auto text-center">
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            All Projects
          </motion.h1>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projects.map((project, index) => (
              <motion.div
                key={`${project.name}-${index}`}
                initial={{ opacity: 0, scale: 0.0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-0 items-stretch bg-[#242426] border-2 border-[#343439] hover:bg-[#29292c] hover:border-[#3f3f46] rounded-2xl sm:rounded-3xl transition-colors duration-300 min-h-[400px] sm:min-h-[450px] lg:min-h-[480px]"
              >
                {/* Content Section */}
                <div className="p-4 sm:p-6 lg:p-7">
                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {project.name}
                  </h3>

                  {/* Project Description */}
                  <p className="text-[#A0A0A0] text-xs sm:text-sm font-medium leading-relaxed mt-3 sm:mt-4 line-clamp-3 sm:line-clamp-none">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 sm:gap-x-3 sm:gap-y-1 mt-3 sm:mt-4">
                    {project.tech.slice(0, 6).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-[#36363b] rounded-md sm:rounded-lg px-2 py-1 text-[#A0A0A0] text-[10px] sm:text-xs font-medium cursor-pointer hover:bg-[#484850] transition-colors duration-300"
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

                  {/* GitHub and Demo Icons */}
                  <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white hover:text-[#aaaaaa] transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full flex items-center justify-center"
                      >
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 p-1.5 sm:p-2 text-[#1c1c1c] bg-white rounded-full hover:bg-[#aaaaaa] transition-colors duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path d="M14 3a1 1 0 0 0 0 2h3.586L10.293 12.293a1 1 0 1 0 1.414 1.414L19 6.414V10a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-6Zm5 11a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2H7a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Image - Bottom */}
                <div className="w-full rounded-b-xl overflow-hidden shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={800}
                    height={250}
                    className="w-full h-[180px] sm:h-[200px] lg:h-full object-cover rounded-2xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <motion.div variants={fadeInUp} className="text-center mt-12 sm:mt-16">
          <MagneticEffect>
            <button
              onClick={handleBackToHome}
              disabled={isNavigating}
              className={`inline-flex items-center gap-2 bg-[#242424] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#3D3D3D] transition-all duration-300 font-medium cursor-pointer text-sm sm:text-base ${
                isNavigating ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
              {isNavigating ? "Loading..." : "Back to Home"}
            </button>
          </MagneticEffect>
        </motion.div>
      </motion.section>
    </div>
  );
}
