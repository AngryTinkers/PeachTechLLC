import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { ParallaxImage, Reveal, ScrollRotate, SplitHeading, Stagger, StaggerItem } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { ButtonLink, Container, Eyebrow, Faq, JsonLd, SectionHeading, faqJsonLd } from "@/components/ui";
import { companyFaq, process, services, techStack } from "@/lib/content";
import { employmentLabel, jobs } from "@/lib/jobs";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(companyFaq)} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute -top-48 -left-40 size-[620px] rounded-full bg-peach-300/35 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-40 size-[520px] rounded-full bg-[#ffd9a8]/50 blur-3xl" />
        <ScrollRotate className="pointer-events-none absolute top-28 right-[6%] hidden opacity-90 xl:block">
          <Image src="/brand/logo.png" alt="" width={90} height={90} className="animate-float drop-shadow-xl" />
        </ScrollRotate>

        <Container className="relative grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>AI-first software studio</Eyebrow>
            </Reveal>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] font-medium tracking-tight text-ink sm:text-6xl xl:text-7xl">
              <SplitHeading text="We build intelligent" /> <SplitHeading text="web services," className="text-gradient italic" />{" "}
              <SplitHeading text="and the teams behind them." />
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
                PeachTech LLC is a software development agency focused on AI. We design, build and run online
                products powered by large language models, and we recruit exceptional software engineers for
                our partner technology companies.
              </p>
            </Reveal>
            <Reveal delay={0.65} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/products">Explore our products</ButtonLink>
              <ButtonLink href="/careers" variant="secondary">
                See engineering jobs
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.8} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-muted">
              {["LLM & agent engineering", "Full-stack web services", "Remote-first hiring"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Icon name="check" width={16} height={16} className="text-peach-600" /> {t}
                </span>
              ))}
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <ParallaxImage
              src="/images/hero-neural-flow.webp"
              alt="Abstract illustration of data flowing through a neural network"
              priority
              className="aspect-[4/3] rounded-[32px] shadow-[0_40px_80px_-40px_rgba(198,58,23,0.55)]"
              offset={40}
            />
            <Reveal delay={0.9} x={-20} y={0} className="absolute -bottom-6 -left-4 sm:-left-8">
              <Link
                href="/careers"
                className="flex items-center gap-3 rounded-2xl border border-peach-200 bg-cream-50/90 p-4 pr-6 shadow-xl backdrop-blur"
              >
                <span className="relative flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-peach-400 opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-peach-600" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">Now hiring</span>
                  <span className="block text-xs text-ink-muted">{jobs.length} engineering roles open</span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={1.05} x={20} y={0} className="absolute -top-5 right-2 hidden sm:block">
              <div className="rounded-2xl border border-peach-200 bg-cream-50/90 px-4 py-3 text-sm font-medium text-ink shadow-xl backdrop-blur">
                LLMs · RAG · Agents · Cloud
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Tech marquee */}
      <section aria-label="Technologies we use" className="border-y border-peach-200/70 bg-cream-50/50 py-6">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 pr-12">
            {[...techStack, ...techStack].map((t, i) => (
              <span
                key={i}
                aria-hidden={i >= techStack.length}
                className="flex items-center gap-3 font-display text-xl whitespace-nowrap text-ink-soft"
              >
                <span className="size-1.5 rounded-full bg-peach-400" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Software that thinks, <span className="text-gradient italic">built to last.</span>
                </>
              }
              intro="From the first prototype to production at scale, we combine AI expertise with disciplined software engineering."
            />
            <Reveal delay={0.2}>
              <ButtonLink href="/services" variant="secondary">
                All services
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <article className="group h-full rounded-[28px] border border-peach-200/80 bg-cream-50/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-cream-50 hover:shadow-[0_24px_50px_-30px_rgba(198,58,23,0.45)]">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-400 to-peach-600 text-white shadow-lg shadow-peach-500/30 transition-transform duration-500 group-hover:rotate-6">
                    <Icon name={s.icon} width={22} height={22} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Engineering split */}
      <section className="py-12">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <ParallaxImage
            src="/images/engineer-coding.webp"
            alt="Software engineer writing code on dual monitors"
            className="aspect-[5/4] rounded-[32px]"
          />
          <div>
            <SectionHeading
              eyebrow="How we engineer"
              title="AI features that hold up in the real world."
              intro="Impressive demos are easy. We focus on the hard part: accuracy you can measure, latency users don't notice, and costs that make business sense."
            />
            <Stagger className="mt-8 space-y-4">
              {[
                "Evaluation suites for every AI feature before it ships",
                "Typed, tested, observable code — no black boxes",
                "Security, privacy and data governance by default",
                "Clear documentation and clean handover",
              ].map((t) => (
                <StaggerItem key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-peach-200 text-peach-700">
                    <Icon name="check" width={14} height={14} />
                  </span>
                  <span className="text-ink-soft">{t}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Our process" title="From idea to impact in four steps." align="center" />
          <Stagger className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="relative h-full rounded-[28px] border border-peach-200/80 bg-gradient-to-b from-cream-50 to-cream-100/40 p-7">
                  <span className="font-display text-5xl font-medium text-peach-300">{p.step}</span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Products teaser */}
      <section className="py-12">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our products"
              title="Online services, made by PeachTech."
              intro="Beyond client work, we build and operate our own AI-powered products."
            />
            <Reveal delay={0.2}>
              <ButtonLink href="/products" variant="secondary">
                View all products
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Careers band */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[40px] bg-ink text-cream-50">
              <div className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full bg-peach-600/40 blur-3xl" />
              <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] text-peach-300 uppercase">Careers</span>
                  <h2 className="mt-5 font-display text-4xl leading-[1.05] font-medium sm:text-5xl">
                    Engineers wanted — for us and for the tech companies we partner with.
                  </h2>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream-200/90">
                    We recruit software engineers for PeachTech projects and for our co-working technology
                    partners. Apply once; we&apos;ll match you with the team where you&apos;ll thrive.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/careers#apply"
                      className="inline-flex items-center gap-2 rounded-full bg-peach-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-peach-400"
                    >
                      Apply now <Icon name="arrow" width={18} height={18} />
                    </Link>
                    <Link
                      href="/careers"
                      className="inline-flex items-center gap-2 rounded-full border border-cream-50/25 px-6 py-3.5 text-sm font-semibold transition hover:border-peach-300"
                    >
                      Life at PeachTech
                    </Link>
                  </div>
                </div>
                <ul className="space-y-3">
                  {jobs.map((j) => (
                    <li key={j.slug}>
                      <Link
                        href={`/careers/${j.slug}`}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-cream-50/10 bg-cream-50/5 px-5 py-4 transition hover:border-peach-400/60 hover:bg-cream-50/10"
                      >
                        <span>
                          <span className="block font-semibold">{j.title}</span>
                          <span className="mt-0.5 block text-sm text-cream-200/70">
                            {j.team} · {j.location} · {employmentLabel[j.employmentType]}
                          </span>
                        </span>
                        <Icon name="arrow" className="shrink-0 text-peach-300 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="FAQ" title="Questions, answered." intro="Quick facts about PeachTech LLC." />
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <Faq items={companyFaq} />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="pt-24">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[40px] border border-peach-200 bg-gradient-to-br from-peach-200/70 via-cream-50 to-[#ffe1bf] px-8 py-16 text-center sm:px-16">
            <Image
              src="/brand/logo.png"
              alt=""
              width={72}
              height={72}
              className="mx-auto animate-float"
            />
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">
              Have an AI idea? Let&apos;s build it together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-muted">
              Tell us what you&apos;re working on and we&apos;ll get back to you shortly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">Contact us</ButtonLink>
              <ButtonLink href="/products" variant="secondary">
                Our products
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
