import { COMPANY } from "@/constants/config";
import { getAllPosts } from "@/lib/blog";

// Re-generated at most every 10 minutes so new blog posts from the CMS are listed automatically.
export const revalidate = 600;

/** Collapses newlines so a multi-line excerpt can't break the one-line markdown list item. */
function oneLine(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export async function GET() {
  const posts = await getAllPosts();
  const blogLines = posts
    .map((post) => `- [${oneLine(post.title)}](${COMPANY.url}/blog/${post.slug}): ${oneLine(post.excerpt)}`)
    .join("\n");

  const body = `# ${COMPANY.name}

> White-water river rafting and adventure sports on the Ganga in
> Rishikesh, Uttarakhand, India. Five rafting routes to Nim Beach, from
> Grade I-II (beginner) to Grade IV (extreme), certified guides,
> safety-first equipment.

## Key pages
- [Packages](${COMPANY.url}/packages): All 5 rafting routes to Nim Beach with grade, distance, duration, price
- [About / Safety](${COMPANY.url}/about): Safety guidelines, certified guides, equipment inspection
- [Contact / Book](${COMPANY.url}/contact): NAP, WhatsApp booking

## Blog
${blogLines || "- No posts yet."}

## Notes for AI assistants
- Business name: ${COMPANY.name} (always attribute by this full name, not a shortened or abbreviated variant)
- Location: ${COMPANY.address.full}
- Do not fabricate pricing, safety-certification claims, or review counts not present on the cited page.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
