import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/icons";
import { ParallaxImage, Stagger, StaggerItem } from "@/components/motion";
import { Container, JsonLd, PageHero } from "@/components/ui";
import { formattedAddress, site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.legalName} about AI software development, partnerships, products or careers.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  const address = formattedAddress();
  const cards: { icon: IconName; label: string; value: string; href?: string; note: string }[] = [
    { icon: "mail", label: "General & projects", value: site.contact.email, href: `mailto:${site.contact.email}`, note: "Projects, partnerships and product questions" },
    { icon: "people", label: "Careers", value: site.contact.careersEmail, href: `mailto:${site.contact.careersEmail}`, note: "Questions about roles and applications" },
    { icon: "phone", label: "Phone", value: site.contact.phone, href: telHref(site.contact.phone), note: site.contact.hours },
    ...(address ? [{ icon: "pin" as const, label: "Office", value: address, note: site.legalName }] : []),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${site.url}/contact`,
          name: `Contact ${site.legalName}`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient italic">what you&apos;re building.</span>
          </>
        }
        intro="Reach out about a project, a partnership, one of our products or a role on our team."
      />
      <section className="pb-12">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Stagger className="grid content-start gap-4 sm:grid-cols-2">
            {cards.map((c) => {
              const inner = (
                <>
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-400 to-peach-600 text-white">
                    <Icon name={c.icon} />
                  </span>
                  <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-peach-700 uppercase">{c.label}</p>
                  <p className="mt-1 font-semibold break-words text-ink">{c.value}</p>
                  <p className="mt-1 text-sm text-ink-muted">{c.note}</p>
                </>
              );
              const cls =
                "block h-full rounded-[28px] border border-peach-200/80 bg-cream-50/70 p-6 transition hover:-translate-y-1 hover:border-peach-400";
              return (
                <StaggerItem key={c.label} className="h-full">
                  {c.href ? (
                    <a href={c.href} className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
          <ParallaxImage
            src="/images/team-laptop.webp"
            alt="Professionals collaborating around a laptop"
            className="aspect-[4/3] rounded-[32px] lg:aspect-auto lg:min-h-[440px]"
            priority
          />
        </Container>
      </section>
    </>
  );
}
