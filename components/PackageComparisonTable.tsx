import Link from "next/link";
import type { RaftingPackage } from "@/constants/packages";

const BEST_FOR: Record<string, string> = {
  "brahmpuri-to-rishikesh": "First-timers, families, children (8+)",
  "shivpuri-to-rishikesh": "Signature run, fit first-timers",
  "marine-drive-to-rishikesh": "Rapids + optional cliff jumping",
  "kaudiyala-to-rishikesh": "Experienced or confident rafters",
  "camping-rafting-combo": "Groups, overnight trips",
  "kaudiyala-to-shivpuri-extreme": "Experienced, fit thrill-seekers",
};

/**
 * A real <table>, not another card grid — card/grid repeats are commonly
 * heuristically dropped as boilerplate by text-extraction pipelines after the
 * first instance, which left 5 of 6 packages' facts invisible to AI-search
 * text extraction. A table survives that extraction reliably.
 */
export function PackageComparisonTable({ packages }: { packages: RaftingPackage[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Comparison of all rafting packages — distance, duration, grade, price, and who each
          route suits best
        </caption>
        <thead>
          <tr className="bg-light text-xs font-bold uppercase tracking-wide text-heading">
            <th scope="col" className="px-5 py-4">
              Package
            </th>
            <th scope="col" className="px-5 py-4">
              Distance
            </th>
            <th scope="col" className="px-5 py-4">
              Duration
            </th>
            <th scope="col" className="px-5 py-4">
              Grade
            </th>
            <th scope="col" className="px-5 py-4">
              Price
            </th>
            <th scope="col" className="px-5 py-4">
              Best For
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {packages.map((pkg) => (
            <tr key={pkg.slug}>
              <th scope="row" className="px-5 py-4 font-heading font-bold text-heading">
                <Link href={`/packages/${pkg.slug}`} className="hover:text-primary">
                  {pkg.name}
                </Link>
              </th>
              <td className="px-5 py-4 text-body">{pkg.distanceKm} km</td>
              <td className="px-5 py-4 text-body">{pkg.duration}</td>
              <td className="px-5 py-4 text-body">{pkg.grade}</td>
              <td className="px-5 py-4 text-body">
                {pkg.salePrice ? (
                  <>
                    <span className="font-semibold text-heading">₹{pkg.salePrice}</span>{" "}
                    <span className="text-muted line-through">₹{pkg.price}</span>
                  </>
                ) : (
                  <span className="font-semibold text-heading">₹{pkg.price}</span>
                )}
              </td>
              <td className="px-5 py-4 text-body">{BEST_FOR[pkg.slug] ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
