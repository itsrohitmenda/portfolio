"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene"), { ssr: false });

// Lived-in "currently" panel — five lines that say more than a CV could.
const currently = [
  { k: "shipping", v: "Swadesh US launch · Reliance Retail" },
  { k: "obsessing over", v: "GenAI in commerce, ops at small brands" },
  { k: "reading", v: "Working Backwards · Colin Bryar" },
  { k: "drinking", v: "filter coffee, third one before lunch" },
  { k: "saying yes to", v: "freelance briefs · the right full-time" },
];

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
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-20 min-h-[100svh] flex flex-col gap-10 md:gap-14 pointer-events-none"
      >
        {/* Masthead row — status pill left, edition meta right (magazine feel) */}
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

        {/* Name lockup — magazine cover style introduction */}
        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-ink/70 mb-4 md:mb-6"
          >
            <span aria-hidden className="h-[1px] w-8 bg-ink/40" />
            <span>introducing</span>
            <span className="opacity-40">/</span>
            <span>folio entry · 01</span>
          </motion.div>

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
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-6 md:mt-8 font-display italic text-ink/85 text-2xl md:text-3xl lg:text-4xl leading-tight tracking-[-0.015em] max-w-3xl"
          >
            product person, shipping things that{" "}
            <span className="not-italic font-medium border-b-2 border-ink pb-0.5">stick around</span>
            {" "}— from a brick-wall table in bengaluru.
          </motion.p>
        </div>

        {/* Two-col body: personal intro + lived-in vitals */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="md:col-span-7 max-w-xl"
          >
            <p className="text-base md:text-lg leading-relaxed text-ink font-medium">
              I started at Reliance Jio in 2017, did a real PM stint at Under 25, shipped GenAI inside Flipkart Big Billion Day &apos;23, ran ops as a co-founder at Buthey, and now live between Bangalore midnight standups and US retail launch deadlines.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-ink/75">
              If it ships, sells, or keeps a community alive — odds are I&apos;ve broken it once and fixed it twice. Six years across AdTech, GenAI, e-commerce and retail.
            </p>

            {/* Action row */}
            <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3">
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

              {/* Signature flourish */}
              <span
                aria-hidden
                className="ml-1 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-ink/55"
              >
                <span className="h-[1px] w-6 bg-ink/35" />
                <span>~ rm</span>
              </span>
            </div>
          </motion.div>

          {/* Currently widget */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="md:col-span-5"
          >
            <div className="relative bg-cream border-[1.5px] border-ink rounded-3xl p-5 md:p-6 shadow-[0_5px_0_0_#171412]">
              {/* Card header — like a luggage tag */}
              <div className="flex items-center justify-between gap-3 mb-4 md:mb-5">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] font-bold text-ink">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-75 animate-ping_slow" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-acid" />
                  </span>
                  currently
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/50">
                  apr · 2026
                </span>
              </div>

              <ul className="divide-y divide-ink/10">
                {currently.map((row) => (
                  <li
                    key={row.k}
                    className="grid grid-cols-[7rem_1fr] md:grid-cols-[8rem_1fr] gap-3 py-2.5"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 self-center">
                      {row.k}
                    </span>
                    <span className="text-sm md:text-[15px] text-ink leading-snug font-medium self-center">
                      {row.v}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer rail — find me */}
              <div className="mt-4 pt-3 border-t border-dashed border-ink/25 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/65">
                <span>find me</span>
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <a href="https://linkedin.com/in/rohit-menda" target="_blank" rel="noreferrer" className="hover:underline">linkedin</a>
                  <span className="opacity-30">·</span>
                  <a href="mailto:itsrohitmenda@gmail.com" className="hover:underline">email</a>
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
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
