import type { Metadata } from "next";
import { DESTINATIONS } from "@/constants/destinations";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { DestinationCard } from "@/components/cards/DestinationCard";

export const metadata: Metadata = buildMetadata({
  title: "Rafting Destinations on the Ganga",
  description:
    "Explore the rafting put-in points along the Ganga near Rishikesh — from the beginner-friendly Brahmpuri stretch to the Grade IV rapids at Kaudiyala.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Rafting Destinations"
        subtitle="Every put-in point we run on the Ganga, from gentle beginner stretches to the toughest Grade IV water."
        image={IMAGES.pageHeroes.destinations}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((spot, index) => (
              <div key={spot.slug} className="flex flex-col gap-4">
                <DestinationCard spot={spot} index={index} />
                <div>
                  <p className="text-sm leading-relaxed text-body">{spot.description}</p>
                  {spot.highlights && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {spot.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full bg-light px-3 py-1 text-xs font-semibold text-heading"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
