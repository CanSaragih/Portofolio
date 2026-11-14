"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ServicesWithAnimatedHoverModal,
  type AnimatedHoverItem,
} from "@/components/ui/services-with-animated-hover-modal";
import { certificates } from "@/data/Certificates";
import { fadeInUp } from "@/lib/animations";

export function CertificatesSection() {
  const certificateItems: AnimatedHoverItem[] = useMemo(
    () =>
      certificates.map((cert) => ({
        id: cert.id,
        title: cert.name,
        subtitle: cert.issuer,
        category: cert.category,
        description: cert.description,
        url: cert.url,
        color: cert.color,
        image: cert.image,
        year: cert.year,
      })),
    [],
  );

  return (
    <section
      id="certificates"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#171717]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider text-[#ffaa40] uppercase mb-2">
            Credentials & Achievements
          </span>
          <h2 className="text-3xl text-zinc-100 sm:text-4xl lg:text-7xl font-extrabold mb-3 sm:mb-4">
            Certifications
          </h2>
        </motion.div>

        {/* Animated Hover Modal List */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <ServicesWithAnimatedHoverModal items={certificateItems} />
        </motion.div>
      </div>
    </section>
  );
}

export default CertificatesSection;
