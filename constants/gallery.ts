import { IMAGES } from "./images";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  width: number;
  height: number;
}

const IMAGE_ITEMS: GalleryItem[] = IMAGES.gallery.map((src, index) => ({
  type: "image",
  src,
  alt: `Shivalik Ganga Adventure rafting moment ${index + 1}`,
  width: 4872,
  height: 5568,
}));

const VIDEO_COUNT = 8;
const VIDEO_ITEMS: GalleryItem[] = Array.from({ length: VIDEO_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    type: "video",
    src: `/videos/gallery/rafting-clip-${n}.mp4`,
    poster: `/images/gallery/rafting-clip-${n}-poster.jpg`,
    alt: `Shivalik Ganga Adventure rafting video clip ${n}`,
    width: 608,
    height: 1080,
  };
});

// Interleaved rather than all-images-then-all-videos, so the masonry grid
// mixes both media types throughout instead of clustering videos at the end.
export const GALLERY_ITEMS: GalleryItem[] = (() => {
  const items: GalleryItem[] = [];
  const max = Math.max(IMAGE_ITEMS.length, VIDEO_ITEMS.length);
  for (let i = 0; i < max; i++) {
    if (IMAGE_ITEMS[i]) items.push(IMAGE_ITEMS[i]);
    if (VIDEO_ITEMS[i]) items.push(VIDEO_ITEMS[i]);
  }
  return items;
})();
