import type { Metadata } from "next";
import Image from "next/image";
import { ParallaxImage, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ButtonLink, Container, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — AI-Focused Software Development Agency",
  description:
    "Learn about PeachTech LLC: an AI-first software development agency that builds web services and online products and recruits software engineers for partner technology companies.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const values = [
  { title: "Craft over hype", body: "We use AI where it measurably helps, and engineer it properly when we do." },
  { title: "People first", body: "Great software comes from great teams. We invest in engineers and treat candidates with respect." },
  { title: "Radical clarity", body: "Plain language, honest estimates and transparent progress, for clients and teammates alike." },
  { title: "Ship, then sharpen", body: "Small releases, real feedback, continuous improvement." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${site.url}/about`,
          name: `About ${site.legalName}`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
      <PageHero
        eyebrow="About PeachTech"
        title={
          <>
            A sweet spot between <span className="text-gradient italic">AI and great engineering.</span>
          </>
        }
        intro={`${site.legalName} is a software development agency focused on artificial intelligence. We build our own online services, deliver AI products for clients, and connect skilled engineers with the technology companies we partner with.`}
      />

      <section className="pb-12">
        <Container>
          <ParallaxImage
            src="/images/startup-team.webp"
            alt="Smiling team standing together in a startup office"
            className="aspect-[16/9] rounded-[40px]"
            priority
            offset={80}
          />
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Our story" title="Why we started PeachTech." />
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink-muted">
            <p>
              AI changed what software can do almost overnight, but building AI products that are reliable, affordable
              and genuinely useful still takes serious engineering. PeachTech was founded to do exactly that.
            </p>
            <p>
              We work in three ways: we build and run our own web products, we partner with companies to create AI
              solutions, and we recruit software engineers for the technology companies we co-work with, so great
              engineers find great teams.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeading eyebrow="Values" title="What we believe" align="center" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-[28px] border border-peach-200/80 bg-cream-50/70 p-7">
                  <Image src="/brand/logo.png" alt="" width={32} height={32} />
                  <h3 className="mt-5 text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <ParallaxImage src="/images/team-whiteboard.webp" alt="Team planning at a whiteboard with laptops" className="aspect-[4/3] rounded-[32px]" />
          <div>
            <SectionHeading
              eyebrow="Partners"
              title="Co-working with technology companies."
              intro="We embed PeachTech engineers and recruited talent into partner teams, so they can scale engineering capacity quickly with people who already know how to ship AI."
            />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Become a partner</ButtonLink>
              <ButtonLink href="/careers" variant="secondary">
                Join as an engineer
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
