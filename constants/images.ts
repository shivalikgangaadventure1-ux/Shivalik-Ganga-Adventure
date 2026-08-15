/**
 * Hero, home-section, package, and destination images are the client's real,
 * supplied photography (converted to WebP, compressed). Page-hero banners are
 * still freely-licensed Unsplash placeholders pending real photos for those
 * spots.
 */

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=2000&auto=format&fit=crop`;
}

export const IMAGES = {
  // Real client-supplied photography (converted to WebP, already compressed).
  heroPoster: "/images/hero/hero-home.webp",
  achievementsBg: "/images/home/achievements-bg.webp",
  // Full horizontal lockup (icon + wordmark), color version for light/white backgrounds.
  logo: "/images/logo/logo-white.webp",
  // Same lockup, light-colored artwork for dark/photo backgrounds (transparent PNG source).
  logoLight: "/images/logo/logo-transparent.webp",
  // Icon mark only, square, for favicons and the schema.org `logo` field.
  logoIcon: "/images/logo/favicon.png",
  bgPopular: unsplash("1512675628397-28288d1220ef"),
  bgNewsletter: "/images/home/cta-bg.webp",
  packages: [
    "/images/packages/brahmpuri-to-nim-beach.webp",
    "/images/packages/club-house-to-nim-beach.webp",
    "/images/packages/shivpuri-to-nim-beach.webp",
    "/images/packages/marine-drive-to-nim-beach.webp",
    "/images/packages/kaudiyala-to-nim-beach.webp",
  ],
  destinations: [
    "/images/destinations/shivpuri.webp",
    "/images/destinations/brahmpuri.webp",
    "/images/destinations/marine-drive.webp",
    "/images/destinations/kaudiyala.webp",
    "/images/destinations/byasi-rapids.webp",
    "/images/destinations/club-house.webp",
  ],
  // Real client-supplied photography (converted to WebP, already compressed).
  gallery: [
    "/images/gallery/rafting-img (1).webp",
    "/images/gallery/rafting-img (2).webp",
    "/images/gallery/rafting-img (3).webp",
    "/images/gallery/rafting-img (4).webp",
    "/images/gallery/rafting-img (5).webp",
    "/images/gallery/rafting-img (6).webp",
    "/images/gallery/rafting-img (7).webp",
  ],
  // Banner images for interior-page PageHero components.
  pageHeroes: {
    packages: unsplash("1574116504481-e06341e984e1"),
    destinations: unsplash("1760904652241-36ad6b4e752f"),
    gallery: unsplash("1666289214063-58da59508f1c"),
    about: unsplash("1665516969928-ac882b92af07"),
    blog: unsplash("1781427012162-8387c78f1dfb"),
    contact: unsplash("1691347869738-16222993cc3a"),
  },
  blogCovers: [
    unsplash("1606349779646-b6ca5df78bdf"),
    unsplash("1641584495089-5914d85d9bcc"),
    unsplash("1629248457649-b082812aea6c"),
  ],
} as const;
