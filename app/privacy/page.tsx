import type { Metadata } from "next";
import { COMPANY } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${COMPANY.name} — how we handle information shared when you contact or book with us.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        title="Privacy Policy"
        image={IMAGES.pageHeroes.about}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container className="prose prose-sm mx-auto max-w-3xl prose-headings:font-heading prose-headings:text-heading prose-a:text-primary sm:prose-base">
          <p>Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

          <h2>Information We Collect</h2>
          <p>
            When you contact us by phone, WhatsApp, or email to enquire about or book a rafting
            trip, we collect the information you choose to share — typically your name, phone
            number, preferred dates, and group size — solely to respond to your enquiry and
            arrange your booking.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information you provide to confirm bookings, communicate trip details, and
            respond to questions. We do not sell or rent your personal information to third
            parties.
          </p>

          <h2>WhatsApp & Third-Party Communication</h2>
          <p>
            Messages sent via WhatsApp are subject to WhatsApp&apos;s own privacy policy in
            addition to this one. We use WhatsApp only as a communication channel for bookings and
            enquiries.
          </p>

          <h2>Cookies & Analytics</h2>
          <p>
            This website may use basic, privacy-respecting analytics to understand how visitors
            use the site, in order to improve it. This data is aggregated and not used to
            personally identify you.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or how your information is handled,
            contact us at{" "}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or {COMPANY.displayPhone}.
          </p>
        </Container>
      </section>
    </>
  );
}
