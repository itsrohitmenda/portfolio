"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const beliefs = [
  {
    n: "01",
    t: "Ship beats perfect.",
    b: "A v1 in prod learns more in a week than a v2 in a deck learns in a quarter. I'd rather argue with real users than ideal ones.",
    accent: "bg-sun",
  },
  {
    n: "02",
    t: "Metrics describe. Narrative decides.",
    b: "Dashboards prove you're not crazy. Stories tell the team what to do on Monday. A PM who can only read charts is just a report with legs.",
    accent: "bg-acid",
  },
  {
    n: "03",
    t: "Kill features proudly.",
    b: "The most under-rated PM muscle is saying no with a smile and a reason. Every no is a yes to the thing that actually matters this quarter.",
    accent: "bg-hot",
  },
  {
    n: "04",
    t: "Ops is product.",
    b: "Community, logistics, CX, vendor calls at 11pm — if the user feels it, it's in scope. The best products look like software and run like restaurants.",
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
              <span className="relative z-10 text-ink">operate.</span>
              <span
                aria-hidden
                className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-pink rounded-[0.4em] -z-0"
              />
            </span>
          </h2>
          <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-ink/80 font-medium max-w-2xl">
            Six years across AdTech, GenAI, e-commerce and retail — Jio interns to founder mode to head of product. These are the four rules I keep coming back to. The rest is taste, conviction, and showing up on Monday.
          </p>
        </div>

        {/* Editorial split: portrait (4) + principles (8) */}
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-14">
          {/* Portrait column — sticky polaroid on desktop */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 md:sticky md:top-28 md:self-start"
          >
            {/* Polaroid frame: cream card, thicker bottom border for the caption strip,
                gentle tilt, springy hover that levels it out. */}
            <motion.div
              initial={{ rotate: 0 }}
              whileInView={{ rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-cream border-[1.5px] border-ink rounded-2xl p-3 md:p-4 pb-12 md:pb-14 shadow-[0_10px_0_0_#171412] hover:rotate-0 transition-transform duration-500 origin-center"
            >
              {/* Strip of washi tape across the top — the polaroid touch */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 h-6 w-24 md:w-28 bg-sun/80 border-[1px] border-ink/30 shadow-[0_1px_0_0_rgba(23,20,18,0.15)] rounded-[2px]"
              />

              <div className="relative aspect-[4/5] rounded-md overflow-hidden border-[1.5px] border-ink">
                <Image
                  src="/rohit.jpg"
                  alt="Rohit Menda"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
                {/* Frame index — bottom-left, polaroid-developer-style stamp */}
                <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/95 bg-ink/70 backdrop-blur-sm rounded-md px-2 py-0.5">
                  frame · 01
                </div>
              </div>

              {/* Polaroid caption strip — the wide white space below the photo,
                  written like a sharpie scrawl */}
              <div className="absolute left-4 right-4 bottom-3 md:bottom-4 flex items-end justify-between gap-3">
                <div>
                  <p className="font-display italic font-medium text-lg md:text-xl text-ink leading-tight">
                    rohit, blr 26&apos;
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/55">
                    product · namma bengaluru
                  </p>
                </div>
                <span aria-hidden className="font-display italic text-ink/60 text-base">
                  🤙
                </span>
              </div>

              {/* Ticket-stub stamp — sits in the corner of the polaroid */}
              <motion.span
                initial={{ scale: 0.6, rotate: 0, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 12, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
                className="absolute -bottom-5 -right-5 md:-bottom-6 md:-right-6 h-16 w-16 md:h-20 md:w-20 rounded-full bg-acid border-[1.5px] border-ink shadow-[0_3px_0_0_#171412] flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-ink"
              >
                <span className="text-[10px] tracking-[0.2em]">rm</span>
                <span className="h-[1px] w-5 bg-ink/40 my-0.5" />
                <span className="text-[8px] tracking-[0.2em] text-ink/75">2026</span>
              </motion.span>
            </motion.div>

            {/* Editorial credit strip below the polaroid */}
            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/60">
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
