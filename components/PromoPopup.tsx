"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getWhatsAppLink } from "@/constants/config";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "sga_promo_shown";
const ARM_DELAY_MS = 4000;
const MOBILE_SCROLL_THRESHOLD = 0.6;
const DESKTOP_BREAKPOINT = "(min-width: 1024px)";
const EXCLUDED_ROUTES = ["/contact"];

/**
 * Placeholder offer (10% off) pending client sign-off on real promo terms —
 * see project memory "content-placeholder-status".
 */
export function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const excluded = EXCLUDED_ROUTES.includes(pathname);

  useEffect(() => {
    if (excluded) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    let ticking = false;
    const armTimer = setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);
    const isDesktop = window.matchMedia(DESKTOP_BREAKPOINT).matches;

    const trigger = () => {
      if (!armed) return;
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
      teardown();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget === null) trigger();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable > 0 && window.scrollY / scrollable >= MOBILE_SCROLL_THRESHOLD) trigger();
        ticking = false;
      });
    };

    const teardown = () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };

    if (isDesktop) {
      document.addEventListener("mouseout", onMouseOut);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return teardown;
  }, [excluded]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (excluded) return null;

  const whatsappHref = getWhatsAppLink(
    "Hello, I'd like to claim the 10% off offer and book a rafting trip with Shivalik Ganga Adventure."
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-heading/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-popup-title"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-card-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-light hover:text-heading"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Wait — Before You Go
            </p>
            <h2 id="promo-popup-title" className="mt-3 font-heading text-2xl font-extrabold text-heading">
              Get 10% Off
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-body">
              Book your rafting trip via WhatsApp today and save 10% on your package.
            </p>

            <Button
              href={whatsappHref}
              variant="whatsapp"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 w-full"
              ariaLabel="Claim 10% off via WhatsApp"
            >
              Claim 10% Off
            </Button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted hover:text-heading"
            >
              No thanks
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
