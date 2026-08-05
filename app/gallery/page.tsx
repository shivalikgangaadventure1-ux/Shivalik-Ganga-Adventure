import type { Metadata } from "next";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "A look at rafting trips, rapids, and riverside moments from Shivalik Ganga Adventure on the Ganga in Rishikesh.",
  path: "/gallery",
});

export default function GalleryPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Gallery"
        subtitle="Rapids, riverside camps, and the moments in between."
        image={IMAGES.pageHeroes.gallery}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <GalleryGrid images={[...IMAGES.gallery]} />
        </Container>
      </section>
    </>
  );
}
