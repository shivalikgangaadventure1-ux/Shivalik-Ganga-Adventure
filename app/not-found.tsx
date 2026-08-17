import type { Metadata } from "next";
import { CTA, getWhatsAppLink } from "@/constants/config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container className="mx-auto max-w-xl text-center">
        <p className="font-heading text-6xl font-extrabold text-primary sm:text-7xl">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-heading sm:text-3xl">
          This page has drifted off course
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-body sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Head back to the
          homepage, browse our rafting packages, or message us directly if you can&apos;t find
          what you need.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/packages" variant="ghost" className="border-2 border-border">
            {CTA.viewPackages}
          </Button>
          <Button
            href={getWhatsAppLink()}
            variant="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel={`${CTA.whatsappBooking}: message us on WhatsApp`}
          >
            {CTA.whatsappBooking}
          </Button>
        </div>
      </Container>
    </section>
  );
}
