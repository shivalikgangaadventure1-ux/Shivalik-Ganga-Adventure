import Image from "next/image";
import { PACKAGES, type RaftingPackage } from "@/constants/packages";
import { IMAGES } from "@/constants/images";
import { CTA } from "@/constants/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCard } from "@/components/cards/PackageCard";
import { Button } from "@/components/ui/Button";

interface PopularToursProps {
  packages?: RaftingPackage[];
  limit?: number;
  showViewAllLink?: boolean;
}

export function PopularTours({ packages = PACKAGES, limit, showViewAllLink = false }: PopularToursProps) {
  const items = limit ? packages.slice(0, limit) : packages;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
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
          {items.map((pkg, index) => (
            <PackageCard key={pkg.slug} pkg={pkg} index={index} />
          ))}
        </div>
        {showViewAllLink && (
          <div className="mt-12 flex justify-center">
            <Button href="/packages" variant="outline">
              {CTA.viewPackages}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
