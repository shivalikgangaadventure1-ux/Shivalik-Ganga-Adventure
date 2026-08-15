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
        src="/images/logo/logo-shivalik-adv-256.png"
        alt="Shivalik Ganga Adventure"
        width={256}
        height={261}
        priority
        sizes="64px"
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
}
