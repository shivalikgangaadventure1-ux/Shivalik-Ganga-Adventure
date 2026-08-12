import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Shivalik Ganga Adventure — Home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/images/logo/logo-shivalik-adv.webp"
        alt="Shivalik Ganga Adventure"
        width={1006}
        height={1024}
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
}
