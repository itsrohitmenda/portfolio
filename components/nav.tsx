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
            className="inline-block h-9 w-9 rounded-full border border-ink/40 bg-ink/5 backdrop-blur grid place-items-center font-display text-xl"
          >
            <span className="italic">r</span>
          </motion.span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm">rohit menda</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              product manager
            </span>
          </div>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-1 rounded-full hairline-border bg-panel/60 backdrop-blur-xl px-2 py-1.5 transition-all ${
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
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full text-muted hover:text-ink hover:bg-ink/10 transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                data-cursor-label={l.label}
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full text-muted hover:text-ink hover:bg-ink/10 transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <a
          href="mailto:itsrohitmenda@gmail.com"
          data-cursor-label="say hi"
          className="group relative inline-flex items-center gap-2.5 rounded-full bg-ink text-void pl-2 pr-4 py-2 text-xs font-mono uppercase tracking-widest hover:bg-acid transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-75 animate-ping_slow" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
          </span>
          say hi
          <span aria-hidden className="opacity-60">→</span>
        </a>
      </div>
    </motion.header>
  );
}
