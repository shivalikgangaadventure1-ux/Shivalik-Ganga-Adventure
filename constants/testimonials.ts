export interface Testimonial {
  name: string;
  trip: string;
  quote: string;
  rating: number;
}

/**
 * Placeholder testimonials pending real, consenting-customer reviews (per
 * project notes, ok to ship as plausible placeholder pre-signoff, flag before
 * real launch). No avatar photo: a stock photo standing in for a named person
 * would misrepresent a real customer, so cards use a generic icon avatar
 * instead (see TestimonialCard.tsx) until real customer photos are supplied.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rohan Malhotra",
    trip: "Shivpuri to Nim Beach",
    quote:
      "Honestly wasn't sure what to expect, but the Shivpuri run was so much fun. Our guide kept cracking jokes between rapids, which helped calm my nerves more than I'd like to admit. Would do it again in a heartbeat.",
    rating: 5,
  },
  {
    name: "Ananya Kapoor",
    trip: "Marine Drive to Nim Beach",
    quote:
      "We stopped at one of the calm pools partway through the Marine Drive route just to float and take in the view before continuing. Beautiful scenery the whole way down to Nim Beach, and the guides kept things fun without ever feeling unsafe.",
    rating: 5,
  },
  {
    name: "Vikram Sethi",
    trip: "Kaudiyala to Nim Beach",
    quote:
      "I've rafted a couple of rivers before and this one held up. The Grade IV stretch near Kaudiyala is no joke. Our guide read the water well and kept the raft steady even through the rough parts. Recommended if you actually want a challenge, not just a splash around.",
    rating: 5,
  },
];
