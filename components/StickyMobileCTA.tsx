"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY, CTA, getCallLink, getWhatsAppLink } from "@/constants/config";

export function StickyMobileCTA() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-black/10 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={getCallLink()}
        aria-label={`Call ${COMPANY.name} now at ${COMPANY.displayPhone}`}
        className="flex min-h-[56px] flex-1 items-center justify-center gap-2 bg-dark font-heading text-sm font-bold uppercase tracking-wide text-white active:bg-dark-deep"
      >
        <Phone size={18} aria-hidden="true" />
        {CTA.callNow}
      </a>
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book your rafting adventure via WhatsApp"
        className="flex min-h-[56px] flex-1 items-center justify-center gap-2 bg-success font-heading text-sm font-bold uppercase tracking-wide text-white active:brightness-110"
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp
      </a>
    </motion.div>
  );
}
