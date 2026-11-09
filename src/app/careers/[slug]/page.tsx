import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/apply-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, JsonLd } from "@/components/ui";
import { employmentLabel, getJob, jobs } from "@/lib/jobs";
import { formattedAddress, site } from "@/lib/site";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const job = getJob(slug);
  if (!job) return {};
  const title = `${job.title} — ${job.remote ? "Remote" : job.location}`;
  const description = `${site.legalName} is hiring a ${job.title}. ${job.summary} Skills: ${job.skills.join(", ")}. Apply online.`;
  return {
    title,
    description,
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: { url: `/careers/${job.slug}`, title: `${title} | ${site.legalName}`, description },
  };
}

const formatSalary = (s: NonNullable<ReturnType<typeof getJob>>["salary"]) =>
  s
    ? `${new Intl.NumberFormat("en-US", { style: "currency", currency: s.currency, maximumFractionDigits: 0 }).format(s.min)} – ${new Intl.NumberFormat("en-US", { style: "currency", currency: s.currency, maximumFractionDigits: 0 }).format(s.max)} / ${s.unit === "YEAR" ? "year" : "hour"}`
    : null;

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="mt-12">
      <h2 className="font-display text-2xl font-medium text-ink">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((r) => (
          <li key={r} className="flex items-start gap-3 text-ink-soft">
            <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-peach-200 text-peach-700">
              <Icon name="check" width={12} height={12} />
            </span>
            {r}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function JobPage(props: PageProps<"/careers/[slug]">) {
  const { slug } = await props.params;
  const job = getJob(slug);
  if (!job) notFound();

  const a = site.contact.address;
  const description = [
    `<p>${job.summary}</p>`,
    `<h3>Responsibilities</h3><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    `<h3>Requirements</h3><ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    job.niceToHave.length ? `<h3>Nice to have</h3><ul>${job.niceToHave.map((r) => `<li>${r}</li>`).join("")}</ul>` : "",
  ].join("");

  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    identifier: { "@type": "PropertyValue", name: site.legalName, value: job.slug },
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59`,
    employmentType: job.employmentType,
    industry: "Software Development",
    occupationalCategory: "15-1252.00 Software Developers",
    skills: job.skills.join(", "),
    directApply: true,
    url: `${site.url}/careers/${job.slug}`,
    hiringOrganization: {
      "@type": "Organization",
      name: site.legalName,
      sameAs: site.url,
      logo: `${site.url}/brand/logo.png`,
    },
    ...(job.remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: job.applicantCountries.map((c) => ({ "@type": "Country", name: c })),
        }
      : {}),
    ...(formattedAddress() || !job.remote
      ? {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: a.street || undefined,
              addressLocality: a.city || undefined,
              addressRegion: a.region || undefined,
              postalCode: a.postalCode || undefined,
              addressCountry: a.country,
            },
          },
        }
      : {}),
    ...(job.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.salary.currency,
        value: { "@type": "QuantitativeValue", minValue: job.salary.min, maxValue: job.salary.max, unitText: job.salary.unit },
      },
    }),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${site.url}/careers` },
      { "@type": "ListItem", position: 3, name: job.title, item: `${site.url}/careers/${job.slug}` },
    ],
  };

  const salary = formatSalary(job.salary);
  const facts = [
    { label: "Team", value: job.team },
    { label: "Location", value: job.location },
    { label: "Type", value: employmentLabel[job.employmentType] },
    ...(salary ? [{ label: "Salary", value: salary }] : []),
  ];


  return (
    <>
      <JsonLd data={[jobPosting, breadcrumbs]} />
      <section className="relative overflow-hidden pt-36 pb-12 sm:pt-44">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-peach-300/30 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
              <Link href="/careers" className="hover:text-peach-600">
                Careers
              </Link>{" "}
              / <span className="text-ink-soft">{job.title}</span>
            </nav>
            <Eyebrow>{job.remote ? "Remote" : job.location} · {employmentLabel[job.employmentType]}</Eyebrow>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] font-medium tracking-tight text-ink sm:text-6xl">
              {job.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">{job.summary}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-peach-200 bg-cream-50/70 p-4">
                  <dt className="text-xs font-semibold tracking-[0.15em] text-peach-700 uppercase">{f.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section className="pb-12">
        <Container className="grid gap-14 lg:grid-cols-12">
          <article className="lg:col-span-6">
            <List title="What you'll do" items={job.responsibilities} />
            <List title="What we're looking for" items={job.requirements} />
            {job.niceToHave.length > 0 && <List title="Nice to have" items={job.niceToHave} />}
            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-medium text-ink">Skills</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <li key={s} className="rounded-full border border-peach-200 bg-cream-100 px-4 py-2 text-sm text-ink-soft">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </article>
          <div id="apply" className="scroll-mt-28 lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="mb-5 font-display text-3xl font-medium text-ink">Apply for this role</h2>
                <ApplyForm positions={jobs.map((j) => j.title)} defaultPosition={job.title} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
