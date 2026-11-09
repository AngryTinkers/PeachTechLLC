import type { Metadata } from "next";
import Link from "next/link";
import { ApplyForm } from "@/components/apply-form";
import { Icon } from "@/components/icons";
import { ParallaxImage, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Container, Faq, JsonLd, PageHero, SectionHeading, faqJsonLd } from "@/components/ui";
import { careersFaq, hiringSteps, perks } from "@/lib/content";
import { employmentLabel, jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Remote Software Engineer & AI Engineer Jobs",
  description:
    "PeachTech LLC is hiring software engineers: full-stack, frontend, backend, AI/ML and DevOps roles, remote-first. Work on AI products and with partner tech companies. Apply online in two minutes.",
  keywords: [
    "software engineer jobs",
    "remote software engineer jobs",
    "AI engineer jobs",
    "machine learning engineer jobs",
    "full-stack developer jobs",
    "frontend developer jobs",
    "backend engineer jobs",
    "DevOps engineer jobs",
    "React developer jobs",
    "Python developer jobs",
    "PeachTech careers",
  ],
  alternates: { canonical: "/careers" },
  openGraph: {
    url: "/careers",
    title: `Careers at ${site.legalName} — software & AI engineering jobs`,
    description: "Remote-first engineering roles at an AI-focused software agency. Apply online.",
  },
};

export default function CareersPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${site.url}/careers` },
    ],
  };

  return (
    <>
      <JsonLd data={[faqJsonLd(careersFaq), breadcrumbs]} />
      <PageHero
        eyebrow="Careers · We're hiring"
        title={
          <>
            Build the future of AI software <span className="text-gradient italic">with us.</span>
          </>
        }
        intro="PeachTech recruits software engineers for its own AI products and for the technology companies we partner with. Remote-first, real production work, and a team that cares about craft."
      />

      <section className="pb-8">
        <Container className="grid gap-6 lg:grid-cols-3">
          <ParallaxImage
            src="/images/office-collab.webp"
            alt="Team of professionals collaborating in a cozy office"
            className="aspect-[4/3] rounded-[32px] lg:col-span-2 lg:aspect-auto lg:min-h-[420px]"
            priority
          />
          <div className="grid gap-6">
            <ParallaxImage src="/images/pair-programming.webp" alt="Two developers reviewing code together" className="aspect-[4/3] rounded-[32px]" />
            <ParallaxImage src="/images/remote-work.webp" alt="Laptop on a home office desk for remote work" className="aspect-[4/3] rounded-[32px]" />
          </div>
        </Container>
      </section>

      {/* Open roles */}
      <section id="roles" className="scroll-mt-28 py-24">
        <Container>
          <SectionHeading
            eyebrow="Open positions"
            title={`${jobs.length} engineering roles open now`}
            intro="Don't see a perfect fit? Send a general application. We regularly place engineers with partner companies."
          />
          <Stagger className="mt-12 grid gap-4">
            {jobs.map((j) => (
              <StaggerItem key={j.slug}>
                <Link
                  href={`/careers/${j.slug}`}
                  className="group flex flex-col gap-4 rounded-[24px] border border-peach-200/80 bg-cream-50/70 p-6 transition-all duration-300 hover:border-peach-400 hover:bg-cream-50 hover:shadow-[0_24px_50px_-30px_rgba(198,58,23,0.45)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-ink group-hover:text-peach-700">{j.title}</h3>
                    <p className="mt-1 text-ink-muted">{j.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[j.team, j.location, employmentLabel[j.employmentType]].map((t) => (
                        <span key={t} className="rounded-full bg-peach-200/50 px-3 py-1 text-xs font-medium text-peach-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-peach-700">
                    View role <Icon name="arrow" width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Perks */}
      <section className="py-12">
        <Container>
          <SectionHeading eyebrow="Why PeachTech" title="What you can expect" align="center" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="h-full rounded-[28px] border border-peach-200/80 bg-cream-50/70 p-7">
                  <span className="font-display text-2xl text-peach-400">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Hiring process */}
      <section className="py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Hiring process" title="Simple, transparent, respectful of your time." />
            <ol className="mt-10 space-y-6 border-l-2 border-peach-200 pl-8">
              {hiringSteps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
                  <span className="absolute top-0.5 -left-[43px] inline-flex size-6 items-center justify-center rounded-full bg-peach-600 text-xs font-bold text-white ring-4 ring-cream">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-ink-muted">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <ParallaxImage src="/images/hiring.webp" alt="Team brainstorming in a modern office" className="aspect-[4/5] rounded-[32px]" />
        </Container>
      </section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-28 py-12">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Apply"
              title="Send us your resume."
              intro="Fill in your details and attach your resume. Our recruiting team reviews every application and will reach out by email."
            />
            <Reveal delay={0.2} className="mt-8 space-y-3 text-sm text-ink-muted">
              <p className="flex items-center gap-2">
                <Icon name="clock" width={16} height={16} className="text-peach-600" /> Takes about 2 minutes
              </p>
              <p className="flex items-center gap-2">
                <Icon name="mail" width={16} height={16} className="text-peach-600" /> Questions?{" "}
                <a className="font-semibold text-peach-700 underline-offset-4 hover:underline" href={`mailto:${site.contact.careersEmail}`}>
                  {site.contact.careersEmail}
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <ApplyForm positions={jobs.map((j) => j.title)} />
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="FAQ" title="Careers FAQ" intro="Common questions from engineers applying to PeachTech." />
          </div>
          <Reveal className="lg:col-span-7">
            <Faq items={careersFaq} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
