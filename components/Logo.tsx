import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Temporary text-based logo. Replace with an <Image> pointing at an SVG
 * logo file once brand assets are ready — the markup shape (two-line
 * lockup) can stay the same for layout compatibility.
 */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Shivalik Ganga Adventure — Home"
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-heading text-2xl font-bold tracking-wide sm:text-3xl",
          light ? "text-white" : "text-heading"
        )}
      >
        Shivalik
      </span>
      <span
        className={cn(
          "font-heading text-[0.65rem] font-semibold uppercase tracking-[0.35em] sm:text-xs",
          "text-primary"
        )}
      >
        Ganga Adventure
      </span>
    </Link>
  );
}
