"use client";

import { useState } from "react";

/**
 * Renders a brand logo from /public/logos/{slug}.svg, falling back to a
 * stylized wordmark when the file is missing. This keeps builds green while
 * the real logo kit is being populated.
 *
 * Drop a file at /public/logos/{slug}.svg (monochrome, ink or cream) to
 * replace the fallback.
 */
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/logos/${slug}.svg`}
      alt={`${name} logo`}
      className={`w-auto object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
