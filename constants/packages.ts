import { IMAGES } from "./images";

export interface ItineraryStep {
  time: string;
  activity: string;
}

export interface PackageFAQ {
  question: string;
  answer: string;
}

export interface RaftingPackage {
  slug: string;
  category: string;
  name: string;
  distanceKm: number;
  duration: string;
  grade: string;
  price: number;
  salePrice?: number;
  rating: number;
  image: string;
  description: string;
  longDescription: string;
  itinerary: ItineraryStep[];
  inclusions: string[];
  exclusions: string[];
  faqs: PackageFAQ[];
  minAge?: number;
  groupSize?: string;
}

/**
 * Real pricing/distance data supplied by the client (2026-08-15): 5 routes,
 * all ending at Nim Beach. Grade, duration, minimum age, and group size are
 * reasonable estimates based on standard Rishikesh rafting practice for a
 * route of that distance, not client-confirmed figures. Flag for the client
 * to verify before launch.
 */
export const PACKAGES: RaftingPackage[] = [
  {
    slug: "brahmpuri-to-nim-beach",
    category: "rafting",
    name: "Brahmpuri to Nim Beach",
    distanceKm: 9,
    duration: "2 Hours",
    grade: "Grade I-II",
    price: 599,
    rating: 5,
    image: IMAGES.packages[0],
    description:
      "The shortest and gentlest rafting stretch on the Ganga, running from Brahmpuri to Nim Beach in about 2 hours. Ideal for first-time rafters and families.",
    longDescription:
      "Brahmpuri to Nim Beach is the answer to \"which rafting route in Rishikesh is best for beginners.\" At 9 km and Grade I-II, it's the gentlest commercial stretch we run: small, regular waves you can see coming, long calm pools to relax in between them, and Himalayan foothill views the whole way down. It's the route we recommend most often for families with young children, nervous first-timers, and anyone who wants the rafting experience without the intensity of the longer runs.",
    itinerary: [
      { time: "9:00 AM / 1:00 PM", activity: "Report at Brahmpuri base point (pickup can be arranged from your hotel)" },
      { time: "9:15 AM", activity: "Safety briefing, life jacket and helmet fitting, paddling demonstration" },
      { time: "9:30 AM", activity: "Launch and raft the Brahmpuri to Nim Beach stretch" },
      { time: "11:30 AM", activity: "Disembark at Nim Beach, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "Is the Brahmpuri to Nim Beach route safe for beginners?", answer: "Yes. This is our gentlest stretch and is specifically recommended for first-time rafters, families, and children above the minimum age of 8." },
      { question: "Do I need to know how to swim for this route?", answer: "Swimming isn't mandatory since a life jacket is worn throughout, but basic water comfort is helpful." },
      { question: "What should I wear for a 9 km Brahmpuri rafting trip?", answer: "Quick-dry clothes, a spare set to change into afterward, and secured footwear. Avoid flip-flops." },
      { question: "What happens if it rains or the weather turns bad?", answer: "Light rain doesn't stop a trip. If river or weather conditions become unsafe, we'll reschedule your slot or offer an alternative date rather than run the trip as planned." },
      { question: "Can you arrange hotel pickup for this package?", answer: "Yes, hotel pickup can be pre-arranged in and around Rishikesh. Let us know when you book." },
    ],
    minAge: 8,
    groupSize: "2-30 people",
  },
  {
    slug: "club-house-to-nim-beach",
    category: "rafting",
    name: "Club House to Nim Beach",
    distanceKm: 12,
    duration: "2.5 Hours",
    grade: "Grade II",
    price: 699,
    rating: 4,
    image: IMAGES.packages[1],
    description:
      "A 12 km rafting run from Club House to Nim Beach, Grade II, with steadier current than Brahmpuri. A good next step before Shivpuri's bigger rapids.",
    longDescription:
      "Club House to Nim Beach sits between our gentlest and our signature runs: 12 km of Grade II rapids with a longer, steadier current than Brahmpuri, plus more time on the water overall. It suits rafters who want a bit more of a workout and a bit more splash without stepping up to Shivpuri's bigger Grade III rapids. A solid mid-length option if you're short on time but still want a proper river experience.",
    itinerary: [
      { time: "9:00 AM / 1:00 PM", activity: "Report at Club House base point (pickup can be arranged from your hotel)" },
      { time: "9:15 AM", activity: "Safety briefing, life jacket and helmet fitting, paddling demonstration" },
      { time: "9:30 AM", activity: "Launch and raft the Club House to Nim Beach stretch" },
      { time: "12:00 PM", activity: "Disembark at Nim Beach, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "How does the Club House route compare to Brahmpuri?", answer: "It covers more distance, 12 km versus 9 km, with steadier current and Grade II rapids, so it suits rafters who want slightly more than the gentlest beginner run." },
      { question: "Is this route suitable for first-timers?", answer: "Yes. It's beginner-friendly, though a little more active than Brahmpuri, so it's a good fit for first-timers who want a bit more current." },
      { question: "Is there a minimum age or fitness requirement?", answer: "Minimum age is 10, with no particular fitness requirement beyond basic water comfort." },
      { question: "What happens if it rains or water levels are unsafe?", answer: "We'll reschedule your slot or offer an alternative date rather than run the trip under unsafe conditions." },
      { question: "Can you arrange pickup from my hotel?", answer: "Yes, hotel pickup can be pre-arranged in and around Rishikesh. Let us know when you book." },
    ],
    minAge: 10,
    groupSize: "2-30 people",
  },
  {
    slug: "shivpuri-to-nim-beach",
    category: "rafting",
    name: "Shivpuri to Nim Beach",
    distanceKm: 16,
    duration: "3 Hours",
    grade: "Grade III",
    price: 799,
    rating: 5,
    image: IMAGES.packages[2],
    description:
      "Our most popular stretch, a 16 km run from Shivpuri to Nim Beach mixing real Grade III rapids with calm, scenic drifting.",
    longDescription:
      "Shivpuri to Nim Beach is the signature run on the Ganga and our most-booked package. It packs in a proper sequence of Grade III rapids, including the well-known Roller Coaster and Golf Course rapids, separated by long, calm drifting sections where you can float, swim, and take in the riverside cliffs and forest. At 16 km and about 3 hours, it's energetic enough to feel like a real white-water adventure while staying accessible to reasonably fit first-timers.",
    itinerary: [
      { time: "9:00 AM / 1:00 PM", activity: "Report at Shivpuri base point (pickup can be arranged from your hotel)" },
      { time: "9:15 AM", activity: "Safety briefing, life jacket and helmet fitting, paddling demonstration" },
      { time: "9:30 AM", activity: "Launch and raft through Roller Coaster, Golf Course, and the calmer drifting pools" },
      { time: "12:30 PM", activity: "Disembark at Nim Beach, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "Why is Shivpuri to Nim Beach our most popular package?", answer: "It has the best balance of real Grade III rapids and relaxed floating time, over a comfortable 16 km, 3-hour run." },
      { question: "Will I get wet on this route?", answer: "Yes, expect to get fully soaked. Rapids like Roller Coaster and Golf Course involve real splashes and swells." },
      { question: "Can I book this package for a large group?", answer: "Yes, we regularly run multiple rafts together for corporate and college groups." },
      { question: "Is there a minimum age or fitness requirement?", answer: "Minimum age is 12. No prior rafting experience is needed, but reasonable comfort in water and basic fitness make the rapids more enjoyable." },
      { question: "What if water levels are low on the day of my trip?", answer: "If levels are too low to run the full stretch safely, we'll adjust the route or offer an alternative date rather than run a compromised trip without telling you first." },
    ],
    minAge: 12,
    groupSize: "2-40 people",
  },
  {
    slug: "marine-drive-to-nim-beach",
    category: "rafting",
    name: "Marine Drive to Nim Beach",
    distanceKm: 24,
    duration: "4 Hours",
    grade: "Grade III",
    price: 1199,
    rating: 5,
    image: IMAGES.packages[3],
    description:
      "A 24 km route from Marine Drive to Nim Beach combining rolling Grade III rapids with calm pools for swimming and relaxing along the way.",
    longDescription:
      "Marine Drive to Nim Beach is the route to pick if you want a longer stretch of rapids plus riverside relaxation. Between the Grade III rapid sections, there are calm pools where you can swim and unwind under crew supervision. At 24 km, it runs longer than Shivpuri while keeping a similar rapid intensity, making it a good choice if you want more time on the water without stepping up to a full-day expedition.",
    itinerary: [
      { time: "8:30 AM / 12:30 PM", activity: "Report at Marine Drive base point (pickup can be arranged from your hotel)" },
      { time: "8:45 AM", activity: "Safety briefing, life jacket and helmet fitting, paddling demonstration" },
      { time: "9:00 AM", activity: "Launch, raft the rapids, with calm pools to swim and relax along the way" },
      { time: "1:00 PM", activity: "Disembark at Nim Beach, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "Can we stop to swim during the Marine Drive route?", answer: "Yes, there are a few calm pools along the way where you can stop to swim and relax under crew supervision." },
      { question: "How does this route compare to Shivpuri?", answer: "Similar rapid grade, longer distance at 24 km versus 16 km, with more calm stretches to swim and relax along the way." },
      { question: "What happens if it rains or the weather turns bad?", answer: "Light rain doesn't stop a trip. If conditions become genuinely unsafe, we'll reschedule your slot or offer an alternative date." },
      { question: "Is there a minimum age or fitness requirement?", answer: "Minimum age is 12. Reasonable fitness helps given the longer distance, but no prior rafting experience is required." },
      { question: "Can you arrange pickup from my hotel?", answer: "Yes, hotel pickup can be pre-arranged in and around Rishikesh. Let us know when you book." },
    ],
    minAge: 12,
    groupSize: "2-30 people",
  },
  {
    slug: "kaudiyala-to-nim-beach",
    category: "rafting",
    name: "Kaudiyala to Nim Beach",
    distanceKm: 32,
    duration: "Full Day",
    grade: "Grade IV",
    price: 2499,
    rating: 5,
    image: IMAGES.packages[4],
    description:
      "Our longest and most intense expedition, 32 km of continuous white water from Kaudiyala to Nim Beach for experienced rafters and thrill-seekers.",
    longDescription:
      "Kaudiyala to Nim Beach is the full Ganga rafting experience: starting upstream at Kaudiyala and running all the way down to Nim Beach, taking in every major rapid along the way, from Sweet Sixteen and Terminator to Roller Coaster and Golf Course. At 32 km, it's a full-day expedition with a break for lunch riverside, best suited to rafters who've either done a shorter stretch before or are reasonably confident in the water. This is the package serious rafting enthusiasts ask for by name.",
    itinerary: [
      { time: "7:30 AM", activity: "Pickup from Rishikesh, drive to Kaudiyala base point (approx. 1.5 hours)" },
      { time: "9:00 AM", activity: "Safety briefing, life jacket and helmet fitting, paddling demonstration" },
      { time: "9:30 AM", activity: "Launch and raft through the full sequence of rapids" },
      { time: "1:00 PM", activity: "Riverside break for lunch" },
      { time: "1:45 PM", activity: "Continue rafting through the Shivpuri and Marine Drive stretches" },
      { time: "4:30 PM", activity: "Disembark at Nim Beach, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Transport from Rishikesh to Kaudiyala and back",
      "Riverside lunch",
      "Extended safety briefing by senior crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)"],
    faqs: [
      { question: "Is the Kaudiyala to Nim Beach route suitable for first-time rafters?", answer: "It's better suited to rafters with some prior experience or strong water confidence, given the length and continuous rapid sequence. Talk to us before booking if you're unsure." },
      { question: "Is lunch included in this package?", answer: "Yes, a riverside lunch break is included partway through the day." },
      { question: "How fit do I need to be for a 32 km rafting expedition?", answer: "Reasonable fitness is recommended since this is a full-day, physically active trip." },
      { question: "What happens if water levels or weather make the route unsafe?", answer: "We'll reschedule to an alternative date rather than run the Grade IV sections under unsafe conditions. Safety takes priority over the original booking date." },
      { question: "Is hotel pickup included?", answer: "Yes, transport from Rishikesh to the Kaudiyala base point and back is included in this package." },
    ],
    minAge: 16,
    groupSize: "4-16 people",
  },
];

export function getPackageBySlug(slug: string): RaftingPackage | undefined {
  return PACKAGES.find((pkg) => pkg.slug === slug);
}
