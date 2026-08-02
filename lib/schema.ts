import { COMPANY } from "@/constants/config";
import { PACKAGES } from "@/constants/packages";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${COMPANY.url}/#business`,
    name: COMPANY.name,
    description: COMPANY.description,
    url: COMPANY.url,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    priceRange: "₹₹",
    image: `${COMPANY.url}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.locality,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "20:00",
    },
    sameAs: Object.values(COMPANY.social),
  };
}

export function getTouristAttractionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${COMPANY.url}/#attraction`,
    name: "Ganga River Rafting, Rishikesh",
    description:
      "White-water river rafting on the Ganga in Rishikesh, covering rapids from Grade I to Grade IV across multiple river stretches.",
    url: COMPANY.url,
    touristType: ["Adventure travelers", "Families", "Groups", "Solo travelers"],
    isAccessibleForFree: false,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.locality,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
  };
}

export function getPackagesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PACKAGES.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristTrip",
        name: `${pkg.name} Rafting`,
        description: pkg.description,
        touristType: "Adventure travelers",
        offers: {
          "@type": "Offer",
          price: pkg.salePrice ?? pkg.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}

export function getBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: COMPANY.url,
      },
    ],
  };
}
