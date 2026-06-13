"use client";
import React, { useState } from "react";
import Link from "next/link";
import { raleway } from "@/app/ui/fonts";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
export default function Navbar() {
  const links = [
    { name: "Experience", href: "#workExperience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  const [show, setShow] = useState(true);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, when: "afterChildren" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;
    setHidden(latest > previous);
  });

  return (
    <>
      <motion.header
        className={`fixed flex flex-row w-full backdrop-blur-md bg-black-900 h-20 items-center justify-around z-40 text-l font-semibold antialiased ${
          raleway.className
        } `}
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-row p-4 items-center">
          <h4 className="">Abhishek Kumar</h4>
        </div>
        <div className=" flex items-center gap-4 md:flex hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative p-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full hover:text-cyan-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden z-50">
          <MenuIcon onClick={handleMenu} className="hover:cursor-pointer" />
          <AnimatePresence>
            {menu && (
              <motion.div
                key="mobile-menu"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute top-15 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center z-50 overflow-hidden"
              >
                {links.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="text-lg p-4 w-full text-center block text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                      onClick={() => setMenu(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
