"use client";

import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";
import { certificates } from "@/data/Certificates";
import { fadeInUp } from "@/lib/animations";

export function CertificatesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 mb-10 bg-[#171717]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-4xl text-zinc-100 sm:text-4xl lg:text-5xl font-extrabold text-center mb-16"
        >
          Certifications
        </motion.h2>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Carousel
            itemsPerView={2}
            autoPlay={false}
            showDots={true}
            showArrows={true}
            className="px-4 sm:px-8 lg:px-16"
          >
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-[#1f1f21] backdrop-blur-lg rounded-2xl p-6 border-2 border-[#27272d] hover:border-[#313138] transition-all duration-300 mx-2 h-full flex flex-col justify-between"
              >
                <div>
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
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#27272d]">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors group text-sm font-medium"
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
    </section>
  );
}
