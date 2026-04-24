"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
    <section id="about" className="relative px-6 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Full-width editorial header */}
        <div className="max-w-4xl">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
            · 01 / operating principles
          </span>
          <h2 className="mt-4 font-display font-bold text-ink text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.03em]">
            how I{" "}
            <span className="italic relative inline-block">
              <span className="relative z-10 text-ink">operate</span>
              <span
                aria-hidden
                className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-pink rounded-[0.4em] -z-0"
              />
            </span>
            .
          </h2>
          <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-ink/80 font-medium max-w-2xl">
            Six years of shipping across AdTech, GenAI, E-commerce, and retail, boiled down to a handful of rules. The rest is just discipline and taste.
          </p>
        </div>

        {/* Editorial split: portrait (4) + principles (8) */}
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-14">
          {/* Portrait column — sticky on desktop */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 md:sticky md:top-28 md:self-start"
          >
            <div className="relative">
              {/* Editorial portrait — clean rounded rectangle, no polaroid tilt */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-[1.5px] border-ink shadow-[0_8px_0_0_#171412]">
                <Image
                  src="/rohit.jpg"
                  alt="Rohit Menda"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />

                {/* Subtle bottom gradient for caption legibility */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/45 to-transparent pointer-events-none" />

                {/* Index corner — top-left, like a contact-sheet frame */}
                <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/90 bg-ink/70 backdrop-blur-sm rounded-md px-2 py-1">
                  frame · 01
                </div>

                {/* Photo caption bar — locked to image */}
                <div className="absolute left-3 right-3 bottom-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display font-medium text-lg md:text-xl text-cream leading-tight">
                      Rohit Menda
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/80">
                      product · namma bengaluru
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-sun border-[1.5px] border-ink shadow-[0_2px_0_0_#171412] text-base" aria-hidden>
                    🤙
                  </span>
                </div>
              </div>

              {/* Ticket-stub stamp — editorial, not a polaroid tilt */}
              <motion.span
                initial={{ scale: 0.6, rotate: 0, opacity: 0 }}
                whileInView={{ scale: 1, rotate: -8, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
                className="absolute -top-4 -right-4 md:-top-5 md:-right-5 h-16 w-16 md:h-20 md:w-20 rounded-full bg-cream border-[1.5px] border-ink shadow-[0_3px_0_0_#171412] flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-ink"
              >
                <span className="text-[10px] tracking-[0.2em]">rm</span>
                <span className="h-[1px] w-5 bg-ink/30 my-0.5" />
                <span className="text-[8px] tracking-[0.2em] text-ink/70">2026</span>
              </motion.span>
            </div>

            {/* Editorial credit strip below the portrait */}
            <div className="mt-6 grid grid-cols-3 gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/60">
              <div>
                <p className="text-ink/40">years</p>
                <p className="mt-1 text-ink font-semibold">6+</p>
              </div>
              <div>
                <p className="text-ink/40">domains</p>
                <p className="mt-1 text-ink font-semibold">05</p>
              </div>
              <div>
                <p className="text-ink/40">based</p>
                <p className="mt-1 text-ink font-semibold">blr</p>
              </div>
            </div>
          </motion.aside>

          {/* Principles list */}
          <ol className="md:col-span-8 space-y-4 md:space-y-5 list-none">
            {beliefs.map((b, i) => (
              <motion.li
                key={b.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-6 md:p-8 shadow-[0_5px_0_0_#171412] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <span
                    className={`shrink-0 font-mono text-xs font-bold uppercase tracking-[0.2em] ${b.accent} border-[1.5px] border-ink rounded-full px-2.5 py-1 shadow-[0_2px_0_0_#171412]`}
                  >
                    {b.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-medium text-2xl md:text-3xl lg:text-4xl leading-[1.05] tracking-[-0.015em]">
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
      </div>
    </section>
  );
}
