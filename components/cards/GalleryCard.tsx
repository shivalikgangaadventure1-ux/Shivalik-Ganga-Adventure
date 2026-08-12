"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Expand, Play } from "lucide-react";
import type { GalleryItem } from "@/constants/gallery";

export function GalleryCard({
  item,
  index = 0,
  onClick,
}: {
  item: GalleryItem;
  index?: number;
  onClick?: () => void;
}) {
  const isVideo = item.type === "video";
  const thumbSrc = isVideo ? item.poster! : item.src;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isVideo ? `Play video: ${item.alt}` : `View larger image: ${item.alt}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05, ease: "easeOut" }}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl"
    >
      <Image
        src={thumbSrc}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading="lazy"
        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-heading/0 opacity-0 transition-all duration-300 group-hover:bg-heading/50 group-hover:opacity-100">
        <Expand className="text-white" size={24} aria-hidden="true" />
      </div>

      {isVideo && (
        <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-heading shadow-md transition-transform duration-300 group-hover:scale-110">
          <Play size={18} className="ml-0.5" fill="currentColor" aria-hidden="true" />
        </span>
      )}
    </motion.button>
  );
}
