"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { CaseStudy, Scene, Story } from "@/lib/case-studies";

const FloatingObject = dynamic(() => import("@/components/floating-object"), { ssr: false });

// Accent colors mapped to the warm playful palette
const accentHex: Record<CaseStudy["accent"], string> = {
  lime: "#BFFF3D",       // acid
  hot: "#FF3E9D",        // hot pink
  electric: "#7AB9FF",   // sky
  peach: "#FFB4A2",      // peach
  butter: "#FFC22E",     // sun
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const objectY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const color = accentHex[study.accent];
  const shape = shapeMap[study.slug] ?? "icosa";

  return (
    <article>
      {/* Hero with parallax 3D — cream text on coral */}
      <div ref={heroRef} className="relative min-h-[90svh] overflow-hidden">
        <motion.div
          style={{ y: objectY }}
          aria-hidden
          className="absolute pointer-events-none opacity-80 md:opacity-100 top-[55%] -translate-y-1/2 md:top-24 md:translate-y-0 right-0 md:right-10 h-[260px] w-[260px] md:h-[560px] md:w-[560px]"
        >
          <FloatingObject shape={shape} color={color} />
        </motion.div>

        <motion.div
          style={{ y, opacity }}
          className="relative max-w-7xl mx-auto px-6 pt-36 pb-20"
        >
          <Link
            href="/#work"
            data-cursor-label="back"
            className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ink inline-flex items-center gap-2 hover:text-coralDeep transition"
          >
            ← all work
          </Link>

          <div className="mt-16 flex flex-wrap items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ink">
            <span>{study.company}</span>
            <span className="opacity-50">·</span>
            <span>{study.role}</span>
            <span className="opacity-50">·</span>
            <span>{study.duration}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-bold text-ink text-5xl md:text-8xl lg:text-[7.5rem] leading-[0.95] tracking-[-0.03em] max-w-4xl"
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-ink font-display font-medium italic"
          >
            {study.tagline}
          </motion.p>

          <div className="mt-14 flex flex-wrap gap-2">
            {study.domain.map((d) => (
              <span key={d} className="chip">
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TL;DR — cream card on coral */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-8 md:p-14 shadow-[0_6px_0_0_#171412]">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  · tl;dr
                </span>
                <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                  the hook.
                </h2>
                <p className="mt-6 text-base md:text-lg leading-[1.7] text-ink/75 max-w-md">
                  {study.hook}
                </p>
              </div>
              <div className="md:col-span-7">
                <p className="text-xl md:text-2xl leading-[1.45] font-display italic text-ink/90">
                  {study.tldr}
                </p>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {study.metrics.map((m, i) => {
                    const tiles = ["bg-sun", "bg-acid", "bg-iris", "bg-hot"];
                    const bg = tiles[i % tiles.length];
                    return (
                      <div
                        key={m.label}
                        className={`rounded-2xl border-[1.5px] border-ink ${bg} p-5 shadow-[0_3px_0_0_#171412]`}
                      >
                        <div className="font-display font-medium text-3xl md:text-4xl leading-none text-ink">
                          {m.value}
                        </div>
                        <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink/70">
                          {m.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story — split-screen scrollytelling on coral */}
      <StorySection story={study.story} accent={study.accent} />

      {/* Shipped + Stack — cream card */}
      <section className="relative px-6 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-8 md:p-14 shadow-[0_6px_0_0_#171412]">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  · what shipped
                </span>
                <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                  receipts.
                </h2>
                <ul className="mt-10 space-y-4">
                  {study.shipped.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-5 text-base md:text-lg border-b border-ink/15 pb-4 last:border-b-0"
                    >
                      <span
                        className={`font-mono text-[10px] font-medium shrink-0 mt-1 px-2 py-0.5 rounded-full border-[1.5px] border-ink ${accentBg[study.accent]}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink/85 leading-relaxed">{s}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5 md:pl-6 md:border-l md:border-ink/15">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  · stack
                </span>
                <h2 className="mt-4 font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                  tools.
                </h2>
                <div className="mt-10 flex flex-wrap gap-2">
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

      {/* Next up — coral hero with cream text + accent underline */}
      <section className="relative">
        <Link
          href={`/work/${next.slug}`}
          data-cursor-label="next case →"
          className="group block transition"
        >
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 overflow-hidden">
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

  return (
    <section className="relative px-6 py-20 md:py-28">
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
              <ol className="relative mt-14 space-y-3 font-mono text-[11px] font-medium uppercase tracking-[0.25em]">
                {STORY_ACTS.map((a, i) => (
                  <li
                    key={a.key}
                    className={`flex items-center gap-4 transition-colors duration-300 ${
                      i === active ? "text-ink" : "text-ink/75"
                    }`}
                  >
                    <span className="w-6 text-ink/60">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`h-px transition-all duration-500 ${
                        i === active ? "w-14" : "w-6"
                      }`}
                      style={{ background: i === active ? accentColor : "rgba(28,18,14,0.35)" }}
                    />
                    {a.label}
                  </li>
                ))}
              </ol>
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
      className={`relative ${first ? "md:pt-[28vh]" : "md:pt-[36vh]"} ${
        last ? "md:pb-[28vh]" : "md:pb-[8vh]"
      }`}
    >
      <div className="md:hidden flex items-center gap-3 mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
          act {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-ink/20"
        />
        <span className="font-display italic text-sm text-ink/80">{label}</span>
      </div>

      <div className="rounded-3xl border-[1.5px] border-ink bg-cream text-ink p-6 md:p-10 shadow-[0_5px_0_0_#171412]">
        <h3 className="font-display font-medium text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] max-w-xl">
          {scene.heading}
        </h3>

        <p className="mt-5 md:mt-6 text-base md:text-lg leading-[1.7] text-ink/75 max-w-xl">
          {scene.body}
        </p>

        {scene.beat && (
          <div className="mt-7 md:mt-9 flex items-start gap-4 max-w-lg">
            <span
              aria-hidden
              className={`mt-2 md:mt-3 h-8 md:h-10 w-1.5 shrink-0 rounded-full border-[1.5px] border-ink ${accentBgClass}`}
            />
            <p className="font-display italic font-medium text-xl md:text-2xl leading-[1.25] tracking-[-0.01em] text-ink">
              {scene.beat}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
