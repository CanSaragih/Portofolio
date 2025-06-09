"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const typewriterTexts = ["Fullstack Developer", "Software Engineer"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentFullText = typewriterTexts[textIndex];

    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentFullText) {
        // Pause at the end
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      } else if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, typewriterTexts]);

  const skills = {
    languages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "HTML",
      "CSS",
      "Java",
      "C++",
    ],
    frontend: [
      "React",
      "React Native",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Vue.js",
      "Angular",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "GraphQL",
      "Apollo Server",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
    tools: [
      "Git",
      "Docker",
      "Socket.IO",
      "Expo",
      "Figma",
      "Adobe Creative Suite",
      "VS Code",
    ],
    design: [
      "Figma",
      "Adobe XD",
      "Photoshop",
      "After Effects",
      "Premiere Pro",
      "CorelDRAW",
    ],
  };

  const projects = [
    {
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
      name: "Shophub",
      url: "https://github.com/H8-FSJS-P3S5/gc02-CanSaragih",
      description:
        "Web-based e-commerce platform that allows you to browse products and manage wish lists.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      category: "Web App",
    },
    {
      name: "Social Media App",
      url: "https://github.com/H8-FSJS-P3S5/gc01-CanSaragih",
      description:
        "A fullstack mobile-based social media application built with React Native",
      tech: ["React Native", "Apollo Server", "GraphQL", "MongoDB", "Redis"],
      category: "Mobile App",
    },
    {
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
  ];

  const workExperience = [
    {
      position: "FullStack Developer and Web Designer",
      company: "WhiteBox Indonesia",
      duration: "Oct 2021 - Feb 2022",
      responsibilities: [
        "Contributed to application and website development with a focus on creating user-friendly interfaces.",
        "Collaborated on the frontend development of Mercu Buana University's website, demonstrating strong CSS/SCSS skills and supporting backend debugging.",
        "Designed website and mobile UI/UX for Ichiro Ramen Restaurant, aligning with client specifications to enhance customer experience.",
        "Assisted in redesigning existing brand interfaces to improve visual appeal and user engagement.",
      ],
    },
    {
      position: "Frontend Engineer",
      company: "Prixa.ai",
      duration: "March 2022 - Oct 2022",
      responsibilities: [
        "Contributed to the maintenance and development of a doctor-patient online consultation platform, including appointment booking and AI-powered symptom checking.",
        "Coordinated with the team to debug and resolve frontend issues, ensuring smooth user experience.",
        "Implemented responsive design principles to optimize the platform for various devices.",
        "Collaborated with backend developers to integrate APIs and ensure seamless data flow.",
      ],
    },
    {
      position: "Video Editor & Graphic Designer",
      company: "Custom Kekinian",
      duration: "Jan 2023 - Present",
      responsibilities: [
        "Created and edited high-engagement videos for Instagram, TikTok, and YouTube, helping increase brand visibility and audience reach.",
        "Designed marketing content and custom T-shirt visuals for two separate business divisions (digital content & fashion).",
        "Utilized tools like Adobe After Effects, Adobe Premiere Pro, Photoshop, and CorelDRAW to produce visual assets.",
        "Developed brand identity and visual consistency across multiple social media platforms.",
      ],
    },
  ];

  const certificates = [
    {
      name: "HackerRank React (Basic) Certificate",
      description:
        "Functions, Currying, Hoisting, Scope, Inheritance, Events and Error Handling.",
      url: "https://www.hackerrank.com/certificates/ab7fe4f7eb3d",
    },
    {
      name: "HackerRank Problem Solving (Basic) Certificate",
      description:
        "Data Structures (Arrays, Strings), Algorithms (Sorting, Searching).",
      url: "https://www.hackerrank.com/certificates/795707773c14",
    },
    {
      name: "HackerRank JavaScript (Basic) Certificate",
      description:
        "Functions, Currying, Hoisting, Scope, Inheritance, Events and Error Handling.",
      url: "https://www.hackerrank.com/certificates/2bcf544a456c",
    },
    {
      name: "HackerRank SQL (Basic) Certificate",
      description: "Queries, relationships, and aggregators.",
      url: "https://www.hackerrank.com/certificates/bab52c1efdc8",
    },
    {
      name: "HackerRank CSS (Basic) Certificate",
      description: "CSS basics: Cascading, Inheritance, text, layouts, boxing.",
      url: "https://www.hackerrank.com/certificates/b229e49eb949",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold"
            >
              <span className="text-purple-100">Can Saragih</span>
            </motion.div>
            <div className="flex space-x-4">
              {[
                {
                  name: "Instagram",
                  url: "https://www.instagram.com/can_whardana/",
                  icon: (
                    <svg
                      className="w-7 h-7 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/in/can-saragih/",
                  icon: (
                    <svg
                      className="w-7 h-7 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  url: "https://github.com/CanSaragih",
                  icon: (
                    <svg
                      className="w-7 h-7 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-purple-400 transition-all duration-300 p-3 rounded-xl hover:bg-purple-500/10 backdrop-blur-sm"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        {/* Abstract Wave Background */}
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="wave-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.08)" />
                <stop offset="100%" stopColor="rgba(124, 58, 237, 0.18)" />
              </linearGradient>
              <linearGradient
                id="wave-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.12)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.06)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.14)" />
              </linearGradient>
              <linearGradient
                id="wave-gradient-3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(124, 58, 237, 0.10)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.05)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.12)" />
              </linearGradient>
            </defs>

            {/* Wave paths */}
            <motion.path
              d="M0,400 Q300,200 600,350 T1200,300 L1200,800 L0,800 Z"
              fill="url(#wave-gradient)"
              animate={{
                d: [
                  "M0,400 Q300,200 600,350 T1200,300 L1200,800 L0,800 Z",
                  "M0,450 Q300,250 600,400 T1200,350 L1200,800 L0,800 Z",
                  "M0,400 Q300,200 600,350 T1200,300 L1200,800 L0,800 Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.path
              d="M0,500 Q400,300 800,450 T1200,400 L1200,800 L0,800 Z"
              fill="url(#wave-gradient-2)"
              animate={{
                d: [
                  "M0,500 Q400,300 800,450 T1200,400 L1200,800 L0,800 Z",
                  "M0,550 Q400,350 800,500 T1200,450 L1200,800 L0,800 Z",
                  "M0,500 Q400,300 800,450 T1200,400 L1200,800 L0,800 Z",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.path
              d="M0,600 Q500,400 1000,550 T1200,500 L1200,800 L0,800 Z"
              fill="url(#wave-gradient-3)"
              animate={{
                d: [
                  "M0,600 Q500,400 1000,550 T1200,500 L1200,800 L0,800 Z",
                  "M0,650 Q500,450 1000,600 T1200,550 L1200,800 L0,800 Z",
                  "M0,600 Q500,400 1000,550 T1200,500 L1200,800 L0,800 Z",
                ],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Additional floating curved lines with balanced visibility */}
            <motion.path
              d="M-100,100 Q300,50 700,150 T1300,100"
              stroke="rgba(168, 85, 247, 0.20)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-100,100 Q300,50 700,150 T1300,100",
                  "M-100,120 Q300,70 700,170 T1300,120",
                  "M-100,100 Q300,50 700,150 T1300,100",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.path
              d="M-100,200 Q400,150 800,250 T1300,200"
              stroke="rgba(147, 51, 234, 0.18)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-100,200 Q400,150 800,250 T1300,200",
                  "M-100,220 Q400,170 800,270 T1300,220",
                  "M-100,200 Q400,150 800,250 T1300,200",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />

            <motion.path
              d="M-100,300 Q500,250 900,350 T1300,300"
              stroke="rgba(124, 58, 237, 0.15)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-100,300 Q500,250 900,350 T1300,300",
                  "M-100,320 Q500,270 900,370 T1300,320",
                  "M-100,300 Q500,250 900,350 T1300,300",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />

            {/* Additional upper waves for more depth */}
            <motion.path
              d="M-200,50 Q200,20 600,80 T1400,60"
              stroke="rgba(139, 92, 246, 0.13)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-200,50 Q200,20 600,80 T1400,60",
                  "M-200,70 Q200,40 600,100 T1400,80",
                  "M-200,50 Q200,20 600,80 T1400,60",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <motion.path
              d="M-150,120 Q350,90 750,140 T1350,120"
              stroke="rgba(168, 85, 247, 0.11)"
              strokeWidth="1.7"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-150,120 Q350,90 750,140 T1350,120",
                  "M-150,140 Q350,110 750,160 T1350,140",
                  "M-150,120 Q350,90 750,140 T1350,120",
                ],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              }}
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Static Main Title */}
            <motion.h1
              className=" lg:text-8xl font-black mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">Hi! I'm </span>
              <span className="text-purple-400">Can</span>
            </motion.h1>

            {/* Typewriter Subtitle */}
            <motion.div
              className="text-2xl sm:text-3xl lg:text-4xl mb-10 text-gray-200 font-semibold h-[1.2em] flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-gray-400">{currentText}</span>
              <span className="animate-pulse text-gray-400 ml-1">|</span>
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl mb-10 text-gray-300 max-w-2xl leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Passionate about building seamless digital experiences from robust
              backend systems to interactive frontend interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <motion.div
                className="flex items-center text-gray-300 text-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="mr-3 text-2xl">⬇</span>
                <span className="font-medium">Scroll Down</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center relative"
          >
            <ProfileCard
              name="Can Saragih"
              title="Fullstack Developer"
              handle="@can_saragih"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/image.png"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => {
                window.location.href = "mailto:canwhardana@gmail.com";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
              ABOUT ME
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              A Glimpse Into My World
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Reads */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">✨</span>
                <h3 className="text-2xl font-semibold">My Reads</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Explore the books shaping my perspectives
              </p>
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-center">
                <div className="text-white font-bold text-2xl mb-2">1984</div>
                <div className="text-white/80">George Orwell</div>
              </div>
            </motion.div>

            {/* My Toolbox */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🛠</span>
                <h3 className="text-2xl font-semibold">My Toolbox</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Explore the technologies and tools I use to craft digital
                experiences
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  "React",
                  "Node.js",
                  "CSS3",
                  "Figma",
                  "JavaScript",
                  "Next.js",
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="bg-purple-500/20 rounded-lg p-3 text-center text-sm"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Beyond the Code */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🎯</span>
                <h3 className="text-2xl font-semibold">Beyond the Code</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Explore my interests and hobbies beyond the digital realms
              </p>
              <div className="space-y-3">
                {[
                  "Painting 🎨",
                  "Guitar 🎸",
                  "Drawing ✏️",
                  "Crocheting 🧶",
                  "Hiking 🥾",
                  "Gaming 🎮",
                  "Fitness 💪",
                ].map((hobby, index) => (
                  <div
                    key={index}
                    className="bg-blue-500/20 rounded-full px-4 py-2 text-sm inline-block mr-2 mb-2"
                  >
                    {hobby}
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4">
                <div className="text-center text-white">
                  <div className="text-sm mb-1">📍 Jakarta, Indonesia</div>
                  <div className="text-xs opacity-80">
                    Available for remote work
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section with Animated Rows */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Skills & Technologies
          </motion.h2>

          {/* Animated skill rows */}
          <div className="space-y-8">
            {/* Row 1 - Moving Right */}
            <motion.div
              animate={{ x: [-100, 100] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex space-x-6 whitespace-nowrap"
            >
              {[...skills.languages, ...skills.frontend].map((skill, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-purple-500/30"
                >
                  <span className="text-white font-medium">{skill}</span>
                </div>
              ))}
            </motion.div>

            {/* Row 2 - Moving Left */}
            <motion.div
              animate={{ x: [100, -100] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex space-x-6 whitespace-nowrap"
            >
              {[...skills.backend, ...skills.tools].map((skill, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-blue-500/30"
                >
                  <span className="text-white font-medium">{skill}</span>
                </div>
              ))}
            </motion.div>

            {/* Row 3 - Moving Right */}
            <motion.div
              animate={{ x: [-100, 100] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex space-x-6 whitespace-nowrap"
            >
              {[
                ...skills.design,
                "Problem Solving",
                "Team Collaboration",
                "Project Management",
              ].map((skill, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-pink-500/30"
                >
                  <span className="text-white font-medium">{skill}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
              WHAT I HAVE DONE SO FAR
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold">Work Experience.</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

            <div className="space-y-12">
              {workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-black"></div>

                  {/* Date */}
                  <div className="absolute left-24 top-0 text-sm text-purple-400 font-medium">
                    {exp.duration}
                  </div>

                  {/* Content */}
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 mt-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {exp.position}
                    </h3>
                    <p className="text-purple-400 text-lg mb-6">
                      {exp.company}
                    </p>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li
                          key={idx}
                          className="text-gray-300 flex items-start"
                        >
                          <span className="text-purple-400 mr-3 mt-1">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
              MY WORK
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">Projects.</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Following projects showcases my skills and experience through
              real-world examples of my work. It reflects my ability to solve
              complex problems, work with different technologies, and manage
              projects effectively.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500"
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Project image placeholder */}
                <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-purple-500/80 text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-gray-400 text-xs px-3 py-1">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-xl text-center hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certificates Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {cert.name}
                </h3>
                <p className="text-gray-300 mb-4">{cert.description}</p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
                >
                  View Certificate →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Footer */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
              GET IN TOUCH
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">Contact.</h2>
            <p className="text-gray-400 text-lg mb-8">
              Ready to bring your ideas to life? Let's collaborate and create
              something amazing together.
            </p>
            <a
              href="mailto:canwhardana@gmail.com"
              className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Say Hello 👋
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-4"
          >
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500"
          >
            © 2024 Can Saragih. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
