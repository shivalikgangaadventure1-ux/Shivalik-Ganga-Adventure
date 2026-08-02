import { IMAGES } from "./images";

export interface Testimonial {
  name: string;
  trip: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rohan Malhotra",
    trip: "Shivpuri to Rishikesh",
    quote:
      "The rapids were more thrilling than I imagined and the guides made us feel completely safe the whole way. Best 3 hours of my trip to Rishikesh!",
    rating: 5,
    avatar: IMAGES.avatar,
  },
  {
    name: "Ananya Kapoor",
    trip: "Camping + Rafting Combo",
    quote:
      "Rafting by day and camping by the Ganga at night — the bonfire and stars were magical. The team took care of every little detail.",
    rating: 5,
    avatar: IMAGES.avatar,
  },
  {
    name: "Vikram Sethi",
    trip: "Kaudiyala to Shivpuri Extreme",
    quote:
      "As an experienced rafter, I wanted a real challenge and this route delivered. Professional equipment, sharp instructions, unforgettable rapids.",
    rating: 5,
    avatar: IMAGES.avatar,
  },
];
