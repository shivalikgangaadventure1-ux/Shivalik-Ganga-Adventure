import type { Metadata } from "next";
import { COMPANY } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${COMPANY.name}'s website and rafting bookings.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        image={IMAGES.pageHeroes.about}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container className="prose prose-sm mx-auto max-w-3xl prose-headings:font-heading prose-headings:text-heading prose-a:text-primary sm:prose-base">
          <p>Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

          <h2>Bookings</h2>
          <p>
            Bookings made via phone or WhatsApp are confirmed once we acknowledge your requested
            date, package, and group size. Prices listed on this website are per person and
            subject to change until a booking is confirmed.
          </p>

          <h2>Participation & Safety</h2>
          <p>
            River rafting is an adventure sport that carries inherent risk. All participants must
            follow the safety briefing and instructions given by our guides at all times. Minimum
            age and fitness guidance listed against each package should be followed; let us know
            in advance about any medical conditions that may affect your participation.
          </p>

          <h2>Cancellations & Rescheduling</h2>
          <p>
            Trips may be rescheduled or cancelled by us due to unsafe river or weather conditions,
            in which case we will offer an alternative date. For cancellations initiated by you,
            get in touch with us as early as possible and we&apos;ll do our best to accommodate a
            reschedule.
          </p>

          <h2>Website Use</h2>
          <p>
            Content on this website is for general information about our packages and services.
            While we try to keep package details and pricing accurate, please confirm final
            details directly with us before your trip.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or {COMPANY.displayPhone}.
          </p>
        </Container>
      </section>
    </>
  );
}
