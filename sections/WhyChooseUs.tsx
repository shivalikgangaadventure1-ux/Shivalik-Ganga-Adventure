import { FEATURES } from "@/constants/features";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/cards/FeatureCard";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="The Shivalik Ganga Difference" title="Why Choose Us?" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
