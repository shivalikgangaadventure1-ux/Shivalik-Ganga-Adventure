"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { COMPANY, CTA, getCallLink, getWhatsAppLink } from "@/constants/config";
import { NAV_ITEMS } from "@/constants/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const header = (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "hidden border-b border-white/15 text-xs text-white/90 transition-all duration-300 lg:block",
          scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-10 opacity-100"
        )}
      >
        <Container className="flex items-center justify-between py-2">
          <span className="inline-flex items-center gap-2">
            <Clock size={14} aria-hidden="true" /> {COMPANY.hours}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={14} aria-hidden="true" /> {COMPANY.displayPhone}
          </span>
        </Container>
      </div>

      <nav aria-label="Primary" className="py-3">
        <Container className="flex items-center justify-between gap-4">
          <Logo variant={scrolled ? "color" : "light"} />

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-heading text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary",
                    isActive(item.href) ? "text-primary" : scrolled ? "text-heading" : "text-white"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href={getCallLink()}
              variant={scrolled ? "call" : "outline"}
              size="sm"
              icon={Phone}
              ariaLabel={`${CTA.callNow} to reach ${COMPANY.name}`}
            >
              {CTA.callNow}
            </Button>
            <Button
              href={getWhatsAppLink()}
              variant="whatsapp"
              size="sm"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel={`${CTA.whatsappBooking}: message us on WhatsApp`}
            >
              {CTA.whatsappBooking}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
              scrolled ? "text-heading" : "text-white"
            )}
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </Container>
      </nav>
    </header>
  );

  // Portaled to document.body so the drawer's paint/stacking is fully
  // decoupled from the header's own backdrop-blur — rendering it inline
  // inside <header> caused page content behind it to bleed through once
  // scrolled (Chromium compositing ambiguity between a backdrop-filter
  // element and its position:fixed descendants).
  const drawer = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-heading/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-[100] flex w-[85%] max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-heading hover:bg-light"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-3 font-heading text-base font-semibold uppercase tracking-wide hover:bg-light hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-heading"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Button
                href={getCallLink()}
                variant="call"
                icon={Phone}
                className="w-full"
                ariaLabel={`${CTA.callNow} to reach ${COMPANY.name}`}
              >
                {CTA.callNow}
              </Button>
              <Button
                href={getWhatsAppLink()}
                variant="whatsapp"
                icon={MessageCircle}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                ariaLabel={`${CTA.whatsappBooking}: message us on WhatsApp`}
              >
                {CTA.whatsappBooking}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {header}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
