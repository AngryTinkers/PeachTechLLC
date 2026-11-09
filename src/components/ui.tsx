import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icons";
import { Reveal } from "./motion";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-peach-300/70 bg-cream-50/70 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-peach-700 uppercase">
      <span className="size-1.5 rounded-full bg-peach-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: H = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight text-ink sm:text-5xl">{title}</H>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>}
    </Reveal>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "bg-peach-600 text-white shadow-[0_12px_30px_-12px_rgba(236,79,38,0.7)] hover:bg-peach-700"
      : "border border-ink/15 bg-cream-50/60 text-ink hover:border-peach-500 hover:text-peach-700";
  const content = (
    <>
      {children}
      <Icon
        name={external ? "external" : "arrow"}
        width={18}
        height={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  );
  const className = `group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${cls}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-peach-300/30 blur-3xl" />
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} as="h1" />
      </Container>
    </section>
  );
}

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-peach-200/80 rounded-3xl border border-peach-200/80 bg-cream-50/60">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-ink">
            <h3 className="text-base sm:text-lg">{f.q}</h3>
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-peach-200/60 text-peach-700 transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-ink-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqJsonLd = (items: readonly { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
