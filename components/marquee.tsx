"use client";

type Props = {
  items: string[];
  speed?: "normal" | "slow";
  className?: string;
};

export default function Marquee({ items, speed = "normal", className = "" }: Props) {
  const anim = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  const loop = [...items, ...items];

  return (
    <div className={`ticker-mask overflow-hidden ${className}`}>
      <div className={`flex whitespace-nowrap ${anim} w-max`}>
        {loop.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 font-display text-6xl md:text-8xl"
          >
            {item}
            <span className="text-hot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
