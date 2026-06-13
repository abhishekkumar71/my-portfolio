"use client";
import React from "react";
import { motion } from "framer-motion";
import { raleway } from "@/app/ui/fonts";

const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Bharat Institute of Engineering and Technology",
    location: "Hyderabad, Telangana",
    year: "2021 - 2025",
  },
  {
    degree: "Intermediate (MPC)",
    institution: "Excellent Junior College",
    location: "Khammam, Telangana",
    year: "2019 - 2021",
  },
];

const certifications = [
  {
    name: "Data Structures and Algorithms",
    issuer: "Apna College",
    year: "2024",
    link: "https://drive.google.com/file/d/1v0Aw92rl4Ha0qLJHiuczmsbqcL1Gd7z1/view?usp=drive_link",
  },
  {
    name: "Full Stack Developer",
    issuer: "Apna College",
    year: "2024",
    link: "https://drive.google.com/file/d/1cEyWudp7nckQb6sTN2Fwzf5sGC83TaQ6/view?usp=drive_link",
  },
  {
    name: "AI Premier",
    issuer: "Infosys Springboard",
    year: "2025",
    link: "https://drive.google.com/file/d/1aWzIVP0Vl7SSQOKjrMFjKo_9QYStEbET/view?usp=drive_link",
  },
  {
    name: "Principles of Generative AI",
    issuer: "Infosys Springboard",
    year: "2025",
    link: "https://drive.google.com/file/d/1JN3QpVx5lBBxSYYE8WrAWwca-hdpJcb4/view?usp=drive_link",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className={`px-6 md:px-20 py-20 ${raleway.className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-12"
      >
        Education
      </motion.h2>

      <div className="flex flex-col gap-4 mb-16">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {edu.degree}
                </h3>
                <p className="text-cyan-400 mt-1">{edu.institution}</p>
                <p className="text-slate-500 text-sm mt-1">{edu.location}</p>
              </div>
              <p className="text-slate-400 text-sm flex-shrink-0">{edu.year}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-12"
      >
        Certifications
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="border border-slate-700 rounded-xl p-5 hover:border-cyan-500/50 transition-colors duration-300"
          >
            <h3 className="text-white font-medium">{cert.name}</h3>
            <p className="text-cyan-400 text-sm mt-1">{cert.issuer}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-slate-500 text-xs">{cert.year}</p>

              <a
                href={cert.link}
                target="_blank"
                className="text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                View ↗
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
