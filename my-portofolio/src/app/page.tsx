"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import ProfileCard from "@/components/ProfileCard";
import Carousel from "@/components/Carousel";
import SkillsNetwork from "@/components/SkillsNetwork";
import ContactForm from "@/components/ContactForm";
import Lanyard from "@/components/Landyard";
import Footer from "@/components/navbar/Footer";
import Nav from "@/components/navbar/Nav";
import { ChatBox } from "@/components/ChatBot";
import Image from "next/image";

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

  const typewriterTexts = useMemo(
    () => ["Web Developer", "UI/UX Designer"],
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

  // Initialize particles setelah mount
  useEffect(() => {
    setMounted(true);
    setBackgroundParticles(
      Array.from({ length: 50 }, () => ({
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
      }))
    );
  }, []);

  const projects = [
    {
      image: "/img-project/ParkGo.png",
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
      image: "/img-project/ShopHub.png",
      name: "Shophub",
      url: "https://github.com/H8-FSJS-P3S5/gc02-CanSaragih",
      description:
        "Web-based e-commerce platform that allows you to browse products and manage wish lists.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      category: "Web App",
      demo: "https://www.itscan.my.id/",
    },
    {
      image: "/img-project/SocialMediaApp.png",
      name: "Social Media App",
      url: "https://github.com/H8-FSJS-P3S5/gc01-CanSaragih",
      description:
        "A fullstack mobile-based social media application built with React Native",
      tech: ["React Native", "Apollo Server", "GraphQL", "MongoDB", "Redis"],
      category: "Mobile App",
      demo: "https://shorturl.at/IAYEp",
    },
    {
      image: "/img-project/ChatVerse.png",
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
      image: "/img-project/Planorama.png",
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
      image: "/img-project/InstaLook.png",
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
      image: "/img-project/quickkick.png",
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
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden"
      >
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
              <span className="text-white">Hi! I&apos;m </span>
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
              style={{ position: "relative" }}
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
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
              ABOUT ME
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">About me</h2>
          </motion.div>

          {/* About Text */}
          <motion.div
            variants={fadeInUp}
            className="w-full max-w-7xl px-4 mx-auto text-center mb-20"
          >
            <div className="space-y-6">
              <p className="text-gray-300 text-xl leading-relaxed text-justify">
                Hi! I&apos;m Can Saragih, a passionate Frontend Developer with a
                strong focus on crafting modern and responsive user interfaces
                using React, Next.js, TypeScript, and Tailwind CSS. I love
                building seamless user experiences and clean design systems that
                not only look good but also perform efficiently.
              </p>

              <p className="text-gray-300 text-xl leading-relaxed text-justify">
                Beyond technical skills, I enjoy turning ideas into visual
                experiences, and I&apos;m always exploring tools like Framer
                Motion and Lottie to bring animations to life. My goal is to
                keep growing as a developer, contribute to meaningful projects,
                and eventually work on large-scale applications that make a
                difference.
              </p>

              <p className="text-gray-300 text-xl  text-justify">
                When I&apos;m not coding, you&apos;ll find me learning new
                frameworks, tweaking UI/UX designs, or exploring open-source
                projects on GitHub.
              </p>
            </div>
          </motion.div>

          {/* School Experience with animated cards */}
          <div className="relative">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white">Education</h2>
            </motion.div>

            {/* Left gradient mask */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

            {/* Right gradient mask */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

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
                      className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-purple-500/20 flex-shrink-0 w-[420px] shadow-lg shadow-purple-500/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
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
                          <p className="text-purple-400 text-xs font-medium">
                            {school.totalDuration}
                          </p>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-white mb-2 whitespace-normal leading-tight">
                        {school.institution}
                      </h4>
                      <p className="text-purple-400 text-sm mb-3 whitespace-normal">
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
      </motion.section>

      {/* Skills Section with Filter and Animated Connections */}
      <motion.section
        id="skills"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
              MY SKILLS
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">Skills</h2>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 p-2 bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20">
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Network */}
          <motion.div variants={fadeInUp}>
            <SkillsNetwork
              skills={
                skillCategories[activeCategory as keyof typeof skillCategories]
              }
              key={activeCategory}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
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
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
              MY WORK
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">Projects</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Following projects showcases my skills and experience through
              real-world examples of my work. It reflects my ability to solve
              complex problems, work with different technologies, and manage
              projects effectively.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Carousel
              itemsPerView={3}
              autoPlay={false}
              showDots={true}
              showArrows={true}
              className="px-16"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 mx-2 flex flex-col justify-between min-h-[420px]"
                >
                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden">
                    {/* Gambar */}
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay black transparan saat hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Label kategori */}
                    <div className="absolute top-4 left-4 bg-purple-500/80 text-white px-3 py-1 rounded-full text-sm z-10">
                      {project.category}
                    </div>
                  </div>

                  {/* Konten Card */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3 min-h-[72px]">
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
                        className="flex-1 bg-gradient-to-r from-purple-700/30 to-indigo-700/30 text-white border border-purple-500/30 backdrop-blur-md py-2 px-4 rounded-xl text-center hover:from-purple-600/40 hover:to-indigo-600/40 hover:border-purple-400/50 transition-all duration-300 shadow-inner shadow-purple-800/20"
                      >
                        View Project →
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-purple-300 hover:text-purple-500 transition-colors"
                          title="Live Demo"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c0 4.418 1.79 8 4 8s4-3.582 4-8m-8 0c0 4.418-1.79 8-4 8s-4-3.582-4-8"
                            />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        </div>
      </motion.section>

      {/* Certificates Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 mb-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
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
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-green-600/20 hover:border-green-600/50 transition-all duration-300 mx-2 h-full"
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

        <div className="absolute left-0 w-full lg:w-1/2 h-full">
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
