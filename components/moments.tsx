"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Moment = {
  src: string;
  caption: string;
  sub: string;
  badge: string;
  accent: string; // tailwind bg
  rotate: number;
  aspect: string; // tailwind aspect ratio
};

const moments: Moment[] = [
  {
    src: "/photos/gdg-talk.jpg",
    caption: "first time on a Google Devs stage",
    sub: "before product had a name for what I was doing",
    badge: "2017",
    accent: "bg-sky",
    rotate: -3,
    aspect: "aspect-[4/5]",
  },
  {
    src: "/photos/award.jpg",
    caption: "ESA Vision Summit · 2nd prize",
    sub: "the kid who built robots before slide decks",
    badge: "2016",
    accent: "bg-acid",
    rotate: 2,
    aspect: "aspect-[4/5]",
  },
  {
    src: "/photos/under-25.jpg",
    caption: "the under 25 fam, after the show",
    sub: "20K users in 90 days · my first PM heartbreak + fix",
    badge: "2020",
    accent: "bg-sun",
    rotate: -2,
    aspect: "aspect-[16/10]",
  },
  {
    src: "/photos/team-brick.jpg",
    caption: "huddle on the brick-wall table",
    sub: "the team that turned a deck into a brand",
    badge: "2024",
    accent: "bg-iris",
    rotate: 3,
    aspect: "aspect-[4/5]",
  },
  {
    src: "/photos/buthey.jpg",
    caption: "co-founder day · first pack-outs",
    sub: "₹25L in six months, learned ops the messy way",
    badge: "2024",
    accent: "bg-hot text-cream",
    rotate: -1,
    aspect: "aspect-[4/5]",
  },
];

function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIs(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return is;
}

export default function Moments() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const [overflow, setOverflow] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Measure how far the horizontal track exceeds the viewport — pan by that delta
  useEffect(() => {
    if (!isDesktop) return;
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      const total = t.scrollWidth;
      const visible = window.innerWidth;
      setOverflow(Math.max(0, total - visible));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  const xPx = useTransform(scrollYProgress, [0, 1], [0, -overflow]);
  const x = useSpring(xPx, { stiffness: 60, damping: 18, mass: 0.4 });

  // Section height = 1 viewport for header + ~0.8vh per card scroll distance
  const useScrollPin = isDesktop && !reduced && overflow > 0;
  const sectionStyle = useScrollPin
    ? { height: `calc(100vh + ${overflow}px)` }
    : undefined;

  return (
    <section
      id="moments"
      ref={sectionRef}
      style={sectionStyle}
      className="relative bg-paperDeep border-y-[1.5px] border-ink overflow-hidden"
    >
      <div
        className={
          useScrollPin
            ? "sticky top-0 h-screen flex flex-col overflow-hidden"
            : "py-20 md:py-24"
        }
      >
        <Header />

        {useScrollPin ? (
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center gap-8 lg:gap-12 px-12 lg:px-20 will-change-transform"
            >
              {moments.map((m, i) => (
                <Polaroid key={m.src} m={m} index={i} />
              ))}
              <div className="shrink-0 w-12" />
            </motion.div>
          </div>
        ) : (
          <div className="overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            <div className="flex items-end gap-6 md:gap-10 px-6 md:px-10 pb-6">
              {moments.map((m, i) => (
                <Polaroid key={m.src} m={m} index={i} mobile />
              ))}
              <div className="shrink-0 w-2" />
            </div>
          </div>
        )}

        {/* Footer hint — desktop shows pan progress, mobile shows swipe hint */}
        {useScrollPin ? (
          <ProgressBar progress={scrollYProgress} />
        ) : (
          <div className="mt-6 px-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
            <span>swipe →</span>
            <span className="h-[1px] flex-1 bg-ink/15" />
            <span>{moments.length.toString().padStart(2, "0")} frames</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 pt-16 md:pt-20 pb-6 md:pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
            · 02.5 / contact sheet
          </span>
          <h2 className="mt-3 font-display font-bold text-ink text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-[-0.03em]">
            moments,{" "}
            <span className="italic relative inline-block">
              <span className="relative z-10">not the highlight reel</span>
              <span
                aria-hidden
                className="absolute inset-x-[-0.06em] bottom-[0.12em] top-[0.2em] bg-acid rounded-[0.4em] -z-0"
              />
            </span>
            .
          </h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 max-w-xs">
          ten years, five frames. the wins, the scrappy bits, the people who shipped it with me.
        </p>
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const w = useTransform(progress, (v) => `${Math.round(v * 100)}%`);
  return (
    <div className="absolute left-0 right-0 bottom-6 px-12 lg:px-20">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
        <span>scroll → pan</span>
        <div className="relative flex-1 h-[2px] bg-ink/15 rounded-full overflow-hidden">
          <motion.div style={{ width: w }} className="absolute left-0 top-0 h-full bg-ink" />
        </div>
        <span>frame</span>
      </div>
    </div>
  );
}

function Polaroid({
  m,
  index,
  mobile,
}: {
  m: Moment;
  index: number;
  mobile?: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <motion.div
      ref={itemRef}
      style={mobile ? undefined : { y, scale }}
      className={`shrink-0 snap-center ${
        mobile ? "w-[260px] sm:w-[300px]" : "w-[320px] lg:w-[400px]"
      }`}
    >
      <div
        className="bg-cream border-[1.5px] border-ink rounded-2xl p-3 shadow-[0_8px_0_0_#171412] transition-transform duration-500 hover:rotate-0"
        style={{ transform: `rotate(${m.rotate}deg)` }}
      >
        <div className={`relative ${m.aspect} rounded-xl overflow-hidden border-[1.5px] border-ink`}>
          <Image
            src={m.src}
            alt={m.caption}
            fill
            sizes="(max-width: 1024px) 300px, 400px"
            className="object-cover"
          />
          {/* Frame index */}
          <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/95 bg-ink/70 backdrop-blur-sm rounded-md px-2 py-0.5">
            frame · {String(index + 1).padStart(2, "0")}
          </div>
          {/* Year badge */}
          <span
            aria-hidden
            className={`absolute bottom-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full ${m.accent} border-[1.5px] border-ink shadow-[0_2px_0_0_#171412] font-mono text-[9px] uppercase tracking-[0.2em] font-bold`}
          >
            {m.badge}
          </span>
        </div>
        {/* Caption strip */}
        <div className="px-1 pt-3 pb-1">
          <p className="font-display font-medium text-base lg:text-lg leading-snug text-ink">
            {m.caption}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 leading-relaxed">
            {m.sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
