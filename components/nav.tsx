"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <Link
          href="/"
          data-cursor-label="home"
          className="flex items-center gap-3 group"
        >
          <motion.span
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block h-11 w-11 rounded-2xl bg-cream border-[1.5px] border-ink grid place-items-center font-display text-xl text-ink shadow-[0_3px_0_0_#171412]"
          >
            <span className="italic font-medium">r</span>
          </motion.span>
          <div className="flex flex-col leading-tight text-ink">
            <span className="text-sm font-semibold">rohit menda</span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-widest opacity-75">
              product manager
            </span>
          </div>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-1 rounded-full bg-cream border-[1.5px] border-ink px-2 py-1.5 transition-all shadow-[0_3px_0_0_#171412] ${
            scrolled ? "opacity-100" : "opacity-0 md:opacity-100"
          }`}
        >
          {[
            { label: "work", href: "/#work", external: false },
            { label: "path", href: "/#path", external: false },
            { label: "about", href: "/#about", external: false },
            { label: "resume", href: "/resume.pdf", external: true },
          ].map((l) =>
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-label={l.label}
                className="px-3 py-1.5 text-xs font-mono font-medium uppercase tracking-widest rounded-full text-ink hover:bg-sun transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                data-cursor-label={l.label}
                className="px-3 py-1.5 text-xs font-mono font-medium uppercase tracking-widest rounded-full text-ink hover:bg-sun transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <a
          href="mailto:itsrohitmenda@gmail.com"
          data-cursor-label="say hi"
          className="btn-pop group"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ink opacity-40 animate-ping_slow" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ink" />
          </span>
          say hi
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </motion.header>
  );
}
