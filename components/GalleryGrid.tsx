"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { GalleryItem } from "@/constants/gallery";
import { GalleryCard } from "@/components/cards/GalleryCard";

const GalleryLightbox = dynamic(
  () => import("@/components/GalleryLightbox").then((mod) => mod.GalleryLightbox),
  { ssr: false }
);

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
        {items.map((item, index) => (
          <GalleryCard
            key={item.src}
            item={item}
            index={index}
            onClick={() => setOpenIndex(index)}
          />
        ))}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
