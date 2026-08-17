"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { CTA, getWhatsAppLink } from "@/constants/config";

export function MobileBookingBar() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-black/10 bg-white p-2 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] lg:hidden"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/contact"
        aria-label={`${CTA.bookNow}: book your rafting adventure`}
        className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-primary font-heading text-sm font-bold uppercase tracking-wide text-heading active:bg-primary-dark"
      >
        {CTA.bookNow}
      </Link>
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-success text-white active:brightness-110"
      >
        <MessageCircle size={20} aria-hidden="true" />
      </a>
    </motion.div>
  );
}
