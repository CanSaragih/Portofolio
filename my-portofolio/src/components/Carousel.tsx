"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CarouselProps {
  children: React.ReactNode[];
  itemsPerView?:
    | number
    | {
        mobile?: number;
        tablet?: number;
        desktop?: number;
      };
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export default function Carousel({
  children,
  itemsPerView = 3,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  // Determine current items per view based on screen size
  const getCurrentItemsPerView = () => {
    if (typeof itemsPerView === "object") {
      switch (screenSize) {
        case "mobile":
          return itemsPerView.mobile || 1;
        case "tablet":
          return itemsPerView.tablet || 2;
        case "desktop":
          return itemsPerView.desktop || 3;
        default:
          return itemsPerView.desktop || 3;
      }
    }
    return screenSize === "mobile"
      ? 1
      : screenSize === "tablet"
      ? 2
      : itemsPerView;
  };

  const currentItemsPerView = getCurrentItemsPerView();
  const totalSlides = Math.ceil(children.length / currentItemsPerView);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset current index when screen size changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [screenSize]);

  useEffect(() => {
    if (!autoPlay || !mounted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalSlides, mounted]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!mounted) {
    return <div className={`relative w-full ${className}`}>Loading...</div>;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          animate={{
            x: `-${currentIndex * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className={`w-full flex-shrink-0 grid gap-3 sm:gap-4 lg:gap-6 ${
                currentItemsPerView === 1
                  ? "grid-cols-1"
                  : currentItemsPerView === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              {children
                .slice(
                  slideIndex * currentItemsPerView,
                  (slideIndex + 1) * currentItemsPerView
                )
                .map((child, childIndex) => (
                  <motion.div
                    key={slideIndex * currentItemsPerView + childIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: childIndex * 0.1,
                      duration: 0.5,
                    }}
                    className="w-full"
                  >
                    {child}
                  </motion.div>
                ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-purple-500/30 text-white hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group ${
              screenSize === "mobile" ? "scale-90" : ""
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-purple-500/30 text-white hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group ${
              screenSize === "mobile" ? "scale-90" : ""
            }`}
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-500 scale-125"
                  : "bg-gray-600 hover:bg-purple-400/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
