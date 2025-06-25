"use client";

import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { Download } from "lucide-react";

import NavMenuBtn from "./NavMenuBtn";
import NavMenuLine from "./NavMenuLine";
import NavMenuLink from "./NavMenuLink";
import NavMenuSocial from "./NavMenuSocial";
import MagneticEffect from "../providers/MagneticEffect";

export default function NavMenu() {
  const [active, setActive] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleHamburger = (status: boolean) => {
    setActive(status);
  };

  // Enhanced GSAP animation with mobile support
  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;

    gsap.context(() => {
      if (active) {
        gsap.to(menuRef.current, {
          x: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onStart: () => {
            // Ensure menu is visible during animation
            if (menuRef.current) {
              menuRef.current.style.visibility = "visible";
            }
          },
        });
        gsap.to(".nav-rounded", {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(menuBgRef.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
          ease: "power3.inOut",
        });

        // Prevent body scroll when menu is open
        document.body.style.overflow = "hidden";
      } else {
        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            // Hide menu after animation completes
            if (menuRef.current) {
              menuRef.current.style.visibility = "hidden";
            }
          },
        });
        gsap.to(".nav-rounded", {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(menuBgRef.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.8,
          ease: "power3.inOut",
        });

        // Restore body scroll
        document.body.style.overflow = "unset";
      }
    }, menuRef);
  }, [active, mounted]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(false);
    }
  };

  const handleScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      // Force scroll to work properly
      const yOffset = -100; // Adjust for navbar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      });

      // Alternative fallback method
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    }
    setActive(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div
        ref={menuBgRef}
        className={cn(
          "nav-menu-bg fixed left-0 top-0 h-screen w-full bg-gradient-to-r from-black/40 via-black/50 to-black/60 opacity-0 invisible z-40",
          active ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={() => setActive(false)}
        onKeyDown={() => handleKeyDown}
      ></div>
      <div
        ref={menuRef}
        className={cn(
          "nav-menu pointer-events-auto fixed right-0 top-0 flex h-screen translate-x-[100%] flex-col justify-between bg-zinc-800 pb-8 md:pb-12 pt-[clamp(3.5rem,10vh,5rem)] text-white will-change-transform z-50 dark:bg-zinc-200 dark:text-zinc-800",
          // Responsive width - full width on mobile, 500px on desktop
          "w-full sm:w-[400px] md:w-[450px] lg:w-[500px]",
          // Text size responsive
          "text-4xl sm:text-5xl md:text-6xl"
        )}
        style={{
          visibility: active ? "visible" : "hidden",
        }}
      >
        <div className="nav-rounded absolute left-0 top-[-10%] z-[-1] h-[120%] w-[80%] -translate-x-1/2 rounded-[100%_100%] bg-zinc-800 will-change-transform dark:bg-zinc-200"></div>

        <div>
          <NavMenuLine title={"Navigation"} />
        </div>

        <div className="space-y-2 md:space-y-0">
          <MagneticEffect disabled={isMobile}>
            <NavMenuLink
              title={"Home"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#home")}
            />
          </MagneticEffect>
          <MagneticEffect disabled={isMobile}>
            <NavMenuLink
              title={"About"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#about")}
            />
          </MagneticEffect>
          <MagneticEffect disabled={isMobile}>
            <NavMenuLink
              title={"My Skills"}
              active={active}
              duration={1.2}
              handleScroll={() => handleScroll("#skills")}
            />
          </MagneticEffect>
          <MagneticEffect disabled={isMobile}>
            <NavMenuLink
              title={"Projects"}
              active={active}
              duration={1.2}
              handleScroll={() => handleScroll("#projects")}
            />
          </MagneticEffect>
          <MagneticEffect disabled={isMobile}>
            <NavMenuLink
              title={"Contact"}
              active={active}
              duration={1.3}
              handleScroll={() => handleScroll("#contact")}
            />
          </MagneticEffect>
        </div>

        <div>
          <NavMenuLine title={"Links"} />
          <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2 px-[clamp(1.25rem,3vw,2.5rem)] text-sm sm:text-base">
            <MagneticEffect disabled={isMobile}>
              <NavMenuSocial
                title="Github"
                active={active}
                classes="pr-0 sm:pr-6"
                duration={1}
                link="https://github.com/CanSaragih"
              />
            </MagneticEffect>
            <MagneticEffect disabled={isMobile}>
              <NavMenuSocial
                title="Linkedin"
                active={active}
                classes="pr-0 sm:pr-6"
                duration={1.2}
                link="https://www.linkedin.com/in/can-saragih/"
              />
            </MagneticEffect>
            <MagneticEffect disabled={isMobile}>
              <NavMenuSocial
                title="Instagram"
                active={active}
                classes="pr-0 sm:pr-6"
                duration={1.4}
                link="https://www.instagram.com/can_whardana/"
              />
            </MagneticEffect>
            <MagneticEffect disabled={isMobile}>
              <NavMenuSocial
                title="Email"
                active={active}
                classes="pr-0 sm:pr-6"
                duration={1.8}
                link="mailto:canwhardana@gmail.com"
              />
            </MagneticEffect>
          </div>

          {/* Download CV Section */}
          <div className="px-[clamp(1.25rem,3vw,2.5rem)] mt-4 sm:mt-6">
            <MagneticEffect disabled={isMobile}>
              <a
                href="/cv/Can Whardana Saragih.pdf"
                download
                className="inline-flex items-center gap-3 text-sm sm:text-base text-white dark:text-zinc-800 hover:text-purple-700 dark:hover:text-purple-800 transition-colors duration-300 group"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-[-2px] transition-transform duration-200 ease-out" />
                <span className="font-semibold">Download CV</span>
              </a>
            </MagneticEffect>
          </div>
        </div>
      </div>
      <NavMenuBtn active={active} toggleHamburger={toggleHamburger} />
    </>
  );
}
