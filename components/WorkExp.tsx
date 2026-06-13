"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { raleway } from "@/app/ui/fonts";

const experience = {
  role: "Automation Software Developer Intern",
  company: "Humanity Founders",
  duration: "Oct 2025 - Jan 2026",
  points: [
    "Contributed to AdTask AI, a social media management platform for scheduling and automating posts across multiple platforms",
    "Independently researched and implemented browser automation using Playwright for post scheduling on X (Twitter)",
    "Navigated deployment challenges across GCP and AWS, gaining hands-on experience with production environments",
  ],
  tech: ["TypeScript", "Next.js", "Playwright", "Selenium", "GCP", "AWS"],
  certificate: "/certificate.pdf",
};

export default function WorkExp() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const { scrollYProgress: headingProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });

  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start center"],
  });

  const headingOpacity = useTransform(headingProgress, [0, 1], [0, 1]);
const headingScale = useTransform(headingProgress, [0, 1], [0, 1]);

  const cardOpacity = useTransform(cardProgress, [0, 1], [0, 1]);
const cardScale = useTransform(cardProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="workExperience"
      className={`px-6 md:px-20 py-20 ${raleway.className}`}
    >
      <motion.h2
  style={{ opacity: headingOpacity, scaleX: headingScale, originX: 0.5 }}
        className="text-3xl font-bold text-white mb-12"
      >
        Experience
      </motion.h2>

      <motion.div
        ref={cardRef}
  style={{ opacity: cardOpacity, scaleX: cardScale, originX: 0.5 }}
        className="border border-slate-700 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {experience.role}
            </h3>
            <p className="text-cyan-400 mt-1">{experience.company}</p>
          </div>
          <p className="text-slate-400 text-sm">{experience.duration}</p>
        </div>

        <ul className="space-y-3 mb-6">
          {experience.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {experience.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={experience.certificate}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
        >
          View Certificate ↗
        </a>
      </motion.div>
    </section>
  );
}
