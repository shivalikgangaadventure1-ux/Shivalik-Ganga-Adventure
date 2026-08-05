"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { RaftingSpot } from "@/constants/destinations";

const MotionLink = motion.create(Link);

export function DestinationCard({ spot, index = 0 }: { spot: RaftingSpot; index?: number }) {
  const href = spot.relatedPackageSlug ? `/packages/${spot.relatedPackageSlug}` : "/packages";

  return (
    <MotionLink
      href={href}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
    >
      <Image
        src={spot.image}
        alt={`${spot.name} rafting spot on the Ganga, Rishikesh`}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-heading">
        {spot.grade}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
        <span className="font-heading text-lg font-bold text-white">{spot.name}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-heading transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </MotionLink>
  );
}
