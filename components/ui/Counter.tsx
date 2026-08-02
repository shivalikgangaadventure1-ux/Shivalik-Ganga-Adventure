"use client";

import { animate, motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function Counter({ icon: Icon, value, label }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState("0");

  const numericMatch = value.match(/[\d,]+/);
  const numericTarget = numericMatch ? parseInt(numericMatch[0].replace(/,/g, ""), 10) : 0;
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : "";
  const suffix = numericMatch
    ? value.slice((numericMatch.index ?? 0) + numericMatch[0].length)
    : value;

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, numericTarget, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.round(v).toLocaleString("en-IN"));
      },
    });
    return () => controls.stop();
  }, [isInView, numericTarget]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center text-white"
    >
      <Icon size={36} strokeWidth={1.5} className="mb-4 text-primary" aria-hidden="true" />
      <span ref={ref} className="font-heading text-4xl font-bold sm:text-5xl">
        {prefix}
        {display}
        {suffix}
      </span>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/80">{label}</p>
    </motion.div>
  );
}
