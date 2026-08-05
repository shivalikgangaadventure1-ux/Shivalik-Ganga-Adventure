import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, getCallLink } from "@/constants/config";
import { NAV_ITEMS } from "@/constants/nav";
import { IMAGES } from "@/constants/images";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { Newsletter } from "@/sections/Newsletter";

const SOCIAL_LINKS = [
  { label: "Facebook", href: COMPANY.social.facebook, icon: Facebook },
  { label: "Instagram", href: COMPANY.social.instagram, icon: Instagram },
  { label: "YouTube", href: COMPANY.social.youtube, icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white/80">
      <Newsletter />

      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed">{COMPANY.description}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{COMPANY.address.full}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-primary" aria-hidden="true" />
              <a href={getCallLink()} className="hover:text-primary">
                {COMPANY.displayPhone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-primary" aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-primary">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
            Information
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/about" className="transition-colors hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/about#safety" className="transition-colors hover:text-primary">
                Safety Guidelines
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-primary">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
            Follow Us
          </h3>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {IMAGES.gallery.slice(0, 6).map((src, i) => (
              <div key={src + i} className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={src}
                  alt="Shivalik Ganga Adventure rafting moment"
                  fill
                  loading="lazy"
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-primary">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
