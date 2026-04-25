"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";

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
 *  OperatingArt — sticky scroll-reactive machinery illustration.
 *  Three interlocking SVG gears (one big, two satellites) styled to
 *  match the site's pop UI (ink outlines, layered detail, brand
 *  palette fills). Each gear rotates at a rate inversely proportional
 *  to its size and adjacent gears spin in opposite directions to sell
 *  the meshing. The big gear's hub fills with the active principle's
 *  accent colour, and the cycling 01–04 numeral floats over it.
 * ═══════════════════════════════════════════════════════════════════ */

function OperatingArt({
  activeIdx,
  progress,
}: {
  activeIdx: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each gear rotates at a rate roughly inverse to its size (smaller
  // gears spin faster). Adjacent gears spin in opposite directions to
  // sell the meshing illusion. Big gear is slowest CW, small ones flip.
  const gearBigRot = useTransform(progress, [0, 1], [0, 240]);
  const gearTopRot = useTransform(progress, [0, 1], [0, -480]);
  const gearLeftRot = useTransform(progress, [0, 1], [0, -380]);

  const active = beliefs[activeIdx];

  return (
    <div className="relative">
      {/* Canvas — cream blueprint tile */}
      <div className="relative aspect-square rounded-3xl border-[1.5px] border-ink bg-cream shadow-[0_8px_0_0_#171412] overflow-hidden">
        {/* Blueprint dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #171412 1px, transparent 1.2px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Decorative rivet marks in the corners — sells the "this is a
            machined plate" feel without competing with the gears. */}
        {[
          { top: "8%", left: "8%" },
          { top: "8%", right: "8%" },
          { bottom: "8%", left: "8%" },
          { bottom: "8%", right: "8%" },
        ].map((pos, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute h-1.5 w-1.5 rounded-full bg-ink/40"
            style={pos}
          />
        ))}

        {/* Big central gear — holds the cycling number in its hub */}
        <motion.div
          style={{ rotate: gearBigRot, x: "-50%", y: "-50%" }}
          className="absolute left-1/2 top-1/2 w-[62%] h-[62%]"
        >
          <Gear teeth={16} fill="#FAF6E8" hubFill={active.swatch} />
        </motion.div>

        {/* Top-right small gear */}
        <motion.div
          style={{ rotate: gearTopRot, x: "-50%", y: "-50%" }}
          className="absolute left-[78%] top-[18%] w-[26%] h-[26%]"
        >
          <Gear teeth={10} fill="#FFC22E" minimal />
        </motion.div>

        {/* Bottom-left medium gear */}
        <motion.div
          style={{ rotate: gearLeftRot, x: "-50%", y: "-50%" }}
          className="absolute left-[16%] top-[80%] w-[34%] h-[34%]"
        >
          <Gear teeth={12} fill="#7C5CFF" minimal />
        </motion.div>

        {/* Cycling number in the big gear's hub (overlay, doesn't rotate) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIdx}
              initial={{ y: 40, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-3xl md:text-5xl tracking-[-0.04em] leading-none text-ink"
            >
              {String(activeIdx + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Frame chip — top-left, contact-sheet style */}
        <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/95 bg-ink/75 backdrop-blur-sm rounded-md px-2 py-0.5 z-[2]">
          op · {String(activeIdx + 1).padStart(2, "0")}/04
        </div>

        {/* Live status — top-right */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] font-bold text-ink bg-cream/95 backdrop-blur-sm rounded-md px-2 py-0.5 border-[1px] border-ink/30 z-[2]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cherry opacity-75 animate-ping_slow" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cherry" />
          </span>
          live
        </div>

        {/* Bottom progress pills */}
        <div className="absolute bottom-3.5 left-0 right-0 flex justify-center gap-1.5 z-[2]">
          {beliefs.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full border-[1.5px] border-ink transition-all duration-500 ${
                i === activeIdx ? "w-8 bg-ink" : "w-1.5 bg-cream"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Active principle title — fades through underneath the canvas */}
      <div className="mt-4 relative h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIdx}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 font-display italic font-medium text-ink text-base md:text-lg leading-tight tracking-tight"
          >
            currently:&nbsp;{active.t.replace(/\.$/, "").toLowerCase()}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Footer caption */}
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 leading-snug">
        ↳ scroll the principles · the machine ticks
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  Gear — single SVG cog. Drawn in a normalized -100..100 viewBox so
 *  the parent <div> can scale it via width/height. `minimal` skips the
 *  inner detail ring for the smaller gears so they don't look noisy.
 * ═══════════════════════════════════════════════════════════════════ */

function Gear({
  teeth,
  fill,
  hubFill,
  minimal,
}: {
  teeth: number;
  fill: string;
  hubFill?: string;
  minimal?: boolean;
}) {
  const outerR = 95;
  const innerR = outerR * 0.84;
  const path = useMemo(
    () => buildCogPath(outerR, innerR, teeth),
    [teeth]
  );
  const hubR = outerR * 0.34;

  return (
    <svg viewBox="-100 -100 200 200" className="h-full w-full overflow-visible">
      {/* Cog teeth + body */}
      <path
        d={path}
        fill={fill}
        stroke="#171412"
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Inner detail ring — only on the big gear so small gears stay clean */}
      {!minimal && (
        <circle
          cx={0}
          cy={0}
          r={innerR * 0.78}
          fill="none"
          stroke="#171412"
          strokeWidth={1.5}
          opacity={0.25}
        />
      )}
      {/* Hub — fills with the active accent on the big gear */}
      <motion.circle
        cx={0}
        cy={0}
        r={hubR}
        animate={{ fill: hubFill ?? "#FAF6E8" }}
        transition={{ duration: 0.5 }}
        stroke="#171412"
        strokeWidth={3}
      />
      {/* Center bolt */}
      <circle cx={0} cy={0} r={outerR * 0.07} fill="#171412" />
    </svg>
  );
}

/**
 * Build a stylised cog SVG path. We walk N×4 segments around the circle —
 * two outer (tooth tip) then two inner (tooth root) — and connect them
 * with straight lines, giving each tooth a trapezoidal silhouette.
 */
function buildCogPath(outerR: number, innerR: number, teeth: number): string {
  const segs = teeth * 4;
  const points: string[] = [];
  for (let i = 0; i < segs; i++) {
    const angle = (i / segs) * 2 * Math.PI - Math.PI / 2;
    const r = i % 4 < 2 ? outerR : innerR;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ") + " Z";
}
