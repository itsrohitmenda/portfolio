"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const rotating = [
  "AdTech",
  "GenAI",
  "Web3",
  "E-comm",
  "0→1",
  "community",
  "retail",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] pt-28 pb-20 px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-[520px] w-[520px] rounded-full bg-lime blur-3xl opacity-60 animate-float" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-hot blur-3xl opacity-40 animate-float" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
          </span>
          available for new roles · bangalore 🌴
        </motion.div>

        <h1 className="mt-10 font-display leading-[0.92] tracking-tight text-[18vw] md:text-[11vw] lg:text-[9.5rem]">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            hi, I'm <span className="italic text-hot">Rohit</span>.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            a PM who ships
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block relative"
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-lime -skew-x-6 translate-y-2" aria-hidden />
              <span className="relative italic">{rotating[idx]}</span>
            </span>{" "}
            products.
          </motion.span>
        </h1>

        <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="md:col-span-7 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            I turn <span className="font-display italic text-2xl md:text-3xl">chaotic zero-to-one briefs</span> into
            products real humans use. 6+ years across{" "}
            <span className="underline decoration-hot decoration-2 underline-offset-4">
              AdTech, GenAI, Web3, and retail
            </span>
            . Shipped with Flipkart, Reliance, and Polygon. Built 0→1 twice. Drank a lot of coffee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="md:col-span-5 flex flex-wrap gap-2 md:justify-end"
          >
            {[
              "15× growth",
              "750% DAU",
              "₹18Cr+ revenue",
              "1B+ impressions",
              "97% roadmap hit",
            ].map((k) => (
              <span key={k} className="chip">
                {k}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 right-6 hidden md:flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest"
        >
          <span className="h-px w-12 bg-ink/40" />
          scroll, it gets better
          <span className="animate-bounce">↓</span>
        </motion.div>
      </div>
    </section>
  );
}
