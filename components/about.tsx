"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const FloatingObject = dynamic(() => import("./floating-object"), { ssr: false });

const beliefs = [
  {
    n: "01",
    t: "Ship beats perfect.",
    b: "A v1 in prod learns more in a week than a v2 in a deck learns in a quarter. Direction beats precision until you know the direction.",
    accent: "bg-sun",
  },
  {
    n: "02",
    t: "Metrics describe. Narrative decides.",
    b: "Dashboards prove you're not crazy. Stories tell the team what to do next. A PM who can only read charts is a report.",
    accent: "bg-acid",
  },
  {
    n: "03",
    t: "Kill features proudly.",
    b: "The most under-rated PM muscle is saying no with a smile and a reason. Every no is a yes to the thing that matters.",
    accent: "bg-hot",
  },
  {
    n: "04",
    t: "Ops is product.",
    b: "Community, logistics, CX, vendor ops — if the user feels it, it's in scope. The best products look like software and run like restaurants.",
    accent: "bg-iris",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
            · 03 / operating principles
          </span>
          <h2 className="mt-4 font-display font-medium text-cream text-5xl md:text-7xl leading-[0.98] tracking-[-0.025em]">
            how I<br />
            <span className="italic relative inline-block">
              <span className="relative z-10 text-ink">operate</span>
              <span
                aria-hidden
                className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-iris rounded-[0.4em] -z-0"
              />
            </span>
            .
          </h2>
          <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-ink font-medium max-w-md">
            Six years of shipping across AdTech, GenAI, E-commerce, and retail taught me a handful of things. The rest is just discipline and taste.
          </p>

          <div className="relative mt-10 h-64 hidden md:block">
            <FloatingObject shape="torus" color="#4AD6D6" />
          </div>
        </div>

        <ol className="md:col-span-7 space-y-4 md:space-y-5">
          {beliefs.map((b, i) => (
            <motion.li
              key={b.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-6 md:p-10 shadow-[0_5px_0_0_#1C120E] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 md:gap-6">
                <span
                  className={`font-mono text-xs font-medium uppercase tracking-[0.2em] shrink-0 ${b.accent} border-[1.5px] border-ink rounded-full px-2.5 py-1`}
                >
                  {b.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-medium text-2xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.015em]">
                    {b.t}
                  </h3>
                  <p className="mt-3 md:mt-4 text-ink/70 text-base md:text-lg leading-relaxed max-w-xl">
                    {b.b}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
