import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { ParallaxImage, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ButtonLink, Container, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { process, services, techStack } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — AI & Software Development",
  description:
    "AI product development, LLM and agent engineering, full-stack web services, data & analytics, cloud & MLOps, and engineering talent partnerships from PeachTech LLC.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const details = [
  {
    title: "AI & LLM engineering",
    image: "/images/ai-blocks.webp",
    alt: "Illustration of AI input and output blocks",
    body: "Assistants, copilots, retrieval-augmented generation and multi-step agents, with evaluation, guardrails and monitoring built in.",
    points: ["RAG over your documents and data", "Agents with tool use and workflows", "Model selection, cost and latency tuning"],
  },
  {
    title: "Web services & SaaS",
    image: "/images/multi-monitor.webp",
    alt: "Developer working across multiple monitors",
    body: "Modern full-stack applications, APIs and integrations that are fast, accessible and easy to maintain.",
    points: ["Next.js, React and Node.js", "Python and Go backends", "Payments, auth and integrations"],
  },
  {
    title: "Cloud, data & MLOps",
    image: "/images/cloud-engineer.webp",
    alt: "Engineer holding a laptop in a data center",
    body: "Infrastructure that scales with you: data pipelines, model serving, observability and cost control on AWS and GCP.",
    points: ["Infrastructure as code", "Data pipelines and warehouses", "Model serving and monitoring"],
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.body,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: "Worldwide",
      },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Services"
        title={
          <>
            AI expertise, <span className="text-gradient italic">engineering discipline.</span>
          </>
        }
        intro="We help companies design, build and operate AI-powered software, and we supply the engineers to keep it moving."
      />

      <section className="pb-12">
        <Container className="space-y-24">
          {details.map((d, i) => (
            <div key={d.title} className="grid items-center gap-12 lg:grid-cols-2">
              <ParallaxImage src={d.image} alt={d.alt} className={`aspect-[4/3] rounded-[32px] ${i % 2 ? "lg:order-2" : ""}`} />
              <div>
                <SectionHeading eyebrow={`0${i + 1}`} title={d.title} intro={d.body} />
                <Stagger className="mt-6 space-y-3">
                  {d.points.map((p) => (
                    <StaggerItem key={p} className="flex items-center gap-3 text-ink-soft">
                      <Icon name="check" width={18} height={18} className="text-peach-600" /> {p}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Everything we offer" title="Services at a glance" align="center" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <article className="h-full rounded-[28px] border border-peach-200/80 bg-cream-50/70 p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-peach-200/70 text-peach-700">
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{s.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How we work" title="A clear, collaborative process." />
            <Reveal delay={0.2} className="mt-8">
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </Reveal>
          </div>
          <ol className="space-y-4">
            {process.map((p, i) => (
              <Reveal key={p.step} as="li" delay={i * 0.08} className="flex gap-5 rounded-3xl border border-peach-200/80 bg-cream-50/60 p-6">
                <span className="font-display text-3xl text-peach-400">{p.step}</span>
                <span>
                  <span className="block text-lg font-semibold text-ink">{p.title}</span>
                  <span className="mt-1 block text-ink-muted">{p.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal className="rounded-[32px] border border-peach-200 bg-cream-50/60 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-medium text-ink">Technologies we work with</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {techStack.map((t) => (
                <li key={t} className="rounded-full border border-peach-200 bg-cream-100 px-4 py-2 text-sm text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
