import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

// The logo is a square badge with its own dark background, so one version works on both the
// transparent (over hero) and white (scrolled) header as well as the dark footer.
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Shivalik Ganga Adventure, Home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={IMAGES.logo}
        alt="Shivalik Ganga Adventure"
        width={400}
        height={400}
        priority
        sizes="96px"
        className="h-14 w-auto rounded-xl sm:h-16"
      />
    </Link>
  );
}
