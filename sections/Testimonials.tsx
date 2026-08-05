import { TESTIMONIALS } from "@/constants/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

export function Testimonials() {
  return (
    <section className="bg-light py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="What Rafters Say" title="Trip Reviews" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
