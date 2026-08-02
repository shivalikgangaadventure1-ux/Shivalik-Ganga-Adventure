"use client";

import { motion } from "framer-motion";
import { CalendarDays, Search, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PACKAGES } from "@/constants/packages";
import { getWhatsAppLink } from "@/constants/config";
import { Container } from "@/components/ui/Container";

export function SearchBooking() {
  const [packageSlug, setPackageSlug] = useState(PACKAGES[0].slug);
  const [groupSize, setGroupSize] = useState("2");
  const [date, setDate] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pkg = PACKAGES.find((p) => p.slug === packageSlug);
    const dateText = date ? ` on ${date}` : "";
    const message = `Hello, I'd like to book the "${pkg?.name}" rafting package for a group of ${groupSize}${dateText}. Please share availability.`;
    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="relative z-20 -mt-24 sm:-mt-28">
      <Container>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-label="Search and book a rafting package"
          className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-end"
        >
          <div>
            <label
              htmlFor="package"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Rafting Package
            </label>
            <select
              id="package"
              name="package"
              value={packageSlug}
              onChange={(e) => setPackageSlug(e.target.value)}
              className="h-12 w-full rounded-lg border border-border bg-light px-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {PACKAGES.map((pkg) => (
                <option key={pkg.slug} value={pkg.slug}>
                  {pkg.name} &middot; {pkg.distanceKm} KM
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="group-size"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted"
            >
              <Users size={13} className="mr-1 inline" aria-hidden="true" />
              Group Size
            </label>
            <select
              id="group-size"
              name="group-size"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              className="h-12 w-full rounded-lg border border-border bg-light px-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {["1", "2", "3-5", "6-10", "10+"].map((size) => (
                <option key={size} value={size}>
                  {size} {size === "1" ? "Person" : "People"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted"
            >
              <CalendarDays size={13} className="mr-1 inline" aria-hidden="true" />
              Preferred Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 w-full rounded-lg border border-border bg-light px-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-12 min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-6 font-heading text-sm font-bold uppercase tracking-wide text-heading transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Search size={18} aria-hidden="true" />
            Search
          </button>
        </motion.form>
      </Container>
    </div>
  );
}
