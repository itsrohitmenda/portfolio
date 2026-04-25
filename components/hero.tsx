"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Warm radial glow */}
      <div className="absolute inset-0 radial-fade pointer-events-none" />

      {/* Sticker-pack 3D — fills the viewport, stickers orbit around text */}
      <div className="absolute inset-0 z-0">
        <Scene scrollRef={ref} />
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-24 min-h-[100svh] flex flex-col justify-between pointer-events-none"
      >
        {/* Masthead row — status pill left, edition meta right */}
        <div className="flex items-start justify-between gap-4 flex-wrap pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
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
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 pt-2"
          >
            <span>folio / 2026</span>
            <span className="opacity-30">·</span>
            <span>issue no. 04</span>
          </motion.div>
        </div>

        {/* Center stack: name + one-line intro + actions. Generous spacing. */}
        <div className="pointer-events-auto max-w-5xl">
          <h1 className="font-display font-bold leading-[0.88] tracking-[-0.035em] text-ink text-[16vw] md:text-[12vw] lg:text-[10.5rem]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              hi, i&apos;m
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block italic"
            >
              <span className="relative inline-block">
                <span className="relative z-10">rohit</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.06em] bottom-[0.14em] top-[0.22em] bg-pink rounded-[0.4em] -z-0"
                />
              </span>
              {" "}menda.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 md:mt-10 text-lg md:text-2xl leading-[1.45] text-ink font-medium max-w-2xl"
          >
            a product person from bengaluru. six years shipping things that stick — across AdTech, GenAI, e-commerce, and one stubborn little retail brand.
          </motion.p>

          {/* Action row — exactly two buttons, nothing else */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-ink text-cream rounded-full pl-5 pr-2 py-2 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold border-[1.5px] border-ink shadow-[0_4px_0_0_#BFFF3D] transition-transform hover:-translate-y-0.5"
            >
              see the work
              <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-lime text-ink transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="mailto:itsrohitmenda@gmail.com"
              className="inline-flex items-center gap-2 bg-cream text-ink rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold border-[1.5px] border-ink shadow-[0_3px_0_0_#171412] transition-transform hover:-translate-y-0.5"
            >
              say hi
              <span aria-hidden>↗</span>
            </a>
          </motion.div>
        </div>

        {/* Spacer that lets the bottom of the section breathe — scroll cue absolute below */}
        <div aria-hidden />
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
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
