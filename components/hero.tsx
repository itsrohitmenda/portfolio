"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene"), { ssr: false });

const metrics = [
  { v: "15×", l: "user growth", c: "bg-sun" },
  { v: "+750%", l: "dau lift", c: "bg-lime" },
  { v: "₹18Cr+", l: "revenue", c: "bg-pink text-cream" },
  { v: "1B+", l: "impressions", c: "bg-sky" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
        className="relative z-10 max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-20 min-h-[100svh] flex flex-col justify-between pointer-events-none"
      >
        <div className="pointer-events-auto">
          {/* Masthead row — status pill left, edition meta right (magazine feel) */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
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
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 pt-2"
            >
              <span>folio / 2026</span>
              <span className="opacity-30">·</span>
              <span>issue no. 04</span>
            </motion.div>
          </div>

          <h1 className="mt-10 md:mt-14 font-display font-bold leading-[0.9] tracking-[-0.03em] text-ink text-[15vw] md:text-[11vw] lg:text-[9.5rem]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              product
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block italic"
            >
              with{" "}
              <span className="relative inline-block">
                <span className="relative z-10">taste,</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.08em] bottom-[0.12em] top-[0.2em] bg-pink rounded-[0.4em] -z-0"
                />
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              shipped with{" "}
              <span className="italic relative inline-block">
                <span className="relative z-10">velocity</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.08em] bottom-[0.12em] top-[0.2em] bg-sun rounded-[0.4em] -z-0"
                />
              </span>
              .
            </motion.span>
          </h1>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 md:gap-10 items-end pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="md:col-span-5 md:col-start-1 max-w-lg"
          >
            <p className="text-base md:text-lg leading-relaxed text-ink font-medium">
              hi macha, I'm{" "}
              <span className="bg-pink text-cream px-2 py-0.5 rounded-md font-bold border-[1.5px] border-ink shadow-[0_2px_0_0_#171412] inline-block">
                Rohit
              </span>
              {" "}— product, AdTech, GenAI, e-comm and a small dent in Indian retail. six years of turning chaotic briefs into products that stick around. built with Flipkart, Reliance, Under 25, and a co-founder + a brick-wall table.
            </p>

            {/* Signed tag — quiet, not tacked on */}
            <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
              <span
                aria-hidden
                className="h-[1px] w-8 bg-ink/40"
              />
              <span>signed / bengaluru, ist</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="md:col-span-6 md:col-start-7 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {metrics.map((m) => (
              <div
                key={m.l}
                className={`${m.c} rounded-2xl border-[1.5px] border-ink p-4 shadow-[0_3px_0_0_#171412]`}
              >
                <div className="font-display font-bold text-3xl leading-none tracking-tight">
                  {m.v}
                </div>
                <div className="mt-2 font-mono text-[10px] font-medium uppercase tracking-widest opacity-75">
                  {m.l}
                </div>
              </div>
            ))}
          </motion.div>
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
