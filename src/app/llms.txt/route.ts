import { careersFaq, companyFaq, services } from "@/lib/content";
import { employmentLabel, jobs } from "@/lib/jobs";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * /llms.txt — a plain-markdown summary of the site for AI assistants and
 * answer engines (AEO). See https://llmstxt.org
 */
export function GET() {
  const body = `# ${site.legalName}

> ${site.description}

## Key facts
- Legal name: ${site.legalName}
- Type: AI-focused software development agency
- What we do: build AI-powered web services and online products; recruit software engineers for partner technology companies
- Contact email: ${site.contact.email}
- Careers email: ${site.contact.careersEmail}
- Phone: ${site.contact.phone}
- Website: ${site.url}

## Pages
- [Home](${site.url}/): overview of PeachTech
- [Services](${site.url}/services): AI and software development services
- [Products](${site.url}/products): PeachTech's online products, with links to each product site
- [Careers](${site.url}/careers): open software engineering jobs and the online application form
- [About](${site.url}/about): company story, values and partnerships
- [Contact](${site.url}/contact): email and phone

## Open jobs (apply at ${site.url}/careers#apply)
${jobs
  .map(
    (j) =>
      `- [${j.title}](${site.url}/careers/${j.slug}): ${j.location}, ${employmentLabel[j.employmentType]}. ${j.summary} Skills: ${j.skills.join(", ")}.`,
  )
  .join("\n")}

## Services
${services.map((s) => `- ${s.title}: ${s.body}`).join("\n")}

## Products
${products.map((p) => `- [${p.name}](${p.url}) (${p.category}, ${p.status}): ${p.summary}`).join("\n")}

## FAQ
${[...companyFaq, ...careersFaq].map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
