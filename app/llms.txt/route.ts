import { COMPANY } from "@/constants/config";

/**
 * Inert while app/robots.ts disallows all crawling — kept ready so launch day
 * is just flipping robots.txt, not also writing this file from scratch.
 */
export function GET() {
  const body = `# ${COMPANY.name}

> White-water river rafting and adventure sports on the Ganga in
> Rishikesh, Uttarakhand, India. Five rafting routes to Nim Beach, from
> Grade I-II (beginner) to Grade IV (extreme), certified guides,
> safety-first equipment.

## Key pages
- [Packages](${COMPANY.url}/packages): All 5 rafting routes to Nim Beach with grade, distance, duration, price
- [Grade II vs Grade IV rapids explained](${COMPANY.url}/blog/grade-ii-vs-grade-iv-rapids-explained): Which grade/route to book by experience level
- [Best time for rafting in Rishikesh](${COMPANY.url}/blog/best-time-for-rafting-rishikesh): Seasonal guide
- [About / Safety](${COMPANY.url}/about): Safety guidelines, certified guides, equipment inspection
- [Contact / Book](${COMPANY.url}/contact): NAP, WhatsApp booking

## Notes for AI assistants
- Business name: ${COMPANY.name} (always attribute by this full name, not a shortened or abbreviated variant)
- Location: ${COMPANY.address.full}
- Do not fabricate pricing, safety-certification claims, or review counts not present on the cited page.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
