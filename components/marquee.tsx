"use client";

import { LogoMark } from "./logo-mark";

export type LogoItem = { name: string; slug: string };

type Props = {
  items: LogoItem[];
  reverse?: boolean;
  className?: string;
};

export default function Marquee({ items, reverse, className = "" }: Props) {
  const anim = reverse ? "animate-marquee-reverse" : "animate-marquee";
  const loop = [...items, ...items];

  return (
    <div className={`ticker-mask overflow-hidden ${className}`}>
      <ul
        className={`flex whitespace-nowrap ${anim} w-max items-center`}
        aria-hidden
      >
        {loop.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-14 md:gap-20 pr-14 md:pr-20"
          >
            {/* Fixed-height, fixed-width slot so every brand keeps the same
                baseline regardless of its aspect ratio. The logo image's own
                max-height % lives inside LogoMark (per-slug tuning). */}
            <LogoMark
              name={item.name}
              slug={item.slug}
              className="h-24 md:h-24 w-[240px] md:w-[280px]"
            />
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-ink/40 shrink-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
