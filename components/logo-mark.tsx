"use client";

import { useState } from "react";

/**
 * Renders a brand logo from /public/logos/{slug}.png, falling back to a
 * stylized wordmark when the file is missing.
 *
 * Every logo ships with different internal whitespace, so each slug gets a
 * max-height percentage that keeps the visible mark at roughly the same
 * optical weight across the row. mix-blend-multiply hides white-ish
 * backgrounds from JPG/AVIF-sourced logos against the cream marquee band.
 */

// % of the slot height the image is allowed to occupy (before object-contain).
// Tight wordmarks → 95-100. Padded square icons → 75-85 so the mark doesn't
// drown in its own negative space.
const LOGO_HEIGHT: Record<string, number> = {
  flipkart: 75,         // horizontal wordmark (3.3:1) — width binds, keep optical weight
  "reliance-retail": 95, // stacked mark with "RETAIL" descender, needs height
  nagarro: 70,          // horizontal wordmark (3.6:1) — let it breathe
  "reliance-jio": 75,
  warroom: 85,          // emblem + dotted "WARROOM" wordmark (3.5:1)
  "under-25": 85,
  buthey: 95,
  swadesh: 65,          // horizontal wordmark — don't stretch, keep it proportional
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
  const heightPct = LOGO_HEIGHT[slug] ?? 85;

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
    <span
      className={`inline-flex items-center justify-center ${className}`}
      aria-label={`${name} logo`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${slug}.png`}
        alt={`${name} logo`}
        className="w-auto max-w-full object-contain mix-blend-multiply select-none"
        style={{ maxHeight: `${heightPct}%` }}
        draggable={false}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
