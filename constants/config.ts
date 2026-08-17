/**
 * Single source of truth for company identity, contact details, and CTA copy.
 * Every phone number / WhatsApp link / address on the site is derived from here.
 */
export const COMPANY = {
  name: "Shivalik Ganga Adventure",
  shortName: "Shivalik Ganga",
  legalName: "Shivalik Ganga Adventure",
  tagline: "River Rafting & Adventure in Rishikesh",
  description:
    "Shivalik Ganga Adventure offers professional white-water river rafting on the Ganga in Rishikesh, Uttarakhand, with 5 routes to Nim Beach. Certified guides, safety-first equipment, and unforgettable adventures.",
  // Shorter variant for <title>/meta description/OG/Twitter tags, kept under the ~155-160
  // character limit search engines display before truncating. The fuller `description`
  // above is for body copy (About page, footer) and schema.org, where length doesn't hurt.
  shortDescription:
    "River rafting in Rishikesh, Uttarakhand with Shivalik Ganga Adventure. 5 routes to Nim Beach, Grade I to IV, certified guides, safety-first gear.",

  phone: "+919568868493",
  displayPhone: "+91 95688 68493",
  whatsapp: "919568868493",
  email: "info@shivalikgangaadventure.com",

  address: {
    street: "Shivpuri, Rishikesh - Badrinath Highway",
    locality: "Rishikesh",
    region: "Uttarakhand",
    postalCode: "249192",
    country: "IN",
    countryName: "India",
    full: "Shivpuri, Rishikesh - Badrinath Highway, Rishikesh, Uttarakhand 249192, India",
  },

  // Real, client-supplied coordinates for the office (verified 2026-08-17), replacing
  // the earlier rough placeholder.
  geo: {
    latitude: 30.128218,
    longitude: 78.320081,
  },

  // Exact Google Maps embed for the office, supplied directly by the client.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3450.8111111081835!2d78.32008077555693!3d30.128218074881545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA3JzQxLjYiTiA3OMKwMTknMjEuNiJF!5e0!3m2!1sen!2sin!4v1786981310843!5m2!1sen!2sin",

  hours: "Mon - Sun 6:00 AM - 8:00 PM",

  social: {
    facebook: "https://facebook.com/shivalikgangaadventure",
    instagram: "https://instagram.com/shivalikgangaadventure",
    twitter: "https://twitter.com/shivalikganga",
    youtube: "https://youtube.com/@shivalikgangaadventure",
  },

  url: "https://www.shivalikgangaadventure.com",

  whatsappMessage:
    "Hello, I'm interested in booking a rafting adventure with Shivalik Ganga Adventure.",
} as const;

/**
 * PLACEHOLDER trust/licensing copy pending real figures from the client — ok to
 * ship as plausible placeholder pre-signoff per project notes, but every value
 * here must be swapped for the real registration number, insurer, and
 * certifying-body name before public launch.
 */
export const TRUST = {
  registrationAuthority: "Uttarakhand Tourism Development Board",
  registrationNumber: "UK/ADV-TOURISM/2026/00147",
  certifyingBody: "Uttarakhand River Rafting Guide Certification Programme",
  insuranceStatement:
    "Every rafter is covered by per-person accident insurance for the duration of the trip, arranged through our insurance partner.",
  safetyEquipmentStandard: "ISI-marked life jackets and helmets",
} as const;

export function getWhatsAppLink(message: string = COMPANY.whatsappMessage): string {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getCallLink(): string {
  return `tel:${COMPANY.phone}`;
}

export const CTA = {
  bookNow: "Book Now",
  bookYourAdventure: "Book Your Adventure",
  reserveYourRaft: "Reserve Your Raft",
  whatsappBooking: "WhatsApp Booking",
  callNow: "Call Now",
  viewPackages: "View Packages",
  viewMore: "View More",
} as const;
