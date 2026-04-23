"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FloatingObject = dynamic(() => import("./floating-object"), { ssr: false });

const words = ["ships", "scales", "listens", "iterates", "ships again"];

export default function Footer() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="relative z-10 border-t border-hairline overflow-hidden">
      <div className="absolute inset-0 radial-fade opacity-60 pointer-events-none" />

      {/* Decorative 3D */}
      <div className="absolute -bottom-20 -right-20 h-[420px] w-[420px] opacity-70 pointer-events-none hidden md:block">
        <FloatingObject shape="icosa" color="#7C5CFF" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              · 04 / let's talk
            </span>
            <h2 className="mt-4 font-display font-medium text-5xl md:text-7xl lg:text-[7rem] leading-[0.95] tracking-[-0.025em]">
              a PM who{" "}
              <span className="relative inline-block align-baseline min-w-[6ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="italic text-acid inline-block"
                  >
                    {words[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              .
              <br />
              let's build.
            </h2>

            <a
              href="mailto:itsrohitmenda@gmail.com"
              data-cursor-label="email"
              className="mt-12 inline-flex items-center gap-4 group"
            >
              <span className="font-display text-2xl md:text-4xl lg:text-5xl italic group-hover:text-acid transition-colors break-all">
                itsrohitmenda@gmail.com
              </span>
              <span className="font-display text-2xl md:text-4xl shrink-0 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </a>
          </div>

          <div className="md:col-span-5 md:pl-10">
            <div className="flex flex-col gap-5 font-mono text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">
                  elsewhere
                </p>
                <a
                  href="https://www.linkedin.com/in/itsrohitmenda"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label="linkedin"
                  className="block hover:text-acid transition"
                >
                  linkedin.com/in/itsrohitmenda ↗
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label="pdf"
                  className="mt-2 block hover:text-acid transition"
                >
                  resume.pdf ↗
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">
                  phone (for the brave)
                </p>
                <a
                  href="tel:+918123739500"
                  data-cursor-label="call"
                  className="hover:text-acid transition"
                >
                  +91 81237 39500
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">
                  based in
                </p>
                <p className="text-ink">Bangalore — IST · UTC+5:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-hairline flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            © {new Date().getFullYear()} rohit menda / built with next.js + r3f
          </p>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-75 animate-ping_slow" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-acid" />
              </span>
              open to roles
            </span>
            <Link
              href="#top"
              data-cursor-label="top"
              className="hover:text-ink transition"
            >
              back to top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
