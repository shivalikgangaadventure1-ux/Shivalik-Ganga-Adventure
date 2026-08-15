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
  gallery?: string[];
  minAge?: number;
  groupSize?: string;
}

export const PACKAGES: RaftingPackage[] = [
  {
    slug: "brahmpuri-to-rishikesh",
    category: "rafting",
    name: "Brahmpuri to Rishikesh",
    distanceKm: 9,
    duration: "2 Hours",
    grade: "Grade II",
    price: 799,
    salePrice: 599,
    rating: 5,
    image: IMAGES.packages[0],
    description: "A gentle introduction to white-water rafting, perfect for beginners and families.",
    longDescription:
      "The Brahmpuri stretch is the shortest and gentlest rafting run on the Ganga near Rishikesh, making it the ideal first-timer's route. Rolling Grade II rapids alternate with long calm pools, giving you time to relax, take in the Himalayan foothill views, and get comfortable with paddling as a team before the rapids pick up. This is the route we recommend most often for families with children, first-time rafters, and groups who want the rafting experience without the intensity of the longer runs.",
    itinerary: [
      { time: "9:00 AM / 1:00 PM", activity: "Report at Brahmpuri base point (pickup can be arranged from your hotel)" },
      { time: "9:15 AM", activity: "Safety briefing, life jacket & helmet fitting, paddling demonstration" },
      { time: "9:30 AM", activity: "Launch and raft the Brahmpuri to Rishikesh stretch" },
      { time: "11:30 AM", activity: "Disembark at Rishikesh, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "Is this route safe for beginners?", answer: "Yes — Brahmpuri is our gentlest stretch and is specifically recommended for first-time rafters, families, and children above the minimum age." },
      { question: "Do I need to know how to swim?", answer: "Swimming isn't mandatory since a life jacket is worn throughout, but basic water comfort is helpful." },
      { question: "What should I wear?", answer: "Quick-dry clothes, a spare set to change into afterward, and secured footwear (no flip-flops)." },
      { question: "Is there a minimum age or fitness requirement?", answer: "Minimum age is 8, with no particular fitness requirement — this is our gentlest route and suitable for most reasonably healthy participants." },
      { question: "What happens if it rains or the weather turns bad?", answer: "Light rain doesn't stop a trip. If river or weather conditions become unsafe, we'll reschedule your slot or offer an alternative date rather than run the trip as planned." },
      { question: "Can you arrange pickup from my hotel?", answer: "Yes, hotel pickup can be pre-arranged in and around Rishikesh — let us know when you book." },
    ],
    minAge: 8,
    groupSize: "2–30 people",
  },
  {
    slug: "shivpuri-to-rishikesh",
    category: "rafting",
    name: "Shivpuri to Rishikesh",
    distanceKm: 16,
    duration: "3 Hours",
    grade: "Grade III",
    price: 899,
    rating: 5,
    image: IMAGES.packages[1],
    description: "Our most popular stretch — a mix of thrilling rapids and calm, scenic drifting.",
    longDescription:
      "Shivpuri to Rishikesh is the signature run on the Ganga and our most-booked package. It packs in a proper sequence of Grade III rapids — including the well-known Roller Coaster and Golf Course rapids — separated by long, calm drifting sections where you can float, swim, and soak in the riverside cliffs and forest. It's energetic enough to feel like a real white-water adventure while staying accessible to reasonably fit first-timers.",
    itinerary: [
      { time: "9:00 AM / 1:00 PM", activity: "Report at Shivpuri base point (pickup can be arranged from your hotel)" },
      { time: "9:15 AM", activity: "Safety briefing, life jacket & helmet fitting, paddling demonstration" },
      { time: "9:30 AM", activity: "Launch and raft through Roller Coaster, Golf Course, and the calmer drifting pools" },
      { time: "12:30 PM", activity: "Disembark at Rishikesh, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "Why is this the most popular package?", answer: "It has the best balance of real Grade III rapids and relaxed floating time, at a comfortable 3-hour length." },
      { question: "Will I get wet?", answer: "Yes, expect to get fully soaked — rapids like Roller Coaster and Golf Course involve real splashes and swells." },
      { question: "Can I book this for a large group?", answer: "Yes, we regularly run multiple rafts together for corporate and college groups." },
      { question: "Is there a minimum age or fitness requirement?", answer: "Minimum age is 12. No prior rafting experience is needed, but reasonable comfort in water and basic fitness make the rapids more enjoyable." },
      { question: "What if water levels are low on the day of my trip?", answer: "If levels are too low to run the full stretch safely, we'll either adjust the route or offer an alternative date — we won't run a compromised trip without telling you first." },
    ],
    minAge: 12,
    groupSize: "2–40 people",
  },
  {
    slug: "marine-drive-to-rishikesh",
    category: "rafting",
    name: "Marine Drive to Rishikesh",
    distanceKm: 12,
    duration: "2.5 Hours",
    grade: "Grade III",
    price: 799,
    rating: 4,
    image: IMAGES.packages[2],
    description: "Cliff jumps, body surfing, and rolling rapids along a stunning riverside route.",
    longDescription:
      "Marine Drive is the stretch to pick if you want a mix of rapids and river-side fun. Between the Grade III rapid sections, there are calm pools with safe spots for optional cliff jumping and body surfing under crew supervision. It runs slightly shorter than Shivpuri but keeps a similar rapid intensity, making it a good option if you're short on time but don't want to compromise on the thrill.",
    itinerary: [
      { time: "9:00 AM / 1:00 PM", activity: "Report at Marine Drive base point (pickup can be arranged from your hotel)" },
      { time: "9:15 AM", activity: "Safety briefing, life jacket & helmet fitting, paddling demonstration" },
      { time: "9:30 AM", activity: "Launch, raft the rapids, optional supervised cliff jumping and body surfing in calm pools" },
      { time: "12:00 PM", activity: "Disembark at Rishikesh, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "Is cliff jumping compulsory?", answer: "No, it's entirely optional and only offered at safe, crew-supervised spots." },
      { question: "How does this compare to the Shivpuri route?", answer: "Similar rapid grade, slightly shorter distance, with the added option of cliff jumping and body surfing." },
      { question: "What happens if it rains or the weather turns bad?", answer: "Light rain doesn't stop a trip. If conditions become genuinely unsafe, we'll reschedule your slot or offer an alternative date." },
      { question: "Can you arrange pickup from my hotel?", answer: "Yes, hotel pickup can be pre-arranged in and around Rishikesh — let us know when you book." },
    ],
    minAge: 12,
    groupSize: "2–30 people",
  },
  {
    slug: "kaudiyala-to-rishikesh",
    category: "rafting",
    name: "Kaudiyala to Rishikesh",
    distanceKm: 26,
    duration: "Full Day",
    grade: "Grade III+",
    price: 1499,
    rating: 5,
    image: IMAGES.packages[3],
    description: "The longest run in Rishikesh, combining every rapid the Ganga has to offer.",
    longDescription:
      "This is the full Ganga rafting experience — starting upstream at Kaudiyala and running all the way down to Rishikesh, covering every major rapid along the way, from Sweet Sixteen and Terminator to Roller Coaster and Golf Course. It's a full-day expedition with a break for lunch riverside, best suited to rafters who've either done a shorter stretch before or are reasonably confident in the water. This is the package serious rafting enthusiasts ask for by name.",
    itinerary: [
      { time: "8:00 AM", activity: "Pickup from Rishikesh, drive to Kaudiyala base point (approx. 1.5 hours)" },
      { time: "9:30 AM", activity: "Safety briefing, life jacket & helmet fitting, paddling demonstration" },
      { time: "10:00 AM", activity: "Launch and raft through the full sequence of rapids" },
      { time: "1:00 PM", activity: "Riverside break for lunch" },
      { time: "1:45 PM", activity: "Continue rafting through the Shivpuri and Marine Drive stretches" },
      { time: "4:00 PM", activity: "Disembark at Rishikesh, gear return, drop-off" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Transport from Rishikesh to Kaudiyala and back",
      "Riverside lunch",
      "Safety briefing by our rafting crew",
      "First-aid support and a safety kayak escort",
      "Rafting certificate on request",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)"],
    faqs: [
      { question: "Is this suitable for first-time rafters?", answer: "It's better suited to rafters with some prior experience or strong water confidence, given the length and continuous rapid sequence — talk to us before booking if you're unsure." },
      { question: "Is lunch included?", answer: "Yes, a riverside lunch break is included partway through the day." },
      { question: "How fit do I need to be?", answer: "Reasonable fitness is recommended since this is a full-day, physically active trip." },
      { question: "What happens if it rains or water levels are unsafe?", answer: "We'll reschedule to an alternative date or, where safe, adjust the route rather than run the full stretch under unsafe conditions." },
      { question: "Is hotel pickup included?", answer: "Yes — transport from Rishikesh to the Kaudiyala base point and back is included in this package." },
    ],
    minAge: 14,
    groupSize: "4–20 people",
  },
  {
    slug: "camping-rafting-combo",
    category: "rafting",
    name: "Camping + Rafting Combo",
    distanceKm: 16,
    duration: "1 Night 2 Days",
    grade: "All Grades",
    price: 2499,
    rating: 5,
    image: IMAGES.packages[4],
    description: "River rafting by day, riverside camping, bonfire, and music under the stars by night.",
    longDescription:
      "Turn your rafting trip into an overnight adventure. This combo pairs a full rafting run with a night at a riverside camp — tents, a bonfire, and dinner under the stars, followed by breakfast and free time by the river the next morning before check-out. It's our most popular pick for groups of friends, college trips, and anyone who wants more than just a few hours on the water.",
    itinerary: [
      { time: "Day 1, 9:00 AM", activity: "Report at base point, safety briefing, gear fitting" },
      { time: "Day 1, 9:30 AM", activity: "Rafting run down to the riverside camp" },
      { time: "Day 1, 1:00 PM", activity: "Check-in at camp, lunch, free time — river-side games, volleyball" },
      { time: "Day 1, 7:00 PM", activity: "Bonfire, music, and dinner by the river" },
      { time: "Day 2, 7:30 AM", activity: "Breakfast, camp check-out" },
      { time: "Day 2, 10:00 AM", activity: "Drop-off / departure" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle for the rafting leg",
      "One night's camp stay (twin-sharing tents)",
      "Dinner, bonfire, and breakfast",
      "Safety briefing and first-aid support",
    ],
    exclusions: ["Personal expenses", "Alcoholic beverages", "Transport to/from base point unless pre-arranged"],
    faqs: [
      { question: "What are the camp facilities like?", answer: "Twin-sharing tents with mattresses and bedding, common washroom facilities, and a dining/bonfire area by the river." },
      { question: "Can I book just the camping without rafting?", answer: "This package is built around the rafting + camping combo — get in touch via WhatsApp if you'd like a camping-only quote." },
      { question: "Is this suitable for a college group?", answer: "Yes, this is one of our most popular packages for college and friend groups — group discounts are available on request." },
      { question: "What happens if it rains overnight?", answer: "Light rain doesn't cancel the camp — tents and the dining/bonfire area are set up to handle it. Genuinely unsafe weather or river conditions may mean rescheduling the rafting leg; we'll confirm with you in advance." },
    ],
    minAge: 10,
    groupSize: "4–25 people",
  },
  {
    slug: "kaudiyala-to-shivpuri-extreme",
    category: "rafting",
    name: "Kaudiyala to Shivpuri Extreme",
    distanceKm: 36,
    duration: "Full Day",
    grade: "Grade IV",
    price: 1999,
    rating: 5,
    image: IMAGES.packages[5],
    description: "Our most extreme rafting expedition for experienced adventurers seeking a challenge.",
    longDescription:
      "The longest and most intense rafting expedition we run — 36 km of continuous white water from Kaudiyala down to Shivpuri, taking in every major rapid on the Ganga including the toughest Grade IV sections. This route is built for experienced rafters or thrill-seekers in strong physical condition who want the most demanding version of the Ganga rafting experience. Group sizes are kept smaller for tighter crew coordination on the harder rapids.",
    itinerary: [
      { time: "7:30 AM", activity: "Pickup from Rishikesh, drive to Kaudiyala base point" },
      { time: "9:00 AM", activity: "Extended safety briefing, gear fitting, and rapid-specific instructions" },
      { time: "9:30 AM", activity: "Launch and raft through the Grade IV sections" },
      { time: "1:00 PM", activity: "Riverside break for lunch" },
      { time: "1:45 PM", activity: "Continue through to Shivpuri" },
      { time: "4:30 PM", activity: "Disembark, gear return, drop-off at Rishikesh" },
    ],
    inclusions: [
      "Life jacket, helmet, and paddle",
      "Transport from Rishikesh to Kaudiyala and back",
      "Riverside lunch",
      "Extended safety briefing by senior crew",
      "First-aid support and a safety kayak escort",
    ],
    exclusions: ["Personal expenses", "Photography/videography (available on request)"],
    faqs: [
      { question: "Do I need prior rafting experience?", answer: "Prior rafting experience or strong swimming/water confidence is strongly recommended given the Grade IV sections — speak to our team before booking if you're unsure this is the right route for you." },
      { question: "Why is the group size smaller?", answer: "Smaller rafts and groups allow tighter paddling coordination, which matters more on the harder rapids." },
      { question: "Is there a minimum fitness requirement?", answer: "Yes — this is a physically demanding full-day route best suited to fit, confident swimmers." },
      { question: "What happens if water levels or weather make the route unsafe?", answer: "We'll reschedule to an alternative date rather than run the Grade IV sections under unsafe conditions — safety takes priority over the original booking date." },
      { question: "Is hotel pickup included?", answer: "Yes — transport from Rishikesh to the Kaudiyala base point and back is included in this package." },
    ],
    minAge: 16,
    groupSize: "4–16 people",
  },
];

export function getPackageBySlug(slug: string): RaftingPackage | undefined {
  return PACKAGES.find((pkg) => pkg.slug === slug);
}
