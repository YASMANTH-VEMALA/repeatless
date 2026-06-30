"use client";

import Link from "next/link";
import Image from "next/image";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/casestudies", label: "Case Studies" },
  { href: "/#testimonials", label: "About Us" },
  { href: "/#contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleThemeCheck = () => {
      const homeSection = document.getElementById("home");
      const aboutSection = document.getElementById("about");
      const homeRect = homeSection?.getBoundingClientRect();
      const aboutRect = aboutSection?.getBoundingClientRect();
      const isOverHome = !!homeRect && homeRect.top <= 90 && homeRect.bottom > 90;
      const isOverMission = !!aboutRect && aboutRect.top <= 90 && aboutRect.bottom > 90;

      setIsDark(
        isOverHome ||
        isOverMission ||
        document.body.classList.contains("theme-dark") ||
        document.documentElement.classList.contains("theme-dark")
      );
    };

    // Initial check
    handleThemeCheck();

    // Listen to scroll and body class mutations
    const observer = new MutationObserver(handleThemeCheck);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("scroll", handleThemeCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleThemeCheck);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2 transition-colors duration-500 ${
            isDark ? "text-white" : "text-neutral-950"
          }`}
        >
          <Image
            src="/images/logo.svg"
            alt="Repeatless Logo"
            width={120}
            height={40}
            className="object-contain transition-all duration-700"
            style={{ filter: isDark ? "none" : "invert(1) brightness(0)" }}
          />
        </Link>

        {/* Desktop Menu & Button Wrapper */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 lg:gap-8 font-medium text-sm tracking-wide text-poppins">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-500 ${
                  isDark 
                    ? "!text-white/85 hover:!text-white" 
                    : "text-neutral-800 hover:text-neutral-950"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Book a Demo Button (Desktop) */}
          <a
            href="https://cal.com/chandan-kumar-zhrofj/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-poppins font-semibold text-sm justify-center transition-all duration-500 ${
              isDark 
                ? "bg-white text-neutral-950 hover:bg-neutral-200" 
                : "bg-[#EBE9FE] hover:bg-[#DDD9FE] text-[#4D00FF]"
            }`}
          >
            <FiPhoneCall className="w-4 h-4" />
            <span>Book a Demo</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden text-3xl p-2 transition-colors duration-500 ${
            isDark ? "text-white" : "text-neutral-950"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`md:hidden absolute top-full left-0 w-full border-b backdrop-blur-xl shadow-lg flex flex-col items-center gap-6 py-8 ${
              isDark 
                ? "bg-neutral-950/95 border-white/5 text-white" 
                : "bg-white/95 border-black/5 text-neutral-950"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-all ${
                  isDark ? "hover:text-neutral-300" : "hover:text-[#4D00FF]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://cal.com/chandan-kumar-zhrofj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-poppins font-semibold text-sm justify-center transition-all ${
                isDark 
                  ? "bg-white text-neutral-950" 
                  : "bg-[#EBE9FE] text-[#4D00FF]"
              }`}
            >
              <FiPhoneCall className="w-4 h-4" />
              <span>Book a Demo</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
