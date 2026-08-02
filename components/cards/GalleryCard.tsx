"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Expand } from "lucide-react";

export function GalleryCard({
  src,
  alt,
  index = 0,
}: {
  src: string;
  alt: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06, ease: "easeOut" }}
      className="group relative aspect-square overflow-hidden rounded-xl"
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-heading/0 opacity-0 transition-all duration-300 group-hover:bg-heading/50 group-hover:opacity-100">
        <Expand className="text-white" size={24} aria-hidden="true" />
      </div>
    </motion.div>
  );
}
