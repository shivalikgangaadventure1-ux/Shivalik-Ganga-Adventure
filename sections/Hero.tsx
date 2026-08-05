"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { COMPANY, CTA, getWhatsAppLink } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[130%]">
        <Image
          src={IMAGES.heroPoster}
          alt="Rafters paddling through white-water rapids on the Ganga in Rishikesh"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-heading/70 via-heading/50 to-heading/80" />
      </motion.div>

      <Container className="relative pb-32 pt-16 text-center sm:pb-40">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {COMPANY.tagline}
          </p>
          <h1 className="mx-auto max-w-4xl font-heading text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Rafting Adventure Today
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Ride the white-water rapids of the Ganga with certified guides, top-grade safety
            gear, and unforgettable views of the Himalayan foothills.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={getWhatsAppLink()}
              variant="primary"
              size="lg"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="Book your adventure via WhatsApp"
            >
              {CTA.bookYourAdventure}
            </Button>
            <Button href="/packages" variant="outline" size="lg" ariaLabel="View rafting packages">
              {CTA.viewPackages}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
