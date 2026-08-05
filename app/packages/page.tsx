import type { Metadata } from "next";
import { PACKAGES } from "@/constants/packages";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { PackageCard } from "@/components/cards/PackageCard";

export const metadata: Metadata = buildMetadata({
  title: "Rafting Packages in Rishikesh",
  description:
    "Compare all our river rafting packages on the Ganga in Rishikesh — from a gentle 9 km beginner run to the full-day 36 km Grade IV expedition, plus our camping combo.",
  path: "/packages",
});

export default function PackagesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Rafting Packages"
        subtitle="Every stretch of the Ganga we run, from beginner-friendly floats to full-day Grade IV expeditions."
        image={IMAGES.pageHeroes.packages}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((pkg, index) => (
              <PackageCard key={pkg.slug} pkg={pkg} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
