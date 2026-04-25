"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const beliefs = [
  {
    n: "01",
    t: "Ship beats perfect.",
    b: "A v1 in prod learns more in a week than a v2 in a deck learns in a quarter. I'd rather argue with real users than ideal ones.",
    accent: "bg-sun",
    swatch: "#FFC22E",
  },
  {
    n: "02",
    t: "Metrics describe. Narrative decides.",
    b: "Dashboards prove you're not crazy. Stories tell the team what to do on Monday. A PM who can only read charts is just a report with legs.",
    accent: "bg-acid",
    swatch: "#BFFF3D",
  },
  {
    n: "03",
    t: "Kill features proudly.",
    b: "The most under-rated PM muscle is saying no with a smile and a reason. Every no is a yes to the thing that actually matters this quarter.",
    accent: "bg-hot",
    swatch: "#FF3E9D",
  },
  {
    n: "04",
    t: "Ops is product.",
    b: "Community, logistics, CX, vendor calls at 11pm — if the user feels it, it's in scope. The best products look like software and run like restaurants.",
    accent: "bg-iris",
    swatch: "#7C5CFF",
  },
];

export default function About() {
  const principlesRef = useRef<HTMLOListElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Sync the active principle with vertical scroll through the list. The
  // offset places the "active band" roughly mid-viewport, so each list
  // item becomes active when it crosses the centre of the screen.
  const { scrollYProgress } = useScroll({
    target: principlesRef,
    offset: ["start 60%", "end 40%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      beliefs.length - 1,
      Math.max(0, Math.floor(v * beliefs.length))
    );
    if (idx !== activeIdx) setActiveIdx(idx);
  });

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
            Six years across AdTech, GenAI, e-commerce and retail — Jio interns to founder mode to head of product. These are the four rules I keep coming back to. The rest is taste, conviction, and showing up on Monday.
          </p>
        </div>

        {/* Editorial split: art panel (4) + principles (8) */}
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-14">
          {/* Sticky scroll-art panel — replaces the static portrait */}
          <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <OperatingArt
              activeIdx={activeIdx}
              progress={scrollYProgress}
            />
          </div>

          {/* Principles list */}
          <ol
            ref={principlesRef}
            className="md:col-span-8 space-y-4 md:space-y-5 list-none"
          >
            {beliefs.map((b, i) => (
              <motion.li
                key={b.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group relative rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-6 md:p-8 shadow-[0_5px_0_0_#171412] transition-all duration-500 ${
                  i === activeIdx
                    ? "md:-translate-y-1 md:shadow-[0_8px_0_0_#171412]"
                    : ""
                }`}
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

/* ═══════════════════════════════════════════════════════════════════ *
 *  OperatingArt — the sticky scroll-reactive art piece on the left.
 *  Cycling 01→04 numeral, accent swatch that shifts with the active
 *  principle, four floating sticker shapes that parallax + rotate with
 *  scroll, and a progress pill at the bottom.
 * ═══════════════════════════════════════════════════════════════════ */

function OperatingArt({
  activeIdx,
  progress,
}: {
  activeIdx: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each sticker reads the same scroll value but transforms it differently,
  // giving the canvas a layered parallax that comes alive only on scroll.
  const stickerYA = useTransform(progress, [0, 1], [-10, 30]);
  const stickerYB = useTransform(progress, [0, 1], [20, -30]);
  const stickerYC = useTransform(progress, [0, 1], [-20, 25]);
  const stickerYD = useTransform(progress, [0, 1], [15, -20]);

  const stickerRotA = useTransform(progress, [0, 1], [-8, 30]);
  const stickerRotB = useTransform(progress, [0, 1], [12, -45]);
  const stickerRotC = useTransform(progress, [0, 1], [0, 90]);
  const stickerRotD = useTransform(progress, [0, 1], [-25, 25]);

  // Big disc rotates a quarter-turn as you scroll the section.
  const discRot = useTransform(progress, [0, 1], [-15, 15]);

  const active = beliefs[activeIdx];

  return (
    <div className="relative">
      {/* Canvas */}
      <div className="relative aspect-square rounded-3xl border-[1.5px] border-ink bg-cream shadow-[0_8px_0_0_#171412] overflow-hidden">
        {/* Subtle grid texture so the bg isn't a flat slab */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #171412 1px, transparent 1.2px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Floating stickers — geometric shapes in brand palette,
            each parallaxes at a different rate as you scroll. */}
        <motion.span
          aria-hidden
          style={{ y: stickerYA, rotate: stickerRotA }}
          className="absolute top-5 left-5 h-12 w-12 rounded-2xl bg-sun border-[1.5px] border-ink shadow-[0_3px_0_0_#171412]"
        />
        <motion.span
          aria-hidden
          style={{ y: stickerYB, rotate: stickerRotB }}
          className="absolute top-7 right-6 h-10 w-10 rounded-full bg-iris border-[1.5px] border-ink shadow-[0_3px_0_0_#171412]"
        />
        <motion.span
          aria-hidden
          style={{ y: stickerYC, rotate: stickerRotC }}
          className="absolute bottom-12 left-7 h-9 w-9 rotate-45 bg-acid border-[1.5px] border-ink shadow-[0_3px_0_0_#171412]"
        />
        <motion.span
          aria-hidden
          style={{ y: stickerYD, rotate: stickerRotD }}
          className="absolute bottom-14 right-5 font-display font-bold text-2xl text-hot leading-none"
        >
          ✦
        </motion.span>

        {/* Centre cluster: live status + cycling numeral + active accent disc */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] font-bold text-ink mb-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cherry opacity-75 animate-ping_slow" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cherry" />
            </span>
            now operating
          </span>

          {/* Big disc behind the number, fills with the active accent.
              Rotates with scroll for the kinetic feel. */}
          <div className="relative flex items-center justify-center my-2">
            <motion.div
              style={{ rotate: discRot, backgroundColor: active.swatch }}
              transition={{ backgroundColor: { duration: 0.5 } }}
              className="absolute h-[7.5rem] w-[7.5rem] md:h-[9rem] md:w-[9rem] rounded-full border-[1.5px] border-ink shadow-[0_4px_0_0_#171412]"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIdx}
                initial={{ y: 60, opacity: 0, scale: 0.85 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -60, opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative font-display font-bold text-[5.5rem] md:text-[7rem] leading-none tracking-[-0.04em] text-ink z-[1]"
              >
                {String(activeIdx + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Active title — fades through */}
          <div className="relative mt-3 h-8 md:h-9 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIdx}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-center font-display italic font-medium text-ink text-base md:text-lg leading-tight tracking-tight"
              >
                {active.t.replace(/\.$/, "")}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom progress bar — pill widens for the active step */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-[2]">
          {beliefs.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full border-[1.5px] border-ink transition-all duration-500 ${
                i === activeIdx
                  ? "w-8 bg-ink"
                  : "w-1.5 bg-cream"
              }`}
            />
          ))}
        </div>

        {/* Frame chip — top-left, like a contact-sheet card */}
        <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/95 bg-ink/75 backdrop-blur-sm rounded-md px-2 py-0.5 z-[2]">
          op · {String(activeIdx + 1).padStart(2, "0")}/04
        </div>
      </div>

      {/* Caption strip below the canvas — magazine cutline */}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 leading-snug">
        ↳ scroll the principles · the dial follows
      </p>
    </div>
  );
}
