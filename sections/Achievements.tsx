"use client";

import Image from "next/image";
import { Map, MessageCircle, ShieldCheck, Trophy, Users } from "lucide-react";
import { ACHIEVEMENTS } from "@/constants/features";
import { CTA, getWhatsAppLink } from "@/constants/config";
import { IMAGES } from "@/constants/images";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";

const ICONS = [Users, Map, Trophy, ShieldCheck];

export function Achievements() {
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
      <div className="absolute inset-0 bg-dark/85" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Numbers That Speak for Themselves"
          title="Our Achievements"
          light
        />
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {ACHIEVEMENTS.map((item, index) => (
            <Counter key={item.label} icon={ICONS[index]} value={item.number} label={item.label} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            href={getWhatsAppLink()}
            variant="primary"
            size="lg"
            icon={MessageCircle}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Book your rafting adventure via WhatsApp"
          >
            {CTA.bookNow}
          </Button>
        </div>
      </Container>
    </section>
  );
}
