"use client";
import React from "react";
import { motion } from "framer-motion";
import { raleway } from "@/app/ui/fonts";

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "Python"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Material UI", "Bootstrap", "HTML", "CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST API", "JWT", "OAuth"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Vercel", "Render"],
  },
  {
    category: "AI & Integrations",
    items: ["Gemini API", "LLM Integration", "Prompt Engineering"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "Playwright", "VS Code"],
  },
  {
    category: "CS Fundamentals",
    items: ["DSA", "OOP", "Operating Systems", "Computer Networks"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className={`px-6 md:px-20 py-20 ${raleway.className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-12"
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="border border-slate-700 rounded-xl p-5 hover:border-cyan-500/50 transition-colors duration-300"
          >
            <h3 className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-full border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}