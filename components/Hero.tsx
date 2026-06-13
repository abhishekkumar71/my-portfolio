"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { raleway } from "@/app/ui/fonts";

export default function Hero() {
  return (
    <section
      className={`min-h-screen flex flex-col justify-center px-6 md:px-30 pt-24 pb-16 ${raleway.className}`}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-cyan-400 text-sm tracking-widest uppercase"
          >
            Full Stack Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Hi, I'm Abhishek
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            I'm a full-stack developer who likes building products that actually
            work. I've shipped real projects, debugged things that shouldn't
            have broken, and figured out solutions when there was no clear path.
            Open to full-time roles where I can do more of the same.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex gap-3 mt-2"
          >
            <a
              href="#projects"
              className="px-4 py-2.5 md:px-6 md:py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200 text-sm md:text-base"
            >
              View Projects
            </a>

            <a
              href="/Abhishek_Kumar_Resume.pdf"
              download="Abhishek_Kumar_Resume.pdf"
              className="px-4 py-2.5 md:px-6 md:py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors duration-200 text-sm md:text-base"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl" />
          <Image
            src="/profilePic2.png"
            alt="Abhishek Kumar"
            fill
            className="rounded-full object-cover relative z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}
