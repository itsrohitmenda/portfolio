"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { CaseStudy } from "@/lib/case-studies";

const accentBg: Record<CaseStudy["accent"], string> = {
  lime: "bg-lime",
  hot: "bg-hot text-cream",
  electric: "bg-electric text-cream",
  peach: "bg-peach",
  butter: "bg-butter",
};
const accentText: Record<CaseStudy["accent"], string> = {
  lime: "text-lime",
  hot: "text-hot",
  electric: "text-electric",
  peach: "text-peach",
  butter: "text-[#b08a3a]",
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
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <article>
      {/* Hero */}
      <div ref={heroRef} className={`relative overflow-hidden ${accentBg[study.accent]}`}>
        <motion.div
          style={{ y, opacity }}
          className="relative max-w-7xl mx-auto px-6 pt-36 pb-24"
        >
          <Link
            href="/#work"
            data-cursor-label="back"
            className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:translate-x-[-4px] transition"
          >
            ← back to work
          </Link>

          <div className="mt-12 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <span className="text-3xl">{study.emoji}</span>
            <span>{study.company}</span>
            <span className="opacity-50">·</span>
            <span>{study.role}</span>
            <span className="opacity-50">·</span>
            <span>{study.duration}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-6xl md:text-[9rem] leading-[0.9] tracking-tight"
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-2xl text-xl md:text-2xl leading-relaxed"
          >
            {study.tagline}
          </motion.p>

          <div className="mt-12 flex flex-wrap gap-2">
            {study.domain.map((d) => (
              <span
                key={d}
                className="inline-flex items-center rounded-full border-2 border-ink px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest bg-cream/60"
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-ink/10 blur-2xl" />
      </div>

      {/* TL;DR */}
      <section className="relative px-6 py-20 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className={`font-mono text-xs uppercase tracking-widest ${accentText[study.accent]}`}>
              tl;dr for the skimmers
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.05]">
              the hook
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{study.hook}</p>
          </div>
          <div className="md:col-span-7">
            <p className="text-xl md:text-2xl leading-relaxed font-display italic">
              {study.tldr}
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border-2 border-ink p-4 hover:-translate-y-1 hover:rotate-[-1deg] transition"
                >
                  <div className="font-display text-4xl leading-none">{m.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-70">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto">
          {study.chapters.map((ch, i) => (
            <motion.div
              key={ch.heading}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative pb-16 mb-16 border-b border-ink/15 last:border-b-0 last:pb-0 last:mb-0"
            >
              <div className="flex items-baseline gap-4">
                <span className={`font-mono text-xs uppercase tracking-widest ${accentText[study.accent]}`}>
                  ch.{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
                {ch.heading}
              </h3>
              <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink/80">
                {ch.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shipped + Stack */}
      <section className="relative px-6 py-20 bg-ink text-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              what shipped
            </p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl leading-[1.02]">
              receipts.
            </h2>
            <ul className="mt-8 space-y-3">
              {study.shipped.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 text-lg"
                >
                  <span className="font-mono text-xs text-lime mt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              stack
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-cream/30 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next up */}
      <section className="relative">
        <Link
          href={`/work/${next.slug}`}
          data-cursor-label="next →"
          className={`block border-t-2 border-ink ${accentBg[next.accent]} hover:brightness-95 transition`}
        >
          <div className="max-w-7xl mx-auto px-6 py-20">
            <p className="font-mono text-xs uppercase tracking-widest">next up</p>
            <div className="mt-4 flex items-center justify-between gap-6">
              <h3 className="font-display text-4xl md:text-7xl leading-[0.95]">
                {next.title}
              </h3>
              <span className="hidden md:block font-display text-6xl md:text-8xl">
                →
              </span>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-70">
              {next.company} · {next.year}
            </p>
          </div>
        </Link>
      </section>
    </article>
  );
}
