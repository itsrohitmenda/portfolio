"use client";

import { motion } from "framer-motion";

const beliefs = [
  {
    n: "01",
    t: "Ship beats perfect.",
    b: "A v1 in prod learns more in a week than a v2 in a deck learns in a quarter.",
  },
  {
    n: "02",
    t: "Metrics describe, narrative decides.",
    b: "Numbers prove you're not crazy. Stories tell teams what to do next.",
  },
  {
    n: "03",
    t: "Kill features proudly.",
    b: "The most under-rated PM skill is saying no with a smile and a reason.",
  },
  {
    n: "04",
    t: "Ops is product.",
    b: "Community, logistics, CX — if the user feels it, it's in scope.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 opacity-10 grain pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-lime">
              who I am
            </p>
            <h2 className="mt-3 font-display text-6xl md:text-7xl leading-[0.95]">
              PM by day.{" "}
              <span className="italic text-lime">founder</span> by reflex.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80 max-w-md">
              I've built 0→1 from a Google Doc, scaled 1→100 with a real team, and co-founded a label that hit ₹25L in six months. I like the part where the problem is messy and nobody has written the PRD yet.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Jira",
                "Linear",
                "Mixpanel",
                "CleverTap",
                "AppsFlyer",
                "Figma",
                "Postman",
                "WhatsApp Biz API",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-cream/30 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <ol className="md:col-span-7 space-y-3">
            {beliefs.map((b, i) => (
              <motion.li
                key={b.n}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group border-t border-cream/20 py-6 first:border-t-0 flex gap-6 hover:bg-cream/5 rounded-xl px-2 transition"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-lime shrink-0 mt-1">
                  {b.n}
                </span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight">
                    {b.t}
                  </h3>
                  <p className="mt-2 text-cream/70 leading-relaxed">{b.b}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
