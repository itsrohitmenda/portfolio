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
    <section id="path" className="relative px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
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

        {/* Timeline rail — mobile: year stacks above card; desktop: year left of rail */}
        <div className="relative md:pl-32">
          <div className="relative pl-10 md:pl-12">
            {/* Vertical ink rail (rail center sits at left-4 md:left-5) */}
            <span
              aria-hidden
              className="absolute top-3 bottom-3 w-[2px] bg-ink/25"
              style={{ left: "1rem" }}
            />

            <ul className="space-y-8 md:space-y-10">
              {stops.map((s, i) => (
                <motion.li
                  key={s.year + s.place}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative"
                >
                  {/* Node dot, centered on the rail */}
                  <span
                    aria-hidden
                    className={`absolute top-4 h-5 w-5 md:h-6 md:w-6 rounded-full border-[1.5px] border-ink ${accentBg[s.accent]} shadow-[0_2px_0_0_#171412]`}
                    style={{ left: "1rem", transform: "translateX(-50%)" }}
                  />

                  {/* Year — stacks above on mobile, sits in left gutter on desktop */}
                  <div className="mb-2 md:mb-0 md:absolute md:top-[0.65rem] md:w-28 md:text-right md:-left-32">
                    <span className="font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-ink/70">
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
