"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link
          href="/"
          data-cursor-label="home"
          className="flex items-center gap-2 group"
        >
          <motion.span
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block h-8 w-8 rounded-full bg-ink text-lime grid place-items-center font-display text-xl"
          >
            r
          </motion.span>
          <span className="font-mono text-xs uppercase tracking-widest">
            rohit / pm
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-ink/20 bg-cream/80 backdrop-blur px-2 py-1">
          {[
            { label: "work", href: "/#work", external: false },
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
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full hover:bg-ink hover:text-cream transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                data-cursor-label={l.label}
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full hover:bg-ink hover:text-cream transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <a
          href="mailto:itsrohitmenda@gmail.com"
          data-cursor-label="say hi"
          className="group relative inline-flex items-center gap-2 rounded-full bg-ink text-cream px-4 py-2 text-xs font-mono uppercase tracking-widest hover:bg-hot transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
          let's talk
        </a>
      </div>
    </motion.header>
  );
}
