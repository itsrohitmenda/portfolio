"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 35, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 600, damping: 35, mass: 0.2 });
  const [variant, setVariant] = useState<"default" | "hover" | "label">("default");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      if (interactive) {
        const dataLabel = interactive.getAttribute("data-cursor-label");
        if (dataLabel) {
          setLabel(dataLabel);
          setVariant("label");
        } else {
          setVariant("hover");
        }
      } else {
        setVariant("default");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{
          width: variant === "default" ? 10 : variant === "label" ? 100 : 40,
          height: variant === "default" ? 10 : variant === "label" ? 36 : 40,
          borderRadius: variant === "label" ? 14 : 999,
          backgroundColor: "#F4F2EC",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-void"
      >
        {variant === "label" && <span className="px-1 whitespace-nowrap">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
