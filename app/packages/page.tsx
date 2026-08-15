import type { Metadata } from "next";
import { PACKAGES } from "@/constants/packages";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getPackagesItemListSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { PackageCard } from "@/components/cards/PackageCard";
import { PackageComparisonTable } from "@/components/PackageComparisonTable";

export const metadata: Metadata = buildMetadata({
  title: "Rafting Packages in Rishikesh",
  description:
    "Compare all 5 of our Ganga rafting packages to Nim Beach, from a gentle 9 km beginner run at ₹599 to the full-day 32 km Grade IV expedition at ₹2499.",
  path: "/packages",
});

export default function PackagesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
  ]);
  const itemListSchema = getPackagesItemListSchema();

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <PageHero
        title="Rafting Packages"
        subtitle="Every stretch of the Ganga we run to Nim Beach, from beginner-friendly floats to a full-day Grade IV expedition."
        image={IMAGES.pageHeroes.packages}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold text-heading sm:text-3xl">
              Which Package Is Right for You?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-body sm:text-base">
              Rapid grades run from Grade I (flat, easy water) to Grade VI (unraftable
              commercially). Our 5 routes to Nim Beach span{" "}
              <strong className="text-heading">Grade I-II</strong>, gentle and forgiving, good for
              first-timers and families, through <strong className="text-heading">Grade III</strong>,
              our most popular tier with real rapids and teamwork paddling, up to{" "}
              <strong className="text-heading">Grade IV</strong>, a physically demanding run built
              for experienced, confident rafters. New to rafting or bringing kids? Start with
              Brahmpuri to Nim Beach. Want more current without a big step up? Try Club House.
              Want real rapids? Shivpuri or Marine Drive are our most popular picks. Chasing the
              biggest water on the Ganga? Kaudiyala to Nim Beach is our hardest and longest run.
            </p>
          </div>

          <div className="mt-12">
            <PackageComparisonTable packages={PACKAGES} />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((pkg, index) => (
              <PackageCard key={pkg.slug} pkg={pkg} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
