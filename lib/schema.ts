import { COMPANY } from "@/constants/config";
import { PACKAGES, type PackageFAQ } from "@/constants/packages";
import type { BlogPostMeta } from "@/lib/blog";

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
    image: `${COMPANY.url}/opengraph-image`,
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

export function getBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${COMPANY.url}${crumb.path}`,
    })),
  };
}

export function getBlogPostingSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    image: `${COMPANY.url}${post.coverImage}`,
    mainEntityOfPage: `${COMPANY.url}/blog/${post.slug}`,
  };
}

export function getFAQPageSchema(faqs: PackageFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
