"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Stop = {
  year: string;
  place: string;
  role: string;
  note: string;
  tag: string;
  domain: string;
  accent: "sun" | "acid" | "iris" | "hot" | "sky" | "cream";
};

const stops: Stop[] = [
  {
    year: "2017",
    place: "Reliance Jio",
    role: "Intern · Brand Marketing",
    note: "first campaign, first standing ovation. 250K impressions in three weeks. also the year I learned that 'just one tweak' takes a week.",
    tag: "start",
    domain: "Telecom · AdTech",
    accent: "sky",
  },
  {
    year: "2020",
    place: "Under 25",
    role: "Product Manager",
    note: "first real PM seat. 0 → 20K users in 90 days, 40% MoM retention. also my first PM heartbreak, then the fix the next morning.",
    tag: "0 → 1",
    domain: "Consumer · Community",
    accent: "sun",
  },
  {
    year: "2023",
    place: "War Room × Flipkart",
    role: "Product Manager",
    note: "shipped generative AI inside Big Billion Day '23 — record engagement, record sales. eight weeks of deploys at 2am, on filter coffee and absolute conviction.",
    tag: "genai",
    domain: "GenAI · E-commerce",
    accent: "acid",
  },
  {
    year: "2024",
    place: "Buthey",
    role: "Co-Founder / COO",
    note: "premium women's wear from scratch — ₹25L in six months. learned ops the messy way: pack-outs, returns, vendor calls, the lot. founder mode is a personality trait now.",
    tag: "founder",
    domain: "Retail · Ops",
    accent: "hot",
  },
  {
    year: "2025",
    place: "Collective Artists",
    role: "Head of Product",
    note: "took an AdTech 0 → 1 → scale. 100K → 1.6M users, ₹12Cr in-app revenue. the team that turned a deck into a brand.",
    tag: "scale",
    domain: "AdTech · Creator economy",
    accent: "iris",
  },
  {
    year: "now",
    place: "Nagarro × Reliance Retail",
    role: "Product Owner",
    note: "Swadesh US launch in 45 days, +32% conversion, AI demand forecasting now in prod. currently shipping at midnight, currently loving it.",
    tag: "current",
    domain: "E-commerce · AI/ML",
    accent: "cream",
  },
];

const accentBg: Record<Stop["accent"], string> = {
  sun: "bg-sun",
  acid: "bg-acid",
  iris: "bg-iris",
  hot: "bg-hot",
  sky: "bg-sky",
  cream: "bg-cream",
};

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Rail fill ties to the rail's own scroll position so the line "draws itself"
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 20%"],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="path" ref={sectionRef} className="relative px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink md:mb-3">
              · 03 / path
            </span>
            <h2 className="mt-4 md:mt-0 font-display font-bold text-ink text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.03em]">
              seven years,
              <br />
              <span className="italic relative inline-block">
                <span className="relative z-10 text-ink">zero dull quarters</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-sky rounded-[0.4em] -z-0"
                />
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 max-w-xs md:text-right">
            jio interns to founder mode to head of product. the actual order, no greatest-hits remix.
          </p>
        </div>

        {/* Timeline rail */}
        <div className="relative md:pl-32">
          <div ref={railRef} className="relative pl-10 md:pl-12">
            {/* Rail track (greyed) */}
            <span
              aria-hidden
              className="absolute top-3 bottom-3 w-[2px] bg-ink/15"
              style={{ left: "1rem" }}
            />
            {/* Rail fill — animates with scroll */}
            <motion.span
              aria-hidden
              style={{ height: railHeight, left: "1rem" }}
              className="absolute top-3 w-[2px] bg-ink rounded-full origin-top"
            />

            <ul className="space-y-10 md:space-y-14">
              {stops.map((s, i) => (
                <Row key={s.year + s.place} stop={s} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ stop: s, index }: { stop: Stop; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative"
    >
      {/* Year — mobile: bold accent pill above card; desktop: subtle left gutter */}
      <div className="mb-3 md:hidden">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full border-[1.5px] border-ink ${accentBg[s.accent]} font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink shadow-[0_2px_0_0_#171412]`}
        >
          {s.year}
        </span>
      </div>
      <div className="hidden md:block md:absolute md:top-[0.65rem] md:w-28 md:text-right md:-left-32">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/70">
          {s.year}
        </span>
      </div>

      {/* Card */}
      <div className="bg-cream border-[1.5px] border-ink rounded-2xl shadow-[0_4px_0_0_#171412] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#171412] overflow-hidden">
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-display font-medium text-xl md:text-2xl leading-tight text-ink">
              {s.place}
            </h3>
            <span className="chip chip-solid text-[9px] shrink-0 hidden md:inline-flex">
              {s.tag}
            </span>
          </div>
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink/60">
            {s.role} · {s.domain}
          </p>
          <p className="mt-3 text-sm md:text-[15px] text-ink/75 leading-relaxed">
            {s.note}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
