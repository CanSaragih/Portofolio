"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Lanyard from "@/components/Landyard";
import ContactForm from "@/components/ContactForm";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ContactSection() {
  const contactRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contactRef, {
    once: false,
    amount: 0.0,
  });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  return (
    <motion.section
      id="contact"
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer}
      ref={contactRef}
      className="relative z-10 min-h-screen text-black bg-white bg-[url('/textures/beige-paper.png')] bg-repeat"
    >
      {/* Full-width container for the 3D lanyard */}
      <div className="hidden lg:block absolute left-0 w-full lg:w-1/2 h-full">
        <div className="w-full h-full relative -mt-12 min-h-screen">
          <Lanyard
            position={[0, 0, 25]}
            gravity={[0, -40, 0]}
            start={hasStarted || isInView}
          />
        </div>
      </div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Empty spacer for the lanyard column */}
          <div className="hidden lg:block" />

          {/* Right Column - Contact Form (with padding) */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-start w-full p-4 mt-30 lg:pt-16 lg:pl-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-zinc-800">
              Contact Me
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
