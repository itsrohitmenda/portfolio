"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

const accentMap: Record<CaseStudy["accent"], string> = {
  lime: "bg-lime",
  hot: "bg-hot",
  electric: "bg-electric text-cream",
  peach: "bg-peach",
  butter: "bg-butter",
};

export default function CaseStudyGrid() {
  return (
    <section id="work" className="relative px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
              selected work — 2020 → now
            </p>
            <h2 className="font-display text-6xl md:text-8xl leading-none mt-3">
              the <span className="italic text-hot">receipts</span>.
            </h2>
          </div>
          <span className="hidden md:block font-mono text-xs uppercase tracking-widest text-ink/60">
            {caseStudies.length} case studies
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((c, i) => (
            <Card key={c.slug} study={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ study, index }: { study: CaseStudy; index: number }) {
  const isBig = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={isBig ? "md:col-span-2" : ""}
    >
      <Link
        href={`/work/${study.slug}`}
        data-cursor-label="read case →"
        className="group block"
      >
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`relative rounded-[28px] border-2 border-ink p-8 md:p-10 overflow-hidden ${accentMap[study.accent]}`}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
              <span className="text-2xl">{study.emoji}</span>
              <span>{study.company}</span>
              <span className="opacity-50">·</span>
              <span>{study.year}</span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">
              {String(study.order).padStart(2, "0")}
            </span>
          </div>

          <h3
            className={`mt-6 font-display leading-[0.95] ${
              isBig ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
            }`}
          >
            {study.title}
          </h3>

          <p
            className={`mt-4 max-w-2xl ${
              isBig ? "text-lg md:text-xl" : "text-base"
            } leading-relaxed`}
          >
            {study.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {study.domain.map((d) => (
              <span
                key={d}
                className="inline-flex items-center rounded-full border-2 border-ink/70 px-3 py-1 text-[11px] font-mono uppercase tracking-widest bg-cream/60"
              >
                {d}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl md:text-4xl leading-none">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-70">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              read the story →
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">
              {study.role}
            </span>
          </div>

          <motion.div
            aria-hidden
            className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-ink/5 group-hover:bg-ink/10 transition"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}
