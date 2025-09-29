import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { workExperience } from "@/data/WorkExperience";
import { virtualInternships } from "@/data/VirtualInterenships";

export function Experience() {
  const timelineData = [
    {
      title: "Work Experience",
      content: (
        <div className="space-y-6">
          {workExperience.map((exp, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1f1f21] via-[#252527] to-[#2a2a2c] border border-neutral-700/40 hover:border-neutral-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-neutral-400/[0.03] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-xl text-neutral-100 group-hover:text-neutral-50 transition-colors duration-300">
                    {exp.position}
                  </h4>
                  <div className="h-2 w-2 rounded-full bg-neutral-400 group-hover:bg-neutral-300 transition-colors duration-300" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-neutral-800/60 text-neutral-300 rounded-full border border-neutral-600/40 group-hover:border-neutral-500/50 transition-colors duration-300">
                    {exp.company}
                  </span>
                  <span className="text-neutral-500 text-sm">•</span>
                  <span className="text-neutral-400 text-sm">{exp.title}</span>
                </div>

                <div className="space-y-2">
                  {exp.responsibilities.map((r, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-500 group-hover:bg-neutral-400 transition-colors duration-300 flex-shrink-0" />
                      <p className="text-neutral-300 text-sm leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                        {r}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Virtual Internships",
      content: (
        <div className="space-y-6">
          {virtualInternships.map((exp, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1f1f21] via-[#252527] to-[#2a2a2c] border border-neutral-700/40 hover:border-neutral-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-neutral-400/[0.03] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-xl text-neutral-100 group-hover:text-neutral-50 transition-colors duration-300">
                    {exp.position}
                  </h4>
                  <div className="h-2 w-2 rounded-full bg-neutral-400 group-hover:bg-neutral-300 transition-colors duration-300" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-neutral-800/60 text-neutral-300 rounded-full border border-neutral-600/40 group-hover:border-neutral-500/50 transition-colors duration-300">
                    {exp.company}
                  </span>
                  <span className="text-neutral-500 text-sm">•</span>
                  <span className="text-neutral-400 text-sm">{exp.title}</span>
                </div>

                <div className="space-y-2 mb-4">
                  {exp.responsibilities.map((r, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-500 group-hover:bg-neutral-400 transition-colors duration-300 flex-shrink-0" />
                      <p className="text-neutral-300 text-sm leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                        {r}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Enhanced certificate viewer */}
                {exp.certificate && (
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-neutral-900/60 to-neutral-800/60 border border-neutral-600/40">
                    <div className="relative overflow-hidden rounded-lg">
                      <iframe
                        src={exp.certificate}
                        className="w-full h-64 md:h-80 rounded-lg border border-neutral-600/50"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-neutral-400 font-medium">
                        Certificate Preview
                      </span>
                      <a
                        href={exp.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 hover:bg-neutral-700/60 border border-neutral-600/40 hover:border-neutral-500/60 rounded-lg transition-all duration-300 group/link"
                      >
                        <span>View Certificate</span>
                        <svg
                          className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
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
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={timelineData} />
    </div>
  );
}
