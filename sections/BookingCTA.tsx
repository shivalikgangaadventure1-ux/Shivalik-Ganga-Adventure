"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { CTA, getCallLink, getWhatsAppLink } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function BookingCTA() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src={IMAGES.bgNewsletter}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-heading/80" aria-hidden="true" />

      <Container className="relative py-16 text-center sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Ready When You Are
          </p>
          <h2 className="font-heading text-2xl font-extrabold uppercase text-white sm:text-3xl">
            Book Your Rafting Adventure Today
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/80">
            Chat with us on WhatsApp or give us a call, and we&apos;ll help you pick the right package
            and confirm your slot in minutes.
          </p>

          <div className="mx-auto mt-8 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={getWhatsAppLink()}
              variant="whatsapp"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              ariaLabel="Book your rafting adventure via WhatsApp"
            >
              {CTA.whatsappBooking}
            </Button>
            <Button
              href={getCallLink()}
              variant="outline"
              icon={Phone}
              className="w-full sm:w-auto"
              ariaLabel="Call to book your rafting adventure"
            >
              {CTA.callNow}
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
