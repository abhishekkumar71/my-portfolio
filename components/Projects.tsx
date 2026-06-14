"use client";
import React, { useState, useRef } from "react";
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

function MobileStack() {
  const [deck, setDeck] = useState(projects.map((_, i) => i).reverse());
  const [gone, setGone] = useState<number[]>([]);

  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flyDir, setFlyDir] = useState<null | "left" | "right">(null);

  const touchStart = useRef({ x: 0, y: 0 });
  const THRESHOLD = 90;

  const topIdx = deck[deck.length - 1];
  const done = deck.length === 0;

  // rotation proportional to horizontal drag, capped at ±15deg
  const rotate = Math.min(15, Math.max(-15, drag.x * 0.12));
  // opacity of like/nope badges
  const likeOpacity = Math.min(1, Math.max(0, drag.x / THRESHOLD));
  const nopeOpacity = Math.min(1, Math.max(0, -drag.x / THRESHOLD));

  const handleTouchStart = (e: React.TouchEvent) => {
    if (flyDir || done) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || flyDir || done) return;
    setDrag({
      x: e.touches[0].clientX - touchStart.current.x,
      y: (e.touches[0].clientY - touchStart.current.y) * 0.3,
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging || flyDir || done) return;
    setIsDragging(false);

    if (Math.abs(drag.x) >= THRESHOLD) {
      const dir = drag.x > 0 ? "right" : "left";
      setFlyDir(dir);
      setTimeout(() => {
        if (dir === "left") {
          setGone((g) => [...g, topIdx]);
          setDeck((d) => d.slice(0, -1));
        } else if (dir === "right" && gone.length > 0) {
          const last = gone[gone.length - 1];
          setGone((g) => g.slice(0, -1));
          setDeck((d) => [...d, last]);
        } 
        setDrag({ x: 0, y: 0 });
        setFlyDir(null);
      }, 350);
    } else {
      setDrag({ x: 0, y: 0 });
    }
  };

  const reset = () => {
    setDeck(projects.map((_, i) => i));
    setGone([]);
    setDrag({ x: 0, y: 0 });
    setFlyDir(null);
  };

  const peekCount = Math.min(deck.length - 1, 2);

  return (
    <div className="px-6 py-20 flex flex-col items-center gap-8">
      <p className="text-3xl font-bold text-white self-start">Projects</p>

      {done ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <p className="text-slate-400 text-sm">All projects viewed</p>
          <button
            onClick={reset}
            className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg text-xs hover:border-cyan-500 hover:text-cyan-400 transition-colors"
          >
            Start over
          </button>
        </div>
      ) : (
        <div className="relative w-full" style={{ height: 560 }}>
          {/* Peeking cards */}
          {Array.from({ length: peekCount }).map((_, offset) => {
            const depth = peekCount - offset;
            const peekIdx = deck[deck.length - 1 - depth];
            return (
              <div
                key={`peek-${peekIdx}`}
                className="absolute inset-x-0 border border-slate-700 rounded-xl overflow-hidden bg-slate-900"
                style={{
                  top: depth * 10,
                  transform: `scale(${1 - depth * 0.04})`,
                  transformOrigin: "top center",
                  zIndex: 10 - depth,
                  opacity: 1 - depth * 0.2,
                }}
              />
            );
          })}

          {/* Top (active) card */}
          <div
            className="absolute inset-x-0"
            style={{
              zIndex: 20,
              transform: flyDir
                ? `translateX(${flyDir === "right" ? "120%" : "-120%"}) rotate(${flyDir === "right" ? 20 : -20}deg)`
                : `translateX(${drag.x}px) translateY(${drag.y}px) rotate(${rotate}deg)`,
              transition: flyDir
                ? "transform 0.35s cubic-bezier(0.4,0,0.2,1)"
                : isDragging
                  ? "none"
                  : "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              cursor: "grab",
              touchAction: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="absolute top-5 left-5 z-30 border-2 border-green-400 text-green-400 font-bold text-sm px-3 py-1 rounded-md rotate-[-15deg] pointer-events-none"
              style={{ opacity: likeOpacity }}
            >
              PREV
            </div>
            <div
              className="absolute top-5 right-5 z-30 border-2 border-red-400 text-red-400 font-bold text-sm px-3 py-1 rounded-md rotate-[15deg] pointer-events-none"
              style={{ opacity: nopeOpacity }}
            >
              NEXT
            </div>

            <ProjectCard proj={projects[topIdx]} index={gone.length} />
          </div>

          {/* Swipe hint */}
          {deck.length > 1 && !isDragging && drag.x === 0 && !flyDir && (
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-center pb-2"
              style={{ zIndex: 30, pointerEvents: "none" }}
            >
              <span className="text-xs text-slate-500 animate-pulse">
                ← prev | next →{" "}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Progress dots */}
      {!done && (
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                gone.includes(i)
                  ? "w-2 h-2 bg-slate-600"
                  : i === topIdx
                    ? "w-4 h-2 bg-cyan-400"
                    : "w-2 h-2 bg-slate-700"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  proj,
  index,
}: {
  proj: (typeof projects)[number];
  index: number;
}) {
  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900 select-none">
      {proj.image ? (
        <Image
          src={proj.image}
          alt={proj.title}
          width={700}
          height={400}
          draggable={false}
          className="w-full h-44 object-cover object-top pointer-events-none"
        />
      ) : (
        <div className="bg-slate-900 p-4 font-mono text-xs text-green-400 h-44 flex flex-col justify-center gap-1 pointer-events-none">
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
          {String(index + 1).padStart(2, "0")} /{" "}
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
    </div>
  );
}

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

  React.useEffect(() => {
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
          isScrolling.current = true;
          setDirection(1);
          setActiveProject(activeRef.current + 1);
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        } else {
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
          isScrolling.current = true;
          setDirection(-1);
          setActiveProject(activeRef.current - 1);
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        } else {
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative ${raleway.className}`}
    >
      {/* Mobile*/}
      <div className="md:hidden">
        <MobileStack />
      </div>

      {/* Desktop */}
      <div className="hidden md:block" style={{ height: "500vh" }}>
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
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === active ? "bg-cyan-400" : "bg-slate-600"
                }`}
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
      </div>
    </section>
  );
}
