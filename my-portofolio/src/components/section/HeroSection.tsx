"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import { WaveBackground } from "./WaveBackground";

const TYPEWRITER_ROLES = ["Fullstack Developer", "Frontend Developer"];

export function HeroSection() {
  const [roleText, setRoleText] = useState("Fullstack Developer");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const isMountedRef = useRef(true);

  // Typewriter effect
  useEffect(() => {
    isMountedRef.current = true;
    const currentFull = TYPEWRITER_ROLES[roleIndex];
    const typeSpeed = isDeleting ? 40 : 90;
    const pauseTime = isDeleting ? 300 : 2200;

    let timer: NodeJS.Timeout;

    if (!isDeleting && roleText === currentFull) {
      timer = setTimeout(() => {
        if (isMountedRef.current) setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && roleText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % TYPEWRITER_ROLES.length);
    } else {
      timer = setTimeout(() => {
        if (!isMountedRef.current) return;
        const nextLength = isDeleting ? roleText.length - 1 : roleText.length + 1;
        setRoleText(currentFull.substring(0, nextLength));
      }, typeSpeed);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [roleText, isDeleting, roleIndex]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleScrollDown = () => {
    const aboutEl = document.querySelector("#about");
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "mailto:canwhardana@gmail.com";
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 overflow-hidden bg-[#171717]"
    >
      <WaveBackground />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 w-full">
        {/* Left Column: Intro */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-white">Hi! I&apos;m </span>
            <span className="text-[#747cec]">Can</span>
          </motion.h1>

          {/* Typewriter Subtitle */}
          <motion.div
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 sm:mb-8 text-gray-200 font-semibold h-[1.5em] flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-zinc-400/80 min-h-[1.2em] flex items-center transition-all duration-300">
              {roleText}
              <span
                className={`ml-1 text-zinc-400 font-bold transition-opacity duration-100 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              >
                |
              </span>
            </span>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Passionate about building seamless digital experiences from robust backend
            systems to interactive frontend interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center lg:justify-start"
          >
            <button
              onClick={handleScrollDown}
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base md:text-lg group cursor-pointer"
              aria-label="Scroll down to about section"
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mr-2 sm:mr-3"
              >
                <ChevronsDown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.span>
              <span className="font-medium">Scroll Down</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Tilt Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
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
              priority={true}
              onContactClick={handleContactClick}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

