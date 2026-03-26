"use client";

import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiInstagram
} from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Footer() {
  // Variants for fade-up animation
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.footer
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/fbg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
    >
      {/* Decorative Ellipse */}
      <div className="absolute w-[254px] h-[247px] -left-[127px] -top-[92px] rounded-full bg-[#4E2FFF] opacity-80 blur-[96px]" />

      <div className="relative container mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left Section */}
        <div className="flex flex-col gap-6 max-w-[279px]">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.svg"
              alt="Repeatless Logo"
              width={136}
              height={46}
              className="object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-base leading-6 text-white/80 font-poppins">
            Transforming businesses through intelligent AI automation solutions.
          </p>

          {/* Copyright */}
          <p className="text-sm leading-5 text-white/60 font-poppins mt-6">
            © 2025 Repeatless. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <Link href="#home" className="text-white/80 hover:text-white transition">Home</Link>
          <Link href="#testimonials" className="text-white/80 hover:text-white transition">About Us</Link>
          <Link href="#solutions" className="text-white/80 hover:text-white transition">Solutions</Link>
          <Link href="/casestudies" className="text-white/80 hover:text-white transition">Case Studies</Link>
          <Link href="https://cal.com/chandan-kumar-zhrofj/30min" className="text-white/80 hover:text-white transition">Book a Demo</Link>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <div className="flex items-center gap-2 text-white/80">
            <FiMail className="w-4 h-4 shrink-0" />
            <span>contact@repeatless.in</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <FiMapPin className="w-4 h-4 shrink-0" />
            <span>Hyderabad, L.B. Nagar</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <FiPhone className="w-4 h-4 shrink-0" />
            <span>+91 9849884501</span>
          </div>
          <Link
            href="https://www.instagram.com/chandan_cheripally_"
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <FiInstagram className="w-4 h-4 shrink-0" />
            <span>Instagram</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-4 h-4 shrink-0" />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="https://www.youtube.com/@chandankumarnetha"
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="w-4 h-4 shrink-0" />
            <span>YouTube</span>
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
