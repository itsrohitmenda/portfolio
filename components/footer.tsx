"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["ships", "scales", "listens", "iterates", "ships again"];

export default function Footer() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="relative z-10 mt-32 bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 opacity-10 grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime mb-4">
              currently: open to new roles
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
              a PM who{" "}
              <span className="relative inline-block align-baseline min-w-[6ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="italic text-lime inline-block"
                  >
                    {words[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              .
              <br />
              let's build something.
            </h2>
          </div>

          <div className="flex flex-col gap-3 font-mono text-sm">
            <a
              href="mailto:itsrohitmenda@gmail.com"
              data-cursor-label="email"
              className="group inline-flex items-center gap-3 hover:text-lime transition"
            >
              <span>→</span> itsrohitmenda@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/itsrohitmenda"
              target="_blank"
              rel="noreferrer"
              data-cursor-label="linkedin"
              className="group inline-flex items-center gap-3 hover:text-lime transition"
            >
              <span>→</span> linkedin.com/in/itsrohitmenda
            </a>
            <a
              href="tel:+918123739500"
              data-cursor-label="call"
              className="group inline-flex items-center gap-3 hover:text-lime transition"
            >
              <span>→</span> +91 81237 39500
            </a>
            <span className="inline-flex items-center gap-3 text-cream/60">
              <span>→</span> based in Bangalore 🌴
            </span>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cream/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
            © {new Date().getFullYear()} rohit menda. built with caffeine, curiosity & next.js.
          </p>
          <Link
            href="#top"
            data-cursor-label="back to top"
            className="font-mono text-[11px] uppercase tracking-widest hover:text-lime"
          >
            back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
