"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { CTA, getWhatsAppLink } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function DealsPromo() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Image
        src={IMAGES.achievementsBg}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" aria-hidden="true" />
      <div className="absolute inset-0 bg-heading/40" aria-hidden="true" />

      <Container className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="font-heading text-2xl font-extrabold uppercase leading-snug text-white sm:text-3xl">
            Monsoon Special: Book This Season for{" "}
            <span className="text-primary">Flat 20% Off</span> Group Bookings
          </h2>
          <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-primary" aria-hidden="true" />
          <p className="mt-5 text-base text-white/90">
            We cap the number of rafts we run each day to keep every group properly supervised, so
            message us on WhatsApp to check availability for your dates.
          </p>
          <div className="mt-8">
            <Button
              href={getWhatsAppLink(
                "Hello, I'd like to grab the monsoon special discount for a group rafting booking with Shivalik Ganga Adventure."
              )}
              variant="white"
              size="lg"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel={`${CTA.reserveYourRaft}: claim the monsoon special offer via WhatsApp`}
            >
              {CTA.reserveYourRaft}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
