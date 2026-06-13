"use client";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { raleway } from "@/app/ui/fonts";

const socialLinks = [
  { href: "https://github.com/abhishekkumar71", icon: <GitHubIcon /> },
  { href: "https://www.linkedin.com/in/abhishek-kumar5471/", icon: <LinkedInIcon /> },
];

export default function Footer() {
  return (
    <footer className={`px-6 md:px-20 py-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 ${raleway.className}`}>
      <p className="text-slate-500 text-sm">
        Designed and Built by Abhishek Kumar
      </p>
      <div className="flex gap-4">
        {socialLinks.map((item) => (
            <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
          >
            {item.icon}
          </a>
        ))}
      </div>
      <p className="text-slate-500 text-sm">© 2025 Abhishek Kumar</p>
    </footer>
  );
}