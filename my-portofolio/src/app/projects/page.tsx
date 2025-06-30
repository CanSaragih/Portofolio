"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/navbar/Nav";
import Footer from "@/components/navbar/Footer";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      image: "/Img-project/ParkGo.png",
      name: "ParkGo",
      url: "https://github.com/orgs/Parkir-Cepat/repositories",
      description:
        "A real-time parking mobile app that helps users find and book parking spots easily.",
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
        "Web-based e-commerce platform that allows you to browse products and manage wish lists.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      category: "Web App",
      demo: "https://shophub-ivory.vercel.app",
    },
    {
      image: "/Img-project/SocialMediaApp.png",
      name: "Social Media App",
      url: "https://github.com/H8-FSJS-P3S5/gc01-CanSaragih",
      description:
        "A fullstack mobile-based social media application built with React Native",
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

  const categories = ["All", "Web App", "Mobile App"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      </div>

      <Nav />

      {/* Header */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
            >
              <svg
                className="w-5 h-5"
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
              Back to Home
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            All Projects
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 max-w-3xl mx-auto mb-12"
          >
            A comprehensive collection of my work showcasing various
            technologies and solutions.
          </motion.p>

          {/* Filter Buttons */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-12">
            <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-transparent hover:scale-[1.02] transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 rounded-3xl">
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent, #8B5CF6, #A855F7, #C084FC, transparent)",
                        padding: "2px",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-full h-full bg-black rounded-3xl" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full">
                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden rounded-t-3xl">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 bg-purple-500/80 text-white px-3 py-1 rounded-full text-sm z-10">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-purple-700/30 to-indigo-700/30 text-white border border-purple-500/30 backdrop-blur-md py-2 px-3 rounded-xl text-center text-sm hover:from-purple-600/40 hover:to-indigo-600/40 hover:border-purple-400/50 transition-all duration-300"
                      >
                        GitHub
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-indigo-700/30 to-purple-700/30 text-white border border-indigo-500/30 backdrop-blur-md py-2 px-3 rounded-xl text-center text-sm hover:from-indigo-600/40 hover:to-purple-600/40 hover:border-indigo-400/50 transition-all duration-300"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
