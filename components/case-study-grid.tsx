"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

const FloatingObject = dynamic(() => import("./floating-object"), { ssr: false });

// Accent colour per card - drives the 3D object and the top band of the card.
const accentHex: Record<CaseStudy["accent"], string> = {
  lime: "#BFFF3D",
  hot: "#FF3E9D",
  electric: "#7AB9FF",
  peach: "#FFB4A2",
  butter: "#FFC22E",
};

const accentBg: Record<CaseStudy["accent"], string> = {
  lime: "bg-acid",
  hot: "bg-hot",
  electric: "bg-sky",
  peach: "bg-cream",
  butter: "bg-sun",
};

const shapeMap: Record<string, "torus" | "box" | "icosa" | "octa" | "ring"> = {
  swadesh: "box",
  "collective-artists-network": "torus",
  buthey: "ring",
  "flipkart-nme": "icosa",
  "under-25": "octa",
  "iesa-vr-rover": "icosa",
};

export default function CaseStudyGrid() {
  return (
    <section id="work" className="relative px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header: label stacks ABOVE h2 (matches About). Side meta sits to
            the right on desktop, below on mobile. md:items-end keeps the
            meta baseline-aligned with the h2's last line. */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-10 md:mb-14">
          <div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
              · 02 / work
            </span>
            <h2 className="mt-4 font-display font-bold text-ink text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.03em]">
              selected
              <br />
              <span className="italic relative inline-block">
                <span className="relative z-10 text-ink">case studies.</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-lime rounded-[0.4em] -z-0"
                />
              </span>
            </h2>
          </div>
          <div className="text-left md:text-right text-ink font-medium">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
              {caseStudies.length} stories
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em]">
              2017 - now
            </p>
          </div>
        </div>

        {/* Uniform 2-col grid - every card same size + same structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Card study={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ study }: { study: CaseStudy }) {
  const color = accentHex[study.accent];
  const band = accentBg[study.accent];
  const shape = shapeMap[study.slug] ?? "icosa";

  // First 3 metrics so every card shows a consistent strip
  const metrics = study.metrics.slice(0, 3);

  return (
    <Link
      href={`/work/${study.slug}`}
      data-cursor-label="open case"
      className="group block h-full"
    >
      <article className="relative h-full rounded-3xl border-[1.5px] border-ink overflow-hidden bg-cream text-ink shadow-[0_6px_0_0_#171412] transition-all duration-400 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_10px_0_0_#171412] flex flex-col">
        {/* Accent band with 3D mark */}
        <div className={`relative ${band} border-b-[1.5px] border-ink px-6 md:px-8 pt-5 md:pt-6 pb-4 md:pb-5 min-h-[130px] md:min-h-[150px]`}>
          <div className="relative flex items-center gap-3 pr-28 md:pr-32">
            <span className="chip chip-solid">
              {String(study.order).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70 truncate">
              {study.company.split(" × ")[0]}
            </span>
          </div>

          {/* 3D accent - breathing room from every edge */}
          <div
            aria-hidden
            className="absolute top-2 right-3 md:top-3 md:right-5 h-24 w-24 md:h-28 md:w-28 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110"
          >
            <FloatingObject shape={shape} color={color} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 px-6 md:px-8 py-6 md:py-8">
          <h3 className="font-display font-medium text-2xl md:text-3xl leading-[1.05] tracking-[-0.02em]">
            {study.title}
          </h3>
          <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-ink/75">
            {study.tagline}
          </p>

          {/* Metrics strip - always 3 on every card. Tighter type + tracking
              on mobile so 3 cells share a narrow card without wrapping. */}
          <div className="mt-6 grid grid-cols-3 gap-2 md:gap-4 py-4 border-y border-ink/15">
            {metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <div className="font-display font-bold text-lg sm:text-xl md:text-2xl leading-none tracking-tight">
                  {m.value}
                </div>
                <div className="mt-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.08em] sm:tracking-[0.15em] text-ink/60 leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Domain chips - whitespace-nowrap keeps each pill on one line, the
              flex-wrap parent pushes overflow pills to the next row instead.
              leading-none + symmetric vertical padding keeps the uppercase
              glyphs optically centred inside the pill at every size. */}
          <div className="mt-5 flex flex-wrap gap-2">
            {study.domain.slice(0, 3).map((d) => (
              <span
                key={d}
                className="inline-flex items-center justify-center whitespace-nowrap leading-none rounded-full border-[1.5px] border-ink bg-paperDeep px-2.5 pt-[0.35rem] pb-[0.3rem] text-[10px] font-mono font-medium uppercase tracking-[0.08em]"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
              {study.role}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 font-semibold">
              read
              <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border-[1.5px] border-ink bg-sun transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
