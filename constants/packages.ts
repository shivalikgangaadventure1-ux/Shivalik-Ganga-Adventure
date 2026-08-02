import { IMAGES } from "./images";

export interface RaftingPackage {
  slug: string;
  name: string;
  distanceKm: number;
  duration: string;
  grade: string;
  price: number;
  salePrice?: number;
  rating: number;
  image: string;
  description: string;
}

export const PACKAGES: RaftingPackage[] = [
  {
    slug: "brahmpuri-to-rishikesh",
    name: "Brahmpuri to Rishikesh",
    distanceKm: 9,
    duration: "2 Hours",
    grade: "Grade II",
    price: 799,
    salePrice: 599,
    rating: 5,
    image: IMAGES.packages[0],
    description: "A gentle introduction to white-water rafting, perfect for beginners and families.",
  },
  {
    slug: "shivpuri-to-rishikesh",
    name: "Shivpuri to Rishikesh",
    distanceKm: 16,
    duration: "3 Hours",
    grade: "Grade III",
    price: 899,
    rating: 5,
    image: IMAGES.packages[1],
    description: "Our most popular stretch — a mix of thrilling rapids and calm, scenic drifting.",
  },
  {
    slug: "marine-drive-to-rishikesh",
    name: "Marine Drive to Rishikesh",
    distanceKm: 12,
    duration: "2.5 Hours",
    grade: "Grade III",
    price: 799,
    rating: 4,
    image: IMAGES.packages[2],
    description: "Cliff jumps, body surfing, and rolling rapids along a stunning riverside route.",
  },
  {
    slug: "kaudiyala-to-rishikesh",
    name: "Kaudiyala to Rishikesh",
    distanceKm: 26,
    duration: "Full Day",
    grade: "Grade III+",
    price: 1499,
    rating: 5,
    image: IMAGES.packages[3],
    description: "The longest run in Rishikesh, combining every rapid the Ganga has to offer.",
  },
  {
    slug: "camping-rafting-combo",
    name: "Camping + Rafting Combo",
    distanceKm: 16,
    duration: "1 Night 2 Days",
    grade: "All Grades",
    price: 2499,
    rating: 5,
    image: IMAGES.packages[4],
    description: "River rafting by day, riverside camping, bonfire, and music under the stars by night.",
  },
  {
    slug: "kaudiyala-to-shivpuri-extreme",
    name: "Kaudiyala to Shivpuri Extreme",
    distanceKm: 36,
    duration: "Full Day",
    grade: "Grade IV",
    price: 1999,
    rating: 5,
    image: IMAGES.packages[5],
    description: "Our most extreme rafting expedition for experienced adventurers seeking a challenge.",
  },
];
