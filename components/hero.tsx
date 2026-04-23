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

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0 radial-fade pointer-events-none" />

      {/* 3D scene as background — scroll-linked */}
      <div className="absolute inset-0 z-0">
        <Scene scrollRef={ref} />
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 min-h-[100svh] flex flex-col justify-between"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-75 animate-ping_slow" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-acid" />
            </span>
            <span className="text-ink">open to roles</span>
            <span className="opacity-40">/</span>
            <span>bangalore · ist (utc+5:30)</span>
          </motion.div>

          <h1 className="mt-10 md:mt-14 font-display font-medium leading-[0.92] tracking-[-0.025em] text-[14vw] md:text-[10vw] lg:text-[9.5rem]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Product
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-ink/90"
            >
              with taste,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              shipped with <span className="italic text-acid">velocity</span>.
            </motion.span>
          </h1>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 md:gap-10 items-end">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="md:col-span-5 md:col-start-1 text-base md:text-lg leading-relaxed text-ink/80 max-w-lg"
          >
            I'm <span className="text-ink font-medium">Rohit Menda</span> — product manager and founder with six years turning chaotic briefs into products that ship. AdTech, GenAI, E-commerce, retail. Built with Flipkart, Reliance, and friends.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="md:col-span-6 md:col-start-7 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { v: "15×", l: "user growth" },
              { v: "+750%", l: "DAU uplift" },
              { v: "₹18Cr+", l: "revenue" },
              { v: "1B+", l: "impressions" },
            ].map((m) => (
              <div
                key={m.l}
                className="hairline-border rounded-2xl p-4 bg-ink/[0.02] backdrop-blur"
              >
                <div className="font-display text-3xl leading-none text-ink">
                  {m.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
