"use client";
import React from "react";
import { motion } from "framer-motion";
import { raleway } from "@/app/ui/fonts";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const contact = {
  email: "marsakatlaabhishek7168@gmail.com",
  github: "https://github.com/abhishekkumar71",
  linkedin: "https://www.linkedin.com/in/abhishek-kumar5471/",
};

export default function Contact() {
  return (
    <section
      id="contact"
      className={`px-6 md:px-20 py-20 ${raleway.className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center gap-6"
      >
        <h2 className="text-3xl font-bold text-white">Contact</h2>
        <p className="text-slate-400 text-lg max-w-md">
          Open to opportunities, feel free to reach out.
        </p>
        <a
          href="https://mail.google.com/mail/?view=cm&to=marsakatlaabhishek7168@gmail.com"
          className="px-8 py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200"
        >
          Get In Touch
        </a>
        <div className="flex gap-6 mt-2">
          <a
            href={contact.github}
            target="_blank"
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
          >
            <GitHubIcon fontSize="large" />
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
          >
            <LinkedInIcon fontSize="large" />
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
          >
            <EmailIcon fontSize="large" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
