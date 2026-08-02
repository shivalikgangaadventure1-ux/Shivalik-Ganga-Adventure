"use client";

import { motion } from "framer-motion";
import { BadgeIndianRupee, Compass, ShieldCheck, Waves, type LucideIcon } from "lucide-react";
import type { Feature } from "@/constants/features";

const ICON_MAP: Record<Feature["icon"], LucideIcon> = {
  ShieldCheck,
  Compass,
  BadgeIndianRupee,
  Waves,
};

export function FeatureCard({ feature, index = 0 }: { feature: Feature; index?: number }) {
  const Icon = ICON_MAP[feature.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-card"
    >
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Icon size={32} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-bold text-heading">{feature.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-body">{feature.description}</p>
    </motion.div>
  );
}
