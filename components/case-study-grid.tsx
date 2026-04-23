"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

const FloatingObject = dynamic(() => import("./floating-object"), { ssr: false });

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

export default function CaseStudyGrid() {
  return (
    <section id="work" className="relative px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:mb-3">
              · 01 / work
            </span>
            <h2 className="mt-4 md:mt-0 font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.025em]">
              selected
              <br />
              <span className="italic text-acid">case studies</span>.
            </h2>
          </div>
          <div className="text-left md:text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {caseStudies.length} stories
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              2020 — now
            </p>
          </div>
        </div>

        {/* Bento grid — 4 cards, 6-col layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(260px,auto)] gap-4">
          {caseStudies.map((c, i) => {
            // i=0 Swadesh: hero card (4 col × 2 row)
            // i=1 CAN:      tall (2 col × 2 row)
            // i=2 Flipkart: half (3 col × 1 row)
            // i=3 U25:      half (3 col × 1 row)
            let className = "md:col-span-3";
            if (i === 0) className = "md:col-span-4 md:row-span-2";
            if (i === 1) className = "md:col-span-2 md:row-span-2";
            if (i === 2 || i === 3) className = "md:col-span-3";
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className={className}
              >
                <Card study={c} big={i === 0} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({ study, big }: { study: CaseStudy; big?: boolean }) {
  const color = accentHex[study.accent];
  const shape = shapeMap[study.slug] ?? "icosa";

  return (
    <Link
      href={`/work/${study.slug}`}
      data-cursor-label="open case"
      className="group block h-full"
    >
      <article className="relative h-full rounded-3xl hairline-border bg-panel/60 backdrop-blur-xl overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:border-ink/30 p-6 md:p-10 flex flex-col">
        <div
          aria-hidden
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700"
          style={{ background: color }}
        />

        {/* 3D accent in the top-right */}
        <div
          className={`absolute pointer-events-none transition-opacity duration-500 ${
            big
              ? "top-3 right-3 h-32 w-32 md:top-4 md:right-4 md:h-48 md:w-48 opacity-80 md:opacity-90"
              : "top-2 right-2 h-24 w-24 md:h-28 md:w-28 opacity-70 md:opacity-80"
          } group-hover:opacity-100`}
        >
          <FloatingObject shape={shape} color={color} />
        </div>

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            <span>{study.company.split(" × ")[0]}</span>
            <span className="opacity-40">·</span>
            <span>{study.year}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
            {String(study.order).padStart(2, "0")} / 04
          </span>
        </div>

        <div className="relative mt-auto pt-10">
          <h3
            className={`font-display font-medium leading-[0.95] tracking-[-0.02em] ${
              big ? "text-4xl md:text-6xl lg:text-7xl" : "text-2xl md:text-4xl"
            }`}
          >
            {study.title}
          </h3>

          <p
            className={`mt-5 text-muted leading-relaxed ${
              big ? "text-lg max-w-lg" : "text-sm max-w-sm"
            }`}
          >
            {study.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {study.domain.slice(0, big ? 4 : 2).map((d) => (
              <span
                key={d}
                className="inline-flex items-center rounded-full hairline-border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-muted"
              >
                {d}
              </span>
            ))}
          </div>

          {big && (
            <div className="mt-8 grid grid-cols-4 gap-6 pt-8 border-t border-hairline">
              {study.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <div className="font-display text-3xl leading-none text-ink">
                    {m.value}
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted group-hover:text-ink transition-colors">
              {study.role}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted flex items-center gap-2 group-hover:text-acid transition-colors">
              read
              <span className="inline-block transition-transform group-hover:translate-x-2">
                →
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
