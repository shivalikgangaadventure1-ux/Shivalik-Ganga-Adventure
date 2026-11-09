import { ArrowUpRight, Star } from "lucide-react";
import { COMPANY } from "@/constants/config";
import { TESTIMONIALS } from "@/constants/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

const { rating, count, reviewsUrl } = COMPANY.googleReviews;

export function Testimonials() {
  return (
    <section className="bg-light py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="What Rafters Say" title="Stories from People Who Have Been on the River" />
        <p className="mx-auto -mt-6 mb-8 max-w-2xl text-center text-base leading-relaxed text-body">
          Real reviews, posted by real guests on our Google Business Profile. We haven&apos;t edited a word.
        </p>

        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mb-12 flex w-fit items-center gap-3 rounded-full border border-border bg-white px-5 py-2.5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="font-heading text-lg font-bold text-heading">{rating}</span>
          <span className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="fill-primary text-primary" />
            ))}
          </span>
          <span className="text-sm text-body">
            {count} Google reviews<span className="sr-only"> (opens in a new tab)</span>
          </span>
        </a>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}

          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center">
            <p className="font-heading text-5xl font-bold text-heading">{rating}</p>
            <div className="mt-2 flex gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-3 text-sm text-body">Based on {count} Google reviews</p>
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              See all reviews
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">(opens Google in a new tab)</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
