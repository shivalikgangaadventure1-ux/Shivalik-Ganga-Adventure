/**
 * Temporary image sources. These point at the reference template's live demo
 * assets and are meant to be swapped for real Shivalik Ganga Adventure photography.
 */
const BASE = "https://html.physcode.com/travel";

export const IMAGES = {
  heroPoster: `${BASE}/images/video_slider.jpg`,
  logo: `${BASE}/images/logo.png`,
  avatar: `${BASE}/images/avata.jpeg`,
  bgPopular: `${BASE}/images/home/bg-popular.jpg`,
  bgParallax: `${BASE}/images/home/bg-pallarax.jpg`,
  bgNewsletter: `${BASE}/images/home/bg_newletter.jpg`,
  packages: [
    `${BASE}/images/tour/430x305/tour-1.jpg`,
    `${BASE}/images/tour/430x305/tour-2.jpg`,
    `${BASE}/images/tour/430x305/tour-3.jpg`,
    `${BASE}/images/tour/430x305/tour-4.jpg`,
    `${BASE}/images/tour/430x305/tour-5.jpg`,
    `${BASE}/images/tour/430x305/tour-6.jpg`,
  ],
  destinations: [
    `${BASE}/images/city/26003147786_a04226cd2f_o.jpg`,
    `${BASE}/images/city/24987002020_29d3944b4f_o.jpg`,
    `${BASE}/images/city/25816508131_00e16429b8_o.jpg`,
    `${BASE}/images/city/photo-1474181487882-5abf3f0ba6c2.jpg`,
    `${BASE}/images/city/25656857141_edcdf5e6e3_o.jpg`,
    `${BASE}/images/city/26003147786_a04226cd2f_o.jpg`,
  ],
  gallery: [
    `${BASE}/images/instagram/1.jpg`,
    `${BASE}/images/instagram/2.jpg`,
    `${BASE}/images/instagram/3.jpg`,
    `${BASE}/images/instagram/4.jpg`,
    `${BASE}/images/instagram/5.jpg`,
    `${BASE}/images/instagram/6.jpg`,
  ],
  // Banner images for interior-page PageHero components. Reusing existing
  // categories for now — swap for dedicated per-page photography later.
  pageHeroes: {
    packages: `${BASE}/images/tour/430x305/tour-2.jpg`,
    destinations: `${BASE}/images/city/25816508131_00e16429b8_o.jpg`,
    gallery: `${BASE}/images/instagram/3.jpg`,
    about: `${BASE}/images/home/bg-pallarax.jpg`,
    blog: `${BASE}/images/city/24987002020_29d3944b4f_o.jpg`,
    contact: `${BASE}/images/home/bg_newletter.jpg`,
  },
  blogCovers: [
    `${BASE}/images/instagram/2.jpg`,
    `${BASE}/images/instagram/4.jpg`,
    `${BASE}/images/instagram/6.jpg`,
  ],
} as const;
