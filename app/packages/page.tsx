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
    "Compare all our river rafting packages on the Ganga in Rishikesh — from a gentle 9 km beginner run to the full-day 36 km Grade IV expedition, plus our camping combo.",
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
        subtitle="Every stretch of the Ganga we run, from beginner-friendly floats to full-day Grade IV expeditions."
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
              commercially). Our routes span <strong className="text-heading">Grade II</strong> —
              gentle, forgiving, good for first-timers and families — through{" "}
              <strong className="text-heading">Grade III</strong>, our most popular tier with real
              rapids and teamwork paddling, up to{" "}
              <strong className="text-heading">Grade IV</strong>, a physically demanding run built
              for experienced, confident rafters. New to rafting or bringing kids? Start with
              Brahmpuri. Want rapids without the extreme? Shivpuri or Marine Drive. Chasing the
              biggest water on the Ganga? Kaudiyala to Shivpuri Extreme is our hardest run.
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
