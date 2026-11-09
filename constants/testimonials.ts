export interface Testimonial {
  name: string;
  /** Short reviewer detail shown under the name, e.g. "Local Guide" or "Google review". */
  detail: string;
  quote: string;
  rating: number;
}

/**
 * Real Google reviews of the Shivalik Ganga Adventure -Rishikesh business profile,
 * copied verbatim (wording, spelling and punctuation as the reviewers wrote them;
 * emoji dropped). Pulled from the live listing in Nov 2026. Each was left a few
 * weeks earlier and has a 5-star rating. The full set is on the Google profile
 * (see COMPANY.googleReviews.reviewsUrl).
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Karan Kanwal",
    detail: "Google Local Guide",
    quote:
      "Had an amazing river ratting experience! A special mention to our guide, Himanshu Rana, who is extremely skilled, proficient, and fun-loving. He made us feel completely comfortable and safe throughout the rafting, while also keeping the experience exciting and enjoyable. His professionalism, confidence, and friendly nature made the entire experience truly memorable. Highly recommended!",
    rating: 5,
  },
  {
    name: "Pooja Bartwal",
    detail: "16 km rafting · Google review",
    quote:
      "Had a amazing and thrilled experience. Did 16km river rafting in Rishikesh. The guide Mr. Kamlesh was super experienced and made us feel safe even in the big rapids like Roller Coaster and Golf Course. Water was freezing but the cliff jump in the middle was the highlight! Well-organized, good safety gear, and lots of fun.",
    rating: 5,
  },
  {
    name: "reena Bartwal",
    detail: "Google review",
    quote:
      "One of the most exciting adventure activities I've ever experienced. The rafting route was full of thrilling rapids, and the instructors \"Himanshu Rana\" ensured everyone felt safe throughout the journey. The equipment was in good condition, and the entire team was friendly and supportive. If you're visiting Rishikesh, rafting is a must-try experience with \"SHIVALIK GANGA ADVENTURE\".",
    rating: 5,
  },
  {
    name: "Ganapathi Koneti",
    detail: "Google review",
    quote:
      "Must do Adventure.... Thrilled at height's... Mr. Himansu Singh Rana made it more adventurous.... Once in life time experience. Very Grateful to Rana bhai especially... We really thrilled.. Thank you Shivalik Ganga Adventure.",
    rating: 5,
  },
  {
    name: "Suraj Sitole",
    detail: "12 km rafting · Google review",
    quote:
      "Rever rafting. I am doing 12km rafting and my experience is very good end my gauid: kamlesh is very professional and exelent my number is 10/10",
    rating: 5,
  },
];
