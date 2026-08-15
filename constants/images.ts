/**
 * Hero, home-section, package, and destination images are the client's real,
 * supplied photography (converted to WebP, compressed). Page-hero banners are
 * still freely-licensed Unsplash placeholders pending real photos for those
 * spots.
 *
 * Exception: `logo` and `avatar` are intentionally left on the old demo host —
 * a stock photo standing in for a specific named testimonial ("Priya Sharma")
 * would misrepresent a real person, so `avatar` needs an actual customer photo
 * (with consent) rather than a nicer-looking fake one.
 */
const DEMO_BASE = "https://html.physcode.com/travel";

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=2000&auto=format&fit=crop`;
}

export const IMAGES = {
  // Real client-supplied photography (converted to WebP, already compressed).
  heroPoster: "/images/hero/hero-home.webp",
  achievementsBg: "/images/home/achievements-bg.webp",
  logo: "/images/logo/logo-shivalik-adv.webp",
  avatar: `${DEMO_BASE}/images/avata.jpeg`,
  bgPopular: unsplash("1512675628397-28288d1220ef"),
  bgNewsletter: "/images/home/cta-bg.webp",
  packages: [
    "/images/packages/brahmpuri-to-rishikesh.webp",
    "/images/packages/shivpuri-to-rishikesh.webp",
    "/images/packages/marine-drive-to-rishikesh.webp",
    "/images/packages/kaudiyala-to-rishikesh.webp",
    "/images/packages/camping-rafting-combo.webp",
    "/images/packages/kaudiyala-to-shivpuri-extreme.webp",
  ],
  destinations: [
    "/images/destinations/shivpuri.webp",
    "/images/destinations/brahmpuri.webp",
    "/images/destinations/marine-drive.webp",
    "/images/destinations/kaudiyala.webp",
    "/images/destinations/byasi-rapids.webp",
    "/images/destinations/river-camp.webp",
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
