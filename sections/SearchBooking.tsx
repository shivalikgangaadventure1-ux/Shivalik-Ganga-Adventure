"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, Search, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { PACKAGES } from "@/constants/packages";
import { getWhatsAppLink } from "@/constants/config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function Field({
  htmlFor,
  icon: Icon,
  label,
  children,
}: {
  htmlFor: string;
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Icon size={14} aria-hidden="true" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
      </label>
      {children}
    </div>
  );
}

const fieldClasses =
  "h-12 w-full rounded-xl border border-border bg-light px-4 text-sm text-heading transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40";

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
    <div className="relative z-20 -mt-20 mb-6 sm:-mt-24 sm:mb-10">
      <Container>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-label="Search and book a rafting package"
          className="rounded-2xl bg-white p-6 shadow-card sm:p-8"
        >
          <p className="mb-6 font-heading text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Plan Your Adventure
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-end lg:gap-4">
            <Field htmlFor="package" icon={Search} label="Rafting Package">
              <div className="relative">
                <select
                  id="package"
                  name="package"
                  value={packageSlug}
                  onChange={(e) => setPackageSlug(e.target.value)}
                  className={cn(fieldClasses, "appearance-none pr-10")}
                >
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.slug} value={pkg.slug}>
                      {pkg.name} &middot; {pkg.distanceKm} KM
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
              </div>
            </Field>

            <Field htmlFor="group-size" icon={Users} label="Group Size">
              <div className="relative">
                <select
                  id="group-size"
                  name="group-size"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className={cn(fieldClasses, "appearance-none pr-10")}
                >
                  {["1", "2", "3-5", "6-10", "10+"].map((size) => (
                    <option key={size} value={size}>
                      {size} {size === "1" ? "Person" : "People"}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
              </div>
            </Field>

            <Field htmlFor="date" icon={CalendarDays} label="Preferred Date">
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={fieldClasses}
              />
            </Field>

            <Button type="submit" variant="primary" icon={Search} className="w-full lg:w-auto">
              Search
            </Button>
          </div>
        </motion.form>
      </Container>
    </div>
  );
}
