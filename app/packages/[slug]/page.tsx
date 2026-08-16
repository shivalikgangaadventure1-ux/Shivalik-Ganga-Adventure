import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, Users, X } from "lucide-react";
import { getPackageBySlug, PACKAGES } from "@/constants/packages";
import { getWhatsAppLink, CTA } from "@/constants/config";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getFAQPageSchema, getPackageTouristTripSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};

  return buildMetadata({
    title: `${pkg.name} Rafting`,
    description: pkg.description,
    path: `/packages/${pkg.slug}`,
    image: pkg.image,
  });
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const whatsappHref = getWhatsAppLink(
    `Hello, I'm interested in booking the "${pkg.name}" rafting package with Shivalik Ganga Adventure.`
  );
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: pkg.name, path: `/packages/${pkg.slug}` },
  ]);
  const faqSchema = pkg.faqs.length > 0 ? getFAQPageSchema(pkg.faqs) : null;
  const touristTripSchema = getPackageTouristTripSchema(pkg);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <PageHero
        title={pkg.name}
        subtitle={`${pkg.distanceKm} KM · ${pkg.duration} · ${pkg.grade}`}
        image={pkg.image}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
          { name: pkg.name, path: `/packages/${pkg.slug}` },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed text-body">{pkg.longDescription}</p>
            <p className="mt-4 text-base leading-relaxed text-body">
              The {pkg.name} route currently costs{" "}
              <strong className="text-heading">
                ₹{pkg.salePrice ?? pkg.price} per person
              </strong>
              {pkg.salePrice && (
                <>
                  {" "}
                  (down from ₹{pkg.price})
                </>
              )}
              , covering {pkg.duration.toLowerCase()} on the water over {pkg.distanceKm} km of{" "}
              {pkg.grade} rapids.
            </p>

            <h2 className="mt-10 font-heading text-2xl font-bold text-heading">Itinerary</h2>
            <ol className="mt-6 space-y-6 border-l-2 border-border pl-6">
              {pkg.itinerary.map((step) => (
                <li key={step.time} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
                    {step.time}
                  </p>
                  <p className="mt-1 text-sm text-body">{step.activity}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-heading text-lg font-bold text-heading">Inclusions</h3>
                <ul className="mt-4 space-y-2">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-body">
                      <Check size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-heading">Exclusions</h3>
                <ul className="mt-4 space-y-2">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-body">
                      <X size={16} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {pkg.faqs.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-6 font-heading text-2xl font-bold text-heading">
                  Frequently Asked Questions
                </h2>
                <Accordion items={pkg.faqs} />
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-card lg:sticky lg:top-28">
            <div className="flex items-baseline gap-2">
              {pkg.salePrice ? (
                <>
                  <span className="font-heading text-3xl font-extrabold text-heading">
                    ₹{pkg.salePrice}
                  </span>
                  <span className="text-sm text-muted line-through">₹{pkg.price}</span>
                </>
              ) : (
                <span className="font-heading text-3xl font-extrabold text-heading">₹{pkg.price}</span>
              )}
              <span className="text-sm text-muted">/ person</span>
            </div>

            <ul className="mt-5 space-y-3 text-sm text-body">
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-primary" aria-hidden="true" />
                {pkg.duration} · {pkg.distanceKm} KM · {pkg.grade}
              </li>
              {pkg.groupSize && (
                <li className="flex items-center gap-2">
                  <Users size={16} className="text-primary" aria-hidden="true" />
                  Group size: {pkg.groupSize}
                </li>
              )}
              {pkg.minAge && <li className="text-xs text-muted">Minimum age: {pkg.minAge}+ years</li>}
            </ul>

            <Button
              href={whatsappHref}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full"
              ariaLabel={`Book ${pkg.name} on WhatsApp`}
            >
              {CTA.whatsappBooking}
            </Button>
          </aside>
        </Container>
      </section>
    </>
  );
}
