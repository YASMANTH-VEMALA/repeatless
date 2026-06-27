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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Add threshold to avoid flickering on small scrolls
      if (Math.abs(currentScroll - lastScrollY) > 10) {
        if (currentScroll > lastScrollY) {
          setVisible(false); // hide on scroll down
        } else {
          setVisible(true); // show on scroll up
        }
        setLastScrollY(currentScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl"
    >
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0px_6px_30px_rgba(77,0,255,0.3)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="Repeatless Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-white font-medium text-sm tracking-wide text-poppins">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-purple-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Book a Demo Button (Desktop) */}
        <a
          href="https://calendly.com/chandannetha/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 w-40 h-12 rounded-full bg-[#4D00FF] hover:bg-[#3700cc] transition text-white text-poppins font-medium text-sm shadow-lg justify-center"
        >
          <FiPhoneCall className="w-4 h-4" />
          <span>Book a Demo</span>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-3xl p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden mt-3 mx-4 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-xl text-white text-poppins flex flex-col items-center gap-6 py-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-purple-400 transition"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://calendly.com/chandannetha/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-40 h-12 rounded-full bg-[#4D00FF] hover:bg-[#3700cc] transition text-white text-poppins font-medium text-sm justify-center"
            >
              <FiPhoneCall className="w-4 h-4" />
              <span>Book a Demo</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
