"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { IMAGES } from "@/constants/images";
import { Container } from "@/components/ui/Container";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

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
            To receive our best monsoon deals
          </p>
          <h2 className="font-heading text-2xl font-extrabold uppercase text-white sm:text-3xl">
            Join the Newsletter
          </h2>

          {status === "submitted" ? (
            <p
              role="status"
              className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 text-sm font-semibold text-primary"
            >
              <CheckCircle2 size={20} aria-hidden="true" />
              Thanks! You&apos;re on the list for our best rafting deals.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Email Address"
                className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                className="inline-flex h-12 min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-6 font-heading text-sm font-bold uppercase tracking-wide text-heading transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Send size={16} aria-hidden="true" />
                Sign Up
              </button>
            </form>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
