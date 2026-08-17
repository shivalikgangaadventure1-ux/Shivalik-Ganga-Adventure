import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, CTA, getCallLink, getWhatsAppLink } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Testimonials } from "@/sections/Testimonials";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Book",
  description:
    "Get in touch with Shivalik Ganga Adventure to book your rafting trip in Rishikesh. Call or WhatsApp us directly for the fastest response.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Contact & Book"
        subtitle="Ready for your rafting adventure? Call or WhatsApp us and we'll get you booked in minutes."
        image={IMAGES.pageHeroes.contact}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-heading">Get in Touch</h2>
            <p className="mt-3 text-sm leading-relaxed text-body">
              The fastest way to book is a quick call or WhatsApp message. Tell us your preferred
              date, group size, and package, and we&apos;ll confirm your slot right away.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={getCallLink()} variant="call" className="flex-1" ariaLabel={`${CTA.callNow} to reach ${COMPANY.name}`}>
                {CTA.callNow}
              </Button>
              <Button
                href={getWhatsAppLink()}
                variant="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                ariaLabel={`${CTA.whatsappBooking}: message us on WhatsApp`}
              >
                {CTA.whatsappBooking}
              </Button>
            </div>

            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-body">{COMPANY.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-primary" aria-hidden="true" />
                <a href={getCallLink()} className="text-body hover:text-primary">
                  {COMPANY.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${COMPANY.email}`} className="text-body hover:text-primary">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="shrink-0 text-primary" aria-hidden="true" />
                <span className="text-body">{COMPANY.hours}</span>
              </li>
            </ul>
          </div>

          <div className="h-[320px] overflow-hidden rounded-2xl border border-border shadow-card lg:h-full lg:min-h-[420px]">
            <iframe
              src={COMPANY.mapEmbedUrl}
              title={`${COMPANY.name} location map`}
              loading="lazy"
              allowFullScreen
              className="h-full w-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </Container>
      </section>

      <Testimonials />
    </>
  );
}
