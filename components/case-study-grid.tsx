"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

const FloatingObject = dynamic(() => import("./floating-object"), { ssr: false });

// Mapped to the warm playful palette
const accentHex: Record<CaseStudy["accent"], string> = {
  lime: "#BFFF3D",       // acid
  hot: "#FF3E9D",        // hot pink
  electric: "#7AB9FF",   // sky (was electric violet)
  peach: "#FFB4A2",      // peach (unused now)
  butter: "#FFC22E",     // sun yellow
};

const cardBg: Record<CaseStudy["accent"], string> = {
  lime: "bg-acid",
  hot: "bg-hot",
  electric: "bg-sky",
  peach: "bg-cream",
  butter: "bg-sun",
};

const shapeMap: Record<string, "torus" | "box" | "icosa" | "octa" | "ring"> = {
  swadesh: "box",
  "collective-artists-network": "torus",
  "flipkart-nme": "icosa",
  "under-25": "octa",
};

export default function CaseStudyGrid() {
  return (
    <section id="work" className="relative px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink md:mb-3">
              · 01 / work
            </span>
            <h2 className="mt-4 md:mt-0 font-display font-bold text-ink text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.03em]">
              selected
              <br />
              <span className="italic relative inline-block">
                <span className="relative z-10 text-ink">case studies</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-lime rounded-[0.4em] -z-0"
                />
              </span>
              .
            </h2>
          </div>
          <div className="text-left md:text-right text-ink font-medium">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
              {caseStudies.length} stories
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em]">
              2020 — now
            </p>
          </div>
        </div>

        {/* Bento grid — 4 cards, 6-col layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(260px,auto)] gap-4 md:gap-6">
          {caseStudies.map((c, i) => {
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
                <Card study={c} big={i === 0} index={i} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({
  study,
  big,
  index,
}: {
  study: CaseStudy;
  big?: boolean;
  index: number;
}) {
  const color = accentHex[study.accent];
  const shape = shapeMap[study.slug] ?? "icosa";

  // Alternate card backgrounds so the grid reads colorful (ref vibes)
  // Hero card stays cream for readability
  const bg = index === 0 ? "bg-cream" : cardBg[study.accent] ?? "bg-cream";

  return (
    <Link
      href={`/work/${study.slug}`}
      data-cursor-label="open case"
      className="group block h-full"
    >
      <article
        className={`relative h-full rounded-3xl border-[1.5px] border-ink overflow-hidden p-6 md:p-10 flex flex-col text-ink ${bg} shadow-[0_6px_0_0_#171412] transition-all duration-400 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_10px_0_0_#171412]`}
      >
        {/* 3D accent in the top-right */}
        <div
          className={`absolute pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110 ${
            big
              ? "top-3 right-3 h-36 w-36 md:top-6 md:right-6 md:h-56 md:w-56"
              : "top-2 right-2 h-24 w-24 md:top-4 md:right-4 md:h-32 md:w-32"
          }`}
        >
          <FloatingObject shape={shape} color={color} />
        </div>

        <div className="relative flex items-start justify-between gap-3">
          <span className="chip chip-solid">
            {String(study.order).padStart(2, "0")} / 04
          </span>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
            <span>{study.company.split(" × ")[0]}</span>
            <span className="opacity-40">·</span>
            <span>{study.year}</span>
          </div>
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
            className={`mt-5 leading-relaxed opacity-80 ${
              big ? "text-base md:text-lg max-w-lg" : "text-sm max-w-sm"
            }`}
          >
            {study.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {study.domain.slice(0, big ? 4 : 2).map((d) => (
              <span
                key={d}
                className="inline-flex items-center rounded-full border-[1.5px] border-ink bg-cream2 px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-widest"
              >
                {d}
              </span>
            ))}
          </div>

          {big && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-ink/20">
              {study.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <div className="font-display font-medium text-3xl leading-none">
                    {m.value}
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-widest opacity-70">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
              {study.role}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-medium">
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
