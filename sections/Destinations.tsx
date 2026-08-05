import { DESTINATIONS, type RaftingSpot } from "@/constants/destinations";
import { CTA } from "@/constants/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Button } from "@/components/ui/Button";

interface DestinationsProps {
  destinations?: RaftingSpot[];
  limit?: number;
  showViewAllLink?: boolean;
}

export function Destinations({ destinations = DESTINATIONS, limit, showViewAllLink = false }: DestinationsProps) {
  const items = limit ? destinations.slice(0, limit) : destinations;

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Find a Route by" title="Rafting Destination" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((spot, index) => (
            <DestinationCard key={spot.slug} spot={spot} index={index} />
          ))}
        </div>
        {showViewAllLink && (
          <div className="mt-12 flex justify-center">
            <Button href="/destinations" variant="ghost" className="border-2 border-border">
              {CTA.viewMore}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
