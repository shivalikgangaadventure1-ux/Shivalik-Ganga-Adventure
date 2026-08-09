/**
 * Temporary image sources — real, freely-licensed Unsplash photography used as
 * placeholders (upgraded from the original low-res reference-template demo
 * assets). These are still NOT the client's actual business photography and
 * should be swapped for real trip/location photos once supplied.
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
  heroPoster: unsplash("1599443380179-33737c17ca81"), // rafters cresting a rapid at sunset
  logo: `${DEMO_BASE}/images/logo.png`,
  avatar: `${DEMO_BASE}/images/avata.jpeg`,
  bgPopular: unsplash("1512675628397-28288d1220ef"),
  bgParallax: unsplash("1665516627441-3edbd940dbfb"),
  bgNewsletter: unsplash("1691347869738-16222993cc3a"),
  packages: [
    unsplash("1503518406936-078df75d0c7c"), // brahmpuri — calm, beginner-friendly
    unsplash("1629248457649-b082812aea6c"), // shivpuri — action
    unsplash("1658355686821-f412c8397a0d"), // marine drive
    unsplash("1692095296859-60427614df87"), // kaudiyala
    unsplash("1699002458581-2f3aa39304b6"), // camping + rafting combo
    unsplash("1641584495089-5914d85d9bcc"), // kaudiyala extreme — big rapids
  ],
  destinations: [
    unsplash("1606349779646-b6ca5df78bdf"), // shivpuri
    unsplash("1656179534360-6656e65c95ca"), // brahmpuri
    unsplash("1611907046713-6699636ba2ec"), // marine drive
    unsplash("1611907046358-e92ae1deadb2"), // kaudiyala
    unsplash("1696556654030-a74ec07e0fe8"), // byasi rapids
    unsplash("1781427012362-7990245fbce3"), // river camp
  ],
  gallery: [
    unsplash("1692205610985-fc4c1fcacd98"),
    unsplash("1516817153573-7b617832a471"),
    unsplash("1594026634827-fe99c0a22e83"),
    unsplash("1653379714531-47f3f491c509"),
    unsplash("1758552396011-1610e8a4c1c8"),
    unsplash("1636294734011-3a642de28d8a"),
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
