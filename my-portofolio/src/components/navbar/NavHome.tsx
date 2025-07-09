"use client";

import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect";
import gsap from "gsap";
import { Code2 } from "lucide-react";

import { useRef } from "react";

export default function NavHome() {
  const el = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      // Set initial state to be off-screen to the left
      gsap.set(el.current, { x: -200, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.5 });
      // Animate to visible position
      tl.to(
        el.current,
        { x: 0, opacity: 1, duration: 2, ease: "power4.inOut" },
        0
      );
    }, el);
  }, []);

  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={el} className="pointer-events-auto fixed left-6 top-6 z-[99999]">
      <div className="overflow-hidden pb-1">
        <button
          onClick={handleClick}
          className="group inline-flex items-center gap-x-2 text-zinc-200 hover:text-[#747cec] transition-colors duration-300"
        >
          <Code2 className="h-6 w-6 transition-transform duration-300 ease-in-out group-hover:rotate-[20deg]" />
          <p className="text-lg font-semibold uppercase tracking-wide">Can</p>
        </button>
      </div>
    </div>
  );
}
