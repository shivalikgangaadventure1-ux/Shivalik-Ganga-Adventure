"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { GalleryCard } from "@/components/cards/GalleryCard";

const GalleryLightbox = dynamic(
  () => import("@/components/GalleryLightbox").then((mod) => mod.GalleryLightbox),
  { ssr: false }
);

export function GalleryGrid({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {images.map((src, index) => (
          <GalleryCard
            key={src + index}
            src={src}
            alt="Shivalik Ganga Adventure rafting moment"
            index={index}
            onClick={() => setOpenIndex(index)}
          />
        ))}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
