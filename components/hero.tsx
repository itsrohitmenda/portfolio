"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Words that cycle inside the tagline. Kept short + punchy + parallel
 * grammar so "I ship ___." reads cleanly through every swap. Length
 * variance is OK — the container has min-width so the layout doesn't
 * snap between cycles.
 */
const SHIPPING = [
  "products",
  "communities",
  "GenAI bets",
  "0 → 1 vibes",
  "founder mode",
  "monday energy",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Warm radial glow — only ambient backdrop */}
      <div className="absolute inset-0 radial-fade pointer-events-none" />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-24 min-h-[100svh] flex flex-col justify-between gap-12"
      >
        {/* Masthead row */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-cream border-[1.5px] border-ink rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink shadow-[0_3px_0_0_#171412]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cherry opacity-75 animate-ping_slow" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cherry" />
            </span>
            <span className="font-semibold">open to roles</span>
            <span className="opacity-40">/</span>
            <span>bengaluru · ist</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 pt-2"
          >
            <span>folio / 2026</span>
            <span className="opacity-30">·</span>
            <span>issue no. 04</span>
          </motion.div>
        </div>

        {/* Center stack — text only, animated entry + cycling tagline */}
        <div className="max-w-5xl">
          {/* Headline: "hi, i'm" fades up, then "rohit menda." stagger-reveals
              letter by letter, then the pink marker swipes in behind "rohit". */}
          <h1 className="font-display font-bold leading-[0.88] tracking-[-0.035em] text-ink text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[10rem]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              hi, i&apos;m
            </motion.span>

            <span className="block italic">
              {/* "rohit" with marker swipe */}
              <span className="relative inline-block">
                <span className="relative z-10">
                  <StaggerLetters text="rohit" baseDelay={0.25} />
                </span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-[-0.06em] bottom-[0.14em] top-[0.22em] bg-pink rounded-[0.4em] -z-0 origin-left"
                />
              </span>
              {" "}
              <StaggerLetters text="menda." baseDelay={0.45} />
            </span>
          </h1>

          {/* Cycling tagline — words swap on a loop, underline animates with them */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-7 md:mt-9 font-display italic text-2xl md:text-4xl lg:text-5xl leading-tight tracking-[-0.015em] text-ink/85 max-w-3xl"
          >
            I ship <CyclingWord />.
          </motion.div>

          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-7 md:mt-9 text-base md:text-lg leading-[1.55] text-ink font-medium max-w-xl"
          >
            a product person from bengaluru. six years shipping things that stick — across AdTech, GenAI, e-commerce, and one stubborn little retail brand.
          </motion.p>

          {/* CTAs — same h-11, same px-5, only shadow colour differs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-7 md:mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border-[1.5px] border-ink bg-ink text-cream font-mono text-[11px] uppercase tracking-[0.22em] font-semibold shadow-[0_4px_0_0_#BFFF3D] transition-transform hover:-translate-y-0.5"
            >
              see the work
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="mailto:itsrohitmenda@gmail.com"
              className="group inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border-[1.5px] border-ink bg-cream text-ink font-mono text-[11px] uppercase tracking-[0.22em] font-semibold shadow-[0_4px_0_0_#171412] transition-transform hover:-translate-y-0.5"
            >
              say hi
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-ink"
      >
        <span>scroll maadi ↓</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[2px] bg-gradient-to-b from-ink to-transparent"
        />
      </motion.div>
    </section>
  );
}

/**
 * Letter-by-letter reveal. Each glyph fades in + slides up a hair on
 * its own staggered delay. inline-block on each <motion.span> so the
 * transform actually applies; non-breaking space substituted in for
 * regular spaces so word boundaries don't collapse.
 */
function StaggerLetters({
  text,
  baseDelay = 0,
  perLetter = 0.04,
}: {
  text: string;
  baseDelay?: number;
  perLetter?: number;
}) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: baseDelay + i * perLetter,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          aria-hidden
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Cycling word inside the "I ship ___." tagline. Words swap on a fixed
 * 2.4s loop using AnimatePresence — old word slides up + fades out, new
 * word slides up + fades in. Wrapped in an inline-flex with a min-width
 * so the surrounding line doesn't reflow on each swap.
 */
function CyclingWord() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % SHIPPING.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative inline-flex items-baseline overflow-hidden align-baseline pb-1"
      style={{ minWidth: "8ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="not-italic font-medium border-b-2 border-ink pb-0.5 inline-block whitespace-nowrap"
        >
          {SHIPPING[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
