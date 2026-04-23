"use client";

type Props = {
  items: string[];
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
            className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12 font-display text-5xl md:text-7xl leading-[0.9] text-ink"
          >
            <span className="inline-block translate-y-[-0.05em]">{item}</span>
            <span
              aria-hidden
              className="inline-block text-acid text-2xl md:text-3xl translate-y-[-0.1em]"
            >
              ◆
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
