import Image from "next/image";
import { PACKAGES } from "@/constants/packages";
import { IMAGES } from "@/constants/images";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCard } from "@/components/cards/PackageCard";

export function PopularTours() {
  return (
    <section id="packages" className="relative overflow-hidden py-20 sm:py-28">
      <Image
        src={IMAGES.bgPopular}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-heading/85" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Take a Look at Our"
          title="Most Popular Rafting Packages"
          light
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg, index) => (
            <PackageCard key={pkg.slug} pkg={pkg} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
