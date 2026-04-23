"use client";

import { motion } from "framer-motion";

const stops = [
  { year: "2017", place: "Reliance Jio", note: "intern who shipped a 250K-impression campaign", tag: "start" },
  { year: "2020", place: "Under 25", note: "first real PM job · 20K users in 90d", tag: "0→1" },
  { year: "2023", place: "War Room × Flipkart", note: "GenAI shipped inside Big Billion Day", tag: "GenAI" },
  { year: "2024", place: "Buthey", note: "co-founded a premium women's wear label · ₹25L in 6mo", tag: "founder" },
  { year: "2025", place: "Collective Artists", note: "head of product · 100K → 1.6M users", tag: "scale" },
  { year: "now", place: "Nagarro × Reliance", note: "product owner · Swadesh US launch in 45d", tag: "current" },
];

export default function Timeline() {
  return (
    <section className="relative px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
              the path so far
            </p>
            <h2 className="mt-3 font-display text-5xl md:text-7xl leading-none">
              seven years, five companies,
              <br />
              <span className="italic text-electric">zero dull quarters</span>.
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-ink/20 hidden md:block" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {stops.map((s, i) => (
              <motion.div
                key={s.year + s.place}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative bg-cream border-2 border-ink rounded-2xl p-4 hover:-translate-y-1 transition"
              >
                <div className="font-display text-3xl leading-none">{s.year}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-widest">
                  {s.place}
                </div>
                <p className="mt-2 text-sm leading-snug">{s.note}</p>
                <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-lime border-2 border-ink px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest">
                  {s.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
