"use client";

import { useState } from "react";

/**
 * Renders a brand logo from /public/logos/{slug}.png, falling back to a
 * stylized wordmark when the file is missing.
 *
 * Each brand logo ships with different internal negative space, so we apply
 * a per-slug scale multiplier to keep the line of logos visually balanced.
 * mix-blend-multiply hides white/near-white backgrounds from JPG-sourced
 * logos against the cream marquee band.
 */

// Visual balance — tuned so every logo reads at ~the same weight in the ticker.
// > 1 → logo has lots of internal whitespace, scale up.
// < 1 → logo is tight already, don't overpower neighbours.
const LOGO_SCALE: Record<string, number> = {
  flipkart: 1.15,
  "reliance-retail": 1.0,
  nagarro: 1.1,
  "reliance-jio": 1.3,
  "under-25": 1.1,
  buthey: 1.0,
  swadesh: 1.2,
};

export function LogoMark({
  name,
  slug,
  className = "",
}: {
  name: string;
  slug: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const scale = LOGO_SCALE[slug] ?? 1;

  if (failed) {
    return (
      <span
        className={`font-display font-medium italic text-ink tracking-tight ${className}`}
      >
        {name}
      </span>
    );
  }

  return (
    // Fixed-height flex box so every logo shares the same baseline; the
    // image scales inside via object-contain + transform.
    <span
      className={`inline-flex items-center justify-center ${className}`}
      aria-label={`${name} logo`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${slug}.png`}
        alt={`${name} logo`}
        className="h-full w-auto max-w-full object-contain mix-blend-multiply select-none"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
        draggable={false}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
