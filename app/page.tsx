import { getBreadcrumbSchema, getPackagesItemListSchema } from "@/lib/schema";
import { Hero } from "@/sections/Hero";
import { SearchBooking } from "@/sections/SearchBooking";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { PopularTours } from "@/sections/PopularTours";
import { Destinations } from "@/sections/Destinations";
import { Achievements } from "@/sections/Achievements";
import { DealsPromo } from "@/sections/DealsPromo";
import { Testimonials } from "@/sections/Testimonials";

export default function HomePage() {
  const itemListSchema = getPackagesItemListSchema();
  const breadcrumbSchema = getBreadcrumbSchema();

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Hero />
      <SearchBooking />
      <WhyChooseUs />
      <PopularTours />
      <Destinations />
      <Achievements />
      <DealsPromo />
      <Testimonials />
    </>
  );
}
