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

  // Mirror the single `theme-dark` class that SiteChrome maintains. The navbar
  // does NOT detect sections on its own — it only reflects that one class, so
  // there is exactly one controller and no competing thresholds to flicker
  // between. The colour swap crossfades via the transition-colors classes.
  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.classList.contains("theme-dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Logo */}
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-2 transition-colors duration-700 ${
            isDark ? "text-white" : "text-neutral-950"
          }`}
        >
          <Image
            src="/images/logo.svg"
            alt="Repeatless Logo"
            width={120}
            height={40}
            className="h-auto w-[110px] object-contain transition-[filter] duration-700 xl:w-[120px]"
            style={{ filter: isDark ? "none" : "invert(1) brightness(0)" }}
          />
        </Link>

        {/* Desktop Menu & Button Wrapper */}
        <div className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-8">
          <div className="flex min-w-0 items-center gap-4 font-medium text-sm tracking-wide text-poppins xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap transition-colors duration-700 ${
                  isDark
                    ? "text-white/85 hover:text-white"
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
            className={`flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-poppins text-sm font-semibold transition-colors duration-700 xl:px-5 ${
              isDark
                ? "bg-white text-neutral-950 hover:bg-neutral-200"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            <FiPhoneCall className="w-4 h-4" />
            <span>Book a Demo</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`shrink-0 p-2 text-3xl transition-colors duration-700 lg:hidden ${
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
            className={`absolute top-full left-0 flex max-h-[calc(100svh-72px)] w-full flex-col items-center gap-6 overflow-y-auto border-b py-8 shadow-lg backdrop-blur-xl lg:hidden ${
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
                className={`text-lg font-medium transition-colors ${
                  isDark ? "hover:text-neutral-300" : "hover:text-neutral-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://cal.com/chandan-kumar-zhrofj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-poppins font-semibold text-sm justify-center transition-colors ${
                isDark
                  ? "bg-white text-neutral-950"
                  : "bg-neutral-900 text-white"
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
