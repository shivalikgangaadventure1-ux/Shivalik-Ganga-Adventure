import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export interface Breadcrumb {
  name: string;
  path: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumbs: Breadcrumb[];
}

/**
 * Lightweight banner for interior pages — avoids reusing the homepage's
 * heavy parallax Hero (framer-motion + full-viewport height) on every route.
 * `image` is optional: blog posts skip it here since the same cover photo is
 * already shown, clearly, in the article body right below.
 */
export function PageHero({ title, subtitle, image, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative flex h-[45vh] min-h-[320px] items-end overflow-hidden bg-heading pt-24">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-heading/90 via-heading/60 to-heading/40" />

      <Container className="relative pb-10">
        <nav aria-label="Breadcrumb">
          <ol className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/75">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-primary" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-white">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="font-heading text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">{subtitle}</p>}
      </Container>
    </section>
  );
}
