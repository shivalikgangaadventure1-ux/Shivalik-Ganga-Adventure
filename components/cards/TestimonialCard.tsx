"use client";

import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";
import type { Testimonial } from "@/constants/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-full flex-col rounded-2xl border border-border bg-white p-8 shadow-sm"
    >
      <Quote className="mb-4 text-primary" size={32} aria-hidden="true" />
      <blockquote className="flex-1 text-sm leading-relaxed text-body">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
          aria-hidden="true"
        >
          <User size={22} strokeWidth={1.75} />
        </span>
        <figcaption>
          <p className="font-heading text-sm font-bold text-heading">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.trip}</p>
        </figcaption>
        <div className="ml-auto flex gap-0.5" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={cn(
                i < testimonial.rating ? "fill-primary text-primary" : "fill-border text-border"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </motion.figure>
  );
}
