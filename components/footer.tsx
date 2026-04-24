"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FloatingObject = dynamic(() => import("./floating-object"), { ssr: false });

const words = ["ships", "scales", "listens", "iterates", "ships again"];

// Colored rounded-square social icons (ref-inspired)
const socials = [
  {
    href: "mailto:itsrohitmenda@gmail.com",
    label: "email",
    bg: "bg-sun",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M4 7l8 5 8-5M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z" stroke="#1C120E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/itsrohitmenda",
    label: "linkedin",
    bg: "bg-sky",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M6.5 9v10M6.5 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM11 19v-6a3 3 0 0 1 6 0v6M11 10V19" stroke="#1C120E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/resume.pdf",
    label: "resume",
    bg: "bg-hot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M14 3v5h5 M9 13h6 M9 17h4" stroke="#1C120E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "tel:+918123739500",
    label: "phone",
    bg: "bg-acid",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" stroke="#1C120E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="relative z-10 bg-cream text-ink border-t-[1.5px] border-ink overflow-hidden">
      {/* Decorative 3D peeking from the corner */}
      <div className="absolute -bottom-24 -right-16 h-[420px] w-[420px] opacity-80 pointer-events-none hidden md:block">
        <FloatingObject shape="torus" color="#FF5ACD" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
              · 04 / let's talk
            </span>
            <h2 className="mt-4 font-display font-medium text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-[-0.025em]">
              a PM who{" "}
              <span className="relative inline-block align-baseline min-w-[6ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="italic inline-block relative"
                  >
                    <span className="relative z-10">{words[idx]}</span>
                    <span
                      aria-hidden
                      className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-sun rounded-[0.4em] -z-0"
                    />
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
              <span className="font-display font-medium text-2xl md:text-4xl lg:text-5xl italic group-hover:text-coralDeep transition-colors break-all">
                itsrohitmenda@gmail.com
              </span>
              <span className="font-display text-2xl md:text-4xl shrink-0 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </a>
          </div>

          <div className="md:col-span-5 md:pl-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-4">
              find me here
            </p>
            <div className="flex items-center gap-3 mb-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") || s.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor-label={s.label}
                  aria-label={s.label}
                  className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl ${s.bg} border-[1.5px] border-ink shadow-[0_3px_0_0_#1C120E] transition-transform hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_#1C120E]`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 font-mono text-sm text-ink/80">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-1">
                  phone (for the brave)
                </p>
                <a
                  href="tel:+918123739500"
                  data-cursor-label="call"
                  className="hover:text-coralDeep transition font-medium"
                >
                  +91 81237 39500
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-1">
                  based in
                </p>
                <p className="text-ink font-medium">Bangalore — IST · UTC+5:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-ink/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
            © {new Date().getFullYear()} rohit menda / built with next.js + r3f
          </p>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-75 animate-ping_slow" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal" />
              </span>
              open to roles
            </span>
            <Link
              href="#top"
              data-cursor-label="top"
              className="hover:text-coralDeep transition font-medium"
            >
              back to top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
