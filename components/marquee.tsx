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
            className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14"
          >
            {/* Fixed-height, fixed-width slot keeps every brand on the same
                baseline regardless of its native aspect ratio. */}
            <LogoMark
              name={item.name}
              slug={item.slug}
              className="h-10 md:h-12 w-[140px] md:w-[180px]"
            />
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-ink/50 shrink-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
