"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// `section` is the id of the in-page section a link points at (empty for links
// that resolve to a standalone route, matched by pathname instead).
const navLinks = [
  { href: "/#home", label: "Home", section: "home" },
  { href: "/#solutions", label: "Solutions", section: "solutions" },
  { href: "/casestudies", label: "Case Studies", section: "" },
  { href: "/#testimonials", label: "About Us", section: "testimonials" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  // Once the page is scrolled off the very top, fade in a translucent, blurred
  // backdrop behind the bar so the nav labels stay legible over page content
  // instead of colliding with whatever scrolls beneath them.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: on the home page, track which section sits under the top of the
  // viewport so the nav can mark it active. Off the home page there is nothing
  // to spy on — active state is resolved from the pathname instead.
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = navLinks
      .filter((l) => l.section)
      .map((l) => l.section);
    let raf = 0;

    const apply = () => {
      raf = 0;
      const probe = 120; // a little below the fixed navbar
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe) current = id;
      }
      // Snap the last section active once the page is scrolled to the bottom,
      // since short trailing sections never reach the probe line.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // A link is active when either its target section is the one in view (home
  // page) or its route matches the current path.
  const isActiveLink = (link: (typeof navLinks)[number]) => {
    if (link.section) return pathname === "/" && activeSection === link.section;
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled || isOpen
          ? isDark
            ? "bg-neutral-950/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-[#f4f1ec]/80 backdrop-blur-xl border-b border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-1.5 sm:px-6 lg:px-10 xl:px-16">
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
            {navLinks.map((link) => {
              const active = isActiveLink(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap py-1 transition-colors duration-300 ${
                    isDark
                      ? active
                        ? "text-white font-semibold"
                        : "text-white/70 hover:text-white"
                      : active
                        ? "text-neutral-950 font-semibold"
                        : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  {link.label}
                  {/* Active indicator: an accent underline that slides between
                      links via the shared layoutId. */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-[var(--accent)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Book a Demo Button (Desktop) */}
          <a
            href="https://cal.com/chandan-kumar-zhrofj/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2 text-poppins text-sm font-semibold transition-colors duration-700 xl:px-5 ${
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
            {navLinks.map((link) => {
              const active = isActiveLink(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 text-lg transition-colors ${
                    active ? "font-semibold" : "font-medium"
                  } ${
                    active
                      ? isDark
                        ? "text-white"
                        : "text-neutral-950"
                      : isDark
                        ? "text-white/80 hover:text-neutral-300"
                        : "text-neutral-700 hover:text-neutral-600"
                  }`}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                  {link.label}
                </Link>
              );
            })}

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
