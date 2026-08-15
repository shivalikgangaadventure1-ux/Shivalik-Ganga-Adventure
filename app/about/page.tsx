import type { Metadata } from "next";
import { BadgeCheck, LifeBuoy, ShieldCheck, Siren, Users2 } from "lucide-react";
import { COMPANY, CTA, TRUST, getWhatsAppLink } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Achievements } from "@/sections/Achievements";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Shivalik Ganga Adventure runs certified, safety-first white-water rafting trips on the Ganga in Rishikesh. Learn about our crew, our safety standards, and what to expect on the river.",
  path: "/about",
});

const SAFETY_POINTS = [
  {
    icon: ShieldCheck,
    title: "Inspected Gear, Every Trip",
    description: "Life jackets, helmets, and rafts are checked before every departure — no exceptions.",
  },
  {
    icon: Users2,
    title: "Certified Guides on Every Raft",
    description: `A guide certified under the ${TRUST.certifyingBody} leads each raft, briefing your group on paddling commands and river safety before launch.`,
  },
  {
    icon: LifeBuoy,
    title: "Safety Kayak Escort",
    description: "A safety kayak accompanies every rafting group on the river as backup support.",
  },
  {
    icon: Siren,
    title: "First-Aid & Weather Calls",
    description: "First-aid support is on hand at every base point, and routes are adjusted or postponed if river or weather conditions call for it.",
  },
];

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="About Shivalik Ganga Adventure"
        subtitle="Certified guides, safety-first equipment, and unforgettable rapids on the Ganga."
        image={IMAGES.pageHeroes.about}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-heading sm:text-3xl">Our Story</h2>
          <p className="mt-5 text-base leading-relaxed text-body">{COMPANY.description}</p>
          <p className="mt-4 text-base leading-relaxed text-body">
            From a gentle first-timer&apos;s float at Brahmpuri to the full-day Grade IV expedition out
            of Kaudiyala, we run every major rafting stretch on the Ganga near Rishikesh. Every trip
            is led by a trained guide, backed by a safety kayak escort, and built around one rule
            above all: everyone goes home having had the time of their life, safely.
          </p>
        </Container>
      </section>

      <Achievements />

      <section id="safety" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold text-heading sm:text-3xl">
              Safety Guidelines
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-body">
              River rafting is an adventure sport — here&apos;s how we keep every trip as safe as
              possible without taking the thrill out of it.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SAFETY_POINTS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="font-heading text-base font-bold text-heading">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              href={getWhatsAppLink()}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="Book your rafting adventure via WhatsApp"
            >
              {CTA.bookNow}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-light py-16 sm:py-24">
        <Container className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <BadgeCheck size={22} aria-hidden="true" />
          </span>
          <h2 className="font-heading text-2xl font-bold text-heading sm:text-3xl">
            Licensing &amp; Insurance
          </h2>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-body">
            <p>
              Shivalik Ganga Adventure is registered with the {TRUST.registrationAuthority}{" "}
              (registration no. {TRUST.registrationNumber}).
            </p>
            <p>{TRUST.insuranceStatement}</p>
            <p>
              All guides carry current certification under the {TRUST.certifyingBody}, and all
              rafts operate with {TRUST.safetyEquipmentStandard}.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold text-heading sm:text-3xl">
              Find Our Base Point
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-body">{COMPANY.address.full}</p>
          </div>
          <div className="mx-auto mt-8 h-[320px] max-w-4xl overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              src={`https://www.google.com/maps?q=${COMPANY.geo.latitude},${COMPANY.geo.longitude}&z=14&output=embed`}
              title={`${COMPANY.name} location map`}
              loading="lazy"
              className="h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
