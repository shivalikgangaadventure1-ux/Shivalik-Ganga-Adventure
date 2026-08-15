"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Star } from "lucide-react";
import type { RaftingPackage } from "@/constants/packages";
import { getWhatsAppLink } from "@/constants/config";
import { cn } from "@/lib/utils";

export function PackageCard({ pkg, index = 0 }: { pkg: RaftingPackage; index?: number }) {
  const whatsappHref = getWhatsAppLink(
    `Hello, I'm interested in booking the "${pkg.name}" rafting package with Shivalik Ganga Adventure.`
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <Link href={`/packages/${pkg.slug}`} className="relative aspect-[430/305] w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={`${pkg.name} river rafting package on the Ganga`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          {pkg.salePrice ? (
            <>
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-heading line-through">
                ₹{pkg.price}
              </span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-heading">
                ₹{pkg.salePrice}
              </span>
            </>
          ) : (
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-heading">
              ₹{pkg.price}
            </span>
          )}
        </div>

        {pkg.salePrice && (
          <span className="absolute right-3 top-3 rounded-full bg-dark px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-primary">
            Save {Math.round((1 - pkg.salePrice / pkg.price) * 100)}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
          <MapPin size={14} aria-hidden="true" />
          <span>
            {pkg.distanceKm} KM &middot; {pkg.duration} &middot; {pkg.grade}
          </span>
        </div>

        <Link href={`/packages/${pkg.slug}`}>
          <h3 className="font-heading text-lg font-bold text-heading transition-colors hover:text-primary-dark">
            {pkg.name}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{pkg.description}</p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-0.5" aria-label={`Rated ${pkg.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  i < pkg.rating ? "fill-primary text-primary" : "fill-border text-border"
                )}
                aria-hidden="true"
              />
            ))}
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book ${pkg.name} on WhatsApp`}
            className="-my-3 inline-flex min-h-[48px] items-center gap-1.5 px-1 py-3 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:text-primary-dark"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Book Now
          </a>
        </div>
      </div>
    </motion.article>
  );
}
