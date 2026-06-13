"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { raleway } from "@/app/ui/fonts";

const projects = [
  {
    title: "Troop",
    description:
      "A real-time video conferencing platform where users can create or join meetings instantly using a unique meeting code. Supports video, audio, screen sharing, and live chat.",
    tech: ["React", "Node.js", "WebRTC", "Socket.IO", "MongoDB", "JWT"],
    live: "https://troop-1.onrender.com",
    github: "https://github.com/abhishekkumar71/Troop",
    image: "/troop.jpeg",
  },
  {
    title: "CVCraft",
    description:
      "A full-stack resume builder where users can create, edit, and manage multiple resumes with live preview, template support, and PDF export.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "Cloudinary", "Gemini API"],
    live: "http://cv-craft-umber.vercel.app/",
    github: "https://github.com/abhishekkumar71/CVCraft",
    image: "/cvcraft.png",
  },
  {
    title: "Trade Easy",
    description:
      "A stock market dashboard for tracking stocks in real time, managing a watchlist, and simulating buy/sell actions with interactive performance charts.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "Finnhub API", "MUI"],
    live: "https://tradeeasy-frontend.onrender.com/",
    github: "https://github.com/abhishekkumar71/TradeEasy",
    image: "/tradeeasy.png",
  },

  {
    title: "Earthquake Visualizer",
    description:
      "An interactive map that visualizes real-time earthquake data from the USGS API with magnitude filtering, timeline animation, and satellite view.",
    tech: ["React", "Leaflet.js", "USGS API", "MUI"],
    live: "https://earthquake-visualizer-chi.vercel.app/",
    github: "https://github.com/abhishekkumar71/Earthquake-Visualizer",
    image: "/earthquake.png",
  },
  {
    title: "Jarvis",
    description:
      "A voice assistant that responds to a wake word and handles commands like opening apps, fetching news, playing music, and answering questions via Gemini 2.5 Pro.",
    tech: ["Python", "Gemini API", "SpeechRecognition", "NewsAPI"],
    live: null,
    github: "https://github.com/abhishekkumar71/jarvis",
    image: null,
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const activeRef = useRef(0);

  const setActiveProject = (val: number) => {
    activeRef.current = val;
    setActive(val);
  };
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inSection = rect.top <= 0 && rect.bottom > window.innerHeight;

      if (!inSection) return;

      e.preventDefault();

      if (Math.abs(e.deltaY) < 30) return;
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        if (activeRef.current < projects.length - 1) {
          // go to next project
          isScrolling.current = true;
          setDirection(1);
          setActiveProject(activeRef.current + 1);
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        } else {
          // on last project, scroll past section
          isScrolling.current = true;
          window.scrollTo({
            top: section.offsetTop + section.offsetHeight,
            behavior: "smooth",
          });
          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      } else if (e.deltaY < 0) {
        if (activeRef.current > 0) {
          // go to previous project
          isScrolling.current = true;
          setDirection(-1);
          setActiveProject(activeRef.current - 1);
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        } else {
          // on first project, scroll past section upward
          isScrolling.current = true;
          window.scrollTo({
            top: section.offsetTop - window.innerHeight,
            behavior: "smooth",
          });
          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -60 : 60 }),
  };

  const project = projects[active];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative ${raleway.className}`}
      style={{ height: isMobile ? "auto" : "500vh" }}
    >
      {isMobile ? (
        <div className="px-6 py-20 flex flex-col gap-8">
          <p className="text-3xl font-bold text-white">Projects</p>
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-slate-700 rounded-xl overflow-hidden"
            >
              {proj.image ? (
                <Image
                  src={proj.image}
                  alt={proj.title}
                  width={700}
                  height={400}
                  className="w-full h-44 object-cover object-top"
                />
              ) : (
                <div className="bg-slate-900 p-4 font-mono text-xs text-green-400 h-44 flex flex-col justify-center gap-1">
                  <p>
                    <span className="text-slate-500">$</span> python jarvis.py
                  </p>
                  <p className="text-slate-400">Initializing Jarvis...</p>
                  <p>
                    <span className="text-slate-500">&gt;</span> jarvis
                  </p>
                  <p className="text-slate-400">ya</p>
                  <p>
                    <span className="text-slate-500">&gt;</span> open youtube
                  </p>
                  <p className="text-slate-400">Opening YouTube...</p>
                </div>
              )}
              <div className="p-5 flex flex-col gap-3">
                <p className="text-cyan-400 text-xs tracking-widest uppercase">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-1">
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold rounded-lg text-xs"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  <a
                    href={proj.github}
                    target="_blank"
                    className="px-4 py-2 border border-slate-600 text-slate-300 font-semibold rounded-lg text-xs hover:border-cyan-500 hover:text-cyan-400 transition-colors duration-200"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // Desktop — untouched
        <div className="sticky top-0 h-screen overflow-hidden px-6 md:px-20 pt-20 flex flex-col justify-center">
          <p className="absolute top-8 left-6 md:left-20 text-3xl font-bold text-white">
            Projects
          </p>
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeRef.current ? 1 : -1);
                  setActiveProject(i);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === active ? "bg-cyan-400" : "bg-slate-600"}`}
              />
            ))}
          </div>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-row items-center justify-between gap-12 mt-10"
            >
              <div className="flex flex-col gap-6 max-w-lg w-full">
                <p className="text-cyan-400 text-sm tracking-widest uppercase">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </p>
                <h3 className="text-5xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200 text-sm"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    className="px-5 py-2.5 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
              <div className="w-1/2 rounded-xl overflow-hidden border border-slate-700">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={700}
                    height={400}
                    className="w-full h-auto object-cover object-top"
                  />
                ) : (
                  <div className="bg-slate-900 p-6 font-mono text-sm text-green-400 h-64 flex flex-col justify-center gap-2">
                    <p>
                      <span className="text-slate-500">$</span> python jarvis.py
                    </p>
                    <p className="text-slate-400">Initializing Jarvis...</p>
                    <p>
                      <span className="text-slate-500">&gt;</span> jarvis
                    </p>
                    <p className="text-slate-400">ya</p>
                    <p>
                      <span className="text-slate-500">&gt;</span> open youtube
                    </p>
                    <p className="text-slate-400">Opening YouTube...</p>
                    <p>
                      <span className="text-slate-500">&gt;</span> what is the
                      weather today
                    </p>
                    <p className="text-slate-400">
                      Fetching response from Gemini...
                    </p>
                    <p>Today is sunny with a high of 32°C.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
