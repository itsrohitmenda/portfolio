"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import type { CaseStudy } from "@/lib/case-studies";

const FloatingObject = dynamic(() => import("@/components/floating-object"), { ssr: false });

const accentHex: Record<CaseStudy["accent"], string> = {
  lime: "#BFFF1A",
  hot: "#FF5ACD",
  electric: "#7C5CFF",
  peach: "#FFB4A2",
  butter: "#F5E9D0",
};

const shapeMap: Record<string, "torus" | "box" | "icosa" | "octa" | "ring"> = {
  swadesh: "box",
  "collective-artists-network": "torus",
  "flipkart-nme": "icosa",
  "under-25": "octa",
};

export default function CaseStudyBody({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const objectY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const color = accentHex[study.accent];
  const shape = shapeMap[study.slug] ?? "icosa";

  return (
    <article>
      {/* Hero with parallax 3D */}
      <div ref={heroRef} className="relative min-h-[90svh] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 20%, ${color}15, transparent 60%)`,
          }}
        />

        <motion.div
          style={{ y: objectY }}
          aria-hidden
          className="absolute pointer-events-none opacity-60 md:opacity-100 top-[55%] -translate-y-1/2 md:top-24 md:translate-y-0 right-0 md:right-10 h-[260px] w-[260px] md:h-[560px] md:w-[560px]"
        >
          <FloatingObject shape={shape} color={color} />
        </motion.div>

        <motion.div
          style={{ y, opacity }}
          className="relative max-w-7xl mx-auto px-6 pt-36 pb-20"
        >
          <Link
            href="/#work"
            data-cursor-label="back"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted inline-flex items-center gap-2 hover:text-ink transition"
          >
            ← all work
          </Link>

          <div className="mt-16 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            <span>{study.company}</span>
            <span className="opacity-40">·</span>
            <span>{study.role}</span>
            <span className="opacity-40">·</span>
            <span>{study.duration}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-medium text-5xl md:text-8xl lg:text-[7.5rem] leading-[0.95] tracking-[-0.025em] max-w-4xl"
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-ink/80 font-display italic"
          >
            {study.tagline}
          </motion.p>

          <div className="mt-14 flex flex-wrap gap-2">
            {study.domain.map((d) => (
              <span key={d} className="chip">
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TL;DR */}
      <section className="relative px-6 py-28 border-y border-hairline">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-14">
          <div className="md:col-span-5">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color }}
            >
              · tl;dr
            </span>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
              the hook.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-[1.7] text-ink/75 max-w-md">
              {study.hook}
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="text-xl md:text-2xl leading-[1.45] font-display italic text-ink/90">
              {study.tldr}
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl hairline-border p-5 bg-panel/40 backdrop-blur hover:border-ink/30 transition"
                >
                  <div className="font-display text-4xl leading-none" style={{ color }}>
                    {m.value}
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="relative px-6 py-28">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            · the story
          </span>
          {study.chapters.map((ch, i) => (
            <motion.div
              key={ch.heading}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.04 }}
              className="relative pt-16 pb-16 border-b border-hairline last:border-b-0 last:pb-0"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-xs uppercase tracking-[0.25em]"
                  style={{ color }}
                >
                  ch. {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display font-medium text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.015em]">
                {ch.heading}
              </h3>
              <p className="mt-6 text-base md:text-lg leading-[1.7] text-ink/75 max-w-2xl">
                {ch.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shipped + Stack */}
      <section className="relative px-6 py-24 border-t border-hairline">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-14">
          <div className="md:col-span-7">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color }}
            >
              · what shipped
            </span>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
              receipts.
            </h2>
            <ul className="mt-10 space-y-4">
              {study.shipped.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-5 text-base md:text-lg border-b border-hairline pb-4 last:border-b-0"
                >
                  <span
                    className="font-mono text-[11px] shrink-0 pt-1.5"
                    style={{ color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink/85 leading-relaxed">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5 md:pl-6">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color }}
            >
              · stack
            </span>
            <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
              tools.
            </h2>
            <div className="mt-10 flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next up */}
      <section className="relative border-t border-hairline">
        <Link
          href={`/work/${next.slug}`}
          data-cursor-label="next case →"
          className="group block transition"
        >
          <div className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition"
              style={{ background: accentHex[next.accent] }}
            />
            <span className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              · next up / 0{next.order}
            </span>
            <div className="relative mt-6 flex items-center justify-between gap-6">
              <h3 className="font-display font-medium text-3xl md:text-6xl lg:text-[6rem] leading-[0.98] tracking-[-0.025em]">
                {next.title}
              </h3>
              <span className="hidden md:block font-display text-6xl md:text-7xl opacity-60 group-hover:translate-x-4 group-hover:opacity-100 transition-all duration-500">
                →
              </span>
            </div>
            <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              {next.company} · {next.year}
            </p>
          </div>
        </Link>
      </section>
    </article>
  );
}
