import type { Metadata } from "next";
import { IMAGES } from "@/constants/images";
import { GALLERY_ITEMS } from "@/constants/gallery";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
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
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
          <GalleryGrid items={GALLERY_ITEMS} />
        </div>
      </section>
    </>
  );
}
