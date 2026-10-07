import { TESTIMONIALS } from "@/constants/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

export function Testimonials() {
  return (
    <section className="bg-light py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="What Rafters Say" title="Stories from People Who Have Been on the River" />
        <p className="mx-auto -mt-6 mb-12 max-w-2xl text-center text-base leading-relaxed text-body">
          A rafting trip means something different to everyone. For some people, it&apos;s the excitement of the
          rapids. For others, it&apos;s the scenery, the teamwork or simply trying something new with people they enjoy
          spending time with. That&apos;s why real experiences matter.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
