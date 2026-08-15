import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

const LOGO_VARIANTS = {
  // Full-color lockup, for white/light backgrounds (scrolled header, mobile nav drawer).
  color: { src: IMAGES.logo, width: 1000, height: 206 },
  // Light-colored artwork, for dark or photo backgrounds (transparent header over the hero, footer).
  light: { src: IMAGES.logoLight, width: 1000, height: 207 },
} as const;

interface LogoProps {
  className?: string;
  variant?: keyof typeof LOGO_VARIANTS;
}

export function Logo({ className, variant = "color" }: LogoProps) {
  const { src, width, height } = LOGO_VARIANTS[variant];

  return (
    <Link
      href="/"
      aria-label="Shivalik Ganga Adventure, Home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={src}
        alt="Shivalik Ganga Adventure"
        width={width}
        height={height}
        priority
        sizes="(min-width: 640px) 210px, 175px"
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
