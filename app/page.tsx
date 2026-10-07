import { PACKAGES } from "@/constants/packages";
import { HOME_FAQS } from "@/constants/homeContent";
import { getBreadcrumbSchema, getFAQPageSchema, getPackagesItemListSchema } from "@/lib/schema";
import { Hero } from "@/sections/Hero";
import {
  ExperienceStory,
  HomeFAQ,
  PlanYourTrip,
  RaftingIntro,
  RiverSafety,
  RoutesGuide,
} from "@/sections/HomeContent";
import { SearchBooking } from "@/sections/SearchBooking";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Destinations } from "@/sections/Destinations";
import { Achievements } from "@/sections/Achievements";
import { WeatherWidget } from "@/components/WeatherWidget";
import { DealsPromo } from "@/sections/DealsPromo";
import { Testimonials } from "@/sections/Testimonials";

export default function HomePage() {
  // <RoutesGuide> renders all 5 packages on this page, so the schema lists all 5.
  const itemListSchema = getPackagesItemListSchema(PACKAGES);
  const faqSchema = getFAQPageSchema(HOME_FAQS);
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

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Hero />
      <SearchBooking />
      <RaftingIntro />
      <WhyChooseUs />
      <RoutesGuide />
      <ExperienceStory />
      <Destinations limit={6} showViewAllLink />
      <Achievements />
      <RiverSafety />
      <WeatherWidget />
      <DealsPromo />
      <PlanYourTrip />
      <Testimonials />
      <HomeFAQ />
    </>
  );
}
