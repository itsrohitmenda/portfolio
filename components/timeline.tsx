"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stops = [
  {
    year: "2017",
    place: "Reliance Jio",
    role: "Intern",
    note: "First campaign, first wins. 250K impressions in 3 weeks.",
    tag: "start",
  },
  {
    year: "2020",
    place: "Under 25",
    role: "Product Manager",
    note: "First real PM seat. 20K users in 90 days, 40% MoM retention.",
    tag: "0 → 1",
  },
  {
    year: "2023",
    place: "War Room × Flipkart",
    role: "Product Manager",
    note: "Shipped generative AI inside Big Billion Day 2023. Record engagement, record sales.",
    tag: "genai",
  },
  {
    year: "2024",
    place: "Buthey",
    role: "Co-Founder / COO",
    note: "Premium women's wear, ₹25L in 6 months. Supply chain to CX.",
    tag: "founder",
  },
  {
    year: "2025",
    place: "Collective Artists",
    role: "Head of Product",
    note: "AdTech 0 → 1 → scale. 100K → 1.6M users. ₹12Cr in-app revenue.",
    tag: "scale",
  },
  {
    year: "now",
    place: "Nagarro × Reliance Retail",
    role: "Product Owner",
    note: "Swadesh US launch in 45 days. +32% conversion. AI demand forecasting.",
    tag: "current",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="path" className="relative px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:mb-3">
              · 02 / path
            </span>
            <h2 className="mt-4 md:mt-0 font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.025em]">
              seven years,
              <br />
              <span className="italic text-violet">zero dull quarters</span>.
            </h2>
          </div>
        </div>

        <div ref={ref} className="relative">
          {/* Scroll-driven spine line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-hairline -translate-x-1/2 hidden md:block" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-acid via-violet to-signal -translate-x-1/2 origin-top hidden md:block"
          />

          <div className="space-y-8 md:space-y-20">
            {stops.map((s, i) => (
              <motion.div
                key={s.year + s.place}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className={`relative md:grid md:grid-cols-2 md:gap-16 items-center ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className={i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}>
                  <div className="inline-flex items-center gap-3 mb-3 md:mb-4">
                    <span className="font-display font-medium text-5xl md:text-7xl leading-none text-ink">
                      {s.year}
                    </span>
                    <span className="inline-flex items-center rounded-full hairline-border px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="font-display italic text-2xl md:text-4xl leading-tight">
                    {s.place}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                    {s.role}
                  </p>
                </div>

                <div className={i % 2 === 0 ? "md:pl-10 mt-3 md:mt-0" : "md:pr-10 mt-3 md:mt-0 md:text-right"}>
                  <p className="text-base md:text-xl leading-relaxed text-ink/80 max-w-md">
                    {s.note}
                  </p>
                </div>

                {/* Node */}
                <span className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-acid ring-4 ring-void" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
