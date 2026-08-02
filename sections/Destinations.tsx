import { DESTINATIONS } from "@/constants/destinations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationCard } from "@/components/cards/DestinationCard";

export function Destinations() {
  return (
    <section id="destinations" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Find a Route by" title="Rafting Destination" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {DESTINATIONS.map((spot, index) => (
            <DestinationCard key={spot.name + index} spot={spot} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
