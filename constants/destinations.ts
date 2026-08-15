import { IMAGES } from "./images";

export interface RaftingSpot {
  slug: string;
  name: string;
  image: string;
  grade: string;
  distanceFromRishikesh: string;
  description: string;
  highlights?: string[];
  relatedPackageSlug?: string;
}

export const DESTINATIONS: RaftingSpot[] = [
  {
    slug: "shivpuri",
    name: "Shivpuri",
    image: IMAGES.destinations[0],
    grade: "Grade III",
    distanceFromRishikesh: "16 km",
    description:
      "The most popular put-in point on the Ganga, launching you into our signature run through Roller Coaster and Golf Course rapids down to Nim Beach.",
    highlights: ["Roller Coaster rapid", "Golf Course rapid", "Long calm drifting pools"],
    relatedPackageSlug: "shivpuri-to-nim-beach",
  },
  {
    slug: "brahmpuri",
    name: "Brahmpuri",
    image: IMAGES.destinations[1],
    grade: "Grade I-II",
    distanceFromRishikesh: "9 km",
    description:
      "The gentlest and closest put-in point to Nim Beach, ideal for first-timers, families, and anyone easing into white water.",
    highlights: ["Beginner-friendly rapids", "Closest put-in point", "Great for families"],
    relatedPackageSlug: "brahmpuri-to-nim-beach",
  },
  {
    slug: "marine-drive",
    name: "Marine Drive",
    image: IMAGES.destinations[2],
    grade: "Grade III",
    distanceFromRishikesh: "24 km",
    description:
      "A scenic stretch known for its calm pools with safe, supervised spots for cliff jumping and body surfing between the rapids.",
    highlights: ["Optional cliff jumping", "Body surfing pools", "Riverside cliffs"],
    relatedPackageSlug: "marine-drive-to-nim-beach",
  },
  {
    slug: "kaudiyala",
    name: "Kaudiyala",
    image: IMAGES.destinations[3],
    grade: "Grade IV",
    distanceFromRishikesh: "32 km",
    description:
      "The furthest and most exciting put-in point, opening up the longest, most rapid-dense run on the Ganga down to Nim Beach.",
    highlights: ["Sweet Sixteen rapid", "Terminator rapid", "Full-day expedition starting point"],
    relatedPackageSlug: "kaudiyala-to-nim-beach",
  },
  {
    slug: "byasi-rapids",
    name: "Byasi Rapids",
    image: IMAGES.destinations[4],
    grade: "Grade III",
    distanceFromRishikesh: "21 km",
    description:
      "A rapid-dense mid-river section, often combined with the longer Kaudiyala expeditions for extra white water.",
    highlights: ["Continuous rapid sequence", "Scenic gorge views"],
  },
  {
    slug: "club-house",
    name: "Club House",
    image: IMAGES.destinations[5],
    grade: "Grade II",
    distanceFromRishikesh: "12 km",
    description:
      "A mid-length put-in point between Brahmpuri and Shivpuri, with steadier current for rafters who want a bit more than the gentlest beginner run.",
    highlights: ["Steadier current than Brahmpuri", "Good next step for beginners", "12 km run to Nim Beach"],
    relatedPackageSlug: "club-house-to-nim-beach",
  },
];

export function getDestinationBySlug(slug: string): RaftingSpot | undefined {
  return DESTINATIONS.find((spot) => spot.slug === slug);
}
