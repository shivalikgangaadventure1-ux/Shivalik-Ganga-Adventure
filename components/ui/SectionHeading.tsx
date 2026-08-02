"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  light?: boolean;
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  light = false,
  as: HeadingTag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "mb-12",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-2 font-heading text-sm font-semibold uppercase tracking-[0.2em]",
            light ? "text-primary-light" : "text-primary"
          )}
        >
          {eyebrow}
        </p>
      )}
      <HeadingTag
        className={cn(
          "font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl",
          light ? "text-white" : "text-heading"
        )}
      >
        {title}
      </HeadingTag>
      <span
        aria-hidden="true"
        className={cn(
          "mt-5 inline-block h-1 w-16 rounded-full bg-primary",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
