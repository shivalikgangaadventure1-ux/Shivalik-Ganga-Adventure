import { PACKAGES } from "@/constants/packages";
import { getBreadcrumbSchema, getPackagesItemListSchema } from "@/lib/schema";
import { Hero } from "@/sections/Hero";
import { SearchBooking } from "@/sections/SearchBooking";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { PopularTours } from "@/sections/PopularTours";
import { Destinations } from "@/sections/Destinations";
import { Achievements } from "@/sections/Achievements";
import { WeatherWidget } from "@/components/WeatherWidget";
import { DealsPromo } from "@/sections/DealsPromo";
import { Testimonials } from "@/sections/Testimonials";

export default function HomePage() {
  // Scoped to 3 items to match what <PopularTours limit={3}> actually renders on
  // this page — the full 6-package list lives on /packages, which renders all 6.
  const itemListSchema = getPackagesItemListSchema(PACKAGES.slice(0, 3));
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Home", path: "/" }]);

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
      <PopularTours limit={3} showViewAllLink />
      <Destinations limit={6} showViewAllLink />
      <Achievements />
      <WeatherWidget />
      <DealsPromo />
      <Testimonials />
    </>
  );
}
