"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { CaseStudy, Scene, Story } from "@/lib/case-studies";

const FloatingObject = dynamic(() => import("@/components/floating-object"), { ssr: false });

const accentHex: Record<CaseStudy["accent"], string> = {
  lime: "#BFFF3D",
  hot: "#FF3E9D",
  electric: "#7AB9FF",
  peach: "#FFB4A2",
  butter: "#FFC22E",
};

const accentBg: Record<CaseStudy["accent"], string> = {
  lime: "bg-acid",
  hot: "bg-hot",
  electric: "bg-sky",
  peach: "bg-cream",
  butter: "bg-sun",
};

const shapeMap: Record<string, "torus" | "box" | "icosa" | "octa" | "ring"> = {
  swadesh: "box",
  "collective-artists-network": "torus",
  "flipkart-nme": "icosa",
  "under-25": "octa",
};

export default function CaseStudyBody({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Page-level scroll progress for the top bar
  const { scrollYProgress: pageProgress } = useScroll();
  const scaleX = useSpring(pageProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, -140]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);
  const objectY = useTransform(heroProgress, [0, 1], [0, 240]);
  const objectRotate = useTransform(heroProgress, [0, 1], [0, 90]);
  const objectScale = useTransform(heroProgress, [0, 1], [1, 0.6]);

  const color = accentHex[study.accent];
  const shape = shapeMap[study.slug] ?? "icosa";

  return (
    <article ref={rootRef}>
      {/* Scroll progress bar — thin ink line that fills as you scroll the page */}
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-ink origin-left"
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative min-h-[90svh] overflow-hidden">
        <motion.div
          style={{ y: objectY, rotate: objectRotate, scale: objectScale }}
          aria-hidden
          className="absolute pointer-events-none opacity-85 top-[55%] -translate-y-1/2 md:top-20 md:translate-y-0 right-0 md:right-10 h-[280px] w-[280px] md:h-[560px] md:w-[560px]"
        >
          <FloatingObject shape={shape} color={color} />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 pt-36 pb-20"
        >
          <Link
            href="/#work"
            data-cursor-label="back"
            className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ink inline-flex items-center gap-2 hover:text-coralDeep transition"
          >
            ← all work
          </Link>

          <div className="mt-12 flex flex-wrap items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ink">
            <span>{study.company}</span>
            <span className="opacity-50">·</span>
            <span>{study.role}</span>
            <span className="opacity-50">·</span>
            <span>{study.duration}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-bold text-ink text-5xl md:text-8xl lg:text-[7.5rem] leading-[0.95] tracking-[-0.03em] max-w-4xl"
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-ink/75"
          >
            {study.tagline}
          </motion.p>

          <div className="mt-12 flex flex-wrap gap-2">
            {study.domain.map((d) => (
              <span key={d} className="chip">
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Stats band — large, visual, scroll-reveals ──────────────── */}
      <StatsBand metrics={study.metrics} accent={study.accent} />

      {/* ── Hook — single pull-quote, minimal text ──────────────────── */}
      <section className="relative px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink/60">
              · the hook
            </span>
            <p className="mt-6 font-display italic font-medium text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em] text-ink">
              &ldquo;{study.hook}&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story — split-screen scrollytelling, tightened copy ─────── */}
      <StorySection story={study.story} accent={study.accent} />

      {/* ── Receipts + stack — compact chip rows ────────────────────── */}
      <section className="relative px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-8 md:p-14 shadow-[0_6px_0_0_#171412]">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  · what shipped
                </span>
                <h2 className="mt-4 font-display font-medium text-3xl md:text-4xl leading-[1.05] tracking-[-0.02em]">
                  receipts.
                </h2>
                <ul className="mt-8 flex flex-col gap-2.5">
                  {study.shipped.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-sm md:text-base"
                    >
                      <span
                        className={`font-mono text-[9px] font-semibold shrink-0 mt-1 px-2 py-0.5 rounded-full border-[1.5px] border-ink ${accentBg[study.accent]}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink/85 leading-relaxed">{s}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  · stack
                </span>
                <h2 className="mt-4 font-display font-medium text-3xl md:text-4xl leading-[1.05] tracking-[-0.02em]">
                  tools.
                </h2>
                <div className="mt-8 flex flex-wrap gap-2">
                  {study.stack.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Next up ─────────────────────────────────────────────────── */}
      <section className="relative">
        <Link
          href={`/work/${next.slug}`}
          data-cursor-label="next case →"
          className="group block transition"
        >
          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 overflow-hidden">
            <span className="relative font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
              · next up / 0{next.order}
            </span>
            <div className="relative mt-6 flex items-center justify-between gap-6">
              <h3 className="font-display font-bold text-ink text-4xl md:text-6xl lg:text-[6rem] leading-[0.98] tracking-[-0.03em]">
                <span className="relative inline-block">
                  <span className="relative z-10">{next.title}</span>
                  <span
                    aria-hidden
                    className={`absolute inset-x-[-0.04em] bottom-[0.1em] h-[0.22em] ${accentBg[next.accent]} rounded-[0.3em] -z-0 transition-all duration-500 group-hover:h-[0.35em]`}
                  />
                </span>
              </h3>
              <span className="hidden md:inline-flex items-center justify-center h-16 w-16 rounded-full bg-sun border-[1.5px] border-ink text-ink font-display text-3xl shadow-[0_4px_0_0_#171412] transition-transform group-hover:translate-x-2">
                →
              </span>
            </div>
            <p className="relative mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ink">
              {next.company} · {next.year}
            </p>
          </div>
        </Link>
      </section>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  Stats band — oversized numbers, scroll-reveal, accent-rotating tiles
 * ═══════════════════════════════════════════════════════════════════ */

function StatsBand({
  metrics,
  accent,
}: {
  metrics: CaseStudy["metrics"];
  accent: CaseStudy["accent"];
}) {
  // Alternating tile backgrounds pulled from the palette so the band feels lively
  const tiles = ["bg-sun", accentBg[accent], "bg-iris", "bg-acid"];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle horizontal drift — tiles scroll slightly against the page motion
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  return (
    <section ref={ref} className="relative py-10 md:py-16 border-y-[1.5px] border-ink bg-paperDeep overflow-hidden">
      <motion.div style={{ x }} className="max-w-7xl mx-auto px-6">
        <div className={`grid gap-4 md:gap-6 ${metrics.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"} grid-cols-2`}>
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-3xl border-[1.5px] border-ink ${tiles[i % tiles.length]} p-6 md:p-8 shadow-[0_6px_0_0_#171412]`}
            >
              <div className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none tracking-[-0.03em] text-ink">
                {m.value}
              </div>
              <div className="mt-4 md:mt-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-ink/70">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  Story section — sticky act nav + scroll-pinned scenes, tighter copy
 * ═══════════════════════════════════════════════════════════════════ */

const STORY_ACTS: { key: keyof Story; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "problem", label: "Problem" },
  { key: "bet", label: "Bet" },
  { key: "outcome", label: "Outcome" },
];

function StorySection({ story, accent }: { story: Story; accent: CaseStudy["accent"] }) {
  const [active, setActive] = useState(0);
  const accentColor = accentHex[accent];
  const accentBgClass = accentBg[accent];

  // Section-wide scroll progress — drives the vertical rail fill
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
          · the story
        </span>

        <div className="mt-10 grid md:grid-cols-12 md:gap-16">
          <aside className="hidden md:block md:col-span-5">
            <div className="sticky top-28 h-[calc(100vh-8rem)] flex flex-col justify-center">
              <span className="relative font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-ink">
                act {String(active + 1).padStart(2, "0")} / {String(STORY_ACTS.length).padStart(2, "0")}
              </span>
              <div className="relative mt-5 h-[1.05em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={active}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display italic font-bold text-ink text-7xl lg:text-8xl leading-none tracking-[-0.03em]"
                  >
                    <span className="relative inline-block">
                      <span className="relative z-10">{STORY_ACTS[active].label}.</span>
                      <span
                        aria-hidden
                        className={`absolute inset-x-[-0.04em] bottom-[0.14em] h-[0.22em] ${accentBgClass} rounded-[0.3em] -z-0`}
                      />
                    </span>
                  </motion.h2>
                </AnimatePresence>
              </div>
              {/* Scroll-driven rail showing progress through the four acts */}
              <div className="relative mt-12">
                <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-ink/15" />
                <motion.div
                  aria-hidden
                  style={{ height: railHeight, background: accentColor }}
                  className="absolute left-[11px] top-0 w-[2px] origin-top"
                />
                <ol className="relative space-y-5 font-mono text-[11px] font-medium uppercase tracking-[0.25em]">
                  {STORY_ACTS.map((a, i) => (
                    <li
                      key={a.key}
                      className={`flex items-center gap-5 transition-colors duration-300 ${
                        i === active ? "text-ink" : "text-ink/55"
                      }`}
                    >
                      <span
                        className={`relative z-10 h-6 w-6 rounded-full border-[1.5px] border-ink flex items-center justify-center text-[9px] font-semibold transition-all duration-300 ${
                          i === active ? `${accentBgClass} shadow-[0_2px_0_0_#171412]` : "bg-cream"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {a.label}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>

          <div className="md:col-span-7 space-y-6 md:space-y-8">
            {STORY_ACTS.map((a, i) => (
              <SceneBlock
                key={a.key}
                scene={story[a.key]}
                label={a.label}
                index={i}
                total={STORY_ACTS.length}
                accent={accent}
                first={i === 0}
                last={i === STORY_ACTS.length - 1}
                onActive={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneBlock({
  scene,
  label,
  index,
  total,
  accent,
  first,
  last,
  onActive,
}: {
  scene: Scene;
  label: string;
  index: number;
  total: number;
  accent: CaseStudy["accent"];
  first?: boolean;
  last?: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  // Scroll-linked scale for the beat quote inside this scene
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const beatScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1, 0.98]);
  const beatOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [0, 1, 1, 0.6]);

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  const accentBgClass = accentBg[accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`relative ${first ? "md:pt-[22vh]" : "md:pt-[32vh]"} ${
        last ? "md:pb-[28vh]" : "md:pb-[8vh]"
      }`}
    >
      <div className="md:hidden flex items-center gap-3 mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
          act {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-px flex-1 bg-ink/20" />
        <span className="font-display italic text-sm text-ink/80">{label}</span>
      </div>

      <div className="rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-6 md:p-8 shadow-[0_5px_0_0_#171412]">
        <h3 className="font-display font-medium text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-[-0.02em] max-w-xl">
          {scene.heading}
        </h3>

        <p className="mt-4 md:mt-5 text-[15px] md:text-base leading-[1.65] text-ink/70 max-w-xl">
          {scene.body}
        </p>

        {scene.beat && (
          <motion.div
            style={{ scale: beatScale, opacity: beatOpacity }}
            className="mt-7 md:mt-8 flex items-start gap-4 max-w-lg"
          >
            <span
              aria-hidden
              className={`mt-2 md:mt-3 h-10 md:h-12 w-1.5 shrink-0 rounded-full border-[1.5px] border-ink ${accentBgClass}`}
            />
            <p className="font-display italic font-medium text-xl md:text-2xl leading-[1.25] tracking-[-0.01em] text-ink">
              {scene.beat}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
