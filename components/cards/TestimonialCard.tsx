"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
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
        <Image
          src={testimonial.avatar}
          alt={`Photo of ${testimonial.name}`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <figcaption>
          <p className="font-heading text-sm font-bold text-heading">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.trip}</p>
        </figcaption>
        <div className="ml-auto flex gap-0.5" aria-label={`Rated ${testimonial.rating} out of 5`}>
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
