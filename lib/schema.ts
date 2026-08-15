import { COMPANY } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { PACKAGES, type PackageFAQ, type RaftingPackage } from "@/constants/packages";
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
    logo: `${COMPANY.url}${IMAGES.logoIcon}`,
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
    subjectOf: { "@id": `${COMPANY.url}/#business` },
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

export function getPackagesItemListSchema(packages: RaftingPackage[] = PACKAGES) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: packages.map((pkg, index) => {
      const url = `${COMPANY.url}/packages/${pkg.slug}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristTrip",
          name: `${pkg.name} Rafting`,
          description: pkg.description,
          url,
          image: pkg.image,
          touristType: "Adventure travelers",
          offers: {
            "@type": "Offer",
            url,
            price: pkg.salePrice ?? pkg.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
          },
        },
      };
    }),
  };
}

export function getPackageTouristTripSchema(pkg: RaftingPackage) {
  const url = `${COMPANY.url}/packages/${pkg.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: `${pkg.name} Rafting`,
    description: pkg.description,
    url,
    image: pkg.image,
    touristType: ["Adventure travelers", "Families", "Groups", "Solo travelers"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: pkg.itinerary.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.time,
        description: step.activity,
      })),
    },
    provider: { "@id": `${COMPANY.url}/#business` },
    offers: {
      "@type": "Offer",
      url,
      price: pkg.salePrice ?? pkg.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
      validFrom: "2026-08-15",
    },
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
    author: post.authorTitle
      ? { "@type": "Person", name: post.author, jobTitle: post.authorTitle }
      : { "@type": "Organization", name: post.author, url: COMPANY.url },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY.url}${IMAGES.logoIcon}`,
        width: 512,
        height: 512,
      },
    },
    image: post.coverImage.startsWith("http") ? post.coverImage : `${COMPANY.url}${post.coverImage}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY.url}/blog/${post.slug}`,
    },
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
