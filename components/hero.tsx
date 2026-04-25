"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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
      {/* Warm radial glow — the only ambient backdrop. No 3D stickers. */}
      <div className="absolute inset-0 radial-fade pointer-events-none" />

      {/* Foreground content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-24 min-h-[100svh] flex flex-col justify-between gap-10 md:gap-12"
      >
        {/* Masthead row — status pill left, edition meta right */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
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

        {/* Main lockup: text on the left (7 cols), polaroid on the right (5 cols).
            Stacks vertically on mobile with the polaroid below the CTAs. */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Left — name, intro, CTAs */}
          <div className="md:col-span-7 lg:col-span-7">
            <h1 className="font-display font-bold leading-[0.88] tracking-[-0.035em] text-ink text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[8.5rem]">
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
              className="mt-7 md:mt-9 text-base md:text-lg leading-[1.55] text-ink font-medium max-w-xl"
            >
              a product person from bengaluru. six years shipping things that stick — across AdTech, GenAI, e-commerce, and one stubborn little retail brand.
            </motion.p>

            {/* CTA row — both buttons identical h-11 / px-5 / same arrow style.
                Lime drop shadow on the primary, ink on the secondary. That's
                the only thing that differs visually. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
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

          {/* Right — polaroid. Centered on mobile, right-aligned on desktop.
              Inner card carries the -4° tilt + hover-to-level so framer's
              entry animation doesn't fight the CSS rotate. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end"
          >
            <div className="relative w-[240px] sm:w-[280px] md:w-[300px] lg:w-[340px] bg-cream border-[1.5px] border-ink rounded-2xl p-3 pb-14 shadow-[0_10px_0_0_#171412] -rotate-[4deg] hover:rotate-0 transition-transform duration-500 origin-center">
              {/* Washi tape strip — sun yellow, slightly off-axis */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 h-6 w-24 md:w-28 bg-sun/85 border-[1px] border-ink/30 shadow-[0_1px_0_0_rgba(23,20,18,0.15)] rounded-[2px]"
              />

              <div className="relative aspect-[4/5] rounded-md overflow-hidden border-[1.5px] border-ink">
                <Image
                  src="/rohit.jpg"
                  alt="Rohit Menda"
                  fill
                  sizes="(max-width: 768px) 280px, 340px"
                  className="object-cover"
                  priority
                />
                {/* Frame index — top-left, polaroid-developer stamp */}
                <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/95 bg-ink/70 backdrop-blur-sm rounded-md px-2 py-0.5">
                  frame · 00
                </div>
              </div>

              {/* Caption strip — GenZ sharpie scrawl */}
              <div className="absolute left-4 right-4 bottom-3.5">
                <p className="font-display italic font-medium text-base md:text-lg leading-tight text-ink">
                  shipped feature 🪩 in my main character era
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/55">
                  post-launch arc · blr · 26&apos;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
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
