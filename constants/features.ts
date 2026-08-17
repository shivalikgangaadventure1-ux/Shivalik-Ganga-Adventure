export interface Feature {
  icon: "ShieldCheck" | "Compass" | "BadgeIndianRupee" | "Waves";
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: "ShieldCheck",
    title: "Certified Safety Gear",
    description:
      "Life jackets, helmets, and rafts inspected before every trip, guided by certified river rescue experts.",
  },
  {
    icon: "Compass",
    title: "Expert River Guides",
    description:
      "Our guides have run the Ganga for years and know every rapid, eddy, and safe landing on the river.",
  },
  {
    icon: "BadgeIndianRupee",
    title: "Best Value Packages",
    description:
      "Transparent pricing with no hidden costs, from short beginner runs to full-day extreme expeditions.",
  },
  {
    icon: "Waves",
    title: "Scenic Ganga Rapids",
    description:
      "Raft through Grade I to Grade IV rapids framed by the Himalayan foothills and forest-lined banks.",
  },
];

export const ACHIEVEMENTS = [
  { number: "15,000+", label: "Happy Rafters" },
  { number: "5", label: "Rafting Routes" },
  { number: "5,000+", label: "Successful Trips" },
  { number: "25+", label: "Expert Guides" },
] as const;
