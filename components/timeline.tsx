"use client";

import { motion } from "framer-motion";

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
    role: "Intern",
    note: "First campaign, first wins. 250K impressions in 3 weeks.",
    tag: "start",
    domain: "Telecom · AdTech",
    accent: "sky",
  },
  {
    year: "2020",
    place: "Under 25",
    role: "Product Manager",
    note: "First real PM seat. 20K users in 90 days, 40% MoM retention.",
    tag: "0 → 1",
    domain: "Consumer · Community",
    accent: "sun",
  },
  {
    year: "2023",
    place: "War Room × Flipkart",
    role: "Product Manager",
    note: "Shipped generative AI inside Big Billion Day 2023. Record engagement, record sales.",
    tag: "genai",
    domain: "GenAI · E-commerce",
    accent: "acid",
  },
  {
    year: "2024",
    place: "Buthey",
    role: "Co-Founder / COO",
    note: "Premium women's wear, ₹25L in 6 months. Supply chain to CX.",
    tag: "founder",
    domain: "Retail · Ops",
    accent: "hot",
  },
  {
    year: "2025",
    place: "Collective Artists",
    role: "Head of Product",
    note: "AdTech 0 → 1 → scale. 100K → 1.6M users. ₹12Cr in-app revenue.",
    tag: "scale",
    domain: "AdTech · Creator economy",
    accent: "iris",
  },
  {
    year: "now",
    place: "Nagarro × Reliance Retail",
    role: "Product Owner",
    note: "Swadesh US launch in 45 days. +32% conversion. AI demand forecasting.",
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
  return (
    <section id="path" className="relative px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink md:mb-3">
              · 02 / path
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
        </div>

        <ul className="space-y-3 md:space-y-4">
          {stops.map((s, i) => (
            <motion.li
              key={s.year + s.place}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group"
            >
              <div
                className={`bg-cream border-[1.5px] border-ink rounded-2xl shadow-[0_4px_0_0_#171412] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_0_0_#171412] overflow-hidden`}
              >
                <div className="grid grid-cols-12 items-center gap-3 md:gap-6 px-4 md:px-6 py-4 md:py-5">
                  {/* Year */}
                  <div className="col-span-3 md:col-span-1 font-mono text-xs md:text-sm font-medium uppercase tracking-widest text-ink/60">
                    {s.year}
                  </div>
                  {/* Accent swatch */}
                  <div className="col-span-2 md:col-span-1 flex items-center">
                    <span
                      className={`h-9 w-9 md:h-10 md:w-10 rounded-xl border-[1.5px] border-ink ${accentBg[s.accent]} shrink-0`}
                    />
                  </div>
                  {/* Place + role */}
                  <div className="col-span-7 md:col-span-4">
                    <h3 className="font-display font-medium text-lg md:text-xl leading-tight text-ink">
                      {s.place}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink/60">
                      {s.role}
                    </p>
                  </div>
                  {/* Domain chip */}
                  <div className="hidden md:flex col-span-3 items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink/60" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/70">
                      {s.domain}
                    </span>
                  </div>
                  {/* Tag pill + arrow */}
                  <div className="hidden md:flex col-span-3 justify-end items-center gap-3">
                    <span className="chip chip-solid text-[9px]">{s.tag}</span>
                    <span
                      aria-hidden
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full border-[1.5px] border-ink bg-sun text-ink font-display transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
                {/* Row footer — the note, a soft strip */}
                <div className="border-t border-ink/15 px-4 md:px-6 py-3 md:py-3.5 text-[13px] md:text-sm text-ink/75 leading-relaxed">
                  {s.note}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
