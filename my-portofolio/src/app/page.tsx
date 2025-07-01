"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import ProfileCard from "@/components/ProfileCard";
import SkillsNetwork from "@/components/SkillsNetwork";
import ContactForm from "@/components/ContactForm";
import Lanyard from "@/components/Landyard";
import Footer from "@/components/navbar/Footer";
import Nav from "@/components/navbar/Nav";
import { ChatBox } from "@/components/ChatBot";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import MagneticEffect from "@/components/providers/MagneticEffect";

export default function Home() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [mounted, setMounted] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState<
    Array<{ left: string; top: string }>
  >([]);
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, {
    once: false,
    amount: 0.0,
  });

  // Add cleanup refs
  const animationRefs = useRef<Array<() => void>>([]);
  const isMountedRef = useRef(true);

  const typewriterTexts = useMemo(
    () => ["Fullstack Developer", "Software Engineer"],
    []
  );

  const skillCategories = {
    Frontend: [
      {
        name: "React.js",
        icon: "/react.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Next.js",
        icon: "/nextjs.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Redux",
        icon: "/redux.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "React Native",
        icon: "/react.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "EJS",
        icon: "/ejs.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "HTML",
        icon: "/html.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "CSS",
        icon: "/css.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Tailwind CSS",
        icon: "/tailwind.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Bootstrap",
        icon: "/bootstrap.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Apollo Client",
        icon: "/apollo client.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
    ],
    Backend: [
      {
        name: "Node.js",
        icon: "/nodejs.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "TypeScript",
        icon: "/typescript.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Express.js",
        icon: "/express.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "GraphQL",
        icon: "/graphql.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Apollo Server",
        icon: "/apollo client.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Sequelize",
        icon: "/sequelize.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "PostgreSQL",
        icon: "/postgresql.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "MongoDB",
        icon: "/mongodb.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Redis",
        icon: "/redis.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "REST API",
        icon: "/rest.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
    ],
    Tools: [
      {
        name: "Git",
        icon: "/github.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Vite",
        icon: "/vite.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Expo Go",
        icon: "/expo.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Socket.IO",
        icon: "/socketio.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
    ],
    Design: [
      {
        name: "After Effects",
        icon: "/after effect.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Premiere Pro",
        icon: "/premiere.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "Photoshop",
        icon: "/photoshop.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
      {
        name: "CorelDRAW",
        icon: "/coreldraw.png",
        color: "from-gray-600/20 to-gray-400/20",
      },
    ],
  };

  // Typewriter effect with cleanup - Fixed version
  useEffect(() => {
    if (!isMountedRef.current) return;

    const currentFullText = typewriterTexts[textIndex];
    const typeSpeed = isDeleting ? 75 : 150;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isMountedRef.current) return;

      if (!isDeleting && currentText === currentFullText) {
        // Pause at the end before starting to delete
        const pauseTimer = setTimeout(() => {
          if (isMountedRef.current) {
            setIsDeleting(true);
          }
        }, pauseTime);

        const cleanup = () => clearTimeout(pauseTimer);
        animationRefs.current.push(cleanup);
        return cleanup;
      } else if (isDeleting && currentText === "") {
        // Start typing the next text
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      } else if (isDeleting) {
        // Continue deleting
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
      } else {
        // Continue typing
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
      }
    }, typeSpeed);

    const cleanup = () => clearTimeout(timer);
    animationRefs.current.push(cleanup);
    return cleanup;
  }, [currentText, isDeleting, textIndex, typewriterTexts]);

  // Initialize component with cleanup - Enhanced version
  useEffect(() => {
    // Set initial state
    setMounted(true);
    setCurrentText(""); // Start with empty text
    setIsDeleting(false);
    setTextIndex(0);

    // Generate background particles
    setBackgroundParticles(
      Array.from({ length: 50 }, () => ({
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
      }))
    );

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      // Cleanup all running animations
      animationRefs.current.forEach((cleanup) => {
        try {
          cleanup();
        } catch (error) {
          // Ignore cleanup errors
          console.warn("Animation cleanup error:", error);
        }
      });
      animationRefs.current = [];
    };
  }, []);

  // Add navigation state
  const [isNavigating, setIsNavigating] = useState(false);

  // Handle navigation with proper cleanup - simplified approach
  const handleLoadMore = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isNavigating) return; // Prevent double clicks

      try {
        setIsNavigating(true);

        // Immediate cleanup without waiting
        isMountedRef.current = false;
        animationRefs.current.forEach((cleanup) => {
          try {
            cleanup();
          } catch (error) {
            console.log(error);

            // Ignore cleanup errors
          }
        });
        animationRefs.current = [];

        // Use window.location for more reliable navigation
        window.location.href = "/projects";
      } catch (error) {
        console.error("Navigation error:", error);
        setIsNavigating(false);
      }
    },
    [isNavigating]
  );

  const projects = [
    {
      image: "/Img-project/ParkGo.png",
      name: "ParkGo",
      url: "https://github.com/orgs/Parkir-Cepat/repositories",
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

  const workExperience = [
    {
      position: "Video Editor & Graphic Designer",
      company: "Custom Kekinian",
      duration: "Aug 2019 - Jan 2025 ",
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
      name: "Participant SMK Competency Contest (LKS) – Web Design",
      description:
        "participant in the provincial-level Web Design competition (LKS SMK) representing SMK RK Bintang Timur, Pematang Siantar.",
      url: "/LksCertification.pdf",
    },
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
        staggerChildren: 0.2,
      },
    },
  };

  const schoolExperience = [
    {
      institution: "SMK Bintang Timur Pematang Siantar",
      program: "RPL (Rekayasa Perangkat Lunak)",
      duration: "Jun 2016 - Apr 2019",
      totalDuration: "3 years ",
      description:
        "Focused on software engineering fundamentals and programming basics.",
    },
    {
      institution: "University IBBI",
      program: "Teknik Informatika ",
      duration: "Sep 2019 - Dec 2023",
      totalDuration: "4 years ",
      description:
        "Bachelor's degree in Informatics Engineering with computer science principles.",
    },
    {
      institution: "Bootcamp Hacktiv8",
      program: "Fullstack Javascript Immersive",
      duration: "Feb 2025 - Jun 2025",
      totalDuration: "4 months",
      description: "Intensive bootcamp focused on modern JavaScript ecosystem.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

        {/* Floating particles dengan data yang sudah di-generate */}
        {mounted &&
          backgroundParticles.map((particle, i) => (
            <motion.div
              key={`bg-particle-${i}`}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
              animate={{
                x: [0, 50, 0],
                y: [0, 50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
      </div>

      <ChatBox />
      <Nav />

      {/* Hero Section */}
      <motion.section
        id="home"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 overflow-hidden bg-[#171717]"
      >
        {/* Abstract Wave Background */}
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient
                id="wave-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(75, 85, 99, 0.08)" />
                <stop offset="50%" stopColor="rgba(107, 114, 128, 0.12)" />
                <stop offset="100%" stopColor="rgba(55, 65, 81, 0.06)" />
              </linearGradient>

              <linearGradient
                id="wave-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(55, 65, 81, 0.10)" />
                <stop offset="50%" stopColor="rgba(75, 85, 99, 0.15)" />
                <stop offset="100%" stopColor="rgba(31, 41, 55, 0.08)" />
              </linearGradient>

              <linearGradient
                id="wave-gradient-3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(31, 41, 55, 0.12)" />
                <stop offset="50%" stopColor="rgba(55, 65, 81, 0.18)" />
                <stop offset="100%" stopColor="rgba(17, 24, 39, 0.10)" />
              </linearGradient>

              <linearGradient
                id="stroke-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(156, 163, 175, 0.0)" />
                <stop offset="30%" stopColor="rgba(156, 163, 175, 0.15)" />
                <stop offset="70%" stopColor="rgba(156, 163, 175, 0.15)" />
                <stop offset="100%" stopColor="rgba(156, 163, 175, 0.0)" />
              </linearGradient>

              <linearGradient
                id="stroke-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(107, 114, 128, 0.0)" />
                <stop offset="25%" stopColor="rgba(107, 114, 128, 0.18)" />
                <stop offset="75%" stopColor="rgba(107, 114, 128, 0.18)" />
                <stop offset="100%" stopColor="rgba(107, 114, 128, 0.0)" />
              </linearGradient>
            </defs>

            {/* Elegant topographic contour lines */}
            <motion.path
              d="M-100,150 Q200,120 500,160 T1100,140 Q1200,135 1300,140"
              stroke="url(#stroke-gradient-1)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-100,150 Q200,120 500,160 T1100,140 Q1200,135 1300,140",
                  "M-100,160 Q200,130 500,170 T1100,150 Q1200,145 1300,150",
                  "M-100,150 Q200,120 500,160 T1100,140 Q1200,135 1300,140",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.path
              d="M-150,200 Q250,170 550,210 T1150,190 Q1250,185 1350,190"
              stroke="url(#stroke-gradient-2)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-150,200 Q250,170 550,210 T1150,190 Q1250,185 1350,190",
                  "M-150,210 Q250,180 550,220 T1150,200 Q1250,195 1350,200",
                  "M-150,200 Q250,170 550,210 T1150,190 Q1250,185 1350,190",
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
              d="M-200,250 Q300,220 600,260 T1200,240 Q1300,235 1400,240"
              stroke="rgba(156, 163, 175, 0.12)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-200,250 Q300,220 600,260 T1200,240 Q1300,235 1400,240",
                  "M-200,260 Q300,230 600,270 T1200,250 Q1300,245 1400,250",
                  "M-200,250 Q300,220 600,260 T1200,240 Q1300,235 1400,240",
                ],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            <motion.path
              d="M-100,300 Q350,270 700,310 T1300,290"
              stroke="rgba(107, 114, 128, 0.10)"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-100,300 Q350,270 700,310 T1300,290",
                  "M-100,310 Q350,280 700,320 T1300,300",
                  "M-100,300 Q350,270 700,310 T1300,290",
                ],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />

            <motion.path
              d="M-250,350 Q400,320 800,360 T1450,340"
              stroke="rgba(75, 85, 99, 0.08)"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-250,350 Q400,320 800,360 T1450,340",
                  "M-250,360 Q400,330 800,370 T1450,350",
                  "M-250,350 Q400,320 800,360 T1450,340",
                ],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />

            {/* Additional subtle upper contours */}
            <motion.path
              d="M-50,80 Q150,60 350,90 T750,70 Q950,65 1150,70"
              stroke="rgba(156, 163, 175, 0.06)"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-50,80 Q150,60 350,90 T750,70 Q950,65 1150,70",
                  "M-50,85 Q150,65 350,95 T750,75 Q950,70 1150,75",
                  "M-50,80 Q150,60 350,90 T750,70 Q950,65 1150,70",
                ],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <motion.path
              d="M-120,120 Q180,100 380,130 T780,110 Q980,105 1180,110"
              stroke="rgba(107, 114, 128, 0.05)"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M-120,120 Q180,100 380,130 T780,110 Q980,105 1180,110",
                  "M-120,125 Q180,105 380,135 T780,115 Q980,110 1180,115",
                  "M-120,120 Q180,100 380,130 T780,110 Q980,105 1180,110",
                ],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Static Main Title */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">Hi! I&apos;m </span>
              <span className="text-[#747cec]">Can</span>
            </motion.h1>

            {/* Typewriter Subtitle - Fixed Animation */}
            <motion.div
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 sm:mb-10 text-gray-200 font-semibold h-[1.5em] flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-gray-400 min-h-[1.2em] flex items-center">
                {currentText}
                <span
                  className={`ml-1 transition-opacity duration-100 ${
                    currentText ? "animate-pulse" : "animate-pulse opacity-100"
                  }`}
                >
                  |
                </span>
              </span>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ position: "relative" }}
            >
              Passionate about building seamless digital experiences from robust
              backend systems to interactive frontend interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              <motion.div
                className="flex items-center text-gray-300 text-sm sm:text-base md:text-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="mr-2 sm:mr-3 text-lg sm:text-xl md:text-2xl">
                  ⬇
                </span>
                <span className="font-medium">Scroll Down</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center relative order-1 lg:order-2 mb-8 lg:mb-0"
          >
            <div className="scale-75 sm:scale-90 md:scale-100">
              <ProfileCard
                name="Can Saragih"
                title="Fullstack Developer"
                handle="can_saragih"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/image.png"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => {
                  window.location.href = "mailto:canwhardana@gmail.com";
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Me Section */}
      <motion.section
        id="about"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#171717]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold mb-6 sm:mb-8">
              About me
            </h2>
          </motion.div>

          {/* About Text */}
          <motion.div
            variants={fadeInUp}
            className="w-full max-w-6xl px-2 sm:px-4 mx-auto text-center mb-16 sm:mb-20 font-raleway"
          >
            <div className="space-y-4 sm:space-y-6">
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
                Hi! I&apos;m Can Saragih, a passionate Frontend Developer with a
                strong focus on crafting modern and responsive user interfaces
                using React, Next.js, TypeScript, and Tailwind CSS. I love
                building seamless user experiences and clean design systems that
                not only look good but also perform efficiently.
              </p>

              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
                Beyond technical skills, I enjoy turning ideas into visual
                experiences, and I&apos;m always exploring tools like Framer
                Motion and Lottie to bring animations to life. My goal is to
                keep growing as a developer, contribute to meaningful projects,
                and eventually work on large-scale applications that make a
                difference.
              </p>

              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
                When I&apos;m not coding, you&apos;ll find me learning new
                frameworks, tweaking UI/UX designs, or exploring open-source
                projects on GitHub.
              </p>
            </div>
          </motion.div>

          {/* School Experience with animated cards */}
          <div className="relative">
            <motion.div
              variants={fadeInUp}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-white">
                Education
              </h2>
            </motion.div>

            {/* Mobile: Simple vertical layout */}
            <div className="block md:hidden">
              <motion.div variants={fadeInUp} className="space-y-6">
                {schoolExperience.map((school, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-[#1f1f21] backdrop-blur-lg rounded-2xl p-4 sm:p-6 border-2 border-[#27272d] shadow-lg shadow-purple-500/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                      </div>
                      <div className="text-right ml-3">
                        <p className="text-gray-400 text-xs leading-tight">
                          {school.duration}
                        </p>
                        <p className="text-[#959bf5] text-xs font-medium">
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
              </motion.div>
            </div>

            {/* Desktop: Horizontal scrolling layout */}
            <div className="hidden md:block">
              {/* Left gradient mask */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#171717] via-#171717/80 to-transparent z-10 pointer-events-none"></div>

              {/* Right gradient mask */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#171717] via-#171717/80  to-transparent z-10 pointer-events-none"></div>

              <div className="overflow-hidden">
                {/* Outer motion for fade in when in viewport */}
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Inner motion for infinite horizontal scroll */}
                  <motion.div
                    animate={{ x: [-200, 200] }}
                    transition={{
                      duration: 35,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex space-x-8 whitespace-nowrap"
                    style={{ width: "300%" }}
                  >
                    {[
                      ...schoolExperience,
                      ...schoolExperience,
                      ...schoolExperience,
                    ].map((school, index) => (
                      <div
                        key={index}
                        className="bg-[#1f1f21] backdrop-blur-lg rounded-3xl p-6 border-2 border-[#27272d] flex-shrink-0 w-[420px] shadow-lg shadow-purple-500/10"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#7278c7] to-[#8e94ef] rounded-lg flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                              />
                            </svg>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-xs">
                              {school.duration}
                            </p>
                            <p className="text-[#959bf5] text-xs font-medium">
                              {school.totalDuration}
                            </p>
                          </div>
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-2 whitespace-normal leading-tight">
                          {school.institution}
                        </h4>
                        <p className="text-[#959bf5] text-sm mb-3 whitespace-normal">
                          {school.program}
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-normal line-clamp-2">
                          {school.description}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section with Filter and Animated Connections */}
      <motion.section
        id="skills"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-[#171717]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold mb-8">
              My Skills
            </h2>
          </motion.div>

          {/* Filter Buttons - Enhanced Mobile Responsive */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center mb-12 px-2"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-3 bg-[#1f1f21] backdrop-blur-lg rounded-xl sm:rounded-2xl max-w-full">
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-[#525bce]/50 text-white font-bold"
                      : "text-gray-300 hover:text-white hover:bg-[#2b2b2f]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Network - Mobile Optimized */}
          <motion.div variants={fadeInUp} className="px-2 sm:px-0">
            <SkillsNetwork
              skills={
                skillCategories[activeCategory as keyof typeof skillCategories]
              }
              key={activeCategory}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#171717]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8">
              Recent Projects
            </h2>
          </motion.div>

          {/* Projects List */}
          <motion.div variants={fadeInUp} className="space-y-10">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-[#1f1f21] hover:bg-[#232326] rounded-xl pt-35 transition-colors duration-300 min-h-[480px]"
              >
                {/* Left Side - Icons and Content */}
                <div className="pt-0 -mt-25 pb-8 pl-10 py-8 pr-8">
                  {/* GitHub and Demo Icons */}
                  <motion.div
                    className="flex items-center gap-4 ml-5"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index + 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-13 h-13 text-white hover:text-[#aaaaaa] transition-colors"
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
                          className="w-13 h-13 p-2 text-[#1c1c1c] bg-white rounded-full hover:bg-[#aaaaaa] transition-colors duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path d="M14 3a1 1 0 0 0 0 2h3.586L10.293 12.293a1 1 0 1 0 1.414 1.414L19 6.414V10a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-6Zm5 11a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2H7a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1Z" />
                        </svg>
                      </a>
                    )}
                  </motion.div>

                  {/* Project Title */}
                  <motion.h3
                    className="text-3xl sm:text-2xl lg:text-5xl font-bold text-white leading-tight mt-10"
                    initial={{ opacity: 0, x: -50 }} // dari kiri
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index + 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {project.name}
                  </motion.h3>

                  {/* Project Description */}
                  <motion.p
                    className="text-[#A0A0A0] text-sm font-bold leading-relaxed mt-4"
                    initial={{ opacity: 0, x: 50 }} // dari kanan
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index + 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    className="flex flex-wrap gap-x-3 gap-y-2 mt-4"
                    initial={{ opacity: 0, y: -30 }} // dari atas
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index + 0.8, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-[#36363b] rounded-lg px-2 py-1 text-[#A0A0A0] text-xs font-medium cursor-pointer hover:bg-[#484850] transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Right Side - Project Image */}
                <div className="hidden lg:flex h-full items-stretch p-0 m-0">
                  <div className="w-full h-full relative rounded overflow-hidden shadow-2xl">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div variants={fadeInUp} className="text-center mt-20 ">
            <h3 className="text-gray-100 sm:text-2xl lg:text-3xl font-extrabold mb-5 tracking-widest ">
              See other project
            </h3>
            <MagneticEffect>
              <button
                onClick={handleLoadMore}
                disabled={isNavigating}
                className={`inline-flex items-center gap-2 bg-[#242424] text-white px-8 py-4 rounded-lg hover:bg-[#3D3D3D] transition-all duration-300 font-medium cursor-pointer ${
                  isNavigating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span>{isNavigating ? "Loading..." : "Load More"}</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </MagneticEffect>
          </motion.div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#171717]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white">
              Work Experience
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#555ee7]/80 via-[#555ee7]/80 to-transparent"></div>

            <div className="space-y-12">
              {workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 bg-[#555ee7]/80 rounded-full border-4 border-[#171717] shadow-lg shadow-purple-500/50"></div>

                  {/* Content card */}
                  <div className="bg-[#1f1f21] rounded-2xl p-8 border-2 border-[#27272d] hover:border-[#313138] transition-all duration-300 mt-8 relative overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl pointer-events-none"></div>

                    {/* Duration - Top Right */}
                    <div className="absolute top-6 right-6 text-[#959bf5] text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-sm z-20">
                      {exp.duration}
                    </div>

                    {/* Header section */}
                    <div className="relative z-10 mb-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray mb-1">
                          {exp.position}
                        </h3>
                      </div>
                      <p className="text-[#959bf5] text-lg font-medium mb-4">
                        {exp.company}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="relative z-10">
                      <h4 className="text-gray-300 font-semibold mb-4 text-sm uppercase tracking-wide">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li
                            key={idx}
                            className="text-gray-300 flex items-start leading-relaxed"
                          >
                            <div className="w-2 h-2 bg-white/50 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <span className="text-sm">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certificates Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 mb-10 bg-[#171717]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-16"
          >
            Certifications
          </motion.h2>

          <motion.div variants={fadeInUp}>
            <Carousel
              itemsPerView={2}
              autoPlay={false}
              showDots={true}
              showArrows={true}
              className="px-16"
            >
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-[#1f1f21] backdrop-blur-lg rounded-2xl p-6 border-2 border-[#27272d] hover:border-[#313138] transition-all duration-300 mx-2 h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {cert.name}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="mt-auto">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors group"
                    >
                      <span>View Certificate</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        ref={contactRef}
        className="relative z-10 min-h-screen text-black bg-white bg-[url('/textures/beige-paper.png')] bg-repeat"
      >
        {/* Full-width container for the lanyard */}

        <div className="hidden lg:block absolute left-0 w-full lg:w-1/2 h-full">
          <div className="w-full h-full relative -mt-12 min-h-screen">
            <Lanyard
              position={[0, 0, 25]}
              gravity={[0, -40, 0]}
              start={isInView}
            />
          </div>
        </div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Empty spacer for the lanyard column */}
            <div className="hidden lg:block"></div>

            {/* Right Column - Contact Form (with padding) */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-start w-full p-4  mt-30 lg:pt-16 lg:pl-8"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-black">
                Contact Me
              </h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}

      <Footer />
    </div>
  );
}
